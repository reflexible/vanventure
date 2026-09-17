import pg from 'pg';
import { passwordHash } from './store.mjs';
export async function openPostgres(config = {}) {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, host:process.env.PGHOST,
    user:process.env.PGUSER, password:process.env.PGPASSWORD, database:process.env.PGDATABASE,
    max:10, connectionTimeoutMillis:10000, ...config });
  pool.on('error',()=>console.error('PostgreSQL connection interrupted.'));
  await pool.query(`CREATE TABLE IF NOT EXISTS users(name TEXT PRIMARY KEY, hash TEXT NOT NULL);
    CREATE TABLE IF NOT EXISTS drafts(slug TEXT PRIMARY KEY, data JSONB NOT NULL, revision INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS history(id BIGSERIAL PRIMARY KEY, slug TEXT NOT NULL, author TEXT NOT NULL, saved TIMESTAMPTZ DEFAULT NOW(), data JSONB NOT NULL);`);
  await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name TEXT NOT NULL DEFAULT '';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'editor';
    ALTER TABLE users ADD COLUMN IF NOT EXISTS enabled BOOLEAN NOT NULL DEFAULT TRUE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS auth_version INTEGER NOT NULL DEFAULT 0;
    CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY, value TEXT NOT NULL);`);
  await pool.query('CREATE TABLE IF NOT EXISTS published(slug TEXT PRIMARY KEY, story JSONB NOT NULL, author TEXT NOT NULL, saved TIMESTAMPTZ NOT NULL DEFAULT NOW())');
  // Upgrade installations that were set up with the old Helmut/Sabine CLI.
  await pool.query("UPDATE users SET role='admin' WHERE name='helmut' AND NOT EXISTS(SELECT 1 FROM users WHERE role='admin')");
  return {
    pool,
    async published(slug){return (await pool.query('SELECT story FROM published WHERE slug=$1',[slug])).rows[0]?.story;},
    async allPublished(){return (await pool.query('SELECT story FROM published ORDER BY slug')).rows.map(r=>r.story);},
    async publish(slug,revision,author){const client=await pool.connect();try{
      await client.query('BEGIN');const row=(await client.query('SELECT data,revision FROM drafts WHERE slug=$1 FOR UPDATE',[slug])).rows[0];
      if(!row||row.revision!==revision)throw new Error('CONFLICT');
      await client.query('INSERT INTO published(slug,story,author) VALUES($1,$2,$3) ON CONFLICT(slug) DO UPDATE SET story=excluded.story,author=excluded.author,saved=NOW()',[slug,JSON.stringify(row.data.story),author]);await client.query('COMMIT');
    }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}},
    async hasUsers(){return (await pool.query('SELECT 1 FROM users LIMIT 1')).rowCount>0;},
    async users(){return (await pool.query('SELECT name,display_name,role,enabled FROM users ORDER BY name')).rows;},
    async setting(key){return (await pool.query('SELECT value FROM settings WHERE key=$1',[key])).rows[0]?.value;},
    async setSetting(key,value){await pool.query('INSERT INTO settings(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=excluded.value',[key,value]);},
    async bootstrap(name,displayName,password){
      const client=await pool.connect();try{
        await client.query('BEGIN');await client.query('LOCK TABLE users IN EXCLUSIVE MODE');
        if((await client.query('SELECT 1 FROM users LIMIT 1')).rowCount)throw new Error('SETUP_CLOSED');
        await client.query("INSERT INTO users(name,display_name,hash,role) VALUES($1,$2,$3,'admin')",[name,displayName,passwordHash(password)]);await client.query('COMMIT');
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async createUser(name,displayName,password,role){await pool.query('INSERT INTO users(name,display_name,hash,role) VALUES($1,$2,$3,$4)',[name,displayName,passwordHash(password),role]);},
    async updateUser(name,{displayName,role,enabled,password}){
      const client=await pool.connect();try{
        await client.query('BEGIN');await client.query('LOCK TABLE users IN EXCLUSIVE MODE');
        const row=(await client.query('SELECT * FROM users WHERE name=$1',[name])).rows[0];if(!row)throw new Error('NO_USER');
        if(row.role==='admin'&&row.enabled&&(role!=='admin'||!enabled)&&(await client.query("SELECT 1 FROM users WHERE role='admin' AND enabled AND name<>$1",[name])).rowCount===0)throw new Error('LAST_ADMIN');
        await client.query('UPDATE users SET display_name=$1,role=$2,enabled=$3,hash=$4,auth_version=auth_version+1 WHERE name=$5',[displayName,role,enabled,password?passwordHash(password):row.hash,name]);await client.query('COMMIT');
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async changePassword(name,password){await pool.query('UPDATE users SET hash=$1,auth_version=auth_version+1 WHERE name=$2',[passwordHash(password),name]);},
    async seed(story){await pool.query('INSERT INTO drafts(slug,data) VALUES($1,$2) ON CONFLICT(slug) DO NOTHING',[story.slug,JSON.stringify({story,notes:{facts:'',highlights:'',keywords:'',itinerary:[]}})]);},
    async user(name){return (await pool.query('SELECT * FROM users WHERE name=$1',[name])).rows[0];},
    async account(name,password){await pool.query('INSERT INTO users(name,hash) VALUES($1,$2) ON CONFLICT(name) DO UPDATE SET hash=excluded.hash',[name,passwordHash(password)]);},
    async draft(slug){const row=(await pool.query('SELECT data,revision FROM drafts WHERE slug=$1',[slug])).rows[0];if(!row)return null;const data=row.data;data.notes={facts:'',highlights:'',keywords:'',itinerary:[],...data.notes};if(!Array.isArray(data.notes.itinerary))data.notes.itinerary=[];return {...data,revision:row.revision};},
    async list(){return (await pool.query('SELECT slug,data FROM drafts ORDER BY slug')).rows.map(r=>({slug:r.slug,title:r.data.story.country[0]}));},
    async health(){await pool.query('SELECT 1');},
    async save(slug,data,revision,author){
      const client=await pool.connect();
      try{
        await client.query('BEGIN');
        const result=await client.query('UPDATE drafts SET data=$1,revision=revision+1 WHERE slug=$2 AND revision=$3 RETURNING revision',[JSON.stringify(data),slug,revision]);
        if(!result.rowCount)throw new Error('CONFLICT');
        await client.query('INSERT INTO history(slug,author,data) VALUES($1,$2,$3)',[slug,author,JSON.stringify(data)]);
        await client.query('COMMIT');return result.rows[0].revision;
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async close(){await pool.end();}
  };
}
