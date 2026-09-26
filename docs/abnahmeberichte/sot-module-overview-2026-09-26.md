# Abnahmebericht – WI-SOT-25 Generierte Gesamtansicht

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Gesamtansicht | Alle elf Registry-Einträge werden in einer Tabelle angezeigt. | `node tools/sot/module-overview.mjs` |
| Generierungskennzeichnung | Datei und Inhalt tragen `GENERATED FILE` beziehungsweise `DERIVED_INDEX_ONLY`. | `docs/governance/module-overview.generated.md` |
| Keine zweite Autorität | Die Ansicht enthält nur abgeleitete Metadaten und erklärt Quellen als maßgeblich; `scoped_reference` bleibt keine Fachautorität. | `node --test tools/sot/module-overview.test.mjs` |
| Drift-Schutz | Jede Abweichung zwischen Registry und Ansicht beendet die Prüfung mit Fehler. | Negativtest `overview verification rejects a stale generated file` |

**Lokaler Status:** bestanden. Die Übersicht ist kein Backlog, keine
Freigabe und keine Produktfunktion. Sie wurde lokal geprüft und gepusht, aber
nicht live ausgerollt. Fachregeln, Status und Entscheidungen bleiben in den
jeweiligen Quellmodulen und im Scrum-Core.
