# Abnahme: Analytics-Planung, 25. September 2026

**Quellstand:** Nutzerdatei `Eingefügter Text.txt` mit dem vollständigen
„VanVenture Analytics – Implementierungsplan“; bestehender Gesamtplan und
konsolidierter Gesamtauftrag im lokalen Arbeitsverzeichnis am 25. September
2026. Die Quell-Datei enthielt 48 Abschnitte und die Definition of Done.

| Anforderung | Dokumentierter Stand | Umsetzung und Prüfung | Live |
| --- | --- | --- | --- |
| Einziger aktiver, ansprechbarer Arbeitsplan | `docs/ausbauplan.md`, `ANALYTICS 0–8` mit Stories `n.m` | Planabgleich mit 28 registrierten Quellen erfolgreich | Keine Analytics-Funktion veröffentlicht |
| Providerunabhängige Schnittstelle, Policy, Event-Schema | `docs/analytics.md` als fachliche Referenz; `AGENTS.md` verweist darauf | Implementierung und Tests offen | Offen |
| Umami, Null-Provider und Ausschluss eigener Zugriffe | Stories 2 und 3 mit konkreter Abnahme | Offen | Offen |
| Content-Events, UTM, Berichte, Tests, Wechsel | Stories 4 bis 8 mit Teilwert und Grenzen | Offen | Offen |
| CMS-Abhängigkeit | `ANALYTICS 3.4` hängt ausdrücklich von CMS 3 ab | Offen | Offen |

**Reproduzierbare Prüfung:**
`node deploy/plan-consistency.mjs` meldete
„Planabgleich erfolgreich: 28 Quellen sind im docs/ausbauplan.md abgedeckt.“
`git diff --check` meldete keine Whitespace-Fehler. Die Node-Laufzeit wurde
über die gebündelte Workspace-Abhängigkeit aufgerufen, da `npm` in der
aktuellen Shell nicht im Suchpfad liegt.

**Grenze:** Diese Abnahme betrifft nur die lokale Plan- und
Anforderungsdokumentation. Phase 0, Architekturentscheidungen, Code, Tests,
Commit/Push und Live-Rollout für Analytics stehen aus. Design-Guide und Bilder
sind inhaltlich unverändert. Ein Webdienst-Neustart war nicht erforderlich.
