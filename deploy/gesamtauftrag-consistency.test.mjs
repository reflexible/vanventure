import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

test('der konsolidierte Gesamtauftrag ist nur projektlokal verankert und referenziert', () => {
  const agents = read('AGENTS.md');
  const mandate = read('docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md');
  const templates = read('docs/responsive-templates.md');
  const guide = read('docs/design-guide.md');
  const plan = read('docs/ausbauplan.md');

  assert.match(agents, /docs\/vanventure-gesamtauftrag-mit-pruefung-und-freigaben\.md/);
  assert.match(agents, /Local preparation, repository state,[\s\S]*live verification are distinct statuses/);
  assert.match(mandate, /Technische Schutzmaßnahmen/);
  assert.match(mandate, /Nachweismatrix statt pauschaler Selbstauskunft/);
  assert.match(mandate, /Freigabeprozess/);
  assert.match(mandate, /Die Ausnahme betrifft ausschließlich die Vereinheitlichung der Seitenstruktur/);
  assert.match(templates, /konsolidierten Gesamtauftrag/);
  assert.match(guide, /ausdrücklicher\s+Nutzerfreigabe/);
  assert.match(plan, /Prüf-,\s*Originalschutz-, Freigabe- und Abnahmepflichten/);
});
