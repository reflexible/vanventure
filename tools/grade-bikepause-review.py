"""Non-destructive, pixel-only editorial color preview for one documented photo.

The explicit source hash and project-only destination keep this a review step,
not a bulk grade or publication command.
"""

from hashlib import sha256
from os.path import commonpath
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reisebilder-originale/sardinien-2019/DSC_0105_4.JPG"
DESTINATION = ROOT / "review/graded-previews/sardinien-bikepause-editorial-v1.jpg"
EXPECTED_SOURCE_SHA256 = "a280e72eb35a81c5fec5e7e4c4cca3ba06343c29bcaeae5f6957707888357608"


def digest(path):
    with path.open("rb") as stream:
        hasher = sha256()
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            hasher.update(chunk)
        return hasher.hexdigest()


def main():
    review_root = (ROOT / "review").resolve()
    if commonpath([str(DESTINATION.resolve()), str(review_root)]) != str(review_root):
        raise SystemExit("Output escaped private project review directory")
    if DESTINATION.exists():
        raise SystemExit(f"Refusing to overwrite review derivative: {DESTINATION}")
    before = digest(SOURCE)
    if before != EXPECTED_SOURCE_SHA256:
        raise SystemExit("Unchanged project copy does not match recorded source hash")

    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        # Existing published framing is 4:3. Resize changes no scene content.
        source = original.resize((1448, 1086), Image.LANCZOS)

    rgb = np.asarray(source, dtype=np.float32) / 255.0
    luminance = np.sum(rgb * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)

    # Restrained, daylight-preserving tone curve: lift very dark detail and
    # make a gently matte black point without flattening cloud highlights.
    tone = np.clip(0.016 + 0.995 * luminance + 0.043 * (1 - luminance) ** 3
                   - 0.012 * luminance ** 3, 0, 1)
    graded = np.clip(rgb * (tone / np.maximum(luminance, 0.025))[..., None], 0, 1)

    neutral = np.sum(graded * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    green = np.clip((graded[..., 1] - graded[..., 0] + 0.025) * 2.5, 0, 1)
    blue = np.clip((graded[..., 2] - graded[..., 0] - 0.02) * 2.0, 0, 1)
    warm = np.clip((graded[..., 0] - graded[..., 2] - 0.025) * 2.0, 0, 1)

    # Smooth per-pixel chroma changes, tuned to this motif, not a site-wide LUT.
    saturation = np.clip(0.975 - 0.10 * green - 0.10 * blue + 0.025 * warm, 0.82, 1.0)
    graded = neutral[..., None] + (graded - neutral[..., None]) * saturation[..., None]
    graded[..., 0] += warm * 0.006
    graded[..., 2] -= warm * 0.003
    result = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")

    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    result.save(DESTINATION, format="JPEG", quality=91, subsampling=0, optimize=True)
    after = digest(SOURCE)
    if before != after:
        raise SystemExit("Source changed during processing: stop and investigate")
    print(f"Source unchanged SHA-256: {after}")
    print(f"Review derivative SHA-256: {digest(DESTINATION)}")
    print(f"Review derivative: {DESTINATION}")


if __name__ == "__main__":
    main()
