"""Read-only inventory of every public image variant and its project source.

This is deliberately a selection aid, not an automatic color-grading command.
"""

import json
import re
from collections import Counter
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGES = [
    "index.html", "vehicle.html", "kajak.html", "norwegen-2018.html",
    "sardinien-2019.html", "italien-2021.html", "ausruestung.html", "bike.html",
    "scott-mountainbike.html", "cube.html", "trek-gravelbike.html",
    "diamant-stadtraeder.html", "woom-2.html",
]
SOURCES = PAGES + [
    "styles.css", "navigation.css", "equipment-pages.css", "bike-pages.css",
    "travel-stories.css", "vehicle-profile.css", "riverstar.css",
    "kajak-gallery.css", "hero-shared.css", "kajak-hero.css",
    "photo-viewer.css", "travel-stories.json",
]
REGISTERS = [
    "docs/riverstar/bildquellen.json", "docs/kajak-galerie-bildquellen.json",
    "docs/ausruestung-bildquellen.json", "docs/scott-bildquellen.json",
    "docs/reiseberichte-bildquellen.json", "docs/site-assets-bildquellen.json",
    "docs/hero-bildquellen.json", "docs/vehicle-bildquellen.json",
]
IMAGE_RE = re.compile(r"assets/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp|gif|avif)", re.I)


def main():
    usage = {}
    for source in SOURCES:
        path = ROOT / source
        if path.exists():
            for image in IMAGE_RE.findall(path.read_text(encoding="utf-8")):
                usage.setdefault(image, set()).add(source)
    records = {}
    for register in REGISTERS:
        data = json.loads((ROOT / register).read_text(encoding="utf-8"))
        entries = data if isinstance(data, list) else [
            dict(record, web_image=f"assets/bikes/{name}")
            for name, record in data.items()
        ]
        for entry in entries:
            image = entry.get("web_image", "").replace("\\", "/")
            if image:
                records[image] = (register, entry)
    manifest = "review/selected-originals-manifest.json"
    for entry in json.loads((ROOT / manifest).read_text(encoding="utf-8")):
        name = Path(entry["source_path"]).stem.lower().replace("_", "-")
        image = f"assets/reisen/{entry['trip']}/gallery/{name}.jpg"
        records.setdefault(image, (manifest, entry))
    groups = Counter()
    for image in sorted(usage):
        register, entry = records.get(image, ("MISSING", {}))
        project_copy = next((entry[key] for key in (
            "unchanged_copy", "unchanged_project_copy", "unchangedProjectCopy",
            "unchangedProjectSource", "project_original") if entry.get(key)), "")
        if not project_copy:
            candidates = entry.get("candidateProjectCopies") or []
            project_copy = candidates[0] if candidates else ""
        source_exists = bool(project_copy and (ROOT / project_copy).exists())
        collection = entry.get("collection", "")
        category = "graphic" if collection == "site-branding" else "photo-or-illustration"
        if not source_exists:
            category = "source-needs-review"
        groups[category] += 1
        print("\t".join([image, category, "source=" + project_copy,
                         "register=" + register, "used=" + ",".join(sorted(usage[image]))]))
    print("TOTAL", len(usage), dict(groups))


if __name__ == "__main__":
    main()
