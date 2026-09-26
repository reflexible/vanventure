# Ausführungsstand der bestehenden Scrum-Planmigration

Stand: 25. September 2026. Der aktive Gesamtplan bleibt `docs/ausbauplan.md`;
der Scrum-Entwurf ist weder verbindlich noch zur Veröffentlichung freigegeben.

## Quellumfang und gesicherter Anfangsstand

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
  Implementierungs-/Live-Prüfung. Acht Kandidaten bleiben teilweise gedeckt:
  SRC-0464.f/i/m/af/ah/am und SRC-0466.s/aa. **PKG-014 ist nicht bestanden.**
  Das Vorbeginn-Gate, Kajak-zuerst-Reihenfolge, Bild-/Variantenfreigaben und
  der konkrete Release-Umfang sind im Entwurf verankert, aber nicht als
  umgesetzt, freigegeben oder live verifiziert ausgewiesen. Der aktive
  `docs/ausbauplan.md` bleibt maßgeblich.
- PKG-015 umfasst SRC-0470 bis SRC-0479: zehn Originalblöcke, 15
  ursprüngliche Kandidaten und acht Nachfolger aus vier Teilungen. Die
  Brief- und Paketkriterien für VAN, EXPLORE und MOVE sowie das Phase-0-Gate
  stehen konkret im Scrum-Entwurf. Der Widerspruch zwischen 8–11 Zielstunden
  im aktiven Gesamtplan und 24 geschätzten Stunden im älteren README bleibt
  bei SRC-0470.a2 offen. **PKG-015 ist nicht bestanden.** Historische
  Quellstände, geplante Arbeit, Implementierung, Freigabe und Live-Nachweis
  bleiben getrennt; für dieses Paket wurde nur die Planung geprüft.
- PKG-017 umfasst SRC-0490 bis SRC-0499: zehn aktuelle Originalblöcke und
  17 individuell geprüfte Kandidaten. Planner-/Board-Trennung, Importgrenze,
  Admin-Trennung, Trends, Planmetriken und Cockpit-Workflow sind im Entwurf
  konkretisiert. Der Reach-Report vom 23.09.2026 ist historischer Quellstand.
  SRC-0491.a bleibt teilweise gedeckt, weil die bereichsübergreifende Test-
  und Restore-Suite noch keine kleinen Story-/Task-Slices hat. **PKG-017 ist
  nicht bestanden.** Die Planprüfung belegt weder Implementierung noch
  Release-Freigabe oder Live-Stand; `docs/ausbauplan.md` bleibt aktiv.

## Ausführung und Grenzen

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

- PKG-018: SRC-0500–SRC-0509, zehn Originalblöcke und 67 Kandidaten einzeln geprüft; 13 Nachfolger aus vier zusammengesetzten OPS-Klauseln. Die Galerievorschau, Restzentralisierung und genaue kleine Slice-Zuordnung bleiben offen. **PKG-018 ist nicht bestanden.** Historische lokale Befunde, Planung, Design-/Release-Freigabe und Live-Stand sind getrennt; Produkt und Live-System wurden nicht geprüft.
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
