"""Conservative Flaam color and explicitly approved lower-left pole removal.

All output is private review material, rebuilt from the unchanged project copy.
Only the named thin poles/catenary pieces are inpainted; no scenic replacement.
"""

from hashlib import sha256
import importlib.util
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "review/graded-previews/sitewide-second-pass-round1-2026-09-24/manifest.json"
OUTPUT = ROOT / "review/graded-previews/user-feedback-flaam-v3-2026-09-24"
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


def color(image):
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ LUMA
    height, width = luma.shape
    x = np.linspace(0, 1, width, dtype=np.float32)[None, :]
    y = np.linspace(0, 1, height, dtype=np.float32)[:, None]
    shadow = 1 - smoothstep(0.07, 0.48, luma)
    bright = smoothstep(0.55, 0.92, luma)
    foreground = smoothstep(0.45, 0.82, y)
    right_rock = smoothstep(0.60, 0.80, x) * smoothstep(0.23, 0.41, y)
    background = (smoothstep(0.12, 0.27, x) * (1 - smoothstep(0.60, 0.75, x))
                  * smoothstep(0.29, 0.41, y) * (1 - smoothstep(0.65, 0.77, y)))
    target = luma + 0.075 * foreground * shadow + 0.048 * right_rock * shadow
    target -= 0.14 * background * bright
    ratio = np.clip(target / np.maximum(luma, 0.035), 0.82, 1.36)
    result = np.clip(rgb * ratio[..., None], 0, 1)
    # Retain genuine forest texture but suppress amplified blue/purple sensor
    # chroma noise in the deepest shade; no foliage is painted in.
    deep = foreground * (1 - smoothstep(0.04, 0.19, luma))
    mean = result @ LUMA
    result = mean[..., None] + (result - mean[..., None]) * (1 - 0.38 * deep)[..., None]
    return Image.fromarray(np.uint8(np.clip(result * 255 + 0.5, 0, 255)), "RGB")


def pole_mask(size):
    mask = Image.new("L", size, 0)
    draw = ImageDraw.Draw(mask)
    # Coordinates measured at 1800×1350 against a private 100% crop.
    # Left-edge utility pole, left streetlamp, catenary mast/arms and a
    # second small streetlamp, all in the user's specified lower-left area.
    lines = [
        ([(4, 1255), (4, 1349)], 9),
        ([(43, 1173), (43, 1349)], 9),
        ([(39, 1173), (53, 1172)], 7),
        ([(242, 1255), (242, 1349)], 11),
        ([(242, 1278), (327, 1278)], 8),
        ([(249, 1312), (306, 1279)], 7),
        ([(252, 1308), (337, 1308)], 7),
        ([(436, 1231), (436, 1337)], 7),
        ([(430, 1232), (445, 1231)], 5),
    ]
    for points, width in lines:
        draw.line(points, fill=255, width=width, joint="curve")
        for px, py in points:
            radius = width // 2
            draw.ellipse((px-radius, py-radius, px+radius, py+radius), fill=255)
    return mask, lines


def inpaint(image, mask):
    # Discrete harmonic interpolation in thin, explicitly drawn masks only.
    # Operations are confined to the lower-left crop; other pixels stay exact.
    pixels = np.asarray(image, dtype=np.float32).copy()
    alpha = np.asarray(mask, dtype=np.uint8) > 0
    box = (0, 1150, 470, 1350)
    x0, y0, x1, y1 = box
    patch = pixels[y0:y1, x0:x1].copy()
    marked = alpha[y0:y1, x0:x1]
    if not marked.any() or alpha[:y0].any() or alpha[:, x1:].any():
        raise SystemExit("Pole mask escaped intended lower-left area")
    # Initialize with the nearest left/right unaffected pixels at each row.
    for row in range(patch.shape[0]):
        indices = np.flatnonzero(marked[row])
        for column in indices:
            left = column - 1
            right = column + 1
            while left >= 0 and marked[row, left]:
                left -= 1
            while right < patch.shape[1] and marked[row, right]:
                right += 1
            if left >= 0 and right < patch.shape[1]:
                patch[row, column] = (patch[row, left] + patch[row, right]) / 2
            elif right < patch.shape[1]:
                patch[row, column] = patch[row, right]
            elif left >= 0:
                patch[row, column] = patch[row, left]
    for _ in range(120):
        padded = np.pad(patch, ((1, 1), (1, 1), (0, 0)), mode="edge")
        averaged = (padded[:-2, 1:-1] + padded[2:, 1:-1]
                    + padded[1:-1, :-2] + padded[1:-1, 2:]) * 0.25
        patch[marked] = averaged[marked]
    pixels[y0:y1, x0:x1][marked] = patch[marked]
    result = Image.fromarray(np.uint8(np.clip(pixels + 0.5, 0, 255)), "RGB")
    before = np.asarray(image, dtype=np.uint8)
    after = np.asarray(result, dtype=np.uint8)
    if np.any(before[~alpha] != after[~alpha]):
        raise SystemExit("Retouch changed pixels outside named pole mask")
    return result, int(marked.sum())


def main():
    if OUTPUT.exists() or OUTPUT.is_symlink():
        raise SystemExit(f"Refusing to overwrite prior review: {OUTPUT}")
    if OUTPUT.resolve().parent != (ROOT / "review/graded-previews").resolve():
        raise SystemExit("Output escaped private project review folder")
    record = json.loads(BASE.read_text(encoding="utf-8"))[22]
    source = (ROOT / record["projectCopy"]).resolve()
    if not source.is_relative_to(ROOT.resolve()) or digest(source) != record["sourceSha256"]:
        raise SystemExit("Protected Flaam project copy differs")
    spec = importlib.util.spec_from_file_location("sitewide", ROOT / "tools/grade-sitewide-second-pass.py")
    base = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(base)
    with Image.open(source) as opened:
        original = ImageOps.exif_transpose(opened).convert("RGB")
        original.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        baseline, _ = base.grade(original, record["profile"])
        corrected = color(baseline)
    if corrected.size != (1800, 1350):
        raise SystemExit(f"Unexpected photo 23 size: {corrected.size}")
    mask, lines = pole_mask(corrected.size)
    retouched, mask_pixels = inpaint(corrected, mask)
    OUTPUT.mkdir(parents=True, exist_ok=False)
    color_path = OUTPUT / "23-color-v3.jpg"
    retouch_path = OUTPUT / "23-poles-v3.jpg"
    qa_path = OUTPUT / "23-poles-100-percent-qa.png"
    corrected.save(color_path, "JPEG", quality=93, subsampling=0, optimize=True)
    retouched.save(retouch_path, "JPEG", quality=93, subsampling=0, optimize=True)
    before_crop = corrected.crop((0, 1130, 470, 1350))
    after_crop = retouched.crop((0, 1130, 470, 1350))
    qa = Image.new("RGB", (940, 220))
    qa.paste(before_crop, (0, 0))
    qa.paste(after_crop, (470, 0))
    qa.save(qa_path)
    if digest(source) != record["sourceSha256"]:
        raise SystemExit("Flaam project copy changed during processing")
    manifest = {"number": 23, "webAsset": record["webAsset"],
                "projectCopy": record["projectCopy"], "sourceSha256": record["sourceSha256"],
                "colorDerivative": str(color_path.relative_to(ROOT)), "colorSha256": digest(color_path),
                "retouchedDerivative": str(retouch_path.relative_to(ROOT)), "retouchedSha256": digest(retouch_path),
                "qaCrop": str(qa_path.relative_to(ROOT)), "qaSha256": digest(qa_path),
                "maskLines": lines, "maskPixels": mask_pixels,
                "status": "PRIVATE_REVIEW; pole and color visual QA, user approval pending"}
    (OUTPUT / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"23 color/pole review created; {mask_pixels} explicitly masked pixels; project copy unchanged")


if __name__ == "__main__":
    main()
