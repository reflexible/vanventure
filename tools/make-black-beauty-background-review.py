"""A comparison-only crop of the existing, unchanged original and v6 review."""

from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "review/selected-originals/scott-genius/DSC_2199.JPG"
GRADE = ROOT / "review/graded-previews/black-beauty-shadow-v6-2026-09-24/black-beauty-tourenpause-editorial.jpg"
OUTPUT = ROOT / "review/graded-previews/black-beauty-shadow-v6-2026-09-24/hintergrund-vergleich-ausschnitt.jpg"
SOURCE_SHA = "b51d8c08c6dbcf3aa2c125907e36d64e7cc8f9ac89b6b531e54da91de2329468"
GRADE_SHA = "ed49e0d7faf440a132b5558a2dd50cdca09bf81c984991eb7edf9f22421a8881"


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    if OUTPUT.exists():
        raise SystemExit("Refusing to overwrite a review image")
    if digest(SOURCE) != SOURCE_SHA or digest(GRADE) != GRADE_SHA:
        raise SystemExit("Input hash does not match the review record")
    with Image.open(SOURCE) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((2200, 2200), Image.LANCZOS)
    with Image.open(GRADE) as opened:
        graded = opened.convert("RGB")
    if original.size != graded.size:
        raise SystemExit("Original and derivative differ in size")
    crop = (900, 300, 2150, 1050)
    panel = Image.new("RGB", (2500, 800), "#f5f3ee")
    draw = ImageDraw.Draw(panel)
    for index, (image, label) in enumerate(((original, "VORHER · WALD UND WIESE"),
                                            (graded, "NACHHER · WALD UND WIESE"))):
        panel.paste(image.crop(crop), (index * 1250, 0))
        draw.text((index * 1250 + 22, 768), label, fill="#213c32")
    panel.save(OUTPUT, quality=94, subsampling=0, optimize=True)
    if digest(SOURCE) != SOURCE_SHA:
        raise SystemExit("Original copy changed")
    print(OUTPUT)


if __name__ == "__main__":
    main()
