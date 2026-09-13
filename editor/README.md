# VanVenture: Homepage, Redaktion und PostgreSQL

Die Anwendung läuft vollständig in Docker: Webserver und PostgreSQL als Compose-Projekt, auf Hetzner zusätzlich Caddy für HTTPS. Konten, Entwürfe, veröffentlichte Berichte, Versionshistorie und KI-Einstellungen werden in PostgreSQL gespeichert. Passwort-Hashes sind gesalzen; der KI-Schlüssel wird mit AES-256-GCM verschlüsselt.

## Verwendung über die Homepage

Lokal http://localhost:8080 öffnen und „Anmelden“ auswählen. Bei einer leeren Datenbank erscheint die erste Einrichtung. Mit dem einmaligen Einrichtungscode aus EDITOR_SETUP_TOKEN ein eigenes Administratorkonto anlegen. Der Code wird von der Infrastruktur bei der Erstinstallation generiert; danach ist diese Einrichtung dauerhaft geschlossen. Ein Einrichtungslink kann den Code vorbefüllen: /redaktion?setup=CODE. Die Anwendung entfernt ihn sofort aus der Browseradresse.

Nach dem Login gibt es:

- Direkte Textbearbeitung, Stichworte, Faktenkorrekturen und Highlights.
- „Texte und Wünsche speichern“: gemeinsame Texte und Notizen in PostgreSQL ablegen. Danach im Codex-Chat die Überarbeitung und Aktualisierung der Homepage beauftragen. Es erfolgt keine API-Anfrage.
- Vorschau des gespeicherten Entwurfs im Seitenlayout.
- „Für Website freigeben“ für Administratoren: Der gespeicherte Stand wird sofort auf der Website sichtbar; Startseitenübersicht und Reisebericht verwenden denselben freigegebenen Inhalt.
- „Benutzer“ für Administratoren: Neue Konten anlegen, Rollen vergeben, Anzeigenamen ändern, Passwörter zurücksetzen und Konten deaktivieren. Der letzte aktive Administrator kann nicht entfernt oder herabgestuft werden.
- Eigenes Passwort ändern. Neue Passwörter brauchen mindestens zwölf Zeichen. Änderungen an Konten beenden deren bestehende Sitzungen.

Die Rollen sind „Redaktion“ (Texte und Notizen) und „Administrator“ (zusätzlich Benutzer und Freigaben). Die Überarbeitung erfolgt im Codex-Chat im Rahmen des vorhandenen Abos; der Website-Knopf nutzt keine kostenpflichtige API. Gespeicherte frühere KI-Einstellungen bleiben ungenutzt erhalten.

Beide Konten bearbeiten gemeinsame Entwürfe. Veraltete Versionen werden abgewiesen. Gespeicherte Texte und Freigaben bleiben beim Neustart erhalten; Sitzungen enden dabei.

## Überarbeitung durch Codex

Der Agent liest die Daten innerhalb des laufenden Containers mit:

    docker compose exec -T web node editor/redaction.mjs read

Die Ausgabe enthält ausschließlich Reiseberichte, Notizen und Versionsnummern, keine Zugangsdaten. Nach dem Schreiben beider Sprachfassungen wird pro Reise JSON mit story und der gelesenen revision an diesen Befehl übergeben:

    docker compose exec -T web node editor/redaction.mjs apply REISE-SLUG

JSON kommt über stdin. Der Befehl prüft die Version, erhält Bilder und Reisedaten, speichert den überarbeiteten Bericht und gibt ihn für die Homepage frei. Erledigte Notizen werden geleert; die bisherigen gespeicherten Stände bleiben in der Historie. Bei zwischenzeitlichen Änderungen erneut lesen und abgleichen. Keine automatische Zeitplanung: Der Auftrag wird im Chat erteilt. Nach Umzug auf Hetzner benötigt der Agent einen autorisierten Zugang zum dortigen Container.

## Infrastruktur und Entwicklung

Docker Desktop mit Linux-Containern ist unter Windows erforderlich. Die Infrastruktur wurde vom Agenten vorbereitet. Keine Start- oder Kontenskripte sind für die tägliche Nutzung nötig. Compose verwendet restart: unless-stopped; Docker Desktop startet bei Windows-Anmeldung. Beim erstmaligen Aktivieren von WSL und Virtual Machine Platform kann Windows einen Neustart verlangen. Der Stack muss nach diesem Neustart einmal initial gestartet werden.

Die folgenden Befehle sind für Infrastrukturverwaltung, nicht für die Redaktion:

    node editor/configure.mjs
    docker compose up --build -d

configure ergänzt fehlende private Geheimnisse in .env und gibt sie nicht aus. Die Entwicklungsseite ist nur am eigenen Rechner unter http://localhost:8080 erreichbar. Genau localhost verwenden. Öffentliche Dateien sind gemountet; bei Änderungen am Server docker compose restart web ausführen. Nach Änderungen an Abhängigkeiten docker compose up --build -d --renew-anon-volumes web verwenden.

Logs: docker compose logs -f web. Stoppen: docker compose down. Das Datenbankvolume bleibt erhalten. down -v löscht dessen Daten und ist kein normaler Stoppbefehl. Das initialisierte PostgreSQL-Passwort nicht nur in .env ändern; PostgreSQL übernimmt Umgebungswerte nicht automatisch in bestehende Konten.

## Hetzner

Projekt mit Dockerfile, compose.yaml, deploy/, editor/, package-lock.json, öffentlichen Seiten, travel-stories.json und assets/ auf den Linux-Server übertragen. Docker Engine und Compose müssen dort installiert sein. .env separat geschützt übertragen (chmod 600 .env). EDITOR_SECRET unbedingt erhalten: Damit werden vorhandene KI-Schlüssel entschlüsselt. node_modules, Analysewerkzeuge und Originalfotoarchive sind nicht nötig.

In der Server-.env DOMAIN=EURE-DOMAIN setzen (nur Hostname). DNS auf die Server-IP zeigen lassen. Webverkehr über 80/443 und den benötigten SSH-Zugang erlauben. Bestehende Dienste auf 80/443 zuvor in die Proxy-Konfiguration integrieren. PostgreSQL und der Webport sind nicht öffentlich erreichbar. Caddy übernimmt Zertifikate und Erneuerung; dafür müssen DNS und Erreichbarkeit stimmen.

Öffentlichen Stack ausdrücklich ohne Entwicklungs-Override und erst nach Release-Freigabe starten:

    docker compose -f compose.yaml --profile public config --quiet
    docker compose -f compose.yaml --profile public up --build -d

Danach Homepage und Login unter https://EURE-DOMAIN bzw. /redaktion. Bei leerer Datenbank erfolgt die erste Einrichtung über die Homepage, bei restaurierter Datenbank mit den vorhandenen Konten anmelden. Konten und KI anschließend vollständig über die Oberfläche verwalten.

Updates verwenden denselben up-Befehl. Datenbank- und Zertifikatvolumes bleiben erhalten. Hinter Caddy gilt das Limit von zehn Fehlversuchen in 15 Minuten gemeinsam pro direkter Proxy-IP; unsichere Forwarded-Header werden nicht vertraut.

## Backup und Migration

Volumes werden beim Kopieren des Projekts nicht automatisch mitübertragen. node deploy/backup.mjs erstellt einen binären Dump in backups/, ohne PowerShell-Umkodierung. Dumps enthalten private Daten und Passwort-Hashes: geschützt übertragen und außerhalb des Servers sichern. Auch .env mit EDITOR_SECRET sichern.

Wiederherstellung vor dem ersten Webstart:

    docker compose -f compose.yaml up -d db
    node deploy/restore.mjs backups/vanventure-ZEITSTEMPEL.dump --confirm
    docker compose -f compose.yaml --profile public up --build -d

Restore ersetzt Tabellen in einer Transaktion. Vorher sichern; bei laufender Installation zuerst den Webserver stoppen. Wiederherstellung gelegentlich in einer getrennten Installation prüfen. Konten aus dem Dump bleiben erhalten. Die Backupwerkzeuge benötigen Node.js auf dem ausführenden Rechner.

Falls der alte SQLite-Server verwendet wurde: Im Entwicklungsstack einmal docker compose exec web node editor/migrate-sqlite.mjs ausführen, danach web neu starten. SQLite bleibt unverändert; bearbeitete PostgreSQL-Entwürfe bleiben erhalten. Bestehende Helmut-Konten werden beim Neustart zum Administrator, sofern noch kein Administrator existiert.

## Tests

npm ci und npm test. Tests prüfen Passwortschutz, Konteneinrichtung, Rollen, Deaktivierung, Passwortänderungen, authentifizierte Verschlüsselung, Transaktionen und Rollback, Versionskonflikte, Freigaben und HTML-Escaping, HTTP-Login/Logout, CSRF, Homepage, private Dateien, Docker-Konfiguration und den KI-Anfrageaufbau ohne echte KI-Kosten.

Ohne TEST_DATABASE_URL wird eine isolierte PGlite-PostgreSQL-Engine über TCP verwendet. Das ersetzt keinen vollständigen Docker-Test. TEST_DATABASE_URL kann auf eine eigene PostgreSQL-Testdatenbank zeigen; jeder Test legt ein zufälliges Testschema an und entfernt es anschließend. Ein echter KI-Test braucht einen gültigen API-Schlüssel.

Grundlagen: https://docs.docker.com/compose/how-tos/startup-order/ · https://hub.docker.com/_/postgres · https://node-postgres.com/features/transactions · https://caddyserver.com/docs/automatic-https · https://developers.openai.com/api/docs/guides/structured-outputs
