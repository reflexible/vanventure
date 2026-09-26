# Execution State

Operational checkpoint only. The authoritative backlog is
`docs/governance/source-of-truth-and-incremental-planning.md`.

Current: `WI-SOT-20-10`
State: `TODO`
Last Done: `WI-SOT-21-07`
Last Commit: `871d794`

Progress:
- Done: 160
- Total: 205
- Open: 45
- Blocked: 2
- Recovery: none

Current Goal:
Synchronize the local operational worker state with real chat/controller flows without creating a second backlog.

Relevant:
- `tools/sot/worker-state.mjs`
- `tools/sot/worker-runtime.mjs`
- `docs/governance/source-of-truth-and-incremental-planning.md#st-sot-20--phase-20-worker-state`

Verification:
- Targeted worker-state/runtime tests
- Golden Baseline diff: `docs/scrum-plan.md` versus `dac0199`
- FAST CHECK unless an escalation criterion applies

Next:
Read the active Work Item and its direct runtime boundary before creating a claim.
