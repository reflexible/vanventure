# Abnahmegrenze: Impact Engine

Stand: 26.09.2026 · `ST-SOT-06` lokal als Impact-Klassifikation umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Eingaben | Berechnetes Delta, validierter Dependency Graph und eine explizite Änderungsbeschreibung; aktuelle Worker/Prozesse nur als übergebene Laufzeitdaten. |
| Entscheidung | `NO_CHECK`, `FAST_CHECK` oder `FULL_CHECK` mit Gründen und betroffenen Modulen, Contracts, Work Items und Prozessen. Beide vom Nutzer bestätigten FULL-Auslösermengen sind vereinigt. Semantisch nicht belegte Core-Änderungen, Contract-Brüche, unbekannte Autorität und aktive Konflikte eskalieren. |
| Scope | Generische Modulzugehörigkeit zieht nicht alle 188 Work Items in den Check; Work Items benötigen eine explizite Abschnitts-/ID-Verknüpfung. Direkte und indirekte Modul-/Contract-Beziehungen bleiben sichtbar. |
| Validierung | `node --test tools/sot/impact.test.mjs` besteht 10/10 Fälle einschließlich additivem Core-FAST, geschützter Core-Sektion, unbekannter Semantik, Contract-Bruch, fehlendem Contract-Vergleich, Worker-Konflikt und begrenztem Scope. `node tools/sot/progress.mjs --check` bestätigt den Statuszähler. |
| Umfangsgrenze | Die tatsächliche semantische Prüfung braucht einen belegten Review und gepflegte Manifeste. Aktive Prozesse werden berücksichtigt, sobald ein gemeinsamer Runtime-State sie liefert (`WI-SOT-06-09`). Die Check-Ausführung folgt in `ST-SOT-07`–`08`. |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht. `docs/ausbauplan.md` bleibt unverändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-06-01`–`08` lokal DONE; `WI-SOT-06-09` TODO.
