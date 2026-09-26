Die gezielte Planungsreparatur für COVERAGE-R1-041 ist in den zentralen [Migrationsentwurf](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:8), den Story-Katalog, das Constraint-Register und die Traceability-Unterlagen eingetragen. Ergänzt wurden prüfbare Kriterien für die Quellkette je Seite und den isolierten Änderungstest, ein gesperrter Betriebsslice für tatsächliche Benachrichtigungen sowie die enge Grenze des Marvin-MVP. Originalquellen, Reviews und `controller-state.json` blieben unverändert. Die Fortschrittsaktualisierung lief; die Strukturprüfung bestand mit 58 Stories. Das ist **Planning Coverage**, keine Implementierungs-, Freigabe- oder Live-Verifikation.

**Offene Fragen und Deckungslücken in diesem Umfang:**

1. **SRC-1521.d:** Dürfen hoch oder kritisch priorisierte Epics und Stories selbst als Fast-Track-Karten erscheinen, oder bleiben sie ausschließlich im Backlog?
2. **SRC-1537.i:** Bezieht sich „sie können nur archiviert werden“ auf Eltern oder Kinder, und welche Zuordnung muss vorher feststehen?
3. **SRC-1545.a:** Erhalten eingeplante `alert_task`-Karten Board-Zeile und Spalte?
4. **SRC-1559.b:** Welche Aufbewahrungsfrist soll Phase 0 für Karten festlegen?
5. **SRC-1577.c:** Reicht nach menschlicher Bestätigung ein Abschluss in Review, oder ist eine ausdrückliche Done-Bestätigung erforderlich?
6. **SRC-1622.b:** Soll der Tablet-Kiosk nur mit bestehender Sitzung Schreibzugriff erlauben, oder auch per lokaler PIN? Falls PIN: Wer verwaltet sie und welche Aktionen erlaubt sie?

Diese sechs Klauseln bleiben als Planungsdeckungslücken ausgewiesen. Für den nun geplanten Benachrichtigungsslice **SRC-1648.a** bleibt zusätzlich vor Aktivierung zu entscheiden: Welcher Kanal, welche Empfänger, welche Betriebsverantwortung, welche Absicherung und welches Aktivierungskriterium gelten für fehlgeschlagene Syncs und kritische, nicht zugestellte Warnungen?