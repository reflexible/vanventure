# Abnahme des begrenzten Projektpiloten

Datum: 26.09.2026. Status: LOCAL_VERIFIED. Keine Veröffentlichung.

## Getesteter Quellstand

Ziel: ST-SOT-16 in der bestehenden autoritativen SoT-Fachdatei.
Vorher: `0e7a2557827caa9f2ce46ec7dfba5f21b145b7f123a739160622620646d14d25`.
Nachher: `d9eaf3c395dd1794a0bdfd68088cf4cedc2dcb0898906d2c6972ed51952a9068`.
Diese Hashes bezeichnen den Pilotstand vor späterer regulärer Statuspflege.

Die Vorbereitung qualifizierte den früheren Implementierungsstatus ausdrücklich
als historischen Stand vor dem Pilot. Anschließend führte ausschließlich
`runGovernanceWorkflow` die geprüfte sachliche Ergänzung aus. Keine bestehende
Core- oder Fachregel wurde ersetzt. Die Originalbytes des Zielabschnitts sind
vollständig erhalten. Alle sieben anderen aktiven Modulquellen blieben bytegleich.

## Evidenzmatrix

| Work Item / Anforderung | Tatsächlicher Nachweis | Ergebnis |
| --- | --- | --- |
| WI-SOT-13-07: konkreter geprüfter Scope | Quellengebundener Review, vollständiges Zielinventar, getrennte globale Lücken | PASS für diesen Vorschlag; acht globale Lücken bleiben sichtbar. |
| WI-SOT-15-07: dauerhafte Nutzerprovenienz | Originalanhang bytegleich kopiert; vorhandene Aufgabenautorisierung begrenzt zugeordnet; Decision Store rev3; erneute Original-/Manifest-/Proposal-Prüfung | PASS; kein erfundener neuer Freigabeakt. |
| WI-SOT-16-01: autoritative Quelle aktualisieren | Tatsächliche Einfügung in die registrierte Quelle, gebunden an Zielanker, Ausgangshash und persistierte Autorisierung | PASS. |
| WI-SOT-17-04: Delta prüfen | Echter Vorher-/Nachher-Snapshot und geprüfte unveränderte Originalinhalte | PASS. |
| WI-SOT-17-05: erforderlicher Check | Factual metadata/reference addition, begründeter FAST CHECK; keine semantische Core-Änderung | FAST_CHECK_PASS. |
| Post-Validation | Registry, Contracts, Dependencies, aktuelle Quellen, Delta, Pflichtprüfung, SoT-Konsistenz, Traceability | Acht Prüfungen PASS. |
| Golden Baseline | Core-SHA `1871297946bc4084cb521de69a765164024092eb917c6f58851ce3f139ee1b84`; kein Diff gegenüber `dac0199` | Unverändert. |

## Reproduzierbarkeit und Rohdaten

Der begrenzte [Pilot-Runner](../../../tools/sot/project-governance-pilot.mjs)
verlangt getrennte Vorbereitung und ausdrücklich übergebene Input-/Import-Hashes.
Ein zweiter Lauf desselben Vorschlags wird nicht still angewendet. Original,
Proposal, Review, Katalog, Entscheidungen und Ergebnisse sind gespeichert:

- [Review und geprüfte Hashes](../audits/project-governance-pilot/review.md)
- [Eingabesnapshot](../audits/project-governance-pilot/input.json)
- [Ergebnis](../audits/project-governance-pilot/result.json)
- [Delta-/FAST-Audit](../audits/project-governance-pilot/audit.json)
- [Post-Validation](../audits/project-governance-pilot/audit.post-validation.json)
- [Persistierte Entscheidungen](../../governance/decision-state.jsonl)

Im Projektlauf wurden der echte Plancounter sowie Baseline-/Workflow-Tests
ausgeführt. Die isolierten Workflow-Regressionen decken außerdem Fehler,
Rollback, Prozessabbruch und geänderte abhängige Quellen ab. Die normative
Abnahme stützt sich zusätzlich auf den unabhängigen Review von coverage_path,
der Original, Quellhashes, exakte Einfügung und Nutzerprovenienz erneut prüfte.

## Grenzen und Folgearbeit

Dies ist die lokale Abnahme eines konkreten Metadaten-Scopes. Keine pauschale
semantische Vollständigkeit aller Fachmodule, keine CMS-/Analytics-Laufzeitabnahme,
kein Superseding, kein produktiver Rollout und keine automatische WSJF-Aktivierung.
Der erste Ergebnisdatensatz markiert ausdrücklich `work_item_done_written: false`;
der tatsächliche Worker-Abschluss wird separat mit gebundenen Artefakten integriert.
Spätere Planstatusänderungen sind ein neues Delta; die Pilot-Audits bleiben
unverändert historische Nachweise ihres jeweiligen getesteten Zustands.

## Nachfolgende Integration

Die neue `integration-attestation.json` bindet die unveränderten ursprünglichen
Pilotartefakte an ihren konkreten Quellstand und die geprüfte Runtime. Der echte
WorkerStore integrierte WI-SOT-16-01 nach separatem Review als `Done`.
WI-SOT-13-07 und WI-SOT-15-07 wurden als im selben Pilot belegte Komponenten
abgenommen; eigene Komponentenbelege erklären diesen begrenzten Umfang.
WI-SOT-17-04 und WI-SOT-17-05 sind damit ebenfalls lokal nachgewiesen.
Der nachfolgende Planstatus ist ein neues Delta und verändert keine Pilotbelege.
213/213 Governance-Tests bestanden vor der nächsten Implementierung.
