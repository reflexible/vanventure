"""One-time lossless migration from large HTML streams to section records.

Only writes content/detail-pages.json when --write is passed, and only after
the new shared section renderer reproduces every previous byte of HTML.
"""

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from site_detail import render_sections  # noqa: E402


SECTION = re.compile(r"<section(?P<attributes>[^>]*)>(?P<content>.*?)</section>", re.S)
ATTRIBUTE = re.compile(r'\s+([a-zA-Z][a-zA-Z0-9_-]*)="([^"]*)"')


def migrate_stream(html):
    items = []
    position = 0
    for match in SECTION.finditer(html):
        before = html[position:match.start()]
        if "<section" in before or "</section>" in before:
            raise ValueError("Nested or unmatched section in detail content")
        raw_attributes = match.group("attributes")
        attributes = [(name, value) for name, value in ATTRIBUTE.findall(raw_attributes)]
        reconstructed = "".join(f' {name}="{value}"' for name, value in attributes)
        if reconstructed != raw_attributes:
            raise ValueError(f"Unsupported section attributes: {raw_attributes}")
        if "<section" in match.group("content"):
            raise ValueError("Nested section in detail content")
        items.append({
            "before": before,
            "attributes": attributes,
            "content": match.group("content"),
        })
        position = match.end()
    trailing = html[position:]
    if "<section" in trailing or "</section>" in trailing:
        raise ValueError("Unmatched trailing section in detail content")
    stream = {"items": items, "trailing": trailing}
    if render_sections(stream) != html:
        raise ValueError("Migrated section stream changed the original HTML")
    return stream


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true")
    args = parser.parse_args()
    path = ROOT / "content/detail-pages.json"
    pages = json.loads(path.read_text(encoding="utf-8"))
    count = 0
    for page in pages.values():
        for key in ("sections", "closing_sections"):
            if not isinstance(page[key], str):
                raise SystemExit(f"Refusing to remigrate structured {key}")
            page[key] = migrate_stream(page[key])
            count += len(page[key]["items"])
    if args.write:
        path.write_text(json.dumps(pages, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{count} sections verified losslessly; {'written' if args.write else 'dry run'}")


if __name__ == "__main__":
    main()
