Die gezielte Planungsreparatur für **COVERAGE-R1-002** ist eingetragen. Elf Klauseln sind jetzt durch konkrete AC gedeckt, vor allem für vollständige Ausrüstungsprofile und die erneute Prüfung der damaligen Planregister- und Detailgeneratorfehler. Die Änderungen stehen im [Scrum-Entwurf](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md), in der [Traceability-Matrix](/D:/work/_venventure/docs/scrum-migration/traceability-matrix.csv) und im [Ausführungsstand](/D:/work/_venventure/docs/scrum-migration/execution-state.md). Originalquellen, Reviews und `controller-state.json` blieben unverändert.

**Offene Fragen**

1. Welche konkreten sichtbaren Bildfassungen waren freigegeben, mit welchen SHA-256-Hashes? (`SRC-0528.a`)
2. Nr. 63: Ist ein Kind erkennbar, welche Anonymisierung ist nötig, und wird dieses Bild ausdrücklich zur Veröffentlichung ausgewählt? (`SRC-0528.b`)
3. Nr. 69: Dieselben Entscheidungen sind für dieses Bild gesondert nötig. (`SRC-0528.b`)
4. Wird die heutige Scott-Komposition einschließlich des gesamten Seitenkörpers visuell abgenommen? (`SRC-0529/0532`)
5. Nach welcher gemeinsam festgelegten Regel wird jedes Cockpit-Kennzeichen einer Backlog- oder Fast-Track-Karte zugeordnet? (`SRC-0562.c`)
6. Welche drei Kinderbilder waren für welche Kajak-Fassung freigegeben, und welche sollen in der heutigen 13er-Galerie bleiben? (`SRC-0658.c`)
7. Beschreiben die älteren 24 Stunden denselben GCS-Produktionsumfang wie das Ziel von 8–11 Stunden? (`SRC-0753.a`)
8. Meint „nach der Veröffentlichung“ das GCS-Longform-Video oder das Paket einschließlich beider Shorts? (`SRC-0780.a`)

**Verbleibende Deckungs- und Beleglücken**

- `SRC-0528.a`: Die historische Sichtfreigabe ist noch keinen eindeutig nachgewiesenen aktuellen Dateifassungen zugeordnet.
- `SRC-0528.b`: Für Nr. 63 und Nr. 69 fehlen die jeweiligen Datenschutz- und Veröffentlichungsentscheidungen.
- `SRC-0562.c`: Ohne beschlossene Prioritätsregel bleibt die Cockpit-zu-Board-Übernahme gesperrt.
- `SRC-0658.c`: Die historische Kinderbildfreigabe lässt sich noch nicht sicher auf die heutige Galerie übertragen.
- `SRC-0753.a`: Der widersprüchliche Stundenwert verhindert einen eindeutig festgelegten aktuellen Sollwert.
- `SRC-0780.a`: Das zeitliche Gate für die Website-Ergänzung bleibt ungeklärt.

Die [Fortschrittsübersicht](/D:/work/_venventure/docs/scrum-migration/atomic-coverage-report.md) wurde aktualisiert. Die zusätzliche Strukturprüfung bestand für **zehn Originalblöcke, 95 Kandidaten, Quell-Hashes, Zielanker und Story-/Task-Zuordnung**. Der vorhandene Standardprüfer stoppt weiterhin an einer fest kodierten alten PKG-014-Erwartung; sein Lauf ist kein PASS. **Implementation Verification bleibt separat offen:** Insbesondere wurden die damaligen Planregister- und Detailgeneratorfehler durch diese Planungsarbeit nicht als behoben nachgewiesen.