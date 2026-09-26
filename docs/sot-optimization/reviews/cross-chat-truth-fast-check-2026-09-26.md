# WI-SOT-22-06 – Cross-Chat-Truth FAST CHECK

## Scope

`verifyChatHandoverTruth` accepts a received local chat handover only when its
work-item status, worker ownership/scope and optional status attachment agree
with the authoritative plan and durable worker state. A SoT attachment must
also match one registered active module. Unknown packet fields (including a
shadow backlog), diverging state-source references and any authority escalation
are rejected before a receiving chat can treat the packet as context.

The verified packet remains read-only: it neither claims work nor writes a
plan, decision, source, approval or execution authorization. This is a local
handover guard, not remote chat orchestration or a cross-host transaction.

## Targeted verification

- `node --test tools/sot/chat-handover.test.mjs`
- `node --test tools/sot/*.test.mjs`
- `node tools/sot/progress.mjs --check`
- Golden-baseline diff against `dac0199` for `docs/scrum-plan.md`

## Result

PASS. The targeted handover tests cover aligned status, worker and registered
SoT inputs plus rejected plan/worker mismatch, shadow packet field and false
state-source reference. This bounded additive local guard uses FAST CHECK; it
does not alter the Golden Scrum Core, activate a remote chat integration, or
provide a live website release.
