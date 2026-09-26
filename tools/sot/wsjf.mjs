export const WSJF_SCALE = Object.freeze([1, 2, 3, 5, 8, 13, 20]);
const CONFIDENCE = new Set(['High', 'Medium', 'Low']);
const VALUE_STATUS = new Set(['Proposed', 'Confirmed', 'Overridden']);

const isText = value => typeof value === 'string' && value.trim().length > 0;
function score(value, label, errors) {
  if (!WSJF_SCALE.includes(value)) errors.push(`${label} must use the relative scale ${WSJF_SCALE.join(', ')}.`);
}
function component(value, label, errors) {
  score(value?.score, label, errors);
  if (!CONFIDENCE.has(value?.confidence)) errors.push(`${label}.confidence must be High, Medium or Low.`);
  if (!isText(value?.rationale)) errors.push(`${label}.rationale is required.`);
  if (value?.confidence === 'Low' && !isText(value?.uncertainty)) errors.push(`${label}.uncertainty is required for Low confidence.`);
}

/** Calculate a proposed WSJF score. This function never assigns or starts work. */
export function evaluateWsjf(input) {
  const errors = [];
  component(input?.user_business_value, 'user_business_value', errors);
  component(input?.time_criticality, 'time_criticality', errors);
  component(input?.risk_reduction_opportunity_enablement, 'risk_reduction_opportunity_enablement', errors);
  component(input?.job_size, 'job_size', errors);
  const valueStatus = input?.value_status ?? 'Proposed';
  if (!VALUE_STATUS.has(valueStatus)) errors.push('value_status must be Proposed, Confirmed or Overridden.');
  if (['Confirmed', 'Overridden'].includes(valueStatus) && input?.prior_value_status === valueStatus
      && input?.prior_user_business_value !== input?.user_business_value?.score) {
    errors.push('Confirmed or overridden User / Business Value cannot be changed automatically.');
  }
  const override = input?.manual_priority_override;
  if (override?.enabled && !isText(override.reason)) errors.push('A manual priority override needs a reason.');
  if (input?.manual_wsjf !== undefined) errors.push('WSJF is calculated and cannot be manually supplied.');
  if (errors.length) return { valid: false, errors, score: null };

  const costOfDelay = input.user_business_value.score + input.time_criticality.score
    + input.risk_reduction_opportunity_enablement.score;
  const jobSize = input.job_size.score;
  const wsjf = Number((costOfDelay / jobSize).toFixed(2));
  const decompositionRequired = jobSize >= 13;
  const decompositionRationale = input.large_story_rationale ?? null;
  return {
    valid: !decompositionRequired || isText(decompositionRationale),
    errors: decompositionRequired && !isText(decompositionRationale)
      ? ['Job Size 13 or 20 requires a decomposition review or rationale why vertical value would be destroyed.'] : [],
    value_status: valueStatus,
    user_business_value: { ...input.user_business_value },
    suggested_user_business_value: input.suggested_user_business_value ?? null,
    time_criticality: { ...input.time_criticality },
    risk_reduction_opportunity_enablement: { ...input.risk_reduction_opportunity_enablement },
    job_size: { ...input.job_size },
    cost_of_delay: costOfDelay,
    wsjf,
    manual_priority_override: override?.enabled ? { enabled: true, reason: override.reason.trim() } : { enabled: false, reason: null },
    decomposition_review: { required: decompositionRequired, rationale: decompositionRationale },
    execution_decision: 'NOT_AUTHORIZED',
  };
}

/** Rank only currently executable work; WSJF never overrides readiness or safety gates. */
export function rankReadyQueue(items) {
  if (!Array.isArray(items)) throw new Error('Ready queue items must be an array.');
  const eligible = items.filter(item => item?.ready === true && item?.claimed !== true
    && item?.blocked !== true && item?.conflict !== true && item?.user_decision_required !== true);
  for (const item of eligible) {
    if (!isText(item.id) || !Number.isFinite(item.wsjf) || item.wsjf < 0) {
      throw new Error('Executable items need an ID and calculated WSJF.');
    }
    if (item.manual_priority_override?.enabled && !isText(item.manual_priority_override.reason)) {
      throw new Error(`Manual priority override for ${item.id} needs a reason.`);
    }
  }
  return eligible.sort((a, b) => Number(Boolean(b.manual_priority_override?.enabled))
    - Number(Boolean(a.manual_priority_override?.enabled))
    || b.wsjf - a.wsjf || a.id.localeCompare(b.id)).map(item => ({ id: item.id, wsjf: item.wsjf,
      manual_priority_override: Boolean(item.manual_priority_override?.enabled), reason: item.manual_priority_override?.reason ?? null }));
}
