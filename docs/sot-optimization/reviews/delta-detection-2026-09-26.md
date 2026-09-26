# Abnahmegrenze: Delta Detection

Stand: 26.09.2026 · `ST-SOT-10` lokal als deterministischer Vergleich umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Eingaben | Aktuelle Modulquellen werden aus der Registry gelesen. Vorherige Snapshots, eine benannte Baseline oder ein vollständiger Git-Ref müssen explizit angegeben werden; Contracts können als voriger und aktueller Katalog verglichen werden. |
| Ausgabe | Byte-, Format-, semantische und Contract-Änderungen werden getrennt ausgewiesen. Unveränderte Module werden aus dem betroffenen Umfang ausgeschlossen. Die Ausgabe enthält Quelle, Hashes und nachvollziehbare Gründe. |
| Validierung | `node --test tools/sot/delta.test.mjs` besteht 8/8 Fälle, darunter Format-only, fehlende Manifeste, semantische Änderung trotz gleicher Bytes, Contract-Break und deterministische Reihenfolge. `node tools/sot/progress.mjs --check` bestätigt den Statuszähler. |
| Umfangsgrenze | Bei Textänderung ohne zwei gepflegte semantische Manifeste lautet die semantische Einstufung unbekannt. Eine automatisierte Freigabe aus bloß gleichem Textformat erfolgt nicht. Die Einbindung in Impact- und Check-Engines folgt in `ST-SOT-06`–`08`. |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht. `docs/ausbauplan.md` bleibt historisch unverändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-10-01`–`06` lokal DONE. Nächster Enabler: Impact Engine.
