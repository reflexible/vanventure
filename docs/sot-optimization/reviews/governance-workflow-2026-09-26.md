# Governance workflow integration - 2026-09-26

Status: LOCAL_VERIFIED_PARTIAL. Local integration prerequisite for WI-SOT-16-01.
No new work item, project approval, production rollout or overall completion is
asserted. All source changes in the tests occur in isolated temporary Git
repositories. The real Scrum Core and historical Ausbauplan are untouched.

## Executed integration

`runGovernanceWorkflow` connects these existing components:

1. Explicit pending proposal with persisted target heading and source baseline.
2. Externally pinned user-decision import, original quoted bytes and exact proposal hash.
3. Disk-backed registry/contracts/graph/source scope review.
4. Explicit authenticated conflict reviews for every included rule.
5. Persisted proposal, review and user decision in the decision event store.
6. Exact approved append preview, refreshed scope review and protected apply.
7. Actual on-disk post-validation, incremental FAST/FULL audit and executable tests.
8. Version-bound JSON evidence from the semantic-consistency and traceability checkers.
9. Immutable post-validation result and evaluation of the existing DONE guard.

The returned `LOCAL_WORKFLOW_VERIFIED` is a local pipeline result. The `runGovernanceWorkflow` function never marks a shared Work Item Done, starts
workers or grants product/live approval. Its flags remain explicitly false.
The separate explicit integration function described below can complete an
already independently reviewed Work Item through the actual worker store.

## Evidence matrix

| Case | Observed result |
| --- | --- |
| Exact synthetic reference addition | Real temp Git source changed, original rule retained, executed source-contract test passed, FAST audit and DONE gate passed |
| Missing checker or changed user-original bytes | Blocked before decision persistence and source write |
| Unauthenticated conflict review | Imported user decision does not bypass technical review |
| Concrete traceability check fails | Original source bytes restored; failed post-validation retained on disk |
| Claimed PASS with proof for another source version | Rejected; original source restored |
| Source changes since scope review | Blocked before approval persistence |
| FULL trigger without full validators | FULL escalation retained; source restored |
| Concurrent contract catalogue change | Post-validation blocked; target rolled back; unrelated change preserved |
| Actual process exit during pipeline post-validation | Durable journal retained; explicit recovery using original pinned user evidence restores exact baseline |
| Owner is also work-item source | Exact approved source bytes allowed; graph rebuilt from updated source and checked unchanged |

Reproducible check: `node --test tools/sot/governance-workflow.test.mjs`.
Result: **15 passed, 0 failed**.

Tests use an actual temporary Git repository with a tracked authoritative file,
real original/manifest/reviewer files, persistent decision events, an executable
source-content assertion and persisted validator evidence. The fixture labels its
user decision SYNTHETIC TEST ONLY. It is not evidence of a real project approval.

## API and provenance contract

`runGovernanceWorkflow(input)` requires:

- Absolute `projectRoot`, explicit `workItemId` exactly matching the persisted
  `proposal.work_item_id`, pending `proposal`, source-backed
  `catalogue`, bound `scopeReview`, and complete `conflictReviews`.
- `verifyReviewer` and `verifyConflictReview` from trusted orchestration. Missing
  verifiers fail closed; the workflow never invents reviewer judgments.
- `trustedUserImports` containing externally trusted absolute manifest paths and
  SHA-256 hashes, plus the exact `userDecision` actor/evidence/conflict decision.
- `proposedSection`, proposal-to-source `traceability`, and relative `decisionStatePath`.
- `audit` containing a new relative JSON `outputPath` under
  `docs/sot-optimization/audits/`, explicit change classification, before/after
  semantic manifests, actual executable test commands, and any required FULL
  validators. The audit engine retains all escalation rules.
- `validators.sotConsistency` and `validators.traceability`, each executing an
  actual scope-specific check and returning status, relative `evidence_ref` and
  `evidence_sha256`. A PASS evidence file must be JSON with matching `proposal_id`,
  `module_id`, `source_sha256`, exact `check` name, `status: PASS`, and nonempty
  `detail`. Source version and artifact bytes are checked before accepting PASS.

Registry, contracts and dependency graph are loaded from the same root.
Snapshots must match the scope review hashes. Relevant metadata is checked before
and after post-validation. When the work-item source is also the update owner,
only exact approved target bytes are accepted; its derived graph is rebuilt.
Unplanned registry, contract or dependency changes are blocked.

The workflow persists `<audit-name>.post-validation.json` separately from the
incremental audit, because an audit PASS can still be followed by a failing
semantic or traceability check. Outputs are exclusive and cannot overwrite
previous evidence. Each execution needs fresh output names.

`recoverGovernanceWorkflow({projectRoot, source, decisionStatePath,
trustedUserImports})` performs explicit recovery through the existing durable
recovery API and the same original-user verifier. It does not silently retry or
reapprove the proposal.

## Remaining integration boundaries

- Actual project adoption requires concrete reviewed source inventory, original
  user authorization and real domain-specific validators. Synthetic fixture
  reviews provide no project-level semantic proof.
- The orchestration caller is a trust boundary for reviewer verifiers, executable
  test commands, semantic manifests and validators. Hash-bound evidence records
  what they checked; it cannot establish the truth of an arbitrary callback.
- This first write path supports one exact additive source append. Existing
  proposal IDs require an explicit resume/recovery path; reapproval or destructive
  replacement is not inferred. New dependency/contract topology is unsupported.
- Crash recovery, cooperating local locks and concurrent-change checks inherit
  the documented boundaries in `sot-write-boundary-2026-09-26.md`; hostile
  filesystem races, power-loss guarantees and distributed transactions are not
  established by this test suite.
- Scope completion retains historical catalogue gaps in `scope_evidence`.
  Local success does not mark the global catalogue complete or repeat historical
  migration approval.


## Bound result and actual worker integration

New workflow results use schema 2.0.0 and persist a separate immutable
`<audit-name>.workflow-result.json`. The return value includes its SHA-256.
The result binds the actual Work Item and proposal, approval event, owner source
version, audit, post-validation, both validator artifacts, metadata inputs and
21 relevant runtime modules. Completion evidence is derived from the actual
post-validation checks and bound to that same Work Item. The post-validation
record itself now carries the exact Work Item scope.

`integrateGovernanceResult({resultPath, expectedResultSha256, workItemId,
workerStore, integratorId, evidenceRef, projectRoot})` reopens and verifies:

- Externally pinned immutable result bytes, exact Work Item and successful state.
- Still-approved persisted proposal, original proposal digest and approval event.
- Actual audit/post-validation/validator files, hashes, modes and source versions.
- Current owner source and metadata bytes and current governance runtime hashes.
- Recomputed DONE guard against the actual completion evidence.
- Actual worker state is Integration with accepted review.

Only after these checks does it call `workerStore.integrate`; that store
rechecks the stage and DONE scope inside its existing transaction lock. This is
not a replacement for claiming, handover or independent review. The test suite
uses the actual worker-state store through all those transitions and verifies
persisted Done. Different Work Items, non-Integration stages, modified results,
failed/changed post-check artifacts, runtime mismatches and owner source drift
are rejected without changing the worker record.

The expected result hash is a trust input supplied by orchestration/review, not
learned from the mutable result file. Semantic truth still depends on the
reviewers and validators described above. There is no distributed transaction
between source files and worker state; normal source drift is checked again
immediately before integration, while hostile races remain outside this proof.

## Explicit attestation of older successful evidence

`attestLegacyGovernanceResult` supports existing immutable pilot evidence without
rewriting it. Required inputs are `projectRoot`, `resultPath`, externally supplied
`expectedResultSha256`, exact `workItemId`, `decisionStatePath`, externally supplied
`expectedDecisionStateSha256`, new `attestationPath`, and `pinnedProofHashes`:

- `audit: {path, sha256}`;
- `post_validation: {path, sha256}`;
- `validators: {sotConsistency: {path, sha256}, traceability: {path, sha256}}`;
- `metadata: [{path, sha256}, ...]` covering registry, contracts, graph and its
  current work-item source.

It requires the real persisted approved proposal to name the exact Work Item
already named by the old successful DONE result. It verifies all external pins,
current source hash, actual audit/post-check success and both source-bound
validator artifacts. It creates a new schema-2 result with an explicit
`LEGACY_RESULT_ATTESTATION` binding and current runtime hashes. An old unscoped
post-validation file remains unchanged; the new completion evidence receives
its scope only from the exact persisted proposal and old DONE result together.
The integration function then reopens both the new attestation and old result.

The legacy test preserves the original result and post-validation bytes, creates
a new explicit attestation, and integrates it through the actual reviewed worker
store. No old artifact is silently upgraded or overwritten. Source or plan
changes after capture require fresh evidence; status changes should therefore
follow successful integration rather than precede it.
