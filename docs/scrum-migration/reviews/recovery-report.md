# Controller Recovery Report — 25.09.2026

Status: **Recovery abgeschlossen; Migration steht bei `coverage_blocked`, Final Audit `NOT_STARTED`.** Es wurden keine Reviews neu erzeugt. Die vorhandenen Berichte PKG-045 bis PKG-054 bleiben erhalten.

- **PKG-045-Fehler:** Das Batch-Statusschema verlangt pro Paket `PackageID`, boolesches `Integrated`, `Status` aus `INTEGRATED` / `NEEDS_DECISION` / `NEEDS_RECHECK` und ganzzahliges `CandidateCount`. Im ursprünglichen BATCH-004-Integrationsprotokoll stand bei PKG-045 `Integrated: 63`; die Kandidatenzahl war irrtümlich im Boolean-Feld abgelegt. Derselbe fehlerhafte Ausgabeversuch ist für PKG-046 bis PKG-049 protokolliert. Die erhaltene reparierte `BATCH-004-status.json` enthält für alle fünf Pakete valide Typen. BATCH-003 und BATCH-005 Statusdateien sind ebenfalls valide. Für BATCH-001/002 existieren Integrationsberichte ohne separates strukturiertes Statusartefakt.
- **Zählerursache:** BATCH-005 schrieb die 264 Kandidaten bereits in die vier zentralen Migrationsdateien. Der anschließende `Batch count underflow: expected 264, got 0` entstand, weil die Nachprüfung den alten Pending-Zähler nochmals von bereits gespeicherten Kandidaten abzog. Kein Kandidat musste erneut integriert werden.
- **Kandidatenabgleich:** 2,908 eindeutige Originalkandidaten, keine fehlenden oder doppelten Candidate IDs; alle haben Paket, Zielstelle und Prüfbegründung. 356 Nachfolger sind separat ausgewiesen. Konsistenter Stand: **2.908 integriert, 0 geprüft aber nicht integriert, 0 verbleibend**. Paket-Summen: PKG-001–044 **2.357**, PKG-045–049 **287**, PKG-050–054 **264**. Originalblöcke: **1.105 / 1.106** mit Kandidatenreview; ein relevanter Block besitzt keinen Kandidateneintrag und wurde nicht hinzuerfunden.
- **Offene Coverage:** Originalkandidaten: 876 Partially Covered, 35 Unresolved. Die 356 Nachfolger ergänzen 6 Partially Covered und 4 Unresolved; damit bleiben **921** offene Coverage-Lücken im Gesamtumfang. Dies ist keine Zahl von Nutzerfragen.
- **Entscheidungsklassifikation** (849 deduplizierte Fragegruppen): **18 USER_DECISION**, **3 AUTO_RESOLVABLE**, **819 TECHNICAL**, **0 eigenständige DUPLICATE-Einträge**, **9 INSUFFICIENT_EVIDENCE**. Wiederholte Quell-IDs bleiben in kanonischen Gruppen verknüpft. Nur 18 echte fachliche Nutzerentscheidungen werden als solche gezählt.
- **Packages:** PKG-001–PKG-054 besitzen jetzt je einen validen Controllerstatus. PKG-040 bleibt `NEEDS_DECISION`. PKG-045 ist `INTEGRATED`; PKG-046–048 `NEEDS_DECISION`; PKG-049 `INTEGRATED`; PKG-050–051 `NEEDS_DECISION`; PKG-052 `INTEGRATED` (die bestehende Scope-Regel beantwortet die Frage); PKG-053–054 `INTEGRATED` mit `INSUFFICIENT_EVIDENCE` zur v18-Endkontrolle. Alle zehn Reviews 045–054 sind vorhanden und verwendbar.
- **Fortsetzung:** Keine ungeprüften oder ungeintegrateden Pakete mehr. Der nächste Migrationsschritt ist die gezielte Coverage-Reparatur nach Bearbeitung der klassifizierten Nutzerentscheidungen, technischen Nachweise und Evidenzlücken. Es wurde kein Controller-Worker gestartet; Final Audit bleibt `NOT_STARTED`.

Die Recovery beruht auf gespeicherten Kandidaten-, Matrix-, Queue-, Batch- und Reviewartefakten. Sie ist eine Zustands-/Strukturrekonstruktion und **kein Final-Audit-PASS**.


## Nachfolgende Coverage-Reparatur (Checkpunkt 25.09.2026, 20:40 UTC)

COVERAGE-R1-001 bis R1-003 sowie R2-001 sind abgeschlossen: 40 Originalblöcke
und 291 Kandidaten wurden gezielt geprüft; die ersten drei Batches deckten 33
Klauseln planerisch ab, während R2-001 15 offene Klauseln bestätigt. Der aktuelle
Stand ist 899 Coverage-Lücken und 835 aktive, deduplizierte Review-Fragegruppen:
17 `USER_DECISION`, 3 `AUTO_RESOLVABLE`, 808 `TECHNICAL`, 7
`INSUFFICIENT_EVIDENCE`, 0 eigenständige `DUPLICATE`. Die frühere konditionale
Bildfrage zu SRC-0466 bleibt durch die Sperrbedingung beantwortet, bis eine
konkrete Fassung zur Auswahl vorliegt. Das strukturierte Quellen-/Ziel-Schema
besteht; der Final Audit wurde nicht gestartet.


## Kontrollpunkt nach kollisionsfreier Fortsetzung — 25.09.2026 20:56

Der Controller stoppte nach dem fertiggestellten Review `SRC-0800–SRC-0809`,
nachdem STOP gesetzt worden war. Ein fehlerhaft wiederverwendeter R1-001-Name
wurde als `COVERAGE-R2-001` zusätzlich gesichert; der frühere R1-Bericht und
sein Protokoll wurden aus den unmittelbar zuvor gesicherten Kopien restauriert.
`parallel-scrum-migration.py` vergibt nun fortlaufende unbenutzte Paketnummern
und verweigert vorhandene Ergebnisdateien. Fortschrittsaktualisierung und
Strukturprüfung bestanden (1.105 Quellenblöcke, 2.908/2.908 Originalkandidaten,
356 Nachfolger, 57 Stories, 35 Unresolved). Das ist keine vollständige direkte
Quell-/Zielprüfung und kein Final-Audit-PASS. Der Final Audit bleibt
`NOT_STARTED`; die gezielte Coverage-Reparatur wird fortgesetzt.
