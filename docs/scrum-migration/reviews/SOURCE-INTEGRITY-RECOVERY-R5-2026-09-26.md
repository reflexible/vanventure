# Source-integrity recovery R5 — 2026-09-26

**Disposition: `BLOCKED`; do not start Final Audit.** This targeted recovery covers only the ten files identified by `FINAL-AUDIT-RETRY-R4`. Historical review hashes and source files remain unchanged.

## Hash comparison

Hashes are SHA-256 of raw file bytes. `Normalized hash` uses exactly one transform: replace each CRLF byte pair (`0D 0A`) with LF (`0A`); no trimming, Unicode, whitespace, or BOM normalization is performed.

| Source | Stored review hash | Current raw hash | CRLF-to-LF hash | Classification |
|---|---|---|---|---|
| `docs/analytics.md` | `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d` | `fde98233984a2e08c7d9739e3027b6fed43345d72279bf34ade5d17dd7cef5d4` | `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d` | `FORMAT_ONLY` |
| `docs/betrieb.md` | `b72007d95914bf9bf15fa945c4ba10daed81553755a075fbcb19de8facd0cd8d` | `d02060d0acac9f22f132a30e9c8571153290893cf4ee4b34f0c5df2074c0c72c` | `b72007d95914bf9bf15fa945c4ba10daed81553755a075fbcb19de8facd0cd8d` | `FORMAT_ONLY` |
| `docs/creator-system.md` | `076819b22350d2644cc6bf82ab92fbbb9c4803198354f40718e90d7cd6c0f373` | `d02dc786e897cdd296d3806db61b254937586fe5edfa76c7b517162ff2d5c771` | `076819b22350d2644cc6bf82ab92fbbb9c4803198354f40718e90d7cd6c0f373` | `FORMAT_ONLY` |
| `docs/project-rules/scrum-planning.md` | `2b6dc2cf9592dd16c9b5fe9709bf40261f550f0ace33cbb507cc7ec35779ec0b` | `efc359e051ae6cee2b946747a9f672e81064403073c314ad0316ff0088156efe` | `2b6dc2cf9592dd16c9b5fe9709bf40261f550f0ace33cbb507cc7ec35779ec0b` | `FORMAT_ONLY` |
| `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` | `b36a18cf24856e100e923176c4c1a54f2bc85f222b6fd6882dd658ea12805603` | `0548004cb45ac43ef4139503a01ec701adc2e17a33e07ecdc8c52efed91b40e5` | `b36a18cf24856e100e923176c4c1a54f2bc85f222b6fd6882dd658ea12805603` | `FORMAT_ONLY` |
| `docs/design-guide.md` | `f486ea0f44e53abc188644eeccd94b536d1db65a1b6ae14baad8240726bc026f` | `005779d8a5315baa0f3f0f3a850cec8227bd99148cfa637ad1c96331b5273f58` | `120add1a17d90b32540aaa0d3259b3a019e4bd66789ba6792287f7e241103f91` | `BASELINE_NOT_RECOVERABLE` |
| `docs/responsive-templates.md` | `55bf55f081fd521efd95e35894938530d07fce2520c2e1c1e297daace632e1fe` | `0b84611ce566d5b82ab114696d1f0581ed21ab5e075eb580b1043514da5f871c` | `e0727cf0a375d8ef742f9440d8681d44de4751c9d24c1a32171f2483fd8f6ec8` | `BASELINE_NOT_RECOVERABLE` |
| `docs/riverstar/entwurf.md` | `83e8ad10120d51d515d948497748ce44343c3f23a1231ccefee4d5c07a6d5c80` | `aaa583e2fd4f58f13f2b24893ff89d238cdc42370d5e4a523bd22760156255b5` | `1a008c95b055fc9a866b63db76f0e3e5f03bb6bcb9f8599b6d3c13bb163cb4c5` | `BASELINE_NOT_RECOVERABLE` |
| `docs/seo.md` | `018b6e6fec5cb80372ee0a285e90799c19dbe2f33d36ce6beca7650ae709bec8` | `4ad2fa82b055d3e8de07328a908872c37706097bad6e7212ca3de192e63c7872` | `5542d246edac35e0101d79913b1fd056098cfcb8aa4d0acca6988a0a15dafe45` | `BASELINE_NOT_RECOVERABLE` |
| `docs/vanventure-cockpit-mvp.md` | `676b56e1f789ca58eea27c0cb463ecd93b420f4476369af12463fc9403e05a71` | `8207b8565587d7425f0b0045c74fde5e1e1730bf238b930c3cebd79de04ef199` | `f5e8ae725dbd8bd6bb4150a1d61ce08b8be47f6187bcf7997f0921d229ce4f57` | `CONTENT_DIFFERENCE` |

Counts: `FORMAT_ONLY` 5; `CONTENT_DIFFERENCE` 1; `BASELINE_NOT_RECOVERABLE` 4. The single `CONTENT_DIFFERENCE` is the additional Cockpit Markdown table separator row at line 209; no source-block requirement text difference was found. SEO is `BASELINE_NOT_RECOVERABLE`: inventory block text matches current extraction, but its original full-file baseline is absent and Candidate/trace coverage is incomplete. A digest alone does not prove semantic edits.

## Line-ending rule and impact

The five `FORMAT_ONLY` sources match their stored review hash byte-for-byte after the exact CRLF-to-LF transform. This establishes line-ending-only differences for those files. Migration-only audit rule: accept a source as `FORMAT_ONLY` only when this single stated transform produces byte-for-byte equality with the stored review baseline; preserve both historical and current raw hashes. No other normalization is allowed.

The impact check covered all 22 source paths in the reviewed-source manifest: 11 raw hashes match, five match only after CRLF-to-LF, and six do not match after normalization (the five listed above plus `AGENTS.md`). Thus the rule clears exactly five sources and does not clear any other reviewed source. It is not a global project normalization policy.

## Full-baseline and semantic-coverage checks

For all five normalized-mismatch files, reachable per-path Git history (85 commits), reflogs, 5,363 unreachable Git blobs in the applicable size range, local editor history/backups, available Codex worktree copies, and rollout/review artifacts were searched. No full file reproducing any of the five stored review hashes was found. Older worktree copies of design-guide and responsive templates have different hashes; available SEO/Cockpit copies equal current files; no Riverstar copy was found. Review artifacts contain excerpts/hashes, not complete original files. Consequently no claim of byte-level historical recovery is made.

| Source | Inventory/current block comparison | Candidate and traceability check | Disposition |
|---|---|---|---|
| `docs/design-guide.md` | 57/57 blocks match; no missing, extra, or changed block | 57 source IDs; 177 original candidates + 95 successors; 57 trace rows; joins complete | Semantic exception eligible; no byte-baseline claim |
| `docs/responsive-templates.md` | 102/102 blocks match | 102 source IDs; 212 original + 3 successors; 102 trace rows; joins complete | Semantic exception eligible; no byte-baseline claim |
| `docs/riverstar/entwurf.md` | 41/41 blocks match | 41 source IDs; 136 original + 7 successors; 41 trace rows; joins complete | Semantic exception eligible; no byte-baseline claim |
| `docs/seo.md` | 20/20 inventoried text blocks match current extraction | 20 trace rows but only 13 source IDs in candidate table. Candidate gaps: `SRC-0960`, `SRC-0961`, `SRC-0970`, `SRC-0971`, `SRC-0972`, `SRC-0973`, `SRC-0979`. PKG-035 also identifies incorrect `Relevant=No` classifications. | Exception denied; source/candidate coverage unresolved |
| `docs/vanventure-cockpit-mvp.md` | 77 inventory rows; current parser sees 78 because of one additional table separator row; no source-block requirement text difference | Only 21/77 source IDs have candidates. Missing: `SRC-0997`–`SRC-1052` (56 IDs). PKG-035 flags incorrect `Relevant=No` values, including no-cost, external-notification gate, private-route protection, separate login client/cost boundary, additive database boundary, valid-channel sync gate, planner and master-context requirements. | Exception denied; source/candidate coverage unresolved |

The three eligible semantic exceptions meet the user's stated criteria for those sources only: complete inventory, candidate representation for every inventoried block, complete traceability, no additional current content block outside inventory, and no missing inventoried requirement. These are proposed audit exceptions for this recovery record; they do not alter original source hashes. SEO and Cockpit do not qualify. Their source-block disposition and candidate mapping require targeted recovery before any full audit retry.

## AGENTS.md baseline provenance addendum

The initial migration rollout artifact `C:\Users\helmu\.codex\sessions\2026\09\25\rollout-2026-09-25T15-55-17-01a0d8d9-561e-7800-a241-ec4ff15bd224.jsonl` contains a complete `world_state.payload.state.agents_md.text` snapshot. Its raw SHA-256 is exactly the preserved historical value `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`; current `AGENTS.md` becomes byte-identical after CRLF-to-LF normalization. This is direct snapshot recovery, so the prior semantic-only exception is superseded for baseline provenance. The old exception report remains unchanged as historical evidence. No stored hash is changed.

## Integrity model for future migration audits

For migration/audit records only, retain three distinct baselines: (1) raw byte hash for exact change detection; (2) narrowly normalized text hash using the explicitly declared line-ending transform to identify line-ending-only changes; and (3) semantic source/requirements manifest linking source blocks to candidates and traceability to detect requirement loss when the original byte snapshot is unavailable. A semantic exception must be per-source, evidenced, and must never be described as byte-integrity verification. This documents a migration/audit process improvement only; it does not establish a new general source-of-truth architecture.

## Recovery outcome

- Fully integrity-cleared: five `FORMAT_ONLY` files; semantic completeness also confirmed for design guide, responsive templates, and Riverstar, but no byte baseline recovered for those three.
- Per-source semantic exception eligible: design guide, responsive templates, Riverstar.
- Unresolved integrity blockers: SEO candidate/source coverage; Cockpit candidate/source coverage.
- The two content differences are classified, but do not by themselves assert changed requirement meaning.
- No source, historical review hash, package report, or prior audit report was modified.
- `READY_FOR_FINAL_AUDIT_RETRY` is not set. Full Final Audit is not started. Draft remains unpromoted.
