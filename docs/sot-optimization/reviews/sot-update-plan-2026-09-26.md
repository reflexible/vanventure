# Prüfgrenze: kontrollierter SoT-Update-Slice

Historischer Teilstand; aktueller Stand einschließlich persistierter Zielbindung
und Crash-Recovery: [Schreibschutz-Nachweis](sot-write-boundary-2026-09-26.md).

Stand: 26.09.2026 · Teil von `ST-SOT-16`.

`tools/sot/sot-update-plan.mjs` erstellt eine nicht schreibende Vorschau. Sie
verlangt eine APPROVED-Vorschlagskopie, die im Modulregister benannte Quelle,
passende Impact-/Conflict-/Coverage-Prüfungen, den aktuellen SHA-256-Stand,
Traceability und den exakten Zielabschnitt. Fehlende Freigabe, Unknowns,
ungelöste Konflikte oder ein veralteter Quellenhash blockieren. Semantische
Beziehungen stammen ausschließlich aus dem Conflict Check; Duplikate,
Widersprüche, unklassifizierte Kandidaten und noch nicht unterstütztes
Superseding werden nicht angewendet.

`applySotUpdatePlan` liest die hashgeprüfte Decision-Event-Datei erneut und
verlangt am Anwendungspunkt erneut einen erfolgreichen Authentifizierungsprüfer
für die exakte Nutzerentscheidung. Es validiert außerdem das aktuelle
Modulregister und bestätigt die aktive Eigentümerschaft. Es schreibt nur einen
unveränderten, vorbereiteten append-only Abschnitt in ein Fachmodul. Es prüft
unmittelbar vorher den Quellenhash, sperrt parallele lokale Updates, erhält
CRLF/LF und verlangt einen bestandenen Post-Validation-Bericht mit Ergebnisdatei.
Scheitert die Prüfung, stellt die Funktion die Originalbytes wieder her. Wenn
sich die Datei während des fehlgeschlagenen Checks geändert hat, überschreibt
der Rollback diese Änderung nicht, sondern meldet `ROLLBACK_BLOCKED`. Der
Scrum-Core wird gesperrt.

Verifikation: `node --test tools/sot/sot-update-plan.test.mjs` — 11/11 bestanden.
Die Tests decken Freigabe-/Unknown-/Konflikt-/Hash-Gates, Core-Sperre,
Regelbewahrung, Traceability, CRLF, Duplikat-/Superseding-Sperre, erfolgreiche
Anwendung, exakten Rollback, veraltete Quelle, aktive Sperre, geänderte
Modulautorität und abgelehnte erneute Authentifizierung ab.

**Offen:** Die Authentifizierungsfunktion muss an den echten Projekt- bzw.
Nutzeridentitätsanbieter angeschlossen sein. Semantische Erweiterung und
Superseding, Dependency-/Traceability-Updates und fachliche Post-Validation
bleiben vom konkreten Aufrufer abhängig. In diesem Slice wurde keine
Projektquelle geändert. `ST-SOT-16` bleibt offen.
