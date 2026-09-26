# Abnahmegrenze: inkrementelles Audit

Stand: 26.09.2026 · `ST-SOT-11` lokal als zusammengesetzter Auditpfad umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Ablauf | Explizite vorherige und aktuelle Snapshots/Manifeste sowie Contract-Kataloge erzeugen ein Delta. Die Impact Engine wählt `NO_CHECK`, FAST oder FULL; der passende Prüflauf liefert ein begrenztes Ergebnis. |
| Ergebnis | Der Pfad speichert Delta, Scope, Gründe und Check-Evidenz als JSON in `docs/sot-optimization/audits/`. Vorhandene Audits werden nicht überschrieben. Ein fehlender Prüfer, Manifest oder Katalog blockiert. Der historische Migrationsaudit wird nicht als durchgeführt behauptet. |
| Validierung | `node --test tools/sot/incremental-audit.test.mjs` besteht 5/5 Integrationsfälle: NO_CHECK, FAST PASS, fehlendes Manifest/Test, semantischer Core-FULL und fehlende Prüfer/Kataloge. Zusätzlich sind fremde und bereits belegte Ausgabepfade gesperrt. |
| Umfangsgrenze | Die produktive Aufrufstelle mit gepflegten semantischen Manifesten, Test-/Trace-Zuordnungen und konkreten Projektprüfern fehlt noch (`WI-SOT-11-07`). Der lokale Pfad allein bestätigt keinen Live- oder Gesamtrelease. |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht; `docs/ausbauplan.md` bleibt unverändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-11-01`–`06` lokal DONE; `WI-SOT-11-07` TODO.
