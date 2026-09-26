# Bereitschaftsbericht – WI-SOT-23-06 Core-Reduktion

Stand: 26. September 2026.

## Ergebnis

**Status: BLOCKED.** Es wurde keine Klausel aus `docs/scrum-plan.md`
entfernt.

| Sperre | Befund | Nachweis |
| --- | --- | --- |
| Abschnitssgenaue Preservation fehlt. | Die vorhandene Modulvorbereitung erlaubt keine Core-Entfernung ohne vollständige Zielmodul-, Klausel-, Contract- und Referenzzuordnung. | `docs/sot-optimization/reviews/module-preparation-2026-09-26.md`, Abschnitt „WI-SOT-23 Core inventory“. |
| Formale Plan-Traceability ist offen. | Der Planabgleich meldet 20 historisch offene Zuordnungen und bleibt `PENDING`. | `node deploy/plan-consistency.mjs`. |
| Bestehender Core-Delta ist noch nicht abgrenzend geprüft. | `docs/scrum-plan.md` unterscheidet sich gegenüber der Golden Baseline; dieser bestehende Delta braucht vor einer weiteren Reduktion eine eigene Preservation-Prüfung. | `git diff --exit-code dac0199 -- docs/scrum-plan.md` liefert einen Delta-Befund. |

## Reproduzierbare Prüfung

- **19/19** Tests bestanden: Modulregistry, SoT-Konsistenz und
  Projekt-Traceability.
- Die Tests bestätigen vorhandene Modulgrenzen und Sperrverhalten, ersetzen
  jedoch keine abschnittsweise Übernahmeprüfung.

## Erforderliche Voraussetzungen vor Entsperrung

1. Der bestehende Core-Delta muss in einem eigenen, überprüften Umfang
   preservation-geprüft sein.
2. Für jeden Entfernkandidaten ist eine Klausel-zu-Fachmodul-Zuordnung mit
   Erhaltungs-, Contract- und Referenznachweis zu erstellen.
3. Der vollständige historische Coverage-/Traceability-Abgleich muss den
   betreffenden Umfang ohne offene Zuordnung bestätigen.
4. Erst dann darf `WI-SOT-23-06` als begrenzter Core-Delta-Slice umgesetzt
   und anschließend `WI-SOT-23-07` gegen die Golden Baseline geprüft werden.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt.
