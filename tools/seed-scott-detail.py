"""One-time lossless capture of Scott prose for the shared equipment template."""

import argparse
from html import unescape
from importlib.util import module_from_spec, spec_from_file_location
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DETAILS = ROOT / "content/detail-pages.json"
PAGE = ROOT / "scott-mountainbike.html"


def part(pattern, text):
    match = re.search(pattern, text, re.S)
    if not match:
        raise ValueError(f"Scott source changed: {pattern}")
    return unescape(match.group(1))


def localized(css_class, text):
    expression = rf'<p class="{css_class}" data-de="([^"]*)" data-en="([^"]*)">([^<]*)</p>'
    match = re.search(expression, text, re.S)
    if not match:
        raise ValueError(f"Missing Scott localized field: {css_class}")
    return {"de": unescape(match.group(1)), "en": unescape(match.group(2)),
            "content": unescape(match.group(3))}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    page = PAGE.read_text(encoding="utf-8")
    main = re.search(r'<main[^>]*>[\s\S]*?</main>', page)
    if not main:
        raise ValueError("No Scott main")
    body = main.group()[len('<main>'):-len('</main>')]
    hero = re.search(r'<section class="equipment-hero scott-hero">[\s\S]*?</section>', body)
    gallery = re.search(r'<section class="equipment-gallery bike-gallery" data-photo-gallery[\s\S]*?</section>', body)
    if not hero or not gallery or hero.end() >= gallery.start():
        raise ValueError("Scott hero/gallery order changed")

    spec = spec_from_file_location("migrate_detail_sections", ROOT / "tools/migrate-detail-sections.py")
    module = module_from_spec(spec)
    spec.loader.exec_module(module)
    sections_html = body[hero.end():gallery.start()]
    closing_html = body[gallery.end():]
    sections = module.migrate_stream(sections_html)
    closing = module.migrate_stream(closing_html)
    if module.render_sections(sections) != sections_html or module.render_sections(closing) != closing_html:
        raise ValueError("Scott body changed during extraction")

    hero_html = hero.group()
    image_src = part(r'<a class="equipment-hero-photo photo-link" href="([^"]+)"', hero_html)
    data = {
        "type": "equipment", "before_hero": body[:hero.start()],
        "hero": {
            "image": {"src": image_src,
                      "label": part(r'<a class="equipment-hero-photo photo-link"[^>]*aria-label="([^"]+)"', hero_html),
                      "alt": part(r'<img[^>]*alt="([^"]+)"', hero_html),
                      "zoom": part(r'<span class="photo-zoom"[^>]*>([^<]+)</span>', hero_html)},
            "eyebrow": localized("equipment-kicker", hero_html),
            "title_html": part(r'<h1>(.*?)</h1>', hero_html),
            "intro": localized("equipment-intro", hero_html),
            "meta": localized("bike-hero-caption", hero_html),
        },
        "sections": sections, "closing_sections": closing,
    }
    details = json.loads(DETAILS.read_text(encoding="utf-8"))
    if "scott-mountainbike.html" in details:
        raise ValueError("Scott detail already captured")
    details["scott-mountainbike.html"] = data
    if args.write:
        DETAILS.write_text(json.dumps(details, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Scott capture verified: {len(sections['items'])} sections; {'written' if args.write else 'dry run'}")


if __name__ == "__main__":
    main()
