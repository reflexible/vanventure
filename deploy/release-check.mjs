import { spawn } from 'node:child_process';

function run(command,args){
  return new Promise((resolve,reject)=>{
    const child=spawn(command,args,{stdio:'inherit'});
    child.once('error',reject);child.once('exit',code=>code===0?resolve():reject(new Error(`${command} fehlgeschlagen (${code})`)));
  });
}

await run(process.execPath,['--test','editor/*.test.mjs','deploy/*.test.mjs']);
await run('docker',['compose','-f','compose.yaml','--profile','public','config','--quiet']);
await run(process.execPath,['deploy/backup.mjs']);
await run('docker',['compose','-f','compose.yaml','exec','-T','web','node','--input-type=module','-e',"const response=await fetch('http://127.0.0.1:8787/healthz');if(!response.ok)process.exit(1)"]);
console.log('Release-Prüfung erfolgreich: Tests, Compose-Konfiguration, Datenbanksicherung und Healthcheck sind erfüllt.');
