# Historische Formulierungen – expliziter Zielabgleich

Stand: 26.09.2026. Geprüfter Quellstand: lokaler Commitstand vor diesem
Abgleich. Dieser Nachweis ergänzt den eintragsweisen Migrationsnachweis in
`legacy-ausbauplan-migration-2026-09-26.md`. Er ersetzt keine Quelle und
schreibt keine historische Formulierung um.

Die nachstehenden Einträge lösen die bisherige technische Fehlannahme auf,
dass historische Formulierungen im kanonischen Scrum-Plan wörtlich vorkommen
müssten. Jede Zuordnung verweist stattdessen auf ein vorhandenes, prüfbares
Ziel. Status-, Implementierungs-, Freigabe- und Live-Aussagen werden daraus
nicht abgeleitet.

| ID | Historische Quelle und Formulierung | Kanonisches Ziel | Abgleichbefund |
| --- | --- | --- | --- |
| HPM-01 | `docs/content-plan-90-tage.md` — `Langzeiterfahrung), EXPLORE` | `ST-CON-09/10` | EXPLORE ist als eigenständiges Kurzformat mit getrenntem Schnitt und Nachweis geplant; die konkrete historische Klammerform ist kein Planbegriff. |
| HPM-02 | `docs/vanventure-cockpit-mvp.md` — `Automatisiert prüfen: gültige Anmeldung` | `ST-AUTH-01` | Gültige und abgewiesene Rollenfälle sind als getrennte Prüffälle festgelegt. |
| HPM-03 | `docs/vanventure-cockpit-plan.md` — `Administrator-Aktion „YouTube` | `ST-INS-03` | YouTube-OAuth ist vom Website-Login getrennt und ausschließlich administrativ verwaltbar. |
| HPM-04 | `docs/vanventure-cockpit-plan.md` — `Traffic Sources sowie verfügbare Retention` | `ST-INS-04` | Analytics-Zeitreihen bleiben an ihre Verfügbarkeit und API-Grenzen gebunden. |
| HPM-05 | `docs/channel-audit-v1.md` — `Flow Trail: 986` | `ST-INS-04` | Die historische View-Zahl ist ein Datenpunkt für die geplante Analytics-/Datenqualitätsprüfung, keine Sollzahl. |
| HPM-06 | `docs/channel-audit-v1.md` — `Norwegen: 108` | `ST-CON-12/16` | Die historische Watchtime bleibt Context-Fakt; die getrennte 28-Tage-Review-Stufe ist das aktuelle Ziel. |
| HPM-07 | `docs/channel-audit-v1.md` — `Trolltunga: 149` | `ST-CON-09/10` | Der historische Short-Befund ist dem getrennten EXPLORE-Kurzformat zugeordnet, ohne Ergebnisversprechen. |
| HPM-08 | `docs/channel-audit-v1.md` — `Traffic Sources für 19 Videos` | `ST-INS-04` | Die historische Datenabdeckung informiert den Analytics-Slice, begründet aber keine behauptete Vollständigkeit. |
| HPM-09 | `docs/creator-system.md` — `Low-Effort-Creator-System` | `ST-CON-12/16` | Aufwand und Nutzen werden als Produktions-/Review-Entscheidung, nicht als erfüllter Ist-Zustand geführt. |
| HPM-10 | `docs/seo.md` — `ausgewählten Reisevideos passende Website-Links` | `ST-CON-11/15` | Die Website-Ergänzung ist ein eigenes, pro Track nachverfolgbares Ziel. |
| HPM-11 | `docs/riverstar/entwurf.md` — `Gewässer/Ort der Uferbilder` | `ST-PHOTO-01` | Bildherkunft, Motiventscheidung und Veröffentlichung bleiben dem Foto-Slice und seinen Freigaben zugeordnet. |
| HPM-12 | `docs/design-guide.md` — `Einheitlichen Design Guide und Hero-Standard` | `ST-WEB-01` | Gemeinsame öffentliche Web-Bausteine folgen dem freigegebenen Design Guide; neue Regeln bleiben freigabepflichtig. |
| HPM-13 | `docs/responsive-templates.md` — `Zentrale responsive Unterseiten-Templates` | `ST-WEB-02` | Zentralisierte Seitentypen, Inhalte und gemeinsame Darstellung sind getrennt abnehmbar beschrieben. |
| HPM-14 | `docs/analytics.md` — `ANALYTICS 0–8` | `ST-INS-04` | Die nummerierte historische Arbeitsliste wird durch den aktuellen Insights-/Analytics-Slice repräsentiert. |
| HPM-15 | `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` — `Dokumentiert und im Projekt verankert am 23. September 2026` | `ST-WEB-03` | Der datierte Dokumentationsstand ist historischer Nachweis; die integrierte Releaseabnahme ist davon getrennt. |
| HPM-16 | `docs/vanventure-responsive-templates-auftrag.md` — `Zentrale responsive Unterseiten-Templates` | `ST-WEB-02` | Gleicher fachlicher Template-Auftrag mit eigener Quellprovenienz; kein zweites aktives Planobjekt. |
| HPM-17 | `docs/betrieb.md` — `Backup/Restore inklusive Cockpit-Tabellen` | `ST-OPS-01` | Restore und Datenintegrität sind ein separater Betriebsslice. |
| HPM-18 | `docs/betrieb.md` — `Bei jedem Web-Release` | `ST-WEB-03` | Release-Prüfung bleibt ein zusammenhängendes, abgrenzbares Gate statt einer pauschalen Erfolgsaussage. |

## Reproduzierbare Prüfung

`node --test deploy/plan-consistency.test.mjs`

`node deploy/plan-consistency.mjs`

Erwartetes Ergebnis nach diesem Abgleich: `PASS`. Die Prüfung bestätigt nur
die Plan- und Quellenzuordnung.
