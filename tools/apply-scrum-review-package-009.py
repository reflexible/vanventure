"""Review ANALYTICS 3.3–8.1 source blocks SRC-0398–0414."""
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

reasons = {
"0398.a":"ANALYTICS 3.3 adds all existing public page types and languages through shared entry points.",
"0398.b":"Caps each page view at one event.",
"0398.c":"Keeps private routes outside tracking.",
"0398.d":"Comparable published-page traffic without content-local analytics is the distinct value outcome.",
"0399.a":"ANALYTICS 3.4 waits for CMS 3 and measures only Published revision via the same entry point.",
"0399.b":"Working revision and private preview must load no analytics script or request.",
"0399.c":"New public CMS pages require no tracking snippets in content.",
"0399.d":"CMS 3 is a dependency, but this work does not block ANALYTICS 4–8.",
"0401.a":"ANALYTICS 4.1 names four outbound events, shared links/CTAs and allowed destination_type.",
"0401.b":"Shows which content sends visitors to video, social and equipment destinations.",
"0401.c":"Provider failure must not break the outbound click or navigation.",
"0402.a":"ANALYTICS 4.2 names five distinct internal-orientation events at central appropriate surfaces.",
"0402.b":"One event per action holds also for keyboard and mobile interaction.",
"0402.c":"Analytics instrumentation must not alter gallery design or viewer.",
"0403.a":"Read-depth events are limited to suitable articles and once per page view.",
"0403.b":"Video start requires measurable playback; embed and consent are separately checked.",
"0403.c":"Gallery-image telemetry is conditional on value and manageable volume.",
"0403.d":"Read-interest value requires avoiding a flood of low-value events.",
"0405.a":"ANALYTICS 5.1 central helper generates and normalizes exactly four UTM keys.",
"0405.b":"Only short stable lowercase nonpersonal UTM values are permitted.",
"0405.c":"All named channels use one campaign ID for a given campaign.",
"0406.a":"ANALYTICS 5.2 combines sparse Goals with reports by page, language, source, campaign and content area.",
"0406.b":"Funnels are conditional on a concrete editorial question.",
"0406.c":"28-day review should support next content choice with documented numbers and data quality.",
"0408.a":"ANALYTICS 6.1 names the complete meaningful unit/integration suite for core, adapters and provider boundaries.",
"0409.a":"ANALYTICS 6.2 compares allowed public traffic with every excluded state for absence of script and request.",
"0409.b":"Live route, health, report, performance and privacy evidence must appear in acceptance report.",
"0409.c":"Reproducible proof of tracking boundaries is the acceptance outcome.",
"0411.a":"ANALYTICS 7.1 tests a local adapter switch with identical events/properties and no content edits.",
"0411.b":"A switch must require only configuration and adapter changes.",
"0412.a":"ANALYTICS 7.2 documents bounded optional parallel comparison across all named dimensions.",
"0412.b":"Mapping and shutdown of old provider are explicit migration steps.",
"0412.c":"The result prepares a later Matomo/GA4 switch, not an immediate deployment.",
"0412.d":"A second live provider is expressly excluded from this work.",
"0414.a":"ANALYTICS 8.1 evaluates value and effort for possible anonymous PostgreSQL daily aggregates only after real reports.",
"0414.b":"Limits hypothetical aggregate fields to the nine listed data elements.",
"0414.c":"Forbids IP, user ID, profiles and raw-event platform in that possible aggregate.",
"0414.d":"Requires a documented yes/no decision rather than automatic implementation.",
"0414.e":"Any implementation needs a separate later commission.",
}
target_by_source = {
398:"ST-AN-02",399:"ST-AN-08",401:"ST-AN-03",402:"ST-AN-09",
403:"ST-AN-04",405:"ST-AN-05",406:"ST-AN-05",408:"ST-AN-01",
409:"ST-AN-01",411:"ST-AN-06",412:"ST-AN-06",414:"ST-AN-07",
}
package = [row for row in rows if 398 <= int(row["SourceID"][4:]) <= 414 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 39, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
for number in range(398,415):
    sid = f"SRC-{number:04}"
    group = [row for row in package if row["SourceID"] == sid]
    if group:
        assert number in target_by_source and matrix[sid]["Relevant"] == "Yes"
        assert " ".join(row["Clause"] for row in group) == sources[sid]["OriginalText"], sid
    else:
        assert sid in {"SRC-0400","SRC-0404","SRC-0407","SRC-0410","SRC-0413"}
        assert matrix[sid]["Relevant"] == "No"
    assert sources[sid]["OriginalText"] in " ".join(SOURCE.read_text(encoding="utf-8").split()), sid

changes = {
"ST-AN-01":("Der Abschluss der Core-/Adapter-Stufe erfordert aussagekräftige Unit-/Integrationstests für Policy, Event-/Property-Validierung, Kontext, Content-IDs, URL/UTM, Providerwahl, Null/Umami-Mapping, Fehlerfall und das Verbot direkter Provider-APIs. E2E belegt erlaubtes anonymous/published und für Login, CMS, Draft, Planned, Preview, localhost, Development, Tests und Staging jeweils fehlendes Script und fehlende Anfrage. Der Abnahmebericht umfasst betroffene Live-Routen, /healthz, sichtbare Berichte, Performance und Datenschutzdokumentation.",["SRC-0408","SRC-0409"]),
"ST-AN-02":("Startseite, beide Sprachfassungen und alle vorhandenen öffentlichen Seitentypen werden über gemeinsame Einbindestellen und Generatoren erfasst, höchstens einmal je Page View. Private Routen bleiben ausgeschlossen; Traffic ist je Published-Seite ohne Analytics-Code in einzelnen Inhalten vergleichbar.",["SRC-0398"]),
"ST-AN-03":("youtube_click, instagram_click, facebook_click und gear_click entstehen nur an gemeinsamen Link-/CTA-Stellen mit erlaubtem destination_type; ausgehende Klicks und Navigation funktionieren auch bei Provider-Ausfall.",["SRC-0401"]),
"ST-AN-04":("Lesetiefenereignisse gelten nur für passende Artikel und einmal je Page View; video_start braucht messbaren Start und gesonderte Embed-/Consent-Prüfung. gallery_image_view bleibt aus, bis Nutzen und Volumen vertretbar belegt sind.",["SRC-0403"]),
"ST-AN-05":("Der UTM-Helper erzeugt/normalisiert die vier benannten Parameter nur mit kurzen, stabilen, kleingeschriebenen und nicht personenbezogenen Werten; Instagram, Facebook, YouTube und QR teilen je Kampagne eine ID. Umami-Goals bleiben ausgewählt; Berichte trennen Seiten, Sprachen, Quellen, Kampagnen und Content-Bereiche. Funnels werden nur für eine konkrete redaktionelle Frage eingerichtet; ein 28-Tage-Review nennt Zahlen und Datenqualitätsgrenzen.",["SRC-0405","SRC-0406"]),
"ST-AN-06":("Ein lokaler Testadapter liefert dieselben Pageviews, Events und Properties ohne Änderungen an Seiten, Templates, Generatoren, Galerien oder CMS-Komponenten. Der spätere Wechsel braucht nur Konfiguration und Adapter. Migrationsweg, zeitlich begrenzter optionaler Vergleich von Aufrufen, Events, Quellen, Kampagnen und Goals, Mapping und Abschaltung des alten Providers sind dokumentiert; ein zweiter Live-Provider wird hier nicht eingeführt.",["SRC-0411","SRC-0412"]),
"ST-AN-07":("Nach belastbaren Berichten wird Nutzen und Aufwand eigener anonymer Tagesaggregate mit begründetem Ja/Nein bewertet. Ein mögliches Schema umfasst nur Datum, Event, Content-ID, Content-Typ, Quelle, Medium, Kampagne, Sprache und Anzahl, niemals IP, User-ID, Profile oder Rohereignisplattform; Implementierung erfordert späteren Auftrag.",["SRC-0414"]),
}
new_stories = [
{"id":"ST-AN-08","epic":"EPIC-ANALYTICS","story":"Als Redakteur sehe ich Aufrufe neuer veröffentlichter CMS-Seiten ohne Eingriff in den Inhalt, damit auch spätere Seiten vergleichbar bleiben.","valueType":"Business Value","priority":"P2","status":"Planned","dependencies":"CMS 3 und ST-AN-01; blockiert ANALYTICS 4–8 nicht","acceptance":"Erst nach CMS 3 zählt nur die Published Revision über den gemeinsamen Analytics-Einstieg; Working Revision und geschützte Vorschau laden weder Script noch Netzwerkanfrage. Eine neue öffentliche CMS-Seite benötigt keinen Tracking-Code im Inhalt.","sources":["SRC-0399"]},
{"id":"ST-AN-09","epic":"EPIC-ANALYTICS","story":"Als Redakteurin erkenne ich, welche internen Wege Besucher nutzen, damit Navigation und Inhalte anhand echter Aktionen beurteilt werden können.","valueType":"Business Value","priority":"P2","status":"Planned","dependencies":"ST-AN-01; zentrale Komponenten und Routen","acceptance":"gallery_open, related_content_click, cta_click, language_switch und error_404_view werden nur an passenden zentralen Stellen erfasst. Jede Aktion erzeugt höchstens ein Event auch per Tastatur oder Mobilgerät; Galeriedesign und Foto-Viewer bleiben unverändert.","sources":["SRC-0402"]},
]
lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
existing_story_ids = {item["id"] for item in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"]}
out, changed = [], set()
for line in lines:
    if line.lstrip().startswith('{"id"'):
        item = json.loads(line.strip().rstrip(","))
        if item["id"] in changes:
            ac, refs = changes[item["id"]]
            if ac not in item["acceptance"]:
                item["acceptance"] += " " + ac
            item["sources"] = list(dict.fromkeys(item["sources"] + refs))
            if item["id"] == "ST-AN-03":
                if "SRC-0402" in item["sources"]:
                    item["sources"].remove("SRC-0402")
            line = "    " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) + ",\n"
            changed.add(item["id"])
        out.append(line)
        if item["id"] == "ST-AN-07" and "ST-AN-08" not in existing_story_ids:
            out.extend("    " + json.dumps(story, ensure_ascii=False, separators=(",", ":")) + ",\n" for story in new_stories)
    else:
        out.append(line)
assert changed == set(changes)
CATALOG.write_text("".join(out), encoding="utf-8")
stories = {item["id"] for item in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"]}
assert all(target in stories for target in target_by_source.values())
for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    story = target_by_source[int(sid[4:])]
    row.update(ReviewPackage="PKG-009",ReviewedSourceSHA256=sha,ReviewReason=reasons[aid[4:]],
               OpenQuestion="",BlockCoverageCheck="Complete canonical analytics item reread; candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-009",ReviewClassification="Functional requirement",
               RequirementID=aid,SuccessorIDs="",RequirementText=row["Clause"],
               ConcreteTarget=f"{story}#Acceptance-Criteria",PlanningCoverage="Covered",
               SemanticResult="Specific planned story criterion checked against source")
with ATOMS.open("w",encoding="utf-8-sig",newline="") as stream:
    writer = csv.DictWriter(stream,fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-009: 12 relevant blocks, 39 candidates; five headings confirmed context; SHA-256 {sha}")
