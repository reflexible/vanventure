# VanVenture – verbindlicher Gesamtplan

Stand: 24. September 2026
Dies ist die **einzige aktive Arbeitsliste** für VanVenture. Erledigte Punkte
sind durchgestrichen. Die übrigen Dateien unter `docs/` sind Quellen,
Rolloutnachweise oder technische Referenzen – keine konkurrierenden Pläne.

## Plan-Sicherung

Jede neue oder geänderte Aufgabe wird zuerst hier ergänzt. Die registrierten
Planquellen und ihre Pflichtpunkte stehen in
[`plan-register.json`](plan-register.json); `npm run check:plans` prüft, dass
jede Quelle auf diesen Gesamtplan verweist, keine Referenzdatei eine zweite
aktive Aufgabenliste führt und alle registrierten Pflichtpunkte hier enthalten
sind. Die Prüfung ist Teil von `npm test`. Ein Plan-Update ohne erfolgreichen
Planabgleich ist nicht fertig.

## Ausgangslage: erste Analyse

Quelle: [Channel Audit V1](channel-audit-v1.md), erfolgreicher Abgleich vom 22.
September 2026; Tageswerte bis einschließlich 19. September.

| Bereich | Gesicherter Befund | Konsequenz |
| --- | --- | --- |
| Bestand | 25 Videos: 2 aktuelle Shorts, 4 Legacy-Clips, 19 Longforms | Nur die zwei aktuellen Shorts bilden die Shorts-Vergleichsgruppe. |
| MOVE / Discovery | Flow Trail: 986 öffentliche Gesamt-Views; Such-Traffic auch für Kenda Line | MOVE als eigenständigen Test führen, alte Clips nicht mit heutigen Shorts vergleichen. |
| EXPLORE / Watchtime | Norwegen: 108 Min.; Sardinien: 38 Min. Watchtime in 365 Tagen | Reiseerzählung als eigenständigen Test führen. |
| Shorts | Trolltunga: 149 Views bis Tagesabschluss, 120 über Shorts-Feed, ca. 82 % verfügbare Retention | Zwei eigenständige Shorts/Reels je Erlebnis vorsehen. |
| Datenqualität | Traffic Sources für 19 Videos; Retention nur für Trolltunga und Norwegen; erster Reach-Report erfolgreich eingelesen | CTR/Impressions sind technisch und mit echten Werten geprüft, für belastbare Vergleiche muss die tägliche Datenbasis noch wachsen. |

## Bereits erledigt und live geprüft

- ~~Private Redaktion und privates Cockpit mit Rollen, Sitzungen, CSRF-Schutz,
  `noindex` und `no-store`.~~
- ~~Verschlüsselte Google-/YouTube-Verbindung, manueller und zeitgesteuerter
  Sync, Datenbanksperre, Monitoring, Audit-Log und automatisierte Tests.~~
- ~~Erster Import mit 25 Videos, 33 Kanal-Tageswerten, 825 Video-Tageswerten
  und allen damals fälligen Snapshots.~~
- ~~Dashboard, Video-Liste, Content Planner, Master Context und regelbasierte
  Basis-Insights.~~
- ~~Format- und Content-Audit: 2 aktuelle Shorts, 4 Legacy-Clips, 19 Longforms
  sowie Keep-/Repackage-/Nicht-weiterverfolgen-Entscheidungen.~~
- ~~Sicherer Audit-Export V2; anonym ist der Endpunkt nicht erreichbar.~~
- ~~Drei nächste Tests im Live-Planner als `validated`: VAN (Hymer
  Langzeiterfahrung), EXPLORE (California → Hymer), MOVE (Bike oder Kajak /
  Basecamp).~~
- ~~Low-Effort-Creator-System mit Vorher-/Währenddessen-/Danach-Checkliste,
  festem Wiederverwendungsablauf sowie geschätzten und tatsächlichen Stunden im
  Planner.~~
- ~~Produktions-Release-Check, geschützter Datenbankdump und erfolgreicher
  Restoretest der Cockpit-Tabellen.~~
- ~~Öffentliche HTTPS-Website, SEO-Basis und gemeinsamer, tastaturbedienbarer
  Foto-Viewer.~~

## Nächste verbindliche Schritte

### 1. Gemeinsamen Google-Login vor dem Umschalten sauber umsetzen

Der bestehende Passwort-Login bleibt aktiv, bis diese Phase vollständig
abgenommen ist. Die Freigabeliste wird ausschließlich in der vorhandenen
Benutzerverwaltung gepflegt; es gibt keine offene Registrierung und keine
automatische Google-Kontoübernahme.

- ~~Google-Adressen der künftigen Administratoren und Redaktionskonten
  verbindlich festlegen und je vorhandenem Benutzer zuordnen.~~ Zwei aktive
  Administrationskonten sind in der Produktions-Freigabeliste zugeordnet.
- ~~Additive Datenhaltung für Google-Provider, Google-`sub`, verifizierte
  E-Mail und Zeitpunkt der Zuordnung ergänzen.~~
- ~~Start- und Callback-Routen unter `/api/auth/google/*` mit sicherem,
  allowlist-geprüftem Rücksprung nach `/redaktion` oder `/cockpit` umsetzen.~~
- ~~Eine gemeinsame, serverseitig prüfbare VanVenture-Sitzung für Redaktion
  und Cockpit einführen; Abmeldung, Kontosperre und Rollenänderung müssen sie
  sofort ungültig machen und ein regulärer Web-Neustart darf sie nicht
  unbeabsichtigt behalten oder unkontrolliert verlieren.~~
- ~~Verständliche Login-Schaltflächen und einen neutralen Hinweis für nicht
  freigegebene Google-Konten bereitstellen.~~
- ~~Audit-Einträge für Anmeldung, Abmeldung, fehlgeschlagene Freigaben und
  administrative Konto-Zuordnungen speichern – ohne Tokens, Secrets oder
  vollständige sensible Identitätsdaten in Logs.~~
- ~~Automatisiert prüfen: gültige Anmeldung per Google und nicht freigegebenes
  Konto nach Anlage des
  separaten OAuth-Webclients live abnehmen. Wechsel Redaktion ↔ Cockpit,
  CSRF-Schutz, Abmeldung sowie sofortige Ungültigkeit nach Sperrung oder
  Rollenänderung sind automatisiert für die gemeinsame serverseitige Sitzung
  geprüft.~~ **Lokal geprüft am 22. September 2026:** vollständige Testreihe
  (18 Tests) grün. **Live abgenommen:** `/healthz`, `/redaktion` und
  `/cockpit` antworten mit HTTP 200; der OAuth-Start für `/cockpit` leitet mit
  HTTP 303 zu `accounts.google.com`; Anmeldung mit einem freigegebenen und
  einem nicht freigegebenen Google-Konto ist abgeschlossen.

**Rolloutstatus, 22. September 2026:** Die technische Grundlage wurde auf
Marvin bereitgestellt und nach Webdienst-Neustart mit `/healthz`, `/redaktion`
und `/cockpit` live geprüft, einschließlich sicherem Passwort-Fallback.
Der separate OAuth-Webclient ist privat konfiguriert und die beiden Admin-Adressen
sind zugeordnet. Der bestehende YouTube-Client bleibt strikt getrennt und wird
nicht wiederverwendet.
Der öffentliche Einstieg führt nach Anmeldung in die geschützte Übersicht
`/privat` mit fester linker Navigation zu Übersicht, Redaktion, Cockpit und
Profil-Einstellungen – dieselbe Leiste bleibt auch in Redaktion und Cockpit
erhalten. Google-Konten zeigen ihre Google-Adresse nur lesbar und verwalten
kein VanVenture-Passwort; nur Passwort-Konten erhalten getrennte Kontakt-E-Mail
und Passwortwechsel.
Die private Übersicht nutzt den Arbeitsbereich neben der Leiste breit und
linksbündig; kein zusätzliches, leeres Navigationsraster darf Platz belegen.
Benutzername, Passwortwechsel und Abmeldung erscheinen ausschließlich in der
gemeinsamen privaten Navigation beziehungsweise in `/privat`; Redaktion und
Cockpit duplizieren diese Kontofunktionen nicht. **Am 22. September 2026 live
ausgerollt und geprüft:** „Abmelden“ steht direkt unter der Kontoanzeige. Für
Administratoren führt der eigene Navigationspunkt auf die geschützte Seite
`/benutzerverwaltung`; Redaktionskonten sehen ihn nicht. Der frühere
Redaktions-Dialog wurde entfernt. Nach dem Webdienst-Neustart antworteten
`/healthz`, `/redaktion`, `/cockpit` und `/benutzerverwaltung` mit HTTP 200;
PostgreSQL und Caddy blieben unverändert.
Auf jeder öffentlichen Seite stehen die Sprachumschaltung und der Login direkt
nebeneinander. Die mobile Navigation liegt als eigene, kontrastreiche Ebene über
dem Hero-Bild und bleibt bei kleinen Viewports ohne sichtbaren Scrollbalken
bedienbar.

### 1A. Einheitlichen Design Guide und Hero-Standard etablieren

- ~~Den Kajak-Hero als Referenzseite mit dem vom Team ausgewählten,
  gespiegelten Webbild (Boot rechts), Farbverlauf und Einleitung umsetzen.~~
- ~~Den dokumentierten Hero-Standard anschließend auf die verbleibenden
  öffentlichen Unterseiten anwenden und je Ansicht prüfen.~~
- ~~Den Galerie-Standard auf jede bestehende öffentliche Inhalts-Unterseite
  anwenden.~~ Damals waren fünf Radprofile klar als „in Vorbereitung“ markiert;
  Scott ist inzwischen als Langzeitbericht veröffentlicht. Die übrigen vier
  bleiben bis zur Auswahl freigegebener Originalbilder und Fakten die einzige
  dokumentierte, vorläufige Ausnahme.

Der Hero-, Galerie- und Link-Standard ist für die bestehenden öffentlichen
Seiten umgesetzt und live geprüft. Offen bleiben ausschließlich die vier
explizit als unvollständig markierten Radprofile; ihre Galerie-Ausnahme gilt
nur bis zur Auswahl freigegebener Originalbilder und Fakten.

Der [Design Guide V1](design-guide.md) ist am 22. September 2026 freigegeben
worden und gilt für alle öffentlichen Seiten. Bei jeder gestalterischen
Änderung wird geprüft und ausdrücklich darauf hingewiesen, ob der Guide ergänzt
werden soll. Der Kajak-Hero und die Kajak-Galerie sind live. Auswahl, Herkunft und
Kennzeichenredaktion der damals 14 veröffentlichten Galeriebilder wurden im
Repository-Stand dokumentiert. Die zwei ZIP-Bilder mit Kindern von hinten
wurden im Kajak-Chat ausdrücklich bestätigt; die pauschale Freigabe aller 14
Bilder ist durch diesen Chat nicht belegt. Insbesondere widerspricht das
enthaltene Bild „Gemeinsam am Fluss“ einer späteren ausdrücklichen
Entfernungsanweisung. Die damalige Galerie wurde am 22. September 2026 nach
dem letzten Webdienst-Rollout live verifiziert; das ist keine erneute Abnahme
des jetzigen Arbeitsstands.
Nach einer beim Hero-Umbau entdeckten Regression ist die Galerie wiederhergestellt;
eine automatisierte Inhaltsprüfung sichert seitdem alle sieben öffentlichen
Seiten mit ihren freigegebenen Kernmodulen, Galerien, Kachelzahlen, Bilddateien,
Canonical-Links und internen Seitenlinks gegen stillschweigende Entfernung ab.
Für den Kajak-Referenzfall prüft sie zusätzlich den gespiegelten Fjord-Hero,
das zugehörige Verlauf-Stylesheet und die freigegebene Hero-Einleitung.
Die am 22. September ergänzte Galerie-Pflicht ist im freigegebenen Design Guide
und diesem Gesamtplan festgehalten. Sie ist auf Kajak, Fahrzeug,
Ausrüstungsübersicht, Radübersicht und Reisegalerien live umgesetzt; die vier
ausdrücklich benannten Radprofile bleiben bis zur Bild- und Faktenfreigabe die
einzige vorläufige Ausnahme.

**Fahrzeuggalerie, live geprüft am 22. September 2026:** Drei bereits
veröffentlichte, visuell geprüfte Webbilder (eins mit anonymisiertem
Kennzeichen) bilden nun die klickbare Galerie auf `vehicle.html`. Der
gemeinsame Foto-Viewer stellt die Bilder vergrößert und tastaturbedienbar dar.

**Ausrüstungsstruktur, live geprüft am 22. September 2026:** Kajak und Räder
sind Unterseiten der neuen Ausrüstungsübersicht. Die Übersicht folgt dem
verbindlichen Hero- und Galerie-Standard mit klickbaren Bildern,
Kontrastverlauf und eigener mobiler Lesefläche. Die Profile für Sabines Cube,
Helmuts Scott-Mountainbike, Helmuts Trek-Gravelbike, Adrians Woom 2 sowie die
beiden Diamant-Stadträder sind als „in Vorbereitung“ angelegt. Bis je Profil
freigegebene Originalbilder und Fakten vorliegen, ist das Weglassen einer
Galerie für genau diese damals fünf Profile ausdrücklich und vorläufig erlaubt. Die
Übersicht, die Radseite und alle fünf Profile wurden nach Webdienst-Neustart
auf `https://vanventure.at` mit HTTP 200 geprüft.

**Neuerer Produktionsstand vom 23. September 2026:** Der Scott Genius 910
„Black Beauty“ ist als vollständiger Langzeitbericht seit dem Kauf 2018
veröffentlicht. Die Radübersicht führt dorthin; das Scott-Profil besitzt einen
vollbreiten Foto-Hero und eine eigene Galerie. Die vier übrigen Radprofile
bleiben `noindex` und ausdrücklich als „in Vorbereitung“ gekennzeichnet.
Die Radserie, Navigation, mobile Ansichten und betroffene Live-Routen wurden
laut dem jüngeren Produktions-Ausbauplan geprüft. Dessen Dateien und
Bildableitungen werden in den lokalen Arbeitsbranch übernommen, bevor diese
Aufgabe einen neuen Release ausführt. Die in diesem Auftrag verlangte
vollständige neue Abnahme steht davon unabhängig noch aus.

**Ausrüstungs-Hero, live geprüft am 23. September 2026:** Das bisher mit der
Kajakseite identische Fjord-Hero wurde durch das freigegebene Motiv
`IMG_1841.jpg` (Radfahrerin in mediterraner Landschaft) ersetzt. Die
unveränderte Projektkopie bleibt erhalten; die separat erzeugte, farblich
zurückhaltende Derivative ohne Stromleitungen und Masten wurde nach visueller
Prüfung veröffentlicht. `/healthz`, `https://vanventure.at/ausruestung.html`
und die Hero-Datei antworteten erfolgreich; nur der Webdienst wurde neu
gestartet, PostgreSQL und Caddy blieben unverändert.

**Mobil-Hero-Rollout, 22. September 2026:** Die responsive Lesefläche für
Startseite, Fahrzeug, Reiseberichte und Kajak ist live. Sie schaltet bis
600 CSS-Pixel im Hochformat um, hält die Hero-Texte außerhalb des Bildbereichs
und beseitigt den horizontalen Überlauf der Startseite. Nach dem gezielten
Webdienst-Neustart wurden `/healthz`, Startseite und Kajakseite intern sowie
die öffentliche Startseite in S24-Breite geprüft. PostgreSQL und Caddy blieben
ohne Neustart. Design Guide V1 ist freigegeben; der Hero-Standard ist auf allen
bestehenden öffentlichen Inhaltsseiten umgesetzt. Die vier Radprofile bleiben
bis zur Bild- und Faktenfreigabe die dokumentierte Galerie-Ausnahme.

### 1B. Englische Redaktionstexte auf den älteren Unterseiten ergänzen

- ~~Die Seiten Bike, Kajak und Riverstar vollständig mit abgestimmten
  englischen Redaktionstexten ausstatten.~~ Die EN-Schaltfläche schaltet auf
  `kajak.html`, `ausruestung.html` und `bike.html` die vollständigen
  redaktionellen Inhalte, nicht nur die Navigation. Die Sprachwahl bleibt
  gespeichert; Rückwechsel auf Deutsch ist live geprüft. Die englische
  Riverstar-Fassung ist die öffentliche Kajakseite `kajak.html`.

### 1C. Zentrale responsive Unterseiten-Templates umsetzen

**Abnahme-Gate für diese Gesamtüberarbeitung (Nutzerentscheidung 24.09.2026):**
Alle Änderungen einschließlich des freigegebenen Trulli-Bilds bleiben zunächst
lokal. Vor einem gemeinsamen Live-Release erhält der Nutzer eine überprüfbare
lokale Gesamtvorschau der überarbeiteten Seiten für Desktop, Tablet und Mobil
und kann den Stand ansehen und abnehmen. Erst nach dieser Abnahme und den
bestandenen Release-Prüfungen wird gemäß Betriebsverfahren veröffentlicht.
Die Bildfreigabe für Trulli V11 allein ist keine Freigabe des Gesamt-Releases.

- [ ] Die verbindliche technische Spezifikation für zentrale responsive
  Komponenten sowie Kajak-/Aktivitäts-, Fahrzeug- und Reisebericht-Templates
  steht in [`responsive-templates.md`](responsive-templates.md); Prüf-,
  Originalschutz-, Freigabe- und Abnahmepflichten ergänzt der
  [konsolidierte Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).
  **Dokumentiert und im Projekt verankert am 23. September 2026; nur teilweise
  technisch implementiert, nicht vollständig geprüft oder live ausgerollt.** Vor
  Beginn sind die aktuelle Kajak-Seite als Gestaltungsreferenz und die
  eigenständige Startseite in Desktop-, Tablet- und Mobilansicht als
  Vergleichsbasis zu sichern. Der zugehörige Dokumentations-Abnahmebericht
  ersetzt weder diese Referenzsicherung noch eine Bild- oder Live-Prüfung.
- [ ] Gemeinsame Komponenten und zentrale responsive Regeln aus der bestehenden
  Architektur ableiten, die Kajak-Seite selbst auf das Aktivitäts-Template
  migrieren und anschließend Fahrzeugseiten, Reiseberichte sowie passende
  weitere Unterseiten ohne Inhalts- oder Funktionsverlust umstellen. Die
  Startseite bleibt ausdrücklich eigenständig.
- [ ] **Korrekturstand 23. September 2026:** Die öffentliche Navigation wird aus
  `navigation.js` zentral erzeugt und von allen 13 erfassten Routen bezogen;
  Scott ist dabei ein bestehender vollständiger Bericht, nur vier Radprofile
  sind noch `noindex` und „in Vorbereitung“. Acht Galerieseiten verwenden
  das gemeinsame Raster und den Viewer. Der lokale Browser-Smoke-Test umfasst
  91 Seiten-/Größen-Kombinationen; die automatisierte Suite ist bestanden.
  Die vollständige Bildprovenienz und -freigabe, Template-Trennung,
  vollständige visuelle Abnahme und der neue Live-Rollout bleiben offen.
  Maßgeblich ist der [aktuelle Bestands- und Abnahmebericht](abnahmeberichte/rework-bestandspruefung-2026-09-23.md);
  der [erste Teilbericht](abnahmeberichte/rework-teilstand-2026-09-23.md)
  ist nur ein historischer Zwischenstand.
- [ ] Die historische [aktualisierte Übergabefassung](vanventure-gesamtauftrag-aktualisiert.md)
  ist hinsichtlich Galerie-Standard und fortlaufender Anforderungspflege in
  die bestehenden maßgeblichen Spezifikationen übernommen. Der Produktionsstand
  auf Marvin enthält neuere Bike-Seiten und Webbilder als der GitHub-Stand
  `500421e`; diese Inhalte werden vor jeder Veröffentlichung verlustfrei in den
  Arbeitsbranch integriert und auf Herkunft/Freigaben geprüft. Die
  Übergabefassung ändert keine Gestaltungsregel; die bereits produktive
  Radserie und ihr freigegebener Galerie-Rasterstand werden aus dem
  neueren Live-Design-Guide übernommen.
- [ ] Die lesende Bildinventur fand nach der Kajak-Korrektur 84 eingebundene Webvarianten, alle vorhanden,
  davon nun 76 mit Bilddatensatz einschließlich des lokalen Staging-Manifests.
  Acht Zuordnungen und die
  daraus folgenden Freigabeprüfungen sind offen; der strenge Bildlauf sperrt
  den Release. Die Chat-Recherche belegt einzelne Kajak-, Reise- und
  Ausrüstungs-Entscheidungen, aber noch keine durchgängige Zuordnung aller
  Webableitungen. `kajak-06.jpg` („Gemeinsam am Fluss“) wurde gemäß der
  ausdrücklichen Entfernungsanweisung lokal aus der Galerie entfernt und
  die Inhaltsprüfung angepasst; die verbleibenden 13 Kacheln sind noch
  nicht als Gruppe neu abgenommen. Die pauschale frühere Angabe von 14
  freigegebenen Bildern ist keine aktuelle Einzel-Freigabe. Für 13 Reisebilder
  wurden unveränderte Projektkopien aus dem Archiv gesichert und per SHA-256
  geprüft; sechs weitere Reisebilder haben noch keinen eindeutigen
  Archivtreffer. Fünf Scott-Motive wurden zusätzlich nahezu identisch im
  Handyfoto-Archiv gefunden und mit unveränderten Projektkopien belegt.
  Am 24. September wurden acht weitere Scott-Webvarianten Motiv und Projektkopie
  zugeordnet: vier zusätzlich mit geprüftem Archiv-Hash, vier ohne gesicherte
  Archivherkunft. Zwei Scott-Reise-2026-Varianten bleiben offen. Vier bisher im Asset-Bereich abgelegte Hero-Originalkopien
  wurden lokal prüfsummengleich in den nicht öffentlichen Review-Bereich
  verschoben; der Webserver blockiert den früheren Pfad und weitere
  Review-Pfade mit bestandenen HTTP-Tests. Das ist noch nicht live; die
  frühere Server-Auslieferbarkeit bleibt im Abnahmebericht dokumentiert;
  die Dateien waren laut Git-Prüfung nicht Teil der Repository-Historie.
  Die Quellenliste wurde unter `docs/hero-bildquellen.json` gesichert.
  Eine fehlende
  Scott-Projektkopie wurde unverändert aus dem
  Archiv gesichert und per SHA-256 vor/nach geprüft. Bis zur nachgewiesenen
  Freigabe der übrigen Varianten wird kein neuer Stand veröffentlicht.
  Ein lokales, nummeriertes Kontaktblatt der ursprünglich 16 offenen Webvarianten liegt
  unter `review/missing-image-contact-sheet-2026-09-24.jpg`; die vollständige
  Zuordnungsliste und die negativen Archivsuch-Ergebnisse stehen im
  Abnahmebericht. Für die letzten acht Varianten wurde am 24. September ein
  eigenes Kontaktblatt erstellt:
  `review/missing-image-contact-sheet-rest-8-2026-09-24.jpg`.
  Die Nutzerlinks identifizieren jetzt die Quellenmotive für beide
  Scott-Reise-2026-Varianten und sechs Reisebilder. Für fünf Reisevarianten
  liegen passende, unveränderte Projektkandidaten vor; der lesende
  64×64-Graustufenvergleich zur jeweiligen Webdatei liegt zwischen 0,9350
  und 0,9950. `rote-felskueste` passt mit 0,9965 und übereinstimmenden EXIF-
  Angaben. Die Links und Projektkopie-/Web-Hashes sind in den beiden
  Bildquellenregistern erfasst. Die nähere Scott-Webfassung lässt sich
  vorläufig einem der beiden nahen Google-Fotos-Frames zuordnen; der genaue
  Frame bleibt offen. Die weiter entfernte Scott-Webfassung passt vorläufig
  zum 13:38:24-Frame. Bei allen
  acht fehlen Google-Originalbytes zum Byteabgleich; der normale Download
  wurde von Chrome mit `ERR_BLOCKED_BY_CLIENT` gesperrt und nicht umgangen.
  Die Trulli-Webdatei entfernt sichtbar Personen und verändert Bildelemente;
  ihre Dokumentartreue ist nicht bestanden. Der Audit zählt 84/84
  Registereinträge, keine Web-/Projektkopie-Hashabweichung und acht offene
  Quellkopie-Prüfungen. Die neun Originaldownloads werden ohne Überschreiben
  in `review/selected-originals/google-photos-incoming/` benötigt. Kein
  Bildfreigabe- oder Release-Go. Ergänzung 24.09.2026: Die unveränderte
  Projektkopie `reisebilder-originale/italien-2021/DSC_0063.JPG` wurde lokal
  als neue, nicht veröffentlichte Prüfvorschau verarbeitet:
  `review/privacy-previews/trulli-editorial-review-v11.jpg`. V5 und V8
  wurden wegen sichtbarer Leitungsreste beziehungsweise weiterhin kippender,
  nach rechts ansteigender Bildhälfte und zu schwacher Farbkorrektur verworfen.
  V11 enthält eine randgebundene lokale Perspektiv- und Niveaukorrektur der
  rechten Bildhälfte, die bestätigte Leitungsretusche bis zum Mast, eng
  gesetzte weiche Gesichts-/Kennzeichenunschärfe und eine deutlichere,
  wolkenschonende Outdoor-Editorial-Farbgebung. Die Projektkopie blieb
  SHA-256-identisch. Die Vorschau wurde vom Nutzer am 24.09.2026 mit
  „viel besser! das nehmen wir“ für dieses Trulli-Motiv abgenommen. Die
  versionierte Webableitung `assets/reisen/italien-2021/alberobello-trulli-v11.jpg`
  (2560×1440, SHA-256 `cc4cb7201b2aeb9343a9059c2b70f0a2e3dfde5eedfc5119098e5b6715567167`)
  ist lokal erstellt und in `italien-2021.html`, `travel-stories.json` und dem
  Bildregister referenziert; das alte, personenentfernende PNG ist lokal nicht
  mehr eingebunden. Der strenge Bildlauf (84/84 referenzierte Varianten,
  keine offenen Quellzuordnungen), 25/25 Projekttests und der Planabgleich
  bestehen. **Nicht veröffentlicht / nicht live geprüft:** Der lokale
  Voll-Release-Check scheitert am nicht erreichbaren Docker-Dienst; der
  Arbeitsbranch enthält viele weitere ungesicherte Änderungen, die nicht
  ungeprüft in einen Release-Commit übernommen werden dürfen. Die genauen
  Maskierungs- und Sichtprüfregeln wurden
  in `AGENTS.md`, dem VanVenture-Fotoskill und dem konsolidierten Gesamtauftrag
  präzisiert.
- [ ] **Fahrzeugbilder, Herkunft präzisiert am 23./24. September 2026:** Der ältere
  VanVenture-Chat benennt drei Google-Fotos-Aufnahmen vom 10./11.06.2025. Alle
  drei wurden lesend in Google Fotos gefunden und als Ausgangsmotive der vier
  heutigen Fahrzeug-Webdateien visuell erkannt. Der Chat enthält eine damalige
  Freigabe der bereinigten Fassungen, aber auch die Beanstandung eines
  KI-bedingt falschen Fahrzeugteils und weitere Fassungswechsel. Aktuelle
  Originaltreue und Einzelvarianten-Freigabe sind dadurch nicht belegt.

  **Nachtrag 24. September 2026 – Schiebetür/Hinterrad:** Die Nutzerbeanstandung
  an `vehicle-side-camp-v2.png` ist als konkrete, ausdrücklich beauftragte
  Bildkorrektur aufgenommen. Die neue, versionierte lokale Webableitung
  `assets/vehicle/vehicle-side-camp-v3.png` stellt die geöffnete Schiebetür
  mit plausibler Überlagerung des Hinterrads dar; `vehicle-side-dog.png` war
  die vom Nutzer benannte Konstruktionsreferenz. Die unveränderte Projektkopie
  `review/selected-originals/vehicle/20250610_124826.jpg` bleibt erhalten.
  Der Nutzer hat V3 anschließend als richtig bestätigt und für die Website
  freigegeben. V3 ist lokal in `vehicle.html` eingebunden und visuell geprüft;
  sie ist noch nicht committed, gepusht, veröffentlicht oder live verifiziert. Details und
  Prüfsummen stehen im Abnahmebericht
  `docs/abnahmeberichte/fahrzeug-schiebetuer-korrektur-2026-09-24.md` sowie
  in `docs/vehicle-bildquellen.json`. Der Design-Guide bleibt inhaltlich
  unverändert.
  Chrome sperrte den automatischen Originaldownload mit
  `ERR_BLOCKED_BY_CLIENT`; die Sperre wurde nicht umgangen. Der Nutzer legte
  anschließend drei unveränderte Originaldateien im geschützten
  Projektbereich ab. Ihre lokalen SHA-256-Werte, die vier Webdatei-Hashes,
  die Motivzuordnung und der offene Freigabestatus stehen jetzt in
  `docs/vehicle-bildquellen.json`. Der lesende Audit bestätigt alle vier
  Projektkopie- und Webdatei-Hashes; der damalige Zwischenstand war
  **68/84** mit **16** Lücken. Der aktuelle Stand nach Scott-Nachtrag ist
  **76/84** mit **acht** Lücken. Der Vergleich beweist keine
  Bytegleichheit mit Google Fotos und keine Freigabe der KI-Änderungen;
  historische Exportparameter und die finale Einzelbildabnahme fehlen. Kein
  neuer Release dieser Bilder.
  Ein erster eng begrenzter KI-Entwurf zur Hintergrundbereinigung wurde als
  Review-Derivat abgelehnt, weil er Fahrzeugdetails neu interpretierte;
  keine öffentliche Webdatei wurde ersetzt. Nächster Bildschritt:
  Ein nicht-generatives lokales Prüfderivat der Frontaufnahme anonymisiert
  nun vier sichtbare Kennzeichen; der Quell-Hash ist vor/nach identisch.
  Es ist weder eingebunden noch veröffentlicht. Für die zwei Seitenfotos
  erfordert das vollständige Entfernen der unmittelbar hinter dem Van
  sichtbaren Caravans eine erfundene Hintergrundszene. Bis zur Auswahl
  passender Alternativ-Originale oder einer ausdrücklichen Entscheidung für
  die reale Campingplatzszene bleiben diese Varianten gesperrt.
- [ ] Die Startseiten-SEO-Variante `assets/hero-norway.jpg` hatte sichtbare
  Bildstörungen im unteren Bereich. Die unveränderte Archivquelle wurde
  gesichert und geprüft, das defekte JPEG lokal bewahrt und durch eine
  technische Ableitung der Projektkopie ersetzt. Die sichtbare WebP-Variante
  blieb unverändert. Lokale Sicht- und Hashprüfung bestanden; Open-Graph-
  Einbindung und Auslieferung sind noch nicht live geprüft.
- [ ] **Originalschutz-Entscheidung 23. September 2026:** Nur projektisoliert
  arbeiten; die Windows-ACL des gemeinsam genutzten Archivs nicht ändern.
  Die Staging-Skripte verweigern jetzt das Überschreiben vorhandener
  unveränderter Projektkopien und gleichen Quell-/Kopie-Hashes ab. Ein
  Projektkopie-Lauf für 13 Reisebilder ist erfolgt; die vollständige
  Bildverarbeitungsprüfung und der Abgleich der vorhandenen Chats/Projektbelege
  mit den veröffentlichten Bildvarianten bleiben offen. Ein gesondertes,
  vom Nutzer bereitzustellendes „Bildregister“ wird nicht vorausgesetzt.
- [ ] Die Abnahmekriterien der Spezifikation nachvollziehbar erfüllen:
  zentrale Änderungswirkung sowie visuelle und funktionale Prüfungen bei 360,
  390, 768, 1024 und 1440 CSS-Pixeln. Erst danach einen Live-Rollout nach den
  Betriebsregeln durchführen und getrennt dokumentieren.

### 2. Aus den Analysewerten echte Test-Briefs machen

- ~~Für den VAN-Test „GCS nach einem Jahr“ Zielgruppe, Nutzenversprechen,
  Format, Ziel/KPI, geschätzte Stunden und Verwertung verbindlich festlegen.~~
  Der vollständige [Production Brief](production-briefs/gcs-nach-einem-jahr.md)
  ist im Live-Planner als `briefed` mit einem Zielaufwand von 8–11 Stunden
  hinterlegt; Archiv-first und sieben gezielte neue Dreh-Setups ersetzen einen
  aufwändigen Voll-Dreh.
- [ ] Für die zwei übrigen validierten Tests EXPLORE (California → Hymer) und
  MOVE (Bike oder Kajak / Basecamp) jeweils Zielgruppe, Nutzenversprechen,
  Format, Ziel/KPI, geschätzte Stunden und Verwertung verbindlich festlegen.
- ~~Für den VAN-Test das Paket Longform → 2 eigenständige Shorts/Reels →
  belegte Website-Ergänzung → geprüfte Context-Fakten → 28-Tage-Review
  festlegen.~~ Die einzelnen Produktions- und Freigabeschritte bleiben bis zur
  Veröffentlichung offen.
- [ ] Für EXPLORE und MOVE die jeweiligen Pakete festlegen: Longform → 2
  eigenständige Shorts/Reels → belegte Website-Ergänzung → geprüfte
  Context-Fakten → 28-Tage-Review.
- ~~Die ersten geprüften Fakten zum VAN-Test im Master Context anlegen.~~ Zehn
  freigegebene, dauerhafte GCS-Fakten sind in Produktion gespeichert.
- [ ] Die ersten geprüften Fakten zu EXPLORE und MOVE im Master Context
  anlegen.
- [ ] Nach jeder Veröffentlichung tatsächliche Produktionsstunden ergänzen und
  nach frühestens 28 Tagen Nutzen pro investierter Stunde bewerten.

### 2A. Familien-Scrum-Board als private Arbeitszentrale entwickeln

**Ziel:** Das Board ist die private, auf einem Küchen-Tablet dauerhaft sichtbare
Aufgabenfläche für Familie, Reisen, Fahrzeug, Haushalt und VanVenture-Arbeit.
Es nutzt dieselbe geschützte Anwendung, Sitzung, Datenbank und Audit-Grundlage
wie das Cockpit, bleibt aber fachlich vom Content Planner getrennt. Der
[Hauptentwicklungsplan mit Marvin Scrum Board](VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md)
ist die technische Referenz; dieser Abschnitt ist die verbindliche Arbeitsliste.

**Erstes verbindliches Gate – Phase 0 (nur Festlegung, keine Datenanlage):**

- [ ] Familienmitglieder, Anzeige-Namen und Board-Zugriffe festlegen; dabei
  klären, welche bestehende Rolle das Tablet im Küchenbetrieb benötigt.
- [ ] Prioritäten (`niedrig`, `normal`, `hoch`, `kritisch`), Fast-Track-Kriterien,
  Archivfrist, Review-Regeln und die ersten Beispiel-Epics/Stories gemeinsam
  bestätigen.
- [ ] Den VanVenture-Warnungskatalog mit Schlüssel, Schweregrad, Text und
  empfohlener Handlung je Fahrzeugwarnung erstellen sowie den versionierten
  Ereignisvertrag, Dienstidentität, Schlüsselrotation, Zustellwiederholung und
  Betriebsverantwortung verbindlich festlegen.
- [ ] Phase 0 schriftlich abnehmen. Bis dahin werden weder Board-Karten,
  automatische Warnungen noch Marvin-Schreibrechte produktiv angelegt.

**Umsetzung erst nach Phase-0-Abnahme:**

- [ ] Backlog und die zwei Board-Zeilen **Fast Track** und **Scrum Board** mit
  den Spalten `Offen → Bereit → In Arbeit → Review → Done` umsetzen. Nur
  bewusst eingeplante Tasks und To-dos dürfen aus dem Backlog aufs Board;
  Fast Track bleibt hoch- oder kritisch priorisierten Aufgaben vorbehalten.
- [ ] Additive `scrum_*`-Migrationen für Items, Board-Positionen,
  Arbeitsübernahmen, sichtbaren Ereignisverlauf, Warnungs-Inbox und
  Warnungszuordnung erstellen: `scrum_items`, `scrum_board_positions`,
  `scrum_work_assignments`, `scrum_item_events`, `scrum_alert_inbox` und
  `scrum_alert_links`. Epics und Stories strukturieren das Backlog; nur Tasks,
  To-dos und Warnungs-Tasks können aufs Board.
- [ ] Private, CSRF-geschützte Endpunkte unter `/api/cockpit/scrum/*` für
  Backlog, Board, Karten, Verschiebungen, Übernahmen und Verlauf ergänzen.
  Der Wechsel nach **In Arbeit** muss atomar eine Übernahme festhalten. Alle
  Browseränderungen brauchen Rollenprüfung und erzeugen datensparsame
  Audit-/Verlaufsdaten; private Beschreibungen erscheinen nie in Logs oder
  öffentlichen Antworten.
- [ ] Eine zugängliche Tablet-Ansicht im Querformat bauen: beide Zeilen,
  Backlog, Karten-Details, große Bedienelemente sowie eine vollständige
  Tastaturalternative zu Drag-and-drop. Karte, Priorität, Fälligkeit,
  Übernahme und Verlauf müssen ohne Leistungs- oder Personenranking sichtbar
  und verständlich sein.
- [ ] Den zunächst eng begrenzten Marvin-Zugriff umsetzen: Er darf auf klaren
  Auftrag Backlog-Items anlegen und vorbereiten sowie ausdrücklich angeordnete
  Verschiebungen ausführen, aber niemals autonom priorisieren, Personen
  übernehmen lassen, Done markieren oder Warnungen auflösen.
- [ ] Die persistente Warnungs-Inbox über einen separaten,
  idempotenten und authentifizierten VanVenture-Ereigniskanal vorbereiten.
  `info` und `normal` bleiben Inbox-Ereignisse; `high` und `critical` erzeugen
  genau eine Fast-Track-Karte. Dienstidentität, Signatur/Schlüsselrotation,
  Wiederholung, Datenminimierung und der Warnungskatalog werden vor dem
  Einschalten verbindlich festgelegt.
- [ ] Content Planner und Scrum Board getrennt halten. Eine freiwillige
  Verknüpfung zu Story/Epic oder Planner-Eintrag darf nie Status, Inhalt oder
  Stunden automatisch überschreiben.
- [ ] Migrations-, Rechte-, CSRF-, Transaktions-, Idempotenz-, Archiv- und
  Tablet-Tests sowie Wiederherstellung von Board, Inbox und Verlauf aus Backup
  durchführen. Vor der Live-Migration einen geschützten Dump erstellen; danach
  `/healthz`, private Board-Route und sichtbare Bedienung live prüfen. Nur der
  Webdienst darf bei Bedarf kurz neu starten.

### 3. Audit V2 erst mit belastbaren externen Daten abschließen

- [ ] Die künstliche 500-Video-Grenze im paginierten YouTube-Import entfernen
  und mit einem Bestand über 500 Videos automatisiert prüfen.
- [ ] Die im technischen Entwurf vorgesehene Administrator-Aktion „YouTube
  trennen“ ergänzen: gespeicherte Token sicher löschen/widerrufen, Folge-Syncs
  stoppen und den Vorgang auditieren.
- [x] Den ersten YouTube-Reach-Report abnehmen: Am 23. September 2026 wurden
  zwei positive Impressionswerte (5 und 1) sowie echte CTR-Nullwerte im Cockpit
  eingelesen und geprüft.
- [ ] Traffic Sources sowie verfügbare Retention-/Engagement-Zeitreihen mit
  Zeitraum, Datenstand und API-Grenzen im Cockpit sichtbar machen.
- [ ] Video-Detailseite mit 1/7/28/90/365-Tage-Vergleich, Datenqualität und
  Long-Tail-/Alterslogik ergänzen.
- [ ] Strukturierte Ziel- und Ist-Metriken für Plan-Einträge ergänzen
  (`content_item_metrics`); Ziel/KPI steht aktuell nur im Brief-Freitext.
- [ ] Effizienzmetriken aus tatsächlichen Stunden und veröffentlichten
  Ergebnissen berechnen; bis dahin keine Erfolgsbehauptung aus Views allein.
- [ ] Den wiederkehrenden Workflow im Cockpit dokumentieren: Export → externe
  Analyse → geprüfte Erkenntnisse in Planner und Master Context übernehmen.

### 4. Google-Produktionsreife und rechtliche Basis

- [ ] Öffentliche Datenschutzerklärung, Nutzungsbedingungen, Kontakt-E-Mail und
  Impressum erstellen und rechtlich prüfen lassen.
- [ ] Google Auth Platform mit echten Rechtstext-URLs, Domainbestätigung und
  erforderlicher OAuth-/Scope-Verifizierung abschließen.
- [ ] Erst danach OAuth von Test auf Produktion umstellen und die Verbindung
  erneut prüfen.
- [ ] Aufbewahrungs-, Export- und Löschkonzept für Cockpitdaten verbindlich
  festlegen.

### 5. Website, Vertrauen und Sichtbarkeit

- **Review-Fassung 24. September 2026, nur lokal:** Der Nutzer hat für alle
  Galerien einen feineren Bildunterschrift-Stil, kleinere Galerie-Lupen und
  sorgfältig zentrierte Blätterpfeile beauftragt. Die gemeinsame Galerie-CSS
  und der Foto-Viewer enthalten dafür eine transparente, ruhige Captionzeile
  statt des dunklen Balkens, 27/25-px-Lupen und mittig platzierte SVG-Pfeile.
  Dies ist eine vorgelegte Gestaltungsvorschau, **noch nicht vom Nutzer
  abgenommen**; bis dahin wird sie nicht als neue verbindliche Guide-Regel
  ausgegeben. Die allgemeine Ausrüstungsübersicht wurde auf ausdrücklichen
  Wunsch aus dem gemeinsamen Menü und von der Startseitenkarte entfernt;
  die bestehende URL blieb in diesem historischen Zwischenstand zur
  Linkerhaltung erreichbar. Dieser Stand ist durch den jüngeren
  Weiterleitungsnachtrag unten ersetzt. Der Design-Guide
  wurde nur für diese klare Navigationsentscheidung geändert.
- **Direktnavigation, lokal umgesetzt und geprüft am 24. September 2026:**
  Der zusätzlich eingeführte Menüpunkt „Alle Räder“ wurde auf ausdrücklichen
  Wunsch entfernt. Gibt es Unterseiten, führen Menü und Startseitenkarte
  direkt zu diesen; eine neue Übersichtsseite wird nur auf ausdrücklichen
  Wunsch des Nutzers vorgesehen. Die bestehende `bike.html`-URL bleibt zur
  Wahrung vorhandener Links damals erreichbar; inzwischen gilt der
  Weiterleitungsnachtrag unten. Diese Projektregel ist im Design-Guide
  und in der Template-Spezifikation verankert; die Menüprüfung ist Teil von
  `deploy/public-content.test.mjs`. Kein Live-Rollout.
- **Bildgrading, teilweise lokal umgesetzt, Gesamtprüfung offen:** Die
  pixelgetreue Methode ohne KI-Neuerzeugung wurde vom Nutzer bestätigt.
  Bikepause, Italien-Hero und sardische Küste wurden als private Farbproben
  ausdrücklich gutgeheißen. Ihre identischen Bytes sind nun als vier
  versionierte, lokale Webableitungen eingebunden (Bikepause auf Reise- und
  Radseite); die alten Dateien bleiben erhalten. Die Bildregister nennen
  Quellkopie, Hash, Bearbeitung und lokale Freigabe. Diese drei Motive sind
  keine Abnahme aller 83 verwendeten Fotos und kein Live-Nachweis.
  Eine KI-Probe veränderte Szenendetails und wurde verworfen. Motivweise
  Prüfung der übrigen Fotos, Datenschutz, Varianten und vollständige
  Desktop-/Tablet-/Mobilprüfung bleiben vor Release offen.
- **Vollständiges Fotoinventar begonnen, noch kein Gesamtgrading:** Der
  reproduzierbare Leselauf `python tools/grade-photo-inventory.py` erfasst
  83 referenzierte Fotovarianten und eine Grafik. Sechs private Kontaktbögen
  unter `review/photo-grade-audit/2026-09-24/` ermöglichen motivweise
  Sichtung. Die übrigen Fotovarianten sind weder neu gegradet noch einzeln
  farblich abgenommen; Gesichter, Kinder und Kennzeichen benötigen eigene
  Prüfung. Die vier bereits vorhandenen KI-bereinigten Fahrzeug-Webbilder
  bleiben nach ausdrücklicher Nutzerentscheidung vom 24. September 2026
  unverändert; dies ist eine eng begrenzte Ausnahme, keine Freigabe neuer
  KI-Eingriffe. Das Gesamtgrading bleibt offen und wird nicht durch den
  Hash-/Quellenaudit erfüllt.

- **Gesamtüberarbeitung – lokaler Arbeitsstand 24. September 2026:** Die acht
  vorhandenen öffentlichen Galerien (Kajak, Fahrzeug, drei Reiseberichte,
  Bike, Scott und Ausrüstung) werden nun aus einem gemeinsamen Renderer und
  ihren Inhaltsdaten erzeugt; gemeinsame Raster-/Kachelregeln liegen in
  `gallery-shared.css`. Die Reiseberichte nutzen weiterhin ihren gemeinsamen
  Seitengenerator. Kajak und Fahrzeug nutzen jetzt denselben Detail-Renderer:
  Hero-Felder und zehn Abschnittsgrenzen sind als Seitendaten strukturiert,
  ohne die ausgegebene HTML-Struktur zu ändern. Zusätzlich werden die vier
  wiederholten zweisprachigen Fahrzeug-Abschnittsüberschriften einschließlich
  der optionalen Hinweiszeile aus einem gemeinsamen Baustein gerendert;
  die Migration hat identisches HTML nachgewiesen. Vier wiederkehrende
  Kartengruppen (Kajak-Vorteile/Erfahrungen, Fahrzeug-Systeme/Ausbauten)
  verwenden nun ebenfalls einen gemeinsamen Artikel-Renderer; auch hier
  blieb das erzeugte HTML zeichenidentisch. Die redaktionellen
  Abschnitts-Inhalte liegen weiterhin als HTML innerhalb dieser Daten;
  weitere Zerlegung und weitere Seitentypen fehlen noch. Vier vorläufige
  Radprofile wurden inzwischen zusätzlich zentralisiert (siehe unten). Das ist
  **keine vollständige Template-Zentralisierung**. Der vom Nutzer ausdrücklich freigegebene kleine
  Lupenhinweis statt sichtbarem „Vergrößern“-Text ist zentral und nur lokal
  umgesetzt. Die Startseite wurde nicht in ein Unterseiten-Template überführt.
  Lokale Generator-, Code-, Bildregister- und visuelle Prüfungen sind im
  Abnahmebericht dokumentiert; Tablet-/Querformat und jede einzelne Seite
  benötigen vor Freigabe noch die vollständige visuelle Abnahme. Der Nutzer
  will den kompletten lokalen Stand vor einer Live-Schaltung sehen. **Weder
  diese Änderungen noch Trulli V11 sind committed, gepusht oder live.**
- [ ] Restliche Seitentyp-Strukturen und gemeinsame Abschnitte ohne
  inhaltliches Redesign zentralisieren; alle öffentlichen Seiten auf Desktop,
  Tablet sowie Mobil in Hoch- und Querformat visuell und funktional abnehmen,
  lokale Gesamtvorschau vorlegen und erst danach den getesteten Release-Commit
  gemäß Verfahren veröffentlichen und live nachprüfen.
  Das fertig erzählte Scott-Radprofil ist inzwischen zusätzlich als
  `equipment`-Eintrag an den gemeinsamen Detailseiten-Generator angebunden;
  Hero-Markup und Hero-CSS stammen jetzt aus der Kajak-Basis. Die lokale
  technische Prüfung besteht, der neue Hero und die gesamte Radseite sind
  visuell noch nicht abgenommen. Die vier „in Vorbereitung“-Profile behalten
  ihre genehmigte Poster-Ausnahme. Keine dieser Änderungen ist live.

- [ ] **Websiteweite Farbsichtung, lokaler Teilstand 24. September 2026:**
  Von 79 eingebundenen Nicht-Fahrzeug-Fotovarianten wurden 74 erste private
  Farbableitungen direkt aus unveränderten, per SHA-256 geprüften Projektkopien
  erzeugt. Fünf bereits gesondert freigegebene Varianten (zweimal Bikepause,
  Italien-Hero, Sardinien-Küste, Trulli V11) wurden nicht unnötig neu
  bearbeitet. Damit hat jede Nicht-Fahrzeug-Variante eine erste Farbprobe
  oder eine vorhandene Freigabe, **nicht aber die erforderliche Einzelabnahme**.
  Sichtbare Gesichter und Kennzeichen in mehreren neuen Ableitungen sperren
  deren Chat-/Webvorschau bis zur präzisen Anonymisierung und Kontrolle.
  47 der 74 ersten Farbproben sind auf sieben datenschutzgefilterten
  Kontaktbögen als Nutzeransicht vorbereitet; 27 bleiben zurückgehalten.
  **Nutzer-Review am 24. September: erste 74 Farbproben visuell nicht
  akzeptiert, da praktisch kein Unterschied erkennbar war.** Ihre technische
  Erzeugung und Hashprüfung sind keine fertige Bildbearbeitung. Die
  motivbezogene Farbarbeit muss erneut erfolgen und in großem Vorher/Nachher-
  Vergleich statt nur auf Kontaktbögen überprüft werden. Eine zweite lokale
  Black-Beauty-Schattenprobe liegt nur zur Richtungsentscheidung im Review.
  Nach Nutzerfeedback („Rad und Helm besser, Hintergrund zu flach“) wurde
  eine weitere private Probe mit getrennt abgestimmter Grün- und
  Hintergrunddichte erstellt (`black-beauty-shadow-v5-2026-09-24`). Sie ist
  nicht freigegeben und nicht in die Website übernommen.
  Auch diese Wirkung war im Ganzbild für den Nutzer nicht erkennbar.
  `black-beauty-shadow-v6-2026-09-24` ist deshalb eine nochmals getrennt
  abgestimmte private Richtungsprobe mit stärkerer, aber auf reale Wiese und
  Baumreihe begrenzter Farbtiefe; ein vergrößerter Hintergrundvergleich liegt
  daneben. Nutzerabnahme und Motiv-für-Motiv-Arbeit bleiben offen.
  Nach erneutem Feedback wurde die fehlerhafte räumliche Ausklammerung des
  links/mittig liegenden Walds in V7 entfernt: Grünbereiche werden nun nach
  tatsächlicher Bildfarbe statt nach Position des Rads getrennt. Der Nutzer
  bestätigte anschließend die sichtbare Richtung („jetzt aber“). Genau dieses
  Motiv wurde als neue WebP-Version lokal in die Scott-Galerie eingebunden,
  einschließlich Quellen-/Hashnachweis; Live-Freigabe ist damit nicht erteilt.
  Ausschnitt, Spiegelung und Farbgebung benötigen ebenfalls die motivbezogene
  Prüfung. Keine der 74 verworfenen Erstfassungen wurde in Webassets
  übernommen; die lokal eingebundene V7 ist eine separat geprüfte neue
  Ableitung. Die zusätzlich intern getestete Norwegen-Hero-Probe wurde
  wegen kaum erkennbaren Mehrwerts verworfen; eine Scott-Innenraumprobe V2
  bleibt privat und ungeprüft für die Website.
  Vier freigegebene KI-bereinigte Fahrzeugbilder sind ausgenommen und
  unverändert. Die unabhängige Seitenstruktur-Bereinigung läuft inzwischen
  parallel zur motivweisen Bildprüfung; keine Veröffentlichung vor lokalem
  Gesamt-Review.

- [x] **Vier vorbereitende Radprofile zentralisiert, lokal geprüft:**
  `cube.html`, `trek-gravelbike.html`, `woom-2.html` und
  `diamant-stadtraeder.html` beziehen ihren gemeinsamen, ausdrücklich
  genehmigten Zwischenaufbau jetzt aus `site_detail.py` und
  `content/pending-bike-pages.json`. Der lesende Generator prüft alle sechs
  Aktivitäts-/Fahrzeug-/Rad-Detailseiten ohne HTML-Abweichung; die vier
  Radseiten behielten Inhalte, URLs und den gekennzeichneten Zustand ohne
  Galerie. Der Reisebericht-Generator besitzt zusätzlich einen nicht
  verändernden `--check`-Modus für den Hauptinhalt aller drei bestehenden
  Berichte und die Startseitenlinks (SEO-Head bleibt ein eigener Build-Schritt).
  7/7 lokale Template-Tests und 27/27 Node-Tests bestanden.
  Dies ist keine neue Bild- oder Live-Freigabe; weitere Template-Migration,
  Bildarbeit und vollständige responsive Sichtprüfung sind offen.

- **Bildzuordnung – Stand 24. September 2026:** Alle neun angeforderten
  Google-Fotos-Dateien liegen jetzt unverändert im privaten Ordner
  `review/selected-originals/google-photos-incoming/`. SHA-256 der sechs
  Reisebilder-Downloads stimmt jeweils exakt mit der bereits aufbewahrten
  unveränderten Projektkopie überein; Bildregister und Abnahmebericht sind
  aktualisiert. Die drei Scott-Downloads sind dort ebenfalls separat
  aufbewahrt und gehasht; der visuelle Abgleich ordnet die breite Galerie dem
  Frame `133850` und das hohe Bild `133853` zu. Bearbeitungskette und Freigabe
  sind noch offen; das nahe Original zeigt ein Kennzeichen. Keine Webdatei wurde in
  diesem Schritt verändert oder veröffentlicht; der strenge Bildlauf ist
  damit nicht automatisch freigegeben.

- **Arbeitsregel, lokal dokumentiert am 23. September 2026:** Für jede
  Bildaufgabe auf vanventure.at ist der verbindliche Skill in
  `C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md` zu lesen und
  anzuwenden. Diese Regel wurde nur in `AGENTS.md` des VanVenture-
  Repositories verankert; es wurden keine Website-Bilder verändert, geprüft,
  veröffentlicht oder live ausgerollt.
- [ ] Fahrzeugseite, Reiseberichte und Ausrüstungsliste nur mit belegten,
  freigegebenen Fakten und Fotos erweitern; Kennzeichen auf Webderivaten
  anonymisieren.
- [ ] Riverstar-/Kajak-Entwurf fachlich und redaktionell freigeben, bevor er
  öffentlich wird; vorher Gewässer/Ort der Uferbilder und die konkrete Kritik
  an den Schwimmwesten klären.
- [ ] Search Console und Bing Webmaster Tools verifizieren, Sitemap einreichen
  und erst danach Suchdaten auswerten.
- [ ] Bei ausdrücklich ausgewählten Reisevideos passende Website-Links ergänzen;
  keine automatisierten Fremdbeiträge oder gekauften Links.

### 6. Betrieb

- [ ] Backup/Restore inklusive Cockpit-Tabellen alle zwei bis vier Wochen
  wiederholen und dokumentieren.
- [ ] Die persistente Warnungs-Inbox erst nach Umsetzung und gemeinsamer
  Prioritätsregel des Familien-Scrum-Boards als Benachrichtigungskanal
  anschließen.
- [ ] Bei jedem Web-Release Website, PostgreSQL und Caddy geschützt
  weiterbetreiben und `/healthz`, betroffene Route sowie sichtbares Ergebnis
  prüfen.

### Bildreview am 24. September 2026 – lokale Zwischenstufe

Der Nutzer hat die vorhandenen Fotos 1 (Bikepause), 2 (Sardinien-Küste)
und 5 (Black-Beauty-Pause) ausdrücklich bestätigt; sie bleiben unangetastet.
Für das Italien-Herobild (Nr. 3) und Trulli (Nr. 4) liegen private
Vorschauen bis V5 bzw. V12 zur Entscheidung vor. Sie sind noch nicht in die
Website eingebaut. Die vier bereits guten KI-bereinigten Fahrzeugfotos
bleiben von dieser Farbüberarbeitung ausgenommen.

Für die 74 übrigen früher erfassten Bildvarianten wurden aus gehashten,
unveränderten Projektkopien zweite private Farbproben erzeugt. Eine dieser
74 Varianten ist inzwischen durch die lokal eingebaute, separat geprüfte
Scott-Pause ersetzt; deshalb lautet die aktuelle Website-Abdeckung 79
nicht-fahrzeugbezogene Varianten: 73 weitere aktuelle Farbproben und sechs
bereits lokal eingebaute Fassungen. Ein rein lesender Prüfablauf ist
`python tools/verify-sitewide-photo-reviews.py --second-pass`;
`node deploy/public-image-audit.mjs --strict` prüft zusätzlich die 84/84
öffentlichen Bildreferenzen und Quellenbelege. Die Farbrichtung ist bei
mehreren Bildern noch zu schwach; keine pauschale visuelle Freigabe.
Nach der Personenentscheidung vom 24.09.2026 sind 72 der 74 Farbproben
in der ausschließlich an `127.0.0.1:8789` gebundenen
Einzelbild-Vorschau sichtbar. Kinder werden anonymisiert; Erwachsene
bleiben sichtbar, sofern der Nutzer nicht für das einzelne Motiv eine
Gesichtsmaske verlangt. Die zuvor vorsorglich maskierten Erwachsenen-
Vorschauen sind durch unvermaskierte Ableitungen ersetzt und werden nicht
mehr ausgeliefert. Kennzeichen bleiben motivweise maskiert und wurden
bei 100% geprüft; zwei weitere Motive zeigen nur nicht identifizierende
Rückansichten. Beim Norwegen-Campingmotiv Nr. 12 wurden die
Fahrzeugbereiche zusätzlich bei 100% geprüft; kein Kennzeichen ist
sichtbar. Zwei Varianten (Nr. 63 und 69) bleiben wegen möglicher Kinder
oder unklarer Alterszuordnung zurückgehalten. Zu grobe oder
unvollständige Maskenversuche werden nicht gezeigt. Sichtbarkeit im lokalen Review
ist keine Freigabe für den Webeinbau oder die Veröffentlichung.
Die lokale Seite/der lokale Server ist kein Release und keine
Veröffentlichung. Weitere individuelle Farb- und Datenschutzprüfungen
sowie der Nutzerreview bleiben offen; live unverändert.

### Responsiver Seitenreview am 24. September 2026 – lokal

Der reproduzierbare, die Website nicht verändernde Lauf
`node tools/audit-responsive-preview.mjs` prüfte 13 öffentliche Seiten
in fünf Formaten (Smartphone hoch/quer, Tablet hoch/quer, Desktop):
**65/65 technisch bestanden**. Keine fehlenden geladenen Bilder,
JavaScript-Seitenfehler, horizontalen Überläufe oder fehlgeschlagenen
Foto-Viewer-Klick-/Escape-Prüfungen. Die dabei entdeckten gemeinsamen
Hero-Klick- und Kajak-Mobilabstandsfehler wurden in
`equipment-pages.css` bzw. `kajak-hero.css` zentral korrigiert.
Die Screenshots, Galerie-, Navigations- und Viewer-Ansichten liegen im
lokalen Review unter `127.0.0.1:8790`; dieser Stand ist noch **nicht**
fachlich vom Nutzer abgenommen. `node --test` 27/27,
`python -m unittest tools.test_site_build` 8/8 und
`python tools/build-detail-pages.py` 7/7 bestanden nach den Korrekturen.
Die zwei gesperrten Bildvarianten, individuelle Farbfreigaben, Webeinbau der
neuen Bildableitungen, anschließender vollständiger Bild-/Sichtlauf und
Release bleiben offen. Kein Commit, Push oder Live-Rollout in dieser
lokalen Review-Phase.

### Nutzerfeedback zu 18 Fotoproben am 24. September 2026 – neuer lokaler Review

Die konkreten Hinweise zu Italien-Hero und den nummerierten Bildern wurden
verarbeitet: 17 weitere motivbezogene Farbableitungen plus Italien-Hero V5
liegen als **private Prüffassungen** mit Vorher-/Nachher-Ansichten unter
`http://127.0.0.1:8791/`. Die betreffenden Nummern sind 2, 4, 5, 6,
11, 13, 17, 19, 23, 26, 28, 32, 36, 39, 48, 49 und 50. Bei Nr. 48
ist das sichtbare Kennzeichen der neuen Ableitung erneut eng maskiert;
Helmut und Sabine bleiben gemäß aktueller Personenregel sichtbar.
Die Nutzerhinweise zu Nr. 40, 51, 61, 64, 66 und 72 betreffen die
Personenregel; diese Erwachsenenmasken sind aus dem aktiven Review
genommen, ohne die Bilder unnötig neu zu graden.

**Grenzen und offener Auftrag:** Die Masten in Nr. 23 sind in der
Farbprobe noch vorhanden; die beauftragte präzise Retusche und
100%-Nachprüfung fehlen. Nr. 13/19 zeigen bereits im Original
überwiegend trockenbraune Wiesen; eine künstliche Umfärbung in sattes
Grün wäre nicht dokumentarisch. Nr. 48 erhielt keine künstliche
Tiefenunschärfe, da die beantragte Hintergrundberuhigung durch Tonwerte
ohne erfundene Optik möglich ist. Alle 18 Kandidaten benötigen weiterhin
die fachliche Bildabnahme; keine Datei wurde als Webbild eingebaut oder
live veröffentlicht. `python tools/grade-user-feedback-previews.py --verify`
prüft 18/18 Projektkopie-/Ableitungshashes ohne Bildänderung. Der
Design-Guide blieb inhaltlich unverändert.

### Weitere Einzelrückmeldungen am 24. September 2026 – Prüfstand

Für Nr. 2 und 11 wurden aus unveränderten Projektkopien stärkere
Dunst-Proben erzeugt (`user-feedback-haze-v2-2026-09-24`). Für Nr. 26,
28 und 36 liegen Folgeproben unter `user-feedback-followup-2026-09-24`;
Nr. 36 verwendet ausdrücklich die bisherige Farbprobe als Basis.
Nr. 49 wird auf die bisherige Farbprobe zurückgesetzt; die neuere
Fassung gilt als verworfen. Nr. 50 erhielt auf ausdrücklichen Wunsch
einen **nur für dieses Motiv** geltenden Vorschlag mit natürlicher,
bewölkter Lichtstimmung (`photo-50-natural-v3-2026-09-24`); keine neue
globale Farbregel. Die erste Ersatzprobe V2 ist verworfen.

Nr. 23 ist **noch nicht reviewfähig**: Die stärkere Aufhellung legte
sichtbare Schattenartefakte frei, und die erste lokale Mast-Retusche
zeigte bei 100 % erkennbare Spuren. Beide Fassungen sind verworfen;
Original-/Projektkopie und Webdatei blieben unverändert. Die präzise
Retusche und eine artefaktfreie Farbkorrektur bleiben offen. Auch die
übrigen neuen Folgeproben sind nur lokal erstellt und nicht fachlich
freigegeben oder in die Website übernommen. Kein Commit, Push oder
Live-Rollout.

### Bildfreigabe, Ausrüstungsseiten und gestrichene Übersichten (24. September 2026)

Der Nutzer hat die **sichtbaren aktuellen Bildfassungen** in den lokalen
Reviews allgemein freigegeben. Die nicht gezeigten Datenschutzfälle Nr. 63
und 69 sind davon ausgenommen. Bei Nr. 23 bleibt die ausdrücklich gewünschte
Mast-Retusche offen; eine sichtbar fehlerhafte Retusche gilt nicht als
freigegeben. Farbfreigabe bedeutet noch keinen Webeinbau, keine abgeschlossene
Kennzeichen-/Kinderprüfung und keinen Live-Rollout.

Die Aussage „Seitenstruktur weitgehend umgebaut“ war zu pauschal: Scott nutzt
zwar den gemeinsamen Kajak-Hero-Renderer und die zentrale Galerie, der
Seitenkörper besitzt aber noch viele eigene CSS-Regeln und ist **nicht als
vollständig an die Kajak-Referenz angeglichen abgenommen**. Bild-Text- und
Datenabschnitte erhalten jetzt gemeinsame Strukturklassen und ein zentrales
Grundlayout in `detail-editorial.css`; weitere Scott-spezifische Abschnitte
sind noch offen. Eine lokale
Hero-Korrektur in `kajak-hero.css` hebt die zu tief sitzende Scott-Kopie
in eine vergleichbare Bild-Text-Komposition. Ein separater Abgleich bei
Desktop, Tablet und Smartphone hoch/quer meldet 8/8 technisch ohne Fehler;
der visuelle Inhaltsvergleich ist begonnen, nicht abgeschlossen. Die vier
Radprofile ohne freigegebene Fotos und vollständige Erfahrung behalten nach
ausdrücklicher Nutzerentscheidung ihre gekennzeichnete Poster-Ausnahme.

Die alten Übersichts-Inhalte `/ausruestung.html` und `/bike.html` sind auf
ausdrücklichen Nutzerwunsch aus der öffentlichen Seitenauslieferung und
aus der Sitemap entfernt. Verbliebene interne Links in statischen
Fallback-Headern und im Scott-Inhalt sind entfernt. Ihre Adressen leiten
lokal mit 301 zur Startseite; andere nicht vorhandene öffentliche HTML-
Seiten mit 302. Fehlende Assets und API-Routen werden nicht maskiert.
Der frühere Stand „als Seite für Altlinks erreichbar“ ist damit ersetzt.
Die Quell-HTML-Dateien liegen nur noch als historische, nicht ausgelieferte
Projektdateien vor. Der aktuelle öffentliche Bild-Audit betrifft dadurch
11 statt 13 Seiten und meldet 80/80 vorhandene Bildreferenzen mit 80/80
Quellenbelegen. `node --test deploy/public-content.test.mjs` besteht 7/7.
Der vollständige responsive Nachlauf prüfte danach **55/55 Kombinationen**
der 11 aktuellen öffentlichen Seiten in fünf Formaten technisch ohne Fehler.
Der nur lokale Vergleich von Kajak- und Scott-Hero besteht 8/8; der übrige
Scott-Seitenkörper ist weiterhin zur fachlichen Sichtabnahme offen.
Die komplette Node-Testreihe bestand zuvor 27/27, Detailgenerator 7/7,
Reisegenerator 3/3 und Planabgleich 23/23 Quellen. Nach einer unabhängig
neu angelegten Datei `docs/abnahmeberichte/fahrzeug-schiebetuer-korrektur-
2026-09-24.md` meldet der erneute Node-Lauf 26/27: Nur der Planabgleich
scheitert, weil diese Datei noch nicht im Register steht. Der aktuelle
Python-Testlauf besteht 9/9. Der Detailgenerator-Check meldet zudem
eine parallel veränderte `vehicle.html` gegenüber ihrer Vorlage; die
Fahrzeugarbeit wurde nicht überschrieben. Der nach der Strukturänderung
wiederholte responsive Test besteht 55/55 und der strenge Bild-Audit
meldet 80/80 referenzierte Bilder mit Nachweisen. Die aktuelle Vorschau
liegt unter `http://127.0.0.1:8790/`; weder Push noch Live-Rollout erfolgt.

### Scott/Kajak-Sichtabgleich: offene Strukturabweichung

Die Aussage, die Scott-Seite sei durch gemeinsame Klassen bereits wie die
Kajak-Seite gestaltet, war falsch. Scotts alte CSS-Regeln überwogen die
gemeinsamen Klassen; ohne `border-box` war der Hero bei 1440 px 962 statt
760 px hoch. Diese konkrete Abweichung und die mobile Überschreibung sind
lokal korrigiert. Der erweiterte technische Vergleich prüft Desktop,
Tablet, 740 px, Smartphone hoch und quer mit 10/10 Ergebnissen ohne
Hero-/Bild-Text-Layoutfehler. Ein zusätzlicher dauerhafter Inhaltstest
prüft die gemeinsame Detailseiten-Hülle, den zentralen CSS-Bezug und
verhindert die Rückkehr der alten Scott-Grid-Regel; der gezielte Lauf
besteht 8/8. Die Seitenkörper bleiben aber strukturell
verschieden: Scott hat noch nicht Kajaks Intro, Nutzenkarten und
Erfahrungsrhythmus. **Diese Migration und der visuelle Nutzerreview sind
offen; Scott ist nicht als vollständig angeglichen abgenommen.** Der
Design-Guide wurde dafür nicht verändert, Bilder wurden nicht bearbeitet,
und nichts wurde veröffentlicht.

### Scott-Fotokomposition als lokaler Review-Entwurf

Die bisherige Reihe unterschiedlich breit wirkender Fotos wurde konkret
am tatsächlichen Seitenkörper geprüft. Vier redaktionelle Motive standen
links untereinander, das fünfte war anders breit. Lokal nutzen jetzt alle
fünf unveränderten 4:3-Webbilder dieselbe Größe ohne Zuschnitt; ihre
Positionen wechseln links–rechts–links–rechts–links. Auf dem Smartphone
erscheinen sie in einheitlicher Breite vor dem jeweiligen Text. Die
Konfiguration liegt im Detailseiten-Inhalt, das Layout im gemeinsamen
Editorial-Baustein. Gezielte Tests: 9/9 Python, 8/8 öffentlicher
Inhaltstest und 80/80 Bildreferenzen im strengen Audit. Der aktuelle
Browser-Abgleich besteht 10/10 und der Gesamt-Responsive-Nachlauf
55/55 technisch geprüfte Ansichten; die Nutzer-Sichtfreigabe bleibt
für diesen neuen Entwurf offen. Kein Original oder Webbild wurde geändert,
der Design-Guide blieb unverändert; kein Commit oder Live-Rollout.
Der vollständige Node-Lauf steht bei 27/28: Der unabhängige Fahrzeug-
Abnahmebericht fehlt weiterhin im Planregister. Der gesamte
Detailgenerator-Check ist wegen der parallelen Fahrzeugänderung offen;
Scott allein ist 1/1 generatorstabil.

### Scott – aktueller lokaler Stand nach weiterer Nutzerfreigabe

Die separat vom Nutzer freigegebene Fahrzeug-Schiebetürkorrektur ist im
[Abnahmebericht](abnahmeberichte/fahrzeug-schiebetuer-korrektur-2026-09-24.md)
nachgewiesen. Ihre neue V3-Webableitung ist in der Fahrzeuggalerie und in
deren zentraler Galeriequelle eingetragen; Live-Verifikation fehlt noch.

Der Nutzer hat den links–rechts–links–rechts–links-Bildrhythmus freigegeben
und die Kajak-typischen Intro- und Nutzenkarten sowie gezielten Beschnitt
einiger Bilder beauftragt. Intro und drei Karten sind vor der erhaltenen
Langzeiterfahrung zentral eingebaut. Wiesenpause und Leogang-Trail zeigen
nur im Seitenlayout einen 16:10-Ausschnitt; in der Vergrößerung bleiben
die unveränderten 4:3-Webbilder vollständig sichtbar. Die anderen drei
Editorial-Motive bleiben unbeschnitten. Der Guide hält diese einmalige
Motiventscheidung fest. Gezielte lokale Nachweise: 1/1 Generator,
9/9 Python-Tests, 8/8 öffentliche Inhaltstests, 80/80 Bildreferenzen und
10/10 responsive Kajak-/Scott-Vergleiche. Die neue Gesamtkombination ist
visuell noch nicht ausdrücklich abgenommen. Kein Live-Rollout; die
früheren Abschnitte dieses Plans sind historische Zwischenstände.

Die bereits im früheren Kajak-Stand vorhandene doppelte Überschrift in
Intro und Nutzenkarten wurde auf Nutzerhinweis in der zentralen
Inhaltsquelle bereinigt. Der zweite Abschnitt heißt nun „Was ihn für uns
besonders macht.“; Scott und Kajak werden damit auf eine klarere
Abschnittshierarchie geprüft. Lokal umgesetzt, nicht live verifiziert.

Die Nutzerpräzisierung verlangt eine **senkrechte** Fluchtlinie:
Einleitungstext und nachfolgende Editorial-Textspalte beginnen links an
derselben Position. Die gemeinsamen Intro-Raster wurden für Kajak und
Scott an ihre jeweiligen Bild-Text-Raster gekoppelt. Der feste Umbruch
in der ersten Kajak-Überschrift wurde entfernt; mobil erfolgt ein
natürlicher Umbruch. Der erneute Browser-Nachweis folgt; kein Live-Stand.
Der Nachlauf besteht nun 10/10 Kajak-/Scott-Ansichten ohne technischen
Fehler; auf Desktop und Tablet wurden die linken Kanten von Einleitung
und nächster Editorial-Textspalte pixelgenau verglichen. Fahrzeug- und
Reisebericht-Templates haben keinen entsprechenden zweispaltigen
Intro-Baustein und wurden deshalb nicht künstlich in dieses Raster gezwungen.

Der neueste Scott-Nachlauf erweitert alle drei kurzen Nutzenkarten mit
den bereits belegten Erfahrungen, gleicht ihre Typografie zentral an
Kajak an und zeigt zusätzlich die Baumtour im Seitenlayout als breites
16:10-Bild. „Mein Setup“ bleibt als vorhandener Technikabschnitt nach der
Erfahrung bestehen. Bei Wiesenpause, Baumtour und Trail öffnet der Viewer
jeweils das vollständige unveränderte Bild. Lokal umgesetzt; der frische
visuelle Nutzerreview und ein Live-Rollout stehen aus.
Der neueste Format- und Textwunsch ersetzt die vorherige einheitliche
16:10-Probe: Wiesenpause und Trail sind 2:1, Baumtour 3:2, die zwei
detailreichen Motive 4:3. Die Einstiegskarten sollen neugierig auf die
Langzeiterfahrung machen, statt sie vollständig vorwegzunehmen. Der
Vollbild-Viewer zeigt weiterhin jedes Motiv unbeschnitten.
Die Zuordnung folgt der Textmenge: kurze Paare erhalten flache 2:1- oder
3:2-Fenster, längere Passagen zu Fahrwerk und Verschleiß höhere 4:3-Fotos.
Lokal geprüft; Produktion bleibt bis zum Gesamtreview unverändert.
Der verifizierte Quellenstand `9befff7` wurde auf `origin/main` gepusht.
Der Push ist kein Rollout; Sichtabnahme, Release-Prüfung auf dem Host und
Live-Nachweis bleiben getrennt offen.

**Nachlauf Textlinks, 24. September 2026:** Der bisher nur auf Kajak über
ein altes Basis-Stylesheet geerbte Textlink-Stil wurde in
`detail-editorial.css` zentralisiert. Die konkurrierende Scott-Regel in
`equipment-pages.css` entfällt. Der lokale Browservergleich prüft
Einleitungs- und Storylinks auf beiden Seiten und allen fünf Breiten;
Sichtabnahme und Live-Nachweis bleiben offen. Der Design-Guide ist
inhaltlich unverändert, weil hier die freigegebene Kajak-Referenz angewandt
und keine neue Linkgestaltung eingeführt wird.

## Referenzen – keine aktiven Pläne

- [Channel Audit V1](channel-audit-v1.md): Daten, Methodik und Grenzen der ersten Analyse.
- [Plan-Audit](plan-audit-2026-09-22.md): unabhängiger Abgleich aller Plan- und
  Statusdokumente mit Code und Produktionsdatenbestand.
- [Planregister](plan-register.json): maschinenprüfbare Quellen- und
  Pflichtpunktliste für den Gesamtplan.
- [Creator-System](creator-system.md): wiederverwendbare Reise-/Projektcheckliste.
- [Cockpit-Status](vanventure-cockpit-mvp.md): Rollout- und Betriebsnachweis.
- [Technische Cockpit-Spezifikation](vanventure-cockpit-plan.md): Architektur und API-Referenz.
- [SEO-Notizen](seo.md), [Riverstar-Entwurf](riverstar/entwurf.md) und
  [Betriebsanleitung](betrieb.md): fachliche bzw. technische Referenzen.
