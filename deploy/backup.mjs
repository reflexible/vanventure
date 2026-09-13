import { spawn } from 'node:child_process';
import { createWriteStream, mkdirSync, chmodSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
mkdirSync('backups',{recursive:true});
const path=`backups/vanventure-${new Date().toISOString().replace(/[:.]/g,'-')}.dump`;
const child=spawn('docker',['compose','-f','compose.yaml','exec','-T','db','pg_dump','-U','vanventure','-d','vanventure','-Fc'],{stdio:['ignore','pipe','inherit']});
const done=new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(`pg_dump fehlgeschlagen (${code})`)));});
await Promise.all([pipeline(child.stdout,createWriteStream(path,{mode:0o600})),done]);if(process.platform!=='win32')chmodSync(path,0o600);console.log(`Backup erstellt: ${path}`);
