"""Local, pixel-faithful review grades for the user's numbered 24 Sep feedback.

Only unchanged project copies are read. No public asset or archive file is written.
Pole removal in photo 23 is deliberately separate and not claimed here.
"""

from hashlib import sha256
import importlib.util
import json
from pathlib import Path
import sys

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
REVIEW = ROOT / "review/graded-previews"
OUTPUT = REVIEW / "user-feedback-2026-09-24"
HERO_SOURCE = ROOT / "review/selected-originals/hero-reference/italien-2021/P9200258.JPG"
HERO_HASH = "a9ce79e7b66a8b4a606b762afceaf10040462ca5cb700798afac079766dd0dff"
NUMBERS = (2, 4, 5, 6, 11, 13, 17, 19, 23, 26, 28, 32, 36, 39, 48, 49, 50)


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def smoothstep(low, high, values):
    t = np.clip((values - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def local_detail(luma, radius=15):
    blurred = Image.fromarray(np.uint8(luma * 255 + 0.5), "L").filter(
        ImageFilter.GaussianBlur(radius)
    )
    return np.clip(luma - np.asarray(blurred, dtype=np.float32) / 255.0, -0.075, 0.075)


def coordinates(shape):
    height, width = shape
    y = np.linspace(0, 1, height, dtype=np.float32)[:, None]
    x = np.linspace(0, 1, width, dtype=np.float32)[None, :]
    return x, y


def tailor(image, number):
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    x, y = coordinates(luma.shape)
    green = smoothstep(0.002, 0.095, rgb[..., 1] - rgb[..., 0])
    green *= smoothstep(0.006, 0.10, rgb[..., 1] - rgb[..., 2])
    olive = smoothstep(-0.08, 0.04, rgb[..., 1] - rgb[..., 0])
    olive *= smoothstep(0.0, 0.12, rgb[..., 1] - rgb[..., 2])
    olive *= smoothstep(0.10, 0.25, rgb[..., 1])
    blue = smoothstep(0.015, 0.12, rgb[..., 2] - rgb[..., 0])
    warm = smoothstep(0.04, 0.16, rgb[..., 0] - rgb[..., 2])
    bright = smoothstep(0.56, 0.96, luma)
    shadow = 1 - smoothstep(0.08, 0.42, luma)
    gain = np.zeros_like(luma)
    saturation = np.ones_like(luma)
    detail_gain = np.zeros_like(luma)
    note = ""

    if number == 2:
        right = smoothstep(0.48, 0.70, x)
        lower_trunk = (1 - smoothstep(0.48, 0.72, x)) * smoothstep(0.43, 0.72, y)
        gain -= 0.05 + 0.13 * right * bright + 0.10 * lower_trunk * (1 - green)
        saturation += 0.55 * green * right + 0.18 * green
        detail_gain += 0.13 * right
        note = "Satteres, dunkleres Hintergrundgrün; heller Stammfuß lokal gebändigt."
    elif number in (4, 5):
        gain -= 0.13 + 0.20 * bright
        gain += 0.035 * shadow
        saturation += 0.05 * green
        detail_gain += 0.08
        note = "Deutlich düsterer Überzug passend zum bedeckten Aufnahmetag; Radstruktur erhalten."
    elif number == 6:
        center = np.exp(-(((x - 0.50) / 0.48) ** 2 + ((y - 0.54) / 0.42) ** 2) * 2.0)
        gain -= 0.17 * bright * (1 - 0.55 * center)
        gain += 0.055 * center * shadow
        detail_gain += 0.13 * center
        saturation += 0.13 * warm * center
        note = "Heller Hintergrund zurückgenommen, schlammiges Rad lokal differenziert."
    elif number in (11, 26):
        landscape = smoothstep(0.24, 0.55, y)
        gain -= 0.04 + 0.10 * bright * landscape
        saturation += 0.53 * olive * landscape - 0.045 * blue
        detail_gain += 0.22 * landscape
        note = "Berggrün kräftiger; Dunst nur über vorhandene lokale Details getrennt."
    elif number in (13, 19):
        gain -= 0.105 + 0.055 * bright
        saturation += 0.56 * olive - 0.03 * blue
        detail_gain += 0.16
        note = "Wiesen satter, bedeckte düstere Campo-Stimmung erhalten."
    elif number == 17:
        houses = (1 - smoothstep(0.35, 0.72, y))
        gain -= 0.035 + 0.05 * bright * houses
        saturation += 0.20 * olive
        detail_gain += 0.23 * houses
        note = "Häuserzone im oberen Bildteil kontrastreicher; kein erfundener Fern-Detailersatz."
    elif number == 23:
        background = 1 - smoothstep(0.35, 0.70, y)
        foreground = smoothstep(0.48, 0.84, y)
        gain -= 0.115 * bright * background
        gain += 0.12 * shadow * foreground
        saturation += 0.24 * olive
        detail_gain += 0.16 * background
        note = "Heller Fernbereich gedämpft, dunkler Vordergrund angehoben; Masten noch nicht retuschiert."
    elif number == 28:
        right = smoothstep(0.59, 0.89, x)
        gain -= 0.07 * bright * right
        saturation += 0.12 * olive * right - 0.03 * blue
        detail_gain += 0.25 * right
        note = "Rechter dunstiger Bildrand aus vorhandenen Details klarer abgestuft."
    elif number == 32:
        sky = (1 - smoothstep(0.34, 0.65, y)) * blue
        earth = smoothstep(0.33, 0.70, y) * warm
        gain -= 0.15 * sky
        gain += 0.13 * earth * (1 - bright)
        detail_gain += 0.09 * sky
        note = "Himmel etwas dunkler/klarer; rote Erde natürlich aufgehellt."
    elif number == 36:
        boat = smoothstep(0.45, 0.76, y)
        mountain = 1 - smoothstep(0.30, 0.64, y)
        gain += 0.13 * boat * shadow
        gain -= 0.035 * mountain * bright
        saturation += 0.30 * olive * mountain
        detail_gain += 0.16 * mountain
        note = "Bootsschatten geöffnet; Berg- und Hintergrundfarben differenziert."
    elif number == 39:
        gain -= 0.08 + 0.17 * bright
        gain += 0.02 * shadow
        detail_gain += 0.08
        note = "Fast weißes Wasser und Hintergrund zurückgenommen, Abendcharakter ohne Kunstlicht."
    elif number == 48:
        background = 1 - smoothstep(0.46, 0.78, y)
        gain -= 0.14 * bright * background + 0.03
        gain += 0.025 * shadow
        detail_gain += 0.08
        note = "Heller Hintergrund gebändigt, Bike bleibt scharf; keine künstliche Tiefenunschärfe."
    elif number in (49, 50):
        gain -= 0.115 + 0.12 * bright
        gain += 0.025 * shadow
        saturation += 0.27 * olive
        detail_gain += 0.12
        note = "Leogang dunkler und farbkräftiger; Helmut bleibt sichtbar."
    else:
        raise ValueError(number)

    gain += detail_gain * local_detail(luma)
    target = np.clip(luma + gain, 0, 1)
    graded = np.clip(rgb * (target / np.maximum(luma, 0.025))[..., None], 0, 1)
    mean = graded @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    graded = mean[..., None] + (graded - mean[..., None]) * saturation[..., None]
    output = Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")
    return output, note


def hero():
    if digest(HERO_SOURCE) != HERO_HASH:
        raise SystemExit("Italy hero unchanged project copy differs from recorded hash")
    with Image.open(HERO_SOURCE) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
    if image.size != (5184, 3888):
        raise SystemExit(f"Unexpected Italy hero source size: {image.size}")
    image = image.resize((2400, 1800), Image.Resampling.LANCZOS)
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    target = 0.006 + 1.12 * (luma - 0.006)
    target -= 0.12 * smoothstep(0.68, 0.98, luma)
    target += 0.24 * local_detail(luma, 20)
    x, y = coordinates(luma.shape)
    church = smoothstep(0.305, 0.355, x) * (1 - smoothstep(0.78, 0.83, x))
    church = church * smoothstep(0.365, 0.425, y) * (1 - smoothstep(0.685, 0.75, y))
    neutral = 1 - smoothstep(0.06, 0.18, rgb.max(axis=2) - rgb.min(axis=2))
    target -= 0.095 * church * neutral * smoothstep(0.60, 0.86, luma)
    graded = np.clip(rgb * (np.clip(target, 0, 1) / np.maximum(luma, 0.025))[..., None], 0, 1)
    green = smoothstep(0.001, 0.085, graded[..., 1] - graded[..., 0])
    green *= smoothstep(0.006, 0.10, graded[..., 1] - graded[..., 2])
    green *= smoothstep(0.10, 0.25, graded[..., 1])
    blue = smoothstep(0.03, 0.15, graded[..., 2] - graded[..., 0])
    mean = graded @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    graded = mean[..., None] + (graded - mean[..., None]) * (1 + 0.78 * green - 0.06 * blue)[..., None]
    graded *= (1 - 0.06 * green)[..., None]
    return Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB")


def main():
    if "--verify" in sys.argv:
        manifest = json.loads((OUTPUT / "manifest.json").read_text(encoding="utf-8"))
        if len(manifest) != len(NUMBERS) + 1:
            raise SystemExit(f"Unexpected feedback inventory: {len(manifest)}")
        for record in manifest:
            source = (ROOT / record["projectCopy"]).resolve()
            derivative = (ROOT / record["reviewDerivative"]).resolve()
            if not source.is_relative_to(ROOT.resolve()) or not derivative.is_relative_to(OUTPUT.resolve()):
                raise SystemExit(f"Path escaped project review: {record['number']}")
            if digest(source) != record["sourceSha256"] or digest(derivative) != record["derivativeSha256"]:
                raise SystemExit(f"Source or derivative hash mismatch: {record['number']}")
        print(f"{len(manifest)}/{len(manifest)} source/review hashes verified; no files changed")
        return
    if OUTPUT.exists():
        expected = {f"{number:02d}-feedback-v1.jpg" for number in NUMBERS}
        existing = {path.name for path in OUTPUT.iterdir()}
        if "manifest.json" in existing or not existing.issubset(expected):
            raise SystemExit(f"Refusing to overwrite prior review: {OUTPUT}")
    if OUTPUT.resolve().parent != REVIEW.resolve():
        raise SystemExit("Review folder escaped project")
    spec = importlib.util.spec_from_file_location("sitewide_grade", ROOT / "tools/grade-sitewide-second-pass.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    entries = []
    for batch in (1, 2, 3):
        manifest = REVIEW / f"sitewide-second-pass-round{batch}-2026-09-24/manifest.json"
        entries.extend(json.loads(manifest.read_text(encoding="utf-8")))
    if len(entries) != 74:
        raise SystemExit(f"Expected 74 numbered entries, found {len(entries)}")
    prepared = []
    for number in NUMBERS:
        record = entries[number - 1]
        source = (ROOT / record["projectCopy"]).resolve()
        if not source.is_relative_to(ROOT.resolve()) or not source.is_file():
            raise SystemExit(f"Not a project copy: {source}")
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Source hash mismatch: {number} {source}")
        prepared.append((number, record, source))
    if digest(HERO_SOURCE) != HERO_HASH:
        raise SystemExit("Italy hero source hash mismatch")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for number, record, source in prepared:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            baseline, measurement = module.grade(image, record["profile"])
            result, note = tailor(baseline, number)
        target = OUTPUT / f"{number:02d}-feedback-v1.jpg"
        if not target.exists():
            result.save(target, "JPEG", quality=93, subsampling=0, optimize=True)
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project copy changed during processing: {number}")
        manifest.append({"number": number, "webAsset": record["webAsset"],
                         "projectCopy": record["projectCopy"],
                         "sourceSha256": record["sourceSha256"],
                         "reviewDerivative": str(target.relative_to(ROOT)),
                         "derivativeSha256": digest(target), "measurement": measurement,
                         "operation": note, "status": "PRIVATE_COLOR_REVIEW; privacy, visual and publication approval pending"})
        print(f"{number:02d} {record['webAsset']}", flush=True)
    hero_target = OUTPUT / "italien-hero-feedback-v5.jpg"
    hero().save(hero_target, "JPEG", quality=93, subsampling=0, optimize=True)
    if digest(HERO_SOURCE) != HERO_HASH:
        raise SystemExit("Italy hero project copy changed during processing")
    manifest.append({"number": "Italy hero V5", "webAsset": "assets/heroes/italien-2021.jpg",
                     "projectCopy": str(HERO_SOURCE.relative_to(ROOT)), "sourceSha256": HERO_HASH,
                     "reviewDerivative": str(hero_target.relative_to(ROOT)),
                     "derivativeSha256": digest(hero_target),
                     "operation": "V4 highlight treatment retained; actual foliage saturation/depth increased.",
                     "status": "PRIVATE_COLOR_REVIEW; visual and publication approval pending"})
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifest)} private feedback candidates; unchanged project copies verified")


if __name__ == "__main__":
    main()
