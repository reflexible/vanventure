"""Build local review sheets for all or currently unassigned web images."""

import argparse
from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
ALL_FILES = [
    "assets/bikes/scott-baumtour-2022-v1.webp",
    "assets/bikes/scott-fahrwerk-detail-2022-v1.webp",
    "assets/bikes/scott-italien-bergpause-2021-v1.webp",
    "assets/bikes/scott-leogang-2020-v1.webp",
    "assets/bikes/scott-leogang-park-2020-v1.webp",
    "assets/bikes/scott-leogang-trail-2020-v1.webp",
    "assets/bikes/scott-reise-2026-gallery-v2.webp",
    "assets/bikes/scott-reise-2026-v1.webp",
    "assets/bikes/scott-schlammtour-2024-v1.webp",
    "assets/bikes/scott-tourenpause-2022-v1.webp",
    "assets/reisen/italien-2021/alberobello-trulli-natur.png",
    "assets/reisen/italien-2021/treibholz-strand-natur.png",
    "assets/reisen/norwegen-2018/kochen-am-zelt-natur.png",
    "assets/reisen/sardinien-2019/bikepause-im-gruenen-natur.png",
    "assets/reisen/sardinien-2019/julie-felsen-meer-natur.png",
    "assets/reisen/sardinien-2019/rote-felskueste-natur.png",
]
REMAINING_FILES = [
    "assets/bikes/scott-reise-2026-gallery-v2.webp",
    "assets/bikes/scott-reise-2026-v1.webp",
    "assets/reisen/italien-2021/alberobello-trulli-natur.png",
    "assets/reisen/italien-2021/treibholz-strand-natur.png",
    "assets/reisen/norwegen-2018/kochen-am-zelt-natur.png",
    "assets/reisen/sardinien-2019/bikepause-im-gruenen-natur.png",
    "assets/reisen/sardinien-2019/julie-felsen-meer-natur.png",
    "assets/reisen/sardinien-2019/rote-felskueste-natur.png",
]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--remaining", action="store_true", help="Only variants still lacking source evidence")
    args = parser.parse_args()
    files = REMAINING_FILES if args.remaining else ALL_FILES
    output = ROOT / ("review/missing-image-contact-sheet-rest-8-2026-09-24.jpg"
                     if args.remaining else "review/missing-image-contact-sheet-2026-09-24.jpg")
    if output.exists():
        raise SystemExit(f"Refusing to overwrite: {output}")
    columns = 2 if args.remaining else 4
    tile_w, tile_h = (960, 520) if args.remaining else (570, 360)
    gap_x, gap_y = (1000, 570) if args.remaining else (600, 435)
    rows = (len(files) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * gap_x, rows * gap_y), "#f6f5f1")
    pen = ImageDraw.Draw(sheet)
    for number, relative in enumerate(files, 1):
        with Image.open(ROOT / relative) as source:
            tile = source.convert("RGB")
            tile.thumbnail((tile_w, tile_h), Image.BICUBIC)
        column, row = (number - 1) % columns, (number - 1) // columns
        x, y = 15 + column * gap_x, 15 + row * gap_y
        sheet.paste(tile, (x + (tile_w - tile.width) // 2, y + (tile_h - tile.height) // 2))
        name = Path(relative).name
        pen.text((x, y + tile_h + 8), f"{number:02d}  {name}", fill="#202b25")
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=88)
    print(output)


if __name__ == "__main__":
    main()
