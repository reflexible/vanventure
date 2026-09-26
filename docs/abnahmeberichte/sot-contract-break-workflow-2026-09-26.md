# Abnahmebericht – WI-SOT-31-04 Contract-Bruch im integrierten Ablauf

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Ein als brechend klassifizierter Contract löst einen FULL CHECK aus. | Bestanden | `full-check.test.mjs`: Contract-Bruch mit `CONTRACT_BREAK`. |
| Ohne scoped Contract-Prüfer kann der FULL CHECK nicht bestehen. | Bestanden | Test erwartet `FULL_CHECK_BLOCKED` und `MISSING_CHECKER` für den betroffenen Contract. |
| Ein Contract-Katalogwechsel während des Governance-Ablaufs wird nicht mit alten Daten akzeptiert. | Bestanden | `governance-workflow.test.mjs`: „concurrent contract metadata edits cannot pass using old in-memory catalogues“. |
| Der betroffene Ablauf wird zurückgerollt statt integriert oder als DONE markiert. | Bestanden | Workflowtest erwartet `ROLLED_BACK` und `ANCILLARY_SOURCE_CHANGED`. |

## Getesteter lokaler Quellstand

- Verbundprüfung: **63/63** Tests bestanden.
- Enthalten: Impact- und Full-Check, inkrementelles Audit, Post-Validation,
  Governance-Workflow und Done-Guard.

## Status und Restarbeit

**Lokaler Status:** bestanden. Die Nachweise verwenden isolierte Testdaten und
prüfen die Sperrwirkung; sie ersetzen keine aktive CMS-/Analytics-Laufzeit-
oder Produktfreigabe.

**Restarbeit:** `WI-SOT-31-05` prüft als nächsten Fall parallele Worker mit
Konflikt- und Integrationskontrolle.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt. Der Planabgleich bleibt wegen 20
historisch offener Traceability-Punkte `PENDING`; daraus folgt keine
Produktivfreigabe.
