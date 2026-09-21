from pathlib import Path
from PIL import Image, ImageOps

root = Path(r"D:\work\_venventure\review")
targets = {
    "norwegen-editorial.jpg": root / "selected-originals" / "norwegen-2018" / "P7050273.jpg",
    "sardinien-editorial.jpg": root / "selected-originals" / "sardinien-2019" / "DSC_0280.JPG",
    "italien-editorial.jpg": root / "selected-originals" / "italien-2021" / "DSC_1719.JPG",
    "sardinien-california.jpg": root / "selected-originals" / "sardinien-2019" / "DSC_0273.JPG",
}
output = root / "edit-targets"
output.mkdir(exist_ok=True)
for name, source in targets.items():
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        image.thumbnail((1600, 1600), Image.LANCZOS)
        image.save(output / name, quality=92, optimize=True)
    print(output / name)
