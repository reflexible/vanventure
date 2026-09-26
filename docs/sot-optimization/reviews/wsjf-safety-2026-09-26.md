# WSJF safety - 26. September 2026

Status: LOCAL_VERIFIED_PARTIAL. Scope: WI-SOT-19 scoring and queue safety; no production rollout, persistence integration or full 67-section acceptance claimed.

## Evidence matrix

| Requirement / risk | Implemented check | Evidence |
| --- | --- | --- |
| WSJF must be calculated, never manually assigned (section 9, section 58) | Ready queue recomputes validated components; supplied mismatching score or Cost of Delay is rejected. | forged-score regression |
| Comparable work must follow actual WSJF (section 10, section 56) | Exact fraction comparison before display rounding; duplicate executable IDs rejected. | 11/13 versus 17/20 both display 0.85, correctly order 17/20 first |
| Manual decisions remain protected (section 40-41, section 57, section 60) | Prior protected status cannot be downgraded or switched to bypass value lock; automatic reevaluation preserves manual override and validates protected suggestions. | protected status and invalid suggestion regressions |
| Audit trail remains independent (section 59) | Current score and total revalidated before reevaluation; prior and next snapshots deep copied from inputs and live returned assessment. | corrupt record and detached snapshot regressions |

## Reproducible check

`node --test tools/sot/wsjf.test.mjs`: 22 passed, 0 failed.

`node --test tools/sot/wsjf.test.mjs tools/sot/worker*.test.mjs`: 32 passed, 0 failed.

Scoped `git diff --check`: passed (line-ending warning only).

Changed source: `tools/sot/wsjf.mjs`; regression coverage: `tools/sot/wsjf.test.mjs`. Existing readiness and dependency exclusions remain tested. Queue callers now require the component assessment rather than a standalone numerical WSJF; repository search found no production caller outside these tests.

## Remaining integration gates

The calculation validates records; it does not authenticate business-value confirmation or manual overrides. An authoritative persisted assessment, decision provenance, shared backlog projection, dependency/conflict analysis and controller wiring remain integration work. Caller-supplied readiness flags remain inputs rather than independent proofs. The complete source requirements and decomposition outcomes still need end-to-end coverage. No Golden Baseline rule changed, no work item marked Done by this worker, and no commit made by this worker.


## Full source review and exact scorer coverage

Read all 67 sections in [preserved source](../sources/wsjf-multi-agent-input-2026-09-26.md). This table records implemented source clauses, not acceptance of all sections.

| Work item | Source sections | Implemented scorer behavior | Remaining scope |
| --- | --- | --- | --- |
| WI-SOT-19-02 Business Value | section 3, section 11, section 41, section 60 | Dimension score, individual rationale/confidence, Proposed default; Proposed does not block queue; locked score and status preserved; changed proposed value stored separately. | Automatic proposal must use actual benefit, frequency, workflows, customers and project evidence; authenticated user confirmation/override and persisted shared record. |
| WI-SOT-19-03 Time Criticality | section 4, section 40, section 59 | Scale/rationale/confidence validated independently; reevaluation recomputes from new fact-based input and stores old/new values, reason and timestamps. | Evidence gathering for deadline/release/seasonality/dependencies and authoritative persistence. |
| WI-SOT-19-04 Risk Reduction / Opportunity Enablement | section 5, section 40, section 55, section 59 | Combined dimension validated and included exactly once in Cost of Delay; no automatic enabler preference. | Automatic proposal grounded in project risks/enabled capabilities and downstream dependencies. |
| WI-SOT-19-05 Job Size | sections 6-7, section 24 | Relative scale only, rationale/confidence; worker count cannot reduce size; sizes 13/20 require timestamped explicit RETAIN_VERTICAL_VALUE review and rationale. SPLIT_REQUIRED or unreviewed/free-text-only retention is invalid. | Actual repository analysis and splitting viable large stories, preserving AC/traceability and assessing children. |
| WI-SOT-19-06 Confidence | section 8, section 59 | High/Medium/Low per dimension. Low accepts scoring with visible missing_information, uncertain_assumption and unanalyzed_area; absent details rejected. Initial assessment carries explicit timestamp, reevaluation carries new timestamp and detached history. | Shared-state activation belongs to WI-SOT-19-08; substantive truth of assessment remains reviewer responsibility. |
| WI-SOT-19-07 relative scale | section 2, section 6 | Exhaustive allowed-scale checks across all four dimensions; intermediate/negative/non-numeric/nonfinite scores rejected. | Shared-state activation belongs to WI-SOT-19-08. |

WI-SOT-19-06 and WI-SOT-19-07 have complete local scoring-engine behavior and targeted evidence available for independent review. WI-SOT-19-02 through WI-SOT-19-05 remain partial if their acceptance includes the full automatic analysis clauses: validating externally prepared scores is not automatic project analysis. No blanket 67-section claim is made.

Additional implemented clauses: section 1/section 9 formula with execution_decision NOT_AUTHORIZED; section 10/section 56 exact ordering inside one comparison group; section 57 override reason changes order without score manipulation; section 58 rejects forged derived scores; section 59 timestamped, detached before/after evidence. Readiness/controller/DONE requirements are outside this scorer acceptance.

## Input contract for integration

Every evaluation requires `evaluated_at` as an ISO timestamp with timezone. Every dimension requires `score`, `rationale`, `confidence`; Low also requires an `uncertainty` object with `missing_information`, `uncertain_assumption`, `unanalyzed_area` (explicit explanations, including an explicit absence where appropriate). Job Size 13/20 requires `decomposition_review: { outcome: 'RETAIN_VERTICAL_VALUE', rationale, reviewed_at }`; an unresolved `SPLIT_REQUIRED` is not an acceptable retained large story. Initial assessment timestamps are supplied by the caller and remain provenance to authenticate at the state boundary. Queue inputs must carry validated components, not only a standalone WSJF number.
