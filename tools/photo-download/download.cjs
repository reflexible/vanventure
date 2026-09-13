const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const {stdin, stdout} = require('node:process');
const root = path.resolve(__dirname, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'video-analysis/photo-selection.json'), 'utf8'));
const trip = process.argv.find(a => a.startsWith('--reise='))?.split('=')[1];
const items = manifest.filter(p => !trip || p.trip === trip);
if (!items.length) {console.error('Keine Bilder für diese Reise.'); process.exit(1);}
for (const item of items) {
  const url = new URL(item.url);
  if (url.origin !== 'https://photos.google.com' || !url.pathname.includes('/photo/')) throw new Error('Ungültiger Fotolink');
}
if (process.argv.includes('--dry-run')) {
  console.log(items.map(p => `${p.trip}: ${p.date} · ${p.motif}`).join('\n'));
  process.exit(0);
}
async function main() {
  let playwright;
  try {playwright=require('playwright');}
  catch {playwright=require(path.resolve(path.dirname(process.execPath),'../node_modules/playwright'));}
  const {chromium} = playwright;
  const output = path.join(root, 'reisebilder-originale');
  fs.mkdirSync(output, {recursive:true});
  // Dedicated profile: does not read the user's existing browser profile or cookies.
  const context = await chromium.launchPersistentContext(path.join(__dirname, '.browser-profile'), {
    channel:'chrome', headless:false, acceptDownloads:true, viewport:{width:1280,height:900}
  });
  const page = context.pages()[0] || await context.newPage();
  const rl = readline.createInterface({input:stdin,output:stdout});
  const resultsPath = path.join(output, 'download-ergebnis.json');
  let results = fs.existsSync(resultsPath) ? JSON.parse(fs.readFileSync(resultsPath,'utf8')) : [];
  try {
    await page.goto('https://photos.google.com/', {waitUntil:'domcontentloaded'});
    console.log('Im geöffneten Chrome-Fenster bei Google Fotos anmelden. Falls Google die Anmeldung blockiert, die direkten Links in der Bildauswahl verwenden.');
    await rl.question('Wenn deine Fotos sichtbar sind: hier Enter drücken. ');
    for (const [index,item] of items.entries()) {
      const previous = results.find(p => p.url===item.url && p.status==='ok');
      if (previous?.file && fs.existsSync(previous.file) && fs.statSync(previous.file).size>0) {console.log('Bereits vorhanden:',item.motif);continue;}
      console.log(`${index+1}/${items.length}: ${item.motif}`);
      try {
        await page.goto(item.url,{waitUntil:'domcontentloaded'});
        await page.getByRole('button',{name:/^(Weitere Optionen|More options)$/}).click({timeout:25000});
        const [download] = await Promise.all([
          page.waitForEvent('download',{timeout:60000}),
          page.getByRole('menuitem',{name:/^(Herunterladen|Download)(\s|$)/}).click({timeout:10000})
        ]);
        if (await download.failure()) throw new Error(await download.failure());
        const dir = path.join(output,item.trip);fs.mkdirSync(dir,{recursive:true});
        const original = path.basename(download.suggestedFilename()).replace(/[<>:"/\\|?*\x00-\x1f]/g,'_');
        const file = path.join(dir, `${String(manifest.indexOf(item)+1).padStart(2,'0')}-${original}`);
        await download.saveAs(file);
        results = results.filter(p => p.url!==item.url);
        results.push({...item,original,file,status:'ok'});
      } catch (error) {
        console.error('Dieses Foto konnte nicht geladen werden:',error.message);
        results=results.filter(p=>p.url!==item.url);
        results.push({...item,status:'failed',error:error.message});
      }
      fs.writeFileSync(resultsPath,JSON.stringify(results,null,2));
    }
    console.log('Fertig. Bilder und Ergebnisliste:',output);
    if(items.some(item=>!results.some(p=>p.url===item.url&&p.status==='ok')))process.exitCode=1;
  } finally {rl.close();await context.close();}
}
main().catch(error=>{console.error(error.message);process.exitCode=1;});
