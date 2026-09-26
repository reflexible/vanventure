"""Make a non-overwriting, documentary color-review candidate for Tropea.

This photo-specific operation changes only channel values; it retains the
source's 4:3 composition and does not affect public assets.
"""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/selected-originals/hero-reference/italien-2021/P9200258.JPG"
OUTPUT = ROOT / "review/graded-previews/italien-hero-editorial-v1.jpg"
SOURCE_HASH = "a9ce79e7b66a8b4a606b762afceaf10040462ca5cb700798afac079766dd0dff"


def digest(path):
    h = sha256()
    with path.open("rb") as file:
        for part in iter(lambda: file.read(1024 * 1024), b""):
            h.update(part)
    return h.hexdigest()


def main():
    if OUTPUT.exists():
        raise SystemExit("Refusing to overwrite existing review derivative")
    if OUTPUT.resolve().parent != (ROOT / "review/graded-previews").resolve():
        raise SystemExit("Review output escaped project review directory")
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Unchanged project copy differs from documented SHA-256")

    with Image.open(SOURCE) as file:
        image = ImageOps.exif_transpose(file).convert("RGB")
        if image.size != (5184, 3888):
            raise SystemExit(f"Unexpected original dimensions: {image.size}")
        image = image.resize((2400, 1800), Image.LANCZOS)

    rgb = np.asarray(image, dtype=np.float32) / 255
    lum = np.sum(rgb * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    # The hazy daylight and pale stone are intentional: modest black lift,
    # slightly clearer middle tones, and no fabricated warm-hour lighting.
    adjusted_lum = np.clip(0.012 + 1.015 * lum + 0.022 * (1 - lum) ** 3
                           - 0.022 * lum ** 4, 0, 1)
    graded = np.clip(rgb * (adjusted_lum / np.maximum(lum, 0.025))[..., None], 0, 1)
    neutral = np.sum(graded * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    blue = np.clip((graded[..., 2] - graded[..., 0] - 0.015) * 2.2, 0, 1)
    green = np.clip((graded[..., 1] - graded[..., 0] + 0.01) * 2.0, 0, 1)
    warm = np.clip((graded[..., 0] - graded[..., 2] - 0.025) * 2.0, 0, 1)
    saturation = 0.99 - 0.075 * blue - 0.065 * green + 0.012 * warm
    graded = neutral[..., None] + (graded - neutral[..., None]) * saturation[..., None]
    graded[..., 0] += 0.003 * warm
    output = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    output.save(OUTPUT, format="JPEG", quality=91, subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Project original changed during processing")
    print(f"source-sha256={SOURCE_HASH}")
    print(f"candidate-sha256={digest(OUTPUT)}")
    print(f"review-only={OUTPUT}")


if __name__ == "__main__":
    main()
