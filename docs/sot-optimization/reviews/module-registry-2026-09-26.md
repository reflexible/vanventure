# Abnahmegrenze: Module Registry, erster technischer Slice

Stand: 26.09.2026 · `ST-SOT-03` lokal teilweise umgesetzt.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Quellstand | Branch `codex/rework-with-project-skills` nach Struktur-Commit `dac0199` und Preservation-Commit `55afeec`; Registry-Dateien in diesem Slice lokal neu erstellt. |
| Registrierte Autoritäten | Sechs eindeutige Referenzen: Scrum-Core, SoT-Fachmodul, Analytics, Design Guide, Responsive Templates und konsolidierter Gesamtauftrag. Eine Autorität ist eine konkrete Themenkennung, keine Behauptung, alle Projektthemen seien bereits erfasst. |
| Pflichtfelder | `module_id`, `name`, `authority`, `source`, `status`, `version`, `dependencies`, `contracts`, `last_verified_baseline`, `semantic_baseline`, `last_audit_status` sind je Eintrag vorhanden. Nicht belegte Versionen, Baselines und Audits bleiben `null`. |
| Validierung | `node tools/sot/module-registry.mjs` validiert sechs Module. `node --test tools/sot/module-registry.test.mjs` besteht 5/5 Fälle für Lookup, doppelte Autorität/ID, ungültige Quelle, unbekannte Dependencies und fehlerhafte Baseline/Contract-ID. |
| Golden-Schutz | Scrum-Core verweist auf den auditierten Tag, CRLF-SHA-256 und semantischen Baseline-Nachweis. Die Registry setzt den aktuellen additiven Planstand nicht mit dem Golden-Auditstand gleich. |
| Offen | `WI-SOT-03-07`: Contract-Verknüpfung erfordert erst den Contract-Katalog aus `ST-SOT-04`. Keine Contract-Brucherkennung, kein Dependency-/Impact-Graph und keine technische SoT-Preservation behauptet. |
| Release/Live | Kein Website-/Cockpit- oder Produktionscode geändert; keine Live-Verifikation beansprucht. |

**Ergebnis:** Der Registry-Kern ist lokal validiert. `ST-SOT-03` bleibt offen,
bis Contract-IDs aus `ST-SOT-04` eingetragen und geprüft sind. Nächster
ausführbarer Slice: `WI-SOT-04-01`.
