"""Private, non-generative natural-light alternative for photo 50 only."""

from hashlib import sha256
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/selected-originals/scott-genius/PA131111.JPG"
OUT = ROOT / "review/graded-previews/photo-50-natural-v3-2026-09-24"
EXPECTED = "77bb598e4988b9d1f85f70d66555ff3c92accc657a79925194282a3ad719fc02"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Unchanged project copy hash differs")
    if OUT.exists():
        raise SystemExit("Refusing to overwrite existing review")
    OUT.mkdir(parents=True)
    with Image.open(SOURCE) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
    rgb = np.asarray(image, dtype=np.float32) / 255
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    # Stay near the camera's cool, overcast color. Only deepen the middle tones
    # and roll off pale highlights; do not change people or image contents.
    dark_mids = np.sin(np.pi * np.clip(luma, 0, 1)) ** 2
    target = luma - 0.045 * dark_mids
    target -= 0.018 * np.clip((luma - 0.62) / 0.38, 0, 1)
    rgb *= (np.clip(target, 0, 1) / np.maximum(luma, 0.02))[..., None]
    # A tiny blue/yellow balance correction only; no local synthetic light.
    rgb[..., 0] *= 1.006
    rgb[..., 2] *= 0.992
    result = Image.fromarray(np.uint8(np.clip(rgb * 255 + 0.5, 0, 255)), "RGB")
    target_path = OUT / "50-natural-v3.jpg"
    result.save(target_path, "JPEG", quality=94, subsampling=0, optimize=True)
    if digest(SOURCE) != EXPECTED:
        raise SystemExit("Project copy changed")
    manifest = {
        "number": 50,
        "webAsset": "assets/bikes/scott-leogang-park-2020-v1.webp",
        "projectCopy": str(SOURCE.relative_to(ROOT)),
        "sourceSha256": EXPECTED,
        "reviewDerivative": str(target_path.relative_to(ROOT)),
        "derivativeSha256": digest(target_path),
        "status": "PRIVATE_REVIEW; user approval pending; not a global rule",
        "operation": "Cool overcast source preserved; restrained midtone contrast/highlight rolloff. No changed content, artificial warmth or face mask.",
    }
    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print("Photo 50 natural V3 created; protected project copy unchanged")


if __name__ == "__main__":
    main()
