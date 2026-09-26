# ST-SOT-17: bounded local post-validation

Status: **local component implemented; project-level end-to-end acceptance remains open**.

`tools/sot/post-validation.mjs` checks one declared SoT update against the current module files. It validates the registry, current contract catalogue and dependency graph, compares named updated module snapshots with bytes on disk, then runs the existing immutable incremental audit. A completed update requires an actual delta and a passing FAST or FULL check. The existing impact engine selects that mode; FULL retains `⚠ FULL CHECK REQUIRED` and the affected scope. Caller-provided SoT consistency and traceability checkers must return explicit PASS evidence. Missing checkers, stale snapshots, absent deltas, or failed checks block the result.

Verification: `node --test tools/sot/post-validation.test.mjs` — 4 passed. Cases cover a real FAST audit, stale source and missing checker, a false completed-update claim with no delta, and FULL escalation with failed traceability. Test fixtures use current repository sources and write temporary audit evidence under `docs/sot-optimization/audits/`; fixtures are removed afterward.

Limits: This component does not make a SoT update or independently prove semantic equivalence. The real project needs authoritative SoT consistency and traceability validators, and the FULL check needs concrete scoped validators. The repository's existing contract validator currently checks catalogue structure and source references; domain runtime behaviour still needs its own contract checks. No Golden Scrum Core or historical `ausbauplan.md` content was changed for this component.
