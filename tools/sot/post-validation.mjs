import { readFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { sha256 } from './baselines.mjs';
import { validateRegistry } from './module-registry.mjs';
import { validateContracts } from './contracts.mjs';
import { validateDependencyGraph } from './dependency-graph.mjs';
import { runIncrementalAudit } from './incremental-audit.mjs';

const unique = items => [...new Set(items)].sort();
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

function checkedSource(root, source) {
  if (!nonempty(source) || isAbsolute(source) || source.includes('\\') || source.includes(':')) {
    throw new Error(`Invalid module source: ${source}`);
  }
  const path = resolve(root, source);
  const rel = relative(root, path);
  if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) {
    throw new Error(`Module source escapes repository: ${source}`);
  }
  return path;
}

/**
 * Validate one completed SoT update against the files currently on disk.
 * auditInput is passed to the immutable incremental-audit engine. The caller
 * must name the updated modules and provide executable semantic/traceability
 * validators. A missing, stale or failing proof is BLOCKED, never inferred PASS.
 */
export async function runSotPostValidation({ auditInput, updatedModuleIds, validators = {} }) {
  if (!auditInput?.projectRoot || !isAbsolute(auditInput.projectRoot)) {
    throw new Error('Absolute auditInput.projectRoot is required.');
  }
  const results = [];
  const record = (name, ok, detail) => results.push({
    name, status: ok ? 'PASS' : 'BLOCKED', detail,
  });
  const registry = auditInput.registry;
  const ids = Array.isArray(updatedModuleIds) ? unique(updatedModuleIds) : [];
  const registryResult = registry?.modules
    ? await validateRegistry(registry, { projectRoot: auditInput.projectRoot })
    : { valid: false, errors: ['MISSING_REGISTRY'] };
  record('registry', registryResult.valid, registryResult.errors.join('; '));
  const contractResult = auditInput.contracts?.contracts && registry?.modules
    ? await validateContracts(auditInput.contracts, registry, { projectRoot: auditInput.projectRoot })
    : { valid: false, errors: ['MISSING_CONTRACTS_OR_REGISTRY'] };
  record('contracts', contractResult.valid, contractResult.errors.join('; '));
  const graphResult = auditInput.graph?.nodes && auditInput.graph?.edges
    ? validateDependencyGraph(auditInput.graph)
    : { valid: false, errors: ['MISSING_DEPENDENCY_GRAPH'] };
  record('dependencies', graphResult.valid, graphResult.errors.join('; '));

  const moduleById = new Map((registry?.modules ?? []).map(module => [module.module_id, module]));
  const sourceProblems = [];
  if (!ids.length || ids.some(id => !nonempty(id))) sourceProblems.push('MISSING_UPDATED_MODULE_IDS');
  for (const id of ids) {
    const source = moduleById.get(id)?.source;
    if (!source || !Object.hasOwn(auditInput.after ?? {}, id)) {
      sourceProblems.push(`MISSING_UPDATED_SOURCE:${id}`);
      continue;
    }
    try {
      const current = await readFile(checkedSource(auditInput.projectRoot, source));
      if (!Buffer.isBuffer(auditInput.after[id]) || sha256(current) !== sha256(auditInput.after[id])) {
        sourceProblems.push(`STALE_SOURCE_SNAPSHOT:${id}`);
      }
    } catch (error) {
      sourceProblems.push(`UNREADABLE_UPDATED_SOURCE:${id}:${error.message}`);
    }
  }
  record('current_sources', sourceProblems.length === 0, sourceProblems.join('; '));

  // The audit writes an immutable result even when it blocks. No audit is run
  // until the supplied inputs describe actual source files and valid catalogues.
  let audit = null;
  if (results.every(item => item.status === 'PASS')) {
    try {
      audit = await runIncrementalAudit(auditInput);
      const deltaIds = unique(audit.delta?.modules?.map(module => module.module_id) ?? []);
      record('delta', ids.every(id => deltaIds.includes(id)),
        `updated=${ids.join(',')}; changed=${deltaIds.join(',')}`);
      const checkPassed = audit.mode === 'FAST_CHECK'
        ? audit.check?.result === 'FAST_CHECK_PASS'
        : audit.mode === 'FULL_CHECK'
          ? audit.check?.status === 'FULL_CHECK_PASS'
          : false;
      record('required_check', audit.status === 'PASS' && checkPassed,
        `audit=${audit.status}; mode=${audit.mode}; result=${audit.check?.result ?? audit.check?.status ?? 'MISSING'}`);
    } catch (error) {
      record('audit_execution', false, error instanceof Error ? error.message : String(error));
    }
  } else {
    record('audit_execution', false, 'Prerequisite validation blocked execution.');
  }

  for (const name of ['sotConsistency', 'traceability']) {
    if (typeof validators[name] !== 'function') {
      record(name, false, 'MISSING_CHECKER');
      continue;
    }
    if (!audit || audit.status !== 'PASS') {
      record(name, false, 'AUDIT_NOT_PASSED');
      continue;
    }
    try {
      const finding = await validators[name]({ audit, updatedModuleIds: ids, projectRoot: auditInput.projectRoot });
      record(name, finding?.status === 'PASS' && nonempty(finding.evidence_ref),
        finding?.status === 'PASS' ? finding.evidence_ref ?? 'MISSING_EVIDENCE' : finding?.reason ?? 'CHECK_FAILED');
    } catch (error) {
      record(name, false, `CHECK_ERROR:${error instanceof Error ? error.message : String(error)}`);
    }
  }
  return {
    schema_version: '1.0.0',
    status: results.every(item => item.status === 'PASS') ? 'POST_VALIDATION_PASS' : 'POST_VALIDATION_BLOCKED',
    mode: audit?.mode ?? 'UNDETERMINED',
    alert: audit?.alert ?? null,
    updated_modules: ids,
    audit_output: audit ? auditInput.outputPath : null,
    checks: results,
  };
}
