"""Rebuild the approved Trulli corrections with a small clockwise level change."""

from hashlib import sha256
from pathlib import Path

from PIL import Image

from importlib.util import module_from_spec, spec_from_file_location


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reisebilder-originale/italien-2021/DSC_0063.JPG"
OUTPUT = ROOT / "review/privacy-previews/trulli-editorial-review-v12.jpg"
SMALL = ROOT / "review/privacy-previews/trulli-editorial-review-v12-small.jpg"
SOURCE_HASH = "bc4136d23206a7f66e01ae8971b6b9ef8097ea7206dbbb66a377485ad6b9c9e7"

spec = spec_from_file_location("trulli_v11", ROOT / "tools/make-trulli-editorial-review.py")
previous = module_from_spec(spec)
spec.loader.exec_module(previous)


def digest(path):
    with path.open("rb") as handle:
        return sha256(handle.read()).hexdigest()


def main():
    if OUTPUT.exists() or SMALL.exists() or OUTPUT.is_symlink() or SMALL.is_symlink():
        raise SystemExit("Refusing to overwrite a review file")
    if OUTPUT.parent.resolve() != (ROOT / "review/privacy-previews").resolve():
        raise SystemExit("Review destination escapes the project")
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Unchanged project source differs from recorded SHA-256")
    with Image.open(SOURCE) as original:
        image = original.convert("RGB")
    if image.size != (5333, 3000):
        raise SystemExit(f"Unexpected source size: {image.size}")

    # Only the two previously confirmed overhead wires are repaired.
    previous.remove_wire(image, ((1174, 0), (1260, 44), (1340, 86), (1420, 126),
        (1500, 164), (1580, 200), (1660, 235), (1740, 266), (1820, 294),
        (1900, 317), (1980, 331), (2010, 333), (2024, 333)))
    previous.remove_wire(image, ((1380, 0), (1420, 22), (1500, 67), (1580, 110),
        (1660, 153), (1740, 194), (1820, 233), (1900, 268), (1920, 277),
        (1940, 284), (1960, 291), (1980, 298), (2000, 305), (2010, 307),
        (2023, 310)))
    scale = image.width / 2048.0
    previous.soft_blur(image, (1416 * scale, 674 * scale), (11 * scale, 13 * scale), 6 * scale)
    previous.soft_blur(image, (1612 * scale, 661 * scale), (11 * scale, 16 * scale), 9 * scale)
    previous.soft_blur(image, (1841 * scale, 760 * scale), (29 * scale, 11 * scale), 8 * scale)
    image = previous.editorial_grade(image)
    image = previous.upright_right_side(image)
    image = previous.level_right_rise(image)

    # Pillow uses positive angles counterclockwise. A 0.7-degree clockwise
    # turn lowers the right side; crop only the narrow newly exposed borders.
    bicubic = getattr(getattr(Image, "Resampling", Image), "BICUBIC")
    lanczos = getattr(getattr(Image, "Resampling", Image), "LANCZOS")
    rotated = image.rotate(-0.7, resample=bicubic, expand=True)
    crop_width, crop_height = 5270, 2910
    left = (rotated.width - crop_width) // 2
    top = (rotated.height - crop_height) // 2
    image = rotated.crop((left, top, left + crop_width, top + crop_height))
    image = image.resize((5333, 3000), lanczos)
    image.save(OUTPUT, "JPEG", quality=95, subsampling=0, optimize=True)
    small = image.copy()
    small.thumbnail((1600, 900), lanczos)
    small.save(SMALL, "JPEG", quality=91, optimize=True)
    if digest(SOURCE) != SOURCE_HASH:
        raise SystemExit("Project source changed during processing")
    print(f"source={SOURCE_HASH}\nreview={digest(OUTPUT)}\nfile={OUTPUT}")


if __name__ == "__main__":
    main()
