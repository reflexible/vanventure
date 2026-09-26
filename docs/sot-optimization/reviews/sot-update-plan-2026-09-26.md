# Prüfgrenze: kontrollierter SoT-Update-Slice

Stand: 26.09.2026 · Teil von `ST-SOT-16`.

`tools/sot/sot-update-plan.mjs` erstellt eine nicht schreibende Vorschau. Sie
verlangt eine APPROVED-Vorschlagskopie, die im Modulregister benannte Quelle,
passende Impact-/Conflict-/Coverage-Prüfungen, den aktuellen SHA-256-Stand,
Traceability und den exakten Zielabschnitt. Fehlende Freigabe, Unknowns,
ungelöste Konflikte oder ein veralteter Quellenhash blockieren.

`applySotUpdatePlan` schreibt ausschließlich einen unveränderten, vorbereiteten
append-only Abschnitt in ein Fachmodul. Es prüft unmittelbar vorher den
Quellenhash, sperrt parallele lokale Updates, erhält CRLF/LF und verlangt einen
bestandenen Post-Validation-Bericht mit Ergebnisdatei. Scheitert die Prüfung,
stellt die Funktion die Originalbytes wieder her. Wenn sich die Datei während
des fehlgeschlagenen Checks geändert hat, überschreibt der Rollback diese
Änderung nicht, sondern meldet `ROLLBACK_BLOCKED`. Der Scrum-Core wird gesperrt.

Verifikation: `node --test tools/sot/sot-update-plan.test.mjs` — 8/8 bestanden.
Die Tests decken Freigabe-/Unknown-/Konflikt-/Hash-Gates, Core-Sperre,
Regelbewahrung, Traceability, CRLF, erfolgreiche Anwendung, exakten Rollback,
veraltete Quelle und aktive Sperre ab.

**Offen:** Die Authentizität der gespeicherten Nutzerentscheidung muss am
Anwendungspunkt erneut verifiziert werden. Semantische Erweiterung und
Superseding, Dependency-/Traceability-Updates und fachliche Post-Validation
bleiben vom konkreten Aufrufer abhängig. In diesem Slice wurde keine
Projektquelle geändert. `ST-SOT-16` bleibt offen.
