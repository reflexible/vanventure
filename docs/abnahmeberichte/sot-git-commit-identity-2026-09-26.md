# Abnahmebericht – WI-SOT-30-05 Work-Item-ID im Commit

Stand: 26. September 2026.

| Kriterium | Ergebnis | Reproduzierbarer Nachweis |
| --- | --- | --- |
| Der Commit-Titel trägt genau die Kennung des gestarteten Work Items an erster Stelle. | Bestanden | `node tools/sot/git-commit-identity.mjs --work-item WI-SOT-30-05 --message "WI-SOT-30-05 validate commit identity"` |
| Fehlende, abweichende oder nur im sonstigen Titeltext enthaltene Kennungen blockieren. | Bestanden | `node --test tools/sot/git-commit-identity.test.mjs` |
| Die Prüfung verändert weder Staging noch Repository-Zustand. | Bestanden | Testlauf gegen die lesende Funktion und CLI; die Implementierung ruft keine schreibenden Git-Befehle auf. |

## Getesteter lokaler Quellstand

- Implementierung: `tools/sot/git-commit-identity.mjs`
- Tests: `tools/sot/git-commit-identity.test.mjs`
- Verbundprüfung: 35/35 Tests bestanden mit den SoT-, Modul-, Contract- und
  Git-Slice-Tests.

## Status und Restarbeit

**Lokaler Status:** bestanden. Die Prüfung validiert ausschließlich die
vorbereitete Commit-Kennung und erzeugt keinen Commit. Der Abgleich der
gestagten Pfade gegen den deklarierten Schreibbereich bleibt ausdrücklich
offen in `WI-SOT-30-06`; erst dieser Folgeslice sperrt Misch-Commits auf
Dateiebene.

**Live-Status:** nicht anwendbar. Dies ist eine lokale Governance-Prüfung ohne
Website-, Cockpit- oder Betriebsänderung. Der Planabgleich bleibt wegen
20 historisch offener Traceability-Punkte `PENDING`; daraus folgt keine
Produktivfreigabe.
