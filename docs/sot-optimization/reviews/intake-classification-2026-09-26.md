# Abnahmegrenze: SoT-Intake-Klassifikation

Stand: 26.09.2026 · erster lokaler Slice von `ST-SOT-12`.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Klassifikation | Idee, Projekt-/Fachplan, Entscheidung und Regel werden mit Herkunft, Zeit, Inhalt und exaktem Authority-Key als unverbindlicher Vorschlag erfasst. Das zuständige Modul und seine Quelle stammen deterministisch aus der validierten Registry. |
| Schutz | Ein projektweiter Plan darf nur auf den bestehenden Scrum-Core zielen. Intake kann weder Approval noch bindenden Status setzen oder eine zweite Zielquelle bestimmen. Fehlende Felder werden konkret gemeldet. |
| Validierung | `node --test tools/sot/intake.test.mjs` besteht 8/8 Fälle einschließlich unbekannter Autorität, ungültiger Herkunft und parallelem Gesamtplan. |
| Umfangsgrenze | Der Vorschlag wird bisher nur zurückgegeben; die dauerhafte gemeinsame Ablage und spätere Impact-/Conflict-/Approval-Prüfung sind noch offen. Deshalb bleiben `WI-SOT-12-01`–`04` offen. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-12-05` lokal DONE; restlicher Intake offen.
