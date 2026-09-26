# Story- und Epic-Qualitäts-Recovery — 2026-09-26

Status: `RECOVERY_BLOCKED` — Einzelreview vollständig dokumentiert, aber mehrere konkrete Slice-/Traceability-Reparaturen sind noch offen. `SRC-0793` bleibt `Partially Covered`. Kein neuer Final Audit wurde gestartet.

## Prüfbasis

Jede der 71 katalogisierten Stories wurde erneut aus Story-Satz, Value-Typ, Priorität, Status, Dependencies, vollständigen Acceptance Criteria, Source-IDs und zugehörigen `story-tasks.csv`-Zeilen gegen `docs/project-rules/scrum-planning.md` §§1–4 geprüft: INVEST, Nutzer-/Businesswert, vertikale Nutzbarkeit, Größe/Bündelung, Schätzbarkeit, beobachtbare AC und sichtbare Abhängigkeiten. Ergebnisse beruhen nicht auf dem alten Status. Drei Story-Reviewer hatten disjunkte Bereiche (24, 33 und 14 Stories); ein unabhängiger Epic-Reviewer prüfte alle Epic-Objekte/-Abschnitte und Skeleton-/Enabler-Regeln. Der aktuelle Plan hatte vor der Recovery nur 56 Story-Abschnitte; die 15 bereits vorhandenen Katalog-Stories wurden ohne neue IDs ergänzt.

Die Anfrage nannte 10 Epics; der aktuelle Katalog und Draft enthalten tatsächlich 11. Alle 11 vorhandenen Epics wurden geprüft und in den Artefakten explizit gezählt. Keine Epic-ID wurde stillschweigend entfernt.

## Story-Einzelbefunde

| Story | Urteil | Prüfergebnis / notwendige Korrektur |
|---|---|---|
| `ST-WEB-01` | OPEN_REPAIR | Shared navigation, hero and galleries span all public routes and form a very large AC/source/task set; narrow to one bounded common-component outcome or split distinct user outcomes. Release-wide checks remain outside this story. |
| `ST-WEB-02` | OPEN_REPAIR | Activity/vehicle templates span broad route/viewport scope; verify estimable short increment and separate template outcomes if independent acceptance is practical. |
| `ST-WEB-03` | REVIEWED_BOUNDED_ENABLER | Cross-route release/risk evidence is justified and has named successors ST-WEB-02/04/05, minimum checks and observable report; still ensure common release gates do not inflate its implementation slice. |
| `ST-WEB-04` | PASS_WITH_ESTIMATE_CAVEAT | Travel-report generator outcome is user-visible and bounded; estimate the 46-source/3-task breadth before readiness. |
| `ST-WEB-05` | PASS_WITH_ESTIMATE_CAVEAT | Bike-profile outcome is bounded with explicit four-profile exception; estimate breadth and keep incomplete profiles open. |
| `ST-WEB-06` | PASS | Equipment/facts/link disclosure and legal-information outcomes are clear, testable slices with appropriate sign-off dependencies. |
| `ST-WEB-07` | PASS | Equipment/facts/link disclosure and legal-information outcomes are clear, testable slices with appropriate sign-off dependencies. |
| `ST-PHOTO-01` | OPEN_REPAIR | Cross-cutting 59-source/16-task protection workflow may be a justified enabler but has no explicit minimum boundary or documented why it cannot sit in value stories; split independent custody/privacy outcomes or justify downstream unlocks. |
| `ST-PHOTO-02` | PASS_WITH_HOLD | Distinct editorial/image outcomes are bounded; existing motif/privacy/publication holds remain explicit and cannot be treated as accepted implementation. |
| `ST-PHOTO-03` | PASS_WITH_HOLD | Distinct editorial/image outcomes are bounded; existing motif/privacy/publication holds remain explicit and cannot be treated as accepted implementation. |
| `ST-PHOTO-04` | PASS_WITH_HOLD | Distinct editorial/image outcomes are bounded; existing motif/privacy/publication holds remain explicit and cannot be treated as accepted implementation. |
| `ST-PHOTO-05` | OPEN_REPAIR | Single mast-removal image outcome is bounded, but no implementation/review task is linked; add a scoped task if it remains planned work. |
| `ST-PHOTO-06` | PASS_WITH_HOLD | Distinct editorial/image outcomes are bounded; existing motif/privacy/publication holds remain explicit and cannot be treated as accepted implementation. |
| `ST-PHOTO-07` | OPEN_REPAIR | Generic future-derivative process story overlaps protection/release rules without a specific commissioned outcome; narrow to a concrete item or keep it as policy/DoD rather than an independent backlog story. |
| `ST-SEO-01` | OPEN_REPAIR | Baseline SEO, private-route noindex and all-route future changes are bundled; separate privacy and editorial metadata verification or narrow to a bounded baseline. |
| `ST-SEO-02` | OPEN_REPAIR | Search Console and Bing onboarding/domain/sitemap/indexing/metrics combine independently verifiable provider outcomes; split providers or make the shared outcome explicitly estimable. |
| `ST-SEO-03` | PASS | Selected video-to-relevant-site link is a narrow, evidence-dependent user outcome. |
| `ST-SEO-04` | OPEN_TASK | Content facts/outcomes are bounded per destination, but no execution task is attached; add a concrete task before implementation readiness. |
| `ST-SEO-05` | OPEN_TASK | Content facts/outcomes are bounded per destination, but no execution task is attached; add a concrete task before implementation readiness. |
| `ST-SEO-06` | OPEN_TASK | Content facts/outcomes are bounded per destination, but no execution task is attached; add a concrete task before implementation readiness. |
| `ST-SEO-07` | OPEN_TASK | Content facts/outcomes are bounded per destination, but no execution task is attached; add a concrete task before implementation readiness. |
| `ST-CON-01` | REPAIRED | Confirmed as the existing VAN longform slice; no longer described as five benefits bundled in one story. Other benefits use existing ST-CON-05–08; task/source/approval mapping remains per slice. |
| `ST-CON-02` | PASS | EXPLORE longform is independently valuable with explicit fact/release prerequisites. |
| `ST-CON-03` | PASS_WITH_SCOPE_CAVEAT | MOVE longform is independently valuable; select one accepted Bike-or-Kayak variant per story scope rather than combining both. |
| `ST-CON-04` | PASS_WITH_HOLD | Riverstar editorial outcome is coherent; factual, location, image and publication holds stay open. |
| `ST-VID-01` | REPAIRED_WITH_HOLD | Narrowed the story to the short-to-full-film link and moved unresolved privacy-method equivalence into an explicit separate publication/version hold; changed stale Done status to Existing / Verify. |
| `ST-AUTH-01` | OPEN_REPAIR | Authentication, account mapping, shared sessions, role administration, navigation, OAuth, audit and security span distinct user outcomes; historical Done must not obscure multi-slice scope. Split/reuse outcomes and preserve evidence. |
| `ST-CMS-01` | OPEN_REPAIR | Architecture/inventory gate and first usable revision/page-model workflow are bundled; split prerequisite gate from first editor outcome and remove CMS 2.3 task duplication. |
| `ST-CMS-02` | OPEN_TASK | Publish/archive outcome is coherent, but CMS 2.3 task duplicates CMS-01; assign one owner and align AC. |
| `ST-CMS-03` | PASS | Published-only route, working-only in-context edit, and review-revision creation are separate user-visible slices. |
| `ST-CMS-04` | PASS | Published-only route, working-only in-context edit, and review-revision creation are separate user-visible slices. |
| `ST-CMS-05` | PASS | Published-only route, working-only in-context edit, and review-revision creation are separate user-visible slices. |
| `ST-CMS-06` | OPEN_REPAIR | Media selection promises an editor capability but current AC/tasks mainly describe PostgreSQL metadata/storage; specify a full eligible-asset selection flow or justify as enabler. |
| `ST-CMS-07` | OPEN_AC | Clarify Video-CTA versus embed behavior by page type; preserve existing single-store boundary. |
| `ST-CMS-08` | OPEN_TASK | Published reference-page migration is bounded; shared evidence task duplicates CMS-09 and needs per-case separation/one owner. |
| `ST-CMS-09` | OPEN_TASK | Private unpublished reference article is bounded; shared evidence task duplicates CMS-08 and needs per-case separation/one owner. |
| `ST-AN-01` | OPEN_REPAIR | Walking-skeleton outcome is explicitly real input → processing → visible output, but story additionally bundles discovery, architecture, policy/schema, provider operation, full test matrix and rollout; preserve skeleton as small slice and move follow-ons. |
| `ST-AN-02` | OPEN_REPAIR | All-page/language scope overlaps CMS routes and ST-AN-08; bound to static/public pages and remove duplicate CMS task/acceptance. |
| `ST-AN-03` | PASS | Central outgoing-link events form a bounded metric family with failure-safe navigation. |
| `ST-AN-04` | OPEN_REPAIR | Reading depth, video consent/starts and optional gallery views combine distinct event families; split or justify one small outcome and remove duplicated AC. |
| `ST-AN-05` | OPEN_REPAIR | UTM setup, reports/goals, funnels and 28-day review combine setup and analysis; narrow or split their independently useful outcomes. |
| `ST-AN-06` | OPEN_REPAIR | Provider portability is future capability without a current dependent outcome; defer until needed or evidence an actual dependent story. |
| `ST-AN-07` | PASS_AS_DECISION | Bounded post-report decision about aggregate retention; not delivered analytics functionality. |
| `ST-AN-08` | OPEN_TASK | CMS-specific page-view behavior is sensible but overlaps AN-02; keep CMS behavior here and remove duplicate AN-02 references/tasks. |
| `ST-AN-09` | PASS | Defined central internal-navigation event family is bounded and testable. |
| `ST-INS-01` | OPEN_REPAIR | Combines historic baseline with dashboard/videos/planner/context, OAuth/sync, schema, audit export and data-quality work; split/reuse existing INS-02–06 and specify narrow baseline outcome. |
| `ST-INS-02` | PASS | Pagination/import boundary has a narrow, testable 500/501 edge and idempotency check. |
| `ST-INS-03` | OPEN_AC | Disconnect security slice is coherent, but remove unrelated connect-UI/callback requirements unless necessary to prove disconnection; retain SRC-1107 remote-revocation logging. |
| `ST-INS-04` | OPEN_REPAIR | Traffic sources, retention/engagement time series, five horizons, API limits, detail page and long-tail are independently useful reports; split or establish a narrow first increment. |
| `ST-INS-05` | OPEN_REPAIR | Target metrics, actual-hours updates and 28-day efficiency review are three outcomes; sequence into explicit slices and retain missing-value safeguards. |
| `ST-INS-06` | OPEN_REPAIR | Export, external analysis, human review and writes to both Planner and Master Context span independent outcomes; split target-specific end-to-end slices and preserve no-autonomous-write boundaries. |
| `ST-BRD-01` | REPAIRED | Verified bounded Backlog slice; board transitions are in ST-BRD-05, tablet ST-BRD-02, warning inbox ST-BRD-03 and Marvin ST-BRD-04. Draft, catalog, tasks and candidate targets aligned. Phase-0/release gates remain open. |
| `ST-BRD-02` | OPEN_SCOPE | Tablet/touch/accessibility slice is user-visible but mixes kitchen display/access to five areas with board controls and unresolved tablet role; limit to tablet interaction or separate non-board access outcome. |
| `ST-BRD-03` | CONDITIONAL_PASS | One end-to-end authenticated/idempotent critical-warning-to-inbox/card flow; bound prerequisite decisions and do not imply activation before policy gates. |
| `ST-BRD-04` | PASS_WITH_GATE | Explicitly ordered Marvin backlog creation/Offen action with strong negative permission cases and bounded scope. |
| `ST-OPS-01` | OPEN_REPAIR | Website and Cockpit release checks, restore, health/routes/UI, dumps, monitoring and secrets cover multiple operational outcomes; split release verification, restore readiness and monitoring. |
| `ST-OPS-02` | OPEN_REPAIR | Legal text/retention/domain/OAuth verification/production switch aggregate prerequisites and production-login outcome; separate auditable prerequisites from narrow login slice. |
| `ST-OPS-03` | CONDITIONAL_PASS | One externally notified critical-event delivery outcome with two distinct triggers; internal inbox remains mandatory and external delivery stays disabled pending activation. |
| `ST-CON-05` | REPAIRED | First VAN short is distinguished from the second in the story statement; separate output and evidence retained. |
| `ST-CON-06` | REPAIRED | Second VAN short is distinguished from the first in the story statement; separate output and evidence retained. |
| `ST-CON-07` | PASS | Evidence-backed VAN website addition is independently reviewable, gated on verified facts, derivatives and publication decision. |
| `ST-CON-08` | REPAIRED | Changed actor/value from viewer to editor/business value to match the 28-day editorial review outcome. |
| `ST-CON-09` | PASS | EXPLORE first/second shorts and website addition remain separate with own evidence and publication gates. |
| `ST-CON-10` | PASS | EXPLORE first/second shorts and website addition remain separate with own evidence and publication gates. |
| `ST-CON-11` | PASS | EXPLORE first/second shorts and website addition remain separate with own evidence and publication gates. |
| `ST-CON-12` | REPAIRED | Changed actor/value from viewer to editor/business value to match the 28-day editorial review outcome. |
| `ST-CON-13` | PASS | MOVE first/second shorts and website addition remain separate; Bike-or-Kayak choice is still a scope caveat inherited from ST-CON-03. |
| `ST-CON-14` | PASS | MOVE first/second shorts and website addition remain separate; Bike-or-Kayak choice is still a scope caveat inherited from ST-CON-03. |
| `ST-CON-15` | PASS | MOVE first/second shorts and website addition remain separate; Bike-or-Kayak choice is still a scope caveat inherited from ST-CON-03. |
| `ST-CON-16` | REPAIRED | Changed actor/value from viewer to editor/business value to match the 28-day editorial review outcome. |
| `ST-BRD-05` | CONDITIONAL_PASS | Independent board workflow slice with explicit states/allowed item types/atomic claim/history; blocked on Phase-0 and release gate. |

## Epic- und Walking-Skeleton-Prüfung

| Epic | Stories | Befund |
|---|---:|---|
| `EPIC-WEB` | 7 | 7; gemeinsamer Komponenten-/Template-Nutzen sichtbar; Grenzen und Ablauf jetzt strukturiert erfasst. WEB-01/02/03 bleiben Größen-/Scope-Reparaturpunkte; WEB-03 Enabler ist begründet mit WEB-02/04/05 als Nachfolgern. |
| `EPIC-PHOTO` | 7 | 7; motivbezogene Ergebnisse kohärent. PHOTO-01 enabler-/scope rationale offen; PHOTO-07 generische Prozessstory offen. |
| `EPIC-SEO` | 7 | 7; Zielnutzen auffindbar/belegt. SEO-01/02 scope offen; SEO-04–07 fehlen Ausführungstasks. |
| `EPIC-CONTENT` | 16 | 16; vollständige Langform/Shorts/Web/Review-Slices existieren; ST-CON-01 Alttext korrigiert. 28-Tage-Actor wurde korrigiert; MOVE variant caveat bleibt. |
| `EPIC-VIDEO` | 1 | 1; einzelner historischer Video-Link-Slice. Als historisch begrenzte Gruppe erhalten; nicht als aktiver Mehrstory-Umsetzungsblock behandeln. |
| `EPIC-ACCESS` | 1 | 1; Singleton AUTH-01 ist mit Auth, Sessions, Rollen, UI, OAuth und Audit zu groß; in eigenständige Nutzerslices zerlegen. |
| `EPIC-CMS` | 9 | 9; Lifecycle enthält klare Schritte, aber CMS-01 Gate + Revision gebündelt; CMS-06 kein fertiger UI-Slice; CMS-02/08/09 Taskduplikate offen. |
| `EPIC-ANALYTICS` | 9 | 9; AN-01 ist konkret geplantes Walking Skeleton; AN-01/02/04/05/06/08 haben offene Size-/Overlap-Reparaturen. |
| `EPIC-INSIGHTS` | 6 | 6; domain value vorhanden, aber INS-01/04/05/06 übergroß bzw. mehrere Outcomes; INS-03 AC-Grenze offen. |
| `EPIC-BOARD` | 5 | 5; Backlog/Board workflow/Tablet/Inbox/Marvin sind domänenbezogene Slices. ST-BRD-01 Inkonsistenz beseitigt; Tablet-Scope bleibt offen. |
| `EPIC-OPS` | 3 | 3; OPS-01/02 enthalten mehrere Betriebs-/Rechts-/Release-Ergebnisse und benötigen Slice-Reparatur. |

### Gemeinsame Regelbefunde

- Epic-Grenzen, priorisierte Storylisten und Abschlussbedingungen wurden in Katalog und Draft ergänzt; die Priorisierung folgt den vorhandenen P0–P3-Werten und erhält die katalogisierte Reihenfolge innerhalb desselben Prioritätswerts.
- ST-AN-01 ist das einzige ausdrücklich gewählte Walking Skeleton und nennt echte Eingabe, Verarbeitung, sichtbare Ausgabe, Schutz und Demonstration. Für andere Epics ist kein Skeleton als Pflicht behauptet; ein Nichtwählen ist dort zulässig, sofern das Epic trotzdem wertvolle Stories enthält.
- ST-WEB-03 ist der aktuell begründete technische Enabler: release-/risikoübergreifende Prüfung kann nicht sinnvoll in jede öffentliche Value-Story dupliziert werden; Nachfolger ST-WEB-02/04/05 und prüfbarer Bericht sind benannt.
- Kein weiterer Story-Eintrag wurde pauschal als Enabler akzeptiert. PHOTO-01, ST-AN-06 und die bestehenden Gate-Stories brauchen die oben markierte konkrete Voraussetzung-/Nachfolger-/Minimalumfangsbegründung oder eine Re-Klassifikation.
- EPIC-VIDEO und EPIC-ACCESS sind Single-Story-Epics; EPIC-ACCESS ist wegen AUTH-01 ein offener Slice-Blocker. EPIC-VIDEO bleibt ein eng abgegrenzter historischer Abschlusswrapper, keine Behauptung eines mehrstufigen Backlogs.

## Durchgeführte Konsistenzreparaturen

- Draft enthält nun alle 71 Katalog-Stories statt 56; die 15 vorhandenen Einträge wurden mit Katalog-AC, Dependencies, Quellen und existierenden Tasks in die richtigen Epics eingefügt; keine Ersatz-Story-ID angelegt.
- ST-BRD-01/ST-BRD-05 vorhandene Aufgaben- und Story-Trennung wurde verifiziert. `SRC-0484` Traceability und betroffene `SRC-0484/0485/0486` atomare Zielstellen zeigen jetzt auf Backlog (ST-BRD-01), Workflow (ST-BRD-05) bzw. Warnungs-Inbox (ST-BRD-03). Alte PKG-016-Aussagen werden als historische/überholte Prüfnachweise gekennzeichnet, nicht gelöscht.
- ST-CON-01 ist auf den bestehenden Longform-Slice präzisiert; vorhandene ST-CON-05–16 wurden nicht dupliziert. Story-Sätze für Short 1/2 wurden unterscheidbar gemacht, 28-Tage-Reviews auf Redakteur/Business Value umgestellt.
- ST-VID-01 wurde auf den Short→Film-Link begrenzt; ungelöste historische Privacy-Methodenäquivalenz ist als separate Publication-/Versionshold kenntlich gemacht; Status von Done auf Existing / Verify abgesenkt.
- `SRC-0793` bleibt `Partially Covered`, bis alle `OPEN_*` und bedingten Slice-Funde tatsächlich geschlossen und gegengeprüft sind.

## Noch notwendige Recovery-Arbeit / Grund für Blockierung

Die unabhängigen Reviews fanden die in der Tabelle als `OPEN_REPAIR`, `OPEN_TASK`, `OPEN_AC`, `OPEN_SCOPE` bzw. `CONDITIONAL_PASS` markierten Fälle. Besonders kritisch sind ST-WEB-01/02/03, ST-PHOTO-01/07, ST-SEO-01/02, ST-AUTH-01, ST-CMS-01/06, ST-AN-01/02/04/05/06/08, ST-INS-01/03/04/05/06 und ST-OPS-01/02. Zu diesen müssen Zielstorys/AC/Tasks/Dependencies konsistent nachgeschnitten oder mit überprüfbarer Kleinheit begründet werden. Historische Belege und offene Nutzer-/Publication-Entscheidungen sind nicht aufzulösen, um technische Slices zu verkleinern.

Daher ist die vollständige Prüfung dokumentiert, die fachlichen Reparaturen aber noch nicht vollständig abgeschlossen. `SRC-0793` darf nicht auf `Covered` wechseln. Final-Audit-Ergebnis bleibt unverändert historisch `FINAL_AUDIT_FAIL`; Final Audit retry wurde nicht gestartet.


## Recovery-R6 — Befundklassifikation und gezielte Korrekturen

Jeder der 35 vom Controller gezählten Befunde ist einzeln klassifiziert. Alle 35 Storybefunde sind in der folgenden Tabelle einzeln aufgeführt; die Epic-Review-Punkte sind ihrer jeweiligen Story zugeordnet und werden nicht doppelt gezählt. `ST-OPS-03` verweist auf die bestehende deduplizierte Aktivierungsentscheidung für externe Benachrichtigungen; es wird keine zusätzliche Nutzerfrage erzeugt.

| Befund | Klasse | Bearbeitung / verbleibende Bedingung |
|---|---|---|
| `ST-WEB-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-WEB-02` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-PHOTO-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-PHOTO-05` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-PHOTO-07` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-SEO-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-SEO-02` | `TECHNICAL_CLARIFICATION` | Zuordnung gegen tatsächliche Templates/Bestandsmodell erforderlich; keine fachliche Nutzerentscheidung. |
| `ST-SEO-04` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-SEO-05` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-SEO-06` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-SEO-07` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AUTH-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-CMS-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-CMS-02` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-CMS-06` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-CMS-07` | `TECHNICAL_CLARIFICATION` | Zuordnung gegen tatsächliche Templates/Bestandsmodell erforderlich; keine fachliche Nutzerentscheidung. |
| `ST-CMS-08` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-CMS-09` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-02` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-04` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-05` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-06` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-AN-08` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-INS-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-INS-03` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-INS-04` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-INS-05` | `TECHNICAL_CLARIFICATION` | Zuordnung gegen tatsächliche Templates/Bestandsmodell erforderlich; keine fachliche Nutzerentscheidung. |
| `ST-INS-06` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-BRD-02` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-BRD-03` | `TECHNICAL_CLARIFICATION` | Zuordnung gegen tatsächliche Templates/Bestandsmodell erforderlich; keine fachliche Nutzerentscheidung. |
| `ST-OPS-01` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-OPS-02` | `AUTO_FIXABLE` | Klassifiziert; Slice-/Task-Grenze im Storykatalog nach vorhandenen Regeln präzisiert. |
| `ST-OPS-03` | `USER_DECISION_REQUIRED` | Vorhandene separate Aktivierungsfreigabe bleibt erforderlich; dedupliziert mit SRC-1205/SRC-1648. |
| `ST-BRD-05` | `AUTO_FIXABLE` | Der vorhandene Board-Workflow ist ein vertikaler End-to-End-Slice; Persistenzschema als Implementierungswahl statt AC-Festlegung präzisiert. |

### In dieser Stufe tatsächlich korrigiert

- Story-/AC-Umfang für WEB-01/02, PHOTO-01/05/07, SEO-01, ANALYTICS-01/02/04/05/06/08, INSIGHTS-01/03/04/05/06, BOARD-02/05, OPS-01/02 und CMS-01/02/06/08/09 auf vorhandene, beobachtbare Slice-Ergebnisse begrenzt; source IDs bleiben erhalten.
- AUTH-01 als `Existing / Verify` statt pauschal `Done` markiert; AN-06 als `Deferred / Post Pilot` klassifiziert.
- Für PHOTO-05 und SEO-04/05/06/07 vorhandene, quellengebundene Ausführungstasks ergänzt. CMS-02.3 und Analytics CMS-Pageview-Doppelungen auf jeweils einen kanonischen Task begrenzt; CMS-08/09-Evidence getrennt.
- Board-Persistenz als verhaltensbasiert statt an konkrete Tabellennamen gebunden formuliert.

Die vollständige Draft-/Katalog-/Task-/Traceability-Konsistenz und der vollständige 71-Story-/Epic-Retest stehen noch aus. Bis dahin bleibt `SRC-0793` `Partially Covered`; diese Recovery-Stufe behauptet weder vollständige Befundbehebung noch Final-Audit-Bereitschaft.


## Recovery-R7 — Abschlussprüfung

Die vier technischen Klärungen wurden gegen Originalklauseln, existierende technische Referenzen, aktuelle Code-/Dateistruktur, Story-Katalog und Tasks aufgelöst. Es wurde keine neue Nutzerentscheidung ergänzt. Die Benachrichtigungsaktivierung aus `SRC-1205`/`SRC-1648` bleibt gesperrt; verpflichtende interne Inbox und deaktivierte externe Zustellung sind ausdrücklich getrennte Zustände.

### Vollständige Story-/Epic-Neubewertung

Alle 71 Stories und 11 vorhandenen Epics wurden nach den Änderungen erneut gegen Story-Satz, Value-Typ, Dependencies, vollständige AC, Quellen, Taskzuordnung, INVEST und Vertical-Slice-Kohärenz geprüft. Unveränderte Stories behalten nur dann ihr voriges Urteil, wenn ihr Quell-/Zielumfang durch die Recoveryänderungen nicht berührt wird. Alle 35 ursprünglich offenen Findings wurden nach Abschluss der Korrekturen erneut geprüft:

| Befund | Recheck | Ergebnis |
|---|---|---|
| `ST-WEB-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-WEB-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-PHOTO-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-PHOTO-05` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-PHOTO-07` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-04` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-05` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-06` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-SEO-07` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AUTH-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-06` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-07` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-08` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-CMS-09` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-04` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-05` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-06` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-AN-08` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-INS-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-INS-03` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-INS-04` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-INS-05` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-INS-06` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-BRD-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-BRD-03` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-OPS-01` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-OPS-02` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-OPS-03` | PASS_WITH_NONBLOCKING_ACTIVATION_HOLD | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |
| `ST-BRD-05` | PASS_AFTER_RECOVERY | Die ursprüngliche Slice-/AC-/Task-Grenze ist korrigiert und gegen zugehörige Quelle/Ziel geprüft. |

Alle Epics wurden einzeln gegengeprüft: WEB (7), PHOTO (7), SEO (7), CONTENT (16), VIDEO (1, historischer Umfang), ACCESS (1, eng begrenzter Auth-Slice), CMS (9), ANALYTICS (9), INSIGHTS (6), BOARD (5) und OPS (3). Enabler und Skeleton-Grenzen sind benannt; kein Epic wird als Story oder als Ersatz für fehlende Acceptance Criteria behandelt.

Der einzige nicht geschlossene der ursprünglichen Befunde (`ST-OPS-03`) ist ausdrücklich nicht auditblockierend: Die interne Inbox ist Pflicht, externer Transport bleibt ausgeschaltet, bis eine separate Aktivierungsfreigabe vorliegt. Das ist ein dokumentierter Betriebs-/Veröffentlichungs-Hold, keine Unklarheit des technischen Sollzustands.

`SRC-0793` ist damit für Planning Coverage vollständig abgedeckt. Dies belegt keine Implementierung oder Live-Verifikation.
