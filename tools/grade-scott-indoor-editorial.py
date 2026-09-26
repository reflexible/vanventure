"""Private source-checked indoor bike photo proof: neutral wall, detailed bike."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "review/selected-originals/scott-genius/DSC_0055_1.JPG"
SOURCE_SHA = "abf545d7893d46e268258b9ddd69031354a11a5e6704022dde7d36fff2f18bc0"
OUTPUT = ROOT / "review/graded-previews/scott-indoor-editorial-v2-2026-09-24"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    if digest(SOURCE) != SOURCE_SHA:
        raise SystemExit("Unchanged project source hash mismatch")
    if OUTPUT.exists() and any(OUTPUT.iterdir()):
        raise SystemExit("Refusing to overwrite existing review")
    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((1800, 1800), Image.LANCZOS)
    rgb = np.asarray(original, dtype=np.float32) / 255
    # Correct tungsten cast while retaining the real warm room ambience.
    balanced = np.clip(rgb * np.array([0.965, 1.008, 1.18], dtype=np.float32), 0, 1)
    y = balanced @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    low = np.clip((y - 0.055) / 0.22, 0, 1)
    high = np.clip((0.62 - y) / 0.31, 0, 1)
    lift = 0.19 * low * high
    tone = np.clip(0.004 + 0.988 * y + lift, 0, 1)
    adjusted = np.clip(balanced * (tone / np.maximum(y, 0.02))[..., None], 0, 1)
    # Keep neutral walls from becoming yellow-orange and real black gear black.
    neutral = adjusted @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    warm = np.clip((adjusted[..., 0] - adjusted[..., 2] - 0.035) * 3.0, 0, 1)
    saturation = 0.98 - 0.19 * warm
    adjusted = neutral[..., None] + (adjusted - neutral[..., None]) * saturation[..., None]
    result = Image.fromarray(np.uint8(np.clip(adjusted * 255 + 0.5, 0, 255)), "RGB")
    OUTPUT.mkdir(parents=True)
    grade = OUTPUT / "scott-anfang-2018-editorial.jpg"
    result.save(grade, quality=94, subsampling=0, optimize=True)
    panel = Image.new("RGB", (2400, 900), "#f5f3ee")
    draw = ImageDraw.Draw(panel)
    for index, (photo, label) in enumerate(((original, "VORHER · ORIGINAL"),
                                            (result, "NACHHER · INNENRAUM"))):
        photo = photo.copy()
        photo.thumbnail((1170, 825), Image.LANCZOS)
        panel.paste(photo, (index * 1200 + (1200 - photo.width) // 2,
                            12 + (825 - photo.height) // 2))
        draw.text((index * 1200 + 24, 865), label, fill="#213c32")
    panel.save(OUTPUT / "scott-anfang-vorher-nachher.jpg", quality=94,
               subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_SHA:
        raise SystemExit("Original project copy changed")
    print(f"Source unchanged: {SOURCE_SHA}")
    print(f"Proof: {digest(grade)}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
