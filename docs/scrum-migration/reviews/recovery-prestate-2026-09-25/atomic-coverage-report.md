# Atomarer Coverage- und Prüffortschritt

Die Kandidatenzahl ist weiterhin eine Arbeitsgröße, keine bestätigte Zahl aller
atomaren Originalanforderungen. Nur Zeilen mit Prüfpaket, konkreter Zielstelle und
individueller Begründung gelten als fachlich geprüft. Frühere bloße Zuordnungen zählen nicht.

## Fortschritt

- Fachlich bearbeitete Prüfpakete (keine Deckungsabnahme): PKG-001, PKG-002, PKG-003, PKG-004, PKG-005, PKG-006, PKG-007, PKG-008, PKG-009, PKG-010, PKG-011, PKG-012, PKG-013, PKG-014, PKG-015, PKG-016, PKG-017, PKG-018, PKG-019, PKG-020, PKG-021, PKG-022, PKG-023, PKG-024, PKG-025, PKG-026, PKG-027, PKG-028, PKG-029, PKG-030, PKG-031, PKG-032, PKG-033, PKG-034, PKG-035, PKG-036, PKG-037, PKG-038, PKG-039, PKG-040, PKG-041, PKG-042, PKG-043, PKG-044, PKG-045, PKG-046, PKG-047, PKG-048, PKG-049, PKG-050, PKG-051, PKG-052, PKG-053, PKG-054
- Fachlich geprüfte Originalblöcke: 1105 / 1106
- Fachlich geprüfte ursprüngliche Kandidaten: 2908 / 2908
- Ungeprüfte ursprüngliche Kandidaten: 0
- Nachträglich erkannte Nachfolger durch Teilung: 356
- Bestätigte eigenständige Anforderungen/Regeln im geprüften Umfang: 1465
- Offene Deckungslücken im geprüften Umfang: 921
- Offene fachliche Entscheidungen im geprüften Umfang: 893
- Nächstes Paket: keines; alle ursprünglichen Kandidaten geprüft, 0 noch ungeprüfte Kandidaten

## Planning Coverage der fachlich geprüften ursprünglichen Kandidaten

- Covered: 982
- Rule / Constraint: 306
- Duplicate: 6
- Merged / Split: 104 / 120
- Kontext ohne zusätzliche Pflicht: 444
- Partially Covered: 876
- Unresolved: 35
- Noch nicht fachlich geprüft: 0

## Implementation Verification (getrennte Quellstatus-Achse)

Diese Zahlen sind keine Code- oder Live-Abnahme.

- Verified Existing: 0
- Existing / Verify: 338
- Planned: 310
- Blocked: 45
- Unverified / unknown: 2215

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
- Acht Kandidaten sind Partially Covered: SRC-0464.f/i/m/af/ah/am und SRC-0466.s/aa. PKG-014 ist nicht bestanden. Diese Migration prüfte weder Produktimplementierung noch Live-Zustand.

## Prüfnachweis PKG-015 (SRC-0470–SRC-0479; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 15 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraint-Register geprüft; die Kandidaten ergeben je Block exakt den Originalwortlaut.
- SRC-0470.a, SRC-0472.a, SRC-0476.a und SRC-0477.a haben je zwei getrennt prüfbare Nachfolger. Der aktive GCS-Planwert 8–11 Zielstunden und die ältere README-Angabe 24 geschätzte Stunden bleiben als ungeklärter Bedeutungs-/Zeitkonflikt sichtbar (SRC-0470.a2).
- Die EXPLORE-/MOVE-Briefs und Pakete sind getrennt geplant. VAN-Paketfestlegung und zehn GCS-Fakten sind historische Quellstände; Produktion, weitere Freigaben, Phase-0-Entscheidungen und schriftliche Abnahme sind offen. Technische Board-Referenz und verbindliche Arbeitsliste sind als Autoritätskontext bewahrt.
- SRC-0470.a2 bleibt Partially Covered; PKG-015 ist nicht bestanden. Die Planmigration prüfte weder Implementierung noch Live-Zustand und erteilte keine Produkt- oder Release-Freigabe.

## Prüfnachweis PKG-016 (SRC-0480–SRC-0489; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4be2da22d03620a99ed1fd65`: zehn aktuelle vollständige Originalblöcke und 22 ursprüngliche Kandidaten mit Story-AC, Tasks, Matrix und Constraint-Register abgeglichen; jede Quellklausel bleibt wortgetreu rückverfolgbar.
- Zusammengesetzte Phase-0-Entscheidungen, Datenstrukturen, Schutz- und UI-Kriterien sowie Marvin-Rechte wurden in 45 einzeln prüfbare Nachfolger geteilt. ST-BRD-01/02/03/04 nennen nun die konkreten AC; src-0483 gilt als Gate für alle vier Board-Stories.
- Prioritätswerte, Fast-Track-Kriterien, Archivfrist, Review-Regeln, Beispiele, Warnungskatalog und Betriebsvertrag sind nur geplant. Ihre konkrete Festlegung und die schriftliche Phase-0-Abnahme bleiben offen; sie sind keine Implementierung oder Release-Freigabe.
- SRC-0484.a1 bleibt Partially Covered: ST-BRD-01 bündelt noch Phase-0-Festlegung, Datenmodell, API und Boardbetrieb statt eines kleinen eigenständig abnehmbaren Vertical Slice. Vor Umsetzungsreife müssen Story- und Task-Zuordnung unter Erhalt der Quell-IDs geschnitten werden. PKG-016 ist nicht bestanden; Produkt, Live und Deployment wurden nicht geprüft.

## Prüfnachweis PKG-017 (SRC-0490–SRC-0499; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 17 Kandidaten individuell gegen aktuelle Story-AC, Matrix und Constraints geprüft; die Klauseln ergeben je Block exakt den Originaltext.
- SRC-0490 trennt Planner und Board auch bei freiwilligen Links. SRC-0491 bindet acht Prüffelder, Restore von Board/Inbox/Verlauf, geschützten Dump, Live-Nachprüfungen und nur bedingten Webdienst-Neustart an einen gesonderten freigegebenen Release. Die kleine Story-/Task-Zuordnung der bereichsübergreifenden Suite bleibt offen.
- SRC-0492/0493 benennen Importgrenze und sichere Admin-Trennung. SRC-0494 ist nur der historische Reach-Nachweis vom 23.09.2026; SRC-0495–0499 bleiben geplante Trends, Metriken und dokumentierter Export-Analyse-Übernahmeablauf. Das Views-allein-Verbot gilt schon vor der Metrik-Implementierung.
- SRC-0491.a bleibt Partially Covered; PKG-017 ist nicht bestanden. Planung, Implementierung, Release-Freigabe und Live-Prüfung wurden getrennt; keine Produkt- oder Live-Abnahme in diesem Lauf.

## Prüfnachweis PKG-018 (SRC-0500–SRC-0509; Deckung offen)

- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn Originalblöcke und 67 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraints einzeln geprüft. Die zehn Teilkarten von SRC-0509 sind paraphrasierende Fokusklauseln; der vollständige Originalblock bleibt in Matrix und Inventar erhalten.
- Vier zusammengesetzte OPS-Kandidaten wurden in 13 prüfbare Nachfolger geteilt. Erstellung, rechtliche Prüfung, Auth-Platform-Nachweise, OAuth-Umschaltung/Verbindungstest und drei Cockpit-Datenregeln haben getrennte Kriterien.
- Galerievorschau aus SRC-0504 braucht ausdrückliche Designabnahme; Direktnavigation und spätere 301-Redirects sind getrennt. Drei private Farbmuster, vier lokale Bildnutzungen, 83 Inventarvarianten, sechs Kontaktbögen und vier eng ausgenommene Fahrzeugbilder gelten nicht als Gesamtfreigabe.
- Historische Renderer-/HTML-/Scott-Belege sind von Restzentralisierung, Einzel-Sichtabnahme, lokaler Gesamtvorschau, Release-Freigabe und Live-Nachweis getrennt. SRC-0508.j/k und SRC-0509.a bleiben Partially Covered, weil die verbleibenden kleinen Struktur-Slices noch nicht vollständig inventarisiert sind; SRC-0504.b wegen offener Designentscheidung. PKG-018 ist nicht bestanden; keine Produkt- oder Live-Prüfung.

## Verbindliche Release-Entscheidungen

- DEC-REL-001: ausdrückliche Nutzerfreigabe je Veröffentlichungs-/Deployment-Umfang.
- DEC-REL-002: Test, Audit und Planabschluss sind keine Release-Freigabe.
- DEC-REL-003: local-first; direkte Live-Bearbeitung ist ausgeschlossen.
- SRC-0051.b, SRC-0052.d und SRC-0068.a sind mit Originaltext und
  ausdrücklich abgelösten Teilen in `release-decisions.md` dokumentiert.

## Offene Fragen und Deckungslücken im geprüften Umfang

- SRC-0452.f (`docs/ausbauplan.md:411`): Confirm exact scope and current use of the two ZIP rear-view images.
- SRC-0452.g (`docs/ausbauplan.md:411`): Individual approvals for the remaining Kajak gallery images are not evidenced by the ZIP chat.
- SRC-0452.h (`docs/ausbauplan.md:411`): Verify removal of Gemeinsam am Fluss in the current intended release and reassess remaining gallery variants.
- SRC-0464.f (`docs/ausbauplan.md:536`): Gruppenabnahme der 13 verbleibenden Kajak-Kacheln ist nicht belegt.
- SRC-0464.i (`docs/ausbauplan.md:536`): Sechs Reisebilder ohne eindeutigen Archivtreffer benötigen aktuellen Herkunftsnachweis.
- SRC-0464.m (`docs/ausbauplan.md:536`): Zwei Scott-Reise-2026-Varianten benötigen exakten Originalabgleich und Freigabe.
- SRC-0464.af (`docs/ausbauplan.md:536`): Der genaue Google-Fotos-Frame der nahen Scott-Fassung ist offen.
- SRC-0464.ah (`docs/ausbauplan.md:536`): Acht damalige Google-Originalbytes fehlen zum Byteabgleich; aktuellen Stand erneut prüfen.
- SRC-0464.am (`docs/ausbauplan.md:536`): Neun Originaldownloads waren angefordert; nur bei fortbestehender Lücke als Arbeit führen.
- SRC-0466.s (`docs/ausbauplan.md:620`): Historische Exportparameter und finale Einzelbildabnahmen fehlen für die übrigen Varianten.
- SRC-0466.aa (`docs/ausbauplan.md:620`): Zwei Seitenbilder bleiben bis Alternativoriginal oder ausdrücklicher Entscheidung zur realen Campingplatzszene gesperrt.
- SRC-0480.a1 (`docs/ausbauplan.md:713`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0480.a2 (`docs/ausbauplan.md:713`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0480.a3 (`docs/ausbauplan.md:713`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0480.a4 (`docs/ausbauplan.md:713`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0480.a5 (`docs/ausbauplan.md:713`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a1 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a2 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a3 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a4 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a5 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0481.a6 (`docs/ausbauplan.md:716`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0482.a (`docs/ausbauplan.md:720`): Written Phase-0 acceptance has not been supplied.
- SRC-0484.a1 (`docs/ausbauplan.md:725`): Split ST-BRD-01 into independently testable value slices before implementation readiness, retaining all source and task links.
- SRC-0489.d1 (`docs/ausbauplan.md:750`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0489.d2 (`docs/ausbauplan.md:750`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0489.d3 (`docs/ausbauplan.md:750`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0489.d4 (`docs/ausbauplan.md:750`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0489.d5 (`docs/ausbauplan.md:750`): Concrete Phase-0 value/decision and written acceptance remain open.
- SRC-0491.a (`docs/ausbauplan.md:759`): How will the cross-Board test and restore suite be assigned to small independently acceptable Stories and Tasks before implementation readiness?
- SRC-0504.b (`docs/ausbauplan.md:799`): All galleries need finer captions, smaller magnifiers and centred arrows; preview design still awaits explicit user acceptance.
- SRC-0508.j (`docs/ausbauplan.md:844`): Editorial section HTML remains inside data; exact remaining structural work needs section-level scope.
- SRC-0508.k (`docs/ausbauplan.md:844`): Further decomposition and page types remain open; story/task slices are not yet fully enumerated.
- SRC-0509.a (`docs/ausbauplan.md:869`): Remaining page-type and shared-section structure lacks a complete small-slice inventory across relevant stories.
- SRC-0514.a (`docs/ausbauplan.md:956`): Which existing value story should own the equipment-list extension, with fact and photo approval in its AC?
- SRC-0522.g (`docs/ausbauplan.md:987`): Wie sind Alter, nötige Anonymisierung und ausdrückliche Veröffentlichungsentscheidung jeweils für Nr. 63 und 69?
- SRC-0528.a (`docs/ausbauplan.md:1083`): Welche konkreten aktuellen Dateifassungen und SHA-256-Hashes waren sichtbar und freigegeben?
- SRC-0528.b (`docs/ausbauplan.md:1083`): Wie sind Alter, nötige Anonymisierung und ausdrückliche Veröffentlichungsentscheidung jeweils für Nr. 63 und 69?
- SRC-0529.c (`docs/ausbauplan.md:1090`): Welche Scott-spezifischen Body-Abschnitte und CSS-Regeln fehlen noch für die vollständige Kajak-Referenzabnahme?
- SRC-0530.n (`docs/ausbauplan.md:1104`): Welcher neuere vollständige Planregister- und Detailgenerator-Lauf belegt die Behebung dieses konkreten damaligen Blockers, mit welchem Quellstand?
- SRC-0530.p (`docs/ausbauplan.md:1104`): Welcher neuere vollständige Planregister- und Detailgenerator-Lauf belegt die Behebung dieses konkreten damaligen Blockers, mit welchem Quellstand?
- SRC-0532.l (`docs/ausbauplan.md:1151`): Welcher neuere vollständige Planregister- und Detailgenerator-Lauf belegt die Behebung dieses konkreten damaligen Blockers, mit welchem Quellstand?
- SRC-0532.m (`docs/ausbauplan.md:1151`): Welcher neuere vollständige Planregister- und Detailgenerator-Lauf belegt die Behebung dieses konkreten damaligen Blockers, mit welchem Quellstand?
- SRC-0562.c (`docs/betrieb.md:74`): Nach welcher gemeinsam festgelegten Regel wird jedes Cockpit-Kennzeichen Backlog oder Fast Track zugeordnet?
- SRC-0631.a (`docs/design-guide.md:73`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0631.b (`docs/design-guide.md:73`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0635.a (`docs/design-guide.md:108`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0635.b (`docs/design-guide.md:108`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0635.c (`docs/design-guide.md:108`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0635.d (`docs/design-guide.md:108`): Welche bestehende Story übernimmt die vollständigen Ausrüstungsprofile jenseits von Rad und Kajak samt dieser Lesestruktur/Intro-Doppelspalte?
- SRC-0658.c (`docs/design-guide.md:213`): Welche genau drei Kinderbilder waren am 22.09.2026 für welche Kajak-Fassung freigegeben, und welche sollen nach Entfernung von kajak-06.jpg in der heutigen 13er-Galerie bleiben?
- SRC-0753.a (`docs/production-briefs/gcs-nach-einem-jahr.md:28`): Galt der ältere README-Wert von 24 Stunden für denselben GCS-Produktionsumfang und wurde er durch 8–11 Stunden ersetzt, oder beschreibt er einen anderen Umfang?
- SRC-0780.a (`docs/production-briefs/gcs-nach-einem-jahr.md:134`): Bezieht sich „erst nach der Veröffentlichung“ auf das GCS-Longform-Video oder das gesamte Paket einschließlich beider Shorts?
- SRC-0788.a (`docs/project-rules/scrum-planning.md:21`): Projektweiten INVEST-/Vertical-Slice-Check durchführen; ST-CON-01 auf kleine unabhängige Inkremente prüfen.
- SRC-0791.a (`docs/project-rules/scrum-planning.md:34`): Projektweiten INVEST-/Vertical-Slice-Check durchführen; ST-CON-01 auf kleine unabhängige Inkremente prüfen.
- SRC-0791.b (`docs/project-rules/scrum-planning.md:34`): Projektweiten INVEST-/Vertical-Slice-Check durchführen; ST-CON-01 auf kleine unabhängige Inkremente prüfen.
- SRC-0849.a (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Alle öffentlichen Inhaltsgalerien einschließlich der Kajak-Referenz werden aus einer zentralen Galeriequelle erzeugt oder eingebunden?
- SRC-0849.b (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ihre seitenspezifischen Inhalte sind Bildfolge, Alternativtexte, Bildunterschriften, Überschrift und Einleitung?
- SRC-0849.c (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Markup, Raster, responsive Styles und Interaktionen stammen aus derselben Komponente?
- SRC-0849.d (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der gemeinsame `photo-viewer.js` zeigt in der Vollansicht das freigegebene, vollständige Webbild?
- SRC-0849.e (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Designwerte und die Pflicht zur Galerie beziehungsweise eine ausdrücklich genehmigte Ausnahme stehen im [Design Guide](design-guide.md)?
- SRC-0849.f (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bild- und Originalschutz sowie die vollständige Prüfmatrix in Abschnitt 6.1 des [Gesamtauftrags](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md)?
- SRC-0849.g (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gemeinsame Symbolgrafiken müssen auch unter der produktiven Content-Security- Policy sichtbar sein?
- SRC-0849.h (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Lupe wird deshalb als gleichursprüngliche Datei ausgeliefert?
- SRC-0849.i (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: ein rein lokal funktionierendes `data:`-Bild gilt nicht als abgenommen?
- SRC-0849.j (`docs/responsive-templates.md:88`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der Live-Browserlauf prüft CSP-Fehler und Galerieansichten?
- SRC-0850.a (`docs/responsive-templates.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Das gemeinsame Website-Grundlayout und die inhaltlichen Seitentypen sind zu trennen?
- SRC-0850.b (`docs/responsive-templates.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Das Grundlayout beziehungsweise seine Bausteine verwalten gemeinsame Gestaltung, Header, Navigation, Footer und die Einbindung gemeinsamer Styles und Funktionen?
- SRC-0851.b (`docs/responsive-templates.md:107`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Kajak-Seite selbst und weitere passende Aktivitäts- oder Themenseiten verwenden danach dieselbe Template-Implementierung?
- SRC-0852.a (`docs/responsive-templates.md:109`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der Aufbau muss mit anderen Inhalten nutzbar sein, ohne Layout oder Funktionen neu zu programmieren und ohne die vollständige Kajak-Seite zu kopieren?
- SRC-0853.a (`docs/responsive-templates.md:113`): Welche getrennten AC-/Task-Nachweise belegen konkret: Überführe den passenden Aufbau der vorhandenen Fahrzeug-Seite in ein wiederverwendbares Fahrzeug-Template?
- SRC-0853.b (`docs/responsive-templates.md:113`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gemeinsame Gestaltung und Komponenten kommen aus derselben zentralen Grundlage wie bei der Kajak-Seite?
- SRC-0854.a (`docs/responsive-templates.md:115`): Welche getrennten AC-/Task-Nachweise belegen konkret: Inhalte und optionale Abschnitte werden pro Fahrzeug konfiguriert?
- SRC-0854.b (`docs/responsive-templates.md:115`): Welche getrennten AC-/Task-Nachweise belegen konkret: Neue Fahrzeugseiten dürfen keine Kopien der gesamten bestehenden Fahrzeugseite benötigen?
- SRC-0855.a (`docs/responsive-templates.md:119`): Welche getrennten AC-/Task-Nachweise belegen konkret: Erstelle beziehungsweise konsolidiere eine wiederverwendbare Struktur für Reiseberichte?
- SRC-0855.b (`docs/responsive-templates.md:119`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bestehende passende Generatoren oder Templates sind zuerst zu prüfen und weiterzuverwenden?
- SRC-0856.a (`docs/responsive-templates.md:121`): Welche getrennten AC-/Task-Nachweise belegen konkret: Texte, Bilder, Galerien und bereits vorhandene weitere Berichtselemente werden pro Reisebericht als Inhalt eingebunden?
- SRC-0856.b (`docs/responsive-templates.md:121`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der Bericht muss ausreichend flexibel bleiben, ohne individuelle Layoutkopien zu erzeugen?
- SRC-0857.a (`docs/responsive-templates.md:125`): Welche getrennten AC-/Task-Nachweise belegen konkret: Nicht jede Seite muss alle möglichen Abschnitte enthalten?
- SRC-0857.b (`docs/responsive-templates.md:125`): Welche getrennten AC-/Task-Nachweise belegen konkret: Fehlende optionale Inhalte dürfen keine leeren Blöcke, unnötigen Überschriften oder falschen Abstände erzeugen?
- SRC-0858.a (`docs/responsive-templates.md:127`): Welche getrennten AC-/Task-Nachweise belegen konkret: Weitere bestehende öffentliche Unterseiten, etwa Übersichtsseiten, werden sinnvoll in die gemeinsame Komponentenarchitektur eingeordnet?
- SRC-0858.b (`docs/responsive-templates.md:127`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine Seite in ein inhaltlich unpassendes Detailseiten-Template zwingen?
- SRC-0859.g (`docs/responsive-templates.md:129`): Welche getrennten AC-/Task-Nachweise belegen konkret: eine Weiterleitung ist keine Übersichtsseite?
- SRC-0859.h (`docs/responsive-templates.md:129`): Welche getrennten AC-/Task-Nachweise belegen konkret: Auch eine nicht vorhandene öffentliche `.html`-Seite leitet im lokalen und produktiven Seitenrouter zur Startseite?
- SRC-0859.i (`docs/responsive-templates.md:129`): Welche getrennten AC-/Task-Nachweise belegen konkret: fehlende Bilder, Skripte, geschützte Bereiche und API-Routen bleiben erkennbare Fehler statt scheinbarer Startseiten-Antworten?
- SRC-0860.a (`docs/responsive-templates.md:142`): Welche getrennten AC-/Task-Nachweise belegen konkret: **Ausrüstungs-Detailseiten:** Das vollständige Scott-Radprofil verwendet die Kajak-/Aktivitäts-Hero- und Galerie-Bausteine und muss auch in Typografie, Abschnittsrhythmus, Bild-Tex?
- SRC-0860.d (`docs/responsive-templates.md:142`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ein gemeinsamer Renderer allein ist kein Nachweis visueller Übereinstimmung?
- SRC-0860.e (`docs/responsive-templates.md:142`): Welche getrennten AC-/Task-Nachweise belegen konkret: Auch redaktionelle Textlinks in Einleitungen und Bild-Text-Abschnitten beziehen Farbe, Unterstreichung, Unterstreichungsabstand und Fokusmarke aus `detail-editorial.css`?
- SRC-0860.f (`docs/responsive-templates.md:142`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ein seitenspezifischer Linkstil für fertige Ausrüstungsprofile ist nicht zulässig?
- SRC-0860.g (`docs/responsive-templates.md:142`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der Browser-Abgleich prüft die berechneten Stile auf Kajak und Scott in allen Referenzbreiten?
- SRC-0861.a (`docs/responsive-templates.md:157`): Welche getrennten AC-/Task-Nachweise belegen konkret: Der gesamte Auftrag gilt gleichermaßen für Desktop, Tablet und Smartphone?
- SRC-0861.b (`docs/responsive-templates.md:157`): Welche getrennten AC-/Task-Nachweise belegen konkret: Es reicht nicht, nur die Desktop-Ansicht zu vereinheitlichen und mobile Sonderimplementierungen bestehen zu lassen?
- SRC-0862.a (`docs/responsive-templates.md:159`): Welche getrennten AC-/Task-Nachweise belegen konkret: Aktuell bestehende unbeabsichtigte Unterschiede zwischen den mobilen Unterseiten müssen untersucht und bereinigt werden?
- SRC-0862.b (`docs/responsive-templates.md:159`): Welche getrennten AC-/Task-Nachweise belegen konkret: Sie dürfen nicht einfach in neue Templates übernommen werden?
- SRC-0863.a (`docs/responsive-templates.md:161`): Welche getrennten AC-/Task-Nachweise belegen konkret: Es soll eine zentral gepflegte responsive Website entstehen, keine unabhängig voneinander gepflegte Desktop- und Mobilversion?
- SRC-0863.b (`docs/responsive-templates.md:161`): Welche getrennten AC-/Task-Nachweise belegen konkret: Jede Komponente und jedes Seitentemplate enthält die zugehörigen Regeln für die relevanten Bildschirmgrößen?
- SRC-0865.a (`docs/responsive-templates.md:165`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Header und mobile Navigation: Logo-Darstellung, Abstände, Menübutton, Menüansicht, aktive Menüpunkte, Öffnen, Schließen und Scrollverhalten?
- SRC-0866.a (`docs/responsive-templates.md:166`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Inhaltsdarstellung: Seitenränder, Typografie, Überschriften, Abschnittsabstände, Bilddarstellung und Übergang von mehrspaltigen zu einspaltigen Bereichen?
- SRC-0867.a (`docs/responsive-templates.md:167`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Interaktive Elemente: Buttons, Karten, Galerien und Bildvergrößerung einschließlich vorhandener Touch- und gegebenenfalls Swipe-Funktionen?
- SRC-0868.a (`docs/responsive-templates.md:168`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Responsive Umschaltpunkte und komponentenbezogene Regeln, ohne separate CSS-Kopien je Seite?
- SRC-0869.a (`docs/responsive-templates.md:170`): Welche getrennten AC-/Task-Nachweise belegen konkret: **Definition von Einheitlichkeit:** Bei gleicher Bildschirmbreite, gleicher ausdrücklich definierten Variante und gleichem Zustand müssen gemeinsame Komponenten gleich gestaltet se?
- SRC-0869.b (`docs/responsive-templates.md:170`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ihre jeweiligen Inhalte dürfen unterschiedlich sein?
- SRC-0869.c (`docs/responsive-templates.md:170`): Welche getrennten AC-/Task-Nachweise belegen konkret: Unterschiedliche Textlängen oder Inhalte bedeuten nicht, dass jede Seite eine identische Gesamthöhe haben muss?
- SRC-0870.a (`docs/responsive-templates.md:172`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Fahrzeug-, Kajak-/Aktivitäts- und Reisebericht-Templates dürfen sich in ihrem inhaltlichen Aufbau unterscheiden?
- SRC-0870.b (`docs/responsive-templates.md:172`): Welche getrennten AC-/Task-Nachweise belegen konkret: Derselbe gemeinsam verwendete Baustein darf aber nicht allein wegen des Seitentyps anders aussehen oder funktionieren?
- SRC-0872.a (`docs/responsive-templates.md:178`): Welche getrennten AC-/Task-Nachweise belegen konkret: Titel, Texte, Bilder, Bildunterschriften, Galerien, technische Daten, Links und SEO-Metadaten werden getrennt von der gemeinsamen Darstellung gepflegt?
- SRC-0873.a (`docs/responsive-templates.md:180`): Welche getrennten AC-/Task-Nachweise belegen konkret: Nutze die zum bestehenden Projekt passende Datenhaltung und Bearbeitungsweise?
- SRC-0873.b (`docs/responsive-templates.md:180`): Welche getrennten AC-/Task-Nachweise belegen konkret: Vorhandene redaktionelle Arbeitsabläufe und maßgebliche Datenquellen bleiben erhalten?
- SRC-0873.c (`docs/responsive-templates.md:180`): Welche getrennten AC-/Task-Nachweise belegen konkret: Kein unnötiges zweites Inhaltssystem einführen?
- SRC-0874.a (`docs/responsive-templates.md:182`): Welche getrennten AC-/Task-Nachweise belegen konkret: Neue Seiten entstehen durch Auswahl eines Seitentyps und Eingabe der Inhalte?
- SRC-0874.b (`docs/responsive-templates.md:182`): Welche getrennten AC-/Task-Nachweise belegen konkret: Globale Designänderungen erfolgen zentral?
- SRC-0874.c (`docs/responsive-templates.md:182`): Welche getrennten AC-/Task-Nachweise belegen konkret: Änderungen am Inhalt einer einzelnen Seite bleiben auf diese Seite beschränkt?
- SRC-0875.a (`docs/responsive-templates.md:184`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bestehende Sprachversionen und die Sprachumschaltung müssen erhalten bleiben?
- SRC-0875.b (`docs/responsive-templates.md:184`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gemeinsam verwendete Komponenten und Templates dürfen keine getrennt gepflegten Designkopien für Deutsch und Englisch erfordern?
- SRC-0876.a (`docs/responsive-templates.md:188`): Welche getrennten AC-/Task-Nachweise belegen konkret: Erstelle nicht nur Komponenten und Templates für spätere Seiten, sondern stelle die vorhandenen passenden Unterseiten auf die gemeinsame Grundlage um?
- SRC-0878.b (`docs/responsive-templates.md:192`): Welche getrennten AC-/Task-Nachweise belegen konkret: Aktuelle Projektregeln, Architektur, Seiten, Generatoren, Styles und Skripte prüfen?
- SRC-0878.c (`docs/responsive-templates.md:192`): Welche getrennten AC-/Task-Nachweise belegen konkret: Referenzzustände von Kajak-Seite und Startseite sichern?
- SRC-0879.b (`docs/responsive-templates.md:193`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gemeinsame Bausteine sowie sinnvolle Strukturunterschiede und unbeabsichtigte Abweichungen identifizieren?
- SRC-0880.b (`docs/responsive-templates.md:194`): Welche getrennten AC-/Task-Nachweise belegen konkret: Zentrale Gestaltung, Komponenten und Seitentemplates ableiten?
- SRC-0880.c (`docs/responsive-templates.md:194`): Welche getrennten AC-/Task-Nachweise belegen konkret: den vorgesehenen Aufbau kurz dokumentieren?
- SRC-0881.b (`docs/responsive-templates.md:195`): Welche getrennten AC-/Task-Nachweise belegen konkret: Kajak-Seite als Referenz migrieren und vergleichen?
- SRC-0881.c (`docs/responsive-templates.md:195`): Welche getrennten AC-/Task-Nachweise belegen konkret: anschließend Fahrzeugseite, Reiseberichte und weitere passende Unterseiten umstellen?
- SRC-0882.b (`docs/responsive-templates.md:196`): Welche getrennten AC-/Task-Nachweise belegen konkret: Unbenötigte Parallelimplementierungen nach erfolgreicher Umstellung entfernen und vollständige Prüfungen durchführen?
- SRC-0883.a (`docs/responsive-templates.md:198`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bestehende Inhalte, Bilder, URLs, relevante Anker, interne Links, SEO-Metadaten und Funktionen erhalten?
- SRC-0883.b (`docs/responsive-templates.md:198`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine Texte umschreiben oder Inhalte entfernen, nur damit sie in ein Template passen?
- SRC-0884.a (`docs/responsive-templates.md:200`): Welche getrennten AC-/Task-Nachweise belegen konkret: Nach Möglichkeit auf der vorhandenen technischen Grundlage aufbauen?
- SRC-0884.b (`docs/responsive-templates.md:200`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ein Framework-Wechsel ist nicht automatisch Teil dieses Auftrags?
- SRC-0884.c (`docs/responsive-templates.md:200`): Welche getrennten AC-/Task-Nachweise belegen konkret: Sollte eine grundlegende Architekturänderung tatsächlich notwendig sein, den konkreten Bedarf und die Auswirkungen vor einem solchen Wechsel offenlegen?
- SRC-0885.a (`docs/responsive-templates.md:204`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Umstellung ist erst abgeschlossen, wenn die betroffenen bestehenden Seiten und die geschützte Startseite geprüft sind?
- SRC-0885.b (`docs/responsive-templates.md:204`): Welche getrennten AC-/Task-Nachweise belegen konkret: Fehlende Prüfungen müssen ausdrücklich als offen ausgewiesen werden?
- SRC-0886.a (`docs/responsive-templates.md:208`): Welche getrennten AC-/Task-Nachweise belegen konkret: Prüfe repräsentative Ansichten beispielsweise bei 360, 390, 768, 1024 und 1440 CSS-Pixeln sowie die Übergänge zwischen den Layouts?
- SRC-0886.b (`docs/responsive-templates.md:208`): Welche getrennten AC-/Task-Nachweise belegen konkret: Diese Werte sind Testgrößen, keine Vorgabe für die technische Festlegung der Umschaltpunkte?
- SRC-0888.a (`docs/responsive-templates.md:212`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Kajak-, Fahrzeug- und Reiseberichtseiten sowie weitere migrierte Unterseiten?
- SRC-0889.a (`docs/responsive-templates.md:213`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Startseite auf unveränderten Aufbau, Look and Feel und Funktionen?
- SRC-0890.a (`docs/responsive-templates.md:214`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Mobile Menüs, aktive Navigationszustände, Links und Sprachumschaltung?
- SRC-0891.a (`docs/responsive-templates.md:215`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Galerien, Bildvergrößerung, Schließen, Tastaturbedienung und vorhandene Touch-Funktionen?
- SRC-0892.a (`docs/responsive-templates.md:216`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Hoch- und Querformat sowie kurze, lange und fehlende optionale Inhalte?
- SRC-0893.a (`docs/responsive-templates.md:217`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Unbeabsichtigtes horizontales Scrollen, abgeschnittene Inhalte, Überlagerungen und unbedienbare Elemente?
- SRC-0894.a (`docs/responsive-templates.md:219`): Welche getrennten AC-/Task-Nachweise belegen konkret: Nutze reproduzierbare visuelle und funktionale Prüfungen passend zur vorhandenen Testumgebung?
- SRC-0894.b (`docs/responsive-templates.md:219`): Welche getrennten AC-/Task-Nachweise belegen konkret: Zwischen Browser-Emulation und Tests auf tatsächlichen Geräten unterscheiden?
- SRC-0894.c (`docs/responsive-templates.md:219`): Welche getrennten AC-/Task-Nachweise belegen konkret: keine Geräteprüfung behaupten, die nicht durchgeführt wurde?
- SRC-0896.a (`docs/responsive-templates.md:225`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Eine Änderung an der zentralen Navigation erscheint auf sämtlichen betroffenen Seiten ohne manuelle Einzeländerungen?
- SRC-0897.a (`docs/responsive-templates.md:226`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Eine Änderung an der zentralen Galerie gilt für alle Instanzen dieser Galerie?
- SRC-0898.a (`docs/responsive-templates.md:227`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Eine Änderung an einem Seitentemplate wird von allen Seiten dieses Typs übernommen?
- SRC-0899.a (`docs/responsive-templates.md:228`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Dasselbe gilt ausdrücklich für mobile Navigation, mobile Galerie und mobile Template-Layouts?
- SRC-0900.a (`docs/responsive-templates.md:229`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Die Startseite behält dabei ihre ausdrücklich geschützte Gestaltung beziehungsweise ihre definierte Komponentenvariante?
- SRC-0901.a (`docs/responsive-templates.md:231`): Welche getrennten AC-/Task-Nachweise belegen konkret: Diese Wirkung muss durch die tatsächliche Nutzung gemeinsamer Quellen nachgewiesen sein, nicht nur durch momentan ähnlich aussehende Kopien?
- SRC-0902.a (`docs/responsive-templates.md:235`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dokumentiere und überprüfe, wie eine weitere Aktivitätsseite, Fahrzeugseite und ein weiterer Reisebericht aus dem jeweiligen Template mit neuen Inhalten entstehen?
- SRC-0902.b (`docs/responsive-templates.md:235`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dafür keine erfundenen öffentlichen Beispielseiten veröffentlichen?
- SRC-0902.c (`docs/responsive-templates.md:235`): Welche getrennten AC-/Task-Nachweise belegen konkret: Beispiele können als Testdaten oder Dokumentation dienen?
- SRC-0903.a (`docs/responsive-templates.md:239`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dieser Auftrag darf nicht nur als Chatnachricht oder Erinnerung bestehen bleiben?
- SRC-0904.a (`docs/responsive-templates.md:241`): Welche getrennten AC-/Task-Nachweise belegen konkret: Lies vor Änderungen die aktuelle `AGENTS.md`, gegebenenfalls weitere für die betroffenen Verzeichnisse geltende Arbeitsregeln, die `README.md` und die relevanten Projektunterlagen?
- SRC-0905.b (`docs/responsive-templates.md:243`): Welche getrennten AC-/Task-Nachweise belegen konkret: Falls bereits eine inhaltlich entsprechende maßgebliche Spezifikation existiert, konsolidiere die Anforderungen dort und verwende überall denselben Verweis?
- SRC-0905.c (`docs/responsive-templates.md:243`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine widersprüchlichen Parallelfassungen anlegen?
- SRC-0907.a (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: > Öffentliche Unterseiten verwenden zentrale responsive Komponenten und die vorgesehenen wiederverwendbaren Kajak-/Aktivitäts-, Fahrzeug- und Reisebericht-Templates?
- SRC-0907.b (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gemeinsames Markup, CSS und Verhalten dürfen nicht pro Seite kopiert oder separat gepflegt werden?
- SRC-0907.d (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Regeln gelten auf Desktop, Tablet und Smartphone?
- SRC-0907.e (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Startseite behält ihr eigenständiges Layout und ihre bisherige Darstellung und Funktion auf allen Bildschirmgrößen?
- SRC-0907.f (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: gemeinsame Komponenten dürfen sie nicht unbeabsichtigt verändern?
- SRC-0907.g (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: Seitenspezifische Unterschiede werden über Inhalte, Konfiguration oder ausdrücklich definierte Varianten umgesetzt?
- SRC-0907.h (`docs/responsive-templates.md:247`): Welche getrennten AC-/Task-Nachweise belegen konkret: Vor relevanten Änderungen die vollständige Spezifikation in `docs/responsive-templates.md` lesen und die dortigen Abnahmekriterien anwenden?
- SRC-0908.a (`docs/responsive-templates.md:249`): Welche getrennten AC-/Task-Nachweise belegen konkret: Den Auftrag und seinen tatsächlichen Fortschritt im bestehenden `docs/ausbauplan.md` verankern?
- SRC-0908.b (`docs/responsive-templates.md:249`): Welche getrennten AC-/Task-Nachweise belegen konkret: Weitere tatsächlich betroffene Plan- oder Statusdokumente entsprechend den vorhandenen Projektregeln konsistent aktualisieren?
- SRC-0908.c (`docs/responsive-templates.md:249`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dokumentiert, implementiert, geprüft und live verifiziert nicht miteinander gleichsetzen?
- SRC-0909.a (`docs/responsive-templates.md:251`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bestehende Projektregeln zu Fotos, Originaldateien, Sicherheit, Datenhaltung und Veröffentlichung bleiben wirksam?
- SRC-0909.b (`docs/responsive-templates.md:251`): Welche getrennten AC-/Task-Nachweise belegen konkret: Diese technische Konsolidierung ist kein Auftrag, neue Bilder zu bearbeiten oder Bildarchive zu verändern?
- SRC-0910.a (`docs/responsive-templates.md:255`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die technische Umsetzung erfolgt im bestehenden Website-Arbeitsablauf?
- SRC-0910.b (`docs/responsive-templates.md:255`): Welche getrennten AC-/Task-Nachweise belegen konkret: Beachte die aktuellen Projektregeln für Tests, Veröffentlichung, Live-Verifikation und das Schließen verwendeter Remote-Sitzungen?
- SRC-0910.c (`docs/responsive-templates.md:255`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ein fehlgeschlagener Test oder fehlender erforderlicher Zugriff ist konkret auszuweisen?
- SRC-0910.d (`docs/responsive-templates.md:255`): Welche getrennten AC-/Task-Nachweise belegen konkret: keinen erfolgreichen Rollout behaupten?
- SRC-0912.a (`docs/responsive-templates.md:259`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Welche gemeinsamen Komponenten und Seitentemplates existieren und welche bestehenden Seiten sie tatsächlich verwenden?
- SRC-0913.a (`docs/responsive-templates.md:260`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Wo globale Gestaltung, Navigation, Galeriefunktionen und einzelne Seiteninhalte gepflegt werden?
- SRC-0914.a (`docs/responsive-templates.md:261`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Wie neue Seiten der drei Seitentypen erstellt werden?
- SRC-0915.a (`docs/responsive-templates.md:262`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Welche Desktop-, Tablet- und Mobilprüfungen durchgeführt wurden und mit welchem Ergebnis?
- SRC-0916.a (`docs/responsive-templates.md:263`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Ob die Startseite und die Kajak-Referenz unverändert erhalten geblieben sind?
- SRC-0916.b (`docs/responsive-templates.md:263`): Welche getrennten AC-/Task-Nachweise belegen konkret: unvermeidbare oder offene Abweichungen konkret nennen?
- SRC-0917.a (`docs/responsive-templates.md:264`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Welche Änderungen nur vorbereitet, im Repository gesichert oder bereits live verifiziert sind und welche Restarbeiten bestehen?
- SRC-0918.a (`docs/responsive-templates.md:266`): Welche getrennten AC-/Task-Nachweise belegen konkret: **Gesamtleitlinie:** Eine gemeinsame Designsprache, zentrale responsive Bausteine und wiederverwendbare Seitentemplates für die Unterseiten – auf Desktop, Tablet und Smartphone?
- SRC-0918.b (`docs/responsive-templates.md:266`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Startseite bleibt eigenständig?
- SRC-0918.c (`docs/responsive-templates.md:266`): Welche getrennten AC-/Task-Nachweise belegen konkret: Einmal zentral ändern, auf allen betroffenen Seiten übernehmen, ohne manuelle Einzelpflege?
- SRC-0919.a (`docs/riverstar/entwurf.md:3`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dieser Entwurf ist eine redaktionelle Referenz, kein eigener Arbeitsplan?
- SRC-0919.b (`docs/riverstar/entwurf.md:3`): Welche getrennten AC-/Task-Nachweise belegen konkret: Verbindliche offene und erledigte Punkte stehen ausschließlich im [Gesamtplan](../ausbauplan.md)?
- SRC-0921.a (`docs/riverstar/entwurf.md:9`): Welche getrennten AC-/Task-Nachweise belegen konkret: **Live-Aufmacher:** Die öffentliche Kajak-Seite verwendet `P7020092.jpg` als gespiegeltes Reviewderivat?
- SRC-0921.b (`docs/riverstar/entwurf.md:9`): Welche getrennten AC-/Task-Nachweise belegen konkret: Das Boot liegt dadurch rechts?
- SRC-0921.c (`docs/riverstar/entwurf.md:9`): Welche getrennten AC-/Task-Nachweise belegen konkret: links sorgt der standardisierte, helle Farbverlauf für den Seitentitel und die Einleitung?
- SRC-0921.d (`docs/riverstar/entwurf.md:9`): Welche getrennten AC-/Task-Nachweise belegen konkret: Quelle, unveränderte Projektkopie und Hash stehen in [bildquellen.json](bildquellen.json)?
- SRC-0922.a (`docs/riverstar/entwurf.md:17`): Welche getrennten AC-/Task-Nachweise belegen konkret: „Am Ufer hört unsere Reise nicht auf.“ Ein persönlicher Einstieg mit großem Originalfoto, drei Vorteile für Reisen mit dem Van, eine kurze eigene Reiseerinnerung, eigenständig form?
- SRC-0922.b (`docs/riverstar/entwurf.md:17`): Welche getrennten AC-/Task-Nachweise belegen konkret: Naturfarben und großzügige Bilder passen zum bestehenden Auftritt?
- SRC-0922.c (`docs/riverstar/entwurf.md:17`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Vorschau ist deutschsprachig?
- SRC-0922.d (`docs/riverstar/entwurf.md:17`): Soll die abgestimmte Riverstar-EN-Fassung auf die zweisprachige Startseite oder ausschließlich auf kajak.html?
- SRC-0923.a (`docs/riverstar/entwurf.md:19`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die bestehende Sektion in index.html bleibt bis zur Abstimmung erhalten?
- SRC-0924.b (`docs/riverstar/entwurf.md:23`): Welche getrennten AC-/Task-Nachweise belegen konkret: **DSC_1545.jpg:** Aufmacher?
- SRC-0925.b (`docs/riverstar/entwurf.md:24`): Ist Julie auf DSC_1547.jpg zum Aufnahmezeitpunkt ein erkennbares Kind, und wird genau dieses Bild für die Veröffentlichung ausgewählt?
- SRC-0926.b (`docs/riverstar/entwurf.md:25`): Welche getrennten AC-/Task-Nachweise belegen konkret: **DSC_1514.jpg:** California am Campingplatz als Verbindung zwischen Van und Kajak?
- SRC-0927.a (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die vollständigen Archivpfade, unveränderten Projektkopien und SHA-256-Prüfsummen stehen in [bildquellen.json](bildquellen.json)?
- SRC-0927.b (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die ausgewählten Kopien wurden gegen die Archivdateien geprüft?
- SRC-0927.c (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Webbilder wurden ausschließlich aus Projektkopien erzeugt, proportional verkleinert und als JPEG gespeichert?
- SRC-0927.d (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Kennzeichen im Camping-Webbild anonymisiert (Entwurf 04)?
- SRC-0927.e (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Das Archiv blieb unverändert?
- SRC-0927.f (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: Zusätzliche Sichtungskopien liegen unter reisebilder-originale/riverstar?
- SRC-0927.g (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: ihre Herkunft ist in den Sichtungsmanifesten dokumentiert?
- SRC-0927.h (`docs/riverstar/entwurf.md:27`): Welche getrennten AC-/Task-Nachweise belegen konkret: DSC_1541.jpg und DSC_1546.jpg im Hauptordner stammen ebenfalls aus E:/_fotos_original/urlaubsSammlungen/norwegen/rudern?
- SRC-0928.a (`docs/riverstar/entwurf.md:29`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Zuordnung zu Norwegen folgt dem Archiv?
- SRC-0928.b (`docs/riverstar/entwurf.md:29`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die genaue Bucht ist ungeklärt?
- SRC-0928.c (`docs/riverstar/entwurf.md:29`): Welche getrennten AC-/Task-Nachweise belegen konkret: die Bilder werden ausdrücklich nicht als Aurlandsfjord beschriftet?
- SRC-0929.a (`docs/riverstar/entwurf.md:33`): Welche getrennten AC-/Task-Nachweise belegen konkret: Redaktionelle Vorgabe: Auf der Besucherseite keine fremden Erfahrungsberichte, Namen, Teststrecken oder ausgehenden Quellenlinks anzeigen?
- SRC-0929.b (`docs/riverstar/entwurf.md:33`): Welche getrennten AC-/Task-Nachweise belegen konkret: Erkenntnisse in eigenen sachlichen Formulierungen zusammenfassen, ohne fremde Erlebnisse als eigene auszugeben?
- SRC-0929.c (`docs/riverstar/entwurf.md:33`): Welche getrennten AC-/Task-Nachweise belegen konkret: Auch der Herstellerlink wurde aus der Vorschau entfernt?
- SRC-0929.d (`docs/riverstar/entwurf.md:33`): Welche getrennten AC-/Task-Nachweise belegen konkret: interne Links zu eigenen Reisen bleiben bestehen?
- SRC-0931.a (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Herstellerangaben: 500 × 90 cm, 28 kg, zwei Personen, 280 kg Zuladung, Packmaß 70 × 45 × 30 cm, vier Luftkammern, 0,3 bar, zwölf Minuten Aufbauzeit?
- SRC-0931.b (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Grabner betont Sitzkomfort, Beinfreiheit und Stabilität?
- SRC-0931.c (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Seite beschreibt den neuen Wavepiercer-Bug und veränderte Befestigungen?
- SRC-0931.d (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Diese Neuerungen gehören nicht in die Beschreibung des auf den Fotos von 2018 sichtbaren Bootes?
- SRC-0931.e (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Aufbauzeit ist eine Herstellerangabe, keine gemessene eigene Erfahrung?
- SRC-0931.f (`docs/riverstar/entwurf.md:39`): Welche getrennten AC-/Task-Nachweise belegen konkret: Kein aktueller Kaufpreis im Entwurf, da die persönliche Nutzung im Vordergrund steht?
- SRC-0932.a (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: [460-km-Bericht](https://7globetrotters.de/grabner-riverstar-test), veröffentlicht 2021, aktualisiert 2024?
- SRC-0932.b (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: Erfahrungen aus 2020. 460 Kilometer und 16 Paddeltage?
- SRC-0932.c (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: Positiv: robuste Bootshaut, Stabilität, Geradeauslauf bei ruhigem Wasser und Nutzen des Steuers bei Wind?
- SRC-0932.d (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: Einschränkungen: Gewicht beim Umtragen und begrenzter Platz für mehr als zwei Paddler?
- SRC-0932.e (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bericht mit Affiliate-Links, kein standardisierter unabhängiger Labortest?
- SRC-0932.f (`docs/riverstar/entwurf.md:43`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die Angaben zu dieser älteren Ausführung werden nicht auf das Modell 2026 übertragen?
- SRC-0933.c (`docs/riverstar/entwurf.md:47`): Welche getrennten AC-/Task-Nachweise belegen konkret: zugeordnet zu Magazin #18, Sommer 2020?
- SRC-0933.d (`docs/riverstar/entwurf.md:47`): Welche getrennten AC-/Task-Nachweise belegen konkret: Beschreibt Transport im Auto, mehrtägige Nutzung, Packen in kleine Beutel und Kursprobleme ohne montiertes Steuer?
- SRC-0933.e (`docs/riverstar/entwurf.md:47`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine belastbaren vergleichenden Leistungswerte?
- SRC-0933.f (`docs/riverstar/entwurf.md:47`): Welche getrennten AC-/Task-Nachweise belegen konkret: kommerzielles redaktionelles Umfeld?
- SRC-0933.g (`docs/riverstar/entwurf.md:47`): Welche getrennten AC-/Task-Nachweise belegen konkret: Dient intern als Recherchequelle für die Hinweise zu Packen und Steueranlage?
- SRC-0934.c (`docs/riverstar/entwurf.md:51`): Welche getrennten AC-/Task-Nachweise belegen konkret: Laut Videobeschreibung vier Wochen vom Hersteller bereitgestellt?
- SRC-0934.d (`docs/riverstar/entwurf.md:51`): Welche getrennten AC-/Task-Nachweise belegen konkret: außerdem Rabatt-/Affiliate-Verweise?
- SRC-0934.e (`docs/riverstar/entwurf.md:51`): Welche getrennten AC-/Task-Nachweise belegen konkret: Nur Beschreibung geprüft, Video nicht inhaltlich ausgewertet?
- SRC-0934.f (`docs/riverstar/entwurf.md:51`): Welche getrennten AC-/Task-Nachweise belegen konkret: Deshalb keine Leistungsbehauptung daraus in den Entwurf übernommen?
- SRC-0935.a (`docs/riverstar/entwurf.md:55`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Kauf vermutlich Frühjahr 2018, eventuell Sommer/Herbst 2017?
- SRC-0935.b (`docs/riverstar/entwurf.md:55`): Welche getrennten AC-/Task-Nachweise belegen konkret: Öffentlich daher „spätestens seit 2018“, kein behauptetes Baujahr?
- SRC-0936.a (`docs/riverstar/entwurf.md:56`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Großes Zubehörpaket direkt von Grabner?
- SRC-0936.b (`docs/riverstar/entwurf.md:56`): Welche getrennten AC-/Task-Nachweise belegen konkret: Historischer Paketname und vollständiger Lieferumfang sind nicht bestätigt?
- SRC-0937.a (`docs/riverstar/entwurf.md:57`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Grabner-Hecktasche oben auf dem Boot, Zweier-Spritzdecke, Lenkanlage, ECKLA Foldy Bootswagen, Grabner-Schwimmwesten?
- SRC-0938.a (`docs/riverstar/entwurf.md:58`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Schnell aufgebaut, einfach zu verstauen, viel Stauraum und hohe Zuladung?
- SRC-0939.a (`docs/riverstar/entwurf.md:59`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Persönliche Einschätzung: ausgesprochen kippstabil auch bei hohen Wellen, für ein Luftkajak sehr gute Spurtreue und hohes Tempo, extrem robust und langlebig durch Kautschukmateri?
- SRC-0939.b (`docs/riverstar/entwurf.md:59`): Welche getrennten AC-/Task-Nachweise belegen konkret: Als persönliche Erfahrung formuliert, ohne allgemeine Sicherheitsgarantie oder erfundene Messwerte?
- SRC-0940.a (`docs/riverstar/entwurf.md:60`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Schwimmwesten weniger überzeugend?
- SRC-0940.b (`docs/riverstar/entwurf.md:60`): Was ist die konkrete, vom Nutzer bestätigte Ursache der Kritik an den Grabner-Schwimmwesten?
- SRC-0941.a (`docs/riverstar/entwurf.md:61`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Nutzer bestätigt: zwei Erwachsene plus ein Kind/Jugendlicher?
- SRC-0941.b (`docs/riverstar/entwurf.md:61`): Welche getrennten AC-/Task-Nachweise belegen konkret: Im Text als eigene Nutzungseinschätzung, nicht als Herstellerfreigabe?
- SRC-0942.a (`docs/riverstar/entwurf.md:63`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die bisherige Datentabelle zum Modell 2026 wurde durch eure echte Ausstattung ersetzt?
- SRC-0942.b (`docs/riverstar/entwurf.md:63`): Welche getrennten AC-/Task-Nachweise belegen konkret: Damit vermischt der Entwurf keine aktuellen Modellmerkmale mit dem älteren Boot?
- SRC-0943.c (`docs/riverstar/entwurf.md:67`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die aktuelle Tasche ist für Riverstar und Riverstar XXL gelistet, mit 45 Litern nutzbarem Volumen, Befestigungsgurten und schwellwasserdichtem Reißverschluss?
- SRC-0943.d (`docs/riverstar/entwurf.md:67`): Welche getrennten AC-/Task-Nachweise belegen konkret: Passt zur beschriebenen Zubehörart?
- SRC-0943.e (`docs/riverstar/entwurf.md:67`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ob eure 2017/2018 gekaufte Tasche exakt dieser Ausführung entspricht, ist nicht bestätigt?
- SRC-0943.f (`docs/riverstar/entwurf.md:67`): Welche getrennten AC-/Task-Nachweise belegen konkret: deshalb keine Literzahl, Maße oder aktuelle Artikelnummer als Daten eurer Tasche auf der Seite?
- SRC-0945.a (`docs/riverstar/entwurf.md:73`): Welche getrennten AC-/Task-Nachweise belegen konkret: - DSC_1545.jpg: DateTimeOriginal 2018:07:13 11:14:30?
- SRC-0945.b (`docs/riverstar/entwurf.md:73`): Welche getrennten AC-/Task-Nachweise belegen konkret: kein GPS-Ort?
- SRC-0946.a (`docs/riverstar/entwurf.md:74`): Welche getrennten AC-/Task-Nachweise belegen konkret: - DSC_1547.jpg: DateTimeOriginal 2018:07:13 11:15:02?
- SRC-0946.b (`docs/riverstar/entwurf.md:74`): Welche getrennten AC-/Task-Nachweise belegen konkret: kein GPS-Ort?
- SRC-0948.a (`docs/riverstar/entwurf.md:77`): Genügt für genauere Ufer-Bildunterschriften die Bestätigung von Gewässer oder Campingplatz, oder müssen Gewässer und Ort vor Veröffentlichung beide geklärt sein?
- SRC-0948.b (`docs/riverstar/entwurf.md:77`): Darf bis zur Ortsbestätigung nur „Norwegen“ stehen, und welche Bestätigung beendet diesen Zwischenstand?
- SRC-0950.a (`docs/riverstar/entwurf.md:82`): Was ist die konkrete, vom Nutzer bestätigte Ursache der Kritik an den Grabner-Schwimmwesten?
- SRC-0951.a (`docs/riverstar/entwurf.md:85`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine externen Links auf der Besucherseite?
- SRC-0951.b (`docs/riverstar/entwurf.md:85`): Welche getrennten AC-/Task-Nachweise belegen konkret: Quellen bleiben intern?
- SRC-0951.c (`docs/riverstar/entwurf.md:85`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine absolute Kentersicherheit versprechen?
- SRC-0952.a (`docs/riverstar/entwurf.md:89`): Welche getrennten AC-/Task-Nachweise belegen konkret: Alle drei Fotos öffnen per Klick oder Tastatur eine große Dialogansicht?
- SRC-0952.b (`docs/riverstar/entwurf.md:89`): Welche getrennten AC-/Task-Nachweise belegen konkret: Schließen über Schaltfläche, Escape oder äußeren Hintergrund?
- SRC-0952.c (`docs/riverstar/entwurf.md:89`): Welche getrennten AC-/Task-Nachweise belegen konkret: Fokus kehrt zum auslösenden Link zurück?
- SRC-0952.d (`docs/riverstar/entwurf.md:89`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ohne JavaScript öffnet der Bildlink die Webdatei?
- SRC-0952.e (`docs/riverstar/entwurf.md:89`): Welche getrennten AC-/Task-Nachweise belegen konkret: Niemals wird auf eine unveränderte Originaldatei verlinkt?
- SRC-0953.a (`docs/riverstar/entwurf.md:91`): Welche getrennten AC-/Task-Nachweise belegen konkret: [Eckla-Foldy, Herstellerseite](https://www.eckla.de/produkt/eckla-foldy-der-faltbootwagen/): offizielle Schreibweise mit Bindestrich?
- SRC-0953.d (`docs/riverstar/entwurf.md:91`): Welche getrennten AC-/Task-Nachweise belegen konkret: Gewichtsangaben der Seite widersprechen sich (4,9/5,5 kg), daher keine Gewichtsangabe übernommen?
- SRC-0954.a (`docs/riverstar/entwurf.md:93`): Welche getrennten AC-/Task-Nachweise belegen konkret: Grabner beschreibt die aktuelle Riverstar-Ausführung als Zweier?
- SRC-0954.b (`docs/riverstar/entwurf.md:93`): Welche getrennten AC-/Task-Nachweise belegen konkret: Historische Freigabe für das konkrete Boot nicht ermittelt?
- SRC-0954.c (`docs/riverstar/entwurf.md:93`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die vom Nutzer bestätigte Nutzung mit Kind/Jugendlichem ist daher persönlich formuliert?
- SRC-0954.d (`docs/riverstar/entwurf.md:93`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die aktuelle Bug/Heck-Tasche ist für ESCAPE und RIVERSTAR gelistet (45 Liter)?
- SRC-0954.e (`docs/riverstar/entwurf.md:93`): Welche getrennten AC-/Task-Nachweise belegen konkret: keine ungeprüfte Gleichsetzung aktueller Maße mit der historischen Tasche?
- SRC-0955.a (`docs/riverstar/entwurf.md:95`): Welche getrennten AC-/Task-Nachweise belegen konkret: Bildbearbeitung: integriertes Imagegen-Werkzeug, Ausgabe assets/riverstar/california-camping-anonymisiert.png?
- SRC-0955.b (`docs/riverstar/entwurf.md:95`): Welche getrennten AC-/Task-Nachweise belegen konkret: Sichtkontrolle: große vordere Nummerntafel und Hintergrundkennzeichen unkenntlich?
- SRC-0955.c (`docs/riverstar/entwurf.md:95`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die vorherige Webdatei liegt nun im nicht versionierten Originalkopien-Ordner statt im Web-Asset-Verzeichnis?
- SRC-0956.b (`docs/riverstar/entwurf.md:97`): Welche getrennten AC-/Task-Nachweise belegen konkret: Anonymize ALL vehicle license plates: large white VW camper foreground lower right, small dark car far left background, red camper background, car visible through tent window?
- SRC-0956.c (`docs/riverstar/entwurf.md:97`): Welche getrennten AC-/Task-Nachweise belegen konkret: Replace all license plate lettering and identifying crests with plain neutral gray blank plate surfaces?
- SRC-0956.d (`docs/riverstar/entwurf.md:97`): Welche getrennten AC-/Task-Nachweise belegen konkret: Preserve every other feature exactly: people faces, dog, tents, cars, landscape, color, framing, resolution and aspect ratio?
- SRC-0956.e (`docs/riverstar/entwurf.md:97`): Welche getrennten AC-/Task-Nachweise belegen konkret: No beautification, no invented objects, no changes except plate anonymization?
- SRC-0958.a (`docs/riverstar/entwurf.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die gemeinsame Implementierung in photo-viewer.js / photo-viewer.css gilt für Textfotos auf allen Seiten: Norwegen (7), Italien (6), Sardinien (6), Fahrzeugprofil (2), Riverstar-En?
- SRC-0958.b (`docs/riverstar/entwurf.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Logos und dekorative Titelbilder erhalten keine zusätzliche Interaktion?
- SRC-0958.c (`docs/riverstar/entwurf.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: der explizite Aufmacher-Fotolink im Kajakentwurf bleibt vergrößerbar?
- SRC-0958.d (`docs/riverstar/entwurf.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Beide Reisebericht-Generatoren und die Server-Freigabe für öffentliche Dateien sind angepasst?
- SRC-0958.e (`docs/riverstar/entwurf.md:103`): Welche getrennten AC-/Task-Nachweise belegen konkret: Auch später eingefügte Inhaltsfotos werden erkannt?
- SRC-0959.a (`docs/riverstar/entwurf.md:105`): Welche getrennten AC-/Task-Nachweise belegen konkret: Prüfung: Großansicht im Norwegenbericht per Klick und im Fahrzeugprofil per Enter geöffnet, Schließen und Fokusrückgabe geprüft?
- SRC-0959.b (`docs/riverstar/entwurf.md:105`): Welche getrennten AC-/Task-Nachweise belegen konkret: Server-Test bestanden?
- SRC-0959.c (`docs/riverstar/entwurf.md:105`): Welche getrennten AC-/Task-Nachweise belegen konkret: Verwendete Textfotos visuell auf Kennzeichen geprüft?
- SRC-0959.d (`docs/riverstar/entwurf.md:105`): Welche getrennten AC-/Task-Nachweise belegen konkret: bei den Fahrzeugmotiven waren die Nummerntafeln bereits unkenntlich?
- SRC-0959.e (`docs/riverstar/entwurf.md:105`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine Originalbilder geändert?
- SRC-0962.a (`docs/seo.md:10`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Individuelle Titel und Beschreibungen für Startseite, Fahrzeugprofil und drei Reiseberichte?
- SRC-0963.a (`docs/seo.md:11`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Kanonische HTTPS-Adressen, Weiterleitung von `/index.html` auf `/`?
- SRC-0964.a (`docs/seo.md:12`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Open-Graph-Vorschauen und JSON-LD für Website, Seiten und Breadcrumbs?
- SRC-0965.a (`docs/seo.md:13`): Welche getrennten AC-/Task-Nachweise belegen konkret: - `/sitemap.xml` mit fünf öffentlichen Seiten und `/robots.txt` mit Sitemap-Verweis?
- SRC-0966.a (`docs/seo.md:14`): Welche getrennten AC-/Task-Nachweise belegen konkret: - Redaktion, API und Fahrzeugprüfung mit `X-Robots-Tag: noindex, nofollow`?
- SRC-0966.b (`docs/seo.md:14`): Welche getrennten AC-/Task-Nachweise belegen konkret: Entwürfe behalten ihr `noindex`?
- SRC-0967.b (`docs/seo.md:15`): Welche getrennten AC-/Task-Nachweise belegen konkret: Keine erfundenen Bewertungen, Datumsangaben oder Autoreninformationen?
- SRC-0969.a (`docs/seo.md:19`): Welche getrennten AC-/Task-Nachweise belegen konkret: Die englische Umschaltung hat keine eigene URL?
- SRC-0969.b (`docs/seo.md:19`): Welche getrennten AC-/Task-Nachweise belegen konkret: Deshalb werden keine irreführenden `hreflang`-Alternativen angegeben?
- SRC-0974.b (`docs/seo.md:34`): Welche getrennten AC-/Task-Nachweise belegen konkret: Domain in Google Search Console und Bing Webmaster Tools mit dem Eigentümerkonto bestätigen?
- SRC-0974.c (`docs/seo.md:34`): Welche getrennten AC-/Task-Nachweise belegen konkret: danach `https://vanventure.at/sitemap.xml` einreichen?
- SRC-0974.d (`docs/seo.md:34`): Welche getrennten AC-/Task-Nachweise belegen konkret: Ohne bestätigten Kontozugang wurde keine Einreichung vorgenommen?
- SRC-0975.b (`docs/seo.md:35`): Welche getrennten AC-/Task-Nachweise belegen konkret: In der Search Console die fünf URLs prüfen und Indexierung anstoßen?
- SRC-0975.c (`docs/seo.md:35`): Welche getrennten AC-/Task-Nachweise belegen konkret: Indexierung, Suchbegriffe, Impressionen und Klicks nach einigen Wochen beurteilen?
- SRC-0976.b (`docs/seo.md:36`): Welche getrennten AC-/Task-Nachweise belegen konkret: Inhaltlich zunächst konkrete Themen stärken: Norwegen mit VW California, Sardinien mit Camper und Mountainbike, fünf Wochen Italien mit Camper, HYMER Grand Canyon S CrossOver 2025?
- SRC-0977.b (`docs/seo.md:37`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0977.b mit allen im Review genannten Bedingungen ab?
- SRC-0977.c (`docs/seo.md:37`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0977.c mit allen im Review genannten Bedingungen ab?
- SRC-0978.b (`docs/seo.md:38`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0978.b mit allen im Review genannten Bedingungen ab?
- SRC-0978.c (`docs/seo.md:38`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0978.c mit allen im Review genannten Bedingungen ab?
- SRC-1053.a (`docs/vanventure-cockpit-mvp.md:223`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1053.a mit allen im Review genannten Bedingungen ab?
- SRC-1053.b (`docs/vanventure-cockpit-mvp.md:223`): Soll das Verbot für Git, Chat und öffentliche Website nur Geheimnisse erfassen, während Callback-URL und Kanal-Kontoinformation nach gesonderter Freigabe dokumentierbar sind?
- SRC-1054.a (`docs/vanventure-cockpit-mvp.md:226`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1054.a mit allen im Review genannten Bedingungen ab?
- SRC-1055.a (`docs/vanventure-cockpit-mvp.md:227`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1055.a mit allen im Review genannten Bedingungen ab?
- SRC-1056.a (`docs/vanventure-cockpit-mvp.md:228`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1056.a mit allen im Review genannten Bedingungen ab?
- SRC-1057.a (`docs/vanventure-cockpit-mvp.md:229`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1057.a mit allen im Review genannten Bedingungen ab?
- SRC-1058.a (`docs/vanventure-cockpit-mvp.md:231`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1058.a mit allen im Review genannten Bedingungen ab?
- SRC-1059.a (`docs/vanventure-cockpit-mvp.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.a mit allen im Review genannten Bedingungen ab?
- SRC-1059.b (`docs/vanventure-cockpit-mvp.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.b mit allen im Review genannten Bedingungen ab?
- SRC-1059.c (`docs/vanventure-cockpit-mvp.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.c mit allen im Review genannten Bedingungen ab?
- SRC-1060.a (`docs/vanventure-cockpit-mvp.md:240`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1060.a mit allen im Review genannten Bedingungen ab?
- SRC-1060.b (`docs/vanventure-cockpit-mvp.md:240`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1060.b mit allen im Review genannten Bedingungen ab?
- SRC-1062.a (`docs/vanventure-cockpit-mvp.md:247`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1062.a mit allen im Review genannten Bedingungen ab?
- SRC-1063.a (`docs/vanventure-cockpit-mvp.md:249`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1063.a mit allen im Review genannten Bedingungen ab?
- SRC-1064.a (`docs/vanventure-cockpit-mvp.md:251`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1064.a mit allen im Review genannten Bedingungen ab?
- SRC-1065.a (`docs/vanventure-cockpit-mvp.md:252`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1065.a mit allen im Review genannten Bedingungen ab?
- SRC-1066.a (`docs/vanventure-cockpit-mvp.md:254`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1066.a mit allen im Review genannten Bedingungen ab?
- SRC-1067.a (`docs/vanventure-cockpit-mvp.md:257`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1067.a mit allen im Review genannten Bedingungen ab?
- SRC-1068.a (`docs/vanventure-cockpit-mvp.md:263`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1068.a mit allen im Review genannten Bedingungen ab?
- SRC-1068.b (`docs/vanventure-cockpit-mvp.md:263`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1068.b mit allen im Review genannten Bedingungen ab?
- SRC-1069.a (`docs/vanventure-cockpit-mvp.md:266`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1069.a mit allen im Review genannten Bedingungen ab?
- SRC-1069.b (`docs/vanventure-cockpit-mvp.md:266`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1069.b mit allen im Review genannten Bedingungen ab?
- SRC-1070.a (`docs/vanventure-cockpit-mvp.md:268`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1070.a mit allen im Review genannten Bedingungen ab?
- SRC-1071.a (`docs/vanventure-cockpit-mvp.md:270`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1071.a mit allen im Review genannten Bedingungen ab?
- SRC-1072.a (`docs/vanventure-cockpit-mvp.md:272`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1072.a mit allen im Review genannten Bedingungen ab?
- SRC-1073.a (`docs/vanventure-cockpit-mvp.md:276`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.a mit allen im Review genannten Bedingungen ab?
- SRC-1073.b (`docs/vanventure-cockpit-mvp.md:276`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.b mit allen im Review genannten Bedingungen ab?
- SRC-1073.c (`docs/vanventure-cockpit-mvp.md:276`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.c mit allen im Review genannten Bedingungen ab?
- SRC-1075.f (`docs/vanventure-cockpit-plan.md:9`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1075.f mit allen im Review genannten Bedingungen ab?
- SRC-1076.a (`docs/vanventure-cockpit-plan.md:19`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.a mit allen im Review genannten Bedingungen ab?
- SRC-1076.b (`docs/vanventure-cockpit-plan.md:19`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.b mit allen im Review genannten Bedingungen ab?
- SRC-1076.c (`docs/vanventure-cockpit-plan.md:19`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.c mit allen im Review genannten Bedingungen ab?
- SRC-1078.a (`docs/vanventure-cockpit-plan.md:25`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1078.a mit allen im Review genannten Bedingungen ab?
- SRC-1079.a (`docs/vanventure-cockpit-plan.md:27`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1079.a mit allen im Review genannten Bedingungen ab?
- SRC-1080.a (`docs/vanventure-cockpit-plan.md:29`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1080.a mit allen im Review genannten Bedingungen ab?
- SRC-1081.a (`docs/vanventure-cockpit-plan.md:31`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1081.a mit allen im Review genannten Bedingungen ab?
- SRC-1082.a (`docs/vanventure-cockpit-plan.md:35`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1082.a mit allen im Review genannten Bedingungen ab?
- SRC-1084.a (`docs/vanventure-cockpit-plan.md:42`): Soll GitHub Pages und „unverändert lassen“ ausschließlich als historische Ausgangslage der damaligen Cockpit-Stufe gelten?
- SRC-1085.a (`docs/vanventure-cockpit-plan.md:43`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1085.a mit allen im Review genannten Bedingungen ab?
- SRC-1086.a (`docs/vanventure-cockpit-plan.md:44`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1086.a mit allen im Review genannten Bedingungen ab?
- SRC-1086.b (`docs/vanventure-cockpit-plan.md:44`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1086.b mit allen im Review genannten Bedingungen ab?
- SRC-1087.a (`docs/vanventure-cockpit-plan.md:45`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1087.a mit allen im Review genannten Bedingungen ab?
- SRC-1087.b (`docs/vanventure-cockpit-plan.md:45`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1087.b mit allen im Review genannten Bedingungen ab?
- SRC-1088.a (`docs/vanventure-cockpit-plan.md:46`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1088.a mit allen im Review genannten Bedingungen ab?
- SRC-1089.a (`docs/vanventure-cockpit-plan.md:48`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.a mit allen im Review genannten Bedingungen ab?
- SRC-1089.c (`docs/vanventure-cockpit-plan.md:48`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.c mit allen im Review genannten Bedingungen ab?
- SRC-1089.d (`docs/vanventure-cockpit-plan.md:48`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.d mit allen im Review genannten Bedingungen ab?
- SRC-1090.a (`docs/vanventure-cockpit-plan.md:56`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1090.a mit allen im Review genannten Bedingungen ab?
- SRC-1091.a (`docs/vanventure-cockpit-plan.md:58`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1091.a mit allen im Review genannten Bedingungen ab?
- SRC-1091.b (`docs/vanventure-cockpit-plan.md:58`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1091.b mit allen im Review genannten Bedingungen ab?
- SRC-1092.a (`docs/vanventure-cockpit-plan.md:60`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.a mit allen im Review genannten Bedingungen ab?
- SRC-1092.b (`docs/vanventure-cockpit-plan.md:60`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.b mit allen im Review genannten Bedingungen ab?
- SRC-1092.c (`docs/vanventure-cockpit-plan.md:60`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.c mit allen im Review genannten Bedingungen ab?
- SRC-1093.a (`docs/vanventure-cockpit-plan.md:63`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1093.a mit allen im Review genannten Bedingungen ab?
- SRC-1094.a (`docs/vanventure-cockpit-plan.md:68`): Soll das alte Google-Anmeldeverbot durch die spätere allowlist-gebundene Google-Anmeldung ausdrücklich ersetzt sein, bei fortgeltendem Verbot öffentlicher Registrierung und Einladungs-URLs?
- SRC-1094.b (`docs/vanventure-cockpit-plan.md:68`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1094.b mit allen im Review genannten Bedingungen ab?
- SRC-1094.c (`docs/vanventure-cockpit-plan.md:68`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1094.c mit allen im Review genannten Bedingungen ab?
- SRC-1097.a (`docs/vanventure-cockpit-plan.md:78`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1097.a mit allen im Review genannten Bedingungen ab?
- SRC-1098.a (`docs/vanventure-cockpit-plan.md:79`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1098.a mit allen im Review genannten Bedingungen ab?
- SRC-1099.a (`docs/vanventure-cockpit-plan.md:80`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1099.a mit allen im Review genannten Bedingungen ab?
- SRC-1100.a (`docs/vanventure-cockpit-plan.md:81`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1100.a mit allen im Review genannten Bedingungen ab?
- SRC-1101.a (`docs/vanventure-cockpit-plan.md:82`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1101.a mit allen im Review genannten Bedingungen ab?
- SRC-1102.a (`docs/vanventure-cockpit-plan.md:84`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.a mit allen im Review genannten Bedingungen ab?
- SRC-1102.b (`docs/vanventure-cockpit-plan.md:84`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.b mit allen im Review genannten Bedingungen ab?
- SRC-1102.c (`docs/vanventure-cockpit-plan.md:84`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.c mit allen im Review genannten Bedingungen ab?
- SRC-1103.b (`docs/vanventure-cockpit-plan.md:92`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1103.b mit allen im Review genannten Bedingungen ab?
- SRC-1104.b (`docs/vanventure-cockpit-plan.md:93`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1104.b mit allen im Review genannten Bedingungen ab?
- SRC-1105.b (`docs/vanventure-cockpit-plan.md:95`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1105.b mit allen im Review genannten Bedingungen ab?
- SRC-1105.c (`docs/vanventure-cockpit-plan.md:95`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1105.c mit allen im Review genannten Bedingungen ab?
- SRC-1106.b (`docs/vanventure-cockpit-plan.md:98`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1106.b mit allen im Review genannten Bedingungen ab?
- SRC-1106.c (`docs/vanventure-cockpit-plan.md:98`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1106.c mit allen im Review genannten Bedingungen ab?
- SRC-1107.b (`docs/vanventure-cockpit-plan.md:100`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1107.b mit allen im Review genannten Bedingungen ab?
- SRC-1107.c (`docs/vanventure-cockpit-plan.md:100`): Ist die Einschränkung des Token-Widerrufs auf Anbieterunterstützung in ST-INS-03 als Nachfolgeregel freigegeben?
- SRC-1108.a (`docs/vanventure-cockpit-plan.md:103`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1108.a mit allen im Review genannten Bedingungen ab?
- SRC-1109.a (`docs/vanventure-cockpit-plan.md:106`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1109.a mit allen im Review genannten Bedingungen ab?
- SRC-1110.a (`docs/vanventure-cockpit-plan.md:108`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1110.a mit allen im Review genannten Bedingungen ab?
- SRC-1111.a (`docs/vanventure-cockpit-plan.md:111`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.a mit allen im Review genannten Bedingungen ab?
- SRC-1111.b (`docs/vanventure-cockpit-plan.md:111`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.b mit allen im Review genannten Bedingungen ab?
- SRC-1111.c (`docs/vanventure-cockpit-plan.md:111`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.c mit allen im Review genannten Bedingungen ab?
- SRC-1112.a (`docs/vanventure-cockpit-plan.md:117`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1112.a mit allen im Review genannten Bedingungen ab?
- SRC-1113.b (`docs/vanventure-cockpit-plan.md:120`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1113.b mit allen im Review genannten Bedingungen ab?
- SRC-1114.b (`docs/vanventure-cockpit-plan.md:121`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1114.b mit allen im Review genannten Bedingungen ab?
- SRC-1114.c (`docs/vanventure-cockpit-plan.md:121`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1114.c mit allen im Review genannten Bedingungen ab?
- SRC-1115.b (`docs/vanventure-cockpit-plan.md:123`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1115.b mit allen im Review genannten Bedingungen ab?
- SRC-1116.b (`docs/vanventure-cockpit-plan.md:124`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1116.b mit allen im Review genannten Bedingungen ab?
- SRC-1116.c (`docs/vanventure-cockpit-plan.md:124`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1116.c mit allen im Review genannten Bedingungen ab?
- SRC-1117.b (`docs/vanventure-cockpit-plan.md:126`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1117.b mit allen im Review genannten Bedingungen ab?
- SRC-1118.b (`docs/vanventure-cockpit-plan.md:127`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1118.b mit allen im Review genannten Bedingungen ab?
- SRC-1119.a (`docs/vanventure-cockpit-plan.md:130`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.a mit allen im Review genannten Bedingungen ab?
- SRC-1119.b (`docs/vanventure-cockpit-plan.md:130`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.b mit allen im Review genannten Bedingungen ab?
- SRC-1119.c (`docs/vanventure-cockpit-plan.md:130`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.c mit allen im Review genannten Bedingungen ab?
- SRC-1120.a (`docs/vanventure-cockpit-plan.md:137`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.a mit allen im Review genannten Bedingungen ab?
- SRC-1120.b (`docs/vanventure-cockpit-plan.md:137`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.b mit allen im Review genannten Bedingungen ab?
- SRC-1120.c (`docs/vanventure-cockpit-plan.md:137`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.c mit allen im Review genannten Bedingungen ab?
- SRC-1122.a (`docs/vanventure-cockpit-plan.md:144`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1122.a mit allen im Review genannten Bedingungen ab?
- SRC-1123.a (`docs/vanventure-cockpit-plan.md:145`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1123.a mit allen im Review genannten Bedingungen ab?
- SRC-1125.a (`docs/vanventure-cockpit-plan.md:147`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1125.a mit allen im Review genannten Bedingungen ab?
- SRC-1125.b (`docs/vanventure-cockpit-plan.md:147`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1125.b mit allen im Review genannten Bedingungen ab?
- SRC-1127.a (`docs/vanventure-cockpit-plan.md:150`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.a mit allen im Review genannten Bedingungen ab?
- SRC-1127.b (`docs/vanventure-cockpit-plan.md:150`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.b mit allen im Review genannten Bedingungen ab?
- SRC-1127.c (`docs/vanventure-cockpit-plan.md:150`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.c mit allen im Review genannten Bedingungen ab?
- SRC-1127.d (`docs/vanventure-cockpit-plan.md:150`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.d mit allen im Review genannten Bedingungen ab?
- SRC-1128.a (`docs/vanventure-cockpit-plan.md:157`): Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten?
- SRC-1128.b (`docs/vanventure-cockpit-plan.md:157`): Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten?
- SRC-1128.c (`docs/vanventure-cockpit-plan.md:157`): Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten?
- SRC-1130.a (`docs/vanventure-cockpit-plan.md:163`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1130.a mit allen im Review genannten Bedingungen ab?
- SRC-1131.a (`docs/vanventure-cockpit-plan.md:164`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1131.a mit allen im Review genannten Bedingungen ab?
- SRC-1132.a (`docs/vanventure-cockpit-plan.md:165`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1132.a mit allen im Review genannten Bedingungen ab?
- SRC-1132.b (`docs/vanventure-cockpit-plan.md:165`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1132.b mit allen im Review genannten Bedingungen ab?
- SRC-1133.a (`docs/vanventure-cockpit-plan.md:166`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1133.a mit allen im Review genannten Bedingungen ab?
- SRC-1134.a (`docs/vanventure-cockpit-plan.md:167`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1134.a mit allen im Review genannten Bedingungen ab?
- SRC-1135.a (`docs/vanventure-cockpit-plan.md:168`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1135.a mit allen im Review genannten Bedingungen ab?
- SRC-1136.a (`docs/vanventure-cockpit-plan.md:169`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1136.a mit allen im Review genannten Bedingungen ab?
- SRC-1137.a (`docs/vanventure-cockpit-plan.md:170`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.a mit allen im Review genannten Bedingungen ab?
- SRC-1137.b (`docs/vanventure-cockpit-plan.md:170`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.b mit allen im Review genannten Bedingungen ab?
- SRC-1137.c (`docs/vanventure-cockpit-plan.md:170`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.c mit allen im Review genannten Bedingungen ab?
- SRC-1138.a (`docs/vanventure-cockpit-plan.md:171`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1138.a mit allen im Review genannten Bedingungen ab?
- SRC-1139.a (`docs/vanventure-cockpit-plan.md:172`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1139.a mit allen im Review genannten Bedingungen ab?
- SRC-1140.a (`docs/vanventure-cockpit-plan.md:173`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1140.a mit allen im Review genannten Bedingungen ab?
- SRC-1141.a (`docs/vanventure-cockpit-plan.md:174`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1141.a mit allen im Review genannten Bedingungen ab?
- SRC-1141.b (`docs/vanventure-cockpit-plan.md:174`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1141.b mit allen im Review genannten Bedingungen ab?
- SRC-1142.a (`docs/vanventure-cockpit-plan.md:175`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1142.a mit allen im Review genannten Bedingungen ab?
- SRC-1143.a (`docs/vanventure-cockpit-plan.md:176`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1143.a mit allen im Review genannten Bedingungen ab?
- SRC-1144.a (`docs/vanventure-cockpit-plan.md:177`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1144.a mit allen im Review genannten Bedingungen ab?
- SRC-1145.a (`docs/vanventure-cockpit-plan.md:178`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1145.a mit allen im Review genannten Bedingungen ab?
- SRC-1146.a (`docs/vanventure-cockpit-plan.md:179`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1146.a mit allen im Review genannten Bedingungen ab?
- SRC-1147.a (`docs/vanventure-cockpit-plan.md:181`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1147.a mit allen im Review genannten Bedingungen ab?
- SRC-1147.b (`docs/vanventure-cockpit-plan.md:181`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1147.b mit allen im Review genannten Bedingungen ab?
- SRC-1147.c (`docs/vanventure-cockpit-plan.md:181`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1147.c mit allen im Review genannten Bedingungen ab?
- SRC-1148.a (`docs/vanventure-cockpit-plan.md:187`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.a mit allen im Review genannten Bedingungen ab?
- SRC-1148.b (`docs/vanventure-cockpit-plan.md:187`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.b mit allen im Review genannten Bedingungen ab?
- SRC-1148.c (`docs/vanventure-cockpit-plan.md:187`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.c mit allen im Review genannten Bedingungen ab?
- SRC-1148.d (`docs/vanventure-cockpit-plan.md:187`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.d mit allen im Review genannten Bedingungen ab?
- SRC-1150.a (`docs/vanventure-cockpit-plan.md:194`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1150.a mit allen im Review genannten Bedingungen ab?
- SRC-1151.a (`docs/vanventure-cockpit-plan.md:195`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1151.a mit allen im Review genannten Bedingungen ab?
- SRC-1152.a (`docs/vanventure-cockpit-plan.md:196`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1152.a mit allen im Review genannten Bedingungen ab?
- SRC-1152.b (`docs/vanventure-cockpit-plan.md:196`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1152.b mit allen im Review genannten Bedingungen ab?
- SRC-1153.a (`docs/vanventure-cockpit-plan.md:197`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1153.a mit allen im Review genannten Bedingungen ab?
- SRC-1153.b (`docs/vanventure-cockpit-plan.md:197`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1153.b mit allen im Review genannten Bedingungen ab?
- SRC-1154.a (`docs/vanventure-cockpit-plan.md:198`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1154.a mit allen im Review genannten Bedingungen ab?
- SRC-1154.b (`docs/vanventure-cockpit-plan.md:198`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1154.b mit allen im Review genannten Bedingungen ab?
- SRC-1155.a (`docs/vanventure-cockpit-plan.md:199`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1155.a mit allen im Review genannten Bedingungen ab?
- SRC-1156.a (`docs/vanventure-cockpit-plan.md:200`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1156.a mit allen im Review genannten Bedingungen ab?
- SRC-1156.b (`docs/vanventure-cockpit-plan.md:200`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1156.b mit allen im Review genannten Bedingungen ab?
- SRC-1157.a (`docs/vanventure-cockpit-plan.md:202`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1157.a mit allen im Review genannten Bedingungen ab?
- SRC-1157.b (`docs/vanventure-cockpit-plan.md:202`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1157.b mit allen im Review genannten Bedingungen ab?
- SRC-1159.a (`docs/vanventure-cockpit-plan.md:212`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1159.a mit allen im Review genannten Bedingungen ab?
- SRC-1160.a (`docs/vanventure-cockpit-plan.md:214`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1160.a mit allen im Review genannten Bedingungen ab?
- SRC-1161.a (`docs/vanventure-cockpit-plan.md:216`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1161.a mit allen im Review genannten Bedingungen ab?
- SRC-1162.a (`docs/vanventure-cockpit-plan.md:220`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1162.a mit allen im Review genannten Bedingungen ab?
- SRC-1163.a (`docs/vanventure-cockpit-plan.md:222`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1163.a mit allen im Review genannten Bedingungen ab?
- SRC-1163.d (`docs/vanventure-cockpit-plan.md:222`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1163.d mit allen im Review genannten Bedingungen ab?
- SRC-1164.a (`docs/vanventure-cockpit-plan.md:226`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1164.a mit allen im Review genannten Bedingungen ab?
- SRC-1165.a (`docs/vanventure-cockpit-plan.md:228`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1165.a mit allen im Review genannten Bedingungen ab?
- SRC-1166.a (`docs/vanventure-cockpit-plan.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1166.a mit allen im Review genannten Bedingungen ab?
- SRC-1166.b (`docs/vanventure-cockpit-plan.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1166.b mit allen im Review genannten Bedingungen ab?
- SRC-1166.d (`docs/vanventure-cockpit-plan.md:233`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1166.d mit allen im Review genannten Bedingungen ab?
- SRC-1167.a (`docs/vanventure-cockpit-plan.md:243`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1167.a mit allen im Review genannten Bedingungen ab?
- SRC-1167.b (`docs/vanventure-cockpit-plan.md:243`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1167.b mit allen im Review genannten Bedingungen ab?
- SRC-1167.c (`docs/vanventure-cockpit-plan.md:243`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1167.c mit allen im Review genannten Bedingungen ab?
- SRC-1167.d (`docs/vanventure-cockpit-plan.md:243`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1167.d mit allen im Review genannten Bedingungen ab?
- SRC-1167.e (`docs/vanventure-cockpit-plan.md:243`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1167.e mit allen im Review genannten Bedingungen ab?
- SRC-1168.a (`docs/vanventure-cockpit-plan.md:251`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1168.a mit allen im Review genannten Bedingungen ab?
- SRC-1168.b (`docs/vanventure-cockpit-plan.md:251`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1168.b mit allen im Review genannten Bedingungen ab?
- SRC-1168.c (`docs/vanventure-cockpit-plan.md:251`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1168.c mit allen im Review genannten Bedingungen ab?
- SRC-1169.a (`docs/vanventure-cockpit-plan.md:261`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1169.a mit allen im Review genannten Bedingungen ab?
- SRC-1169.c (`docs/vanventure-cockpit-plan.md:261`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1169.c mit allen im Review genannten Bedingungen ab?
- SRC-1169.d (`docs/vanventure-cockpit-plan.md:261`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1169.d mit allen im Review genannten Bedingungen ab?
- SRC-1169.e (`docs/vanventure-cockpit-plan.md:261`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1169.e mit allen im Review genannten Bedingungen ab?
- SRC-1170.a (`docs/vanventure-cockpit-plan.md:270`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1170.a mit allen im Review genannten Bedingungen ab?
- SRC-1171.a (`docs/vanventure-cockpit-plan.md:273`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1171.a mit allen im Review genannten Bedingungen ab?
- SRC-1172.a (`docs/vanventure-cockpit-plan.md:274`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1172.a mit allen im Review genannten Bedingungen ab?
- SRC-1173.a (`docs/vanventure-cockpit-plan.md:276`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1173.a mit allen im Review genannten Bedingungen ab?
- SRC-1174.a (`docs/vanventure-cockpit-plan.md:277`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1174.a mit allen im Review genannten Bedingungen ab?
- SRC-1175.a (`docs/vanventure-cockpit-plan.md:278`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1175.a mit allen im Review genannten Bedingungen ab?
- SRC-1176.a (`docs/vanventure-cockpit-plan.md:279`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1176.a mit allen im Review genannten Bedingungen ab?
- SRC-1177.c (`docs/vanventure-cockpit-plan.md:281`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1177.c mit allen im Review genannten Bedingungen ab?
- SRC-1178.a (`docs/vanventure-cockpit-plan.md:287`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1178.a mit allen im Review genannten Bedingungen ab?
- SRC-1178.b (`docs/vanventure-cockpit-plan.md:287`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1178.b mit allen im Review genannten Bedingungen ab?
- SRC-1179.a (`docs/vanventure-cockpit-plan.md:291`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1179.a mit allen im Review genannten Bedingungen ab?
- SRC-1179.b (`docs/vanventure-cockpit-plan.md:291`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1179.b mit allen im Review genannten Bedingungen ab?
- SRC-1180.a (`docs/vanventure-cockpit-plan.md:294`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1180.a mit allen im Review genannten Bedingungen ab?
- SRC-1181.a (`docs/vanventure-cockpit-plan.md:296`): Welche Aufbewahrungsfristen gelten vor Go-live jeweils für Rohmetriken und Audit-Logs?
- SRC-1181.b (`docs/vanventure-cockpit-plan.md:296`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1181.b mit allen im Review genannten Bedingungen ab?
- SRC-1182.a (`docs/vanventure-cockpit-plan.md:299`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1182.a mit allen im Review genannten Bedingungen ab?
- SRC-1182.b (`docs/vanventure-cockpit-plan.md:299`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1182.b mit allen im Review genannten Bedingungen ab?
- SRC-1183.a (`docs/vanventure-cockpit-plan.md:301`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.a mit allen im Review genannten Bedingungen ab?
- SRC-1183.b (`docs/vanventure-cockpit-plan.md:301`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.b mit allen im Review genannten Bedingungen ab?
- SRC-1183.c (`docs/vanventure-cockpit-plan.md:301`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.c mit allen im Review genannten Bedingungen ab?
- SRC-1184.a (`docs/vanventure-cockpit-plan.md:307`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.a mit allen im Review genannten Bedingungen ab?
- SRC-1184.b (`docs/vanventure-cockpit-plan.md:307`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.b mit allen im Review genannten Bedingungen ab?
- SRC-1184.c (`docs/vanventure-cockpit-plan.md:307`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.c mit allen im Review genannten Bedingungen ab?
- SRC-1185.a (`docs/vanventure-cockpit-plan.md:313`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.a mit allen im Review genannten Bedingungen ab?
- SRC-1185.b (`docs/vanventure-cockpit-plan.md:313`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.b mit allen im Review genannten Bedingungen ab?
- SRC-1185.c (`docs/vanventure-cockpit-plan.md:313`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.c mit allen im Review genannten Bedingungen ab?
- SRC-1186.a (`docs/vanventure-cockpit-plan.md:321`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.a mit allen im Review genannten Bedingungen ab?
- SRC-1186.b (`docs/vanventure-cockpit-plan.md:321`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.b mit allen im Review genannten Bedingungen ab?
- SRC-1186.c (`docs/vanventure-cockpit-plan.md:321`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.c mit allen im Review genannten Bedingungen ab?
- SRC-1186.d (`docs/vanventure-cockpit-plan.md:321`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.d mit allen im Review genannten Bedingungen ab?
- SRC-1187.b (`docs/vanventure-cockpit-plan.md:332`): Wer ist Kanalinhaberin, welche Kennzahlen und Regionen/Währung gelten, und welche Aufbewahrungsfristen sind vor Go-live beschlossen?
- SRC-1188.b (`docs/vanventure-cockpit-plan.md:334`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1188.b mit allen im Review genannten Bedingungen ab?
- SRC-1188.c (`docs/vanventure-cockpit-plan.md:334`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1188.c mit allen im Review genannten Bedingungen ab?
- SRC-1189.b (`docs/vanventure-cockpit-plan.md:336`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1189.b mit allen im Review genannten Bedingungen ab?
- SRC-1190.b (`docs/vanventure-cockpit-plan.md:341`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1190.b mit allen im Review genannten Bedingungen ab?
- SRC-1190.c (`docs/vanventure-cockpit-plan.md:341`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1190.c mit allen im Review genannten Bedingungen ab?
- SRC-1191.b (`docs/vanventure-cockpit-plan.md:343`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1191.b mit allen im Review genannten Bedingungen ab?
- SRC-1191.c (`docs/vanventure-cockpit-plan.md:343`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1191.c mit allen im Review genannten Bedingungen ab?
- SRC-1192.b (`docs/vanventure-cockpit-plan.md:345`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1192.b mit allen im Review genannten Bedingungen ab?
- SRC-1193.b (`docs/vanventure-cockpit-plan.md:347`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1193.b mit allen im Review genannten Bedingungen ab?
- SRC-1194.b (`docs/vanventure-cockpit-plan.md:352`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1194.b mit allen im Review genannten Bedingungen ab?
- SRC-1195.b (`docs/vanventure-cockpit-plan.md:354`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1195.b mit allen im Review genannten Bedingungen ab?
- SRC-1196.b (`docs/vanventure-cockpit-plan.md:356`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1196.b mit allen im Review genannten Bedingungen ab?
- SRC-1197.b (`docs/vanventure-cockpit-plan.md:357`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1197.b mit allen im Review genannten Bedingungen ab?
- SRC-1197.c (`docs/vanventure-cockpit-plan.md:357`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1197.c mit allen im Review genannten Bedingungen ab?
- SRC-1198.b (`docs/vanventure-cockpit-plan.md:362`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.b mit allen im Review genannten Bedingungen ab?
- SRC-1198.c (`docs/vanventure-cockpit-plan.md:362`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.c mit allen im Review genannten Bedingungen ab?
- SRC-1198.d (`docs/vanventure-cockpit-plan.md:362`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.d mit allen im Review genannten Bedingungen ab?
- SRC-1198.e (`docs/vanventure-cockpit-plan.md:362`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.e mit allen im Review genannten Bedingungen ab?
- SRC-1199.b (`docs/vanventure-cockpit-plan.md:368`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1199.b mit allen im Review genannten Bedingungen ab?
- SRC-1200.b (`docs/vanventure-cockpit-plan.md:369`): Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1200.b mit allen im Review genannten Bedingungen ab?
- SRC-1201.b (`docs/vanventure-cockpit-plan.md:371`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1201.b?
- SRC-1202.b (`docs/vanventure-cockpit-plan.md:372`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1202.b?
- SRC-1203.b (`docs/vanventure-cockpit-plan.md:376`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1203.b?
- SRC-1203.c (`docs/vanventure-cockpit-plan.md:376`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1203.c?
- SRC-1204.b (`docs/vanventure-cockpit-plan.md:378`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1204.b?
- SRC-1205.b (`docs/vanventure-cockpit-plan.md:380`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1205.b?
- SRC-1205.c (`docs/vanventure-cockpit-plan.md:380`): Welcher Benachrichtigungskanal, welche verantwortliche Person und welches Aktivierungskriterium gelten?
- SRC-1206.b (`docs/vanventure-cockpit-plan.md:382`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1206.b?
- SRC-1207.b (`docs/vanventure-cockpit-plan.md:386`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1207.b?
- SRC-1207.c (`docs/vanventure-cockpit-plan.md:386`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1207.c?
- SRC-1207.d (`docs/vanventure-cockpit-plan.md:386`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1207.d?
- SRC-1208.b (`docs/vanventure-cockpit-plan.md:393`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1208.b?
- SRC-1208.c (`docs/vanventure-cockpit-plan.md:393`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1208.c?
- SRC-1208.d (`docs/vanventure-cockpit-plan.md:393`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1208.d?
- SRC-1209.b (`docs/vanventure-cockpit-plan.md:397`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1209.b?
- SRC-1209.c (`docs/vanventure-cockpit-plan.md:397`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1209.c?
- SRC-1210.b (`docs/vanventure-cockpit-plan.md:400`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1210.b?
- SRC-1210.d (`docs/vanventure-cockpit-plan.md:400`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1210.d?
- SRC-1210.e (`docs/vanventure-cockpit-plan.md:400`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1210.e?
- SRC-1211.b (`docs/vanventure-cockpit-plan.md:405`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1211.b?
- SRC-1212.b (`docs/vanventure-cockpit-plan.md:407`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1212.b?
- SRC-1212.c (`docs/vanventure-cockpit-plan.md:407`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1212.c?
- SRC-1212.d (`docs/vanventure-cockpit-plan.md:407`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1212.d?
- SRC-1212.e (`docs/vanventure-cockpit-plan.md:407`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1212.e?
- SRC-1213.b (`docs/vanventure-cockpit-plan.md:412`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1213.b?
- SRC-1213.c (`docs/vanventure-cockpit-plan.md:412`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1213.c?
- SRC-1214.a (`docs/vanventure-cockpit-plan.md:418`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1214.a?
- SRC-1214.b (`docs/vanventure-cockpit-plan.md:418`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1214.b?
- SRC-1215.a (`docs/vanventure-cockpit-plan.md:420`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1215.a?
- SRC-1215.b (`docs/vanventure-cockpit-plan.md:420`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1215.b?
- SRC-1216.a (`docs/vanventure-cockpit-plan.md:422`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1216.a?
- SRC-1217.a (`docs/vanventure-cockpit-plan.md:424`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1217.a?
- SRC-1218.a (`docs/vanventure-cockpit-plan.md:426`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1218.a?
- SRC-1218.b (`docs/vanventure-cockpit-plan.md:426`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1218.b?
- SRC-1219.a (`docs/vanventure-cockpit-plan.md:430`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1219.a?
- SRC-1219.b (`docs/vanventure-cockpit-plan.md:430`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1219.b?
- SRC-1220.a (`docs/vanventure-cockpit-plan.md:433`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1220.a?
- SRC-1220.b (`docs/vanventure-cockpit-plan.md:433`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1220.b?
- SRC-1221.a (`docs/vanventure-cockpit-plan.md:435`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1221.a?
- SRC-1222.a (`docs/vanventure-cockpit-plan.md:440`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1222.a?
- SRC-1223.a (`docs/vanventure-cockpit-plan.md:442`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1223.a?
- SRC-1224.a (`docs/vanventure-cockpit-plan.md:443`): Gilt das Freigabe- und Datenschutz-Gate auch für automatische KI-Entscheidungen, oder bleiben sie in diesem Plan ausgeschlossen?
- SRC-1377.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:3`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1377.b?
- SRC-1378.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1378.b?
- SRC-1378.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1378.c?
- SRC-1378.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1378.d?
- SRC-1378.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1378.e?
- SRC-1378.f (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1378.f?
- SRC-1379.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:16`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1379.a?
- SRC-1379.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:16`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1379.b?
- SRC-1380.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:20`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1380.a?
- SRC-1380.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:20`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1380.b?
- SRC-1380.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:20`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1380.c?
- SRC-1380.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:20`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1380.d?
- SRC-1381.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:29`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1381.a?
- SRC-1381.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:29`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1381.b?
- SRC-1382.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:31`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1382.a?
- SRC-1383.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:33`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1383.a?
- SRC-1383.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:33`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1383.b?
- SRC-1384.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:35`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1384.a?
- SRC-1384.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:35`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1384.b?
- SRC-1385.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:37`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1385.a?
- SRC-1385.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:37`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1385.b?
- SRC-1385.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:37`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1385.c?
- SRC-1386.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:39`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1386.a?
- SRC-1386.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:39`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1386.b?
- SRC-1386.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:39`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1386.c?
- SRC-1386.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:39`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1386.d?
- SRC-1387.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:43`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1387.a?
- SRC-1387.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:43`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1387.b?
- SRC-1389.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:47`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1389.a?
- SRC-1390.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:48`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1390.a?
- SRC-1391.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:49`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1391.a?
- SRC-1392.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:50`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1392.a?
- SRC-1392.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:50`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1392.b?
- SRC-1392.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:50`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1392.c?
- SRC-1393.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:51`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1393.a?
- SRC-1394.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:53`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1394.a?
- SRC-1394.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:53`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1394.b?
- SRC-1394.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:53`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1394.c?
- SRC-1394.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:53`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1394.d?
- SRC-1395.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:55`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1395.a?
- SRC-1395.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:55`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1395.b?
- SRC-1395.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:55`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1395.c?
- SRC-1396.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1396.a?
- SRC-1396.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1396.b?
- SRC-1396.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1396.c?
- SRC-1396.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1396.d?
- SRC-1396.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1396.e?
- SRC-1397.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:59`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1397.a?
- SRC-1397.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:59`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1397.b?
- SRC-1398.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:63`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1398.a?
- SRC-1398.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:63`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1398.b?
- SRC-1399.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:65`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1399.a?
- SRC-1399.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:65`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1399.b?
- SRC-1399.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:65`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1399.c?
- SRC-1400.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:67`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1400.a?
- SRC-1400.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:67`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1400.b?
- SRC-1401.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:69`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1401.a?
- SRC-1402.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:73`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1402.a?
- SRC-1402.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:73`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1402.b?
- SRC-1403.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:75`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1403.a?
- SRC-1403.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:75`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1403.b?
- SRC-1403.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:75`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1403.c?
- SRC-1404.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:77`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1404.a?
- SRC-1404.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:77`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1404.b?
- SRC-1405.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:79`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1405.a?
- SRC-1405.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:79`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1405.b?
- SRC-1405.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:79`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1405.c?
- SRC-1406.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:83`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1406.a?
- SRC-1406.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:83`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1406.b?
- SRC-1407.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:85`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1407.a?
- SRC-1407.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:85`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1407.b?
- SRC-1407.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:85`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1407.c?
- SRC-1408.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:87`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1408.a?
- SRC-1408.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:87`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1408.b?
- SRC-1408.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:87`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1408.c?
- SRC-1409.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:89`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1409.a?
- SRC-1409.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:89`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1409.b?
- SRC-1410.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:91`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1410.a?
- SRC-1410.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:91`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1410.b?
- SRC-1411.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:95`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1411.a?
- SRC-1411.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:95`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1411.b?
- SRC-1412.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:97`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1412.a?
- SRC-1413.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:99`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1413.a?
- SRC-1413.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:99`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1413.b?
- SRC-1414.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:101`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1414.a?
- SRC-1414.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:101`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1414.b?
- SRC-1414.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:101`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1414.c?
- SRC-1415.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:103`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1415.a?
- SRC-1415.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:103`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1415.b?
- SRC-1416.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.a?
- SRC-1416.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.b?
- SRC-1416.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.c?
- SRC-1416.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.d?
- SRC-1416.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.e?
- SRC-1416.f (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.f?
- SRC-1416.g (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1416.g?
- SRC-1417.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.a?
- SRC-1417.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.b?
- SRC-1417.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.c?
- SRC-1417.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.d?
- SRC-1417.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.e?
- SRC-1417.f (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1417.f?
- SRC-1418.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:127`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1418.a?
- SRC-1418.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:127`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1418.b?
- SRC-1418.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:127`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1418.c?
- SRC-1418.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:127`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1418.d?
- SRC-1419.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1419.a?
- SRC-1419.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1419.b?
- SRC-1419.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1419.c?
- SRC-1419.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1419.d?
- SRC-1419.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1419.e?
- SRC-1420.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:144`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1420.a?
- SRC-1420.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:144`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1420.b?
- SRC-1421.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:148`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1421.a?
- SRC-1421.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:148`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1421.b?
- SRC-1421.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:148`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1421.c?
- SRC-1422.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:152`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1422.a?
- SRC-1422.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:152`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1422.b?
- SRC-1422.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:152`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1422.c?
- SRC-1423.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:156`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1423.a?
- SRC-1423.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:156`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1423.b?
- SRC-1423.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:156`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1423.c?
- SRC-1424.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:160`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1424.a?
- SRC-1424.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:160`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1424.b?
- SRC-1424.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:160`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1424.c?
- SRC-1425.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:162`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1425.a?
- SRC-1425.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:162`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1425.b?
- SRC-1425.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:162`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1425.c?
- SRC-1426.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:164`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1426.a?
- SRC-1426.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:164`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1426.b?
- SRC-1427.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:166`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1427.a?
- SRC-1427.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:166`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1427.b?
- SRC-1427.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:166`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1427.c?
- SRC-1428.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:170`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1428.a?
- SRC-1428.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:170`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1428.b?
- SRC-1429.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:172`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1429.a?
- SRC-1429.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:172`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1429.b?
- SRC-1430.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:174`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1430.a?
- SRC-1431.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:176`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1431.a?
- SRC-1431.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:176`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1431.b?
- SRC-1431.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:176`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1431.c?
- SRC-1432.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:178`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1432.a?
- SRC-1432.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:178`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1432.b?
- SRC-1433.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:182`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1433.a?
- SRC-1435.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:186`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1435.a?
- SRC-1435.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:186`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1435.b?
- SRC-1435.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:186`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1435.c?
- SRC-1436.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:188`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1436.a?
- SRC-1436.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:188`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1436.b?
- SRC-1436.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:188`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1436.c?
- SRC-1437.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:190`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1437.a?
- SRC-1437.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:190`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1437.b?
- SRC-1437.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:190`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1437.c?
- SRC-1438.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.a?
- SRC-1438.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.b?
- SRC-1438.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.c?
- SRC-1438.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.d?
- SRC-1438.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.e?
- SRC-1438.g (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.g?
- SRC-1438.h (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1438.h?
- SRC-1439.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1439.a?
- SRC-1439.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1439.b?
- SRC-1439.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1439.c?
- SRC-1439.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1439.d?
- SRC-1439.e (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1439.e?
- SRC-1440.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:216`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1440.a?
- SRC-1440.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:216`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1440.b?
- SRC-1441.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:218`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1441.a?
- SRC-1441.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:218`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1441.b?
- SRC-1441.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:218`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1441.c?
- SRC-1441.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:218`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1441.d?
- SRC-1442.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:224`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1442.a?
- SRC-1442.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:224`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1442.b?
- SRC-1443.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:226`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1443.a?
- SRC-1443.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:226`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1443.b?
- SRC-1443.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:226`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1443.c?
- SRC-1444.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:228`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1444.a?
- SRC-1444.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:228`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1444.b?
- SRC-1444.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:228`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1444.c?
- SRC-1444.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:228`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1444.d?
- SRC-1445.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:232`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1445.a?
- SRC-1445.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:232`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1445.b?
- SRC-1446.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:234`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1446.a?
- SRC-1446.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:234`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1446.b?
- SRC-1446.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:234`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1446.c?
- SRC-1447.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:236`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1447.a?
- SRC-1447.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:236`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1447.b?
- SRC-1447.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:236`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1447.c?
- SRC-1448.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:238`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1448.a?
- SRC-1448.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:238`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1448.b?
- SRC-1448.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:238`): Welche sicheren Arbeiten können trotz gesperrter Bildautomatisierung fortgesetzt werden, und wo ist die begrenzte Sperre dokumentiert?
- SRC-1449.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:242`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1449.a?
- SRC-1449.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:242`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1449.b?
- SRC-1449.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:242`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1449.c?
- SRC-1450.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:244`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1450.a?
- SRC-1450.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:244`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1450.b?
- SRC-1450.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:244`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1450.c?
- SRC-1451.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:246`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1451.a?
- SRC-1451.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:246`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1451.b?
- SRC-1451.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:246`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1451.c?
- SRC-1452.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:248`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1452.a?
- SRC-1452.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:248`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1452.b?
- SRC-1452.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:248`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1452.c?
- SRC-1453.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:250`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1453.a?
- SRC-1453.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:250`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1453.b?
- SRC-1453.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:250`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1453.c?
- SRC-1454.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:252`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1454.a?
- SRC-1455.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:258`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1455.a?
- SRC-1455.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:258`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1455.b?
- SRC-1456.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:260`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1456.a?
- SRC-1456.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:260`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1456.b?
- SRC-1457.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:262`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1457.a?
- SRC-1457.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:262`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1457.b?
- SRC-1458.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:266`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1458.a?
- SRC-1458.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:266`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1458.b?
- SRC-1461.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:272`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1461.a?
- SRC-1461.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:272`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1461.b?
- SRC-1461.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:272`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1461.c?
- SRC-1461.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:272`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1461.d?
- SRC-1462.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:276`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1462.a?
- SRC-1462.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:276`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1462.b?
- SRC-1463.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:278`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1463.a?
- SRC-1463.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:278`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1463.b?
- SRC-1464.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:280`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1464.a?
- SRC-1464.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:280`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1464.b?
- SRC-1464.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:280`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1464.c?
- SRC-1465.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:282`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1465.a?
- SRC-1465.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:282`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1465.b?
- SRC-1466.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:286`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1466.a?
- SRC-1466.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:286`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1466.b?
- SRC-1466.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:286`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1466.c?
- SRC-1468.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:290`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1468.a?
- SRC-1469.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:291`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1469.a?
- SRC-1470.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:292`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1470.a?
- SRC-1471.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:293`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1471.a?
- SRC-1472.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:294`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1472.a?
- SRC-1473.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:295`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1473.a?
- SRC-1474.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:297`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1474.a?
- SRC-1474.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:297`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1474.b?
- SRC-1475.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:299`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1475.a?
- SRC-1475.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:299`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1475.b?
- SRC-1475.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:299`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1475.c?
- SRC-1475.d (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:299`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1475.d?
- SRC-1476.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:301`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1476.a?
- SRC-1476.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:301`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1476.b?
- SRC-1477.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:307`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1477.a?
- SRC-1477.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:307`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1477.b?
- SRC-1478.a (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:309`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1478.a?
- SRC-1478.b (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:309`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1478.b?
- SRC-1478.c (`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:309`): Welche getrennten aktuellen AC- und Prüfnachweise erfüllen den geprüften Befund zu SRC-1478.c?
- SRC-1521.d (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:29`): Sollen hoch/kritisch priorisierte Epics und Stories als Fast-Track-Karten zulässig sein oder ausschließlich im Backlog bleiben?
- SRC-1537.i (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:81`): Bezieht sich „sie können nur archiviert werden“ auf Eltern oder Kinder, und welche Zuordnung muss zuvor feststehen?
- SRC-1545.a (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:103`): Erhalten alert_task-Karten bei Fast-Track-Einplanung Board-Zeile und -Spalte trotz der Formulierung „nur Task-/To-do-Karten“?
- SRC-1559.b (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:133`): Welche Aufbewahrungsfrist soll Phase 0 für archivierte Karten festlegen?
- SRC-1577.c (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:207`): Darf eine aufgelöste Warnung nach menschlicher Bestätigung bereits in Review abgeschlossen werden oder ist eine ausdrückliche Done-Bestätigung zwingend?
- SRC-1622.b (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:302`): Soll der Küchen-Tablet-Kiosk nur lesend mit bestehender Sitzung betrieben werden oder ist eine lokale PIN als alternative Schreibberechtigung vorgesehen? Falls PIN: Wer verwaltet sie und welche Aktionen erlaubt sie?
- SRC-1648.a (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:366`): Welcher bereits vorgesehene Board-/Warnungs-Slice aktiviert nach Kanal- und Empfängerentscheidung den Nachrichtentransport für fehlgeschlagene Syncs und kritisch nicht zugestellte Warnungen?
- SRC-1653.b (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:377`): Wann wird das bestehende ST-BRD-04-Acceptance-Criterion im Story-Katalog auf Backlog-Anlage und ausdrücklich beauftragtes Einplanen nach Offen begrenzt, bevor die Planung als widerspruchsfrei gilt?
- SRC-1658.a (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Sollen nach mehreren Wochen tatsächlicher Nutzung zusätzliche, jeweils bestätigte Marvin-Aktionen und eine kompakte Verlaufs-/Monitoringansicht eingeführt werden?
- SRC-1658.b (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Welche der drei optionalen Ausbauten Erinnerungen, wiederkehrende Wartung und Druckübersicht werden nach Pilotnutzung beauftragt?
- SRC-1658.c (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389`): Welche Datenschutz- und Bedienentscheidung gilt jeweils für einen später beauftragten Ausbau?
- SRC-1675.a (`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:422`): Wann wird das bestehende ST-BRD-04-Acceptance-Criterion im Story-Katalog auf Backlog-Anlage und ausdrücklich beauftragtes Einplanen nach Offen begrenzt, bevor die Planung als widerspruchsfrei gilt?
- SRC-1797.a (`video-production/AGENTS.md:5`): Bei welcher nächsten konkreten Video-Story wird diese Video-Bereichs- und Aufgabenfreigaberegel mit einem Prüfschritt vor Arbeitsbeginn verankert?
- SRC-1798.a (`video-production/AGENTS.md:6`): Bei welcher nächsten konkreten Video-Story wird diese Video-Bereichs- und Aufgabenfreigaberegel mit einem Prüfschritt vor Arbeitsbeginn verankert?
- SRC-1799.a (`video-production/AGENTS.md:7`): Gilt Helmuts aufgabenspezifische Freigabe nach SRC-1800 als Ausnahme vom Eingriffsverbot für Website, Cockpit und Deployment in SRC-1799?
- SRC-1800.a (`video-production/AGENTS.md:8`): Bei welcher nächsten einschlägigen Video-Story wird - Vor jeder Änderung an Website oder Cockpit ist eine explizite Freigabe von Helmut einzuholen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1801.b (`video-production/AGENTS.md:12`): Bei welcher nächsten einschlägigen Video-Story wird Bestehende Originalmedien sind read-only. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1801.c (`video-production/AGENTS.md:12`): Bei welcher nächsten einschlägigen Video-Story wird Sie dürfen niemals verändert, gelöscht, verschoben, umbenannt oder überschrieben werden. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1802.b (`video-production/AGENTS.md:13`): Bei welcher nächsten einschlägigen Video-Story wird Bestehende alte Resolve-Projekte werden nicht verändert, wenn daraus ein neuer Film, Remaster oder Short entstehen soll. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1803.b (`video-production/AGENTS.md:14`): Bei welcher nächsten einschlägigen Video-Story wird Ein neues Resolve-Projekt wird nicht automatisch für jede Bearbeitung angelegt. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1803.c (`video-production/AGENTS.md:14`): Bei welcher nächsten einschlägigen Video-Story wird Es wird nur angelegt, wenn aus einem bestehenden Altprojekt bewusst ein neues Werk entwickelt wird oder eine technische Trennung notwendig ist. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1804.b (`video-production/AGENTS.md:15`): Bei welcher nächsten einschlägigen Video-Story wird Wenn bereits ein VanVenture-Produktionsprojekt existiert, wird darin weitergearbeitet; als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1804.c (`video-production/AGENTS.md:15`): Bei welcher nächsten einschlägigen Video-Story wird bei Bedarf werden separate Timelines verwendet. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1805.b (`video-production/AGENTS.md:16`): Bei welcher nächsten einschlägigen Video-Story wird Die Anzahl der Resolve-Projekte bleibt möglichst gering. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1806.b (`video-production/AGENTS.md:17`): Bei welcher nächsten einschlägigen Video-Story wird Vor neuen Schnitten sind vorhandene Resolve-Projekte, Timelines, Originalmedien und Master ausschließlich lesend zu prüfen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1807.b (`video-production/AGENTS.md:18`): Bei welcher nächsten einschlägigen Video-Story wird Originalkamera-Dateien und vorhandene hochwertige Master haben Vorrang vor YouTube-Material. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1808.b (`video-production/AGENTS.md:19`): Bei welcher nächsten einschlägigen Video-Story wird YouTube dient primär als Referenz und Analytics-Quelle. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1809.b (`video-production/AGENTS.md:20`): Bei welcher nächsten einschlägigen Video-Story wird Archive-first: Vorhandenes, gutes Material wird bevorzugt wiederverwendet. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1810.a (`video-production/AGENTS.md:24`): Bei welcher nächsten einschlägigen Video-Story wird - Es gibt keine automatische Veröffentlichung auf YouTube, Instagram oder anderen Plattformen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1811.a (`video-production/AGENTS.md:25`): Bei welcher nächsten einschlägigen Video-Story wird - Render, Upload und Veröffentlichung sind getrennte Schritte. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1812.a (`video-production/AGENTS.md:26`): Bei welcher nächsten einschlägigen Video-Story wird - Automatisierte Analyse und Tracking ersetzen niemals eine visuelle Endkontrolle. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1813.a (`video-production/AGENTS.md:30`): Bei welcher nächsten einschlägigen Video-Story wird - Wenn Adrian in einer öffentlich bestimmten Fassung identifizierbar wäre, muss er sauber und möglichst unauffällig anonymisiert werden. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1814.a (`video-production/AGENTS.md:31`): Bei welcher nächsten einschlägigen Video-Story wird - Bevorzugt werden enges, weiches und bewegungsstabiles Gesichtstracking statt großer, auffälliger Pixel- oder Mosaikflächen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1815.a (`video-production/AGENTS.md:32`): Bei welcher nächsten einschlägigen Video-Story wird - Die Maske ist nur so groß wie nötig, aber groß genug, dass keine Identifikation möglich ist. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1816.a (`video-production/AGENTS.md:33`): Bei welcher nächsten einschlägigen Video-Story wird - Tracking ist bei Kopfbewegung, Profil, Verdeckung, Kamerabewegung, Motion Blur und Schnittwechseln manuell zu prüfen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1817.a (`video-production/AGENTS.md:34`): Bei welcher nächsten einschlägigen Video-Story wird - Automatisches Tracking allein ist niemals eine Privacy-Abnahme. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1818.a (`video-production/AGENTS.md:35`): Bei welcher nächsten einschlägigen Video-Story wird - Schwierige Stellen werden frameweise kontrolliert. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1819.a (`video-production/AGENTS.md:36`): Bei welcher nächsten einschlägigen Video-Story wird - Nach Erstellung eines Public Masters wird die vollständige öffentliche Fassung nochmals visuell auf unbeabsichtigt sichtbare Frames geprüft. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1820.a (`video-production/AGENTS.md:37`): Bei welcher nächsten einschlägigen Video-Story wird - Wenn eine saubere Anonymisierung einen Shot visuell zerstört, wird bevorzugt ein anderer Shot verwendet. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1821.a (`video-production/AGENTS.md:38`): Bei welcher nächsten einschlägigen Video-Story wird - Relevante Clips erhalten einen Privacy-Status: `CLEAR`, `BLUR_REQUIRED`, `REVIEW_REQUIRED` oder `NOT_FOR_PUBLIC`. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1822.a (`video-production/AGENTS.md:39`): Bei welcher nächsten einschlägigen Video-Story wird - Erst nach visueller Prüfung darf eine Fassung den Status `PRIVACY_APPROVED` erhalten. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1823.a (`video-production/AGENTS.md:43`): Bei welcher nächsten einschlägigen Video-Story wird - Wenn Helmut eine Datei öffnen, prüfen oder verwenden soll, immer ihren vollständigen absoluten Pfad angeben, sodass er ihn direkt kopieren und einfügen kann. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1823.b (`video-production/AGENTS.md:43`): Bei welcher nächsten einschlägigen Video-Story wird Bei mehreren Dateien jeden Pfad vollständig aufführen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1824.a (`video-production/AGENTS.md:45`): Bei welcher nächsten einschlägigen Video-Story wird Nach jedem größeren Arbeitsblock standardmäßig nur ausgeben: als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1825.a (`video-production/AGENTS.md:49`): Bei welcher nächsten einschlägigen Video-Story wird - Was wurde gemacht? als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1826.a (`video-production/AGENTS.md:50`): Bei welcher nächsten einschlägigen Video-Story wird - Was wurde gefunden? als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1827.a (`video-production/AGENTS.md:51`): Bei welcher nächsten einschlägigen Video-Story wird - Wurden Originale verändert? als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1828.a (`video-production/AGENTS.md:52`): Bei welcher nächsten einschlägigen Video-Story wird - Privacy-Status als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1829.a (`video-production/AGENTS.md:53`): Bei welcher nächsten einschlägigen Video-Story wird - Aktueller Produktionsstatus als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1830.a (`video-production/AGENTS.md:54`): Bei welcher nächsten einschlägigen Video-Story wird - Nächster sinnvoller Schritt als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1831.a (`video-production/AGENTS.md:58`): Bei welcher nächsten einschlägigen Video-Story wird - Nur tatsächliche Entscheidungen von Helmut. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1832.a (`video-production/AGENTS.md:60`): Bei welcher nächsten einschlägigen Video-Story wird Keine langen technischen Berichte ausgeben, solange Helmut sie nicht ausdrücklich anfordert. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1833.a (`video-production/README.md:5`): Bei welcher nächsten einschlägigen Video-Story wird - Das gemeinsame Repository bleibt `reflexible/vanventure`. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1834.a (`video-production/README.md:6`): Bei welcher nächsten einschlägigen Video-Story wird - Videoarbeit findet grundsätzlich unter `video-production/` statt. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1835.a (`video-production/README.md:7`): Bei welcher nächsten einschlägigen Video-Story wird - Website und Cockpit werden nicht verändert. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1836.a (`video-production/README.md:8`): Bei welcher nächsten einschlägigen Video-Story wird - Originalmedien werden niemals verändert. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1837.a (`video-production/README.md:9`): Bei welcher nächsten einschlägigen Video-Story wird - Bestehende alte Resolve-Projekte werden nicht verändert, wenn daraus neu weitergearbeitet wird. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1838.a (`video-production/README.md:10`): Bei welcher nächsten einschlägigen Video-Story wird - Ein neues Resolve-Projekt entsteht nur bewusst, wenn aus einem Altprojekt ein neues Werk wird. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1839.a (`video-production/README.md:11`): Bei welcher nächsten einschlägigen Video-Story wird - Innerhalb eines aktiven Produktionsprojekts werden bevorzugt Timelines verwendet statt fortlaufend neue Resolve-Projekte anzulegen. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1840.a (`video-production/README.md:12`): Bei welcher nächsten einschlägigen Video-Story wird - Originalmaterial hat Vorrang vor YouTube-Downloads. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1841.a (`video-production/README.md:13`): Bei welcher nächsten einschlägigen Video-Story wird - Es gilt Archive-first: Vorhandenes Material wird zuerst geprüft und bevorzugt wiederverwendet. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1842.a (`video-production/README.md:14`): Bei welcher nächsten einschlägigen Video-Story wird - Adrians Privacy ist zwingend. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1843.a (`video-production/README.md:15`): Bei welcher nächsten einschlägigen Video-Story wird - Es gibt keine automatische Veröffentlichung. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-1844.a (`video-production/README.md:16`): Bei welcher nächsten einschlägigen Video-Story wird - Nach Arbeitsblöcken werden Helmut nur diese Management Summary und notwendige Entscheidungen ausgegeben. als konkretes Acceptance Criterion mit Prüfschritt nachgewiesen?
- SRC-2042.e (`video-production/sardinia-2019/analysis.md:308`): Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?
- SRC-2247.d (`video-production/sardinia-2019/README.md:333`): Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?
- SRC-0470.a2 (`docs/ausbauplan.md:677`): Chronology and meaning of 8–11 target versus 24 estimated hours remain unresolved.
- SRC-0562.c1 (`docs/betrieb.md:74`): Nach welcher gemeinsam festgelegten Regel wird jedes Cockpit-Kennzeichen Backlog oder Fast Track zugeordnet?
- SRC-0562.c2 (`docs/betrieb.md:74`): Nach welcher gemeinsam festgelegten Regel wird jedes Cockpit-Kennzeichen Backlog oder Fast Track zugeordnet?
- SRC-0662.b1 (`docs/design-guide.md:244`): Aktuelle Route und Beschriftung „Konto & Einstellungen“ gegen älteres „Profil“ im privaten UI prüfen.
- SRC-0859.d1 (`docs/responsive-templates.md:129`): Welcher konkrete AC- oder Task-Nachweis schließt diese vollständig datierte Klausel?
- SRC-0860.b1 (`docs/responsive-templates.md:142`): Welcher konkrete AC- oder Task-Nachweis schließt diese vollständig datierte Klausel?
- SRC-0949.a1 (`docs/riverstar/entwurf.md:81`): Welche Ortsbestätigung ist für beide Uferfotos vom 13. Juli 2018 erforderlich?
- SRC-0953.b1 (`docs/riverstar/entwurf.md:91`): Welcher konkrete AC- oder Task-Nachweis schließt diese vollständig datierte Klausel?
- SRC-2252.f2 (`video-production/sardinia-2019/README.md:342`): Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt ausgewählten Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?
- SRC-0792.a (Partially Covered): Kleine, funktionierende Epic-Inkremente sind eine eigenständige Regel. Register/Planentwurf erhält sie; Register/Planentwurf nennt nur Template-Slices. Offen: bei jedem Epic überprüfbare Inkremente und Abschlussbedingung ausweisen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0792.b (Partially Covered): „Kann“ macht das Walking Skeleton optional; falls gewählt, sind echte Eingabe, Verarbeitung, Ausgabe sowie Schutz und Prüfung erforderlich. Register/Planentwurf und ST-AN-01 konkretisieren einen Fall, keine projektweite Prüfung. Diese Bedingtheit im Register und bei gewählten ersten Slices erhalten. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0792.d (Partially Covered): Platzhalter allein dürfen beim Skeleton keinen Done-Status begründen. Register/Planentwurf zeigt den geplanten echten Aufruf, aber noch keinen Nachweis. Als dessen Abnahmekriterium und allgemeine Bedingung führen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0792.e (Partially Covered): Spätere Stories müssen schrittweise Nutzen liefern. Register/Planentwurf und Register/Planentwurf zeigen Beispiele; eine Prüfung aller Epics fehlt. In Epic-/Story-Abschlussprüfung aufnehmen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0793.a (Partially Covered): Enabler nur bei technischer, rechtlicher oder betrieblicher Voraussetzung, die nicht sinnvoll in einer Value Story liegt. Register/Planentwurf begründet ST-WEB-03 teilweise; für jeden Enabler diese Ausnahme konkret nachweisen. Register/Planentwurf allein genügt nicht. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0793.b (Partially Covered): Freigeschaltete Folgestories, notwendiger Umfang und prüfbares Ergebnis sind drei notwendige Angaben. ST-WEB-03 nennt Abhängigkeiten, aber die Freischaltung und minimale Grenze sollten ausdrücklich verbunden werden. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0793.c (Partially Covered): Reine Vorarbeit ohne begründete Abhängigkeit darf keine Story sein. Register/Planentwurf/51 und Register/Planentwurf behandeln Technik als Tasks in Beispielen; alle Enabler darauf prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0794.a (Partially Covered): INVEST-Prüfung gilt vor Einplanung jeder Story. Register/Planentwurf erhält den Satz; P enthält keinen dokumentierten storyweisen INVEST-Check. Prüfung mit Ergebnis je Story vor „umsetzungsbereit“ vorsehen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0795.a (Partially Covered): „Möglichst“ unabhängig ist eine qualifizierte, keine absolute Pflicht. Story-Abhängigkeiten im Plan sichtbar prüfen; keine Unabhängigkeit behaupten, wenn Dependencies bestehen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0795.b (Partially Covered): Unvermeidbare Abhängigkeiten müssen sichtbar sein. P nutzt Dependencies-Felder; ihre Vollständigkeit ist für jede Story nachzuweisen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0796.a (Partially Covered): Story soll das Ergebnis beschreiben, ohne unnötige Implementierungsvorgaben. Die langen technischen Acceptance Criteria, etwa Register/Planentwurf, auf notwendige Bindungen gegen diese Regel prüfen; keine pauschale Freigabe ableiten. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0796.b (Partially Covered): Fach- und Designregeln bleiben trotz Verhandelbarkeit bindend. Register/Planentwurf trägt den Grundsatz; Quellverweise je betroffener Story konkret zuordnen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0797.a (Partially Covered): Konkreter User/Business Value und betroffene Menschen beziehungsweise betrieblicher Nutzen sind nötig. P hat Value-Typen und Storysätze; die bloße Typangabe reicht nicht. Je Story prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0798.a (Partially Covered): Umfang und Unsicherheit müssen Aufwand und Reihenfolge einschätzbar machen. P hat keine durchgängige Schätzbarkeitsprüfung. Je Story Unsicherheiten/Abhängigkeiten prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0799.a (Partially Covered): Story muss in ein kurzes, prüfbares Inkrement passen. Besonders umfangreiche Sammel-Acceptance-Criteria in P auf Schnittgröße prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0799.b (Partially Covered): Zu große Stories werden nach Nutzen geteilt. Register/Planentwurf nennt eine solche Teilung; bei weiteren großen Stories Slice-Entscheidung dokumentieren. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0800.a (Partially Covered): Acceptance Criteria müssen beobachtbar und eindeutig sein. P enthält Kriterien, aber keine Einzelprüfung ihrer Testbarkeit. Storyweise prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0801.a (Partially Covered): Bei einem fehlenden INVEST-Merkmal vor Umsetzungsbereitschaft schärfen, teilen oder Abhängigkeit begründen. P unterscheidet keinen entsprechend geprüften Ready-Status. Ergebnis und Korrektur je Story dokumentieren. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0802.a (Partially Covered): Pro Story konkrete, von außen prüfbare Ergebnisse und relevante Grenzfälle. Register/Planentwurf ist zu allgemein für deren Vollständigkeit; Kriterien je Story prüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0802.b (Partially Covered): Rollen, Geräte, Sprachen, Datenschutz, Barrierefreiheit, Fehler und Datenzustände sind bei Bedarf zu nennen. Relevanz je Story prüfen; nicht alle Kategorien mechanisch erzwingen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0802.c (Partially Covered): Acceptance Criteria dürfen bindende Spezifikationen nicht still abschwächen. Register/Planentwurf/21–24 stützt das; Quellabgleich je Story als Nachweis ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0803.a (Partially Covered): DoD gilt für jedes als abgeschlossen gemeldete Inkrement. Register/Planentwurf nennt eine gemeinsame DoD, aber keine Prüfung jedes Teilstands. Geltungsbereich ausdrücklich übernehmen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0804.b (Partially Covered): Alle Kriterien müssen mit geeigneten, reproduzierbaren Prüfungen erfüllt sein. Register/Planentwurf nennt Erfüllung, aber weder Eignung noch Reproduzierbarkeit ausdrücklich. Register/Planentwurf präzisieren; konkreten Blocker statt pauschalem `Blocked` ausweisen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0804.c (Partially Covered): Bekannte Grenzen und ungeprüfte Fälle müssen benannt werden. Register/Planentwurf lässt dies aus; DoD ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0805.b (Partially Covered): Fachliche, Architektur- und Designregeln sowie nötige Freigaben müssen eingehalten und rückverfolgbar sein. Register/Planentwurf erwähnt Gates, aber keine vollständige Zuordnung/Nachweismethode. DEC-REL-001/002 beachten: Prüfung allein ist keine Release-Freigabe. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0806.b (Partially Covered): Code, Inhalt, Tests und betroffene Dokumentation müssen konsistent sein. Register/Planentwurf nennt Dokumentation nicht ausdrücklich; DoD dort ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0806.c (Partially Covered): Status und Nachweise dürfen nicht widersprechen. Register/Planentwurf unterscheidet Zustände, verlangt aber keinen ausdrücklichen Widerspruchsabgleich. Ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0807.b (Partially Covered): Geplant, lokal vorbereitet, geprüft, freigegeben, gepusht und live verifiziert sind getrennte Zustände. Register/Planentwurf/25–26 erfasst einen Teil, Register/Planentwurf den konkreten Release. Vollständige Statusfolge je Inkrement ausweisen; historische Belege nicht hochstufen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0808.b (Partially Covered): Offene Folgearbeit braucht eigene Story oder Task, Bezug und Priorität. Register/Planentwurf fehlt diese DoD-Bedingung; dort und in Story-/Task-Daten aufnehmen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0808.c (Partially Covered): Teilstand darf nicht als vollständiges Epic gelten. Register/Planentwurf warnt für Sammel-Stories, nicht projektweit. Epic-Abschlussregel ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0809.a (Partially Covered): Schutz-, Bild-, Sicherheits- und Abnahmevorgaben gelten zusätzlich. Register/Planentwurf nennt einige, Sicherheit nicht ausdrücklich. Mit 0809.b als eine Vorrang-/Ergänzungsregel führen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.a (Partially Covered): Zuerst User/Business Value, danach Dringlichkeit, Risiko, Abhängigkeit und Aufwand. Register/Planentwurf ordnet Register/Planentwurf–Register/Planentwurf grob, zeigt diese Reihenfolge je Ergebnis nicht. Prioritätsbegründung je Story ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.b (Partially Covered): Grund der Reihenfolge muss am geplanten Ergebnis erkennbar sein. Register/Planentwurf liefert Kategorien, keine individuelle Begründung. Je Priorisierung erfassen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.c (Partially Covered): Sicherheit, Rechtspflichten, konkrete Störungen und ausdrücklich freigegebene Fast-Track-Fälle dürfen Vorrang haben. Das ist eine Ausnahme, kein automatischer Register/Planentwurf-Status. Entscheidungsfeld im Plan vorsehen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.d (Partially Covered): Für jeden Vorrang sind Entscheidung und Grund festzuhalten. Mit 0810.c verknüpfen; Register/Planentwurf enthält keine Einzelentscheidungen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.e (Partially Covered): Technische Leichtigkeit allein rechtfertigt kein Vorziehen. Register/Planentwurf ordnet Technik einem Slice zu; bei allen Prioritäten gegenprüfen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0810.f (Partially Covered): Automatische Priorisierung betrifft nur das private Board und bleibt dessen gesonderten Regeln/Freigaben unterworfen. Register/Planentwurf erwähnt offene Phase 0, die konkrete Schranke sollte dort stehen; nicht auf allgemeine manuelle Priorisierung ausdehnen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0811.a (Partially Covered): Neue Anforderungen gehören in die zuständige Fachquelle und mit Ziel, Nutzen, Slice, Kriterien und Quellverweis in den maßgeblichen aktiven Plan. Register/Planentwurf erklärt derzeit `ausbauplan.md` zur aktiven Liste; der Entwurf darf diese Rolle bis zum bestandenen Wechsel nicht beanspruchen. Aufnahmeprozess konkret ausweisen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0811.c (Partially Covered): Planwechsel darf offene oder erledigte Anforderungen nicht verbergen. Register/Planentwurf sperrt Wechsel bis zum Check; Vollständigkeitsnachweis bleibt erforderlich. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0812.a (Partially Covered): Nachprüfbarer Abgleich muss vor Ersetzen, Archivieren oder Löschen stattfinden. Register/Planentwurf nennt Ersetzen/Archivieren, nicht Löschen; Trigger vollständig übernehmen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0812.b (Partially Covered): Abgleich umfasst alle Ziele, Anforderungen, offene/erledigte Einträge, Entscheidungen, Abhängigkeiten, Prioritäten, Ausnahmen und Statusnachweise. Register/Planentwurf sagt nur „atomarer Coverage-Check“; dessen Umfang ausdrücklich belegen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0813.a (Partially Covered): Tabellenkopf definiert fünf Nachweisfelder. Kein eigenständiges Produkt-Constraint und keine ST-Zuordnung; als verbindliches Migrationsabgleich-Schema bei Register/Planentwurf führen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0815.a (Partially Covered): Bestanden nur bei eindeutiger Zuordnung oder begründetem Nichtübernehmen, vollständiger Fach-/Arbeitsabdeckung, keinem Statusanstieg und keinen widersprüchlichen aktiven Plänen. Register/Planentwurf nennt keinen vollständigen Bestehensmaßstab. Dort explizit aufnehmen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0815.c (Partially Covered): Verweise und Planregister werden erst nach dokumentiert bestandenem Check geändert. Diese Reihenfolge bei Register/Planentwurf ausdrücklich festhalten. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.
- SRC-0815.d (Partially Covered): Historische Nachweise bleiben auffindbar. Register/Planentwurf unterscheidet historische Belege, garantiert deren Auffindbarkeit bei Migration aber nicht. Ergänzen. Offene Planungsprüfung: projektweite beziehungsweise storyweise Anwendung noch nicht für alle betroffenen Ziele belegt.


Die Migration bleibt IN PROGRESS. Weitere Kandidaten sind nicht semantisch geprüft.
