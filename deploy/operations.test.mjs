import { test } from 'node:test';
import assert from 'node:assert/strict';
import { assessCockpitHealth } from './cockpit-monitor.mjs';

const now=Date.parse('2026-09-22T12:00:00Z');
test('cockpit monitor accepts a recent successful scheduled sync',()=>{
  assert.deepEqual(assessCockpitHealth({connected:true,intervalHours:24,lastRun:{status:'succeeded',finishedAt:'2026-09-21T13:00:00Z'}},now),{status:'ok',issues:[]});
});
test('cockpit monitor makes failures, expired OAuth and stale data actionable',()=>{
  const result=assessCockpitHealth({connected:true,intervalHours:12,lastRun:{status:'failed',finishedAt:'2026-09-21T00:00:00Z',errorCode:'GOOGLE_OAUTH_REFRESH_REJECTED'}},now);
  assert.deepEqual(result,{status:'warning',issues:['SYNC_FAILED','OAUTH_REAUTH_REQUIRED','SYNC_STALE']});
});
test('cockpit monitor permits manual-only operation but identifies a missing connection',()=>{
  assert.deepEqual(assessCockpitHealth({connected:true,intervalHours:0,lastRun:{status:'succeeded',finishedAt:'2026-08-01T00:00:00Z'}},now),{status:'ok',issues:[]});
  assert.deepEqual(assessCockpitHealth({connected:false,intervalHours:24,lastRun:null},now),{status:'warning',issues:['CONNECTION_MISSING']});
});
