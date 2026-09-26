# Abnahmegrenze: Planregister und Übergangsvalidator

Stand: 26.09.2026 · `WI-SOT-27-03` lokal umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Rollen | `docs/scrum-plan.md` ist im Register `canonical-plan`, das SoT-Fachmodul `domain-authority`; `docs/ausbauplan.md` ist bis zum historischen Gate ausdrücklich `legacy-active-plan`. |
| Validator | Registrierte Planquellen, eindeutige Core-Rolle, Fachmodulverweis, zweite aktive Pläne und das Migration-Gate werden geprüft. Unregistrierte Nachweise werden nicht mehr als angeblich aktive Pläne fehlklassifiziert. |
| Validierung | `node --test deploy/plan-consistency.test.mjs` besteht 4/4 Fälle. `node deploy/plan-consistency.mjs` endet erwartungsgemäß mit Exit 1 und `PENDING`: 19 alte wörtliche Pflichtformulierungen benötigen semantische Zuordnung, der alte Plan ist noch aktiv und das eintragsweise Planwechsel-Gate offen. |
| Grenze | Der wörtliche Phrasencheck bleibt bewusst offen und ist kein semantischer Migrationsbeweis. Erst der globale Alt→Neu-Nachweis darf Registerrolle und verbindliche Verweise endgültig umstellen. `WI-SOT-27-02` bleibt BLOCKED. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md` in diesem Slice. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** Validatorübergang lokal DONE; Gesamtplanabgleich `PENDING`.
