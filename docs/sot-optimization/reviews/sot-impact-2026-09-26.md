# Abnahmegrenze: SoT Impact Kandidatensuche

Stand: 26.09.2026 · erster lokaler Slice von `ST-SOT-13`.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Autorität und Abhängigkeit | Ein nicht integrierter Intake-Vorschlag wird gegen Registry und Graph geprüft. Zuständiges Modul, autoritative Quelle sowie vorgelagerte und nachgelagerte Module sind eindeutig ausgewiesen. |
| Regelkandidaten | Ein expliziter Katalog mit Regel-ID, Quelle, Anker und Coverage liefert identische Textstellen auch modulübergreifend sowie ähnliche Formulierungen im betroffenen Umfeld. Ähnlichkeit bleibt ein Review-Hinweis, keine semantische Gleichheit oder Freigabe. Fehlende Katalogabdeckung erscheint als `Unknown`. |
| Validierung | `node --test tools/sot/sot-impact.test.mjs` besteht 4/4 Fälle zu exakten und ähnlichen Treffern, fehlender Coverage sowie gefälschten Eigentümer-/Quellangaben. |
| Umfangsgrenze | Der bestehende Projektregelbestand ist noch nicht vollständig katalogisiert; die Prüfung kann daher keinen umfassenden Duplikat-/Konfliktabschluss behaupten. Der belegte Katalog und der fachliche Vergleich folgen in `WI-SOT-13-06` und `13-05`. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-13-01`–`04` lokal als Kandidatensuche DONE; `13-05`–`06` offen.
