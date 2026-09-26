# ST-SOT-18: Definition-of-Done guard

Status: **local guard is wired to the worker-state Done transition; trusted checker integration remains open**.

`tools/sot/done-guard.mjs` exports a pure `evaluateDoneGuard` function. It returns
`DONE_ALLOWED` only when scope is named, there is either explicit SoT-update
evidence with a passing post-validation or a scope-matched, evidenced statement
that no SoT update is required, no unresolved conflicts are declared, all
required checks have unique IDs and explicit PASS evidence, and Contract,
Dependency, consistency, and post-validation results pass. Missing, malformed,
or failed evidence returns `DONE_BLOCKED`. `tools/sot/worker-state.mjs` runs this
guard inside the integration transaction before it persists `Execution State:
Done`. The accepted evidence and guard result are retained in the operational
worker record, and snapshots revalidate the stored completion structure.

Verification: `node --test tools/sot/done-guard.test.mjs tools/sot/worker-state.test.mjs` — 12 passed. Cases cover both valid paths and fail-closed behavior for absent scope/update proof, open conflicts, missing/failed/duplicate checks, each proof category, post-validation failure, mismatched scope, and worker integration.

Limits: the guard validates the shape and status of caller-supplied evidence; it
does not authenticate evidence references, dereference their contents, or run
project-specific checkers itself. Trusted checker outputs and real source
validation remain follow-up work. No Scrum Core or historical `ausbauplan.md`
content was changed.
