# Abnahmegrenze: dauerhafte SoT-Intake-Erfassung

Stand: 26.09.2026 · `ST-SOT-12` lokal als Vorschlagsaufnahme umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Ablage | Ideen, Pläne, Entscheidungen und Regeln werden als nicht bindende Vorschläge mit Provenienz, Registry-Eigentümer und optionaler bestehender Work-Item-ID in `docs/governance/intake-proposals.jsonl` erfasst. Die Datei ist operativer Intake-Nachweis, kein Plan und keine neue Regelautorität. |
| Sicherheit | Derselbe Vorschlag wird idempotent behandelt. Ein exklusiver lokaler Lock serialisiert parallele Schreiber; Sequenz und Hashkette machen nachträgliche Veränderung sichtbar. Andere Zielpfade, fehlende Work Items und im Intake gesetzte Freigaben werden zurückgewiesen. |
| Validierung | `node --test tools/sot/intake.test.mjs tools/sot/intake-store.test.mjs` besteht 13/13 Fälle, darunter sechs konkurrierende Prozesse und ein manipulierter Vorzustand. |
| Umfangsgrenze | Die Datei entsteht beim ersten gültigen Intake. Aufnahme bedeutet keine Genehmigung oder Übernahme in eine autoritative Quelle; Impact, Conflict und Approval folgen in `ST-SOT-13`–`16`. Das Lock ist lokal, nicht standortübergreifend. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-12-01`–`05` lokal DONE; End-to-End-Governance offen.
