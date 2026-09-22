# VanVenture – Übersicht aller Vorhaben

Stand: 22. September 2026
Zweck: Eine konsolidierte Arbeitsliste aus Ausbauplan, Cockpit-Spezifikation,
MVP-/Betriebsdokumentation, SEO-Plan, Riverstar-Entwurf und dem Chat
„Einkommensstrategie entwickeln“. Diese Datei ersetzt keine technische
Spezifikation; bei technischen Details gilt weiterhin der jeweilige Originalplan.

## Lesart und Reihenfolge

- Durchgestrichen bedeutet: umgesetzt und mindestens lokal beziehungsweise im
  dokumentierten Produktionsstand nachgewiesen.
- **Lokal vorbereitet** bedeutet: im aktuellen Arbeitsstand vorhanden, aber noch
  nicht als Live-Release bestätigt.
- Offene Punkte sind in der Reihenfolge aufgeführt, in der sie für die
  Einkommensstrategie sinnvoll sind. Kein Punkt bedeutet eine automatische
  Veröffentlichung oder externe Kommunikation.

## Bereits umgesetzt

### Cockpit, Daten und Betrieb

- ~~Privates Cockpit mit bestehendem Login, Rollenprüfung, CSRF-Schutz,
  `noindex` und `no-store`.~~
- ~~Getrennte, verschlüsselte Google-/YouTube-OAuth-Verbindung mit PKCE, State,
  Kanalbestätigung, Reconnect und Disconnect.~~
- ~~Erster erfolgreicher Kanalimport: 25 Videos, 33 Kanal-Tageswerte,
  825 Video-Tageswerte und alle damals fälligen Snapshots.~~
- ~~Täglicher, administrativ einstellbarer YouTube-Sync mit Nachzug,
  idempotenten Upserts, Sperre gegen parallele Läufe und sichtbaren Fehlern.~~
- ~~Automatisierte Tests für OAuth-, Sync-, Sperr-, Snapshot- und Fehlerfälle.~~
- ~~Dashboard-Grundlage mit Zeitraumwahl, Views, Watchtime, Netto-Abonnenten,
  Impressionen, CTR, letztem Sync und Datenqualitäts-Hinweisen.~~
- ~~Content-Planner-Grundgerüst: drei Slots für 2026 sowie zwölf Longform-Slots
  pro Folgejahr, Statusfluss, Brief, Verantwortlichkeit und Videoverknüpfung.~~
- ~~Master-Context-Verwaltung mit Kategorien, Quellen, Aktualität und
  Freigabestatus.~~
- ~~Regelbasierte Basis-Insights für fehlende Briefs und Top-Videos.~~
- ~~Release-Prüfung, Cockpit-Monitoring und ein einmal erfolgreich erprobter
  Restore der Cockpit-Tabellen.~~

### Website, SEO und Bildschutz

- ~~HTTPS-Website, Reiseberichte und technische SEO-Basis mit Sitemap,
  robots.txt, Canonicals, Open Graph und strukturierten Daten.~~
- ~~Private Redaktion und Cockpit-Routen gegen Indexierung geschützt.~~
- ~~Gemeinsamer, tastaturbedienbarer Foto-Viewer für die eingebundenen
  Reisebilder.~~
- ~~Riverstar-Entwurf mit Projektkopien, Quellennachweis und anonymisierten
  Kennzeichen als Vorschau erstellt.~~

## Als Nächstes: Einkommensstrategie in echte Entscheidungen überführen

Das ist der kritische Pfad. Die vorhandenen Werte reichen bereits für einen
belastbaren **Channel Audit V1**. Impressions/CTR, Traffic Sources und Retention
machen daraus später einen präziseren Audit V2, sind aber keine Voraussetzung für
den Start.

1. **Ersten Channel Audit V1 durchführen**
   - Alle importierten Videos, Titel und Veröffentlichungsdaten gegen YouTube
     Studio prüfen; dabei Shorts und Longform verbindlich zuordnen.
   - Videos getrennt nach Short und Longform vergleichen: Alter, Views,
     Watchtime, durchschnittliche Wiedergabedauer, Engagement, Snapshots und
     Long-Tail.
   - CTR, Impressionen, Traffic Sources und Retention im Audit V1 ausdrücklich
     ausklammern; sie liegen noch nicht vollständig vor.
   - Ergebnis: belegte Gewinner, schwache Themen, Evergreen-Potenzial,
     Wiederverwendungs-Chancen und vorläufige Content-Säulen.

2. ~~**Sicheren Channel-Audit-Export ergänzen**~~
   - Einen versionierten JSON-Export als praktische Übergabe aus dem privaten
     Cockpit bauen; CSV bleibt optional.
   - Er enthält nur Kanalübersicht, Videos, vorhandene Analytics, Snapshots,
     Content-Zuordnungen und Datenqualität – niemals Tokens, Secrets, Sitzungen
     oder Kontodaten.
   - ~~Ergebnis: der Audit kann hier wiederholbar analysiert werden, ohne Zugang
     zum privaten Cockpit oder zur Produktionsdatenbank zu übertragen.~~

3. **Content-Säulen und 90-Tage-Plan aus Audit V1 festlegen**
   - Die Hypothesen `Van`, `Explore`, `Move`, `Gear` und `Stories` anhand des
     Audits bestätigen, gewichten, zusammenlegen oder verwerfen.
   - Nicht zwölf Videos detailliert planen: drei Videos konkret briefen,
     drei bis vier Kandidaten vorbereiten, übrige Jahresslots flexibel lassen.
   - Für jedes konkrete Video Zielgruppe, Nutzenversprechen, Säule, Format,
     Ziel/KPI, realistischen Aufwand und Verwertung festlegen.

4. **Low-Effort-Creator-System verbindlich machen**
   - Eine kurze Vorher-/Währenddessen-/Danach-Checkliste für Reisen und Projekte
     erstellen: Anlass, wenige gezielte Shots, ehrliche Nachnotiz.
   - Den Standard etablieren: ein Erlebnis → ein Longform-Video → zwei
     Shorts/Reels → Website-Ergänzung → Fakten in den Master Context → spätere
     Langzeit-Review.
   - Produktionszeit pro Inhalt schätzen und später tatsächlich erfassen. Der
     zentrale Erfolgswert ist Nutzen pro investierter Stunde, nicht nur Views.

## Noch nicht umgesetzt – Cockpit und Content Intelligence (Audit V2)

- [ ] Alle Kanalvideos paginiert ohne die bestehende 500-Video-Grenze erfassen.
- [ ] Videoansicht vervollständigen: Short-/Longform-Filter, Detailseite,
  Zeitreihe und 1/7/28/90/365-Vergleich.
- [ ] Die aktuelle Listenansicht der Videos im privaten Cockpit mit echten
  Daten gemeinsam abnehmen.
- [ ] Impressionen und CTR beim Video-Sync nachhaltig befüllen und bei
  fehlenden Werten nicht als Null deuten. **Lokal vorbereitet; Live-Release und
  Prüfung stehen noch aus.**
- [ ] Video- und kanalweite Traffic Sources erfassen und mit Zeitraum,
  Datenstand und API-Grenzen anzeigen.
- [ ] Retention-/Engagement-Zeitreihen nur soweit die YouTube-API sie liefert
  erfassen und sonst die Einschränkung sichtbar machen.
- [ ] Die Short-/Longform-Klassifikation als Pflichtfeld absichern.
- [ ] `estimated_hours` und `actual_hours` im Planner erfassen; erst dann
  Effizienzmetriken berechnen.
- [ ] Eigene Audit-Ansicht mit Vergleichsgruppen, Long-Tail-/Alterslogik,
  Datenqualität und Snapshot-Vergleich bauen.
- ~~Sicheren, versionierten Channel-Audit-Export mit Feld-Allowlist, UI-Button
  und Tests gegen Datenlecks bauen.~~
- [ ] Wiederkehrenden Audit-Workflow im Cockpit dokumentieren: Export → externe
  Analyse → geprüfte Erkenntnisse in Insights, Planner und Master Context
  übernehmen.
- [ ] Insights ausbauen: nur nachvollziehbare, regelbasierte Signale mit
  Zeitraum, Vergleichsgruppe und Datenqualität; keine automatischen Entscheidungen.

## Noch nicht umgesetzt – Google-Produktionsreife und Recht

- [ ] Öffentliche Datenschutzerklärung veröffentlichen.
- [ ] Öffentliche Nutzungsbedingungen für den privaten Cockpit-Zugang
  veröffentlichen.
- [ ] Beide Texte rechtlich prüfen lassen.
- [ ] Aufbewahrungsfrist, Export- und Löschkonzept für Cockpitdaten verbindlich
  festlegen und umsetzen.
- [ ] Google Auth Platform vervollständigen: App-Name, Support-/Entwicklerkontakt,
  Homepage, echte Rechtstext-URLs und autorisierte Domain prüfen.
- [ ] Domainbestätigung sowie nötige OAuth-/Scope-Verifizierung abschließen.
- [ ] Erst danach Google-OAuth von Test auf Produktion stellen und die Verbindung
  erneut prüfen.

## Noch nicht umgesetzt – Website und Vertrauen

- [ ] Kontakt-E-Mail und Impressum veröffentlichen.
- [ ] Fahrzeugseite mit aktuellen, belegten Daten und freigegebenen Fotos
  ergänzen; Kennzeichen auf allen Webderivaten anonymisieren.
- [ ] Reiseberichte um belegte Routen, Etappen, Stellplätze, Reisezeiten und
  eigene Erfahrungen erweitern – ohne erfundene Kosten oder Tipps.
- [ ] Reale Ausrüstungsliste erstellen; mögliche Affiliate-Links transparent
  kennzeichnen.
- [ ] Riverstar-Entwurf fachlich und redaktionell abnehmen; erst dann in die
  öffentliche Website übernehmen.
- [ ] Für den Riverstar-Text den genauen Ort der Uferfotos und die konkrete
  Erfahrung mit den Schwimmwesten klären, falls diese Details veröffentlicht
  werden sollen.

## Noch nicht umgesetzt – Sichtbarkeit und Distribution

- [ ] `vanventure.at` in Google Search Console und Bing Webmaster Tools
  bestätigen und die Sitemap einreichen.
- [ ] Öffentliche URLs indexieren lassen und nach einigen Wochen Impressionen,
  Suchbegriffe und Klicks auswerten.
- [ ] Die Schwerpunkte Norwegen, Sardinien, Italien und HYMER Grand Canyon S
  CrossOver mit belastbaren Inhalten vertiefen.
- [ ] Bei ausdrücklich ausgewählten bestehenden YouTube-Videos auf passende
  Website-Inhalte verlinken.
- [ ] Ein wiedererkennbares Titel- und Thumbnail-System für Van/Technik,
  Reise/Adventure, Gear und Stories entwickeln.
- [ ] Englische, eigenständig erreichbare Seiten nur als separates Vorhaben
  planen; bis dahin keine irreführenden `hreflang`-Angaben.

## Noch nicht umgesetzt – Betrieb

- [ ] Wiederherstellungstest inklusive Cockpit-Tabellen alle zwei bis vier
  Wochen wiederholen und knapp protokollieren.
- [ ] Die geplante persistente Warnungs-Inbox im Familien-Dashboard als
  tatsächlichen Benachrichtigungskanal anbinden und prüfen.
- [ ] Bei künftigen kurzen Web-Releases sicherstellen, dass öffentliche Website,
  PostgreSQL und Caddy geschützt weiterlaufen und nur der Webdienst neu startet,
  wenn es technisch erforderlich ist.

## Bewusste Grenzen

- Keine Veröffentlichung privater Analytics, Tokens oder Cockpitdaten.
- Keine automatischen Uploads, YouTube-Änderungen, KI-Entscheidungen oder
  ungeprüften Rückschreibungen.
- Keine gekauften Links, automatisierten Fremdbeiträge oder erfundenen
  Reise-/Produktempfehlungen.
- Originalfotoarchive bleiben unverändert; Veröffentlichung nur aus
  dokumentierten Projektkopien und ohne erkennbare Kennzeichen oder nicht
  ausdrücklich freigegebene Kinder.

## Referenzen

- [Verbindlicher Ausbauplan](ausbauplan.md)
- [Cockpit-Spezifikation](vanventure-cockpit-plan.md)
- [Cockpit-MVP und Rollout](vanventure-cockpit-mvp.md)
- [SEO-Plan](seo.md)
- [Betriebs- und Monitoring-Regeln](betrieb.md)
- [Riverstar-Entwurf](riverstar/entwurf.md)
