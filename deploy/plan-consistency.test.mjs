import test from 'node:test';
import assert from 'node:assert/strict';
import { checkPlanConsistency } from './plan-consistency.mjs';

test('der Gesamtplan deckt alle registrierten Planquellen ab',()=>{
  const result=checkPlanConsistency();
  assert.equal(result.canonicalPlan,'docs/ausbauplan.md');
  assert.ok(result.sources>=12);
});
