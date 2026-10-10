import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { n as ShieldCheck, r as createLucideIcon, t as Check } from "./check-vFg82jRQ.js";
import { Copy, SectionLabel, StatusPill } from "./primitives-Ne8vVwBw.js";
import { SiteShell, a as X, i as CircleAlert, t as Clock3 } from "./site-shell-ZuXY0u6A.js";
import { n as refreshCatalog, r as useLiveCatalog, t as Zap } from "./zap-Dj7We4Ww.js";
import { t as CalendarClock } from "./calendar-clock-CRGZs3C5.js";
import { t as RotateCcw } from "./rotate-ccw-BpFgfnal.js";
import { t as Search } from "./search-hmUjVOB4.js";
import { t as ExternalLink } from "./external-link-CfRwV9uG.js";
import { SiteEditor, t as getBrowserSupabase } from "./site-editor-BsvsTh6T.js";
import { t as CircleCheck } from "./circle-check-G2fazJZR.js";
//#region components/product-sales-monitor.tsx
var import_jsx_runtime = require_jsx_runtime();
function ProductSalesMonitor() {
	const { products, updatedAt, error, environment } = useLiveCatalog();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-panel-stack",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Live product sales",
					bn: "পণ্যভিত্তিক লাইভ বিক্রি"
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Active approved orders only. Test, pending, rejected and revoked orders are excluded. Refreshes every 15 seconds.",
					bn: "শুধু সক্রিয় অনুমোদিত অর্ডার। Test, pending, rejected ও revoked অর্ডার বাদ। প্রতি ১৫ সেকেন্ডে আপডেট হয়।"
				}) }),
				environment === "staging" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					role: "status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Test database: these are not your production sales. Historical sales must be verified in the production portal.",
						bn: "Test database: এটি আপনার production বিক্রির হিসাব নয়। পুরোনো বিক্রি production portal-এ যাচাই করতে হবে।"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void refreshCatalog(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Refresh counts",
						bn: "সংখ্যা আপডেট করুন"
					})
				})
			] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Sales could not be verified. Retry; no zero or estimated total is shown.",
					bn: "বিক্রির সংখ্যা যাচাই করা যায়নি। আবার চেষ্টা করুন; অনুমান বা শূন্য দেখানো হচ্ছে না।"
				})
			}) : products ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-archive-grid",
				children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "portal-panel",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: product.slug }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: product.customers.toLocaleString() }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							en: "approved purchases",
							bn: "টি অনুমোদিত ক্রয়"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["৳", product.price.toLocaleString()] })
					]
				}, product.slug))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Loading verified sales…",
					bn: "বিক্রির হিসাব আসছে…"
				})
			}),
			updatedAt && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
					en: "Last checked: ",
					bn: "শেষ যাচাই: "
				}),
				new Date(updatedAt).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }),
				" · Dhaka"
			] })
		]
	});
}
//#endregion
//#region components/reminder-monitor.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function ReminderMonitor() {
	const client = getBrowserSupabase();
	const [jobs, setJobs] = (0, import_react.useState)([]);
	const [tick, setTick] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		if (!client) return;
		const [events, clock] = await Promise.all([client.from("sw_outbox_events").select("id,subject_id,event_type,status,available_at,last_error,attempts").like("event_type", "booking.reminder.%").order("available_at", { ascending: false }).limit(100), client.from("sw_admin_settings").select("value").eq("key", "operations_clock").maybeSingle()]);
		if (events.error || clock.error) {
			setError("Reminder status পড়া যায়নি।");
			return;
		}
		setJobs(events.data || []);
		setTick(String(clock.data?.value?.last_tick_at || ""));
		setError("");
	}, [client]);
	(0, import_react.useEffect)(() => {
		load();
		const timer = setInterval(() => void load(), 3e4);
		return () => clearInterval(timer);
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Meeting reminders" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Confirmation-এর পরে ২৪ ঘণ্টা, ২ ঘণ্টা ও ১৫ মিনিট আগে email। Approval-এর সময় ইতিমধ্যে পেরিয়ে যাওয়া reminder বাদ যায়।" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: tick ? `সর্বশেষ scheduler check: ${new Date(tick).toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" })}` : "Scheduler-এর কোনো সফল check এখনও রেকর্ড হয়নি। চালু না হলে automatic reminder যাবে না।"
			}),
			tick && Date.now() - Date.parse(tick) > 5 * 6e4 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: "Scheduler পাঁচ মিনিটের বেশি সময় check করেনি। Google trigger ও execution log পরীক্ষা করুন।"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => void load(),
				children: "Refresh"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { overflowX: "auto" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Reminder" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "সময় (Dhaka)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "চেষ্টা / ত্রুটি" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: jobs.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						j.event_type,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: j.subject_id })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(j.available_at).toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: j.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						j.attempts,
						" ",
						j.last_error
					] })
				] }, j.id)) })] }), !jobs.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "কোনো reminder job পাওয়া যায়নি।" })]
			})
		]
	});
}
//#endregion
//#region components/resource-editor.tsx
function ResourceEditor() {
	const client = getBrowserSupabase();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [product, setProduct] = (0, import_react.useState)("instawave");
	const [name, setName] = (0, import_react.useState)("");
	const [link, setLink] = (0, import_react.useState)("");
	const [tutorial, setTutorial] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(async () => {
		const result = await client?.from("sw_product_resources").select("id,product_slug,resource_name,customer_url,tutorial_url,active").order("created_at", { ascending: false });
		if (result?.error) setMessage("Resources পড়া যায়নি।");
		else setRows(result?.data || []);
	}, [client]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Drive access ও tutorial links" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "নতুন resource প্রথমে inactive থাকবে। পরীক্ষা করে active করুন। Active resources নতুন approval-এ দেওয়া হবে। Inactive করা আগের access বাতিল করে না; সেজন্য সংশ্লিষ্ট order-এর Revoke ব্যবহার করুন।" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Product", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: product,
				onChange: (e) => setProduct(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "instawave",
					children: "InstaWave"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "lead-data-tools",
					children: "Lead Data Tools"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Resource / version-এর নাম", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: name,
				onChange: (e) => setName(e.target.value),
				maxLength: 160
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Google Drive folder/file link", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				value: link,
				onChange: (e) => setLink(e.target.value),
				placeholder: "https://drive.google.com/drive/folders/…"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Tutorial video বা guide link", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "url",
				value: tutorial,
				onChange: (e) => setTutorial(e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy || !name || !link,
				onClick: async () => {
					setBusy(true);
					const result = await client?.rpc("sw_add_product_resource", {
						p_product: product,
						p_name: name,
						p_drive_url: link,
						p_tutorial: tutorial,
						p_active: false
					});
					setMessage(result?.error ? "Resource সেভ হয়নি। Drive link ও অনুমতি পরীক্ষা করুন।" : "Inactive resource সেভ হয়েছে। Google worker-এর ওই file-এ access আছে কি না যাচাই করে active করুন।");
					if (!result?.error) {
						setName("");
						setLink("");
						setTutorial("");
						await load();
					}
					setBusy(false);
				},
				children: "নতুন resource সেভ"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			}),
			rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "portal-panel",
				style: {
					padding: 16,
					marginTop: 12
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: r.resource_name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						r.product_slug,
						" · ",
						r.active ? "ACTIVE" : "INACTIVE"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: r.customer_url,
						target: "_blank",
						rel: "noreferrer",
						children: "Drive খুলুন"
					}),
					r.tutorial_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [" · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: r.tutorial_url,
						target: "_blank",
						rel: "noreferrer",
						children: "Tutorial"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						onClick: async () => {
							setBusy(true);
							setMessage((await client?.rpc("sw_set_resource_active", {
								p_id: r.id,
								p_active: !r.active
							}))?.error ? "পরিবর্তন হয়নি।" : "Resource-এর অবস্থা সেভ হয়েছে।");
							await load();
							setBusy(false);
						},
						children: r.active ? "নতুন delivery থেকে সরান" : "নতুন delivery-তে যুক্ত করুন"
					}) })
				]
			}, r.id))
		]
	});
}
//#endregion
//#region components/manual-sale.tsx
var initial = {
	product: "instawave",
	name: "",
	email: "",
	phone: "",
	amount: "4500",
	method: "BANK",
	method_detail: "",
	reference: "",
	purchase_date: "",
	mode: "PENDING",
	note: ""
};
function ManualSale({ onSaved }) {
	const [form, setForm] = (0, import_react.useState)(initial);
	const [key, setKey] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const change = (name, value) => setForm((f) => ({
		...f,
		[name]: value
	}));
	async function save(event) {
		event.preventDefault();
		const client = getBrowserSupabase();
		if (!client || busy) return;
		const entryKey = key || crypto.randomUUID();
		setKey(entryKey);
		setBusy(true);
		setMessage("");
		try {
			const { data, error } = await client.rpc("sw_manual_sale", {
				p_key: entryKey,
				p_data: {
					...form,
					amount: Number(form.amount)
				}
			});
			if (error) throw error;
			setMessage(`${data.order_number} সেভ হয়েছে। ${form.mode === "PENDING" ? "Orders থেকে Approve করলে access ও email যাবে।" : form.mode === "PAID_HISTORY" ? "Orders থেকে Send access চাপলে delivery শুরু হবে।" : "আগে দেওয়া access-এর history রাখা হয়েছে; নতুন email পাঠানো হয়নি।"}`);
			setForm(initial);
			setKey("");
			await onSaved();
		} catch (error) {
			setMessage(error instanceof Error ? error.message : error?.message || "সেভ হয়নি। আবার চেষ্টা করুন।");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "site-editor",
		onSubmit: save,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "নতুন manual sale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "WhatsApp বা সরাসরি নেওয়া অর্ডার যোগ করুন। একই email ও tool-এর অর্ডার থাকলে আগে সেটি খুলুন।" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "manual-sale-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Tool", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.product,
						onChange: (e) => change("product", e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "instawave",
							children: "InstaWave"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "lead-data-tools",
							children: "Lead Data Tools"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer name *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						minLength: 2,
						maxLength: 180,
						value: form.name,
						onChange: (e) => change("name", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Work Email *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "email",
						maxLength: 254,
						value: form.email,
						onChange: (e) => change("email", e.target.value),
						placeholder: "Your Email"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["WhatsApp number *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "tel",
						value: form.phone,
						onChange: (e) => change("phone", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Amount received (BDT) *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "number",
						min: 1,
						max: 1e6,
						step: 1,
						value: form.amount,
						onChange: (e) => change("amount", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Payment method", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.method,
						onChange: (e) => change("method", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "BANK",
								children: "Bank"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "UNKNOWN",
								children: "Not recorded / পুরোনো তথ্য নেই"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "BKASH",
								children: "bKash"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "NAGAD",
								children: "Nagad"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Bank / payment details", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						maxLength: 180,
						value: form.method_detail,
						onChange: (e) => change("method_detail", e.target.value),
						placeholder: "যেমন Sonali Bank / City Bank"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["TrxID / voucher (থাকলে)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						maxLength: 180,
						value: form.reference,
						onChange: (e) => change("reference", e.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Purchase date / month", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.purchase_date,
						pattern: "[0-9]{4}-[0-9]{2}(-[0-9]{2})?",
						onChange: (e) => change("purchase_date", e.target.value),
						placeholder: "2026-10-10 অথবা 2026-08"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Record status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: form.mode,
						onChange: (e) => change("mode", e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PENDING",
								children: "নতুন অর্ডার · approval বাকি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "PAID_HISTORY",
								children: "পেমেন্ট পেয়েছি · access দেওয়া বাকি"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DELIVERED_HISTORY",
								children: "আগেই payment ও access দেওয়া হয়েছে"
							})
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Private notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 3,
				maxLength: 4e3,
				value: form.note,
				onChange: (e) => change("note", e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "এখানে Save করলে history তৈরি হয়। নতুন delivery পাঠাতে Orders খুলে Approve / Send access ব্যবহার করুন।" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: busy,
				children: busy ? "সেভ হচ্ছে…" : "Save manual sale"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			})
		]
	});
}
//#endregion
//#region components/business-workspace.tsx
var blank = {
	id: "",
	revision: 0,
	kind: "TASK",
	title: "",
	body: "",
	customer_email: "",
	status: "OPEN",
	priority: "NORMAL",
	due_at: null
};
function CustomerWorkspace({ orders, bookings, onRefresh, onOpenOrder }) {
	const client = getBrowserSupabase();
	const [tab, setTab] = (0, import_react.useState)("customers");
	const [query, setQuery] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)(blank);
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [product, setProduct] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	async function saveContact() {
		if (!client || !editing) return;
		setBusy(true);
		const result = await client.rpc("sw_edit_customer_contact", {
			p_order: editing.id,
			p_name: editing.customer_name,
			p_phone: editing.customer_phone
		});
		setMessage(result.error ? result.error.message : "Customer তথ্য সেভ হয়েছে।");
		if (!result.error) {
			setEditing(null);
			await onRefresh();
		}
		setBusy(false);
	}
	const all = (0, import_react.useMemo)(() => [...orders, ...bookings].filter((r) => !r.is_test && r.lifecycle_state !== "TRASHED" && (product === "all" || r.product_slug === product)).sort((a, b) => (b.purchase_date_label || b.created_at).localeCompare(a.purchase_date_label || a.created_at)), [
		orders,
		bookings,
		product
	]);
	const customers = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const row of all) {
			const key = row.customer_email.toLowerCase();
			const previous = map.get(key) || {
				email: key,
				name: row.customer_name,
				phone: row.customer_phone,
				count: 0,
				verified: 0
			};
			previous.count++;
			if (row.payment_status === "VERIFIED") previous.verified += Number(row.amount_bdt);
			map.set(key, previous);
		}
		return [...map.values()];
	}, [all]);
	const load = (0, import_react.useCallback)(async () => {
		if (!client) return;
		const { data, error } = await client.from("sw_workspace_items").select("*").order("updated_at", { ascending: false }).limit(1e3);
		if (error) setMessage("Workspace database update বা সংযোগ পরীক্ষা করুন।");
		else setItems(data || []);
	}, [client]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function save() {
		if (!client) return;
		setBusy(true);
		try {
			const { error } = await client.rpc("sw_save_workspace_item", {
				p_id: form.id || null,
				p_revision: form.revision,
				p_kind: form.kind,
				p_title: form.title,
				p_body: form.body,
				p_email: form.customer_email,
				p_status: form.status,
				p_priority: form.priority,
				p_due: form.due_at
			});
			if (error) throw error;
			setMessage("সেভ হয়েছে।");
			setForm(blank);
			await load();
		} catch {
			setMessage("সেভ হয়নি। অন্য জায়গায় record বদলে গেলে refresh করে আবার খুলুন।");
		} finally {
			setBusy(false);
		}
	}
	function csv() {
		const keys = [
			"purchase_date_label",
			"created_at",
			"customer_email",
			"order_number",
			"booking_number",
			"amount_bdt",
			"payment_method",
			"transaction_reference",
			"payment_status",
			"status"
		];
		const cell = (v) => {
			const t = String(v ?? "");
			return "\"" + (/^[=+@\-\t\r]/.test(t) ? "'" : "") + t.replace(/"/g, "\"\"") + "\"";
		};
		const rows = all.filter((r) => !email || r.customer_email.toLowerCase() === email);
		const url = URL.createObjectURL(new Blob(["﻿" + [keys.join(","), ...rows.map((r) => keys.map((k) => cell(r[k])).join(","))].join("\r\n")], { type: "text/csv;charset=utf-8" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "payment-history.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Customers, payment history & workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Portal-এ load হওয়া রেকর্ডের তথ্য। Payment verified মানে আপনার approval; gateway settlement নয়।" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "site-editor-actions",
				children: [
					["customers", "Customers"],
					["payments", "Payment history"],
					["TASK", "Tasks"],
					["DOC", "Docs / SOP"],
					["TICKET", "Support"],
					["DEAL", "Deals"]
				].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": tab === value,
					onClick: () => {
						setTab(value);
						setForm({
							...blank,
							kind: [
								"TASK",
								"DOC",
								"TICKET",
								"DEAL"
							].includes(value) ? value : "TASK",
							customer_email: email
						});
					},
					children: label
				}, value))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"aria-label": "Search customers and workspace",
				placeholder: "নাম, email বা record খুঁজুন",
				value: query,
				onChange: (e) => setQuery(e.target.value)
			}),
			email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"Customer: ",
				email,
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setEmail(""),
					children: "সব customer দেখুন"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Tool অনুযায়ী দেখুন", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: product,
				onChange: (e) => {
					setProduct(e.target.value);
					setEmail("");
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "all",
						children: "সব tool ও consulting"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "instawave",
						children: "InstaWave"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "lead-data-tools",
						children: "Lead Data Tools"
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => void onRefresh(),
				children: "Refresh customer data"
			}),
			tab === "customers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "crm-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [customers.length, " customers"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"৳",
					customers.reduce((sum, c) => sum + c.verified, 0).toLocaleString(),
					" verified payments"
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "crm-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "WhatsApp" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Orders / paid" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Manage" })
					] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: customers.filter((c) => `${c.email} ${c.name} ${c.phone}`.toLowerCase().includes(query.toLowerCase())).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [c.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: c.email })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: c.phone }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							c.count,
							" · ৳",
							c.verified.toLocaleString()
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setEmail(c.email);
									setTab("payments");
								},
								children: "History"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setEmail(c.email);
									setTab("TASK");
									setForm({
										...blank,
										customer_email: c.email
									});
								},
								children: "Follow-up"
							}),
							orders.filter((o) => o.customer_email.toLowerCase() === c.email && o.lifecycle_state !== "TRASHED").map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => onOpenOrder(o.id),
								children: [o.product_name_snapshot, " · Manage"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditing({ ...o }),
								children: "Edit contact"
							})] }, o.id))
						] })
					] }, c.email)) })]
				})
			})] }),
			editing && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-panel",
				style: { padding: 20 },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: ["Edit contact · ", editing.order_number] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: editing.customer_name,
						onChange: (e) => setEditing({
							...editing,
							customer_name: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["WhatsApp", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: editing.customer_phone,
						onChange: (e) => setEditing({
							...editing,
							customer_phone: e.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Email বদলাতে Manage → Transfer email ব্যবহার করুন, যাতে access-ও সঠিক ব্যক্তির হয়।" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						onClick: () => void saveContact(),
						children: "Save contact"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setEditing(null),
						children: "Cancel"
					})
				]
			}),
			tab === "payments" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: csv,
				children: "Payment CSV export"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "তারিখ / ID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Customer" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Method / TrxID" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Payment / order status" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: all.filter((r) => (!email || r.customer_email.toLowerCase() === email) && JSON.stringify(r).toLowerCase().includes(query.toLowerCase())).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						r.purchase_date_label || new Date(r.created_at).toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						r.order_number || r.booking_number
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.customer_email }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["৳", r.amount_bdt] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						r.payment_method_detail || r.payment_method || "Not recorded",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						r.transaction_reference || "Not recorded"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						r.payment_status || "Not recorded",
						" / ",
						r.status
					] })
				] }, r.id)) })] })
			})] }),
			[
				"TASK",
				"DOC",
				"TICKET",
				"DEAL"
			].includes(tab) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: form.id ? "Record সম্পাদনা" : "নতুন record" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["শিরোনাম", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					maxLength: 180,
					value: form.title,
					onChange: (e) => setForm((f) => ({
						...f,
						title: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Customer email (প্রয়োজন হলে)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: form.customer_email,
					onChange: (e) => setForm((f) => ({
						...f,
						customer_email: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["বিবরণ / checklist / notes", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					rows: 8,
					maxLength: 3e4,
					value: form.body,
					onChange: (e) => setForm((f) => ({
						...f,
						body: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.status,
					onChange: (e) => setForm((f) => ({
						...f,
						status: e.target.value
					})),
					children: [
						"OPEN",
						"IN_PROGRESS",
						"DONE",
						"ARCHIVED"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Priority", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.priority,
					onChange: (e) => setForm((f) => ({
						...f,
						priority: e.target.value
					})),
					children: [
						"LOW",
						"NORMAL",
						"HIGH"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: s }, s))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Due date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "date",
					value: form.due_at?.slice(0, 10) || "",
					onChange: (e) => setForm((f) => ({
						...f,
						due_at: e.target.value ? e.target.value + "T12:00:00+06:00" : null
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "site-editor-actions",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							disabled: busy || !form.title.trim(),
							onClick: () => void save(),
							children: "সেভ করুন"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setForm({
								...blank,
								kind: tab,
								customer_email: email
							}),
							children: "নতুন"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => void load(),
							children: "Refresh"
						})
					]
				}),
				items.filter((i) => i.kind === tab && (!email || i.customer_email === email) && `${i.title} ${i.body} ${i.customer_email}`.toLowerCase().includes(query.toLowerCase())).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "portal-panel",
					style: {
						padding: 16,
						marginTop: 12
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							item.customer_email,
							" · ",
							item.status,
							" · ",
							item.priority
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							style: { whiteSpace: "pre-wrap" },
							children: item.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setForm(item),
							children: "খুলুন / সম্পাদনা"
						})
					]
				}, item.id))
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			})
		]
	});
}
//#endregion
//#region components/release-center.tsx
var empty = {
	id: "",
	product_slug: "instawave",
	version: "",
	subject: "নতুন সংস্করণ এসেছে | SYNC WAVE",
	body: "নতুন সংস্করণ ব্যবহারের আগে আপনার settings backup রাখুন। নিচের নির্দেশনা অনুসরণ করে update করুন।",
	resource_id: "",
	scheduled_at: ""
};
function ReleaseCenter() {
	const client = getBrowserSupabase();
	const [form, setForm] = (0, import_react.useState)(empty);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [resources, setResources] = (0, import_react.useState)([]);
	const [recipients, setRecipients] = (0, import_react.useState)([]);
	const [audience, setAudience] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [buyers, setBuyers] = (0, import_react.useState)([]);
	const [activeResults, setActiveResults] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const load = (0, import_react.useCallback)(async () => {
		if (!client) return;
		setLoading(true);
		const [campaigns, assets, customers] = await Promise.all([
			client.from("sw_release_campaigns").select("*").order("created_at", { ascending: false }).limit(100),
			client.from("sw_product_resources").select("id,product_slug,resource_name,customer_url").eq("active", true),
			client.from("sw_orders").select("id,customer_name,customer_email,product_slug,status,lifecycle_state,is_test").eq("status", "ACCESS_SENT").eq("lifecycle_state", "ACTIVE").eq("is_test", false).limit(1e3)
		]);
		setLoading(false);
		if (campaigns.error || assets.error || customers.error) {
			setMessage("Release Center-এর database update বা সংযোগ পরীক্ষা করুন।");
			return;
		}
		setRows(campaigns.data || []);
		setResources(assets.data || []);
		setBuyers(customers.data || []);
	}, [client]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function save() {
		if (!client) return;
		setBusy(true);
		setMessage("");
		try {
			const { data, error } = await client.rpc("sw_save_release", {
				p_id: form.id || null,
				p_product: form.product_slug,
				p_version: form.version,
				p_subject: form.subject,
				p_body: form.body,
				p_resource: form.resource_id,
				p_schedule: form.scheduled_at ? new Date(form.scheduled_at).toISOString() : null
			});
			if (error) throw error;
			setForm((f) => ({
				...f,
				id: data
			}));
			const preview = await client.rpc("sw_release_audience", { p_campaign: data });
			if (preview.error) throw preview.error;
			setAudience(Number(preview.data));
			setConfirmed(false);
			setMessage("Draft সেভ হয়েছে। পাঠানোর আগে নিচের preview ও recipient count দেখুন।");
			await load();
		} catch {
			setMessage("সেভ হয়নি। পণ্যের active Drive resource, version ও বার্তা পরীক্ষা করুন।");
		} finally {
			setBusy(false);
		}
	}
	async function queue() {
		if (!client || !form.id || audience === null || !confirmed) return;
		setBusy(true);
		try {
			const { error } = await client.rpc("sw_queue_release", {
				p_campaign: form.id,
				p_expected_count: audience
			});
			if (error) throw error;
			setMessage("ইমেইল queue-তে গেছে। Worker চালু থাকলে নির্ধারিত সময়ে পাঠাবে।");
			setAudience(null);
			setConfirmed(false);
			await load();
		} catch {
			setMessage("পাঠানোর তালিকা বদলেছে অথবা queue করা যায়নি। Draft আবার সেভ করে preview করুন।");
		} finally {
			setBusy(false);
		}
	}
	const toolBuyers = [...new Map(buyers.filter((b) => b.product_slug === form.product_slug).map((b) => [b.customer_email.toLowerCase(), b])).values()];
	const selectedResource = resources.find((r) => r.id === form.resource_id);
	function change(key, value) {
		setForm((f) => ({
			...f,
			[key]: value
		}));
		setAudience(null);
		setConfirmed(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Release Center / Product update email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "শুধু access পাওয়া active ক্রেতাদের পাঠানো হবে। একই ইমেইলে একবার। Update বন্ধ করা গ্রাহক বাদ যাবেন।" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-editor-actions",
				children: [[["instawave", "InstaWave"], ["lead-data-tools", "Lead Data Tools"]].map(([slug, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-pressed": form.product_slug === slug,
					onClick: () => {
						setForm({
							...empty,
							product_slug: slug,
							subject: `${label}: নতুন update`,
							body: `${label}-এর নতুন সংস্করণ এসেছে।\n\n১. আপনার settings backup রাখুন।\n২. আগের version সরান।\n৩. নিচের Drive link থেকে নতুন version install করুন।\n\nসাহায্য লাগলে WhatsApp-এ message দিন।`
						});
						setAudience(null);
						setConfirmed(false);
						setRecipients([]);
						setActiveResults("");
					},
					children: label
				}, slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => void load(),
					children: "Refresh"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: loading ? "ক্রেতাদের তথ্য আসছে…" : `${toolBuyers.length} জন access পাওয়া ক্রেতা · তালিকা দেখুন` }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "crm-table",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Email" })] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: toolBuyers.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: b.customer_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: b.customer_email })] }, b.id)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unsubscribe করা ক্রেতা পাঠানোর চূড়ান্ত count থেকে বাদ যাবেন।" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Product", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: form.product_slug,
				onChange: (e) => {
					change("product_slug", e.target.value);
					change("resource_id", "");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "instawave",
					children: "InstaWave"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "lead-data-tools",
					children: "Lead Data Tools"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["নতুন version", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: form.version,
				maxLength: 50,
				onChange: (e) => change("version", e.target.value),
				placeholder: "যেমন 3.1"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["ইমেইলের বিষয়", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: form.subject,
				maxLength: 150,
				onChange: (e) => change("subject", e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["কী বদলেছে ও install নির্দেশনা", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				rows: 8,
				maxLength: 8e3,
				value: form.body,
				onChange: (e) => change("body", e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["নতুন version-এর Drive resource", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: form.resource_id,
				onChange: (e) => change("resource_id", e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Resource বাছুন"
				}), resources.filter((r) => r.product_slug === form.product_slug).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: r.id,
					children: r.resource_name
				}, r.id))]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["পরে পাঠাতে সময় দিন (আপনার device-এর timezone)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "datetime-local",
				value: form.scheduled_at,
				onChange: (e) => change("scheduled_at", e.target.value)
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-editor-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					onClick: () => void save(),
					children: "Draft সেভ ও recipient count"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					onClick: () => {
						setForm(empty);
						setAudience(null);
						setRecipients([]);
						setConfirmed(false);
					},
					children: "নতুন draft"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "portal-panel",
				style: {
					padding: 24,
					whiteSpace: "pre-wrap"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Email preview" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: form.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Version: ", form.version] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: form.body }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"১. Settings backup রাখুন।",
						`\n`,
						"২. নির্দেশনা অনুযায়ী পুরোনো version সরান।",
						`\n`,
						"৩. কেনার ইমেইল দিয়ে Google Drive-এ sign in করুন।",
						`\n`,
						"৪. নতুন version download ও install করুন।"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: selectedResource?.customer_url || "Drive resource বাছাই করা হয়নি।" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "আসল ইমেইলে ব্যক্তিগত access link, tutorial, support ও unsubscribe থাকবে।" })
				]
			}),
			audience !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [audience, " জন"] }), " eligible recipient"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: confirmed,
					onChange: (e) => setConfirmed(e.target.checked)
				}), "আমি preview দেখেছি এবং এই গ্রাহকদের update পাঠাতে চাই"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy || !confirmed || !audience,
					onClick: () => void queue(),
					children: "Update email queue করুন"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "আগের release ও ফলাফল" }),
			rows.filter((row) => row.product_slug === form.product_slug).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "portal-panel",
				style: {
					padding: 16,
					marginBottom: 12
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
						row.product_slug,
						" · ",
						row.version,
						" · ",
						row.status
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.subject }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "site-editor-actions",
						children: [
							row.status === "DRAFT" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setForm({
										...row,
										scheduled_at: ""
									});
									setAudience(null);
									setConfirmed(false);
								},
								children: "Draft খুলুন"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									const result = await client?.from("sw_release_recipients").select("id,email,status,last_error,sent_at").eq("campaign_id", row.id).limit(1e3);
									if (result?.error) setMessage("ফলাফল পাওয়া যায়নি।");
									else {
										setRecipients(result?.data || []);
										setActiveResults(`${row.product_slug} · ${row.version}`);
									}
								},
								children: "Recipient ফলাফল"
							}),
							row.status === "QUEUED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: busy,
								onClick: async () => {
									setBusy(true);
									setMessage((await client?.rpc("sw_cancel_release", { p_campaign: row.id }))?.error ? "বাতিল হয়নি।" : "বাকি queue বাতিল হয়েছে। পাঠানো ইমেইল ফেরত নেওয়া যায় না।");
									await load();
									setBusy(false);
								},
								children: "বাকি পাঠানো বাতিল"
							})
						]
					})
				]
			}, row.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: activeResults || "Delivery results" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "crm-summary",
				children: [
					"QUEUED",
					"SENT",
					"FAILED",
					"SKIPPED"
				].map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					status,
					": ",
					recipients.filter((r) => r.status === status).length
				] }, status))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Queue প্রতি মিনিটে পরীক্ষা হয়। বড় তালিকা, Gmail quota বা retry থাকলে ৫ মিনিটের বেশি লাগতে পারে। Read/unread এবং inbox/bounce এখানে verified নয়।" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "SENT মানে email provider গ্রহণ করেছে। Inbox/open/bounce tracking এখনও যুক্ত নেই।" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { overflowX: "auto" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Email" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Error" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recipients.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.email }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.last_error })
				] }, r.id)) })] })
			})
		]
	});
}
//#endregion
//#region components/course-leads-admin.tsx
function CourseLeadsAdmin() {
	const client = getBrowserSupabase();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [config, setConfig] = (0, import_react.useState)({
		monthly_enabled: false,
		published: false,
		launch_approved: false,
		launch_at: "2027-12-30T18:00:00Z",
		monthly_subject: "Your monthly SYNC WAVE learning update",
		monthly_body: "Watch the free class and explore the lifetime tools when they fit your needs."
	});
	async function load() {
		if (!client) return;
		const { data, error } = await client.from("sw_course_waitlist").select("id,name,email,phone,consent_at,status,source_path,email_status,welcome_sent_at,last_email_at").order("consent_at", { ascending: false }).limit(1e3);
		if (error) setStatus("তালিকা পড়া যায়নি। সংযোগ পরীক্ষা করুন।");
		else setRows(data ?? []);
	}
	(0, import_react.useEffect)(() => {
		load();
		client?.from("sw_admin_settings").select("value").eq("key", "course_campaign").maybeSingle().then(({ data }) => {
			if (data?.value) setConfig(data.value);
		});
		const timer = setInterval(() => void load(), 3e4);
		return () => clearInterval(timer);
	}, []);
	const filtered = rows.filter((r) => `${r.name} ${r.email} ${r.phone} ${r.status}`.toLowerCase().includes(query.toLowerCase()));
	function exportCsv() {
		const keys = [
			"name",
			"email",
			"phone",
			"consent_at",
			"status",
			"source_path",
			"email_status",
			"welcome_sent_at",
			"last_email_at"
		];
		const cell = (v) => {
			const text = String(v ?? "");
			return "\"" + (/^[=+@\-\t\r]/.test(text) ? "'" : "") + text.replace(/"/g, "\"\"") + "\"";
		};
		const url = URL.createObjectURL(new Blob(["﻿" + [keys.join(","), ...filtered.map((r) => keys.map((k) => cell(r[k])).join(","))].join("\r\n")], { type: "text/csv;charset=utf-8" }));
		const a = document.createElement("a");
		a.href = url;
		a.download = "course-leads.csv";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "site-editor",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "কোর্সের অপেক্ষার তালিকা" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "নাম, যোগাযোগ, সম্মতির সময় এবং ইমেইলের অবস্থা। সর্বশেষ ১,০০০ রেকর্ড; প্রতি ৩০ সেকেন্ডে আপডেট।" })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				"aria-label": "লিড খুঁজুন",
				placeholder: "নাম, ইমেইল বা নম্বর খুঁজুন",
				value: query,
				onChange: (e) => setQuery(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "site-editor-actions",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void load(),
					children: "রিফ্রেশ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: !filtered.length,
					onClick: exportCsv,
					children: "CSV ডাউনলোড"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: { overflowX: "auto" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: [
					"নাম",
					"ইমেইল",
					"WhatsApp",
					"যোগ দেওয়ার সময়",
					"সাবস্ক্রিপশন",
					"ইমেইল"
				].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					style: {
						padding: 12,
						textAlign: "left"
					},
					children: h
				}, h)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.email }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.phone }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: new Date(r.consent_at).toLocaleString("bn-BD", { timeZone: "Asia/Dhaka" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.status }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: r.email_status })
				] }, r.id)) })] }), !filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "কোনো রেকর্ড পাওয়া যায়নি।" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: "মাসিক আপডেট ও কোর্স প্রকাশ" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "সেভ করলে campaign-এর নিয়ম বদলাবে। প্রকাশের ঘোষণা চালু করার আগে কোর্স ও কেনার ব্যবস্থা বাস্তবে প্রস্তুত রাখুন।" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: config.monthly_enabled,
					onChange: (e) => setConfig((c) => ({
						...c,
						monthly_enabled: e.target.checked
					}))
				}), "প্রতি মাসের ১ তারিখে আপডেট চালু"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["ইমেইলের বিষয়", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: config.monthly_subject,
					maxLength: 150,
					onChange: (e) => setConfig((c) => ({
						...c,
						monthly_subject: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["মাসিক বার্তা", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: config.monthly_body,
					maxLength: 4e3,
					onChange: (e) => setConfig((c) => ({
						...c,
						monthly_body: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["প্রকাশের সময় (UTC ISO)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: config.launch_at,
					onChange: (e) => setConfig((c) => ({
						...c,
						launch_at: e.target.value
					}))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: config.published,
					onChange: (e) => setConfig((c) => ({
						...c,
						published: e.target.checked
					}))
				}), "কোর্স প্রকাশিত ও কেনার ব্যবস্থা প্রস্তুত"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: config.launch_approved,
					onChange: (e) => setConfig((c) => ({
						...c,
						launch_approved: e.target.checked
					}))
				}), "কোর্স প্রকাশের ইমেইল পাঠানোর অনুমোদন"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: busy,
					onClick: async () => {
						if (!client) return;
						setBusy(true);
						const { error } = await client.rpc("sw_save_course_campaign", { p_config: config });
						setStatus(error ? "সেভ হয়নি। তথ্য ও অনুমতি পরীক্ষা করুন।" : "Campaign-এর নিয়ম সেভ হয়েছে। নির্ধারিত worker চালু থাকলে ইমেইল যাবে।");
						setBusy(false);
					},
					children: "নিয়ম সেভ করুন"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				children: status
			})
		]
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/archive.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Archive = createLucideIcon("Archive", [
	["rect", {
		width: "20",
		height: "5",
		x: "2",
		y: "3",
		rx: "1",
		key: "1wp1u1"
	}],
	["path", {
		d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8",
		key: "1s80jp"
	}],
	["path", {
		d: "M10 12h4",
		key: "a56b0p"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/chart-column.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChartColumn = createLucideIcon("ChartColumn", [
	["path", {
		d: "M3 3v16a2 2 0 0 0 2 2h16",
		key: "c24i48"
	}],
	["path", {
		d: "M18 17V9",
		key: "2bz60n"
	}],
	["path", {
		d: "M13 17V5",
		key: "1frdt8"
	}],
	["path", {
		d: "M8 17v-3",
		key: "17ska0"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/chevron-right.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ChevronRight = createLucideIcon("ChevronRight", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/history.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var History = createLucideIcon("History", [
	["path", {
		d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
		key: "1357e3"
	}],
	["path", {
		d: "M3 3v5h5",
		key: "1xhq8a"
	}],
	["path", {
		d: "M12 7v5l4 2",
		key: "1fdv2h"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/inbox.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Inbox = createLucideIcon("Inbox", [["polyline", {
	points: "22 12 16 12 14 15 10 15 8 12 2 12",
	key: "o97t9d"
}], ["path", {
	d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
	key: "oot6mr"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/key-round.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var KeyRound = createLucideIcon("KeyRound", [["path", {
	d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
	key: "1s6t7t"
}], ["circle", {
	cx: "16.5",
	cy: "7.5",
	r: ".5",
	fill: "currentColor",
	key: "w0ekpg"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/layout-dashboard.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LayoutDashboard = createLucideIcon("LayoutDashboard", [
	["rect", {
		width: "7",
		height: "9",
		x: "3",
		y: "3",
		rx: "1",
		key: "10lvy0"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "14",
		y: "3",
		rx: "1",
		key: "16une8"
	}],
	["rect", {
		width: "7",
		height: "9",
		x: "14",
		y: "12",
		rx: "1",
		key: "1hutg5"
	}],
	["rect", {
		width: "7",
		height: "5",
		x: "3",
		y: "16",
		rx: "1",
		key: "ldoo1y"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/loader-circle.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LoaderCircle = createLucideIcon("LoaderCircle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/log-out.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var LogOut = createLucideIcon("LogOut", [
	["path", {
		d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",
		key: "1uf3rs"
	}],
	["polyline", {
		points: "16 17 21 12 16 7",
		key: "1gabdz"
	}],
	["line", {
		x1: "21",
		x2: "9",
		y1: "12",
		y2: "12",
		key: "1uyos4"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/mail.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Mail = createLucideIcon("Mail", [["rect", {
	width: "20",
	height: "16",
	x: "2",
	y: "4",
	rx: "2",
	key: "18n3k1"
}], ["path", {
	d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
	key: "1ocrg3"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/package-check.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PackageCheck = createLucideIcon("PackageCheck", [
	["path", {
		d: "m16 16 2 2 4-4",
		key: "gfu2re"
	}],
	["path", {
		d: "M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14",
		key: "e7tb2h"
	}],
	["path", {
		d: "m7.5 4.27 9 5.15",
		key: "1c824w"
	}],
	["polyline", {
		points: "3.29 7 12 12 20.71 7",
		key: "ousv84"
	}],
	["line", {
		x1: "12",
		x2: "12",
		y1: "22",
		y2: "12",
		key: "a4e8g8"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/package.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Package = createLucideIcon("Package", [
	["path", {
		d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
		key: "1a0edw"
	}],
	["path", {
		d: "M12 22V12",
		key: "d0xqtd"
	}],
	["path", {
		d: "m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7",
		key: "yx3hmr"
	}],
	["path", {
		d: "m7.5 4.27 9 5.15",
		key: "1c824w"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/pencil-ruler.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var PencilRuler = createLucideIcon("PencilRuler", [
	["path", {
		d: "M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13",
		key: "orapub"
	}],
	["path", {
		d: "m8 6 2-2",
		key: "115y1s"
	}],
	["path", {
		d: "m18 16 2-2",
		key: "ee94s4"
	}],
	["path", {
		d: "m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17",
		key: "cfq27r"
	}],
	["path", {
		d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
		key: "1a8usu"
	}],
	["path", {
		d: "m15 5 4 4",
		key: "1mk7zo"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/refresh-cw.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var RefreshCw = createLucideIcon("RefreshCw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/settings.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Settings = createLucideIcon("Settings", [["path", {
	d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
	key: "1qme2f"
}], ["circle", {
	cx: "12",
	cy: "12",
	r: "3",
	key: "1v7zrd"
}]]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/shopping-bag.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var ShoppingBag = createLucideIcon("ShoppingBag", [
	["path", {
		d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z",
		key: "hou9p0"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M16 10a4 4 0 0 1-8 0",
		key: "1ltviw"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/trash-2.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Trash2 = createLucideIcon("Trash2", [
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",
		key: "4alrt4"
	}],
	["path", {
		d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",
		key: "v07s0e"
	}],
	["line", {
		x1: "10",
		x2: "10",
		y1: "11",
		y2: "17",
		key: "1uufr5"
	}],
	["line", {
		x1: "14",
		x2: "14",
		y1: "11",
		y2: "17",
		key: "xtxkd"
	}]
]);
//#endregion
//#region node_modules/lucide-react/dist/esm/icons/circle-x.js
/**
* @license lucide-react v0.468.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var CircleX = createLucideIcon("CircleX", [
	["circle", {
		cx: "12",
		cy: "12",
		r: "10",
		key: "1mglay"
	}],
	["path", {
		d: "m15 9-6 6",
		key: "1uzhvr"
	}],
	["path", {
		d: "m9 9 6 6",
		key: "z0biqf"
	}]
]);
//#endregion
//#region components/portal-page.tsx
var ORDER_SELECT = "id,order_number,product_slug,product_name_snapshot,amount_bdt,customer_name,customer_email,customer_phone,transaction_reference,payment_method,payment_status,proof_path,proof_status,status,delivery_status,delivery_error,lifecycle_state,historical,is_test,purchase_date_label,payment_method_detail,admin_note,created_at";
var BOOKING_SELECT = "id,booking_number,duration_minutes,amount_bdt,customer_name,customer_email,customer_phone,business_name,preferred_start,transaction_reference,payment_method,payment_status,proof_path,proof_status,status,meet_url,delivery_error,lifecycle_state,is_test,created_at";
var EMPTY_FILTERS = {
	product: "ALL",
	status: "ALL",
	from: "",
	to: ""
};
function friendlyStatus(status) {
	return status.replaceAll("_", " ");
}
function settingObject(settings, key) {
	const value = settings.find((row) => row.key === key)?.value;
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function statusTone(status) {
	if ([
		"APPROVED",
		"ACCESS_SENT",
		"CONFIRMED",
		"COMPLETED"
	].includes(status)) return "green";
	if ([
		"REJECTED",
		"CANCELLED",
		"DELIVERY_ERROR",
		"RETRY_REQUIRED"
	].includes(status)) return "red";
	if (status === "PENDING") return "gold";
	return "teal";
}
function publicId(subject) {
	return subject.kind === "orders" ? subject.row.order_number : subject.row.booking_number;
}
function callbackError() {
	if (typeof window === "undefined") return "";
	const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
	const query = new URLSearchParams(window.location.search);
	const code = hash.get("error_code") || query.get("error_code");
	const error = hash.get("error") || query.get("error");
	const description = hash.get("error_description") || query.get("error_description");
	if (!code && !error && !description) return "";
	if (code === "otp_expired" || /expired/i.test(description || "")) return "This magic link has expired or was already used. Request a fresh link below.";
	return "This sign-in link is invalid or could not be verified. Request a fresh secure link.";
}
function clearAuthFragment() {
	if (typeof window === "undefined") return;
	const callbackUrl = `${window.location.hash}${window.location.search}`;
	if (!/(?:access_token|refresh_token|error|error_description|error_code|code)=/i.test(callbackUrl)) return;
	window.history.replaceState({}, document.title, window.location.pathname);
}
function authMessage(message, context) {
	if (/rate limit|security purposes|too many/i.test(message)) return "Please wait before requesting another email.";
	if (/expired|otp_expired/i.test(message)) return "This code or link has expired. Request a new one.";
	if (/token.*invalid|invalid.*token/i.test(message)) return "That verification code is invalid or has already been used.";
	if (context === "otp") return "The code could not be verified. Check every digit or request a new code.";
	return "If this email is authorized, a secure sign-in message will arrive shortly.";
}
function PortalLogin({ notice = "" }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [sent, setSent] = (0, import_react.useState)(false);
	const [sentMessage, setSentMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const client = getBrowserSupabase();
	function rememberLoginIntent() {
		window.localStorage.setItem("sw-portal-login-intent", String(Date.now()));
	}
	(0, import_react.useEffect)(() => {
		const storageKey = `sw-portal-otp-expiry:${email.toLowerCase()}`;
		const update = () => {
			const stored = Number(window.sessionStorage.getItem(storageKey) || 0);
			setSeconds(Math.max(0, Math.ceil((stored - Date.now()) / 1e3)));
		};
		update();
		const timer = window.setInterval(update, 250);
		return () => window.clearInterval(timer);
	}, [email]);
	function startOtpTimer(expiresAt) {
		const supplied = expiresAt ? new Date(expiresAt).getTime() : 0;
		const expires = Number.isFinite(supplied) && supplied > Date.now() ? supplied : Date.now() + 3e5;
		window.sessionStorage.setItem(`sw-portal-otp-expiry:${email.toLowerCase()}`, String(expires));
		setSeconds(Math.max(1, Math.ceil((expires - Date.now()) / 1e3)));
	}
	async function sendPortalOtp() {
		if (!client || loading || !email.trim()) return;
		setLoading(true);
		rememberLoginIntent();
		setError("");
		const { data, error: functionError } = await client.functions.invoke("portal-auth", { body: {
			action: "request-otp",
			email: email.trim().toLowerCase()
		} });
		const payload = data || {};
		let serverMessage = payload.message || "";
		if (!serverMessage && functionError && "context" in functionError) {
			const context = functionError.context;
			if (context instanceof Response) serverMessage = (await context.clone().json().catch(() => null))?.message || "";
		}
		if (functionError || !payload.sent) {
			if (functionError) console.error("Portal email OTP request failed.", functionError);
			setError(serverMessage || "The verification code could not be sent. Please try again.");
		} else {
			setOtp("");
			setSent(true);
			setSentMessage(serverMessage || "Open the newest email and enter its verification code below.");
			setError("");
			startOtpTimer(payload.expiresAt);
		}
		setLoading(false);
	}
	async function verifyEmailOtp() {
		if (!client || loading || seconds <= 0 || !/^\d{6,8}$/.test(otp)) return;
		setLoading(true);
		setError("");
		const { error: sessionError } = await client.auth.verifyOtp({
			email: email.trim().toLowerCase(),
			token: otp,
			type: "email"
		});
		if (sessionError) {
			console.error("Portal OTP verification failed.", sessionError);
			setError(authMessage(sessionError.message, "otp"));
		} else {
			window.sessionStorage.removeItem(`sw-portal-otp-expiry:${email.toLowerCase()}`);
			setSeconds(0);
			setOtp("");
		}
		setLoading(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-login portal-auth portal-static-ui portal-auth--otp",
		"data-motion-surface": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "portal-login-mark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 29 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				en: "SECURE OWNER ACCESS",
				bn: "SECURE OWNER ACCESS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
				"Secure Portal",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Sign-In." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Enter your authorized email to continue. Access is checked privately on the server.",
				bn: "Enter your authorized email to continue. Access is checked privately on the server."
			}) }),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-auth-notice",
				role: "alert",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: notice })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-auth-form",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "AUTHORIZED EMAIL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						value: email,
						onChange: (event) => setEmail(event.target.value),
						required: true,
						autoComplete: "email",
						placeholder: "name@example.com"
					})] })] }),
					!sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "button button--primary portal-auth-submit",
						type: "button",
						onClick: () => void sendPortalOtp(),
						disabled: loading || !email,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Sending secure code…" : "Send email OTP" }), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							className: "spin",
							size: 16
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { size: 16 })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-otp-panel",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "portal-sent",
								role: "status",
								"aria-live": "polite",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Verification code requested" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: sentMessage || "Open the newest email and enter its verification code below." })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `portal-otp-countdown ${seconds === 0 ? "is-expired" : ""}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: seconds > 0 ? "CODE EXPIRES IN" : "CODE EXPIRED" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
										"aria-live": "polite",
										children: [
											String(Math.floor(seconds / 60)).padStart(2, "0"),
											":",
											String(seconds % 60).padStart(2, "0")
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { transform: `scaleX(${Math.min(1, seconds / 300)})` } }) })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EMAIL VERIFICATION CODE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "portal-otp-input",
								value: otp,
								onChange: (event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 8)),
								inputMode: "numeric",
								pattern: "[0-9]{6,8}",
								maxLength: 8,
								autoComplete: "one-time-code",
								disabled: seconds === 0,
								"aria-label": "Email verification code",
								autoFocus: true
							})] }),
							seconds > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button button--primary portal-auth-submit",
								type: "button",
								onClick: () => void verifyEmailOtp(),
								disabled: loading || !/^\d{6,8}$/.test(otp),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Verifying code…" : "Verify and enter portal" }), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
									className: "spin",
									size: 16
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 })]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "button portal-auth-submit",
								type: "button",
								onClick: () => void sendPortalOtp(),
								disabled: loading,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loading ? "Sending new code…" : "Resend OTP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									className: loading ? "spin" : "",
									size: 16
								})]
							})
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "form-error",
						role: "alert",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: error })]
					}),
					sent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "portal-otp-security",
						children: "Only the privately allowlisted owner account can open the portal. Expired, invalid, and used codes are rejected by Supabase Auth."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-auth-security",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Protected by Supabase Auth · Owner authorization required" })]
			})
		]
	});
}
function PortalState({ kind, onRetry, onSignOut }) {
	if (kind === "checking") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-login portal-static-ui portal-gate-skeleton",
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "portal-login-mark",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
					className: "spin",
					size: 29
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				en: "SECURE PORTAL",
				bn: "সিকিউর পোর্টাল"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "Verifying your secure session…",
				bn: "আপনার সিকিউর সেশন যাচাই হচ্ছে…"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-check-progress",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: "No private records render until authorization is confirmed.",
				bn: "অনুমোদন নিশ্চিত না হওয়া পর্যন্ত কোনো প্রাইভেট রেকর্ড দেখা যাবে না।"
			}) })
		]
	});
	const unauthorized = kind === "unauthorized";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-login portal-static-ui",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "portal-login-mark portal-login-mark--error",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 29 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
				en: unauthorized ? "ACCESS DENIED" : "PORTAL UNAVAILABLE",
				bn: unauthorized ? "অ্যাকসেস নেই" : "পোর্টাল পাওয়া যাচ্ছে না"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: unauthorized ? "This account is not authorized." : "We could not verify access.",
				bn: unauthorized ? "এই অ্যাকাউন্ট অনুমোদিত নয়।" : "অ্যাকসেস যাচাই করা যায়নি।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
				en: unauthorized ? "Sign out, then request the secure link for the approved owner account." : "Your data remains protected. Retry the secure connection.",
				bn: unauthorized ? "সাইন আউট করে অনুমোদিত ওনার অ্যাকাউন্টের জন্য সিকিউর লিংক নিন।" : "আপনার ডেটা সুরক্ষিত আছে। সিকিউর কানেকশন আবার চেষ্টা করুন।"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-state-actions",
				children: [onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button button--primary",
					type: "button",
					onClick: onRetry,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Retry access check",
						bn: "আবার যাচাই করুন"
					}) })]
				}), onSignOut && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "button",
					type: "button",
					onClick: onSignOut,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
						en: "Sign out",
						bn: "সাইন আউট"
					}) })]
				})]
			})
		]
	});
}
function MetricCard({ label, value, detail, icon, tone = "teal", delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: `portal-metric portal-metric--${tone}`,
		"data-reveal": "card",
		style: { "--reveal-delay": `${delay}ms` },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: icon })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: value }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: detail }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "portal-metric-line" })
		]
	});
}
function PortalSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-skeleton",
		role: "status",
		"aria-live": "polite",
		"aria-label": "Loading secure records",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portal-skeleton-metrics",
			children: Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, index))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portal-skeleton-board",
			children: Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, index))
		})]
	});
}
function EmptyState({ search, kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-empty-state",
		"data-reveal": "scale",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: search ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 24 }) : kind === "archive" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 24 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { size: 24 }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: search ? "No matching records" : kind === "archive" ? "Archive is clear" : `No ${kind} yet` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: search ? "Try a different customer, ID, phone, or status." : "New verified activity will appear here automatically after refresh." })
		]
	});
}
function SubjectCard({ subject, onOpen }) {
	const row = subject.row;
	const id = publicId(subject);
	const title = subject.kind === "orders" ? subject.row.product_name_snapshot : `${subject.row.duration_minutes} minute session`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: `portal-subject-card ${["DELIVERY_ERROR", "RETRY_REQUIRED"].includes(row.status) ? "needs-attention" : ""}`,
		type: "button",
		onClick: (event) => onOpen(subject, event.currentTarget),
		"data-motion-card": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-card-top",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
					tone: statusTone(row.status),
					children: friendlyStatus(row.status)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: row.customer_name }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-card-meta",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["৳", row.amount_bdt.toLocaleString("en-US")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(row.created_at).toLocaleDateString("en-GB", {
					timeZone: "Asia/Dhaka",
					day: "2-digit",
					month: "short"
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-card-foot",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 12 }), new Date(row.created_at).toLocaleTimeString("en-GB", {
					timeZone: "Asia/Dhaka",
					hour: "2-digit",
					minute: "2-digit"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
			})
		]
	});
}
function OperationsTable({ kind, subjects, search, onOpen }) {
	if (!subjects.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		search,
		kind
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-data-grid",
		"aria-label": `${kind} operations table`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-data-grid-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LIVE DATABASE TABLE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
				subjects.length,
				" ",
				kind
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Click a row to open the secure detail drawer." })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portal-data-grid-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: kind === "orders" ? "ORDER" : "BOOKING"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "CUSTOMER"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: kind === "orders" ? "PRODUCT" : "SESSION"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "AMOUNT"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: kind === "orders" ? "PAYMENT" : "REQUESTED TIME"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: "STATUS"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					scope: "col",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Open"
					})
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: subjects.map((subject) => {
				const row = subject.row;
				const id = publicId(subject);
				const order = subject.kind === "orders" ? subject.row : null;
				const booking = subject.kind === "bookings" ? subject.row : null;
				const title = order ? order.product_name_snapshot : `${booking?.duration_minutes || 0} minute consultation`;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "portal-data-grid-open",
						type: "button",
						onClick: (event) => onOpen(subject, event.currentTarget),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: id }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: order?.purchase_date_label || new Date(row.created_at).toLocaleString("en-GB", {
							timeZone: "Asia/Dhaka",
							day: "2-digit",
							month: "short",
							year: "numeric",
							hour: "2-digit",
							minute: "2-digit"
						}) })]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: row.customer_name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.customer_email }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: row.customer_phone })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title }), booking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: booking.business_name })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", row.amount_bdt.toLocaleString("en-US")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: order ? order.transaction_reference : "Manual verification" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: order ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.proof_path ? "Proof attached" : "No proof" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: order.proof_status })] }) : booking ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: new Date(booking.preferred_start).toLocaleDateString("en-GB", {
						timeZone: "Asia/Dhaka",
						day: "2-digit",
						month: "short"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [new Date(booking.preferred_start).toLocaleTimeString("en-GB", {
						timeZone: "Asia/Dhaka",
						hour: "2-digit",
						minute: "2-digit"
					}), " Dhaka"] })] }) : null }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
						tone: statusTone(row.status),
						children: friendlyStatus(row.status)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: row.delivery_error ? "error-text" : "",
						children: row.delivery_error || "No delivery error"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "portal-data-grid-chevron",
						type: "button",
						"aria-label": `Open ${id}`,
						onClick: (event) => onOpen(subject, event.currentTarget),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })
					}) })
				] }, `${subject.kind}-${row.id}`);
			}) })] })
		})]
	});
}
function PortalFilterBar({ kind, filters, onChange, savedViews, onSave }) {
	const [name, setName] = (0, import_react.useState)("");
	const relevantViews = savedViews.filter((row) => row.entity === kind);
	const presets = kind === "orders" ? [
		["Pending payment review", {
			...EMPTY_FILTERS,
			status: "PENDING"
		}],
		["Access delivery failed", {
			...EMPTY_FILTERS,
			status: "DELIVERY_ERROR"
		}],
		["Access sent", {
			...EMPTY_FILTERS,
			status: "ACCESS_SENT"
		}],
		["Rejected", {
			...EMPTY_FILTERS,
			status: "REJECTED"
		}],
		["InstaWave", {
			...EMPTY_FILTERS,
			product: "InstaWave"
		}],
		["Lead Data Tools", {
			...EMPTY_FILTERS,
			product: "Lead Data Tools"
		}]
	] : [
		["Pending review", {
			...EMPTY_FILTERS,
			status: "PENDING"
		}],
		["Confirmed", {
			...EMPTY_FILTERS,
			status: "CONFIRMED"
		}],
		["Action required", {
			...EMPTY_FILTERS,
			status: "DELIVERY_ERROR"
		}]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-filter-bar",
		"aria-label": `${kind} filters`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-saved-view-row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAVED VIEWS" }),
					presets.map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange(value),
						children: label
					}, label)),
					relevantViews.map((view) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => onChange({
							...EMPTY_FILTERS,
							...view.filters || {}
						}),
						children: String(view.name)
					}, String(view.id)))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-filter-controls",
				children: [
					kind === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Product", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.product,
						onChange: (event) => onChange({
							...filters,
							product: event.target.value
						}),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ALL" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "InstaWave" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Lead Data Tools" })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: filters.status,
						onChange: (event) => onChange({
							...filters,
							status: event.target.value
						}),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "ALL" }), (kind === "orders" ? [
							"PENDING",
							"APPROVED",
							"ACCESS_SENT",
							"REJECTED",
							"DELIVERY_ERROR",
							"REVOKED"
						] : [
							"PENDING",
							"APPROVED",
							"CONFIRMED",
							"REJECTED",
							"DELIVERY_ERROR",
							"CANCELLED"
						]).map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: status }, status))]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["From", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: filters.from,
						onChange: (event) => onChange({
							...filters,
							from: event.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["To", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: filters.to,
						onChange: (event) => onChange({
							...filters,
							to: event.target.value
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "portal-filter-reset",
						onClick: () => onChange(EMPTY_FILTERS),
						children: "Reset"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "portal-save-view",
				onSubmit: (event) => {
					event.preventDefault();
					if (name.trim().length >= 2) onSave(name.trim()).then(() => setName(""));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Save current view", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					minLength: 2,
					maxLength: 80,
					onChange: (event) => setName(event.target.value),
					placeholder: "e.g. This week pending"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: name.trim().length < 2,
					children: "Save view"
				})]
			})
		]
	});
}
function PerformanceTrend({ orders, bookings, preset }) {
	const [product, setProduct] = (0, import_react.useState)("ALL");
	const grouped = (0, import_react.useMemo)(() => {
		const longRange = preset === "all" || preset === "custom";
		const labelFor = (iso) => new Intl.DateTimeFormat("en-GB", longRange ? {
			timeZone: "Asia/Dhaka",
			month: "short",
			year: "2-digit"
		} : {
			timeZone: "Asia/Dhaka",
			day: "2-digit",
			month: "short"
		}).format(new Date(iso));
		const rows = /* @__PURE__ */ new Map();
		const add = (createdAt, amount, state) => {
			const key = new Intl.DateTimeFormat("en-CA", longRange ? {
				timeZone: "Asia/Dhaka",
				year: "numeric",
				month: "2-digit"
			} : {
				timeZone: "Asia/Dhaka",
				year: "numeric",
				month: "2-digit",
				day: "2-digit"
			}).format(new Date(createdAt));
			const label = labelFor(createdAt);
			const current = rows.get(key) || {
				key,
				label,
				revenue: 0,
				approved: 0,
				rejected: 0,
				pending: 0
			};
			if (state === "approved") {
				current.approved += 1;
				current.revenue += amount;
			} else if (state === "rejected") current.rejected += 1;
			else current.pending += 1;
			rows.set(key, current);
		};
		if (product !== "Consulting") orders.filter((row) => product === "ALL" || row.product_name_snapshot.toLowerCase().includes(product.toLowerCase())).forEach((row) => {
			const state = ["REJECTED", "REVOKED"].includes(row.status) || row.delivery_status === "REVOKED" ? "rejected" : ["APPROVED", "ACCESS_SENT"].includes(row.status) && !["REVOKED", "REVOKE_PENDING"].includes(row.delivery_status || "") ? "approved" : "pending";
			add(row.created_at, row.amount_bdt, state);
		});
		if (product === "ALL" || product === "Consulting") bookings.forEach((row) => {
			const state = ["REJECTED", "CANCELLED"].includes(row.status) ? "rejected" : [
				"APPROVED",
				"CONFIRMED",
				"COMPLETED"
			].includes(row.status) ? "approved" : "pending";
			add(row.created_at, row.amount_bdt, state);
		});
		return [...rows.values()].sort((left, right) => left.key.localeCompare(right.key));
	}, [
		bookings,
		orders,
		preset,
		product
	]);
	const maxRevenue = Math.max(1, ...grouped.map((row) => row.revenue));
	const totalRevenue = grouped.reduce((sum, row) => sum + row.revenue, 0);
	const approved = grouped.reduce((sum, row) => sum + row.approved, 0);
	const rejected = grouped.reduce((sum, row) => sum + row.rejected, 0);
	const pending = grouped.reduce((sum, row) => sum + row.pending, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-trend",
		"aria-labelledby": "performance-trend-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PERFORMANCE TREND · ASIA/DHAKA" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "performance-trend-title",
					children: "Approved revenue and workflow outcomes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Revenue bars include approved, non-revoked orders and confirmed consulting only. Counts stay separate so statuses never overlap." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-trend-filters",
				"aria-label": "Trend product filter",
				children: [
					"ALL",
					"InstaWave",
					"Lead Data Tools",
					"Consulting"
				].map((value) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: product === value ? "active" : "",
					onClick: () => setProduct(value),
					children: value === "ALL" ? "All" : value
				}, value))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-trend-summary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["৳", totalRevenue.toLocaleString("en-US")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Approved revenue" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: approved }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Approved" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: rejected }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Rejected / revoked" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: pending }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Pending" })] })
				]
			}),
			grouped.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-trend-chart",
				role: "img",
				"aria-label": `${product} performance: approved revenue ${totalRevenue} taka, ${approved} approved, ${rejected} rejected or revoked, ${pending} pending.`,
				children: grouped.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-trend-point",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "portal-trend-bar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								style: { height: `${Math.max(row.revenue ? 8 : 1, row.revenue / maxRevenue * 100)}%` },
								title: `${row.label}: ৳${row.revenue.toLocaleString("en-US")}`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							row.approved,
							"A · ",
							row.rejected,
							"R · ",
							row.pending,
							"P"
						] })
					]
				}, row.label))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-trend-empty",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 24 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "No records in this range" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Choose another date range or product to see verified performance." })
				]
			})
		]
	});
}
function DashboardOverview({ orders, bookings, onOpen, setView }) {
	const [preset, setPreset] = (0, import_react.useState)("all");
	const [from, setFrom] = (0, import_react.useState)("");
	const [to, setTo] = (0, import_react.useState)("");
	const bounds = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		const end = to ? /* @__PURE__ */ new Date(`${to}T23:59:59+06:00`) : now;
		let start = null;
		if (preset === "today") start = /* @__PURE__ */ new Date(`${new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Dhaka" }).format(now)}T00:00:00+06:00`);
		if (preset === "week") {
			start = new Date(now);
			start.setDate(now.getDate() - 6);
		}
		if (preset === "month") {
			const dhakaMonth = new Intl.DateTimeFormat("en-CA", {
				timeZone: "Asia/Dhaka",
				year: "numeric",
				month: "2-digit"
			}).format(now);
			start = /* @__PURE__ */ new Date(`${dhakaMonth}-01T00:00:00+06:00`);
		}
		if (preset === "30") start = /* @__PURE__ */ new Date(now.getTime() - 29 * 864e5);
		if (preset === "custom" && from) start = /* @__PURE__ */ new Date(`${from}T00:00:00+06:00`);
		return {
			start,
			end: preset === "custom" ? end : now
		};
	}, [
		from,
		preset,
		to
	]);
	const inRange = (0, import_react.useCallback)((createdAt) => {
		const value = Date.parse(createdAt);
		return (!bounds.start || value >= bounds.start.getTime()) && value <= bounds.end.getTime();
	}, [bounds]);
	const rangeOrders = orders.filter((row) => row.lifecycle_state === "ACTIVE" && inRange(row.created_at));
	const rangeBookings = bookings.filter((row) => row.lifecycle_state === "ACTIVE" && inRange(row.created_at));
	const approvedOrders = rangeOrders.filter((order) => ["APPROVED", "ACCESS_SENT"].includes(order.status) && !["REVOKED", "REVOKE_PENDING"].includes(order.delivery_status || ""));
	const rejectedOrders = rangeOrders.filter((order) => ["REJECTED", "REVOKED"].includes(order.status) || order.delivery_status === "REVOKED");
	const approvedBookings = rangeBookings.filter((booking) => [
		"APPROVED",
		"CONFIRMED",
		"COMPLETED"
	].includes(booking.status));
	const rejectedBookings = rangeBookings.filter((booking) => ["REJECTED", "CANCELLED"].includes(booking.status));
	const approvedOrderValue = approvedOrders.reduce((sum, order) => sum + order.amount_bdt, 0);
	const approvedBookingValue = approvedBookings.reduce((sum, booking) => sum + booking.amount_bdt, 0);
	const approvedValue = approvedOrderValue + approvedBookingValue;
	const rejectedValue = rejectedOrders.reduce((sum, order) => sum + order.amount_bdt, 0) + rejectedBookings.reduce((sum, booking) => sum + booking.amount_bdt, 0);
	const pending = rangeOrders.filter((order) => order.status === "PENDING").length;
	const pendingBookings = rangeBookings.filter((booking) => booking.status === "PENDING").length;
	const attention = [...rangeOrders, ...rangeBookings].filter((row) => ["DELIVERY_ERROR", "RETRY_REQUIRED"].includes(row.status)).length;
	const completed = approvedOrders.filter((order) => order.status === "ACCESS_SENT").length + rangeBookings.filter((booking) => ["CONFIRMED", "COMPLETED"].includes(booking.status)).length;
	const total = Math.max(1, rangeOrders.length + rangeBookings.length);
	const recent = [...rangeOrders.map((row) => ({
		kind: "orders",
		row
	})), ...rangeBookings.map((row) => ({
		kind: "bookings",
		row
	}))].sort((a, b) => Date.parse(b.row.created_at) - Date.parse(a.row.created_at)).slice(0, 8);
	const failedJobs = [...rangeOrders, ...rangeBookings].filter((row) => ["DELIVERY_ERROR", "RETRY_REQUIRED"].includes(row.status));
	const soon = rangeBookings.filter((booking) => ["CONFIRMED", "APPROVED"].includes(booking.status) && Date.parse(booking.preferred_start) > Date.now() && Date.parse(booking.preferred_start) < Date.now() + 864e5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "portal-period-controls",
			"aria-label": "Dashboard date range",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "REPORTING RANGE · ASIA/DHAKA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: preset === "all" ? "All time" : bounds.start ? `${bounds.start.toLocaleDateString("en-GB", { timeZone: "Asia/Dhaka" })} to ${bounds.end.toLocaleDateString("en-GB", { timeZone: "Asia/Dhaka" })}` : "Custom range" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "portal-period-presets",
					children: [
						["today", "Today"],
						["week", "This week"],
						["month", "This month"],
						["30", "Last 30 days"],
						["all", "All time"],
						["custom", "Custom"]
					].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: preset === value ? "active" : "",
						onClick: () => setPreset(value),
						children: label
					}, value))
				}),
				preset === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-period-dates",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["From", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: from,
						onChange: (event) => setFrom(event.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["To", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "date",
						value: to,
						onChange: (event) => setTo(event.target.value)
					})] })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "portal-action-center",
			"aria-labelledby": "action-center-title",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TODAY / ACTION CENTER" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				id: "action-center-title",
				children: "Work that needs a decision."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Live database counts · no separate alert page" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("orders"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 17 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [pending, " orders"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Awaiting payment review" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("bookings"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 17 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [pendingBookings, " bookings"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Awaiting session review" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("history"),
					className: failedJobs.length ? "needs-attention" : "",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [failedJobs.length, " failed jobs"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Drive, Calendar, Sheets, or email" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setView("bookings"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 17 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [soon.length, " sessions soon"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Starting within 24 hours" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 15 })
					]
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-metrics-grid",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "PENDING ORDERS",
					value: String(pending),
					detail: "New submissions awaiting review",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 17 }),
					tone: "gold",
					delay: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "APPROVED ORDERS",
					value: String(approvedOrders.length),
					detail: "Approved or access sent",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 17 }),
					tone: "green",
					delay: 50
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "APPROVED REVENUE",
					value: `৳${approvedValue.toLocaleString("en-US")}`,
					detail: "Excludes rejected and revoked",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 17 }),
					tone: "green",
					delay: 100
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "REJECTED / REVOKED",
					value: String(rejectedOrders.length + rejectedBookings.length),
					detail: `৳${rejectedValue.toLocaleString("en-US")} excluded`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 17 }),
					tone: "red",
					delay: 150
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "ACTION REQUIRED",
					value: String(attention),
					detail: "Delivery or integration failures",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }),
					tone: attention ? "red" : "teal",
					delay: 200
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "PENDING BOOKINGS",
					value: String(pendingBookings),
					detail: "Sessions to review",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 17 }),
					tone: "teal",
					delay: 250
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "TOTAL VALID REVENUE",
					value: `৳${approvedValue.toLocaleString("en-US")}`,
					detail: "Verified active order value",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 17 }),
					tone: "green",
					delay: 300
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
					label: "ACTIVE ACCESS",
					value: String(approvedOrders.filter((row) => row.delivery_status === "ACCESS_SENT" || row.status === "ACCESS_SENT").length),
					detail: "Customers with active delivery",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 17 }),
					tone: "teal",
					delay: 350
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "portal-product-breakdown",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRODUCT & PRICE-ERA BREAKDOWN" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Immutable paid amounts" })] }),
				["InstaWave", "Lead Data Tools"].map((product) => {
					const rows = approvedOrders.filter((order) => order.product_name_snapshot.toLowerCase().includes(product.toLowerCase()));
					const current = rows.filter((order) => order.amount_bdt === 4500);
					const old = rows.filter((order) => order.amount_bdt !== 4500);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: product }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [rows.length, " approved orders"] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", rows.reduce((sum, row) => sum + row.amount_bdt, 0).toLocaleString("en-US")] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							"Current-price: ",
							current.length,
							" · Historical-price: ",
							old.length
						] })
					] }, product);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Consulting" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [approvedBookings.length, " approved sessions"] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", approvedBookingValue.toLocaleString("en-US")] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Verified sessions, including historical bookings" })
				] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PerformanceTrend, {
			orders: rangeOrders,
			bookings: rangeBookings,
			preset
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-overview-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-health",
				"data-reveal": "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OPERATIONS HEALTH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Real work, at a glance." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 19 })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-health-body",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "portal-donut",
							style: { "--progress": `${Math.round(completed / total * 100)}%` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [Math.round(completed / total * 100), "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "fulfilled" })] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "portal-health-bars",
							children: [
								[
									"Orders",
									rangeOrders.length,
									total
								],
								[
									"Bookings",
									rangeBookings.length,
									total
								],
								[
									"Completed",
									completed,
									total
								]
							].map(([label, value, max]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: value })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { style: { width: `${Number(value) / Number(max) * 100}%` } }) })] }, String(label)))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "Live database snapshot"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setView("orders"),
						children: ["Open workflow ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-activity",
				"data-reveal": "card",
				style: { "--reveal-delay": "80ms" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "RECENT ACTIVITY" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Newest submissions" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setView("orders"),
					children: "View all"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: recent.length ? recent.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: (event) => onOpen(subject, event.currentTarget),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: subject.kind === "orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 14 }) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: subject.row.customer_name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
							publicId(subject),
							" · ",
							friendlyStatus(subject.row.status)
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["৳", subject.row.amount_bdt.toLocaleString("en-US")] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
					]
				}, `${subject.kind}-${subject.row.id}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					search: false,
					kind: "orders"
				}) })]
			})]
		})
	] });
}
function SubjectDrawer({ subject, busy, onClose, onProof, onStatus, savedNote, onSaveNote, resources, deliveries }) {
	const drawerRef = (0, import_react.useRef)(null);
	const [action, setAction] = (0, import_react.useState)(null);
	const [correction, setCorrection] = (0, import_react.useState)("");
	const [privateNote, setPrivateNote] = (0, import_react.useState)(String(savedNote?.note || ""));
	const [tags, setTags] = (0, import_react.useState)(Array.isArray(savedNote?.tags) ? savedNote.tags.join(", ") : "");
	const row = subject.row;
	const isOrder = subject.kind === "orders";
	const detailTitle = subject.kind === "orders" ? subject.row.product_name_snapshot : `${subject.row.duration_minutes} minute session`;
	const mappedResources = subject.kind === "orders" ? resources.filter((resource) => resource.product_slug === subject.row.product_slug && resource.active !== false) : [];
	const deliveryStatus = isOrder ? String(row.delivery_status || "") : "";
	const hasActiveAccess = isOrder && ["ACCESS_SENT", "PARTIAL"].includes(deliveryStatus);
	const canReject = row.lifecycle_state === "ACTIVE" && (isOrder ? [
		"PENDING",
		"APPROVED",
		"DELIVERY_ERROR",
		"RETRY_REQUIRED",
		"ACCESS_SENT"
	].includes(row.status) : [
		"PENDING",
		"APPROVED",
		"DELIVERY_ERROR",
		"RETRY_REQUIRED"
	].includes(row.status));
	const requestClose = (0, import_react.useCallback)(() => {
		if (busy) return;
		const noteChanged = privateNote !== String(savedNote?.note || "") || tags !== (Array.isArray(savedNote?.tags) ? savedNote.tags.join(", ") : "");
		if ((correction.trim() || noteChanged) && !window.confirm("Discard the unsent change and close?")) return;
		onClose();
	}, [
		busy,
		correction,
		onClose,
		privateNote,
		savedNote,
		tags
	]);
	(0, import_react.useEffect)(() => {
		document.body.classList.add("drawer-open");
		const previous = document.activeElement;
		window.setTimeout(() => drawerRef.current?.querySelector("button, a, textarea")?.focus(), 30);
		const handleKey = (event) => {
			if (event.key === "Escape") {
				requestClose();
				return;
			}
			if (event.key !== "Tab" || !drawerRef.current) return;
			const focusable = Array.from(drawerRef.current.querySelectorAll("button:not([disabled]), a[href], textarea:not([disabled])"));
			if (!focusable.length) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => {
			document.body.classList.remove("drawer-open");
			window.removeEventListener("keydown", handleKey);
			previous?.focus();
		};
	}, [requestClose]);
	async function submitAction() {
		if (!action || busy) return;
		const command = action === "approve" ? "APPROVE" : action === "reapprove" ? "REAPPROVE" : action === "reject" ? "REJECT" : action === "retry" ? "RETRY" : action === "complete" ? "COMPLETE" : action === "revoke" ? "REVOKE" : action === "restore" ? isOrder && row.lifecycle_state === "ACTIVE" && deliveryStatus === "REVOKED" ? "RESTORE_ACCESS" : "RESTORE_RECORD" : action === "archive" ? "ARCHIVE" : action === "trash" ? "TRASH" : action === "permanent-delete" ? "PERMANENT_DELETE_TEST" : action === "correct-email" ? "CORRECT_EMAIL" : action === "reschedule" ? "RESCHEDULE" : action === "cancel-booking" ? "CANCEL" : "CORRECT_PRODUCT";
		if (action === "permanent-delete" && correction.trim() !== publicId(subject)) return;
		if ((action === "correct-email" || action === "correct-product") && correction.trim().length < 3) return;
		await onStatus(subject, command, void 0, action === "correct-email" ? { customer_email: correction.trim() } : action === "correct-product" ? { product_slug: correction.trim() } : action === "reschedule" ? { preferred_start: new Date(correction).toISOString() } : action === "permanent-delete" ? { confirmation: correction.trim() } : void 0);
		setAction(null);
		setCorrection("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-drawer-layer",
		role: "presentation",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "portal-drawer-backdrop",
			type: "button",
			"aria-label": "Close order detail",
			onClick: requestClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "portal-drawer",
			ref: drawerRef,
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "portal-drawer-title",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isOrder ? "ORDER DETAIL" : "BOOKING DETAIL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: publicId(subject) })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Close detail",
					onClick: requestClose,
					disabled: busy,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 19 })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-drawer-scroll",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "portal-drawer-hero",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
									tone: statusTone(row.status),
									children: friendlyStatus(row.status)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									id: "portal-drawer-title",
									children: row.customer_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: detailTitle }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["৳", row.amount_bdt.toLocaleString("en-US")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(row.created_at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }) })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "portal-detail-grid",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "EMAIL" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.customer_email })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PHONE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: row.customer_phone })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isOrder ? "TRANSACTION" : "BUSINESS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: subject.kind === "orders" ? subject.row.transaction_reference : subject.row.business_name })] }),
								subject.kind === "orders" && subject.row.purchase_date_label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PURCHASE DATE / MONTH" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: subject.row.purchase_date_label })] }),
								subject.kind === "orders" && subject.row.admin_note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IMPORT / SALE NOTES" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: subject.row.admin_note })] }),
								subject.kind === "orders" && subject.row.payment_method_detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PAYMENT DETAILS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: subject.row.payment_method_detail })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PAYMENT PROOF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									disabled: !row.proof_path,
									onClick: () => void onProof(row.proof_path),
									children: row.proof_path ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Open secure proof ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 12 })] }) : "Not attached"
								})] }),
								subject.kind === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PREFERRED TIME" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: new Date(subject.row.preferred_start).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }) })] }),
								subject.kind === "bookings" && subject.row.meet_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "GOOGLE MEET" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: subject.row.meet_url,
									target: "_blank",
									rel: "noopener noreferrer",
									children: ["Open meeting ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 12 })]
								})] })
							]
						}),
						subject.kind === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "portal-access-delivery",
							"aria-label": "Product access and Google Drive delivery",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRODUCT ACCESS / GOOGLE DRIVE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: mappedResources.length ? `${mappedResources.length} mapped resource${mappedResources.length === 1 ? "" : "s"}` : "Mapping requires attention" })] }), mappedResources.map((resource) => {
								const delivery = deliveries.find((item) => item.order_id === row.id && item.resource_id === resource.id);
								const state = String(delivery?.status || (subject.row.historical && subject.row.delivery_status === "ACCESS_SENT" ? "OWNER_REPORTED_ACCESS" : "NOT_STARTED"));
								const url = String(resource.customer_url || "");
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: String(resource.resource_name || "Product folder") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
									state.replaceAll("_", " "),
									" · ",
									row.customer_email
								] })] }), url.startsWith("https://drive.google.com/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: url,
									target: "_blank",
									rel: "noopener noreferrer",
									children: ["Open mapped folder ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 13 })]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Missing secure mapping" })] }, String(resource.id));
							})]
						}),
						["DELIVERY_ERROR", "RETRY_REQUIRED"].includes(row.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-delivery-warning",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Delivery requires attention" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "The record is safe. Retry the delivery automation when ready." })] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "portal-history",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "STATUS TIMELINE" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 13 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Submission saved" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: new Date(row.created_at).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" }) })] })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: row.status === "PENDING" ? "is-current" : "",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 13 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: friendlyStatus(row.status) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Current verified database state" })] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: "portal-private-notes",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRIVATE OWNER NOTES" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: privateNote,
									maxLength: 4e3,
									onChange: (event) => setPrivateNote(event.target.value),
									placeholder: "Internal context, customer follow-up, verification notes…"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "TAGS · COMMA SEPARATED" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: tags,
									maxLength: 240,
									onChange: (event) => setTags(event.target.value),
									placeholder: "priority, follow-up"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "portal-action",
									type: "button",
									disabled: busy,
									onClick: () => void onSaveNote(subject, privateNote, tags.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 8)),
									children: "Save private note"
								})
							]
						}),
						action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
							className: `portal-action-confirm portal-action-confirm--${action}`,
							role: "alertdialog",
							"aria-labelledby": "confirm-action-title",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [action === "reject" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
									id: "confirm-action-title",
									children: action === "approve" ? "Approve this payment?" : action === "reapprove" ? "Re-approve and restore access?" : action === "reject" ? "Reject this submission?" : action === "retry" ? "Retry secure delivery?" : action === "complete" ? "Mark this work completed?" : action === "revoke" ? "Revoke customer access?" : action === "restore" ? "Restore this record or access?" : action === "archive" ? "Archive this record?" : action === "trash" ? "Move this archived record to Trash?" : action === "permanent-delete" ? "Permanently delete this test record?" : action === "correct-email" ? "Transfer delivery to a corrected email?" : action === "reschedule" ? "Reschedule this approved booking?" : action === "cancel-booking" ? "Cancel this booking and Calendar event?" : "Correct the product mapping?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: action === "reject" ? `Yes confirms the standard payment-not-verified email to ${row.customer_email}${isOrder && ["ACCESS_SENT", "PARTIAL"].includes(String(row.delivery_status)) ? " and removes mapped Drive access" : ""}.` : action === "approve" ? `Yes confirms payment, runs the connected delivery, and emails ${row.customer_email}.` : action === "cancel-booking" ? `Yes cancels the Calendar event and emails ${row.customer_email}.` : "The interface updates only after Supabase confirms the change." })] })] }),
								(action === "correct-email" || action === "correct-product" || action === "reschedule" || action === "permanent-delete") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: action === "correct-email" ? "NEW CUSTOMER EMAIL *" : action === "reschedule" ? "NEW DHAKA DATE & TIME *" : action === "permanent-delete" ? `TYPE ${publicId(subject)} TO CONFIRM *` : "ACTIVE PRODUCT SLUG *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: action === "reschedule" ? "datetime-local" : "text",
									value: correction,
									onChange: (event) => setCorrection(event.target.value),
									placeholder: action === "correct-email" ? "customer@example.com" : action === "correct-product" ? "instawave" : action === "permanent-delete" ? publicId(subject) : void 0
								})] }),
								["correct-email", "reschedule"].includes(action) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "portal-email-preview",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Customer email preview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
										"To: ",
										action === "correct-email" && correction ? correction : row.customer_email,
										" · Template: ",
										action.replaceAll("-", " "),
										" · contains the public reference ",
										publicId(subject),
										". The final email sends only after the database confirms."
									] })] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setAction(null);
										setCorrection("");
									},
									disabled: busy,
									children: "No, go back"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "confirm",
									type: "button",
									onClick: () => void submitAction(),
									disabled: busy || (action === "correct-email" || action === "correct-product" || action === "reschedule") && correction.trim().length < 3 || action === "permanent-delete" && correction.trim() !== publicId(subject),
									children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
										className: "spin",
										size: 14
									}), " Processing securely…"] }) : action === "reject" ? "Yes, reject and email" : action === "approve" ? "Yes, approve and automate" : "Yes, confirm"
								})] })
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "portal-drawer-actions",
					children: [
						isOrder && hasActiveAccess && row.lifecycle_state === "ACTIVE" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-reject",
							type: "button",
							onClick: () => setAction("revoke"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 16 }), "Remove access"]
						}),
						canReject && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-reject",
							type: "button",
							onClick: () => setAction("reject"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 16 }), hasActiveAccess ? "Reject and remove access" : "Reject"]
						}),
						row.status === "PENDING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("approve"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), "Approve securely"]
						}),
						[
							"APPROVED",
							"DELIVERY_ERROR",
							"RETRY_REQUIRED"
						].includes(row.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("retry"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { size: 16 }), row.status === "APPROVED" ? "Send access" : "Retry delivery"]
						}),
						!isOrder && row.status === "CONFIRMED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-reject",
							type: "button",
							onClick: () => setAction("cancel-booking"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 16 }), "Cancel and email"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("complete"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { size: 16 }), "Mark completed"]
						})] }),
						isOrder && row.lifecycle_state === "ACTIVE" && deliveryStatus === "REVOKED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("restore"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), "Restore access"]
						}),
						isOrder && row.status === "REJECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("reapprove"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), "Re-approve securely"]
						}),
						row.lifecycle_state === "ARCHIVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("restore"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), "Restore record"]
						}),
						row.lifecycle_state === "ARCHIVED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-reject",
							type: "button",
							onClick: () => setAction("trash"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 }), "Move to Trash"]
						}),
						row.lifecycle_state === "TRASHED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-approve",
							type: "button",
							onClick: () => setAction("restore"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 }), "Restore from Trash"]
						}),
						row.lifecycle_state === "TRASHED" && row.is_test && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action-reject",
							type: "button",
							onClick: () => setAction("permanent-delete"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 }), "Permanently delete test record"]
						}),
						row.lifecycle_state === "ACTIVE" && (isOrder || [
							"REJECTED",
							"REVOKED",
							"COMPLETED",
							"CANCELLED",
							"ACCESS_SENT"
						].includes(row.status)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action",
							type: "button",
							onClick: () => setAction("archive"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 16 }), "Archive"]
						}),
						isOrder && row.lifecycle_state === "ACTIVE" && row.status !== "PENDING" && row.status !== "REJECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action",
							type: "button",
							onClick: () => setAction("correct-email"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }), "Transfer email"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action",
							type: "button",
							onClick: () => setAction("correct-product"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 16 }), "Correct product"]
						})] }),
						!isOrder && row.lifecycle_state === "ACTIVE" && row.status !== "PENDING" && ![
							"REJECTED",
							"CANCELLED",
							"COMPLETED"
						].includes(row.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action",
							type: "button",
							onClick: () => setAction("reschedule"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 16 }), "Reschedule"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "portal-action",
							type: "button",
							onClick: () => setAction("correct-email"),
							disabled: busy,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 }), "Correct email"]
						})] })
					]
				})
			]
		})]
	});
}
function formatPortalValue(value) {
	if (value === null || value === void 0 || value === "") return "Not available";
	if (typeof value === "boolean") return value ? "Yes" : "No";
	if (typeof value === "object") return JSON.stringify(value);
	const text = String(value);
	if (/^(20\d\d-|\d{4}-\d{2}-\d{2}T)/.test(text)) {
		const date = new Date(text);
		if (!Number.isNaN(date.valueOf())) return date.toLocaleString("en-GB", {
			timeZone: "Asia/Dhaka",
			dateStyle: "medium",
			timeStyle: "short"
		});
	}
	return text;
}
function PortalCollection({ title, eyebrow, rows, columns, empty }) {
	return rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-data-grid portal-collection",
		"data-reveal": "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-data-grid-head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: eyebrow }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
				title,
				" · ",
				rows.length
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Live owner-only database view" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portal-data-grid-scroll",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: column.label }, column.key)) }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: column.mono ? "portal-mono" : void 0,
				children: column.currency && typeof row[column.key] === "number" ? `৳${Number(row[column.key]).toLocaleString("en-US")}` : formatPortalValue(row[column.key])
			}, column.key)) }, String(row.id || row.key || index))) })] })
		})]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-empty-state",
		"data-reveal": "scale",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { size: 24 }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: empty }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "This secure view will populate as the system records activity." })
		]
	});
}
function ArchiveView({ subjects, search, onOpen }) {
	const [tab, setTab] = (0, import_react.useState)("instawave");
	const visible = subjects.filter((subject) => {
		if (subject.kind !== "orders") return tab === "general";
		const product = subject.row.product_name_snapshot.toLowerCase();
		if (tab === "instawave") return product.includes("instawave");
		if (tab === "lead") return product.includes("lead data");
		return !product.includes("instawave") && !product.includes("lead data");
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-panel-stack",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "portal-archive-tabs",
			role: "tablist",
			"aria-label": "Archive product groups",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === "instawave",
					className: tab === "instawave" ? "active" : "",
					onClick: () => setTab("instawave"),
					children: "InstaWave"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === "lead",
					className: tab === "lead" ? "active" : "",
					onClick: () => setTab("lead"),
					children: "Lead Data Tools"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === "general",
					className: tab === "general" ? "active" : "",
					onClick: () => setTab("general"),
					children: "General / New Archive"
				})
			]
		}), visible.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "portal-archive-grid",
			children: visible.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectCard, {
				subject,
				onOpen
			}, `${subject.kind}-${subject.row.id}`))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			search,
			kind: "archive"
		})]
	});
}
function AnalyticsView({ orders, bookings, events }) {
	const historical = orders.filter((row) => Boolean(row.historical)).length;
	const revenue = orders.filter((row) => row.lifecycle_state === "ACTIVE" && ["APPROVED", "ACCESS_SENT"].includes(row.status) && !["REVOKED", "REVOKE_PENDING"].includes(row.delivery_status || "")).reduce((sum, row) => sum + row.amount_bdt, 0) + bookings.filter((row) => row.lifecycle_state === "ACTIVE" && [
		"APPROVED",
		"CONFIRMED",
		"COMPLETED"
	].includes(row.status)).reduce((sum, row) => sum + row.amount_bdt, 0);
	const products = new Set(orders.map((row) => row.product_name_snapshot)).size;
	const count = (name) => events.filter((event) => event.event_name === name).length;
	const views = count("product_view");
	const checkouts = count("checkout_started");
	const submitted = count("checkout_submitted") + count("booking_submitted");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-panel-stack",
		"data-reveal": "card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-panel-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: "REAL DATABASE ANALYTICS",
						bn: "রিয়েল ডেটাবেস অ্যানালিটিক্স"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Decisions from verified records." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "These metrics are calculated from current Supabase rows; no placeholder values. Funnel rates appear only when enough first-party events exist." })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-metrics-grid portal-metrics-grid--compact",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "TOTAL ORDERS",
						value: String(orders.length),
						detail: "Including historical records",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 17 }),
						delay: 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "BOOKINGS",
						value: String(bookings.length),
						detail: "Consulting requests",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 17 }),
						tone: "teal",
						delay: 60
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "VERIFIED VALUE",
						value: `৳${revenue.toLocaleString("en-US")}`,
						detail: "Approved and delivered",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 17 }),
						tone: "green",
						delay: 120
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "PRODUCT MIX",
						value: String(products),
						detail: `${historical} historical orders`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 17 }),
						tone: "gold",
						delay: 180
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-product-breakdown",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FIRST-PARTY FUNNEL · 90 DAYS" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: events.length >= 20 ? "Live conversion signals" : "Collecting a reliable sample" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PRODUCT VIEWS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: views }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: events.length >= 20 && views ? `${Math.round(checkouts / views * 100)}% started checkout` : "Rate hidden below 20 events" })
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SUBMITTED REQUESTS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: submitted }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: events.length >= 20 && checkouts ? `${Math.round(submitted / checkouts * 100)}% of checkout starts` : "No invented conversion rate" })
					] }) })
				]
			})
		]
	});
}
function ProductsView({ products, resources, deliveries }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-panel-stack",
		"data-reveal": "card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-panel-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: "PRODUCTS & DELIVERY MAP",
						bn: "প্রোডাক্ট ও ডেলিভারি ম্যাপ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Official catalog, one source of truth." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Prices are read from Supabase and are not editable from the public site." })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Products",
				eyebrow: "OFFICIAL PRODUCT CATALOG",
				rows: products,
				columns: [
					{
						key: "name",
						label: "PRODUCT"
					},
					{
						key: "slug",
						label: "SLUG",
						mono: true
					},
					{
						key: "price_bdt",
						label: "SELLING PRICE (BDT)",
						currency: true
					},
					{
						key: "active",
						label: "ACTIVE"
					}
				],
				empty: "No products configured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Drive resources",
				eyebrow: "PER-FOLDER DELIVERY MAPPING",
				rows: resources,
				columns: [
					{
						key: "product_slug",
						label: "PRODUCT",
						mono: true
					},
					{
						key: "resource_name",
						label: "FOLDER / FILE"
					},
					{
						key: "google_resource_type",
						label: "TYPE"
					},
					{
						key: "google_resource_id",
						label: "RESOURCE ID",
						mono: true
					},
					{
						key: "customer_url",
						label: "CUSTOMER URL"
					}
				],
				empty: "No delivery resources configured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Customer delivery status",
				eyebrow: "ONE ROW PER RESOURCE",
				rows: deliveries,
				columns: [
					{
						key: "order_id",
						label: "ORDER",
						mono: true
					},
					{
						key: "resource_id",
						label: "RESOURCE",
						mono: true
					},
					{
						key: "customer_email",
						label: "CUSTOMER"
					},
					{
						key: "status",
						label: "STATUS"
					},
					{
						key: "last_error",
						label: "LAST ERROR"
					},
					{
						key: "updated_at",
						label: "UPDATED"
					}
				],
				empty: "No customer deliveries recorded"
			})
		]
	});
}
function FridaySettingsEditor({ value, onUpdate }) {
	const [active, setActive] = (0, import_react.useState)(Boolean(value.active));
	const [title, setTitle] = (0, import_react.useState)(String(value.title || "Friday Lifetime Deal"));
	const [supportingText, setSupportingText] = (0, import_react.useState)(String(value.supporting_text || "Get InstaWave or Lead Data Tools for ৳4,500 instead of ৳8,000."));
	const [buttonText, setButtonText] = (0, import_react.useState)(String(value.button_text || "Explore lifetime tools"));
	const [buttonLink, setButtonLink] = (0, import_react.useState)(String(value.button_link || "/extensions"));
	const [repeatWeekly, setRepeatWeekly] = (0, import_react.useState)(value.repeat_weekly !== false);
	const [startAt, setStartAt] = (0, import_react.useState)(String(value.start_at || "").slice(0, 16));
	const [endAt, setEndAt] = (0, import_react.useState)(String(value.end_at || "").slice(0, 16));
	(0, import_react.useEffect)(() => {
		setActive(Boolean(value.active));
		setTitle(String(value.title || "Friday Lifetime Deal"));
		setSupportingText(String(value.supporting_text || "Get InstaWave or Lead Data Tools for ৳4,500 instead of ৳8,000."));
		setButtonText(String(value.button_text || "Explore lifetime tools"));
		setButtonLink(String(value.button_link || "/extensions"));
		setRepeatWeekly(value.repeat_weekly !== false);
		setStartAt(String(value.start_at || "").slice(0, 16));
		setEndAt(String(value.end_at || "").slice(0, 16));
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "portal-friday-settings",
		onSubmit: (event) => {
			event.preventDefault();
			onUpdate({
				active,
				title: title.trim(),
				supporting_text: supportingText.trim(),
				button_text: buttonText.trim(),
				button_link: buttonLink.trim(),
				repeat_weekly: repeatWeekly,
				start_at: repeatWeekly || !startAt ? null : `${startAt}:00+06:00`,
				end_at: repeatWeekly || !endAt ? null : `${endAt}:00+06:00`,
				timezone: "Asia/Dhaka"
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "FRIDAY OFFER" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Customer-facing lifetime deal" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "The technical operator banner is permanently removed. This clean offer renders only inside a valid server-controlled window." })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "portal-friday-toggle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: active,
					onChange: (event) => setActive(event.target.checked)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Offer active" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-friday-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: title,
						minLength: 2,
						maxLength: 100,
						required: true,
						onChange: (event) => setTitle(event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["CTA label", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: buttonText,
						minLength: 2,
						maxLength: 60,
						required: true,
						onChange: (event) => setButtonText(event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "wide",
						children: ["Supporting copy", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: supportingText,
							minLength: 8,
							maxLength: 240,
							required: true,
							onChange: (event) => setSupportingText(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["CTA link", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: buttonLink,
						pattern: "^/.*",
						required: true,
						onChange: (event) => setButtonLink(event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "portal-friday-toggle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: repeatWeekly,
							onChange: (event) => setRepeatWeekly(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Repeat Fridays · 7:00 AM to 11:00 PM Dhaka" })]
					}),
					!repeatWeekly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Start · Dhaka", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "datetime-local",
						value: startAt,
						required: true,
						onChange: (event) => setStartAt(event.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["End · Dhaka", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "datetime-local",
						value: endAt,
						required: true,
						min: startAt,
						onChange: (event) => setEndAt(event.target.value)
					})] })] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				children: "Save Friday offer"
			})
		]
	});
}
function ContentWorkspace({ versions, onRefresh }) {
	const client = getBrowserSupabase();
	const homepageVersions = versions.filter((row) => row.content_key === "homepage.hero").sort((left, right) => Number(right.version || 0) - Number(left.version || 0));
	const published = homepageVersions.find((row) => row.state === "PUBLISHED");
	const saved = published?.content && typeof published.content === "object" && !Array.isArray(published.content) ? published.content : {};
	const [eyebrow, setEyebrow] = (0, import_react.useState)(String(saved.eyebrow || "OUTREACH TOOLS · LEAD RESEARCH · OPERATOR EDUCATION"));
	const [supporting, setSupporting] = (0, import_react.useState)(String(saved.supporting || "Operator-built outreach tools, lead-data tools, free training, and direct working sessions for finding prospects and starting better client conversations."));
	const [primaryLabel, setPrimaryLabel] = (0, import_react.useState)(String(saved.primary_label || "Explore the tools"));
	const [secondaryLabel, setSecondaryLabel] = (0, import_react.useState)(String(saved.secondary_label || "Watch the workflow"));
	const [status, setStatus] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setEyebrow(String(saved.eyebrow || "OUTREACH TOOLS · LEAD RESEARCH · OPERATOR EDUCATION"));
		setSupporting(String(saved.supporting || "Operator-built outreach tools, lead-data tools, free training, and direct working sessions for finding prospects and starting better client conversations."));
		setPrimaryLabel(String(saved.primary_label || "Explore the tools"));
		setSecondaryLabel(String(saved.secondary_label || "Watch the workflow"));
	}, [published?.id]);
	const content = {
		eyebrow: eyebrow.trim(),
		supporting: supporting.trim(),
		primary_label: primaryLabel.trim(),
		secondary_label: secondaryLabel.trim()
	};
	const valid = content.eyebrow.length >= 8 && content.supporting.length >= 30 && content.primary_label.length >= 2 && content.secondary_label.length >= 2;
	async function save(publish) {
		if (busy || !valid) return;
		setBusy(true);
		setStatus("");
		const { error } = await client.rpc("sw_admin_publish_content", {
			p_key: "homepage.hero",
			p_content: content,
			p_publish: publish
		});
		setStatus(error ? "The version was not saved. No public content changed." : publish ? "Published. The public homepage will use this reviewed version." : "Draft saved without changing the public homepage.");
		if (!error) await onRefresh();
		setBusy(false);
	}
	async function restore(id) {
		if (busy || !window.confirm("Restore this version as a new published version? The full history will remain available.")) return;
		setBusy(true);
		setStatus("");
		const { error } = await client.rpc("sw_admin_restore_content", { p_version_id: id });
		setStatus(error ? "Restore was not confirmed. The published version is unchanged." : "Previous content restored as a new audited version.");
		if (!error) await onRefresh();
		setBusy(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-content-workspace",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAFE OWNER EDITING MODE" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Homepage content workspace" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Approved text fields only. No code, scripts, styles, or financial controls. Preview, save a draft, publish, or restore an immutable prior version." })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PencilRuler, { size: 20 })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-content-editor",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-content-fields",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Hero eyebrow", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: eyebrow,
							minLength: 8,
							maxLength: 100,
							onChange: (event) => setEyebrow(event.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Supporting sentence", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: supporting,
							minLength: 30,
							maxLength: 360,
							onChange: (event) => setSupporting(event.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Primary CTA label", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: primaryLabel,
							minLength: 2,
							maxLength: 40,
							onChange: (event) => setPrimaryLabel(event.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Secondary CTA label", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: secondaryLabel,
							minLength: 2,
							maxLength: 40,
							onChange: (event) => setSecondaryLabel(event.target.value)
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-content-preview",
					"aria-label": "Homepage content preview",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: eyebrow || "Hero eyebrow" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { children: [
							"Find the signal.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Build the system.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Start the conversation." })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: supporting || "Supporting sentence preview" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: primaryLabel || "Primary action" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: secondaryLabel || "Secondary action" })] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-content-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy || !valid,
						onClick: () => void save(false),
						children: "Save draft"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "publish",
						type: "button",
						disabled: busy || !valid,
						onClick: () => void save(true),
						children: busy ? "Saving…" : "Publish reviewed version"
					}),
					status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						role: "status",
						children: status
					})
				]
			}),
			homepageVersions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-content-history",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "VERSION HISTORY" }), homepageVersions.slice(0, 8).map((version) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: ["Version ", String(version.version)] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
					String(version.state),
					" · ",
					formatPortalValue(version.created_at),
					" · ",
					String(version.actor_email || "owner")
				] })] }), version.state !== "PUBLISHED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: busy,
					onClick: () => void restore(String(version.id)),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 }), "Restore"]
				})] }, String(version.id)))]
			})
		]
	});
}
function SettingsView({ settings, products, runs, attempts, sheets, contentVersions, onUpdate, onRefresh }) {
	const health = [
		{
			id: "automation",
			integration: "Automation webhook",
			status: runs.some((row) => ["COMPLETED", "SUCCESS"].includes(String(row.status))) ? "CONNECTED" : runs.length ? "ATTENTION" : "NOT VERIFIED",
			last_result: runs[0]?.updated_at || "No result"
		},
		{
			id: "gmail",
			integration: "Gmail delivery",
			status: attempts.some((row) => String(row.status) === "SUCCESS") ? "CONNECTED" : attempts.length ? "ATTENTION" : "NOT VERIFIED",
			last_result: attempts[0]?.created_at || "No result"
		},
		{
			id: "sheets",
			integration: "Google Sheets",
			status: sheets.some((row) => String(row.status) === "SUCCESS") ? "CONNECTED" : sheets.length ? "ATTENTION" : "NOT VERIFIED",
			last_result: sheets[0]?.created_at || "No result"
		}
	];
	const notification = settingObject(settings, "notification_preferences");
	const refresh = Number(notification.auto_refresh_minutes ?? 5);
	const backup = Boolean(notification.backup_alert_enabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "portal-panel-stack",
		"data-reveal": "card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "portal-panel-heading",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
						en: "OWNER SETTINGS",
						bn: "ওনার সেটিংস"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Controlled release configuration." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Secrets never render here. Health is based on recorded integration results, not a decorative green badge." })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "portal-settings-controls",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PORTAL OPERATIONS" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Refresh and owner alerts" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Changes are saved to Supabase and apply to this owner workflow." })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Automatic refresh" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "portal-setting-options",
						children: [
							[5, "5 minutes"],
							[10, "10 minutes"],
							[0, "Off"]
						].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: refresh === value ? "active" : "",
							onClick: () => void onUpdate("notification_preferences", { auto_refresh_minutes: value }),
							children: label
						}, value))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "Backup owner email alert" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `portal-setting-toggle ${backup ? "active" : ""}`,
						type: "button",
						role: "switch",
						"aria-checked": backup,
						onClick: () => void onUpdate("notification_preferences", { backup_alert_enabled: !backup }),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), backup ? "Enabled" : "Disabled"]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteEditor, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContentWorkspace, {
				versions: contentVersions,
				onRefresh
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FridaySettingsEditor, {
				value: settingObject(settings, "friday_offer"),
				onUpdate: (changes) => onUpdate("friday_offer", changes)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Integration health",
				eyebrow: "LAST VERIFIED RESULT",
				rows: health,
				columns: [
					{
						key: "integration",
						label: "INTEGRATION"
					},
					{
						key: "status",
						label: "STATUS"
					},
					{
						key: "last_result",
						label: "LAST RESULT"
					}
				],
				empty: "No integration evidence is available"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Runtime settings",
				eyebrow: "SAFE CONFIGURATION SNAPSHOT",
				rows: settings,
				columns: [
					{
						key: "key",
						label: "SETTING",
						mono: true
					},
					{
						key: "value",
						label: "VALUE"
					},
					{
						key: "secret",
						label: "SECRET"
					},
					{
						key: "updated_at",
						label: "UPDATED"
					}
				],
				empty: "No settings have been configured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
				title: "Read-only pricing",
				eyebrow: "PRODUCT PRICE GUARDRAIL",
				rows: products,
				columns: [
					{
						key: "name",
						label: "PRODUCT"
					},
					{
						key: "price_bdt",
						label: "CURRENT PRICE"
					},
					{
						key: "active",
						label: "ACTIVE"
					},
					{
						key: "payment_type",
						label: "PAYMENT"
					}
				],
				empty: "No prices available"
			})
		]
	});
}
function PortalDashboard({ user, onSignOut }) {
	const client = getBrowserSupabase();
	const [view, setView] = (0, import_react.useState)("dashboard");
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [portalData, setPortalData] = (0, import_react.useState)({
		notifications: [],
		automationRuns: [],
		loginActivity: [],
		auditLogs: [],
		products: [],
		resources: [],
		deliveries: [],
		settings: [],
		conversionEvents: [],
		leads: [],
		notes: [],
		notificationAttempts: [],
		sheetSyncs: [],
		savedViews: [],
		contentVersions: []
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [filters, setFilters] = (0, import_react.useState)(EMPTY_FILTERS);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	const [lastRefreshed, setLastRefreshed] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [sessionWarning, setSessionWarning] = (0, import_react.useState)(false);
	const originRef = (0, import_react.useRef)(null);
	const lastActivityRef = (0, import_react.useRef)(Date.now());
	const lastLeaseTouchRef = (0, import_react.useRef)(0);
	const load = (0, import_react.useCallback)(async (quiet = false) => {
		if (quiet) setRefreshing(true);
		else setLoading(true);
		setError("");
		const [{ data: orderData, error: orderError }, { data: bookingData, error: bookingError }, ...optional] = await Promise.all([
			client.from("sw_orders").select(ORDER_SELECT).order("created_at", { ascending: false }).limit(500),
			client.from("sw_bookings").select(BOOKING_SELECT).order("created_at", { ascending: false }).limit(500),
			client.from("sw_notifications").select("*").order("created_at", { ascending: false }).limit(100),
			client.from("sw_automation_runs").select("*").order("created_at", { ascending: false }).limit(100),
			client.from("sw_login_activity").select("*").order("created_at", { ascending: false }).limit(100),
			client.from("sw_audit_logs").select("*").order("created_at", { ascending: false }).limit(100),
			client.from("sw_products").select("*").order("name"),
			client.from("sw_product_resources").select("*").order("sort_order"),
			client.from("sw_order_access_deliveries").select("*").order("updated_at", { ascending: false }).limit(200),
			client.from("sw_admin_settings").select("*").order("key"),
			client.from("sw_conversion_events").select("*").order("occurred_at", { ascending: false }).limit(1e3),
			client.from("sw_public_leads").select("*").order("created_at", { ascending: false }).limit(200),
			client.from("sw_subject_notes").select("*").order("updated_at", { ascending: false }).limit(500),
			client.from("sw_notification_attempts").select("*").order("created_at", { ascending: false }).limit(200),
			client.from("sw_sheet_syncs").select("*").order("created_at", { ascending: false }).limit(200),
			client.from("sw_saved_views").select("*").order("updated_at", { ascending: false }).limit(100),
			client.from("sw_content_versions").select("*").order("created_at", { ascending: false }).limit(100)
		]);
		if (orderError || bookingError) {
			console.error("Portal record load failed.", {
				orderError,
				bookingError
			});
			setError("Secure records could not be loaded. Your data was not changed.");
		} else {
			setOrders((orderData || []).sort((a, b) => (b.purchase_date_label || b.created_at).localeCompare(a.purchase_date_label || a.created_at)));
			setBookings(bookingData || []);
			const [notifications, automationRuns, loginActivity, auditLogs, products, resources, deliveries, settings, conversionEvents, leads, notes, notificationAttempts, sheetSyncs, savedViews, contentVersions] = optional;
			setPortalData({
				notifications: notifications?.data || [],
				automationRuns: automationRuns?.data || [],
				loginActivity: loginActivity?.data || [],
				auditLogs: auditLogs?.data || [],
				products: products?.data || [],
				resources: resources?.data || [],
				deliveries: deliveries?.data || [],
				settings: settings?.data || [],
				conversionEvents: conversionEvents?.data || [],
				leads: leads?.data || [],
				notes: notes?.data || [],
				notificationAttempts: notificationAttempts?.data || [],
				sheetSyncs: sheetSyncs?.data || [],
				savedViews: savedViews?.data || [],
				contentVersions: contentVersions?.data || []
			});
			setLastRefreshed(/* @__PURE__ */ new Date());
		}
		setLoading(false);
		setRefreshing(false);
	}, [client]);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	(0, import_react.useEffect)(() => {
		setFilters(EMPTY_FILTERS);
	}, [view]);
	const refreshMinutes = Number(settingObject(portalData.settings, "notification_preferences").auto_refresh_minutes ?? 5);
	(0, import_react.useEffect)(() => {
		if (![5, 10].includes(refreshMinutes)) return;
		const timer = window.setInterval(() => {
			if (!selected && !busy) load(true);
		}, refreshMinutes * 6e4);
		return () => window.clearInterval(timer);
	}, [
		busy,
		load,
		refreshMinutes,
		selected
	]);
	(0, import_react.useEffect)(() => {
		const channel = client.channel("sync-wave-portal-live").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "sw_orders"
		}, () => {
			load(true);
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "sw_bookings"
		}, () => {
			load(true);
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "sw_public_leads"
		}, () => {
			load(true);
		}).subscribe();
		return () => {
			client.removeChannel(channel);
		};
	}, [client, load]);
	(0, import_react.useEffect)(() => {
		if (!toast) return;
		const timer = window.setTimeout(() => setToast(null), 5200);
		return () => window.clearTimeout(timer);
	}, [toast]);
	(0, import_react.useEffect)(() => {
		const recordActivity = () => {
			const now = Date.now();
			lastActivityRef.current = now;
			window.sessionStorage.setItem("sw-portal-active", String(now));
			setSessionWarning(false);
			if (now - lastLeaseTouchRef.current < 3e4) return;
			lastLeaseTouchRef.current = now;
			client.rpc("sw_touch_portal_session").then(({ data, error: leaseError }) => {
				if (!leaseError && data !== true) onSignOut();
			});
		};
		const events = [
			"pointerdown",
			"keydown",
			"scroll",
			"touchstart"
		];
		events.forEach((event) => window.addEventListener(event, recordActivity, { passive: true }));
		const timer = window.setInterval(() => {
			const idle = Date.now() - lastActivityRef.current;
			if (idle >= 10 * 6e4) onSignOut();
			else if (idle >= 9 * 6e4) setSessionWarning(true);
		}, 1e4);
		return () => {
			window.clearInterval(timer);
			events.forEach((event) => window.removeEventListener(event, recordActivity));
		};
	}, [client, onSignOut]);
	const search = query.toLowerCase().trim();
	const inFilterRange = (0, import_react.useCallback)((createdAt) => {
		const value = Date.parse(createdAt);
		const from = filters.from ? Date.parse(`${filters.from}T00:00:00+06:00`) : -Infinity;
		const to = filters.to ? Date.parse(`${filters.to}T23:59:59+06:00`) : Infinity;
		return value >= from && value <= to;
	}, [filters.from, filters.to]);
	const filteredOrders = (0, import_react.useMemo)(() => orders.filter((row) => row.lifecycle_state !== "TRASHED" && row.lifecycle_state !== "ARCHIVED" && (filters.product === "ALL" || row.product_name_snapshot === filters.product) && (filters.status === "ALL" || row.status === filters.status || row.delivery_status === filters.status) && inFilterRange(row.created_at) && (!search || [
		row.order_number,
		row.customer_name,
		row.customer_email,
		row.customer_phone,
		row.product_name_snapshot,
		row.status
	].some((value) => value.toLowerCase().includes(search)))), [
		filters.product,
		filters.status,
		inFilterRange,
		orders,
		search
	]);
	const filteredBookings = (0, import_react.useMemo)(() => bookings.filter((row) => row.lifecycle_state !== "TRASHED" && row.lifecycle_state !== "ARCHIVED" && (filters.status === "ALL" || row.status === filters.status) && inFilterRange(row.created_at) && (!search || [
		row.booking_number,
		row.customer_name,
		row.customer_email,
		row.customer_phone,
		row.business_name,
		row.status
	].some((value) => value.toLowerCase().includes(search)))), [
		bookings,
		filters.status,
		inFilterRange,
		search
	]);
	const archived = (0, import_react.useMemo)(() => [...orders.filter((row) => row.lifecycle_state === "ARCHIVED" && (!search || [
		row.order_number,
		row.customer_name,
		row.customer_email,
		row.product_name_snapshot,
		row.status
	].some((value) => value.toLowerCase().includes(search)))).map((row) => ({
		kind: "orders",
		row
	})), ...bookings.filter((row) => row.lifecycle_state === "ARCHIVED" && (!search || [
		row.booking_number,
		row.customer_name,
		row.customer_email,
		row.business_name,
		row.status
	].some((value) => value.toLowerCase().includes(search)))).map((row) => ({
		kind: "bookings",
		row
	}))], [
		bookings,
		orders,
		search
	]);
	const trashed = (0, import_react.useMemo)(() => [...orders.filter((row) => row.lifecycle_state === "TRASHED" && (!search || [
		row.order_number,
		row.customer_name,
		row.customer_email,
		row.product_name_snapshot,
		row.status
	].some((value) => value.toLowerCase().includes(search)))).map((row) => ({
		kind: "orders",
		row
	})), ...bookings.filter((row) => row.lifecycle_state === "TRASHED" && (!search || [
		row.booking_number,
		row.customer_name,
		row.customer_email,
		row.business_name,
		row.status
	].some((value) => value.toLowerCase().includes(search)))).map((row) => ({
		kind: "bookings",
		row
	}))], [
		bookings,
		orders,
		search
	]);
	function openSubject(subject, origin) {
		originRef.current = origin;
		setSelected(subject);
	}
	function closeSubject() {
		setSelected(null);
		window.setTimeout(() => originRef.current?.focus(), 30);
	}
	async function updateStatus(subject, action, note, payload) {
		if (busy) return;
		setBusy(true);
		setError("");
		const automationActions = new Set([
			"APPROVE",
			"REAPPROVE",
			"REJECT",
			"RETRY",
			"REVOKE",
			"RESTORE_ACCESS",
			"CORRECT_EMAIL",
			"CORRECT_PRODUCT",
			"RESCHEDULE",
			"CANCEL"
		]);
		let automationQueued = false;
		let automationFailed = false;
		let automationSuperseded = false;
		if (automationActions.has(action)) {
			const operationId = crypto.randomUUID();
			const { data: automationResult, error: automationError } = await client.functions.invoke("dispatch-automation", { body: {
				mode: "command",
				operationId,
				subjectType: subject.kind === "orders" ? "order" : "booking",
				subjectId: subject.row.id,
				action,
				reason: note || null,
				payload: payload || {}
			} });
			const result = automationResult && typeof automationResult === "object" ? automationResult : null;
			if (automationError || result?.commandSaved !== true) {
				console.error("Owner command failed before it was saved.", automationError);
				setToast({
					tone: "error",
					title: "Update not saved",
					detail: result?.message || "Supabase did not confirm the change. Nothing moved."
				});
				setBusy(false);
				return;
			}
			automationQueued = result.status === "QUEUED";
			automationFailed = result.ok !== true || result.status === "RETRY_REQUIRED";
			automationSuperseded = result.superseded === true || result.status === "CANCELLED";
		} else {
			const command = action === "PERMANENT_DELETE_TEST" ? await client.rpc("sw_admin_permanently_delete_test_record", {
				p_subject_type: subject.kind === "orders" ? "order" : "booking",
				p_subject_id: subject.row.id,
				p_confirmation: payload?.confirmation || publicId(subject)
			}) : subject.kind === "orders" ? await client.rpc("sw_admin_order_command", {
				p_order_id: subject.row.id,
				p_action: action,
				p_reason: note || null,
				p_payload: payload || {}
			}) : await client.rpc("sw_admin_booking_command", {
				p_booking_id: subject.row.id,
				p_action: action,
				p_reason: note || null
			});
			if (command.error) {
				console.error("Portal status update failed.", command.error);
				setToast({
					tone: "error",
					title: "Update not saved",
					detail: "Supabase did not confirm the change. Nothing moved."
				});
				setBusy(false);
				return;
			}
		}
		await load(true);
		window.dispatchEvent(new Event("sw-catalog-changed"));
		setSelected(null);
		const resultingLabel = action.replaceAll("_", " ").toLowerCase();
		setToast(automationQueued ? {
			tone: "info",
			title: "Decision saved, automation queued",
			detail: "Email and Google delivery are processing. Status updates automatically; failures appear in History / Logs."
		} : automationSuperseded ? {
			tone: "info",
			title: "Newer decision kept",
			detail: "Another owner action superseded this older automation. The latest database state remains authoritative."
		} : automationFailed ? {
			tone: "info",
			title: "Status saved, delivery not completed",
			detail: "Email or connected Google work was not confirmed. The queued event is safe to retry from this record."
		} : {
			tone: "success",
			title: `${resultingLabel} completed`,
			detail: `${publicId(subject)} and every required connected step were confirmed.`
		});
		setBusy(false);
		window.setTimeout(() => originRef.current?.focus(), 30);
	}
	async function savePrivateNote(subject, note, tags) {
		if (busy) return;
		setBusy(true);
		const { error: noteError } = await client.rpc("sw_admin_save_note", {
			p_subject_type: subject.kind === "orders" ? "order" : "booking",
			p_subject_id: subject.row.id,
			p_note: note,
			p_tags: tags
		});
		if (noteError) setToast({
			tone: "error",
			title: "Note not saved",
			detail: "Supabase did not confirm the private note."
		});
		else {
			setToast({
				tone: "success",
				title: "Private note saved",
				detail: `${publicId(subject)} now has updated owner context.`
			});
			await load(true);
		}
		setBusy(false);
	}
	async function markNotificationsRead() {
		const { error: readError } = await client.rpc("sw_mark_notifications_read");
		if (readError) setToast({
			tone: "error",
			title: "Notifications not updated",
			detail: "Supabase did not confirm the change."
		});
		else {
			setToast({
				tone: "success",
				title: "Notifications cleared",
				detail: "The owner notification center is up to date."
			});
			await load(true);
		}
	}
	async function saveCurrentView(name) {
		if (view !== "orders" && view !== "bookings") return;
		const { error: saveError } = await client.from("sw_saved_views").upsert({
			owner_email: String(user.email || "").toLowerCase(),
			name,
			entity: view,
			filters,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}, { onConflict: "owner_email,name,entity" });
		if (saveError) {
			console.error("Saved view could not be persisted.", saveError);
			setToast({
				tone: "error",
				title: "View not saved",
				detail: "Supabase did not confirm the saved filter."
			});
			return;
		}
		setToast({
			tone: "success",
			title: "View saved",
			detail: `${name} is available in this owner account.`
		});
		await load(true);
	}
	async function updateSetting(key, changes) {
		const current = settingObject(portalData.settings, key);
		const { error: settingError } = await client.from("sw_admin_settings").update({
			value: {
				...current,
				...changes
			},
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("key", key);
		if (settingError) {
			console.error("Portal setting update failed.", settingError);
			setToast({
				tone: "error",
				title: "Setting not saved",
				detail: "Supabase did not confirm this configuration change."
			});
			return;
		}
		setToast({
			tone: "success",
			title: "Setting saved",
			detail: "The owner configuration is now active."
		});
		await load(true);
	}
	async function openProof(path) {
		if (!path) return;
		const { data, error: proofError } = await client.storage.from("sw-payment-proofs").createSignedUrl(path, 120);
		if (proofError || !data?.signedUrl) {
			console.error("Signed payment-proof URL failed.", proofError);
			setToast({
				tone: "error",
				title: "Proof unavailable",
				detail: "The private link could not be created. Please retry."
			});
			return;
		}
		window.open(data.signedUrl, "_blank", "noopener,noreferrer");
	}
	const navItems = [
		{
			view: "dashboard",
			label: "Dashboard",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { size: 17 })
		},
		{
			view: "orders",
			label: "Orders",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 17 }),
			count: orders.length
		},
		{
			view: "bookings",
			label: "Bookings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { size: 17 }),
			count: bookings.length
		},
		{
			view: "archive",
			label: "Archive",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { size: 17 }),
			count: archived.length
		},
		{
			view: "history",
			label: "History / Logs",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { size: 17 }),
			count: portalData.notifications.filter((row) => !row.read_at).length + portalData.automationRuns.filter((row) => ["FAILED", "ERROR"].includes(String(row.status))).length
		},
		{
			view: "analytics",
			label: "Analytics",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { size: 17 })
		},
		{
			view: "products",
			label: "Products",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { size: 17 }),
			count: portalData.products.length
		},
		{
			view: "trash",
			label: "Trash",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 17 }),
			count: trashed.length
		},
		{
			view: "manual-sale",
			label: "Add manual sale",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { size: 17 })
		},
		{
			view: "crm",
			label: "CRM / Hisab",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { size: 17 })
		},
		{
			view: "releases",
			label: "Release Center",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 17 })
		},
		{
			view: "course-leads",
			label: "Course Leads",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 17 })
		},
		{
			view: "settings",
			label: "Settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { size: 17 })
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "portal-app",
		"data-static-ui": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "portal-sidebar",
				"aria-label": "Portal navigation",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-sidebar-brand",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/swa-logo.png",
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "SYNC WAVE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "COMMAND CENTER" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", { children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-label": item.label,
						title: item.label,
						className: view === item.view ? "active" : "",
						onClick: () => setView(item.view),
						"aria-current": view === item.view ? "page" : void 0,
						children: [
							item.icon,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }),
							item.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: item.count })
						]
					}, item.view)) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-sidebar-foot",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "SECURE SESSION"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: user.email }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void onSignOut(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 15 }), "Log out"]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "portal-workspace",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "portal-workspace-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "OWNER COMMAND CENTER / DHAKA" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: view === "dashboard" ? "Operations overview" : view === "archive" ? "Historical archive" : `${view[0].toUpperCase()}${view.slice(1)} workflow` })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "portal-header-actions",
						children: [
							lastRefreshed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "portal-last-refresh",
								children: ["Last refreshed ", lastRefreshed.toLocaleTimeString("en-GB", {
									timeZone: "Asia/Dhaka",
									hour: "2-digit",
									minute: "2-digit"
								})]
							}),
							view !== "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: "Search ID, customer, phone, status…"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "portal-refresh",
								onClick: () => void load(true),
								disabled: refreshing,
								"aria-label": "Refresh secure data",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
									className: refreshing ? "spin" : "",
									size: 17
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: refreshing ? "Syncing" : "Refresh" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "portal-content",
					children: [
						sessionWarning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-session-warning",
							role: "alert",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 17 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Session expires soon" }), "Activity has been idle for nine minutes. Continue working to keep the portal open."] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										lastActivityRef.current = Date.now();
										setSessionWarning(false);
									},
									children: "Stay signed in"
								})
							]
						}),
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "portal-inline-error",
							role: "alert",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 17 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Connection problem" }), error] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => void load(),
									children: "Retry"
								})
							]
						}),
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							view === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardOverview, {
								orders,
								bookings,
								onOpen: openSubject,
								setView
							}),
							view === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalFilterBar, {
								kind: "orders",
								filters,
								onChange: setFilters,
								savedViews: portalData.savedViews,
								onSave: saveCurrentView
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationsTable, {
								kind: "orders",
								subjects: filteredOrders.map((row) => ({
									kind: "orders",
									row
								})),
								search: Boolean(search),
								onOpen: openSubject
							})] }),
							view === "bookings" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalFilterBar, {
									kind: "bookings",
									filters,
									onChange: setFilters,
									savedViews: portalData.savedViews,
									onSave: saveCurrentView
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperationsTable, {
									kind: "bookings",
									subjects: filteredBookings.map((row) => ({
										kind: "bookings",
										row
									})),
									search: Boolean(search),
									onOpen: openSubject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReminderMonitor, {})
							] }),
							view === "archive" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveView, {
								subjects: archived,
								search: Boolean(search),
								onOpen: openSubject
							}),
							view === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "portal-panel-stack",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "portal-panel-heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, {
												en: "HISTORY / REPORTS / LOGS",
												bn: "হিস্ট্রি / রিপোর্ট / লগস"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "One operational truth." }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Owner actions, delivery jobs, alerts, failures, retries, leads, and authentication activity in one place." })
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											className: "button",
											type: "button",
											onClick: () => void markNotificationsRead(),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 15 }), "Mark alerts read"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
										title: "Pre-purchase leads",
										eyebrow: "CUSTOMER QUESTIONS",
										rows: portalData.leads,
										columns: [
											{
												key: "name",
												label: "NAME"
											},
											{
												key: "preferred_contact",
												label: "CONTACT"
											},
											{
												key: "need",
												label: "QUESTION"
											},
											{
												key: "status",
												label: "STATUS"
											},
											{
												key: "created_at",
												label: "CREATED"
											}
										],
										empty: "No pre-purchase questions"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
										title: "Owner actions",
										eyebrow: "AUDIT HISTORY",
										rows: portalData.auditLogs,
										columns: [
											{
												key: "action",
												label: "ACTION"
											},
											{
												key: "subject_type",
												label: "SUBJECT"
											},
											{
												key: "actor_email",
												label: "ACTOR"
											},
											{
												key: "created_at",
												label: "TIME"
											}
										],
										empty: "No audit events recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
										title: "Delivery and integration jobs",
										eyebrow: "AUTOMATION RESULTS",
										rows: portalData.automationRuns,
										columns: [
											{
												key: "event_type",
												label: "EVENT"
											},
											{
												key: "subject_type",
												label: "SUBJECT"
											},
											{
												key: "status",
												label: "RESULT"
											},
											{
												key: "attempt_count",
												label: "ATTEMPTS"
											},
											{
												key: "last_error",
												label: "FAILURE / RETRY"
											},
											{
												key: "updated_at",
												label: "UPDATED"
											}
										],
										empty: "No automation runs recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
										title: "Operational alerts",
										eyebrow: "ACTION REQUIRED",
										rows: portalData.notifications,
										columns: [
											{
												key: "title",
												label: "ALERT"
											},
											{
												key: "message",
												label: "DETAIL"
											},
											{
												key: "severity",
												label: "SEVERITY"
											},
											{
												key: "read_at",
												label: "READ"
											},
											{
												key: "created_at",
												label: "CREATED"
											}
										],
										empty: "No alerts recorded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCollection, {
										title: "Login activity",
										eyebrow: "AUTHENTICATION AUDIT",
										rows: portalData.loginActivity,
										columns: [
											{
												key: "auth_method",
												label: "METHOD"
											},
											{
												key: "outcome",
												label: "OUTCOME"
											},
											{
												key: "device_type",
												label: "DEVICE"
											},
											{
												key: "browser",
												label: "BROWSER"
											},
											{
												key: "suspicious",
												label: "SUSPICIOUS"
											},
											{
												key: "created_at",
												label: "TIME"
											}
										],
										empty: "No login activity recorded"
									})
								]
							}),
							view === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnalyticsView, {
								orders,
								bookings,
								events: portalData.conversionEvents
							}),
							view === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSalesMonitor, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResourceEditor, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsView, {
									products: portalData.products,
									resources: portalData.resources,
									deliveries: portalData.deliveries
								})
							] }),
							view === "trash" && (trashed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "portal-archive-grid",
								children: trashed.map((subject) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectCard, {
									subject,
									onOpen: openSubject
								}, `${subject.kind}-${subject.row.id}`))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "portal-empty-state",
								"data-reveal": "scale",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 24 }) }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Trash is empty" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Archived records moved here can be restored from their secure detail view." })
								]
							})),
							view === "manual-sale" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManualSale, { onSaved: () => load(true) }),
							view === "crm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerWorkspace, {
								orders,
								bookings,
								onRefresh: () => load(true),
								onOpenOrder: (id) => {
									const row = orders.find((o) => o.id === id);
									if (row) setSelected({
										kind: "orders",
										row
									});
								}
							}),
							view === "releases" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReleaseCenter, {}),
							view === "course-leads" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseLeadsAdmin, {}),
							view === "settings" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, {
								settings: portalData.settings,
								products: portalData.products,
								runs: portalData.automationRuns,
								attempts: portalData.notificationAttempts,
								sheets: portalData.sheetSyncs,
								contentVersions: portalData.contentVersions,
								onUpdate: updateSetting,
								onRefresh: () => load(true)
							})
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "portal-mobile-nav",
				"aria-label": "Portal mobile navigation",
				children: navItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					"aria-label": item.label,
					title: item.label,
					className: view === item.view ? "active" : "",
					onClick: () => setView(item.view),
					children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
				}, item.view))
			}),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubjectDrawer, {
				subject: selected,
				busy,
				onClose: closeSubject,
				onProof: openProof,
				onStatus: updateStatus,
				savedNote: portalData.notes.find((note) => note.subject_id === selected.row.id),
				onSaveNote: savePrivateNote,
				resources: portalData.resources,
				deliveries: portalData.deliveries
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `portal-toast portal-toast--${toast.tone}`,
				role: toast.tone === "error" ? "alert" : "status",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: toast.tone === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 18 }) : toast.tone === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { size: 18 }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: toast.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: toast.detail })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Dismiss notification",
						onClick: () => setToast(null),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
					})
				]
			})
		]
	});
}
function PortalPage() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [gate, setGate] = (0, import_react.useState)("checking");
	const [authNotice, setAuthNotice] = (0, import_react.useState)("");
	const client = getBrowserSupabase();
	const applyUser = (0, import_react.useCallback)(async (next) => {
		setUser(next);
		if (!next) setGate("logged-out");
		else {
			if (!client) {
				setGate("error");
				return;
			}
			const { data: leaseActive, error: leaseError } = await client.rpc("sw_touch_portal_session");
			if (leaseError || leaseActive !== true) {
				await client.auth.signOut({ scope: "local" });
				window.sessionStorage.removeItem("sw-portal-active");
				setAuthNotice("This owner session expired after ten minutes of inactivity. Sign in again to continue.");
				setGate("logged-out");
				return;
			}
			const { data: owner, error: ownerError } = await client.rpc("sw_is_owner");
			if (ownerError) {
				console.error("Portal owner authorization check failed.", ownerError);
				setGate("error");
			} else if (owner === true) {
				window.sessionStorage.setItem("sw-portal-active", String(Date.now()));
				window.localStorage.removeItem("sw-portal-login-intent");
				setGate("authorized");
				clearAuthFragment();
			} else {
				setGate("unauthorized");
				clearAuthFragment();
			}
		}
	}, [client]);
	const checkAccess = (0, import_react.useCallback)(async () => {
		if (!client) {
			setGate("error");
			return;
		}
		const callbackIssue = callbackError();
		if (callbackIssue) {
			setAuthNotice(callbackIssue);
			setGate("auth-error");
			clearAuthFragment();
			return;
		}
		setGate("checking");
		try {
			const { data: sessionData } = await client.auth.getSession();
			if (sessionData.session?.user) {
				const active = Number(window.sessionStorage.getItem("sw-portal-active") || 0);
				const intent = Number(window.localStorage.getItem("sw-portal-login-intent") || 0);
				if (!active && Date.now() - intent > 15 * 6e4) {
					await client.auth.signOut({ scope: "local" });
					setAuthNotice("A saved browser session was not reopened automatically. Choose a secure login method to continue.");
					setGate("logged-out");
					return;
				}
				await applyUser(sessionData.session.user);
				return;
			}
			const { data, error } = await client.auth.getUser();
			if (error && error.name !== "AuthSessionMissingError") {
				console.error("Portal access verification failed.", error);
				setGate("error");
				return;
			}
			await applyUser(data.user ?? null);
		} catch (accessError) {
			console.error("Portal access check failed.", accessError);
			setGate("error");
		}
	}, [applyUser, client]);
	(0, import_react.useEffect)(() => {
		if (!client) {
			setGate("error");
			return;
		}
		let pendingAuth;
		const { data } = client.auth.onAuthStateChange((_event, session) => {
			clearTimeout(pendingAuth);
			pendingAuth = setTimeout(() => {
				applyUser(session?.user ?? null).catch(() => setGate("error"));
			}, 0);
		});
		const storedSession = Object.keys(window.localStorage).some((key) => key.startsWith("sb-") && key.endsWith("-auth-token"));
		const callbackPayload = `${window.location.hash}${window.location.search}`;
		const hasAuthCallback = /(?:access_token|refresh_token|token_hash|code|error|error_description)=/i.test(callbackPayload);
		if (!storedSession && !hasAuthCallback) setGate("logged-out");
		else checkAccess();
		return () => {
			clearTimeout(pendingAuth);
			data.subscription.unsubscribe();
		};
	}, [
		applyUser,
		checkAccess,
		client
	]);
	(0, import_react.useEffect)(() => {
		if (gate !== "checking") return;
		const timeout = window.setTimeout(() => setGate((current) => current === "checking" ? "error" : current), 2e4);
		return () => window.clearTimeout(timeout);
	}, [gate]);
	const signOut = (0, import_react.useCallback)(async () => {
		if (client) {
			try {
				await client.rpc("sw_revoke_portal_session");
			} catch {}
			await client.auth.signOut();
		}
		window.sessionStorage.removeItem("sw-portal-active");
		await applyUser(null);
	}, [applyUser, client]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: gate === "authorized" && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalDashboard, {
		user,
		onSignOut: signOut
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "portal-login-section portal-static-ui",
		"data-static-ui": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container",
			children: [
				gate === "checking" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalState, { kind: "checking" }),
				gate === "logged-out" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalLogin, {}),
				gate === "auth-error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalLogin, { notice: authNotice }),
				gate === "unauthorized" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalState, {
					kind: "unauthorized",
					onRetry: () => void checkAccess(),
					onSignOut: () => void signOut()
				}),
				gate === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalState, {
					kind: "error",
					onRetry: () => void checkAccess()
				})
			]
		})
	}) });
}
//#endregion
export { PortalPage };
