# Eingangsquelle: bisheriger Source-of-Truth-Prozess

Quellkopie der vollständigen 11-Abschnitt-Fassung aus dem Chat
„Source-of-Truth Prozess“ (Thread `6ab6e438-57c0-83eb-9ca9-e8cb09d8470c`).
Nur Preservation-/Traceability-Evidenz; kein zweiter aktiver Plan und keine
separat freigegebene Source of Truth. Für das neue SoT-Epic steuern
`docs/scrum-plan.md` und dessen autoritatives Fachmodul die Arbeit; der
historische Ausbauplan bleibt nur bis zum gesonderten Planwechsel-Gate aktiv.

---

# Verbindlicher Source-of-Truth-Prozess

Für das gesamte VanVenture-Projekt gilt:

> **Neue Ideen, Pläne, Anforderungen und Entscheidungen werden erst dann verbindlicher Projektbestandteil, wenn sie über den definierten Intake-Prozess geprüft, freigegeben und in die zuständige Source of Truth integriert wurden.**

Chat-Inhalte, temporäre Notizen, Worker-Ergebnisse, Analyseberichte oder einzelne neue Markdown-Dateien sind **niemals automatisch verbindlich**.

## 1. Intake neuer Informationen

Jede neue relevante Information aus:

- Nutzerentscheidungen
- Chats
- Reviews
- Worker-Ergebnissen
- Brainstormings
- Analysen
- neuen Plänen
- Implementierungen
- Retrospektiven

muss klassifiziert werden.

Mögliche Klassen sind insbesondere:

- `IDEA`
- Backlog Item
- Requirement
- Architekturentscheidung
- Designregel
- Contentregel
- Sicherheitsregel
- Datenschutzregel
- Prozessregel
- Änderung einer bestehenden Regel

## 2. Statusmodell

Mindestens folgende Status sind zu verwenden:

- `IDEA`
- `PROPOSED`
- `APPROVED`
- `SUPERSEDED`

Optional:

- `REJECTED`

Eine neue Information darf **nicht direkt `APPROVED`** werden, sofern nicht bereits eine ausdrückliche Nutzerfreigabe vorliegt.

## 3. SoT Impact Check

Vor der Übernahme muss Codex prüfen:

- Welche bestehende Source of Truth betrifft die Änderung?
- Existiert bereits eine entsprechende Regel?
- Gibt es eine ähnliche oder teilweise überlappende Regel?
- Widerspricht die neue Information bestehenden Regeln?
- Ergänzt sie lediglich eine bestehende Regel?
- Ersetzt sie eine bestehende Regel?
- Werden andere Dokumente oder Work Items davon beeinflusst?
- Müssen bestehende Referenzen angepasst werden?

## 4. Conflict Check

Vor einer Freigabe muss geprüft werden, ob durch die neue Information:

- widersprüchliche Regeln entstehen,
- Regeln doppelt geführt würden,
- mehrere Sources of Truth für dasselbe Thema entstehen,
- alte Regeln weiterhin fälschlicherweise als gültig erscheinen würden.

Konflikte dürfen nicht stillschweigend aufgelöst werden.

Wenn eine fachliche Entscheidung erforderlich ist, muss sie als Nutzerentscheidung sichtbar gemacht werden.

## 5. Keine automatische Verbindlichkeit

Bis zur Freigabe bleibt die Information:

`IDEA`

oder

`PROPOSED`

beziehungsweise als entsprechendes Item im Working Item Backlog.

Sie darf währenddessen analysiert, vorbereitet und mit Abhängigkeiten versehen werden, aber noch keine bestehende verbindliche Regel stillschweigend ersetzen.

## 6. Freigabe

Erst eine ausdrückliche Freigabe macht eine Änderung verbindlich.

Danach wird sie:

`APPROVED`

## 7. Aktualisierung der Source of Truth

Nach der Freigabe muss Codex die zuständige bestehende Source of Truth aktualisieren.

Dabei gilt:

> **Pro Thema darf es nur eine autoritative Source of Truth geben.**

Deshalb dürfen keine unnötigen parallelen Dateien entstehen wie:

`analytics.md`
`analytics-plan.md`
`new-analytics.md`
`analytics-final-v2.md`

Stattdessen wird beispielsweise die bestehende Datei

`docs/analytics.md`

weiterentwickelt.

Codex muss dabei:

- bestehende Regeln erweitern oder ändern,
- ersetzte Regeln entfernen oder sauber als überholt markieren,
- Abhängigkeiten aktualisieren,
- Referenzen aktualisieren,
- betroffene Dokumentation aktualisieren,
- ADR bzw. Änderungshistorie aktualisieren.

Eine ersetzte Entscheidung kann beispielsweise markiert werden als:

`SUPERSEDED by ADR-023`

## 8. Nachgelagerte Konsistenzprüfung

Nach jedem SoT-Update ist eine Validierung erforderlich.

Mindestens prüfen:

- keine widersprüchlichen aktiven Regeln,
- keine unbeabsichtigten Duplikate,
- keine veralteten Referenzen,
- keine zwei autoritativen Sources of Truth für dasselbe Thema,
- keine aktiven Regeln, die bereits ersetzt wurden,
- abhängige Dokumente und Work Items weiterhin konsistent.

## 9. Verbindlicher Workflow

Der Standardprozess lautet:

`Neue Information / Entscheidung`
→ `Classification`
→ `SoT Impact Check`
→ `Conflict Check`
→ `PROPOSED`
→ `User Approval falls erforderlich`
→ `APPROVED`
→ `Update Source of Truth`
→ `Update ADR / Changelog`
→ `Consistency Validation`
→ `DONE`

## 10. Definition of Done

Folgende Regel ist verbindlicher Bestandteil der Definition of Done:

> **SoT Update Required:** Wenn eine Story, ein Epic, ein Review, eine Implementierung oder eine Nutzerentscheidung eine dauerhafte Projektregel, Architekturentscheidung, Sicherheitsregel, Datenschutzregel, Designregel, Contentregel, Prozessregel oder fachliche Vorgabe erzeugt oder verändert, darf das zugehörige Work Item erst auf `DONE` gesetzt werden, wenn die zuständige Source of Truth aktualisiert und anschließend auf Konsistenz geprüft wurde.

## 11. Harte Abschlussregel

> **Kein Work Item darf auf `DONE` gehen, wenn daraus dauerhaft relevantes Projektwissen entstanden ist und dieses Wissen noch nicht ordnungsgemäß in die zuständige Source of Truth integriert wurde.**

Worker-Ergebnisse, Chatverläufe und Review-Berichte dürfen daher niemals zum einzigen Speicherort einer dauerhaften Entscheidung werden.

## Ziel

Dieser Prozess muss technisch und organisatorisch verhindern, dass sich im VanVenture-Projekt erneut:

- widersprüchliche Regeln,
- veraltete Dokumente,
- parallele Wahrheiten,
- unklare Entscheidungen oder
- verstreutes Projektwissen

ansammeln.

Die Source of Truth bleibt damit kontinuierlich aktuell, nachvollziehbar und konsistent.
