import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultBaselinesPath = resolve(repositoryRoot, 'docs/governance/baselines.json');
const SHA256 = /^[a-f0-9]{64}$/;
const OID = /^[a-f0-9]{40}$/;
const VERSION = /^\d+\.\d+\.\d+$/;
const REF = /^refs\/(?:tags|heads)\/[A-Za-z0-9][A-Za-z0-9._/-]*$/;

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function normalizeText(bytes) {
  const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
  // Only line-ending normalization is allowed. Whitespace, wording and order stay intact.
  return text.replace(/\r\n/g, '\n');
}

export function normalizedTextSha256(bytes) {
  return sha256(Buffer.from(normalizeText(bytes), 'utf8'));
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function semanticManifestSha256(manifest) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    throw new Error('An explicit semantic manifest object is required.');
  }
  return sha256(Buffer.from(canonical(manifest), 'utf8'));
}

function withinRoot(root, path) {
  if (typeof path !== 'string' || !path || isAbsolute(path) || path.includes('\\') || path.includes(':')) return false;
  const rel = relative(root, resolve(root, path));
  return !!rel && rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}

function git(root, args, encoding = 'utf8') {
  const result = spawnSync('git', args, { cwd: root, encoding, maxBuffer: 32 * 1024 * 1024 });
  if (result.error || result.status !== 0) {
    throw new Error(`Git recovery failed for ${args[0]}: ${result.error?.message ?? String(result.stderr).trim()}`);
  }
  return result.stdout;
}

export function validateBaseline(baseline, { projectRoot = repositoryRoot } = {}) {
  const errors = [];
  if (!baseline || typeof baseline !== 'object' || Array.isArray(baseline)) return ['Baseline must be an object.'];
  if (!VERSION.test(baseline.version ?? '')) errors.push('version must be semantic versioning.');
  if (!withinRoot(projectRoot, baseline.source)) errors.push('source must be a repository-relative file.');
  if (!SHA256.test(baseline.byte_sha256 ?? '')) errors.push('byte_sha256 is invalid.');
  if (!SHA256.test(baseline.normalized_text_sha256 ?? '')) errors.push('normalized_text_sha256 is invalid.');
  if (baseline.checkout && (baseline.checkout.line_endings !== 'CRLF' || !SHA256.test(baseline.checkout.byte_sha256 ?? ''))) {
    errors.push('checkout requires CRLF line endings and a SHA-256.');
  }
  if (!baseline.semantic_manifest || typeof baseline.semantic_manifest !== 'object' || Array.isArray(baseline.semantic_manifest)
    || !Array.isArray(baseline.semantic_manifest.requirements) || baseline.semantic_manifest.requirements.length === 0) {
    errors.push('semantic_manifest requires explicit requirements.');
  } else if (new Set(baseline.semantic_manifest.requirements.map(item => item.id)).size !== baseline.semantic_manifest.requirements.length
    || baseline.semantic_manifest.requirements.some(item => !item || typeof item.id !== 'string' || !item.id || typeof item.rule !== 'string' || !item.rule)) {
    errors.push('semantic_manifest requirements need unique IDs and rule text.');
  }
  if (!SHA256.test(baseline.semantic_manifest_sha256 ?? '')
    || (baseline.semantic_manifest && semanticManifestSha256(baseline.semantic_manifest) !== baseline.semantic_manifest_sha256)) {
    errors.push('semantic_manifest_sha256 does not match the explicit manifest.');
  }
  const p = baseline.provenance;
  if (!p || !OID.test(p.audit_commit ?? '') || !OID.test(p.git_blob_oid ?? '')
    || !withinRoot(projectRoot, p.audit_report) || p.audit_result !== 'FINAL_AUDIT_PASS') {
    errors.push('provenance must identify the audit commit, blob, report and FINAL_AUDIT_PASS.');
  }
  const r = baseline.recovery;
  if (!r || !REF.test(r.ref ?? '') || !OID.test(r.commit ?? '') || !withinRoot(projectRoot, r.path)
    || (p && r.commit !== p.audit_commit) || r.path !== baseline.source) {
    errors.push('recovery requires a pinned Git ref, matching audit commit and source path.');
  }
  return errors;
}

/** Read only: verifies the pinned audit ref, blob and bytes without touching the checkout. */
export function verifyRecovery(baseline, { projectRoot = repositoryRoot } = {}) {
  const errors = validateBaseline(baseline, { projectRoot });
  if (errors.length) return { valid: false, errors };
  try {
    const commit = git(projectRoot, ['rev-parse', `${baseline.recovery.ref}^{commit}`]).trim();
    if (commit !== baseline.recovery.commit) errors.push('Recovery ref no longer points to the pinned audit commit.');
    const blob = git(projectRoot, ['rev-parse', `${baseline.recovery.commit}:${baseline.recovery.path}`]).trim();
    if (blob !== baseline.provenance.git_blob_oid) errors.push('Audit blob OID differs from provenance.');
    const report = git(projectRoot, ['show', `${baseline.recovery.commit}:${baseline.provenance.audit_report}`]);
    if (!report.includes(baseline.provenance.audit_result)) errors.push('Pinned audit report does not contain the stated result.');
    const bytes = git(projectRoot, ['show', `${baseline.recovery.commit}:${baseline.recovery.path}`], null);
    if (sha256(bytes) !== baseline.byte_sha256) errors.push('Recovered bytes differ from byte_sha256.');
    if (normalizedTextSha256(bytes) !== baseline.normalized_text_sha256) errors.push('Recovered normalized text differs from baseline.');
    if (baseline.checkout) {
      const crlf = Buffer.from(normalizeText(bytes).replace(/\n/g, '\r\n'), 'utf8');
      if (sha256(crlf) !== baseline.checkout.byte_sha256) errors.push('Recovered CRLF checkout differs from audited checkout SHA-256.');
    }
  } catch (error) {
    errors.push(error.message);
  }
  return { valid: errors.length === 0, errors };
}

/** Semantic comparison is explicit. Without a supplied manifest its result stays unknown. */
export function compareToBaseline(baseline, bytes, currentManifest = null) {
  const byteMatch = sha256(bytes) === baseline.byte_sha256;
  const textMatch = normalizedTextSha256(bytes) === baseline.normalized_text_sha256;
  const semanticMatch = currentManifest === null ? null
    : semanticManifestSha256(currentManifest) === baseline.semantic_manifest_sha256;
  return {
    byte_match: byteMatch,
    normalized_text_match: textMatch,
    semantic_manifest_match: semanticMatch,
    classification: semanticMatch === false ? 'SEMANTIC_MANIFEST_CHANGED'
      : byteMatch ? 'UNCHANGED_BYTES'
        : textMatch ? 'FORMAT_ONLY'
          : semanticMatch === true ? 'TEXT_CHANGED_MANIFEST_UNCHANGED'
            : 'TEXT_CHANGED_SEMANTICS_UNVERIFIED',
  };
}

export async function loadBaselines(path = defaultBaselinesPath, { projectRoot = repositoryRoot } = {}) {
  const store = JSON.parse(await readFile(path, 'utf8'));
  if (store.schema_version !== '1.0.0' || !Array.isArray(store.baselines)) throw new Error('Invalid baseline store schema.');
  const ids = new Set();
  for (const baseline of store.baselines) {
    if (typeof baseline.id !== 'string' || !baseline.id || ids.has(baseline.id)) throw new Error('Missing or duplicate baseline ID.');
    ids.add(baseline.id);
    const errors = validateBaseline(baseline, { projectRoot });
    if (errors.length) throw new Error(`Invalid baseline ${baseline.id}: ${errors.join(' ')}`);
  }
  return store;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const store = await loadBaselines();
    for (const baseline of store.baselines) {
      const result = verifyRecovery(baseline);
      if (!result.valid) throw new Error(`${baseline.id}: ${result.errors.join(' ')}`);
      process.stdout.write(`${baseline.id}: recovery verified at ${baseline.recovery.commit}.\n`);
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
