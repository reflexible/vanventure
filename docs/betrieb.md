# Betrieb: sichere Releases und Cockpit-Monitoring

Diese Datei ist eine Betriebsreferenz. Verbindliche offene Aufgaben und ihr
Status stehen ausschließlich im [Gesamtplan](ausbauplan.md).

Diese Anleitung gilt für die Produktionskopie unter `/opt/vanventure`. Sie gibt
keine Geheimnisse aus und verändert keine öffentliche Website, bevor ein Release
ausdrücklich beauftragt ist.

Für Fotodateien gilt die vom Nutzer am 23. September 2026 gewählte
Projektisolation: das gemeinsam genutzte Originalarchiv nur lesend verwenden,
seine Windows-ACL nicht ändern. Projektkopien bleiben unverändert; die
Staging-Skripte verweigern eine abweichende vorhandene Kopie und prüfen
Quell-/Kopie-Prüfsummen. Webableitungen entstehen nur im Projekt.

## Vor jedem Release

1. Den lokalen Branch mit der maßgeblichen Quelle abgleichen; einen neueren
   Produktionsstand zunächst lesend sichern und Unterschiede klären. Änderung
   und vollständige Anwendungstests lokal durchführen. Bei Website-Bildern
   zusätzlich `node deploy/public-image-audit.mjs --strict` bestehen lassen.
2. Den geprüften exakten Stand committen und pushen. Erst dann diesen Commit
   in einer kurzen Remote-Sitzung übertragen, ohne `.env`, Dumps oder
   Originalfotos zu kopieren. Keine direkte Produktionsreparatur als Ersatz
   für diesen Weg.
3. Auf dem Produktionshost `sh deploy/release-check.sh` ausführen. Der Host
   hat bewusst keine Node-Installation; der Ablauf prüft Compose und den
   laufenden Healthcheck. Bei Migrationen oder anderen nicht leicht reversiblen
   Datenänderungen erzeugt der Standardaufruf vorher einen geschützten Dump.
   Für einen rein zustandslosen Präsentations-/CSS-/JavaScript-Release darf
   `sh deploy/release-check.sh --stateless` ohne Datenbankdump verwendet
   werden. Bei einem fehlgeschlagenen Pflichtcheck darf kein Release erfolgen.
4. Erst danach den betroffenen Webdienst aktualisieren. Anschließend `/healthz`,
   die betroffenen öffentlichen oder privaten Routen und das sichtbare Ergebnis
   live prüfen. PostgreSQL, Caddy und öffentliche Dateien bleiben aktiv; nur
   der Webdienst startet bei erforderlichem Image-Rebuild neu. Remote-Sitzung
   unmittelbar nach der Prüfung schließen.

Für den gemeinsamen Google-Login gelten zusätzlich eigene Werte
`GOOGLE_LOGIN_CLIENT_ID`, `GOOGLE_LOGIN_CLIENT_SECRET` und
`GOOGLE_LOGIN_REDIRECT_URI=https://vanventure.at/api/auth/google/callback` in
der privaten Server-`.env`. Diese Werte gehören zu einem neuen OAuth-Webclient
mit ausschließlich `openid email profile`; der YouTube-OAuth-Client darf nicht
wiederverwendet werden. Vor dem Einschalten werden die vorgesehenen
Google-Adressen in der Benutzerverwaltung zugeordnet und mindestens ein
freigegebenes sowie ein abgelehntes Konto live geprüft.

`npm run check:release` ist absichtlich keine Deployment-Automatik. Ein
erstellter Dump bleibt die direkte Rückfallmöglichkeit für datenverändernde
Releases.

## Cockpit-Monitoring

`npm run monitor:cockpit` liest ausschließlich die benötigten Statusfelder aus
der privaten Datenbank und gibt nur einen knappen, geheimnisfreien Status aus.
Bei Problemen endet es mit einem Fehlercode und einem oder mehreren dieser
Kennzeichen:

- `SYNC_FAILED`: letzter Abgleich fehlgeschlagen.
- `OAUTH_REAUTH_REQUIRED`: der Refresh-Token wurde von Google abgelehnt; im
  Cockpit erneut verbinden.
- `SYNC_STALE`: bei aktiviertem Zeitplan fehlt ein erfolgreicher Lauf länger
  als Intervall plus zwei Stunden.
- `SYNC_MISSING` oder `CONNECTION_MISSING`: es fehlen ein Lauf bzw. eine aktive
  Kanalverbindung.

Für die regelmäßige Ausführung eignet sich ein System-Timer oder der bestehende
Server-Monitor. Die geplante persistente Warnungs-Inbox gehört zum
Familien-Scrum-Board. Sie soll Statuskennzeichen erst nach einer gemeinsam
festgelegten Prioritätsregel als lesbare Backlog- oder Fast-Track-Karten
übernehmen, ohne Tokens, Namen oder YouTube-Daten zu speichern. Bis dieser
Kommunikationskanal umgesetzt ist, verschickt der Befehl selbst keine
Nachrichten. Der verbindliche Umsetzungsstatus steht im
[Gesamtplan](ausbauplan.md).

## Wiederherstellungstest

Alle zwei bis vier Wochen einen aktuellen Dump in einer getrennten, kurzlebigen
PostgreSQL-Instanz wiederherstellen und dort Tabellen, Cockpit-Videozahl und
Healthcheck prüfen. Die Produktionsdatenbank bleibt dabei unverändert. Nach dem
Test Dump und Testinstanz nach der geltenden Aufbewahrungsvorgabe entfernen.
