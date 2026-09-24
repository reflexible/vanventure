import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { openPostgres } from './postgres.mjs';
import { testDatabase } from './test-database.mjs';
test('HTTP login, CSRF, persistent drafts, conflict and private-file protection',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  await db.account('sabine','test password 123');await db.createUser('helmut','Helmut','test password 456','admin');await db.createUser('anna','Anna','test password 789','admin');await db.close();
  const socket=net.createServer();await new Promise(r=>socket.listen(0,'127.0.0.1',r));const port=socket.address().port;await new Promise(r=>socket.close(r));
  const origin=`http://127.0.0.1:${port}`;
  const child=spawn(process.execPath,['editor/server.mjs'],{env:{...process.env,NODE_ENV:'development',DATABASE_URL:database.url,PORT:String(port),EDITOR_ORIGIN:origin,EDITOR_HOST:'127.0.0.1',EDITOR_SECURE_COOKIE:'false',OPENAI_API_KEY:'',GOOGLE_OAUTH_CLIENT_ID:'test-client',GOOGLE_OAUTH_CLIENT_SECRET:'test-secret',GOOGLE_OAUTH_REDIRECT_URI:origin+'/api/cockpit/youtube/callback',YOUTUBE_CHANNEL_ID:'channel-test',COCKPIT_TOKEN_ENCRYPTION_KEY:'a'.repeat(64)},stdio:['ignore','pipe','pipe']});
  try{
    await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(new Error('Server timeout')),10000);child.stdout.once('data',()=>{clearTimeout(timer);resolve();});child.once('exit',()=>{clearTimeout(timer);reject(new Error('Server failed'));});});
    assert.equal((await fetch(origin+'/api/stories')).status,401);
    assert.equal((await fetch(origin+'/api/cockpit/overview')).status,401);
    assert.equal((await fetch(origin+'/.env')).status,404);
    assert.equal((await fetch(origin+'/travel-stories.json')).status,404);
    assert.equal((await fetch(origin+'/editor/server.mjs')).status,404);
    const homepage=await (await fetch(origin+'/')).text();assert.ok(homepage.includes('Redaktion · Anmelden'));assert.ok(homepage.includes('VanVenture – Reisen mit Camper, Mountainbike und Kajak'));
    const redirect=await fetch(origin+'/index.html',{redirect:'manual'});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'/');
    const sitemap=await fetch(origin+'/sitemap.xml');assert.equal(sitemap.status,200);assert.match(sitemap.headers.get('content-type'),/application\/xml/);assert.equal(((await sitemap.text()).match(/<loc>/g)||[]).length,7);
    assert.match(await (await fetch(origin+'/robots.txt')).text(),/Sitemap: https:\/\/vanventure.at\/sitemap.xml/);
    assert.equal((await fetch(origin+'/redaktion')).headers.get('x-robots-tag'),'noindex, nofollow');
    const cockpit=await fetch(origin+'/cockpit');assert.equal(cockpit.status,200);assert.equal(cockpit.headers.get('x-robots-tag'),'noindex, nofollow');assert.match(cockpit.headers.get('content-security-policy'),/https:\/\/i\.ytimg\.com/);assert.match(await cockpit.text(),/VanVenture Cockpit/);
    const privateArea=await fetch(origin+'/privat');assert.equal(privateArea.status,200);assert.equal(privateArea.headers.get('x-robots-tag'),'noindex, nofollow');assert.match(await privateArea.text(),/Privater Bereich/);
    const storyHtml=await (await fetch(origin+'/norwegen-2018.html')).text();assert.match(storyHtml,/<link rel="canonical" href="https:\/\/vanventure.at\/norwegen-2018.html">/);
    const kayakHtml=await (await fetch(origin+'/kajak.html')).text();assert.match(kayakHtml,/<link rel="canonical" href="https:\/\/vanventure.at\/kajak.html">/);assert.equal((await fetch(origin+'/riverstar-entwurf.html',{redirect:'manual'})).status,302);
    for(const retired of ['/bike.html','/ausruestung.html']){
      const response=await fetch(origin+retired,{redirect:'manual'});
      assert.equal(response.status,301);assert.equal(response.headers.get('location'),'/');
    }
    const missingPage=await fetch(origin+'/nicht-vorhanden.html',{redirect:'manual'});
    assert.equal(missingPage.status,302);assert.equal(missingPage.headers.get('location'),'/');
    assert.ok((await (await fetch(origin+'/redaktion')).text()).includes('login-form'));
    assert.match(await (await fetch(origin+'/editor/client.js')).text(),/async function start\(\)/);
    assert.match(await (await fetch(origin+'/editor/cockpit.js')).text(),/responseJson/);
    assert.match(await (await fetch(origin+'/editor/private.js')).text(),/api\/profile/);assert.match(await (await fetch(origin+'/editor/private-account.css')).text(),/account-facts/);const privateNavigation=await (await fetch(origin+'/editor/private-nav.js')).text();assert.match(privateNavigation,/private-app-shell/);assert.match(privateNavigation,/Benutzerverwaltung/);assert.match(privateNavigation,/benutzerverwaltung/);assert.match(await (await fetch(origin+'/redaktion')).text(),/private-nav\.js/);assert.match(await (await fetch(origin+'/benutzerverwaltung')).text(),/Benutzerverwaltung/);assert.match(await (await fetch(origin+'/editor/users.js')).text(),/async function users/);
    assert.equal((await fetch(origin+'/assets/vanventure-logo-transparent.png')).status,200);
    assert.equal((await fetch(origin+'/assets/review/vehicle-front-camp-clean.png')).status,404);
    assert.equal((await fetch(origin+'/assets/hero-selection/vehicle.jpg')).status,404);
    assert.equal((await fetch(origin+'/assets/heroes/originals/italien-2021/P9200258.JPG')).status,404);
    assert.equal((await fetch(origin+'/healthz')).status,200);
    assert.equal((await fetch(origin+'/api/auth/google/start?returnTo=/cockpit',{redirect:'manual'})).status,503);
    const login=await fetch(origin+'/api/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name:'sabine',password:'test password 123'})});assert.equal(login.status,200);
    const cookie=login.headers.get('set-cookie');assert.ok(cookie.includes('HttpOnly'));const session=await login.json();
    const headers={Cookie:cookie.split(';')[0],Origin:origin,'Content-Type':'application/json','X-CSRF-Token':session.csrf};
    const profile=await fetch(origin+'/api/profile',{headers});assert.equal(profile.status,200);assert.equal((await profile.json()).name,'sabine');
    const profileUpdate=await fetch(origin+'/api/profile',{method:'PUT',headers,body:JSON.stringify({displayName:'Sabine Redaktion',profileEmail:'sabine@example.test'})});assert.equal(profileUpdate.status,200);assert.equal((await profileUpdate.json()).profileEmail,'sabine@example.test');
    assert.equal((await fetch(origin+'/api/cockpit/youtube/connect',{method:'POST',headers,body:'{}'})).status,403);
    const adminLogin=await fetch(origin+'/api/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name:'helmut',password:'test password 456'})});assert.equal(adminLogin.status,200);const adminSession=await adminLogin.json(),adminHeaders={Cookie:adminLogin.headers.get('set-cookie').split(';')[0],Origin:origin,'Content-Type':'application/json','X-CSRF-Token':adminSession.csrf};
    const authorization=await (await fetch(origin+'/api/cockpit/youtube/connect',{method:'POST',headers:adminHeaders,body:'{}'})).json(),authorizationUrl=new URL(authorization.url);assert.equal(authorizationUrl.searchParams.get('code_challenge_method'),'S256');assert.ok(authorizationUrl.searchParams.get('state'));assert.ok(authorizationUrl.searchParams.get('code_challenge'));
    assert.equal((await fetch(origin+'/api/users/helmut',{method:'PUT',headers:adminHeaders,body:JSON.stringify({displayName:'Helmut',role:'admin',enabled:false})})).status,200);
    assert.equal((await fetch(origin+'/api/session',{headers:adminHeaders})).status,401);
    assert.equal((await fetch(origin+'/api/cockpit/youtube/callback?state='+encodeURIComponent(authorizationUrl.searchParams.get('state')))).status,403);
    const cockpitResponse=await fetch(origin+'/api/cockpit/overview',{headers});assert.equal(cockpitResponse.status,200);const cockpitOverview=await cockpitResponse.json();assert.equal(cockpitOverview.phase,3);assert.equal(cockpitOverview.videos,0);const cockpitHealth=await fetch(origin+'/api/cockpit/health',{headers});assert.equal(cockpitHealth.status,200);assert.equal((await cockpitHealth.json()).phase,4);
    const auditExport=await fetch(origin+'/api/cockpit/audit/export',{headers});assert.equal(auditExport.status,200);assert.match(auditExport.headers.get('content-disposition'),/vanventure-channel-audit-\d{4}-\d{2}-\d{2}\.json/);const audit=await auditExport.json();assert.equal(audit.schema_version,2);assert.deepEqual(audit.videos,[]);assert.ok(!JSON.stringify(audit).includes('test-secret'));
    const planner=await fetch(origin+'/api/cockpit/content?year=2027',{headers});assert.equal(planner.status,200);assert.equal((await planner.json()).items.length,12);
    const context=await fetch(origin+'/api/cockpit/context',{method:'POST',headers,body:JSON.stringify({category:'Reisen',title:'Test',body:'Geprüfter Fakt',status:'approved'})});assert.equal(context.status,201);
    assert.equal((await (await fetch(origin+'/api/cockpit/context',{headers})).json()).items.length,1);
    const original=await (await fetch(origin+'/api/stories/norwegen-2018',{headers})).json();
    const url=origin+'/api/stories/norwegen-2018';
    assert.equal((await fetch(url,{method:'PUT',headers:{...headers,'X-CSRF-Token':'wrong'},body:JSON.stringify(original)})).status,403);
    original.notes.highlights='Neue Wanderung';original.notes.itinerary=[
      {date:'27.06.2018',place:'St. Pölten',details:'Abfahrt',lat:'48.2047',lon:'15.6256'},
      {date:'29.06.2018',place:'Oslo',details:'Ankunft in Norwegen',lat:'59.9139',lon:'10.7522'}
    ];assert.equal((await fetch(url,{method:'PUT',headers,body:JSON.stringify(original)})).status,200);
    assert.equal((await fetch(url,{method:'PUT',headers,body:JSON.stringify(original)})).status,409);
    const saved=await (await fetch(url,{headers})).json();assert.equal(saved.notes.highlights,'Neue Wanderung');assert.equal(saved.revision,original.revision+1);
    assert.equal(saved.notes.itinerary[1].place,'Oslo');
    const route=await (await fetch(url+'/route.geojson',{headers})).json();assert.equal(route.type,'FeatureCollection');assert.equal(route.features[0].geometry.type,'LineString');assert.deepEqual(route.features[0].geometry.coordinates[1],[10.7522,59.9139]);
    assert.equal((await fetch(url+'/generate',{method:'POST',headers,body:JSON.stringify({revision:saved.revision})})).status,503);
    assert.equal((await fetch(origin+'/api/logout',{method:'POST',headers,body:'{}'})).status,200);
    assert.equal((await fetch(url,{headers})).status,401);
  }finally{if(child.exitCode===null){child.kill();await new Promise(r=>child.once('exit',r));}await database.close();}
});
