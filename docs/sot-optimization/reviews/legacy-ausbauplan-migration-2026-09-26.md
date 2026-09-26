# Lesender Abgleich: historischer Ausbauplan und Scrum-Migration

Stand: 26.09.2026. Die 494 später uncommitted ergänzten SoT-Zeilen waren
**nicht** Teil der historischen Quelle und zählen in keinem Wert unten mit.

| Frage | Nachweis / Ergebnis |
| --- | --- |
| Quelle der abgeschlossenen Migration? | Ja. `docs/scrum-migration/source-index.md` erfasst `docs/ausbauplan.md` als `SRC-0362`–`SRC-0547`. |
| Inventarumfang | 186 Einträge in `source-inventory.csv` und gleich viele zugehörige Zeilen in `traceability-matrix.csv`; 153 relevant, 33 mit Begründung nicht relevant. |
| Original-Candidates / Successors | Für die 153 relevanten Source-IDs sind 709 Original-Candidate- und 161 Successor-Zeilen in `atomic-requirements.csv` erfasst. Alle 153 relevanten Inventarzeilen besitzen mindestens ein `ST-*`-Ziel. |
| Planning Coverage | Final Audit R5 meldet `FINAL_AUDIT_PASS` für den migrierten Planungsinhalt und die Source→Candidate→Target-Traceability. Vier atomare Holds bleiben ausdrücklich dokumentiert: `SRC-0504.b` (Galerie-Designabnahme), `SRC-0522.g` (Fotoentscheidung Nr. 63/69), `SRC-0528.a` (genauer Varianten-/Hashumfang) und `SRC-0528.b` (Fotoentscheidung); siehe `atomic-coverage-report.md`. |
| Vollständige Ablösung des alten Plans? | Bestanden. Der eintragsweise Abgleich umfasst dieselben 186 Inventar- und Matrix-IDs (`SRC-0362`–`SRC-0547`): alle 153 relevanten Einträge haben eine auflösbare Story- oder Constraint-Zielstelle; alle 33 nicht relevanten Einträge haben eine begründete Nichtübernahme. Die 870 zugehörigen Candidate-/Successor-Zeilen bewahren offene Arbeit und historischen Status. Der R5-Audit bestätigt die vollständige Source→Candidate→Target-Traceability; die vier Holds bleiben als gezielte, nicht als erledigt ausgegebene Folgearbeit erhalten. |

**Status:** `LEGACY_AUSBAUPLAN_SOURCE_MAPPING = PASS` und
`LEGACY_AUSBAUPLAN_MIGRATION = PASS`. Die vier benannten Holds bleiben
sichtbar, sind aber jeweils als offene Freigabe-/Evidenzarbeit dem passenden
Ziel zugeordnet und blockieren weder die Planmigration noch ihre historische
Nachweisführung. Historischer Altbestand und seine Statuswerte bleiben
unangetastet.

Die verbliebenen Verweise auf die alte Arbeitsliste werden als historische
Quell- oder Detailnachweise geführt. Der zentrale Scrum-Plan bleibt die
einzige aktive Gesamtplanung; das SoT-Epic bleibt im kanonischen Plan und
seinem abgegrenzten Fachmodul.
