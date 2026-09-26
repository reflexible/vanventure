# Abnahmegrenze: Contract-System

Stand: 26.09.2026 · `ST-SOT-04` lokal als Schnittstelleninfrastruktur umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Fünf Schnittstellen | `SCRUM-WORK-ITEM`, `SOT-DECISION-CHANGE`, `WORKER-WORK-ASSIGNMENT`, `CMS-PUBLISHING`, `ANALYTICS-CONTENT-ID` mit Version, beteiligten Modulen, Pflichtfeldern und referenzierten bestehenden Regeln. |
| Registry | Acht Fach-/Technikreferenzen; Contract-IDs sind beidseitig und eindeutig verknüpft. CMS-Content liefert Publishing-Daten an Release-Governance und Content-IDs an Analytics. Konkrete Freigabe- und Analyticsregeln bleiben in ihren bestehenden Quellen. |
| Validierung | `node tools/sot/module-registry.mjs` und `node tools/sot/contracts.mjs` validieren 8 Module und 5 Contracts. `node --test tools/sot/module-registry.test.mjs tools/sot/contracts.test.mjs` besteht 11/11 Fälle. Entfernte Felder, neue Pflichtfelder und inkompatible Typänderungen verlangen eine Major-Version; optionale Ergänzungen mindestens Minor. |
| Umfangsgrenze | Der Katalog ist als `interface_metadata_only` gekennzeichnet. Feld-/Typprüfung und Versionsbruchprüfung sind lokal implementiert. Die fachlichen Invarianten werden noch nicht in CMS-, Analytics- oder Worker-Laufzeitpfaden erzwungen; `WI-SOT-04-10` führt diese Arbeit sichtbar weiter. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-04-01`–`09` und `WI-SOT-03-07` lokal DONE;
`WI-SOT-04-10` bleibt TODO. Nächster Enabler ist der Dependency Graph.
