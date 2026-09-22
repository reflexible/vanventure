# Betrieb: sichere Releases und Cockpit-Monitoring

Diese Anleitung gilt für die Produktionskopie unter `/opt/vanventure`. Sie gibt
keine Geheimnisse aus und verändert keine öffentliche Website, bevor ein Release
ausdrücklich beauftragt ist.

## Vor jedem Release

1. Den neuen Stand übertragen, ohne `.env`, Dumps oder Verzeichnisse mit
   Originalfotos zu kopieren.
2. In `/opt/vanventure` `npm run check:release` ausführen. Der Ablauf führt die
   vollständigen Tests aus, prüft die öffentliche Compose-Konfiguration, erzeugt
   einen geschützten Datenbankdump und prüft die bereits laufende Anwendung per
   Healthcheck. Bei einem Fehler darf kein Release erfolgen.
3. Erst danach den ausdrücklich freigegebenen Webcontainer aktualisieren. Danach
   `/healthz`, die Homepage, `/redaktion` und `/cockpit` prüfen. PostgreSQL und
   Caddy bleiben dabei unverändert aktiv; nur der Webcontainer startet kurz neu.

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

Mindestens quartalsweise einen aktuellen Dump in einer getrennten, kurzlebigen
PostgreSQL-Instanz wiederherstellen und dort Tabellen, Cockpit-Videozahl und
Healthcheck prüfen. Die Produktionsdatenbank bleibt dabei unverändert. Nach dem
Test Dump und Testinstanz nach der geltenden Aufbewahrungsvorgabe entfernen.
