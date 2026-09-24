# VanVenture – Design Guide

Stand: 22. September 2026. **V1 freigegeben.** Diese Referenz ergänzt den
verbindlichen [Gesamtplan](ausbauplan.md); sie ist keine eigene Aufgabenliste
und wird auf alle öffentlichen Seiten angewandt.

## Pflege des Guides

- Bei jeder visuellen oder gestalterischen Änderung wird ausdrücklich geprüft,
  ob sie diesen Guide verändert oder erweitert. Eine neue Regel, globale
  Komponentenvariante oder Ausnahme wird erst nach ausdrücklicher
  Nutzerfreigabe verbindlich oder live. Bereits freigegebene Regeln werden ohne
  erneute Rückfrage umgesetzt.
- Nach einer eindeutigen Freigabe werden Guide, zentrale Implementierung,
  Templates, Tests und Statusnachweis im selben Änderungsvorgang konsistent
  aktualisiert. Der Guide wird nie nachträglich geändert, um eine ungefragte
  oder fehlerhafte Umsetzung zu legitimieren. Freigabebeleg, Datum und
  Geltungsbereich werden im Nachweis dokumentiert.
- Der verbindliche Ablauf für Bildschutz, technische Originalschutzprüfung,
  Nachweismatrix und Abnahme steht im
  [konsolidierten Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).

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
- Wo konkrete Unterseiten bestehen, führt die öffentliche Navigation direkt
  dorthin und benötigt keine zusätzliche Übersichtsseite. Eine Übersicht ist
  nur dann ein Navigationsziel, wenn der Nutzer sie ausdrücklich verlangt.
  **Freigabe 24. September 2026:** Der Nutzer hat diese allgemeine Regel
  ausdrücklich beauftragt und den unbeauftragten Punkt „Alle Räder“ gestrichen.
  Der Ausrüstungsbereich führt deshalb direkt zu Kajak und den einzelnen
  Radprofilen. **Ergänzende Nutzerentscheidung vom 24. September 2026:**
  Die Ausrüstungs- und Radübersichten sollen auch als aufrufbare Inhalte
  entfallen; alle internen Links dorthin werden entfernt. Ihre bisherigen
  Adressen leiten ausschließlich für alte Aufrufe zur Startseite weiter.
  Unvollständige Profile sind klar als „in Vorbereitung“ markiert und werden
  nicht als getestete oder abschließend redigierte Empfehlungen dargestellt.
- Vollständige Ausrüstungsprofile nutzen eine wiederkehrende Lesestruktur:
  „Warum gekauft → was begeistert mich → was nervt → Defekte/Verschleiß → was
  habe ich verändert → wo war es dabei → würde ich es wieder kaufen?“. Die
  Langzeiterfahrung und belegte Nutzung stehen vor technischen Daten.

### Radserie

- Fertig erzählte Radprofile folgen dem gleichen Foto-Hero- und
  Galerie-Standard wie die übrigen Inhaltsseiten. Eine großzügige
  Bild-Text-Komposition eröffnet die Seite; die Kajakseite gibt dabei den
  konkreten Rhythmus vor: heller Hero mit geschütztem Textfeld, danach
  abwechselnd helle, gedeckt grüne und kieferngrüne Editorial-Flächen,
  klare Linien und ruhige Lesespalten. Die Fotos müssen das jeweilige Rad
  korrekt zeigen; ein farblich anderes Rad darf nicht zum Hero-Hauptmotiv werden.
- Faktenkästen ergänzen die Erfahrung und stehen im fertigen Radprofil nach
  der persönlichen Geschichte. Im Ausrüstungsmenü führen die Rad-Einträge
  direkt zu ihren Profilen. Einträge in Vorbereitung bleiben sichtbar als
  solche markiert.
- Für das freigegebene Scott-Profil übernimmt der Einstieg die Kajak-typischen
  Intro- und Nutzenkarten vor der persönlichen Erfahrung. Die redaktionellen
  Fotos wechseln danach zwischen linker und rechter Textspalte. Nur
  Wiesenpause und Leogang-Trail erhalten auf der Seite einen gezielten
  2:1-Ausschnitt, Baumtour 3:2; die Webdateien bleiben unverändert und der
  gemeinsame Viewer zeigt beim Vergrößern stets das vollständige 4:3-Bild.
  Die anderen zwei Editorial-Fotos bleiben unbeschnitten. Diese
  motivbezogene Entscheidung ist keine pauschale Beschnittregel für Räder.
  Die Seitenverhältnisse folgen zugleich der Textmenge: kurze Bild-Text-Paare
  dürfen ein deutlich flaches Fenster (2:1 beziehungsweise 3:2) erhalten;
  bei längeren Abschnitten bleibt das Foto höher (4:3). Der Beschnitt darf
  das wesentliche Motiv nicht verlieren.
  Die Intro-/Nutzenkarten des Scott-Profils nutzen dieselbe zentral
  definierte Eyebrow- und Kartentitel-Typografie wie die Kajak-Referenz;
  ihre drei Texte erläutern die belegten Erfahrungen, statt nur Stichworte
  zu wiederholen. Der vorhandene Abschnitt „Mein Setup“ bleibt der
  technische Datenbaustein nach der persönlichen Erfahrung.
- In der gemeinsamen Intro-Doppelspalte fertiger Ausrüstungsseiten steht
  der rechte Einleitungstext auf derselben **senkrechten linken Kante** wie
  die Textspalte des folgenden Bild-Text-Abschnitts. Die Bild-/Textspalten
  verwenden dafür dieselbe Rasterteilung; mobil folgt der Text unter der
  Überschrift in einer Spalte. Die Kopfzeile der linken Spalte und der
  Einleitungstext beginnen zudem ohne künstlichen Höhenversatz.
- Solange für ein Rad noch keine zugeordneten Bilder und belegten Erfahrungen
  vorliegen, erhält seine mit `noindex` markierte Arbeitsseite einen
  hellen typografischen Rad-Posterauftakt in der bestehenden Farbwelt. Dieser
  klar gekennzeichnete Vorbereitungszustand ist die vorläufige Ausnahme
  von Bild-Hero und Galerie. Beim fertigen Profil entfallen Poster und
  Ausnahme zugunsten des regulären Standards.

**Radserie, live geprüft am 23. September 2026:** Der neue Aufbau ist
auf Radübersicht, Scott-Profil und den vier vorbereitenden Profilen lokal für
Desktop und Mobil geprüft. Nach dem Rollout wurden alle sechs Radrouten,
der Webdienst und die sichtbare Radübersicht live geprüft.
Der anschließende Kajak-Abgleich brachte dem Scott-Profil einen vollbreiten
Foto-Hero mit hellem Kontrastverlauf und dem schwarzen Rad als Motiv,
wechselnde Editorial-Flächen und den vier Arbeitsprofilen einen hellen Auftakt.
Scott, Cube und die Kajak-Galerie wurden danach live bei schmaler bzw. sehr
breiter Bildschirmbreite geprüft; die Galerieraster fließen nun auf großen
Displays mit symmetrischen Seitenrändern statt bei drei Spalten zu enden.

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
ist freigegeben. Die vier als „in Vorbereitung“ markierten Radprofile bleiben
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

**Freigabe 24. September 2026 – Vergrößerungshinweis:** Alle öffentlichen
vergrößerbaren Fotos zeigen oben rechts nur eine kleine Lupe statt eines
sichtbaren „Vergrößern“-Textbuttons. Das gilt für Hero-, Fließtext- und
Galeriebilder sowie ihre responsive Darstellung. Die Lupe ist dekorativ;
das gesamte bisher klickbare Foto bleibt Auslöser, und dessen zugängliche
Beschriftung, Fokusmarkierung und Tastaturbedienung bleiben erhalten. Der
Nutzer hat diese konkrete Stiländerung im Arbeitschat ausdrücklich beauftragt.
Die zentrale Umsetzung liegt in `photo-viewer.css`/`photo-viewer.js`;
eine Live-Abnahme des neuen Stils steht noch aus.

- Jede **öffentliche Inhalts-Unterseite** erhält grundsätzlich eine Galerie –
  auch neue Unterseiten. Dazu zählen insbesondere Fahrzeug, Kajak, Bike und
  Reiseberichte. Eine Galerie entfällt nur, wenn sie für die betreffende Seite
  ausdrücklich beauftragt oder entschieden ausgeschlossen wurde; diese
  Ausnahme wird in der Seitenaufgabe beziehungsweise im Gesamtplan benannt.
  Fehlendes Bildmaterial oder ein bislang nicht umgesetzter Abschnitt ist keine
  stillschweigende Ausnahme.
- Die Galerie besteht aus Eyebrow, Überschrift, kurzem Hinweis und einem Raster
  aus klickbaren Bildern mit Bildunterschrift.
- Desktop nutzt ein fließendes Raster: So viele Spalten, wie bei einer
  Mindestbreite von etwa 240 px zwischen großzügigen, symmetrischen
  Seitenrändern Platz finden. Bei Galerien mit wenigen Bildern bleiben die
  Kacheln zentriert und höchstens etwa 360 px breit. Mobil bleiben es zwei
  Spalten; die Kacheln nutzen 4:3. Die
  Vollansicht zeigt stets das unbeschnittene Bild über den gemeinsamen,
  tastaturbedienbaren Foto-Viewer.
- Die Kajak-Galerie ist der live umgesetzte Musterfall: 14 veröffentlichte Bilder, Auswahl
  und Herkunft sind in `kajak-galerie-bildquellen.json` dokumentiert;
  sichtbare Kennzeichen sind in der Webableitung anonymisiert. Die drei Bilder
  mit Kind wurden für diese Galerie ausdrücklich freigegeben. Die
  Galerie wurde am 22. September 2026 nach dem letzten Webdienst-Rollout live
  verifiziert. Eine automatisierte Inhaltsprüfung sichert alle öffentlichen
  Seiten mit ihren Kernmodulen sowie Galerie-Abschnitt, Kachelanzahl, CSS und
  Bilddateien gegen versehentliche Entfernung; für Kajak umfasst sie auch das
  gespiegelte Referenzbild, Verlauf und Hero-Einleitung. Weitere Galerien
  folgen diesem Aufbau unverändert.
- Für neue Hero- und Galeriebilder bleiben Quelle und unveränderte Projektkopie
  erhalten. Web-Ableitungen werden auf die tatsächlich benötigte Größe
  reduziert und mit Versionsnamen veröffentlicht; Hero-Bilder laden prioritär,
  Galerien erst bei Bedarf. Ein breiter Hero darf das Hauptmotiv nicht durch
  unkontrolliertes `cover` abschneiden. Versionierte Bilddateien sind
  langfristig cachebar, HTML bleibt frisch.

**Eng begrenzte Fahrzeugbild-Ausnahme, Nutzerentscheidung vom 24. September
2026:** Die vier bereits vorhandenen KI-bereinigten Webbilder
`vehicle-front-camp.png`, `vehicle-header-clean-v3.png`,
`vehicle-side-camp-v2.png` und `vehicle-side-dog.png` dürfen in ihrer
bisherigen Fassung bleiben. Die Vorher-/Nachher-Vorschau des Frontmotivs
zeigte die entfernten Hintergrundobjekte; der Nutzer entschied ausdrücklich:
„KI-bereinigten Fahrzeugbildern die darfst so lassen wie sie sind“.
Das ist keine allgemeine Erlaubnis für neue KI-Bereinigungen oder weitere
Änderungen dieser Motive. Quellen, unveränderte Projektkopien,
Kennzeichenschutz und die übrigen Bildprüfungen bleiben erforderlich.

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
   dokumentieren. **Für Fahrzeug, Reiseberichte und Scott erledigt; die vier
   ausdrücklich als „in Vorbereitung“ markierten Radprofile bleiben bis zur
   Bild- und Faktenfreigabe die dokumentierte Ausnahme.**
4. Startseite und Footer nach diesem System angleichen und Desktop sowie Mobil
   live abnehmen. **Erledigt am 22. September 2026; der Footer blieb bewusst
   kurz und ohne konkurrierende Navigation.**

## Umsetzungsnachweis

Der Kajak-Hero ist der vollständige Referenzfall dieses Systems: das ausgewählte
Bild ist gespiegelt (Boot rechts) und kombiniert Verlauf, Eyebrow, Titel und
Einleitung. Er wurde am 22. September 2026 live geprüft.
