# Abnahmebericht – WI-SOT-30-01 Git-Preflight

Stand: 26. September 2026.

| Kriterium | Ergebnis | Nachweis |
| --- | --- | --- |
| Status vor Slice | Branch, HEAD und Arbeitsbaumstatus werden mit Git-Porzellan exakt erfasst. | `node tools/sot/git-status-snapshot.mjs` |
| Keine Arbeitsbaumänderung | Der Snapshot führt nur lesende Git-Befehle aus. | Test `captures a clean repository without changing it` |
| Fremde Arbeit sichtbar | Gestagte, lokale und untracked Einträge werden getrennt gezählt und optional als Pfadliste ausgegeben. | Test `separates staged, unstaged and untracked work`; `--json` |
| Renames nachvollziehbar | Neuer und ursprünglicher Pfad bleiben im Snapshot verknüpft. | Test `parses renamed porcelain records with their original path` |

**Lokaler Status:** bestanden. Der reale Preflight vor diesem Slice zeigte
eine lokale Änderung und 663 untracked Einträge; sie wurden ausschließlich
erfasst und nicht verändert. Der Snapshot schützt noch nicht selbst vor einer
späteren Übernahme fremder Dateien – das ist der nächste getrennte Punkt
`WI-SOT-30-02`.
