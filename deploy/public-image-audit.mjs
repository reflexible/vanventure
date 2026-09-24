// Read-only inventory of public image references and their exact web files.
// It never touches the original archive or rewrites its evidence.
import {createHash} from 'node:crypto';
import {existsSync,readFileSync,readdirSync,statSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {join,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const pages=[
  'index.html','vehicle.html','kajak.html','norwegen-2018.html',
  'sardinien-2019.html','italien-2021.html',
  'scott-mountainbike.html','cube.html','trek-gravelbike.html',
  'diamant-stadtraeder.html','woom-2.html'
];
const sources=[...pages,'styles.css','navigation.css','equipment-pages.css',
  'bike-pages.css','travel-stories.css','vehicle-profile.css','riverstar.css',
  'kajak-gallery.css','hero-shared.css','kajak-hero.css','photo-viewer.css',
  'travel-stories.json'];
const usage=new Map();
for(const source of sources){
  const path=join(root,source);
  if(!existsSync(path)) continue;
  const content=readFileSync(path,'utf8');
  for(const match of content.matchAll(/assets\/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|gif|avif)(?:\?[^\s"')<>]*)?/gi)){
    const image=match[0].split('?')[0];
    if(!usage.has(image)) usage.set(image,new Set());
    usage.get(image).add(source);
  }
}
const files=[...usage].sort(([a],[b])=>a.localeCompare(b)).map(([image,usedOn])=>{
  const path=join(root,image);
  const exists=existsSync(path);
  return {image,usedOn:[...usedOn].sort(),exists,
    bytes:exists?statSync(path).size:null,
    sha256:exists?createHash('sha256').update(readFileSync(path)).digest('hex'):null};
});
const trackedAssets=new Set(execFileSync('git',['ls-files','--cached','-z','--','assets'],{cwd:root})
  .toString('utf8').split('\0').filter(Boolean).map(file=>file.replaceAll('\\','/')));
const untrackedReferencedAssets=files.filter(file=>!trackedAssets.has(file.image)).map(file=>file.image);
const records=new Map();
const evidenceFiles=['docs/riverstar/bildquellen.json','docs/kajak-galerie-bildquellen.json',
  'docs/ausruestung-bildquellen.json','docs/scott-bildquellen.json',
  'docs/reiseberichte-bildquellen.json','docs/site-assets-bildquellen.json',
  'docs/hero-bildquellen.json','docs/vehicle-bildquellen.json'];
for(const evidenceFile of evidenceFiles){
  const data=JSON.parse(readFileSync(join(root,evidenceFile),'utf8'));
  const entries=Array.isArray(data)?data:Object.entries(data).map(([name,record])=>({
    ...record,web_image:`assets/bikes/${name}`
  }));
  for(const entry of entries){
    const image=entry.web_image?.replaceAll('\\','/');
    if(image) records.set(image,{evidenceFile,entry});
  }
}
const stagedManifest='review/selected-originals-manifest.json';
if(existsSync(join(root,stagedManifest))){
  for(const entry of JSON.parse(readFileSync(join(root,stagedManifest),'utf8'))){
    const basename=entry.source_path.split(/[\\/]/).pop();
    const webName=basename.replace(/\.[^.]+$/,'').toLowerCase().replaceAll('_','-')+'.jpg';
    const image=`assets/reisen/${entry.trip}/gallery/${webName}`;
    if(!records.has(image)) records.set(image,{evidenceFile:stagedManifest,entry});
  }
}
for(const file of files){
  const record=records.get(file.image);
  if(!record) {file.record='missing';continue;}
  file.record=record.evidenceFile;
  const mappingStatus=record.entry.mapping_status||record.entry.mappingStatus;
  const sourceCopyIntegrity=record.entry.source_copy_integrity||record.entry.sourceCopyIntegrity;
  if(mappingStatus||sourceCopyIntegrity){
    file.mappingStatus=mappingStatus||'NOT_RECORDED';
    file.sourceCopyIntegrity=sourceCopyIntegrity||'NOT_RECORDED';
    file.sourceVerificationOpen=!String(mappingStatus||'').startsWith('MOTIF_MATCHED')||
      sourceCopyIntegrity!=='VERIFIED_SOURCE_COPY';
  }
  const expected=record.entry.web_image_sha256?.toLowerCase();
  file.documentedWebHash=expected?expected===file.sha256:'not recorded';
  const source=record.entry.unchanged_copy||record.entry.unchanged_project_copy||record.entry.unchangedProjectCopy||record.entry.unchangedProjectSource||record.entry.project_original;
  const candidateSources=record.entry.candidateProjectCopies||[];
  if(source){
    const projectPath=resolve(root,source);
    file.projectCopyExists=existsSync(projectPath);
    const sourceHash=(record.entry.sha256||record.entry.sourceSha256)?.toLowerCase();
    file.projectCopyHash=sourceHash&&file.projectCopyExists?
      createHash('sha256').update(readFileSync(projectPath)).digest('hex')===sourceHash:
      'not checked';
  }else if(candidateSources.length){
    file.projectCopyExists=candidateSources.some(candidate=>existsSync(resolve(root,candidate)));
  }
  const archiveSource=record.entry.source||record.entry.source_path;
  if(archiveSource&&/^[A-Za-z]:[\\/]/.test(archiveSource)){
    const zipMember=archiveSource.indexOf('::');
    const archivePath=zipMember<0?archiveSource:archiveSource.slice(0,zipMember);
    file.archiveSourceExists=existsSync(archivePath);
    const sourceHash=(record.entry.sha256||record.entry.sourceSha256)?.toLowerCase();
    file.archiveSourceHash=zipMember>=0?'ZIP member not checked':
      sourceHash&&file.archiveSourceExists?
        createHash('sha256').update(readFileSync(archivePath)).digest('hex')===sourceHash:
        'not checked';
  }
}
const missing=files.filter(file=>!file.exists);
const allAssets=(function walk(directory){return readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
  const path=join(directory,entry.name);
  return entry.isDirectory()?walk(path):/\.(?:jpe?g|png|webp|gif|avif)$/i.test(entry.name)?[path]:[];
});})(join(root,'assets'));
const result={pages:pages.length,referencedVariants:files.length,missing:missing.length,
  untrackedReferencedAssets,
  publicImageFiles:allAssets.length,unreferencedPublicImageFiles:allAssets.length-files.length,
  evidenceRecords:files.filter(file=>file.record!=='missing').length,
  missingEvidenceRecords:files.filter(file=>file.record==='missing').map(file=>file.image),
  openSourceVerifications:files.filter(file=>file.sourceVerificationOpen===true).map(file=>({
    image:file.image,mappingStatus:file.mappingStatus,sourceCopyIntegrity:file.sourceCopyIntegrity
  })),
  matchingDocumentedWebHashes:files.filter(file=>file.documentedWebHash===true).length,
  mismatchingDocumentedWebHashes:files.filter(file=>file.documentedWebHash===false).map(file=>file.image),
  missingProjectCopies:files.filter(file=>file.projectCopyExists===false).map(file=>file.image),
  mismatchingProjectCopyHashes:files.filter(file=>file.projectCopyHash===false).map(file=>file.image),
  missingArchiveSources:files.filter(file=>file.archiveSourceExists===false).map(file=>file.image),
  matchingArchiveSourceHashes:files.filter(file=>file.archiveSourceHash===true).length,
  mismatchingArchiveSourceHashes:files.filter(file=>file.archiveSourceHash===false).map(file=>file.image),
  provenanceAndApproval:'records are evidence only; publication approval and visual checks require separate verification',files};
if(process.argv.includes('--json')) console.log(JSON.stringify(result,null,2));
else console.log(JSON.stringify({...result,files:undefined,
  missingEvidenceRecords:result.missingEvidenceRecords.length,
  missingFiles:missing.map(file=>file.image)},null,2));
if(missing.length||result.mismatchingDocumentedWebHashes.length||result.mismatchingProjectCopyHashes.length||result.mismatchingArchiveSourceHashes.length) process.exitCode=1;
if(process.argv.includes('--strict')&&(result.missingEvidenceRecords.length||result.missingProjectCopies.length||result.openSourceVerifications.length||untrackedReferencedAssets.length)) process.exitCode=1;
