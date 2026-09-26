"""Read-only visual candidate ranking for existing travel web images.

This is a discovery aid, not proof of provenance or publication approval.
It never writes to the original archive or to the project.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
TRIPS = ("norwegen-2018", "sardinien-2019", "italien-2021")
ARCHIVES = {
    "norwegen-2018": Path(r"E:\_fotos_original\urlaubsSammlungen\norwegen"),
    "sardinien-2019": Path(r"E:\_fotos_original\urlaubsSammlungen\sardinien2019"),
    "italien-2021": Path(r"E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021"),
}


def signature(path: Path) -> np.ndarray:
    with Image.open(path) as source:
        source.draft("L", (128, 128))
        image = ImageOps.exif_transpose(source).convert("L")
        image = ImageOps.fit(image, (64, 64), method=Image.LANCZOS)
        pixels = np.asarray(image, dtype=np.float32).ravel()
    pixels -= pixels.mean()
    norm = np.linalg.norm(pixels)
    return pixels / norm if norm else pixels


def main() -> None:
    if "--dated-links" in sys.argv:
        groups = [
            (
                [ROOT / "assets/reisen/sardinien-2019" / name for name in (
                    "bikepause-im-gruenen-natur.png", "julie-felsen-meer-natur.png",
                    "rote-felskueste-natur.png")],
                [Path(r"E:\_fotos_original\_eigene_fotos\_olympus_M1\2019") / day
                 for day in ("2019-05-18", "2019-05-22", "2019-05-30", "2019-06-01")],
            ),
            (
                [ROOT / "assets/reisen/italien-2021/treibholz-strand-natur.png"],
                [Path(r"E:\_fotos_original\_eigene_fotos\_olympus_M1\2021") / day
                 for day in ("2021-09-21", "2021-09-22", "2021-09-23")],
            ),
        ]
        output = []
        for web_images, roots in groups:
            candidates = [(path, signature(path)) for source_root in roots
                          for path in source_root.glob("*.JPG")]
            for web in web_images:
                web_signature = signature(web)
                ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                                 for source, source_signature in candidates), reverse=True)
                output.append({"web_image": str(web.relative_to(ROOT)).replace("\\", "/"),
                               "candidates": [{"source": str(source).replace("\\", "/"),
                                               "similarity": round(score, 4)}
                                              for score, source in ranked[:5]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    if "--supplied-2021" in sys.argv:
        archive = Path(r"E:\_fotos_original\_eigene_fotos\_olympus_M1\2021\2021-09-21")
        candidates = [(path, signature(path)) for path in archive.glob("*")
                      if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png"}]
        web_images = [
            ROOT / "assets/bikes/scott-reise-2026-gallery-v2.webp",
            ROOT / "assets/bikes/scott-reise-2026-v1.webp",
            *(ROOT / "assets/reisen" / trip / name for trip, name in [
                ("norwegen-2018", "kochen-am-zelt-natur.png"),
                ("sardinien-2019", "bikepause-im-gruenen-natur.png"),
                ("sardinien-2019", "julie-felsen-meer-natur.png"),
                ("sardinien-2019", "rote-felskueste-natur.png"),
                ("italien-2021", "alberobello-trulli-natur.png"),
                ("italien-2021", "treibholz-strand-natur.png"),
            ]),
        ]
        output = []
        for web in web_images:
            web_signature = signature(web)
            ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                             for source, source_signature in candidates), reverse=True)
            output.append({"web_image": str(web.relative_to(ROOT)).replace("\\", "/"),
                           "candidates": [{"source": str(source).replace("\\", "/"),
                                           "similarity": round(score, 4)}
                                          for score, source in ranked[:3]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    if "--scott-new" in sys.argv:
        source_roots = [
            Path(r"E:\_fotos_original\_eigene_fotos\_olympus_M1\2020\2020-10-13"),
            ROOT / "review" / "selected-originals" / "scott-genius",
        ]
        candidates = []
        for source_root in source_roots:
            for path in source_root.glob("*"):
                if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png"}:
                    candidates.append((path, signature(path)))
        output = []
        for web in sorted((ROOT / "assets" / "bikes").glob("scott-*.webp")):
            web_signature = signature(web)
            ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                             for source, source_signature in candidates), reverse=True)
            output.append({"web_image": str(web.relative_to(ROOT)).replace("\\", "/"),
                           "candidates": [{"source": str(source).replace("\\", "/"),
                                           "similarity": round(score, 4)}
                                          for score, source in ranked[:3]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    if "--scott" in sys.argv:
        archive = Path(r"E:\_fotos_original\handy_fotos")
        candidates = []
        for path in archive.rglob("*"):
            if not path.is_file() or path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            try:
                candidates.append((path, signature(path)))
            except (OSError, ValueError):
                continue
        output = []
        for web in sorted((ROOT / "assets" / "bikes").glob("scott-*.webp")):
            web_signature = signature(web)
            ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                             for source, source_signature in candidates), reverse=True)
            output.append({"web_image": str(web.relative_to(ROOT)).replace("\\", "/"),
                           "candidates": [{"source": str(source).replace("\\", "/"),
                                           "similarity": round(score, 4)}
                                          for score, source in ranked[:3]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    if "--shared-unresolved" in sys.argv:
        pairs = [
            ("norwegen-2018/kochen-am-zelt-natur.png", "DSC_1504"),
            ("sardinien-2019/bikepause-im-gruenen-natur.png", "DSC_0105"),
            ("sardinien-2019/julie-felsen-meer-natur.png", "DSC_0177"),
            ("sardinien-2019/rote-felskueste-natur.png", "DSC_0012"),
            ("italien-2021/alberobello-trulli-natur.png", "DSC_0063"),
            ("italien-2021/treibholz-strand-natur.png", "DSC_0076"),
        ]
        archive = Path(r"E:\_fotos_original\handy_fotos")
        files = [path for path in archive.rglob("*")
                 if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg"}]
        output = []
        for relative, stem in pairs:
            web = ROOT / "assets" / "reisen" / relative
            web_signature = signature(web)
            candidates = [(path, signature(path)) for path in files
                          if path.stem.upper().startswith(stem)]
            ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                             for source, source_signature in candidates), reverse=True)
            output.append({"web_image": str(web.relative_to(ROOT)).replace("\\", "/"),
                           "candidates": [{"source": str(source).replace("\\", "/"),
                                           "similarity": round(score, 4)}
                                          for score, source in ranked[:3]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    if "--vehicle" in sys.argv:
        manifest = json.loads((ROOT / "assets" / "hero-selection" / "candidates.json").read_text(encoding="utf-8"))
        sources = [Path(path) for path in manifest["vehicle"]]
        sources += list((ROOT / "assets" / "review").glob("*.png"))
        sources += list((ROOT / "assets" / "hero-selection").glob("vehicle*.jpg"))
        candidates = [(source, signature(source)) for source in sources if source.is_file()]
        output = []
        for web_image in sorted((ROOT / "assets" / "vehicle").glob("*.png")):
            web_signature = signature(web_image)
            ranked = sorted(((float(np.dot(web_signature, source_signature)), source)
                             for source, source_signature in candidates), reverse=True)
            output.append({"web_image": str(web_image.relative_to(ROOT)).replace("\\", "/"),
                           "candidates": [{"source": str(source).replace("\\", "/"),
                                           "similarity": round(score, 4)}
                                          for score, source in ranked[:5]]})
        print(json.dumps(output, ensure_ascii=False, indent=2))
        return
    output = []
    use_archive = "--archive" in sys.argv or "--archive-all" in sys.argv
    for trip in TRIPS:
        source_root = ARCHIVES[trip] if use_archive else ROOT / "reisebilder-originale" / trip
        originals = sorted(source_root.rglob("*")) if use_archive else sorted(source_root.glob("*"))
        originals = [path for path in originals if path.is_file() and path.suffix.lower() in {".jpg", ".jpeg", ".png"}]
        if use_archive and "--archive-all" not in sys.argv:
            project_root = ROOT / "reisebilder-originale" / trip
            stems = {re.sub(r"_\d+$", "", path.stem).lower()
                     for path in project_root.glob("*") if path.is_file()}
            stems.update(path.stem.lower() for path in project_root.glob("*") if path.is_file())
            originals = [path for path in originals if path.stem.lower() in stems]
        original_signatures = []
        for path in originals:
            try:
                original_signatures.append((path, signature(path)))
            except (OSError, ValueError):
                continue
        web_images = sorted((ROOT / "assets" / "reisen" / trip).glob("*-natur.png"))
        for web_image in web_images:
            web_signature = signature(web_image)
            ranked = sorted(
                ((float(np.dot(web_signature, source_signature)), source)
                 for source, source_signature in original_signatures),
                reverse=True,
            )
            output.append({
                "web_image": str(web_image.relative_to(ROOT)).replace("\\", "/"),
                "candidates": [
                    {"source": str(source if use_archive else source.relative_to(ROOT)).replace("\\", "/"),
                     "similarity": round(score, 4)}
                    for score, source in ranked[:3]
                ],
            })
    if "--only-unresolved" in sys.argv:
        unresolved = {
            "kochen-am-zelt-natur.png", "bikepause-im-gruenen-natur.png",
            "julie-felsen-meer-natur.png", "rote-felskueste-natur.png",
            "alberobello-trulli-natur.png", "treibholz-strand-natur.png",
        }
        output = [item for item in output if Path(item["web_image"]).name in unresolved]
    print(json.dumps(output, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
