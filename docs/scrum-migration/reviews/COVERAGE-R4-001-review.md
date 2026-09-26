# COVERAGE-R4-001 · letzte technische und planungsbezogene Blocker (26.09.2026)

## Ergebnis

Die fünf auditrelevanten INVEST-/Vertical-Slice-Befunde sind durch echte Story-Zerlegung geschlossen. Die Projektprüfung für `SRC-0788`/`SRC-0791` ist abgeschlossen. Die zusätzlich beim Durchlauf sichtbaren Nachfolger-Fälle `SRC-0484.a1`, `SRC-0662.b1`, `SRC-0470.a2`, `SRC-0949.a1` und `SRC-2252.f2` wurden direkt geprüft: Board-Story geteilt, privater Navigationszieltext verifiziert, die übrigen drei an bereits bestehende Veröffentlichungs-/Versionsholds gebunden. Keine neue Nutzerentscheidung wurde erstellt.

- Coverage Findings Remaining: 18; sämtliche Restzeilen sind vorhandene `PUBLICATION_DECISION`, `DEFERRED_POST_PILOT` oder Versions-/Publikationsnachweise.
- Audit-relevante/reviewable Coverage Findings: 0.
- Technische Fragen: 0.
- Evidenzfälle: 5 offen als `INSUFFICIENT_EVIDENCE` mit `decision_group=PUBLICATION_DECISION`, `blocks_final_audit=false`; Veröffentlichungsfreigaben bleiben gesperrt.
- Phase-0-Policy bleibt ausdrücklich `PARTIALLY_ACCEPTED`; die schriftliche Teilabnahme `UD-2026-09-26-16` wurde nicht zur Gesamt-Phase-0-, Implementierungs- oder Release-Abnahme erweitert.
- Final Audit Readiness: `READY_FOR_FINAL_AUDIT`. Final Audit: `NOT_STARTED`.

## Story-Schnitt im EPIC-CONTENT

Jede Kampagne besitzt fünf eigenständig abnehmbare Ergebnisse. Brief, Quellfakten, Bildschutz, Entscheidungsgates und Releasefreigaben bleiben erhalten. Die beiden Kurzformate hängen nicht voneinander ab. Website und 28-Tage-Auswertung besitzen getrennte Abhängigkeiten.

| Kampagne | Longform | Short 1 | Short 2 | Website-Ergänzung | 28-Tage-Review |
|---|---|---|---|---|---|
| VAN | `ST-CON-01` | `ST-CON-05` | `ST-CON-06` | `ST-CON-07` | `ST-CON-08` |
| EXPLORE | `ST-CON-02` | `ST-CON-09` | `ST-CON-10` | `ST-CON-11` | `ST-CON-12` |
| MOVE | `ST-CON-03` | `ST-CON-13` | `ST-CON-14` | `ST-CON-15` | `ST-CON-16` |

Jede Story hat User Value, Priorität, explizite Abhängigkeiten, unabhängige Acceptance Criteria und Quellen. Die 12 neuen Slices sind in `story-catalog.json`, `story-tasks.csv` und `reverse-traceability.csv` rückverfolgbar. `SRC-0788.a`, `SRC-0791.a/b`, `SRC-0792.a/e` sind nach direkter Story-/Epic-Prüfung `Covered`.

## Zusätzlich sichtbarer Board-Split

`ST-BRD-01` ist jetzt auf das geschützte Backlog und die korrekte Elternzuordnung beschränkt. `ST-BRD-05` deckt als eigener, davon abhängiger Board-Slice die zwei Zeilen, fünf Spalten, zulässige Einplanung, atomare Übernahme und Verlauf ab. Tablet (`ST-BRD-02`), Warnungs-Inbox (`ST-BRD-03`) und Marvin-Aktionen (`ST-BRD-04`) bleiben separate Stories. Phase-0- und Release-Gates gelten für alle und bleiben offen, wo sie nicht ausdrücklich teilabgenommen sind. Dadurch ist `SRC-0484.a1/a2` planerisch gedeckt; diese Umstrukturierung behauptet keine Umsetzung oder Live-Abnahme.

## Projektweiter INVEST-/Vertical-Slice-Abschluss

Alle 71 Stories besitzen User-Story-Text, Value-Typ, Priorität, Status, Abhängigkeiten, Acceptance Criteria und Quellen; der Structural Checker validiert jede Quelle und jede Zielreferenz. Die zuvor auffälligen Content-Pakete wurden geschnitten. `ST-AUTH-01` bleibt ein kohärenter, Ende-zu-Ende geschützter Zugangsslice; Rollen, Sitzungen, Sperren, Fehlerfälle und Audit sind gemeinsam nötige Kriterien derselben Sicherheitsgrenze. `ST-VID-01` ist auf den einzelnen Sardinien-Short→Longform-Link begrenzt. Der v18-Prüfnachweis bleibt ein separater versionspezifischer Veröffentlichungs-Hold und wird nicht als vollständige visuelle Endkontrolle umgedeutet. Die Zahl Stories je Epic allein wurde nicht als PASS-Grund verwendet.

## Technische Prüfung und Prüfskript

- `SRC-0788`/`SRC-0791`: alle Story-Ziele, Epics und Slice-Grenzen im Katalog geprüft; keine verbleibende technische Mappingfrage.
- `SRC-0662.b1`: `editor/private-nav.js` und `editor/private.html` verwenden `Konto & Einstellungen` mit `/privat#profil`; `ST-AUTH-01` nennt jetzt exakt diese Bezeichnung und Route. Nur Dokumentation wurde angepasst; kein Produktcode.
- Der frühere Traceability-Fehler bei `SRC-0480`–`SRC-0489` war eine veraltete Prüferwartung: Die Matrixzeile `SRC-0482` führt einen ausführlichen, entscheidungsspezifischen `PKG-016`-Nachweis ohne den erwarteten Doppelpunkt. Der Paketbezug und die Traceability waren vollständig. Die Erwartung akzeptiert nun den bestehenden Paketbezug. Zusätzlich war die Zusammenfassung in `coverage-report.md` veraltet; sie stimmt jetzt mit den vier partiell gedeckten Quellblöcken in der Matrix überein. Es fehlte keine Traceability.
- `verify-scrum-review-progress.py`: **PASS** — 1.105 geprüfte Blöcke, 2.908/2.908 Original-Candidates, 356 Nachfolger, 71 Stories; Referenz- und Zählprüfungen bestanden. Syntaxprüfung der geänderten Prüfer und Migrationstools: PASS. Der Controller-Readiness-Abgleich umfasst Originale und Nachfolger und ergibt 0 auditrelevante offene Zeilen.

## Publication-only Holds und Audit-Status

Die fünf Evidence-Holds (`SRC-0452.g/h`, `SRC-0464.f`, `SRC-0466.s`, `SRC-2042.e`/`SRC-2247.d`/`SRC-2252.f2`) bleiben nicht veröffentlicht bzw. versionsbezogen ungeprüft. Bisherige Freigaben wurden nicht erweitert; für v18 wird keine vollständige Einzelbild-/Frame-Prüfung behauptet. Die 10 bestehenden `PUBLICATION_DECISION`-Entscheidungen und 3 `DEFERRED_POST_PILOT`-Entscheidungen bleiben getrennt. Sie blockieren den technischen Final Audit gemäß gespeicherter Scope-Regel nicht.

`READY_FOR_FINAL_AUDIT` bedeutet nur, dass keine technischen oder planerischen Final-Audit-Blocker mehr in der Coverage-/Decision-Prüfung verbleiben. Der unabhängige Final Audit wurde auf Nutzeranweisung nicht gestartet. Originalquellen, bestehende Paketberichte, Produktcode, Bilder, Datenbanken und Live-System blieben unverändert.
