import http from 'node:http';
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { checkPassword, passwordHash } from './store.mjs';
import { openPostgres } from './postgres.mjs';
import { aiSettings, encrypt } from './settings.mjs';
import { renderStory, renderHomepage } from './render.mjs';
import { sitemap, robots } from './seo.mjs';
import { authorizationUrl, exchange, inspect, ready as youtubeReady, seal, unseal, refresh, videos as youtubeVideos, dailyMetrics, videoDailyMetrics, snapshots as youtubeSnapshots } from './youtube.mjs';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (!process.env.DATABASE_URL && !process.env.PGHOST) throw new Error('PostgreSQL fehlt. Bitte Docker Compose starten oder PGHOST konfigurieren.');
const db = await openPostgres();
const seededStories=JSON.parse(readFileSync(resolve(root,'travel-stories.json'),'utf8'));
for (const story of seededStories) {
  await db.seed(story);
}
await db.migrateStory('norwegen-2018','migration:norway-flam-order:2026-09-17','Im Lærdalstunnel führt die Straße rund 24,5 Kilometer durch den Berg',seededStories.find(s=>s.slug==='norwegen-2018'));
const port = Number(process.env.PORT || 8787);
const origin = process.env.EDITOR_ORIGIN || `http://127.0.0.1:${port}`;
const secure = process.env.EDITOR_SECURE_COOKIE === 'true';
const host = process.env.EDITOR_HOST || '127.0.0.1';
if ((!secure || !origin.startsWith('https://')) && !(process.env.NODE_ENV==='development' && ['localhost','127.0.0.1'].includes(new URL(origin).hostname))) throw new Error('Öffentlicher Betrieb benötigt HTTPS-Origin und sichere Cookies.');
const sessions = new Map(), attempts = new Map(), jobs = new Map(), oauthStates = new Map();
const dummyHash = passwordHash(randomBytes(32).toString('hex'));
async function syncYoutube(){const connection=await db.cockpitConnection();if(!connection)return false;return db.recordYoutubeSync(connection.id,'automatic',async()=>{const accessToken=await refresh(unseal(connection));const channel=await inspect(accessToken);const [videos,metrics]=await Promise.all([youtubeVideos(channel,accessToken),dailyMetrics(accessToken)]);let written=(await db.upsertYoutubeVideos(connection.id,videos))+(await db.upsertYoutubeDailyMetrics(connection.id,metrics));let videoMetrics;try{videoMetrics=await videoDailyMetrics(videos.map(video=>video.video_id),accessToken);}catch(error){throw new Error(`VIDEO_DAILY_${error.message}`);}written+=await db.upsertYoutubeVideoDailyMetrics(videoMetrics);const candidates=await db.youtubeSnapshotCandidates();let snapshotRows;try{snapshotRows=await youtubeSnapshots(candidates,accessToken);}catch(error){throw new Error(`SNAPSHOTS_${error.message}`);}return written+(await db.upsertYoutubeSnapshots(snapshotRows));});}
const cookie = (token, age=28800) => `vv_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secure?'; Secure':''}`;
function fail(status, message) { const e = new Error(message); e.status=status; throw e; }
function validateAccount(b,passwordRequired=true){
  if(!/^[a-z0-9][a-z0-9_-]{2,39}$/.test(b.name||''))fail(400,'Benutzername: 3 bis 40 Zeichen, kleine Buchstaben, Zahlen, Bindestrich oder Unterstrich.');
  if(typeof b.displayName!=='string'||b.displayName.length<1||b.displayName.length>80)fail(400,'Bitte einen Anzeigenamen angeben.');
  if((passwordRequired||b.password)&& (typeof b.password!=='string'||b.password.length<12||b.password.length>128))fail(400,'Passwort: 12 bis 128 Zeichen.');
  if(b.role&&!['admin','editor'].includes(b.role))fail(400,'Ungültige Rolle.');
}
function limit(req,path){const key=path+':'+req.socket.remoteAddress;let count=attempts.get(key);if(!count||count.until<Date.now())count={n:0,until:Date.now()+900000};if(++count.n>10)fail(429,'Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.');attempts.set(key,count);return key;}
async function sessionInfo(user,csrf){return {name:user.name,displayName:user.display_name||user.name,role:user.role,csrf,aiReady:false,editorialMode:'chat'};}
async function draft(slug) { const row=await db.draft(slug); if (!row) fail(404,'Reise nicht gefunden.'); return row; }
function validate(data, original) {
  if (!data || !data.story || !data.notes) fail(400,'Ungültiger Entwurf.');
  for (const key of ['title','subtitle','meta','lead']) if (!Array.isArray(data.story[key]) || data.story[key].length!==2 || data.story[key].some(v=>typeof v!=='string'||v.length>20000)) fail(400,'Ungültiger Text.');
  if (!Array.isArray(data.story.chapters)|| !data.story.chapters.length || data.story.chapters.length>30) fail(400,'Ungültige Kapitel.');
  for (const c of data.story.chapters) {
    if (!Array.isArray(c.title)||c.title.length!==2||c.title.some(t=>typeof t!=='string')||!Array.isArray(c.paragraphs)||c.paragraphs.length>40||c.paragraphs.some(p=>!Array.isArray(p)||p.length!==2||p.some(t=>typeof t!=='string'))) fail(400,'Ungültige Kapiteltexte.');
  }
  for (const k of ['facts','highlights','keywords']) if (typeof data.notes[k]!=='string'||data.notes[k].length>20000) fail(400,'Ungültige Notizen.');
  if(!Array.isArray(data.notes.itinerary)||data.notes.itinerary.length>150)fail(400,'Ungültige Etappenliste.');
  for(const stop of data.notes.itinerary){
    if(!stop||typeof stop!=='object'||typeof stop.date!=='string'||stop.date.length>40||typeof stop.place!=='string'||!stop.place.trim()||stop.place.length>160||typeof stop.details!=='string'||stop.details.length>2000)fail(400,'Bitte jede Etappe mit einem Ort angeben.');
    for(const key of ['lat','lon'])if(stop[key]!==''&&stop[key]!==null&&stop[key]!==undefined&&(!Number.isFinite(Number(stop[key]))||(key==='lat'&&Math.abs(Number(stop[key]))>90)||(key==='lon'&&Math.abs(Number(stop[key]))>180)))fail(400,'Ungültige Kartenkoordinaten.');
  }
  for (const k of ['slug','country','year','videos']) data.story[k]=original.story[k];
}
async function body(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) fail(415,'JSON erforderlich.');
  let text=''; for await (const chunk of req) { text+=chunk; if (Buffer.byteLength(text)>250000) fail(413,'Eingabe zu groß.'); }
  try { return JSON.parse(text); } catch { fail(400,'Ungültige Eingabe.'); }
}
const server=http.createServer(async (req,res)=>{
  res.setHeader('Cache-Control','no-store'); res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','same-origin');
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  const send=(status,data,headers={})=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8',...headers});res.end(JSON.stringify(data));};
  try {
    const url=new URL(req.url,origin), path=url.pathname;
    if (/^\/(redaktion|cockpit|editor|api)(\/|$)/.test(path) || path === '/vehicle-review.html') res.setHeader('X-Robots-Tag','noindex, nofollow');
    if ((req.method==='GET'||req.method==='HEAD') && (path==='/sitemap.xml'||path==='/robots.txt')) {
      res.writeHead(200,{'Content-Type':path==='/sitemap.xml'?'application/xml; charset=utf-8':'text/plain; charset=utf-8'});
      return res.end(req.method==='HEAD'?undefined:path==='/sitemap.xml'?sitemap():robots());
    }
    if ((req.method==='GET'||req.method==='HEAD') && path==='/index.html') {
      res.writeHead(301,{'Location':'/'+url.search}); return res.end();
    }
    if (req.method==='GET' && ['/redaktion', '/redaktion/', '/editor/client.js','/editor/editor.css','/cockpit','/cockpit/','/editor/cockpit.js','/editor/cockpit.css'].includes(path)) {
      const file=path==='/editor/client.js'?'client.js':path==='/editor/editor.css'?'editor.css':path==='/editor/cockpit.js'?'cockpit.js':path==='/editor/cockpit.css'?'cockpit.css':path.startsWith('/cockpit')?'cockpit.html':'index.html';
      res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8'}); return res.end(readFileSync(resolve(root,'editor',file)));
    }
    if(path==='/healthz'&&req.method==='GET'){await db.health();return send(200,{status:'ok'});}
    if(req.method==='GET'||req.method==='HEAD'){
      const publicFiles=new Set(['index.html','styles.css','script.js','navigation.css','navigation.js','equipment-cards.css','photo-viewer.css','photo-viewer.js','travel-stories.css','riverstar.css','riverstar-entwurf.css','bike.html','kajak.html','vehicle.html','vehicle-review.html','vehicle-review.css','vehicle-review.js','vehicle-profile.css','norwegen-2018.html','sardinien-2019.html','italien-2021.html']);
      let relative;try{relative=decodeURIComponent(path).replace(/^\//,'')||'index.html';}catch{fail(400,'Ungültiger Pfad.');}
      const asset=/^assets\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.(png|jpe?g|webp|svg|gif|woff2)$/i.test(relative);
      if(publicFiles.has(relative)||/^[a-zA-Z][a-zA-Z0-9_-]*\.(css|js)$/.test(relative)||asset){
        if(/^(norwegen-2018|sardinien-2019|italien-2021)\.html$/.test(relative)){
          const story=await db.published(relative.replace('.html',''));
          if(story){res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; frame-ancestors 'none'; base-uri 'none'");res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(req.method==='HEAD'?undefined:renderStory(story));}
        }
        const file=resolve(root,relative);
        if(!existsSync(file)||!realpathSync(file).startsWith(realpathSync(root)+ (process.platform==='win32'?'\\':'/')))fail(404,'Nicht gefunden.');
        const ext=relative.split('.').pop().toLowerCase();
        const types={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',svg:'image/svg+xml',gif:'image/gif',woff2:'font/woff2'};
        res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; frame-src https://www.youtube-nocookie.com https://www.youtube.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
        let content=relative==='index.html'?renderHomepage(readFileSync(file,'utf8'),await db.allPublished()):readFileSync(file);
        if(ext==='html')content=String(content).replaceAll('href="riverstar-entwurf.html"','href="kajak.html"');
        if(relative==='index.html'&&!content.includes('href="/redaktion"'))content=content.replace('<footer>','<footer><a href="/redaktion" data-de="Redaktion · Anmelden" data-en="Editorial · Sign in">Redaktion · Anmelden</a>');
        res.writeHead(200,{'Content-Type':types[ext]||'application/octet-stream'});return res.end(req.method==='HEAD'?undefined:content);
      }
    }
    if (path==='/api/cockpit/youtube/callback'&&req.method==='GET') {
      const state=url.searchParams.get('state')||'',authorization=oauthStates.get(state);
      if(!authorization||authorization.expires<Date.now())fail(403,'Die Google-Verbindung konnte nicht zugeordnet werden. Bitte erneut im Cockpit beginnen.');
      oauthStates.delete(state);
      if(url.searchParams.get('error'))fail(400,'Die Google-Berechtigung wurde nicht erteilt.');
      const activeUser=await db.user(authorization.name);if(!activeUser||activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen einen Kanal verbinden.');
      const tokenData=await exchange(url.searchParams.get('code')||'');const channel=await inspect(tokenData.access_token);await db.saveCockpitConnection(channel,seal(tokenData.refresh_token),activeUser.name);await db.cockpitAudit(activeUser.name,'youtube.connected','yt_connection',channel.id,null,{scopes:['youtube.readonly','yt-analytics.readonly']});try{await syncYoutube();}catch{await db.cockpitAudit(activeUser.name,'youtube.initial_sync.failed','yt_connection',channel.id,null,{safe:true});}res.writeHead(303,{'Location':'/cockpit?youtube=connected'});return res.end();
    }
    if (!path.startsWith('/api/')) fail(404,'Nicht gefunden.');
    if (req.method!=='GET' && req.headers.origin!==origin) fail(403,'Anfrage nicht erlaubt.');
    if(path==='/api/setup'&&req.method==='GET')return send(200,{available:!(await db.hasUsers())});
    if(path==='/api/setup'&&req.method==='POST'){
      const attemptKey=limit(req,'setup');
      if(await db.hasUsers())fail(409,'Die erste Einrichtung ist bereits abgeschlossen.');
      const b=await body(req),expected=process.env.EDITOR_SETUP_TOKEN;
      if(!expected||typeof b.setupToken!=='string'||Buffer.byteLength(b.setupToken)!==Buffer.byteLength(expected)||!timingSafeEqual(Buffer.from(b.setupToken),Buffer.from(expected)))fail(403,'Einrichtungscode stimmt nicht.');
      b.name=String(b.name||'').toLowerCase();validateAccount(b);
      await db.bootstrap(b.name,b.displayName,b.password);attempts.delete(attemptKey);return send(201,{created:true});
    }
    const token=req.headers.cookie?.match(/(?:^|;\s*)vv_session=([a-f0-9]+)/)?.[1];
    let session=sessions.get(token); if (session && session.expires<Date.now()) { sessions.delete(token);session=null; }
    if (path==='/api/login' && req.method==='POST') {
      const key=limit(req,'login');
      const b=await body(req), user=await db.user(String(b.name).toLowerCase());
      const valid=checkPassword(String(b.password||''),user?.hash||dummyHash);
      if (!user||!valid||!user.enabled) fail(401,'Benutzername oder Passwort stimmt nicht.');
      attempts.delete(key); const t=randomBytes(32).toString('hex'), csrf=randomBytes(32).toString('hex');
      if (token) sessions.delete(token);
      sessions.set(t,{name:user.name,version:user.auth_version,csrf,expires:Date.now()+28800000});
      return send(200,await sessionInfo(user,csrf),{'Set-Cookie':cookie(t)});
    }
    if (!session) fail(401,'Bitte anmelden.');
    const activeUser=await db.user(session.name);
    if(!activeUser||!activeUser.enabled||activeUser.auth_version!==session.version){sessions.delete(token);fail(401,'Die Sitzung ist abgelaufen. Bitte neu anmelden.');}
    if (req.method!=='GET' && req.headers['x-csrf-token']!==session.csrf) fail(403,'Sitzung ungültig. Bitte neu anmelden.');
    if (path==='/api/session') return send(200,await sessionInfo(activeUser,session.csrf));
    if (path==='/api/logout'&&req.method==='POST') {sessions.delete(token);return send(200,{}, {'Set-Cookie':cookie('',0)});}
    if(path==='/api/cockpit/health'&&req.method==='GET')return send(200,{status:'ok',phase:1});
    if(path==='/api/cockpit/overview'&&req.method==='GET'){
      await db.cockpitAudit(activeUser.name,'cockpit.overview.viewed','cockpit','phase-1',null,{role:activeUser.role});
      return send(200,await db.cockpitOverview());
    }
    if(path==='/api/cockpit/youtube/connect'&&req.method==='POST'){
      if(activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen einen YouTube-Kanal verbinden.');if(!youtubeReady())fail(503,'Die private Google-Konfiguration ist noch nicht vollständig.');
      const state=randomBytes(32).toString('hex');oauthStates.set(state,{name:activeUser.name,expires:Date.now()+600000});await db.cockpitAudit(activeUser.name,'youtube.authorization.started','yt_connection',process.env.YOUTUBE_CHANNEL_ID,null,{scopes:['youtube.readonly','yt-analytics.readonly']});return send(200,{url:authorizationUrl(state)});
    }
    if(path==='/api/password'&&req.method==='POST'){
      limit(req,'password:'+activeUser.name);const b=await body(req);
      if(typeof b.currentPassword!=='string'||b.currentPassword.length>128||!checkPassword(b.currentPassword,activeUser.hash))fail(403,'Aktuelles Passwort stimmt nicht.');
      validateAccount({name:activeUser.name,displayName:activeUser.display_name||activeUser.name,password:b.password});
      await db.changePassword(activeUser.name,b.password);sessions.delete(token);return send(200,{changed:true},{'Set-Cookie':cookie('',0)});
    }
    if(path==='/api/users'||path.startsWith('/api/users/')){
      if(activeUser.role!=='admin')fail(403,'Benutzerverwaltung ist nur für Administratoren verfügbar.');
      if(path==='/api/users'&&req.method==='GET')return send(200,await db.users());
      const b=await body(req);b.name=path==='/api/users'?String(b.name||'').toLowerCase():decodeURIComponent(path.slice('/api/users/'.length));validateAccount(b,path==='/api/users');
      if(!['admin','editor'].includes(b.role))fail(400,'Rolle fehlt.');
      if(path==='/api/users'&&req.method==='POST'){await db.createUser(b.name,b.displayName,b.password,b.role);return send(201,{created:true});}
      if(req.method==='PUT'){if(typeof b.enabled!=='boolean')fail(400,'Kontostatus fehlt.');await db.updateUser(b.name,b);return send(200,{updated:true});}
      fail(405,'Methode nicht erlaubt.');
    }
    if(path==='/api/settings'){
      if(activeUser.role!=='admin')fail(403,'Einstellungen sind nur für Administratoren verfügbar.');
      if(req.method==='GET'){const config=await aiSettings(db);return send(200,{model:config.model,keyConfigured:!!config.apiKey});}
      if(req.method==='PUT'){
        const b=await body(req);if(typeof b.model!=='string'||!/^[a-zA-Z0-9._-]{1,100}$/.test(b.model))fail(400,'Ungültiger Modellname.');
        if(b.apiKey!==undefined){if(typeof b.apiKey!=='string'||b.apiKey.length<20||b.apiKey.length>512)fail(400,'Ungültiger API-Schlüssel.');await db.setSetting('openai_key',encrypt(b.apiKey));}
        await db.setSetting('openai_model',b.model);return send(200,{saved:true});
      }fail(405,'Methode nicht erlaubt.');
    }
    if (path==='/api/stories'&&req.method==='GET') return send(200,await db.list());
    if (path.startsWith('/api/jobs/')&&req.method==='GET') {
      const job=jobs.get(path.split('/')[3]);if (!job||job.author!==session.name) fail(404,'Entwurf nicht gefunden.');return send(200,job);
    }
    const match=path.match(/^\/api\/stories\/([a-z0-9-]+)(?:\/(generate|export|preview|publish|route\.geojson))?$/);if (!match) fail(404,'Nicht gefunden.');
    const [,slug,action]=match, current=await draft(slug);
    if (req.method==='GET'&&!action) return send(200,current);
    if (req.method==='GET'&&action==='export') return send(200,current.story,{'Content-Disposition':`attachment; filename="${slug}-entwurf.json"`});
    if(req.method==='GET'&&action==='route.geojson'){
      const stops=current.notes.itinerary||[],located=stops.filter(s=>s.lat!==''&&s.lon!==''&&Number.isFinite(Number(s.lat))&&Number.isFinite(Number(s.lon)));
      const features=located.map((s,i)=>({type:'Feature',properties:{order:i+1,date:s.date,place:s.place,details:s.details},geometry:{type:'Point',coordinates:[Number(s.lon),Number(s.lat)]}}));
      if(located.length>1)features.unshift({type:'Feature',properties:{name:current.story.title[0]},geometry:{type:'LineString',coordinates:located.map(s=>[Number(s.lon),Number(s.lat)])}});
      return send(200,{type:'FeatureCollection',features},{'Content-Disposition':`attachment; filename="${slug}-route.geojson"`,'Content-Type':'application/geo+json; charset=utf-8'});
    }
    if(req.method==='GET'&&action==='preview'){res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; frame-ancestors 'none'; base-uri 'none'");res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(renderStory(current.story,true));}
    if(req.method==='POST'&&action==='publish'){if(activeUser.role!=='admin')fail(403,'Freigaben sind nur für Administratoren verfügbar.');const b=await body(req);await db.publish(slug,b.revision,activeUser.name);return send(200,{published:true});}
    if (req.method==='PUT'&&!action) {
      const b=await body(req);validate(b,current);
      const revision=await db.save(slug,{story:b.story,notes:b.notes},b.revision,session.name);return send(200,{revision});
    }
    if (req.method==='POST'&&action==='generate') {
      fail(503,'Die Überarbeitung erfolgt jetzt im Codex-Chat. Bitte Texte und Änderungswünsche speichern und dort die Überarbeitung beauftragen.');
    }
    fail(405,'Methode nicht erlaubt.');
  } catch(e) {
    const known={CONFLICT:[409,'Der Text wurde inzwischen geändert. Bitte neu laden.'],SETUP_CLOSED:[409,'Die erste Einrichtung ist bereits abgeschlossen.'],LAST_ADMIN:[400,'Mindestens ein aktiver Administrator muss erhalten bleiben.'],NO_USER:[404,'Benutzer nicht gefunden.']};
    const [status,message]=known[e.message]|| (e.code==='23505'?[409,'Dieser Benutzername ist bereits vergeben.']:[e.status||500,e.status?e.message:'Die Anfrage konnte nicht verarbeitet werden.']);send(status,{error:message});
  }
});
setInterval(()=>{for(const [k,v] of sessions) if(v.expires<Date.now()) sessions.delete(k);for(const [k,v] of attempts) if(v.until<Date.now()) attempts.delete(k);for(const [k,v] of oauthStates)if(v.expires<Date.now())oauthStates.delete(k);},60000).unref();
if(process.env.COCKPIT_SYNC_ENABLED==='true'){syncYoutube().catch(()=>{});setInterval(()=>{syncYoutube().catch(()=>{});},24*60*60*1000).unref();}
server.listen(port,host,()=>console.log(`VanVenture Redaktion: ${origin}/redaktion`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{server.close(async()=>{await db.close();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();});
