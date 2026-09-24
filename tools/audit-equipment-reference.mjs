/** Read-only local Kajak/Scott hero comparison; outputs only review evidence. */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(path.resolve(path.dirname(process.execPath), '../node_modules/playwright'))); }
const output = path.resolve('review/scott-kajak-reference-2026-09-24');
const origin = process.env.VANVENTURE_PREVIEW_ORIGIN || 'http://127.0.0.1:8788';
const browser = await chromium.launch({headless:true,executablePath:process.env.VANVENTURE_CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const records = [];
await mkdir(output,{recursive:true});
try {
  for (const [name,width,height] of [['desktop',1440,900],['tablet',768,1024],['layout-boundary',740,900],['phone-portrait',390,844],['phone-landscape',844,390]]) {
    for (const route of ['kajak.html','scott-mountainbike.html']) {
      const page = await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
      const response = await page.goto(`${origin}/${route}`,{waitUntil:'networkidle'});
      const result = await page.evaluate(() => {
        const hero = document.querySelector('main > .kayak-page-hero');
        const copy = hero?.querySelector('.kayak-hero-copy');
        const img = hero?.querySelector('img');
        const story = document.querySelector('.detail-story-pair');
        const storyFigure = story?.querySelector('figure');
        const introHeading = document.querySelector('main > .intro .intro-label h2');
        const introLead = document.querySelector('main > .intro .lead p:first-child');
        const storyCopy = story?.querySelector('.scott-story-copy') || story?.querySelector(':scope > div');
        const cardTitle = document.querySelector('main > .benefits .cards h3');
        const cardEyebrow = document.querySelector('main > .benefits > .eyebrow');
        const editorialLinks = [...document.querySelectorAll('main > .intro .lead a, main .gear-story .gear-links a, main .detail-story-pair > div > a')].map(link => {
          const style = getComputedStyle(link);
          return {color:style.color,parentColor:getComputedStyle(link.parentElement).color,
            fontSize:style.fontSize,textDecorationLine:style.textDecorationLine,
            textUnderlineOffset:style.textUnderlineOffset};
        });
        const editorialPhotos = [...document.querySelectorAll('.gear-story figure img')].map(image => {
          const rect = image.getBoundingClientRect();
          const section = image.closest('section').getBoundingClientRect();
          const style = getComputedStyle(image);
          return {width:Math.round(rect.width),height:Math.round(rect.height),
            side:rect.left+rect.width/2<section.left+section.width/2?'left':'right',
            objectFit:style.objectFit,
            crop:image.closest('section').classList.contains('detail-wide-crop'),
            panorama:image.closest('section').classList.contains('detail-panorama-crop'),
            fullImage:image.closest('a')?.getAttribute('href')===image.getAttribute('src')};
        });
        const bounds = element => {
          const r = element.getBoundingClientRect();
          return {top:Math.round(r.top),bottom:Math.round(r.bottom),height:Math.round(r.height)};
        };
        return {hero:hero&&bounds(hero),copy:copy&&bounds(copy),heroBoxSizing:hero&&getComputedStyle(hero).boxSizing,
          introHeadingTop:introHeading&&Math.round(introHeading.getBoundingClientRect().top),
          introLeadTop:introLead&&Math.round(introLead.getBoundingClientRect().top),
          introLeadLeft:introLead&&Math.round(introLead.getBoundingClientRect().left),
          storyCopyLeft:storyCopy&&Math.round(storyCopy.getBoundingClientRect().left),
          cardTitleFontSize:cardTitle&&getComputedStyle(cardTitle).fontSize,
          cardTitleLineHeight:cardTitle&&getComputedStyle(cardTitle).lineHeight,
          cardEyebrowFontSize:cardEyebrow&&getComputedStyle(cardEyebrow).fontSize,
          editorialLinks,
          storyDisplay:story&&getComputedStyle(story).display,
          storyFigureOrder:storyFigure&&getComputedStyle(storyFigure).order,
          editorialPhotos,
          imageLoaded:img?.complete&&img.naturalWidth>0,
          overflow:document.documentElement.scrollWidth>innerWidth+2,
          copyInsideHero:hero&&copy&&copy.getBoundingClientRect().bottom<=hero.getBoundingClientRect().bottom+1};
      });
      await page.screenshot({path:path.join(output,`${route.replace('.html','')}-${name}.png`)});
      if (name==='desktop'||name==='phone-portrait') {
        const positions = name==='desktop'
          ? [['first-section',900],['middle',1800],['later',3000],['last-story',4100],['gallery',5400]]
          : [['first-section',650],['middle',1650],['last-story',3750],['gallery',5300]];
        for (const [label,position] of positions) {
          if (label==='gallery') {
            await page.evaluate(() => {
              const gallery = document.querySelector('main [data-photo-gallery]');
              scrollTo(0, gallery.getBoundingClientRect().top + scrollY);
            });
          } else {
            await page.evaluate(y => scrollTo(0,y),position);
          }
          await page.waitForTimeout(label==='gallery'?850:120);
          await page.screenshot({path:path.join(output,`${route.replace('.html','')}-${name}-${label}.png`)});
        }
      }
      if (route==='scott-mountainbike.html' && (name==='desktop'||name==='phone-portrait')) {
        result.viewers=[];
        const controls=page.locator('.detail-wide-crop .photo-link');
        for(let index=0;index<await controls.count();index++){
          await controls.nth(index).click();
          await page.waitForFunction(() => {
            const image = document.querySelector('#site-photo-viewer .site-photo-stage img');
            return image?.complete && image.naturalWidth>0;
          });
          result.viewers.push(await page.locator('#site-photo-viewer .site-photo-stage img').evaluate(image => ({
            loaded:image.complete && image.naturalWidth>0,
            objectFit:getComputedStyle(image).objectFit,
            src:new URL(image.currentSrc).pathname,
            naturalRatio:image.naturalWidth/image.naturalHeight
          })));
          await page.locator('#site-photo-viewer .site-photo-close').click();
        }
      }
      records.push({route,name,width,height,status:response?.status(),...result});
      await page.close();
    }
  }
} finally {await browser.close();}
await writeFile(path.join(output,'audit.json'),JSON.stringify(records,null,2));
const failed = records.filter(record => record.status!==200 || !record.imageLoaded || record.overflow || !record.copyInsideHero || record.heroBoxSizing!=='border-box' || record.storyDisplay!==(record.width<=720?'flex':'grid') || (record.width<=720 && record.storyFigureOrder!=='-1'));
for (const record of records) {
  if (!record.editorialLinks?.length || record.editorialLinks.some(link =>
      link.color!==link.parentColor || link.fontSize!=='14px' ||
      link.textDecorationLine!=='underline' || link.textUnderlineOffset!=='5px')) {
    failed.push({route:record.route,name:record.name,reason:'Editorial text links differ from shared Kajak style',links:record.editorialLinks});
  }
}
const scottDesktop = records.find(record=>record.route==='scott-mountainbike.html'&&record.name==='desktop');
const scottPhone = records.find(record=>record.route==='scott-mountainbike.html'&&record.name==='phone-portrait');
for (const record of [scottDesktop,scottPhone].filter(Boolean)) {
  const expected=['/assets/bikes/scott-wiesenpause-2019-v1.webp',
    '/assets/bikes/scott-baumtour-2022-v1.webp',
    '/assets/bikes/scott-leogang-trail-2020-v1.webp'];
  if (record.viewers?.length!==expected.length || record.viewers.some((viewer,index)=>
      !viewer.loaded || viewer.objectFit!=='contain' || viewer.src!==expected[index] ||
      Math.abs(viewer.naturalRatio-4/3)>.02)) {
    failed.push({reason:`Cropped Scott thumbnails must open complete original web images at ${record.name}`,viewers:record.viewers});
  }
}
for (const record of [scottDesktop, scottPhone].filter(Boolean)) {
  const photos = record.editorialPhotos;
  const widths = photos.map(photo=>photo.width);
  if (photos.length!==5 || photos.some(photo=>!photo.fullImage) ||
      photos.map(photo=>photo.crop).join(',')!=='true,false,false,true,true' ||
      photos.map(photo=>photo.panorama).join(',')!=='true,false,false,false,true' ||
      photos.some(photo=>photo.objectFit!==(photo.crop?'cover':'contain')) ||
      photos.some(photo=>Math.abs(photo.width/photo.height-(photo.panorama?2:photo.crop?3/2:4/3))>.02) ||
      Math.max(...widths)-Math.min(...widths)>2 ||
      (record.name==='desktop' && photos.map(photo=>photo.side).join(',')!=='left,right,left,right,left')) {
    failed.push({reason:`Scott editorial image rhythm/size differs at ${record.name}`,photos});
  }
}
for (const name of ['desktop', 'tablet', 'layout-boundary']) {
  const pair = records.filter(record => record.name === name);
  if (pair.length !== 2 || Math.abs(pair[0].hero.height - pair[1].hero.height) > 1) {
    failed.push({name, reason:'Kajak and Scott hero heights diverge', heights:pair.map(record=>record.hero?.height)});
  }
  for (const record of pair) {
    if (record.introHeadingTop===null || record.introLeadTop===null ||
        Math.abs(record.introHeadingTop-record.introLeadTop)>3) {
      failed.push({name,route:record.route,reason:'Equipment intro heading and lead do not share a top line',heading:record.introHeadingTop,lead:record.introLeadTop});
    }
    if (record.introLeadLeft===null || record.storyCopyLeft===null ||
        Math.abs(record.introLeadLeft-record.storyCopyLeft)>3) {
      failed.push({name,route:record.route,reason:'Intro lead misses the editorial text-column vertical line',intro:record.introLeadLeft,story:record.storyCopyLeft});
    }
  }
  if (pair.length===2 && (pair[0].cardTitleFontSize!==pair[1].cardTitleFontSize ||
      pair[0].cardTitleLineHeight!==pair[1].cardTitleLineHeight ||
      pair[0].cardEyebrowFontSize!==pair[1].cardEyebrowFontSize)) {
    failed.push({name,reason:'Kajak/Scott card typography diverges',cards:pair.map(record=>({route:record.route,title:record.cardTitleFontSize,lineHeight:record.cardTitleLineHeight,eyebrow:record.cardEyebrowFontSize}))});
  }
}
console.log(`${records.length} reference-hero checks; ${failed.length} technical failures; ${output}`);
for(const record of failed) console.log(`${record.route} ${record.name}: ${JSON.stringify(record)}`);
if(failed.length) process.exitCode=1;
