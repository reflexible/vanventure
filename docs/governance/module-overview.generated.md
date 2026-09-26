<!-- GENERATED FILE: edit docs/governance/module-registry.json, then regenerate with tools/sot/module-overview.mjs. -->
# Generierte Gesamtansicht der Module

**Status:** `DERIVED_INDEX_ONLY` · Quelle: [`module-registry.json`](module-registry.json).

Diese Ansicht ist ein schreibgeschützter Index. Sie enthält keine Regeln,
keinen Backlog und keine Freigaben. Maßgeblich bleiben ausschließlich die
jeweils verlinkten Quellen; `scoped_reference`-Einträge sind ausdrücklich
keine Fachautoritäten.

| Modul | Rolle | Authority-/Referenzschlüssel | Quelle | Abhängigkeiten | Contracts |
| --- | --- | --- | --- | --- | --- |
| `scrum-core` | Fachautorität | planning.scrum-core | [docs/scrum-plan.md](../scrum-plan.md) | — | SCRUM-WORK-ITEM, SOT-DECISION-CHANGE, WORKER-WORK-ASSIGNMENT |
| `sot-architecture` | Fachautorität | governance.sot-architecture | [docs/governance/source-of-truth-and-incremental-planning.md](source-of-truth-and-incremental-planning.md) | scrum-core | SCRUM-WORK-ITEM, SOT-DECISION-CHANGE, WORKER-WORK-ASSIGNMENT |
| `wsjf` | Fachautorität | planning.wsjf-assessment | [docs/governance/wsjf.md](wsjf.md) | scrum-core, sot-architecture | — |
| `analytics` | Fachautorität | website.analytics | [docs/analytics.md](../analytics.md) | — | ANALYTICS-CONTENT-ID |
| `design-guide` | Fachautorität | website.design | [docs/design-guide.md](../design-guide.md) | — | — |
| `responsive-templates` | Fachautorität | website.responsive-templates | [docs/responsive-templates.md](../responsive-templates.md) | design-guide, consolidated-mandate | — |
| `consolidated-mandate` | Fachautorität | governance.delivery-and-approvals | [docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md](../vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md) | design-guide | — |
| `cms-content` | Fachautorität | website.cms-content | [editor/README.md](../../editor/README.md) | release-governance | CMS-PUBLISHING, ANALYTICS-CONTENT-ID |
| `release-governance` | Fachautorität | governance.release-approval | [docs/scrum-migration/release-decisions.md](../scrum-migration/release-decisions.md) | — | CMS-PUBLISHING |
| `board-architecture` | Core-Referenz (scrum-core) | Referenz: planning.board-architecture | [docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md](../VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md) | scrum-core | — |
| `video-production` | Core-Referenz (scrum-core) | Referenz: editorial.video-production | [docs/creator-system.md](../creator-system.md) | scrum-core | — |

*Generiert aus 11 Registry-Einträgen. Der Generator prüft diese Datei mit `--check`; eine Abweichung ist kein neuer Regelstand.*
