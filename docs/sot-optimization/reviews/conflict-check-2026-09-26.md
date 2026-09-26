# Abnahmegrenze: SoT Conflict Check

Stand: 26.09.2026 · `ST-SOT-14` lokal als konservative Klassifikation umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Beziehungen | Für belegte Kandidaten kann ein Review `DUPLICATE`, `CONTRADICTION`, `SUPERSEDES`, `EXTENSION` oder `UNRELATED` festhalten. Ohne ausdrücklichen Review bleibt die Beziehung `UNDETERMINED`. |
| Entscheidung | Nur ein als tatsächlich belegt markierter Widerspruch erzeugt `user_decision_required`. Fehlende Katalogabdeckung und offene Kandidaten bleiben `NEEDS_ANALYSIS`; keine Klassifikation erlaubt schon ein SoT-Update. |
| Validierung | `node --test tools/sot/conflict-check.test.mjs` besteht 5/5 Fälle zu Texttreffern ohne Urteil, den fünf Beziehungen, echtem Konflikt, fehlender Coverage und unpassenden Review-Daten. |
| Umfangsgrenze | Reviewer-Beziehung und Evidenzreferenz sind Eingaben; ihre fachliche Richtigkeit wird nicht aus Wortähnlichkeit berechnet. Speicherung und verbindliche Workflow-Anbindung folgen in `WI-SOT-14-06`. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-14-01`–`05` lokal DONE; `14-06` TODO.
