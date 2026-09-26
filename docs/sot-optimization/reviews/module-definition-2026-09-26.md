# WI-SOT-23-03 – Fachmodule definieren

Status: `LOCAL_DEFINITION_PASS` · Stand 26.09.2026.

## Verbindliche Modulgrenzen

| Domäne | Status | maßgebliche Quelle | Grenze |
| --- | --- | --- | --- |
| SoT-Governance | aktive Fachautorität | `docs/governance/source-of-truth-and-incremental-planning.md` | Steuert Intake, Konflikt, Freigabe, Update und Done; kein zweiter Gesamtplan. |
| WSJF | aktive, begrenzte Fachautorität | `docs/governance/wsjf.md` | Bewertet nur; autorisiert weder Claim, Board-Bewegung noch Release. |
| Analytics | aktive Fachautorität | `docs/analytics.md` | Event-Policy und Schema bleiben dort; Laufzeitaktivierung bleibt gesperrt. |
| CMS | aktive Betriebsautorität mit Core-/Release-Vorrang | `editor/README.md` | Beschreibt bestehende Redaktion, ohne Freigabe-/Privacy-Gates zu umgehen. |
| Board | Core-gebunden, kein neues Modul | `docs/scrum-plan.md`, `### EPIC-BOARD` | Die noch geplanten Produktregeln bleiben im Scrum-Core, bis eine abschnittsgenaue Übernahme belegt ist. |
| Video | referenzgebunden, kein neues Modul | `docs/creator-system.md` und produktspezifische Briefs | Checkliste und Briefs bleiben in ihrem jeweiligen Umfang; kein pauschales Video-Regelwerk wird erfunden. |

Die erste vier Autoritäten sind im
[`module-registry.json`](../../governance/module-registry.json) eindeutig
registriert. Board und Video sind absichtlich nicht als aktive neue
Autoritäten registriert. Damit bleibt genau eine Regelquelle je Thema
erhalten und der Scrum-Core wird nicht durch eine parallele Fachdatei
geschwächt.

## Prüfnachweis

`node tools/sot/module-registry.mjs` und `node tools/sot/contracts.mjs`
validieren die aktuelle Registry mit neun eindeutigen Modulen und fünf
bilateralen Contracts. `node --test tools/sot/module-registry.test.mjs
tools/sot/contracts.test.mjs` bestand mit 11/11 Fällen.

## Restgrenzen

`WI-SOT-23-04` prüft als Nächstes die Modul-Contracts gegen diese Grenzen.
`WI-SOT-23-05` betrifft nur bereits vorhandene, belegbare Modulquellen.
Vor einer Core-Entfernung sind pro betroffenem Abschnitt eine vollständige
Übernahme, eine Contract-/Referenzprüfung und das Golden-Baseline-Delta
erforderlich. Diese Definition selbst ist keine Produkt-, Design-, Release-
oder Live-Freigabe.
