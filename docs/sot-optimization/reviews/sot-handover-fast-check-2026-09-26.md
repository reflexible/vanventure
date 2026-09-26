# WI-SOT-22-05 – SoT-Handover FAST CHECK

## Scope

`tools/sot/chat-handover.mjs` adds a read-only locator for one registered,
active authoritative module. The locator preserves module ID, authority,
source anchor and any existing baseline reference. It cannot write the source,
authorize a SoT update, execute work or create a competing backlog.

## Targeted verification

- `node --test tools/sot/chat-handover.test.mjs`
- `node --test tools/sot/*.test.mjs`
- `node tools/sot/progress.mjs --check`
- Golden-baseline diff against `dac0199` for `docs/scrum-plan.md`

## Result

PASS. The targeted handover suite passed 6/6 tests and the full `tools/sot`
suite passed 310/310 tests. `progress.mjs --check` reports the current
operational count, and the Golden Baseline diff against `dac0199` is empty.
This is a bounded additive handover module change, so FAST CHECK applies; no
FULL-CHECK escalation criterion is changed.
