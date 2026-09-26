"""Produce a private coordinate crop for exact Flaam pole retouch planning."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "review/graded-previews/user-feedback-2026-09-24/23-feedback-v1.jpg"
OUTPUT = ROOT / "review/graded-previews/user-feedback-2026-09-24/23-poles-coordinate-crop.png"

with Image.open(SOURCE) as opened:
    image = opened.convert("RGB")
if image.size != (1800, 1350):
    raise SystemExit(f"Unexpected image size: {image.size}")
box = (0, 840, 900, 1350)
crop = image.crop(box)
draw = ImageDraw.Draw(crop)
for x in range(0, crop.width, 50):
    draw.line((x, 0, x, crop.height), fill=(255, 220, 0), width=1)
    for y in range(0, crop.height, 50):
        draw.text((x + 3, y + 3), f"{x},{y+box[1]}", fill=(255, 220, 0), stroke_width=1, stroke_fill=(0, 0, 0))
for y in range(0, crop.height, 50):
    draw.line((0, y, crop.width, y), fill=(255, 220, 0), width=1)
if not OUTPUT.exists():
    crop.save(OUTPUT)
print(OUTPUT)
detail_output = OUTPUT.with_name("23-poles-detail-crop.png")
if detail_output.exists():
    raise SystemExit("Refusing to overwrite detail crop")
detail = image.crop((0, 1130, 650, 1350))
detail = detail.resize((1300, 440), Image.Resampling.NEAREST)
detail.save(detail_output)
print(detail_output)
