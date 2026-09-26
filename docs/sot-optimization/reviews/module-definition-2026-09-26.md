# WI-SOT-23-03 – Fachmodule definieren

Status: `LOCAL_DEFINITION_PASS` · Stand 26.09.2026.

## Verbindliche Modulgrenzen

| Domäne | Status | maßgebliche Quelle | Grenze |
| --- | --- | --- | --- |
| SoT-Governance | aktive Fachautorität | `docs/governance/source-of-truth-and-incremental-planning.md` | Steuert Intake, Konflikt, Freigabe, Update und Done; kein zweiter Gesamtplan. |
| WSJF | aktive, begrenzte Fachautorität | `docs/governance/wsjf.md` | Bewertet nur; autorisiert weder Claim, Board-Bewegung noch Release. |
| Analytics | aktive Fachautorität | `docs/analytics.md` | Event-Policy und Schema bleiben dort; Laufzeitaktivierung bleibt gesperrt. |
| CMS | aktive Betriebsautorität mit Core-/Release-Vorrang | `editor/README.md` | Beschreibt bestehende Redaktion, ohne Freigabe-/Privacy-Gates zu umgehen. |
| Board | Core-gebundenes Referenzmodul | `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md` | `board-architecture` ist nur unter `scrum-core` registriert; die noch geplanten Produktregeln bleiben im Scrum-Core. |
| Video | Core-gebundenes Referenzmodul | `docs/creator-system.md` und produktspezifische Briefs | `video-production` ist nur unter `scrum-core` registriert; Checkliste und Briefs bleiben in ihrem jeweiligen Umfang. |

Die ersten vier Autoritäten sind im
[`module-registry.json`](../../governance/module-registry.json) eindeutig
registriert. Board und Video sind dort als `scoped_reference` mit
`authority: null` und `owner_module: scrum-core` aufgebaut. Damit bleiben sie
auffindbar und maschinell prüfbar, ohne eine zweite Regelquelle zu erzeugen
oder den Scrum-Core durch eine parallele Fachdatei zu schwächen.

## Prüfnachweis

`node tools/sot/module-registry.mjs` und `node tools/sot/contracts.mjs`
validieren die aktuelle Registry mit elf eindeutigen Modulen und fünf
bilateralen Contracts. `node --test tools/sot/module-registry.test.mjs
tools/sot/contracts.test.mjs` besteht mit 13/13 Fällen.

## Restgrenzen

`WI-SOT-23-04` ist lokal abgeschlossen: Die fünf bestehenden bilateralen
Contracts sind gegen die registrierten Modulgrenzen geprüft; Version,
Pflichtfelder, Invarianten und beidseitige Registry-Verweise werden
maschinell validiert. Der Nachweis steht im
[`Contract-System`](contract-system-2026-09-26.md) und im
[`Abnahmebericht`](../../abnahmeberichte/sot-cms-module-reference-2026-09-26.md).
Dies ist keine Laufzeit-, Release- oder Live-Freigabe.

`WI-SOT-23-05` baut die vorhandenen, belegbaren Modulquellen als aktive
Autoritäten oder explizit Core-gebundene Referenzen auf.
Vor einer Core-Entfernung sind pro betroffenem Abschnitt eine vollständige
Übernahme, eine Contract-/Referenzprüfung und das Golden-Baseline-Delta
erforderlich. Diese Definition selbst ist keine Produkt-, Design-, Release-
oder Live-Freigabe.
