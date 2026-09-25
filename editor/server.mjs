import http from 'node:http';
import { readFileSync, existsSync, realpathSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { checkPassword, passwordHash } from './store.mjs';
import { openPostgres } from './postgres.mjs';
import { aiSettings, encrypt } from './settings.mjs';
import { renderStory, renderHomepage } from './render.mjs';
import { sitemap, robots } from './seo.mjs';
import { homepageRedirect, retiredOverviewPaths } from '../public-page-routes.mjs';
import { authorizationUrl, exchange, inspect, ready as youtubeReady, seal, unseal, refresh, videos as youtubeVideos, dailyMetrics, videoDailyMetrics, reachMetrics, trafficSources, retention, snapshots as youtubeSnapshots } from './youtube.mjs';
import { authorizationUrl as googleLoginAuthorizationUrl, exchange as googleLoginExchange, identity as googleLoginIdentity, ready as googleLoginReady, tokenHash as authTokenHash } from './google-login.mjs';
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
const cockpitPolicy="default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' https://i.ytimg.com https://i9.ytimg.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";
if ((!secure || !origin.startsWith('https://')) && !(process.env.NODE_ENV==='development' && ['localhost','127.0.0.1'].includes(new URL(origin).hostname))) throw new Error('Öffentlicher Betrieb benötigt HTTPS-Origin und sichere Cookies.');
const attempts = new Map(), jobs = new Map(), oauthStates = new Map();
const dummyHash = passwordHash(randomBytes(32).toString('hex'));
async function syncYoutube(kind='automatic'){const connection=await db.cockpitConnection();if(!connection)return false;return db.recordYoutubeSync(connection.id,kind,async()=>{const accessToken=await refresh(unseal(connection));const channel=await inspect(accessToken);let reach=[];try{reach=await reachMetrics(accessToken);}catch(error){console.warn(`YouTube Reach-Export noch nicht verfügbar: ${error.message}`);}const [videos,metrics]=await Promise.all([youtubeVideos(channel,accessToken),dailyMetrics(accessToken,reach)]),videoIds=videos.map(video=>video.video_id);let written=(await db.upsertYoutubeVideos(connection.id,videos))+(await db.upsertYoutubeDailyMetrics(connection.id,metrics));let videoMetrics;try{videoMetrics=await videoDailyMetrics(videoIds,accessToken,reach);}catch(error){throw new Error(`VIDEO_DAILY_${error.message}`);}written+=await db.upsertYoutubeVideoDailyMetrics(videoMetrics);const candidates=await db.youtubeSnapshotCandidates();let snapshotRows;try{snapshotRows=await youtubeSnapshots(candidates,accessToken);}catch(error){throw new Error(`SNAPSHOTS_${error.message}`);}written+=await db.upsertYoutubeSnapshots(snapshotRows);const [traffic,retentionData]=await Promise.all([trafficSources(videoIds,accessToken),retention(videoIds,accessToken)]);written+=await db.replaceYoutubeTrafficSources(traffic);written+=await db.replaceYoutubeRetention(retentionData);return written;});}
const cookie = (token, age=28800) => `vv_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${age}${secure?'; Secure':''}`;
function fail(status, message) { const e = new Error(message); e.status=status; throw e; }
function validateAccount(b,passwordRequired=true){
  if(!/^[a-z0-9][a-z0-9_-]{2,39}$/.test(b.name||''))fail(400,'Benutzername: 3 bis 40 Zeichen, kleine Buchstaben, Zahlen, Bindestrich oder Unterstrich.');
  if(typeof b.displayName!=='string'||b.displayName.length<1||b.displayName.length>80)fail(400,'Bitte einen Anzeigenamen angeben.');
  if((passwordRequired||b.password)&& (typeof b.password!=='string'||b.password.length<12||b.password.length>128))fail(400,'Passwort: 12 bis 128 Zeichen.');
  if(b.role&&!['admin','editor'].includes(b.role))fail(400,'Ungültige Rolle.');
  if(b.googleEmail!==undefined&&b.googleEmail!==null&&b.googleEmail!==''&&(typeof b.googleEmail!=='string'||b.googleEmail.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.googleEmail)))fail(400,'Google-Adresse ist ungültig.');
}
function videoClassificationInput(value){
  const allowed={format:['longform','short','legacy_clip'],pillar:['van','explore','move','gear','stories'],audit_decision:['keep','repackage','do_not_pursue'],reuse_potential:['high','medium','low','none']},result={};
  for(const [key,options] of Object.entries(allowed)){const current=value[key];if(current!==null&&current!==undefined&&current!==''&&!options.includes(current))fail(400,`Ungültige Video-Klassifikation: ${key}.`);result[key]=current||null;}
  return result;
}
const contentStatuses=new Set(['idea','validated','briefed','production','scheduled','published','reviewed']);
const contextStatuses=new Set(['draft','approved','archived']);
const contextCategories=new Set(['Van / Hymer','Reisen','Outdoor','MTB','Kajak','Hund','Mission Paris']);
function text(value,max,label,required=false){if(value===undefined||value===null)value='';if(typeof value!=='string'||value.length>max||(required&&!value.trim()))fail(400,`Ungültiges Feld: ${label}.`);return value.trim();}
function date(value,label){if(value===undefined||value===null||value==='')return null;if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))fail(400,`Ungültiges Datum: ${label}.`);return value;}
function nullableId(value,label){if(value===undefined||value===null||value==='')return null;if(typeof value!=='string'||value.length>120)fail(400,`Ungültige Verknüpfung: ${label}.`);return value;}
function hours(value,label){if(value===undefined||value===null||value==='')return null;const parsed=Number(value);if(!Number.isFinite(parsed)||parsed<0||parsed>10000)fail(400,`Ungültige Stundenangabe: ${label}.`);return Math.round(parsed*100)/100;}
function contentInput(value,create=false){
  const plannedYear=Number(value.planned_year);if(!Number.isInteger(plannedYear)||plannedYear<2020||plannedYear>2100)fail(400,'Ungültiges Planjahr.');
  const slot=value.slot===''||value.slot===null||value.slot===undefined?null:Number(value.slot);if(slot!==null&&(!Number.isInteger(slot)||slot<1||slot>12))fail(400,'Ungültiger Jahres-Slot.');
  const status=text(value.status||'idea',20,'Status',true);if(!contentStatuses.has(status))fail(400,'Ungültiger Content-Status.');
  const format=text(value.format||'longform',40,'Format',true);
  return {planned_year:plannedYear,slot,title_working:text(value.title_working,180,'Arbeitstitel',true),format,pillar:text(value.pillar,80,'Pillar'),status,target_publish_date:date(value.target_publish_date,'Veröffentlichung'),youtube_video_id:nullableId(value.youtube_video_id,'Video'),brief:text(value.brief,12000,'Brief'),estimated_hours:hours(value.estimated_hours,'geschätzte Produktionszeit'),actual_hours:hours(value.actual_hours,'tatsächliche Produktionszeit'),owner:nullableId(value.owner,'Verantwortung')};
}
function contextInput(value){const category=text(value.category,80,'Kategorie',true);if(!contextCategories.has(category))fail(400,'Ungültige Context-Kategorie.');const status=text(value.status||'draft',20,'Status',true);if(!contextStatuses.has(status))fail(400,'Ungültiger Context-Status.');const source=text(value.source_url,1000,'Quelle');if(source&&(!/^https?:\/\//.test(source)))fail(400,'Quelle muss eine vollständige http(s)-Adresse sein.');return {category,title:text(value.title,180,'Titel',true),body:text(value.body,20000,'Inhalt',true),status,source_url:source||null,effective_from:date(value.effective_from,'gültig ab'),effective_to:date(value.effective_to,'gültig bis')};}
function limit(req,path){const key=path+':'+req.socket.remoteAddress;let count=attempts.get(key);if(!count||count.until<Date.now())count={n:0,until:Date.now()+900000};if(++count.n>10)fail(429,'Zu viele Versuche. Bitte in 15 Minuten erneut versuchen.');attempts.set(key,count);return key;}
async function sessionInfo(user,csrf){return {name:user.name,displayName:user.display_name||user.name,role:user.role,csrf,googleEmail:user.google_email||null,profileEmail:user.profile_email||null,signInProvider:user.google_provider==='google'?'google':'password',aiReady:false,editorialMode:'chat'};}
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
    if (/^\/(redaktion|cockpit|privat|benutzerverwaltung|editor|api)(\/|$)/.test(path) || path === '/vehicle-review.html') res.setHeader('X-Robots-Tag','noindex, nofollow');
    if ((req.method==='GET'||req.method==='HEAD') && (path==='/sitemap.xml'||path==='/robots.txt')) {
      res.writeHead(200,{'Content-Type':path==='/sitemap.xml'?'application/xml; charset=utf-8':'text/plain; charset=utf-8'});
      return res.end(req.method==='HEAD'?undefined:path==='/sitemap.xml'?sitemap():robots());
    }
    if ((req.method==='GET'||req.method==='HEAD') && path==='/index.html') {
      res.writeHead(301,{'Location':'/'+url.search}); return res.end();
    }
    if ((req.method==='GET'||req.method==='HEAD') && retiredOverviewPaths.has(path)) {
      res.writeHead(301,{'Location':'/'}); return res.end();
    }
    if (req.method==='GET' && ['/redaktion', '/redaktion/', '/editor/client.js','/editor/editor.css','/cockpit','/cockpit/','/editor/cockpit.js','/editor/cockpit.css','/privat','/privat/','/benutzerverwaltung','/benutzerverwaltung/','/editor/users.js','/editor/private.js','/editor/private.css','/editor/private-account.css','/editor/private-nav.js'].includes(path)) {
      const file=path==='/editor/client.js'?'client.js':path==='/editor/editor.css'?'editor.css':path==='/editor/cockpit.js'?'cockpit.js':path==='/editor/cockpit.css'?'cockpit.css':path==='/editor/users.js'?'users.js':path==='/editor/private.js'?'private.js':path==='/editor/private.css'?'private.css':path==='/editor/private-account.css'?'private-account.css':path==='/editor/private-nav.js'?'private-nav.js':path.startsWith('/cockpit')?'cockpit.html':path.startsWith('/privat')?'private.html':path.startsWith('/benutzerverwaltung')?'users.html':'index.html';
      if(path==='/cockpit'||path==='/cockpit/')res.setHeader('Content-Security-Policy',cockpitPolicy);
      let content=readFileSync(resolve(root,'editor',file));
      if(file==='index.html'||file==='cockpit.html')content=Buffer.from(content.toString().replace('</head>','<link rel="stylesheet" href="/editor/private-account.css"><script src="/editor/private-nav.js" defer></script></head>'));
      res.writeHead(200,{'Content-Type':file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':'text/html; charset=utf-8'}); return res.end(content);
    }
    if(path==='/healthz'&&req.method==='GET'){await db.health();return send(200,{status:'ok'});}
    if(req.method==='GET'||req.method==='HEAD'){
      const publicFiles=new Set(['index.html','styles.css','script.js','navigation.css','navigation.js','equipment-cards.css','equipment-pages.css','photo-viewer.css','photo-viewer.js','travel-stories.css','riverstar.css','riverstar-entwurf.css','kajak-hero.css','cube.html','scott-mountainbike.html','trek-gravelbike.html','woom-2.html','diamant-stadtraeder.html','kajak.html','vehicle.html','vehicle-review.html','vehicle-review.css','vehicle-review.js','vehicle-profile.css','norwegen-2018.html','sardinien-2019.html','italien-2021.html','favicon.ico','favicon-96x96.png','favicon-192x192.png','favicon-512x512.png','apple-touch-icon.png','site.webmanifest']);
      let relative;try{relative=decodeURIComponent(path).replace(/^\//,'')||'index.html';}catch{fail(400,'Ungültiger Pfad.');}
      if(/^assets\/(?:heroes\/originals|review|hero-selection)\//i.test(relative))fail(404,'Nicht gefunden.');
      const asset=/^assets\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+\.(png|jpe?g|webp|svg|gif|woff2)$/i.test(relative);
      if(publicFiles.has(relative)||/^[a-zA-Z][a-zA-Z0-9_-]*\.(css|js)$/.test(relative)||asset){
        if(/^(norwegen-2018|sardinien-2019|italien-2021)\.html$/.test(relative)){
          const story=await db.published(relative.replace('.html',''));
          if(story){res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self'; frame-ancestors 'none'; base-uri 'none'");res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});return res.end(req.method==='HEAD'?undefined:renderStory(story));}
        }
        const file=resolve(root,relative);
        if(!existsSync(file)||!realpathSync(file).startsWith(realpathSync(root)+ (process.platform==='win32'?'\\':'/')))fail(404,'Nicht gefunden.');
        const ext=relative.split('.').pop().toLowerCase();
        const types={html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',png:'image/png',jpg:'image/jpeg',jpeg:'image/jpeg',webp:'image/webp',svg:'image/svg+xml',gif:'image/gif',woff2:'font/woff2',ico:'image/x-icon',webmanifest:'application/manifest+json'};
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
      const activeUser=await db.user(authorization.name);if(!activeUser||!activeUser.enabled||activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen einen Kanal verbinden.');
      const tokenData=await exchange(url.searchParams.get('code')||'',authorization.codeVerifier);const channel=await inspect(tokenData.access_token);await db.saveCockpitConnection(channel,seal(tokenData.refresh_token),activeUser.name);await db.cockpitAudit(activeUser.name,'youtube.connected','yt_connection',channel.id,null,{scopes:['youtube.readonly','yt-analytics.readonly']});try{await syncYoutube();}catch{await db.cockpitAudit(activeUser.name,'youtube.initial_sync.failed','yt_connection',channel.id,null,{safe:true});}res.writeHead(303,{'Location':'/cockpit?youtube=connected'});return res.end();
    }
    if(path==='/anmelden'&&req.method==='GET'){const returnTo=url.searchParams.get('returnTo')==='/cockpit'?'/cockpit':'/redaktion';res.writeHead(303,{'Location':returnTo});return res.end();}
    if (!path.startsWith('/api/')) {
      const redirect = (req.method==='GET'||req.method==='HEAD') && homepageRedirect(path);
      if (redirect) { res.writeHead(redirect,{'Location':'/'}); return res.end(); }
      fail(404,'Nicht gefunden.');
    }
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
    if(path==='/api/auth/google/start'&&req.method==='GET'){
      if(!googleLoginReady())fail(503,'Die Google-Anmeldung wird noch vorbereitet. Bitte vorübergehend mit Benutzername und Passwort anmelden.');
      const requestedReturnTo=url.searchParams.get('returnTo'),returnTo=['/redaktion','/cockpit','/privat'].includes(requestedReturnTo)?requestedReturnTo:'/redaktion',state=randomBytes(32).toString('hex'),nonce=randomBytes(32).toString('hex'),codeVerifier=randomBytes(48).toString('base64url'),codeChallenge=createHash('sha256').update(codeVerifier).digest('base64url');
      await db.createGoogleLoginState(authTokenHash(state),codeVerifier,nonce,returnTo);
      return res.writeHead(303,{'Location':googleLoginAuthorizationUrl({state,nonce,codeChallenge})}).end();
    }
    if(path==='/api/auth/google/callback'&&req.method==='GET'){
      const state=url.searchParams.get('state')||'',authorization=state?await db.takeGoogleLoginState(authTokenHash(state)):null;
      if(!authorization)fail(403,'Die Google-Anmeldung konnte nicht zugeordnet werden. Bitte erneut beginnen.');
      if(url.searchParams.get('error'))fail(403,'Die Google-Anmeldung wurde nicht abgeschlossen.');
      try{
        const idToken=await googleLoginExchange(url.searchParams.get('code')||'',authorization.code_verifier),user=await db.googleUser(await googleLoginIdentity(idToken,authorization.nonce)),sessionToken=randomBytes(32).toString('hex'),csrf=randomBytes(32).toString('hex');
        await db.createSession(authTokenHash(sessionToken),user,csrf);await db.cockpitAudit(user.name,'auth.google.login','auth_session','google',null,{provider:'google'});
        return res.writeHead(303,{'Location':authorization.return_to,'Set-Cookie':cookie(sessionToken)}).end();
      }catch(error){
        await db.cockpitAudit(null,'auth.google.denied','auth_session','google',null,{reason:error.message==='GOOGLE_LOGIN_NOT_ALLOWED'?'not_allowed':'verification_failed'});throw error;
      }
    }
    let session=token?await db.session(authTokenHash(token)):null;
    if (path==='/api/login' && req.method==='POST') {
      const key=limit(req,'login');
      const b=await body(req), user=await db.user(String(b.name).toLowerCase());
      const valid=checkPassword(String(b.password||''),user?.hash||dummyHash);
      if (!user||!valid||!user.enabled) fail(401,'Benutzername oder Passwort stimmt nicht.');
      attempts.delete(key); const t=randomBytes(32).toString('hex'), csrf=randomBytes(32).toString('hex');
      if (token) await db.deleteSession(authTokenHash(token));
      await db.createSession(authTokenHash(t),user,csrf);await db.cockpitAudit(user.name,'auth.password.login','auth_session','password',null,{provider:'password'});
      return send(200,await sessionInfo(user,csrf),{'Set-Cookie':cookie(t)});
    }
    if (!session) fail(401,'Bitte anmelden.');
    const activeUser=session;
    if(!activeUser.enabled||activeUser.auth_version!==session.session_auth_version){if(token)await db.deleteSession(authTokenHash(token));fail(401,'Die Sitzung ist abgelaufen. Bitte neu anmelden.');}
    if (req.method!=='GET' && req.headers['x-csrf-token']!==session.csrf_token) fail(403,'Sitzung ungültig. Bitte neu anmelden.');
    if (path==='/api/session') return send(200,await sessionInfo(activeUser,session.csrf_token));
    if (path==='/api/logout'&&req.method==='POST') {if(token)await db.deleteSession(authTokenHash(token));await db.cockpitAudit(activeUser.name,'auth.logout','auth_session','logout',null,{provider:'vanventure'});return send(200,{}, {'Set-Cookie':cookie('',0)});}
    if(path==='/api/profile'&&req.method==='GET')return send(200,await sessionInfo(activeUser,session.csrf_token));
    if(path==='/api/profile'&&req.method==='PUT'){
      const b=await body(req),displayName=text(b.displayName,80,'Anzeigename',true),profileEmail=text(b.profileEmail,254,'Kontakt-E-Mail');
      if(profileEmail&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profileEmail))fail(400,'Kontakt-E-Mail ist ungültig.');
      await db.updateProfile(activeUser.name,displayName,profileEmail||null);await db.cockpitAudit(activeUser.name,'auth.profile.updated','user',activeUser.name,null,{display_name_changed:true,contact_email_changed:true});return send(200,{displayName,profileEmail:profileEmail||null});
    }
    if(path==='/api/cockpit/health'&&req.method==='GET'){
      const health=await db.cockpitHealth(),intervalHours=await cockpitSyncIntervalHours(),lastFinished=health.lastRun?.finished_at?new Date(health.lastRun.finished_at).getTime():0,stale=!!(health.connection&&intervalHours&&(!lastFinished||Date.now()-lastFinished>(intervalHours+2)*60*60*1000));
      return send(200,{status:health.connection&&(!health.lastRun||health.lastRun.status==='succeeded')&&!stale?'ok':'warning',phase:4,intervalHours,stale,connection:health.connection,lastRun:health.lastRun});
    }
    if(path==='/api/cockpit/overview'&&req.method==='GET'){
      const periodDays=Number(url.searchParams.get('days')||28);if(![28,90,365].includes(periodDays))fail(400,'Ungültiger Zeitraum.');
      await db.cockpitAudit(activeUser.name,'cockpit.overview.viewed','cockpit','phase-3',null,{role:activeUser.role});
      return send(200,await db.cockpitOverview(periodDays));
    }
    if(path==='/api/cockpit/videos'&&req.method==='GET')return send(200,{version:1,items:await db.cockpitVideos(url.searchParams.get('q')||'')});
    if(path==='/api/cockpit/audit/export'&&req.method==='GET'){
      const audit=await db.cockpitAuditExport();
      await db.cockpitAudit(activeUser.name,'cockpit.audit.exported','cockpit','channel-audit',null,{schema_version:audit.schema_version,video_count:audit.videos.length,as_of:audit.as_of});
      const stamp=(audit.generated_at||new Date().toISOString()).slice(0,10);
      return send(200,audit,{'Content-Disposition':`attachment; filename="vanventure-channel-audit-${stamp}.json"`});
    }
    const videoMatch=path.match(/^\/api\/cockpit\/videos\/([^/]+)(?:\/(snapshots))?$/);
    if(videoMatch&&req.method==='GET'){const videoId=decodeURIComponent(videoMatch[1]);if(videoMatch[2])return send(200,{version:1,items:await db.cockpitVideoSnapshots(videoId)});const video=await db.cockpitVideo(videoId);if(!video)fail(404,'Video nicht gefunden.');return send(200,{version:1,item:video});}
    if(videoMatch&&!videoMatch[2]&&req.method==='PUT'){
      if(!['admin','editor'].includes(activeUser.role))fail(403,'Keine Schreibberechtigung.');const videoId=decodeURIComponent(videoMatch[1]),item=videoClassificationInput(await body(req));const updated=await db.updateCockpitVideoClassification(videoId,item);if(!updated)fail(404,'Video nicht gefunden.');await db.cockpitAudit(activeUser.name,'video.classification.updated','yt_video',videoId,null,item);return send(200,{updated:true});
    }
    if(path==='/api/cockpit/sync-runs'&&req.method==='GET')return send(200,{version:1,items:await db.cockpitSyncRuns()});
    if(path==='/api/cockpit/sync'&&req.method==='POST'){
      if(activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen einen Datenabgleich starten.');if(!youtubeReady())fail(503,'Die private Google-Konfiguration ist noch nicht vollständig.');
      const written=await syncYoutube('manual');await db.cockpitAudit(activeUser.name,'youtube.sync.started','yt_connection',null,null,{kind:'manual',records_written:written||0});return send(200,{started:true,recordsWritten:written||0});
    }
    if(path==='/api/cockpit/sync-settings'&&req.method==='GET')return send(200,{intervalHours:await cockpitSyncIntervalHours()});
    if(path==='/api/cockpit/sync-settings'&&req.method==='PUT'){
      if(activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen den automatischen Abgleich einstellen.');const intervalHours=Number((await body(req)).intervalHours);if(![0,12,24].includes(intervalHours))fail(400,'Ungültiger Abgleichrhythmus.');await db.setSetting('cockpit_sync_interval_hours',String(intervalHours));await db.cockpitAudit(activeUser.name,'youtube.sync.schedule.updated','cockpit','sync-schedule',null,{intervalHours});return send(200,{intervalHours});
    }
    if(path==='/api/cockpit/insights'&&req.method==='GET')return send(200,{version:1,...await db.cockpitInsights()});
    if(path==='/api/cockpit/content'&&req.method==='GET'){
      const year=Number(url.searchParams.get('year')||new Date().getUTCFullYear());if(!Number.isInteger(year)||year<2020||year>2100)fail(400,'Ungültiges Planjahr.');
      await db.ensurePlannerYear(year,activeUser.name);return send(200,{version:1,year,items:await db.cockpitContent(year)});
    }
    if(path==='/api/cockpit/content'&&req.method==='POST'){
      if(!['admin','editor'].includes(activeUser.role))fail(403,'Keine Schreibberechtigung.');const item=contentInput(await body(req),true);if(item.youtube_video_id&&!(await db.cockpitVideo(item.youtube_video_id)))fail(400,'Das verknüpfte YouTube-Video wurde nicht gefunden.');const created=await db.createCockpitContent(item,activeUser.name);await db.cockpitAudit(activeUser.name,'content.created','content_item',String(created.id),null,{planned_year:item.planned_year,status:item.status});return send(201,{id:created.id});
    }
    const contentMatch=path.match(/^\/api\/cockpit\/content\/(\d+)$/);
    if(contentMatch&&req.method==='PUT'){
      if(!['admin','editor'].includes(activeUser.role))fail(403,'Keine Schreibberechtigung.');const item=contentInput(await body(req));if(item.youtube_video_id&&!(await db.cockpitVideo(item.youtube_video_id)))fail(400,'Das verknüpfte YouTube-Video wurde nicht gefunden.');const updated=await db.updateCockpitContent(contentMatch[1],item,activeUser.name);if(!updated)fail(404,'Plan-Eintrag nicht gefunden.');await db.cockpitAudit(activeUser.name,'content.updated','content_item',String(updated.id),null,{status:item.status});return send(200,{updated:true});
    }
    if(path==='/api/cockpit/context'&&req.method==='GET')return send(200,{version:1,items:await db.cockpitContext()});
    if(path==='/api/cockpit/context'&&req.method==='POST'){
      if(!['admin','editor'].includes(activeUser.role))fail(403,'Keine Schreibberechtigung.');const item=contextInput(await body(req));const created=await db.createCockpitContext(item,activeUser.name);await db.cockpitAudit(activeUser.name,'context.created','master_context',String(created.id),null,{category:item.category,status:item.status});return send(201,{id:created.id});
    }
    const contextMatch=path.match(/^\/api\/cockpit\/context\/(\d+)$/);
    if(contextMatch&&req.method==='PUT'){
      if(!['admin','editor'].includes(activeUser.role))fail(403,'Keine Schreibberechtigung.');const item=contextInput(await body(req));const updated=await db.updateCockpitContext(contextMatch[1],item,activeUser.name);if(!updated)fail(404,'Context-Eintrag nicht gefunden.');await db.cockpitAudit(activeUser.name,'context.updated','master_context',String(updated.id),null,{category:item.category,status:item.status});return send(200,{updated:true});
    }
    if(path==='/api/cockpit/youtube/connect'&&req.method==='POST'){
      if(activeUser.role!=='admin')fail(403,'Nur Administratoren dürfen einen YouTube-Kanal verbinden.');if(!youtubeReady())fail(503,'Die private Google-Konfiguration ist noch nicht vollständig.');
      const state=randomBytes(32).toString('hex'),codeVerifier=randomBytes(48).toString('base64url'),codeChallenge=createHash('sha256').update(codeVerifier).digest('base64url');oauthStates.set(state,{name:activeUser.name,codeVerifier,expires:Date.now()+600000});await db.cockpitAudit(activeUser.name,'youtube.authorization.started','yt_connection',process.env.YOUTUBE_CHANNEL_ID,null,{scopes:['youtube.readonly','yt-analytics.readonly']});return send(200,{url:authorizationUrl(state,codeChallenge)});
    }
    if(path==='/api/password'&&req.method==='POST'){
      limit(req,'password:'+activeUser.name);const b=await body(req);
      if(activeUser.google_provider==='google')fail(403,'Google-Konten verwalten ihr Passwort ausschließlich bei Google.');
      if(typeof b.currentPassword!=='string'||b.currentPassword.length>128||!checkPassword(b.currentPassword,activeUser.hash))fail(403,'Aktuelles Passwort stimmt nicht.');
      validateAccount({name:activeUser.name,displayName:activeUser.display_name||activeUser.name,password:b.password});
      await db.changePassword(activeUser.name,b.password);await db.cockpitAudit(activeUser.name,'auth.password.changed','user',activeUser.name,null,{provider:'password'});if(token)await db.deleteSession(authTokenHash(token));return send(200,{changed:true},{'Set-Cookie':cookie('',0)});
    }
    if(path==='/api/users'||path.startsWith('/api/users/')){
      if(activeUser.role!=='admin')fail(403,'Benutzerverwaltung ist nur für Administratoren verfügbar.');
      if(path==='/api/users'&&req.method==='GET')return send(200,await db.users());
      const b=await body(req);b.name=path==='/api/users'?String(b.name||'').toLowerCase():decodeURIComponent(path.slice('/api/users/'.length));b.googleEmail=b.googleEmail?String(b.googleEmail).trim().toLowerCase():null;validateAccount(b,path==='/api/users');
      if(!['admin','editor'].includes(b.role))fail(400,'Rolle fehlt.');
      if(path==='/api/users'&&req.method==='POST'){await db.createUser(b.name,b.displayName,b.password,b.role,b.googleEmail);await db.cockpitAudit(activeUser.name,'auth.user.created','user',b.name,null,{role:b.role,google_configured:!!b.googleEmail});return send(201,{created:true});}
      if(req.method==='PUT'){if(typeof b.enabled!=='boolean')fail(400,'Kontostatus fehlt.');await db.updateUser(b.name,b);await db.cockpitAudit(activeUser.name,'auth.user.updated','user',b.name,null,{role:b.role,enabled:b.enabled,google_configured:!!b.googleEmail});return send(200,{updated:true});}
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
    const known={CONFLICT:[409,'Der Text wurde inzwischen geändert. Bitte neu laden.'],SETUP_CLOSED:[409,'Die erste Einrichtung ist bereits abgeschlossen.'],LAST_ADMIN:[400,'Mindestens ein aktiver Administrator muss erhalten bleiben.'],NO_USER:[404,'Benutzer nicht gefunden.'],SYNC_RUNNING:[409,'Ein Abgleich läuft bereits. Bitte kurz warten.'],GOOGLE_EMAIL_IN_USE:[409,'Diese Google-Adresse ist bereits einem anderen Konto zugeordnet.'],GOOGLE_LOGIN_NOT_ALLOWED:[403,'Dieses Google-Konto ist nicht freigegeben. Bitte mit dem zugeordneten Konto anmelden oder die Redaktion kontaktieren.'],GOOGLE_LOGIN_TOKEN_EXCHANGE:[403,'Die Google-Anmeldung konnte nicht bestätigt werden. Bitte erneut versuchen.'],GOOGLE_LOGIN_ID_TOKEN:[403,'Die Google-Anmeldung konnte nicht bestätigt werden. Bitte erneut versuchen.'],GOOGLE_LOGIN_IDENTITY_INVALID:[403,'Die Google-Anmeldung konnte nicht bestätigt werden. Bitte erneut versuchen.']};
    const [status,message]=known[e.message]|| (e.code==='23505'?[409,'Dieser Benutzername ist bereits vergeben.']:[e.status||500,e.status?e.message:'Die Anfrage konnte nicht verarbeitet werden.']);send(status,{error:message});
  }
});
setInterval(()=>{for(const [k,v] of attempts) if(v.until<Date.now()) attempts.delete(k);for(const [k,v] of oauthStates)if(v.expires<Date.now())oauthStates.delete(k);db.cleanupAuth().catch(()=>{});},60000).unref();
async function cockpitSyncIntervalHours(){const value=Number(await db.setting('cockpit_sync_interval_hours')||'24');return [0,12,24].includes(value)?value:24;}
async function runScheduledCockpitSync(){
  if(process.env.COCKPIT_SYNC_ENABLED!=='true')return;
  const intervalHours=await cockpitSyncIntervalHours(),connection=await db.cockpitConnection();
  if(!intervalHours||!connection)return;
  if(connection.last_sync_at&&Date.now()-new Date(connection.last_sync_at).getTime()<intervalHours*60*60*1000)return;
  await syncYoutube('automatic');
}
if(process.env.COCKPIT_SYNC_ENABLED==='true'){runScheduledCockpitSync().catch(()=>{});setInterval(()=>{runScheduledCockpitSync().catch(()=>{});},60*60*1000).unref();}
server.listen(port,host,()=>console.log(`VanVenture Redaktion: ${origin}/redaktion`));
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{server.close(async()=>{await db.close();process.exit(0);});setTimeout(()=>process.exit(1),10000).unref();});
