"""Create a private, review-only pixelation preview from the project original.

Only the three face rectangles and the visible car plate may change. The
unchanged source copy is hash-checked before and after. This is not a web
export or publication approval.
"""

from __future__ import annotations

from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reisebilder-originale/italien-2021/DSC_0063.JPG"
DESTINATION = ROOT / "review/privacy-previews/alberobello-trulli-privacy-review-v2.png"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def pixelate(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    region = image.crop(box)
    resampling = getattr(Image, "Resampling", Image)
    reduced = region.resize((2, 2), resampling.BOX)
    image.paste(reduced.resize(region.size, Image.NEAREST), box[:2])


def main() -> None:
    before = digest(SOURCE)
    with Image.open(SOURCE) as original:
        baseline = original.convert("RGB")
    if baseline.size != (5333, 3000):
        raise SystemExit(f"Unexpected source dimensions: {baseline.size}")

    # Boxes cover the three small faces and the readable car plate. Coordinates
    # are based on the 2048x1152 review display, scaled to the source dimensions.
    scale = baseline.width / 2048
    display_boxes = (
        (1390, 650, 1435, 690),
        (1496, 626, 1540, 670),
        (1598, 646, 1645, 688),
        (1850, 744, 1922, 774),
    )
    boxes = tuple(tuple(round(value * scale) for value in box) for box in display_boxes)
    image = baseline.copy()
    for box in boxes:
        pixelate(image, box)

    outside = Image.new("L", image.size, 255)
    marker = ImageDraw.Draw(outside)
    for box in boxes:
        marker.rectangle(box, fill=0)
    diff = ImageChops.difference(image, baseline).convert("L")
    if diff.getbbox() is None:
        raise SystemExit("No privacy pixels changed")
    if ImageChops.multiply(diff, outside).getbbox():
        raise SystemExit("Pixels outside the approved privacy masks changed")

    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    if DESTINATION.exists():
        raise SystemExit(f"Refusing to overwrite existing preview: {DESTINATION}")
    image.save(DESTINATION, format="PNG", optimize=True)
    after = digest(SOURCE)
    if after != before:
        raise SystemExit("Source project copy changed during preview generation")
    print(f"Preview: {DESTINATION}")
    print(f"Source SHA-256 unchanged before/after: {before}")
    print(f"Preview SHA-256: {digest(DESTINATION)}")
    print(f"Pixel-diff scope verified: exactly {len(boxes)} privacy rectangles")


if __name__ == "__main__":
    main()
