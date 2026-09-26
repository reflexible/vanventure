"""Losslessly move two detail heroes from HTML blobs to editorial fields."""

import argparse
from html import unescape
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from site_detail import render_hero  # noqa: E402


ACTIVITY = re.compile(
    r'<a class="photo-link" href="(?P<src>[^"]+)" aria-label="(?P<label>[^"]+)">'
    r'<img src="(?P<imgsrc>[^"]+)" alt="(?P<alt>[^"]+)" width="(?P<width>\d+)"'
    r' height="(?P<height>\d+)" fetchpriority="high" decoding="async">'
    r'<span class="photo-zoom" aria-hidden="true">(?P<zoom>.*?)</span></a>'
    r'<div class="kayak-hero-copy"><p class="eyebrow">(?P<eyebrow>.*?)</p>'
    r'<h1>(?P<title>.*?)</h1><p>(?P<intro>.*?)</p></div>'
    r'<p class="kayak-hero-meta">(?P<meta>.*?)</p>', re.S,
)
VEHICLE = re.compile(
    r'<div class="hero-copy"><p class="eyebrow" data-de="(?P<eyebrow_de>[^"]+)"'
    r' data-en="(?P<eyebrow_en>[^"]+)">(?P<eyebrow>.*?)</p>'
    r'<h1>(?P<title>.*?)</h1><p class="vehicle-lead" data-de="(?P<lead_de>[^"]+)"'
    r' data-en="(?P<lead_en>[^"]+)">(?P<lead>.*?)</p></div>'
    r'<dl class="hero-stats">(?P<stats>.*?)</dl>', re.S,
)
STAT = re.compile(
    r'<div><dt data-de="(?P<de>[^"]+)" data-en="(?P<en>[^"]+)">'
    r'(?P<label>.*?)</dt><dd>(?P<value>.*?)</dd></div>', re.S,
)


def migrate_activity(html):
    match = ACTIVITY.fullmatch(html)
    if not match or match["src"] != match["imgsrc"]:
        raise ValueError("Activity hero does not match approved markup")
    return {
        "image": {"src": unescape(match["src"]), "label": unescape(match["label"]),
                  "alt": unescape(match["alt"]), "width": int(match["width"]),
                  "height": int(match["height"]), "zoom": unescape(match["zoom"])},
        "eyebrow": unescape(match["eyebrow"]), "title_html": match["title"],
        "intro": unescape(match["intro"]), "meta": unescape(match["meta"]),
    }


def migrate_vehicle(html):
    match = VEHICLE.fullmatch(html)
    if not match:
        raise ValueError("Vehicle hero does not match approved markup")
    stats_html = match["stats"]
    matches = list(STAT.finditer(stats_html))
    if len(matches) != 3 or ''.join(item.group() for item in matches) != stats_html:
        raise ValueError("Vehicle stats cannot be extracted losslessly")
    bilingual = lambda de, en, content: {"de": unescape(de), "en": unescape(en),
                                         "content": content}
    return {
        "eyebrow": bilingual(match["eyebrow_de"], match["eyebrow_en"], match["eyebrow"]),
        "title_html": match["title"],
        "lead": bilingual(match["lead_de"], match["lead_en"], match["lead"]),
        "stats": [{"label": bilingual(item["de"], item["en"], item["label"]),
                   "value": unescape(item["value"])} for item in matches],
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    path = ROOT / "content/detail-pages.json"
    pages = json.loads(path.read_text(encoding="utf-8"))
    for filename, content in pages.items():
        old = content.pop("hero_content")
        page_type = content["type"]
        content["hero"] = migrate_activity(old) if page_type == "activity" else migrate_vehicle(old)
        if render_hero(page_type, content["hero"]) != old:
            raise ValueError(f"{filename}: new hero renderer changed approved HTML")
    if args.write:
        path.write_text(json.dumps(pages, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(pages)} hero structures verified losslessly; {'written' if args.write else 'dry run'}")


if __name__ == "__main__":
    main()
