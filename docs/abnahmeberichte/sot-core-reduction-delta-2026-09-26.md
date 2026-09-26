# Abnahmebericht – WI-SOT-23-06/07: begrenzte Core-Reduktion und Golden-Delta

Stand: 26. September 2026.

## Scope und Ergebnis

**Status: LOCAL_VERIFIED.** Aus `docs/scrum-plan.md` wurde genau ein
redundanter Core-Abschnitt entfernt: die einzelne Tabellenzeile
`ST-SOT-23–25 · Fachmodule` in der `EPIC-SOT`-Übersicht. Die Änderung entfernt
keine Story, kein Work Item, keine Acceptance Criteria, keine Freigabegrenze
und keine historische Quelle. Sie streicht allein die doppelte
Workstream-Zusammenfassung, deren maßgeblicher Detailstand bereits im
Fachmodul liegt.

## Vollständige Zuordnung vor der Entfernung

| Pflicht | Nachweis | Ergebnis |
| --- | --- | --- |
| Zielmodul | `sot-architecture`, Quelle `docs/governance/source-of-truth-and-incremental-planning.md`, insbesondere Workstream `WS-SOT-W4` und `ST-SOT-23` bis `ST-SOT-25` | PASS – dort bleiben Storyziel, einzelne Work Items, Status, Nachweislinks und offene Grenzen vollständig erhalten. |
| Autorität | `docs/governance/module-registry.json`: `sot-architecture` mit `authority: governance.sot-architecture`, Quelle das obige Fachmodul | PASS – die entfernte Übersicht erzeugt keine zweite Fachautorität. |
| Contract | `SCRUM-WORK-ITEM` verbindet `scrum-core` mit `sot-architecture`; `SOT-DECISION-CHANGE` und `WORKER-WORK-ASSIGNMENT` bleiben unverändert registriert | PASS – weder Contract-Inhalt, Version, Provider/Consumer noch Invariante wurden geändert. |
| Rückreferenz | Die verbleibende `EPIC-SOT`-Einleitung im Core verlinkt weiter direkt auf das autoritative Fachmodul; dessen Einleitung verlinkt zurück auf `docs/scrum-plan.md` und die Golden Baseline | PASS – Core-Steuerung und Fachmodul-Detailautorität bleiben beidseitig auffindbar. |
| Preservation | Golden-Semantikmanifest `CORE-STRUCTURE` bis `CORE-TRACEABILITY` aus `docs/governance/baselines.json`; 45 SoT-Klauseln und ihre vorhandenen Tests | PASS – die Tabellenzeile enthielt keinen eigenen Baseline-Anker; die bestehenden Regeln, Gates und Zuordnungen bleiben erhalten. |

## Unmittelbarer Golden-Baseline-Delta-Check

Der Check wurde direkt nach der begrenzten Entfernung gegen
`scrum-final-audit-pass-2026-09-26` ausgeführt. Er vergleicht die aktuelle
Core-Datei mit der gepinnten Recovery-Baseline und verwendet das unveränderte,
explizite Semantikmanifest. Erwartete Klassifikation: `TEXT_CHANGED_MANIFEST_UNCHANGED`.

Zusätzliche reproduzierbare Checks:

```text
node tools/sot/baselines.mjs
node tools/sot/module-registry.mjs
node tools/sot/contracts.mjs
node tools/sot/preservation-check.mjs docs/sot-optimization/audits/sot-preservation-core-delta-2026-09-26.json
node tools/sot/project-traceability.mjs --check
node tools/sot/progress.mjs --check
node deploy/plan-consistency.mjs
```

Getesteter Ausgangsstand: `ac71e336e6339299ad54c733633643e0810401c7` plus
genau die vier in diesem Bericht beschriebenen Slice-Dateien vor dem Commit.
Ergebnisse: Golden-Delta `TEXT_CHANGED_MANIFEST_UNCHANGED`; Recovery,
Registry (11 Module), Contracts (5 Interfaces), Preservation (45/45) und
Planabgleich (63 Quellen) bestanden. Die gezielte Testgruppe für Baseline,
Registry, Contracts, Preservation, Traceability, Fortschrittszähler und
Planabgleich bestand mit **37/37**.

Die breite Suite `node --test tools/sot/*.test.mjs` hat **348/349** bestanden.
Der einzige Fehlschlag ist `rule-catalogue.test.mjs`: Sie erwartet 11
Katalogmodule, während der vorhandene Regelkatalog nur 9 liefert. Registry,
Katalog und dieser Test wurden in diesem Slice nicht verändert; der Fehler
liegt daher außerhalb des engen Core-Reduktionsumfangs und ist als nächster
lokaler Reparaturkandidat sichtbar, nicht als PASS ausgegeben.

Dieser Bericht ist kein Produkt-, Release- oder Live-Nachweis: Es wurden keine
Website-, Bild-, CMS- oder Betriebsdaten geändert. Wegen des genannten
Suite-Fehlers erfolgt kein Produktionsrollout.

## Restgrenze

Keine weitere Core-Reduktion ist aus diesem Slice ableitbar. Jeder weitere
Kandidat benötigt erneut eine eigene, abschnittsgenaue Zielmodul-, Contract-,
Referenz- und Golden-Delta-Prüfung.
