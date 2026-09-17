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
