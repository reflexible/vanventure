from pathlib import Path
from PIL import Image, ImageFilter, ImageOps

ROOT = Path(r"D:\work\_venventure")
SOURCE = ROOT / "review" / "selected-originals"
DESTINATION = ROOT / "assets" / "reisen"

# Blur rectangles are in source-image pixels and intentionally oversized so no
# identifying feature remains visible after the web derivative is resized.
GALLERIES = {
    "norwegen-2018": ["P7050273.jpg", "P7050295.jpg", "P7050302.jpg", "P7060417.jpg", "P7100481.jpg", "P7100486.jpg"],
    "sardinien-2019": ["DSC_0268.JPG", "DSC_0273.JPG", "DSC_0279.JPG", "DSC_0280.JPG", "DSC_0291.JPG", "DSC_0307.JPG"],
    "italien-2021": ["DSC_0003_5.JPG", "DSC_1703.JPG", "DSC_1719.JPG", "DSC_1744.JPG", "DSC_1759.JPG", "DSC_1805.JPG", "DSC_1809.JPG"],
}

REDACTIONS = {
    # License plate on the California.
    ("sardinien-2019", "DSC_0273.JPG"): (4420, 2490, 4750, 2710),
    # Adrian's face at the camp table.
    ("italien-2021", "DSC_1719.JPG"): (4340, 1580, 4930, 2130),
}


def anonymize(image, rectangle):
    crop = image.crop(rectangle)
    # A two-pass blur prevents identifiable detail in enlarged views too.
    blur_radius = max(crop.size) // 7
    image.paste(crop.filter(ImageFilter.GaussianBlur(blur_radius)).filter(ImageFilter.GaussianBlur(blur_radius)), rectangle)


def web_name(filename):
    return Path(filename).stem.lower().replace("_", "-") + ".jpg"


for trip, files in GALLERIES.items():
    output = DESTINATION / trip / "gallery"
    output.mkdir(parents=True, exist_ok=True)
    for filename in files:
        source = SOURCE / trip / filename
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            rectangle = REDACTIONS.get((trip, filename))
            if rectangle:
                anonymize(image, rectangle)
            image.thumbnail((1920, 1920), Image.LANCZOS)
            image.save(output / web_name(filename), quality=88, optimize=True, progressive=True)
        print(output / web_name(filename))
