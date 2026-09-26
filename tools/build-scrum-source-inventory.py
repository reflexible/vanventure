"""Lossless Markdown block inventory for the Scrum plan migration.

This script reads project Markdown only. It never edits a source document.
Each non-heading content block or list/table row receives a stable source ID
derived from its path and starting line via the output's Source and Line fields.
"""

import csv
import collections
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "scrum-migration" / "source-inventory.csv"

def role_for(path):
    s = path.as_posix()
    if s == "docs/ausbauplan.md":
        return "canonical-active-plan"
    if s.startswith("docs/abnahmeberichte/"):
        return "acceptance-evidence"
    if s.startswith("docs/project-rules/") or s.startswith(".codex/skills/") or s.endswith("AGENTS.md"):
        return "project-rule"
    if s in {"docs/vorhaben-uebersicht.md", "docs/content-plan-90-tage.md",
             "docs/vanventure-gesamtauftrag-aktualisiert.md",
             "docs/vanventure-responsive-templates-auftrag.md"}:
        return "historical-reference"
    if s.startswith("video-production/"):
        return "video-production-source"
    if s.startswith("social-video/"):
        return "historical-reference"
    if s.startswith("docs/"):
        return "requirement-or-reference"
    return "project-reference"

def status_for(text):
    low = text.lower()
    if re.match(r"^\s*[-*]\s*\[x\]", text, re.I) or re.match(r"^\s*[-*]\s*~~", text):
        return "Done (source marker)"
    if re.match(r"^\s*[-*]\s*\[ \]", text):
        return "Open (source marker)"
    if any(x in low for x in ("teilweise", "teilstand", "partially")):
        return "Partially Done (source wording)"
    if any(x in low for x in ("noch offen", "bleibt offen", "bleiben offen", "nicht geprüft", "blockiert")):
        return "Open/Blocked (source wording)"
    if any(x in low for x in ("live geprüft", "live verifiziert", "erledigt", "abgeschlossen")):
        return "Done/Existing (source wording; verify)"
    return "Not explicit"

def candidates():
    paths = [ROOT / "AGENTS.md", ROOT / "README.md", ROOT / "CONTRIBUTING.md"]
    paths += sorted((ROOT / "docs").rglob("*.md"))
    paths += sorted((ROOT / "video-production").rglob("*.md"))
    paths += sorted((ROOT / "social-video").rglob("*.md"))
    paths += sorted((ROOT / ".codex").rglob("*.md"))
    paths += [ROOT / "editor" / "README.md", ROOT / "tools" / "photo-download" / "README.md"]
    return [p for p in paths if p.is_file() and "scrum-migration" not in p.parts]

def extract(path):
    lines = path.read_text(encoding="utf-8-sig").splitlines()
    headings = []
    current = None
    code = False
    for number, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("```"):
            code = not code
        match = re.match(r"^(#{1,6})\s+(.+?)\s*$", line) if not code else None
        if match:
            if current:
                yield current
                current = None
            depth = len(match.group(1))
            headings = headings[:depth - 1] + [match.group(2)]
            continue
        if not stripped:
            if current:
                yield current
                current = None
            continue
        new_item = bool(re.match(r"^\s*(?:[-*+]\s+|\d+[.)]\s+|\|)", line))
        if current and new_item:
            yield current
            current = None
        if current is None:
            current = {"Section": " / ".join(headings) or "(Vorspann)",
                       "Line": number, "Text": stripped}
        else:
            current["Text"] += " " + stripped
    if current:
        yield current

def main():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    rows = []
    for path in candidates():
        rel = path.relative_to(ROOT).as_posix()
        for item in extract(path):
            if re.match(r"^\|?\s*:?-{3,}", item["Text"]):
                continue
            rows.append({"ID": "SRC-%04d" % (len(rows) + 1), "Source": rel,
                         "Section": item["Section"], "Line": item["Line"],
                         "SourceRole": role_for(path.relative_to(ROOT)),
                         "SourceStatus": status_for(item["Text"]),
                         "OriginalText": item["Text"]})
    with OUT.open("w", newline="", encoding="utf-8-sig") as stream:
        writer = csv.DictWriter(stream, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)
    grouped = collections.OrderedDict()
    for row in rows:
        key = (row["Source"], row["Section"])
        grouped.setdefault(key, []).append(row)
    index = ["# Inventar der Planungs- und Anforderungsquellen", "",
             "Stand: 25. September 2026. Diese Liste ist eine lesende Bestandsaufnahme.",
             "Jeder Eintrag mit vollständigem Originaltext und Zeile steht in `source-inventory.csv`.",
             "Historische Fassungen und Abnahmeberichte sind aufgenommen, aber nicht automatisch aktive Pläne.",
             "Der aktive Gesamtplan bleibt `docs/ausbauplan.md`.", "",
             "| Datei | Abschnitt / Feature | IDs | erkennbarer Quellstatus | Rolle |",
             "| --- | --- | --- | --- | --- |"]
    for (source, section), items in grouped.items():
        statuses = sorted(set(item["SourceStatus"] for item in items))
        index.append("| `%s` | %s | %s–%s (%d) | %s | %s |" %
                     (source, section.replace("|", "\\|"), items[0]["ID"], items[-1]["ID"],
                      len(items), ", ".join(statuses).replace("|", "\\|"), items[0]["SourceRole"]))
    (OUT.parent / "source-index.md").write_text("\n".join(index) + "\n", encoding="utf-8")
    print("%d source blocks from %d files -> %s" %
          (len(rows), len(set(row["Source"] for row in rows)), OUT))

if __name__ == "__main__":
    sys.exit(main())
