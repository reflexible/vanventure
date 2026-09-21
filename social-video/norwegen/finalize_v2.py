from pathlib import Path
import json,shutil
ROOT=Path(__file__).parent
preview=ROOT/'Vorschau.html'
old=preview.read_text(encoding='utf-8')
if 'Norwegen_Reel_v2' not in old:
    shutil.copy2(preview,ROOT/'Vorschau_v1.html')
    old=old.replace('Norwegen_Reel','Norwegen_Reel_v2').replace('Norwegen_YouTube_Short','Norwegen_YouTube_Short_v2')
    old=old.replace('24 Sekunden','23 Sekunden').replace('32 Sekunden','27 Sekunden')
    old=old.replace('Reel und YouTube Short ·','Version 2 · auf den Beat geschnitten · Reel und YouTube Short ·')
    preview.write_text(old,encoding='utf-8')
doc=ROOT/'Upload-Texte.md';text=doc.read_text(encoding='utf-8')
if 'Version 2' not in text:
    shutil.copy2(doc,ROOT/'Upload-Texte_v1.md')
    text=text.replace('# Norwegen · VanVenture','# Norwegen · VanVenture · Version 2',1)
    text=text.replace('24 Sekunden','rund 23 Sekunden').replace('32 Sekunden','rund 27 Sekunden')
    text=text.replace('Norwegen_Reel','Norwegen_Reel_v2').replace('Norwegen_YouTube_Short','Norwegen_YouTube_Short_v2')
    text=text.replace('Norwegen. Kommst du mit?','Norwegen. Volles Gefühl.')
    text=text.replace('Fjorde vom Kajak aus, Gletschereis und eine Nacht in den Bergen.','Fjorde vom Kajak aus, Gletschereis, Wasserfälle und die Küste im Nebel.')
    text=text.replace('`Schnittplan.json`','`Schnittplan_v2.json`')
    text+='\n\nVersion 2: 18 Einstellungen in 22,625 Sekunden (Reel), 17 Einstellungen in 26,75 Sekunden (Short). Auf das aus der bestehenden Tonspur ermittelte Raster von ca. 175 BPM geschnitten; vorwiegend zwei oder vier Schläge, längere Akzente für Aussicht und Schluss. Schnittzeitpunkte am nächsten 24-fps-Bild, maximale Rundungsabweichung etwa 21 ms. Keine wiederholten oder überlappenden Quellausschnitte, auch nicht zwischen den beiden Videos. Alte Fassungen bleiben separat erhalten.\n'
    doc.write_text(text,encoding='utf-8')
p=json.loads((ROOT/'Schnittplan_v2.json').read_text(encoding='utf-8'))
intervals=sorted((r['source'],r['source_end']) for x in p for r in x['rows'])
assert all(a[1]<=b[0] for a,b in zip(intervals,intervals[1:]))
print('Vorschau und Beschreibungstexte aktualisiert. Keine überlappenden Quellausschnitte.')
