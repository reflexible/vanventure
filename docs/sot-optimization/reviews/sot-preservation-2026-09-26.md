# WI-SOT-01-10 – technische Preservation der SoT-Klauseln

Status: `LOCAL_TECHNICAL_PASS` · Stand 26.09.2026.

## Scope und Ergebnis

Der Prüflauf validiert die vollständige Preservation-Matrix mit 45/45
SoT-Klauseln gegen die nachgelagerten lokalen Implementierungsgrenzen für
Intake, Impact, Conflict Check, Freigabe, autoritatives Update,
Post-Validation, DONE-Guard und den übergreifenden Auditpfad. Jede Klausel
hat einen expliziten Verweis auf Implementierungsdatei(en) und ausführbare
Verhaltenstests. Fehlende, doppelte oder nicht zuordenbare Klauseln, ein
unbekanntes Ziel oder ein fehlender Nachweispfad blockieren den Lauf.

Der maschinenlesbare Nachweis ist
[`sot-preservation-2026-09-26.json`](../audits/sot-preservation-2026-09-26.json).
Er enthält Klausel-IDs, Quellzeilen, Zielstories, Quellhashes und den genauen
Testaufruf. Die Matrix führt für alle 45 Klauseln jetzt
`TECHNICALLY_VERIFIED`; die separate semantische Prüfung bleibt ausdrücklich
`PENDING_SEPARATE_REVIEW`.

## Reproduzierbare Prüfung

`node tools/sot/preservation-check.mjs` erzeugt den Audit und führt die
gebundenen Verhaltenstests aus. Der Lauf bestand mit `SOT_PRESERVATION_PASS`;
der Testprozess beendete sich mit Code 0. Zusätzlich bestand
`node --test tools/sot/preservation-check.test.mjs` mit 3/3 Fällen.

## Grenze

Der Nachweis beweist technische Preservation, nicht die vollständige
fachliche Semantik eines Produktablaufs. Er erteilt keine Nutzer-, Design-,
Release- oder Live-Freigabe. Es wurden weder Website, Bilder, persistente
Daten noch Produktionssysteme geändert.
