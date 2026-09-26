# SoT-Schreibgrenze – gezielter Nachweis vom 26.09.2026

## Umfang und Status

Lokale Implementierung für die additive Fachmodul-Schreibgrenze von WI-SOT-16.
Keine Änderung am geschützten Scrum-Core, am Ausbauplan oder an Projekt-Fachregeln.
Kein produktiver Schreibvorgang und kein Live-Rollout. Der Controller führt den
Work-Item-Status im bestehenden Execution Backlog.

## Änderungen und Evidenz

| Prüffall | Ergebnis | Nachweis |
| --- | --- | --- |
| Änderung eines vorbereiteten Plans samt neu berechnetem Hash | Vor jedem Schreiben blockiert | `apply rejects edited preview even when attacker recalculates its hash` |
| Beliebiger Zusatztext neben dem freigegebenen Inhalt | Bereits beim Preview blockiert | `rejects arbitrary extra text and undefined conflict relationships` |
| Gemischte CRLF-/LF-Zeilenenden und abschließende Leerzeilen | Originalbytes außerhalb der Einfügung exakt erhalten | `preserves every original byte across mixed line endings and trailing blank lines` |
| Unbekannte Konfliktklassifikation | Geschlossene Whitelist: nur EXTENSION und UNRELATED | Test der unbekannten/fehlenden Beziehungen |
| Fachmodulpfad als Hardlink zum Core | Vor Schreiben blockiert; Core unverändert | `blocks a hardlink alias of the protected core before writing` |
| Junction/Symlink außerhalb des Projekts | Vor Schreiben blockiert; externes Ziel unverändert | `blocks directory junction or symlink escaping the physical project root` |
| Gleichzeitige Quelländerung im erfolgreichen Validator | Kein falsches APPLIED, keine Überschreibung fremder Änderungen | `successful validator cannot conceal concurrent source modification` |
| Fehlerhafter Post-Validator | Exakte Quellbytes wiederhergestellt | Bestehender Rollback-Test |
| Veraltete Quelle, Schreiblock, entzogene Authentifizierung, geänderte Registry | Blockiert | Bestehende Regressionsfälle |

Reproduzierbarer Check: `node --test tools/sot/sot-update-plan.test.mjs`.
Ergebnis: **22 Tests bestanden, 0 fehlgeschlagen**.

Die Einfügung wird beim Anwenden erneut aus den aktuellen Originalbytes und dem
Inhalt des authentifizierten, persistierten Approval-Events aufgebaut. Der
angegebene Preview muss dieser Rekonstruktion exakt entsprechen. Der Abschnitt
wird nicht mehr vollständig neu serialisiert. Physische Pfade werden vor dem
Lock und erneut vor dem Schreiben geprüft; Dateialiasse werden zurückgewiesen.

## Persistierte Zielbindung und Recovery

Der gespeicherte Proposal muss `target_heading` und `source_baseline_sha256`
bereits vor dem Approval enthalten. Preview und Apply vergleichen beide Werte
mit dem authentifizierten Approval-Event. Bestehende Proposals ohne diese
Bindung bleiben fuer den Schreibpfad gesperrt. Ein geaenderter Zielanker wird
vor jeder Quellaenderung blockiert.

Vor dem Quellschreiben entsteht exklusiv eine benachbarte
`.sot-recovery.json`. Das Journal enthaelt Originalbytes, Vorher-/Nachher-Hashes,
Transaktions-ID und Approval-Referenz und wird vor dem Schreiben synchronisiert.
Es wird erst nach verifiziert erfolgreicher Validierung oder Ruecksetzung
entfernt. Bei fremden Quellaenderungen bleibt es erhalten.

`recoverSotUpdate` prueft den physischen Pfad, die Journalintegritaet, den
persistierten authentifizierten Approval-Stand und die gebundene Baseline.
Die erwarteten Zielbytes werden erneut aus Originalbytes und genehmigtem Inhalt
rekonstruiert. Nur die exakt passende Zielversion wird zurueckgesetzt; eine
bereits identische Baseline wird ohne erneutes Schreiben bestaetigt. Aktive
Writer, unbekannte Lock-Eigentuemer und fremde Folgeaenderungen blockieren die
Recovery. Ein passender Lock eines nachweislich beendeten lokalen Prozesses
kann uebernommen werden.

| Zusaetzlicher Regressionsfall | Ergebnis |
| --- | --- |
| Fehlende persistierte Zielbindung oder manipulierter Zielanker | Vor dem Schreiben blockiert |
| Tatsaechlicher Child-Prozess-Abbruch vor Post-Validierung | Originalbytes aus dauerhaftem Journal exakt wiederhergestellt |
| Fremde Aenderung nach Prozessabbruch | Keine Ueberschreibung; Journal bleibt erhalten |
| Manipulierte Journal-Baseline trotz neuem Journal-Hash | Gegen persistiertes Approval blockiert |
| Aktiver Writer oder fehlende Approval-Authentifizierung | Recovery blockiert |

Die oben genannten **22 bestandenen Tests** enthalten diese Recovery- und
Zielbindungsfaelle. Sie ersetzen die frueheren Aussagen, dass persistierte
Zielbindung und Prozessabsturz-Recovery noch fehlten.

## Grenzen und offene Integration

- Identitaetspruefung und Post-Validator sind weiterhin injizierte,
  vertrauenswuerdige Adapter. Die Tests beweisen keine reale Nutzeridentitaet,
  semantische Abnahme oder Echtheit des genannten Audit-Artefakts.
- Die Implementierung genehmigt keine neue Fachregel und ersetzt keine
  Golden-Baseline-Freigabe. Der Fachmodulpfad bleibt fuer den Core gesperrt.
- Der Journal-Hash ist keine eigenstaendige digitale Signatur. Die
  Integritaetsbindung beruht auf der authentifizierten, persistierten
  Approval-Baseline. Manipulation der gesamten Vertrauenskette ist nicht
  Gegenstand dieses Nachweises.
- Kooperierende lokale Aufrufer werden durch den Lock serialisiert. Schutz
  gegen absichtliche Dateisystemmanipulation zwischen Pruefung und Umbenennung,
  verteilte Transaktionen und Multi-Host-Recovery sind nicht bewiesen.
- Ein Abbruch waehrend der erstmaligen Journalanlage kann ein unvollstaendiges
  Journal hinterlassen. Bis zur abgeschlossenen Journal-Synchronisation erfolgt
  noch kein Quellschreiben. Beschaedigte Journale blockieren sicher und
  benoetigen Untersuchung. Stromausfallgarantien werden nicht behauptet.
  PID-Wiederverwendung kann sichere Recovery blockieren.
- Keine Vollabnahme von WI-SOT-16, keine globale Regelabdeckung und keinen
  Projektabschluss aus diesen gezielten Sicherheitspruefungen ableiten.
