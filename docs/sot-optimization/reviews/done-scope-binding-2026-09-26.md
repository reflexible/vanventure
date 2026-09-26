# DONE evidence scope binding - 26 September 2026

Status: LOCAL_VERIFIED_PARTIAL. Runtime preparation for WI-SOT-18. No Core rule, shared plan or worker record changed by this worker; no production deployment or commit.

## Implemented checks

| Risk | Enforcement | Regression evidence |
| --- | --- | --- |
| Completion evidence from another work item | integrate requires completion_evidence.scope to equal the exact work_item_id; snapshots recompute the guard with the same expected ID and validate stored guard scope. | Unrelated self-consistent evidence rejected without modifying durable state; tampered persisted Done record rejected. |
| Failed check hidden behind duplicate PASS name | Post-validation check names must be nonempty and unique; every supplied check must pass, including checks beyond the required minimum. | Duplicate FAIL/PASS, duplicate PASS and additional failed check rejected. |
| Missing or unrelated audit reference | postValidation.audit_output must be nonempty; optional postValidation.scope must match completion scope. | Missing artifact reference and mismatched scope rejected. |
| Caller mutation during asynchronous integration | Evidence captured with a deep copy before awaiting the transaction lock, then stored separately. | Mutating caller input immediately and returned record after completion leaves persisted evidence intact. |

## API impact

Worker integration requires plain scope such as `WI-SOT-20-01`; the former test-only `work_item:` prefix is not accepted. Generic evaluateDoneGuard calls retain arbitrary nonempty scope unless the optional second argument supplies expectedScope. Post-validation must provide audit_output; its current producer already returns that field. Existing incomplete worker records do not invoke Done validation and remain readable. Existing Done records with inconsistent scope or missing evidence will fail validation rather than silently acquire fabricated proof.

## Verification

- `node --test tools/sot/done-guard.test.mjs tools/sot/worker-state.test.mjs`: 17 passed.
- `node --test tools/sot/done-guard.test.mjs tools/sot/worker*.test.mjs tools/sot/post-validation.test.mjs`: 25 passed, 0 failed.
- Actual project worker-state snapshot read successfully with its existing partial records.
- Scoped diff check passed. Parser and existing Unicode plan markers remain unchanged from HEAD; an accidental intermediate encoding alteration was restored before delivery and checked for mojibake across all changed source/test files.

## Remaining provenance limits

Artifact references and PASS assertions are validated structurally, not opened or authenticated by this pure guard. The existing post-validation producer has no work-item scope field: absence remains supported, while a supplied conflicting scope is rejected. A producer-bound audit artifact and real source-state proof must be connected by orchestration before claiming the complete governance workflow. This change prevents wrong-item reuse and hidden duplicate failures; it does not establish the truth of caller-supplied evidence.

## Additive orchestration scope extension

`extendScope({ work_item_id, worker_id, write_scope, reason, coordination_ref? })` extends an existing owned active claim transactionally. Paths are combined with the prior scope; a subset cannot silently release a claimed path. Status, owner, original claim time and prior history remain unchanged. Expanded paths are checked against all other active claims with the same explicit coordination requirement as claiming. A durable EXTEND_SCOPE event records reason and old/new paths. Unknown, released or foreign-owned work cannot be revived or reassigned by this operation.

`node --test tools/sot/worker-state.test.mjs`: 12 passed, including disjoint addition, subset union, wrong owner, absent reason, path collision, coordinated overlap and released-work rejection. This supports adding a bounded runner/audit path without modifying an already hashed authoritative plan. It does not approve a source-rule change.
