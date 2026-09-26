"""Create a review-only plate-anonymized derivative of the selected van photo.

The source in review/selected-originals is read-only to this script. This does
not remove background objects or make a publication approval claim.
"""

from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/selected-originals/vehicle/20250611_174618.jpg"
DESTINATION = ROOT / "review/vehicle-previews/20250611_174618-plates-review.png"
THUMBNAIL = ROOT / "review/vehicle-previews/20250611_174618-plates-review-small.jpg"
EXPECTED_SOURCE_SHA256 = "bc054d2b26fd9781ab0088fa26d436e485fdcbb0014563c3a2c5435a90338692"
EXISTING_REVIEW_SHA256 = "45ac03c6083368dc72319a2542a747b1e9de36c51e9bf9783c226c1db4d9129f"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def pixelate(image: Image.Image, box: tuple[int, int, int, int]) -> None:
    x0, y0, x1, y1 = box
    region = image.crop(box)
    small = region.resize((max(1, (x1 - x0) // 28), max(1, (y1 - y0) // 28)))
    image.paste(small.resize(region.size, Image.Resampling.NEAREST), (x0, y0))


def main() -> None:
    before = digest(SOURCE)
    if before != EXPECTED_SOURCE_SHA256:
        raise SystemExit(f"Source hash changed: {before}")
    with Image.open(SOURCE) as original:
        baseline = original.convert("RGB")
    image = baseline.copy()
    if image.size != (4000, 1848):
        raise SystemExit(f"Unexpected source size: {image.size}")

    # Van and background vehicle plates only; no other pixels are modified.
    boxes = (
        (2135, 1405, 2365, 1500),  # Van
        (68, 1148, 310, 1215),  # Car on the left
        (3425, 1090, 3585, 1158),  # Car behind the tree
        (3650, 1160, 3890, 1225),  # Caravan on the right
    )
    for box in boxes:
        pixelate(image, box)

    outside = Image.new("L", image.size, 255)
    marker = ImageDraw.Draw(outside)
    for box in boxes:
        marker.rectangle(box, fill=0)
    if ImageChops.difference(image, baseline).convert("L").getbbox() is None:
        raise SystemExit("No pixels were changed")
    if ImageChops.multiply(ImageChops.difference(image, baseline).convert("L"), outside).getbbox():
        raise SystemExit("Pixels outside plate boxes changed")

    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    if DESTINATION.exists():
        if digest(DESTINATION) != EXISTING_REVIEW_SHA256:
            raise SystemExit("Existing review file differs")
    else:
        image.save(DESTINATION, format="PNG", optimize=True)
    if not THUMBNAIL.exists():
        image.resize((2000, 924), Image.Resampling.LANCZOS).save(THUMBNAIL, quality=90)
    after = digest(SOURCE)
    if after != before:
        raise SystemExit("Source hash changed during processing")
    print(f"Review: {DESTINATION}")
    print(f"Unchanged source SHA-256 before/after: {before}")
    print(f"Review SHA-256: {digest(DESTINATION)}")
    print("Pixel comparison: no changes outside the four plate boxes")
    print(f"Small preview: {THUMBNAIL}")


if __name__ == "__main__":
    main()
