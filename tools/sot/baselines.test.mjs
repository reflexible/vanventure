import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
  compareToBaseline, defaultBaselinesPath, loadBaselines, normalizedTextSha256,
  semanticManifestSha256, sha256, validateBaseline, verifyRecovery,
} from './baselines.mjs';

async function golden() {
  return (await loadBaselines()).baselines[0];
}

test('pinned FINAL_AUDIT_PASS ref restores the exact LF blob and audited CRLF bytes', async () => {
  const baseline = await golden();
  assert.deepEqual(verifyRecovery(baseline), { valid: true, errors: [] });
  assert.equal(baseline.recovery.ref, 'refs/tags/golden-scrum-final-audit-pass-2026-09-26');
  assert.equal(baseline.recovery.commit, '4a0708e46a2c2b604ee08255328dabfb9e4832d7');
  assert.equal(baseline.checkout.byte_sha256, '9ec3dbc2b1c09208580c267b683693285ee5dca609bc736243ba6a0bbe52eab2');
});

test('CRLF and LF have different byte hashes but equal normalized-text hashes', () => {
  const lf = Buffer.from('A\nB\n');
  const crlf = Buffer.from('A\r\nB\r\n');
  assert.notEqual(sha256(lf), sha256(crlf));
  assert.equal(normalizedTextSha256(lf), normalizedTextSha256(crlf));
  const baseline = { byte_sha256: sha256(lf), normalized_text_sha256: normalizedTextSha256(lf) };
  assert.deepEqual(compareToBaseline(baseline, crlf), {
    byte_match: false,
    normalized_text_match: true,
    semantic_manifest_match: null,
    classification: 'FORMAT_ONLY',
  });
});

test('semantic result needs an explicit manifest; manifest content changes are detected', async () => {
  const baseline = await golden();
  const same = structuredClone(baseline.semantic_manifest);
  const changed = structuredClone(same);
  changed.requirements[0].rule += ' Changed.';
  assert.equal(semanticManifestSha256(same), baseline.semantic_manifest_sha256);
  assert.notEqual(semanticManifestSha256(changed), baseline.semantic_manifest_sha256);
  const bytes = Buffer.from('changed text');
  assert.equal(compareToBaseline(baseline, bytes).classification, 'TEXT_CHANGED_SEMANTICS_UNVERIFIED');
  assert.equal(compareToBaseline(baseline, bytes, same).classification, 'TEXT_CHANGED_MANIFEST_UNCHANGED');
  assert.equal(compareToBaseline(baseline, bytes, changed).classification, 'SEMANTIC_MANIFEST_CHANGED');
});

test('invalid or missing provenance and recovery references fail closed', async () => {
  const baseline = await golden();
  const missing = structuredClone(baseline);
  delete missing.provenance;
  assert.match(validateBaseline(missing).join(' '), /provenance/);
  const wrongCommit = structuredClone(baseline);
  wrongCommit.recovery.commit = '0'.repeat(40);
  assert.match(validateBaseline(wrongCommit).join(' '), /recovery/);
  const wrongRef = structuredClone(baseline);
  wrongRef.recovery.ref = 'refs/tags/does-not-exist';
  assert.equal(verifyRecovery(wrongRef).valid, false);
  const wrongReport = structuredClone(baseline);
  wrongReport.provenance.audit_report = 'docs/missing-audit.md';
  assert.equal(verifyRecovery(wrongReport).valid, false);
  const changedHash = structuredClone(baseline);
  changedHash.byte_sha256 = '0'.repeat(64);
  assert.match(verifyRecovery(changedHash).errors.join(' '), /Recovered bytes differ/);
});

test('checked-in store remains append-only in intent and references a Git audit, not the mutable checkout', async () => {
  const raw = JSON.parse(await readFile(defaultBaselinesPath, 'utf8'));
  assert.equal(raw.baselines.length, 1);
  assert.equal(raw.baselines[0].provenance.audit_result, 'FINAL_AUDIT_PASS');
  assert.notEqual(raw.baselines[0].recovery.ref, 'HEAD');
  assert.ok((await loadBaselines()).baselines[0]);
});
