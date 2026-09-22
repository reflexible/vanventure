# Marvin – übernommene Server- und Backupangaben

Diese Datei ist ein historischer Server- und Backupnachweis. Verbindliche
offene oder erledigte Arbeit steht ausschließlich im
[Gesamtplan](ausbauplan.md).

Stand: 19.09.2026. Quelle: `D:/work/_marvin_backup_2026`; erste Bestandsaufnahme per SSH ausschließlich lesend. Anschließende Veröffentlichungsvorbereitung auf ausdrücklichen Benutzerauftrag siehe nächsten Abschnitt.

## Aktueller Stand: HTTPS aktiv, DNS-Caches werden aktualisiert

### Aktuell: wieder automatische Zertifikatsverwaltung mit Let's Encrypt

Auf ausdrücklichen Benutzerwunsch wurde die manuelle IONOS-TLS-Zeile wieder entfernt. Die aktuelle Caddy-Konfiguration verwaltet das Zertifikat für `vanventure.at` automatisch, einschließlich Erneuerung. Das tatsächlich ausgelieferte Zertifikat stammt von Let's Encrypt (YE2), gültig bis 18.12.2026; SHA-256 `7ae8cea24301ce17be7730b4368c6bcfd9abd62e5cfefbdba41d90239fc641e0`. HTTPS-Zertifikatsprüfung, Homepage, Redaktion und HTTP-Weiterleitung wurden erfolgreich getestet. Konfigurationssicherung: `/etc/caddy/Caddyfile.before-letsencrypt-20260919`. Die IONOS-Dateien bleiben geschützt auf dem Server, sind aber nicht mehr eingebunden. Die zuvor beschriebene manuelle Erneuerung ist für den laufenden VanVenture-Auftritt damit nicht mehr erforderlich.

### Vorheriger Zwischenstand: IONOS-Zertifikat installiert

Auf Benutzerwunsch wurde das automatische Let's-Encrypt-Zertifikat durch das bereitgestellte IONOS/Sectigo-Zertifikat ersetzt. Es gilt für `vanventure.at` und `*.vanventure.at` vom 19.09.2026 bis 18.03.2027, 23:59:59 UTC. Zertifikat und privater Schlüssel passen zusammen; Hostname, Gültigkeit und Vertrauenskette wurden mit OpenSSL geprüft. Das fehlende Zwischenzertifikat stammt aus der im Zertifikat genannten Sectigo-AIA-Adresse und wurde gegen den System-Vertrauensspeicher geprüft.

Caddy verwendet `/etc/caddy/certs/vanventure-ionos-20260919/fullchain.pem` und `private.key` (root:caddy, 0640; Verzeichnis 0750). Das tatsächlich ausgelieferte Zertifikat stimmt bytegenau mit dem gelieferten Zertifikat überein. SHA-256: `2750b4e8c013ede62cf145f4343bca83cccca696a4d13b4cf9e1801d781320d3`. Konfigurationssicherung: `/etc/caddy/Caddyfile.before-ionos-20260919`. Prüfbericht lokal: `backups/marvin-release-20260919/ionos-verification.json`.

Dieses manuell installierte Zertifikat wird von Caddy nicht automatisch erneuert. Vor Ablauf ein erneuertes IONOS-Zertifikat samt passendem Schlüssel installieren oder wieder auf automatische Zertifikatsverwaltung umstellen. Es wurde keine Erinnerung eingerichtet. Das Wildcard-Zertifikat allein legt keine Subdomains oder DNS-Einträge an; veröffentlicht bleibt `vanventure.at`.

Update 19.09.2026, 16:15 Uhr Wien: Der autoritative DNS-Server liefert jetzt A `213.136.68.137` und keinen AAAA-Eintrag. Caddy hat um 16:14 Uhr das Zertifikat erfolgreich erhalten. Externe HTTPS-Tests mit expliziter Marvin-IP und regulärer Zertifikatsprüfung liefern für Homepage, alle drei Reiseberichte, Redaktion und Healthcheck HTTP 200. Der lokale DNS-Resolver liefert noch die alte IP; bis seine zwischengespeicherten Einträge ablaufen, können einzelne Besucher noch Fehler sehen. Die autoritativ gelieferte TTL beträgt 3600 Sekunden.

### Installationsverlauf vor der DNS-Umstellung

VanVenture ist unter `/opt/vanventure` auf Marvin installiert. `vanventure-web-1` und `vanventure-db-1` sind gesund. Web lauscht ausschließlich auf `127.0.0.1:18082`; PostgreSQL hat keinen veröffentlichten Hostport. Der bestehende Host-Caddy leitet `vanventure.at` an diese Anwendung weiter und HTTP auf HTTPS um. Die vorhandenen Domainblöcke wurden erhalten; die Konfiguration wurde vor dem Neuladen validiert und unter `/etc/caddy/Caddyfile.before-vanventure-20260919` gesichert. Die anderen Domains verwenden inzwischen ebenfalls HTTPS; Koebpollak wurde nach der Änderung mit HTTP 200 geprüft.

Die öffentlichen DNS-Einträge zeigten bei der Abschlussprüfung am 19.09.2026, 16:11 Uhr Wien noch auf den bisherigen Anbieter. Erforderlich beim DNS-Anbieter:

- A für `vanventure.at`: `213.136.68.137` statt `217.160.0.178`.
- Bisherigen AAAA-Eintrag `2001:8d8:100f:f000::200` entfernen.

Der Benutzer hat `vanventure.at` als Ziel gewählt. `www.vanventure.at` wurde nicht eingerichtet. Caddy versucht die automatische Zertifikatsausstellung; sie scheitert derzeit nachweislich an den alten A-/AAAA-Zielen. Öffentliches HTTPS ist deshalb noch nicht abgenommen. Nach der DNS-Umstellung Zertifikat, Homepage, Reiseberichte und Redaktion über `https://vanventure.at` erneut prüfen. DNS-TTL bei Prüfung: 3600 Sekunden.

Ein frischer Dump vom 19.09.2026, 14:08 UTC wurde restauriert. Alle fünf Tabellen wurden nach dem Webstart inhaltlich mit der lokalen Quelle verglichen: 1 Benutzer, 3 Entwürfe, 3 veröffentlichte Berichte, 11 Historieneinträge und 3 Einstellungen, alles identisch. Der ursprüngliche `EDITOR_SECRET` bleibt erhalten; Datenbankpasswort und Einrichtungscode wurden für den Server neu erzeugt. Private Dateien und Konfiguration haben eingeschränkte Dateirechte und sind nicht über den Webserver erreichbar.

Prüfungen: zehn Anwendungstests erfolgreich, acht interne Routen HTTP 200, Einrichtung vorhandener Konten gesperrt, 25 referenzierte Bilder erreichbar, private Pfade HTTP 404 und nicht angemeldete API-Zugriffe HTTP 401. Das Übertragungsarchiv wurde mit SHA-256 geprüft. Lokale Nachweise, Server-Compose-Datei und private Wiederherstellungsdaten: `backups/marvin-release-20260919/`. Keine Originalfotoarchive oder lokalen Analyseunterlagen übertragen.

Betrieb auf Marvin: `cd /opt/vanventure && docker compose -f compose.yaml ps`. Stoppen ohne Datenverlust: `docker compose -f compose.yaml stop`; Starten: `docker compose -f compose.yaml start`. Nie `down -v` zum normalen Stoppen verwenden. Die lokale Entwicklungs-Ergänzung heißt absichtlich `compose.dev.yaml` und wird auf Marvin nie automatisch geladen. Der frühere GitHub-Pages-Auftritt wurde bei diesem Server-Deployment nicht geändert. Ab Verwendung der öffentlichen Redaktion ist die Serverdatenbank maßgeblich; spätere lokale Dumps dürfen deren Änderungen nicht überschreiben.

## Frühere Bestandsaufnahme vor der Installation

- Server: `213.136.68.137`, Hostname `vmi31087`, Ubuntu 26.04.1 LTS.
- SSH: `root`, Schlüssel `C:/Users/helmu/.ssh/marvin_codex_20260918`. Der private SSH-Schlüssel bleibt an seinem vorhandenen Ort.
- Bestätigte Hostschlüssel lokal übernommen nach `backups/marvin-20260919/production/known_hosts`. Immer strikte Hostschlüsselprüfung verwenden.
- Bestehende Anwendung: `/opt/marvin/jart`, Container `marvin-jart-jart-1`, bei Prüfung gesund, HTTP nur an `127.0.0.1:18080`.
- Caddy läuft auf dem Host; aktive Konfiguration `/etc/caddy/Caddyfile`. Port 80 ist belegt. Die geprüfte Konfiguration verwendet `auto_https off`; HTTPS ist noch nicht eingerichtet.
- Bei Prüfung rund 450 GiB Plattenplatz und 4,9 GiB RAM verfügbar. Momentaufnahme, kein Lasttest.
- VanVenture läuft weiterhin lokal: `vanventure-web-1` und `vanventure-db-1` gesund, Vorschau `http://localhost:8080`. Auf Marvin lief zum Prüfzeitpunkt nur der JART-Container.

Lesender Verbindungstest in PowerShell, aus dem Projektordner:

```powershell
ssh -i "$env:USERPROFILE\.ssh\marvin_codex_20260918" -o IdentitiesOnly=yes -o BatchMode=yes -o StrictHostKeyChecking=yes -o UserKnownHostsFile=backups/marvin-20260919/production/known_hosts root@213.136.68.137 hostname
```

## Lokal gesicherte Unterlagen

Elf Dateien liegen unter `backups/marvin-20260919/`. `manifest.json` dokumentiert Quellpfade, Größen und SHA-256-Prüfsummen; alle Kopien wurden gegen die Quellen geprüft. Das gesamte Verzeichnis ist durch die vorhandene Git-Regel `backups/` ausgeschlossen.

- Redaktion: `vanventure-rehearsal/private/editor-20260919.dump` (46.317 Bytes) und `editor-source-secret.env` mit dem zugehörigen Verschlüsselungsschlüssel.
- Dump-SHA-256: `189f03d45e181ca7240e2c13edf5db2047410d0886f7af49214eda633f4f1438`.
- Der gesicherte `EDITOR_SECRET` stimmt mit der lokalen `.env` überein; sein Wert gehört nicht in Dokumentation oder Versionsverwaltung.
- Restaurierungsnachweise: ein Benutzer, drei Entwürfe, drei veröffentlichte Berichte, elf Historieneinträge und drei Einstellungen; laut Sicherungsprüfung alle Tabelleninhalte identisch mit der damaligen Quelle. Anwendungstest und authentifizierte Entschlüsselung erfolgreich.
- Compose-Konfiguration und Prüfberichte der getrennten lokalen und Ubuntu-Testgruppe sowie Produktions-Caddyfile, Hostschlüssel und HTTP-Prüfbericht sind als Referenz übernommen.

Die README der Testgruppe beschreibt noch die anfänglich leere Testdatenbank. Die neueren Dateien `editor-restore-result.json` und `editor-app-restore-result.json` belegen den zusätzlichen Restoretest. Die Test-Compose-Datei bleibt eine Referenz: Ihr `private/test.env` wurde nicht übernommen, und ihre Entwicklungseinstellungen sind nicht für den öffentlichen Betrieb geeignet.

## Ursprüngliche Planung für den VanVenture-Umzug

Den vorhandenen Host-Caddy erweitern und VanVenture mit eigener PostgreSQL-Datenbank und eigenen Volumes betreiben. Den Compose-Proxy mit Profil `public` nicht zusätzlich auf denselben Ports starten. Der VanVenture-Webport soll nur an Loopback gebunden werden; `127.0.0.1:18082` war bei der Serverprüfung frei.

Vor Veröffentlichung Domain und DNS festlegen, HTTPS einrichten und Produktions-Origin sowie sichere Cookies verwenden. Vor dem tatsächlichen Umzug einen frischen Dump der maßgeblichen lokalen Redaktion anfertigen; die übernommene Sicherung ist ein geprüfter früherer Stand. Den bestehenden `EDITOR_SECRET` erhalten. Die aktuelle Website wird weiterhin über GitHub Pages veröffentlicht.

Die ursprüngliche Backupübernahme änderte keine Serverkonfiguration, laufenden Dienste, DNS-Einträge oder öffentlichen Webseiten. Der anschließende Installationsauftrag ist oben dokumentiert. Die Marvin-Backups und die geschützten Fotoarchive bleiben unverändert.
