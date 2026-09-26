# WI-SOT-19-02 – Business-Value-FAST-CHECK – 26. September 2026

Status: FAST_CHECK_PASS (lokaler, nicht aktivierender Bewertungsslice).

## Scope und Impact

Der Slice ergänzt `tools/sot/wsjf-business-value.mjs` und gezielte Tests. Er erzeugt ausschließlich einen nachvollziehbaren Business-Value-Vorschlag. Der Vorschlag ändert keinen Backlog, keinen Worker-Status, keine WSJF-Priorisierung und keine Ausführungsentscheidung.

docs/scrum-plan.md wurde nicht geändert; der Golden-Baseline-Diff gegen dac0199 ist leer. Damit liegen keine FULL-CHECK-Auslöser vor: Definition of Done, Lifecycle, Statusmodell, Board-/Fast-Track-Regeln, Approval-/Review-Gates, Worker-Grundregeln und Security-/Governance-Core sind unberührt.

## Verhalten

- Jeder Evidenzpunkt benötigt einen bestehenden, projektrelativen Quellpfad und einen exakt darin vorkommenden Auszug. Ergebnis enthält Hashes der Quelle und des Auszugs.
- Nur sieben festgelegte Business-Value-Faktoren und die Evidenzrelevanz Low, Medium, High werden akzeptiert. Der Score wird daraus auf die verbindliche WSJF-Skala abgeleitet; mitgelieferte Scores werden abgelehnt.
- Wenige Belege führen sichtbar zu Low Confidence mit allen drei Unsicherheitsangaben.
- Bestehende Werte mit Status Confirmed oder Overridden bleiben byte-inhaltlich als Wert erhalten. Die neue Einschätzung steht ausschließlich getrennt als Vorschlag bereit.
- Das Ergebnis ist mit `execution_decision: NOT_AUTHORIZED` und `persistence_decision: NOT_AUTHORIZED` markiert.

## Prüfnachweis

- `node --test tools/sot/wsjf-business-value.test.mjs`: 5/5 bestanden.
- `node --test tools/sot/*.test.mjs`: 283/283 bestanden.
- `git diff --check`: bestanden (nur Git-Zeilenendungswarnungen).
- `git diff --exit-code dac0199 -- docs/scrum-plan.md`: bestanden.

## Dateihashes

| Datei | SHA-256 |
| --- | --- |
| `D:\work\_venventure\tools\sot\wsjf-business-value.mjs` | `31280b655857dddd157ec4c07023b57d65a7f733829c30042ce9ceec6f946667` |
| `D:\work\_venventure\tools\sot\wsjf-business-value.test.mjs` | `b681e82b18686b8335da776fed9c3f02b1740c9e949fc4a76739929e05d3d548` |

## Offene Grenzen

Authentifizierte Nutzerbestätigung, dauerhafte gemeinsame Speicherung und die Einbindung in Ready Queue/Controller gehören weiter zu WI-SOT-19-08. Der aktuelle Baustein ist keine reale Nutzungsanalyse und keine automatische Prioritätsentscheidung.
