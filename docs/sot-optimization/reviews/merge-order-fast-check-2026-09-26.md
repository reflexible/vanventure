# WI-SOT-21-07 – Merge-Reihenfolge-FAST-CHECK

Status: `FAST_CHECK_PASS`.

`deriveMergeOrder` erzeugt ausschließlich eine deterministische Folge von
Integrationsgruppen. Harte transitive Story-Abhängigkeiten müssen in einer
früheren Gruppe liegen. Überlappende Write Scopes werden nie derselben Gruppe
zugeordnet. Die Funktion lehnt unbekannte Work Items, fehlende Scopes und den
geschützten Scrum-Core-Pfad ab. Sie verändert keine Dateien, Claims, Reviews,
Integration States oder Planstatus und setzt `merge_authorized: false`.

Prüfung:

- Zieltest `tools/sot/execution-planner.test.mjs`: 11/11 PASS.
- Gesamte SoT-Suite `tools/sot/*.test.mjs`: 301/301 PASS.
- Projekt-Graph-Smoke-Test: `WI-SOT-21-02` wird vor seinem harten Nachfolger
  `WI-SOT-21-03` eingeordnet.
- Golden-Baseline-Diff gegen `dac0199`: PASS; `docs/scrum-plan.md` ist
  byte-identisch.
- `progress.mjs --check`: PASS.

Der Schritt ergänzt eine additive, rein ableitende Infrastruktur und berührt
keine FULL-CHECK-Auslöser. FAST CHECK ist ausreichend.
