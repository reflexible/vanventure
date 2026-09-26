"""Review CMS introduction and CMS 1–2 blocks SRC-0415–0424."""
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

new_candidates={
'SRC-0415':[
'**Auftrag vom 25. September 2026; Status: geplant, nicht implementiert.**',
'Die bestehende Node.js-/PostgreSQL-Architektur mit Redaktion, Cockpit, Google-Login, Design Guide und responsiven Templates wird erweitert.',
'Es gibt kein paralleles CMS und keinen Framework-Wechsel.',
'Inhalte sind datengetrieben; Layout und Gestaltung bleiben in den freigegebenen Templates und Komponenten.',
'Diese Gruppe ergänzt die offenen Template-Arbeiten unter 1C, den Content Planner und Master Context unter 2 sowie Website/SEO unter 5;',
'deren bisherige Abnahmen und Freigaben werden nicht durch CMS-Häkchen ersetzt.',
],
'SRC-0416':[
'**Fortschrittsregel:** Jede nummerierte Checkbox wird erst nach lokaler Prüfung und dokumentiertem Ergebnis abgehakt.',
'Für produktive Funktionen werden Commit, Push und Live-Prüfung gesondert ausgewiesen.',
'Ein abgeschlossenes Teilpaket ist keine Freigabe für die Migration weiterer Seiten.',
'Unveröffentlichte Inhalte werden niemals allein durch Speichern öffentlich.',
'Bilder und neue Designregeln unterliegen weiterhin den bestehenden Prüf- und Freigaberegeln.',
]}
for sid,clauses in new_candidates.items():
    assert matrix[sid]['Relevant']=='Yes' and matrix[sid]['Coverage']=='Rule / Constraint'
    assert ' '.join(clauses)==sources[sid]['OriginalText'],sid
    assert not any(row['SourceID']==sid for row in rows)
    for n,clause in enumerate(clauses):
        aid=f'{sid}.{chr(97+n)}'
        rows.append({**{field:'' for field in fields},'AtomicID':aid,'SourceID':sid,
           'Source':sources[sid]['Source'],'Line':sources[sid]['Line'],'Clause':clause,
           'OriginalFullTextRef':'traceability-matrix.csv#'+sid,
           'PlanningMapping':matrix[sid]['NewMapping'],'PlanningCoverage':'Unresolved',
           'ImplementationStatus':'Unverified / unknown',
           'ImplementationNote':'Recovered normative CMS source; implementation not checked',
           'AtomicityReview':'Targeted overlooked-clause recovery pending semantic review'})

reasons={
'0415.a':'Explicitly says CMS is planned and not implemented, preventing a false Done state.',
'0415.b':'Requires extending existing Node/PostgreSQL, editor, Cockpit, login and approved template architecture.',
'0415.c':'Forbids both a parallel CMS and a framework switch.',
'0415.d':'Keeps content data-driven while approved templates/components own layout and design.',
'0415.e':'Defines additive relationship to 1C, Planner/Context and Website/SEO work.',
'0415.f':'Forbids CMS checkboxes from replacing earlier acceptance and approvals.',
'0416.a':'Checkbox completion requires local check plus documented result.',
'0416.b':'Production work reports commit, push and live check separately.',
'0416.c':'One finished package cannot approve further page migration.',
'0416.d':'Saving unpublished content must never publish it.',
'0416.e':'Image and new-design approval gates remain binding.',
'0418.a':'CMS 1.1 inventories every named existing system and permission area against current project rules.',
'0419.a':'CMS 1.2 creates one concrete plan covering schema, types, routes, editing, media, SEO, tests and migration.',
'0419.b':'Overlaps with 1C, 2 and 5 and preimplementation decisions must be identified explicitly.',
'0420.a':'Every plan area needs one of four named rule-check states.',
'0420.b':'CMS 2 is gated on completing that plan assessment.',
'0422.a':'CMS 2.1 page model names exact route, type, pillar, template, status, date, SEO/video and audit fields.',
'0422.b':'Existing Planner records require unique linkage rather than duplication.',
'0423.a':'CMS 2.2 requires immutable history with separate Working and Published revisions.',
'0423.b':'Raw material survives alongside edited content.',
'0423.c':'The listed content blocks derive from approved existing templates.',
'0424.a':'CMS 2.3 combines lifecycle actions with independent authorization, CSRF, audit and conflict safeguards.',
'0424.b':'Only an authorized person may explicitly switch the Published revision.',
}
splits={'SRC-0424.a':[
('SRC-0424.a1','Save, review, schedule, publish and archive through the existing editor.','Lifecycle actions are separately testable from security controls.'),
('SRC-0424.a2','Roles, CSRF, audit and version-conflict controls protect those actions.','The safety controls are independently testable.'),
]}
context={'SRC-0415.a'}
story_target={
**{f'SRC-{n:04}.{s}':'ST-CMS-01' for n,s in [(418,'a'),(419,'a'),(419,'b'),(420,'a'),(420,'b'),(422,'a'),(422,'b'),(423,'a'),(423,'b'),(423,'c')]},
'SRC-0424.a1':'ST-CMS-01,ST-CMS-02','SRC-0424.a2':'ST-CMS-01,ST-CMS-02',
'SRC-0424.b':'ST-CMS-02',
}
package=[row for row in rows if 415<=int(row['SourceID'][4:])<=424 and not row.get('ReviewPackage')]
assert len(package)==len(reasons)==23,(len(package),len(reasons))
assert {row['AtomicID'][4:] for row in package}==set(reasons)
for n in range(415,425):
    sid=f'SRC-{n:04}';group=[row for row in package if row['SourceID']==sid]
    if group:
        assert matrix[sid]['Relevant']=='Yes'
        assert ' '.join(row['Clause'] for row in group)==sources[sid]['OriginalText'],sid
    else:
        assert sid in {'SRC-0417','SRC-0421'} and matrix[sid]['Relevant']=='No'
    assert sources[sid]['OriginalText'] in ' '.join(SOURCE.read_text(encoding='utf-8').split()),sid

changes={
'ST-CMS-01':('Vor CMS 2 sind Datenbank, redaction.mjs, Cockpit/Planner, Generatoren, Routen, Navigation, SEO, Medien und Rechte gegen die Projektregeln inventarisiert; ein konkreter Plan für Schema, Seitentypen/Templates, Revisionen, öffentliche/private Routen, Inline-Bearbeitung, Medien, Codex-Redaktion, SEO, Tests und Migration benennt Überschneidungen mit 1C/2/5 und offene Entscheidungen. Jeder Planbereich ist bestanden, fehlgeschlagen, nicht geprüft oder blockiert; erst nach dem Gate beginnt CMS 2. Das Page-Modell enthält kanonischen Pfad, Seitentyp, Pillar, Template, planned/draft/ready_for_editorial/review/scheduled/published/archived, Veröffentlichungsdatum, SEO-/Video-Felder und Änderungsnachweis; bestehende Planner-Einträge werden eindeutig verknüpft statt dupliziert. Unveränderliche Historie trennt Working und Published, bewahrt Rohmaterial und nutzt vorhandene Templates für Hero, Lead, Text, Bild/Text, Galerie, Video, Fakten, Route, Gear, CTA und Related Content. Speichern und Review sind rollen-, CSRF-, audit- und konfliktgeschützt und ändern Published nicht.',['SRC-0418','SRC-0419','SRC-0420','SRC-0422','SRC-0423','SRC-0424']),
'ST-CMS-02':('Speichern, Review, Terminierung, Veröffentlichung und Archivierung greifen in die bestehende Redaktion ein; Rollen, CSRF, Audit und Versionskonflikte schützen jeden Wechsel. Nur eine berechtigte Person kann die Published Revision ausdrücklich wechseln.',['SRC-0424']),
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
assert all(story in stories for targets in story_target.values() for story in targets.split(','))

def target(aid,sid):
    return ','.join([*(f'{story}#Acceptance-Criteria' for story in story_target.get(aid,'').split(',') if story),
                    f'constraint-register.md#{sid.lower()}']) if matrix[sid]['Coverage']=='Rule / Constraint' else ','.join(f'{story}#Acceptance-Criteria' for story in story_target.get(aid,'').split(',') if story)

for row in package:
    aid,sid=row['AtomicID'],row['SourceID']
    row.update(ReviewPackage='PKG-010',ReviewedSourceSHA256=sha,ReviewReason=reasons[aid[4:]],OpenQuestion='',
      BlockCoverageCheck='Complete canonical CMS item reread; candidate clauses rejoin exactly',
      AtomicityReview='Semantic review evidenced in PKG-010')
    if aid in splits:
        successor=','.join(child[0] for child in splits[aid])
        row.update(ReviewClassification='Split parent',RequirementID='',SuccessorIDs=successor,
                   RequirementText='',ConcreteTarget=successor,PlanningCoverage='Split',
                   SemanticResult='Lifecycle and safety duties traced to separate successors')
    elif aid[4:] in context:
        row.update(ReviewClassification='Context / status',RequirementID='',SuccessorIDs='',
                   RequirementText='',ConcreteTarget=target(aid,sid),PlanningCoverage='Context',
                   SemanticResult='No CMS implementation inferred from planned status')
    else:
        story=aid in story_target
        row.update(ReviewClassification='Functional requirement' if story else 'Project rule / constraint',
                   RequirementID=aid,SuccessorIDs='',RequirementText=row['Clause'],
                   ConcreteTarget=target(aid,sid),PlanningCoverage='Covered' if story else 'Rule / Constraint',
                   SemanticResult='Concrete story criterion or exact rule checked against original')
for parent,children in splits.items():
    for aid,clause,reason in children:
        child=dict(next(item for item in package if item['AtomicID']==parent))
        child.update(AtomicID=aid,Clause=clause,ReviewClassification='Functional requirement',
            RequirementID=aid,SuccessorIDs='',RequirementText=clause,ConcreteTarget=target(aid,child['SourceID']),
            PlanningCoverage='Covered',SemanticResult='Independent successor checked against full parent',ReviewReason=reason)
        rows.append(child)
assert len({row['AtomicID'] for row in rows})==len(rows)
with ATOMS.open('w',encoding='utf-8-sig',newline='') as stream:
    writer=csv.DictWriter(stream,fieldnames=fields);writer.writeheader();writer.writerows(rows)
print(f'PKG-010: 8 relevant blocks, 23 original candidates including 11 recovered, 2 successors; SHA-256 {sha}')
