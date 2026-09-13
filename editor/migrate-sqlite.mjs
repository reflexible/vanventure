import { DatabaseSync } from 'node:sqlite';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { openPostgres } from './postgres.mjs';
const path=resolve(process.argv[2]||'.editor-data/editor.sqlite');
if(!existsSync(path))throw new Error('SQLite-Datei nicht gefunden.');
const sqlite=new DatabaseSync(path,{readOnly:true}),db=await openPostgres(),client=await db.pool.connect();
try{
  await client.query('BEGIN');
  for(const user of sqlite.prepare('SELECT * FROM users').all())await client.query('INSERT INTO users(name,hash) VALUES($1,$2) ON CONFLICT(name) DO NOTHING',[user.name,user.hash]);
  for(const row of sqlite.prepare('SELECT * FROM drafts').all())await client.query('INSERT INTO drafts(slug,data,revision) VALUES($1,$2,$3) ON CONFLICT(slug) DO UPDATE SET data=excluded.data,revision=excluded.revision WHERE drafts.revision=0',[row.slug,row.data,row.revision]);
  for(const row of sqlite.prepare('SELECT * FROM history').all())await client.query('INSERT INTO history(slug,author,saved,data) SELECT $1,$2,$3,$4 WHERE NOT EXISTS(SELECT 1 FROM history WHERE slug=$1 AND author=$2 AND saved=$3 AND data=$4::jsonb)',[row.slug,row.author,row.saved+'Z',row.data]);
  await client.query('COMMIT');console.log('Konten, Entwürfe und Historie übertragen. SQLite-Datei bleibt erhalten.');
}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();sqlite.close();await db.close();}
