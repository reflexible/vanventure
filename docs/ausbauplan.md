# VanVenture – verbindlicher Ausbauplan

Stand: 22. September 2026  
Dieser Plan ist die zentrale Übersicht für Prioritäten, Phasen, Entscheidungen und
neue Ideen rund um `vanventure.at`. Technische Spezifikationen, Prüfprotokolle und
historische Notizen bleiben als Referenz erhalten, werden aber nicht als getrennte
aktive Roadmaps gepflegt.

## Zielbild

VanVenture verbindet eine glaubwürdige öffentliche Reise- und Outdoor-Website mit
einem privaten Cockpit. Das Cockpit unterstützt die Einkommensstrategie: Es macht
YouTube-Leistung sichtbar, hilft bei der Planung von Longform-Inhalten und bündelt
die belastbaren Fakten für bessere Inhalte. Die öffentliche Website bleibt frei von
privaten Cockpit- und Google-Daten.

## Status heute

| Bereich | Stand | Nächster verbindlicher Schritt |
| --- | --- | --- |
| Öffentliche Website | `https://vanventure.at` läuft produktiv mit HTTPS, Reiseberichten und SEO-Grundlage. | Rechtstexte und Kontakt vervollständigen. |
| Redaktion | Private Redaktion mit Rollen, Sitzungen und PostgreSQL läuft produktiv. | Inhalte anhand belegter Fakten ausbauen. |
| YouTube-Verbindung | Kanal ist verbunden; der erste Abruf hat 25 Videos und Tageswerte erfasst. | Cockpit fachlich und technisch absichern, dann ausbauen. |
| Google OAuth | Externe Anwendung im Testmodus; ein berechtigter Testnutzer ist eingetragen. | Produktionsfreigabe parallel vorbereiten, noch nicht veröffentlichen. |
| SEO | Technische Basis, Sitemap und Indexierungsgrundlagen sind umgesetzt. | Search Console/Bing bestätigen und Inhalte stärken. |

## Prioritäten und Arbeitsstränge

1. **Priorität 1 – Cockpit und Einkommensstrategie:** Daten in nutzbare Entscheidungen,
   Themenplanung und wiederholbare Content-Produktion überführen.
2. **Priorität 2 – Google-Produktionsreife:** Die YouTube-Verbindung dauerhaft,
   nachvollziehbar und rechtlich sauber betreiben.
3. **Priorität 3 – Website und Vertrauen:** Rechtstexte, Kontakt, belastbare Inhalte
   und vollständige Ausrüstung-/Fahrzeugseiten.
4. **Priorität 4 – Sichtbarkeit und Reichweite:** SEO, YouTube-Verlinkung und
   dokumentarische Reiseinhalte kontinuierlich verbessern.
5. **Priorität 5 – Betrieb:** Backups, Monitoring, Tests und sichere Releases.

Die Phasen sind in dieser Reihenfolge priorisiert. Phase 2 läuft teilweise parallel
zu Phase 1, weil sie die dauerhafte YouTube-Verbindung ermöglicht, den
Cockpit-Ausbau aber nicht unnötig aufhalten soll.

## Phase 1 – Cockpit als Steuerzentrale für die Einkommensstrategie

### 1.1 Verlässliche Datenbasis abschließen

- [x] Privates Cockpit, Rollenprüfung, verschlüsselte Tokenablage, Google-Verbindung,
  Kanal- und erster Datenabruf.
- [x] Manuellen Sync mit sichtbarem Ergebnis und anschließender Freigabe des
  automatischen Tageslaufs bereitstellen.
- [x] Datenbanksperre pro Kanal tatsächlich verwenden, damit nie zwei Syncs parallel
  schreiben.
- [x] Callback auch bei zwischenzeitlich deaktiviertem Admin sicher ablehnen.
- [x] Fehler beim Erstlauf und beim Tageslauf klar im Cockpit anzeigen; keine
  Fehlermeldungen still verschlucken.
- [ ] Alle Kanalvideos seitenweise und ohne die heutige 500-Video-Grenze erfassen.
- [ ] OAuth-, Sync-, Sperr-, Snapshot- und Fehlerfälle automatisiert testen.

**Abnahme:** Ein Admin kann einen manuellen Lauf nachvollziehbar starten; ein
wiederholter Lauf erzeugt keine Dubletten; Fehlzustände sind sichtbar; Kanal- und
Videozahlen werden mit YouTube Studio abgeglichen.

### 1.2 Cockpit-Oberfläche für Entscheidungen

- [ ] Dashboard: Views, Watchtime, Abonnentenentwicklung, Impressionen, CTR,
  letzte erfolgreiche Synchronisierung und Datenqualitäts-Hinweise.
- [ ] Videoansicht: filterbare Liste, Detailseite, Zeitreihe und Vergleiche nach
  Tag 1, 7, 28, 90 und 365.
- [ ] Content Planner: zwölf verschiebbare Longform-Slots pro Jahr, Arbeitstitel,
  Zielgruppe, Themen-Pillar, Format, Status, Ziel/KPI, Brief und Videoverknüpfung.
- [ ] Master Context: freigegebene Fakten zu Van/Hymer, Reisen, Outdoor, MTB,
  Kajak, Hund und Mission Paris – jeweils mit Quelle und Aktualität.
- [ ] Regelbasierte Insights: nachvollziehbare Signale für Themen, Formate und
  nächste Produktionsentscheidungen; keine automatischen Veröffentlichungen.

**Abnahme:** Das Cockpit beantwortet mindestens: Welche Themen/Videoformate
funktionieren, welche Inhalte stehen als Nächstes an und worauf stützen sich diese
Entscheidungen?

## Phase 2 – Google-Produktionsreife und Website-Rechtstexte

Diese Phase läuft parallel zu Phase 1. Der Testmodus bleibt aktiv, bis alle Punkte
abgenommen sind; er verursacht keine Google-Cloud-Kosten, lässt OAuth-Freigaben
jedoch nach sieben Tagen ablaufen.

- [ ] Öffentliche Datenschutzerklärung unter `https://vanventure.at/...` erstellen.
- [ ] Öffentliche Nutzungsbedingungen unter `https://vanventure.at/...` erstellen.
- [ ] Rechtliche Prüfung beider Texte vor Veröffentlichung einholen; dieser Plan
  ersetzt keine Rechtsberatung.
- [ ] Datenschutzerklärung mindestens mit Zweck der YouTube-Auswertung,
  Google-/YouTube-Leseberechtigungen, verschlüsselter Refresh-Token-Ablage,
  Datenminimierung, Aufbewahrung/Löschung und Kontakt ausstatten.
- [ ] Nutzungsbedingungen für den privaten, rollenbasierten Cockpit-Zugang festlegen.
- [ ] Google Auth Platform: App-Name, Support- und Entwicklerkontakt, Homepage,
  echte Rechtstext-URLs sowie `vanventure.at` als autorisierte Domain prüfen.
- [ ] Domainbestätigung und erforderliche OAuth-/Scope-Verifizierung bei Google
  vorbereiten beziehungsweise abschließen.
- [ ] Erst danach die App von **Test** auf **Produktion** stellen und die bestehende
  YouTube-Verbindung erneut prüfen.

**Abnahme:** Die dauerhafte OAuth-Verbindung funktioniert nach der Google-Freigabe;
alle im Zustimmungsbildschirm genannten URLs sind öffentlich erreichbar, korrekt und
rechtlich geprüft.

## Phase 3 – Website, Inhalte und Vertrauen

- [ ] Kontakt-E-Mail und Impressum veröffentlichen.
- [ ] Aktuelle Fahrzeugdaten und sorgfältig ausgewählte, rechtlich veröffentlichbare
  Fotos ergänzen; Kennzeichen auf Webderivaten anonymisieren.
- [ ] Reiseberichte mit belegten Routen, Etappen, Stellplätzen, Reisezeiten und
  persönlichen Erfahrungen ausbauen. Keine Kosten oder Tipps erfinden.
- [ ] Ausrüstungsliste aus real genutzter Ausrüstung erstellen; mögliche
  Affiliate-Links deutlich kennzeichnen.
- [ ] Riverstar-/Kajak-Entwurf fachlich und redaktionell abnehmen, erst dann in die
  öffentliche Website übernehmen.
- [ ] Eingebettete Reise-, Fahrzeug- und Kajakfotos überall mit dem gemeinsamen,
  tastaturbedienbaren Foto-Viewer vergrößerbar halten.

**Abnahme:** Rechtliche Basis, Kontakt und die wichtigsten öffentlichen Inhaltsseiten
sind vollständig, konsistent und anhand eigener Erfahrungen belegt.

## Phase 4 – Sichtbarkeit und Reichweite

- [ ] Eigentum an `vanventure.at` in Google Search Console und Bing Webmaster Tools
  bestätigen; Sitemap einreichen.
- [ ] Die öffentlichen URLs indexieren lassen und Impressionen, Suchbegriffe und
  Klicks nach einigen Wochen auswerten.
- [ ] Inhaltliche Schwerpunkte stärken: Norwegen mit VW California, Sardinien mit
  Camper und Mountainbike, fünf Wochen Italien sowie HYMER Grand Canyon S CrossOver.
- [ ] Bei passenden bestehenden YouTube-Reisevideos den Website-Link ergänzen, wenn
  ausdrücklich entschieden; keine gekauften Links oder automatisierten Fremdbeiträge.
- [ ] Englische, eigenständig erreichbare Seiten nur als eigenes Vorhaben planen;
  keine irreführenden `hreflang`-Angaben.

**Abnahme:** Search Console/Bing liefern belastbare Messwerte; die Content-Entscheidungen
werden daraus und aus den Cockpit-Daten abgeleitet.

## Phase 5 – Betrieb und Qualität

- [x] Wiederholbare Release-Prüfung für Tests, Compose-Konfiguration, Datenbankdump
  und Healthcheck bereitstellen; vor jedem produktiven Release ausführen.
- [ ] Backup/Restore inklusive Cockpit-Tabellen regelmäßig testen.
- [x] Lokalen Monitor für fehlgeschlagene Syncs, abgelaufene OAuth-Verbindungen und
  lange fehlende Daten bereitstellen; die persistente Warnungs-Inbox des geplanten
  Familien-Dashboards ist der verbindliche Benachrichtigungskanal. Sie wird erst
  mit dessen Kommunikationskanal und Fast-Track-Verarbeitung produktiv aktiviert.
- [x] Tests in die Release-Prüfung aufnehmen; private Tokens, Secrets und
  personenbezogene Daten weiterhin weder in Git, Browserantworten noch Logs veröffentlichen.
- [ ] Öffentliche Website, PostgreSQL und Caddy bei kurzen Webcontainer-Releases
  geschützt weiterbetreiben.

**Abnahme:** Ein Fehler ist erkennbar, nachvollziehbar und ohne Datenverlust
behebbar; ein Restore wurde erfolgreich erprobt. Bis das Familien-Dashboard
Warnungen persistent entgegennimmt und sichtbar übernimmt, bleibt der
Benachrichtigungspunkt offen.

## Ideen & Backlog

Neue Ideen werden zuerst hier eingetragen und erst nach Priorisierung einer Phase
zugeordnet. So gehen sie nicht verloren, blockieren aber keine laufende Arbeit.

| Idee | Nutzen / Hypothese | Priorität | Status | Nächste Entscheidung |
| --- | --- | --- | --- | --- |
|  |  | Jetzt / Später / Vielleicht | Idee |  |

## Entscheidungsregeln

- Kein öffentlicher Release, keine Google-Veröffentlichung und keine externe
  Kommunikation ohne ausdrückliche Freigabe.
- Fotoarchive bleiben unverändert; Bearbeitung und Kennzeichenanonymisierung erfolgen
  ausschließlich an Projektkopien beziehungsweise Webderivaten.
- Das Cockpit bleibt privat. Es veröffentlicht weder Analytics noch Tokens und schreibt
  nichts nach YouTube zurück.
- Datenbasierte Insights unterstützen Entscheidungen; sie treffen keine automatischen
  redaktionellen oder finanziellen Entscheidungen.

## Referenzen und Archiv

- [Cockpit-Status und Rollout](/D:/work/_venventure/docs/vanventure-cockpit-mvp.md)
- [Technische Cockpit-Spezifikation](/D:/work/_venventure/docs/vanventure-cockpit-plan.md)
- [SEO-Umsetzung und Detailnotizen](/D:/work/_venventure/docs/seo.md)
- [Riverstar-Entwurf](/D:/work/_venventure/docs/riverstar/entwurf.md)
- [Server- und Backuphistorie](/D:/work/_venventure/docs/marvin-server.md)
- [Betrieb der Redaktion](/D:/work/_venventure/editor/README.md)

Bei Konflikten gilt dieser Ausbauplan für Priorität und Status. Technische Details
werden in den jeweiligen Referenzen nachgeschlagen und bei einer Umsetzung an diesen
Plan angeglichen.
