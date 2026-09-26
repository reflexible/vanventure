# Abnahmegrenze: FULL CHECK Engine

Stand: 26.09.2026 · `ST-SOT-08` lokal als impact-begrenzter Prüflauf umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Eskalation | Die Impact Engine liefert die zusammengeführten FULL-Auslöser; der Prüflauf zeigt exakt `⚠ FULL CHECK REQUIRED`, Gründe und betroffene Module, Contracts, Work Items und Prozesse. |
| Prüfung | Für Graph und jeden betroffenen Zieltyp verlangt der Prüflauf einen expliziten Prüfer mit Evidenzreferenz. Fehlende oder fehlgeschlagene Prüfer, ungeklärter Impact und aktive Konflikte blockieren. Historische Migration wird nicht pauschal erneut ausgeführt. |
| Validierung | `node --test tools/sot/full-check.test.mjs` besteht 6/6 Fälle: semantischer Core-Delta-Scope, Contract-Bruch, unbekannter Impact, Worker-Konflikt, fehlende Evidenz und falscher Prüflaufmodus. |
| Umfangsgrenze | Die Engine ist nicht selbst ein Ersatz für konkrete SoT-/Contract-/Testprüfer. Deren Anbindung und belastbare Evidenz folgen in `WI-SOT-08-09` und dem inkrementellen Audit. |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht; `docs/ausbauplan.md` bleibt unverändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-08-01`–`08` lokal DONE; `WI-SOT-08-09` TODO.
