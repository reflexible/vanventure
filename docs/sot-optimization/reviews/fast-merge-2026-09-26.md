# Gezielter Fast Merge Check: SoT, Optimierung und WSJF/Multi-Agent

Stand: 26.09.2026 · `PLAN_STATUS: APPROVED` nach bedingter
Fortsetzungsanweisung und gesonderter Konfliktentscheidung · technische
Umsetzung in diesem Bericht noch nicht nachgewiesen.
Dies ist ein Prüf- und Entscheidungsnachweis, keine zweite aktive Planung.
Grundlagen: [bisheriger SoT-Prozess](../sources/sot-process-input-2026-09-26.md),
[vollständiger WSJF-/Multi-Agent-Plan](../sources/wsjf-multi-agent-input-2026-09-26.md),
die beiden Nutzeraufträge zur Optimierung und vollständigen Implementierungsliste,
[Scrum Core](../../scrum-plan.md), [Scrum-Planungsregel](../../project-rules/scrum-planning.md)
und [Golden Baseline](../../scrum-migration/reviews/GOLDEN-BASELINE-2026-09-26.md).
Die Klassifikation betrifft nur Überschneidungen; sie ist keine atomare
100-%-Requirements-Abbildung und kein Full Audit.

## Kurzer Managementstand

| Ergebnis | Anzahl |
| --- | ---: |
| `COMPATIBLE` | 7 |
| `MERGE_REQUIRED` | 16 |
| `CONFLICT` | 1 (am 26.09.2026 durch Nutzerentscheidung aufgelöst) |

Wichtigste Merge-Punkte: fachlicher Scrum-Status versus operativer Execution
State versus SoT-Approval-Status; DoD mit SoT-Update, Review und Integration;
gemeinsames Backlog mit getrenntem privaten Familien-Board; WSJF als spätere
Priorisierung ohne Umgehung von Dependencies, Fast Track oder Freigaben;
Claims und aktive Prozesse als gemeinsamer Runtime-State. Die Mindestmenge
der FULL-CHECK-Auslöser wurde durch die Nutzerantwort vom 26.09.2026 geklärt.

Zielarchitektur in neun Punkten: (1) eine Autorität je Fachthema und eine
aktive Arbeitsliste, (2) geschützte Scrum-Core-Baseline, (3) kleine
tracebare Stories und Tasks, (4) Module Registry und Contracts,
(5) Dependency-/Impact-Graph, (6) FAST als Regelfall und impact-begrenzter
FULL CHECK bei Auslösern, (7) verpflichtender semantischer Check für dauerhafte
Regeländerungen, (8) gemeinsam sichtbarer Ausführungs-/Prozessstatus mit
Claims und Review, (9) WSJF erst nach Governance-End-to-End-Gate aktivieren.

Implementierungsslices stehen vollständig als `ST-SOT-00` bis `ST-SOT-31`
im [autoritativen Fachmodul](../../governance/source-of-truth-and-incremental-planning.md). Aktuell sind nur
getrennte Lese- und Mappingarbeiten parallel möglich; für Schreibarbeiten
ist ohne nachgewiesenen Write-/SoT-/Conflict-Scope kein `PARALLEL_SAFE`
festgestellt. Erster empfohlener Satz: SoT- und WSJF-Requirements-Inventar,
Preservation Matrix, dann Konfliktentscheidung und Zielarchitektur.
Der erwartete Gewinn ist ein kleinerer **normaler** Prüfkontext durch
Registry-, Contract- und Delta-Grenzen; eine quantitative Zeitersparnis ist
vor Messung nicht belegt.

## Überschneidungen

| Nr. | Bereich | Ergebnis | Nötige Zusammenführung oder Grenze |
| ---: | --- | --- | --- |
| 1 | Eine Autorität je Thema | COMPATIBLE | SoT-Prozess und Optimierungsauftrag verlangen dieselbe Eindeutigkeit. |
| 2 | Intake und Conflict Check | COMPATIBLE | Optimierungsauftrag erweitert technische Ermittlung, ohne den SoT-Approval-Ablauf zu entfernen. |
| 3 | Lifecycle | MERGE_REQUIRED | `IDEA/PROPOSED/APPROVED` für Regelentscheidungen, Scrum-Fachstatus und Agent-Execution-State getrennt modellieren. |
| 4 | Goal/Epic/Story/Task | COMPATIBLE | Hierarchie, Vertical Slices und Traceability der auditierten Planung erhalten. |
| 5 | Definition of Ready | MERGE_REQUIRED | WSJF-Felder, Dependencies und Conflict Scope ergänzen, ohne vorgeschlagene Business Values als manuellen Startblocker zu behandeln. |
| 6 | Definition of Done | MERGE_REQUIRED | Bestehende Projekt-/Release-Gates, SoT-Update, Review, Integration und impact-gerechte Prüfung gemeinsam erzwingen. |
| 7 | Freigaben | MERGE_REQUIRED | SoT-Regelfreigabe, Phase 0, Design-/Publikations-/Releasefreigabe und manuelle WSJF-Overrides getrennt halten. |
| 8 | FULL-CHECK-Auslöser | CONFLICT → RESOLVED | Der neue Auftrag verwendete „nur“ mit kürzerer Liste; der vorbereitete Auftrag verlangt weitere Mindestauslöser. Der Nutzer entschied, beide Mengen zusammenzuführen. |
| 9 | Semantische Konsistenz | COMPATIBLE | Dauerhafte fachliche Änderungen behalten den semantischen Check; `NO_CHECK` betrifft nur Fälle ohne semantischen Impact. |
| 10 | WSJF-Formel und Skala | COMPATIBLE | Die vollständige 67-Punkte-Quelle ist maßgeblich für späteres Mapping; keine Scores aus Erinnerung übernehmen. |
| 11 | Next Work versus WSJF | MERGE_REQUIRED | Vor WSJF readiness-/dependency-basiert; nach Aktivierung WSJF nur für ausführbare, sichere Arbeit. |
| 12 | Backlog und Board | MERGE_REQUIRED | Gemeinsames Projekt-Backlog/Execution-State nicht mit dem geplanten privaten Familien-Board gleichsetzen. |
| 13 | Fast Track | MERGE_REQUIRED | Explizite Board- und Nutzerfreigaben bleiben oberhalb automatischer WSJF-Reihenfolge. |
| 14 | Claims und Ownership | MERGE_REQUIRED | Atomare Claims, Reassignment und Status technisch ergänzen; keine stillen Übernahmen. |
| 15 | Parallelisierung | MERGE_REQUIRED | Write-/SoT-/Conflict-Scope, Contracts und WIP-Grenzen vor Parallelstart prüfen; `UNKNOWN` ist nicht sicher. |
| 16 | Dependencies | MERGE_REQUIRED | Scrum-Story-Abhängigkeiten, Modul-/Contract-Graph sowie harte/weiche WSJF-Abhängigkeiten einheitlich referenzieren. |
| 17 | Contracts | COMPATIBLE | Neue Contract-Metadaten schützen bestehende bindende Fachquellen. |
| 18 | Cross-Chat-Zustand | MERGE_REQUIRED | Gemeinsamer sichtbarer Runtime-State; Chats und Controller sind keine zweite SoT für Dauerregeln. |
| 19 | Review und Integration | MERGE_REQUIRED | Agent-Review und Integration ergänzen, ohne bestehende fachliche Nutzerabnahme zu ersetzen. |
| 20 | Monitoring | MERGE_REQUIRED | Planstatus, Prozessstatus, technische Prüfung und Live-Status getrennt ausweisen. |
| 21 | Scrum-Core-Baseline | MERGE_REQUIRED | Neue Infrastruktur außerhalb des Core; spätere Core-Deltas nur mit Golden-Baseline-/Impact-Gate. |
| 22 | WSJF-Rollout-Reihenfolge | MERGE_REQUIRED | Wave 3 darf Integration vorbereiten; Aktivierung erst nach Governance-End-to-End-Validation, danach WSJF-End-to-End-Prüfung. |
| 23 | Historischer Full Audit | COMPATIBLE | Impact-begrenzter FULL CHECK wiederholt die vollständige alte Migration nicht automatisch. |
| 24 | `NO_CHECK` und Git-Sauberkeit | MERGE_REQUIRED | Minimalprüfung nur ohne dauerhaften semantischen Impact; Git-Sauberkeit auf das Item und fremde untracked Arbeit bezogen ausweisen. |

## Offener echter Konflikt

**RULE_A:** Der vorbereitete Gesamtauftrag verlangt einen Full Check
*mindestens* auch bei `NEW_MAJOR_FEATURE`, `NEW_GLOBAL_RULE`,
`CONFLICT_WITH_ACTIVE_WORK`, `SOT_RESTRUCTURE` und `HIGH_IMPACT_CHANGE`.

**RULE_B:** Die neue vollständige Implementierungsliste sagt „FULL CHECK ...
wird nur ausgelöst bei“ und nennt diese Fälle nicht ausdrücklich.

**CONFLICT:** Eine exklusive Umsetzung von RULE_B würde die bisherige
Mindestmenge verkürzen; eine Vereinigung beider Listen widerspricht dem
exklusiven Wort „nur“.

**IMPACT:** Prüfmodus und DONE Guard könnten für neue globale oder sonst
hochwirksame Regeln zu schwach werden. Die technische FULL-CHECK-Engine und
deren Acceptance Criteria bleiben bis zur Entscheidung `BLOCKED`.

**RECOMMENDED_HARMONIZATION:** Alle bisherigen Mindestauslöser erhalten,
semantisch deckungsgleiche Auslöser deduplizieren und den tatsächlichen
FULL-CHECK-Scope weiterhin über den Impact Graph begrenzen.

**USER_DECISION:** Am 26.09.2026 antwortete der Nutzer ausdrücklich:
„Ja, beide Mengen zusammenführen (empfohlen)“. Beide Auslösermengen gelten
damit kumulativ; semantisch deckungsgleiche Fälle werden dedupliziert. Der
FULL CHECK bleibt auf den tatsächlich betroffenen Core-/Modul-/Contract- und
Dependency-Umfang begrenzt. Die historische Scrum-Migration wird nicht
automatisch wiederholt. `USER_DECISION_REQUIRED: NO` für diesen Konflikt.

## Status und Grenzen

Quellen eingelesen; die vollständige 67-Punkte-Fassung wurde vom Nutzer in
diesem Chat bereitgestellt. Abschnitts- und atomare Requirements-Mappings,
Prüfungen der späteren technischen Implementierung und End-to-End-Nachweise
stehen aus. `SOT_REQUIREMENTS_MAPPED` und `WSJF_RULE_MAPPING` werden deshalb
noch nicht als 100 % gemeldet. Die Golden Baseline wurde nicht geändert.
