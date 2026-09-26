Die Planungsreparatur für **COVERAGE-R1-035 / SRC-1413–SRC-1422** ist lokal abgeschlossen. Ich habe die zehn Originalblöcke mit den aktuellen Zielstellen abgeglichen und für alle 37 Klauseln konkrete Planungs-AC ergänzt. Fortschrittsdaten und Verweise sind aktualisiert; die Strukturprüfung besteht.

Geändert wurden ausschließlich zentrale Migrationsunterlagen, insbesondere der [Scrum-Entwurf](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md), die [Coverage-Übersicht](D:/work/_venventure/docs/scrum-migration/coverage-report.md) und die zugehörigen Story-, Constraint- und Traceability-Daten. `controller-state.json`, Reviews und Originalquellen blieben unverändert.

**Verbleibende Fragen und Lücken in diesem Umfang:**

- **Nutzerentscheidung:** Derzeit ist keine konkrete neue Variante oder Ausnahme zur Entscheidung vorgelegt. Falls bei der Umsetzung eine strukturelle Galerievariante nötig wird, lautet die Frage: *Welche konkrete Strukturabweichung soll für welche Seiten und Bildschirmgrößen gegenüber der freigegebenen Galerie gelten?*
- **Planungsdeckung:** Keine identifizierte Lücke für SRC-1413–SRC-1422.
- **Implementation Verification:** Die tatsächlichen Komponenten- und Generatorpfade, Galerieausnahmen samt Genehmigungsbelegen, Bildvarianten, Ansichten und Regressionen sind noch zu prüfen. Bild-, Design- und Release-Freigaben sowie ein Live-Nachweis wurden nicht erteilt oder behauptet.

`python tools/update-scrum-review-progress.py` wurde ausgeführt; `python tools/verify-scrum-review-progress.py` meldet **PASS**. Der globale Migrationscheck bleibt offen.