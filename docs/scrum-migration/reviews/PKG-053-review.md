## Review PKG-053

**Umfang:** Alle 29 Originalblöcke und alle **63 Klauselkandidaten** aus `SRC-1829` bis `SRC-2251` wurden einzeln mit den Originaldateien und den konkreten Zielstellen abgeglichen. Es wurden keine Dateien geändert. **PKG-053 besteht den Coverage-Check derzeit nicht.**

Die zentralen Zielstellen sind [ST-VID-01](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:316) und die [Registereinträge ab `src-1829`](/D:/work/_venventure/docs/scrum-migration/constraint-register.md:5476). `ST-VID-01` nennt derzeit nur `SRC-2247` als Ursprung und fasst die übrigen Produktionsnachweise in einem allgemeinen Satz zusammen. Die Matrix bezeichnet dennoch sämtliche historischen Nachweise als `Covered`. Das ist für deren konkrete Inhalte keine nachprüfbare Planning Coverage. Nach der [Scrum-Planungsregel](/D:/work/_venventure/docs/project-rules/scrum-planning.md) dürfen historische Status und Nachweise bei der Migration weder verschwinden noch zu einer neuen Abnahme aufgewertet werden.

**Korrekturziel R:** Den jeweils genannten Registereintrag an die vollständige Regel samt Bedingung und Ausnahme binden; als *geltende Video-Arbeitsregel*, nicht als erledigte Story-Leistung, kennzeichnen.<br>
**Korrekturziel H:** Unter [ST-VID-01](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:316) einen quellen- und versionsbezogenen historischen Nachweis ergänzen und die Matrix auf diese konkrete Stelle verweisen lassen. Der Nachweis muss lokale Prüfung, Freigabe und damalige Live-Prüfung trennen.<br>
**Korrekturziel N:** Nicht als Anforderung zählen; als Tabellenstruktur beziehungsweise reinen Beleg behandeln.

### Arbeitsregeln: 16 Kandidaten

Die ersten vier Originale stehen in [video-production/AGENTS.md](/D:/work/_venventure/video-production/AGENTS.md:45), die weiteren zwölf in [video-production/README.md](/D:/work/_venventure/video-production/README.md:5). Alle sind derzeit nur auf `ST-VID-01` und einen wortgleichen Registereintrag gemappt. `S` bedeutet semantisch einfache, `C` zusammengesetzte Klausel.

| Kandidat | Prüfung und konkrete Korrektur |
| --- | --- |
| `SRC-1829.a` · S | Feld „aktueller Produktionsstatus“, keine eigenständige Story. R muss den Auslöser „nach jedem größeren Arbeitsblock“ und die Management Summary aus dem Originalkontext erhalten. |
| `SRC-1830.a` · S | Feld „nächster sinnvoller Schritt“. Gleiche Kontextbedingung in R ergänzen; keine neue Produktionsaufgabe daraus ableiten. |
| `SRC-1831.a` · S | Nur tatsächliche Entscheidungen **von Helmut** in den Entscheidungsabschnitt aufnehmen. Rolle und Filter in R ausdrücklich erhalten. |
| `SRC-1832.a` · S | Verbot langer technischer Berichte mit der Ausnahme „wenn Helmut sie ausdrücklich anfordert“ in R erhalten. |
| `SRC-1833.a` · S | Repository-Angabe korrekt, aber wiederholt die Video-Arbeitsregel. R als Bestätigung derselben Regel markieren; kein zweites unabhängiges Gate. |
| `SRC-1834.a` · S | „Grundsätzlich unter `video-production/`“ ist eine Zusammenfassung. R muss die konkrete Ausnahme einer ausdrücklichen Aufgabenfreigabe für Dateien außerhalb dieses Bereichs beachten. |
| `SRC-1835.a` · S | Verbot betrifft Videoarbeit; es darf nicht als allgemeines Verbot beauftragter Website- oder Cockpit-Arbeit gelesen werden. R mit diesem Scope und der ausdrücklichen Freigabeausnahme präzisieren. |
| `SRC-1836.a` · S | Originalmedien dürfen nicht verändert werden. R soll den Schutz als fortgeltende Regel führen, nicht als Nachweis, dass bei v18 tatsächlich nichts verändert wurde. |
| `SRC-1837.a` · S | Bedingung „wenn daraus neu weitergearbeitet wird“ gehört zur Regel. R muss alte Resolve-Projekte und neue Arbeitskopien auseinanderhalten. |
| `SRC-1838.a` · C | Die README-Kurzfassung nennt nur ein bewusst neues Werk. Die ausführliche Video-Arbeitsregel lässt zusätzlich eine **notwendige technische Trennung** zu. R darf diese Ausnahme nicht durch die Kurzfassung streichen; beide Quellen konsistent zuordnen. |
| `SRC-1839.a` · S | Timelines sind eine Präferenz innerhalb eines aktiven Produktionsprojekts, kein absolutes Verbot neuer Projekte. R so kennzeichnen. |
| `SRC-1840.a` · S | Vorrang des Originalmaterials vor YouTube-Downloads korrekt; es ist eine Auswahlregel, keine Behauptung, dass bei v18 ausschließlich Originaldateien verwendet wurden. |
| `SRC-1841.a` · C | Enthält zwei prüfbare Schritte: vorhandenes Material **zuerst prüfen** und geeignetes Material **bevorzugt wiederverwenden**. In R getrennt nachweisbar machen; „vorhanden“ allein bedeutet nicht automatisch „geeignet“. |
| `SRC-1842.a` · S | „Adrians Privacy“ ist zu knapp für ein eigenständiges Abnahmekriterium. R auf die konkreten Video-Privacy-Regeln beziehen; keine pauschale Privacy-Freigabe anderer Personen oder Fassungen daraus ableiten. |
| `SRC-1843.a` · S | Keine automatische Veröffentlichung. R mit der ausdrücklichen Freigabe **des jeweiligen Release-Umfangs** aus [release-decisions.md](/D:/work/_venventure/docs/scrum-migration/release-decisions.md:8) verbinden; die historische v18-Freigabe gilt nicht für spätere Releases. |
| `SRC-1844.a` · C | Kombiniert Zeitpunkt, Empfänger und zwei Ausgabearten. R muss „nach Arbeitsblöcken“, „an Helmut“, Management Summary und **nur notwendige Entscheidungen** erhalten; die ausdrückliche Anforderung eines längeren Berichts bleibt möglich. |

### Historische v18-Nachweise: 47 Kandidaten

Die Kandidaten stammen aus [analysis.md:305–308](/D:/work/_venventure/video-production/sardinia-2019/analysis.md:305) und [README.md:329–341](/D:/work/_venventure/video-production/sardinia-2019/README.md:329). Sie beschreiben überwiegend denselben Export mehrfach. `H` verlangt eine **einmalige** sachliche Aufnahme mit sämtlichen Quellverweisen; Dopplungen dürfen keine mehrfachen Aufgaben oder Freigaben erzeugen.

| Kandidat | Prüfung und konkrete Korrektur |
| --- | --- |
| `SRC-2039.a` · C | Zerlegen in Änderungsumfang gegenüber v17, Einstiegstext samt Zeitfenster und Schluss-CTA samt Zeitfenster. H; deckungsgleich mit `SRC-2244.a/.c`, ohne neue Schnittarbeit. |
| `SRC-2039.b` · S | Ende des Sonnenuntergangstexts bei 19,2 s in H erhalten; Duplikat zu `SRC-2244.b`. |
| `SRC-2039.c` · C | Volle Sichtbarkeit bis 21,7 s und Ausblendung in den letzten 0,5 s getrennt in H nachweisen; `SRC-2244.d` nennt denselben Verlauf gerundet. |
| `SRC-2040.a` · C | Unveränderte Bildszenen **und** unveränderter Ton sind zwei Behauptungen. H getrennt führen; `SRC-2245.a` bestätigt sie. |
| `SRC-2040.b` · S | MD5-Gleichheit belegt den Audio-Bitstream v17/v18, keine allgemeine Gleichheit aller Exportdaten. H mit Hash und Vergleichspartnern; Duplikat zu `SRC-2245.b`. |
| `SRC-2040.c` · C | Anfangs- und Schlusskontaktbogen sowie CTA-Einzelbild sind drei konkrete visuelle Prüfnachweise. H muss ihren Stichprobenumfang nennen; keine vollständige Einzelbildprüfung behaupten. |
| `SRC-2040.d` · C | Exportpfad, Codec/Format, Dauer und fehlerfreier vollständiger Decode getrennt in H führen. „Decode fehlerfrei“ ist technische Prüfung, keine Sichtabnahme. |
| `SRC-2041.a` · S | Eingeblendeter CTA ist technisch nicht anklickbar. H als Erklärung festhalten, warum der Plattformlink nötig ist; Duplikat zu `SRC-2246.a`. |
| `SRC-2041.b` · C | Privat-Upload, Helmuts Telefonnummer-Verifizierung, Zuordnung des ganzen Films und öffentliche Schaltung sind getrennte Ereignisse. H mit Film-ID, Short-URL und Reihenfolge; die Verifizierung allein ist keine Publikationsfreigabe. |
| `SRC-2041.c` · S | SHA-256 gehört ausdrücklich zur **lokalen Upload-Datei**. H als Identitätsbeleg eintragen, ohne daraus einen erneuten Plattform-Hash-Abgleich zu behaupten. |
| `SRC-2041.d` · C | Zwei Studio-Meldungen getrennt als damalige Plattformbelege führen. „Copyright: No issues found“ ist kein allgemeiner Rechtefreigabenachweis. |
| `SRC-2041.e` · S | Damalige Klickprüfung führte zur Langfilm-URL. H mit geprüfter Ziel-URL und Zeitbezug; keine Behauptung einer heutigen erneuten Live-Prüfung. |
| `SRC-2042.a` · C | 5-fps-Kontaktbögen und sechs benannte Einzelbildzeitpunkte als getrennte Prüfschritte in H aufnehmen. „Zeitlich vollständig“ beschreibt die Kontaktbögen über die Dauer, nicht sämtliche Frames. |
| `SRC-2042.b` · S | Zusätzliche manuelle Sichtung der Kontaktbögen in H erhalten; sie ersetzt keine dokumentierte Einzelkontrolle aller Frames. |
| `SRC-2042.c` · C | Drei negative Beobachtungen: keine fremden Personen, Kinder oder Kennzeichen **in den geprüften Bildern**. H muss diese Einschränkung behalten. |
| `SRC-2042.d` · S | Nur Sabine und Juli wurden in Personenszenen von Helmut identifiziert. H als begrenzte Identitätsangabe, nicht als Freigabe anderer Fassungen. |
| `SRC-2042.e` · C | `PRIVACY_APPROVED` gilt nur für **diesen v18-Export**; alte Fassungen und Langfilm sind ausgenommen. H und Matrix müssen diesen Scope ausdrücklich tragen. |
| `SRC-2042.f` · S | Keine Einzelkontrolle aller 666 Frames. H als Prüflimit aufnehmen; darf bei der Abnahme nicht verschwinden. |
| `SRC-2042.g` · C | „Originale“ und „Resolve“ unverändert sind zwei getrennte Bestandsaussagen. H mit Quellstand führen; nicht als aktuelle Dateiprüfung ausgeben. |
| `SRC-2042.h` · C | v17 historisch, v18 live: getrennte Versionsstatus in H; v17 nicht auf `Done/live` anheben. |
| `SRC-2243.a` · S | „Aktueller Export“ ist eine **datierte README-Angabe**. H mit absolutem Pfad, ohne heutige Dateiexistenz zu behaupten. |
| `SRC-2243.b` · S | Render-Rezept ist ein eigener Herkunftsbeleg. H mit Pfad; nicht als neue Aufgabe klassifizieren. |
| `SRC-2244.a` · C | Änderungsumfang und Einstiegstexte getrennt; Duplikat zu `SRC-2039.a`, in H zusammenführen. |
| `SRC-2244.b` · S | Sonnenuntergangstext endet 19,2 s; Duplikat zu `SRC-2039.b`. |
| `SRC-2244.c` · S | Schluss-CTA mit Text und Zeitraum 19,2–22,2 s; Duplikat zu `SRC-2039.a`. |
| `SRC-2244.d` · C | Etwa 2,5 s volle Lesbarkeit und 0,5 s weiche Bildausblendung getrennt erhalten; mit exakterem Zeitpunkt aus `SRC-2039.c` abgleichen. |
| `SRC-2244.e` · S | Separate Audioausblendung blieb wie v17. H zusätzlich zum MD5-Vergleich erhalten; beides beschreibt unterschiedliche Aspekte. |
| `SRC-2245.a` · C | Bildfolge und Ton sonst unverändert; Duplikat zu `SRC-2040.a`, in H getrennt zusammenführen. |
| `SRC-2245.b` · S | AAC-MD5-Vergleich; Duplikat zu `SRC-2040.b`. |
| `SRC-2245.c` · C | Gerenderter Einstieg und CTA visuell geprüft; Umfang als Stichprobe in H, nicht als Vollsichtung. |
| `SRC-2245.d` · C | Videoformat, Bildrate, Audioformat und Dauer sind mehrere technische Exportmerkmale. H als gemeinsamer Formatbeleg, nicht als vier neue Anforderungen. |
| `SRC-2245.e` · S | Vollständiger Decode fehlerfrei; Duplikat zu `SRC-2040.d`, technische Prüfung getrennt von Privacy-Abnahme. |
| `SRC-2246.a` · S | CTA selbst nicht anklickbar; Duplikat zu `SRC-2041.a`. |
| `SRC-2246.b` · C | Telefonnummer-Verifizierung und Zuordnung des Langfilms getrennte Ereignisse; Duplikat zu `SRC-2041.b`. H darf daraus keine generelle Freigabe ableiten. |
| `SRC-2246.c` · C | Linkposition unter dem Kanalnamen und richtiges Klickziel sind getrennte UI-Prüfungen. H mit damaliger Live-Prüfung; Duplikat zu `SRC-2041.e`. |
| `SRC-2247.a` · C | Helmuts explizite Anweisung, öffentliche Veröffentlichung, Short-URL und damalige Live-Prüfung getrennt in H. Nur der ausdrücklich beauftragte v18-Umfang war freigegeben. |
| `SRC-2247.b` · C | Originale und Resolve-Timeline unverändert getrennt; historischer Bestandsnachweis, Duplikat zu `SRC-2042.g`. |
| `SRC-2247.c` · S | Privacy-Endkontrolle fand vor der Freischaltung statt. H mit tatsächlicher Methode aus `SRC-2042.a/.b`, nicht als unbegrenzte Vollprüfung. |
| `SRC-2247.d` · S | `PRIVACY_APPROVED` nur für genau v18. Duplikat zu `SRC-2042.e`; versionsgebunden in H. |
| `SRC-2248.a` · S | **Keine Klausel:** Tabellenkopf ohne fachliche Aussage. N; `Covered` und Typ „User Story / Task“ in der Matrix sind falsch. |
| `SRC-2249.a` · C | Stichproben von Anfang und Schluss sowie 2,5 s Lesbarkeit sind getrennte Prüfbelege. H mit Stichprobenumfang; keine vollständige Bildprüfung. |
| `SRC-2249.b` · S | Helmuts Publikationsauftrag vom 24.09.2026 ist ein historischer Release-Beleg für v18. H; keine Dauerfreigabe. |
| `SRC-2249.c` · C | Der Kandidat verschluckt Tabellenzellen: sichtbarer Langfilm-Link **und** Status „bestanden und live geprüft“. In zwei Belegfelder aufteilen; H mit damaligem Prüfzeitpunkt. |
| `SRC-2250.a` · S | AAC-MD5 zu v17 ist lokaler Technikbeleg, Duplikat zu `SRC-2040.b`; Tabellenkontext „Unveränderte Basis“ erhalten. |
| `SRC-2250.b` · C | Bildszenen laut **Rezept** unverändert; „lokal verifiziert“ ist der Tabellenstatus. Beides trennen. Nicht behaupten, jeder gerenderte Frame sei verglichen worden. |
| `SRC-2251.a` · C | Formatmerkmale und Dauer sind technische Belege; Duplikat zu `SRC-2245.d`. |
| `SRC-2251.b` · C | Vollständiger Decode ist der Prüfschritt, „bestanden“ dessen Tabellenstatus. Getrennt führen; Duplikat zu `SRC-2245.e`. |

### Offener Konflikt und Entscheidung

**Unresolved:** [ST-VID-01](/D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:316) steht auf `Done`, während der Produktionsnachweis ausdrücklich nur 5-fps-Kontaktbögen, ausgewählte Einzelbilder und **keine** Kontrolle aller 666 Frames nennt. Die Video-Arbeitsregel verlangt eine visuelle Endkontrolle der vollständigen öffentlichen Fassung. Aus den gelesenen Stellen allein ist nicht eindeutig, ob die dokumentierte zeitlich durchgehende Kontaktbogensichtung dieses Gate erfüllt. Der historische Veröffentlichungsstatus bleibt ein belegter Quellstatus; eine neue Privacy-Abnahme darf daraus nicht erfunden werden.

**Konkrete Nutzerfrage:** Gilt die dokumentierte 5-fps-Kontaktbogensichtung mit den sechs Einzelbildern für v18 als Erfüllung der geforderten visuellen Endkontrolle der vollständigen öffentlichen Fassung, oder soll `PRIVACY_APPROVED` im Migrationsentwurf bis zu einer zusätzlichen Prüfung als ungeklärt geführt werden?

Bis diese Frage entschieden und die konkreten Nachweise in Plan und Matrix eingetragen sind, ist die Zuordnung des Pakets **nicht vollständig geprüft**.