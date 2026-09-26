"""Make a small local viewing copy of an archive candidate, never editing source."""

from hashlib import sha256
from pathlib import Path
import sys

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = Path(r"E:\_fotos_original")
OUTPUT_DIR = ROOT / "review/candidate-thumbnails"


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: review-image-candidate.py SOURCE_IN_ARCHIVE")
    source = Path(sys.argv[1]).resolve()
    try:
        source.relative_to(ARCHIVE)
    except ValueError:
        raise SystemExit("Source must be in the read-only original archive")
    before = sha256(source.read_bytes()).hexdigest()
    with Image.open(source) as original:
        thumbnail = ImageOps.exif_transpose(original).convert("RGB")
        resampling = getattr(Image, "Resampling", Image)
        thumbnail.thumbnail((1600, 1200), resampling.LANCZOS)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUTPUT_DIR / f"{source.stem}-{before[:12]}.jpg"
    if output.exists():
        raise SystemExit(f"Refusing to overwrite: {output}")
    thumbnail.save(output, quality=88)
    after = sha256(source.read_bytes()).hexdigest()
    if after != before:
        raise SystemExit("Archive source hash changed")
    print(f"Preview: {output}")
    print(f"Archive SHA-256 unchanged: {before}")


if __name__ == "__main__":
    main()
