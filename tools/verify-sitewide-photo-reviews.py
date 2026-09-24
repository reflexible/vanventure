"""Read-only integrity and coverage check for the local website photo review."""

from hashlib import sha256
import json
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
FOLDERS = [
    ROOT / "review/graded-previews/sitewide-2026-09-24",
    ROOT / "review/graded-previews/sitewide-round2-2026-09-24",
    ROOT / "review/graded-previews/sitewide-round3-2026-09-24",
]
if "--second-pass" in sys.argv:
    FOLDERS = [ROOT / f"review/graded-previews/sitewide-second-pass-round{number}-2026-09-24"
               for number in (1, 2, 3)]
APPROVED = {
    "assets/bikes/sardinien-bikepause-editorial-v2.jpg",
    "assets/heroes/italien-2021-tropea-editorial-v2.jpg",
    "assets/reisen/italien-2021/alberobello-trulli-v11.jpg",
    "assets/reisen/sardinien-2019/bikepause-im-gruenen-editorial-v2.jpg",
    "assets/reisen/sardinien-2019/sardinien-kueste-editorial-v2.jpg",
    "assets/bikes/scott-tourenpause-2022-editorial-v2.webp",
}
PAGES = [
    "index.html", "vehicle.html", "kajak.html", "norwegen-2018.html",
    "sardinien-2019.html", "italien-2021.html", "ausruestung.html",
    "bike.html", "scott-mountainbike.html", "cube.html",
    "trek-gravelbike.html", "diamant-stadtraeder.html", "woom-2.html",
    "styles.css", "hero-shared.css", "vehicle-profile.css",
]
IMAGE_RE = re.compile(r"assets/[A-Za-z0-9_./-]+\.(?:jpe?g|png|webp)", re.I)


def digest(path):
    hasher = sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def main():
    referenced = set()
    for name in PAGES:
        path = ROOT / name
        referenced.update(IMAGE_RE.findall(path.read_text(encoding="utf-8")))
    photo_assets = {path for path in referenced if not path.startswith("assets/vehicle/")
                    and "vanventure-logo" not in path}
    reviewed = {}
    for folder in FOLDERS:
        for entry in json.loads((folder / "manifest.json").read_text(encoding="utf-8")):
            asset = entry["webAsset"]
            if asset in reviewed:
                raise SystemExit(f"Duplicate preview asset: {asset}")
            source = ROOT / entry["projectCopy"]
            derivative = ROOT / entry["reviewDerivative"]
            if digest(source) != entry["sourceSha256"]:
                raise SystemExit(f"Changed project copy: {asset}")
            if digest(derivative) != entry["derivativeSha256"]:
                raise SystemExit(f"Changed preview derivative: {asset}")
            reviewed[asset] = entry
    if set(reviewed) & APPROVED:
        raise SystemExit("Already approved asset was unnecessarily reprocessed")
    retired = {"assets/bikes/scott-tourenpause-2022-v1.webp"}
    if set(reviewed) - retired | APPROVED != photo_assets:
        missing = sorted(photo_assets - set(reviewed) - APPROVED)
        unexpected = sorted((set(reviewed) - retired | APPROVED) - photo_assets)
        raise SystemExit(f"Coverage mismatch; missing={missing}, unexpected={unexpected}")
    print(f"{len(photo_assets)} non-vehicle photo variants: {len(reviewed) - len(retired)} current private previews + "
          f"{len(APPROVED)} preserved approvals; all source and derivative hashes match")
    print("This is integrity/coverage only, not visual or privacy approval.")


if __name__ == "__main__":
    main()
