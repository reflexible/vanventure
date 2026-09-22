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
    ALTER TABLE users ADD COLUMN IF NOT EXISTS google_provider TEXT;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS google_sub TEXT UNIQUE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS google_email TEXT UNIQUE;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS google_email_verified_at TIMESTAMPTZ;
    ALTER TABLE users ADD COLUMN IF NOT EXISTS google_linked_at TIMESTAMPTZ;
    CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY, value TEXT NOT NULL);`);
  await pool.query(`CREATE TABLE IF NOT EXISTS auth_sessions(
      token_hash TEXT PRIMARY KEY, user_name TEXT NOT NULL REFERENCES users(name) ON DELETE CASCADE,
      auth_version INTEGER NOT NULL, csrf_token TEXT NOT NULL, expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS google_login_states(
      state_hash TEXT PRIMARY KEY, code_verifier TEXT NOT NULL, nonce TEXT NOT NULL, return_to TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
    CREATE INDEX IF NOT EXISTS auth_sessions_expiry_idx ON auth_sessions(expires_at);
    CREATE INDEX IF NOT EXISTS google_login_states_expiry_idx ON google_login_states(expires_at);`);
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
      privacy_status TEXT, public_view_count BIGINT, thumbnail_url TEXT, metadata JSONB NOT NULL DEFAULT '{}',
      format TEXT, pillar TEXT, audit_decision TEXT, reuse_potential TEXT, last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW());
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
    CREATE TABLE IF NOT EXISTS yt_video_traffic_sources(
      video_id TEXT NOT NULL REFERENCES yt_videos(video_id), from_date DATE NOT NULL, to_date DATE NOT NULL,
      source_type TEXT NOT NULL, views BIGINT, watch_time_minutes NUMERIC, fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      PRIMARY KEY(video_id,from_date,to_date,source_type));
    CREATE TABLE IF NOT EXISTS yt_video_retention(
      video_id TEXT NOT NULL REFERENCES yt_videos(video_id), from_date DATE NOT NULL, to_date DATE NOT NULL,
      elapsed_ratio NUMERIC NOT NULL, audience_watch_ratio NUMERIC, relative_retention_performance NUMERIC,
      fetched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), PRIMARY KEY(video_id,from_date,to_date,elapsed_ratio));
    CREATE TABLE IF NOT EXISTS yt_sync_locks(
      connection_id BIGINT PRIMARY KEY REFERENCES yt_connections(id), locked_until TIMESTAMPTZ NOT NULL, run_id BIGINT);
    CREATE TABLE IF NOT EXISTS content_items(
      id BIGSERIAL PRIMARY KEY, planned_year INTEGER NOT NULL, slot INTEGER, title_working TEXT NOT NULL,
      format TEXT NOT NULL DEFAULT 'longform', pillar TEXT, status TEXT NOT NULL DEFAULT 'idea',
      target_publish_date DATE, youtube_video_id TEXT REFERENCES yt_videos(video_id), brief TEXT NOT NULL DEFAULT '',
      estimated_hours NUMERIC, actual_hours NUMERIC,
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
  await pool.query(`ALTER TABLE yt_channel_daily_metrics ADD COLUMN IF NOT EXISTS impressions BIGINT;
    ALTER TABLE yt_channel_daily_metrics ADD COLUMN IF NOT EXISTS impressions_ctr NUMERIC;`);
  await pool.query(`ALTER TABLE content_items ADD COLUMN IF NOT EXISTS estimated_hours NUMERIC;
    ALTER TABLE content_items ADD COLUMN IF NOT EXISTS actual_hours NUMERIC;`);
  await pool.query(`ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS duration_seconds INTEGER;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS privacy_status TEXT;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS public_view_count BIGINT;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS format TEXT;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS pillar TEXT;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS audit_decision TEXT;
    ALTER TABLE yt_videos ADD COLUMN IF NOT EXISTS reuse_potential TEXT;`);
  // The Data API exposes duration but no authoritative Shorts flag. Clear only the
  // one-time duration guesses made before this rule; later manual choices persist.
  const formatMigration=await pool.query("INSERT INTO settings(key,value) VALUES('cockpit:remove-duration-format-guesses',NOW()::text) ON CONFLICT(key) DO NOTHING RETURNING key");
  if(formatMigration.rowCount)await pool.query("UPDATE yt_videos SET format=NULL WHERE format IS NOT NULL AND pillar IS NULL AND audit_decision IS NULL AND reuse_potential IS NULL");
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
    async users(){return (await pool.query('SELECT name,display_name,role,enabled,google_email,google_linked_at FROM users ORDER BY name')).rows;},
    async setting(key){return (await pool.query('SELECT value FROM settings WHERE key=$1',[key])).rows[0]?.value;},
    async setSetting(key,value){await pool.query('INSERT INTO settings(key,value) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET value=excluded.value',[key,value]);},
    async bootstrap(name,displayName,password){
      const client=await pool.connect();try{
        await client.query('BEGIN');await client.query('LOCK TABLE users IN EXCLUSIVE MODE');
        if((await client.query('SELECT 1 FROM users LIMIT 1')).rowCount)throw new Error('SETUP_CLOSED');
        await client.query("INSERT INTO users(name,display_name,hash,role) VALUES($1,$2,$3,'admin')",[name,displayName,passwordHash(password)]);await client.query('COMMIT');
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async createUser(name,displayName,password,role,googleEmail=null){await pool.query("INSERT INTO users(name,display_name,hash,role,google_email,google_provider) VALUES($1,$2,$3,$4,$5,CASE WHEN $5::text IS NULL THEN NULL ELSE 'google' END)",[name,displayName,passwordHash(password),role,googleEmail]);},
    async updateUser(name,{displayName,role,enabled,password,googleEmail}){
      const client=await pool.connect();try{
        await client.query('BEGIN');await client.query('LOCK TABLE users IN EXCLUSIVE MODE');
        const row=(await client.query('SELECT * FROM users WHERE name=$1',[name])).rows[0];if(!row)throw new Error('NO_USER');
        if(row.role==='admin'&&row.enabled&&(role!=='admin'||!enabled)&&(await client.query("SELECT 1 FROM users WHERE role='admin' AND enabled AND name<>$1",[name])).rowCount===0)throw new Error('LAST_ADMIN');
        const changedGoogleEmail=(row.google_email||null)!==(googleEmail||null);
        if(changedGoogleEmail&&googleEmail&&(await client.query('SELECT 1 FROM users WHERE google_email=$1 AND name<>$2',[googleEmail,name])).rowCount)throw new Error('GOOGLE_EMAIL_IN_USE');
        await client.query('UPDATE users SET display_name=$1,role=$2,enabled=$3,hash=$4,google_email=$5,google_provider=CASE WHEN $5::text IS NULL THEN NULL ELSE \'google\' END,google_sub=CASE WHEN $6 THEN NULL ELSE google_sub END,google_email_verified_at=CASE WHEN $6 THEN NULL ELSE google_email_verified_at END,google_linked_at=CASE WHEN $6 THEN NULL ELSE google_linked_at END,auth_version=auth_version+1 WHERE name=$7',[displayName,role,enabled,password?passwordHash(password):row.hash,googleEmail,changedGoogleEmail,name]);await client.query('COMMIT');
      }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
    },
    async changePassword(name,password){await pool.query('UPDATE users SET hash=$1,auth_version=auth_version+1 WHERE name=$2',[passwordHash(password),name]);},
    async createSession(tokenHash,user,csrf){await pool.query("INSERT INTO auth_sessions(token_hash,user_name,auth_version,csrf_token,expires_at) VALUES($1,$2,$3,$4,NOW()+INTERVAL '8 hours')",[tokenHash,user.name,user.auth_version,csrf]);},
    async session(tokenHash){return (await pool.query('SELECT s.token_hash,s.auth_version AS session_auth_version,s.csrf_token,u.* FROM auth_sessions s JOIN users u ON u.name=s.user_name WHERE s.token_hash=$1 AND s.expires_at>NOW()',[tokenHash])).rows[0]||null;},
    async deleteSession(tokenHash){await pool.query('DELETE FROM auth_sessions WHERE token_hash=$1',[tokenHash]);},
    async createGoogleLoginState(stateHash,codeVerifier,nonce,returnTo){await pool.query("INSERT INTO google_login_states(state_hash,code_verifier,nonce,return_to,expires_at) VALUES($1,$2,$3,$4,NOW()+INTERVAL '10 minutes')",[stateHash,codeVerifier,nonce,returnTo]);},
    async takeGoogleLoginState(stateHash){const client=await pool.connect();try{await client.query('BEGIN');const row=(await client.query('DELETE FROM google_login_states WHERE state_hash=$1 AND expires_at>NOW() RETURNING code_verifier,nonce,return_to',[stateHash])).rows[0]||null;await client.query('COMMIT');return row;}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}},
    async googleUser(identity){const client=await pool.connect();try{await client.query('BEGIN');const row=(await client.query('SELECT * FROM users WHERE google_email=$1 FOR UPDATE',[identity.email])).rows[0];if(!row||!row.enabled)throw new Error('GOOGLE_LOGIN_NOT_ALLOWED');if(row.google_sub&&row.google_sub!==identity.sub)throw new Error('GOOGLE_LOGIN_NOT_ALLOWED');if(!row.google_sub)await client.query("UPDATE users SET google_provider='google',google_sub=$1,google_email_verified_at=NOW(),google_linked_at=NOW() WHERE name=$2",[identity.sub,row.name]);await client.query('COMMIT');return {...row,google_sub:identity.sub};}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}},
    async cleanupAuth(){await pool.query('DELETE FROM auth_sessions WHERE expires_at<=NOW(); DELETE FROM google_login_states WHERE expires_at<=NOW()');},
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
    async cockpitOverview(periodDays=28){
      // Keep these reads sequential: the lightweight PGlite test adapter accepts one request at a time.
      const connection=await pool.query("SELECT channel_id,channel_title,status,last_sync_at FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1");
      const videos=await pool.query('SELECT COUNT(*)::int AS count FROM yt_videos');
      const content=await pool.query('SELECT COUNT(*)::int AS count FROM content_items');
      const context=await pool.query("SELECT COUNT(*)::int AS count FROM master_context_entries WHERE status='approved'");
      const lastSync=await pool.query("SELECT status,finished_at FROM yt_sync_runs ORDER BY started_at DESC LIMIT 1");
      const metrics=await pool.query(`SELECT
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN views ELSE 0 END),0)::bigint AS views,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN watch_time_minutes ELSE 0 END),0)::numeric AS watch_time_minutes,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN subscribers_gained-subscribers_lost ELSE 0 END),0)::bigint AS subscribers_net,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN impressions ELSE 0 END),0)::bigint AS impressions,
        SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN impressions*impressions_ctr ELSE 0 END)/NULLIF(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN impressions ELSE 0 END),0) AS impressions_ctr,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN views ELSE 0 END),0)::bigint AS previous_views,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN watch_time_minutes ELSE 0 END),0)::numeric AS previous_watch_time_minutes,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN subscribers_gained-subscribers_lost ELSE 0 END),0)::bigint AS previous_subscribers_net,
        COALESCE(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN impressions ELSE 0 END),0)::bigint AS previous_impressions,
        SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN impressions*impressions_ctr ELSE 0 END)/NULLIF(SUM(CASE WHEN metric_date>=CURRENT_DATE-($1::int*2-1) AND metric_date<CURRENT_DATE-($1::int-1) THEN impressions ELSE 0 END),0) AS previous_impressions_ctr,
        COUNT(DISTINCT CASE WHEN metric_date>=CURRENT_DATE-($1::int-1) THEN metric_date END)::int AS available_days
        FROM yt_channel_daily_metrics`,[periodDays]);
      const row=metrics.rows[0],number=value=>value===null?null:Number(value),current={views:number(row.views),watchTimeMinutes:number(row.watch_time_minutes),subscribersNet:number(row.subscribers_net),impressions:number(row.impressions),impressionsCtr:number(row.impressions_ctr)},previous={views:number(row.previous_views),watchTimeMinutes:number(row.previous_watch_time_minutes),subscribersNet:number(row.previous_subscribers_net),impressions:number(row.previous_impressions),impressionsCtr:number(row.previous_impressions_ctr)};
      return {phase:3,periodDays,availableDays:Number(row.available_days),connection:connection.rows[0]||null,videos:videos.rows[0].count,contentItems:content.rows[0].count,approvedContextEntries:context.rows[0].count,lastSync:lastSync.rows[0]||null,kpis:{current,previous}};
    },
    async cockpitVideos(query=''){
      const term=`%${query.trim()}%`;
      return (await pool.query(`SELECT v.video_id,v.title,v.published_at,v.thumbnail_url,v.privacy_status,v.duration_seconds,v.public_view_count,v.format,v.pillar,v.audit_decision,v.reuse_potential,v.last_seen_at,
        m.metric_date,m.views,m.watch_time_minutes,m.impressions,m.impressions_ctr,m.likes,m.comments
        FROM yt_videos v
        LEFT JOIN LATERAL (SELECT metric_date,views,watch_time_minutes,impressions,impressions_ctr,likes,comments FROM yt_video_daily_metrics WHERE video_id=v.video_id ORDER BY metric_date DESC LIMIT 1) m ON true
        WHERE v.title ILIKE $1 ORDER BY v.published_at DESC NULLS LAST LIMIT 200`,[term])).rows;
    },
    async cockpitVideo(videoId){return (await pool.query(`SELECT video_id,title,description,published_at,thumbnail_url,privacy_status,duration_seconds,public_view_count,metadata,format,pillar,audit_decision,reuse_potential FROM yt_videos WHERE video_id=$1`,[videoId])).rows[0]||null;},
    async updateCockpitVideoClassification(videoId,item){return (await pool.query(`UPDATE yt_videos SET format=$1,pillar=$2,audit_decision=$3,reuse_potential=$4 WHERE video_id=$5 RETURNING video_id`,[item.format,item.pillar,item.audit_decision,item.reuse_potential,videoId])).rows[0]||null;},
    async cockpitVideoSnapshots(videoId){return (await pool.query('SELECT age_days,snapshot_date,metrics_json,complete FROM yt_video_snapshots WHERE video_id=$1 ORDER BY age_days',[videoId])).rows;},
    async cockpitAuditExport(){
      const connection=await pool.query("SELECT channel_id,channel_title,last_sync_at FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1");
      const lastRun=await pool.query("SELECT finished_at FROM yt_sync_runs WHERE status='succeeded' ORDER BY finished_at DESC NULLS LAST LIMIT 1");
      const videos=await pool.query(`SELECT v.video_id,v.title,v.published_at,v.privacy_status,v.thumbnail_url,v.duration_seconds,v.public_view_count,
          v.format,v.pillar,v.audit_decision,v.reuse_potential,
          m.metric_date,m.views,m.watch_time_minutes,m.average_view_duration,m.impressions,m.impressions_ctr,m.likes,m.comments,
          totals.views_365,totals.views_90,totals.views_28,totals.views_7,totals.watch_time_365,totals.watch_time_90,totals.watch_time_28,totals.watch_time_7
          FROM yt_videos v
          LEFT JOIN LATERAL (
            SELECT metric_date,views,watch_time_minutes,average_view_duration,impressions,impressions_ctr,likes,comments
            FROM yt_video_daily_metrics WHERE video_id=v.video_id ORDER BY metric_date DESC LIMIT 1
          ) m ON true
          LEFT JOIN LATERAL (SELECT
            COALESCE(SUM(views) FILTER(WHERE metric_date>=CURRENT_DATE-364),0)::bigint AS views_365, COALESCE(SUM(views) FILTER(WHERE metric_date>=CURRENT_DATE-89),0)::bigint AS views_90, COALESCE(SUM(views) FILTER(WHERE metric_date>=CURRENT_DATE-27),0)::bigint AS views_28, COALESCE(SUM(views) FILTER(WHERE metric_date>=CURRENT_DATE-6),0)::bigint AS views_7,
            COALESCE(SUM(watch_time_minutes) FILTER(WHERE metric_date>=CURRENT_DATE-364),0)::numeric AS watch_time_365, COALESCE(SUM(watch_time_minutes) FILTER(WHERE metric_date>=CURRENT_DATE-89),0)::numeric AS watch_time_90, COALESCE(SUM(watch_time_minutes) FILTER(WHERE metric_date>=CURRENT_DATE-27),0)::numeric AS watch_time_28, COALESCE(SUM(watch_time_minutes) FILTER(WHERE metric_date>=CURRENT_DATE-6),0)::numeric AS watch_time_7
            FROM yt_video_daily_metrics WHERE video_id=v.video_id) totals ON true
          ORDER BY v.published_at DESC NULLS LAST`);
      const channelDays=await pool.query("SELECT MIN(metric_date) AS first_metric_date,MAX(metric_date) AS last_metric_date,COUNT(*)::int AS days FROM yt_channel_daily_metrics");
      const snapshots=await pool.query(`SELECT video_id,age_days,snapshot_date,metrics_json,complete
        FROM yt_video_snapshots ORDER BY video_id,age_days`);
      const traffic=await pool.query(`SELECT video_id,from_date,to_date,source_type,views,watch_time_minutes FROM yt_video_traffic_sources ORDER BY video_id,views DESC`);
      const retention=await pool.query(`SELECT video_id,from_date,to_date,elapsed_ratio,audience_watch_ratio,relative_retention_performance FROM yt_video_retention ORDER BY video_id,elapsed_ratio`);
      const snapshotsByVideo=new Map();
      for(const snapshot of snapshots.rows){
        const items=snapshotsByVideo.get(snapshot.video_id)||[];
        items.push({age_days:snapshot.age_days,snapshot_date:snapshot.snapshot_date,complete:snapshot.complete,metrics:snapshot.metrics_json});
        snapshotsByVideo.set(snapshot.video_id,items);
      }
      const trafficByVideo=new Map(),retentionByVideo=new Map();
      for(const row of traffic.rows){const items=trafficByVideo.get(row.video_id)||[];items.push({from_date:row.from_date,to_date:row.to_date,source_type:row.source_type,views:Number(row.views),watch_time_minutes:Number(row.watch_time_minutes)});trafficByVideo.set(row.video_id,items);}
      for(const row of retention.rows){const items=retentionByVideo.get(row.video_id)||[];items.push({from_date:row.from_date,to_date:row.to_date,elapsed_ratio:Number(row.elapsed_ratio),audience_watch_ratio:Number(row.audience_watch_ratio),relative_retention_performance:Number(row.relative_retention_performance)});retentionByVideo.set(row.video_id,items);}
      const channel=connection.rows[0]||null,coverage=channelDays.rows[0];
      return {
        schema_version:2,
        generated_at:new Date().toISOString(),
        as_of:lastRun.rows[0]?.finished_at||channel?.last_sync_at||null,
        channel:channel&&{id:channel.channel_id,title:channel.channel_title},
        data_quality:{
          channel_daily_metrics:{first_date:coverage.first_metric_date||null,last_date:coverage.last_metric_date||null,days:coverage.days},
          limitations:[
            'Impressions und CTR können bei älteren oder noch nicht erneut synchronisierten Video-Tageswerten fehlen.',
            'Traffic Sources und Audience Retention werden nur ausgegeben, wenn YouTube die jeweilige Abfrage unterstützt und Werte zurückliefert.'
          ]
        },
        videos:videos.rows.map(video=>({
          id:video.video_id,title:video.title,published_at:video.published_at,privacy_status:video.privacy_status,thumbnail_url:video.thumbnail_url,duration_seconds:video.duration_seconds,public_total_views:video.public_view_count===null?null:Number(video.public_view_count),
          classification:{format:video.format||null,pillar:video.pillar||null,decision:video.audit_decision||null,reuse_potential:video.reuse_potential||null},
          totals:{lifetime:{public_views:video.public_view_count===null?null:Number(video.public_view_count)},last_365_days:{views:Number(video.views_365),watch_time_minutes:Number(video.watch_time_365)},last_90_days:{views:Number(video.views_90),watch_time_minutes:Number(video.watch_time_90)},last_28_days:{views:Number(video.views_28),watch_time_minutes:Number(video.watch_time_28)},last_7_days:{views:Number(video.views_7),watch_time_minutes:Number(video.watch_time_7)}},
          latest_daily_value:video.metric_date?{date:video.metric_date,views:video.views,watch_time_minutes:video.watch_time_minutes,average_view_duration:video.average_view_duration,impressions:video.impressions,impressions_ctr:video.impressions_ctr,likes:video.likes,comments:video.comments}:null,
          analytics_v2:{traffic_sources:trafficByVideo.get(video.video_id)||[],audience_retention:retentionByVideo.get(video.video_id)||[]},
          snapshots:snapshotsByVideo.get(video.video_id)||[]
        }))
      };
    },
    async cockpitSyncRuns(){return (await pool.query('SELECT id,kind,status,started_at,finished_at,records_written,error_code,error_detail_safe FROM yt_sync_runs ORDER BY started_at DESC LIMIT 20')).rows;},
    async ensurePlannerYear(year,actor){
      const slots=year===2026?[10,11,12]:Array.from({length:12},(_,index)=>index+1);
      for(const slot of slots)await pool.query(`INSERT INTO content_items(planned_year,slot,title_working,format,status,target_publish_date,updated_by)
        VALUES($1,$2,$3,'longform','idea',$4,$5) ON CONFLICT(planned_year,slot) DO NOTHING`,[year,slot,`Longform ${String(slot).padStart(2,'0')}`,`${year}-${String(slot).padStart(2,'0')}-15`,actor]);
    },
    async cockpitContent(year){return (await pool.query(`SELECT id,planned_year,slot,title_working,format,pillar,status,target_publish_date,youtube_video_id,brief,estimated_hours,actual_hours,owner,updated_by,updated_at
      FROM content_items WHERE planned_year=$1 ORDER BY slot NULLS LAST, target_publish_date NULLS LAST,id`,[year])).rows;},
    async createCockpitContent(item,actor){return (await pool.query(`INSERT INTO content_items(planned_year,slot,title_working,format,pillar,status,target_publish_date,youtube_video_id,brief,estimated_hours,actual_hours,owner,updated_by)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,[item.planned_year,item.slot,item.title_working,item.format,item.pillar,item.status,item.target_publish_date,item.youtube_video_id,item.brief,item.estimated_hours,item.actual_hours,item.owner,actor])).rows[0];},
    async updateCockpitContent(id,item,actor){return (await pool.query(`UPDATE content_items SET title_working=$1,format=$2,pillar=$3,status=$4,target_publish_date=$5,youtube_video_id=$6,brief=$7,estimated_hours=$8,actual_hours=$9,owner=$10,updated_by=$11,updated_at=NOW() WHERE id=$12 RETURNING id`,[item.title_working,item.format,item.pillar,item.status,item.target_publish_date,item.youtube_video_id,item.brief,item.estimated_hours,item.actual_hours,item.owner,actor,id])).rows[0]||null;},
    async cockpitContext(){return (await pool.query('SELECT id,category,title,body,status,source_url,effective_from,effective_to,updated_by,updated_at FROM master_context_entries ORDER BY category,title,id')).rows;},
    async createCockpitContext(item,actor){return (await pool.query(`INSERT INTO master_context_entries(category,title,body,status,source_url,effective_from,effective_to,updated_by)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,[item.category,item.title,item.body,item.status,item.source_url,item.effective_from,item.effective_to,actor])).rows[0];},
    async updateCockpitContext(id,item,actor){return (await pool.query(`UPDATE master_context_entries SET category=$1,title=$2,body=$3,status=$4,source_url=$5,effective_from=$6,effective_to=$7,updated_by=$8,updated_at=NOW() WHERE id=$9 RETURNING id`,[item.category,item.title,item.body,item.status,item.source_url,item.effective_from,item.effective_to,actor,id])).rows[0]||null;},
    async cockpitInsights(){
      const missingBrief=await pool.query("SELECT id,title_working,slot FROM content_items WHERE brief='' AND status NOT IN ('published','reviewed') ORDER BY planned_year,slot LIMIT 10");
      const videos=await pool.query(`SELECT v.video_id,v.title,COALESCE(SUM(m.views),0)::bigint AS views FROM yt_videos v LEFT JOIN yt_video_daily_metrics m ON m.video_id=v.video_id AND m.metric_date>=CURRENT_DATE-28 GROUP BY v.video_id,v.title ORDER BY views DESC LIMIT 3`);
      return {basis:{periodDays:28,asOf:new Date().toISOString()},items:[...missingBrief.rows.map(row=>({kind:'missing_brief',level:'action',title:`${row.title_working}: Brief ergänzen`,basis:'Geplanter Inhalt ohne Brief; veröffentlichte und ausgewertete Inhalte sind ausgeschlossen.',contentItemId:row.id})),...videos.rows.filter(row=>Number(row.views)>0).map(row=>({kind:'top_video',level:'signal',title:row.title,basis:`${row.views} Views in den letzten 28 Tagen.`,videoId:row.video_id}))]};
    },
    async cockpitAudit(actor,action,entityType,entityId=null,before=null,after=null){
      await pool.query('INSERT INTO cockpit_audit_log(actor,action,entity_type,entity_id,before_safe,after_safe) VALUES($1,$2,$3,$4,$5,$6)',[actor,action,entityType,entityId,before,after]);
    },
    async cockpitHealth(){
      const connection=(await pool.query("SELECT channel_title,status,last_sync_at FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1")).rows[0]||null;
      const lastRun=(await pool.query('SELECT status,finished_at,error_code FROM yt_sync_runs ORDER BY started_at DESC LIMIT 1')).rows[0]||null;
      return {connection,lastRun};
    },
    async cockpitConnection(){return (await pool.query("SELECT id,channel_id,channel_title,status,token_ciphertext,token_iv,token_tag,last_sync_at FROM yt_connections WHERE status='active' ORDER BY connected_at DESC LIMIT 1")).rows[0]||null;},
    async saveCockpitConnection(channel,token,actor){
      const row=(await pool.query(`INSERT INTO yt_connections(channel_id,channel_title,status,token_ciphertext,token_iv,token_tag,scopes,connected_by,connected_at,updated_at)
        VALUES($1,$2,'active',$3,$4,$5,$6,$7,NOW(),NOW()) ON CONFLICT(channel_id) DO UPDATE SET channel_title=EXCLUDED.channel_title,status='active',token_ciphertext=EXCLUDED.token_ciphertext,token_iv=EXCLUDED.token_iv,token_tag=EXCLUDED.token_tag,scopes=EXCLUDED.scopes,connected_by=EXCLUDED.connected_by,connected_at=NOW(),updated_at=NOW() RETURNING id`,[channel.id,channel.snippet.title,token.ciphertext,token.iv,token.tag,['youtube.readonly','yt-analytics.readonly'],actor])).rows[0];
      return row.id;
    },
    async recordYoutubeSync(connectionId,kind,work){
      const client=await pool.connect();let run;
      try{await client.query('BEGIN');const lock=await client.query(`INSERT INTO yt_sync_locks(connection_id,locked_until) VALUES($1,NOW()+INTERVAL '15 minutes') ON CONFLICT(connection_id) DO UPDATE SET locked_until=EXCLUDED.locked_until WHERE yt_sync_locks.locked_until<NOW() RETURNING connection_id`,[connectionId]);if(!lock.rowCount)throw new Error('SYNC_RUNNING');run=(await client.query("INSERT INTO yt_sync_runs(connection_id,kind,status) VALUES($1,$2,'running') RETURNING id",[connectionId,kind])).rows[0];await client.query('UPDATE yt_sync_locks SET run_id=$2 WHERE connection_id=$1',[connectionId,run.id]);await client.query('COMMIT');
      }catch(error){await client.query('ROLLBACK').catch(()=>{});throw error;}finally{client.release();}
      try{const records=await work();await pool.query("UPDATE yt_sync_runs SET status='succeeded',finished_at=NOW(),records_written=$2 WHERE id=$1",[run.id,records]);await pool.query('UPDATE yt_connections SET last_sync_at=NOW(),updated_at=NOW() WHERE id=$1',[connectionId]);return records;}catch(error){await pool.query("UPDATE yt_sync_runs SET status='failed',finished_at=NOW(),error_code=$2,error_detail_safe=$3 WHERE id=$1",[run.id,String(error.message||'SYNC_FAILED').slice(0,80),'Google-Abruf konnte nicht abgeschlossen werden.']);throw error;}finally{await pool.query('DELETE FROM yt_sync_locks WHERE connection_id=$1 AND run_id=$2',[connectionId,run.id]);}
    },
    async upsertYoutubeVideos(connectionId,videos){for(const video of videos)await pool.query(`INSERT INTO yt_videos(video_id,connection_id,title,description,published_at,duration_seconds,privacy_status,public_view_count,thumbnail_url,last_seen_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,NOW()) ON CONFLICT(video_id) DO UPDATE SET connection_id=EXCLUDED.connection_id,title=EXCLUDED.title,description=EXCLUDED.description,published_at=EXCLUDED.published_at,duration_seconds=EXCLUDED.duration_seconds,privacy_status=EXCLUDED.privacy_status,public_view_count=EXCLUDED.public_view_count,thumbnail_url=EXCLUDED.thumbnail_url,last_seen_at=NOW()`,[video.video_id,connectionId,video.title,video.description,video.published_at,video.duration_seconds,video.privacy_status,video.public_view_count,video.thumbnail_url]);return videos.length;},
    async upsertYoutubeDailyMetrics(connectionId,metrics){for(const row of metrics)await pool.query(`INSERT INTO yt_channel_daily_metrics(connection_id,metric_date,views,watch_time_minutes,subscribers_gained,subscribers_lost,impressions,impressions_ctr,metrics_json) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(connection_id,metric_date) DO UPDATE SET views=EXCLUDED.views,watch_time_minutes=EXCLUDED.watch_time_minutes,subscribers_gained=EXCLUDED.subscribers_gained,subscribers_lost=EXCLUDED.subscribers_lost,impressions=COALESCE(EXCLUDED.impressions,yt_channel_daily_metrics.impressions),impressions_ctr=COALESCE(EXCLUDED.impressions_ctr,yt_channel_daily_metrics.impressions_ctr),metrics_json=EXCLUDED.metrics_json`,[connectionId,row.day,Number(row.views)||0,Number(row.estimatedMinutesWatched)||0,Number(row.subscribersGained)||0,Number(row.subscribersLost)||0,row.impressions===undefined?null:Number(row.impressions),row.impressionsClickThroughRate===undefined?null:Number(row.impressionsClickThroughRate),row]);return metrics.length;},
    async upsertYoutubeVideoDailyMetrics(metrics){for(const row of metrics)await pool.query(`INSERT INTO yt_video_daily_metrics(video_id,metric_date,views,watch_time_minutes,average_view_duration,impressions,impressions_ctr,likes,comments,metrics_json) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT(video_id,metric_date) DO UPDATE SET views=EXCLUDED.views,watch_time_minutes=EXCLUDED.watch_time_minutes,average_view_duration=EXCLUDED.average_view_duration,impressions=COALESCE(EXCLUDED.impressions,yt_video_daily_metrics.impressions),impressions_ctr=COALESCE(EXCLUDED.impressions_ctr,yt_video_daily_metrics.impressions_ctr),likes=EXCLUDED.likes,comments=EXCLUDED.comments,metrics_json=EXCLUDED.metrics_json`,[row.video,row.day,Number(row.views)||0,Number(row.estimatedMinutesWatched)||0,Number(row.averageViewDuration)||0,row.impressions===undefined?null:Number(row.impressions),row.impressionsClickThroughRate===undefined?null:Number(row.impressionsClickThroughRate),Number(row.likes)||0,Number(row.comments)||0,row]);return metrics.length;},
    async replaceYoutubeTrafficSources(data){if(!data.from_date||!data.to_date)return 0;await pool.query('DELETE FROM yt_video_traffic_sources WHERE from_date=$1 AND to_date=$2',[data.from_date,data.to_date]);for(const row of data.items)await pool.query(`INSERT INTO yt_video_traffic_sources(video_id,from_date,to_date,source_type,views,watch_time_minutes) VALUES($1,$2,$3,$4,$5,$6)`,[row.video_id,data.from_date,data.to_date,row.source_type,row.views,row.watch_time_minutes]);return data.items.length;},
    async replaceYoutubeRetention(data){if(!data.from_date||!data.to_date)return 0;await pool.query('DELETE FROM yt_video_retention WHERE from_date=$1 AND to_date=$2',[data.from_date,data.to_date]);for(const row of data.items)await pool.query(`INSERT INTO yt_video_retention(video_id,from_date,to_date,elapsed_ratio,audience_watch_ratio,relative_retention_performance) VALUES($1,$2,$3,$4,$5,$6)`,[row.video_id,data.from_date,data.to_date,row.elapsed_ratio,row.audience_watch_ratio,row.relative_retention_performance]);return data.items.length;},
    async youtubeSnapshotCandidates(){return (await pool.query(`SELECT v.video_id,v.published_at,ages.age_days FROM yt_videos v CROSS JOIN (VALUES(1),(7),(28),(90),(365)) AS ages(age_days) LEFT JOIN yt_video_snapshots s ON s.video_id=v.video_id AND s.age_days=ages.age_days WHERE v.published_at IS NOT NULL AND v.published_at::date+ages.age_days<=CURRENT_DATE AND s.video_id IS NULL ORDER BY v.published_at ASC`)).rows;},
    async upsertYoutubeSnapshots(snapshots){for(const item of snapshots)await pool.query(`INSERT INTO yt_video_snapshots(video_id,age_days,snapshot_date,metrics_json,complete) VALUES($1,$2,$3,$4,$5) ON CONFLICT(video_id,age_days) DO UPDATE SET snapshot_date=EXCLUDED.snapshot_date,metrics_json=EXCLUDED.metrics_json,complete=EXCLUDED.complete`,[item.video_id,item.age_days,item.snapshot_date,item.metrics,item.complete]);return snapshots.length;},
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
