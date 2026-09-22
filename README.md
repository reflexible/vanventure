# VanVenture Website

Die zweisprachige Homepage und die Reiseberichte laufen produktiv auf Marvin: https://vanventure.at/. Der frühere GitHub-Pages-Auftritt besteht als ältere Veröffentlichung. Der verbindliche Überblick für Prioritäten, Phasen und neue Ideen steht im [Ausbauplan](docs/ausbauplan.md); SEO und Live-Betrieb sind unter [docs/seo.md](docs/seo.md) dokumentiert.

## Vor Veröffentlichung ergänzen

1. Aktuelle Fahrzeugdaten und Fotos
2. Reiseberichte mit Routen, Karten, Kosten und Stellplätzen
3. Echte Ausrüstungsliste und Kennzeichnung möglicher Affiliate-Links
4. Kontakt-E-Mail, Impressum und Datenschutzerklärung
5. Gewünschte Domain und Hosting

Zum lokalen Ansehen `index.html` in einem Browser öffnen. Keine Veröffentlichung oder externe Änderung erfolgt ohne ausdrückliche Freigabe.

Homepage und geschützte Redaktion laufen auf Marvin gemeinsam in Docker mit PostgreSQL. Die Redaktion ist unter https://vanventure.at/redaktion erreichbar. Überarbeitungen werden im Codex-Chat beauftragt. Änderungen dürfen auf Benutzerauftrag direkt im Live-System bereitgestellt werden; ein kurzer Neustart ist akzeptiert. Die Serverdatenbank ist maßgeblich. Der lokale Docker-Stack ist gestoppt, sein Datenbank-Volume bleibt erhalten. Technische Grundlagen stehen unter [editor/README.md](editor/README.md).

Vor einem GitHub-Pages-Release `node tools/export-pages.mjs` ausführen: Das exportiert die freigegebenen Datenbankberichte in `travel-stories.json`, aktualisiert die Startseite und baut die statischen Reiseseiten. Dafür müssen Docker und Python verfügbar sein; bei Bedarf `DOCKER_BIN` und `PYTHON_BIN` setzen. Zugangsdaten, Datenbankdumps, Originalbilder und private Analyseunterlagen werden nicht eingecheckt.

Für Releases des privaten Serverteils gelten die wiederholbaren Prüfungen in
[docs/betrieb.md](docs/betrieb.md). `npm run check:release` führt Tests,
Konfigurationsprüfung, Dump und Healthcheck aus; `npm run monitor:cockpit`
liefert einen sicher gekürzten Cockpit-Status für den Server-Monitor.
