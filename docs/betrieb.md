# Betrieb: sichere Releases und Cockpit-Monitoring

Diese Datei ist eine Betriebsreferenz. Verbindliche offene Aufgaben und ihr
Status stehen ausschließlich im [Gesamtplan](ausbauplan.md).

Diese Anleitung gilt für die Produktionskopie unter `/opt/vanventure`. Sie gibt
keine Geheimnisse aus und verändert keine öffentliche Website, bevor ein Release
ausdrücklich beauftragt ist.

## Vor jedem Release

1. Den neuen Stand übertragen, ohne `.env`, Dumps oder Verzeichnisse mit
   Originalfotos zu kopieren.
2. Die vollständigen Anwendungstests vor dem Upload lokal ausführen. Auf dem
   Produktionshost anschließend `sh deploy/release-check.sh` ausführen. Der
   Host hat bewusst keine Node-Installation; der Shell-Ablauf prüft die
   produktive Compose-Konfiguration, erzeugt einen geschützten Datenbankdump
   und prüft die bereits laufende Anwendung per Healthcheck. Bei einem Fehler
   darf kein Release erfolgen.
3. Erst danach den ausdrücklich freigegebenen Webcontainer aktualisieren. Danach
   `/healthz`, die Homepage, `/redaktion` und `/cockpit` prüfen. PostgreSQL und
   Caddy bleiben dabei unverändert aktiv; nur der Webcontainer startet kurz neu.

Für den gemeinsamen Google-Login gelten zusätzlich eigene Werte
`GOOGLE_LOGIN_CLIENT_ID`, `GOOGLE_LOGIN_CLIENT_SECRET` und
`GOOGLE_LOGIN_REDIRECT_URI=https://vanventure.at/api/auth/google/callback` in
der privaten Server-`.env`. Diese Werte gehören zu einem neuen OAuth-Webclient
mit ausschließlich `openid email profile`; der YouTube-OAuth-Client darf nicht
wiederverwendet werden. Vor dem Einschalten werden die vorgesehenen
Google-Adressen in der Benutzerverwaltung zugeordnet und mindestens ein
freigegebenes sowie ein abgelehntes Konto live geprüft.

`npm run check:release` ist absichtlich keine Deployment-Automatik. Der vorher
erstellte Dump bleibt die direkte Rückfallmöglichkeit.

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
Server-Monitor. Die geplante persistente Warnungs-Inbox des Familien-Dashboards
ist der verbindlich gewählte Benachrichtigungskanal. Sie soll Statuskennzeichen
als lesbare Warnungen übernehmen und kritische Fälle als Fast-Track-Karten
sichtbar machen, ohne Tokens, Namen oder YouTube-Daten zu speichern. Bis dieser
Kommunikationskanal umgesetzt ist, verschickt der Befehl selbst keine Nachrichten.

## Wiederherstellungstest

Alle zwei bis vier Wochen einen aktuellen Dump in einer getrennten, kurzlebigen
PostgreSQL-Instanz wiederherstellen und dort Tabellen, Cockpit-Videozahl und
Healthcheck prüfen. Die Produktionsdatenbank bleibt dabei unverändert. Nach dem
Test Dump und Testinstanz nach der geltenden Aufbewahrungsvorgabe entfernen.
