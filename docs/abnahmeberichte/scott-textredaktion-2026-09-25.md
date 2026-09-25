# Abnahmebericht – Scott-Textredaktion

Der aktuelle Projektstatus steht im [Ausbauplan](../ausbauplan.md).

Stand: 25. September 2026. Dieser Bericht behandelt nur die Scott-Texte.

## Auftrag und Quellen

Der Nutzer beanstandete wiederholte Aussagen zur ersten 29er-Probefahrt und
zum jährlichen Full Service. Er ergänzte eigene Erlebnisse in Leogang 2020,
auf dem Petzen Flow Trail, in Massa Marittima 2021 und auf seiner
Ochsenburger-Hütte-Runde. Maßgeblich sind der konsolidierte Gesamtauftrag,
die responsive Template-Spezifikation und der freigegebene Design Guide.
Eine neue Designentscheidung und Bildarbeit waren für diese Textänderung
nicht erforderlich.

## Nachweismatrix

| Kennung | Vorgabe und Umfang | Umsetzung | Reproduzierbare Prüfung | Ergebnis |
| --- | --- | --- | --- | --- |
| TXT-SCOTT-01 | Keine sinngleiche doppelte Probefahrt | Nutzenkarte erzählt Petzen; „Warum gekauft“ behält die erste Testfahrt | Scott-Inhaltsquelle und gerenderte Seite vergleichen | Lokal umgesetzt |
| TXT-SCOTT-02 | Full Service nur im Verschleißabschnitt | Langzeitkarte erzählt Nutzung und anhaltende Freude; die doppelte Bildunterschrift wurde ersetzt | Textsuche nach „Full Service“ in Scott-Inhaltsquelle und Seite | Lokal umgesetzt |
| TXT-SCOTT-03 | Nutzererlebnisse richtig zuordnen | Petzen und Ochsenburger Hütte in den Nutzenkarten; Leogang 2020 und Massa Marittima 2021 im Reiseabschnitt | DE- und EN-Text sowie Jahreszahlen in Quelle und HTML lesen | Lokal umgesetzt |
| TXT-SCOTT-04 | Eine zentrale Pflegequelle, funktionierende Seite | `content/detail-pages.json` → `tools/build-detail-pages.py` → `scott-mountainbike.html` | `python tools/build-detail-pages.py --page scott-mountainbike.html`, `python -m unittest tools.test_site_build`, `node --test editor/*.test.mjs deploy/*.test.mjs` | Lokal geprüft: Generator 1/1, Strukturtests 9/9, Node-Tests 31/31 |
| TXT-SCOTT-05 | Bilder und Template bewahren | Keine Bild-, CSS-, JavaScript- oder Galeriedatei geändert | `git diff --name-only`; `node deploy/public-image-audit.mjs --strict` | Lokal geprüft: 80/80 referenzierte Bildvarianten vorhanden, kein Hashfehler |
| TXT-SCOTT-06 | Live nur vom geprüften Push-Commit | `1fd1636a5f327b8beafcab8f1cfc4a374b3e0fe1` nach `origin/main` gepusht, Archivhash auf Host geprüft, daraus Web-Image gebaut | Produktions-Vorcheck, Image-Inhalt, `/healthz`, Scott-Route und Live-Browseransicht | Bestanden: Release- und Scott-Route HTTP 200, 3/3 Live-Ansichten |
| TXT-SCOTT-07 | Lesbarkeit und Sprachwechsel | Bestehendes Responsive-Template mit längeren Texten | Lokaler Browser bei 390, 768, 1440 CSS-Pixeln, DE und EN, Bilder und Überlauf | 3/3 Ansichten ohne Überlauf oder defekte Bilder; neue Orte in DE sichtbar, EN-Wechsel erfolgreich |

## Inhaltlicher Vergleich

Vorher wiederholten Karte und Erfahrungsabschnitt die Überraschung über das
agile 29er-Fahrgefühl; Karte und Verschleißabschnitt erwähnten beide das
jährliche Full Service. Der Reiseabschnitt und die Schlussnotiz kündigten
konkrete Touren erst für später an. Jetzt hat die erste Testfahrt nur ihren
Platz im Kaufabschnitt, die Wartung nur im Verschleißabschnitt. Die neuen
Tourenerinnerungen stehen anstelle der beiden Ankündigungen. Die bestehende
Sardinien-Verlinkung bleibt erhalten.

## Umfang und Grenzen

Betroffen ist 1/1 Scott-Seite, mit deutscher und englischer Inhaltsfassung.
Der Generator für das bestehende Equipment-Template erzeugt die HTML-Seite;
zentrale Galerie und Foto-Viewer bleiben unverändert. 0 Bilddateien wurden
geändert, 0 Archivdateien berührt. Ein erneuter Originalbildvergleich ist für
diese reine Textkorrektur nicht anwendbar. Der Design Guide wurde nicht
geändert, da weder Regel noch visuelle Variante geändert wurden. Garmin-Tracks
liegen für diesen Lauf nicht vor; die rund 50 km beruhen auf der
Nutzerangabe, nicht auf einer GPS-Messung.

## Prüf- und Veröffentlichungsstand

Lokaler Prüfstand: 25. September 2026; `node deploy/plan-consistency.mjs`
bestand mit 25 registrierten Quellen. `git diff --check` blieb ohne
Inhaltsfehler. Der Browserlauf prüfte die drei Größen 390/768/1440 mit
HTTP 200, 0 Überläufen und 0 defekten Bildern. Screenshots liegen lokal
unter `review/scott-text-2026-09-25/`. Das sind Browser-Emulationen,
keine echten Mobilgeräte. Die Bildunterschrift wurde nach dem ersten
Browserlauf noch textlich bereinigt; Generator und Strukturtests danach
erneut bestanden. Der zweite Browserlauf bestätigte auf allen drei Breiten
genau eine sichtbare „Full Service“-Erwähnung, alle vier Ortsbezüge,
funktionierenden EN-Wechsel, 0 defekte Bilder und 0 Überläufe. Die
Nutzenkarten wurden auf Desktop und Mobil als Screenshots geöffnet und
gelesen; Text und Spaltenfolge sind lesbar. Die mobile Aufnahme eines
gescrollten Abschnitts zeigt die bestehende feste Kopfzeile über dem
oberen Kartenrand; dies ist keine neue Layoutänderung.

Der geprüfte Commit
`1fd1636a5f327b8beafcab8f1cfc4a374b3e0fe1` wurde nach
`origin/main` gepusht. Sein Git-Archiv wurde mit SHA-256
`aab54f8d975a9f1b19d7c51ed9965da928c47047629177f3ac4204d478e52dfb`
auf den Host übertragen und dort vor dem Entpacken geprüft. Der
Produktions-Vorcheck `sh deploy/release-check.sh --stateless` bestand.
Dieser Text-Release ändert keine persistente Datenstruktur; ein
Datenbankdump war nicht erforderlich. Das Web-Image wurde aus genau
diesem Archiv gebaut. Sein Inhalt enthält die Scott-Seite mit Massa
Marittima und die benötigte zentrale Routendatei.

Der erste zusätzliche Image-Inhaltscheck prüfte versehentlich den Pfad
`/app/editor/public-page-routes.mjs` und stoppte vor dem Umschalten.
Mit dem tatsächlichen Pfad `/app/public-page-routes.mjs` bestand er.
Unmittelbar nach dem anschließenden Webdienst-Neustart wurde ein erster
Health-Abruf während des Starts zurückgesetzt; der folgende Check
lieferte HTTP 200 und einen gesunden Web-Container.

Live geprüft wurden [Scott](https://vanventure.at/scott-mountainbike.html)
und [Healthcheck](https://vanventure.at/healthz), jeweils mit HTTP 200.
Der Browserlauf auf 390, 768 und 1440 CSS-Pixeln fand 3/3 Seiten ohne
Überlauf oder defekte Bilder. Alle vier neuen Ortsbezüge sind sichtbar,
die alte Touren-Ankündigung fehlt, „Full Service“ erscheint einmal,
und der Sprachwechsel zeigt die neuen englischen Absätze. Webdienst und
Datenbank waren danach gesund; Caddy blieb aktiv. Nur der Webdienst
wurde für den Image-Wechsel neu gestartet. Alle SSH-Aufrufe endeten nach
ihren Prüfungen; der lokale Vorschau-Server wurde beendet. Eine erneute
vollständige Sichtprüfung der übrigen Website-Seiten und echte Geräteprüfungen
gehörten nicht zu diesem reinen Scott-Textlauf.
