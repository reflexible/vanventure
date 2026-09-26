"""Two more legible, documentary color-review candidates from protected copies."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "review/graded-previews/visible-comparison-2026-09-24"
MOTIFS = [
    {
        "name": "black-beauty-wald",
        "source": "review/selected-originals/scott-genius/DSC_0888.JPG",
        "hash": "47895f5a13d3965665e6451567cb8848a452808795a60b49dad926ee2d33c40b",
        "profile": "forest",
        "old": "review/graded-previews/sitewide-2026-09-24/bikes--scott-genius-black-beauty-2020-v1-review.jpg",
    },
    {
        "name": "norwegen-fjord-hero",
        "source": "review/selected-originals/hero-reference/norwegen-2018/P7100548.JPG",
        "hash": "eb96075505a1c0e2cc5324932946c38c2828cad4f3fdf348c6ad9c65b8a617d7",
        "profile": "fjord",
        "old": "review/graded-previews/sitewide-2026-09-24/heroes--norwegen-2018-review.jpg",
    },
]


def digest(path):
    hasher = sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def grade(image, profile):
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    y = np.sum(rgb * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    if profile == "forest":
        # Lift the dark bike and matte the forest without pretending there
        # was different weather or removing any photographic detail.
        tone = np.clip(0.018 + 0.957 * np.power(y, 0.91) - 0.016 * y**3, 0, 1)
        green_reduction, blue_reduction, warm_support = 0.12, 0.09, 0.025
    else:
        # Keep the cold Norwegian daylight; tame cyan/blue and cloud glare.
        tone = np.clip(0.014 + 0.975 * np.power(y, 0.96) - 0.022 * y**3, 0, 1)
        green_reduction, blue_reduction, warm_support = 0.055, 0.18, 0.02
    graded = np.clip(rgb * (tone / np.maximum(y, 0.025))[..., None], 0, 1)
    neutral = np.sum(graded * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    green = np.clip((graded[..., 1] - graded[..., 0] + 0.015) * 3.3, 0, 1)
    blue = np.clip((graded[..., 2] - graded[..., 0] - 0.01) * 2.8, 0, 1)
    warm = np.clip((graded[..., 0] - graded[..., 2] - 0.01) * 2.6, 0, 1)
    saturation = np.clip(0.97 - green_reduction * green
                         - blue_reduction * blue + warm_support * warm,
                         0.75, 1.02)
    graded = neutral[..., None] + (graded - neutral[..., None]) * saturation[..., None]
    graded[..., 0] += warm * 0.006
    graded[..., 1] -= green * (0.011 if profile == "forest" else 0.004)
    result = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")
    return result


def panel(images, labels, destination):
    width, height = 960, 760
    sheet = Image.new("RGB", (width * len(images), height), "#f3f0e7")
    draw = ImageDraw.Draw(sheet)
    for index, (image, label) in enumerate(zip(images, labels)):
        thumbnail = image.copy()
        thumbnail.thumbnail((width - 32, height - 54), Image.LANCZOS)
        x = index * width + (width - thumbnail.width) // 2
        y = 12 + (height - 54 - thumbnail.height) // 2
        sheet.paste(thumbnail, (x, y))
        draw.text((index * width + 18, height - 29), label, fill="#173a30")
    sheet.save(destination, format="JPEG", quality=92, subsampling=0, optimize=True)


def main():
    if OUT.exists() and any(OUT.iterdir()):
        raise SystemExit(f"Refusing to overwrite existing review: {OUT}")
    OUT.mkdir(parents=True, exist_ok=True)
    for motif in MOTIFS:
        source = ROOT / motif["source"]
        if digest(source) != motif["hash"]:
            raise SystemExit(f"Original project copy hash mismatch: {source}")
        with Image.open(source) as opened:
            original = ImageOps.exif_transpose(opened).convert("RGB")
            original.thumbnail((1800, 1800), Image.LANCZOS)
        new = grade(original, motif["profile"])
        with Image.open(ROOT / motif["old"]) as opened:
            old = opened.convert("RGB")
            if old.size != original.size:
                old = old.resize(original.size, Image.LANCZOS)
        new_path = OUT / (motif["name"] + "-sichtbarer-v2.jpg")
        comparison = OUT / (motif["name"] + "-vergleich.jpg")
        new.save(new_path, quality=92, subsampling=0, optimize=True)
        panel([original, old, new], ["UNVERÄNDERTE PROJEKTKOPIE", "ERSTE FARBSICHTUNG", "DEUTLICHERE FARBRICHTUNG"], comparison)
        baseline = np.asarray(original, dtype=np.int16)
        old_delta = float(np.abs(np.asarray(old, dtype=np.int16) - baseline).mean())
        new_delta = float(np.abs(np.asarray(new, dtype=np.int16) - baseline).mean())
        if digest(source) != motif["hash"]:
            raise SystemExit(f"Original project copy changed: {source}")
        print(f'{motif["name"]}: old mean RGB diff {old_delta:.2f}/255; new {new_delta:.2f}/255; new SHA-256 {digest(new_path)}')
        print(comparison)


if __name__ == "__main__":
    main()
