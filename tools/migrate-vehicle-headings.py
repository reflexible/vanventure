"""One-time, byte-checked migration of repeated vehicle heading markup."""

import json
import re
import sys
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
from site_detail import render_detail_main

SOURCE = ROOT / "content" / "detail-pages.json"
HEADING = re.compile(r'<div class="section-heading">(.*?)</div>')
FIELD = re.compile(r'<(?P<tag>p|h2) class="(?P<class>eyebrow|base-note)" data-de="(?P<de>[^"]*)" data-en="(?P<en>[^"]*)">(?P<content>.*?)</(?P=tag)>|<h2 data-de="(?P<hde>[^"]*)" data-en="(?P<hen>[^"]*)">(?P<hcontent>.*?)</h2>')


def bilingual(match, title=False):
    if title:
        return {"de": unescape(match["hde"]), "en": unescape(match["hen"]),
                "content": unescape(match["hcontent"])}
    return {key: unescape(match[key]) for key in ("de", "en", "content")}


def migrate(data):
    vehicle = data["vehicle.html"]
    before = render_detail_main(vehicle, "<section data-photo-gallery></section>")
    count = 0
    for section in vehicle["sections"]["items"]:
        content = section["content"]
        matches = list(HEADING.finditer(content))
        if len(matches) != 1:
            raise ValueError("Expected one vehicle heading per section")
        heading_match = matches[0]
        fields = list(FIELD.finditer(heading_match.group(1)))
        if len(fields) not in (2, 3) or ''.join(match.group(0) for match in fields) != heading_match.group(1):
            raise ValueError("Unexpected vehicle heading markup")
        if fields[0]["class"] != "eyebrow" or fields[1]["hde"] is None:
            raise ValueError("Unexpected vehicle heading order")
        heading = {"eyebrow": bilingual(fields[0]), "title": bilingual(fields[1], title=True)}
        if len(fields) == 3:
            if fields[2]["class"] != "base-note":
                raise ValueError("Unexpected vehicle note")
            heading["note"] = bilingual(fields[2])
        section["heading"] = heading
        section["content"] = content[:heading_match.start()] + "<!--section-heading-->" + content[heading_match.end():]
        count += 1
    after = render_detail_main(vehicle, "<section data-photo-gallery></section>")
    if before != after:
        raise ValueError("Migration changed rendered vehicle markup")
    return count


if __name__ == "__main__":
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    count = migrate(data)
    if "--write" in sys.argv:
        SOURCE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{count} vehicle headings migrated; rendered output byte-identical")
