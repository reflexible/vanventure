import {test} from 'node:test';
import assert from 'node:assert/strict';
import {encrypt,decrypt} from './settings.mjs';
test('API key encryption is authenticated and uses a fresh nonce',()=>{
  const old=process.env.EDITOR_SECRET;process.env.EDITOR_SECRET='ab'.repeat(32);
  try{const key='sk-private-test-api-key',a=encrypt(key);assert.ok(!a.includes(key));assert.notEqual(a,encrypt(key));assert.equal(decrypt(a),key);const parts=a.split(':');parts[2]='00'.repeat(16);assert.throws(()=>decrypt(parts.join(':')));}finally{if(old===undefined)delete process.env.EDITOR_SECRET;else process.env.EDITOR_SECRET=old;}
});
