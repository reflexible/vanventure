"""One-time, non-destructive extraction of existing public gallery content."""

import json
import re
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "content/public-galleries.json"
PAGES = ("kajak.html", "vehicle.html", "bike.html", "scott-mountainbike.html", "ausruestung.html")


class Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = {"tag": "root", "attrs": {}, "children": [], "text": ""}
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = {"tag": tag, "attrs": dict(attrs), "children": [], "text": ""}
        self.stack[-1]["children"].append(node)
        if tag not in {"img", "br", "hr", "input", "meta", "link"}:
            self.stack.append(node)

    def handle_endtag(self, tag):
        if len(self.stack) > 1 and self.stack[-1]["tag"] == tag:
            self.stack.pop()

    def handle_data(self, data):
        self.stack[-1]["text"] += data


def children(node):
    return node["children"]


def only(node, tag):
    matches = [child for child in children(node) if child["tag"] == tag]
    if len(matches) != 1:
        raise ValueError(f"Expected one {tag} in {node['tag']}; got {len(matches)}")
    return matches[0]


def text_node(node):
    return {"tag": node["tag"], "attrs": node["attrs"], "text": node["text"].strip()}


def extract(page):
    html = (ROOT / page).read_text(encoding="utf-8")
    pattern = r'<section(?=[^>]*(?:data-photo-gallery|class="equipment-gallery"))[^>]*>[\s\S]*?</section>'
    matches = list(re.finditer(pattern, html))
    if len(matches) != 1:
        raise ValueError(f"{page}: expected one gallery section, got {len(matches)}")
    tree = Tree()
    tree.feed(matches[0].group())
    section = only(tree.root, "section")
    section_children = children(section)
    header_wrap = section_children[0]["tag"] == "div"
    header_nodes = children(section_children[0]) if header_wrap else section_children
    header = [text_node(node) for node in header_nodes if node["tag"] in {"p", "h2"}][:3]
    grids = [node for node in section_children if node["tag"] == "div" and "gallery-grid" in node["attrs"].get("class", "")]
    if len(grids) != 1 or len(header) != 3:
        raise ValueError(f"{page}: unexpected gallery heading or grid")
    grid = grids[0]
    items = []
    for tile in children(grid):
        if tile["tag"] == "button":
            image = only(tile, "img")
            caption = only(tile, "span")
            items.append({"kind": "button", "control": tile["attrs"], "image": image["attrs"], "caption": text_node(caption)})
        elif tile["tag"] == "figure":
            link = only(tile, "a")
            image = only(link, "img")
            zoom = only(link, "span")
            caption = only(tile, "figcaption")
            items.append({"kind": "figure-link", "figure": tile["attrs"], "control": link["attrs"],
                          "image": image["attrs"], "zoom": text_node(zoom), "caption": text_node(caption)})
        else:
            raise ValueError(f"{page}: unexpected tile {tile['tag']}")
    return {"section": section["attrs"], "header_wrap": header_wrap,
            "header": header, "grid": grid["attrs"], "items": items}


def main():
    if OUTPUT.exists():
        raise SystemExit("Refusing to overwrite seeded gallery content")
    galleries = {page: extract(page) for page in PAGES}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(galleries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Seeded {len(galleries)} galleries and {sum(len(item['items']) for item in galleries.values())} image entries")


if __name__ == "__main__":
    main()
