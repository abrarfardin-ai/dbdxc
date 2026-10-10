begin;
alter table public.sw_orders drop constraint if exists sw_orders_payment_method_check;
alter table public.sw_orders add constraint sw_orders_payment_method_check check(payment_method in ('BANK','BKASH','NAGAD','UNKNOWN'));
alter table public.sw_orders add column if not exists purchase_date_label text;
alter table public.sw_orders add column if not exists payment_method_detail text;
create or replace function public.sw_capture_payment_destination() returns trigger language plpgsql security definer set search_path='' as $$
declare config jsonb; config_version integer; method text; enabled_key text;
begin
 if TG_TABLE_NAME='sw_orders' then
  if new.historical and new.source='owner_manual' then
   new.payment_destination_snapshot:=jsonb_build_object('method',new.payment_method,'details',new.payment_method_detail,'source','owner_reported');
   return new;
  end if;
 end if;
 if TG_OP='UPDATE' and new.payment_method is not distinct from old.payment_method and old.payment_destination_snapshot is not null then return new; end if;
 select content,version into config,config_version from public.sw_content_versions where content_key='site.settings' and state='PUBLISHED';
 method:=new.payment_method;
 if method is null or method not in ('BKASH','NAGAD','BANK') then raise exception 'Choose a payment method'; end if;
 enabled_key:=case method when 'BKASH' then 'bkashEnabled' when 'NAGAD' then 'nagadEnabled' else 'bankEnabled' end;
 if config is not null and coalesce((config->>enabled_key)::boolean,false)=false then raise exception 'This payment method is no longer available. Contact support if already paid.'; end if;
 new.payment_destination_snapshot:=jsonb_build_object('version',coalesce(config_version,0),'method',method,'number',case method when 'BKASH' then coalesce(config->>'bkashNumber','01990995417') when 'NAGAD' then coalesce(config->>'nagadNumber','01990995417') else coalesce(config->>'bankAccount','2103809628001') end,'bank',case when method='BANK' then coalesce(config->>'bankName','City Bank') end,'holder',case when method='BANK' then coalesce(config->>'bankHolder','TAZWAR ABRAR FARDIN') end);
 return new;
end $$;

-- Manual sales use the same order lifecycle and existing delivery worker.
create or replace function public.sw_manual_sale(p_key uuid,p_data jsonb) returns public.sw_orders
language plpgsql security definer set search_path='' as $$
declare r public.sw_orders; p public.sw_products; email text; mode text; ref text; date_label text; purchased timestamptz; amount integer;
begin
 if not public.sw_is_owner() then raise exception 'Owner required'; end if;
 if p_key is null then raise exception 'Entry key required';end if;
 perform pg_advisory_xact_lock(hashtextextended('manual-sale:'||p_key::text,0));
 select * into r from public.sw_orders where idempotency_key='manual:'||p_key;
 if found then return r;end if;
 email:=lower(trim(p_data->>'email')); mode:=coalesce(p_data->>'mode','PENDING');
 if email is null or email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or length(email)>254 then raise exception 'Valid work email required';end if;
 if length(trim(coalesce(p_data->>'name','')))<2 or length(p_data->>'name')>180 then raise exception 'Customer name required';end if;
 if length(regexp_replace(coalesce(p_data->>'phone',''),'[^0-9]','','g')) not between 7 and 15 then raise exception 'Valid WhatsApp number required';end if;
 if mode not in ('PENDING','PAID_HISTORY','DELIVERED_HISTORY') then raise exception 'Invalid entry status';end if;
 if coalesce(p_data->>'method','') not in ('BANK','BKASH','NAGAD','UNKNOWN') then raise exception 'Payment method required';end if;
 select * into p from public.sw_products where slug=p_data->>'product' and active;
 if not found then raise exception 'Active product required';end if;
 amount:=(p_data->>'amount')::integer;
 if amount is null or amount<=0 or amount>1000000 then raise exception 'Valid received amount required';end if;
 perform pg_advisory_xact_lock(hashtextextended(email||':'||p.slug,0));
 select * into r from public.sw_orders where lower(customer_email)=email and product_slug=p.slug and not is_test and status not in ('REJECTED','CANCELLED','REVOKED') limit 1;
 if found then raise exception 'This customer already has order %. Open that order instead.',r.order_number;end if;
 date_label:=nullif(trim(p_data->>'purchase_date'),'');
 if date_label is not null then
 if date_label ~ '^\d{4}-\d{2}-\d{2}$' then purchased:=(date_label||'T12:00:00+06:00')::timestamptz;
 elsif date_label ~ '^\d{4}-\d{2}$' then perform (date_label||'-01')::date;
 else raise exception 'Use YYYY-MM-DD or YYYY-MM for purchase date';end if;
 end if;
 ref:=nullif(trim(p_data->>'reference'),'');
 if length(coalesce(ref,''))>180 or length(coalesce(p_data->>'note',''))>4000 or length(coalesce(p_data->>'method_detail',''))>180 then raise exception 'Entry text is too long';end if;
 insert into public.sw_orders(order_number,product_slug,product_name_snapshot,amount_bdt,customer_name,customer_email,customer_phone,transaction_reference,idempotency_key,terms_version,terms_accepted_at,source,source_record_id,historical,status,payment_status,approval_status,delivery_status,payment_method,payment_method_detail,purchase_date_label,purchased_at,original_amount_bdt,original_source,admin_note)
 values(public.sw_next_business_number(),p.slug,p.name,amount,trim(p_data->>'name'),email,trim(p_data->>'phone'),coalesce(ref,'MANUAL-'||p_key),'manual:'||p_key,'owner-recorded',null,'owner_manual',p_key::text,true,case mode when 'DELIVERED_HISTORY' then 'ACCESS_SENT' when 'PAID_HISTORY' then 'APPROVED' else 'PENDING' end,case when mode='PENDING' then 'PENDING' else 'VERIFIED' end,case when mode='PENDING' then 'PENDING' else 'APPROVED' end,case when mode='DELIVERED_HISTORY' then 'ACCESS_SENT' else 'NOT_STARTED' end,p_data->>'method',nullif(trim(p_data->>'method_detail'),''),date_label,purchased,amount,'whatsapp_manual',nullif(trim(p_data->>'note'),'')) returning * into r;
 if ref is not null then
 insert into public.sw_transaction_registry(normalized_reference,subject_type,subject_id,business_number) values(public.sw_normalize_transaction(ref),'order',r.id,r.order_number);
 end if;
 insert into public.sw_audit_logs(actor_email,action,subject_type,subject_id,after_data) values(lower(auth.jwt()->>'email'),'manual_sale_recorded','order',r.id,jsonb_build_object('order_number',r.order_number,'mode',mode,'delivery_evidence','Owner declaration; no new email sent'));
 return r;
end $$;
create or replace function public.sw_edit_customer_contact(p_order uuid,p_name text,p_phone text) returns void
language plpgsql security definer set search_path='' as $$
declare r public.sw_orders;
begin
 if not public.sw_is_owner() then raise exception 'Owner required';end if;
 if length(trim(coalesce(p_name,''))) not between 2 and 180 or length(regexp_replace(coalesce(p_phone,''),'[^0-9]','','g')) not between 7 and 15 then raise exception 'Valid name and WhatsApp required';end if;
 select * into r from public.sw_orders where id=p_order for update;
 if not found then raise exception 'Order not found';end if;
 update public.sw_orders set customer_name=trim(p_name),customer_phone=trim(p_phone),updated_at=now() where id=p_order;
 insert into public.sw_audit_logs(actor_email,action,subject_type,subject_id,before_data,after_data) values(lower(auth.jwt()->>'email'),'customer_contact_updated','order',p_order,jsonb_build_object('name',r.customer_name,'phone',r.customer_phone),jsonb_build_object('name',trim(p_name),'phone',trim(p_phone)));
end $$;
revoke all on function public.sw_manual_sale(uuid,jsonb),public.sw_edit_customer_contact(uuid,text,text) from public,anon;
grant execute on function public.sw_manual_sale(uuid,jsonb),public.sw_edit_customer_contact(uuid,text,text) to authenticated;
commit;
