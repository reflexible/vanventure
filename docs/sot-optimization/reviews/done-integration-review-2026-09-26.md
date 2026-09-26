# Independent DONE integration review - 26 September 2026

Reviewer: /root/wsjf_safety. Read-only code/evidence assessment; this report is the only write. No checks or deployment were executed in this review, and no shared status was changed.

## Follow-up remediation of the worker-store bypass

The initial finding below describes the reviewed pre-remediation state. The subsequent scoped implementation changes `worker-state.mjs` and its tests: every new Done transition now requires a constructor-supplied `verifyCompletionEvidence` trusted host callback. Payload fields cannot supply or replace it. The callback receives detached work-item, completion evidence, review, integration and record context under the transaction lock, and must return `{ status: 'PASS', evidence_ref }`. Missing verifier, rejection, exception, absent evidence or mutation of the bound context blocks without writing Done. The structural guard remains an additional prerequisite.

The transaction rereads persisted state and authoritative item status after asynchronous verification; intervening out-of-lock changes are rejected rather than overwritten. Successful new transitions retain `completion_verification` scope/reference/time. Historical Done snapshots remain readable through structural validation without a retroactive callback or invented proof.

The verifier is an explicit trusted host dependency. A caller that controls host construction can deliberately install a lying callback; this is outside the payload trust boundary and must not be represented as authenticity from a caller-supplied record. The real governance host adapter must reopen pinned artifacts. Existing fixture tests now name their fixture-only trusted checker explicitly. The separate orchestrator adapter is owned and reviewed by another worker.

New regressions cover direct fabricated PASS with no verifier, callback rejection/throw, asynchronous context mutation, detached evidence, persisted verifier evidence and concurrent state/plan changes. No real project worker-state record was changed by this remediation.

Remediation verification: `node --test tools/sot/worker-state.test.mjs tools/sot/worker-runtime.test.mjs tools/sot/done-guard.test.mjs` passed 29/29 checks.

## Observed actual project result

The persisted record for WI-SOT-16-01 is Done with accepted review, integration evidence and a recomputed-scope-compatible DONE_ALLOWED record. Its completion scope is exactly WI-SOT-16-01.

The actual immutable attestation is `docs/sot-optimization/audits/project-governance-pilot/integration-attestation.json`, SHA-256 `8beb3cb57e730c93b511ae8bee3a5590aaaf191e8ee7fa35c6015d8944955dfa`. It declares LOCAL_WORKFLOW_VERIFIED, LEGACY_RESULT_ATTESTATION and product_release=false. The recorded post-validation is FAST_CHECK/PASS. Its factual metadata append was checked by the pilot's exact-source consistency and traceability validators. This supports the bounded local pilot acceptance, not general CMS/analytics or product release acceptance.

## Finding: verified orchestration is not the exclusive Done boundary

**P1 for a claim of universal runtime enforcement:** `createWorkerStateStore().integrate()` remains public and accepts caller-created completion evidence. It verifies scope, state, accepted review and the structural DONE guard, but does not open or verify the referenced audit, decision or validator artifacts. A caller with an Integration record can supply all required PASS fields and nonempty references without calling `integrateGovernanceResult()`. Snapshot validation repeats the same structural guard and cannot detect such fabricated evidence.

`integrateGovernanceResult()` substantially closes evidence substitution for its own route: it reopens an externally hash-pinned result; verifies runtime, decision binding, source bytes, metadata, audit and post-validation artifacts; checks both validator proofs; reconstructs completion evidence; and uses the real worker transaction. The project pilot exercised that stronger route. This does not make the lower-level public route impossible to bypass. Existing focused tests intentionally demonstrate direct integration with fixture PASS evidence.

Recommended remaining work: make the intended authoritative integration path explicit and enforce its evidence-verification step inside the worker-store transition, or provide a store-bound verifier whose successful result is required for Done. Keep lower-level structural checking usable for tests, but do not advertise it as artifact-authenticated project enforcement. No new user identity requirement is inferred by this recommendation.

## WI-SOT-18 assessment

All six predicates exist and have local component regressions. None should be described as universal, non-bypassable project enforcement while the public raw-evidence transition remains supported.

| Work item | Fully implemented local behavior | Remaining end-to-end scope |
| --- | --- | --- |
| WI-SOT-18-01 missing SoT update | Guard blocks missing update evidence or an unscoped not-required assertion. Strong workflow proves the actual update and exact source version. | Direct store callers can assert an update or not-required reason; need authoritative evidence verification at transition. |
| WI-SOT-18-02 unresolved conflict | Nonempty/missing unresolvedConflicts blocks. Workflow requires authenticated, complete conflict classification before applying. | Direct store caller can supply an empty array; conflict provenance is enforced only by orchestration. |
| WI-SOT-18-03 failed required check | Failed, missing or duplicate supplied checks block. All post-validation checks must pass; pinned workflow verifies actual FAST/FULL audit. | Maintained impact-to-test profiles must establish which tests are required, and the raw store route must not accept invented PASS. |
| WI-SOT-18-04 contract break | Contract FAIL/missing proof blocks. Pipeline checks current contract catalogue and binds its snapshot. | Catalogue/shape compatibility is not substantive CMS publishing or website analytics runtime validation. WI-SOT-04-10 remains open. |
| WI-SOT-18-05 missing dependency | Dependency FAIL/missing proof blocks. Pipeline validates and pins graph state. | Graph structural validity alone does not prove every executable business prerequisite is satisfied. Real scoped domain checks/profile integration and store-bound proof remain open. |
| WI-SOT-18-06 failed consistency check | Consistency FAIL/missing proof blocks; wrong-source validator proof is rejected by workflow. Pilot verifies exact factual append. | General domain consistency validators remain absent outside this bounded pilot, and direct store references are not dereferenced. |

Acceptance distinction: each item may record LOCAL_COMPONENT_VERIFIED for its predicate and WI-SOT-16-01 can retain its genuinely verified narrow pilot outcome. Unqualified Done for the six end-to-end blockers would overstate their current reach unless the task's acceptance is explicitly limited to predicate implementation and the outstanding enforcement is tracked separately.

## Actual domain validators still missing

- CMS-PUBLISHING: real admin/revision publication tests exist, but scoped governance approval/content/image/privacy proof is not enforced at both HTTP and direct agent/database publication paths.
- ANALYTICS-CONTENT-ID: website analytics runtime and policy tests are not implemented; cockpit YouTube analytics is a separate capability.
- Generic semantic consistency and traceability: the project pilot uses exact factual-append checks; those are valid for its own scope and must not certify unrelated normative changes.
- General test/traceability profiles: FAST currently accepts supplied executable tests and claimed covered modules; FULL accepts supplied validator functions. Existing project tests are reusable but need maintained authoritative mappings and bounded evidence adapters.

## Additional technical limits

The orchestrator rereads source immediately before integration, but source/metadata/decision artifacts and the worker-state lock are not one atomic transaction. Concurrent changes after their checks remain a narrow race. Expected hashes must come from the trusted review boundary; a hash recomputed by the caller over an invented result is not external trust. Historical pilot artifacts correctly remain immutable even when subsequent authorized plan progress changes their recorded source version.

Reviewed files: `tools/sot/governance-workflow.mjs`, `tools/sot/done-guard.mjs`, worker integration behavior and existing tests, pilot runner and its source-bound evidence, current worker state and WI-SOT-18 entries. No blanket FINAL_AUDIT_PASS or full-domain contract certification is issued by this report.
