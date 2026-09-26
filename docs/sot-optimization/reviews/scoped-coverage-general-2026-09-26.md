# Prüfgrenze: verallgemeinerte Regelbereichsabdeckung

Stand: 26.09.2026 · technischer Teilschritt von `WI-SOT-13-07`.

| Scope | Ergebnis und reproduzierbarer Nachweis |
| --- | --- |
| Abschnittsfindung | `tools/sot/scoped-coverage.mjs` inventarisiert Überschriften, Zeilen und SHA-256-Bindungen aller acht aktiven Modulquellen. Aktuell sind 273 Überschriften auffindbar; diese Zahl ist ausdrücklich keine Regelzählung und kein Vollständigkeitsbeweis. Mehrdeutige Überschriften erhalten keinen verifizierten Abschnittshash. |
| Vorschlagsbezogener Scope | Ein Vorschlag kann mehrere ausdrücklich benannte Abschnittsinventare prüfen lassen. Nur `complete_section`-Einträge aus dem quellengeprüften Katalog gelten als geprüfte Abschnitte. Fehlender Zielabschnitt, fehlendes Inventar, doppelte Anfrage und nicht registrierte Module werden als Lücke oder Fehler behandelt. |
| Fail-closed-Grenze | Abhängige Module ohne geprüften Abschnitt sowie sämtliche bestehenden Modul- und modulübergreifenden `Unknown` bleiben im Bericht. `DEC-REL-002` ist als Abschnitt verifiziert; sein Release-Modul und die übrigen Module sind weiter `partial`. Semantische Gleichheit, Konflikt und Freigabe werden nicht abgeleitet. |
| Tests | `node --test tools/sot/scoped-coverage.test.mjs tools/sot/rule-catalogue.test.mjs tools/sot/sot-impact.test.mjs`: 14/14 bestanden. Veralteter Abschnittshash blockiert den Projektbericht vor der Ausgabe geprüfter Abschnitte. |
| Core-Schutz | Keine Änderung an `docs/scrum-plan.md` oder `docs/ausbauplan.md`. |
| Release/Live | Keine Website-, Cockpit- oder Produktionsänderung; keine Live-Verifikation. |

**Status:** Allgemeine Abschnittsprüfung lokal vorbereitet. `WI-SOT-13-07` bleibt offen, bis für einen konkreten Vorschlag die betroffenen Regelbereiche tatsächlich inventarisiert, fachlich auf Relevanz geprüft und die übrigen `Unknown` geschlossen sind.
