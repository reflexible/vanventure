# VanVenture Website

Die zweisprachige Homepage und die Reiseberichte werden über GitHub Pages aus `main` veröffentlicht: https://reflexible.github.io/vanventure/.

## Vor Veröffentlichung ergänzen

1. Aktuelle Fahrzeugdaten und Fotos
2. Reiseberichte mit Routen, Karten, Kosten und Stellplätzen
3. Echte Ausrüstungsliste und Kennzeichnung möglicher Affiliate-Links
4. Kontakt-E-Mail, Impressum und Datenschutzerklärung
5. Gewünschte Domain und Hosting

Zum lokalen Ansehen `index.html` in einem Browser öffnen. Keine Veröffentlichung oder externe Änderung erfolgt ohne ausdrückliche Freigabe.

Homepage und geschützte Redaktion laufen lokal gemeinsam in Docker mit PostgreSQL. Kontoeinrichtung, Benutzerverwaltung und Textbearbeitung erfolgen unter http://localhost:8080/redaktion. Überarbeitungen werden im Codex-Chat beauftragt. GitHub Pages stellt nur die öffentliche statische Seite bereit. Infrastruktur, Datenbank-Backups und der spätere HTTPS-Betrieb auf Hetzner sind unter [editor/README.md](editor/README.md) beschrieben.

Vor einem GitHub-Pages-Release `node tools/export-pages.mjs` ausführen: Das exportiert die freigegebenen Datenbankberichte in `travel-stories.json`, aktualisiert die Startseite und baut die statischen Reiseseiten. Dafür müssen Docker und Python verfügbar sein; bei Bedarf `DOCKER_BIN` und `PYTHON_BIN` setzen. Zugangsdaten, Datenbankdumps, Originalbilder und private Analyseunterlagen werden nicht eingecheckt.
