"""Build browser and mobile icons from the approved VanVenture patch logo."""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "assets" / "vanventure-logo-transparent.png"

with Image.open(SOURCE) as source:
    logo = source.convert("RGBA")
    lanczos = getattr(Image, "Resampling", Image).LANCZOS
    if logo.width != logo.height:
        raise ValueError("The logo source must be square")
    logo.save(ROOT / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
    for size in (96, 192, 512):
        logo.resize((size, size), lanczos).save(
            ROOT / f"favicon-{size}x{size}.png", optimize=True
        )
    # iOS uses the entire square; a dark base preserves the patch edge.
    touch = Image.new("RGBA", (180, 180), "#17191b")
    touch.alpha_composite(logo.resize((180, 180), lanczos))
    touch.convert("RGB").save(ROOT / "apple-touch-icon.png", optimize=True)
