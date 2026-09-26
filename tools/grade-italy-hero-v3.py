"""Pixel-faithful, private Tropea depth review from the unchanged project copy."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/selected-originals/hero-reference/italien-2021/P9200258.JPG"
OUTPUT = ROOT / "review/graded-previews/italien-hero-editorial-v4.jpg"
SOURCE_HASH = "a9ce79e7b66a8b4a606b762afceaf10040462ca5cb700798afac079766dd0dff"


def digest(path):
    with path.open("rb") as handle:
        return sha256(handle.read()).hexdigest()


def smoothstep(low, high, values):
    t = np.clip((values - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def main():
    if OUTPUT.exists() or OUTPUT.is_symlink():
        raise SystemExit("Refusing to overwrite review output")
    if OUTPUT.parent.resolve() != (ROOT / "review/graded-previews").resolve():
        raise SystemExit("Review destination is outside the intended project folder")
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Unchanged project copy differs from recorded SHA-256")
    with Image.open(SOURCE) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
    if image.size != (5184, 3888):
        raise SystemExit(f"Unexpected source size: {image.size}")
    image = image.resize((2400, 1800), getattr(getattr(Image, "Resampling", Image), "LANCZOS"))
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

    # Keep the photographed midday light. Better tonal separation comes from
    # real scene detail; white pixels with no recorded detail stay detail-free.
    low_frequency = np.asarray(
        Image.fromarray(np.uint8(luma * 255 + 0.5), "L").filter(ImageFilter.GaussianBlur(20)),
        dtype=np.float32,
    ) / 255.0
    local_detail = np.clip(luma - low_frequency, -0.08, 0.08)
    target = 0.006 + 1.12 * (luma - 0.006)
    target -= 0.12 * smoothstep(0.68, 0.98, luma)
    target += 0.24 * local_detail

    height, width = luma.shape
    yy, xx = np.mgrid[0:height, 0:width].astype(np.float32)
    # Only the pale church on the lower-central promontory receives extra
    # highlight restraint; soft bounds avoid a visible rectangular mask.
    church = (smoothstep(730, 850, xx) * (1 - smoothstep(1870, 2000, xx))
              * smoothstep(660, 760, yy) * (1 - smoothstep(1230, 1350, yy)))
    neutral_stone = 1 - smoothstep(0.06, 0.18, rgb.max(axis=2) - rgb.min(axis=2))
    target -= 0.095 * church * neutral_stone * smoothstep(0.60, 0.86, luma)
    graded = np.clip(rgb * (np.clip(target, 0, 1) / np.maximum(luma, 0.025))[..., None], 0, 1)

    # Revive only actual foliage, without turning sea/sky cyan or inventing
    # warm light. This mask responds to pixel colors, not to a fixed region.
    green = smoothstep(0.005, 0.10, graded[..., 1] - graded[..., 0])
    green *= smoothstep(0.015, 0.12, graded[..., 1] - graded[..., 2])
    green *= smoothstep(0.10, 0.25, graded[..., 1])
    blue = smoothstep(0.03, 0.15, graded[..., 2] - graded[..., 0])
    graded_luma = graded @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    saturation = 1.0 + 0.42 * green - 0.065 * blue
    graded = graded_luma[..., None] + (graded - graded_luma[..., None]) * saturation[..., None]
    graded *= (1 - 0.045 * green)[..., None]
    result = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")
    result.save(OUTPUT, "JPEG", quality=92, subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Project source changed during processing")
    print(f"source={SOURCE_HASH}\nreview={digest(OUTPUT)}\nfile={OUTPUT}")


if __name__ == "__main__":
    main()
