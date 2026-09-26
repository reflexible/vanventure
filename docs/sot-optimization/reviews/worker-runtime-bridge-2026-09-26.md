# Abnahmegrenze: Worker-Runtime-Bridge

Stand: 26.09.2026 · lokaler Adapter für Graph und Impact umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Eingabe | Der Adapter liest den gemeinsamen operativen Worker-State, leitet aktive Claims für den Graphen und Prozesse für die Impact Engine ab und ordnet Schreibbereiche eindeutigen Registry-Modulen zu. |
| Konflikt | Ein explizit übergebener geplanter Schreibbereich, der mit aktiver Arbeit überlappt, setzt den Prozesskonflikt. Unbekannte oder mehrdeutige Scope-Autorität blockiert. Der Adapter führt keinen eigenen Backlog. |
| Validierung | `node --test tools/sot/worker-runtime.test.mjs` besteht 4/4 Fälle; ein aktiver Claim erscheint im Graphen, und ein überlappender Scope löst FULL CHECK aus. |
| Umfangsgrenze | Aufrufer müssen den Adapter und `proposedWriteScope` ausdrücklich verwenden. Die Registry enthält noch keine vollständigen `owned_scopes` für Komponenten wie `authentication`; solche Scopes schlagen sicher fehl. Die allgemeine Orchestrator-Anbindung bleibt `WI-SOT-11-07`. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-05-04` und `WI-SOT-06-09` als lokale Schnittstelle DONE; automatische Nutzung im Gesamtworkflow offen.
