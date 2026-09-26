import { readFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { WSJF_SCALE } from './wsjf.mjs';

const FACTORS = Object.freeze({ technical_risk_reduction: 4, security_risk_reduction: 5, privacy_risk_reduction: 5, vendor_lock_in_reduction: 3, architecture_stability: 3, assumption_validation: 2, downstream_enablement: 4, reusable_capability: 3, product_opportunity: 3, future_effort_reduction: 3, shared_infrastructure: 3 });
const RELEVANCE = Object.freeze({ Low: 0.4, Medium: 0.7, High: 1 });
const text = value => typeof value === 'string' && value.trim().length > 0;
const timestamp = value => text(value) && Number.isFinite(Date.parse(value)) && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value);
const scale = raw => raw <= 1 ? 1 : raw <= 3 ? 2 : raw <= 5 ? 3 : raw <= 8 ? 5 : raw <= 12 ? 8 : raw <= 16 ? 13 : 20;
function within(root, path) { const rel = relative(root, path); return rel && !rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel); }

/** Produce a verifiable, non-authorizing Risk Reduction / Opportunity Enablement proposal. */
export async function proposeRiskOpportunity(input) {
  const errors = [];
  if (!timestamp(input?.evaluated_at)) errors.push('evaluated_at must be an ISO timestamp with timezone.');
  if (!text(input?.story?.id) || !text(input?.story?.title) || !text(input?.story?.user_story)) errors.push('story needs id, title and user_story.');
  if (!text(input?.project_root)) errors.push('project_root is required.');
  if (!Array.isArray(input?.evidence) || !input.evidence.length) errors.push('At least one evidence item is required.');
  if (input?.score !== undefined || input?.manual_score !== undefined) errors.push('Risk Reduction / Opportunity Enablement is proposed from evidence and cannot be manually supplied.');
  if (errors.length) return { valid: false, errors, result: null };
  let root; try { root = await realpath(resolve(input.project_root)); } catch { return { valid: false, errors: ['project_root must exist.'], result: null }; }
  const seen = new Set(), verified = [];
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
    try { const source = await realpath(resolve(root, item.source_ref)); if (!within(root, source)) throw new Error('outside'); const content = await readFile(source, 'utf8'); if (!content.includes(item.excerpt)) throw new Error('excerpt'); verified.push({ factor:item.factor, relevance:item.relevance, source_ref:relative(root,source).split(sep).join('/'), source_sha256:createHash('sha256').update(content,'utf8').digest('hex'), excerpt_sha256:createHash('sha256').update(item.excerpt,'utf8').digest('hex') }); } catch { errors.push(`Evidence source or excerpt cannot be verified: ${item.source_ref}.`); }
  }
  if (errors.length) return { valid:false, errors, result:null };
  const strongest = new Map(); for (const item of verified) { const prior=strongest.get(item.factor); if (!prior || RELEVANCE[item.relevance]>RELEVANCE[prior.relevance]) strongest.set(item.factor,item); }
  const raw=[...strongest.values()].reduce((total,item)=>total+FACTORS[item.factor]*RELEVANCE[item.relevance],0);
  const confidence=strongest.size>=3&&verified.length>=3?'High':strongest.size>=2?'Medium':'Low';
  const proposal={score:scale(raw),confidence,rationale:`Evidence-backed proposal from ${[...strongest.keys()].sort().join(', ')} across ${verified.length} verified project source${verified.length===1?'':'s'}.`};
  if(confidence==='Low') proposal.uncertainty={missing_information:'Evidence covers fewer than two Risk Reduction / Opportunity Enablement factors.',uncertain_assumption:'The available project evidence may not represent the full technical or product opportunity.',unanalyzed_area:'Risk, security, privacy, dependencies and downstream enablement need further project evidence.'};
  return {valid:true,errors:[],result:{evaluated_at:input.evaluated_at,risk_reduction_opportunity_enablement:structuredClone(proposal),proposal:structuredClone(proposal),evidence:verified,execution_decision:'NOT_AUTHORIZED',persistence_decision:'NOT_AUTHORIZED'}};
}
