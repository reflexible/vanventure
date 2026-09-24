# vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben

> Historische Übergabefassung vom 23. September 2026. Die Ergänzungen aus
> Abschnitt 6.1 und 15.1 sind in den maßgeblichen
> [Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md) und
> die [Template-Spezifikation](responsive-templates.md) übernommen. Diese
> Übergabedatei ist keine zweite aktive Regelquelle. Der einzige aktive
> Aufgabenplan ist der [Ausbauplan](ausbauplan.md).

Stand der Zusammenführung: 23. September 2026
Überarbeitung: Galerie-Anforderungen und verbindliche Pflege der Anforderungen ergänzt
Zielprojekt: `reflexible/vanventure` / vanventure.at
Geltungsbereich der Arbeitsregeln: ausschließlich das VanVenture-Projekt

**Übergabestatus:** Diese Datei ist ein zusammengefasster Umsetzungsauftrag. Ihre Erstellung allein bedeutet weder eine Übernahme in das ChatGPT-Projekt oder Repository noch eine technische Umsetzung, erfolgreiche Prüfung oder Veröffentlichung. Tatsächliche Änderungen und Ergebnisse müssen nach Übernahme gesondert nachgewiesen werden.

**Ablage nach Übernahme:** Die Template-Spezifikation unter `docs/responsive-templates.md` beziehungsweise in ihrer bereits bestehenden maßgeblichen Fassung konsolidieren. Die freigegebenen Gestaltungsregeln bleiben in `docs/design-guide.md`. Den vollständigen Gesamtauftrag in die vorhandene Projektdokumentation einordnen und aus der projektlokalen `AGENTS.md` verweisen. Keine widersprüchlichen Parallelfassungen erstellen und keine bestehenden Regeln ersetzen.

**Änderungsumfang dieser Übergabefassung:** Ergänzt wurden Abschnitt 6.1 (gemeinsamer Galerie-Standard) und Abschnitt 15.1 (laufende Aktualisierung der Anforderungen). Die bisherigen Vorgaben einschließlich Startseiten-Ausnahme, Originalschutz, Skill-Anwendung, Freigaben und Prüfpflichten bleiben erhalten. Diese Datei ist eine aktualisierte Übergabefassung, keine zusätzlich anzulegende maßgebliche Projektdatei. Bei Übernahme die vorhandenen Quellen gezielt konsolidieren. Die Erstellung dieser Fassung ist kein Nachweis, dass neue Gestaltungsregeln freigegeben oder Projektdateien geändert wurden.

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

### 6.1 Verbindlicher Galerie-Standard für den gesamten Seitenbestand

#### Referenz und zentrale Quelle

Die bestehende freigegebene Kajak-Galerie ist die gestalterische und funktionale Referenz. Vor der Migration ihre Desktop-, Tablet- und Smartphone-Darstellung sowie ihren Foto-Viewer sichern und mit dem aktuellen Design-Guide abgleichen. Die Kajak-Seite muss anschließend selbst die gemeinsame Galerie-Komponente verwenden; keine separat gepflegte Referenzgalerie neben einer zweiten allgemeinen Implementierung erhalten.

Alle bestehenden Inhaltsgalerien verwenden eine gemeinsame maßgebliche Quelle für Markup, Styles, responsive Regeln und Verhalten. Seitenspezifisch sind Bildauswahl, Reihenfolge, Bildunterschriften, Alternativtexte, Bildzuordnungen sowie gegebenenfalls Überschrift, Einleitung und redaktioneller Hinweis. Nicht jede Galerie muss dieselben Bilder oder dieselbe Bildanzahl haben. Notwendige strukturelle Unterschiede ausschließlich als freigegebene Varianten der gemeinsamen Komponente abbilden.

Raster, Bildformate, Abstände, Typografie und responsive Übergänge aus dem gültigen Design-Guide übernehmen. Keine zweite unabhängig gepflegte Liste abweichender Gestaltungswerte anlegen. Generatoren müssen dieselbe zentrale Grundlage verwenden; ihre erzeugten Ausgaben nicht als separat zu pflegende Seiten behandeln.

#### Foto-Viewer und mobile Bedienung

Alle Galerien verwenden den gemeinsamen Foto-Viewer. Vergrößerung, Schließen, Bildunterschriften, Tastaturbedienung, Fokusverhalten sowie vorhandene Vor-/Zurücknavigation und Touch-Funktionen gemäß freigegebener Referenz und Guide erhalten und seitenübergreifend prüfen. Aus dieser Aufzählung keine Erlaubnis ableiten, bislang nicht freigegebene Gesten, Automatiken oder andere neue Bedienkonzepte einzuführen.

Die Vollansicht zeigt das vollständige, freigegebene Webbild statt nur des beschnittenen Galerieausschnitts. Sie darf insbesondere keine ungeschützte Archivdatei laden oder Kennzeichen-Anonymisierung und andere erforderliche Schutzmaßnahmen durch einen abweichenden Vollbildpfad umgehen. Bild-Skill, Bildfreigaben und Originalschutz gelten für Vorschau, Vollansicht und alle responsiven Ableitungen.

Desktop, Tablet und Smartphone einschließlich Hoch- und Querformat prüfen. Mobile Abweichungen aktiv zentral beheben. Bei gleicher Bildschirmbreite, gleichem Zustand und gleicher genehmigter Variante sind Gestaltung und Bedienung gleich; verschiedene Inhalte dürfen unterschiedliche Textlängen verursachen.

#### Vollständigkeit und Startseiten-Ausnahme

Jede öffentliche Inhaltsunterseite gegen den Galerie-Standard des gültigen Design-Guides prüfen. Fehlende erforderliche Galerien mit vorhandenem freigegebenem Bildmaterial ergänzen. Ausdrücklich freigegebene Ausnahmen erhalten. Fehlendes Material oder fehlende Freigaben sind offene Punkte, keine stillschweigende Ausnahme. Keine Bilder erfinden oder ohne Freigabe austauschen, nur um den Abschnitt zu füllen.

Auf der Startseite nicht automatisch eine Galerie ergänzen, einen Bildbereich umdeuten oder das Unterseiten-Galerielayout erzwingen. Dort vorhandene gemeinsame Funktionen dürfen zentral genutzt werden, sofern der geschützte Aufbau und die genehmigten Varianten erhalten bleiben. Bild- und Sicherheitsregeln gelten unverändert.

#### Überprüfbare Abnahme

Für jede betroffene Route erfassen: Galerie vorhanden oder dokumentierte Ausnahme, tatsächliche Inhaltsquelle, zentrale Galerie-Komponente, gemeinsamer Foto-Viewer, gegebenenfalls freigegebene Variante, Bildstatus sowie Darstellungs- und Funktionstests mit Belegen.

Die zentrale Änderungswirkung in einer isolierten Testumgebung nachweisen: Eine kontrollierte Änderung an der Galerie-Quelle muss nach dem normalen Build alle verwendenden Seiten einschließlich Kajak erreichen, ohne ihre Einzelquellen anzupassen. Den Testzustand anschließend entfernen. Probezustände nicht veröffentlichen.

Nicht nur eine Mustergalerie testen. Nach jeder zentralen Korrektur alle betroffenen Routen prüfen und die im Auftrag festgelegten Bildschirmgrößen und Bedienzustände abdecken. Fehler, nicht geprüfte Punkte und fehlende Freigaben getrennt ausweisen. Referenzen, Tests und Guide nicht nachträglich abschwächen, um Abweichungen zu verbergen.

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

### 15.1 Anforderungen bei jeder beauftragten Änderung aktualisieren

#### Eine maßgebliche Quelle je Regelbereich

Vor einer Anforderungsänderung feststellen, wo die geltenden Anforderungen tatsächlich gepflegt werden. Die vorhandene konsolidierte Spezifikation aktualisieren, nicht für jede Chatnachricht eine neue konkurrierende Regeldatei anlegen.

Für responsive Templates, gemeinsame Komponenten und deren Abnahmekriterien die vorhandene maßgebliche Fassung verwenden; `docs/responsive-templates.md` ist der vorgesehene Zielpfad, falls noch keine verbindliche andere Ablage existiert. Den Design-Guide unter `docs/design-guide.md` als Quelle freigegebener Gestaltungsregeln erhalten. Bild-Skill und bestehende Sicherheitsregeln an ihren nachgewiesenen maßgeblichen Ablagen referenzieren. In `AGENTS.md` nur notwendige Pflichten und eindeutige Verweise ergänzen, nicht sämtliche langen Regeln kopieren.

Die Übergabedatei ist eine Eingabe für die Konsolidierung. Sie darf nicht unkommentiert neben einer widersprüchlichen aktiven Spezifikation liegen bleiben. Frühere Übergabefassungen nur nachvollziehbar als historisch oder ersetzt kennzeichnen, ohne historische Nachweise eigenmächtig zu löschen.

#### Änderungsauftrag, Freigabe und Reichweite

Jede neue Nutzeranweisung mit der vorhandenen Spezifikation abgleichen: Ist sie bereits erfüllt, eine Klarstellung, eine zusätzliche Anforderung, ein Änderungswunsch an einer bestehenden Regel oder eine neue Ausnahme? Neu hinzugekommene oder geänderte Anforderungen möglichst mit den bereits verwendeten stabilen Kennungen versehen. Keine zweite Kennungssystematik ohne Bedarf einführen.

Eine ausdrücklich beauftragte Übernahme bereits freigegebener Galerie-, Template-, Bild- oder Sicherheitsanforderungen in die Projektdokumentation benötigt keine erneute pauschale Bestätigung. Aus einer Dokumentationsaktualisierung aber keine zusätzliche, nicht beauftragte Designentscheidung oder Veröffentlichungserlaubnis ableiten.

Neue allgemeine Designregeln, Änderungen bisheriger Gestaltung und neue Ausnahmen nach Abschnitt 11 vor Umsetzung klären. Dabei konkret fragen, ob eine Änderung als Standard in den Guide oder nur als dokumentierte Ausnahme übernommen werden darf. Bis zur Entscheidung gilt die zuletzt freigegebene Regel; offene Vorschläge eindeutig als Vorschlag führen, nicht als geltende Norm. Bestehende Anforderungen nicht automatisch zur fehlerhaften Umsetzung passend umschreiben.

#### Aktualisierung im selben Änderungsvorgang

Nach gültiger Beauftragung beziehungsweise erforderlicher Freigabe die betroffenen Anforderungen, ihre Geltungsbereiche, Ausnahmen und Abnahmekriterien im selben Änderungsvorgang konsistent aktualisieren. Dazu passend die Verweise in `AGENTS.md`, den bestehenden Ausbauplan, relevante Statusunterlagen und die Prüfmatrix abgleichen. Den Design-Guide nur dann inhaltlich ändern, wenn eine neue oder geänderte Gestaltungsregel tatsächlich freigegeben wurde. Andernfalls ausdrücklich festhalten: „Design-Guide inhaltlich unverändert“.

Bei jeder abgeschlossenen Website-Aufgabe prüfen, ob Anforderungen oder Guide betroffen sind. Werden lediglich bestehende Regeln umgesetzt, keine normative Änderung erfinden; dann nur Umsetzungsstand und reale Prüfergebnisse aktualisieren. Bereits genehmigte normative Änderungen nicht bis zu einer späteren, unabhängigen Aufgabe undokumentiert lassen.

Im vorhandenen Änderungsnachweis die tatsächliche Änderung, betroffene Abschnitte beziehungsweise Anforderungskennungen, ihren Umfang und den verfügbaren Freigabebeleg festhalten. Keine Freigabe, Datum, Commit-ID oder Testergebnisse erfinden. Historie bewahren und veraltete widersprüchliche Regeln ausdrücklich ersetzen oder außer Kraft setzen, nicht stillschweigend parallel stehen lassen.

#### Anforderung ist nicht gleich Umsetzung

Für jede betroffene Anforderung getrennt dokumentieren: Entscheidung beziehungsweise Freigabe, Spezifikation aktualisiert, technisch umgesetzt, geprüft sowie live verifiziert. Eine Aktualisierung der Markdown-Datei ist weder Implementierung noch Testergebnis oder Veröffentlichung.

Im Abschlussbericht die tatsächlich geänderten Dateipfade, Abschnitte und den Inhaltsunterschied nennen. Die Zuordnung „Anforderung → Implementierung → Prüfung → Ergebnis“ aus Abschnitt 12 pflegen. Geänderte Designregeln mit ihrer Freigabe verknüpfen; offene Entscheidungen und nicht geprüfte Bereiche benennen.

Der Nutzer muss die aktuelle maßgebliche Anforderungsdatei eindeutig finden und die Änderung nachvollziehen können, ohne den Chatverlauf rekonstruieren zu müssen. Berichte ausdrücklich, ob nur eine Übergabedatei vorbereitet, die lokale Projektdokumentation bearbeitet oder die Änderung tatsächlich im Repository gesichert wurde. Nur ausgeführte Schritte als erledigt kennzeichnen.

## 16. Veröffentlichung und Abschlussgrenzen

Veröffentlichung nur gemäß dem bestehenden Release-Prozess und nach bestandenen erforderlichen Prüfungen. Anschließend betroffene Live-Routen, sichtbare Ergebnisse und bestehende vorgeschriebene Gesundheitsprüfungen kontrollieren. Tatsächlichen Release-Bezug dokumentieren und verwendete Remote-Sitzungen entsprechend den Projektregeln schließen.

Fehlgeschlagene Pflichtprüfungen, fehlender Originalschutz, fehlende erforderliche Freigaben oder ungeklärte neue Designregeln blockieren die Freigabe der betroffenen Änderungen. Offene Punkte nicht als bestanden markieren. Unabhängig geprüfte Teilstände klar als solche ausweisen; den Gesamtauftrag nicht vorzeitig als abgeschlossen melden.

Zum Abschluss die tatsächlichen geänderten Dateipfade, migrierten Seiten, Bildprüfungen, Originalschutz-Nachweise, Guide-Änderungen samt Freigaben, Testergebnisse und den überprüften Live-Stand nennen. Konkrete verbleibende Arbeiten und Grenzen offenlegen.

**„Vollständig umgesetzt“ ist nur zulässig, wenn der gesamte vereinbarte Umfang umgesetzt und mit den erforderlichen Nachweisen geprüft ist. Eine perfekte interne Regelbefolgung nicht allein aus einer Dateiliste oder Selbstauskunft ableiten. Entscheidend sind gesicherte Grundlagen, technische Grenzen, reproduzierbare Ergebnisse und überprüfbare Freigaben.**

---

## Übergabetext für den VanVenture-Arbeitschat

Bitte übernimm diese aktualisierte Übergabefassung in die bestehenden maßgeblichen VanVenture-Anforderungen. Ergänze insbesondere den Galerie-Standard aus Abschnitt 6.1 und die verbindliche Anforderungspflege aus Abschnitt 15.1. Keine widersprüchlichen Parallelfassungen anlegen und keine bereits freigegebenen Vorgaben entfernen.

Aktualisiere die vorhandene Template-/Komponenten-Spezifikation, ihre Abnahmekriterien, nötige Verweise in der projektlokalen AGENTS.md sowie betroffene Plan- und Prüfunterlagen. Den Design-Guide nur bei gültig freigegebenen Gestaltungsänderungen inhaltlich anpassen; für zusätzliche neue Regeln oder Ausnahmen vorher konkret rückfragen. Bestehende Originalschutz- und Bildregeln sowie die Startseiten-Ausnahme bleiben erhalten.

Nenne nach der Übernahme die tatsächlichen Dateipfade, betroffenen Abschnitte und Änderungen. Unterscheide dokumentierte Anforderungen von Umsetzung, Prüfung und Live-Stand. Setze danach den bereits beauftragten Gesamtauftrag zur Korrektur der Website fort. Gemeinsame Galerie- und Templatefehler zentral beheben, alle betroffenen Seiten einschließlich ihrer mobilen Ansichten prüfen und nach bestandenen Prüfungen gemäß dem bestehenden Release-Verfahren veröffentlichen. Keine Übernahme, Prüfung oder Veröffentlichung behaupten, die nicht stattgefunden hat.
