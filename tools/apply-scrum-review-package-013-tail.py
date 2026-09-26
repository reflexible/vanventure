"""Integrate only independently checked SRC-0458/0459 candidate decisions."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
source = ROOT / "docs/ausbauplan.md"
sha = hashlib.sha256(source.read_bytes()).hexdigest()

def read(name):
    with (MIG / name).open(encoding="utf-8-sig", newline="") as file:
        reader = csv.DictReader(file)
        return reader.fieldnames, list(reader)

def write(name, fields, rows):
    with (MIG / name).open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)

fields, atoms = read("atomic-requirements.csv")
_, sources = read("source-inventory.csv")
source_by_id = {row["ID"]: row for row in sources}
package = [row for row in atoms if row["SourceID"] in {"SRC-0458", "SRC-0459"}]
assert len(package) == 8 and all(not row["ReviewPackage"] for row in package)
for sid in ("SRC-0458", "SRC-0459"):
    original = source_by_id[sid]["OriginalText"]
    assert original in " ".join(source.read_text(encoding="utf-8").split())
    assert " ".join(row["Clause"] for row in package if row["SourceID"] == sid) == original

decisions = {
    "SRC-0458.a": ("Functional requirement", "Covered", "ST-WEB-01#Acceptance-Criteria", "Historic EN editorial content test mapped to current content-page AC; the two overview routes are now redirects, so they are not current EN editorial targets."),
    "SRC-0458.b": ("Functional requirement", "Covered", "ST-WEB-01#Acceptance-Criteria", "Stored language choice is now explicit in the current content-page AC and independently testable."),
    "SRC-0458.c": ("Context / historical status", "Context", "ST-WEB-01#Acceptance-Criteria", "Past live DE-return check is preserved as dated source evidence; current DE return remains a separate AC and is unverified here."),
    "SRC-0458.d": ("Functional requirement", "Covered", "ST-WEB-01#Acceptance-Criteria", "Riverstar EN is explicitly assigned to public kajak.html; no separate Riverstar page is inferred."),
    "SRC-0459.a": ("Project rule / constraint", "Rule / Constraint", "constraint-register.md#src-0459,ST-WEB-03#Acceptance-Criteria", "The 24 September decision keeps this overall rework, including approved Trulli V11, local until the separate release gate; image approval is not rollout approval."),
    "SRC-0459.b": ("Split parent", "Split", "SRC-0459.b1,SRC-0459.b2", "One candidate joins the inspectable local three-size preview and the user's express acceptance; each is separately checkable."),
    "SRC-0459.c": ("Project rule / constraint", "Rule / Constraint", "constraint-register.md#src-0459,ST-WEB-03#Acceptance-Criteria", "Publication follows express acceptance and passing release checks under the existing local-first workflow; no implementation or rollout is claimed."),
    "SRC-0459.d": ("Project rule / constraint", "Rule / Constraint", "constraint-register.md#src-0459,ST-WEB-03#Acceptance-Criteria", "Trulli V11 image approval alone explicitly fails the overall release gate; concrete-scope approval remains outstanding."),
}
children = [
    ("SRC-0459.b1", "Before the shared live release, an inspectable local overall preview of the revised pages is provided for desktop, tablet and mobile.", "The preview is a separate observable prerequisite, not a release approval."),
    ("SRC-0459.b2", "The user can inspect and expressly accept the presented overall release scope.", "The user's acceptance must identify this release scope and cannot be inferred from the preview."),
]
for row in package:
    aid = row["AtomicID"]
    classification, coverage, target, reason = decisions[aid]
    row.update(ReviewPackage="PKG-013", ReviewedSourceSHA256=sha,
               AtomicityReview="Individual semantic review against full original block and current target",
               ReviewClassification=classification, PlanningCoverage=coverage,
               ConcreteTarget=target, ReviewReason=reason, OpenQuestion="",
               SemanticResult="Planning target checked; implementation and live state not verified",
               BlockCoverageCheck="Full source block rejoined exactly; current target and later redirect/release decisions checked")
    if coverage == "Split":
        row.update(RequirementID="", SuccessorIDs="SRC-0459.b1,SRC-0459.b2", RequirementText="")
    elif coverage == "Context":
        row.update(RequirementID="", SuccessorIDs="", RequirementText="")
    else:
        row.update(RequirementID=aid, SuccessorIDs="", RequirementText=row["Clause"])

for aid, clause, reason in children:
    row = dict(next(row for row in package if row["AtomicID"] == "SRC-0459.b"))
    row.update(AtomicID=aid, Clause=clause, ReviewClassification="Project rule / constraint",
               PlanningCoverage="Rule / Constraint", RequirementID=aid, SuccessorIDs="",
               RequirementText=clause,
               ConcreteTarget="constraint-register.md#src-0459,ST-WEB-03#Acceptance-Criteria",
               ReviewReason=reason)
    atoms.append(row)
assert len({row["AtomicID"] for row in atoms}) == len(atoms)
write("atomic-requirements.csv", fields, atoms)

fields, matrix = read("traceability-matrix.csv")
for row in matrix:
    if row["ID"] == "SRC-0458":
        row.update(Coverage="Covered", Note="PKG-013: four candidates checked; historic EN/DE live test retained, current content-page AC includes saved choice and Riverstar at kajak.html; overview routes are redirects; current implementation unverified")
    elif row["ID"] == "SRC-0459":
        row.update(Coverage="Rule / Constraint", Note="PKG-013: four candidates plus two successors checked; local overall preview and express acceptance for concrete release scope precede passing checks and rollout; Trulli V11 image approval alone does not authorize release; implementation unverified")
write("traceability-matrix.csv", fields, matrix)

catalog_path = MIG / "story-catalog.json"
catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
draft = (MIG / "scrum-plan-draft.md").read_text(encoding="utf-8")
for sid in ("ST-WEB-01", "ST-WEB-03"):
    block = draft.split(f"#### {sid} ·", 1)[1].split("\n#### ", 1)[0]
    ac = block.split("- **Acceptance Criteria:** ", 1)[1].split("\n- **", 1)[0]
    story = next(item for item in catalog["stories"] if item["id"] == sid)
    story["acceptance"] = ac
    if sid == "ST-WEB-03":
        story["sources"] = list(dict.fromkeys(story["sources"] + ["SRC-0459"]))
catalog_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("PKG-013 tail: 2 blocks, 8 original candidates, 2 successors; source SHA-256", sha)
