"""Create non-publishing first-pass previews from checked project original copies.

Only the explicitly reviewed, privacy-safe motifs below are eligible. This is
not a bulk publication tool and never writes to an original or public asset.
"""

import hashlib
import json
import sys
import subprocess
from os.path import commonpath
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "review/graded-previews/sitewide-2026-09-24"
REGISTERS = [
    "docs/scott-bildquellen.json", "docs/hero-bildquellen.json",
    "docs/reiseberichte-bildquellen.json", "docs/site-assets-bildquellen.json",
    "docs/riverstar/bildquellen.json", "docs/kajak-galerie-bildquellen.json",
    "review/selected-originals-manifest.json",
]

# Profile is motif-specific; measured tonal/chroma statistics further vary the
# adjustment within each profile. Person/plate-sensitive motifs stay outside.
SELECTED = {
    "assets/bikes/scott-anfang-2018-v1.webp": "indoor",
    "assets/bikes/scott-baumtour-2022-v1.webp": "forest",
    "assets/bikes/scott-fahrwerk-detail-2022-v1.webp": "warm",
    "assets/bikes/scott-genius-black-beauty-2020-v1.webp": "overcast",
    "assets/bikes/scott-rahmen-detail-2020-v1.webp": "overcast",
    "assets/bikes/scott-schlammtour-2024-v1.webp": "neutral",
    "assets/bikes/scott-tourenpause-2022-v1.webp": "forest",
    "assets/bikes/scott-wiesenpause-2019-v1.webp": "grass",
    "assets/hero-norway.jpg": "coast",
    "assets/hero-norway-v1.webp": "coast",
    "assets/heroes/norwegen-2018.jpg": "coast",
    "assets/heroes/sardinien-2019.jpg": "coast",
    "assets/reisen/italien-2021/campo-imperatore-natur.png": "overcast",
    "assets/reisen/italien-2021/gallery/dsc-0003-5.jpg": "coast",
    "assets/reisen/italien-2021/gallery/dsc-1703.jpg": "coast",
    "assets/reisen/italien-2021/gallery/dsc-1744.jpg": "warm",
    "assets/reisen/italien-2021/gallery/dsc-1759.jpg": "forest",
    "assets/reisen/italien-2021/gallery/dsc-1805.jpg": "coast",
    "assets/reisen/italien-2021/gallery/dsc-1809.jpg": "overcast",
    "assets/reisen/italien-2021/lago-di-ledro-abend-natur.png": "coast",
    "assets/reisen/italien-2021/toskana-abendlicht-natur.png": "warm",
    "assets/reisen/italien-2021/treibholz-strand-natur.png": "coast",
    "assets/reisen/norwegen-2018/berge-bei-flaam-natur.png": "forest",
    "assets/reisen/norwegen-2018/gallery/p7050302.jpg": "overcast",
    "assets/reisen/norwegen-2018/gallery/p7100481.jpg": "coast",
    "assets/reisen/norwegen-2018/gallery/p7100486.jpg": "coast",
    "assets/reisen/norwegen-2018/lindesnes-fyr-magazin-natur.png": "coast",
    "assets/reisen/norwegen-2018/trolltunga-ringedalsvatnet-natur.png": "coast",
    "assets/reisen/sardinien-2019/gallery/dsc-0268.jpg": "coast",
    "assets/reisen/sardinien-2019/gallery/dsc-0291.jpg": "coast",
    "assets/reisen/sardinien-2019/julie-felsen-meer-natur.png": "coast",
    "assets/reisen/sardinien-2019/rote-felskueste-natur.png": "overcast",
    "assets/riverstar/gallery/kajak-04.jpg": "coast",
    "assets/riverstar/gallery/kajak-05.jpg": "forest",
    "assets/riverstar/gallery/kajak-07.jpg": "coast",
    "assets/riverstar/gallery/kajak-08.jpg": "coast",
    "assets/riverstar/riverstar-fjord-gespiegelt.png": "coast",
}

SECOND = {
    "assets/reisen/italien-2021/gallery/dsc-1719.jpg": "warm",
    "assets/reisen/norwegen-2018/sabine-julie-am-wasser-natur.png": "coast",
    "assets/reisen/norwegen-2018/sabine-julie-bergsee-natur.png": "coast",
    "assets/reisen/sardinien-2019/gallery/dsc-0279.jpg": "coast",
    "assets/riverstar/gallery/kajak-01.jpg": "coast",
    "assets/riverstar/gallery/kajak-02.jpg": "coast",
    "assets/riverstar/riverstar-am-ufer.jpg": "coast",
    "assets/riverstar/riverstar-julie.jpg": "coast",
}

THIRD = {
    "assets/bikes/sardinien-bikes-am-camper-v1.webp": "forest",
    "assets/bikes/sardinien-mountainbikes-meer-v1.webp": "coast",
    "assets/bikes/scott-italien-bergpause-2021-v1.webp": "forest",
    "assets/bikes/scott-leogang-2020-v1.webp": "overcast",
    "assets/bikes/scott-leogang-park-2020-v1.webp": "overcast",
    "assets/bikes/scott-leogang-trail-2020-v1.webp": "forest",
    "assets/bikes/scott-reise-2026-gallery-v2.webp": "forest",
    "assets/bikes/scott-reise-2026-v1.webp": "forest",
    "assets/bikes/scott-seitenprofil-2019-v1.webp": "neutral",
    "assets/bikes/scott-wintertour-2019-v1.webp": "overcast",
    "assets/reisen/italien-2021/california-ledro-natur.png": "forest",
    "assets/reisen/norwegen-2018/california-flaam-natur.png": "overcast",
    "assets/reisen/norwegen-2018/gallery/p7050273.jpg": "coast",
    "assets/reisen/norwegen-2018/gallery/p7050295.jpg": "coast",
    "assets/reisen/norwegen-2018/gallery/p7060417.jpg": "overcast",
    "assets/reisen/norwegen-2018/kochen-am-zelt-natur.png": "overcast",
    "assets/reisen/sardinien-2019/gallery/dsc-0273.jpg": "forest",
    "assets/reisen/sardinien-2019/gallery/dsc-0280.jpg": "indoor",
    "assets/reisen/sardinien-2019/gallery/dsc-0307.jpg": "forest",
    "assets/reisen/sardinien-2019/mountainbikes-am-meer-natur.png": "coast",
    "assets/reisen/sardinien-2019/sabine-pasta-natur.png": "indoor",
    "assets/riverstar/california-camping-anonymisiert.png": "forest",
    "assets/riverstar/gallery/kajak-03.jpg": "forest",
    "assets/riverstar/gallery/kajak-09.jpg": "forest",
    "assets/riverstar/gallery/kajak-10.jpg": "coast",
    "assets/riverstar/gallery/kajak-11.jpg": "forest",
    "assets/riverstar/gallery/kajak-12.jpg": "coast",
    "assets/riverstar/gallery/kajak-13.jpg": "forest",
    "assets/riverstar/gallery/kajak-14.jpg": "coast",
}

SOURCE_ALIASES = {
    "assets/bikes/sardinien-bikes-am-camper-v1.webp": "assets/reisen/sardinien-2019/gallery/dsc-0273.jpg",
    "assets/bikes/sardinien-mountainbikes-meer-v1.webp": "assets/reisen/sardinien-2019/gallery/dsc-0279.jpg",
}
HEIF_CONVERTER = Path(r"C:\Users\helmu\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\libheif\libheif\bin\heif-convert.exe")

PROFILES = {
    "indoor": (0.024, 0.010, 0.978, 0.10, 0.04, 0.02),
    "forest": (0.018, 0.012, 0.972, 0.12, 0.035, 0.02),
    "warm": (0.010, 0.006, 0.990, 0.045, 0.055, 0.01),
    "overcast": (0.022, 0.016, 0.980, 0.075, 0.045, 0.025),
    "neutral": (0.016, 0.010, 0.982, 0.07, 0.04, 0.02),
    "grass": (0.020, 0.008, 0.976, 0.13, 0.035, 0.02),
    "coast": (0.015, 0.010, 0.980, 0.045, 0.10, 0.025),
}


def digest(path):
    hasher = hashlib.sha256()
    with path.open("rb") as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b""):
            hasher.update(chunk)
    return hasher.hexdigest()


def records():
    result = {}
    for relative in REGISTERS:
        data = json.loads((ROOT / relative).read_text(encoding="utf-8"))
        if isinstance(data, dict):
            for name, record in data.items():
                result[f"assets/bikes/{name}"] = record
        else:
            for record in data:
                if "web_image" in record:
                    result[record["web_image"].replace("\\", "/")] = record
                elif "trip" in record:
                    name = Path(record["source_path"]).stem.lower().replace("_", "-")
                    result[f"assets/reisen/{record['trip']}/gallery/{name}.jpg"] = record
    return result


def project_copy(record):
    for key in ("unchanged_project_copy", "unchangedProjectCopy",
                "project_original", "unchanged_copy"):
        if record.get(key):
            return Path(record[key])
    if record.get("selectedMappingSource"):
        name = record["selectedMappingSource"]
        candidate = next((item for item in record.get("candidateGooglePhotosSources", [])
                          if item["filename"] == name), None)
        if candidate:
            return Path(candidate["projectCopy"])
    return None


def expected_hash(record):
    for key in ("sourceSha256", "sha256"):
        if record.get(key):
            return record[key].lower()
    if record.get("selectedMappingSource"):
        name = record["selectedMappingSource"]
        candidate = next((item for item in record.get("candidateGooglePhotosSources", [])
                          if item["filename"] == name), None)
        if candidate:
            return candidate["sha256"].lower()
    return None


def grade(opened, profile):
    lifted, highlight, saturation, green, blue, warm = PROFILES[profile]
    rgb = np.asarray(opened, dtype=np.float32) / 255.0
    luma = np.sum(rgb * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    low, high = np.percentile(luma[::8, ::8], [5, 95])
    # Measured source range tempers the scene-specific curve; no fixed LUT.
    shadow_factor = np.clip((0.19 - low) * 0.18, -0.008, 0.021)
    highlight_factor = np.clip((high - 0.80) * 0.07, -0.008, 0.014)
    tone = np.clip(lifted + (0.993 - highlight_factor) * luma
                   + (0.029 + shadow_factor) * (1 - luma) ** 3
                   - highlight * luma ** 3, 0, 1)
    graded = np.clip(rgb * (tone / np.maximum(luma, 0.025))[..., None], 0, 1)
    neutral = np.sum(graded * np.array([0.2126, 0.7152, 0.0722], dtype=np.float32), axis=2)
    green_mask = np.clip((graded[..., 1] - graded[..., 0] + 0.02) * 2.5, 0, 1)
    blue_mask = np.clip((graded[..., 2] - graded[..., 0] - 0.02) * 2.0, 0, 1)
    warm_mask = np.clip((graded[..., 0] - graded[..., 2] - 0.02) * 2.0, 0, 1)
    amount = np.clip(saturation - green * green_mask - blue * blue_mask
                     + warm * warm_mask, 0.80, 1.02)
    graded = neutral[..., None] + (graded - neutral[..., None]) * amount[..., None]
    graded[..., 0] += warm_mask * 0.004
    graded[..., 2] -= warm_mask * 0.002
    return Image.fromarray(np.uint8(np.clip(graded * 255 + 0.5, 0, 255)), "RGB"), (round(float(low), 4), round(float(high), 4))


def main():
    batch_number = 3 if "--batch=3" in sys.argv else 2 if "--batch=2" in sys.argv else 1
    batch = THIRD if batch_number == 3 else SECOND if batch_number == 2 else SELECTED
    output = OUTPUT.with_name(f"sitewide-round{batch_number}-2026-09-24") if batch_number > 1 else OUTPUT
    if output.exists() and any(output.iterdir()):
        raise SystemExit(f"Refusing to overwrite existing review: {output}")
    known = records()
    prepared = []
    for asset, profile in batch.items():
        record = known.get(SOURCE_ALIASES.get(asset, asset))
        if not record:
            raise SystemExit(f"Missing source record: {asset}")
        source = project_copy(record)
        expected = expected_hash(record)
        if not source or not expected:
            raise SystemExit(f"Missing unchanged copy/hash: {asset}")
        source = source if source.is_absolute() else ROOT / source
        source = source.resolve()
        if commonpath([str(source), str(ROOT.resolve())]) != str(ROOT.resolve()):
            raise SystemExit(f"Source copy outside project: {source}")
        if digest(source) != expected:
            raise SystemExit(f"Source hash mismatch: {asset}")
        prepared.append((asset, profile, source, expected))
    output.mkdir(parents=True, exist_ok=True)
    manifest = []
    for asset, profile, source, expected in prepared:
        usable = source
        if source.suffix.lower() == ".heic":
            usable = output / (source.stem + "-source-conversion.jpg")
            if not HEIF_CONVERTER.exists() or usable.exists():
                raise SystemExit("HEIC converter absent or conversion would overwrite")
            subprocess.run([str(HEIF_CONVERTER), "-q", "95", str(source), str(usable)], check=True)
        with Image.open(usable) as opened:
            original = ImageOps.exif_transpose(opened).convert("RGB")
            original.thumbnail((1800, 1800), Image.LANCZOS)
            result, tonal_range = grade(original, profile)
        filename = asset.replace("assets/", "").replace("/", "--").rsplit(".", 1)[0] + "-review.jpg"
        destination = output / filename
        if destination.exists():
            raise SystemExit(f"Refusing to overwrite derivative: {destination}")
        result.save(destination, format="JPEG", quality=90, subsampling=0, optimize=True)
        if digest(source) != expected:
            raise SystemExit(f"Source changed during processing: {source}")
        manifest.append({"webAsset": asset, "projectCopy": str(source.relative_to(ROOT)),
                         "sourceSha256": expected, "profile": profile,
                         "measuredLuma5And95": tonal_range,
                         "reviewDerivative": str(destination.relative_to(ROOT)),
                         "derivativeSha256": digest(destination),
                         "status": "FIRST_PASS_PRIVATE_REVIEW_ONLY; privacy and full-resolution QA pending"})
    (output / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(manifest)} private first-pass previews; all project source hashes unchanged")


if __name__ == "__main__":
    main()
