"""Apply the manually reasoned review of AGENTS.md source blocks SRC-0001–0025.

The decisions below were made from the full original blocks and the concrete
target clauses. This script only records them and checks IDs and source text.
"""

import csv
import hashlib
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
sha = hashlib.sha256((ROOT / "AGENTS.md").read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields = list(reader.fieldnames)
    rows = list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}

extra = ["ReviewClassification", "RequirementID", "SuccessorIDs", "RequirementText",
         "ConcreteTarget", "SemanticResult", "ReviewReason", "OpenQuestion",
         "ReviewedSourceSHA256", "ReviewPackage", "BlockCoverageCheck"]
for field in extra:
    if field not in fields:
        fields.append(field)
for row in rows:
    for field in extra:
        row.setdefault(field, "")

# One individual reason per candidate. The short text identifies the specific
# source condition, exception, prohibition, scope or required evidence.
reasons = {
"0001.a":"Binds every new and existing plan to the approved Scrum rule.",
"0001.b":"Requires completed migration and passed coverage before replacement/removal.",
"0002.a":"Makes the analytics specification a prerequisite before event changes.",
"0002.b":"Central event/property definitions and the ban on page-local inventions are independently testable.",
"0002.c":"Provider code must be confined to the adapter, an architectural boundary.",
"0002.d":"Identifies the authoritative active task list, not a second feature backlog.",
"0003.a":"Requires same-turn reconciliation of every affected planning/status document.",
"0003.b":"Requires local, live and remaining-work statuses to be distinguished.",
"0004.a":"Prevents contradictory duplicate status entries before completion is reported.",
"0005.a":"Requires reading the consolidated mandate before relevant implementation.",
"0005.b":"Assigns evidence, original protection, approvals and reporting to that mandate.",
"0005.c":"Keeps technical and approved visual rules in their distinct authoritative documents.",
"0006.a":"Explicit approval gates new design rules, global variants and exceptions before binding/live use.",
"0006.b":"Already approved design rules may be applied without repeat approval.",
"0006.c":"Approved changes update guide, implementation, tests and status together.",
"0006.d":"Prohibits post-hoc guide changes that rationalize an unapproved or faulty implementation.",
"0007.a":"Requires an evidence matrix and acceptance report with source, result, scope and gaps.",
"0007.b":"Separates preparation, repository, checks, approval and live verification statuses.",
"0008.a":"Places each new commissioned requirement in its authoritative existing document.",
"0008.b":"Contains two separately checkable gallery duties: shared component and approved viewer.",
"0008.c":"Requires consulting exact mandate sections before gallery changes.",
"0009.a":"Defines project-wide applicability of the deployment section.",
"0010.a":"Forbids direct production modification, test or hotfix under local-first.",
"0010.b":"Requires authoritative remote sync, local verification, commit and push before rollout.",
"0010.c":"Limits production deployment to the exact pushed and locally verified commit.",
"0010.d":"Requires recording the deployed commit SHA in acceptance evidence.",
"0010.e":"Blocks rollout and requires divergence reporting if branch reconciliation fails.",
"0011.a":"Defines the default live rollout scope and its explicit keep-local exception.",
"0011.b":"Restates that completed in-scope changes are not handed over as local-only work.",
"0012.a":"Prefers no-restart deployment only where the architecture truly supports it.",
"0012.b":"Forbids modifying read-only containers or bypassing release steps to avoid restart.",
"0012.c":"A required rebuild/migration permits restart of only the affected web service.",
"0012.d":"Names PostgreSQL, Caddy, public files and unrelated services protected by that conditional restart rule.",
"0013.a":"Makes relevant release checks a prerequisite for every production rollout.",
"0013.b":"Limits mandatory protected DB dumps to persistent/material hard-to-reverse changes.",
"0013.c":"Defines the corresponding reversible presentation/stateless exception to the dump rule.",
"0013.d":"Requires health, affected-route and visible-result verification after rollout.",
"0014.a":"Requires reporting both live URL and web-service restart status.",
"0014.b":"A failed check stops rollout and requires a concrete blocker report.",
"0014.c":"Prohibits a false live claim after a failed check; inseparable from the blocker rule.",
"0015.a":"Specifies the complete ordered production workflow, including closing the session.",
"0015.b":"Requires closing all remote sessions, tunnels and helpers immediately after verification.",
"0015.c":"Forbids persistent interactive remote sessions between tasks.",
"0015.d":"Requires a new short-lived connection for later tasks, part of the no-persistent-session rule.",
"0016.a":"Protects both named original-photo archive paths and every descendant as read-only.",
"0017.a":"Enumerates all prohibited archive mutations, including metadata and generated files.",
"0018.a":"Requires copying selected source photos into the project before work.",
"0018.b":"Confines later processing to project copies.",
"0019.a":"Combines two independently auditable provenance duties: unchanged copy and source path.",
"0020.a":"Forbids VanVenture work from changing the shared archive Windows ACL.",
"0020.b":"Requires isolated read-only archive access in the project workflow.",
"0020.c":"Combines an overwrite guard and source/copy checksum verification.",
"0021.a":"Requires the named photo safety skill for every listed VanVenture image operation.",
"0021.b":"Makes that skill obligation automatic, without user reminder.",
"0021.c":"Extends the same obligation to image work inside larger assignments.",
"0022.a":"Defines the all-site scope of the image policy and named page types.",
"0022.b":"Enumerates image placements and device variants within the same all-site scope.",
"0022.c":"Explicitly keeps the independent homepage inside the image-policy scope.",
"0023.a":"Requires the skill guidance applicable to each actual image type.",
"0023.b":"Rejects uniform image settings; qualifies the image-type-specific duty.",
"0023.c":"Preserves existing original-protection, processing and approval rules.",
"0023.d":"Requires explicit reporting rather than silent disregard of conflicts.",
"0024.a":"Requires prepublication review of every new or changed image in the assignment.",
"0024.b":"Exempts already reviewed unchanged images from repeat processing, not from policy.",
"0025.a":"Blocks claims of review/approval when the skill or required check is unavailable.",
}

merges = {
    "SRC-0011.b":"SRC-0011.a", "SRC-0012.d":"SRC-0012.c",
    "SRC-0013.c":"SRC-0013.b", "SRC-0014.c":"SRC-0014.b",
    "SRC-0015.d":"SRC-0015.c", "SRC-0021.b":"SRC-0021.a",
    "SRC-0021.c":"SRC-0021.a", "SRC-0022.b":"SRC-0022.a",
    "SRC-0023.b":"SRC-0023.a", "SRC-0024.b":"SRC-0024.a",
}
splits = {
    "SRC-0008.b": [
        ("SRC-0008.b1", "Public content galleries, including kayak, use one shared component.", "Shared rendering is a separate functional acceptance condition."),
        ("SRC-0008.b2", "Public content galleries use the approved photo viewer.", "Approved enlargement behavior is separate from shared gallery rendering."),
    ],
    "SRC-0019.a": [
        ("SRC-0019.a1", "Preserve an unchanged project copy of each selected original.", "The retained unmodified copy can be checked independently."),
        ("SRC-0019.a2", "Record the source path of each selected original.", "Provenance path recording is separately checkable from copy preservation."),
    ],
    "SRC-0020.c": [
        ("SRC-0020.c1", "Reject overwriting an unchanged project copy.", "The copy overwrite guard is an independent protection."),
        ("SRC-0020.c2", "Verify source/copy checksums.", "Byte-equivalence verification is separately testable."),
    ],
}

targets = {
    "SRC-0002.b":"ST-AN-01#Acceptance-Criteria",
    "SRC-0002.c":"ST-AN-01#Acceptance-Criteria",
    "SRC-0008.b1":"ST-WEB-01#Acceptance-Criteria",
    "SRC-0008.b2":"ST-WEB-01#Acceptance-Criteria",
    "SRC-0024.a":"ST-PHOTO-01#Acceptance-Criteria,ST-PHOTO-07#Acceptance-Criteria",
}
functional = set(targets)
package = [row for row in rows if row["Source"] == "AGENTS.md" and
           1 <= int(row["SourceID"][4:]) <= 25 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 65, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
by_id = {row["AtomicID"]: row for row in package}
by_source = defaultdict(list)
for row in package:
    by_source[row["SourceID"]].append(row)
assert len(by_source) == 25
for source_id, group in by_source.items():
    assert " ".join(row["Clause"] for row in group) == sources[source_id]["OriginalText"], source_id
    assert (ROOT / "AGENTS.md").read_text(encoding="utf-8-sig").splitlines()[int(sources[source_id]["Line"])-1].strip() in sources[source_id]["OriginalText"]

for row in package:
    aid = row["AtomicID"]
    source_id = row["SourceID"]
    row["ReviewPackage"] = "PKG-001"
    row["ReviewedSourceSHA256"] = sha
    row["ReviewReason"] = reasons[aid[4:]]
    row["OpenQuestion"] = ""
    row["BlockCoverageCheck"] = "Full source block reread; original candidate clauses rejoin exactly"
    if aid in merges:
        row["ReviewClassification"] = "Merged fragment"
        row["RequirementID"] = merges[aid]
        row["SuccessorIDs"] = merges[aid]
        row["RequirementText"] = ""
        row["ConcreteTarget"] = merges[aid]
        row["PlanningCoverage"] = "Merged"
        row["SemanticResult"] = "Condition or exception retained in canonical requirement"
    elif aid in splits:
        row["ReviewClassification"] = "Split parent"
        row["RequirementID"] = ""
        row["SuccessorIDs"] = ",".join(item[0] for item in splits[aid])
        row["RequirementText"] = ""
        row["ConcreteTarget"] = row["SuccessorIDs"]
        row["PlanningCoverage"] = "Split"
        row["SemanticResult"] = "Two independently testable duties traced to successors"
    else:
        row["ReviewClassification"] = "Functional requirement" if aid in functional else "Project rule / constraint"
        row["RequirementID"] = aid
        row["SuccessorIDs"] = ""
        parts = [row["Clause"]] + [by_id[other]["Clause"] for other, canonical in merges.items() if canonical == aid]
        row["RequirementText"] = " ".join(parts)
        rule = "constraint-register.md#" + source_id.lower()
        row["ConcreteTarget"] = ",".join(filter(None, (targets.get(aid, ""), rule)))
        row["PlanningCoverage"] = "Covered" if aid in functional else "Rule / Constraint"
        row["SemanticResult"] = "Complete planning target checked against source condition and exception"
    row["AtomicityReview"] = "Semantic review evidenced in PKG-001"

for parent, successors in splits.items():
    original = by_id[parent]
    for new_id, clause, reason in successors:
        child = dict(original)
        child["AtomicID"] = new_id
        child["Clause"] = clause
        child["ReviewClassification"] = "Functional requirement" if new_id in functional else "Project rule / constraint"
        child["RequirementID"] = new_id
        child["SuccessorIDs"] = ""
        child["RequirementText"] = clause
        child["ConcreteTarget"] = ",".join(filter(None, (targets.get(new_id, ""), "constraint-register.md#" + child["SourceID"].lower())))
        child["PlanningCoverage"] = "Covered" if new_id in functional else "Rule / Constraint"
        child["SemanticResult"] = "Independent successor checked against full parent block"
        child["ReviewReason"] = reason
        rows.append(child)

assert len({row["AtomicID"] for row in rows}) == len(rows)
with ATOMS.open("w", newline="", encoding="utf-8-sig") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-001: 25 source blocks, 65 original candidates, 6 successor rows; source SHA-256 {sha}")
