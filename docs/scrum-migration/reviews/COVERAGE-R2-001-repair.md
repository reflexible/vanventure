Die gezielte Planungsreparatur für **SRC-0800–SRC-0809** ist im [Scrum-Entwurf](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md) und [Constraint-Register](/D:/work/_venventure/docs/scrum-migration/constraint-register.md) eingetragen. Ich habe die zehn Originalblöcke und 23 Klauseln direkt mit den aktuellen Zielstellen verglichen. Der Entwurf benennt jetzt die erforderlichen Einzelbelege für Story-AC, INVEST und die Definition of Done je Inkrement. Die [Fortschrittsübersicht](/D:/work/_venventure/docs/scrum-migration/atomic-coverage-report.md) und der [Ausführungsstand](/D:/work/_venventure/docs/scrum-migration/execution-state.md) sind aktualisiert.

**Offene Nutzerfragen in diesem Quellumfang:** keine.

**Verbleibende Deckungslücken – jeweils fehlt der Einzelbeleg im Bestand:**

1. `SRC-0800.a`: Testbarkeit der AC je Story.
2. `SRC-0801.a`: INVEST-Befund und Korrektur vor „umsetzungsbereit“.
3. `SRC-0802.a`: Von außen prüfbares Ergebnis und Grenzfälle je Story.
4. `SRC-0802.b`: Bedarf der genannten Rollen-, Geräte-, Sprach- und weiteren Prüfkategorien je Story.
5. `SRC-0802.c`: Abgleich der AC mit bindenden Quellen je Story.
6. `SRC-0803.a`: DoD-Prüfung jedes als abgeschlossen gemeldeten Inkrements.
7. `SRC-0804.b`: Geeignete, reproduzierbare AC-Prüfung je Inkrement.
8. `SRC-0804.c`: Bekannte Grenzen und ungeprüfte Fälle je Inkrement.
9. `SRC-0805.b`: Rückverfolgbare Fach-, Architektur-, Design- und Freigabebelege.
10. `SRC-0806.b`: Konsistenz von Code, Inhalt, Tests und Dokumentation.
11. `SRC-0806.c`: Widerspruchsabgleich zwischen Status und Nachweisen.
12. `SRC-0807.b`: Getrennter Nachweis der sechs Statusstufen je Inkrement.
13. `SRC-0808.b`: Bestandsabgleich offener Folgearbeit mit Bezug und Priorität.
14. `SRC-0808.c`: Abschlussabgleich aller Stories und ihrer Abnahme je Epic.
15. `SRC-0809.a`: Zuordnung der zusätzlich geltenden Schutz-, Bild-, Sicherheits- und Abnahmeregeln.

Diese 15 Klauseln bleiben deshalb **Partially Covered**; `SRC-0807.c` bleibt planerisch **Covered**. Die Fortschrittsaktualisierung lief erfolgreich, und die globale sowie die fokussierte Strukturprüfung bestanden. **Implementation Verification, Freigaben und Live-Zustand wurden nicht geprüft.** Originalquellen, Reviews und `controller-state.json` wurden nicht geändert.