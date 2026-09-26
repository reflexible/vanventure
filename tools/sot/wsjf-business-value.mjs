import { readFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { WSJF_SCALE } from './wsjf.mjs';

const FACTORS = Object.freeze({
  user_benefit: 4,
  usage_frequency: 2,
  central_workflow: 4,
  customer_impact: 3,
  project_goal: 2,
  problem_removal: 2,
  capability_enablement: 3,
});
const RELEVANCE = Object.freeze({ Low: 0.4, Medium: 0.7, High: 1 });
const text = value => typeof value === 'string' && value.trim().length > 0;
const timestamp = value => text(value) && Number.isFinite(Date.parse(value))
  && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value);

function componentValid(value) {
  return WSJF_SCALE.includes(value?.score) && text(value?.rationale)
    && ['High', 'Medium', 'Low'].includes(value?.confidence);
}

function scale(raw) {
  if (raw <= 1) return 1;
  if (raw <= 3) return 2;
  if (raw <= 5) return 3;
  if (raw <= 8) return 5;
  if (raw <= 12) return 8;
  if (raw <= 16) return 13;
  return 20;
}

function insideRoot(root, path) {
  const rel = relative(root, path);
  return rel && !rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel);
}

/**
 * Produce a non-authorizing Business-Value suggestion from verifiable project evidence.
 * It neither persists a result nor confirms, overrides, claims, ranks or starts work.
 */
export async function proposeBusinessValue(input) {
  const errors = [];
  if (!timestamp(input?.evaluated_at)) errors.push('evaluated_at must be an ISO timestamp with timezone.');
  if (!text(input?.story?.id) || !text(input?.story?.title) || !text(input?.story?.user_story)
      || !text(input?.story?.value_description)) {
    errors.push('story needs id, title, user_story and value_description.');
  }
  if (!text(input?.project_root)) errors.push('project_root is required.');
  if (!Array.isArray(input?.evidence) || input.evidence.length === 0) errors.push('At least one evidence item is required.');
  if (input?.score !== undefined || input?.manual_score !== undefined) errors.push('Business Value is proposed from evidence and cannot be manually supplied.');
  const protectedValue = input?.existing_business_value;
  const protectedStatus = input?.existing_value_status;
  if (protectedValue !== undefined && !componentValid(protectedValue)) errors.push('existing_business_value must be a valid WSJF component.');
  if (protectedStatus !== undefined && !['Confirmed', 'Overridden'].includes(protectedStatus)) {
    errors.push('existing_value_status must be Confirmed or Overridden when supplied.');
  }
  if ((protectedValue === undefined) !== (protectedStatus === undefined)) {
    errors.push('existing_business_value and existing_value_status must be supplied together.');
  }
  if (errors.length) return { valid: false, errors, result: null };

  let root;
  try { root = await realpath(resolve(input.project_root)); } catch { return { valid: false, errors: ['project_root must exist.'], result: null }; }
  const seen = new Set();
  const verified = [];
  for (const item of input.evidence) {
    if (!Object.hasOwn(FACTORS, item?.factor)) errors.push(`Unsupported evidence factor: ${item?.factor ?? 'missing'}.`);
    if (!Object.hasOwn(RELEVANCE, item?.relevance)) errors.push(`Evidence relevance must be Low, Medium or High: ${item?.factor ?? 'missing'}.`);
    if (!text(item?.source_ref) || isAbsolute(item.source_ref)) errors.push('evidence.source_ref must be a project-relative path.');
    if (!text(item?.excerpt)) errors.push('evidence.excerpt is required.');
    if (item?.score !== undefined || item?.suggested_score !== undefined) errors.push('Evidence may not supply a score.');
    if (errors.length) continue;
    const key = `${item.factor}\u0000${item.source_ref}\u0000${item.excerpt}`;
    if (seen.has(key)) { errors.push('Duplicate evidence is not allowed.'); continue; }
    seen.add(key);
    let source;
    try {
      source = await realpath(resolve(root, item.source_ref));
      if (!insideRoot(root, source)) throw new Error('outside');
      const content = await readFile(source, 'utf8');
      if (!content.includes(item.excerpt)) throw new Error('excerpt');
      verified.push({ factor: item.factor, relevance: item.relevance,
        source_ref: relative(root, source).split(sep).join('/'),
        source_sha256: createHash('sha256').update(content, 'utf8').digest('hex'),
        excerpt_sha256: createHash('sha256').update(item.excerpt, 'utf8').digest('hex') });
    } catch {
      errors.push(`Evidence source or excerpt cannot be verified: ${item.source_ref}.`);
    }
  }
  if (errors.length) return { valid: false, errors, result: null };

  const strongest = new Map();
  for (const item of verified) {
    const prior = strongest.get(item.factor);
    if (!prior || RELEVANCE[item.relevance] > RELEVANCE[prior.relevance]) strongest.set(item.factor, item);
  }
  const raw = [...strongest.values()].reduce((total, item) => total + FACTORS[item.factor] * RELEVANCE[item.relevance], 0);
  const confidence = strongest.size >= 3 && verified.length >= 3 ? 'High' : strongest.size >= 2 ? 'Medium' : 'Low';
  const factors = [...strongest.keys()].sort();
  const proposed = { score: scale(raw), confidence,
    rationale: `Evidence-backed proposal from ${factors.join(', ')} across ${verified.length} verified project source${verified.length === 1 ? '' : 's'}.` };
  if (confidence === 'Low') proposed.uncertainty = {
    missing_information: 'Evidence covers fewer than two Business-Value factors.',
    uncertain_assumption: 'The available project evidence may not represent actual user or customer impact.',
    unanalyzed_area: 'Usage frequency, central workflow and customer impact need further project evidence.',
  };
  const result = { evaluated_at: input.evaluated_at, value_status: protectedStatus ?? 'Proposed',
    user_business_value: structuredClone(protectedValue ?? proposed),
    suggested_user_business_value: protectedValue ? structuredClone(proposed) : null,
    proposal: structuredClone(proposed), evidence: verified,
    execution_decision: 'NOT_AUTHORIZED', persistence_decision: 'NOT_AUTHORIZED' };
  return { valid: true, errors: [], result };
}
