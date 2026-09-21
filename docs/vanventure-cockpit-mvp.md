# VanVenture Cockpit – MVP und sicherer Rollout

Stand: 21. September 2026
Status: Phase 1 abgeschlossen und produktiv geprüft. Die Phase-2-OAuth-Strecke
ist produktiv bereit; der erste Abruf wartet auf die Google-Testnutzerfreigabe.

## Aktueller Entscheidungsstand vom 21. September 2026

Der Benutzer hat den automatischen Abruf freigegeben, sofern keine Google-Cloud-
Kosten entstehen. Das Projekt bleibt deshalb ohne Rechnungskonto; der angebotene
kostenlose Google-Cloud-Test wurde nicht aktiviert. Es werden ausschließlich die
kostenlosen Nutzungskontingente der YouTube-Schnittstellen verwendet.

Bereits erledigt und geprüft:

- Marvin: Web und PostgreSQL gesund, `/healthz` liefert HTTP 200.
- Privater 32-Byte-Schlüssel in `/opt/vanventure/.env` erzeugt, Produktions-Callback
  hinterlegt und `COCKPIT_SYNC_ENABLED=false` gesetzt. Die vorherige Konfiguration
  wurde unter `/opt/vanventure/backups/cockpit-phase0-*/environment.before` gesichert.
  Die Datei ist nur für den Besitzer lesbar; kein Dienst wurde neu gestartet.
- Google-Projekt `vanventure-cockpit` angelegt. Die Abrechnungsseite bestätigt:
  kein Rechnungskonto verknüpft. Kein kostenpflichtiger Tarif aktiviert.
- OAuth-Anwendung „VanVenture Cockpit“ eingerichtet; die Nutzerdatenrichtlinie
  und die Nutzungsbedingungen der beiden YouTube-Schnittstellen wurden mit
  ausdrücklicher Zustimmung des Benutzers akzeptiert.
- YouTube Data API v3 und YouTube Analytics API aktiviert. Weitere Google-
  Dienste bleiben deaktiviert.
- OAuth-Webclient „VanVenture Cockpit – Marvin“ mit ausschließlich der Callback-
  Adresse `https://vanventure.at/api/cockpit/youtube/callback` erstellt. Die
  Zugangsdaten wurden ausschließlich in die private Serverkonfiguration
  übernommen, nicht in Git oder diese Dokumentation.
- Kanal in der vorhandenen YouTube-Studio-Sitzung identifiziert und als
  Zielkanal konfiguriert:
  `UC0n6povYI3Eh4Xx8Tdpzm3A`, „VanVenture: Bike, Kayak & Explore“.
  Eine OAuth-Berechtigung ist damit noch nicht nachgewiesen.
- `tools/cockpit-phase0.py` bereitet Konfiguration idempotent vor und prüft sie
  ohne Geheimnisausgabe. Vorbereitung, wiederholte Ausführung, Import einer
  Testkonfiguration und Schutz vor Credential-Ersetzung wurden lokal geprüft.
- Die lokale Compose-Datei enthält die spätere Übergabe der Cockpit-Variablen.
  Diese Änderung wurde noch nicht auf Marvin ausgerollt.

Phase 0 ist abgeschlossen. Die tatsächliche Kanalberechtigung und der erste
manuelle Datenabgleich bleiben der verbindliche Halt von Phase 2; der automatische
Abruf bleibt bis dahin ausgeschaltet.

Phase 1 wurde am 21. September 2026 produktiv geprüft: `/cockpit` liefert 200
mit `noindex, nofollow` und `no-store`; die Cockpit-API verweigert anonymen
Zugriff mit HTTP 401. Alle additiven Cockpit-Tabellen wurden angelegt, der
Webcontainer und `/healthz` sind gesund. Das Audit protokolliert den Aufruf der
Cockpit-Übersicht mit Rolle, jedoch ohne Sitzungs- oder OAuth-Geheimnisse.

## Phase 2 – Stand 21. September 2026

- Der private OAuth-Ablauf, verschlüsselte Refresh-Token-Ablage und der
  automatische Abruf von Kanal, Videos sowie 35 Tagen Kanalwerten laufen auf
  Marvin. Nach erfolgreicher Google-Freigabe startet der erste Abruf selbsttätig
  und der Dienst aktualisiert die Daten täglich; es gibt keinen manuellen
  Export oder Import.
- Google Cloud meldet noch `0` Testnutzer. Solange die Anwendung im Testmodus
  bleibt, muss `helmut.brandner@gmail.com` unter Google Auth Platform →
  Zielgruppe als Testnutzer eingetragen werden. Diese Änderung wurde noch nicht
  durchgeführt und ist der einzige aktuelle Blocker.
- Die Produktionsprüfung nach dem Release ist erfolgreich: Web und Datenbank
  sind gesund, `/healthz` und `/cockpit` liefern HTTP 200. Die Cockpit-Routen
  bleiben mit `noindex, nofollow` und `no-store` privat.

## Ziel des MVP

Das Cockpit ist eine private Erweiterung der bestehenden Redaktion unter
`https://vanventure.at/cockpit`. Es verwendet deren bestehende Konten,
Passwortschutz, Sitzungen, CSRF-Schutz und PostgreSQL-Datenbank. Die öffentliche
Website und ihre statischen Seiten erhalten weder Cockpit-Daten noch Zugang zu
Google oder YouTube.

Das MVP umfasst:

1. Zugang nur für die vorhandenen Rollen `admin` und `editor`.
2. Eine getrennte, ausschließlich von Administratoren verwaltete YouTube-OAuth-
   Verbindung.
3. Einen sicheren täglichen Datenabgleich für einen Kanal.
4. Ein Dashboard und eine Videoansicht mit Kanal- und Videokennzahlen.
5. Vergleichswerte nach Tag 1, 7 und 28; Tag 90 und 365 werden von derselben
   Datenbasis automatisch ergänzt, sobald die Videos alt genug sind.
6. Einen Jahresplan mit zwölf Longform-Video-Slots.
7. Einen redaktionell gepflegten Master Context für Van/Hymer, Reisen, Outdoor,
   MTB, Kajak, Hund und Mission Paris.

## Betriebsschutz

- Die Cockpit-Routen bleiben vollständig privat und erhalten `noindex`,
  `no-store` und dieselben HTTPS-/Cookie-Regeln wie die Redaktion.
- Die Datenbankmigrationen sind additiv: Sie ändern keine Tabellen oder Daten der
  Redaktion und berühren keine veröffentlichten Reiseberichte.
- Ein Release baut zuerst ein neues Web-Image. Der spätere, kurze Neustart des
  Webcontainers ist akzeptiert; PostgreSQL, öffentliche Dateien und Caddy laufen
  weiter.
- Kein YouTube-Sync beginnt ohne eine explizite, gültige Kanalverbindung.
- Der automatische Job läuft im selben Container erst nach erfolgreicher
  Sichtprüfung der ersten manuellen Synchronisierung.
- Vor jedem produktiven Rollout wird ein Datenbankdump erstellt und die
  Gesundheitsprüfung `/healthz` kontrolliert.

## Phasen mit verbindlichem Halt

| Phase | Ergebnis | Betriebsauswirkung | Halt / Prüfung |
| --- | --- | --- | --- |
| 0 – Vorbereitung | Konfiguration, Datenzugang und Rolloutplan sind klar | keine | Google-Zugangsdaten und Kanal bestätigen |
| 1 – Sichere Basis | private Cockpit-Route, Datenmodell, Rollen- und Audit-Grundlage | noch keine Google-Abfragen | lokal und auf Staging anmelden, Rechte prüfen |
| 2 – YouTube-Daten | OAuth, manueller Sync, Tageswerte und Snapshots | einmaliger OAuth-Dialog; keine öffentliche Änderung | Zahlen mit YouTube Studio vergleichen |
| 3 – MVP-Oberfläche | Dashboard, Videos, Planner, Master Context | kurzer Webcontainer-Neustart beim Release | gemeinsam im Live-Cockpit abnehmen |
| 4 – Automatisierung | täglicher Sync und regelbasierte Insights | ein zusätzlicher interner Tageslauf | erste Woche auf Fehlermeldungen und Datenqualität prüfen |

Nach jeder Phase bleibt das System in einem nutzbaren Zustand. Die nächste Phase
beginnt erst nach Sichtprüfung des Ergebnisses; ein Rückbau ist nicht erforderlich,
weil jede Datenbankerweiterung separat und rückwärtskompatibel angelegt wird.

## Phase 0 – noch benötigte Angaben

Für die Google-Verbindung sind diese Werte in der privaten Produktionsumgebung
erforderlich. Sie gehören niemals in Git, den Chat oder in die öffentliche Website:

- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRET`
- ein 32-Byte-Schlüssel für die Verschlüsselung gespeicherter Refresh-Tokens
- die im Google-Cloud-Projekt hinterlegte Callback-Adresse
  `https://vanventure.at/api/cockpit/youtube/callback`
- das Google-Konto, das den VanVenture-YouTube-Kanal verwalten darf

In Google Cloud werden ausschließlich die YouTube Data API v3 und YouTube
Analytics API aktiviert. Die OAuth-Einwilligung verwendet nur die Leserechte
`youtube.readonly` und `yt-analytics.readonly`. Der Login ins Cockpit bleibt davon
getrennt.

## Technische Umsetzung ab Phase 1

- Neue PostgreSQL-Tabellen mit Präfix `yt_` für Verbindung, Sync-Läufe, Videos,
  Tagesmetriken, Snapshots und Sperren. Planner, Master Context und Audit-Log
  erhalten eigene additive Tabellen.
- Private JSON-API unter `/api/cockpit/*`; die Oberfläche verwendet ausschließlich
  diese API.
- Verschlüsselte Tokenablage mit AES-256-GCM, getrennt vom Browser und ohne
  Geheimnisse in Logs.
- Idempotente Upserts für Tageswerte, mit mindestens 35 Tagen Nachzug für
  nachträgliche Analytics-Korrekturen.
- Ein Datenbank-Lock pro Kanal verhindert parallele Synchronisierungen.

## Definition von "online"

Phase 3 ist der erste sinnvolle Live-Stand: Das Cockpit ist auf
`vanventure.at/cockpit` privat erreichbar und kann nach erfolgreichem OAuth die
aktuellen Daten sowie den Jahresplan anzeigen. Phase 4 macht die Datenpflege
automatisch. Bis die Google-Konfiguration vorliegt, kann Phase 1 vollständig
online gehen, ohne externe Daten abzurufen.
