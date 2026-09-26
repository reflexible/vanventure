import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { loadRegistry } from './module-registry.mjs';
import { validateRuleCatalogue } from './sot-impact.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const normalize = value => value.replace(/\s+/g, ' ').trim();

export async function loadRuleCatalogue(path = resolve(projectRoot, 'docs/governance/rule-catalogue.json')) {
  return JSON.parse(await readFile(path, 'utf8'));
}

/** Verify cited text in the exact heading's body, never by a loose whole-file search. */
export async function validateRuleCatalogueSources(catalogue, registry, root = projectRoot) {
  const shape = validateRuleCatalogue(catalogue, registry);
  if (!shape.valid) return shape;
  const errors = [];
  const sourceCache = new Map();
  for (const module of registry.modules) {
    try {
      sourceCache.set(module.source, await readFile(resolve(root, module.source), 'utf8'));
    } catch (error) {
      errors.push(`${module.module_id}: registered source cannot be read (${error.code ?? error.message}).`);
    }
  }
  for (const rule of catalogue.rules) {
    const source = sourceCache.get(rule.source);
    if (!source) continue;
    const lines = source.replace(/\r\n/g, '\n').split('\n');
    const anchorLines = lines.flatMap((line, index) => line === rule.anchor ? [index] : []);
    if (anchorLines.length !== 1 || !/^#{1,6} /.test(rule.anchor)) {
      errors.push(`${rule.id}: source heading anchor is missing or ambiguous.`);
      continue;
    }
    const following = lines.slice(anchorLines[0] + 1);
    const nextHeading = following.findIndex(line => /^#{1,6} /.test(line));
    const section = normalize((nextHeading < 0 ? following : following.slice(0, nextHeading)).join(' '));
    if (!section.includes(normalize(rule.text))) errors.push(`${rule.id}: cited source text is stale or outside its heading.`);
  }
  const counts = new Map();
  for (const rule of catalogue.rules) counts.set(rule.module_id, (counts.get(rule.module_id) ?? 0) + 1);
  for (const item of catalogue.coverage) {
    if (item.mapped_rule_count !== (counts.get(item.module_id) ?? 0)) errors.push(`${item.module_id}: mapped rule count is stale.`);
    if (item.scope === 'partial' && (typeof item.remaining !== 'string' || !item.remaining.trim())) {
      errors.push(`${item.module_id}: partial coverage needs explicit remaining unknowns.`);
    }
    if (item.scope === 'complete') errors.push(`${item.module_id}: complete coverage requires a separate exhaustive inventory and cannot be inferred here.`);
  }
  for (const module of registry.modules.filter(module => module.status === 'active_reference')) {
    if (!catalogue.coverage.some(item => item.module_id === module.module_id)) {
      errors.push(`${module.module_id}: active module has no coverage declaration.`);
    }
  }
  return { valid: errors.length === 0, errors, mapped_rules: catalogue.rules.length,
    partial_modules: catalogue.coverage.filter(item => item.scope === 'partial').map(item => item.module_id).sort() };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const registry = await loadRegistry();
  const catalogue = await loadRuleCatalogue();
  const result = await validateRuleCatalogueSources(catalogue, registry);
  console.log(JSON.stringify(result, null, 2));
  if (!result.valid) process.exitCode = 1;
}
