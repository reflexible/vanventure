# VanVenture – Design Guide

Stand: 22. September 2026. **Entwurf V1 zur Freigabe.** Diese Referenz ergänzt
den verbindlichen [Gesamtplan](ausbauplan.md); sie ist keine eigene
Aufgabenliste. Nach der Freigabe wird sie auf alle öffentlichen Seiten
angewandt.

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

- Fahrzeug, Kajak, Bike und Reiseberichte erhalten dieselbe Galerie: Eyebrow,
  Überschrift, kurzer Hinweis und Raster aus klickbaren Bildern mit
  Bildunterschrift.
- Desktop zeigt drei Spalten, Mobil zwei; die Kacheln nutzen 4:3. Die
  Vollansicht zeigt stets das unbeschnittene Bild über den gemeinsamen,
  tastaturbedienbaren Foto-Viewer.
- Die Kajak-Galerie ist der lokal umgesetzte Musterfall: 11 Bilder, Auswahl
  und Herkunft sind in `kajak-galerie-bildquellen.json` dokumentiert;
  sichtbare Kennzeichen sind in der Webableitung anonymisiert. Bilder mit
  Kindern werden erst nach ausdrücklicher Freigabe veröffentlicht. Der
  Live-Rollout wird mit dieser Prüfung abgeschlossen. Weitere Galerien folgen
  diesem Aufbau unverändert.

## Privater Bereich

- Nach der Anmeldung führt `/privat` zur geschützten Übersicht.
- Die Navigation steht auf **allen geschützten Seiten** als feste, linke
  Seitenleiste über die volle Seitenhöhe. Sie enthält Übersicht, Konto &
  Einstellungen, Redaktion und Cockpit und lässt sich über einen Burger-Button
  schmal und wieder breit schalten; mobil steht sie vor dem Inhalt.
- Konto & Einstellungen zeigt Benutzername und Anmeldeart. Bei Google steht
  ausschließlich die von Google übernommene E-Mail lesbar da – ohne
  Passwortwechsel oder zweites E-Mail-Feld. Nur Passwort-Konten erhalten eine
  getrennte Kontakt-E-Mail und den Passwortwechsel. Beides darf die
  Google-Freigabe nie verändern.

## Verbindliche Freigabe-Reihenfolge

1. Design Guide V1 freigeben.
2. Kajak-Galerie als Referenz umsetzen. **Lokal erledigt; der Live-Status wird
   mit diesem Rollout verifiziert.**
3. Fahrzeug, Bike und Reise-Unterseiten auf Hero-, Galerie- und Link-Standard
   bringen.
4. Startseite und Footer nach diesem System angleichen und Desktop sowie Mobil
   live abnehmen.

## Umsetzungshinweis

Der Kajak-Hero wird nach Auswahl des konkreten Bildes als erster vollständiger
Referenzfall dieses Systems umgesetzt: gespiegelt mit Boot rechts sowie mit
Verlauf, Eyebrow, Titel und Einleitung links.
