import { readFile } from 'node:fs/promises';
import { resolve, isAbsolute } from 'node:path';
import { createHash } from 'node:crypto';
import { extractHeadingSection } from './rule-catalogue.mjs';

const prefix = 'docs/sot-optimization/';
const files = {
  index: `${prefix}requirements-section-index.csv`,
  sot: `${prefix}sot-preservation-matrix.csv`,
  wsjf: `${prefix}wsjf-preservation-matrix.csv`,
  SOT: `${prefix}sources/sot-process-input-2026-09-26.md`,
  WSJF: `${prefix}sources/wsjf-multi-agent-input-2026-09-26.md`,
  mandate: `${prefix}sources/full-implementation-input-2026-09-26.txt`,
  backlog: 'docs/governance/source-of-truth-and-incremental-planning.md',
};
const hash = value => createHash('sha256').update(value).digest('hex');
const normalize = section => section.replace(/\r\n/g, '\n').trim() + '\n';

export function parseTraceCsv(source) {
  const rows = []; let row = []; let field = ''; let quoted = false; let closed = false;
  for (let i = 0; i < source.length; i++) {
    const c = source[i];
    if (quoted) {
      if (c === '"' && source[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else field += c;
    } else if (c === '"') {
      if (field || closed) throw new Error('INVALID_CSV_QUOTE');
      quoted = true;
    } else if (c === ',' || c === '\n' || c === '\r') {
      if (c === '\r' && source[i + 1] === '\n') i++;
      row.push(field); field = ''; closed = false;
      if (c !== ',') { if (row.some(Boolean)) rows.push(row); row = []; }
    } else {
      if (closed) throw new Error('INVALID_CSV_AFTER_QUOTE');
      field += c;
    }
  }
  if (quoted) throw new Error('UNTERMINATED_CSV_FIELD');
  if (field || row.length) { row.push(field); rows.push(row); }
  const headers = rows.shift();
  if (headers?.length) headers[0] = headers[0].replace(/^\uFEFF/, '');
  if (!headers?.length || headers.some(header => !header) || new Set(headers).size !== headers.length) throw new Error('INVALID_CSV_HEADERS');
  return rows.map(values => {
    if (values.length !== headers.length) throw new Error('INVALID_CSV_WIDTH');
    return Object.fromEntries(headers.map((key, i) => [key, values[i]]));
  });
}

function targets(value) {
  if (/^ST-SOT-\d{2}$/.test(value)) return [value];
  const range = /^ST-SOT-(\d{2})\.\.(\d{2})$/.exec(value);
  if (!range || +range[2] < +range[1]) throw new Error(`UNSUPPORTED_STORY_MAPPING:${value}`);
  return Array.from({ length: +range[2] - +range[1] + 1 }, (_, i) => `ST-SOT-${String(+range[1] + i).padStart(2, '0')}`);
}

/** Read-only ancestry adapter. Existing matrices map clauses to stories, not to individual tasks.
 * PASS means exact source/section/line and ancestry references validated, never clause satisfaction.
 */
export async function inspectProjectTraceability({ projectRoot, workItemIds }) {
  const errors = []; const unknowns = []; const sourcehashes = {}; const traceability_records = []; const coverage = [];
  const result = () => ({ status: errors.length ? 'PROJECT_TRACEABILITY_BLOCKED' : 'PROJECT_TRACEABILITY_PASS',
    errors, unknowns, sourcehashes, traceability_records, coverage, semantic_coverage: 'UNKNOWN',
    implementation_coverage: 'UNKNOWN', module_certification: false });
  if (!isAbsolute(projectRoot ?? '') || !Array.isArray(workItemIds) || !workItemIds.length
      || new Set(workItemIds).size !== workItemIds.length || workItemIds.some(id => !/^WI-SOT-\d{2}-\d{2}$/.test(id))) {
    errors.push('ABSOLUTE_ROOT_AND_UNIQUE_WORK_ITEM_IDS_REQUIRED'); return result();
  }
  try {
    const snapshots = {};
    for (const path of Object.values(files)) {
      const bytes = await readFile(resolve(projectRoot, path));
      const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      snapshots[path] = decoded.replace(/^\uFEFF/, ''); sourcehashes[path] = hash(bytes);
    }
    const index = parseTraceCsv(snapshots[files.index]);
    if (sourcehashes[files.mandate] !== '00be5bfc1af9ad51cdcab2fab5475fb2df78c7342ce94769bb78bbe0d7f5d127') {
      throw new Error('ORIGINAL_IMPLEMENTATION_MANDATE_CHANGED');
    }
    const phases = new Map();
    for (const [line, content] of snapshots[files.mandate].split(/\r?\n/).entries()) {
      const match = /^PHASE (\d{1,2}) [\u2013-] (.+)$/.exec(content);
      if (!match) continue;
      const id = `ST-SOT-${match[1].padStart(2, '0')}`;
      if (phases.has(id)) throw new Error(`DUPLICATE_MANDATE_PHASE:${id}`);
      phases.set(id, { anchor: content, line: line + 1 });
    }
    const clauses = [ ...parseTraceCsv(snapshots[files.sot]).map(row => ({ ...row, source: 'SOT' })),
      ...parseTraceCsv(snapshots[files.wsjf]).map(row => ({ ...row, source: 'WSJF' })) ];
    for (const [rows, key] of [[index, 'section_id'], [clauses, 'clause_id']]) {
      const ids = rows.map(row => row[key]);
      if (ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error(`MISSING_OR_DUPLICATE_${key}`);
    }
    const backlog = snapshots[files.backlog]; const items = new Map(); let story = null;
    const stories = new Set(); let fenced = false;
    for (const line of backlog.split(/\r?\n/)) {
      if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
      if (fenced) continue;
      const heading = /^#### (ST-SOT-\d{2})\b/.exec(line);
      if (heading) { story = heading[1]; if (stories.has(story)) throw new Error(`DUPLICATE_STORY:${story}`); stories.add(story); }
      const item = /^- \[(?: |x)\] (?:~~)?(?:(?:TODO|READY|IN_PROGRESS|BLOCKED|DONE)\s*[\u2013-]?\s*)?(WI-SOT-\d{2}-\d{2})\b/.exec(line);
      if (item) {
        if (!story || items.has(item[1])) throw new Error(`MISSING_OR_DUPLICATE_PARENT:${item[1]}`);
        items.set(item[1], story);
      }
    }
    const mapped = clauses.map(clause => ({ ...clause, stories: targets(clause.target_story) }));
    for (const id of workItemIds) {
      const parent = items.get(id);
      if (!parent || parent !== `ST-SOT-${id.split('-')[2]}`) { errors.push(`MISSING_OR_WRONG_WORK_ITEM_PARENT:${id}`); continue; }
      const phase = phases.get(parent);
      if (!phase) { errors.push(`NO_ORIGINAL_IMPLEMENTATION_PHASE:${parent}`); continue; }
      traceability_records.push({ work_item_id: id, source_ref: files.mandate, source_anchor: phase.anchor,
        target_ref: files.backlog, story_id: parent, mapping_granularity: 'STORY',
        ancestry_kind: 'ORIGINAL_IMPLEMENTATION_PHASE', source_line_ranges: [[phase.line, phase.line]] });
      const related = mapped.filter(row => row.stories.includes(parent));
      if (!related.length) unknowns.push({ work_item_id: id, reason: 'NO_SUPPLEMENTARY_SOT_OR_WSJF_CLAUSES_FOR_PHASE' });
      const covered = [];
      for (const clause of related) {
        const indexed = index.find(row => row.section_id === clause.source_section);
        if (!indexed) { errors.push(`UNINDEXED_SOURCE_SECTION:${clause.clause_id}`); continue; }
        if (indexed.source !== clause.source || indexed.source_path !== files[clause.source]) { errors.push(`SOURCE_PATH_MISMATCH:${clause.clause_id}`); continue; }
        const number = Number(clause.source_section.split('-')[1]);
        const heading = indexed.heading || `${clause.source === 'SOT' ? '##' : '#'} ${number}. ${indexed.title}`;
        const source = snapshots[files[clause.source]];
        let section;
        try {
          section = extractHeadingSection(source, heading); // verifies exact unique heading outside fences
          if (indexed.end_before_heading) {
            extractHeadingSection(source, indexed.end_before_heading);
            const lines = source.replace(/\r\n/g, '\n').split('\n');
            const start = lines.indexOf(heading); const stop = lines.indexOf(indexed.end_before_heading);
            if (stop <= start) throw new Error('Invalid section endpoint.');
            section = lines.slice(start, stop).join('\n').trimEnd();
          } else if (!indexed.heading) {
            // Historical index covers until the next numbered peer heading, including
            // unnumbered tail material such as SOT-11's final Ziel section.
            const lines = source.replace(/\r\n/g, '\n').split('\n');
            const start = lines.indexOf(heading);
            const peer = clause.source === 'SOT' ? /^## \d+\. / : /^# \d+\. /;
            const next = lines.findIndex((line, i) => i > start && peer.test(line));
            section = lines.slice(start, next < 0 ? lines.length : next).join('\n').trimEnd();
          }
        }
        catch { errors.push(`MISSING_OR_AMBIGUOUS_HEADING:${clause.clause_id}`); continue; }
        if (hash(normalize(section)) !== indexed.normalized_sha256) { errors.push(`SOURCE_SECTION_HASH_MISMATCH:${clause.clause_id}`); continue; }
        const lines = source.replace(/\r\n/g, '\n').split('\n');
        const start = lines.indexOf(heading) + 1;
        const end = start + section.split('\n').length - 1;
        let ranges;
        if (clause.source === 'WSJF') {
          const match = /^(.*)#L(\d+)-L(\d+)$/.exec(clause.source_anchor);
          if (match && match[1] === files.WSJF) ranges = [[+match[2], +match[3]]];
        } else {
          ranges = String(clause.source_lines).split(',').map(part => {
            const match = /^(\d+)(?:-(\d+))?$/.exec(part.trim());
            return match ? [+match[1], +(match[2] ?? match[1])] : null;
          });
        }
        // WSJF ranges may include the trailing blank separator before the next heading.
        const paddedEnd = (() => { let n = end; while (n < lines.length && !lines[n].trim()) n++; return n; })();
        if (!ranges?.length || ranges.some((range, i) => !range || range[0] < start || range[1] < range[0]
            || range[1] > paddedEnd || (i > 0 && ranges[i - 1] && range[0] <= ranges[i - 1][1])
            || !lines.slice(range[0] - 1, range[1]).some(line => line.trim()))) {
          errors.push(`INVALID_SOURCE_LINE_ANCHOR:${clause.clause_id}`); continue;
        }
        covered.push(clause.clause_id);
        traceability_records.push({ work_item_id: id, source_ref: files[clause.source], source_anchor: heading,
          target_ref: files.backlog, story_id: parent, clause_id: clause.clause_id,
          mapping_granularity: 'STORY', source_line_ranges: ranges,
          // JSON preserves each disjoint segment separately; intervening text is never included.
          clause_source_text_encoding: 'JSON_ARRAY_OF_LF_SEGMENTS',
          clause_source_text_sha256: hash(JSON.stringify(ranges.map(range => lines.slice(range[0] - 1, range[1]).join('\n')))),
          source_section_sha256: indexed.normalized_sha256 });
      }
      coverage.push({ work_item_id: id, story_id: parent, mapped_story_clauses: related.length,
        valid_story_clause_refs: covered, atomic_work_item_mapping: 'UNKNOWN' });
      unknowns.push({ work_item_id: id, reason: 'MATRICES_MAP_STORIES_NOT_INDIVIDUAL_WORK_ITEMS' });
    }
    // A source changing while this snapshot is assembled cannot yield valid evidence.
    for (const [path, expected] of Object.entries(sourcehashes)) {
      if (hash(await readFile(resolve(projectRoot, path))) !== expected) errors.push(`SOURCE_CHANGED_DURING_CHECK:${path}`);
    }
  } catch (error) { errors.push(error.message); }
  return result();
}
