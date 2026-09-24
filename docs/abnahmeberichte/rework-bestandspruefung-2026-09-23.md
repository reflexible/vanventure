# Gesamtauftrag: Bestandsprüfung und lokaler Korrekturstand

Stand: 25. September 2026. Branch: `codex/rework-with-project-skills`,
Ausgangspunkt von `main`: `500421e70029881f0d7360fed9f9075adc98d7b8`.
**Aktueller Status: dokumentiert, umgesetzt, lokal geprüft, vom Nutzer
sichtabgenommen und mit Commit `6efef25449e26df5a178b2c450a6382ed3555655`
auf `vanventure.at` veröffentlicht und live geprüft.** Ältere datierte
Abschnitte dieses fortlaufenden Berichts halten Zwischenstände fest; ihre
damaligen „nicht live“-Aussagen sind durch den Abschlussnachweis unten
abgelöst.
Am 24.09.2026 hat der Nutzer für die laufende Gesamtüberarbeitung zusätzlich
festgelegt: alle Änderungen zuerst gemeinsam lokal zeigen und abnehmen lassen;
vorher kein Live-Rollout. Die Trulli-V11-Freigabe ist nur eine Bildentscheidung.
Der frühere [Teilbericht](rework-teilstand-2026-09-23.md) beschreibt nur die
erste Navigationsprüfung; dieser Bericht ersetzt seinen damaligen Umfang und
Status nicht rückwirkend.
Der verbindliche Fortschrittsstatus steht im [Ausbauplan](../ausbauplan.md).

## Geltende Grundlagen

`AGENTS.md`, `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`,
`docs/responsive-templates.md`, der aktuelle `docs/design-guide.md` und
`C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md` wurden gelesen.
Die Nutzer-Ergänzungen aus `docs/vanventure-gesamtauftrag-aktualisiert.md`
sind in die bestehenden maßgeblichen Dokumente übertragen; die angehängte
Fassung ist keine konkurrierende aktive Spezifikation. Der neuere, bereits
veröffentlichte Scott-/Radstand wurde als Ausgangsbasis vom Server gesichert,
weil das unveränderte Git-`main` ihn noch nicht enthält. Es wurde keine neue
Gestaltungsregel oder Galerie-Ausnahme eingeführt. Dies beschreibt die
anfängliche Übernahme; spätere ausdrücklich genehmigte Navigationsregeln
und die eng begrenzte Fahrzeugbild-Ausnahme stehen in den Nachträgen unten.

Geänderte Projektunterlagen: `AGENTS.md` (nur projektlokale Arbeitsregel),
`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` (konsolidierter
Auftrag), `docs/responsive-templates.md` (technische Galerie-Anforderung),
`docs/design-guide.md` (Abgleich mit dem bereits produktiven, neueren
freigegebenen Stand), `docs/ausbauplan.md`, `docs/plan-register.json`
(einheitlicher Status) und `docs/betrieb.md` (lokaler Release-Weg). Die
angehängte Übergabefassung bleibt nur
historischer Beleg.

## Seiten- und Prüfmatrix

Im ersten Bestandslauf wurden alle 13 Seiten lokal bei 1440×900, 1024×768, 768×1024, 844×390,
601×900, 599×900 und 390×844 CSS-Pixeln auf horizontales Überlaufen und
vollständig geladene Hauptbilder geprüft: **91/91 Kombinationen ohne diesen
Fehler**. Diese Zahl bezieht sich auf den damaligen Ausgangszustand; nach
den späteren lokalen Änderungen wurde die vollständige 91er-Matrix noch
nicht wiederholt. Das ist ein technischer Browser-Smoke-Test, keine vollständige
visuelle Abnahme jedes Abschnitts und jeder Interaktion.

| Route | Typ und Grundlage | Lokaler Status | Galerie/Bildstatus | Neuer Live-Stand |
| --- | --- | --- | --- | --- |
| `/` | eigenständige Startseite, gemeinsame Navigation | 7 Größen technisch geprüft; Layout erhalten | Bildfreigaben nicht vollständig auditiert | nicht ausgerollt |
| `/vehicle.html` | Fahrzeugstruktur, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 3 Kacheln; Herkunft/Freigaben nicht vollständig auditiert | nicht ausgerollt |
| `/kajak.html` | Aktivitätsreferenz, gemeinsamer Viewer/Raster | 7 Größen; Viewer geöffnet, geblättert, geschlossen, Fokus zurück | „Gemeinsam am Fluss“ lokal entfernt; 13 Kacheln; die frühere pauschale Freigabeangabe im Plan war widersprüchlich; Einzelableitungen nicht vollständig auditiert | nicht ausgerollt |
| `/norwegen-2018.html` | Reisebericht-Generator, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 6 Kacheln; Bilddatensätze offen | nicht ausgerollt |
| `/sardinien-2019.html` | Reisebericht-Generator, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 6 Kacheln; Bilddatensätze offen | nicht ausgerollt |
| `/italien-2021.html` | Reisebericht-Generator, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 7 Kacheln; Bilddatensätze offen | nicht ausgerollt |
| `/ausruestung.html` | eigenständige Übersicht, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 3 Galerielinks; Bilddatensätze offen | nicht ausgerollt |
| `/bike.html` | Radübersicht, gemeinsamer Viewer/Raster | 7 Größen technisch geprüft | 3 Kacheln; Bilddatensätze offen | nicht ausgerollt |
| `/scott-mountainbike.html` | vorhandener Langzeitbericht, gemeinsamer Viewer/Raster | 7 Größen; Vollbild-Webvariante geprüft | 15 Kacheln; Herkunft/Freigaben für viele WebP offen | nicht ausgerollt |
| `/cube.html` | vorläufiges Radprofil, `noindex` | 7 Größen technisch geprüft | bestehende vorläufige Galerie-Ausnahme | nicht ausgerollt |
| `/trek-gravelbike.html` | vorläufiges Radprofil, `noindex` | 7 Größen technisch geprüft | bestehende vorläufige Galerie-Ausnahme | nicht ausgerollt |
| `/diamant-stadtraeder.html` | vorläufiges Radprofil, `noindex` | 7 Größen technisch geprüft | bestehende vorläufige Galerie-Ausnahme | nicht ausgerollt |
| `/woom-2.html` | vorläufiges Radprofil, `noindex` | 7 Größen technisch geprüft | bestehende vorläufige Galerie-Ausnahme; keine zusätzliche Bildfreigabe behauptet | nicht ausgerollt |

Die acht Seiten mit Galerien beziehen jetzt ein gemeinsames Raster über
`gallery-shared.css` und `photo-viewer.css` sowie den bestehenden gemeinsamen
`photo-viewer.js`. Eine kontrollierte lokale Änderung des zentralen Abstands
von 14 auf 15 Pixel wurde auf **8/8** verwendenden Seiten im Browser gemessen
und danach auf 14 Pixel zurückgenommen und auf der Kajak-Seite bestätigt.
Navigation, Sprachaktion und der sichtbare Footer werden zentral erzeugt.
Die SEO-Erzeugung kennt
jetzt Radübersicht, Scott-Bericht und Ausrüstungsübersicht; Kajak wird beim
erneuten Lauf nicht mehr aus einem älteren Entwurf überschrieben.
Auf der mobilen Fahrzeugansicht wurden Öffnen und Escape-Schließen des Menüs
einschließlich `aria-expanded` und Fokus sowie der Rückwechsel von Englisch
auf Deutsch funktional geprüft; andere Bedienzustände sind noch nicht
vollständig abgenommen.

## Bild- und Originalschutz-Nachweis

Der erste nicht verändernde Dateilauf `node deploy/public-image-audit.mjs` erfasste
**84 eingebundene Dateivarianten** in den 13 Seiten und ihren Styles sowie
**102 Bilddateien** im öffentlichen Asset-Ordner. Alle 84 referenzierten
Varianten waren vorhanden. Für **68/84** lag damals ein Bilddatensatz aus den
vorhandenen Quelllisten, ergänzten Zuordnungen und dem lokalen,
Staging-Manifest vor; **16/84** blieben zunächst ohne solchen
Datensatz. **42** dokumentierte Webdatei-Prüfsummen stimmten, ebenso **50**
direkt lesend verglichene Archivquellen. Die elf ZIP-Mitglieder der
Kajak-Galerie wurden zusätzlich ohne Entpacken gegen ihre dokumentierten
SHA-256-Werte geprüft. Diese
Dateiprüfung ist **keine** Sichtprüfung von Kennzeichen, Kindern oder
Freigaben für alle 84 Varianten.
Die vier Fahrzeug-Webbilder, sechs weitere Camper-/Galeriebilder aus Reise,
Kajak und Radübersicht sowie beide Scott-Reisevarianten wurden zusätzlich
einzeln sichtbar betrachtet (**12/84**). In diesen Ansichten war kein
erkennbares Kennzeichen zu sehen. Dies erweitert keine Bildfreigabe auf
andere Motive oder Ableitungen.

Nachtrag zur Fahrzeug-Herkunft (23./24. September 2026): Der ältere VanVenture-Chat
`01a095ce-2ef7-77e0-a15a-a43881dfa249` nennt drei ursprünglich ausgewählte
Google-Fotos-Aufnahmen: Seitenansicht mit Aufstelldach vom 10.06.2025,
12:48:26; Seitenansicht mit Hund vom 10.06.2025, 12:12:12; Frontansicht vom
11.06.2025, 17:46:18. Diese drei Aufnahmen wurden im angemeldeten Google Fotos
lesend geöffnet und visuell den heutigen Fahrzeug-Webmotiven gegenübergestellt.
Die erste Aufnahme ist der erkennbare Ausgangspunkt für die Seitenansicht und
das Header-Motiv, die zweite für das Hund-Motiv, die dritte für das Front-Motiv.
Der Chat dokumentiert eine Freigabe der damaligen drei bereinigten Varianten,
spätere Änderungswünsche und den ausdrücklichen Hinweis des Nutzers auf einen
falsch dargestellten Fahrzeugteil. Diese historische Freigabe ist keine
pauschale Abnahme aller heute eingebundenen Varianten nach den aktuellen
Regeln. Beim Vergleich sind entfernte Wohnwagen/Hintergrundelemente sowie
veränderte Fahrzeugdetails sichtbar; insbesondere die aktuelle Seitenansicht
ist nicht als originalgetreue Ableitung bestätigt. Der automatische
Google-Fotos-Download wurde durch Chrome mit `ERR_BLOCKED_BY_CLIENT` gesperrt;
die Sperre wurde nicht umgangen. Der Nutzer legte daraufhin die drei
Originaldateien unverändert unter `review/selected-originals/vehicle/` ab.
Sie wurden visuell mit Google Fotos verglichen und lokal mit SHA-256 erfasst.
Die vier Webvarianten erhielten in `docs/vehicle-bildquellen.json` je einen
Bilddatensatz mit Projektkopie, Quell- und Webdatei-Hash sowie offener
Freigabe; der lesende Audit bestätigt **4/4** passende Projektkopie- und
Webdatei-Hashes. Ein unabhängiger Byte-für-Byte-Abgleich der Projektkopien mit
Google Fotos ist weiterhin nicht möglich; zudem fehlen die genauen
historischen Exportparameter. Die Zählung steigt auf **68/84
Bilddatensätze**, nicht auf 68 Bildfreigaben. Weder diese Bildvarianten noch
die Fahrzeugseite sind für einen neuen Release abgenommen.
Die drei Projektkopien sind Git-ignoriert und liegen in einem normalen
Projektverzeichnis ohne Junction oder symbolische Verknüpfung. Ihre lokalen
SHA-256-Prüfsummen waren vor und nach der Sichtprüfung identisch; im
Google-Fotos-Konto wurden keine Änderungen vorgenommen. Angewendete
Prüfregeln: `photo-archive-safety/SKILL.md` SHA-256
`a4bad25975b18702f9961221d8ba22a66a242d2ed95ada432c47e6449c0ebdc1`
und `outdoor-editorial-photo/SKILL.md` SHA-256
`f3a2dac1eaa8cba18346ec0a0ce4172443a977a4ebf391efad961bcfa3e831d6`.
Die drei Originalkopien und die vier Webbilder wurden dabei nicht verändert;
keine neue Bildableitung wurde als freigegeben markiert.
Ein gezielter KI-Entwurf zur Entfernung der bereits beanstandeten Wohnwagen
und des Absperrbands aus der Seitenansicht wurde am 24. September als
**abgelehntes Review-Derivat** unter
`review/vehicle-side-background-ai-rejected-2026-09-24.png` gesichert
(SHA-256 `84483d7bede7bc1b4e1c2659a8958d496e235da699cd7922ff085f4ac3afd7eb`).
Trotz enger Vorgabe interpretierte die KI Fahrzeugkonturen und Details neu;
das Derivat wurde weder in öffentliche Assets übernommen noch freigegeben.
Die Stühle bleiben im Original sichtbar, weil sie Teile des hinteren
Fahrzeugbereichs verdecken und ihre vollständige Entfernung eine erfundene
Rekonstruktion erfordern würde. Für eine wohnwagenfreie, dokumentarisch
treue Fassung ist eine nicht-generative, eng maskierte Retusche oder eine
explizite Entscheidung für die unveränderte Originalszene erforderlich.

Die Chat-Recherche liefert konkrete, aber nicht vollständige Freigabebelege:
Im Task „Warte auf Kajak-Bilderpfade“ (22. September 2026,
`01a0c998-34c2-7f01-bda1-26270a23f717`) wurden die Quellpfade genannt,
die Galerie beauftragt, „Pause am Ufer“ behalten, „Gemeinsam am Fluss“
ausdrücklich entfernt und anschließend zwei ZIP-Bilder mit Kindern von hinten
mit „Ja“ bestätigt. Die dortige Abschlussmeldung nennt zwölf Bilder.
Der spätere Repository-Commit `25ba8fa` nahm trotzdem `kajak-06.jpg`
(„Gemeinsam am Fluss“) wieder auf und erhöhte den Planstatus auf 14
„freigegebene“ Bilder. Das ist keine nachweisbare neue Nutzerfreigabe.
Das Motiv wurde jetzt lokal aus der Galerie entfernt; der Test schützt
diese Entscheidung. Die frühere Zählung „zwölf“ im Chat und die nun 13
übrigen Kacheln sind vor einer Einzelbild-Abnahme weiter abzugleichen.
Im Task „Reisebilder
auswählen und vorlegen“ (`01a0c309-7ce4-7540-ba4e-4441369ca486`)
beauftragte der Nutzer den Einbau der zuvor gezeigten Bilder je Reise und
verlangte für „Abend am Campingtisch“ die Anonymisierung von Adrian.
Im Task „Finde Ausrüstungsseitenbild“
(`01a0cd33-ca53-76b0-90f3-460139ecf6f4`) wurde das konkret gezeigte
Hero für die Ausrüstungsseite beauftragt; `docs/ausruestung-bildquellen.json`
dokumentiert dazu die Quelle. Die Scott-Chatfreigabe betrifft den Text und
die Seitenstruktur, nicht pauschal alle Scott-Fotos.

Diese Aussagen ersetzen kein Dateimapping: Für 16/84 Webvarianten fehlt in
den geprüften Quellen weiterhin die prüfbare Verbindung von Chat-Auswahl,
unveränderter Projektkopie und tatsächlicher Webableitung. Es wird kein
zusätzliches, vom Nutzer bereitzustellendes „Bildregister“ vorausgesetzt;
die vorhandenen Chats und Projektdateien sind die zu prüfenden Belege.

Im aktuellen Zuordnungslauf wurden die 13 verwendeten Kajak-Kacheln anhand
der deterministischen Reihenfolge in `tools/build-kayak-gallery-images.py`
den bestehenden Quellen zugeordnet; `kajak-06.jpg` bleibt als ausgeschlossener
historischer Dateibestand erfasst. Für 13 Reisebericht-Bilder ergab der
lesende Graustufenvergleich mit dem Archiv eine Motivähnlichkeit von
0,9315 bis 0,9964. Die gewählten Archivdateien wurden ausschließlich nach
`review/selected-originals/travel-inline/` kopiert (insgesamt 13 Dateien,
135.170.822 Bytes); Quell- und Kopie-Prüfsummen stimmen. Die Zuordnungen und
Webdatei-Hashes stehen in `docs/reiseberichte-bildquellen.json`. Diese
Motivtreffer belegen noch nicht die komplette Bearbeitungskette oder eine
individuelle Veröffentlichungsfreigabe. Sechs weitere Reisebericht-Bilder
(`kochen-am-zelt`, `bikepause-im-gruenen`, `julie-felsen-meer`,
`rote-felskueste`, `alberobello-trulli`, `treibholz-strand`) bleiben mangels
eindeutigem Archivtreffer offen. Drei Reise-Heros konnten über
`docs/hero-bildquellen.json` und das Header-Logo über seinen bestehenden
Projekt-Quellasset zugeordnet werden. Die drei unveränderten Hero-Kopien
lagen zuvor unter `assets/heroes/originals/` und damit in einem vom
Webserver grundsätzlich auslieferbaren Pfad. Die vier dortigen unveränderten
Dateien (einschließlich einer alternativen Italien-Aufnahme) wurden lokal
prüfsummengleich nach `review/selected-originals/hero-reference/` verschoben;
die Quellenverweise wurden aktualisiert. Der Webserver sperrt jetzt
`assets/heroes/originals/`, `assets/review/` und
`assets/hero-selection/` auch gegen künftige versehentliche Auslieferung;
drei HTTP-Sperrprüfungen bestanden. Die lokale Korrektur ist noch nicht live;
die frühere Server-Auslieferbarkeit bleibt als Schutzvorfall dokumentiert. Die vier
Originalkopien und die ältere lokale Quellenliste waren Git-ignoriert und
laut `git ls-files` nicht Teil der Repository-Historie. Die prüfbare
Quellenliste steht jetzt zusätzlich unter `docs/hero-bildquellen.json` im
Projekt. Keine dieser Zuordnungen ist automatisch eine Bildfreigabe.

Fünf bisher offene Scott-WebP-Motive (`scott-anfang`, `scott-rahmen-detail`,
`scott-seitenprofil`, `scott-wiesenpause`, `scott-wintertour`) fanden im
Handyfoto-Archiv nahezu identische Motivtreffer (Graustufenvergleich
0,9999 bis 1,0000). Die fünf Quellen wurden als unveränderte,
Git-ignorierte Projektkopien unter `review/selected-originals/scott-genius/`
gesichert; Quell-, Kopie- und Webdatei-Hashes stehen in
`docs/scott-bildquellen.json` und stimmen im Prüflauf. Die zehn übrigen
Scott-WebP-Motive bleiben mangels eindeutigen Quelltreffers offen; auch die
fünf Treffer belegen für sich noch keine individuelle Bildfreigabe.

Bei der Sichtung der Startseitenvarianten zeigte das als Open-Graph-/SEO-Bild
referenzierte `assets/hero-norway.jpg` deutliche blaue Bildstörungen im
unteren Bereich. Die unveränderte Archivquelle `P7040212.JPG` wurde über den
EXIF-Aufnahmezeitpunkt und einen Motivvergleich zum intakten sichtbaren
`assets/hero-norway-v1.webp` identifiziert (Ähnlichkeit 0,9932), als
Git-ignorierte Projektkopie gesichert und per SHA-256
`6cc19f239f5c2e87abe9cec0195a7ec74027d3055807e07b1fef06893895e0ec`
gegen das Archiv geprüft. Das defekte JPEG wurde unter `review/defective/`
erhalten und lokal durch eine reine 2000 × 1500-JPEG-Ableitung der
unveränderten Projektkopie ersetzt; die intakte WebP-Variante blieb
unverändert. Die neue Datei wurde sichtbar mit dem WebP verglichen; ihr
SHA-256-Wert ist in `docs/site-assets-bildquellen.json` dokumentiert.
**Lokal korrigiert, nicht live geprüft.**

Für `DSC_0888.JPG` wurde eine unveränderte, Git-ignorierte Projektkopie unter
`review/selected-originals/scott-genius/` angelegt. Archivdatei und Kopie
haben vor/nach dem Kopieren denselben SHA-256-Wert
`47895F5A13D3965665E6451567CB8848A452808795A60B49DAD926EE2D33C40B`.
Die Dokumentation der Scott-Quelle verweist nun auf diese Kopie. Im Archiv
`E:\_fotos_original` wurde nichts bearbeitet oder abgelegt; der zweite
benannte Archivpfad `E:\_fotos\_original` ist hier nicht vorhanden. Die
Arbeitsumgebung begrenzt Schreibzugriffe auf das Projekt. Die lesend geprüfte
Windows-ACL erlaubt `Authentifizierte Benutzer` jedoch `Modify`; eine
dauerhaft schreibgeschützte Archiv-ACL ist somit **nicht** vorhanden. Der
Nutzer hat am 23. September 2026 ausdrücklich projektisoliertes Arbeiten
gewählt; die gemeinsame ACL bleibt unverändert. Die beiden
Original-Staging-Skripte wurden daraufhin so geändert, dass sie vorhandene
unveränderte Projektkopien nicht überschreiben und Quell-/Kopie-Hashes
vergleichen. Ihre Ausführung mit produktiven Fotos steht noch aus.

## Reproduzierbare Prüfungen und Release-Grenze

### Nachtrag vom 24. September: offene 16 Bildzuordnungen und Fahrzeug-Entwurf

Die 16 Lücken sind **Webvarianten**, nicht zwingend 16 verschiedene
Originalaufnahmen: Die zwei Scott-Reise-2026-Varianten zeigen offenbar
dasselbe Motiv in unterschiedlichem Ausschnitt. Zur gemeinsamen Sichtung
liegt ein nummeriertes, ausschließlich lokales Kontaktblatt unter
`review/missing-image-contact-sheet-2026-09-24.jpg`. Seine Nummern bezeichnen:

| Nr. | Webbild ohne belegte Originalzuordnung |
| --- | --- |
| 01–10 | `scott-baumtour-2022-v1.webp`, `scott-fahrwerk-detail-2022-v1.webp`, `scott-italien-bergpause-2021-v1.webp`, `scott-leogang-2020-v1.webp`, `scott-leogang-park-2020-v1.webp`, `scott-leogang-trail-2020-v1.webp`, `scott-reise-2026-gallery-v2.webp`, `scott-reise-2026-v1.webp`, `scott-schlammtour-2024-v1.webp`, `scott-tourenpause-2022-v1.webp` |
| 11–12 | `alberobello-trulli-natur.png`, `treibholz-strand-natur.png` (Italien 2021) |
| 13 | `kochen-am-zelt-natur.png` (Norwegen 2018) |
| 14–16 | `bikepause-im-gruenen-natur.png`, `julie-felsen-meer-natur.png`, `rote-felskueste-natur.png` (Sardinien 2019) |

Eine erneute lesende Suche im Handyfoto-Archiv ergab bei den zehn Scott-Bildern
keinen nahezu identischen Quelltreffer (bester Wert 0,7987 gegenüber 0,9999–1,0000
bei den fünf belegten Scott-Motiven). Bei den sechs Reisefotos ergab die Suche
unter gleichnamigen Archivdateien ebenfalls keinen belastbaren Treffer
(bester Wert 0,5425). Der anschließende vollständige lesende Vergleich der
jeweiligen Reisearchive ergab höchstens 0,8391; der bestplatzierte Treffer
für `rote-felskueste` zeigte bei der Sichtprüfung eine andere Felseninsel
und wurde verworfen. Ähnliche Dateinamen und Motivbeschreibungen wurden
deshalb **nicht** zu Herkunftsnachweisen erklärt. Als nächster Schritt werden
die konkreten Originale anhand der Kontaktblattnummern in Google Fotos oder
dem lokalen Archiv ausgewählt und als unveränderte Projektkopien bereitgestellt;
erst danach folgen Motivvergleich, SHA-256, Derivat- und Freigabeprüfung.

Für das Fahrzeugfoto vom 11. Juni 2025 liegt nun ein rein lokales,
nicht-generatives Prüfderivat mit verpixeltem Van- und Hintergrund-Kennzeichen
unter `review/vehicle-previews/20250611_174618-plates-review.png` und eine
kleine Sichtversion daneben. Der unveränderte Projektquell-Hash war vor und
nach der Bearbeitung identisch
(`bc054d2b26fd9781ab0088fa26d436e485fdcbb0014563c3a2c5435a90338692`).
Das Prüfderivat hat SHA-256
`45ac03c6083368dc72319a2542a747b1e9de36c51e9bf9783c226c1db4d9129f`.
Die Aufnahme bleibt einschließlich Campingplatz-Hintergrund dokumentarisch;
keine öffentliche Datei wurde ersetzt. Die beiden Seitenaufnahmen enthalten
Caravans und Absperrband unmittelbar hinter dem Van. Deren vollständige
Entfernung würde eine großflächig erfundene Baum-/Heckenszene erfordern;
ein enger, originaltreuer nicht-generativer Eingriff ist an diesen Motiven
bislang nicht nachgewiesen. Sie bleiben gesperrt, bis eine passende andere
Originalaufnahme ausgewählt oder die reale Szene ausdrücklich akzeptiert wird.


```powershell
node --test
node deploy/public-image-audit.mjs
node deploy/public-image-audit.mjs --strict
python tools/audit-image-candidates.py --archive
python tools/audit-image-candidates.py --archive-all
& tools/verify-kayak-zip-sources.ps1
git diff --check
```

Diese Prüf- und Kandidatenläufe lesen nur und verändern keine Referenzen;
der Kandidatenlauf setzt lokal Pillow und NumPy voraus und ist kein
Freigabebeleg. Der
strenge Bildlauf muss derzeit wegen fehlender Datensätze fehlschlagen;
dieses Ergebnis darf nicht durch Lockern der Kriterien beseitigt werden.
`node --test` bestand nach den Korrekturen und dem Fahrzeug-Nachtrag mit
**25/25** Tests. `node deploy/public-image-audit.mjs --strict` erfasste 13
Seiten, 84 verwendete Bilddateien, 68 Bilddatensätze und 16 fehlende
Zuordnungen. Die 42 dokumentierten Webdatei-Hashes stimmen; es gibt keine
fehlende Webdatei und keine abweichende Projektkopie. Der strenge Lauf
scheiterte erwartungsgemäß an den 16 fehlenden Zuordnungen (Exit-Code 1),
nicht an einem Hashfehler. `git diff --check` bestand.
Die geänderte Host-Prüfung `deploy/release-check.sh` bestand die lokale
Shell-Syntaxprüfung; sie wurde nicht auf dem Produktionshost ausgeführt.
Der vollständige Release-Check und der Produktions-Rollout sind wegen der
Bild-/Freigabelücke und der nicht vollständig abgeschlossenen visuellen
Abnahme gesperrt. Der öffentliche Git-Remote enthält den neueren Live-Bestand
einschließlich einiger benötigter WebP-Dateien noch nicht; diese dürfen
ohne geklärte Freigaben nicht einfach als neue Repository-Veröffentlichung
hinzugefügt werden. Es gibt **keinen** neuen Live-Commit und **keinen**
Webdienst-Neustart für diesen Auftrag.

Damals offen: Die weiteren Chatbelege und Projektdateien mussten den 16 noch nicht
zugeordneten Varianten einzeln gegenübergestellt werden. Danach Bild-ID,
Quelle, unveränderte Projektkopie, Exportparameter,
Kennzeichen-/Kinderprüfung und konkrete Veröffentlichungsfreigabe je fehlender
Variante vervollständigen; die Projektisolation beim nächsten echten
Bildverarbeitungslauf verifizieren; alle Seiten und Viewer-Zustände
visuell vollständig abnehmen; danach exakten Commit, Release-Check und
Live-Kontrolle gemäß Betriebsverfahren durchführen.

### Nachtrag vom 24. September: acht Scott-Zuordnungen und Trulli-Prüfung

Die vom Nutzer benannten Scott-Projektkopien und der Olympus-Ordner vom
13. Oktober 2020 ergaben acht konkrete Motivtreffer. Die Webvarianten
`scott-baumtour`, `scott-fahrwerk-detail`, `scott-schlammtour` und
`scott-tourenpause` sind lesend ihren bestehenden Projektkopien zugeordnet;
deren genaue Archivherkunft bleibt offen. `scott-leogang`,
`scott-leogang-park`, `scott-leogang-trail` und
`scott-italien-bergpause` wurden mit unveränderten Projektkopien und
identischen Archiv-/Kopie-SHA-256-Werten belegt. Die drei Leogang-Quellen
haben die SHA-256-Werte `3b4fd39b3fb2a8ffe32647bad948ac8cc111dba2f82b6f0209de084f4cde138d`,
`77bb598e4988b9d1f85f70d66555ff3c92accc657a79925194282a3ad719fc02`
und `8d02c439a2f86b796561ee1176ab107c5e9e6acb632073f1639230945939eba9`.
Die intakte Archivquelle `DSC_1712.JPG` hat
`2ef01cb3c121d0c117f2d190b2c8b3a9d2abefaece0673fdfdb9a122319b9758`.
Eine ältere gleichnamige Projektkopie ist unten sichtbar beschädigt und hat
einen anderen Hash; sie wurde nicht überschrieben. Die entsprechende
Webableitung ist auf diese Beschädigung noch gesondert zu prüfen. Das Archiv
wurde vor/nach dem Kopieren nur lesend gehasht, nicht verändert und seine ACL
nicht angepasst. Exportkette und Einzelbildfreigaben bleiben offen.

Der strenge lokale Audit erfasst nun **76/84** Bilddatensätze; **acht**
Webvarianten bleiben ohne Herkunftsdatensatz: die beiden
`scott-reise-2026`-Fassungen sowie sechs Reisebilder. 50 dokumentierte
Web-Hashes und 54 Archiv-Hashes stimmen; es gibt keine Hashabweichung.
Der Audit bleibt wegen der acht Lücken gesperrt. Ein Datensatz bedeutet
weiterhin weder Bildfreigabe noch visuelle Gesamtabnahme.

Die vom Nutzer verlinkten Google-Fotos-Motive identifizieren
`bikepause-im-gruenen` als `DSC_0105_4.JPG` (22. Mai 2019),
`treibholz-strand` als `DSC_0076.JPG` (23. September 2021),
`julie-felsen-meer` als `DSC_0177_2.JPG` (31. Mai 2019) und
`rote-felskueste` als `DSC_0012_3.JPG` (18. Mai 2019). Die exakten
Dateien sind im lesend durchsuchten Archiv nicht nachgewiesen; etwaige
gleichnamige Altdateien sind nicht automatisch dieselben Aufnahmen.

Für `alberobello-trulli-natur.png` zeigt der neue Google-Fotos-Link eine
Sony-Aufnahme vom 21. September 2021, 15:00 Uhr mit Dateinamen
`DSC_0063.JPG`. Der vorgeschlagene Pfad
`E:\_fotos\_original\_eigene_fotos\_olympus_M1\2021\2021-09-21\P9210288.JPG`
existiert auf diesem Rechner nicht; die Datei liegt unter
`E:\_fotos_original\_eigene_fotos\_olympus_M1\2021\2021-09-21\P9210288.JPG`
und blieb vor/nach Sichtkopie SHA-256-gleich
(`871564111f1cad9c34d69074f4e23ed828d6c3a42822b6e33e1a6ea754a6b411`).
Sie zeigt dieselbe Straße, ist aber eine **andere Aufnahme** mit Personen
und Roller. Auch das verlinkte Sony-Foto zeigt Personen; die veröffentlichte
PNG entfernt sie sichtbar und versetzt weitere Bildelemente. Damit ist
dieses Webbild keine bloß behutsam bearbeitete Ableitung nach der geltenden
dokumentarischen Bildregel. Die vier gleichnamigen `DSC_0063`-Archivdateien
stammen laut EXIF aus 2015/2016/2018, nicht aus September 2021. In den
lokalen Chatprotokollen wurde für `P9210288.JPG` außerhalb dieses Auftrags
kein dokumentierter Kopier- oder Verschiebevorgang gefunden; der Git-Verlauf
zeigt nur die erstmalige Aufnahme der Web-PNG in Commit `55429f9`.
Der Befund belegt **keine** spätere Archivverschiebung. Es erfolgt kein
automatischer Austausch des Webbilds und keine Freigabebehauptung; dafür
sind die passende unveränderte Originaldatei und eine Entscheidung über
den Umgang mit der offenbar stärker veränderten Webfassung nötig.

Am 24. September wurde vor weiterer Quellensuche ein aktualisiertes
Kontaktblatt mit genau den acht verbleibenden Varianten erstellt:
`review/missing-image-contact-sheet-rest-8-2026-09-24.jpg`. Es enthält zwei
Scott-Reise-2026-Aufnahmen und sechs Reisebilder aus Italien, Norwegen und
Sardinien. Die frühere 16er-Übersicht bleibt als historischer Vergleich
erhalten.

### Wiederanlauf am 25. September 2026

Der Arbeitsstand bleibt ausschließlich lokal auf Branch
`codex/rework-with-project-skills`; die vielen vorhandenen Änderungen im
Arbeitsverzeichnis dürfen nicht verworfen oder durch ein blindes Update
überschrieben werden. Es wurde für diesen Gesamtauftrag noch nichts
committet, gepusht oder ausgerollt. `node --test` bestand zuletzt mit
25/25 Tests; `node deploy/public-image-audit.mjs --strict` erfasste 76 von
84 Bilddatensätzen und meldete acht fehlende Zuordnungen, ohne Hashabweichung.
Das ist kein Release-Go und keine Einzelbildfreigabe.

#### Fortschritt Bildzuordnung 24. September 2026

Die vom Nutzer bereitgestellten Google-Fotos-Links wurden mit den acht
Kontaktblattvarianten abgeglichen und in den vorhandenen Registern verankert:
`docs/reiseberichte-bildquellen.json` für sechs Reisefotos und
`docs/scott-bildquellen.json` für zwei Scott-Reise-2026-Bilder. Bei den sechs
Reisefotos liegen gleichnamige Projektkandidaten vor. Der reproduzierbare,
lesende 64×64-Graustufenvergleich zur Webableitung ergab: Trulli 0,9539,
Treibholz 0,9350, Kochen 0,9868, Bikepause 0,9950, Julie am Felsen 0,9934
und rote Felsküste 0,9965. Das belegt starke Motivübereinstimmung, aber keine
Bytegleichheit mit Google Fotos. Kandidaten-SHA-256 und Webdatei-SHA-256
stehen je Eintrag in den Registern. Die Source-Bytes konnten nicht aus Google
Fotos bezogen werden: Der normale Download aus der vom Nutzer geöffneten
Fotosansicht endete mit `ERR_BLOCKED_BY_CLIENT`. Die Sperre wurde nicht
umgangen. Bereits vorhandene Originalarchive wurden ausschließlich lesend
abgeglichen; gleichnamige Altdateien sind kein verlässlicher Ersatz für die
verlinkten Google-Fotos-Aufnahmen.

Für die zwei Scott-Reise-2026-Webbilder gibt es drei vom Nutzer verlinkte
Aufnahmen (13:38:24, 13:38:50 und 13:38:53, Galaxy S24) und keine
unveränderten Projektkopien. Die letzte und vorletzte Aufnahme sind sich sehr
ähnlich; die Aufnahme von 13:38:24 zeigt den Van weiter entfernt. Die
Sichtprüfung ordnet `scott-reise-2026-v1.webp` vorläufig dieser Aufnahme zu.
`scott-reise-2026-gallery-v2.webp` passt zu einem der nahen Frames 13:38:50
oder 13:38:53, lässt sich ohne Originalbytes aber nicht eindeutig trennen.
Der Nutzer vermutet eine Bearbeitung der Gallery-Variante; das ist als
offene Prüfung, nicht als feststehender Befund, vermerkt.

Für `alberobello-trulli-natur.png` bestätigt der Projektkandidat
`DSC_0063.JPG` das Motiv. Die Webdatei entfernt jedoch sichtbar Personen und
verändert Bildelemente; sie ist damit nicht als dokumentarisch regelkonform
abgenommen. Keine Webdatei wurde in diesem Lauf ersetzt oder veröffentlicht.
Bei allen acht Varianten bleiben Bearbeitungs-/Exportkette und
Einzelbildfreigabe offen; bei den sechs Reisefotos bleibt außerdem die
Bytegleichheit der vorhandenen Kandidaten zum Google-Fotos-Original offen.

Der Audit wurde so erweitert, dass er dokumentierte Motivzuordnungen von
verifizierten Source-/Projektkopie-Bytes unterscheidet. Lauf
`node deploy/public-image-audit.mjs --strict`: 84/84 Webvarianten vorhanden,
84/84 Registereinträge, keine fehlenden Evidenzeinträge, 58 passende
dokumentierte Web-Hashes, keine dokumentierte Hashabweichung und acht offene
Source-Mapping-Prüfungen. Exit-Code 1 ist deshalb weiterhin korrekt und
blockiert den Release. `node --test` bestand mit 25/25 Tests; `git diff
--check` bestand mit Exit-Code 0 (Git meldet lediglich bestehende
CRLF-Konvertierungshinweise). Der Arbeitsstand bleibt nur lokal; kein Commit,
Push oder Live-Rollout.

Nächster nötiger Schritt für den Byte-Nachweis: Die neun konkret verlinkten
Google-Fotos-Originale (drei Scott-Kandidaten und je ein Reisefoto) müssen
über einen normalen, nicht gesperrten Weg projektlokal bereitgestellt
werden. Sie dürfen die vorhandenen Kandidaten nicht überschreiben; zuerst
separat in `review/selected-originals/google-photos-incoming/` ablegen, dann
Dateiname, EXIF, SHA-256 und visuellen Abgleich prüfen. Dieser private
Projektordner wurde als Eingangsbereich angelegt; er ist kein Web-Asset-Pfad.
Benötigte Dateien: `DSC_0063.JPG`, `DSC_0076.JPG`, `DSC_1504.JPG`,
`DSC_0105_4.JPG`, `DSC_0177_2.JPG`, `DSC_0012_3.JPG`,
`20260809_133853.jpg`, `20260809_133850.jpg` und `20260809_133824.jpg`.
Für die Scott-Aufnahmen ist anschließend die eindeutige 2-zu-3-Zuordnung
zu verifizieren und den nahen Frame für die Gallery-Variante festzustellen.
Danach Originalkopien unverändert sichern, regelkonforme
Derivate und Kennzeichen-/Kinderprüfung verifizieren, nötige Freigaben
prüfen und erst dann den bestehenden Commit-/Push-/Release-/Live-Prüfpfad
ausführen.

### Nachtrag 24. September 2026 – Google-Fotos-Eingang geprüft

Der Nutzer hat alle neun angeforderten Dateien in
`review/selected-originals/google-photos-incoming/` bereitgestellt. Die sechs
Reisedateien tragen dieselben SHA-256-Prüfsummen wie die bereits separat
aufbewahrten Projektkopien: `DSC_0063.JPG`, `DSC_0076.JPG`, `DSC_1504.JPG`,
`DSC_0105_4.JPG`, `DSC_0177_2.JPG` und `DSC_0012_3.JPG`. Die Dateien wurden
nicht überschrieben oder bearbeitet. Die sechs Reisebildregistereinträge
halten Download-Prüfsumme und exakte Übereinstimmung nun fest.

Die drei Scott-Dateien sind als unveränderte Projektkopien im Eingangsordner
erfasst und gehasht: `20260809_133853.jpg`
(ab755ad195bb68fa1c554c0b67fb67e4d784df48bf24a31059026a3fc2c40b9c),
`20260809_133850.jpg`
(78ed1026af307b511020b53f27d16d2e4b30c4bf012342e783c903e43ede65a6) und
`20260809_133824.jpg`
(87e6cdfeee874e8e83eea0cda9ab75fc219394c2e8ef0be4838c20cd141437ad).
Die beiden nahen Frames zeigen den Van von hinten; der dritte zeigt ihn
weiter entfernt. Ein read-only Grayscale-Crop-Abgleich stützt jetzt die
Zuordnung: `scott-reise-2026-gallery-v2.webp` passt am stärksten zu
`20260809_133850.jpg` (0,8980; Kandidat 13:38:53: 0,8516). Das hohe
`scott-reise-2026-v1.webp` passt nahezu exakt zu `20260809_133853.jpg`
(0,9999 gegenüber 0,3482 und 0,2706 für die anderen Kandidaten). Das sind
Motiv-/Crop-Indizien, keine Rekonstruktion der Bearbeitungskette. Beim nahen
Original `133853` ist das Kennzeichen sichtbar; das Original bleibt
unverändert und darf nicht direkt als Webbild veröffentlicht werden.

Die sechs Reise-Source-Byte-Nachweise und die visuelle Scott-Frame-Zuordnung
sind dokumentiert; offen bleiben die Legacy-Bearbeitungsketten und
Veröffentlichungsfreigaben. Insbesondere ist die Trulli-Webdatei
wegen entfernter Personen/Szenenänderungen weiterhin nicht regelkonform
abgenommen. Keine Webableitung wurde geändert; kein Commit, Push oder
Live-Rollout erfolgte. Der Status ist damit: Eingang dokumentiert und
Prüfsummen geprüft, Websitekorrektur nicht umgesetzt, nicht veröffentlicht,
nicht live verifiziert. Der strenge Bildlauf bleibt zu Recht gesperrt.
Der erneut ausgeführte `node deploy/public-image-audit.mjs --strict` findet
84/84 Varianten und Registereinträge, keine fehlenden Dateien/Kopien und
keine Hashabweichung. Die Frame-Zuordnungen sind nun visuell gestützt; der
Lauf ist kein Freigabenachweis und die Bildableitungen bleiben wegen offener
Bearbeitungskette/Freigabe sowie nötiger Kennzeichenprüfung gesperrt.
`git diff --check` besteht; JSON-Register lassen sich fehlerfrei parsen.

### Nachtrag 24. September 2026: Trulli-Prüfvorschau und präzisierte Bildregeln

Auf ausdrücklichen Nutzerwunsch wurden die projektlokale `AGENTS.md`,
`.codex/skills/outdoor-editorial-photo/SKILL.md` und Abschnitt 9 des
konsolidierten Gesamtauftrags ergänzt: Gesichts- und Kennzeichenmasken müssen
eng, weich auslaufend und dennoch bei voller Web-/Viewergröße sicher
unkenntlich sein; grobe Blöcke und unnötige Abdeckung sind ausgeschlossen.
Die bestehende motivbezogene Outdoor-Editorial-Farbgebung wurde in der
Projektanweisung verankert; bestätigte Ablenkungen dürfen nur lokal und nach
100%-Sichtkontrolle entfernt werden. Der Design-Guide bleibt unverändert.

Aus der unveränderten Projektkopie
`reisebilder-originale/italien-2021/DSC_0063.JPG` wurde mit
`tools/make-trulli-editorial-review.py` die private Prüfvorschau
`review/privacy-previews/trulli-editorial-review-v11.jpg` samt Detailansicht
und kleiner Vorschau erstellt. SHA-256 der Projektkopie vor/nach der
Bearbeitung: `bc4136d23206a7f66e01ae8971b6b9ef8097ea7206dbbb66a377485ad6b9c9e7`;
Vorschau SHA-256: `3c30824d9117a5803e10ff56bf8709c882ec02b22cad7e19b513155b1b7372f0`.
V5 wurde nach Nutzerhinweis wegen sichtbarer Leitungsreste und kippender
rechter Seite verworfen; V8 ebenso wegen weiterhin rückwärts kippender und
nach rechts ansteigender Bildhälfte sowie zu schwacher Farbkorrektur. V11
richtet die rechte Bildhälfte zusätzlich lokal und randgebunden auf und
nivelliert ihren Anstieg, ohne schwarzen Rand oder abgeschnittenen Mast.
Zwei bestätigte Stromleitungen sind bis an den Mast retuschiert; zwei
sichtbare Gesichter und das Kennzeichen sind mit präzisen, weich auslaufenden
Unschärfen anonymisiert. Die motivbezogene Outdoor-Editorial-Farbgebung hebt
Mitteltöne und Schatten an, wärmt die Steintöne dezent und schützt helle
Wolken stärker als die verworfene V10-Tonkurve: Anteil vollständig heller
RGB-Pixel (alle Kanäle >=250) Original 1,774 %, V11 2,378 % gegenüber
V10 4,46 %. Gesamtansicht und Detailausschnitte einschließlich Leitungen,
Gesichtern und Kennzeichen wurden geprüft. Dies ist nur eine Prüfvorschau:
keine Webdatei wurde
ersetzt, keine Freigabe unterstellt, kein Commit/Push/Release ausgeführt und
kein Live-Stand verändert. Nutzerabnahme sowie die endgültige Kontrolle der
Retusche als tatsächliche Webableitung bleiben offen.

### Nachtrag 24. September 2026: Trulli V11 freigegeben und lokal eingebunden

Der Nutzer hat die gezeigte V11 mit „viel besser! das nehmen wir“ für das
Trulli-Motiv angenommen. Dies ist eine Bildfreigabe für diese konkrete Fassung,
keine neue allgemeine Gestaltungsregel; der Design-Guide blieb inhaltlich
unverändert. Die vorherige Aussage „Nutzerabnahme offen“ beschreibt den
historischen Zustand vor dieser Rückmeldung und ist hiermit überholt.

Aus der freigegebenen Vollauflösungs-Vorschau (SHA-256
`3c30824d9117a5803e10ff56bf8709c882ec02b22cad7e19b513155b1b7372f0`)
wurde mit `python tools/export-approved-trulli-web.py` eine versionierte
Webableitung erstellt: `assets/reisen/italien-2021/alberobello-trulli-v11.jpg`,
2560×1440 Pixel, JPEG Qualität 91 ohne Chroma-Subsampling, SHA-256
`cc4cb7201b2aeb9343a9059c2b70f0a2e3dfde5eedfc5119098e5b6715567167`.
Die unveränderte Projektkopie hatte vor und nach dem Export SHA-256
`bc4136d23206a7f66e01ae8971b6b9ef8097ea7206dbbb66a377485ad6b9c9e7`.
Das schreibgeschützte Originalarchiv wurde für diesen Export nicht geöffnet
oder beschrieben; die technische Ausgabebegrenzung liegt im Projektskript,
das vorhandene Webausgaben nicht überschreibt und den aufgelösten Zielordner
auf das Projekt begrenzt. Dies ist kein vollständiger Archivverzeichnisvergleich.

`italien-2021.html` und die redaktionelle Inhaltsquelle `travel-stories.json`
verweisen lokal auf die neue Datei; `docs/reiseberichte-bildquellen.json`
enthält den neuen Webhash, Bearbeitungsweg, Skillbezug und die konkrete
Nutzerfreigabe. Die alte PNG-Datei bleibt als historischer, nicht mehr
referenzierter Bestand unangetastet. Die Webableitung wurde in Gesamtansicht
auf Komposition, Farben und Leitungsretusche geprüft; Gesichts- und
Kennzeichenmasken waren in der freigegebenen Vollauflösung anhand der
vergrößerten Ausschnitte geprüft und sind in der verkleinerten Webableitung
weiterhin unkenntlich. Andere Bilder und Seiten wurden bei diesem Bildlauf
nicht erneut manuell gesichtet.

| Nachweis | Ergebnis |
| --- | --- |
| `node deploy/public-image-audit.mjs --strict` | BESTANDEN: 13 Seiten, 84/84 referenzierte Varianten mit Registereintrag, 0 fehlende Dateien, 0 offene Quellprüfungen, 0 Hashabweichungen |
| `node --test` | BESTANDEN: 25/25 Tests |
| `node deploy/plan-consistency.mjs` | BESTANDEN: 23 Planquellen abgedeckt |
| `node deploy/release-check.mjs` | BLOCKIERT: 24 interne Tests bestanden, anschließend kein lokaler Docker-Dienst für den verlangten Compose-/Backup-/Healthcheck erreichbar |
| Live-Rollout und sichtbare Live-Seite | NICHT GEPRÜFT: kein Commit, Push oder Deployment dieses Bildstands |

Der Arbeitsbranch `codex/rework-with-project-skills` lag beim letzten Commit
`500421e70029881f0d7360fed9f9075adc98d7b8` gleichauf mit dem
abgerufenen `origin/main`. Die Arbeitskopie enthält jedoch zahlreiche andere
uncommittete Änderungen. Ein nur teilweise aufgenommener Commit wäre nicht
der hier getestete Quellstand; ein Sammelcommit würde fremde/unfertige
Änderungen ungeprüft einbeziehen. Deshalb bleibt die Veröffentlichung nach
dem vorgeschriebenen Local-first-Release-Verfahren gesperrt. Nächster Schritt:
den vollständigen Arbeitsstand beziehungsweise einen isolierten, exakt
getesteten Release-Commit abgleichen und den erforderlichen Release-Check
in einer geeigneten Umgebung bestehen lassen; erst dann pushen, deployen und
`/healthz`, die Italien-Seite und das sichtbare Bild live prüfen.

### Nachtrag 24. September 2026: gemeinsame Galerien und Lupenhinweis – nur lokal

Der Nutzer hat die vollständige Zentralisierung vor Fortsetzung der
Gesamtüberarbeitung beauftragt und den sichtbaren „Vergrößern“-Text durch
eine kleine Lupe rechts oben ersetzt haben wollen. Dies ist die ausdrückliche
Freigabe einer neuen Stilregel; sie steht im Design-Guide. Die bisherige
Klickfläche bleibt das ganze Foto, die Lupe ist dekorativ. Die zentralen
Dateien `photo-viewer.css` und `photo-viewer.js` setzen dies für Galerie-,
Hero- und Fließtextbilder um, auch wenn ein vorhandener Foto-Link noch keine
eigene Textplakette hat; zugängliche Namen und Tastaturbedienung bleiben
erhalten. Veraltete doppelte Galerie-Kachelregeln wurden aus Kajak-, Reise-
und Bike-CSS entfernt. Ein mobiles Einspalten-Übersteuern der Bike-Galerie
wurde entfernt, damit dort das gemeinsame Zweispalten-Raster gilt.

`site_gallery.py`, `content/public-galleries.json` und
`tools/build-public-galleries.py` bilden die gemeinsame Markup-Quelle für
acht bestehende öffentliche Galerien: `kajak.html`, `vehicle.html`,
`norwegen-2018.html`, `sardinien-2019.html`, `italien-2021.html`, `bike.html`,
`scott-mountainbike.html` und `ausruestung.html`. Die drei Reiseberichte
verwenden weiter `build-travel-pages.py`, jetzt mit dem gemeinsamen
Galerie-Renderer. `site_detail.py`, `content/detail-pages.json` und
`tools/build-detail-pages.py` stellen einen ersten gemeinsamen Aufbau für
Kajak- und Fahrzeug-Hauptbereiche bereit. Diese Struktur ist **teilweise**
zentralisiert: Hero-Inhalt und redaktionelle Abschnitts-Blöcke sind noch
seitenspezifisches HTML. Die Ausrüstung behält vorerst ihren vorhandenen
Figure-/Link-Kacheltyp innerhalb desselben Renderers. Daraus folgt keine
Behauptung, dass sämtliche Seitentemplates schon fertig sind.

Der nicht verändernde Prüflauf `python tools/build-public-galleries.py`
ergab 8/8 Galerien ohne Abweichung; `python tools/build-detail-pages.py`
ergab 2/2 Seitentypen ohne Abweichung. `python tools/test_site_build.py`
prüft zusätzlich, dass eine Änderung am zentralen Renderer alle acht
Galerien erreicht. Im lokalen Browser wurden die acht Galerieseiten bei
390 px Breite auf Existenz der Galerie, unsichtbaren Zoom-Text und
horizontalen Überlauf geprüft: achtmal kein Überlauf, keine sichtbaren alten
Textplaketten; die Bike-Galerie zeigt nach der Korrektur zwei Spalten. Die
Kajakseite wurde bei 390 px auch als Bildschirmansicht mit Lupe geprüft.
Ein separater frischer Browser-Tab meldete 1280 px und vier Kajak-Galerie-
Spalten; die Browser-Voreinstellung für 768/1024 px ließ sich in dieser
Sitzung nicht zuverlässig anwenden. Das ist **kein** vollständiger Tablet-
oder Desktop-Visualtest und wird nicht als solcher ausgegeben.

Abschließender technischer Teilprüflauf dieses Arbeitsstands:
`node --test` 26/26 bestanden;
`node deploy/public-image-audit.mjs --strict` 13 Seiten, 84/84
referenzierte Bildvarianten, keine fehlenden Dateien oder Hashabweichungen
(ausdrücklich kein Bildfreigabenachweis);
`node deploy/plan-consistency.mjs` 23/23 Planquellen;
`git diff --check` ohne Diff-Fehler. Die lokale Kajak-Vorschau unter
`http://127.0.0.1:8788/kajak.html` wurde dem Nutzer geöffnet. Sie ist
kein Live-Nachweis.

### Nachtrag 24. September 2026: Galerie-Review, Navigation und Farbprobe

Auf den konkreten Nutzerhinweis zu klobigen Galerie-Textbalken, zu großen
Galerie-Lupen und unzentrierten Blätterpfeilen ist eine **lokale
Review-Fassung** entstanden. In `gallery-shared.css` stehen die Captions nun
transparent in gedämpftem Grün unter dem Bild; `photo-viewer.css` setzt die
Galerie-Lupe auf 27 px, mobil 25 px. Die Pfeilzeichen in `photo-viewer.js`
sind durch SVG-Chevrons ersetzt; die Schaltfläche zentriert ihr Symbol per
Grid. Die Änderung wirkt über die zentrale Komponente auf alle acht
vorhandenen Galerien. Browserprüfung bei 675 px: auf acht von acht Seiten
Caption-Hintergrund transparent, Caption-Farbe `rgb(82, 100, 92)`, Galerie-
Lupe 27 px, kein horizontaler Überlauf. Auf Kajak zusätzlich bei 390 px:
Galerie-Lupe 25 px, zwei Spalten, sichtbare Bildschirmprüfung. Im Viewer
lagen Bühnen-, Button- und SVG-Mittelpunkt bei der geprüften Breite auf
derselben vertikalen Koordinate (611,5 px); eine vollständige Prüfung aller
Bildformate und Geräte ersetzt dies nicht. Diese Caption-/Pfeil-Gestaltung
wartet auf Nutzer-Review und wurde deshalb noch nicht als verbindliche
Design-Guide-Regel übernommen.

Die Ausrüstungsübersicht ist nach ausdrücklicher Nutzerentscheidung aus
`navigation.js` und von der Startseitenkarte in `index.html` entfernt;
Kajak und Radübersicht blieben zu diesem Zwischenstand direkt erreichbar.
Die Radübersicht wurde im folgenden Nachtrag ebenfalls aus dem Menü entfernt.
Die Ausrüstungs-URL und
ihre Inhalte bleiben aus Gründen bestehender Links vorerst erhalten.
Die Navigationsregel wurde im Design-Guide konsistent angepasst; der
Startseiten-Aufbau und ihre Abschnittsreihenfolge blieben unverändert.
Browserprüfung: weder im sichtbaren gemeinsamen Menü der acht Galerieseiten
noch im Hauptbereich der Startseite führt ein Link auf `ausruestung.html`.

Beim Bild „Eine Bikepause im Grünen“ wurde die unveränderte Projektkopie
`reisebilder-originale/sardinien-2019/DSC_0105_4.JPG` vor und nach der
Verarbeitung mit SHA-256
`a280e72eb35a81c5fec5e7e4c4cca3ba06343c29bcaeae5f6957707888357608`
bestätigt. Das projektlokale, nicht überschreibende Skript
`python tools/grade-bikepause-review.py` erzeugte ausschließlich die private
pixelgetreue Farbprobe
`review/graded-previews/sardinien-bikepause-editorial-v1.jpg` (1448 × 1086;
SHA-256 `74f34aafa3a743e7932b3f63daa73a3b1e87f181663fb2594f4f0a0a2bb16a13`).
Es passt nur Farben und Tonwerte an, nicht Geometrie oder Bildobjekte. Eine
vorherige KI-Probe veränderte dagegen Vordergrunddetails und wurde verworfen;
sie liegt außerhalb des Projekts und ist weder referenziert noch publiziert.
Die vorhandene Webdatei und die Bike-WebP-Ableitung wurden **nicht** ersetzt.
Bildregister und bestehende Web-Hashes bleiben daher unverändert. Diese eine
Farbprobe ist ein Nutzer-Review, keine Abnahme aller verwendeten Fotos oder
eine Publikationsfreigabe; die übrigen Motive sind noch einzeln zu prüfen.
Die Originalarchive wurden in diesem Lauf nicht beschrieben; der technische
Schutz liegt in der auf den privaten Projekt-Reviewordner begrenzten Ausgabe,
dem verweigerten Überschreiben und dem vor/nach dem Lauf bestätigten Hash
der unveränderten Projektkopie. Ein gesamtes Archiv-Verzeichnismanifest wurde
hier nicht erstellt und wird nicht behauptet.

`node --test` bestand mit 26/26, `python tools/build-public-galleries.py`
mit 8/8 unveränderten Galerien, `node deploy/public-image-audit.mjs --strict`
mit 84/84 referenzierten Varianten und ohne Hashabweichung (kein
Gestaltungs-/Freigabenachweis), `node deploy/plan-consistency.mjs` mit
23/23 Planquellen. Kein Commit, Push, Produktions-Release oder Live-Check.

Keine Originalarchive oder Projekt-Originalkopien wurden in diesem Schritt
geschrieben; es wurden keine Bilder neu bearbeitet. Der frühere Trulli-V11-
Hash-/Originalschutz-Nachweis bleibt gültig. Der aktuelle Arbeitsstand ist
lokal umgesetzt und in den genannten Teilbereichen geprüft, aber weder
vollständig visuell abgenommen noch committed, gepusht oder live. Offene
Punkte: weitere Template-Zentralisierung, alle Seiten-/Formatansichten und
Interaktionen, vollständiger Release-Check, lokales Nutzer-Review und danach
erst Release und Live-Prüfung.

### Nachtrag 24. September 2026: direkte Radnavigation und Fotoinventar

Auf ausdrücklichen Nutzerwunsch wurde der zusätzlich eingeführte Punkt
„Alle Räder“ aus der gemeinsamen Navigation entfernt. Die Startseitenkarte
führt jetzt direkt zum Scott-Profil; die übrigen Radprofile sind im Menü
direkt verlinkt. Die vier Vorbereitungsprofile enthalten auch keinen alten
„Alle Räder“-Rücklink mehr. `bike.html` und `ausruestung.html` bleiben als bestehende URLs
erreichbar, erhalten aber keine vorgeschalteten Menüpunkte. Die Regel
„bei vorhandenen Unterseiten keine neue Übersichtsseite, außer ausdrücklich
beauftragt“ ist in `docs/design-guide.md` und `docs/responsive-templates.md`
verankert. `node --test` bestätigt die Navigationsregeln mit 26/26 Tests.

Der reine Leselauf `python tools/grade-photo-inventory.py` zählt 83 in
öffentlichen Seiten referenzierte Fotovarianten sowie ein Logo. Das Skript
`python tools/photo-grade-contact-sheets.py` erzeugte einmalig sechs private
Kontaktbögen in `review/photo-grade-audit/2026-09-24/`; sie sind
Sichtungsmaterial, kein Farb-, Datenschutz- oder Freigabenachweis. Der
strenge Bildquellenlauf meldet 84/84 vorhandene Varianten und unveränderte
belegte Hashes, bestätigt aber keinen einheitlichen fotografischen Look.

Als zweite motivspezifische Probe entstand
`review/graded-previews/italien-hero-editorial-v1.jpg` (2400 × 1800,
SHA-256 `492b0d7b20c15c583393bd564c4c87d37be6979563d19a8a28f266256cb188b4`).
Sie wurde aus der unveränderten Projektkopie
`review/selected-originals/hero-reference/italien-2021/P9200258.JPG`
erzeugt; deren SHA-256 war vor und nach dem Lauf
`a9ce79e7b66a8b4a606b762afceaf10040462ca5cb700798afac079766dd0dff`.
Nur Ton- und Farbwerte sowie die für den vorhandenen Webrahmen nötige
Verkleinerung wurden angewandt, keine Szenenelemente verändert. Der Befehl
`python tools/grade-italy-hero-review.py` verweigert Überschreiben. Die
Bilddatei ist ausschließlich ein Nutzer-Review und nicht eingebunden.

Eine dritte motivspezifische Probe
`review/graded-previews/sardinien-kueste-editorial-v1.jpg` (1448 × 1086,
SHA-256 `4c724ef551165623b8ea0aaf67aa1eee44994d294eb840925326de4cb3dcf0ad`)
stammt aus `review/selected-originals/travel-inline/sardinien-2019/DSC_0291.JPG`.
Die unveränderte Quellkopie hatte vor und nach `python
tools/grade-sardinia-coast-review.py` den SHA-256
`0c23389c067cfe53e1fc8d5cd8fb85657c211d500ff2dad18d920e9a2b739594`.
Der ausschließlich lokale Kandidat wurde auf Inhalt, Bildausschnitt und
zurückhaltendes Tageslicht-Grading visuell gesichtet; keine Veröffentlichung.

Die frühere Aussage, alle Bilder seien bereits bearbeitet, wäre falsch:
außer Bikepause, Italien-Hero und sardischer Küste gibt es noch keine neuen privaten
Farbproben; keine der 83 öffentlichen Fotovarianten wurde durch diese
Bildarbeit ersetzt. Motivweise Farbkorrektur, Quellen-/Variantenabgleich,
Datenschutzprüfung bei Personen und Kennzeichen, Prüfung der älteren
KI-veränderten Fahrzeugbilder sowie Desktop-/Tablet-/Mobilabnahme bleiben
offen. Die drei Quellkopien wurden per SHA-256 geschützt; auf die
Originalarchive wurde in diesem Schritt nicht geschrieben. Es gab keinen
Commit, Push, Release oder Live-Nachweis.

Für die vier Fahrzeug-Webbilder ist eine konkrete Nutzerentscheidung
angefragt: deren frühere KI-Bereinigung entfernte Hintergrundobjekte und
veränderte teilweise Fahrzeugdetails. Eine Gegenüberstellung von
`vehicle-front-camp.png` und der projektlokalen Originalszene mit
anonymisierten Kennzeichen wurde vorgelegt. Entweder werden die vier
Motive originalgetreu neu abgeleitet, oder der Nutzer genehmigt ausdrücklich
die Beibehaltung der historischen Bereinigung als Bildregel-Ausnahme.
Bis zur Antwort werden die Fahrzeugmotive nicht stillschweigend ersetzt.

### Nachtrag 24. September 2026: Bildfreigaben, Detailstrukturen und Viewer

**Freigabe und Geltungsbereich:** Der Nutzer hat die drei privaten
Farbproben für Bikepause, sardische Küste und Italien-Hero mit „gut“
bestätigt. Seine Entscheidung „KI-bereinigten Fahrzeugbildern die darfst so
lassen wie sie sind“ erlaubt genau die vier in
`docs/vehicle-bildquellen.json` belegten bestehenden Webdateien
unverändert zu lassen. `docs/design-guide.md` nennt diese enge Ausnahme;
sie ist keine allgemeine Freigabe neuer KI-Eingriffe. Die alte Angabe
„bis zur Antwort“ im vorigen Nachtrag ist damit überholt. Die fachliche
Freigabe ersetzt weder vollständige Sichtprüfung noch Release-Nachweis.

**Lokale Bildumsetzung:** Identische Bytes der freigegebenen privaten
JPEG-Proben wurden unter vier neuen, versionierten Asset-Pfaden eingebunden:
`assets/reisen/sardinien-2019/bikepause-im-gruenen-editorial-v2.jpg`,
`assets/bikes/sardinien-bikepause-editorial-v2.jpg`,
`assets/reisen/sardinien-2019/sardinien-kueste-editorial-v2.jpg` und
`assets/heroes/italien-2021-tropea-editorial-v2.jpg`. Die Bikepause nutzt
auf Reise- und Radseite dasselbe freigegebene Motiv. Die alten Webdateien
und alle drei unveränderten Projektoriginal-Kopien blieben erhalten.
`travel-stories.json`, `content/public-galleries.json`, die betroffenen
Bildregister und die daraus erzeugten Seiten/SEO-Metadaten sind angepasst.
Die vier neuen Dateien haben die in den jeweiligen Registern verzeichneten
SHA-256-Werte; die Kopien der drei Quellen stimmen weiterhin mit den
vor der Bearbeitung notierten SHA-256-Werten überein. Die Originalarchive
wurden nicht beschrieben. Der Bereich dieser Hashkontrolle umfasst die
drei verwendeten Kopien, nicht das gesamte Archiv.

**Detailseiten:** Vor diesem Nachtrag lag für Kajak und Fahrzeug nur ein
gemeinsamer äußerer Rahmen vor. `site_detail.py` rendert nun zwei
semantisch konfigurierte Hero-Varianten und zehn Abschnittsgrenzen aus
`content/detail-pages.json`. Die bestehenden redaktionellen Texte und das
innere HTML der Abschnitte sind weiterhin seitenspezifischer Inhalt;
damit ist die Seitentyp-Zentralisierung fortgeschritten, aber nicht fertig.
Die einmaligen Migrationen `tools/migrate-detail-sections.py` und
`tools/migrate-detail-heroes.py` verglichen vor dem Schreiben den
vollständigen gerenderten HTML-Text mit dem bisherigen Inhalt. Anschließend
ergab `python tools/build-detail-pages.py` 2/2 Seiten ohne Abweichung;
`python tools/test_site_build.py` bestand 3/3 einschließlich einer
kontrollierten zentralen Änderungsprobe für beide Detailseiten. Die drei
Reiseberichte bleiben im gemeinsamen Generator, die Startseite behält ihre
eigene Struktur.

**Zentraler Viewer-Befund und Korrektur:** In der lokalen Desktop-Vorschau
war „Eine Bikepause im Grünen“ in der Vollansicht oben und unten abgeschnitten,
obwohl das vollständige Webbild geladen wurde. Ursache war die Kombination
aus automatisch bemessenem Bild und begrenzter Grid-Bühne. Die gemeinsame
Regel in `photo-viewer.css` setzt das Bühnenbild nun auf die verfügbare
Breite und Höhe mit `object-fit:contain`. Nach Neuladen zeigte die
Sardinien-Vollansicht bei 1265 × 712 CSS-Pixeln die gesamte Bikepause und
die sardische Küste; die Blätterpfeile standen mittig zur Bühne. Dieselbe
Komponente gilt für alle Galerien; die übrigen Seiten und Formate sind
noch separat visuell zu prüfen. Der Italien-Hero und die unveränderte
Fahrzeug-Hero-Fassung wurden bei derselben lokalen Browsergröße sichtbar
geprüft. Keine Tablet-/Mobil- oder echte Geräteprüfung wird behauptet.

**Prüfstand:** Basis-Commit `500421e70029881f0d7360fed9f9075adc98d7b8`
auf `codex/rework-with-project-skills`, dazu noch nicht committete lokale
Änderungen. `node --test`, `python tools/test_site_build.py`,
`python tools/build-detail-pages.py`, `python tools/build-public-galleries.py`,
`node deploy/public-image-audit.mjs --strict`,
`node deploy/plan-consistency.mjs` und `git diff --check` sind der
reproduzierbare, nicht verändernde Teilprüflauf; die konkreten Ergebnisse
stehen im folgenden Abschlussvermerk dieses Arbeitsstands. Keine
vollständige Abnahme der 13 öffentlichen Seiten oder 83 Fotovarianten,
kein Commit/Push, kein Release und kein Live-Check.

**Abschlussvermerk dieses lokalen Teilstands:** `node --test` 27/27;
`python tools/test_site_build.py` 3/3;
`python tools/build-detail-pages.py` 2/2 unverändert;
`python tools/build-public-galleries.py` 8/8 unverändert;
strenger Bildlauf 13 Seiten, 84/84 referenzierte Bildvarianten und
84/84 Nachweise ohne fehlende oder abweichende Dateien;
Planabgleich 23/23 Quellen; `git diff --check` ohne Diff-Fehler
(nur Zeilenende-Hinweise). Diese Ergebnisse gelten für den lokalen,
noch nicht committeten Arbeitsstand, nicht für Produktion.

**Weiterer Struktur-Schritt vom 24.09.2026:** Die vier zweisprachigen
Abschnittsüberschriften der Fahrzeugseite, einschließlich der optionalen
Hinweiszeile beim Basisprofil, liegen nun als Felder in
`content/detail-pages.json`; ihr Markup entsteht zentral in `site_detail.py`.
`tools/migrate-vehicle-headings.py --write` verglich das vollständige
gerenderte HTML vor und nach der einmaligen Migration und bestätigte
Zeichenidentität. Der anschließende nicht verändernde Lauf
`python tools/build-detail-pages.py` meldete 2/2 Seiten ohne Änderung;
`python tools/test_site_build.py` bestand 4/4 einschließlich Prüfung der
vier gemeinsamen Überschriften. `git diff --check` blieb fehlerfrei.
Der vollständige erneute lokale Prüflauf ergab `node --test` 27/27,
Galerie-Generator 8/8 ohne Änderung, strenger Bildlauf 13 Seiten mit
84/84 referenzierten und belegten Varianten ohne fehlende Quelle oder
Hashabweichung sowie Planabgleich 23/23 Quellen. Diese technischen Ergebnisse
ersetzen weder die visuelle Gesamtprüfung noch die Veröffentlichungsfreigabe.
Die übrigen inneren Abschnitte sind noch nicht vollständig strukturiert;
es handelt sich weiterhin um einen lokalen Teilstand, nicht um eine
vollständige Seitenabnahme oder einen Live-Release.

**Websiteweite Bildarbeit, weitere erste Sichtung am 24.09.2026:**
`python tools/grade-photo-inventory.py` erfasste 84 referenzierte Varianten:
ein Logo, vier vom Nutzer ausdrücklich unverändert belassene Fahrzeugbilder
und 79 andere Fotos. `tools/grade-sitewide-safe-previews.py` erstellte
37 + 8 = 45 private, pixelgetreue erste Farbableitungen aus den registrierten
unveränderten Projektkopien; die Quelle wurde jeweils vor und nach der
Bearbeitung gegen den hinterlegten SHA-256 geprüft. Die Dateien, Hashes,
Profile und gemessenen Tonwerte stehen in den privaten
`review/graded-previews/sitewide-*/manifest.json`-Dateien. Es wurde kein
Archivoriginal und kein öffentliches Webasset beschrieben.

Die Vorher/Nachher-Kontaktbögen der 37 ersten Motive wurden gesichtet.
Bei der zweiten Achtergruppe sind zwei Motive wegen sichtbarer Gesichter
(`italien-2021/gallery/dsc-1719.jpg` mit erkennbarer Kinder-/Erwachsenen-
Situation und `sabine-julie-bergsee-natur.png` mit sichtbarem Profil)
für eine Nutzervorschau gesperrt; der bereinigte Kontaktbogen enthält nur
die übrigen sechs.
Für beide gesperrten Motive wurden intern engere, weichere
Gesichtsmasken als zusätzliche Prüffassungen angelegt, jedoch nach Sichtung
noch nicht als präzise genug für eine Nutzer-/Webvorschau gewertet. Sie
bleiben zurückgehalten; insbesondere das italienische Motiv zeigt ein Kind.
Eine dritte private Gruppe von 29 Farbableitungen wurde danach ebenfalls
direkt aus unveränderten, vor und nach dem Export SHA-256-geprüften
Projektkopien erzeugt. Drei HEIC-Quellen wurden ausschließlich im privaten
Projektbereich zu JPEG-Arbeitskopien konvertiert; die HEIC-Originalkopien
blieben unverändert. Insgesamt liegen damit 74 erste Farbableitungen für
74 Varianten vor; fünf bereits eigens freigegebene Varianten wurden nicht
neu bearbeitet. **Keine** dieser neuen 74 Fassungen ist einzeln für Farbe,
Ausschnitt, Spiegelung oder Privatsphäre abgenommen. Die internen
Kontaktbögen der dritten Gruppe zeigen mehrere erkennbare Gesichter und
Kennzeichen; nur eine eingeschränkte, unverbindliche Teilvorschau von
insgesamt 47 der 74 Prüfbilder auf sieben gefilterten Bögen darf im Chat
gezeigt werden. 27 bleiben bis zur Privatheitsprüfung zurückgehalten.
Die strukturelle
Weiterarbeit an den Seiten wurde in diesem Bildschritt noch nicht begonnen,
weil der Nutzer die Bildvorschau ausdrücklich vorangestellt hat. Status:
lokale, private Vorbereitung; nicht in die Website übernommen, nicht live.

**Unabhängiger Template-Fortschritt trotz offener Bildfreigaben:**
`tools/migrate-detail-cards.py --write` überführte vier wiederholte
Kartengruppen aus Kajak- und Fahrzeugseite in strukturierte Seitendaten.
`site_detail.py` rendert ihre gemeinsamen Artikelgrenzen und Rasterhüllen;
die redaktionellen Karteninhalte bleiben seitenspezifisch. Vorher/Nachher
war das vollständige erzeugte HTML beider Seiten zeichenidentisch.
`python tools/build-detail-pages.py` prüfte 2/2 Seiten ohne Änderung und
`python tools/test_site_build.py` bestand nun 5/5. Die weitere innere
Template-Zerlegung, alle visuellen Größenprüfungen und der Gesamt-Release
bleiben offen. Keine Bildfreigabe wurde durch diese Strukturarbeit ersetzt.

**Reproduzierbarer Teilprüflauf nach beiden Arbeitssträngen:**
`python tools/verify-sitewide-photo-reviews.py` bestätigt 79/79
Nicht-Fahrzeug-Varianten (74 private Farbproben und fünf erhaltene
Einzelfreigaben) sowie unveränderte Projektquellen und intakte
Prüfableitungen. `node --test` 27/27, Detailseiten-Tests 5/5,
Detailseiten-Generator 2/2 ohne Ausgabeänderung, Galerie-Generator 8/8
ohne Ausgabeänderung, strenger Bildlauf 13 Seiten mit 84/84 Bildnachweisen,
Planabgleich 23/23 und `git diff --check` ohne Diff-Fehler.
Das ist kein Nachweis für visuelle Bildqualität oder Privatsphäre; die
Website verwendet die neuen 74 Prüfbilder noch nicht. Keine lokale
Gesamtabnahme, kein Commit/Push/Release und keine Live-Prüfung.

**Nutzer-Review 24. September 2026:** Die 74 technisch erzeugten
Erstfassungen wurden als visuell zu schwach beanstandet. Sie sind damit
ausdrücklich **nicht als fertig bearbeitet oder abgenommen** zu zählen.
Die Kontaktbögen allein erwiesen sich für die Farbentscheidung als
ungeeignet. Die zusätzliche Vorher/Nachher-Probe
`review/graded-previews/black-beauty-shadow-v2-2026-09-24/` wurde direkt
aus der unveränderten Projektkopie `DSC_2199.JPG` (SHA-256
`b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468`)
erzeugt; Vorher-/Nachher-Hash der Quelle stimmt überein. Sie hebt nur
die vorhandene Zeichnung im beschatteten Rad an und reduziert Grün leicht;
auch sie ist lediglich eine private Richtungsprobe. Der erste stärkere
Versuch hob echte Schwarztöne unnatürlich an und wurde verworfen. Keine
dieser neuen Fassungen ist in Webassets eingebunden oder live.

**Weitere Richtungsprobe 24. September:** Auf konkretes Nutzerfeedback zur
zu flachen Wiese und Baumreihe wurde aus derselben unveränderten Projektkopie
eine fünfte Black-Beauty-Schattenprobe erstellt:
`review/graded-previews/black-beauty-shadow-v5-2026-09-24/`.
Schattenzeichnung an Rad/Helm wurde beibehalten; nur reale Grünbereiche
des Hintergrunds wurden selektiv in Farbtiefe und Dichte angehoben. Der
helle Himmel wurde nicht ersetzt oder künstlich gezeichnet. Die Quelle
hatte vor und nach der Bearbeitung den identischen SHA-256
`b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468`;
die neue Ableitung hat SHA-256
`731e66806f9d3e992fb442b579c0effa757294a51e96a4a62b3a433c2fffeb83`.
Nur lokale Prüfvorschau, Nutzerabnahme offen; Design-Guide inhaltlich
unverändert, keine Website- oder Live-Änderung.

**Zweites Nutzerfeedback und lokale Probe:** Auch V5 war in der
Gesamtansicht für den Nutzer nicht unterscheidbar; sie gilt nicht als
abgenommen. V6 unter
`review/graded-previews/black-beauty-shadow-v6-2026-09-24/` stellt
Schattenzeichnung an Rad und Helm der Originalkopie eine merklich dichtere
Wald-/Wiesenfarbigkeit gegenüber. Ein separater vergrößerter
Hintergrundausschnitt dient ausschließlich dem Review und ändert den
Bildzuschnitt der endgültigen Ableitung nicht. Die V6-Datei hat SHA-256
`ed49e0d7faf440a132b5558a2dd50cdca09bf81c984991eb7edf9f22421a8881`;
die Projektquelle blieb vor und nach beiden Vorgängen bei SHA-256
`b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468`.
Auch V6 ist nur eine lokale Prüffassung, nicht freigegeben oder eingebunden.

**Korrektur nach Nutzerhinweis zur linken Bildhälfte:** Die V6-Maske
schloss links und mittig zu viel Wald/Wiese zusammen mit dem Rad von der
Farbkorrektur aus. V7 unter
`review/graded-previews/black-beauty-shadow-v7-2026-09-24/` wendet die
Grünkorrektur unabhängig von der räumlichen Rad-Schattenmaske auf die
tatsächlich grünen Bildteile an. `links-mitte-v6-v7.jpg` vergleicht nur
den vergrößerten Prüfausschnitt; das volle Foto bleibt unbeschnitten.
V7 SHA-256:
`05da00c39696021eb413b3d659eff4437c23f113cf409a8966e5a66a3714bfef`.
Die unveränderte Projektquelle wurde erneut vor/nach der Verarbeitung gegen
`b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468`
geprüft. Zu diesem Zeitpunkt: lokale Vorschau, noch keine Nutzerfreigabe,
keine Web- oder Live-Änderung. Der spätere lokale Webeinbau ist im Nachtrag
unten gesondert belegt.

### Nachtrag: Seitenstruktur parallel zur Bildprüfung

Die vier bereits genehmigten vorläufigen Radprofile verwenden nun ein
einziges Build-Template `render_pending_bike_main` in `site_detail.py` mit
seitenspezifischen deutschen/englischen Inhalten in
`content/pending-bike-pages.json`. `tools/build-detail-pages.py` prüft
damit sechs bestehende Detailseiten: Kajak, Fahrzeug sowie Cube, Trek,
Woom 2 und Diamant. Ergebnis `6 detail pages checked, 0 changed` – der
aktuelle HTML-Ausgabestand ist bytegleich, die Homepage nicht betroffen.
Die Ausnahme ohne Galerie gilt nur für die vier ausdrücklich als
„in Vorbereitung“ markierten Profile, nicht für fertige Radseiten.
`python -m unittest tools.test_site_build` bestand 7/7 einschließlich
Template-Wiederverwendung und unveränderter Radseiten;
`node --test` bestand 27/27; Galerie-Generator 8/8 ohne Abweichung.
`python build-travel-pages.py --check` prüfte den Hauptinhalt von Norwegen,
Sardinien und Italien sowie die Startseitenlinks, ohne Ausgabedateien zu
schreiben; der separat erzeugte SEO-Head ist nicht Teil dieses Vergleichs.
Nur lokale Strukturarbeit, kein Commit, Push oder Live-Release. Die
Foto-Einzelprüfung und umfassende responsive Sichtabnahme bleiben offen.

### Nachtrag: Bild-Triage statt pauschaler Automatikkorrektur

Die 74 verworfenen ersten Farbvarianten entsprechen nur 68 verschiedenen
Projektquellen; Mehrfachverwendungen müssen motivbezogen einmal bearbeitet,
aber an jeder Einbindung geprüft werden. Eine private Einzelprobe des
Norwegen-Fjord-Heros aus
`review/selected-originals/hero-reference/norwegen-2018/P7100548.JPG`
(SHA-256 `eb96075505a1c0e2cc5324932946c38c2828cad4f3fdf348c6ad9c65b8a617d7`)
zeigte beim großen Vorher/Nachher-Vergleich keinen überzeugenden Mehrwert und
wird nicht eingebunden. Die Quelle blieb nach dem Test unverändert. Für das
Scott-Innenraumfoto entstand eine private, sichtbar kühlere V2-Probe aus
`review/selected-originals/scott-genius/DSC_0055_1.JPG` (Quelle unverändert,
SHA-256 `abf545d7893d46e268258b9ddd69031354a11a5e6704022dde7d36fff2f18bc0`;
Prüfdatei `fa3bf2f02e58e6058e6ab84b3e4014c8a6a0b419ccec45bfdab1580579d75946`).
Sie bleibt ohne Einzelabnahme eine private Prüffassung.

**Lokal eingebundenes, vom Nutzer als Richtung bestätigtes Einzelmotiv:**
Die Black-Beauty-Tourenpause V7 wurde direkt aus der unveränderten
`DSC_2199.JPG`-Projektkopie erneut verarbeitet und als
`assets/bikes/scott-tourenpause-2022-editorial-v2.webp` (1800 × 1350,
WebP Qualität 88; SHA-256
`5a898632608330dd509dc65c11e9e3cd6fba8aa83edb907832a814256d656586`)
exportiert. Die vorher/nachher überprüfte Projektkopie blieb bei SHA-256
`b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468`.
`content/public-galleries.json` ist die zentrale Inhaltsquelle; der
Galerie-Generator aktualisierte genau die Scott-Seite. Dieselbe Webdatei
dient Kachel und Vollansicht. Der strenge lokale Bildlauf bestätigte
84/84 referenzierte Varianten und keine fehlenden Web- oder Projektdateien;
8/8 Galerien und 6/6 Detailseiten stimmen mit ihren Generatoren überein.
Archivherkunft dieser Projektkopie ist noch nicht abschließend belegt;
keine pauschale Foto-, Datenschutz- oder Live-Gesamtfreigabe. Die neue
Webdatei ist ausschließlich in der lokalen Vorschau sichtbar.
Der lokale Server `127.0.0.1:8788` lieferte Scott-Seite und neue WebP
jeweils mit HTTP 200; das ausgelieferte HTML verweist auf die neue Datei
(653192 Bytes). Nach dem Einbau bestanden erneut 27/27 Node-Tests.

**Lokale Viewer-Nachprüfung am 24. September:** Die Scott-Seite wurde im
lokalen Browser geöffnet, die neue Kachel „Pause am Wegesrand · 2022“
angeklickt und das Bild in der gemeinsamen Vollansicht sichtbar geprüft.
Der Viewer zeigte das Motiv als Foto 18/21 mit Vor-/Zurück- und
Schließen-Bedienung; Schließen brachte die Seite zurück. Das ist eine
Einzelprüfung dieser Einbindung und keine Gesamtfreigabe der übrigen Fotos.
Der abschließende nicht schreibende Prüflauf bestand mit 27/27 Node- und
7/7 Python-Tests, 6/6 Detailseiten, 8/8 Galerien, drei Reiseberichten
im `--check`-Modus, 84/84 Bilddatensätzen ohne fehlende Datei oder
Hash-Abweichung und 23/23 Planquellen. Die vollständige neue
Responsive-Sichtabnahme aller 13 Seiten sowie die fachliche Freigabe der
weiteren Bildmotive bleiben offen; Live-Status unverändert.

### Nachtrag: Nutzerkritik an Bildern 3/4 und vollständige weitere Bildliste

Der Nutzer bestätigte ausdrücklich die zuvor gezeigten Bilder 1, 2 und 5;
die vier KI-bereinigten Fahrzeugbilder bleiben unverändert. Für das
Italien-Herobild wurde aus der unveränderten Projektkopie `P9200258.JPG`
(SHA-256 `a9ce79e7b66a8b4a606b762afceaf10040462ca5cb700798afac079766dd0dff`)
eine stärker differenzierte, private V4 mit zurückgenommenem Burgweiß und
kräftigerem Grün erstellt (SHA-256
`3431b1e9bfce45bc1e61aa26f9ff7396bfcbd2bca18e8b05b61d78dc64ecba4c`).
Die Trulli-V12 wurde mit zusätzlicher kleiner Drehung im Uhrzeigersinn
aus der unveränderten Projektkopie `DSC_0063.JPG` (SHA-256
`bc4136d23206a7f66e01ae8971b6b9ef8097ea7206dbbb66a377485ad6b9c9e7`)
als private Vorschau erstellt (SHA-256
`67e93208644f05eb5c83a268d61d15fec1ebb41a3084ee3c25298895d9745ab5`).
Beide wurden dem Nutzer gezeigt, aber weder als freigegeben bezeichnet
noch in Webdateien übernommen. Bereits ausgebrannte Quellpixel können
nicht als echte Burgtextur wiederhergestellt werden.

Die 74 zuvor erfassten weiteren Varianten wurden für eine zweite,
motivbezogene private Farbsichtung neu aus ihren gehashten Projektkopien
abgeleitet. Alle 74 Quell- und Derivat-Hashes stimmen im lesenden Lauf
`python tools/verify-sitewide-photo-reviews.py --second-pass` überein.
Davon sind 73 weiterhin aktuelle Webvarianten; eine alte Scott-Variante
ist durch die schon lokal eingebaute, separat geprüfte Pause ersetzt.
Die Website hat damit 79 aktuelle nicht-fahrzeugbezogene Varianten
(73 Kandidaten + sechs lokale Bestandsfassungen). Die öffentliche
Referenz-/Quellenprüfung `node deploy/public-image-audit.mjs --strict`
meldet 13 Seiten, 84/84 referenzierte Bildvarianten, keine fehlende
Datei, keine Hashabweichung und 54 passende Archivquellen-Hashes.
Dies beweist Dateiintegrität und Abdeckung, **nicht** visuelle oder
Datenschutz-Freigabe. Die Sichtprüfung zeigte bei mehreren Motiven
weiterhin zu geringe Verbesserung; Einzelkorrekturen sind offen.

Die private, nur an `127.0.0.1:8789` gebundene Einzelbild-Vorschau
zeigt nach der ausdrücklichen Personenentscheidung vom 24.09.2026
72 der 74 Farbproben in großer Ansicht. Erwachsene werden nicht mehr
vorsorglich anonymisiert; Helmut und Sabine bleiben sichtbar. Die
früheren Erwachsenengesicht-Masken sind nur noch private, nicht aktive
Zwischenergebnisse. Kinder werden anonymisiert, Kennzeichen weiterhin
geschützt. Zwei Motive sind bis zur Kinder-/Altersprüfung gesperrt:
Nr. 63 `reisen/sardinien-2019/gallery/dsc-0280.jpg` und Nr. 69
`riverstar/gallery/kajak-09.jpg`. Zwei andere Motive enthalten nach
Vollbildprüfung nur nicht identifizierende Rückansichten. Beim
Norwegen-Campingmotiv 12 ergaben 100%-Ausschnitte der Fahrzeugbereiche
kein sichtbares Kennzeichen. Die aktiven Kinder-/Kennzeichenableitungen
wurden anhand von 100%-Ausschnitten gesichtet;
das ist noch keine Nutzerfreigabe. Weitere private Maskenversuche wurden bei der 100%-Prüfung
als zu grob oder unvollständig erkannt und **nicht** in die Vorschau oder
Website übernommen. Keine unveränderte Projektkopie und keine
Archivdatei wurde überschrieben. Offen: Farb- und 100%-Datenschutzprüfung
je Motiv, Nutzerreview aller neuen Fassungen, lokale Webeinbindung und
vollständige Sichtabnahme der eingebauten Bilder; danach erst Commit/Push
und Live-Release nach ausdrücklicher lokaler Gesamtsichtung des Nutzers.
Status: teilweise dokumentiert und lokal vorbereitet; **nicht vollständig
umgesetzt, nicht abgenommen, nicht live**.

### Nachtrag: responsiver Gesamt-Prüflauf und visueller Review

Der nicht verändernde lokale Lauf `node tools/audit-responsive-preview.mjs`
erfasste 13 öffentliche Seiten in fünf Formaten. Bei der ersten Sichtung
wurde die gemeinsame Kajak-Hero-Regel von einer älteren Abschnittsregel
übersteuert (mobil abgeschnittener Text); die Korrektur erfolgte zentral
in `kajak-hero.css`. Die älteren, nur für eingehende Links erhaltenen
Übersichtsseiten hatten eine unsichtbare Klickbarriere über ihrem
Hero-Foto; `equipment-pages.css` lässt den Foto-Klick nun durch. Der
erneute Gesamtlauf meldet **65/65 technische Prüfungen bestanden**:
HTTP 200, genau eine H1, keine horizontalen Überläufe, keine fehlenden
geladenen Bilder oder Seiten-JavaScript-Fehler, Foto-Viewer per Klick
öffnen und mit Escape schließen. Das ist ein technischer Browserlauf,
keine individuelle fachliche Freigabe jedes Fotos.

| Seite | Desktop | Tablet hoch/quer | Smartphone hoch/quer | Stand |
|---|---|---|---|---|
| `index.html` | technisch geprüft | technisch geprüft | technisch geprüft | eigener Aufbau bewahrt; Nutzerreview offen |
| `vehicle.html` | technisch geprüft | technisch geprüft | technisch geprüft | Fahrzeug-Template; Nutzerreview offen |
| `kajak.html` | technisch geprüft | technisch geprüft | technisch geprüft | Referenz, Mobil-Hero korrigiert; Nutzerreview offen |
| `norwegen-2018.html` | technisch geprüft | technisch geprüft | technisch geprüft | Reisebericht-Template; Nutzerreview offen |
| `sardinien-2019.html` | technisch geprüft | technisch geprüft | technisch geprüft | Reisebericht-Template; Nutzerreview offen |
| `italien-2021.html` | technisch geprüft | technisch geprüft | technisch geprüft | Reisebericht-Template; Bild 3/4 offen |
| `ausruestung.html` | technisch geprüft | technisch geprüft | technisch geprüft | URL nur für Altlinks; nicht im Menü |
| `bike.html` | technisch geprüft | technisch geprüft | technisch geprüft | URL nur für Altlinks; nicht im Menü |
| `scott-mountainbike.html` | technisch geprüft | technisch geprüft | technisch geprüft | gemeinsames Ausrüstungs-Template; Bildreview offen |
| `cube.html` | technisch geprüft | technisch geprüft | technisch geprüft | als in Vorbereitung markiert |
| `trek-gravelbike.html` | technisch geprüft | technisch geprüft | technisch geprüft | als in Vorbereitung markiert |
| `diamant-stadtraeder.html` | technisch geprüft | technisch geprüft | technisch geprüft | als in Vorbereitung markiert |
| `woom-2.html` | technisch geprüft | technisch geprüft | technisch geprüft | als in Vorbereitung markiert |

Die 65 Seiten-Screenshots, Navigation, drei gemeinsame Galerien und
Foto-Viewer stehen nur lokal unter `127.0.0.1:8790` zur visuellen
Nutzerprüfung. Die Bildproben inklusive Italien-Hero V4 und Trulli V12
stehen unter `127.0.0.1:8789`; zwei Datenschutzfälle bleiben bewusst
ausgespart. Viewer-Pfeile wurden bei 390 × 844 und 1440 × 900 rechnerisch
und per Screenshot mittig zur Bildbühne geprüft. Mobilnavigation öffnet,
zeigt die direkten Rad-Unterseiten ohne „Alle Räder“ und schließt mit
Escape. Nach den CSS-Korrekturen: `node --test` 27/27,
`python -m unittest tools.test_site_build` 8/8,
`python tools/build-detail-pages.py` 7/7 und
`python build-travel-pages.py --check` 3/3 bestanden.

**Grenze:** Die Screenshots bilden nur den vorliegenden lokalen Codezustand
ab; Farbproben sind noch nicht in alle Webdateien übernommen. Die
Bildfreigabe und menschliche Sichtabnahme stehen aus. Weder ein Commit
noch Push/Deployment oder Live-Nachkontrolle erfolgte in dieser Phase.

### Nachtrag: konkrete Fotokorrekturen nach Nutzerfeedback

Aus den unveränderten Projektkopien wurden am 24.09.2026 18 private
Prüffassungen erzeugt: Italien-Hero V5 sowie die nummerierten Motive
2, 4, 5, 6, 11, 13, 17, 19, 23, 26, 28, 32, 36, 39, 48, 49 und 50.
Sie sind im nur lokal gebundenen Vorher-/Nachher-Review
`http://127.0.0.1:8791/` einzeln und in voller Größe prüfbar.
Die motivbezogenen Eingriffe und Quell-/Ableitungshashes stehen in
`review/graded-previews/user-feedback-2026-09-24/manifest.json`.
Der lesende Lauf `python tools/grade-user-feedback-previews.py --verify`
bestätigt 18/18 unveränderte Projektkopie-/Ableitungshashes. Das
Archiv selbst wurde bei diesem Lauf nicht geöffnet oder verändert;
dieser Hash-Abgleich ist **kein** vollständiger Archiv-Verzeichnisnachweis.
Nr. 48 erhielt nach der Farbkorrektur eine zusätzliche enge
Kennzeichenmaske; der 100%-Vorher-/Nachher-Ausschnitt liegt als
`48-feedback-v1-plate-qa.jpg` privat vor. Erwachsene in den
aktiven Prüffassungen bleiben unmaskiert, sofern keine motivbezogene
Anweisung vorliegt. Nr. 40, 51, 61, 64, 66 und 72 wurden wegen der
Personenentscheidung nicht unnötig neu bearbeitet.

Die neue Farbprobe zu Nr. 23 enthält **noch** die vom Nutzer zur
Entfernung bestimmten Masten; präzise Retusche und 100%-Prüfung sind
offen. Nr. 13 und 19 haben in der unveränderten Quelle überwiegend
trockenbraune Wiesen; sie wurden nicht in fiktives Grün umgefärbt.
Bei Nr. 48 wurde die helle Umgebung tonal beruhigt, aber keine
künstliche Tiefenunschärfe hinzugefügt. Bei mehreren Motiven ist
die subjektive Farbwirkung weiterhin vom Nutzer zu beurteilen.
Status: **dokumentiert und lokal als Review-Kandidat umgesetzt,
Hash-Prüfung bestanden; nicht fachlich freigegeben, nicht in die
Website eingebaut, nicht live**. Design-Guide inhaltlich unverändert.

### Folgerunde nach Bildfeedback (24.09.2026)

Private, nicht eingebaute Kandidaten: Nr. 2/11 mit stärkerer
Dunstkorrektur, Nr. 26/28 mit motivbezogener Dunst-/Tonwertkorrektur,
Nr. 36 auf Basis der vom Nutzer bevorzugten bisherigen Farbprobe.
Nr. 49: bisherige Farbprobe wieder als ausgewählte Review-Fassung;
die jüngere Variante ist verworfen. Nr. 50: die als unnatürlich
zurückgewiesene V1 sowie die zu warme Ersatzprobe V2 sind verworfen;
`review/graded-previews/photo-50-natural-v3-2026-09-24/50-natural-v3.jpg`
ist ein enger, bewölkt-natürlicher Einzelmotiv-Vorschlag. Quelle ist die
unveränderte Projektkopie `PA131111.JPG`; deren SHA-256
`77bb598e4988b9d1f85f70d66555ff3c92accc657a79925194282a3ad719fc02`
wurde vor und nach der Ableitung abgeglichen. Keine Gesichtsmaske,
kein geänderter Bildinhalt, keine globale Regeländerung.

Nr. 23 bleibt **offen**. Die verstärkte Vordergrundaufhellung erzeugte
sichtbares Schattenrauschen. Eine ausschließlich lokal ausgeführte
Mast-Retusche wurde im 100%-Ausschnitt geprüft und wegen sichtbarer
Reparaturspuren verworfen. Sie ist nicht im Webbild und nicht als
freigegebene Review-Version enthalten. Sämtliche Folgekandidaten sind
lokale Entwürfe; fachliche Abnahme, Webeinbau, Gesamttests, Push,
Release und Live-Nachprüfung stehen aus. Der frühere Status „23 Masten
noch vorhanden“ bedeutet somit weiterhin keinen erledigten Befund.

### Aktuelle Nutzerentscheidungen und Korrektur der Statusaussage

Am 24.09.2026 hat der Nutzer alle **sichtbar geprüften aktuellen Bildproben**
freigegeben. Nicht sichtbare/gesperrte Motive 63 und 69 sind nicht umfasst.
Für Nr. 23 ist die Mast-Entfernung nun ausdrücklich beauftragt; eine
artefaktfreie, abgenommene Retusche fehlt weiterhin. Keine dieser Freigaben belegt bereits einen Webeinbau
oder Live-Stand.

Die früheren Tabellenzeilen für `bike.html` und `ausruestung.html` beschreiben
den damaligen Zwischenstand und sind **für den aktuellen Sollzustand ersetzt**:
Die beiden Inhaltsseiten werden lokal nicht mehr ausgeliefert, interne
Links wurden aus den aktiven Seitenquellen entfernt, die alten Adressen
antworten mit `301 Location: /`. Nicht vorhandene öffentliche HTML-Routen
antworten mit `302 Location: /`; fehlende Assets weiterhin mit 404.
Die beiden Adressen stehen nicht mehr in der Sitemap. Lokaler HTTP-Check
bestätigte die vier genannten Antworten. Der aktuelle strenge Bild-Audit
erfasste 11 öffentliche Seiten, 80/80 vorhandene Bildreferenzen und
80/80 Quellenbelege ohne fehlende Dateien oder Hashabweichungen.

Auch die frühere Bezeichnung „gemeinsames Ausrüstungs-Template“ für Scott
war als Sichtabnahme zu weitgehend. Kajak und Scott teilen Hero-Renderer und
Galerie; Bild-Text- und Datenabschnitte tragen nun zusätzlich gemeinsame
Strukturklassen und ein zentrales Grundlayout in `detail-editorial.css`.
Scotts weitere Abschnitts-CSS ist noch überwiegend seitenspezifisch.
Die lokal korrigierte Hero-Ausrichtung wurde gegen Kajak in Desktop,
Tablet und Handy hoch/quer mit 8/8 technischen Ergebnissen geprüft.
Die 4 unvollständigen Radprofile behalten laut ausdrücklicher Nutzerentscheidung
ihre vorläufige Poster-Ausnahme. Der nach der Strukturänderung wiederholte responsive Nachlauf meldete
55/55 technisch bestandene Seiten-/Format-Kombinationen für 11 öffentliche
Seiten. Die erneut ausgeführte Kajak-/Scott-Hero-Vergleichsprüfung meldet 8/8 technisch ohne
Fehler; die Screenshots wurden zusätzlich an Hero und Abschnittsanfang
gesichtet. Der übrige Scott-Seitenkörper und die vollständige
Ausrüstungs-Sichtabnahme sind **offen**. Der aktuelle Python-Testlauf besteht
9/9. Der erneute komplette Node-Testlauf hat 26/27 bestanden; der Plan-
Konsistenztest scheitert an der unabhängig neu angelegten, noch nicht im
Planregister erfassten Datei `docs/abnahmeberichte/fahrzeug-schiebetuer-
korrektur-2026-09-24.md`. Der Detailgenerator-Check meldet außerdem
eine unabhängig veränderte `vehicle.html` gegenüber ihrer Vorlage;
diese parallele Fahrzeugänderung wurde hier nicht überschrieben.
Ein Release ist dadurch zusätzlich gesperrt.
Der lokale Seitenreview
unter `http://127.0.0.1:8790/` zeigt nur die 11 aktuell ausgelieferten
Seiten; alte Screenshots der entfernten Übersichtsrouten sind nicht im
aktuellen Review verlinkt. Alles nur lokal; kein Commit, Push oder Live-Rollout.

### Scott/Kajak: Ursache der weiterhin sichtbaren Abweichung

Die Rückmeldung des Nutzers vom 24.09.2026 ist berechtigt: Der vorherige
Nachweis belegte gemeinsame Hero- und Galerie-Erzeugung, aber **keine
vollständige visuelle Template-Übereinstimmung**. Kajak hat nach dem Hero
einen zweispaltigen Intro-Block, eine dreiteilige Nutzen-Kartenreihe und
einen eigenen Erfahrungsblock; Scott beginnt stattdessen direkt mit acht
flachen Langzeitbericht-Abschnitten. Außerdem enthielt `bike-pages.css`
noch stärker gewichtete Scott-Layoutregeln, sodass die neuen gemeinsamen
`detail-editorial.css`-Klassen teilweise nicht wirksam wurden. Der Scott-
Hero war wegen fehlendem `border-box` bei 1440 px 962 statt 760 px hoch.
Der vom Nutzer gerade geöffnete lokale Port `8791` wurde zusätzlich als
**Bild-Korrektur-Review**, nicht als aktuelle Website-Vorschau verifiziert;
die aktuelle Scott-Seite liegt lokal auf Port `8788`.

Lokal korrigiert: gemeinsame Hero-Größenberechnung und Eyebrow-Typografie
in `kajak-hero.css`; konkurrierende Scott-Regeln für Bild-Text-Paare und
Datenraster entfernt; mobile Bild-Text-Anordnung vom gemeinsamen Stylesheet
übernommen. `tools/audit-equipment-reference.mjs` prüft nun neben
Bildladung/Überlauf auch Hero-Höhengleichheit bei Desktop, Tablet und
740 px sowie die tatsächliche Grid-/Mobil-Anordnung: **10/10 ohne diese
technischen Fehler**. Die Screenshots unter
`review/scott-kajak-reference-2026-09-24/` wurden erneut gesichtet.
Der öffentliche Inhaltstest enthält zusätzlich einen dauerhaften
Regressionscheck für gemeinsame Detailseiten-Hülle, Editorial-CSS und
`border-box` sowie gegen einen erneut eingeführten Scott-Grid-Block;
dieser gezielte Testlauf besteht 8/8. Der Browser-Vergleich muss nach
visuellen Änderungen separat gegen die lokale Vorschau ausgeführt werden.
Der Kajak-typische Intro-/Karten-/Erfahrungsrhythmus ist auf Scott **noch
nicht vollständig umgesetzt oder visuell abgenommen**; die Seite darf
daher nicht als fertig angeglichen gelten. Keine Bilddatei wurde dabei
verändert, der Design-Guide blieb inhaltlich unverändert. Nur lokal.

### Scott-Bildrhythmus – lokaler Review-Entwurf

Nach erneuter vollständiger Sichtung zeigte sich ein konkreter Bildfehler:
Vier redaktionelle 4:3-Fotos standen aus historischen CSS-Regeln
untereinander links; ein fünftes Foto hatte eine andere Spaltenbreite und
vor dem Laden keine reservierte Höhe. Das wirkte wie versehentlich
uneinheitlich große Bilder. Der lokale Entwurf rendert dieselben fünf
unveränderten Webdateien jetzt im zentralen `detail-editorial.css` mit
gleicher 4:3-Darstellungsfläche und ohne Zuschnitt. Die Seitenfolge ist
links–rechts–links–rechts–links; mobil bleiben die Bilder einheitlich
breit oberhalb des jeweiligen Textes. Die Seiteninhalte, Galerie und
Viewer wurden nicht ausgetauscht. Die Bildarchive wurden nicht geöffnet
oder beschrieben; keine neue Bilddatei wurde erzeugt.

Die Markierung erfolgt im gemeinsamen `site_detail.py`-Renderer statt in
handgepflegtem Seitenmarkup. Die fünfte Bildstelle ist als
`featured_section_index: 5` in `content/detail-pages.json` konfiguriert.
`tools/build-detail-pages.py --page scott-mountainbike.html` prüft diese
Seite einzeln, ohne die parallel bearbeitete Fahrzeugseite zu
überschreiben. Gezielt bestehen 9/9 Python-Tests, 8/8 öffentliche
Inhaltstests und der strenge Bildreferenz-Audit mit 80/80 Einträgen.
Der vollständige Node-Lauf hat 27/28 Tests bestanden; nur der
Plan-Konsistenztest scheitert weiterhin am separat angelegten
Fahrzeug-Abnahmebericht ohne Registereintrag. Der gesamte
Detailgenerator-Check bleibt wegen der parallel geänderten
`vehicle.html` abweichend; der gezielte Scott-Check ist 1/1 stabil.
Der Browser-Audit kontrolliert alle fünf Bildgrößen und ihre
abwechselnden Positionen: 10/10 Kajak-/Scott-Ansichten ohne technischen
Fehler. Die zusätzliche Responsive-Prüfung erfasste 55/55 öffentliche
Seiten-/Formatkombinationen ohne technischen Fehler. Die visuellen Belege liegen unter
`review/scott-kajak-reference-2026-09-24/`. **Nutzer-Sichtfreigabe und
Live-Rollout stehen aus.** Die übrige Intro-/Karten-Migration bleibt
ebenfalls offen. Der Design-Guide wurde inhaltlich nicht geändert.

### Scott-Freigabe und Nachlauf vom 24. September 2026

Der Nutzer hat die alternierende Bild-Text-Anordnung in der lokalen Vorschau
freigegeben und die anschließende Angleichung der Intro- und Kartenbereiche
ausdrücklich beauftragt. Diese Bereiche sind jetzt aus den zentralen
Detailseiten-Daten aufgebaut und verwenden die Kajak-typischen gemeinsamen
Klassen. Die ursprünglichen Erfahrungsabschnitte und ihre Reihenfolge
bleiben erhalten; Intro und drei Nutzenkarten stehen davor. Im
konfigurierten Bildrhythmus sind nur Wiesenpause und Leogang-Trail im
Seitenlayout als 16:10-Ausschnitt sichtbar. Die fünf unveränderten
Bilddateien und die Galerien bleiben erhalten. Beim Öffnen zeigt der
gemeinsame Viewer das vollständige 4:3-Motiv mit `object-fit: contain`.
Originalarchive und Bildableitungen wurden für diese Strukturarbeit nicht
beschrieben. Die motivbezogene Crop-Entscheidung steht im Design-Guide.

Lokale Nachweise: Scott-Generator 1/1 ohne Abweichung, Python-Tests 9/9,
öffentliche Inhaltstests 8/8, strenger Bildnachweis 80/80 und
Kajak/Scott-Browservergleich 10/10 Ansichten ohne technischen Fehler.
Letzterer prüft zwei Crop-Markierungen, Seitenverhältnisse und die
unbeschnittene Vollansicht auf Desktop und Smartphone. Die Screenshots
liegen nur lokal unter `review/scott-kajak-reference-2026-09-24/`.
Der frühere Eintrag zu fehlenden Intro-/Kartenbereichen beschreibt den
Stand *vor* dieser Umsetzung. Die neue Gesamtkombination aus Intro,
Karten und Zuschnitt wurde dem Nutzer noch nicht erneut visuell
abgenommen. Ein Live-Rollout ist nicht erfolgt.

Beim visuellen Nutzerreview fiel außerdem auf, dass die Kajak-Referenz
bereits seit dem alten Git-Stand dieselbe Überschrift unmittelbar in Intro
und Kartenbereich wiederholte. Die zweite Überschrift ist in der zentralen
Kajak-Inhaltsquelle nun eigenständig („Was ihn für uns besonders macht.“),
ohne Hero, Bild oder Galerie anzutasten. Ein Regressionstest hält die
beiden Abschnittstitel auseinander. Lokal umgesetzt, nicht live verifiziert.
Nach weiterer Nutzerpräzisierung war mit der gezeichneten Linie die
**senkrechte linke Kante** des Einleitungstexts gemeint: Er soll mit der
Textspalte des folgenden Bild-Text-Abschnitts fluchten. Das gemeinsame
Intro-Raster nutzt nun dieselben Spaltenmaße wie der jeweilige Editorial-
Abschnitt von Kajak und Scott. Ein künstlicher Zeilenumbruch im Kajak-
Intro entfällt; mobil bleibt die einspaltige Folge. Der Browserabgleich
prüft die senkrechten Textkanten und die mobile Darstellung.
Er besteht mit 10/10 Ansichten ohne technischen Fehler. Fahrzeug- und
Reiseberichtseiten besitzen keinen analogen zweispaltigen Intro-Baustein;
ihre eigenständige Struktur wurde nicht ohne Anlass umgebaut.

Auf weiteren Nutzerhinweis wurden die drei Scott-Nutzenkarten in der
zentralen Inhaltsquelle deutlich ausführlicher und ohne neue Fakten
formuliert. Die vorhandenen Technikdaten unter „Mein Setup“ waren bereits
vorhanden und wurden nach Klärung nicht verschoben. Die Scott-Kartentitel
und Abschnittslabels beziehen ihre Größen und Zeilenhöhen jetzt aus
demselben zentralen CSS wie die Kajak-Referenz. Zusätzlich ist Baumtour
als drittes Motiv nur in der Seitenansicht 16:10 zugeschnitten. Der
Viewer zeigt weiterhin bei allen drei beschnittenen Kacheln die
vollständige unveränderte Webdatei. Dieser Nachlauf ist lokal; ein
frischer visueller Nutzerreview und Live-Nachweis fehlen.
Nach einer weiteren Präzisierung wurden die Seitenformate bewusst
unterschiedlich: Wiesenpause und Trail 2:1, Baumtour 3:2, Rahmen-Detail
und Schlammtour 4:3. Die drei Karten wurden zugleich als neugierig
machende Einstiege statt vollständiger Kurzberichte formuliert. Der
Vollbild-Viewer bleibt davon unabhängig und zeigt die ganze Webdatei.
Die flachen Ausschnitte stehen bei kürzeren Textpaaren, die höheren
4:3-Fotos bei längeren Abschnitten. Der erneute Kajak-/Scott-Browservergleich
am 24. September bestand 10/10 Ansichten ohne technischen Fehler. Dies ist
ein lokaler Prüfstand; Sichtfreigabe und Live-Nachweis stehen aus.
Der geprüfte Stand `9befff7` wurde auf `origin/main` gepusht. Dies bestätigt
den Repository-Stand, nicht eine Veröffentlichung auf `vanventure.at`.

### Nachlauf: redaktionelle Textlinks der Ausrüstungsseiten

Der Nutzer meldete nach dem ersten Main-Push, dass Scotts Textlinks als
Browser-Standardlinks erscheinen, während Kajak die freigegebene
Unterstreichung und Textfarbe zeigt. Ursache: Kajak erbte `a{color:inherit;
text-underline-offset:5px}` aus `riverstar-entwurf.css`; das gemeinsame
`detail-editorial.css` definierte diese Werte nicht. Scott hatte zusätzlich
eine abweichende alte `.gear-links a`-Regel in `equipment-pages.css`.
Die Werte sind nun in der gemeinsamen Detailseiten-CSS einschließlich
Fokusmarke definiert, und die Scott-Sonderregel ist entfernt. Der
Browserlauf prüft berechnete Stile für Kajak und Scott auf fünf Breiten;
der technische Projekttest verbietet die Rückkehr der Sonderregel.
Ergebnis am geprüften Quellstand: 10/10 Browseransichten, 8/8 öffentliche
Inhaltstests, 9/9 Generator-Tests und 80/80 referenzierte Bildvarianten
ohne fehlenden Nachweis. Commit `eea8261` ist auf `origin/main` gepusht.
Sichtabnahme durch den Nutzer und Live-Verifikation bleiben getrennte Schritte.
Design-Guide inhaltlich unverändert; keine neue Gestaltungsregel.

### Startseite: dritte Setup-Karte und engerer Übergang

| Anforderung | Umsetzung | Lokale Prüfung | Status |
| --- | --- | --- | --- |
| Kajak in „Unser Setup“ als dritte Karte | `index.html`: Riverstar-Karte mit direktem Link zu `kajak.html`, deutsche und englische Beschriftung | Browser 5/5 Startseitenbreiten mit genau drei Karten | lokal und live geprüft; Sichtabnahme erteilt |
| Abstand nach Fahrzeugprofil reduzieren | `styles.css`: nur `vehicle-data.section` unten und `field-kit.section` oben auf `clamp(50px,6vw,90px)` reduziert | Browserlücke Desktop 173 px, Tablet 100–123 px, Mobil 100–101 px; kein horizontaler Überlauf; gesamter Responsive-Lauf 55/55 | lokal und live geprüft |
| Bild- und Originalschutz erhalten | Keine neue oder geänderte Bilddatei; vorhandene referenzierte Webvarianten unverändert | strenger Bildlauf 80/80 Referenzen, 0 fehlende Dateien/Quellprüfungen/Hashabweichungen | geprüft; Originalarchive nicht beschrieben |

Die erneute lokale Vorschau liegt unter `review/responsive-2026-09-24/`
(`index-*-setup-transition.png`). Der frühere Gesamtumfang war vom Nutzer
zur Sichtabnahme freigegeben; die danach beauftragte Startseitenänderung
ist separat vom Nutzer zur Veröffentlichung freigegeben. Der vorbereitete ältere Release wurde
vor jeder Produktionsänderung gestoppt. Design-Guide inhaltlich unverändert.

**Anschluss zum Riverstar-Block:** Der Nutzer verlangte anschließend, dass
„Ein wunderschönes Boot“ direkt an die senkrechten Linien der drei
Setup-Karten anschließt. `styles.css` setzt dafür ausschließlich den
unteren Innenabstand der Startseiten-Setup-Sektion auf null. Der
responsive Browserlauf prüft, dass der Abstand zwischen Kartenraster
und `#riverstar` exakt 0 px beträgt. Lokale Sichtabnahme des
Feinschliffs ist ausdrücklich erteilt; der Live-Nachweis ist erbracht.

### Abschlussnachweis: öffentlicher Website-Rollout am 25. September 2026

| Öffentliche Seite | Status nach Live-Browserlauf |
| --- | --- |
| `/` (Startseite) | 5/5 Breiten bestanden; drei Setup-Karten, Lückenregel und bündiger Riverstar-Übergang geprüft |
| `/vehicle.html` | 5/5 bestanden |
| `/kajak.html` | 5/5 bestanden; gemeinsame Galerie-Lupe und Viewer geprüft |
| `/scott-mountainbike.html` | 5/5 bestanden; gemeinsame Galerie-Lupe und Viewer geprüft |
| `/cube.html` | 5/5 bestanden; freigegebene vorläufige Poster-Ausnahme bleibt |
| `/trek-gravelbike.html` | 5/5 bestanden; freigegebene vorläufige Poster-Ausnahme bleibt |
| `/diamant-stadtraeder.html` | 5/5 bestanden; freigegebene vorläufige Poster-Ausnahme bleibt |
| `/woom-2.html` | 5/5 bestanden; freigegebene vorläufige Poster-Ausnahme bleibt |
| `/norwegen-2018.html` | 5/5 bestanden |
| `/sardinien-2019.html` | 5/5 bestanden |
| `/italien-2021.html` | 5/5 bestanden |

Prüflauf: `VANVENTURE_PREVIEW_ORIGIN=https://vanventure.at` und
`VANVENTURE_AUDIT_OUTPUT=review/responsive-live-2026-09-25` mit
`node tools/audit-responsive-preview.mjs`; 55/55 Ansichten ohne
Seitenfehler, defekte Bilder, Überlauf oder CSP-Fehler. Derselbe Lauf war
zuvor lokal 55/55 erfolgreich. 31/31 Node-Tests und 9/9 Generator-Tests
bestanden. Der strenge Bildlauf prüfte 80/80 referenzierte Webvarianten,
0 fehlende Nachweise, 0 abweichende dokumentierte Web-/Projektkopie-Hashes
und 53 übereinstimmende Archivquell-Hashes. Originalarchive wurden nicht
beschrieben; für diesen Nachlauf wurde nur ein neues SVG-Icon erstellt,
keine Fotodatei verändert. Die vorherigen Bildfreigaben bleiben maßgeblich.

Der erste Umschaltversuch mit `0a1160d` fiel wegen einer im Docker-Image
fehlenden Routendatei aus; der alte Webstand wurde sofort wiederhergestellt
und `/healthz` erneut mit 200 geprüft. `08be9be` behob den Image-Build,
lieferte aber die gemeinsame Lupe aufgrund der produktiven CSP noch nicht
sichtbar aus. Die Lupe liegt deshalb nun als gleichursprüngliche SVG-Datei
unter `assets/icons/zoom.svg`; CSS, Regressionstest und Live-Browserlauf
prüfen diesen Fall. Für den erfolgreichen Endstand wurde ein Archiv von
`6efef25449e26df5a178b2c450a6382ed3555655` mit SHA-256
`daec73a7b645a50c2e5d169f776e7b40cb795a327d221dd2d64a436ee2f8814a`
übertragen und nur daraus das Web-Image gebaut. Produktions-Vorcheck,
geschützter Datenbankdump vor dem erneuten Gesamtrelease, `/healthz` 200,
SVG 200 mit `image/svg+xml` und gesunder Web-Container sind nachgewiesen.
Nur der Webdienst musste wegen des Image-Rebuilds neu starten; PostgreSQL
und Caddy blieben in Betrieb. Die Sitzungen wurden jeweils geschlossen.

`/index.html`, `/bike.html` und `/ausruestung.html` leiten mit 301 auf `/`;
ein unbekannter HTML-Pfad leitet mit 302 auf `/`. Die verbliebenen vier
Poster-Profile warten weiterhin auf freigegebene Fotos und vollständige
Berichte, ohne dass ihr vorläufiger öffentlicher Status verschleiert wird.
Weitere neue Gestaltungsentscheidungen sind für diesen Release nicht offen.
