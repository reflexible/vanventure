# Prüfgrenze: WSJF-Rechen- und Queue-Prototyp

Stand: 26.09.2026 · lokaler Teil von `ST-SOT-19`.

| Bereich | Ergebnis |
| --- | --- |
| Scoring | `tools/sot/wsjf.mjs` nutzt ausschließlich 1, 2, 3, 5, 8, 13, 20; berechnet Cost of Delay und WSJF und verlangt Gründe sowie Confidence. |
| Geschützte Entscheidungen | Bestätigter/überschriebener Business Value wird bei automatischer Neubewertung geschützt. Manuell geschätzter WSJF wird abgelehnt. Ein Priority Override braucht einen Grund und ändert den Score nicht. |
| Große Stories | Job Size 13/20 löst eine Zerlegungsprüfung aus und benötigt eine dokumentierte Begründung. |
| Ready Queue | Nur ausführbare, ungeclaimte, nicht blockierte, konfliktfreie Stories werden gereiht. WSJF ordnet diese; Score erteilt keine Ausführungsfreigabe. |
| Tests | `node --test tools/sot/wsjf.test.mjs` — 6/6 bestanden. |
| Offener Umfang | Die vollständige Regel- und Feldabbildung der 67 Quellabschnitte, Neubewertung/Audit-Historie, Enabler- und Vergleichsraumregeln, Agent-Pull-Orchestrierung sowie Governance-End-to-End-Aktivierung bleiben offen. |
| Core/Release | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`; keine Produktiv-/Live-Änderung. |

**Status:** Rechenprototyp lokal geprüft. Keine WSJF-Aktivierung oder automatische Zuweisung.
