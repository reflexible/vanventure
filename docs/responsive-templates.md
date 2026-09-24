# vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates

Stand: 23. September 2026  
Zielprojekt: `reflexible/vanventure`  
Maßgeblicher Ablageort im Repository: `docs/responsive-templates.md`

**Übergabestatus:** Diese Spezifikation führt die Anforderungen aus der Abstimmung zusammen. Ihre Übernahme in das Repository bedeutet noch keine technische Umsetzung und keine Veröffentlichung. Den tatsächlichen Umsetzungsstand führt der bestehende Ausbauplan.

## Geltung, Freigaben und Nachweise

Diese Datei ist die maßgebliche technische Spezifikation für zentrale
Komponenten und Seitentemplates. Die übergreifenden Prüf-, technischen
Originalschutz-, Bilddaten-, Freigabe- und Abnahmepflichten stehen verbindlich
im [konsolidierten Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).
Freigegebene visuelle Regeln stehen ausschließlich im [Design Guide](design-guide.md).
Der [Ausbauplan](ausbauplan.md) ist die einzige aktive Arbeitsliste.

Neue Designregeln, Varianten oder Ausnahmen werden vor ihrer verbindlichen
oder Live-Wirkung ausdrücklich freigegeben. Bereits freigegebene Regeln werden
ohne erneute Rückfrage umgesetzt. Nach einer Freigabe sind Guide, zentrale
Implementierung, Tests und Statusnachweis im selben Änderungsvorgang konsistent
zu aktualisieren. Die Startseite behält ihr eigenes Layout, ist aber nicht von
Bildschutz, Originalschutz oder Prüfung ausgenommen.

## 1. Ziel: Einmal ändern, überall übernehmen

Überarbeite die technische Struktur der öffentlichen Website so, dass gemeinsame Elemente und Seitenlayouts zentral definiert und tatsächlich wiederverwendet werden. Es geht um einen strukturellen Umbau, nicht um ein Redesign.

Navigation, Galerien, gemeinsame Gestaltung und wiederkehrende Funktionen sollen künftig an einer zentralen Stelle gepflegt werden. Änderungen müssen automatisch auf allen Seiten wirksam werden, die diese Komponenten beziehungsweise Templates verwenden – gegebenenfalls nach dem regulären Build und Deployment, aber ohne jede einzelne Seite manuell nachzuarbeiten.

Die Architektur besteht aus drei getrennten Ebenen:

1. Gemeinsame Gestaltung und wiederverwendbare Komponenten.
2. Wiederverwendbare responsive Seitentemplates für die jeweiligen Seitentypen.
3. Seitenspezifische Inhalte und Konfiguration.

Die öffentliche Startseite unterliegt der ausdrücklichen Ausnahme in Abschnitt 2. Eine ungefragte Neugestaltung der geschützten Redaktion oder des Cockpits ist nicht Teil dieses Auftrags.

## 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig

Die Startseite ist von der Vereinheitlichung der Seitenlayouts und der Überführung in die Fahrzeug-, Kajak-/Aktivitäts- oder Reisebericht-Templates ausgenommen. Das gilt auf Desktop, Tablet und Smartphone.

Ihr bestehender Aufbau, ihr Look and Feel, ihre Abschnittsreihenfolge, ihre besonderen Funktionen und ihre mobile Darstellung bleiben erhalten. Die Startseite darf nicht automatisch dem Aufbau der Kajak-Seite oder eines anderen Unterseiten-Templates angeglichen werden.

Gemeinsame Komponenten sind davon getrennt zu betrachten: Navigation, Footer oder tatsächlich gemeinsam verwendete Funktionen dürfen zentral eingebunden werden. Dabei müssen Erscheinungsbild und Verhalten der Startseite erhalten bleiben. Benötigte startseitenspezifische Unterschiede werden als ausdrücklich definierte Varianten der gemeinsamen Komponenten umgesetzt – nicht als vollständig kopierte Parallelimplementierung.

Auch Änderungen an globalen Styles, responsiven Regeln, Templates, Generatoren und gemeinsamen Skripten dürfen die Startseite nicht unbeabsichtigt verändern. Sie muss deshalb bei jeder relevanten Umstellung auf Desktop, Tablet und Smartphone als geschützte Vergleichsseite mitgeprüft werden.

**Leitregel:** Die Unterseiten verwenden ihre vorgesehenen responsiven Seitentemplates. Die Startseite behält ihr eigenes Layout.

## 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz

Die aktuelle Kajak-Seite gefällt mir in ihrem bestehenden Zustand sehr gut. Ihr Stil, Look and Feel und ihre vorhandenen Funktionen sind die Referenz für die gemeinsame Gestaltung der Unterseiten.

Das betrifft insbesondere Typografie, Farben, Abstände, Inhaltsbreiten, Bilddarstellung, Buttons, Karten, Galerien, Interaktionen und responsives Verhalten.

Sichere vor dem Umbau die aktuelle Darstellung und die vorhandenen Funktionen als Vergleichsbasis, einschließlich Desktop-, Tablet- und Mobilansichten. Gleiche dafür den maßgeblichen aktuellen Website-Stand mit dem Repository ab; eine möglicherweise ältere Veröffentlichung darf nicht versehentlich zur Referenz werden.

Die Kajak-Seite soll nach der Umstellung selbst das gemeinsame Aktivitäts-/Themenseiten-Template verwenden. Sie darf nicht lediglich als unveränderte Sonderseite neben einer davon abgeleiteten zweiten Implementierung bestehen bleiben.

Keine ungefragte kreative Neuinterpretation, kein Austausch des Hero-Bildes, keine Umgestaltung und keine inhaltliche Neufassung. Technisch notwendige Änderungen dürfen den gelungenen sichtbaren Zustand und die vorhandenen Funktionen nicht unbeabsichtigt verändern.

Andere Seitentypen behalten einen zu ihren Inhalten passenden Aufbau. Ein Reisebericht muss nicht dieselbe Inhaltsstruktur wie die Kajak-Seite haben, verwendet aber dieselbe gemeinsame Designsprache und dieselben passenden Komponenten.

## 4. Gemeinsame Komponenten statt kopierter Implementierungen

Untersuche die bestehenden Seiten und lagere tatsächlich wiederkehrende Bausteine in gemeinsame Komponenten, Includes oder Partials aus, passend zur bestehenden Architektur.

Dazu gehören insbesondere:

- Header, Navigation, mobile Navigation, aktiver Navigationszustand und Footer.
- Galerien, Bildvergrößerung und vorhandene Lightbox-Funktionen.
- Wiederkehrende Buttons, Karten, Infoboxen, Bild-/Text-Abschnitte und weitere gemeinsame Inhaltsbausteine.
- Gemeinsame Gestaltungsregeln für Typografie, Farben, Abstände, Inhaltsbreiten und responsive Layoutwechsel.

Für jeden gemeinsamen Baustein gibt es eine maßgebliche Implementierung. Nicht nur Markup, sondern auch CSS und JavaScript werden zentral gepflegt. Bereits vorhandene gemeinsame Komponenten und Bildbetrachter zuerst prüfen, erweitern und weiterverwenden, statt daneben neue konkurrierende Lösungen anzulegen.

Seitenspezifische Inhalte und Zustände – beispielsweise Bilder, Beschriftungen, Links, Sprache und aktiver Menüpunkt – werden als Daten oder klar definierte Einstellungen übergeben.

Bewusst benötigte Unterschiede werden als dokumentierte Komponentenvarianten abgebildet. Keine eigenen Navigationslösungen, Galerie-Skripte oder kopierten CSS-/Mobile-Regeln pro Seite.

Automatisch erzeugte Ausgabedateien sind zulässig. Entscheidend ist, dass ihre gemeinsamen Bestandteile ausschließlich aus zentralen Quellen erzeugt werden, zuverlässig neu generiert werden können und nicht manuell in jeder Ausgabedatei gepflegt werden müssen.

## 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates

### Gemeinsame Galerie-Komponente

Alle öffentlichen Inhaltsgalerien einschließlich der Kajak-Referenz werden
aus einer zentralen Galeriequelle erzeugt oder eingebunden. Ihre
seitenspezifischen Inhalte sind Bildfolge, Alternativtexte,
Bildunterschriften, Überschrift und Einleitung. Markup, Raster,
responsive Styles und Interaktionen stammen aus derselben Komponente.
Der gemeinsame `photo-viewer.js` zeigt in der Vollansicht das freigegebene,
vollständige Webbild. Die Designwerte und die Pflicht zur Galerie beziehungsweise
eine ausdrücklich genehmigte Ausnahme stehen im [Design Guide](design-guide.md);
Bild- und Originalschutz sowie die vollständige Prüfmatrix in Abschnitt 6.1
des [Gesamtauftrags](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).

Das gemeinsame Website-Grundlayout und die inhaltlichen Seitentypen sind zu trennen. Das Grundlayout beziehungsweise seine Bausteine verwalten gemeinsame Gestaltung, Header, Navigation, Footer und die Einbindung gemeinsamer Styles und Funktionen. Die Ausnahme für das eigenständige Startseitenlayout bleibt dabei verbindlich.

### 5.1 Kajak-/Aktivitäts-/Themenseiten-Template

Leite dieses Template aus der bestehenden Kajak-Seite ab. Die Kajak-Seite selbst und weitere passende Aktivitäts- oder Themenseiten verwenden danach dieselbe Template-Implementierung.

Der Aufbau muss mit anderen Inhalten nutzbar sein, ohne Layout oder Funktionen neu zu programmieren und ohne die vollständige Kajak-Seite zu kopieren.

### 5.2 Fahrzeugseiten-Template

Überführe den passenden Aufbau der vorhandenen Fahrzeug-Seite in ein wiederverwendbares Fahrzeug-Template. Gemeinsame Gestaltung und Komponenten kommen aus derselben zentralen Grundlage wie bei der Kajak-Seite.

Inhalte und optionale Abschnitte werden pro Fahrzeug konfiguriert. Neue Fahrzeugseiten dürfen keine Kopien der gesamten bestehenden Fahrzeugseite benötigen.

### 5.3 Reisebericht-Template

Erstelle beziehungsweise konsolidiere eine wiederverwendbare Struktur für Reiseberichte. Bestehende passende Generatoren oder Templates sind zuerst zu prüfen und weiterzuverwenden.

Texte, Bilder, Galerien und bereits vorhandene weitere Berichtselemente werden pro Reisebericht als Inhalt eingebunden. Der Bericht muss ausreichend flexibel bleiben, ohne individuelle Layoutkopien zu erzeugen.

### 5.4 Optionale Abschnitte und weitere Unterseiten

Nicht jede Seite muss alle möglichen Abschnitte enthalten. Fehlende optionale Inhalte dürfen keine leeren Blöcke, unnötigen Überschriften oder falschen Abstände erzeugen.

Weitere bestehende öffentliche Unterseiten, etwa Übersichtsseiten, werden sinnvoll in die gemeinsame Komponentenarchitektur eingeordnet. Keine Seite in ein inhaltlich unpassendes Detailseiten-Template zwingen. Die Startseite bleibt ausdrücklich ausgenommen.

**Navigation ohne unnötige Zwischenseiten (Nutzerentscheidung 24. September
2026):** Wenn konkrete Unterseiten bestehen, verlinkt der gemeinsame
öffentliche Navigationsbaustein diese direkt. Eine zusätzliche
Übersichtsseite wird nur bei ausdrücklichem Nutzerauftrag als Navigationsziel
  geführt. Nach der ergänzenden Nutzerentscheidung vom 24. September 2026
  werden die bisherigen Ausrüstungs- und Radübersichten nicht mehr als
  Inhalte ausgeliefert und intern nicht mehr verlinkt. Die alten Adressen
  leiten zur Startseite weiter; eine Weiterleitung ist keine Übersichtsseite.
  Auch eine nicht vorhandene öffentliche `.html`-Seite leitet im lokalen
  und produktiven Seitenrouter zur Startseite; fehlende Bilder, Skripte,
  geschützte Bereiche und API-Routen bleiben erkennbare Fehler statt
  scheinbarer Startseiten-Antworten.

**Ausrüstungs-Detailseiten:** Das vollständige Scott-Radprofil verwendet
die Kajak-/Aktivitäts-Hero- und Galerie-Bausteine und muss auch in Typografie,
Abschnittsrhythmus, Bild-Text-Paaren und responsivem Verhalten gegen die
Kajak-Referenz geprüft werden. Die vier unvollständigen Radprofile bleiben
nach erneuter Nutzerentscheidung vom 24. September 2026 vorläufig bei der
freigegebenen Poster-Ausnahme, bis Bilder und Erfahrungsinhalte vorliegen.
Ein gemeinsamer Renderer allein ist kein Nachweis visueller Übereinstimmung.
Auch redaktionelle Textlinks in Einleitungen und Bild-Text-Abschnitten
beziehen Farbe, Unterstreichung, Unterstreichungsabstand und Fokusmarke
aus `detail-editorial.css`. Ein seitenspezifischer Linkstil für fertige
Ausrüstungsprofile ist nicht zulässig. Der Browser-Abgleich prüft die
berechneten Stile auf Kajak und Scott in allen Referenzbreiten.

## 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil

Der gesamte Auftrag gilt gleichermaßen für Desktop, Tablet und Smartphone. Es reicht nicht, nur die Desktop-Ansicht zu vereinheitlichen und mobile Sonderimplementierungen bestehen zu lassen.

Aktuell bestehende unbeabsichtigte Unterschiede zwischen den mobilen Unterseiten müssen untersucht und bereinigt werden. Sie dürfen nicht einfach in neue Templates übernommen werden.

Es soll eine zentral gepflegte responsive Website entstehen, keine unabhängig voneinander gepflegte Desktop- und Mobilversion. Jede Komponente und jedes Seitentemplate enthält die zugehörigen Regeln für die relevanten Bildschirmgrößen.

Zentral zu vereinheitlichen sind insbesondere:

- Header und mobile Navigation: Logo-Darstellung, Abstände, Menübutton, Menüansicht, aktive Menüpunkte, Öffnen, Schließen und Scrollverhalten.
- Inhaltsdarstellung: Seitenränder, Typografie, Überschriften, Abschnittsabstände, Bilddarstellung und Übergang von mehrspaltigen zu einspaltigen Bereichen.
- Interaktive Elemente: Buttons, Karten, Galerien und Bildvergrößerung einschließlich vorhandener Touch- und gegebenenfalls Swipe-Funktionen.
- Responsive Umschaltpunkte und komponentenbezogene Regeln, ohne separate CSS-Kopien je Seite.

**Definition von Einheitlichkeit:** Bei gleicher Bildschirmbreite, gleicher ausdrücklich definierten Variante und gleichem Zustand müssen gemeinsame Komponenten gleich gestaltet sein und gleich funktionieren. Ihre jeweiligen Inhalte dürfen unterschiedlich sein. Unterschiedliche Textlängen oder Inhalte bedeuten nicht, dass jede Seite eine identische Gesamthöhe haben muss.

Die Fahrzeug-, Kajak-/Aktivitäts- und Reisebericht-Templates dürfen sich in ihrem inhaltlichen Aufbau unterscheiden. Derselbe gemeinsam verwendete Baustein darf aber nicht allein wegen des Seitentyps anders aussehen oder funktionieren.

Die Startseite erhält keine erzwungene Angleichung, auch nicht auf Mobilgeräten.

## 7. Inhalte von Darstellung und Funktion trennen

Titel, Texte, Bilder, Bildunterschriften, Galerien, technische Daten, Links und SEO-Metadaten werden getrennt von der gemeinsamen Darstellung gepflegt.

Nutze die zum bestehenden Projekt passende Datenhaltung und Bearbeitungsweise. Vorhandene redaktionelle Arbeitsabläufe und maßgebliche Datenquellen bleiben erhalten. Kein unnötiges zweites Inhaltssystem einführen.

Neue Seiten entstehen durch Auswahl eines Seitentyps und Eingabe der Inhalte. Globale Designänderungen erfolgen zentral; Änderungen am Inhalt einer einzelnen Seite bleiben auf diese Seite beschränkt.

Bestehende Sprachversionen und die Sprachumschaltung müssen erhalten bleiben. Gemeinsam verwendete Komponenten und Templates dürfen keine getrennt gepflegten Designkopien für Deutsch und Englisch erfordern.

## 8. Bestehende Seiten tatsächlich migrieren

Erstelle nicht nur Komponenten und Templates für spätere Seiten, sondern stelle die vorhandenen passenden Unterseiten auf die gemeinsame Grundlage um.

Arbeitsreihenfolge:

1. Aktuelle Projektregeln, Architektur, Seiten, Generatoren, Styles und Skripte prüfen; Referenzzustände von Kajak-Seite und Startseite sichern.
2. Gemeinsame Bausteine sowie sinnvolle Strukturunterschiede und unbeabsichtigte Abweichungen identifizieren.
3. Zentrale Gestaltung, Komponenten und Seitentemplates ableiten; den vorgesehenen Aufbau kurz dokumentieren.
4. Kajak-Seite als Referenz migrieren und vergleichen; anschließend Fahrzeugseite, Reiseberichte und weitere passende Unterseiten umstellen.
5. Unbenötigte Parallelimplementierungen nach erfolgreicher Umstellung entfernen und vollständige Prüfungen durchführen.

Bestehende Inhalte, Bilder, URLs, relevante Anker, interne Links, SEO-Metadaten und Funktionen erhalten. Keine Texte umschreiben oder Inhalte entfernen, nur damit sie in ein Template passen.

Nach Möglichkeit auf der vorhandenen technischen Grundlage aufbauen. Ein Framework-Wechsel ist nicht automatisch Teil dieses Auftrags. Sollte eine grundlegende Architekturänderung tatsächlich notwendig sein, den konkreten Bedarf und die Auswirkungen vor einem solchen Wechsel offenlegen.

## 9. Prüfung und Abnahmekriterien

Die Umstellung ist erst abgeschlossen, wenn die betroffenen bestehenden Seiten und die geschützte Startseite geprüft sind. Fehlende Prüfungen müssen ausdrücklich als offen ausgewiesen werden.

### 9.1 Darstellung und Bedienung

Prüfe repräsentative Ansichten beispielsweise bei 360, 390, 768, 1024 und 1440 CSS-Pixeln sowie die Übergänge zwischen den Layouts. Diese Werte sind Testgrößen, keine Vorgabe für die technische Festlegung der Umschaltpunkte.

Prüfe insbesondere:

- Kajak-, Fahrzeug- und Reiseberichtseiten sowie weitere migrierte Unterseiten.
- Startseite auf unveränderten Aufbau, Look and Feel und Funktionen.
- Mobile Menüs, aktive Navigationszustände, Links und Sprachumschaltung.
- Galerien, Bildvergrößerung, Schließen, Tastaturbedienung und vorhandene Touch-Funktionen.
- Hoch- und Querformat sowie kurze, lange und fehlende optionale Inhalte.
- Unbeabsichtigtes horizontales Scrollen, abgeschnittene Inhalte, Überlagerungen und unbedienbare Elemente.

Nutze reproduzierbare visuelle und funktionale Prüfungen passend zur vorhandenen Testumgebung. Zwischen Browser-Emulation und Tests auf tatsächlichen Geräten unterscheiden; keine Geräteprüfung behaupten, die nicht durchgeführt wurde.

### 9.2 Zentrale Änderungswirkung

Der wichtigste Abnahmetest lautet:

- Eine Änderung an der zentralen Navigation erscheint auf sämtlichen betroffenen Seiten ohne manuelle Einzeländerungen.
- Eine Änderung an der zentralen Galerie gilt für alle Instanzen dieser Galerie.
- Eine Änderung an einem Seitentemplate wird von allen Seiten dieses Typs übernommen.
- Dasselbe gilt ausdrücklich für mobile Navigation, mobile Galerie und mobile Template-Layouts.
- Die Startseite behält dabei ihre ausdrücklich geschützte Gestaltung beziehungsweise ihre definierte Komponentenvariante.

Diese Wirkung muss durch die tatsächliche Nutzung gemeinsamer Quellen nachgewiesen sein, nicht nur durch momentan ähnlich aussehende Kopien.

### 9.3 Neue Seiten

Dokumentiere und überprüfe, wie eine weitere Aktivitätsseite, Fahrzeugseite und ein weiterer Reisebericht aus dem jeweiligen Template mit neuen Inhalten entstehen. Dafür keine erfundenen öffentlichen Beispielseiten veröffentlichen; Beispiele können als Testdaten oder Dokumentation dienen.

## 10. Dauerhafte Verankerung im Repository

Dieser Auftrag darf nicht nur als Chatnachricht oder Erinnerung bestehen bleiben.

Lies vor Änderungen die aktuelle `AGENTS.md`, gegebenenfalls weitere für die betroffenen Verzeichnisse geltende Arbeitsregeln, die `README.md` und die relevanten Projektunterlagen.

Diese vollständige Spezifikation ist in `docs/responsive-templates.md` maßgeblich. Falls bereits eine inhaltlich entsprechende maßgebliche Spezifikation existiert, konsolidiere die Anforderungen dort und verwende überall denselben Verweis. Keine widersprüchlichen Parallelfassungen anlegen.

Geeigneter Regeltext für die bestehende `AGENTS.md`:

> Öffentliche Unterseiten verwenden zentrale responsive Komponenten und die vorgesehenen wiederverwendbaren Kajak-/Aktivitäts-, Fahrzeug- und Reisebericht-Templates. Gemeinsames Markup, CSS und Verhalten dürfen nicht pro Seite kopiert oder separat gepflegt werden. Die aktuelle Kajak-Seite ist die Gestaltungsreferenz. Die Regeln gelten auf Desktop, Tablet und Smartphone. Die Startseite behält ihr eigenständiges Layout und ihre bisherige Darstellung und Funktion auf allen Bildschirmgrößen; gemeinsame Komponenten dürfen sie nicht unbeabsichtigt verändern. Seitenspezifische Unterschiede werden über Inhalte, Konfiguration oder ausdrücklich definierte Varianten umgesetzt. Vor relevanten Änderungen die vollständige Spezifikation in `docs/responsive-templates.md` lesen und die dortigen Abnahmekriterien anwenden.

Den Auftrag und seinen tatsächlichen Fortschritt im bestehenden `docs/ausbauplan.md` verankern. Weitere tatsächlich betroffene Plan- oder Statusdokumente entsprechend den vorhandenen Projektregeln konsistent aktualisieren. Dokumentiert, implementiert, geprüft und live verifiziert nicht miteinander gleichsetzen.

Bestehende Projektregeln zu Fotos, Originaldateien, Sicherheit, Datenhaltung und Veröffentlichung bleiben wirksam. Diese technische Konsolidierung ist kein Auftrag, neue Bilder zu bearbeiten oder Bildarchive zu verändern.

## 11. Abschluss und Veröffentlichung

Die technische Umsetzung erfolgt im bestehenden Website-Arbeitsablauf. Beachte die aktuellen Projektregeln für Tests, Veröffentlichung, Live-Verifikation und das Schließen verwendeter Remote-Sitzungen. Ein fehlgeschlagener Test oder fehlender erforderlicher Zugriff ist konkret auszuweisen; keinen erfolgreichen Rollout behaupten.

Zum Abschluss angeben:

- Welche gemeinsamen Komponenten und Seitentemplates existieren und welche bestehenden Seiten sie tatsächlich verwenden.
- Wo globale Gestaltung, Navigation, Galeriefunktionen und einzelne Seiteninhalte gepflegt werden.
- Wie neue Seiten der drei Seitentypen erstellt werden.
- Welche Desktop-, Tablet- und Mobilprüfungen durchgeführt wurden und mit welchem Ergebnis.
- Ob die Startseite und die Kajak-Referenz unverändert erhalten geblieben sind; unvermeidbare oder offene Abweichungen konkret nennen.
- Welche Änderungen nur vorbereitet, im Repository gesichert oder bereits live verifiziert sind und welche Restarbeiten bestehen.

**Gesamtleitlinie:** Eine gemeinsame Designsprache, zentrale responsive Bausteine und wiederverwendbare Seitentemplates für die Unterseiten – auf Desktop, Tablet und Smartphone. Die Startseite bleibt eigenständig. Einmal zentral ändern, auf allen betroffenen Seiten übernehmen, ohne manuelle Einzelpflege.
