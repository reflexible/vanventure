import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { isAbsolute } from 'node:path';
import { isDeepStrictEqual } from 'node:util';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const digest = value => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);
const text = value => typeof value === 'string' && value.trim().length > 0;
function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') return Object.fromEntries(Object.keys(value).sort().map(key => [key, canonical(value[key])]));
  return value;
}
/** Stable across lifecycle transitions; all proposed content and scope stay bound. */
export function decisionProposalHash(proposal) {
  if (!proposal || typeof proposal !== 'object' || Array.isArray(proposal)) throw new Error('A proposal object is required.');
  const { status, approval, rejection, supersession, ...proposed } = proposal;
  return sha256(JSON.stringify(canonical(proposed)));
}
const timestamp = value => text(value) && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d+)?(?:Z|[+-]\d\d:\d\d)$/.test(value)
  && Number.isFinite(Date.parse(value));
function validDecisionTime(time) {
  if (time?.precision === 'timestamp') return timestamp(time.value);
  if (time?.precision !== 'date' || !/^\d{4}-\d\d-\d\d$/.test(time.value ?? '')) return false;
  const parsed = Date.parse(time.value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString().slice(0, 10) === time.value;
}

/**
 * Synchronous adapter for decision-state and SoT apply callbacks. Trust roots
 * must be supplied by trusted orchestration, never discovered in project data.
 * A manifest pins an observed user's decision, not a user digital signature.
 * Every invocation rereads both manifest and original bytes; no cached PASS.
 */
export function createUserDecisionVerifier({ trustedImports } = {}) {
  if (!Array.isArray(trustedImports) || !trustedImports.length) throw new Error('Externally trusted import hashes are required.');
  const roots = structuredClone(trustedImports);
  const seen = new Set();
  for (const root of roots) {
    if (!text(root?.manifestPath) || !isAbsolute(root.manifestPath) || !digest(root.sha256)
      || seen.has(root.manifestPath)) throw new Error('Each trusted import needs a unique absolute manifest path and SHA-256.');
    seen.add(root.manifestPath);
  }
  return function verifyUserDecision(request) {
    for (const root of roots) {
      try {
        const raw = readFileSync(root.manifestPath);
        if (sha256(raw) !== root.sha256) continue;
        const manifest = JSON.parse(raw.toString('utf8'));
        const { original, quote, binding } = manifest;
        if (manifest.schema_version !== '1.0.0' || !timestamp(manifest.captured_at)
          || !validDecisionTime(manifest.decision_time) || !text(original?.path) || !isAbsolute(original.path)
          || !digest(original.sha256) || !text(original.reference)
          || original.author?.role !== 'USER' || !text(original.author.id)) continue;
        if (!text(binding?.proposalId) || !digest(binding.proposal_sha256) || !['APPROVE', 'REJECT', 'SUPERSEDE'].includes(binding.action)
          || !isDeepStrictEqual(binding.actor, { role: 'USER', id: original.author.id })
          || binding.evidence?.scope !== binding.proposalId
          || !text(binding.evidence?.wording) || binding.evidence.wording !== quote?.text
          || binding.evidence.decided_at !== manifest.decision_time.value
          || (manifest.decision_time.precision === 'date' ? binding.evidence.date_precision !== 'date'
            : binding.evidence.date_precision !== undefined && binding.evidence.date_precision !== 'timestamp')
          || !text(binding.evidence.reference) || !binding.evidence.reference.startsWith(`${original.reference}#`)
          || !/^[^\s#]+#[^\s#]+$/.test(binding.evidence.reference)
          || !Object.hasOwn(binding, 'decision') || !isDeepStrictEqual(request, binding)) continue;
        if (!Number.isSafeInteger(quote?.byte_offset) || quote.byte_offset < 0 || !text(quote.text)) continue;
        const bytes = readFileSync(original.path);
        const quotedBytes = Buffer.from(quote.text, 'utf8');
        if (sha256(bytes) !== original.sha256
          || !bytes.subarray(quote.byte_offset, quote.byte_offset + quotedBytes.length).equals(quotedBytes)) continue;
        // Catch normal concurrent replacement during the verification window.
        if (!readFileSync(root.manifestPath).equals(raw) || !readFileSync(original.path).equals(bytes)) continue;
        return true;
      } catch { /* Missing, malformed, stale or unreadable evidence fails closed. */ }
    }
    return false;
  };
}
