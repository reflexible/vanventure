"""Record manual semantic review of analytics source blocks SRC-0355–0361."""
import csv
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
ATOMS = MIG / "atomic-requirements.csv"
CATALOG = MIG / "story-catalog.json"
SOURCE = ROOT / "docs/analytics.md"
sha = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
with ATOMS.open(encoding="utf-8-sig", newline="") as stream:
    reader = csv.DictReader(stream)
    fields, rows = list(reader.fieldnames), list(reader)
with (MIG / "source-inventory.csv").open(encoding="utf-8-sig", newline="") as stream:
    sources = {row["ID"]: row for row in csv.DictReader(stream)}

reasons = {
"0355.a":"Defines the exact allowed analytics context keys rather than arbitrary component payloads.",
"0355.b":"Published content has a stable ID, preferably from the existing content/CMS model.",
"0355.c":"URL changes must not change the content ID.",
"0355.d":"Forbids a second parallel ID authority.",
"0356.a":"Enumerates personal and free-text fields that may never be event properties.",
"0356.b":"Forbids fingerprinting, profiles, cross-site methods, covert collection and adblock bypass.",
"0356.c":"Requires concrete Umami operation and legal texts to be checked before production activation.",
"0357.a":"Requires one central URL normalization path.",
"0357.b":"Forbids blind transmission of window.location.href.",
"0357.c":"Drops unknown or sensitive query parameters.",
"0357.d":"Defines the four supported UTM keys and central helper.",
"0357.e":"Constrains UTM values to short, stable, lower-case, space-free, nonpersonal strings.",
"0357.f":"Reuses one campaign name across Instagram, Facebook, YouTube and QR; example is illustrative.",
"0358.a":"Loads analytics asynchronously outside critical rendering.",
"0358.b":"UI and navigation must not wait for the provider.",
"0358.c":"Provider failure must not harm the website.",
"0358.d":"CSP may gain only required domains and must not use wildcard script/connect policies.",
"0359.a":"Unit suite covers every named policy, schema, context, URL, UTM and adapter behavior.",
"0359.b":"Integration/E2E must prove allowed anonymous public calls and absence of both script and request in every excluded state.",
"0359.c":"Architecture test forbids direct provider APIs outside adapters.",
"0359.d":"Adapter switch is verified without content edits.",
"0360.a":"Reporting covers every named reach, engagement, source, equipment, mobile and content-area dimension.",
"0360.b":"Goals are chosen sparingly, not enabled for every event.",
"0360.c":"Funnels are provider configuration rather than a new VanVenture data system.",
"0360.d":"Separates Search Console and optional Cloudflare performance monitoring from analytics.",
"0360.e":"Own anonymous PostgreSQL daily aggregates require a later value decision, not first implementation.",
"0360.f":"Excludes replay, heatmaps, fingerprinting, profiles, cross-site tracking, full raw-event platform and ML analysis.",
"0361.a":"Forbids analytics work from changing design, templates, publishing, auth, roles, images or original protection.",
"0361.b":"Keeps existing approvals and normal release process binding.",
}
story_target = {
"SRC-0355.b":"ST-AN-02", "SRC-0355.c":"ST-AN-02", "SRC-0355.d":"ST-AN-02",
**{f"SRC-0356.{s}":"ST-AN-01" for s in "abc"},
**{f"SRC-0357.{s}":"ST-AN-01" for s in "abc"},
**{f"SRC-0357.{s}":"ST-AN-05" for s in "def"},
**{f"SRC-0358.{s}":"ST-AN-01" for s in "abcd"},
**{f"SRC-0359.{s}":"ST-AN-01" for s in "abc"},
"SRC-0359.d":"ST-AN-06",
**{f"SRC-0360.{s}":"ST-AN-05" for s in "abc"},
"SRC-0360.e":"ST-AN-07",
}

def update_catalog():
    changes = {
      "ST-AN-01":("Namen, E-Mail, Login, interne Nutzer-/Google-IDs, IP als Event-Property, Formulare, Kommentare, persönliche Suchtexte, Freitext und Auth-Daten werden nie gesendet; Fingerprints, Profile, Cross-Site-Tracking, verdeckte Methoden und Adblock-Umgehung sind ausgeschlossen. Vor Aktivierung sind konkrete Umami-Konfiguration, Betrieb und öffentliche Rechtstexte geprüft. URLs werden zentral normalisiert, vollständige window.location.href und unbekannte oder sensible Query-Parameter nicht blind übertragen. Analytics lädt asynchron außerhalb des kritischen Rendering-Pfads; UI und Navigation warten nie, Ausfälle schaden der Seite nicht. CSP erlaubt nur nötige Domains, keine script-src-* oder connect-src-*-Freigabe. Unit-, Integrations- und E2E-Prüfungen decken die benannten Policy-, Schema-, Kontext-, URL-, UTM-, Adapter- und Netzwerkfälle ab; ausgeschlossene Zustände laden weder Script noch externe Anfrage. Ein Architekturtest verbietet direkte Provider-APIs außerhalb der Adapter.",["SRC-0356","SRC-0357","SRC-0358","SRC-0359"]),
      "ST-AN-02":("Relevante veröffentlichte Inhalte erhalten eine stabile content_id aus der bestehenden Content-/CMS-Struktur, wenn vorhanden. Ein URL-Wechsel ändert die ID nicht; keine zweite parallele ID-Verwaltung entsteht.",["SRC-0355"]),
      "ST-AN-05":("Der zentrale UTM-Helper unterstützt utm_source, utm_medium, utm_campaign und utm_content mit kurzen, stabilen, kleingeschriebenen, leerzeichenfreien und nicht personenbezogenen Werten; dieselbe Kampagne nutzt auf Instagram, Facebook, YouTube und QR denselben Namen. Berichte machen Seitenreichweite, Lesetiefe, Wege zu YouTube und Related Content, Social-/Kampagnenquellen, Ausrüstungsinteresse, mobile Landingpages und VAN/BIKE/KAYAK/EXPLORE-Bereiche auswertbar. Umami-Goals bleiben sparsam; Funnels sind nur Provider-Konfiguration.",["SRC-0357","SRC-0360"]),
      "ST-AN-06":("Der Wechsel zu einem Testadapter weist identische Events und Properties ohne Änderung an Content-Komponenten nach.",["SRC-0359"]),
      "ST-AN-07":("Eigene anonyme Tagesaggregate in PostgreSQL sind nur Gegenstand der späteren Nutzenentscheidung und nicht Teil der ersten Implementierung.",["SRC-0360"]),
    }
    lines = CATALOG.read_text(encoding="utf-8").splitlines(keepends=True)
    out, changed = [], set()
    for line in lines:
        if line.lstrip().startswith('{"id"'):
            item = json.loads(line.strip().rstrip(","))
            if item["id"] in changes:
                ac, refs = changes[item["id"]]
                assert ac not in item["acceptance"]
                item["acceptance"] += " " + ac
                item["sources"] = list(dict.fromkeys(item["sources"] + refs))
                line = "    " + json.dumps(item, ensure_ascii=False, separators=(",", ":")) + (",\n" if line.rstrip().endswith(",") else "\n")
                changed.add(item["id"])
        out.append(line)
    assert changed == set(changes)
    CATALOG.write_text("".join(out), encoding="utf-8")
    return {item["id"] for item in json.loads(CATALOG.read_text(encoding="utf-8"))["stories"]}

package = [row for row in rows if 355 <= int(row["SourceID"][4:]) <= 361 and not row.get("ReviewPackage")]
assert len(package) == len(reasons) == 29, (len(package), len(reasons))
assert {row["AtomicID"][4:] for row in package} == set(reasons)
for number in range(355, 362):
    sid = f"SRC-{number:04}"
    assert " ".join(row["Clause"] for row in package if row["SourceID"] == sid) == sources[sid]["OriginalText"], sid
    assert sources[sid]["OriginalText"] in " ".join(SOURCE.read_text(encoding="utf-8").split()), sid
stories = update_catalog()
assert all(x in stories for x in story_target.values())
for row in package:
    aid, sid = row["AtomicID"], row["SourceID"]
    is_story = aid in story_target
    row.update(ReviewPackage="PKG-006", ReviewedSourceSHA256=sha,
               ReviewReason=reasons[aid[4:]], OpenQuestion="",
               BlockCoverageCheck="Complete analytics source block and surrounding document reread; candidate clauses rejoin exactly",
               AtomicityReview="Semantic review evidenced in PKG-006",
               ReviewClassification="Functional requirement" if is_story else "Project rule / constraint",
               RequirementID=aid, SuccessorIDs="", RequirementText=row["Clause"],
               ConcreteTarget=",".join(filter(None,[f"{story_target[aid]}#Acceptance-Criteria" if is_story else "",f"constraint-register.md#{sid.lower()}"])),
               PlanningCoverage="Covered" if is_story else "Rule / Constraint",
               SemanticResult="Concrete acceptance or binding rule checked against full source")
with ATOMS.open("w", encoding="utf-8-sig", newline="") as stream:
    writer = csv.DictWriter(stream, fieldnames=fields)
    writer.writeheader()
    writer.writerows(rows)
print(f"PKG-006: 7 source blocks, 29 candidates; SHA-256 {sha}")
