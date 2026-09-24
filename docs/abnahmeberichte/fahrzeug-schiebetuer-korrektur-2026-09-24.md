# Abnahmebericht – Fahrzeugbild: Schiebetür-/Hinterradkorrektur

Der aktuelle Gesamtstatus wird ausschließlich im [Ausbauplan](../ausbauplan.md)
geführt; dieser Bericht dokumentiert die konkrete Bildkorrektur.

Stand: 24. September 2026
Status: **vom Nutzer für die Website freigegeben, lokal umgesetzt und visuell
geprüft; nicht committed, nicht gepusht, nicht veröffentlicht und nicht live
verifiziert.**

## Anlass und Geltungsbereich

Der Nutzer beanstandete `assets/vehicle/vehicle-side-camp-v2.png`: Die offen
dargestellte Schiebetür und das vollständig sichtbare Hinterrad ergaben eine
räumlich unplausible Fahrzeugkonstruktion. Er benannte
`assets/vehicle/vehicle-side-dog.png` ausdrücklich als Referenz dafür, wie die
Tür im geöffneten Zustand über dem Hinterrad sitzen muss. Dies ist eine
motivbezogene Korrektur, keine neue Designregel. Nach Sichtung von V3 bestätigte
der Nutzer ausdrücklich: „diese bild ist freigeben. das ist jetzt richtig so.
verwende diese bild für webseite!“

## Nachweismatrix

| Kennung | Vorgabe / Umfang | Umsetzung und Beleg | Prüfmethode | Ergebnis |
| --- | --- | --- | --- | --- |
| IMG-VEH-DOOR-20260924 | Geöffnete Tür und Hinterrad physisch plausibel darstellen | Neue, nicht destruktive Webableitung `assets/vehicle/vehicle-side-camp-v3.png`, lokal in `vehicle.html` eingebunden; Nutzerfreigabe erteilt | Visueller Vergleich mit V2 und der vom Nutzer genannten Referenz `vehicle-side-dog.png` | bestanden: die nach hinten geschobene Tür überlappt den oberen Hinterradbereich; das Rad ist nur unterhalb der Tür normal sichtbar |
| IMG-ORIG-20260924 | Unveränderte Quelle erhalten | Projektkopie `review/selected-originals/vehicle/20250610_124826.jpg` blieb unverändert; Archiv wurde nicht verwendet oder beschrieben | vorhandene Quellen- und Prüfsummenangabe in `docs/vehicle-bildquellen.json` geprüft | bestanden |
| IMG-PRIV-20260924 | Kennzeichenschutz und Bildschutz nicht umgehen | Korrekturumfang auf Tür, hinteres Seitenpanel und Radüberlagerung beschränkt; kein Kennzeichen sichtbar | Sichtprüfung der V3 bei voller Auflösung | bestanden |
| REL-VEH-20260924 | Lokale Integration und spätere Live-Kette getrennt halten | `vehicle.html` verweist auf V3; V2 bleibt erhalten | Quellpfad- und Prüfsummenprüfung | lokal bestanden; Commit/Push/Release/Live-Prüfung offen |

## Quell- und Variantenstand

- Unveränderte Projektkopie: `review/selected-originals/vehicle/20250610_124826.jpg`, SHA-256 `6c612c1bd3c076448db2c40d31585c7ea4a68f54bcf50c2df76498c9e8b4b606`.
- Vorherige Webableitung V2: `assets/vehicle/vehicle-side-camp-v2.png`, SHA-256 `761a371467f7621cdfa67e8957d59a8c5c4a7d5def09f8a10ec74908de618d66`; unverändert erhalten.
- Neue Reviewableitung V3: `assets/vehicle/vehicle-side-camp-v3.png`, SHA-256 `ac7fb742d097d287c0bc3f64436a765cd73315e8d2f2e3bd19751d25b0e2098f`.

## Nicht Bestandteil und offene Schritte

Der Design-Guide ist inhaltlich unverändert. Die Korrektur ist weder eine
allgemeine Freigabe für weitere KI-Bildbearbeitung noch ein Live-Nachweis.
Vor einem Rollout sind die lokale Webroute und die vorgeschriebenen
Release-Prüfungen auszuführen; anschließend muss exakt der gepushte Commit auf
`vanventure.at` ausgerollt sowie `/healthz`, die Fahrzeugroute und das sichtbar
gerenderte Bild live geprüft werden.
