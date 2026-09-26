## Review PKG-046

**Umfang:** SRC-1504 bis SRC-1527 vollständig geprüft: **24 Originalblöcke, 65 Klauselkandidaten**. Gelesen wurden die Originaldateien, die zugeordneten Abschnitte in `scrum-plan-draft.md` und `constraint-register.md`, `AGENTS.md`, die Scrum-Planungsregel und `release-decisions.md`. Es wurden keine Dateien geändert.

**Ergebnis:** Der Registertext bewahrt den Originalwortlaut überwiegend, stellt aber allein noch keine Planning Coverage her. In den drei geprüften Stories fehlen die Quellen SRC-1504–1527 in den Ursprunglisten und ihre Anforderungen größtenteils in den Acceptance Criteria. Die pauschalen Anwendungen auf `ST-PHOTO-01`, `ST-BRD-03` und `ST-BRD-04` sind vielfach fachlich falsch. Die Migration dieses Pakets ist damit **nicht coverage-fähig**.

In der folgenden Tabelle bedeutet **S** eine einfache, **C** eine komplexe Klausel. „Register“ meint den jeweiligen `src-*`-Eintrag im [Constraint-Register](/D:/work/_venventure/docs/scrum-migration/constraint-register.md:4252). Jede Kennung wurde einzeln semantisch geprüft.

| Kandidat | Klasse | Befund und konkrete Korrektur |
| --- | --- | --- |
| 1504.a | S | Quellenbestimmung vor **jeder betroffenen Änderung** ist eigenständig und korrekt erfasst. Register 4252–4256 als querschnittliche Prozessregel zuordnen; Foto-Story 113–122 allein deckt sie nicht. |
| 1504.b | C | Drei unterschiedliche Quellenzuständigkeiten sind in einem Kandidaten gebündelt: Templates/technische Abnahme, freigegebene Gestaltung, übergreifende Pflichten. In drei atomare Klauseln teilen; jeweils den betroffenen Web-/Design-/Abnahme-Stories und der allgemeinen Planpflege zuordnen. |
| 1504.c | S | Die begrenzte Rolle von `AGENTS.md` ist korrekt wiedergegeben. Als Dokumentationsregel führen; kein Foto-Acceptance-Criterion. |
| 1504.d | S | Übergabefassungen bleiben Eingaben und dürfen keine zweite aktive Spezifikation bilden. Korrekt, aber Register 4255 weist fälschlich allein auf `ST-PHOTO-01`. |
| 1504.e | S | Die sichtbare Kennzeichnung der historischen Rolle ist ein eigener Nachweisschritt; in Migrations-/Dokumentationskriterium aufnehmen. |
| 1505.a | C | Fünf mögliche Einordnungen einer **jeden** Nutzeranweisung bleiben erhalten. Die Klausel ist eine Fallunterscheidung, kein Foto-Ergebnis; querschnittlich planen und prüfbar machen. |
| 1505.b | S | „Soweit passend“ begrenzt die Wiederverwendung bestehender Kennungen; nicht als Pflicht zur erzwungenen Zuordnung lesen. In Traceability-Regel aufnehmen. |
| 1505.c | C | Freigabe **vor Umsetzung** neuer/geänderter Gestaltungsregeln **und Ausnahmen** mit Verweis auf Abschnitt 11 ist wesentlich. Design-Gate statt Foto-Story; den Verweis beibehalten. |
| 1505.d | S | Schweigen erteilt keine Freigabe. Eigenständiges negatives Gate; in Design-Freigabekriterien aufnehmen. |
| 1505.e | S | Bis zur Entscheidung gilt die zuletzt freigegebene Regel. Eigenständige Übergangsregel; zusammen mit 1505.d prüfen, nicht daraus stillschweigend Zustimmung ableiten. |
| 1506.a | C | Bedingung „nach Beauftragung beziehungsweise gültiger Freigabe“, sämtliche sieben Abgleichobjekte und „im selben Änderungsvorgang“ sind relevant. Als querschnittliche Plan-/Nachweispflicht konkretisieren; `ST-PHOTO-01` reicht nicht. |
| 1506.b | S | Normative Guide-Änderung ausschließlich bei tatsächlich freigegebener Gestaltungsänderung. Im Design-Gate verankern. |
| 1506.c | S | Im Gegenfall ist der genaue Nachweis „Design-Guide inhaltlich unverändert“ nötig. Eigenständiges alternatives Acceptance Criterion. |
| 1506.d | C | Historische Belege erhalten **und** überholte widersprüchliche Regeln ausdrücklich als ersetzt kennzeichnen sind zwei prüfbare Handlungen; trennen. |
| 1507.a | C | Fünf Zustände je betroffener Anforderung getrennt zu führen ist eine Nachweismatrixpflicht. Register 4270–4274 bewahrt den Text, die Foto-Story bildet sie nicht ab. |
| 1507.b | C | Dateipfade, Abschnitte, Inhaltsunterschiede und verfügbare Freigabebelege sind getrennt prüfbare Nachweisfelder; als solche planen. |
| 1507.c | S | Markdown-Änderung und lokaler Test sind beide kein Live-Nachweis. Bedeutung korrekt; im Status-/Release-Gate verankern. |
| 1508.a | C | Bestehender Release-Prozess **und bestandene Pflichtprüfungen** sind kumulative Vorbedingungen. Mit `DEC-REL-001/002/003` in `ST-OPS-01` 626–635 verknüpfen; keine Freigabe allein aus Tests ableiten. |
| 1508.b | C | Nach dem Release sind betroffene Live-Routen, sichtbare Ergebnisse und vorgeschriebene Healthchecks getrennt zu prüfen. Ziel `ST-OPS-01` 632–634. |
| 1508.c | C | Release-Bezug dokumentieren und Remote-Sitzungen schließen sind zwei Pflichten; teilen. Ziel `ST-OPS-01` 634. |
| 1509.a | C | Vier alternative Blocker sind korrekt als Oder-Gate genannt. Fehlender Originalschutz betrifft Bilder, ungeklärte Designregeln betreffen Gestaltung; **alle betroffenen Änderungen** statt nur Foto. Gate im jeweiligen Story-AC und Release-AC. |
| 1509.b | S | Offene Punkte dürfen nicht als bestanden markiert werden. Eigenständige Statusregel; querschnittlich zuordnen. |
| 1509.c | S | Unabhängig geprüfte Teilstände als Teilstände ausweisen. Eigenständig und korrekt; Abnahme-/Statuskriterium. |
| 1509.d | S | Gesamtauftrag nicht vorzeitig abgeschlossen melden. Eigenständiges Abschluss-Gate, keine Implementierungsbehauptung aus dem Quellenstatus „Existing / Verify“. |
| 1510.a | C | Acht Nachweisarten sind gebündelt; „migrierte Seiten“ und Bild-/Originalschutzbelege sind nur **soweit betroffen** anzugeben. In überprüfbare Berichtsfelder aufteilen, mit Release- und betroffenen Web-/Foto-Stories verbinden. |
| 1510.b | S | Verbleibende Arbeiten **und Grenzen** offenlegen. Beides als Abschlussbericht-Felder erfassen. |
| 1511.a | C | „Vollständig umgesetzt“ setzt den **gesamten vereinbarten Umfang** und erforderliche Prüfbelege voraus. Als Abschluss-Gate aufnehmen; keine bloße Story-Fertigstellung. |
| 1511.b | S | Dateiliste oder Selbstauskunft allein beweisen perfekte interne Regelbefolgung nicht. Negatives Evidenzkriterium; korrekt erhalten. |
| 1511.c | C | Gesicherte Grundlagen, technische Grenzen, reproduzierbare Ergebnisse und überprüfbare Freigaben sind vier Evidenzdimensionen; Kandidat enthält zudem ein verirrtes Markdown-`**`. Inhalt in vier prüfbare Felder auflösen. |
| 1512.a | S | Aufforderung aus einem **Übergabetext**, keine neue Produkt-Story. Als historisch übernommene Konsolidierungsentscheidung kennzeichnen; nicht parallel zur aktiven Spezifikation führen. |
| 1512.b | C | Bestehende Spezifikationen ergänzen/konsolidieren und widersprüchliche Parallelregeln vermeiden sind zwei Handlungen. Mit 1504.d/e und 1506.d deduplizieren, nicht als zusätzliche Foto-Regel behandeln. |
| 1512.c | S | „Bestehender Projektablauf“ ist ein Verweis, kein eigenständig abnehmbares Ergebnis. Auf die geltenden Release-/Arbeitsregeln verlinken. |
| 1512.d | C | Vier Regelbereiche müssen **vor jeder betroffenen Änderung** verfügbar und angewandt sein. In betroffene Story-/Task-Checks übernehmen; Scope nicht auf Fotos verkürzen. |
| 1512.e | S | Ausdrückliche Freigabe neuer/geänderter Gestaltungsregeln. Inhaltliches Duplikat zu 1505.c und `AGENTS.md`; eine normative Regel mit mehreren Quellverweisen führen. |
| 1512.f | S | Bereits genehmigte Regeln ohne erneute unnötige Design-Rückfrage anwenden. Ausnahme vom erneuten Designentscheid; **keine** Ausnahme von konkreter Release-Freigabe nach `DEC-REL-001`. |
| 1512.g | C | Eigenes Startseitenlayout **und** weiter geltende Bild-, Originalschutz- und Prüfplichten sind zwei verschiedene Aussagen. Web-/Startseiten- und Foto-Kriterien getrennt verknüpfen. |
| 1512.h | C | Tatsächlich verwendete Grundlagen **zu Beginn** und belegter Abnahmebericht **am Ende** sind zwei zeitlich getrennte Pflichten; teilen. |
| 1512.i | S | Keine unbelegte Übernahme-, Umsetzungs-, Prüf- oder Veröffentlichungsbehauptung. Korrektes querschnittliches Evidenz-Gate; vier Statusarten getrennt nachweisen. |
| 1513.a | S | **Fehlerhafte Segmentierung:** „Stand: 22.“ ist kein semantisches Atom. Originaldatei Zeilen 3–4 trennt Datum und Status; Kandidat zu „Stand: 22. September 2026“ berichtigen. |
| 1513.b | C | Vermischt Rest des Datums mit Status. Separat „Status: integrierte Planungsgrundlage – keine Implementierung“ als **historische Quellenstatusangabe**, nicht als aktuelle Implementierungsprüfung, übernehmen. Register 4308–4310 enthält außerdem eine künstlich zusammengezogene Zeile. |
| 1514.a | S | Der verbindliche Gesamtplan trägt offene priorisierte Aufgaben. Quellen-/Planrollenregel; `ST-BRD-04` 615–623 ist falsch. Mit Scrum-Planungsregel §5 abstimmen. |
| 1514.b | S | Die Originaldatei ist Architektur- und Phasenreferenz, kein konkurrierender Backlog. In Quellenregister/Planmigration verankern, nicht in Marvins Aktions-Story. |
| 1515.a | S | Erweiterung des **privaten Cockpits** um ein familienfreundliches Board ist Produktziel. Ziel `EPIC-BOARD` 581 und `ST-BRD-01` 587–595, nicht `ST-BRD-04`. |
| 1515.b | C | Nicht öffentlich und kein Ersatz des Content-Cockpits sind zwei Scope-Verbote. `ST-BRD-01` mit Privacy-/Trennungs-AC ergänzen. |
| 1515.c | C | Gemeinsame geschützte Anwendung, Anmeldung, Datenbank, Audit und Betrieb bei fachlicher Trennung sind mehrere Architekturentscheidungen. Unter `ST-BRD-01`/Board-Architektur referenzieren; `ST-BRD-04` deckt nur Marvin-Aktionen. |
| 1516.a | S | Permanently sichtbare gemeinsame Aufgabenfläche auf dem Küchen-Tablet ist Bedienziel. `ST-BRD-02` 596–604 deckt es teilweise; Register 4327 weist falsch auf Warnungs-Story `ST-BRD-03`. |
| 1516.b | C | Fünf private Item-Arten sind genannt. `ST-BRD-01` 593 beschränkt Board-Karten auf Tasks/To-dos/Warnungs-Tasks; Backlog unterstützt Ideen/Epics/Stories. Diese Unterscheidung ausdrücklich an 1516.b dokumentieren. |
| 1516.c | S | Technische Warnungen über definierten Kommunikationskanal: `ST-BRD-03` 605–613 ist die richtige fachliche Story, derzeit zu Recht blockiert. Konkreter Vertrag bleibt offen; keine Implementierung behaupten. |
| 1516.d | C | Marvin darf auf ausdrücklichen Auftrag Backlog-Elemente anlegen; späteres Verschieben ist eine weitere Fähigkeit. In zwei Klauseln teilen und `ST-BRD-04` 615–623 zuordnen. Deren engeres Verschiebungs-Gate beibehalten. |
| 1517.a | S | Einleitung zur Tabelle, **allein keine abnehmbare Anforderung**. Mit 1518–1520 als Tabellenkontext verbinden; keinen eigenständigen Coverage-Erfolg verbuchen. |
| 1518.a | C | Tabellenkopf enthält fünf konkrete Spalten in Reihenfolge. `ST-BRD-01` 593 deckt die Namen; zu 1519/1520 gemeinsam zuordnen. `ST-BRD-04` ist falsch. |
| 1519.a | C | Fast-Track-Zeile beschreibt fünf Zustandsbedeutungen; der einzelne Kandidat ist nicht atomar. Fünf Zustände in Kriterien prüfen; Ziel `ST-BRD-01` 593 und UI `ST-BRD-02` 602, nicht Warnungs-Story allein. Quellenstatus „Existing / Verify“ ist kein Umsetzungsnachweis. |
| 1520.a | C | Gleiches für fünf reguläre Board-Zustände. `ST-BRD-01`/`ST-BRD-02` statt `ST-BRD-04`; keine Live- oder Done-Behauptung aus dem Quellenstatus. |
| 1521.a | S | Backlog als eigene Ansicht **vor** dem Board ist ein UI-/Strukturkriterium. `ST-BRD-01` 593 und `ST-BRD-02` 602; `ST-BRD-03` ist falsch. |
| 1521.b | C | Ungeplante Ideen, Epics, Stories und To-dos als Backlog-Inhalt. Vier Typen einzeln gegen Datenmodell/UI prüfen; `ST-BRD-01`. |
| 1521.c | C | Bewusste Planung als Voraussetzung und Standardziel `Scrum Board → Offen`. `ST-BRD-01` 593 ergänzt eine strengere Typbeschränkung; diese Herkunft und die Abweichung explizit nachvollziehbar machen. |
| 1521.d | C | Hoch/kritisch priorisierte Items **dürfen** nach `Fast Track → Offen`; dies ist eine Erlaubnis, keine automatische Pflicht. `ST-BRD-01` 593/Phase 0. Der Quellbegriff „Items“ kollidiert möglicherweise mit der dortigen Board-Typbeschränkung; siehe offene Frage unten. |
| 1522.a | S | Einleitung zu folgenden Architekturentscheidungen, kein eigenständiges Atom. Als Kontext für 1523–1527 behalten; `ST-BRD-04` als alleinige Anwendung entfernen. |
| 1523.a | C | Zwei unabhängige Grenzen: öffentliche statische Website bleibt von **dieser Board-Erweiterung** unverändert; keine privaten Board-/Cockpit-/Warnungsdaten auf ihr. In zwei Klauseln teilen. `ST-BRD-01`/Privacy-AC; `ST-BRD-03` nur für den Warnungsteil. „Unverändert“ nicht als generelles Verbot anderer Website-Arbeit lesen. |
| 1524.a | C | Wiederverwendung von Backend, Client, PostgreSQL, Compose, Caddy/HTTPS und Anmeldung ist ein Bündel von Architekturvorgaben. Unter `ST-BRD-01`/Board-Architektur mit Prüfschritten je Komponente führen; `ST-BRD-04` ist zu eng. |
| 1525.a | C | Verbot zusätzlicher Frontend-, Backend-, Queue- **oder** Auth-Dienste gilt **nur für die erste Ausbaustufe**. Vier Dienstklassen und Scope im Architektur-Gate prüfen; nicht als zeitloses Totalverbot lesen. |
| 1526.a | S | Alle Board-Funktionen API-first unter `/api/cockpit` ist ein Architektur-AC für `ST-BRD-01` und spätere Board-Slices. `ST-BRD-04` allein deckt es nicht. |
| 1526.b | S | Tablet ausschließlich Client dieser API ist separat und korrekt segmentiert. Ziel `ST-BRD-01` plus Tablet-Story `ST-BRD-02`. |
| 1527.a | S | Cockpit besitzt Aufgaben- **und** Warnungskopien; beide Datenarten im Ownership-Modell belegen. `ST-BRD-01` und `ST-BRD-03`, nicht ausschließlich Warnungs-Story. |
| 1527.b | C | VanVenture bleibt fachliche Quelle für Fahrzeugzustand **und Warnungsursache**. Zwei Ownership-Aspekte in `ST-BRD-03`/Ereignisvertrag aufnehmen; keine Rückschreibautorität des Boards implizieren. |

### Zielkorrekturen und offener Konflikt

- Im [Register, Zeilen 4252–4304](/D:/work/_venventure/docs/scrum-migration/constraint-register.md:4252) die Anwendung von SRC-1504–1512 als **querschnittliche Prozess-, Design-, Evidenz- und Release-Regeln** ausweisen. Der erhaltene Originalwortlaut ist eine Quelle, kein Nachweis ihrer Story-Abdeckung. Die Release-Klauseln gehören insbesondere zu [ST-OPS-01](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:626) und müssen `DEC-REL-001/002/003` aus den [Release-Entscheidungen](/D:/work/_venventure/docs/scrum-migration/release-decisions.md:8) beachten.
- Im [Register, Zeilen 4306–4394](/D:/work/_venventure/docs/scrum-migration/constraint-register.md:4306) historische Metadaten und Tabellen-Einleitungen von Produktanforderungen unterscheiden. Board-Struktur und Backlog gehören primär zu [ST-BRD-01](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:587), Tablet-Bedienung zu [ST-BRD-02](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:596), Warnungskanal zu [ST-BRD-03](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:605), Marvin-Befugnisse zu [ST-BRD-04](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:615). Die jeweiligen Ursprunglisten und prüfbaren Kriterien benötigen die tatsächlichen Quellverweise.
- **Unresolved – Nutzerentscheidung nötig:** Bedeutet „hoch- oder kritisch priorisierte Items“ in [Original SRC-1521, Zeilen 29–32](/D:/work/_venventure/docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:29) auch Epics und Stories, oder dürfen gemäß [ST-BRD-01, Zeile 593](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:593) ausschließlich Tasks, To-dos und Warnungs-Tasks auf das Board? **Konkrete Frage:** Soll Fast Track Epics/Stories als Karten zulassen, oder bleiben sie ausschließlich im Backlog? Bis zur Entscheidung die widersprechende Typregel nicht als vollständig migriert markieren.

Weitere Nutzerentscheidungen sind für die übrigen Befunde nicht nötig. Gemäß [Scrum-Planungsregel §6](/D:/work/_venventure/docs/project-rules/scrum-planning.md:117) blockieren diese Coverage-Lücken und der offene Typkonflikt das Ersetzen oder Entfernen der bisherigen Pläne.