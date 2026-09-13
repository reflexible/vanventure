import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {testDatabase,freePort} from './test-database.mjs';
test('Homepage setup, admin permissions, account changes, encrypted settings and publication',{timeout:20000},async()=>{
  const database=await testDatabase(),port=await freePort(),origin=`http://127.0.0.1:${port}`;
  const child=spawn(process.execPath,['editor/server.mjs'],{env:{...process.env,NODE_ENV:'development',DATABASE_URL:database.url,PORT:String(port),EDITOR_ORIGIN:origin,EDITOR_HOST:'127.0.0.1',EDITOR_SECURE_COOKIE:'false',OPENAI_API_KEY:'',EDITOR_SETUP_TOKEN:'one-time-test-token',EDITOR_SECRET:'ab'.repeat(32)},stdio:['ignore','pipe','pipe']});
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server timeout')),10000);child.stdout.once('data',()=>{clearTimeout(timer);resolve();});child.once('exit',()=>{clearTimeout(timer);reject(new Error('Server failed'));});});
    async function request(path,method='GET',body,session){return fetch(origin+'/api/'+path,{method,headers:{Origin:origin,'Content-Type':'application/json',...(session?{Cookie:session.cookie,'X-CSRF-Token':session.csrf}:{})},body:body?JSON.stringify(body):undefined});}
    async function login(name,password){const r=await request('login','POST',{name,password});assert.equal(r.status,200);return {...await r.json(),cookie:r.headers.get('set-cookie').split(';')[0]};}
    assert.equal((await (await request('setup')).json()).available,true);
    const first={name:'helmut',displayName:'Helmut',password:'my test password 123',setupToken:'wrong'};
    assert.equal((await request('setup','POST',first)).status,403);
    first.setupToken='one-time-test-token';assert.equal((await request('setup','POST',first)).status,201);assert.equal((await request('setup','POST',first)).status,409);
    const admin=await login('helmut',first.password);assert.equal(admin.role,'admin');
    const editor={name:'sabine',displayName:'Sabine',password:'sabine password 123',role:'editor'};
    assert.equal((await request('users','POST',editor,admin)).status,201);assert.equal((await request('users','POST',editor,admin)).status,409);
    const sabine=await login('sabine',editor.password);
    assert.equal((await request('users','GET',null,sabine)).status,403);assert.equal((await request('settings','GET',null,sabine)).status,403);
    assert.equal((await request('users/helmut','PUT',{name:'helmut',displayName:'Helmut',role:'editor',enabled:true},admin)).status,400);
    const secret='sk-test-secret-not-a-real-api-key';assert.equal((await request('settings','PUT',{apiKey:secret,model:'gpt-4.1'},admin)).status,200);
    const settings=await (await request('settings','GET',null,admin)).json();assert.equal(settings.keyConfigured,true);assert.ok(!JSON.stringify(settings).includes(secret));
    const story=await (await request('stories/norwegen-2018','GET',null,admin)).json();story.story.title[0]='Ein neu erzählter Reisebericht <script>alert(1)</script>';
    const saved=await (await request('stories/norwegen-2018','PUT',story,admin)).json();
    assert.equal((await request('stories/norwegen-2018/publish','POST',{revision:saved.revision},sabine)).status,403);
    assert.equal((await request('stories/norwegen-2018/publish','POST',{revision:0},admin)).status,409);
    assert.equal((await request('stories/norwegen-2018/publish','POST',{revision:saved.revision},admin)).status,200);
    const page=await (await fetch(origin+'/norwegen-2018.html')).text();assert.ok(page.includes('Ein neu erzählter Reisebericht'));assert.ok(page.includes('&lt;script&gt;'));assert.ok(!page.includes('<script>alert(1)</script>'));
    const homepage=await (await fetch(origin+'/')).text();assert.ok(homepage.includes(story.story.subtitle[0]));assert.ok(homepage.includes(story.story.chapters[0].title[0]));
    assert.equal((await request('password','POST',{currentPassword:editor.password,password:'new sabine password 123'},sabine)).status,200);
    assert.equal((await request('session','GET',null,sabine)).status,401);
    const newSabine=await login('sabine','new sabine password 123');
    assert.equal((await request('users/sabine','PUT',{name:'sabine',displayName:'Sabine',role:'editor',enabled:false},admin)).status,200);
    assert.equal((await request('session','GET',null,newSabine)).status,401);
  }finally{if(child.exitCode===null&&child.signalCode===null){child.kill();await new Promise(r=>child.once('exit',r));}await database.close();}
});
