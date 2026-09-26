# Current migration status — Final Closure R7 / Final Audit R5 — 2026-09-26

Status: `FINAL_AUDIT_PASS`; plan promotion completed. Current canonical Scrum plan: `docs/scrum-plan.md`. All 20 preflight areas completed (15 PASS, 5 WARNING, 0 BLOCKER); the full independent Final Audit passed.

- Source blocks: 1,136 relevant / 2,414 inventoried; original candidates: 2,943 / 2,943; successors: 403.
- Plan: 75 stories, 11 epics, 256 tasks.
- Coverage: 15 findings, 0 reviewable; technical questions: 0.
- Decisions: 0 PRE_FINAL_AUDIT_DECISION; 10 PUBLICATION_DECISION; 3 DEFERRED_POST_PILOT; 5 evidence holds remain publication-only.
- Source Integrity: 22/22 sources classified; format and semantic exceptions remain explicitly distinct from byte verification.
- Phase 0: `PARTIALLY_ACCEPTED`; technical implementation, full phase acceptance, release/live evidence and publication are not approved by this audit.
- Current evidence: `reviews/FINAL-CLOSURE-R7-2026-09-26.md`, `reviews/FINAL-AUDIT-RETRY-R5-2026-09-26.md`.
- Dated sections below this separator are historical evidence; previous FAIL/BLOCKED reports remain unchanged.
---

# SRC-0968 recovery record (2026-09-26; status retained as recovery history)

**COVERAGE-R1-052 · aktueller gezielter Nachtrag:** `SRC-0470.a2`, `SRC-0949.a1` und `SRC-2252.f2` sind anhand der aktuellen AC/Constraints planerisch gedeckt. Der aktuelle Quellblockzähler hat **1 Partially Covered row (`SRC-0504`)**. Die GCS-Reichweite (`SRC-0753.a`) und die Riverstar-Ortsschwelle (`SRC-0948`) bleiben `PUBLICATION_DECISION`; der v18-Methodennachweis (`SRC-2042`/`SRC-2247`) bleibt `INSUFFICIENT_EVIDENCE`. Betroffene Veröffentlichung ist bis zur tatsächlichen Freigabe gesperrt; B und C blockieren den technischen Final Audit nicht. Keine Implementierungs-, Privacy- oder Live-Verifikation durch diesen Nachtrag.

The complete relevant source block was split into five new candidates and integrated with exact original-text reconstruction. The matrix now maps it to ST-SEO-01. Story AC, a child task, and reverse traceability include the target. The historical PKG-034 report is unchanged.

Current totals: **1,106 / 1,106 relevant source blocks**, **2,913 / 2,913 original candidates**, **356 successors**, **75 stories**, **256 tasks**. The traceability matrix contains **3 partiell gedeckte Quellenblöcke**; remaining atomic coverage findings: **18**, reviewable findings: **0**. Decision queue unchanged: **13 USER_DECISION**, **5 INSUFFICIENT_EVIDENCE**; within the user decisions, **10 PUBLICATION_DECISION** and **3 DEFERRED_POST_PILOT**. Phase 0 remains `PARTIALLY_ACCEPTED`.

Recovery R8 re-scoped ST-WEB-01 and ST-INS-06, added four source-backed vertical slices, and synchronized candidate targets, story/task catalog, and reverse traceability. The independent full audit R3 passed; the canonical plan is now `docs/scrum-plan.md`. R2 remains unchanged as historical audit evidence.

---

 · aktueller Readiness-Stand (26.09.2026)

Die fünf offenen Story-Schnittbefunde sind durch eigenständige Vertical-Slice-Stories für Longform, zwei Kurzformate, Website-Ergänzung und 28-Tage-Review je VAN/EXPLORE/MOVE geschlossen. Die technische Prüfung `SRC-0788`/`SRC-0791` ist abgeschlossen; der Fehler des Projektprüfers bei `SRC-0480`–`SRC-0489` beruhte auf einer zu strikten Präfixerwartung für den entscheidungsspezifischen, dennoch eindeutig mit PKG-016 bezeichneten Eintrag SRC-0482. Die Coverage-Zusammenfassung ist auf 6 verbleibende partiell gedeckte Quellblöcke aktualisiert. Fünf Versions-/Publikationsnachweise bleiben Veröffentlichungs-Holds und blockieren den technischen Final Audit nicht. Readiness: `READY_FOR_FINAL_AUDIT`; Final Audit `NOT_STARTED`.

# Aktueller Entscheidungsstand · COVERAGE-R2-002 (26.09.2026)

Die ausdrücklichen Nutzerentscheidungen sind in `reviews/decisions-2026-09-26.md` und im aktuellen Migrationsentwurf festgehalten. `SRC-0482` ist durch `UD-2026-09-26-16` für sieben ausdrücklich benannte Policy-Bereiche teilweise erfüllt; die PRE_FINAL_AUDIT_DECISION ist geschlossen, eine Gesamt-Phase-0-Abnahme liegt nicht vor. `SRC-0753/0780` sind PUBLICATION_DECISION, `SRC-1094` ist beantwortet, `SRC-1128` technisch geklärt, `SRC-1648` mit `SRC-1205` zusammengeführt. Externe Benachrichtigungen bleiben bis zu separater Aktivierungsfreigabe deaktiviert. Die Traceability-Matrix weist nach COVERAGE-R4-001 derzeit 4 partiell gedeckte Quellenblöcke aus. Die folgenden älteren COVERAGE-R1-Einträge protokollieren ihren damaligen Prüfstand; neuere Beschlüsse stehen in COVERAGE-R2-002.

**COVERAGE-R1-048:** Acht benannte Klauseln sind im Plan konkret gedeckt; zehn Strukturklauseln bleiben bis zur projektweiten Story-/Epic-Prüfung teilweise gedeckt. Die Bild-, Prioritäts- und GCS-Holds sind getrennt von Planning Coverage und sperren die jeweils betroffene Veröffentlichung bis zur tatsächlichen Freigabe. B/C blockieren den technischen Final Audit nicht. Originalpläne und Produktstand unverändert; Gesamtmigration offen.

**COVERAGE-R1-045 (SRC-1825–1834):** Zehn Originalblöcke aus `video-production/AGENTS.md` und `video-production/README.md` direkt mit den aktuellen Constraint-Ankern und EPIC-VIDEO verglichen. Die Berichtsfelder und die Entscheidungs-/Kurzberichtregel sind in `AC-COVR1-044-07` einzeln referenziert und mit Blockbericht-Prüfschritt belegt. Die README-Angaben zu Repository und grundsätzlichem Arbeitsbereich bestätigen das vorhandene Gate `COVERAGE-R1-042`; die Ausnahme nur mit Helmuts ausdrücklicher Freigabe für die konkrete Aufgabe bleibt maßgeblich. Zehn eigenständige Klauseln sind planerisch gedeckt; `SRC-1827.b` ist Teil der Ja/Nein-Frage, keine elfte Pflicht. Keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Die bestehende Frage zur Reichweite der Ausnahme für Website, Cockpit und Deployment (`SRC-1799`) bleibt offen; bis dahin keine solche Ausnahme ableiten. Die nächste konkrete Video-Story muss anwendbare AC mit Prüfschritt und Beleg übernehmen. Tatsächliche Berichte, Scope-Prüfung, Implementation Verification, Privacy-/Publikationsfreigaben und Live-Zustand wurden nicht nachgewiesen. Fortschrittsaktualisierung ausgeführt; Strukturprüfung PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 58 Stories). Gesamtmigration offen.

**COVERAGE-R1-044 (SRC-1815–1824):** Zehn Originalblöcke aus `video-production/AGENTS.md` (SHA-256 `444db399aa2b55f640412fb383229e36b22e0fb3b4c8dc06958e918335614eb6`) direkt mit den aktuellen Constraint-Ankern und EPIC-VIDEO verglichen. AC-COVR1-044-01–07 planen Maskengröße plus Unidentifizierbarkeit, manuelle Tracking- und Frameprüfung, vollständige erneute Public-Master-Sichtung, Shot-Ersatzpräferenz, getrennte Clip-/Fassungsstatus sowie Pfad- und Arbeitsblock-Reporting. Elf atomare Klauseln sind planerisch gedeckt. Keine neue konkret entscheidbare Nutzerfrage und keine verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Die konkrete nächste Story muss die einschlägigen AC mit Prüfschritt und Beleg übernehmen; deren Ausführung, Privacy-/Bild-/Publikationsfreigaben und Live-Zustand sind nicht verifiziert. Gesamtmigration offen.

**COVERAGE-R1-043 (SRC-1805–1814):** Zehn Originalregeln aus `video-production/AGENTS.md` (SHA-256 `444db399aa2b55f640412fb383229e36b22e0fb3b4c8dc06958e918335614eb6`) direkt gegen aktuelle Constraint-Anker und EPIC-VIDEO geprüft. AC-COVR1-043-01–06 planen Projekt-/Materialwahl, lesende Bestandsprüfung, getrennte Publikationsschritte, visuelle Endkontrolle und bedingte Adrian-Anonymisierung. Alle zehn fachlichen Klauseln sind planerisch gedeckt; fünf Nummerierungsfragmente enthalten keine eigene Pflicht. Keine konkret entscheidbare Nutzerfrage oder identifizierte Planning-Coverage-Lücke in diesem Teilumfang. Eine künftige konkrete Video-Story muss die anwendbaren AC, Prüfschritte und Belege übernehmen. Implementation Verification, Privacy-/Publikationsfreigaben und Live-Zustand ungeprüft; Gesamtmigration offen.

**COVERAGE-R1-042 (SRC-1658, SRC-1675, SRC-1797–1804):** Marvin-MVP-Verbot und späterer, an reale Nutzung gebundener Entscheidungs-Task sind in ST-BRD-04 ergänzt. Fortgeltende Video-Schutzregeln stehen bei EPIC-VIDEO und im Constraint-Register; künftige konkrete Video-Stories müssen ihre Prüfschritte zuordnen. SRC-1658 und SRC-1799 bleiben wegen echter Nutzerentscheidungen Unresolved. Umsetzung und Live-Zustand ungeprüft; Gesamtmigration offen.

**COVERAGE-R1-035 (SRC-1413–1422):** Zehn unveränderte Originalblöcke und 37 geprüfte Klauseln direkt gegen die aktuellen Story-Zielstellen geprüft. AC-COVR1-035-01–07 ergänzen die belegten Planungsbedingungen für zentrale Komponenten, Galerie/Viewer, Seiteninventar, isolierte Regression sowie Aktivitäts- und Fahrzeugtemplate. Alle 37 Klauseln sind als Planning Coverage gedeckt; in diesem Umfang verbleibt keine identifizierte Planungsdeckungslücke. Eine strukturelle Galerievariante oder neue Gestaltungsregel braucht nach Gesamtauftrag § 11 eine konkrete ausdrückliche Nutzerentscheidung; aus diesem Quellenabgleich folgt keine solche Variante und keine Freigabe. Für jede bislang behauptete Galerieausnahme ist der tatsächliche Genehmigungsbeleg im Umsetzungsnachweis zu prüfen. Implementation Verification, Bildstatus, Freigaben und Live-Verifikation bleiben offen. Der globale Migrationscheck bleibt offen.

| Originalblock | Aktuelle konkrete Zielstelle | Planungsbefund |
| --- | --- | --- |
| SRC-1413 | ST-WEB-01/02/04/05; AC-COVR1-035-01 | Eine Quelle für Markup, Styles und Verhalten; fünf Daten-/Konfigurationsarten |
| SRC-1414 | ST-WEB-01/02/04; AC-COVR1-035-01 | Variantengrund, drei Kopierverbote und Bedingung für generierte Ausgaben |
| SRC-1415 | ST-WEB-02/03/04/05; AC-COVR1-035-02 | Entfernen erst nach erfolgreicher Umstellung; Funktionen und redaktionelle Abläufe getrennt erhalten |
| SRC-1416 | ST-WEB-01/02/04; AC-COVR1-035-03 | Kajak-Galerie und Viewer als gesicherte Referenz, gemeinsame Quelle, sieben Inhaltsfelder, Generator und Variantengate |
| SRC-1417 | ST-WEB-01, ST-PHOTO-01; AC-COVR1-035-04 | Guide-Abgleich, Viewer-Funktionen, Vollbildpfad und Bildschutz aller Varianten |
| SRC-1418 | ST-WEB-01/03, ST-PHOTO-01; AC-COVR1-035-05 | Vollständiger Datensatz je Inhaltsunterseite, belegte Ausnahme und Startseitenschutz |
| SRC-1419 | ST-WEB-03; AC-COVR1-035-06 | Routen-/Formatabnahme, isolierter Einquellen-Test, Testzustandsentfernung und Regression |
| SRC-1420 | ST-WEB-02/04/05; AC-COVR1-035-07 | Grundlayout getrennt von den drei Seitentypen; Folgeabschnitte 7.1–7.3 bleiben bindend |
| SRC-1421 | ST-WEB-02; AC-COVR1-035-07 | Kajak als Ableitungsbasis und Nutzer derselben Aktivitäts-Templatequelle |
| SRC-1422 | ST-WEB-02; AC-COVR1-035-07 | Fahrzeugaufbau, Daten und optionale Abschnitte je Fahrzeug, zentrale Gestaltung |

Offene Entscheidungen in diesem geprüften Umfang: keine aktuell konkret entscheidbare neue Variante oder Ausnahme. Bei tatsächlichem Bedarf an einer strukturellen Galerievariante lautet die noch zu stellende Frage: „Welche konkrete Strukturabweichung soll für welche Seiten und Bildschirmgrößen gegenüber der aktuellen freigegebenen Galerie als Variante gelten?“ Der Vorschlag benötigt zuvor den Vergleich und die Auswirkungen nach Gesamtauftrag § 11. Für eine Inhaltsunterseite ohne nachweisbar genehmigte Galerieausnahme bleibt die Galeriepflicht offen; fehlendes Material oder fehlende Bildfreigabe begründen keine Ausnahme. Diese Punkte sind bedingte Umsetzungs- und Nachweisgates, keine erteilten Entscheidungen.
**COVERAGE-R1-034 (SRC-1403–1412):** Zehn Originalblöcke und 23 Klauseln gegen den aktuellen Gesamtauftrag und die aktuellen Story-/Constraint-Ziele geprüft. AC-COVR1-034-01–07 decken Startseitengrenze samt fortgeltendem Bild-/Originalschutz, Design- und Prüfpflicht, Kajak-Referenz, Seitentypfreiheit, zentrale Werte/Bausteine und das Designkonflikt-Gate als Planung. SRC-1408.b ist ein Beispiel zu SRC-1408.a. In diesem Umfang bleibt keine Planning-Coverage-Lücke und keine aktuell entscheidbare Nutzerfrage. Eine konkrete neue Gestaltung oder ein tatsächlich festgestellter Widerspruch erfordert weiterhin die gezielte Nutzerentscheidung nach Gesamtauftrag § 11; sie wurde hier weder unterstellt noch freigegeben. Implementation Verification, aktuelle Referenz-/Sichtprüfung, Bildfreigabe und Live-Verifikation sind offen. Der globale Migrationscheck bleibt offen.
**COVERAGE-R1-033 (SRC-1393–1402):** Zehn Originalblöcke und 25 Klauseln direkt gegen aktuelle Story-AC und Constraint-Anker geprüft. Die AC-COVR1-033-01–07 decken Quellen-/Skill-Prüfung, getrennte Regel- und Ergebnisnachweise, begrenzte Blocker, vollständiges Routeninventar, freigegebene Vergleichsreferenzen und die Startseitengrenze als Planung. Keine neue Nutzerentscheidung oder verbleibende Planning-Coverage-Lücke in diesem Umfang identifiziert. Tatsächliche Referenzsicherung, Produkt-/Bildprüfung, Freigaben und Live-Zustand bleiben Implementation Verification; der globale Migrationscheck ist offen.
**COVERAGE-R1-031 (SRC-1220–1224, 1377–1381):** Zehn Originalblöcke und 22 Klauselkandidaten direkt gegen aktuelle Story-AC und Constraint-Anker geprüft. Private API und öffentliche Datengrenze, Secret-Negativprüfungen, Cockpit-Scope-Ausschlüsse, Dokumentautorität sowie getrennte Website-, Bild- und Live-Nachweise sind konkret geplant. SRC-1224.a bleibt wegen der Reichweite des künftigen KI-Produkt-/Datenschutz-Gates als Nutzerentscheidung Unresolved. Weitere Planning-Coverage-Lücken in diesem Umfang: keine identifiziert. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand bleiben separat offen; der globale Migrationscheck bleibt offen.
**COVERAGE-R1-030 (SRC-1210–1219):** Originalquelle und aktuelle Story-Zielstellen direkt abgeglichen. Zehn Quellblöcke haben konkrete Planungs-AC und Prüftasks zu Format/Stunden, Audit-Ansicht, historischem Export, geprüftem Erkenntnisablauf, Cockpit-Zugriff, Admin-Rechten, Sync-Idempotenz, Snapshot-Ständen und Datenqualitätsregeln. Reine Nummern-/Datumsfragmente bleiben Kontext. Echte Nutzerentscheidungen in diesem Umfang: keine. Weitere Planning-Coverage-Lücken in diesem Umfang: keine. Historische Live-Angaben vom 22.09.2026 sind nur Quellenstand; heutige Implementation Verification, Freigabe und Live-Wirkung bleiben offen. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-029 (SRC-1200–1209):** Zehn Originalblöcke direkt mit aktuellen Cockpit- und Betriebszielstellen abgeglichen. Die fachlichen Anforderungen zu Planner, Master Context, Insights, sechs Testbereichen, Backup/Restore, Löschung, Monitoring, Contabo-Gates und Reach-/Audit-Daten haben konkrete Planungs-AC und Prüftasks. Die einzige offene Nutzerentscheidung ist Benachrichtigungskanal samt Verantwortung und Aktivierungskriterium (SRC-1205.c); deshalb bleibt dieser Block Unresolved. Der Reach-Stand vom 23.09.2026 ist ein datierter historischer Live-Befund, kein heutiger Implementierungs- oder Audit-V2-Nachweis. Weitere Planning-Coverage-Lücken in diesem Umfang: keine; aktuelle Implementation Verification und ein künftiger Release bleiben separat offen. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-028 (SRC-1190–1199):** Zehn Originalblöcke direkt mit den aktuellen Cockpit-Zielstellen und dem jüngeren Gesamtplan abgeglichen. Alle 16 fachlichen Klauseln besitzen konkrete AC und Prüftasks; neun Nummern-/Datumsfragmente bleiben Kontext. Der 22.09.-Wert von 24 geschätzten GCS-Stunden ist historisch; der jüngere Gesamtplan nennt 8–11 Zielstunden. Technische Restaufgaben und EXPLORE/MOVE-Briefs bleiben dort offen. Keine neue Nutzerentscheidung oder verbleibende Planning-Coverage-Lücke in diesem Umfang. Implementation Verification, Freigabe und Live-Nachweis sind offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-026 (SRC-1170–1179):** Zehn Originalblöcke und 15 Klauselkandidaten direkt mit den aktuellen ST-INS-01-Zielen abgeglichen. Zwölf fachliche Klauseln sind durch AC-COVR1-026-01–04 und vier Prüftasks planerisch gedeckt; drei Parserfragmente bleiben mit ihren vollständigen Quellblöcken verbunden. Keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke in diesem Umfang. Spätere automatische Briefings/KI-Kontexte bleiben statusgebunden und ohne Aktivierungsfreigabe. Implementation Verification, Release-Freigabe und Live-Nachweis sind offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-025 (SRC-1160–SRC-1169):** Die zehn unveränderten Originalblöcke wurden gegen die aktuellen Cockpit-, Board- und Warnungs-AC geprüft. Alle 22 zuvor partiellen atomaren Klauseln sind durch konkrete Planungs-AC und Prüftasks gedeckt; Kontext und datierte Historie bleiben getrennt. Keine verbleibende Planning-Coverage-Lücke in diesem Umfang. Konkrete offene Fachentscheidungen: (1) Welche Review-Regeln, Familien-/Tablet-Zugriffe und Beispiel-Epics/Stories werden für Phase 0 abgenommen? (2) Welcher Ereignisvertrag, welche Dienstidentität und welche Prioritätsregeln für high/critical werden vor automatischer Kartenanlage abgenommen? (3) Wird eine spätere KI-Zusammenfassung überhaupt und mit welchem Umfang ausdrücklich freigegeben? Die schriftliche Phase-0-Abnahme für Board und Warnungskanal sowie eine spätere ausdrückliche KI-Freigabe bleiben offene Gates. Implementation Verification, Release-Freigabe und Live-Nachweis wurden nicht erbracht; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-023 (SRC-1138–SRC-1147):** Zehn unveränderte Originalblöcke (SHA-256 `91c94dcc2581638539a51b2eaf81b476e5b667f22c7ebc03ec7ff9cbd2ef4080`) und 13 atomare Klauseln direkt gegen die aktuellen Cockpit- und Board-Stories geprüft. Alle 13 sind durch konkrete Plan-AC zu Ziel-/Ist-Metriken, Kontextversionierung, Board-Schema und -Historie, Warnungs-Inbox/-Zuordnung, Audit und Tagesmetriken gedeckt. Keine neue Nutzerentscheidung oder verbleibende Planning-Coverage-Lücke in diesem Umfang. Implementation Verification, Phase-0-/Release-Freigabe und Live-Zustand bleiben offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-022 (SRC-1127–1128, 1130–1137):** Zehn Originalblöcke und 18 atomare Klauseln direkt gegen die aktuellen Cockpit-Stories geprüft. 17 Klauseln besitzen konkrete Planungs-AC; nur SRC-1128.a bleibt wegen des widersprüchlichen `yt_`-Präfixumfangs als Nutzerentscheidung offen. Keine weitere identifizierte Planungslücke in diesem Umfang. Implementation Verification, Freigabe und Live-Zustand sind offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-021 (SRC-1114–1120, 1122–1123, 1125):** Zehn Originalblöcke gegen aktuelle Zielstellen geprüft. 16 fachliche Klauseln sind durch konkrete AC planerisch gedeckt; Listenmarker bleiben Kontext, die beiden Tag-90-Fragmente sind zu einer Tabellenzeile zusammengeführt. Keine echte Nutzerentscheidung oder weitere Deckungslücke in diesem Umfang. Implementation Verification und globaler Migrationscheck bleiben offen.

# Coverage-Check zum Scrum-Migrationsentwurf

**COVERAGE-R1-050 (nur die 20 genannten Klauseln aus SRC-0804–0813):** Die
geltende Scrum-Regel wurde direkt gegen das vorhandene projektweite DoD-Gate,
die Prioritätsregeln und den Planwechsel-Nachweis im Entwurf sowie die zehn
Constraint-Anker geprüft. Alle 20 Klauseln sind als Planvorgabe `Covered`;
die frühere partielle Einstufung betraf fehlende Einzelanwendung. Reproduzierbare
Inkrement-Prüfungen, Story-Prioritätsgründe und der vollständige alte
Eintrag-für-Eintrag-Abgleich bleiben technische beziehungsweise Evidenzarbeit.
Keine neue Nutzerentscheidung oder automatisch lösbare semantische Lücke in
diesem Paket. Bestehende A-, B- und C-Holds bleiben getrennt und unbeantwortet;
betroffene Veröffentlichungen sind bis zur Freigabe gesperrt, B und C
blockieren den technischen Final Audit nicht. Der aktive Ausbauplan und der
globale Migrationscheck bleiben unverändert offen.

**COVERAGE-R1-041 (SRC-1477–1653; gezielter Umfang):** Die zehn betroffenen Originalblöcke und 31 Kandidaten wurden gegen die aktuellen konkreten Zielstellen abgeglichen. AC-COVR1-041-01/02 planen je Seite die vollständige Quellkette und den isolierten lokalen Änderungstest. ST-OPS-03/AC-COVR1-041-03 plant die tatsächliche Nachrichtenzustellung für zwei Auslöser als gesperrten Phase-4-Slice. ST-BRD-04, Story-Katalog und TASK-0101 sind für das Marvin-MVP auf Backlog-Anlage und beauftragtes Einplanen nach Offen begrenzt. Sechs atomare Board-Klauseln bleiben wegen echter Nutzerentscheidungen unresolved: SRC-1521.d, SRC-1537.i, SRC-1545.a, SRC-1559.b, SRC-1577.c und SRC-1622.b. Zusätzlich braucht die Aktivierung von ST-OPS-03 die konkrete Entscheidung zu Kanal, Empfängern, Verantwortung, Absicherung und Aktivierungskriterium. Keine Implementation Verification, Phase-0-Abnahme, Release-Freigabe oder Live-Verifikation folgt aus dieser Planungsreparatur; der globale Migrationscheck bleibt offen.


**COVERAGE-R1-037 (SRC-1433, 1435–1443):** Zehn Originalblöcke und 35 Klauselkandidaten direkt gegen die aktuellen Foto-/Web-Stories und Constraint-Anker geprüft. 33 fachliche Klauseln sind durch AC-COVR1-037-01–07 und vier zugeordnete Prüftasks als Planung gedeckt; SRC-1433.b und SRC-1438.f sind Kontext/Verweisklauseln. Keine derzeit konkret entscheidbare neue Nutzerfrage und keine weitere identifizierte Planning-Coverage-Lücke in diesem begrenzten Umfang. Bedingte motivweise Fragen zu unklarem Alter, fehlender Freigabe oder konkret gewünschter Ablenkungsentfernung bleiben bei Auftreten offen. Implementation Verification, tatsächlicher Bestandsaudit, Bild-/Release-Freigaben, Prüfung veröffentlichter Varianten und Live-Zustand sind nicht erbracht. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-020 (SRC-1104–1113):** Zehn Originalblöcke und 20 Kandidaten gegen die aktuellen ST-INS-01/-03/-04-Zielstellen geprüft. Vierzehn fachliche Klauseln sind durch konkrete AC planerisch gedeckt; fünf Listenmarker sind Kontext. SRC-1107.c ist durch die Nutzerentscheidung DEC-OAUTH-001 (Variante A) planerisch geklärt: Remote-Widerruf, soweit unterstützt; bei Nichtunterstützung/Fehler verpflichtende Fehler-/Warnungsprotokollierung ohne Secrets; lokale verschlüsselte Tokendatenlöschung und Sync-Stopp bleiben unbedingt. Implementation Verification bleibt offen. Implementation Verification, Freigabe und Live-Zustand sind offen; der globale Migrationscheck bleibt offen.


**COVERAGE-R1-019 (SRC-1092–1103):** Zehn Originalblöcke und 17 Kandidaten direkt gegen aktuelle Zielstellen geprüft. Fünfzehn fachliche Klauseln sind mit konkreten AC/Constraints im Entwurf gedeckt; SRC-1103.a ist nur Listenmarker. SRC-1094.a bleibt wegen des Widerspruchs zwischen älterem Cockpit-Google-Anmeldeverbot und späterem allowlist-gebundenem Google-Login als Nutzerentscheidung offen. Die Rechte-Matrix bleibt ein bedingter Vorschlag; `analytics_viewer` ist nicht als bestehende Rolle oder freigegeben behauptet. Keine weitere identifizierte Planungslücke in diesem Umfang. Implementation Verification, Freigabe und Live-Zustand bleiben ungeprüft; der globale Migrationscheck ist offen.

**COVERAGE-R1-018 (SRC-1081–1091):** Zehn Originalblöcke und 17 Kandidaten direkt gegen aktuelle Zielstellen geprüft. 14 fachliche Klauseln sind im Plan gedeckt; Node-`fetch` ist eine Option. SRC-1084.a bleibt wegen der heutigen Verbindlichkeit von GitHub Pages als Nutzerentscheidung offen. Keine weitere identifizierte Planungslücke in diesem Umfang. Implementation Verification, Freigabe und Live-Zustand bleiben ungeprüft; der globale Migrationscheck ist offen.


**COVERAGE-R1-016 (SRC-1058–SRC-1068, zehn Originalblöcke):** 14 fachliche Klauseln wurden direkt gegen die Originalquelle und die aktuellen ST-INS-01-/ST-AUTH-01-AC geprüft. Konto-Zuständigkeit, API-/Scope-Trennung, zeitliches Allowlist-Gate, Auth-Daten/Routen/Sitzung/UI/Audit/Tests und additive PostgreSQL-Schemas besitzen konkrete Plan-AC. Keine neue Nutzerentscheidung oder weitere Planning-Coverage-Lücke in diesem Quellumfang; die ältere offene Frage SRC-1053.b bleibt außerhalb des Pakets bestehen. Historische Live-/Testangaben belegen keine heutige Implementation Verification, Freigabe oder Live-Wirkung. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-015 (SRC-0974–SRC-1057, zehn Originalblöcke im Input):** Die Originalstellen in `docs/seo.md` und `docs/vanventure-cockpit-mvp.md` wurden gegen aktuelle ST-SEO-02–07-/ST-INS-01-AC und Constraint-Anker geprüft. 14 fachliche Klauseln sind planerisch gedeckt, sechs Nummern-/historische Kontextklauseln bleiben Kontext. SRC-1053.b bleibt als einzelne Nutzerentscheidung zur Reichweite des Verbots für Git, Chat und öffentliche Website ungelöst. Keine weitere Planning-Coverage-Lücke in diesem begrenzten Umfang; Implementation Verification und Live-Zustand ungeprüft. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-014 (SRC-0956–SRC-0969, zehn Originalblöcke im Input):** Originalquellen direkt gegen aktuelle Story-AC und Constraints geprüft. Vier Kennzeichenorte, Viewer-Scope samt späteren Fotos sowie einzelne SEO-Routen-/Datenkriterien sind konkret im Entwurf und Story-Katalog verankert. Historische Bearbeitungs-, Server-, Bild- und SEO-Befunde sind keine aktuelle Implementation Verification oder Freigabe. Im begrenzten Umfang keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke identifiziert; globale Migration weiter offen.

**COVERAGE-R1-013 (SRC-0943–SRC-0955, zehn Originalblöcke im Input):** Aktuelle ST-CON-04-/ST-WEB-01-/ST-WEB-03-/ST-PHOTO-01-AC und Constraint-Anker wurden direkt mit dem Riverstar-Original verglichen. Interne aktuelle Herstellerrecherche, historische EXIF-/Bildbefunde und öffentliche Text-/Viewergrenzen sind getrennt. Nur SRC-0948 (Ort und widersprüchliche Abnahmeschwelle) und SRC-0950/SRC-0940 (konkrete Schwimmwestenkritik) bleiben echte Nutzerentscheidungen; keine weitere Planning-Coverage-Lücke in diesem Quellumfang identifiziert. Implementation Verification, heutige Bild-/Release-Freigabe und Live-Zustand separat offen. Dies ist kein global bestandener Migrationscheck.

**COVERAGE-R1-010 (SRC-0910–SRC-0921, nur zehn Originalblöcke im Input):**
Die 20 atomaren Klauseln wurden gegen die unveränderten Originalquellen und
aktuelle Story-AC geprüft und planerisch gedeckt. Abschlussbericht, Pflegeorte,
Seitentyp-Erstellung, Referenzvergleich und Release-Abbruch sind konkret in
ST-WEB-01–04 verankert. SRC-0919 bleibt Quellenstatus; SRC-0921 ist ein
datiertes Kajak-Bildzeugnis, keine heutige Bild- oder Live-Freigabe. Keine
Nutzerentscheidung oder Planning-Coverage-Lücke in diesem begrenzten Umfang.
Implementation Verification und tatsächliche Freigaben bleiben getrennt offen.

**COVERAGE-R1-008 (SRC-0888–SRC-0898, zehn Originalblöcke):** Die Originalquelle wurde direkt mit den aktuellen Story-AC und Constraint-Ankern verglichen. Alle zwölf zuvor partiellen atomaren Klauseln sind durch konkrete Prüf-AC in ST-WEB-03 planerisch gedeckt. Die Testmatrix umfasst die aktuellen migrierten Unterseiten, die geschützte Startseite, Interaktionen, Ansichts-/Inhaltszustände, Fehlerklassen, reproduzierbare Testnachweise und drei getrennte zentrale Änderungsproben. Keine echte Nutzerentscheidung und keine Planning-Coverage-Lücke im begrenzten Quellumfang. Umsetzung, tatsächliche Prüfungen, Freigaben und Live-Zustand bleiben separat offen.

Status: **nicht abgeschlossen**. Die Matrix enthält Quellenblöcke, keine bestätigte atomare Zerlegung jeder mehrteiligen Aussage.

**COVERAGE-R1-007 (SRC-0876–SRC-0886, nur die zehn Originalblöcke im Input):** Die Originalquelle und heutigen konkreten Story-AC/Constraint-Anker wurden erneut verglichen. 18 zuvor partielle Klauseln sind durch ST-WEB-02–05 planerisch gedeckt; fünf nummerierte Reihenfolgemarker bleiben Kontext. Bestandsmigration, Voranalyse und Referenzsicherung, Kajak-zuerst-Abhängigkeit, Erhaltungscheck, bedingte Architektur-Offenlegung und Abschlussprüfung einschließlich Startseite und Layoutübergängen sind als AC benannt. Keine offene Nutzerentscheidung oder Planning-Coverage-Lücke in diesem Quellumfang. Tatsächliche Implementierung, Freigaben, Release und Live-Stand wurden nicht verifiziert.

**COVERAGE-R1-006 (SRC-0865–SRC-0875, nur die zehn Originalblöcke im Input):** Die Originalquelle wurde direkt mit den aktuellen AC und Registerankern abgeglichen. Alle 18 zuvor partiellen atomaren Klauseln sind durch ST-WEB-01–05 und die zuständigen Constraints planerisch gedeckt. SRC-0871 war bereits gedeckt und gehört nicht zum Paketinput. Es bleibt in diesem Quellumfang keine Planning-Coverage-Lücke und keine neue Nutzerentscheidung. Implementation Verification, Sichtprüfung, Design-/Bildfreigaben, Release und Live-Zustand sind separat offen.

**COVERAGE-R1-005 (SRC-0854–SRC-0863, begrenzter Quellumfang):** Zehn unveränderte Originalblöcke und 36 atomare Zeilen (einschließlich drei zusammengeführter Nachfolger) wurden gegen die aktuellen Story-AC und Registerstellen geprüft. 26 zuvor partielle Zeilen sind nun planerisch gedeckt; vier waren bereits gedeckt, sechs bleiben als Fragmente `Merged`. Fahrzeugkonfiguration, Reiseberichtstruktur, optionale Abschnitte, öffentliche Navigation/Routerfälle, Scott-Vergleich und zentrale Mobilregeln haben konkrete AC in ST-WEB-01–05. Im geprüften Quellumfang bleibt keine Planning-Coverage-Lücke und keine neue fachliche Nutzerentscheidung. Umsetzung, Sichtprüfung, Bild-/Designfreigabe, Release und Live-Zustand sind davon getrennt offen; der aktive Ausbauplan bleibt maßgeblich.

**COVERAGE-R1-004 (SRC-0810–SRC-0853, begrenzter Quellumfang):** Die
aktuellen Originale und Zielstellen wurden für zehn Quellblöcke und 35
Klauselkandidaten verglichen. SRC-0849–0853 besitzen nun konkrete Galerie-,
Template-, Grundlayout- und CSP-AC in ST-WEB-01–05; ihre 18 Kandidaten sind
planerisch gedeckt. Für SRC-0810–0815 steht der Planwechselmaßstab im
Entwurf, doch individuelle Story-Prioritätsgründe und der vollständige
Eintrag-für-Eintrag-Abgleich fehlen weiterhin. Keine neue Nutzerentscheidung
ergibt sich aus diesen zehn Quellen. Implementation Verification, Bild-,
Design- und Release-Freigaben sowie Live-Nachweise sind gesondert offen.

**COVERAGE-R2-001 (SRC-0800–SRC-0809, nach Wiederherstellung der kollisionsfrei gesicherten Belege):** Die zehn
Originalblöcke und 23 atomaren Klauseln wurden mit den heutigen Entwurfs-
und Registerstellen verglichen. Der Plan beschreibt jetzt die konkreten
Story- und Inkrement-Nachweisfelder; 15 eigenständige Klauseln bleiben bis
zum Einzelabgleich des Bestands partiell gedeckt. `SRC-0807.c` bleibt
planerisch gedeckt. Es gibt in diesem Quellumfang keine neue Nutzerfrage.
Implementation Verification und Freigaben sind getrennt offen; Einzelheiten
stehen in `atomic-coverage-report.md` und `execution-state.md`.

**COVERAGE-R1-003 (SRC-0788–SRC-0799, aktueller Nachtrag):** Der Entwurf hat
konkretere Story-/Slice-Prüfkriterien, ein echtes Demonstrations-AC für das
optionale ST-AN-01-Skeleton und einen begrenzten Enabler-Nachweis für
ST-WEB-03. Für ST-CON-01 sind fünf Teilnutzen benannt, aber noch nicht als
einzeln rückverfolgbare Value Stories migriert. Der projektweite story- und
epicweise INVEST-/Slice-/Enabler-Check fehlt. Daher ändern diese
Planpräzisierungen keine pauschale Coverage-Zahl und belegen weder Umsetzung
noch Freigabe oder Live-Stand. Aus den zehn Planregel-Quellen ergibt sich
keine neue Nutzerfrage; die offenen Punkte sind konkrete Planungs- und
Prüfaufgaben.
Bis zur manuellen Klauselprüfung darf die Zahl Covered nicht als Nachweis für 0 verlorene Anforderungen gelesen werden.

`Covered` bedeutet eine explizite Story-Zuordnung. `Rule / Constraint` bewahrt die vollständige bindende Quellformulierung und ordnet sie, soweit passend, thematisch einer Story zu; dies ist keine neue Implementierung.
`Duplicate` bezeichnet einen begründet überholten oder bereits anderweitig erfassten Status, dessen Original bestehen bleibt.
Die Zahlen zählen prüfbare Quellblöcke, nicht schon atomisierte Einzelanforderungen.

| Kategorie (historischer Ausgangsstand vor den gezielten Coverage-Reparaturen) | Anzahl |
| --- | ---: |
| Ursprüngliche relevante Quellenblöcke | 1106 |
| Covered | 469 |
| Partially Covered | 381 |
| Duplicate | 2 |
| Rule / Constraint | 152 |
| Unresolved | 32 |
| Context | 43 |
| Merged | 3 |
| Not Applicable | 4 |

Die Matrix zählt aktuell 10 partiell gedeckte Quellenblöcke. Die atomare
Einzelprüfung zählt Klauselkandidaten separat; siehe
`atomic-coverage-report.md` für Reviewfortschritt und offene Klauseldeckungen.
COVERAGE-R1-051 prüfte ausschließlich acht Restkandidaten: sieben sind durch
konkrete neue oder vorhandene AC planerisch gedeckt, die historische
v18-Privacy-Zuordnung ist fassungsbegrenzt, und SRC-1537.i bleibt wegen
Archivbezug und vorangehender Zuordnung unresolved. Der automatische
SRC-1545.a-Zuordnungskonflikt ist geklärt. Der globale Migrationscheck,
fachliche Holds, Eintrags- und Umsetzungsbelege bleiben offen; betroffene
Veröffentlichungen sind bis zur Freigabe gesperrt. B und C blockieren den
technischen Final Audit nicht.
COVERAGE-R1-049 ordnet 15 Klauseln aus SRC-0794–0803 nach direktem
Quell-/Entwurfsabgleich als planerisch gedeckt ein. Der Story-/Inkrement-
Einzelcheck bleibt technische Planungs- und Evidenzarbeit; daraus folgt
keine Ready-, Done-, Publikations- oder Live-Freigabe.

## Aktueller Recovery-Stand — 25. September 2026

Alle 2.908 ursprünglichen Kandidaten sind geprüft und zentral integriert; es gibt
0 geprüfte, noch nicht integrierte und 0 verbleibende Kandidaten. PKG-001–044
umfassen 2.357 Kandidaten, PKG-045–049 weitere 287 und PKG-050–054 weitere 264.
Nach den gezielten Coverage-Reparaturen sind aktuell 60 deduplizierte offene
Review-Fragegruppen klassifiziert: 27 `USER_DECISION`, 1 `AUTO_RESOLVABLE`,
27 `TECHNICAL`, 5 `INSUFFICIENT_EVIDENCE`, 0 eigenständige `DUPLICATE`-Gruppen.
Die offenen Coverage-Lücken betragen aktuell 117 über Kandidaten und Nachfolger; sie sind
keine Nutzerfragen. PKG-040
bleibt `NEEDS_DECISION`; PKG-045 ist integriert, PKG-046–048 benötigen
Entscheidungen, PKG-049 ist integriert, PKG-050–051 benötigen Entscheidungen,
PKG-052 ist integriert, PKG-053–054 sind integriert mit offener Evidenzprüfung
zur v18-Endkontrolle. Die ersten drei Batches deckten 33 weitere Klauseln aus 30 Quellblöcken
planerisch ab; der vierte prüfte zehn weitere Blöcke und ließ 15 Klauseln
partiell offen; der unabhängige Final Audit bleibt `NOT_STARTED`.
Details: `reviews/recovery-report.md`.

## Historische Einzelnotizen bis PKG-029

## Batch-Integrationen PKG-030 bis PKG-054

Fünf Integrationsbatches haben fünfundzwanzig bereits fachlich geprüfte Pakete und
1.456 ursprüngliche Kandidaten übernommen: PKG-030–PKG-034 mit 305 Kandidaten,
PKG-035–PKG-039 mit 282, PKG-040–PKG-044 mit 318, PKG-045–PKG-049 mit 287 und
PKG-050–PKG-054 mit 264. Kandidaten-IDs, Originalblock-Wiedergabe, Story-Ziele
und Registerziele wurden strukturell abgeglichen. Ein ungültiger Plananker wurde
anhand der bereits geprüften PlanningMapping-Story-IDs und verbindlicher
Zielanker korrigiert; ein fehlerhafter Boolean-Status wurde aus Batchbericht und
zentraler Integration rekonstruiert. Zehn zusammengeführte Nachfolger wurden auf
numerische Nachfolger-IDs normalisiert. Reviewberichte bleiben maßgeblich für
semantische Befunde; dies behauptet keine Implementierungs- oder Live-Abnahme.

## Historische Einzelnotizen bis PKG-029


Zum Stand PKG-029 enthielt die Matrix partiell gedeckte Quellenblöcke; diese historische Zahl wird hier nicht fortgeschrieben. PKG-027 ergänzt SRC-0788 und SRC-0791: Projektweiter INVEST-/Vertical-Slice-Check und die Größe von ST-CON-01 bleiben offen. PKG-024 ergänzte SRC-0631 und SRC-0635. COVERAGE-R1-002 ordnet die Profile und ihre Lesestruktur jetzt konkreten Story-AC zu; die frühere Story-Eigentumsfrage ist technisch geklärt. `SRC-0484` aus PKG-016 bleibt offen. COVERAGE-R1-001 hat `SRC-0491` mit Board-Prüfslices, `SRC-0508/0509` mit Seitentyp-Slices und `SRC-0514` mit ST-WEB-06 als Planung gedeckt; ihre Umsetzung und Abnahme bleiben ausständig. `SRC-0504` bleibt wegen fehlender Nutzerabnahme der Galerievorschau offen. PKG-021 ergänzt `SRC-0530` und `SRC-0532`: die damaligen Planregister- und Fahrzeug-Detailgenerator-Blocker sind im Release-AC sichtbar, aber ohne dedizierten Reparaturtask oder belegten neueren vollständigen Bestehenslauf. Frühere Scott-Entwürfe `SRC-0531/0532` sind nur hinsichtlich ihres ersetzten Layoutstands historisch; sie sind nicht als ganze Blöcke Dubletten. Die atomare Einzelprüfung und weitere offene Befunde stehen in `atomic-coverage-report.md`; diese Quellblocktabelle ist kein bestandener Migrationscheck.


## PKG-020 – geprüfte Planaufnahme

SRC-0520–SRC-0529 umfassen zehn Originalblöcke und 67 ursprüngliche Kandidaten. SRC-0522 wurde wortgetreu in zehn Segmente zerlegt; die übrigen Satzfragmente wurden zusammenhängend interpretiert. Wiederkehrendes Release-Gate, motivbezogene Bildentscheidungen, gesperrte Fassungen, historischer 65/65-Seitenlauf und Scotts Seitentyp-Abnahme sind ihren aktuellen AC zugeordnet. Zwei Quellenblöcke bleiben Unresolved wegen Nr. 63/69; zwei Kandidaten aus SRC-0528/0529 sind Partially Covered, bis sichtbare Versionen/Hashes und Scotts Restabschnitte konkret aufgelistet sind. Keine Produkt-, Bild- oder Live-Verifikation erfolgte in diesem Migrationspaket; der alte Ausbauplan bleibt aktiv.

## PKG-023 – geprüfte Planaufnahme

SRC-0563 sowie SRC-0593–SRC-0621 umfassen 30 Originalblöcke und 64 einzeln geprüfte ursprüngliche Klauseln. Sechs Nachfolger trennen gemischte Datums-, Freigabe- und Geltungsaussagen. Die Restore-Kriterien stehen bei ST-OPS-01, der wiederverwendbare Creator-Standard bei den betroffenen Content-Stories und die Design-Governance samt Farbrollen bei allen einschlägigen öffentlichen Web-Stories. Für dieses Paket ist keine neue fachliche Nutzerentscheidung offen. Planung, historische Quellenstatus und aktuelle Implementierungs-/Live-Verifikation bleiben getrennt. Der Gesamtcheck bleibt wegen anderer offener Deckungslücken und der ausstehenden restlichen Migration offen.

## PKG-024 – geprüfte Planaufnahme

SRC-0622–SRC-0639: 18 Originalblöcke und 65 ursprüngliche Kandidaten einzeln gegen Design Guide, aktuelle Story-AC und Register geprüft. Vier künstliche Datumsfragmente sind mit ihren Anschlusskandidaten verbunden; zwölf zusammengesetzte Kandidaten wurden in 30 einzeln prüfbare Nachfolger geteilt. Typografie, Icon, Kopfzeile, Navigation, Hero und Radprofilkriterien stehen nun als scoped AC bei ST-WEB-01/02/04/05. SRC-0637 ist datierter lokaler und damaliger Live-Status, keine aktuelle Designregel oder Live-Verifikation. SRC-0631 und SRC-0635 bleiben für vollständige Ausrüstungsprofile außerhalb der konkret zugeordneten Rad-/Kajakseiten teilweise gedeckt. Der Design Guide wurde inhaltlich nicht geändert; weder Produktcode noch aktuelle Live-Ansichten wurden geprüft. Die Migration bleibt insgesamt offen.

## Unresolved – einzeln zu klären

- `SRC-0522` und `SRC-0528` (PKG-020): Wie sind Alter, nötige Anonymisierung und ausdrückliche Veröffentlichungsentscheidung jeweils für Nr. 63 und Nr. 69? Die allgemeine Sichtfreigabe umfasst sie nicht.


- `SRC-0562` (PKG-022): Die geplante Übernahme der Cockpit-Kennzeichen in die Familienboard-Inbox ist als eigener abnehmbarer Scope von ST-BRD-03 erfasst. Offen bleibt die gemeinsam festzulegende Prioritätsregel: Welche Kennzeichen werden Backlog, welche Fast Track? Bis zur Entscheidung und Umsetzung bleibt die Übernahme aus und `monitor:cockpit` verschickt keine Nachrichten. Planung, Implementierung und Live-Nachweis sind getrennt.

## Reverse Traceability

57 von 57 Stories haben mindestens eine explizite ursprüngliche Quell-ID; 1 notwendige Enabler mit Originalbezug, 0 Enabler ohne Herkunft.

Die Herkunft der Goals und Epics steht in `reverse-hierarchy.md`.
Eine Anker-ID allein belegt keine vollständige fachliche Deckung oder Statusprüfung.
Die Story-Liste steht in `reverse-traceability.csv`.

## PKG-025 – geprüfte Planaufnahme

SRC-0640–0662: 23 Originalblöcke und 65 ursprüngliche Kandidaten individuell geprüft. Hero-, Startseiten-, Galerie-, Bildherkunfts- und Privatnavigationskriterien sind den zuständigen Stories zugeordnet; 44 atomare Nachfolger wurden für Sammelkandidaten angelegt. SRC-0658 bleibt wegen der nicht belegten heutigen Freigabe der drei Kinderbilder **Unresolved**. SRC-0662 ist wegen der abweichenden Bezeichnung „Profil“/„Konto & Einstellungen“ **Partially Covered**. Datierte 14er-Galerie-, S24-, Ausrüstungs- und Fahrzeugbelege sind kein heutiger Implementierungs- oder Live-Nachweis. Originalpläne bleiben maßgeblich; der Scrum-Entwurf ist nicht freigegeben. Details und Zählung stehen in `atomic-coverage-report.md`.

## PKG-027 – geprüfte Planaufnahme

SRC-0763–SRC-0791: 29 Originalblöcke und 61 ursprüngliche Kandidaten einzeln geprüft; 16 atomare Nachfolger trennen Fakten, Verbote, Bildschutz und Review-Metriken. Die GCS-Dreh-, Aussage-, Short- und Reviewbedingungen sind als Plan-AC ergänzt. SRC-0780 bleibt Unresolved: Bezieht sich „nach der Veröffentlichung“ auf Longform oder das gesamte Paket mit beiden Shorts? Bis zur Entscheidung ist die Website-Reihenfolge nicht freigegeben. SRC-0788 und SRC-0791 bleiben Partially Covered, weil der projektweite INVEST-/Slice-Check und die Story-Größe von ST-CON-01 nicht abgenommen sind. Die Originalquelle, der aktive Ausbauplan sowie Produktions-, Bild-, Release- und Live-Status wurden nicht verändert oder verifiziert.

## PKG-028 – Planungsregeln und Quellenkontext

SRC-0792–SRC-0818: 27 Originalblöcke und 65 ursprüngliche Kandidaten erneut geprüft. 23 Regelblöcke bleiben Partially Covered, weil projektweite beziehungsweise storyweise INVEST-, Slice-, Enabler-, DoD-, Prioritäts- und Migrationsprüfungen noch nicht vollständig belegt sind. SRC-0814 erläutert das Schema von SRC-0813; SRC-0816 ist als fortgeltende Migrationsgrenze zugeordnet. SRC-0817/0818 sind Quellenmetadaten und historischer Übergabestatus, keine ST-WEB-02-AC und keine Implementierungsprüfung. Die frühere Blocked-Angabe bei SRC-0804 wurde auf die konkrete Nachweislücke zurückgeführt; sie ist kein Status der dauerhaften Regel. Keine neue fachliche Entscheidung ist für dieses Paket erforderlich. Der Gesamtplanwechsel bleibt gesperrt; Produkt und Live-Stand wurden nicht verifiziert.

Damals nach PKG-028: partiell gedeckte Quellenblöcke (historischer Zwischenstand); der Gesamt-Coverage-Check blieb offen.

**COVERAGE-R1-011:** SRC-0922–SRC-0932 ohne SRC-0930: 10 Originalblöcke und 45 geprüfte Kandidaten am aktuellen Original und an den Zielstellen abgeglichen. Zwei fachliche Nutzerentscheidungen bleiben in SRC-0922.d (EN-Zielort) und SRC-0925.b (Alter und heutige Motivauswahl von DSC_1547.jpg) offen. Die übrigen fachlichen Klauseln sind im Entwurf oder als datierter Quellenstatus konkret verankert; Nummernmarker und reine Vergangenheitsangaben erzeugen keine neuen Produktkriterien. Umsetzung, Bildprüfung, Freigaben und Live-Zustand wurden nicht geprüft. Der globale Coverage-Check bleibt offen.

**COVERAGE-R1-012:** SRC-0933–SRC-0942: 10 Originalblöcke und 29 Klauselkandidaten direkt gegen Original und aktuelle ST-CON-04-/Registerstellen abgeglichen. Die zwei externen Berichte sind mit ihrer Quellen- und Prüfgrenze interne Recherche; Kaufzeit, Ausstattung, persönliche Nutzungsurteile, Mitfahrt und Modelltrennung haben konkrete Text-AC. Der 2026-Tabellenersatz bleibt historischer Entwurfsbefund. SRC-0940 bleibt als echte Nutzerentscheidung offen: Ursache und öffentliche Übernahme der Schwimmwestenkritik. Keine weitere identifizierte Planning-Coverage-Lücke in diesem begrenzten Umfang. Implementierung, redaktionelle/Bild-/Release-Freigaben und Live-Zustand sind ungeprüft; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-009:** SRC-0899–SRC-0909 (SRC-0906 außerhalb des
Reparaturumfangs): 10 Originalblöcke und 24 atomare Kandidaten am aktuellen
Entwurf abgeglichen. 22 bislang teilgedeckte Klauseln sind mit konkreten
Story-AC beziehungsweise projektweiten Gates planerisch gedeckt; zwei waren
bereits gedeckt. Keine offene Nutzerfrage oder Planning-Coverage-Lücke in
diesem Umfang. Produktumsetzung, erforderliche Freigaben und Live-Zustand
sind separat ungeprüft. Der Gesamt-Coverage-Check bleibt offen.

**COVERAGE-R1-017 (SRC-1069–SRC-1080, zehn relevante Originalblöcke, 21 Kandidaten):** Originalquellen und aktuelle Zielstellen direkt abgeglichen. 15 fachliche Klauseln haben konkrete AC/Constraints; sechs Audit-Fragmente bleiben datierter Kontext. Keine neue Nutzerfrage oder identifizierte Planungslücke in diesem Umfang. Historische Phasen und Auditwerte sind keine aktuelle Live- oder Release-Abnahme. Implementation Verification bleibt offen; der globale Migrationscheck bleibt offen.
**COVERAGE-R1-027 (SRC-1180–1189):** Zehn unveränderte Originalblöcke mit 26 Review-Kandidaten gegen die aktuellen Stories ST-INS-01, ST-AUTH-01, ST-WEB-07 und ST-OPS-01/02 abgeglichen. 20 fachliche Klauseln haben konkrete Planungs-AC und Prüftasks; zwei Klauseln (`SRC-1181.a`, `SRC-1187.b`) bleiben wegen noch nicht getroffener Nutzerentscheidungen unresolved. Drei Listennummern und die Rechtsberatungs-Geltungsgrenze sind keine eigenständigen Produktfunktionen. Verbleibende Planning-Coverage-Lücken in diesem Umfang: die zwei Entscheidungsblöcke; keine weitere technische AC-Lücke. Implementation Verification, Rechts-/Redaktionsfreigaben, Google-Produktionsumstellung, Release und Live-Nachweis sind offen; der globale Migrationscheck bleibt offen.

| Original | Aktuelle konkrete Zielstelle / Prüfnachweis | Planungsbefund |
| --- | --- | --- |
| SRC-1180 | ST-INS-01 / AC-COVR1-027-01 / TASK-COVR1-027-01 | Zweckbindung und zwei Abrufverbote gedeckt |
| SRC-1181 | ST-INS-01 / AC-COVR1-027-02; ST-WEB-07 und ST-OPS-02 / TASK-COVR1-027-02, -07, -08 | Konzept/Text gedeckt; zwei Fristentscheidungen offen |
| SRC-1182 | ST-INS-01 / AC-COVR1-027-03; ST-OPS-01 / TASK-COVR1-027-09 | Logklassen und Backup-Schutz gedeckt |
| SRC-1183 | ST-INS-01 / AC-COVR1-027-03/04; ST-AUTH-01 / TASK-COVR1-027-11 | HTTPS, Proxy/Cache und beide Limits gedeckt |
| SRC-1184 | ST-WEB-07 und ST-OPS-02 / TASK-COVR1-027-08 | zwei veröffentlichte URLs und Freigabe-Reihenfolge gedeckt |
| SRC-1185 | ST-WEB-07 und ST-OPS-02 / TASK-COVR1-027-07/08 | Mindestinhalt und Rechtsprüfung gedeckt; Rechtsberatungsgrenze erhalten |
| SRC-1186 | ST-OPS-02 / TASK-COVR1-027-10 | Google-Metadaten, bedingte Verifizierung und Testmodus gedeckt |
| SRC-1187 | ST-INS-01 / AC-COVR1-027-05 / TASK-COVR1-027-05 | sechs fachliche Einzelentscheidungen zu Phase 0 offen |
| SRC-1188 | ST-INS-01 / AC-COVR1-027-04; ST-OPS-02 / TASK-COVR1-027-04/10 | Konfiguration und Google-Anforderungen gedeckt |
| SRC-1189 | ST-INS-01 / AC-COVR1-027-05; ST-OPS-01 / TASK-COVR1-027-06 | zwei Betriebsfestlegungen als getrennte Nachweise gedeckt |

**Abnahme dieses Reparaturschritts:** Geprüfter Quellstand `docs/vanventure-cockpit-plan.md`, SHA-256 `91c94dcc2581638539a51b2eaf81b476e5b667f22c7ebc03ec7ff9cbd2ef4080`; Originaltexte und 26 Kandidaten aus COVERAGE-R1-027-input.json gegen die aktuellen Zielstellen abgeglichen. Ergebnis ist ausschließlich lokale Planungsreparatur. Reproduzierbare Strukturprüfung: `python tools/verify-scrum-review-progress.py`; Fortschritt: `python tools/update-scrum-review-progress.py`. Die beiden unresolved Blöcke bleiben im Coverage-Status und in der Decision Queue offen. Produkt, Veröffentlichung, rechtliche Prüfung, Google-Konfiguration und Live-Stand wurden nicht geprüft oder freigegeben.

**COVERAGE-R1-036 (SRC-1423–1432):** Die zehn Originalblöcke und 25 Klauseln wurden direkt gegen die aktuellen ST-WEB-01–05-AC und Constraint-Anker geprüft. AC-COVR1-036-01–06 decken die belegten Planungsbedingungen für Berichtsstruktur, Generatorreihenfolge, Seitentypen, Inhaltstrennung, Bestandserhalt und responsive Abnahme. SRC-1430.b ist eine Abgrenzung des Komponentenvergleichs und bleibt Kontext. Keine derzeit konkret entscheidbare Nutzerfrage und keine weitere identifizierte Planning-Coverage-Lücke in diesem Quellumfang. Eine neue responsive Grenze erfordert bei tatsächlichem Bedarf eine konkrete Nutzerentscheidung; dieser Abgleich führt keine ein. Implementation Verification, Bild-/Design-/Release-Freigaben und Live-Zustand bleiben offen. Der globale Migrationscheck bleibt offen.
**COVERAGE-R1-039 (SRC-1454–1458, 1461–1465):** Zehn Originalblöcke und 23 Kandidaten (22 fachliche Klauseln, eine grammatische Fortsetzung) direkt mit den aktuellen Story-AC und Constraint-Ankern verglichen. AC-COVR1-039-01–06 und drei Prüftasks decken private Bildbelege, den Geltungsbereich bestehender Freigaben, den konkreten Designvorschlag, den Entscheidungs-Zwischenzustand sowie Nachweis- und Referenzschutz als Planung. Aktuell liegt kein konkreter neuer Designvorschlag vor; daher keine jetzt entscheidbare Nutzerfrage und keine verbleibende Planning-Coverage-Lücke in diesem begrenzten Umfang. Bei künftig unklarem Vorschlag bleibt die konkrete Frage Seite / dokumentierte Variante / globale Regel offen, bis der Vorschlag vorliegt. Implementation Verification und jede tatsächliche Design-, Bild- oder Release-Freigabe sowie Live-Verifikation sind nicht belegt. Der globale Migrationscheck bleibt offen; `docs/ausbauplan.md` bleibt aktiv.

**COVERAGE-R1-038 (SRC-1444–1453):** Zehn Originalblöcke und 30 Klauseln direkt gegen die aktuellen ST-PHOTO-01-AC und Constraint-Anker geprüft. AC-COVR1-038-01–06 und vier Prüftasks decken Projektkopie und getrennten Ausgabeort, technische Schreibgrenze, sicheren Schutztest, geschütztes Vorher-Manifest, unabhängigen Nachvergleich und Vorfallverfahren als Planung. Keine neue konkret entscheidbare Nutzerfrage und keine verbleibende Planning-Coverage-Lücke in diesem Quellumfang. Eine Wiederherstellung nach tatsächlichem Vorfall benötigt dann eine ausdrückliche, auf den konkreten Vorfall bezogene Freigabe; diese Planung erteilt sie nicht. Technische Umsetzung, tatsächlicher Originalschutz, Bild- und Release-Freigaben sowie Live-Verifikation sind offen. Der globale Migrationscheck bleibt offen; `docs/ausbauplan.md` bleibt aktiv.

**COVERAGE-R1-040 (SRC-1466, 1468–1476):** Zehn Originalblöcke und 17 fachliche Klauseln direkt gegen die aktuellen Zielstellen geprüft. AC-COVR1-040-01–05 und drei Prüftasks planen die übergreifende Prüfmatrix mit stabilen Regelkennungen, vollständigen Pflichtfeldern, fünf Ergebniszuständen, echten Belegen und Quellstand-/Build-/gegebenenfalls Live-Release-Bezug. Keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke in diesem begrenzten Umfang. Tatsächliche Matrixeinträge, Implementation Verification, Freigaben und Live-Zustand bleiben ungeprüft; der globale Migrationscheck bleibt offen.

**Datenintegritätsgrenze dieses Schritts:** Beim Schreiben von `traceability-matrix.csv` brach ein Vorgang nach SRC-1465 ab. Die nachfolgenden Zeilen wurden aus `source-inventory.csv` und `atomic-requirements.csv` wiederhergestellt; Quellblock- und Kandidatenzahlen bestehen die Strukturprüfung. Die früheren individuellen Freitext-Notizen und einige Quellblock-Zuordnungen ab SRC-1477 sind aus diesen Daten nicht wortgleich rekonstruierbar und müssen vor einem globalen Migrations-Coverage-Abschluss gesondert mit den Reviews abgeglichen werden. Für SRC-1466 und SRC-1468–1476 wurden die aktuellen Zielstellen in diesem Schritt direkt geprüft.
**COVERAGE-R1-046 (SRC-1835–1844):** Die zehn README-Originalklauseln (SHA-256 `07c39a7649dbbf9c6323c9d36d5c6580bb7c464f0914a4237142500e781e09d3`) direkt mit den aktuellen Constraint-Ankern und dem EPIC-VIDEO abgeglichen. `AC-COVR1-046-01–06` ergänzt konkrete Prüfungen für Original-/Altprojekt-Unverändertheit, begründete Projekt-/Timeline-Wahl, zuerst geprüften Archivbestand und getrennte Eignungs-/Wiederverwendungsentscheidung, Adrians fassungsbezogenen Privacy-Schutz, Release-Gate und knappe Blockberichte. Das Scope-Gate verweist auf `COVERAGE-R1-042`; die Ausnahme-Reichweite zu `SRC-1799` bleibt ausdrücklich offen. Alle zehn Klauseln sind planerisch gedeckt; keine neue Nutzerentscheidung in diesem Paket, keine verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Die nächste konkrete Video-Story muss die anwendbaren AC und Belege übernehmen. Tatsächlicher Originalschutz, Implementation Verification, Privacy- und Publikationsfreigabe sowie Live-Stand wurden nicht geprüft. Fortschritt aktualisiert; Strukturprüfung PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 58 Stories). Gesamtmigration offen.

**COVERAGE-R1-047 (SRC-2042, SRC-2247):** Zwölf atomare historische Klauseln direkt mit analysis.md:308, README.md:333 und aktuellem ST-VID-01 verglichen. AC-COVR1-047-01–03 erhalten Methode und begrenzten Privacy-Befund, v18-exklusives Label samt 666-Frame-Limit, getrennte Original-/Resolve- und Versionsstände sowie Helmuts datierte Publikationsanweisung und damalige Live-Prüfung. Zehn Klauseln planerisch gedeckt; SRC-2042.e und SRC-2247.d bleiben wegen derselben Nutzerfrage Unresolved: Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern als geforderte visuelle Endkontrolle der vollständigen öffentlichen v18-Fassung? Keine weitere Deckungslücke in diesem Teilumfang. Implementation Verification, aktuelle Privacy-/Originalprüfung und heutiger Live-Zustand nicht durchgeführt; keine neue Freigabe. Gesamtmigration offen.


## Recovery-Update R5 — 2026-09-26

- Der Draft enthält nun dieselben 71 Story-IDs wie der Katalog; die zuvor fehlenden 15 Katalog-Stories wurden aus vorhandenen Datensätzen ergänzt.
- Aktueller Epic-Bestand: 11 (die Aufforderung nannte 10); alle vorhandenen Einträge sind geprüft, kein Eintrag wurde still entfernt.
- ST-BRD-01/ST-BRD-05 und ST-CON-01/ST-CON-05–16 wurden gegen vorhandene Stories/Tasks geprüft und die veralteten pauschalen Split-Aussagen korrigiert.
- Die Reviewmatrix dokumentiert alle 71 Story-Befunde in `reviews/PLAN-QUALITY-RECOVERY-2026-09-26.md`. Weitere Story-Reparaturen sind offen; `SRC-0793` bleibt `Partially Covered`.
- Recoverystatus: `RECOVERY_BLOCKED`. Der vorherige `FINAL_AUDIT_FAIL` und dessen Bericht bleiben unverändert; kein Final-Audit-Retry gestartet.


<!-- PLAN-QUALITY-RECOVERY-R6-2026-09-26 -->
Recovery R6 updated 30 of 35 classified story-quality findings and left four technical clarifications plus one existing deduplicated external-notification activation gate. SRC-0793 remains Partially Covered; no audit retry or migration restart occurred.


<!-- COVERAGE-R7-001 -->
`SRC-0793` is `Covered` for Planning Coverage after the documented 71-story/11-epic recheck. Implementation, external notification activation, publication evidence and live state remain separate and are not asserted as complete.


<!-- CURRENT-COVERAGE-R2-2026-09-26 -->
Current source-block count: 1 Partially Covered row (`SRC-0504`) remains with an existing PUBLICATION_DECISION hold and blocks_final_audit=false. Other open atomic rows are publication/version evidence or DEFERRED_POST_PILOT. No audit-blocking coverage candidate remains.
