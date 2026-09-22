# VanVenture – verbindlicher Gesamtplan

Stand: 22. September 2026  
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
| Datenqualität | Traffic Sources für 19 Videos; Retention nur für Trolltunga und Norwegen; Reach-Report noch ausständig | Keine Säulen-Gewichtung und keine CTR-/Impressionsentscheidung ableiten. |

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
  anwenden.~~ Die fünf klar als „in Vorbereitung“ markierten Radprofile sind
  bis zur Auswahl freigegebener Originalbilder und Fakten die einzige
  dokumentierte, vorläufige Ausnahme.

Der Hero-, Galerie- und Link-Standard ist für die bestehenden öffentlichen
Seiten umgesetzt und live geprüft. Offen bleiben ausschließlich die fünf
explizit als unvollständig markierten Radprofile; ihre Galerie-Ausnahme gilt
nur bis zur Auswahl freigegebener Originalbilder und Fakten.

Der [Design Guide V1](design-guide.md) ist am 22. September 2026 freigegeben
worden und gilt für alle öffentlichen Seiten. Bei jeder gestalterischen
Änderung wird geprüft und ausdrücklich darauf hingewiesen, ob der Guide ergänzt
werden soll. Der Kajak-Hero und die Kajak-Galerie sind live. Auswahl, Herkunft und
Kennzeichenredaktion der 11 veröffentlichten Galeriebilder sind dokumentiert;
die zwei Bilder mit Kindern von hinten sind für diese Galerie ausdrücklich
freigegeben. Die Galerie wurde am 22. September 2026 nach dem letzten
Webdienst-Rollout live verifiziert.
Nach einer beim Hero-Umbau entdeckten Regression ist die Galerie wiederhergestellt;
eine automatisierte Inhaltsprüfung sichert seitdem alle sieben öffentlichen
Seiten mit ihren freigegebenen Kernmodulen, Galerien, Kachelzahlen, Bilddateien,
Canonical-Links und internen Seitenlinks gegen stillschweigende Entfernung ab.
Die am 22. September ergänzte Galerie-Pflicht ist im freigegebenen Design Guide
und diesem Gesamtplan festgehalten. Sie ist auf Kajak, Fahrzeug,
Ausrüstungsübersicht, Radübersicht und Reisegalerien live umgesetzt; die fünf
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
Galerie für genau diese fünf Profile ausdrücklich und vorläufig erlaubt. Die
Übersicht, die Radseite und alle fünf Profile wurden nach Webdienst-Neustart
auf `https://vanventure.at` mit HTTP 200 geprüft.

**Mobil-Hero-Rollout, 22. September 2026:** Die responsive Lesefläche für
Startseite, Fahrzeug, Reiseberichte und Kajak ist live. Sie schaltet bis
600 CSS-Pixel im Hochformat um, hält die Hero-Texte außerhalb des Bildbereichs
und beseitigt den horizontalen Überlauf der Startseite. Nach dem gezielten
Webdienst-Neustart wurden `/healthz`, Startseite und Kajakseite intern sowie
die öffentliche Startseite in S24-Breite geprüft. PostgreSQL und Caddy blieben
ohne Neustart. Design Guide V1 ist freigegeben; der Hero-Standard ist auf allen
bestehenden öffentlichen Inhaltsseiten umgesetzt. Die fünf Radprofile bleiben
bis zur Bild- und Faktenfreigabe die dokumentierte Galerie-Ausnahme.

### 1B. Englische Redaktionstexte auf den älteren Unterseiten ergänzen

- ~~Die Seiten Bike, Kajak und Riverstar vollständig mit abgestimmten
  englischen Redaktionstexten ausstatten.~~ Die EN-Schaltfläche schaltet auf
  `kajak.html`, `ausruestung.html` und `bike.html` die vollständigen
  redaktionellen Inhalte, nicht nur die Navigation. Die Sprachwahl bleibt
  gespeichert; Rückwechsel auf Deutsch ist live geprüft. Die englische
  Riverstar-Fassung ist die öffentliche Kajakseite `kajak.html`.

### 2. Aus den Analysewerten echte Test-Briefs machen

- ~~Für den VAN-Test „GCS nach einem Jahr“ Zielgruppe, Nutzenversprechen,
  Format, Ziel/KPI, geschätzte Stunden und Verwertung verbindlich festlegen.~~
  Der vollständige [Production Brief](production-briefs/gcs-nach-einem-jahr.md)
  ist im Live-Planner als `briefed` mit 24 geschätzten Stunden hinterlegt.
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
- [ ] Den ersten YouTube-Reach-Report abnehmen; Impressions und CTR erst bei
  positiven oder echten Nullwerten als Daten bewerten.
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
