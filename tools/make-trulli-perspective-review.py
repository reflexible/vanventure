"""Create a non-destructive geometric review preview from the preserved copy."""

from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reisebilder-originale/italien-2021/DSC_0063.JPG"
DESTINATION = ROOT / "review/privacy-previews/trulli-perspective-review-v1.jpg"
THUMBNAIL = ROOT / "review/privacy-previews/trulli-perspective-review-v1-small.jpg"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def perspective_coefficients(destination, source):
    rows = []
    values = []
    for (x, y), (u, v) in zip(destination, source):
        rows.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        values.append(u)
        rows.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        values.append(v)
    # Small Gaussian elimination, avoiding an extra image-processing dependency.
    for column in range(8):
        pivot = max(range(column, 8), key=lambda row: abs(rows[row][column]))
        rows[column], rows[pivot] = rows[pivot], rows[column]
        values[column], values[pivot] = values[pivot], values[column]
        scale = rows[column][column]
        rows[column] = [item / scale for item in rows[column]]
        values[column] /= scale
        for row in range(8):
            if row == column:
                continue
            factor = rows[row][column]
            rows[row] = [a - factor * b for a, b in zip(rows[row], rows[column])]
            values[row] -= factor * values[column]
    return tuple(values)


def pixelate(image, box):
    region = image.crop(box)
    resampling = getattr(Image, "Resampling", Image)
    image.paste(
        region.resize((2, 2), resampling.BOX).resize(region.size, resampling.NEAREST),
        box[:2],
    )


def main():
    before = digest(SOURCE)
    with Image.open(SOURCE) as original:
        base = original.convert("RGB")
    width, height = base.size
    if base.size != (5333, 3000):
        raise SystemExit(f"Unexpected source dimensions: {base.size}")
    if DESTINATION.exists():
        raise SystemExit(f"Refusing to overwrite preview: {DESTINATION}")
    if THUMBNAIL.exists():
        raise SystemExit(f"Refusing to overwrite thumbnail: {THUMBNAIL}")

    # Gently widen the upper edge (1.3%) to reduce upward-converging verticals.
    inset = round(width * 0.013)
    corners = ((0, 0), (width, 0), (width, height), (0, height))
    source_quad = ((inset, 0), (width - inset, 0), (width, height), (0, height))
    corrected = base.transform(
        base.size,
        getattr(getattr(Image, "Transform", Image), "PERSPECTIVE"),
        perspective_coefficients(corners, source_quad),
        resample=getattr(getattr(Image, "Resampling", Image), "BICUBIC"),
    )
    # A restrained 0.35-degree clockwise roll trial; trim only the blank edge slivers.
    corrected = corrected.rotate(
        -0.35,
        resample=getattr(getattr(Image, "Resampling", Image), "BICUBIC"),
        expand=False,
    )
    crop = round(min(width, height) * 0.006)
    corrected = corrected.crop((crop, crop, width - crop, height - crop))

    # Retain the already authorized face/plate privacy treatment in this review.
    scale = width / 2048
    display_boxes = (
        (1390, 650, 1435, 690),
        (1496, 626, 1540, 670),
        (1598, 646, 1645, 688),
        (1850, 744, 1922, 774),
    )
    for box in display_boxes:
        pixelate(corrected, tuple(round(value * scale) - crop for value in box))

    DESTINATION.parent.mkdir(parents=True, exist_ok=True)
    corrected.save(DESTINATION, format="JPEG", quality=94, subsampling=0, optimize=True)
    thumb = corrected.copy()
    thumb.thumbnail((1600, 900), getattr(getattr(Image, "Resampling", Image), "LANCZOS"))
    thumb.save(THUMBNAIL, format="JPEG", quality=90, optimize=True)
    after = digest(SOURCE)
    if after != before:
        raise SystemExit("Project source copy changed during preview generation")
    print(f"Preview: {DESTINATION}")
    print(f"Source SHA-256 unchanged before/after: {before}")
    print(f"Preview SHA-256: {digest(DESTINATION)}")
    print(f"Preview thumbnail: {THUMBNAIL}")
    print("Geometry: 1.3% upper-edge perspective correction + 0.35° clockwise roll")


if __name__ == "__main__":
    main()
