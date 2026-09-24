"""Build/check activity and vehicle pages from reusable page-type structures."""

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from site_detail import render_detail_main, render_pending_bike_main  # noqa: E402
from site_gallery import render_gallery  # noqa: E402


MAIN = re.compile(r'<main[^>]*>[\s\S]*?</main>')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="replace generated main sections")
    parser.add_argument("--page", help="build/check only this registered page")
    args = parser.parse_args()
    pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
    pending_bikes = json.loads((ROOT / "content/pending-bike-pages.json").read_text(encoding="utf-8"))
    galleries = json.loads((ROOT / "content/public-galleries.json").read_text(encoding="utf-8"))
    if args.page:
        if args.page in pages:
            pages = {args.page: pages[args.page]}
            pending_bikes = {}
        elif args.page in pending_bikes:
            pending_bikes = {args.page: pending_bikes[args.page]}
            pages = {}
        else:
            raise SystemExit(f"Unregistered detail page: {args.page}")
    changed = []
    for filename, content in pages.items():
        page_file = ROOT / filename
        page = page_file.read_text(encoding="utf-8")
        matches = list(MAIN.finditer(page))
        if len(matches) != 1:
            raise SystemExit(f"{filename}: expected one main, got {len(matches)}")
        rendered = render_detail_main(content, render_gallery(galleries[filename]))
        if matches[0].group() != rendered:
            changed.append(filename)
            if args.write:
                page_file.write_text(page[:matches[0].start()] + rendered + page[matches[0].end():], encoding="utf-8")
    for filename, content in pending_bikes.items():
        if filename in pages:
            raise SystemExit(f"Duplicate detail source: {filename}")
        page_file = ROOT / filename
        page = page_file.read_text(encoding="utf-8")
        matches = list(MAIN.finditer(page))
        if len(matches) != 1:
            raise SystemExit(f"{filename}: expected one main, got {len(matches)}")
        rendered = render_pending_bike_main(content)
        if matches[0].group() != rendered:
            changed.append(filename)
            if args.write:
                page_file.write_text(page[:matches[0].start()] + rendered + page[matches[0].end():], encoding="utf-8")
    if changed and not args.write:
        raise SystemExit("Detail output differs from templates: " + ", ".join(changed))
    print(f"{len(pages) + len(pending_bikes)} detail pages checked, {len(changed)} {'generated' if args.write else 'changed'}")


if __name__ == "__main__":
    main()
