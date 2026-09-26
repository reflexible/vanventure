# Abnahmebericht – WI-SOT-16-03 ersetzte Regel sichtbar markieren

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Der alte Regeltext bleibt vollständig erhalten und wird sichtbar als historisch und inaktiv markiert. | Bestanden | `sot-update-plan.test.mjs`: „superseding retains exact old rule with visible inactive marker and approved active replacement“. |
| Die aktive Ersatzregel benennt die ersetzte Regel und den freigegebenen Vorschlag eindeutig. | Bestanden | Derselbe Test prüft `Active replacement for RULE-1: P-1` sowie den Ersatztext. |
| Der SUPERSEDE-Pfad erfordert persistiertes Ziel-Konfliktreview und authentifizierte semantische Prüfung. | Bestanden | `sot-update-plan.test.mjs` und `governance-workflow.test.mjs`: fehlendes Review oder nicht authentifizierte Prüfung blockieren den Write bzw. die Recovery. |
| Die Markierung bleibt im integrierten Workflow und bei Rollback/Recovery konsistent. | Bestanden | `governance-workflow.test.mjs`: geprüfter EXTEND-/SUPERSEDE-Ablauf, Traceability-Fehler-Rollback und Crash-Recovery. |

## Getesteter lokaler Quellstand

- Verbundprüfung: **62/62** Tests bestanden.
- Enthalten: Approval-Flow, atomarer SUPERSEDE-Write, integrierter
  Governance-Workflow, Konfliktreview und Recovery.

## Status und Restarbeit

**Lokaler Status:** bestanden. Der Nachweis verwendet isolierte lokale
Fachmodulquellen und repräsentiert keine neue Produkt- oder Designregel.

**Restarbeit:** `WI-SOT-16-04` aktualisiert als nächstes die Dependencies
im selben etablierten Updatepfad. Das ist die direkte fachliche Folge der
sichtbaren Ersetzung und bleibt gegenüber einer Runtime-Integration eng
begrenzt.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt. Der Planabgleich bleibt wegen 20 historisch
offener Traceability-Punkte `PENDING`; daraus folgt keine Produktivfreigabe.
