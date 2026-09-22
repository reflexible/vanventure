# VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board

Stand: 22. September 2026
Status: integrierte Planungsgrundlage – keine Implementierung

Der [verbindliche Gesamtplan](ausbauplan.md) führt alle offenen,
priorisierten Umsetzungsaufgaben. Dieses Dokument ist die detaillierte
Architektur- und Phasenreferenz für das Familien-Scrum-Board.

## 1. Entscheidung und Zielbild

Das private VanVenture Cockpit wird um ein familienfreundliches Scrum Board erweitert.
Es ist keine öffentliche Funktion von vanventure.at und kein Ersatz für das bestehende
YouTube-/Content-Cockpit. Beide Bereiche leben in derselben geschützten Anwendung,
teilen Anmeldung, Datenbank, Audit-Protokoll und Betrieb, bleiben aber fachlich getrennt.

Das Board ist die gemeinsame, permanent sichtbare Aufgabenfläche auf einem Tablet in der
Küche. Es verwaltet private To-dos, Aufgaben, Stories, Epics und Ideen. VanVenture meldet
technische Warnungen über einen definierten Kommunikationskanal an das Board. Marvin kann
auf ausdrücklichen Auftrag Backlog-Elemente anlegen und später Aufgaben verschieben.

Die verbindliche Board-Struktur ist:

| Zeile | Offen | Bereit | In Arbeit | Review | Done |
| --- | --- | --- | --- | --- | --- |
| **Fast Track** | dringende, neu eingegangene Karten | dringende, vorbereitete Karten | dringende, übernommene Karten | dringende Karten zur Prüfung | dringende, abgeschlossene Karten |
| **Scrum Board** | reguläre, eingeplante Karten | für die nächste Umsetzung vorbereitete Karten | regulär übernommene Karten | reguläre Karten zur Prüfung | regulär abgeschlossene Karten |

Das **Backlog** ist eine eigene Ansicht vor dem Board. Es enthält noch nicht eingeplante
Ideen, Epics, Stories und To-dos. Erst eine bewusste Planung bringt ein Item aus dem
Backlog in `Scrum Board → Offen`; hoch- oder kritisch priorisierte Items dürfen nach
`Fast Track → Offen` gelangen.

## 2. Architektur und Abgrenzung

Die bestehenden Leitentscheidungen des Cockpit-Plans bleiben bestehen:

- Die öffentliche, statische Website bleibt unverändert und enthält keine privaten
  Board-, Cockpit- oder Warnungsdaten.
- Das private Node.js-ESM-Backend, der Vanilla-JS-Client, PostgreSQL, Docker Compose,
  Caddy/HTTPS sowie die bestehende Anmeldung werden weiterverwendet.
- Es wird kein zusätzlicher Frontend-, Backend-, Queue- oder Authentifizierungsdienst
  für die erste Ausbaustufe eingeführt.
- Alle Board-Funktionen sind API-first unter `/api/cockpit`; das Tablet ist nur ein
  Client dieser API.
- Das Cockpit besitzt die Aufgaben- und Warnungskopien. VanVenture bleibt die
  fachliche Quelle für Fahrzeugzustand und die Ursache einer Fahrzeugwarnung.

```text
VanVenture Cockpit / Fahrzeuglogik
            │  signiertes Warnungsereignis
            ▼
Private Cockpit-API ──► Warnungs-Inbox ──► Scrum-Karte / Fast Track
            ▲                                      │
            │                                      ▼
         Marvin ────────────── Backlog / Board / Audit-Log
            │
            ▼
       Küchen-Tablet
```

Der Kommunikationskanal ist Teil der bisherigen Cockpit-Phase 4. Er muss vor
automatischem Erstellen von Fast-Track-Karten bereitstehen. Dadurch bleibt die
VanVenture-Fahrzeuglogik unabhängig von der Tablet-Oberfläche; bei einem Ausfall des
Boards werden Warnungsereignisse nachgeliefert, statt verloren zu gehen.

## 3. Fachliches Modell

### 3.1 Karten und Hierarchie

Eine Karte hat genau einen Typ:

| Typ | Zweck | Kann aufs Board? |
| --- | --- | --- |
| `epic` | größeres privates Projekt oder Vorhaben | nein, dient als Klammer |
| `story` | abgrenzbarer Teil eines Epics | bei Bedarf, bevorzugt als Planungsebene |
| `task` | konkrete Arbeit mit Ergebnis | ja |
| `todo` | kleine, direkt erledigbare Aufgabe | ja |
| `alert_task` | aus einer VanVenture-Warnung entstandene Aufgabe | ja, zunächst Fast Track |

Ein Epic kann Stories enthalten; Stories können Tasks und To-dos enthalten. Eine Karte
darf zusätzlich direkt einem Epic zugeordnet sein, falls eine Story keinen Mehrwert
bringt. Gelöschte Eltern löschen nie automatisch ihre Kinder; sie können nur archiviert
werden und benötigen vorher eine klare Zuordnungsentscheidung.

### 3.2 Pflicht- und Zusatzdaten einer Karte

Jede Karte enthält:

| Feld | Regel |
| --- | --- |
| Titel | Pflicht, kurz und handlungsorientiert |
| Typ | Pflicht: Epic, Story, Task, To-do oder Warnungs-Task |
| Priorität | Pflicht: `niedrig`, `normal`, `hoch`, `kritisch` |
| Erstelldatum | automatisch, unveränderbar |
| Fälligkeitsdatum | optional; bei Systemwarnungen aus der Warnung übernehmbar |
| Board-Zeile und Spalte | nur bei eingeplanten Task-/To-do-Karten |
| „In Arbeit von“ | leer bis zur Übernahme; beim Eintritt in `In Arbeit` gesetzt |
| Epic-/Story-Bezug | optional bzw. bei Unterelementen empfohlen |
| Beschreibung | optional; bei Warnungen inklusive verständlicher Handlungsempfehlung |
| Aktivitätsverlauf | automatisch: Erstellung, Änderungen, Verschiebungen, Übernahme, Abschluss |

Der angezeigte Name bei „In Arbeit von“ ist keine Leistungsanzeige. Es gibt keine
Startseite „Wer macht was?“. Der Name erscheint ausschließlich auf der Karte und im
Verlauf, damit klar ist, wer eine Aufgabe gerade übernommen hat.

### 3.3 Statusfluss und Regeln

Zulässige Bewegungen sind horizontal innerhalb der aktuellen Zeile:

`Offen → Bereit → In Arbeit → Review → Done`

Rückbewegungen sind erlaubt, etwa `Review → In Arbeit` bei einer nötigen Korrektur.
Eine Karte kann zwischen Scrum Board und Fast Track verschoben werden, wenn sich ihre
Priorität verändert. Das wird stets im Verlauf festgehalten.

- Beim Verschieben nach **In Arbeit** muss eine Person die Karte übernehmen. Der Name
  wird in `in_progress_by` gespeichert.
- Beim Verschieben aus **In Arbeit** bleibt die letzte übernehmende Person im Verlauf;
  das Feld „In Arbeit von“ wird bei Review und Done sichtbar als letzte Übernahme,
  aber nicht als aktuelle Zuweisung interpretiert.
- Eine Karte darf ohne Übernahme nicht in **In Arbeit** wechseln.
- **Review** bedeutet: die Arbeit ist fertig, aber eine Rückmeldung, Sichtprüfung oder
  Systemprüfung steht noch aus.
- **Done** verlangt eine bewusste Bestätigung. Bei Fahrzeugwarnungen kann die
  Systemauflösung als Hinweis erscheinen, ersetzt aber die Bestätigung nicht.
- Karten werden nicht sofort gelöscht. Sie werden nach einer noch festzulegenden
  Aufbewahrungsfrist archiviert; der Verlauf bleibt nachvollziehbar.

## 4. Backlog- und Planungsprozess

Das Backlog ist die einzige Auffangstelle für ungeplante Ideen. Marvin legt dort
standardmäßig an; auch manuelle Eingaben landen dort, wenn keine explizite Einplanung
gewünscht ist.

### Aus dem Backlog ins Board

1. Eine Person wählt im Backlog ein Task- oder To-do-Item aus.
2. Über „Auf Board ziehen“ oder Drag-and-drop wird die Zielzelle ausgewählt.
3. Standardziel ist `Scrum Board → Offen`. Für `hoch` oder `kritisch` kann bewusst
   `Fast Track → Offen` gewählt werden.
4. Vor dem Bestätigen zeigt das Tablet Priorität und Fälligkeit; fehlende Angaben
   dürfen ergänzt werden, bleiben aber außer Priorität optional.
5. Das Item erhält seine Board-Position, bleibt mit Story/Epic verknüpft und wird
   aus der Standard-Backlog-Liste ausgeblendet.

Das System verschiebt normale Backlog-Items niemals selbstständig aufs Board. Marvin
darf dies nur mit ausdrücklichem Auftrag tun, zum Beispiel: „Marvin, nimm Gasflasche
prüfen aus dem Backlog nach Fast Track, Offen.“

### Fast-Track-Regel

Fast Track ist für zeitkritische oder risikoreiche Aufgaben bestimmt, nicht für
allgemein wichtige Wünsche. Die automatische Zuweisung erfolgt nur bei einer
VanVenture-Warnung mit Schweregrad `hoch` oder `kritisch`. Manuelle Fast-Track-Karten
erfordern eine bewusste Prioritätswahl. Normal priorisierte Karten bleiben im Scrum
Board, auch wenn ein Fälligkeitsdatum nahe ist; die Oberfläche darf sie sichtbar
markieren, ohne den Fast Track zu entwerten.

## 5. VanVenture-Warnungskanal

### 5.1 Vertrag zwischen VanVenture und dem Board

VanVenture sendet ein versioniertes, zustellbares Ereignis an eine private,
authentifizierte API. Das Board bestätigt den Empfang erst, nachdem das Ereignis
persistent gespeichert wurde. Bei einem Netzfehler versucht VanVenture die Zustellung
erneut; Wiederholungen erzeugen keine Duplikate.

Pflichtfelder des Ereignisses:

```json
{
  "schema_version": 1,
  "event_id": "uuid",
  "occurred_at": "2026-09-22T10:30:00Z",
  "source": "vanventure-cockpit",
  "vehicle_id": "internal-id",
  "alert_key": "fresh-water-low",
  "severity": "info|normal|high|critical",
  "title": "Frischwassertank fast leer",
  "message": "Bitte vor der nächsten Abfahrt auffüllen.",
  "suggested_action": "Frischwasser auffüllen",
  "source_reference": "/cockpit/vehicle/alerts/…"
}
```

`event_id` ist einmalig. Die Kombination aus `source`, `vehicle_id` und `alert_key`
erlaubt zusätzlich, wiederkehrende Meldungen fachlich zusammenzuführen. Kein Ereignis
enthält Geheimnisse, Standortdaten oder mehr Fahrzeugdaten als für die Karte nötig.

### 5.2 Verarbeitung einer Warnung

| Schweregrad | Wirkung im Board |
| --- | --- |
| `info` | in der Warnungs-Inbox protokollieren; keine Karte |
| `normal` | Inbox-Eintrag; manuell als Karte übernehmbar |
| `high` | Fast Track → Offen, Priorität hoch |
| `critical` | Fast Track → Offen, Priorität kritisch und deutlich markiert |

Für eine noch offene Ursache aktualisiert ein weiteres Ereignis die vorhandene
Warnungs-Karte statt eine neue zu erzeugen. Eine VanVenture-Auflösung aktualisiert die
Warnung und vermerkt sie auf der Karte. Die Karte bleibt bis zur menschlichen
Bestätigung in Review oder Done. So verschwindet eine wichtige Aufgabe nicht, nur weil
ein Sensor kurzzeitig wieder normale Werte meldet.

### 5.3 Kanalabsicherung

- Service-zu-Service-Authentifizierung über einen separaten, rotierbaren Schlüssel
  oder Signaturverfahren; niemals über Browser-Sitzungen.
- HTTPS, strenge Payload-Validierung, Größenlimits und Rate Limits.
- Persistente Inbox mit Idempotenzschlüssel vor jeder Kartenmutation.
- Sichere Fehlermeldungen ohne Fahrzeug- oder Geheimnisdetails.
- Audit-Eintrag für Empfang, Duplikat, Kartenanlage, Aktualisierung und Auflösung.
- Monitoring alarmiert bei wiederholten Zustellfehlern oder einer wachsenden Inbox;
  der endgültige Benachrichtigungskanal wird vor Go-live festgelegt.

## 6. Marvin-Integration

Marvin ist ein berechtigter, nachvollziehbarer Akteur, aber kein autonomer Projektleiter.
Jede über Marvin ausgeführte Änderung erhält im Audit-Log und im Kartenverlauf den
Auslöser `marvin` und – soweit vorhanden – die Person, in deren Auftrag gehandelt wurde.

### Anfangsfreigabe (MVP)

Marvin darf:

- Epics, Stories, Tasks und To-dos im Backlog anlegen;
- Titel, Beschreibung, Priorität, Fälligkeit und Epic-/Story-Bezug aus einer klaren
  Anweisung übernehmen;
- nach einem expliziten Befehl ein Backlog-Item nach `Offen` verschieben;
- auf Nachfrage offene, überfällige und Fast-Track-Karten zusammenfassen.

Marvin darf zunächst nicht:

- ohne Auftrag Aufgaben aufs Board oder in den Fast Track verschieben;
- Personen automatisch als „In Arbeit von“ eintragen;
- Karten als Done markieren;
- Warnungen unterdrücken, löschen oder auflösen;
- Zugangsdaten, Tokens oder Rohdaten aus dem Cockpit sehen.

### Spätere Erweiterung nach Abnahme

Nach realer Nutzung kann Marvin zusätzliche, explizit bestätigte Aktionen erhalten:
eine Karte übernehmen, einen Review-Schritt vorschlagen oder einen täglichen Überblick
formulieren. Jede schreibende Marvin-Aktion braucht dabei eine eng begrenzte API-
Berechtigung und dieselbe Servervalidierung wie die Tablet-Oberfläche.

## 7. Datenmodell und APIs

Die bestehenden `yt_*`, Planner-, Context- und Audit-Tabellen bleiben erhalten. Für das
Board kommen Tabellen mit Präfix `scrum_` hinzu:

| Tabelle | Kernfelder | Zweck |
| --- | --- | --- |
| `scrum_items` | `id`, `type`, `title`, `description`, `priority`, `parent_id`, `created_at`, `due_date`, `archived_at` | Epics, Stories, Tasks und To-dos |
| `scrum_board_positions` | `item_id`, `lane`, `column`, `sort_order`, `moved_at`, `moved_by` | aktuelle Board-Position; `lane=fast_track|scrum` |
| `scrum_work_assignments` | `item_id`, `assignee_user_id`, `claimed_at`, `released_at`, `claimed_by` | aktuelle und historische Übernahmen |
| `scrum_item_events` | `id`, `item_id`, `actor_type`, `actor_id`, `action`, `before_safe`, `after_safe`, `created_at` | fachlicher, für Nutzer sichtbarer Verlauf |
| `scrum_alert_inbox` | `event_id`, `source`, `alert_key`, `vehicle_id`, `severity`, `payload_safe`, `received_at`, `status` | idempotente Warnungseingänge |
| `scrum_alert_links` | `inbox_event_id`, `item_id`, `resolution_state`, `last_source_update_at` | Zuordnung Warnung zu Karte |

Zentrale Board-Endpunkte:

| Zweck | Endpunkt | Rechte |
| --- | --- | --- |
| Backlog und Board lesen | `GET /api/cockpit/scrum/backlog`, `GET /api/cockpit/scrum/board` | angemeldet |
| Item anlegen/ändern | `POST /api/cockpit/scrum/items`, `PUT /api/cockpit/scrum/items/:id` | editor/admin; Marvin mit eingeschränktem Dienstrecht |
| Einplanen/verschieben | `POST /api/cockpit/scrum/items/:id/move` | editor/admin; Marvin nur mit erlaubtem Befehl |
| Übernehmen/freigeben | `POST /api/cockpit/scrum/items/:id/claim`, `…/release` | angemeldete, berechtigte Person |
| Verlauf lesen | `GET /api/cockpit/scrum/items/:id/events` | angemeldet |
| Warnung zustellen | `POST /api/cockpit/integrations/vanventure/alerts` | ausschließlich VanVenture-Dienstidentität |

Alle schreibenden Browser-Endpunkte verwenden Sitzung, CSRF-Schutz und serverseitige
Rollenprüfung. Endpunkte validieren zulässige Statuswechsel atomar. Ein Wechsel nach
`In Arbeit` legt Position und Übernahme in derselben Datenbanktransaktion an.

## 8. Tablet-Erlebnis

Das Küchen-Tablet zeigt direkt das Board, nicht Analytics und keine Personenstatistik.
Die Oberfläche ist im Querformat optimiert und aktualisiert sich automatisch über
kurzes Polling mit ETag/Versionierung; Echtzeit-Sockets sind keine MVP-Voraussetzung.

- Die Fast-Track-Zeile steht immer oben und bleibt optisch klar von der Scrum-Zeile
  getrennt.
- Beide Zeilen haben exakt die Spalten Offen, Bereit, In Arbeit, Review und Done.
- Jede Karte zeigt mindestens Titel, Priorität, Erstell- und ggf. Fälligkeitsdatum;
  bei übernommenen Karten zusätzlich dezent den Namen „In Arbeit von“.
- Große Karten, gut lesbare Schrift und Berührungsziele von mindestens 44 px.
- Verschieben per Drag-and-drop und als zugängliche Alternative über „Verschieben nach“.
- Fast-Track-Karten sind nur über Farbe plus Text/Icons unterscheidbar; Farbe allein
  ist nie die einzige Bedeutung.
- Detailansicht enthält Beschreibung, Epic/Story, Verlauf, Warnungsreferenz und
  Übernehmen-/Freigeben-Aktion.
- Ein schlichter Bildschirmschoner-/Kiosk-Modus darf das Board anzeigen; Schreibzugriff
  erfordert weiterhin eine bestehende Sitzung oder eine noch festzulegende lokale PIN.

## 9. Integrierter Phasenplan

### Phase 0 – Gemeinsame Festlegung

Ergänzung zur vorhandenen Google-/Cockpit-Vorbereitung:

1. Familienmitglieder, Anzeige-Namen und Zugriffsrechte festlegen.
2. Prioritätsdefinition, Fast-Track-Kriterien, Archivfrist und Review-Regeln bestätigen.
3. Kartenhierarchie und erste Beispiel-Epics/Stories fachlich prüfen; keine Datenanlage.
4. VanVenture-Warnungskatalog erstellen: Schlüssel, Schweregrad, Text und empfohlene
   Handlung pro Fahrzeugwarnung.
5. Kommunikationskanal, Dienstidentität, Schlüsselrotation, Zustellwiederholung und
   Betriebsverantwortung verbindlich festlegen.

**Abnahme:** Ein schriftlicher Ereignisvertrag und die Board-Regeln sind bestätigt.

### Phase 1 – Sichere Cockpit-Grundlage

Die bestehende Cockpit-Phase 1 wird unverändert umgesetzt: Authentifizierung,
Rollenmodell, Datenbankmigrationen, Audit-Log, Geheimnisablage und Testgrundlage.
Gleichzeitig werden die `scrum_*`-Migrationen vorbereitet, aber keine Marvin- oder
VanVenture-Schreibverbindung aktiviert.

**Abnahme:** Private Routen sind geschützt; die Datenbank kann Board-Daten und
Warnungs-Inbox atomar speichern; keine Geheimnisse erscheinen in Logs oder Clients.

### Phase 2 – Cockpit-Daten und Kommunikationskanal

Die vorhandene YouTube-Datenerfassung wird umgesetzt. Parallel, aber fachlich getrennt:

1. privaten Warnungsendpunkt, Authentifizierung, Inbox, Idempotenz und Auditierung bauen;
2. VanVenture-Sender mit Retry-Strategie und sicherer Empfangsbestätigung implementieren;
3. Testereignisse für Info, Normal, Hoch, Kritisch, Duplikat und Auflösung definieren;
4. Zustellfehler und lange nicht verarbeitete Warnungen in das Betriebsmonitoring aufnehmen.

**Abnahme:** Ein kritisches Testereignis wird nach einer Wiederholung genau einmal
persistent verarbeitet; ohne gültige Dienstidentität wird es abgewiesen.

### Phase 3 – Cockpit- und Board-Oberfläche

Ergänzung zur bestehenden Cockpit-Oberfläche:

1. Backlog, Board mit zwei Zeilen und Karten-Detailansicht entwickeln;
2. Erstellung, Bearbeitung, Einplanung, Verschiebung, Übernahme und Review/Done
   mit vollständigem Verlauf implementieren;
3. Tablet-Ansicht im Querformat und zugängliche Bedienalternativen umsetzen;
4. VanVenture-Warnung in Fast Track abbilden und deren Aktualisierung sichtbar machen;
5. Content Planner und Scrum Board getrennt lassen; nur freiwillige Verknüpfungen über
   Story/Epic erlauben, keine erzwungene Doppelpflege.

**Abnahme:** Eine Karte kann korrekt vom Backlog über Offen, Bereit, In Arbeit, Review
bis Done laufen; in In Arbeit ist eine Übernahme zwingend; beide Board-Zeilen bleiben
auf dem Tablet vollständig bedienbar.

### Phase 4 – Qualität, Betrieb und Benachrichtigungskanal

Die vorhandene Cockpit-Phase 4 wird um den zuvor geplanten Warnungskanal konkretisiert:

1. API-, Migrations-, Berechtigungs-, Transaktions-, Idempotenz- und UI-Tests ergänzen;
2. Recovery testen: Board-Ausfall, verzögerte Zustellung, Duplikat, falsche Signatur,
   Warnungsauflösung und Wiederherstellung aus Backup;
3. den tatsächlichen Benachrichtigungskanal für fehlgeschlagene Syncs und kritische,
   nicht zugestellte Warnungen aktivieren;
4. Datenschutz-/Sicherheitsprüfung, Backup/Restore und Tablet-Kiosk-Verhalten abnehmen;
5. erst dann auf dem Produktivsystem aktivieren.

**Abnahme:** Der Warnungskanal ist überwacht, kritisch fehlende Verarbeitung wird
gemeldet und ein Restore stellt Board, Inbox und Verlauf konsistent wieder her.

### Phase 5 – Marvin-MVP

1. Marvin erhält eine eigene, minimal berechtigte Dienstidentität.
2. Es werden ausschließlich Backlog-Anlage und explizit beauftragtes Einplanen aktiviert.
3. Natürliche Sprachbefehle werden in validierte, bestätigbare Kartenoperationen
   übersetzt; bei fehlenden Pflichtangaben fragt Marvin nach.
4. Alle Marvin-Aktionen werden mit Auftrag, Zeit und resultierender Änderung auditiert.
5. Eine begrenzte Pilotphase prüft Fehlzuordnungen und verständliche Rückfragen.

**Abnahme:** Marvin kann keine Karte stillschweigend abschließen, niemanden automatisch
übernehmen und keine Fast-Track-Warnung unterdrücken; erlaubte Anweisungen sind im
Verlauf eindeutig nachvollziehbar.

### Phase 6 – Stabilisierungs- und Erweiterungsentscheid

Nach mehreren Wochen realer Nutzung wird entschieden, ob Marvin zusätzliche,
bestätigte Aktionen erhalten soll und ob eine kompakte Verlaufs-/Monitoringansicht
wirklich gebraucht wird. Mögliche Ausbauten sind Erinnerungen an fällige Karten,
wiederkehrende Wartungsaufgaben und ein druckbarer Wochenüberblick. Sie gehören nicht
in das MVP und benötigen jeweils einen eigenen Datenschutz- und Bedienentscheid.

## 10. Test- und Abnahmekatalog

Vor Go-live sind mindestens folgende Szenarien automatisiert oder nachvollziehbar
manuell geprüft:

- unbefugter Zugriff auf Board-, Warnungs- und Marvin-Endpunkte wird abgewiesen;
- ein deaktiviertes Konto verliert auch den Boardzugriff sofort;
- Backlog-Elemente erscheinen erst nach bewusster Planung im Board;
- jede Spalte ist in beiden Zeilen erreichbar; unzulässige Bewegungen werden blockiert;
- nur eine übernehmende Person kann eine Karte gleichzeitig aktiv halten, sofern keine
  spätere Mehrfachübernahme bewusst eingeführt wird;
- beim Übergang nach In Arbeit werden Position, Name und Verlauf atomar gespeichert;
- Duplikate und Wiederholungen einer VanVenture-Warnung erzeugen keine zweite Karte;
- `high` und `critical` landen korrekt in Fast Track → Offen;
- eine Auflösung aus VanVenture beendet keine Karte ohne menschliche Done-Bestätigung;
- Marvin kann nur die erlaubten Endpunkte und Aktionen durchführen;
- Backup/Restore erhält Board-Positionen, Verknüpfungen, Warnungs-Inbox und Verlauf;
- Tablets zeigen ohne private Anmeldung keine Daten und bleiben bei Netzunterbrechung
  verständlich, ohne alte Daten als aktuell auszugeben.

## 11. Nicht Bestandteil dieser Ausbaustufe

- Öffentliche Anzeige des Boards oder Fahrzeugwarnungen auf vanventure.at.
- Automatische Aufgabenvergabe, Leistungsrankings oder eine „Wer macht was?“-Startansicht.
- Autonomes Verschieben oder Abschließen durch Marvin.
- Direkter Zugriff des Tablets oder von Marvin auf Fahrzeugsteuerung, Rohsensoren,
  OAuth-Tokens oder andere Geheimnisse.
- Push-Nachrichten an externe Dienste, bis der Benachrichtigungskanal in Phase 4
  ausdrücklich gewählt und abgesichert wurde.
- Austausch des bestehenden Cockpit- oder Content-Planner-Konzepts.

## 12. Nächster verbindlicher Schritt

Als nächstes wird ausschließlich Phase 0 fachlich abgeschlossen: Prioritäts- und
Fast-Track-Regeln, Warnungskatalog, Rollen sowie der Ereignisvertrag. Danach kann die
bestehende Cockpit-Phase 1 mit den vorbereiteten Board-Migrationen beginnen. Bis zu
dieser Abnahme werden weder Aufgaben, Warnungen noch Marvin-Schreibrechte produktiv
angelegt.
