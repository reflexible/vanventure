from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageOps
import subprocess

ROOT = Path(r"D:\work\_venventure")
SOURCE = ROOT / "review" / "selected-originals" / "kajak"
DESTINATION = ROOT / "assets" / "riverstar" / "gallery"
HEIF_CONVERTER = Path(r"C:\Users\helmu\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\libheif\libheif\bin\heif-convert.exe")
REDACTIONS = {
    # All visible vehicle license plates in the camping image. Coordinates refer
    # to its 1920 × 1080 web derivative; rectangles intentionally exceed plates.
    "kajak-11.jpg": [
        (455, 255, 565, 315), (1025, 248, 1110, 302), (1125, 252, 1208, 310),
        (1190, 262, 1260, 315), (1260, 266, 1335, 315), (1325, 268, 1405, 320),
    ],
}


def jpeg_from(source: Path, output: Path) -> None:
    if source.suffix.lower() == ".heic":
        subprocess.run([str(HEIF_CONVERTER), "-q", "90", str(source), str(output)], check=True)
        return
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        image.thumbnail((1920, 1920), Image.LANCZOS)
        image.save(output, quality=88, optimize=True, progressive=True)


def anonymize_license_plates(output: Path) -> None:
    rectangles = REDACTIONS.get(output.name, [])
    if not rectangles:
        return
    with Image.open(output) as original:
        image = original.convert("RGB")
        for rectangle in rectangles:
            crop = image.crop(rectangle)
            blur = crop.filter(ImageFilter.GaussianBlur(max(crop.size) // 5))
            image.paste(blur, rectangle)
        image.save(output, quality=88, optimize=True, progressive=True)


def main() -> None:
    DESTINATION.mkdir(parents=True, exist_ok=True)
    candidates = [
        SOURCE / "p7020146.jpg",
        SOURCE / "dsc-1546.jpg",
        SOURCE / "img-4714.heic",
        *sorted((SOURCE / "photos-1-001").glob("*")),
    ]
    sources = [source for source in candidates if source.suffix.lower() in {".jpg", ".jpeg", ".heic"}]
    for old_output in DESTINATION.glob("kajak-*.jpg"):
        old_output.unlink()
    outputs = []
    for number, source in enumerate(sources, 1):
        output = DESTINATION / f"kajak-{number:02d}.jpg"
        jpeg_from(source, output)
        anonymize_license_plates(output)
        outputs.append(output)
        print(output)
    create_contact_sheet(outputs)


def create_contact_sheet(outputs: list[Path]) -> None:
    cell_width, cell_height, columns = 360, 300, 4
    rows = (len(outputs) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * cell_width, rows * cell_height), "#17241e")
    draw = ImageDraw.Draw(sheet)
    for index, output in enumerate(outputs):
        x, y = (index % columns) * cell_width, (index // columns) * cell_height
        with Image.open(output) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            image.thumbnail((cell_width - 16, cell_height - 52), Image.LANCZOS)
            sheet.paste(image, (x + (cell_width - image.width) // 2, y + 36 + (cell_height - 52 - image.height) // 2))
        draw.rectangle((x, y, x + cell_width, y + 30), fill="#0b120e")
        draw.text((x + 10, y + 8), output.name, fill="white")
    contact_sheet = ROOT / "review" / "kajak-gallery-contact-sheet.jpg"
    sheet.save(contact_sheet, quality=90, optimize=True)
    print(contact_sheet)


if __name__ == "__main__":
    main()
