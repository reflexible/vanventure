# Eingangsquellen und Preservation-Stand

Stand: 26.09.2026 · `ST-SOT-01: PLANNING_MAPPED` · `PLAN_STATUS: APPROVED`
nach der ausdrücklichen bedingten Fortsetzungsanweisung und der gesonderten
FULL-CHECK-Konfliktentscheidung.
Dies ist ein Nachweis der eingelesenen Eingangsquellen, keine zweite aktive
Planung und keine Behauptung einer technisch validierten Preservation.

| Quelle | Provenienz und Integrität | Geprüfter Umfang |
| --- | --- | --- |
| [Bisheriger SoT-Prozess](sources/sot-process-input-2026-09-26.md) | Chat „Source-of-Truth Prozess“, Thread `6ab6e438-57c0-83eb-9ca9-e8cb09d8470c`; SHA-256 der LF- und Rand-Leerraum-normalisierten UTF-8-Fassung mit korrigiertem Evidenzvorspann `93c09cd20e6782a2948dfab9b5d4cc5fa5da938a7ead4b8dbfa4da84c989230f` | 11 nummerierte Abschnitte und Einleitung/Ziel; Quellwortlaut unter der Trennlinie unverändert. |
| [WSJF-/Multi-Agent-Konzept](sources/wsjf-multi-agent-input-2026-09-26.md) | Vollständige Nutzerantwort vom 26.09.2026; SHA-256 der LF- und Rand-Leerraum-normalisierten UTF-8-Fassung mit korrigiertem Evidenzvorspann `09f4eb89ce2e31c0abb99b93d2b8b54c4b856e88aa34331f11d93fe78f8530ae` | 67 nummerierte Abschnitte und Ziel; Quellwortlaut unter der Trennlinie unverändert. |
| [Scrum Core](../scrum-plan.md) | `FINAL_AUDIT_PASS` R5; Golden Tag `golden-scrum-final-audit-pass-2026-09-26` und [Recovery-Nachweis](../scrum-migration/reviews/GOLDEN-BASELINE-2026-09-26.md) | Kanonischer Plan und semantische Core-Anker eingelesen; später nur additiver `EPIC-SOT`-Verweis. |
| Optimierungsauftrag | Nutzeranhang `C:\Users\helmu\.codex\attachments\f091c364-a356-4fee-a76c-26a0fe874165\Eingefügter Text.txt` | Abschnitte 0–62 als Planungs- und Architekturinput. Externer Anhang, kein Repository-SoT. |
| Vollständige Implementierungsliste | Neuer Nutzeranhang vom 26.09.2026 | 32 Phasen (0–31), 4 Baseline-Nachweise erledigt, ursprünglich 178 offene Checklisten-Items; alle 182 Ursprungsitems im [autoritativen Fachmodul](../governance/source-of-truth-and-incremental-planning.md) sichtbar. |

Der Listenabgleich ergab 182/182 konkrete Checklisten-Texte aus dem
Nutzeranhang im Fachmodul, 0 fehlend und 0 zusätzlich gegenüber der
Ursprungsliste. Das Musterbeispiel aus Phase 27 zählt nicht als Work Item.
Nach der 45-Klausel-Planungszuordnung und dem gezielten Fast Merge Check
standen 20 Done und 162 Open unter den Ursprungsitems. Später notwendige
Korrektur-/Preservation-Items sind mit eigenen IDs im Fachmodul dokumentiert.
Alle ursprünglichen 182 Items besitzen eindeutige `WI-SOT-xx-yy`-Kennungen; der Textabgleich
nach Entfernen dieser Kennungen blieb 182/182.

Verwandte maßgebliche oder zu prüfende Artefakte:
[`docs/project-rules/scrum-planning.md`](../project-rules/scrum-planning.md),
[`docs/plan-register.json`](../plan-register.json),
[`docs/scrum-migration/traceability-matrix.csv`](../scrum-migration/traceability-matrix.csv),
[`docs/scrum-migration/constraint-register.md`](../scrum-migration/constraint-register.md),
[`docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md`](../VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md),
[`docs/analytics.md`](../analytics.md),
[`docs/design-guide.md`](../design-guide.md),
[`docs/responsive-templates.md`](../responsive-templates.md) und
[`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`](../vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).
Die Fachquellen behalten ihre jeweiligen Geltungsbereiche.

Die [SoT-Preservation Matrix](sot-preservation-matrix.csv) zerlegt Einleitung,
11 Abschnitte und Ziel in 45 prüfbare Klauseln. Jede besitzt einen
Quellanker, vorgeschlagene Behandlung und Zielstory. Der Strukturcheck fand
45 eindeutige IDs, alle 13 Quellbereiche und auflösbare Zielstories. Damit
ist die **Planungszuordnung 45/45**; `implementation_status=NOT_IMPLEMENTED`
und `semantic_verification=PENDING` bleiben davon getrennt. Eine spätere
technische Preservation ist damit noch nicht bewiesen.

**Offen:** Verifizierte technische SoT-/WSJF-Preservation und vollständiger
Story-/Task-AC-Abgleich. Die atomare WSJF-Planungsabbildung und die
FULL-CHECK-Konfliktentscheidung liegen inzwischen vor.
`SOT_REQUIREMENTS_MAPPED` ist nur für die Planungszuordnung 45/45, nicht für
die technische Validierung, erreicht. `WSJF_RULE_MAPPING` umfasst 120
geplante Klauseln aus 67/67 Abschnitten; Implementation Verification ist offen.

Der [78-Zeilen-Abschnittsindex](requirements-section-index.csv) hält für alle
11 SoT- und 67 WSJF-Abschnitte Titel, normalisierten Abschnitts-Hash und
vorgeschlagene Zielstory fest. Für WSJF verweisen alle 67 Abschnitte nun auf
die [120-Klausel-Preservation-Matrix](wsjf-preservation-matrix.csv) mit
Quellanker, Zielstory, Behandlungsentwurf und geplantem Prüfszenario;
`atomic_mapping=PLANNING_MAPPED`, `verification=PENDING`. Die 11 SoT-Abschnitte
bleiben in der getrennten 45-Klausel-Matrix abgebildet. Planungsabbildung
ist keine technische Umsetzung oder semantische Abnahme.
