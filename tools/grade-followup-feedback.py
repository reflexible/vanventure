"""Motif-specific private follow-ups for photos 23, 26, 28, 36 and 50.

Each image is rebuilt from its unchanged project copy. Photo 23 pole removal
remains a separate, explicitly uncompleted operation in these color previews.
"""

from hashlib import sha256
import importlib.util
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "review/graded-previews/user-feedback-followup-2026-09-24"
BASE = ROOT / "review/graded-previews"
NUMBERS = (23, 26, 28, 36, 50)
LUMA = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def smoothstep(low, high, values):
    t = np.clip((values - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def prepare(image):
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ LUMA
    height, width = luma.shape
    x = np.linspace(0, 1, width, dtype=np.float32)[None, :]
    y = np.linspace(0, 1, height, dtype=np.float32)[:, None]
    blur = Image.fromarray(np.uint8(luma * 255 + 0.5), "L").filter(ImageFilter.GaussianBlur(11))
    detail = np.clip(luma - np.asarray(blur, dtype=np.float32) / 255.0, -0.06, 0.06)
    return rgb, luma, x, y, detail


def atmos(rgb, air, transmission):
    return np.clip((rgb - (1 - transmission) * np.array(air, dtype=np.float32)) / transmission, 0, 1)


def adjust(image, number):
    rgb, luma, x, y, detail = prepare(image)
    bright = smoothstep(0.58, 0.94, luma)
    shadow = 1 - smoothstep(0.08, 0.52, luma)
    result = rgb.copy()

    if number == 23:
        foreground = smoothstep(0.31, 0.79, y)
        distant = (smoothstep(0.12, 0.27, x) * (1 - smoothstep(0.61, 0.74, x))
                   * smoothstep(0.28, 0.40, y) * (1 - smoothstep(0.66, 0.79, y)))
        side_rock = smoothstep(0.65, 0.90, x) * smoothstep(0.18, 0.35, y)
        target_luma = luma + 0.22 * foreground * shadow + 0.08 * side_rock * shadow
        target_luma -= 0.16 * distant * bright
        result *= (np.clip(target_luma, 0, 1) / np.maximum(luma, 0.025))[..., None]
        note = "Schatten/Vordergrund samt Felsen stärker geöffnet, sonnigen Fernbereich gedämpft; Masten noch vorhanden."
    elif number == 26:
        far = np.exp(-(((x - 0.54) / 0.26) ** 2 + ((y - 0.47) / 0.20) ** 2) * 1.6)
        far *= smoothstep(0.25, 0.38, y) * (1 - 0.45 * bright)
        clearer = atmos(rgb, (0.72, 0.82, 0.91), 0.59)
        result = rgb * (1 - far[..., None]) + clearer * far[..., None]
        result[..., 1] += 0.013 * far
        result[..., 2] -= 0.038 * far
        result += (0.29 * detail * far)[..., None]
        note = "Dunst über dem fernen Fjord gezielt kräftiger reduziert; vorhandene Kanten getrennt, nichts rekonstruiert."
    elif number == 28:
        right = smoothstep(0.54, 0.85, x) * (1 - 0.52 * bright)
        clearer = atmos(rgb, (0.76, 0.85, 0.94), 0.60)
        result = rgb * (1 - right[..., None]) + clearer * right[..., None]
        result[..., 2] -= 0.027 * right
        result += (0.22 * detail * right)[..., None]
        central_flanks = (smoothstep(0.25, 0.38, x) * (1 - smoothstep(0.63, 0.76, x))
                          * (1 - smoothstep(0.23, 0.39, y)))
        result *= (1 - 0.11 * central_flanks * bright)[..., None]
        note = "Rechter Rand stärker entdunstet; zu helle mittlere Bergflanken zurückgenommen."
    elif number == 36:
        mountain = smoothstep(0.22, 0.39, y) * (1 - smoothstep(0.48, 0.61, y))
        mountain = mountain * smoothstep(0.18, 0.38, x) * (1 - 0.5 * bright)
        clearer = atmos(rgb, (0.72, 0.80, 0.88), 0.70)
        result = rgb * (1 - mountain[..., None]) + clearer * mountain[..., None]
        result += (0.18 * detail * mountain)[..., None]
        note = "Bisherige Farbprobe wieder als Basis; ausschließlich ferne Berge dezent klarer."
    elif number == 50:
        # Single-photo, user-authorized creative proposal: natural warmth and
        # softer highlight rolloff instead of the cold, heavy previous pass.
        rolloff = 0.15 * smoothstep(0.66, 0.98, luma)
        mids = 0.045 * (luma - 0.43)
        target_luma = luma + mids - rolloff + 0.035 * shadow
        subject = np.exp(-(((x - 0.46) / 0.24) ** 2 + ((y - 0.61) / 0.27) ** 2) * 2.0)
        target_luma += 0.038 * subject * shadow
        result *= (np.clip(target_luma, 0, 1) / np.maximum(luma, 0.025))[..., None]
        wood = smoothstep(0.03, 0.17, rgb[..., 0] - rgb[..., 2])
        result[..., 0] += 0.014 * wood
        result[..., 2] -= 0.010 * wood
        note = "Einzelmotiv-Vorschlag: natürlichere warme Holz-/Hauttonwerte, sanftere Lichter, klare Mitteltöne; Helmut sichtbar."
    else:
        raise ValueError(number)

    return Image.fromarray(np.uint8(np.clip(result * 255 + 0.5, 0, 255)), "RGB"), note


def main():
    if OUTPUT.exists() or OUTPUT.is_symlink():
        existing = {file.name for file in OUTPUT.iterdir()}
        expected = {f"{number:02d}-followup-v2.jpg" for number in NUMBERS}
        if "manifest.json" in existing or not existing.issubset(expected):
            raise SystemExit(f"Refusing to overwrite prior review: {OUTPUT}")
    if OUTPUT.resolve().parent != BASE.resolve():
        raise SystemExit("Output escaped private project review folder")
    base_spec = importlib.util.spec_from_file_location("sitewide", ROOT / "tools/grade-sitewide-second-pass.py")
    base = importlib.util.module_from_spec(base_spec)
    base_spec.loader.exec_module(base)
    feedback_spec = importlib.util.spec_from_file_location("feedback", ROOT / "tools/grade-user-feedback-previews.py")
    feedback = importlib.util.module_from_spec(feedback_spec)
    feedback_spec.loader.exec_module(feedback)
    records = []
    for batch in (1, 2, 3):
        records.extend(json.loads((BASE / f"sitewide-second-pass-round{batch}-2026-09-24/manifest.json").read_text(encoding="utf-8")))
    previous = {r["number"]: r for r in json.loads((BASE / "user-feedback-2026-09-24/manifest.json").read_text(encoding="utf-8")) if isinstance(r["number"], int)}
    prepared = []
    for number in NUMBERS:
        record = records[number-1]
        source = (ROOT / record["projectCopy"]).resolve()
        if not source.is_relative_to(ROOT.resolve()) or digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project source copy differs: {number}")
        prepared.append((number, record, source))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    manifest = []
    for number, record, source in prepared:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            baseline, _ = base.grade(image, record["profile"])
            first = feedback.tailor(baseline, number)[0] if number in (23, 26, 28) else baseline
            result, note = adjust(first, number)
        target = OUTPUT / f"{number:02d}-followup-v2.jpg"
        if not target.exists():
            result.save(target, "JPEG", quality=93, subsampling=0, optimize=True)
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project source copy changed: {number}")
        previous_record = previous[number]
        manifest.append({"number": number, "webAsset": record["webAsset"],
                         "projectCopy": record["projectCopy"], "sourceSha256": record["sourceSha256"],
                         "previousDerivative": previous_record["reviewDerivative"],
                         "previousSha256": previous_record["derivativeSha256"],
                         "reviewDerivative": str(target.relative_to(ROOT)),
                         "derivativeSha256": digest(target), "operation": note,
                         "status": "PRIVATE_REVIEW; visual and user approval pending"})
        print(f"{number:02d} {note}", flush=True)
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifest)}/{len(NUMBERS)} local follow-up derivatives; project copies unchanged")


if __name__ == "__main__":
    main()
