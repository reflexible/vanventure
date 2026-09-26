# Abnahmebericht – WI-SOT-31-01 lokaler Governance-End-to-End-Ablauf

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Eine authentisierte lokale Änderung durchläuft Entscheidung, Review, Update, FAST-Prüfung, Audit und DONE-Nachweis. | Bestanden | `node --test tools/sot/governance-workflow.test.mjs tools/sot/post-validation.test.mjs tools/sot/project-audit.test.mjs tools/sot/done-guard.test.mjs tools/sot/worker-state.test.mjs` |
| Der geprüfte Worker-Ablauf verlangt Claim, Handover, unabhängige Review und Integrationsbeleg vor DONE. | Bestanden | Positive und negative Worker-Store-Fälle im Verbundtest. |
| Falsche oder veraltete Evidenz, fehlende Validatoren, Full-Eskalation, Drift und Unterbrechungen sperren oder rollen den Ablauf zurück. | Bestanden | Negative Workflow-, Post-Validation-, Audit- und Done-Guard-Fälle im Verbundtest. |
| Der Durchlauf verändert keine Projektproduktion und aktiviert kein WSJF. | Bestanden | Isolierte temporäre Test-Repositories; Tests weisen `live_rollout: false` aus. |

## Getesteter lokaler Quellstand

- Verbundprüfung: **68/68** Tests bestanden.
- Positive Kernstrecke: disk-basierter lokaler Pipeline-Test mit exakter
  Nutzerentscheidung, Source-Update, gebundenem Audit und `DONE_ALLOWED`.
- Schutzstrecken: Evidence-/Source-Drift, fehlende Prüfer, FULL-Eskalation,
  unzulässige Done-Übergänge und Recovery nach Prozessunterbrechung.

## Status und Restarbeit

**Lokaler Status:** bestanden. Der Nachweis ist ein realistischer isolierter
Governance-Ablauf mit temporären Projektkopien, kein fachlicher Pilot auf den
echten Produktionsquellen. Die gezielte Prüfung einer lokalen Änderung im
integrierten Ablauf bleibt als eigenständiger Folgeslice `WI-SOT-31-02` offen.

**Live-Status:** nicht anwendbar. Keine Website-, Cockpit- oder
Betriebsänderung wurde ausgerollt. Der Planabgleich bleibt wegen 20
historisch offener Traceability-Punkte `PENDING`; daraus folgt keine
Produktivfreigabe.
