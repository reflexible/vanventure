# Targeted story-slice recovery R8 — 2026-09-26

Status: `READY_FOR_FINAL_AUDIT_RETRY`. Scope was limited to the two blockers FA-R2-001 (`ST-WEB-01`) and FA-R2-002 (`ST-INS-06`). Original source documents and historical package/recovery/audit reports were left unchanged.

## Repairs

- `ST-WEB-01` now delivers only shared public navigation, direct links and the common footer. The formerly nested homepage, hero, gallery, photo-viewer, language/content and route-specific responsive criteria were assigned to the start-page slice `ST-WEB-08`, route-template stories `ST-WEB-02/04/05`, and cross-route acceptance story `ST-WEB-03`. The source-backed start-page work needed its own story; the template and route topics reused existing slices. No duplicate photo story was added.
- `ST-INS-06` now ends at a documented export, human review, provenance and approval record. Target writes are separate slices: `ST-INS-07` Insights, `ST-INS-08` Planner and `ST-INS-09` Master Context. `SRC-0499` maps to the workflow and its stated Planner/Master Context targets; `SRC-1213` maps to all three explicitly named targets. Human approval, no unchecked take-up and no automatic YouTube writeback are retained.
- Existing candidate IDs and coverage classifications were preserved. Candidate target links, catalog source lists, draft origins, tasks, dependency references, traceability matrix and reverse traceability were synchronized. Target-specific gallery and language tasks were separated while preserving prior task IDs where possible. No new user decision was created.

## Full story and epic recheck

The current plan/catalog pair contains 75 matching story sections and 11 epics. All 75 stories were checked for user/business value, acceptance criteria, dependencies, source links, epic membership, and task parents. The prior semantic review evidence for the 71 unchanged stories was cross-checked against the current plan and task/source joins; the changed `ST-WEB-01/02/03/04/05/08` and `ST-INS-06/07/08/09` scopes were inspected in full for INVEST, vertical-slice boundary, independent acceptance, testable criteria, size and dependencies. All 11 epic story lists were checked against the catalog. No duplicate story was created; the four new stories are separate source-backed user outcomes and a review prerequisite.

## Validation

- `tools/verify-scrum-review-progress.py`: PASS — 1,106 relevant source blocks, 2,913/2,913 original candidates, 356 successors, 75 stories.
- Cross-artifact checks: PASS — candidate targets resolve; task IDs are unique and every task has an existing story parent; all 75 draft sections equal the catalog IDs; candidate sources are present at their target stories; all 11 epic lists resolve.
- Candidate/traceability totals remain unchanged; open coverage holds remain separate from audit readiness.
- Final Audit R3 was started only after these checks.
