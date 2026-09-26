"""Summarize saved human review decisions; never infer semantic PASS from links."""

import csv
import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MIG = ROOT / "docs/scrum-migration"
with (MIG / "atomic-requirements.csv").open(encoding="utf-8-sig", newline="") as stream:
    rows = list(csv.DictReader(stream))
with (MIG / "traceability-matrix.csv").open(encoding="utf-8-sig", newline="") as stream:
    matrix = list(csv.DictReader(stream))

original = [row for row in rows if re.fullmatch(r"SRC-\d{4}\.[a-z]+", row["AtomicID"])]
successors = [row for row in rows if row not in original]
reviewed = [row for row in original if row.get("ReviewPackage")]
unreviewed = [row for row in original if not row.get("ReviewPackage")]
independent = [row for row in rows if row.get("ReviewPackage") and
               row.get("RequirementID") == row["AtomicID"] and
               row.get("ReviewClassification") in {"Functional requirement", "Project rule / constraint"}]
gaps = [row for row in rows if row.get("ReviewPackage") and
        row["PlanningCoverage"] in {"Unresolved", "Partially Covered"}]
open_questions = [row for row in rows if row.get("ReviewPackage") and row.get("OpenQuestion")]
decision_path = MIG / "decision-queue.json"
decision_queue = json.loads(decision_path.read_text(encoding="utf-8")) if decision_path.exists() else []
decision_classes = Counter(item.get("classification", "TECHNICAL") for item in decision_queue)
normalize_question = lambda value: re.sub(r"[^a-z0-9äöüß]+", " ", value.casefold()).strip()
decision_by_question = {normalize_question(item.get("question", "")): item
                        for item in decision_queue}
decision_by_candidate = {candidate_id: item for item in decision_queue
                         for candidate_id in item.get("related_candidate_ids", [])}
decision_by_source = {source_id: item for item in decision_queue
                      for source_id in item.get("source_ids", [])}
def decision_for_row(row):
    return (decision_by_candidate.get(row.get("AtomicID")) or
            decision_by_source.get(row.get("SourceID")) or
            decision_by_question.get(normalize_question(row.get("OpenQuestion", "")), {}))
reviewable_findings = [row for row in rows
                      if row.get("ReviewPackage") and
                      (row.get("PlanningCoverage") in {"Partially Covered", "Unresolved"} or
                       row.get("OpenQuestion")) and
                      decision_for_row(row).get("classification") != "USER_DECISION" and
                      decision_for_row(row).get("blocks_final_audit") is not False]
decision_groups = Counter(item.get("decision_group") for item in decision_queue
                          if item.get("classification") == "USER_DECISION")
decision_packages = Counter(item.get("decision_package") for item in decision_queue
                            if item.get("classification") == "USER_DECISION" and
                            item.get("decision_group") == "PRE_FINAL_AUDIT_DECISION")
state_path = MIG / "controller-state.json"
controller_state = json.loads(state_path.read_text(encoding="utf-8")) if state_path.exists() else {}
packages = sorted({row["ReviewPackage"] for row in reviewed})
source_ids = sorted({row["SourceID"] for row in reviewed})
coverage = Counter(row["PlanningCoverage"] for row in reviewed)
implementation = Counter(row["ImplementationStatus"] for row in original)
next_number = min((int(row["SourceID"][4:]) for row in unreviewed), default=None)
if next_number is None:
    next_package = "keines; alle ursprünglichen Kandidaten geprüft"
    next_count = 0
else:
    next_end = (361 if 348 <= next_number <= 361 else
                397 if 385 <= next_number <= 397 else next_number + 24)
    if next_number == 418:
        next_number, next_end = 415, 442  # adjacent CMS introduction/progress blocks need relevance audit
    if next_number == 426:
        next_number, next_end = 425, 438  # finish CMS 3–6 before unrelated login sources
    if next_number == 439:
        next_end = 447  # dense security and historical rollout blocks
    if next_number == 448:
        next_end = 459  # public design/history block before template migration
    for start, end in ((460, 469), (470, 479), (480, 489), (490, 499),
                       (500, 509), (510, 519), (520, 529), (530, 539)):
        if start <= next_number <= end:
            next_end = end
            break
    next_package = f"PKG-{len(packages)+1:03}, SRC-{next_number:04}–SRC-{next_end:04}"
    next_count = sum(next_number <= int(row['SourceID'][4:]) <= next_end for row in unreviewed)

report = ["# Atomarer Coverage- und Prüffortschritt", "",
          "Die Kandidatenzahl ist weiterhin eine Arbeitsgröße, keine bestätigte Zahl aller",
          "atomaren Originalanforderungen. Nur Zeilen mit Prüfpaket, konkreter Zielstelle und",
          "individueller Begründung gelten als fachlich geprüft. Frühere bloße Zuordnungen zählen nicht.", "",
          "## Fortschritt", "",
          f"- Fachlich bearbeitete Prüfpakete (keine Deckungsabnahme): {', '.join(packages) or 'keine'}",
          f"- Fachlich geprüfte Originalblöcke: {len(source_ids)} / {sum(row['Relevant']=='Yes' for row in matrix)}",
          f"- Fachlich geprüfte ursprüngliche Kandidaten: {len(reviewed)} / {len(original)}",
          f"- Ungeprüfte ursprüngliche Kandidaten: {len(unreviewed)}",
          f"- Nachträglich erkannte Nachfolger durch Teilung: {len(successors)}",
          f"- Bestätigte eigenständige Anforderungen/Regeln im geprüften Umfang: {len(independent)}",
          f"- Offene Deckungslücken im geprüften Umfang: {len(gaps)}",
          f"- Kandidaten mit offenem Coverage-/Review-Hinweis (inkl. Nachfolger): {len(open_questions)}",
          f"- Coverage Findings Remaining: {len(gaps)}",
          f"- Reviewable Coverage Findings: {len(reviewable_findings)}",
          f"- Auto-resolvable Findings (klassifizierte Fragegruppen): {decision_classes['AUTO_RESOLVABLE']}",
          f"- PRE_FINAL_AUDIT_DECISION: {decision_groups['PRE_FINAL_AUDIT_DECISION']}",
          f"- PUBLICATION_DECISION: {decision_groups['PUBLICATION_DECISION']}",
          f"- DEFERRED_POST_PILOT: {decision_groups['DEFERRED_POST_PILOT']}",
          f"- PRE_FINAL_AUDIT_DECISION-Pakete A1–A5: " + ", ".join(
              f"A{i}={decision_packages[f'A{i}']}" for i in range(1, 6)),
          f"- Final Audit Readiness: {controller_state.get('final_audit_readiness', 'NOT_READY')}",
          f"- Final Audit Status: {controller_state.get('final_audit', 'NOT_STARTED')}",
          f"- Weitere Klassifikationen (TECHNICAL / DUPLICATE / INSUFFICIENT_EVIDENCE): "
          f"{decision_classes['TECHNICAL']} / "
          f"{decision_classes['DUPLICATE']} / {decision_classes['INSUFFICIENT_EVIDENCE']}",
          f"- Nächstes Paket: {next_package}, {next_count} noch ungeprüfte Kandidaten", "",
          "## Planning Coverage der fachlich geprüften ursprünglichen Kandidaten", "",
          f"- Covered: {coverage['Covered']}",
          f"- Rule / Constraint: {coverage['Rule / Constraint']}",
          f"- Duplicate: {coverage['Duplicate']}",
          f"- Merged / Split: {coverage['Merged']} / {coverage['Split']}",
          f"- Kontext ohne zusätzliche Pflicht: {coverage['Context']}",
          f"- Partially Covered: {coverage['Partially Covered']}",
          f"- Unresolved: {coverage['Unresolved']}",
          f"- Traceability Partially Covered rows: {sum(row['Coverage'] == 'Partially Covered' for row in matrix)}",
          f"- Noch nicht fachlich geprüft: {len(unreviewed)}", "",
          "## Implementation Verification (getrennte Quellstatus-Achse)", "",
          "Diese Zahlen sind keine Code- oder Live-Abnahme.", "",
          "- Verified Existing: 0",
          f"- Existing / Verify: {implementation['Existing / Verify']}",
          f"- Planned: {implementation['Planned']}",
          f"- Blocked: {implementation['Blocked']}",
          f"- Unverified / unknown: {implementation['Unverified / unknown']}", "",
          "## Prüfnachweis PKG-001", "",
          "- Originalquelle: `AGENTS.md`, SRC-0001–SRC-0025, SHA-256",
          "  `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`.",
          "- 25 vollständige Originalblöcke gelesen; die 65 ursprünglichen Kandidatentexte",
          "  setzen sich je Block exakt zum erfassten Originaltext zusammen.",
          "- 10 künstlich getrennte Bedingungs-/Ausnahmefragmente wurden mit ihrem",
          "  kanonischen Kandidaten verknüpft; drei Kandidaten ergaben je zwei",
          "  eigenständig prüfbare Nachfolger. Die sechs Nachfolger bleiben auf ihre",
          "  ursprünglichen Kandidaten rückverfolgbar.",
          "- Zielkorrekturen: ST-AN-01 nennt zentrale Event-/Property-Definitionen",
          "  und Adaptergrenze; ST-WEB-01 nennt gemeinsamen Galeriebaustein und Viewer.",
          "- Nr. 63/69 bleiben gesperrt; dieses Paket ändert keine Foto- oder Live-Freigabe.", "",
          "## Prüfnachweis PKG-002", "",
          "- Originalquelle: `AGENTS.md`, SRC-0026–SRC-0039, SHA-256",
          "  `71703547875072eb8ab3b24e8b54711eb14d28f63c6aaae1e61927d415223df0`.",
          "- 14 vollständige Originalblöcke gelesen; die 49 ursprünglichen Kandidatentexte",
          "  setzen sich je Block exakt zum erfassten Originaltext zusammen.",
          "- Sieben Bedingungs- und Kontextfragmente wurden kanonisch zusammengeführt;",
          "  zwei Kandidaten ergaben insgesamt fünf eigenständig prüfbare Nachfolger.",
          "- Zielkorrekturen: ST-WEB-01/02/04 konkretisieren Navigation, Redirects, Viewer",
          "  und responsive Templates; ST-PHOTO-01/02 konkretisieren Bildherkunft,",
          "  Personen-/Kennzeichenschutz, dokumentarische Bildtreue und KI-Freigaben.",
          "- Die Freigabe- und Veröffentlichungssperren für Nr. 63/69 bleiben bestehen.", "",
          "## Prüfnachweis PKG-003", "",
          "- Originalquellen: `README.md`, SRC-0040–SRC-0054, SHA-256",
          "  `ccf1252a70936f0eeace1f5a6a66aad9d9cf8ce0904bbdbadd3cbe85f9e35472`;",
          "  `CONTRIBUTING.md`, SRC-0055–SRC-0064, SHA-256",
          "  `8bf238c220b9ecc53efc135a640077af496d5108edfb0172fdb8c210a566b001`.",
          "- 25 vollständige Originalblöcke und 57 ursprüngliche Kandidaten gelesen;",
          "  ihre Klauseln setzen sich je Block exakt zum erfassten Originaltext zusammen.",
          "- Vier zusammengesetzte Listeneinträge ergaben elf einzeln prüfbare Nachfolger.",
          "  Nummerierungszeichen, reine Statusaussagen und Befehlsbeispiele sind als",
          "  Kontext begründet. Fehlende Ausrüstungs- und Kontakt-/Rechtstext-Ergebnisse",
          "  stehen als ST-WEB-06/07 mit Originalbezug im bestehenden Epic.",
          "- Die zwei älteren Release-Klauseln SRC-0051.b/SRC-0052.d sind durch",
          "  DEC-REL-001/003 entschieden; Originale bleiben historisch erhalten.", "",
          "## Prüfnachweis PKG-004", "",
          "- `CONTRIBUTING.md`, SRC-0065–SRC-0068, SHA-256",
          "  `8bf238c220b9ecc53efc135a640077af496d5108edfb0172fdb8c210a566b001`:",
          "  vier vollständige relevante Regelblöcke und sieben Kandidaten gelesen.",
          "- SRC-0069–SRC-0078 aus dem Analytics-Abnahmebericht wurden im Kontext",
          "  gelesen und als bereits ausgeschlossene Status-/Nachweisblöcke bestätigt;",
          "  sie besitzen keine Klauselkandidaten und erhöhen den relevanten Nenner nicht.",
          "- Die historische Freigaberegel SRC-0068.a ist durch DEC-REL-001",
          "  hinsichtlich Release-Umfang und Zeitvorgabe entschieden.", "",
          "## Prüfnachweis PKG-005", "",
          "- `docs/analytics.md`, SRC-0348–SRC-0354, SHA-256",
          "  `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d`:",
          "  sieben vollständige Quellblöcke und 40 Kandidaten gelesen; Klauseln",
          "  setzen sich je Block exakt zum Original zusammen.",
          "- Datum/Status wurden als Kontext markiert. Zentrale API, Policy,",
          "  Provider-Grenze, Phase-0-Analyse, Event-Vertrag und bedingte Ereignisse",
          "  sind mit konkreten Acceptance Criteria bzw. Constraints verbunden.",
          "- Dieses Paket erfasst Planungsschutz, keine Implementierungsabnahme.", "",
          "## Prüfnachweis PKG-006", "",
          "- `docs/analytics.md`, SRC-0355–SRC-0361, SHA-256",
          "  `da56c77cb2218777d7b2ee43e8e7a83c4e0f55ea8310898b5c22802d049f2a2d`:",
          "  sieben vollständige Quellblöcke und 29 Kandidaten gelesen; Klauseln",
          "  setzen sich je Block exakt zum Original zusammen.",
          "- Content-ID, Datenschutz, URL-/UTM-Normalisierung, Ausfallsicherheit,",
          "  Tests und Berichte sind an bestehende Analytics-Stories und den genauen",
          "  Constraint-Wortlaut gebunden. Optionale Aggregate bleiben Entscheidung,",
          "  nicht vorweggenommene Implementierung.", "",
          "## Prüfnachweis PKG-007", "",
          "- `docs/ausbauplan.md`, SRC-0373–SRC-0384, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  zwölf vollständige relevante Blöcke und 26 ursprüngliche Kandidaten",
          "  gelesen; ihre Klauseln ergeben jeweils den Originalblock.",
          "- SRC-0383/0384 waren irrtümlich als irrelevant ausgeschlossen. Ihre",
          "  vorhandenen Quell-IDs wurden erhalten; 15 neue Klauselkandidaten",
          "  erhöhen den ursprünglichen Arbeitsbestand von 2.882 auf 2.897.",
          "- Sieben zusammengesetzte historische Blöcke ergaben 28 Nachfolger.",
          "  Historische Cockpit-, Content-, Release-, SEO- und Viewer-Ergebnisse",
          "  bleiben bestehende Stände und wurden nicht als neue Arbeit geplant.", "",
          "## Prüfnachweis PKG-008", "",
          "- `docs/ausbauplan.md`, SRC-0385–SRC-0397, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  neun vollständige relevante Arbeitsblöcke mit 28 Kandidaten gelesen;",
          "  vier dazwischenliegende Abschnittsüberschriften als Kontext bestätigt.",
          "- Phase-0-Entscheidungen, Messvertrag, Null-Policy, Umami-Anbindung und",
          "  echte Referenzseiten-Abnahme stehen explizit bei ST-AN-01. Alle bleiben",
          "  Planned; kein historischer Analytics-Live-Stand wurde erfunden.", "",
          "## Prüfnachweis PKG-009", "",
          "- `docs/ausbauplan.md`, SRC-0398–SRC-0414, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  zwölf vollständige relevante Blöcke und 39 Kandidaten gelesen;",
          "  fünf Abschnittsüberschriften als Kontext bestätigt.",
          "- Die separate CMS-Seitenmessung und interne Orientierung hatten keine",
          "  ausreichend genaue Acceptance Criteria. ST-AN-08/09 wurden aus",
          "  SRC-0399/0402 innerhalb des bestehenden Analytics-Epics ergänzt;",
          "  ST-AN-03 verweist nur noch auf ausgehende Content-Klicks.",
          "- Providerwechsel und optionale Aggregate bleiben geplant bzw.",
          "  entscheidungsabhängig, nicht als implementiert ausgewiesen.", "",
          "## Prüfnachweis PKG-010", "",
          "- `docs/ausbauplan.md`, SRC-0415–SRC-0424, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  acht relevante Blöcke und 23 Kandidaten geprüft; zwei CMS-Überschriften",
          "  als Kontext bestätigt.",
          "- SRC-0415/0416 enthielten trotz bisherigen Ausschlusses Architektur-,",
          "  Freigabe- und Fortschrittsregeln. Elf Kandidaten wurden unter den",
          "  vorhandenen Quell-IDs nachgetragen; der Arbeitsbestand steigt auf 2.908.",
          "- CMS 1/2 stehen mit konkreten Kriterien bei ST-CMS-01/02; Speichern",
          "  wird weiterhin nicht als Veröffentlichung behandelt.", "",
          "## Prüfnachweis PKG-011", "",
          "- `docs/ausbauplan.md`, SRC-0425–SRC-0438, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  zehn relevante CMS-3–6-Blöcke mit 22 Kandidaten gelesen und an",
          "  konkrete Story-Kriterien gebunden; vier Überschriften sind Kontext.",
          "- Draft/Published-Grenzen, SEO-Sichtbarkeit, Medienherkunft und die",
          "  beiden begrenzten Referenzfälle bleiben Planned; weitere Seiten",
          "  liegen ausdrücklich außerhalb von CMS 1–6.", "",
          "## Prüfnachweis PKG-012", "",
          "- `docs/ausbauplan.md`, SRC-0439–SRC-0447, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  neun vollständige Blöcke und 36 Kandidaten gelesen; zwei gesonderte",
          "  Sitzungsschutzpflichten als Nachfolger erfasst.",
          "- SRC-0447 war auf Blockebene fälschlich pauschal Duplicate; eigene",
          "  Navigations-, Rollen- und Kontoregeln sind nun an ST-AUTH-01 und",
          "  ST-WEB-01 gebunden. Historische Live-Nachweise wurden nicht als neue",
          "  Entwicklungsarbeit eingeplant.", "",
          "## Prüfnachweis PKG-013 (SRC-0448–SRC-0459; Deckung offen)", "",
          "- `docs/ausbauplan.md`, SHA-256",
          "  `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`:",
          "  zwölf Originalblöcke und 65 ursprüngliche Kandidaten gegen aktuelle",
          "  Quell- und Zielstellen geprüft; SRC-0458/0459 einzeln im Tail-Lauf.",
          "- SRC-0450.a wurde in Galeriepflicht und damalige Fünfer-Ausnahme",
          "  getrennt; Datumsfragmente bleiben mit der jeweils folgenden Zeile",
          "  verbunden. Der Entwurf benennt Kajak-Referenz, aktuelle vier Ausnahmen,",
          "  historische Übersichtsseiten und die drei mobilen Wirkungen konkret.",
          "- SRC-0458 trennt den historischen EN-/DE-Live-Test auf drei damaligen",
          "  Seiten von heutigen Inhaltsseiten und den zwei späteren Redirects;",
          "  gespeicherte Sprachwahl und Riverstar auf `kajak.html` stehen im AC.",
          "- SRC-0459.b wurde in lokale Desktop-/Tablet-/Mobil-Gesamtvorschau",
          "  und ausdrückliche Nutzerabnahme des konkreten Release-Umfangs geteilt.",
          "  Erst danach und nach bestandenen Release-Prüfungen darf gemäß",
          "  Betriebsverfahren veröffentlicht werden; Trulli V11 allein gibt",
          "  den Gesamt-Release nicht frei. Umsetzung und Live-Stand sind ungeprüft.",
          "- SRC-0452.f/g/h bleiben Partially Covered: Bestätigung zweier",
          "  ZIP-Rückansichten ist keine Freigabe aller 14 Kajakbilder; die spätere",
          "  Entfernung von „Gemeinsam am Fluss“ und Einzelbildfreigaben müssen",
          "  am aktuellen Release-Umfang belegt werden. PKG-013 ist nicht bestanden.",
          "- Die früheren Live-, HTTP-, Health- und Neustartangaben sind datierte",
          "  Quellbelege. Aktuelle Implementierung, Sichtabnahme und Live-Stand",
          "  wurden in diesem Migrationslauf nicht geprüft.", "",
          "## Prüfnachweis PKG-014 (SRC-0460–SRC-0469; Deckung offen)", "",
          "- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 126 ursprüngliche Kandidaten gegen aktuelle Zielstellen geprüft; SRC-0461/0469 sind paraphrasierende Teilkarten, alle anderen Klauseln ergeben den Originalwortlaut.",
          "- SRC-0460.e wurde in datierten Teilstatus und ein eigenständiges Vorbeginn-Gate geteilt. Die 13 Kajak-Kacheln, sechs Reise-Archivtreffer, zwei Scott-Varianten, ein genauer Scott-Frame, acht Google-Originalbytes und deren neun angeforderte Downloads bleiben als historische oder aktuelle offene Belege differenziert.",
          "- V3-Fahrzeugfreigabe und Trulli V11 gelten nur motivweise. Seitenbild-Entscheidungen, weitere Variantenfreigaben, Kennzeichenprüfung, Release-Checks und konkrete Gesamtfreigabe bleiben offen. Alte 76/84-, 84/84- und 91-Smoke-Zahlen belegen keinen heutigen Release.",
          "- Nach der gezielten Coverage-Reparatur bleiben SRC-0464.f und SRC-0466.s Partially Covered; die übrigen sechs früheren Lücken haben jetzt konkrete Plan-AC. Die 13-Kachel-Gruppenabnahme und historische Einzelbildnachweise bleiben ausstehend. PKG-014 ist nicht als vollständig gedeckt abgenommen.", "",
          "## Prüfnachweis PKG-015 (SRC-0470–SRC-0479; Deckung offen)", "",
          "- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`: zehn vollständige Originalblöcke und 15 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraint-Register geprüft; die Kandidaten ergeben je Block exakt den Originalwortlaut.",
          "- SRC-0470.a, SRC-0472.a, SRC-0476.a und SRC-0477.a haben je zwei getrennt prüfbare Nachfolger. Der aktive GCS-Planwert 8–11 Zielstunden und die ältere README-Angabe 24 geschätzte Stunden bleiben als ungeklärter Bedeutungs-/Zeitkonflikt sichtbar (SRC-0470.a2).",
          "- Die EXPLORE-/MOVE-Briefs und Pakete sind getrennt geplant. VAN-Paketfestlegung und zehn GCS-Fakten sind historische Quellstände; Produktion, weitere Freigaben, Phase-0-Entscheidungen und schriftliche Abnahme sind offen. Technische Board-Referenz und verbindliche Arbeitsliste sind als Autoritätskontext bewahrt.",
          "- COVERAGE-R1-052: SRC-0470.a2 ist durch das bestehende ST-CON-01-AC planerisch gedeckt. Die Reichweite der beiden Stundenwerte bleibt bei SRC-0753.a als PUBLICATION_DECISION offen; die GCS-Veröffentlichung ist bis zur Freigabe gesperrt. Die Planmigration prüfte weder Implementierung noch Live-Zustand und erteilte keine Produkt- oder Release-Freigabe.", "",
          "## Prüfnachweis PKG-016 (SRC-0480–SRC-0489; Deckung offen)", "",
          "- `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4be2da22d03620a99ed1fd65`: zehn aktuelle vollständige Originalblöcke und 22 ursprüngliche Kandidaten mit Story-AC, Tasks, Matrix und Constraint-Register abgeglichen; jede Quellklausel bleibt wortgetreu rückverfolgbar.",
          "- Zusammengesetzte Phase-0-Entscheidungen, Datenstrukturen, Schutz- und UI-Kriterien sowie Marvin-Rechte wurden in 45 einzeln prüfbare Nachfolger geteilt. ST-BRD-01/02/03/04 nennen nun die konkreten AC; src-0483 gilt als Gate für alle vier Board-Stories.",
          "- Prioritätswerte, Fast-Track-Kriterien, Archivfrist, Review-Regeln, Beispiele, Warnungskatalog und Betriebsvertrag sind nur geplant. Ihre konkrete Festlegung und die schriftliche Phase-0-Abnahme bleiben offen; sie sind keine Implementierung oder Release-Freigabe.",
          "- SRC-0484.a1 bleibt Partially Covered: ST-BRD-01 bündelt noch Phase-0-Festlegung, Datenmodell, API und Boardbetrieb statt eines kleinen eigenständig abnehmbaren Vertical Slice. Vor Umsetzungsreife müssen Story- und Task-Zuordnung unter Erhalt der Quell-IDs geschnitten werden. PKG-016 ist nicht bestanden; Produkt, Live und Deployment wurden nicht geprüft.", "",
          "## Prüfnachweis PKG-017 (SRC-0490–SRC-0499; Deckung offen)", "",
          f"- `docs/ausbauplan.md`, SHA-256 `{next((row['ReviewedSourceSHA256'] for row in reviewed if row['ReviewPackage']=='PKG-017'), 'offen')}`: zehn vollständige Originalblöcke und 17 Kandidaten individuell gegen aktuelle Story-AC, Matrix und Constraints geprüft; die Klauseln ergeben je Block exakt den Originaltext.",
          "- SRC-0490 trennt Planner und Board auch bei freiwilligen Links. SRC-0491 bindet acht Prüffelder, Restore von Board/Inbox/Verlauf, geschützten Dump, Live-Nachprüfungen und nur bedingten Webdienst-Neustart an einen gesonderten freigegebenen Release. Die kleine Story-/Task-Zuordnung der bereichsübergreifenden Suite bleibt offen.",
          "- SRC-0492/0493 benennen Importgrenze und sichere Admin-Trennung. SRC-0494 ist nur der historische Reach-Nachweis vom 23.09.2026; SRC-0495–0499 bleiben geplante Trends, Metriken und dokumentierter Export-Analyse-Übernahmeablauf. Das Views-allein-Verbot gilt schon vor der Metrik-Implementierung.",
          "- SRC-0491.a ist nach der gezielten Coverage-Reparatur den prüfpflichtigen AC von ST-BRD-01 bis ST-BRD-04 zugeordnet; die Story- und Task-Slices sind planerisch benannt. Implementierung, Restore-Test, Release-Freigabe und Live-Prüfung bleiben offen.", "",
          "## Prüfnachweis PKG-018 (SRC-0500–SRC-0509; Deckung offen)", "",
          f"- `docs/ausbauplan.md`, SHA-256 `{next((row['ReviewedSourceSHA256'] for row in reviewed if row['ReviewPackage']=='PKG-018'), 'offen')}`: zehn Originalblöcke und 67 ursprüngliche Kandidaten gegen aktuelle Story-AC, Tasks, Matrix und Constraints einzeln geprüft. Die zehn Teilkarten von SRC-0509 sind paraphrasierende Fokusklauseln; der vollständige Originalblock bleibt in Matrix und Inventar erhalten.",
          "- Vier zusammengesetzte OPS-Kandidaten wurden in 13 prüfbare Nachfolger geteilt. Erstellung, rechtliche Prüfung, Auth-Platform-Nachweise, OAuth-Umschaltung/Verbindungstest und drei Cockpit-Datenregeln haben getrennte Kriterien.",
          "- Galerievorschau aus SRC-0504 braucht ausdrückliche Designabnahme; Direktnavigation und spätere 301-Redirects sind getrennt. Drei private Farbmuster, vier lokale Bildnutzungen, 83 Inventarvarianten, sechs Kontaktbögen und vier eng ausgenommene Fahrzeugbilder gelten nicht als Gesamtfreigabe.",
          "- SRC-0508.j/k und SRC-0509.a sind nach der gezielten Coverage-Reparatur mit konkreten Struktur-Slices abgedeckt. SRC-0504.b bleibt Partially Covered, bis die Galeriegestaltung ausdrücklich abgenommen ist. Historische Renderer-/HTML-/Scott-Belege bleiben von Implementierung, lokaler Gesamtvorschau, Release-Freigabe und Live-Nachweis getrennt.", "",
          "## Verbindliche Release-Entscheidungen", "",
          "- DEC-REL-001: ausdrückliche Nutzerfreigabe je Veröffentlichungs-/Deployment-Umfang.",
          "- DEC-REL-002: Test, Audit und Planabschluss sind keine Release-Freigabe.",
          "- DEC-REL-003: local-first; direkte Live-Bearbeitung ist ausgeschlossen.",
          "- SRC-0051.b, SRC-0052.d und SRC-0068.a sind mit Originaltext und",
          "  ausdrücklich abgelösten Teilen in `release-decisions.md` dokumentiert.", "",
          "## Offene Fragen und Deckungslücken im geprüften Umfang", "",
          *[f"- {row['AtomicID']} (`{row['Source']}:{row['Line']}`): {row['OpenQuestion']}"
            for row in open_questions],
          *[f"- {row['AtomicID']} ({row['PlanningCoverage']}): {row['ReviewReason']}"
            for row in gaps if not row.get('OpenQuestion')],
          "" if gaps or decisions else "- Keine.", "",
          "Alle ursprünglichen Kandidaten sind fachlich geprüft. Coverage-Reparatur und Abnahmeschranken bleiben offen.", ""]
(MIG / "atomic-coverage-report.md").write_text("\n".join(report), encoding="utf-8")
print(f"packages={packages}, blocks={len(source_ids)}, reviewed_candidates={len(reviewed)}, remaining={len(unreviewed)}, independent={len(independent)}")
