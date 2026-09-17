import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { openPostgres } from './postgres.mjs';
import { testDatabase } from './test-database.mjs';
test('HTTP login, CSRF, persistent drafts, conflict and private-file protection',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  await db.account('sabine','test password 123');await db.close();
  const socket=net.createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));
  const origin=`http://127.0.0.1:${port}`;
  const child=spawn(process.execPath,['editor/server.mjs'],{env:{...process.env,NODE_ENV:'development',DATABASE_URL:database.url,PORT:String(port),EDITOR_ORIGIN:origin,EDITOR_HOST:'127.0.0.1',EDITOR_SECURE_COOKIE:'false',OPENAI_API_KEY:''},stdio:['ignore','pipe','pipe']});
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server timeout')),10000);child.stdout.once('data',()=>{clearTimeout(timer);resolve();});child.once('exit',()=>{clearTimeout(timer);reject(new Error('Server failed'));});});
    assert.equal((await fetch(origin+'/api/stories')).status,401);
    assert.equal((await fetch(origin+'/.env')).status,404);
    assert.equal((await fetch(origin+'/travel-stories.json')).status,404);
    assert.equal((await fetch(origin+'/editor/server.mjs')).status,404);
    const homepage=await (await fetch(origin+'/')).text();assert.ok(homepage.includes('Redaktion · Anmelden'));assert.ok(homepage.includes('VanVenture — Go further. Stay longer.'));
    assert.ok((await (await fetch(origin+'/redaktion')).text()).includes('login-form'));
    assert.equal((await fetch(origin+'/assets/vanventure-logo-transparent.png')).status,200);
    assert.equal((await fetch(origin+'/healthz')).status,200);
    const login=await fetch(origin+'/api/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name:'sabine',password:'test password 123'})});assert.equal(login.status,200);
    const cookie=login.headers.get('set-cookie');assert.ok(cookie.includes('HttpOnly'));const session=await login.json();
    const headers={Cookie:cookie.split(';')[0],Origin:origin,'Content-Type':'application/json','X-CSRF-Token':session.csrf};
    const original=await (await fetch(origin+'/api/stories/norwegen-2018',{headers})).json();
    const url=origin+'/api/stories/norwegen-2018';
    assert.equal((await fetch(url,{method:'PUT',headers:{...headers,'X-CSRF-Token':'wrong'},body:JSON.stringify(original)})).status,403);
    original.notes.highlights='Neue Wanderung';original.notes.itinerary=[
      {date:'27.06.2018',place:'St. Pölten',details:'Abfahrt',lat:'48.2047',lon:'15.6256'},
      {date:'29.06.2018',place:'Oslo',details:'Ankunft in Norwegen',lat:'59.9139',lon:'10.7522'}
    ];assert.equal((await fetch(url,{method:'PUT',headers,body:JSON.stringify(original)})).status,200);
    assert.equal((await fetch(url,{method:'PUT',headers,body:JSON.stringify(original)})).status,409);
    const saved=await (await fetch(url,{headers})).json();assert.equal(saved.notes.highlights,'Neue Wanderung');assert.equal(saved.revision,1);
    assert.equal(saved.notes.itinerary[1].place,'Oslo');
    const route=await (await fetch(url+'/route.geojson',{headers})).json();assert.equal(route.type,'FeatureCollection');assert.equal(route.features[0].geometry.type,'LineString');assert.deepEqual(route.features[0].geometry.coordinates[1],[10.7522,59.9139]);
    assert.equal((await fetch(url+'/generate',{method:'POST',headers,body:JSON.stringify({revision:1})})).status,503);
    assert.equal((await fetch(origin+'/api/logout',{method:'POST',headers,body:'{}'})).status,200);
    assert.equal((await fetch(url,{headers})).status,401);
  }finally{if(child.exitCode===null){child.kill();await new Promise(r=>child.once('exit',r));}await database.close();}
});
