# Golden Baseline: zentraler Scrum-Plan

Stand: 26. September 2026. Dies ist ein Integritäts- und Recovery-Nachweis,
kein zweiter Scrum-Plan und keine neue fachliche Regel. Autoritativ bleibt
`docs/scrum-plan.md`; die aktive detaillierte Arbeitsliste bleibt
`docs/ausbauplan.md`.

## Eindeutiger Quellstand und Wiederherstellung

| Merkmal | Auditierter Stand |
| --- | --- |
| Final Audit | `FINAL_AUDIT_PASS`, `docs/scrum-migration/reviews/FINAL-AUDIT-RETRY-R5-2026-09-26.md` |
| Kanonischer Plan | `docs/scrum-plan.md` nach dokumentierter Promotion |
| Audit-Commit | `4a0708e46a2c2b604ee08255328dabfb9e4832d7` (am 26.09.2026 auch `origin/main`) |
| Zusätzliche Git-Referenz | `refs/tags/golden-scrum-final-audit-pass-2026-09-26` → Audit-Commit |
| Git-Blob im Audit-Commit | `c3565b64e6b0249b0ad54e3d5ab13d63e5cfef6f` |
| SHA-256 der Git-Blob-Bytes (LF) | `40c89899ffa776d8cfafc773eac0bd1998dce5ce596cf300fa78a69064862ba5` |
| SHA-256 der auditierten Windows-Arbeitsdatei (CRLF) | `9ec3dbc2b1c09208580c267b683693285ee5dca609bc736243ba6a0bbe52eab2` |
| Arbeitsdatei | 1.003.804 Bytes; 3.483 CRLF-Zeilenenden |

Git normalisiert die Arbeitsdatei wegen `core.autocrlf=true` nach LF. Der
Bytevergleich am Sicherungstag bestätigte: Die Arbeitsdatei wird durch
Umwandlung **aller** LF-Zeilenenden des Commit-Blobs nach CRLF exakt
rekonstruiert; sonst gibt es keinen Byte-Unterschied. Eine Wiederherstellung
erfolgt aus der Tag-Referenz oder dem Audit-Commit und wird gegen den obigen
SHA-256 der beabsichtigten Zeilenendenversion geprüft. Die Git-Referenz
bewahrt den auditierten Inhalt unabhängig von späteren Änderungen des aktiven
Plans; keine bestehende Historie wurde überschrieben.

## Kompakte semantische Struktur- und Requirements-Baseline

Die folgenden Anker beschreiben den auditierten Inhalt; sie ersetzen seine
vollständigen Quellanforderungen und die Traceability-Dateien nicht.

| Bereich | Bestehender semantischer Anker im Scrum-Plan |
| --- | --- |
| Struktur | Zentraler Plan mit 3 Goals, 11 Epics und 75 Stories; Quellen und Zuordnungen bleiben über Source Inventory, Story Tasks, Traceability Matrix und Constraint Register bindend (Einleitung; Goal-/Epic-/Story-Kapitel). |
| Work Items | Goal → Epic → Story → Task; kleine, einzeln prüfbare Vertical Slices, begründete Enabler, INVEST- und AC-Prüfung vor Ready; technische Einzelarbeit bleibt Story-Task (`PKG-028`, `Gemeinsame Definition of Done`). |
| Statusmodell | Story- und historischer Quellstatus sind kein neuer Abnahmenachweis. Im privaten Board: getrenntes Backlog und die Zeilen Fast Track / Scrum Board mit `Offen → Bereit → In Arbeit → Review → Done`; Übernahme vor In Arbeit, Prüfung im Review und bewusste Done-Bestätigung (`EPIC-BOARD`, `ST-BRD-01`). |
| Definition of Done | AC, Quellanforderungen, Schutz- und Freigabegates, reproduzierbare Prüfungen, Traceability und konsistente Dokumentation; geplant, lokal vorbereitet, geprüft, freigegeben, gepusht und live verifiziert bleiben getrennt (`Gemeinsame Definition of Done`). |
| Review und Approval | Phase-0-Teilabnahme, konkrete Release-Freigabe, Review und Publikationsentscheidungen sind getrennte Gates. Eine historische oder lokale Prüfung ersetzt keine aktuelle Abnahme oder Live-Verifikation (`Gemeinsame Definition of Done`, `EPIC-BOARD`). |
| Fast Track | Nur passende hoch/kritisch priorisierte Board-Items nach dokumentierten Kriterien und ausdrücklicher Freigabe; keine automatische Planung oder autonome Priorisierung (`COVERAGE-R2-002`, `ST-BRD-01`, `Priorisierung und Migration`). |
| Worker und Agenten | Marvin legt im MVP nur auf klaren Auftrag Backlog-Items an und plant nur ausdrücklich beauftragte zulässige Items nach Offen; eingeschränkte Dienstrechte, Audit und Negativfälle; keine autonome Verschiebung, Priorisierung oder Done-Setzung (`ST-BRD-04`). |
| Dependencies | Unvermeidbare Story-Abhängigkeiten und Enabler-Folgestories werden sichtbar dokumentiert; Tasks bleiben ihren Stories zugeordnet; Epic-Abschluss setzt abgenommene Stories voraus (`PKG-028`, `Gemeinsame Definition of Done`, Epic-Kapitel). |
| Governance | Eine zuständige Fachquelle pro Anforderung, kein konkurrierendes Backlog, Coverage-/Traceability-Gate vor Planersatz; Design-, Datenschutz-, Sicherheits-, Bild- und Release-Regeln bleiben wirksam (`Einleitung`, `Gemeinsame Definition of Done`, `Priorisierung und Migration`). |

## Evidenz und Abnahmegrenze

| Prüfschritt | Ergebnis |
| --- | --- |
| Aktueller Git-Status der Plandatei | Sauber; keine Änderung an `docs/scrum-plan.md`. Andere untracked Arbeitsdateien blieben unberührt. |
| Lokaler/Remote-Ausgangsstand | `HEAD`, `origin/main` und frisch geholter `FETCH_HEAD` zeigten denselben Audit-Commit. |
| Byte- und Zeilenendenvergleich | Arbeitsdatei und Commit-Blob stimmen nach der dokumentierten CRLF-/LF-Umwandlung exakt überein. |
| Recovery-Probe | Aus dem Tag gelesener Plan ergibt nach LF→CRLF exakt den SHA-256 der Arbeitsdatei; Bytevergleich `True`. |
| Remote-Referenzen | Audit-Tag auf `origin` veröffentlicht; der erste Nachweis-Commit `0aedf1006eccba1567a9b4ce69de19c71e35779a` ist in der Historie von `origin/codex/rework-with-project-skills` veröffentlicht. |
| Plan-Diff und Patchprüfung | Kein Diff des Scrum-Plans zwischen Audit-Commit und Nachweis-Commit; `git diff --check` bestanden. |
| Final-Audit-Provenienz | R5 meldet `FINAL_AUDIT_PASS` und die erfolgreiche Promotion; technische Implementierung, Release und Live-Stand waren nicht Gegenstand dieses Audit-PASS. |
| Nicht geprüft | Keine neue Gesamtprüfung der semantischen Migration, keine Produkt-, Live- oder Veröffentlichungsprüfung. |

**Schutzstatus: `GOLDEN_BASELINE_PROTECTED = PASS`.** Die Git-Tag-Referenz ist
lokal und auf `origin` nachgewiesen. Dieser Nachweis autorisiert keine
Änderung am Scrum-Core und keine SoT-Optimierungsimplementierung.
