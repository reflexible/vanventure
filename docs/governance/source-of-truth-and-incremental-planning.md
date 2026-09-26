# Source-of-Truth & Incremental Planning Architecture – autoritatives Fachmodul

**Planstatus: APPROVED für die schrittweise Umsetzung.** Die Nutzerkorrektur
vom 26.09.2026 ordnete die automatische Fortsetzung nach sauberer
Strukturkorrektur und bestandenem FAST CHECK ausdrücklich an; die gesonderte
Antwort vom selben Tag entschied die kumulativen FULL-CHECK-Auslöser. Diese
Ausführungsfreigabe ersetzt keine Design-, Fach-, Release- oder Live-Freigabe.
Dieses Fachmodul ist die einzige autoritative
Detailquelle und das vollständige Execution Backlog für `EPIC-SOT`. Der
[zentrale Scrum-Plan](../scrum-plan.md) steuert das Epic; dieses Modul ist kein
zweiter Gesamtplan. Die auditierte Golden Baseline steht im
[Integritätsnachweis](../scrum-migration/reviews/GOLDEN-BASELINE-2026-09-26.md).
Der Scrum-Plan erhält nur eine kleine additive Epic-/Story-Anbindung. Die
ursprünglichen SoT- und WSJF-Texte sind Eingangsquellen, keine zweite aktive
Planung. Technische Arbeit folgt den unten dokumentierten Dependencies und
Prüf-/Freigabegates.

**Goal G-SOT-01:** Das Projektteam kann dauerhafte Anforderungen und Änderungen
mit gleicher oder höherer Konsistenzsicherheit und deutlich kleinerem normalem
Prüfumfang bearbeiten. Erfolg wird an vollständigem Requirements-Mapping,
eindeutiger Autorität je Thema, bestandenen inkrementellen Prüffällen und
einer End-to-End-Validierung gemessen.

| Workstream innerhalb `EPIC-SOT` | Stories | Zielbeitrag / Abschlussbedingung |
| --- | --- | --- |
| WS-SOT-PREP · Preservation und Merge | ST-SOT-00–02 | Geschützte Baseline, vollständige Quellenzuordnung und geprüfte Zielarchitektur. |
| WS-SOT-W1 · Performance Enablement | ST-SOT-03–11 | Registry, Contracts, Graph, Impact, Checks und inkrementelles Audit sind integriert und validiert. |
| WS-SOT-W2 · SoT Governance | ST-SOT-12–18 | Intake bis Post-Validation und DONE Guards arbeiten gegen eindeutige autoritative Quellen. |
| WS-SOT-W3 · WSJF / Multi-Agent | ST-SOT-19–22 | Vollständige bestehende Regeln sind tracebar integriert; Aktivierung erst nach dem Governance-End-to-End-Gate. |
| WS-SOT-W4 · Modularisierung | ST-SOT-23–25 | Fachmodule und generierte Sicht erhalten die Golden Baseline ohne zweite Autorität. |
| WS-SOT-W5 · Monitoring und End-to-End | ST-SOT-26–31 | Status, Planpflege, Empfehlungen und realistischer Workflow sind geprüft. |

**Story-Schnitt und Acceptance Criteria (Planvorschlag):** Jede Story hat
Business Value durch weniger unnötige Prüfung bei erhaltener Regel- und
Freigabesicherheit. Die nachstehenden Ergebnisse sind separat nachzuweisen;
die vollständigen Aufgaben und Grenzfälle stehen unmittelbar darunter.
Technische Enabler sind nur dort eigene Stories, wo sie die genannten
Folgestories nachweisbar freischalten. Keine Story ist allein durch diese
Planbeschreibung `READY` oder `DONE`.

| Story | Eigenständig prüfbares Ergebnis / AC | Harte Vorgänger | Priorität |
| --- | --- | --- | --- |
| ST-SOT-00 | Audit-Commit, Tag, Byte-Recovery und semantischer Anker sind nachgewiesen. | `FINAL_AUDIT_PASS` | P0 · Done |
| ST-SOT-01 | Vollständige SoT-/WSJF-Quellen sind erfasst; jede bestehende Anforderung ist mit Ziel und Behandlung tracebar, keine Regel verschwindet. | ST-SOT-00 | P0 |
| ST-SOT-02 | Drei Quellenpaare sind gezielt klassifiziert; echte Konflikte und Entscheidungen sind dedupliziert, Zielarchitektur begründet. | ST-SOT-01 | P0 |
| ST-SOT-03 | Registry beantwortet Autorität je Modul deterministisch und validiert eindeutige IDs/Quellen; schaltet ST-SOT-04–06/12 frei. | ST-SOT-02, Planfreigabe | P1 |
| ST-SOT-04 | Versionierte Contracts und Brucherkennung funktionieren an den fünf benannten Schnittstellen; Laufzeit-Invarianten bleiben vor aktiver Nutzung zu prüfen. | WI-SOT-03-01–06/08–10 | P1 · Infrastruktur lokal; Laufzeit offen |
| ST-SOT-05 | Graph löst Modul-, Work-Item- und Contract-Abhängigkeiten auf und erkennt Zyklen; schaltet Impact und Parallelprüfung frei. | ST-SOT-03–04 | P1 |
| ST-SOT-06 | Eine Änderung liefert nachvollziehbar betroffene Module, Contracts, Work Items, Prozesse und `NO_CHECK`/FAST/FULL. | ST-SOT-05 | P1 |
| ST-SOT-07 | Lokales Delta durchläuft relevante SoT-, Contract-, Dependency-, Traceability-, Test- und Git-Prüfung mit PASS/BLOCKED. | ST-SOT-06 | P1 |
| ST-SOT-08 | Eskalation meldet Grund und betroffenen Scope vor dem Check; impact-begrenzter FULL CHECK besteht Positiv- und Negativfälle. | ST-SOT-06, Konfliktentscheidung | P1 |
| ST-SOT-09 | Byte-, Text- und semantische Baselines besitzen Version, Provenienz und Recovery-Referenz. | WI-SOT-03-01–06/08–10; Contract-Verknüpfung nicht erforderlich | P1 |
| ST-SOT-10 | Datei-, Format-, Semantik- und Contract-Deltas sind unterscheidbar; unveränderte Module werden ausgeschlossen. | ST-SOT-04, ST-SOT-09 | P1 |
| ST-SOT-11 | Relevante Delta-/Modul-/Contract-/Dependency-Audits speichern Ergebnis und eskalieren korrekt. | ST-SOT-05–10 | P1 |
| ST-SOT-12 | Neue Idee, Plan, Entscheidung oder Regel wird sichtbar klassifiziert und der zuständigen Autorität zugeordnet. | ST-SOT-03, ST-SOT-11 | P1 |
| ST-SOT-13 | SoT Impact Check findet bestehende gleiche/ähnliche Regeln und betroffene Abhängigkeiten. | ST-SOT-12 | P1 |
| ST-SOT-14 | Conflict Check unterscheidet Duplikat, Widerspruch, Erweiterung und Superseding; offene echte Entscheidungen bleiben sichtbar. | ST-SOT-13 | P1 |
| ST-SOT-15 | IDEA/PROPOSED/APPROVED/SUPERSEDED und optional REJECTED erzwingen die erforderlichen Freigaben. | ST-SOT-14 | P1 |
| ST-SOT-16 | Nach Freigabe wird genau die autoritative Quelle samt Dependencies/Traceability aktualisiert; kein Parallel-SoT entsteht. | ST-SOT-15 | P1 |
| ST-SOT-17 | Post Validation prüft Semantik, Contracts und Abhängigkeiten mit erforderlichem FAST/FULL. | ST-SOT-16 | P1 |
| ST-SOT-18 | DONE wird bei fehlendem SoT-Update, Konflikt, fehlender Prüfung oder gebrochenem Contract/Dependency verweigert. | ST-SOT-17 | P1 |
| ST-SOT-19 | Alle 67 WSJF-Abschnitte sind regelgenau abgebildet; Formel, Skala, manuelle Werte und Priorisierungsgrenzen bestehen Tests. Aktivierung wartet auf Governance-E2E. | ST-SOT-18 | P2 |
| ST-SOT-20 | Claims, Ownership, Review, Integration, Handover und Worker-Status funktionieren auf gemeinsamem Zustand. | ST-SOT-18 | P2 |
| ST-SOT-21 | Parallelvorschlag sperrt Datei-/SoT-/Dependency-Konflikte und `UNKNOWN`; sichere Slices sind nachvollziehbar. | ST-SOT-05, ST-SOT-20 | P2 |
| ST-SOT-22 | Zwei Chats übergeben Work-Item-, Entscheidungs- und SoT-Kontext ohne konkurrierende Wahrheiten. | ST-SOT-20–21 | P2 |
| ST-SOT-23 | Core-Inhalt ist gegen Golden Baseline geprüft; Fachdetails gehen erst nach vollständig referenzierter Modulübernahme atomar heraus. | ST-SOT-18, ST-SOT-24 | P2 |
| ST-SOT-24 | Benötigte Fachmodule für SoT, WSJF, Board, Analytics, CMS und Video enthalten nur belegte Anforderungen und eindeutige Autorität. | ST-SOT-03–04, ST-SOT-18 | P2 |
| ST-SOT-25 | Gesamtansicht wird aus Modulen erzeugt, als generiert markiert und nicht als zweite Autorität verwendet. | ST-SOT-23–24 | P2 |
| ST-SOT-26 | Phase, Item, Worker, Blocker, nächste/parallel mögliche Arbeit und Fortschritt sind aus demselben Zustand sichtbar. | ST-SOT-20, ST-SOT-28–29 | P1 |
| ST-SOT-27 | Derselbe aktive Plan zeigt erledigte, aktive, blockierte und neu nötige Items samt nachvollziehbarer Statuspflege. | ST-SOT-01 | P1 |
| ST-SOT-28 | Counter werden aus tatsächlichen Items berechnet und stimmen nach jedem Statuswechsel. | ST-SOT-27 | P1 |
| ST-SOT-29 | Empfehlung wählt ausführbare Blocker-/Enabler-Arbeit und nur nach Safety-Check Parallelkandidaten; WSJF kommt später hinzu. | ST-SOT-05–06, ST-SOT-21, ST-SOT-28 | P1 |
| ST-SOT-30 | Jeder Slice respektiert fremde Änderungen, hat isolierten Write Scope, einen nachvollziehbaren Commit und kontrollierte Integration. | ST-SOT-01, Planfreigabe | P1 |
| ST-SOT-31 | Idee bis DONE sowie Cross-Domain, Contract-Bruch, Parallelität, Konflikt und Rollback sind realistisch End-to-End geprüft; Governance vor WSJF-Aktivierung. | ST-SOT-03–18, ST-SOT-20–30 | P0 Gate |

**Aktueller Stand:** Die 182 ursprünglichen Items sind vollständig übernommen;
vier notwendige Preservation-/Korrekturitems wurden ergänzt. Die historische
Arbeitsliste ist exakt auf ihren vorherigen Git-Stand zurückgesetzt. Der
Scrum-Core hat nur 25 additive Zeilen für `GOAL-SOT`/`EPIC-SOT`; der gezielte
Struktur-FAST-CHECK ist bestanden. 45/45 SoT-Klauseln und 120 WSJF-Klauseln
aus 67/67 Abschnitten sind planerisch zugeordnet. Technische Preservation
und spätere Produktprüfung bleiben offen.

**Phase:** Übergang zu SoT Governance.
**Current Work Items:** keine. **Active Workers:** 0.
Das WSJF-Bewertungsmodul ist begrenzt integriert; reale automatische Bewertung und Ausführung bleiben getrennte Folgeslices. Der reale Analytics-Laufzeitübergang bleibt sichtbar blockiert; Claims und Dateibereiche stehen in
[worker-state.json](worker-state.json).
**Status:** `PLAN_STATUS: APPROVED`; `IMPLEMENTATION_STATUS: LOCAL_PARTIAL`.
**NEXT RECOMMENDATION:** `WI-SOT-20-05` · Dependency Awareness.
**Parallel Candidates:**
Keine nebenläufige Implementierung: der aktive Übergabe-Scope hat Vorrang.
**Blocked:** `WI-SOT-04-10` bis reale CMS-/Worker-/Analytics-Laufzeitgrenzen und gepinnte Integrationsbelege vorliegen; `WI-SOT-27-02` bis zum historischen Planwechsel-Gate.
**Counter:** Total 205 · Done 168 · In Progress 0 · Ready 0 · Blocked 2 ·
Open 37 (einschließlich Ready und Blocked) · Progress 82,0 %.
Der Zähler berücksichtigt das Musterbeispiel `[x] ~~Work Item~~` nicht.

### WS-SOT-PREP – Preservation und Merge
#### ST-SOT-00 – PHASE 0: GOLDEN BASELINE
- [x] ~~WI-SOT-00-01 · Auditierten docs/scrum-plan.md als Golden Baseline sichern~~
- [x] ~~WI-SOT-00-02 · Git-Wiederherstellungsreferenz herstellen~~
- [x] ~~WI-SOT-00-03 · SHA-/Byte-Recovery verifizieren~~
- [x] ~~WI-SOT-00-04 · Golden-Baseline-Nachweis dokumentieren~~
Golden Baseline:
PROTECTED
Diese Phase darf nicht erneut ausgeführt werden, solange die Baseline unverändert gültig ist.
#### ST-SOT-01 – PHASE 1: REQUIREMENTS PRESERVATION
- [x] ~~WI-SOT-01-01 · bestehenden Source-of-Truth-Plan vollständig einlesen~~
- [x] ~~WI-SOT-01-02 · bestehenden WSJF-/Multi-Agent-Team-Plan vollständig einlesen~~
- [x] ~~WI-SOT-01-03 · aktuellen docs/scrum-plan.md als Scrum-Core erfassen~~
- [x] ~~WI-SOT-01-04 · vorhandene verwandte Plan-/Governance-Artefakte identifizieren~~
- [x] ~~WI-SOT-01-05 · bestehende SoT-Anforderungen als Requirements-Baseline erfassen~~
- [x] ~~WI-SOT-01-06 · Preservation Matrix erzeugen~~
- [x] ~~WI-SOT-01-07 · jede bestehende SoT-Anforderung klassifizieren:~~
  - PRESERVED
  - EXTENDED
  - TECHNICALLY_REIMPLEMENTED
  - CONFLICT
  - USER_DECISION_REQUIRED
- [x] ~~WI-SOT-01-08 · sicherstellen, dass keine bestehende SoT-Regel verloren geht~~
  Planungsnachweis: 45/45 Klauseln mit Quellanker und Zielstory; technische
  Umsetzung und semantische Post-Validation bleiben getrennt offen.
- [x] ~~WI-SOT-01-09 · alle 67 WSJF-/Multi-Agent-Abschnitte regelgenau klassifizieren und mit Ziel, Test und erhaltenen manuellen Entscheidungen verknüpfen~~
- [ ] TODO – WI-SOT-01-10 · technische Preservation der 45 SoT-Klauseln gegen die spätere Implementierung verifizieren; Planungszuordnung allein genügt nicht
#### ST-SOT-02 – PHASE 2: FAST MERGE CHECK
- [x] ~~WI-SOT-02-01 · SoT vs. Optimierungsarchitektur vergleichen~~
- [x] ~~WI-SOT-02-02 · SoT vs. WSJF/Multi-Agent vergleichen~~
- [x] ~~WI-SOT-02-03 · Optimierungsarchitektur vs. WSJF/Multi-Agent vergleichen~~
- [x] ~~WI-SOT-02-04 · Überschneidungen klassifizieren:~~
  - COMPATIBLE
  - MERGE_REQUIRED
  - CONFLICT
- [x] ~~WI-SOT-02-05 · kompatible Bereiche nicht unnötig weiter analysieren~~
- [x] ~~WI-SOT-02-06 · Merge-Punkte konsolidieren~~
- [x] ~~WI-SOT-02-07 · echte Konflikte identifizieren~~
- [x] ~~WI-SOT-02-08 · echte Nutzerentscheidungen deduplizieren~~
- [x] ~~WI-SOT-02-09 · gemeinsame Zielarchitektur bestätigen~~
  Die Nutzerantwort vom 26.09.2026 bestätigt die kumulative FULL-CHECK-Liste;
  der gezielte Merge-Bericht dokumentiert die erhaltenen Schutzgrenzen.
Besonders prüfen:
- Work-Item-Lifecycle
- Epic / Story / Task
- Definition of Done
- SoT Impact Check
- Conflict Check
- WSJF
- Fast Track
- Backlog
- Board
- Worker/Subagents
- Parallelisierung
- Ownership
- Claiming / Locking
- Dependencies
- Reviews
- Freigaben
- Status
- Monitoring
- Cross-Chat-Handover
- Audit
- Traceability
### WS-SOT-W1 – PERFORMANCE ENABLEMENT
#### ST-SOT-03 – PHASE 3: MODULE REGISTRY
- [x] ~~WI-SOT-03-01 · Module-Registry-Schema definieren~~
- [x] ~~WI-SOT-03-02 · Modul-ID definieren~~
- [x] ~~WI-SOT-03-03 · autoritative Quelle je Modul erfassen~~
- [x] ~~WI-SOT-03-04 · Modulstatus definieren~~
- [x] ~~WI-SOT-03-05 · Modulversion definieren~~
- [x] ~~WI-SOT-03-06 · Dependencies erfassen~~
- [x] ~~WI-SOT-03-07 · Contracts erfassen~~
- [x] ~~WI-SOT-03-08 · letzte validierte Baseline erfassen~~
- [x] ~~WI-SOT-03-09 · letzten Auditstatus erfassen~~
- [x] ~~WI-SOT-03-10 · Registry validieren~~
#### ST-SOT-04 – PHASE 4: CONTRACT SYSTEM
- [x] ~~WI-SOT-04-01 · Contract-Modell definieren~~
- [x] ~~WI-SOT-04-02 · Scrum → Work-Item Contract~~
- [x] ~~WI-SOT-04-03 · SoT → Decision/Change Contract~~
- [x] ~~WI-SOT-04-04 · Worker → Work Assignment Contract~~
- [x] ~~WI-SOT-04-05 · CMS → Publishing Contract~~
- [x] ~~WI-SOT-04-06 · Analytics → Content-ID Contract~~
- [x] ~~WI-SOT-04-07 · Contract-Versionierung definieren~~
- [x] ~~WI-SOT-04-08 · Contract-Break-Erkennung implementieren~~
- [x] ~~WI-SOT-04-09 · Contract-Validierung implementieren~~
- [ ] BLOCKED – WI-SOT-04-10 · fachliche Contract-Invarianten an den tatsächlichen CMS-/Worker-/Analytics-Übergängen durchsetzen und mit Positiv-/Negativfällen prüfen; Metadatenvalidierung allein ist keine Laufzeitfreigabe
  Der Vertrag ist lokal gesichert und die Aktivierung ausdrücklich gesperrt. Die atomare Worker-Durchsetzung und die realen CMS-/Analytics-Pfade sind auf die spätere Runtime-Integration verschoben; dieser Punkt bleibt bis dahin blockiert. [Aktivierungsnachweis](../sot-optimization/reviews/analytics-activation-gate-2026-09-26.md).
#### ST-SOT-05 – PHASE 5: DEPENDENCY GRAPH
- [x] ~~WI-SOT-05-01 · Modulabhängigkeiten erfassen~~
- [x] ~~WI-SOT-05-02 · Work-Item-Abhängigkeiten erfassen~~
- [x] ~~WI-SOT-05-03 · Contract-Abhängigkeiten erfassen~~
- [x] ~~WI-SOT-05-04 · laufende Worker berücksichtigen~~
- [x] ~~WI-SOT-05-05 · betroffene Module automatisch ableiten~~
- [x] ~~WI-SOT-05-06 · Impact-Ausbreitung bestimmen~~
- [x] ~~WI-SOT-05-07 · Dependency-Zyklen erkennen~~
- [x] ~~WI-SOT-05-08 · Dependency Graph validieren~~
  Work-Item-Kanten werden nur aus dokumentierten Story-Vorgängern erzeugt;
  keine harte Reihenfolge wird aus Phasennummern erfunden. Laufende Worker
  erfordern einen noch anzubindenden gemeinsamen Runtime-State.
#### ST-SOT-06 – PHASE 6: IMPACT ENGINE
- [x] ~~WI-SOT-06-01 · Änderung klassifizieren~~
- [x] ~~WI-SOT-06-02 · betroffenes Modul bestimmen~~
- [x] ~~WI-SOT-06-03 · direkte Dependencies bestimmen~~
- [x] ~~WI-SOT-06-04 · indirekte relevante Dependencies bestimmen~~
- [x] ~~WI-SOT-06-05 · betroffene Contracts bestimmen~~
- [x] ~~WI-SOT-06-06 · betroffene Work Items bestimmen~~
- [x] ~~WI-SOT-06-07 · laufende Prozesse berücksichtigen~~
- [x] ~~WI-SOT-06-08 · erforderlichen Prüfmodus automatisch bestimmen~~
- [x] ~~WI-SOT-06-09 · gemeinsame Laufzeitquelle für aktive Prozesse anbinden; die Engine wertet nur ausdrücklich übergebene Prozessdaten aus~~
  Der Bridge-Adapter liest den lokalen Worker-State und liefert die Eingaben
  für Graph und Impact. Unbekannte Scopes blockieren; die automatische
  Orchestrator-Nutzung bleibt in `WI-SOT-11-07` offen.
Ergebnis:
NO_CHECK
oder
FAST_CHECK
oder
FULL_CHECK
#### ST-SOT-07 – PHASE 7: FAST CHECK
FAST CHECK ist der Default für normale Änderungen.
- [x] ~~WI-SOT-07-01 · Delta bestimmen~~
- [x] ~~WI-SOT-07-02 · nur betroffene Module prüfen~~
- [x] ~~WI-SOT-07-03 · relevante Contracts prüfen~~
- [x] ~~WI-SOT-07-04 · direkte Dependencies prüfen~~
- [x] ~~WI-SOT-07-05 · relevante Traceability prüfen~~
- [x] ~~WI-SOT-07-06 · relevante Tests ausführen~~
- [x] ~~WI-SOT-07-07 · Referenzen prüfen~~
- [x] ~~WI-SOT-07-08 · git diff --check~~
- [x] ~~WI-SOT-07-09 · Ergebnis dokumentieren~~
- [x] ~~WI-SOT-07-10 · fachlich gepflegte Test- und Trace-Zuordnung im gemeinsamen Orchestrator bereitstellen; die Engine verlangt explizite Eingaben~~
  Projektgebundene Prüfprofile, Traceability und Driftbindung sind im gemeinsamen Auditpfad integriert. Host-eigene Fachprüfer bleiben für spätere Semantikabnahmen erforderlich. [Integrationsabnahme](../sot-optimization/reviews/integration-acceptance-2026-09-26.md).
Ergebnis:
FAST_CHECK_PASS
oder
FAST_CHECK_BLOCKED
Kein vollständiger Plan-Audit.
#### ST-SOT-08 – PHASE 8: FULL CHECK
FULL CHECK ist nicht der Normalfall. Die vom Nutzer zusammengeführten
Eskalationsmengen gelten kumulativ; deckungsgleiche Fälle werden dedupliziert.
`⚠ FULL CHECK REQUIRED` wird bei folgenden Impact-Arten ausgelöst:
- Scrum-Core-Änderung
- Definition-of-Done-Änderung
- Work-Item-Lifecycle-Änderung
- Statusmodell-Änderung
- Board-/Fast-Track-Regeländerung
- Approval-/Review-Gate-Änderung
- Worker-/Agent-Grundregeländerung
- zentraler SoT-Governance-Änderung
- Security/Auth
- grundlegender Datenmodelländerung
- Cross-Domain-Änderung
- mehreren Kernmodulen
- Contract-Bruch
- unklarem Impact
- erkannter Inkonsistenz
- neuem Major Feature oder globaler Regel
- Konflikt mit bereits aktiver Arbeit
- SoT-Restrukturierung oder sonstiger Änderung mit hohem Impact
- [x] ~~WI-SOT-08-01 · automatische Eskalationsregeln implementieren~~
- [x] ~~WI-SOT-08-02 · ⚠ FULL CHECK REQUIRED Status implementieren~~
- [x] ~~WI-SOT-08-03 · Grund ausgeben~~
- [x] ~~WI-SOT-08-04 · betroffene Module ausgeben~~
- [x] ~~WI-SOT-08-05 · Work Items ausgeben~~
- [x] ~~WI-SOT-08-06 · laufende Worker ausgeben~~
- [x] ~~WI-SOT-08-07 · Prüfungsumfang automatisch begrenzen~~
- [x] ~~WI-SOT-08-08 · impact-basierten Full Check implementieren~~
- [x] ~~WI-SOT-08-09 · konkrete Projektprüfer und ihre Evidenz an den Orchestrator anbinden; die Engine blockiert bei fehlenden Prüfern~~
  Der projektgebundene Auditrunner lädt geprüfte Quellen und feste Profile selbst, bindet Evidenz und blockiert Drift oder fehlende Host-Prüfer. [Abnahme](../sot-optimization/reviews/project-audit-path-acceptance-2026-09-26.md).
Auch ein FULL CHECK darf nicht automatisch die alte komplette Scrum-Migration wiederholen.
#### ST-SOT-09 – PHASE 9: BASELINE SYSTEM
Für relevante Module:
- [x] ~~WI-SOT-09-01 · Byte-Baseline~~
- [x] ~~WI-SOT-09-02 · normalisierte Text-Baseline~~
- [x] ~~WI-SOT-09-03 · semantische Requirements-/Manifest-Baseline~~
- [x] ~~WI-SOT-09-04 · Baseline-Versionierung~~
- [x] ~~WI-SOT-09-05 · Baseline-Provenienz~~
- [x] ~~WI-SOT-09-06 · Recovery-Referenz~~
  Das geprüfte Golden-Manifest bleibt eine explizite semantische Baseline;
  Freitextänderungen werden ohne gepflegtes aktuelles Manifest nicht als
  semantisch gleich behauptet.
#### ST-SOT-10 – PHASE 10: CHANGE / DELTA DETECTION
- [x] ~~WI-SOT-10-01 · Dateiänderungen erkennen~~
- [x] ~~WI-SOT-10-02 · semantische Änderungen erkennen~~
- [x] ~~WI-SOT-10-03 · Format-only Änderungen erkennen~~
- [x] ~~WI-SOT-10-04 · Contract-Änderungen erkennen~~
- [x] ~~WI-SOT-10-05 · unveränderte Module automatisch ausschließen~~
- [x] ~~WI-SOT-10-06 · prüfbares Delta erzeugen~~
  Vergleiche benötigen explizite vorherige Snapshots beziehungsweise
  Baseline-Referenzen; semantische Gleichheit wird nur mit gepaarten
  gepflegten Manifesten bestätigt.
#### ST-SOT-11 – PHASE 11: INCREMENTAL AUDIT
Implementieren:
Change
→ Impact Analysis
→ Required Check Mode
→ Delta Validation
→ Audit Result
- [x] ~~WI-SOT-11-01 · lokales Delta-Audit~~
- [x] ~~WI-SOT-11-02 · Modul-Audit~~
- [x] ~~WI-SOT-11-03 · Contract-Audit~~
- [x] ~~WI-SOT-11-04 · Dependency-Audit~~
- [x] ~~WI-SOT-11-05 · Audit-Eskalation~~
- [x] ~~WI-SOT-11-06 · Audit-Ergebnis speichern~~
- [x] ~~WI-SOT-11-07 · den Auditpfad mit gepflegten Manifesten, Test-/Trace-Zuordnungen und Projektprüfern im gemeinsamen Ablauf aufrufen~~
  Der gemeinsame Projekt-Auditpfad bindet Maintainer-Manifeste, feste Profile, Original-Traceability und Host-Prüfer an unveränderliche Evidenz. [Abnahme](../sot-optimization/reviews/project-audit-path-acceptance-2026-09-26.md).
### WS-SOT-W2 – SOURCE OF TRUTH GOVERNANCE
#### ST-SOT-12 – PHASE 12: SOT INTAKE
- [x] ~~WI-SOT-12-01 · neue Idee erfassen~~
- [x] ~~WI-SOT-12-02 · neuen Plan erfassen~~
- [x] ~~WI-SOT-12-03 · neue Entscheidung erfassen~~
- [x] ~~WI-SOT-12-04 · neue Regel erfassen~~
- [x] ~~WI-SOT-12-05 · Intake klassifizieren~~
  Die vier Intake-Typen werden als nicht bindende Vorschläge klassifiziert und
  im gemeinsamen operativen Intake-Nachweis gespeichert. Impact, Conflict,
  Freigabe und SoT-Update bleiben getrennte Folgeschritte.
#### ST-SOT-13 – PHASE 13: SOT IMPACT CHECK
- [x] ~~WI-SOT-13-01 · zuständiges Modul bestimmen~~
- [x] ~~WI-SOT-13-02 · autoritative Source bestimmen~~
- [x] ~~WI-SOT-13-03 · Dependencies bestimmen~~
- [x] ~~WI-SOT-13-04 · bestehende Regel suchen~~
- [x] ~~WI-SOT-13-05 · neue vs. bestehende Regel vergleichen~~
- [x] ~~WI-SOT-13-06 · belegten bestehenden Regelkatalog je zuständigem Modul aufbauen und Coverage nachweisen; fehlende Bereiche bleiben Unknown~~
- [x] ~~WI-SOT-13-07 · betroffene Regelbereiche inventarisieren und ihre Abdeckung nachweisen, bevor ein konkreter Vorschlag ohne Unknowns weitergegeben wird~~
  Bisher sind 19 genaue Auszüge aus acht autoritativen Quellen geprüft.
  `DEC-REL-002` besitzt einen vollständig inventarisierten, gegen aktuelle
  Quellbytes geprüften Pilotabschnitt. Sämtliche acht Modulabdeckungen und
  modulübergreifende Suchlücken bleiben ausdrücklich `partial`/`Unknown`.
  Generische Abschnittsfindung für die acht aktiven Quellen und
  vorschlagsbezogene Mehrfachbereichsprüfung sind lokal implementiert und
  getestet. Quellengebundene Reviewer-Dispositionen und ihre Disk-Prüfung sind
  implementiert; globale Kataloglücken bleiben sichtbar. Siehe
  [Scope-Nachweis](../sot-optimization/reviews/scope-review-2026-09-26.md).
  Im realen Projektpilot wurden alle 281 Struktureinheiten dispositioniert und
  die fünf betroffenen Regeln vollständig geprüft. Vorschlagsbezogene Unknowns
  sind geschlossen; acht globale Lücken bleiben ausdrücklich erhalten.
#### ST-SOT-14 – PHASE 14: CONFLICT CHECK
- [x] ~~WI-SOT-14-01 · Duplikate erkennen~~
- [x] ~~WI-SOT-14-02 · widersprüchliche Regeln erkennen~~
- [x] ~~WI-SOT-14-03 · Superseding erkennen~~
- [x] ~~WI-SOT-14-04 · Erweiterung erkennen~~
- [x] ~~WI-SOT-14-05 · Nutzerentscheidung nur bei echtem Konflikt erzeugen~~
- [x] ~~WI-SOT-14-06 · Review-Evidenz und Konfliktentscheidung im gemeinsamen Governance-Ablauf verbindlich speichern und mit Intake-/Regelkatalog-Abdeckung verbinden~~
  Texttreffer allein werden nicht als fachliche Beziehung gewertet; die
  lokale Engine benötigt explizite Review-Eingaben und ändert keine Regel.
  Das lokale Eventlog speichert Vorschlag, Impact, Review und Konfliktergebnis
  mit Revisions-/Hash-Prüfung. Der Originalimport wurde im Projektpilot geprüft.
#### ST-SOT-15 – PHASE 15: APPROVAL FLOW
- [x] ~~WI-SOT-15-01 · IDEA~~
- [x] ~~WI-SOT-15-02 · PROPOSED~~
- [x] ~~WI-SOT-15-03 · APPROVED~~
- [x] ~~WI-SOT-15-04 · SUPERSEDED~~
- [x] ~~WI-SOT-15-05 · optional REJECTED~~
- [x] ~~WI-SOT-15-06 · Approval-Gates implementieren~~
- [x] ~~WI-SOT-15-07 · Nutzerentscheidungen mit nachprüfbarer Provenienz dauerhaft im gemeinsamen Governance-Zustand speichern und vor SoT-Änderung erneut prüfen~~
  Die lokale Übergangsfunktion erteilt weder Design- noch Release- oder
  Live-Freigabe und ändert keine autoritative Quelle. Das Eventlog nimmt
  Entscheidungen nur über einen vom vertrauenswürdigen Aufrufer gestellten
  Authentifizierungsprüfer an. Das SoT-Update liest das hashgeprüfte Eventlog
  erneut und ruft den Authentifizierungsprüfer unmittelbar vor Anwendung
  nochmals auf. Ein Importadapter bindet Originalnachweis und exakten
  Vorschlagsinhalt an extern vorgegebene Vertrauensanker; Datum und Importzeit
  bleiben getrennt. Die reale Übernahme vorhandener, passender Nutzernachweise
  ist im realen Projektpilot durchgängig geprüft und im Decision Store rev3
  gespeichert. Siehe
  [Evidenzadapter](../sot-optimization/reviews/user-decision-evidence-2026-09-26.md).
#### ST-SOT-16 – PHASE 16: SOT UPDATE
- [x] ~~WI-SOT-16-01 · autoritative Quelle aktualisieren~~
- [x] ~~WI-SOT-16-02 · bestehende Regel erweitern statt duplizieren~~
  Authentisierte EXTEND-/SUPERSEDE-Reviews erzwingen den zugehörigen FAST-/FULL-Modus; der Nachweis ist an den Projekt-Auditpfad gebunden.
- [ ] TODO – WI-SOT-16-03 · ersetzte Regel markieren
- [ ] TODO – WI-SOT-16-04 · Dependencies aktualisieren
- [ ] TODO – WI-SOT-16-05 · Traceability aktualisieren
  **Nachweisstand vor dem Projektpilot:** Eine freigabe- und hashgeprüfte
  additive Vorschau ist vorhanden. Ein
  hashgebundener atomarer Fachmodul-Write mit
  aktueller Registry-/Approval-Revalidierung, Post-Validation-Pflicht und
  exaktem Rollback ist verfügbar; er wurde noch nicht auf eine Projektquelle
  angewendet. Dependency-/Traceability-Updates,
  semantische Erweiterung/Superseding und der durchgängige Projektablauf
  bleiben offen. Zielanker und Baseline sind jetzt an die persistierte Freigabe
  gebunden; ein dauerhaftes Journal ermöglicht geprüfte Crash-Recovery. Siehe
  [Schreibschutz-Nachweis](../sot-optimization/reviews/sot-write-boundary-2026-09-26.md).

Der lokale Integrationspfad `tools/sot/governance-workflow.mjs` verbindet importierte Entscheidungsnachweise, Scope-/Konfliktprüfung, Fachmodul-Write und Post-Validation. Seine isolierten Integrationstests prüfen auch Rücknahme, Änderungen an abhängigen Quelldateien und Prozessabbruch.
Der Projektpilot ist lokal abgenommen; WI-SOT-16-01 wurde nach unabhängigem
Review über gehashte Originalartefakte tatsächlich in den Workerzustand `Done`
integriert. [Abnahme und Grenzen](../sot-optimization/reviews/project-governance-pilot-2026-09-26.md).
#### ST-SOT-17 – PHASE 17: SOT POST VALIDATION
- [ ] TODO – WI-SOT-17-01 · SoT-Konsistenz prüfen
- [ ] TODO – WI-SOT-17-02 · Contracts prüfen
- [ ] TODO – WI-SOT-17-03 · Dependencies prüfen
- [x] ~~WI-SOT-17-04 · Delta validieren~~
- [x] ~~WI-SOT-17-05 · erforderlichen FAST/FULL CHECK ausführen~~
  Der reale Metadatenpilot hat Delta, FAST CHECK und acht Post-Validation-
  Prüfungen bestanden. Fachliche SoT-/Traceability-Validatoren sowie konkrete
  FULL-Checker für weitere Fachmodule bleiben offen. Keine globale Abnahme.
#### ST-SOT-18 – PHASE 18: DEFINITION-OF-DONE GUARDS
Technisch verhindern:
- [x] ~~WI-SOT-18-01 · DONE bei fehlendem SoT-Update~~
- [x] ~~WI-SOT-18-02 · DONE bei ungelöstem Conflict~~
- [x] ~~WI-SOT-18-03 · DONE bei fehlgeschlagener erforderlicher Prüfung~~
- [x] ~~WI-SOT-18-04 · DONE bei Contract-Bruch~~
- [x] ~~WI-SOT-18-05 · DONE bei fehlender Dependency~~
- [x] ~~WI-SOT-18-06 · DONE bei fehlgeschlagener Konsistenzprüfung~~
  Alle sechs negativen Schutzbedingungen sind lokal abgenommen. Der Worker-
  Übergang verlangt einen vertrauenswürdigen Evidenzprüfer unter Schreibsperre;
  der Governance-Adapter prüft gepinnte Artefakte, Quelle und Scope erneut.
  Fehlende Fachprüfer blockieren korrekt. Positive Fachmodulabnahmen bleiben
  bei WI-SOT-04-10 / 07-10 / 08-09 und ST-SOT-31 offen.
  [Unabhängige Abnahme](../sot-optimization/reviews/done-guard-acceptance-2026-09-26.md).
### WS-SOT-W3 – WSJF / MULTI-AGENT
#### ST-SOT-19 – PHASE 19: WSJF-INTEGRATION
- [x] ~~WI-SOT-19-01 · bestehende WSJF-Regeln übernehmen~~
  Das eigenständige WSJF-Bewertungsmodul besitzt die vollständige 67-Abschnitts-Zuordnung, schützt vor Ausführungsaktivierung und ist per begrenztem FULL CHECK abgenommen. [Nachweis](../sot-optimization/reviews/wsjf-authority-full-check-2026-09-26.md).
- [x] ~~WI-SOT-19-02 · Business Value~~
  Evidenzgebundene, nicht aktivierende Vorschläge prüfen Quellpfad und Auszug,
  schützen bestätigte/überschriebene Werte und markieren Ausführung sowie Persistenz
  ausdrücklich als nicht autorisiert. [FAST-CHECK](../sot-optimization/reviews/wsjf-business-value-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-19-03 · Time Criticality~~
  Evidenzgebundene Vorschläge prüfen Quellpfad und Auszug; zeitbezogene Faktoren
  verlangen zusätzlich einen ISO-Zeitpunkt. Ausführung und Persistenz bleiben
  nicht autorisiert. [FAST-CHECK](../sot-optimization/reviews/wsjf-time-criticality-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-19-04 · Risk Reduction / Opportunity Enablement~~
  Evidenzgebundene, nicht aktivierende Vorschläge decken Risikoabbau und Enablement ab. [FAST-CHECK](../sot-optimization/reviews/wsjf-risk-opportunity-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-19-05 · Job Size~~
  Repositorygebundene relative Vorschläge schließen manuelle Score-Injektion aus und erzwingen bei 13/20 eine Zerlegungsprüfung. [FAST-CHECK](../sot-optimization/reviews/wsjf-job-size-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-19-06 · Confidence~~
- [x] ~~WI-SOT-19-07 · bestehende relative Skala erhalten~~
- [x] ~~WI-SOT-19-08 · Priorisierungsworkflow integrieren~~
  WSJF sortiert ausschließlich vollständig bewertete, bereits ausführbare Kandidaten und autorisiert keine Zustandsänderung. [FAST-CHECK](../sot-optimization/reviews/wsjf-workflow-fast-check-2026-09-26.md).
  Ein isolierter Rechen-/Queue-Prototyp deckt Skala, Begründung, Confidence,
  geschützten Business Value, große Stories, Prioritäts-Override, erfüllte
  Hard Dependencies und explizite Vergleichsräume ab.
  Vollständige 67-Abschnitts-Traceability, persistierte Audit-Neubewertung und
  Governance-End-to-End-Aktivierung bleiben offen; siehe
  [ursprünglichen Prüfbericht](../sot-optimization/reviews/wsjf-scoring-2026-09-26.md).
  Confidence und Skala sind nach unabhängigem Review lokal abgeschlossen
  (22/22 Tests; [aktueller Nachweis](../sot-optimization/reviews/wsjf-safety-2026-09-26.md)).
  Die übrige Projektbewertung, gemeinsame Persistenz und Aktivierung bleiben offen.
#### ST-SOT-20 – PHASE 20: WORKER / MULTI-AGENT
- [x] ~~WI-SOT-20-01 · Work-Item-Claiming~~
- [x] ~~WI-SOT-20-02 · Worker Ownership~~
- [x] ~~WI-SOT-20-03 · Locking~~
- [x] ~~WI-SOT-20-04 · parallele Slices koordinieren~~
  Die lokale Koordination leitet aus der bestehenden Ausführungsplanung nur
  konfliktfreie Zuweisungsvorschläge für mindestens zwei freie Worker ab.
  Jeder Slice muss `READY`, `ELIGIBLE_FOR_CLAIM`, `Parallel Safe` und mit
  exakt gleichem geprüftem Write Scope vorliegen; WSJF bleibt unverändert.
  Der Vorschlag kann weder Claim noch Ausführung auslösen. Siehe
  [FAST-CHECK](../sot-optimization/reviews/parallel-slices-fast-check-2026-09-26.md).
- [ ] TODO – WI-SOT-20-05 · Dependency Awareness
- [x] ~~WI-SOT-20-06 · Handover~~
- [x] ~~WI-SOT-20-07 · Konflikterkennung~~
- [x] ~~WI-SOT-20-08 · Worker-Status~~
- [x] ~~WI-SOT-20-09 · Ergebnisintegration~~
- [x] ~~WI-SOT-20-10 · lokalen gemeinsamen Worker-State an reale Chat-/Controller-Abläufe und Planstatus synchronisieren; keine standortübergreifende Freigabe aus dem Dateiprototyp ableiten~~
  Der lokale Controller-Snapshot zeigt Plan- und Worker-Status gemeinsam; unzugeordnete Scopes bleiben sichtbar und nicht autorisiert. [FAST-CHECK](../sot-optimization/reviews/worker-runtime-fast-check-2026-09-26.md).
  Der Dateistand ist ausschließlich operativ und enthält keinen zweiten Backlog.
  Claims, Übergabe und Done-Gates sind lokal transaktional geprüft; Queue,
  Dependency-Freigabe und reale Cross-Chat-Nutzung bleiben offen.
#### ST-SOT-21 – PHASE 21: PARALLEL EXECUTION ENGINE
- [x] ~~WI-SOT-21-01 · parallelisierbare Work Items erkennen~~
  Der reine Execution Planner leitet geprüfte, disjunkte Kandidaten ab und erzeugt keine alternativen Claims. [Nachweis](../sot-optimization/reviews/execution-planner-2026-09-26.md).
- [x] ~~WI-SOT-21-02 · Dateikonflikte erkennen~~
  Aktive Write Scopes werden rein lesend auf Überschneidungen und fehlende Koordinierung geprüft. [FAST-CHECK](../sot-optimization/reviews/file-conflicts-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-21-03 · Dependency-Konflikte erkennen~~
  Harte transitive Abhängigkeiten zwischen parallelen Work Items werden als erforderliche Reihenfolge abgeleitet. [FAST-CHECK](../sot-optimization/reviews/dependency-conflicts-fast-check-2026-09-26.md).
- [x] ~~WI-SOT-21-04 · Worker-Scope definieren~~
- [x] ~~WI-SOT-21-05 · erlaubte Dateien definieren~~
- [x] ~~WI-SOT-21-06 · verbotene Dateien definieren~~
- [x] ~~WI-SOT-21-07 · Merge-Reihenfolge definieren~~
  Harte Abhängigkeiten und kollidierende Write Scopes ergeben rein ableitende, nicht autorisierende Integrationsgruppen. [FAST-CHECK](../sot-optimization/reviews/merge-order-fast-check-2026-09-26.md).
#### ST-SOT-22 – PHASE 22: CROSS-CHAT / HANDOVER
- [x] ~~WI-SOT-22-01 · Chat-Handover-Modell~~
- [x] ~~WI-SOT-22-02 · Work-Item-Kontext~~
- [x] ~~WI-SOT-22-03 · Statusübergabe~~
- [x] ~~WI-SOT-22-04 · Decision-Handover~~
- [x] ~~WI-SOT-22-05 · SoT-Handover~~
- [x] ~~WI-SOT-22-06 · keine konkurrierenden Wahrheiten zwischen Chats~~
  Empfangene Übergabepakete werden vor Verwendung gegen den maßgeblichen
  Plan, den dauerhaften Worker-State und – falls enthalten – das registrierte
  aktive SoT-Modul abgeglichen. Abweichungen, unbekannte Schattenfelder und
  jede Autoritätserweiterung werden lokal abgewiesen; der Check bleibt selbst
  rein lesend und autorisiert keine Ausführung oder alternative Arbeitsliste.
### WS-SOT-W4 – MODULARISIERUNG
#### ST-SOT-23 – PHASE 23: LEAN SCRUM CORE
- [x] ~~WI-SOT-23-01 · prüfen, welche Regeln wirklich in docs/scrum-plan.md bleiben müssen~~
- [x] ~~WI-SOT-23-02 · Fachdetails identifizieren~~
- [ ] TODO – WI-SOT-23-03 · Fachmodule definieren
- [ ] TODO – WI-SOT-23-04 · Contracts herstellen
- [ ] TODO – WI-SOT-23-05 · Module zuerst aufbauen
- [ ] TODO – WI-SOT-23-06 · erst danach redundante Details aus dem Core entfernen
- [ ] TODO – WI-SOT-23-07 · Golden-Baseline-Delta prüfen
Die Core-Regeln und Fachdetails wurden gezielt inventarisiert. Das ist keine
Freigabe zur Entfernung auditierter Inhalte.
[Modulinventar und Grenzen](../sot-optimization/reviews/module-preparation-2026-09-26.md).
#### ST-SOT-24 – PHASE 24: FACHMODULE
Mindestens vorbereiten:
- [x] ~~WI-SOT-24-01 · Source of Truth~~
- [ ] TODO – WI-SOT-24-02 · WSJF
- [ ] TODO – WI-SOT-24-03 · Cards / Board
- [x] ~~WI-SOT-24-04 · Analytics~~
- [ ] TODO – WI-SOT-24-05 · CMS
- [ ] TODO – WI-SOT-24-06 · Video Production
SoT und Analytics besitzen bereits zugeordnete autoritative Fachdateien. Ihre
Vorbereitung ist belegt; die jeweilige operative Umsetzung bleibt separat im
Backlog nachvollziehbar.
Nur vorhandene Anforderungen übernehmen.
Keine unnötige Modulbildung nur um der Modularisierung willen.
#### ST-SOT-25 – PHASE 25: GENERIERTE GESAMTSICHT
- [ ] TODO – WI-SOT-25-01 · Gesamtansicht aus Modulen erzeugen
- [ ] TODO – WI-SOT-25-02 · klar als generiert kennzeichnen
- [ ] TODO – WI-SOT-25-03 · keine zweite autoritative Quelle daraus erzeugen
### WS-SOT-W5 – MONITORING & END-TO-END
#### ST-SOT-26 – PHASE 26: STATUS / MONITORING
Implementieren:
Phase
Work Item
Status
Aktuell
Nächster Schritt
Blocker
Active Workers
Next Recommended
Parallel Candidates
Done / Total
Progress %
#### ST-SOT-27 – PHASE 27: PLANPFLEGE
- [x] ~~WI-SOT-27-01 · neue SoT-Implementierungsliste aus dem historischen Ausbauplan herauslösen, als einziges Fachmodul führen und additiv an den Golden Scrum Core anbinden~~
- [ ] BLOCKED – WI-SOT-27-02 · Legacy Ausbauplan Reference Cleanup erst nach dem globalen eintragsweisen Planwechsel-Gate und Klärung der dokumentierten Holds ausführen; Altbestand bis dahin erhalten
- [x] ~~WI-SOT-27-03 · Planregister und globalen Validator auf Core-/Fachmodulrollen umstellen und das offene historische Planwechsel-Gate explizit melden~~
  Der globale Planabgleich bleibt `PENDING`; die alte Arbeitsliste wird bis
  zum bestandenen Gate ausdrücklich als noch aktiv erkannt.
Der Implementierungsplan wird laufend aktualisiert.
Erledigte Punkte:
Beispiel: `[x] ~~Work Item~~`.
Aktive Punkte:
IN_PROGRESS
Blockierte Punkte:
BLOCKED
Neue entdeckte notwendige Arbeit wird in denselben bestehenden Implementierungsplan aufgenommen.
Keine parallelen Fortschrittspläne.
#### ST-SOT-28 – PHASE 28: FORTSCHRITTSCOUNTER
- [x] ~~WI-SOT-28-01 · Work-Item-Status eindeutig parsen, Counter automatisch berechnen und gespeicherte Anzeige gegen tatsächliche Items prüfen~~
  `node tools/sot/progress.mjs --check` prüft alle eindeutigen Items und den
  gespeicherten Counter; drei gezielte Tests decken veraltete Anzeigen,
  doppelte IDs und fehlende Status ab.
Immer aus dem tatsächlichen Plan berechnen:
Total
Done
In Progress
Ready
Blocked
Open
Progress %
#### ST-SOT-29 – PHASE 29: NEXT-BEST-WORK
Nach jedem abgeschlossenen Work Item automatisch bestimmen:
NEXT RECOMMENDATION
Priorität:
1. Critical Path Blocker
2. Enabler mit vielen Nachfolgern
3. Dependency-Unblocker
4. kleine High-Enablement-Arbeit
5. danach normale Priorisierung / WSJF
Zusätzlich:
PARALLEL RECOMMENDATION
wenn sinnvoll.
#### ST-SOT-30 – PHASE 30: GIT HYGIENE
- [ ] TODO – WI-SOT-30-01 · vor Slice git status
- [ ] TODO – WI-SOT-30-02 · fremde Änderungen respektieren
- [ ] TODO – WI-SOT-30-03 · Work Items sauber trennen
- [ ] TODO – WI-SOT-30-04 · kleine nachvollziehbare Commits
- [ ] TODO – WI-SOT-30-05 · Work-Item-ID im Commit
- [ ] TODO – WI-SOT-30-06 · keine Misch-Commits
- [ ] TODO – WI-SOT-30-07 · parallele Worker bevorzugt über getrennte Worktrees/Branches oder disjunkte Dateien
- [ ] TODO – WI-SOT-30-08 · kontrollierte Integration
#### ST-SOT-31 – PHASE 31: END-TO-END VALIDATION
Die sieben bereits beauftragten Abschlussprüfungen erhalten eigene Work-Item-IDs,
weil ihr bisheriger Fließtext keine einzeln prüfbare Statuszuordnung ermöglichte.
- [ ] TODO – WI-SOT-31-01 · vollständigen realistischen Workflow von Idee bis geprüftem DONE nachweisen
- [ ] TODO – WI-SOT-31-02 · lokale Änderung im integrierten Ablauf prüfen
- [ ] TODO – WI-SOT-31-03 · Cross-Domain-Änderung mit begrenztem FULL CHECK prüfen
- [ ] TODO – WI-SOT-31-04 · Contract-Bruch im integrierten Ablauf sperren
- [ ] TODO – WI-SOT-31-05 · parallele Worker mit Konflikt- und Integrationskontrolle prüfen
- [ ] TODO – WI-SOT-31-06 · echten Konflikt ohne stille Regeländerung behandeln
- [ ] TODO – WI-SOT-31-07 · Rollback und exakte Golden-Baseline-Recovery im integrierten Ablauf nachweisen
Vollständigen realistischen Workflow prüfen:
Neue Idee
→ Work Item
→ SoT Intake
→ Impact Graph
→ FAST/FULL Entscheidung
→ Worker Assignment
→ Implementierung
→ SoT Update
→ Delta Audit
→ DONE
Zusätzlich testen:
- lokale Änderung
- Cross-Domain-Änderung
- Contract-Bruch
- parallele Worker
- Konflikt
- Rollback
### KORRIGIERTE DONE-REGEL
NICHT jedes Work Item braucht einen FULL CHECK.
Ein Work Item darf DONE werden, wenn:
- die Implementierung bzw. geplante Arbeit abgeschlossen ist;
- die für dieses Item relevanten Tests bestanden sind;
- der vom Impact-System geforderte Prüfmodus bestanden ist;
- Dependencies konsistent sind;
- der Plan aktualisiert wurde;
- notwendiges SoT-Update durchgeführt wurde;
- Git sauber ist;
- Golden Baseline nicht verletzt wurde.
Konkret:
Kein semantischer Impact
NO_CHECK bzw. nur minimale Struktur-/Git-Prüfung.
Lokaler normaler Impact
FAST_CHECK_PASS
reicht vollständig aus.
Nur bei Eskalation
FULL_CHECK_PASS
erforderlich.
FULL CHECK ist ausdrücklich die Ausnahme und darf nicht routinemäßig für jedes Work Item ausgeführt werden.
### AUTOMATISCHE WEITERARBEIT
Nach jedem Work Item:
1. Status aktualisieren
2. erledigten Punkt durchstreichen
3. Counter aktualisieren
4. Dependencies neu bewerten
5. nächsten sinnvollsten Schritt empfehlen
6. parallele Kandidaten bestimmen
7. sofern kein echter Nutzerblocker besteht, automatisch weiterarbeiten
### KOMPAKTE STATUSAUSGABE
Während der Umsetzung regelmäßig:
Phase:
Current Work Items:
Active Workers:
Status:
Next Recommended:
Parallel Candidates:
Blocked:
Done / Total:
Progress:
### ZIEL
Am Ende soll das System nicht mehr:
kleine Änderung
→ riesigen Plan komplett lesen
→ alles cross-checken
→ Full Audit
machen.
Sondern normalerweise:
Änderung
→ Impact
→ 2–3 betroffene Module
→ FAST CHECK
→ Delta Audit
→ DONE
und nur bei wirklich großer Auswirkung:
⚠ FULL CHECK REQUIRED
Halte diese vollständige Liste während der gesamten Umsetzung sichtbar und aktuell. Sie ist das zentrale Execution Backlog für diesen Umbau.
