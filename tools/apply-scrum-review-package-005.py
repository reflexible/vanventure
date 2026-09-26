"""Record manual semantic review of analytics source blocks SRC-0348–0354."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
CATALOG = MIG / "story-catalog.json"
SOURCE = ROOT / "docs/analytics.md"
sha = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}

reasons = {
"0348.a":"First fragment of the document date; not a requirement.",
"0348.b":"Completes the date, without adding a duty.",
"0348.c":"States commissioned/documented status and must not be read as implemented.",
"0348.d":"Separates open analysis/implementation/live checks and names the single active plan.",
"0348.e":"Identifies this detailed document as the user's substantive analytics reference.",
"0348.f":"Defers concrete paths and operating decisions until ANALYTICS 0 analysis.",
"0349.a":"All named public/CMS surfaces must call only the central VanVenture API.",
"0349.b":"VanVenture owns event meaning independent of a vendor.",
"0349.c":"Forbids each named provider API outside its adapter.",
"0349.d":"Makes provider selection a central configuration decision.",
"0349.e":"Requires Null and initially Umami adapters, a bounded implementation choice.",
"0349.f":"Requires later adapter substitution without content-component edits.",
"0349.g":"Allows limited parallel migration but forbids it as the normal mode.",
"0350.a":"Preimplementation inventory covers every listed architecture, environment, privacy and rule area.",
"0350.b":"Requires documented baseline, integration points, conflicts, reuse, file layout and changes.",
"0350.c":"Forbids replacement by a parallel architecture.",
"0351.a":"The six listed conditions form one conjunctive gate for any tracking.",
"0351.b":"Logged-in admins and editors remain untracked even on otherwise public pages.",
"0351.c":"Excludes drafts, scheduled content, tests, localhost and development.",
"0351.d":"Defaults staging tracking to off.",
"0351.e":"Exclusion means no provider request and, where technically possible, no external script load.",
"0351.f":"Null adapter must neither transmit nor store data.",
"0351.g":"Provider, enablement and Umami settings are central environment configuration.",
"0351.h":"Secrets must remain out of Git, browser code and documentation.",
"0352.a":"Core order is policy, schema, sensitive-data removal, URL/context normalization, then adapter.",
"0352.b":"Forbids Identify and personal visitor profiles.",
"0352.c":"VanVenture owns page_view emission and must disable duplicate automatic Umami views.",
"0353.a":"Event naming requires stable unique lower-case English snake_case identifiers.",
"0353.b":"Every event carries schema_version 1 in the initial contract.",
"0353.c":"Material schema changes require version increment.",
"0353.d":"Retaining old names where possible qualifies version evolution.",
"0353.e":"Only central names/properties are accepted, never arbitrary component/user strings.",
"0353.f":"Unknown properties are rejected or discarded.",
"0353.g":"Values have type and length limits.",
"0354.a":"Defines the first allowed event vocabulary; inclusion does not demand simultaneous instrumentation of every action.",
"0354.b":"Gallery-image event is conditional on demonstrated value and manageable volume.",
"0354.c":"Read-depth events are article-only and at most once per page view.",
"0354.d":"Forbids per-step scroll, swipe, hover and mouse-move telemetry.",
"0354.e":"Video start requires an actually detectable start.",
"0354.f":"YouTube embed and consent require separate examination before video tracking.",
}
context = {"0348.a","0348.b","0348.c","0348.d","0348.e"}
story_target = {
**{f"SRC-0349.{s}":"ST-AN-01" for s in "abcde"},
"SRC-0349.f":"ST-AN-06","SRC-0349.g":"ST-AN-06",
**{f"SRC-0350.{s}":"ST-AN-01" for s in "abc"},
**{f"SRC-0351.{s}":"ST-AN-01" for s in "abcdefgh"},
**{f"SRC-0352.{s}":"ST-AN-01" for s in "abc"},
**{f"SRC-0353.{s}":"ST-AN-01" for s in "abcdefg"},
**{f"SRC-0354.{s}":"ST-AN-04" for s in "bcdef"},
}

def update_catalog():
    changes = {
      "ST-AN-01":("Vor der ersten Implementierung sind Routing, Generatoren, vorhandenes Tracking, Rollen, Content- und Publish-Status, Umgebungen, Datenbank, Docker, CSP, Tests, Datenschutz und Projektregeln analysiert; Bestand, Integrationspunkte, Konflikte, Wiederverwendung, Dateistruktur und Änderungen sind dokumentiert. Die bestehende Architektur wird erweitert. Tracking erfordert gleichzeitig Production, öffentliche Website, anonymen Besucher, Published-Inhalt, keinen Preview/CMS/Admin-Bereich und zentrale Aktivierung; angemeldete Admins/Editoren bleiben auch auf öffentlichen Seiten ausgeschlossen. Der Null-Adapter sendet und speichert nichts. Provider, Aktivierung und Umami werden zentral per Environment gesteuert; Secrets bleiben aus Git, Browser-Code und Dokumentation. Der Core prüft Policy und zentral definierte Eventnamen/Properties, entfernt sensible Daten und normalisiert URL/Kontext vor dem Adapter. Ereignisnamen sind stabil, eindeutig, englisch, klein und snake_case; anfangs trägt jedes Event schema_version 1, grundlegende Änderungen erhöhen die Version bei möglichst stabilen Namen. Unbekannte Properties werden verworfen oder abgelehnt; Werte haben Typ- und Längengrenzen.",["SRC-0349","SRC-0350","SRC-0351","SRC-0352","SRC-0353"]),
      "ST-AN-04":("gallery_image_view wird nur bei belegtem Nutzen und vertretbarem Volumen aktiviert. article_50_percent und article_90_percent gelten nur für passende Artikel und je Page View einmal; kein Event je Scrollschritt, Swipe, Hover oder Mausbewegung. video_start erfordert einen tatsächlich erkennbaren Start; YouTube-Embed und Consent sind zuvor gesondert geprüft.",["SRC-0354"]),
      "ST-AN-06":("Matomo, GA4 oder eine eigene Lösung können später per Adapter ohne Änderung an Content-Komponenten gewählt werden. Ein zeitlich begrenzter Parallelbetrieb ist nur Migrationsoption, kein Standardbetrieb.",["SRC-0349"]),
    }
    lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
    out = []
    changed = set()
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

package = [row for row in rows if 348 <= int(row["SourceID"][4:]) <= 354 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 40, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
for number in range(348,355):
    sid = f"SRC-{number:04}"
    assert " ".join(row["Clause"] for row in package if row["SourceID"] == sid) == sources[sid]["OriginalText"], sid
    assert sources[sid]["OriginalText"] in " ".join(SOURCE.read_text(encoding="utf-8").split()), sid
stories = update_catalog()
assert all(x in stories for x in story_target.values())
for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    is_context = aid[4:] in context
    is_story = aid in story_target
    row.update(ReviewPackage="PKG-005", ReviewedSourceSHA256=sha,
               ReviewReason=reasons[aid[4:]], OpenQuestion="",
               BlockCoverageCheck="Complete analytics source block and surrounding document reread; candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-005",
               ReviewClassification="Context / historical status" if is_context else ("Functional requirement" if is_story else "Project rule / constraint"),
               RequirementID="" if is_context else aid, SuccessorIDs="",
               RequirementText="" if is_context else row["Clause"],
               ConcreteTarget=",".join(filter(None,[f"{story_target[aid]}#Acceptance-Criteria" if is_story else "",f"constraint-register.md#{sid.lower()}"])),
               PlanningCoverage="Context" if is_context else ("Covered" if is_story else "Rule / Constraint"),
               SemanticResult="No new prospective obligation" if is_context else "Concrete acceptance or binding rule checked against full source")
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-005: 7 source blocks, 40 candidates; SHA-256 {sha}")
