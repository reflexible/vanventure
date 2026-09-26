"""Record semantic review of README/CONTRIBUTING blocks SRC-0040–0064.

Every classification and reason below follows a full-block human review. The
script checks source identity and writes those decisions; it does not infer them.
"""

import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
CATALOG = MIG / "story-catalog.json"
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}
hashes = {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
          for name in ("README.md", "CONTRIBUTING.md")}

# Exact, individual conclusions from the complete original blocks.
reasons = {
"0040.a":"Historical production-location status, not a request to deploy it again.",
"0040.b":"Historical GitHub Pages publication context, not an active feature request.",
"0040.c":"Names ausbauplan.md as the controlling priorities and phases source.",
"0040.d":"Points SEO and live-operation decisions to docs/seo.md.",
"0041.a":"Makes the mandate, responsive specification and approved design guide applicable to web/image work.",
"0041.b":"Requires documentation, checks, approval and live verification to remain distinct.",
"0042.a":"Number 1 is list punctuation and adds no obligation.",
"0042.b":"Current vehicle facts and photos are two independently checkable publication outcomes.",
"0043.a":"Number 2 is list punctuation and adds no obligation.",
"0043.b":"A travel report must include route, map, cost and pitch information; each is independently checkable.",
"0044.a":"Number 3 is list punctuation and adds no obligation.",
"0044.b":"A real equipment list and optional affiliate disclosure are distinct checkable duties.",
"0045.a":"Number 4 is list punctuation and adds no obligation.",
"0045.b":"Contact email, imprint and privacy statement are three independently testable public results.",
"0046.a":"Number 5 is list punctuation and adds no obligation.",
"0046.b":"Production OAuth is gated by legal texts, domain confirmation and required scope verification.",
"0047.a":"Number 6 is list punctuation and adds no obligation.",
"0047.b":"Private family Scrum board is a distinct planned outcome.",
"0047.c":"Explicitly keeps the existing Content Planner separate from the family board.",
"0048.a":"Records already accepted shared login and a dedicated least-privilege OAuth client; no reimplementation.",
"0048.b":"Records verified allowed-account sign-in and disallowed-account rejection.",
"0048.c":"Protects the separate YouTube connection from the shared-login change.",
"0049.a":"Records existing GCS brief and its 24-hour estimate; not a new brief task.",
"0049.b":"Records ten verified GCS facts already held in Master Context.",
"0049.c":"Leaves EXPLORE and MOVE test briefs open in the controlling plan.",
"0050.a":"Records editorial language switching on kayak, equipment and bike pages.",
"0050.b":"EN and return-to-DE live check is historical verification, not a new rollout.",
"0051.a":"Instructions for viewing local index.html are usage context rather than product work.",
"0051.b":"Requires express approval before any publication/external change, conflicting with AGENTS default rollout.",
"0052.a":"Records Docker/PostgreSQL deployment architecture for homepage and protected editor.",
"0052.b":"Records protected editor route; it is not a new route request.",
"0052.c":"Names Codex chat as commissioning channel, a working-process constraint.",
"0052.d":"Permits direct live changes on user task, conflicting with current mandatory local-first workflow.",
"0052.e":"Allows a short restart but does not require one; current affected-service restriction still applies.",
"0052.f":"Identifies server database as authoritative; no copy should replace it casually.",
"0052.g":"Local Docker stack/volume status is historical context, not an instruction to alter it.",
"0052.h":"References editor/README.md as technical source, without adding a separate duty.",
"0053.a":"Conditional legacy GitHub Pages release exports approved DB reports and rebuilds static pages.",
"0053.b":"Docker and Python are prerequisites only for that conditional export.",
"0053.c":"DOCKER_BIN/PYTHON_BIN are optional environment overrides, not separate work.",
"0053.d":"Prohibits committing secrets, dumps, originals and private analysis.",
"0054.a":"Makes docs/betrieb.md checks binding for private-server releases.",
"0054.b":"States the check:release test/config/dump/health sequence; compare with conditional dump rule.",
"0054.c":"Describes redacted monitor:cockpit status for server monitoring.",
"0055.a":"Defines main as production branch for the no-direct-work rule.",
"0055.b":"Prohibits direct work on production main.",
"0056.a":"Requires one focused branch per change.",
"0057.a":"Specifies feature branch prefix for new capabilities.",
"0058.a":"Specifies fix branch prefix for bug fixes.",
"0059.a":"Specifies content branch prefix for website content.",
"0060.a":"Specifies chore branch prefix for maintenance/tooling.",
"0061.a":"Requires updating local main before creating a branch.",
"0062.a":"Command example implements the preceding branch update rule; no additional obligation.",
"0063.a":"Number 1 is list punctuation and adds no obligation.",
"0063.b":"Requires each change to stay focused and reversible.",
"0064.a":"Number 2 is list punctuation and adds no obligation.",
"0064.b":"Requires local website check before commit.",
}
splits = {
"SRC-0042.b":[
 ("SRC-0042.b1","Aktuelle Fahrzeugdaten auf der Fahrzeugseite.","Vehicle facts require sourced, current public content."),
 ("SRC-0042.b2","Aktuelle freigegebene Fahrzeugfotos auf der Fahrzeugseite.","Vehicle photos require separate visual and rights approval."),
],
"SRC-0043.b":[
 ("SRC-0043.b1","Reiseberichte mit belegten Routen.","Routes are separately checkable narrative content."),
 ("SRC-0043.b2","Reiseberichte mit passenden belegten Karten.","Maps are separately checkable visual/route content."),
 ("SRC-0043.b3","Reiseberichte mit belegten Kosten.","Costs require independent factual support."),
 ("SRC-0043.b4","Reiseberichte mit belegten Stellplätzen.","Pitches are independently checkable trip content."),
],
"SRC-0044.b":[
 ("SRC-0044.b1","Eine echte, belegte Ausrüstungsliste anbieten.","The equipment list is a distinct visitor outcome."),
 ("SRC-0044.b2","Mögliche Affiliate-Links als solche kennzeichnen.","Affiliate disclosure is independently checkable when such a link exists."),
],
"SRC-0045.b":[
 ("SRC-0045.b1","Eine öffentliche Kontakt-E-Mail anbieten.","Public contact address is an independent legal/contact result."),
 ("SRC-0045.b2","Ein öffentliches Impressum bereitstellen.","Imprint availability is separately checkable."),
 ("SRC-0045.b3","Eine öffentliche Datenschutzerklärung bereitstellen.","Privacy statement availability is separately checkable."),
],
}
context = {"0040.a","0040.b","0042.a","0043.a","0044.a","0045.a","0046.a","0047.a",
           "0051.a","0052.g","0052.h","0062.a","0063.a","0064.a"}
conflict = {
"0051.b":"Does express prepublication approval in README/CONTRIBUTING remain mandatory despite AGENTS default live rollout? Recommendation: retain the explicit approval gate until reconciled.",
"0052.d":"Does the older direct-live permission survive the newer AGENTS local-first mandate? Recommendation: current AGENTS local-first governs and README wording is superseded, but source decision must be recorded.",
}
story_target = {
"SRC-0042.b1":"ST-SEO-07", "SRC-0042.b2":"ST-PHOTO-03",
**{f"SRC-0043.b{n}":"ST-SEO-04,ST-SEO-05,ST-SEO-06" for n in range(1,5)},
"SRC-0044.b1":"ST-WEB-06", "SRC-0044.b2":"ST-WEB-06",
**{f"SRC-0045.b{n}":"ST-WEB-07" for n in range(1,4)},
"SRC-0046.b":"ST-OPS-02", "SRC-0047.b":"ST-BRD-01", "SRC-0047.c":"ST-BRD-01",
"SRC-0048.a":"ST-AUTH-01", "SRC-0048.b":"ST-AUTH-01", "SRC-0048.c":"ST-AUTH-01",
"SRC-0049.a":"ST-CON-01", "SRC-0049.b":"ST-CON-01",
"SRC-0049.c":"ST-CON-02,ST-CON-03", "SRC-0050.a":"ST-WEB-01", "SRC-0050.b":"ST-WEB-01",
"SRC-0054.a":"ST-OPS-01", "SRC-0054.b":"ST-OPS-01", "SRC-0054.c":"ST-OPS-01",
}

def update_catalog():
    lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
    changes = {
      "ST-SEO-07":("Aktuelle Fahrzeugdaten beruhen auf belegten, freigegebenen Fakten; Fotos werden getrennt geprüft.",["SRC-0042"]),
      "ST-PHOTO-03":("Aktuelle Fahrzeugfotos werden nur mit belegter Herkunft und Motivfreigabe verwendet.",["SRC-0042"]),
      "ST-SEO-04":("Routen, Karten, Kosten und Stellplätze des Berichts sind jeweils belegbar; fehlende Angaben bleiben offen statt erfunden zu werden.",["SRC-0043"]),
      "ST-SEO-05":("Routen, Karten, Kosten und Stellplätze des Berichts sind jeweils belegbar; fehlende Angaben bleiben offen statt erfunden zu werden.",["SRC-0043"]),
      "ST-SEO-06":("Routen, Karten, Kosten und Stellplätze des Berichts sind jeweils belegbar; fehlende Angaben bleiben offen statt erfunden zu werden.",["SRC-0043"]),
      "ST-BRD-01":("Das private Familien-Board bleibt vom bestehenden Content Planner fachlich und datenmäßig getrennt.",["SRC-0047"]),
      "ST-AUTH-01":("Historisch live geprüft sind ein eigener minimal berechtigter OAuth-Webclient, Anmeldung eines freigegebenen und Ablehnung eines nicht freigegebenen Kontos; der separate YouTube-Zugang bleibt erhalten.",["SRC-0048"]),
      "ST-CON-01":("Der bestehende GCS-Brief mit 24 geschätzten Stunden und zehn geprüften Master-Context-Fakten wird nicht neu eingeplant.",["SRC-0049"]),
      "ST-CON-02":("Der EXPLORE-Test-Brief bleibt als offene Arbeit ausgewiesen.",["SRC-0049"]),
      "ST-CON-03":("Der MOVE-Test-Brief bleibt als offene Arbeit ausgewiesen.",["SRC-0049"]),
      "ST-WEB-01":("Auf Kajak/Riverstar-, Ausrüstungs- und Radseiten werden auch redaktionelle Inhalte mit EN und Rückwechsel zu DE korrekt umgeschaltet; der frühere Live-Test bleibt historischer Nachweis.",["SRC-0050"]),
      "ST-OPS-01":("Für private Server-Releases gelten docs/betrieb.md und die einschlägigen Prüfungen; check:release umfasst Tests, Konfigurationsprüfung, Dump und Healthcheck, monitor:cockpit liefert gekürzten Status.",["SRC-0054"]),
      "ST-OPS-02":("Die Produktionsfreigabe erfolgt erst nach geprüften Rechtstexten, Domainbestätigung und erforderlicher Scope-Verifizierung.",["SRC-0046"]),
    }
    new_stories = [
      {"id":"ST-WEB-06","epic":"EPIC-WEB","story":"Als Besucher finde ich eine echte Liste der verwendeten Ausrüstung mit erkennbaren Affiliate-Links, damit ich Empfehlungen einordnen kann.","valueType":"User Value","priority":"P2","status":"Planned","dependencies":"Belegte Ausrüstung und Linkprüfung; redaktionelle Freigabe","acceptance":"Die Ausrüstungsliste enthält nur tatsächlich belegte Gegenstände; jeder vorhandene Affiliate-Link ist vor dem Klick klar gekennzeichnet. Ohne Affiliate-Link wird keine Partnerschaft behauptet.","sources":["SRC-0044"]},
      {"id":"ST-WEB-07","epic":"EPIC-WEB","story":"Als Besucher finde ich Kontaktadresse, Impressum und Datenschutzerklärung, damit ich Anbieter und Datenverarbeitung nachvollziehen kann.","valueType":"User Value","priority":"P1","status":"Planned","dependencies":"Rechtliche Prüfung und Freigabe; ST-OPS-02 nutzt die freigegebenen URLs","acceptance":"Kontakt-E-Mail, Impressum und Datenschutzerklärung sind öffentlich erreichbar, inhaltlich geprüft und ausdrücklich freigegeben; fehlende Rechtstexte werden nicht als fertig markiert.","sources":["SRC-0045"]},
    ]
    ids = {json.loads(line.strip().rstrip(","))["id"] for line in lines if line.lstrip().startswith('{"id"')}
    assert all(story["id"] not in ids for story in new_stories)
    out = []
    for line in lines:
        if line.lstrip().startswith('{"id"'):
            item = json.loads(line.strip().rstrip(","))
            if item["id"] in changes:
                ac, source_ids = changes[item["id"]]
                assert ac not in item["acceptance"]
                item["acceptance"] += " " + ac
                item["sources"] = list(dict.fromkeys(item["sources"] + source_ids))
                line = "    " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) + (",\n" if line.rstrip().endswith(",") else "\n")
            out.append(line)
            if item["id"] == "ST-WEB-05":
                out.extend("    " + json.dumps(story, ensure_ascii=False, separators=(",", ":")) + ",\n" for story in new_stories)
        else:
            out.append(line)
    CATALOG.write_text("".join(out), encoding="utf-8")
    return {story["id"]: story for story in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"]}

package = [row for row in rows if 40 <= int(row["SourceID"][4:]) <= 64 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 57, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
by_id = {row["AtomicID"]: row for row in package}
by_source = defaultdict(list)
for row in package:
    by_source[row["SourceID"]].append(row)
assert len(by_source) == 25
for sid, group in by_source.items():
    source = sources[sid]
    assert " ".join(row["Clause"] for row in group) == source["OriginalText"], sid
    raw = (ROOT / source["Source"]).read_text(encoding="utf-8-sig")
    assert source["OriginalText"] in " ".join(raw.split()), sid
stories = update_catalog()
assert all(all(x in stories for x in ids.split(",")) for ids in story_target.values())

def concrete_target(aid, sid):
    story = story_target.get(aid, "")
    return ",".join([*(f"{x}#Acceptance-Criteria" for x in story.split(",") if x),
                     f"constraint-register.md#{sid.lower()}"])

for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    key = aid[4:]
    row.update(ReviewPackage="PKG-003", ReviewedSourceSHA256=hashes[row["Source"]],
               ReviewReason=reasons[key], OpenQuestion="",
               BlockCoverageCheck="Full source block and file context reread; candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-003")
    if aid in splits:
        children = ",".join(child[0] for child in splits[aid])
        row.update(ReviewClassification="Split parent", RequirementID="", SuccessorIDs=children,
                   RequirementText="", ConcreteTarget=children, PlanningCoverage="Split",
                   SemanticResult="Distinct outcomes retained as stable successor IDs")
    elif key in context:
        row.update(ReviewClassification="Context / historical status", RequirementID="", SuccessorIDs="",
                   RequirementText="", ConcreteTarget=f"constraint-register.md#{sid.lower()}",
                   PlanningCoverage="Context", SemanticResult="No additional prospective requirement")
    elif key in conflict:
        row.update(ReviewClassification="Conflicting rule", RequirementID=aid, SuccessorIDs="",
                   RequirementText=row["Clause"], ConcreteTarget=concrete_target(aid,sid),
                   PlanningCoverage="Unresolved", SemanticResult="Source-preserved rule conflicts with AGENTS.md",
                   OpenQuestion=conflict[key])
    else:
        is_story = aid in story_target
        row.update(ReviewClassification="Functional requirement" if is_story else "Project rule / constraint",
                   RequirementID=aid, SuccessorIDs="", RequirementText=row["Clause"],
                   ConcreteTarget=concrete_target(aid,sid),
                   PlanningCoverage="Covered" if is_story else "Rule / Constraint",
                   SemanticResult="Story acceptance or exact rule checked against full source")
for parent, children in splits.items():
    for aid, clause, reason in children:
        child = dict(by_id[parent])
        child.update(AtomicID=aid, Clause=clause, ReviewClassification="Functional requirement",
                     RequirementID=aid, SuccessorIDs="", RequirementText=clause,
                     ConcreteTarget=concrete_target(aid, child["SourceID"]),
                     PlanningCoverage="Covered", SemanticResult="Independent successor checked against complete list item",
                     ReviewReason=reason)
        rows.append(child)
assert len({row["AtomicID"] for row in rows}) == len(rows)
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-003: 25 source blocks, 57 original candidates, 11 successors; hashes {hashes}")
