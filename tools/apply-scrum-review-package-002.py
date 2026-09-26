"""Record the manual semantic review of AGENTS.md blocks SRC-0026–0039."""

import csv
import hashlib
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
source_text = (ROOT / "AGENTS.md").read_text(encoding="utf-8-sig")
sha = hashlib.sha256((ROOT / "AGENTS.md").read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}
stories = {story["id"]: story for story in json.loads((MIG / "story-catalog.json").read_text(encoding="utf-8"))["stories"]}

# Each reason identifies the semantic content and the relevant condition or scope.
reasons = {
"0026.a":"Limits the compulsory photo skill to VanVenture work.",
"0026.b":"Prohibits copying this site-specific duty into global or other-project instructions.",
"0027.a":"Covers all visible plates in previews, published images, enlarged views and background vehicles.",
"0027.b":"Restricts plate anonymization work to project derivatives.",
"0027.c":"Requires an unchanged original project copy to survive plate processing.",
"0028.a":"Requires click enlargement and accessible close for embedded photos in every named editorial area.",
"0028.b":"Specifies the common viewer files for both static pages and generated pages.",
"0029.a":"Requires direct navigation to existing public subpages, within VanVenture only.",
"0029.b":"Prohibits a new overview page or menu item without express request.",
"0029.c":"Preserves legacy overview addresses for inbound links subject to separately authorized removal.",
"0029.d":"Records the specific authorization that qualifies preservation for equipment and bike overview content.",
"0029.e":"Requires both authorized retired addresses to redirect to the homepage.",
"0029.f":"Restricts the navigation and overview decision to this project.",
"0030.a":"Requires central responsive templates for kayak/activity, vehicle and travel-story subpages.",
"0030.b":"Forbids separate per-page copies of shared markup, styling and behavior.",
"0030.c":"Makes the current kayak page the design reference for relevant detail pages.",
"0030.d":"Requires the template behavior on desktop, tablet and smartphone.",
"0030.e":"Preserves homepage layout, presentation and functions at every screen size.",
"0030.f":"Prevents shared-component changes from altering the homepage accidentally; qualifies its preservation.",
"0030.g":"Limits page-specific differences to content, configuration or explicit variants.",
"0030.h":"Makes the complete responsive-template specification and acceptance criteria binding before changes.",
"0031.a":"States documentary treatment as the governing principle for the concrete preservation duty.",
"0031.b":"Preserves each listed real-scene and subject attribute, including animal appearance and composition.",
"0031.c":"Forbids adding, removing, moving or replacing pictured elements.",
"0032.a":"Requires recognizable children to be anonymized on VanVenture images.",
"0032.b":"Limits adult facial anonymization to express per-image user instruction.",
"0032.c":"Prohibits precautionary or blanket adult masking; this qualifies the per-image rule.",
"0032.d":"Explicitly permits Helmut and Sabine to remain visible.",
"0032.e":"Requires withholding and user clarification when age or publication choice is unclear.",
"0032.f":"Limits the people decision to VanVenture while leaving plate protection intact.",
"0032.g":"Requires express photo selection before publishing a recognizable child, even when anonymization applies.",
"0033.a":"Defines narrow soft-edged masking with small margin only for specifically commissioned face or plate anonymization.",
"0033.b":"Forbids coarse blocks and spill onto hair, clothing, body or background.",
"0033.c":"Requires unreadability checks at 100 percent and every web size.",
"0033.d":"Exempts non-identifying rear views from facial masks.",
"0034.a":"Defines the complete restrained grade: plausible exposure, skin, greens, blues, warm tones and contrast.",
"0034.b":"Preserves daylight character as a condition of the grade.",
"0034.c":"Requires per-image tuning instead of fixed values.",
"0034.d":"Forbids listed retouching and synthetic looks including false golden-hour light.",
"0035.a":"Requires approval of exact human-made distractions before removal.",
"0035.b":"Combines local derivative, exact-scope repair and 100-percent artifact inspection; independently auditable.",
"0035.c":"Forbids inferring approval for neighboring objects and qualifies the exact-item approval.",
"0036.a":"Forbids headshot, neutral-background and portrait transformations of travel images.",
"0036.b":"Allows editorial portrait-like moments but rejects a separate portrait series.",
"0037.a":"Requires unchanged project copy plus source path and hash before any derivative.",
"0037.b":"Requires every edit, resize and anonymization to derive from that copy.",
"0038.a":"Keeps AI-enhanced images in review status until express approval.",
"0038.b":"Contains separately checkable comparison and retained-original safeguards.",
"0039.a":"Prohibits publishing recognizable children without express selection of that photo.",
}
merges = {
    "SRC-0029.d":"SRC-0029.c", "SRC-0030.f":"SRC-0030.e",
    "SRC-0031.a":"SRC-0031.b", "SRC-0032.c":"SRC-0032.b",
    "SRC-0034.b":"SRC-0034.a", "SRC-0034.c":"SRC-0034.a",
    "SRC-0035.c":"SRC-0035.a",
}
splits = {
    "SRC-0035.b":[
        ("SRC-0035.b1", "Work locally on a project derivative.", "Local derivative use is independently checkable."),
        ("SRC-0035.b2", "Repair only the confirmed distraction.", "Exact repair scope is independently checkable."),
        ("SRC-0035.b3", "Inspect the repaired area at 100% for repeated texture, seams, or changes to nearby scene details.", "Artifact inspection is an independent acceptance condition."),
    ],
    "SRC-0038.b":[
        ("SRC-0038.b1", "Visually compare each AI-enhanced image with its unchanged project copy.", "Visual comparison is independently checkable."),
        ("SRC-0038.b2", "Never let the AI-enhanced image become the only retained version.", "Original retention is separately checkable."),
    ],
}
story_targets = {
    "SRC-0027.a":"ST-PHOTO-01", "SRC-0028.a":"ST-WEB-01", "SRC-0028.b":"ST-WEB-01",
    "SRC-0029.a":"ST-WEB-01", "SRC-0029.b":"ST-WEB-01", "SRC-0029.c":"ST-WEB-01", "SRC-0029.e":"ST-WEB-01",
    **{f"SRC-0030.{suffix}":"ST-WEB-02,ST-WEB-04" for suffix in "abcd egh".replace(" ", "")},
    "SRC-0031.b":"ST-PHOTO-02", "SRC-0031.c":"ST-PHOTO-02",
    **{f"SRC-0032.{suffix}":"ST-PHOTO-01" for suffix in "abdeg"},
    **{f"SRC-0033.{suffix}":"ST-PHOTO-01" for suffix in "abcd"},
    "SRC-0034.a":"ST-PHOTO-02", "SRC-0034.d":"ST-PHOTO-02",
    "SRC-0036.a":"ST-PHOTO-02", "SRC-0036.b":"ST-PHOTO-02",
    "SRC-0037.a":"ST-PHOTO-01", "SRC-0037.b":"ST-PHOTO-01",
    "SRC-0038.a":"ST-PHOTO-02", "SRC-0038.b1":"ST-PHOTO-02", "SRC-0038.b2":"ST-PHOTO-02",
    "SRC-0039.a":"ST-PHOTO-01",
}
package = [row for row in rows if 26 <= int(row["SourceID"][4:]) <= 39 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 49, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
by_id = {row["AtomicID"]: row for row in package}
by_source = defaultdict(list)
for row in package:
    by_source[row["SourceID"]].append(row)
assert len(by_source) == 14
for source_id, group in by_source.items():
    assert " ".join(row["Clause"] for row in group) == sources[source_id]["OriginalText"], source_id
    assert source_text.splitlines()[int(sources[source_id]["Line"])-1].strip() in sources[source_id]["OriginalText"], source_id
for aid, target_ids in story_targets.items():
    assert all(target_id in stories for target_id in target_ids.split(",")), aid
    assert aid in by_id or any(aid == child[0] for children in splits.values() for child in children), aid

def target(aid, source_id):
    story = story_targets.get(aid, "")
    return ",".join(filter(None, [*(f"{item}#Acceptance-Criteria" for item in story.split(",") if item),
                                  f"constraint-register.md#{source_id.lower()}"]))

for row in package:
    aid, source_id = row["AtomicID"], row["SourceID"]
    row.update(ReviewPackage="PKG-002", ReviewedSourceSHA256=sha,
               ReviewReason=reasons[aid[4:]], OpenQuestion="",
               BlockCoverageCheck="Full source block reread; original candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-002")
    if aid in merges:
        row.update(ReviewClassification="Merged fragment", RequirementID=merges[aid],
                   SuccessorIDs=merges[aid], RequirementText="", ConcreteTarget=merges[aid],
                   PlanningCoverage="Merged", SemanticResult="Condition or exception retained in canonical requirement")
    elif aid in splits:
        child_ids = ",".join(item[0] for item in splits[aid])
        row.update(ReviewClassification="Split parent", RequirementID="", SuccessorIDs=child_ids,
                   RequirementText="", ConcreteTarget=child_ids, PlanningCoverage="Split",
                   SemanticResult="Independent duties traced to successor requirements")
    else:
        linked = [by_id[other]["Clause"] for other, canonical in merges.items() if canonical == aid]
        story = aid in story_targets
        row.update(ReviewClassification="Functional requirement" if story else "Project rule / constraint",
                   RequirementID=aid, SuccessorIDs="", RequirementText=" ".join([row["Clause"], *linked]),
                   ConcreteTarget=target(aid, source_id), PlanningCoverage="Covered" if story else "Rule / Constraint",
                   SemanticResult="Concrete planning target checked against full original block")
for parent, children in splits.items():
    for aid, clause, reason in children:
        row = dict(by_id[parent])
        story = aid in story_targets
        row.update(AtomicID=aid, Clause=clause, ReviewClassification="Functional requirement" if story else "Project rule / constraint",
                   RequirementID=aid, SuccessorIDs="", RequirementText=clause,
                   ConcreteTarget=target(aid, row["SourceID"]), PlanningCoverage="Covered" if story else "Rule / Constraint",
                   SemanticResult="Independent successor checked against full parent block", ReviewReason=reason)
        rows.append(row)
child_publication_rule = by_id["SRC-0039.a"]
child_publication_rule.update(
    ReviewClassification="Duplicate requirement", RequirementID="SRC-0032.g",
    SuccessorIDs="SRC-0032.g", RequirementText="",
    ConcreteTarget="SRC-0032.g,ST-PHOTO-01#Acceptance-Criteria",
    PlanningCoverage="Duplicate",
    SemanticResult="Same express-photo-selection condition as SRC-0032.g; canonical target verified",
    ReviewReason="Repeats the express selection gate of SRC-0032.g without adding a different condition.",
)
assert len({row["AtomicID"] for row in rows}) == len(rows)
with ATOMS.open("w", newline="", encoding="utf-8-sig") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-002: 14 source blocks, 49 original candidates, 5 successor rows; source SHA-256 {sha}")
