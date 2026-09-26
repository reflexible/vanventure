# Abnahmegrenze: lokaler gemeinsamer Worker-Zustand

Stand: 26.09.2026 · Grundlage für `ST-SOT-20` lokal umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Autorität | `docs/governance/worker-state.json` speichert ausschließlich operative Claims, Übergaben, Review/Integration und Ereignisse. Work-Item-Definitionen und READY-Status werden vor jedem Claim aus dem bestehenden SoT-Fachmodul gelesen. Es entsteht kein zweiter Backlog. |
| Transaktionen | Eine exklusive lokale Dateisperre schützt konkurrierende Zustandsänderungen. Es gibt je Item höchstens einen aktiven Claim und je Implementation Agent höchstens eine aktive Implementierung. Überschneidende Scopes benötigen denselben belegten Koordinationsverweis. |
| Übergänge | Claimed → In Progress → Review → Integration → Done verlangt Übergabe, Review und bestandene Integration. Blockieren/Freigeben und explizite Controller-Neuzuweisung werden protokolliert. Abgeleitete Worker-/Prozessansichten stehen für Graph und Impact bereit. |
| Validierung | `node --test tools/sot/worker-state.test.mjs` besteht 6/6 Fälle, darunter zwei echte Rennen zwischen getrennten Node-Prozessen, Scope-Konflikte und Review-/Done-Gates. |
| Umfangsgrenze | Gemeinsames lokales Dateisystem; keine standortübergreifende Transaktion, automatische Stale-Lock-Recovery, Ready Queue oder WSJF-Aktivierung. Die Ableitungen sind noch nicht an Graph/Impact sowie reale Chat-/Controller-Abläufe angeschlossen (`WI-SOT-05-04`, `06-09`, `20-10`). `ST-SOT-20` bleibt unvollständig. |
| Core-Schutz | `docs/scrum-plan.md` und `docs/ausbauplan.md` wurden nicht geändert. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-20-01`–`03` und `06`–`09` lokal DONE; `04`–`05` und `10` offen.
