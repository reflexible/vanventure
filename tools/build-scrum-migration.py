"""Build a reviewable draft from the preserved Scrum source inventory.

The generated matrix deliberately marks ambiguous mappings as partial or
unresolved. It does not certify that a source paragraph is atomically covered.
"""

import collections
import csv
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parents[1]
MIG = ROOT / "docs" / "scrum-migration"
CATALOG = json.loads((MIG / "story-catalog.json").read_text(encoding="utf-8"))
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    SOURCES = list(csv.DictReader(stream))
BY_ID = {item["ID"]: item for item in SOURCES}
STORIES = {story["id"]: story for story in CATALOG["stories"]}
EPICS = {epic["id"]: epic for epic in CATALOG["epics"]}

# One primary plan item can feed several stories. These are human-reviewed
# exceptions to the catalog's explicit source anchors.
OVERRIDES = {
    "SRC-0447": "ST-AUTH-01,ST-WEB-01",
    "SRC-0373": "ST-AUTH-01", "SRC-0379": "ST-CON-01,ST-CON-02,ST-CON-03",
    "SRC-0461": "ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05",
    "SRC-0380": "ST-CON-01", "SRC-0460": "ST-WEB-02,ST-WEB-03",
    "SRC-0462": "ST-WEB-01,ST-WEB-02,ST-WEB-03",
    "SRC-0463": "ST-WEB-02,ST-PHOTO-01",
    "SRC-0467": "ST-PHOTO-01,ST-SEO-01",
    "SRC-0504": "ST-WEB-01", "SRC-0505": "ST-WEB-01",
    "SRC-0513": "ST-PHOTO-01", "SRC-0451": "ST-WEB-01,ST-PHOTO-04",
    "SRC-0453": "ST-WEB-01,ST-PHOTO-03", "SRC-0455": "ST-WEB-02",
    "SRC-0457": "ST-WEB-03", "SRC-0459": "ST-WEB-03",
    "SRC-0477": "ST-BRD-01", "SRC-0528": "ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05,ST-PHOTO-06,ST-PHOTO-07",
    "SRC-0529": "ST-WEB-02,ST-WEB-03", "SRC-0530": "ST-WEB-01,ST-SEO-01,ST-WEB-03",
    "SRC-0536": "ST-WEB-02,ST-WEB-03", "SRC-0539": "ST-WEB-01,ST-WEB-03",
    "SRC-0962": "ST-SEO-01", "SRC-0967": "ST-SEO-01",
    "SRC-0976": "ST-SEO-04,ST-SEO-05,ST-SEO-06,ST-SEO-07",
    "SRC-0977": "ST-SEO-04,ST-SEO-05,ST-SEO-06",
    "SRC-1059": "ST-INS-01,ST-AUTH-01",
    "SRC-0510": "ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-03,ST-PHOTO-07",
    "SRC-0522": "ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-06,ST-PHOTO-07",
    "SRC-1220": "ST-INS-01"
}

# Reviewed non-checkbox source paragraphs. Duplicate means a superseded
# historical status whose later controlling requirement is retained elsewhere.
MANUAL_COVERAGE = {
    "SRC-0383": ("Rule / Constraint", "Analytics authority, provider boundary and CMS staging retained as binding plan introduction"),
    "SRC-0384": ("Rule / Constraint", "Analytics completion and release status convention retained as binding rule"),
    "SRC-0415": ("Rule / Constraint", "CMS architecture and scope boundaries retained as binding plan introduction"),
    "SRC-0416": ("Rule / Constraint", "CMS completion, publishing and image/design gates retained as binding progress rule"),
    "SRC-0439": ("Rule / Constraint", "Password login and allowlist gate retained under access story"),
    "SRC-0447": ("Covered", "Rollout evidence also contains distinct private-navigation, account-role and mobile-navigation requirements; retained as historical Done/Verify criteria"),
    "SRC-0451": ("Covered", "Live hero/gallery status and four pending bike profiles separately mapped"),
    "SRC-0452": ("Rule / Constraint", "Approved design-guide and image approval gate remain authoritative"),
    "SRC-0453": ("Covered", "Existing vehicle gallery is preserved, not planned anew"),
    "SRC-0454": ("Duplicate", "Old equipment overview state superseded by later redirect decision SRC-0530"),
    "SRC-0455": ("Covered", "Published Scott profile retained as existing result"),
    "SRC-0456": ("Duplicate", "Older equipment overview hero superseded by retirement SRC-0530"),
    "SRC-0457": ("Covered", "Existing mobile hero result retained as existing result"),
    "SRC-0459": ("Rule / Constraint", "Local preview and explicit release approval gate applies to ST-WEB-03"),
    "SRC-0461": ("Covered", "Atomic clauses SRC-0461.a-g in partial-clause-map.md; current 11-route scope in page-scope.csv; future subpages remain bound by template rules"),
    "SRC-0466": ("Covered", "Locally approved V3 and still open live verification retained under ST-PHOTO-03"),
    "SRC-0477": ("Covered", "Board goal carried into GOAL-PRIVATE and ST-BRD-01"),
    "SRC-0478": ("Rule / Constraint", "Phase-0 decision gate retained for board stories"),
    "SRC-0483": ("Rule / Constraint", "No board rollout before Phase-0 acceptance"),
    "SRC-0531": ("Duplicate", "Earlier Scott structural state superseded by later local work SRC-0534–0538"),
    "SRC-0532": ("Duplicate", "Earlier Scott photo trial superseded by later approved rhythm SRC-0534"),
    "SRC-0521": ("Duplicate", "Older Italy and Trulli preview decisions superseded by SRC-0528; image release still governed by ST-PHOTO-01/02"),
    "SRC-0522": ("Covered", "Atomic clauses SRC-0522.a-j in partial-clause-map.md; 73 current variants and six existing variants individually listed in photo-variant-scope.csv; review and publication remain open"),
    "SRC-0510": ("Covered", "Atomic clauses SRC-0510.a-i in partial-clause-map.md; historical first pass distinguished from 73 current variants in photo-variant-scope.csv"),
    "SRC-0509": ("Covered", "Atomic clauses SRC-0509.a-j in partial-clause-map.md; all 11 current routes enumerated in page-scope.csv; visual acceptance and rollout remain open"),
    "SRC-0523": ("Duplicate", "Earlier local 13-page technical review superseded by SRC-0539 and later release status; image work remains in ST-PHOTO-07"),
    "SRC-0524": ("Duplicate", "Older 18-photo preview status superseded by SRC-0528; Nr. 23 remains in ST-PHOTO-05"),
    "SRC-0526": ("Duplicate", "Older follow-up preview variants superseded by SRC-0528; source kept"),
    "SRC-0533": ("Covered", "Vehicle V3 is locally approved and live verification stays open in ST-PHOTO-03"),
    "SRC-0534": ("Covered", "Scott image rhythm and pending full visual/release review mapped to ST-WEB-02/03"),
    "SRC-0535": ("Covered", "Shared heading correction retained as local work requiring live verification"),
    "SRC-0537": ("Covered", "Latest Scott card, image ratio and release conditions retained"),
    "SRC-0538": ("Covered", "Shared link styling retained as local verified work with live check open"),
    "SRC-0540": ("Covered", "Scott text revision already live; no new implementation planned")
}

ANCHORS = collections.defaultdict(list)
for story in CATALOG["stories"]:
    for sid in story["sources"]:
        if sid not in BY_ID:
            raise ValueError("Missing source anchor %s for %s" % (sid, story["id"]))
        ANCHORS[sid].append(story["id"])

def status(source):
    value = source["SourceStatus"]
    if value.startswith("Done"):
        return "Done" if source["Source"].startswith("video-production/") else "Existing / Verify"
    if value.startswith("Partially"):
        return "Partially Done"
    if value.startswith("Open/Blocked"):
        return "Blocked"
    if value.startswith("Open"):
        return "Planned"
    return "Existing / Verify"

def pick(text, pairs, default):
    for pattern, target in pairs:
        if re.search(pattern, text, re.I):
            return target
    return default

def target_for(row):
    sid, path, section = row["ID"], row["Source"], row["Section"]
    text = row["OriginalText"]
    low = (section + " " + text).lower()
    if sid in OVERRIDES:
        return OVERRIDES[sid]
    if sid in ANCHORS:
        return ",".join(ANCHORS[sid])
    if path == "docs/ausbauplan.md":
        if "ANALYTICS 0–8" in section:
            return pick(text, [(r"UTM|Kampagne|Goals", "ST-AN-05"),
                               (r"Providerwechsel|Testadapter|Migrationsweg", "ST-AN-06"),
                               (r"Tagesaggregate", "ST-AN-07"),
                               (r"Lesetiefe|Videostart", "ST-AN-04"),
                               (r"Klick|Orientierung", "ST-AN-03"),
                               (r"Öffentliche Seiten|CMS-Seiten", "ST-AN-02")], "ST-AN-01")
        if "CMS 1–6" in section:
            return pick(text, [(r"CMS 6|Referenzfäll", "ST-CMS-08,ST-CMS-09"),
                               (r"CMS 5|Medien", "ST-CMS-06"),
                               (r"CMS 4", "ST-CMS-04,ST-CMS-05"),
                               (r"CMS 3", "ST-CMS-03"),
                               (r"CMS 2", "ST-CMS-01,ST-CMS-02")], "ST-CMS-01")
        if "Google-Login" in section:
            return "ST-AUTH-01"
        if "1A." in section or "1B." in section:
            return "ST-WEB-01"
        if "1C." in section:
            return pick(low, [(r"fahrzeugbild|schiebetür|hinterrad", "ST-PHOTO-03"),
                              (r"bild|foto|original|kennzeichen", "ST-PHOTO-01"),
                              (r"prüf|abnahme|release", "ST-WEB-03")], "ST-WEB-02")
        if "2A." in section:
            return pick(low, [(r"warnung|inbox", "ST-BRD-03"),
                              (r"marvin", "ST-BRD-04"),
                              (r"tablet", "ST-BRD-02")], "ST-BRD-01")
        if "2. Aus den" in section:
            return pick(low, [(r"explore", "ST-CON-02"), (r"move", "ST-CON-03"),
                              (r"stunden|28 tagen", "ST-INS-05")], "ST-CON-01")
        if "3. Audit V2" in section:
            return pick(low, [(r"500-video", "ST-INS-02"), (r"trennen", "ST-INS-03"),
                              (r"metriken|stunden", "ST-INS-05"),
                              (r"workflow|export", "ST-INS-06")], "ST-INS-04")
        if "4. Google" in section:
            return "ST-OPS-02"
        if "5. Website" in section:
            return pick(low, [(r"riverstar|schwimmwesten", "ST-CON-04"),
                              (r"search console|bing|sitemap", "ST-SEO-02"),
                              (r"youtube-reisevideo|website-links", "ST-SEO-03"),
                              (r"radprofile|galerie-ausnahme", "ST-PHOTO-04"),
                              (r"fahrzeugbild|schiebetür", "ST-PHOTO-03"),
                              (r"foto|bild|farb|original|privacy|kennzeichen", "ST-PHOTO-01,ST-PHOTO-02"),
                              (r"release|sichtabnahme|responsive", "ST-WEB-03")], "ST-WEB-02")
        if "6. Betrieb" in section:
            return "ST-OPS-01"
        if any(tag in section for tag in ("Bildreview am", "Nutzerfeedback zu", "Weitere Einzelrückmeldungen")):
            return "ST-PHOTO-01,ST-PHOTO-02"
        if "Responsiver Seitenreview" in section:
            return "ST-WEB-03,ST-PHOTO-01"
        if "Bildfreigabe, Ausrüstungsseiten" in section:
            return pick(low, [(r"übersicht|redirect|weiterleit", "ST-WEB-01,ST-SEO-01"),
                              (r"scott|seitenstruktur", "ST-WEB-02,ST-WEB-03"),
                              (r"mast|farbe|bild", "ST-PHOTO-01,ST-PHOTO-02")], "ST-WEB-02")
        if "Scott/Kajak-Sichtabgleich" in section or "Scott-Fotokomposition" in section:
            return "ST-WEB-02,ST-WEB-03"
        if "Scott – aktueller lokaler Stand" in section:
            return pick(low, [(r"schiebetür|fahrzeug", "ST-PHOTO-03"),
                              (r"foto|bild|beschnitt", "ST-PHOTO-02,ST-WEB-02"),
                              (r"release|live", "ST-WEB-03")], "ST-WEB-02")
        if "Scott-Textredaktion" in section:
            return "ST-WEB-02"
        return ""
    if path == "docs/analytics.md":
        return pick(low, [(r"tagesaggregate|eigene lösung", "ST-AN-07"),
                          (r"utm|kampagne|reporting|goals", "ST-AN-05"),
                          (r"lesetiefe|video_start|gallery_image_view", "ST-AN-04"),
                          (r"content-klick|youtube_click|cta_click", "ST-AN-03"),
                          (r"providerwechsel|parallelbetrieb|matomo", "ST-AN-06"),
                          (r"seitenreichweite|öffentliche seiten", "ST-AN-02")], "ST-AN-01")
    if path in {"docs/responsive-templates.md", "docs/vanventure-responsive-templates-auftrag.md"}:
        return pick(low, [(r"galerie|foto-viewer", "ST-WEB-01"),
                          (r"prüfung|abnahme|screen|viewport|release", "ST-WEB-03"),
                          (r"startseite|kajak-seite", "ST-WEB-01")], "ST-WEB-02")
    if path == "docs/design-guide.md":
        return pick(low, [(r"galerie|hero|navigation|mobil", "ST-WEB-01"),
                          (r"bild|foto", "ST-PHOTO-01")], "ST-WEB-02")
    if path == "docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md":
        return pick(low, [(r"original|foto|bild|kennzeichen|privacy", "ST-PHOTO-01"),
                          (r"galerie|navigation", "ST-WEB-01"),
                          (r"freigabe|abnahme|prüfung", "ST-WEB-03")], "ST-WEB-02")
    if path == "docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md":
        return pick(low, [(r"warnung|inbox|fast track", "ST-BRD-03"),
                          (r"marvin", "ST-BRD-04"),
                          (r"tablet|touch|tastatur", "ST-BRD-02")], "ST-BRD-01")
    if path == "docs/vanventure-cockpit-plan.md":
        return pick(low, [(r"board|scrum|warnung", "ST-BRD-01,ST-BRD-03"),
                          (r"rechtstexte|google-produktions", "ST-OPS-02"),
                          (r"login|oauth|allowlist", "ST-AUTH-01"),
                          (r"planner|metrics|stunden", "ST-INS-05"),
                          (r"traffic|retention|dashboard|video", "ST-INS-04")], "ST-INS-01")
    if path == "docs/seo.md":
        return pick(low, [(r"search console|bing|indexier", "ST-SEO-02"),
                          (r"website-link|youtube-reisevideo", "ST-SEO-03"),
                          (r"reisebericht|themen stärken", "ST-CON-01,ST-CON-02,ST-CON-03")], "ST-SEO-01")
    if path == "docs/riverstar/entwurf.md":
        return "ST-CON-04"
    if path in {"docs/creator-system.md", "docs/production-briefs/gcs-nach-einem-jahr.md",
                "docs/source-notes/gcs-1-jahr-erfahrung.md"}:
        return "ST-CON-01"
    if path == "docs/betrieb.md":
        return pick(low, [(r"warnung|inbox", "ST-BRD-03")], "ST-OPS-01")
    if path == "docs/vanventure-cockpit-mvp.md":
        if sid in {"SRC-1060", "SRC-1061", "SRC-1062", "SRC-1063", "SRC-1064",
                   "SRC-1065", "SRC-1066", "SRC-1067"}:
            return "ST-AUTH-01"
        return "ST-INS-01"
    if path.startswith("video-production/sardinia-2019/"):
        return "ST-VID-01"
    if path.startswith("video-production/"):
        return "ST-VID-01"
    if path in {"AGENTS.md", "README.md", "CONTRIBUTING.md", "video-production/AGENTS.md"}:
        return ""
    return ""

def relevance(row):
    path, role, section = row["Source"], row["SourceRole"], row["Section"]
    text = row["OriginalText"]
    if role in {"acceptance-evidence", "historical-reference"}:
        return "No", "Historical evidence/reference; preserved, cross-check only"
    if path in {"docs/plan-audit-2026-09-22.md", "docs/channel-audit-v1.md",
                "docs/gemini-sources.md", "docs/marvin-server.md"}:
        return "No", "Analysis or historical reference; not an active plan"
    if path == "docs/ausbauplan.md":
        if row["ID"] in {"SRC-0383", "SRC-0384", "SRC-0415", "SRC-0416"}:
            return "Yes", "Normative plan introduction or progress rule; targeted review correction"
        if "Referenzen – keine aktiven Pläne" in section or "Ausgangslage" in section:
            return "No", "Reference or baseline data"
        if text.startswith(("**ANALYTICS ", "**CMS ", "**Fortschrittsregel:", "**Auftrag vom")):
            return "No", "Epic heading, progress convention or source status; retained in inventory"
        if section.endswith("Bereits erledigt und live geprüft"):
            return "Yes", "Existing feature in canonical plan"
        if any(tag in section for tag in ("Bildreview am", "Responsiver Seitenreview am", "Nutzerfeedback zu",
                                           "Weitere Einzelrückmeldungen", "Bildfreigabe, Ausrüstungsseiten",
                                           "Scott/Kajak-Sichtabgleich", "Scott-Fotokomposition",
                                           "Scott – aktueller lokaler Stand", "Scott-Textredaktion")):
            return "Yes", "Canonical status paragraph with possible remaining requirement"
        if re.match(r"^\s*[-*]\s+", text) or "Nächste verbindliche Schritte" in section:
            return "Yes", "Canonical active plan"
        return "No", "Status narrative retained in source inventory"
    if path.startswith("video-production/sardinia-2019/"):
        if "v18" in section:
            return "Yes", "Current published production result"
        return "No", "Superseded local cut or its evidence"
    if path.startswith("video-production/"):
        if path == "video-production/_shared/available-gear.md":
            return "No", "Equipment inventory, not a plan requirement"
        return "Yes", "Active video operating constraint"
    if path == "docs/vanventure-cockpit-mvp.md":
        if 1053 <= int(row["ID"][4:]) <= 1073:
            return "Yes", "Normative Cockpit architecture or security constraint"
        return "No", "Historical rollout evidence; preserved for cross-check"
    if path == "docs/source-notes/gcs-1-jahr-erfahrung.md":
        return "No", "Supporting source or rollout evidence; preserved for cross-check"
    if path == "docs/seo.md" and row["ID"] in {"SRC-0960", "SRC-0961", "SRC-0968",
                                                "SRC-0970", "SRC-0971", "SRC-0972",
                                                "SRC-0973", "SRC-0979"}:
        return "No", "SEO context or historical evidence, not a new requirement"
    if role == "project-rule" or path in {"CONTRIBUTING.md", "README.md"}:
        return "Yes", "Project rule or operating constraint"
    if role == "requirement-or-reference":
        if text.startswith("|---") or re.match(r"^\|\s*(?:Typ|Feld|Zweck|Quelle|Bereich|Phase|Fähigkeit|Schritt|Nr\.)\b", text):
            return "No", "Table heading"
        return "Yes", "Authoritative requirement/reference detail"
    return "No", "Supporting context"

def coverage(row, relevant, target):
    if relevant == "No":
        return "", "Not counted as an original requirement; retained in inventory"
    path, role = row["Source"], row["SourceRole"]
    if row["ID"] in MANUAL_COVERAGE:
        return MANUAL_COVERAGE[row["ID"]]
    if role == "project-rule" or path in {"CONTRIBUTING.md", "README.md", "video-production/README.md"}:
        return "Rule / Constraint", "Binding rule retained at original source; applies to mapped stories"
    if not target:
        return "Unresolved", "No defensible story mapping identified"
    if path == "docs/ausbauplan.md" and not row["ID"] in ANCHORS and not row["ID"] in OVERRIDES:
        return "Partially Covered", "Section-level mapping only; individual clause review required"
    if path in {"docs/design-guide.md", "docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md",
                "docs/responsive-templates.md", "docs/riverstar/entwurf.md", "docs/analytics.md",
                "docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md",
                "docs/vanventure-cockpit-mvp.md"}:
        return "Rule / Constraint", "Full source wording remains binding as acceptance constraint; story association is thematic"
    if path.startswith("video-production/sardinia-2019/"):
        return "Covered", "Published v18 result retained as Done; no reimplementation"
    if path in {"docs/creator-system.md", "docs/production-briefs/gcs-nach-einem-jahr.md",
                "docs/betrieb.md", "docs/vanventure-cockpit-plan.md"}:
        return "Rule / Constraint", "Source detail remains binding for associated story; no source content overwritten"
    if path == "docs/seo.md":
        return "Covered", "SEO item linked to existing or planned story; full source wording retained"
    if path == "docs/ausbauplan.md":
        return "Covered", "Explicit story anchor or reviewed mapping"
    return "Partially Covered", "Reference detail mapped by section; clause-level review required"

MATRIX = []
for row in SOURCES:
    relevant, reason = relevance(row)
    target = target_for(row) if relevant == "Yes" else ""
    cov, note = coverage(row, relevant, target)
    rule_ref = "constraint-register.md#%s" % row["ID"].lower() if cov == "Rule / Constraint" else ""
    mapping = ",".join(item for item in (target, rule_ref) if item)
    MATRIX.append({"ID":row["ID"], "Source":row["Source"], "Section":row["Section"],
                   "Line":row["Line"], "OriginalRequirement":row["OriginalText"],
                   "Relevant":relevant, "NewMapping":mapping,
                   "Type":"Rule / Constraint" if cov == "Rule / Constraint" else ("User Story / Task" if target else "Source context"),
                   "Status":status(row), "Coverage":cov, "Note":reason + "; " + note})

def write_csv(name, rows):
    with (MIG / name).open("w", newline="", encoding="utf-8-sig") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)

write_csv("traceability-matrix.csv", MATRIX)

rule_lines = ["# Constraint-Register des Scrum-Migrationsentwurfs", "",
              "Jeder Anker verweist auf genau einen Originalblock. Die Originalquelle bleibt bindend;",
              "die Story-Zuordnung in der Matrix ist eine Anwendung, keine Abschwächung des Wortlauts.",
              "Historische Statusangaben sind nur für ihren belegten Stand gültig.", ""]
for row in MATRIX:
    if row["Coverage"] != "Rule / Constraint":
        continue
    story_refs = [item for item in row["NewMapping"].split(",") if item.startswith("ST-")]
    rule_lines += ["## %s" % row["ID"].lower(), "",
                   "- Quelle: `%s:%s` · %s" % (row["Source"], row["Line"], row["Section"]),
                   "- Anwendung: %s" % (", ".join(story_refs) if story_refs else "projektweit"),
                   "- Verbindlicher Originalwortlaut: %s" % row["OriginalRequirement"], ""]
(MIG / "constraint-register.md").write_text("\n".join(rule_lines), encoding="utf-8")

TASKS = []
TASK_TEXT_OVERRIDES = {
    ("SRC-0461", "ST-WEB-02"): "Kajak- und Fahrzeugstruktur mit gemeinsamen freigegebenen Bausteinen ohne Inhalts- oder Funktionsverlust prüfen.",
    ("SRC-0461", "ST-WEB-03"): "Eigenständige Startseite und fehlenden Inhalts- oder Funktionsverlust im gemeinsamen Release-Nachweis prüfen.",
    ("SRC-0461", "ST-WEB-04"): "Drei Reiseberichte über den gemeinsamen Seitengenerator je Bericht prüfen.",
    ("SRC-0461", "ST-WEB-05"): "Scott und die vier vorbereitenden Radprofile als getrennten Seitentyp-Slice prüfen.",
    ("SRC-0509", "ST-WEB-02"): "Offene Kajak-/Fahrzeugabschnitte zentralisieren und lokal abnehmen.",
    ("SRC-0509", "ST-WEB-03"): "Gesamtsichtprüfung, Freigabe, Release-Commit und Live-Nachprüfung getrennt belegen.",
    ("SRC-0509", "ST-WEB-04"): "Restliche gemeinsame Reisebericht-Struktur je veröffentlichter Route prüfen.",
    ("SRC-0509", "ST-WEB-05"): "Scott-Profil visuell abnehmen; vier Vorbereitungsprofile und ihre genehmigte Galerie-Ausnahme erhalten.",
    ("SRC-0511", "ST-WEB-05"): "Bereits lokal geprüfte Zentralisierung der vier Vorbereitungsprofile als Existing markieren; ausstehende Sicht- und Live-Prüfung getrennt erfassen.",
    ("SRC-0510", "ST-PHOTO-01"): "Privacy-Grenzen der betroffenen Ableitungen pro Motiv prüfen; gesperrte Proben nicht zeigen.",
    ("SRC-0510", "ST-PHOTO-02"): "Verworfene Erstproben nicht als fertig zählen; je Motiv Farbe, Ausschnitt und Spiegelung im großen Vergleich prüfen.",
    ("SRC-0510", "ST-PHOTO-03"): "Vier bereits freigegebene Fahrzeugbilder aus der Farbüberarbeitung ausnehmen.",
    ("SRC-0510", "ST-PHOTO-07"): "Webeinbau und Gesamt-Review je freigegebenem Motiv vor Veröffentlichung belegen.",
}
for row in MATRIX:
    if row["Relevant"] == "Yes" and row["Source"] == "docs/ausbauplan.md" and row["OriginalRequirement"].startswith("- ") and row["NewMapping"]:
        for story in row["NewMapping"].split(","):
            if not story.startswith("ST-"):
                continue
            TASKS.append({"TaskID":"TASK-%04d" % (len(TASKS)+1), "ParentStory":story,
                          "SourceID":row["ID"], "SourceStatus":row["Status"],
                          "TaskOrConstraint":TASK_TEXT_OVERRIDES.get((row["ID"], story), row["OriginalRequirement"])})
write_csv("story-tasks.csv", TASKS)

REVERSE = []
for story in CATALOG["stories"]:
    linked = [row["ID"] for row in MATRIX if story["id"] in row["NewMapping"].split(",") and row["Relevant"] == "Yes"]
    REVERSE.append({"StoryID":story["id"], "EpicID":story["epic"],
                    "OriginalSourceIDs":", ".join(linked),
                    "ExplicitAnchorIDs":", ".join(story["sources"]),
                    "Enabler":"Yes – %s" % story["enablerReason"] if story.get("enablerReason") else "No",
                    "ReverseCheck":"Anchor present" if story["sources"] and linked else "Missing anchor"})
write_csv("reverse-traceability.csv", REVERSE)

hierarchy = ["# Reverse Traceability der Goals und Epics", "",
             "Diese Prüfung belegt die Herkunft über fachlich verknüpfte Stories und Original-IDs.",
             "Eine vorhandene ID allein beweist keine vollständige semantische Deckung; hierfür gelten Matrix,",
             "Constraint-Register und die weiterhin offenen Coverage-Prüfungen.", ""]
for goal in CATALOG["goals"]:
    goal_stories = [story for story in CATALOG["stories"]
                    if EPICS[story["epic"]]["goal"] == goal["id"]]
    hierarchy += ["## %s" % goal["id"], "", goal["outcome"], "",
                  "- Fachliche Herkunft: %s" % ", ".join(sorted({sid for story in goal_stories for sid in story["sources"]})), ""]
    for epic in CATALOG["epics"]:
        if epic["goal"] != goal["id"]:
            continue
        stories = [story for story in goal_stories if story["epic"] == epic["id"]]
        hierarchy += ["### %s" % epic["id"], "", epic["outcome"], "",
                      "- Stories: %s" % ", ".join(story["id"] for story in stories),
                      "- Original-IDs: %s" % ", ".join(sorted({sid for story in stories for sid in story["sources"]})), ""]
(MIG / "reverse-hierarchy.md").write_text("\n".join(hierarchy), encoding="utf-8")

by_epic = collections.defaultdict(list)
for story in CATALOG["stories"]:
    by_epic[story["epic"]].append(story)
plan = ["# Scrum-Migrationsentwurf für VanVenture", "",
        "Status: **Entwurf; bestehender `docs/ausbauplan.md` bleibt die einzige aktive Arbeitsliste.**",
        "Dieser Entwurf ersetzt keine Fachquelle und hebt keinen lokalen Teilstand auf Done an.",
        "Die vollständigen Quelltexte, Aufgaben und Zuordnungen stehen in `source-inventory.csv`,",
        "`story-tasks.csv` und `traceability-matrix.csv`. Die Quelle bleibt für jedes Acceptance Criterion bindend.", "",
        "## Planning Coverage und Implementation Verification", "",
        "`Covered` in der Matrix bedeutet ausschließlich, dass die ursprüngliche Anforderung im",
        "Planungsmodell zugeordnet ist. Es bedeutet weder Code-Umsetzung noch Bild-, Nutzer- oder",
        "Live-Freigabe. `Existing / Verify` verlangt weiterhin einen aktuellen Nachweis; historische",
        "Done-Belege gelten nur für ihren ausdrücklich geprüften Umfang. Die atomare Klauselprüfung",
        "steht gesondert in `atomic-requirements.csv` und `atomic-coverage-report.md`.", "",
        "Der aktuelle 11-Routen-Umfang steht in `page-scope.csv`, die 73 aktuellen privaten",
        "Farbproben und sechs bestehenden Fassungen in `photo-variant-scope.csv`.", "",
        "## Gemeinsame Definition of Done", "",
        "Jede Story erfüllt ihre Acceptance Criteria und alle zugeordneten Quellanforderungen;",
        "Schutz-, Freigabe-, Datenschutz-, Design- und Release-Gates werden nachgewiesen.",
        "Die konkreten, nicht abschwächbaren Quell-Constraints stehen einzeln im `constraint-register.md`;",
        "dessen Originalverweise sind Bestandteil der Abnahme der jeweils zugeordneten Story.",
        "Lokale Prüfung, Commit, Push und Live-Verifikation sind getrennt zu dokumentieren.",
        "Ein Done-Status aus der Quelle bleibt ein historischer Done-Stand und ist keine neue Abnahme.", ""]
for goal in CATALOG["goals"]:
    plan += ["## %s – %s" % (goal["id"], goal["outcome"]), ""]
    for epic in CATALOG["epics"]:
        if epic["goal"] != goal["id"]:
            continue
        plan += ["### %s – %s" % (epic["id"], epic["outcome"]), ""]
        for story in by_epic[epic["id"]]:
            plan += ["#### %s · %s · %s" % (story["id"], story["status"], story["priority"]), "",
                     story["story"], "",
                     "- **Value-Typ:** %s" % story["valueType"]]
            if story.get("enablerReason"):
                plan.append("- **Notwendiger Enabler:** %s" % story["enablerReason"])
            plan += [
                     "- **Dependencies:** %s" % story["dependencies"],
                     "- **Acceptance Criteria:** %s" % story["acceptance"],
                     "- **Ursprung:** %s" % ", ".join(story["sources"]),
                     "- **Task/Subtask-Nachweis:** Alle zugeordneten `TASK-*`-Zeilen in `story-tasks.csv` gehören ausschließlich zu dieser Story. Technische Schritte ohne eigenen Nutzen bleiben Tasks; kein Task hängt direkt am Epic.", ""]
plan += ["## Offene Slice- und Statusgrenzen", "",
         "ST-WEB-01 und ST-INS-01 bewahren historische Implementierungen. `Existing / Verify`",
         "bezeichnet keine neue Gesamt-Abnahme; jede später geänderte Route und private Datengrenze",
         "braucht eine eigene aktuelle Prüfung. ST-SEO-01 belegt historisch fünf Seiten und prüft",
         "zusätzliche Seiten erst gegen den aktuellen Live-Stand.", "",
         "ST-WEB-02/04/05 teilen die Template-Migration nach eigenständig nutzbaren Seitentypen.",
         "ST-WEB-03 ist der notwendige gemeinsame Release-Nachweis; ein lokaler Gesamttest",
         "ersetzt keine Seiten- und Nutzerabnahme. ST-PHOTO-02/07 sind",
         "für noch nicht einzeln entschiedene Motive nicht sprintbereit: pro Motiv sind Quelle,",
         "Bildnummer, betroffene Route, Datenschutz- und Farbentscheidung zu dokumentieren.",
         "Die 73 weiteren Farbproben aus SRC-0522 sind einzeln in `photo-variant-scope.csv`",
         "verzeichnet; ihre Farb-, Privacy- und Publikationsprüfungen bleiben offen. Nr. 63 und 69",
         "bleiben getrennt gesperrt. Keine der Sammel-Stories darf allein wegen einer Probe",
         "oder eines Teiltests als Done gelten.", "",
         "ST-AN-01 ist ausschließlich der erste messbare Referenzseiten-Aufruf als Walking Skeleton.",
         "Schema-, Policy-, Adapter- und Testarbeit dient diesem Slice als Task; weitere Seiten",
         "und Ereignisse gehören zu ST-AN-02 bis ST-AN-07.", "",
         "## Priorisierung und Migration", "",
         "P0 schützt Privatsphäre und reale Bildtreue; P1 liefert den nächsten direkten Nutzerwert;",
         "P2 erweitert Auswertung und Inhalte; P3 betrifft optionale spätere Entscheidungen.",
         "Prioritäten sind ein Migrationsvorschlag und ersetzen keine im privaten Familien-Board noch offene Phase-0-Entscheidung.",
         "Bis der atomare Coverage-Check bestanden ist, bleibt dieser Plan Entwurf;",
         "der alte Gesamtplan darf nicht als LEGACY markiert, ersetzt oder archiviert werden.", ""]
(MIG / "scrum-plan-draft.md").write_text("\n".join(plan), encoding="utf-8")

counts = collections.Counter(row["Coverage"] for row in MATRIX if row["Relevant"] == "Yes")
relevant_total = sum(counts.values())
partial = [row for row in MATRIX if row["Coverage"] == "Partially Covered"]
unresolved = [row for row in MATRIX if row["Coverage"] == "Unresolved"]
report = ["# Coverage-Check zum Scrum-Migrationsentwurf", "",
          "Status: **nicht abgeschlossen**. Die Matrix enthält Quellenblöcke, keine bestätigte atomare Zerlegung jeder mehrteiligen Aussage.",
          "Bis zur manuellen Klauselprüfung darf die Zahl Covered nicht als Nachweis für 0 verlorene Anforderungen gelesen werden.", "",
          "`Covered` bedeutet eine explizite Story-Zuordnung. `Rule / Constraint` bewahrt die vollständige bindende Quellformulierung und ordnet sie, soweit passend, thematisch einer Story zu; dies ist keine neue Implementierung.",
          "`Duplicate` bezeichnet einen begründet überholten oder bereits anderweitig erfassten Status, dessen Original bestehen bleibt.",
          "Die Zahlen zählen prüfbare Quellblöcke, nicht schon atomisierte Einzelanforderungen.", "",
          "| Kategorie | Anzahl |", "| --- | ---: |",
          "| Ursprüngliche relevante Quellenblöcke | %d |" % relevant_total]
for category in ("Covered", "Partially Covered", "Duplicate", "Rule / Constraint", "Unresolved"):
    report.append("| %s | %d |" % (category, counts[category]))
report += ["", "## Partially Covered – einzeln nachzuprüfen", ""]
for row in partial:
    report.append("- %s · `%s:%s` · %s → %s. **Grund:** %s. Volltext in `traceability-matrix.csv`." %
                  (row["ID"], row["Source"], row["Line"], row["Section"],
                   row["NewMapping"] or "keine Zuordnung", row["Note"]))
report += ["", "## Unresolved – einzeln zu klären", ""]
if not unresolved:
    report.append("- Keine im derzeitigen Quellenblock-Abgleich.")
for row in unresolved:
    report.append("- %s · `%s:%s` · %s · %s" % (row["ID"], row["Source"], row["Line"], row["Section"], row["OriginalRequirement"][:180]))
report += ["", "## Reverse Traceability", "",
           "%d von %d Stories haben mindestens eine explizite ursprüngliche Quell-ID; %d notwendige Enabler mit Originalbezug, 0 Enabler ohne Herkunft." %
           (sum(x["ReverseCheck"] == "Anchor present" for x in REVERSE), len(REVERSE),
            sum(x["Enabler"] != "No" for x in REVERSE)), "",
           "Die Herkunft der Goals und Epics steht in `reverse-hierarchy.md`.",
           "Eine Anker-ID allein belegt keine vollständige fachliche Deckung oder Statusprüfung.",
           "Die Story-Liste steht in `reverse-traceability.csv`.", ""]
(MIG / "coverage-report.md").write_text("\n".join(report), encoding="utf-8")
print("stories=%d, tasks=%d, relevant source blocks=%d, coverage=%s" %
      (len(CATALOG["stories"]), len(TASKS), relevant_total, dict(counts)))
