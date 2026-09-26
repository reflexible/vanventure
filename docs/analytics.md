# VanVenture Analytics – fachliche und technische Vorgaben

**Historischer Nachweisstand vom 25. September 2026:** **Status: beauftragt und dokumentiert;
Bestandsanalyse, technische Umsetzung und Live-Abnahme offen.** Die frühere
[Ausbauplan](ausbauplan.md)-Liste mit den Kennungen `ANALYTICS 0–8` bleibt ein
historischer Detailnachweis. Der zentrale Scrum-Plan und das verknüpfte
Execution Backlog steuern die aktive Umsetzung. Dieses Dokument hält den vom
Nutzer gelieferten Detailplan als fachliche Referenz fest. Konkrete Dateipfade und
Betriebsentscheidungen werden erst nach ANALYTICS 0 festgelegt.

## Ziel und Architekturgrenze

Website, Templates, Reiseberichte, Galerien und CMS-Komponenten verwenden
ausschließlich eine zentrale VanVenture-API wie `analytics.pageView()` und
`analytics.track()`. VanVenture definiert die Bedeutung seiner Events.
Provider-spezifische Aufrufe, insbesondere `umami.track`, `_paq` und `gtag`,
sind außerhalb der Provider-Adapter verboten. Providerwahl erfolgt zentral per
Konfiguration. Pflichtadapter sind Null und zunächst Umami; Matomo, GA4 oder
eine eigene Lösung sollen später ohne Änderungen an Content-Komponenten
einsetzbar sein. Ein zeitlich begrenzter Parallelbetrieb ist als
Migrationsmöglichkeit vorzusehen, aber kein Standardbetrieb.

Vor Implementierung sind Projektstruktur, Routing, Generatoren, bestehendes
Tracking, Authentifizierung/Rollen, CMS- und Content-Status, Draft/Preview,
Publishing, Umgebungen, Datenbank, Docker, CSP, Tests, Datenschutzlogik und
geltende Projektregeln zu analysieren. Der Bestand, Integrationspunkte,
Konflikte, wiederverwendbare Funktionen, konkrete Dateistruktur und nötige
Änderungen sind zu dokumentieren. Bestehende Architektur wird erweitert,
nicht durch ein paralleles System ersetzt.

## Tracking-Policy und Provider

Tracking ist nur zulässig, wenn **alle** Bedingungen erfüllt sind:
Production, öffentliche Website, anonymer Besucher, veröffentlichter Inhalt,
kein Preview/CMS/Admin-Bereich und Analytics aktiviert. Eingeloggte Admins
oder Editoren bleiben auch auf öffentlichen Seiten ungetrackt. Drafts,
geplante Seiten, Tests, localhost und Development werden nicht getrackt;
Staging ist standardmäßig aus. In ausgeschlossenen Fällen lädt nach
Möglichkeit nicht einmal das externe Script und es wird keine Anfrage an den
Provider gesendet. Der Null-Provider macht keine Netzwerkanfrage und speichert
nichts. Provider, Aktivierung und Umami-Konfiguration werden zentral über
Environment gesteuert; keine Secrets in Git, Browser-Code oder Dokumentation.

Der Analytics-Core prüft Policy, gültige Eventnamen und Properties, entfernt
sensible Daten, normalisiert URL und Kontext und übergibt erst dann an den
gewählten Adapter. Umami Identify und persönliche Besucherprofile werden nicht
verwendet. Automatische Umami-Pageviews sind so zu behandeln, dass VanVenture
den `page_view` allein auslöst und keine doppelten Aufrufe entstehen.

## Event Schema v1

Namen sind stabil, eindeutig, englisch, klein geschrieben und `snake_case`.
Jedes Event trägt `schema_version: 1`. Bei einer grundlegenden Änderung wird
die Version erhöht; bestehende Namen werden möglichst beibehalten.
VanVenture erlaubt nur zentral definierte Namen und Properties, keine frei
übernommenen Strings aus Komponenten oder Benutzereingaben. Unbekannte
Properties werden verworfen oder abgelehnt; Werte erhalten Typ- und
Längenbegrenzungen.

Der erste Katalog umfasst `page_view`, `article_50_percent`,
`article_90_percent`, `related_content_click`, `gallery_open`,
`gallery_image_view`, `video_start`, `youtube_click`, `instagram_click`,
`facebook_click`, `gear_click`, `cta_click`, `language_switch` und
`error_404_view`. `gallery_image_view` wird nur bei begründetem Nutzen und
vertretbarem Volumen aktiviert. Lesetiefe-Ereignisse gelten nur für passende
Artikel und jeweils einmal pro Page View. Kein Event für jeden Scrollschritt,
Swipe, Hover oder jede Mausbewegung. `video_start` setzt einen tatsächlich
erkennbaren Start voraus; YouTube-Embed und Consent sind separat zu prüfen.

Der kontrollierte Kontext kann `content_id`, `content_type`, `section`,
`route`, `language`, `destination_type`, `destination_id`, `campaign`,
`source`, `medium`, `placement` und `schema_version` enthalten. Relevante
veröffentlichte Inhalte erhalten eine stabile `content_id`, bevorzugt aus
der bestehenden Content-/CMS-Struktur; ein URL-Wechsel ändert diese ID nicht.
Es entsteht keine zweite parallele Content-ID-Verwaltung.

## Datenschutz, URL und Kampagnen

Namen, E-Mail, Login, interne User- und Google-IDs, IP als Event-Property,
Formularinhalte, Kommentare, persönliche Suchtexte, Freitext und
Authentifizierungsdaten werden nie als Analytics-Properties übertragen. Keine
Fingerprints, Profile, Cross-Site-Verfolgung, versteckte Methoden oder
Adblocker-Umgehung. Der Betrieb und die Website-Rechtstexte sind vor der
Produktivschaltung anhand der konkreten Umami-Konfiguration zu prüfen.

URLs werden zentral normalisiert; `window.location.href` wird nicht blind
übertragen. Unbekannte oder sensible Query-Parameter entfallen. Der
UTM-Standard unterstützt `utm_source`, `utm_medium`, `utm_campaign` und
`utm_content` über einen zentralen Helper. Werte sind kurz, stabil, klein
geschrieben, ohne Leerzeichen und ohne personenbezogene Daten. Für dieselbe
Kampagne wird derselbe Kampagnenname auf Instagram, Facebook, YouTube und QR
verwendet, zum Beispiel `sardinia_movie`.

## Betrieb, Nachweise und Grenzen

Analytics lädt asynchron und außerhalb des kritischen Rendering-Pfads. UI
und Navigation warten nie auf den Provider; sein Ausfall darf die Website
nicht beeinträchtigen. CSP wird nur um notwendige Domains erweitert, niemals
pauschal mit `script-src *` oder `connect-src *` geöffnet.

Unit-Tests prüfen Policy, Event/Property-Validierung, Kontext,
URL-Sanitizing, UTM-Normalisierung, Providerwahl, Null- und Umami-Mapping.
Integration und E2E prüfen erlaubte öffentliche anonyme Aufrufe sowie
ausgeschlossene Login-, CMS-, Draft-, Planned-, Preview-, localhost-,
Development-, Test- und Staging-Fälle auf **fehlendes Script und fehlende
externe Netzwerkanfrage**. Ein Architekturtest verbietet direkte
Provider-APIs außerhalb der Adapter. Providerwechsel muss mit Testadapter
ohne Content-Änderung nachweisbar sein.

Reporting soll Seitenreichweite, Lesetiefe, Wege zu YouTube/Related Content,
Social- und Kampagnenquellen, Ausrüstungsinteresse, mobile Landingpages und
VAN/BIKE/KAYAK/EXPLORE-Inhalte auswertbar machen. Umami-Goals werden sparsam
gewählt; Funnels bleiben Provider-Konfiguration. Search Console und ein
mögliches Cloudflare-Performance-Monitoring bleiben technisch getrennt.
Eigene anonyme Tagesaggregate in PostgreSQL sind nur eine spätere
Entscheidung, keine Anforderung der ersten Implementierung. Session Replay,
Heatmaps, Fingerprinting, Nutzerprofile, Cross-Site-Tracking, vollständige
Rohdatenplattform und Machine-Learning-Auswertung gehören nicht dazu.

Analytics ändert weder Design noch Templates, Publishing, Authentifizierung,
Rollen, Bilder oder Originalschutz. Bestehende Freigaben und der reguläre
Release-Prozess gelten weiter.

## Governance-Integration und Aktivierungssperre (26.09.2026)

Der Nutzer hat für den SoT-Umbau ausdrücklich entschieden: **Vertrag absichern;
spätere Aktivierung sperren.** Dieser Umsetzungsslice ergänzt keine Website-
Analytics-Funktion. Der oben dokumentierte fachliche Produktauftrag bleibt erhalten.

`ANALYTICS-CONTENT-ID` bleibt als bestehender versionierter Contract verbindlich.
Sein aufgeschobener Integrationszustand heißt `DEFERRED_INACTIVE`; das ist keine
Laufzeitabnahme. Solange der tatsächliche Analytics-Adapter und die erforderlichen
Integrationsprüfungen fehlen, gilt `ACTIVATION_BLOCKED`. Lokale Contract- oder
Metadatentests, ein manuell gesetzter PASS-Wert und synthetische Beispieldaten
ersetzen diese Prüfungen nicht. Die spätere Implementierung muss die oben
beschriebenen Policy-, Content-ID-, Datenschutz-, Provider- und Netzwerktests
gegen ihre tatsächliche Laufzeitgrenze nachweisen, bevor das Gate geöffnet wird.

Die lokale Sperre wird durch
[`assessAnalyticsActivation`](../tools/sot/analytics-activation-gate.mjs) geprüft.
Der [zentrale Scrum-Plan](scrum-plan.md) bleibt die zentrale Planquelle; dieser
SoT-Slice wird unter WI-SOT-04-10 im zugeordneten
[Execution Backlog](governance/source-of-truth-and-incremental-planning.md) geführt.
Die historische Liste ANALYTICS0–8 oben dokumentiert den früheren Produktauftrag;
sie ist kein neuer paralleler Gesamtplan für diesen Umbau. Das historische
Planwechsel-Gate wird durch diese Fachergänzung nicht vorweggenommen.

[Entscheidungsnachweis](sot-optimization/sources/analytics-scope-decision-2026-09-26.json).
