# Abnahmegrenze: SoT Approval Flow

Stand: 26.09.2026 · `ST-SOT-15` lokal als überprüfbare Zustandsübergänge umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Zustände | `IDEA`, `PROPOSED`, `APPROVED`, `SUPERSEDED` und optional `REJECTED` haben definierte Übergänge. Ein Vorschlag wird nicht allein durch Intake oder Tests verbindlich. |
| Gates | Für `APPROVED` ist eine ausdrückliche, auf die Vorschlags-ID bezogene Nutzerentscheidung mit Referenz, Wortlaut und Zeitpunkt nötig. Ungeklärte Regeln/Kataloglücken blockieren. Belegte Widersprüche benötigen eine ausdrückliche Auflösung je betroffener Regel. |
| Grenzen | Die Entscheidung gilt nur für die Integration des Vorschlags in seine SoT. Sie enthält keine Design-, Produktrelease- oder Live-Freigabe und ändert selbst keine Quelle. |
| Validierung | `node --test tools/sot/approval-flow.test.mjs` besteht 5/5 Fälle für gültige Übergänge, fehlende Freigabe, offene Coverage, Konfliktauflösung, Ablehnung und Ersetzung. |
| Offene Anbindung | Die Funktion arbeitet auf übergebenen Datensätzen. Dauerhafte, überprüfte Entscheidungsprovenienz und der erneute Gate-Check vor dem tatsächlichen Schreiben folgen in `WI-SOT-15-07`. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-15-01`–`06` lokal DONE; `15-07` TODO.
