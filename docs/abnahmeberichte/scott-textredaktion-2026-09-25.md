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
| TXT-SCOTT-06 | Live nur vom geprüften Push-Commit | Commit, Push, Releaseprüfung und Live-Sichtprüfung getrennt dokumentieren | Git-SHA, `/healthz`, Scott-Route und Browseransicht | Ausstehend |
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

Commit, Push, Produktions-Vorcheck, `/healthz`, Scott-Liveroute,
Live-Browseransicht und das Schließen der Remote-Sitzung sind noch
ausstehend. Ein erfolgreicher lokaler Build, ein Push und eine live
geprüfte Veröffentlichung sind getrennte Schritte.
