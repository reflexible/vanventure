# Quellengebundene Scope-Prüfung

Status: LOCAL_VERIFIED_PARTIAL; WI-SOT-13-07 bleibt für die konkrete
Projektanwendung offen. Keine globale vollständige Regelabdeckung behauptet.

## Änderung und Prüfumfang

Der bisherige Impact Check hält Teilkataloge sämtlicher Module als Unknown
fest. `tools/sot/scope-review.mjs` ergänzt einen ausdrücklich geprüften Scope,
ohne diese globalen Lücken zu verbergen. Die vertrauenswürdige Aufrufgrenze ist
`assessProjectReviewedScope`; die reine Funktion ist ein interner Baustein für
bereits validierte Eingaben und darf keine ungeprüften Aufruferdaten beglaubigen.

Die Review-Bindung umfasst Vorschlag, gesamten Impact-Bericht, Registry, Graph,
Katalog, alle aktiven Quellenbytes und jedes Überschrifteninventar einschließlich
Präambel. Jede Einheit benötigt eine nachvollziehbare Reviewer-Disposition.
Betroffene Regeln brauchen ein vollständiges, am Quelltext geprüftes
Abschnittsinventar. Alle eingeschlossenen Regeln gehen in den Conflict Check,
auch ohne Treffer bei der Textähnlichkeitssuche.

Ausschlüsse betreffen den Regelscope. Sie behaupten keine unveränderten Bytes
überlappender Elternabschnitte. Das Ergebnis enthält ausdrücklich
`write_authorization: false` und `unchanged_bytes_verified: false`.
Konfliktklassifikation, Nutzerfreigabe und spätere Schreibprüfung bleiben nötig.

## Evidenzmatrix

| Fall | Erwartung / Nachweis |
| --- | --- |
| Vorschlag, Impact, Quelle, Registry, Graph oder Katalog geändert | Bestehender Review-Nachweis wird ungültig. |
| Fehlende, doppelte oder erfundene Abschnittsdisposition | BLOCKED. |
| Unbelegter Reviewer, ausgeschlossener Zielabschnitt | BLOCKED. |
| Nicht aufgelöste Referenz oder fehlendes vollständiges Inventar | BLOCKED. |
| Andere Unknowns, auch nur im Cross-Module-Feld | Bleiben blockierend; keine pauschale Entfernung. |
| Teilkataloglücken nach gültigem Scope-Review | Als globale Unknowns mit Scope-Belegen erhalten; Modul bleibt partial. |
| Mehrere Repository-Wurzeln | Registry, Contracts, Graph und Epic werden aus derselben expliziten Wurzel geladen. |
| Quelländerung während der Prüfung | Bytevergleich gegen denselben Snapshot blockiert; ungültiges UTF-8 wird abgewiesen. |

Checks: `node --test tools/sot/scope-review.test.mjs tools/sot/scoped-coverage.test.mjs`.
Die Negativfälle für den Scope-Baustein sowie das Überschrifteninventar sind
automatisiert. Die Projekt-Disk-Anbindung benötigt noch einen vollständigen
realen Review-Beleg und einen End-to-End-Fall; dafür besteht noch kein PASS.

Unabhängiges Review durch coverage_path und wsjf_safety: Impact-Bindung,
Quell-Snapshot-Rennen, Repository-Kontext und überschneidende Abschnittsgrenzen
wurden korrigiert. Es handelt sich um technische Prüfung, keine Nutzerfreigabe.

## Nächste Integration

Eine konkrete beauftragte Änderung mit realen Scope-/Review-Belegen durch den
Disk-Einstieg führen. Keine automatisch erzeugten Ausschlussbegründungen als
semantisch geprüft behandeln. Ein Metadatenfall wie die Korrektur der belegten
Kataloganzahl 18 auf 19 kann durch exakten Delta-Vergleich begrenzt werden;
dies ist keine Freigabe für beliebige neue Regeltexte.
