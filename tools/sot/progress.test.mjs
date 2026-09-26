import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { checkDisplayedCounter, countWorkItems, defaultPlan } from './progress.mjs';

test('current execution backlog has unique IDs and a current displayed counter', async () => {
  const plan = await readFile(defaultPlan, 'utf8');
  const counts = countWorkItems(plan);
  assert.ok(counts.total >= 182);
  assert.equal(checkDisplayedCounter(plan, counts), true);
});

test('stale displayed counter blocks completion after a new item', () => {
  const plan = '- [x] ~~WI-SOT-00-01 · completed~~\n'
    + '- [ ] TODO – WI-SOT-00-02 · open\n'
    + '**Counter:** Total 1 · Done 1 · In Progress 0 · Ready 0 · Blocked 0 ·\n'
    + 'Open 0 (einschließlich Blocked) · Progress 100 %';
  assert.throws(() => checkDisplayedCounter(plan), /stale/);
});

test('duplicate or unlabelled Work Item status is rejected', () => {
  assert.throws(() => countWorkItems('- [ ] TODO – WI-SOT-00-01 · first\n- [ ] READY – WI-SOT-00-01 · second'), /Duplicate/);
  assert.throws(() => countWorkItems('- [ ] WI-SOT-00-01 · no state'), /Malformed/);
});
