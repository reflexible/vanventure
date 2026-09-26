# Unabhängiger Final Audit – Retry R2 – 2026-09-26

**Ergebnis: `FINAL_AUDIT_FAIL`**

Der Final Audit wurde nach `READY_FOR_FINAL_AUDIT_RETRY` vollständig gestartet. Kein Produktcode, Originalplan, Bild, Datenbank oder Live-System wurde verändert. `scrum-plan-draft.md` bleibt unverändert benannt; `docs/scrum-plan.md` wurde nicht angelegt. Historische Final-Audit-Berichte bleiben unverändert.

## Umfang und durchgeführte Prüfungen

| Prüfung | Ergebnis | Nachweis |
|---|---|---|
| Quellblockbestand | PASS | 1.106 relevante Quellblöcke in der Traceability-Matrix; Projektprüfer bestätigt 1.106 Blöcke. |
| Candidate-/Successor-Zählung | PASS | 2.913/2.913 Original-Candidates, 356 Nachfolger; Controller-Zähler stimmen überein. |
| Atomare Traceability-Struktur | PASS | 3.269 eindeutige Atomzeilen; Source-IDs, Quellreferenzen und Story-Ziel-IDs aufgelöst. |
| Story-/Epic-Bestand | PASS | 71 Story-IDs/Planabschnitte und 11 Epics stimmen zwischen Katalog und Draft überein. |
| Tasks und Dependencies | PASS (strukturell) | 249 eindeutige Tasks; alle Story-Eltern referenzieren vorhandene Stories. Gates und vorhandene Entscheidungen sind in den Planstellen ausgewiesen. |
| Offene Coverage-Zeilen | PASS (nicht blockierend) | 18 verbleibende Zeilen sind Publication-, Versions- oder Deferred-Holds. `decision-queue.json` weist 15 Publication- und 3 Deferred-Einträge aus; kein Eintrag blockiert den technischen Final Audit. |
| Projekt-/Migrationsprüfer | PASS | `python tools/verify-scrum-review-progress.py`: 1106 Blöcke, 2913/2913 Original-Candidates, 356 Nachfolger, 71 Stories. |
| Whitespace-/Patchprüfung | PASS | `git diff --check`; nur bekannte Zeilenenden-Hinweise, keine Diff-Fehler. |
| Story-/Epic-Qualität und Acceptance Criteria | FAIL | Die zwei unten dokumentierten Slicing-/Zielzuordnungsbefunde verhindern den PASS. |

## Auditbefunde

### FA-R2-001 — ST-WEB-01 enthält weiterhin fremde Outcomes und zu großen Acceptance-Umfang

Der neue Story-Satz begrenzt ST-WEB-01 auf gemeinsame Navigation. Im selben Storyabschnitt bleiben aber eigenständige Startseiten-, Hero-, Galerie-, Foto-Viewer-, responsive Layout- und Seiteninhaltskriterien als Acceptance-/Coverage-Text gebunden. Beispiele sind `PKG-025 / Startseiten-AC` (`SRC-0650–0652`, Draft-Zeile 457), `PKG-025 / Galerie- und Bild-AC` (`SRC-0654–0659`, Zeile 459) sowie die dort weiter aufgeführten Galerie-/Sprach-/Viewport- und Seitenprüfungen. Sie widersprechen der behaupteten Grenze zu ST-WEB-02/03 und PHOTO-Stories. Die betroffenen atomaren Kandidaten zeigen weiter auf `ST-WEB-01#Acceptance-Criteria`, sodass eine bloße Kürzung des Story-Satzes sie nicht löst.

**Erforderlich:** Kandidaten und Prüfkriterien je vorhandener zuständiger Story/AC konkret zuordnen; Startseiten-, Bild- und Release-Abnahmen aus der Navigationsstory herauslösen. Keine Quell-ID entfernen.

### FA-R2-002 — ST-INS-06 verlangt weiterhin drei unabhängige Zielintegrationen in einem Storyabschluss

`SRC-1213.b` verlangt geprüfte Übernahme in Insights, Planner und Master Context. Die aktuelle AC von ST-INS-06 verlangt weiterhin alle drei Zielsysteme innerhalb eines wiederkehrenden Export-/Prüf-/Übernahmeablaufs; die Taskzuordnung belegt keinen jeweils eigenständig abnehmbaren Ziel-Slice. Die vorherige Recovery hatte diese Bündelung als Qualitätsbefund markiert. Die vollständige Quellanforderung muss erhalten bleiben, daher ist das Weglassen von Master Context keine gültige Reparatur.

**Erforderlich:** Bestehende passende Zielstories wiederverwenden, wo der fachliche Nutzen passt; andernfalls minimale, quellengebundene Vertical Slices mit je eigener AC/Task/Traceability ergänzen oder anhand der Projektregel belegen, dass die drei Zielschritte gemeinsam ein einziges schätzbares, unabhängig abnehmbares Nutzerergebnis bilden. Keine autonome oder ungeprüfte Rückschreibung ergänzen.

## Ergebnisentscheidung

Der Candidate-/Traceability-Strukturabgleich und die technischen Prüfer bestehen, aber zwei auditrelevante Story-/AC-Befunde bleiben. Deshalb lautet das einzige zulässige Ergebnis `FINAL_AUDIT_FAIL`. Keine Gesamtfreigabe; kein Umbenennen oder aktiver Pfadwechsel.
