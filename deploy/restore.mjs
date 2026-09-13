import { spawn, spawnSync } from 'node:child_process';
import { createReadStream, existsSync } from 'node:fs';
import { pipeline } from 'node:stream/promises';
const path=process.argv[2];
if(!path||!existsSync(path)||!process.argv.includes('--confirm'))throw new Error('Restore ersetzt Tabellen. Aufruf: node deploy/restore.mjs DATEI.dump --confirm');
let ready=false;
for(let i=0;i<30;i++){const r=spawnSync('docker',['compose','-f','compose.yaml','exec','-T','db','pg_isready','-U','vanventure','-d','vanventure'],{stdio:'ignore'});if(r.status===0){ready=true;break;}await new Promise(r=>setTimeout(r,2000));}
if(!ready)throw new Error('PostgreSQL nicht bereit.');
const child=spawn('docker',['compose','-f','compose.yaml','exec','-T','db','pg_restore','-U','vanventure','-d','vanventure','--clean','--if-exists','--no-owner','--exit-on-error','--single-transaction'],{stdio:['pipe','inherit','inherit']});
const done=new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(`pg_restore fehlgeschlagen (${code})`)));});
await Promise.all([pipeline(createReadStream(path),child.stdin),done]);console.log('Datenbank wiederhergestellt.');
