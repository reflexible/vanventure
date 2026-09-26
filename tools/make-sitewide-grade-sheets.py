"""Private before/after contact sheets for the checked first-pass photo set."""

import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

ROOT = Path(__file__).resolve().parent.parent
FOLDER = ROOT / "review/graded-previews/sitewide-2026-09-24"


def tile(path, size):
    with Image.open(path) as opened:
        result = ImageOps.exif_transpose(opened).convert("RGB")
        result.thumbnail(size, Image.LANCZOS)
    return result


def main():
    batch_number = 3 if "--batch=3" in sys.argv else 2 if "--batch=2" in sys.argv else 1
    folder = FOLDER.with_name(f"sitewide-round{batch_number}-2026-09-24") if batch_number > 1 else FOLDER
    if "--second-pass" in sys.argv:
        folder = FOLDER.with_name(f"sitewide-second-pass-round{batch_number}-2026-09-24")
    entries = json.loads((folder / "manifest.json").read_text(encoding="utf-8"))
    if "--safe-only" in sys.argv:
        if batch_number == 2:
            # The first and third round-two sources include visible faces.
            entries = [entry for entry in entries if entry["webAsset"] not in {
                "assets/reisen/italien-2021/gallery/dsc-1719.jpg",
                "assets/reisen/norwegen-2018/sabine-julie-bergsee-natur.png",
            }]
        elif batch_number == 3:
            # Only motifs without visible faces or vehicle plates at the
            # contact-sheet scale; full-size publication QA remains open.
            safe = {
                "assets/bikes/sardinien-mountainbikes-meer-v1.webp",
                "assets/reisen/sardinien-2019/mountainbikes-am-meer-natur.png",
                "assets/riverstar/gallery/kajak-03.jpg",
                "assets/riverstar/gallery/kajak-10.jpg",
            }
            entries = [entry for entry in entries if entry["webAsset"] in safe]
    per_sheet, cell_w, cell_h = 8, 400, 260
    for start in range(0, len(entries), per_sheet):
        number = start // per_sheet + 1
        prefix = "safe-before-after" if "--safe-only" in sys.argv else "before-after"
        if "--second-pass" in sys.argv:
            prefix += "-second-pass"
        if batch_number == 3 and "--safe-only" in sys.argv:
            prefix += "-v2"
        destination = folder / f"{prefix}-{number:02d}.jpg"
        if destination.exists():
            print(f"Keeping existing contact sheet: {destination}")
            continue
        batch = entries[start:start + per_sheet]
        sheet = Image.new("RGB", (cell_w * 4, cell_h * 4), "#f5f2ec")
        draw = ImageDraw.Draw(sheet)
        for offset, record in enumerate(batch):
            row, col = offset // 2, offset % 2
            x, y = col * cell_w * 2, row * cell_h
            source_path = ROOT / record["projectCopy"]
            if source_path.suffix.lower() == ".heic":
                conversion_folder = folder
                if "--second-pass" in sys.argv:
                    conversion_folder = FOLDER.with_name(f"sitewide-round{batch_number}-2026-09-24")
                source_path = conversion_folder / (source_path.stem + "-source-conversion.jpg")
            source = tile(source_path, (370, 215))
            edited = tile(ROOT / record["reviewDerivative"], (370, 215))
            sheet.paste(source, (x + 12 + (370 - source.width) // 2,
                                 y + 8 + (215 - source.height) // 2))
            sheet.paste(edited, (x + cell_w + 12 + (370 - edited.width) // 2,
                                 y + 8 + (215 - edited.height) // 2))
            label = f'{start + offset + 1:02d} {Path(record["webAsset"]).name[:38]}'
            draw.text((x + 12, y + 226), label + " · ORIGINAL", fill="#183d33")
            draw.text((x + cell_w + 12, y + 226), "FARBPROBE · " + record["profile"], fill="#183d33")
        sheet.save(destination, quality=89)
        print(destination)


if __name__ == "__main__":
    main()
