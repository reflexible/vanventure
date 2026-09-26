# WI-SOT-18-03 – nachgewiesener Governance-Abschluss am Worker-Übergang

## Änderung

Die bisherige Disk-, Hash-, Proposal-, Scope-, Runtime-, Audit-, Post-Validation-
und Quellprüfung ist als `verifyGovernanceResult` aus dem Integrationsaufruf
extrahiert. Diese Funktion liest ausschließlich und eröffnet keine
Worker-State-Transaktion. Sie gibt die aus geprüften Artefakten rekonstruierte
Completion Evidence zurück.

`createGovernanceWorkerStore` verlangt vom Host ausdrücklich gepinnte
Ergebnisdateien und SHA-256-Werte je Work Item. Der Konstruktor kopiert diese
Vertrauensanker; die Arbeit selbst kann weder eigene Pins wählen noch vorhandene
Pins über ihre Evidence ersetzen. Sein asynchroner Prüfer wird vom Worker Store
während der gesperrten Integration aufgerufen und vergleicht die übergebene
Completion Evidence vollständig mit der aus dem gepinnten Ergebnis abgeleiteten.

`integrateGovernanceResult` prüft weiterhin das Ergebnis und den akzeptierten
Review-/Integrationsstatus. Die eigentliche Integration wird anschließend über
den Store ausgeführt, der die vollständige Prüfung nochmals unter seiner
Schreibsperre erzwingt. Ein Store ohne vertrauenswürdigen Prüfer darf nach der
separaten Worker-State-Korrektur nicht auf Done wechseln.

## Reproduzierbarer Nachweis

`node --test tools/sot/governance-workflow.test.mjs`: 17/17 bestanden.

Die tatsächliche Integration in den temporären Worker Store gelingt mit
gepinnten, gespeicherten Nachweisen. Direkte Store-Aufrufe scheitern bei fehlendem
Prüfer, falschem Host-Pin, ausgetauschter Completion Evidence oder geänderter
aktueller Quelle; die gespeicherten Workerbytes bleiben dabei unverändert.
Ein nachträglich am Aufrufer veränderter Pin ersetzt den im Konstruktor
gesicherten Vertrauensanker nicht. Bestehende Negativfälle prüfen unter anderem
geänderte Ergebnis-/Auditdateien, falschen Work-Item-Scope und Runtime-Drift.

## Grenzen

Die Vertrauensanker müssen aus der tatsächlichen Host-Orchestrierung stammen.
Das Dateisystem ist kein Schutz gegen einen Angreifer mit der Befugnis, den
laufenden Prozess oder seine Vertrauenskonfiguration umzuschreiben.
Die Worker-Schreibsperre sperrt den Worker-State, nicht sämtliche Projektdateien;
deren aktuelle Hashes werden innerhalb des Prüfvorgangs erneut kontrolliert.
Historische Done-Zustände bleiben über die strukturelle Snapshot-Prüfung lesbar.

Bestehende unveränderliche Audits wurden nicht umgeschrieben. Weil die Runtime
Teil des Nachweises ist, bleiben alte Ergebnisse an ihren damaligen Runtime-Stand
gebunden; ein neuer Abschluss benötigt einen passenden aktuellen Nachweis.
Kein Scrum-Core geändert und keine Live-Freigabe erteilt.
