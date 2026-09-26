import {test} from 'node:test';
import assert from 'node:assert/strict';
import {openPostgres} from './postgres.mjs';
import {testDatabase} from './test-database.mjs';
test('PostgreSQL preserves drafts, rejects stale writes and rolls back history on failure',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  try{
    await db.seed({slug:'test-trip',country:['Test','Test']});
    assert.equal(await db.save('test-trip',{story:{title:'Sabine'}},0,'sabine'),1);
    await assert.rejects(db.save('test-trip',{story:{title:'Helmut'}},0,'helmut'),/CONFLICT/);
    assert.equal((await db.draft('test-trip')).story.title,'Sabine');
    assert.equal(Number((await db.pool.query("SELECT count(*) AS n FROM history WHERE slug='test-trip'")).rows[0].n),1);
    await db.pool.query("ALTER TABLE history ADD CONSTRAINT test_reject CHECK(author <> 'rejected')");
    await assert.rejects(db.save('test-trip',{story:{title:'Wrong'}},1,'rejected'));
    assert.equal((await db.draft('test-trip')).story.title,'Sabine');assert.equal((await db.draft('test-trip')).revision,1);
    await db.pool.query('ALTER TABLE history DROP CONSTRAINT test_reject');
  }finally{await db.close();await database.close();}
});
test('one-time story migration preserves notes and records the previous draft',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  try{
    const oldStory={slug:'trip',country:['Norwegen','Norway'],chapters:[{paragraphs:[['old chronology marker','old']]}]};await db.seed(oldStory);
    const draft=await db.draft('trip');draft.notes.highlights='Behalten';await db.save('trip',{story:draft.story,notes:draft.notes},draft.revision,'sabine');
    const next={...oldStory,chapters:[{paragraphs:[['new order','new order']]}]};
    assert.equal(await db.migrateStory('trip','migration:test-order','old chronology marker',next),true);
    const migrated=await db.draft('trip');assert.equal(migrated.story.chapters[0].paragraphs[0][0],'new order');assert.equal(migrated.notes.highlights,'Behalten');assert.equal((await db.published('trip')).chapters[0].paragraphs[0][0],'new order');
    assert.equal(await db.migrateStory('trip','migration:test-order','new order',oldStory),false);assert.equal((await db.draft('trip')).story.chapters[0].paragraphs[0][0],'new order');
  }finally{await db.close();await database.close();}
});
test('cockpit schema is additive and exposes an empty private overview',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  try{
    const overview=await db.cockpitOverview();
    assert.equal(overview.phase,3);assert.equal(overview.periodDays,28);assert.equal(overview.availableDays,0);assert.equal(overview.connection,null);assert.equal(overview.videos,0);assert.equal(overview.contentItems,0);assert.equal(overview.approvedContextEntries,0);assert.equal(overview.lastSync,null);assert.deepEqual(overview.kpis,{current:{views:0,watchTimeMinutes:0,subscribersNet:0,impressions:0,impressionsCtr:null},previous:{views:0,watchTimeMinutes:0,subscribersNet:0,impressions:0,impressionsCtr:null}});
    assert.equal(Number((await db.pool.query("SELECT count(*) AS n FROM information_schema.tables WHERE table_name='yt_connections'")).rows[0].n),1);
    await db.account('helmut','test password 456');await db.ensurePlannerYear(2027,'helmut');assert.equal((await db.cockpitContent(2027)).length,12);
    await db.ensurePlannerYear(2026,'helmut');const remaining2026=await db.cockpitContent(2026),firstPlannerDate=new Date(remaining2026[0].target_publish_date);assert.deepEqual(remaining2026.map(item=>item.slot),[10,11,12]);assert.equal(firstPlannerDate.getFullYear(),2026);assert.equal(firstPlannerDate.getMonth(),9);assert.equal(firstPlannerDate.getDate(),15);
    const context=await db.createCockpitContext({category:'Reisen',title:'Test',body:'Geprüfter Fakt',status:'approved',source_url:null,effective_from:null,effective_to:null},'helmut');assert.ok(context.id);
    assert.equal((await db.cockpitContext()).length,1);
    const connection=(await db.pool.query("INSERT INTO yt_connections(channel_id,channel_title,status) VALUES('channel-test','Test','active') RETURNING id")).rows[0];let release,started;const startedPromise=new Promise(resolve=>{started=resolve;}),releasePromise=new Promise(resolve=>{release=resolve;});const firstSync=db.recordYoutubeSync(connection.id,'test',async()=>{started();await releasePromise;return 3;});await startedPromise;await assert.rejects(db.recordYoutubeSync(connection.id,'test',async()=>0),/SYNC_RUNNING/);release();assert.equal(await firstSync,3);assert.equal(Number((await db.pool.query('SELECT count(*) AS n FROM yt_sync_locks')).rows[0].n),0);
    await db.upsertYoutubeDailyMetrics(connection.id,[{day:'2026-01-30',views:4,estimatedMinutesWatched:8,subscribersGained:1,subscribersLost:0}]);assert.equal((await db.pool.query('SELECT impressions FROM yt_channel_daily_metrics')).rows[0].impressions,null);await db.upsertYoutubeDailyMetrics(connection.id,[{day:'2026-01-30',views:4,estimatedMinutesWatched:8,subscribersGained:1,subscribersLost:0,impressions:12,impressionsClickThroughRate:0.04}]);await db.upsertYoutubeDailyMetrics(connection.id,[{day:'2026-01-30',views:4,estimatedMinutesWatched:8,subscribersGained:1,subscribersLost:0}]);assert.equal(Number((await db.pool.query('SELECT impressions FROM yt_channel_daily_metrics')).rows[0].impressions),12);
    await assert.rejects(db.recordYoutubeSync(connection.id,'test',async()=>{throw new Error('GOOGLE_API_500');}),/GOOGLE_API_500/);const failedRun=(await db.pool.query("SELECT status,error_code,error_detail_safe FROM yt_sync_runs WHERE status='failed' ORDER BY id DESC LIMIT 1")).rows[0];assert.deepEqual(failedRun,{status:'failed',error_code:'GOOGLE_API_500',error_detail_safe:'Google-Abruf konnte nicht abgeschlossen werden.'});assert.equal(Number((await db.pool.query('SELECT count(*) AS n FROM yt_sync_locks')).rows[0].n),0);
    await db.upsertYoutubeVideos(connection.id,[{video_id:'video-test',title:'Testvideo',description:'',published_at:'2026-01-01T12:00:00Z',duration_seconds:24,privacy_status:'public',public_view_count:99,thumbnail_url:null}]);const candidates=await db.youtubeSnapshotCandidates();assert.ok(candidates.some(candidate=>candidate.video_id==='video-test'&&candidate.age_days===28));await db.upsertYoutubeSnapshots([{video_id:'video-test',age_days:28,snapshot_date:'2026-01-29',metrics:{views:42},complete:true}]);const snapshot=(await db.cockpitVideoSnapshots('video-test'))[0];assert.equal(snapshot.age_days,28);assert.equal(new Date(snapshot.snapshot_date).toISOString().slice(0,10),'2026-01-28');assert.deepEqual(snapshot.metrics_json,{views:42});assert.equal(snapshot.complete,true);
    await db.upsertYoutubeVideoDailyMetrics([{video:'video-test',day:'2026-01-30',views:42,estimatedMinutesWatched:84,averageViewDuration:120,likes:3,comments:2}]);await db.updateCockpitVideoClassification('video-test',{format:'short',pillar:'move',audit_decision:'keep',reuse_potential:'high'});const auditExport=await db.cockpitAuditExport();assert.equal(auditExport.schema_version,2);assert.deepEqual(auditExport.channel,{id:'channel-test',title:'Test'});assert.equal(auditExport.videos.length,1);assert.equal(auditExport.videos[0].id,'video-test');assert.equal(auditExport.videos[0].public_total_views,99);assert.equal(auditExport.videos[0].classification.pillar,'move');assert.equal(Number(auditExport.videos[0].latest_daily_value.views),42);assert.equal(auditExport.videos[0].snapshots[0].age_days,28);assert.ok(!JSON.stringify(auditExport).includes('token_ciphertext'));
    await db.cockpitAudit(null,'cockpit.overview.viewed','cockpit','phase-3',null,{role:'editor'});
    assert.deepEqual((await db.pool.query('SELECT action,entity_type,entity_id,after_safe FROM cockpit_audit_log')).rows,[{action:'cockpit.overview.viewed',entity_type:'cockpit',entity_id:'phase-3',after_safe:{role:'editor'}}]);
  }finally{await db.close();await database.close();}
});
test('publication persists an evidenced release scope atomically',async()=>{
  const database=await testDatabase(),db=await openPostgres({connectionString:database.url,max:1});
  try{
    await db.seed({slug:'test-trip',country:['Test','Test']});
    await assert.rejects(db.publish('test-trip',0,'helmut'),/RELEASE_SCOPE_REQUIRED/);
    assert.equal(await db.published('test-trip'),undefined);
    await db.publish('test-trip',0,'helmut',{scope_ref:'REL-TEST-1',approval_ref:'USER-APPROVED-1'});
    assert.deepEqual((await db.pool.query("SELECT release_scope_ref,release_approval_ref FROM published WHERE slug='test-trip'")).rows[0],{release_scope_ref:'REL-TEST-1',release_approval_ref:'USER-APPROVED-1'});
  }finally{await db.close();await database.close();}
});
test('server-side sessions and Google allowlist are revoked by account change',async()=>{
  const database=await testDatabase(),first=await openPostgres({connectionString:database.url,max:1});
  try{
    await first.createUser('helmut','Helmut','test password 456','admin','helmut@example.com');
    const user=await first.user('helmut');await first.createSession('session-hash',user,'csrf-value');await first.createGoogleLoginState('state-hash','verifier','nonce','/cockpit');
    assert.equal((await first.takeGoogleLoginState('state-hash')).return_to,'/cockpit');assert.equal(await first.takeGoogleLoginState('state-hash'),null);
    assert.equal((await first.session('session-hash')).name,'helmut');await first.updateUser('helmut',{displayName:'Helmut',role:'admin',enabled:true,googleEmail:'helmut@example.com'});const session=await first.session('session-hash');assert.notEqual(session.session_auth_version,(await first.user('helmut')).auth_version);
  }finally{await database.close();}
});
