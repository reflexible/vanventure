# Project traceability adapter - 26 September 2026

Status: LOCAL_COMPONENT_VERIFIED, actual matrix cleanup remains open. Only the new read-only adapter, tests and this report were written.

## Interface and limits

`inspectProjectTraceability({ projectRoot, workItemIds })` requires an absolute project root and unique existing Work Item IDs. It reads the actual execution backlog, full implementation mandate, both preservation matrices, section index and original SoT/WSJF sources. It validates UTF-8, unique IDs, exact parent story placement, exact numbered section headings, normalized section hashes, declared source paths and bounded nonempty line anchors. All seven source files are byte-hashed and reread before returning.

Output includes FAST-compatible traceability_records, sourcehashes, errors, unknowns and coverage. Every relation is explicitly STORY ancestry. A successful structural ancestry check does not establish individual Work Item clause coverage, semantic correctness, AC satisfaction or implementation completeness. Existing paragraph summaries remain summaries; no new AC or clause anchor is invented.

The complete implementation mandate is pinned to the externally supplied original SHA-256 `00be5bfc1af9ad51cdcab2fab5475fb2df78c7342ce94769bb78bbe0d7f5d127`. Exact PHASE headings provide ancestry for every actual phase story, including technical enablers absent from the older SoT/WSJF matrices. Supplementary clause references are checked where those matrices map to that story. Missing supplementary clauses do not erase the full mandate ancestry.

## Checks

`node --test tools/sot/project-traceability.test.mjs`: 8 passed, 0 failed. Regressions cover actual parent resolution, missing IDs, phase ancestry without supplementary mappings, malformed CSV, duplicate IDs, wrong line anchors, source corruption, ambiguous headings, wrong parents, invalid UTF-8, changed original mandate bytes, explicit unnumbered intro/goal index ranges and disjoint line ranges. Current-source ancestry reads are independent of hidden cwd. No production check or deployment ran.

CSV parser count: exactly 45 SoT rows and 45 unique clause IDs. The single disjoint source anchor belongs to SOT-07.d. Output `source_line_ranges` preserves separate ranges; its evidence hash uses the JSON array of each LF-normalized segment, without intervening lines. Overlapping, reversed, malformed or out-of-section segments block.

## Existing metadata findings and proposed repair

No existing source or matrix was modified. The index normalization identified from matching existing records is LF text, trimmed section plus one trailing newline. Its boundary is the next numbered peer heading; SOT-11 therefore includes the final unnumbered Ziel section. Respecting that historical scope, 71 of 78 hashes match; seven do not. Before rewriting their metadata, compare the retained originals to confirm whether earlier hard line breaks explain the differences. These are exact current-source hashes, not semantic approvals:

| Section | Current normalized hash |
| --- | --- |
| SOT-07 | 856f9452ea90c40ad3adb06b78d58e035111be5e0ecb991bfc75eb164a25b536 |
| SOT-09 | f57babfe92cbfde4a5c052ecaf41758cda2fd91607d2a789f24e3cb88a0b5329 |
| WSJF-08 | 60912c7a6410ca1d9f1908c8c0c1ed9f78171afa6a8598dd3f8e6702b9f09e71 |
| WSJF-09 | ac650a27bddbc4db59f72fd4779decc84df16e9dc2116c3870787210b740f558 |
| WSJF-13 | 3cdffb8ff1ee8e483b740fbe0d8794336ac05257425ce54b42205ea96d0e700e |
| WSJF-44 | 3cdb0eb77a5746301de1d5f5591c62f408c12f3b0d7bf8f2eb784f76c695f0cb |
| WSJF-67 | 8428dfa8487d9d44495ba9c7cce6dddfd68237b4250b510596468e50f1bbb8b6 |

SOT-00 and SOT-GOAL have clauses in the preservation matrix but no section-index row; applicable clause checks therefore block rather than synthesize an index. Adapter support is provided for optional explicit index columns `heading` and `end_before_heading`. Intro metadata can name the existing `# Verbindlicher Source-of-Truth-Prozess` heading and `## 1. Intake neuer Informationen` endpoint. Goal metadata can name `## Ziel` with an empty endpoint (standard heading boundary/EOF). Existing numbered rows need no new fields.

SOT source_lines appear consistently zero-based: single line 15 is currently blank while its quoted requirement is at line 16; 182 is blank while the hard DONE rule is at 183. The DoD range 176-178 misses its actual rule at 179. The following derived proposal adds one to both endpoints for review. Range containment alone cannot authenticate which paraphrased clause a line was intended to represent, so these offsets need a source-to-requirement check before applying.

| Clause | Existing range | Proposed one-based range |
| --- | --- | --- |
| SOT-00.a | 15 | 16 |
| SOT-00.b | 17 | 18 |
| SOT-01.a | 21-33 | 22-34 |
| SOT-01.b | 35-46 | 36-47 |
| SOT-02.a | 50-55 | 51-56 |
| SOT-02.b | 57-59 | 58-60 |
| SOT-02.c | 61 | 62 |
| SOT-03.a | 67 | 68 |
| SOT-03.b | 68 | 69 |
| SOT-03.c | 69 | 70 |
| SOT-03.d | 70 | 71 |
| SOT-03.e | 71 | 72 |
| SOT-03.f | 72 | 73 |
| SOT-03.g | 73 | 74 |
| SOT-03.h | 74 | 75 |
| SOT-04.a | 80 | 81 |
| SOT-04.b | 81 | 82 |
| SOT-04.c | 82 | 83 |
| SOT-04.d | 83 | 84 |
| SOT-04.e | 85 | 86 |
| SOT-04.f | 87 | 88 |
| SOT-05.a | 91-99 | 92-100 |
| SOT-05.b | 101 | 102 |
| SOT-06.a | 105 | 106 |
| SOT-06.b | 107-109 | 108-110 |
| SOT-07.a | 113 | 114 |
| SOT-07.b | 117-130 | 118-131 |
| SOT-07.c | 134 | 135 |
| SOT-07.d | 135,141-143 | 136,142-144 |
| SOT-07.e | 136 | 137 |
| SOT-07.f | 137 | 138 |
| SOT-07.g | 138 | 139 |
| SOT-07.h | 139 | 140 |
| SOT-08.a | 147 | 148 |
| SOT-08.b | 151 | 152 |
| SOT-08.c | 152 | 153 |
| SOT-08.d | 153 | 154 |
| SOT-08.e | 154 | 155 |
| SOT-08.f | 155 | 156 |
| SOT-08.g | 156 | 157 |
| SOT-09.a | 160-172 | 161-173 |
| SOT-10.a | 176-178 | 177-179 |
| SOT-11.a | 182 | 183 |
| SOT-11.b | 184 | 185 |
| SOT-GOAL.a | 188-198 | 189-199 |
