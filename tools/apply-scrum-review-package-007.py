"""Review canonical plan SRC-0373–0384, including two missed normative blocks."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
CATALOG = MIG / "story-catalog.json"
SOURCE = ROOT / "docs/ausbauplan.md"
sha = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}
with (MIG / "traceability-matrix.csv").open(encoding="utf-8-sig", newline="") as stream:
    matrix = {row["ID"]: row for row in csv.DictReader(stream)}

new_candidates = {
"SRC-0383":[
"**Auftrag vom 25. September 2026; Status: geplant, keine Analytics-Implementierung.**",
"Die fachlichen Regeln stehen in [Analytics](analytics.md).",
"Diese Gruppe ist die einzige aktive Analytics-Arbeitsliste.",
"VanVenture definiert API, Policy, Events, Properties und Content-IDs;",
"Umami ist nur der erste austauschbare Adapter.",
"YouTube-Analytics im Cockpit, Search Console und mögliches Cloudflare-Monitoring bleiben getrennt.",
"CMS 3 liefert später veröffentlichte dynamische Seiten;",
"ANALYTICS 0–5 können mit den bestehenden öffentlichen Seiten beginnen.",
],
"SRC-0384":[
"**Fortschrittsregel:** Jede `ANALYTICS n.m`-Kennung bezeichnet eine einzeln abnehmbare Story.",
"Erst nach Umsetzung und reproduzierbarer Prüfung wird sie als erledigt markiert und ihr Text durchgestrichen;",
"bei produktiven Änderungen zusätzlich nach Commit, Push, Live-Prüfung und Abnahmebericht.",
"Ein Epic gilt erst als erledigt, wenn alle seine Stories erledigt sind.",
"Die letzte Story einer Stufe nennt das sichtbare Ergebnis.",
"Offene Entscheidungen und externe Abhängigkeiten bleiben ausdrücklich offen;",
"spätere optionale Ausbauten werden nicht vorweggenommen.",
]}
for sid, clauses in new_candidates.items():
    assert matrix[sid]["Relevant"] == "Yes" and matrix[sid]["Coverage"] == "Rule / Constraint"
    assert " ".join(clauses) == sources[sid]["OriginalText"]
    assert not any(row["SourceID"] == sid for row in rows)
    for number, clause in enumerate(clauses):
        aid = f"{sid}.{chr(97+number)}"
        rows.append({**{field:"" for field in fields},
            "AtomicID":aid,"SourceID":sid,"Source":sources[sid]["Source"],
            "Line":sources[sid]["Line"],"Clause":clause,
            "OriginalFullTextRef":"traceability-matrix.csv#"+sid,
            "PlanningMapping":matrix[sid]["NewMapping"],
            "PlanningCoverage":"Unresolved","ImplementationStatus":"Unverified / unknown",
            "ImplementationNote":"Previously omitted normative source block; implementation not checked",
            "AtomicityReview":"Targeted overlooked-clause recovery pending semantic review"})

reasons = {
"0373.a":"Historic combined private-access result contains independently verifiable roles, session, CSRF and indexing/cache protections.",
"0374.a":"Historic security/sync bundle contains separately testable encryption, sync, lock, monitoring, audit and test duties.",
"0375.a":"Exact 25/33/825 import quantities and then-due snapshots describe one historical import batch, not new work.",
"0376.a":"Names five independently observable existing Cockpit/Planner/Context/Insights surfaces.",
"0377.a":"One completed format/content audit records exact 2/4/19 sample and keep/repackage/drop decisions.",
"0378.a":"Safe Audit Export V2 is a historical protected outcome.",
"0378.b":"Anonymous denial of the export endpoint is a separately checkable security condition.",
"0379.a":"VAN, EXPLORE and MOVE are three distinct validated Planner tests, not one new story.",
"0380.a":"Creator checklist, reuse workflow and estimated/actual hours have separate acceptance evidence.",
"0381.a":"Release check, protected dump and successful Cockpit restore are independent operational results.",
"0382.a":"Public HTTPS, SEO baseline and accessible shared viewer are separate historic results.",
"0383.a":"Explicit planned status prevents any false analytics implementation claim.",
"0383.b":"Names docs/analytics.md as the substantive rule reference.",
"0383.c":"Makes ANALYTICS 0–8 in the Ausbauplan the only active Analytics work list.",
"0383.d":"VanVenture owns the API, policy, event/property meaning and content IDs.",
"0383.e":"Umami is only the initial replaceable adapter, not a component dependency.",
"0383.f":"Keeps Cockpit YouTube, Search Console and possible Cloudflare monitoring separate.",
"0383.g":"Future dynamic published pages depend on CMS 3.",
"0383.h":"Permits Analytics 0–5 to begin on current public pages without waiting for CMS 3.",
"0384.a":"Each ANALYTICS n.m identifier is an independently acceptable story.",
"0384.b":"Done requires implementation and reproducible checks; productive work adds commit/push/live/report.",
"0384.c":"Production release evidence is an inseparable condition of the Done rule in SRC-0384.b.",
"0384.d":"Epic completion requires completion of all its stories.",
"0384.e":"Final story of a stage must state the visible result.",
"0384.f":"Open decisions and external dependencies must remain visibly open.",
"0384.g":"Optional later expansion cannot be silently pulled forward.",
}
splits = {
"SRC-0373.a":[
 ("SRC-0373.a1","Private editor and Cockpit enforce roles.","Role gate is independently testable."),
 ("SRC-0373.a2","Private editor and Cockpit enforce sessions.","Session gate is independently testable."),
 ("SRC-0373.a3","Private editor and Cockpit enforce CSRF protection.","CSRF boundary is independently testable."),
 ("SRC-0373.a4","Private editor and Cockpit send noindex.","Indexing control is independently testable."),
 ("SRC-0373.a5","Private editor and Cockpit send no-store.","Caching control is independently testable."),
],
"SRC-0374.a":[
 ("SRC-0374.a1","Google/YouTube connection tokens are encrypted.","Token encryption is independently testable."),
 ("SRC-0374.a2","Manual and scheduled sync exist.","Both sync modes are separately observable as one requested capability."),
 ("SRC-0374.a3","Database lock prevents overlapping sync.","Concurrency guard is independently testable."),
 ("SRC-0374.a4","Connection and sync are monitored.","Monitoring evidence is separately checkable."),
 ("SRC-0374.a5","Connection and sync create an audit log.","Audit trail is separately checkable."),
 ("SRC-0374.a6","Connection and sync have automated tests.","Automated protection is separately checkable."),
],
"SRC-0376.a":[
 (f"SRC-0376.a{i}",text,f"The existing {name} surface is independently observable.")
 for i,(text,name) in enumerate([
  ("Dashboard exists.","Dashboard"),("Video list exists.","video list"),
  ("Content Planner exists.","Content Planner"),("Master Context exists.","Master Context"),
  ("Rule-based basic Insights exist.","Insights")],1)],
"SRC-0379.a":[
 ("SRC-0379.a1","VAN Hymer long-term test is validated in live Planner.","VAN validation is its own content origin."),
 ("SRC-0379.a2","EXPLORE California-to-Hymer test is validated in live Planner.","EXPLORE validation is distinct from VAN."),
 ("SRC-0379.a3","MOVE bike or kayak Basecamp test is validated in live Planner.","MOVE validation is distinct from the vehicle tests."),
],
"SRC-0380.a":[
 ("SRC-0380.a1","Low-effort creator system has before/during/after checklist.","Checklist is separately inspectable."),
 ("SRC-0380.a2","Low-effort creator system has a fixed reuse workflow.","Reuse workflow is separately inspectable."),
 ("SRC-0380.a3","Planner keeps estimated and actual hours.","Hours are independently checkable Planner data."),
],
"SRC-0381.a":[
 ("SRC-0381.a1","Production release check exists.","Release gate is separately checkable."),
 ("SRC-0381.a2","Protected database dump exists.","Dump safeguard is separately checkable."),
 ("SRC-0381.a3","Cockpit tables passed a restore test.","Restore success is separately checkable."),
],
"SRC-0382.a":[
 ("SRC-0382.a1","Public website uses HTTPS.","HTTPS is separately observable."),
 ("SRC-0382.a2","Public website has an SEO baseline.","SEO baseline is separately verifiable."),
 ("SRC-0382.a3","Public website has one shared keyboard-accessible photo viewer.","Accessible shared viewer is separately verifiable."),
],
}
merges = {"SRC-0384.c":"SRC-0384.b"}
context = {"SRC-0383.a"}
story_target = {
**{f"SRC-0373.a{i}":"ST-AUTH-01" for i in range(1,6)},
**{f"SRC-0374.a{i}":"ST-INS-01" for i in range(1,7)},
"SRC-0375.a":"ST-INS-01",
**{f"SRC-0376.a{i}":"ST-INS-01" for i in range(1,6)},
"SRC-0377.a":"ST-INS-01","SRC-0378.a":"ST-INS-01","SRC-0378.b":"ST-INS-01",
"SRC-0379.a1":"ST-CON-01","SRC-0379.a2":"ST-CON-02","SRC-0379.a3":"ST-CON-03",
"SRC-0380.a1":"ST-CON-01","SRC-0380.a2":"ST-CON-01","SRC-0380.a3":"ST-INS-05",
**{f"SRC-0381.a{i}":"ST-OPS-01" for i in range(1,4)},
"SRC-0382.a1":"ST-SEO-01","SRC-0382.a2":"ST-SEO-01","SRC-0382.a3":"ST-WEB-01",
}

def update_catalog():
    changes = {
      "ST-AUTH-01":("Historisch abgenommen sind Rollen, Sitzungen und CSRF-Schutz für private Redaktion und Cockpit sowie noindex und no-store; diese Schutzgrenzen bleiben bei jeder Änderung bindend.",["SRC-0373"]),
      "ST-INS-01":("Der historische Bestand umfasst verschlüsselte Google-/YouTube-Verbindung, manuellen und zeitgesteuerten Sync mit Datenbanksperre, Monitoring, Audit-Log und automatisierten Tests. Der erste Import umfasste 25 Videos, 33 Kanal-Tageswerte, 825 Video-Tageswerte und alle damals fälligen Snapshots. Dashboard, Video-Liste, Content Planner, Master Context und regelbasierte Basis-Insights bestehen; der Format-/Content-Audit erfasste 2 aktuelle Shorts, 4 Legacy-Clips und 19 Longforms samt Keep-/Repackage-/Nicht-weiterverfolgen-Entscheidungen. Audit-Export V2 ist geschützt; anonyme Zugriffe auf seinen Endpunkt werden abgewiesen. Diese historischen Ergebnisse werden nicht neu implementiert.",["SRC-0374","SRC-0375","SRC-0376","SRC-0377","SRC-0378"]),
      "ST-CON-01":("Der VAN-Test mit Hymer-Langzeiterfahrung ist im Live-Planner als validated erfasst; die bestehende Vorher-/Währenddessen-/Danach-Checkliste und der Wiederverwendungsablauf werden nicht neu geplant.",["SRC-0379","SRC-0380"]),
      "ST-CON-02":("Der EXPLORE-Test California zu Hymer ist im Live-Planner als validated erfasst; der ausstehende Brief bleibt offen.",["SRC-0379"]),
      "ST-CON-03":("Der MOVE-Test Bike oder Kajak/Basecamp ist im Live-Planner als validated erfasst; der ausstehende Brief bleibt offen.",["SRC-0379"]),
      "ST-INS-05":("Der bestehende Planner hält geschätzte und tatsächliche Produktionsstunden getrennt fest.",["SRC-0380"]),
      "ST-OPS-01":("Historisch nachgewiesen sind Produktions-Release-Check, geschützter Datenbankdump und erfolgreicher Restoretest der Cockpit-Tabellen; Wiederholungen bleiben eigene offene Arbeit.",["SRC-0381"]),
      "ST-SEO-01":("Die öffentliche Website nutzt HTTPS; der historische SEO-Basisstand bleibt als bestehend gekennzeichnet.",["SRC-0382"]),
      "ST-WEB-01":("Der gemeinsame Foto-Viewer ist historisch tastaturbedienbar abgenommen; aktuelle Seitenergänzungen benötigen ihre eigene Prüfung.",["SRC-0382"]),
    }
    lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
    out, changed = [], set()
    for line in lines:
        if line.lstrip().startswith('{"id"'):
            item = json.loads(line.strip().rstrip(","))
            if item["id"] in changes:
                ac, refs = changes[item["id"]]
                assert ac not in item["acceptance"]
                item["acceptance"] += " " + ac
                item["sources"] = list(dict.fromkeys(item["sources"] + refs))
                line = "    " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) + (",\n" if line.rstrip().endswith(",") else "\n")
                changed.add(item["id"])
        out.append(line)
    assert changed == set(changes)
    CATALOG.write_text("".join(out), encoding="utf-8")
    return {item["id"] for item in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"]}

package = [row for row in rows if 373 <= int(row["SourceID"][4:]) <= 384 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 26, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
for number in range(373,385):
    sid = f"SRC-{number:04}"
    assert " ".join(row["Clause"] for row in package if row["SourceID"] == sid) == sources[sid]["OriginalText"], sid
    assert sources[sid]["OriginalText"] in " ".join(SOURCE.read_text(encoding="utf-8").split()), sid
stories = update_catalog()
assert all(x in stories for x in story_target.values())

def target(aid, sid):
    story = story_target.get(aid)
    rule = f"constraint-register.md#{sid.lower()}" if matrix[sid]["Coverage"] == "Rule / Constraint" else ""
    return ",".join(filter(None,[f"{story}#Acceptance-Criteria" if story else "",rule]))

for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    row.update(ReviewPackage="PKG-007", ReviewedSourceSHA256=sha, ReviewReason=reasons[aid[4:]],
               OpenQuestion="", BlockCoverageCheck="Complete canonical plan block reread; original clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-007")
    if aid in splits:
        successors = ",".join(child[0] for child in splits[aid])
        row.update(ReviewClassification="Split parent", RequirementID="", SuccessorIDs=successors,
                   RequirementText="", ConcreteTarget=successors, PlanningCoverage="Split",
                   SemanticResult="Independent historic outcomes and safeguards traced to successors")
    elif aid in merges:
        row.update(ReviewClassification="Merged condition", RequirementID=merges[aid], SuccessorIDs=merges[aid],
                   RequirementText="", ConcreteTarget=merges[aid], PlanningCoverage="Merged",
                   SemanticResult="Production condition retained in canonical Done rule")
    elif aid in context:
        row.update(ReviewClassification="Context / status", RequirementID="", SuccessorIDs="",
                   RequirementText="", ConcreteTarget=target(aid,sid), PlanningCoverage="Context",
                   SemanticResult="No implementation inferred from planned status")
    else:
        story = aid in story_target
        canonical_text = row["Clause"] + (" " + next(item["Clause"] for item in package if item["AtomicID"] == "SRC-0384.c") if aid == "SRC-0384.b" else "")
        row.update(ReviewClassification="Functional requirement" if story else "Project rule / constraint",
                   RequirementID=aid, SuccessorIDs="", RequirementText=canonical_text,
                   ConcreteTarget=target(aid,sid), PlanningCoverage="Covered" if story else "Rule / Constraint",
                   SemanticResult="Concrete historic Story criterion or binding rule checked")
for parent, children in splits.items():
    for aid, clause, reason in children:
        row = dict(next(item for item in package if item["AtomicID"] == parent))
        row.update(AtomicID=aid, Clause=clause, ReviewClassification="Functional requirement",
                   RequirementID=aid, SuccessorIDs="", RequirementText=clause,
                   ConcreteTarget=target(aid,row["SourceID"]), PlanningCoverage="Covered",
                   SemanticResult="Independent successor checked against complete original block",ReviewReason=reason)
        rows.append(row)
assert len({row["AtomicID"] for row in rows}) == len(rows)
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-007: 12 relevant blocks, 26 original candidates including 15 recovered, {sum(map(len,splits.values()))} successors; SHA-256 {sha}")
