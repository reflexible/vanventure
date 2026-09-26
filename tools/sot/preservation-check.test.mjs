import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { parseTraceCsv } from './project-traceability.mjs';
import { mapPreservationRows, verifySotPreservation } from './preservation-check.mjs';

test('all 45 preserved SoT clauses have a bounded implementation and behavioural test mapping', async () => {
  const rows = parseTraceCsv(await readFile('docs/sot-optimization/sot-preservation-matrix.csv', 'utf8'));
  const result = mapPreservationRows(rows);
  assert.equal(result.valid, true, result.errors.join('; '));
  assert.equal(result.records.length, 45);
  assert.ok(result.records.every(record => record.implementation.length && record.tests.length));
  assert.ok(result.records.every(record => record.semantic_verification === 'PENDING_SEPARATE_REVIEW'));
});

test('missing or unknown target mappings fail closed', () => {
  const invalid = mapPreservationRows([{ source_section: 'SOT-01', clause_id: 'SOT-01.a', source_lines: '1', requirement: 'x', target_story: 'ST-SOT-99' }]);
  assert.equal(invalid.valid, false);
  assert.match(invalid.errors.join(';'), /EXPECTED_45|UNMAPPED_IMPLEMENTATION_TARGET/);
});

test('the local preservation report records evidence without claiming semantic or live acceptance', async () => {
  const result = await verifySotPreservation({ execute: false });
  assert.equal(result.status, 'SOT_PRESERVATION_PASS', result.errors.join('; '));
  assert.equal(result.semantic_coverage, 'PENDING_SEPARATE_REVIEW');
  assert.equal(result.product_release, false);
  assert.equal(result.live_verified, false);
});
