"""Mask only the checked background-car plate in private photo 48 feedback."""

from hashlib import sha256
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "review/graded-previews/user-feedback-2026-09-24"
MANIFEST = FOLDER / "manifest.json"
OUTPUT = FOLDER / "48-feedback-v1-plate-masked.jpg"
QA = FOLDER / "48-feedback-v1-plate-qa.jpg"
BOX = (964, 543, 987, 554)


def digest(path):
    return sha256(path.read_bytes()).hexdigest()


def main():
    if OUTPUT.exists() or QA.exists():
        raise SystemExit("Refusing to overwrite existing review or QA")
    record = next(item for item in json.loads(MANIFEST.read_text(encoding="utf-8")) if item["number"] == 48)
    source = ROOT / record["projectCopy"]
    graded = ROOT / record["reviewDerivative"]
    if digest(source) != record["sourceSha256"] or digest(graded) != record["derivativeSha256"]:
        raise SystemExit("Source or color-derivative hash differs")
    with Image.open(graded) as opened:
        image = opened.convert("RGB")
    if image.size != (1800, 1350):
        raise SystemExit(f"Unexpected size: {image.size}")
    mask = Image.new("L", image.size, 0)
    ImageDraw.Draw(mask).rectangle(BOX, fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(3))
    result = Image.composite(image.filter(ImageFilter.GaussianBlur(13)), image, mask)
    outside = mask.point(lambda value: 0 if value else 255)
    if ImageChops.multiply(ImageChops.difference(result, image).convert("L"), outside).getbbox():
        raise SystemExit("Unexpected unmasked pixel change")
    result.save(OUTPUT, "JPEG", quality=93, subsampling=0, optimize=True)
    crop = (BOX[0]-36, BOX[1]-30, BOX[2]+36, BOX[3]+30)
    before = image.crop(crop)
    after = result.crop(crop)
    before = before.resize((before.width*4, before.height*4), Image.Resampling.NEAREST)
    after = after.resize((after.width*4, after.height*4), Image.Resampling.NEAREST)
    qa = Image.new("RGB", (before.width*2, before.height))
    qa.paste(before, (0, 0))
    qa.paste(after, (before.width, 0))
    qa.save(QA, "JPEG", quality=95, subsampling=0)
    if digest(source) != record["sourceSha256"]:
        raise SystemExit("Project copy changed during mask")
    print(f"source={record['sourceSha256']}\ncolor={record['derivativeSha256']}\nmasked={digest(OUTPUT)}\nqa={QA}")


if __name__ == "__main__":
    main()
