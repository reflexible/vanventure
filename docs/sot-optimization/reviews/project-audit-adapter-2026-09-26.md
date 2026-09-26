# Projekt-Auditadapter – Review und lokale Abnahme

Scope: vorbereitende gemeinsame Anbindung für WI-SOT-07-10, WI-SOT-08-09 und
WI-SOT-11-07. Prüfer/Umsetzung: `/root/coverage_path`.

## Behobene Befunde

- Registry und Contracts werden aus den exakt erfassten Bytes geparst und
  validiert. Der Graph wird aus diesen Objekten und dem erfassten Supplement
  gebaut. Zusätzliche ungebundene Lesevorgänge bestimmen diese Objekte nicht mehr.
- Eine erneut erfasste Datei darf ihren ersten Snapshot nicht überschreiben:
  unterschiedliche Bytes während der Erfassung blockieren.
- Ausgabeordner werden vor Prüfung und vor ergänzender Evidenzpersistenz physisch
  kontrolliert. Pfadtraversal, Junction-/Symlink-Umleitung und vorhandene
  Ergebnis-/Evidenzdateien werden abgelehnt.
- Fachprüfer erhalten einen abgetrennten Kontext. Eine versehentliche Änderung
  ihres Impact-Objekts verändert nicht den Audit-Scope des Runners.
- Geänderte, gelöschte oder umgeleitete Quelldateien nach der Prüfung erzeugen
  ein gesperrtes Gesamtergebnis mit konkreter Drift-Liste.

`structuredClone` wandelt Buffer in Uint8Array um. Die vorhandene Delta-Engine
akzeptiert beide expliziten Byteformen; ein Regressionstest bestätigt den
korrekten NO_CHECK-Fall mit geklonten Ausgangsbytes.

## Prüfung

`node --test tools/sot/project-audit.test.mjs` — **7/7 bestanden**:

1. Tatsächlich unveränderte Quellen im angegebenen Projekt ergeben NO_CHECK;
   Ergebnis und ergänzende Evidenz bleiben unveränderlich.
2. Caller-Eingaben können aktuelle Quellen, Metadaten, Tests oder Validatoren
   nicht überschreiben.
3. Geänderte Quelldateien erhalten kein NO_CHECK; fehlende FULL-Prüfer blockieren.
4. Eine Quelldateiänderung im Fachprüfer invalidiert das Gesamtergebnis;
   manipulierte Kontextkopien verändern den Scope nicht.
5. Ein behauptetes semantisches PASS ohne passenden Quellhash scheitert.
6. Ein echter vorhandener Mandatsreferenztest wird als gepflegtes Profil in einer
   isolierten Projektkopie gemeinsam mit einem exakt begrenzten Byteprüfer
   erfolgreich über FULL ausgeführt.
7. Traversal, bestehende Evidenz und aus dem Prüfverzeichnis führende
   Verzeichnisverknüpfungen werden abgewiesen.

## Abnahmegrenzen

Fachsemantik bleibt Verantwortung der ausdrücklich vom Host konfigurierten
Prüfer; Quellenhash und Referenz allein beweisen keine umfassende Fachabnahme.
Nicht gepflegte Profile bleiben gesperrt. Das inzwischen separat ergänzte
Analytics-Inaktivitätsprofil belegt nur den lokalen deaktivierten Zustand;
es zertifiziert keine aktive Analytics-Runtime oder Freigabe. Der erfolgreiche
FULL-Test zertifiziert nur den isolierten vorhandenen Referenztest plus die
beschriebene exakte Byteänderung, keine allgemeine Modulvollständigkeit.

Aufrufer müssen das Gesamtergebnis PROJECT_AUDIT_PASS verwenden. Ein internes
Audit kann für seinen früheren Snapshot PASS sein, während anschließende Drift
das ergänzende Projektgesamtergebnis bereits auf BLOCKED setzt. Es wurden keine
alten Audits überschrieben, Produktionsdatenbanken angesprochen oder Release-,
Backup- und Deploymentbefehle ausgeführt.

Der Root integriert die gepflegte Original-Traceability-Zuordnung separat.
Dieser Bericht nimmt keine gemeinsamen Work-Item-, Registry- oder Planänderungen vor.

## Anbindung an die tatsächliche Post-Validation

`runSotPostValidation` verwendet für `auditInput.test_profiles: maintained` jetzt
den gemeinsamen Projekt-Auditrunner. Es übergibt gezielt nur historische
Baselines/Manifeste, Änderung und Zielpfad. Aktuelle Registry, Contracts, Graph,
Quellen, Original-Traceability und Testauswahl ermittelt der Runner selbst.
Die bisherige Prüfung der vom Aufrufer gelieferten aktuellen Quellbytes bleibt
als vorgeschaltete Kontrolle bestehen. FULL-Prüfer stammen aus der expliziten
Host-Konfiguration `auditInput.validators`.

PROJECT_AUDIT_BLOCKED blockiert die Post-Validation auch dann, wenn der interne
Snapshot-Audit vorher PASS war. `project_audit_output` und
`project_audit_sha256` referenzieren zusätzlich das unveränderliche
Projektgesamtergebnis. Nach den anschließenden Konsistenz-/Trace-Callbacks werden
Quellen und Projektprüfbeleg nochmals auf Byte- und Pfadidentität geprüft.
Der bestehende Legacy-Pfad bleibt erhalten.

`node --test tools/sot/post-validation.test.mjs` — **9/9 bestanden**.
Zusätzliche Fälle: fehlende Release-Abdeckung bleibt trotz vom Caller angebotenen
Tests blockiert; gepflegtes echtes Mandatsprofil läuft in isolierter Kopie;
frühe und späte Drift blockieren; ein tatsächliches bestehendes Work Item wird
über kopierte Projektmatrizen auf den gepinnten Originalauftrag zurückgeführt.
Die Trace-Prüfung kennzeichnet Implementierungsabdeckung weiterhin als UNKNOWN.

## Ausführbare Quellen und spätere Codeänderungen

Vor den Profilprüfungen erfasst der Runner jetzt zusätzlich die Git-erfassten
Testdateien und gepflegte, profilspezifische Code-/Konfigurationsbereiche:
Governance unter tools/sot, CMS unter editor, öffentliche Strukturdateien und
deren Editor-Runtime, Mandatsreferenzen sowie die ausdrücklich benannten Dateien
des Analytics-Aktivierungsgates. package.json/package-lock.json gehören zu den
entsprechenden Runtime-Profilen. Fremde QA-/Video-Dateien werden nicht gelesen.

Die festen Testrefs müssen in Git erfasst sein. Nicht erfasste ausführbare Dateien
innerhalb des ausgewählten Profilbereichs blockieren, statt aus der Bindung
herauszufallen. Der Scope wird nach den Prüfungen erneut aus Git bestimmt;
Bestandsänderungen und veränderte Bytes invalidieren das Gesamtergebnis.

Runner, Profiladapter, Traceability-Adapter und die verwendeten Audit-/Delta-
Implementierungen werden außerdem separat als runtime_source_sha256 gebunden.
Der Ergebnisdatensatz enthält die tatsächlich geprüften profile_source_paths.

Der vorhandene isolierte FULL-Regressionstest führt nun zusätzlich einen
Aktivprozess-Checker nach den erfolgreichen Modul-/Profiltests aus, der eine
bereits geprüfte Testdatei verändert. Trotz internem Audit-PASS und Profil-PASS
wird PROJECT_AUDIT_BLOCKED mit dem konkreten Dateipfad gespeichert.
Projekt-Audittests erneut **7/7 bestanden**. Isolierte Testkopien werden vor ihrer
Prüfung ausdrücklich in einem eigenen temporären Git-Repository erfasst.

## Abschließende Wiederholungsprüfung

Am 26.09.2026 nach der parallelen Profilintegration erneut ausgeführt:
`node --test tools/sot/project-audit.test.mjs tools/sot/post-validation.test.mjs`
— **16/16 bestanden, 0 übersprungen**. Dies umfasst die sieben Adapter- und
neun Post-Validation-Fälle einschließlich Drift an bereits geprüften
ausführbaren Quellen. Kein Produktionszugriff und kein Release ausgeführt.

Zur gemeinsamen Integration stehen die neuen Dateien project-audit.mjs,
project-audit.test.mjs und dieser Bericht sowie die Änderungen an
post-validation.mjs und post-validation.test.mjs bereit. Commit und betroffene
Planstatus-Aktualisierung erfolgen durch den koordinierenden Root.
