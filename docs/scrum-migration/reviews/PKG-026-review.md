## PKG-026 – lesender Review

**Umfang:** 25 Originalblöcke, 64 Klauselkandidaten, 25 Matrixzeilen. Ich habe jeden der 64 Kandidaten semantisch geprüft. Im gelieferten Paket stehen SRC-0663–0670 und SRC-0746–0762; zu SRC-0671–0745 enthält es keine Blöcke. Dateien wurden nicht geändert.

**Befund:** Die Originalwortlaute sind im [Constraint-Register](</D:/work/_venventure/docs/scrum-migration/constraint-register.md:1108>) erhalten. Das genügt hier mehrfach nicht für echte Planning Coverage: SRC-0663–0665 sind der falschen Story zugeordnet, und bei Teilen des Produktionsbriefs fehlen konkrete prüfbare Kriterien in [ST-CON-01](</D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:252>). Listenziffern und auseinandergerissene Datumsangaben sind keine atomaren Anforderungen. Historische Erledigungsnachweise dürfen nicht als aktuelle Abnahme gelten.

In den Tabellen bedeutet **indirekt**: Originalwortlaut und thematische Story sind vorhanden, die spezifische Abnahme ist im Plan nicht prüfbar beschrieben. **Historisch** bedeutet: als Quellnachweis erhalten, ohne aktuelle Umsetzung zu bestätigen. „Simple“ wurde ebenso einzeln geprüft wie „Complex“.

### Design Guide: SRC-0663–0670

Zielstellen: [Design Guide, Zeilen 248–278](</D:/work/_venventure/docs/design-guide.md:248>), [ST-WEB-01](</D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:32>), [ST-WEB-02](</D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:43>), [ST-AUTH-01](</D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:462>) und Registerzeilen 1108–1154.

| Kandidat | Prüfung und konkrete Korrektur |
| --- | --- |
| **0663.a · Complex**, Quelle 248–250 | Nicht atomar: verbleibende Breite, Beginn neben Sidebar, Linksbündigkeit und Verbot des unsichtbaren Spaltenrasters sind getrennt prüfbar. Matrix/Register 1111 weisen auf ST-WEB-02; auf **ST-AUTH-01, AC 468** umhängen und dort alle vier Merkmale abnehmen. Dort stehen bisher nur Linksbündigkeit und fehlendes zweites Raster. |
| **0664.a · Complex**, 251–252 | Einzige Stelle für drei Aktionen ist eine gemeinsame Exklusivregel; die drei Aktionen müssen einzeln erkennbar bleiben. ST-AUTH-01:468 nennt zentrale Anzeige/Logout, aber nicht eindeutig Kontowechsel. Dorthin statt ST-WEB-02 zuordnen und Kontowechsel ergänzen. |
| **0664.b · Simple**, 252 | Das Verbot der Wiederholung in Redaktion *und* Cockpit ist eigenständig prüfbar und präzisiert 0664.a; kein bedeutungsloses Duplikat. ST-AUTH-01:468 um beide Orte ergänzen. |
| **0664.c · Simple**, 253 | Administratorrolle ist eine eigene Zugriffsschranke. ST-AUTH-01:468 enthält „nur Administratoren“; Zuordnung von Register 1117 und Matrix dorthin korrigieren. Historisches Done nicht als aktuelle Prüfung lesen. |
| **0665.a · Complex**, 254 | Benutzername und Anmeldeart sind zwei Anzeigefelder. In ST-AUTH-01:468 ist die Anmeldeart nicht ausdrücklich abgenommen. Beide dort aufnehmen; ST-WEB-02 ist sachfremd. |
| **0665.b · Complex**, 254–256 | Für Google-Konten sind lesbare übernommene E-Mail, kein Passwortwechsel und kein zweites E-Mail-Feld getrennte Bedingungen. ST-AUTH-01:468 deckt nur lesbare Adresse und kein VanVenture-Passwort ausdrücklich; Anzeige- und Feldverbote ergänzen. |
| **0665.c · Complex**, 256–257 | Kontakt-E-Mail und Passwortwechsel gelten ausschließlich für Passwortkonten. ST-AUTH-01:468 nennt beides; die Exklusivität als AC belassen und Matrix/Register 1123 umhängen. |
| **0665.d · Simple**, 257–258 | „Beides“ bezieht sich auf Kontakt-E-Mail und Passwortwechsel; beide dürfen Google-Freigaben nie verändern. Dieser Schutz fehlt in ST-AUTH-01:468. Dort als eigenes Negativkriterium ergänzen. |
| **0666.a · Simple**, 262 | „1.“ ist Reihenfolgenmarker, keine Klausel. Als Kandidat entfernen; die Reihenfolge am Gesamtblock erhalten. |
| **0666.b · Complex**, 262 | Freigabe von Design Guide V1 ist eine historische Voraussetzung, keine noch offene Template-Arbeit. Register 1129 und Matrix von ST-WEB-02 auf historischen Design-Guide-Nachweis beziehungsweise ST-WEB-01:37 beziehen. |
| **0666.c · Simple**, 262 | „Erledigt am 22.“ ist ein unvollständiges Datumsfragment; mit 0666.d und 0666.b zu **„am 22. September 2026 erledigt“** verbinden. |
| **0666.d · Simple**, 262 | Allein kein semantischer Satz; Bestandteil desselben historischen Status, nicht eigener Requirement-Eintrag. |
| **0667.a · Simple**, 263–264 | „2.“ ist Reihenfolgenmarker; mit Gesamtblock bewahren, nicht als Klausel zählen. |
| **0667.b · Simple**, 263–264 | Kajak-Galerie als Referenz ist durch ST-WEB-01:38 thematisch und ausdrücklich erfasst. Als historischen Referenzstand führen. |
| **0667.c · Simple**, 263–264 | Unvollständiges Datumsfragment; mit 0667.d verbinden. |
| **0667.d · Simple**, 263–264 | „September 2026 live verifiziert“ braucht Tag und Bezugsobjekt. Mit 0667.b/c als historischen Live-Nachweis ablegen; keine aktuelle Verifikation ableiten. |
| **0668.a · Simple**, 265–269 | „3.“ ist nur Reihenfolgenmarker. |
| **0668.b · Complex**, 265–267 | Fahrzeug, Bike und bestehende Reise-Unterseiten sowie Hero-, Galerie- und Link-Standard sind mehrere Abnahmeachsen. ST-WEB-01:38–39 deckt den Standard grundsätzlich, aber die Matrix sollte die Seitentypen und drei Standards getrennt rückverfolgen. |
| **0668.c · Simple**, 266–267 | Jede Galerie-Ausnahme muss ausdrücklich dokumentiert sein. ST-WEB-01:38 nennt vier aktuelle Ausnahmen, aber nicht die allgemeine Dokumentationspflicht. Dort ergänzen; Register 1141 beibehalten. |
| **0668.d · Simple**, 267–269 | „Für Fahrzeug, Reiseberichte und Scott erledigt“ ist historischer Teilstatus. ST-WEB-01:39 nur als Nachweis mit Umfang führen; nicht auf alle Bike-Seiten ausweiten. |
| **0668.e · Complex**, 267–269 | Genau vier benannte Radprofile bleiben *bis zur jeweiligen Bild- und Faktenfreigabe* ausgenommen. ST-WEB-01:38 deckt Anzahl und Endbedingung; die Formulierung „in Vorbereitung“ und profilweise Prüfung sollten erhalten bleiben. Kein Widerspruch zum späteren Redirect der Bike-Übersicht: Profile sind Inhaltsseiten. |
| **0669.a · Simple**, 270–272 | „4.“ ist Reihenfolgenmarker. |
| **0669.b · Complex**, 270–271 | Startseite und Footer angleichen sowie Desktop und Mobil live abnehmen sind getrennte Arbeit und Nachweise. ST-WEB-01:38 enthält allgemeine Ansichten, aber keine konkrete Footer- und Startseitenabnahme. Historischen Stand dort ergänzen. „Angleichen“ darf die unabhängige Startseitenstruktur aus AGENTS.md nicht aufheben. |
| **0669.c · Simple**, 271–272 | Unvollständiges Status-/Datumsfragment; mit 0669.d und 0669.b verbinden. |
| **0669.d · Simple**, 271–272 | Monats-/Jahresfragment ohne eigenständige Bedeutung; Bestandteil des historischen Nachweises. |
| **0669.e · Simple**, 271–272 | Kurzer Footer ohne konkurrierende Navigation ist eine eigenständige Gestaltungsgrenze. ST-WEB-01:38 ausdrücklich ergänzen; nicht bloß als Datumsanhang führen. |
| **0670.a · Complex**, 276–278 | Gespiegeltes ausgewähltes Bild, Boot rechts, Verlauf, Eyebrow, Titel und Einleitung sind einzeln prüfbare Merkmale des historischen Referenzfalls. ST-WEB-01:38 nennt Bild, Verlauf und Einleitung, aber nicht Eyebrow/Titel. Diese ergänzen; keine neue Bildauswahl daraus ableiten. |
| **0670.b · Simple**, 276–278 | „Er wurde am 22.“ ist unvollständig; kein eigener Nachweis. |
| **0670.c · Simple**, 276–278 | Mit 0670.b zu „am 22. September 2026 live geprüft“ verbinden und ausdrücklich historisch kennzeichnen. |

### Produktionsbrief: SRC-0746–0762

Zielstellen: [Produktionsbrief, Zeilen 3–71](</D:/work/_venventure/docs/production-briefs/gcs-nach-einem-jahr.md:3>), ST-CON-01:252–260 und [Register, Zeilen 1156–1256](</D:/work/_venventure/docs/scrum-migration/constraint-register.md:1156>). Die Matrixzuordnung zu ST-CON-01 ist fachlich passend; die folgenden Lücken betreffen Atomarität und konkrete Abnahme.

| Kandidat | Prüfung und konkrete Korrektur |
| --- | --- |
| **0746.a · Simple**, Quelle 3 | „Stand: 23.“ ist ein künstliches Datumsfragment. Mit 0746.b zu „Stand: 23. September 2026“ verbinden; Metadatum, keine Produktionsaufgabe. |
| **0746.b · Complex**, 3–4 | Vermischt Datumsrest, verbindlichen Briefstatus und Faktenbasis. Drei Metadaten getrennt erfassen; ST-CON-01:258 bewahrt den Briefstatus, sollte die benannte `source-notes/gcs-1-jahr-erfahrung.md` als Faktenbasis ausdrücklich verweisen. |
| **0747.a · Simple**, 6–7 | Der Gesamtplan führt den Arbeitsstatus: gültige Zuständigkeitsregel, keine zweite Backlogquelle. ST-CON-01:258 und Entwurfsstatus:3 sind damit vereinbar; als Governance-Zuordnung statt Produktions-AC kennzeichnen. |
| **0747.b · Simple**, 6–7 | Brief ist Umsetzungsgrundlage des bereits gebrieften VAN-Tests. ST-CON-01:258 deckt „briefed“; Quellenrolle ausdrücklich behalten. Keine neue Briefarbeit erzeugen. |
| **0748.a · Simple**, 11–12 | Arbeitstitel ist eine einzelne redaktionelle Vorgabe, kein endgültiger Freigabetitel. ST-CON-01:258 verweist allgemein auf den Brief; Titel als prüfbares Briefmerkmal nennen oder über einen spezifischen AC-Verweis rückverfolgen. Derzeit indirekt. |
| **0749.a · Simple**, 14–16 | Zielgruppe enthält Familien/aktive Camper:innen sowie Van mit regelmäßig mitgeführten Rädern und Hund. ST-CON-01:258 nennt nur das Feld „Zielgruppe“; diese Merkmale dort prüfbar verankern. Indirekt. |
| **0750.a · Simple**, 18–19 | Kernfrage samt einem Kind, Hund und regelmäßig mitgeführten Rädern ist ein zusammenhängender Prüfrahmen. ST-CON-01:258 nennt die Kernfrage nicht; als Brief-Abnahmekriterium ergänzen. Indirekt. |
| **0751.a · Complex**, 21–23 | Erfahrungsbericht statt Modellbroschüre und drei Beurteilungsfragen („ab Werk“, Alltag, hilfreiche Änderungen) sind getrennte redaktionelle Prüfungen. ST-CON-01:258 nennt nur „Nutzenversprechen“; Inhalt konkretisieren. |
| **0752.a · Simple**, 25 | Longform *circa 14–18 Minuten*; ST-CON-01:258 enthält Longform ohne Länge. Länge ergänzen. |
| **0752.b · Simple**, 25–26 | Zwei eigenständige vertikale Shorts/Reels; Anzahl und Eigenständigkeit stehen in ST-CON-01:258, vertikales Format fehlt. Ergänzen. |
| **0753.a · Simple**, 28 | 8–11 Stunden sind Gesamtziel, kein harter Ist-Wert. ST-CON-01:258 enthält das Ziel und den 24-Stunden-Konflikt; **Unresolved** bis zur unten genannten Entscheidung. |
| **0753.b · Simple**, 28–29 | Tatsächliche Produktionsstunden erfassen ist ein eigener Nachweis. ST-CON-01:258 nennt ihn nicht ausdrücklich; ergänzen. |
| **0753.c · Complex**, 29–31 | Fünf grobe Phasenansätze, keine fünf verbindlichen Obergrenzen. Bei ST-CON-01:258 als gerundete Schätzgrundlage rückverfolgen; nicht zu separaten harten Tasks/Abnahmeschwellen machen. |
| **0753.d · Simple**, 31–32 | Die Rundung qualifiziert 0753.c; allein keine Arbeit. Mit den Phasenwerten zusammenführen. |
| **0753.e · Simple**, 32 | Das Gesamtziel hat bei der Planung Vorrang vor addierten Einzelwerten. Als Bedingung von 0753.a/c in ST-CON-01:258 festhalten. |
| **0754.a · Simple**, 36 | Van als Hauptdarsteller ist eine eigenständige Schnitt-/Erzählvorgabe. ST-CON-01:258 nennt sie nicht konkret; ergänzen. |
| **0754.b · Simple**, 36–37 | Familie, Räder und Hund sind die erprobten Praxisfälle. Als genau diese drei Fälle in ST-CON-01:258 verankern; indirekt. |
| **0754.c · Simple**, 37–38 | Positive Rad-Erfahrung gilt **für das aktuelle GCS-Setup** und darf nur als eigene Nutzungserfahrung dargestellt werden. Beide Grenzen in ein AC aufnehmen; nicht als generelle Bike-Behauptung. |
| **0754.d · Complex**, 38–41 | Kajak gehört zum Reisekonzept, war 2026 unzureichend erprobt, ist für dieses Video kein Testfall und wird knapp ohne Wertung erwähnt. ST-CON-01:258 enthält diese Ausnahme nicht; alle Bedingungen dort zusammenhängend ergänzen. |
| **0755.a · Simple**, 43–44 | Führerscheinentscheidung von Sabine und Helmut ist eine konkrete biografische Tatsache, keine allgemeine Fahrerlaubnisberatung. In ST-CON-01:258 als belegte Aussage mit Quellbezug aufnehmen. |
| **0755.b · Complex**, 44–46 | Nutzungsprofil umfasst Familie, Hund, Räder, Ausstattung und nötiges Hoch-/Schlafdach. Nicht vom 4,1-t-Argument trennen; ST-CON-01:258 als Kontextbedingung ergänzen. |
| **0755.c · Simple**, 46 | Zuladungsreserve ist die Folge *dieses* Profils, kein isolierter Fahrzeugwert. Mit 0755.b koppeln; indirekt. |
| **0755.d · Simple**, 46–47 | Verbot der pauschalen Behauptung, 4,1 t seien allgemein nötig. Als ausdrückliches Negativkriterium in ST-CON-01:258 ergänzen. |
| **0756.a · Simple**, 49–50 | Vorhandenes Reise-, Van-, Bike- und Familienmaterial zuerst verwenden. ST-CON-01:258 nennt „Archiv-first“, aber nicht den Materialumfang; dort konkretisieren. |
| **0756.b · Simple**, 50–51 | Neuer Dreh ist auf aktuelle Aussagen, realen Heck-Test und schlüssiges Fazit begrenzt. ST-CON-01:258 nennt sieben Setups, nicht diese Bedarfsgrenze; ergänzen. |
| **0757.a · Simple**, 55 | Keine durchgehende Moderation ist ein eigenständiges Verbot; ST-CON-01:258 ergänzen. |
| **0757.b · Complex**, 55–57 | Drei kompakte On-Camera-Blöcke und *am Ende* kurze Voice-over-Session für drei Zwecke. ST-CON-01:258 sagt nur „sieben Setups“; Sprechstrategie und Reihenfolge ergänzen. |
| **0758.a · Simple**, 59–60 | Block A behandelt GCS, 4,1 t und Dach **für das konkrete Familienprofil**. Als Blockinhalt in ST-CON-01:258 ergänzen; das Profil darf nicht entfallen. |
| **0759.a · Simple**, 61 | Block B nennt Heck, Stauraum, Tisch/Sessel und **Eurobox-Lösungsversuch**. In ST-CON-01:258 konkretisieren; „Versuch“ nicht als bewährte Lösung umdeuten. |
| **0760.a · Simple**, 62 | Block C enthält Positives, Negatives und ehrliches Fazit. In ST-CON-01:258 als prüfbaren Inhalt aufnehmen; indirekt. |
| **0761.a · Simple**, 64 | Ruhiger, konkreter, fairer Ton ist eine eigene redaktionelle Vorgabe. In ST-CON-01:258 ergänzen. |
| **0761.b · Simple**, 64–65 | Positive Grundbewertung und offene Grenzen müssen nebeneinander stehen; kein Widerspruch, sondern ausgewogene Darstellung. In ST-CON-01:258 ergänzen. |
| **0761.c · Simple**, 65–66 | Beobachtungen als eigene Erfahrung, ohne allgemeine Kauf- oder Technikbehauptung: eigenständiges Negativkriterium. In ST-CON-01:258 ergänzen. |
| **0762.a · Simple**, 70 | Kamera möglichst selten umbauen ist eine Produktionspräferenz, kein absolutes Verbot. In ST-CON-01:258 bei den sieben Setups als Optimierungskriterium ergänzen. |
| **0762.b · Simple**, 70–71 | Fahrten, Reisen, Bike-Action und Familienalltag bevorzugt aus dem Archiv: konkretisiert 0756.a, ist also ein **inhaltliches Duplikat mit engerem Umfang**, das bei einer gemeinsamen Archiv-first-Abnahme erhalten bleiben muss. |

### Paketübergreifende Korrekturen und offene Entscheidung

1. **Matrix/Register:** SRC-0663–0665 von ST-WEB-02 auf ST-AUTH-01 umhängen. Die Registeranker und Originaltexte bleiben erhalten; ihre `Anwendung` in Zeilen 1111, 1117 und 1123 wird korrigiert. ST-AUTH-01:468 benötigt die oben benannten fehlenden privaten AC. Sein historischer `Done`-Status belegt keine heutige Sichtprüfung.
2. **Segmentierung:** SRC-0666–0669 haben Listenziffern als Scheinkandidaten; SRC-0666, 0667, 0669, 0670 und 0746 haben zerrissene Datumsangaben. Diese zu vollständigen Status- beziehungsweise Metadateneinheiten verbinden. Die Matrixklassifikation „Rule / Constraint“ ist für reine Datums- und Erledigungsnachweise zu grob; historischen Status separat kennzeichnen.
3. **Planning Coverage:** Die pauschale Bindung des Originalwortlauts in Entwurf:21–24 sichert die fachliche Quelle. Für 0748–0762 fehlen aber die aufgeführten spezifischen, extern prüfbaren Ergebnisse in ST-CON-01:258. Bis zur Ergänzung lautet deren Coverage **indirekt/teilweise**, nicht pauschal „Covered“. Keine fehlenden Wörter im Register festgestellt; die Lücken liegen in atomarer Zuordnung und Abnahme.
4. **Unresolved – Nutzerentscheidung zu 0753.a:** ST-CON-01:258 vermerkt neben den 8–11 Stunden des verbindlichen Briefs einen älteren README-Wert von 24 Stunden. **Galt der 24-Stunden-Wert für denselben GCS-Produktionsumfang und wurde er durch 8–11 Stunden ersetzt, oder beschreibt er einen anderen Umfang?** Bis zur Klärung 8–11 nur als Briefziel führen und keinen widerspruchsfreien aktuellen Sollwert behaupten.

Die Freigabe- und Statusgrenzen aus [AGENTS.md](</D:/work/_venventure/AGENTS.md:1>), der [Scrum-Planungsregel](</D:/work/_venventure/docs/project-rules/scrum-planning.md:1>) und den [Release-Entscheidungen](</D:/work/_venventure/docs/scrum-migration/release-decisions.md:1>) bleiben dabei maßgeblich: historische Tests oder ein bestandener Coverage-Check sind keine neue Release-Freigabe.