# Abnahmebericht – Übernahme des Gesamtauftrags

Stand: 23. September 2026
Prüfgegenstand: Dokumentations- und Regelkonsolidierung des Gesamtauftrags für
VanVenture, nicht der noch offene technische Template-Umbau.

Versionsbezug: Arbeitsstand auf Git-Basis `500421e` mit den in diesem Bericht
genannten, noch nicht eingecheckten Dokumentationsänderungen. Der Prüflauf
wurde gegen genau diesen Arbeitsstand ausgeführt.

Der [Ausbauplan](../ausbauplan.md) bleibt die einzige aktive Arbeitsliste. Der
[konsolidierte Gesamtauftrag](../vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md)
ist die maßgebliche Prozess- und Nachweisspezifikation. Die
[Template-Spezifikation](../responsive-templates.md) bleibt für Architektur und
Templates maßgeblich; der [Design Guide](../design-guide.md) ausschließlich
für freigegebene Gestaltung.

## Zugrunde gelegte Regeln und Quellen

| Quelle | Rolle im Prüflauf | Stand |
| --- | --- | --- |
| `AGENTS.md` | Projektlokale Lesepflicht, Release- und Bildregeln | gelesen, ergänzt |
| `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md` | Gesamtauftrag, Originalschutz, Freigaben, Nachweise | als maßgeblich übernommen |
| `docs/responsive-templates.md` | technische Template-Spezifikation | auf den Gesamtauftrag verwiesen |
| `docs/design-guide.md` | freigegebene Gestaltung V1 | Freigabeprozess präzisiert, keine visuelle Regel geändert |
| `C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md` | Schutz des Originalarchivs bei Bildaufgaben | gelesen; in diesem Lauf keine Bilddatei verwendet |

## Nachweismatrix dieses Änderungslaufs

| Kennung | Vorgabe und Umfang | Umsetzung / Beleg | Prüfmethode | Ergebnis |
| --- | --- | --- | --- | --- |
| GO-01 | Eine konsolidierte, projektlokale Gesamtvorgabe ohne konkurrierenden aktiven Plan | Gesamtauftrag als Prozessquelle markiert; Ausbauplan bleibt einzige Arbeitsliste; Planregister ergänzt | Node-Testlauf unten | BESTANDEN |
| GO-02 | Nur VanVenture-Regeln, mit Lesepflicht zu Gesamtauftrag, Template-Spezifikation und Design Guide | `AGENTS.md` enthält die projektlokale Lesepflicht und keine Änderung an globalen Codex-Anweisungen | Konsistenztest und Dateiabgleich | BESTANDEN |
| GO-03 | Neue Designregeln/Ausnahmen nur nach ausdrücklicher Freigabe; freigegebene Regeln ohne Wiederholung umsetzen | Freigabeprozess in `AGENTS.md`, Gesamtauftrag, Template-Spezifikation und Design Guide abgeglichen | Konsistenztest | BESTANDEN |
| GO-04 | Startseite behält eigenes Layout, unterliegt aber Bild-, Originalschutz- und Prüfpflicht | In Gesamtauftrag und Template-Spezifikation ausdrücklich festgeschrieben | Konsistenztest | BESTANDEN |
| GO-05 | Technischer Originalschutz und Bildnachweise als verpflichtender Umsetzungsgate | Verbindlich in Abschnitt 10 des Gesamtauftrags; die projektlokale Bild-Skill-Pflicht bleibt erhalten | Text- und Referenzprüfung | BESTANDEN – Regelverankerung |
| GO-06 | Tatsächliche technische Schreibgrenzen, Bildmanifest und vollständiger Vorher-/Nachher-Abgleich | Nicht in diesem reinen Dokumentationslauf ausgeführt; keine Originale, Projektkopien oder Derivate berührt | Nicht anwendbar auf diesen Lauf; für jede spätere Bildarbeit vorab durchzuführen | NICHT GEPRÜFT |
| GO-07 | Gesamter Seitenbestand, responsive Ansichten, zentrale Änderungswirkung und Live-Release | Der technische Template-Umbau ist im Ausbauplan weiterhin offen | Keine vorgetäuschte Prüfung | NICHT GEPRÜFT |

## Tatsächlicher Prüfstand

- Geprüfte Seiten: **0 von nicht erneut erfasster Gesamtmenge**. Dieser
  Änderungslauf hat keine Website-Datei oder Route verändert.
- Geprüfte Bilddateien: **0 von nicht erneut erfasster Gesamtmenge**. Es wurde
  kein Archiv gelesen, kopiert oder bearbeitet.
- Technischer Originalschutz: Die Verpflichtung ist dokumentiert und durch die
  künftige Ausführung zu prüfen; eine technische Schreibschutzprüfung wurde
  bewusst nicht als erfolgt ausgegeben.
- Design-Guide-Änderung: Nur der bereits beauftragte Freigabeprozess wurde
  dokumentiert. Es gibt keine neue visuelle Regel, Ausnahme oder erfundene
  Freigabe.
- Live-Stand: **nicht verändert und nicht erneut verifiziert**. Keine
  Remote-Sitzung, kein Deployment und kein Webdienst-Neustart waren für diese
  reine Repository-Dokumentation erforderlich.

## Reproduzierbarer Prüfbefehl

```powershell
node --test editor/*.test.mjs deploy/*.test.mjs
```

Der tatsächlich ausgeführte Lauf nutzte den bereitgestellten Node-Runtime-Pfad
und umfasst den Planabgleich sowie
`deploy/gesamtauftrag-consistency.test.mjs`: 21 Tests bestanden. Er prüft die
dokumentarische Konsolidierung, ersetzt aber ausdrücklich keine Bild-, Browser-,
Geräte- oder Live-Prüfung.

## Offene Abnahmebedingungen

Vor einer Umsetzung des Template-Umbaus sind mindestens Referenzansichten von
Start- und Kajak-Seite zu sichern, die Routen-/Komponentenmatrix zu erstellen,
die technische Originalschutzgrenze mit Testdateien zu prüfen und die
Bildmanifeste anzulegen. Erst danach können zentrale Komponenten migriert,
visuell/funktional geprüft und nach bestandenem Release-Check live verifiziert
werden.
