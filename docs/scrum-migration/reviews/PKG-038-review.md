## Review PKG-038

**Geprüft:** alle 30 im Paket enthaltenen Originalblöcke und alle **59 Klauselkandidaten** aus SRC-1143 bis SRC-1173. In der Nummernfolge ist **SRC-1149 nicht enthalten**; dazu lag kein Kandidat vor. Die Originalstellen in [vanventure-cockpit-plan.md](/D:/work/_venventure/docs/vanventure-cockpit-plan.md:176), die konkreten Stellen im [Scrum-Entwurf](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:404) und [Constraint-Register](/D:/work/_venventure/docs/scrum-migration/constraint-register.md:2974) sowie AGENTS.md, Scrum-Planungsregel und Release-Entscheidungen wurden direkt gelesen. Keine Datei wurde geändert.

**Gesamtbefund: Coverage-Check offen.** Das Constraint-Register bewahrt für alle 30 Blöcke den Originalwortlaut. Das ist Traceability, aber vielfach noch keine echte Planning Coverage: Die zugewiesenen Stories behandeln andere Ergebnisse, oder ihre Acceptance Criteria lassen die konkrete Klausel aus. Besonders systematisch sind Dashboard-Klauseln bei Board-Stories, Planner- und Context-Klauseln bei ST-INS-05 sowie Video-Bestandsfunktionen bei der Trend-Story ST-INS-04 gelandet. Der Status „Done“ von ST-AUTH-01 und „Existing / Verify“ von ST-INS-01 darf dadurch nicht als neuer Prüf- oder Live-Nachweis für diese Klauseln gelesen werden.

In den Tabellen bedeutet **S** ein inhaltlich einfacher Kandidat und **K** einen komplexen oder fehlerhaft geschnittenen Kandidaten. Auch S wurde einzeln semantisch geprüft. `Q` bezeichnet die Zeile der Originalquelle; `R` die Registerzeile; `P` die Zeile im Scrum-Entwurf. Bei `K` ist die genannte Neusegmentierung vor einem Coverage-Urteil nötig.

### Datenmodell und API-Grundsätze

| Kandidat | Typ | Zeilen | Befund und konkrete Korrektur |
| --- | --- | --- | --- |
| SRC-1143.a | K | Q176, R2974–2978, P585 | Tabellenfelder **und** sichtbarer, datensparsamer Kartenverlauf sind zwei prüfbare Aussagen. ST-BRD-01 passt; ST-BRD-03 nur als Nutzung des Verlaufs bei Warnungskarten. Felder und sichtbare Anzeige als getrennte Kriterien bei P585 ergänzen. |
| SRC-1144.a | K | Q177, R2980–2984, P585/603 | Schema, Idempotenz und Geheimnisfreiheit getrennt prüfen. Die Inbox gehört funktional zu ST-BRD-03; ST-BRD-01 trägt höchstens die additive Datenmodellvorbereitung. Bei P603 Feldsatz und sichere Wiederholung konkretisieren. |
| SRC-1145.a | K | Q178, R2986–2990, P585/603 | Felder und Warnung-zu-Karte-Zuordnung trennen. Die Zuordnungs- und Auflösungswirkung gehört zu ST-BRD-03; P603 nennt bisher die einmalige Karte, aber nicht `resolution_state` und `last_source_update_at`. |
| SRC-1146.a | K | Q179, R2992–2996, P412/476/585 | Audit-Schema und vier Aktionsbereiche sowie Verbot von Token-/Passwortwerten getrennt erfassen. Allein ST-AUTH-01 ist zu eng: OAuth/Auth dort, Sync und Planung bei den betroffenen Cockpit-/Planner-Stories, Boardaktionen bei ST-BRD-01. Kein neuer Done-Nachweis aus P476 ableiten. |
| SRC-1147.a | S | Q181, R2998–3002, P412/452 | `metrics_json` für noch nicht eigene API-Metriken ist semantisch vollständig. ST-INS-05 bewertet Produktionsnutzen, nicht das allgemeine Metrik-Schema. Bei ST-INS-01 als Datenhaltungsregel konkret verankern. |
| SRC-1147.b | S | Q182, R2998–3002, P412/452 | Häufig gefilterte Kernmetriken als relationale Spalten ist eigenständig und bedingungsgebunden; dieselbe Fehlzuordnung. In ST-INS-01 oder einem zugehörigen Datenschema-Task prüfbar machen. |
| SRC-1147.c | S | Q182–183, R2998–3002, P412/452 | Upsert-Schlüssel **für alle Tagesmetriken**, jeweils Entität plus Datum, ist eigenständig. ST-INS-05 deckt das nicht; Sync-/Datenhaltungs-Kriterium bei ST-INS-01 ergänzen. |
| SRC-1148.a | S | Q187, R3004–3008, P412 | Ausschließlich JSON unter `/api/cockpit` ist korrekt erfasst und in P412 sinngemäß gedeckt. „Ausschließlich“ und Präfix als API-Kriterium explizit erhalten. |
| SRC-1148.b | S | Q188, R3004–3008, P412 | Eigenständige Integrationsmöglichkeit jenseits HTML/Client-Assets; P412 sagt nur, dass Ansichten die API nutzen. API als separat nutzbare Schnittstelle bei ST-INS-01 ergänzen. |
| SRC-1148.c | K | Q189–190, R3004–3008, P412 | „Stabile Version“ **bzw.** eindeutiges Listen-Paginierungsformat darf nicht zu „beides für jede Antwort“ verschärft werden. Antwort- und Listenfall getrennt als API-Kriterien aufnehmen. |
| SRC-1148.d | S | Q190, R3004–3008, P412 | ISO-8601/UTC für Zeitstempel ist eindeutig; in P412 fehlt ein beobachtbares Kriterium. Bei ST-INS-01 ergänzen. |

### Endpunkte, Rollen und OAuth

| Kandidat | Typ | Zeilen | Befund und konkrete Korrektur |
| --- | --- | --- | --- |
| SRC-1150.a | K | Q194, R3010–3014, P412/585/603 | Zwei Dashboard-/Status-GET-Endpunkte und „angemeldet“ sind zu trennen. ST-BRD-01/03 sind fachlich falsch; ST-INS-01, bei Bedarf eigener Dashboard-Slice, mit Endpunkt- und Zugriffsprüfung. |
| SRC-1151.a | K | Q195, R3016–3020, P412/442 | Liste, Detail, Snapshots und angemeldeter Zugriff sind getrennte Prüfungen. ST-INS-04 deckt Detailvergleich teilweise, nicht Bestandsliste und Zugriff. Bestand zu ST-INS-01, neue Zeitreihen zu ST-INS-04. |
| SRC-1152.a | K | Q196, R3022–3026, P412 | `GET` und schreibende `POST`/`PUT` wurden in einem Fragment mit nur der Leseberechtigung vermischt. Nach Methode und Rolle splitten; ST-INS-01 als Bestandsfunktion mit konkreten API-Kriterien. |
| SRC-1152.b | K | Q196, R3022–3026, P412 | „schreiben: editor/admin“ ist ohne Bezug auf `POST` und `PUT` kein selbstständiger Testfall. Mit beiden Mutationen verbinden und Rollenabwehr prüfen. |
| SRC-1153.a | K | Q197, R3028–3032, P412 | Analog: Context-`GET` und `POST/PUT` samt Leserecht auseinanderziehen. ST-INS-01 passt thematisch; konkrete Endpunkte fehlen dort. |
| SRC-1153.b | K | Q197, R3028–3032, P412 | Editor/Admin gilt für Context-Schreibmethoden; Fragment braucht diese Bindung. Bei ST-INS-01 explizite Positiv-/Negativprüfung. |
| SRC-1154.a | K | Q198, R3034–3038, P585/603 | Vier Board-Operationen und Lese-/Schreibrolle sind mehrere Klauseln. ST-BRD-01 ist Ziel; ST-BRD-03 nur für warnungsbezogene Nutzung. P585 nennt den Pfad allgemein, aber weder alle Methoden noch die präzise Rollenmatrix. |
| SRC-1154.b | S | Q198, R3034–3038, P613 | Marvins eingeschränktes Dienstrecht ist eigenständig. **ST-BRD-04** ist die präzisere Zielstory; ST-BRD-01/03 allein verschleiern die gesonderten Grenzen. P613 bewahrt Auftrag, Verbote und Audit. |
| SRC-1155.a | K | Q199, R3040–3044, P428/476 | Connect, Callback und Disconnect sind drei Handlungen mit Admin-Grenze. ST-AUTH-01 betrifft primär Login; YouTube-Trennung hat in **ST-INS-03** bereits eine geplante Story (P428–434). Nicht vollständig einem erledigten Auth-Stand zuschreiben. |
| SRC-1156.a | K | Q200, R3046–3050, P412 | Sync-Lauf-Lesen und Sync-Start sind unterschiedliche Operationen; `GET`/angemeldet zusammenführen, `POST` separat. ST-INS-01 passt zum historischen Sync, benötigt präzise Rollen-AC. |
| SRC-1156.b | K | Q200, R3046–3050, P412 | Admin für `POST /sync` ist nur mit dem Endpunkt atomar. Mit Startaktion verbinden; Ablehnung anderer Rollen prüfen. |
| SRC-1157.a | K | Q202–203, R3052–3056, P476 | Enge Callback-Ausnahme, Validierung des kurzlebigen Serverzustands und Rückleitung in private Oberfläche sind drei Teilbedingungen. Ziel eher YouTube-OAuth bei ST-INS-01/03 als allgemeiner Login bei ST-AUTH-01; genauen Callback und Ausnahmeumfang festhalten. |
| SRC-1157.b | S | Q203–204, R3052–3056, P476 | Verbot personenbezogener/geheimer Google-Antwortdetails in Fehlern ist klar. P476 erwähnt Audit ohne Secrets, nicht diese Fehlerantwort; negatives Callback-Kriterium ergänzen. |

### Dashboard und Videos

| Kandidat | Typ | Zeilen | Befund und konkrete Korrektur |
| --- | --- | --- | --- |
| SRC-1158.a | K | Q210, R3058–3062, P585/603 | Trennung bei „z.“ zerstört die Aussage. Mit 1158.b zum Zeitraumfilter einschließlich **beispielhafter**, nicht starrer 28/90/365-Tage-Werte rekonstruieren. Dashboard-Ziel statt Board-Story. |
| SRC-1158.b | K | Q210–211, R3058–3062, P585/603 | Enthält Ende des Beispiels **und** letzten erfolgreichen Sync-Zeitpunkt; letzteres eigene Klausel. Beides bei ST-INS-01 beziehungsweise einem Dashboard-Slice abnehmen. |
| SRC-1159.a | K | Q212–213, R3064–3068, P585/603 | Kanal-KPIs und bedingter Umsatz trennen. Umsatz **nur bei Berechtigung und Verfügbarkeit**; keine Pflicht zur Anzeige ohne Daten. Board-Zuordnung falsch; Dashboard-AC ergänzen. |
| SRC-1160.a | K | Q214–215, R3070–3074, P585/603 | Vorperiodenvergleich, Top-/Flop-Videos und Datenqualität sind getrennte beobachtbare Ergebnisse. Dashboard-Ziel; P442 behandelt Video-Trends, deckt diese Dashboard-Ansicht nicht vollständig. |
| SRC-1161.a | K | Q216, R3076–3080, P585/603 | Nächste Planner-Inhalte und **offene** Insight-Empfehlungen sind zwei Datenquellen. Dashboard-Ziel, nicht Familien-Board; beide Anzeigen separat prüfen. |
| SRC-1162.a | K | Q220–221, R3082–3086, P412/442 | Tabelle und Filter sowie sechs angezeigte Angaben gehören in ein detailliertes Listen-AC. ST-INS-04 behandelt neue Trends; bestehende Video-Liste gehört zu ST-INS-01. Vollständigkeit „aller erkannten Videos“ erhalten. |
| SRC-1163.a | K | Q222–223, R3088–3092, P412/442 | „Einordnen“ umfasst eigene Schaltfläche je Zeile, deutliche Erkennbarkeit und Tastaturzugang. Als Bestands-/Sichtprüfpunkt bei ST-INS-01 oder eigener Video-UI-Story; P442 deckt es nicht. |
| SRC-1163.b | K | Q223, R3088–3092 | „Am 22.“ ist kein atomarer Kandidat. Mit 1163.c zum datierten historischen Live-/Techniknachweis verbinden; keinesfalls als aktuelle Verifikation übernehmen. |
| SRC-1163.c | K | Q223–224, R3088–3092 | Ohne 1163.b fehlt das Datum. Historischen Status separat von der Funktionsanforderung bei ST-INS-01 dokumentieren. |
| SRC-1163.d | S | Q224–225, R3088–3092 | Offene Sichtabnahme **mit echten Daten** ist eine eigenständige offene Arbeit. Konkreten Prüf-Task bei der Bestands-/Video-UI-Story anlegen; ST-INS-04 „Planned“ ersetzt diese Abnahme nicht. |
| SRC-1164.a | K | Q226–227, R3094–3098, P442 | Zeitreihe, nur von der API gelieferte Traffic-/Engagement-Werte und fünf Snapshot-Alter sind separat prüfbar. ST-INS-04 deckt Vergleich und Datenlücken weitgehend; „soweit geliefert“ als Grenze und Detailseiten-Zeitreihe ausdrücklich erhalten. |
| SRC-1165.a | K | Q228–229, R3100–3104, P412/442 | Verknüpfung mit `content_items` und **kein Zurückschreiben nach YouTube** trennen. Zuordnung zu ST-INS-04 falsch; Bestandsfunktion von Videos/Planner bei ST-INS-01 und negatives Schreibkriterium dort ergänzen. |

### Planner, Board, Insights und Context

| Kandidat | Typ | Zeilen | Befund und konkrete Korrektur |
| --- | --- | --- | --- |
| SRC-1166.a | K | Q233–234, R3106–3110, P452 | Zwölf Longform-Slots **pro Kalenderjahr** sind Startgerüst; „etwa monatlich“ und verschiebbare Daten sind Flexibilitätsbedingungen. ST-INS-05 betrifft Nutzen pro Stunde und deckt Jahresanlage nicht. Eigene Planner-Story oder Bestandsprüfung bei ST-INS-01. |
| SRC-1166.b | K | Q234–236, R3106–3110, P452 | Mehrere Pflichtangaben je Eintrag; Ziel/KPI, Verantwortung, Brief und spätere YouTube-Verknüpfung fehlen als Gesamtprüfung in P452. Planner-Datensatz als eigenes AC mit allen Feldern; „später“ nicht zu sofortiger Verknüpfung verschärfen. |
| SRC-1166.c | S | Q236–237, R3106–3110, P452 | Die Statusfolge ist ausdrücklich **möglich**, keine verbindlich einzig erlaubte Transition-Maschine. Als optionale Referenz im Planner erhalten, nicht als starres AC umdeuten. |
| SRC-1166.d | K | Q238–239, R3106–3110, P452 | Kurzformate dürfen ergänzen; sie dürfen die Longform-Jahresplanung nicht verdrängen. Beide Seiten als Planner-Regel erfassen. P452 deckt sie nicht. |
| SRC-1167.a | K | Q243–244, R3112–3116, P585/594 | Gemeinsame private Arbeitszentrale, fünf Bereiche und Tablet-Optimierung sind mehrere Kriterien. ST-BRD-01 für Umfang, **ST-BRD-02** für Tablet-Bedienung; ST-BRD-03 nur Warnungsintegration. |
| SRC-1167.b | S | Q244–245, R3112–3116, P585 | Board ersetzt Content Planner nicht; P585 bewahrt die Trennung. Bei ST-BRD-01 belassen, ohne sie ST-BRD-03 pauschal zuzurechnen. |
| SRC-1167.c | K | Q245–246, R3112–3116, P585 | Separates Backlog und Typenliste gehören zu ST-BRD-01. Mit der Scrum-Regel präzisieren: **Projekt-Tasks haben eine Story als Elternteil**; private To-dos sind in P585 bereits gesondert ausgenommen. |
| SRC-1167.d | K | Q246–247, R3112–3116, P585 | Zwei Zeilen und fünf Spalten sind getrennt prüfbar; P585 deckt sie konkret. ST-BRD-03 als pauschales Zweitziel entfernen. |
| SRC-1167.e | K | Q247–249, R3112–3116, P585 | Drei Gates: Übernahme vor In Arbeit, Sicht-/Rückmeldeprüfung für Review, bewusste Bestätigung für Done. P585 nennt Übernahme, aber keine explizite Review-Prüfung und kein allgemeines Done-Gate. Bei ST-BRD-01 getrennt ergänzen. |
| SRC-1168.a | K | Q251–252, R3118–3122, P603 | Persistenz, ausschließlich authentifizierte VanVenture-Ereignisse und Idempotenz einzeln prüfen. Hauptziel ST-BRD-03; ST-BRD-01 nur Infrastruktur. |
| SRC-1168.b | K | Q252–253, R3118–3122, P603 | `high` und `critical` erzeugen je Warnung **einmalig** eine Fast-Track-Karte. P603 deckt den Kern; Test pro Schweregrad und Wiederholung ergänzen. |
| SRC-1168.c | S | Q253–254, R3118–3122, P602–604 | Sperre bis **Ereignisvertrag, Dienstidentität und Prioritätsregeln abgenommen** sind, ist klar und in P602–604 weitgehend enthalten. Schriftliche Phase-0-Abnahme und Release-Freigabe bleiben zusätzliche, unterschiedliche Gates. |
| SRC-1168.d | K | Q255–257, R3118–3122 | Zwei Dokumentrollen: technischer Entwurf im Hauptentwicklungsplan, verbindlicher Umsetzungsstatus im Gesamtplan. Als Referenz-/Statuszuordnung behalten, nicht als Produkt-AC. Register oder Traceability-Metadaten passend; ST-BRD-01/03 allein sind kein Nachweis der Dokumentrollen. |
| SRC-1169.a | S | Q261, R3124–3128, P412/442 | Nachvollziehbare Signale statt undurchsichtiger Auto-Entscheidungen ist eigenständig. ST-INS-04 behandelt Trends, aber nicht die Insight-Entscheidungsgrenze; eigenes Insight-AC oder eigener Slice. |
| SRC-1169.b | S | Q262–264, R3124–3128 | Die fünf Fälle sind ausdrücklich **Beispiele**. Semantisch korrekt, wenn als Testideen/Referenz geführt; nicht fünf verpflichtende Insight-Typen behaupten. |
| SRC-1169.c | K | Q264–265, R3124–3128, P442 | Jede Insight braucht Zeitraum, Metrik, Vergleichsbasis und Datenstand. P442 nennt Zeitraum/Datenstand für Trends, nicht diese vier Angaben **je Insight**. Insight-AC ergänzen. |
| SRC-1169.d | S | Q265, R3124–3128, P412 | „Zunächst regelbasiert“ ist eine Phasenbedingung. P412 erwähnt Basis-Insights historisch; künftige Insight-Logik und Status getrennt festhalten. |
| SRC-1169.e | K | Q265–266, R3124–3128 | Spätere KI-Zusammenfassungen brauchen ausdrückliche Freigabe und dürfen nicht automatisch veröffentlichen. Als spätere, gesperrte Option planen; nicht durch ST-INS-04-Trend-AC als bereits freigegeben behandeln. Release-Entscheidungen bestätigen, dass Prüfung keine Veröffentlichungsfreigabe ist. |
| SRC-1170.a | K | Q270–271, R3130–3134, P412/452 | Redaktionell strukturierte Pflege, **freigegebene** Faktenbasis und drei Verbraucher mit „später“ für Assistenz sind getrennte Bedingungen. ST-INS-05 ist falsch; ST-INS-01 für Context-Bestand, spätere Assistenz nur als Abhängigkeit/Folgearbeit. |
| SRC-1170.b | K | Q271, R3130–3134 | „Startkategorien:“ ist ohne folgende Liste keine Klausel. Mit den kategorischen Originalzeilen verbinden; keine leere eigene Coverage-Zeile als erfüllt markieren. |
| SRC-1171.a | S | Q273, R3136–3140, P412 | Van/Hymer-Kategorie mit Fahrzeug, Umbauten, Ausstattung, Erfahrungen und Grenzen ist vollständig. ST-INS-01 passt als Context-Ziel, doch P412 nennt keine Kategorien; Kategorie als prüfbaren Bestandsumfang ergänzen. |
| SRC-1172.a | S | Q274–275, R3142–3146, P412 | Reisen-Kategorie mit Zielen, Routen, Jahreszeiten, Stellplätzen, Erlebnissen und Fragen ist vollständig. Gleiche konkrete Coverage-Lücke bei ST-INS-01. |
| SRC-1173.a | S | Q276, R3148–3152, P412 | Outdoor-Kategorie mit Wandern, Campen, Natur- und Sicherheitswissen ist vollständig. Gleiche konkrete Coverage-Lücke bei ST-INS-01. |

**Übergreifende Korrektur:** Die `Anwendung`-Zeilen R2977–3151 und die entsprechenden `NewMapping`-/`PlanningMapping`-Felder müssen den oben genannten Zielstories folgen. Für jede neu zugeordnete Klausel braucht der Scrum-Entwurf ein beobachtbares AC oder einen eindeutig verknüpften Task mit Prüfschritt; der bloße Originalwortlaut im Register genügt nach der [Scrum-Planungsregel](/D:/work/_venventure/docs/project-rules/scrum-planning.md:117) nicht. Historische Live-Aussagen aus SRC-1163 bleiben datierte Quellenangaben; die offene Sichtabnahme bleibt offen. Eine Nutzerentscheidung ist für diese redaktionelle Zuordnung nicht erforderlich.