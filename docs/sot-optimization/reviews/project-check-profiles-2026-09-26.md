# Lokale Projektprüfprofile – vorbereitender Integrationsnachweis

Scope: WI-SOT-07-10 / WI-SOT-08-09 / WI-SOT-11-07. Kein Item wird allein durch
diesen vorbereitenden Baustein abgeschlossen.

## Gepflegte ausführbare Prüfungen

| Profil | Tatsächlich ausgeführter Bestandstest | Ergebnis |
| --- | --- | --- |
| governance-local | Baselines, Contract-Metadaten, Graph, Governance-Workflow, lokaler Worker-State | 42/42 PASS |
| cms-persistence-local | editor/postgres.test.mjs und editor/editor.test.mjs | 7/7 PASS, isolierte PGlite-Engine |
| public-structure-local | deploy/public-content.test.mjs | 11/11 PASS, statische Komponenten-/Referenzprüfungen |
| mandate-consistency-local | deploy/gesamtauftrag-consistency.test.mjs | 1/1 PASS, bestehende Mandatsreferenzen |
| Profiladapter selbst | tools/sot/project-check-profiles.test.mjs | 4/4 PASS |

Reproduzierbar jeweils mit
`node tools/sot/project-check-profiles.mjs --run-profile <Profil-ID>`.
Die aufgeführten Profil-IDs sind feste Programmdaten; Eingaben wählen ausschließlich
eine davon. Befehle enthalten keine aus Eingabedaten zusammengesetzten Shellstrings.
Shell-Ausführung ist deaktiviert. Release-Check, Backup, Restore und Deployment
werden nicht aufgerufen.

## Umgebung und CMS-Grenze

Die tatsächlichen Testprozesse erhalten nur ausgewählte Betriebssystemvariablen
und NODE_ENV=test. TEST_DATABASE_URL wird einschließlich anders geschriebener
Windows-Varianten entfernt; DATABASE_URL, PostgreSQL-Variablen, Node-Preloads,
API-Schlüssel und Proxy-Konfiguration werden ebenfalls nicht weitergereicht.
Die bestehenden CMS-Tests wählen dadurch ihre isolierte PGlite-Datenbank.
Die ursprüngliche Prozessumgebung wird nicht verändert.

Der FAST-kompatible Command-Adapter startet dieses Modul als Wrapper, damit die
eigentlichen Tests über dieselbe bereinigte Umgebung laufen. Die Umgebung beim
Start des Wrappers bleibt eine Vertrauensgrenze seines Aufrufers: Ein bereits vor
Ausführung des Wrappers durch NODE_OPTIONS geladenes Programm kann der Wrapper
nicht nachträglich verhindern. Der Orchestrator muss deshalb auch seine eigene
Startumgebung kontrollieren.

## Verbleibende Integration

Profile sind begrenzte Regressionstests und keine vollständigen Modulzertifikate.
Analytics bleibt ausdrücklich unresolved: belastbare Runtime-Prüfungen für
Policy, Provider und Event-Invarianten fehlen. Release-Governance erhält aus
lokalen Tests keine Nutzerfreigabe oder Live-Verifikation. Unbekannte Module
bleiben ebenfalls unresolved.

Projektbezogene Requirements-/Trace-Zuordnung, Delta-/Scope-Nachweis, überprüfte
Evidenzpersistenz und die Verbindung zum gemeinsamen Orchestrator fehlen noch.
Ein FULL-Validator darf aus einem bestandenen Profil allein keinen vollständigen
fachlichen PASS ableiten. Visuelle Prüfung, Bildfreigaben, Produktions-PostgreSQL,
Deployment und Live-Abnahme sind nicht Bestandteil dieser Ausführung.

Kein Scrum-Core geändert, keine Website geändert, kein Rollout durchgeführt.

## FAST-Anbindung nach dem vorbereitenden Slice

`runFastCheck` und der weiterleitende inkrementelle Auditpfad akzeptieren nun
`test_profiles: maintained`. Die Auswahl entsteht aus dem berechneten Impact;
fremde Testbefehle dürfen diese Auswahl nicht ersetzen. Fehlende Profile bleiben
BLOCKED. Auch der äußere Testprozess erhält eine bereinigte Umgebung.
Elf gezielte Adapter-/FAST-Tests bestanden, einschließlich echter CMS-Prüfung
und verweigerter Analytics-Abdeckung. Requirements-/Trace-Zuordnung und
semantische FULL-Validatoren bleiben gesonderte Nachweise.
