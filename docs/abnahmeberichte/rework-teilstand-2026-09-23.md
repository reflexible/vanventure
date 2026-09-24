# Teil-Abnahmebericht – zentrale öffentliche Navigation

Historischer erster Zwischenstand. Die damals offenen Browser- und
Bildinventurarbeiten wurden inzwischen teilweise durchgeführt; für den
aktuellen Umfang und die geltenden Zähler siehe den
[Bestands- und Abnahmebericht](rework-bestandspruefung-2026-09-23.md).

Stand: 23. September 2026
Status: **teilweise umgesetzt und lokal geprüft; nicht live veröffentlicht**.

Dieser Bericht dokumentiert den ersten tatsächlichen Korrekturlauf des
Gesamtauftrags. Er ist ausdrücklich keine Abschlussabnahme des gesamten
Template-, Bild- und Website-Umfangs.

Der verbindliche Fortschrittsstatus bleibt im
[Ausbauplan](../ausbauplan.md); dieser Bericht ist ausschließlich sein
prüfbarer Teilnachweis.

## Grundlagen und Versionsbezug

Getesteter Arbeitsstand: Branch `codex/rework-with-project-skills`, mit den
bei Laufbeginn bereits vorhandenen, nicht eingecheckten Dokumentationsänderungen
und den folgenden Korrekturen: `navigation.js`, `script.js` und
`deploy/public-content.test.mjs`.

| Grundlage | SHA-256 | Verwendung |
| --- | --- | --- |
| `AGENTS.md` | `891903AEF6457878E4E3F98EE327897EBEC571DE50FA3FCDADA7751E4E3F709A` | Projekt-, Release- und Originalschutzpflichten |
| `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` | `1958CA23626927A153B38103F4ADDC50CF15314E7AB2F6B3571C3B0D633C74CA` | Nachweis-, Freigabe- und Abnahmevorgaben |
| `docs/responsive-templates.md` | `E0E1A8D380C0183B31A53F7B642B74D948D81589E8F4B4D757F8D34F6D21C088` | zentrale Komponenten und Templates |
| `docs/design-guide.md` | `4925FCEDC6B86B29103031391C12E673E11CAD5F8DC8EF143E03DFCBB615F0EA` | freigegebene Gestaltung V1 |
| `C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md` | `A4BAD25975B18702F9961221D8BA22A66A242D2ED95ADA432C47E6449C0EBDC1` | Originalschutz bei Bildarbeit |

Es wurde keine neue Gestaltungsregel, Variante oder Ausnahme eingeführt. Die
bestehende Ausnahme der fünf noch unvollständigen Radprofile bleibt bestehen.

## Erfasste Seiten und Prüfumfang

| Seiten | Typ | zentrale Navigation | Ergebnis dieses Laufs |
| --- | --- | --- | --- |
| `index.html` | Startseite | `navigation.js` | Quellprüfung bestanden; eigener Aufbau nicht verändert |
| `vehicle.html` | Fahrzeug | `navigation.js` | Quellprüfung bestanden |
| `kajak.html` | Aktivität | `navigation.js`, `photo-viewer.js` | Quellprüfung bestanden |
| `ausruestung.html`, `bike.html` | Übersicht | `navigation.js` | Quellprüfung bestanden |
| `cube.html`, `scott-mountainbike.html`, `trek-gravelbike.html`, `woom-2.html`, `diamant-stadtraeder.html` | Radprofile in Vorbereitung | `navigation.js` | Kopfzeilenabweichung behoben und Quellprüfung bestanden |
| `norwegen-2018.html`, `sardinien-2019.html`, `italien-2021.html` | Reiseberichte | `navigation.js`, `photo-viewer.js` | Quellprüfung bestanden |

Seitenzähler: **13 von 13** auf die zentrale Navigationsquelle geprüft.
Dies ist kein Nachweis einer vollständigen visuellen oder funktionalen Prüfung
aller Seitenvarianten.

## Änderung und Nachweismatrix

| Kennung | Vorgabe | Umsetzung | Prüfung | Ergebnis |
| --- | --- | --- | --- | --- |
| NAV-01 | Öffentliche Kopfzeile auf allen öffentlichen Seiten identisch; Login neben Sprachwahl | `navigation.js` erzeugt eine einzige kanonische Hauptnavigation und ergänzt fehlende Sprachaktion vor der zentralen Login-Aktion | Neuer Test in `deploy/public-content.test.mjs` prüft alle 13 Quellen und die zentrale Implementierung | BESTANDEN – lokal |
| NAV-02 | Gemeinsame Komponenten nicht pro Seite reparieren | Korrektur ausschließlich in `navigation.js`; `script.js` initialisiert auch nachträglich bereitgestellte Sprachaktionen | Vollständiger Node-Testlauf | BESTANDEN – lokal |
| HOME-01 | Startseite bleibt eigenständig | Kein Startseitenmarkup oder Startseiten-CSS geändert | Quellabgleich, Startseite im Seitentest enthalten | BESTANDEN – strukturell lokal; Sichtprüfung offen |
| IMG-01 | Bildinventur, Herkunft, Freigaben und Originalschutz | Keine Bilddatei, kein Bildpfad und kein Originalarchiv berührt | Kein Bildverarbeitungslauf durchgeführt | NICHT GEPRÜFT – gesamter Bildbestand offen |
| VIS-01 | Desktop, Tablet, Mobil, Hoch-/Querformat und Bedienung | Keine belastbare Browser-Ansicht erzeugt; der bereitgestellte Browserzugriff ist beim Start zurückgesetzt | Keine Ersatzbehauptung aus dem Quelltest | BLOCKIERT – Browser-Sichtprüfung offen |
| LIVE-01 | Release erst nach erforderlichen Prüfungen und Live-Kontrolle | Kein Remote-Zugang, keine Übertragung, kein Neustart | Nicht durchgeführt, weil VIS-01 offen ist | BLOCKIERT |

## Reproduzierbarer, nicht verändernder Prüflauf

```powershell
node --test editor/*.test.mjs deploy/*.test.mjs
git diff --check
```

Ausgeführt am 23. September 2026: **22 Tests bestanden, 0 fehlgeschlagen**.
Der Lauf bestätigt keine Browser-, Geräte-, Bild- oder Live-Prüfung.

## Verbleibende Arbeiten und Freigabegrenze

1. Vollständige Route-zu-Template-/Generator-Matrix erstellen und die drei
   Seitentemplates tatsächlich konsolidieren.
2. Start- und Kajak-Referenzen bei Desktop, Tablet und Smartphone sichern;
   danach alle Seiten und Bedienzustände sichtbar prüfen.
3. Den gesamten veröffentlichten Bildbestand mit Herkunft, Prüfsummen,
   Projektkopien, Freigaben und Webableitungen inventarisieren, ohne das
   Originalarchiv zu beschreiben.
4. Erst nach bestandenen Pflichtprüfungen den Release-Check auf Marvin
   durchführen, ausschließlich den Webdienst aktualisieren und `/healthz`
   sowie die betroffenen Live-Routen prüfen.

Der Gesamtauftrag ist daher **nicht abgeschlossen** und dieser Teilstand ist
**nicht nachweislich live**.
