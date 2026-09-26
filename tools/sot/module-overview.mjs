import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defaultRegistryPath, loadRegistry } from './module-registry.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const defaultOverviewPath = resolve(projectRoot, 'docs/governance/module-overview.generated.md');

const cell = value => String(value).replaceAll('|', '\\|');
const list = values => values.length ? values.map(cell).join(', ') : '—';
const role = module => module.status === 'scoped_reference'
  ? `Core-Referenz (${cell(module.owner_module)})`
  : 'Fachautorität';
const key = module => module.status === 'scoped_reference'
  ? `Referenz: ${cell(module.reference_key)}`
  : cell(module.authority);
const sourceLink = source => {
  if (source.startsWith('docs/governance/')) return source.slice('docs/governance/'.length);
  if (source.startsWith('docs/')) return `../${source.slice('docs/'.length)}`;
  return `../../${source}`;
};

/** Render a derived index only; every rule and status remains in its source. */
export function renderModuleOverview(registry) {
  const rows = registry.modules.map(module => [
    `\`${cell(module.module_id)}\``,
    role(module),
    key(module),
    `[${cell(module.source)}](${sourceLink(cell(module.source))})`,
    list(module.dependencies),
    list(module.contracts),
  ]);
  return [
    '<!-- GENERATED FILE: edit docs/governance/module-registry.json, then regenerate with tools/sot/module-overview.mjs. -->',
    '# Generierte Gesamtansicht der Module',
    '',
    '**Status:** `DERIVED_INDEX_ONLY` · Quelle: [`module-registry.json`](module-registry.json).',
    '',
    'Diese Ansicht ist ein schreibgeschützter Index. Sie enthält keine Regeln,',
    'keinen Backlog und keine Freigaben. Maßgeblich bleiben ausschließlich die',
    'jeweils verlinkten Quellen; `scoped_reference`-Einträge sind ausdrücklich',
    'keine Fachautoritäten.',
    '',
    '| Modul | Rolle | Authority-/Referenzschlüssel | Quelle | Abhängigkeiten | Contracts |',
    '| --- | --- | --- | --- | --- | --- |',
    ...rows.map(row => `| ${row.join(' | ')} |`),
    '',
    `*Generiert aus ${registry.modules.length} Registry-Einträgen. Der Generator prüft diese Datei mit \`--check\`; eine Abweichung ist kein neuer Regelstand.*`,
    '',
  ].join('\n');
}

export async function verifyModuleOverview({ registryPath = defaultRegistryPath, overviewPath = defaultOverviewPath } = {}) {
  const registry = await loadRegistry(registryPath);
  const expected = renderModuleOverview(registry);
  const actual = await readFile(overviewPath, 'utf8');
  if (actual !== expected) throw new Error('Module overview is stale; regenerate it from module-registry.json.');
  return { moduleCount: registry.modules.length, overviewPath };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (process.argv.includes('--print')) {
      process.stdout.write(renderModuleOverview(await loadRegistry()));
    } else {
      const result = await verifyModuleOverview();
      process.stdout.write(`Module overview valid: ${result.moduleCount} modules.\n`);
    }
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
