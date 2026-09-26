# Abnahmegrenze: vollständiger Pilotabschnitt DEC-REL-002

Stand: 26.09.2026 · Teilschritt von `WI-SOT-13-07`.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Abschnitt | Beide Sätze des bestehenden `DEC-REL-002` in `docs/scrum-migration/release-decisions.md` sind als separate Regeln mit Abschnitts-ID erfasst. Eindeutige Überschrift, Satzinventar und Abschnitts-SHA-256 binden den Nachweis an den aktuellen Quelltext. |
| Intake und Suche | Ein Intake kann `target_section_id` mit Begründung nennen. Der Impact-Bericht trennt einen geprüften Eigentümerabschnitt von weiterhin teilweiser Modul- und modulübergreifender Abdeckung. Semantische Gleichheit, Konflikt und Freigabe bleiben unentschieden. |
| Validierung | `node tools/sot/rule-catalogue.mjs` bestätigt 19 Regeln und genau einen geprüften Abschnitt. `node --test tools/sot/intake.test.mjs tools/sot/rule-catalogue.test.mjs tools/sot/sot-impact.test.mjs` besteht 18/18 Fälle einschließlich veraltetem Hash, ausgelassenem Satz, falschem Scope und externem exaktem Treffer. |
| Umfangsgrenze | Ein vollständiger Abschnitt beweist nicht die Vollständigkeit seines Moduls oder anderer Module. Alle acht Modul-Coverages bleiben `partial`; ein Vorschlag mit übrigen `Unknown` wird nicht automatisch genehmigt. `WI-SOT-13-07` bleibt für den allgemeinen relevanten Scope offen. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** Pilot geprüft; `WI-SOT-13-07` weiterhin READY.
