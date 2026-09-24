"""Non-mutating checks for shared public templates and gallery markup."""

import json
import re
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
import site_gallery
import site_detail
from site_detail import render_detail_main


class SharedSiteBuildTests(unittest.TestCase):
    def test_all_eight_galleries_use_one_markup_renderer(self):
        static = json.loads((ROOT / "content/public-galleries.json").read_text(encoding="utf-8"))
        stories = json.loads((ROOT / "travel-stories.json").read_text(encoding="utf-8"))
        output = [site_gallery.render_gallery(gallery) for gallery in static.values()]
        output.extend(site_gallery.travel_gallery(story) for story in stories)
        self.assertEqual(len(output), 8)
        self.assertTrue(all('<section' in gallery and 'data-photo-gallery' in gallery for gallery in output))
        original = site_gallery._text_element
        try:
            site_gallery._text_element = lambda node: original(node) + '<!--central-probe-->'
            changed = [site_gallery.render_gallery(gallery) for gallery in static.values()]
            changed.extend(site_gallery.travel_gallery(story) for story in stories)
            self.assertTrue(all('<!--central-probe-->' in gallery for gallery in changed))
        finally:
            site_gallery._text_element = original

    def test_activity_and_vehicle_templates_accept_new_content_without_page_copy(self):
        for page_type, hero_class in (("activity", "kayak-page-hero"), ("vehicle", "vehicle-hero")):
            if page_type == "activity":
                hero = {"image": {"src": "assets/test.jpg", "label": "Bild ansehen", "alt": "Testbild",
                                  "width": 400, "height": 300, "zoom": "Vergrößern"},
                        "eyebrow": "TEST", "title_html": "Testinhalt", "intro": "Einleitung", "meta": "Metadaten"}
            else:
                bilingual = lambda value: {"de": value, "en": value, "content": value}
                hero = {"eyebrow": bilingual("TEST"), "title_html": "Testinhalt",
                        "lead": bilingual("Einleitung"),
                        "stats": [{"label": bilingual("Daten"), "value": "1"}]}
            content = {"type": page_type, "before_hero": "", "hero": hero,
                       "sections": {"items": [{"before": "", "attributes": [["class", "test-section"]],
                                               "content": "<p>Neuer Inhalt</p>"}], "trailing": ""},
                       "closing_sections": {"items": [], "trailing": ""}}
            page = render_detail_main(content, '<section data-photo-gallery></section>')
            self.assertIn(f'<section class="{hero_class}">', page)
            self.assertIn('<h1>Testinhalt</h1>', page)
            self.assertIn('<section class="test-section"><p>Neuer Inhalt</p></section>', page)
            self.assertLess(page.index('Neuer Inhalt'), page.index('data-photo-gallery'))
            self.assertEqual(page.count('<main'), 1)

    def test_central_section_renderer_reaches_existing_detail_pages(self):
        pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
        galleries = json.loads((ROOT / "content/public-galleries.json").read_text(encoding="utf-8"))
        original = site_detail.render_sections
        try:
            site_detail.render_sections = lambda stream, page_type: original(stream, page_type) + "<!--central-section-probe-->"
            for filename, content in pages.items():
                page = render_detail_main(content, site_gallery.render_gallery(galleries[filename]))
                self.assertIn("<!--central-section-probe-->", page, filename)
        finally:
            site_detail.render_sections = original

    def test_finished_bike_uses_kayak_equipment_template(self):
        pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
        galleries = json.loads((ROOT / "content/public-galleries.json").read_text(encoding="utf-8"))
        bike = pages["scott-mountainbike.html"]
        self.assertEqual(bike["type"], "equipment")
        self.assertEqual(len(bike["sections"]["items"]), 10)
        rendered = render_detail_main(bike, site_gallery.render_gallery(galleries["scott-mountainbike.html"]))
        self.assertIn('<section class="kayak-page-hero">', rendered)
        self.assertIn('<div class="kayak-hero-copy">', rendered)
        self.assertIn('class="kayak-hero-meta"', rendered)
        self.assertIn('class="intro"', rendered)
        self.assertIn('class="benefits"', rendered)
        self.assertIn('<div class="cards">', rendered)
        benefit = next(section for section in bike["sections"]["items"]
                       if any(attribute == ["class", "benefits"] for attribute in section["attributes"]))
        self.assertEqual(len(benefit["card_group"]["items"]), 3)
        for card in benefit["card_group"]["items"]:
            prose = re.sub(r"<[^>]+>", "", card["content"])
            self.assertGreaterEqual(len(prose), 250, "Scott benefit cards need substantive copy")
        self.assertEqual(rendered.count('detail-wide-crop'), 3)
        self.assertEqual(rendered.count('detail-panorama-crop'), 2)
        self.assertLess(rendered.index('class="intro"'), rendered.index('id="scott-erfahrung"'))
        self.assertEqual(rendered.count('detail-balanced'), 4)
        self.assertEqual(rendered.count('detail-media-right'), 2)
        self.assertEqual(rendered.count('detail-photo-feature'), 1)
        self.assertIn('data-photo-gallery', rendered)
        self.assertIn(rendered, (ROOT / "scott-mountainbike.html").read_text(encoding="utf-8"))

    def test_kayak_and_finished_bike_share_editorial_layout(self):
        pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
        for filename in ("kajak.html", "scott-mountainbike.html"):
            source = (ROOT / filename).read_text(encoding="utf-8")
            self.assertIn('href="detail-editorial.css"', source, filename)
            rendered = render_detail_main(pages[filename], '<section data-photo-gallery></section>')
            self.assertIn('class="detail-page"', rendered, filename)
            self.assertIn('detail-story-pair', rendered, filename)
        kayak = render_detail_main(pages["kajak.html"], '<section data-photo-gallery></section>')
        self.assertEqual(kayak.count("<h2>Ein Boot, das mitreist.</h2>"), 1)
        self.assertIn("Was ihn für uns besonders macht.", kayak)

    def test_vehicle_section_headings_are_structured_and_shared(self):
        pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
        sections = pages["vehicle.html"]["sections"]["items"]
        self.assertEqual(len(sections), 4)
        self.assertTrue(all("heading" in section for section in sections))
        self.assertTrue(all(section["content"].count("<!--section-heading-->") == 1
                            for section in sections))
        page = render_detail_main(pages["vehicle.html"], '<section data-photo-gallery></section>')
        self.assertEqual(page.count('<div class="section-heading">'), 4)
        self.assertIn('data-en="How a van becomes our van."', page)

    def test_activity_and_vehicle_card_groups_share_article_renderer(self):
        pages = json.loads((ROOT / "content/detail-pages.json").read_text(encoding="utf-8"))
        expected = {"kajak.html": {"cards", "reviews"},
                    "vehicle.html": {"systems-grid", "brand-builds"}}
        for filename, classes in expected.items():
            sections = pages[filename]["sections"]["items"]
            groups = [section["card_group"] for section in sections if "card_group" in section]
            self.assertEqual({group["class"] for group in groups}, classes)
            self.assertTrue(all(group["items"] for group in groups))
            page = render_detail_main(pages[filename], '<section data-photo-gallery></section>')
            self.assertEqual(page.count("<!--section-card-group-->"), 0)
            for css_class in classes:
                self.assertIn(f'<div class="{css_class}">', page)

    def test_pending_bikes_share_one_approved_interim_template(self):
        pages = json.loads((ROOT / "content/pending-bike-pages.json").read_text(encoding="utf-8"))
        self.assertEqual(set(pages), {"cube.html", "trek-gravelbike.html",
                                      "woom-2.html", "diamant-stadtraeder.html"})
        for filename, content in pages.items():
            rendered = site_detail.render_pending_bike_main(content)
            source = (ROOT / filename).read_text(encoding="utf-8")
            self.assertIn(rendered, source, filename)
            self.assertIn('class="bike-pending-hero"', rendered)
            self.assertIn('class="bike-pending-aside"', rendered)
            self.assertNotIn('data-photo-gallery', rendered)  # Approved interim exception.
            changed = dict(content, number="02" if content["number"] != "02" else "03")
            self.assertNotEqual(rendered, site_detail.render_pending_bike_main(changed))

    def test_travel_stories_match_non_mutating_generator_check(self):
        result = subprocess.run([sys.executable, str(ROOT / "build-travel-pages.py"), "--check"],
                                cwd=ROOT, capture_output=True, text=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("norwegen-2018", result.stdout)


if __name__ == "__main__":
    unittest.main()
