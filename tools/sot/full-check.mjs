/**
 * Execute only the targets selected by the Impact Engine. This module does not
 * infer a historical migration audit from a FULL_CHECK classification.
 *
 * Each validator receives ({id, impact}) and must return
 * {status: 'PASS', evidence_ref: '...'} or {status: 'BLOCKED', reason: '...'}.
 * Missing validators, evidence and unresolved impact block completion.
 */
const ALERT = '⚠ FULL CHECK REQUIRED';

const unique = values => [...new Set(values)].sort();
const nonempty = value => typeof value === 'string' && value.trim().length > 0;

function scopedTargets(impact) {
  if (impact?.mode !== 'FULL_CHECK' || impact.alert !== ALERT) {
    throw new Error('An assessed FULL_CHECK with the exact escalation alert is required.');
  }
  if (!Array.isArray(impact.reasons) || !impact.reasons.length ||
      !impact.reasons.every(nonempty)) throw new Error('FULL CHECK reasons are required.');
  const scope = impact.scope;
  for (const key of ['modules', 'changed_modules', 'contracts', 'work_items', 'active_processes']) {
    if (!Array.isArray(scope?.[key])) throw new Error(`Impact scope.${key} is required.`);
  }
  const modules = unique([...scope.modules, ...scope.changed_modules]);
  const contracts = unique(scope.contracts);
  const workItems = unique(scope.work_items);
  const processes = [...scope.active_processes].sort((a, b) => a.id.localeCompare(b.id));
  if ([...modules, ...contracts, ...workItems].some(value => !nonempty(value)) ||
      processes.some(process => !nonempty(process?.id))) throw new Error('Impact scope contains an invalid target.');
  return { modules, contracts, workItems, processes };
}

export async function runFullCheck({ impact, validators = {} }) {
  const { modules, contracts, workItems, processes } = scopedTargets(impact);
  const checks = [{ type: 'dependency_graph', id: 'scoped-graph', validator: validators.dependencyGraph }];
  for (const id of modules) checks.push({ type: 'module', id, validator: validators.module });
  for (const id of contracts) checks.push({ type: 'contract', id, validator: validators.contract });
  for (const id of workItems) checks.push({ type: 'work_item', id, validator: validators.workItem });
  for (const process of processes) checks.push({ type: 'active_process', id: process.id, validator: validators.activeProcess });

  const results = [];
  for (const check of checks) {
    if (typeof check.validator !== 'function') {
      results.push({ type: check.type, id: check.id, status: 'BLOCKED', reason: 'MISSING_CHECKER' });
      continue;
    }
    try {
      const finding = await check.validator({ id: check.id, impact });
      if (finding?.status === 'PASS' && nonempty(finding.evidence_ref)) {
        results.push({ type: check.type, id: check.id, status: 'PASS', evidence_ref: finding.evidence_ref });
      } else {
        results.push({ type: check.type, id: check.id, status: 'BLOCKED',
          reason: nonempty(finding?.reason) ? finding.reason : 'CHECK_FAILED_OR_EVIDENCE_MISSING' });
      }
    } catch (error) {
      results.push({ type: check.type, id: check.id, status: 'BLOCKED',
        reason: `CHECK_ERROR: ${error instanceof Error ? error.message : String(error)}` });
    }
  }

  if (!modules.length && !contracts.length && !workItems.length) {
    results.push({ type: 'scope', id: 'affected-targets', status: 'BLOCKED', reason: 'UNRESOLVED_IMPACT_SCOPE' });
  }
  if (impact.scope.unresolved_modules?.length || impact.reasons.some(reason =>
    /^(UNKNOWN_|FULL_TRIGGER:UNKNOWN_IMPACT|SEMANTIC_IMPACT_UNVERIFIED|CONTRACT_COMPARISON_UNAVAILABLE)/.test(reason))) {
    results.push({ type: 'scope', id: 'unknown-impact', status: 'BLOCKED', reason: 'UNRESOLVED_IMPACT' });
  }
  if (processes.some(process => process.conflict)) {
    results.push({ type: 'active_process', id: 'conflict', status: 'BLOCKED', reason: 'ACTIVE_WORK_CONFLICT' });
  }

  const status = results.every(result => result.status === 'PASS') ? 'FULL_CHECK_PASS' : 'FULL_CHECK_BLOCKED';
  return {
    schema_version: '1.0.0',
    alert: ALERT,
    status,
    reasons: unique(impact.reasons),
    scope: {
      modules,
      contracts,
      work_items: workItems,
      active_processes: processes.map(process => process.id),
    },
    checks: results,
  };
}
