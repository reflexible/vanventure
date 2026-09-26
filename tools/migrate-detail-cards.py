"""One-time byte-checked migration of activity and vehicle card groups."""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from site_detail import render_detail_main

SOURCE = ROOT / "content/detail-pages.json"
GROUP = re.compile(r'<div class="(?P<class>cards|reviews|systems-grid|brand-builds)">(?P<items>.*?)</div>', re.DOTALL)
ARTICLE = re.compile(r'<article>(.*?)</article>', re.DOTALL)


def migrate(data):
    before = {filename: render_detail_main(content, '<section data-photo-gallery></section>')
              for filename, content in data.items()}
    counts = {}
    for filename, page in data.items():
        count = 0
        for section in page["sections"]["items"]:
            matches = list(GROUP.finditer(section["content"]))
            if not matches:
                continue
            if len(matches) != 1:
                raise ValueError(f"Multiple card groups in one section: {filename}")
            match = matches[0]
            items = []
            offset = 0
            for article in ARTICLE.finditer(match["items"]):
                before_article = match["items"][offset:article.start()]
                if before_article.strip():
                    raise ValueError(f"Unexpected content between cards: {filename}")
                items.append({"before": before_article, "content": article.group(1)})
                offset = article.end()
            trailing = match["items"][offset:]
            if not items or trailing.strip():
                raise ValueError(f"Unexpected card structure: {filename}")
            section["card_group"] = {"class": match["class"], "items": items,
                                     "trailing": trailing}
            section["content"] = (section["content"][:match.start()]
                                  + "<!--section-card-group-->"
                                  + section["content"][match.end():])
            count += 1
        counts[filename] = count
    if counts != {"kajak.html": 2, "vehicle.html": 2}:
        raise ValueError(f"Unexpected page/card inventory: {counts}")
    after = {filename: render_detail_main(content, '<section data-photo-gallery></section>')
             for filename, content in data.items()}
    if before != after:
        raise ValueError("Card migration changed rendered markup")
    return counts


if __name__ == "__main__":
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    counts = migrate(data)
    if "--write" in sys.argv:
        SOURCE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Card groups migrated: {counts}; rendered output byte-identical")
