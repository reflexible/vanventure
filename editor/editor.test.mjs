import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { openStore,passwordHash,checkPassword,saveDraft } from './store.mjs';
import { generate } from './ai.mjs';
test('Passwords are salted; incorrect passwords fail',()=>{const a=passwordHash('a secure password');assert.notEqual(a,passwordHash('a secure password'));assert.ok(checkPassword('a secure password',a));assert.equal(checkPassword('incorrect',a),false);});
test('Concurrent saves do not overwrite changes; history persists',()=>{
  const dir=mkdtempSync(join(tmpdir(),'vv-test-')),db=openStore(dir);
  try{db.prepare('INSERT INTO drafts(slug,data) VALUES(?,?)').run('trip','{}');assert.equal(saveDraft(db,'trip',{text:'Sabine'},0,'sabine'),1);assert.throws(()=>saveDraft(db,'trip',{text:'Helmut'},0,'helmut'),/CONFLICT/);assert.equal(JSON.parse(db.prepare('SELECT data FROM drafts').get().data).text,'Sabine');assert.equal(db.prepare('SELECT count(*) AS n FROM history').get().n,1);}finally{db.close();rmSync(dir,{recursive:true});}
});
test('AI request includes corrections, bilingual schema and protected identity; refusal fails',async()=>{
  const story=JSON.parse(readFileSync(new URL('../travel-stories.json',import.meta.url),'utf8'))[0];
  const old=process.env.OPENAI_API_KEY;process.env.OPENAI_API_KEY='test-only';
  try{
    const result=await generate(story,{facts:'16 km statt 14 km'},async(url,options)=>{
      assert.equal(url,'https://api.openai.com/v1/responses');const body=JSON.parse(options.body);assert.ok(body.input.includes('16 km statt 14 km'));assert.ok(body.instructions.includes('Keine Erlebnisse'));assert.equal(body.store,false);assert.equal(body.text.format.strict,true);
      return {ok:true,json:async()=>({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({story:{...story,slug:'wrong'},changes:['Korrigiert'],questions:[]})}]}]})};
    });assert.equal(result.story.slug,story.slug);
    await assert.rejects(generate(story,{},async()=>({ok:true,json:async()=>({status:'incomplete'})})),/vollständig/);
  }finally{if(old===undefined)delete process.env.OPENAI_API_KEY;else process.env.OPENAI_API_KEY=old;}
});
