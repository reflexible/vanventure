# Execution State

Operational checkpoint only. The authoritative backlog is
`docs/governance/source-of-truth-and-incremental-planning.md`.

Current: `WI-SOT-21-02`
State: `TODO`
Last Done: `WI-SOT-19-08`
Last Commit: `05d774b`

Progress:
- Done: 154
- Total: 205
- Open: 51
- Blocked: 2
- Recovery: none

Current Goal:
Derive file conflicts for parallel work from existing Write Scopes.

Relevant:
- `tools/sot/wsjf.mjs`
- `docs/governance/wsjf.md`
- `docs/governance/source-of-truth-and-incremental-planning.md#st-sot-19--phase-19-wsjf-integration`

Verification:
- Targeted conflict-check tests
- Golden Baseline diff: `docs/scrum-plan.md` versus `dac0199`
- FAST CHECK unless an escalation criterion applies

Next:
Read existing conflict checks and worker scopes; then prepare a scoped claim.
