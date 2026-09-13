import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generate } from './ai.mjs';

const story={title:['a','b'],subtitle:['a','b'],meta:['a','b'],lead:['a','b'],chapters:[]};
test('API failures distinguish inactive billing, quota, throttling and invalid keys without exposing provider details',async()=>{
  for (const [status,code,expected] of [
    [429,'billing_not_active',/Abrechnung ist noch nicht aktiviert/],
    [429,'insufficient_quota',/Guthaben oder Ausgabenlimit/],
    [429,'rate_limit_exceeded',/etwas warten/],
    [401,'invalid_api_key',/Schlüssel nicht/],
    [500,'unknown',/fehlgeschlagen \(500\)/],
  ]) {
    await assert.rejects(generate(story,{},async()=>({ok:false,status,json:async()=>({error:{code,message:'secret-account-details'}})}),{apiKey:'test-only'}),e=>{
      assert.match(e.message,expected);
      assert.ok(!e.message.includes('secret-account-details'));
      return true;
    });
  }
  await assert.rejects(generate(story,{},async()=>({ok:false,status:429,json:async()=>{throw new Error('invalid JSON');}}),{apiKey:'test-only'}),/etwas warten/);
});
