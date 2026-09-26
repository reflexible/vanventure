"""Create private, non-overwriting contact sheets for all referenced web photos."""

from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path

from PIL import Image, ImageDraw, ImageOps

_spec = spec_from_file_location("grade_photo_inventory", Path(__file__).with_name("grade-photo-inventory.py"))
_inventory = module_from_spec(_spec)
_spec.loader.exec_module(_inventory)
IMAGE_RE, ROOT, SOURCES = _inventory.IMAGE_RE, _inventory.ROOT, _inventory.SOURCES


OUTPUT = ROOT / "review/photo-grade-audit/2026-09-24"


def main():
    images = set()
    for source in SOURCES:
        path = ROOT / source
        if path.exists():
            images.update(IMAGE_RE.findall(path.read_text(encoding="utf-8")))
    images = sorted(image for image in images if "vanventure-logo" not in image)
    columns, rows = 4, 4
    cell_w, cell_h = 360, 292
    tile_w, tile_h = 336, 224
    for start in range(0, len(images), columns * rows):
        number = start // (columns * rows) + 1
        destination = OUTPUT / f"web-photo-sheet-{number:02d}.jpg"
        if destination.exists():
            raise SystemExit(f"Refusing to overwrite: {destination}")
        sheet = Image.new("RGB", (columns * cell_w, rows * cell_h), "#f4f2ec")
        draw = ImageDraw.Draw(sheet)
        for offset, relative in enumerate(images[start:start + columns * rows]):
            column, row = offset % columns, offset // columns
            x, y = column * cell_w + 12, row * cell_h + 12
            with Image.open(ROOT / relative) as opened:
                tile = ImageOps.exif_transpose(opened).convert("RGB")
                tile.thumbnail((tile_w, tile_h), Image.LANCZOS)
            sheet.paste(tile, (x + (tile_w - tile.width) // 2,
                               y + (tile_h - tile.height) // 2))
            draw.text((x, y + tile_h + 5), f"{start + offset + 1:02d} {Path(relative).name[:46]}",
                      fill="#19392e")
            draw.text((x, y + tile_h + 24), str(Path(relative).parent).replace("assets/", "")[:50],
                      fill="#67756c")
        OUTPUT.mkdir(parents=True, exist_ok=True)
        sheet.save(destination, quality=88)
        print(destination)
    print(f"{len(images)} referenced photographic variants on {number} private sheets")


if __name__ == "__main__":
    main()
