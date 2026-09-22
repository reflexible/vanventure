# VanVenture – Design Guide

Stand: 22. September 2026. **V1 freigegeben.** Diese Referenz ergänzt den
verbindlichen [Gesamtplan](ausbauplan.md); sie ist keine eigene Aufgabenliste
und wird auf alle öffentlichen Seiten angewandt.

## Pflege des Guides

- Bei jeder visuellen oder gestalterischen Änderung wird ausdrücklich geprüft,
  ob sie diesen Guide verändert oder erweitert. Falls ja, weisen wir vor oder
  während der Umsetzung darauf hin und nehmen die Regel nach Abstimmung in den
  Guide auf.

## Gestaltungsidee

VanVenture verbindet ruhige, dokumentarische Reisefotografie mit einer klaren,
editorialen Oberfläche. Bilder erzählen die Reise; Typografie, Flächen und
Farbe geben ihnen einen ruhigen, gut lesbaren Rahmen.

## Fundament

- Hintergrund: warmes Off-White `#f3f0e7` / `#fbfaf7`.
- Primärfarbe: dunkles Kieferngrün `#173a30` / `#183d33`.
- Akzent: zurückhaltendes Moosgrün `#6b7650`; helle Flächen `#e3e7dd` und
  `#d8dfcf`.
- Lauftext: systemnahe Sans Serif, mindestens 16 px und gut lesbarer
  Zeilenabstand.
- Editorial-Überschriften: Georgia beziehungsweise Playfair Display mit
  klarer Größenhierarchie; Akzentwörter dürfen grün und kursiv sein.

## Öffentliche Navigation

- Die Kopfzeile ist auf allen öffentlichen Seiten identisch: Marke,
  Hauptnavigation, **Login**, Sprachwechsel und Menü.
- Login steht direkt neben der Sprachwahl. Das Flyout bietet zuerst
  Benutzername/Passwort und danach „Mit Google anmelden“.
- Der Sprachwechsel ist auf jeder Seite ein runder, 40 × 40 px großer Button
  mit feiner Kontur – nie ein rechteckiger Textbutton.
- Auf kleinen Bildschirmen öffnet das Menü als vollständig deckende, helle
  Ebene oberhalb jeder Hero-Grafik. Es darf keinen sichtbaren Scrollbalken
  zeigen; bei geringer Höhe bleibt es per Touch oder Tastatur scrollbar.
- Fokuszustände sind immer sichtbar; Escape schließt Menü und Flyouts.
- Ausrüstung ist ein eigener Navigationsbereich: Die Übersicht führt zu Kajak
  und Rädern; die Radübersicht kann wiederum zu einzelnen Radprofilen führen.
  Unvollständige Profile sind klar als „in Vorbereitung“ markiert und werden
  nicht als getestete oder abschließend redigierte Empfehlungen dargestellt.

## Unterseiten mit Hero

- Jede inhaltliche Unterseite beginnt unter der gemeinsamen Kopfzeile mit
  einem vollbreiten Bild-Hero.
- Darüber liegt links eine lesbare, farbige Verlaufsebene mit Eyebrow,
  Seitentitel und kurzem Einleitungstext. Der Text liegt nie auf einem
  unruhigen Bildbereich ohne Kontrastschutz.
- Das Hauptmotiv bleibt sichtbar. Wenn das Motiv es verlangt, wird die
  **Web-Kopie** horizontal gespiegelt oder der Bildausschnitt angepasst – nie
  das Archivoriginal.
- Bildunterschrift und Vergrößerung bleiben verfügbar und tastaturbedienbar.

### Mobilansicht

- Bis einschließlich **600 CSS-Pixel im Hochformat** erhalten Hero-Bereiche
  eine eigene Lesefläche: Das Bild steht als oberer Abschnitt, darunter liegen
  Eyebrow, Titel, Einleitung und Metadaten auf einer durchgehenden hellen
  Editorial-Fläche. Kein Text darf über einem unruhigen Bildbereich stehen.
- Im Querformat sowie ab 601 CSS-Pixeln bleibt die Bild-Text-Komposition mit
  Verlauf erhalten.
- Mobile Grid-Kinder müssen sich mit `min-width: 0` in ihren verfügbaren Raum
  verkleinern; die ausgeblendete Mobilnavigation darf keinen horizontalen
  Dokumentüberlauf erzeugen.

**Rolloutstatus, 22. September 2026:** Diese Mobilregel ist auf Startseite,
Fahrzeug, Reiseberichte, Kajak und Ausrüstung umgesetzt. Startseite, Fahrzeug,
Reiseberichte und Kajak wurden in S24-Breite live geprüft; die
Ausrüstungsübersicht erhielt zusätzlich ein klickbares Bild-Hero mit
Kontrastverlauf und der beschriebenen mobilen Lesefläche. Der Design Guide V1
ist freigegeben. Die fünf als „in Vorbereitung“ markierten Radprofile bleiben
bis zur Freigabe von Bildmaterial und Fakten die ausdrücklich dokumentierte
Ausnahme.

## Inhaltsrhythmus

- Großzügige Abstände und höchstens zwei dominante Elemente pro Abschnitt.
- Wechsel aus hellem Hintergrund, gedecktem Grün und dunklem Kieferngrün.
- Karten und Fakten beginnen mit feinen Linien statt schweren Rahmen.
- Handlungslinks sind textlich eindeutig und nur sparsam eingesetzt.

## Startseite und Footer

- Der Einstieg bleibt eine starke Bild-Text-Komposition mit einer einzigen
  klaren Hauptaussage und höchstens einem primären Link.
- Die folgenden Bereiche behalten den Rhythmus Reisen → Fahrzeug → Ausrüstung
  → Über uns. Papier- und Grünflächen wechseln sich ab, ohne den Inhalt in
  voneinander unabhängige Stilwelten zu teilen.
- Links auf der Startseite folgen denselben Regeln wie auf Unterseiten:
  Textlinks erhalten eine klare Unterstreichung/Fokusmarke, gefüllte Flächen
  bleiben primären Aktionen vorbehalten.
- Der Footer enthält nur eindeutige Weiterführungen und keine zweite,
  konkurrierende Navigation.

## Galerie-Standard

- Jede **öffentliche Inhalts-Unterseite** erhält grundsätzlich eine Galerie –
  auch neue Unterseiten. Dazu zählen insbesondere Fahrzeug, Kajak, Bike und
  Reiseberichte. Eine Galerie entfällt nur, wenn sie für die betreffende Seite
  ausdrücklich beauftragt oder entschieden ausgeschlossen wurde; diese
  Ausnahme wird in der Seitenaufgabe beziehungsweise im Gesamtplan benannt.
  Fehlendes Bildmaterial oder ein bislang nicht umgesetzter Abschnitt ist keine
  stillschweigende Ausnahme.
- Die Galerie besteht aus Eyebrow, Überschrift, kurzem Hinweis und einem Raster
  aus klickbaren Bildern mit Bildunterschrift.
- Desktop zeigt drei Spalten, Mobil zwei; die Kacheln nutzen 4:3. Die
  Vollansicht zeigt stets das unbeschnittene Bild über den gemeinsamen,
  tastaturbedienbaren Foto-Viewer.
- Die Kajak-Galerie ist der live umgesetzte Musterfall: 12 Bilder, Auswahl
  und Herkunft sind in `kajak-galerie-bildquellen.json` dokumentiert;
  sichtbare Kennzeichen sind in der Webableitung anonymisiert. Die zwei Bilder
  mit Kindern von hinten wurden für diese Galerie ausdrücklich freigegeben. Die
  Galerie wurde am 22. September 2026 nach dem letzten Webdienst-Rollout live
  verifiziert. Weitere Galerien folgen diesem Aufbau unverändert.

## Privater Bereich

- Nach der Anmeldung führt `/privat` zur geschützten Übersicht.
- Die Navigation steht auf **allen geschützten Seiten** als feste, linke
  Seitenleiste über die volle Seitenhöhe. Sie enthält Übersicht, Konto &
  Einstellungen, Redaktion und Cockpit und lässt sich über einen Burger-Button
  schmal und wieder breit schalten; mobil steht sie vor dem Inhalt.
- Der Arbeitsbereich nutzt die verbleibende Breite sichtbar aus: Er beginnt
  direkt neben der Seitenleiste, bleibt linksbündig und darf nicht durch ein
  altes, unsichtbares Spaltenraster eingeengt werden.
- Die Seitenleiste ist die einzige Stelle für Benutzername, Kontowechsel und
  Abmeldung. Redaktion und Cockpit zeigen diese Aktionen nicht noch einmal;
  die Benutzerverwaltung bleibt als reine Administratorfunktion erhalten.
- Konto & Einstellungen zeigt Benutzername und Anmeldeart. Bei Google steht
  ausschließlich die von Google übernommene E-Mail lesbar da – ohne
  Passwortwechsel oder zweites E-Mail-Feld. Nur Passwort-Konten erhalten eine
  getrennte Kontakt-E-Mail und den Passwortwechsel. Beides darf die
  Google-Freigabe nie verändern.

## Verbindliche Freigabe-Reihenfolge

1. Design Guide V1 freigeben. **Erledigt am 22. September 2026.**
2. Kajak-Galerie als Referenz umsetzen. **Erledigt und am 22. September 2026
   live verifiziert.**
3. Fahrzeug, Bike und alle bestehenden Reise-Unterseiten auf Hero-, Galerie-
   und Link-Standard bringen; jede Ausnahme vom Galerie-Standard ausdrücklich
   dokumentieren. **Für Fahrzeug und Reiseberichte erledigt; die fünf
   ausdrücklich als „in Vorbereitung“ markierten Radprofile bleiben bis zur
   Bild- und Faktenfreigabe die dokumentierte Ausnahme.**
4. Startseite und Footer nach diesem System angleichen und Desktop sowie Mobil
   live abnehmen. **Erledigt am 22. September 2026; der Footer blieb bewusst
   kurz und ohne konkurrierende Navigation.**

## Umsetzungsnachweis

Der Kajak-Hero ist der vollständige Referenzfall dieses Systems: das ausgewählte
Bild ist gespiegelt (Boot rechts) und kombiniert Verlauf, Eyebrow, Titel und
Einleitung. Er wurde am 22. September 2026 live geprüft.
