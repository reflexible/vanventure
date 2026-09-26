# COVERAGE-R3-001 · Technische und evidenzbezogene Nachprüfung (26.09.2026)

## Umfang und Ergebnis

- Die zwei offenen technischen Fragen wurden geprüft. Die Frage zu `SRC-0452` ist durch den vorhandenen Bildquellenindex und den aktuellen lokalen Gallery-Markupstand technisch geklärt. Die Frage zu `SRC-0788`/`SRC-0791` bleibt als eine technische Planungsfrage offen.
- Die fünf Evidenzfälle wurden gegen vorhandene Abnahmeberichte, Gallery-Quellen und Video-Prüfnachweise untersucht. Es wurden keine fehlenden Einzelbildfreigaben oder Release-Freigaben erfunden. Die fünf bleiben als `INSUFFICIENT_EVIDENCE`, sind aber ausschließlich Veröffentlichungs-/Versionsnachweise und mit `blocks_final_audit=false` aus dem technischen Audit-Gate entkoppelt.
- Von den 19 reviewable Findings sind fünf Planungsbefunde weiterhin prüfbar und offen. Fünf Klauseln wurden nach direktem Abgleich mit Projektregel und Zielplan als `Covered` geschlossen; die technische ZIP-Bildzuordnung wurde dokumentiert; bestehende Nutzerentscheidungen und Veröffentlichungssperren blieben unangetastet.
- Coverage Findings Remaining: 25 (einschließlich nicht auditblockierender, entscheidungs- oder evidenzgebundener Reststände); Reviewable Coverage Findings: 5.

## Technische Fragen

1. `SRC-0452` — **geklärt:** `docs/kajak-galerie-bildquellen.json` ordnet `IMG-20180531-WA0019.jpg` `kajak-12.jpg` und `IMG-20180601-WA0007.jpeg` `kajak-13.jpg` zu. Der aktuelle lokale `kajak.html`-Stand hat 13 Galerieeinträge und führt `kajak-06.jpg` nicht. Das belegt nur Mapping und lokalen Stand, keine aktuelle Veröffentlichungsfreigabe.
2. `SRC-0788`/`SRC-0791` — **offen, technisch:** Der projektweite Strukturabgleich zeigt weiterhin zu große/gebündelte Stories. `ST-CON-01` umfasst Longform, zwei Shorts, Website-Ergänzung, 28-Tage-Review und Planoutput; außerdem sind `ST-CON-02/03` mehrteilig und `EPIC-ACCESS`/`EPIC-VIDEO` jeweils nur durch eine breite Story konkretisiert. Das verletzt die Small-/Independent-/Vertical-Slice-Prüfung nach `docs/project-rules/scrum-planning.md`; es ist kein Nutzerentscheidungsbedarf.

## Evidenzfälle

| Fall | Geprüfter Bestand | Status / Auswirkung |
|---|---|---|
| `SRC-0452.g` | Bisherige ausdrückliche Freigabe betrifft nur zwei benannte ZIP-Fotos; daraus folgt keine Freigabe der übrigen Motive. | `INSUFFICIENT_EVIDENCE`; Veröffentlichung gesperrt; kein technischer Audit-Blocker. |
| `SRC-0452.h` | Lokaler `kajak.html` enthält 13 Einträge und lässt `kajak-06.jpg` aus. Ein eindeutig freigegebener Release-SHA/Scope ist daraus nicht ableitbar. | `INSUFFICIENT_EVIDENCE`; Release-/Veröffentlichungsnachweis offen; kein technischer Audit-Blocker. |
| `SRC-0464.f` | Vorhandene Akte belegt keine neue Gruppenabnahme aller 13 Varianten. | `INSUFFICIENT_EVIDENCE`; Veröffentlichung gesperrt; kein technischer Audit-Blocker. |
| `SRC-0466.s` | Historische Exportparameter und finale Einzelbildabnahmen für übrige Varianten fehlen; Hashes allein belegen keine Abnahme. | `INSUFFICIENT_EVIDENCE`; Veröffentlichung gesperrt; kein technischer Audit-Blocker. |
| `SRC-2042.e` + `SRC-2247.d` | v18 hat eine dokumentierte 5-fps-Kontaktbogensichtung und sechs Einzelbilder. `video-production/AGENTS.md` verlangt visuelle Endkontrolle der vollständigen öffentlichen Version; die Stichprobe belegt keine Prüfung jedes Frames. | Ein deduplizierter `INSUFFICIENT_EVIDENCE`-Hold für v18; kein technischer Migrations/Audit-Blocker, aber keine Freigabe dieser Fassung. |

## Coverage-Nachprüfung

Als `Covered` geschlossen: `SRC-0792.b`, `SRC-0792.d`, `SRC-0793.a`, `SRC-0793.b`, `SRC-0793.c`. Das beruht auf dem Vergleich des Story-Katalogs und Entwurfs mit der verbindlichen Scrum-Regel: Walking Skeleton ist optional; `ST-AN-01` ist ein überprüfbarer, nicht bloß platzhalterhafter Slice; der einzige Enabler `ST-WEB-03` benennt Folge-Stories, Mindestumfang und prüfbares Ergebnis.

Offen und auditrelevant bleiben fünf Findings: `SRC-0788.a`, `SRC-0791.a`, `SRC-0791.b`, `SRC-0792.a`, `SRC-0792.e`. Grund: die Story-Schnitte/Vertical Slices und der vollständige INVEST-Abgleich sind nicht überall tragfähig nachgewiesen; insbesondere müssen die gebündelten Story-Ergebnisse strukturell geschnitten werden.

## Status

- Technische Fragen: 1 offen (von 2 geprüft)
- Evidenzfälle: 5 geprüft; 5 verbleiben als nicht veröffentlichungsfreigegebene Holds, 0 blockieren den technischen Final Audit
- Coverage Findings Remaining: 25; davon 5 aktuell reviewable und auditrelevant
- Final Audit Readiness: `NOT_READY` — wegen fünf struktureller Planungsbefunde und einer technischen Frage
- Final Audit: `NOT_STARTED`

Keine Originalquelle, kein bestehender Paketbericht, Produktcode, Bild, Datenbank oder Live-System wurde geändert.
