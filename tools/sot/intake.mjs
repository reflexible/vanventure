import { createHash } from 'node:crypto';
import { loadRegistry, lookupAuthority } from './module-registry.mjs';

const classifications = {
  idea: new Set(['IDEA']),
  plan: new Set(['PROJECT_PLAN', 'SPECIALIST_PLAN', 'BACKLOG_ITEM']),
  decision: new Set(['PRODUCT_DECISION', 'ARCHITECTURE_DECISION']),
  rule: new Set(['DESIGN_RULE', 'CONTENT_RULE', 'SECURITY_RULE', 'PRIVACY_RULE', 'PROCESS_RULE', 'RULE_CHANGE', 'REQUIREMENT']),
};
const sourceTypes = new Set([
  'user_decision', 'chat', 'review', 'worker_result', 'brainstorm',
  'analysis', 'existing_plan', 'implementation', 'retrospective',
]);

function present(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function timestamp(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
    && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value);
}

/**
 * Prepare a non-binding intake proposal. The caller must provide an exact
 * authority key; this function never guesses a source, grants approval, or
 * writes to a project document.
 */
export function prepareIntake(input, registry) {
  const missing = [];
  const errors = [];
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, missing: ['intake'], errors: [], proposal: null };
  }
  if (!registry || !Array.isArray(registry.modules)) {
    return { valid: false, missing: ['validated module registry'], errors: [], proposal: null };
  }
  for (const field of ['kind', 'classification', 'title', 'content', 'authority']) {
    if (!present(input[field])) missing.push(field);
  }
  const provenance = input.provenance;
  if (!provenance || typeof provenance !== 'object' || Array.isArray(provenance)) {
    missing.push('provenance.source_type', 'provenance.reference', 'provenance.captured_at');
  } else {
    for (const field of ['source_type', 'reference', 'captured_at']) {
      if (!present(provenance[field])) missing.push(`provenance.${field}`);
    }
  }
  if (missing.length) return { valid: false, missing, errors, proposal: null };

  if (!Object.hasOwn(classifications, input.kind)) errors.push(`Unknown kind: ${input.kind}.`);
  else if (!classifications[input.kind].has(input.classification)) {
    errors.push(`Classification ${input.classification} is invalid for ${input.kind}.`);
  }
  if (!sourceTypes.has(provenance.source_type)) errors.push(`Unknown provenance.source_type: ${provenance.source_type}.`);
  if (!timestamp(provenance.captured_at)) errors.push('provenance.captured_at must be an ISO timestamp with timezone.');
  if (Object.hasOwn(input, 'status')) errors.push('Intake status is assigned by the workflow; approval cannot be supplied here.');
  if (Object.hasOwn(input, 'approval')) errors.push('Approval cannot be supplied through intake.');

  let owner = null;
  try {
    owner = lookupAuthority(registry, input.authority);
  } catch (error) {
    errors.push(error.message);
  }
  if (!owner) errors.push(`No unique registered authority for ${input.authority}.`);
  else if (owner.status !== 'active_reference') errors.push(`Authority ${input.authority} is not active.`);
  if (input.classification === 'PROJECT_PLAN' && input.authority !== 'planning.scrum-core') {
    errors.push('A project-wide plan must target planning.scrum-core; a parallel total plan is forbidden.');
  }
  if (Object.hasOwn(input, 'target_source') && owner && input.target_source !== owner.source) {
    errors.push(`target_source must equal the registered source ${owner.source}; a second source is forbidden.`);
  }
  if (errors.length) return { valid: false, missing: [], errors, proposal: null };

  const fields = {
    kind: input.kind,
    classification: input.classification,
    title: input.title.trim(),
    content: input.content.trim(),
    authority: input.authority,
    provenance: {
      source_type: provenance.source_type,
      reference: provenance.reference.trim(),
      captured_at: provenance.captured_at,
    },
  };
  const id = createHash('sha256').update(JSON.stringify(fields)).digest('hex');
  return {
    valid: true,
    missing: [],
    errors: [],
    proposal: {
      id,
      ...fields,
      status: input.kind === 'idea' ? 'IDEA' : 'PROPOSED',
      owner: { module_id: owner.module_id, authority: owner.authority, source: owner.source },
      approval: null,
      impact_check: 'PENDING',
      conflict_check: 'PENDING',
      integration: 'NOT_STARTED',
    },
  };
}

/** Load the checked-in, validated registry for an ordinary intake call. */
export async function prepareProjectIntake(input) {
  return prepareIntake(input, await loadRegistry());
}
