"""Build a private, non-publishing Trulli review derivative from the project copy."""

from hashlib import sha256
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "reisebilder-originale/italien-2021/DSC_0063.JPG"
OUTPUT = ROOT / "review/privacy-previews/trulli-editorial-review-v11.jpg"
DETAIL = ROOT / "review/privacy-previews/trulli-editorial-review-v11-detail.jpg"
PLATE_DETAIL = ROOT / "review/privacy-previews/trulli-editorial-review-v11-plate.jpg"
THUMB = ROOT / "review/privacy-previews/trulli-editorial-review-v11-small.jpg"


def digest(path: Path) -> str:
    return sha256(path.read_bytes()).hexdigest()


def remove_wire(image, path):
    """Locally interpolate across a confirmed thin wire, preserving its surroundings."""
    width, height = image.size
    scale = width / 2048.0
    points = [(x * scale, y * scale) for x, y in path]
    left = max(0, int(min(x for x, _ in points)) - round(12 * scale))
    right = min(width, int(max(x for x, _ in points)) + round(12 * scale))
    top = max(0, int(min(y for _, y in points)) - round(12 * scale))
    bottom = min(height, int(max(y for _, y in points)) + round(12 * scale))
    yy, xx = np.mgrid[top:bottom, left:right].astype(np.float32)
    distance = np.full(xx.shape, np.inf, dtype=np.float32)
    normal_x = np.zeros(xx.shape, dtype=np.float32)
    normal_y = np.zeros(xx.shape, dtype=np.float32)
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        dx, dy = x1 - x0, y1 - y0
        length2 = dx * dx + dy * dy
        length = length2**0.5
        projection = np.clip(((xx - x0) * dx + (yy - y0) * dy) / length2, 0, 1)
        nearest_x, nearest_y = x0 + projection * dx, y0 + projection * dy
        candidate = np.sqrt((xx - nearest_x) ** 2 + (yy - nearest_y) ** 2)
        choose = candidate < distance
        distance = np.minimum(distance, candidate)
        normal_x[choose] = -dy / length
        normal_y[choose] = dx / length
    radius = 5.0 * scale
    active = distance < radius
    if not active.any():
        return

    source = np.asarray(image, dtype=np.float32)
    # Sample on both sides of the wire, beyond its antialiasing halo. Their
    # average follows broad sky/cloud tone without inventing scene structure.
    pieces = []
    for offset in (6.0 * scale, 7.5 * scale, 9.5 * scale):
        for sign in (-1.0, 1.0):
            sx = np.clip(np.rint(xx + normal_x * offset * sign).astype(int), 0, width - 1)
            sy = np.clip(np.rint(yy + normal_y * offset * sign).astype(int), 0, height - 1)
            pieces.append(source[sy, sx])
    repaired = np.mean(pieces, axis=0)
    region = source[top:bottom, left:right]
    region[active] = repaired[active]
    # Solve a small Laplace fill only inside the thin wire mask. The surrounding
    # original sky/cloud pixels form the boundary, avoiding a long tonal seam.
    ys, xs = np.nonzero(active)
    above = np.maximum(ys - 1, 0)
    below = np.minimum(ys + 1, region.shape[0] - 1)
    left_neighbour = np.maximum(xs - 1, 0)
    right_neighbour = np.minimum(xs + 1, region.shape[1] - 1)
    for _ in range(180):
        region[ys, xs] = (
            region[above, xs]
            + region[below, xs]
            + region[ys, left_neighbour]
            + region[ys, right_neighbour]
        ) * 0.25
    source[top:bottom, left:right] = region
    image.paste(Image.fromarray(np.uint8(np.clip(source, 0, 255))))


def upright_right_side(image):
    """Reduce backward lean on the right while keeping all four edges fixed."""
    pixels = np.asarray(image, dtype=np.uint8)
    height, width = pixels.shape[:2]
    result = np.empty_like(pixels)
    x = np.arange(width, dtype=np.float32)
    position = x / (width - 1)
    profile = position**8 * (1 - position)
    profile /= profile.max()
    amplitude = 90.0 * (width / 2048.0)
    for y in range(height):
        shift = amplitude * (y / (height - 1) - 0.5) * profile
        sample = np.clip(x + shift, 0, width - 1)
        x0 = np.floor(sample).astype(np.int32)
        x1 = np.minimum(x0 + 1, width - 1)
        fraction = (sample - x0)[:, None]
        result[y] = np.uint8(
            np.clip(pixels[y, x0] * (1 - fraction) + pixels[y, x1] * fraction, 0, 255)
        )
    return Image.fromarray(result, "RGB")


def level_right_rise(image):
    """Lower the rising right side while preserving every source-image edge."""
    pixels = np.asarray(image, dtype=np.uint8)
    height, width = pixels.shape[:2]
    result = np.empty_like(pixels)
    x = np.arange(width, dtype=np.int32)
    right_profile = (x / (width - 1)) ** 1.7
    maximum_shift = 105.0 * (width / 2048.0)
    taper = 250.0 * (width / 2048.0)
    for y in range(height):
        edge_distance = min(y, height - 1 - y)
        progress = min(1.0, edge_distance / taper)
        window = progress * progress * (3.0 - 2.0 * progress)
        source_y = np.clip(y - maximum_shift * right_profile * window, 0, height - 1)
        y0 = np.floor(source_y).astype(np.int32)
        y1 = np.minimum(y0 + 1, height - 1)
        fraction = (source_y - y0)[:, None]
        result[y] = np.uint8(
            np.clip(pixels[y0, x] * (1 - fraction) + pixels[y1, x] * fraction, 0, 255)
        )
    return Image.fromarray(result, "RGB")


def soft_blur(image, center, half_size, radius):
    """Blur only the identifying feature, with a softly feathered mask edge."""
    cx, cy = center
    hx, hy = half_size
    left, top = round(cx - hx), round(cy - hy)
    right, bottom = round(cx + hx), round(cy + hy)
    region = image.crop((left, top, right, bottom))
    blurred = region.filter(ImageFilter.GaussianBlur(radius=radius))
    mask = Image.new("L", region.size, 0)
    draw = ImageDraw.Draw(mask)
    margin = max(2, round(min(hx, hy) * 0.12))
    draw.ellipse((margin, margin, region.width - margin - 1, region.height - margin - 1), fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(2, round(min(hx, hy) * 0.10))))
    image.paste(blurred, (left, top), mask)


def editorial_grade(image):
    rgb = np.asarray(image, dtype=np.float32)
    # Daylight editorial grade: warm-neutral whites, clearly recovered shadow
    # detail, modest filmic contrast, plausible sky and natural skin texture.
    rgb[..., 0] *= 1.025
    rgb[..., 1] *= 1.008
    rgb[..., 2] *= 0.982
    luma = rgb[..., 0] * 0.2126 + rgb[..., 1] * 0.7152 + rgb[..., 2] * 0.0722
    # Lift shadows and midtones more than white clouds so highlight texture
    # remains legible after the visibly brighter grade.
    exposure = 1.0 + 0.13 * np.power(1.0 - np.clip(luma / 255.0, 0, 1), 1.3)
    rgb = np.clip(rgb * exposure[..., None] + 1.5, 0, 255)
    luma = rgb[..., 0] * 0.2126 + rgb[..., 1] * 0.7152 + rgb[..., 2] * 0.0722
    blue_dominance = np.clip((rgb[..., 2] - rgb[..., 0] - 12) / 60, 0, 1)
    saturation = 0.99 - 0.07 * blue_dominance
    rgb = luma[..., None] + (rgb - luma[..., None]) * saturation[..., None]
    rgb = (rgb - 127.5) * 1.045 + 129.0
    rgb += 4.5 * np.square(1.0 - np.clip(luma / 255.0, 0, 1))[..., None]
    rgb = np.clip(rgb, 3, 255)
    return Image.fromarray(np.uint8(rgb), "RGB")


def main():
    before = digest(SOURCE)
    if any(path.exists() for path in (OUTPUT, DETAIL, PLATE_DETAIL, THUMB)):
        raise SystemExit("Refusing to overwrite an existing review output")
    with Image.open(SOURCE) as original:
        source = original.convert("RGB")
    width, height = source.size
    if source.size != (5333, 3000):
        raise SystemExit(f"Unexpected source dimensions: {source.size}")

    # Remove the two confirmed lines in original-copy coordinates so the repair
    # follows the photographed paths right up to, but not over, the mast.
    remove_wire(source, ((1174, 0), (1260, 44), (1340, 86), (1420, 126), (1500, 164), (1580, 200), (1660, 235), (1740, 266), (1820, 294), (1900, 317), (1980, 331), (2010, 333), (2024, 333)))
    remove_wire(source, ((1380, 0), (1420, 22), (1500, 67), (1580, 110), (1660, 153), (1740, 194), (1820, 233), (1900, 268), (1920, 277), (1940, 284), (1960, 291), (1980, 298), (2000, 305), (2010, 307), (2023, 310)))

    # Place privacy masks on the original coordinate system; the subsequent
    # geometry correction carries each mask with its feature exactly.
    scale = width / 2048.0
    privacy = source.copy()
    soft_blur(privacy, (1416 * scale, 674 * scale), (11 * scale, 13 * scale), 6 * scale)
    soft_blur(privacy, (1612 * scale, 661 * scale), (11 * scale, 16 * scale), 9 * scale)
    soft_blur(privacy, (1841 * scale, 760 * scale), (29 * scale, 11 * scale), 8 * scale)
    privacy = editorial_grade(privacy)
    privacy = upright_right_side(privacy)
    privacy = level_right_rise(privacy)
    privacy.save(OUTPUT, "JPEG", quality=95, subsampling=0, optimize=True)
    small = privacy.copy()
    small.thumbnail((1600, 900), getattr(getattr(Image, "Resampling", Image), "LANCZOS"))
    small.save(THUMB, "JPEG", quality=91, optimize=True)

    # A full-resolution crop lets the user inspect privacy-mask softness and fit.
    factor = width / 2048.0
    detail = privacy.crop((round(1340 * factor), round(690 * factor), round(1665 * factor), round(795 * factor)))
    detail.thumbnail((1500, 500), getattr(getattr(Image, "Resampling", Image), "LANCZOS"))
    detail.save(DETAIL, "JPEG", quality=93, optimize=True)
    plate = privacy.crop((round(1805 * factor), round(815 * factor), round(1910 * factor), round(880 * factor)))
    plate.save(PLATE_DETAIL, "JPEG", quality=95, optimize=True)

    after = digest(SOURCE)
    if after != before:
        raise SystemExit("The unchanged project source copy changed during processing")
    print(f"Source SHA-256 unchanged before/after: {before}")
    print(f"Review derivative SHA-256: {digest(OUTPUT)}")
    print(f"Review derivative: {OUTPUT}")
    print(f"Detail crop: {DETAIL}")
    print(f"Plate crop: {PLATE_DETAIL}")
    print("Edits: edge-preserving right-side upright and rise correction; two confirmed wires repaired to mast; two faces and plate softly blurred; natural outdoor editorial grade")


if __name__ == "__main__":
    main()
