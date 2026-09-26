# Atomarer Coverage- und Prüffortschritt

Die Kandidatenzahl ist weiterhin eine Arbeitsgröße, keine bestätigte Zahl aller
atomaren Originalanforderungen. Nur Zeilen mit Prüfpaket, konkreter Zielstelle und
individueller Begründung gelten als fachlich geprüft. Frühere bloße Zuordnungen zählen nicht.

## Fortschritt

- Fachlich bearbeitete Prüfpakete (keine Deckungsabnahme): PKG-001, PKG-002, PKG-003, PKG-004, PKG-005, PKG-006, PKG-007, PKG-008, PKG-009, PKG-010, PKG-011, PKG-012, PKG-013, PKG-014, PKG-015, PKG-016, PKG-017, PKG-018, PKG-019, PKG-020, PKG-021, PKG-022, PKG-023, PKG-024, PKG-025, PKG-026, PKG-027, PKG-028, PKG-029, PKG-030, PKG-031, PKG-032, PKG-033, PKG-034, PKG-035, PKG-036, PKG-037, PKG-038, PKG-039, PKG-040, PKG-041, PKG-042, PKG-043, PKG-044, PKG-045, PKG-046, PKG-047, PKG-048, PKG-049, PKG-050, PKG-051, PKG-052, PKG-053, PKG-054, RECOVERY-R4-SOURCE-CANDIDATES-2026-09-26, RECOVERY-SRC-0968
- Fachlich geprüfte Originalblöcke: 1136 / 1136
- Fachlich geprüfte ursprüngliche Kandidaten: 2943 / 2943
- Ungeprüfte ursprüngliche Kandidaten: 0
- Nachträglich erkannte Nachfolger durch Teilung: 403
- Bestätigte eigenständige Anforderungen/Regeln im geprüften Umfang: 1465
- Offene Deckungslücken im geprüften Umfang: 15
- Kandidaten mit offenem Coverage-/Review-Hinweis (inkl. Nachfolger): 23
- Coverage Findings Remaining: 15
- Reviewable Coverage Findings: 0
- Auto-resolvable Findings (klassifizierte Fragegruppen): 0
- PRE_FINAL_AUDIT_DECISION: 0
- PUBLICATION_DECISION: 10
- DEFERRED_POST_PILOT: 3
- PRE_FINAL_AUDIT_DECISION-Pakete A1–A5: A1=0, A2=0, A3=0, A4=0, A5=0
- Final Audit Readiness: READY_FOR_FINAL_AUDIT
- Final Audit Status: FINAL_AUDIT_PASS
- Weitere Klassifikationen (TECHNICAL / DUPLICATE / INSUFFICIENT_EVIDENCE): 0 / 0 / 5
- Nächstes Paket: keines; alle ursprünglichen Kandidaten geprüft, 0 noch ungeprüfte Kandidaten
- Zentraler Scrum-Plan: `docs/scrum-plan.md` (nach bestandenem unabhängigen Final Audit promoted)

## Planning Coverage der fachlich geprüften ursprünglichen Kandidaten

- Covered: 1865
- Rule / Constraint: 320
- Duplicate: 7
- Merged / Split: 105 / 137
- Kontext ohne zusätzliche Pflicht: 459
- Partially Covered: 2
- Unresolved: 13
- Traceability Partially Covered rows: 17
- Noch nicht fachlich geprüft: 0

## Implementation Verification (getrennte Quellstatus-Achse)

Diese Zahlen sind keine Code- oder Live-Abnahme.

- Verified Existing: 0
- Existing / Verify: 344
- Planned: 310
- Blocked: 44
- Unverified / unknown: 2245

## Prüfnachweis PKG-001

- Originalquelle: `AGENTS.md`, SRC-0001–SRC-0025, SHA-256
  `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`.
- 25 vollständige Originalblöcke gelesen; die 65 ursprünglichen Kandidatentexte
  setzen sich je Block exakt zum erfassten Originaltext zusammen.
- 10 künstlich getrennte Bedingungs-/Ausnahmefragmente wurden mit ihrem
  kanonischen Kandidaten verknüpft; drei Kandidaten ergaben je zwei
  eigenständig prüfbare Nachfolger. Die sechs Nachfolger bleiben auf ihre
  ursprünglichen Kandidaten rückverfolgbar.
- Zielkorrekturen: ST-AN-01 nennt zentrale Event-/Property-Definitionen
  und Adaptergrenze; ST-WEB-01 nennt gemeinsamen Galeriebaustein und Viewer.
- Nr. 63/69 bleiben gesperrt; dieses Paket ändert keine Foto- oder Live-Freigabe.

## Prüfnachweis PKG-002

- Originalquelle: `AGENTS.md`, SRC-0026–SRC-0039, SHA-256
  `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`.
- 14 vollständige Originalblöcke gelesen; die 49 ursprünglichen Kandidatentexte
  setzen sich je Block exakt zum erfassten Originaltext zusammen.
- Sieben Bedingungs- und Kontextfragmente wurden kanonisch zusammengeführt;
  zwei Kandidaten ergaben insgesamt fünf eigenständig prüfbare Nachfolger.
- Zielkorrekturen: ST-WEB-01/02/04 konkretisieren Navigation, Redirects, Viewer
  und responsive Templates; ST-PHOTO-01/02 konkretisieren Bildherkunft,
  Personen-/Kennzeichenschutz, dokumentarische Bildtreue und KI-Freigaben.
- Die Freigabe- und Veröffentlichungssperren für Nr. 63/69 bleiben bestehen.

## Prüfnachweis PKG-003

- Originalquellen: `README.md`, SRC-0040–SRC-0054, SHA-256
  `ccf1252a70936f0eeace1f5a6a66aad9d9cf8ce0904bbdbadd3cbe85f9e35472`;
  `CONTRIBUTING.md`, SRC-0055–SRC-0064, SHA-256
  `8bf238c220b9ecc53efc135a640077af496d5108edfb0172fdb8c210a566b001`.
- 25 vollständige Originalblöcke und 57 ursprüngliche Kandidaten gelesen;
  ihre Klauseln setzen sich je Block exakt zum erfassten Originaltext zusammen.
- Vier zusammengesetzte Listeneinträge ergaben elf einzeln prüfbare Nachfolger.
  Nummerierungszeichen, reine Statusaussagen und Befehlsbeispiele sind als
  Kontext begründet. Fehlende Ausrüstungs- und Kontakt-/Rechtstext-Ergebnisse
  stehen als ST-WEB-06/07 mit Originalbezug im bestehenden Epic.
- Die zwei älteren Release-Klauseln SRC-0051.b/SRC-0052.d sind durch
  DEC-REL-001/003 entschieden; Originale bleiben historisch erhalten.

## Prüfnachweis PKG-004

- `CONTRIBUTING.md`, SRC-0065–SRC-0068, SHA-256
  `8bf238c220b9ecc53efc135a640077af496d5108edfb0172fdb8c210a566b001`:
  vier vollständige relevante Regelblöcke und sieben Kandidaten gelesen.
- SRC-0069–SRC-0078 aus dem Analytics-Abnahmebericht wurden im Kontext
  gelesen und als bereits ausgeschlossene Status-/Nachweisblöcke bestätigt;
  sie besitzen keine Klauselkandidaten und erhöhen den relevanten Nenner nicht.
- Die historische Freigaberegel SRC-0068.a ist durch DEC-REL-001
  hinsichtlich Release-Umfang und Zeitvorgabe entschieden.

## Prüfnachweis PKG-005

- `docs/analytics.md`, SRC-0348–SRC-0354, SHA-256
  `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d`:
  sieben vollständige Quellblöcke und 40 Kandidaten gelesen; Klauseln
  setzen sich je Block exakt zum Original zusammen.
- Datum/Status wurden als Kontext markiert. Zentrale API, Policy,
  Provider-Grenze, Phase-0-Analyse, Event-Vertrag und bedingte Ereignisse
  sind mit konkreten Acceptance Criteria bzw. Constraints verbunden.
- Dieses Paket erfasst Planungsschutz, keine Implementierungsabnahme.

## Prüfnachweis PKG-006

- `docs/analytics.md`, SRC-0355–SRC-0361, SHA-256
  `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d`:
  sieben vollständige Quellblöcke und 29 Kandidaten gelesen; Klauseln
  setzen sich je Block exakt zum Original zusammen.
- Content-ID, Datenschutz, URL-/UTM-Normalisierung, Ausfallsicherheit,
  Tests und Berichte sind an bestehende Analytics-Stories und den genauen
  Constraint-Wortlaut gebunden. Optionale Aggregate bleiben Entscheidung,
  nicht vorweggenommene Implementierung.

## Prüfnachweis PKG-007

- `docs/ausbauplan.md`, SRC-0373–SRC-0384, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  zwölf vollständige relevante Blöcke und 26 ursprüngliche Kandidaten
  gelesen; ihre Klauseln ergeben jeweils den Originalblock.
- SRC-0383/0384 waren irrtümlich als irrelevant ausgeschlossen. Ihre
  vorhandenen Quell-IDs wurden erhalten; 15 neue Klauselkandidaten
  erhöhen den ursprünglichen Arbeitsbestand von 2.882 auf 2.897.
- Sieben zusammengesetzte historische Blöcke ergaben 28 Nachfolger.
  Historische Cockpit-, Content-, Release-, SEO- und Viewer-Ergebnisse
  bleiben bestehende Stände und wurden nicht als neue Arbeit geplant.

## Prüfnachweis PKG-008

- `docs/ausbauplan.md`, SRC-0385–SRC-0397, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  neun vollständige relevante Arbeitsblöcke mit 28 Kandidaten gelesen;
  vier dazwischenliegende Abschnittsüberschriften als Kontext bestätigt.
- Phase-0-Entscheidungen, Messvertrag, Null-Policy, Umami-Anbindung und
  echte Referenzseiten-Abnahme stehen explizit bei ST-AN-01. Alle bleiben
  Planned; kein historischer Analytics-Live-Stand wurde erfunden.

## Prüfnachweis PKG-009

- `docs/ausbauplan.md`, SRC-0398–SRC-0414, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  zwölf vollständige relevante Blöcke und 39 Kandidaten gelesen;
  fünf Abschnittsüberschriften als Kontext bestätigt.
- Die separate CMS-Seitenmessung und interne Orientierung hatten keine
  ausreichend genaue Acceptance Criteria. ST-AN-08/09 wurden aus
  SRC-0399/0402 innerhalb des bestehenden Analytics-Epics ergänzt;
  ST-AN-03 verweist nur noch auf ausgehende Content-Klicks.
- Providerwechsel und optionale Aggregate bleiben geplant bzw.
  entscheidungsabhängig, nicht als implementiert ausgewiesen.

## Prüfnachweis PKG-010

- `docs/ausbauplan.md`, SRC-0415–SRC-0424, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  acht relevante Blöcke und 23 Kandidaten geprüft; zwei CMS-Überschriften
  als Kontext bestätigt.
- SRC-0415/0416 enthielten trotz bisherigen Ausschlusses Architektur-,
  Freigabe- und Fortschrittsregeln. Elf Kandidaten wurden unter den
  vorhandenen Quell-IDs nachgetragen; der Arbeitsbestand steigt auf 2.908.
- CMS 1/2 stehen mit konkreten Kriterien bei ST-CMS-01/02; Speichern
  wird weiterhin nicht als Veröffentlichung behandelt.

## Prüfnachweis PKG-011

- `docs/ausbauplan.md`, SRC-0425–SRC-0438, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  zehn relevante CMS-3–6-Blöcke mit 22 Kandidaten gelesen und an
  konkrete Story-Kriterien gebunden; vier Überschriften sind Kontext.
- Draft/Published-Grenzen, SEO-Sichtbarkeit, Medienherkunft und die
  beiden begrenzten Referenzfälle bleiben Planned; weitere Seiten
  liegen ausdrücklich außerhalb von CMS 1–6.

## Prüfnachweis PKG-012

- `docs/ausbauplan.md`, SRC-0439–SRC-0447, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  neun vollständige Blöcke und 36 Kandidaten gelesen; zwei gesonderte
  Sitzungsschutzpflichten als Nachfolger erfasst.
- SRC-0447 war auf Blockebene fälschlich pauschal Duplicate; eigene
  Navigations-, Rollen- und Kontoregeln sind nun an ST-AUTH-01 und
  ST-WEB-01 gebunden. Historische Live-Nachweise wurden nicht als neue
  Entwicklungsarbeit eingeplant.

## Prüfnachweis PKG-013 (SRC-0448–SRC-0459; Deckung offen)

- `docs/ausbauplan.md`, SHA-256
  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:
  zwölf Originalblöcke und 65 ursprüngliche Kandidaten gegen aktuelle
  Quell- und Zielstellen geprüft; SRC-0458/0459 einzeln im Tail-Lauf.
- SRC-0450.a wurde in Galeriepflicht und damalige Fünfer-Ausnahme
  getrennt; Datumsfragmente bleiben mit der jeweils folgenden Zeile
  verbunden. Der Entwurf benennt Kajak-Referenz, aktuelle vier Ausnahmen,
  historische Übersichtsseiten und die drei mobilen Wirkungen konkret.
- SRC-0458 trennt den historischen EN-/DE-Live-Test auf drei damaligen
  Seiten von heutigen Inhaltsseiten und den zwei späteren Redirects;
  gespeicherte Sprachwahl und Riverstar auf `kajak.html` stehen im AC.
- SRC-0459.b wurde in lokale Desktop-/Tablet-/Mobil-Gesamtvorschau
  und ausdrückliche Nutzerabnahme des konkreten Release-Umfangs geteilt.
  Erst danach und nach bestandenen Release-Prüfungen darf gemäß
  Betriebsverfahren veröffentlicht werden; Trulli V11 allein gibt
  den Gesamt-Release nicht frei. Umsetzung und Live-Stand sind ungeprüft.
- SRC-0452.f/g/h bleiben Partially Covered: Bestätigung zweier
  ZIP-Rückansichten ist keine Freigabe aller 14 Kajakbilder; die spätere
  Entfernung von „Gemeinsam am Fluss“ und Einzelbildfreigaben müssen
  am aktuellen Release-Umfang belegt werden. PKG-013 ist nicht bestanden.
- Die früheren Live-, HTTP-, Health- und Neustartangaben sind datierte
  Quellbelege. Aktuelle Implementierung, Sichtabnahme und Live-Stand
  wurden in diesem Migrationslauf nicht geprüft.

## Prüfnachweis PKG-014 (SRC-0460–SRC-0469; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 126 ursprüngliche Kandidaten gegen aktuelle Zielstellen geprüft; SRC-0461/0469 sind paraphrasierende Teilkarten, alle anderen Klauseln ergeben den Originalwortlaut.
- SRC-0460.e wurde in datierten Teilstatus und ein eigenständiges Vorbeginn-Gate geteilt. Die 13 Kajak-Kacheln, sechs Reise-Archivtreffer, zwei Scott-Varianten, ein genauer Scott-Frame, acht Google-Originalbytes und deren neun angeforderte Downloads bleiben als historische oder aktuelle offene Belege differenziert.
- V3-Fahrzeugfreigabe und Trulli V11 gelten nur motivweise. Seitenbild-Entscheidungen, weitere Variantenfreigaben, Kennzeichenprüfung, Release-Checks und konkrete Gesamtfreigabe bleiben offen. Alte 76/84-, 84/84- und 91-Smoke-Zahlen belegen keinen heutigen Release.
- Nach der gezielten Coverage-Reparatur bleiben SRC-0464.f und SRC-0466.s Partially Covered; die übrigen sechs früheren Lücken haben jetzt konkrete Plan-AC. Die 13-Kachel-Gruppenabnahme und historische Einzelbildnachweise bleiben ausstehend. PKG-014 ist nicht als vollständig gedeckt abgenommen.

## Prüfnachweis PKG-015 (SRC-0470–SRC-0479; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 15 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraint-Register geprüft; die Kandidaten ergeben je Block exakt den Originalwortlaut.
- SRC-0470.a, SRC-0472.a, SRC-0476.a und SRC-0477.a haben je zwei getrennt prüfbare Nachfolger. Der aktive GCS-Planwert 8–11 Zielstunden und die ältere README-Angabe 24 geschätzte Stunden bleiben als ungeklärter Bedeutungs-/Zeitkonflikt sichtbar (SRC-0470.a2).
- Die EXPLORE-/MOVE-Briefs und Pakete sind getrennt geplant. VAN-Paketfestlegung und zehn GCS-Fakten sind historische Quellstände; Produktion, weitere Freigaben, Phase-0-Entscheidungen und schriftliche Abnahme sind offen. Technische Board-Referenz und verbindliche Arbeitsliste sind als Autoritätskontext bewahrt.
- COVERAGE-R1-052: SRC-0470.a2 ist durch das bestehende ST-CON-01-AC planerisch gedeckt. Die Reichweite der beiden Stundenwerte bleibt bei SRC-0753.a als PUBLICATION_DECISION offen; die GCS-Veröffentlichung ist bis zur Freigabe gesperrt. Die Planmigration prüfte weder Implementierung noch Live-Zustand und erteilte keine Produkt- oder Release-Freigabe.

## Prüfnachweis PKG-016 (SRC-0480–SRC-0489; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4be2da22d03620a99ed1fd65`: zehn aktuelle vollständige Originalblöcke und 22 ursprüngliche Kandidaten mit Story-AC, Tasks, Matrix und Constraint-Register abgeglichen; jede Quellklausel bleibt wortgetreu rückverfolgbar.
- Zusammengesetzte Phase-0-Entscheidungen, Datenstrukturen, Schutz- und UI-Kriterien sowie Marvin-Rechte wurden in 45 einzeln prüfbare Nachfolger geteilt. ST-BRD-01/02/03/04 nennen nun die konkreten AC; src-0483 gilt als Gate für alle vier Board-Stories.
- Prioritätswerte, Fast-Track-Kriterien, Archivfrist, Review-Regeln, Beispiele, Warnungskatalog und Betriebsvertrag sind nur geplant. Ihre konkrete Festlegung und die schriftliche Phase-0-Abnahme bleiben offen; sie sind keine Implementierung oder Release-Freigabe.
- SRC-0484.a1 bleibt Partially Covered: ST-BRD-01 bündelt noch Phase-0-Festlegung, Datenmodell, API und Boardbetrieb statt eines kleinen eigenständig abnehmbaren Vertical Slice. Vor Umsetzungsreife müssen Story- und Task-Zuordnung unter Erhalt der Quell-IDs geschnitten werden. PKG-016 ist nicht bestanden; Produkt, Live und Deployment wurden nicht geprüft.

## Prüfnachweis PKG-017 (SRC-0490–SRC-0499; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 17 Kandidaten individuell gegen aktuelle Story-AC, Matrix und Constraints geprüft; die Klauseln ergeben je Block exakt den Originaltext.
- SRC-0490 trennt Planner und Board auch bei freiwilligen Links. SRC-0491 bindet acht Prüffelder, Restore von Board/Inbox/Verlauf, geschützten Dump, Live-Nachprüfungen und nur bedingten Webdienst-Neustart an einen gesonderten freigegebenen Release. Die kleine Story-/Task-Zuordnung der bereichsübergreifenden Suite bleibt offen.
- SRC-0492/0493 benennen Importgrenze und sichere Admin-Trennung. SRC-0494 ist nur der historische Reach-Nachweis vom 23.09.2026; SRC-0495–0499 bleiben geplante Trends, Metriken und dokumentierter Export-Analyse-Übernahmeablauf. Das Views-allein-Verbot gilt schon vor der Metrik-Implementierung.
- SRC-0491.a ist nach der gezielten Coverage-Reparatur den prüfpflichtigen AC von ST-BRD-01 bis ST-BRD-04 zugeordnet; die Story- und Task-Slices sind planerisch benannt. Implementierung, Restore-Test, Release-Freigabe und Live-Prüfung bleiben offen.

## Prüfnachweis PKG-018 (SRC-0500–SRC-0509; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn Originalblöcke und 67 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraints einzeln geprüft. Die zehn Teilkarten von SRC-0509 sind paraphrasierende Fokusklauseln; der vollständige Originalblock bleibt in Matrix und Inventar erhalten.
- Vier zusammengesetzte OPS-Kandidaten wurden in 13 prüfbare Nachfolger geteilt. Erstellung, rechtliche Prüfung, Auth-Platform-Nachweise, OAuth-Umschaltung/Verbindungstest und drei Cockpit-Datenregeln haben getrennte Kriterien.
- Galerievorschau aus SRC-0504 braucht ausdrückliche Designabnahme; Direktnavigation und spätere 301-Redirects sind getrennt. Drei private Farbmuster, vier lokale Bildnutzungen, 83 Inventarvarianten, sechs Kontaktbögen und vier eng ausgenommene Fahrzeugbilder gelten nicht als Gesamtfreigabe.
- SRC-0508.j/k und SRC-0509.a sind nach der gezielten Coverage-Reparatur mit konkreten Struktur-Slices abgedeckt. SRC-0504.b bleibt Partially Covered, bis die Galeriegestaltung ausdrücklich abgenommen ist. Historische Renderer-/HTML-/Scott-Belege bleiben von Implementierung, lokaler Gesamtvorschau, Release-Freigabe und Live-Nachweis getrennt.

## Verbindliche Release-Entscheidungen

- DEC-REL-001: ausdrückliche Nutzerfreigabe je Veröffentlichungs-/Deployment-Umfang.
- DEC-REL-002: Test, Audit und Planabschluss sind keine Release-Freigabe.
- DEC-REL-003: local-first; direkte Live-Bearbeitung ist ausgeschlossen.
- SRC-0051.b, SRC-0052.d und SRC-0068.a sind mit Originaltext und
  ausdrücklich abgelösten Teilen in `release-decisions.md` dokumentiert.

## Offene Fragen und Deckungslücken im geprüften Umfang

- SRC-0452.g (`docs/ausbauplan.md:411`): Individual approvals for the remaining Kajak gallery images are not evidenced by the ZIP chat.
- SRC-0452.h (`docs/ausbauplan.md:411`): Verify removal of Gemeinsam am Fluss in the current intended release and reassess remaining gallery variants.
- SRC-0464.f (`docs/ausbauplan.md:536`): Gruppenabnahme der 13 verbleibenden Kajak-Kacheln ist nicht belegt.
- SRC-0466.s (`docs/ausbauplan.md:620`): Historische Exportparameter und finale Einzelbildabnahmen fehlen für die übrigen Varianten.
- SRC-0504.b (`docs/ausbauplan.md:799`): All galleries need finer captions, smaller magnifiers and centred arrows; preview design still awaits explicit user acceptance.
- SRC-0522.g (`docs/ausbauplan.md:987`): Wie sind Alter, nötige Anonymisierung und ausdrückliche Veröffentlichungsentscheidung jeweils für Nr. 63 und 69?
- SRC-0528.a (`docs/ausbauplan.md:1083`): Welche konkreten aktuellen Dateifassungen und SHA-256-Hashes waren sichtbar und freigegeben?
- SRC-0528.b (`docs/ausbauplan.md:1083`): Wie sind Alter, nötige Anonymisierung und ausdrückliche Veröffentlichungsentscheidung jeweils für Nr. 63 und 69?
- SRC-0658.c (`docs/design-guide.md:213`): Welche genau drei Kinderbilder waren am 22.09.2026 für welche Kajak-Fassung freigegeben, und welche sollen nach Entfernung von kajak-06.jpg in der heutigen 13er-Galerie bleiben?
- SRC-0753.a (`docs/production-briefs/gcs-nach-einem-jahr.md:28`): Galt der ältere README-Wert von 24 Stunden für denselben GCS-Produktionsumfang und wurde er durch 8–11 Stunden ersetzt, oder beschreibt er einen anderen Umfang?
- SRC-0780.a (`docs/production-briefs/gcs-nach-einem-jahr.md:134`): Bezieht sich „erst nach der Veröffentlichung“ auf das GCS-Longform-Video oder das gesamte Paket einschließlich beider Shorts?
- SRC-0922.d (`docs/riverstar/entwurf.md:17`): Soll die abgestimmte Riverstar-EN-Fassung zusätzlich auf die zweisprachige Startseite übernommen werden, oder ausschließlich auf kajak.html stehen?
- SRC-0925.b (`docs/riverstar/entwurf.md:24`): Ist Julie auf DSC_1547.jpg zum Aufnahmezeitpunkt ein erkennbares Kind, und wählen Sie genau dieses Motiv für eine heutige Veröffentlichung aus?
- SRC-0940.a (`docs/riverstar/entwurf.md:60`): Was genau war an den Grabner-Schwimmwesten weniger überzeugend, und soll diese Kritik so in den öffentlichen Bericht?
- SRC-0940.b (`docs/riverstar/entwurf.md:60`): Was genau war an den Grabner-Schwimmwesten weniger überzeugend, und soll diese Kritik so in den öffentlichen Bericht?
- SRC-0948.a (`docs/riverstar/entwurf.md:77`): Welches Gewässer oder welcher Campingplatz gehört zu den Uferfotos DSC_1545.jpg und DSC_1547.jpg vom 13. Juli 2018? Soll für eine genauere Bildunterschrift Ihre Bestätigung von Gewässer oder Campingplatz genügen, oder müssen Gewässer und Ort vor Veröffentlichung beide feststehen?
- SRC-0948.b (`docs/riverstar/entwurf.md:77`): Welches Gewässer oder welcher Campingplatz gehört zu den Uferfotos DSC_1545.jpg und DSC_1547.jpg vom 13. Juli 2018? Soll für eine genauere Bildunterschrift Ihre Bestätigung von Gewässer oder Campingplatz genügen, oder müssen Gewässer und Ort vor Veröffentlichung beide feststehen?
- SRC-0950.a (`docs/riverstar/entwurf.md:82`): Was genau war an den Grabner-Schwimmwesten weniger überzeugend, und soll diese Kritik so in den öffentlichen Bericht?
- SRC-1658.a (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Sollen nach mehreren Wochen tatsächlicher Nutzung zusätzliche, jeweils bestätigte Marvin-Aktionen und eine kompakte Verlaufs-/Monitoringansicht eingeführt werden?
- SRC-1658.b (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Welche der drei optionalen Ausbauten Erinnerungen, wiederkehrende Wartung und Druckübersicht werden nach Pilotnutzung beauftragt?
- SRC-1658.c (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Welche Datenschutz- und Bedienentscheidung gilt jeweils für einen später beauftragten Ausbau?
- SRC-2042.e (`video-production/sardinia-2019/analysis.md:308`): Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?
- SRC-2247.d (`video-production/sardinia-2019/README.md:333`): Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?


Alle ursprünglichen Kandidaten sind fachlich geprüft. Coverage-Reparatur und Abnahmeschranken bleiben offen.
