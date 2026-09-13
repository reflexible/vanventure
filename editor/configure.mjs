import { existsSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
const path='.env';
let text=existsSync(path)?readFileSync(path,'utf8'):'';
const defaults={POSTGRES_PASSWORD:randomBytes(32).toString('hex'),EDITOR_SECRET:randomBytes(32).toString('hex'),EDITOR_SETUP_TOKEN:randomBytes(24).toString('hex'),DOMAIN:'localhost',OPENAI_API_KEY:'',OPENAI_MODEL:'gpt-4.1'};
for(const [k,v] of Object.entries(defaults))if(!new RegExp(`^${k}=`, 'm').test(text))text+=`${text.endsWith('\n')||!text?'':'\n'}${k}=${v}\n`;
writeFileSync(path,text,{mode:0o600});if(process.platform!=='win32')chmodSync(path,0o600);
console.log('.env vorbereitet. Vorhandene Werte wurden beibehalten. Datenbankpasswort wird nicht ausgegeben.');
