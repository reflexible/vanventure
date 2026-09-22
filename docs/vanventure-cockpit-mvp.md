# VanVenture Cockpit – MVP und sicherer Rollout

Stand: 22. September 2026
Status: Phase 1 und Phase 2 abgeschlossen und produktiv geprüft. Phase 3 kann
nach Benutzerfreigabe beginnen.

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

## Phase 2 – Abschluss am 22. September 2026

- `helmut.brandner@gmail.com` hat die Google-Freigabe für den Kanal erfolgreich
  erteilt. Der verschlüsselt gespeicherte Refresh-Token bleibt ausschließlich in
  der privaten Produktionsdatenbank.
- Der automatische Erstlauf war erfolgreich: 25 Videos, 33 Kanal-Tageswerte,
  825 Video-Tageswerte und 117 fällige Vergleichs-Snapshots wurden gespeichert.
  Es gibt keine ausstehenden, altersbedingt fälligen Snapshots.
- Der Dienst aktualisiert Daten täglich; es gibt keinen manuellen Export oder
  Import.
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

1. Einen gemeinsamen Google-Login für Redaktion und Cockpit: eine Anmeldung auf
   `vanventure.at` genügt für beide privaten Bereiche.
2. Zugang nur für die vorhandenen Rollen `admin` und `editor`.
3. Eine getrennte, ausschließlich von Administratoren verwaltete YouTube-OAuth-
   Verbindung.
4. Einen sicheren täglichen Datenabgleich für einen Kanal.
5. Ein Dashboard und eine Videoansicht mit Kanal- und Videokennzahlen.
6. Vergleichswerte nach Tag 1, 7 und 28; Tag 90 und 365 werden von derselben
   Datenbasis automatisch ergänzt, sobald die Videos alt genug sind.
7. Einen Jahresplan mit zwölf Longform-Video-Slots.
8. Einen redaktionell gepflegten Master Context für Van/Hymer, Reisen, Outdoor,
   MTB, Kajak, Hund und Mission Paris.

## Gemeinsamer Google-Login für Redaktion und Cockpit

Die privaten Bereiche `https://vanventure.at/redaktion` und
`https://vanventure.at/cockpit` erhalten denselben Einstieg „Mit Google
anmelden“. Der Server stellt nach dem Google-Login eine einzige VanVenture-
Sitzung aus. Das sichere Cookie gilt mit `Path=/` für beide Bereiche und ihre
APIs; der Wechsel zwischen Redaktion und Cockpit benötigt keine zweite
Anmeldung. Ein zentraler Einstieg `/anmelden` führt nach erfolgreichem Login
sicher zur gewünschten Zielseite zurück.

Google bestätigt dabei nur die Identität. Zugriff erhält ausschließlich ein in
der VanVenture-Benutzerverwaltung freigeschaltetes, verifiziertes Google-Konto.
Die Zuordnung basiert auf der stabilen Google-Kennung `sub`; Rollen (`admin`,
`editor`), Sperrungen und die Regel „mindestens ein aktiver Admin“ bleiben in
VanVenture. Bestehende Passwortkonten werden vor dem Umschalten dem jeweiligen
Google-Konto zugeordnet und zunächst als kontrollierter Notfallzugang erhalten.

Für den Login wird ein eigener Google-OAuth-Webclient mit den minimalen OpenID-
Scopes `openid`, `email` und optional `profile` verwendet. Der bestehende
YouTube-Client und sein Callback `/api/cockpit/youtube/callback` bleiben strikt
getrennt: Nur ein Administrator kann dort den Kanal ausdrücklich mit den
Leserechten `youtube.readonly` und `yt-analytics.readonly` verbinden. Eine
Google-Anmeldung für Redaktion oder Cockpit verleiht daher nie YouTube-Zugriff.

Der Login benötigt kein Rechnungskonto, keine kostenpflichtige API und keinen
kostenpflichtigen Google-Cloud-Dienst. Erfordert wird nur ein zusätzlicher
OAuth-Webclient, beispielsweise „VanVenture Anmeldung“, mit dem Callback
`https://vanventure.at/api/auth/google/callback`. Kostenpflichtige Dienste und
Abrechnung bleiben deaktiviert; die bestehenden kostenlosen YouTube-API-
Kontingente bleiben unberührt.

## Betriebsschutz

- Die Cockpit-Routen bleiben vollständig privat und erhalten `noindex`,
  `no-store` und dieselben HTTPS-/Cookie-Regeln wie die Redaktion.
- Der Google-Login nutzt Authorization Code Flow mit PKCE, `state` und `nonce`.
  Akzeptiert werden ausschließlich die HTTPS-Produktionsdomain und exakt
  registrierte Callback-Adressen.
- Die gemeinsame VanVenture-Sitzung bleibt HTTP-only, `Secure`,
  `SameSite=Strict` und unter `Path=/` für beide Bereiche gültig. Sie wird bei
  Abmeldung, Kontosperre oder Rollenänderung sofort ungültig.
- Sitzungen werden dauerhaft oder kryptografisch signiert verwaltet, damit ein
  regulärer Neustart des Webcontainers nicht unnötig alle Anmeldungen beendet.
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
| 1A – Gemeinsame Anmeldung | Google-Identität ist mit den bestehenden Rollen verknüpft; eine Sitzung gilt für Redaktion und Cockpit | zusätzlicher, kostenfreier Google-OAuth-Webclient; keine YouTube-Abfrage | mit jedem freigegebenen Konto anmelden, zwischen beiden Bereichen wechseln, abmelden und Sperrung prüfen |
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

## Phase 1A – Angaben und Umsetzung für den gemeinsamen Login

Vor dem produktiven Umschalten werden die Google-Adressen der künftigen
Administratoren und Redaktionskonten verbindlich festgelegt. Diese Freigabeliste
wird nicht über eine offene Registrierung, sondern über die vorhandene
Benutzerverwaltung gepflegt.

Die Umsetzung umfasst:

- additive Spalten oder eine eigene Tabelle für Google-Provider, Google-`sub`,
  verifizierte E-Mail und Zeitpunkt der Zuordnung;
- Start- und Callback-Routen unter `/api/auth/google/*` sowie einen sicheren
  Rücksprung nach `/redaktion` oder `/cockpit`;
- eine gemeinsame, serverseitig prüfbare VanVenture-Sitzung für beide Bereiche;
- Login-Schaltflächen und einen verständlichen Hinweis bei nicht freigegebenen
  Google-Konten;
- Audit-Einträge für Anmeldung, Abmeldung, fehlgeschlagene Freigaben sowie
  administrative Konto-Zuordnungen – ohne Tokens, Secrets oder vollständige
  sensible Identitätsdaten in Logs;
- automatisierte Tests für gültige Anmeldung, nicht freigegebenes Konto,
  Sitzungswechsel Redaktion ↔ Cockpit, CSRF-Schutz, Abmeldung und die sofortige
  Ungültigkeit nach Sperrung beziehungsweise Rollenänderung.

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
