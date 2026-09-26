import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import {
  compareToBaseline, normalizedTextSha256, repositoryRoot, semanticManifestSha256, sha256,
} from './baselines.mjs';
import { compareContractVersions } from './contracts.mjs';

const gitRef = /^(?:[a-f0-9]{40}|refs\/(?:heads|tags)\/[A-Za-z0-9][A-Za-z0-9._/-]*)$/;

function sourcePath(root, source) {
  if (typeof source !== 'string' || !source || isAbsolute(source) || source.includes('\\') || source.includes(':')) {
    throw new Error(`Invalid repository source: ${source}`);
  }
  const path = resolve(root, source);
  const rel = relative(root, path);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error(`Source escapes repository: ${source}`);
  }
  return path;
}

function bytes(value, label) {
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof Uint8Array) return Buffer.from(value);
  throw new Error(`${label} must be bytes, not an inferred text or Git state.`);
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, canonical(item)]));
  }
  return value;
}

/** Read named module sources only. A historical Git ref is read only when supplied explicitly. */
export async function readModuleSnapshots(registry, { projectRoot = repositoryRoot, ref } = {}) {
  if (ref !== undefined && !gitRef.test(ref)) throw new Error('Git ref must be an explicit full OID or refs/heads|tags name.');
  const snapshots = {};
  for (const module of [...registry.modules].sort((a, b) => a.module_id.localeCompare(b.module_id))) {
    const path = sourcePath(projectRoot, module.source);
    if (ref === undefined) snapshots[module.module_id] = await readFile(path);
    else {
      const result = spawnSync('git', ['show', `${ref}:${module.source}`], {
        cwd: projectRoot, encoding: null, maxBuffer: 32 * 1024 * 1024,
      });
      if (result.error || result.status !== 0) {
        throw new Error(`Cannot read ${module.module_id} at explicit Git ref ${ref}: ${result.error?.message ?? result.stderr.toString().trim()}`);
      }
      snapshots[module.module_id] = result.stdout;
    }
  }
  return snapshots;
}

function compareBytes(beforeBytes, afterBytes, manifestBefore, manifestAfter) {
  const oldBytes = bytes(beforeBytes, 'Previous source');
  const newBytes = bytes(afterBytes, 'Current source');
  const baseline = {
    byte_sha256: sha256(oldBytes),
    normalized_text_sha256: normalizedTextSha256(oldBytes),
    semantic_manifest_sha256: manifestBefore === undefined ? null : semanticManifestSha256(manifestBefore),
  };
  // A semantic claim requires both explicit old and new manifests.
  return {
    comparison: compareToBaseline(baseline, newBytes, manifestBefore === undefined || manifestAfter === undefined ? null : manifestAfter),
    previous_sha256: baseline.byte_sha256,
    current_sha256: sha256(newBytes),
  };
}

function comparePinnedBaseline(baseline, afterBytes, currentManifest) {
  const newBytes = bytes(afterBytes, 'Current source');
  return {
    comparison: compareToBaseline(baseline, newBytes, currentManifest ?? null),
    previous_sha256: baseline.byte_sha256,
    current_sha256: sha256(newBytes),
  };
}

function contractDelta(beforeCatalogue, afterCatalogue) {
  if (!beforeCatalogue || !afterCatalogue) return { changes: [], unknown: true };
  const before = new Map(beforeCatalogue.contracts.map(item => [item.contract_id, item]));
  const after = new Map(afterCatalogue.contracts.map(item => [item.contract_id, item]));
  const changes = [];
  for (const id of [...new Set([...before.keys(), ...after.keys()])].sort()) {
    const oldContract = before.get(id);
    const newContract = after.get(id);
    if (oldContract && newContract && JSON.stringify(canonical(oldContract)) === JSON.stringify(canonical(newContract))) continue;
    const assessment = oldContract && newContract ? compareContractVersions(oldContract, newContract) : null;
    changes.push({
      contract_id: id,
      kind: !oldContract ? 'ADDED' : !newContract ? 'REMOVED' : assessment.breaking.length ? 'BREAKING'
        : assessment.additive.length ? 'ADDITIVE' : 'METADATA',
      breaking: !newContract ? ['removed contract'] : assessment?.breaking ?? [],
      additive: !oldContract ? ['added contract'] : assessment?.additive ?? [],
      version_valid: assessment?.validVersion ?? (!oldContract),
      version_errors: assessment?.errors ?? (!newContract ? ['Removed contract has no successor version.'] : []),
      modules: [...new Set([
        oldContract?.provider_module, oldContract?.consumer_module,
        newContract?.provider_module, newContract?.consumer_module,
      ].filter(Boolean))].sort(),
    });
  }
  return { changes, unknown: false };
}

/**
 * Produce a deterministic, read-only delta. All before/after bytes and semantic manifests
 * are explicit; a missing semantic manifest never counts as proof of unchanged meaning.
 * A pinned baseline can supply the previous state for one module without touching Git.
 */
export function detectDelta({
  registry, before = {}, after, baselines = [], beforeManifests = {}, afterManifests = {},
  beforeContracts, afterContracts,
}) {
  if (!registry || !Array.isArray(registry.modules) || !after || typeof after !== 'object') {
    throw new Error('Registry modules and current module snapshots are required.');
  }
  const baselineBySource = new Map(baselines.map(item => [item.source, item]));
  const contracts = contractDelta(beforeContracts, afterContracts);
  const contractModules = new Map();
  for (const change of contracts.changes) for (const id of change.modules) {
    if (!contractModules.has(id)) contractModules.set(id, []);
    contractModules.get(id).push(change.contract_id);
  }
  const modules = [];
  const excluded = [];
  for (const module of [...registry.modules].sort((a, b) => a.module_id.localeCompare(b.module_id))) {
    const id = module.module_id;
    if (!Object.hasOwn(after, id)) throw new Error(`Missing current source snapshot for ${id}.`);
    const baseline = baselineBySource.get(module.source);
    if (!Object.hasOwn(before, id) && !baseline) throw new Error(`Missing previous snapshot or pinned baseline for ${id}.`);
    const result = Object.hasOwn(before, id)
      ? compareBytes(before[id], after[id], beforeManifests[id], afterManifests[id])
      : comparePinnedBaseline(baseline, after[id], afterManifests[id]);
    const affectedContracts = contractModules.get(id) ?? [];
    const entry = {
      module_id: id,
      source: module.source,
      previous_sha256: result.previous_sha256,
      current_sha256: result.current_sha256,
      byte_match: result.comparison.byte_match,
      normalized_text_match: result.comparison.normalized_text_match,
      semantic_manifest_match: result.comparison.semantic_manifest_match,
      classification: result.comparison.classification,
      changed_contracts: affectedContracts,
    };
    if (entry.byte_match && entry.semantic_manifest_match !== false && affectedContracts.length === 0) excluded.push(id);
    else modules.push(entry);
  }
  return {
    schema_version: '1.0.0',
    modules,
    excluded_unchanged_modules: excluded,
    contracts: contracts.changes,
    contract_comparison_unknown: contracts.unknown,
    requires_semantic_review: modules.some(item => item.classification === 'TEXT_CHANGED_SEMANTICS_UNVERIFIED'
      || item.semantic_manifest_match === false),
    has_contract_break: contracts.changes.some(item => item.breaking.length > 0 || !item.version_valid),
  };
}
