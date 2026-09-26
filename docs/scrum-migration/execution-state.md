# Current execution status — 2026-09-26

- Migration: complete; 1,136 relevant source blocks and 2,943/2,943 original candidates reviewed.
- Final Audit: `FINAL_AUDIT_PASS` (`reviews/FINAL-AUDIT-RETRY-R5-2026-09-26.md`).
- Canonical Scrum plan: `docs/scrum-plan.md`; promotion and register update completed.
- Coverage: 15 documented findings, 0 reviewable; five evidence holds are publication-only.
- Decisions: 10 publication decisions, 3 deferred post-pilot; no PRE_FINAL_AUDIT decisions.
- Phase 0 remains partially accepted; technical, release, live and publication gates remain separate.

---

﻿## COVERAGE-R2-002 · Entscheidungen erfasst (26.09.2026)

### COVERAGE-R1-052 · gezielte Coordinator-Nachprüfung (26.09.2026)

| CandidateID | Ziel und Planungsbefund | Getrennter Restbefund |
| --- | --- | --- |
| `SRC-0470.a2` | `ST-CON-01#Acceptance-Criteria` · Covered: aktiver Zielaufwand 8–11 Stunden und älterer README-Wert 24 Stunden sind bereits als getrennte Angaben erfasst. | `SRC-0753.a` bleibt `PUBLICATION_DECISION` zur Reichweite und Ablösung der Werte; keine Ist-Stunden oder Produktionsfreigabe. GCS-Veröffentlichung bis zur Freigabe gesperrt. |
| `SRC-0949.a1` | `ST-CON-04#Acceptance-Criteria`, `constraint-register.md#src-0949` · Covered: genaue Ortsklärung für beide Uferfotos vom 13. Juli 2018 konkretisiert. | Ortsbestätigung fehlt; `SRC-0948` bleibt `PUBLICATION_DECISION` zur Schwelle für genauere Beschriftung. Bis dahin nur „Norwegen“, Veröffentlichung des Entwurfs gesperrt. |
| `SRC-2252.f2` | `ST-VID-01#Acceptance-Criteria` / `AC-COVR1-047-02` · Covered: `PRIVACY_APPROVED` ist ausschließlich als historischer v18-Status mit Methodenvorbehalt erfasst. | `SRC-2042`/`SRC-2247` bleiben ein `INSUFFICIENT_EVIDENCE`-Befund zur Gleichwertigkeit der 5-fps-Sichtung. Keine neue Privacy-Freigabe; erneute oder andere Veröffentlichung bis zum Nachweis und zur Freigabe gesperrt. |

Die drei Planungszuordnungen sind geschlossen, ohne eine offene Frage zu beantworten. `PRE_FINAL_AUDIT_DECISION` = 0, `PUBLICATION_DECISION` = 10 und `DEFERRED_POST_PILOT` = 3 bleiben getrennt; B und C blockieren den technischen Final Audit nicht. Global verbleiben 15 atomare Coverage Findings und 6 reviewable Evidenzzeilen (`SRC-0452.g/.h`, `SRC-0464.f`, `SRC-0466.s`, `SRC-2042.e`, `SRC-2247.d`); technische und automatisch lösbare Entscheidungsgruppen: jeweils 0. Der letzte Final Audit steht weiterhin auf `FINAL_AUDIT_FAIL`; dieser Lauf ist nur lokale Planprüfung. `python tools/update-scrum-review-progress.py` ausgeführt; `python tools/verify-scrum-review-progress.py`: PASS (1.106 Blöcke, 2.913/2.913 ursprüngliche Kandidaten, 356 Nachfolger, 75 Stories). Implementierung, Belege für betroffene Veröffentlichungen und Live-Stand nicht geprüft.

Aktueller Entscheidungsstand (26.09.2026): Die 14 zuvor erfassten fachlichen Regeln und die schriftliche Teilabnahme `UD-2026-09-26-16` sind dokumentiert. Für `SRC-0482` sind sieben benannte Policy-Bereiche abgenommen; die PRE_FINAL_AUDIT_DECISION ist geschlossen. Keine Gesamt-Phase-0-Abnahme: nicht benannte Bestandteile, technische Umsetzung, Tests, Live-/Betriebsnachweise und Releasefreigaben bleiben offen. `SRC-0753/0780` sind PUBLICATION_DECISION; `SRC-1094` ist durch bestehende Evidence beantwortet; `SRC-1128` technisch geklärt; `SRC-1648` mit `SRC-1205` dedupliziert. Externe Benachrichtigungen bleiben bis zur separaten Aktivierungsfreigabe deaktiviert. Der Final Audit bleibt NOT_STARTED; diese Teilabnahme erbringt keine Implementierungs-, Live- oder Release-Prüfung. Details: `reviews/decisions-2026-09-26.md`.

Die folgenden COVERAGE-R1-Einträge sind historische Prüfstandsberichte. Bei
abweichendem Entscheidungsstatus gilt die spätere Festlegung COVERAGE-R2-002;
Paketberichte und Originale bleiben als damalige Evidenz erhalten.

### COVERAGE-R1-051 · gezielte fachliche Nachprüfung

| CandidateID | Ziel / Ergebnis | Verbleibender Befund |
| --- | --- | --- |
| SRC-0815.a | AC-COVR1-051-01, src-0815 · Covered | Technisch: jeder Alteintrag und Gesamtdeckung noch abzugleichen |
| SRC-0815.c | AC-COVR1-051-01, src-0815 · Covered | Evidenz: dokumentiertes Bestehen vor Register-/Verweisänderung fehlt |
| SRC-0815.d | AC-COVR1-051-01, src-0815 · Covered | Evidenz: Auffindbarkeit historischer Belege nach Migration prüfen |
| SRC-1537.i | ST-BRD-01, src-1537 · Covered by UD-2026-09-26-11 | Alle Eltern-/Kinderzuordnungen müssen vor Archivierung dokumentiert sein; keine verwaisten Kinder. Umsetzung ungeprüft. |
| SRC-1545.a | AC-COVR1-051-02, ST-BRD-01/-03, src-1545 · Covered | Automatisch lösbarer Zuordnungskonflikt geklärt; Daten-/Warnungsfall, Phase 0 und Implementierung ungeprüft |
| SRC-1648.a | AC-COVR1-041-03, ST-OPS-03, src-1648 · Covered by UD-2026-09-26-08 with SRC-1205 | Interne Inbox ist Pflicht; externe Zustellung wartet auf separate Aktivierungsfreigabe. Umsetzung ungeprüft. |
| SRC-2042.e | AC-COVR1-047-02, ST-VID-01 · Covered als historischer v18-Beleg | Evidenz/Entscheid: Gleichwertigkeit der damaligen Methode mit vollständiger Endkontrolle ungeklärt |
| SRC-2247.d | AC-COVR1-047-02, ST-VID-01 · Covered als historischer v18-Beleg | Derselbe begrenzte v18-Beleg und derselbe offene Endkontrollbefund; keine weitere Freigabe |

Die acht Klauseln wurden nur planerisch nachgeprüft. Die ältere automatische
Frage zu SRC-1545.a und die Archivfrage SRC-1537.i sind geklärt; die
v18-Endkontrollfrage bleibt offen. Am 26.09.2026 wurden einzelne Regeln
schriftlich entschieden; es gibt keine pauschale Phase-0-Abnahme. SRC-0482
ist für die sieben benannten Policy-Bereiche teilweise abgenommen; nicht benannte Phase-0-Bestandteile bleiben offen.
PUBLICATION_DECISIONs und DEFERRED_POST_PILOT bleiben getrennte Holds.
Betroffene Veröffentlichungen bleiben bis zur ausdrücklichen Freigabe
gesperrt; B und C blockieren den technischen Final Audit nicht. Der globale
Coverage-Check, Implementierung und Live-Verifikation sind nicht abgeschlossen.
Fortschritt mit `python tools/update-scrum-review-progress.py` aktualisiert.
Lokale Strukturprüfung `python tools/verify-scrum-review-progress.py`: PASS
(1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger,
58 Stories). Fokussierter Acht-Zeilen-/Hold-Abgleich: PASS (7 Covered,
1 Unresolved; 19/8/3 unveränderte PRE_FINAL_AUDIT_DECISION-/
PUBLICATION_DECISION-/DEFERRED_POST_PILOT-Holds). `git diff --check --
docs/scrum-migration`: PASS. Diese Prüfungen belegen Struktur und
Planungszuordnung, nicht den technischen Final Audit oder eine Live-Abnahme.

### COVERAGE-R1-050 · gezielte fachliche Nachprüfung

| CandidateID | Ziel und Planungsergebnis | Verbleibender technischer/Evidenzbefund |
| --- | --- | --- |
| SRC-0804.b | DoD-Gate / src-0804: reproduzierbare AC-Prüfung; Covered | Prüfergebnisse je Inkrement |
| SRC-0804.c | DoD-Gate / src-0804: Grenzen und ungeprüfte Fälle; Covered | Einzelangaben je Inkrement |
| SRC-0805.b | DoD-Gate / src-0805: Fach-/Architektur-/Design-/Freigabebelege; Covered | Einzelzuordnung und Freigaben |
| SRC-0806.b | DoD-Gate / src-0806: Code/Inhalt/Tests/Doku konsistent; Covered | Inkrement-Abgleich |
| SRC-0806.c | DoD-Gate / src-0806: Status-/Nachweiswidersprüche prüfen; Covered | Inkrement-Abgleich |
| SRC-0807.b | DoD-Gate / src-0807: sechs Zustände getrennt; Covered | Statusbelege je Inkrement |
| SRC-0808.b | DoD-Gate / src-0808: Folgearbeit mit Bezug/Priorität; Covered | Bestandsabgleich |
| SRC-0808.c | DoD-Gate / src-0808: Epic erst nach allen Stories; Covered | Epic-Einzelabgleich |
| SRC-0809.a | DoD-Gate / src-0809: zusätzliche Projektvorgaben; Covered | Betroffenheit/Einhaltung je Inkrement |
| SRC-0810.a | Prioritätsgate / src-0810: Wert vor weiteren Faktoren; Covered | Story-Einzelgründe |
| SRC-0810.b | Prioritätsgate / src-0810: Grund am Ergebnis; Covered | Story-Einzelgründe |
| SRC-0810.c | Prioritätsgate / src-0810: zulässige Vorrangfälle; Covered | konkrete Ausnahmen |
| SRC-0810.d | Prioritätsgate / src-0810: Entscheid samt Grund; Covered | Einzelentscheidungen |
| SRC-0810.e | Prioritätsgate / src-0810: Technikleichtigkeit nicht allein; Covered | Story-Einzelprüfung |
| SRC-0810.f | Prioritätsgate / src-0810: Board-Regeln/Freigaben; Covered | Phase-0-Entscheidungen offen |
| SRC-0811.a | Planpflege-Gate / src-0811: Fachquelle und aktiver Plan; Covered | konkrete Neuaufnahmen |
| SRC-0811.c | Planwechsel-Gate / src-0811: offene/erledigte Arbeit sichtbar; Covered | vollständiger Eintragsabgleich |
| SRC-0812.a | Planwechsel-Gate / src-0812: vor Ersatz/Archivierung/Löschung; Covered | vollständiger Eintragsabgleich |
| SRC-0812.b | Planwechsel-Gate / src-0812: gesamter Pflichtumfang; Covered | vollständiger Eintragsabgleich |
| SRC-0813.a | Planwechsel-Gate / src-0813: fünf Nachweisfelder; Covered | Felder je Alteintrag prüfen |

Alle 20 genannten Klauseln sind im bestehenden DoD-, Prioritäts- oder
Planwechsel-Gate als Planvorgabe gedeckt. Die Restbefunde in der Tabelle sind
keine neue Nutzerentscheidung und kein automatisch lösbarer semantischer
Befund. Der vollständige Anwendungs- und Migrationsnachweis fehlt weiter.
PRE_FINAL_AUDIT_DECISION, PUBLICATION_DECISION und DEFERRED_POST_PILOT bleiben
getrennte, unbeantwortete Holds. Betroffene Veröffentlichungen bleiben bis
zur Freigabe gesperrt; B und C blockieren den technischen Final Audit nicht.
Originalplan, Produkt, Bilder, Datenbank und Live-System blieben unberührt.
`update-scrum-review-progress.py` wurde ausgeführt; die lokale Strukturprüfung
`verify-scrum-review-progress.py` bestand mit 1.105 Blöcken, 2.908/2.908
ursprünglichen Kandidaten, 356 Nachfolgern und 58 Stories. Der fokussierte
CSV-Abgleich bestätigt 20/20 `Covered`-Klauseln und zehn betroffene
Quellblöcke; dies ist keine semantische Gesamt- oder Live-Abnahme.

### COVERAGE-R1-048 · gezielte fachliche Nachprüfung

| CandidateID | Ziel und Ergebnis | Restbefund |
| --- | --- | --- |
| SRC-0452.f | ST-WEB-01 / src-0452: Bestätigung auf zwei ZIP-Rückansichten begrenzt; Covered | Motiv-/Fassungsbeleg technisch prüfen |
| SRC-0452.g | ST-PHOTO-01 / src-0452: keine pauschale 14er-Freigabe; Covered | Einzelfreigaben fehlen; Publication Hold |
| SRC-0452.h | ST-WEB-03 / src-0452: Entfernung im Release-Build prüfen; Covered | aktuelle Kachel/Vollansicht nicht belegt |
| SRC-0464.f | ST-PHOTO-01 / src-0464: 13er-Gruppenabnahme als AC; Covered | Gruppenabnahme fehlt; Publication Hold |
| SRC-0466.s | ST-PHOTO-03 / src-0466: Parameter und finale Variantenabnahme getrennt; Covered | historische Parameter/Abnahmen fehlen |
| SRC-0562.c | ST-BRD-03 / src-0562: bedingte, datenarme Kartenübernahme; Covered | Prioritätsregel: PRE_FINAL_AUDIT_DECISION A3 |
| SRC-0753.a | ST-CON-01 / src-0753: 8–11 Stunden Gesamtziel; Covered | 24-Stunden-Reichweite: PUBLICATION_DECISION |
| SRC-0780.a | ST-CON-01 / src-0780: Website erst nach definiertem Ereignis; Covered | Longform oder Gesamtpaket: PUBLICATION_DECISION |
| SRC-0788.a | projektweites Story-Gate / src-0788; Partially Covered | ST-CON-01 auf fünf Stories aufteilen; Gesamtcheck |
| SRC-0791.a | Slice-Gate / src-0791; Partially Covered | nötige Schichten je Story prüfen |
| SRC-0791.b | Slice-Gate / src-0791; Partially Covered | Teilnutzen und unabhängige Abnahme je Story prüfen |
| SRC-0792.a | Epic-Gate / src-0792; Partially Covered | kleine funktionierende Inkremente je Epic prüfen |
| SRC-0792.b | optionales Skeleton, ST-AN-01 / src-0792; Partially Covered | Wahl und echter End-to-End-Nachweis je Epic prüfen |
| SRC-0792.d | ST-AN-01 / src-0792: Platzhalter nicht Done; Partially Covered | tatsächliche Demonstration offen |
| SRC-0792.e | Epic-Gate / src-0792; Partially Covered | schrittweiser Nutzen aller Folgestories prüfen |
| SRC-0793.a | Enabler-Gate / src-0793; Partially Covered | Ausnahme je Enabler begründen |
| SRC-0793.b | ST-WEB-03 / src-0793: Folgestories, Umfang, Ergebnis; Partially Covered | dieselben Angaben für weitere Enabler prüfen |
| SRC-0793.c | Story-Gate / src-0793: Vorarbeit nur bei Abhängigkeit; Partially Covered | projektweite Anwendung prüfen |

18 benannte CandidateIDs wurden gegen die aktuellen Originalquellen, Story-AC und Constraint-Anker abgeglichen. Acht Klauseln sind nach gezielter Zielkorrektur planerisch Covered; zehn Scrum-Strukturklauseln bleiben Partially Covered, weil der projektweite Story-/Epic-Check und die tatsächliche Aufteilung von ST-CON-01 fehlen. Die 13er-Kajak-Gruppe, die übrigen Fahrzeugvarianten und die GCS-Website-Ergänzung bleiben bis zu den jeweiligen Belegen und Freigaben für neue Veröffentlichung gesperrt. Die Cockpit-Prioritätsregel ist PRE_FINAL_AUDIT_DECISION A3; GCS-Stundenreichweite, GCS-Veröffentlichungsereignis und Kajak-Gruppenabnahme sind PUBLICATION_DECISIONs. B-/C-Holds blockieren den technischen Final Audit nicht. Vorhandene PRE_FINAL_AUDIT_DECISIONs und DEFERRED_POST_PILOT-Fragen bleiben getrennt und unbeantwortet. Produkt, Datenbank, Bilddateien und Live-Stand wurden nicht geprüft oder geändert; `docs/ausbauplan.md` bleibt aktiver Plan. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-045 (SRC-1825–1834):** Zehn Originalblöcke aus `video-production/AGENTS.md` und `video-production/README.md` direkt mit den aktuellen Constraint-Ankern und EPIC-VIDEO verglichen. Die Berichtsfelder und die Entscheidungs-/Kurzberichtregel sind in `AC-COVR1-044-07` einzeln referenziert und mit Blockbericht-Prüfschritt belegt. Die README-Angaben zu Repository und grundsätzlichem Arbeitsbereich bestätigen das vorhandene Gate `COVERAGE-R1-042`; die Ausnahme nur mit Helmuts ausdrücklicher Freigabe für die konkrete Aufgabe bleibt maßgeblich. Zehn eigenständige Klauseln sind planerisch gedeckt; `SRC-1827.b` ist Teil der Ja/Nein-Frage, keine elfte Pflicht. Keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Die bestehende Frage zur Reichweite der Ausnahme für Website, Cockpit und Deployment (`SRC-1799`) bleibt offen; bis dahin keine solche Ausnahme ableiten. Die nächste konkrete Video-Story muss anwendbare AC mit Prüfschritt und Beleg übernehmen. Tatsächliche Berichte, Scope-Prüfung, Implementation Verification, Privacy-/Publikationsfreigaben und Live-Zustand wurden nicht nachgewiesen. Fortschrittsaktualisierung ausgeführt; Strukturprüfung PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 58 Stories). Gesamtmigration offen.

**COVERAGE-R1-044 (SRC-1815–1824):** Zehn Originalblöcke direkt mit den aktuellen Constraint-Ankern und EPIC-VIDEO verglichen. AC-COVR1-044-01–07 planen Maskengröße plus Unidentifizierbarkeit, manuelle Tracking- und Frameprüfung, vollständige erneute Public-Master-Sichtung, Shot-Ersatzpräferenz, getrennte Clip-/Fassungsstatus sowie Pfad- und Arbeitsblock-Reporting. Elf atomare Klauseln sind planerisch gedeckt. Keine neue konkret entscheidbare Nutzerfrage und keine verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Die konkrete nächste Story muss die einschlägigen AC mit Prüfschritt und Beleg übernehmen; deren Ausführung, Privacy-/Bild-/Publikationsfreigaben und Live-Zustand sind nicht verifiziert. `python -X utf8 tools/update-scrum-review-progress.py` lief; `python -X utf8 tools/verify-scrum-review-progress.py` meldete PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 58 Stories). Dies ist eine Strukturprüfung. Gesamtmigration offen.

**COVERAGE-R1-043 (SRC-1805–1814):** Zehn Originalregeln direkt gegen aktuelle Zielstellen geprüft. Sechs fortgeltende AC am EPIC-VIDEO und Quellenanker im Constraint-Register decken Projekt-/Materialwahl, lesende Bestandsprüfung, getrennte Veröffentlichung, visuelle Endkontrolle und Adrians Anonymisierung planerisch. Keine konkret entscheidbare Nutzerfrage oder verbleibende Planning-Coverage-Lücke in diesem Teilumfang. Konkrete Video-Stories müssen anwendbare AC, Prüfschritte und Belege übernehmen; Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification offen. Gesamtmigration offen.

**COVERAGE-R1-034 (SRC-1403–1412):** Zehn Originalblöcke und 23 Klauseln gegen den aktuellen Gesamtauftrag und die aktuellen Story-/Constraint-Ziele geprüft. AC-COVR1-034-01–07 decken Startseitengrenze samt fortgeltendem Bild-/Originalschutz, Design- und Prüfpflicht, Kajak-Referenz, Seitentypfreiheit, zentrale Werte/Bausteine und das Designkonflikt-Gate als Planung. SRC-1408.b ist ein Beispiel zu SRC-1408.a. In diesem Umfang bleibt keine Planning-Coverage-Lücke und keine aktuell entscheidbare Nutzerfrage. Eine konkrete neue Gestaltung oder ein tatsächlich festgestellter Widerspruch erfordert weiterhin die gezielte Nutzerentscheidung nach Gesamtauftrag § 11; sie wurde hier weder unterstellt noch freigegeben. Implementation Verification, aktuelle Referenz-/Sichtprüfung, Bildfreigabe und Live-Verifikation sind offen. Der globale Migrationscheck bleibt offen.
**COVERAGE-R1-033 (SRC-1393–1402):** Zehn Originalblöcke und 25 Klauseln direkt gegen aktuelle Story-AC und Constraint-Anker geprüft. Die AC-COVR1-033-01–07 decken Quellen-/Skill-Prüfung, getrennte Regel- und Ergebnisnachweise, begrenzte Blocker, vollständiges Routeninventar, freigegebene Vergleichsreferenzen und die Startseitengrenze als Planung. Keine neue Nutzerentscheidung oder verbleibende Planning-Coverage-Lücke in diesem Umfang identifiziert. Tatsächliche Referenzsicherung, Produkt-/Bildprüfung, Freigaben und Live-Zustand bleiben Implementation Verification; der globale Migrationscheck ist offen.
`python -X utf8 tools/update-scrum-review-progress.py` und `python -X utf8 tools/verify-scrum-review-progress.py` wurden ausgeführt; Strukturprüfung PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 57 Stories). Der aktive Ausbauplan bleibt maßgeblich.
**COVERAGE-R1-032 (SRC-1382–1392 ohne SRC-1388):** Zehn Originalblöcke und 20 Klauseln gegen aktuelle Story-AC und Constraint-Anker geprüft. Technische Umsetzung, Tests und Release, Komponenten-/Template-/Inhaltstrennung, zentrale Änderungswirkung, vollständiger Seiten- und Generatorbestand, geschützte Bereiche sowie aktuelle Arbeitsgrundlagen sind als AC-COVR1-032-01–06 geplant. Bedingte Skill-Suche bleibt bedingt; der konkrete Bild-Skill-Pfad steht derzeit in AGENTS.md. Keine neue Nutzerentscheidung oder weitere Planning-Coverage-Lücke in diesem Umfang identifiziert. `python -X utf8 tools/update-scrum-review-progress.py` wurde ausgeführt; `python -X utf8 tools/verify-scrum-review-progress.py` meldete PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 57 Stories), `git diff --check -- docs/scrum-migration` bestand. Dies ist eine Strukturprüfung. Implementation Verification, Design-/Bild-/Release-Freigaben und Live-Zustand bleiben getrennt offen; der globale Migrationscheck bleibt offen.
**COVERAGE-R1-031 (SRC-1220–1224, 1377–1381):** Zehn Originalblöcke und 22 Klauselkandidaten direkt gegen aktuelle Story-AC und Constraint-Anker geprüft. Private API und öffentliche Datengrenze, Secret-Negativprüfungen, Cockpit-Scope-Ausschlüsse, Dokumentautorität sowie getrennte Website-, Bild- und Live-Nachweise sind konkret geplant. SRC-1224.a bleibt wegen der Reichweite des künftigen KI-Produkt-/Datenschutz-Gates als Nutzerentscheidung Unresolved. Weitere Planning-Coverage-Lücken in diesem Umfang: keine identifiziert. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand bleiben separat offen; der globale Migrationscheck bleibt offen.
**COVERAGE-R1-030 (SRC-1210–1219):** Originalquelle und aktuelle Story-Zielstellen direkt abgeglichen. Zehn Quellblöcke haben konkrete Planungs-AC und Prüftasks zu Format/Stunden, Audit-Ansicht, historischem Export, geprüftem Erkenntnisablauf, Cockpit-Zugriff, Admin-Rechten, Sync-Idempotenz, Snapshot-Ständen und Datenqualitätsregeln. Reine Nummern-/Datumsfragmente bleiben Kontext. Echte Nutzerentscheidungen in diesem Umfang: keine. Weitere Planning-Coverage-Lücken in diesem Umfang: keine. Historische Live-Angaben vom 22.09.2026 sind nur Quellenstand; heutige Implementation Verification, Freigabe und Live-Wirkung bleiben offen. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-029 (SRC-1200–1209):** Zehn Originalblöcke direkt mit aktuellen Cockpit- und Betriebszielstellen abgeglichen. Die fachlichen Anforderungen zu Planner, Master Context, Insights, sechs Testbereichen, Backup/Restore, Löschung, Monitoring, Contabo-Gates und Reach-/Audit-Daten haben konkrete Planungs-AC und Prüftasks. Die einzige offene Nutzerentscheidung ist Benachrichtigungskanal samt Verantwortung und Aktivierungskriterium (SRC-1205.c); deshalb bleibt dieser Block Unresolved. Der Reach-Stand vom 23.09.2026 ist ein datierter historischer Live-Befund, kein heutiger Implementierungs- oder Audit-V2-Nachweis. Weitere Planning-Coverage-Lücken in diesem Umfang: keine; aktuelle Implementation Verification und ein künftiger Release bleiben separat offen. Der globale Migrationscheck bleibt offen.

**COVERAGE-R1-023 (SRC-1138–SRC-1147):** Zehn unveränderte Originalblöcke (SHA-256 `91c94dcc2581638539a51b2eaf81b476e5b667f22c7ebc03ec7ff9cbd2ef4080`) und 13 atomare Klauseln direkt gegen die aktuellen Cockpit- und Board-Stories geprüft. Alle 13 sind durch konkrete Plan-AC zu Ziel-/Ist-Metriken, Kontextversionierung, Board-Schema und -Historie, Warnungs-Inbox/-Zuordnung, Audit und Tagesmetriken gedeckt. Keine neue Nutzerentscheidung oder verbleibende Planning-Coverage-Lücke in diesem Umfang. Implementation Verification, Phase-0-/Release-Freigabe und Live-Zustand bleiben offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-022 (SRC-1127–1128, 1130–1137; damaliger Stand):** Zehn Originalblöcke und 18 atomare Klauseln direkt gegen die Cockpit-Stories geprüft. Die frühere Nutzerfrage zu `SRC-1128.a` wurde technisch geklärt: `yt_*` gilt für YouTube; `content_*`, `master_*` und `scrum_*` behalten ihre Domänennamen. Implementation Verification, Freigabe und Live-Zustand bleiben offen.

**COVERAGE-R1-021 (SRC-1114–1120, 1122–1123, 1125):** Zehn Originalblöcke gegen aktuelle Zielstellen geprüft. 16 fachliche Klauseln sind durch konkrete AC planerisch gedeckt; Listenmarker bleiben Kontext, die beiden Tag-90-Fragmente sind zu einer Tabellenzeile zusammengeführt. Keine echte Nutzerentscheidung oder weitere Deckungslücke in diesem Umfang. Implementation Verification und globaler Migrationscheck bleiben offen.

# Ausführungsstand der bestehenden Scrum-Planmigration
**DEC-OAUTH-001 (Nutzerentscheidung zu SRC-1107.c):** Variante A bestätigt: Beim Trennen wird Remote-Widerruf ausgeführt, sofern vom Anbieter unterstützt. Nicht unterstützter oder fehlgeschlagener Remote-Widerruf muss als Fehler/Warnung protokolliert werden. Lokale Löschung der verschlüsselten Tokendaten und Deaktivierung künftiger Syncs bleiben unabhängig davon verpflichtend. Das klärt die fachliche Nachfolgeregel, belegt aber keine aktuelle Implementation oder Live-Prüfung.

**COVERAGE-R1-039 (SRC-1454–1458, 1461–1465):** Zehn aktuelle Originalblöcke und 23 Kandidaten mit den konkreten Zielstellen abgeglichen; 22 fachliche Klauseln sind durch sechs AC und drei Prüftasks planerisch gedeckt, SRC-1455.c bleibt grammatische Fortsetzung. Keine aktuell entscheidbare Nutzerfrage und keine verbleibende Planning-Coverage-Lücke dieses Umfangs. Eine spätere unklare Gestaltungsreichweite erfordert die gezielte Frage nach Seite, dokumentierter Variante oder globaler Regel. Fortschrittsaktualisierung ausgeführt; Strukturprüfung und `git diff --check` siehe Abschlusslauf. Implementation Verification, tatsächliche Freigaben, Bildschutzprüfung und Live-Zustand bleiben offen. Der globale Migrationscheck bleibt offen; `docs/ausbauplan.md` bleibt aktiv.
**COVERAGE-R1-038 (SRC-1444–1453):** Zehn aktuelle Originalblöcke und 30 Klauseln gegen ST-PHOTO-01 und die konkreten Constraint-Anker abgeglichen. Sechs AC und vier Prüftasks schließen die identifizierten Planungslücken zu Kopie/Ausgabeort, technischer Trennung, Testgrenze, Vorher-/Nachher-Nachweis und Vorfallreaktion. Keine neue konkret entscheidbare Nutzerfrage; keine verbleibende Planning-Coverage-Lücke in diesem Umfang. `python -X utf8 tools/update-scrum-review-progress.py` lief; `python -X utf8 tools/verify-scrum-review-progress.py` meldete PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 57 Stories), ebenso `git diff --check -- docs/scrum-migration`. Das ist nur eine Strukturprüfung. Technische Ausführung, unabhängige Archivprüfung, bedingte Vorfallfreigabe, Bild-/Release-Freigabe und Live-Zustand bleiben separat offen. Der globale Migrationscheck und der aktive Ausbauplan bleiben bestehen.
**COVERAGE-R1-037 (SRC-1433, 1435–1443):** Zehn Originalblöcke und 35 Klauselkandidaten gegen die aktuelle Originalquelle und konkrete Zielstellen abgeglichen. 33 fachliche Klauseln sind durch AC-COVR1-037-01–07 sowie vier Prüftasks planerisch gedeckt; zwei Kontext-/Verweisklauseln bleiben mit dem Original verbunden. In diesem Umfang keine konkret entscheidbare neue Nutzerfrage und keine verbleibende Planning-Coverage-Lücke. Bestandsaudit, einzelne Bild-/Personenentscheidungen, tatsächliche Archiv- und Variantenprüfung, Implementation Verification, Freigaben und Live-Verifikation sind separat offen. Der aktive Ausbauplan bleibt maßgeblich; der globale Migrationscheck bleibt offen.
**COVERAGE-R1-020 (SRC-1104–1113):** Zehn Originalblöcke und 20 Kandidaten gegen die aktuellen ST-INS-01/-03/-04-Zielstellen geprüft. Vierzehn fachliche Klauseln sind durch konkrete AC planerisch gedeckt; fünf Listenmarker sind Kontext. SRC-1107.c ist durch DEC-OAUTH-001 geklärt: Remote-Widerruf soweit unterstützt, bei Nichtunterstützung/Fehler verpflichtende geheimefreie Fehler-/Warnungsprotokollierung; lokale Tokendatenlöschung und Sync-Stopp unbedingt. Implementation Verification, Freigabe, Live-Zustand und globaler Migrationscheck bleiben offen.


**COVERAGE-R1-019 (SRC-1092–1103; damaliger Stand):** Zehn Originalblöcke und 17 Kandidaten direkt gegen aktuelle Zielstellen geprüft. Die frühere Frage SRC-1094.a ist durch die spätere allowlist-gebundene Google-Anmeldung aus bestehender Evidence beantwortet. Die Rechte-Matrix bleibt ein bedingter Vorschlag; `analytics_viewer` ist nicht als bestehende Rolle oder freigegeben behauptet. Implementation Verification, Freigabe, Live-Zustand und globaler Migrationscheck bleiben offen.


**COVERAGE-R1-018 (SRC-1081–1091; damaliger Stand):** Zehn Originalblöcke und 17 Kandidaten direkt gegen aktuelle Zielstellen geprüft. 14 fachliche Klauseln sind im Plan gedeckt; Node-`fetch` ist eine Option. SRC-1084.a wurde durch UD-2026-09-26-04 geklärt: GitHub Pages ist nur historische Hostingangabe der damaligen Cockpit-Stufe. Implementation Verification, Freigabe, Live-Zustand und globaler Migrationscheck bleiben offen.

Stand: 25. September 2026. Der aktive Gesamtplan bleibt `docs/ausbauplan.md`;
der Scrum-Entwurf ist weder verbindlich noch zur Veröffentlichung freigegeben.

### COVERAGE-R1-016 · gezielte Planungsreparatur SRC-1058–SRC-1068

Die zehn Originalblöcke wurden direkt mit dem aktuellen ST-INS-01-/ST-AUTH-01-Entwurf verglichen. Vierzehn Klauseln haben konkrete Prüf-AC und Constraint-Bezüge; ältere generische Ziel-/Prüfnachweisfragen wurden als technische Planungsfragen erledigt. Im begrenzten Quellumfang verbleibt keine neue Nutzerentscheidung und keine identifizierte Planning-Coverage-Lücke. Die Frage zu SRC-1053.b aus COVERAGE-R1-015 bleibt außerhalb dieses Pakets offen. Implementation Verification, heutige Produktionskonfiguration, Freigabe und Live-Stand sind ungeprüft. Der aktive Ausbauplan und globale Migrationscheck bleiben offen.

`python -X utf8 tools/update-scrum-review-progress.py` wurde ausgeführt. Nach Abgleich der aktuellen Matrixzahl im Coverage-Bericht meldete `python -X utf8 tools/verify-scrum-review-progress.py` PASS: 1.105 Quellblöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger und 57 Stories. Dies ist eine Strukturprüfung, keine semantische Gesamt- oder Implementierungsabnahme.

### COVERAGE-R1-015 · gezielte Planungsreparatur SRC-0974–SRC-1057

Die zehn Originalblöcke aus `reviews/COVERAGE-R1-015-input.json` wurden direkt
mit den aktuellen SEO- und Cockpit-Quellen sowie ST-SEO-02–07 und ST-INS-01
verglichen. Domain-/Sitemap-Reihenfolge, URL- und Kennzahlprüfung, vier
Themenfoki, belegte Reiseinhalte und die konkreten Google-Konfigurationschecks
sind als prüfbare AC und Constraints verankert. Historische Nicht-Einreichung
bleibt Kontext. Eine echte Nutzerentscheidung bleibt offen: Erfasst das absolute
Verbot in SRC-1053.b auch Client-ID, Callback-URL und Kontoinformation, oder
soll es auf Geheimnisse begrenzt werden? Außer dieser Normabgrenzung verbleibt
in diesem Quellumfang keine Planning-Coverage-Lücke. Aktuelle Implementierung,
Produktionskonfiguration, Freigaben und Live-Zustand wurden nicht geprüft.
Der aktive Ausbauplan und der globale Migrationscheck bleiben maßgeblich/offen.
`update-scrum-review-progress.py` wurde ausgeführt;
`verify-scrum-review-progress.py` meldete PASS für 1.105 Quellblöcke,
2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger und 57 Stories.
`git diff --check` für die Migrationsunterlagen bestand. Diese Strukturprüfung
ist keine semantische Gesamt- oder Implementierungsabnahme.

### COVERAGE-R1-014 · gezielte Planungsreparatur SRC-0956–SRC-0969

Zehn Originalblöcke aus `COVERAGE-R1-014-input.json` wurden direkt mit `docs/riverstar/entwurf.md`, `docs/seo.md` und aktuellen ST-PHOTO-01-/ST-CON-04-/ST-WEB-01-/ST-WEB-03-/ST-SEO-01-AC verglichen. Die konkret fehlenden Foto-, Viewer- und SEO-Kriterien stehen im Entwurf, Story-Katalog und betroffenen Constraint-Ankern; historische Befunde und aktuelle Prüfpflichten sind getrennt. In diesem begrenzten Quellumfang bleiben keine neue echte Nutzerentscheidung und keine Planning-Coverage-Lücke. Implementation Verification, Bild-/Release-Freigabe und Live-Zustand bleiben offen; der aktive Ausbauplan und globale Migrationscheck bestehen fort. Fortschritt und Strukturprüfung siehe aktuelles `atomic-coverage-report.md`.

### COVERAGE-R1-013 · gezielte Planungsreparatur SRC-0943–SRC-0955

Die zehn Originalblöcke im Paketinput und ihre 35 Klausel-/Nachfolgerzeilen wurden gegen `docs/riverstar/entwurf.md` und die aktuellen ST-CON-04-/ST-WEB-01-/ST-WEB-03-/ST-PHOTO-01-AC und Constraint-Anker verglichen. Hecktaschen- und Herstellerdaten sind als datierte interne Recherche von öffentlichen Textgrenzen getrennt; EXIF-Zeiten, fehlender GPS-Ort und historische Bildbearbeitung sind keine aktuelle Orts-, Privacy- oder Bildfreigabe. Der Riverstar-Dreifotofall und die öffentliche Text-/Linkprüfung sind konkrete AC. Die bereits offene Schwimmwestenfrage bleibt mit SRC-0940 dedupliziert. Bei SRC-0948 widersprechen sich „Gewässer oder Campingplatz“ der Quelle und „Gewässer und Ort“ des bisherigen ST-CON-04-AC; bis zur Nutzerentscheidung nur „Norwegen“. Keine weitere Planning-Coverage-Lücke in diesem begrenzten Umfang identifiziert. `python -X utf8 tools/update-scrum-review-progress.py` lief; `python -X utf8 tools/verify-scrum-review-progress.py` meldete PASS mit 1.105 Blöcken, 2.908/2.908 ursprünglichen Kandidaten, 356 Nachfolgern und 57 Stories. Das ist eine Strukturprüfung, kein globaler Coverage-Abschluss. Implementierung, Bildvarianten, Freigaben, Release und Live-Zustand wurden nicht verifiziert; der aktive Ausbauplan und globale Migrationscheck bleiben offen.

### COVERAGE-R1-012 · gezielte Planungsreparatur SRC-0933–SRC-0942

Zehn Originalblöcke und 29 Klauselkandidaten wurden direkt mit `docs/riverstar/entwurf.md` sowie den aktuellen ST-CON-04-AC und Constraint-Ankern verglichen. Interne Elbharmonie-/ToBoFilm-Recherche, unsichere Kaufzeit, tatsächliches Zubehör, persönliche Nutzungsaussagen und Modelltrennung sind mit getrennten Quellenrollen und prüfbaren Textgrenzen erfasst. Der frühere Tabellenersatz bleibt historischer Entwurfsstatus. Eine Nutzerentscheidung bleibt offen: Was genau war an den Grabner-Schwimmwesten weniger überzeugend, und soll diese Kritik so in den öffentlichen Bericht? Darüber hinaus ist im begrenzten Umfang keine Planning-Coverage-Lücke identifiziert. `update-scrum-review-progress.py` lief; `verify-scrum-review-progress.py` meldete PASS mit 1.105 Blöcken, 2.908/2.908 ursprünglichen Kandidaten, 356 Nachfolgern und 57 Stories. Dies ist eine Strukturprüfung, kein globaler Coverage-Abschluss. Implementierung, redaktionelle/Bild-/Release-Freigaben und Live-Verifikation sind separat ungeprüft. Der aktive Ausbauplan und der globale Migrationscheck bleiben unverändert offen.

### COVERAGE-R1-011 · gezielte Planungsreparatur SRC-0922–SRC-0932

Zehn Originalblöcke (ohne SRC-0930) wurden direkt mit `docs/riverstar/entwurf.md` und den aktuellen konkreten ST-CON-04-/ST-WEB-01-/ST-PHOTO-01-AC sowie den Constraint-Ankern verglichen. 45 ursprüngliche Klauselkandidaten sind einzeln eingeordnet. Redaktioneller Slice, datierte Bildwahl und Provenienz, Orts-/Beschriftungsgrenze sowie interne Hersteller- und Fremdrecherche sind planerisch konkret verankert. Keine frühere Vorschau, Bildmaske oder Recherche ist als heutige Freigabe oder Implementierungsprüfung gewertet. Zwei echte Nutzerentscheidungen bleiben offen: Zielort der abgestimmten Riverstar-EN-Fassung (SRC-0922.d) und Alter sowie heutige Motivauswahl für `DSC_1547.jpg` (SRC-0925.b). Darüber hinaus bleibt in diesem begrenzten Quellumfang keine identifizierte Planning-Coverage-Lücke. `update-scrum-review-progress.py` lief; `verify-scrum-review-progress.py` meldete PASS mit 1.105 Blöcken, 2.908/2.908 ursprünglichen Kandidaten, 356 Nachfolgern und 57 Stories. Das ist eine Strukturprüfung, kein global bestandener Coverage-Check. Produktimplementierung, aktuelle Bildvariantenprüfung, redaktionelle Freigabe, Release und Live-Zustand sind separat ungeprüft.

### COVERAGE-R1-007 · gezielte Planungsreparatur SRC-0876–SRC-0886

Zehn Originalblöcke aus dem Paketinput wurden direkt mit `docs/responsive-templates.md` und den aktuellen konkreten Zielstellen verglichen. Die 18 partiellen fachlichen Klauseln sind nun in ST-WEB-02–05 und den zugehörigen Constraint-Ankern planerisch gedeckt; fünf Nummernmarker bleiben Kontext. `TASK-0066` benennt die vorgelagerte Bestandsprüfung. Im begrenzten Quellumfang bleibt keine echte Nutzerentscheidung und keine Planning-Coverage-Lücke. Der Fortschrittsbericht wurde neu erzeugt. Fokussierter Quell-/Zielabgleich, `verify-scrum-review-progress.py` (PASS: 1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 57 Stories) und `git diff --check` bestanden; der globale Migrationscheck bleibt wegen anderer Befunde offen. Aktuelle Produktimplementierung, Sicht-/Bildprüfung, Freigaben, Release und Live-Zustand sind separat ungeprüft. Der aktive Ausbauplan bleibt maßgeblich.

### COVERAGE-R1-008 · gezielte Planungsreparatur SRC-0888–SRC-0898

Zehn Originalblöcke mit zwölf atomaren Klauseln wurden direkt gegen aktuelle Zielstellen geprüft. Die zuvor partiellen Klauseln sind durch konkrete ST-WEB-03-AC und Constraint-Anker planerisch gedeckt. Die technischen Review-Fragen wurden geschlossen; im begrenzten Quellumfang bleibt keine echte Nutzerentscheidung oder Planning-Coverage-Lücke. Produktimplementierung, tatsächliche Prüfungen, Design-/Bild- und Releasefreigaben sowie Live-Zustand wurden nicht verifiziert. Der aktive Ausbauplan bleibt maßgeblich.

## Quellumfang und gesicherter Anfangsstand

### COVERAGE-R1-006 · gezielte Planungsreparatur SRC-0865–SRC-0875

Die zehn im Input enthaltenen Originalblöcke (SRC-0871 ist nicht Teil des Pakets) wurden direkt mit der aktuellen Originalquelle, den konkreten AC und den Constraint-Ankern verglichen. 18 zuvor partielle Klauseln sind nun planerisch gedeckt. Die zugehörigen technischen Review-Fragen wurden nach der Zielkorrektur geschlossen; keine echte Nutzerentscheidung ist für diesen begrenzten Umfang offen. Die alten PKG-030/031-Befunde bleiben historisch.

Header-Zustände, Inhaltsdarstellung, Interaktionen, responsive Umschaltpunkte, zulässige Inhalts-/Template-Unterschiede, getrennte Inhaltsdaten, vorhandene redaktionelle Quellen und Abläufe sowie Sprachfassungen besitzen konkrete Kriterien in ST-WEB-01–05. Quell- und Browserprüfung der aktuellen Implementierung, Design-/Bildfreigaben, Release und Live-Verifikation wurden nicht durchgeführt; der aktive Ausbauplan bleibt maßgeblich.

### COVERAGE-R1-005 · gezielte Planungsreparatur SRC-0854–SRC-0863

Die zehn Originalblöcke aus `reviews/COVERAGE-R1-005-input.json` wurden
direkt mit `docs/responsive-templates.md` (SHA-256
`55bf55f081fd521efd95e35894938530d07fce2520c2e1c1e297daace632e1fe`)
und den aktuellen konkreten AC/Constraints verglichen. Von 36 atomaren Zeilen
waren vier bereits `Covered`, sechs sind zusammengeführte Textfragmente und
26 zuvor `Partially Covered`. Die 26 sind jetzt durch die AC von ST-WEB-01–05
und die zehn aktualisierten Registeranker planerisch `Covered`. Die Matrix
ordnet alle zehn Quellblöcke den zuständigen Stories zu. Die alten PKG-030-
Lückenbeschreibungen bleiben als datierter Prüfkontext lesbar, sind kein
aktueller Status.

Die Kriterien erfassen Fahrzeugkonfiguration und neue Fahrzeugseite ohne
Quellkopie, Eignungsprüfung und Wiederverwendung des Reisegenerators,
Berichtsdaten und optionale Abschnitte, passende Komponenten für weitere
Unterseiten bei eigenständiger Startseite, die bestehenden Direktlink- und
Redirect-Entscheidungen samt Fehler-Gegenproben, Scotts Kajak-Sichtvergleich
und die zentralen Regeln für Desktop, Tablet und Smartphone einschließlich
Bereinigung unbeabsichtigter mobiler Unterschiede. Die vier dokumentierten
Poster-Ausnahmen bleiben auf ihren bisherigen Umfang begrenzt. Weder eine
neue Bild-/Designfreigabe noch ein Release wird daraus abgeleitet.

Im geprüften Quellumfang bleibt **keine fachliche Nutzerfrage** und **keine
Planning-Coverage-Lücke**. Die aktuelle Implementierung, lokale Sicht- und
Browserbefunde, Bildfreigaben, konkrete Release-Freigabe und Live-Verifikation
sind einzeln offen. `docs/ausbauplan.md` bleibt der aktive Plan; Originale,
Produkt, Reviews und `controller-state.json` wurden nicht geändert.
`python -X utf8 tools/update-scrum-review-progress.py` wurde ausgeführt.
`python -X utf8 tools/verify-scrum-review-progress.py` meldete **PASS**:
1105 Quellblöcke, 2908/2908 ursprüngliche Kandidaten, 356 Nachfolger und
57 Stories. Das ist eine Struktur- und Referenzprüfung, keine semantische
Gesamt-, Produkt- oder Live-Abnahme. Der Eingabehash der zehn Quellblöcke
stimmt mit dem aktuellen Original überein.

### COVERAGE-R1-004 · gezielte Planungsreparatur SRC-0810–SRC-0853

Die zehn Originalblöcke aus `reviews/COVERAGE-R1-004-input.json` wurden mit
ihren aktuellen SHA-256-Werten und den heutigen Zielstellen verglichen:
35 Klauselkandidaten, davon 18 für SRC-0849–0853. ST-WEB-01–05 und der
Story-Katalog enthalten jetzt konkrete AC für eine zentrale Galeriequelle
und ihre fünf Datenfelder, vollständige freigegebene Viewer-Webbilder,
Design-Guide-/Gesamtauftrag-Verweise, Grundlayout-Trennung, Kajak- und
Fahrzeug-Templates sowie produktive CSP- und Galerieprüfung. Das
Constraint-Register ordnet die Quellen den tatsächlichen Stories zu.
16 zuvor partielle Web-Klauseln sind damit planerisch gedeckt; zwei waren
bereits gedeckt. Der historische PKG-030-Befund bleibt als Vorbefund
erkennbar, seine alten offenen technischen Fragen werden nicht fortgeführt.

SRC-0810–0815 sind als bindende Planwechselgates konkretisiert. Offen bleiben
die individuelle Prioritätsbegründung je Story und etwaige begründete
Vorrangentscheidungen, ferner der vollständige Fünf-Felder-Abgleich jedes
alten Eintrags mit eindeutiger Zuordnung, Fachdeckung, korrektem Status und
widerspruchsfreien aktiven Plänen. Bis zu einem bestandenen Check bleibt
`docs/ausbauplan.md` die aktive Liste; der Scrum-Entwurf ersetzt, archiviert
oder löscht sie nicht. Aus diesen Quellen entsteht keine zusätzliche
fachliche Nutzerfrage. Die konkrete Bild-, Design- oder Release-Freigabe
ist nicht erteilt; Implementation Verification und Live-Nachweise sind
getrennt offen.

`update-scrum-review-progress.py` und `verify-scrum-review-progress.py`
wurden ausgeführt; die Strukturprüfung meldete PASS für 1105 geprüfte
Blöcke, 2908 ursprüngliche Kandidaten, 356 Nachfolger und 57 Stories.
Der fokussierte Quell-/Zielabgleich betraf nur SRC-0810–0853 laut Input,
nicht die fachliche Gesamtmigration oder Produktimplementierung.

### COVERAGE-R2-001 · gezielte Planungsreparatur SRC-0800–SRC-0809

Die zehn Originalblöcke aus `reviews/COVERAGE-R2-001-input.json` wurden
direkt mit den aktuellen Entwurfs- und Registerstellen verglichen. Der
Entwurf nennt nun ein konkretes Nachweisformat für AC-Testbarkeit,
INVEST-/Ready-Korrektur und bedarfsabhängige Grenzfälle je Story sowie
DoD-, Status-, Quell-, Freigabe-, Folgearbeits- und Epic-Abschlussbelege je
Inkrement. Das Register ordnet diese Pflichten den zehn Quellankern zu.
Kontextfragmente und die zusammengeführte Klausel SRC-0809.b wurden nicht
als neue eigenständige Pflichten gezählt. Die vorhandene planerische Deckung
von SRC-0807.c bleibt erhalten; keine weitere Klausel wird allein wegen
eines allgemeinen Prüfgates auf `Covered` gesetzt.

Offene Deckung: Der AC-/INVEST-/Quellabgleich aller 57 Stories, die DoD-
Nachweise je abgeschlossen gemeldetem Inkrement einschließlich reproduzierbarer
AC-Prüfungen, Grenzen, Freigabebelegen und Statusabgleich, die Erfassung
offener Folgearbeit sowie der Epic-Abschlussabgleich fehlen als
Einzelbelege. Dies sind Planungs- und Nachweisaufgaben, keine neue
Nutzerentscheidung. Keine Bild-, Design- oder Release-Freigabe wird aus
dem Entwurf abgeleitet. Implementation Verification bleibt separat offen;
der aktive `docs/ausbauplan.md` wird nicht ersetzt.

`update-scrum-review-progress.py` lief erfolgreich; der globale
`verify-scrum-review-progress.py` meldete PASS. Die zusätzliche fokussierte
lesende Prüfung bestand für zehn Originalblöcke und Quell-Hashes, 23
Klauseltexte, zehn Registeranker, 57 Story- und 146 Task-Eltern. Das ist
keine semantische Gesamt- oder Implementierungsprüfung. Ergebnis und Grenzen stehen im
`atomic-coverage-report.md`.

### COVERAGE-R1-003 · gezielte Planungsreparatur SRC-0788–SRC-0799

Die zehn Originalblöcke aus `reviews/COVERAGE-R1-003-input.json` wurden direkt
gegen die heutigen Zielstellen geprüft. Die vollständigen Quellregeln bleiben
in `docs/project-rules/scrum-planning.md` und im Constraint-Register erhalten.
Der Scrum-Entwurf konkretisiert den storyweisen INVEST-/Slice-Prüffall und
nennt für ST-CON-01 fünf eigenständig abnehmbare Teilnutzen. ST-CON-01 bleibt
als bisheriges Gesamtpaket **nicht umsetzungsbereit**; Storysätze, AC,
Dependencies und Quellverweise sind noch auf die einzelnen Slices umzuhängen.
ST-AN-01 hat nun ein prüfbares, vorführbares Skeleton-AC mit echtem Aufruf und
Negativfall; ST-WEB-03 benennt Enabler-Grund, Mindestumfang, freigeschaltete
Folgestories und Berichtsergebnis. Diese Kriterien sind Planung, keine
Durchführung, Freigabe oder Live-Verifikation.

Offene Deckung: Der Einzelcheck aller Stories auf INVEST, Wert, Quellen,
Dependencies, Umfang und technische Überfestlegung fehlt; ST-CON-01 ist noch
nicht in fünf Value Stories migriert. Der Epic-Check für kleine funktionierende
Inkremente, Reihenfolge und Abschlussbedingungen sowie die Einzelprüfung aller
Enabler fehlen. Keine der zehn Quellen wird deshalb pauschal als vollständig
gedeckt ausgegeben. In diesem Quellbereich ist keine neue fachliche
Nutzerentscheidung erkennbar; die ausstehenden Punkte sind Planungsarbeit.
Implementation Verification bleibt gesondert offen.

`update-scrum-review-progress.py` wurde ausgeführt. Der Standard-Strukturprüfer
stoppt weiterhin an der fest kodierten alten PKG-014-Erwartung; sein Lauf ist
kein PASS. Die ergänzende lesende Strukturprüfung bestand: zehn aktuelle
Originalquellen, 21 Kandidaten und Quell-Hashes, zehn Registeranker, 57 Stories
mit Epic-Eltern, sämtliche Task-Eltern sowie vier Entwurfs- und drei
Story-Katalog-Zielstellen. Das ist keine fachliche Gesamt-Coverage- oder
Implementation Verification. Originalquellen, Reviews, `controller-state.json`,
Produkt und Live-Stand blieben unverändert.

### COVERAGE-R1-002 · gezielte Planungsreparatur SRC-0528–SRC-0780

Die zehn Originalblöcke aus `reviews/COVERAGE-R1-002-input.json` wurden mit ihren unveränderten Quell-Hashes und den **aktuellen** Story-AC/Constraints verglichen. Elf Klauseln erhielten konkrete Deckung: SRC-0529.c, SRC-0530.n/p, SRC-0532.l/m und SRC-0631.a/b sowie SRC-0635.a–d. ST-WEB-03 verlangt nun einen vollständigen aktuellen Planregister- und Detailgenerator-Regressionslauf; ST-WEB-06 trägt fertig beauftragte Ausrüstungsprofile jenseits der Radseiten mit Lesestruktur und Intro-Raster. Die Quellblöcke SRC-0529/0530/0532/0631/0635 sind deshalb planerisch `Covered`; die datierten Fehl- und Teststände sind damit nicht als behoben verifiziert.

Offen bleiben: genaue Hash-Zuordnung der sichtbaren Bildfassungen aus SRC-0528.a; getrennte Alters-, Anonymisierungs- und Publikationsentscheidung für Nr. 63/69; die Sichtabnahme der heutigen Scott-Komposition samt Seitenkörper aus SRC-0529/0532; Cockpit-Kennzeichen-zu-Backlog/Fast-Track-Regel aus SRC-0562.c; die genau drei historisch freigegebenen Kinderbilder und heutige 13er-Kajak-Auswahl aus SRC-0658.c; der Widerspruch zwischen 8–11 und älteren 24 GCS-Stunden aus SRC-0753.a; sowie das Veröffentlichungsereignis für die Website-Ergänzung aus SRC-0780.a. Diese Fragen sind keine stillschweigenden Freigaben. SRC-0529.c und die alten Planregister-/Generatorfehler sind nun als Planung gedeckt, ihre tatsächliche Umsetzung bleibt `Implementation Verification`.

`update-scrum-review-progress.py` wurde ausgeführt; die atomare Fortschrittsübersicht ist aktualisiert. Der Standard-Strukturprüfer stoppt weiterhin an seiner fest kodierten alten PKG-014-Erwartung (`SRC-0464.i` und weitere nach COVERAGE-R1-001 reparierte Klauseln); dieser Lauf ist kein PASS. Die zusätzliche lesende Strukturprüfung bestand für zehn unveränderte Originalblöcke und ihre SHA-256-Hashes, 95 Kandidaten, alle aktuellen Zielanker, fünf Matrix-Deckungen sowie Epic-/Story- und Story-/Task-Elternschaft. Sie prüft keine Code-, Bild- oder Live-Implementierung. Der aktive Ausbauplan bleibt maßgeblich; weder Produkt noch Originale, Reviews, `controller-state.json` oder Live-Stand wurden geändert.

- Das bestehende `source-inventory.csv` umfasst 2.414 Originalblöcke; 1.105
  sind in `traceability-matrix.csv` als relevant markiert. Der vorherige
  Nenner 1.101 stieg genau um `SRC-0383`, `SRC-0384`, `SRC-0415` und
  `SRC-0416`: Diese vier bereits vorhandenen Quellblöcke waren irrtümlich
  ausgeschlossen und enthalten bindende Analytics- bzw. CMS-Regeln. Es wurden
  dafür keine neuen Quellen aufgenommen oder IDs umnummeriert.
- `source-inventory.csv` SHA-256:
  `2126721b96ee40cceecf621509295d3454ecbde1dd76eb40cb6abdaad07093b2`.
  Die Originaldateien bleiben unverändert. `atomic-requirements.csv` enthielt
  zu Beginn dieses Auftrags 2.908 ursprüngliche Kandidaten sowie 54
  dokumentierte Nachfolger aus Teilungen. Der Kandidatenzuwachs der früheren
  Durchläufe entstand aus Klauseln innerhalb der vorhandenen Quellen:
  15 aus `SRC-0383/0384`, elf aus `SRC-0415/0416`.
- Der fachliche Stand wurde durch
  `python tools/verify-scrum-review-progress.py` strukturell bestätigt:
  154 von 1.105 Blöcken, 486 von 2.908 ursprünglichen Kandidaten,
  `PKG-001` bis `PKG-013`. Die Prüfung ersetzt
  keine eigene semantische Nachprüfung bereits belegter Pakete.
- PKG-013 umfasst SRC-0448 bis SRC-0459 (zwölf Originalblöcke,
  65 ursprüngliche Kandidaten und vier Nachfolger aus SRC-0450.a und
  SRC-0459.b). Der Tail-Lauf prüfte SRC-0458/0459 selbst gegen den
  unveränderten Originalblock und die inzwischen geänderten Zielstellen.
  Drei Kandidaten aus SRC-0452 sind nur teilweise gedeckt:
  Einzelbildfreigaben und die spätere Entfernung von „Gemeinsam am Fluss“
  benötigen Nachweise. **PKG-013 ist nicht bestanden**; die Markierung
  bezeichnet individuelle fachliche Prüfung, keine vollständige Deckung.
- SRC-0458 führt den früheren EN-/DE-Live-Test als historischen Beleg;
  heutige Inhaltsseiten, gespeicherte Sprachwahl und Riverstar auf
  `kajak.html` stehen im Plan-AC. Die früheren Übersichtsrouten sind
  Redirects. SRC-0459 bindet lokale Gesamtvorschau, ausdrückliche
  Nutzerabnahme des konkreten Release-Umfangs und bestandene Checks
  nacheinander; Trulli V11 allein ist keine Release-Freigabe. Für diesen
  Tail-Lauf wurden weder Implementierung noch Live-Zustand geprüft.
- `DEC-REL-001/002/003` klären drei bisher offene Release-Klauseln. Ihre
  Originaltexte und Nachfolgeregeln stehen in `release-decisions.md`.
- PKG-014 umfasst SRC-0460 bis SRC-0469: zehn Originalblöcke, 126
  ursprüngliche Kandidaten und zwei Nachfolger aus SRC-0460.e. Die
  Klauselprüfung trennt datierte Evidenz, aktuelle Planung und gesonderte
  Implementierungs-/Live-Prüfung. Nach COVERAGE-R1-001 bleiben zwei Kandidaten
  teilweise gedeckt: SRC-0464.f und SRC-0466.s. Die anderen sechs wurden
  durch spätere Quellen eng eingeordnet. **PKG-014 ist nicht bestanden.**
  Das Vorbeginn-Gate, Kajak-zuerst-Reihenfolge, Bild-/Variantenfreigaben und
  der konkrete Release-Umfang sind im Entwurf verankert, aber nicht als
  umgesetzt, freigegeben oder live verifiziert ausgewiesen. Der aktive
  `docs/ausbauplan.md` bleibt maßgeblich.
- PKG-015 umfasst SRC-0470 bis SRC-0479: zehn Originalblöcke, 15
  ursprüngliche Kandidaten und acht Nachfolger aus vier Teilungen. Die
  Brief- und Paketkriterien für VAN, EXPLORE und MOVE sowie das Phase-0-Gate
  stehen konkret im Scrum-Entwurf. Der Widerspruch zwischen 8–11 Zielstunden
  im aktiven Gesamtplan und 24 geschätzten Stunden im älteren README bleibt
  bei SRC-0753.a als `PUBLICATION_DECISION` offen. `SRC-0470.a2` ist nach
  COVERAGE-R1-052 planerisch gedeckt; PKG-015 ist keine Produktabnahme. Historische
  Quellstände, geplante Arbeit, Implementierung, Freigabe und Live-Nachweis
  bleiben getrennt; für dieses Paket wurde nur die Planung geprüft.
- PKG-017 umfasst SRC-0490 bis SRC-0499: zehn aktuelle Originalblöcke und
  17 individuell geprüfte Kandidaten. Planner-/Board-Trennung, Importgrenze,
  Admin-Trennung, Trends, Planmetriken und Cockpit-Workflow sind im Entwurf
  konkretisiert. Der Reach-Report vom 23.09.2026 ist historischer Quellstand.
  COVERAGE-R1-001 ordnet die bereichsübergreifende Test- und Restore-Suite
  ST-BRD-01/02/03/04 und TASK-COVR1-01 bis -04 zu; SRC-0491.a ist damit
  planerisch gedeckt. **PKG-017 ist nicht als Produktabnahme bestanden.**
  Die Planprüfung belegt weder Implementierung noch
  Release-Freigabe oder Live-Stand; `docs/ausbauplan.md` bleibt aktiv.

## Ausführung und Grenzen

### Historischer COVERAGE-R1-001-Nachtrag · SRC-0452–SRC-0522

Die heutige Eingabedatei `reviews/COVERAGE-R1-001-input.json` umfasst
ausschließlich SRC-0800–SRC-0809 (siehe Nachtrag oben); der ältere Umfang ist
in `reviews/COVERAGE-R1-001-repair.md` dokumentiert. Die folgende Zeile
beschreibt ihren damaligen Prüfstand.

Die damaligen zehn Originalblöcke wurden gegen die seinerzeit aktuellen Story-AC, Constraints und späteren Entscheidungen verglichen. Elf zuvor offene Klauseln sind jetzt planerisch gedeckt: SRC-0464.i/m/af/ah/am und SRC-0466.aa durch den zeitlich späteren, eng begrenzten Quellbezug SRC-0512/SRC-0660; SRC-0491.a, SRC-0508.j/k, SRC-0509.a und SRC-0514.a durch konkrete AC- und Task-Zuordnung. Die ältere Fahrzeug-Sperrformulierung wird für die genau benannten Bestandsfassungen nicht als neue Nutzerfrage geführt. Kein Bild und kein Release wurde hier freigegeben.

**Offene Nutzerfragen im bearbeiteten Umfang, einzeln:**

1. SRC-0452.f/g und SRC-0464.f: Welche konkreten Fassungen der verbleibenden 13 Kajak-Kacheln einschließlich der zwei bestätigten ZIP-Rückansichten werden nach Sicht der aktuellen Galerie ausdrücklich abgenommen? Die frühere 14er-Angabe genügt nicht.
2. SRC-0482 (historisch offene Frage; durch `UD-2026-09-26-16` teilweise beantwortet): Sieben benannte Policy-Bereiche sind schriftlich teilabgenommen. Die Gesamt-Phase-0-Abnahme sowie technische Nachweise bleiben offen; produktive Board-Karten, Warnungen und Marvin-Schreibrechte bleiben bis zu den dafür nötigen Gates gesperrt.
3. SRC-0504.b: Wird die vorgelegte Gestaltung mit feineren Galerie-Captions, kleineren Lupen und zentrierten Pfeilen für die betroffenen Galerien abgenommen? Bis dahin ist sie keine neue Guide-Regel.
4. SRC-0522.g, Nr. 63: Handelt es sich um ein erkennbares Kind, welche eng begrenzte Anonymisierung ist nötig, und wird genau dieses Bild ausdrücklich zur Veröffentlichung ausgewählt?
5. SRC-0522.g, Nr. 69: Handelt es sich um ein erkennbares Kind, welche eng begrenzte Anonymisierung ist nötig, und wird genau dieses Bild ausdrücklich zur Veröffentlichung ausgewählt?

**Verbleibende Deckungs- oder Beleglücken, einzeln:**

1. SRC-0452.f: Die zwei bestätigten ZIP-Rückansichten brauchen eine eindeutige Zuordnung zu heutigen Fassungen und Einsatzzwecken.
2. SRC-0452.g: Der ZIP-Chat belegt keine Einzelfreigabe der weiteren Kajakbilder.
3. SRC-0452.h: Die lokale Entfernung von „Gemeinsam am Fluss“ ist datiert belegt; der beabsichtigte Release-Stand samt verbliebenen Varianten ist noch zu verifizieren.
4. SRC-0464.f: Die 13 verbliebenen Kajak-Kacheln haben keine belegte neue Gruppenabnahme.
5. SRC-0466.s: Historische Exportparameter und finale Einzelbildabnahmen der übrigen Fahrzeugvarianten sind nicht belegt; fehlende Parameter werden nicht erfunden.

Die Planung ist damit für die reparierten Klauseln gedeckt; Implementierung, Bildsichtprüfung, schriftliche Entscheidungen, Release-Freigabe und Live-Verifikation sind eigene offene Achsen. `docs/ausbauplan.md` bleibt aktiver Plan. Der vorhandene Strukturprüfer enthält feste Erwartungen für alte `Partially Covered`-Mengen und stoppt nach diesen Statusänderungen an SRC-0491.a; die aktuelle Struktur wurde deshalb zusätzlich mit einem kennungs- und zielbasierten Lesetest geprüft. Dieser Prüfblocker ist kein fachlicher Coverage-PASS.

Native Unteragenten prüfen getrennte Pakete schreibgeschützt gegenüber den
zentralen Migrationsdateien und speichern Berichte unter `reviews/`. Der
Hauptagent prüft Befunde und übernimmt nur belegte Korrekturen. Für längere
Fortsetzung ist die vorhandene, mit der bestehenden Anmeldung getestete
Codex-CLI (`codex exec`) vorgesehen. Die laufende lokale Steuerung speichert
Zustand und stoppt bei Abbruch, Authentifizierungs-/Nutzungslimit oder
wiederholtem fehlendem Fortschritt. Ein Reviewbericht allein erhöht keinen
geprüften Zähler.

Der Read-only-Abschlussaudit beginnt erst nach vollständiger fachlicher
Prüfung und prüft Original und aktuelle Zielstelle erneut. Audit-PASS setzt
vollständige belegte Deckung und keine relevanten offenen Entscheidungen
voraus. Produktcode, Originalpläne, Datenbanken und Bilder bleiben außerhalb
dieses Laufs; es gibt keinen Release und kein Deployment.

- PKG-018: SRC-0500–SRC-0509, zehn Originalblöcke und 67 Kandidaten einzeln geprüft; 13 Nachfolger aus vier zusammengesetzten OPS-Klauseln. COVERAGE-R1-001 ordnet die Restzentralisierung nach Kajak/Fahrzeug, Reiseberichten und Radprofilen konkreten Story-Slices zu. Ihre tatsächliche Abschnittsinventur und Umsetzung bleiben offen. Die Galerievorschau braucht weiterhin ausdrückliche Designabnahme. **PKG-018 ist nicht bestanden.** Historische lokale Befunde, Planung, Design-/Release-Freigabe und Live-Stand sind getrennt; Produkt und Live-System wurden nicht geprüft.
- PKG-020: SRC-0520–SRC-0529, zehn Originalblöcke und 67 ursprüngliche Kandidaten individuell gegen Original und aktuelle AC geprüft. Die zehn zuvor paraphrasierten SRC-0522-Segmente sind jetzt wortgetreue Originalabschnitte. Release-, Bild- und Scott-Ziele wurden präzisiert; historische Technik- und Vorschauergebnisse bleiben zeitgebunden. Zwei Entscheidungen zu Nr. 63/69 sind Unresolved; die genaue sichtbare Fassungs-/Hashmenge und Scotts Restabschnitte bleiben Partially Covered. **PKG-020 ist nicht bestanden.** Nur Planning Coverage wurde geprüft; keine Produkt-, Bild- oder Live-Verifikation und keine neue Release-Freigabe. `docs/ausbauplan.md` bleibt aktiv.
- PKG-022: SRC-0540 und SRC-0548–SRC-0562, 16 Originalblöcke mit 63 ursprünglichen Kandidaten und 65 semantischen Nachfolgern einzeln gegen die aktuellen Originale, den Review und die inzwischen geänderten Zielstellen geprüft. Scott-Text wurde ST-WEB-05, Archivschutz zusätzlich ST-PHOTO-01, Google-Login ST-AUTH-01 zugeordnet. Release-/Monitor-Gates sind in ST-OPS-01 konkretisiert; der Cockpit-Board-Scope ist in ST-BRD-03 getrennt von Fahrzeugwarnungen beschrieben. Die gemeinsame Prioritätsregel für die fünf Cockpit-Kennzeichen ist **Unresolved**; der Kanal bleibt aus. **PKG-022 ist nicht bestanden.** Geprüft ist ausschließlich Planning Coverage; Produktcode, Bildbestand, aktuelle Live-Implementierung und neue Veröffentlichungsfreigabe wurden nicht geprüft. `docs/ausbauplan.md` bleibt aktiv.

## Parallelisierung ab 25. September 2026

Nach kontrolliertem Stopp des seriellen Controllers bei 204/1.105 Blöcken und
733/2.908 ursprünglichen Kandidaten wurde die Fortsetzung auf
`tools/parallel-scrum-migration.py` umgestellt. Die gespeicherte
`review-queue.json` enthält 36 nicht überlappende Prüfpakete für die
verbleibenden 901 relevanten Blöcke und 2.175 ursprünglichen Kandidaten.
Bereits vorliegende getrennte Berichte zu PKG-019 bis PKG-021 werden genutzt;
die neuen Pakete liegen meist bei ungefähr 50–65 Kandidaten. Komplexe
Quellen werden enger begrenzt. Die Paketdateien werden vor Schreibbeginn
eingefroren; der Integrator prüft zwischenzeitlich geänderte Zielstellen
erneut. Bis zu vier Codex-CLI-Review-Worker lesen parallel und schreiben nur
ihre eigenen Befunde. Genau ein Coordinator-Integrator schreibt nacheinander
in die zentralen Migrationsdateien. `controller-state.json` zeigt aktive
Worker, Paket-IDs, Kandidatenzähler, Deckungslücken und Entscheidungsfragen.
Ein Reviewbericht erhöht noch keinen geprüften Zähler. Der unabhängige
Read-only-Abschlussaudit bleibt an die vollständige Klauselprüfung gebunden.

## Batch-Integration ab 25. September 2026

Nach Abschluss von PKG-029 wurde die Steuerung am Paketende umgestellt; die
bereits integrierten Pakete bleiben abgeschlossen. Zum Wechsel waren 25 fertige
Review-Pakete mit 1.456 Kandidaten zentral noch nicht übernommen. Die Review-
Queue war leer; kein bereits geprüftes Paket wurde zur Wiederholungsprüfung
eingeplant. Der Coordinator bündelt jetzt fünf bis zehn fertige Pakete bzw.
300–600 Kandidaten, validiert Kandidaten-IDs paketweise und aktualisiert die
Gesamtzählungen/Traceability einmal pro Batch. Eine getrennte Integration-
Queue und deduplizierte Entscheidungsdatei halten den laufenden Stand fest.
Neue Review-Berichte erhalten maschinenlesbare JSONL-Zeilen je Kandidat.
Der Final Audit und die bestehenden Freigabegates bleiben unverändert.


## Verifizierter Batch-Stand am 25. September 2026

PKG-030–PKG-034 (305 Kandidaten) und PKG-035–PKG-039 (282 Kandidaten) sind
zentral integriert. Die strukturelle Prüfung bestätigte Originalwortlaut,
Candidate-IDs und Zielreferenzen; zehn zusammengeführte Nachfolger wurden auf
numerische Nachfolger-IDs normalisiert. Damit sind 2.039 von 2.908
ursprünglichen Kandidaten geprüft und integriert; 869 ungeprüfte Kandidaten
in PKG-040–PKG-054 stehen für die Integration von Review-Befunden bereit. Die
Review-Queue ist leer. Es wurden keine Originalpläne, Produktdateien, Bilder
oder Datenbanken verändert. Der unabhängige Final Audit hat noch nicht begonnen.


## Batch-003 nach struktureller Nachkorrektur

PKG-040–PKG-044 enthalten 318 bereits fachlich geprüfte Kandidaten. Die
Integration wurde nach einem ungültigen generischen Plananker zunächst vom
Strukturcheck zurückgewiesen. Der Coordinator hat die Ziel-IDs ausschließlich
aus den bereits fachlich geprüften PlanningMapping-Feldern übernommen und als
`#Acceptance-Criteria` verankert. Danach bestehen die vollständigen
Strukturprüfungen. Insgesamt sind nun 2.357 Kandidaten integriert; 551 bereits
geprüfte Kandidaten aus PKG-045–PKG-054 warten auf Integration. Noch ungeprüfte
Review-Kandidaten: 0. Der Final Audit hat nicht begonnen.


## Batch-004 – zentraler Status repariert

PKG-045–PKG-049 integrieren 287 Kandidaten. Die Kandidaten- und Zielprüfungen
waren erfolgreich; der Lauf hielt an, weil `Integrated` im JSON-Bericht als
Zahl statt Boolean ausgegeben wurde. Der Coordinator hat die fünf Statusobjekte
anhand des gespeicherten Paketberichts in das verbindliche Schema überführt.
Der globale Strukturverifier besteht nun mit 965 Originalblöcken und
2.644/2.908 integrierten Kandidaten. PKG-046, PKG-047 und PKG-048 bleiben
wegen fünf konkreten Planentscheidungen als `NEEDS_DECISION` markiert. Das
Review wurde nicht wiederholt.


## Controller-Recovery am 25. September 2026

Der folgende Recovery-Bericht ersetzt die vorherigen laufenden Zwischenstände
als aktuelle Zählreferenz; die oben stehenden Batch-Abschnitte bleiben historische
Zeitpunkte. BATCH-004 stoppte, weil `Integrated` im Statusobjekt als Zahl statt
Boolean geliefert wurde; der gespeicherte Status wurde anhand von Bericht und
zentralen Kandidaten auf das erwartete Schema gebracht. BATCH-005 hatte seine
264 Kandidaten bereits in die Zieltabellen geschrieben; der Underflow entstand
durch einen veralteten Pending-Zähler und führte zu keiner fehlenden Integration.

Der Kandidatenabgleich bestätigt 2.908 eindeutige Originalkandidaten ohne
Duplikat oder fehlende ID: 2.908 integriert, 0 geprüft aber nicht integriert,
0 verbleibend. Die 356 Nachfolger werden separat gezählt. 1.105 von 1.106
relevanten Quellenblöcken besitzen Kandidatenreviews. Nach den gezielten Coverage-Reparaturen sind aktuell 586 deduplizierte
Fragegruppen klassifiziert: 22 `USER_DECISION`, 3 `AUTO_RESOLVABLE`, 554
`TECHNICAL`, 7 `INSUFFICIENT_EVIDENCE` und 0 eigenständige `DUPLICATE`-Gruppen.
Die offenen Coverage-Lücken betragen aktuell 648 über Kandidaten und Nachfolger.
PKG-040 bleibt `NEEDS_DECISION`; PKG-045 ist `INTEGRATED`, PKG-046–048 sind
`NEEDS_DECISION`, PKG-049 ist `INTEGRATED`, PKG-050–051 sind `NEEDS_DECISION`, PKG-052 ist
`INTEGRATED`, PKG-053–054 sind `INTEGRATED` mit einer gezielten Evidenzprüfung.
Alle Paketstatus sind valide; alle Reviews PKG-045–054 bleiben erhalten.
Review- und Integration-Queues sind leer. Es gibt keinen nächsten Paketlauf;
gezielte Coverage-Reparatur folgt nach Bearbeitung der offenen Entscheidungen,
technischen Nachweise und Evidenzlücken. Final Audit: `NOT_STARTED`.
Siehe `reviews/recovery-report.md` und `user-decisions.json`.


## Coverage-Reparatur – aktueller Checkpoint

**COVERAGE-R1-010 (SRC-0910–SRC-0921, nur Input-Umfang):** Zehn
Originalblöcke und 20 atomare Klauseln mit aktuellen Zielstellen abgeglichen.
Alle 20 Klauseln haben konkrete Plan-AC oder einen eindeutigen Quellenstatus;
keine offene Nutzerentscheidung und keine Planning-Coverage-Lücke in diesem
Umfang. Die Fortschrittsaktualisierung wurde ausgeführt. Implementation
Verification, Bild-/Release-Freigabe und Live-Prüfung wurden nicht durchgeführt;
der aktive Ausbauplan bleibt maßgeblich und der globale Check offen.

**COVERAGE-R1-009 (SRC-0899–SRC-0909, ohne SRC-0906):** Die zehn
Originalblöcke und 24 atomaren Kandidaten wurden gegen den aktuellen
Scrum-Entwurf geprüft. 22 zuvor teilgedeckte Klauseln haben nun konkrete
Story-AC oder projektweite Abschlussbedingungen; SRC-0905.a und SRC-0907.c
waren bereits gedeckt. Im Umfang verbleiben keine offenen Planning-Coverage-
Klauseln und keine neue Nutzerentscheidung. Die Fortschrittsaktualisierung
und Strukturprüfung bestanden (1.105 Blöcke, 2.908/2.908 ursprüngliche
Kandidaten). Implementation Verification, konkrete Bild-/Design-/Release-
Freigaben und Live-Verifikation wurden nicht durchgeführt. Der globale
Migrationscheck bleibt offen; `docs/ausbauplan.md` bleibt der aktive Plan.

COVERAGE-R1-001 bis R1-003 sowie R2-001 haben 40 Originalblöcke und 291 Kandidaten
gegen aktuelle Plan-AC, Constraints und spätere Quellen geprüft. 33 zuvor offene
Klauseln sind nun planerisch gedeckt; darunter SRC-0491.a sowie SRC-0508.j/k und
SRC-0509.a. Offen bleiben konkrete Story-Slices für INVEST/Enabler, SRC-0464.f,
SRC-0466.s und die ausdrückliche Designabnahme für SRC-0504.b. Die Ergebnisse
trennen Planabdeckung von Umsetzung, Freigabe und Live-Verifikation.

Der damalige Statusabgleich wurde auf 838 aktive, klassifizierte Fragegruppen und 17
Nutzerentscheidungen synchronisiert. Die erste Reparaturrunde ist abgeschlossen;
30 Quellblöcke sind als bereits gezielt geprüft gespeichert, sodass die
Fortsetzung sie nicht erneut bearbeitet. Der Controller steht kontrolliert auf
`coverage_blocked`; der unabhängige Final Audit ist weiterhin `NOT_STARTED`.

**COVERAGE-R1-017 (SRC-1069–SRC-1080, zehn relevante Originalblöcke, 21 Kandidaten):** Originalquellen und aktuelle Zielstellen direkt abgeglichen. 15 fachliche Klauseln haben konkrete AC/Constraints; sechs Audit-Fragmente bleiben datierter Kontext. Keine neue Nutzerfrage oder identifizierte Planungslücke in diesem Umfang. Historische Phasen und Auditwerte sind keine aktuelle Live- oder Release-Abnahme. Implementation Verification bleibt offen; der globale Migrationscheck bleibt offen.

**COVERAGE-R1-026 (SRC-1170–1179):** Original und aktuelle ST-INS-01-Zielstellen direkt geprüft. Zwölf fachliche Klauseln besitzen konkrete Plan-AC/Prüftasks, drei Fragmente bleiben verbunden. Keine offene Nutzerentscheidung oder Planning-Coverage-Lücke in diesem Umfang. Fortschrittsaktualisierung ausgeführt; Implementation Verification, Freigabe und Live-Nachweis bleiben offen. Der globale Migrationscheck ist nicht abgeschlossen.

**COVERAGE-R1-036 (SRC-1423–1432):** Zehn Originalblöcke und 25 Klauseln direkt mit den aktuellen konkreten Web-Story- und Constraint-Zielen abgeglichen. Die fachlichen Planungslücken sind durch AC-COVR1-036-01–06 gedeckt; SRC-1430.b bleibt die Kontextabgrenzung, dass verschiedene Textlängen keine gleiche Seitenhöhe verlangen. Keine konkrete neue Nutzerentscheidung oder weitere Planning-Coverage-Lücke in diesem begrenzten Umfang. Umsetzung, aktuelle Tests, Freigaben und Live-Zustand sind nicht verifiziert; der aktive Ausbauplan und der globale Migrationscheck bleiben offen.

**COVERAGE-R1-040 (SRC-1466, 1468–1476):** Zehn Originalblöcke und 17 Klauseln mit aktuellen Matrix-AC und drei Prüftasks planerisch gedeckt. Keine konkret entscheidbare Nutzerfrage oder verbleibende Planning-Coverage-Lücke in diesem Umfang. Die Nachweismatrix selbst, Implementation Verification, tatsächliche Freigaben und Live-Verifikation bleiben offen; docs/ausbauplan.md bleibt aktiv.

**COVERAGE-R1-042:** SRC-1658–1804 im beauftragten Teilumfang fachlich gegen aktuelle Zielstellen geprüft. Marvin-Verbot und späterer Entscheidungs-Task sowie dauerhafte EPIC-VIDEO-Gates planerisch ergänzt. Offen: drei Entscheidungen nach realer Marvin-Nutzung und die Ausnahme-Reichweite SRC-1799/1800. Künftige Video-Stories brauchen konkrete Prüfschritte. Implementation Verification und Live-Verifikation nicht durchgeführt; Scrum-Entwurf ersetzt den aktiven Plan nicht.
**COVERAGE-R1-046 (SRC-1835–1844):** Zehn README-Originalklauseln direkt mit den aktuellen Constraint-Ankern und EPIC-VIDEO verglichen. Die sechs AC `AC-COVR1-046-01–06` präzisieren die künftige Video-Story-Prüfung; zehn Klauseln planerisch gedeckt, keine neue Nutzerentscheidung und keine verbleibende Planning-Coverage-Lücke im Paket. `SRC-1799` bleibt als echte Nutzerentscheidung zur Reichweite der Website-/Cockpit-/Deployment-Ausnahme offen; keine Ausnahme vor Entscheidung. Implementation Verification, Original-/Privacy-Prüfung, Freigaben und Live-Zustand nicht durchgeführt. Fortschritt aktualisiert; Strukturprüfung PASS (1.105 Blöcke, 2.908/2.908 ursprüngliche Kandidaten, 356 Nachfolger, 58 Stories). Gesamtmigration offen.

**COVERAGE-R1-047 (SRC-2042, SRC-2247):** Zwölf atomare historische Klauseln direkt mit analysis.md:308, README.md:333 und aktuellem ST-VID-01 verglichen. AC-COVR1-047-01–03 erhalten Methode und begrenzten Privacy-Befund, v18-exklusives Label samt 666-Frame-Limit, getrennte Original-/Resolve- und Versionsstände sowie Helmuts datierte Publikationsanweisung und damalige Live-Prüfung. Zehn Klauseln planerisch gedeckt; SRC-2042.e und SRC-2247.d bleiben wegen derselben Nutzerfrage Unresolved: Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt sechs Einzelbildern als geforderte visuelle Endkontrolle der vollständigen öffentlichen v18-Fassung? Keine weitere Deckungslücke in diesem Teilumfang. Implementation Verification, aktuelle Privacy-/Originalprüfung und heutiger Live-Zustand nicht durchgeführt; keine neue Freigabe. Gesamtmigration offen.
### COVERAGE-R1-049 · gezielte fachliche Nachprüfung SRC-0794–0803

Die 15 im Input `reviews/COVERAGE-R1-049-input.json` benannten Klauseln
wurden mit der aktuellen Scrum-Planungsregel, dem projektweiten Gate im
`scrum-plan-draft.md` und den zehn Originalankern im `constraint-register.md`
abgeglichen. Alle 15 sind als **Planning Coverage Covered** zugeordnet:
INVEST vor Einplanung, Independent, Negotiable, Valuable, Estimable, Small,
Testable, Ready-Korrektur, AC-Qualität und DoD für jedes abgeschlossen
gemeldete Inkrement stehen ausdrücklich im Entwurf. Die frühere Kennzeichnung
`Partially Covered` vermischte diese Planvorgabe mit ihrer noch nicht
belegten Anwendung. Atomare Zuordnung, Quellmatrix und Register wurden
gezielt korrigiert; die älteren PKG- und Review-Aussagen bleiben Historie.

Offen als technische Planungsarbeit und Evidenz: Einzelabgleich des
Story-Bestands auf alle INVEST-Merkmale, Dependencies, Nutzen, Umfang,
Teilungsbedarf, AC-Grenzfälle und bindende Quellen; DoD-Belege je tatsächlich
abgeschlossen gemeldetem Inkrement. Die Story-Aufteilung von ST-CON-01 und
der weitere Strukturcheck aus COVERAGE-R1-048 bleiben gesondert offen.
Keine neue Nutzerentscheidung wurde aus diesen 15 Klauseln abgeleitet.
Vorhandene `PRE_FINAL_AUDIT_DECISION`-, `PUBLICATION_DECISION`- und
`DEFERRED_POST_PILOT`-Holds bleiben getrennt und unbeantwortet. Betroffene
Veröffentlichung bleibt bis zur jeweiligen Freigabe ausdrücklich gesperrt;
B- und C-Holds blockieren den technischen Final Audit nicht. Keine
Implementierungs-, Produkt-, Bild-, Datenbank- oder Live-Verifikation.
`docs/ausbauplan.md` bleibt aktiver Plan; der globale Migrationscheck ist
weiter offen.

Fortschrittsaktualisierung ausgeführt. Die lokale Strukturprüfung meldete
PASS für 1.105 Quellblöcke, 2.908/2.908 ursprüngliche Kandidaten, 356
Nachfolger und 58 Stories. Der fokussierte Abgleich bestand für 15 Klauseln,
zehn Quellblöcke, aktuelle Quell-Hashes, Registeranker und Entwurfsgate;
`git diff --check -- docs/scrum-migration` bestand. Dies prüft Struktur und
gezielte Planungsdeckung, keine tatsächliche Story-Anwendung oder Umsetzung.

## COVERAGE-R3-001 · historischer Zwischenstand (durch R4 abgelöst)

Der damalige Status `NOT_READY` und die dort genannten fünf offenen Slice-Befunde wurden durch `COVERAGE-R4-001` bearbeitet. Maßgeblich ist der nachfolgende R4-Readiness-Stand; der R3-Paketbericht bleibt unverändert als historische Evidenz erhalten.

## COVERAGE-R4-001 · bereit für unabhängigen Final Audit

Die fünf project-wide INVEST-/Vertical-Slice-Befunde sind geschlossen. EPIC-CONTENT enthält getrennte Story-Slices für Longform, Short 1, Short 2, Website-Ergänzung und 28-Tage-Review für VAN, EXPLORE und MOVE; separate Abhängigkeiten und Veröffentlichungsgates bleiben erhalten. Die technischen Fragen `SRC-0788`/`SRC-0791` sind geklärt. Die fünf Evidenzfälle bleiben als `PUBLICATION_DECISION`/Versionsnachweis offen und sind ausdrücklich nicht Final-Audit-blockierend. Coverage: 18 dokumentierte Restzeilen, davon 0 auditrelevant-reviewable; technische Fragen: 0; Final Audit Readiness: `READY_FOR_FINAL_AUDIT`; Final Audit: `NOT_STARTED`. Ergebnis und Slice-Matrix: `reviews/COVERAGE-R4-001-review.md`.


## Targeted Final Audit recovery - SRC-0968 (2026-09-26)

The exact source block at `docs/seo.md:17` was reviewed. Historical `PKG-034-review.md` called out the build/export omission but had no atomic candidate rows; that report remains unchanged. Five new IDs (`SRC-0968.a` through `.e`) preserve the source exactly and cover implementation context, build, automatic export, tests, and live verification. Story AC, `TASK-FA-0968-01`, matrix, and reverse traceability are updated. Current implementation, test execution, and live state remain unverified. A full Final Audit retry has not run; the previous result remains `FINAL_AUDIT_FAIL`.


## Final Audit R3 and plan promotion — 2026-09-26

`FINAL_AUDIT_BLOCKED`. The migration verifier rejected the attempted source-rule path edits because source SHA-256 evidence changed. The plan promotion was rolled back, and `docs/scrum-plan-draft.md` remains unpromoted. The verifier still reports a source SHA-256 mismatch for `SRC-0001.a` / `AGENTS.md`. The full audit verified source/candidate coverage, successors, source-to-candidate-to-story traceability, all 75 stories and 11 epics, 256 tasks, acceptance criteria, dependencies, decision classifications, counters, project references, migration verifier and `git diff --check`. The central plan is `docs/scrum-plan-draft.md`; active references and the plan register were updated after the pass. Historical source plans and audit/recovery/package reports remain preserved. Phase 0 is still only partially accepted; publication/version holds, deferred post-pilot items, release approvals and live verification remain separate.
## Aktueller Migrations-/Preflight-Stand · R6 · 26.09.2026

`FINAL_AUDIT_PREFLIGHT_BLOCKED`: alle 20 Prüfbereiche sind gelaufen (11 PASS, 5 WARNING, 4 BLOCKER); der aktuelle vollständige unabhängige Final Audit wurde nicht gestartet. Source Inventory: 2.414 IDs, davon 1.136 relevant; Original-Candidates: 2.943/2.943 geprüft; Successors: 403; Stories/Epics/Tasks: 75/11/256. Verbleiben 27 Coverage Findings, davon 12 reviewable und auditrelevant. Technische Fragen: 0; echte Nutzerentscheidungen: 13 (10 Publication, 3 Deferred); fünf Evidenz-Holds betreffen ausschließlich Veröffentlichung. Source Integrity: 22/22 Pfade klassifiziert (12 BYTE_VERIFIED einschließlich wiederhergestellter historischer AGENTS-Baseline, 5 FORMAT_ONLY_VERIFIED, 4 SEMANTIC_BASELINE_VERIFIED ohne Byte-Claim, 1 NON_SEMANTIC_STRUCTURAL_DIFFERENCE).

Der Draft bleibt unter `scrum-migration/scrum-plan-draft.md`; `docs/scrum-plan.md` wurde nicht angelegt. Vollständige Bereiche und Blocker: `reviews/FINAL-AUDIT-PREFLIGHT-EXHAUSTIVE-2026-09-26.md`; Integritätsnachtrag: `reviews/SOURCE-INTEGRITY-RECOVERY-R6-2026-09-26.md`. Alle darunter folgenden COVERAGE-/Recovery-Angaben sind historische Einzelstände und keine aktuellen Gesamtzähler.
