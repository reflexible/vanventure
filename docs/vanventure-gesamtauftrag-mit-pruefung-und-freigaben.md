# vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben

Stand der Zusammenführung: 23. September 2026
Zielprojekt: `reflexible/vanventure` / vanventure.at
Geltungsbereich der Arbeitsregeln: ausschließlich das VanVenture-Projekt

**Status der Übernahme:** Seit 23. September 2026 ist diese Datei die
maßgebliche, konsolidierte Prozess- und Nachweisspezifikation für VanVenture.
Sie ergänzt die technische [Template-Spezifikation](responsive-templates.md)
und den freigegebenen [Design-Guide](design-guide.md); diese drei Dokumente
regeln jeweils ihren eigenen Bereich und dürfen keine abweichenden
Parallelvorgaben enthalten. Der einzige aktive Aufgabenplan ist der
[zentrale Scrum-Plan](scrum-plan.md); der [Ausbauplan](ausbauplan.md) bleibt
als historischer Detailnachweis erhalten. Der konkrete Übernahme- und Prüfstand steht im
[Abnahmebericht](abnahmeberichte/gesamtauftrag-uebernahme-2026-09-23.md).

Diese Dokumentenübernahme ist keine technische Umsetzung des gesamten
Website-Umbaus, keine vollständige Bildbestandsprüfung und keine Live-Freigabe.
Solche Ergebnisse benötigen jeweils die in diesem Auftrag verlangten Belege.

**Ablage:** Die Template-Spezifikation bleibt unter
`docs/responsive-templates.md`; freigegebene Gestaltungsregeln bleiben unter
`docs/design-guide.md`. Diese Datei bündelt ausschließlich die übergreifenden
Prüf-, Originalschutz-, Freigabe- und Abnahmepflichten und wird aus der
projektlokalen `AGENTS.md` referenziert. Keine widersprüchlichen
Parallelfassungen erstellen und keine bestehenden Regeln ersetzen.

## 1. Auftrag und Ziel

Prüfe und überarbeite die gesamte bestehende öffentliche Website anhand der aktuell gültigen Design-, Template- und Bildregeln. Die Anforderungen gelten auch für alle künftigen Seiten und Bildarbeiten.

Dies ist ein technischer Umsetzungsauftrag einschließlich überprüfbarer Tests und Veröffentlichung nach dem bestehenden Projektablauf – nicht bloß ein Auftrag, Regeln zu speichern, einen Plan anzulegen oder künftige Einhaltung zu versprechen.

Es geht um eine zentrale technische Grundlage und die Umsetzung bereits freigegebener Gestaltung, nicht um ein eigenmächtiges Redesign. Gemeinsame Komponenten, responsive Seitentemplates und seitenspezifische Inhalte sind voneinander zu trennen.

Navigation, Galerien und andere gemeinsame Elemente müssen an einer zentralen Stelle gepflegt werden. Änderungen werden auf allen verwendenden Seiten wirksam, gegebenenfalls nach regulärem Build und Deployment, aber ohne manuelle Einzelpflege jeder Seite.

Die vollständige Bestandsprüfung umfasst insbesondere Startseite, Fahrzeugseiten, Kajak-/Aktivitätsseiten, Bike- und Ausrüstungsseiten, Reiseübersichten und sämtliche Reiseberichte einschließlich vorhandener Sprachversionen und Seitengeneratoren. Unvollständige Inhalte und bereits ausdrücklich genehmigte Ausnahmen bleiben als solche gekennzeichnet; fehlende Inhalte nicht erfinden.

Geschützte Bereiche wie Redaktion, Cockpit und Konto behalten ihre eigenen im Design-Guide beschriebenen Strukturen. Öffentliche Seitentemplates nicht auf diese Bereiche übertragen. Unbeabsichtigte Auswirkungen gemeinsam verwendeter Ressourcen sind auch dort zu prüfen; eine ungefragte Neugestaltung dieser Bereiche gehört nicht zum Auftrag.

## 2. Verbindliche Grundlagen tatsächlich lesen

Vor der Umsetzung den tatsächlichen aktuellen Arbeitsstand prüfen, nicht allein einen möglicherweise älteren GitHub- oder Live-Stand. Lies die geltenden Projektanweisungen, den Design-Guide, die Template-Spezifikation und bei Bildarbeiten den vorgesehenen Bild-Skill einschließlich der notwendigen Referenzen.

Zu prüfen sind insbesondere:

- Die tatsächlich geltenden `AGENTS.md`-Dateien und mögliche abweichende Anweisungsdateien.
- `docs/design-guide.md` und die dort dokumentierten Freigaben und Ausnahmen.
- `docs/responsive-templates.md` beziehungsweise die bereits übernommene maßgebliche Template-Spezifikation.
- Der tatsächliche Bild-Skill. Ist sein konkreter Pfad noch nicht hinterlegt, ermittle den passenden Skill anhand der Inhalte unter `C:\Users\helmu\.codex\skills\`. Der Ordner allein ist noch kein Verweis auf eine bestimmte `SKILL.md`.
- Relevante Architektur-, Betriebs- und Statusunterlagen einschließlich des bestehenden Ausbauplans und Testsetups.

Keinen nicht gefundenen Skill erfinden, keine beliebigen anderen Skills übernehmen und keine Ersatzdatei mit vermeintlich bekanntem Inhalt erzeugen. Nötige Begleitdateien des ausgewählten Skills berücksichtigen. Existiert ein eigener Template- oder Design-Skill, ist auch dessen tatsächlicher Geltungsbereich zu prüfen; ohne solchen Skill gilt die vorhandene Template-Spezifikation.

Zu Beginn den Arbeitsstand und die tatsächlich verwendeten Regeldateien mit Pfad und nachprüfbarem Versionsbezug dokumentieren, beispielsweise Git-Commit oder Dateiprüfsumme. Bei wesentlichen Änderungen der Regeln erneut einlesen. Zwischen geladenen Dateien, angewendeten Vorgaben und tatsächlich geprüften Ergebnissen unterscheiden.

Fehlende Grundlagen und widersprüchliche Vorgaben ausdrücklich benennen. Keine von ungeklärten Vorgaben betroffene Umsetzung beginnen. Davon unabhängige Arbeiten dürfen weitergehen. Ausdrücklich freigegebene Nutzerentscheidungen erhalten; bei unklarer Bedeutung oder Tragweite gezielt rückfragen.

Eine Behauptung, Dateien gelesen zu haben, ist noch kein Konformitätsnachweis. Die Einhaltung muss am Ergebnis und anhand reproduzierbarer Prüfungen überprüfbar sein.

## 3. Seitenbestand und Referenzen sichern

Erstelle eine vollständige Übersicht aller betroffenen Routen und ihrer Sprachversionen. Ordne jeder Seite den Seitentyp, die maßgebliche Quelle, den gegebenenfalls zuständigen Generator, die verwendeten Komponenten und die geltenden Ausnahmen zu.

Sichere vor dem Umbau den freigegebenen Zustand der Kajak-Seite und der Startseite auf Desktop, Tablet und Smartphone als Vergleichsbasis. Referenzen mit Datum, Quellstand, URL beziehungsweise Build und Bildschirmmaßen dokumentieren. Eine ältere oder nicht freigegebene Darstellung nicht stillschweigend zur Referenz erklären.

Prüfe, ob Design-Guide, aktuelle Kajak-Seite und jüngere ausdrücklich freigegebene Entscheidungen miteinander übereinstimmen. Widersprüche nicht durch eigenmächtige Anpassung des Guides oder der Referenzen auflösen.

Vorhandene Statusangaben wie „erledigt“ oder „live geprüft“ sind historische Angaben und ersetzen keine aktuelle Prüfung des tatsächlich bearbeiteten Stands.

## 4. Startseite: eigenes Layout, keine Ausnahme von Bildschutz und Prüfung

Die Startseite bleibt von der Überführung in die Fahrzeug-, Kajak-/Aktivitäts- und Reisebericht-Templates ausgenommen. Ihr eigener Aufbau, ihre Abschnittsreihenfolge, ihre besonderen Funktionen und ihre eigenständige Darstellung auf Desktop, Tablet und Smartphone bleiben erhalten.

Die Startseite darf nicht automatisch dem Aufbau einer Unterseite angeglichen werden. Gemeinsame Komponenten wie Navigation, Footer und Foto-Viewer dürfen zentral genutzt werden, ohne das individuelle Startseitenlayout unbeabsichtigt zu verändern. Notwendige Unterschiede über ausdrücklich definierte Varianten abbilden, nicht durch vollständig kopierte Komponenten.

**Die Ausnahme betrifft ausschließlich die Vereinheitlichung der Seitenstruktur. Die Bildregeln, der Schutz der Originaldateien, die geltenden allgemeinen Designregeln und die Prüfpflicht gelten auch für die Startseite.**

Abweichungen zwischen dem geschützten Startseitenzustand und einer Designvorgabe offenlegen. Keine neue gestalterische Entscheidung ohne Freigabe treffen. Bestehende freigegebene Ausnahmen bewahren.

## 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage

Der freigegebene `docs/design-guide.md` ist verbindlich, keine lose Inspiration. Konkrete Vorgaben für Farben, Typografie, Größen, Abstände, Navigation, Hero-Bereiche, Galerien und Verhalten aus der tatsächlichen aktuellen Fassung ableiten.

Die bestehende freigegebene Kajak-Seite ist die visuelle und funktionale Referenz für passende Unterseiten und gemeinsame Komponenten. Ihr gelungener Look and Feel darf beim technischen Umbau nicht unbeabsichtigt verloren gehen. Kein ungefragter Bildaustausch, keine kreative Neuinterpretation, keine inhaltliche Neufassung.

Andere Seitentypen dürfen einen anderen passenden Inhaltsaufbau haben. Ein Reisebericht muss nicht dieselbe Gesamtstruktur wie eine Kajak-Seite besitzen; gemeinsam verwendete Elemente folgen aber derselben Designsprache und Implementierung.

Gemeinsame Werte wie Farben, Schriftregeln, Abstände, Inhaltsbreiten und responsive Umschaltpunkte zentral abbilden. Keine parallel gepflegten seitenbezogenen Varianten ohne dokumentierten fachlichen Grund.

Widersprüche zwischen Design-Guide, freigegebener Kajak-Referenz und Template-Spezifikation nach dem Freigabeprozess in Abschnitt 11 behandeln. Den Guide niemals nachträglich ändern, um eine unbeauftragte Abweichung zu legitimieren.

## 6. Zentrale Komponenten statt Kopien

Bestehende Implementierungen, Generatoren und gemeinsam genutzte Ressourcen zuerst prüfen und weiterverwenden. Wiederkehrende Elemente in gemeinsame Komponenten, Includes oder Partials überführen, passend zur vorhandenen Architektur.

Das umfasst insbesondere Header und Navigation mit mobilen Menüs und aktiven Zuständen, Footer, Galerien, Foto-Viewer beziehungsweise Lightbox, Buttons, Karten, Infoboxen und wiederkehrende Inhaltsabschnitte.

Je gemeinsamem Baustein gibt es eine maßgebliche Implementierung für Markup, Styles und Verhalten. Seitenspezifische Bilder, Texte, Sprachen, Links und Zustände werden als Daten beziehungsweise klar definierte Konfiguration übergeben.

Bewusst benötigte Varianten dokumentieren. Keine eigenen Galerie-Skripte, Navigationslösungen oder Mobile-CSS-Kopien pro Seite. Automatisch erzeugte gleichartige Ausgabedateien sind zulässig, sofern sie zuverlässig aus zentralen Quellen entstehen und nicht separat von Hand gepflegt werden.

Nicht mehr benötigte Parallelimplementierungen erst nach erfolgreicher Umstellung entfernen. Bestehende Funktionen und redaktionelle Arbeitsabläufe erhalten.

### 6.1 Gemeinsamer Galerie-Standard für den gesamten Seitenbestand

Die freigegebene Kajak-Galerie ist die visuelle und funktionale Referenz. Vor
der Migration sind ihre Desktop-, Tablet- und Mobilansichten samt Foto-Viewer
zu sichern. Danach verwendet auch die Kajak-Seite dieselbe zentrale
Galerie-Komponente wie die anderen Inhaltsseiten: eine Quelle für Markup,
Styles, responsive Regeln und Verhalten. Bilder, Reihenfolge, Alternativtexte,
Bildunterschriften, Überschrift und Einleitung bleiben seitenspezifische Daten.
Strukturelle Varianten benötigen die in Abschnitt 11 verlangte Freigabe.
Generatoren beziehen dieselbe Komponente; generierte Ausgaben sind keine
eigenständig gepflegten Galerien.

Raster, Bildformat, Abstände und Typografie richten sich ausschließlich nach
dem aktuellen Design-Guide. Alle Galerien verwenden den gemeinsamen
Foto-Viewer mit den freigegebenen Funktionen für Vergrößerung, Schließen,
Bildunterschrift, Tastatur, Fokus, Vor/Zurück und vorhandene Touch-Bedienung.
Keine neuen Gesten oder Automatiken aus dieser Aufzählung ableiten. Die
Vollansicht lädt das vollständige freigegebene Webbild; ein abweichender Pfad
darf weder Archivoriginale offenlegen noch Kennzeichenanonymisierung oder
andere Bildfreigaben umgehen. Bildregeln gelten für Kachel, Vollansicht und
responsive Ableitungen gleichermaßen.

Für jede öffentliche Inhaltsunterseite sind Galerie oder ausdrücklich
genehmigte Ausnahme, Inhaltsquelle, Komponente, Viewer, Bildstatus und
Prüfergebnis festzuhalten. Fehlendes Material oder fehlende Freigaben sind
offene Punkte, keine Ausnahme. Auf der Startseite wird keine Galerie
automatisch ergänzt; ihre vorhandenen Bildfunktionen und ihr Aufbau bleiben
geschützt.

Die Abnahme umfasst alle betroffenen Routen in Desktop-, Tablet- und
Mobilbreiten sowie Hoch- und Querformat. In einer isolierten Testumgebung ist
nachzuweisen, dass eine kontrollierte Änderung der zentralen Galeriequelle
alle verwendenden Seiten einschließlich Kajak erreicht. Der Testzustand ist
danach zu entfernen und darf nicht live gehen. Jede Korrektur wird auf allen
Nutzern der Komponente erneut geprüft; Fehler, ungeprüfte Ansichten und
fehlende Freigaben bleiben ausdrücklich sichtbar.

## 7. Wiederverwendbare Seitentemplates und getrennte Inhalte

Gemeinsames Website-Grundlayout und inhaltliche Seitentypen trennen. Mindestens folgende wiederverwendbare Templates vorsehen:

### 7.1 Kajak-/Aktivitäts-/Themenseiten

Aus der bestehenden Kajak-Seite ableiten. Die Kajak-Seite selbst verwendet anschließend dasselbe Template wie vergleichbare weitere Seiten; sie darf keine separat gepflegte Referenzimplementierung neben einem zweiten Template bleiben.

### 7.2 Fahrzeugseiten

Den passenden Aufbau der vorhandenen Fahrzeug-Seite als wiederverwendbares Fahrzeug-Template abbilden. Inhalte, technische Daten und optionale Abschnitte pro Fahrzeug pflegen. Gemeinsame Komponenten und Gestaltung zentral beziehen.

### 7.3 Reiseberichte

Eine wiederverwendbare, ausreichend flexible Berichtsstruktur nutzen. Vorhandene passende Generatoren zuerst prüfen und konsolidieren. Texte, Bilder, Galerien und weitere bereits vorhandene Berichtselemente als Inhalte einbinden.

### 7.4 Weitere Seiten und neue Inhalte

Übersichtsseiten und andere Seitentypen sinnvoll einordnen, ohne sie in unpassende Detailseitenlayouts zu zwingen. Fehlende optionale Abschnitte dürfen keine leeren Blöcke und falschen Abstände erzeugen. Pflichtbestandteile gemäß Guide dürfen nicht eigenmächtig als optional behandelt werden.

Titel, Texte, Bildzuordnungen, Bildunterschriften, Galerien, Daten, Links und SEO-Metadaten von gemeinsamer Darstellung und Funktion trennen. Vorhandene maßgebliche Inhaltsquellen erhalten; kein unnötiges zweites Inhaltssystem einführen.

Neue Seiten entstehen durch Auswahl des Seitentyps und Ergänzung der Inhalte, nicht durch Kopieren einer vollständigen Seite. Unterschiedliche Sprachversionen dürfen keine unabhängig gepflegten Designkopien erfordern.

Bestehende Inhalte, URLs, Anker, Links, Metadaten und Funktionen erhalten. Texte nicht kürzen oder umschreiben, nur damit sie leichter in ein Template passen. Ein grundlegender Framework-Wechsel ist kein automatischer Teil dieses Auftrags.

## 8. Responsive Vereinheitlichung

Alle Komponenten und Templates müssen Desktop, Tablet und Smartphone einschließlich Hoch- und Querformat abdecken. Eine gemeinsame responsive Implementierung verwenden, keine getrennt gepflegten Mobilversionen.

Bestehende unbeabsichtigte mobile Abweichungen untersuchen und beseitigen, nicht in die neuen Templates übernehmen. Besonders Header, Sprachwahl, Menüs, Hero-Darstellung, Seitenränder, Überschriften, Karten, Galerien und Foto-Viewer prüfen.

Bei gleicher Bildschirmbreite, gleicher Variante und gleichem Zustand müssen gemeinsame Komponenten gleich gestaltet sein und gleich funktionieren, abgesehen von ihren tatsächlichen Inhalten. Unterschiedliche Textlängen erfordern keine identische Seitenhöhe.

Responsive Regeln aus dem aktuellen Guide anwenden. Ist die dokumentierte Hero-Grenze von 600 CSS-Pixeln im Hochformat weiterhin gültig, diese sowie die Übergänge unmittelbar darunter und darüber ausdrücklich testen. Keine neue Grenze ungefragt einführen.

Auch kurze und lange Inhalte, fehlende optionale Abschnitte und vorhandene Sprachen testen. Unbeabsichtigtes horizontales Scrollen, abgeschnittene Inhalte, Überlagerungen und unbedienbare Elemente beheben.

## 9. Bild-Skill und gesamter Bildbestand

Der tatsächlich festgelegte Bild-Skill ist bei jeder VanVenture-Aufgabe anzuwenden, in der Bilder ausgewählt, bearbeitet, zugeschnitten, optimiert, exportiert, eingebunden, ersetzt oder veröffentlicht werden. Dies gilt auch, wenn die Bildarbeit nur ein Teil einer größeren Aufgabe ist.

Die Pflicht gilt ausschließlich für VanVenture und für alle dort verwendeten Bilder: Startseite, Fahrzeug-, Kajak-/Aktivitäts-, Bike-, Ausrüstungs- und Reiseseiten; Hero- und Hintergrundbilder, Fließtextbilder, Galerien, Vorschaubilder, Lightbox-Vollansichten und alle responsiven Varianten.

Prüfe den gesamten bestehenden veröffentlichten Bildbestand, nicht nur neu hinzukommende Bilder. Doppelt verwendete identische Dateien können einmal auf Dateiebene geprüft werden; ihre verschiedenen Einbindungen und Darstellungen trotzdem erfassen.

Bereits regelkonforme Bilder unverändert lassen. Kein pauschales erneutes Bearbeiten aller Fotos und keine blind identischen Einstellungen für alle Motive. Motive, Quelle und redaktionelle Funktion berücksichtigen.

Bestehende Regeln zu dokumentarischer Bildtreue, Kennzeichen, Kindern, Freigaben und unveränderten Originalkopien erhalten. Einen möglicherweise allgemeineren Bild-Skill nicht als Erlaubnis verstehen, strengere VanVenture-Vorgaben zu umgehen. Widersprüche vor betroffener Bearbeitung klären.

**Personenregel, ausdrückliche Nutzerentscheidung vom 24.09.2026:** Erkennbare
Kinder auf VanVenture-Bildableitungen anonymisieren. Erwachsene nur dann im
Gesicht anonymisieren, wenn der Nutzer es für das betreffende Motiv
ausdrücklich verlangt; nicht pauschal vorsorglich maskieren. Helmut und Sabine
dürfen erkennbar bleiben. Bei unklarem Alter oder unklarer Freigabe das Motiv
zurückstellen und ausdrücklich nachfragen. Der Kennzeichenschutz bleibt
unverändert; ein trotz Bearbeitung erkennbares Kind darf weiterhin nur nach
ausdrücklicher Auswahl des Fotos veröffentlicht werden. Diese Personenregel
gilt ausschließlich im VanVenture-Projekt.

Wo Anonymisierung nach dieser Regel erforderlich oder ausdrücklich beauftragt
ist, muss sie präzise und zugleich wirksam sein: nur sichtbare
Gesichtsmerkmale beziehungsweise Kennzeicheninhalte mit kleinem Sicherheitsrand
maskieren, weich auslaufende Kanten statt grober Pixelblöcke verwenden und
unnötige Abdeckung von Haaren, Kleidung, Körpern oder Hintergrund vermeiden.
Die Unkenntlichmachung muss in der größten veröffentlichten oder geprüften
Ansicht bestehen bleiben; bei 100 Prozent und in allen Darstellungsgrößen
kontrollieren. Bei vom Nutzer ausdrücklich bestätigter Ablenkungsentfernung nur
das benannte Element auf einer Projektableitung retuschieren und die Stelle bei
100 Prozent auf Nähte, Wiederholungsmuster und unbeabsichtigte Szenenänderungen
prüfen. Die natürliche Outdoor-Editorial-Farbgebung des festgelegten
VanVenture-Fotoskills ist motivbezogen anzuwenden, nicht mit pauschalen
identischen Einstellwerten.

Jede veröffentlichte Bilddatei und jede Ableitung einem stabilen Bilddatensatz zuordnen. Darin mindestens festhalten: interne Bild-ID, verwendete Seiten, Quelle beziehungsweise Herkunft, unveränderte Projektkopie, Prüfsummen, Ableitungen und Exportparameter, verwendeter Skill mit Versionsbezug, tatsächlich vorgenommene Bearbeitung und erforderliche Freigaben.

Die veröffentlichten Dateivarianten prüfen, nicht nur eine lokale Vorschau. Freigaben für bestimmte Bilder oder Veröffentlichungsorte nicht stillschweigend auf andere Motive oder Zusammenhänge ausweiten. Fehlende Herkunft, Originale oder Freigaben als offene Punkte melden; keine Motive eigenmächtig ersetzen.

## 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen

### 10.1 Absolute Arbeitsgrenze

Alle als Originalarchiv bezeichneten Ordner einschließlich Unterverzeichnissen und Dateien bleiben ausschließlich Lesequellen. Das betrifft insbesondere die bereits benannten Pfade `E:\_fotos_original` und `E:\_fotos\_original`, soweit sie im tatsächlichen Arbeitsumfeld vorhanden sind, sowie weitere ausdrücklich benannte Originalarchive.

Dort niemals Bilder, Dateinamen, eingebettete Metadaten oder Verzeichnisstrukturen verändern, verschieben, löschen, überschreiben oder ergänzen. Keine temporären Dateien, Caches, Vorschauen, Manifeste, Exportdateien oder Tool-Nebendateien in einem Originalarchiv ablegen. Keine Verarbeitung „in place“.

Vor Bearbeitung eine unveränderte Projektkopie erstellen und ihre Übereinstimmung mit der Quelle prüfen. Diese unveränderte Kopie erhalten; alle bearbeiteten Dateien daraus in einem gesonderten Ausgabeordner erzeugen. Unanonymisierte Projektoriginale und Archivinformationen nicht automatisch in öffentliche Webordner oder öffentlich zugängliche Repositories übernehmen.

### 10.2 Technische Schutzmaßnahmen

Schutz nicht allein durch eine Chat-Anweisung absichern. Den Bildverarbeitungsprozess nach Möglichkeit so ausführen, dass Originalarchive technisch nur lesbar oder nach dem Kopieren nicht mehr zugänglich sind, etwa über eine entsprechend eingeschränkte Ausführungsumgebung.

Tatsächliche Lese- und Schreibgrenzen prüfen und dokumentieren. Ausschließlich ausdrücklich erlaubte Projekt-Ausgabeordner als Schreibziele zulassen. Pfade vor Nutzung auflösen und auch Verknüpfungen, symbolische Links beziehungsweise Junctions berücksichtigen, damit kein scheinbarer Projektpfad tatsächlich in ein Originalarchiv führt.

Keine systemweiten Berechtigungen, Eigentümer oder Archiv-ACLs ohne ausdrückliche Freigabe verändern. Die Schutzfunktion in einer isolierten Testumgebung mit Testdateien prüfen, niemals durch einen versuchsweisen Schreibzugriff auf echte Originale. Vorhandene Rechte und Einbindungen am Originalarchiv nur lesend kontrollieren.

Kann die technische Trennung nicht eingerichtet oder geprüft werden, die Einschränkung ausdrücklich melden. Keine automatisierte Bearbeitung beginnen, deren Ausführung Originale beschreiben könnte. Andere sichere Arbeiten dürfen fortgesetzt werden.

### 10.3 Vorher-/Nachher-Nachweis

Vor der ersten Verarbeitung für alle im Auftrag verwendeten Originaldateien ein unverändertes Ausgangsmanifest außerhalb des Archivs sichern. Mindestens Quelle beziehungsweise interne Quell-ID, Dateipfad im privaten Nachweis, Dateigröße und SHA-256-Prüfsumme erfassen. Nach Abschluss erneut unabhängig einlesen und vergleichen.

Die verwendeten Originaldateien müssen an ihren ursprünglichen Stellen vorhanden sein und unveränderte Inhaltsprüfsummen besitzen. Löschungen, Umbenennungen oder zusätzliche Dateien im überwachten Bereich über einen Verzeichnisabgleich prüfen, soweit dafür ein vollständiger Vorher-Stand vorliegt. Umfang und Grenzen dieser Kontrolle ausdrücklich nennen.

Ein Dateihash ersetzt keine Berechtigungs- oder vollständige Verzeichnisprüfung. Aus der Prüfung ausgewählter Dateien keine Behauptung ableiten, das gesamte übrige Archiv vollständig verglichen zu haben. Den umfassenden Schutz insbesondere durch die technische Schreibgrenze absichern.

Das Vorher-Manifest nicht nach der Bearbeitung erzeugen, austauschen oder überschreiben. Unveränderlich beziehungsweise geschützt aufbewahren und mit dem geprüften Lauf verknüpfen. Ein Vorfall darf nicht durch Anpassen des Ausgangsstands als bestanden dargestellt werden.

Bei einer unerwarteten Änderung sofort die betroffene Verarbeitung stoppen, Belege sichern und konkret berichten. Keine stillschweigende Wiederherstellung, Löschung von Spuren oder weitere automatische Archivänderung. Wiederherstellung nur mit ausdrücklicher Freigabe.

Private Quellpfade, Originalbilder und sensible Bildinformationen geschützt speichern und nicht über die öffentliche Website oder ungeschützte Prüfberichte zugänglich machen.

## 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern

### 11.1 Unterscheidung zwischen Umsetzung und neuer Gestaltungsentscheidung

Bereits freigegebene Regeln dürfen ohne erneute Nachfrage umgesetzt und Verstöße dagegen korrigiert werden. Eine ausdrücklich erteilte aktuelle Freigabe gilt innerhalb ihres konkreten Umfangs; dieselbe Entscheidung nicht nochmals abfragen.

Eine neue allgemeine Designregel, Änderung einer bestehenden Regel, neue Komponentenvariante, Ausnahme oder sonstige gestalterische Erweiterung benötigt eine eindeutige Freigabe, bevor sie zum verbindlichen Standard oder live wirksam wird. Einen Auftrag für eine einzelne Seite nicht automatisch als Erlaubnis für eine globale Regeländerung auslegen.

Vor neuen visuellen Entscheidungen prüfen, ob sie den Guide verändern oder erweitern. Bei unklarer Reichweite gezielt klären: Soll die Änderung nur für diese Seite, als dokumentierte Variante oder als neue globale Regel gelten?

### 11.2 Konkrete Rückfrage statt pauschaler Zustimmung

Ein Vorschlag muss enthalten: betroffene bestehende Regel, vorgeschlagene Änderung, Begründung, betroffene Seiten und Bildschirmgrößen sowie Auswirkungen auf Startseite, Templates, Bilder und Funktionen. Bei visuellen Änderungen möglichst eine klar als Entwurf markierte Vorschau oder einen Vorher-/Nachher-Vergleich beilegen.

Geeignete Entscheidungsfrage:

> Darf diese Änderung als neue allgemeine Regel in den Design-Guide übernommen werden, oder soll sie nur als ausdrücklich dokumentierte Ausnahme für die genannte Seite gelten?

Bis zur Entscheidung gilt die zuletzt freigegebene Fassung. Schweigen ist keine Zustimmung. Entwürfe weder als freigegeben markieren noch als verbindliche neue Regel veröffentlichen. Nicht betroffene Arbeiten dürfen weitergehen.

### 11.3 Nach Freigabe konsistent aktualisieren

Nach eindeutiger Freigabe Design-Guide, betroffene zentrale Komponenten beziehungsweise Templates, notwendige Skill-Verweise, Tests und Projektstatus im selben Änderungsvorgang konsistent aktualisieren. Keine dauerhafte Trennung zwischen freigegebener Gestaltung, Dokumentation und tatsächlicher Implementierung hinterlassen.

Im Änderungsnachweis Datum, betroffene Regel, Änderung, Geltungsbereich und tatsächlichen Freigabebeleg dokumentieren, beispielsweise eine verfügbare Entscheidungsreferenz. Keine Freigabe-ID, Zustimmung oder Zeitangabe erfinden.

Sachliche Status- und Nachweisaktualisierungen zu bereits genehmigten Änderungen können unmittelbar dokumentiert werden, sofern sie die normative Bedeutung nicht verändern. Neue Regeln oder Ausnahmen benötigen dagegen Freigabe. Sichtprüfungsreferenzen nur nach passender Freigabe ändern.

Den Guide nicht automatisch an fehlerhafte Implementierung anpassen. Tests und Referenzbilder nicht abschwächen oder ersetzen, nur damit Abweichungen verschwinden. „Guide aktualisiert“ darf niemals bedeuten, eine ungefragte Designentscheidung nachträglich zu legitimieren.

## 12. Nachweismatrix statt pauschaler Selbstauskunft

Erstelle eine nachvollziehbare Prüfmatrix, die jede wesentliche geltende Vorgabe mit ihrer Umsetzung und ihrer Prüfung verbindet. Vorhandene Regeln mit stabilen Kennungen referenzieren; dadurch keine neuen ungeprüften Designregeln einführen.

Jeder Eintrag enthält mindestens:

- Vorgabe, Quelle und Versionsbezug.
- Betroffene Seiten, Komponenten, Bilder oder geschützte Daten.
- Tatsächliche Implementierung beziehungsweise technischer Schutz.
- Prüfmethode, reproduzierbaren Testbefehl oder manuelle Prüfschritte.
- Ergebnis, Umfang, Zeitpunkt und Verweis auf konkrete Belege.
- Offene Abweichungen und gegebenenfalls tatsächliche Nutzerfreigabe.

Ergebnisse eindeutig trennen: **BESTANDEN**, **FEHLGESCHLAGEN**, **NICHT GEPRÜFT**, **BLOCKIERT** oder **NICHT ANWENDBAR – begründet**. „Nicht anwendbar“ darf keine fehlende Umsetzung oder fehlenden Zugang verdecken. Eine genehmigte Ausnahme mit ihrem konkreten Umfang separat ausweisen.

Keine pauschalen Häkchen, frei erfundenen Testergebnisse oder bloßen Formulierungen wie „alle Regeln beachtet“. Maschinenprüfungen mit den tatsächlichen Ausgaben belegen. Manuelle Sichtprüfungen mit geprüfter Ansicht und konkretem Befund dokumentieren. Ein gespeicherter Screenshot allein ist keine Sichtprüfung.

Nachweise mit dem tatsächlich getesteten Quellstand, Build und gegebenenfalls Live-Release verbinden. Lokale Tests nicht als Nachweis einer noch nicht geprüften Veröffentlichung darstellen.

## 13. Template-, Design- und Funktionsprüfung

### 13.1 Tatsächliche Wiederverwendung nachweisen

Für jede Seite festhalten: Route → Inhaltsquelle → Template beziehungsweise Generator → gemeinsame Komponenten → Styles und Skripte. Nachweisen, dass passende Seiten tatsächlich dieselben zentralen Quellen verwenden und nicht nur ähnlich aussehende Kopien besitzen.

Die zentrale Änderungswirkung in einer isolierten Testumgebung überprüfen: Eine kontrollierte Änderung an einer gemeinsamen Komponente beziehungsweise einem Template muss nach dem normalen Build alle zugehörigen Seiten erreichen, ohne deren Einzelquellen anzupassen. Probezustände anschließend vollständig entfernen. Solche Tests nicht auf der Live-Website durchführen.

Unterschiede als Inhalt, Konfiguration oder genehmigte Variante dokumentieren. Die Startseite behält ihr eigenes Layout. Generierte Ausgaben nicht mit unerlaubten manuell gepflegten Quellkopien verwechseln.

Mit Testdaten zeigen, wie eine weitere Aktivitätsseite, Fahrzeugseite und ein Reisebericht entstehen, ohne ein vollständiges Seitenlayout zu kopieren. Keine erfundenen Testseiten öffentlich veröffentlichen.

### 13.2 Reproduzierbare visuelle Prüfung

Alle betroffenen öffentlichen Seiten auf Desktop, Tablet und Smartphone prüfen. Geeignete Ansichten beispielsweise bei 360, 390, 768, 1024 und 1440 CSS-Pixeln sowie direkt an gültigen Layoutgrenzen verwenden. Diese Werte sind Testgrößen und keine neue Designvorgabe. Hoch- und Querformat berücksichtigen.

Startseite und Kajak-Seite zusätzlich mit ihrem gesicherten freigegebenen Referenzzustand vergleichen. Andere Seiten anhand des geltenden Seitentyps und der gemeinsamen Regeln prüfen. Abweichungen markieren und begründen, statt Referenzbilder automatisch an den neuen Zustand anzupassen.

Farben, Schriftgrößen, Abstände, Spaltenanzahl und andere konkret definierte Werte soweit möglich auch über tatsächliche DOM-/CSS-Werte prüfen. Visuelle Differenzbilder ergänzen, aber ersetzen nicht die Prüfung von Inhalt, Bildqualität und Bedienbarkeit.

Browser-Emulation und echte Geräteprüfungen unterscheiden. Kein bestimmtes Gerät als getestet ausgeben, wenn lediglich dessen Bildschirmgröße emuliert wurde. Bekannte Grenzen transparent dokumentieren.

### 13.3 Bedienung und bestehende Tests

Navigation, Login-Flyout soweit betroffen, Sprachwechsel, mobile Menüs, Fokuszustände, Escape, Galerien, Lightbox, Bildunterschriften, Links und vorhandene Touch-Funktionen prüfen. Alle Bildvarianten, Sprachen sowie lange und kurze Inhalte berücksichtigen.

Vorhandene Tests weiterverwenden und bei Bedarf erweitern. Bestehende Prüfungen nicht entfernen, Kriterien nicht lockern und Sicherheitsgrenzen nicht umgehen, damit ein Lauf erfolgreich erscheint.

## 14. Für den Nutzer unabhängig nachvollziehbare Abnahme

Für jeden abgeschlossenen Änderungslauf einen zusammenhängenden Abnahmebericht in der vorgesehenen geschützten Projektablage erstellen und den tatsächlichen Pfad nennen. Eine lesbare Zusammenfassung und die dazugehörigen konkreten Belege bereitstellen; nicht nur einen Ordner mit unkommentierten Dateien.

Der Bericht muss für den Nutzer ohne Rekonstruktion des gesamten Chats beantwortbar machen:

1. Welche aktuellen Regeln und Skills wurden zugrunde gelegt?
2. Welche Seiten und Bilder wurden tatsächlich geprüft und welche nicht?
3. Welche zentralen Templates und Komponenten verwenden diese Seiten?
4. Sind die verwendeten Originaldateien nachweislich unverändert, und wie war Schreibzugriff technisch begrenzt?
5. Welche Unterschiede zeigen die Vorher-/Nachher-Ansichten?
6. Wurde der Design-Guide geändert, und wo liegt die jeweilige Freigabe?
7. Was ist lokal vorbereitet, im Repository gesichert, erfolgreich geprüft und tatsächlich live verifiziert?

Zähler mit Nenner angeben, beispielsweise geprüfte Seiten von erfassten Seiten sowie geprüfte Bilddateien von erfassten Bilddateien. Zahlen nur aus tatsächlichen Ergebnissen übernehmen. Nicht geprüfte Originale, Ansichten oder Varianten ausdrücklich nennen.

Den exakten, im Projekt funktionierenden Befehl zur erneuten Ausführung der relevanten Prüfungen dokumentieren. Keinen erfundenen Testbefehl angeben. Prüfungen müssen gegen die gesicherten Ausgangsdaten laufen; ein erneuter Test darf Referenzen oder Manifeste nicht automatisch ersetzen.

Eine zusätzliche unabhängige Nachprüfung muss ohne Änderung an Website, Bildern, Regeln oder Freigaben möglich sein. Nur neue Prüfprotokolle dürfen dabei geschrieben werden. Eine bloße Textbestätigung des umsetzenden Assistenten ersetzt diese Kontrolle nicht.

## 15. Dauerhafte Verankerung ausschließlich in VanVenture

In der bestehenden projektlokalen `AGENTS.md` eine kurze Lesepflicht mit konkreten Pfaden zu Design-Guide, Template-Spezifikation und Bild-Skill sowie den Schutz- und Abnahmepflichten verankern. Lange normative Texte nicht in mehrere unabhängig gepflegte Dateien kopieren.

Die Bild-Skill-Pflicht gilt für alle relevanten Bildaufgaben, auch als Teil größerer Änderungen. Verfügbarkeit eines Skills allein nicht mit seiner Anwendung gleichsetzen. Falls der Skill an seinem tatsächlichen lokalen Pfad bleibt, dessen Verfügbarkeit im verwendeten Arbeitsumfeld prüfen; andere Umgebungen nicht als automatisch versorgt darstellen.

Keine VanVenture-Regeln in globale Codex-Anweisungen oder andere Projekte übertragen. Andere persönliche Skills und allgemeine Einstellungen unverändert lassen. Eine erforderliche projektbezogene Ablage oder Verknüpfung nachvollziehbar dokumentieren, ohne konkurrierende maßgebliche Versionen anzulegen.

In einer neuen VanVenture-Arbeitssitzung prüfen, ob die Projektregeln und referenzierten Dateien tatsächlich zugänglich sind. Die Einhaltung zusätzlich durch die beschriebenen technischen und visuellen Prüfungen absichern, nicht nur durch erneutes Ausgeben der Regeln.

Bestehende Pläne und Statusdokumente einschließlich `docs/ausbauplan.md` konsistent aktualisieren. Dokumentiert, implementiert, geprüft, freigegeben und live verifiziert getrennt kennzeichnen. Widersprüchliche Einträge bereinigen, ohne historische Nachweise umzudeuten.

### 15.1 Anforderungen bei jeder beauftragten Änderung pflegen

Vor einer Änderung die maßgebliche Quelle des betreffenden Regelbereichs
bestimmen. Responsive Templates, Komponenten und deren technische Abnahme
stehen in `docs/responsive-templates.md`, freigegebene Gestaltung in
`docs/design-guide.md`, übergreifende Prüf-, Schutz- und Freigabepflichten in
diesem Gesamtauftrag. `AGENTS.md` enthält nur knappe Lesepflichten und
Verweise. Übergabefassungen sind Eingaben, keine konkurrierenden aktiven
Spezifikationen; ihre historische Rolle ist sichtbar zu kennzeichnen.

Jede Nutzeranweisung gegen die geltende Spezifikation einordnen: bereits
erfüllt, Klarstellung, zusätzliche Anforderung, Regeländerung oder Ausnahme.
Neue technische Anforderungen mit den bestehenden Kennungen verbinden, soweit
passend. Für neue oder geänderte Gestaltungsregeln und Ausnahmen gilt vor
Umsetzung der Freigabeprozess in Abschnitt 11. Schweigen ist keine Freigabe;
bis zur Entscheidung bleibt die zuletzt freigegebene Regel gültig.

Nach Beauftragung beziehungsweise gültiger Freigabe Anforderung,
Geltungsbereich, Ausnahmen, Abnahmekriterien, Projektverweise, Ausbauplan und
Nachweismatrix im selben Änderungsvorgang abgleichen. Den Design-Guide nur
bei tatsächlich freigegebener Gestaltungsänderung normativ ändern;
anderenfalls im Nachweis festhalten: „Design-Guide inhaltlich unverändert“.
Historische Belege erhalten und überholte widersprüchliche Regeln ausdrücklich
als ersetzt kennzeichnen.

Für jede betroffene Anforderung Entscheidung/Freigabe, dokumentierte
Spezifikation, technische Umsetzung, Prüfergebnis und Live-Verifikation
getrennt führen. Der Änderungsnachweis nennt die tatsächlichen Dateipfade,
Abschnitte, Inhaltsunterschiede und verfügbaren Freigabebelege. Weder
Markdown-Änderung noch lokaler Test gelten als Live-Nachweis.

## 16. Veröffentlichung und Abschlussgrenzen

Veröffentlichung nur gemäß dem bestehenden Release-Prozess und nach bestandenen erforderlichen Prüfungen. Anschließend betroffene Live-Routen, sichtbare Ergebnisse und bestehende vorgeschriebene Gesundheitsprüfungen kontrollieren. Tatsächlichen Release-Bezug dokumentieren und verwendete Remote-Sitzungen entsprechend den Projektregeln schließen.

Fehlgeschlagene Pflichtprüfungen, fehlender Originalschutz, fehlende erforderliche Freigaben oder ungeklärte neue Designregeln blockieren die Freigabe der betroffenen Änderungen. Offene Punkte nicht als bestanden markieren. Unabhängig geprüfte Teilstände klar als solche ausweisen; den Gesamtauftrag nicht vorzeitig als abgeschlossen melden.

Zum Abschluss die tatsächlichen geänderten Dateipfade, migrierten Seiten, Bildprüfungen, Originalschutz-Nachweise, Guide-Änderungen samt Freigaben, Testergebnisse und den überprüften Live-Stand nennen. Konkrete verbleibende Arbeiten und Grenzen offenlegen.

**„Vollständig umgesetzt“ ist nur zulässig, wenn der gesamte vereinbarte Umfang umgesetzt und mit den erforderlichen Nachweisen geprüft ist. Eine perfekte interne Regelbefolgung nicht allein aus einer Dateiliste oder Selbstauskunft ableiten. Entscheidend sind gesicherte Grundlagen, technische Grenzen, reproduzierbare Ergebnisse und überprüfbare Freigaben.**

---

## Übergabetext für den VanVenture-Arbeitschat

Bitte übernimm diese Datei als konsolidierten Gesamtauftrag für VanVenture. Ergänze und konsolidiere die bereits vorhandenen Projektspezifikationen, statt widersprüchliche Parallelregeln anzulegen. Setze den Gesamtauftrag nach dem bestehenden Projektablauf um. Vor jeder betroffenen Änderung müssen die gültigen Design-, Template-, Bild- und Originalschutzregeln verfügbar und angewandt sein. Neue oder geänderte Gestaltungsregeln benötigen meine ausdrückliche Freigabe; bereits genehmigte Regeln sollen ohne unnötige erneute Rückfrage umgesetzt werden. Die Startseite behält ihr eigenes Layout, ist aber nicht von Bildregeln, Originalschutz und Prüfung ausgenommen. Gib zu Beginn die tatsächlich verwendeten Grundlagen und am Ende den überprüfbaren Abnahmebericht mit Belegen aus. Behaupte keine Übernahme, Umsetzung, Prüfung oder Veröffentlichung, die nicht stattgefunden hat.
