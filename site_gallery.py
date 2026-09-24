"""Single build-time markup source for public photo galleries."""

from html import escape


def _attributes(values):
    return "".join(
        f" {escape(name, quote=True)}"
        if value is None else f' {escape(name, quote=True)}="{escape(str(value), quote=True)}"'
        for name, value in values.items()
    )


def _text_element(node):
    tag = node["tag"]
    if tag not in {"p", "h2", "span", "figcaption"}:
        raise ValueError(f"Unexpected gallery text element: {tag}")
    return f"<{tag}{_attributes(node.get('attrs', {}))}>{escape(node['text'])}</{tag}>"


def render_gallery(gallery):
    """Render one approved gallery structure from page-specific content data."""
    if not gallery.get("items"):
        return ""
    section_attrs = dict(gallery["section"])
    section_attrs.setdefault("data-photo-gallery", None)
    header = "".join(_text_element(node) for node in gallery["header"])
    if gallery.get("header_wrap"):
        header = f"<div>{header}</div>"
    tiles = []
    for item in gallery["items"]:
        image = f"<img{_attributes(item['image'])}>"
        if item["kind"] == "button":
            caption = _text_element(item["caption"])
            tiles.append(f"<button{_attributes(item['control'])}>{image}{caption}</button>")
        elif item["kind"] == "figure-link":
            zoom = _text_element(item["zoom"])
            caption = _text_element(item["caption"])
            tiles.append(
                f"<figure{_attributes(item.get('figure', {}))}><a{_attributes(item['control'])}>"
                f"{image}{zoom}</a>{caption}</figure>"
            )
        else:
            raise ValueError(f"Unexpected gallery tile kind: {item['kind']}")
    grid = f"<div{_attributes(gallery['grid'])}>{''.join(tiles)}</div>"
    return f"<section{_attributes(section_attrs)}>{header}{grid}</section>"


def travel_gallery(story):
    """Adapt the existing travel-story content to the shared gallery markup."""
    photos = story.get("gallery", [])
    if not photos:
        return ""
    def bilingual(tag, value, css_class=None):
        attrs = {}
        if css_class:
            attrs["class"] = css_class
        attrs["data-de"], attrs["data-en"] = value
        return {"tag": tag, "attrs": attrs, "text": value[0]}

    return render_gallery({
        "section": {"class": "story-gallery", "data-photo-gallery": None, "aria-label": "Fotogalerie"},
        "header": [
            bilingual("p", ["FOTOGALERIE", "PHOTO GALLERY"], "eyebrow"),
            bilingual("h2", ["Momente dieser Reise.", "Moments from this journey."]),
            bilingual("p", [
                "Bilder anklicken, um sie groß anzusehen. Mit den Pfeilen kannst du durch die Galerie blättern oder die Slideshow starten.",
                "Select an image to enlarge it. Use the arrows to browse the gallery or start the slideshow.",
            ], "gallery-intro"),
        ],
        "grid": {"class": "gallery-grid"},
        "items": [
            {"kind": "button", "control": {"class": "gallery-photo", "type": "button"},
             "image": {"src": photo["src"], "alt": photo["caption"][0], "loading": "lazy"},
             "caption": bilingual("span", photo["caption"], "gallery-caption")}
            for photo in photos
        ],
    })
