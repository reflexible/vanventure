**BATCH-004 ist in den vier Zieldateien integriert.** Ich habe die 287 Kandidaten mit den Paket-Inputs abgeglichen, die `ConcreteTarget`-Referenzen gegen Story-Katalog und tatsächliche Constraint-Überschriften geprüft und die Quellprüfsummen mit dem aktuellen Stand verglichen. Dabei ergab sich kein Needs Recheck. Die Integration belegt **Planning Coverage**, keine Implementierungs- oder Live-Verifikation.

| Paket | Integriert | Needs Decision | Needs Recheck | Zielkonflikte |
| --- | ---: | ---: | ---: | --- |
| PKG-045 | 63 | 0 | 0 | keine |
| PKG-046 | 65 | 1 | 0 | `SRC-1521.d`: Dürfen Epics und Stories als Fast-Track-Karten erscheinen? |
| PKG-047 | 57 | 3 | 0 | `SRC-1537.i`: Bezug der Archivierungsregel; `SRC-1545.a`: Board-Position für `alert_task`; `SRC-1559.b`: Archivfrist |
| PKG-048 | 59 | 1 | 0 | `SRC-1577.c`: Abschluss einer aufgelösten Warnung in Review oder erst nach Done-Bestätigung |
| PKG-049 | 43 | 0 | 0 | keine |

Die fünf offenen Klauseln stehen einzeln als `Unresolved` mit konkreter Frage. Eine globale Zählung, Reverse-Prüfung oder Berichtserzeugung habe ich nicht ausgeführt.

```json
[
  {
    "PackageID": "PKG-045",
    "Integrated": 63,
    "Status": "INTEGRATED",
    "RecheckSourceIDs": [],
    "DecisionRequired": false,
    "DecisionQuestion": "",
    "CandidateCount": 63
  },
  {
    "PackageID": "PKG-046",
    "Integrated": 65,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "SRC-1521.d: Sollen hoch/kritisch priorisierte Epics und Stories als Fast-Track-Karten zulässig sein oder ausschließlich im Backlog bleiben?",
    "CandidateCount": 65
  },
  {
    "PackageID": "PKG-047",
    "Integrated": 57,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "SRC-1537.i: Bezieht sich die Archivierungsregel auf Eltern oder Kinder, und welche Zuordnung muss zuvor feststehen? SRC-1545.a: Erhalten alert_task-Karten bei Fast-Track-Einplanung Board-Zeile und -Spalte? SRC-1559.b: Welche Aufbewahrungsfrist soll Phase 0 festlegen?",
    "CandidateCount": 57
  },
  {
    "PackageID": "PKG-048",
    "Integrated": 59,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "SRC-1577.c: Darf eine aufgelöste Warnung nach menschlicher Bestätigung bereits in Review abgeschlossen werden oder ist eine ausdrückliche Done-Bestätigung zwingend?",
    "CandidateCount": 59
  },
  {
    "PackageID": "PKG-049",
    "Integrated": 43,
    "Status": "INTEGRATED",
    "RecheckSourceIDs": [],
    "DecisionRequired": false,
    "DecisionQuestion": "",
    "CandidateCount": 43
  }
]
```