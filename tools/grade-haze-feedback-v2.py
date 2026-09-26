"""Focused, non-generative haze correction for user feedback on photos 02 and 11."""

from hashlib import sha256
import importlib.util
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "review/graded-previews/user-feedback-haze-v2-2026-09-24"
PREVIOUS = ROOT / "review/graded-previews/user-feedback-2026-09-24"
BASE = ROOT / "review/graded-previews/sitewide-second-pass-round1-2026-09-24/manifest.json"
NUMBERS = (2, 11)


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def smoothstep(low, high, values):
    t = np.clip((values - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def focused_dehaze(image, number):
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    height, width = rgb.shape[:2]
    x = np.linspace(0, 1, width, dtype=np.float32)[None, :]
    y = np.linspace(0, 1, height, dtype=np.float32)[:, None]
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    bright = smoothstep(0.67, 0.97, luma)
    blur = Image.fromarray(np.uint8(luma * 255 + 0.5), "L").filter(ImageFilter.GaussianBlur(11))
    detail = np.clip(luma - np.asarray(blur, dtype=np.float32) / 255.0, -0.055, 0.055)

    if number == 2:
        # Only the distant right-hand vegetation receives the stronger pass.
        # The pale sky/field cannot reveal texture absent from the original.
        region = smoothstep(0.59, 0.78, x) * smoothstep(0.20, 0.38, y)
        region *= 1 - smoothstep(0.68, 0.84, y)
        foliage = smoothstep(-0.035, 0.06, rgb[..., 1] - rgb[..., 0])
        foliage *= smoothstep(0.015, 0.11, rgb[..., 1] - rgb[..., 2])
        weight = region * foliage * (1 - 0.70 * bright)
        target = rgb * (1 - 0.15 * weight[..., None])
        target[..., 0] *= 1 - 0.025 * weight
        target[..., 1] *= 1 + 0.030 * weight
        target[..., 2] *= 1 - 0.07 * weight
        target += (0.36 * detail * weight)[..., None]
        note = "Rechte ferne Vegetation stärker entdunstet; ausgebrannter Himmel/Feld bleiben quellgetreu."
        roi = (0.66, 0.35, 0.98, 0.66)
    elif number == 11:
        # Soft atmospheric-scattering correction only over recorded land.
        # High-luma sky and water highlights stay outside the strong blend.
        landscape = smoothstep(0.22, 0.34, y) * (1 - smoothstep(0.57, 0.75, y))
        weight = landscape * (1 - 0.75 * bright)
        air = np.array([0.78, 0.86, 0.96], dtype=np.float32)
        transmission = 0.73
        clearer = np.clip((rgb - (1 - transmission) * air) / transmission, 0, 1)
        target = rgb * (1 - weight[..., None]) + clearer * weight[..., None]
        target[..., 1] += 0.021 * weight
        target[..., 2] -= 0.045 * weight
        target += (0.28 * detail * weight)[..., None]
        note = "Ferne Berge mit stärkerer lokaler Kontrast- und Blauschleierkorrektur; keine rekonstruierten Details."
        roi = (0.12, 0.27, 0.89, 0.59)
    else:
        raise ValueError(number)

    target = np.clip(target, 0, 1)
    x0, y0, x1, y1 = roi
    crop = np.s_[int(y0*height):int(y1*height), int(x0*width):int(x1*width)]
    old_luma = luma[crop]
    new_luma = target[crop] @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    metrics = {"roi": roi, "lumaStdBefore": round(float(old_luma.std()), 4),
               "lumaStdAfter": round(float(new_luma.std()), 4)}
    return Image.fromarray(np.uint8(target * 255 + 0.5), "RGB"), note, metrics


def main():
    if OUTPUT.exists() or OUTPUT.is_symlink():
        raise SystemExit(f"Refusing to overwrite prior review: {OUTPUT}")
    if OUTPUT.resolve().parent != (ROOT / "review/graded-previews").resolve():
        raise SystemExit("Output escaped private project review folder")
    spec = importlib.util.spec_from_file_location("feedback_v1", ROOT / "tools/grade-user-feedback-previews.py")
    feedback = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(feedback)
    base_spec = importlib.util.spec_from_file_location("sitewide_base", ROOT / "tools/grade-sitewide-second-pass.py")
    base = importlib.util.module_from_spec(base_spec)
    base_spec.loader.exec_module(base)
    records = json.loads(BASE.read_text(encoding="utf-8"))
    previous = {r["number"]: r for r in json.loads((PREVIOUS / "manifest.json").read_text(encoding="utf-8")) if isinstance(r["number"], int)}
    prepared = []
    for number in NUMBERS:
        record = records[number-1]
        old = previous[number]
        source = (ROOT / record["projectCopy"]).resolve()
        if not source.is_relative_to(ROOT.resolve()) or digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Protected project copy differs: {number}")
        if digest(ROOT / old["reviewDerivative"]) != old["derivativeSha256"]:
            raise SystemExit(f"Previous review derivative differs: {number}")
        prepared.append((number, record, old, source))
    OUTPUT.mkdir(parents=True, exist_ok=False)
    manifest = []
    for number, record, old, source in prepared:
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
            baseline, _ = base.grade(image, record["profile"])
            first, _ = feedback.tailor(baseline, number)
            result, note, metrics = focused_dehaze(first, number)
        target = OUTPUT / f"{number:02d}-haze-v2.jpg"
        result.save(target, "JPEG", quality=93, subsampling=0, optimize=True)
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project copy changed during processing: {number}")
        manifest.append({"number": number, "webAsset": record["webAsset"],
                         "projectCopy": record["projectCopy"], "sourceSha256": record["sourceSha256"],
                         "previousDerivative": old["reviewDerivative"],
                         "previousSha256": old["derivativeSha256"],
                         "reviewDerivative": str(target.relative_to(ROOT)),
                         "derivativeSha256": digest(target), "operation": note,
                         "measurement": metrics,
                         "status": "PRIVATE_REVIEW; 100% visual and user approval pending"})
        print(f"{number:02d} {metrics}", flush=True)
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("2/2 project copies unchanged; versioned local derivatives prepared")


if __name__ == "__main__":
    main()
