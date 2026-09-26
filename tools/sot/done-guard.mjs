const isText = value => typeof value === 'string' && value.trim().length > 0;

function passEvidence(value) {
  return value?.status === 'PASS' && isText(value.evidence_ref);
}

function auditPass(postValidation) {
  if (postValidation?.status !== 'POST_VALIDATION_PASS'
    || !Array.isArray(postValidation.checks)) return false;
  const byName = new Map(postValidation.checks.map(item => [item?.name, item]));
  return ['required_check', 'contracts', 'dependencies', 'sotConsistency', 'traceability']
    .every(name => byName.get(name)?.status === 'PASS');
}

/**
 * Fail-closed Definition-of-Done gate. Evidence references are recorded for
 * downstream audit; this pure function does not authenticate or dereference
 * them. All required project checkers must provide explicit PASS evidence.
 */
export function evaluateDoneGuard({
  scope,
  sotUpdate,
  unresolvedConflicts,
  requiredChecks,
  contracts,
  dependencies,
  consistency,
  postValidation,
}) {
  const findings = [];
  const record = (id, pass, detail) => findings.push({
    id, status: pass ? 'PASS' : 'BLOCKED', detail,
  });

  record('scope', isText(scope), isText(scope) ? scope : 'MISSING_SCOPE');
  const noUpdate = sotUpdate?.required === false
    && sotUpdate.scope === scope && isText(sotUpdate.reason)
    && isText(sotUpdate.evidence_ref);
  const updated = sotUpdate?.required === true
    && Array.isArray(sotUpdate.updated_module_ids)
    && sotUpdate.updated_module_ids.length > 0
    && sotUpdate.updated_module_ids.every(isText)
    && isText(sotUpdate.evidence_ref);
  record('sot_update', noUpdate || (updated && auditPass(postValidation)),
    noUpdate ? 'EXPLICITLY_NOT_REQUIRED' : updated && auditPass(postValidation)
      ? 'UPDATE_EVIDENCE_AND_POST_VALIDATION_PASS' : 'MISSING_OR_INVALID_SOT_UPDATE_EVIDENCE');

  const conflictsValid = Array.isArray(unresolvedConflicts);
  record('unresolved_conflicts', conflictsValid && unresolvedConflicts.length === 0,
    !conflictsValid ? 'MISSING_CONFLICT_RESULT' : unresolvedConflicts.length
      ? `UNRESOLVED:${unresolvedConflicts.length}` : 'NONE');

  const checksValid = Array.isArray(requiredChecks) && requiredChecks.length > 0
    && requiredChecks.every(item => isText(item?.id) && passEvidence(item))
    && new Set(requiredChecks.map(item => item.id)).size === requiredChecks.length;
  record('required_checks', checksValid, checksValid ? `PASS:${requiredChecks.length}` : 'MISSING_FAILED_OR_DUPLICATE_CHECK');
  for (const [id, proof] of Object.entries({ contracts, dependencies, consistency })) {
    record(id, passEvidence(proof), passEvidence(proof) ? proof.evidence_ref : 'MISSING_PASS_EVIDENCE');
  }
  record('post_validation', auditPass(postValidation), auditPass(postValidation)
    ? 'POST_VALIDATION_PASS' : 'MISSING_OR_FAILED_POST_VALIDATION');

  const done = findings.every(item => item.status === 'PASS');
  return {
    schema_version: '1.0.0',
    status: done ? 'DONE_ALLOWED' : 'DONE_BLOCKED',
    scope: isText(scope) ? scope : null,
    findings,
  };
}
