# Lesender Abgleich: historischer Ausbauplan und Scrum-Migration

Stand: 26.09.2026. Die 494 später uncommitted ergänzten SoT-Zeilen waren
**nicht** Teil der historischen Quelle und zählen in keinem Wert unten mit.

| Frage | Nachweis / Ergebnis |
| --- | --- |
| Quelle der abgeschlossenen Migration? | Ja. `docs/scrum-migration/source-index.md` erfasst `docs/ausbauplan.md` als `SRC-0362`–`SRC-0547`. |
| Inventarumfang | 186 Einträge in `source-inventory.csv` und gleich viele zugehörige Zeilen in `traceability-matrix.csv`; 153 relevant, 33 mit Begründung nicht relevant. |
| Original-Candidates / Successors | Für die 153 relevanten Source-IDs sind 709 Original-Candidate- und 161 Successor-Zeilen in `atomic-requirements.csv` erfasst. Alle 153 relevanten Inventarzeilen besitzen mindestens ein `ST-*`-Ziel. |
| Planning Coverage | Final Audit R5 meldet `FINAL_AUDIT_PASS` für den migrierten Planungsinhalt und die Source→Candidate→Target-Traceability. Vier atomare Holds bleiben ausdrücklich dokumentiert: `SRC-0504.b` (Galerie-Designabnahme), `SRC-0522.g` (Fotoentscheidung Nr. 63/69), `SRC-0528.a` (genauer Varianten-/Hashumfang) und `SRC-0528.b` (Fotoentscheidung); siehe `atomic-coverage-report.md`. |
| Vollständige Ablösung des alten Plans? | Noch nicht belegt. `docs/scrum-plan.md` fordert in `AC-COVR1-051-01` einen globalen eintragsweisen Alt→Neu-Check von Ziel, fachlicher Anforderung, offener Arbeit, Status und widerspruchsfreier Autorität. Er bezeichnet diesen Check als ausstehend und sperrt Ersatz, Archivierung und Löschung von `ausbauplan.md`. |

**Status:** `LEGACY_AUSBAUPLAN_SOURCE_MAPPING = PASS` für die auditierte
Planungszuordnung. `LEGACY_AUSBAUPLAN_MIGRATION = OPEN` für die vollständige
Ablösung der alten aktiven Arbeitsliste. Keine erneute Gesamtmigration; nur der
konkret fehlende Planwechsel-Check und die vier benannten Holds werden im
jeweils betroffenen Scope weitergeführt. Historischer Altbestand und seine
Statuswerte bleiben unangetastet.

Die Verweise in `AGENTS.md`, `docs/project-rules/scrum-planning.md`,
`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` und
`docs/scrum-plan.md` auf die alte Arbeitsliste werden erst nach bestandenem
Planwechsel-Gate gezielt bereinigt. Das neue SoT-Epic wird schon jetzt nur im
kanonischen Scrum-Plan und seinem Fachmodul geführt.
