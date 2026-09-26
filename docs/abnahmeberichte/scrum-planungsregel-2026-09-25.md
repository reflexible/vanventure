# Abnahme: Scrum-Planungsregel

Stand: 25. September 2026<br>
Geprüfter Ausgangsstand: Branch `codex/rework-with-project-skills`, HEAD
`592d1f948818`; bereits vorhandene ungesicherte Änderungen im Arbeitsbaum
wurden nicht zurückgesetzt oder als Teil dieser Abnahme gewertet.

## Nachweismatrix

| Prüfpunkt | Quelle und Ergebnis | Status |
| --- | --- | --- |
| Maßgebliche Regel | `docs/project-rules/scrum-planning.md` enthält Hierarchie, Vertical Slices, Nutzen, INVEST, Acceptance Criteria, Definition of Done, Walking Skeleton, begrenzte Enabler Stories, Value-Priorisierung und Coverage-/Traceability-Gate. | Lokal dokumentiert. |
| Kurzer Root-Verweis | `AGENTS.md` verweist auf die Regel und verbietet Ersetzen oder Entfernen bestehender Pläne vor vollständiger Migration samt Check. | Lokal dokumentiert. |
| Hierarchiekonflikt | In `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md` wurde die direkte Zuordnung von Tasks zu Epics entfernt; Projekt-Tasks und projektbezogene To-dos benötigen eine Story. Eigenständige Familien-To-dos und Warnungs-Tasks bleiben operative Karten ohne Epic-Elternkarte. | Dokumentationskonflikt behoben. |
| Planregister | `docs/plan-register.json` führt Regel und diesen Nachweis als Quellen. Der aktive Gesamtplan bleibt `docs/ausbauplan.md`. | Lokal geprüft. |
| Planmigration | Keine bestehende Aufgabe wurde umgestellt, gestrichen oder als erledigt markiert. | Ausdrücklich nicht durchgeführt. |

## Reproduzierbare Prüfung und Grenzen

- `node deploy/plan-consistency.mjs`: bestanden; 30 registrierte Quellen.
- `git diff --check`: bestanden für nachverfolgte Änderungen.
- Verweise, Pflichtbegriffe und entfernte direkte Epic-Zuordnung wurden im
  lokalen Dateibestand geprüft.
- Keine Board-Implementierung, Datenbankmigration oder produktive Route wurde
  geändert oder getestet. Es gab keinen Commit, Push oder Live-Rollout; eine
  produktive Wirkung dieser reinen Projektregel ist nicht behauptet.

Die spätere vollständige Migration bestehender Pläne braucht den in der Regel
festgelegten Coverage-/Traceability-Check. Dieser Bericht ist kein Ersatz dafür.
