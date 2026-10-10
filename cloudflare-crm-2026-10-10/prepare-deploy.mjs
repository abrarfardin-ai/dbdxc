import {spawnSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
const cli=new URL('./node_modules/wrangler/bin/wrangler.js',import.meta.url);
const run=(args,input)=>spawnSync(process.execPath,[cli.pathname,...args],{encoding:'utf8',input,stdio:['pipe','pipe','pipe']});
const listed=run(['secret','list','--format','json']);
if(listed.status!==0){console.error('Cloudflare account access required. Run npx wrangler login, then try again.');process.exit(1)}
let secrets;try{secrets=JSON.parse(listed.stdout)}catch{console.error('Could not verify existing Worker bindings; deployment stopped.');process.exit(1)}
for(const name of ['NEXT_PUBLIC_SUPABASE_URL','SUPABASE_URL','NEXT_PUBLIC_SUPABASE_ANON_KEY']){
 if(!secrets.some(s=>s.name===name)){console.error(`Existing production binding missing: ${name}. Deployment stopped.`);process.exit(1)}
}
if(!secrets.some(s=>s.name==='RATE_LIMIT_SALT')){
 const result=run(['secret','put','RATE_LIMIT_SALT'],randomBytes(32).toString('hex')+'\n');
 if(result.status!==0){console.error('Could not prepare private privacy-hash salt. Deployment stopped.');process.exit(1)}
}
console.log('Existing production bindings checked. Private values were not printed.');
