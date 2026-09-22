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
- [ ] Automatisiert prüfen: gültige Anmeldung per Google und nicht freigegebenes
  Konto nach Anlage des separaten OAuth-Webclients live abnehmen. Wechsel
  Redaktion ↔ Cockpit, CSRF-Schutz, Abmeldung sowie sofortige Ungültigkeit
  nach Sperrung oder Rollenänderung sind automatisiert für die gemeinsame
  serverseitige Sitzung geprüft. **Live offen:** echter Login mit einem
  freigegebenen und einem nicht freigegebenen Google-Konto abnehmen.

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
Auf jeder öffentlichen Seite stehen die Sprachumschaltung und der Login direkt
nebeneinander. Die mobile Navigation liegt als eigene, kontrastreiche Ebene über
dem Hero-Bild und bleibt bei kleinen Viewports ohne sichtbaren Scrollbalken
bedienbar.

### 1A. Einheitlichen Design Guide und Hero-Standard etablieren

- [ ] Den Kajak-Hero als Referenzseite mit dem vom Team ausgewählten,
  gespiegelten Webbild (Boot rechts), Farbverlauf und Einleitung umsetzen.
- [ ] Den dokumentierten Hero-Standard anschließend auf die verbleibenden
  öffentlichen Unterseiten anwenden und je Ansicht prüfen.

Der [Design Guide V1](design-guide.md) liegt zur Freigabe vor. Der Kajak-Hero
ist live; die Kajak-Galerie ist lokal fertig vorbereitet. Auswahl, Herkunft und
Kennzeichenredaktion der 11 veröffentlichten Galeriebilder sind dokumentiert;
Bilder mit Kindern bleiben bis zu einer ausdrücklichen Freigabe ausgeschlossen.
Der Live-Rollout wird mit dieser Prüfung abgeschlossen.
Der Galerie-Standard wird erst nach Freigabe des Guides auf weitere Unterseiten
übertragen.

### 1B. Englische Redaktionstexte auf den älteren Unterseiten ergänzen

- [ ] Die Seiten Bike, Kajak und Riverstar vollständig mit abgestimmten
  englischen Redaktionstexten ausstatten. Die EN-Schaltfläche ist dort bereits
  sichtbar; sie übersetzt Navigation und merkt sich die Sprachwahl. Die
  bestehenden deutschen Langtexte werden erst nach redaktioneller Übersetzung
  umgeschaltet.

### 2. Aus den Analysewerten echte Test-Briefs machen

- [ ] Für die drei validierten Tests jeweils Zielgruppe, Nutzenversprechen,
  Format, Ziel/KPI, geschätzte Stunden und Verwertung verbindlich festlegen.
- [ ] Für jeden Test das Paket festlegen: Longform → 2 eigenständige
  Shorts/Reels → belegte Website-Ergänzung → geprüfte Context-Fakten →
  28-Tage-Review.
- [ ] Die ersten geprüften Fakten zu den drei Tests im Master Context anlegen;
  die Verwaltungsoberfläche ist live, der Produktionsbestand enthält aktuell
  noch keine Context-Einträge.
- [ ] Nach jeder Veröffentlichung tatsächliche Produktionsstunden ergänzen und
  nach frühestens 28 Tagen Nutzen pro investierter Stunde bewerten.

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
- [ ] Die persistente Warnungs-Inbox im Familien-Dashboard festlegen und erst
  dann als Benachrichtigungskanal anschließen.
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
