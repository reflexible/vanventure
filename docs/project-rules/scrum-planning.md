# Verbindliche Scrum-Planungsregel für VanVenture

Stand: 25. September 2026<br>
Geltung: alle neuen Projektpläne und jede spätere Überarbeitung bestehender
Projektpläne. Diese Regel beschreibt die Planung; fachliche Anforderungen,
Architektur, Designfreigaben, Abnahme- und Veröffentlichungsregeln bleiben in
ihren jeweils maßgeblichen Dokumenten. Der aktive Gesamtplan steht derzeit in
[`docs/ausbauplan.md`](../ausbauplan.md). Das private Familien-Scrum-Board ist
eine geplante Anwendung und keine zweite maßgebliche Projektplanung.

## 1. Planungshierarchie und Rückverfolgbarkeit

Jede geplante Produktänderung wird nachvollziehbar gegliedert:

**Goal / Initiative → Epic → User Story → Task / Subtask**

| Ebene | Zweck | Mindestinhalt |
| --- | --- | --- |
| Goal / Initiative | Beschreibt ein überprüfbares Nutzer- oder Geschäftsziel. | Zielgruppe, angestrebter Nutzen, Erfolgsmaß und Bezug zur maßgeblichen Anforderung. |
| Epic | Bündelt mehrere lieferbare Stories für ein zusammenhängendes Ergebnis. | Zielbeitrag, Grenzen, priorisierte Stories und Abschlussbedingung. |
| User Story | Beschreibt ein kleines, eigenständig abnehmbares Ergebnis aus Nutzersicht. | „Als … möchte ich …, damit …“, User Value oder Business Value, Acceptance Criteria, Priorität und Verweise auf Anforderungen. |
| Task / Subtask | Beschreibt die konkrete Arbeit zur Umsetzung und Prüfung einer Story. | Ergebnis, zuständige Story, nötige Abhängigkeiten und Prüfschritt. |

Tasks und Subtasks sind keine Ersatz-Stories. **Ein Task gehört immer zu einer
User Story; ein Subtask gehört zu einem Task derselben Story. Tasks oder
Subtasks direkt unter einem Epic sind nicht erlaubt.** Technische Arbeiten
werden einer Story zugeordnet und erben deren Nutzenbezug. Bestehende Kennungen und
Quellverweise bleiben bei einer späteren Umstrukturierung erhalten oder werden
eindeutig auf neue Kennungen abgebildet. Ein Epic ist erst abgeschlossen, wenn
seine Stories einschließlich der nötigen Abnahme abgeschlossen sind.

## 2. Vertical Slices und kleine Inkremente

Stories werden als **Vertical Slices** geschnitten: Ein Inkrement reicht durch
die jeweils nötigen Schichten von Daten und Logik bis zur nutzbaren Oberfläche,
Veröffentlichung oder beobachtbaren Wirkung. Es liefert einen konkreten
Teilnutzen und kann unabhängig geprüft werden. Reine Schichten wie „Datenbank
fertig“ oder „UI fertig“ sind im Regelfall Tasks innerhalb einer solchen Story.

Ein Epic wird in kleine, funktionierende Inkremente zerlegt. Das erste
Inkrement kann ein **Walking Skeleton** sein: ein schmaler, durchgängiger
End-to-End-Ablauf mit echter Eingabe, Verarbeitung, Ausgabe und den notwendigen
Schutz- und Prüfschritten. Es muss als eigener Teilstand demonstrierbar sein;
Platzhalter allein gelten nicht als fertig. Weitere Stories erweitern den
Nutzen schrittweise, ohne einen großen Abschlussblock vorauszusetzen.

**Enabler Stories** sind nur zulässig, wenn eine technische, rechtliche oder
betriebliche Voraussetzung nicht sinnvoll innerhalb einer Value Story erledigt
werden kann. Sie benennen die konkret freigeschalteten Folgestories, den
notwendigen Umfang und ein überprüfbares Ergebnis. Reine Vorarbeit ohne
begründete Abhängigkeit wird nicht als eigenständige Story geplant.

## 3. Qualität einer User Story: INVEST

Vor der Einplanung wird jede Story an **INVEST** geprüft:

- **Independent:** möglichst unabhängig lieferbar; unvermeidbare Abhängigkeiten
  sind sichtbar.
- **Negotiable:** beschreibt das gewünschte Ergebnis, ohne die Umsetzung
  unnötig festzuschreiben; bindende Fach- und Designregeln bleiben verbindlich.
- **Valuable:** nennt den konkreten User Value oder Business Value und die
  betroffenen Personen beziehungsweise den betrieblichen Nutzen.
- **Estimable:** Umfang und Unsicherheiten sind so klar, dass Aufwand und
  Reihenfolge sinnvoll eingeschätzt werden können.
- **Small:** passt in ein kurzes, prüfbares Arbeitsinkrement; zu große Stories
  werden entlang des Nutzens geteilt.
- **Testable:** besitzt beobachtbare, eindeutige Acceptance Criteria.

Bei einem fehlenden Merkmal wird die Story geschärft, geteilt oder mit einer
begründeten Abhängigkeit versehen, bevor sie als umsetzungsbereit gilt.

## 4. Acceptance Criteria und Definition of Done

**Acceptance Criteria** beschreiben pro Story konkrete, von außen prüfbare
Ergebnisse und relevante Grenzfälle. Sie nennen bei Bedarf Rollen, Geräte,
Sprachen, Datenschutz, Barrierefreiheit, Fehlerverhalten und Datenzustände.
Sie dürfen bindende Spezifikationen nicht stillschweigend abschwächen.

Die **Definition of Done** gilt für jedes als abgeschlossen gemeldete
Inkrement. Erforderlich sind:

1. Alle Acceptance Criteria sind mit geeigneten, reproduzierbaren Prüfungen
   erfüllt; bekannte Grenzen und nicht geprüfte Fälle sind benannt.
2. Die betroffenen fachlichen Anforderungen, Architektur- und Designregeln
   sowie notwendige Freigaben sind eingehalten und rückverfolgbar.
3. Änderungen an Code, Inhalt, Tests und betroffener Dokumentation sind
   konsistent; Status und Nachweise widersprechen einander nicht.
4. Der tatsächliche Zustand ist korrekt ausgewiesen: geplant, lokal
   vorbereitet, geprüft, freigegeben, gepusht und live verifiziert sind
   unterschiedliche Zustände. Für produktive Änderungen gelten zusätzlich
   der bestehende Release-Prozess und die Live-Prüfung.
5. Offene Folgearbeit ist als eigene Story oder Task mit Bezug und Priorität
   erfasst. Ein Teilstand wird nicht als vollständiges Epic ausgegeben.

Projektspezifische Schutz-, Bild-, Sicherheits- und Abnahmevorgaben gelten
zusätzlich; diese Regel ersetzt sie nicht.

## 5. Priorisierung und Planpflege

Die Reihenfolge richtet sich zuerst nach **User Value / Business Value**,
anschließend nach Dringlichkeit, Risiken, Abhängigkeiten und Aufwand. Die
Begründung ist am geplanten Ergebnis erkennbar. Sicherheit, gesetzliche
Pflichten, konkrete Störungen und ausdrücklich freigegebene Fast-Track-Fälle
können Vorrang erhalten; die Entscheidung und ihr Grund werden festgehalten.
Eine technische Komponente wird nicht allein deshalb vorgezogen, weil sie
leicht isoliert zu bauen ist. Automatische Priorisierung im privaten Board
bleibt an dessen gesonderte Regeln und Freigaben gebunden.

Neue Anforderungen werden in der zuständigen fachlichen Quelle dokumentiert
und im maßgeblichen aktiven Plan mit ihrem Ziel, Nutzen, Slice, Kriterien und
Quellverweis verbunden. Referenz- und Statusdokumente werden nicht zu
konkurrierenden Backlogs. Ein Planwechsel darf keine offenen oder erledigten
Anforderungen unsichtbar machen.

## 6. Coverage- und Traceability-Check vor Planmigration

Vor dem Ersetzen, Archivieren oder Löschen eines bestehenden Plans wird ein
nachprüfbarer Abgleich erstellt. Er umfasst **alle** bisherigen Ziele,
Anforderungen, offenen und erledigten Einträge, Entscheidungen, Abhängigkeiten,
Prioritäten, Ausnahmen und Statusnachweise. Für jeden Eintrag wird festgehalten:

| Alter Eintrag | Maßgebliche Quelle | Neue Goal-/Epic-/Story-/Task-Kennung | Übernommener Inhalt und Status | Nachweis oder bewusst begründete Entscheidung |
| --- | --- | --- | --- | --- |
| Eindeutiger Pfad/Abschnitt/Kennung | Fachliche Referenz | Ziel im neuen Plan | Anforderungen, Kriterien, offene Arbeit und historischer Stand | Prüfung auf Vollständigkeit und Widerspruchsfreiheit |

Der Check ist bestanden, wenn jeder alte Eintrag genau zugeordnet oder mit
begründeter Entscheidung ausdrücklich als nicht zu übernehmen markiert ist,
alle fachlichen Anforderungen und offenen Arbeiten abgedeckt sind, der
Status nicht fälschlich angehoben wird und keine widersprüchlichen aktiven
Planstände verbleiben. Offene Lücken blockieren das Ersetzen oder Entfernen
des alten Plans. Erst nach dokumentiertem Bestehen werden Verweise und
Planregister angepasst; historische Nachweise bleiben auffindbar.

Die Einführung dieser Regel allein ist **keine** Migration und keine
Abnahme bestehender Pläne. Deren Inhalte und Status bleiben bis zu einem
gesonderten, vollständig geprüften Migrationsschritt unverändert.
