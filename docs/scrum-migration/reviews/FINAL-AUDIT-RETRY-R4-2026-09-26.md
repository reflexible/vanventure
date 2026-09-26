# Independent Final Audit Retry R4 — 2026-09-26

**Result: `FINAL_AUDIT_BLOCKED`**

The user-approved `AGENTS.md` semantic-baseline exception is documented in [`AUDIT-EXCEPTION-AGENTS-BASELINE-2026-09-26.md`](AUDIT-EXCEPTION-AGENTS-BASELINE-2026-09-26.md). Its historical SHA-256 remains unchanged and explicitly `NOT_RECOVERABLE`. The semantic preflight matched all 39 current blocks against the inventory; all 39 source IDs occur in the candidate table and traceability matrix (125 reviewed candidate rows; 39 traceability rows).

## Blocking preflight findings

The normal integrity requirement remains active for every other source. Ten source paths have current raw SHA-256 values that differ from the reviewed-source hashes in `atomic-requirements.csv`. No exception was authorized for them, so the complete independent audit cannot claim a PASS. The block inventory parser found no source-block text changes for the five paths checked in the targeted follow-up; one additional table separator row exists in the cockpit plan source. This semantic comparison does not substitute for the required hashes.

| Source | Recorded SHA-256 | Current SHA-256 | Current LF-normalized bytes match recorded hash? |
| `docs/analytics.md` | `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d` | `fde98233984a2e08c7d9739e3027b6fed43345d72279bf34ade5d17dd7cef5d4` | yes |
| `docs/betrieb.md` | `b72007d95914bf9bf15fa945c4ba10daed81553755a075fbcb19de8facd0cd8d` | `d02060d0acac9f22f132a30e9c8571153290893cf4ee4b34f0c5df2074c0c72c` | yes |
| `docs/creator-system.md` | `076819b22350d2644cc6bf82ab92fbbb9c4803198354f40718e90d7cd6c0f373` | `d02dc786e897cdd296d3806db61b254937586fe5edfa76c7b517162ff2d5c771` | yes |
| `docs/design-guide.md` | `f486ea0f44e53abc188644eeccd94b536d1db65a1b6ae14baad8240726bc026f` | `005779d8a5315baa0f3f0f3a850cec8227bd99148cfa637ad1c96331b5273f58` | no |
| `docs/project-rules/scrum-planning.md` | `2b6dc2cf9592dd16c9b5fe9709bf40261f550f0ace33cbb507cc7ec35779ec0b` | `efc359e051ae6cee2b946747a9f672e81064403073c314ad0316ff0088156efe` | yes |
| `docs/responsive-templates.md` | `55bf55f081fd521efd95e35894938530d07fce2520c2e1c1e297daace632e1fe` | `0b84611ce566d5b82ab114696d1f0581ed21ab5e075eb580b1043514da5f871c` | no |
| `docs/riverstar/entwurf.md` | `83e8ad10120d51d515d948497748ce44343c3f23a1231ccefee4d5c07a6d5c80` | `aaa583e2fd4f58f13f2b24893ff89d238cdc42370d5e4a523bd22760156255b5` | no |
| `docs/seo.md` | `018b6e6fec5cb80372ee0a285e90799c19dbe2f33d36ce6beca7650ae709bec8` | `4ad2fa82b055d3e8de07328a908872c37706097bad6e7212ca3de192e63c7872` | no |
| `docs/vanventure-cockpit-mvp.md` | `676b56e1f789ca58eea27c0cb463ecd93b420f4476369af12463fc9403e05a71` | `8207b8565587d7425f0b0045c74fde5e1e1730bf238b930c3cebd79de04ef199` | no |
| `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` | `b36a18cf24856e100e923176c4c1a54f2bc85f222b6fd6882dd658ea12805603` | `0548004cb45ac43ef4139503a01ec701adc2e17a33e07ecdc8c52efed91b40e5` | yes |

Five other non-excepted paths (`docs/analytics.md`, `docs/betrieb.md`, `docs/creator-system.md`, `docs/project-rules/scrum-planning.md`, and `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`) match their recorded hashes after CRLF-to-LF normalization, but not as current raw bytes. They too remain hash mismatches under the unchanged integrity check.

## Checks and preservation

- AGENTS semantic baseline: PASS for 39/39 inventoried blocks; 125 reviewed candidate rows (114 original, 11 successors); 39/39 traceability rows; no current block outside the inventoried set.
- Historical SHA-256 and all stored candidate hash fields: unchanged.
- Historical Final Audit and recovery/package reports: unchanged.
- No full audit of planning semantics is claimed in this retry because source-integrity preflight found non-excepted blockers.
- No plan promotion or active reference update was performed; the draft remains unpromoted.

**Final audit state: `FINAL_AUDIT_BLOCKED`** — resolve or establish the provenance of the ten non-excepted source-hash mismatches under the existing integrity rules, then retry the full audit.
