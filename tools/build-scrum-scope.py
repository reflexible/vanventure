"""Build read-only-source scope tables for the four formerly partial plan blocks.

This script writes only into docs/scrum-migration. It does not grant image or
release approval. Original source text and photo manifests remain authoritative.
"""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs/scrum-migration"


def write(name, fields, rows):
    with (OUT / name).open("w", newline="", encoding="utf-8-sig") as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


pages = [
    ("index.html", "Homepage", "Independent layout; ST-WEB-03 verification"),
    ("vehicle.html", "Vehicle", "ST-WEB-02,ST-WEB-03"),
    ("kajak.html", "Activity", "ST-WEB-02,ST-WEB-03"),
    ("norwegen-2018.html", "Travel", "ST-WEB-04,ST-WEB-03"),
    ("sardinien-2019.html", "Travel", "ST-WEB-04,ST-WEB-03"),
    ("italien-2021.html", "Travel", "ST-WEB-04,ST-WEB-03"),
    ("scott-mountainbike.html", "Bike", "ST-WEB-05,ST-WEB-03"),
    ("cube.html", "Pending bike", "ST-WEB-05,ST-WEB-03"),
    ("trek-gravelbike.html", "Pending bike", "ST-WEB-05,ST-WEB-03"),
    ("diamant-stadtraeder.html", "Pending bike", "ST-WEB-05,ST-WEB-03"),
    ("woom-2.html", "Pending bike", "ST-WEB-05,ST-WEB-03"),
]
write("page-scope.csv", ["Route", "Type", "PlanningMapping", "ImplementationVerification"],
      [{"Route": route, "Type": kind, "PlanningMapping": mapping,
        "ImplementationVerification": "Existing / Verify; route-level visual and live acceptance pending"}
       for route, kind, mapping in pages])

approved = {
    "assets/bikes/sardinien-bikepause-editorial-v2.jpg",
    "assets/heroes/italien-2021-tropea-editorial-v2.jpg",
    "assets/reisen/italien-2021/alberobello-trulli-v11.jpg",
    "assets/reisen/sardinien-2019/bikepause-im-gruenen-editorial-v2.jpg",
    "assets/reisen/sardinien-2019/sardinien-kueste-editorial-v2.jpg",
    "assets/bikes/scott-tourenpause-2022-editorial-v2.webp",
}
retired = "assets/bikes/scott-tourenpause-2022-v1.webp"
blocked = {
    "assets/reisen/sardinien-2019/gallery/dsc-0280.jpg": "Nr. 63: age/publication decision pending",
    "assets/riverstar/gallery/kajak-09.jpg": "Nr. 69: age/publication decision pending",
}
manifest_dir = ROOT / "review/graded-previews"
items = []
for number in (1, 2, 3):
    manifest = manifest_dir / f"sitewide-second-pass-round{number}-2026-09-24/manifest.json"
    for item in json.loads(manifest.read_text(encoding="utf-8")):
        items.append((item, manifest.relative_to(ROOT).as_posix()))
assert len(items) == 74
assert len({item["webAsset"] for item, _ in items}) == 74
assert sum(item["webAsset"] == retired for item, _ in items) == 1
assert blocked.keys() <= {item["webAsset"] for item, _ in items}
rows = []
for item, manifest in sorted(items, key=lambda pair: pair[0]["webAsset"]):
    asset = item["webAsset"]
    state = "Retired / superseded by approved Scott pause" if asset == retired else (
        "Blocked / explicit user decision required" if asset in blocked else
        "Existing private preview / motif verification and web release pending")
    rows.append({"WebAsset": asset, "SourceID": "SRC-0510,SRC-0522",
                 "EvidenceManifest": manifest, "ProjectCopy": item["projectCopy"],
                 "PlanningMapping": "ST-PHOTO-02,ST-PHOTO-06,ST-PHOTO-07" if asset in blocked else
                                    ("ST-PHOTO-02,ST-PHOTO-07" if asset != retired else "ST-PHOTO-02"),
                 "PlanningCoverage": "Duplicate" if asset == retired else "Covered",
                 "ImplementationVerification": state,
                 "Decision": blocked.get(asset, "No per-motif publication approval inferred")})
for asset in sorted(approved):
    rows.append({"WebAsset": asset, "SourceID": "SRC-0522",
                 "EvidenceManifest": "tools/verify-sitewide-photo-reviews.py:19-25",
                 "ProjectCopy": "See existing approved-image record",
                 "PlanningMapping": "ST-PHOTO-01,ST-PHOTO-07",
                 "PlanningCoverage": "Covered", "ImplementationVerification": "Existing / Verify",
                 "Decision": "Earlier approval does not itself prove current live release"})
write("photo-variant-scope.csv", ["WebAsset", "SourceID", "EvidenceManifest", "ProjectCopy",
                                  "PlanningMapping", "PlanningCoverage", "ImplementationVerification",
                                  "Decision"], rows)
print("11 current routes; 73 current private previews; 1 retired; 6 existing approved variants")
