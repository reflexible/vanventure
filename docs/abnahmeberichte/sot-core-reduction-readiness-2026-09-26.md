# Bereitschaftsbericht – WI-SOT-23-06 Core-Reduktion

Stand: 26. September 2026.

## Ergebnis

**Status: READY_FOR_SCOPED_MAPPING.** Es wurde keine Klausel aus
`docs/scrum-plan.md` entfernt.

| Prüfaspekt | Befund | Nachweis |
| --- | --- | --- |
| Technische SoT-Preservation | 45/45 Klauseln haben einen Implementierungs- und Verhaltenstestbezug; der Lauf ist fail-closed. Die fachliche Semantik bleibt bewusst ein getrennter Review. | `node tools/sot/preservation-check.mjs docs/sot-optimization/audits/sot-preservation-core-delta-2026-09-26.json` |
| Formale Plan-Traceability | Die 18 eindeutigen historischen Wortlautzzuordnungen (19 Prüfstellen, eine doppelte Quelle) sind gegen kanonische Ziele dokumentiert. Der Planabgleich ist `PASS`. | `node deploy/plan-consistency.mjs`; `docs/scrum-migration/reviews/historical-phrase-reconciliation-2026-09-26.md` |
| Bestehender Core-Delta | Gegen Golden `dac0199` verändert der bestehende Delta nur den Planwechselstatus und ergänzt drei begrenzte Modul-/Vorrangreferenzen; 19 Zeilen wurden ergänzt, drei ersetzt. Keine Core-Klausel wurde entfernt und keine Baseline-Regel abgeschwächt. | `git diff --check dac0199..HEAD -- docs/scrum-plan.md`; `git diff --unified=0 dac0199..HEAD -- docs/scrum-plan.md` |
| Verbleibende Grenze | Für keinen neuen Entfernkandidaten liegt bereits die vollständige Klausel-zu-Fachmodul-, Contract- und Referenzzuordnung vor. | `docs/sot-optimization/reviews/module-preparation-2026-09-26.md`, Abschnitt „WI-SOT-23 Core inventory“. |

## Reproduzierbare Prüfung

- Die 45 gebundenen Verhaltenstests aus dem Preservation-Check sowie der
  Planabgleich werden lokal ausgeführt.
- Die Checks bestätigen Erhalt, Zuordnung und vorhandene Modulgrenzen; sie
  ersetzen weder eine abschnittsweise Übernahmeprüfung noch eine fachliche
  Produkt- oder Live-Abnahme.

## Erforderliche Voraussetzungen vor Entsperrung

1. Für genau einen Entfernkandidaten ist eine Klausel-zu-Fachmodul-Zuordnung mit
   Erhaltungs-, Contract- und Referenznachweis zu erstellen.
2. Erst dann darf `WI-SOT-23-06` als begrenzter Core-Delta-Slice umgesetzt
   und anschließend `WI-SOT-23-07` gegen die Golden Baseline geprüft werden.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt.
