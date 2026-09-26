import { randomUUID } from 'node:crypto';
import { readFile, realpath, link, unlink, writeFile, lstat } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { detectDelta } from './delta.mjs';
import { assessImpact } from './impact.mjs';
import { runFastCheck } from './fast-check.mjs';
import { runFullCheck } from './full-check.mjs';

const sorted = values => [...new Set(values)].sort();

async function checkedOutputPath(projectRoot, outputPath) {
  if (!isAbsolute(projectRoot) || typeof outputPath !== 'string' || !outputPath.endsWith('.json')) {
    throw new Error('Absolute projectRoot and explicit JSON outputPath are required.');
  }
  const root = await realpath(projectRoot);
  const path = resolve(projectRoot, outputPath);
  const rel = relative(root, path);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error('Audit output must be inside the repository.');
  }
  if (!rel.replaceAll('\\', '/').startsWith('docs/sot-optimization/audits/')) {
    throw new Error('Audit output must be in docs/sot-optimization/audits/.');
  }
  const parent = await realpath(dirname(path));
  const parentRel = relative(root, parent);
  if (parentRel === '..' || parentRel.startsWith(`..${sep}`) || isAbsolute(parentRel)) {
    throw new Error('Audit output parent escapes the repository.');
  }
  // Results are immutable evidence; a retry needs a new filename.
  try {
    await lstat(path);
    throw new Error('Audit output already exists; choose a new result filename.');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return path;
}

async function saveAtomically(path, value) {
  const temporary = resolve(dirname(path), `.${basename(path)}.${randomUUID()}.tmp`);
  try {
    await writeFile(temporary, `${JSON.stringify(value, null, 2)}\n`, { flag: 'wx' });
    await link(temporary, path);
  } finally {
    await unlink(temporary).catch(error => { if (error.code !== 'ENOENT') throw error; });
  }
}

function missingManifests(delta, inputs) {
  const prior = new Set((inputs.baselines ?? []).filter(item => item.semantic_manifest_sha256)
    .map(item => item.source));
  return delta.modules.filter(item =>
    !((inputs.beforeManifests?.[item.module_id] != null) || prior.has(item.source))
      || inputs.afterManifests?.[item.module_id] == null)
    .map(item => item.module_id).sort();
}

/**
 * Run one reproducible, scoped local audit. The caller supplies explicit snapshots,
 * semantic manifests, contract catalogues, checkers and a repository-local result
 * path. A missing proof is a BLOCKED result; it is never an implicit PASS.
 *
 * input: {projectRoot, outputPath, change, registry, graph, before?, after,
 *   baselines?, beforeManifests, afterManifests, beforeContracts, afterContracts,
 *   contracts, traceability_records?, test_commands?, changed_paths?, validators?}
 */
export async function runIncrementalAudit(input) {
  if (!input || typeof input !== 'object') throw new Error('Audit input is required.');
  const output = await checkedOutputPath(input.projectRoot, input.outputPath);
  const failures = [];
  let delta = null;
  let impact = null;
  let check = null;
  try {
    if (!input.beforeContracts?.contracts || !input.afterContracts?.contracts || !input.contracts?.contracts) {
      failures.push('MISSING_CONTRACT_CATALOGUE');
    } else if (!isDeepStrictEqual(input.afterContracts, input.contracts)) {
      failures.push('CURRENT_CONTRACT_CATALOGUE_DISAGREES_WITH_DELTA');
    }
    if (!input.registry?.modules || !input.graph?.nodes || !input.graph?.edges) {
      failures.push('MISSING_REGISTRY_OR_DEPENDENCY_GRAPH');
    }
    if (!input.beforeManifests || !input.afterManifests) failures.push('MISSING_SEMANTIC_MANIFESTS');
    if (failures.length === 0) {
      delta = detectDelta(input);
      const missing = missingManifests(delta, input);
      if (missing.length) failures.push(`MISSING_SEMANTIC_MANIFEST:${missing.join(',')}`);
      impact = assessImpact({ change: input.change, delta, graph: input.graph });
      if (impact.mode === 'FAST_CHECK') {
        check = await runFastCheck({
          ...input, delta, impact, projectRoot: input.projectRoot,
        });
        if (check.result !== 'FAST_CHECK_PASS') failures.push(...check.failures.map(item => `FAST_CHECK:${item}`));
      } else if (impact.mode === 'FULL_CHECK') {
        check = await runFullCheck({ impact, validators: input.validators });
        if (check.status !== 'FULL_CHECK_PASS') failures.push(...check.checks.filter(item => item.status !== 'PASS')
          .map(item => `FULL_CHECK:${item.type}:${item.id}:${item.reason}`));
      }
    }
  } catch (error) {
    failures.push(`AUDIT_ERROR:${error instanceof Error ? error.message : String(error)}`);
  }
  // NO_CHECK is possible only with a complete explicit comparison and no missing
  // proof. This result does not assert that historical migration was re-audited.
  const status = failures.length ? 'BLOCKED' : 'PASS';
  const result = {
    schema_version: '1.0.0',
    status,
    mode: impact?.mode ?? 'UNDETERMINED',
    alert: impact?.alert ?? null,
    reasons: sorted([...(impact?.reasons ?? []), ...failures]),
    scope: impact?.scope ?? null,
    delta,
    check,
    historical_migration_audited: false,
  };
  await saveAtomically(output, result);
  // Read the saved bytes to ensure the returned result is the recorded result.
  return JSON.parse(await readFile(output, 'utf8'));
}
