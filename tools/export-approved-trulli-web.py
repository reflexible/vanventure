"""Export the explicitly approved V11 Trulli review as a web-size derivative."""

from hashlib import sha256
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "reisebilder-originale/italien-2021/DSC_0063.JPG"
APPROVED = ROOT / "review/privacy-previews/trulli-editorial-review-v11.jpg"
OUTPUT = ROOT / "assets/reisen/italien-2021/alberobello-trulli-v11.jpg"
SOURCE_SHA256 = "bc4136d23206a7f66e01ae8971b6b9ef8097ea7206dbbb66a377485ad6b9c9e7"
APPROVED_SHA256 = "3c30824d9117a5803e10ff56bf8709c882ec02b22cad7e19b513155b1b7372f0"


def digest(path):
    with path.open("rb") as handle:
        return sha256(handle.read()).hexdigest()


def main():
    if digest(SOURCE) != SOURCE_SHA256 or digest(APPROVED) != APPROVED_SHA256:
        raise SystemExit("Source or approved review hash differs; refusing export")
    if OUTPUT.exists() or OUTPUT.is_symlink():
        raise SystemExit("Refusing to overwrite an existing public image")
    try:
        OUTPUT.parent.resolve().relative_to(ROOT.resolve())
    except ValueError:
        raise SystemExit("Public image destination escapes the project")
    with Image.open(APPROVED) as full:
        web = full.convert("RGB")
    if web.size != (5333, 3000):
        raise SystemExit(f"Unexpected review dimensions: {web.size}")
    web.thumbnail((2560, 1440), getattr(getattr(Image, "Resampling", Image), "LANCZOS"))
    web.save(OUTPUT, "JPEG", quality=91, subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_SHA256 or digest(APPROVED) != APPROVED_SHA256:
        raise SystemExit("Source or approved review changed during export")
    print(f"Approved review SHA-256: {APPROVED_SHA256}")
    print(f"Unchanged project copy SHA-256: {SOURCE_SHA256}")
    print(f"Web derivative: {OUTPUT} ({web.width}x{web.height})")
    print(f"Web derivative SHA-256: {digest(OUTPUT)}")


if __name__ == "__main__":
    main()
