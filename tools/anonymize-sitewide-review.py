"""Tightly blurred face masks on two private first-pass review derivatives."""

from hashlib import sha256
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
FOLDER = ROOT / "review/graded-previews/sitewide-round2-2026-09-24"
MANIFEST = FOLDER / "manifest.json"
MASKS = {
    "assets/reisen/italien-2021/gallery/dsc-1719.jpg": [
        (1500, 473, 1585, 579),  # adult face only, not hair or clothing
        (1568, 564, 1680, 692),  # child face only
    ],
    "assets/reisen/norwegen-2018/sabine-julie-bergsee-natur.png": [
        (1310, 519, 1400, 620),  # face and glasses, not scarf or backpack
    ],
}


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    second_pass = "--second-pass" in __import__("sys").argv
    child_only = "--child-only" in __import__("sys").argv
    folder = ROOT / "review/graded-previews/sitewide-second-pass-round2-2026-09-24" if second_pass else FOLDER
    records = {entry["webAsset"]: entry for entry in json.loads((folder / "manifest.json").read_text(encoding="utf-8"))}
    for asset, ellipses in MASKS.items():
        if child_only:
            if asset != "assets/reisen/italien-2021/gallery/dsc-1719.jpg":
                continue
            ellipses = [ellipses[1]]
        record = records[asset]
        source = ROOT / record["projectCopy"]
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Protected project copy changed: {source}")
        unmasked = ROOT / record["reviewDerivative"]
        if digest(unmasked) != record["derivativeSha256"]:
            raise SystemExit(f"First-pass derivative changed: {unmasked}")
        destination = folder / (unmasked.stem + ("-child-only-v3.jpg" if child_only else "-faces-anonymized-v2.jpg"))
        if destination.exists():
            raise SystemExit(f"Refusing to overwrite: {destination}")
        with Image.open(unmasked) as opened:
            image = opened.convert("RGB")
        if image.size != (1800, 1350):
            raise SystemExit(f"Unexpected image dimensions: {asset} {image.size}")
        mask = Image.new("L", image.size, 0)
        draw = ImageDraw.Draw(mask)
        for ellipse in ellipses:
            draw.ellipse(ellipse, fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(5))
        blurred = image.filter(ImageFilter.GaussianBlur(21))
        result = Image.composite(blurred, image, mask)
        outside = Image.new("L", image.size, 255)
        draw_outside = ImageDraw.Draw(outside)
        for ellipse in ellipses:
            x0, y0, x1, y1 = ellipse
            draw_outside.ellipse((x0 - 18, y0 - 18, x1 + 18, y1 + 18), fill=0)
        if ImageChops.multiply(ImageChops.difference(result, image).convert("L"), outside).getbbox():
            raise SystemExit("Pixels outside protected face masks changed")
        result.save(destination, format="JPEG", quality=93, subsampling=0, optimize=True)
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Protected project copy changed during processing: {source}")
        print(f"{asset}: {destination} SHA-256 {digest(destination)}")


if __name__ == "__main__":
    main()
