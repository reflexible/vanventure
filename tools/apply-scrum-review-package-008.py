"""Review canonical ANALYTICS 0–3.2 work items SRC-0385–0397."""
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
"0386.a":"ANALYTICS 0.1 requires a source-grounded inventory of every listed integration and rule area.",
"0386.b":"Acceptance requires sourced baseline and reusable integration points, not just an inventory assertion.",
"0387.a":"ANALYTICS 0.2 requires specific Umami hosting/access, retention, consent and CMS/Cockpit decisions.",
"0387.b":"Conflicts with existing rules must be decided before affected code, preserving the approval gate.",
"0387.c":"Acceptance describes a bounded feasible first release, not all analytics at once.",
"0387.d":"Forbids silently replacing any existing function during integration.",
"0389.a":"ANALYTICS 1.1 completes the single named technical specification across each listed contract/quality area.",
"0389.b":"Project rules must point to that one analytics specification.",
"0389.c":"Forbids a second active analytics specification.",
"0390.a":"ANALYTICS 1.2 reuses existing stable content identifiers.",
"0390.b":"Requires English snake_case schema v1 and bounded named properties for page_view and prioritized events.",
"0390.c":"Renaming a URL must preserve content identity.",
"0390.d":"Prohibits user-supplied free strings as event names.",
"0392.a":"ANALYTICS 2.1 exposes central pageView and track through the core.",
"0392.b":"Allows tracking only for anonymous public published production traffic.",
"0392.c":"Each listed private, draft and nonproduction state selects Null, including default Staging.",
"0392.d":"Acceptance requires no external script and no provider request, including logged-in public-page visits.",
"0393.a":"ANALYTICS 2.2 validates schema, bounds values, strips sensitive data and normalizes URLs/UTMs before transport.",
"0393.b":"Acceptance forbids names, email, user IDs, form/free text and auth fields in events.",
"0394.a":"ANALYTICS 2.3 centralizes provider selection/adapters and an architecture test against direct provider calls.",
"0394.b":"Null-core acceptance requires zero network access.",
"0394.c":"Content components must remain unaware of the analytics provider.",
"0396.a":"ANALYTICS 3.1 provides hosted/configured Umami with minimal CSP, async loading and resilient adapter mapping.",
"0396.b":"Explicitly disables Umami Identify.",
"0396.c":"Automatic Umami pageviews must be controlled so only VanVenture emits page_view.",
"0396.d":"Provider failure may not block page rendering or navigation.",
"0397.a":"ANALYTICS 3.2 is one public reference-page slice, requiring real postrelease view and logged-in exclusion check.",
"0397.b":"The resulting usable, unskewed pageview report is the slice's business outcome.",
}
package = [row for row in rows if 385 <= int(row["SourceID"][4:]) <= 397 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 28, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
for number in range(385,398):
    sid = f"SRC-{number:04}"
    group = [row for row in package if row["SourceID"] == sid]
    if group:
        assert matrix[sid]["Relevant"] == "Yes"
        assert " ".join(row["Clause"] for row in group) == sources[sid]["OriginalText"], sid
    else:
        assert matrix[sid]["Relevant"] == "No" and sid in {"SRC-0385","SRC-0388","SRC-0391","SRC-0395"}
    assert sources[sid]["OriginalText"] in " ".join(SOURCE.read_text(encoding="utf-8").split()), sid

extra = ("ANALYTICS 0.2 dokumentiert vor betroffenem Code konkrete Dateistruktur, Umami-Hosting und Zugang, "
         "Aufbewahrung, Datenschutz/Consent und Berührung mit CMS 1–3 sowie Cockpit; Konflikte werden entschieden, "
         "der erste Release bleibt begrenzt und ersetzt keine bestehende Funktion stillschweigend. "
         "ANALYTICS 1.1 vervollständigt docs/analytics.md zu API, Policy, Events, Schema, Properties, Content-IDs, "
         "Provider-Mapping, Umgebungen, Security, Privacy, Performance und Tests; Projektregeln verweisen darauf, "
         "eine zweite aktive Analytics-Spezifikation existiert nicht. ANALYTICS 1.2 dokumentiert die Wiederverwendung "
         "stabiler Content-IDs, englische snake_case-Namen, erlaubte Properties, Typen, Längen und Versionierung für "
         "page_view und priorisierte Events; URL-Umbenennung ändert keine Identität und Freitext wird kein Eventname. "
         "Der erste Umami-Slice benötigt Hosting, Konfiguration, minimale CSP-Freigaben, asynchrones Laden und "
         "fehlerfestes Adapter-Mapping. Nach regulärem Rollout sind ein realer anonymer Aufruf, der Ausschluss eines "
         "eingeloggten Admins und ein nutzbarer, unverfälschter Seitenaufrufbericht nachgewiesen.")
lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
out, changed = [], False
for line in lines:
    if line.lstrip().startswith('{"id"'):
        item = json.loads(line.strip().rstrip(","))
        if item["id"] == "ST-AN-01":
            assert extra not in item["acceptance"]
            item["acceptance"] += " " + extra
            item["sources"] = list(dict.fromkeys(item["sources"] + [f"SRC-{n:04}" for n in (386,387,389,390,392,393,394,396,397)]))
            line = "    " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) + ",\n"
            changed = True
    out.append(line)
assert changed
CATALOG.write_text("".join(out), encoding="utf-8")
assert any(story["id"] == "ST-AN-01" and extra in story["acceptance"] for story in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"])

for row in package:
    aid = row["AtomicID"]
    row.update(ReviewPackage="PKG-008", ReviewedSourceSHA256=sha, ReviewReason=reasons[aid[4:]],
               OpenQuestion="", BlockCoverageCheck="Complete canonical analytics item reread; candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-008",
               ReviewClassification="Functional requirement",RequirementID=aid,SuccessorIDs="",
               RequirementText=row["Clause"],ConcreteTarget="ST-AN-01#Acceptance-Criteria",
               PlanningCoverage="Covered",SemanticResult="Specific planned walking-skeleton criterion checked against source")
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-008: 9 relevant source blocks, 28 candidates; four section headings confirmed context; SHA-256 {sha}")
