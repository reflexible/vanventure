# Analytics contract activation gate - 26 September 2026

Scope decision supplied by the user: secure the contract and block later activation; no additional website analytics product development in this slice. The complete `docs/analytics.md` specification and existing contract/registry validators were read. No website, event, provider, publishing or product files were changed.

## Implemented boundary

`assessAnalyticsActivation({ projectRoot, action: 'defer' | 'activate', expectedContractSha256? })` reads the current project registry, contract catalogue and analytics authority from an explicit root. It uses the existing `validateContracts()` for structural shape and bilateral registry links, then verifies the exact supported ANALYTICS-CONTENT-ID v1.0.0 contract and active provider/consumer authorities. The supported canonical contract hash is `2a1192d6f4708ed865d89b1e0a5130b854a20b792b28a3eefd8c3b44239ad5f8`.

| Result | Meaning |
| --- | --- |
| DEFERRED_INACTIVE | Existing contract metadata is valid; the selected product capability remains outside this implementation. This is not runtime certification. |
| ACTIVATION_BLOCKED | Activation requested without an actual registered runtime boundary, or contract/version/authority/input evidence is invalid. |

The current implementation deliberately has no activation-success path. A future actual runtime boundary and host-owned verifier must be integrated with externally pinned current implementation/test evidence before that can change. Caller fields cannot install a verifier, inject status or provide a fake PASS artifact. All outputs retain activation_allowed=false and runtime_verified=false. The gate does not inspect production or claim that tracking is running or absent there (`website_tracking_running=NOT_ASSESSED`).

## Evidence

`node --test tools/sot/analytics-activation-gate.test.mjs`: 4 passed, 0 failed. Tests cover valid deferred metadata, blocked activation, removed/version-changed/weakened contracts, forged statuses and artifacts, callback injection, stale expected hash, corrupt catalogue and wrong authority. Fixture success is explicitly only deferred contract validation; no fixture is accepted as a real runtime test.

Read-only actual-project calls returned DEFERRED_INACTIVE for defer and ACTIVATION_BLOCKED for activate with ACTUAL_ANALYTICS_RUNTIME_BOUNDARY_AND_PINNED_TEST_EVIDENCE_MISSING. No provider/network call, deployment or project status mutation occurred.

## Concrete integration proposal for the parent

Use `tools/sot/project-audit.mjs`'s existing contract validator callback as the integration point. For ANALYTICS-CONTENT-ID in the explicitly selected deferred scope, invoke this gate with action=defer and persist its returned source hashes/status as scoped evidence. Any wrapper PASS must describe only `inactive contract metadata preserved`; it must retain the distinct DEFERRED_INACTIVE outcome and runtime_verified=false in evidence. For an activation request invoke action=activate and propagate ACTIVATION_BLOCKED. Do not map deferred status to successful actual runtime invariant validation.

Keep `tools/sot/contract-invariants.mjs`'s substantive runtime blocker for ANALYTICS-CONTENT-ID. Its error correctly states that an actual runtime boundary is required. A future dedicated activation path must call the new gate before toggling configuration; no current website toggle is modified or certified by this slice. The owning authority should record the user's limited deferred scope and this mandatory later gate, without changing the event catalogue or implementation requirements.

Remaining product work: actual CMS identity projection, published/anonymous/production tracking policy, rejected-context no-script/no-request proofs, event/property sanitization, URL handling, provider adapters and architecture checks remain deferred. Existing cockpit YouTube analytics is not evidence for any of those website requirements.
