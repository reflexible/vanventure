"""Review CMS 3–6 source blocks SRC-0425–0438."""
import csv
import hashlib
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
MIG=ROOT/'docs/scrum-migration'
ATOMS=MIG/'atomic-requirements.csv'
CATALOG=MIG/'story-catalog.json'
SOURCE=ROOT/'docs/ausbauplan.md'
sha=hashlib.sha256(SOURCE.read_bytes()).hexdigest()
with ATOMS.open(encoding='utf-8-sig',newline='') as stream:
    reader=csv.DictReader(stream);fields,rows=list(reader.fieldnames),list(reader)
with (MIG/'source-inventory.csv').open(encoding='utf-8-sig',newline='') as stream:
    sources={row['ID']:row for row in csv.DictReader(stream)}
with (MIG/'traceability-matrix.csv').open(encoding='utf-8-sig',newline='') as stream:
    matrix={row['ID']:row for row in csv.DictReader(stream)}

reasons={
'0426.a':'Only explicitly released Published revision is delivered to anonymous visitors.',
'0426.b':'Unpublished path must behave like a nonexistent page.',
'0426.c':'Authenticated editor preview shows Working privately without public draft data or editor code.',
'0427.a':'Navigation and all named search/structured outputs derive only from public released pages.',
'0427.b':'Editable SEO data for planned pages remains private.',
'0428.a':'Security/regression suite covers anonymous, private, previous Published, noindex/sitemap and old static routes.',
'0428.b':'Homepage retains its distinct layout through CMS migration.',
'0430.a':'Inline text/image editing requires a valid editorial session and correct page position.',
'0430.b':'Save changes only Working and detects concurrent edits.',
'0431.a':'Codex draft workflow reuses all named page-type inputs and current revision context.',
'0431.b':'Output is a new Review revision, raw material survives, and no automatic publication occurs.',
'0433.a':'Media register stores every named identity, provenance, accessibility, status and usage field in PostgreSQL.',
'0433.b':'Original and web files live in controlled asset storage.',
'0433.c':'Derivatives may only originate from protected project copies.',
'0434.a':'One video relationship uses existing yt_videos and provides CTA/embed/VideoObject per suitable page type without duplicate YouTube administration.',
'0436.a':'One already published reference page, preferably vehicle.html, is migrated as a bounded slice.',
'0436.b':'Before/after acceptance covers function, content, images, device sizes, languages and SEO.',
'0437.a':'A still-private reference page, preferably the GCS brief, traverses editing, review and preview.',
'0437.b':'Public invisibility includes anonymous route, sitemap and search.',
'0438.a':'Both reference cases require evidence matrix and report with source, result, gaps and distinct local/live states.',
'0438.b':'Further-page migration plan requires passed functional, visual, responsive, security and SEO checks first.',
'0438.c':'The remaining pages and their migration are expressly outside CMS 1–6.',
}
targets={
426:'ST-CMS-03',427:'ST-CMS-03',428:'ST-CMS-03',430:'ST-CMS-04',431:'ST-CMS-05',
433:'ST-CMS-06',434:'ST-CMS-07',436:'ST-CMS-08',437:'ST-CMS-09',438:'ST-CMS-08,ST-CMS-09'
}
package=[row for row in rows if 425<=int(row['SourceID'][4:])<=438 and not row.get('ReviewPackage')]
assert len(package)==len(reasons)==22,(len(package),len(reasons))
assert {row['AtomicID'][4:] for row in package}==set(reasons)
for n in range(425,439):
    sid=f'SRC-{n:04}';group=[row for row in package if row['SourceID']==sid]
    if group:
        assert n in targets and matrix[sid]['Relevant']=='Yes'
        assert ' '.join(row['Clause'] for row in group)==sources[sid]['OriginalText'],sid
    else:
        assert sid in {'SRC-0425','SRC-0429','SRC-0432','SRC-0435'} and matrix[sid]['Relevant']=='No'
    assert sources[sid]['OriginalText'] in ' '.join(SOURCE.read_text(encoding='utf-8').split()),sid

changes={
'ST-CMS-03':('Anonyme Besucher erhalten nur ausdrücklich freigegebene Published Revisionen; unveröffentlichte Pfade wirken wie nicht vorhandene Seiten. Nur eingeloggte Redakteure sehen Working in geschützter Vorschau ohne öffentliche Draft-Daten oder Editor-Code. Navigation, Sitemap, Canonicals, Metadaten und JSON-LD stammen allein aus freigegebenen Seiten; SEO-Felder geplanter Seiten bleiben privat. Sicherheits- und Regressionstests prüfen anonymen Zugriff, private Vorschau, alte Published Revision, noindex/Sitemap und bestehende statische Routen; die Startseite behält ihr eigenes Layout.',['SRC-0426','SRC-0427','SRC-0428']),
'ST-CMS-04':('Text und Bild werden nur in gültiger Redaktionssitzung an der jeweiligen Position bearbeitet oder ausgewählt; Speichern verändert ausschließlich Working und meldet konkurrierende Änderungen.',['SRC-0430']),
'ST-CMS-05':('Der verallgemeinerte Codex-Ablauf liest Rohtext, Fassung, Struktur, Bildnotizen, SEO-Ziele, verknüpftes Video, Master Context und Revision; er schreibt nur eine neue Review Revision, bewahrt Rohmaterial und veröffentlicht niemals automatisch.',['SRC-0431']),
'ST-CMS-06':('PostgreSQL hält Medienidentität, Prüfsumme, Herkunft, Maße, Alt-Text, Caption, Fokuspunkt, Notizen, Status, Varianten und Seitenverwendung. Original- und Webdateien liegen im kontrollierten Asset Storage; Derivate entstehen nur aus geschützten Projektkopien.',['SRC-0433']),
'ST-CMS-07':('Eine passende Seite verknüpft vorhandene yt_videos und erzeugt je Seitentyp Video-CTA/Embed und VideoObject, ohne eine zweite YouTube-Verwaltung.',['SRC-0434']),
'ST-CMS-08':('Eine bestehende veröffentlichte Referenzseite, bevorzugt vehicle.html, wird kontrolliert übernommen und in Funktion, Inhalt, Bildfreigaben, Desktop/Tablet/Mobil, Sprachen und SEO vorher/nachher geprüft. Für beide CMS-Referenzfälle gibt es Evidenzmatrix und Abnahmebericht mit Quellstand, Ergebnis, offenen Punkten und getrenntem Lokal-/Live-Status. Ein Plan für weitere Seiten entsteht erst nach bestandener funktionaler, visueller, responsiver, sicherheitstechnischer und SEO-Prüfung; die übrigen Seiten und ihre Migration sind nicht Teil von CMS 1–6.',['SRC-0436','SRC-0438']),
'ST-CMS-09':('Eine noch unveröffentlichte Referenzseite, bevorzugt der GCS-Langzeitbericht aus dem bestehenden Brief, durchläuft privat Redaktion, Review und Vorschau; öffentliche Route, Sitemap und Suche zeigen sie nicht. Die gemeinsame Evidenzmatrix und der Abnahmebericht unterscheiden lokale Vorbereitung von Live-Stand. Weitere Seiten werden erst nach bestandenem Referenzfall geplant und bleiben außerhalb CMS 1–6.',['SRC-0437','SRC-0438']),
}
lines=CATALOG.read_text(encoding='utf-8').splitlines(keepends=True)
out=[];changed=set()
for line in lines:
    if line.lstrip().startswith('{"id"'):
        item=json.loads(line.strip().rstrip(','))
        if item['id'] in changes:
            ac,refs=changes[item['id']]
            assert ac not in item['acceptance']
            item['acceptance']+=' '+ac
            item['sources']=list(dict.fromkeys(item['sources']+refs))
            line='    '+json.dumps(item,ensure_ascii=False,separators=(',',':'))+(',\n' if line.rstrip().endswith(',') else '\n')
            changed.add(item['id'])
    out.append(line)
assert changed==set(changes)
CATALOG.write_text(''.join(out),encoding='utf-8')
stories={item['id'] for item in json.loads(CATALOG.read_text(encoding='utf-8'))['stories']}
assert all(story in stories for target in targets.values() for story in target.split(','))
for row in package:
    aid,sid=row['AtomicID'],row['SourceID'];target=targets[int(sid[4:])]
    row.update(ReviewPackage='PKG-011',ReviewedSourceSHA256=sha,ReviewReason=reasons[aid[4:]],OpenQuestion='',
               BlockCoverageCheck='Complete CMS source block reread; candidate clauses rejoin exactly',
               AtomicityReview='Semantic review evidenced in PKG-011',ReviewClassification='Functional requirement',
               RequirementID=aid,SuccessorIDs='',RequirementText=row['Clause'],
               ConcreteTarget=','.join(f'{story}#Acceptance-Criteria' for story in target.split(',')),
               PlanningCoverage='Covered',SemanticResult='Specific CMS story criterion checked against full source')
with ATOMS.open('w',encoding='utf-8-sig',newline='') as stream:
    writer=csv.DictWriter(stream,fieldnames=fields);writer.writeheader();writer.writerows(rows)
print(f'PKG-011: 10 relevant blocks, 22 candidates; four headings confirmed context; SHA-256 {sha}')
