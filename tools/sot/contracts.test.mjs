import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { defaultRegistryPath } from './module-registry.mjs';
import { compareContractVersions, defaultContractsPath, loadContracts, validateContractPayload, validateContracts } from './contracts.mjs';

async function fixture() {
  return {
    catalogue: JSON.parse(await readFile(defaultContractsPath, 'utf8')),
    registry: JSON.parse(await readFile(defaultRegistryPath, 'utf8')),
  };
}

test('checked-in catalogue has five exact bilateral module references', async () => {
  const catalogue = await loadContracts();
  assert.equal(catalogue.contracts.length, 5);
  assert.deepEqual(catalogue.contracts.map(contract => contract.contract_id), [
    'SCRUM-WORK-ITEM', 'SOT-DECISION-CHANGE', 'WORKER-WORK-ASSIGNMENT',
    'CMS-PUBLISHING', 'ANALYTICS-CONTENT-ID',
  ]);
  const publishing = catalogue.contracts.find(contract => contract.contract_id === 'CMS-PUBLISHING');
  assert.equal(publishing.provider_module, 'cms-content');
  assert.equal(publishing.consumer_module, 'release-governance');
  const analyticsIdentity = catalogue.contracts.find(contract => contract.contract_id === 'ANALYTICS-CONTENT-ID');
  assert.equal(analyticsIdentity.provider_module, 'cms-content');
  assert.equal(analyticsIdentity.consumer_module, 'analytics');
});

test('rejects missing and dangling registry contract references', async () => {
  const { catalogue, registry } = await fixture();
  registry.modules[0].contracts = [];
  registry.modules[2].contracts.push('UNKNOWN-CONTRACT');
  const result = await validateContracts(catalogue, registry);
  assert.equal(result.valid, false);
  assert.match(result.errors.join('\n'), /misses contract SCRUM-WORK-ITEM/);
  assert.match(result.errors.join('\n'), /unknown or nonparticipating contract UNKNOWN-CONTRACT/);
});

test('rejects duplicate IDs, unknown modules, invalid provenance and malformed field declarations', async () => {
  const { catalogue, registry } = await fixture();
  catalogue.contracts[1].contract_id = catalogue.contracts[0].contract_id;
  catalogue.contracts[1].consumer_module = 'unknown-module';
  catalogue.contracts[1].authoritative_rule = '../outside.md';
  catalogue.contracts[1].fields.change_id.type = 'mystery';
  const result = await validateContracts(catalogue, registry);
  assert.equal(result.valid, false);
  const report = result.errors.join('\n');
  assert.match(report, /contract_id duplicates/);
  assert.match(report, /unknown module/);
  assert.match(report, /authoritative_rule/);
  assert.match(report, /supported type/);
});

test('payload validation enforces required, type and declared fields', async () => {
  const contract = (await loadContracts()).contracts[0];
  const valid = { work_item_id: 'WI-SOT-04-01', story_id: 'ST-SOT-04', status: 'IN_PROGRESS', source_ref: 'docs/scrum-plan.md' };
  assert.equal(validateContractPayload(contract, valid).valid, true);
  const bad = validateContractPayload(contract, { ...valid, story_id: 42, extra: 'shadow' });
  assert.equal(bad.valid, false);
  assert.match(bad.errors.join('\n'), /story_id must be string/);
  assert.match(bad.errors.join('\n'), /extra is not declared/);
  delete valid.status;
  assert.match(validateContractPayload(contract, valid).errors.join('\n'), /status is required/);
});

test('breaking changes require a major bump', async () => {
  const old = (await loadContracts()).contracts[0];
  const removed = structuredClone(old);
  removed.version = '1.1.0';
  delete removed.fields.story_id;
  const result = compareContractVersions(old, removed);
  assert.equal(result.compatible, false);
  assert.equal(result.validVersion, false);
  assert.match(result.errors.join('\n'), /major version bump/);
  removed.version = '2.0.0';
  assert.equal(compareContractVersions(old, removed).validVersion, true);
  const required = structuredClone(old);
  required.version = '1.1.0';
  required.fields.new_field = { type: 'string', required: true };
  assert.equal(compareContractVersions(old, required).compatible, false);
  assert.equal(compareContractVersions(old, required).validVersion, false);
  const typeChange = structuredClone(old);
  typeChange.version = '1.1.0';
  typeChange.fields.status.type = 'number';
  assert.equal(compareContractVersions(old, typeChange).validVersion, false);
});

test('additive optional fields require minor bump; metadata needs patch', async () => {
  const old = (await loadContracts()).contracts[0];
  const added = structuredClone(old);
  added.version = '1.0.1';
  added.fields.note = { type: 'string', required: false };
  assert.equal(compareContractVersions(old, added).validVersion, false);
  added.version = '1.1.0';
  assert.equal(compareContractVersions(old, added).validVersion, true);
  assert.equal(compareContractVersions(old, added).compatible, true);
  const metadata = structuredClone(old);
  metadata.purpose += ' Clarified.';
  assert.equal(compareContractVersions(old, metadata).validVersion, false);
  metadata.version = '1.0.1';
  assert.equal(compareContractVersions(old, metadata).validVersion, true);
});
