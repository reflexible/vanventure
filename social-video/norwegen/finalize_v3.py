import json,shutil
from pathlib import Path
ROOT=Path(__file__).parent
report=json.loads((ROOT/'Pruefung_v3.json').read_text())
assert all(p['decode_exit']==0 and p['audio_identical'] and not p['black_sections'] for p in report)
preview=ROOT/'Vorschau.html';html=preview.read_text(encoding='utf-8')
if 'Norwegen_Reel_v3' not in html:
    shutil.copy2(preview,ROOT/'Vorschau_v2.html')
    html=html.replace('_v2','_v3').replace('Version 2 · auf den Beat geschnitten','Version 3 · stabilisiert und auf den Beat geschnitten')
    preview.write_text(html,encoding='utf-8')
doc=ROOT/'Upload-Texte.md';text=doc.read_text(encoding='utf-8')
if 'Version 3' not in text:
    shutil.copy2(doc,ROOT/'Upload-Texte_v2.md')
    text=text.replace('Version 2','Version 3').replace('_v2','_v3')
    text+='\n\nStabilisierte Fassung: Jede Einstellung vor dem Hochkantbeschnitt separat mit einer zweistufigen Bewegungsanalyse geglättet. Fester zusätzlicher Bildbeschnitt pro Szene verhindert wandernde Ränder. Den digitalen Zoom aus Version 2 entfernt. Musik bitidentisch aus Version 2 übernommen; sämtliche Schnittpunkte und Bildanzahlen unverändert. Vorige Fassungen bleiben erhalten.\n'
    doc.write_text(text,encoding='utf-8')
print('Vorschau und Dokumentation auf Version 3 aktualisiert.')
