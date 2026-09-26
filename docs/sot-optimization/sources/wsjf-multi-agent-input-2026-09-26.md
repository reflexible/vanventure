# Eingangsquelle: WSJF-/Multi-Agent-Konzept

Quellkopie der vollständigen 67-Punkte-Fassung aus der Nutzerantwort vom 26.09.2026.
Nur Preservation-/Traceability-Evidenz; kein zweiter aktiver Plan und keine
separat freigegebene Source of Truth. Für das neue SoT-Epic steuern
`docs/scrum-plan.md` und dessen autoritatives Fachmodul die Arbeit; der
historische Ausbauplan bleibt nur bis zum gesonderten Planwechsel-Gate aktiv.

---

# WSJF- und Multi-Agent-Scrum-Konzept

## Ziel

Alle Epics und User Stories sollen zusätzlich zur bestehenden Scrum-Struktur halbautomatisch nach WSJF priorisiert werden.

Gleichzeitig sollen mehrere Codex-Agents, Worker oder separate Chats wie ein gemeinsames Scrum-Team arbeiten können:

- auf einem gemeinsamen Product Backlog
- mit einer gemeinsamen Priorisierung
- mit gemeinsamer Traceability
- mit klaren Claims und Zuständigkeiten
- mit paralleler Bearbeitung unabhängiger Aufgaben
- mit gegenseitigem Review
- ohne konkurrierende Backlogs oder widersprüchliche Projektzustände

Grundprinzip:

> One Product Backlog.
> One Scrum State.
> One Traceability Model.
> One WSJF Model.
> Multiple parallel Agents.

---

# 1. WSJF-Grundmodell

WSJF steht für:

**Weighted Shortest Job First**

Formel:

**WSJF = Cost of Delay / Job Size**

Dabei gilt:

**Cost of Delay = User / Business Value + Time Criticality + Risk Reduction / Opportunity Enablement**

Codex soll alle dafür notwendigen Werte automatisch vorschlagen.

WSJF ist eine Priorisierungshilfe und keine automatische Ausführungsentscheidung.

---

# 2. Einheitliche Bewertungsskala

Für folgende Werte darf ausschließlich diese relative Skala verwendet werden:

**1, 2, 3, 5, 8, 13, 20**

Bedeutung:

- 1 = sehr gering
- 2 = gering
- 3 = eher gering
- 5 = mittel
- 8 = hoch
- 13 = sehr hoch
- 20 = extrem

Keine anderen Zwischenwerte verwenden.

---

# 3. User / Business Value

Codex erzeugt automatisch einen Vorschlag für den User / Business Value.

Berücksichtigt werden insbesondere:

- konkreter Nutzen für Benutzer
- Häufigkeit der Nutzung
- Bedeutung für zentrale Workflows
- Nutzen für Besucher oder Kunden
- Beitrag zu Projektzielen
- Beseitigung bestehender Probleme
- Ermöglichung wichtiger Fähigkeiten

Codex dokumentiert zusätzlich eine kurze Begründung.

Der Benutzer muss den Wert nicht für jede Story manuell eingeben.

Status des Werts:

- Proposed
- Confirmed
- Overridden

Standard:

`Value Status: Proposed`

Der Benutzer kann den Wert jederzeit bestätigen oder überschreiben.

Manuell bestätigte oder überschriebene Werte haben Vorrang und dürfen nicht automatisch verändert werden.

---

# 4. Time Criticality

Codex bewertet Time Criticality automatisch.

Dabei berücksichtigt Codex insbesondere:

- feste Deadlines
- Releases
- geplante Veröffentlichungen
- saisonale Relevanz
- externe Abhängigkeiten
- Blockierung anderer Arbeit
- Wertverlust bei späterer Umsetzung

Codex dokumentiert eine kurze Begründung.

Eine manuelle Bestätigung ist standardmäßig nicht notwendig.

---

# 5. Risk Reduction / Opportunity Enablement

Codex bewertet automatisch:

## Risk Reduction

Beispiele:

- technische Risiken reduzieren
- Security-Risiken reduzieren
- Datenschutzrisiken reduzieren
- Vendor Lock-in reduzieren
- instabile Architektur beseitigen
- unbekannte Annahmen klären

## Opportunity Enablement

Beispiele:

- spätere Stories ermöglichen
- wiederverwendbare Fähigkeiten schaffen
- neue Produktmöglichkeiten eröffnen
- zukünftigen Implementierungsaufwand reduzieren
- gemeinsame Infrastruktur bereitstellen

Codex dokumentiert eine kurze Begründung.

Eine manuelle Bestätigung ist standardmäßig nicht erforderlich.

---

# 6. Job Size

Codex bewertet Job Size anhand des tatsächlichen Projekt- und Repository-Zustands.

Berücksichtigt werden insbesondere:

- Anzahl betroffener Komponenten
- UI
- Backend
- API
- Datenbank
- Migrationen
- Tests
- Security
- vorhandene Komponenten
- technische Abhängigkeiten
- bekannte Komplexität
- unbekannte Komplexität

Job Size ist eine relative Größe.

Job Size ist keine Stunden- oder Tagesabschätzung.

Erlaubte Werte:

**1, 2, 3, 5, 8, 13, 20**

---

# 7. Große Stories

Wenn Job Size:

**13 oder 20**

beträgt, muss Codex automatisch prüfen:

> Kann diese Story in kleinere vertikale, eigenständig wertliefernde Stories zerlegt werden?

Wenn ja:

- Story sinnvoll zerlegen
- Traceability erhalten
- Acceptance Criteria korrekt aufteilen
- WSJF für die neuen Stories neu berechnen

Eine Story mit Job Size 13 oder 20 darf nur bestehen bleiben, wenn weitere Zerlegung den eigenständigen fachlichen Wert zerstören würde.

---

# 8. Confidence

Für jede automatische Bewertung dokumentiert Codex eine Confidence:

- High
- Medium
- Low

Beispiel:

`Job Size: 5`
`Confidence: High`

oder:

`Job Size: 8`
`Confidence: Low`

Bei `Low Confidence` muss Codex kurz dokumentieren:

- welche Information fehlt
- welche Annahme unsicher ist
- welcher technische Bereich noch nicht ausreichend analysiert wurde

Low Confidence verhindert die WSJF-Berechnung nicht.

Die Unsicherheit muss jedoch sichtbar bleiben.

---

# 9. WSJF-Berechnung

Codex berechnet automatisch:

**Cost of Delay = User / Business Value + Time Criticality + Risk Reduction / Opportunity Enablement**

danach:

**WSJF = Cost of Delay / Job Size**

Beispiel:

User / Business Value: 13
Time Criticality: 5
Risk Reduction / Opportunity Enablement: 3
Job Size: 5

Cost of Delay:

`13 + 5 + 3 = 21`

WSJF:

`21 / 5 = 4.2`

WSJF selbst darf niemals manuell geschätzt werden.

---

# 10. Priorisierung

Innerhalb eines vergleichbaren Backlogs sollen Stories grundsätzlich nach WSJF sortiert werden.

Ein höherer WSJF bedeutet:

> höherer erwarteter Wert relativ zur Größe der Arbeit.

WSJF ist jedoch keine automatische Ausführungsentscheidung.

Eine andere Reihenfolge kann gerechtfertigt sein durch:

- harte Abhängigkeiten
- Security
- Datenschutz
- regulatorische Anforderungen
- technische Blocker
- notwendige Enabler
- feste Deadlines
- explizite manuelle Prioritätsentscheidungen

Abweichungen von der WSJF-Reihenfolge müssen kurz begründet werden.

---

# 11. Manuelle Arbeit minimieren

Standardverhalten:

Codex schlägt alle WSJF-relevanten Werte automatisch vor.

Der Benutzer muss Werte nur ändern, wenn:

- User / Business Value nicht der eigenen Einschätzung entspricht
- externe Informationen Codex unbekannt sind
- eine harte Priorität bewusst gesetzt werden soll

Keine Story darf blockiert werden, nur weil ein vorgeschlagener Value noch nicht manuell bestätigt wurde.

Grundregel:

Codex:

**analysiert → schlägt vor → begründet → berechnet**

Der Benutzer:

**korrigiert nur bei Bedarf**

---

# 12. Story-Format

Jede Story enthält mindestens:

- ID
- Titel
- User Story
- Value Description
- User / Business Value
- Value Status
- Time Criticality
- Risk Reduction / Opportunity Enablement
- Job Size
- Confidence
- Cost of Delay
- WSJF
- Acceptance Criteria
- Dependencies
- Status
- Execution State
- Tasks / Subtasks
- Assigned Agent
- Blocking Stories
- Blocked By
- Parallelization Status
- Conflict Scope
- Integration Status

Beispiel:

### STORY-CMS-017 – Veröffentlichte Inhalte bearbeiten

User Story:

Als Betreiber möchte ich bereits veröffentlichte Inhalte bearbeiten können, damit Änderungen ohne neue technische Veröffentlichung durchgeführt werden können.

Value Description:

Zentraler Workflow für laufende Pflege veröffentlichter Inhalte.

User / Business Value: 13

Value Status: Proposed

Time Criticality: 5

Risk Reduction / Opportunity Enablement: 3

Job Size: 5

Confidence: High

Cost of Delay: 21

WSJF: 4.2

Status: Planned

Execution State: Ready

Parallelization Status: Parallel With Coordination

Conflict Scope:

- frontend/content-editor
- backend/content-api

---

# 13. Bestehende Backlogs erweitern

Bestehende Scrum-Pläne und Stories sollen um die neuen Felder ergänzt werden.

Dabei gilt:

- keine Story neu erfinden
- keine bestehende fachliche Anforderung verändern
- keine Acceptance Criteria entfernen
- keine bestehende Traceability zerstören
- keine ursprüngliche Entscheidung überschreiben

WSJF ist eine zusätzliche Priorisierungsschicht über dem bestehenden Scrum-Modell.

Die Traceability zwischen:

Originalanforderung
→ Epic
→ Story
→ Task
→ Implementierung
→ Test

muss erhalten bleiben.

---

# 14. Gemeinsames Multi-Agent-Scrum-Team

Codex soll nicht als einzelner Worker betrachtet werden.

Mehrere Agents, Worker oder separate Chats dürfen gemeinsam wie Mitglieder eines Scrum-Teams arbeiten.

Alle arbeiten auf demselben gemeinsamen Product Backlog.

Kein Agent darf:

- einen konkurrierenden Backlog anlegen
- eigene Prioritätsregeln etablieren
- eigenständig Projektregeln ändern
- vorhandene Anforderungen neu interpretieren, wenn dies den fachlichen Inhalt verändert
- bereits laufende Arbeit eines anderen Agents ungeprüft überschreiben

---

# 15. Gemeinsamer Scrum-State

Alle Agents benötigen Zugriff auf denselben aktuellen Projektzustand.

Der gemeinsame Scrum-State enthält mindestens:

- Epics
- Stories
- Tasks
- WSJF
- Status
- Execution State
- Dependencies
- Claims
- Blocker
- Agent-Zuweisungen
- Review-Zustand
- Integrationszustand
- offene Benutzerentscheidungen

Dieser Zustand ist die gemeinsame Source of Truth.

---

# 16. Execution State

Zusätzlich zum fachlichen Story-Status erhält jede Story einen technischen Bearbeitungszustand.

Mögliche Execution States:

- Backlog
- Ready
- Claimed
- In Progress
- Review
- Integration
- Blocked
- Done

`Status` beschreibt den Scrum-/fachlichen Zustand.

`Execution State` beschreibt die aktuelle operative Bearbeitung durch das Agent-Team.

---

# 17. Ready Queue

Aus dem Product Backlog wird automatisch eine dynamische:

`Ready Queue`

gebildet.

Eine Story darf nur in die Ready Queue aufgenommen werden, wenn:

- fachliche Anforderung ausreichend klar ist
- Acceptance Criteria vorhanden sind
- relevante Abhängigkeiten dokumentiert sind
- notwendige Vorgänger erfüllt sind
- keine zwingende Benutzerentscheidung den Start verhindert
- technische Bearbeitung sinnvoll begonnen werden kann

Die Ready Queue wird grundsätzlich nach WSJF sortiert.

---

# 18. Pull-Prinzip

Agents erhalten nicht beliebig Arbeit.

Ein freier Agent zieht grundsätzlich die höchstpriorisierte Story aus der Ready Queue, die:

1. Ready ist
2. keine ungelösten Blocker besitzt
3. nicht bereits geclaimt wurde
4. keine unzulässigen Konflikte mit laufender Arbeit erzeugt
5. für den Agent sinnvoll ausführbar ist

Grundregel:

> Highest WSJF among currently executable stories.

Nicht:

> Highest WSJF regardless of dependencies.

---

# 19. Story Claiming

Bevor ein Agent mit einer Story oder einem Task beginnt, muss diese Arbeit geclaimt werden.

Dabei werden mindestens gesetzt:

`Execution State: Claimed`

`Assigned Agent: <Agent-ID>`

`Claimed At: <Timestamp>`

Danach darf kein anderer Agent dieselbe Arbeit eigenständig übernehmen.

Nach tatsächlichem Beginn:

`Execution State: In Progress`

Ein Claim verhindert:

- doppelte Arbeit
- widersprüchliche Änderungen
- parallele Implementierung derselben Story
- unnötige Merge-Konflikte

---

# 20. Claim-Übernahme

Ein Agent darf eine bereits geclaimte Story nur übernehmen, wenn:

- der Claim freigegeben wurde
- der bisherige Agent abgebrochen wurde
- der Controller ein Re-Assignment durchgeführt hat
- der Benutzer ausdrücklich eine neue Zuweisung verlangt hat

Keine stille Übernahme.

---

# 21. Parallelization Status

Jede Story erhält automatisch eine Einstufung:

- Parallel Safe
- Parallel With Coordination
- Sequential
- Unknown

## Parallel Safe

Bearbeitung kann unabhängig von anderer laufender Arbeit erfolgen.

## Parallel With Coordination

Parallele Arbeit ist möglich, aber technische Überschneidungen existieren.

## Sequential

Ein Vorgänger muss zuerst abgeschlossen werden.

## Unknown

Die Konfliktlage ist noch nicht ausreichend bekannt.

---

# 22. Conflict Scope

Vor dem Claim analysiert Codex den wahrscheinlichen Änderungsbereich.

Beispiele:

- frontend/navigation
- frontend/gallery
- frontend/content-editor
- backend/content-api
- database/content-schema
- authentication
- authorization
- analytics
- SEO
- tests
- documentation
- shared-design-system

Ziel:

Parallele Änderungen mit hohem Konfliktrisiko früh erkennen.

---

# 23. Parallelization Potential

Zusätzlich kann Codex dokumentieren:

- High
- Medium
- Low

Dieser Wert beschreibt:

> Wie gut sich eine Story oder deren Tasks parallel bearbeiten lassen.

Parallelization Potential beeinflusst WSJF nicht.

---

# 24. WSJF und Parallelisierung bleiben getrennt

WSJF darf nicht verändert werden, nur weil mehrere Agents parallel arbeiten können.

Insbesondere darf Job Size nicht künstlich kleiner bewertet werden, weil mehrere Worker verfügbar sind.

WSJF beantwortet:

> Wie hoch ist der wirtschaftliche Vorrang relativ zur Größe?

Parallelization Potential beantwortet:

> Wie gut kann die Arbeit auf mehrere Agents verteilt werden?

Diese Konzepte bleiben getrennt.

---

# 25. Story-Zerlegung für Multi-Agent-Arbeit

Codex prüft zusätzlich:

> Kann diese Story sinnvoll in unabhängige, überprüfbare Tasks oder kleinere vertikale Stories zerlegt werden?

Dabei gilt:

Nicht künstlich zerlegen, nur um Agents zu beschäftigen.

Eine Aufteilung ist sinnvoll, wenn:

- Teile unabhängig implementierbar sind
- klare Acceptance Criteria bestehen
- technische Konflikte gering bleiben
- Integration kontrollierbar ist
- Traceability erhalten bleibt

---

# 26. Vertikale Stories bevorzugen

Fachliche Stories sollen möglichst vertikal wertliefernd bleiben.

Technische Tasks dürfen dagegen parallel verteilt werden.

Beispiel:

STORY-CMS-017

Tasks:

- TASK-017-A Backend Content Update API
- TASK-017-B Edit UI
- TASK-017-C Authorization
- TASK-017-D Integration Tests

Wenn A Voraussetzung für B ist:

A zuerst.

Wenn C unabhängig vorbereitet werden kann:

A + C parallel.

Danach B.

Danach D.

---

# 27. Temporäre Agent-Rollen

Agents dürfen unterschiedliche Rollen übernehmen.

## Implementation Agent

Implementiert eine Story oder einen Task.

## Analysis Agent

Analysiert:

- Anforderungen
- Repository
- Abhängigkeiten
- technische Auswirkungen
- mögliche Story-Zerlegung

## Review Agent

Prüft Änderungen eines anderen Agents gegen:

- Acceptance Criteria
- Architekturregeln
- Design Guide
- Security-Regeln
- Projektregeln
- Bildregeln
- Tests

## Test Agent

Führt gezielte Tests durch oder erweitert Testabdeckung.

## Integration Agent

Integriert parallele Änderungen und prüft Konflikte.

## Backlog Refinement Agent

Analysiert kommende Stories und verbessert:

- WSJF-Vorschläge
- Dependencies
- Job Size
- Confidence
- Parallelization Status
- Ready Status

Diese Rollen sind temporär.

Ein Agent ist nicht dauerhaft an eine Rolle gebunden.

---

# 28. Controller / Scrum Coordinator

Ein zentraler Controller koordiniert das virtuelle Scrum-Team.

Aufgaben:

- Product Backlog überwachen
- Ready Queue erzeugen
- WSJF berechnen und aktualisieren
- Claims verwalten
- parallele Arbeit koordinieren
- Blocker erkennen
- Agent-Zuweisungen überwachen
- Reviews koordinieren
- Integration koordinieren
- offene Benutzerentscheidungen sammeln
- Teamstatus bereitstellen

Der Controller soll möglichst nicht selbst implementieren, solange geeignete Worker verfügbar sind.

---

# 29. Controller ist keine zweite Source of Truth

Der Controller besitzt keinen eigenen geheimen Backlog.

Alle Entscheidungen müssen im gemeinsamen Scrum-State dokumentiert werden.

Der Controller darf keine parallele Schattenplanung führen, die nicht im Projektzustand sichtbar ist.

---

# 30. Agent-Auswahl

Bei der Zuweisung oder beim Pull berücksichtigt der Controller:

1. WSJF
2. Ready Status
3. Dependencies
4. Claims
5. Conflict Scope
6. Parallelization Status
7. benötigtes Kontextwissen
8. bereits vom Agent bearbeitete Komponenten
9. Integrationsrisiko

Unnötiger Kontextwechsel soll vermieden werden.

---

# 31. Kontinuierliches Pull-System

Wenn ein Agent eine Arbeit abgeschlossen hat:

1. Ergebnis dokumentieren
2. Story oder Task auf Review oder Integration setzen
3. Claim freigeben
4. nächsten zulässigen Eintrag aus der Ready Queue ziehen

Der Benutzer muss nicht jede einzelne Agent-Zuweisung manuell freigeben.

---

# 32. Benutzerentscheidungen

Wenn eine Story zwingend eine Benutzerentscheidung benötigt:

`Execution State: Blocked`

`Blocked By: User Decision`

Die offene Frage muss konkret dokumentiert werden.

Andere unabhängige Stories dürfen weiterbearbeitet werden.

Eine offene Entscheidung darf nicht das gesamte Team stoppen.

---

# 33. Harte Benutzergrenzen

Ein Agent darf einen Entscheidungspunkt nicht automatisch überschreiten, wenn ausdrücklich:

`User Decision Required`

gesetzt ist.

Der Agent darf:

- analysieren
- Optionen vorbereiten
- Auswirkungen dokumentieren

Der Agent darf nicht:

- die fachliche Entscheidung selbst treffen
- Anforderungen eigenständig verändern
- eine irreversible Richtung wählen

---

# 34. WIP-Limits

Paralleles Arbeiten soll kontrolliert bleiben.

Grundregel:

> Nicht mehr aktive Implementierungsarbeit starten, als sinnvoll reviewed und integriert werden kann.

Standard:

Ein Implementation Agent besitzt maximal eine aktive Story oder einen aktiven Task gleichzeitig.

Neue Arbeit wird erst gezogen, wenn die vorherige Arbeit mindestens:

- Review
- Integration
- Done
- oder ausdrücklich Blocked

ist.

---

# 35. Keine künstliche Auslastung

Agents sollen nicht nur beschäftigt werden, weil sie verfügbar sind.

Wenn keine sichere Implementierungsarbeit vorhanden ist, können freie Agents:

- Refinement durchführen
- Dependencies analysieren
- Tests verbessern
- kommende Stories untersuchen
- Confidence erhöhen
- Risiken identifizieren
- technische Schulden dokumentieren

Keine künstlichen Stories erzeugen.

---

# 36. Review durch anderen Agent

Wenn mehrere Agents verfügbar sind, soll relevante Implementierung möglichst von einem anderen Agent reviewed werden.

Bevorzugtes Modell:

Agent A → Implementierung

Agent B → Review

Agent A → notwendige Korrekturen

Integration Agent → Integration

Besonders wichtig bei:

- Security
- Authentifizierung
- Authorization
- Datenmigrationen
- CMS
- Analytics
- globalen Templates
- Design-Systemen
- zentraler Architektur

---

# 37. Review ist keine neue Fachentscheidung

Review Agents prüfen gegen bestehende Anforderungen.

Sie dürfen nicht:

- fachliche Anforderungen neu erfinden
- Acceptance Criteria still verändern
- Designentscheidungen ersetzen
- Benutzerentscheidungen überschreiben

Gefundene Unklarheiten werden zurück in den Scrum-State geschrieben.

---

# 38. Integration Queue

Fertig implementierte Arbeit gilt nicht automatisch als Done.

Nach Implementierung:

`Execution State: Review`

Danach:

`Execution State: Integration`

Der Integration Agent prüft:

- Merge-Konflikte
- gemeinsame Komponenten
- Tests
- Acceptance Criteria
- Regressionen
- Projektregeln
- Traceability

Erst danach:

`Execution State: Done`

---

# 39. Keine direkte Done-Markierung durch Worker

Ein Implementation Agent soll seine eigene Arbeit nicht direkt als Done markieren.

Er kann maximal auf:

- Review
- Integration

setzen.

Done erfolgt erst nach erfolgreicher Prüfung und Integration.

---

# 40. Re-Evaluation von WSJF

WSJF-Werte dürfen automatisch neu berechnet werden, wenn sich relevante Fakten ändern.

Beispiele:

- Story wurde kleiner
- Abhängigkeit entfällt
- Deadline kommt näher
- Teile wurden bereits implementiert
- Risiko wurde reduziert
- neue Infrastruktur wurde geschaffen

Codex darf neu bewerten:

- Time Criticality
- Risk Reduction / Opportunity Enablement
- Job Size
- Confidence
- Cost of Delay
- WSJF

---

# 41. Geschützte Business Values

Manuell `Confirmed` oder `Overridden` gesetzte User / Business Values dürfen nicht automatisch verändert werden.

Codex darf eine Neubewertung vorschlagen.

Der bestehende manuelle Wert bleibt jedoch erhalten, bis der Benutzer ihn ausdrücklich ändert.

---

# 42. Keine automatische Preemption

Wenn ein Agent bereits sinnvoll an einer Story arbeitet, soll die Arbeit normalerweise abgeschlossen werden.

Eine neu höher priorisierte Story führt nicht automatisch zum Abbruch laufender Arbeit.

Unterbrechung ist nur sinnvoll bei:

- kritischem Security-Problem
- Datenverlust-Risiko
- Produktionsfehler
- harter Deadline
- expliziter Benutzerentscheidung
- bewusst gesetzter Prioritätsänderung

---

# 43. Sprint Planning

WSJF unterstützt Sprint Planning, ersetzt es aber nicht.

Beim Sprint Planning soll Codex automatisch vorschlagen:

- höchstpriorisierte Stories
- Ready Stories
- blockierte Stories
- Dependencies
- Parallelisierungsmöglichkeiten
- Konfliktbereiche
- Enabler
- notwendige Reihenfolge

Ergebnis:

`Sprint Candidate Set`

Der tatsächliche Sprint Scope bleibt eine bewusste Planung.

---

# 44. Sprint Execution Graph

Für den gewählten Sprint Scope soll Codex einen einfachen Ausführungsgraph erzeugen.

Beispiel:

STORY-A
├── TASK-A1 → Agent 1
├── TASK-A2 → Agent 2
└── TASK-A3 → nach A1 + A2

STORY-B → Agent 3

STORY-C
└── wartet auf STORY-A

Der Graph zeigt:

- was parallel läuft
- welche Abhängigkeiten existieren
- was blockiert ist
- wer woran arbeitet
- welche Arbeit als Nächstes gezogen werden kann

---

# 45. Team Status

Der Controller soll jederzeit einen kompakten Teamstatus liefern können.

Beispiel:

## Sprint Status

Active Agents: 4

In Progress:

- Agent 1 → STORY-CMS-017 / Backend
- Agent 2 → STORY-SEO-004
- Agent 3 → STORY-ANALYTICS-003

Review:

- Agent 4 → STORY-CMS-012

Blocked:

- STORY-GALLERY-008 → User Decision
- STORY-CMS-018 → Depends on STORY-CMS-017

Next Ready:

1. STORY-SEO-006 — WSJF 6.4
2. STORY-CMS-021 — WSJF 5.8
3. STORY-VIDEO-003 — WSJF 4.9

Der Status soll kompakt und entscheidungsorientiert bleiben.

---

# 46. Backlog Refinement parallel zur Implementierung

Freie Agents dürfen während laufender Implementierung Refinement-Arbeit durchführen.

Mögliche Aufgaben:

- kommende Stories analysieren
- Job Size verbessern
- Dependencies identifizieren
- Repository-Auswirkungen analysieren
- Acceptance Criteria auf Unklarheiten prüfen
- Parallelisierungsmöglichkeiten erkennen
- Confidence erhöhen
- technische Risiken dokumentieren

Fachliche Anforderungen dürfen dabei nicht eigenständig verändert werden.

---

# 47. Definition of Ready

Eine Story gilt als Ready, wenn mindestens:

- User Story vorhanden
- Value Description vorhanden
- Acceptance Criteria vorhanden
- WSJF berechnet
- Dependencies analysiert
- Job Size vorhanden
- Confidence vorhanden
- Parallelization Status vorhanden
- Conflict Scope ausreichend bekannt
- keine zwingende ungeklärte Entscheidung den Start verhindert

Nicht jede Unsicherheit verhindert Ready.

Nur Unsicherheiten, die eine sinnvolle Implementierung verhindern.

---

# 48. Definition of Done

Eine Story gilt erst als Done, wenn:

- Acceptance Criteria erfüllt
- Implementierung abgeschlossen
- notwendige Tests erfolgreich
- Review abgeschlossen
- Integration abgeschlossen
- relevante Dokumentation aktualisiert
- Traceability erhalten
- Projektregeln eingehalten
- keine bekannten durch die Story verursachten Regressionen bestehen

---

# 49. Agent-Kommunikation über den gemeinsamen Zustand

Agents sollen sich nicht auf Chat-Verläufe anderer Agents verlassen.

Relevante Informationen müssen im gemeinsamen Scrum-State dokumentiert werden.

Dazu gehören:

- technische Entscheidungen
- neue Dependencies
- offene Risiken
- geänderte Job Size
- Blocker
- Review-Ergebnisse
- Integrationshinweise
- betroffene Dateien oder Komponenten

Damit bleiben getrennte Chats synchronisierbar.

---

# 50. Keine versteckte Agent-zu-Agent-Abhängigkeit

Eine Story darf nicht nur deshalb funktionieren, weil Agent A „weiß“, was Agent B gemeint hat.

Alle notwendigen Informationen müssen explizit dokumentiert sein.

Grundsatz:

> Shared state over shared memory.

---

# 51. Technische Übergabe

Bei Übergabe einer Story oder eines Tasks dokumentiert der Agent mindestens:

- was umgesetzt wurde
- welche Dateien oder Komponenten betroffen sind
- welche Tests ausgeführt wurden
- bekannte Einschränkungen
- offene Punkte
- notwendige Folgearbeit
- relevante Entscheidungen

Diese Information dient Review und Integration.

---

# 52. Blocker-Management

Blocker erhalten mindestens:

- Blocker ID
- Beschreibung
- betroffene Story
- Blocked By
- erkannt durch
- notwendige Auflösung
- Status

Blocker dürfen nicht nur in einem Chat erwähnt werden.

Sie müssen im gemeinsamen Scrum-State sichtbar sein.

---

# 53. Abhängigkeiten

Dependencies sollen explizit modelliert werden.

Mindestens:

- Depends On
- Blocks
- Related To

Codex soll harte und weiche Abhängigkeiten unterscheiden.

Harte Dependency:

Story kann technisch oder fachlich nicht sinnvoll begonnen werden.

Weiche Dependency:

Story kann begonnen werden, benötigt aber Koordination oder spätere Integration.

---

# 54. WSJF bei Dependencies

Eine blockierte Story kann einen hohen WSJF besitzen.

Sie darf trotzdem nicht automatisch begonnen werden.

Stattdessen soll Codex prüfen:

> Welche vorgelagerte Story oder welcher Enabler muss zuerst abgeschlossen werden?

Dabei kann es sinnvoll sein, einen Enabler mit niedrigerem eigenem WSJF vorzuziehen, wenn dadurch mehrere hoch priorisierte Stories freigeschaltet werden.

Diese Abweichung muss dokumentiert werden.

---

# 55. WSJF und Enabler

Technische Enabler erhalten ebenfalls WSJF-Werte, wenn sie eigenständig im Backlog geführt werden.

Bei Opportunity Enablement soll berücksichtigt werden:

- wie viele Stories ermöglicht werden
- welcher zukünftige Aufwand reduziert wird
- welche Architekturprobleme beseitigt werden
- welche strategischen Fähigkeiten freigeschaltet werden

Enabler dürfen nicht automatisch höher priorisiert werden als fachliche Stories.

---

# 56. WSJF-Vergleichsraum

WSJF-Werte sollen nur innerhalb sinnvoll vergleichbarer Backlogs direkt gegeneinander verwendet werden.

Beispiele:

Sinnvoll:

- Stories innerhalb eines Produktbacklogs
- Stories innerhalb eines Produktbereichs
- Enabler und Stories desselben Lieferkontexts

Weniger sinnvoll:

- völlig unabhängige Projekte
- Aufgaben mit komplett verschiedenen strategischen Zielen
- Projekte mit unterschiedlichen Bewertungsskalen

Codex soll den Vergleichsraum sichtbar machen, wenn mehrere Backlogs existieren.

---

# 57. Prioritätsüberschreibungen

Der Benutzer kann jederzeit eine bewusste Prioritätsentscheidung setzen.

Beispiel:

`Manual Priority Override: Yes`

`Reason: Muss vor Veröffentlichung fertig sein`

Dies verändert nicht zwingend den WSJF-Wert.

Die Story wird lediglich bewusst außerhalb der automatischen Reihenfolge eingeordnet.

Die Abweichung bleibt nachvollziehbar.

---

# 58. Keine Manipulation des WSJF

WSJF-Werte dürfen nicht künstlich verändert werden, nur um eine gewünschte Reihenfolge zu erzeugen.

Beispiele:

Nicht zulässig:

- Job Size absichtlich kleiner bewerten
- Business Value erhöhen, damit Story nach oben rutscht
- Risk Reduction aufblasen
- Time Criticality ohne sachlichen Grund erhöhen

Wenn eine Story bewusst bevorzugt wird, ist dafür `Manual Priority Override` zu verwenden.

---

# 59. Auditierbarkeit

Jede automatische WSJF-Bewertung soll nachvollziehbar sein.

Mindestens dokumentieren:

- Wert
- Begründung
- Confidence
- Zeitpunkt der Bewertung

Bei Neubewertung zusätzlich:

- vorheriger Wert
- neuer Wert
- Grund der Änderung

---

# 60. Bestehende Entscheidungen schützen

Automatisierung darf vorhandene manuelle Entscheidungen nicht still überschreiben.

Dies gilt insbesondere für:

- Business Value
- Prioritätsüberschreibungen
- fachliche Anforderungen
- Acceptance Criteria
- Architekturentscheidungen
- Designentscheidungen
- Benutzerfreigaben

Codex darf Änderungen vorschlagen, nicht still ersetzen.

---

# 61. Sicherheit bei paralleler Arbeit

Bei paralleler Implementierung gilt:

Keine zwei Agents dürfen gleichzeitig unkoordiniert denselben kritischen Bereich verändern.

Besonders sensibel:

- Datenbankschema
- Authentifizierung
- Authorization
- zentrale Konfiguration
- globale Templates
- gemeinsames Design-System
- zentrale API-Verträge
- Deployment-Konfiguration

Diese Bereiche werden standardmäßig mindestens als:

`Parallel With Coordination`

behandelt.

---

# 62. Integration vor Geschwindigkeit

Mehr Agents bedeuten nicht automatisch bessere Geschwindigkeit.

Die Zielgröße ist:

> hoher Durchsatz bei kontrollierbarer Integration.

Der Controller soll daher vermeiden:

- zu viele parallele Branches
- viele halb fertige Stories
- unnötige Merge-Konflikte
- stark überlappende Änderungen
- technische Entscheidungen ohne Koordination

---

# 63. Controller-Entscheidungslogik

Wenn ein Agent frei wird, prüft der Controller in dieser Reihenfolge:

1. Gibt es Ready Work?
2. Welche Story hat den höchsten WSJF?
3. Ist sie blockiert?
4. Ist sie bereits geclaimt?
5. Gibt es Konflikte mit laufender Arbeit?
6. Ist sie für parallele Ausführung geeignet?
7. Passt sie zum vorhandenen Kontext des Agents?
8. Gibt es einen sinnvolleren Enabler?
9. Kann sie sicher geclaimt werden?

Danach erfolgt der Claim.

---

# 64. Keine Story nur wegen WSJF starten

Eine Story mit dem höchsten WSJF wird nicht gestartet, wenn:

- harte Dependency fehlt
- User Decision erforderlich ist
- notwendiger Enabler fehlt
- unvertretbarer Conflict Scope besteht
- Repository-Zustand nicht ausreichend verstanden ist
- Integration laufende Arbeit gefährden würde

Dann wird die nächste ausführbare Story betrachtet.

---

# 65. Arbeitsprinzip des Agent-Teams

Das virtuelle Scrum-Team arbeitet nach diesem Ablauf:

**Backlog analysieren**

→ **WSJF berechnen**

→ **Ready Queue bilden**

→ **Dependencies prüfen**

→ **Conflict Scope prüfen**

→ **Arbeit claimen**

→ **parallel implementieren**

→ **Review durch anderen Agent**

→ **Integration**

→ **Done**

→ **nächste Arbeit ziehen**

---

# 66. Grundregel

WSJF beantwortet:

> Was besitzt den höchsten wirtschaftlichen Vorrang?

Die Ready Queue beantwortet:

> Was davon kann tatsächlich jetzt begonnen werden?

Parallelization Status beantwortet:

> Was kann gleichzeitig bearbeitet werden?

Der Controller beantwortet:

> Welcher Agent übernimmt welche Arbeit als Nächstes?

Der Benutzer entscheidet nur dort selbst, wo tatsächlich eine fachliche, strategische oder irreversible Entscheidung notwendig ist.

---

# 67. Oberste Regel

Agents und separate Chats handeln nicht wie unabhängige Einzelpersonen.

Sie handeln wie Mitglieder eines gemeinsamen Scrum-Teams.

Daher gilt:

> Ein gemeinsamer Backlog.
> Eine gemeinsame Priorisierung.
> Ein gemeinsamer Projektzustand.
> Gemeinsame Regeln.
> Klare Claims.
> Parallele Arbeit nur dort, wo sie sicher ist.
> Review vor Done.
> Integration vor Abschluss.
