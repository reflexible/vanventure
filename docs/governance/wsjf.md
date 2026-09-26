# WSJF-Bewertungsmodell

**Autorität:** `planning.wsjf-assessment`  
**Status:** aktiv als Bewertungsfachmodul; keine Ausführungs-, Board- oder Release-Autorität.  
**Quellprovenienz:** [vollständiges WSJF-/Multi-Agent-Konzept](../sot-optimization/sources/wsjf-multi-agent-input-2026-09-26.md), Abschnitt 1–67.  
**Implementierungsnachweis:** [`tools/sot/wsjf.mjs`](../../tools/sot/wsjf.mjs), [`tools/sot/wsjf.test.mjs`](../../tools/sot/wsjf.test.mjs) und [Safety-Review](../sot-optimization/reviews/wsjf-safety-2026-09-26.md).

## Verbindlicher Bereich

Dieses Modul autorisiert ausschließlich die ergänzende Bewertung bestehender Epics und Stories. Es ersetzt weder deren fachliche Anforderungen, Acceptance Criteria oder Traceability noch den zentralen Scrum-Plan. Es erzeugt keinen zweiten Backlog.

WSJF ist `Cost of Delay / Job Size`; Cost of Delay ist die Summe aus User-/Business-Value, Time Criticality und Risk Reduction / Opportunity Enablement. Für alle vier Komponenten gilt ausschließlich die Skala `1, 2, 3, 5, 8, 13, 20` von sehr gering bis extrem. Job Size ist relativ und keine Zeitabschätzung.

Jede Bewertung enthält `evaluated_at` sowie für jede Komponente `score`, `rationale` und `confidence`. Bei `Low` dokumentiert sie außerdem fehlende Information, unsichere Annahme und nicht untersuchten Bereich. Ein User-/Business-Value ist `Proposed`, `Confirmed` oder `Overridden`; bestätigte und überschriebene Werte bleiben bei automatischer Neubewertung unverändert. Werte 13 oder 20 verlangen eine dokumentierte Zerlegungsprüfung. Eine zulässige erhaltene große Story benötigt `RETAIN_VERTICAL_VALUE`, Begründung und Zeitstempel.

WSJF und Cost of Delay werden ausschließlich aus den Komponenten berechnet. Ein Manual Priority Override benötigt einen Grund und ändert den Score nicht. Bewertungen aus verschiedenen Vergleichsräumen werden nicht direkt sortiert. Änderungen dokumentieren Grund, geänderte Fakten sowie Vorher-/Nachherwerte. Automatisierung darf weder manuelle Werte, fachliche Anforderungen, Acceptance Criteria, Architektur-/Designentscheidungen noch Freigaben still überschreiben.

## Verbindliche Grenzen

Eine Bewertung ist ein Vorschlag. `Proposed` blockiert keine ansonsten startfähige Story. Ein Score autorisiert weder einen Claim noch einen Start, eine Board-Bewegung, eine Release-/Analytics-Aktivierung oder eine Nutzerentscheidung. Readiness, Abhängigkeiten, Konfliktscope, Claims, WIP, Review, Integration, Done und Controller-Zuweisung liegen bei der SoT-Architektur und dem Scrum-Core. Ein hoher WSJF überschreibt keine harte Abhängigkeit, keinen Blocker, keine Sicherheits-/Datenschutzregel und keine ausdrücklich erforderliche Nutzerentscheidung.

Der aktuelle Scorer validiert Struktur und Konsistenz, nicht die Wahrheit eines vorgeschlagenen Nutzens, einer Frist oder einer Nutzerbestätigung. Persistente Bewertungen, echte Projektanalyse und Aktivierung der Ready Queue bleiben bis zu ihren eigenen Work Items offen.

## Datenmodell

| Feld | Regel |
| --- | --- |
| `user_business_value`, `time_criticality`, `risk_reduction_opportunity_enablement`, `job_size` | Jeweils Skalenwert, Begründung und Confidence; Job Size ist relativ. |
| `value_status` | `Proposed`, `Confirmed` oder `Overridden`; die beiden manuellen Zustände sind geschützt. |
| `cost_of_delay`, `wsjf` | Ausschließlich berechnete Werte; keine manuelle Eingabe. |
| `manual_priority_override` | Optional, mit Begründung; verändert nicht die Berechnung. |
| `decomposition_review` | Bei Job Size 13/20 verbindlich. |
| `history` | Bei Neubewertung mit Zeit, Grund, Fakten sowie Vorher/Nachher. |

## Quellenzuordnung 1–67

Die Tabelle ordnet jede Quellsektion genau einem Eigentümer zu. „WSJF-Bewertungsmodell“ bedeutet verbindliche Übernahme in dieses Modul; die übrigen Zeilen bleiben verbindliche Verweise und werden nicht doppelt geführt.

| Quellsektion | Eigentümer |
| --- | --- |
| 1 | WSJF-Bewertungsmodell |
| 2 | WSJF-Bewertungsmodell |
| 3 | WSJF-Bewertungsmodell |
| 4 | WSJF-Bewertungsmodell |
| 5 | WSJF-Bewertungsmodell |
| 6 | WSJF-Bewertungsmodell |
| 7 | WSJF-Bewertungsmodell |
| 8 | WSJF-Bewertungsmodell |
| 9 | WSJF-Bewertungsmodell |
| 10 | WSJF-Bewertungsmodell |
| 11 | WSJF-Bewertungsmodell |
| 12 | WSJF-Bewertungsmodell; Story-/Ausführungsfelder nur Verweis |
| 13 | WSJF-Bewertungsmodell; vorhandene Backlogs und Traceability nur Verweis |
| 14 | SoT-Architektur / Worker-State |
| 15 | SoT-Architektur / Worker-State |
| 16 | SoT-Architektur / Worker-State |
| 17 | SoT-Architektur / Worker-State |
| 18 | SoT-Architektur / Worker-State |
| 19 | SoT-Architektur / Worker-State |
| 20 | SoT-Architektur / Worker-State |
| 21 | SoT-Architektur / Worker-State |
| 22 | SoT-Architektur / Worker-State |
| 23 | SoT-Architektur / Worker-State; WSJF bleibt unabhängig |
| 24 | SoT-Architektur / Worker-State; WSJF bleibt unabhängig |
| 25 | SoT-Architektur / Worker-State |
| 26 | SoT-Architektur / Worker-State |
| 27 | SoT-Architektur / Worker-State |
| 28 | SoT-Architektur / Worker-State |
| 29 | SoT-Architektur / Worker-State |
| 30 | SoT-Architektur / Worker-State |
| 31 | SoT-Architektur / Worker-State |
| 32 | SoT-Architektur / Worker-State |
| 33 | Scrum-Core / SoT-Architektur |
| 34 | SoT-Architektur / Worker-State |
| 35 | SoT-Architektur / Worker-State |
| 36 | SoT-Architektur / Worker-State |
| 37 | Scrum-Core / SoT-Architektur |
| 38 | SoT-Architektur / Worker-State |
| 39 | SoT-Architektur / Worker-State |
| 40 | WSJF-Bewertungsmodell |
| 41 | WSJF-Bewertungsmodell |
| 42 | SoT-Architektur / Worker-State |
| 43 | Scrum-Core / SoT-Architektur |
| 44 | SoT-Architektur / Worker-State |
| 45 | SoT-Architektur / Worker-State |
| 46 | SoT-Architektur / Worker-State |
| 47 | Scrum-Core / SoT-Architektur |
| 48 | Scrum-Core / SoT-Architektur |
| 49 | SoT-Architektur / Worker-State |
| 50 | SoT-Architektur / Worker-State |
| 51 | SoT-Architektur / Worker-State |
| 52 | SoT-Architektur / Worker-State |
| 53 | SoT-Architektur / Worker-State |
| 54 | WSJF-Bewertungsmodell; Startgrenzen nur Verweis |
| 55 | WSJF-Bewertungsmodell |
| 56 | WSJF-Bewertungsmodell |
| 57 | WSJF-Bewertungsmodell |
| 58 | WSJF-Bewertungsmodell |
| 59 | WSJF-Bewertungsmodell |
| 60 | WSJF-Bewertungsmodell |
| 61 | SoT-Architektur / Worker-State |
| 62 | SoT-Architektur / Worker-State |
| 63 | SoT-Architektur / Worker-State |
| 64 | SoT-Architektur / Worker-State; WSJF-Score allein genügt nie |
| 65 | SoT-Architektur / Worker-State |
| 66 | SoT-Architektur / Worker-State |
| 67 | SoT-Architektur / Worker-State |

## Externe Verweise

- [Zentraler Scrum-Plan](../scrum-plan.md): Fachanforderungen, Acceptance Criteria, Approval- und DoD-Regeln.
- [SoT- und Incremental-Planning-Backlog](source-of-truth-and-incremental-planning.md): Work Items, gemeinsamer Zustand, Claims, Check-Gates und Fortschritt.
- [Worker-State](worker-state.json): ausschließlich operativer Claim-/Review-/Integrationszustand.
- [Analytics-Vorgaben](../analytics.md): Aktivierung bleibt unabhängig und derzeit gesperrt.

## Aktueller Prüfstatus

`LOCAL_VERIFIED_PARTIAL`: Die Skalierung, Berechnung, Schutz manueller Werte, Re-Evaluierung, Vergleichsraum und Queue-Ausschlüsse sind lokal getestet. Automatische Faktenanalyse, persistierte Bewertung, tatsächliche Ready-Queue-Aktivierung und End-to-End-Governance sind nicht durch dieses Modul freigegeben.
