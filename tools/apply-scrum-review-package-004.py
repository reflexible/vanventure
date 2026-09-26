"""Record manual review of CONTRIBUTING blocks SRC-0065–0068."""
import csv
import hashlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
sha = hashlib.sha256((ROOT / "CONTRIBUTING.md").read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}
with (MIG / "traceability-matrix.csv").open(encoding="utf-8-sig", newline="") as stream:
    matrix = {row["ID"]: row for row in csv.DictReader(stream)}

reasons = {
"SRC-0065.a":"List number 3 adds no separate duty.",
"SRC-0065.b":"Requires an imperative commit title; the vehicle example is illustrative only.",
"SRC-0066.a":"List number 4 adds no separate duty.",
"SRC-0066.b":"Requires pushing the branch and opening a pull request to main.",
"SRC-0067.a":"List number 5 adds no separate duty.",
"SRC-0067.b":"Makes review and express public-release approval prerequisites for merging.",
"SRC-0068.a":"Names Helmut, immediately-before timing and all listed public surfaces; broader than README's approval sentence and conflicts with AGENTS default rollout.",
}
context = {"SRC-0065.a", "SRC-0066.a", "SRC-0067.a"}
package = [row for row in rows if 65 <= int(row["SourceID"][4:]) <= 68 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 7
assert {row["AtomicID"] for row in package} == set(reasons)
for number in range(65, 69):
    sid = f"SRC-{number:04}"
    group = [row for row in package if row["SourceID"] == sid]
    assert " ".join(row["Clause"] for row in group) == sources[sid]["OriginalText"]
    assert sources[sid]["OriginalText"] in " ".join((ROOT / "CONTRIBUTING.md").read_text(encoding="utf-8").split())
for number in range(69, 79):
    sid = f"SRC-{number:04}"
    assert matrix[sid]["Relevant"] == "No", sid
    assert not any(row["SourceID"] == sid for row in rows)
for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    is_context = aid in context
    is_conflict = aid == "SRC-0068.a"
    row.update(
        ReviewPackage="PKG-004", ReviewedSourceSHA256=sha, ReviewReason=reasons[aid],
        BlockCoverageCheck="Complete CONTRIBUTING.md and source block reread; clauses rejoin exactly",
        AtomicityReview="Semantic review evidenced in PKG-004",
        ReviewClassification="Context / list marker" if is_context else ("Conflicting rule" if is_conflict else "Project rule / constraint"),
        RequirementID="" if is_context else aid, SuccessorIDs="",
        RequirementText="" if is_context else row["Clause"],
        ConcreteTarget="constraint-register.md#" + sid.lower(),
        PlanningCoverage="Context" if is_context else ("Unresolved" if is_conflict else "Rule / Constraint"),
        SemanticResult="No additional obligation" if is_context else ("Source-preserved approval rule conflicts with AGENTS.md" if is_conflict else "Exact binding rule retained"),
        OpenQuestion=("Does Helmut's explicit approval immediately before each listed publication remain mandatory despite AGENTS default live rollout? Recommendation: preserve this named, time-specific approval gate pending explicit reconciliation." if is_conflict else ""),
    )
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-004: 4 relevant source blocks, 7 candidates; 10 excluded analytics acceptance/status blocks rechecked; SHA-256 {sha}")
