# Core Impact Check: EPIC-SOT-Anbindung

Stand: 26.09.2026 · vor Änderung an `docs/scrum-plan.md`.

| Frage | Befund |
| --- | --- |
| Golden Baseline | `FINAL_AUDIT_PASS` R5; Tag `golden-scrum-final-audit-pass-2026-09-26`; SHA-256 der Windows-Datei `9ec3dbc2b1c09208580c267b683693285ee5dca609bc736243ba6a0bbe52eab2`. Exakte Wiederherstellung ist im Golden-Baseline-Nachweis belegt. |
| Geplantes Delta | Ein kleiner neuer `GOAL-SOT`/`EPIC-SOT`-Abschnitt nach `ST-OPS-03`, vor „Offene Slice- und Statusgrenzen“. Er nennt Ziel, Story-Gruppen, Abhängigkeiten, Status und Acceptance Criteria sowie den Verweis auf genau ein Fachmodul. |
| Notwendigkeit | Der Nutzer verlangt Scrum-Steuerung im kanonischen Plan, vollständige Detailarbeit im Fachmodul. Die zuvor an `ausbauplan.md` angehängten 494 Zeilen werden dort vollständig entfernt. |
| Bestehende Regeln | Keine vorhandene DoD-, Lifecycle-, Status-, Board-, Fast-Track-, Approval-, Worker-, Security- oder Governance-Regel wird verändert. Bestehende Aussagen zum historischen `ausbauplan.md` bleiben bis zum gesonderten Planwechsel-Gate unverändert. |
| Direkte Abhängigkeiten | `docs/governance/source-of-truth-and-incremental-planning.md`, Golden-Baseline-Nachweis, SoT-/WSJF-Quellen und deren Preservation-/Merge-Evidenz. Historische Migrationstabellen werden nicht geändert. |
| Prüfmodus | `FAST_CHECK`, sofern der tatsächliche Diff nur diese additive Struktur enthält. Bei einer semantischen Änderung einer bestehenden Core-Regel gilt `⚠ FULL CHECK REQUIRED` für den betroffenen Umfang. |

Nach der Änderung werden Delta, Links, Work-Item-IDs, Golden-Referenz, `git diff --check` und der bestehende Strukturprüfer gezielt geprüft. Der historische Final Audit wird nicht wiederholt.

## Ergebnis des gezielten FAST CHECK

`FAST_CHECK_PASS` für das additive Core-Delta: `git diff --unified=0`
zeigt genau einen Hunk mit 25 hinzugefügten Zeilen und **keine** entfernte oder
geänderte Bestandszeile. Das Fachmodul existiert; die relevanten relativen
Links lösen auf. `docs/ausbauplan.md` hat keinen Git-Diff. Die Golden-Tag-Referenz
ist vorhanden; der auditierte Zustand bleibt unabhängig vom aktuellen Delta
wiederherstellbar. Die ursprünglichen 182 Checklistenlabels wurden in
derselben Reihenfolge exakt ins Fachmodul übertragen; vier neue Items sind
separat gekennzeichnet. `git diff --check` meldete keinen Patchfehler.

**Begrenzung:** Der globale Planvalidator `node --test
deploy/plan-consistency.test.mjs` schlägt mit seinem bereits im Ausgangsstand
vorhandenen Register-/Autoritätswiderspruch und zahlreichen unregistrierten
historischen Dokumenten fehl; das neue Fachmodul erscheint ebenfalls noch
unregistriert. Dieser globale Befund wird nicht als bestanden ausgegeben.
`python tools/verify-scrum-review-progress.py` stoppt bei `SRC-0373.a`, weil
der aktuelle, von Git unveränderte historische `ausbauplan.md`-Bytehash vom
gespeicherten früheren Migrationshash abweicht. Auch daraus wird kein neuer
Core-Fehler oder eine Planwechsel-Freigabe abgeleitet. Der gezielte FAST CHECK
prüft nur das neue Delta; die globalen Legacy-Gates bleiben offen.
