# WI-SOT-19-03 – Time-Criticality-FAST-CHECK – 26. September 2026

Status: FAST_CHECK_PASS (lokaler, nicht aktivierender Bewertungsslice).

## Scope und Impact

Der Slice ergänzt `tools/sot/wsjf-time-criticality.mjs` und gezielte Tests. Er erzeugt ausschließlich einen nachvollziehbaren Time-Criticality-Vorschlag. Der Vorschlag ändert keinen Backlog, keinen Worker-Status, keine WSJF-Priorisierung und keine Ausführungsentscheidung.

`docs/scrum-plan.md` wurde nicht geändert. Der Golden-Baseline-Diff gegen `dac0199` ist leer. Damit liegen keine FULL-CHECK-Auslöser vor.

## Verhalten

- Jeder Evidenzpunkt benötigt einen bestehenden projektrelativen Quellpfad und einen exakt darin vorkommenden Auszug; Quelle und Auszug werden gehasht.
- Feste Fristen, Releases, geplante Veröffentlichungen und saisonale Relevanz benötigen zusätzlich einen ISO-Zeitpunkt mit Zeitzone.
- Nur die sieben festgelegten Time-Criticality-Faktoren und `Low`, `Medium`, `High` als Evidenzrelevanz werden akzeptiert. Mitgelieferte Scores werden abgelehnt.
- Wenige Belege erzeugen sichtbar `Low` Confidence mit allen drei Unsicherheitsangaben.
- Das Ergebnis markiert Ausführung und Persistenz ausdrücklich als `NOT_AUTHORIZED`.

## Prüfnachweis

- `node --test tools/sot/wsjf-time-criticality.test.mjs`: 4/4 bestanden.
- `node --test tools/sot/*.test.mjs`: 287/287 bestanden.
- `git diff --check`: bestanden.
- `git diff --exit-code dac0199 -- docs/scrum-plan.md`: bestanden.

## Dateihashes

| Datei | SHA-256 |
| --- | --- |
| `tools/sot/wsjf-time-criticality.mjs` | `517e5e438e19381a0d8aaaea116709bad71aedd8fdf9a70a0feaddcdcfc987f8` |
| `tools/sot/wsjf-time-criticality.test.mjs` | `467282f956d5a09898d3cc7381ac47450f9c21bd5b6a5526f811c7eb87077cd3` |

## Offene Grenzen

Persistente Bewertung, Ready-Queue-/Controller-Aktivierung und eine konkrete Ausführungsentscheidung gehören weiterhin zu `WI-SOT-19-08`. Dieser Baustein bewertet keine externe Faktentreue außerhalb der vorgelegten Projektquellen.
