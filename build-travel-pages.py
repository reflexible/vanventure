from pathlib import Path
from html import escape
import json,re
r=Path(__file__).parent
stories=json.loads((r/'travel-stories.json').read_text(encoding='utf-8'))
def text(tag,pair,cls=''):
    de,en=pair
    return f'<{tag}'+(f' class="{cls}"' if cls else '')+f' data-de="{escape(de,quote=True)}" data-en="{escape(en,quote=True)}">{escape(de)}</{tag}>'
def link(url,pair,cls=''):
    return f'<a href="{escape(url,quote=True)}"'+(f' class="{cls}"' if cls else '')+f' data-de="{escape(pair[0],quote=True)}" data-en="{escape(pair[1],quote=True)}">{escape(pair[0])}</a>'
def photographs(chapter):
    return ''.join('<figure class="story-photo"><img src="'+escape(photo['src'],quote=True)+'" alt="'+escape(photo['caption'][0],quote=True)+'" loading="lazy">'+text('figcaption',photo['caption'])+'</figure>' for photo in chapter.get('photos',[]))
for story in stories:
    toc=''.join(link(f'#kapitel-{i+1}',c['title']) for i,c in enumerate(story['chapters']))
    chapters=''.join(f'<section id="kapitel-{i+1}" class="story-chapter"><span class="chapter-number">{i+1:02}</span>'+text('h2',c['title'])+''.join(text('p',p) for p in c['paragraphs'])+photographs(c)+'</section>' for i,c in enumerate(story['chapters']))
    chapters += link('index.html#riverstar', ['Unser Grabner Riverstar ↗', 'Our Grabner Riverstar ↗'], 'full-story-link')
    videos=''.join(f'<a href="https://www.youtube.com/watch?v={v}" target="_blank" rel="noopener" class="button button-dark" data-de="{escape(de)} ↗" data-en="{escape(en)} ↗">{escape(de)} ↗</a>' for v,de,en in story['videos'])
    others=''.join(link(s['slug']+'.html',[s['country'][0]+' '+s['year']+' ↗',s['country'][1]+' '+s['year']+' ↗']) for s in stories if s!=story)
    page='<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(story['country'][0]+' '+story['year']+' – '+story['title'][0]+' | VanVenture')+'</title><meta name="description" content="'+escape(story['subtitle'][0],quote=True)+'"><link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="travel-stories.css"><link rel="stylesheet" href="hero-shared.css"></head><body class="story-page '+escape(story['slug'],quote=True)+'"><a class="skip-link" href="#geschichte">Zum Reisebericht</a><header class="site-header story-header"><a class="brand" href="index.html"><img src="assets/vanventure-logo-transparent.png" alt=""><span>VANVENTURE</span></a><nav aria-label="Hauptnavigation">'+link('index.html#reisen',['Reisearchiv','Trip archive'])+link('vehicle.html',['Unser Van','Our van'])+'</nav><button id="language" class="language" aria-label="Switch to English">EN</button></header><main id="geschichte"><section class="story-hero"><img class="story-hero-image" src="'+escape(story['hero']['src'],quote=True)+'" alt="'+escape(story['hero']['alt'],quote=True)+'" fetchpriority="high" decoding="async"><div class="story-hero-copy">'+text('p',[story['country'][0].upper()+' · '+story['year'],story['country'][1].upper()+' · '+story['year']],'eyebrow')+text('h1',story['title'])+text('p',story['subtitle'],'story-subtitle')+text('p',story['meta'],'story-meta')+'</div></section><div class="story-layout"><aside class="story-sidebar">'+text('p',['DIE ETAPPEN','THE CHAPTERS'],'eyebrow')+'<nav aria-label="Kapitel">'+toc+'</nav></aside><article class="story-body">'+text('p',story['lead'],'story-lead')+chapters+'</article></div><section class="story-end">'+text('p',['AUS UNSEREM REISETAGEBUCH','FROM OUR TRAVEL DIARY'],'eyebrow')+text('h2',['Die Reise in bewegten Bildern.','The journey in motion.'])+'<div class="story-videos">'+videos+'</div>'+text('p',['Damals im VW California unterwegs. Seit 2025 fahren wir den HYMER Grand Canyon S CrossOver.','We travelled in a VW California back then. Since 2025, we have driven the HYMER Grand Canyon S CrossOver.'],'story-history')+'<div class="story-next">'+link('index.html#reisen',['← Zurück zum Reisearchiv','← Back to the trip archive'])+others+'</div></section></main><footer><span>© <span id="year"></span> VanVenture</span><span>Travel slow. Go far.</span></footer><script src="script.js"></script></body></html>'
    (r/(story['slug']+'.html')).write_text(page,encoding='utf-8')
homepage=r/'index.html';s=homepage.read_text(encoding='utf-8')
if 'href="travel-stories.css"' not in s:
    s=s.replace('<link rel="stylesheet" href="styles.css" />','<link rel="stylesheet" href="styles.css" />\n    <link rel="stylesheet" href="travel-stories.css" />')
for i,story in enumerate(stories):
    marker='<details class="trip-details">'
    # Insert once after each country teaser, before its short expandable overview.
    blocks=list(re.finditer(re.escape(marker),s))
    pos=blocks[i].start()
    if story['slug']+'.html' not in s:
        s=s[:pos]+link(story['slug']+'.html',['Den ganzen Reisebericht lesen ↗','Read the full travel story ↗'],'full-story-link')+s[pos:]
s=s.replace('data-de="Reisebericht lesen" data-en="Read the travel story">Reisebericht lesen','data-de="Etappen im Überblick" data-en="Stages at a glance">Etappen im Überblick')
homepage.write_text(s,encoding='utf-8')
for s in stories:
    words=sum(len(p[0].split()) for c in s['chapters'] for p in c['paragraphs'])+len(s['lead'][0].split())
    print(s['slug'],words,'German words')
