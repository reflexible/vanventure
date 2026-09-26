"""Remove remaining internal links to retired equipment overview pages.

Only static fallback navigation and the Scott closing link are changed. The
central navigation already links directly to individual equipment pages.
"""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / name for name in (
    "cube.html", "trek-gravelbike.html", "diamant-stadtraeder.html",
    "woom-2.html", "scott-mountainbike.html",
)]
DATA = ROOT / "content/detail-pages.json"
OLD_GEAR = re.compile(r'<a href="ausruestung\.html" data-nav="gear"[^>]*>Ausrüstung</a>')
OLD_BACK = re.compile(r'<a class=\\?"back-link\\?" href=\\?"bike\.html\\?"[^>]*>[^<]*</a>')


def rewrite(path):
    before = path.read_text(encoding="utf-8")
    after, count = OLD_GEAR.subn("", before)
    if path.name == "scott-mountainbike.html" or path == DATA:
        after, removed_back = OLD_BACK.subn("", after)
        count += removed_back
    if count == 0:
        raise SystemExit(f"No expected overview link found: {path}")
    if 'href="ausruestung.html"' in after or 'href="bike.html"' in after:
        raise SystemExit(f"Overview link remained: {path}")
    path.write_text(after, encoding="utf-8")
    print(f"{path.relative_to(ROOT)}: {count} overview link(s) removed")


if __name__ == "__main__":
    for file in [*PAGES, DATA]:
        rewrite(file)
