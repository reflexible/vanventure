# Abnahmegrenze: gemeinsamer Review-/Entscheidungszustand

Stand: 26.09.2026 · lokaler Eventlog-Slice von `ST-SOT-14`–`15`.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Ereignisse | Vorschlag mit Impact, Review-Beziehungen und Freigabeentscheidung werden mit Vorschlags-ID, Revisionsnummer und Hashkette dauerhaft in einem lokalen JSONL-Log gespeichert. Wiederholte identische Anfragen sind idempotent; veraltete Revisionen und gleichzeitige Schreiber werden abgewehrt. |
| Gates | Review benötigt auf Kandidat und Vorschlag bezogene Evidenz. Eine Entscheidung verlangt einen vom Aufrufer bereitgestellten Authentifizierungsprüfer sowie einen konkreten Quellanker und exakte Vorschlags-ID im Freigabeumfang. Offene Konflikte oder Kataloglücken erlauben kein `APPROVED`. |
| Validierung | `node --test tools/sot/decision-state.test.mjs tools/sot/conflict-check.test.mjs tools/sot/approval-flow.test.mjs` besteht 15/15 Fälle einschließlich Konkurrenz, veralteter Revision, manipuliertem Log und fehlender Nutzerevidenz. |
| Umfangsgrenze | Der Aufrufer muss die Echtheit der Nutzerentscheidung unabhängig prüfen; ein Referenzstring oder die Hashkette beweist sie nicht. Ein Neuaufbau von Datei und Hashes durch einen berechtigten Angreifer wäre nur mit externer Signatur erkennbar. Vor tatsächlichem SoT-Schreiben fehlt noch die erneute Prüfung im Projektworkflow (`WI-SOT-15-07`). |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-/Cockpit-/Produktionsänderung und keine Live-Verifikation. |

**Status:** `WI-SOT-14-06` als lokaler Zustandsnachweis DONE; `WI-SOT-15-07` offen.
