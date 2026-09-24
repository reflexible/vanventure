"""Shared build-time structures for activity and vehicle detail pages."""

from html import escape
import re


HERO_CLASS = {"activity": "kayak-page-hero", "equipment": "kayak-page-hero", "vehicle": "vehicle-hero"}
MAIN_ATTRIBUTES = {"activity": "", "equipment": "", "vehicle": ' id="profil"'}
ATTRIBUTE_NAME = re.compile(r"^[a-zA-Z][a-zA-Z0-9_-]*$")


def _bilingual(tag, item, css_class=None):
    lead = f'<{tag}' + (f' class="{css_class}"' if css_class else '')
    return (lead + f' data-de="{escape(item["de"], quote=True)}"'
            + f' data-en="{escape(item["en"], quote=True)}">'
            + escape(item["content"]) + f'</{tag}>')


def render_hero(page_type, hero):
    """Render each approved hero variant from its distinct editorial fields."""
    if page_type in {"activity", "equipment"}:
        image = hero["image"]
        dimensions = (f' width="{image["width"]}" height="{image["height"]}"'
                      if "width" in image and "height" in image else "")
        photo = (
            f'<a class="photo-link" href="{escape(image["src"], quote=True)}"'
            f' aria-label="{escape(image["label"], quote=True)}"><img'
            f' src="{escape(image["src"], quote=True)}"'
            f' alt="{escape(image["alt"], quote=True)}"'
            + dimensions
            + f' fetchpriority="high" decoding="async">'
            + '<span class="photo-zoom" aria-hidden="true">'
            + escape(image["zoom"]) + '</span></a>'
        )
        if page_type == "equipment":
            copy = ('<div class="kayak-hero-copy">'
                    + _bilingual('p', hero['eyebrow'], 'eyebrow')
                    + f'<h1>{hero["title_html"]}</h1>'
                    + _bilingual('p', hero['intro']) + '</div>')
            return photo + copy + _bilingual('p', hero['meta'], 'kayak-hero-meta')
        copy = (f'<div class="kayak-hero-copy"><p class="eyebrow">{escape(hero["eyebrow"])}</p>'
                + f'<h1>{hero["title_html"]}</h1><p>{escape(hero["intro"])}</p></div>')
        return photo + copy + f'<p class="kayak-hero-meta">{escape(hero["meta"])}</p>'
    if page_type == "vehicle":
        copy = ('<div class="hero-copy">'
                + _bilingual('p', hero["eyebrow"], 'eyebrow')
                + f'<h1>{hero["title_html"]}</h1>'
                + _bilingual('p', hero["lead"], 'vehicle-lead')
                + '</div>')
        stats = ''.join('<div>' + _bilingual('dt', item["label"])
                        + f'<dd>{escape(item["value"])}</dd></div>' for item in hero["stats"])
        return copy + f'<dl class="hero-stats">{stats}</dl>'
    raise ValueError(f"Unknown detail-page type: {page_type}")


def render_sections(stream, page_type=None):
    """Own section boundaries while retaining page-specific editorial content."""
    sections = []
    equipment_media_index = 0
    for section_index, section in enumerate(stream["items"]):
        attributes = []
        extra_classes = ["detail-photo-feature"] if section_index == stream.get("featured_section_index") else []
        if section_index in stream.get("wide_crop_section_indices", []):
            extra_classes.append("detail-wide-crop")
        if section_index in stream.get("panorama_crop_section_indices", []):
            if "detail-wide-crop" not in extra_classes:
                raise ValueError("Panorama crop requires a configured wide crop")
            extra_classes.append("detail-panorama-crop")
        for name, value in section["attributes"]:
            if not ATTRIBUTE_NAME.fullmatch(name):
                raise ValueError(f"Invalid section attribute: {name}")
            if name == "class" and page_type in {"activity", "equipment"}:
                tokens = value.split()
                tokens.extend(extra_classes)
                extra_classes = []
                if "story" in tokens or "scott-story-pair" in tokens:
                    tokens.append("detail-story-pair")
                    if page_type == "equipment" and "scott-story-pair" in tokens:
                        equipment_media_index += 1
                        tokens.append("detail-balanced")
                        if equipment_media_index % 2 == 0:
                            tokens.append("detail-media-right")
                if "specs" in tokens or "scott-specs" in tokens:
                    tokens.append("detail-specs")
                value = " ".join(tokens)
            attributes.append(f' {name}="{escape(value, quote=True)}"')
        if extra_classes:
            attributes.append(f' class="{" ".join(extra_classes)}"')
        content = section["content"]
        if "heading" in section:
            marker = "<!--section-heading-->"
            if content.count(marker) != 1:
                raise ValueError("A structured section heading needs exactly one insertion marker")
            heading = section["heading"]
            heading_html = ('<div class="section-heading">'
                            + _bilingual('p', heading['eyebrow'], 'eyebrow')
                            + _bilingual('h2', heading['title']))
            if "note" in heading:
                heading_html += _bilingual('p', heading['note'], 'base-note')
            content = content.replace(marker, heading_html + '</div>')
        if "card_group" in section:
            marker = "<!--section-card-group-->"
            if content.count(marker) != 1:
                raise ValueError("A structured card group needs exactly one insertion marker")
            group = section["card_group"]
            if not ATTRIBUTE_NAME.fullmatch(group["class"]):
                raise ValueError("Invalid card group class")
            if not group["items"]:
                raise ValueError("A card group cannot be empty")
            cards = "".join(item["before"] + "<article>" + item["content"] + "</article>"
                            for item in group["items"])
            content = content.replace(marker, f'<div class="{group["class"]}">{cards}{group["trailing"]}</div>')
        sections.append(
            section["before"] + "<section" + "".join(attributes) + ">"
            + content + "</section>"
        )
    return "".join(sections) + stream["trailing"]


def render_detail_main(content, gallery_html):
    """Keep per-page prose in content while owning the page-type structure here."""
    page_type = content["type"]
    if page_type not in HERO_CLASS:
        raise ValueError(f"Unknown detail-page type: {page_type}")
    if not gallery_html:
        raise ValueError("A public detail page requires its approved gallery")
    hero = (f'<section class="{escape(HERO_CLASS[page_type], quote=True)}">'
            + render_hero(page_type, content["hero"]) + '</section>')
    main_class = ' class="detail-page"' if page_type in {"activity", "equipment"} else ""
    return (f"<main{main_class}{MAIN_ATTRIBUTES[page_type]}>" + content["before_hero"] + hero
            + render_sections(content["sections"], page_type) + gallery_html
            + render_sections(content["closing_sections"], page_type) + "</main>")


def render_pending_bike_main(content):
    """One approved interim layout for bike profiles awaiting source material."""
    def localized(tag, pair, css_class=None):
        attrs = f' class="{css_class}"' if css_class else ''
        # Existing bilingual attributes use double-quoted values while
        # retaining apostrophes; preserve their public HTML exactly.
        de = escape(pair["de"], quote=False).replace('"', '&quot;')
        en = escape(pair["en"], quote=False).replace('"', '&quot;')
        return (f'<{tag}{attrs} data-de="{de}" data-en="{en}">'
                + escape(pair["de"], quote=False) + f'</{tag}>')

    number = content["number"]
    if not re.fullmatch(r"0[2-5]", number):
        raise ValueError("Unexpected pending-bike poster number")
    title = content["title_html"]
    if not re.fullmatch(r"[^<>]+ <em>[^<>]+</em>", title):
        raise ValueError("Unexpected pending-bike title markup")
    return (
        '<main><section class="bike-pending-hero"><div class="bike-pending-copy">'
        + localized('p', content['category'], 'equipment-kicker')
        + f'<h1>{title}</h1>'
        + localized('p', content['intro'], 'equipment-intro')
        + '<span class="status" data-de="in Vorbereitung" data-en="coming soon">in Vorbereitung</span>'
        + f'</div><div class="bike-wheel-art" aria-hidden="true"><span>{number}</span></div></section>'
        + '<div class="equipment-main bike-pending-body"><div>'
        + localized('p', content['profile_label'], 'equipment-kicker')
        + '<h2 data-de="Die Geschichte folgt." data-en="The story is coming.">Die Geschichte folgt.</h2>'
        + localized('p', content['body'])
        + '</div><aside class="bike-pending-aside">'
        + '<p class="equipment-kicker" data-de="BIS DAHIN" data-en="IN THE MEANTIME">BIS DAHIN</p>'
        + '<p data-de="Wie ein fertiger Langzeitbericht bei uns aussieht, zeigt Black Beauty." data-en="Black Beauty shows what a completed long-term review looks like here.">Wie ein fertiger Langzeitbericht bei uns aussieht, zeigt Black Beauty.</p>'
        + '<a href="scott-mountainbike.html" data-de="Black Beauty lesen ↗" data-en="Read Black Beauty ↗">Black Beauty lesen ↗</a>'
        + '</aside></div></main>'
    )
