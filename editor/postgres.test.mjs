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
