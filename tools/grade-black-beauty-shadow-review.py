"""One non-destructive, visibly graded Black Beauty photo for editorial review."""

from hashlib import sha256
from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "review/selected-originals/scott-genius/DSC_2199.JPG"
EXPECTED = "b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468"
OUTPUT = ROOT / "review/graded-previews/black-beauty-shadow-v7-2026-09-24"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    stage_web = "--stage-web" in sys.argv
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Protected project copy has changed")
    if not stage_web and OUTPUT.exists() and any(OUTPUT.iterdir()):
        raise SystemExit("Refusing to overwrite a previous review")
    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((2200, 2200), Image.LANCZOS)
    rgb = np.asarray(original, dtype=np.float32) / 255.0
    height, width = rgb.shape[:2]
    luminance = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    yy, xx = np.ogrid[:height, :width]

    # Recover the backlit bike in place; retain the sky and real black materials.
    xmask = 1.0 - np.clip((xx / width - 0.62) / 0.29, 0, 1)
    ymask = np.clip((yy / height - 0.22) / 0.25, 0, 1)
    subject = xmask * ymask
    # Keep the darkest black anchored; recover only meaningful mid-shadow detail.
    lower_knee = np.clip((luminance - 0.045) / 0.18, 0, 1)
    upper_knee = np.clip((0.58 - luminance) / 0.32, 0, 1)
    lift = 0.16 * subject * lower_knee * upper_knee
    curve = 0.006 + 0.991 * np.power(luminance, 0.985) + lift
    adjusted = np.clip(rgb * (curve / np.maximum(luminance, 0.018))[..., None], 0, 1)

    # Give the existing grass and foliage depth without changing the sky.
    green = (np.clip((adjusted[..., 1] - adjusted[..., 2] - 0.015) * 5.0, 0, 1)
             * np.clip((adjusted[..., 1] - adjusted[..., 0] + 0.22) * 4.0, 0, 1))
    neutral = adjusted @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # The foliage mask is chromatic, not spatial: it reaches the tree line
    # behind the bicycle as well as the right edge, without tinting black gear.
    saturation = 0.99 + 0.35 * green
    adjusted = neutral[..., None] + (adjusted - neutral[..., None]) * saturation[..., None]
    # A small green-only density curve restores separation in the pale meadow.
    density = 0.30 * green * np.clip((0.94 - neutral) / 0.65, 0, 1)
    adjusted -= density[..., None]
    graded = Image.fromarray(np.uint8(np.clip(adjusted * 255 + 0.5, 0, 255)), "RGB")

    if stage_web:
        destination = ROOT / "assets/bikes/scott-tourenpause-2022-editorial-v2.webp"
        if destination.exists():
            raise SystemExit("Refusing to overwrite existing web asset")
        web = graded.resize((1800, 1350), Image.LANCZOS)
        web.save(destination, format="WEBP", quality=88, method=6)
        if digest(SOURCE) != EXPECTED:
            raise SystemExit("Protected project copy changed during web export")
        print(f"Original unverändert: {EXPECTED}")
        print(f"Lokale Webableitung: {digest(destination)}")
        print(destination)
        return

    OUTPUT.mkdir(parents=True)
    grade_path = OUTPUT / "black-beauty-tourenpause-editorial.jpg"
    graded.save(grade_path, quality=94, subsampling=0, optimize=True)
    panel = Image.new("RGB", (2400, 1010), "#f5f3ee")
    draw = ImageDraw.Draw(panel)
    for index, (photo, label) in enumerate(((original, "VORHER · ORIGINAL"),
                                            (graded, "NACHHER · SCHATTEN UND FARBEN"))):
        photo = photo.copy()
        photo.thumbnail((1175, 935), Image.LANCZOS)
        panel.paste(photo, (index * 1200 + (1200 - photo.width) // 2,
                            12 + (935 - photo.height) // 2))
        draw.text((index * 1200 + 24, 970), label, fill="#213c32")
    panel_path = OUTPUT / "black-beauty-vorher-nachher-gross.jpg"
    panel.save(panel_path, quality=94, subsampling=0, optimize=True)
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Protected project copy changed during processing")
    difference = np.abs(np.asarray(graded, dtype=np.int16)
                        - np.asarray(original, dtype=np.int16)).mean()
    print(f"Original unverändert: {EXPECTED}")
    print(f"Vorschau: {digest(grade_path)}")
    print(f"Mittlere RGB-Differenz: {difference:.2f}/255")
    print(panel_path)


if __name__ == "__main__":
    main()
