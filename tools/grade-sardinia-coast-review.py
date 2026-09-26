"""Make one non-overwriting Sardinia coast color candidate from its project copy."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/selected-originals/travel-inline/sardinien-2019/DSC_0291.JPG"
OUTPUT = ROOT / "review/graded-previews/sardinien-kueste-editorial-v1.jpg"
SOURCE_HASH = "0c23389c067cfe53e1fc8d5cd8fb85657c211d500ff2dad18d920e9a2b739594"


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
        if image.size != (5056, 3792):
            raise SystemExit(f"Unexpected original dimensions: {image.size}")
        image = image.resize((1448, 1086), Image.LANCZOS)

    rgb = np.asarray(image, dtype=np.float32) / 255
    lum = np.sum(rgb * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    # The scene is hard Mediterranean midday light. Retain that character,
    # while softening strong water/sky cyan and opening the dark scrub.
    adjusted_lum = np.clip(0.015 + 1.004 * lum + 0.034 * (1 - lum) ** 3
                           - 0.015 * lum ** 4, 0, 1)
    graded = np.clip(rgb * (adjusted_lum / np.maximum(lum, 0.025))[..., None], 0, 1)
    neutral = np.sum(graded * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    blue = np.clip((graded[..., 2] - graded[..., 0] - 0.015) * 2.2, 0, 1)
    green = np.clip((graded[..., 1] - graded[..., 0] + 0.01) * 2.0, 0, 1)
    warm = np.clip((graded[..., 0] - graded[..., 2] - 0.03) * 2.0, 0, 1)
    saturation = 0.985 - 0.095 * blue - 0.085 * green + 0.015 * warm
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
