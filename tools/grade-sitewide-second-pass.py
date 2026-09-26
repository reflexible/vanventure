"""Private, stronger motif-aware review grades; never publishes or overwrites sources."""

import argparse
from hashlib import sha256
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
FIRST = ROOT / "review/graded-previews"
INPUTS = {
    1: FIRST / "sitewide-2026-09-24/manifest.json",
    2: FIRST / "sitewide-round2-2026-09-24/manifest.json",
    3: FIRST / "sitewide-round3-2026-09-24/manifest.json",
}
TUNING = {
    # contrast, local separation, highlight restraint, green support,
    # blue restraint, warm-earth support, shadow lift
    "coast": (1.075, 0.13, 0.047, 0.16, 0.095, 0.045, 0.012),
    "forest": (1.09, 0.17, 0.035, 0.30, 0.055, 0.045, 0.026),
    "overcast": (1.115, 0.18, 0.055, 0.23, 0.060, 0.035, 0.026),
    "grass": (1.085, 0.13, 0.040, 0.28, 0.045, 0.025, 0.018),
    "warm": (1.075, 0.13, 0.055, 0.13, 0.050, 0.065, 0.014),
    "neutral": (1.085, 0.15, 0.040, 0.14, 0.050, 0.030, 0.018),
    "indoor": (1.085, 0.12, 0.045, 0.08, 0.025, 0.015, 0.025),
}
SAFE_THIRD = {
    "assets/bikes/sardinien-mountainbikes-meer-v1.webp",
    "assets/reisen/sardinien-2019/mountainbikes-am-meer-natur.png",
    "assets/riverstar/gallery/kajak-03.jpg",
    "assets/riverstar/gallery/kajak-10.jpg",
}
WITHHELD_SECOND = {
    "assets/reisen/italien-2021/gallery/dsc-1719.jpg",
    "assets/reisen/norwegen-2018/sabine-julie-bergsee-natur.png",
}


def digest(path):
    h = sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()


def smoothstep(low, high, values):
    t = np.clip((values - low) / (high - low), 0, 1)
    return t * t * (3 - 2 * t)


def grade(image, profile):
    values = TUNING[profile]
    contrast, local, highlight, green_gain, blue_cut, warm_gain, lift = values
    rgb = np.asarray(image, dtype=np.float32) / 255.0
    luma = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    low, median, high = np.percentile(luma[::8, ::8], [5, 50, 95])
    span = high - low
    # Per-image measurements keep the grading responsive to the actual scene.
    contrast += float(np.clip((0.70 - span) * 0.10, -0.025, 0.045))
    highlight *= float(np.clip((high - 0.58) / 0.30, 0.45, 1.25))
    lift *= float(np.clip((0.28 - low) / 0.20, 0.4, 1.4))
    low_frequency = np.asarray(
        Image.fromarray(np.uint8(luma * 255 + 0.5), "L").filter(ImageFilter.GaussianBlur(16)),
        dtype=np.float32,
    ) / 255.0
    detail = np.clip(luma - low_frequency, -0.08, 0.08)
    target = 0.008 + contrast * (luma - 0.008)
    target += lift * (1 - luma) ** 2
    target -= highlight * smoothstep(0.68, 0.99, luma)
    target += local * detail
    graded = np.clip(rgb * (np.clip(target, 0, 1) / np.maximum(luma, 0.025))[..., None], 0, 1)

    if profile == "indoor":
        # Tungsten cast correction responds to the measured channel imbalance.
        warm_cast = float(np.clip(np.mean(graded[..., 0] - graded[..., 2]), 0, 0.22))
        graded[..., 0] *= 1 - 0.22 * warm_cast
        graded[..., 2] *= 1 + 0.32 * warm_cast

    green = smoothstep(0.008, 0.11, graded[..., 1] - graded[..., 0])
    green *= smoothstep(0.012, 0.11, graded[..., 1] - graded[..., 2])
    blue = smoothstep(0.025, 0.15, graded[..., 2] - graded[..., 0])
    warm = smoothstep(0.025, 0.13, graded[..., 0] - graded[..., 2])
    mean = graded @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    saturation = 1 + green_gain * green - blue_cut * blue + warm_gain * warm
    graded = mean[..., None] + (graded - mean[..., None]) * saturation[..., None]
    graded *= (1 - 0.026 * green)[..., None]
    return Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB"), {
        "luma5": round(float(low), 4), "luma50": round(float(median), 4),
        "luma95": round(float(high), 4), "measuredContrast": round(float(contrast), 4),
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--batch", type=int, choices=(1, 2, 3), required=True)
    args = parser.parse_args()
    records = json.loads(INPUTS[args.batch].read_text(encoding="utf-8"))
    output = FIRST / f"sitewide-second-pass-round{args.batch}-2026-09-24"
    if output.exists() and any(output.iterdir()):
        raise SystemExit(f"Refusing to overwrite prior review: {output}")
    if output.resolve().parent != FIRST.resolve():
        raise SystemExit("Output escaped project review folder")
    prepared = []
    for record in records:
        source = (ROOT / record["projectCopy"]).resolve()
        try:
            source.relative_to(ROOT.resolve())
        except ValueError:
            raise SystemExit(f"Source copy outside project: {source}")
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project source hash differs: {source}")
        usable = source
        if source.suffix.lower() == ".heic":
            usable = INPUTS[args.batch].parent / f"{source.stem}-source-conversion.jpg"
            if not usable.is_file():
                raise SystemExit(f"Private HEIC conversion missing: {usable}")
        prepared.append((record, source, usable))
    output.mkdir(parents=True, exist_ok=False)
    manifest = []
    lanczos = getattr(getattr(Image, "Resampling", Image), "LANCZOS")
    for index, (record, source, usable) in enumerate(prepared, 1):
        with Image.open(usable) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail((1800, 1800), lanczos)
            result, measured = grade(image, record["profile"])
        target = output / (f"{index:02d}-" + Path(record["reviewDerivative"]).name)
        result.save(target, "JPEG", quality=92, subsampling=0, optimize=True)
        if digest(source) != record["sourceSha256"]:
            raise SystemExit(f"Project source changed during processing: {source}")
        safe = (args.batch == 1 or
                (args.batch == 2 and record["webAsset"] not in WITHHELD_SECOND) or
                (args.batch == 3 and record["webAsset"] in SAFE_THIRD))
        manifest.append({"webAsset": record["webAsset"], "projectCopy": record["projectCopy"],
                         "sourceSha256": record["sourceSha256"], "profile": record["profile"],
                         "measurement": measured, "reviewDerivative": str(target.relative_to(ROOT)),
                         "derivativeSha256": digest(target), "safeForChatPreview": safe,
                         "status": "SECOND_PASS_PRIVATE_REVIEW; visual, privacy and publication approval pending"})
        print(f"{index}/{len(prepared)} {record['webAsset']}", flush=True)
    (output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifest)} private second-pass candidates; all source hashes unchanged")


if __name__ == "__main__":
    main()
