# WI-SOT-19-04 – Risk-/Opportunity-FAST-CHECK – 26. September 2026

Status: FAST_CHECK_PASS (lokaler, nicht aktivierender Bewertungsslice).

## Scope und Impact

Der Slice ergänzt einen Vorschlagsbaustein für Risk Reduction / Opportunity Enablement und gezielte Tests. Er verändert weder Backlog, Worker-State, Queue noch Ausführungsentscheidung. `docs/scrum-plan.md` wurde nicht geändert; der Golden-Baseline-Diff gegen `dac0199` ist leer. FULL-CHECK-Auslöser liegen nicht vor.

## Verhalten

- Jeder Beleg bindet einen existierenden projektrelativen Quellpfad, einen exakten Auszug und dessen Hashes.
- Die Faktoren decken technische, Security- und Datenschutzrisiken, Vendor Lock-in, Architektur, Annahmen sowie Enablement, Wiederverwendung, Produktchance, künftigen Aufwand und gemeinsame Infrastruktur ab.
- Mitgelieferte Scores, unbekannte Faktoren, Pfadflucht und erfundene Auszüge werden abgelehnt.
- Wenige Belege bleiben mit `Low` Confidence und drei sichtbaren Unsicherheitsangaben nachvollziehbar.
- Ergebnis: `execution_decision: NOT_AUTHORIZED`; `persistence_decision: NOT_AUTHORIZED`.

## Prüfnachweis

- `node --test tools/sot/wsjf-risk-opportunity.test.mjs`: 3/3 bestanden.
- `node --test tools/sot/*.test.mjs`: 290/290 bestanden.
- `git diff --check`: bestanden.
- `git diff --exit-code dac0199 -- docs/scrum-plan.md`: bestanden.

## Dateihashes

| Datei | SHA-256 |
| --- | --- |
| `tools/sot/wsjf-risk-opportunity.mjs` | `f80765bf7eb86a6d44a15a8c41cbbea5233a49f4f5d7490becc8c6831b056404` |
| `tools/sot/wsjf-risk-opportunity.test.mjs` | `c6ade3acfaa5f9f9f1b8d28109175cd6d1050aa0a61c94ebc1e0402c305087eb` |

## Offene Grenzen

Persistente Bewertung, Ready Queue, Controller und tatsächliche Ausführungsentscheidungen bleiben Bestandteil von `WI-SOT-19-08`.
