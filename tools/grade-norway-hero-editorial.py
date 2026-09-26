"""Private, source-checked editorial proof for the Norway fjord hero."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "review/selected-originals/hero-reference/norwegen-2018/P7100548.JPG"
SOURCE_SHA = "eb96075505a1c0e2cc5324932946c38c2828cad4f3fdf348c6ad9c65b8a617d7"
OUTPUT = ROOT / "review/graded-previews/norwegen-fjord-editorial-2026-09-24"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    if digest(SOURCE) != SOURCE_SHA:
        raise SystemExit("Unchanged project source hash mismatch")
    if OUTPUT.exists() and any(OUTPUT.iterdir()):
        raise SystemExit("Refusing to overwrite an existing review")
    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((2200, 2200), Image.LANCZOS)
    rgb = np.asarray(original, dtype=np.float32) / 255
    height, width = rgb.shape[:2]
    y = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    yy = (np.arange(height, dtype=np.float32) / height)[:, None]
    # Gentle print-like tonal separation on land and water. Keep open sky and
    # cloud whites as photographed; no invented highlight detail.
    land = np.clip((yy - 0.18) / 0.28, 0, 1)
    low_mid = np.clip((y - 0.18) / 0.35, 0, 1) * np.clip((0.88 - y) / 0.38, 0, 1)
    tone = np.clip(0.009 + 0.992 * y + 0.025 * (1 - y) ** 3
                   - 0.055 * land * low_mid, 0, 1)
    adjusted = np.clip(rgb * (tone / np.maximum(y, 0.025))[..., None], 0, 1)
    neutral = adjusted @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    blue = np.clip((adjusted[..., 2] - adjusted[..., 0] - 0.03) * 3.6, 0, 1)
    green = (np.clip((adjusted[..., 1] - adjusted[..., 2] - 0.01) * 4.0, 0, 1)
             * np.clip((adjusted[..., 1] - adjusted[..., 0] + 0.14) * 3.0, 0, 1))
    # This source is excessively cyan. Calm those real colors; deepen green
    # on the distant mountain without colouring neutral rocks or skin.
    saturation = 1.01 - 0.19 * blue + 0.13 * green * land
    adjusted = neutral[..., None] + (adjusted - neutral[..., None]) * saturation[..., None]
    adjusted -= (0.025 * green * land * low_mid)[..., None]
    result = Image.fromarray(np.uint8(np.clip(adjusted * 255 + 0.5, 0, 255)), "RGB")
    OUTPUT.mkdir(parents=True)
    grade = OUTPUT / "norwegen-fjord-editorial.jpg"
    result.save(grade, quality=94, subsampling=0, optimize=True)
    panel = Image.new("RGB", (2400, 1010), "#f5f3ee")
    draw = ImageDraw.Draw(panel)
    for index, (photo, label) in enumerate(((original, "VORHER · ORIGINAL"),
                                            (result, "NACHHER · EDITORIAL"))):
        photo = photo.copy()
        photo.thumbnail((1175, 935), Image.LANCZOS)
        panel.paste(photo, (index * 1200 + (1200 - photo.width) // 2,
                            12 + (935 - photo.height) // 2))
        draw.text((index * 1200 + 24, 970), label, fill="#213c32")
    panel.save(OUTPUT / "norwegen-fjord-vorher-nachher.jpg", quality=94,
               subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_SHA:
        raise SystemExit("Original project copy changed")
    print(f"Source unchanged: {SOURCE_SHA}")
    print(f"Proof: {digest(grade)}")
    print(OUTPUT)


if __name__ == "__main__":
    main()
