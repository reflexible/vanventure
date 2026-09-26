# Abnahmebericht – WI-SOT-31-07 Rollback und exakte Golden-Baseline-Recovery

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Die gepinnte Golden Baseline verweist auf einen unveränderlichen Git-Stand und prüft LF-Blob sowie auditierte CRLF-Checkout-Bytes. | Bestanden | `baselines.test.mjs`: `golden-scrum-final-audit-pass-2026-09-26`, Commit und beide Hashformen werden verifiziert. |
| Fehlgeschlagene Post-Validation stellt die Originalbytes wieder her. | Bestanden | `sot-update-plan.test.mjs`: regulärer Rollback und semantischer FULL-CHECK-Rollback prüfen den exakten Ausgangstext. |
| Ein Prozessabbruch nach dem Write wird nur aus dem authentifizierten Recovery-Journal zurückgenommen. | Bestanden | `sot-update-plan.test.mjs`: Crash-Recovery, manipuliertes Journal, fremde Änderung und aktiver Writer werden getrennt geprüft. |
| Der integrierte Governance-Ablauf stellt nach einem tatsächlichen Prozessabbruch exakt den Byte-Hash der Ausgangsbasis wieder her. | Bestanden | `governance-workflow.test.mjs`: `RECOVERED`, `restored_sha256` und gelesene Bytes entsprechen der Golden Baseline; danach fehlt das Recovery-Journal. |

## Getesteter lokaler Quellstand

- Verbundprüfung: **61/61** Tests bestanden.
- Enthalten: gepinnte Baseline-Validierung, atomarer Update- und
  Rollback-Mechanismus sowie der unterbrochene integrierte Governance-Ablauf.

## Status und Restarbeit

**Lokaler Status:** bestanden. Die Recovery bezieht sich auf lokale,
authentifizierte Testartefakte und einen gepinnten Git-Nachweis. Sie ersetzt
keine Produktionswiederherstellung oder Live-Freigabe.

**Restarbeit:** `WI-SOT-16-03` ist der kleinste sinnvolle nächste Schritt:
eine ersetzte Regel im bestehenden, bereits getesteten SUPERSEDE-Pfad sichtbar
markieren. Das schaltet die anschließend getrennten Dependency- und
Traceability-Updates frei.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt. Der Planabgleich bleibt wegen 20 historisch
offener Traceability-Punkte `PENDING`; daraus folgt keine Produktivfreigabe.
