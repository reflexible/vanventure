# SEO für VanVenture

Zieldomain: https://vanventure.at/ (Deutsch als initiale Seitensprache).

## Umgesetzt am 19.09.2026

- Individuelle Titel und Beschreibungen für Startseite, Fahrzeugprofil und drei Reiseberichte.
- Kanonische HTTPS-Adressen, Weiterleitung von `/index.html` auf `/`.
- Open-Graph-Vorschauen und JSON-LD für Website, Seiten und Breadcrumbs.
- `/sitemap.xml` mit fünf öffentlichen Seiten und `/robots.txt` mit Sitemap-Verweis.
- Redaktion, API und Fahrzeugprüfung mit `X-Robots-Tag: noindex, nofollow`; Entwürfe behalten ihr `noindex`.
- Live-Reiseberichte beziehen ihre Beschreibung aus den veröffentlichten Redaktionsdaten. Keine erfundenen Bewertungen, Datumsangaben oder Autoreninformationen.

Gemeinsame Implementierung: `editor/seo.mjs`. Nach einer statischen Neuerzeugung `node tools/build-seo.mjs` ausführen; `tools/export-pages.mjs` erledigt das automatisch. Tests: `node --test editor/*.test.mjs`. Live-Prüfung: `python tools/verify-seo.py`.

Die englische Umschaltung hat keine eigene URL. Deshalb werden keine irreführenden `hreflang`-Alternativen angegeben. Für englische Suchergebnisse wären eigenständige, serverseitig erreichbare Sprachseiten ein eigener Ausbau.

## Live-Betrieb

Auf Benutzerauftrag direkt auf Marvin bereitgestellt, ohne lokale Container vorauszusetzen. Die bestehende Serverdatenbank ist maßgeblich und wird nicht mit lokalen Daten überschrieben. Nur Webcontainer neu gebaut und gestartet; PostgreSQL bleibt bestehen.

Dateisicherung: `/opt/vanventure-backups/seo-20260919T165045Z`.
Vorheriges Image: `vanventure-web:before-seo-20260919t165045z`.

Abnahme: alle zwölf Anwendungstests bestanden. Öffentliche HTTPS-Prüfung der fünf Seiten einschließlich Canonical, JSON-LD und Vorschaubildern erfolgreich; außerdem Sitemap, robots.txt, Weiterleitung, Redaktions-Noindex, Healthcheck und Schutz privater Dateien geprüft.

Der lokale Stack wurde anschließend mit `docker compose stop web db` stillgelegt. Beide Container endeten mit Exitcode 0; das Volume `vanventure_postgres_data` bleibt erhalten. Zuvor zusammen rund 114 MiB Container-RAM. Docker Desktop und andere Projekte wurden nicht beendet oder bereinigt. Die Live-Website läuft unabhängig auf Marvin weiter.

## Nächste Schritte für messbare Sichtbarkeit

1. Domain in Google Search Console und Bing Webmaster Tools mit dem Eigentümerkonto bestätigen; danach `https://vanventure.at/sitemap.xml` einreichen. Ohne bestätigten Kontozugang wurde keine Einreichung vorgenommen.
2. In der Search Console die fünf URLs prüfen und Indexierung anstoßen. Indexierung, Suchbegriffe, Impressionen und Klicks nach einigen Wochen beurteilen.
3. Inhaltlich zunächst konkrete Themen stärken: Norwegen mit VW California, Sardinien mit Camper und Mountainbike, fünf Wochen Italien mit Camper, HYMER Grand Canyon S CrossOver 2025.
4. Die Reiseberichte um tatsächlich belegte Etappen, Stellplätze, Reisezeiten und eigene Erfahrungen ergänzen. Keine Kosten, Tipps oder Ergebnisse erfinden.
5. Den Website-Link bei passenden bestehenden YouTube-Reisevideos ergänzen, wenn ausdrücklich beauftragt. Keine gekauften Links oder automatisierten Fremdbeiträge.

Ein Spitzenplatz kann nicht zugesichert werden. Google beschreibt sowohl die Grundlagen als auch die mögliche Verzögerung von Wochen bis Monaten: https://developers.google.com/search/docs/fundamentals/seo-starter-guide.
