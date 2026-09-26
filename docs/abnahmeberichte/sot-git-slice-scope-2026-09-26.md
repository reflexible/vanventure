# Abnahmebericht – WI-SOT-30-03 Work Items sauber trennen

Stand: 26. September 2026.

| Kriterium | Ergebnis | Nachweis |
| --- | --- | --- |
| Eindeutige Zuordnung | Ein Git-Slice akzeptiert nur eine Kennung im Format `WI-SOT-xx-xx`. | Test `rejects ambiguous work item IDs and duplicated scope paths` |
| Expliziter Schreibbereich | Mindestens ein gültiger Pfad ist nötig; doppelte oder unsichere Pfade werden abgewiesen. | `prepareGitSlice` |
| Schutz vorhandener Arbeit | Der Preflight-Guard wird vor dem Slice erneut ausgeführt. | Test `carries foreign-change conflicts into the work-item boundary` |
| Keine implizite Ausführung | Der Schritt erstellt weder Worker-Claims noch Git- oder Dateimutationen. | Code-Review; 29 Tests |

**Lokaler Status:** bestanden. Die Trennung ist eine lokale
Vorbedingung für einen Git-Slice. Commit-Erzeugung, Work-Item-ID im Commit und
kontrollierte Integration sind weiterhin getrennte Folgeschritte.
