# Klauselprüfung der vier Teildeckungen und des zugehörigen Abnahmeblocks

## PKG-015: getrennte Prüfklauseln aus vollständigen Originalblöcken

| Ursprung | Nachfolger | Individuelle Planungszielstelle und Grenze |
| --- | --- | --- |
| SRC-0470.a | `.a1` vollständiger GCS-Brief mit sechs Feldern und historischem `briefed`; `.a2` 8–11 Zielstunden gegen ältere 24 geschätzte Stunden | `ST-CON-01` AC; `.a2` bleibt **Partially Covered**, bis Zeitpunkt und Bedeutung der Werte fachlich geklärt sind. |
| SRC-0472.a | `.a1` historisch festgelegtes VAN-Paket; `.a2` offene Produktions- und Freigabeschritte | `ST-CON-01` AC; Paketfestlegung bestätigt keine Produktion oder Freigabe. |
| SRC-0476.a | `.a1` Ist-Stunden nach jeder Veröffentlichung; `.a2` Nutzen pro Stunde frühestens nach 28 Tagen | `ST-INS-05` AC; beide brauchen je Veröffentlichung einen reproduzierbaren Beleg. |
| SRC-0477.a | `.a1` private Dauersichtbarkeit auf Küchen-Tablet; `.a2` fünf Aufgabenbereiche | `ST-BRD-01/02` AC; Touch-Bedienung ersetzt Dauersichtbarkeit nicht. |

Die vollständigen Originalworte bleiben in `source-inventory.csv` und
`traceability-matrix.csv`. Diese Teilung betrifft Planung, nicht Umsetzung.

Die Spalte „Klausel“ beschreibt den atomaren Inhalt. Der **vollständige, unveränderte Originaltext** steht in `partial-originals.md`, `traceability-matrix.csv` und im angegebenen Originalabschnitt. `Covered` bezeichnet nur die Aufnahme in den Plan. Die Implementierung und Freigabe stehen separat in `page-scope.csv` bzw. `photo-variant-scope.csv`.

## SRC-0461 · `docs/ausbauplan.md:511–515`

| Atom | Originalklausel | Neue Zuordnung | Planning Coverage | Implementation Verification |
| --- | --- | --- | --- | --- |
| SRC-0461.a | Gemeinsame Komponenten und responsive Regeln aus bestehender Architektur ableiten | ST-WEB-02/04/05; `constraint-register.md#src-0821` (Template-Spezifikation) | Covered | Partially Done |
| SRC-0461.b | Kajak auf Aktivitäts-Template migrieren | ST-WEB-02 | Covered | Existing / Verify |
| SRC-0461.c | Fahrzeugseiten umstellen | ST-WEB-02 | Covered | Partially Done |
| SRC-0461.d | Reiseberichte umstellen | ST-WEB-04 | Covered | Partially Done |
| SRC-0461.e | Passende weitere Unterseiten umstellen | ST-WEB-05; aktueller Bestand in `page-scope.csv` | Covered; auch künftige passende Unterseiten | Existing / Verify; 11 Routen sind keine Obergrenze |
| SRC-0461.f | Kein Inhalts- oder Funktionsverlust | ST-WEB-02/04/05 Acceptance Criteria und gemeinsame DoD | Covered | Route-level acceptance pending |
| SRC-0461.g | Startseite bleibt eigenständig | ST-WEB-02/03 Acceptance Criteria; `constraint-register.md#src-0030` | Covered | Existing / Verify |

## SRC-0469 · `docs/ausbauplan.md:670–673`

| Atom | Originalklausel | Neue Zuordnung | Planning Coverage | Implementation Verification |
| --- | --- | --- | --- | --- |
| SRC-0469.a | Zentrale Änderungswirkung belegen | ST-WEB-02/04/05 und ST-WEB-03: Wirkung je Komponente auf allen zugeordneten Seiten | Covered | Prüfung offen |
| SRC-0469.b | Visuell und funktional bei 360, 390, 768, 1024 und 1440 CSS-Pixeln prüfen | ST-WEB-03 Acceptance Criteria; 11 Routen in `page-scope.csv` | Covered | Vollständige aktuelle Sichtabnahme offen |
| SRC-0469.c | Live-Rollout erst nach Abnahme gemäß Betriebsregeln | ST-WEB-03 Acceptance Criteria; `constraint-register.md#src-0010`, `#src-0469` | Covered | Konkreter Release-Umfang braucht ausdrückliche Nutzerfreigabe; nicht live abgeleitet |
| SRC-0469.d | Rollout getrennt dokumentieren | ST-WEB-03 Acceptance Criteria und gemeinsame DoD | Covered | Nach Release zu prüfen |

## SRC-0509 · `docs/ausbauplan.md:869–879`

| Atom | Originalklausel | Neue Zuordnung | Planning Coverage | Implementation Verification |
| --- | --- | --- | --- | --- |
| SRC-0509.a | Restliche Seitentyp-Strukturen und gemeinsame Abschnitte zentralisieren | ST-WEB-02/04/05; konkrete Abschnitts-Slices COVERAGE-R1-001; Routenbestand vor Umsetzung aktualisieren | Covered | Planning Coverage; Implementation Verification offen |
| SRC-0509.b | Kein inhaltliches Redesign | ST-WEB-02/04/05 Acceptance Criteria | Covered | Je Route zu prüfen |
| SRC-0509.c | Alle öffentlichen Seiten auf Desktop, Tablet, Mobil, hoch und quer visuell und funktional abnehmen | ST-WEB-03; `page-scope.csv` | Covered | Aktuelle Gesamt-Abnahme offen |
| SRC-0509.d | Lokale Gesamtvorschau vorlegen | ST-WEB-03 Dependencies und Acceptance Criteria | Covered | Offene Nutzerabnahme |
| SRC-0509.e | Getesteten Release-Commit veröffentlichen und live nachprüfen | ST-WEB-03 Acceptance Criteria; Release-Constraints | Covered | Offen |
| SRC-0509.f | Scott nutzt `equipment`-Eintrag und gemeinsamen Detailseiten-Generator | ST-WEB-05 | Covered | Lokal technisch geprüft; live nicht belegt |
| SRC-0509.g | Scott-Hero-Markup und -CSS stammen aus Kajak-Basis | ST-WEB-05 | Covered | Lokal technisch geprüft; visuell offen |
| SRC-0509.h | Scott-Hero und Radseite noch visuell abnehmen | ST-WEB-05 Acceptance Criteria | Covered | Offen |
| SRC-0509.i | Vier Vorbereitungsprofile behalten genehmigte Poster-Ausnahme | ST-WEB-05 Acceptance Criteria | Covered | Existing / Verify |
| SRC-0509.j | Keine dieser lokalen Änderungen als live ausgeben | ST-WEB-03 und gemeinsame DoD | Covered | Live-Stand zu prüfen |

## SRC-0510 · `docs/ausbauplan.md:881–922`

| Atom | Originalklausel | Neue Zuordnung | Planning Coverage | Implementation Verification |
| --- | --- | --- | --- | --- |
| SRC-0510.a | 79 Nicht-Fahrzeug-Varianten: damalige 74 Erstproben und fünf bestehende Freigaben | `photo-variant-scope.csv`; späterer Stand aus SRC-0522: 73 aktuelle Proben und sechs bestehende Fassungen | Covered | Historische und aktuelle Bestände getrennt |
| SRC-0510.b | Erste Proben sind keine Einzelabnahme; 74 Erstfassungen wurden abgelehnt | ST-PHOTO-02 Acceptance Criteria | Covered | Keine Erstfassung als fertig oder Webasset gezählt |
| SRC-0510.c | Sichtbare Gesichter und Kennzeichen sperren Vorschau bis präzise geprüft | ST-PHOTO-01 Acceptance Criteria; Bildregeln im Constraint-Register | Covered | Motivweise Prüfung offen |
| SRC-0510.d | 47 frühe Kontaktbogen-Vorschauen und 27 zurückgehaltene Proben sind historischer Teilstand | ST-PHOTO-02 Acceptance Criteria; späteren zweiten Durchlauf getrennt halten | Context | Eigener historischer Sichtungs- und Schutzstand; keine Freigabe daraus abgeleitet |
| SRC-0510.e | Motivweise Farbkorrektur und großer Vorher/Nachher-Vergleich statt bloßer Kontaktbögen | ST-PHOTO-02 Acceptance Criteria | Covered | Pro Motiv offen |
| SRC-0510.f | Black-Beauty-Schattenproben sind Richtungsentscheidungen; bestätigte V7 lokal eingebunden, nicht live | ST-PHOTO-02/07; `photo-variant-scope.csv` kennzeichnet ersetzte Scott-Pause | Covered | Existing / Verify; Live-Prüfung offen |
| SRC-0510.g | Ausschnitt, Spiegelung und Farbe motivweise prüfen | ST-PHOTO-02 Acceptance Criteria und Bildregeln | Covered | Pro Motiv offen |
| SRC-0510.h | Vier bereits gute Fahrzeugbilder nicht erneut bearbeiten | ST-PHOTO-03; Originaltext bleibt bindend | Covered | Existing / Verify |
| SRC-0510.i | Keine Veröffentlichung vor lokalem Gesamt-Review | ST-PHOTO-07, ST-WEB-03 und Release-Constraints | Covered | Gesamtfreigabe offen |

## SRC-0522 · `docs/ausbauplan.md:987–1013`

| Atom | Originalklausel | Neue Zuordnung | Planning Coverage | Implementation Verification |
| --- | --- | --- | --- | --- |
| SRC-0522.a | 74 zweite private Proben, davon eine durch Scott-Pause ersetzt; 73 aktuelle plus sechs vorhandene Fassungen | `photo-variant-scope.csv` mit 74 Manifest-Einträgen, einem ersetzten Eintrag und sechs bestehenden Fassungen | Covered | Bestands- und Hashprüfung, keine Bildfreigabe |
| SRC-0522.b | Unveränderte gehashte Projektkopien und lesende 84/84-Referenzprüfung | ST-PHOTO-01; `photo-variant-scope.csv` enthält Projektkopien und Manifestbelege | Covered | Technische Prüfung ist keine visuelle Abnahme |
| SRC-0522.c | Bei mehreren Varianten zu schwache Farbe; keine pauschale Freigabe | ST-PHOTO-02 Acceptance Criteria | Covered | Motivweise Entscheidung offen |
| SRC-0522.d | 72 der 74 Proben nur in privater Einzelbild-Vorschau sichtbar | ST-PHOTO-07; `photo-variant-scope.csv` | Covered | Sichtbarkeit ist keine Veröffentlichung |
| SRC-0522.e | Kinder anonymisieren; Erwachsene nur auf ausdrücklichen Motivauftrag maskieren | ST-PHOTO-01 Acceptance Criteria und Bildregeln | Covered | Je Motiv zu verifizieren |
| SRC-0522.f | Kennzeichen motivweise eng maskieren und bei 100 Prozent prüfen; Rückansichten/Nr. 12 gesondert belegt | ST-PHOTO-01; vorhandene historische Nachweise bleiben erhalten | Covered | Kein pauschaler Privacy-Status für andere Motive |
| SRC-0522.g | Nr. 63 und 69 bis Alters-/Publikationsentscheidung zurückhalten | ST-PHOTO-06; beide Assets in `photo-variant-scope.csv` markiert | Unresolved | Nutzerentscheidung je Motiv offen; beide bleiben gesperrt |
| SRC-0522.h | Grobe oder unvollständige Masken nicht zeigen | ST-PHOTO-01 Acceptance Criteria | Covered | Je Motiv zu prüfen |
| SRC-0522.i | Lokale Vorschau ist keine Webeinbindung und kein Release | ST-PHOTO-07; gemeinsame DoD und Release-Constraints | Covered | Webeinbindung und Live-Stand offen |
| SRC-0522.j | Individuelle Farb-, Datenschutz- und Nutzerprüfung für jede aktuelle Variante | ST-PHOTO-02/07; 73 aktuelle Assets einzeln in `photo-variant-scope.csv` | Covered | Per-asset Review offen; keine Umsetzung behauptet |

Die atomaren Zuordnungen ändern keine ursprüngliche Produktanforderung und heben keinen Implementierungs- oder Freigabestatus an.
