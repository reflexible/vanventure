"""Create a conservative clause index without certifying unreviewed text as atomic.

Only the manually checked clauses in partial-clause-map.md receive a reviewed
planning mapping. The remaining original text is preserved and flagged for an
independent semantic clause review. This file must never manufacture PASS.
"""

import csv
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
with (MIG / "traceability-matrix.csv").open(encoding="utf-8-sig", newline="") as stream:
    matrix = list(csv.DictReader(stream))
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}

focus = {}
for line in (MIG / "partial-clause-map.md").read_text(encoding="utf-8").splitlines():
    match = re.match(r"^\| (SRC-\d{4}\.[a-z]) \| (.*?) \| (.*?) \| (.*?) \| (.*?) \|$", line)
    if match:
        atomic_id, clause, mapping, coverage, implementation = match.groups()
        focus.setdefault(atomic_id.split(".")[0], []).append((atomic_id, clause, mapping, coverage, implementation))


def suffix(number):
    result = ""
    while number:
        number, remainder = divmod(number - 1, 26)
        result = chr(ord("a") + remainder) + result
    return result


def candidates(text):
    # These are review candidates, never an assertion of semantic atomicity.
    result = re.split(r"(?<=;)\s+|(?<=[.!?])\s+(?=[A-ZÄÖÜ*`])", text)
    return [part for part in result if part.strip()]


def implementation_status(source_id, note=""):
    low = note.lower()
    if "blocked" in low or "gesperrt" in low:
        return "Blocked"
    if any(word in low for word in ("offen", "pending", "zu prüfen", "nicht live")):
        return "Planned"
    state = sources[source_id]["SourceStatus"]
    if state.startswith("Open/Blocked"):
        return "Blocked"
    if state.startswith("Open"):
        return "Planned"
    if state.startswith(("Done", "Partially")):
        return "Existing / Verify"
    return "Unverified / unknown"


rows = []
for source in matrix:
    if source["Relevant"] != "Yes":
        continue
    sid = source["ID"]
    if sid in focus:
        for aid, clause, mapping, coverage, implementation in focus[sid]:
            rows.append({"AtomicID": aid, "SourceID": sid, "Source": source["Source"],
                         "Line": source["Line"], "Clause": clause,
                         "OriginalFullTextRef": "traceability-matrix.csv#" + sid,
                         "PlanningMapping": mapping,
                         "PlanningCoverage": "Unresolved",
                         "ImplementationStatus": implementation_status(sid, implementation),
                         "ImplementationNote": implementation,
                         "AtomicityReview": "Earlier mapping only; semantic review not yet evidenced"})
        continue
    for number, clause in enumerate(candidates(source["OriginalRequirement"]), 1):
        rows.append({"AtomicID": sid + "." + suffix(number), "SourceID": sid,
                     "Source": source["Source"], "Line": source["Line"],
                     "Clause": clause, "OriginalFullTextRef": "traceability-matrix.csv#" + sid,
                     "PlanningMapping": source["NewMapping"],
                     "PlanningCoverage": "Unresolved",
                     "ImplementationStatus": implementation_status(sid),
                     "ImplementationNote": "Source status only; code/live state not independently verified",
                     "AtomicityReview": "Candidate segmentation; independent semantic review pending"})

review_fields = ["ReviewClassification", "RequirementID", "SuccessorIDs", "RequirementText",
                 "ConcreteTarget", "SemanticResult", "ReviewReason", "OpenQuestion",
                 "ReviewedSourceSHA256", "ReviewPackage", "BlockCoverageCheck"]
previous = {}
existing = MIG / "atomic-requirements.csv"
if existing.exists():
    with existing.open(encoding="utf-8-sig", newline="") as stream:
        previous = {row["AtomicID"]: row for row in csv.DictReader(stream)}
    if any(row.get("ReviewPackage") for row in previous.values()):
        raise RuntimeError(
            "Semantic review packages exist; rebuilding would lose split successor IDs. "
            "Continue with in-place package reviews and update-scrum-review-progress.py."
        )
for row in rows:
    old = previous.get(row["AtomicID"], {})
    if old.get("ReviewPackage"):
        if old["SourceID"] != row["SourceID"] or old["Clause"] != row["Clause"]:
            raise ValueError("Reviewed candidate changed: " + row["AtomicID"])
        row.update({field: old.get(field, "") for field in review_fields})
        row["PlanningCoverage"] = old["PlanningCoverage"]
        row["AtomicityReview"] = "Semantic review evidenced in " + old["ReviewPackage"]
    else:
        row.update({field: "" for field in review_fields})

fields = ["AtomicID", "SourceID", "Source", "Line", "Clause", "OriginalFullTextRef",
          "PlanningMapping", "PlanningCoverage", "ImplementationStatus", "ImplementationNote",
          "AtomicityReview"] + review_fields
with (MIG / "atomic-requirements.csv").open("w", newline="", encoding="utf-8-sig") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
assert len({row["AtomicID"] for row in rows}) == len(rows)
coverage = Counter(row["PlanningCoverage"] for row in rows)
implementation = Counter(row["ImplementationStatus"] for row in rows)
reviewed = sum(bool(row["ReviewPackage"]) for row in rows)
report = ["# Atomarer Coverage-Stand – keine Abnahme", "",
          "Die 2.882 Zeilen sind **Klauselkandidaten**, keine unabhängig bestätigte Anzahl atomarer Anforderungen.",
          "40 Klauseln aus den vier zuvor teilgedeckten Blöcken und dem angrenzenden Abnahmeblock",
          "wurden früher nur zugeordnet; dies allein ist kein semantischer Prüfnachweis.",
          "Die übrigen Kandidaten benötigen eine semantische Klauselprüfung;",
          "Satzzeichen-Zerlegung allein beweist keine fachliche Atomarität.", "",
          "## Planning Coverage", "",
          f"- Relevante Quellblöcke: {sum(row['Relevant'] == 'Yes' for row in matrix)}",
          f"- Klauselkandidaten: {len(rows)}",
          f"- Semantisch geprüfte Kandidaten mit Paketnachweis: {reviewed}",
          f"- Covered: {coverage['Covered']}",
          f"- Rule / Constraint: {coverage['Rule / Constraint']}",
          f"- Duplicate: {coverage['Duplicate']}",
          f"- Zusammengeführte Fragmente: {coverage['Merged']}",
          f"- Kontext ohne zusätzliche Pflicht: {coverage['Context']}",
          f"- Partially Covered: {coverage['Partially Covered']}",
          f"- Unresolved / semantisch ungeprüft: {coverage['Unresolved']}", "",
          "## Implementation Verification", "",
          "Diese Zahlen sind Quellstatus-Kategorien, **kein** Code- oder Live-Nachweis:",
          "", "- Verified Existing: 0",
          f"- Existing / Verify: {implementation['Existing / Verify']}",
          f"- Planned: {implementation['Planned']}",
          f"- Blocked: {implementation['Blocked']}",
          f"- Unverified / unknown: {implementation['Unverified / unknown']}", "",
          "Die vollständigen Zeilen stehen in `atomic-requirements.csv`. Ein `PASS` ist nicht zulässig,",
          "solange die unreviewten Klauselkandidaten nicht einzeln geprüft sind.", ""]
(MIG / "atomic-coverage-report.md").write_text("\n".join(report), encoding="utf-8")
print(f"{len(rows)} candidate clauses; {reviewed} semantically reviewed with package evidence")
