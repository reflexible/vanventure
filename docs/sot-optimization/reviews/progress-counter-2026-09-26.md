# Nachweis: Work-Item-Counter

Stand: 26.09.2026 · `WI-SOT-28-01` lokal umgesetzt.

`node tools/sot/progress.mjs --check` liest die tatsächlich markierten
`WI-SOT-*`-Zeilen des autoritativen Fachmoduls, verweigert doppelte IDs und
fehlende Status und vergleicht Total, Done, In Progress, Ready, Blocked, Open
und Prozentwert mit der gespeicherten Anzeige. Bei neuen Work Items oder
Statuswechseln muss die Anzeige aktualisiert werden; sonst schlägt der Check
fehl. `node --test tools/sot/progress.test.mjs` bestand 3/3 gezielte Fälle:
aktueller Plan, veralteter Counter, fehlerhafte ID/Status.

**Grenze:** Der Counter trifft keine fachliche DONE-Entscheidung und ersetzt
weder Acceptance Criteria noch FAST/FULL- oder Freigabegates. Keine Website-
oder Live-Wirkung wurde geprüft.
