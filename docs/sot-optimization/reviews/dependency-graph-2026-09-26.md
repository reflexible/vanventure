# Abnahmegrenze: Dependency Graph

Stand: 26.09.2026 · `ST-SOT-05` lokal in der dokumentierten Struktur umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Quellen | Der Graph wird aus Modul-Registry, Contracts und den dokumentierten Story-/Work-Item-Vorgängern des autoritativen Fachmoduls abgeleitet. `docs/governance/dependency-graph.json` bezeichnet diese Quellen und speichert keinen konkurrierenden Zustandsstand. |
| Validierung | `node tools/sot/dependency-graph.mjs` meldet 233 Knoten und 327 Kanten. Vier gezielte Tests in `node --test tools/sot/dependency-graph.test.mjs` prüfen Quellabbildung, direkte und transitive Auswirkungen, unbekannte Knoten und Zyklen sowie explizite Worker-Eingaben. |
| Umfangsgrenze | Eine harte Reihenfolge wird nur aus dokumentierten Vorgängern abgeleitet. Laufende Worker können über explizite Eingaben berücksichtigt werden; die Anbindung an einen gemeinsamen operativen Worker-State ist noch offen (`WI-SOT-05-04`). |
| Core-Schutz | `git diff --exit-code dac0199 -- docs/scrum-plan.md` besteht. Der historische `docs/ausbauplan.md` wird nicht geändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-05-01`–`03` und `05`–`08` lokal DONE; `WI-SOT-05-04` bleibt TODO.
