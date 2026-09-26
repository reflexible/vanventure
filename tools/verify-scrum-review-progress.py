"""Check saved review references and counts; this does not certify semantics."""
import csv
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
MIG=ROOT/'docs/scrum-migration'
def read_csv(name):
    with (MIG/name).open(encoding='utf-8-sig',newline='') as stream:
        return list(csv.DictReader(stream))
atoms=read_csv('atomic-requirements.csv')
sources={row['ID']:row for row in read_csv('source-inventory.csv')}
matrix={row['ID']:row for row in read_csv('traceability-matrix.csv')}
stories={item['id']:item for item in json.loads((MIG/'story-catalog.json').read_text(encoding='utf-8'))['stories']}
constraints=(MIG/'constraint-register.md').read_text(encoding='utf-8')
all_ids={row['AtomicID'] for row in atoms}
assert len(all_ids)==len(atoms)
original=[row for row in atoms if re.fullmatch(r'SRC-\d{4}\.[a-z]+',row['AtomicID'])]
successors=[row for row in atoms if row not in original]
reviewed=[row for row in original if row.get('ReviewPackage')]
reviewed_sources={row['SourceID'] for row in reviewed}
assert len(reviewed_sources)==sum(matrix[sid]['Relevant']=='Yes' and any(row['ReviewPackage'] for row in atoms if row['SourceID']==sid) for sid in matrix)
hashes={}
integrity_path = MIG / "source-integrity-manifest.json"
integrity_manifest = json.loads(integrity_path.read_text(encoding="utf-8")) if integrity_path.exists() else {}
for row in atoms:
    if not row.get('ReviewPackage'):
        continue
    aid,sid=row['AtomicID'],row['SourceID']
    assert sid in sources and row['Source']==sources[sid]['Source'],aid
    assert row['ReviewReason'] and row['ConcreteTarget'] and row['BlockCoverageCheck'],aid
    path=ROOT/row['Source']
    if row['Source'] in integrity_manifest:
        record = integrity_manifest[row['Source']]
        assert row['ReviewedSourceSHA256'] == record['review_sha256'], aid
        raw = hashlib.sha256(path.read_bytes()).hexdigest()
        normalized = hashlib.sha256(path.read_bytes().replace(b'\r\n', b'\n')).hexdigest()
        status = record['status']
        if status == 'BYTE_VERIFIED':
            assert (raw == record['review_sha256'] or
                    record.get('baseline_artifact_sha256') == record['review_sha256']), aid
        elif status == 'FORMAT_ONLY_VERIFIED':
            assert normalized == record['review_sha256'], aid
        elif status in {'SEMANTIC_BASELINE_VERIFIED','NON_SEMANTIC_STRUCTURAL_DIFFERENCE'}:
            listed = {x['ID'] for x in sources.values() if x['Source'] == row['Source']}
            assert set(record['source_ids']) == listed, aid
            assert all(x in matrix and matrix[x]['Note'] for x in listed), aid
        else:
            raise AssertionError(f"Unapproved source integrity status {status}: {row['Source']}")
    else:
        hashes.setdefault(row['Source'],hashlib.sha256(path.read_bytes()).hexdigest())
        assert row['ReviewedSourceSHA256']==hashes[row['Source']],aid
    for ref in row['ConcreteTarget'].split(','):
        if ref.startswith('ST-'):
            story,sep,part=ref.partition('#')
            assert story in stories and sep and part=='Acceptance-Criteria',aid
        elif ref.startswith('constraint-register.md#'):
            assert '\n## '+ref.split('#',1)[1]+'\n' in constraints,aid
        elif ref.startswith('SRC-'):
            assert ref in all_ids,aid
        else:
            raise AssertionError((aid,ref))
    for ref in filter(None,row.get('SuccessorIDs','').split(',')):
        assert ref in all_ids,aid
    if row['PlanningCoverage'] in {'Unresolved','Partially Covered'}:
        assert row['OpenQuestion'] or row['ReviewReason'],aid
for sid in reviewed_sources:
    group=[row for row in original if row['SourceID']==sid]
    assert all(row['ReviewPackage'] for row in group),sid
    if sid in {'SRC-0461','SRC-0469','SRC-0509'}:
        # Existing partial-clause-map rows are semantic paraphrases, not text slices.
        assert len(group)=={'SRC-0461':7,'SRC-0469':4,'SRC-0509':10}[sid],sid
        assert sid in (MIG/'partial-clause-map.md').read_text(encoding='utf-8'),sid
    else:
        assert ' '.join(row['Clause'] for row in group)==sources[sid]['OriginalText'],sid
pkg13=[row for row in original if row.get('ReviewPackage')=='PKG-013']
if pkg13:
    assert {row['SourceID'] for row in pkg13}=={f'SRC-{n:04}' for n in range(448,460)}
    assert len(pkg13)==65
    assert {row['AtomicID'] for row in pkg13 if row['PlanningCoverage']=='Partially Covered'}==set()
    assert matrix['SRC-0452']['Coverage']=='Covered'
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-013:') for n in range(448,460))
    assert all(row['OpenQuestion'] for row in pkg13 if row['PlanningCoverage']=='Partially Covered')
    assert {row['AtomicID'] for row in successors if row['SourceID']=='SRC-0459'}=={'SRC-0459.b1','SRC-0459.b2'}
pkg14=[row for row in original if row.get('ReviewPackage')=='PKG-014']
if pkg14:
    assert {row['SourceID'] for row in pkg14}=={f'SRC-{n:04}' for n in range(460,470)}
    assert len(pkg14)==126
    assert {row['AtomicID'] for row in pkg14 if row['PlanningCoverage']=='Partially Covered'}==set()
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-014:') for n in range(460,470))
    assert matrix['SRC-0464']['Coverage']==matrix['SRC-0466']['Coverage']=='Covered'
    assert {row['AtomicID'] for row in successors if row['SourceID']=='SRC-0460'}=={'SRC-0460.e1','SRC-0460.e2'}
    assert all(row['OpenQuestion'] for row in pkg14 if row['PlanningCoverage']=='Partially Covered')
pkg15=[row for row in original if row.get('ReviewPackage')=='PKG-015']
if pkg15:
    assert {row['SourceID'] for row in pkg15}=={f'SRC-{n:04}' for n in range(470,480)}
    assert len(pkg15)==15
    assert {row['AtomicID'] for row in successors if row['SourceID'] in {f'SRC-{n:04}' for n in range(470,480)}}=={
        'SRC-0470.a1','SRC-0470.a2','SRC-0472.a1','SRC-0472.a2',
        'SRC-0476.a1','SRC-0476.a2','SRC-0477.a1','SRC-0477.a2'}
    assert matrix['SRC-0470']['Coverage']=='Covered'
    assert next(row for row in successors if row['AtomicID']=='SRC-0470.a2')['PlanningCoverage']=='Covered'
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-015:') or
               (n==470 and matrix[f'SRC-{n:04}']['Note'].startswith('COVERAGE-R1-052:'))
               for n in range(470,480))
    assert '8–11' in stories['ST-CON-01']['acceptance'] and '24' in stories['ST-CON-01']['acceptance']
    assert 'Phase-0' in stories['ST-BRD-01']['acceptance'] and 'Phase-0-Abnahme' in stories['ST-BRD-01']['dependencies']
    assert '\n## src-0477\n' in constraints and '\n## src-0478\n' in constraints
pkg16=[row for row in original if row.get('ReviewPackage')=='PKG-016']
if pkg16:
    assert {row['SourceID'] for row in pkg16}=={f'SRC-{n:04}' for n in range(480,490)}
    assert len(pkg16)==22
    assert len([row for row in successors if row['SourceID'] in {f'SRC-{n:04}' for n in range(480,490)}])==45
    assert matrix['SRC-0484']['Coverage']=='Covered'
    assert next(row for row in successors if row['AtomicID']=='SRC-0484.a1')['PlanningCoverage']=='Covered'
    assert 'ST-BRD-01#Acceptance-Criteria' in next(row for row in successors if row['AtomicID']=='SRC-0484.a1')['ConcreteTarget']
    assert 'ST-BRD-05#Acceptance-Criteria' in next(row for row in successors if row['AtomicID']=='SRC-0484.a1')['ConcreteTarget']
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-016') or (n==484 and matrix[f'SRC-{n:04}']['Note'].startswith('COVERAGE-R5-003')) for n in range(480,490))
    assert all(f'ST-BRD-0{n}' in constraints.split('## src-0483\n',1)[1].split('\n## ',1)[0] for n in range(1,5))
    assert all('Phase-0-Abnahme' in stories[f'ST-BRD-0{n}']['dependencies'] for n in range(1,5))
    assert 'To-dos' in stories['ST-BRD-01']['acceptance'] and 'CSRF' in stories['ST-BRD-01']['acceptance']
    assert 'read-only Kiosk' in stories['ST-BRD-02']['story'] and 'keine lokale PIN' in stories['ST-BRD-02']['acceptance']
    assert 'Betriebsverantwortung' in stories['ST-BRD-03']['acceptance']
    assert 'Done' in stories['ST-BRD-04']['acceptance']
pkg17=[row for row in original if row.get('ReviewPackage')=='PKG-017']
if pkg17:
    assert {row['SourceID'] for row in pkg17}=={f'SRC-{n:04}' for n in range(490,500)}
    assert len(pkg17)==17
    assert {row['AtomicID'] for row in pkg17 if row['PlanningCoverage']=='Partially Covered'}==set()
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-017:') for n in range(490,500))
    assert matrix['SRC-0491']['Coverage']=='Covered'
    assert all(f'\n## src-{n:04}\n' in constraints for n in (490,491,494,497,498))
    assert '500 und 501' in stories['ST-INS-02']['acceptance']
    assert 'Widerrufsfehler' in stories['ST-INS-03']['acceptance']
    assert all(x in stories['ST-INS-04']['acceptance'] for x in ('1/7/28/90/365', 'API-Grenzen', 'nicht als zusätzlicher Bericht'))
    assert 'content_item_metrics' in stories['ST-INS-05']['acceptance'] and 'SRC-1128' in stories['ST-INS-05']['acceptance']
    assert all(x in stories['ST-INS-06']['acceptance'] for x in ('Export', 'menschliche Prüfung', 'keine automatische Rückschreibung nach YouTube', 'Ungeprüfte Erkenntnisse werden nicht übernommen'))
    assert all(x in stories[sid]['acceptance'] for sid,x in {'ST-INS-07':'Insights-Ziel','ST-INS-08':'Planner-Ziel','ST-INS-09':'Master-Context-Ziel'}.items())
    with (MIG/'story-tasks.csv').open(encoding='utf-8-sig',newline='') as stream:
        tasks={r['TaskID']:r for r in csv.DictReader(stream)}
    assert all(tasks[tid]['ParentStory']=='ST-BRD-01' for tid in ('TASK-0103','TASK-0104'))
    with (MIG/'reverse-traceability.csv').open(encoding='utf-8-sig',newline='') as stream:
        reverse={r['StoryID']:r for r in csv.DictReader(stream)}
    assert 'SRC-0490' in reverse['ST-BRD-01']['OriginalSourceIDs'].split(', ')
    assert 'SRC-0490' not in reverse['ST-BRD-04']['OriginalSourceIDs'].split(', ')
    assert all('SRC-0491' in reverse[story]['OriginalSourceIDs'].split(', ')
               for story in ('ST-BRD-01', 'ST-BRD-02', 'ST-BRD-03', 'ST-BRD-04'))
    count=sum(row['Coverage']=='Partially Covered' for row in matrix.values())
    assert f'- Traceability Partially Covered rows: {count}' in (MIG/'atomic-coverage-report.md').read_text(encoding='utf-8')
pkg18=[row for row in original if row.get('ReviewPackage')=='PKG-018']
if pkg18:
    assert {row['SourceID'] for row in pkg18}=={f'SRC-{n:04}' for n in range(500,510)}
    assert len(pkg18)==67
    assert len([row for row in successors if row['ReviewPackage']=='PKG-018'])==13
    assert {row['AtomicID'] for row in pkg18 if row['PlanningCoverage']=='Partially Covered'}=={'SRC-0504.b'}
    assert all(matrix[f'SRC-{n:04}']['Note'].startswith('PKG-018:') for n in range(500,510))
    assert matrix['SRC-0504']['Coverage']=='Partially Covered'
    assert all(matrix[f'SRC-{n:04}']['Coverage']=='Covered' for n in (508,509))
    assert 'vehicle-front-camp.png' in constraints and 'vehicle-side-camp-v2.png' in constraints
    assert 'explicit approval' in stories['ST-WEB-03']['acceptance'] or 'explicit release-scope approval' in stories['ST-WEB-03']['acceptance']
for story in stories.values():
    assert story['sources'] and all(sid in sources for sid in story['sources']),story['id']
assert len(original)>=2882
report=(MIG/'atomic-coverage-report.md').read_text(encoding='utf-8')
def reported(label):
    match=re.search(r'^- '+re.escape(label)+r': (\d+)',report,re.M)
    assert match,label
    return int(match.group(1))
assert reported('Fachlich geprüfte Originalblöcke')==len(reviewed_sources)
assert reported('Fachlich geprüfte ursprüngliche Kandidaten')==len(reviewed)
assert reported('Ungeprüfte ursprüngliche Kandidaten')==len(original)-len(reviewed)
assert reported('Nachträglich erkannte Nachfolger durch Teilung')==len(successors)
coverage=Counter(row['PlanningCoverage'] for row in reviewed)
all_coverage=Counter(row['PlanningCoverage'] for row in atoms if row.get('ReviewPackage'))
assert reported('Offene Deckungslücken im geprüften Umfang')==all_coverage['Unresolved']+all_coverage['Partially Covered']
print(f'PASS structural review check: {len(reviewed_sources)} blocks, {len(reviewed)}/{len(original)} original candidates, {len(successors)} successors, {len(stories)} stories, {coverage["Unresolved"]} unresolved')
print('Current source SHA-256:',hashes)
