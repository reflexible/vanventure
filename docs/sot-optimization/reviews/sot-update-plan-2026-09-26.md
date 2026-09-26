# Prüfgrenze: SoT-Update-Vorschau

Stand: 26.09.2026 · vorbereitender Teil von `ST-SOT-16`.

`tools/sot/sot-update-plan.mjs` erstellt ausschließlich eine nicht schreibende
Vorschau. Sie verlangt eine APPROVED-Vorschlagskopie, die im Modulregister
benannte Quelle, passende Impact-/Conflict-/Coverage-Prüfungen, einen aktuellen
SHA-256-Stand, Traceability und den exakten Zielabschnitt. Fehlende Freigabe,
Unknowns, ungelöste Konflikte oder ein veralteter Quellenhash blockieren.

Die Vorschau erlaubt vorerst nur eine additive Abschnittserweiterung und erhält
den vorhandenen Abschnittsinhalt exakt. Den Scrum-Core weist dieser Pfad mit
einem eigenen Fehler zurück. Die Datei wird nicht geschrieben; eine erfolgreiche
Vorschau meldet `PREPARED_NOT_APPLIED`.

Verifikation: `node --test tools/sot/sot-update-plan.test.mjs` — 5/5 bestanden.
Abgedeckt sind fehlende/ungültige Freigabe, Unknowns, Konflikte, veralteter Hash,
Core-Sperre, Regelbewahrung, Traceability und CRLF-Erhalt.

**Offen:** authentifizierte Freigabe beim Lesen erneut prüfen, tatsächlichen
atomaren Schreibvorgang und Rollback integrieren, Erweiterung/Superseding
semantisch modellieren und danach `WI-SOT-17` Post-Validation ausführen. Das
SoT-Update ist damit noch nicht anwendbar und kein Item von ST-SOT-16 erledigt.
