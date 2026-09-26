# Abnahmegrenze: FAST CHECK Engine

Stand: 26.09.2026 · `ST-SOT-07` lokal als gezielter Prüflauf umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Auswahl | Ein reproduzierbarer FAST-Impact und sein Delta begrenzen Module, Contracts, direkte Dependencies, Work Items und Referenzquellen. Ein geschützter FULL-Fall darf nicht als FAST durchlaufen. |
| Prüfungen | Registry, Contracts und Graph werden validiert; betroffene Dateien, explizite Trace-Quelle und Ziel, passende tatsächlich ausgeführte Tests, lokale Markdown-Links und staged/unstaged `git diff --check` werden geprüft. Fehlende Evidenz führt zu `FAST_CHECK_BLOCKED`. |
| Validierung | `node --test tools/sot/fast-check.test.mjs` besteht 5/5 Fälle: bestandener Scope, fehlende Tests, fehlende Trace, gefälschter Impact oder unklarer Contract-Vergleich und ungetrackte Datei. |
| Umfangsgrenze | Die fachliche Relevanz von Test-/Trace-Zuordnungen wird nicht aus Dateinamen geraten. Sie muss gepflegt an den Orchestrator übergeben werden (`WI-SOT-07-10`). Ein FAST CHECK ersetzt keine semantische Core-Freigabe. |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht; `docs/ausbauplan.md` bleibt unverändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-07-01`–`09` lokal DONE; `WI-SOT-07-10` TODO.
