# Abnahmegrenze: Baseline-System

Stand: 26.09.2026 · `ST-SOT-09` lokal umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Golden Scrum Recovery | `node tools/sot/baselines.mjs` liest den festgelegten Tag und Audit-Commit, prüft Git-Blob, LF- und CRLF-SHA-256 sowie den R5-Auditbericht. Die aktuelle Arbeitsdatei wird dabei nicht überschrieben. |
| Byte/Text/Semantik | Byte- und nur zeilenendennormalisierte Text-Hashes sind getrennt. Semantik wird ausschließlich gegen ein explizites versioniertes Requirements-Manifest verglichen; ohne aktuelles Manifest lautet der Befund `TEXT_CHANGED_SEMANTICS_UNVERIFIED`. |
| Tests | `node --test tools/sot/baselines.test.mjs`: 5/5 bestanden, einschließlich Format-only, Manifest-Delta, falscher Referenz, fehlender Provenienz und exakter Recovery. |
| Schutzgrenze | Der historische Golden-Stand bleibt unverändert und referenziert. Neue oder geänderte Module benötigen eigene, belegte Baselines; ein Freitextvergleich allein belegt keine semantische Gleichheit. |
| Release/Live | Keine Website-/Hoständerung und keine Live-Verifikation. |

**Status:** `WI-SOT-09-01` bis `WI-SOT-09-06` lokal DONE; spätere
Delta Detection und inkrementelles Audit bleiben eigene Slices.
