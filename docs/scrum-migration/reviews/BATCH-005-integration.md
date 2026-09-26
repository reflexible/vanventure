**BATCH-005 ist lokal integriert.** Alle 264 ursprünglichen Kandidaten aus den fünf Paketen stehen in den vier Zieldateien. IDs, aktueller Quellstand und Zielanker wurden geprüft; es gibt keinen `Needs Recheck`. `SRC-2252.f` ist entsprechend dem Review in zwei nachvollziehbare Nachfolger getrennt. Die ausgewiesene Coverage betrifft die Planung; Umsetzung, Freigabe und Live-Stand wurden nicht erneut verifiziert. Es gab keine globale Zählung, Reverse-Prüfung oder neue Berichtserzeugung.

| Paket | Integriert | Needs Decision | Needs Recheck | Zielkonflikt |
| --- | ---: | ---: | ---: | --- |
| PKG-050 | 56 | Kiosk-Schreibberechtigung | 0 | Für die Aktivierung des Benachrichtigungskanals fehlt ein eindeutig zugeordneter Slice. |
| PKG-051 | 43 | Optionale Marvin-Erweiterungen nach realer Nutzung | 0 | Der Story-Katalog lässt breitere Marvin-Verschiebungen zu als das begrenzte MVP. |
| PKG-052 | 44 | Reichweite der aufgabenspezifischen Freigabe | 0 | Fortgeltende Videoregeln brauchen bei der nächsten einschlägigen Story konkrete Prüfschritte. |
| PKG-053 | 63 | Genügt die dokumentierte v18-Sichtung dem Privacy-Gate? | 0 | Historisches `Done` belegt keine neue Privacy-Abnahme. |
| PKG-054 | 58 | Dieselbe v18-Privacy-Frage für `SRC-2252.f2` | 0 | Der Sichtungsvorbehalt und der fassungsgebundene Privacy-Status sind nun getrennt; die Entscheidung bleibt offen. |

```json
[
  {
    "PackageID": "PKG-050",
    "Integrated": true,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "Soll der Küchen-Tablet-Kiosk nur lesend mit bestehender Sitzung betrieben werden, oder ist eine lokale PIN als alternative Schreibberechtigung vorgesehen? Falls PIN: Wer verwaltet sie und welche Aktionen erlaubt sie?",
    "CandidateCount": 56
  },
  {
    "PackageID": "PKG-051",
    "Integrated": true,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "Sollen nach mehreren Wochen tatsächlicher Nutzung zusätzliche bestätigte Marvin-Aktionen und eine Verlaufs-/Monitoringansicht eingeführt werden? Welche optionalen Ausbauten werden danach beauftragt?",
    "CandidateCount": 43
  },
  {
    "PackageID": "PKG-052",
    "Integrated": true,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "Gilt Helmuts aufgabenspezifische Freigabe nach SRC-1800 als Ausnahme vom Eingriffsverbot für Website, Cockpit und Deployment in SRC-1799?",
    "CandidateCount": 44
  },
  {
    "PackageID": "PKG-053",
    "Integrated": true,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt ausgewählten Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?",
    "CandidateCount": 63
  },
  {
    "PackageID": "PKG-054",
    "Integrated": true,
    "Status": "NEEDS_DECISION",
    "RecheckSourceIDs": [],
    "DecisionRequired": true,
    "DecisionQuestion": "Gilt die dokumentierte 5-fps-Kontaktbogensichtung samt ausgewählten Einzelbildern für v18 als geforderte visuelle Endkontrolle der vollständigen öffentlichen Fassung?",
    "CandidateCount": 58
  }
]
```