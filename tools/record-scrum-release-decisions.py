"""Apply the three explicit user release decisions to the saved migration review."""
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"


def update_csv(name, mutate):
    path = MIG / name
    with path.open(encoding="utf-8-sig", newline="") as stream:
        reader = csv.DictReader(stream)
        fields, rows = reader.fieldnames, list(reader)
    mutate(rows)
    with path.open("w", encoding="utf-8-sig", newline="") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


decisions = {
    "SRC-0051.b": ("DEC-REL-001", "Approval for each publication/deployment scope; wider historical 'external change' wording is not carried forward unchanged."),
    "SRC-0052.d": ("DEC-REL-003", "Historical direct-live permission expressly superseded; local work and verification precede any separately approved release."),
    "SRC-0068.a": ("DEC-REL-001", "Approval for each public release scope remains; historical fixed immediately-before timing is replaced by scope-specific approval."),
}


def update_atoms(rows):
    found = set()
    for row in rows:
        aid = row["AtomicID"]
        if aid not in decisions:
            continue
        found.add(aid)
        did, reason = decisions[aid]
        assert row["PlanningCoverage"] in {"Unresolved", "Rule / Constraint"}, aid
        row["PlanningCoverage"] = "Rule / Constraint"
        row["ReviewClassification"] = "Historical rule resolved by user decision"
        row["ConcreteTarget"] = f"constraint-register.md#src-{row['SourceID'][4:]},constraint-register.md#dec-rel-{did[-3:]}"
        row["SemanticResult"] = f"Original retained; effective successor {did}"
        row["ReviewReason"] = reason
        row["OpenQuestion"] = ""
    assert found == set(decisions), found


def update_matrix(rows):
    for row in rows:
        sid = row["ID"]
        if sid in {"SRC-0051", "SRC-0052", "SRC-0068"}:
            did = "DEC-REL-003" if sid == "SRC-0052" else "DEC-REL-001"
            row["Note"] = (row["Note"].split("; release decision:")[0] +
                            f"; release decision: {did}, see release-decisions.md; original wording retained as history")


update_csv("atomic-requirements.csv", update_atoms)
update_csv("traceability-matrix.csv", update_matrix)

register = MIG / "constraint-register.md"
body = register.read_text(encoding="utf-8")
appendix = """
## dec-rel-001

- Entscheidung: `DEC-REL-001` in `release-decisions.md`.
- Gültige Regel: Jede Veröffentlichung und jedes Deployment erfordert ausdrückliche Nutzerfreigabe für den jeweiligen Release-Umfang.
- Historische Klauseln: `SRC-0051.b` und `SRC-0068.a`; Originalwortlaut bleibt unter `src-0051` und `src-0068` erhalten, abweichender Mehrwortlaut ist ausdrücklich abgelöst.

## dec-rel-002

- Entscheidung: `DEC-REL-002` in `release-decisions.md`.
- Gültige Regel: Test, Audit und Planabschluss sind keine Veröffentlichungsfreigabe.

## dec-rel-003

- Entscheidung: `DEC-REL-003` in `release-decisions.md`.
- Gültige Regel: Local-first; keine direkte Live-Bearbeitung. Deployment erst nach separater Freigabe nach `DEC-REL-001`.
- Historische Klausel: `SRC-0052.d`; ihre direkte Live-Erlaubnis ist ausdrücklich abgelöst. Die anderen Klauseln von `SRC-0052` bleiben einzeln prüfbar.
"""
if "\n## dec-rel-001\n" not in body:
    register.write_text(body.rstrip() + "\n" + appendix, encoding="utf-8")
print("Recorded DEC-REL-001/002/003 for three original clauses")
