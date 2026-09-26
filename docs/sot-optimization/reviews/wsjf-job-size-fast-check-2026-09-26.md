# WI-SOT-19-05 – Job-Size-FAST-CHECK – 26. September 2026

Status: FAST_CHECK_PASS (lokaler, nicht aktivierender Bewertungsslice).

## Scope

Der Baustein bewertet nur vorhandene Repository-Pfade und deklarierte technische Komponenten. Er erzeugt keine Zeitabschätzung und autorisiert weder Queue, Claim noch Start. Große Werte 13/20 benötigen eine dokumentierte `RETAIN_VERTICAL_VALUE`-Zerlegungsprüfung.

`docs/scrum-plan.md` blieb unverändert; der Golden-Baseline-Diff gegen `dac0199` ist leer. FULL-CHECK-Auslöser liegen nicht vor.

## Prüfnachweis

- `node --test tools/sot/wsjf-job-size.test.mjs`: 3/3 bestanden.
- `node --test tools/sot/*.test.mjs`: 293/293 bestanden.
- `git diff --check`: bestanden.
- Golden-Baseline-Diff: bestanden.

| Datei | SHA-256 |
| --- | --- |
| `tools/sot/wsjf-job-size.mjs` | `89499acc5e94c82940dd8722b8d4c9ee3d7440fdaf42c66fb1f66be11b6a8bf6` |
| `tools/sot/wsjf-job-size.test.mjs` | `d33d3d18239848f055de90757301b3c2fc7e47c6a9337815851b113f9cf7902c` |

## Grenzen

Tatsächliche Story-Zerlegung, persistierte Bewertung und Queue-/Controller-Aktivierung bleiben offen und werden nicht durch diesen Baustein autorisiert.
