"""Four read-only review workers; one serial coordinator integration; resumable state.

Run locally with existing Codex login. A STOP file ends after current writes.
This controller never deploys and never changes original sources.
"""
import csv
import hashlib
import importlib.util
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from collections import Counter, deque
from concurrent.futures import ThreadPoolExecutor, wait, FIRST_COMPLETED
from pathlib import Path

spec = importlib.util.spec_from_file_location("scrum_legacy", Path(__file__).with_name("continue-scrum-migration.py"))
legacy = importlib.util.module_from_spec(spec)
spec.loader.exec_module(legacy)
ROOT, MIG, REV, STATE, STOP = legacy.ROOT, legacy.MIG, legacy.REV, legacy.STATE, legacy.STOP
QUEUE = MIG / "review-queue.json"
MAX_WORKERS = 4
MAX_FAILURES = 2
COMPLEX = re.compile(r"Freigabe|release|deploy|privacy|datenschutz|security|sicherheit|berechtig|rolle|ausnahme|ausgeschlossen|verbot|nur wenn|sofern|bild|foto|original|oauth|zugriff|backup", re.I)
_LOCK_FD = None

PRE_FINAL_DECISIONS = {
    "SRC-0482": "A5", "SRC-1167": "A5",
    "SRC-1168": "A4",
    # The remaining entries were explicitly resolved on 2026-09-26 and must
    # not be re-opened by later status refreshes.
}
PUBLICATION_SOURCES = {
    "SRC-0504", "SRC-0522", "SRC-0528", "SRC-0658", "SRC-0753", "SRC-0780", "SRC-0922", "SRC-0925",
    "SRC-0940", "SRC-0950", "SRC-0948", "SRC-0949",
}
DEFERRED_SOURCES = {"SRC-1658", "SRC-1169"}
USER_DECISION_SOURCES = set(PRE_FINAL_DECISIONS) | PUBLICATION_SOURCES | DEFERRED_SOURCES


def assign_decision_group(item):
    """Classify confirmed user decisions for migration/audit gating."""
    if item.get("classification") != "USER_DECISION":
        if item.get("classification") == "INSUFFICIENT_EVIDENCE" and item.get("resolution_lane") == "PUBLICATION_EVIDENCE_HOLD":
            item["decision_group"] = "PUBLICATION_DECISION"
            item["blocks_final_audit"] = False
            item["blocks_publication"] = True
            return item
        for key in ("decision_group", "decision_package", "blocks_final_audit", "blocks_publication"):
            item.pop(key, None)
        return item
    sources = set(item.get("source_ids", []))
    q = item.get("question", "").casefold()
    if sources & DEFERRED_SOURCES or ("post-pilot" in q or "nach pilot" in q or
                                      ("später" in q and "ausbau" in q)):
        group, package = "DEFERRED_POST_PILOT", None
    elif sources & PUBLICATION_SOURCES:
        group, package = "PUBLICATION_DECISION", None
    else:
        package = next((PRE_FINAL_DECISIONS[sid] for sid in sorted(sources)
                        if sid in PRE_FINAL_DECISIONS), None)
        if package is None:
            # New user-decision findings default to the applicable pre-audit
            # package; a coordinator can refine the topic without losing it.
            if any(k in q for k in ("phase-0", "phase 0")):
                package = "A5"
            elif any(k in q for k in ("benachrichtig", "warnung", "kiosk", "tablet", "ereignisvertrag")):
                package = "A4"
            elif any(k in q for k in ("fast-track", "backlog", "story", "scrum", "review")):
                package = "A3"
            elif any(k in q for k in ("analytics", "kennzahl", "aufbewahr", "datenschutz", "geheimnis", "ki-entscheidung")):
                package = "A2"
            else:
                package = "A1"
        group = "PRE_FINAL_AUDIT_DECISION"
    item["decision_group"] = group
    item["decision_package"] = package
    item["blocks_final_audit"] = group == "PRE_FINAL_AUDIT_DECISION"
    item["blocks_publication"] = group == "PUBLICATION_DECISION"
    return item


def decision_group_counts(decisions):
    groups = Counter(d.get("decision_group") for d in decisions
                     if d.get("classification") == "USER_DECISION")
    packages = Counter(d.get("decision_package") for d in decisions
                       if d.get("classification") == "USER_DECISION" and
                       d.get("decision_group") == "PRE_FINAL_AUDIT_DECISION")
    return groups, packages


def acquire_controller_lock():
    """Prevent a second coordinator from opening a central write batch."""
    global _LOCK_FD
    if os.name == "nt":
        import msvcrt
        lock_key = hashlib.sha256(str(ROOT).casefold().encode()).hexdigest()[:16]
        lock_path = Path(tempfile.gettempdir()) / f"scrum-migration-{lock_key}.lock"
        _LOCK_FD = os.open(lock_path, os.O_CREAT | os.O_RDWR)
        if os.path.getsize(lock_path) == 0:
            os.write(_LOCK_FD, b"0")
        os.lseek(_LOCK_FD, 0, os.SEEK_SET)
        try:
            msvcrt.locking(_LOCK_FD, msvcrt.LK_NBLCK, 1)
        except OSError as exc:
            os.close(_LOCK_FD)
            _LOCK_FD = None
            raise RuntimeError("Another Scrum migration coordinator already holds the write lock") from exc
    else:
        import fcntl
        lock_key = hashlib.sha256(str(ROOT).casefold().encode()).hexdigest()[:16]
        lock_path = Path(tempfile.gettempdir()) / f"scrum-migration-{lock_key}.lock"
        _LOCK_FD = os.open(lock_path, os.O_CREAT | os.O_RDWR, 0o600)
        try:
            fcntl.flock(_LOCK_FD, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError as exc:
            os.close(_LOCK_FD)
            _LOCK_FD = None
            raise RuntimeError("Another Scrum migration coordinator already holds the write lock") from exc


def original_rows():
    return [r for r in legacy.rows("atomic-requirements.csv")
            if re.fullmatch(r"SRC-\d{4}\.[a-z]+", r["AtomicID"])]


def status(state):
    if not state.get("integrating"):
        atoms = original_rows()
        reviewed = [r for r in atoms if r["ReviewPackage"]]
        coverage = Counter(r["PlanningCoverage"] for r in reviewed)
        state.update(reviewed_blocks=len({r["SourceID"] for r in reviewed}),
                     reviewed_candidates=len(reviewed), remaining_candidates=len(atoms)-len(reviewed),
                     original_candidates=len(atoms), partially_covered=coverage["Partially Covered"],
                     unresolved=coverage["Unresolved"],
                     open_coverage_count=sum(r["PlanningCoverage"] in {"Partially Covered", "Unresolved"}
                                             for r in legacy.rows("atomic-requirements.csv")))
    decision_path = MIG / "decision-queue.json"
    if decision_path.exists():
        try:
            decisions = json.loads(decision_path.read_text(encoding="utf-8"))
            old_decisions = json.dumps(decisions, ensure_ascii=False, sort_keys=True)
            decisions = [assign_decision_group(d) for d in decisions]
            if json.dumps(decisions, ensure_ascii=False, sort_keys=True) != old_decisions:
                decision_path.write_text(json.dumps(decisions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            counts = Counter(d.get("classification", "TECHNICAL") for d in decisions)
            group_counts, package_counts = decision_group_counts(decisions)
            state["decisions_needed"] = decisions
            state["decision_queue_size"] = len(decisions)
            state["decision_classification_counts"] = {
                name: counts[name] for name in ("AUTO_RESOLVABLE", "TECHNICAL", "DUPLICATE", "USER_DECISION", "INSUFFICIENT_EVIDENCE")
            }
            state["decisions_required_from_user"] = counts["USER_DECISION"]
            state["decision_group_counts"] = {
                name: group_counts[name] for name in
                ("PRE_FINAL_AUDIT_DECISION", "PUBLICATION_DECISION", "DEFERRED_POST_PILOT")
            }
            state["pre_final_audit_packages"] = {f"A{i}": package_counts[f"A{i}"] for i in range(1, 6)}
            state["auto_resolvable_findings"] = counts["AUTO_RESOLVABLE"]
            state["publication_decision_count"] = group_counts["PUBLICATION_DECISION"]
            state["deferred_post_pilot_count"] = group_counts["DEFERRED_POST_PILOT"]
            state["reviewable_coverage_count"] = len(open_coverage())
            state["final_audit_status"] = state.get("final_audit", "NOT_STARTED")
            readiness_reasons = []
            if state.get("reviewable_coverage_count", 0):
                readiness_reasons.append("automatisiert prüfbare Coverage-/Evidenzbefunde sind noch offen")
            if group_counts["PRE_FINAL_AUDIT_DECISION"]:
                readiness_reasons.append("PRE_FINAL_AUDIT_DECISIONs sind noch offen")
            if counts["AUTO_RESOLVABLE"]:
                readiness_reasons.append("automatisch auflösbare Befunde sind noch offen")
            if any(d.get("classification") == "TECHNICAL" and d.get("blocks_final_audit") is not False for d in decisions):
                readiness_reasons.append("technische Review-Fragen sind noch offen")
            if any(d.get("classification") == "INSUFFICIENT_EVIDENCE" and d.get("blocks_final_audit") is not False for d in decisions):
                readiness_reasons.append("Nachweise fehlen noch")
            state["final_audit_readiness"] = "READY_FOR_FINAL_AUDIT" if not readiness_reasons else "NOT_READY"
            state["final_audit_readiness_reasons"] = readiness_reasons
            state["block_reason"] = (
                f"{state.get('open_coverage_count', 0)} offene Coverage-Befunde; "
                f"{counts['USER_DECISION']} USER_DECISION, {counts['TECHNICAL']} TECHNICAL, "
                f"{counts['INSUFFICIENT_EVIDENCE']} INSUFFICIENT_EVIDENCE und "
                f"{counts['AUTO_RESOLVABLE']} AUTO_RESOLVABLE."
            )
            (MIG / "user-decisions.json").write_text(json.dumps(
                [d for d in decisions if d.get("classification") == "USER_DECISION"],
                ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            packages_by_source = {r["SourceID"]: r["ReviewPackage"] for r in original_rows()}
            user_sources = {sid for d in decisions if d.get("classification") == "USER_DECISION"
                            for sid in d.get("source_ids", [])}
            package_states = state.get("package_status", {})
            for package, package_state in list(package_states.items()):
                if package_state in {"INTEGRATED", "NEEDS_DECISION"}:
                    package_states[package] = ("NEEDS_DECISION" if any(
                        packages_by_source.get(sid) == package for sid in user_sources) else "INTEGRATED")
            state["package_status"] = package_states
            state["package_decision_status"] = dict(package_states)
            state["integrated_packages"] = sum(v in {"INTEGRATED", "NEEDS_DECISION"} for v in package_states.values())
        except (json.JSONDecodeError, OSError):
            pass
    state["active_worker_count"] = len(state.get("active_workers", {}))
    legacy.save(state)


def classify_decision(question):
    q = question.casefold()
    if "written phase-0 acceptance" in q:
        return "user_decision"
    if any(x in q for x in ("not evidenced", "not supplied", "missing", "nicht belegt", "fehlt", "ohne nachweis",
                            "ohne eindeutigen", "hashes", "originalbytes", "herkunftsnachweis", "verify ")):
        return "missing_evidence"
    if any(x in q for x in ("explicit user decision", "explicit user acceptance", "explicit user approval",
                            "user decision", "user acceptance", "user approval", "veröffentlichungsentscheidung",
                            "ausdrücklicher entscheidung", "express user decision", "confirm with the user",
                            "which existing value story should own", "which existing story should own",
                            "welche bestehende story übernimmt", "welche genau drei kinderbilder waren",
                            "wie sind alter, nötige anonymisierung", "soll das verbot für git chat",
                            "soll das alte google anmeldeverbot", "welcher benachrichtigungskanal",
                            "gilt das freigabe- und datenschutz-gate auch", "gilt das produktentscheidungs- und datenschutz-gate auch",
                            "bezieht sich ‚erst nach der veröffentlichung‘",
                            "bezieht sich \"erst nach der veröffentlichung\"",
                            "sollen hoch/kritisch priorisierte epics", "bezieht sich die archivierungsregel",
                            "bezieht sich „sie können nur archiviert werden“",
                            "erhalten alert_task-karten bei fast-track-einplanung", "welche aufbewahrungsfrist soll phase 0",
                            "darf eine aufgelöste warnung nach menschlicher bestätigung")):
        return "user_decision"
    return "technical_review"


def refresh_decisions(state):
    previous = {}
    previous_by_source = {}
    queue_path = MIG / "decision-queue.json"
    if queue_path.exists():
        try:
            prior_items = json.loads(queue_path.read_text(encoding="utf-8"))
            for item in prior_items:
                key = item.get("decision_key")
                if key:
                    previous[key] = item
                for source_id in item.get("source_ids", []):
                    previous_by_source.setdefault(source_id, []).append(item)
        except (json.JSONDecodeError, OSError):
            previous = {}
            previous_by_source = {}
    # Preserve the last explicit semantic classification across rewritten
    # question text. Source-level priorities supplied by the user remain
    # USER_DECISION while their concrete OpenQuestion is still present.
    history_path = REV / "decision-priority-prestate-2026-09-25-2305" / "decision-queue.json"
    if history_path.exists():
        try:
            for item in json.loads(history_path.read_text(encoding="utf-8")):
                for source_id in item.get("source_ids", []):
                    previous_by_source.setdefault(source_id, []).append(item)
        except (json.JSONDecodeError, OSError):
            pass
    groups = {}
    for row in original_rows():
        question = row.get("OpenQuestion", "").strip()
        if not question:
            continue
        key = re.sub(r"[^a-z0-9äöüß]+", " ", question.casefold()).strip()
        if key not in groups:
            old = previous.get(key, {})
            source_id = row["SourceID"]
            source_history = previous_by_source.get(source_id, [])
            classification = old.get("classification")
            if source_id in USER_DECISION_SOURCES:
                classification = "USER_DECISION"
            if classification not in {"AUTO_RESOLVABLE", "TECHNICAL", "DUPLICATE", "USER_DECISION", "INSUFFICIENT_EVIDENCE"}:
                legacy_type = old.get("type") or classify_decision(question)
                classification = {
                    "user_decision": "USER_DECISION",
                    "missing_evidence": "INSUFFICIENT_EVIDENCE",
                    "technical_review": "TECHNICAL",
                }.get(legacy_type, "TECHNICAL")
            item = {
                "decision_key": key,
                "question": question,
                "classification": classification,
                "classification_rationale": ((old.get("classification_rationale")
                    if old.get("classification") == classification else None) or next(
                    (d.get("classification_rationale") for d in source_history
                     if d.get("classification") == classification and d.get("classification_rationale")),
                    "Offene, ausdrücklich priorisierte Nutzerentscheidung; ihre Klausel ist weiterhin ungelöst.")),
                "source_ids": [],
            }
            for extra in ("deduplicated_source_group", "deduplication_note"):
                if extra in old:
                    item[extra] = old[extra]
            groups[key] = item
        item = groups[key]
        if row["SourceID"] not in item["source_ids"]:
            item["source_ids"].append(row["SourceID"])
    values = list(groups.values())
    values = [assign_decision_group(item) for item in values]
    (MIG / "decision-queue.json").write_text(json.dumps(values, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    counts = Counter(x["classification"] for x in values)
    state["decision_classification_counts"] = {
        name: counts[name] for name in ("AUTO_RESOLVABLE", "TECHNICAL", "DUPLICATE", "USER_DECISION", "INSUFFICIENT_EVIDENCE")
    }
    state["decisions_required_from_user"] = counts["USER_DECISION"]
    state["decision_queue_size"] = len(values)
    group_counts, package_counts = decision_group_counts(values)
    state["decision_group_counts"] = {
        name: group_counts[name] for name in
        ("PRE_FINAL_AUDIT_DECISION", "PUBLICATION_DECISION", "DEFERRED_POST_PILOT")
    }
    state["pre_final_audit_packages"] = {f"A{i}": package_counts[f"A{i}"] for i in range(1, 6)}
    state["publication_decision_count"] = group_counts["PUBLICATION_DECISION"]
    state["deferred_post_pilot_count"] = group_counts["DEFERRED_POST_PILOT"]
    state["decisions_needed"] = values
    (MIG / "user-decisions.json").write_text(json.dumps(
        [x for x in values if x["classification"] == "USER_DECISION"], ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def update_package_status(state, queue, unfinished, active, ready, integration_batch, refresh_counts=False):
    if refresh_counts:
        refresh_decisions(state)
        reviewed_rows = [row for row in original_rows() if row.get("ReviewPackage")]
        coverage_counts = Counter(row["PlanningCoverage"] for row in reviewed_rows)
        state["partially_covered"] = coverage_counts["Partially Covered"]
        state["unresolved"] = coverage_counts["Unresolved"]
    decision_sources = {sid for d in state.get("decisions_needed", [])
                       if d.get("classification") == "USER_DECISION" or d.get("type") == "user_decision"
                       for sid in d.get("source_ids", [])}
    active_names = {p["label"] for p in active.values()}
    ready_names = {p["label"] for p in ready}
    integrating_names = {p["label"] for p in integration_batch or []}
    completed_names = set(state.get("completed", []))
    statuses = dict(state.get("package_status", {}))
    for p in queue:
        name = p["label"]
        if name in active_names:
            value = "REVIEWING"
        elif name in integrating_names:
            value = "INTEGRATING"
        elif name in ready_names:
            value = "QUEUED_FOR_INTEGRATION"
        elif name in completed_names:
            value = ("NEEDS_DECISION" if set(p["ids"]) & decision_sources else
                     state.get("package_decision_status", {}).get(name, "INTEGRATED"))
        elif (REV / f"{name}-review.md").exists():
            value = "REVIEW_COMPLETE"
        else:
            value = "QUEUED_FOR_REVIEW"
        statuses[name] = value
    state["package_status"] = statuses
    state["review_queue_size"] = sum(v in {"QUEUED_FOR_REVIEW", "REVIEWING"} for v in statuses.values())
    state["integration_queue_size"] = sum(v in {"REVIEW_COMPLETE", "QUEUED_FOR_INTEGRATION", "INTEGRATING"} for v in statuses.values())
    state["integrated_packages"] = sum(v in {"INTEGRATED", "NEEDS_DECISION"} for v in statuses.values())
    state["current_integration_batch"] = [p["label"] for p in integration_batch or []]
    not_integrated = [p for p in queue if statuses.get(p["label"]) in
                      {"REVIEW_COMPLETE", "QUEUED_FOR_INTEGRATION", "INTEGRATING"}]
    ready_candidates = sum(p["candidates"] for p in not_integrated)
    state["reviewed_not_integrated_candidates"] = ready_candidates
    if refresh_counts or "integrated_candidates" not in state:
        state["integrated_candidates"] = legacy.progress()[1]
        state["original_candidates"] = legacy.progress()[2]
    state["reviewed_candidates"] = state["integrated_candidates"] + ready_candidates
    state["remaining_candidates"] = max(0, state["original_candidates"] - state["reviewed_candidates"])
    state["active_worker_count"] = len(active)
    if state["integration_queue_size"] > 15:
        state["review_worker_limit"] = 2
    elif state["integration_queue_size"] <= 8:
        state["review_worker_limit"] = MAX_WORKERS
    else:
        state.setdefault("review_worker_limit", MAX_WORKERS)
    review_states = {name: value for name, value in statuses.items()
                     if value in {"QUEUED_FOR_REVIEW", "REVIEWING"}}
    integration_states = {name: value for name, value in statuses.items()
                          if value in {"REVIEW_COMPLETE", "QUEUED_FOR_INTEGRATION", "INTEGRATING", "NEEDS_RECHECK"}}
    (MIG / "review-queue-state.json").write_text(json.dumps(review_states, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    (MIG / "integration-queue.json").write_text(json.dumps(integration_states, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    legacy.save(state)


def make_queue():
    if QUEUE.exists():
        queue = json.loads(QUEUE.read_text(encoding="utf-8"))
        assert len({sid for p in queue for sid in p["ids"]}) == sum(len(p["ids"]) for p in queue)
        return queue
    matrix = legacy.rows("traceability-matrix.csv")
    sources = {r["ID"]: r for r in legacy.rows("source-inventory.csv")}
    atoms = original_rows()
    groups = {}
    for row in atoms:
        groups.setdefault(row["SourceID"], []).append(row)
    reviewed = {r["SourceID"] for r in atoms if r["ReviewPackage"]}
    pending = [r["ID"] for r in matrix if r["Relevant"] == "Yes" and r["ID"] not in reviewed]
    result, used = [], set()
    # Existing read-only reports are reused for their exact source ranges.
    for start, end, number in ((510, 519, 19), (520, 529, 20), (530, 539, 21)):
        ids = [sid for sid in pending if start <= int(sid[4:]) <= end]
        if ids:
            result.append({"label": f"PKG-{number:03d}", "ids": ids,
                           "candidates": sum(len(groups.get(sid, [])) for sid in ids),
                           "complex": True})
            used.update(ids)
    number = 22
    batch, count, complex_batch = [], 0, False
    for sid in pending:
        if sid in used:
            continue
        n = len(groups.get(sid, []))
        is_complex = bool(COMPLEX.search(sources[sid]["OriginalText"]))
        limit = 65 if complex_batch or is_complex else 90
        if batch and (count + n > limit or len(batch) >= 30):
            result.append({"label": f"PKG-{number:03d}", "ids": batch,
                           "candidates": count, "complex": complex_batch})
            number += 1; batch, count, complex_batch = [], 0, False
        batch.append(sid); count += n; complex_batch |= is_complex
    if batch:
        result.append({"label": f"PKG-{number:03d}", "ids": batch,
                       "candidates": count, "complex": complex_batch})
    assert len({sid for p in result for sid in p["ids"]}) == len(pending)
    QUEUE.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return result


def packet_file(packet):
    path = REV / f"{packet['label']}-input.json"
    if path.exists():
        saved = json.loads(path.read_text(encoding="utf-8"))
        if [r["ID"] for r in saved["sources"]] == packet["ids"]:
            return path
    return legacy.prepare_packet(packet["ids"], packet["label"])


def review(packet):
    label, ids = packet["label"], packet["ids"]
    path = REV / f"{label}-review.md"
    source_file = packet_file(packet)
    if path.exists() and path.stat().st_size > 100:
        return path
    target_files = [MIG / "scrum-plan-draft.md", MIG / "constraint-register.md"]
    target_before = {str(p): hashlib.sha256(p.read_bytes()).hexdigest() for p in target_files}
    prompt = (f"Du bist ausschließlich lesender Review-Worker für {label}: "
              f"{ids[0]} bis {ids[-1]}; genau diese IDs, keine anderen. "
              f"Vollständige Originalblöcke, alle Klauselkandidaten und bestehende "
              f"Matrix-Zuordnungen stehen in {source_file}. Lies die dort genannten "
              "Originaldateien und die konkreten Zielabschnitte in scrum-plan-draft.md "
              "und constraint-register.md direkt; lies gezielt AGENTS.md, "
              "docs/project-rules/scrum-planning.md und release-decisions.md. "
              "Prüfe für jede Klausel Atomarität, Bedeutung, Bedingungen, Ausnahmen, "
              "Verbote, Rollen, Scope, echte Planning Coverage, korrekte Zielzuordnung, "
              "fehlende Klauseln, Duplikate und Konflikte. Kennzeichne Simple/Complex "
              "intern; prüfe auch Simple semantisch einzeln mit Begründung. "
              "Wähle keine Stichprobe. Bei nötiger Nutzerentscheidung: konkrete Frage "
              "und Unresolved, übriges Paket weiterprüfen. Keine Unterdelegation. "
              "Keine Dateien ändern; die separate Ergebnisdatei wird von codex exec "
              "aus deiner Antwort erstellt. Liefere zusätzlich am Ende einen fenced JSONL-Block "
              "mit genau einem Objekt je ursprünglichem CandidateID aus dem Paket (keine "
              "Kandidaten auslassen). Pflichtfelder: PackageID, SourceBlockID, CandidateID, "
              "Classification, PlanningCoverage, TargetType, TargetID, RequiredChange, "
              "DecisionRequired (true/false), DecisionQuestion, ReviewerConfidence (0..1), "
              "ShortRationale. Bei geteilten Kandidaten SuccessorIDs ergänzen. Erkläre Simple/Complex "
              "pro Zeile kurz in Classification/Rationale. Dazu einen knappen Markdown-Befund "
              "mit Paketrisiken. Kein pauschales PASS.")
    result = legacy.cli(prompt, path, True)
    target_after = {str(p): hashlib.sha256(p.read_bytes()).hexdigest() for p in target_files}
    target_state = {"package": label, "before": target_before, "after": target_after,
                    "changed_during_review": target_before != target_after}
    (REV / f"{label}-target-state.json").write_text(json.dumps(target_state, indent=2)+"\n", encoding="utf-8")
    block = re.search(r"```(?:jsonl)?\s*\n(.*?)\n```", result, re.S | re.I)
    if not block:
        raise RuntimeError(f"{label} worker omitted required JSONL")
    records = [json.loads(line) for line in block.group(1).splitlines() if line.strip()]
    required = {"PackageID", "SourceBlockID", "CandidateID", "Classification", "PlanningCoverage",
                "TargetType", "TargetID", "RequiredChange", "DecisionRequired", "DecisionQuestion",
                "ReviewerConfidence", "ShortRationale"}
    if any(not required.issubset(record) or record["PackageID"] != label for record in records):
        raise RuntimeError(f"{label} malformed structured review rows")
    packet_data = json.loads(source_file.read_text(encoding="utf-8"))
    source_by_candidate = {r["AtomicID"]: r["SourceID"] for r in packet_data["candidates"]
                           if re.fullmatch(r"SRC-\d{4}\.[a-z]+", r["AtomicID"])}
    expected = set(source_by_candidate)
    found = {r["CandidateID"] for r in records}
    if found != expected or len(records) != len(expected):
        raise RuntimeError(f"{label} JSONL candidate mismatch; missing={len(expected-found)}, extra={len(found-expected)}")
    for record in records:
        if record["SourceBlockID"] != source_by_candidate[record["CandidateID"]]:
            raise RuntimeError(f"{label} candidate/source mismatch: {record['CandidateID']}")
        if not isinstance(record["DecisionRequired"], bool):
            raise RuntimeError(f"{label} DecisionRequired must be boolean")
        if not isinstance(record["ReviewerConfidence"], (int, float)) or not 0 <= record["ReviewerConfidence"] <= 1:
            raise RuntimeError(f"{label} ReviewerConfidence outside [0,1]")
    (REV / f"{label}-review.jsonl").write_text(
        "\n".join(json.dumps(r, ensure_ascii=False) for r in records) + "\n", encoding="utf-8")
    return path


def original_hashes():
    paths = {row["Source"] for row in legacy.rows("source-inventory.csv")}
    return {name: hashlib.sha256((ROOT / name).read_bytes()).hexdigest() for name in paths}


def integrate_batch(packets, batch_number, baseline_hashes):
    label = f"BATCH-{batch_number:03d}"
    ids = [sid for packet in packets for sid in packet["ids"]]
    references = []
    for packet in packets:
        input_path = packet_file(packet)
        review_path = REV / f"{packet['label']}-review.md"
        jsonl_path = REV / f"{packet['label']}-review.jsonl"
        target_state = REV / f"{packet['label']}-target-state.json"
        references.append(f"{packet['label']} ({packet['candidates']} candidates): {review_path}; "
                          f"input {input_path}; structured {jsonl_path if jsonl_path.exists() else 'pre-existing Markdown'}; "
                          f"target-snapshot {target_state if target_state.exists() else 'legacy, compare current target'}")
    output = REV / f"{label}-integration.md"
    expected_count = sum(p["candidates"] for p in packets)
    before_count = legacy.progress()[1]
    prompt = (f"Du bist der einzige schreibende Coordinator-Integrator für {label}; "
              f"{len(packets)} vollständig geprüfte Pakete, {sum(p['candidates'] for p in packets)} Kandidaten:\n" +
              "\n".join(references) + "\n" +
              f"Quell-ID-Bereich {ids[0]}–{ids[-1]}. Worker haben die Klauseln fachlich vollständig geprüft. "
              "Übernimm ihre geprüften Befunde; wiederhole nicht die semantische Detailprüfung. "
              "Prüfe nur IDs, Zielstellen, Konflikte und Änderungen seit Review. Wenn eine Zielstelle "
              "geändert wurde, prüfe nur die betroffenen Zuordnungen und Abhängigkeiten erneut. "
              "Integriere alle Paketbefunde in atomic-requirements.csv, traceability-matrix.csv, "
              "scrum-plan-draft.md und constraint-register.md. Offene Klauseln bleiben einzeln als "
              "ConcreteTarget must use only existing references: every story as STORY-ID#Acceptance-Criteria, "
              "constraints as constraint-register.md#src-NNNN, or an existing SRC candidate ID. "
              "Never use a batch name or a scrum-plan-draft.md fragment as a target anchor. Validate every "
              "reference against story-catalog.json and the actual constraint heading before writing. "
              "Partially Covered/Unresolved mit konkreter Frage. Keine Originalpläne/-quellen, "
              "Produktdateien, Datenbanken, Bilder, controller-state.json oder Reviewberichte ändern. "
              "Kein WSJF, keine neuen Features. Trenne Planning Coverage von Implementation Verification. "
              "Führe keine globale Zählung, Reverse-Prüfung oder Berichtserzeugung aus; das erledigt "
              "der Coordinator einmal nach dem Batch. Gib je Paket integrierte Kandidatenzahl, "
              "Needs Decision, Needs Recheck und Konflikte an. Am Ende zusätzlich fenced JSON mit "
              "einem Objekt je PackageID und Feldern PackageID, Integrated, Status (INTEGRATED, "
              "NEEDS_DECISION oder NEEDS_RECHECK), RecheckSourceIDs, DecisionRequired, "
              "DecisionQuestion, CandidateCount. JSON-Status muss genau zu den zentral integrierten "
              "Zeilen und den gemeldeten Zielkonflikten passen.")
    result = legacy.cli(prompt, output, False)
    block = re.search(r"```json\s*\n(.*?)\n```", result, re.S | re.I)
    if block:
        statuses = json.loads(block.group(1))
    else:
        status_prompt = (f"Read the completed {label} integration report at {output}. Do not change files. "
                         "Return only a valid JSON array, one object per listed package, with PackageID, "
                         "Integrated (boolean), Status (INTEGRATED, NEEDS_DECISION, NEEDS_RECHECK), "
                         "RecheckSourceIDs (array), DecisionRequired (boolean), DecisionQuestion (string), "
                         "CandidateCount (integer). Preserve explicit results and counts; infer no approval "
                         "or coverage.")
        status_text = legacy.cli(status_prompt, REV / f"{label}-status-extraction.txt", True).strip()
        statuses = json.loads(status_text)
    if isinstance(statuses, dict):
        statuses = statuses.get("packages", [])
    expected_labels = {p["label"] for p in packets}
    if {x.get("PackageID") for x in statuses} != expected_labels:
        raise RuntimeError(f"{label} integration status package mismatch")
    for item in statuses:
        if (not isinstance(item.get("Integrated"), bool) or
            item.get("Status") not in {"INTEGRATED", "NEEDS_DECISION", "NEEDS_RECHECK"} or
            not isinstance(item.get("CandidateCount"), int)):
            raise RuntimeError(f"{label} malformed package status for {item.get('PackageID')}")
    (REV / f"{label}-status.json").write_text(json.dumps(statuses, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    if original_hashes() != baseline_hashes:
        raise RuntimeError(f"Original source changed during {label}; stop and inspect before continuing")
    atoms = legacy.rows("atomic-requirements.csv")
    original = {r["AtomicID"]: r for r in atoms if re.fullmatch(r"SRC-\d{4}\.[a-z]+", r["AtomicID"])}
    for packet in packets:
        input_data = json.loads(packet_file(packet).read_text(encoding="utf-8"))
        expected_ids = {r["AtomicID"] for r in input_data["candidates"]
                        if re.fullmatch(r"SRC-\d{4}\.[a-z]+", r["AtomicID"])}
        missing = [aid for aid in expected_ids if aid not in original or original[aid]["ReviewPackage"] != packet["label"]]
        if missing:
            raise RuntimeError(f"Incomplete candidate integration for {packet['label']}: {missing[:8]}")
    after = legacy.progress()
    if after[1] - before_count < expected_count:
        raise RuntimeError(f"Batch count underflow: expected {expected_count}, got {after[1]-before_count}")
    return after, statuses


def open_coverage():
    decisions = {}
    path = MIG / "decision-queue.json"
    if path.exists():
        try:
            decisions = {}
            for d in json.loads(path.read_text(encoding="utf-8")):
                decisions[re.sub(r"[^a-z0-9äöüß]+", " ", d.get("question", "").casefold()).strip()] = d
                for candidate_id in d.get("related_candidate_ids", []):
                    decisions[candidate_id] = d
                for source_id in d.get("source_ids", []):
                    decisions[source_id] = d
        except (json.JSONDecodeError, OSError):
            decisions = {}
    result = []
    for row in legacy.rows("atomic-requirements.csv"):
        if not row["ReviewPackage"]:
            continue
        if row["PlanningCoverage"] not in {"Partially Covered", "Unresolved"} and not row["OpenQuestion"]:
            continue
        key = re.sub(r"[^a-z0-9äöüß]+", " ", row.get("OpenQuestion", "").casefold()).strip()
        decision = decisions.get(row["AtomicID"], decisions.get(row["SourceID"], decisions.get(key, {})))
        if decision.get("classification") == "USER_DECISION":
            continue
        if decision.get("blocks_final_audit") is False:
            continue
        result.append(row)
    return result


def repair_coverage(state, baseline_hashes):
    reviewed_sources = set(state.get("coverage_repair_reviewed_source_ids", []))
    rechecked_candidates = set(state.get("coverage_repair_targeted_candidate_ids", []))
    completed_batches = set(state.get("coverage_repair_completed_batches", []))
    for input_path in REV.glob("COVERAGE-R*-*-input.json"):
        label = input_path.name[:-len("-input.json")]
        output = REV / f"{label}-repair.md"
        if not output.is_file():
            continue
        try:
            packet = json.loads(input_path.read_text(encoding="utf-8"))
            ids = {item["ID"] for item in packet.get("sources", []) if item.get("ID")}
        except (json.JSONDecodeError, OSError, KeyError):
            continue
        reviewed_sources.update(ids)
        completed_batches.add(label)
    state["coverage_repair_reviewed_source_ids"] = sorted(reviewed_sources)
    state["coverage_repair_completed_batches"] = sorted(completed_batches)
    used_numbers = []
    for value in completed_batches:
        match = re.fullmatch(r"COVERAGE-R\d+-(\d+)", value)
        if match:
            used_numbers.append(int(match.group(1)))
    for path in REV.glob("COVERAGE-R*-*-input.json"):
        match = re.fullmatch(r"COVERAGE-R\d+-(\d+)-input\.json", path.name)
        if match:
            used_numbers.append(int(match.group(1)))
    next_batch_number = max(used_numbers, default=0) + 1
    # Source-level repair passes are complete. Recheck only the remaining
    # non-user-decision candidates, filtering packet rows to those exact IDs.
    open_rows = [row for row in open_coverage() if row["AtomicID"] not in rechecked_candidates]
    if not open_rows:
        state["reviewable_coverage_count"] = len(open_coverage())
        return not open_coverage()
    while open_rows:
        grouped = {}
        for row in open_rows:
            grouped.setdefault(row["SourceID"], []).append(row)
        source_ids = list(grouped)
        ids = source_ids[:10]
        if STOP.exists():
            state["phase"] = "stopped_by_user"; status(state); return False
        label = f"COVERAGE-R1-{next_batch_number:03d}"
        next_batch_number += 1
        if any((REV / f"{label}{suffix}").exists()
               for suffix in ("-input.json", "-repair.md", "-repair.log")):
            raise RuntimeError(f"Refusing to overwrite existing coverage repair artifact: {label}")
        packet = legacy.prepare_packet(ids, label)
        packet_data = json.loads(packet.read_text(encoding="utf-8"))
        target_candidate_ids = {row["AtomicID"] for sid in ids for row in grouped[sid]}
        packet_data["candidates"] = [row for row in packet_data.get("candidates", [])
                                      if row.get("AtomicID") in target_candidate_ids]
        packet_data["review_mode"] = "TARGETED_RECHECK_OF_REMAINING_FINDINGS"
        packet.write_text(json.dumps(packet_data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        output = REV / f"{label}-repair.md"
        prompt = (f"Gezielte fachliche Nachprüfung {label} ausschließlich der offenen CandidateIDs "
                  f"{', '.join(sorted(target_candidate_ids))}. Frühere Vollreviews sind abgeschlossen; "
                  f"wiederhole sie nicht. Original-Quelltexte und aktuelle Zielstellen sind im Paket "
                  f"{packet} verknüpft. Vergleiche jeden gelisteten Kandidaten direkt mit dem aktuellen "
                  "Scrum-Entwurf und den geltenden Projektregeln. Schließe nur belegte Planungslücken; "
                  "wenn ein AC/Constraint die Klausel bereits tatsächlich abdeckt, korrigiere die "
                  "Zuordnung gezielt. Erhalte echte PRE_FINAL_AUDIT_DECISIONs, PUBLICATION_DECISIONs "
                  "und DEFERRED_POST_PILOT-Fragen als getrennte Holds und erfinde keine Antwort. "
                  "Markiere Veröffentlichung bis zur Freigabe ausdrücklich gesperrt; B und C blockieren "
                  "den technischen Final Audit nicht. Keine Originalplan-, Produkt-, Bild-, Datenbank- "
                  "oder Live-System-Änderung. Ändere die zentralen Migrationsunterlagen als Coordinator, "
                  "nicht controller-state.json oder Reviewberichte. Führe Fortschrittsaktualisierung und "
                  "die erforderliche lokale Strukturprüfung aus. Berichte je CandidateID Ziel und Ergebnis "
                  "sowie verbleibende technische, automatisch lösbare oder Evidenzbefunde einzeln.")
        legacy.cli(prompt, output, False)
        if original_hashes() != baseline_hashes:
            raise RuntimeError("Original source changed during targeted coverage recheck")
        reviewed_sources.update(ids)
        rechecked_candidates.update(target_candidate_ids)
        completed_batches.add(label)
        state["coverage_repair_reviewed_source_ids"] = sorted(reviewed_sources)
        state["coverage_repair_targeted_candidate_ids"] = sorted(rechecked_candidates)
        state["coverage_repair_completed_batches"] = sorted(completed_batches)
        state.update(phase="coverage_repair", last_repair=label)
        refresh_decisions(state)
        subprocess.run([sys.executable, str(ROOT / "tools/update-scrum-review-progress.py")],
                       check=True, stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
        status(state)
        open_rows = [row for row in open_coverage() if row["AtomicID"] not in rechecked_candidates]
    state["reviewable_coverage_count"] = len(open_coverage())
    return not open_coverage()


def main():
    acquire_controller_lock()
    if STOP.exists():
        raise RuntimeError("STOP file is present")
    if hashlib.sha256((MIG / "source-inventory.csv").read_bytes()).hexdigest() != legacy.SOURCE_HASH:
        raise RuntimeError("Source inventory changed; reconcile before continuation")
    queue = make_queue()
    baseline_hashes = original_hashes()
    # Packet inputs are frozen before the single writer starts, so workers
    # never read a CSV while the coordinator is rewriting it.
    for packet in queue:
        packet_file(packet)
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    state.update(phase="parallel_review", active_workers={}, integrating=None,
                 queued_packages=len(queue), worker_limit=MAX_WORKERS, last_error=None,
                 completed_runs=state.get("completed_runs", []), failures=0)
    unfinished, ready = deque(), deque()
    pending_ids = set(legacy.pending_source_ids())
    integrated = set(state.get("completed", []))
    integrated.update(p["label"] for p in queue
                      if (REV / f"{p['label']}-review.md").exists() and not (set(p["ids"]) & pending_ids))
    state["completed"] = list(dict.fromkeys(list(state.get("completed", [])) + list(integrated)))
    for packet in queue:
        if packet["label"] in integrated or not (set(packet["ids"]) & pending_ids):
            continue
        if (REV / f"{packet['label']}-review.md").exists():
            ready.append(packet)
        else:
            unfinished.append(packet)
    active = {}
    integration = None
    failure_count = 0
    package_failures = Counter()
    existing_batches = [int(match.group(1)) for path in REV.glob("BATCH-*-integration.md")
                        if (match := re.fullmatch(r"BATCH-(\d+)-integration\.md", path.name))]
    batch_number = max(existing_batches, default=0) + 1
    state["integration_batches"] = max(existing_batches, default=0)
    update_package_status(state, queue, unfinished, active, ready, [], refresh_counts=True)
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as workers, ThreadPoolExecutor(max_workers=1) as writer:
        while unfinished or active or ready or integration:
            if STOP.exists() and not integration:
                state.update(phase="stopped_by_user", active_workers={}, integrating=None)
                update_package_status(state, queue, unfinished, active, ready, [], refresh_counts=True); return 2
            if failure_count >= MAX_FAILURES:
                state.update(phase=("needs_recheck" if any(v == "NEEDS_RECHECK" for v in state.get("package_decision_status", {}).values())
                                    else "stopped_no_progress"), failures=failure_count)
                update_package_status(state, queue, unfinished, active, ready, [], refresh_counts=True); return 3
            current_ready_candidates = sum(p["candidates"] for p in ready)
            while unfinished and len(active) < state["review_worker_limit"] and not STOP.exists():
                if len(ready) > 15:
                    state["review_worker_limit"] = 2
                packet = unfinished.popleft()
                future = workers.submit(review, packet)
                active[future] = packet
                state["active_workers"][packet["label"]] = {
                    "ids": [packet["ids"][0], packet["ids"][-1]],
                    "candidates": packet["candidates"], "started_utc": legacy.stamp()}
                update_package_status(state, queue, unfinished, active, ready, [], refresh_counts=False)
            flush = len(ready) >= 5 or current_ready_candidates >= 300 or (not unfinished and not active and ready)
            if not integration and ready and flush and not STOP.exists():
                batch, count = [], 0
                while ready and len(batch) < 10:
                    candidate_count = ready[0]["candidates"]
                    if batch and count + candidate_count > 600:
                        break
                    batch.append(ready.popleft()); count += candidate_count
                    if len(batch) >= 5 or count >= 300:
                        break
                integration = (writer.submit(integrate_batch, batch, batch_number, baseline_hashes), batch)
                state.update(phase="integrating", integrating=f"BATCH-{batch_number:03d}")
                update_package_status(state, queue, unfinished, active, ready, batch, refresh_counts=False)
            futures = list(active) + ([integration[0]] if integration else [])
            if not futures:
                time.sleep(1); continue
            done, _ = wait(futures, timeout=5, return_when=FIRST_COMPLETED)
            for future in done:
                if future in active:
                    packet = active.pop(future)
                    state["active_workers"].pop(packet["label"], None)
                    try:
                        future.result()
                        ready.append(packet)
                    except Exception as exc:
                        failure_count += 1
                        package_failures[packet["label"]] += 1
                        state["last_error"] = f"Review {packet['label']}: {exc}"
                        unfinished.appendleft(packet)
                    update_package_status(state, queue, unfinished, active, ready,
                                          integration[1] if integration else [], refresh_counts=False)
                elif integration and future == integration[0]:
                    batch = integration[1]
                    integration = None
                    state["integrating"] = None
                    try:
                        _, batch_statuses = future.result()
                        subprocess.run([sys.executable, str(ROOT / "tools/update-scrum-review-progress.py")],
                                       cwd=ROOT, check=True, capture_output=True, text=True)
                        check = subprocess.run([sys.executable, str(ROOT / "tools/verify-scrum-review-progress.py")],
                                               cwd=ROOT, capture_output=True, text=True)
                        if check.returncode:
                            raise RuntimeError(f"Batch structural check failed: {check.stdout} {check.stderr}")
                        state["completed_runs"].append({"batch": f"BATCH-{batch_number:03d}",
                             "packages": [p["label"] for p in batch], "candidates": sum(p["candidates"] for p in batch),
                             "finished_utc": legacy.stamp()})
                        state.setdefault("completed", [])
                        state.setdefault("package_decision_status", {})
                        status_by_package = {item["PackageID"]: item for item in batch_statuses}
                        for packet in batch:
                            if packet["label"] not in state["completed"]:
                                state["completed"].append(packet["label"])
                            item = status_by_package[packet["label"]]
                            if item.get("CandidateCount") != packet["candidates"] or item.get("Integrated") is not True:
                                raise RuntimeError(f"Structured package status count/state mismatch for {packet['label']}")
                            status_value = item.get("Status")
                            if status_value not in {"INTEGRATED", "NEEDS_DECISION", "NEEDS_RECHECK"}:
                                raise RuntimeError(f"Invalid package status for {packet['label']}: {status_value}")
                            state["package_decision_status"][packet["label"]] = status_value
                        failure_count = 0
                        batch_number += 1
                        state["integration_batches"] = batch_number - 1
                        state["phase"] = "parallel_review"
                    except Exception as exc:
                        current = legacy.rows("atomic-requirements.csv")
                        current_ids = {row["AtomicID"]: row.get("ReviewPackage", "") for row in current}
                        batch_ids = {aid for packet in batch for aid in packet["ids"]}
                        written_ids = {aid for aid in batch_ids if current_ids.get(aid) in {p["label"] for p in batch}}
                        if written_ids:
                            state.setdefault("completed", [])
                            state.setdefault("package_decision_status", {})
                            for packet in batch:
                                if packet["label"] not in state["completed"]:
                                    state["completed"].append(packet["label"])
                                state["package_decision_status"][packet["label"]] = "NEEDS_RECHECK"
                            failure_count = MAX_FAILURES
                        else:
                            failure_count += 1
                            ready.extendleft(reversed(batch))
                        for packet in batch:
                            package_failures[packet["label"]] += 1
                        state["last_error"] = f"Integration {','.join(p['label'] for p in batch)}: {exc}"
                    update_package_status(state, queue, unfinished, active, ready, [], refresh_counts=True)
    state.update(phase="coverage_repair", active_workers={}, integrating=None)
    status(state)
    if not repair_coverage(state, baseline_hashes):
        atoms = legacy.rows("atomic-requirements.csv")
        gaps = sum(row.get("ReviewPackage") and row["PlanningCoverage"] in {"Partially Covered", "Unresolved"}
                   for row in atoms)
        state.update(phase="coverage_blocked", open_coverage_count=gaps, last_error=None)
        state["block_reason"] = (
            f"{gaps} offene Coverage-Befunde; "
            f"{state.get('decisions_required_from_user', 0)} USER_DECISION, "
            f"{state.get('decision_classification_counts', {}).get('TECHNICAL', 0)} TECHNICAL und "
            f"{state.get('decision_classification_counts', {}).get('INSUFFICIENT_EVIDENCE', 0)} INSUFFICIENT_EVIDENCE."
        )
        status(state); return 4
    # Publication-only choices and post-pilot scope stay explicitly gated but
    # do not block the independent technical audit. The pre-audit group does.
    status(state)
    if state.get("decision_group_counts", {}).get("PRE_FINAL_AUDIT_DECISION", 0):
        state.update(phase="awaiting_pre_final_audit_decisions", last_error=None)
        status(state)
        return 5
    state["phase"] = "audit"
    status(state)
    return legacy.main()


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        data = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
        data.update(phase="stopped_by_user", active_workers={}, integrating=None)
        status(data); sys.exit(130)
    except Exception as exc:
        data = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
        data.update(phase="stopped_error", last_error=str(exc), active_workers={}, integrating=None)
        status(data); raise
