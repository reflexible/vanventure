# Derived execution planner - 26 September 2026

Status: LOCAL_COMPONENT_VERIFIED. Scope: ST-SOT-20/21/26/29 planning projection. This slice creates only `tools/sot/execution-planner.mjs`, its tests and this report. It does not change any backlog, worker state, Core, registry or website file and creates no second persistent planning source.

## API and behavior

`planExecution({ backlog, graph, state, scopeAnalyses, forbiddenScopes? })` consumes the authoritative backlog text, actual dependency graph and shared worker-state snapshot. Existing countWorkItems, validateDependencyGraph and worker-state validators are reused. Graph Work Item IDs must exactly match the backlog; each Work Item must have its correct story parent. Conflicting completed states, duplicate implementation WIP, malformed struck-through Done entries or an In Progress item without a visible claim block the projection.

The output provides counter (Done / Total / Open / Progress %), current_work_items, current_phases, active_workers, next_recommended, parallel_candidates and explicit exclusion reasons. Input hashes bind the projection to backlog, graph, worker state, analyses and forbidden scopes. Source truth and decisions remain in those inputs.

Recommendations first compare remaining dependency-chain depth, then the number of downstream unfinished items, then stable ID order. Story dependencies expand to their actual Work Items. Unfinished backlog prerequisites cannot be bypassed with an external SATISFIED assertion. External prerequisites need explicitly referenced evidence. An analyzed TODO can be recommended only as PREPARE_READY; only READY work can appear among parallel claim candidates. No state transition or claim is executed.

Each scope analysis requires ANALYZED, a nonempty evidence_ref, matching backlog/graph hashes, dependencies_reviewed=true, explicit unresolved_decisions and nonempty write_scope. Absent/stale analysis, unresolved questions, current claims, protected paths, unknown external prerequisites and active file overlap exclude work. Paths are compared case-insensitively with directory containment. Optional per-item forbidden_scope adds to global forbiddenScopes; the default global exclusion is the protected Scrum Core.

Parallel candidates additionally require explicit Parallel Safe classification. Unknown, Sequential and Parallel With Coordination do not become automatically safe candidates. Returned candidates are mutually disjoint as well as disjoint from active scopes. Blocked work retains its existing file reservation; a blocked agent's files are not silently reused.

WSJF is deliberately NOT_ACTIVATED and does not affect scores or ordering. This projection grants no execution authorization, product Board permission or governance-gate bypass.

## Existing APIs versus this slice

| Work items | Existing behavior reused | New contribution / remaining scope |
| --- | --- | --- |
| WI20-01/02/03 | Atomic claim, ownership and lock in worker-state | No alternate claim path introduced. |
| WI20-06/08/09 | Handover, visible worker status, review/integration/Done guards | Compact combined current-work projection; integration remains with the existing store/verified adapter. |
| WI20-04/05/07 | Current write scopes and dependency graph | Derived independent candidate set, hard-dependency awareness and additional overlap exclusion. |
| WI20-10 | Durable common state exists | No actual chat dispatch, autonomous state synchronization or multi-host coordination implemented here. |
| WI21-01/02/03 | Existing graph and claims | Explicitly reviewed parallel candidates, case-insensitive path collision checks and unresolved hard-dependency exclusion. |
| WI21-04/05/06 | Existing write_scope declarations | Consumes allowed paths and global/per-item forbidden paths; does not automatically infer a safe write scope or update a worker claim. |
| WI21-07 | Existing dependency constraints | Returns dependency-driven recommendation order; does not create or execute a merge queue. |
| ST26 / ST29 | Shared backlog/status inputs | Compact team status and next-step recommendation. No background monitoring, scheduled work or task creation. |

## Verification

`node --test tools/sot/execution-planner.test.mjs tools/sot/worker-runtime.test.mjs tools/sot/progress.test.mjs`: 14 passed, 0 failed, including seven new planner scenarios. Coverage includes counters from struck-through Done, actual graph construction and worker-state inputs, enabler ordering, blocked dependencies, duplicate WIP, claimed work, disjoint candidates, stale/unknown analysis, case-insensitive collisions, protected Core paths, TODO preparation and retained reservations for blocked work. Input objects remain unchanged.

A read-only actual-project probe using the real backlog, derived graph and persisted worker state returned EXECUTION_PLAN_DERIVED. With no supplied scope analyses it returned no next claim recommendation or parallel candidate; it did not manufacture safe work. No tests claim actual agent dispatch or production behavior.

## Remaining integration boundaries

The host/controller must provide current, genuinely reviewed scope analyses and preserve the source hashes when using recommendations. The planner checks the shape/bindings of those analyses; it does not authenticate their author or prove their semantic truth. File-system symlinks, multi-host file identity and repository-file revision pins are not resolved by this pure projection. Before a claim, the existing transactional claim API rechecks current ownership and overlapping scope. Before Done, the verified integration path remains mandatory. These limits prevent treating a planning suggestion as a live execution permission.
