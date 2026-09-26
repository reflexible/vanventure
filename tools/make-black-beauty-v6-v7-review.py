"""Review-only comparison of the mid/left background in two local grades."""

from hashlib import sha256
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
OLD = ROOT / "review/graded-previews/black-beauty-shadow-v6-2026-09-24/black-beauty-tourenpause-editorial.jpg"
NEW = ROOT / "review/graded-previews/black-beauty-shadow-v7-2026-09-24/black-beauty-tourenpause-editorial.jpg"
OUTPUT = ROOT / "review/graded-previews/black-beauty-shadow-v7-2026-09-24/links-mitte-v6-v7.jpg"
HASHES = (
    "ed49e0d7faf440a132b5558a2dd50cdca09bf81c984991eb7edf9f22421a8881",
    "05da00c39696021eb413b3d659eff4437c23f113cf409a8966e5a66a3714bfef",
)


def main():
    if OUTPUT.exists():
        raise SystemExit("Refusing to overwrite review")
    if tuple(sha256(path.read_bytes()).hexdigest() for path in (OLD, NEW)) != HASHES:
        raise SystemExit("Comparison inputs have changed")
    panel = Image.new("RGB", (2500, 800), "#f5f3ee")
    draw = ImageDraw.Draw(panel)
    for index, (path, label) in enumerate(((OLD, "V6 · GRÜN LINKS ZU MATT"),
                                           (NEW, "V7 · GRÜN BIS ZUR BILDMITTE"))):
        with Image.open(path) as opened:
            if opened.size != (2200, 1650):
                raise SystemExit("Unexpected review dimensions")
            panel.paste(opened.crop((250, 300, 1500, 1050)), (index * 1250, 0))
        draw.text((index * 1250 + 22, 768), label, fill="#213c32")
    panel.save(OUTPUT, quality=94, subsampling=0, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
