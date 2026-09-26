"""Resumable, bounded local Codex review/integration/audit of the existing migration.

Usage: python tools/continue-scrum-migration.py
Stop: create docs/scrum-migration/STOP or send Ctrl+C. No network deployment.
"""
import csv
import hashlib
import json
import re
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
REV = MIG / "reviews"
REV.mkdir(exist_ok=True)
STATE = MIG / "controller-state.json"
STOP = MIG / "STOP"
SOURCE_HASH = "2126721b96ee40cceecf621509295d3454ecbde1dd76eb40cb6abdaad07093b2"
MAX_FAILURES = 2


def stamp():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def save(state):
    state["updated_utc"] = stamp()
    tmp = STATE.with_suffix(".tmp")
    tmp.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(STATE)


def rows(name):
    with (MIG / name).open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


def progress():
    atoms = rows("atomic-requirements.csv")
    originals = [r for r in atoms if re.fullmatch(r"SRC-\d{4}\.[a-z]+", r["AtomicID"])]
    reviewed = [r for r in originals if r["ReviewPackage"]]
    ids = {r["SourceID"] for r in reviewed}
    return len(ids), len(reviewed), len(originals)


def pending_source_ids():
    atoms = rows("atomic-requirements.csv")
    reviewed = {r["SourceID"] for r in atoms if r["ReviewPackage"]}
    return [r["ID"] for r in rows("traceability-matrix.csv")
            if r["Relevant"] == "Yes" and r["ID"] not in reviewed]


def cli(prompt, output, readonly):
    cmd = ["codex", "exec", "-C", str(ROOT), "-s",
           "read-only" if readonly else "workspace-write", "--ephemeral",
           "--output-last-message", str(output), "-"]
    result = subprocess.run(cmd, input=prompt, text=True, encoding="utf-8",
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                            timeout=1800)
    (REV / (output.stem + ".log")).write_text(result.stdout[-30000:], encoding="utf-8")
    if result.returncode:
        raise RuntimeError(f"codex exec exit {result.returncode}: {result.stdout[-1200:]}")
    if not output.exists() or not output.read_text(encoding="utf-8").strip():
        raise RuntimeError("codex exec returned no review/integration result")
    return output.read_text(encoding="utf-8")


def prepare_packet(ids, label):
    sources = {r["ID"]: r for r in rows("source-inventory.csv")}
    atom_rows = [r for r in rows("atomic-requirements.csv") if r["SourceID"] in ids]
    matrix = {r["ID"]: r for r in rows("traceability-matrix.csv")}
    packet = {"package": label, "sources": [sources[i] for i in ids],
              "candidates": atom_rows, "matrix": [matrix[i] for i in ids]}
    path = REV / f"{label}-input.json"
    path.write_text(json.dumps(packet, ensure_ascii=False, indent=2), encoding="utf-8")
    return path


def main():
    if hashlib.sha256((MIG / "source-inventory.csv").read_bytes()).hexdigest() != SOURCE_HASH:
        raise RuntimeError("Source inventory changed; reconcile scope before continuation")
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {
        "phase": "review", "completed": [], "failures": 0, "started_utc": stamp()}
    save(state)
    while True:
        if STOP.exists():
            state["phase"] = "stopped_by_user"; save(state); return 2
        if state["failures"] >= MAX_FAILURES:
            state["phase"] = "stopped_no_progress"; save(state); return 3
        pending = pending_source_ids()
        if not pending:
            break
        number = int(pending[0][4:])
        known_ranges = [(448, 459, 13), (460, 469, 14), (470, 479, 15),
                        (480, 489, 16), (490, 499, 17), (500, 509, 18),
                        (510, 519, 19), (520, 529, 20), (530, 539, 21)]
        match = next((item for item in known_ranges if item[0] <= number <= item[1]), None)
        if match:
            start, end, package_number = match
            ids = [i for i in pending if start <= int(i[4:]) <= end]
        else:
            package_number = max([int(x[4:]) for x in state['completed']] + [21]) + 1
            ids = pending[:10]
        label = f"PKG-{package_number:03d}"
        suffix = "-tail" if match and number != match[0] else ""
        before = progress()
        packet = prepare_packet(ids, label + suffix)
        review = REV / f"{label}-review.md"
        if not review.exists():
            prompt = (f"Prüfe nur {label}, IDs {ids[0]} bis {ids[-1]}. "
                      f"Der vollständige Originalblock- und Kandidatenumfang steht in {packet}. "
                      "Lies gezielt die dort genannten echten Quelldateien, die zugehörigen konkreten "
                      "Zielstellen in scrum-plan-draft.md und constraint-register.md, "
                      "scrum-planning.md und release-decisions.md. Prüfe Vollständigkeit, "
                      "Bedingungen, Ausnahmen, Verbote, Atomarität, Herkunft jedes AC, "
                      "Wiederholung/Kontext und Status. Kein Produktcodeaudit. "
                      "Keine Unterdelegation, keine Dateien ändern. Gib einen vollständigen "
                      "zeilenbezogenen Bericht mit konkreten Korrekturen zurück. "
                      "Behaupte keine bestandene Deckung bei offenen Lücken.")
            cli(prompt, review, True)
        state.update(phase="integrating", current=label); save(state)
        integration = REV / f"{label}{suffix}-integration.md"
        prompt = (f"Übernimm als Haupt-Integrator nur {label}, IDs {ids[0]} bis {ids[-1]}, "
                  f"aus {review} und {packet}. Lies die Originalblöcke und betroffenen "
                  "Zielstellen selbst. Prüfe inzwischen geänderte Zielstellen erneut. "
                  "Korrigiere nur docs/scrum-migration/ und unmittelbar nötige lokale "
                  "Prüfskripte. Originalquellen, aktive Pläne, Produktcode, Bilder und "
                  "Datenbanken nicht ändern. controller-state.json und Paketberichte nicht ändern; "
                  "diese gehören der Steuerung bzw. dem unabhängigen Prüfer. "
                  "Keine neue Architektur, keine neuen Features, "
                  "kein WSJF, kein Deployment. Markiere jede Kandidatenzeile nur nach "
                  "individueller fachlicher Prüfung mit konkreter Zielstelle/Begründung als "
                  f"ReviewPackage {label}; offene Lücken/Entscheidungen bleiben offen. "
                  "Trenne Planung und Implementierung. Aktualisiere betroffene Matrix, "
                  "Scrum-Entwurf, Constraint-Register, Prüfnachweis und Status konsistent. "
                  "Führe python tools/update-scrum-review-progress.py und "
                  "python tools/verify-scrum-review-progress.py aus. Antworte mit Umfang, "
                  "offenen Befunden und exakten Änderungen. Kein Paket als bestanden "
                  "behaupten, solange seine Deckung offen ist.")
        try:
            cli(prompt, integration, False)
            after = progress()
            remaining_ids = set(pending_source_ids())
            if after[0] <= before[0] or after[1] <= before[1] or any(i in remaining_ids for i in ids):
                raise RuntimeError(f"No reviewed progress: {before} -> {after}")
            check = subprocess.run([sys.executable, str(ROOT / "tools/verify-scrum-review-progress.py")],
                                   cwd=ROOT, capture_output=True, text=True)
            if check.returncode:
                raise RuntimeError(f"Structural check failed: {check.stdout} {check.stderr}")
            if label not in state["completed"]:
                state["completed"].append(label)
            state.update(phase="review", current=None, failures=0,
                         reviewed_blocks=after[0], reviewed_candidates=after[1],
                         original_candidates=after[2])
            save(state)
        except (RuntimeError, subprocess.TimeoutExpired) as exc:
            state["failures"] += 1
            state["last_error"] = str(exc)
            save(state)
            if state["failures"] >= MAX_FAILURES:
                state["phase"] = "stopped_no_progress"; save(state); return 3
    state.update(phase="audit", current=None); save(state)
    # Read-only audit uses fresh CLI runs. A finding stops PASS and preserves state
    # for targeted repair; no reviewer's own report is accepted as audit evidence.
    relevant = [r["ID"] for r in rows("traceability-matrix.csv") if r["Relevant"] == "Yes"]
    failures = []
    for offset in range(0, len(relevant), 10):
        if STOP.exists():
            state["phase"] = "stopped_by_user"; save(state); return 2
        ids = relevant[offset:offset + 10]
        label = f"AUD-{offset // 10 + 1:03d}"
        output = REV / f"{label}-audit.md"
        if not output.exists():
            packet = prepare_packet(ids, label)
            prompt = (f"Unabhängiger Read-only-Abschlussaudit {label}, {ids[0]}–{ids[-1]}. "
                      f"Vergleiche Originalquellen aus {packet} direkt mit den aktuellen "
                      "konkreten Zielstellen, nicht nur mit Prüfberichten. Prüfe jede "
                      "Klausel samt Bedingungen/Ausnahmen/Verboten, Status, Herkunft und "
                      "paketübergreifenden Konflikten. Keine Dateien ändern. Gib am Ende "
                      "nur dann die eigene Zeile AUDIT_PASS aus, wenn alles belegt und "
                      "ohne relevante offene Lücke/Entscheidung ist; sonst konkrete "
                      "Befunde und AUDIT_FAIL.")
            cli(prompt, output, True)
        if not re.search(r"^AUDIT_PASS$", output.read_text(encoding="utf-8"), re.M):
            failures.append(label)
            state["audit_findings"] = failures
        state["last_audit"] = label; save(state)
    global_output = REV / "AUD-GLOBAL-audit.md"
    if not global_output.exists():
        prompt = ("Unabhängiger globaler Read-only-Abschlussaudit der bestehenden "
                  "Scrum-Planmigration. Prüfe die Gesamtzahlen, Goal-/Epic-/Story-Herkunft, "
                  "paketübergreifende Widersprüche, historische abgelöste Regeln samt "
                  "Nachfolge DEC-REL-001/002/003, Planning Coverage getrennt von "
                  "Implementierungsstatus und die Auditbefunde unter reviews/. "
                  "Vergleiche stichprobenartig Originalquellen mit aktuellen Zielstellen. "
                  "Keine Dateien ändern. Schließe nur bei lückenloser belegter Deckung "
                  "und ohne offene relevante Entscheidung mit AUDIT_PASS, sonst AUDIT_FAIL.")
        cli(prompt, global_output, True)
    if not re.search(r"^AUDIT_PASS$", global_output.read_text(encoding="utf-8"), re.M):
        failures.append("AUD-GLOBAL")
    if failures:
        state.update(phase="audit_findings", current=None, audit_findings=failures,
                     last_error="Targeted repair required for audit findings")
        save(state); return 4
    state.update(phase="audit_pass", current=None); save(state)
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        data = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
        data["phase"] = "stopped_by_user"
        save(data)
        sys.exit(130)
    except Exception as exc:
        data = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
        data.update(phase="stopped_error", last_error=str(exc))
        save(data)
        raise
