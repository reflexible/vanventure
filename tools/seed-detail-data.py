"""Capture existing activity/vehicle content without changing published output."""

import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "content/detail-pages.json"
PAGES = {"kajak.html": ("activity", "kayak-page-hero"),
         "vehicle.html": ("vehicle", "vehicle-hero")}


def extract(filename, page_type, hero_class):
    page = (ROOT / filename).read_text(encoding="utf-8")
    main = re.search(r'<main[^>]*>[\s\S]*?</main>', page)
    if not main:
        raise ValueError(f"{filename}: no main")
    body = main.group()
    opening = re.match(r'<main[^>]*>', body)
    body = body[opening.end():-len('</main>')]
    hero = re.search(rf'<section class="{re.escape(hero_class)}">[\s\S]*?</section>', body)
    gallery = re.search(r'<section[^>]+data-photo-gallery[^>]*>[\s\S]*?</section>', body)
    if not hero or not gallery or hero.end() >= gallery.start():
        raise ValueError(f"{filename}: expected hero before gallery")
    hero_open = re.match(r'<section[^>]*>', hero.group())
    return {"type": page_type, "before_hero": body[:hero.start()],
            "hero_content": hero.group()[hero_open.end():-len('</section>')],
            "sections": body[hero.end():gallery.start()],
            "closing_sections": body[gallery.end():]}


def main():
    if OUTPUT.exists():
        raise SystemExit("Refusing to overwrite existing detail-page content")
    content = {filename: extract(filename, *settings) for filename, settings in PAGES.items()}
    OUTPUT.write_text(json.dumps(content, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Seeded {len(content)} detail pages")


if __name__ == "__main__":
    main()
