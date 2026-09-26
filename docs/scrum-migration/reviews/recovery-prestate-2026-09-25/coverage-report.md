# Coverage-Check zum Scrum-Migrationsentwurf

Status: **nicht abgeschlossen**. Die Matrix enthält Quellenblöcke, keine bestätigte atomare Zerlegung jeder mehrteiligen Aussage.
Bis zur manuellen Klauselprüfung darf die Zahl Covered nicht als Nachweis für 0 verlorene Anforderungen gelesen werden.

`Covered` bedeutet eine explizite Story-Zuordnung. `Rule / Constraint` bewahrt die vollständige bindende Quellformulierung und ordnet sie, soweit passend, thematisch einer Story zu; dies ist keine neue Implementierung.
`Duplicate` bezeichnet einen begründet überholten oder bereits anderweitig erfassten Status, dessen Original bestehen bleibt.
Die Zahlen zählen prüfbare Quellblöcke, nicht schon atomisierte Einzelanforderungen.

| Kategorie | Anzahl |
| --- | ---: |
| Ursprüngliche relevante Quellenblöcke | 1106 |
| Covered | 361 |
| Partially Covered | 394 |
| Duplicate | 2 |
| Rule / Constraint | 277 |
| Unresolved | 26 |
| Context | 43 |
| Merged | 3 |

Die Matrix zählt aktuell 394 partiell gedeckte Quellenblöcke. Die atomare
Einzelprüfung zählt Klauselkandidaten separat; siehe
`atomic-coverage-report.md` für Reviewfortschritt und offene Klauseldeckungen.

## Historische Einzelnotizen bis PKG-029

## Batch-Integrationen PKG-030 bis PKG-049

Vier Integrationsbatches haben zwanzig bereits fachlich geprüfte Pakete und
1.192 ursprüngliche Kandidaten übernommen: PKG-030–PKG-034 mit 305 Kandidaten,
PKG-035–PKG-039 mit 282, PKG-040–PKG-044 mit 318 und PKG-045–PKG-049 mit 287. Die zentralen Klausel-IDs, Originalblock-Wiedergabe, Story-Ziele und Registerziele
wurden strukturell abgeglichen. Ein ungültiger generischer Plananker im dritten
Batches wurden anhand der bereits geprüften PlanningMapping-Story-IDs und
verbindlicher Zielanker normalisiert. Der vierte Batch erhielt anschließend einen
validen maschinenlesbaren Paketstatus. Zehn zusammengeführte Nachfolger
auf die numerische Nachfolger-ID umgestellt, damit sie nicht als zusätzliche
Originalkandidaten gezählt werden. Die Reviewberichte bleiben maßgeblich für
die semantischen Befunde; dieses Update behauptet keine Implementierungs- oder
Live-Abnahme.

## Historische Einzelnotizen bis PKG-029


Zum Stand PKG-029 zählte die Matrix 41 partiell gedeckte Quellenblöcke. PKG-027 ergänzt SRC-0788 und SRC-0791: Projektweiter INVEST-/Vertical-Slice-Check und die Größe von ST-CON-01 bleiben offen. PKG-024 ergänzt SRC-0631 und SRC-0635: Rad- und Kajak-Kriterien sind konkretisiert, aber für weitere vollständige Ausrüstungsprofile fehlt eine eindeutig zuständige bestehende Story. Welche Story trägt deren Lesestruktur und Intro-Doppelspalte? `SRC-0484` aus PKG-016 und `SRC-0491` aus PKG-017 bleiben offen. Aus PKG-018 sind `SRC-0504` (Galeriegestaltung ohne Nutzerabnahme), `SRC-0508` (Reststruktur ohne vollständige kleine Slices) und `SRC-0509` (Restzentralisierung ohne vollständigen Slice-Umfang) hinzugekommen. PKG-019 ergänzt `SRC-0514`: Fahrzeug- und Reiseberichtsgates sind zugeordnet, eine wertorientierte Ziel-Story für die Ausrüstungsliste fehlt noch. PKG-021 ergänzt `SRC-0530` und `SRC-0532`: die damaligen Planregister- und Fahrzeug-Detailgenerator-Blocker sind im Release-AC sichtbar, aber ohne dedizierten Reparaturtask oder belegten neueren vollständigen Bestehenslauf. Frühere Scott-Entwürfe `SRC-0531/0532` sind nur hinsichtlich ihres ersetzten Layoutstands historisch; sie sind nicht als ganze Blöcke Dubletten. Die atomare Einzelprüfung und weitere offene Befunde stehen in `atomic-coverage-report.md`; diese Quellblocktabelle ist kein bestandener Migrationscheck.


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
