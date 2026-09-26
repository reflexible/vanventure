"""Visible, natural Black Beauty hero grade, sourced from checked project copy."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageOps, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "review/selected-originals/scott-genius/DSC_0888.JPG"
EXPECTED = "47895f5a13d3965665e6451567cb8848a452808795a60b49dad926ee2d33c40b"
OUTPUT = ROOT / "review/graded-previews/visible-black-beauty-2026-09-24"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def preview_panel(images, labels, path, crop=None):
    width, height = (900, 760) if crop is None else (900, 700)
    panel = Image.new("RGB", (width * 2, height), "#f3f0e7")
    draw = ImageDraw.Draw(panel)
    for index, (image, label) in enumerate(zip(images, labels)):
        if crop:
            image = image.crop(crop)
        image = image.copy()
        image.thumbnail((width - 30, height - 55), Image.LANCZOS)
        panel.paste(image, (index * width + (width - image.width) // 2,
                            10 + (height - 55 - image.height) // 2))
        draw.text((index * width + 18, height - 28), label, fill="#173a30")
    panel.save(path, quality=93, subsampling=0, optimize=True)


def main():
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Protected project copy hash differs")
    if OUTPUT.exists() and any(OUTPUT.iterdir()):
        raise SystemExit("Refusing to overwrite review")
    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((1800, 1800), Image.LANCZOS)
    rgb = np.asarray(original, dtype=np.float32) / 255
    h, w = rgb.shape[:2]
    y = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    yy, xx = np.ogrid[:h, :w]
    # Broad feathered dodge centered on the real bike; it works only in
    # shadows, so neither sky nor scene contents are replaced or relit.
    subject = np.exp(-(((xx - 830) / 760) ** 4 + ((yy - 675) / 500) ** 4))
    shadows = subject * np.clip((0.62 - y) / 0.62, 0, 1) ** 1.25
    luminance = np.clip(0.016 + 0.985 * np.power(y, 0.98)
                        - 0.027 * y**3 + 0.085 * shadows, 0, 1)
    graded = np.clip(rgb * (luminance / np.maximum(y, 0.02))[..., None], 0, 1)
    neutral = graded @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    green = np.clip((graded[..., 1] - graded[..., 0] + 0.005) * 3.8, 0, 1)
    blue = np.clip((graded[..., 2] - graded[..., 0] - 0.015) * 3.0, 0, 1)
    warm = np.clip((graded[..., 0] - graded[..., 2] - 0.015) * 3.0, 0, 1)
    sat = np.clip(0.97 - 0.16 * green - 0.10 * blue + 0.025 * warm, 0.78, 1)
    graded = neutral[..., None] + (graded - neutral[..., None]) * sat[..., None]
    graded[..., 1] -= green * 0.022
    graded[..., 0] += warm * 0.008
    result = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")
    result = result.filter(ImageFilter.UnsharpMask(radius=1.0, percent=35, threshold=3))
    OUTPUT.mkdir(parents=True)
    result_path = OUTPUT / "black-beauty-wald-editorial-v3.jpg"
    result.save(result_path, quality=93, subsampling=0, optimize=True)
    preview_panel([original, result], ["UNVERÄNDERTE PROJEKTKOPIE", "NEUE EDITORIALE FARBPROBE"],
                  OUTPUT / "black-beauty-ganzes-bild-vergleich.jpg")
    preview_panel([original, result], ["ORIGINAL · RADDETAIL", "FARBPROBE · RADDETAIL"],
                  OUTPUT / "black-beauty-detail-vergleich.jpg", crop=(150, 260, 1480, 1110))
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Protected project copy changed")
    delta = float(np.abs(np.asarray(result, dtype=np.int16)
                         - np.asarray(original, dtype=np.int16)).mean())
    print(f"Source unchanged SHA-256 {EXPECTED}")
    print(f"Derivative SHA-256 {digest(result_path)}")
    print(f"Mean RGB difference {delta:.2f}/255; local shadow and color changes only")
    print(OUTPUT)


if __name__ == "__main__":
    main()
