# SOURCE-INTEGRITY-RECOVERY-R6 — 2026-09-26

## Ergebnis

R6 schließt die bei R5 offenen Source/Candidate-Zuordnungen anhand der vorhandenen Inventarblöcke und des aktuellen Quelltexts. Der frühere R5-Bericht bleibt unverändert als damaliger Befund erhalten. Die alten gespeicherten Review-Hashes werden nicht überschrieben. Das ist eine aktuelle Integritätsklassifikation, kein neuer bytegenauer Historiennachweis.

- Quellen mit Status: **22 / 22**.
- `BYTE_VERIFIED`: **12**.
- `FORMAT_ONLY_VERIFIED`: **5**.
- `SEMANTIC_BASELINE_VERIFIED`: **4**; der historische Byte-Snapshot bleibt für diese vier Dateien nicht rekonstruierbar.
- `NON_SEMANTIC_STRUCTURAL_DIFFERENCE`: **1**.
- Unklassifizierte Integritätsquellen: **0**.

### Normalisierungswirkung

Die zulässige Migration-only-Normalisierung ist ausschließlich `CRLF → LF`; keine Whitespace-, Unicode- oder Inhaltsnormalisierung wird als Integritätsbeweis verwendet. Exakte normalisierte Übereinstimmung gilt nur für diese fünf Quellen: `docs/analytics.md`, `docs/betrieb.md`, `docs/creator-system.md`, `docs/project-rules/scrum-planning.md`, `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`. Der Impact-Check über alle 22 Manifestpfade ergibt **5** reine Line-Ending-Übereinstimmungen; keine der übrigen 17 Quellen wird durch diese Regel zusätzlich freigegeben. Historische und aktuelle Roh-Hashes bleiben getrennt erhalten.

### Quellenklassifikation

- `BYTE_VERIFIED` (12): `.codex/skills/outdoor-editorial-photo/SKILL.md`, `AGENTS.md`, `CONTRIBUTING.md`, `README.md`, `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md`, `docs/ausbauplan.md`, `docs/production-briefs/gcs-nach-einem-jahr.md`, `docs/vanventure-cockpit-plan.md`, `video-production/AGENTS.md`, `video-production/README.md`, `video-production/sardinia-2019/README.md`, `video-production/sardinia-2019/analysis.md`.
- `FORMAT_ONLY_VERIFIED` (5): `docs/analytics.md`, `docs/betrieb.md`, `docs/creator-system.md`, `docs/project-rules/scrum-planning.md`, `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`.
- `SEMANTIC_BASELINE_VERIFIED` (4): `docs/design-guide.md`, `docs/responsive-templates.md`, `docs/riverstar/entwurf.md`, `docs/seo.md`. Für `docs/design-guide.md`, `docs/responsive-templates.md` und `docs/riverstar/entwurf.md` bestätigt die zuvor dokumentierte vollständige Inventar-/Candidate-/Traceability-Prüfung die semantische Baseline; `docs/seo.md` erfüllt dieses Kriterium nach R6 Candidate-Recovery. In keinem dieser vier Fälle wird die verlorene Byte-Baseline als rekonstruiert ausgegeben.
- `NON_SEMANTIC_STRUCTURAL_DIFFERENCE` (1): `docs/vanventure-cockpit-mvp.md`. Der abweichende Parserumfang ist genau eine Markdown-Tabellen-Trennzeile; die inventarisierten Quellblöcke und Anforderungstexte stimmen überein. Keine Klausel oder Tabellenzelle mit fachlichem Inhalt wurde als geändert festgestellt.

### Candidate-Recovery SEO und Cockpit

Der Recovery-Bereich umfasste 7 zuvor fehlende SEO-IDs und 56 Cockpit-IDs, insgesamt **63 Quellblöcke**. Für **30 relevante Blöcke** wurden neue, quellentreue Original-Candidates angelegt; **33 Blöcke** wurden einzeln als nicht eigenständige aktuelle Anforderung klassifiziert und in der Traceability begründet. Bestehende Candidate-IDs wurden nicht überschrieben. Die generierten Klausel-Successors bleiben durch Parent-/Source-Verknüpfung getrennt und werden nicht als neue Original-Candidates gezählt. Die ursprünglichen PKG-035-Berichte sind unverändert.

Konsistenz nach Recovery: **1136 / 1136** relevante Source-Blöcke mit mindestens einem Original-Candidate; **1278** nicht relevante Source-Blöcke mit Begründung; **0** Source-IDs ohne Candidate-Quellreferenz; **0** Candidate-Quellreferenzen außerhalb der Traceability-Matrix. Die vollständige Weiterführung Source → Candidate → Nachfolger/Entscheidung → Ziel wird zusätzlich in der Exhaustive-Preflight-Prüfung beurteilt.

### AGENTS.md-Provenienz

Die vollständige Migrationsstart-Version ist im anfänglichen Rollout-Artefakt gefunden worden. Ihr Roh-SHA-256 entspricht exakt dem unverändert gespeicherten historischen Hash `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`. Aktuelle CRLF/LF-Abweichungen bleiben getrennt ausgewiesen. Der ältere Ausnahmebericht `AUDIT-EXCEPTION-AGENTS-BASELINE-2026-09-26.md` und R5 werden nicht nachträglich umgeschrieben.

### Integritätsstatus und Grenze

Keine Quelle ist im R6-Manifest unklassifiziert. Der Cockpit-Strukturunterschied ist nicht fachlich; die vier semantischen Baselines sind explizite per-source Ausnahmen für semantische Vollständigkeit und keine Byte-Verifikation. Source Integrity ist damit kein verbleibender Preflight-Blocker. Die verbleibenden Coverage-Zielzuordnungen und Story-/Referenzbefunde sind separat im Preflight aufgeführt. Keine Originalquelle, historische Hash-Angabe, Paketbericht oder vorheriger Auditbericht wurde von R6 überschrieben.
