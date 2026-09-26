# Abnahmegrenze: belegter Regelkatalog, erster Scope

Stand: 26.09.2026 · `WI-SOT-13-05`–`06` lokal geprüft.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Bestand | 18 genaue Regelauszüge aus allen acht registrierten Autoritätsmodulen sind mit Regel-ID, Quelle, eindeutigem Überschriftenanker und Wortlaut erfasst. Neue Vorschläge können gegen diese Kandidaten mit explizitem Review verglichen werden. |
| Coverage | Alle acht Module sind `partial`; nicht katalogisierte Regeln bleiben `Unknown`. Das System behauptet für keinen Bereich stillschweigend Vollständigkeit. |
| Validierung | `node tools/sot/rule-catalogue.mjs` bestätigt 18 quellengeprüfte Auszüge. `node --test tools/sot/rule-catalogue.test.mjs tools/sot/sot-impact.test.mjs` besteht 7/7 Fälle; veraltete Anker/Texte, Eigentümerfehler und unbelegte `complete`-Angaben scheitern. |
| Umfangsgrenze | Ein Projektvorschlag kann erst nach belegter Abdeckung seines relevanten Regelbereichs ohne `Unknown` in eine verbindliche SoT-Entscheidung gehen. Das benötigte Scope-Inventar folgt in `WI-SOT-13-07`; der Katalog ist kein neuer Regelgeber. |
| Core-Schutz | Kein Core- oder Ausbauplan-Diff in diesem Slice. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-13-05`–`06` lokal DONE; vollständige betroffene Scope-Abdeckung offen.
