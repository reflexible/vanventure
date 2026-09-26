export const WSJF_SCALE = Object.freeze([1, 2, 3, 5, 8, 13, 20]);
const CONFIDENCE = new Set(['High', 'Medium', 'Low']);
const VALUE_STATUS = new Set(['Proposed', 'Confirmed', 'Overridden']);

const isText = value => typeof value === 'string' && value.trim().length > 0;
const isTimestamp = value => isText(value) && Number.isFinite(Date.parse(value))
  && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value);
function score(value, label, errors) {
  if (!WSJF_SCALE.includes(value)) errors.push(`${label} must use the relative scale ${WSJF_SCALE.join(', ')}.`);
}
function component(value, label, errors) {
  score(value?.score, label, errors);
  if (!CONFIDENCE.has(value?.confidence)) errors.push(`${label}.confidence must be High, Medium or Low.`);
  if (!isText(value?.rationale)) errors.push(`${label}.rationale is required.`);
  if (value?.confidence === 'Low') {
    for (const field of ['missing_information', 'uncertain_assumption', 'unanalyzed_area']) {
      if (!isText(value?.uncertainty?.[field])) errors.push(`${label}.uncertainty.${field} is required for Low confidence.`);
    }
  }
}

/** Calculate a proposed WSJF score. This function never assigns or starts work. */
export function evaluateWsjf(input) {
  const errors = [];
  if (!isTimestamp(input?.evaluated_at)) errors.push('evaluated_at must be an ISO timestamp with timezone.');
  component(input?.user_business_value, 'user_business_value', errors);
  component(input?.time_criticality, 'time_criticality', errors);
  component(input?.risk_reduction_opportunity_enablement, 'risk_reduction_opportunity_enablement', errors);
  component(input?.job_size, 'job_size', errors);
  const valueStatus = input?.value_status ?? 'Proposed';
  if (!VALUE_STATUS.has(valueStatus)) errors.push('value_status must be Proposed, Confirmed or Overridden.');
  if (['Confirmed', 'Overridden'].includes(input?.prior_value_status)
      && (input.prior_value_status !== valueStatus || input.prior_user_business_value !== input?.user_business_value?.score)) {
    errors.push('Confirmed or overridden User / Business Value cannot be changed automatically.');
  }
  const override = input?.manual_priority_override;
  if (override != null && (typeof override !== 'object' || typeof override.enabled !== 'boolean')) errors.push('manual_priority_override.enabled must be a boolean.');
  if (override?.enabled && !isText(override.reason)) errors.push('A manual priority override needs a reason.');
  if (input?.suggested_user_business_value != null) component(input.suggested_user_business_value, 'suggested_user_business_value', errors);
  if (input?.manual_wsjf !== undefined) errors.push('WSJF is calculated and cannot be manually supplied.');
  if (errors.length) return { valid: false, errors, score: null };

  const costOfDelay = input.user_business_value.score + input.time_criticality.score
    + input.risk_reduction_opportunity_enablement.score;
  const jobSize = input.job_size.score;
  const wsjf = Number((costOfDelay / jobSize).toFixed(2));
  const decompositionRequired = jobSize >= 13;
  const decomposition = input.decomposition_review;
  const decompositionRationale = decomposition?.rationale ?? null;
  const decompositionValid = !decompositionRequired || (decomposition?.outcome === 'RETAIN_VERTICAL_VALUE'
    && isText(decompositionRationale) && isTimestamp(decomposition.reviewed_at));
  return {
    valid: decompositionValid,
    errors: !decompositionValid
      ? ['Job Size 13 or 20 requires a timestamped decomposition review with RETAIN_VERTICAL_VALUE and a rationale; SPLIT_REQUIRED must be resolved into smaller vertical stories first.'] : [],
    evaluated_at: input.evaluated_at,
    value_status: valueStatus,
    user_business_value: structuredClone(input.user_business_value),
    suggested_user_business_value: structuredClone(input.suggested_user_business_value ?? null),
    time_criticality: structuredClone(input.time_criticality),
    risk_reduction_opportunity_enablement: structuredClone(input.risk_reduction_opportunity_enablement),
    job_size: structuredClone(input.job_size),
    cost_of_delay: costOfDelay,
    wsjf,
    manual_priority_override: override?.enabled ? { enabled: true, reason: override.reason.trim() } : { enabled: false, reason: null },
    decomposition_review: { required: decompositionRequired, rationale: decompositionRationale,
      outcome: decomposition?.outcome ?? null, reviewed_at: decomposition?.reviewed_at ?? null },
    execution_decision: 'NOT_AUTHORIZED',
  };
}

/** Re-evaluate from changed facts while preserving manual decisions and an audit trail. */
export function reevaluateWsjf({ current, proposed, reason, changed_facts, evaluated_at }) {
  const errors = [];
  const previousCalculation = evaluateWsjf(current);
  if (!previousCalculation.valid || current?.valid !== true
      || current.wsjf !== previousCalculation.wsjf || current.cost_of_delay !== previousCalculation.cost_of_delay) {
    errors.push('A previously calculated WSJF record is required.');
  }
  if (!isText(reason) || !Array.isArray(changed_facts) || !changed_facts.length
      || !changed_facts.every(isText)) errors.push('Re-evaluation needs changed facts and a reason.');
  if (!isTimestamp(evaluated_at)) {
    errors.push('evaluated_at must be an ISO timestamp with timezone.');
  }
  if (!proposed) errors.push('A proposed assessment is required.');
  if (current?.history !== undefined && !Array.isArray(current.history)) errors.push('Existing history must be an array.');
  if (!proposed || !current || errors.length) return { valid: false, errors, result: null };

  const lockedValue = ['Confirmed', 'Overridden'].includes(current.value_status);
  if (proposed.value_status !== current.value_status) errors.push('Automatic re-evaluation cannot change the User / Business Value status.');
  const normalizedOverride = value => value?.enabled === true
    ? { enabled: true, reason: value.reason ?? null } : { enabled: false, reason: null };
  if (JSON.stringify(normalizedOverride(proposed.manual_priority_override))
      !== JSON.stringify(normalizedOverride(current.manual_priority_override))) {
    errors.push('Automatic re-evaluation cannot change a manual priority override.');
  }
  if (errors.length) return { valid: false, errors, result: null };

  // Validate the proposed value even when a protected value replaces it below.
  component(proposed.user_business_value, 'proposed.user_business_value', errors);
  if (errors.length) return { valid: false, errors, result: null };
  const suggestedValue = proposed.user_business_value;
  const nextInput = {
    ...proposed,
    evaluated_at,
    user_business_value: lockedValue ? current.user_business_value : proposed.user_business_value,
    value_status: current.value_status,
    prior_value_status: lockedValue ? current.value_status : undefined,
    prior_user_business_value: lockedValue ? current.user_business_value?.score : undefined,
    manual_priority_override: current.manual_priority_override ?? { enabled: false },
  };
  if (lockedValue && suggestedValue?.score !== current.user_business_value?.score) {
    nextInput.suggested_user_business_value = suggestedValue;
  }
  const evaluated = evaluateWsjf(nextInput);
  if (!evaluated.valid) return { valid: false, errors: evaluated.errors, result: null };
  const history = Array.isArray(current.history) ? structuredClone(current.history) : [];
  history.push(structuredClone({ at: evaluated_at, reason: reason.trim(), changed_facts: changed_facts.map(item => item.trim()),
    previous: { evaluated_at: current.evaluated_at, user_business_value: current.user_business_value, value_status: current.value_status,
      time_criticality: current.time_criticality, risk_reduction_opportunity_enablement: current.risk_reduction_opportunity_enablement,
      job_size: current.job_size, cost_of_delay: current.cost_of_delay, wsjf: current.wsjf },
    next: { evaluated_at: evaluated.evaluated_at, user_business_value: evaluated.user_business_value, suggested_user_business_value: evaluated.suggested_user_business_value,
      value_status: evaluated.value_status, time_criticality: evaluated.time_criticality,
      risk_reduction_opportunity_enablement: evaluated.risk_reduction_opportunity_enablement,
      job_size: evaluated.job_size, cost_of_delay: evaluated.cost_of_delay, wsjf: evaluated.wsjf },
  }));
  return { valid: true, errors: [], result: { ...evaluated, history } };
}

/** Rank only currently executable work; WSJF never overrides readiness or safety gates. */
export function rankReadyQueue(items, { comparisonGroup = null } = {}) {
  if (!Array.isArray(items)) throw new Error('Ready queue items must be an array.');
  const groups = [...new Set(items.map(item => item?.comparison_group ?? 'product-backlog'))];
  if (groups.length > 1 && !isText(comparisonGroup)) {
    throw new Error('A comparison_group must be selected before ranking incomparable backlogs.');
  }
  const selectedGroup = comparisonGroup ?? groups[0] ?? 'product-backlog';
  const eligible = items.filter(item => (item?.comparison_group ?? 'product-backlog') === selectedGroup
    && item?.ready === true && item?.claimed !== true && item?.blocked !== true
    && item?.conflict !== true && item?.user_decision_required !== true
    && (!Object.hasOwn(item ?? {}, 'hard_dependencies')
      || Array.isArray(item.hard_dependencies)
        && item.hard_dependencies.every(dependency => isText(dependency?.id)
          && dependency.status === 'SATISFIED')));
  const ids = new Set();
  const scored = eligible.map(item => {
    const assessment = evaluateWsjf(item);
    if (!isText(item.id) || !assessment.valid) {
      throw new Error(`Executable items need an ID and valid calculated WSJF: ${assessment.errors.join(' ')}`);
    }
    if (ids.has(item.id)) throw new Error(`Duplicate executable item ID: ${item.id}`);
    ids.add(item.id);
    if ((item.wsjf !== undefined && item.wsjf !== assessment.wsjf)
        || (item.cost_of_delay !== undefined && item.cost_of_delay !== assessment.cost_of_delay)) {
      throw new Error(`Stored WSJF for ${item.id} differs from its components.`);
    }
    return { item, assessment };
  });
  return scored.sort((a, b) => Number(b.assessment.manual_priority_override.enabled)
    - Number(a.assessment.manual_priority_override.enabled)
    // Compare the exact fractions; rounding is only a display concern.
    || b.assessment.cost_of_delay * a.assessment.job_size.score
      - a.assessment.cost_of_delay * b.assessment.job_size.score
    || a.item.id.localeCompare(b.item.id)).map(({ item, assessment }) => ({ id: item.id, wsjf: assessment.wsjf,
      comparison_group: selectedGroup,
      manual_priority_override: assessment.manual_priority_override.enabled,
      reason: assessment.manual_priority_override.reason }));
}
