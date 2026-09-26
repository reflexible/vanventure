# Explicit audit exception — AGENTS.md semantic baseline — 2026-09-26

**Disposition:** Approved by the user in the instruction authorizing a reconstructed semantic baseline. The historical SHA-256 remains `NOT_RECOVERABLE`; its recorded value is preserved exactly and is not replaced by a newly calculated hash.

## Scope and rationale

The complete Migrationsstart-Version of `AGENTS.md` could not be recovered from Git history/reflogs, local copies, editor history, Codex rollout artefacts, or migration snapshots. The historical recorded digest is `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`. It remains historical evidence only and is not represented as byte-verified.

For the migration audit only, the user explicitly authorized semantic verification against source blocks `SRC-0001` through `SRC-0039` in `source-inventory.csv`. The current `AGENTS.md` was parsed into its 39 Markdown source blocks and compared by source line, section, and full extracted text with those inventory records: all 39 matched, with no additional current content block outside the inventoried scope. The current active file remains separate and unchanged.

The two clauses that differ from reachable `HEAD` are already the inventoried text of `SRC-0001` (Scrum planning rule and migration/Coverage gate) and `SRC-0002` (central analytics event definition and provider-adapter boundary). They are therefore not treated as post-inventory migration additions. Their introduction date and independent approval provenance are not asserted by this exception.

## Candidate and traceability provenance

- `source-inventory.csv`: all 39 blocks `SRC-0001`–`SRC-0039` are present.
- `atomic-requirements.csv`: all 39 Source IDs are represented by 125 reviewed candidate rows (114 original candidates and 11 successor rows); IDs are unique and every row has a review package.
- `traceability-matrix.csv`: all 39 Source IDs have a traceability row.
- The PKG-001 and PKG-002 historical review records remain unchanged. This exception does not rewrite their historical hash claim or assert a byte-identical source file.

## Audit boundary

This exception applies only to `AGENTS.md`, only for the current Scrum migration audit, and only to semantic completeness against `SRC-0001`–`SRC-0039`. All other sources retain the normal recorded-hash integrity requirement. No source, candidate hash, or historical report was changed to create this exception.
