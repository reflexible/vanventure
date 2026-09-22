# VanVenture Cockpit – technische Referenz

Stand: 22. September 2026 · Diese Datei beschreibt Architektur, Datenmodell und
API-Entscheidungen. Sie ist **kein aktiver Plan**: Erledigte und offene Arbeit
wird ausschließlich im [verbindlichen Gesamtplan](ausbauplan.md) geführt.
Historische Phasenbeschreibungen weiter unten erklären den Entstehungskontext,
ohne eigene Aufgaben oder Prioritäten zu setzen.

**Audit-V1-Stand (22. September 2026):** Der erste Abgleich umfasst 25 Videos:
zwei aktuelle Shorts, vier Legacy-Clips und 19 Longforms. Flow Trail führt mit
986 öffentlichen Gesamt-Views; Norwegen (108 Minuten) und Sardinien (38
Minuten) liefern die stärkste Watchtime der letzten 365 Tage. Trolltunga steht
bei 149 Views bis Tagesabschluss, davon 120 aus dem Shorts-Feed. Diese Werte
begründen drei getrennte Tests (VAN, EXPLORE, MOVE), keine automatische
Säulen-Gewichtung. Siehe [Channel Audit V1](channel-audit-v1.md).

## Zielbild

Das geschützte VanVenture Cockpit bündelt die YouTube-Performance, die redaktionelle
Planung und den inhaltlichen Kontext in einer privaten Oberfläche. Es ist kein Teil der
öffentlichen GitHub-Pages-Website. Nur explizit freigeschaltete Personen erhalten Zugriff.

Das Cockpit soll:

- den ausgewählten VanVenture-YouTube-Kanal nach einer **separat erteilten** Google-
  OAuth-Verbindung auslesen;
- YouTube-Data- und YouTube-Analytics-Daten wiederholbar und nachvollziehbar
  synchronisieren;
- tägliche historische Daten vorhalten und daraus Vergleiche für Tag 1, 7, 28, 90 und
  365 bilden;
- ein Dashboard, eine Videosicht, einen Jahres-Content-Plan mit ungefähr zwölf
  Longform-Videos, handlungsorientierte Insights und den VanVenture Master Context
  anbieten.

Die öffentliche Website bleibt statisch und erhält weder OAuth-Tokens noch
Analytics-Routen oder private Cockpit-Daten.

## Ausgangslage und Leitentscheidung

| Bereich | Vorhanden | Entscheidung für das Cockpit |
| --- | --- | --- |
| Öffentliche Website | Statisches HTML/CSS/JavaScript, GitHub Pages | Unverändert lassen. |
| Private Anwendung | Eigenes Node.js-ESM-HTTP-Backend in `editor/server.mjs` und Vanilla-JS-Client | Cockpit als zusätzliche, geschützte Route und API im selben Dienst entwickeln. |
| Datenhaltung | PostgreSQL 18 via `pg`; PGlite nur für Tests | Cockpit-Tabellen in derselben PostgreSQL-Datenbank, mit klaren Tabellenpräfixen. |
| Betrieb | Docker Compose, Caddy/HTTPS auf dem Contabo-Server in Produktion | Bestehendes Image und Compose weiterverwenden; kein weiterer Dienst für die erste Ausbaustufe. |
| Zugriffsmodell | Lokale Benutzer, Passwort-Hashes, HttpOnly/SameSite-Strict-Sitzung, CSRF, Rollen `admin`/`editor` | Das bestehende Muster konsequent erweitern. |

Es werden keine zusätzlichen Frontend-, Backend- oder Datenbank-Frameworks eingeführt.
Google-API-Aufrufe können mit der in Node vorhandenen `fetch`-Schnittstelle erfolgen.
Eine schlanke, explizit geprüfte OAuth-Implementierung ist bevorzugt; eine zusätzliche
Google-SDK-Abhängigkeit ist erst zu rechtfertigen, wenn sie Sicherheits- oder
Wartungsvorteile bringt, die der kleine eigene Client nicht sauber abdeckt.

## Grenzen und Annahmen

- Eine OAuth-Verbindung repräsentiert die berechtigte Google-/YouTube-Kanalinhaberin
  bzw. den Kanal, nicht den gerade im Cockpit angemeldeten Redaktionsbenutzer.
- Zu Beginn wird genau eine aktive Kanalverbindung unterstützt. Das Datenmodell bleibt
  mandantenfähig genug, um später mehrere Kanäle ergänzen zu können.
- Automatisch synchronisiert wird serverseitig; ein Browser muss dafür nicht geöffnet
  sein. Die konkrete Ausführung erfolgt zunächst durch einen Container-Job bzw. einen
  vom Hosting gesteuerten Zeitplan, nicht durch GitHub Pages.
- API-Quoten, nachträgliche Datenkorrekturen und der bei YouTube mögliche Verzug von
  Analytics-Daten werden protokolliert und in der Oberfläche kenntlich gemacht.

## Zugang, Allowlist und Rollen

Die bestehende Kontoverwaltung ist die Allowlist: Es gibt keine öffentliche
Registrierung, keine Einladungs-URL und keine Google-Anmeldung für Cockpit-Nutzer.
Administratorinnen legen erlaubte Konten an, deaktivieren sie und können Passwörter
zurücksetzen. Deaktivierung oder Passwortwechsel beendet vorhandene Sitzungen, wie
bereits in der Redaktion.

Vorgeschlagene Rechte (aufbauend auf den vorhandenen Rollen):

| Fähigkeit | `admin` | `editor` | optionale Rolle `analytics_viewer` |
| --- | --- | --- | --- |
| Dashboard, Videos, Insights lesen | ja | ja | ja |
| Content Planner und Master Context bearbeiten | ja | ja | nein |
| OAuth verbinden, trennen, Sync starten, Daten löschen | ja | nein | nein |
| Nutzer und Rollen verwalten | ja | nein | nein |
| Cockpit-Konfiguration ändern | ja | nein | nein |

`analytics_viewer` wird nur eingeführt, wenn ein echter Lesebedarf besteht. Bis dahin
bleiben die zwei vorhandenen Rollen ausreichend. Jede schreibende Cockpit-Route prüft
Sitzung, CSRF-Token und serverseitig die Berechtigung.

## Google-/YouTube-Integration

### Getrennte OAuth-Verbindung

1. Ein Administrator öffnet im Cockpit „YouTube verbinden“.
2. Der Server erzeugt einen einmaligen, kurzlebigen, an die Sitzung gebundenen
   `state`-Wert (mit PKCE) und leitet zu Google weiter.
3. Google leitet ausschließlich zur fest konfigurierten HTTPS-Callback-URL des
   Cockpits zurück. Der Server validiert `state` und PKCE, tauscht den Code serverseitig
   gegen Tokens und ermittelt den autorisierten Kanal.
4. Vor dem Aktivieren zeigt das Cockpit Kanalname und Kanal-ID zur Bestätigung an.
   Nur dieser Kanal wird als aktive Verbindung gespeichert.
5. Access Tokens werden bei Bedarf über den Refresh Token erneuert. Ein „Trennen“
   widerruft den Token, löscht verschlüsselte Token-Daten und deaktiviert Folge-Syncs.

Benötigte APIs und minimal mögliche Scopes werden vor Go-live gegen die aktuelle
Google-Dokumentation verifiziert:

- **YouTube Data API v3**: Kanal-, Playlist- und Video-Metadaten sowie öffentliche
  Video-Kennzahlen, typischerweise mit `youtube.readonly`.
- **YouTube Analytics API**: kanalbezogene Reichweiten-, Engagement-, Watchtime- und
  Traffic-Source-Berichte, typischerweise mit `yt-analytics.readonly`.

Die Google-OAuth-Client-ID ist Konfiguration; Client Secret und Refresh Token bleiben
serverseitig. Es gibt kein Token im Browser, in HTML, in Git, in Exporten oder in
Anwendungslogs.

### Wiederverwendbarer Sync

Der Sync besteht aus idempotenten Schritten und kann sowohl zeitgesteuert als auch
manuell von `admin` ausgeführt werden:

1. Sperre pro Kanal erwerben, damit nicht zwei Läufe parallel schreiben.
2. Verbindung und Token entschlüsseln/erneuern; bei fehlender Berechtigung den Lauf
   sicher abbrechen und als „Reconnect erforderlich“ markieren.
3. Kanal und Videos über die Data API seitenweise abrufen und per Upsert speichern.
4. Für den konfigurierten Zeitraum Analytics-Berichte abrufen; fehlende oder verspätete
   Tage beim nächsten Lauf erneut nachziehen (Lookback-Fenster mindestens 35 Tage).
5. Tageswerte, Video-Metriken und Laufmetadaten in einer Transaktion speichern.
6. Snapshot-Stichtage und Insight-Aggregate aktualisieren, Lauf mit Dauer, API-Fehlern,
   abgedecktem Zeitraum und Datensatzanzahl abschließen.

Der reguläre Rhythmus ist ein täglicher Lauf nach Verfügbarkeit der YouTube-Daten. Ein
manueller Lauf darf nur das sichere Nachzugsfenster bzw. explizit ausgewählte Daten
aktualisieren, nie Historie blind überschreiben. Wiederholte Läufe müssen dieselben
fachlichen Daten erzeugen, keine Duplikate.

## Historie und Snapshot-Logik

Die belastbare Basis ist ein tägliches Faktenarchiv, nicht nur berechnete Momentwerte.
Für jedes Video werden veröffentlichungsbezogene Kennzahlen täglich gespeichert. Bei
einer Videoabfrage zeigt das Cockpit standardmäßig den heutigen Stand und Vergleiche
zu den Altersstufen:

| Snapshot | Stichtag | Zweck |
| --- | --- | --- |
| Tag 1 | erster verfügbarer Tagesabschluss ab Veröffentlichung | Frühindikator für Start und CTR. |
| Tag 7 | siebter Tagesabschluss | Woche-1-Vergleich. |
| Tag 28 | 28. Tagesabschluss | belastbarerer Monatsvergleich. |
| Tag 90 | 90. Tagesabschluss | Evergreen- und Long-Tail-Bewertung. |
| Tag 365 | 365. Tagesabschluss | Jahresvergleich / Saisonwirkung. |

Ein Snapshot wird erst als vollständig markiert, wenn der entsprechende Tageswert
vorliegt. Ist ein Video jünger, bleibt der Wert sichtbar als „noch nicht erreicht“, nicht
als Null. Korrekturen von YouTube werden durch erneute Tages-Upserts abgebildet; die
Sync-Historie bewahrt, wann und mit welcher Quelle der Wert zuletzt aktualisiert wurde.

## Datenmodell (PostgreSQL)

Neue Tabellen verwenden den Präfix `yt_`; Namen sind Vorschläge für die spätere
Migration. Primärschlüssel, Foreign Keys, `created_at`/`updated_at` und sinnvolle
Indizes gehören verbindlich in die Migration.

| Tabelle | Kernfelder | Zweck |
| --- | --- | --- |
| `yt_connections` | `id`, `channel_id`, `channel_title`, `status`, `token_ciphertext`, `token_iv`, `token_tag`, `scopes`, `connected_by`, `connected_at`, `last_sync_at` | Aktive bzw. frühere, verschlüsselt gespeicherte Kanalverbindungen. |
| `yt_sync_runs` | `id`, `connection_id`, `kind`, `status`, `started_at`, `finished_at`, `from_date`, `to_date`, `records_written`, `error_code`, `error_detail_safe` | Nachvollziehbarkeit, Monitoring und Fehlersuche ohne Geheimnisse. |
| `yt_videos` | `video_id`, `connection_id`, `title`, `description`, `published_at`, `duration_seconds`, `privacy_status`, `thumbnail_url`, `metadata`, `last_seen_at` | Normalisierte Data-API-Metadaten; `video_id` eindeutig. |
| `yt_channel_daily_metrics` | `connection_id`, `metric_date`, `views`, `watch_time_minutes`, `subscribers_gained`, `subscribers_lost`, `estimated_revenue`, `metrics_json` | Tägliche Kanalwerte, eindeutig je Kanal/Datum. |
| `yt_video_daily_metrics` | `video_id`, `metric_date`, `views`, `watch_time_minutes`, `average_view_duration`, `impressions`, `impressions_ctr`, `likes`, `comments`, `metrics_json` | Tägliche Video-Kennzahlen, eindeutig je Video/Datum. |
| `yt_video_snapshots` | `video_id`, `age_days` (1/7/28/90/365), `snapshot_date`, `metrics_json`, `complete` | Materialisierte Vergleichsstichtage aus Tagesdaten. |
| `yt_sync_locks` | `connection_id`, `locked_until`, `run_id` | Datenbankgestützte Ausschluss-Sperre für Syncs. |
| `content_items` | `id`, `planned_year`, `slot`, `title_working`, `format`, `pillar`, `status`, `target_publish_date`, `youtube_video_id`, `brief`, `estimated_hours`, `actual_hours`, `owner`, `updated_by` | Editorialer Jahresplan; `format=longform` und zwölf nummerierte Slots sind der Standard. Stundenwerte machen die spätere Nutzen-pro-Stunde-Review nachvollziehbar. |
| `content_item_metrics` | `content_item_id`, `metric_name`, `target_value`, `actual_value`, `evaluated_at` | Ziele und Auswertung der geplanten Videos. |
| `master_context_entries` | `id`, `category`, `title`, `body`, `status`, `source_url`, `effective_from`, `effective_to`, `updated_by` | Versionierbare, redaktionell gepflegte Faktenbasis. |
| `cockpit_audit_log` | `id`, `actor`, `action`, `entity_type`, `entity_id`, `before_safe`, `after_safe`, `created_at` | Auditierbare Admin-, OAuth-, Sync- und Planungsaktionen ohne Token/Passwortwerte. |

`metrics_json` bewahrt API-Metriken, die noch nicht als eigene Spalte benötigt werden.
Häufig gefilterte Kernmetriken bleiben relationale Spalten. Für alle Tagesmetriken ist
ein Upsert-Schlüssel aus Entität und Datum verpflichtend.

## API-first-Architektur

Die Cockpit-Oberfläche konsumiert ausschließlich JSON-Endpunkte unter `/api/cockpit`.
HTML- und Client-Assets sind Präsentation, nicht die einzige Integrationsmöglichkeit.
Alle Antworten enthalten eine stabile Version bzw. bei Listen ein eindeutiges
Paginierungsformat; Zeitstempel sind ISO-8601 in UTC.

| Bereich | Beispielendpunkte | Berechtigung |
| --- | --- | --- |
| Status/Dashboard | `GET /api/cockpit/overview`, `GET /api/cockpit/health` | angemeldet |
| Videos | `GET /api/cockpit/videos`, `GET /api/cockpit/videos/:id`, `GET /api/cockpit/videos/:id/snapshots` | angemeldet |
| Planung | `GET/POST /api/cockpit/content`, `PUT /api/cockpit/content/:id` | lesen: angemeldet; schreiben: editor/admin |
| Master Context | `GET /api/cockpit/context`, `POST/PUT /api/cockpit/context/:id` | lesen: angemeldet; schreiben: editor/admin |
| OAuth | `POST /api/cockpit/youtube/connect`, `GET /api/cockpit/youtube/callback`, `POST /api/cockpit/youtube/disconnect` | admin |
| Synchronisierung | `GET /api/cockpit/sync-runs`, `POST /api/cockpit/sync` | lesen: angemeldet; starten: admin |

Der OAuth-Callback ist eine enge Ausnahme: Er validiert den kurzlebigen Serverzustand
und führt danach zurück in die private Oberfläche. Fehlerantworten zeigen keine
Google-Antwortdetails mit personenbezogenen oder geheimen Daten.

## Ansichten und fachlicher Umfang

### Dashboard

- Zeitraumfilter (z. B. 28/90/365 Tage) und Zeitpunkt der letzten erfolgreichen
  Synchronisierung.
- Kanal-KPIs: Views, Watchtime, Netto-Abonnenten, Impressionen/CTR und – nur wenn
  berechtigt und verfügbar – Umsatz.
- Entwicklung gegenüber dem vorherigen Vergleichszeitraum, Top-/Flop-Videos und
  Datenqualitäts-Hinweise.
- Nächste Inhalte aus dem Planner und offene Insight-Empfehlungen.

### Videos

- Filterbare Tabelle aller erkannten Videos mit Titel, Veröffentlichung, Format/Pillar,
  aktuellen Kennzahlen und Sync-Status.
- Jede Videozeile führt die Aktion „Einordnen“ als eigenständige, deutlich
  erkennbare und per Tastatur erreichbare Schaltfläche. **Am 22. September 2026
  live ausgerollt und technisch geprüft; die Sichtabnahme mit echten Daten bleibt
  offen.**
- Detailseite mit Zeitreihe, Traffic-/Engagement-Werten soweit von der API geliefert,
  sowie 1/7/28/90/365-Snapshot-Vergleich.
- Verknüpfung eines YouTube-Videos mit einem `content_items`-Eintrag, ohne Daten aus
  YouTube zurückzuschreiben.

### Content Planner

Pro Kalenderjahr werden zwölf Longform-Slots als Startgerüst angelegt: etwa einer pro
Monat, mit bewusst verschiebbaren Veröffentlichungsdaten. Jeder Eintrag enthält
Arbeitstitel, Zielgruppe, Themen-Pillar, Format, Ziel/KPI, Produktionsstatus,
Verantwortung, Brief und spätere YouTube-Verknüpfung. Mögliche Statusfolge:
`idea → validated → briefed → production → scheduled → published → reviewed`.
Kurzformate können ergänzend geplant werden, dürfen aber die Longform-Jahresplanung
nicht verdrängen.

### Insights

Insights sind nachvollziehbare Signale, keine undurchsichtigen Auto-Entscheidungen.
Beispiele: Videos mit ungewöhnlich hoher 28-Tage-Watchtime, Themen-Pillars mit
überdurchschnittlicher CTR, geplante Slots ohne Brief, fehlende Tag-7-Daten oder
Wachstum nach saisonalen Reisen. Jede Insight zeigt Zeitraum, zugrunde liegende
Metrik, Vergleichsbasis und Datenstand. Zunächst regelbasiert; KI-Zusammenfassungen
kommen erst später mit ausdrücklicher Freigabe und ohne automatisches Veröffentlichen.

### VanVenture Master Context

Der Context wird redaktionell strukturiert gepflegt und steht Planner, Insights sowie
späteren Assistenzfunktionen als freigegebene Faktenbasis bereit. Startkategorien:

- **Van / Hymer:** Fahrzeug, Umbauten, Ausstattung, Erfahrungen und Grenzen.
- **Reisen:** Ziele, Routen, Jahreszeiten, Stellplätze, Erlebnisse und wiederkehrende
  Fragen.
- **Outdoor:** Wandern, Campen, Natur- und Sicherheitswissen.
- **MTB** und **Kajak:** Ausrüstung, Touren, Können, Sicherheit und Ideen.
- **Hund:** Reisen mit Hund, Bedürfnisse, Regeln und bewährte Abläufe.
- **Mission Paris:** Zielbild, Zwischenetappen, Relevanz für Community und Storyline.

Jeder Eintrag erhält Status (Entwurf/freigegeben/archiviert), Quelle bzw. Beleg und
eine Aktualitätsangabe. Nur freigegebene Einträge dürfen später automatisiert in
Briefings oder KI-Kontexte einfließen.

## Datenschutz, Secrets und Betrieb

- Neue Geheimnisse: `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` und ein
  zweckgebundener Schlüssel zur Tokenverschlüsselung. Sie stehen nur in der privaten
  `.env`/Deployment-Konfiguration, nie in `.env.example` mit Wert, Git, Backups ohne
  Schutz oder Client-Code.
- Refresh Tokens werden mit dem vorhandenen, bewährten AES-256-GCM-Muster für private
  Einstellungen verschlüsselt; Verschlüsselungsschlüssel rotieren nur mit geplantem
  Re-Encryption-Verfahren.
- Datenminimierung: nur für Cockpit-Zwecke erforderliche Analytics, kein Abruf von
  Kommentarinhalten oder personenbezogenen Daten ohne neuen, dokumentierten Bedarf.
- Aufbewahrung: Rohmetriken und Audit-Logs erhalten eine vor Go-live beschlossene
  Frist; ein Admin-Export/Löschkonzept sowie ein Datenschutztext werden vor Produktiv-
  Betrieb ergänzt.
- Logs maskieren Authorization-Header, OAuth-Codes, Tokens, Secrets und vollständige
  externe Fehler-Payloads. Datenbankbackups bleiben wie bisher geschützt.
- Die private Route bleibt hinter HTTPS; keine Cache-Control-Weitergabe privater API-
  Antworten an Proxies. Rate Limits für Login und OAuth-Start bleiben bzw. werden
  erweitert.

### Website-Rechtstexte und Google-Produktionsfreigabe

Vor einer Umstellung der externen Google-OAuth-Anwendung von **Test** auf
**Produktion** werden auf `https://vanventure.at` öffentlich erreichbare Seiten für
Datenschutzerklärung und Nutzungsbedingungen erstellt. Die konkreten URLs werden
erst nach redaktioneller und rechtlicher Freigabe in Google Auth Platform hinterlegt.
Sie dürfen weder Platzhalter noch nicht veröffentlichte Seiten sein.

Der Entwurf der Datenschutzerklärung behandelt mindestens den Zweck der privaten
YouTube-Auswertung, die verwendeten Google-/YouTube-Leseberechtigungen, die
verschlüsselte serverseitige Ablage des Refresh-Tokens, die Datenminimierung,
Aufbewahrungs- und Löschregeln sowie eine Kontaktmöglichkeit. Die
Nutzungsbedingungen beschreiben den privaten, rollenbasierten Zugang zum Cockpit.
Beide Texte werden vor Veröffentlichung rechtlich geprüft; der technische Plan
ersetzt keine Rechtsberatung.

Für die Google-Veröffentlichung werden außerdem App-Name, Support- und
Entwickler-Kontakt, Homepage, autorisierte Domain `vanventure.at` und die
tatsächlich angeforderten Scopes geprüft. Eine erforderliche Domainbestätigung und
eine gegebenenfalls von Google verlangte OAuth-/Scope-Verifizierung werden vor der
Umstellung abgeschlossen. Bis dahin bleibt die Anwendung im Testmodus; die
Testnutzer- und erneute Freigabe-Regeln werden berücksichtigt.

## Phasenplan

### Phase 0 – Festlegung und Google-Vorbereitung

1. Verantwortliche Google-Kanalinhaberin, gewünschte Kennzahlen, Regionen/Währung und
   Datenaufbewahrung verbindlich festlegen.
2. OAuth-Consent-Screen, Produktions-Redirect-URI und minimale Scopes konfigurieren;
   Datenschutz-/Nutzungsanforderungen von Google prüfen.
3. Cockpit-URL und Ausführungsort des täglichen Jobs im bestehenden Docker/Contabo-
   Betrieb festlegen.

### Phase 1 – Sichere Grundlage

1. Datenbankmigrationen für `yt_*`, Planner, Context und Audit-Log erstellen;
   Upserts, Fremdschlüssel und Indizes testen.
2. Bestehendes Auth-/CSRF-/Rollenmodell für `/cockpit` und `/api/cockpit/*`
   wiederverwenden; Rechte-Matrix automatisiert testen.
3. Verschlüsselte Geheimnis-/Tokenablage, Konfigurationsvalidierung und sichere
   Logmaskierung implementieren.
4. OAuth Connect, Callback, Kanalbestätigung, Reconnect und Disconnect umsetzen und
   gegen ungültigen State, Tokenverlust sowie falschen Kanal testen.

### Phase 2 – Datenerfassung und Historie

1. Data-API- und Analytics-API-Adapter mit Paginierung, Rate-/Retry-Strategie und
   klaren, testbaren Response-Mappings implementieren.
2. Idempotenten Sync-Runner, Datenbanksperre, Sync-Run-Protokoll und täglichen
   Zeitplan ergänzen.
3. Tagesmetriken, 35+-Tage-Nachzugsfenster und Snapshot-Materialisierung implementieren.
4. Staging-/Testkanal gegen Quoten, Zeitzonen, fehlende Analytics und Datenkorrekturen
   prüfen; kein Live-Token in Tests verwenden.

### Phase 3 – Cockpit-Oberfläche

**Produktionsstand, 22. September 2026:** Die Oberfläche ist umgesetzt. Der
VAN-Planer-Eintrag „GCS nach einem Jahr“ steht auf `briefed`, enthält den
verbindlichen Brief und 24 geschätzte Stunden; zehn freigegebene GCS-Fakten
sind im Master Context gespeichert. Die technischen Restaufgaben und die zwei
noch ungebriesten Tests stehen ausschließlich im [Gesamtplan](ausbauplan.md).

1. Vanilla-JS-Ansichten für Dashboard, Videos, Sync-Status und Fehlerzustände bauen.
2. Content Planner mit Jahresansicht, zwölf Longform-Startslots, Statusfluss und
   Videoverknüpfung ergänzen.
3. Master Context mit Kategorien, Freigabestatus und Quellen umsetzen.
4. Regelbasierte Insights mit sichtbarer Berechnungsgrundlage hinzufügen.

### Phase 4 – Qualität und Betrieb

1. API-, Migrations-, Berechtigungs-, OAuth-State-, Tokenverschlüsselungs- und
   Sync-Idempotenztests ergänzen; bestehendes `npm test` erweitern.
2. Backup/Restore für neue Tabellen testen und eine datensparsame Admin-Löschroutine
   spezifizieren bzw. implementieren.
3. Monitoring für fehlgeschlagene Syncs, abgelaufene Verbindung und lange fehlende
   Daten einrichten; Benachrichtigungskanal bewusst festlegen.
4. Erst nach Datenschutz-, Sicherheits- und fachlicher Abnahme auf Contabo aktivieren.

### Phase 5 – Channel Audit & Content Intelligence

**Status vom 22. September 2026:** Die Impressions-/CTR-Implementierung ist live:
das Cockpit verwendet den offiziellen täglichen YouTube-Reporting-Job
`channel_reach_basic_a1`, behandelt fehlende Werte als nicht verfügbar und
blockiert den Kern-Sync nicht. Es ist dafür kein weiterer Code zu implementieren.
YouTube hat den ersten Tagesreport noch nicht geliefert; dessen automatische
Einlesung und fachliche Abnahme bleiben als externer Wartepunkt offen.

1. **Implementiert:** Video-Impressions/CTR über den Reporting-Export erfassen.
   Traffic Sources und verfügbare Retention-/Engagement-Serien mit Zeitraum und
   API-Grenzen anzeigen. Nicht unterstützte optionale Analytics-Abfragen dürfen
   den Kern-Sync nie blockieren.
2. **Offen, extern abhängig:** Den ersten von YouTube bereitgestellten
   Reach-Tagesreport einlesen und die Werte im Cockpit abnehmen. Erst dann CTR
   und Impressions in einem Audit V2 bewerten.
3. Die Short-/Longform-Klassifikation absichern und im Planner geschätzte sowie
   tatsächliche Produktionsstunden für spätere Effizienzvergleiche erfassen.
   **Umgesetzt und live am 22. September 2026:** Beide Stundenfelder sind
   additiv migriert, validiert und im Planner sichtbar; die Kennzahl folgt erst
   mit tatsächlichen Veröffentlichungsdaten.
4. Eine Audit-Ansicht mit Vergleichsgruppen, Datenqualitätsstatus,
   Long-Tail-/Alterslogik und Snapshot-Vergleich umsetzen.
5. ~~**Erledigt und am 22. September 2026 live verifiziert:** Der Cockpit-Button
   „Channel Audit exportieren“ erzeugt einen authentifizierten, versionierten
   JSON-Download (Schema V2) mit expliziter Feldliste und Datenstand. Er enthält
   keine Tokens, Secrets, Sitzungen oder Kontodaten; anonyme Abrufe erhalten
   HTTP 401. CSV bleibt optional und nicht kanonisch.~~
6. Den wiederkehrenden Ablauf dokumentieren: Export → Audit → geprüfte Erkenntnisse
   in Insights, Planner und Master Context übernehmen. Es gibt keine automatische
   Rückschreibung nach YouTube oder ungeprüfte Übernahme.

## Akzeptanzkriterien für die spätere Umsetzung

- Ohne erlaubtes, aktives Konto sind Cockpit-HTML und sämtliche Cockpit-APIs nicht
  lesbar; deaktivierte Konten verlieren ihren Zugriff sofort.
- Nur Administratoren können eine Google-Verbindung ändern oder eine Synchronisierung
  starten; die Kanal-OAuth-Verbindung ist unabhängig vom Nutzer-Login gespeichert.
- Ein wiederholter Sync erzeugt keine doppelten Tageswerte oder Snapshots und ist im
  Sync-Protokoll nachvollziehbar.
- Ein Video zeigt nach Verfügbarkeit korrekte, klar als vollständig/unvollständig
  markierte 1/7/28/90/365-Stände.
- Ein authentifizierter Channel-Audit-Export liefert mindestens
  `schema_version`, `generated_at`, `as_of`, Kanal-, Video-, Kennzahlen-,
  Snapshot-, Zuordnungs- und Datenqualitätsdaten. Er enthält keine Tokens,
  Secrets, Nutzer-/Kontodaten oder Sitzungen.
- Audit-Vergleiche trennen Shorts und Longform; CTR-, Retention- und
  Traffic-Source-Schlussfolgerungen sind bei fehlender oder API-seitig
  eingeschränkter Datenlage klar als vorläufig markiert oder unterdrückt.
- Dashboard, Videos, Planner, Insights und Master Context arbeiten vollständig mit der
  privaten API; die öffentliche GitHub-Pages-Ausgabe enthält keine Cockpitdaten.
- Geheimnisse und Tokens erscheinen weder im Repository noch in Browserantworten,
  Logs, Tests oder öffentlichen Deployments.

## Nicht Bestandteil dieses Plans

- Öffentliche Veröffentlichung von Analytics, automatische Video-Uploads, Änderungen
  an der GitHub-Pages-Seite oder Rückschreiben in YouTube.
- Neue externe Analyse-, Authentifizierungs-, Queue- oder Frontend-Plattformen.
- Automatische KI-Entscheidungen oder die Übermittlung des Master Context an Dritte
  ohne separate Produktentscheidung und Datenschutzevaluierung.
