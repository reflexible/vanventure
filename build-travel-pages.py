from pathlib import Path
from html import escape
import json
import re

r = Path(__file__).parent
stories = json.loads((r / 'travel-stories.json').read_text(encoding='utf-8'))


def text(tag, pair, cls=''):
    de, en = pair
    return (f'<{tag}' + (f' class="{cls}"' if cls else '')
            + f' data-de="{escape(de, quote=True)}" data-en="{escape(en, quote=True)}">'
            + f'{escape(de)}</{tag}>')


def link(url, pair, cls=''):
    return (f'<a href="{escape(url, quote=True)}"' + (f' class="{cls}"' if cls else '')
            + f' data-de="{escape(pair[0], quote=True)}" data-en="{escape(pair[1], quote=True)}">'
            + f'{escape(pair[0])}</a>')


def site_header(active_slug=''):
    trip_links = ''.join(
        f'<a href="{story["slug"]}.html"'
        + (' aria-current="page"' if story['slug'] == active_slug else '')
        + f'><b data-de="{escape(story["country"][0], quote=True)}" data-en="{escape(story["country"][1], quote=True)}">'
        + f'{escape(story["country"][0])}</b><span>{escape(story["year"])}</span></a>'
        for story in stories
    )
    return (
        '<header class="site-header magazine-header story-header" data-section="trips">'
        '<a class="brand" href="index.html" aria-label="VanVenture Home"><img src="assets/vanventure-logo-transparent.png" alt="" aria-hidden="true"><span>VANVENTURE</span></a>'
        '<nav id="site-navigation" class="main-navigation" aria-label="Hauptnavigation">'
        '<details class="nav-trips is-active"><summary data-de="Reisen" data-en="Trips">Reisen</summary><div class="trip-menu">'
        '<a href="index.html#reisen" data-de="Alle Reisen" data-en="All trips">Alle Reisen</a>'
        + trip_links
        + '</div></details>'
        '<a href="vehicle.html" data-nav="vehicle" data-de="Fahrzeug" data-en="Vehicle">Fahrzeug</a>'
        '<a href="kajak.html" data-nav="kayak" data-de="Kajak" data-en="Kayak">Kajak</a>'
        '<a href="index.html#ausruestung" data-nav="gear" data-de="Ausrüstung" data-en="Gear">Ausrüstung</a>'
        '<a href="index.html#ueber-uns" data-nav="about" data-de="Über uns" data-en="About us">Über uns</a>'
        '</nav><div class="header-actions"><button id="language" class="language" type="button" aria-label="Switch to English">EN</button>'
        '<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-navigation"><span class="menu-label" data-de="Menü" data-en="Menu">Menü</span><span class="menu-icon" aria-hidden="true"></span></button></div></header>'
    )


def photographs(chapter):
    return ''.join(
        '<figure class="story-photo"><img src="' + escape(photo['src'], quote=True)
        + '" alt="' + escape(photo['caption'][0], quote=True) + '" loading="lazy">'
        + text('figcaption', photo['caption']) + '</figure>'
        for photo in chapter.get('photos', [])
    )


for story in stories:
    toc = ''.join(link(f'#kapitel-{i + 1}', c['title']) for i, c in enumerate(story['chapters']))
    chapters = ''.join(
        f'<section id="kapitel-{i + 1}" class="story-chapter"><span class="chapter-number">{i + 1:02}</span>'
        + text('h2', c['title']) + ''.join(text('p', p) for p in c['paragraphs'])
        + photographs(c) + '</section>'
        for i, c in enumerate(story['chapters'])
    )
    chapters += link('index.html#riverstar', ['Unser Grabner Riverstar ↗', 'Our Grabner Riverstar ↗'], 'button button-dark')
    videos = ''.join(
        f'<a href="https://www.youtube.com/watch?v={v}" target="_blank" rel="noopener" class="button button-dark" '
        f'data-de="{escape(de)} ↗" data-en="{escape(en)} ↗">{escape(de)} ↗</a>'
        for v, de, en in story['videos']
    )
    others = ''.join(
        link(s['slug'] + '.html', [s['country'][0] + ' ' + s['year'] + ' ↗', s['country'][1] + ' ' + s['year'] + ' ↗'])
        for s in stories if s != story
    )
    page = (
        '<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>' + escape(story['country'][0] + ' ' + story['year'] + ' – ' + story['title'][0] + ' | VanVenture') + '</title>'
        '<meta name="description" content="' + escape(story['subtitle'][0], quote=True) + '">'
        '<link rel="stylesheet" href="styles.css"><link rel="stylesheet" href="travel-stories.css">'
        '<link rel="stylesheet" href="hero-shared.css"><link rel="stylesheet" href="navigation.css">'
        '<link rel="stylesheet" href="photo-viewer.css"></head>'
        '<body class="story-page ' + escape(story['slug'], quote=True) + '"><a class="skip-link" href="#geschichte">Zum Reisebericht</a>'
        + site_header(story['slug'])
        + '<main id="geschichte"><section class="story-hero"><img class="story-hero-image" src="'
        + escape(story['hero']['src'], quote=True) + '" alt="' + escape(story['hero']['alt'], quote=True)
        + '" fetchpriority="high" decoding="async"><div class="story-hero-copy">'
        + text('p', [story['country'][0].upper() + ' · ' + story['year'], story['country'][1].upper() + ' · ' + story['year']], 'eyebrow')
        + text('h1', story['title']) + text('p', story['subtitle'], 'story-subtitle') + text('p', story['meta'], 'story-meta')
        + '</div></section><div class="story-layout"><aside class="story-sidebar">'
        + text('p', ['DIE ETAPPEN', 'THE CHAPTERS'], 'eyebrow') + '<nav aria-label="Kapitel">' + toc
        + '</nav></aside><article class="story-body">' + text('p', story['lead'], 'story-lead') + chapters
        + '</article></div><section class="story-end">' + text('p', ['AUS UNSEREM REISETAGEBUCH', 'FROM OUR TRAVEL DIARY'], 'eyebrow')
        + text('h2', ['Die Reise in bewegten Bildern.', 'The journey in motion.']) + '<div class="story-videos">' + videos
        + '</div>' + text('p', ['Damals im VW California unterwegs. Seit 2025 fahren wir den HYMER Grand Canyon S CrossOver.',
                              'We travelled in a VW California back then. Since 2025, we have driven the HYMER Grand Canyon S CrossOver.'], 'story-history')
        + '<div class="story-next">' + link('index.html#reisen', ['← Zurück zum Reisearchiv', '← Back to the trip archive']) + others
        + '</div></section></main><footer><span>© <span id="year"></span> VanVenture</span><span>Travel slow. Go far.</span></footer>'
        '<script src="script.js"></script><script src="navigation.js"></script><script src="photo-viewer.js" defer></script></body></html>'
    )
    (r / (story['slug'] + '.html')).write_text(page, encoding='utf-8')

homepage = r / 'index.html'
s = homepage.read_text(encoding='utf-8')
if 'href="travel-stories.css"' not in s:
    s = s.replace('<link rel="stylesheet" href="styles.css" />', '<link rel="stylesheet" href="styles.css" />\n    <link rel="stylesheet" href="travel-stories.css" />')
for i, story in enumerate(stories):
    marker = '<details class="trip-details">'
    blocks = list(re.finditer(re.escape(marker), s))
    pos = blocks[i].start()
    if story['slug'] + '.html' not in s:
        s = s[:pos] + link(story['slug'] + '.html', ['Den ganzen Reisebericht lesen ↗', 'Read the full travel story ↗'], 'full-story-link') + s[pos:]
s = s.replace('data-de="Reisebericht lesen" data-en="Read the travel story">Reisebericht lesen',
              'data-de="Etappen im Überblick" data-en="Stages at a glance">Etappen im Überblick')
homepage.write_text(s, encoding='utf-8')

for story in stories:
    words = sum(len(p[0].split()) for c in story['chapters'] for p in c['paragraphs']) + len(story['lead'][0].split())
    print(story['slug'], words, 'German words')
