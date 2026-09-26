"""Targeted R4 source-to-candidate recovery; never rewrites originals or history."""
import csv
import hashlib
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
PACKAGE = "RECOVERY-R4-SOURCE-CANDIDATES-2026-09-26"

# Source blocks that are requirements/evidence constraints, grounded in PKG-035.
# Other blocks in the affected ranges remain explicitly classified as contextual
# or historical in the traceability matrix, with the reason recorded there.
TARGETS = {
    "SRC-0979": ["ST-SEO-01"],
    "SRC-0999": ["ST-INS-01"],
    "SRC-1014": ["ST-INS-01", "ST-AUTH-01"],
    "SRC-1015": ["ST-INS-01", "ST-AUTH-01"],
    "SRC-1016": ["ST-INS-01"], "SRC-1017": ["ST-INS-01"],
    "SRC-1019": ["ST-BRD-03"],
    "SRC-1021": ["ST-INS-01", "ST-AUTH-01"],
    "SRC-1023": ["ST-AUTH-01"], "SRC-1024": ["ST-AUTH-01"],
    "SRC-1025": ["ST-INS-01", "ST-AUTH-01"],
    "SRC-1026": ["ST-INS-01"], "SRC-1027": ["ST-INS-01"],
    "SRC-1028": ["ST-INS-01", "ST-INS-04"],
    "SRC-1029": ["ST-INS-01"],
    "SRC-1030": ["ST-INS-01", "ST-INS-09"],
    "SRC-1032": ["ST-AUTH-01"], "SRC-1033": ["ST-AUTH-01"],
    "SRC-1034": ["ST-AUTH-01", "ST-INS-01"],
    "SRC-1035": ["ST-AUTH-01", "ST-OPS-01"],
    "SRC-1036": ["ST-AUTH-01"], "SRC-1037": ["ST-AUTH-01"],
    "SRC-1038": ["ST-AUTH-01"], "SRC-1039": ["ST-AUTH-01"],
    "SRC-1040": ["ST-INS-01", "ST-OPS-01"],
    "SRC-1041": ["ST-OPS-01"], "SRC-1042": ["ST-INS-01"],
    "SRC-1043": ["ST-INS-01"], "SRC-1044": ["ST-OPS-01"],
    "SRC-1052": ["ST-OPS-01"],
}
CONTEXT = {
    "SRC-0960": "Source-role rule: SEO reference does not create a second active task list; retained as governance context.",
    "SRC-0961": "Historical domain/language context; not an independently deliverable requirement.",
    "SRC-0970": "Dated live rollout evidence; does not authorize future direct production work (DEC-REL-003 applies).",
    "SRC-0971": "Historical backup/image identifiers; evidence only, not a current backup target.",
    "SRC-0972": "Dated acceptance evidence; cannot substitute for current verification.",
    "SRC-0973": "Historical local-stack state; not a current stop instruction.",
    "SRC-0997": "Document date metadata only.",
    "SRC-0998": "Source-role and historical-phase introduction; preserved as context, not a Cockpit feature.",
    "SRC-1000": "Section heading only.",
    "SRC-1001": "Dated health evidence; not a current health check.",
    "SRC-1002": "Historical secret/configuration and backup evidence; do not copy secret values or treat as current state.",
    "SRC-1003": "Historical billing evidence; current no-cost constraint is separately represented by SRC-0999.",
    "SRC-1004": "Historical consent evidence; not a new blanket authorization.",
    "SRC-1005": "Historical API activation evidence; current API scope is separately represented by SRC-1059.",
    "SRC-1006": "Historical OAuth client/callback evidence; no credentials copied.",
    "SRC-1007": "Historical channel configuration; source itself says OAuth permission was not proven at that time.",
    "SRC-1008": "Dated local test evidence; not a current implementation verification.",
    "SRC-1009": "Historical not-deployed status; not a current open task without revalidation.",
    "SRC-1010": "Historical phase gate/status; preserve date and do not override later decisions/evidence.",
    "SRC-1011": "Dated production acceptance evidence; not a current live verification.",
    "SRC-1012": "Historical user authorization and token-location evidence; no credential copied.",
    "SRC-1013": "Historical first-run counts; not a current metric.",
    "SRC-1018": "Dated restore-test evidence; does not prove a current restore test.",
    "SRC-1020": "Dated audit metrics and seeded Planner records; preserve as historical data, not current performance claims.",
    "SRC-1022": "Introductory heading only; operative numbered requirements follow in SRC-1023–1030.",
    "SRC-1031": "Dated implementation/live-status narrative; not independently reverified by this recovery.",
    "SRC-1045": "Table header only.",
    "SRC-1046": "Historical Phase-0 result/gate; current Phase-0 remains only partially accepted.",
    "SRC-1047": "Historical Phase-1 result/gate; not a current test result.",
    "SRC-1048": "Dated login acceptance evidence; not a current live verification.",
    "SRC-1049": "Historical Phase-2 comparison gate; preserve as evidence, not current completion.",
    "SRC-1050": "Dated Phase-3 status with explicitly open work; do not elevate to Done.",
    "SRC-1051": "Historical automation status and first-week check; not current operational evidence.",
}

def read_csv(path):
    with path.open(encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f)), next(csv.reader([path.open(encoding="utf-8-sig").readline().rstrip("\r\n")]))

source_rows, source_fields = read_csv(MIG / "source-inventory.csv")
matrix_rows, matrix_fields = read_csv(MIG / "traceability-matrix.csv")
atoms, atom_fields = read_csv(MIG / "atomic-requirements.csv")
catalog = __import__("json").loads((MIG / "story-catalog.json").read_text(encoding="utf-8"))
story_ids = {s["id"] for s in catalog["stories"]}
source_by_id = {r["ID"]: r for r in source_rows}
matrix_by_id = {r["ID"]: r for r in matrix_rows}
assert set(TARGETS).isdisjoint({r["SourceID"] for r in atoms}), "Candidate already exists; stop rather than overwrite."
assert all(sid in source_by_id and sid in matrix_by_id for sid in set(TARGETS) | set(CONTEXT))
assert all(t in story_ids for targets in TARGETS.values() for t in targets)

# Verify each inventory block against the current original file using whitespace-only
# folding, which accommodates inventory line wrapping without changing text content.
def fold(s): return re.sub(r"\s+", " ", s).strip()
for sid in set(TARGETS) | set(CONTEXT):
    src = source_by_id[sid]
    raw = (ROOT / src["Source"]).read_text(encoding="utf-8-sig")
    assert fold(src["OriginalText"]) in fold(raw), f"Current source does not contain inventory text: {sid}"

old_hash = {}
for row in atoms:
    if row["Source"] in {source_by_id[s]["Source"] for s in TARGETS}:
        old_hash[row["Source"]] = row["ReviewedSourceSHA256"]
assert set(old_hash) == {"docs/seo.md", "docs/vanventure-cockpit-mvp.md"}

new_atoms = []
for sid, targets in TARGETS.items():
    src, m = source_by_id[sid], matrix_by_id[sid]
    aid = sid + ".a"
    target_refs = [t + "#Acceptance-Criteria" for t in targets]
    # The exact source block is retained as the original candidate. The package
    # records partial planning coverage when AC-level wording still needs a check.
    new_atoms.append({
        "AtomicID": aid, "SourceID": sid, "Source": src["Source"], "Line": src["Line"],
        "Clause": src["OriginalText"], "OriginalFullTextRef": "traceability-matrix.csv#" + sid,
        "PlanningMapping": ",".join(targets), "PlanningCoverage": "Partially Covered",
        "ImplementationStatus": "Unverified / unknown",
        "ImplementationNote": "Planning-only recovery; code, current live state, and implementation were not verified.",
        "AtomicityReview": "Original block text checked against current source and inventory. Compound conditions remain a possible planning-quality finding; no full product audit claimed.",
        "ReviewClassification": "Reviewed requirement / evidence condition", "RequirementID": aid,
        "SuccessorIDs": "", "RequirementText": src["OriginalText"],
        "ConcreteTarget": ",".join(target_refs),
        "SemanticResult": "Source text preserved; candidate and target links restored; AC-level coverage remains partial pending preflight.",
        "ReviewReason": "Targeted recovery from PKG-035 omission; current source and inventory text compared directly. No later-plan wording was inserted into the original candidate.",
        "OpenQuestion": "", "ReviewedSourceSHA256": old_hash[src["Source"]],
        "ReviewPackage": PACKAGE,
        "BlockCoverageCheck": "Original block and target IDs checked; planning only; implementation and live state not audited."
    })
    m.update({"Relevant":"Yes", "NewMapping":",".join(targets), "Type":"Requirement",
              "Status":"Planning recovery / implementation unverified", "Coverage":"Partially Covered",
              "Note":f"{PACKAGE}: original candidate {aid}; targets {', '.join(targets)}. Candidate originates only in this source block; AC-level coverage remains partial."})

for sid, reason in CONTEXT.items():
    m = matrix_by_id[sid]
    m.update({"Relevant":"No", "NewMapping":"", "Type":"Source context",
              "Status":"Context preserved / implementation unverified", "Coverage":"Context",
              "Note":f"{PACKAGE}: no original requirement candidate because this block is metadata, heading, or dated evidence rather than a current independent requirement. {reason}"})

assert len(set(a["AtomicID"] for a in atoms + new_atoms)) == len(atoms) + len(new_atoms)
with (MIG / "atomic-requirements.csv").open("w", encoding="utf-8", newline="") as f:
    w=csv.DictWriter(f, fieldnames=atom_fields, lineterminator="\n"); w.writeheader(); w.writerows(atoms+new_atoms)
with (MIG / "traceability-matrix.csv").open("w", encoding="utf-8", newline="") as f:
    w=csv.DictWriter(f, fieldnames=matrix_fields, lineterminator="\n"); w.writeheader(); w.writerows(matrix_rows)
print(f"Added {len(new_atoms)} original candidates; explicitly classified {len(CONTEXT)} contextual blocks; total affected IDs {len(TARGETS)+len(CONTEXT)}.")
print("Added IDs:", ", ".join(a["AtomicID"] for a in new_atoms))
