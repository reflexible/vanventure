import { readFile, realpath } from 'node:fs/promises';
import { resolve, isAbsolute, relative } from 'node:path';
import { createHash } from 'node:crypto';
import { validateContracts } from './contracts.mjs';

export const ANALYTICS_CONTRACT_PIN = Object.freeze({
  contract_id: 'ANALYTICS-CONTENT-ID', version: '1.0.0',
  sha256: '2a1192d6f4708ed865d89b1e0a5130b854a20b792b28a3eefd8c3b44239ad5f8',
});
const paths = ['docs/governance/module-registry.json', 'docs/governance/contracts.json', 'docs/analytics.md'];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const canonical = value => Array.isArray(value) ? value.map(canonical)
  : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])])) : value;

/** User-selected scope: secure the contract, defer website analytics development.
 * No runtime verifier exists yet. There is deliberately no activation success path.
 * A future implementation must install a real host-owned boundary verifier and pin
 * its runtime/test evidence; request data can never provide that verifier.
 */
export async function assessAnalyticsActivation(input) {
  const errors = []; const evidence = {};
  const response = status => ({ schema_version: '1.0.0', status, contract_id: ANALYTICS_CONTRACT_PIN.contract_id,
    contract_version: ANALYTICS_CONTRACT_PIN.version, activation_allowed: false, runtime_verified: false,
    runtime_boundary: 'NOT_IMPLEMENTED', website_tracking_running: 'NOT_ASSESSED',
    action: input?.action ?? null, errors, evidence });
  if (!input || typeof input !== 'object' || Array.isArray(input)
      || Object.keys(input).some(key => !['projectRoot', 'action', 'expectedContractSha256'].includes(key))
      || !isAbsolute(input.projectRoot ?? '') || !['defer', 'activate'].includes(input.action)) {
    errors.push('EXPLICIT_ROOT_AND_ACTION_REQUIRED_NO_CALLER_STATUS_OR_VERIFIER');
    return response('ACTIVATION_BLOCKED');
  }
  try {
    const root = await realpath(input.projectRoot); const snapshots = {};
    for (const path of paths) {
      const absolute = resolve(root, path); const physical = await realpath(absolute);
      if (relative(root, physical) !== relative(root, absolute)) throw new Error('ANALYTICS_SOURCE_ALIAS');
      const bytes = await readFile(absolute);
      snapshots[path] = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      evidence[path] = hash(bytes);
    }
    const registry = JSON.parse(snapshots[paths[0]]);
    const catalogue = JSON.parse(snapshots[paths[1]]);
    const shape = await validateContracts(catalogue, registry, { projectRoot: root });
    if (!shape.valid) throw new Error(`CONTRACT_CATALOGUE_INVALID:${shape.errors.join('; ')}`);
    const contract = catalogue.contracts.find(item => item.contract_id === ANALYTICS_CONTRACT_PIN.contract_id);
    if (!contract) throw new Error('ANALYTICS_CONTRACT_MISSING');
    const contractHash = hash(JSON.stringify(canonical(contract)));
    evidence.contract_sha256 = contractHash;
    if (contract.version !== ANALYTICS_CONTRACT_PIN.version || contractHash !== ANALYTICS_CONTRACT_PIN.sha256
        || (input.expectedContractSha256 !== undefined && input.expectedContractSha256 !== contractHash)) {
      throw new Error('ANALYTICS_CONTRACT_STALE_OR_UNSUPPORTED');
    }
    for (const [id, authority, source] of [
      ['analytics', 'website.analytics', 'docs/analytics.md'],
      ['cms-content', 'website.cms-content', 'editor/README.md'],
    ]) {
      const module = registry.modules.find(item => item.module_id === id);
      if (module?.authority !== authority || module.source !== source || module.status !== 'active_reference') {
        throw new Error('ANALYTICS_CONTRACT_AUTHORITY_CHANGED');
      }
    }
    for (const path of paths) {
      if (hash(await readFile(resolve(root, path))) !== evidence[path]) throw new Error('ANALYTICS_INPUT_CHANGED_DURING_CHECK');
    }
    if (input.action === 'activate') {
      errors.push('ACTUAL_ANALYTICS_RUNTIME_BOUNDARY_AND_PINNED_TEST_EVIDENCE_MISSING');
      return response('ACTIVATION_BLOCKED');
    }
    return response('DEFERRED_INACTIVE');
  } catch (error) {
    errors.push(error.message);
    return response('ACTIVATION_BLOCKED');
  }
}
