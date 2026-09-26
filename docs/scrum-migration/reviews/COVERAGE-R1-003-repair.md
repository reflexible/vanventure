Die Planungsreparatur für **COVERAGE-R1-003** ist in den zentralen Migrationsunterlagen eingetragen. Der [Scrum-Entwurf](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md) enthält jetzt konkrete INVEST- und Slice-Prüffälle, ein vorführbares AC für das optionale ST-AN-01-Skeleton und die begrenzte Enabler-Aufgabe von ST-WEB-03. Für ST-CON-01 sind fünf eigenständig abnehmbare Teilnutzen benannt; das bisherige Gesamtpaket ist ausdrücklich **nicht umsetzungsbereit**. [Constraint-Register](/D:/work/_venventure/docs/scrum-migration/constraint-register.md), [Story-Katalog](/D:/work/_venventure/docs/scrum-migration/story-catalog.json), [Coverage-Bericht](/D:/work/_venventure/docs/scrum-migration/coverage-report.md) und [Ausführungsstand](/D:/work/_venventure/docs/scrum-migration/execution-state.md) wurden abgeglichen.

**Nutzerfragen aus SRC-0788–SRC-0799:** Keine neue fachliche Entscheidung erforderlich.

**Verbleibende Deckungslücken, einzeln:**

- **SRC-0788:** ST-CON-01 braucht noch eigene Storysätze, AC, Prioritäten und Quellverweise für die fünf Teilnutzen.
- **SRC-0791:** Deren eigenständiger Nutzen und vollständiger Vertical Slice sind noch nicht je Story nachgewiesen.
- **SRC-0792:** Das ST-AN-01-Skeleton ist geplant, aber nicht demonstriert; der Inkrement- und Abschlusscheck aller Epics fehlt.
- **SRC-0793:** ST-WEB-03 ist konkretisiert; die übrigen Enabler sind noch nicht einzeln auf Begründung, Mindestumfang und Folgestories geprüft.
- **SRC-0794:** Ein dokumentierter INVEST-Befund vor Einplanung fehlt je Story.
- **SRC-0795:** Unabhängigkeit und unvermeidbare Dependencies sind noch nicht je Story geprüft.
- **SRC-0796:** Unnötige technische Festlegungen und bindende Fach- und Designregeln sind noch nicht je Story abgeglichen.
- **SRC-0797:** Konkreter Nutzen und betroffene Personen beziehungsweise betrieblicher Nutzen sind noch nicht je Story bestätigt.
- **SRC-0798:** Umfang und Unsicherheiten sind noch nicht je Story auf Schätzbarkeit geprüft.
- **SRC-0799:** Zu große Sammelstories müssen noch entlang ihres Nutzens geteilt werden, insbesondere ST-CON-01.

Die Fortschrittsaktualisierung lief. Die zusätzliche Strukturprüfung bestand für **zehn Originalquellen, 21 Klauseln, Quell-Hashes und die betroffenen Zielstellen**. Der Standardprüfer stoppt weiterhin an einer älteren fest kodierten PKG-014-Erwartung; das ist kein PASS. **Implementation Verification, Freigaben und Live-Stand wurden nicht geprüft.** Originalquellen, Reviews und `controller-state.json` blieben unverändert.