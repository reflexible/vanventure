import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const compose=['compose','-f','compose.yaml'];

function run(command,args){
  return new Promise((resolve,reject)=>{
    const child=spawn(command,args,{stdio:['ignore','pipe','pipe']});let output='',errors='';
    child.stdout.on('data',data=>{output+=data;});child.stderr.on('data',data=>{errors+=data;});
    child.once('error',reject);child.once('exit',code=>code===0?resolve(output):reject(new Error(errors.trim()||`${command} fehlgeschlagen (${code})`)));
  });
}

export function assessCockpitHealth(state,now=Date.now()){
  const issues=[];
  if(!state.connected)issues.push('CONNECTION_MISSING');
  const run=state.lastRun;
  if(state.connected&&!run)issues.push('SYNC_MISSING');
  if(run?.status==='failed'){
    issues.push('SYNC_FAILED');
    if(/^GOOGLE_(OAUTH_REFRESH_REJECTED|TOKEN_INVALID|CHANNEL_MISMATCH)$/.test(run.errorCode||''))issues.push('OAUTH_REAUTH_REQUIRED');
  }
  const interval=Number(state.intervalHours);
  const finished=run?.finishedAt?Date.parse(run.finishedAt):NaN;
  if(state.connected&&interval>0&&(!Number.isFinite(finished)||now-finished>(interval+2)*60*60*1000))issues.push('SYNC_STALE');
  return {status:issues.length?'warning':'ok',issues};
}

async function readState(){
  const sql=`WITH active_connection AS (SELECT id FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1), latest_run AS (SELECT status, finished_at, error_code FROM yt_sync_runs ORDER BY started_at DESC LIMIT 1) SELECT json_build_object('connected',EXISTS(SELECT 1 FROM active_connection),'intervalHours',COALESCE((SELECT value::int FROM settings WHERE key='cockpit_sync_interval_hours'),24),'lastRun',(SELECT json_build_object('status',status,'finishedAt',finished_at,'errorCode',error_code) FROM latest_run))::text;`;
  const output=await run('docker',[...compose,'exec','-T','db','psql','-U','vanventure','-d','vanventure','-At','-v','ON_ERROR_STOP=1','-c',sql]);
  return JSON.parse(output.trim());
}

async function main(){
  const result=assessCockpitHealth(await readState());
  console.log(`cockpit-monitor status=${result.status}${result.issues.length?` issues=${result.issues.join(',')}`:''}`);
  if(result.status!=='ok')process.exitCode=2;
}

if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)main().catch(error=>{console.error(`cockpit-monitor status=error reason=${error.message.replace(/[\r\n]/g,' ').slice(0,160)}`);process.exitCode=2;});
