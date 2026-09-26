import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { loadRegistry } from './module-registry.mjs';
import { validateRuleCatalogue } from './sot-impact.mjs';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const normalize = value => value.replace(/\s+/g, ' ').trim();

export function extractHeadingSection(source, heading) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const level = heading.match(/^(#{1,6}) /)?.[1].length;
  if (!level) throw new Error('Section heading must be a Markdown heading.');
  const headings = [];
  let fence = null;
  for (const [index, line] of lines.entries()) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { char: marker[1][0], length: marker[1].length };
      else if (marker[1][0] === fence.char && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (!fence && line === heading) headings.push(index);
  }
  const matches = headings;
  if (matches.length !== 1) throw new Error('Section heading is missing or ambiguous.');
  const start = matches[0];
  let end = lines.length;
  fence = null;
  for (let i = start + 1; i < lines.length; i++) {
    const marker = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { char: marker[1][0], length: marker[1].length };
      else if (marker[1][0] === fence.char && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;
    const match = lines[i].match(/^(#{1,6}) /);
    if (match && match[1].length <= level) { end = i; break; }
  }
  return lines.slice(start, end).join('\n').trimEnd();
}

export function sectionSha256(section) {
  return createHash('sha256').update(section.replace(/\r\n/g, '\n')).digest('hex');
}

export function sectionSentences(section) {
  return normalize(section.split('\n').slice(1).join(' ')).split(/(?<=[.!?])\s+/).filter(Boolean);
}

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
    try {
      const section = extractHeadingSection(source, rule.anchor);
      if (!normalize(section.split('\n').slice(1).join(' ')).includes(normalize(rule.text))) {
        errors.push(`${rule.id}: cited source text is stale or outside its heading.`);
      }
    } catch {
      errors.push(`${rule.id}: source heading anchor is missing or ambiguous.`);
    }
  }
  for (const item of catalogue.section_coverage ?? []) {
    const source = sourceCache.get(item.source);
    if (!source) continue;
    try {
      const section = extractHeadingSection(source, item.heading);
      if (sectionSha256(section) !== item.section_sha256) errors.push(`${item.section_id}: section SHA-256 is stale.`);
      const sentences = sectionSentences(section);
      const listed = catalogue.rules.filter(rule => rule.section_id === item.section_id && rule.module_id === item.module_id);
      const texts = listed.map(rule => normalize(rule.text));
      if (JSON.stringify([...sentences].sort()) !== JSON.stringify([...texts].sort())) {
        errors.push(`${item.section_id}: section rule inventory is incomplete or wrong.`);
      }
      if (listed.some(rule => rule.anchor !== item.heading || rule.source !== item.source)) {
        errors.push(`${item.section_id}: rule is outside its declared section.`);
      }
    } catch {
      errors.push(`${item.section_id}: section heading is missing or ambiguous.`);
    }
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
    verified_sections: (catalogue.section_coverage ?? []).filter(item => item.scope === 'complete_section').map(item => item.section_id).sort(),
    partial_modules: catalogue.coverage.filter(item => item.scope === 'partial').map(item => item.module_id).sort() };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const registry = await loadRegistry();
  const catalogue = await loadRuleCatalogue();
  const result = await validateRuleCatalogueSources(catalogue, registry);
  console.log(JSON.stringify(result, null, 2));
  if (!result.valid) process.exitCode = 1;
}
