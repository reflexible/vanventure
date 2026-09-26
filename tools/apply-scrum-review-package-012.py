"""Review existing authentication rollout and protected navigation SRC-0439–0447."""
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

reasons={
'0439.a':'Password login remains until the whole Google phase is accepted.',
'0439.b':'Allowlist is managed solely in existing user administration.',
'0439.c':'Forbids open registration and automatic Google-account adoption.',
'0440.a':'Existing account-to-Google-address mapping includes two active administrator accounts; historical result.',
'0441.a':'Additive provider/sub/verified-email/mapping-time fields were already delivered.',
'0442.a':'Google auth start/callback route and allowlist-checked return are historical security results.',
'0443.a':'Shared server-verifiable editor/Cockpit session is one existing login capability.',
'0443.b':'Contains separate immediate invalidation and controlled-restart session duties.',
'0444.a':'Existing login UI includes neutral refusal feedback for unauthorized Google accounts.',
'0445.a':'Audit covers four login/account actions and forbids tokens, secrets and full sensitive identities in logs.',
'0446.a':'Historical automated and live acceptance used a separate OAuth client for allowed and refused accounts.',
'0446.b':'Shared session tests cover cross-app movement, CSRF, logout and immediate revocation.',
'0446.c':'Completes the dated local test result of 18 passing tests; no additional feature.',
'0446.d':'Historically live verified three named endpoints with HTTP 200.',
'0446.e':'Historically live verified Cockpit OAuth start redirect with HTTP 303.',
'0446.f':'Records completion of both allowed and refused account live sign-in cases.',
'0447.a':'Date fragment of rollout heading, not a separate obligation.',
'0447.b':'Historical live deployment and password fallback remain recorded; not a new rollout.',
'0447.c':'Dedicated private OAuth client and two assigned admin addresses are retained.',
'0447.d':'YouTube client remains strictly separate and is never reused for login.',
'0447.e':'Protected /privat entry and fixed shared left navigation include all named destinations.',
'0447.f':'Google account displays read-only Google address and has no VanVenture password.',
'0447.g':'Only password accounts have separate contact email and password-change function.',
'0447.h':'Protected overview uses broad, left-aligned work area next to navigation.',
'0447.i':'Ban on empty secondary navigation grid qualifies the same layout rule.',
'0447.j':'Account functions belong only in shared private navigation or /privat.',
'0447.k':'Editor and Cockpit must not duplicate those account functions; qualifies centralization.',
'0447.l':'Date fragment of the later logout rollout, not a new duty.',
'0447.m':'Historically live logout control sits directly below the account display.',
'0447.n':'Administrator-only link reaches protected /benutzerverwaltung.',
'0447.o':'Editorial accounts must not see the user-management navigation item.',
'0447.p':'Former editor dialog is removed as part of the shared navigation outcome.',
'0447.q':'HTTP 200 after restart is historical evidence, not a new route requirement.',
'0447.r':'Unchanged PostgreSQL and Caddy are historical rollout evidence.',
'0447.s':'Public language switch and login stand adjacent on every page.',
'0447.t':'Mobile navigation is contrast-rich over hero and operable without visible scroll bar at small widths.',
}
splits={'SRC-0443.b':[
 ('SRC-0443.b1','Logout, account lock and role change immediately invalidate the shared session.','Immediate invalidation is an independent security check.'),
 ('SRC-0443.b2','Normal web restart neither unintentionally preserves nor uncontrollably loses the session.','Restart behavior is independently testable.'),
]}
merges={'SRC-0446.c':'SRC-0446.b','SRC-0447.i':'SRC-0447.h','SRC-0447.k':'SRC-0447.j'}
context={'SRC-0447.a','SRC-0447.l','SRC-0447.q','SRC-0447.r'}
web={'SRC-0447.s','SRC-0447.t'}
package=[row for row in rows if 439<=int(row['SourceID'][4:])<=447 and not row.get('ReviewPackage')]
assert len(package)==len(reasons)==36,(len(package),len(reasons))
assert {row['AtomicID'][4:] for row in package}==set(reasons)
for n in range(439,448):
    sid=f'SRC-{n:04}'
    assert ' '.join(row['Clause'] for row in package if row['SourceID']==sid)==sources[sid]['OriginalText'],sid
    assert sources[sid]['OriginalText'] in ' '.join(SOURCE.read_text(encoding='utf-8').split()),sid

changes={
'ST-AUTH-01':('Bis zur vollständigen Abnahme bleibt der bestehende Passwort-Login aktiv; die Freigabeliste wird nur in der vorhandenen Benutzerverwaltung geführt, ohne offene Registrierung oder automatische Google-Kontoübernahme. Die historisch geprüfte Google-Zuordnung erfasst zwei aktive Admin-Konten und additive Provider-, sub-, verifizierte E-Mail- und Zuordnungszeit-Felder. /api/auth/google/* nutzt sichere allowlist-geprüfte Rücksprünge zu Redaktion/Cockpit. Die gemeinsame serverseitig prüfbare Sitzung wird bei Abmeldung, Sperre oder Rollenänderung sofort ungültig und verhält sich bei normalem Neustart kontrolliert. Login-Schaltflächen und neutraler Hinweis für nicht freigegebene Konten sind vorhanden. Login-, Logout-, Freigabefehler- und Admin-Zuordnungs-Audit enthält keine Tokens, Secrets oder vollständigen sensiblen Identitätsdaten. Historisch belegt sind 18 lokale Tests, HTTP 200 für /healthz, /redaktion und /cockpit, HTTP 303 beim Cockpit-OAuth-Start sowie erfolgreiche Prüfung eines freigegebenen und nicht freigegebenen Kontos. Der separate private OAuth-Webclient bleibt vom YouTube-Client strikt getrennt. Nach Anmeldung führt der Einstieg zu /privat mit fester linker Navigation für Übersicht, Redaktion, Cockpit und Profil in allen privaten Ansichten. Google-Konten zeigen die Google-Adresse nur lesbar und besitzen kein VanVenture-Passwort; nur Passwortkonten erhalten gesonderte Kontakt-E-Mail und Passwortwechsel. Der breite Arbeitsbereich ist linksbündig ohne leeres zweites Navigationsraster. Benutzername, Passwortwechsel und Logout erscheinen nur zentral; Logout steht unter der Kontoanzeige. Nur Administratoren sehen /benutzerverwaltung, Redaktionskonten nicht; der frühere Redaktions-Dialog ist entfernt. Dies beschreibt historisch belegte Ergebnisse, keine neue Implementierung.',['SRC-0439','SRC-0440','SRC-0441','SRC-0442','SRC-0443','SRC-0444','SRC-0445','SRC-0446','SRC-0447']),
'ST-WEB-01':('Auf jeder öffentlichen Seite stehen Sprachumschaltung und Login nebeneinander; mobile Navigation liegt kontrastreich als eigene Ebene über dem Hero und ist bei kleinen Viewports ohne sichtbaren Scrollbalken bedienbar.',['SRC-0447']),
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
assert {'ST-AUTH-01','ST-WEB-01'}<=stories

def target(aid):
    story='ST-WEB-01' if aid in web else 'ST-AUTH-01'
    return f'{story}#Acceptance-Criteria'

for row in package:
    aid=row['AtomicID']
    row.update(ReviewPackage='PKG-012',ReviewedSourceSHA256=sha,ReviewReason=reasons[aid[4:]],OpenQuestion='',
       BlockCoverageCheck='Full authentication source block reread; candidate clauses rejoin exactly',
       AtomicityReview='Semantic review evidenced in PKG-012')
    if aid in splits:
        successors=','.join(child[0] for child in splits[aid])
        row.update(ReviewClassification='Split parent',RequirementID='',SuccessorIDs=successors,
                   RequirementText='',ConcreteTarget=successors,PlanningCoverage='Split',
                   SemanticResult='Session controls traced to independent successors')
    elif aid in merges:
        row.update(ReviewClassification='Merged fragment',RequirementID=merges[aid],SuccessorIDs=merges[aid],
                   RequirementText='',ConcreteTarget=merges[aid],PlanningCoverage='Merged',
                   SemanticResult='Condition/date retained in canonical requirement')
    elif aid in context:
        row.update(ReviewClassification='Context / historical status',RequirementID='',SuccessorIDs='',
                   RequirementText='',ConcreteTarget=target(aid),PlanningCoverage='Context',
                   SemanticResult='Historic evidence or date; no new implementation')
    else:
        linked=[next(item['Clause'] for item in package if item['AtomicID']==fragment) for fragment,canonical in merges.items() if canonical==aid]
        row.update(ReviewClassification='Functional requirement',RequirementID=aid,SuccessorIDs='',
                   RequirementText=' '.join([row['Clause'],*linked]),ConcreteTarget=target(aid),
                   PlanningCoverage='Covered',SemanticResult='Historic result and exact Story criterion checked')
for parent,children in splits.items():
    for aid,clause,reason in children:
        child=dict(next(item for item in package if item['AtomicID']==parent))
        child.update(AtomicID=aid,Clause=clause,ReviewClassification='Functional requirement',
                     RequirementID=aid,SuccessorIDs='',RequirementText=clause,ConcreteTarget=target(aid),
                     PlanningCoverage='Covered',SemanticResult='Independent safeguard checked against full block',ReviewReason=reason)
        rows.append(child)
assert len({row['AtomicID'] for row in rows})==len(rows)
with ATOMS.open('w',encoding='utf-8-sig',newline='') as stream:
    writer=csv.DictWriter(stream,fieldnames=fields);writer.writeheader();writer.writerows(rows)
print(f'PKG-012: 9 blocks, 36 original candidates, 2 successors; SHA-256 {sha}')
