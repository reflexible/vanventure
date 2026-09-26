import { readFile } from 'node:fs/promises';
import { test } from 'node:test'; import assert from 'node:assert/strict';
import { validateRegistry } from './module-registry.mjs';
import { validateContracts } from './contracts.mjs';
import { evaluateWsjf } from './wsjf.mjs';
const root = new URL('../../', import.meta.url);
const load = async path => readFile(new URL(path, root), 'utf8');
test('WSJF authority maps all 67 source sections without granting execution', async () => {
  const document = await load('docs/governance/wsjf.md');
  for (let section = 1; section <= 67; section++) assert.match(document, new RegExp(`\\| ${section} \\|`));
  assert.match(document, /keine Ausführungs-, Board- oder Release-Autorität/);
  assert.match(document, /erzeugt keinen zweiten Backlog/);
  assert.match(document, /Analytics-Vorgaben[\s\S]*gesperrt/);
});
test('WSJF authority and catalogue retain exact bilateral registry validity', async () => {
  const registry = JSON.parse(await load('docs/governance/module-registry.json'));
  const result = await validateRegistry(registry, { projectRoot: process.cwd() });
  assert.equal(result.valid, true, result.errors.join('\n'));
  const module = registry.modules.find(item => item.module_id === 'wsjf');
  assert.deepEqual(module.dependencies, ['scrum-core', 'sot-architecture']);
  const contracts = JSON.parse(await load('docs/governance/contracts.json'));
  const validation = await validateContracts(contracts, registry, { projectRoot: process.cwd() });
  assert.equal(validation.valid, true, validation.errors.join('\n'));
});
test('authority requires calculated inputs and records no execution authorization', () => {
  const result = evaluateWsjf({ evaluated_at:'2026-09-26T12:00:00Z', value_status:'Proposed',
    user_business_value:{score:13,rationale:'Benefit',confidence:'High'}, time_criticality:{score:5,rationale:'Timing',confidence:'High'},
    risk_reduction_opportunity_enablement:{score:3,rationale:'Risk',confidence:'Medium'}, job_size:{score:5,rationale:'Scope',confidence:'High'} });
  assert.equal(result.valid, true); assert.equal(result.cost_of_delay, 21); assert.equal(result.wsjf, 4.2);
  assert.equal(result.execution_decision, 'NOT_AUTHORIZED');
});