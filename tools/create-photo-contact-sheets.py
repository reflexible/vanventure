from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import math

ROOT = Path(r"D:\work\_venventure")
OUTPUT = ROOT / "review" / "contact-sheets"

SETS = {
    "norwegen-2018": Path(r"E:\_fotos_original\urlaubsSammlungen\norwegen\optimised"),
    "sardinien-2019": Path(r"E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy"),
    "italien-2021": Path(r"E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut"),
}

EXTENSIONS = {".jpg", ".jpeg", ".png"}
CELL_W, CELL_H = 300, 240
COLS, ROWS = 4, 4
PER_SHEET = COLS * ROWS


def label(draw: ImageDraw.ImageDraw, xy: tuple[int, int], text: str) -> None:
    draw.rectangle((xy[0], xy[1], xy[0] + CELL_W, xy[1] + 24), fill="#111111")
    draw.text((xy[0] + 7, xy[1] + 5), text, fill="white")


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for slug, source_dir in SETS.items():
        photos = sorted(path for path in source_dir.rglob("*") if path.suffix.lower() in EXTENSIONS)
        for number, start in enumerate(range(0, len(photos), PER_SHEET), 1):
            batch = photos[start : start + PER_SHEET]
            sheet = Image.new("RGB", (COLS * CELL_W, ROWS * CELL_H), "#202020")
            draw = ImageDraw.Draw(sheet)
            for i, path in enumerate(batch):
                x, y = (i % COLS) * CELL_W, (i // COLS) * CELL_H
                try:
                    with Image.open(path) as source:
                        image = ImageOps.exif_transpose(source).convert("RGB")
                        image.thumbnail((CELL_W - 8, CELL_H - 32), Image.LANCZOS)
                        framed = Image.new("RGB", (CELL_W - 8, CELL_H - 32), "#080808")
                        framed.paste(image, ((framed.width - image.width) // 2, (framed.height - image.height) // 2))
                        sheet.paste(framed, (x + 4, y + 28))
                    label(draw, (x, y), path.name)
                except Exception as error:
                    label(draw, (x, y), f"FEHLER: {path.name}")
                    draw.text((x + 7, y + 40), str(error)[:35], fill="white")
            sheet.save(OUTPUT / f"{slug}-{number:02d}.jpg", quality=88, optimize=True)
        print(f"{slug}: {len(photos)} photos, {math.ceil(len(photos) / PER_SHEET)} sheets")


if __name__ == "__main__":
    main()
