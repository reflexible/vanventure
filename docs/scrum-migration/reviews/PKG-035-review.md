## Review-Ergebnis PKG-035

**Nicht freigabefähig; Coverage und Traceability sind Unresolved.** Der beauftragte Bereich umfasst 104 IDs. [PKG-035-input.json](</D:/work/_venventure/docs/scrum-migration/reviews/PKG-035-input.json>) enthält jedoch nur **30 Originalblöcke, 30 Matrix-Zuordnungen und 53 Klauselkandidaten**: SRC-0977/0978 und SRC-1053–1080. **SRC-0979–1052 fehlen vollständig aus dem Paket.** Ich habe diese 74 IDs ergänzend lesend in der [Traceability-Matrix](</D:/work/_venventure/docs/scrum-migration/traceability-matrix.csv>) und ihren Originaldateien geprüft. Es wurden keine Dateien geändert.

Die Matrix markiert alle 74 fehlenden IDs als `Relevant: No`. Das ist für mehrere verbindliche Regeln falsch. Nach [Scrum-Planungsregel, Abschnitt 6](</D:/work/_venventure/docs/project-rules/scrum-planning.md:115>) blockieren solche Lücken den Planwechsel. Die unten genannten Zielstellen sind Vorschläge für die Korrektur, keine Behauptung über den heutigen Implementierungs- oder Live-Stand.

### Befunde zu allen 53 gelieferten Kandidaten

`S` bezeichnet eine einfach abgrenzbare Klausel, `C` eine Klausel mit mehreren Pflichten, Bedingungen oder Statusaussagen. Jede Kennung ist einzeln beurteilt. Zeilenangaben beziehen sich auf die Originaldatei; `Plan` meint [scrum-plan-draft.md](</D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md>), `Register` [constraint-register.md](</D:/work/_venventure/docs/scrum-migration/constraint-register.md>).

| Kandidat | Prüfung und konkrete Korrektur |
| --- | --- |
| SRC-0977.a · S · `seo.md:37` | „4.“ ist nur Listennummer, keine Klausel. Kandidat entfernen. |
| SRC-0977.b · C · `seo.md:37` | Belegte Etappen, Stellplätze, Reisezeiten **und eigene Erfahrungen** sind vier prüfbare Inhaltsbedingungen. Plan: ST-SEO-04/05/06, Z. 210–238, trifft die drei Berichte. Als zusammengehörige redaktionelle Bedingung zulässig; bei atomarer Erfassung in vier Kriterien teilen. |
| SRC-0977.c · C · `seo.md:37` | Verbot erfundener **Kosten, Tipps und Ergebnisse**. Die drei Story-AC nennen Kosten bzw. „Angaben“, aber Tipps und Ergebnisse nicht ausdrücklich. In ST-SEO-04/05/06, Z. 216/226/236, wörtlich ergänzen oder als gemeinsame, explizit referenzierte Inhaltsgrenze führen. |
| SRC-0978.a · S · `seo.md:38` | „5.“ ist nur Listennummer. Entfernen. |
| SRC-0978.b · C · `seo.md:38` | Passende **bestehende** YouTube-Reisevideos; Website-Link nur **bei ausdrücklichem Auftrag**. ST-SEO-03, Z. 202–207, nennt Auswahl, aber der ausdrückliche *Auftrag* und „bestehend“ fehlen. Ergänzen; Auswahl allein ist keine Beauftragung. |
| SRC-0978.c · C · `seo.md:38` | Beide Verbote, gekaufte Links und automatisierte Fremdbeiträge, stehen in ST-SEO-03, Z. 206. Semantisch abgedeckt; als zwei getrennte Prüfpunkte erfassen. |
| SRC-1053.a · S · `cockpit-mvp.md:223–224` | Private Produktionsumgebung als Ort der Google-Verbindungswerte. Register Z. 2446–2450 bewahrt Wortlaut; ST-INS-01, Z. 406, verweist nur allgemein auf Sicherheitsgrenzen. Den konkreten Konfigurationsort als Abnahmekriterium/Constraint verlinken. |
| SRC-1053.b · C · `cockpit-mvp.md:223–224` | Verbot für Git, Chat und öffentliche Website. Register bewahrt es, doch der Wortlaut „diese Werte“ erfasst scheinbar auch die Callback-URL und das Google-Konto aus Z. 229–231; beide Arten von Angaben stehen bereits in Projekttexten. **Unresolved:** Geheimnisse und veröffentlichbare Kennungen sauber abgrenzen; siehe Entscheidungsfrage unten. |
| SRC-1054.a · S · `cockpit-mvp.md:226` | Client-ID erforderlich; nur zusammen mit SRC-1053.a als Produktionskonfiguration verständlich. Register Z. 2452–2456 korrekt; konkreten Konfigurationscheck an ST-INS-01 hängen. |
| SRC-1055.a · S · `cockpit-mvp.md:227` | Client-Secret erforderlich; zusätzlich Geheimnisschutz aus SRC-1053.b. Register Z. 2458–2462 korrekt, Planning Coverage nur indirekt. |
| SRC-1056.a · C · `cockpit-mvp.md:228` | 32-Byte-Schlüssel **für gespeicherte Refresh-Tokens**; Länge und Zweck getrennt prüfen. Register Z. 2464–2468 korrekt; in ST-INS-01 gezielt referenzieren. |
| SRC-1057.a · S · `cockpit-mvp.md:229–230` | Exakte YouTube-Callback-Adresse. Register Z. 2470–2474 korrekt; im Verbindungs-AC von ST-INS-01 konkret prüfen. Kein Login-Callback. |
| SRC-1058.a · S · `cockpit-mvp.md:231` | Kanalverwaltendes Google-Konto ist benötigte Phase-0-Angabe. Register Z. 2476–2480 korrekt; Rolle/Zuständigkeit im Verbindungsnachweis zu ST-INS-01 festhalten. |
| SRC-1059.a · C · `cockpit-mvp.md:233–234` | Ausschließlich zwei benannte **YouTube-APIs**. Register Z. 2482–2486 korrekt; Zuordnung zu ST-AUTH-01 ist irreführend, da dessen separater Login betroffen wäre. ST-INS-01. |
| SRC-1059.b · C · `cockpit-mvp.md:234–235` | Genau zwei YouTube-Lesescopes; weder Schreibscope noch Login-Scopes hineinmischen. ST-INS-01 und Register; ST-AUTH-01 nur als Trennungsbezug. |
| SRC-1059.c · S · `cockpit-mvp.md:235–236` | Cockpit-Login bleibt von YouTube-Einwilligung getrennt. ST-AUTH-01, Z. 470–471, deckt dies; auch ST-INS-01 als Gegenstelle verlinken. |
| SRC-1060.a · C · `cockpit-mvp.md:240–241` | Künftige Admin- **und** Redaktionsadressen verbindlich **vor Umschaltung** festlegen. ST-AUTH-01, Z. 470, nennt Allowlist, nicht diese zeitliche Freigabebedingung ausdrücklich. Als historisches Gate mit Nachweis erfassen, ohne heutige Prüfung zu behaupten. |
| SRC-1060.b · C · `cockpit-mvp.md:241–243` | Pflege ausschließlich über vorhandene Benutzerverwaltung; keine offene Registrierung. ST-AUTH-01, Z. 470, deckt beides. |
| SRC-1061.a · S · `cockpit-mvp.md:245` | „Die Umsetzung umfasst:“ ist Einleitung, keine eigenständige Klausel. Kandidat entfernen; SRC-1062–1067 bleiben. Register Z. 2494–2498 nicht als eigenständige bindende Regel behandeln. |
| SRC-1062.a · C · `cockpit-mvp.md:247–248` | Alternative **additive Spalten oder eigene Tabelle**, dazu Provider, `sub`, verifizierte E-Mail, Zuordnungszeit. ST-AUTH-01, Z. 470, nennt Felder, aber nicht die additive Alternative klar. Diese erhalten. |
| SRC-1063.a · C · `cockpit-mvp.md:249–250` | Start- und Callback-Routen plus sicherer Rücksprung zu zwei Zielen. ST-AUTH-01, Z. 470, deckt das im Kern; beide Routen und beide Ziele separat prüfbar machen. |
| SRC-1064.a · S · `cockpit-mvp.md:251` | Gemeinsame, serverseitig prüfbare Sitzung für beide Bereiche. ST-AUTH-01, Z. 470, deckt sie. |
| SRC-1065.a · C · `cockpit-mvp.md:252–253` | Login-Schaltflächen **und** verständlicher Ablehnungshinweis. ST-AUTH-01, Z. 470, nennt beide; Hinweis dort als „neutral“ präzisiert. Beide UI-Ergebnisse getrennt prüfen. |
| SRC-1066.a · C · `cockpit-mvp.md:254–256` | Vier Audit-Ereignisse und drei Log-Ausschlüsse. ST-AUTH-01, Z. 470, deckt sie inhaltlich; in getrennte Ereignis- und Geheimnisschutzkriterien teilen. |
| SRC-1067.a · C · `cockpit-mvp.md:257–259` | Sieben Testszenarien, einschließlich **sofortiger** Ungültigkeit nach Sperre/Rollenänderung. ST-AUTH-01, Z. 470, nennt 18 historische Tests, aber keine nachvollziehbare Szenario-zu-Test-Zuordnung. Register Z. 2530–2534 bewahrt Wortlaut; Testnachweise je Szenario referenzieren. |
| SRC-1068.a · C · `cockpit-mvp.md:263–264` | Sechs `yt_`-Tabellenzwecke, PostgreSQL und Präfix. Register Z. 2536–2540 korrekt; ST-INS-01, Z. 406, ist zu allgemein für eine prüfbare Schema-Zuordnung. |
| SRC-1068.b · C · `cockpit-mvp.md:264–265` | Planner, Master Context und Audit-Log erhalten **eigene additive** Tabellen. Register korrekt; für Auth-Audit zusätzlich ST-AUTH-01 zuordnen, übrige zu ST-INS-01. |
| SRC-1069.a · S · `cockpit-mvp.md:266` | Private JSON-API unter exaktem Präfix. ST-INS-01, Z. 406–407, und Register Z. 2542–2546 decken sie. |
| SRC-1069.b · S · `cockpit-mvp.md:266–267` | Oberfläche verwendet ausschließlich diese API. ST-INS-01, Z. 406, deckt sie; „ausschließlich“ beibehalten. |
| SRC-1070.a · C · `cockpit-mvp.md:268–269` | AES-256-GCM, kein Token im Browser, keine Geheimnisse in Logs sind getrennte Schutzpflichten. Register Z. 2548–2552 bewahrt sie; ST-INS-01 braucht explizite Prüfnachweise je Grenze. |
| SRC-1071.a · C · `cockpit-mvp.md:270–271` | Idempotente Tageswert-Upserts **und mindestens 35 Tage Nachzug**. Register Z. 2554–2558 korrekt; ST-INS-01, Z. 406, nennt beides nicht prüfbar. Ergänzen. |
| SRC-1072.a · S · `cockpit-mvp.md:272` | Datenbank-Lock **pro Kanal** gegen parallelen Sync. ST-INS-01, Z. 406, nennt Sperre; Kanalgranularität im AC ergänzen. |
| SRC-1073.a · C · `cockpit-mvp.md:276–278` | Historische Definition von Phase 3: private Route, erfolgreicher OAuth, aktuelle Daten, Jahresplan. Register Z. 2566–2570 etikettiert den gesamten Block als bindend; als **historisches Phasengate** kennzeichnen und Nachweise zu ST-INS-01 zuordnen, nicht als heutige neue Arbeit. |
| SRC-1073.b · S · `cockpit-mvp.md:278–279` | Phase 4 automatisiert Pflege. Historischer Phasenschritt; heutige Sync-Funktion in ST-INS-01 verifizieren, nicht erneut planen. |
| SRC-1073.c · C · `cockpit-mvp.md:279–280` | Bedingte Erlaubnis für Phase 1 ohne externe Daten **bis Google-Konfiguration vorliegt**. Historische Ausnahme mit Bedingung, nicht allgemeine Erlaubnis für einen fertigen Datenstand. Register entsprechend präzisieren. |
| SRC-1074.a · S · `cockpit-plan.md:3` | „Stand: 22.“ ist fehlerhafter Datumssplit, keine Klausel. Entfernen und Datum als Metadatum zusammenführen. |
| SRC-1074.b · C · `cockpit-plan.md:3–4` | Beginnt mit abgetrenntem Monatsnamen. Architektur-/API-Beschreibung ist Dokumentrolle, keine Produktanforderung. Mit Datum als Metadatum führen; nicht ST-INS-01-AC. |
| SRC-1074.c · C · `cockpit-plan.md:4–5` | Referenz ist kein aktiver Plan; erledigte und offene Arbeit bleibt im Gesamtplan. Governance-Regel, **nicht** Cockpit-Feature. Register Z. 2572–2576 aus „bindendem Originalwortlaut“ in Quellen-/Planrollen-Nachweis verschieben; maßgeblich ist die Planungsregel. |
| SRC-1074.d · S · `cockpit-plan.md:6–7` | Historische Phasen setzen keine Aufgaben/Prioritäten. Gleicher Governance-Kontext; mit `.c` verbinden, nicht ST-INS-01. |
| SRC-1075.a · S · `cockpit-plan.md:9` | „Audit-V1-Stand (22.“ ist fehlerhafter Datumssplit. Entfernen. |
| SRC-1075.b · C · `cockpit-plan.md:9–10` | 25 Videos und Verteilung sind **datierter Befund**, kein dauerhaftes AC. ST-INS-01, Z. 406, bewahrt den Befund; Register Z. 2578–2582 als historischen Nachweis kennzeichnen. |
| SRC-1075.c · S · `cockpit-plan.md:10–11` | 986 Views sind zeitgebundener Messwert, nicht künftiger Sollwert. Historische Evidenz. |
| SRC-1075.d · C · `cockpit-plan.md:11–12` | Zwei Watchtime-Werte und 365-Tage-Fenster sind datierter Befund. Nicht ST-INS-04 als neues Abnahmekriterium. |
| SRC-1075.e · C · `cockpit-plan.md:12–13` | Trolltunga-Werte samt Shorts-Feed-Anteil sind datierter Befund. Nicht als aktuelle Metrik behaupten. |
| SRC-1075.f · C · `cockpit-plan.md:13–15` | **Drei getrennte Tests** und **keine automatische Säulen-Gewichtung** sind echte Planungsfolgen. ST-INS-04 ist falsches Ziel; in ST-CON-01/02/03, Z. 260–283, und ggf. Planner-Constraint zuordnen. |
| SRC-1075.g · S · `cockpit-plan.md:15` | Link zum Audit ist Quellenverweis, keine Klausel. Als Evidenzlink beim historischen Befund behalten. |
| SRC-1076.a · C · `cockpit-plan.md:19–20` | Drei private Funktionsbereiche; ST-INS-01, Z. 402/406, deckt sie im Kern. Inhalte getrennt prüfbar halten. |
| SRC-1076.b · S · `cockpit-plan.md:20–21` | Nicht Teil der öffentlichen GitHub-Pages-Website. ST-INS-01, Z. 406, schützt öffentliche Ausgabe; Architekturgrenze im Register Z. 2584–2588 korrekt. |
| SRC-1076.c · S · `cockpit-plan.md:21` | Nur explizit freigeschaltete Personen. Ziel ST-AUTH-01 statt allein ST-INS-01; dort Allowlist-AC Z. 470. |
| SRC-1077.a · S · `cockpit-plan.md:23` | „Das Cockpit soll:“ ist Einleitung, keine Klausel. Entfernen; Register Z. 2590–2594 nicht als eigenständige Regel führen. |
| SRC-1078.a · C · `cockpit-plan.md:25–26` | Auslesen des **ausgewählten Kanals** erst nach **separat erteilter YouTube-OAuth-Verbindung**. Hauptziel ST-INS-01, nicht allein ST-AUTH-01; die Trennung zu Login zusätzlich dort referenzieren. Register Z. 2596–2600 korrigieren. |
| SRC-1079.a · C · `cockpit-plan.md:27–28` | Beide Datenquellen **wiederholbar und nachvollziehbar** synchronisieren. ST-INS-01, Z. 406, nennt Sync, aber Wiederholbarkeit/Nachvollziehbarkeit nicht explizit. Ergänzen. |
| SRC-1080.a · C · `cockpit-plan.md:29–30` | Tägliche historische Datenhaltung und fünf Vergleichsalter sind unterschiedliche Ergebnisse. Datenhaltung zu ST-INS-01; **1/7/28/90/365-Vergleiche** zu ST-INS-04, Z. 436. Register Z. 2608–2612 und Matrix entsprechend aufteilen. |

### Die 74 im JSON fehlenden IDs

Die folgenden Bewertungen stammen aus den direkt gelesenen Originalen [seo.md](</D:/work/_venventure/docs/seo.md:40>), [gcs-1-jahr-erfahrung.md](</D:/work/_venventure/docs/source-notes/gcs-1-jahr-erfahrung.md:1>) und [vanventure-cockpit-mvp.md](</D:/work/_venventure/docs/vanventure-cockpit-mvp.md:1>). **Für keine dieser IDs liegt im Paket ein Klauselkandidat vor; eine abgeschlossene Kandidatenprüfung ist daher unmöglich.** Die Einträge nennen die notwendige Nacharbeit je ID.

| ID und Originalzeile | Befund zur pauschalen Matrix-Einstufung `No`; konkrete Zuordnung |
| --- | --- |
| SRC-0979 · `seo.md:40` | Kontext über nicht garantierbare Suchposition und Verzögerung. `No` begründbar; Aussage als Grenze von SEO-Erfolgsbehauptungen erhalten. |
| SRC-0980 · `source-notes:3` | Datum/Urheberschaft, Metadaten. `No` begründbar. |
| SRC-0981 · `source-notes:6` | Dokumentrolle/Planhoheit. `No` als Produktarbeit begründbar; Quellenrolle in Migration erhalten. |
| SRC-0982 · `source-notes:9–12` | **Aktive Inhaltsgrenze:** Nur beständige, bestätigte Fakten in Master Context; Rohbeobachtungen bleiben in der Quelle. `No` ohne Verweis falsch. ST-CON-01, Z. 260, und Master-Context-Constraint; Doppelübernahme aus Brief vermeiden. |
| SRC-0983 · `source-notes:16` | Videotitel/Redaktionskontext. In ST-CON-01-Brief referenzieren; kein eigenständiges neues Arbeitspaket. |
| SRC-0984 · `source-notes:19–26` | Verbindliche Van-/Familie-/Rad-Einordnung und **Kajak-Ausnahme**. `No` nur mit expliziter Duplikat-Zuordnung zum vorhandenen GCS-Brief-Constraint im Register Z. 1210–1214 tragfähig. |
| SRC-0985 · `source-notes:29` | GCS seit Juni 2025: Quellfakt für ST-CON-01, kein isolierter Task. |
| SRC-0986 · `source-notes:30` | Zwei Erwachsene, Kind, Hund: Quellfakt; ST-CON-01/Brief. |
| SRC-0987 · `source-notes:31–32` | Regelmäßig mitgeführte Räder und positive **eigene** Erfahrung; ST-CON-01/Brief, nicht allgemeine Produktaussage. |
| SRC-0988 · `source-notes:33–36` | Individuelle 4,1-t-Entscheidung mit Gründen und Verbot der Verallgemeinerung. `No` ohne konkreten Brief-Duplikatverweis falsch; Register Z. 1216–1220. |
| SRC-0989 · `source-notes:38–39` | Verbauter Heckauszug und Nutzen: Quellfakt; ST-CON-01/Brief. |
| SRC-0990 · `source-notes:40–41` | Tisch und Kindersessel blockieren Auszug: aktueller, zeitgebundener Befund; ST-CON-01/Brief. |
| SRC-0991 · `source-notes:42–44` | **Offener realer Filmtest** mit zwei genau dimensionierten Euroboxen; Ergebnis und Gesamtkonzept offen. `No` falsch, sofern nicht ausdrücklich über Brief-Constraint Z. 1284–1286 und ST-CON-01, Z. 260, abgedeckt. Kein „fertig“ daraus machen. |
| SRC-0992 · `source-notes:46` | Entfernte Toilettenbox: Quellfakt, kein isolierter Task. |
| SRC-0993 · `source-notes:47` | Ersatzleiter: Quellfakt, kein isolierter Task. |
| SRC-0994 · `source-notes:48` | Hecklastigkeit/Fahrwerksoptimierung als **relevant**, nicht als beauftragter Umbau. Für ST-CON-01/Brief als offene Einordnung erhalten. |
| SRC-0995 · `source-notes:49–50` | Positive Gesamtbewertung **trotz** Mängeln; subjektive Erfahrung, nicht objektive Kaufempfehlung. ST-CON-01/Brief. |
| SRC-0996 · `source-notes:54–58` | Longform, zwei Shorts und bedingte Website-Ergänzung sind ST-CON-01, Z. 260, zugeordnet. Spätere Vertiefungen sind Möglichkeiten, Kajak erst nach echter Nutzung; nicht als bereits beauftragte Stories ausgeben. |
| SRC-0997 · `cockpit-mvp:3` | Standdatum; `No` begründbar. |
| SRC-0998 · `cockpit-mvp:5–8` | Quellenrolle und historische Phasen; als Migrationskontext erhalten, nicht als Cockpit-Feature. |
| SRC-0999 · `cockpit-mvp:12–15` | **Bedingte Nutzerfreigabe: automatischer Abruf nur ohne Google-Cloud-Kosten; kein Rechnungskonto/Test; kostenlose Kontingente.** `No` falsch. ST-INS-01 und Betriebs-Constraint, Status der damaligen Konfiguration getrennt von fortgeltender Kostengrenze. |
| SRC-1000 · `cockpit-mvp:17` | Überschrift, kein Kandidat. |
| SRC-1001 · `cockpit-mvp:19` | Datierter Health-Nachweis; Historie zu ST-OPS-01, Z. 624, kein heutiger Health-Nachweis. |
| SRC-1002 · `cockpit-mvp:20–23` | Historische Konfigurations-/Sicherungsdetails; als Evidenz zu ST-INS-01/OPS-01 erhalten, keine Geheimnisse übertragen. |
| SRC-1003 · `cockpit-mvp:24–25` | Historischer Google-Projekt-/Abrechnungsnachweis; mit Kostengrenze SRC-0999 verknüpfen. |
| SRC-1004 · `cockpit-mvp:26–28` | Historische Zustimmung zu Nutzungsbedingungen; Nachweis, keine neue pauschale Freigabe. |
| SRC-1005 · `cockpit-mvp:29–30` | Historisch aktivierte zwei APIs; aktive API-Grenze bei SRC-1059. |
| SRC-1006 · `cockpit-mvp:31–34` | Historischer YouTube-Webclient, exakter Callback und private Zugangsdaten; Nachweis zu ST-INS-01, nicht Login-Client. |
| SRC-1007 · `cockpit-mvp:35–38` | Zielkanal historisch konfiguriert, **OAuth damals noch nicht nachgewiesen**. Statuszeitpunkt bewahren; keine heutige Sperre behaupten. |
| SRC-1008 · `cockpit-mvp:39–41` | Historische lokale Tooltests; nicht als heutige Live-Prüfung werten. |
| SRC-1009 · `cockpit-mvp:42–43` | Damals **nicht** ausgerollte Compose-Änderung. Historischen Status erhalten, nicht als aktuelle offene Aufgabe ohne Abgleich. |
| SRC-1010 · `cockpit-mvp:45–47` | Historisches Phase-2-Gate und abgeschalteter Autoabruf bis dahin. Mit späterem Phase-2-Abschluss abgleichen; `No` nur als ausdrücklich überholter Phasenstatus. |
| SRC-1011 · `cockpit-mvp:49–53` | Datierter Phase-1-Live-Nachweis für Privatsphäre/API/Tabellen/Audit; ST-INS-01-Historie, kein heutiger Beleg. |
| SRC-1012 · `cockpit-mvp:57–59` | Datierte Kanalfreigabe und Tokenort; historische Evidenz, Schutzbedingung in ST-INS-01 fortführen. |
| SRC-1013 · `cockpit-mvp:60–62` | Erstlaufzahlen und damals fällige Snapshots; historischer Messstand, ST-INS-01 Z. 406 enthält nur einen Teil. |
| SRC-1014 · `cockpit-mvp:63–67` | Historischer Rhythmus und Audit-Export; **Auth-Pflicht, Datenausschlüsse, HTTP 401 und kein Import** sind fortgeltende Grenzen. ST-INS-01, Z. 406, nennt Export/401, übrige Grenzen gezielt referenzieren. |
| SRC-1015 · `cockpit-mvp:68–70` | Historische Live-Prüfung; private `noindex`/`no-store`-Grenze bleibt ST-INS-01/ST-AUTH-01. |
| SRC-1016 · `cockpit-mvp:74–76` | Lock pro Kanal und verständlicher Konflikt beim zweiten Start. Letzteres fehlt als konkretes AC in ST-INS-01; ergänzen. |
| SRC-1017 · `cockpit-mvp:77–78` | Fehlgeschlagener/überfälliger Lauf sichtbar in privater Übersicht. ST-INS-01 nennt Monitoring nur allgemein; sichtbares Fehlerverhalten ergänzen. |
| SRC-1018 · `cockpit-mvp:79–82` | Datierter Restoretest; ST-OPS-01, Z. 624, bewahrt Historie. Keine Erfüllung künftiger Wiederholung daraus ableiten. |
| SRC-1019 · `cockpit-mvp:83–84` | **Externer Benachrichtigungskanal erst nach bewusster Empfänger- und Kanalentscheidung.** `No` falsch als fortgeltendes Gate. ST-BRD-03, Z. 603–604, bzw. Monitoring-Constraint zuordnen. |
| SRC-1020 · `cockpit-mvp:88–95` | Datierter Audit-Befund und drei angelegte Tests. Historie zu ST-INS-01 und ST-CON-01/02/03; keine aktuelle Kennzahl oder automatische Gewichtung daraus ableiten. |
| SRC-1021 · `cockpit-mvp:99–103` | **Private Architektur, gemeinsame Schutzmechanismen, keine Daten oder Google-Zugänge auf öffentlicher Site.** `No` falsch. ST-INS-01 und ST-AUTH-01 mit Register-Constraint. |
| SRC-1022 · `cockpit-mvp:105` | Einleitung, kein Kandidat. |
| SRC-1023 · `cockpit-mvp:107–108` | Gemeinsamer Login/eine Anmeldung für zwei private Bereiche: ST-AUTH-01, Z. 470; `No` ohne Duplikatverweis falsch. |
| SRC-1024 · `cockpit-mvp:109` | Rollen ausschließlich `admin` und `editor`: ST-AUTH-01, Z. 470; explizit referenzieren. |
| SRC-1025 · `cockpit-mvp:110–111` | Getrennte YouTube-Verbindung, **nur Admin-Verwaltung**: ST-INS-01 plus ST-AUTH-01-Trennung; nicht bloß historischer Kontext. |
| SRC-1026 · `cockpit-mvp:112` | Sicherer täglicher Ein-Kanal-Sync: ST-INS-01; Häufigkeit/Kanalzahl explizit prüfen. |
| SRC-1027 · `cockpit-mvp:113` | Dashboard und Videosicht samt Kennzahlen: ST-INS-01, Z. 406; bestehend/zu verifizieren. |
| SRC-1028 · `cockpit-mvp:114–115` | 1/7/28 sowie altersbedingt erst später 90/365. ST-INS-01 für Datenbasis, ST-INS-04, Z. 436, für vollständige Vergleiche; Altersbedingung erhalten. |
| SRC-1029 · `cockpit-mvp:116` | Zwölf Longform-Slots: Planner-Constraint und ST-INS-01, nicht als beliebige Gesamtzahl von Videos lesen. |
| SRC-1030 · `cockpit-mvp:117–118` | Redaktioneller Master Context mit sieben Themen: ST-INS-01, konkrete Themenliste als Constraint erhalten. |
| SRC-1031 · `cockpit-mvp:122–152` | Umfangreicher **datierter Implementierungsbericht**, kein einzelner atomarer Kandidat. Nach Funktion/Status segmentieren und zu ST-AUTH-01, ST-INS-01 sowie öffentlicher Navigation zuordnen; historische Live-Aussage nicht als heutige Prüfung anheben. |
| SRC-1032 · `cockpit-mvp:154–160` | Gemeinsamer Einstieg, Sitzung, Cookie `Path=/`, Wechsel ohne Zweitlogin, sicherer Rücksprung. Mehrere aktive Klauseln; ST-AUTH-01 und Register, nicht pauschal `No`. |
| SRC-1033 · `cockpit-mvp:162–167` | Verifiziertes Allowlist-Konto, `sub`, VanVenture-Rollen/Sperren, mindestens ein Admin, Passwort-Notfallzugang. Mehrere Schutzregeln; ST-AUTH-01, Z. 470, nur teilweise explizit. Aufteilen. |
| SRC-1034 · `cockpit-mvp:169–174` | Eigener Login-Client/minimale Scopes, separater YouTube-Client, Admin-Einwilligung, Login gewährt nie YouTube-Rechte. ST-AUTH-01 und ST-INS-01; `No` falsch. |
| SRC-1035 · `cockpit-mvp:176–181` | Keine kostenpflichtigen Dienste/Abrechnung; zusätzlicher Login-Client mit exaktem Callback. ST-AUTH-01 plus Kosten-Constraint; `No` falsch. |
| SRC-1036 · `cockpit-mvp:185–186` | Private Routen, `noindex`, `no-store`, HTTPS-/Cookie-Regeln. ST-AUTH-01; `No` falsch. |
| SRC-1037 · `cockpit-mvp:187–189` | Code Flow, PKCE, `state`, `nonce`, HTTPS-Domain und exakt registrierte Callbacks. ST-AUTH-01; einzelne Sicherheitschecks nötig. |
| SRC-1038 · `cockpit-mvp:190–192` | Cookie-Attribute und sofortige Invalidierung bei drei Ereignissen. ST-AUTH-01, Z. 470, nennt nicht alle Attribute; ergänzen. |
| SRC-1039 · `cockpit-mvp:193–194` | Neustartfeste Sitzungsverwaltung, zwei zulässige Verfahren. ST-AUTH-01, Z. 470, erwähnt kontrollierten Neustart, aber nicht die Grenze „Anmeldungen nicht unnötig beenden“. |
| SRC-1040 · `cockpit-mvp:195–196` | Additive Migration ohne Veränderung von Redaktionstabellen/-daten und Reiseberichten. ST-INS-01/OPS-01 als Betriebs-Constraint; `No` falsch. |
| SRC-1041 · `cockpit-mvp:197–199` | Historische Freigabe eines kurzen **Web**-Neustarts bei Image-Release; PostgreSQL, Dateien, Caddy bleiben. Mit AGENTS.md und ST-OPS-01, Z. 625, konsistent, aber kein allgemeiner Neustartzwang. |
| SRC-1042 · `cockpit-mvp:200` | **Kein Sync ohne explizite gültige Kanalverbindung.** ST-INS-01-AC ergänzen; `No` falsch. |
| SRC-1043 · `cockpit-mvp:201–202` | Autojob erst nach erfolgreicher Sichtprüfung des ersten manuellen Sync. Historisches Aktivierungsgate; Nachweis zu ST-INS-01, nicht als heutige offene Phase ausgeben. |
| SRC-1044 · `cockpit-mvp:203–204` | Alter Wortlaut verlangt Dump **vor jedem** Rollout. Er widerspricht der neueren bedingten Backup-Regel in AGENTS.md und ST-OPS-01, Z. 625 (kein Dump für reversible stateless Updates). **Konflikt ausdrücklich mit Nachfolgeregel dokumentieren**, nicht stillschweigend als `No` verstecken. `/healthz` bleibt Pflicht. |
| SRC-1045 · `cockpit-mvp:208` | Tabellenkopf, kein Kandidat. |
| SRC-1046 · `cockpit-mvp:210` | Historisches Phase-0-Ergebnis und Bestätigungsgate; als Phasen-Evidenz, nicht heutiges neues Backlog. |
| SRC-1047 · `cockpit-mvp:211` | Historisches Phase-1-Ergebnis; Rechte-/Staging-Prüfung als damaliges Gate erhalten. |
| SRC-1048 · `cockpit-mvp:212` | Historische Live-Abnahme von Login mit Positiv-/Negativkonto, Wechsel, Abmeldung, Sperre. Zu ST-AUTH-01-Historie, nicht heutiger Testbeleg. |
| SRC-1049 · `cockpit-mvp:213` | Historisches Phase-2-Gate: Zahlenvergleich mit YouTube Studio. Nachweis zu ST-INS-01; nicht aus bloßen Importzahlen folgern. |
| SRC-1050 · `cockpit-mvp:214` | Historischer Phase-3-Live-Stand **mit offenen tatsächlichen Stunden und zwei Briefs**. ST-INS-01, ST-INS-05 und ST-CON-02/03 zuordnen; offene Arbeit nicht als Done verschlucken. |
| SRC-1051 · `cockpit-mvp:215` | Historischer Automatisierungsstand mit Prüfung der ersten Woche auf Fehler/Datenqualität. Zu ST-INS-01/OPS-01-Evidenz; Prüfung nicht aus bloßer Job-Existenz folgern. |
| SRC-1052 · `cockpit-mvp:217–219` | Nutzbarer Zustand nach jeder Phase, Sichtprüfung vor nächster Phase, additive rückwärtskompatible DB-Erweiterung. Drei Klauseln; historische Phasenlogik und fortgeltende Migrationsgrenze trennen. `No` pauschal nicht tragfähig. |

### Übergreifende Korrekturen und offene Entscheidung

1. **Paket vervollständigen:** SRC-0979–1052 mit Originalblöcken, Matrixzeilen und atomaren Kandidaten in PKG-035 aufnehmen. Die gelieferte **Kandidatenzahl ist 53**, davon sind mindestens acht bloße Nummern, Einleitungen, Datumssplitter oder Quellenlinks; nach Entfernung und notwendiger Aufteilung ist die endgültige Kandidatenzahl **noch nicht bestimmbar**. Eine Coverage-Quote auf Basis der 53 wäre irreführend.
2. **Historie von geltenden Bedingungen trennen:** Besonders Register Z. 2566–2594 behandelt Phasendefinitionen, Dokumentrollen und Audit-Zahlen als „verbindlichen Originalwortlaut“. Wortlaut und Herkunft bleiben erhalten; **Status, Geltung und Story-Ziel** müssen je Klausel ausgezeichnet werden. ST-AUTH-01 „Done“ und ST-INS-01 „Existing / Verify“ ersetzen keine heutige Live-Prüfung.
3. **Matrix-Ziele berichtigen:** SRC-1075.f zu den drei Content-Tests; SRC-1076.c zu ST-AUTH-01; SRC-1078.a hauptsächlich zu ST-INS-01; SRC-1080.a zwischen ST-INS-01 und ST-INS-04 aufteilen. SRC-0977.c und SRC-0978.b benötigen konkrete AC-Ergänzungen.
4. **Duplikate ausdrücklich verknüpfen:** Die GCS-Quellnotiz überschneidet sich mit dem vorhandenen Production Brief im Register. Für SRC-0984–0996 jeweils den identischen Brief-Constraint oder die noch offene ST-CON-01-Arbeit benennen; `No` ohne Nachfolger ist keine Traceability.
5. **Unresolved – Nutzerentscheidung zu SRC-1053.b:** Soll „niemals in Git, Chat oder öffentliche Website“ **nur Geheimnisse** (insbesondere Client-Secret, Verschlüsselungsschlüssel, Tokens) erfassen, während Callback-URL und die bereits dokumentierte Kanal-Kontoinformation nach gesonderter Freigabe dokumentierbar bleiben? Der Originalsatz bezieht sich grammatisch auf *alle* nachfolgenden Werte, obwohl die Quelle selbst Callback und ein Konto dokumentiert. Bis zur Klärung den Widerspruch sichtbar lassen und keine pauschale Freigabe dieser Angaben ableiten.

Dies ist ein **vollständiger lesender Befund über alle 104 beauftragten IDs**, aber **kein bestandener atomarer Paket- und Coverage-Check**: Für 74 IDs fehlen die eigentlichen Kandidaten im bereitgestellten JSON.