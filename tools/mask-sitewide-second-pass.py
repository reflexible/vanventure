"""Private per-motif face/plate review masks. Never edits source or web assets."""

from hashlib import sha256
import json
from pathlib import Path
import sys

from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "review/graded-previews/sitewide-second-pass-round3-2026-09-24"
MANIFEST = json.loads((FOLDER / "manifest.json").read_text(encoding="utf-8"))
# Exact boxes at the 1800px private-review size, except 07/08 (832x1800),
# 12/16/22/28 (1800x1013), 21 (1350x1800), and 27 (1600x1200).
# Faces are elliptical; plates are rounded rectangles. No scenic pixels are
# intentionally touched. Each result needs a separate visual 100% review.
MASKS = {
    1: [("plate", (1650, 897, 1692, 925))],
    3: [("plate", (928, 523, 978, 551))],
    4: [("face", (677, 435, 793, 531))],
    5: [("face", (820, 674, 866, 726))],
    6: [("face", (997, 702, 1070, 771))],
    7: [("plate", (395, 1781, 558, 1800))],
    8: [("plate", (355, 1687, 509, 1742))],
    9: [("plate", (1424, 444, 1484, 462)), ("plate", (1524, 445, 1583, 463))],
    10: [("face", (567, 534, 817, 814))],
    11: [("plate", (1650, 528, 1737, 551)), ("plate", (456, 653, 492, 683))],
    13: [("face", (538, 332, 653, 430))],
    14: [("face", (232, 524, 339, 605))],
    15: [("face", (1308, 430, 1450, 566))],
    16: [("face", (1421, 122, 1610, 397))],
    17: [("plate", (1643, 902, 1692, 929))],
    19: [("face", (409, 911, 456, 966))],
    21: [("face", (564, 100, 790, 320)), ("face", (989, 111, 1100, 215))],
    22: [("face", (788, 456, 832, 497)), ("plate", (1365, 820, 1549, 870)),
         ("plate", (590, 502, 623, 520)), ("plate", (87, 496, 118, 513))],
    27: [("face", (1452, 322, 1555, 430))],
    28: [("plate", (474, 256, 520, 281)), ("plate", (969, 257, 1010, 280)),
         ("plate", (1078, 267, 1123, 289)), ("plate", (1156, 281, 1206, 303))],
}

# Third-pass refinements after side-by-side 100% QA. Only the exact characters
# or facial features are covered; prior broad trials remain private evidence.
MASKS_V3 = {
    3: [("plate", (961, 540, 998, 557))],
    5: [("face", (790, 667, 858, 724))],
    8: [("plate", (370, 1697, 497, 1737))],
    9: [("plate", (1430, 434, 1481, 451)), ("plate", (1529, 436, 1578, 452))],
    10: [("face", (596, 550, 803, 797))],
}
MASKS_V4 = {3: [("plate", (964, 543, 987, 554))]}
MASKS_V5 = {
    1: [("plate", (1643, 902, 1687, 925))],
    11: [("plate", (1659, 515, 1736, 538)),
         ("platepoly", ((465, 626), (491, 640), (484, 671), (456, 656)))],
    17: [("plate", (1643, 902, 1687, 925))],
    19: [("face", (421, 916, 453, 954))],
    27: [("face", (1455, 325, 1525, 401))],
}
MASKS_V6 = {
    4: [("face", (647, 433, 773, 533))],
    6: [("face", (999, 694, 1084, 765))],
    10: [("facepoly", ((634, 542), (746, 539), (814, 573), (826, 647),
                        (799, 741), (746, 808), (665, 822), (599, 761),
                        (572, 664), (587, 588)))],
    13: [("face", (513, 326, 641, 425))],
    14: [("face", (232, 529, 338, 601))],
    15: [("face", (1320, 440, 1443, 558))],
}
MASKS_V7 = {
    16: [("facepoly", ((1515, 119), (1556, 150), (1562, 211), (1534, 289),
                         (1495, 356), (1444, 379), (1417, 309), (1424, 225),
                         (1456, 155)))],
    21: [("face", (554, 69, 798, 329)), ("face", (987, 67, 1114, 219))],
    22: [("face", (788, 452, 830, 497)), ("plate", (1368, 816, 1549, 870)),
         ("plate", (594, 504, 625, 518)), ("plate", (91, 499, 116, 511))],
    28: [("plate", (477, 259, 522, 275)), ("plate", (976, 258, 1011, 274)),
         ("plate", (1087, 272, 1121, 284)), ("plate", (1165, 285, 1203, 299))],
}
MASKS_V8 = {
    13: [("facepoly", ((542, 325), (624, 327), (656, 349), (658, 383),
                         (631, 418), (587, 438), (539, 417), (511, 380),
                         (517, 348)))],
    15: [("facepoly", ((1316, 436), (1407, 430), (1447, 450), (1452, 494),
                         (1432, 547), (1400, 569), (1342, 561), (1310, 527),
                         (1298, 478)))],
}
MASKS_V9 = {
    14: [("facepoly", ((253, 548), (305, 549), (336, 567), (340, 591),
                         (313, 612), (279, 608), (247, 586)))],
    15: [("facepoly", ((1308, 404), (1430, 406), (1463, 443), (1464, 493),
                         (1438, 547), (1400, 573), (1334, 558), (1295, 518),
                         (1285, 462)))],
}
MASKS_V10 = {
    7: [("plate", (398, 1778, 510, 1800))],
    22: [("face", (789, 450, 830, 496)), ("plate", (1360, 811, 1558, 891)),
         ("plate", (590, 498, 625, 523)), ("plate", (67, 476, 100, 496))],
    28: [("plate", (469, 252, 524, 275)), ("plate", (1002, 263, 1037, 280)),
         ("plate", (1074, 271, 1110, 290)), ("plate", (1206, 276, 1247, 296))],
}
MASKS_V11 = {
    14: [("facepoly", ((268, 545), (307, 550), (327, 563), (329, 582),
                         (289, 589), (263, 573))),
         ("facepoly", ((286, 578), (328, 579), (328, 597), (303, 611),
                         (281, 600)))],
    15: [("facepoly", ((1317, 404), (1426, 406), (1458, 440), (1460, 488),
                         (1437, 541), (1398, 566), (1341, 554), (1304, 515),
                         (1305, 457)))],
}
MASKS_V12 = {
    10: [("facepoly", ((619, 548), (746, 535), (806, 577), (802, 658),
                         (756, 705), (639, 704), (587, 666), (586, 599))),
         ("facepoly", ((630, 674), (767, 681), (781, 738), (750, 804),
                         (661, 817), (614, 763)))],
    14: [("facepoly", ((265, 565), (310, 564), (329, 579), (327, 597),
                         (302, 611), (274, 601), (252, 581)))],
}
MASKS_V13 = {
    22: [("plate", (1360, 811, 1558, 891)), ("plate", (590, 498, 625, 523)),
         ("plate", (67, 476, 100, 496))],
}


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def bounds_for(kind, shape):
    if kind in {"platepoly", "facepoly"}:
        return (min(point[0] for point in shape), min(point[1] for point in shape),
                max(point[0] for point in shape), max(point[1] for point in shape))
    return shape


def mask_one(index, record, shapes, version="v2"):
    source = ROOT / record["projectCopy"]
    derivative = ROOT / record["reviewDerivative"]
    if digest(source) != record["sourceSha256"]:
        raise SystemExit(f"Unchanged project copy mismatch: {source}")
    if digest(derivative) != record["derivativeSha256"]:
        raise SystemExit(f"Color derivative mismatch: {derivative}")
    destination = FOLDER / f"{index:02d}-privacy-masked-{version}-review.jpg"
    if destination.exists():
        raise SystemExit(f"Refusing to overwrite: {destination}")
    with Image.open(derivative) as opened:
        original = opened.convert("RGB")
    result = original.copy()
    total_mask = Image.new("L", original.size, 0)
    for kind, shape in shapes:
        box = bounds_for(kind, shape)
        if box[0] < 0 or box[1] < 0 or box[2] > original.width or box[3] > original.height:
            raise SystemExit(f"Invalid {kind} box for image {index}: {box}")
        region = Image.new("L", original.size, 0)
        draw = ImageDraw.Draw(region)
        if kind == "face":
            draw.ellipse(box, fill=255)
        elif kind in {"platepoly", "facepoly"}:
            draw.polygon(shape, fill=255)
        else:
            draw.rectangle(box, fill=255)
        region = region.filter(ImageFilter.GaussianBlur(5 if kind in {"face", "facepoly"} else 3))
        radius = max(13, min(50, int((box[2] - box[0]) * (0.20 if kind in {"face", "facepoly"} else 0.25))))
        blurred = original.filter(ImageFilter.GaussianBlur(radius))
        result = Image.composite(blurred, result, region)
        total_mask = ImageChops.lighter(total_mask, region)
    # Exact-pixel comparison before JPEG export: all changes must be masked.
    outside = total_mask.point(lambda value: 0 if value else 255)
    if ImageChops.multiply(ImageChops.difference(result, original).convert("L"), outside).getbbox():
        raise SystemExit(f"Changed unmasked pixel in image {index}")
    result.save(destination, quality=93, subsampling=0, optimize=True)
    qa = Image.new("RGB", (800, 400 * len(shapes)), "#f4f2ec")
    for offset, (kind, shape) in enumerate(shapes):
        box = bounds_for(kind, shape)
        pad = 32
        crop_box = (max(0, box[0]-pad), max(0, box[1]-pad),
                    min(original.width, box[2]+pad), min(original.height, box[3]+pad))
        for column, picture in enumerate((original, result)):
            crop = picture.crop(crop_box)
            crop.thumbnail((386, 380), Image.LANCZOS)
            qa.paste(crop, (column*400+(400-crop.width)//2,
                            offset*400+(400-crop.height)//2))
    qa.save(FOLDER / f"{index:02d}-privacy-{version}-qa.jpg", quality=91)
    if digest(source) != record["sourceSha256"]:
        raise SystemExit(f"Project copy changed during image {index}")
    return {"index": index, "webAsset": record["webAsset"], "sourceSha256": record["sourceSha256"],
            "gradedSha256": record["derivativeSha256"], "maskShapes": shapes,
            "maskedDerivative": str(destination.relative_to(ROOT)), "maskedSha256": digest(destination),
            "status": "PRIVATE; 100% visual and all rendered sizes still require review"}


def main():
    if "--crop" in sys.argv:
        start = sys.argv.index("--crop")
        index, x0, y0, x1, y1 = map(int, sys.argv[start + 1:start + 6])
        record = MANIFEST[index - 1]
        if digest(ROOT / record["projectCopy"]) != record["sourceSha256"]:
            raise SystemExit("Unchanged project copy mismatch")
        with Image.open(ROOT / record["reviewDerivative"]) as opened:
            preview = opened.convert("RGB")
        output = FOLDER / f"{index:02d}-private-crop-{x0}-{y0}-{x1}-{y1}.png"
        if output.exists():
            raise SystemExit(f"Refusing to overwrite: {output}")
        preview.crop((x0, y0, x1, y1)).save(output)
        print(output)
        return
    if "--grid" in sys.argv:
        index = int(sys.argv[sys.argv.index("--grid") + 1])
        record = MANIFEST[index - 1]
        if digest(ROOT / record["projectCopy"]) != record["sourceSha256"]:
            raise SystemExit("Unchanged project copy mismatch")
        with Image.open(ROOT / record["reviewDerivative"]) as opened:
            preview = opened.convert("RGB")
        painter = ImageDraw.Draw(preview)
        for x in range(0, preview.width, 100):
            painter.line((x, 0, x, preview.height), fill="#ffff00", width=2)
            for y in range(0, preview.height, 100):
                painter.text((x + 3, y + 3), f"{x},{y}", fill="#ffff00", stroke_width=1, stroke_fill="#000000")
        for y in range(0, preview.height, 100):
            painter.line((0, y, preview.width, y), fill="#ffff00", width=2)
        output = FOLDER / f"{index:02d}-private-coordinate-grid.jpg"
        if output.exists():
            raise SystemExit(f"Refusing to overwrite: {output}")
        preview.save(output, quality=92)
        print(output)
        return
    if "--qa-only" in sys.argv:
        for index, shapes in MASKS.items():
            record = MANIFEST[index - 1]
            with Image.open(ROOT / record["reviewDerivative"]) as opened:
                original = opened.convert("RGB")
            with Image.open(FOLDER / f"{index:02d}-privacy-masked-review.jpg") as opened:
                result = opened.convert("RGB")
            qa = Image.new("RGB", (800, 400 * len(shapes)), "#f4f2ec")
            for offset, (kind, shape) in enumerate(shapes):
                box = bounds_for(kind, shape)
                pad = 32
                crop_box = (max(0, box[0]-pad), max(0, box[1]-pad),
                            min(original.width, box[2]+pad), min(original.height, box[3]+pad))
                for column, picture in enumerate((original, result)):
                    crop = picture.crop(crop_box)
                    crop.thumbnail((386, 380), Image.LANCZOS)
                    qa.paste(crop, (column*400+(400-crop.width)//2,
                                    offset*400+(400-crop.height)//2))
            qa.save(FOLDER / f"{index:02d}-privacy-qa.jpg", quality=91)
        print(f"{len(MASKS)} private face/plate crops prepared for 100% QA")
        return
    version = "v13" if "--v13" in sys.argv else "v12" if "--v12" in sys.argv else "v11" if "--v11" in sys.argv else "v10" if "--v10" in sys.argv else "v9" if "--v9" in sys.argv else "v8" if "--v8" in sys.argv else "v7" if "--v7" in sys.argv else "v6" if "--v6" in sys.argv else "v5" if "--v5" in sys.argv else "v4" if "--v4" in sys.argv else "v3" if "--v3" in sys.argv else "v2"
    selections = MASKS_V13 if version == "v13" else MASKS_V12 if version == "v12" else MASKS_V11 if version == "v11" else MASKS_V10 if version == "v10" else MASKS_V9 if version == "v9" else MASKS_V8 if version == "v8" else MASKS_V7 if version == "v7" else MASKS_V6 if version == "v6" else MASKS_V5 if version == "v5" else MASKS_V4 if version == "v4" else MASKS_V3 if version == "v3" else MASKS
    records = []
    for index, shapes in selections.items():
        records.append(mask_one(index, MANIFEST[index - 1], shapes, version))
        print(f"{index:02d} masked", flush=True)
    output = FOLDER / f"privacy-mask-{version}-manifest.json"
    if output.exists():
        raise SystemExit(f"Refusing to overwrite: {output}")
    output.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(records)} private masks; all project copies unchanged")


if __name__ == "__main__":
    main()
