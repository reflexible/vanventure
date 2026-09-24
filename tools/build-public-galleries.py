"""Build or check public galleries from page data and one shared renderer."""

import argparse
import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from site_gallery import render_gallery, travel_gallery  # noqa: E402


PATTERN = re.compile(r'<section(?=[^>]*(?:data-photo-gallery|class="equipment-gallery"))[^>]*>[\s\S]*?</section>')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--write", action="store_true", help="replace generated gallery sections")
    args = parser.parse_args()
    galleries = json.loads((ROOT / "content/public-galleries.json").read_text(encoding="utf-8"))
    outputs = {filename: render_gallery(gallery) for filename, gallery in galleries.items()}
    stories = json.loads((ROOT / "travel-stories.json").read_text(encoding="utf-8"))
    outputs.update({f"{story['slug']}.html": travel_gallery(story) for story in stories})
    changed = []
    for filename, rendered in outputs.items():
        path = ROOT / filename
        original = path.read_text(encoding="utf-8")
        matches = list(PATTERN.finditer(original))
        if len(matches) != 1:
            raise SystemExit(f"{filename}: expected one gallery section, got {len(matches)}")
        if matches[0].group() != rendered:
            changed.append(filename)
            if args.write:
                path.write_text(original[:matches[0].start()] + rendered + original[matches[0].end():], encoding="utf-8")
    if changed and not args.write:
        raise SystemExit("Gallery output differs from shared source: " + ", ".join(changed))
    print(f"{len(outputs)} galleries checked, {len(changed)} {'generated' if args.write else 'changed'}")


if __name__ == "__main__":
    main()
