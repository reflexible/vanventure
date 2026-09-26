# WI-SOT-22-04 – Decision-Handover FAST CHECK

## Scope

`tools/sot/chat-handover.mjs` adds a read-only decision-handover attachment.
It carries only anchored decision references and an anchored decision-store
reference. It cannot write a decision, grant approval, authorize execution, or
create an alternative decision store.

## Targeted verification

- `node --test tools/sot/chat-handover.test.mjs`
- `node --test tools/sot/*.test.mjs`
- `node tools/sot/progress.mjs --check`
- Golden-baseline diff against `dac0199` for `docs/scrum-plan.md`

## Result

PASS. The targeted handover suite passed 5/5 tests and the full `tools/sot`
suite passed 309/309 tests. `progress.mjs --check` reports the current
operational count, and the Golden Baseline diff against `dac0199` is empty.
This is a bounded additive handover module change, so FAST CHECK applies; no
FULL-CHECK escalation criterion is changed.
