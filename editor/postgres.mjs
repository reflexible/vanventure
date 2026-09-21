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
  // Cockpit tables are deliberately additive. They never change editorial or public-site data.
  await pool.query(`CREATE TABLE IF NOT EXISTS yt_connections(
      id BIGSERIAL PRIMARY KEY, channel_id TEXT NOT NULL UNIQUE, channel_title TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'disconnected', token_ciphertext TEXT, token_iv TEXT,
      token_tag TEXT, scopes TEXT[] NOT NULL DEFAULT '{}', connected_by TEXT REFERENCES users(name),
      connected_at TIMESTAMPTZ, last_sync_at TIMESTAMPTZ, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS yt_sync_runs(
      id BIGSERIAL PRIMARY KEY, connection_id BIGINT REFERENCES yt_connections(id), kind TEXT NOT NULL,
      status TEXT NOT NULL, started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), finished_at TIMESTAMPTZ,
      from_date DATE, to_date DATE, records_written INTEGER NOT NULL DEFAULT 0,
      error_code TEXT, error_detail_safe TEXT);
    CREATE TABLE IF NOT EXISTS yt_videos(
      video_id TEXT PRIMARY KEY, connection_id BIGINT NOT NULL REFERENCES yt_connections(id), title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '', published_at TIMESTAMPTZ, duration_seconds INTEGER,
      privacy_status TEXT, thumbnail_url TEXT, metadata JSONB NOT NULL DEFAULT '{}', last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS yt_channel_daily_metrics(
      connection_id BIGINT NOT NULL REFERENCES yt_connections(id), metric_date DATE NOT NULL,
      views BIGINT, watch_time_minutes NUMERIC, subscribers_gained INTEGER, subscribers_lost INTEGER,
      estimated_revenue NUMERIC, metrics_json JSONB NOT NULL DEFAULT '{}', PRIMARY KEY(connection_id,metric_date));
    CREATE TABLE IF NOT EXISTS yt_video_daily_metrics(
      video_id TEXT NOT NULL REFERENCES yt_videos(video_id), metric_date DATE NOT NULL, views BIGINT,
      watch_time_minutes NUMERIC, average_view_duration NUMERIC, impressions BIGINT, impressions_ctr NUMERIC,
      likes BIGINT, comments BIGINT, metrics_json JSONB NOT NULL DEFAULT '{}', PRIMARY KEY(video_id,metric_date));
    CREATE TABLE IF NOT EXISTS yt_video_snapshots(
      video_id TEXT NOT NULL REFERENCES yt_videos(video_id), age_days INTEGER NOT NULL CHECK(age_days IN (1,7,28,90,365)),
      snapshot_date DATE NOT NULL, metrics_json JSONB NOT NULL DEFAULT '{}', complete BOOLEAN NOT NULL DEFAULT FALSE,
      PRIMARY KEY(video_id,age_days));
    CREATE TABLE IF NOT EXISTS yt_sync_locks(
      connection_id BIGINT PRIMARY KEY REFERENCES yt_connections(id), locked_until TIMESTAMPTZ NOT NULL, run_id BIGINT);
    CREATE TABLE IF NOT EXISTS content_items(
      id BIGSERIAL PRIMARY KEY, planned_year INTEGER NOT NULL, slot INTEGER, title_working TEXT NOT NULL,
      format TEXT NOT NULL DEFAULT 'longform', pillar TEXT, status TEXT NOT NULL DEFAULT 'idea',
      target_publish_date DATE, youtube_video_id TEXT REFERENCES yt_videos(video_id), brief TEXT NOT NULL DEFAULT '',
      owner TEXT REFERENCES users(name), updated_by TEXT REFERENCES users(name), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), UNIQUE(planned_year,slot));
    CREATE TABLE IF NOT EXISTS master_context_entries(
      id BIGSERIAL PRIMARY KEY, category TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'draft', source_url TEXT, effective_from DATE, effective_to DATE,
      updated_by TEXT REFERENCES users(name), created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS cockpit_audit_log(
      id BIGSERIAL PRIMARY KEY, actor TEXT REFERENCES users(name), action TEXT NOT NULL, entity_type TEXT NOT NULL,
      entity_id TEXT, before_safe JSONB, after_safe JSONB, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE INDEX IF NOT EXISTS yt_sync_runs_connection_started_idx ON yt_sync_runs(connection_id,started_at DESC);
    CREATE INDEX IF NOT EXISTS yt_videos_connection_published_idx ON yt_videos(connection_id,published_at DESC);
    CREATE INDEX IF NOT EXISTS content_items_year_slot_idx ON content_items(planned_year,slot);`);
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
    async migrateStory(slug,migration,oldText,story){
      const client=await pool.connect();try{
        await client.query('BEGIN');await client.query('LOCK TABLE drafts IN ROW EXCLUSIVE MODE');
        if((await client.query('SELECT 1 FROM settings WHERE key=$1',[migration])).rowCount){await client.query('COMMIT');return false;}
        const row=(await client.query('SELECT data,revision FROM drafts WHERE slug=$1 FOR UPDATE',[slug])).rows[0];
        if(row&&JSON.stringify(row.data.story).includes(oldText)){
          await client.query('INSERT INTO history(slug,author,data) VALUES($1,$2,$3)',[slug,'content-migration',JSON.stringify(row.data)]);
          const data={...row.data,story};await client.query('UPDATE drafts SET data=$1,revision=revision+1 WHERE slug=$2',[JSON.stringify(data),slug]);
          await client.query('INSERT INTO published(slug,story,author) VALUES($1,$2,$3) ON CONFLICT(slug) DO UPDATE SET story=excluded.story,author=excluded.author,saved=NOW()',[slug,JSON.stringify(story),'content-migration']);
        }
        await client.query('INSERT INTO settings(key,value) VALUES($1,$2)',[migration,new Date().toISOString()]);await client.query('COMMIT');return true;
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async user(name){return (await pool.query('SELECT * FROM users WHERE name=$1',[name])).rows[0];},
    async account(name,password){await pool.query('INSERT INTO users(name,hash) VALUES($1,$2) ON CONFLICT(name) DO UPDATE SET hash=excluded.hash',[name,passwordHash(password)]);},
    async draft(slug){const row=(await pool.query('SELECT data,revision FROM drafts WHERE slug=$1',[slug])).rows[0];if(!row)return null;const data=row.data;data.notes={facts:'',highlights:'',keywords:'',itinerary:[],...data.notes};if(!Array.isArray(data.notes.itinerary))data.notes.itinerary=[];return {...data,revision:row.revision};},
    async list(){return (await pool.query('SELECT slug,data FROM drafts ORDER BY slug')).rows.map(r=>({slug:r.slug,title:r.data.story.country[0]}));},
    async cockpitOverview(){
      // Keep these reads sequential: the lightweight PGlite test adapter accepts one request at a time.
      const connection=await pool.query("SELECT channel_id,channel_title,status,last_sync_at FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1");
      const videos=await pool.query('SELECT COUNT(*)::int AS count FROM yt_videos');
      const content=await pool.query('SELECT COUNT(*)::int AS count FROM content_items');
      const context=await pool.query("SELECT COUNT(*)::int AS count FROM master_context_entries WHERE status='approved'");
      const lastSync=await pool.query("SELECT status,finished_at FROM yt_sync_runs ORDER BY started_at DESC LIMIT 1");
      return {phase:1,connection:connection.rows[0]||null,videos:videos.rows[0].count,contentItems:content.rows[0].count,approvedContextEntries:context.rows[0].count,lastSync:lastSync.rows[0]||null};
    },
    async cockpitAudit(actor,action,entityType,entityId=null,before=null,after=null){
      await pool.query('INSERT INTO cockpit_audit_log(actor,action,entity_type,entity_id,before_safe,after_safe) VALUES($1,$2,$3,$4,$5,$6)',[actor,action,entityType,entityId,before,after]);
    },
    async cockpitConnection(){return (await pool.query("SELECT id,channel_id,channel_title,status,token_ciphertext,token_iv,token_tag FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1")).rows[0]||null;},
    async saveCockpitConnection(channel,token,actor){
      const row=(await pool.query(`INSERT INTO yt_connections(channel_id,channel_title,status,token_ciphertext,token_iv,token_tag,scopes,connected_by,connected_at,updated_at)
        VALUES($1,$2,'active',$3,$4,$5,$6,$7,NOW(),NOW()) ON CONFLICT(channel_id) DO UPDATE SET channel_title=EXCLUDED.channel_title,status='active',token_ciphertext=EXCLUDED.token_ciphertext,token_iv=EXCLUDED.token_iv,token_tag=EXCLUDED.token_tag,scopes=EXCLUDED.scopes,connected_by=EXCLUDED.connected_by,connected_at=NOW(),updated_at=NOW() RETURNING id`,[channel.id,channel.snippet.title,token.ciphertext,token.iv,token.tag,['youtube.readonly','yt-analytics.readonly'],actor])).rows[0];
      return row.id;
    },
    async recordYoutubeSync(connectionId,kind,work){
      const run=(await pool.query("INSERT INTO yt_sync_runs(connection_id,kind,status) VALUES($1,$2,'running') RETURNING id",[connectionId,kind])).rows[0];
      try{const records=await work();await pool.query("UPDATE yt_sync_runs SET status='succeeded',finished_at=NOW(),records_written=$2 WHERE id=$1",[run.id,records]);await pool.query('UPDATE yt_connections SET last_sync_at=NOW(),updated_at=NOW() WHERE id=$1',[connectionId]);return records;}catch(error){await pool.query("UPDATE yt_sync_runs SET status='failed',finished_at=NOW(),error_code=$2,error_detail_safe=$3 WHERE id=$1",[run.id,String(error.message||'SYNC_FAILED').slice(0,80),'Google-Abruf konnte nicht abgeschlossen werden.']);throw error;}
    },
    async upsertYoutubeVideos(connectionId,videos){for(const video of videos)await pool.query(`INSERT INTO yt_videos(video_id,connection_id,title,description,published_at,thumbnail_url,last_seen_at) VALUES($1,$2,$3,$4,$5,$6,NOW()) ON CONFLICT(video_id) DO UPDATE SET connection_id=EXCLUDED.connection_id,title=EXCLUDED.title,description=EXCLUDED.description,published_at=EXCLUDED.published_at,thumbnail_url=EXCLUDED.thumbnail_url,last_seen_at=NOW()`,[video.video_id,connectionId,video.title,video.description,video.published_at,video.thumbnail_url]);return videos.length;},
    async upsertYoutubeDailyMetrics(connectionId,metrics){for(const row of metrics)await pool.query(`INSERT INTO yt_channel_daily_metrics(connection_id,metric_date,views,watch_time_minutes,subscribers_gained,subscribers_lost,metrics_json) VALUES($1,$2,$3,$4,$5,$6,$7) ON CONFLICT(connection_id,metric_date) DO UPDATE SET views=EXCLUDED.views,watch_time_minutes=EXCLUDED.watch_time_minutes,subscribers_gained=EXCLUDED.subscribers_gained,subscribers_lost=EXCLUDED.subscribers_lost,metrics_json=EXCLUDED.metrics_json`,[connectionId,row.day,Number(row.views)||0,Number(row.estimatedMinutesWatched)||0,Number(row.subscribersGained)||0,Number(row.subscribersLost)||0,row]);return metrics.length;},
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
