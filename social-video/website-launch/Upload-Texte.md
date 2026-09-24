# VanVenture – Website-Launch

## Instagram Reel

Wir sind online! 🚐🌿

Unsere Reisen haben jetzt ein Zuhause: **vanventure.at**
Von Norwegens Fjorden bis an die Küsten Italiens – entdecke unsere Reiseberichte, unseren Van und die Ausrüstung, die uns begleitet.

Wir sind Sabine und Helmut. Julie ist natürlich dabei. 🐾
Schau auf vanventure.at vorbei und folge uns für die nächsten Abenteuer!

#VanVenture #Vanlife #Reiseinspiration #Campervan #ReisenMitHund

## YouTube Short

**Titel:** Wir sind online! 🚐 Entdecke vanventure.at #Shorts

**Beschreibung:**
Unsere Website ist da: https://vanventure.at

Reiseberichte, unser Van und unsere Ausrüstung – entdecke VanVenture mit Sabine, Helmut und Julie. Von den Fjorden Norwegens bis an die Küsten Italiens.

Schau vorbei und abonniere unseren Kanal für mehr Reisen mit Van, Bike und Kajak!

#VanVenture #Vanlife #ReisenMitHund #Shorts

## Dateien

- `exports/VanVenture_Website_Launch_v3.mp4`: fertiger Clip mit eigens synthetisiertem Instrumental-Beat, ohne Sprachspur.
- `exports/VanVenture_Website_Launch_v3_ohne_Musik.mp4`: gleicher Schnitt ohne Ton, für einen eigenen Plattform-Sound.
- `exports/VanVenture_Website_Cover.jpg`: Cover mit Logo, Launch-Botschaft und Webadresse.
- `Vorschau.html`: lokale Videovorschau.

Beide Videos: 24 Sekunden, 1080 × 1920, 9:16, 30 fps, H.264/yuv420p. Ton: AAC Stereo, 48 kHz. Musik: eigenständig per Synthese erzeugt, keine fremden Aufnahmen oder Samples.

Für beide Plattformen kann dieselbe MP4 verwendet werden. Version 3 wurde am 20.09.2026 auf YouTube und Instagram veröffentlicht.

## Schnitt

0–3 s: Sardinien / La Pelosa / „Wir sind online.“
3–5 s: aktueller Van / „Unser Van. Unser Basislager.“
5–7 s: Norwegen / Kajak / „Raus aufs Wasser.“
7–9 s: originales Hochformatfoto eurer Mountainbikes am Meer / „Mit dem Bike. Nach draußen.“
9–12 s: Italien / Tropea / „Das Meer im Blick.“
12–18 s: echte mobile Aufnahme der Website / „Reinschauen.“
18–24 s: Logo, „Wir sind online.“, vanventure.at und Aufruf zum Folgen.

## Quellen und Prüfung

Verwendet wurden vorhandene Projektdateien und eine Browseraufnahme von https://vanventure.at/ vom 20.09.2026. Unveränderte Asset-Kopien und Zuordnung stehen unter `source/`. Das ursprüngliche Reisevideo liegt bereits als unveränderte Projektkopie unter `social-video/norwegen/source/`; seine Herkunft dokumentiert die dortige `SOURCE.txt`. Fotoherkunft siehe `docs/hero-bildquellen.json`. Die geschützten Fotoarchive wurden nicht verändert oder für diesen Export geöffnet.

Geprüft: alle sieben Szenen als Standbilder, vollständige Dekodierung des fertigen Videos (720 Bilder), 24 Sekunden Laufzeit, Ton ohne Übersteuerung (gemessener Spitzenpegel −1,2 dBFS).

Erneut rendern mit dem gebündelten Python und `PYTHONPATH=D:\work\_venventure\_analysis_tools`: `python build_v3.py`.


Version 2: Zusätzlich Material aus dem Sardinien-Master (E:/eigene_movies/sardinien/sardinien_master.mp4, Quelle nur gelesen) und dem bereits im Projekt vorhandenen Italien-Film Teil 3 (video-analysis/sources/al5rjX3PDWM.mp4). Ausgewählte Original-Videoframes sind als verlustfreie FFV1-Zwischendateien unter source/v2 erhalten; Quellpfade, Startzeiten und Zuschnitte stehen in Schnittplan_v2.json.

Stabilisierung: Bike und Tropea mit zweistufiger Bewegungsanalyse korrigiert. Bereits ruhige Meer-/Kajakbilder behalten ihren festen Zuschnitt, da automatische Korrektur bei diesen Szenen schlechtere Messwerte lieferte. Kein digitaler Foto-Zoom mehr. Die Bewegungsmessung ist in Pruefung_v2.json dokumentiert. Die erste Fassung bleibt separat erhalten.

Die nativen 24-fps-Szenen aus Italien und Norwegen werden mit bewegungskompensierten Zwischenbildern auf 30 fps gebracht, um das Ruckeln durch ungleichmäßige Bildwiederholungen zu vermeiden.


## Aktuelle Version 3

Helle Landschaftsszenen ohne großflächige dunkle Verläufe. Textlesbarkeit durch lokale Schriftschatten. Sardinien: dezente Farbanhebung. Tropea: angehobene Schatten, etwas kräftigere Farben, mehr Meer im Zuschnitt. Die stabilisierte Tropea-Bewegung bleibt erhalten; das Bikefoto hat keinerlei Zoom oder Bewegung.

Bike-Original: E:/_fotos_original/urlaubsSammlungen/sardinien2019/handy/DSC_0279.JPG. Unveränderte Projektkopie: source/v3-sardinien-handy/DSC_0279.JPG. Identität per SHA-256 gegen die Quelle geprüft, Hash in Schnittplan_v3.json. Nur Projektkopien verarbeitet; keine Schreibzugriffe auf das Fotoarchiv.

Prüfung V3: alle sieben Szenen visuell kontrolliert, vollständige Dekodierung ohne Fehler, 720 Frames / 24 Sekunden, Audio-Spitze −1,2 dBFS. Bildkontrolle und Dekodierprotokoll unter work/v3/.


Veröffentlicht: YouTube https://youtube.com/shorts/8B0YZsOway8 · Instagram https://www.instagram.com/helmut.brandner/reel/Ddgq6mdAkZk/
