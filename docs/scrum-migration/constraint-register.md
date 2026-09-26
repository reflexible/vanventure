# Constraint-Register des Scrum-Migrationsentwurfs

Jeder Anker verweist auf genau einen Originalblock. Die Originalquelle bleibt bindend;
die Story-Zuordnung in der Matrix ist eine Anwendung, keine Abschwächung des Wortlauts.
Historische Statusangaben sind nur für ihren belegten Stand gültig.

## src-0001

- Quelle: `AGENTS.md:5` · Working rules / Plan status is part of every delivery
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Alle neuen und bestehenden Projektpläne müssen der verbindlichen [Scrum-Planungsregel](docs/project-rules/scrum-planning.md) entsprechen. Bestehende Pläne dürfen erst nach vollständiger Migration und bestandenem Coverage-/Traceability-Check ersetzt oder entfernt werden.

## src-0002

- Quelle: `AGENTS.md:10` · Working rules / Plan status is part of every delivery
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: - Before adding or changing a website analytics event, read [`docs/analytics.md`](docs/analytics.md). Define event names and properties there, never ad hoc in a page or component. Provider-specific analytics code is allowed only inside the analytics provider adapter; the active task list is in [`docs/ausbauplan.md`](docs/ausbauplan.md).

## src-0003

- Quelle: `AGENTS.md:16` · Working rules / Plan status is part of every delivery
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Every completed project task must update every affected plan, overview, and implementation-status document in the same turn. The status must distinguish local preparation from a verified live rollout and name remaining work plainly.

## src-0004

- Quelle: `AGENTS.md:19` · Working rules / Plan status is part of every delivery
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Before reporting completion, reconcile duplicate status entries across the relevant plan documents so they never contradict one another.

## src-0005

- Quelle: `AGENTS.md:24` · Working rules / Consolidated mandate, approvals, and evidence
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - For VanVenture work, read the binding consolidated mandate in [`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`](docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md) before starting a relevant implementation. It governs evidence, original protection, approval gates, and acceptance reporting; the technical template details remain in [`docs/responsive-templates.md`](docs/responsive-templates.md) and approved visual rules remain in [`docs/design-guide.md`](docs/design-guide.md).

## src-0006

- Quelle: `AGENTS.md:30` · Working rules / Consolidated mandate, approvals, and evidence
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Do not make a new design rule, global component variant, or design exception binding or live without the user's explicit approval. Apply already approved rules without asking again. After an approved change, update the design guide, implementation, tests, and status evidence together; never revise the guide merely to justify an unapproved or faulty implementation.

## src-0007

- Quelle: `AGENTS.md:35` · Working rules / Consolidated mandate, approvals, and evidence
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - For each completed relevant change, keep an evidence matrix and an acceptance report with the tested source state, result, scope, reproducible checks, and plainly named untested or blocked items. Local preparation, repository state, successful checks, approval, and live verification are distinct statuses.

## src-0008

- Quelle: `AGENTS.md:39` · Working rules / Consolidated mandate, approvals, and evidence
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Consolidate each newly commissioned requirement into its existing authoritative project document in the same change. Public content galleries, including the kayak reference, must use one shared component and the approved photo viewer; read sections 6.1 and 15.1 of the consolidated mandate before changing them.

## src-0009

- Quelle: `AGENTS.md:46` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - This rule applies to every task and every new chat opened for this project.

## src-0010

- Quelle: `AGENTS.md:47` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Local-first is mandatory.** Never make, test, or hotfix a requested change directly on the production host. Before any rollout, update the local target branch from its authoritative remote, implement and verify the change locally, commit it, and push that exact commit. Deploy production only from this pushed, locally verified commit; record its commit SHA in the acceptance evidence. If the local branch cannot be reconciled with the authoritative remote state, stop before rollout and report the concrete divergence.

## src-0011

- Quelle: `AGENTS.md:48` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Unless the user explicitly asks to keep work local, every requested website, cockpit, editorial, or operational change includes its rollout to the production host at `vanventure.at`. Do not leave a completed requested change only in the local workspace for the user to transfer or synchronize manually.

## src-0012

- Quelle: `AGENTS.md:52` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Prefer a live-safe update without restarting a container whenever the deployed architecture actually supports it. Do not modify the read-only running container or bypass the release process merely to avoid a restart. When an image rebuild or database migration is required, restart only the affected web service; PostgreSQL, Caddy, public files, and unrelated services remain running.

## src-0013

- Quelle: `AGENTS.md:57` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Before a production rollout, run the relevant release checks. Create a protected database dump only when the rollout changes persistent data, applies a database migration, or otherwise makes a material change that is not easily reversible. A backup is not required for a reversible presentation, CSS, JavaScript, or stateless application update. After rollout, verify `/healthz`, the affected private or public route, and the visible result on the live host.

## src-0014

- Quelle: `AGENTS.md:63` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Report the live URL and whether a web-service restart was necessary. A failed check blocks the rollout; report the concrete blocker instead of claiming that the change is live.

## src-0015

- Quelle: `AGENTS.md:66` · Working rules / Live deployment by default
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Use this fixed production workflow for every task: **synchronize the local target branch → make and test the change locally → commit and push the verified commit → open a short-lived remote session → deploy that exact commit → verify the live result → close the session**. Close every SSH session, deployment shell, tunnel, and background helper immediately after verification. Do not leave an interactive or persistent remote session open between tasks; every later task opens its own short-lived connection.

## src-0016

- Quelle: `AGENTS.md:76` · Working rules / Protected photo archive
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - `E:\_fotos_original` and the user-specified `E:\_fotos\_original` are strictly read-only, including every subfolder and file.

## src-0017

- Quelle: `AGENTS.md:77` · Working rules / Protected photo archive
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Never modify, rename, move, delete, overwrite, retouch, or write metadata or generated files anywhere in these archives.

## src-0018

- Quelle: `AGENTS.md:78` · Working rules / Protected photo archive
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Copy selected source photos into the project first. Perform all subsequent processing only on project copies.

## src-0019

- Quelle: `AGENTS.md:79` · Working rules / Protected photo archive
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Preserve an unchanged project copy of each selected original and record its source path.

## src-0020

- Quelle: `AGENTS.md:80` · Working rules / Protected photo archive
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - The shared archive's Windows ACL remains unchanged by VanVenture work. Enforce read-only archive access in the isolated project workflow; reject overwriting an unchanged project copy and verify source/copy checksums.

## src-0021

- Quelle: `AGENTS.md:86` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Bei jeder Aufgabe, bei der Bilder für vanventure.at ausgewählt, bearbeitet, zugeschnitten, optimiert, exportiert, eingebunden, ersetzt oder veröffentlicht werden, muss der Bild-Skill [`C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md`](C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md) gelesen und angewendet werden. Die Anwendung erfolgt ohne zusätzliche Erinnerung durch den Nutzer. Diese Pflicht gilt auch, wenn die Bildarbeit nur Teil einer größeren Aufgabe ist, etwa beim Erstellen eines Reiseberichts oder beim Überarbeiten einer Seite.

## src-0022

- Quelle: `AGENTS.md:87` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Geltungsbereich:** Alle Bilder der gesamten Website, einschließlich Startseite, Fahrzeugseiten, Kajak-/Aktivitätsseiten, Reiseberichten, Übersichts- und Ausrüstungsseiten. Dazu gehören Hero- und Hintergrundbilder, Bilder im Fließtext, Galerien, Vorschaubilder, vergrößerte Lightbox-Ansichten und sämtliche Desktop-, Tablet- und Mobilvarianten. Die Ausnahme der Startseite von der Template-Vereinheitlichung ist keine Ausnahme von dieser Bildrichtlinie.

## src-0023

- Quelle: `AGENTS.md:88` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Jeweils die für den Bildtyp zutreffenden Skill-Vorgaben anwenden. Eine gemeinsame Bildrichtlinie bedeutet nicht, alle Motive blind mit identischen Bearbeitungseinstellungen zu behandeln. Bestehende Projektregeln zum Schutz der Originalbilder, zur Bildbearbeitung und zu Veröffentlichungsfreigaben bleiben erhalten. Widersprüche ausdrücklich melden, nicht stillschweigend eine Regel ignorieren.

## src-0024

- Quelle: `AGENTS.md:89` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Vor der Veröffentlichung müssen alle im jeweiligen Auftrag neu hinzugefügten oder geänderten Bilder geprüft sein. Bereits geprüfte und unveränderte Bilder müssen nicht erneut bearbeitet werden.

## src-0025

- Quelle: `AGENTS.md:90` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Ist der Skill nicht zugänglich oder eine erforderliche Prüfung nicht möglich, den konkreten offenen Punkt melden und die betroffenen Bilder nicht als geprüft oder freigegeben ausgeben.

## src-0026

- Quelle: `AGENTS.md:91` · Working rules / Verbindliche Bildrichtlinie für vanventure.at
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - Diese Anwendungspflicht gilt ausschließlich für vanventure.at. Keine entsprechende Pflicht in globale Codex-Anweisungen oder andere Projekte eintragen.

## src-0027

- Quelle: `AGENTS.md:95` · Working rules / Website photos
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Anonymize all visible vehicle license plates in published/preview web images, including enlarged views and background vehicles. Work only on project derivatives; preserve unchanged original copies.

## src-0028

- Quelle: `AGENTS.md:96` · Working rules / Website photos
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Photos embedded in editorial text across the entire website (travel stories, vehicle page and kayak section) should open an enlarged view on click, with keyboard-accessible close controls. Use the shared photo-viewer.js / photo-viewer.css in static pages and page generators.

## src-0029

- Quelle: `AGENTS.md:100` · Working rules / Responsive public-site templates
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Where public subpages exist, link directly to them in the navigation; do not introduce an overview page or overview menu item unless the user expressly requests one. Preserve existing overview URLs for inbound-link compatibility unless their removal is separately authorized. The user subsequently authorized retiring the equipment/bike overview content and internal links; those two legacy addresses redirect to the homepage. This rule is VanVenture-only.

## src-0030

- Quelle: `AGENTS.md:107` · Working rules / Responsive public-site templates
- Anwendung: ST-WEB-02, ST-WEB-04
- Verbindlicher Originalwortlaut: - Public subpages use central responsive components and the designated reusable kayak/activity, vehicle, and travel-story templates. Shared markup, CSS, and behavior must not be copied or maintained separately per page. The current kayak page is the design reference. These rules apply on desktop, tablet, and smartphone. The homepage retains its independent layout and its existing presentation and functions at every screen size; shared components must not change it unintentionally. Page-specific differences are implemented through content, configuration, or explicitly defined variants. Before relevant changes, read the complete binding specification in [`docs/responsive-templates.md`](docs/responsive-templates.md) and apply its acceptance criteria.

## src-0031

- Quelle: `AGENTS.md:111` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Treat travel photos as documentary records. Preserve the real scene, people, faces, body proportions, expression, clothing, equipment, animal appearance, and composition. Do not add, remove, move, or replace pictured elements.

## src-0032

- Quelle: `AGENTS.md:112` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - **Personenentscheidung vom 24.09.2026:** Auf VanVenture-Fotos erkennbare Kinder anonymisieren. Gesichter Erwachsener nur dann anonymisieren, wenn der Nutzer es für das betreffende Motiv ausdrücklich verlangt; Erwachsene nicht vorsorglich oder pauschal maskieren. Helmut und Sabine dürfen sichtbar bleiben. Bei unklarer Alterszuordnung oder fehlender Veröffentlichungsentscheidung das betroffene Bild zurückstellen und den Nutzer ausdrücklich fragen. Diese Regel gilt nur für VanVenture und ändert nichts am Kennzeichenschutz. Ein erkennbares Kind darf weiterhin nur nach ausdrücklicher Auswahl des Fotos veröffentlicht werden.

## src-0033

- Quelle: `AGENTS.md:113` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Wo eine Gesichts- oder Kennzeichenanonymisierung konkret beauftragt ist, nur die sichtbaren identifizierenden Merkmale beziehungsweise Kennzeichenzeichen mit eng sitzender Maske, kleinem Sicherheitsrand und weichen Kanten bearbeiten. Keine groben Blöcke oder Überläufe auf Haare, Kleidung, Körper oder Hintergrund. Bei 100% und in jeder Webgröße auf Unlesbarkeit prüfen. Nicht identifizierende Rückansichten brauchen keine Gesichtsmaske.

## src-0034

- Quelle: `AGENTS.md:114` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - For a restrained VanVenture outdoor-editorial grade, correct white balance and exposure, recover plausible highlight/shadow detail, keep real skin texture, keep greens moody but plausible, slightly desaturate sky/water blues, subtly support warm browns/oranges, and use controlled filmic contrast with gently lifted blacks. Keep the daylight character. Tune by image rather than applying fixed values. Avoid beauty retouching, face/body reshaping, artificial bokeh, HDR, excessive saturation, or invented "golden hour" light.

## src-0035

- Quelle: `AGENTS.md:115` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Remove human-made distractions only after the user confirms the exact elements. Work locally on a project derivative, repair only the confirmed distraction, and inspect the repaired area at 100% for repeated texture, seams, or changes to nearby scene details. Do not infer approval to remove adjacent poles, buildings, people, or objects.

## src-0036

- Quelle: `AGENTS.md:116` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Do not use headshot treatment, a neutral background replacement, or portrait-style transformations for travel images. Portrait-like images are optional editorial moments, not a separate portrait series.

## src-0037

- Quelle: `AGENTS.md:117` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Keep an unchanged project copy and a source-path/hash record before any derivative is made. Produce all edited, resized, or anonymized versions from that project copy.

## src-0038

- Quelle: `AGENTS.md:118` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Treat any AI-enhanced image as a review derivative until explicitly approved. It must be visually compared with its unchanged project copy and must never become the only retained version.

## src-0039

- Quelle: `AGENTS.md:119` · Working rules / Editorial photo processing
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Do not publish images with recognizable children unless the user explicitly selects them for publication.

## src-0040

- Quelle: `README.md:3` · VanVenture Website
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Die zweisprachige Homepage und die Reiseberichte laufen produktiv auf dem Contabo-Server Marvin: https://vanventure.at/. Der frühere GitHub-Pages-Auftritt besteht als ältere Veröffentlichung. Der verbindliche Überblick für Prioritäten, Phasen und neue Ideen steht im [Ausbauplan](docs/ausbauplan.md); SEO und Live-Betrieb sind unter [docs/seo.md](docs/seo.md) dokumentiert.

## src-0041

- Quelle: `README.md:5` · VanVenture Website
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Für Website- und Bildänderungen gelten zusätzlich der [konsolidierte Gesamtauftrag](docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md), die [Template-Spezifikation](docs/responsive-templates.md) und der [Design Guide](docs/design-guide.md). Diese Dokumente unterscheiden Dokumentation, Prüfung, Freigabe und Live-Verifikation ausdrücklich.

## src-0042

- Quelle: `README.md:13` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-PHOTO-03, ST-SEO-07
- Verbindlicher Originalwortlaut: 1. Aktuelle Fahrzeugdaten und Fotos

## src-0043

- Quelle: `README.md:14` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-SEO-04, ST-SEO-05, ST-SEO-06
- Verbindlicher Originalwortlaut: 2. Reiseberichte mit Routen, Karten, Kosten und Stellplätzen

## src-0044

- Quelle: `README.md:15` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-WEB-06
- Verbindlicher Originalwortlaut: 3. Echte Ausrüstungsliste und Kennzeichnung möglicher Affiliate-Links

## src-0045

- Quelle: `README.md:16` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-WEB-07
- Verbindlicher Originalwortlaut: 4. Kontakt-E-Mail, Impressum und Datenschutzerklärung

## src-0046

- Quelle: `README.md:17` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-OPS-02
- Verbindlicher Originalwortlaut: 5. Google-Produktionsfreigabe erst nach Rechtstexten, Domainbestätigung und erforderlicher Scope-Verifizierung

## src-0047

- Quelle: `README.md:19` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 6. Privates Familien-Scrum-Board für gemeinsame Aufgaben; der Content Planner bleibt davon getrennt

## src-0048

- Quelle: `README.md:22` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-AUTH-01
- Verbindlicher Originalwortlaut: Der gemeinsame Google-Login für Redaktion und Cockpit ist auf Marvin live abgenommen und nutzt einen eigenen, minimal berechtigten OAuth-Webclient. Die Anmeldung mit einem freigegebenen sowie die Ablehnung eines nicht freigegebenen Google-Kontos sind verifiziert. Der getrennte YouTube-Zugang bleibt davon unberührt.

## src-0049

- Quelle: `README.md:28` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-CON-01, ST-CON-02, ST-CON-03
- Verbindlicher Originalwortlaut: Der erste verbindliche Content-Test ist ebenfalls produktiv vorbereitet: „GCS nach einem Jahr“ ist im Cockpit gebrieft, mit 24 geschätzten Stunden versehen; zehn geprüfte GCS-Fakten liegen im Master Context. Die noch offenen Test-Briefs für EXPLORE und MOVE stehen im Gesamtplan.

## src-0050

- Quelle: `README.md:33` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: Die Sprachumschaltung übersetzt auf Kajak/Riverstar, Ausrüstung und Rädern auch die redaktionellen Inhalte. EN und der Rückwechsel auf DE sind live geprüft.

## src-0051

- Quelle: `README.md:36` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Zum lokalen Ansehen `index.html` in einem Browser öffnen. Keine Veröffentlichung oder externe Änderung erfolgt ohne ausdrückliche Freigabe.

## src-0052

- Quelle: `README.md:38` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Homepage und geschützte Redaktion laufen auf dem Contabo-Server Marvin gemeinsam in Docker mit PostgreSQL. Die Redaktion ist unter https://vanventure.at/redaktion erreichbar. Überarbeitungen werden im Codex-Chat beauftragt. Änderungen dürfen auf Benutzerauftrag direkt im Live-System bereitgestellt werden; ein kurzer Neustart ist akzeptiert. Die Serverdatenbank ist maßgeblich. Der lokale Docker-Stack ist gestoppt, sein Datenbank-Volume bleibt erhalten. Technische Grundlagen stehen unter [editor/README.md](editor/README.md).

## src-0053

- Quelle: `README.md:40` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Vor einem GitHub-Pages-Release `node tools/export-pages.mjs` ausführen: Das exportiert die freigegebenen Datenbankberichte in `travel-stories.json`, aktualisiert die Startseite und baut die statischen Reiseseiten. Dafür müssen Docker und Python verfügbar sein; bei Bedarf `DOCKER_BIN` und `PYTHON_BIN` setzen. Zugangsdaten, Datenbankdumps, Originalbilder und private Analyseunterlagen werden nicht eingecheckt.

## src-0054

- Quelle: `README.md:42` · VanVenture Website / Noch offen – maßgeblich im Gesamtplan
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Für Releases des privaten Serverteils gelten die wiederholbaren Prüfungen in [docs/betrieb.md](docs/betrieb.md). `npm run check:release` führt Tests, Konfigurationsprüfung, Dump und Healthcheck aus; `npm run monitor:cockpit` liefert einen sicher gekürzten Cockpit-Status für den Server-Monitor.

## src-0055

- Quelle: `CONTRIBUTING.md:5` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: `main` is the production branch. Do not work directly on it.

## src-0056

- Quelle: `CONTRIBUTING.md:7` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Create one focused branch per change:

## src-0057

- Quelle: `CONTRIBUTING.md:9` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - `feature/<short-topic>` for a new capability

## src-0058

- Quelle: `CONTRIBUTING.md:10` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - `fix/<short-topic>` for a bug fix

## src-0059

- Quelle: `CONTRIBUTING.md:11` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - `content/<short-topic>` for website content

## src-0060

- Quelle: `CONTRIBUTING.md:12` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - `chore/<short-topic>` for maintenance and tooling

## src-0061

- Quelle: `CONTRIBUTING.md:14` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Update your local `main` before starting a branch:

## src-0062

- Quelle: `CONTRIBUTING.md:16` · Contributing to VanVenture / Branches
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: ```bash git switch main git pull --ff-only git switch -c feature/<short-topic> ```

## src-0063

- Quelle: `CONTRIBUTING.md:24` · Contributing to VanVenture / Change process
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 1. Keep each change focused and reversible.

## src-0064

- Quelle: `CONTRIBUTING.md:25` · Contributing to VanVenture / Change process
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 2. Check the website locally before committing.

## src-0065

- Quelle: `CONTRIBUTING.md:26` · Contributing to VanVenture / Change process
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 3. Use an imperative commit title, for example `Add vehicle profile section`.

## src-0066

- Quelle: `CONTRIBUTING.md:27` · Contributing to VanVenture / Change process
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 4. Push the branch and open a pull request into `main`.

## src-0067

- Quelle: `CONTRIBUTING.md:28` · Contributing to VanVenture / Change process
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 5. Merge only after the change has been reviewed and explicitly approved for public release.

## src-0068

- Quelle: `CONTRIBUTING.md:32` · Contributing to VanVenture / Content and publishing
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: All public-facing text, images, links, social posts, DNS changes, and production releases require Helmut's explicit approval immediately before publication.

## src-0348

- Quelle: `docs/analytics.md:3` · VanVenture Analytics – fachliche und technische Vorgaben
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Stand: 25. September 2026. **Status: beauftragt und dokumentiert; Bestandsanalyse, technische Umsetzung und Live-Abnahme offen.** Der [Ausbauplan](ausbauplan.md) ist die einzige aktive Arbeitsliste mit den Kennungen `ANALYTICS 0–8`. Dieses Dokument hält den vom Nutzer gelieferten Detailplan als fachliche Referenz fest. Konkrete Dateipfade und Betriebsentscheidungen werden erst nach ANALYTICS 0 festgelegt.

## src-0349

- Quelle: `docs/analytics.md:12` · VanVenture Analytics – fachliche und technische Vorgaben / Ziel und Architekturgrenze
- Anwendung: ST-AN-01, ST-AN-06
- Verbindlicher Originalwortlaut: Website, Templates, Reiseberichte, Galerien und CMS-Komponenten verwenden ausschließlich eine zentrale VanVenture-API wie `analytics.pageView()` und `analytics.track()`. VanVenture definiert die Bedeutung seiner Events. Provider-spezifische Aufrufe, insbesondere `umami.track`, `_paq` und `gtag`, sind außerhalb der Provider-Adapter verboten. Providerwahl erfolgt zentral per Konfiguration. Pflichtadapter sind Null und zunächst Umami; Matomo, GA4 oder eine eigene Lösung sollen später ohne Änderungen an Content-Komponenten einsetzbar sein. Ein zeitlich begrenzter Parallelbetrieb ist als Migrationsmöglichkeit vorzusehen, aber kein Standardbetrieb.

## src-0350

- Quelle: `docs/analytics.md:22` · VanVenture Analytics – fachliche und technische Vorgaben / Ziel und Architekturgrenze
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Vor Implementierung sind Projektstruktur, Routing, Generatoren, bestehendes Tracking, Authentifizierung/Rollen, CMS- und Content-Status, Draft/Preview, Publishing, Umgebungen, Datenbank, Docker, CSP, Tests, Datenschutzlogik und geltende Projektregeln zu analysieren. Der Bestand, Integrationspunkte, Konflikte, wiederverwendbare Funktionen, konkrete Dateistruktur und nötige Änderungen sind zu dokumentieren. Bestehende Architektur wird erweitert, nicht durch ein paralleles System ersetzt.

## src-0351

- Quelle: `docs/analytics.md:32` · VanVenture Analytics – fachliche und technische Vorgaben / Tracking-Policy und Provider
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Tracking ist nur zulässig, wenn **alle** Bedingungen erfüllt sind: Production, öffentliche Website, anonymer Besucher, veröffentlichter Inhalt, kein Preview/CMS/Admin-Bereich und Analytics aktiviert. Eingeloggte Admins oder Editoren bleiben auch auf öffentlichen Seiten ungetrackt. Drafts, geplante Seiten, Tests, localhost und Development werden nicht getrackt; Staging ist standardmäßig aus. In ausgeschlossenen Fällen lädt nach Möglichkeit nicht einmal das externe Script und es wird keine Anfrage an den Provider gesendet. Der Null-Provider macht keine Netzwerkanfrage und speichert nichts. Provider, Aktivierung und Umami-Konfiguration werden zentral über Environment gesteuert; keine Secrets in Git, Browser-Code oder Dokumentation.

## src-0352

- Quelle: `docs/analytics.md:43` · VanVenture Analytics – fachliche und technische Vorgaben / Tracking-Policy und Provider
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Der Analytics-Core prüft Policy, gültige Eventnamen und Properties, entfernt sensible Daten, normalisiert URL und Kontext und übergibt erst dann an den gewählten Adapter. Umami Identify und persönliche Besucherprofile werden nicht verwendet. Automatische Umami-Pageviews sind so zu behandeln, dass VanVenture den `page_view` allein auslöst und keine doppelten Aufrufe entstehen.

## src-0353

- Quelle: `docs/analytics.md:51` · VanVenture Analytics – fachliche und technische Vorgaben / Event Schema v1
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Namen sind stabil, eindeutig, englisch, klein geschrieben und `snake_case`. Jedes Event trägt `schema_version: 1`. Bei einer grundlegenden Änderung wird die Version erhöht; bestehende Namen werden möglichst beibehalten. VanVenture erlaubt nur zentral definierte Namen und Properties, keine frei übernommenen Strings aus Komponenten oder Benutzereingaben. Unbekannte Properties werden verworfen oder abgelehnt; Werte erhalten Typ- und Längenbegrenzungen.

## src-0354

- Quelle: `docs/analytics.md:59` · VanVenture Analytics – fachliche und technische Vorgaben / Event Schema v1
- Anwendung: ST-AN-04
- Verbindlicher Originalwortlaut: Der erste Katalog umfasst `page_view`, `article_50_percent`, `article_90_percent`, `related_content_click`, `gallery_open`, `gallery_image_view`, `video_start`, `youtube_click`, `instagram_click`, `facebook_click`, `gear_click`, `cta_click`, `language_switch` und `error_404_view`. `gallery_image_view` wird nur bei begründetem Nutzen und vertretbarem Volumen aktiviert. Lesetiefe-Ereignisse gelten nur für passende Artikel und jeweils einmal pro Page View. Kein Event für jeden Scrollschritt, Swipe, Hover oder jede Mausbewegung. `video_start` setzt einen tatsächlich erkennbaren Start voraus; YouTube-Embed und Consent sind separat zu prüfen.

## src-0355

- Quelle: `docs/analytics.md:69` · VanVenture Analytics – fachliche und technische Vorgaben / Event Schema v1
- Anwendung: ST-AN-02
- Verbindlicher Originalwortlaut: Der kontrollierte Kontext kann `content_id`, `content_type`, `section`, `route`, `language`, `destination_type`, `destination_id`, `campaign`, `source`, `medium`, `placement` und `schema_version` enthalten. Relevante veröffentlichte Inhalte erhalten eine stabile `content_id`, bevorzugt aus der bestehenden Content-/CMS-Struktur; ein URL-Wechsel ändert diese ID nicht. Es entsteht keine zweite parallele Content-ID-Verwaltung.

## src-0356

- Quelle: `docs/analytics.md:78` · VanVenture Analytics – fachliche und technische Vorgaben / Datenschutz, URL und Kampagnen
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Namen, E-Mail, Login, interne User- und Google-IDs, IP als Event-Property, Formularinhalte, Kommentare, persönliche Suchtexte, Freitext und Authentifizierungsdaten werden nie als Analytics-Properties übertragen. Keine Fingerprints, Profile, Cross-Site-Verfolgung, versteckte Methoden oder Adblocker-Umgehung. Der Betrieb und die Website-Rechtstexte sind vor der Produktivschaltung anhand der konkreten Umami-Konfiguration zu prüfen.

## src-0357

- Quelle: `docs/analytics.md:85` · VanVenture Analytics – fachliche und technische Vorgaben / Datenschutz, URL und Kampagnen
- Anwendung: ST-AN-01, ST-AN-05
- Verbindlicher Originalwortlaut: URLs werden zentral normalisiert; `window.location.href` wird nicht blind übertragen. Unbekannte oder sensible Query-Parameter entfallen. Der UTM-Standard unterstützt `utm_source`, `utm_medium`, `utm_campaign` und `utm_content` über einen zentralen Helper. Werte sind kurz, stabil, klein geschrieben, ohne Leerzeichen und ohne personenbezogene Daten. Für dieselbe Kampagne wird derselbe Kampagnenname auf Instagram, Facebook, YouTube und QR verwendet, zum Beispiel `sardinia_movie`.

## src-0358

- Quelle: `docs/analytics.md:95` · VanVenture Analytics – fachliche und technische Vorgaben / Betrieb, Nachweise und Grenzen
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Analytics lädt asynchron und außerhalb des kritischen Rendering-Pfads. UI und Navigation warten nie auf den Provider; sein Ausfall darf die Website nicht beeinträchtigen. CSP wird nur um notwendige Domains erweitert, niemals pauschal mit `script-src *` oder `connect-src *` geöffnet.

## src-0359

- Quelle: `docs/analytics.md:100` · VanVenture Analytics – fachliche und technische Vorgaben / Betrieb, Nachweise und Grenzen
- Anwendung: ST-AN-01, ST-AN-06
- Verbindlicher Originalwortlaut: Unit-Tests prüfen Policy, Event/Property-Validierung, Kontext, URL-Sanitizing, UTM-Normalisierung, Providerwahl, Null- und Umami-Mapping. Integration und E2E prüfen erlaubte öffentliche anonyme Aufrufe sowie ausgeschlossene Login-, CMS-, Draft-, Planned-, Preview-, localhost-, Development-, Test- und Staging-Fälle auf **fehlendes Script und fehlende externe Netzwerkanfrage**. Ein Architekturtest verbietet direkte Provider-APIs außerhalb der Adapter. Providerwechsel muss mit Testadapter ohne Content-Änderung nachweisbar sein.

## src-0360

- Quelle: `docs/analytics.md:109` · VanVenture Analytics – fachliche und technische Vorgaben / Betrieb, Nachweise und Grenzen
- Anwendung: ST-AN-05, ST-AN-07
- Verbindlicher Originalwortlaut: Reporting soll Seitenreichweite, Lesetiefe, Wege zu YouTube/Related Content, Social- und Kampagnenquellen, Ausrüstungsinteresse, mobile Landingpages und VAN/BIKE/KAYAK/EXPLORE-Inhalte auswertbar machen. Umami-Goals werden sparsam gewählt; Funnels bleiben Provider-Konfiguration. Search Console und ein mögliches Cloudflare-Performance-Monitoring bleiben technisch getrennt. Eigene anonyme Tagesaggregate in PostgreSQL sind nur eine spätere Entscheidung, keine Anforderung der ersten Implementierung. Session Replay, Heatmaps, Fingerprinting, Nutzerprofile, Cross-Site-Tracking, vollständige Rohdatenplattform und Machine-Learning-Auswertung gehören nicht dazu.

## src-0361

- Quelle: `docs/analytics.md:119` · VanVenture Analytics – fachliche und technische Vorgaben / Betrieb, Nachweise und Grenzen
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: Analytics ändert weder Design noch Templates, Publishing, Authentifizierung, Rollen, Bilder oder Originalschutz. Bestehende Freigaben und der reguläre Release-Prozess gelten weiter.

## src-0383

- Quelle: `docs/ausbauplan.md:85` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / ANALYTICS 0–8. Providerunabhängige Website-Analytics
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: **Auftrag vom 25. September 2026; Status: geplant, keine Analytics-Implementierung.** Die fachlichen Regeln stehen in [Analytics](analytics.md). Diese Gruppe ist die einzige aktive Analytics-Arbeitsliste. VanVenture definiert API, Policy, Events, Properties und Content-IDs; Umami ist nur der erste austauschbare Adapter. YouTube-Analytics im Cockpit, Search Console und mögliches Cloudflare-Monitoring bleiben getrennt. CMS 3 liefert später veröffentlichte dynamische Seiten; ANALYTICS 0–5 können mit den bestehenden öffentlichen Seiten beginnen.

## src-0384

- Quelle: `docs/ausbauplan.md:93` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / ANALYTICS 0–8. Providerunabhängige Website-Analytics
- Anwendung: ST-AN-01
- Verbindlicher Originalwortlaut: **Fortschrittsregel:** Jede `ANALYTICS n.m`-Kennung bezeichnet eine einzeln abnehmbare Story. Erst nach Umsetzung und reproduzierbarer Prüfung wird sie als erledigt markiert und ihr Text durchgestrichen; bei produktiven Änderungen zusätzlich nach Commit, Push, Live-Prüfung und Abnahmebericht. Ein Epic gilt erst als erledigt, wenn alle seine Stories erledigt sind. Die letzte Story einer Stufe nennt das sichtbare Ergebnis. Offene Entscheidungen und externe Abhängigkeiten bleiben ausdrücklich offen; spätere optionale Ausbauten werden nicht vorweggenommen.

## src-0415

- Quelle: `docs/ausbauplan.md:238` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / CMS 1–6. Bestehende Website schrittweise um eine Seitenverwaltung erweitern
- Anwendung: ST-CMS-01
- Verbindlicher Originalwortlaut: **Auftrag vom 25. September 2026; Status: geplant, nicht implementiert.** Die bestehende Node.js-/PostgreSQL-Architektur mit Redaktion, Cockpit, Google-Login, Design Guide und responsiven Templates wird erweitert. Es gibt kein paralleles CMS und keinen Framework-Wechsel. Inhalte sind datengetrieben; Layout und Gestaltung bleiben in den freigegebenen Templates und Komponenten. Diese Gruppe ergänzt die offenen Template-Arbeiten unter 1C, den Content Planner und Master Context unter 2 sowie Website/SEO unter 5; deren bisherige Abnahmen und Freigaben werden nicht durch CMS-Häkchen ersetzt.

## src-0416

- Quelle: `docs/ausbauplan.md:247` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / CMS 1–6. Bestehende Website schrittweise um eine Seitenverwaltung erweitern
- Anwendung: ST-CMS-01
- Verbindlicher Originalwortlaut: **Fortschrittsregel:** Jede nummerierte Checkbox wird erst nach lokaler Prüfung und dokumentiertem Ergebnis abgehakt. Für produktive Funktionen werden Commit, Push und Live-Prüfung gesondert ausgewiesen. Ein abgeschlossenes Teilpaket ist keine Freigabe für die Migration weiterer Seiten. Unveröffentlichte Inhalte werden niemals allein durch Speichern öffentlich. Bilder und neue Designregeln unterliegen weiterhin den bestehenden Prüf- und Freigaberegeln.

## src-0439

- Quelle: `docs/ausbauplan.md:334` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1. Gemeinsamen Google-Login vor dem Umschalten sauber umsetzen
- Anwendung: ST-AUTH-01
- Verbindlicher Originalwortlaut: Der bestehende Passwort-Login bleibt aktiv, bis diese Phase vollständig abgenommen ist. Die Freigabeliste wird ausschließlich in der vorhandenen Benutzerverwaltung gepflegt; es gibt keine offene Registrierung und keine automatische Google-Kontoübernahme.

## src-0452

- Quelle: `docs/ausbauplan.md:411` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1A. Einheitlichen Design Guide und Hero-Standard etablieren
- Anwendung: ST-WEB-01
- PKG-013-Einordnung: Die Freigabe des Design Guide V1 vom 22. September 2026 ist historisch belegt; sein Geltungsbereich umfasst alle öffentlichen Seiten. Bei jeder Gestaltungsänderung bleibt die Prüfung mit ausdrücklichem Hinweis auf einen möglichen Guide-Zusatz nötig. Das ist keine neue Gestaltungsfreigabe.
- Offener Bildbefund: Die Bestätigung zweier ZIP-Rückansichten mit Kindern belegt keine Freigabe aller damals 14 Galeriebilder. „Gemeinsam am Fluss“ steht im Widerspruch zur späteren Entfernungsanweisung; der aktuelle Bildbestand, die Einzelfreigaben und die Abnahme der verbleibenden Bilder sind gesondert nachzuweisen. Der Live-Beleg vom 22. September darf dafür nicht verwendet werden.
- Zeitbezug: Die damals genannten Ausrüstungs- und Radübersichten sind nach der späteren Redirect-Entscheidung keine heutigen Inhaltsziele. Die heutige Galerie-Ausnahme betrifft ausschließlich vier vorbereitende Radprofile und endet profilweise erst nach Bild- und Faktenfreigabe.
- Verbindlicher Originalwortlaut: Der [Design Guide V1](design-guide.md) ist am 22. September 2026 freigegeben worden und gilt für alle öffentlichen Seiten. Bei jeder gestalterischen Änderung wird geprüft und ausdrücklich darauf hingewiesen, ob der Guide ergänzt werden soll. Der Kajak-Hero und die Kajak-Galerie sind live. Auswahl, Herkunft und Kennzeichenredaktion der damals 14 veröffentlichten Galeriebilder wurden im Repository-Stand dokumentiert. Die zwei ZIP-Bilder mit Kindern von hinten wurden im Kajak-Chat ausdrücklich bestätigt; die pauschale Freigabe aller 14 Bilder ist durch diesen Chat nicht belegt. Insbesondere widerspricht das enthaltene Bild „Gemeinsam am Fluss“ einer späteren ausdrücklichen Entfernungsanweisung. Die damalige Galerie wurde am 22. September 2026 nach dem letzten Webdienst-Rollout live verifiziert; das ist keine erneute Abnahme des jetzigen Arbeitsstands. Nach einer beim Hero-Umbau entdeckten Regression ist die Galerie wiederhergestellt; eine automatisierte Inhaltsprüfung sichert seitdem alle sieben öffentlichen Seiten mit ihren freigegebenen Kernmodulen, Galerien, Kachelzahlen, Bilddateien, Canonical-Links und internen Seitenlinks gegen stillschweigende Entfernung ab. Für den Kajak-Referenzfall prüft sie zusätzlich den gespiegelten Fjord-Hero, das zugehörige Verlauf-Stylesheet und die freigegebene Hero-Einleitung. Die am 22. September ergänzte Galerie-Pflicht ist im freigegebenen Design Guide und diesem Gesamtplan festgehalten. Sie ist auf Kajak, Fahrzeug, Ausrüstungsübersicht, Radübersicht und Reisegalerien live umgesetzt; die vier ausdrücklich benannten Radprofile bleiben bis zur Bild- und Faktenfreigabe die einzige vorläufige Ausnahme.

- COVERAGE-R1-048: Die zwei ZIP-Rückansichten sind nur für die belegten Motive/Fassungen bestätigt. Keine pauschale 14er-Freigabe. Entfernung von „Gemeinsam am Fluss“ am beabsichtigten Build einschließlich Vollansicht prüfen; heutige 13er-Gruppe erst nach Varianten- und Motivprüfung gesondert abnehmen. Veröffentlichung bis dahin gesperrt; dieser Hold blockiert den technischen Final Audit nicht.

## src-0459

- Quelle: `docs/ausbauplan.md:492` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: ST-WEB-03
- PKG-013-Prüfziel: Für den konkret vorgelegten Umfang dieser Gesamtüberarbeitung einschließlich Trulli V11 eine überprüfbare lokale Gesamtvorschau auf Desktop, Tablet und Mobil bereitstellen; die ausdrückliche Nutzerabnahme dieses Umfangs gesondert belegen. Erst danach und nach bestandenen Release-Prüfungen gemäß Betriebsverfahren veröffentlichen. Bildfreigabe, Vorschau, Test, Audit und Planstand sind keine Gesamt-Release-Freigabe. Bei einem weiteren Release-Umfang ist eine eigene ausdrückliche Freigabe nötig (`DEC-REL-001/002`). Das ist ein Planungs-Gate; Umsetzung und Live-Nachweis bleiben offen.
- Verbindlicher Originalwortlaut: **Abnahme-Gate für diese Gesamtüberarbeitung (Nutzerentscheidung 24.09.2026):** Alle Änderungen einschließlich des freigegebenen Trulli-Bilds bleiben zunächst lokal. Vor einem gemeinsamen Live-Release erhält der Nutzer eine überprüfbare lokale Gesamtvorschau der überarbeiteten Seiten für Desktop, Tablet und Mobil und kann den Stand ansehen und abnehmen. Erst nach dieser Abnahme und den bestandenen Release-Prüfungen wird gemäß Betriebsverfahren veröffentlicht. Die Bildfreigabe für Trulli V11 allein ist keine Freigabe des Gesamt-Releases.

## src-0477

- Quelle: `docs/ausbauplan.md:702–707` · Familien-Scrum-Board, Ziel und Quellenhierarchie
- Anwendung: ST-BRD-01, ST-BRD-02
- PKG-015-Prüfziel: Der Hauptentwicklungsplan mit Marvin Scrum Board ist technische Referenz; Abschnitt 2A des aktiven `docs/ausbauplan.md` ist die verbindliche Arbeitsliste. Diese Verweise erzeugen keine zusätzlichen Produktstories und ersetzen den aktiven Plan nicht. Private Dauersichtbarkeit, fünf Aufgabenbereiche, gemeinsame geschützte Cockpit-Grundlage und fachliche Content-Planner-Trennung stehen als Planungs-AC; Umsetzung und Live-Zustand sind ungeprüft.
- Verbindlicher Originalwortlaut: **Ziel:** Das Board ist die private, auf einem Küchen-Tablet dauerhaft sichtbare Aufgabenfläche für Familie, Reisen, Fahrzeug, Haushalt und VanVenture-Arbeit. Es nutzt dieselbe geschützte Anwendung, Sitzung, Datenbank und Audit-Grundlage wie das Cockpit, bleibt aber fachlich vom Content Planner getrennt. Der [Hauptentwicklungsplan mit Marvin Scrum Board](VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md) ist die technische Referenz; dieser Abschnitt ist die verbindliche Arbeitsliste.

## src-0478

- Quelle: `docs/ausbauplan.md:709` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 2A. Familien-Scrum-Board als private Arbeitszentrale entwickeln
- Anwendung: ST-BRD-01
- PKG-015-Prüfziel: Phase 0 erfasst ausschließlich dokumentierte Entscheidungen, keine produktive Datenanlage. Schriftliche Abnahme gemäß `docs/ausbauplan.md:720–723` ist vor Board-Karten, automatischen Warnungen und Marvin-Schreibrechten zwingend. ST-BRD-01/02 planen diese Sperre; ein Plan- oder Testlauf ist keine Abnahme.
- Verbindlicher Originalwortlaut: **Erstes verbindliches Gate – Phase 0 (nur Festlegung, keine Datenanlage):**

## src-0483

- Quelle: `docs/ausbauplan.md:723` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 2A. Familien-Scrum-Board als private Arbeitszentrale entwickeln
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-BRD-04 und TASK-0097 bis TASK-0102; Phase-0-Festlegung TASK-0094/0095/0096 bleibt davon getrennt.
- PKG-016-Prüfziel: Die schriftliche Phase-0-Abnahme ist vor jeder Board-Umsetzung nötig; vor konkreter Veröffentlichung ist zusätzlich der jeweilige Release-Umfang ausdrücklich freizugeben (DEC-REL-001/002/003). Keine Implementierungs- oder Live-Abnahme durch diese Planprüfung.
- Verbindlicher Originalwortlaut: **Umsetzung erst nach Phase-0-Abnahme:**

## src-0490

- Quelle: `docs/ausbauplan.md:756`; Anwendung: ST-BRD-01#Acceptance-Criteria.
- Content Planner und Scrum Board bleiben getrennt. Freiwillige Verknüpfungen zu Story/Epic oder Planner-Eintrag übertragen niemals Status, Inhalt oder Stunden automatisch. Der Gegenseitentest bleibt Teil der Board-Abnahme; Umsetzung ungeprüft.

## src-0491

- Quelle: `docs/ausbauplan.md:759`; Anwendung: ST-BRD-01#Acceptance-Criteria und Board-Release-Prüfgate im Scrum-Entwurf.
- Vor Freigabe sind Migration, Rechte, CSRF, Transaktionen, Idempotenz, Archiv, Tablet und die Wiederherstellung **aller drei Bereiche** Board, Inbox und Verlauf aus Backup reproduzierbar zu prüfen. COVERAGE-R1-001 ordnet diese Felder ST-BRD-01/02/03/04 und TASK-COVR1-01 bis -04 als kleine Prüfslices zu; die gemeinsame Release-Prüfung bleibt erforderlich. Kein Test wurde durch diese Planreparatur ausgeführt.
- Vor einer gesondert freigegebenen Live-Migration: lokal prüfen, exakten Commit pushen und geschützten Dump erstellen. Danach `/healthz`, private Board-Route und sichtbare Bedienung live prüfen. Bei Bedarf startet ausschließlich der Webdienst kurz neu; PostgreSQL und andere Dienste bleiben in Betrieb. Test oder Plan sind nach DEC-REL-001/002/003 keine Release-Freigabe. Keine dieser Betriebsaktionen wurde in PKG-017 ausgeführt.

## src-0494

- Quelle: `docs/ausbauplan.md:772`; Anwendung: ST-INS-04#Acceptance-Criteria.
- Historischer Quellstatus `[x]`: Am 23.09.2026 wurden im ersten YouTube-Reach-Report zwei positive Impressionswerte 5 und 1 sowie echte CTR-Nullwerte im Cockpit eingelesen und geprüft. Dies belegt weder die offenen Trend-Auswertungen SRC-0495/0496 noch den heutigen Produkt- oder Live-Stand.

## src-0497

- Quelle: `docs/ausbauplan.md:779`; Anwendung: ST-INS-05#Acceptance-Criteria.
- Ausgangsstand: Ziel/KPI steht nur im Brief-Freitext. Strukturierte Ziel- und Ist-Werte je Plan-Eintrag in `content_item_metrics` bleiben geplante Arbeit; keine erledigte Implementierung behaupten.

## src-0498

- Quelle: `docs/ausbauplan.md:781`; Anwendung: ST-INS-05#Acceptance-Criteria.
- Bis belastbare Effizienzwerte aus tatsächlichen Stunden und veröffentlichten Ergebnissen vorliegen, darf aus Views allein kein Erfolg behauptet werden. Das Verbot gilt bereits während die Berechnung noch geplant ist.

## src-0548

- Quelle: `docs/betrieb.md:3` · Betrieb: sichere Releases und Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Diese Datei ist eine Betriebsreferenz. Verbindliche offene Aufgaben und ihr Status stehen ausschließlich im [Gesamtplan](ausbauplan.md).
- PKG-022: Dokumentrolle und derzeitige Planhoheit; der Scrum-Entwurf ersetzt den aktiven Gesamtplan erst nach bestandenem vollständigem Coverage-/Traceability-Check.

## src-0549

- Quelle: `docs/betrieb.md:6` · Betrieb: sichere Releases und Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Diese Anleitung gilt für die Produktionskopie unter `/opt/vanventure`. Sie gibt keine Geheimnisse aus und verändert keine öffentliche Website, bevor ein Release ausdrücklich beauftragt ist.
- PKG-022: Der Produktionspfad ist Betriebsscope. Geheimnisse bleiben geschützt. „Ausdrücklich beauftragt“ wird für Veröffentlichung/Deployment durch DEC-REL-001/002 konkretisiert: ausdrückliche Nutzerfreigabe für **jeden konkreten Release-Umfang**; lokale Bearbeitung oder Prüfung genügt nicht.

## src-0550

- Quelle: `docs/betrieb.md:10` · Betrieb: sichere Releases und Cockpit-Monitoring
- Anwendung: ST-PHOTO-01, ST-OPS-01 (Staging-Skripte)
- Verbindlicher Originalwortlaut: Für Fotodateien gilt die vom Nutzer am 23. September 2026 gewählte Projektisolation: das gemeinsam genutzte Originalarchiv nur lesend verwenden, seine Windows-ACL nicht ändern. Projektkopien bleiben unverändert; die Staging-Skripte verweigern eine abweichende vorhandene Kopie und prüfen Quell-/Kopie-Prüfsummen. Webableitungen entstehen nur im Projekt.
- PKG-022: Datum gehört zur Nutzerentscheidung, nicht zu einer isolierten Anforderung. Archivzugriff, ACL, unveränderte Kopie, Ablehnung abweichender Kopie, Prüfsummenvergleich und Ableitungsort sind getrennte Schutzpflichten. Diese Zuordnung ist Planning Coverage, keine erneute Skript- oder Archivprüfung.

## src-0551

- Quelle: `docs/betrieb.md:18` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: 1. Den lokalen Branch mit der maßgeblichen Quelle abgleichen; einen neueren Produktionsstand zunächst lesend sichern und Unterschiede klären. Änderung und vollständige Anwendungstests lokal durchführen. Bei Website-Bildern zusätzlich `node deploy/public-image-audit.mjs --strict` bestehen lassen.

## src-0552

- Quelle: `docs/betrieb.md:22` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: 2. Den geprüften exakten Stand committen und pushen. Erst dann diesen Commit in einer kurzen Remote-Sitzung übertragen, ohne `.env`, Dumps oder Originalfotos zu kopieren. Keine direkte Produktionsreparatur als Ersatz für diesen Weg. Aktive Web-Releases liegen als entpacktes Archiv des geprüften Commit unter `/opt/vanventure/releases/<commit>/source`; Compose erhält die bestehende private `/opt/vanventure/.env` separat.

## src-0553

- Quelle: `docs/betrieb.md:28` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: 3. Auf dem Produktionshost `sh deploy/release-check.sh` ausführen. Der Host hat bewusst keine Node-Installation; der Ablauf prüft Compose und den laufenden Healthcheck. Bei Migrationen oder anderen nicht leicht reversiblen Datenänderungen erzeugt der Standardaufruf vorher einen geschützten Dump. Für einen rein zustandslosen Präsentations-/CSS-/JavaScript-Release darf `sh deploy/release-check.sh --stateless` ohne Datenbankdump verwendet werden. Bei einem fehlgeschlagenen Pflichtcheck darf kein Release erfolgen.

## src-0554

- Quelle: `docs/betrieb.md:35` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: 4. Vor dem Umschalten das Web-Image aus genau diesem Archiv bauen und erforderliche importierte Dateien und zentrale UI-Assets im fertigen Image prüfen. Dies verhindert den am 24. September beobachteten fehlenden `public-page-routes.mjs`-Import. Dann nur den betroffenen Webdienst aktualisieren. Anschließend `/healthz`, die betroffenen öffentlichen oder privaten Routen und das sichtbare Ergebnis einschließlich CSP-konformer Icons im echten Browser live prüfen. PostgreSQL, Caddy und öffentliche Dateien bleiben aktiv; nur der Webdienst startet bei erforderlichem Image-Rebuild neu. Remote-Sitzung unmittelbar nach der Prüfung schließen.

## src-0555

- Quelle: `docs/betrieb.md:46` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-AUTH-01; private Server-Konfiguration als Betriebsgrenze
- Verbindlicher Originalwortlaut: Für den gemeinsamen Google-Login gelten zusätzlich eigene Werte `GOOGLE_LOGIN_CLIENT_ID`, `GOOGLE_LOGIN_CLIENT_SECRET` und `GOOGLE_LOGIN_REDIRECT_URI=https://vanventure.at/api/auth/google/callback` in der privaten Server-`.env`. Diese Werte gehören zu einem neuen OAuth-Webclient mit ausschließlich `openid email profile`; der YouTube-OAuth-Client darf nicht wiederverwendet werden. Vor dem Einschalten werden die vorgesehenen Google-Adressen in der Benutzerverwaltung zugeordnet und mindestens ein freigegebenes sowie ein abgelehntes Konto live geprüft.
- PKG-022: Die Werte sind Variablennamen und Redirect-URI, keine hier gespeicherten Secrets. Client-Trennung und minimale Scopes bleiben bindend. Die in ST-AUTH-01 beschriebenen Positiv-/Negativprüfungen sind historisch; dieses Paket verifiziert den heutigen Live-Stand nicht.

## src-0556

- Quelle: `docs/betrieb.md:55` · Betrieb: sichere Releases und Cockpit-Monitoring / Vor jedem Release
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: `npm run check:release` ist absichtlich keine Deployment-Automatik. Ein erstellter Dump bleibt die direkte Rückfallmöglichkeit für datenverändernde Releases.

## src-0557

- Quelle: `docs/betrieb.md:61` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: `npm run monitor:cockpit` liest ausschließlich die benötigten Statusfelder aus der privaten Datenbank und gibt nur einen knappen, geheimnisfreien Status aus. Bei Problemen endet es mit einem Fehlercode und einem oder mehreren dieser Kennzeichen:
- PKG-022: Fehlercode und Kennzeichen bilden einen gemeinsamen Vertrag mit src-0558 bis src-0561; der Einleitungssatz allein ist kein vollständiges abnehmbares Kennzeichen.

## src-0558

- Quelle: `docs/betrieb.md:66` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: - `SYNC_FAILED`: letzter Abgleich fehlgeschlagen.

## src-0559

- Quelle: `docs/betrieb.md:67` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: - `OAUTH_REAUTH_REQUIRED`: der Refresh-Token wurde von Google abgelehnt; im Cockpit erneut verbinden.

## src-0560

- Quelle: `docs/betrieb.md:69` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: - `SYNC_STALE`: bei aktiviertem Zeitplan fehlt ein erfolgreicher Lauf länger als Intervall plus zwei Stunden.

## src-0561

- Quelle: `docs/betrieb.md:71` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: - `SYNC_MISSING` oder `CONNECTION_MISSING`: es fehlen ein Lauf bzw. eine aktive Kanalverbindung.

## src-0562

- Quelle: `docs/betrieb.md:74` · Betrieb: sichere Releases und Cockpit-Monitoring / Cockpit-Monitoring
- Anwendung: ST-OPS-01 (Monitor-Ausführung und Nachrichtensperre), ST-BRD-01 (Inbox), ST-BRD-03 (gesonderter Cockpit-Board-Slice)
- Verbindlicher Originalwortlaut: Für die regelmäßige Ausführung eignet sich ein System-Timer oder der bestehende Server-Monitor. Die geplante persistente Warnungs-Inbox gehört zum Familien-Scrum-Board. Sie soll Statuskennzeichen erst nach einer gemeinsam festgelegten Prioritätsregel als lesbare Backlog- oder Fast-Track-Karten übernehmen, ohne Tokens, Namen oder YouTube-Daten zu speichern. Bis dieser Kommunikationskanal umgesetzt ist, verschickt der Befehl selbst keine Nachrichten. Der verbindliche Umsetzungsstatus steht im [Gesamtplan](ausbauplan.md).
- PKG-022: Timer und vorhandener Server-Monitor sind Optionen, keine behauptete Einrichtung. Die Board-Übernahme bleibt bis zur Entscheidung der Prioritätsregel und zur Umsetzung gesperrt. **Unresolved:** Nach welcher gemeinsam festgelegten Regel werden `SYNC_FAILED`, `OAUTH_REAUTH_REQUIRED`, `SYNC_STALE`, `SYNC_MISSING` und `CONNECTION_MISSING` jeweils Backlog oder Fast Track zugeordnet? Der aktive Gesamtplan bleibt Statusquelle bis zu einer gesondert bestandenen Planmigration.

- COVERAGE-R1-048: Die gemeinsame Kennzeichen-zu-Backlog/Fast-Track-Regel ist PRE_FINAL_AUDIT_DECISION A3. Bis zu ihrem Beschluss keine automatische Kartenübernahme; technische Final-Audit-Bereitschaft dafür offen. Inbox-/Monitoring-Planung ist keine Nachrichtenzustellung.

## src-0563

- Quelle: `docs/betrieb.md:85` · Betrieb: sichere Releases und Cockpit-Monitoring / Wiederherstellungstest
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Alle zwei bis vier Wochen einen aktuellen Dump in einer getrennten, kurzlebigen PostgreSQL-Instanz wiederherstellen und dort Tabellen, Cockpit-Videozahl und Healthcheck prüfen. Die Produktionsdatenbank bleibt dabei unverändert. Nach dem Test Dump und Testinstanz nach der geltenden Aufbewahrungsvorgabe entfernen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. ST-OPS-01 enthält Intervall, getrennten Restore, drei Einzelprüfungen, Produktionsschutz und Löschung nach geltender Aufbewahrung; heutige Ausführung unbelegt. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0593

- Quelle: `docs/creator-system.md:3` · VanVenture – Low-Effort-Creator-System
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: Diese Datei ist eine wiederverwendbare Arbeitscheckliste. Verbindliche offene und erledigte Projektaufgaben stehen ausschließlich im [Gesamtplan](ausbauplan.md).
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0594

- Quelle: `docs/creator-system.md:7` · VanVenture – Low-Effort-Creator-System
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: Stand: 22. September 2026 Gilt verbindlich für jede Reise und jedes Projekt, aus dem ein Inhalt entstehen soll. Das Erlebnis bleibt wichtiger als die Produktion.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0595

- Quelle: `docs/creator-system.md:12` · VanVenture – Low-Effort-Creator-System / Der feste Ablauf
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: **Ein Erlebnis → ein Longform-Video → zwei eigenständige Shorts/Reels → Website-Ergänzung → geprüfte Fakten im Master Context → Langzeit-Review.**
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0596

- Quelle: `docs/creator-system.md:14` · VanVenture – Low-Effort-Creator-System / Der feste Ablauf
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: Ein Schritt wird nur ausgelassen, wenn er für dieses Erlebnis wirklich nicht passt. Dann wird der Grund kurz im Brief oder in der Nachnotiz festgehalten. Shorts/Reels sind kein bloßer Trailer: Jeder Clip liefert einen eigenen, ehrlichen Gedanken oder Moment. Website und Master Context erhalten nur belegte Erfahrungen, keine Annahmen oder allgemeinen Tipps.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0597

- Quelle: `docs/creator-system.md:20` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Vorher – höchstens fünf Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] **Anlass in einem Satz:** Was ist heute anders, nützlich oder erinnernswert?
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0598

- Quelle: `docs/creator-system.md:21` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Vorher – höchstens fünf Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] **Ein Longform-Kern:** Welche ehrliche Frage oder Geschichte kann später daraus werden?
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0599

- Quelle: `docs/creator-system.md:22` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Vorher – höchstens fünf Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] **Wenige gezielte Shots:** Einstieg/Ort, Handlung, Detail, Stimme oder Atmosphäre, Abschluss. Nur aufnehmen, wenn es den Kern trägt.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0600

- Quelle: `docs/creator-system.md:23` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Vorher – höchstens fünf Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] **Zeit schätzen:** Aufwand für Longform, zwei Shorts/Reels, Website und Nacharbeit als einzelne Stundenwerte im Content Planner eintragen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0601

- Quelle: `docs/creator-system.md:24` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Vorher – höchstens fünf Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - [ ] **Schutz prüfen:** Keine erkennbaren Kinder ohne ausdrückliche Freigabe; sichtbare Kennzeichen werden vor einer Veröffentlichung anonymisiert.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0602

- Quelle: `docs/creator-system.md:28` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Währenddessen – Erlebnis vor Material
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Maximal die geplanten Schlüsselshots aufnehmen; nicht dauernd filmen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0603

- Quelle: `docs/creator-system.md:29` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Währenddessen – Erlebnis vor Material
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Einen echten Satz, eine Beobachtung oder die relevante Grenze festhalten.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0604

- Quelle: `docs/creator-system.md:30` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Währenddessen – Erlebnis vor Material
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Nur Tatsachen behaupten, die selbst erlebt oder später belegbar sind.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0605

- Quelle: `docs/creator-system.md:31` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Währenddessen – Erlebnis vor Material
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Wenn die Situation es verlangt: Kamera weglegen. Eine fehlende Aufnahme ist kein Grund, die Geschichte nachzustellen oder zu erfinden.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0606

- Quelle: `docs/creator-system.md:35` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Danach – zehn ehrliche Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] **Nachnotiz:** Was ist tatsächlich passiert? Was war hilfreich, schwierig oder anders als erwartet? Quelle/Datum/Ort dazuschreiben, falls relevant.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0607

- Quelle: `docs/creator-system.md:36` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Danach – zehn ehrliche Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - [ ] Unveränderte Originalkopie sichern; nur Projektkopien weiterverarbeiten.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0608

- Quelle: `docs/creator-system.md:37` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Danach – zehn ehrliche Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Longform und zwei eigenständige Shorts/Reels im Brief verknüpfen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0609

- Quelle: `docs/creator-system.md:38` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Danach – zehn ehrliche Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Website nur um den belegten Zusatz ergänzen; Fakten anschließend als `draft` im Master Context anlegen und erst nach Prüfung freigeben.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0610

- Quelle: `docs/creator-system.md:39` · VanVenture – Low-Effort-Creator-System / Kurzcheckliste / Danach – zehn ehrliche Minuten
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: - [ ] Tatsächliche Produktionsstunden je Inhalt im Planner nachtragen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0611

- Quelle: `docs/creator-system.md:43` · VanVenture – Low-Effort-Creator-System / Review: Nutzen pro Stunde statt nur Views
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: Die erste Verpackungsprüfung erfolgt nach sieben Tagen. Nach frühestens 28 Tagen werden pro Erlebnis zusammen betrachtet: Nutzen für Zuschauer (Watchtime, konkrete Fragen/Kommentare und passende Website-Nutzung), die verfügbaren Reichweitenwerte sowie tatsächliche Produktionsstunden. Der Entscheidungswert ist **Nutzen pro investierter Stunde**. Views allein lösen keine Wiederholung eines Formats aus.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0612

- Quelle: `docs/creator-system.md:45` · VanVenture – Low-Effort-Creator-System / Review: Nutzen pro Stunde statt nur Views
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: Ein Review hält fest: Was wiederholt wird, was vereinfacht wird und was nicht noch einmal produziert wird. Die Entscheidung gehört als kurze Nachnotiz zum Plan-Eintrag; neue belastbare Fakten werden im Master Context ergänzt.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Creator-Kriterien stehen im EPIC-CONTENT und gelten bei jeder betroffenen Content-Story; die Checkliste ist kein zweites Backlog. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0613

- Quelle: `docs/creator-system.md:49` · VanVenture – Low-Effort-Creator-System / Umsetzungsstatus
- Anwendung: ST-CON-01,ST-CON-02,ST-CON-03
- Verbindlicher Originalwortlaut: **Live ausgerollt und geprüft am 22. September 2026:** Die Checkliste ist als verbindlicher Arbeitsstandard dokumentiert. Der private Content Planner kann pro Inhalt geschätzte und tatsächliche Produktionsstunden speichern und zeigt beide Werte in der Planung an. Die Effizienzbewertung beginnt erst, sobald veröffentlichte Inhalte und ihre tatsächlichen Stunden vorliegen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Datierter historischer Fähigkeits-/Live-Quellenstand; weder heutige Planner-Funktion noch aktuelle Live-Prüfung aus dieser Migration abgeleitet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0614

- Quelle: `docs/design-guide.md:3` · VanVenture – Design Guide
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: Stand: 22. September 2026. **V1 freigegeben.** Diese Referenz ergänzt den verbindlichen [Gesamtplan](ausbauplan.md); sie ist keine eigene Aufgabenliste und wird auf alle öffentlichen Seiten angewandt.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. V1-Freigabe und Datum sind historische Metadaten; Guide gilt für alle öffentlichen Seiten, nicht nur die Detailtemplates. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0615

- Quelle: `docs/design-guide.md:9` · VanVenture – Design Guide / Pflege des Guides
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - Bei jeder visuellen oder gestalterischen Änderung wird ausdrücklich geprüft, ob sie diesen Guide verändert oder erweitert. Eine neue Regel, globale Komponentenvariante oder Ausnahme wird erst nach ausdrücklicher Nutzerfreigabe verbindlich oder live. Bereits freigegebene Regeln werden ohne erneute Rückfrage umgesetzt.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0616

- Quelle: `docs/design-guide.md:14` · VanVenture – Design Guide / Pflege des Guides
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - Nach einer eindeutigen Freigabe werden Guide, zentrale Implementierung, Templates, Tests und Statusnachweis im selben Änderungsvorgang konsistent aktualisiert. Der Guide wird nie nachträglich geändert, um eine ungefragte oder fehlerhafte Umsetzung zu legitimieren. Freigabebeleg, Datum und Geltungsbereich werden im Nachweis dokumentiert.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0617

- Quelle: `docs/design-guide.md:19` · VanVenture – Design Guide / Pflege des Guides
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Der verbindliche Ablauf für Bildschutz, technische Originalschutzprüfung, Nachweismatrix und Abnahme steht im [konsolidierten Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md).
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0618

- Quelle: `docs/design-guide.md:25` · VanVenture – Design Guide / Gestaltungsidee
- Anwendung: ST-PHOTO-02,ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: VanVenture verbindet ruhige, dokumentarische Reisefotografie mit einer klaren, editorialen Oberfläche. Bilder erzählen die Reise; Typografie, Flächen und Farbe geben ihnen einen ruhigen, gut lesbaren Rahmen.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0619

- Quelle: `docs/design-guide.md:31` · VanVenture – Design Guide / Fundament
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - Hintergrund: warmes Off-White `#f3f0e7` / `#fbfaf7`.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0620

- Quelle: `docs/design-guide.md:32` · VanVenture – Design Guide / Fundament
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - Primärfarbe: dunkles Kieferngrün `#173a30` / `#183d33`.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0621

- Quelle: `docs/design-guide.md:33` · VanVenture – Design Guide / Fundament
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - Akzent: zurückhaltendes Moosgrün `#6b7650`; helle Flächen `#e3e7dd` und `#d8dfcf`.
- PKG-023: Der vollständige Quellblock und alle ursprünglichen Klauseln wurden erneut geprüft. Die allgemeinen Designkriterien stehen in der gemeinsamen DoD; konkrete Bild- und Web-Prüfungen bleiben den zugeordneten Stories zugeordnet. Planning Coverage bezeichnet nur die Planaufnahme, keine aktuelle Implementierungs- oder Live-Verifikation.

## src-0622

- Quelle: `docs/design-guide.md:35` · VanVenture – Design Guide / Fundament
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Lauftext: systemnahe Sans Serif, mindestens 16 px und gut lesbarer Zeilenabstand.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0623

- Quelle: `docs/design-guide.md:37` · VanVenture – Design Guide / Fundament
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Editorial-Überschriften: Georgia beziehungsweise Playfair Display mit klarer Größenhierarchie; Akzentwörter dürfen grün und kursiv sein.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0624

- Quelle: `docs/design-guide.md:44` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - **Nutzerauftrag vom 25. September 2026:** Browser, Lesezeichen und mobile Startbildschirm-Symbole verwenden das bestehende runde VanVenture-Patchlogo. Die Favicon-Datei wird als quadratische, öffentlich erreichbare Logo-Ableitung auch auf der Startseite für Suchmaschinen ausgezeichnet. Das Logo wird nicht neu gestaltet; die Lesbarkeit der sehr kleinen Darstellung wird anhand der tatsächlichen Icon-Größen geprüft.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0625

- Quelle: `docs/design-guide.md:51` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Die Kopfzeile ist auf allen öffentlichen Seiten identisch: Marke, Hauptnavigation, **Login**, Sprachwechsel und Menü.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0626

- Quelle: `docs/design-guide.md:53` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Login steht direkt neben der Sprachwahl. Das Flyout bietet zuerst Benutzername/Passwort und danach „Mit Google anmelden“.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0627

- Quelle: `docs/design-guide.md:55` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Der Sprachwechsel ist auf jeder Seite ein runder, 40 × 40 px großer Button mit feiner Kontur – nie ein rechteckiger Textbutton.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0628

- Quelle: `docs/design-guide.md:57` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Auf kleinen Bildschirmen öffnet das Menü als vollständig deckende, helle Ebene oberhalb jeder Hero-Grafik. Es darf keinen sichtbaren Scrollbalken zeigen; bei geringer Höhe bleibt es per Touch oder Tastatur scrollbar.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0629

- Quelle: `docs/design-guide.md:60` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Fokuszustände sind immer sichtbar; Escape schließt Menü und Flyouts.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0630

- Quelle: `docs/design-guide.md:61` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-01,ST-WEB-05
- Verbindlicher Originalwortlaut: - Wo konkrete Unterseiten bestehen, führt die öffentliche Navigation direkt dorthin und benötigt keine zusätzliche Übersichtsseite. Eine Übersicht ist nur dann ein Navigationsziel, wenn der Nutzer sie ausdrücklich verlangt. **Freigabe 24. September 2026:** Der Nutzer hat diese allgemeine Regel ausdrücklich beauftragt und den unbeauftragten Punkt „Alle Räder“ gestrichen. Der Ausrüstungsbereich führt deshalb direkt zu Kajak und den einzelnen Radprofilen. **Ergänzende Nutzerentscheidung vom 24. September 2026:** Die Ausrüstungs- und Radübersichten sollen auch als aufrufbare Inhalte entfallen; alle internen Links dorthin werden entfernt. Ihre bisherigen Adressen leiten ausschließlich für alte Aufrufe zur Startseite weiter. Unvollständige Profile sind klar als „in Vorbereitung“ markiert und werden nicht als getestete oder abschließend redigierte Empfehlungen dargestellt.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0631

- Quelle: `docs/design-guide.md:73` · VanVenture – Design Guide / Öffentliche Navigation / Website-Symbol
- Anwendung: ST-WEB-05
- Verbindlicher Originalwortlaut: - Vollständige Ausrüstungsprofile nutzen eine wiederkehrende Lesestruktur: „Warum gekauft → was begeistert mich → was nervt → Defekte/Verschleiß → was habe ich verändert → wo war es dabei → würde ich es wieder kaufen?“. Die Langzeiterfahrung und belegte Nutzung stehen vor technischen Daten.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Rad-/Kajak-AC konkretisiert; ST-WEB-06 trägt weitere fertig beauftragte Ausrüstungsprofile mit eigener Profil-AC; konkrete Inhalte und Freigaben bleiben je Profil offen.

## src-0632

- Quelle: `docs/design-guide.md:80` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-05
- Verbindlicher Originalwortlaut: - Fertig erzählte Radprofile folgen dem gleichen Foto-Hero- und Galerie-Standard wie die übrigen Inhaltsseiten. Eine großzügige Bild-Text-Komposition eröffnet die Seite; die Kajakseite gibt dabei den konkreten Rhythmus vor: heller Hero mit geschütztem Textfeld, danach abwechselnd helle, gedeckt grüne und kieferngrüne Editorial-Flächen, klare Linien und ruhige Lesespalten. Die Fotos müssen das jeweilige Rad korrekt zeigen; ein farblich anderes Rad darf nicht zum Hero-Hauptmotiv werden.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0633

- Quelle: `docs/design-guide.md:87` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-01,ST-WEB-05
- Verbindlicher Originalwortlaut: - Faktenkästen ergänzen die Erfahrung und stehen im fertigen Radprofil nach der persönlichen Geschichte. Im Ausrüstungsmenü führen die Rad-Einträge direkt zu ihren Profilen. Einträge in Vorbereitung bleiben sichtbar als solche markiert.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0634

- Quelle: `docs/design-guide.md:91` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-01,ST-WEB-05
- Verbindlicher Originalwortlaut: - Für das freigegebene Scott-Profil übernimmt der Einstieg die Kajak-typischen Intro- und Nutzenkarten vor der persönlichen Erfahrung. Die redaktionellen Fotos wechseln danach zwischen linker und rechter Textspalte. Nur Wiesenpause und Leogang-Trail erhalten auf der Seite einen gezielten 2:1-Ausschnitt, Baumtour 3:2; die Webdateien bleiben unverändert und der gemeinsame Viewer zeigt beim Vergrößern stets das vollständige 4:3-Bild. Die anderen zwei Editorial-Fotos bleiben unbeschnitten. Diese motivbezogene Entscheidung ist keine pauschale Beschnittregel für Räder. Die Seitenverhältnisse folgen zugleich der Textmenge: kurze Bild-Text-Paare dürfen ein deutlich flaches Fenster (2:1 beziehungsweise 3:2) erhalten; bei längeren Abschnitten bleibt das Foto höher (4:3). Der Beschnitt darf das wesentliche Motiv nicht verlieren. Die Intro-/Nutzenkarten des Scott-Profils nutzen dieselbe zentral definierte Eyebrow- und Kartentitel-Typografie wie die Kajak-Referenz; ihre drei Texte erläutern die belegten Erfahrungen, statt nur Stichworte zu wiederholen. Der vorhandene Abschnitt „Mein Setup“ bleibt der technische Datenbaustein nach der persönlichen Erfahrung.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0635

- Quelle: `docs/design-guide.md:108` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-02,ST-WEB-05
- Verbindlicher Originalwortlaut: - In der gemeinsamen Intro-Doppelspalte fertiger Ausrüstungsseiten steht der rechte Einleitungstext auf derselben **senkrechten linken Kante** wie die Textspalte des folgenden Bild-Text-Abschnitts. Die Bild-/Textspalten verwenden dafür dieselbe Rasterteilung; mobil folgt der Text unter der Überschrift in einer Spalte. Die Kopfzeile der linken Spalte und der Einleitungstext beginnen zudem ohne künstlichen Höhenversatz.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Rad-/Kajak-AC konkretisiert; ST-WEB-06 trägt weitere fertig beauftragte Ausrüstungsprofile mit eigener Profil-AC; konkrete Inhalte und Freigaben bleiben je Profil offen.

## src-0636

- Quelle: `docs/design-guide.md:114` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-05
- Verbindlicher Originalwortlaut: - Solange für ein Rad noch keine zugeordneten Bilder und belegten Erfahrungen vorliegen, erhält seine mit `noindex` markierte Arbeitsseite einen hellen typografischen Rad-Posterauftakt in der bestehenden Farbwelt. Dieser klar gekennzeichnete Vorbereitungszustand ist die vorläufige Ausnahme von Bild-Hero und Galerie. Beim fertigen Profil entfallen Poster und Ausnahme zugunsten des regulären Standards.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0637

- Quelle: `docs/design-guide.md:121` · VanVenture – Design Guide / Öffentliche Navigation / Radserie
- Anwendung: ST-WEB-01,ST-WEB-05
- Historischer Originalwortlaut (23.09.2026; keine aktuelle Designregel): **Radserie, live geprüft am 23. September 2026:** Der neue Aufbau ist auf Radübersicht, Scott-Profil und den vier vorbereitenden Profilen lokal für Desktop und Mobil geprüft. Nach dem Rollout wurden alle sechs Radrouten, der Webdienst und die sichtbare Radübersicht live geprüft. Der anschließende Kajak-Abgleich brachte dem Scott-Profil einen vollbreiten Foto-Hero mit hellem Kontrastverlauf und dem schwarzen Rad als Motiv, wechselnde Editorial-Flächen und den vier Arbeitsprofilen einen hellen Auftakt. Scott, Cube und die Kajak-Galerie wurden danach live bei schmaler bzw. sehr breiter Bildschirmbreite geprüft; die Galerieraster fließen nun auf großen Displays mit symmetrischen Seitenrändern statt bei drei Spalten zu enden.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Datierter lokaler und damaliger Live-Befund; spätere Redirect-Entscheidung für Radübersicht gilt. Heutige Prüfung offen.

## src-0638

- Quelle: `docs/design-guide.md:134` · VanVenture – Design Guide / Unterseiten mit Hero
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Jede inhaltliche Unterseite beginnt unter der gemeinsamen Kopfzeile mit einem vollbreiten Bild-Hero.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0639

- Quelle: `docs/design-guide.md:136` · VanVenture – Design Guide / Unterseiten mit Hero
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: - Darüber liegt links eine lesbare, farbige Verlaufsebene mit Eyebrow, Seitentitel und kurzem Einleitungstext. Der Text liegt nie auf einem unruhigen Bildbereich ohne Kontrastschutz.
- PKG-024: Vollständiger Quellblock und alle ursprünglichen Klauseln erneut geprüft. Quellbedingungen und Modalität in den zugeordneten AC erhalten; Planaufnahme ist keine Implementierungs- oder Live-Verifikation.

## src-0640

- Quelle: `docs/design-guide.md:139` · VanVenture – Design Guide / Unterseiten mit Hero
- Anwendung: ST-PHOTO-01,ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Das Hauptmotiv bleibt sichtbar. Wenn das Motiv es verlangt, wird die **Web-Kopie** horizontal gespiegelt oder der Bildausschnitt angepasst – nie das Archivoriginal.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-PHOTO-01, ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0641

- Quelle: `docs/design-guide.md:142` · VanVenture – Design Guide / Unterseiten mit Hero
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Bildunterschrift und Vergrößerung bleiben verfügbar und tastaturbedienbar.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0642

- Quelle: `docs/design-guide.md:146` · VanVenture – Design Guide / Unterseiten mit Hero / Mobilansicht
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Bis einschließlich **600 CSS-Pixel im Hochformat** erhalten Hero-Bereiche eine eigene Lesefläche: Das Bild steht als oberer Abschnitt, darunter liegen Eyebrow, Titel, Einleitung und Metadaten auf einer durchgehenden hellen Editorial-Fläche. Kein Text darf über einem unruhigen Bildbereich stehen.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0643

- Quelle: `docs/design-guide.md:150` · VanVenture – Design Guide / Unterseiten mit Hero / Mobilansicht
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Im Querformat sowie ab 601 CSS-Pixeln bleibt die Bild-Text-Komposition mit Verlauf erhalten.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0644

- Quelle: `docs/design-guide.md:152` · VanVenture – Design Guide / Unterseiten mit Hero / Mobilansicht
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Mobile Grid-Kinder müssen sich mit `min-width: 0` in ihren verfügbaren Raum verkleinern; die ausgeblendete Mobilnavigation darf keinen horizontalen Dokumentüberlauf erzeugen.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0645

- Quelle: `docs/design-guide.md:156` · VanVenture – Design Guide / Unterseiten mit Hero / Mobilansicht
- Anwendung: ST-WEB-01,ST-WEB-05
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): **Rolloutstatus, 22. September 2026:** Diese Mobilregel ist auf Startseite, Fahrzeug, Reiseberichte, Kajak und Ausrüstung umgesetzt. Startseite, Fahrzeug, Reiseberichte und Kajak wurden in S24-Breite live geprüft; die Ausrüstungsübersicht erhielt zusätzlich ein klickbares Bild-Hero mit Kontrastverlauf und der beschriebenen mobilen Lesefläche. Der Design Guide V1 ist freigegeben. Die vier als „in Vorbereitung“ markierten Radprofile bleiben bis zur Freigabe von Bildmaterial und Fakten die ausdrücklich dokumentierte Ausnahme.

- PKG-025-Einordnung: PKG-025: Datierter Mobil-/S24-/Ausrüstungsstatus und Designfreigabe, keine heutige Live-Abnahme; vier Radprofil-Ausnahmen separat geplant. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0646

- Quelle: `docs/design-guide.md:167` · VanVenture – Design Guide / Inhaltsrhythmus
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Großzügige Abstände und höchstens zwei dominante Elemente pro Abschnitt.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0647

- Quelle: `docs/design-guide.md:168` · VanVenture – Design Guide / Inhaltsrhythmus
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Wechsel aus hellem Hintergrund, gedecktem Grün und dunklem Kieferngrün.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0648

- Quelle: `docs/design-guide.md:169` · VanVenture – Design Guide / Inhaltsrhythmus
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Karten und Fakten beginnen mit feinen Linien statt schweren Rahmen.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0649

- Quelle: `docs/design-guide.md:170` · VanVenture – Design Guide / Inhaltsrhythmus
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Handlungslinks sind textlich eindeutig und nur sparsam eingesetzt.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0650

- Quelle: `docs/design-guide.md:174` · VanVenture – Design Guide / Startseite und Footer
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Der Einstieg bleibt eine starke Bild-Text-Komposition mit einer einzigen klaren Hauptaussage und höchstens einem primären Link.

- PKG-025-Einordnung: PKG-025: Startseitenlayout in ST-WEB-01 geplant, ST-WEB-03 prüft Regression; keine Foto-Privacy-Story. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0651

- Quelle: `docs/design-guide.md:176` · VanVenture – Design Guide / Startseite und Footer
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Die folgenden Bereiche behalten den Rhythmus Reisen → Fahrzeug → Ausrüstung → Über uns. Papier- und Grünflächen wechseln sich ab, ohne den Inhalt in voneinander unabhängige Stilwelten zu teilen.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0652

- Quelle: `docs/design-guide.md:179` · VanVenture – Design Guide / Startseite und Footer
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Links auf der Startseite folgen denselben Regeln wie auf Unterseiten: Textlinks erhalten eine klare Unterstreichung/Fokusmarke, gefüllte Flächen bleiben primären Aktionen vorbehalten.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0653

- Quelle: `docs/design-guide.md:182` · VanVenture – Design Guide / Startseite und Footer
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Der Footer enthält nur eindeutige Weiterführungen und keine zweite, konkurrierende Navigation.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0654

- Quelle: `docs/design-guide.md:187` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): **Freigabe 24. September 2026 – Vergrößerungshinweis:** Alle öffentlichen vergrößerbaren Fotos zeigen oben rechts nur eine kleine Lupe statt eines sichtbaren „Vergrößern“-Textbuttons. Das gilt für Hero-, Fließtext- und Galeriebilder sowie ihre responsive Darstellung. Die Lupe ist dekorativ; das gesamte bisher klickbare Foto bleibt Auslöser, und dessen zugängliche Beschriftung, Fokusmarkierung und Tastaturbedienung bleiben erhalten. Der Nutzer hat diese konkrete Stiländerung im Arbeitschat ausdrücklich beauftragt. Die zentrale Umsetzung liegt in `photo-viewer.css`/`photo-viewer.js`; eine Live-Abnahme des neuen Stils steht noch aus.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0655

- Quelle: `docs/design-guide.md:197` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Jede **öffentliche Inhalts-Unterseite** erhält grundsätzlich eine Galerie – auch neue Unterseiten. Dazu zählen insbesondere Fahrzeug, Kajak, Bike und Reiseberichte. Eine Galerie entfällt nur, wenn sie für die betreffende Seite ausdrücklich beauftragt oder entschieden ausgeschlossen wurde; diese Ausnahme wird in der Seitenaufgabe beziehungsweise im Gesamtplan benannt. Fehlendes Bildmaterial oder ein bislang nicht umgesetzter Abschnitt ist keine stillschweigende Ausnahme.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0656

- Quelle: `docs/design-guide.md:204` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Die Galerie besteht aus Eyebrow, Überschrift, kurzem Hinweis und einem Raster aus klickbaren Bildern mit Bildunterschrift.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0657

- Quelle: `docs/design-guide.md:206` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Desktop nutzt ein fließendes Raster: So viele Spalten, wie bei einer Mindestbreite von etwa 240 px zwischen großzügigen, symmetrischen Seitenrändern Platz finden. Bei Galerien mit wenigen Bildern bleiben die Kacheln zentriert und höchstens etwa 360 px breit. Mobil bleiben es zwei Spalten; die Kacheln nutzen 4:3. Die Vollansicht zeigt stets das unbeschnittene Bild über den gemeinsamen, tastaturbedienbaren Foto-Viewer.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0658

- Quelle: `docs/design-guide.md:213` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-PHOTO-01,ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Die Kajak-Galerie ist der live umgesetzte Musterfall: 14 veröffentlichte Bilder, Auswahl und Herkunft sind in `kajak-galerie-bildquellen.json` dokumentiert; sichtbare Kennzeichen sind in der Webableitung anonymisiert. Die drei Bilder mit Kind wurden für diese Galerie ausdrücklich freigegeben. Die Galerie wurde am 22. September 2026 nach dem letzten Webdienst-Rollout live verifiziert. Eine automatisierte Inhaltsprüfung sichert alle öffentlichen Seiten mit ihren Kernmodulen sowie Galerie-Abschnitt, Kachelanzahl, CSS und Bilddateien gegen versehentliche Entfernung; für Kajak umfasst sie auch das gespiegelte Referenzbild, Verlauf und Hero-Einleitung. Weitere Galerien folgen diesem Aufbau unverändert.

- PKG-025-Einordnung: PKG-025: 14 Bilder und Liveprüfung vom 22.09. historisch; heutige 13 Kacheln und Kinderbild-Entscheidung offen. Planning Coverage: Unresolved. Implementation Verification: nicht erneut geprüft.

## src-0659

- Quelle: `docs/design-guide.md:223` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-PHOTO-01,ST-WEB-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Für neue Hero- und Galeriebilder bleiben Quelle und unveränderte Projektkopie erhalten. Web-Ableitungen werden auf die tatsächlich benötigte Größe reduziert und mit Versionsnamen veröffentlicht; Hero-Bilder laden prioritär, Galerien erst bei Bedarf. Ein breiter Hero darf das Hauptmotiv nicht durch unkontrolliertes `cover` abschneiden. Versionierte Bilddateien sind langfristig cachebar, HTML bleibt frisch.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-PHOTO-01, ST-WEB-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0660

- Quelle: `docs/design-guide.md:230` · VanVenture – Design Guide / Galerie-Standard
- Anwendung: ST-PHOTO-01,ST-PHOTO-03
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): **Eng begrenzte Fahrzeugbild-Ausnahme, Nutzerentscheidung vom 24. September 2026:** Die vier bereits vorhandenen KI-bereinigten Webbilder `vehicle-front-camp.png`, `vehicle-header-clean-v3.png`, `vehicle-side-camp-v2.png` und `vehicle-side-dog.png` dürfen in ihrer bisherigen Fassung bleiben. Die Vorher-/Nachher-Vorschau des Frontmotivs zeigte die entfernten Hintergrundobjekte; der Nutzer entschied ausdrücklich: „KI-bereinigten Fahrzeugbildern die darfst so lassen wie sie sind“. Das ist keine allgemeine Erlaubnis für neue KI-Bereinigungen oder weitere Änderungen dieser Motive. Quellen, unveränderte Projektkopien, Kennzeichenschutz und die übrigen Bildprüfungen bleiben erforderlich.

- PKG-025-Einordnung: PKG-025: Spätere Nutzerentscheidung gilt nur vier unveränderten Bestandsfassungen; Bildprüfungen und Release separat. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0661

- Quelle: `docs/design-guide.md:243` · VanVenture – Design Guide / Privater Bereich
- Anwendung: ST-AUTH-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Nach der Anmeldung führt `/privat` zur geschützten Übersicht.

- PKG-025-Einordnung: PKG-025: Original und alle Kandidaten einzeln geprüft; konkrete AC in ST-AUTH-01; aktuelle Implementierung ungeprüft. Planning Coverage: Covered. Implementation Verification: nicht erneut geprüft.

## src-0484

- Quelle: `docs/ausbauplan.md:725` · private Arbeitszentrale / Board-Backlog und Zeilen
- Anwendung: `ST-BRD-01` (geschütztes Backlog) und `ST-BRD-05` (Board-Workflow)
- Verbindlicher Originalwortlaut: Backlog und die zwei Board-Zeilen mit fünf Spalten; nur bewusst eingeplante Tasks/To-dos; Fast Track nur für hoch/kritisch.
- COVERAGE-R4-001: `SRC-0484.a1` ist in Backlog und Board-Übergänge geteilt, `SRC-0484.a2` liegt im Board-Slice. Acceptance Criteria, Board-Persistenz/API-Tasks und Rückverfolgbarkeit sind getrennt. Phase-0- und Release-Gates bleiben bestehen; keine Umsetzung behauptet.


## src-0662

- Quelle: `docs/design-guide.md:244` · VanVenture – Design Guide / Privater Bereich
- Anwendung: ST-AUTH-01
- Originalwortlaut (Quelle; Status siehe PKG-025-Einordnung): - Die Navigation steht auf **allen geschützten Seiten** als feste, linke Seitenleiste über die volle Seitenhöhe. Sie enthält Übersicht, Konto & Einstellungen, Redaktion und Cockpit und lässt sich über einen Burger-Button schmal und wieder breit schalten; mobil steht sie vor dem Inhalt.

- PKG-025-Einordnung: PKG-025: Privatnavigation in ST-AUTH-01; ältere Profil-Bezeichnung gegen Konto & Einstellungen prüfen. Planning Coverage: Partially Covered. Implementation Verification: nicht erneut geprüft.

- COVERAGE-R4-001: Direkter Read-only-Abgleich: `editor/private-nav.js` verlinkt „Konto & Einstellungen“ auf `/privat#profil`; `editor/private.html` verwendet denselben Namen und Anker. `ST-AUTH-01` nennt nun den sichtbaren Namen und das Ziel. Der frühere Review-Prüfpunkt war eine alte Planbezeichnung, keine fehlende Produktfunktion.

## src-0663

- Quelle: `docs/design-guide.md:248` · VanVenture – Design Guide / Privater Bereich
- Anwendung: ST-AUTH-01
- Verbindlicher Originalwortlaut: - Der Arbeitsbereich nutzt die verbleibende Breite sichtbar aus: Er beginnt direkt neben der Seitenleiste, bleibt linksbündig und darf nicht durch ein altes, unsichtbares Spaltenraster eingeengt werden.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-AUTH-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0664

- Quelle: `docs/design-guide.md:251` · VanVenture – Design Guide / Privater Bereich
- Anwendung: ST-AUTH-01
- Verbindlicher Originalwortlaut: - Die Seitenleiste ist die einzige Stelle für Benutzername, Kontowechsel und Abmeldung. Redaktion und Cockpit zeigen diese Aktionen nicht noch einmal; die Benutzerverwaltung bleibt als reine Administratorfunktion erhalten.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-AUTH-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0665

- Quelle: `docs/design-guide.md:254` · VanVenture – Design Guide / Privater Bereich
- Anwendung: ST-AUTH-01
- Verbindlicher Originalwortlaut: - Konto & Einstellungen zeigt Benutzername und Anmeldeart. Bei Google steht ausschließlich die von Google übernommene E-Mail lesbar da – ohne Passwortwechsel oder zweites E-Mail-Feld. Nur Passwort-Konten erhalten eine getrennte Kontakt-E-Mail und den Passwortwechsel. Beides darf die Google-Freigabe nie verändern.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-AUTH-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0666

- Quelle: `docs/design-guide.md:262` · VanVenture – Design Guide / Verbindliche Freigabe-Reihenfolge
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: 1. Design Guide V1 freigeben. **Erledigt am 22. September 2026.**
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-WEB-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0667

- Quelle: `docs/design-guide.md:263` · VanVenture – Design Guide / Verbindliche Freigabe-Reihenfolge
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: 2. Kajak-Galerie als Referenz umsetzen. **Erledigt und am 22. September 2026 live verifiziert.**
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-WEB-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0668

- Quelle: `docs/design-guide.md:265` · VanVenture – Design Guide / Verbindliche Freigabe-Reihenfolge
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: 3. Fahrzeug, Bike und alle bestehenden Reise-Unterseiten auf Hero-, Galerie- und Link-Standard bringen; jede Ausnahme vom Galerie-Standard ausdrücklich dokumentieren. **Für Fahrzeug, Reiseberichte und Scott erledigt; die vier ausdrücklich als „in Vorbereitung“ markierten Radprofile bleiben bis zur Bild- und Faktenfreigabe die dokumentierte Ausnahme.**
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-WEB-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0669

- Quelle: `docs/design-guide.md:270` · VanVenture – Design Guide / Verbindliche Freigabe-Reihenfolge
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: 4. Startseite und Footer nach diesem System angleichen und Desktop sowie Mobil live abnehmen. **Erledigt am 22. September 2026; der Footer blieb bewusst kurz und ohne konkurrierende Navigation.**
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-WEB-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0670

- Quelle: `docs/design-guide.md:276` · VanVenture – Design Guide / Umsetzungsnachweis
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: Der Kajak-Hero ist der vollständige Referenzfall dieses Systems: das ausgewählte Bild ist gespiegelt (Boot rechts) und kombiniert Verlauf, Eyebrow, Titel und Einleitung. Er wurde am 22. September 2026 live geprüft.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-WEB-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0746

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:3` · VanVenture Production Brief – GCS nach einem Jahr
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Stand: 23. September 2026 Status: verbindlicher Brief, Faktenbasis aus `source-notes/gcs-1-jahr-erfahrung.md`
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0747

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:6` · VanVenture Production Brief – GCS nach einem Jahr
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Der [verbindliche Gesamtplan](../ausbauplan.md) führt den Arbeitsstatus; dieser Brief ist die Umsetzungsgrundlage für den bereits gebrieften VAN-Test.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0748

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:11` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Arbeitstitel:** HYMER Grand Canyon S CrossOver nach einem Jahr – was funktioniert wirklich für Familie, Räder & Hund?
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0749

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:14` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Zielgruppe:** Familien und aktive Camper:innen, die einen kompakten Van für Reisen mit regelmäßig mitgeführten Fahrrädern und Hund realistisch beurteilen wollen.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0750

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:18` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Kernfrage:** Bewährt sich der GCS nach einem Jahr als Basecamp für zwei Erwachsene, ein Kind, einen Hund und regelmäßig mitgeführte Fahrräder?
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0751

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:21` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Nutzenversprechen:** Keine Modellbroschüre, sondern nachvollziehbare Nutzungserfahrung: Was ab Werk trägt, wo der Familienalltag stockt und welche Änderungen tatsächlich helfen.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0752

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:25` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Format und Umfang:** Longform, circa 14–18 Minuten. Anschließend zwei eigenständige vertikale Shorts/Reels.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0753

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:28` · VanVenture Production Brief – GCS nach einem Jahr / Kern
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Produktionsrahmen:** Zielaufwand 8–11 Stunden; tatsächliche Stunden während der Produktion erfassen. Grob: Vorbereitung und Archivsichtung 1,5–2 Stunden, Dreh circa 1,5 Stunden, Rohschnitt 2–3 Stunden, Feinschnitt/Audio 2–3 Stunden sowie Thumbnail, Upload und Shorts 1–2 Stunden. Die Einzelwerte sind bewusst gerundet; bei der Planung gilt das Gesamtziel.
- PKG-026-Einordnung: Unresolved: älterer 24-Stunden-Wert für denselben Umfang ungeklärt. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

- COVERAGE-R1-048: 8–11 Stunden sind als Gesamtziel geplant; die 24-Stunden-README-Reichweite bleibt eine PUBLICATION_DECISION. Keine Ist-Stunden oder harte Obergrenze daraus ableiten. Betroffene Produktionsfreigabe bleibt gesperrt, der technische Final Audit nicht.

## src-0754

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:36` · VanVenture Production Brief – GCS nach einem Jahr / Redaktionelle Leitplanken
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Der Van bleibt Hauptdarsteller. Familie, Räder und Hund sind die belastbar erprobten Praxisfälle; die Räder funktionieren im aktuellen GCS-Setup sehr gut und dürfen als eigene Nutzungserfahrung klar so gesagt werden. Das Kajak bleibt Teil des allgemeinen Reisekonzepts, war 2026 aber zu wenig im Einsatz: Das aktuelle Kajak-Setup ist für dieses Video kein getesteter Praxisfall und wird nur knapp, ohne Wertung eingeordnet.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0755

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:43` · VanVenture Production Brief – GCS nach einem Jahr / Redaktionelle Leitplanken
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Sabine und Helmut haben bewusst den nötigen LKW-Führerschein gemacht, um den 4,1-t-Sprinter zu fahren. Grundlage ist ihr konkretes Nutzungsprofil mit Familie, Hund, Rädern, Ausstattung und dem für die Schlafsituation notwendigen Hoch-/Schlafdach; so bleibt ausreichend Zuladungsreserve. Daraus keine pauschale Aussage ableiten, dass 4,1 t allgemein nötig seien.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0756

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:49` · VanVenture Production Brief – GCS nach einem Jahr / Redaktionelle Leitplanken
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Archiv-first ist verbindlich:** Vorhandenes Reise-, Van-, Bike- und Familienalltagsmaterial zuerst nutzen. Neu drehen nur, was für aktuelle Aussagen, den realen Heck-Test und ein schlüssiges Fazit fehlt.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0757

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:55` · VanVenture Production Brief – GCS nach einem Jahr / Sprechstrategie und Ton
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Keine durchgehende Moderation. Drei kompakte On-Camera-Blöcke aufnehmen und am Ende eine kurze Voice-over-Session für Übergänge, Archivbilder und offene Beobachtungen ergänzen:
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0758

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:59` · VanVenture Production Brief – GCS nach einem Jahr / Sprechstrategie und Ton
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - **Block A:** Warum GCS, 4,1 t und Hoch-/Schlafdach für dieses konkrete Familienprofil.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0759

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:61` · VanVenture Production Brief – GCS nach einem Jahr / Sprechstrategie und Ton
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - **Block B:** Heck, Stauraum, Tisch/Sessel und der Eurobox-Lösungsversuch.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0760

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:62` · VanVenture Production Brief – GCS nach einem Jahr / Sprechstrategie und Ton
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - **Block C:** Positives, Negatives und ehrliches Fazit.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0761

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:64` · VanVenture Production Brief – GCS nach einem Jahr / Sprechstrategie und Ton
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Ruhig, konkret und fair erzählen. Positive Grundbewertung und offene Grenzen stehen nebeneinander; Beobachtungen als eigene Erfahrung, nicht als allgemeine Kauf- oder Technikbehauptung formulieren.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0762

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:70` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Kamera möglichst selten umbauen. Fahrten, Reisen, Bike-Action und Familienalltag kommen bevorzugt aus dem Archiv.
- PKG-026-Einordnung: Covered im Plan. Original und alle Kandidaten geprüft; konkrete AC bei ST-CON-01. Datierte Quellenstatus sind historisch. Implementation Verification: in PKG-026 nicht geprüft.

## src-0763

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:73` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 1. **Van + Bike-Basecamp:** Außenbild mit Van und mindestens einem Rad als Einstieg für Familie, Räder und Hund.
- PKG-027-Lesart: Einzelklauseln und Quellbedingungen im ST-CON-01-Dreh- oder Aussagekriterium geprüft; Produktion und Live-Stand offen.


## src-0764

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:75` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 2. **Echtes Heck:** Den tatsächlich beladenen Heckbereich ohne künstliche Vorher-/Nachher-Situation zeigen.
- PKG-027-Lesart: Einzelklauseln und Quellbedingungen im ST-CON-01-Dreh- oder Aussagekriterium geprüft; Produktion und Live-Stand offen.


## src-0765

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:77` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 3. **Heckauszug vs. Tisch/Sessel:** Ausgangsproblem → heutige Verbesserung → aktuelles Folgeproblem: Der bereits verbaute Overland-Equipment-Heckauszug verbessert den Zugriff, wird aber vom serienmäßig an der rechten Wand montierten Tisch und dem dritten Sessel fürs Kind blockiert.
- PKG-027-Lesart: Drehfolge: Ausgangsproblem → bereits verbaute Verbesserung → verbleibende Blockade; kein offener Einbau.


## src-0766

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:81` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 4. **Eurobox-Prototyp:** Die selbst konstruierte Halterung zeigen, mit der Tisch und Sessel an Euroboxen befestigt werden sollen. Realistischer Filmtest: zwei Euroboxen à 60 × 40 × 40 cm im Auszug. Ergebnis offen dokumentieren; das Euroboxen-Gesamtkonzept ist noch nicht final.
- PKG-027-Lesart: Halterung und Befestigungszweck, zwei Euroboxen à 60 × 40 × 40 cm, offenes Testergebnis und unfertiges Gesamtkonzept getrennt prüfen.


## src-0767

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:85` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 5. **Bike-Test:** Ein echter, kurzer Lade-/Zugriffs- oder Abfahrtsmoment, der die sehr gut funktionierende Radnutzung belegt.
- PKG-027-Lesart: Einzelklauseln und Quellbedingungen im ST-CON-01-Dreh- oder Aussagekriterium geprüft; Produktion und Live-Stand offen.


## src-0768

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:87` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 6. **Dach / 4,1 t / Familie-B-Roll:** Hoch-/Schlafdach, reales Familiengepäck, Hund- und Reisealltag als Bild für die individuelle Zuladungsentscheidung.
- PKG-027-Lesart: Einzelklauseln und Quellbedingungen im ST-CON-01-Dreh- oder Aussagekriterium geprüft; Produktion und Live-Stand offen.


## src-0769

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:89` · VanVenture Production Brief – GCS nach einem Jahr / Neuer Dreh: sieben kompakte Setups
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: 7. **Abschlussbild:** Ruhiges, echtes Basecamp-Bild mit Van und Rad als visuelles Fazit.
- PKG-027-Lesart: Einzelklauseln und Quellbedingungen im ST-CON-01-Dreh- oder Aussagekriterium geprüft; Produktion und Live-Stand offen.


## src-0770

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:94` · VanVenture Production Brief – GCS nach einem Jahr / Minimal-Drehstrategie
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - Hauptkamera: Olympus OM-D E-M1 Mark II mit M.Zuiko 12–40 mm f/2.8 PRO.
- PKG-027-Lesart: Genanntes Hauptkamera-Set ist bis zur Besitzprüfung nach SRC-0774 nicht als verfügbar bestätigt.


## src-0771

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:95` · VanVenture Production Brief – GCS nach einem Jahr / Minimal-Drehstrategie
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - Sprache: DJI Mic 3.
- PKG-027-Lesart: DJI Mic 3 ist bis zur Besitzprüfung nach SRC-0774 nicht als verfügbar bestätigt.


## src-0772

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:96` · VanVenture Production Brief – GCS nach einem Jahr / Minimal-Drehstrategie
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - Zweite Perspektive: GoPro Hero 13 fest für das Heck.
- PKG-027-Lesart: GoPro Hero 13 ist für eine feste Heckperspektive vorgesehen; Besitzprüfung nach SRC-0774 offen.


## src-0773

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:97` · VanVenture Production Brief – GCS nach einem Jahr / Minimal-Drehstrategie
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: - DJI Air 3S nur optional, wenn ohnehin geflogen wird; keine Drohnenaufnahme eigens für diesen Film produzieren.
- PKG-027-Lesart: DJI Air 3S ist optional nur bei ohnehin stattfindendem Flug; kein eigener Drohnendreh.


## src-0774

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:100` · VanVenture Production Brief – GCS nach einem Jahr / Minimal-Drehstrategie
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: Die Gearliste stammt aus einer Reviewfassung im privaten `mission-paris-2026`-Repository und ist nicht als vollständige Inventur verifiziert. Vor dem Dreh kurz gegen den tatsächlichen Besitz prüfen.
- PKG-027-Lesart: Gearliste aus privater Reviewfassung ist keine Inventur; tatsächlichen Besitz vor Dreh prüfen.


## src-0775

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:106` · VanVenture Production Brief – GCS nach einem Jahr / Aussagen und No-Gos
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Belegte Aussagen:** Einsatz seit Juni 2025, Nutzung durch zwei Erwachsene, ein Kind und einen Hund, die sehr gut funktionierende Radnutzung im aktuellen Setup, der verbaute Overland-Equipment-Heckauszug sowie die hier beschriebene 4,1-t-Entscheidung für dieses konkrete Nutzungsprofil. Das Kajak ist Teil des Reisekonzepts, für das aktuelle Setup aber noch nicht ausreichend erprobt.
- PKG-027-Lesart: Fünf Fakten sind als eigene Aussagen zu prüfen; Kajak im aktuellen Setup nicht als erprobt darstellen.


## src-0776

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:112` · VanVenture Production Brief – GCS nach einem Jahr / Aussagen und No-Gos
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **No-Gos:** Keine pauschalen Kaufempfehlungen, keine unbestätigten technischen Ursachen und keine pauschalen Verbrauchs- oder Zuladungsversprechen. Keine erkennbaren Kennzeichen und keine Bilder erkennbarer Kinder veröffentlichen, ohne dass sie ausdrücklich ausgewählt wurden. Den Eurobox-Prototyp nie als fertige Lösung darstellen.
- PKG-027-Lesart: Kaufempfehlung, technische Ursache, Verbrauch/Zuladung, Kennzeichen, Kinderbild und Prototypstatus sind separate Gates; AGENTS.md verlangt für erkennbare Kinder Auswahl und Anonymisierung.


## src-0777

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:120` · VanVenture Production Brief – GCS nach einem Jahr / Auswertung und Wiederverwertung
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Longform-KPI für den 28-Tage-Review:** Watchtime, durchschnittliche Wiedergabedauer, Retention an den Abschnitten Heck/Stauraum und Eurobox-Test, qualifizierte Fragen in Kommentaren sowie tatsächliche Produktionsstunden. Diese Werte werden mit den verfügbaren VAN-/Longform-Vergleichswerten eingeordnet; ohne belastbare Vergleichsdaten keine Erfolgsbehauptung.
- PKG-027-Lesart: Alle sechs KPI-Dimensionen im 28-Tage-Review einzeln erfassen; Vergleiche nur bei verfügbaren Daten, keine unbelegte Erfolgsbehauptung.


## src-0778

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:126` · VanVenture Production Brief – GCS nach einem Jahr / Auswertung und Wiederverwertung
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Short/Reel 1:** „Warum wir unseren GCS als 4,1-Tonner fahren“ – die individuelle Zuladungsentscheidung für Familie, Hund, Räder und Hochdach; keine allgemeine Gewichts- oder Kaufempfehlung.
- PKG-027-Lesart: Short 1 mit eigener 4,1-t-Entscheidung; keine allgemeine Gewichts- oder Kaufempfehlung.


## src-0779

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:130` · VanVenture Production Brief – GCS nach einem Jahr / Auswertung und Wiederverwertung
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Short/Reel 2:** „Der Heckauszug ist eingebaut – warum er trotzdem noch nicht funktioniert“ – Tisch, dritter Sessel und der offene Eurobox-Prototyp im realen Kontext.
- PKG-027-Lesart: Short 2 zeigt bereits eingebauten, zugriffsverbessernden, aber weiter blockierten Heckauszug.


## src-0780

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:134` · VanVenture Production Brief – GCS nach einem Jahr / Auswertung und Wiederverwertung
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Website:** Erst nach der Veröffentlichung mit belegter eigener Erfahrung ergänzen; nur freigegebene, anonymisierte Webderivate verwenden.
- PKG-027-Lesart: Unresolved: Was bedeutet „nach der Veröffentlichung“: Longform oder gesamtes Paket einschließlich beider Shorts? Website-Timing bis zur Entscheidung nicht freigegeben; nur belegte Erfahrung und geprüfte, freigegebene, anonymisierte Webderivate.


- COVERAGE-R1-048: Longform oder Gesamtpaket als auslösendes Veröffentlichungsereignis bleibt PUBLICATION_DECISION. GCS-Website-Ergänzung bis zur Antwort gesperrt; technische Final-Audit-Arbeit darf fortgehen.

## src-0781

- Quelle: `docs/production-briefs/gcs-nach-einem-jahr.md:137` · VanVenture Production Brief – GCS nach einem Jahr / Auswertung und Wiederverwertung
- Anwendung: ST-CON-01
- Verbindlicher Originalwortlaut: **Spätere Vertiefungen:** fertiges Eurobox-/Tisch-/Sessel-System, Fahrwerk/Hecklastigkeit, Heckauszug-Langzeiterfahrung sowie Kajak im aktuellen GCS-Setup, sobald ausreichend echte Erfahrung vorliegt.
- PKG-027-Lesart: Vier spätere mögliche Vertiefungen erst nach ausreichender echter Erfahrung; kein aktuelles Lieferobjekt.


## src-0782

- Quelle: `docs/project-rules/scrum-planning.md:3` · Verbindliche Scrum-Planungsregel für VanVenture
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Stand: 25. September 2026 Geltung: alle neuen Projektpläne und jede spätere Überarbeitung bestehender Projektpläne. Diese Regel beschreibt die Planung; fachliche Anforderungen, Architektur, Designfreigaben, Abnahme- und Veröffentlichungsregeln bleiben in ihren jeweils maßgeblichen Dokumenten. Der aktive Gesamtplan steht derzeit in [`docs/ausbauplan.md`](../ausbauplan.md). Das private Familien-Scrum-Board ist eine geplante Anwendung und keine zweite maßgebliche Projektplanung.
- PKG-027-Lesart: Geltung, Planungsgegenstand und fortbestehende Fach-/Design-/Release-Autoritäten getrennt; ausbauplan.md derzeit aktiv, Board kein zweiter Plan.


## src-0783

- Quelle: `docs/project-rules/scrum-planning.md:13` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Jede geplante Produktänderung wird nachvollziehbar gegliedert:
- PKG-027-Lesart: Nur zusammen mit SRC-0784 vollständige Hierarchieregel.


## src-0784

- Quelle: `docs/project-rules/scrum-planning.md:15` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: **Goal / Initiative → Epic → User Story → Task / Subtask**
- PKG-027-Lesart: Goal/Initiative → Epic → User Story → Task/Subtask ist die verbindliche Reihenfolge.


## src-0785

- Quelle: `docs/project-rules/scrum-planning.md:17` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Ebene | Zweck | Mindestinhalt |
- PKG-027-Lesart: Tabellenkopf ist Strukturkontext ohne zusätzliche Pflicht.


## src-0786

- Quelle: `docs/project-rules/scrum-planning.md:19` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Goal / Initiative | Beschreibt ein überprüfbares Nutzer- oder Geschäftsziel. | Zielgruppe, angestrebter Nutzen, Erfolgsmaß und Bezug zur maßgeblichen Anforderung. |
- PKG-027-Lesart: Goal-Prüfung: Zielart, Zielgruppe, Nutzen, Erfolgsmaß und Anforderungsbezug einzeln nachweisen.


## src-0787

- Quelle: `docs/project-rules/scrum-planning.md:20` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Epic | Bündelt mehrere lieferbare Stories für ein zusammenhängendes Ergebnis. | Zielbeitrag, Grenzen, priorisierte Stories und Abschlussbedingung. |
- PKG-027-Lesart: Epic-Prüfung: mehrere lieferbare Stories, Zielbeitrag, Grenzen, Priorisierung und Abschlussbedingung.


## src-0788

- Quelle: `docs/project-rules/scrum-planning.md:21` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | User Story | Beschreibt ein kleines, eigenständig abnehmbares Ergebnis aus Nutzersicht. | „Als … möchte ich …, damit …“, User Value oder Business Value, Acceptance Criteria, Priorität und Verweise auf Anforderungen. |
- PKG-027-Lesart: Story-Prüfung: kleine unabhängige Nutzersicht, Rollenformel, Wert, AC, Priorität und Quellen; ST-CON-01-Größe bleibt Partially Covered.
- COVERAGE-R1-003 (historischer Prüfstand, durch R5 aktualisiert): ST-CON-01 ist der VAN-Longform-Slice; die weiteren Ergebnisarten sind in ST-CON-05–08 als getrennte Stories angelegt. Der vollständige 71-Story-Review steht in PLAN-QUALITY-RECOVERY-2026-09-26; verbleibende Befunde sind dort einzeln offen geführt.


- COVERAGE-R1-048 (historischer Prüfstand, durch R5 aktualisiert): ST-CON-01 ist Longform; Shorts, Website-Ergänzungen und Reviews sind bereits als ST-CON-05–16 separat modelliert. Reviewbefunde und offene Reparaturen stehen im Recoverybericht.

- COVERAGE-R4-001 (26.09.2026): Vollständiger Story-/Epic-Abgleich abgeschlossen. EPIC-CONTENT ist in eigenständige Longform-, Short-1-, Short-2-, Website- und 28-Tage-Review-Stories je VAN/EXPLORE/MOVE zerlegt (ST-CON-01–ST-CON-16); Kriterien, Quellen, Abhängigkeiten und je Story prüfbares Ergebnis sind im Story-Katalog dokumentiert. EPIC-ACCESS/ST-AUTH-01 bleibt als ein kohärenter, historisch verifizierter Ende-zu-Ende-Zugangsslice; seine Rollen-, Sitzungs-, Fehler- und Schutzprüfungen sind Akzeptanzkriterien derselben Sicherheitsgrenze, keine getrennten User Outcomes. EPIC-VIDEO/ST-VID-01 bleibt ein klar begrenzter Sardinien-Short→Longform-Link-Slice; versionspezifische Vollfreigaben bleiben separate Holds. Kein Epic wird allein wegen einer Story als abgeschlossen gewertet.

## src-0789

- Quelle: `docs/project-rules/scrum-planning.md:22` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Task / Subtask | Beschreibt die konkrete Arbeit zur Umsetzung und Prüfung einer Story. | Ergebnis, zuständige Story, nötige Abhängigkeiten und Prüfschritt. |
- PKG-027-Lesart: Task/Subtask-Prüfung: Ergebnis, zuständige Story, nötige Abhängigkeiten und Prüfschritt.


## src-0790

- Quelle: `docs/project-rules/scrum-planning.md:24` · Verbindliche Scrum-Planungsregel für VanVenture / 1. Planungshierarchie und Rückverfolgbarkeit
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Tasks und Subtasks sind keine Ersatz-Stories. **Ein Task gehört immer zu einer User Story; ein Subtask gehört zu einem Task derselben Story. Tasks oder Subtasks direkt unter einem Epic sind nicht erlaubt.** Technische Arbeiten werden einer Story zugeordnet und erben deren Nutzenbezug. Bestehende Kennungen und Quellverweise bleiben bei einer späteren Umstrukturierung erhalten oder werden eindeutig auf neue Kennungen abgebildet. Ein Epic ist erst abgeschlossen, wenn seine Stories einschließlich der nötigen Abnahme abgeschlossen sind.
- PKG-027-Lesart: Task ersetzt keine Story; Task unter Story, Subtask unter Task derselben Story; kein direkter Epic-Task; Kennungen/Quellen erhalten; Epic erst nach Story-Abnahmen fertig.


## src-0791

- Quelle: `docs/project-rules/scrum-planning.md:34` · Verbindliche Scrum-Planungsregel für VanVenture / 2. Vertical Slices und kleine Inkremente
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Stories werden als **Vertical Slices** geschnitten: Ein Inkrement reicht durch die jeweils nötigen Schichten von Daten und Logik bis zur nutzbaren Oberfläche, Veröffentlichung oder beobachtbaren Wirkung. Es liefert einen konkreten Teilnutzen und kann unabhängig geprüft werden. Reine Schichten wie „Datenbank fertig“ oder „UI fertig“ sind im Regelfall Tasks innerhalb einer solchen Story.
- PKG-027-Lesart: Slice-Prüfung: jeweils nötige Schichten bis nutzbarer Wirkung, konkreter Teilnutzen, unabhängige Prüfung; reine Schichten im Regelfall Tasks. Projektweiter Check und ST-CON-01-Größe bleiben Partially Covered.
- COVERAGE-R1-003 (historischer Prüfstand, durch R5 aktualisiert): Die VAN-, EXPLORE- und MOVE-Ergebnisarten sind jetzt in Longform-, Short-, Website- und Review-Stories getrennt. Die Story-Quality-Recovery dokumentiert actor-/scope-Korrekturen und weitere offene Qualitätspunkte.


- COVERAGE-R1-048 (historischer Prüfstand, durch R5 aktualisiert): Die Ergebnis-Slices sind in ST-CON-01–16 angelegt; unabhängige Reviewbefunde und noch offene Reparaturen sind im Recoverybericht dokumentiert.

- COVERAGE-R4-001 (26.09.2026): Der projektweite Vertical-Slice-Check ist abgeschlossen. ST-CON-01–ST-CON-16 schneiden die Content-Ergebnisse entlang eigenständig nutzbarer Ausgaben; Website-Stories warten explizit auf die geklärte Veröffentlichungsereignis-Entscheidung und freigegebene Webderivate, die Review-Stories auf Veröffentlichung und Brief-Kennzahlen. Short 1 und Short 2 sind unabhängig voneinander. Die anderen einzeln geprüften Stories haben je einen beobachtbaren Nutzenausgang oder sind notwendige zusammenhängende Sicherheitsgrenzen; Tasks verbleiben unter ihren Stories.

## src-0792

- Quelle: `docs/project-rules/scrum-planning.md:40` · Verbindliche Scrum-Planungsregel für VanVenture / 2. Vertical Slices und kleine Inkremente
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Ein Epic wird in kleine, funktionierende Inkremente zerlegt. Das erste Inkrement kann ein **Walking Skeleton** sein: ein schmaler, durchgängiger End-to-End-Ablauf mit echter Eingabe, Verarbeitung, Ausgabe und den notwendigen Schutz- und Prüfschritten. Es muss als eigener Teilstand demonstrierbar sein; Platzhalter allein gelten nicht als fertig. Weitere Stories erweitern den Nutzen schrittweise, ohne einen großen Abschlussblock vorauszusetzen.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-003: Das optionale ST-AN-01-Skeleton hat ein konkretes Demonstrations-AC mit echter Eingabe, zentraler Verarbeitung, sichtbarer Ausgabe, Schutz-Negativfall und Platzhalter-Ausschluss. Durchführung und projektweite Epic-Prüfung bleiben offen.


- COVERAGE-R1-048: Alle vier hier geprüften Klauseln sind im projektweiten Gate geplant. Das Skeleton ist optional; falls gewählt, sind echter End-to-End-Ablauf, Schutz, Prüfung und eigenständige Demonstration nötig, Platzhalter nicht Done. Weitere Stories liefern schrittweisen Nutzen. Epic-weite Anwendung bleibt technische Prüfung.

- COVERAGE-R4-001 (26.09.2026): Epic-Prüfung: EPIC-CONTENT hat jetzt mehrere unabhängig prüfbare Inkremente, keine Gesamtpaket-Abnahme ist Voraussetzung für einzelne Longform-/Short-Slices. Website- und Review-Ergebnisse haben getrennte spätere Abhängigkeiten. EPIC-ACCESS und EPIC-VIDEO wurden anhand ihrer konkret begrenzten Nutzerergebnisse geprüft; die bestehende Authentifizierungs-Sicherheitsgrenze beziehungsweise der einzelne Video-Link-Release ist jeweils ein zusammenhängender Slice. Die Anzahl Stories je Epic ist kein alleiniger Qualitätsnachweis; die Begründung und Grenzen stehen oben.

## src-0793

- Quelle: `docs/project-rules/scrum-planning.md:47` · Verbindliche Scrum-Planungsregel für VanVenture / 2. Vertical Slices und kleine Inkremente
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: **Enabler Stories** sind nur zulässig, wenn eine technische, rechtliche oder betriebliche Voraussetzung nicht sinnvoll innerhalb einer Value Story erledigt werden kann. Sie benennen die konkret freigeschalteten Folgestories, den notwendigen Umfang und ein überprüfbares Ergebnis. Reine Vorarbeit ohne begründete Abhängigkeit wird nicht als eigenständige Story geplant.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-003: ST-WEB-03 benennt die nicht sinnvoll pro Value Story wiederholbare gemeinsame Release-Prüfung, ST-WEB-02/04/05 als freigeschaltete Folgestories, den Mindestumfang und das prüfbare Berichtsergebnis. Weitere Enabler benötigen dieselbe Einzelbegründung; kein Release ist damit freigegeben.


- COVERAGE-R1-048: Alle drei hier geprüften Klauseln sind im Gate geplant. ST-WEB-03 nennt gemeinsame Voraussetzung, Folgestories, Minimalumfang und prüfbares Berichtsergebnis als konkreten Fall. Jeder weitere Enabler verlangt denselben Einzelbeleg; reine Vorarbeit ohne begründete Abhängigkeit wird Task. Projektweite Anwendung bleibt technische Prüfung.

## src-0794

- Quelle: `docs/project-rules/scrum-planning.md:55` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Vor der Einplanung wird jede Story an **INVEST** geprüft:
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0794.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0795

- Quelle: `docs/project-rules/scrum-planning.md:57` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Independent:** möglichst unabhängig lieferbar; unvermeidbare Abhängigkeiten sind sichtbar.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0795.a, SRC-0795.b sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0796

- Quelle: `docs/project-rules/scrum-planning.md:59` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Negotiable:** beschreibt das gewünschte Ergebnis, ohne die Umsetzung unnötig festzuschreiben; bindende Fach- und Designregeln bleiben verbindlich.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0796.a, SRC-0796.b sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0797

- Quelle: `docs/project-rules/scrum-planning.md:61` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Valuable:** nennt den konkreten User Value oder Business Value und die betroffenen Personen beziehungsweise den betrieblichen Nutzen.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0797.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0798

- Quelle: `docs/project-rules/scrum-planning.md:63` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Estimable:** Umfang und Unsicherheiten sind so klar, dass Aufwand und Reihenfolge sinnvoll eingeschätzt werden können.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0798.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0799

- Quelle: `docs/project-rules/scrum-planning.md:65` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Small:** passt in ein kurzes, prüfbares Arbeitsinkrement; zu große Stories werden entlang des Nutzens geteilt.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


- COVERAGE-R1-049: SRC-0799.a, SRC-0799.b sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0800

- Quelle: `docs/project-rules/scrum-planning.md:67` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: - **Testable:** besitzt beobachtbare, eindeutige Acceptance Criteria.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Je Story beobachtbare und eindeutige AC gegen Story- und Quell-ID prüfen; Einzelbefund offen (`scrum-plan.md`, Einzelprüfung SRC-0800–0802).


- COVERAGE-R1-049: SRC-0800.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0801

- Quelle: `docs/project-rules/scrum-planning.md:69` · Verbindliche Scrum-Planungsregel für VanVenture / 3. Qualität einer User Story: INVEST
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Bei einem fehlenden Merkmal wird die Story geschärft, geteilt oder mit einer begründeten Abhängigkeit versehen, bevor sie als umsetzungsbereit gilt.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Fehlendes INVEST-Merkmal mit Befund und Schärfung, Teilung oder begründeter Abhängigkeit vor Ready dokumentieren; storyweiser Nachweis offen.


- COVERAGE-R1-049: SRC-0801.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0802

- Quelle: `docs/project-rules/scrum-planning.md:74` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: **Acceptance Criteria** beschreiben pro Story konkrete, von außen prüfbare Ergebnisse und relevante Grenzfälle. Sie nennen bei Bedarf Rollen, Geräte, Sprachen, Datenschutz, Barrierefreiheit, Fehlerverhalten und Datenzustände. Sie dürfen bindende Spezifikationen nicht stillschweigend abschwächen.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: AC je Story auf außen prüfbares Ergebnis, relevante Grenzfälle, bedarfsabhängige Rollen/Geräte/Sprachen/Datenschutz/Barrierefreiheit/Fehler/Datenzustände und bindenden Quellabgleich prüfen; Gesamtbestand offen.


- COVERAGE-R1-049: SRC-0802.a, SRC-0802.b, SRC-0802.c sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0803

- Quelle: `docs/project-rules/scrum-planning.md:79` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Die **Definition of Done** gilt für jedes als abgeschlossen gemeldete Inkrement. Erforderlich sind:
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: DoD-Prüfung gilt für jedes als abgeschlossen gemeldete Inkrement, einschließlich Teilständen; der einzelne Prüfbeleg ist offen.


- COVERAGE-R1-049: SRC-0803.a sind als projektweite Planvorgabe im Scrum-Entwurf und durch den Originalwortlaut hier **Covered**. Story-/Inkrement-Einzelbelege bleiben als technische Planungs-/Evidenzprüfung offen; keine Ready-, Done- oder Release-Freigabe folgt daraus.

## src-0804

- Quelle: `docs/project-rules/scrum-planning.md:82` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 1. Alle Acceptance Criteria sind mit geeigneten, reproduzierbaren Prüfungen erfüllt; bekannte Grenzen und nicht geprüfte Fälle sind benannt.
- PKG-028-Lesart: Dauerhafte DoD-Regel; Blocked bezog sich irrtümlich auf die Regel. Konkrete Lücke: geeigneter reproduzierbarer AC-Nachweis und benannte ungeprüfte Fälle je abgeschlossenem Inkrement fehlen.
- COVERAGE-R1-001: Der Entwurf verlangt nun AC-bezogene reproduzierbare Prüfschritte, Ergebnis, Grenzen und ungeprüfte Fälle je Inkrement; die tatsächlichen Einzelbelege fehlen weiterhin.
- COVERAGE-R1-050: SRC-0804.b, SRC-0804.c sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0805

- Quelle: `docs/project-rules/scrum-planning.md:84` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 2. Die betroffenen fachlichen Anforderungen, Architektur- und Designregeln sowie notwendige Freigaben sind eingehalten und rückverfolgbar.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Betroffene Fach-, Architektur-, Design- und Freigabebelege mit Quell-/Entscheidungs-ID je Inkrement zuordnen. DEC-REL-001/002 sind keine durch Planung erteilten Freigaben.
- COVERAGE-R1-050: SRC-0805.b sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0806

- Quelle: `docs/project-rules/scrum-planning.md:86` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 3. Änderungen an Code, Inhalt, Tests und betroffener Dokumentation sind konsistent; Status und Nachweise widersprechen einander nicht.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Code, Inhalt, Tests, betroffene Dokumentation, Status und Nachweise je Inkrement auf Konsistenz und Widersprüche abgleichen; Einzelprüfung offen.
- COVERAGE-R1-050: SRC-0806.b, SRC-0806.c sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0807

- Quelle: `docs/project-rules/scrum-planning.md:88` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 4. Der tatsächliche Zustand ist korrekt ausgewiesen: geplant, lokal vorbereitet, geprüft, freigegeben, gepusht und live verifiziert sind unterschiedliche Zustände. Für produktive Änderungen gelten zusätzlich der bestehende Release-Prozess und die Live-Prüfung.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Die sechs Zustände je Inkrement getrennt ausweisen; historische Belege nicht hochstufen. Produktive Änderungen unterliegen zusätzlich DEC-REL-001–003, Release-Prozess und Live-Prüfung; keine Freigabe wird hier behauptet.
- COVERAGE-R1-050: SRC-0807.b sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0808

- Quelle: `docs/project-rules/scrum-planning.md:92` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: 5. Offene Folgearbeit ist als eigene Story oder Task mit Bezug und Priorität erfasst. Ein Teilstand wird nicht als vollständiges Epic ausgegeben.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Offene Folgearbeit als Story oder Task mit Bezug und Priorität erfassen; Epic erst nach Abschluss und Abnahme aller zugehörigen Stories schließen. Bestandsabgleich offen.
- COVERAGE-R1-050: SRC-0808.b, SRC-0808.c sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0809

- Quelle: `docs/project-rules/scrum-planning.md:95` · Verbindliche Scrum-Planungsregel für VanVenture / 4. Acceptance Criteria und Definition of Done
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Projektspezifische Schutz-, Bild-, Sicherheits- und Abnahmevorgaben gelten zusätzlich; diese Regel ersetzt sie nicht.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-001: Projektspezifische Schutz-, Bild-, Sicherheits- und Abnahmevorgaben gelten zusätzlich; die Scrum-Regel ersetzt sie nicht. Betroffenheit je Story und Inkrement bleibt zu prüfen.
- COVERAGE-R1-050: SRC-0809.a sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0810

- Quelle: `docs/project-rules/scrum-planning.md:100` · Verbindliche Scrum-Planungsregel für VanVenture / 5. Priorisierung und Planpflege
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Die Reihenfolge richtet sich zuerst nach **User Value / Business Value**, anschließend nach Dringlichkeit, Risiken, Abhängigkeiten und Aufwand. Die Begründung ist am geplanten Ergebnis erkennbar. Sicherheit, gesetzliche Pflichten, konkrete Störungen und ausdrücklich freigegebene Fast-Track-Fälle können Vorrang erhalten; die Entscheidung und ihr Grund werden festgehalten. Eine technische Komponente wird nicht allein deshalb vorgezogen, weil sie leicht isoliert zu bauen ist. Automatische Priorisierung im privaten Board bleibt an dessen gesonderte Regeln und Freigaben gebunden.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-004 / aktueller Zielabgleich: Einzelne Story-Prioritätsgründe und etwaige Vorrangentscheidungen bleiben offen; die Regel ist kein automatisch angewandter P0–P3-Nachweis. Planning Coverage ist von Implementation Verification getrennt.
- COVERAGE-R1-050: SRC-0810.a, SRC-0810.b, SRC-0810.c, SRC-0810.d, SRC-0810.e, SRC-0810.f sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0811

- Quelle: `docs/project-rules/scrum-planning.md:109` · Verbindliche Scrum-Planungsregel für VanVenture / 5. Priorisierung und Planpflege
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Neue Anforderungen werden in der zuständigen fachlichen Quelle dokumentiert und im maßgeblichen aktiven Plan mit ihrem Ziel, Nutzen, Slice, Kriterien und Quellverweis verbunden. Referenz- und Statusdokumente werden nicht zu konkurrierenden Backlogs. Ein Planwechsel darf keine offenen oder erledigten Anforderungen unsichtbar machen.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-004 / aktueller Zielabgleich: Aktiv bleibt docs/ausbauplan.md; neue Anforderungen brauchen Fachquelle, Ziel, Nutzen, Slice, AC und Quellverweis. Das Register ist kein Backlog. Planning Coverage ist von Implementation Verification getrennt.
- COVERAGE-R1-050: SRC-0811.a, SRC-0811.c sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0812

- Quelle: `docs/project-rules/scrum-planning.md:117` · Verbindliche Scrum-Planungsregel für VanVenture / 6. Coverage- und Traceability-Check vor Planmigration
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Vor dem Ersetzen, Archivieren oder Löschen eines bestehenden Plans wird ein nachprüfbarer Abgleich erstellt. Er umfasst **alle** bisherigen Ziele, Anforderungen, offenen und erledigten Einträge, Entscheidungen, Abhängigkeiten, Prioritäten, Ausnahmen und Statusnachweise. Für jeden Eintrag wird festgehalten:
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-004 / aktueller Zielabgleich: Vor Ersetzen, Archivieren oder Löschen alle Ziele, Anforderungen, offenen/erledigten Einträge, Entscheidungen, Abhängigkeiten, Prioritäten, Ausnahmen und Statusbelege einzeln abgleichen. Planning Coverage ist von Implementation Verification getrennt.
- COVERAGE-R1-050: SRC-0812.a, SRC-0812.b sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0813

- Quelle: `docs/project-rules/scrum-planning.md:122` · Verbindliche Scrum-Planungsregel für VanVenture / 6. Coverage- und Traceability-Check vor Planmigration
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Alter Eintrag | Maßgebliche Quelle | Neue Goal-/Epic-/Story-/Task-Kennung | Übernommener Inhalt und Status | Nachweis oder bewusst begründete Entscheidung |
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-004 / aktueller Zielabgleich: Je Alteintrag fünf Felder: alter Pfad/Kennung, Fachquelle, neue Hierarchie-Kennung, Inhalt und Status, Nachweis oder begründete Entscheidung. Planning Coverage ist von Implementation Verification getrennt.
- COVERAGE-R1-050: SRC-0813.a sind durch die bestehenden DoD-, Prioritäts- beziehungsweise Planwechsel-Gates im Entwurf als Planvorgabe Covered. Individuelle Anwendung und Nachweise bleiben offen; keine Umsetzung oder Freigabe daraus ableiten.

## src-0814

- Quelle: `docs/project-rules/scrum-planning.md:124` · Verbindliche Scrum-Planungsregel für VanVenture / 6. Coverage- und Traceability-Check vor Planmigration
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: | Eindeutiger Pfad/Abschnitt/Kennung | Fachliche Referenz | Ziel im neuen Plan | Anforderungen, Kriterien, offene Arbeit und historischer Stand | Prüfung auf Vollständigkeit und Widerspruchsfreiheit |
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


## src-0815

- Quelle: `docs/project-rules/scrum-planning.md:126` · Verbindliche Scrum-Planungsregel für VanVenture / 6. Coverage- und Traceability-Check vor Planmigration
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Der Check ist bestanden, wenn jeder alte Eintrag genau zugeordnet oder mit begründeter Entscheidung ausdrücklich als nicht zu übernehmen markiert ist, alle fachlichen Anforderungen und offenen Arbeiten abgedeckt sind, der Status nicht fälschlich angehoben wird und keine widersprüchlichen aktiven Planstände verbleiben. Offene Lücken blockieren das Ersetzen oder Entfernen des alten Plans. Erst nach dokumentiertem Bestehen werden Verweise und Planregister angepasst; historische Nachweise bleiben auffindbar.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.
- COVERAGE-R1-004 / aktueller Zielabgleich: Bestehen erst bei eindeutiger Zuordnung oder begründetem Nichtübernehmen, vollständiger Abdeckung, korrektem Status und widerspruchsfreiem aktivem Plan; erst dann Verweise/Register ändern und historische Belege auffindbar halten. Planning Coverage ist von Implementation Verification getrennt.
- COVERAGE-R1-051 / SRC-0815.a/c/d: `AC-COVR1-051-01` nennt den vollständigen Bestehensmaßstab, die Reihenfolge für Verweise und Register und die Auffindbarkeit historischer Nachweise ausdrücklich. Planungsregel Covered; Eintragsabgleich und dokumentiertes Bestehen weiter offen.

## src-0816

- Quelle: `docs/project-rules/scrum-planning.md:134` · Verbindliche Scrum-Planungsregel für VanVenture / 6. Coverage- und Traceability-Check vor Planmigration
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Die Einführung dieser Regel allein ist **keine** Migration und keine Abnahme bestehender Pläne. Deren Inhalte und Status bleiben bis zu einem gesonderten, vollständig geprüften Migrationsschritt unverändert.
- PKG-028-Lesart: Originalregel im Entwurf als projektweites Prüfgate präzisiert; individuelle Story-/Epic-Prüfung und Implementierung nicht belegt.


## src-0817

- Quelle: `docs/responsive-templates.md:3` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates
- Anwendung: Quellenkontext / projektweite Statusgrenze
- Verbindlicher Originalwortlaut: Stand: 23. September 2026 Zielprojekt: `reflexible/vanventure` Maßgeblicher Ablageort im Repository: `docs/responsive-templates.md`
- PKG-028-Lesart: Quellenmetadatum; das getrennte Datum ist keine Anforderung.


## src-0818

- Quelle: `docs/responsive-templates.md:7` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates
- Anwendung: Quellenkontext / projektweite Statusgrenze
- Verbindlicher Originalwortlaut: **Übergabestatus:** Diese Spezifikation führt die Anforderungen aus der Abstimmung zusammen. Ihre Übernahme in das Repository bedeutet noch keine technische Umsetzung und keine Veröffentlichung. Den tatsächlichen Umsetzungsstand führt der bestehende Ausbauplan.
- PKG-028-Lesart: Historischer Übergabestatus; Repo-Übernahme ist weder Umsetzung noch Live-Verifikation; ausbauplan.md bleibt bis zu bestandenem Wechsel Statusführer.


## src-0819

- Quelle: `docs/responsive-templates.md:11` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / Geltung, Freigaben und Nachweise
- Anwendung: projektweit; ST-PHOTO-01,ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Diese Datei ist die maßgebliche technische Spezifikation für zentrale Komponenten und Seitentemplates. Die übergreifenden Prüf-, technischen Originalschutz-, Bilddaten-, Freigabe- und Abnahmepflichten stehen verbindlich im [konsolidierten Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md). Freigegebene visuelle Regeln stehen ausschließlich im [Design Guide](design-guide.md). Der [Ausbauplan](ausbauplan.md) ist die einzige aktive Arbeitsliste.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0820

- Quelle: `docs/responsive-templates.md:18` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / Geltung, Freigaben und Nachweise
- Anwendung: projektweit; ST-PHOTO-01,ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Neue Designregeln, Varianten oder Ausnahmen werden vor ihrer verbindlichen oder Live-Wirkung ausdrücklich freigegeben. Bereits freigegebene Regeln werden ohne erneute Rückfrage umgesetzt. Nach einer Freigabe sind Guide, zentrale Implementierung, Tests und Statusnachweis im selben Änderungsvorgang konsistent zu aktualisieren. Die Startseite behält ihr eigenes Layout, ist aber nicht von Bildschutz, Originalschutz oder Prüfung ausgenommen.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0821

- Quelle: `docs/responsive-templates.md:27` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Überarbeite die technische Struktur der öffentlichen Website so, dass gemeinsame Elemente und Seitenlayouts zentral definiert und tatsächlich wiederverwendet werden. Es geht um einen strukturellen Umbau, nicht um ein Redesign.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0822

- Quelle: `docs/responsive-templates.md:29` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Navigation, Galerien, gemeinsame Gestaltung und wiederkehrende Funktionen sollen künftig an einer zentralen Stelle gepflegt werden. Änderungen müssen automatisch auf allen Seiten wirksam werden, die diese Komponenten beziehungsweise Templates verwenden – gegebenenfalls nach dem regulären Build und Deployment, aber ohne jede einzelne Seite manuell nachzuarbeiten.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0823

- Quelle: `docs/responsive-templates.md:31` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die Architektur besteht aus drei getrennten Ebenen:
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0824

- Quelle: `docs/responsive-templates.md:33` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: 1. Gemeinsame Gestaltung und wiederverwendbare Komponenten.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0825

- Quelle: `docs/responsive-templates.md:34` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: 2. Wiederverwendbare responsive Seitentemplates für die jeweiligen Seitentypen.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0826

- Quelle: `docs/responsive-templates.md:35` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: 3. Seitenspezifische Inhalte und Konfiguration.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0827

- Quelle: `docs/responsive-templates.md:37` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 1. Ziel: Einmal ändern, überall übernehmen
- Anwendung: projektweit; ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die öffentliche Startseite unterliegt der ausdrücklichen Ausnahme in Abschnitt 2. Eine ungefragte Neugestaltung der geschützten Redaktion oder des Cockpits ist nicht Teil dieses Auftrags.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0828

- Quelle: `docs/responsive-templates.md:41` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die Startseite ist von der Vereinheitlichung der Seitenlayouts und der Überführung in die Fahrzeug-, Kajak-/Aktivitäts- oder Reisebericht-Templates ausgenommen. Das gilt auf Desktop, Tablet und Smartphone.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0829

- Quelle: `docs/responsive-templates.md:43` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Ihr bestehender Aufbau, ihr Look and Feel, ihre Abschnittsreihenfolge, ihre besonderen Funktionen und ihre mobile Darstellung bleiben erhalten. Die Startseite darf nicht automatisch dem Aufbau der Kajak-Seite oder eines anderen Unterseiten-Templates angeglichen werden.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0830

- Quelle: `docs/responsive-templates.md:45` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Gemeinsame Komponenten sind davon getrennt zu betrachten: Navigation, Footer oder tatsächlich gemeinsam verwendete Funktionen dürfen zentral eingebunden werden. Dabei müssen Erscheinungsbild und Verhalten der Startseite erhalten bleiben. Benötigte startseitenspezifische Unterschiede werden als ausdrücklich definierte Varianten der gemeinsamen Komponenten umgesetzt – nicht als vollständig kopierte Parallelimplementierung.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0831

- Quelle: `docs/responsive-templates.md:47` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Auch Änderungen an globalen Styles, responsiven Regeln, Templates, Generatoren und gemeinsamen Skripten dürfen die Startseite nicht unbeabsichtigt verändern. Sie muss deshalb bei jeder relevanten Umstellung auf Desktop, Tablet und Smartphone als geschützte Vergleichsseite mitgeprüft werden.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0832

- Quelle: `docs/responsive-templates.md:49` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 2. Ausdrückliche Ausnahme: Die Startseite bleibt eigenständig
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: **Leitregel:** Die Unterseiten verwenden ihre vorgesehenen responsiven Seitentemplates. Die Startseite behält ihr eigenes Layout.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0833

- Quelle: `docs/responsive-templates.md:53` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die aktuelle Kajak-Seite gefällt mir in ihrem bestehenden Zustand sehr gut. Ihr Stil, Look and Feel und ihre vorhandenen Funktionen sind die Referenz für die gemeinsame Gestaltung der Unterseiten.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0834

- Quelle: `docs/responsive-templates.md:55` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Das betrifft insbesondere Typografie, Farben, Abstände, Inhaltsbreiten, Bilddarstellung, Buttons, Karten, Galerien, Interaktionen und responsives Verhalten.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0835

- Quelle: `docs/responsive-templates.md:57` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Sichere vor dem Umbau die aktuelle Darstellung und die vorhandenen Funktionen als Vergleichsbasis, einschließlich Desktop-, Tablet- und Mobilansichten. Gleiche dafür den maßgeblichen aktuellen Website-Stand mit dem Repository ab; eine möglicherweise ältere Veröffentlichung darf nicht versehentlich zur Referenz werden.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0836

- Quelle: `docs/responsive-templates.md:59` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Die Kajak-Seite soll nach der Umstellung selbst das gemeinsame Aktivitäts-/Themenseiten-Template verwenden. Sie darf nicht lediglich als unveränderte Sonderseite neben einer davon abgeleiteten zweiten Implementierung bestehen bleiben.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0837

- Quelle: `docs/responsive-templates.md:61` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Keine ungefragte kreative Neuinterpretation, kein Austausch des Hero-Bildes, keine Umgestaltung und keine inhaltliche Neufassung. Technisch notwendige Änderungen dürfen den gelungenen sichtbaren Zustand und die vorhandenen Funktionen nicht unbeabsichtigt verändern.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0838

- Quelle: `docs/responsive-templates.md:63` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 3. Die Kajak-Seite ist die verbindliche Gestaltungsreferenz
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Andere Seitentypen behalten einen zu ihren Inhalten passenden Aufbau. Ein Reisebericht muss nicht dieselbe Inhaltsstruktur wie die Kajak-Seite haben, verwendet aber dieselbe gemeinsame Designsprache und dieselben passenden Komponenten.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0839

- Quelle: `docs/responsive-templates.md:67` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Untersuche die bestehenden Seiten und lagere tatsächlich wiederkehrende Bausteine in gemeinsame Komponenten, Includes oder Partials aus, passend zur bestehenden Architektur.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0840

- Quelle: `docs/responsive-templates.md:69` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Dazu gehören insbesondere:
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0841

- Quelle: `docs/responsive-templates.md:71` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Header, Navigation, mobile Navigation, aktiver Navigationszustand und Footer.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0842

- Quelle: `docs/responsive-templates.md:72` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Galerien, Bildvergrößerung und vorhandene Lightbox-Funktionen.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0843

- Quelle: `docs/responsive-templates.md:73` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Wiederkehrende Buttons, Karten, Infoboxen, Bild-/Text-Abschnitte und weitere gemeinsame Inhaltsbausteine.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0844

- Quelle: `docs/responsive-templates.md:74` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Gemeinsame Gestaltungsregeln für Typografie, Farben, Abstände, Inhaltsbreiten und responsive Layoutwechsel.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0845

- Quelle: `docs/responsive-templates.md:76` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Für jeden gemeinsamen Baustein gibt es eine maßgebliche Implementierung. Nicht nur Markup, sondern auch CSS und JavaScript werden zentral gepflegt. Bereits vorhandene gemeinsame Komponenten und Bildbetrachter zuerst prüfen, erweitern und weiterverwenden, statt daneben neue konkurrierende Lösungen anzulegen.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0846

- Quelle: `docs/responsive-templates.md:78` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Seitenspezifische Inhalte und Zustände – beispielsweise Bilder, Beschriftungen, Links, Sprache und aktiver Menüpunkt – werden als Daten oder klar definierte Einstellungen übergeben.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0847

- Quelle: `docs/responsive-templates.md:80` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bewusst benötigte Unterschiede werden als dokumentierte Komponentenvarianten abgebildet. Keine eigenen Navigationslösungen, Galerie-Skripte oder kopierten CSS-/Mobile-Regeln pro Seite.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0848

- Quelle: `docs/responsive-templates.md:82` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 4. Gemeinsame Komponenten statt kopierter Implementierungen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Automatisch erzeugte Ausgabedateien sind zulässig. Entscheidend ist, dass ihre gemeinsamen Bestandteile ausschließlich aus zentralen Quellen erzeugt werden, zuverlässig neu generiert werden können und nicht manuell in jeder Ausgabedatei gepflegt werden müssen.
- PKG-029-Einordnung: Originalblock und Einzelklauseln erneut geprüft. Planning Coverage: Sachpflichten durch oben genannte Story-AC und Originalwortlaut abgedeckt; Marker, Kontext und abhängige Fragmente nicht eigenständig gezählt. Implementation Verification: nicht geprüft.


## src-0849

- Quelle: `docs/responsive-templates.md:88` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / Gemeinsame Galerie-Komponente
- Anwendung: ST-WEB-01, ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: Alle öffentlichen Inhaltsgalerien einschließlich der Kajak-Referenz werden aus einer zentralen Galeriequelle erzeugt oder eingebunden. Ihre seitenspezifischen Inhalte sind Bildfolge, Alternativtexte, Bildunterschriften, Überschrift und Einleitung. Markup, Raster, responsive Styles und Interaktionen stammen aus derselben Komponente. Der gemeinsame `photo-viewer.js` zeigt in der Vollansicht das freigegebene, vollständige Webbild. Die Designwerte und die Pflicht zur Galerie beziehungsweise eine ausdrücklich genehmigte Ausnahme stehen im [Design Guide](design-guide.md); Bild- und Originalschutz sowie die vollständige Prüfmatrix in Abschnitt 6.1 des [Gesamtauftrags](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md). Gemeinsame Symbolgrafiken müssen auch unter der produktiven Content-Security- Policy sichtbar sein. Die Lupe wird deshalb als gleichursprüngliche Datei ausgeliefert; ein rein lokal funktionierendes `data:`-Bild gilt nicht als abgenommen. Der Live-Browserlauf prüft CSP-Fehler und Galerieansichten.

- BATCH-001 / PKG-030: historischer Reviewbefund vor COVERAGE-R1-004; aktuelle Planning Coverage: Covered durch die konkreten Story-AC. Implementation Verification, Freigaben und Live-Stand: ungeprüft.
- COVERAGE-R1-004 / aktueller Zielabgleich: Konkrete Galerie-, Viewer-, Bildschutz-, Design- und CSP-AC stehen in diesen fünf Stories; tatsächlicher Seiten-, Bild- und Live-Nachweis bleibt offen. Planning Coverage ist von Implementation Verification getrennt.

## src-0850

- Quelle: `docs/responsive-templates.md:103` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / Gemeinsame Galerie-Komponente
- Anwendung: ST-WEB-01, ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: Das gemeinsame Website-Grundlayout und die inhaltlichen Seitentypen sind zu trennen. Das Grundlayout beziehungsweise seine Bausteine verwalten gemeinsame Gestaltung, Header, Navigation, Footer und die Einbindung gemeinsamer Styles und Funktionen. Die Ausnahme für das eigenständige Startseitenlayout bleibt dabei verbindlich.

- BATCH-001 / PKG-030: historischer Reviewbefund vor COVERAGE-R1-004; aktuelle Planning Coverage: Covered durch die konkreten Story-AC. Implementation Verification, Freigaben und Live-Stand: ungeprüft.
- COVERAGE-R1-004 / aktueller Zielabgleich: Grundlayout und Seitentypen werden getrennt geprüft; gemeinsame Bausteine und eigenständige Startseite sind ausdrücklich erfasst. Planning Coverage ist von Implementation Verification getrennt.

## src-0851

- Quelle: `docs/responsive-templates.md:107` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.1 Kajak-/Aktivitäts-/Themenseiten-Template
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Leite dieses Template aus der bestehenden Kajak-Seite ab. Die Kajak-Seite selbst und weitere passende Aktivitäts- oder Themenseiten verwenden danach dieselbe Template-Implementierung.

- BATCH-001 / PKG-030: historischer Reviewbefund vor COVERAGE-R1-004; aktuelle Planning Coverage: Covered durch die konkreten Story-AC. Implementation Verification, Freigaben und Live-Stand: ungeprüft.
- COVERAGE-R1-004 / aktueller Zielabgleich: Kajak selbst und passende Folgeseiten nutzen dieselbe aus der bestehenden Kajakseite abgeleitete Implementierung; Umsetzung offen. Planning Coverage ist von Implementation Verification getrennt.

## src-0852

- Quelle: `docs/responsive-templates.md:109` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.1 Kajak-/Aktivitäts-/Themenseiten-Template
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Der Aufbau muss mit anderen Inhalten nutzbar sein, ohne Layout oder Funktionen neu zu programmieren und ohne die vollständige Kajak-Seite zu kopieren.

- BATCH-001 / PKG-030: historischer Reviewbefund vor COVERAGE-R1-004; aktuelle Planning Coverage: Covered durch die konkreten Story-AC. Implementation Verification, Freigaben und Live-Stand: ungeprüft.
- COVERAGE-R1-004 / aktueller Zielabgleich: Anderer Inhalt ohne neue Layout-/Funktionsprogrammierung und ohne vollständige Kajak-Kopie ist eigenes AC. Planning Coverage ist von Implementation Verification getrennt.

## src-0853

- Quelle: `docs/responsive-templates.md:113` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.2 Fahrzeugseiten-Template
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Überführe den passenden Aufbau der vorhandenen Fahrzeug-Seite in ein wiederverwendbares Fahrzeug-Template. Gemeinsame Gestaltung und Komponenten kommen aus derselben zentralen Grundlage wie bei der Kajak-Seite.

- BATCH-001 / PKG-030: historischer Reviewbefund vor COVERAGE-R1-004; aktuelle Planning Coverage: Covered durch die konkreten Story-AC. Implementation Verification, Freigaben und Live-Stand: ungeprüft.
- COVERAGE-R1-004 / aktueller Zielabgleich: Fahrzeug-Template aus passendem Bestand und derselben zentralen Kajak-Grundlage ist eigenes AC. Planning Coverage ist von Implementation Verification getrennt.

## src-0854

- Quelle: `docs/responsive-templates.md:115` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.2 Fahrzeugseiten-Template
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Inhalte und optionale Abschnitte werden pro Fahrzeug konfiguriert. Neue Fahrzeugseiten dürfen keine Kopien der gesamten bestehenden Fahrzeugseite benötigen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0854; Anwendung: ST-WEB-02. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0855

- Quelle: `docs/responsive-templates.md:119` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.3 Reisebericht-Template
- Anwendung: ST-WEB-04
- Verbindlicher Originalwortlaut: Erstelle beziehungsweise konsolidiere eine wiederverwendbare Struktur für Reiseberichte. Bestehende passende Generatoren oder Templates sind zuerst zu prüfen und weiterzuverwenden.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0855; Anwendung: ST-WEB-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-04; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0856

- Quelle: `docs/responsive-templates.md:121` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.3 Reisebericht-Template
- Anwendung: ST-WEB-04
- Verbindlicher Originalwortlaut: Texte, Bilder, Galerien und bereits vorhandene weitere Berichtselemente werden pro Reisebericht als Inhalt eingebunden. Der Bericht muss ausreichend flexibel bleiben, ohne individuelle Layoutkopien zu erzeugen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0856; Anwendung: ST-WEB-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-04; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0857

- Quelle: `docs/responsive-templates.md:125` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.4 Optionale Abschnitte und weitere Unterseiten
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Nicht jede Seite muss alle möglichen Abschnitte enthalten. Fehlende optionale Inhalte dürfen keine leeren Blöcke, unnötigen Überschriften oder falschen Abstände erzeugen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0857; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04,ST-WEB-05; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0858

- Quelle: `docs/responsive-templates.md:127` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.4 Optionale Abschnitte und weitere Unterseiten
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Weitere bestehende öffentliche Unterseiten, etwa Übersichtsseiten, werden sinnvoll in die gemeinsame Komponentenarchitektur eingeordnet. Keine Seite in ein inhaltlich unpassendes Detailseiten-Template zwingen. Die Startseite bleibt ausdrücklich ausgenommen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0858; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0859

- Quelle: `docs/responsive-templates.md:129` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.4 Optionale Abschnitte und weitere Unterseiten
- Anwendung: ST-WEB-01,ST-WEB-03
- Verbindlicher Originalwortlaut: **Navigation ohne unnötige Zwischenseiten (Nutzerentscheidung 24. September 2026):** Wenn konkrete Unterseiten bestehen, verlinkt der gemeinsame öffentliche Navigationsbaustein diese direkt. Eine zusätzliche Übersichtsseite wird nur bei ausdrücklichem Nutzerauftrag als Navigationsziel geführt. Nach der ergänzenden Nutzerentscheidung vom 24. September 2026 werden die bisherigen Ausrüstungs- und Radübersichten nicht mehr als Inhalte ausgeliefert und intern nicht mehr verlinkt. Die alten Adressen leiten zur Startseite weiter; eine Weiterleitung ist keine Übersichtsseite. Auch eine nicht vorhandene öffentliche `.html`-Seite leitet im lokalen und produktiven Seitenrouter zur Startseite; fehlende Bilder, Skripte, geschützte Bereiche und API-Routen bleiben erkennbare Fehler statt scheinbarer Startseiten-Antworten.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0859; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0859.a` und `SRC-0859.b` sind Fragmente; vollständige Klausel `SRC-0859.a1` in der atomaren Matrix.

- BATCH-001 Atomarität: `SRC-0859.d` und `SRC-0859.e` sind Fragmente; vollständige Klausel `SRC-0859.d1` in der atomaren Matrix.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-01,ST-WEB-03; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0860

- Quelle: `docs/responsive-templates.md:142` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 5. Gemeinsames Grundlayout und wiederverwendbare Seitentemplates / 5.4 Optionale Abschnitte und weitere Unterseiten
- Anwendung: ST-WEB-05,ST-WEB-03
- Verbindlicher Originalwortlaut: **Ausrüstungs-Detailseiten:** Das vollständige Scott-Radprofil verwendet die Kajak-/Aktivitäts-Hero- und Galerie-Bausteine und muss auch in Typografie, Abschnittsrhythmus, Bild-Text-Paaren und responsivem Verhalten gegen die Kajak-Referenz geprüft werden. Die vier unvollständigen Radprofile bleiben nach erneuter Nutzerentscheidung vom 24. September 2026 vorläufig bei der freigegebenen Poster-Ausnahme, bis Bilder und Erfahrungsinhalte vorliegen. Ein gemeinsamer Renderer allein ist kein Nachweis visueller Übereinstimmung. Auch redaktionelle Textlinks in Einleitungen und Bild-Text-Abschnitten beziehen Farbe, Unterstreichung, Unterstreichungsabstand und Fokusmarke aus `detail-editorial.css`. Ein seitenspezifischer Linkstil für fertige Ausrüstungsprofile ist nicht zulässig. Der Browser-Abgleich prüft die berechneten Stile auf Kajak und Scott in allen Referenzbreiten.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0860; Anwendung: ST-WEB-05,ST-WEB-03. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0860.b` und `SRC-0860.c` sind Fragmente; vollständige Klausel `SRC-0860.b1` in der atomaren Matrix.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-05,ST-WEB-03; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0861

- Quelle: `docs/responsive-templates.md:157` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Der gesamte Auftrag gilt gleichermaßen für Desktop, Tablet und Smartphone. Es reicht nicht, nur die Desktop-Ansicht zu vereinheitlichen und mobile Sonderimplementierungen bestehen zu lassen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0861; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04,ST-WEB-05; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0862

- Quelle: `docs/responsive-templates.md:159` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Aktuell bestehende unbeabsichtigte Unterschiede zwischen den mobilen Unterseiten müssen untersucht und bereinigt werden. Sie dürfen nicht einfach in neue Templates übernommen werden.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0862; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04,ST-WEB-05; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0863

- Quelle: `docs/responsive-templates.md:161` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Es soll eine zentral gepflegte responsive Website entstehen, keine unabhängig voneinander gepflegte Desktop- und Mobilversion. Jede Komponente und jedes Seitentemplate enthält die zugehörigen Regeln für die relevanten Bildschirmgrößen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0863; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-005 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04,ST-WEB-05; frühere PKG-030-Fragen sind technische Vorbefunde. Implementation Verification, Freigaben und Live-Verifikation bleiben offen.

## src-0864

- Quelle: `docs/responsive-templates.md:163` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Zentral zu vereinheitlichen sind insbesondere:

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0864; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0865

- Quelle: `docs/responsive-templates.md:165` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-01,ST-WEB-03
- Verbindlicher Originalwortlaut: - Header und mobile Navigation: Logo-Darstellung, Abstände, Menübutton, Menüansicht, aktive Menüpunkte, Öffnen, Schließen und Scrollverhalten.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0865; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-01,ST-WEB-03; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0866

- Quelle: `docs/responsive-templates.md:166` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Inhaltsdarstellung: Seitenränder, Typografie, Überschriften, Abschnittsabstände, Bilddarstellung und Übergang von mehrspaltigen zu einspaltigen Bereichen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0866; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0867

- Quelle: `docs/responsive-templates.md:167` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Interaktive Elemente: Buttons, Karten, Galerien und Bildvergrößerung einschließlich vorhandener Touch- und gegebenenfalls Swipe-Funktionen.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0867; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0868

- Quelle: `docs/responsive-templates.md:168` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Responsive Umschaltpunkte und komponentenbezogene Regeln, ohne separate CSS-Kopien je Seite.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0868; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0869

- Quelle: `docs/responsive-templates.md:170` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: **Definition von Einheitlichkeit:** Bei gleicher Bildschirmbreite, gleicher ausdrücklich definierten Variante und gleichem Zustand müssen gemeinsame Komponenten gleich gestaltet sein und gleich funktionieren. Ihre jeweiligen Inhalte dürfen unterschiedlich sein. Unterschiedliche Textlängen oder Inhalte bedeuten nicht, dass jede Seite eine identische Gesamthöhe haben muss.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0869; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0870

- Quelle: `docs/responsive-templates.md:172` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die Fahrzeug-, Kajak-/Aktivitäts- und Reisebericht-Templates dürfen sich in ihrem inhaltlichen Aufbau unterscheiden. Derselbe gemeinsam verwendete Baustein darf aber nicht allein wegen des Seitentyps anders aussehen oder funktionieren.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0870; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0871

- Quelle: `docs/responsive-templates.md:174` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 6. Responsive Vereinheitlichung ist verbindlicher Bestandteil
- Anwendung: ST-WEB-01
- Verbindlicher Originalwortlaut: Die Startseite erhält keine erzwungene Angleichung, auch nicht auf Mobilgeräten.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0871; Anwendung: ST-WEB-02,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0872

- Quelle: `docs/responsive-templates.md:178` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 7. Inhalte von Darstellung und Funktion trennen
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Titel, Texte, Bilder, Bildunterschriften, Galerien, technische Daten, Links und SEO-Metadaten werden getrennt von der gemeinsamen Darstellung gepflegt.

- BATCH-001 / PKG-030: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0872; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0873

- Quelle: `docs/responsive-templates.md:180` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 7. Inhalte von Darstellung und Funktion trennen
- Anwendung: ST-WEB-02,ST-WEB-04
- Verbindlicher Originalwortlaut: Nutze die zum bestehenden Projekt passende Datenhaltung und Bearbeitungsweise. Vorhandene redaktionelle Arbeitsabläufe und maßgebliche Datenquellen bleiben erhalten. Kein unnötiges zweites Inhaltssystem einführen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0873; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-04; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0874

- Quelle: `docs/responsive-templates.md:182` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 7. Inhalte von Darstellung und Funktion trennen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Neue Seiten entstehen durch Auswahl eines Seitentyps und Eingabe der Inhalte. Globale Designänderungen erfolgen zentral; Änderungen am Inhalt einer einzelnen Seite bleiben auf diese Seite beschränkt.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0874; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0875

- Quelle: `docs/responsive-templates.md:184` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 7. Inhalte von Darstellung und Funktion trennen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04
- Verbindlicher Originalwortlaut: Bestehende Sprachversionen und die Sprachumschaltung müssen erhalten bleiben. Gemeinsam verwendete Komponenten und Templates dürfen keine getrennt gepflegten Designkopien für Deutsch und Englisch erfordern.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0875; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-006 / aktueller Zielabgleich: Planning Coverage Covered durch die konkreten AC von ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04; der frühere PKG-030/031-Befund bleibt historischer Reviewkontext. Implementation Verification, Design-/Bildfreigaben, Release und Live-Verifikation bleiben getrennt offen.

## src-0876

- Quelle: `docs/responsive-templates.md:188` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: Erstelle nicht nur Komponenten und Templates für spätere Seiten, sondern stelle die vorhandenen passenden Unterseiten auf die gemeinsame Grundlage um.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0876; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0877

- Quelle: `docs/responsive-templates.md:190` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Arbeitsreihenfolge:

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0877; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0878

- Quelle: `docs/responsive-templates.md:192` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: 1. Aktuelle Projektregeln, Architektur, Seiten, Generatoren, Styles und Skripte prüfen; Referenzzustände von Kajak-Seite und Startseite sichern.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0878; Anwendung: ST-WEB-02. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0879

- Quelle: `docs/responsive-templates.md:193` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-04
- Verbindlicher Originalwortlaut: 2. Gemeinsame Bausteine sowie sinnvolle Strukturunterschiede und unbeabsichtigte Abweichungen identifizieren.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0879; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-04 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0880

- Quelle: `docs/responsive-templates.md:194` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-04
- Verbindlicher Originalwortlaut: 3. Zentrale Gestaltung, Komponenten und Seitentemplates ableiten; den vorgesehenen Aufbau kurz dokumentieren.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0880; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-04 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0881

- Quelle: `docs/responsive-templates.md:195` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: 4. Kajak-Seite als Referenz migrieren und vergleichen; anschließend Fahrzeugseite, Reiseberichte und weitere passende Unterseiten umstellen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0881; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-04, ST-WEB-05 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0882

- Quelle: `docs/responsive-templates.md:196` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: 5. Unbenötigte Parallelimplementierungen nach erfolgreicher Umstellung entfernen und vollständige Prüfungen durchführen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0882; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0883

- Quelle: `docs/responsive-templates.md:198` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: Bestehende Inhalte, Bilder, URLs, relevante Anker, interne Links, SEO-Metadaten und Funktionen erhalten. Keine Texte umschreiben oder Inhalte entfernen, nur damit sie in ein Template passen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0883; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0884

- Quelle: `docs/responsive-templates.md:200` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 8. Bestehende Seiten tatsächlich migrieren
- Anwendung: ST-WEB-02, ST-WEB-04
- Verbindlicher Originalwortlaut: Nach Möglichkeit auf der vorhandenen technischen Grundlage aufbauen. Ein Framework-Wechsel ist nicht automatisch Teil dieses Auftrags. Sollte eine grundlegende Architekturänderung tatsächlich notwendig sein, den konkreten Bedarf und die Auswirkungen vor einem solchen Wechsel offenlegen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0884; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-02, ST-WEB-04 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0885

- Quelle: `docs/responsive-templates.md:204` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Die Umstellung ist erst abgeschlossen, wenn die betroffenen bestehenden Seiten und die geschützte Startseite geprüft sind. Fehlende Prüfungen müssen ausdrücklich als offen ausgewiesen werden.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0885; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-03 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0886

- Quelle: `docs/responsive-templates.md:208` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Prüfe repräsentative Ansichten beispielsweise bei 360, 390, 768, 1024 und 1440 CSS-Pixeln sowie die Übergänge zwischen den Layouts. Diese Werte sind Testgrößen, keine Vorgabe für die technische Festlegung der Umschaltpunkte.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0886; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-007 / aktueller Zielabgleich: Die konkreten AC in ST-WEB-03 decken die Planung dieses Originalblocks; Nummernmarker sind nur Reihenfolgekontext. Implementation Verification, Freigaben und Live-Verifikation bleiben getrennt offen.

## src-0887

- Quelle: `docs/responsive-templates.md:210` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Prüfe insbesondere:

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0887; Anwendung: ST-WEB-03. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0888

- Quelle: `docs/responsive-templates.md:212` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Kajak-, Fahrzeug- und Reiseberichtseiten sowie weitere migrierte Unterseiten.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0888; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Aktualisierte Routenliste und Einzelprotokoll schließen weitere tatsächlich migrierte Unterseiten ein. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0889

- Quelle: `docs/responsive-templates.md:213` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Startseite auf unveränderten Aufbau, Look and Feel und Funktionen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0889; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Startseite: Aufbau, Look and Feel und Funktionen gegen gesicherte Vorher-Referenz prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0890

- Quelle: `docs/responsive-templates.md:214` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Mobile Menüs, aktive Navigationszustände, Links und Sprachumschaltung.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0890; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Mobile Menüs, aktive Zustände, Links und Sprachumschaltung als getrennte Prüffälle je betroffener Route/Sprache. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0891

- Quelle: `docs/responsive-templates.md:215` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-01, ST-WEB-03
- Verbindlicher Originalwortlaut: - Galerien, Bildvergrößerung, Schließen, Tastaturbedienung und vorhandene Touch-Funktionen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0891; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Galerie, Vergrößerung, Schließen, Tastatur und nur vorhandene Touch-Funktionen einzeln prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0892

- Quelle: `docs/responsive-templates.md:216` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Hoch- und Querformat sowie kurze, lange und fehlende optionale Inhalte.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0892; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Hoch-/Querformat und kurze, lange sowie fehlende optionale Inhalte getrennt prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0893

- Quelle: `docs/responsive-templates.md:217` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Unbeabsichtigtes horizontales Scrollen, abgeschnittene Inhalte, Überlagerungen und unbedienbare Elemente.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0893; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Horizontalen Überlauf, Beschnitt, Überlagerungen und unbedienbare Elemente getrennt prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0894

- Quelle: `docs/responsive-templates.md:219` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.1 Darstellung und Bedienung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Nutze reproduzierbare visuelle und funktionale Prüfungen passend zur vorhandenen Testumgebung. Zwischen Browser-Emulation und Tests auf tatsächlichen Geräten unterscheiden; keine Geräteprüfung behaupten, die nicht durchgeführt wurde.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0894; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Reproduzierbare visuelle/funktionale Prüfung mit Umgebung und Beleg; Emulation und echte Geräte unterscheiden, keine unbelegte Gerätebehauptung. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0895

- Quelle: `docs/responsive-templates.md:223` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Der wichtigste Abnahmetest lautet:

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0895; Anwendung: ST-WEB-03. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0896

- Quelle: `docs/responsive-templates.md:225` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Eine Änderung an der zentralen Navigation erscheint auf sämtlichen betroffenen Seiten ohne manuelle Einzeländerungen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0896; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Kontrollierte Navigationsänderung auf sämtlichen betroffenen Seiten ohne Einzelpflege prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0897

- Quelle: `docs/responsive-templates.md:226` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-01, ST-WEB-03
- Verbindlicher Originalwortlaut: - Eine Änderung an der zentralen Galerie gilt für alle Instanzen dieser Galerie.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0897; Anwendung: ST-WEB-01,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Kontrollierte Galerieänderung auf allen Instanzen ohne Einzelpflege prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0898

- Quelle: `docs/responsive-templates.md:227` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Eine Änderung an einem Seitentemplate wird von allen Seiten dieses Typs übernommen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0898; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. COVERAGE-R1-008: Kontrollierte Templateänderung auf allen Seiten jedes betroffenen Typs ohne Einzelpflege prüfen. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0899

- Quelle: `docs/responsive-templates.md:228` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: - Dasselbe gilt ausdrücklich für mobile Navigation, mobile Galerie und mobile Template-Layouts.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0899; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0900

- Quelle: `docs/responsive-templates.md:229` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Die Startseite behält dabei ihre ausdrücklich geschützte Gestaltung beziehungsweise ihre definierte Komponentenvariante.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0900; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0901

- Quelle: `docs/responsive-templates.md:231` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.2 Zentrale Änderungswirkung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Diese Wirkung muss durch die tatsächliche Nutzung gemeinsamer Quellen nachgewiesen sein, nicht nur durch momentan ähnlich aussehende Kopien.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0901; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0902

- Quelle: `docs/responsive-templates.md:235` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 9. Prüfung und Abnahmekriterien / 9.3 Neue Seiten
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04
- Verbindlicher Originalwortlaut: Dokumentiere und überprüfe, wie eine weitere Aktivitätsseite, Fahrzeugseite und ein weiterer Reisebericht aus dem jeweiligen Template mit neuen Inhalten entstehen. Dafür keine erfundenen öffentlichen Beispielseiten veröffentlichen; Beispiele können als Testdaten oder Dokumentation dienen.

- BATCH-001 / PKG-031: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0902; Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0903

- Quelle: `docs/responsive-templates.md:239` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Dieser Auftrag darf nicht nur als Chatnachricht oder Erinnerung bestehen bleiben.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0903; Anwendung: projektweit. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0904

- Quelle: `docs/responsive-templates.md:241` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Lies vor Änderungen die aktuelle `AGENTS.md`, gegebenenfalls weitere für die betroffenen Verzeichnisse geltende Arbeitsregeln, die `README.md` und die relevanten Projektunterlagen.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0904; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0905

- Quelle: `docs/responsive-templates.md:243` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Diese vollständige Spezifikation ist in `docs/responsive-templates.md` maßgeblich. Falls bereits eine inhaltlich entsprechende maßgebliche Spezifikation existiert, konsolidiere die Anforderungen dort und verwende überall denselben Verweis. Keine widersprüchlichen Parallelfassungen anlegen.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0905; Anwendung: projektweit. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0906

- Quelle: `docs/responsive-templates.md:245` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Geeigneter Regeltext für die bestehende `AGENTS.md`:

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0906; Anwendung: projektweit. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0907

- Quelle: `docs/responsive-templates.md:247` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: > Öffentliche Unterseiten verwenden zentrale responsive Komponenten und die vorgesehenen wiederverwendbaren Kajak-/Aktivitäts-, Fahrzeug- und Reisebericht-Templates. Gemeinsames Markup, CSS und Verhalten dürfen nicht pro Seite kopiert oder separat gepflegt werden. Die aktuelle Kajak-Seite ist die Gestaltungsreferenz. Die Regeln gelten auf Desktop, Tablet und Smartphone. Die Startseite behält ihr eigenständiges Layout und ihre bisherige Darstellung und Funktion auf allen Bildschirmgrößen; gemeinsame Komponenten dürfen sie nicht unbeabsichtigt verändern. Seitenspezifische Unterschiede werden über Inhalte, Konfiguration oder ausdrücklich definierte Varianten umgesetzt. Vor relevanten Änderungen die vollständige Spezifikation in `docs/responsive-templates.md` lesen und die dortigen Abnahmekriterien anwenden.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0907; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0908

- Quelle: `docs/responsive-templates.md:249` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: projektweit
- Verbindlicher Originalwortlaut: Den Auftrag und seinen tatsächlichen Fortschritt im bestehenden `docs/ausbauplan.md` verankern. Weitere tatsächlich betroffene Plan- oder Statusdokumente entsprechend den vorhandenen Projektregeln konsistent aktualisieren. Dokumentiert, implementiert, geprüft und live verifiziert nicht miteinander gleichsetzen.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0908; Anwendung: projektweit. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0909

- Quelle: `docs/responsive-templates.md:251` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 10. Dauerhafte Verankerung im Repository
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Bestehende Projektregeln zu Fotos, Originaldateien, Sicherheit, Datenhaltung und Veröffentlichung bleiben wirksam. Diese technische Konsolidierung ist kein Auftrag, neue Bilder zu bearbeiten oder Bildarchive zu verändern.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0909; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05,ST-PHOTO-01. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.
- COVERAGE-R1-009: Konkrete Planungs-AC in `scrum-plan.md` (projektweite Gates bzw. ST-WEB-03); zugeordnete Story-AC in `story-catalog.json`. Implementation Verification, Freigaben und Live-Stand bleiben ungeprüft.
## src-0910

- Quelle: `docs/responsive-templates.md:255` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Die technische Umsetzung erfolgt im bestehenden Website-Arbeitsablauf. Beachte die aktuellen Projektregeln für Tests, Veröffentlichung, Live-Verifikation und das Schließen verwendeter Remote-Sitzungen. Ein fehlgeschlagener Test oder fehlender erforderlicher Zugriff ist konkret auszuweisen; keinen erfolgreichen Rollout behaupten.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0910; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0911

- Quelle: `docs/responsive-templates.md:257` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-02
- Verbindlicher Originalwortlaut: Zum Abschluss angeben:

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0911; Anwendung: ST-WEB-03. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0912

- Quelle: `docs/responsive-templates.md:259` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: - Welche gemeinsamen Komponenten und Seitentemplates existieren und welche bestehenden Seiten sie tatsächlich verwenden.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0912; Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0913

- Quelle: `docs/responsive-templates.md:260` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-01, ST-WEB-03
- Verbindlicher Originalwortlaut: - Wo globale Gestaltung, Navigation, Galeriefunktionen und einzelne Seiteninhalte gepflegt werden.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0913; Anwendung: ST-WEB-01. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0914

- Quelle: `docs/responsive-templates.md:261` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04
- Verbindlicher Originalwortlaut: - Wie neue Seiten der drei Seitentypen erstellt werden.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0914; Anwendung: ST-WEB-02,ST-WEB-04. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0915

- Quelle: `docs/responsive-templates.md:262` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Welche Desktop-, Tablet- und Mobilprüfungen durchgeführt wurden und mit welchem Ergebnis.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0915; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0916

- Quelle: `docs/responsive-templates.md:263` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-01, ST-WEB-02, ST-WEB-03
- Verbindlicher Originalwortlaut: - Ob die Startseite und die Kajak-Referenz unverändert erhalten geblieben sind; unvermeidbare oder offene Abweichungen konkret nennen.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0916; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0917

- Quelle: `docs/responsive-templates.md:264` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: - Welche Änderungen nur vorbereitet, im Repository gesichert oder bereits live verifiziert sind und welche Restarbeiten bestehen.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0917; Anwendung: ST-WEB-03. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0918

- Quelle: `docs/responsive-templates.md:266` · vanventure.at – Verbindlicher Auftrag für zentrale Komponenten und responsive Seitentemplates / 11. Abschluss und Veröffentlichung
- Anwendung: ST-WEB-01, ST-WEB-02, ST-WEB-03, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: **Gesamtleitlinie:** Eine gemeinsame Designsprache, zentrale responsive Bausteine und wiederverwendbare Seitentemplates für die Unterseiten – auf Desktop, Tablet und Smartphone. Die Startseite bleibt eigenständig. Einmal zentral ändern, auf allen betroffenen Seiten übernehmen, ohne manuelle Einzelpflege.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0918; Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0919

- Quelle: `docs/riverstar/entwurf.md:3` · Riverstar – Entwurf 04
- Anwendung: projektweite Planpflege; keine Produkt-Story
- Verbindlicher Originalwortlaut: Dieser Entwurf ist eine redaktionelle Referenz, kein eigener Arbeitsplan. Verbindliche offene und erledigte Punkte stehen ausschließlich im [Gesamtplan](../ausbauplan.md).

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0919; Anwendung: projektweit. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0920

- Quelle: `docs/riverstar/entwurf.md:7` · Riverstar – Entwurf 04
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Stand: 20. September 2026. Ansicht: [riverstar-entwurf.html](../../riverstar-entwurf.html).

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0920; Anwendung: ST-CON-04. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0920.a` und `SRC-0920.b` sind Fragmente; vollständige Klausel `SRC-0920.a1` in der atomaren Matrix.

## src-0921

- Quelle: `docs/riverstar/entwurf.md:9` · Riverstar – Entwurf 04
- Anwendung: ST-WEB-01 (historische Referenz), ST-PHOTO-01 (Herkunft)
- Verbindlicher Originalwortlaut: **Live-Aufmacher:** Die öffentliche Kajak-Seite verwendet `P7020092.jpg` als gespiegeltes Reviewderivat. Das Boot liegt dadurch rechts; links sorgt der standardisierte, helle Farbverlauf für den Seitentitel und die Einleitung. Quelle, unveränderte Projektkopie und Hash stehen in [bildquellen.json](bildquellen.json).

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0921; Anwendung: ST-WEB-01,ST-PHOTO-01. Planning Coverage: Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-010: Aktuelle Quelle und konkrete Ziel-AC im Scrum-Entwurf abgeglichen; nur Planung gedeckt, keine aktuelle Implementierungs-, Bildfreigabe- oder Live-Aussage.

## src-0922

- Quelle: `docs/riverstar/entwurf.md:17` · Riverstar – Entwurf 04 / Redaktionelle Richtung
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: „Am Ufer hört unsere Reise nicht auf.“ Ein persönlicher Einstieg mit großem Originalfoto, drei Vorteile für Reisen mit dem Van, eine kurze eigene Reiseerinnerung, eigenständig formulierte Hinweise zu Fahreigenschaften, Packen und Transport und die tatsächlich genutzte Ausstattung. Naturfarben und großzügige Bilder passen zum bestehenden Auftritt. Die Vorschau ist deutschsprachig; die englische Fassung folgt bei der Übernahme der abgestimmten Inhalte in die zweisprachige Startseite.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0922; Anwendung: ST-CON-04,ST-WEB-01. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Redaktioneller Übernahme-Slice: Einstiegssatz, persönliches Originalfoto, drei Van-Reisevorteile, eigene Erinnerung, Fahr-/Pack-/Transporthinweise und tatsächlich genutzte Ausstattung sind einzeln in ST-CON-04 prüfbar. Naturfarben/große Bilder und DE/noindex sind datierte Vorschau-Merkmale, keine neue Design- oder dauerhafte Sprachregel. EN für die Startseite bleibt eine offene Nutzerentscheidung; öffentliche Kajak-EN-Pflicht bleibt bestehen.

## src-0923

- Quelle: `docs/riverstar/entwurf.md:19` · Riverstar – Entwurf 04 / Redaktionelle Richtung
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die bestehende Sektion in index.html bleibt bis zur Abstimmung erhalten. Keine Veröffentlichung vorgenommen. Die eigene Vorschau ist mit noindex gekennzeichnet.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0923; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Historischer Entwurfsstatus: bestehende index.html-Sektion blieb bis Abstimmung, damals keine Veröffentlichung, eigene Vorschau noindex. Eine neue Startseitenänderung braucht die konkrete Abstimmung; kein dauerhaftes Publikationsverbot und keine SEO-Regel für die öffentliche Kajakseite.

## src-0924

- Quelle: `docs/riverstar/entwurf.md:23` · Riverstar – Entwurf 04 / Bildauswahl
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: 1. **DSC_1545.jpg:** Aufmacher. Boot gut erkennbar, mit Mensch am Ufer und viel Wasser und Landschaft. Quelle: norwegen/handy_sabine.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0924; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / DSC_1545.jpg war der Aufmacher des Entwurfs mit Boot, Mensch, Wasser und Landschaft (Kurzquelle norwegen/handy_sabine). Nicht mit dem späteren öffentlichen P7020092.jpg verwechseln; heutige Bildwahl und Freigabe offen.

## src-0925

- Quelle: `docs/riverstar/entwurf.md:24` · Riverstar – Entwurf 04 / Bildauswahl
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: 2. **DSC_1547.jpg:** Boot im Detail mit Julie am Bildrand. Quelle: norwegen/rudern. Der angeschnittene Mensch macht das Motiv als großes Titelbild weniger geeignet, als Detail erzählt es vom gemeinsamen Unterwegssein.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0925; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / DSC_1547.jpg war das Detailbild mit Julie am Rand (Kurzquelle norwegen/rudern); der Anschnitt sprach gegen einen großen Titel. Vor heutiger Verwendung Alter, nötige Anonymisierung und ausdrückliche Motivauswahl klären. Keine Freigabe aus der Entwurfswahl ableiten.

## src-0926

- Quelle: `docs/riverstar/entwurf.md:25` · Riverstar – Entwurf 04 / Bildauswahl
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: 3. **DSC_1514.jpg:** California am Campingplatz als Verbindung zwischen Van und Kajak. Quelle: norwegen/handy_sabine.

- BATCH-001 / PKG-032: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0926; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / DSC_1514.jpg verband im Entwurf California am Campingplatz mit dem Kajak (Kurzquelle norwegen/handy_sabine). Heutige Verwendung verlangt motivweisen Herkunfts-, Kennzeichen- und Variantencheck.

## src-0927

- Quelle: `docs/riverstar/entwurf.md:27` · Riverstar – Entwurf 04 / Bildauswahl
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die vollständigen Archivpfade, unveränderten Projektkopien und SHA-256-Prüfsummen stehen in [bildquellen.json](bildquellen.json). Die ausgewählten Kopien wurden gegen die Archivdateien geprüft. Webbilder wurden ausschließlich aus Projektkopien erzeugt, proportional verkleinert und als JPEG gespeichert. Kennzeichen im Camping-Webbild anonymisiert (Entwurf 04). Das Archiv blieb unverändert. Zusätzliche Sichtungskopien liegen unter reisebilder-originale/riverstar; ihre Herkunft ist in den Sichtungsmanifesten dokumentiert. DSC_1541.jpg und DSC_1546.jpg im Hauptordner stammen ebenfalls aus E:/_fotos_original/urlaubsSammlungen/norwegen/rudern.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0927; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Historischer Provenienznachweis: bildquellen.json enthält Archivpfade, unveränderte Kopien und SHA-256; damaliger Kopienvergleich, Ableitung aus Projektkopien, proportionale JPEG-Skalierung, Kennzeichenmaske nur des Camping-Webbilds und unverändertes Archiv bleiben auf Entwurf 04 begrenzt. Sichtungskopien unter reisebilder-originale/riverstar sind in Sichtungsmanifesten belegt. DSC_1541.jpg und DSC_1546.jpg stammen laut Entwurf jeweils aus E:/_fotos_original/urlaubsSammlungen/norwegen/rudern. Aktuelle Verwendung braucht erneute Nachweise je Motiv und Webvariante nach ST-PHOTO-01.

## src-0928

- Quelle: `docs/riverstar/entwurf.md:29` · Riverstar – Entwurf 04 / Bildauswahl
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die Zuordnung zu Norwegen folgt dem Archiv. Die genaue Bucht ist ungeklärt; die Bilder werden ausdrücklich nicht als Aurlandsfjord beschriftet.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0928; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Norwegen folgt der Archivzuordnung; die genaue Bucht bleibt ungeklärt. Solange sie nicht belegt ist, keine Aurlandsfjord-Beschriftung. Die gesonderte Ortsklärung in ST-CON-04 bleibt offen.

## src-0929

- Quelle: `docs/riverstar/entwurf.md:33` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche)
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Redaktionelle Vorgabe: Auf der Besucherseite keine fremden Erfahrungsberichte, Namen, Teststrecken oder ausgehenden Quellenlinks anzeigen. Erkenntnisse in eigenen sachlichen Formulierungen zusammenfassen, ohne fremde Erlebnisse als eigene auszugeben. Auch der Herstellerlink wurde aus der Vorschau entfernt; interne Links zu eigenen Reisen bleiben bestehen.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0929; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Besucherseite: keine fremden Berichte, Namen, Teststrecken oder ausgehenden Quellenlinks; fremde Erkenntnisse nur eigenständig und sachlich, nie als eigene Erfahrung. Herstellerlink war aus der Vorschau entfernt; interne Links zu eigenen Reisen bleiben. Quellenangaben in diesem Register sind interne Recherche.

## src-0930

- Quelle: `docs/riverstar/entwurf.md:37` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche) / Grabner – Hersteller, aktueller Riverstar 2026
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [Produktseite](https://www.grabner.com/shop/produkte/schlauchboote/kajaks/riverstar-1)

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0930; Anwendung: ST-CON-04. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0931

- Quelle: `docs/riverstar/entwurf.md:39` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche) / Grabner – Hersteller, aktueller Riverstar 2026
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Herstellerangaben: 500 × 90 cm, 28 kg, zwei Personen, 280 kg Zuladung, Packmaß 70 × 45 × 30 cm, vier Luftkammern, 0,3 bar, zwölf Minuten Aufbauzeit. Grabner betont Sitzkomfort, Beinfreiheit und Stabilität. Die Seite beschreibt den neuen Wavepiercer-Bug und veränderte Befestigungen. Diese Neuerungen gehören nicht in die Beschreibung des auf den Fotos von 2018 sichtbaren Bootes. Aufbauzeit ist eine Herstellerangabe, keine gemessene eigene Erfahrung. Kein aktueller Kaufpreis im Entwurf, da die persönliche Nutzung im Vordergrund steht.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0931; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Interne Herstellerrecherche zum Riverstar 2026: Maße 500 × 90 cm, Gewicht 28 kg, zwei Personen, Zuladung 280 kg, Packmaß 70 × 45 × 30 cm, vier Luftkammern, 0,3 bar, zwölf Minuten Aufbau sowie Komfort-/Beinfreiheits-/Stabilitätsaussagen. Wavepiercer-Bug und Befestigungsänderungen nicht dem 2018 fotografierten Boot zuschreiben; Aufbauzeit nicht als eigene Messung ausgeben. Kein aktueller Kaufpreis im persönlichen Entwurf.

## src-0932

- Quelle: `docs/riverstar/entwurf.md:43` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche) / 7globetrotters – persönliche Nutzung eines gekauften Bootes
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [460-km-Bericht](https://7globetrotters.de/grabner-riverstar-test), veröffentlicht 2021, aktualisiert 2024; Erfahrungen aus 2020. 460 Kilometer und 16 Paddeltage. Positiv: robuste Bootshaut, Stabilität, Geradeauslauf bei ruhigem Wasser und Nutzen des Steuers bei Wind. Einschränkungen: Gewicht beim Umtragen und begrenzter Platz für mehr als zwei Paddler. Bericht mit Affiliate-Links, kein standardisierter unabhängiger Labortest. Die Angaben zu dieser älteren Ausführung werden nicht auf das Modell 2026 übertragen.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0932; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-011 / Interne Fremdrecherche: 7globetrotters-Bericht von 2021, Update 2024, Erlebnisse aus 2020 mit 460 km/16 Paddeltagen. Positive Fremdbeobachtungen: Bootshaut, Stabilität, Geradeauslauf bei Ruhe, Steuer bei Wind; Grenzen: Umtragegewicht und Platz über zwei Personen. Affiliate-Links und kein unabhängiger standardisierter Labortest. Nicht als eigene Erfahrung oder Befund zum Modell 2026 verwenden.

## src-0933

- Quelle: `docs/riverstar/entwurf.md:47` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche) / Globetrotter – persönlicher Tourenbericht im Händlermagazin
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [Elbharmonie](https://www.globetrotter.de/magazin/elbharmonie/), online datiert 2. Oktober 2024; zugeordnet zu Magazin #18, Sommer 2020. Beschreibt Transport im Auto, mehrtägige Nutzung, Packen in kleine Beutel und Kursprobleme ohne montiertes Steuer. Keine belastbaren vergleichenden Leistungswerte; kommerzielles redaktionelles Umfeld. Dient intern als Recherchequelle für die Hinweise zu Packen und Steueranlage.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0933; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0933.a` und `SRC-0933.b` sind Fragmente; vollständige Klausel `SRC-0933.a1` in der atomaren Matrix.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Interner Elbharmonie-Tourenbericht: online 2.10.2024, Magazin #18/Sommer 2020; Auto-Transport, mehrtägige Nutzung, kleine Packbeutel und Kursprobleme ohne Steuer sind Fremderfahrungen. Kommerzielles redaktionelles Umfeld, keine belastbaren Vergleichswerte. Nur Recherche für Pack-/Steuerhinweise; öffentliche Prüfung in ST-CON-04, keine eigene Erfahrung oder Leistungsbehauptung.

## src-0934

- Quelle: `docs/riverstar/entwurf.md:51` · Riverstar – Entwurf 04 / Quellen und Einordnung (nur interne Recherche) / Weitere gefundene Quelle
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [ToBoFilm: Review zum Modell 2022](https://www.youtube.com/watch?v=C0XhUMuNQz8), 15. Juni 2022. Laut Videobeschreibung vier Wochen vom Hersteller bereitgestellt; außerdem Rabatt-/Affiliate-Verweise. Nur Beschreibung geprüft, Video nicht inhaltlich ausgewertet. Deshalb keine Leistungsbehauptung daraus in den Entwurf übernommen.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0934; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0934.a` und `SRC-0934.b` sind Fragmente; vollständige Klausel `SRC-0934.a1` in der atomaren Matrix.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Interne, begrenzt geprüfte ToBoFilm-Quelle zum Modell 2022 vom 15.6.2022. Vierwöchige Herstellerbereitstellung und Rabatt-/Affiliate-Verweise stammen nur aus der Beschreibung; das Video wurde nicht inhaltlich ausgewertet. Keine Leistungsbehauptung daraus im Entwurf oder ohne neue Prüfung im öffentlichen Text.

## src-0935

- Quelle: `docs/riverstar/entwurf.md:55` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Kauf vermutlich Frühjahr 2018, eventuell Sommer/Herbst 2017. Öffentlich daher „spätestens seit 2018“, kein behauptetes Baujahr.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0935; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Die unsichere Kaufzeit (vermutlich Frühjahr 2018, eventuell Sommer/Herbst 2017) erlaubt öffentlich nur „spätestens seit 2018“; kein behauptetes Baujahr. Textprüfung ST-CON-04, keine Ableitung aus Fotodatum.

## src-0936

- Quelle: `docs/riverstar/entwurf.md:56` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Großes Zubehörpaket direkt von Grabner. Historischer Paketname und vollständiger Lieferumfang sind nicht bestätigt.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0936; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Großes Zubehörpaket direkt von Grabner als persönliche Herkunftsangabe. Historischer Paketname und vollständiger Lieferumfang sind getrennt unbestätigt; keine Gleichsetzung mit heutigem Paket oder vollständiger Herstellerliste. Nur belegte eigene Ausstattung in ST-CON-04.

## src-0937

- Quelle: `docs/riverstar/entwurf.md:57` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Grabner-Hecktasche oben auf dem Boot, Zweier-Spritzdecke, Lenkanlage, ECKLA Foldy Bootswagen, Grabner-Schwimmwesten.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0937; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Fünf getrennte Ausstattungsangaben in ST-CON-04 prüfen: Grabner-Hecktasche oben auf dem Boot, Zweier-Spritzdecke, Lenkanlage, ECKLA Foldy Bootswagen, Grabner-Schwimmwesten. Persönliche Ausstattung, keine Behauptung eines vollständig bekannten historischen Pakets.

## src-0938

- Quelle: `docs/riverstar/entwurf.md:58` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Schnell aufgebaut, einfach zu verstauen, viel Stauraum und hohe Zuladung.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0938; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Vier getrennte persönliche Urteile in ST-CON-04: schneller Aufbau, einfaches Verstauen, viel Stauraum, hohe Zuladung. Keine unbelegte Zahl oder Herstellerangabe für das ältere Boot daraus machen.

## src-0939

- Quelle: `docs/riverstar/entwurf.md:59` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Persönliche Einschätzung: ausgesprochen kippstabil auch bei hohen Wellen, für ein Luftkajak sehr gute Spurtreue und hohes Tempo, extrem robust und langlebig durch Kautschukmaterial. Als persönliche Erfahrung formuliert, ohne allgemeine Sicherheitsgarantie oder erfundene Messwerte.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0939; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Persönliche Erfahrungen einzeln prüfen: Kippstabilität auch bei hohen Wellen, für ein Luftkajak sehr gute Spurtreue, hohes Tempo, Robustheit und Langlebigkeit durch Kautschukmaterial. Jeder öffentlichen Teilaussage den persönlichen Rahmen zuordnen; keine allgemeine Sicherheitsgarantie oder erfundene Messwerte.

## src-0940

- Quelle: `docs/riverstar/entwurf.md:60` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Schwimmwesten weniger überzeugend; konkrete Ursache noch offen.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0940; Anwendung: ST-CON-04. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Entscheidung: Ursache der Schwimmwestenkritik ungeklärt; keine Text- oder Veröffentlichungsfreigabe daraus.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: „Weniger überzeugend“ ist ein bisheriger persönlicher Entwurfsbefund. Ursache und öffentliche Übernahme sind echte offene Nutzerentscheidungen: Was genau war an den Grabner-Schwimmwesten weniger überzeugend, und soll diese Kritik so in den öffentlichen Bericht? Keine Ursache ergänzen oder Veröffentlichungsfreigabe unterstellen.

## src-0941

- Quelle: `docs/riverstar/entwurf.md:61` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Nutzer bestätigt: zwei Erwachsene plus ein Kind/Jugendlicher. Im Text als eigene Nutzungseinschätzung, nicht als Herstellerfreigabe.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0941; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Bestätigte Nutzung mit zwei Erwachsenen plus Kind/Jugendlichem nur als eigene Nutzungseinschätzung in ST-CON-04. Keine Herstellerfreigabe und keine historische Kapazitätsbehauptung; heutige Zweierangabe aus SRC-0931 belegt sie nicht.

## src-0942

- Quelle: `docs/riverstar/entwurf.md:63` · Riverstar – Entwurf 04 / Persönliche Angaben des Nutzers – eingearbeitet
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die bisherige Datentabelle zum Modell 2026 wurde durch eure echte Ausstattung ersetzt. Damit vermischt der Entwurf keine aktuellen Modellmerkmale mit dem älteren Boot.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0942; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-012 / Quellenrolle und konkrete Zielgrenze: Der Ersatz der 2026-Datentabelle durch echte Ausstattung ist historischer Entwurfsstatus. Aktuelle Textprüfung trennt ältere eigene Ausrüstung und aktuelle Modellmerkmale; diese AC ist dieselbe fachliche Grenze wie SRC-0931.d, keine zusätzliche unabhängige Arbeit.

## src-0943

- Quelle: `docs/riverstar/entwurf.md:67` · Riverstar – Entwurf 04 / Recherche zur Hecktasche (intern)
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [Grabner Bug/Heck-Tasche ESCAPE, RIVERSTAR](https://www.grabner.com/shop/produkte/zubehoer/detailseite/Bug-Heck-Tasche-EXP-RIV-ESC?cHash=aec605828c94b7e9f1b13a725434edf5), geprüft 20. September 2026. Die aktuelle Tasche ist für Riverstar und Riverstar XXL gelistet, mit 45 Litern nutzbarem Volumen, Befestigungsgurten und schwellwasserdichtem Reißverschluss. Passt zur beschriebenen Zubehörart. Ob eure 2017/2018 gekaufte Tasche exakt dieser Ausführung entspricht, ist nicht bestätigt; deshalb keine Literzahl, Maße oder aktuelle Artikelnummer als Daten eurer Tasche auf der Seite.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0943; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0943.a` und `SRC-0943.b` sind Fragmente; vollständige Klausel `SRC-0943.a1` in der atomaren Matrix.

- COVERAGE-R1-013: Datierte interne Herstellerrecherche zur **aktuellen** Tasche (Riverstar/Riverstar XXL; 45 l, Gurte, schwellwasserdichter Reißverschluss). Nur Zubehörart vergleichbar; Identität mit 2017/2018 gekaufter Tasche unbestätigt. ST-CON-04 prüft deshalb Literzahl, Maße und heutige Artikelnummer als drei getrennte öffentliche Ausschlüsse. SRC-0954.d/e bekräftigt dieselbe historische Grenze; keine doppelte Produktpflicht.

## src-0944

- Quelle: `docs/riverstar/entwurf.md:71` · Riverstar – Entwurf 04 / Fotoabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: EXIF aus unveränderten Projektkopien gelesen:

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0944; Anwendung: ST-CON-04. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0945

- Quelle: `docs/riverstar/entwurf.md:73` · Riverstar – Entwurf 04 / Fotoabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - DSC_1545.jpg: DateTimeOriginal 2018:07:13 11:14:30; kein GPS-Ort.

- BATCH-001 / PKG-033: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0945; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: EXIF aus unveränderter Projektkopie: `DSC_1545.jpg`, 2018-07-13 11:14:30, kein GPS-Ort. Historischer Metadatenbefund; ST-CON-04 darf daraus keinen konkreten Uferort ableiten. ST-PHOTO-01 verlangt vor neuer Bildverwendung aktuelle Herkunfts- und Variantenprüfung.

## src-0946

- Quelle: `docs/riverstar/entwurf.md:74` · Riverstar – Entwurf 04 / Fotoabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - DSC_1547.jpg: DateTimeOriginal 2018:07:13 11:15:02; kein GPS-Ort.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0946; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: EXIF aus unveränderter Projektkopie: `DSC_1547.jpg`, 2018-07-13 11:15:02, kein GPS-Ort. Die Zeit belegt keinen Aufnahmeort; für neue Nutzung gelten die ST-PHOTO-01-Prüfung und die separate Kinder-/Motiventscheidung aus SRC-0925.

## src-0947

- Quelle: `docs/riverstar/entwurf.md:75` · Riverstar – Entwurf 04 / Fotoabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Das California-Foto DSC_1514.jpg stammt vom 8. Juli 2018 und belegt deshalb nicht den Ort der Uferbilder fünf Tage später.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0947; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0947.a` und `SRC-0947.b` sind Fragmente; vollständige Klausel `SRC-0947.a1` in der atomaren Matrix.

## src-0948

- Quelle: `docs/riverstar/entwurf.md:77` · Riverstar – Entwurf 04 / Fotoabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Für genauere Ufer-Bildunterschriften genügt die persönliche Bestätigung des Gewässers oder Campingplatzes. Bis dahin bleibt die geografische Angabe „Norwegen“.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0948; Anwendung: ST-CON-04. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013 / offener Normkonflikt: Original verlangt für präzisere Ufer-Bildunterschriften persönliche Bestätigung von Gewässer **oder** Campingplatz; heutiges ST-CON-04-AC verlangt Gewässer **und** Ort vor Veröffentlichung. Bis zur Nutzerentscheidung nur „Norwegen“ als geografische Angabe. Kein EXIF-Zeitstempel ersetzt die persönliche Ortsbestätigung.

## src-0949

- Quelle: `docs/riverstar/entwurf.md:81` · Riverstar – Entwurf 04 / Noch offen
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Genauer Ort der beiden Uferfotos vom 13. Juli 2018.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0949; Anwendung: ST-CON-04. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0949.a` und `SRC-0949.b` sind Fragmente; vollständige Klausel `SRC-0949.a1` in der atomaren Matrix.

- COVERAGE-R1-052: `SRC-0949.a1` ist als offene Ortsklärung für **beide** Uferfotos vom 13. Juli 2018 (`DSC_1545.jpg`, `DSC_1547.jpg`) in ST-CON-04 konkret abgedeckt. Die Ortsantwort und die in `src-0948` offene Schwelle „Gewässer oder Campingplatz“ gegenüber „Gewässer und Ort“ sind dadurch nicht entschieden. Bis zur persönlichen Bestätigung nur „Norwegen“; genauere Beschriftung und Veröffentlichung des Entwurfs gesperrt. Diese Zuordnung ist Planungsdeckung, kein Bild-, Text- oder Live-Nachweis.

## src-0950

- Quelle: `docs/riverstar/entwurf.md:82` · Riverstar – Entwurf 04 / Noch offen
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: - Was konkret stört an den Grabner-Schwimmwesten?

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0950; Anwendung: ST-CON-04. Planning Coverage: Unresolved; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Entscheidung: Ursache der Schwimmwestenkritik ungeklärt; keine Text- oder Veröffentlichungsfreigabe daraus.

- COVERAGE-R1-013: Dieselbe offene Nutzerentscheidung wie SRC-0940; Ursache und öffentliche Formulierung dürfen nicht aus dem Entwurf geraten werden.

## src-0951

- Quelle: `docs/riverstar/entwurf.md:85` · Riverstar – Entwurf 04 / Noch offen
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Keine externen Links auf der Besucherseite; Quellen bleiben intern. Keine absolute Kentersicherheit versprechen.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0951; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: Öffentlicher Riverstar-Text ohne ausgehende Quellenlinks; Hersteller- und Fremdrecherche bleibt intern. Persönliche Stabilität ist keine absolute Kentersicherheitszusage. Text-/Linkcheck in ST-CON-04, ergänzend zu SRC-0929 und SRC-0939.

## src-0952

- Quelle: `docs/riverstar/entwurf.md:89` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Alle drei Fotos öffnen per Klick oder Tastatur eine große Dialogansicht. Schließen über Schaltfläche, Escape oder äußeren Hintergrund; Fokus kehrt zum auslösenden Link zurück. Ohne JavaScript öffnet der Bildlink die Webdatei. Niemals wird auf eine unveränderte Originaldatei verlinkt.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0952; Anwendung: ST-CON-04,ST-WEB-01,ST-WEB-03. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: Drei Entwurfsfotos als konkreter ST-CON-04-/ST-WEB-01-/ST-WEB-03-Prüffall: Öffnen mit Klick und Tastatur; Schließen mit Button, Escape und äußerem Hintergrund; Fokusrückgabe; ohne JavaScript nur Webdatei; kein Originaldatei-Link. Historische Implementierungsbeschreibung, kein aktueller Browser- oder Live-Nachweis.

## src-0953

- Quelle: `docs/riverstar/entwurf.md:91` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: [Eckla-Foldy, Herstellerseite](https://www.eckla.de/produkt/eckla-foldy-der-faltbootwagen/): offizielle Schreibweise mit Bindestrich. Werkzeuglos faltbar; für aufgebautes und zusammengefaltetes Boot. Gewichtsangaben der Seite widersprechen sich (4,9/5,5 kg), daher keine Gewichtsangabe übernommen.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0953; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- BATCH-001 Atomarität: `SRC-0953.b` und `SRC-0953.c` sind Fragmente; vollständige Klausel `SRC-0953.b1` in der atomaren Matrix.

- COVERAGE-R1-013: Herstellerquelle intern; ECKLA Foldy mit Bindestrich, werkzeuglos faltbar, für aufgebautes und zusammengefaltetes Boot. Widersprüchliche Gewichtsangaben 4,9/5,5 kg: keine Gewichtsübernahme in den öffentlichen Text. Keine neue externe Verlinkung.

## src-0954

- Quelle: `docs/riverstar/entwurf.md:93` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Grabner beschreibt die aktuelle Riverstar-Ausführung als Zweier. Historische Freigabe für das konkrete Boot nicht ermittelt. Die vom Nutzer bestätigte Nutzung mit Kind/Jugendlichem ist daher persönlich formuliert. Die aktuelle Bug/Heck-Tasche ist für ESCAPE und RIVERSTAR gelistet (45 Liter); keine ungeprüfte Gleichsetzung aktueller Maße mit der historischen Tasche.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0954; Anwendung: ST-CON-04. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: Aktuelle Zweierbeschreibung ist kein historischer Freigabebeleg; Mitfahrt mit Kind/Jugendlichem nur als vom Nutzer bestätigte persönliche Nutzung (auch SRC-0941). Aktuelle 45-l-Tasche für ESCAPE/RIVERSTAR belegt keine Daten der historischen Tasche (auch SRC-0943). Textprüfung trennt diese vier Aussagearten.

## src-0955

- Quelle: `docs/riverstar/entwurf.md:95` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Bildbearbeitung: integriertes Imagegen-Werkzeug, Ausgabe assets/riverstar/california-camping-anonymisiert.png. Sichtkontrolle: große vordere Nummerntafel und Hintergrundkennzeichen unkenntlich. Die vorherige Webdatei liegt nun im nicht versionierten Originalkopien-Ordner statt im Web-Asset-Verzeichnis.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0955; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Partially Covered; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

- COVERAGE-R1-013: Imagegen-Werkzeug, Datei `assets/riverstar/california-camping-anonymisiert.png`, damalige Kennzeichen-Sichtkontrolle und Verschiebung der vorherigen Webdatei in einen nicht versionierten Originalkopien-Ordner sind **historische Befunde**, keine dauerhafte Werkzeugpflicht und keine aktuelle Datei-, Privacy- oder Bildfreigabe. ST-PHOTO-01 verlangt aktuellen Quellen-/Kopie-/Derivat-Abgleich und Sichtprüfung der Vorder- und Hintergrundkennzeichen in allen betroffenen Varianten; die frühere Webdatei darf nicht als öffentliches unverändertes Original verlinkt werden.

## src-0956

- COVERAGE-R1-014: Historischer Anonymisierungsprompt für das California-Camping-Motiv. Vier Kennzeichenorte sind getrennte heutige Prüffälle, sofern dieses Derivat erneut genutzt wird: weißer VW-Camper rechts vorn, dunkler Pkw links hinten, roter Camper hinten, Fahrzeug durch das Zeltfenster. Zeichen und identifizierende Wappen müssen in jeder betroffenen Webgröße und Vollansicht unlesbar sein. Neutralgraue Blankoflächen, unveränderte Gesichter und sonstige promptgenaue Gestaltung beschreiben die damalige Bearbeitung; geltende enge Masken-, Kinder- und Motivregeln gehen vor. Projektkopie und Derivat vergleichen, keine erfundenen Objekte oder unbeauftragte Bildänderung. Kein Bild-Go aus dem Prompt.

- Quelle: `docs/riverstar/entwurf.md:97` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Prompt: Privacy redaction only. Anonymize ALL vehicle license plates: large white VW camper foreground lower right, small dark car far left background, red camper background, car visible through tent window. Replace all license plate lettering and identifying crests with plain neutral gray blank plate surfaces. Preserve every other feature exactly: people faces, dog, tents, cars, landscape, color, framing, resolution and aspect ratio. No beautification, no invented objects, no changes except plate anonymization.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0956; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Covered nach COVERAGE-R1-014; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0957

- Quelle: `docs/riverstar/entwurf.md:99` · Riverstar – Entwurf 04 / Entwurf 04 – Bildansicht und Herstellerabgleich
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die dauerhafte Kennzeichen- und Fotovergrößerungsregel ist in AGENTS.md hinterlegt.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0957; Anwendung: projektweit,ST-CON-04. Planning Coverage: Context; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0958

- COVERAGE-R1-014: Gemeinsamer `photo-viewer.js`/`photo-viewer.css` für redaktionelle Inhaltsfotos auf tatsächlich vorhandenen Reiseberichts-, Fahrzeug- und Kajakseiten. Die historischen Zahlen 7/6/6/2/3 sind ein datierter Prüfumfang, keine feste aktuelle Inventur. Logos/dekorative Titelbilder ohne zusätzliche Interaktion; der explizite Kajak-Aufmacher-Fotolink bleibt vergrößerbar. Beide Reisebericht-Generatoren, Auslieferung öffentlicher Webdateien und später eingefügte Inhaltsfotos sind getrennte aktuelle Prüfgegenstände. Frühere Implementierungsangaben sind kein aktueller Codebeleg.

- Quelle: `docs/riverstar/entwurf.md:103` · Riverstar – Entwurf 04 / Websiteweite Fotoansicht
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Die gemeinsame Implementierung in photo-viewer.js / photo-viewer.css gilt für Textfotos auf allen Seiten: Norwegen (7), Italien (6), Sardinien (6), Fahrzeugprofil (2), Riverstar-Entwurf (3). Logos und dekorative Titelbilder erhalten keine zusätzliche Interaktion; der explizite Aufmacher-Fotolink im Kajakentwurf bleibt vergrößerbar. Beide Reisebericht-Generatoren und die Server-Freigabe für öffentliche Dateien sind angepasst. Auch später eingefügte Inhaltsfotos werden erkannt.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0958; Anwendung: ST-WEB-01,ST-WEB-03,ST-CON-04. Planning Coverage: Covered nach COVERAGE-R1-014; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-0959

- COVERAGE-R1-014: Damalige Klick-/Enter-, Schließ-, Fokus-, Server- und Kennzeichenprüfungen sowie „Keine Originalbilder geändert“ sind historische Ergebnisse. Der heutige Regressionsplan nennt Norwegen per Klick, Fahrzeugprofil per Enter, Schließen, Fokusrückgabe, Serverauslieferung, Textfoto-Kennzeichen und Quell-/Kopie-Hash je betroffenem Stand. Kein historisches Testergebnis bestätigt heutige Bild-, Code- oder Live-Freigabe.

- Quelle: `docs/riverstar/entwurf.md:105` · Riverstar – Entwurf 04 / Websiteweite Fotoansicht
- Anwendung: ST-CON-04
- Verbindlicher Originalwortlaut: Prüfung: Großansicht im Norwegenbericht per Klick und im Fahrzeugprofil per Enter geöffnet, Schließen und Fokusrückgabe geprüft. Server-Test bestanden. Verwendete Textfotos visuell auf Kennzeichen geprüft; bei den Fahrzeugmotiven waren die Nummerntafeln bereits unkenntlich. Keine Originalbilder geändert.

- BATCH-001 / PKG-034: Quellenrolle und Zielprüfung siehe atomare Zeilen SRC-0959; Anwendung: ST-CON-04,ST-PHOTO-01. Planning Coverage: Covered nach COVERAGE-R1-014; Implementation Verification: ungeprüft. Kontext, historische Evidenz und Parserfragmente sind keine aktuelle Freigabe.

## src-1053

- Quelle: `docs/vanventure-cockpit-mvp.md:223` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1053
- Verbindlicher Originalwortlaut: Für die Google-Verbindung sind diese Werte in der privaten Produktionsumgebung erforderlich. Sie gehören niemals in Git, den Chat oder in die öffentliche Website:
- COVERAGE-R1-015: ST-INS-01 prüft die private Produktionsumgebung ohne Werteoffenlegung. Die Reichweite von „diese Werte“ für Client-ID, Callback-Adresse und kanalverwaltendes Konto bleibt ungeklärt; keine Dokumentationsausnahme ist freigegeben.

- BATCH-001 / PKG-035 / `SRC-1053.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Private Produktionsumgebung als Ort der Google-Verbindungswerte. Register Z. 2446–2450 bewahrt Wortlaut; ST-INS-01, Z. 406, verweist nur allgemein auf Sicherheitsgrenzen. Den konkreten Konfigurationsort als Abnahmekriterium/Constraint verlinken. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1053.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1053.b`: Unresolved; Ziel `ST-INS-01`; Review-Befund: Verbot für Git, Chat und öffentliche Website. Register bewahrt es, doch der Wortlaut „diese Werte“ erfasst scheinbar auch die Callback-URL und das Google-Konto aus Z. 229–231; beide Arten von Angaben stehen bereits in Projekttexten. Unresolved: Geheimnisse und veröffentlichbare Kennungen sauber abgrenzen; siehe Entscheidungsfrage unten. Offene Frage: Soll das Verbot für Git, Chat und öffentliche Website nur Geheimnisse erfassen, während Callback-URL und Kanal-Kontoinformation nach gesonderter Freigabe dokumentierbar sind? Implementation Verification: ungeprüft.

## src-1054

- Quelle: `docs/vanventure-cockpit-mvp.md:226` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1054
- Verbindlicher Originalwortlaut: - `GOOGLE_OAUTH_CLIENT_ID`
- COVERAGE-R1-015: ST-INS-01 prüft Vorhandensein und Verwendung der Client-ID in privater Produktionskonfiguration, ohne den Wert zu protokollieren.

- BATCH-001 / PKG-035 / `SRC-1054.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Client-ID erforderlich; nur zusammen mit SRC-1053.a als Produktionskonfiguration verständlich. Register Z. 2452–2456 korrekt; konkreten Konfigurationscheck an ST-INS-01 hängen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1054.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1055

- Quelle: `docs/vanventure-cockpit-mvp.md:227` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1055
- Verbindlicher Originalwortlaut: - `GOOGLE_OAUTH_CLIENT_SECRET`
- COVERAGE-R1-015: ST-INS-01 prüft Vorhandensein und Verwendung des Client-Secrets in privater Produktionskonfiguration, ohne den Wert zu protokollieren.

- BATCH-001 / PKG-035 / `SRC-1055.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Client-Secret erforderlich; zusätzlich Geheimnisschutz aus SRC-1053.b. Register Z. 2458–2462 korrekt, Planning Coverage nur indirekt. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1055.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1056

- Quelle: `docs/vanventure-cockpit-mvp.md:228` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1056
- Verbindlicher Originalwortlaut: - ein 32-Byte-Schlüssel für die Verschlüsselung gespeicherter Refresh-Tokens
- COVERAGE-R1-015: ST-INS-01 prüft Schlüssellänge 32 Byte und Nutzung für gespeicherte Refresh-Tokens getrennt, ohne den Schlüsselwert zu protokollieren.

- BATCH-001 / PKG-035 / `SRC-1056.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: 32-Byte-Schlüssel für gespeicherte Refresh-Tokens; Länge und Zweck getrennt prüfen. Register Z. 2464–2468 korrekt; in ST-INS-01 gezielt referenzieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1056.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1057

- Quelle: `docs/vanventure-cockpit-mvp.md:229` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1057
- Verbindlicher Originalwortlaut: - die im Google-Cloud-Projekt hinterlegte Callback-Adresse `https://vanventure.at/api/cockpit/youtube/callback`
- COVERAGE-R1-015: ST-INS-01 vergleicht die Google-Cloud-YouTube-Callback-Adresse exakt mit https://vanventure.at/api/cockpit/youtube/callback; kein Login-Callback.

- BATCH-001 / PKG-035 / `SRC-1057.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Exakte YouTube-Callback-Adresse. Register Z. 2470–2474 korrekt; im Verbindungs-AC von ST-INS-01 konkret prüfen. Kein Login-Callback. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1057.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1058

- Quelle: `docs/vanventure-cockpit-mvp.md:231` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1058
- Verbindlicher Originalwortlaut: - das Google-Konto, das den VanVenture-YouTube-Kanal verwalten darf

- BATCH-001 / PKG-035 / `SRC-1058.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Kanalverwaltendes Google-Konto ist benötigte Phase-0-Angabe. Register Z. 2476–2480 korrekt; Rolle/Zuständigkeit im Verbindungsnachweis zu ST-INS-01 festhalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1058.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1058.a sind durch die einzeln prüfbaren AC in ST-INS-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1059

- Quelle: `docs/vanventure-cockpit-mvp.md:233` · VanVenture Cockpit – Rolloutnachweis / Phase 0 – noch benötigte Angaben
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,constraint-register.md#src-1059
- Verbindlicher Originalwortlaut: In Google Cloud werden ausschließlich die YouTube Data API v3 und YouTube Analytics API aktiviert. Die OAuth-Einwilligung verwendet nur die Leserechte `youtube.readonly` und `yt-analytics.readonly`. Der Login ins Cockpit bleibt davon getrennt.

- BATCH-001 / PKG-035 / `SRC-1059.a`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Ausschließlich zwei benannte YouTube-APIs. Register Z. 2482–2486 korrekt; Zuordnung zu ST-AUTH-01 ist irreführend, da dessen separater Login betroffen wäre. ST-INS-01. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1059.b`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Genau zwei YouTube-Lesescopes; weder Schreibscope noch Login-Scopes hineinmischen. ST-INS-01 und Register; ST-AUTH-01 nur als Trennungsbezug. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1059.c`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Cockpit-Login bleibt von YouTube-Einwilligung getrennt. ST-AUTH-01, Z. 470–471, deckt dies; auch ST-INS-01 als Gegenstelle verlinken. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1059.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1059.a, SRC-1059.b, SRC-1059.c sind durch die einzeln prüfbaren AC in ST-INS-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1060

- Quelle: `docs/vanventure-cockpit-mvp.md:240` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1060
- Verbindlicher Originalwortlaut: Vor dem produktiven Umschalten werden die Google-Adressen der künftigen Administratoren und Redaktionskonten verbindlich festgelegt. Diese Freigabeliste wird nicht über eine offene Registrierung, sondern über die vorhandene Benutzerverwaltung gepflegt.

- BATCH-001 / PKG-035 / `SRC-1060.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Künftige Admin- und Redaktionsadressen verbindlich vor Umschaltung festlegen. ST-AUTH-01, Z. 470, nennt Allowlist, nicht diese zeitliche Freigabebedingung ausdrücklich. Als historisches Gate mit Nachweis erfassen, ohne heutige Prüfung zu behaupten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1060.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1060.b`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Pflege ausschließlich über vorhandene Benutzerverwaltung; keine offene Registrierung. ST-AUTH-01, Z. 470, deckt beides. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1060.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1060.a, SRC-1060.b sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1061

- Quelle: `docs/vanventure-cockpit-mvp.md:245` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1061
- Verbindlicher Originalwortlaut: Die Umsetzung umfasst:

- BATCH-001 / PKG-035 / `SRC-1061.a`: Context; Ziel `ST-INS-01`; Review-Befund: „Die Umsetzung umfasst:“ ist Einleitung, keine eigenständige Klausel. Kandidat entfernen; SRC-1062–1067 bleiben. Register Z. 2494–2498 nicht als eigenständige bindende Regel behandeln. Implementation Verification: ungeprüft.

## src-1062

- Quelle: `docs/vanventure-cockpit-mvp.md:247` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1062
- Verbindlicher Originalwortlaut: - additive Spalten oder eine eigene Tabelle für Google-Provider, Google-`sub`, verifizierte E-Mail und Zeitpunkt der Zuordnung;

- BATCH-001 / PKG-035 / `SRC-1062.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Alternative additive Spalten oder eigene Tabelle, dazu Provider, sub, verifizierte E-Mail, Zuordnungszeit. ST-AUTH-01, Z. 470, nennt Felder, aber nicht die additive Alternative klar. Diese erhalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1062.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1062.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1063

- Quelle: `docs/vanventure-cockpit-mvp.md:249` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1063
- Verbindlicher Originalwortlaut: - Start- und Callback-Routen unter `/api/auth/google/*` sowie einen sicheren Rücksprung nach `/redaktion` oder `/cockpit`;

- BATCH-001 / PKG-035 / `SRC-1063.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Start- und Callback-Routen plus sicherer Rücksprung zu zwei Zielen. ST-AUTH-01, Z. 470, deckt das im Kern; beide Routen und beide Ziele separat prüfbar machen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1063.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1063.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1064

- Quelle: `docs/vanventure-cockpit-mvp.md:251` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1064
- Verbindlicher Originalwortlaut: - eine gemeinsame, serverseitig prüfbare VanVenture-Sitzung für beide Bereiche;

- BATCH-001 / PKG-035 / `SRC-1064.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Gemeinsame, serverseitig prüfbare Sitzung für beide Bereiche. ST-AUTH-01, Z. 470, deckt sie. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1064.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1064.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1065

- Quelle: `docs/vanventure-cockpit-mvp.md:252` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1065
- Verbindlicher Originalwortlaut: - Login-Schaltflächen und einen verständlichen Hinweis bei nicht freigegebenen Google-Konten;

- BATCH-001 / PKG-035 / `SRC-1065.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Login-Schaltflächen und verständlicher Ablehnungshinweis. ST-AUTH-01, Z. 470, nennt beide; Hinweis dort als „neutral“ präzisiert. Beide UI-Ergebnisse getrennt prüfen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1065.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1065.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1066

- Quelle: `docs/vanventure-cockpit-mvp.md:254` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1066
- Verbindlicher Originalwortlaut: - Audit-Einträge für Anmeldung, Abmeldung, fehlgeschlagene Freigaben sowie administrative Konto-Zuordnungen – ohne Tokens, Secrets oder vollständige sensible Identitätsdaten in Logs;

- BATCH-001 / PKG-035 / `SRC-1066.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Vier Audit-Ereignisse und drei Log-Ausschlüsse. ST-AUTH-01, Z. 470, deckt sie inhaltlich; in getrennte Ereignis- und Geheimnisschutzkriterien teilen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1066.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1066.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1067

- Quelle: `docs/vanventure-cockpit-mvp.md:257` · VanVenture Cockpit – Rolloutnachweis / Phase 1A – Angaben und Umsetzung für den gemeinsamen Login
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,constraint-register.md#src-1067
- Verbindlicher Originalwortlaut: - automatisierte Tests für gültige Anmeldung, nicht freigegebenes Konto, Sitzungswechsel Redaktion ↔ Cockpit, CSRF-Schutz, Abmeldung und die sofortige Ungültigkeit nach Sperrung beziehungsweise Rollenänderung.

- BATCH-001 / PKG-035 / `SRC-1067.a`: Partially Covered; Ziel `ST-AUTH-01`; Review-Befund: Sieben Testszenarien, einschließlich sofortiger Ungültigkeit nach Sperre/Rollenänderung. ST-AUTH-01, Z. 470, nennt 18 historische Tests, aber keine nachvollziehbare Szenario-zu-Test-Zuordnung. Register Z. 2530–2534 bewahrt Wortlaut; Testnachweise je Szenario referenzieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1067.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1067.a sind durch die einzeln prüfbaren AC in ST-AUTH-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1068

- Quelle: `docs/vanventure-cockpit-mvp.md:263` · VanVenture Cockpit – Rolloutnachweis / Technische Umsetzung ab Phase 1
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,constraint-register.md#src-1068
- Verbindlicher Originalwortlaut: - Neue PostgreSQL-Tabellen mit Präfix `yt_` für Verbindung, Sync-Läufe, Videos, Tagesmetriken, Snapshots und Sperren. Planner, Master Context und Audit-Log erhalten eigene additive Tabellen.

- BATCH-001 / PKG-035 / `SRC-1068.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Sechs yt_-Tabellenzwecke, PostgreSQL und Präfix. Register Z. 2536–2540 korrekt; ST-INS-01, Z. 406, ist zu allgemein für eine prüfbare Schema-Zuordnung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1068.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1068.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Planner, Master Context und Audit-Log erhalten eigene additive Tabellen. Register korrekt; für Auth-Audit zusätzlich ST-AUTH-01 zuordnen, übrige zu ST-INS-01. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1068.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-016: SRC-1068.a, SRC-1068.b sind durch die einzeln prüfbaren AC in ST-INS-01 planerisch gedeckt; die BATCH-001-Fragen nach Ziel-/Prüfnachweis sind damit als Planungsfragen erledigt. Implementation Verification bleibt offen.

## src-1069

- Quelle: `docs/vanventure-cockpit-mvp.md:266` · VanVenture Cockpit – Rolloutnachweis / Technische Umsetzung ab Phase 1
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1069
- Verbindlicher Originalwortlaut: - Private JSON-API unter `/api/cockpit/*`; die Oberfläche verwendet ausschließlich diese API.

- BATCH-001 / PKG-035 / `SRC-1069.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Private JSON-API unter exaktem Präfix. ST-INS-01, Z. 406–407, und Register Z. 2542–2546 decken sie. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1069.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1069.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Oberfläche verwendet ausschließlich diese API. ST-INS-01, Z. 406, deckt sie; „ausschließlich“ beibehalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1069.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Private API und Ausschließlichkeit: ST-INS-01, COVERAGE-R1-017; API-Präfix und jeder UI-Datenpfad werden getrennt geprüft. Planning Coverage: Covered; Implementation Verification: offen.

## src-1070

- Quelle: `docs/vanventure-cockpit-mvp.md:268` · VanVenture Cockpit – Rolloutnachweis / Technische Umsetzung ab Phase 1
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1070
- Verbindlicher Originalwortlaut: - Verschlüsselte Tokenablage mit AES-256-GCM, getrennt vom Browser und ohne Geheimnisse in Logs.

- BATCH-001 / PKG-035 / `SRC-1070.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: AES-256-GCM, kein Token im Browser, keine Geheimnisse in Logs sind getrennte Schutzpflichten. Register Z. 2548–2552 bewahrt sie; ST-INS-01 braucht explizite Prüfnachweise je Grenze. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1070.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: AES-256-GCM-Ablage, Browser-Trennung und Log-Geheimnisschutz: drei getrennte Prüfnachweise bei ST-INS-01, COVERAGE-R1-017. Planning Coverage: Covered; Implementation Verification: offen.

## src-1071

- Quelle: `docs/vanventure-cockpit-mvp.md:270` · VanVenture Cockpit – Rolloutnachweis / Technische Umsetzung ab Phase 1
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1071
- Verbindlicher Originalwortlaut: - Idempotente Upserts für Tageswerte, mit mindestens 35 Tagen Nachzug für nachträgliche Analytics-Korrekturen.

- BATCH-001 / PKG-035 / `SRC-1071.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Idempotente Tageswert-Upserts und mindestens 35 Tage Nachzug. Register Z. 2554–2558 korrekt; ST-INS-01, Z. 406, nennt beides nicht prüfbar. Ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1071.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Idempotente Tageswert-Upserts und Nachzug von mindestens 35 Tagen: zwei Prüffälle bei ST-INS-01, COVERAGE-R1-017. Planning Coverage: Covered; Implementation Verification: offen.

## src-1072

- Quelle: `docs/vanventure-cockpit-mvp.md:272` · VanVenture Cockpit – Rolloutnachweis / Technische Umsetzung ab Phase 1
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1072
- Verbindlicher Originalwortlaut: - Ein Datenbank-Lock pro Kanal verhindert parallele Synchronisierungen.

- BATCH-001 / PKG-035 / `SRC-1072.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Datenbank-Lock pro Kanal gegen parallelen Sync. ST-INS-01, Z. 406, nennt Sperre; Kanalgranularität im AC ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1072.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Datenbank-Lock je Kanal gegen parallelen Sync desselben Kanals: ST-INS-01, COVERAGE-R1-017. Planning Coverage: Covered; Implementation Verification: offen.

## src-1073

- Quelle: `docs/vanventure-cockpit-mvp.md:276` · VanVenture Cockpit – Rolloutnachweis / Definition von "online"
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1073
- Verbindlicher Originalwortlaut: Phase 3 ist der erste sinnvolle Live-Stand: Das Cockpit ist auf `vanventure.at/cockpit` privat erreichbar und kann nach erfolgreichem OAuth die aktuellen Daten sowie den Jahresplan anzeigen. Phase 4 macht die Datenpflege automatisch. Bis die Google-Konfiguration vorliegt, kann Phase 1 vollständig online gehen, ohne externe Daten abzurufen.

- BATCH-001 / PKG-035 / `SRC-1073.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Historische Definition von Phase 3: private Route, erfolgreicher OAuth, aktuelle Daten, Jahresplan. Register Z. 2566–2570 etikettiert den gesamten Block als bindend; als historisches Phasengate kennzeichnen und Nachweise zu ST-INS-01 zuordnen, nicht als heutige neue Arbeit. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1073.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Phase 4 automatisiert Pflege. Historischer Phasenschritt; heutige Sync-Funktion in ST-INS-01 verifizieren, nicht erneut planen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1073.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Bedingte Erlaubnis für Phase 1 ohne externe Daten bis Google-Konfiguration vorliegt. Historische Ausnahme mit Bedingung, nicht allgemeine Erlaubnis für einen fertigen Datenstand. Register entsprechend präzisieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1073.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Historische Definition von „online“, keine aktuelle Freigabe: Phase 3 private Route, gesonderter OAuth, aktuelle Daten und Jahresplan; Phase 4 automatische Pflege; Phase-1-Ausnahme ohne externe Abrufe nur bis zur Google-Konfiguration. Heutige Nachweise bei ST-INS-01 separat offen (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1074

- Quelle: `docs/vanventure-cockpit-plan.md:3` · VanVenture Cockpit – technische Referenz
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1074
- Verbindlicher Originalwortlaut: Stand: 22. September 2026 · Diese Datei beschreibt Architektur, Datenmodell und API-Entscheidungen. Sie ist **kein aktiver Plan**: Erledigte und offene Arbeit wird ausschließlich im [verbindlichen Gesamtplan](ausbauplan.md) geführt. Historische Phasenbeschreibungen weiter unten erklären den Entstehungskontext, ohne eigene Aufgaben oder Prioritäten zu setzen.

- BATCH-001 / PKG-035 / `SRC-1074.a`: Context; Ziel `ST-INS-01`; Review-Befund: „Stand: 22.“ ist fehlerhafter Datumssplit, keine Klausel. Entfernen und Datum als Metadatum zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1074.b`: Context; Ziel `ST-INS-01`; Review-Befund: Beginnt mit abgetrenntem Monatsnamen. Architektur-/API-Beschreibung ist Dokumentrolle, keine Produktanforderung. Mit Datum als Metadatum führen; nicht ST-INS-01-AC. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1074.c`: Context; Ziel `ST-INS-01`; Review-Befund: Referenz ist kein aktiver Plan; erledigte und offene Arbeit bleibt im Gesamtplan. Governance-Regel, nicht Cockpit-Feature. Register Z. 2572–2576 aus „bindendem Originalwortlaut“ in Quellen-/Planrollen-Nachweis verschieben; maßgeblich ist die Planungsregel. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1074.d`: Context; Ziel `ST-INS-01`; Review-Befund: Historische Phasen setzen keine Aufgaben/Prioritäten. Gleicher Governance-Kontext; mit .c verbinden, nicht ST-INS-01. Implementation Verification: ungeprüft.

## src-1075

- Quelle: `docs/vanventure-cockpit-plan.md:9` · VanVenture Cockpit – technische Referenz
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-CON-01,ST-CON-02,ST-CON-03,constraint-register.md#src-1075
- Verbindlicher Originalwortlaut: **Audit-V1-Stand (22. September 2026):** Der erste Abgleich umfasst 25 Videos: zwei aktuelle Shorts, vier Legacy-Clips und 19 Longforms. Flow Trail führt mit 986 öffentlichen Gesamt-Views; Norwegen (108 Minuten) und Sardinien (38 Minuten) liefern die stärkste Watchtime der letzten 365 Tage. Trolltunga steht bei 149 Views bis Tagesabschluss, davon 120 aus dem Shorts-Feed. Diese Werte begründen drei getrennte Tests (VAN, EXPLORE, MOVE), keine automatische Säulen-Gewichtung. Siehe [Channel Audit V1](channel-audit-v1.md).

- BATCH-001 / PKG-035 / `SRC-1075.a`: Context; Ziel `ST-INS-01`; Review-Befund: „Audit-V1-Stand (22.“ ist fehlerhafter Datumssplit. Entfernen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.b`: Context; Ziel `ST-INS-01`; Review-Befund: 25 Videos und Verteilung sind datierter Befund, kein dauerhaftes AC. ST-INS-01, Z. 406, bewahrt den Befund; Register Z. 2578–2582 als historischen Nachweis kennzeichnen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.c`: Context; Ziel `ST-INS-01`; Review-Befund: 986 Views sind zeitgebundener Messwert, nicht künftiger Sollwert. Historische Evidenz. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.d`: Context; Ziel `ST-INS-01`; Review-Befund: Zwei Watchtime-Werte und 365-Tage-Fenster sind datierter Befund. Nicht ST-INS-04 als neues Abnahmekriterium. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.e`: Context; Ziel `ST-INS-01`; Review-Befund: Trolltunga-Werte samt Shorts-Feed-Anteil sind datierter Befund. Nicht als aktuelle Metrik behaupten. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.f`: Partially Covered; Ziel `ST-CON-01,ST-CON-02,ST-CON-03`; Review-Befund: Drei getrennte Tests und keine automatische Säulen-Gewichtung sind echte Planungsfolgen. ST-INS-04 ist falsches Ziel; in ST-CON-01/02/03, Z. 260–283, und ggf. Planner-Constraint zuordnen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1075.f mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1075.g`: Context; Ziel `ST-INS-01`; Review-Befund: Link zum Audit ist Quellenverweis, keine Klausel. Als Evidenzlink beim historischen Befund behalten. Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Audit-V1-Werte und Link sind datierte Evidenz vom 22.09.2026, keine künftigen Sollwerte. Fachliche Folge SRC-1075.f: VAN, EXPLORE, MOVE einzeln bei ST-CON-01/02/03; keine automatische Säulengewichtung (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1076

- Quelle: `docs/vanventure-cockpit-plan.md:19` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,constraint-register.md#src-1076
- Verbindlicher Originalwortlaut: Das geschützte VanVenture Cockpit bündelt die YouTube-Performance, die redaktionelle Planung und den inhaltlichen Kontext in einer privaten Oberfläche. Es ist kein Teil der öffentlichen GitHub-Pages-Website. Nur explizit freigeschaltete Personen erhalten Zugriff.

- BATCH-001 / PKG-035 / `SRC-1076.a`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Drei private Funktionsbereiche; ST-INS-01, Z. 402/406, deckt sie im Kern. Inhalte getrennt prüfbar halten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1076.b`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Nicht Teil der öffentlichen GitHub-Pages-Website. ST-INS-01, Z. 406, schützt öffentliche Ausgabe; Architekturgrenze im Register Z. 2584–2588 korrekt. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-1076.c`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: Nur explizit freigeschaltete Personen. Ziel ST-AUTH-01 statt allein ST-INS-01; dort Allowlist-AC Z. 470. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1076.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Drei private Funktionsbereiche und Trennung vom öffentlichen GitHub-Pages-Build bei ST-INS-01; explizite Freischaltung und Negativprobe bei ST-AUTH-01 (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1077

- Quelle: `docs/vanventure-cockpit-plan.md:23` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1077
- Verbindlicher Originalwortlaut: Das Cockpit soll:

- BATCH-001 / PKG-035 / `SRC-1077.a`: Context; Ziel `ST-INS-01`; Review-Befund: „Das Cockpit soll:“ ist Einleitung, keine Klausel. Entfernen; Register Z. 2590–2594 nicht als eigenständige Regel führen. Implementation Verification: ungeprüft.

## src-1078

- Quelle: `docs/vanventure-cockpit-plan.md:25` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1078
- Verbindlicher Originalwortlaut: - den ausgewählten VanVenture-YouTube-Kanal nach einer **separat erteilten** Google- OAuth-Verbindung auslesen;

- BATCH-001 / PKG-035 / `SRC-1078.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Auslesen des ausgewählten Kanals erst nach separat erteilter YouTube-OAuth-Verbindung. Hauptziel ST-INS-01, nicht allein ST-AUTH-01; die Trennung zu Login zusätzlich dort referenzieren. Register Z. 2596–2600 korrigieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1078.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Ausgewählten Kanal erst nach gesonderter YouTube-OAuth-Einwilligung bei ST-INS-01 auslesen; Cockpit-Login bei ST-AUTH-01 ist dafür nicht hinreichend (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1079

- Quelle: `docs/vanventure-cockpit-plan.md:27` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1079
- Verbindlicher Originalwortlaut: - YouTube-Data- und YouTube-Analytics-Daten wiederholbar und nachvollziehbar synchronisieren;

- BATCH-001 / PKG-035 / `SRC-1079.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: Beide Datenquellen wiederholbar und nachvollziehbar synchronisieren. ST-INS-01, Z. 406, nennt Sync, aber Wiederholbarkeit/Nachvollziehbarkeit nicht explizit. Ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1079.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: YouTube Data und YouTube Analytics wiederholbar und mit Lauf-/Datenstandnachweis synchronisieren: ST-INS-01 (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1080

- Quelle: `docs/vanventure-cockpit-plan.md:29` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1080
- Verbindlicher Originalwortlaut: - tägliche historische Daten vorhalten und daraus Vergleiche für Tag 1, 7, 28, 90 und 365 bilden;

- BATCH-001 / PKG-035 / `SRC-1080.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: Tägliche historische Datenhaltung und fünf Vergleichsalter sind unterschiedliche Ergebnisse. Datenhaltung zu ST-INS-01; 1/7/28/90/365-Vergleiche zu ST-INS-04, Z. 436. Register Z. 2608–2612 und Matrix entsprechend aufteilen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1080.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-017: Tägliche historische Datenhaltung bei ST-INS-01; Vergleiche für Tag 1/7/28/90/365 bei ST-INS-04 getrennt nachweisen (COVERAGE-R1-017). Planning Coverage: Covered; Implementation Verification: offen.

## src-1081

- Quelle: `docs/vanventure-cockpit-plan.md:31` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1081
- Verbindlicher Originalwortlaut: - ein Dashboard, eine Videosicht, einen Jahres-Content-Plan mit ungefähr zwölf Longform-Videos, handlungsorientierte Insights und den VanVenture Master Context anbieten.

- BATCH-001 / PKG-036 / `SRC-1081.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Dashboard, Videosicht, Jahresplan, ungefähr zwölf Longforms, Insights und Master Context sind getrennt prüfbar. Board-Zuordnung ist falsch. — ST-INS-01:402–407: Funktionen einzeln abgleichen; „ungefähr zwölf“ als ungefähres Jahresziel erhalten. src-1081:2617 von ST-BRD-01/03 lösen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1081.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: fünf Ansichten/Funktionen und ungefähres Jahresziel. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1082

- Quelle: `docs/vanventure-cockpit-plan.md:35` · VanVenture Cockpit – technische Referenz / Zielbild
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1082
- Verbindlicher Originalwortlaut: Die öffentliche Website bleibt statisch und erhält weder OAuth-Tokens noch Analytics-Routen oder private Cockpit-Daten.

- BATCH-001 / PKG-036 / `SRC-1082.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Statische öffentliche Ausgabe und drei getrennte Ausschlüsse: Tokens, Analytics-Routen, private Daten. — ST-INS-01:406 für öffentliche Grenze, Auth-/Token-Slice für Geheimnisse; src-1082:2623 ergänzen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1082.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: statischer Build und drei getrennte Ausschlüsse. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1084

- Quelle: `docs/vanventure-cockpit-plan.md:42` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1084
- Verbindlicher Originalwortlaut: | Öffentliche Website | Statisches HTML/CSS/JavaScript, GitHub Pages | Unverändert lassen. |

- BATCH-001 / PKG-036 / `SRC-1084.a`: Unresolved; Ziel `ST-INS-01`; Review-Befund: K. Vorhandene Technik, damaliger Hosting-Ort und „unverändert lassen“ haben unterschiedliche Bedeutung. „Unverändert“ ist auf diese Cockpit-Ausbaustufe zu begrenzen. — ST-INS-01:406 und src-1084:2629 historisch/scoped kennzeichnen; Hosting-Konflikt unten klären. Unresolved. Offene Frage: Soll GitHub Pages und „unverändert lassen“ ausschließlich als historische Ausgangslage der damaligen Cockpit-Stufe gelten? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: historische Hosting-Angabe; heutige Verbindlichkeit bleibt Nutzerentscheidung. Unresolved: konkrete Nutzerfrage zum heutigen Hosting; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1085

- Quelle: `docs/vanventure-cockpit-plan.md:43` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1085
- Verbindlicher Originalwortlaut: | Private Anwendung | Eigenes Node.js-ESM-HTTP-Backend in `editor/server.mjs` und Vanilla-JS-Client | Cockpit als zusätzliche, geschützte Route und API im selben Dienst entwickeln. |

- BATCH-001 / PKG-036 / `SRC-1085.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Backend/Client sind Ausgangslage; geschützte Route, API und gleicher Dienst sind Entscheidungen. — ST-INS-01:402–406 um Route, API und Dienstgrenze als getrennte Kriterien ergänzen; src-1085:2635. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1085.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: Bestandstechnik sowie geschützte Route, API und gemeinsamer Dienst. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1086

- Quelle: `docs/vanventure-cockpit-plan.md:44` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1086
- Verbindlicher Originalwortlaut: | Datenhaltung | PostgreSQL 18 via `pg`; PGlite nur für Tests | Cockpit-Tabellen in derselben PostgreSQL-Datenbank, mit klaren Tabellenpräfixen. |

- BATCH-001 / PKG-036 / `SRC-1086.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. „PostgreSQL 18 via pg“ bezeichnet den damaligen Datenhaltungsstand; der abgetrennte Tabellenentscheid fehlt hier. — ST-INS-01:406 und src-1086:2641: als zu verifizierende technische Ausgangslage führen, keine selbständige User Story. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1086.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1086.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. „PGlite nur für Tests“ gehört zur Ausgangslage; gleiche PostgreSQL-Datenbank und klare Tabellenpräfixe sind zwei Prüfungen. Kandidat schneidet mitten durch die Tabellenzeile. — ST-INS-01:406 um DB-Grenze/Präfixe und Test-DB-Abgrenzung ergänzen; src-1086:2641 atomisieren. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1086.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: damaliger DB-Stand, Testabgrenzung, gemeinsame Datenbank und Präfixe. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1087

- Quelle: `docs/vanventure-cockpit-plan.md:45` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1087
- Verbindlicher Originalwortlaut: | Betrieb | Docker Compose, Caddy/HTTPS auf dem Contabo-Server in Produktion | Bestehendes Image und Compose weiterverwenden; kein weiterer Dienst für die erste Ausbaustufe. |

- BATCH-001 / PKG-036 / `SRC-1087.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Docker Compose, Caddy/HTTPS, Contabo sind Ausgangslage; bestehendes Image und Compose weiterverwenden ist die Entscheidung. — ST-INS-01:406/src-1087:2647 nach Bestand und Erststufen-Entscheidung trennen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1087.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1087.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Kein weiterer Dienst gilt ausdrücklich für die erste Ausbaustufe; ohne Zeitgrenze wäre das ein falsches Dauerverbot. — src-1087:2647 mit Scope; ST-INS-01:406 historisch verifizieren. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1087.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: damaliger Betrieb und zeitlich begrenzte Erststufen-Entscheidung. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1088

- Quelle: `docs/vanventure-cockpit-plan.md:46` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,ST-INS-01,constraint-register.md#src-1088
- Verbindlicher Originalwortlaut: | Zugriffsmodell | Lokale Benutzer, Passwort-Hashes, HttpOnly/SameSite-Strict-Sitzung, CSRF, Rollen `admin`/`editor` | Das bestehende Muster konsequent erweitern. |

- BATCH-001 / PKG-036 / `SRC-1088.a`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: K. Lokale Nutzer, Hashes, Cookie-Attribute, CSRF und Rollen sind eigenständige Sicherheitskriterien. ST-INS-01 allein ist als Zugriffs-Ziel zu grob. — ST-AUTH-01:470 für Nutzer/Sitzung/Rollen und Cockpit-Slice für Übernahme des Musters; src-1088:2653 entsprechend zuordnen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1088.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: fünf getrennte Schutzmerkmale und Übernahme ins Cockpit. Covered im Plan; Ziel-AC in ST-INS-01 und ST-AUTH-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1089

- Quelle: `docs/vanventure-cockpit-plan.md:48` · VanVenture Cockpit – technische Referenz / Ausgangslage und Leitentscheidung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1089
- Verbindlicher Originalwortlaut: Es werden keine zusätzlichen Frontend-, Backend- oder Datenbank-Frameworks eingeführt. Google-API-Aufrufe können mit der in Node vorhandenen `fetch`-Schnittstelle erfolgen. Eine schlanke, explizit geprüfte OAuth-Implementierung ist bevorzugt; eine zusätzliche Google-SDK-Abhängigkeit ist erst zu rechtfertigen, wenn sie Sicherheits- oder Wartungsvorteile bringt, die der kleine eigene Client nicht sauber abdeckt.

- BATCH-001 / PKG-036 / `SRC-1089.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Verbot zusätzlicher Frontend-, Backend- und Datenbank-Frameworks ist eine Architekturgrenze für das Cockpit, nicht nur Login. — src-1089:2659 auf ST-INS-01 und betroffene Cockpit-Slices erweitern; AC/Architekturprüfung benennen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1089.b`: Context; Ziel `ST-INS-01`; Review-Befund: S. Node-fetch ist eine erlaubte Möglichkeit („können“), keine Pflicht zu genau dieser Implementierung. — src-1089:2660 als Option kennzeichnen; keine verpflichtende AC daraus machen. Coverage als Referenz möglich. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1089.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Schlanker, ausdrücklich geprüfter OAuth-Client ist eine Präferenz mit Prüfbedingung, keine uneingeschränkte Eigenbaupflicht. — YouTube-OAuth-Slice und src-1089:2660: Präferenz samt Prüfung erhalten. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1089.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. SDK-Abhängigkeit nur bei belegtem Sicherheits- oder Wartungsvorteil, den kleiner Client nicht abdeckt. — YouTube-OAuth-Slice/Entscheidungsnachweis; src-1089:2660 Ausnahme ausdrücklich aufnehmen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1089.d mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: Frameworkgrenze, optionale fetch-Nutzung und OAuth-/SDK-Entscheidungsnachweis. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1090

- Quelle: `docs/vanventure-cockpit-plan.md:56` · VanVenture Cockpit – technische Referenz / Grenzen und Annahmen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1090
- Verbindlicher Originalwortlaut: - Eine OAuth-Verbindung repräsentiert die berechtigte Google-/YouTube-Kanalinhaberin bzw. den Kanal, nicht den gerade im Cockpit angemeldeten Redaktionsbenutzer.

- BATCH-001 / PKG-036 / `SRC-1090.a`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S. Kanal-OAuth repräsentiert Kanalinhaberin/Kanal, nicht den angemeldeten Redaktionsnutzer. Diese Trennung ist entscheidend. — YouTube-OAuth-Slice und src-1090:2665; nicht allein an allgemeines ST-AUTH-01 hängen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1090.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: Kanalidentität unabhängig vom Redaktionskonto. Covered im Plan; Ziel-AC in ST-INS-01 und ST-INS-03; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1091

- Quelle: `docs/vanventure-cockpit-plan.md:58` · VanVenture Cockpit – technische Referenz / Grenzen und Annahmen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1091
- Verbindlicher Originalwortlaut: - Zu Beginn wird genau eine aktive Kanalverbindung unterstützt. Das Datenmodell bleibt mandantenfähig genug, um später mehrere Kanäle ergänzen zu können.

- BATCH-001 / PKG-036 / `SRC-1091.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Genau eine aktive Kanalverbindung gilt zu Beginn. — ST-INS-01:406 und src-1091:2671 mit Zeitbedingung prüfen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1091.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1091.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Datenmodell soll spätere Mehrkanalfähigkeit zulassen; verlangt noch keinen Mehrkanalbetrieb. — Datenmodell-AC bei ST-INS-01:406; src-1091:2671 abgrenzen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1091.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-018: eine aktive Verbindung zu Beginn und erweiterbares Schema. Covered im Plan; Ziel-AC in ST-INS-01; BATCH-001-Fragen nach AC/Prüfziel sind damit überholt. Implementation Verification offen.

## src-1092

- Quelle: `docs/vanventure-cockpit-plan.md:60` · VanVenture Cockpit – technische Referenz / Grenzen und Annahmen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1092
- Verbindlicher Originalwortlaut: - Automatisch synchronisiert wird serverseitig; ein Browser muss dafür nicht geöffnet sein. Die konkrete Ausführung erfolgt zunächst durch einen Container-Job bzw. einen vom Hosting gesteuerten Zeitplan, nicht durch GitHub Pages.

- BATCH-001 / PKG-036 / `SRC-1092.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Automatischer Sync wird serverseitig ausgeführt. — ST-INS-01:406 nennt Zeitsteuerung, sollte serverseitige Ausführung prüfen; src-1092:2677. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1092.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Der Browser muss beim Sync nicht geöffnet bleiben; eigenständiger Betriebs-Grenzfall. — ST-INS-01:406 als beobachtbaren Test ergänzen; src-1092:2677. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1092.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Anfangs Container-Job oder Hosting-Zeitplan; GitHub Pages ist ausgeschlossen. Das „oder“ ist eine zulässige Alternative. — ST-INS-01:406/Betriebs-Task; src-1092:2677 Alternativen und Anfangs-Scope wahren. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1092.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Serverseitig ohne Browser; initial Container-Job oder Hosting-Zeitplan, GitHub Pages ausgeschlossen. AC: ST-INS-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1093

- Quelle: `docs/vanventure-cockpit-plan.md:63` · VanVenture Cockpit – technische Referenz / Grenzen und Annahmen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1093
- Verbindlicher Originalwortlaut: - API-Quoten, nachträgliche Datenkorrekturen und der bei YouTube mögliche Verzug von Analytics-Daten werden protokolliert und in der Oberfläche kenntlich gemacht.

- BATCH-001 / PKG-036 / `SRC-1093.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K. API-Quoten, spätere Korrekturen und Analytics-Verzug sind drei Zustände; jeder ist zu protokollieren und in der UI kenntlich zu machen. — ST-INS-01:406 beziehungsweise Datenqualitäts-AC bei ST-INS-04:436; src-1093:2683 in prüfbare Fälle teilen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1093.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Drei getrennte Zustände, jeweils Protokoll und UI-Kennzeichnung. AC: ST-INS-01 und ST-INS-04. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1094

- Quelle: `docs/vanventure-cockpit-plan.md:68` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,ST-INS-01,constraint-register.md#src-1094
- Verbindlicher Originalwortlaut: Die bestehende Kontoverwaltung ist die Allowlist: Es gibt keine öffentliche Registrierung, keine Einladungs-URL und keine Google-Anmeldung für Cockpit-Nutzer. Administratorinnen legen erlaubte Konten an, deaktivieren sie und können Passwörter zurücksetzen. Deaktivierung oder Passwortwechsel beendet vorhandene Sitzungen, wie bereits in der Redaktion.

- BATCH-001 / PKG-036 / `SRC-1094.a`: Unresolved; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: K. Bestehende Kontoverwaltung als Allowlist; keine öffentliche Registrierung, Einladungs-URL oder Google-Anmeldung sind getrennte Regeln. Letztere widerspricht ST-AUTH-01:470–471. — ST-AUTH-01:470–471, src-1094:2689 und Nachfolgeentscheidung abstimmen. Google-Verbot Unresolved; übrige Verbote teilweise abgedeckt. Offene Frage: Soll das alte Google-Anmeldeverbot durch die spätere allowlist-gebundene Google-Anmeldung ausdrücklich ersetzt sein, bei fortgeltendem Verbot öffentlicher Registrierung und Einladungs-URLs? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1094.b`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: K. Admin darf Konten anlegen, deaktivieren und Passwörter zurücksetzen; drei Rechte, auf Passwortkonten anzuwenden. — ST-AUTH-01:470 um diese Einzelrechte und Google-Konto-Ausnahme präzisieren; src-1094:2689. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1094.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1094.c`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: K. Deaktivierung oder Passwortwechsel beendet vorhandene Sitzungen; ST-AUTH-01 nennt Sperre/Rollenänderung, aber Passwortwechsel nicht ausdrücklich. — ST-AUTH-01:470 AC um Passwortwechsel erweitern; src-1094:2689. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1094.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Allowlist und getrennte Registrierungs-/Einladungsverbote, Admin-Kontorechte und Sitzungsende nach Deaktivierung oder Passwortwechsel in ST-AUTH-01. Google-Anmeldeverbot bleibt wegen späterem allowlist-gebundenem Login ungeklärt. Planning Coverage nur für SRC-1094.a weiterhin Unresolved; sonst im Entwurf Covered. Implementation Verification offen.

## src-1095

- Quelle: `docs/vanventure-cockpit-plan.md:74` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1095
- Verbindlicher Originalwortlaut: Vorgeschlagene Rechte (aufbauend auf den vorhandenen Rollen):

- BATCH-001 / PKG-036 / `SRC-1095.a`: Context; Ziel `ST-INS-01`; Review-Befund: N. Überschrift „Vorgeschlagene Rechte“ ist Kontext, keine eigenständige Berechtigung. Sie qualifiziert alle fünf folgenden Tabellenzeilen als Vorschlag; analytics_viewer ist optional. — src-1095:2695 als Tabellenkontext statt bindende Einzelanforderung markieren; bei src-1097–1101 Vorschlagsstatus erhalten. Implementation Verification: ungeprüft.

## src-1097

- Quelle: `docs/vanventure-cockpit-plan.md:78` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1097
- Verbindlicher Originalwortlaut: | Dashboard, Videos, Insights lesen | ja | ja | ja |

- BATCH-001 / PKG-036 / `SRC-1097.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Drei Lesebereiche für admin und editor, zusätzlich nur bedingt für analytics_viewer. Board-Mapping ist fachfremd. — ST-INS-01:406 plus Rollen-AC; src-1097:2701 von ST-BRD-01/03 auf Cockpit/Auth korrigieren. Coverage falsch zugeordnet. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1097.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Vorgeschlagene Leserechte für admin/editor; optionale Viewer-Rolle nur nach echtem Bedarf. AC: ST-INS-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1098

- Quelle: `docs/vanventure-cockpit-plan.md:79` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1098
- Verbindlicher Originalwortlaut: | Content Planner und Master Context bearbeiten | ja | ja | nein |

- BATCH-001 / PKG-036 / `SRC-1098.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Planner und Master Context bearbeiten: Admin/Editor ja, optionale Viewer-Rolle nein. — ST-INS-01:406 plus Rollen-AC; src-1098:2707 Vorschlags-/Viewer-Bedingung ausweisen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1098.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Vorgeschlagene Planner-/Master-Context-Schreibrechte für admin/editor; optionale Viewer-Rolle ausgeschlossen. AC: ST-INS-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1099

- Quelle: `docs/vanventure-cockpit-plan.md:80` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1099
- Verbindlicher Originalwortlaut: | OAuth verbinden, trennen, Sync starten, Daten löschen | ja | nein | nein |

- BATCH-001 / PKG-036 / `SRC-1099.a`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: K. Verbinden, Trennen, Sync starten und Daten löschen sind vier getrennte Admin-Aktionen; Editor/optionaler Viewer jeweils ausgeschlossen. — OAuth-Slice, ST-INS-03:426 für Trennen, Sync-/Lösch-Slice für übrige Aktionen; src-1099:2713 aufteilen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1099.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Vier getrennte Admin-Aktionen und Negativrollen. AC: ST-INS-01 und ST-INS-03. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1100

- Quelle: `docs/vanventure-cockpit-plan.md:81` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,ST-INS-01,constraint-register.md#src-1100
- Verbindlicher Originalwortlaut: | Nutzer und Rollen verwalten | ja | nein | nein |

- BATCH-001 / PKG-036 / `SRC-1100.a`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: S. Nutzer- und Rollenverwaltung liegt bei Admin; Editor und optionaler Viewer sind ausgeschlossen. — ST-AUTH-01:470 enthält Admin-Verwaltung teilweise; src-1100:2719 Vorschlags-/Viewer-Bedingung ergänzen. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1100.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Vorgeschlagene Admin-only-Nutzer-/Rollenverwaltung. AC: ST-AUTH-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1101

- Quelle: `docs/vanventure-cockpit-plan.md:82` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1101
- Verbindlicher Originalwortlaut: | Cockpit-Konfiguration ändern | ja | nein | nein |

- BATCH-001 / PKG-036 / `SRC-1101.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S. Cockpit-Konfiguration ändern liegt bei Admin; Editor und optionaler Viewer ausgeschlossen. — Cockpit-Konfigurations-AC statt nur Login-Story; src-1101:2725 ergänzen. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1101.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Vorgeschlagene Admin-only-Cockpit-Konfiguration. AC: ST-INS-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1102

- Quelle: `docs/vanventure-cockpit-plan.md:84` · VanVenture Cockpit – technische Referenz / Zugang, Allowlist und Rollen
- Anwendung (BATCH-001 Planning Coverage): ST-AUTH-01,ST-INS-01,constraint-register.md#src-1102
- Verbindlicher Originalwortlaut: `analytics_viewer` wird nur eingeführt, wenn ein echter Lesebedarf besteht. Bis dahin bleiben die zwei vorhandenen Rollen ausreichend. Jede schreibende Cockpit-Route prüft Sitzung, CSRF-Token und serverseitig die Berechtigung.

- BATCH-001 / PKG-036 / `SRC-1102.a`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: S. analytics_viewer nur bei echtem Lesebedarf einführen; bedingte Entscheidung. — ST-AUTH-01:470/src-1102:2731 als Gate, nicht als vorhandene dritte Rolle formulieren. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1102.b`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: S. Bis zum Gate reichen die zwei vorhandenen Rollen; zeitlich bedingt. — ST-AUTH-01:470 und src-1102:2731 mit „bis dahin“ erhalten. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1102.c`: Partially Covered; Ziel `ST-AUTH-01,ST-INS-01`; Review-Befund: K. Jede schreibende Cockpit-Route prüft Sitzung, CSRF und serverseitige Berechtigung; drei kumulative Prüfungen mit Scope „jede“. — ST-AUTH-01:470 und alle schreibenden Cockpit-Slices als Regressionstest; src-1102:2731. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1102.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Viewer-Gate, bis dahin zwei Rollen, sowie dreifache Prüfung jeder schreibenden Route. AC: ST-AUTH-01 und ST-INS-01. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1103

- Quelle: `docs/vanventure-cockpit-plan.md:92` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1103
- Verbindlicher Originalwortlaut: 1. Ein Administrator öffnet im Cockpit „YouTube verbinden“.

- BATCH-001 / PKG-036 / `SRC-1103.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „1.“ ist nur Listenmarker; ohne Handlung keine Klausel. — Mit SRC-1103.b zusammenführen; keinen eigenen Requirement-/Coverage-Eintrag. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1103.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „1.“ ist nur Listenmarker; ohne Handlung keine Klausel. — Mit SRC-1103.b zusammenführen; keinen eigenen Requirement-/Coverage-Eintrag. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1103.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-019: Listenmarker nur Kontext; Admin öffnet YouTube verbinden als prüfbarer OAuth-Einstieg. AC: ST-INS-03. Planning Coverage im Entwurf Covered; Implementation Verification offen.

## src-1104

- Quelle: `docs/vanventure-cockpit-plan.md:93` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1104
- Verbindlicher Originalwortlaut: 2. Der Server erzeugt einen einmaligen, kurzlebigen, an die Sitzung gebundenen `state`-Wert (mit PKCE) und leitet zu Google weiter.

- BATCH-001 / PKG-036 / `SRC-1104.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „2.“ ist nur Listenmarker. — Mit SRC-1104.b zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1104.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „2.“ ist nur Listenmarker. — Mit SRC-1104.b zusammenführen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1104.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-03 prüft Einmaligkeit, Ablauf, Sitzungsbindung, PKCE und Weiterleitung mit Negativfällen. Planning Coverage: Covered. Implementation Verification: offen.

## src-1105

- Quelle: `docs/vanventure-cockpit-plan.md:95` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1105
- Verbindlicher Originalwortlaut: 3. Google leitet ausschließlich zur fest konfigurierten HTTPS-Callback-URL des Cockpits zurück. Der Server validiert `state` und PKCE, tauscht den Code serverseitig gegen Tokens und ermittelt den autorisierten Kanal.

- BATCH-001 / PKG-036 / `SRC-1105.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „3.“ ist nur Listenmarker. — Mit SRC-1105.b/c zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1105.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „3.“ ist nur Listenmarker. — Mit SRC-1105.b/c zusammenführen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1105.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1105.c`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: K. State und PKCE validieren, Code serverseitig tauschen, autorisierten Kanal bestimmen: getrennte Sicherheits- und Funktionsprüfungen. — YouTube-OAuth-AC; src-1105:2749 atomisieren. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1105.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-03 prüft HTTPS-Callback, state-/PKCE-Validierung, serverseitigen Codetausch und Kanalermittlung getrennt. Planning Coverage: Covered. Implementation Verification: offen.

## src-1106

- Quelle: `docs/vanventure-cockpit-plan.md:98` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1106
- Verbindlicher Originalwortlaut: 4. Vor dem Aktivieren zeigt das Cockpit Kanalname und Kanal-ID zur Bestätigung an. Nur dieser Kanal wird als aktive Verbindung gespeichert.

- BATCH-001 / PKG-036 / `SRC-1106.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „4.“ ist nur Listenmarker. — Mit SRC-1106.b/c zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1106.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „4.“ ist nur Listenmarker. — Mit SRC-1106.b/c zusammenführen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1106.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1106.c`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S. Nur der bestätigte Kanal wird aktiv gespeichert; „nur dieser“ verhindert stillen Kanalwechsel. — YouTube-OAuth-AC; src-1106:2755 mit Bestätigungs-Gate verbinden. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1106.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-03 prüft Anzeige von Kanalname und -ID, Bestätigungsgate, Abbruch und ausschließlich bestätigte aktive Kanal-ID. Planning Coverage: Covered. Implementation Verification: offen.

## src-1107

- Quelle: `docs/vanventure-cockpit-plan.md:100` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1107
- Verbindlicher Originalwortlaut: 5. Access Tokens werden bei Bedarf über den Refresh Token erneuert. Ein „Trennen“ widerruft den Token, löscht verschlüsselte Token-Daten und deaktiviert Folge-Syncs.

- BATCH-001 / PKG-036 / `SRC-1107.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „5.“ ist nur Listenmarker. — Mit SRC-1107.b/c zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1107.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: N. „5.“ ist nur Listenmarker. — Mit SRC-1107.b/c zusammenführen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1107.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1107.c`: Covered in planning by DEC-OAUTH-001; Ziel `ST-INS-03,ST-INS-01`; Remote-Widerruf soweit unterstützt, bei Nichtunterstützung/Fehler verpflichtende Fehler-/Warnungsprotokollierung ohne Secrets; lokale verschlüsselte Tokendatenlöschung und Folge-Sync-Stopp immer erforderlich. Implementation Verification: ungeprüft.
- COVERAGE-R1-020 / DEC-OAUTH-001: Nutzer akzeptiert Variante A. Remote-Widerruf soweit unterstützt; nicht unterstützter/fehlgeschlagener Widerruf wird als Fehler/Warnung ohne Tokenwerte protokolliert; lokale verschlüsselte Tokendatenlöschung und Folge-Sync-Stopp bleiben unbedingt. Planning Coverage für SRC-1107.c: Covered; Implementation Verification: offen.

## src-1108

- Quelle: `docs/vanventure-cockpit-plan.md:103` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-OPS-02,constraint-register.md#src-1108
- Verbindlicher Originalwortlaut: Benötigte APIs und minimal mögliche Scopes werden vor Go-live gegen die aktuelle Google-Dokumentation verifiziert:

- BATCH-001 / PKG-036 / `SRC-1108.a`: Partially Covered; Ziel `ST-INS-03,ST-OPS-02`; Review-Befund: K. Benötigte APIs und minimal mögliche Scopes vor Go-live anhand aktueller Google-Dokumentation verifizieren; zeitgebundener Prüfauftrag, keine dauerhaft bewiesene Tatsache. — OAuth-/Release-Gate; ST-OPS-02:625–629 berührt Scope-Verifizierung, muss YouTube-Bezug und Dokumentationsstand klar nennen; src-1108:2767. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1108.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-03 prüft vor YouTube-Go-live benötigte APIs und minimale Scopes gegen dann aktuelle Google-Dokumentation; ST-OPS-02 ist Release-Gegenstelle. Planning Coverage: Covered. Implementation Verification: offen.

## src-1109

- Quelle: `docs/vanventure-cockpit-plan.md:106` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1109
- Verbindlicher Originalwortlaut: - **YouTube Data API v3**: Kanal-, Playlist- und Video-Metadaten sowie öffentliche Video-Kennzahlen, typischerweise mit `youtube.readonly`.

- BATCH-001 / PKG-036 / `SRC-1109.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Data API v3 für Kanal-, Playlist-, Video-Metadaten und öffentliche Kennzahlen; youtube.readonly ist ausdrücklich „typischerweise“, kein ungeprüft festes Scope. — Cockpit-Daten-/OAuth-AC, src-1109:2773; tatsächliches Scope aus SRC-1108-Prüfung ableiten. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1109.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-01 prüft vier Data-API-Datenarten; youtube.readonly bleibt ein typischer, vor Go-live zu bestätigender Scope. Planning Coverage: Covered. Implementation Verification: offen.

## src-1110

- Quelle: `docs/vanventure-cockpit-plan.md:108` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1110
- Verbindlicher Originalwortlaut: - **YouTube Analytics API**: kanalbezogene Reichweiten-, Engagement-, Watchtime- und Traffic-Source-Berichte, typischerweise mit `yt-analytics.readonly`.

- BATCH-001 / PKG-036 / `SRC-1110.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K. Analytics API für Reichweite, Engagement, Watchtime, Traffic Sources; yt-analytics.readonly nur typischer Scope. — ST-INS-01:406/ST-INS-04:436 für Berichte, OAuth-Gate für Scope; src-1110:2779. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1110.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-01 und ST-INS-04 prüfen vier Analytics-Berichtsarten; yt-analytics.readonly bleibt ein typischer, vor Go-live zu bestätigender Scope. Planning Coverage: Covered. Implementation Verification: offen.

## src-1111

- Quelle: `docs/vanventure-cockpit-plan.md:111` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Getrennte OAuth-Verbindung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1111
- Verbindlicher Originalwortlaut: Die Google-OAuth-Client-ID ist Konfiguration; Client Secret und Refresh Token bleiben serverseitig. Es gibt kein Token im Browser, in HTML, in Git, in Exporten oder in Anwendungslogs.

- BATCH-001 / PKG-036 / `SRC-1111.a`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S. Client-ID ist Konfiguration; sagt allein nichts über Veröffentlichung oder Secret-Schutz. — YouTube-OAuth-Konfigurations-AC; src-1111:2785. Coverage nur Register. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1111.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S. Client Secret und Refresh Token bleiben serverseitig. — YouTube-OAuth-/Betriebs-AC; src-1111:2785. Coverage teilweise über private API-Grenze. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-036 / `SRC-1111.c`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: K. Kein Token im Browser, HTML, Git, Export oder Anwendungslog: fünf getrennte Leckpfade, jeweils für Token. — YouTube-OAuth-/Export-/Logging-Tests; src-1111:2785 atomisieren. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1111.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-03 prüft Client-ID-Konfiguration, serverseitige Secret-/Refresh-Token-Grenze und fünf Token-Leckpfade einzeln. Planning Coverage: Covered. Implementation Verification: offen.

## src-1112

- Quelle: `docs/vanventure-cockpit-plan.md:117` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1112
- Verbindlicher Originalwortlaut: Der Sync besteht aus idempotenten Schritten und kann sowohl zeitgesteuert als auch manuell von `admin` ausgeführt werden:

- BATCH-001 / PKG-036 / `SRC-1112.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K. Idempotente Schritte, Zeitsteuerung und manueller Start nur durch Admin sind getrennte Kriterien. Der Doppelpunkt verweist auf Folgeschritte außerhalb dieses Pakets; diese wurden hier nicht als zusätzliche IDs geprüft. — ST-INS-01:406 um Admin-Berechtigung und wiederholbaren Idempotenztest präzisieren; src-1112:2791. Coverage teilweise. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1112.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-01 prüft Idempotenz, Zeitstart und manuellen Admin-Start samt Editor-Gegenprobe. Planning Coverage: Covered. Implementation Verification: offen.

## src-1113

- Quelle: `docs/vanventure-cockpit-plan.md:120` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1113
- Verbindlicher Originalwortlaut: 1. Sperre pro Kanal erwerben, damit nicht zwei Läufe parallel schreiben.

- BATCH-001 / PKG-037 / `SRC-1113.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a ist nur die Listenziffer, streichen. .b ist eine eigenständige Pflicht: Sperre je Kanal, damit Sync-Läufe nicht parallel schreiben. — Teilweise: ST-INS-01:406 bindet Sync-Grenzen pauschal ein. Dort beziehungsweise in einem zugehörigen Prüftask die Kanalsperre und den Parallelstart als reproduzierbaren Prüffall benennen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1113.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist nur die Listenziffer, streichen. .b ist eine eigenständige Pflicht: Sperre je Kanal, damit Sync-Läufe nicht parallel schreiben. — Teilweise: ST-INS-01:406 bindet Sync-Grenzen pauschal ein. Dort beziehungsweise in einem zugehörigen Prüftask die Kanalsperre und den Parallelstart als reproduzierbaren Prüffall benennen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1113.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-020: ST-INS-01 prüft Kanalsperre mit zwei gleichzeitig gestarteten Läufen und fehlendem konkurrierendem Schreiben. Planning Coverage: Covered. Implementation Verification: offen.

## src-1114

- Quelle: `docs/vanventure-cockpit-plan.md:121` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1114
- Verbindlicher Originalwortlaut: 2. Verbindung und Token entschlüsseln/erneuern; bei fehlender Berechtigung den Lauf sicher abbrechen und als „Reconnect erforderlich“ markieren.

- BATCH-001 / PKG-037 / `SRC-1114.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b enthält Entschlüsselung und Erneuerung des Tokens; getrennt prüfbar. .c enthält die Bedingung fehlender Berechtigung, sicheren Abbruch und Status „Reconnect erforderlich“; Bedingung und Ergebnis zusammenhalten. — Teilweise: ST-INS-01:406 ist der richtige Bestands-Slice, aber Token-Erneuerung und Reconnect-Fehlerfall fehlen als konkrete Kriterien. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1114.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b enthält Entschlüsselung und Erneuerung des Tokens; getrennt prüfbar. .c enthält die Bedingung fehlender Berechtigung, sicheren Abbruch und Status „Reconnect erforderlich“; Bedingung und Ergebnis zusammenhalten. — Teilweise: ST-INS-01:406 ist der richtige Bestands-Slice, aber Token-Erneuerung und Reconnect-Fehlerfall fehlen als konkrete Kriterien. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1114.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1114.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b enthält Entschlüsselung und Erneuerung des Tokens; getrennt prüfbar. .c enthält die Bedingung fehlender Berechtigung, sicheren Abbruch und Status „Reconnect erforderlich“; Bedingung und Ergebnis zusammenhalten. — Teilweise: ST-INS-01:406 ist der richtige Bestands-Slice, aber Token-Erneuerung und Reconnect-Fehlerfall fehlen als konkrete Kriterien. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1114.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1115

- Quelle: `docs/vanventure-cockpit-plan.md:123` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-02,constraint-register.md#src-1115
- Verbindlicher Originalwortlaut: 3. Kanal und Videos über die Data API seitenweise abrufen und per Upsert speichern.

- BATCH-001 / PKG-037 / `SRC-1115.a`: Context; Ziel `ST-INS-01,ST-INS-02`; Review-Befund: .a streichen. .b enthält paginiertes Abrufen von Kanal/Videos und Upsert; zwei Prüfschritte. „Seitenweise“ darf nicht verloren gehen. — Falsch zugeordnet: ST-INS-04:430 behandelt Trends, nicht den Kernimport. Kernimport zu ST-INS-01:406; vollständige Pagination über 500 Videos zusätzlich zu ST-INS-02:416. R2809 entsprechend ändern. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1115.b`: Partially Covered; Ziel `ST-INS-01,ST-INS-02`; Review-Befund: .a streichen. .b enthält paginiertes Abrufen von Kanal/Videos und Upsert; zwei Prüfschritte. „Seitenweise“ darf nicht verloren gehen. — Falsch zugeordnet: ST-INS-04:430 behandelt Trends, nicht den Kernimport. Kernimport zu ST-INS-01:406; vollständige Pagination über 500 Videos zusätzlich zu ST-INS-02:416. R2809 entsprechend ändern. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1115.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1116

- Quelle: `docs/vanventure-cockpit-plan.md:124` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1116
- Verbindlicher Originalwortlaut: 4. Für den konfigurierten Zeitraum Analytics-Berichte abrufen; fehlende oder verspätete Tage beim nächsten Lauf erneut nachziehen (Lookback-Fenster mindestens 35 Tage).

- BATCH-001 / PKG-037 / `SRC-1116.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b verlangt Berichte für den konfigurierten Zeitraum. .c verlangt Nachziehen fehlender/verspäteter Tage beim nächsten Lauf und mindestens 35 Tage Lookback; in zwei testbare Kriterien trennen, ohne diese Bedingungen zu verlieren. — Teilweise: ST-INS-01:406 ist fachlich richtig, nennt weder konfigurierten Zeitraum noch 35 Tage ausdrücklich. Dort als Sync-Prüfkriterien ergänzen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1116.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b verlangt Berichte für den konfigurierten Zeitraum. .c verlangt Nachziehen fehlender/verspäteter Tage beim nächsten Lauf und mindestens 35 Tage Lookback; in zwei testbare Kriterien trennen, ohne diese Bedingungen zu verlieren. — Teilweise: ST-INS-01:406 ist fachlich richtig, nennt weder konfigurierten Zeitraum noch 35 Tage ausdrücklich. Dort als Sync-Prüfkriterien ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1116.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1116.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b verlangt Berichte für den konfigurierten Zeitraum. .c verlangt Nachziehen fehlender/verspäteter Tage beim nächsten Lauf und mindestens 35 Tage Lookback; in zwei testbare Kriterien trennen, ohne diese Bedingungen zu verlieren. — Teilweise: ST-INS-01:406 ist fachlich richtig, nennt weder konfigurierten Zeitraum noch 35 Tage ausdrücklich. Dort als Sync-Prüfkriterien ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1116.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1117

- Quelle: `docs/vanventure-cockpit-plan.md:126` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1117
- Verbindlicher Originalwortlaut: 5. Tageswerte, Video-Metriken und Laufmetadaten in einer Transaktion speichern.

- BATCH-001 / PKG-037 / `SRC-1117.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b koppelt Tageswerte, Videometriken und Laufmetadaten an eine Transaktion; die atomare Aussage ist deren gemeinsames Commit oder Rollback. — Falsch zugeordnet: R2821 weist ST-INS-04 aus. Zu ST-INS-01:406 und einem Transaktions-/Rollback-Prüfschritt verschieben. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1117.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a streichen. .b koppelt Tageswerte, Videometriken und Laufmetadaten an eine Transaktion; die atomare Aussage ist deren gemeinsames Commit oder Rollback. — Falsch zugeordnet: R2821 weist ST-INS-04 aus. Zu ST-INS-01:406 und einem Transaktions-/Rollback-Prüfschritt verschieben. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1117.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1118

- Quelle: `docs/vanventure-cockpit-plan.md:127` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1118
- Verbindlicher Originalwortlaut: 6. Snapshot-Stichtage und Insight-Aggregate aktualisieren, Lauf mit Dauer, API-Fehlern, abgedecktem Zeitraum und Datensatzanzahl abschließen.

- BATCH-001 / PKG-037 / `SRC-1118.a`: Context; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a streichen. .b trennt Snapshot-Aktualisierung, Insight-Aggregate und Laufabschluss; beim Abschluss müssen Dauer, API-Fehler, Zeitraum und Datensatzanzahl erhalten bleiben. — Teilweise: ST-INS-01:406 ist für den Sync richtig, konkretisiert aber weder Aggregate noch Abschlussmetadaten. Dort getrennte Prüfschritte ergänzen; die Anzeige der Snapshots gehört zusätzlich zu ST-INS-04:436. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1118.b`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a streichen. .b trennt Snapshot-Aktualisierung, Insight-Aggregate und Laufabschluss; beim Abschluss müssen Dauer, API-Fehler, Zeitraum und Datensatzanzahl erhalten bleiben. — Teilweise: ST-INS-01:406 ist für den Sync richtig, konkretisiert aber weder Aggregate noch Abschlussmetadaten. Dort getrennte Prüfschritte ergänzen; die Anzeige der Snapshots gehört zusätzlich zu ST-INS-04:436. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1118.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1119

- Quelle: `docs/vanventure-cockpit-plan.md:130` · VanVenture Cockpit – technische Referenz / Google-/YouTube-Integration / Wiederverwendbarer Sync
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1119
- Verbindlicher Originalwortlaut: Der reguläre Rhythmus ist ein täglicher Lauf nach Verfügbarkeit der YouTube-Daten. Ein manueller Lauf darf nur das sichere Nachzugsfenster bzw. explizit ausgewählte Daten aktualisieren, nie Historie blind überschreiben. Wiederholte Läufe müssen dieselben fachlichen Daten erzeugen, keine Duplikate.

- BATCH-001 / PKG-037 / `SRC-1119.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist sinnvoll: täglich nach Datenverfügbarkeit. .b bewahrt die Alternative sicheres Nachzugsfenster oder ausdrücklich gewählte Daten und das Verbot blinden Historien-Überschreibens. .c verlangt idempotente fachliche Daten und keine Duplikate. Kein Duplikat zwischen .b und .c: Schutzumfang und Wiederholungsergebnis sind verschieden. — Teilweise: ST-INS-01:406 nennt zeitgesteuerten/manuellen Sync, lässt Rhythmus, manuelle Begrenzung und Historienverbot offen. Diese Grenzfälle dort konkretisieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1119.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist sinnvoll: täglich nach Datenverfügbarkeit. .b bewahrt die Alternative sicheres Nachzugsfenster oder ausdrücklich gewählte Daten und das Verbot blinden Historien-Überschreibens. .c verlangt idempotente fachliche Daten und keine Duplikate. Kein Duplikat zwischen .b und .c: Schutzumfang und Wiederholungsergebnis sind verschieden. — Teilweise: ST-INS-01:406 nennt zeitgesteuerten/manuellen Sync, lässt Rhythmus, manuelle Begrenzung und Historienverbot offen. Diese Grenzfälle dort konkretisieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1119.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist sinnvoll: täglich nach Datenverfügbarkeit. .b bewahrt die Alternative sicheres Nachzugsfenster oder ausdrücklich gewählte Daten und das Verbot blinden Historien-Überschreibens. .c verlangt idempotente fachliche Daten und keine Duplikate. Kein Duplikat zwischen .b und .c: Schutzumfang und Wiederholungsergebnis sind verschieden. — Teilweise: ST-INS-01:406 nennt zeitgesteuerten/manuellen Sync, lässt Rhythmus, manuelle Begrenzung und Historienverbot offen. Diese Grenzfälle dort konkretisieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1119.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1120

- Quelle: `docs/vanventure-cockpit-plan.md:137` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1120
- Verbindlicher Originalwortlaut: Die belastbare Basis ist ein tägliches Faktenarchiv, nicht nur berechnete Momentwerte. Für jedes Video werden veröffentlichungsbezogene Kennzahlen täglich gespeichert. Bei einer Videoabfrage zeigt das Cockpit standardmäßig den heutigen Stand und Vergleiche zu den Altersstufen:

- BATCH-001 / PKG-037 / `SRC-1120.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a verlangt ein dauerhaftes tägliches Faktenarchiv statt bloßer Momentberechnung. .b verlangt tägliche veröffentlichungsbezogene Werte je Video. .c verlangt bei Videoabfrage heutigen Stand und Altersvergleiche; die Stichtage stehen in Q144–148. — Gemischte Zuordnung: Archiv und Speicherung zu ST-INS-01:406; Anzeige zu ST-INS-04:436. R2839 weist nur ST-INS-04 aus und verliert damit die Datenhaltungsarbeit. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1120.b`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a verlangt ein dauerhaftes tägliches Faktenarchiv statt bloßer Momentberechnung. .b verlangt tägliche veröffentlichungsbezogene Werte je Video. .c verlangt bei Videoabfrage heutigen Stand und Altersvergleiche; die Stichtage stehen in Q144–148. — Gemischte Zuordnung: Archiv und Speicherung zu ST-INS-01:406; Anzeige zu ST-INS-04:436. R2839 weist nur ST-INS-04 aus und verliert damit die Datenhaltungsarbeit. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1120.c`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a verlangt ein dauerhaftes tägliches Faktenarchiv statt bloßer Momentberechnung. .b verlangt tägliche veröffentlichungsbezogene Werte je Video. .c verlangt bei Videoabfrage heutigen Stand und Altersvergleiche; die Stichtage stehen in Q144–148. — Gemischte Zuordnung: Archiv und Speicherung zu ST-INS-01:406; Anzeige zu ST-INS-04:436. R2839 weist nur ST-INS-04 aus und verliert damit die Datenhaltungsarbeit. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1120.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1121

- Quelle: `docs/vanventure-cockpit-plan.md:142` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1121
- Verbindlicher Originalwortlaut: | Snapshot | Stichtag | Zweck |

- BATCH-001 / PKG-037 / `SRC-1121.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a ist ausschließlich ein Tabellenkopf und enthält keine eigenständige Anforderung. — Keine Coverage erforderlich: Als Kontext der Stichtagszeilen erhalten, nicht als atomare Klausel oder eigene Story-Zuordnung werten. Implementation Verification: ungeprüft.

## src-1122

- Quelle: `docs/vanventure-cockpit-plan.md:144` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1122
- Verbindlicher Originalwortlaut: | Tag 1 | erster verfügbarer Tagesabschluss ab Veröffentlichung | Frühindikator für Start und CTR. |

- BATCH-001 / PKG-037 / `SRC-1122.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a ist eine vollständige Stichtagsdefinition: Tag 1 = erster verfügbarer Tagesabschluss ab Veröffentlichung, Zweck Frühindikator/CTR. Diese Definition ist semantisch präziser als nur „1 Tag“. — Teilweise: ST-INS-04:436 nennt den Vergleich, nicht die Definition. Snapshot-Bildung zu ST-INS-01:406, Darstellung zu ST-INS-04:436; Definition in deren Kriterien oder verknüpftem Task festhalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1122.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1123

- Quelle: `docs/vanventure-cockpit-plan.md:145` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1123
- Verbindlicher Originalwortlaut: | Tag 7 | siebter Tagesabschluss | Woche-1-Vergleich. |

- BATCH-001 / PKG-037 / `SRC-1123.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a ist vollständig: Tag 7 = siebter Tagesabschluss, Woche-1-Vergleich. Kein zusätzlicher atomarer Teil. — Teilweise: ST-INS-04:436 nennt 7 Tage; genaue Abschlussdefinition und Bildung bei ST-INS-01:406 ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1123.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1124

- Quelle: `docs/vanventure-cockpit-plan.md:146` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1124
- Verbindlicher Originalwortlaut: | Tag 28 | 28. Tagesabschluss | belastbarerer Monatsvergleich. |

- BATCH-001 / PKG-037 / `SRC-1124.a`: Merged; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a und .b sind eine künstlich getrennte Tabellenzeile. Zu einer Klausel verbinden: Tag 28 = 28. Tagesabschluss, Monatsvergleich. — Teilweise: ST-INS-04:436 nennt 28 Tage; Definition und Materialisierung zusätzlich bei ST-INS-01:406 nachweisen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1124.b`: Merged; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a und .b sind eine künstlich getrennte Tabellenzeile. Zu einer Klausel verbinden: Tag 28 = 28. Tagesabschluss, Monatsvergleich. — Teilweise: ST-INS-04:436 nennt 28 Tage; Definition und Materialisierung zusätzlich bei ST-INS-01:406 nachweisen. Implementation Verification: ungeprüft.

## src-1125

- Quelle: `docs/vanventure-cockpit-plan.md:147` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1125
- Verbindlicher Originalwortlaut: | Tag 90 | 90. Tagesabschluss | Evergreen- und Long-Tail-Bewertung. |

- BATCH-001 / PKG-037 / `SRC-1125.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a ist vollständig: Tag 90 = 90. Tagesabschluss, Evergreen-/Long-Tail-Bewertung. — Teilweise: ST-INS-04:436 deckt Long-Tail-Anzeige grob ab; genaue Abschlussdefinition und Bildung bei ST-INS-01:406 ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1125.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1125.b`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a ist vollständig: Tag 90 = 90. Tagesabschluss, Evergreen-/Long-Tail-Bewertung. — Teilweise: ST-INS-04:436 deckt Long-Tail-Anzeige grob ab; genaue Abschlussdefinition und Bildung bei ST-INS-01:406 ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1125.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-021: Originalwortlaut gegen aktuelle ST-INS-01/-02/-04-AC abgeglichen; Planning Coverage: Covered. Historische BATCH-001-Befunde bleiben als Reviewstand erhalten. Implementation Verification: offen.

## src-1126

- Quelle: `docs/vanventure-cockpit-plan.md:148` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1126
- Verbindlicher Originalwortlaut: | Tag 365 | 365. Tagesabschluss | Jahresvergleich / Saisonwirkung. |

- BATCH-001 / PKG-037 / `SRC-1126.a`: Merged; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a und .b zusammenführen: Tag 365 = 365. Tagesabschluss, Jahres-/Saisonvergleich. Die Trennung nach „365.“ zerstört die Bedeutung. — Teilweise: ST-INS-04:436 nennt 365 Tage; Definition und Materialisierung zusätzlich bei ST-INS-01:406 nachweisen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1126.b`: Merged; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a und .b zusammenführen: Tag 365 = 365. Tagesabschluss, Jahres-/Saisonvergleich. Die Trennung nach „365.“ zerstört die Bedeutung. — Teilweise: ST-INS-04:436 nennt 365 Tage; Definition und Materialisierung zusätzlich bei ST-INS-01:406 nachweisen. Implementation Verification: ungeprüft.

## src-1127

- Quelle: `docs/vanventure-cockpit-plan.md:150` · VanVenture Cockpit – technische Referenz / Historie und Snapshot-Logik
- Anwendung (BATCH-001 Planning Coverage): ST-INS-04,ST-INS-01,constraint-register.md#src-1127
- Verbindlicher Originalwortlaut: Ein Snapshot wird erst als vollständig markiert, wenn der entsprechende Tageswert vorliegt. Ist ein Video jünger, bleibt der Wert sichtbar als „noch nicht erreicht“, nicht als Null. Korrekturen von YouTube werden durch erneute Tages-Upserts abgebildet; die Sync-Historie bewahrt, wann und mit welcher Quelle der Wert zuletzt aktualisiert wurde.

- BATCH-001 / PKG-037 / `SRC-1127.a`: Partially Covered; Ziel `ST-INS-04`; Review-Befund: .a macht Vollständigkeit vom vorhandenen Tageswert abhängig. .b verlangt für jeden noch nicht erreichten Stichtag „noch nicht erreicht“ statt Null. .c verlangt erneute Tages-Upserts für YouTube-Korrekturen. .d verlangt Zeit und Quelle der letzten Änderung in der Sync-Historie. Vier sinnvolle Klauseln; keine ist redundant. — Falsch gebündelt: Anzeige von .a/.b zu ST-INS-04:436; Upsert und Herkunftsprotokoll .c/.d zu ST-INS-01:406. Das bestehende Kriterium nennt nur junge 365-Tage-Videos und ist für 1/7/28/90 Tage zu eng. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1127.b`: Partially Covered; Ziel `ST-INS-04`; Review-Befund: .a macht Vollständigkeit vom vorhandenen Tageswert abhängig. .b verlangt für jeden noch nicht erreichten Stichtag „noch nicht erreicht“ statt Null. .c verlangt erneute Tages-Upserts für YouTube-Korrekturen. .d verlangt Zeit und Quelle der letzten Änderung in der Sync-Historie. Vier sinnvolle Klauseln; keine ist redundant. — Falsch gebündelt: Anzeige von .a/.b zu ST-INS-04:436; Upsert und Herkunftsprotokoll .c/.d zu ST-INS-01:406. Das bestehende Kriterium nennt nur junge 365-Tage-Videos und ist für 1/7/28/90 Tage zu eng. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1127.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a macht Vollständigkeit vom vorhandenen Tageswert abhängig. .b verlangt für jeden noch nicht erreichten Stichtag „noch nicht erreicht“ statt Null. .c verlangt erneute Tages-Upserts für YouTube-Korrekturen. .d verlangt Zeit und Quelle der letzten Änderung in der Sync-Historie. Vier sinnvolle Klauseln; keine ist redundant. — Falsch gebündelt: Anzeige von .a/.b zu ST-INS-04:436; Upsert und Herkunftsprotokoll .c/.d zu ST-INS-01:406. Das bestehende Kriterium nennt nur junge 365-Tage-Videos und ist für 1/7/28/90 Tage zu eng. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1127.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a macht Vollständigkeit vom vorhandenen Tageswert abhängig. .b verlangt für jeden noch nicht erreichten Stichtag „noch nicht erreicht“ statt Null. .c verlangt erneute Tages-Upserts für YouTube-Korrekturen. .d verlangt Zeit und Quelle der letzten Änderung in der Sync-Historie. Vier sinnvolle Klauseln; keine ist redundant. — Falsch gebündelt: Anzeige von .a/.b zu ST-INS-04:436; Upsert und Herkunftsprotokoll .c/.d zu ST-INS-01:406. Das bestehende Kriterium nennt nur junge 365-Tage-Videos und ist für 1/7/28/90 Tage zu eng. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1127.d mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1128

- Quelle: `docs/vanventure-cockpit-plan.md:157` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1128
- Verbindlicher Originalwortlaut: Neue Tabellen verwenden den Präfix `yt_`; Namen sind Vorschläge für die spätere Migration. Primärschlüssel, Foreign Keys, `created_at`/`updated_at` und sinnvolle Indizes gehören verbindlich in die Migration.

- BATCH-001 / PKG-037 / `SRC-1128.a`: Unresolved; Ziel `ST-INS-01`; Review-Befund: .a nennt yt_ als Präfix; .b erklärt Tabellennamen zu Vorschlägen; .c macht Schlüssel, Zeitstempel und sinnvolle Indizes für die Migration verbindlich. Diese Modalitäten dürfen nicht zu „alle genannten Namen sind verpflichtend“ zusammengezogen werden. — Unresolved: ST-INS-01:406 ist der passende technische Slice. Der Präfixwortlaut kollidiert bei wörtlicher Anwendung mit den unmittelbar folgenden content_*, master_* und scrum_*-Beispielen. R2887 muss den geklärten Geltungsbereich und den Vorschlagsstatus der Namen getrennt ausweisen. Offene Frage: Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1128.b`: Unresolved; Ziel `ST-INS-01`; Review-Befund: .a nennt yt_ als Präfix; .b erklärt Tabellennamen zu Vorschlägen; .c macht Schlüssel, Zeitstempel und sinnvolle Indizes für die Migration verbindlich. Diese Modalitäten dürfen nicht zu „alle genannten Namen sind verpflichtend“ zusammengezogen werden. — Unresolved: ST-INS-01:406 ist der passende technische Slice. Der Präfixwortlaut kollidiert bei wörtlicher Anwendung mit den unmittelbar folgenden content_*, master_* und scrum_*-Beispielen. R2887 muss den geklärten Geltungsbereich und den Vorschlagsstatus der Namen getrennt ausweisen. Offene Frage: Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1128.c`: Unresolved; Ziel `ST-INS-01`; Review-Befund: .a nennt yt_ als Präfix; .b erklärt Tabellennamen zu Vorschlägen; .c macht Schlüssel, Zeitstempel und sinnvolle Indizes für die Migration verbindlich. Diese Modalitäten dürfen nicht zu „alle genannten Namen sind verpflichtend“ zusammengezogen werden. — Unresolved: ST-INS-01:406 ist der passende technische Slice. Der Präfixwortlaut kollidiert bei wörtlicher Anwendung mit den unmittelbar folgenden content_*, master_* und scrum_*-Beispielen. R2887 muss den geklärten Geltungsbereich und den Vorschlagsstatus der Namen getrennt ausweisen. Offene Frage: Gilt yt_ ausschließlich für YouTube-Tabellen, während content_*, master_* und scrum_* eigene Namensräume behalten? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Unresolved (nur Präfixumfang); übrige Klauseln Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1129

- Quelle: `docs/vanventure-cockpit-plan.md:161` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1129
- Verbindlicher Originalwortlaut: | Tabelle | Kernfelder | Zweck |

- BATCH-001 / PKG-037 / `SRC-1129.a`: Context; Ziel `ST-INS-01`; Review-Befund: .a ist nur der Kopf der Datenmodelltabelle. — Keine Coverage erforderlich: Als Kontext erhalten; nicht als bindende atomare Klausel zählen. Implementation Verification: ungeprüft.

## src-1130

- Quelle: `docs/vanventure-cockpit-plan.md:163` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1130
- Verbindlicher Originalwortlaut: | `yt_connections` | `id`, `channel_id`, `channel_title`, `status`, `token_ciphertext`, `token_iv`, `token_tag`, `scopes`, `connected_by`, `connected_at`, `last_sync_at` | Aktive bzw. frühere, verschlüsselt gespeicherte Kanalverbindungen. |

- BATCH-001 / PKG-037 / `SRC-1130.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a beschreibt den Verbindungsdatensatz samt aktiven/früheren Verbindungen und verschlüsselt gespeicherten Token-Feldern. Feldliste, Historienzweck und Verschlüsselung getrennt prüfbar; der Tabellenname bleibt nach Q157 Vorschlag. — Teilweise: ST-INS-01:406 nennt verschlüsselte Verbindung, aber nicht ehemalige Verbindungen/Feldumfang. Als Schema- und Schutzprüfschritt dort konkretisieren. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1130.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1131

- Quelle: `docs/vanventure-cockpit-plan.md:164` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1131
- Verbindlicher Originalwortlaut: | `yt_sync_runs` | `id`, `connection_id`, `kind`, `status`, `started_at`, `finished_at`, `from_date`, `to_date`, `records_written`, `error_code`, `error_detail_safe` | Nachvollziehbarkeit, Monitoring und Fehlersuche ohne Geheimnisse. |

- BATCH-001 / PKG-037 / `SRC-1131.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a beschreibt Laufdatensatz, Status/Zeitraum/Zahl/Fehler sowie Nachvollziehbarkeit ohne Geheimnisse. „error_detail_safe“ darf kein Secret enthalten. — Teilweise: ST-INS-01:406 nennt Monitoring/Audit, aber keinen konkreten Laufnachweis oder Safe-Error-Prüffall. Dort ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1131.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1132

- Quelle: `docs/vanventure-cockpit-plan.md:165` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-02,constraint-register.md#src-1132
- Verbindlicher Originalwortlaut: | `yt_videos` | `video_id`, `connection_id`, `title`, `description`, `published_at`, `duration_seconds`, `privacy_status`, `thumbnail_url`, `metadata`, `last_seen_at` | Normalisierte Data-API-Metadaten; `video_id` eindeutig. |

- BATCH-001 / PKG-037 / `SRC-1132.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-02`; Review-Befund: .a beschreibt normalisierte Video-Metadaten aus der Data API; .b verlangt eindeutige video_id. Das sind verschiedene Prüfungen. Der vorgeschlagene Tabellenname ist kein starrer Migrationsname. — Falsch zugeordnet: R2911 nennt ST-INS-04. Speicherung/Eindeutigkeit gehören zu ST-INS-01:406; paginierte Vollständigkeit berührt ST-INS-02:416. ST-INS-04 liest diese Daten lediglich für die Auswertung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1132.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1132.b`: Partially Covered; Ziel `ST-INS-01,ST-INS-02`; Review-Befund: .a beschreibt normalisierte Video-Metadaten aus der Data API; .b verlangt eindeutige video_id. Das sind verschiedene Prüfungen. Der vorgeschlagene Tabellenname ist kein starrer Migrationsname. — Falsch zugeordnet: R2911 nennt ST-INS-04. Speicherung/Eindeutigkeit gehören zu ST-INS-01:406; paginierte Vollständigkeit berührt ST-INS-02:416. ST-INS-04 liest diese Daten lediglich für die Auswertung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1132.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1133

- Quelle: `docs/vanventure-cockpit-plan.md:166` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1133
- Verbindlicher Originalwortlaut: | `yt_channel_daily_metrics` | `connection_id`, `metric_date`, `views`, `watch_time_minutes`, `subscribers_gained`, `subscribers_lost`, `estimated_revenue`, `metrics_json` | Tägliche Kanalwerte, eindeutig je Kanal/Datum. |

- BATCH-001 / PKG-037 / `SRC-1133.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a umfasst die aufgeführten täglichen Kanalmetriken und Eindeutigkeit pro Kanal/Datum. Feldumfang und Unique-/Upsert-Schlüssel getrennt testen. — Falsch zugeordnet: R2917 nennt ST-INS-05 (Produktionszeit-Effizienz). Zu ST-INS-01:406 verschieben. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1133.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1134

- Quelle: `docs/vanventure-cockpit-plan.md:167` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1134
- Verbindlicher Originalwortlaut: | `yt_video_daily_metrics` | `video_id`, `metric_date`, `views`, `watch_time_minutes`, `average_view_duration`, `impressions`, `impressions_ctr`, `likes`, `comments`, `metrics_json` | Tägliche Video-Kennzahlen, eindeutig je Video/Datum. |

- BATCH-001 / PKG-037 / `SRC-1134.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a umfasst tägliche Videometriken einschließlich Impressions/CTR und Eindeutigkeit pro Video/Datum. Fehlende API-Werte nicht mit echten Nullwerten verwechseln; die Quelle nennt hier den Feldumfang, nicht eine neue Freigabe aller Werte. — Falsch zugeordnet: R2923 nennt ST-INS-05. Speicherung zu ST-INS-01:406; Nutzung in Vergleichen zusätzlich ST-INS-04:436. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1134.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1135

- Quelle: `docs/vanventure-cockpit-plan.md:168` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1135
- Verbindlicher Originalwortlaut: | `yt_video_snapshots` | `video_id`, `age_days` (1/7/28/90/365), `snapshot_date`, `metrics_json`, `complete` | Materialisierte Vergleichsstichtage aus Tagesdaten. |

- BATCH-001 / PKG-037 / `SRC-1135.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: .a beschreibt materialisierte Snapshots aus Tagesdaten mit Alterswerten 1/7/28/90/365 und complete. Datenherkunft und Vollständigkeitszustand sind getrennte Prüfungen. — Falsch zugeordnet: R2929 nennt ST-INS-05. Materialisierung zu ST-INS-01:406; Anzeige/Auswertung zu ST-INS-04:436. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1135.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1136

- Quelle: `docs/vanventure-cockpit-plan.md:169` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1136
- Verbindlicher Originalwortlaut: | `yt_sync_locks` | `connection_id`, `locked_until`, `run_id` | Datenbankgestützte Ausschluss-Sperre für Syncs. |

- BATCH-001 / PKG-037 / `SRC-1136.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist eine konkrete datenbankgestützte Ausschlusssperre je Verbindung mit Ablauf und Laufbezug; semantisch ein Schema-/Concurrency-Kriterium. — Teilweise: ST-INS-01:406 nennt eine Datenbanksperre. Ablauf- und konkurrierender-Lauf-Prüfung ergänzen. Kein zweiter fachlicher Sync-Slice nötig. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1136.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1137

- Quelle: `docs/vanventure-cockpit-plan.md:170` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-05,constraint-register.md#src-1137
- Verbindlicher Originalwortlaut: | `content_items` | `id`, `planned_year`, `slot`, `title_working`, `format`, `pillar`, `status`, `target_publish_date`, `youtube_video_id`, `brief`, `estimated_hours`, `actual_hours`, `owner`, `updated_by` | Editorialer Jahresplan; `format=longform` und zwölf nummerierte Slots sind der Standard. Stundenwerte machen die spätere Nutzen-pro-Stunde-Review nachvollziehbar. |

- BATCH-001 / PKG-037 / `SRC-1137.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist der redaktionelle Jahresplan mit Feldern. .b macht Longform und zwölf nummerierte Slots zum Standard, nicht zu einem Verbot zusätzlicher Formate. .c bindet Stundenfelder an eine spätere Nutzen-pro-Stunde-Review. — Gemischte Zuordnung: Jahresplan/Slots zu bestehendem Planner ST-INS-01:406; getrennte Soll-/Ist-Stunden und Review zu ST-INS-05:446. R2941 weist alles ST-INS-05 zu und hebt damit Bestandsfunktion fälschlich in eine geplante Story. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1137.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: .a ist der redaktionelle Jahresplan mit Feldern. .b macht Longform und zwölf nummerierte Slots zum Standard, nicht zu einem Verbot zusätzlicher Formate. .c bindet Stundenfelder an eine spätere Nutzen-pro-Stunde-Review. — Gemischte Zuordnung: Jahresplan/Slots zu bestehendem Planner ST-INS-01:406; getrennte Soll-/Ist-Stunden und Review zu ST-INS-05:446. R2941 weist alles ST-INS-05 zu und hebt damit Bestandsfunktion fälschlich in eine geplante Story. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-037 / `SRC-1137.c`: Partially Covered; Ziel `ST-INS-05`; Review-Befund: .a ist der redaktionelle Jahresplan mit Feldern. .b macht Longform und zwölf nummerierte Slots zum Standard, nicht zu einem Verbot zusätzlicher Formate. .c bindet Stundenfelder an eine spätere Nutzen-pro-Stunde-Review. — Gemischte Zuordnung: Jahresplan/Slots zu bestehendem Planner ST-INS-01:406; getrennte Soll-/Ist-Stunden und Review zu ST-INS-05:446. R2941 weist alles ST-INS-05 zu und hebt damit Bestandsfunktion fälschlich in eine geplante Story. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1137.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-022: Original mit aktuellen ST-INS-01/-04/-05-AC abgeglichen; Planning Coverage: Covered. Tabellenbezeichnungen sind Vorschläge; keine heutige Migration oder Implementation Verification behauptet.

## src-1138

- Quelle: `docs/vanventure-cockpit-plan.md:171` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-05,constraint-register.md#src-1138
- Verbindlicher Originalwortlaut: | `content_item_metrics` | `content_item_id`, `metric_name`, `target_value`, `actual_value`, `evaluated_at` | Ziele und Auswertung der geplanten Videos. |

- COVERAGE-R1-023 / `SRC-1138.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-05`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1139

- Quelle: `docs/vanventure-cockpit-plan.md:172` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1139
- Verbindlicher Originalwortlaut: | `master_context_entries` | `id`, `category`, `title`, `body`, `status`, `source_url`, `effective_from`, `effective_to`, `updated_by` | Versionierbare, redaktionell gepflegte Faktenbasis. |

- COVERAGE-R1-023 / `SRC-1139.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1140

- Quelle: `docs/vanventure-cockpit-plan.md:173` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,constraint-register.md#src-1140
- Verbindlicher Originalwortlaut: | `scrum_items` | `id`, `type`, `title`, `description`, `priority`, `parent_id`, `created_at`, `due_date`, `archived_at` | Epics, Stories, Tasks, To-dos und Warnungs-Tasks für das Familien-Scrum-Board. |

- COVERAGE-R1-023 / `SRC-1140.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1141

- Quelle: `docs/vanventure-cockpit-plan.md:174` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,constraint-register.md#src-1141
- Verbindlicher Originalwortlaut: | `scrum_board_positions` | `item_id`, `lane`, `column`, `sort_order`, `moved_at`, `moved_by` | Aktuelle Board-Position; `lane=fast_track|scrum`. |

- COVERAGE-R1-023 / `SRC-1141.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.
- COVERAGE-R1-023 / `SRC-1141.b`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1142

- Quelle: `docs/vanventure-cockpit-plan.md:175` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,constraint-register.md#src-1142
- Verbindlicher Originalwortlaut: | `scrum_work_assignments` | `item_id`, `assignee_user_id`, `claimed_at`, `released_at`, `claimed_by` | Aktuelle und historische Übernahmen. |

- COVERAGE-R1-023 / `SRC-1142.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1143

- Quelle: `docs/vanventure-cockpit-plan.md:176` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,constraint-register.md#src-1143
- Verbindlicher Originalwortlaut: | `scrum_item_events` | `id`, `item_id`, `actor_type`, `actor_id`, `action`, `before_safe`, `after_safe`, `created_at` | Für Nutzer sichtbarer, datensparsamer Kartenverlauf. |

- COVERAGE-R1-023 / `SRC-1143.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1144

- Quelle: `docs/vanventure-cockpit-plan.md:177` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-03,constraint-register.md#src-1144
- Verbindlicher Originalwortlaut: | `scrum_alert_inbox` | `event_id`, `source`, `alert_key`, `vehicle_id`, `severity`, `payload_safe`, `received_at`, `status` | Idempotente Warnungseingänge ohne Geheimnisse. |

- COVERAGE-R1-023 / `SRC-1144.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-03`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1145

- Quelle: `docs/vanventure-cockpit-plan.md:178` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-03,constraint-register.md#src-1145
- Verbindlicher Originalwortlaut: | `scrum_alert_links` | `inbox_event_id`, `item_id`, `resolution_state`, `last_source_update_at` | Zuordnung einer Warnung zur Karte. |

- COVERAGE-R1-023 / `SRC-1145.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-BRD-03`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1146

- Quelle: `docs/vanventure-cockpit-plan.md:179` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,ST-BRD-01,constraint-register.md#src-1146
- Verbindlicher Originalwortlaut: | `cockpit_audit_log` | `id`, `actor`, `action`, `entity_type`, `entity_id`, `before_safe`, `after_safe`, `created_at` | Auditierbare Admin-, OAuth-, Sync- und Planungsaktionen ohne Token/Passwortwerte. |

- COVERAGE-R1-023 / `SRC-1146.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-01,ST-AUTH-01,ST-BRD-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1147

- Quelle: `docs/vanventure-cockpit-plan.md:181` · VanVenture Cockpit – technische Referenz / Datenmodell (PostgreSQL)
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1147
- Verbindlicher Originalwortlaut: `metrics_json` bewahrt API-Metriken, die noch nicht als eigene Spalte benötigt werden. Häufig gefilterte Kernmetriken bleiben relationale Spalten. Für alle Tagesmetriken ist ein Upsert-Schlüssel aus Entität und Datum verpflichtend.

- COVERAGE-R1-023 / `SRC-1147.a`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.
- COVERAGE-R1-023 / `SRC-1147.b`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.
- COVERAGE-R1-023 / `SRC-1147.c`: Planning Coverage **Covered**; aktuelle Acceptance Criteria bei `ST-INS-01`. Originalwortlaut und Review-Befund oben bleiben Quelle; Feld-/Verhaltens- und Negativprüfungen stehen im Story-AC. Implementation Verification, Freigabe und Live-Zustand ungeprüft.

## src-1148

- Quelle: `docs/vanventure-cockpit-plan.md:187` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1148
- Verbindlicher Originalwortlaut: Die Cockpit-Oberfläche konsumiert ausschließlich JSON-Endpunkte unter `/api/cockpit`. HTML- und Client-Assets sind Präsentation, nicht die einzige Integrationsmöglichkeit. Alle Antworten enthalten eine stabile Version bzw. bei Listen ein eindeutiges Paginierungsformat; Zeitstempel sind ISO-8601 in UTC.

- BATCH-001 / PKG-038 / `SRC-1148.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Q187, R3004–3008, P412 — Ausschließlich JSON unter /api/cockpit ist korrekt erfasst und in P412 sinngemäß gedeckt. „Ausschließlich“ und Präfix als API-Kriterium explizit erhalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1148.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Q188, R3004–3008, P412 — Eigenständige Integrationsmöglichkeit jenseits HTML/Client-Assets; P412 sagt nur, dass Ansichten die API nutzen. API als separat nutzbare Schnittstelle bei ST-INS-01 ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1148.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q189–190, R3004–3008, P412 — „Stabile Version“ bzw. eindeutiges Listen-Paginierungsformat darf nicht zu „beides für jede Antwort“ verschärft werden. Antwort- und Listenfall getrennt als API-Kriterien aufnehmen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1148.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Q190, R3004–3008, P412 — ISO-8601/UTC für Zeitstempel ist eindeutig; in P412 fehlt ein beobachtbares Kriterium. Bei ST-INS-01 ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1148.d mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1150

- Quelle: `docs/vanventure-cockpit-plan.md:194` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1150
- Verbindlicher Originalwortlaut: | Status/Dashboard | `GET /api/cockpit/overview`, `GET /api/cockpit/health` | angemeldet |

- BATCH-001 / PKG-038 / `SRC-1150.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q194, R3010–3014, P412/585/603 — Zwei Dashboard-/Status-GET-Endpunkte und „angemeldet“ sind zu trennen. ST-BRD-01/03 sind fachlich falsch; ST-INS-01, bei Bedarf eigener Dashboard-Slice, mit Endpunkt- und Zugriffsprüfung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1150.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1151

- Quelle: `docs/vanventure-cockpit-plan.md:195` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1151
- Verbindlicher Originalwortlaut: | Videos | `GET /api/cockpit/videos`, `GET /api/cockpit/videos/:id`, `GET /api/cockpit/videos/:id/snapshots` | angemeldet |

- BATCH-001 / PKG-038 / `SRC-1151.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K — Q195, R3016–3020, P412/442 — Liste, Detail, Snapshots und angemeldeter Zugriff sind getrennte Prüfungen. ST-INS-04 deckt Detailvergleich teilweise, nicht Bestandsliste und Zugriff. Bestand zu ST-INS-01, neue Zeitreihen zu ST-INS-04. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1151.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 und ST-INS-04 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1152

- Quelle: `docs/vanventure-cockpit-plan.md:196` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1152
- Verbindlicher Originalwortlaut: | Planung | `GET/POST /api/cockpit/content`, `PUT /api/cockpit/content/:id` | lesen: angemeldet; schreiben: editor/admin |

- BATCH-001 / PKG-038 / `SRC-1152.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q196, R3022–3026, P412 — GET und schreibende POST/PUT wurden in einem Fragment mit nur der Leseberechtigung vermischt. Nach Methode und Rolle splitten; ST-INS-01 als Bestandsfunktion mit konkreten API-Kriterien. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1152.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1152.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q196, R3022–3026, P412 — „schreiben: editor/admin“ ist ohne Bezug auf POST und PUT kein selbstständiger Testfall. Mit beiden Mutationen verbinden und Rollenabwehr prüfen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1152.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1153

- Quelle: `docs/vanventure-cockpit-plan.md:197` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1153
- Verbindlicher Originalwortlaut: | Master Context | `GET /api/cockpit/context`, `POST/PUT /api/cockpit/context/:id` | lesen: angemeldet; schreiben: editor/admin |

- BATCH-001 / PKG-038 / `SRC-1153.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q197, R3028–3032, P412 — Analog: Context-GET und POST/PUT samt Leserecht auseinanderziehen. ST-INS-01 passt thematisch; konkrete Endpunkte fehlen dort. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1153.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1153.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q197, R3028–3032, P412 — Editor/Admin gilt für Context-Schreibmethoden; Fragment braucht diese Bindung. Bei ST-INS-01 explizite Positiv-/Negativprüfung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1153.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1154

- Quelle: `docs/vanventure-cockpit-plan.md:198` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,ST-BRD-04,constraint-register.md#src-1154
- Verbindlicher Originalwortlaut: | Familien-Scrum-Board | `GET /api/cockpit/scrum/backlog`, `GET /api/cockpit/scrum/board`, `POST/PUT /api/cockpit/scrum/items`, `POST /api/cockpit/scrum/items/:id/move` | lesen und schreiben: editor/admin; Marvin nur mit eingeschränktem Dienstrecht |

- BATCH-001 / PKG-038 / `SRC-1154.a`: Partially Covered; Ziel `ST-BRD-01`; Review-Befund: K — Q198, R3034–3038, P585/603 — Vier Board-Operationen und Lese-/Schreibrolle sind mehrere Klauseln. ST-BRD-01 ist Ziel; ST-BRD-03 nur für warnungsbezogene Nutzung. P585 nennt den Pfad allgemein, aber weder alle Methoden noch die präzise Rollenmatrix. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1154.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1154.b`: Partially Covered; Ziel `ST-BRD-04`; Review-Befund: S — Q198, R3034–3038, P613 — Marvins eingeschränktes Dienstrecht ist eigenständig. ST-BRD-04 ist die präzisere Zielstory; ST-BRD-01/03 allein verschleiern die gesonderten Grenzen. P613 bewahrt Auftrag, Verbote und Audit. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1154.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-BRD-01 und ST-BRD-04 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1155

- Quelle: `docs/vanventure-cockpit-plan.md:199` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,constraint-register.md#src-1155
- Verbindlicher Originalwortlaut: | OAuth | `POST /api/cockpit/youtube/connect`, `GET /api/cockpit/youtube/callback`, `POST /api/cockpit/youtube/disconnect` | admin |

- BATCH-001 / PKG-038 / `SRC-1155.a`: Partially Covered; Ziel `ST-INS-03`; Review-Befund: K — Q199, R3040–3044, P428/476 — Connect, Callback und Disconnect sind drei Handlungen mit Admin-Grenze. ST-AUTH-01 betrifft primär Login; YouTube-Trennung hat in ST-INS-03 bereits eine geplante Story (P428–434). Nicht vollständig einem erledigten Auth-Stand zuschreiben. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1155.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-03 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1156

- Quelle: `docs/vanventure-cockpit-plan.md:200` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1156
- Verbindlicher Originalwortlaut: | Synchronisierung | `GET /api/cockpit/sync-runs`, `POST /api/cockpit/sync` | lesen: angemeldet; starten: admin |

- BATCH-001 / PKG-038 / `SRC-1156.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q200, R3046–3050, P412 — Sync-Lauf-Lesen und Sync-Start sind unterschiedliche Operationen; GET/angemeldet zusammenführen, POST separat. ST-INS-01 passt zum historischen Sync, benötigt präzise Rollen-AC. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1156.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1156.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q200, R3046–3050, P412 — Admin für POST /sync ist nur mit dem Endpunkt atomar. Mit Startaktion verbinden; Ablehnung anderer Rollen prüfen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1156.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1157

- Quelle: `docs/vanventure-cockpit-plan.md:202` · VanVenture Cockpit – technische Referenz / API-first-Architektur
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1157
- Verbindlicher Originalwortlaut: Der OAuth-Callback ist eine enge Ausnahme: Er validiert den kurzlebigen Serverzustand und führt danach zurück in die private Oberfläche. Fehlerantworten zeigen keine Google-Antwortdetails mit personenbezogenen oder geheimen Daten.

- BATCH-001 / PKG-038 / `SRC-1157.a`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: K — Q202–203, R3052–3056, P476 — Enge Callback-Ausnahme, Validierung des kurzlebigen Serverzustands und Rückleitung in private Oberfläche sind drei Teilbedingungen. Ziel eher YouTube-OAuth bei ST-INS-01/03 als allgemeiner Login bei ST-AUTH-01; genauen Callback und Ausnahmeumfang festhalten. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1157.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1157.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S — Q203–204, R3052–3056, P476 — Verbot personenbezogener/geheimer Google-Antwortdetails in Fehlern ist klar. P476 erwähnt Audit ohne Secrets, nicht diese Fehlerantwort; negatives Callback-Kriterium ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1157.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-03 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1158

- Quelle: `docs/vanventure-cockpit-plan.md:210` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Dashboard
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1158
- Verbindlicher Originalwortlaut: - Zeitraumfilter (z. B. 28/90/365 Tage) und Zeitpunkt der letzten erfolgreichen Synchronisierung.

- BATCH-001 / PKG-038 / `SRC-1158.a`: Merged; Ziel `ST-INS-01`; Review-Befund: K — Q210, R3058–3062, P585/603 — Trennung bei „z.“ zerstört die Aussage. Mit 1158.b zum Zeitraumfilter einschließlich beispielhafter, nicht starrer 28/90/365-Tage-Werte rekonstruieren. Dashboard-Ziel statt Board-Story. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1158.b`: Merged; Ziel `ST-INS-01`; Review-Befund: K — Q210–211, R3058–3062, P585/603 — Enthält Ende des Beispiels und letzten erfolgreichen Sync-Zeitpunkt; letzteres eigene Klausel. Beides bei ST-INS-01 beziehungsweise einem Dashboard-Slice abnehmen. Implementation Verification: ungeprüft.

## src-1159

- Quelle: `docs/vanventure-cockpit-plan.md:212` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Dashboard
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1159
- Verbindlicher Originalwortlaut: - Kanal-KPIs: Views, Watchtime, Netto-Abonnenten, Impressionen/CTR und – nur wenn berechtigt und verfügbar – Umsatz.

- BATCH-001 / PKG-038 / `SRC-1159.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q212–213, R3064–3068, P585/603 — Kanal-KPIs und bedingter Umsatz trennen. Umsatz nur bei Berechtigung und Verfügbarkeit; keine Pflicht zur Anzeige ohne Daten. Board-Zuordnung falsch; Dashboard-AC ergänzen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1159.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-024: Die aktuelle, atomar prüfbare Planning Coverage steht in ST-INS-01 (Acceptance Criteria). Der Originalwortlaut oben bleibt bindend; der frühere PKG-038-Hinweis ist Review-Historie. Implementation Verification und Live-Nachweis offen.

## src-1160

- Quelle: `docs/vanventure-cockpit-plan.md:214` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Dashboard
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1160
- Verbindlicher Originalwortlaut: - Entwicklung gegenüber dem vorherigen Vergleichszeitraum, Top-/Flop-Videos und Datenqualitäts-Hinweise.

- BATCH-001 / PKG-038 / `SRC-1160.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K — Q214–215, R3070–3074, P585/603 — Vorperiodenvergleich, Top-/Flop-Videos und Datenqualität sind getrennte beobachtbare Ergebnisse. Dashboard-Ziel; P442 behandelt Video-Trends, deckt diese Dashboard-Ansicht nicht vollständig. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-02 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1161

- Quelle: `docs/vanventure-cockpit-plan.md:216` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Dashboard
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1161
- Verbindlicher Originalwortlaut: - Nächste Inhalte aus dem Planner und offene Insight-Empfehlungen.

- BATCH-001 / PKG-038 / `SRC-1161.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q216, R3076–3080, P585/603 — Nächste Planner-Inhalte und offene Insight-Empfehlungen sind zwei Datenquellen. Dashboard-Ziel, nicht Familien-Board; beide Anzeigen separat prüfen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-02 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1162

- Quelle: `docs/vanventure-cockpit-plan.md:220` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Videos
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1162
- Verbindlicher Originalwortlaut: - Filterbare Tabelle aller erkannten Videos mit Titel, Veröffentlichung, Format/Pillar, aktuellen Kennzahlen und Sync-Status.

- BATCH-001 / PKG-038 / `SRC-1162.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q220–221, R3082–3086, P412/442 — Tabelle und Filter sowie sechs angezeigte Angaben gehören in ein detailliertes Listen-AC. ST-INS-04 behandelt neue Trends; bestehende Video-Liste gehört zu ST-INS-01. Vollständigkeit „aller erkannten Videos“ erhalten. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-03 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1163

- Quelle: `docs/vanventure-cockpit-plan.md:222` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Videos
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1163
- Verbindlicher Originalwortlaut: - Jede Videozeile führt die Aktion „Einordnen“ als eigenständige, deutlich erkennbare und per Tastatur erreichbare Schaltfläche. **Am 22. September 2026 live ausgerollt und technisch geprüft; die Sichtabnahme mit echten Daten bleibt offen.**

- BATCH-001 / PKG-038 / `SRC-1163.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q222–223, R3088–3092, P412/442 — „Einordnen“ umfasst eigene Schaltfläche je Zeile, deutliche Erkennbarkeit und Tastaturzugang. Als Bestands-/Sichtprüfpunkt bei ST-INS-01 oder eigener Video-UI-Story; P442 deckt es nicht. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1163.b`: Merged; Ziel `ST-INS-01`; Review-Befund: K — Q223, R3088–3092 — „Am 22.“ ist kein atomarer Kandidat. Mit 1163.c zum datierten historischen Live-/Techniknachweis verbinden; keinesfalls als aktuelle Verifikation übernehmen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1163.c`: Merged; Ziel `ST-INS-01`; Review-Befund: K — Q223–224, R3088–3092 — Ohne 1163.b fehlt das Datum. Historischen Status separat von der Funktionsanforderung bei ST-INS-01 dokumentieren. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1163.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Q224–225, R3088–3092 — Offene Sichtabnahme mit echten Daten ist eine eigenständige offene Arbeit. Konkreten Prüf-Task bei der Bestands-/Video-UI-Story anlegen; ST-INS-04 „Planned“ ersetzt diese Abnahme nicht. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-01 / TASK-COVR1-025-03 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1164

- Quelle: `docs/vanventure-cockpit-plan.md:226` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Videos
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1164
- Verbindlicher Originalwortlaut: - Detailseite mit Zeitreihe, Traffic-/Engagement-Werten soweit von der API geliefert, sowie 1/7/28/90/365-Snapshot-Vergleich.

- BATCH-001 / PKG-038 / `SRC-1164.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K — Q226–227, R3094–3098, P442 — Zeitreihe, nur von der API gelieferte Traffic-/Engagement-Werte und fünf Snapshot-Alter sind separat prüfbar. ST-INS-04 deckt Vergleich und Datenlücken weitgehend; „soweit geliefert“ als Grenze und Detailseiten-Zeitreihe ausdrücklich erhalten. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-06 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1165

- Quelle: `docs/vanventure-cockpit-plan.md:228` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Videos
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1165
- Verbindlicher Originalwortlaut: - Verknüpfung eines YouTube-Videos mit einem `content_items`-Eintrag, ohne Daten aus YouTube zurückzuschreiben.

- BATCH-001 / PKG-038 / `SRC-1165.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q228–229, R3100–3104, P412/442 — Verknüpfung mit content_items und kein Zurückschreiben nach YouTube trennen. Zuordnung zu ST-INS-04 falsch; Bestandsfunktion von Videos/Planner bei ST-INS-01 und negatives Schreibkriterium dort ergänzen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-03 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1166

- Quelle: `docs/vanventure-cockpit-plan.md:233` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Content Planner
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1166
- Verbindlicher Originalwortlaut: Pro Kalenderjahr werden zwölf Longform-Slots als Startgerüst angelegt: etwa einer pro Monat, mit bewusst verschiebbaren Veröffentlichungsdaten. Jeder Eintrag enthält Arbeitstitel, Zielgruppe, Themen-Pillar, Format, Ziel/KPI, Produktionsstatus, Verantwortung, Brief und spätere YouTube-Verknüpfung. Mögliche Statusfolge: `idea → validated → briefed → production → scheduled → published → reviewed`. Kurzformate können ergänzend geplant werden, dürfen aber die Longform-Jahresplanung nicht verdrängen.

- BATCH-001 / PKG-038 / `SRC-1166.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q233–234, R3106–3110, P452 — Zwölf Longform-Slots pro Kalenderjahr sind Startgerüst; „etwa monatlich“ und verschiebbare Daten sind Flexibilitätsbedingungen. ST-INS-05 betrifft Nutzen pro Stunde und deckt Jahresanlage nicht. Eigene Planner-Story oder Bestandsprüfung bei ST-INS-01. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1166.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q234–236, R3106–3110, P452 — Mehrere Pflichtangaben je Eintrag; Ziel/KPI, Verantwortung, Brief und spätere YouTube-Verknüpfung fehlen als Gesamtprüfung in P452. Planner-Datensatz als eigenes AC mit allen Feldern; „später“ nicht zu sofortiger Verknüpfung verschärfen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1166.c`: Context; Ziel `ST-INS-01`; Review-Befund: S — Q236–237, R3106–3110, P452 — Die Statusfolge ist ausdrücklich möglich, keine verbindlich einzig erlaubte Transition-Maschine. Als optionale Referenz im Planner erhalten, nicht als starres AC umdeuten. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1166.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: K — Q238–239, R3106–3110, P452 — Kurzformate dürfen ergänzen; sie dürfen die Longform-Jahresplanung nicht verdrängen. Beide Seiten als Planner-Regel erfassen. P452 deckt sie nicht. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-04 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1167

- Quelle: `docs/vanventure-cockpit-plan.md:243` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Familien-Scrum-Board
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-01,ST-BRD-02,constraint-register.md#src-1167
- Verbindlicher Originalwortlaut: Das private Board ist die gemeinsame, tabletoptimierte Arbeitszentrale für Familie, Reise, Fahrzeug, Haushalt und VanVenture-Aufgaben; es ersetzt den Content Planner nicht. Ein separates Backlog führt ungeplante Ideen, Epics, Stories, Tasks und To-dos. Auf dem Board stehen die Zeilen **Fast Track** und **Scrum Board** mit `Offen → Bereit → In Arbeit → Review → Done`. Der Wechsel nach **In Arbeit** erfordert eine Übernahme, Review verlangt eine Sicht- oder Rückmeldeprüfung und Done eine bewusste Bestätigung.

- BATCH-001 / PKG-038 / `SRC-1167.a`: Partially Covered; Ziel `ST-BRD-01,ST-BRD-02`; Review-Befund: K — Q243–244, R3112–3116, P585/594 — Gemeinsame private Arbeitszentrale, fünf Bereiche und Tablet-Optimierung sind mehrere Kriterien. ST-BRD-01 für Umfang, ST-BRD-02 für Tablet-Bedienung; ST-BRD-03 nur Warnungsintegration. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1167.b`: Partially Covered; Ziel `ST-BRD-01`; Review-Befund: S — Q244–245, R3112–3116, P585 — Board ersetzt Content Planner nicht; P585 bewahrt die Trennung. Bei ST-BRD-01 belassen, ohne sie ST-BRD-03 pauschal zuzurechnen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1167.c`: Partially Covered; Ziel `ST-BRD-01`; Review-Befund: K — Q245–246, R3112–3116, P585 — Separates Backlog und Typenliste gehören zu ST-BRD-01. Mit der Scrum-Regel präzisieren: Projekt-Tasks haben eine Story als Elternteil; private To-dos sind in P585 bereits gesondert ausgenommen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1167.d`: Partially Covered; Ziel `ST-BRD-01`; Review-Befund: K — Q246–247, R3112–3116, P585 — Zwei Zeilen und fünf Spalten sind getrennt prüfbar; P585 deckt sie konkret. ST-BRD-03 als pauschales Zweitziel entfernen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1167.e`: Partially Covered; Ziel `ST-BRD-01`; Review-Befund: K — Q247–249, R3112–3116, P585 — Drei Gates: Übernahme vor In Arbeit, Sicht-/Rückmeldeprüfung für Review, bewusste Bestätigung für Done. P585 nennt Übernahme, aber keine explizite Review-Prüfung und kein allgemeines Done-Gate. Bei ST-BRD-01 getrennt ergänzen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-07 / TASK-COVR1-025-08 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1168

- Quelle: `docs/vanventure-cockpit-plan.md:251` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Familien-Scrum-Board
- Anwendung (BATCH-001 Planning Coverage): ST-BRD-03,Projektplanung/Quellenrolle,constraint-register.md#src-1168
- Verbindlicher Originalwortlaut: Die persistente Warnungs-Inbox verarbeitet später nur authentifizierte, idempotente VanVenture-Ereignisse; `high` und `critical` werden einmalig als Fast-Track-Karte angelegt. Bis Ereignisvertrag, Dienstidentität und Prioritätsregeln abgenommen sind, findet keine automatische Kartenanlage statt. Der vollständige technische Entwurf steht im [Hauptentwicklungsplan mit Marvin Scrum Board](VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md), der verbindliche Umsetzungsstatus im [Gesamtplan](ausbauplan.md).

- BATCH-001 / PKG-038 / `SRC-1168.a`: Partially Covered; Ziel `ST-BRD-03`; Review-Befund: K — Q251–252, R3118–3122, P603 — Persistenz, ausschließlich authentifizierte VanVenture-Ereignisse und Idempotenz einzeln prüfen. Hauptziel ST-BRD-03; ST-BRD-01 nur Infrastruktur. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1168.b`: Partially Covered; Ziel `ST-BRD-03`; Review-Befund: K — Q252–253, R3118–3122, P603 — high und critical erzeugen je Warnung einmalig eine Fast-Track-Karte. P603 deckt den Kern; Test pro Schweregrad und Wiederholung ergänzen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1168.c`: Partially Covered; Ziel `ST-BRD-03`; Review-Befund: S — Q253–254, R3118–3122, P602–604 — Sperre bis Ereignisvertrag, Dienstidentität und Prioritätsregeln abgenommen sind, ist klar und in P602–604 weitgehend enthalten. Schriftliche Phase-0-Abnahme und Release-Freigabe bleiben zusätzliche, unterschiedliche Gates. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1168.d`: Context; Ziel `Projektplanung/Quellenrolle`; Review-Befund: K — Q255–257, R3118–3122 — Zwei Dokumentrollen: technischer Entwurf im Hauptentwicklungsplan, verbindlicher Umsetzungsstatus im Gesamtplan. Als Referenz-/Statuszuordnung behalten, nicht als Produkt-AC. Register oder Traceability-Metadaten passend; ST-BRD-01/03 allein sind kein Nachweis der Dokumentrollen. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-09 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Die Dokumentrollen bleiben: technischer Entwurf im Hauptentwicklungsplan, verbindlicher Umsetzungsstatus im Ausbauplan. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1169

- Quelle: `docs/vanventure-cockpit-plan.md:261` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / Insights
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-INS-04,constraint-register.md#src-1169
- Verbindlicher Originalwortlaut: Insights sind nachvollziehbare Signale, keine undurchsichtigen Auto-Entscheidungen. Beispiele: Videos mit ungewöhnlich hoher 28-Tage-Watchtime, Themen-Pillars mit überdurchschnittlicher CTR, geplante Slots ohne Brief, fehlende Tag-7-Daten oder Wachstum nach saisonalen Reisen. Jede Insight zeigt Zeitraum, zugrunde liegende Metrik, Vergleichsbasis und Datenstand. Zunächst regelbasiert; KI-Zusammenfassungen kommen erst später mit ausdrücklicher Freigabe und ohne automatisches Veröffentlichen.

- BATCH-001 / PKG-038 / `SRC-1169.a`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: S — Q261, R3124–3128, P412/442 — Nachvollziehbare Signale statt undurchsichtiger Auto-Entscheidungen ist eigenständig. ST-INS-04 behandelt Trends, aber nicht die Insight-Entscheidungsgrenze; eigenes Insight-AC oder eigener Slice. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1169.b`: Context; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: S — Q262–264, R3124–3128 — Die fünf Fälle sind ausdrücklich Beispiele. Semantisch korrekt, wenn als Testideen/Referenz geführt; nicht fünf verpflichtende Insight-Typen behaupten. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1169.c`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K — Q264–265, R3124–3128, P442 — Jede Insight braucht Zeitraum, Metrik, Vergleichsbasis und Datenstand. P442 nennt Zeitraum/Datenstand für Trends, nicht diese vier Angaben je Insight. Insight-AC ergänzen. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1169.d`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: S — Q265, R3124–3128, P412 — „Zunächst regelbasiert“ ist eine Phasenbedingung. P412 erwähnt Basis-Insights historisch; künftige Insight-Logik und Status getrennt festhalten. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1169.e`: Partially Covered; Ziel `ST-INS-01,ST-INS-04`; Review-Befund: K — Q265–266, R3124–3128 — Spätere KI-Zusammenfassungen brauchen ausdrückliche Freigabe und dürfen nicht automatisch veröffentlichen. Als spätere, gesperrte Option planen; nicht durch ST-INS-04-Trend-AC als bereits freigegeben behandeln. Release-Entscheidungen bestätigen, dass Prüfung keine Veröffentlichungsfreigabe ist. Damals offene technische AC-Frage; durch COVERAGE-R1-025 geklärt. Implementation Verification: ungeprüft.
- COVERAGE-R1-025: Aktuelle Originalstelle gegen die aktuellen Story-AC und TASK-COVR1-025-05 geprüft; die atomaren AC/Tasks stehen im Scrum-Entwurf und Story-Katalog. Planning Coverage geschlossen; Implementation Verification, Freigabe und Live-Nachweis offen.


## src-1170

- Quelle: `docs/vanventure-cockpit-plan.md:270` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1170
- Verbindlicher Originalwortlaut: Der Context wird redaktionell strukturiert gepflegt und steht Planner, Insights sowie späteren Assistenzfunktionen als freigegebene Faktenbasis bereit. Startkategorien:

- BATCH-001 / PKG-038 / `SRC-1170.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: K — Q270–271, R3130–3134, P412/452 — Redaktionell strukturierte Pflege, freigegebene Faktenbasis und drei Verbraucher mit „später“ für Assistenz sind getrennte Bedingungen. ST-INS-05 ist falsch; ST-INS-01 für Context-Bestand, spätere Assistenz nur als Abhängigkeit/Folgearbeit. Planungsnachweis: ST-INS-01 / AC-COVR1-026-01, TASK-COVR1-026-01. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-038 / `SRC-1170.b`: Merged; Ziel `ST-INS-01`; damaliger Review-Befund: K — Q271, R3130–3134 — „Startkategorien:“ ist ohne folgende Liste keine Klausel. Mit den kategorischen Originalzeilen verbinden; keine leere eigene Coverage-Zeile als erfüllt markieren. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-01 und TASK-COVR1-026-01. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1171

- Quelle: `docs/vanventure-cockpit-plan.md:273` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1171
- Verbindlicher Originalwortlaut: - **Van / Hymer:** Fahrzeug, Umbauten, Ausstattung, Erfahrungen und Grenzen.

- BATCH-001 / PKG-038 / `SRC-1171.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Q273, R3136–3140, P412 — Van/Hymer-Kategorie mit Fahrzeug, Umbauten, Ausstattung, Erfahrungen und Grenzen ist vollständig. ST-INS-01 passt als Context-Ziel, doch P412 nennt keine Kategorien; Kategorie als prüfbaren Bestandsumfang ergänzen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1172

- Quelle: `docs/vanventure-cockpit-plan.md:274` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1172
- Verbindlicher Originalwortlaut: - **Reisen:** Ziele, Routen, Jahreszeiten, Stellplätze, Erlebnisse und wiederkehrende Fragen.

- BATCH-001 / PKG-038 / `SRC-1172.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Q274–275, R3142–3146, P412 — Reisen-Kategorie mit Zielen, Routen, Jahreszeiten, Stellplätzen, Erlebnissen und Fragen ist vollständig. Gleiche konkrete Coverage-Lücke bei ST-INS-01. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1173

- Quelle: `docs/vanventure-cockpit-plan.md:276` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1173
- Verbindlicher Originalwortlaut: - **Outdoor:** Wandern, Campen, Natur- und Sicherheitswissen.

- BATCH-001 / PKG-038 / `SRC-1173.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Q276, R3148–3152, P412 — Outdoor-Kategorie mit Wandern, Campen, Natur- und Sicherheitswissen ist vollständig. Gleiche konkrete Coverage-Lücke bei ST-INS-01. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1174

- Quelle: `docs/vanventure-cockpit-plan.md:277` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1174
- Verbindlicher Originalwortlaut: - **MTB** und **Kajak:** Ausrüstung, Touren, Können, Sicherheit und Ideen.

- BATCH-001 / PKG-039 / `SRC-1174.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: C — MTB und Kajak samt Ausrüstung, Touren, Können, Sicherheit und Ideen sind zwei Kategorien mit gleichem Feldumfang. Wortlaut im Register korrekt; INS Z. 412 nennt weder Kategorien noch Felder. In INS als abnehmbare Context-Kategorien aufführen, bei getrennter Pflege MTB/Kajak getrennt nachweisen. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1175

- Quelle: `docs/vanventure-cockpit-plan.md:278` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1175
- Verbindlicher Originalwortlaut: - **Hund:** Reisen mit Hund, Bedürfnisse, Regeln und bewährte Abläufe.

- BATCH-001 / PKG-039 / `SRC-1175.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — „Hund“ samt Reisen, Bedürfnissen, Regeln und Abläufen ist eine eigenständige Context-Kategorie. Register korrekt; INS nennt sie nicht. Kategorie und Felder in INS-Kriterien aufnehmen. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1176

- Quelle: `docs/vanventure-cockpit-plan.md:279` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1176
- Verbindlicher Originalwortlaut: - **Mission Paris:** Zielbild, Zwischenetappen, Relevanz für Community und Storyline.

- BATCH-001 / PKG-039 / `SRC-1176.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — „Mission Paris“ umfasst Zielbild, Etappen, Community-Relevanz und Storyline. Register korrekt; in INS fehlt der konkrete Umfang. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-02, TASK-COVR1-026-02. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-02 und TASK-COVR1-026-02. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1177

- Quelle: `docs/vanventure-cockpit-plan.md:281` · VanVenture Cockpit – technische Referenz / Ansichten und fachlicher Umfang / VanVenture Master Context
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1177
- Verbindlicher Originalwortlaut: Jeder Eintrag erhält Status (Entwurf/freigegeben/archiviert), Quelle bzw. Beleg und eine Aktualitätsangabe. Nur freigegebene Einträge dürfen später automatisiert in Briefings oder KI-Kontexte einfließen.

- BATCH-001 / PKG-039 / `SRC-1177.a`: Merged; Ziel `ST-INS-01`; damaliger Review-Befund: C — Endet bei „Quelle bzw.“ und ist kein vollständiger Satz. Statuswerte und Quelle/Beleg als getrennt prüfbare Eintragsfelder formulieren; INS Z. 412 ergänzen. Offen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1177.b`: Merged; Ziel `ST-INS-01`; damaliger Review-Befund: S — „Beleg und eine Aktualitätsangabe“ ist ohne 1177.a kein selbstständiger Anspruch. Beleg gehört zu Quelle/Beleg; Aktualitätsangabe gesondert prüfen. Offen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1177.c`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Das Nur-freigegeben-Gate für spätere automatische Briefings oder KI-Kontexte ist eigenständig und bedingt; „später“ behauptet keine heutige Automatik. In INS bzw. der künftigen Assistenz-Story als Zugriffsschranke verankern. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-01, TASK-COVR1-026-01. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-01 und TASK-COVR1-026-01. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1178

- Quelle: `docs/vanventure-cockpit-plan.md:287` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1178
- Verbindlicher Originalwortlaut: - Neue Geheimnisse: `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET` und ein zweckgebundener Schlüssel zur Tokenverschlüsselung. Sie stehen nur in der privaten `.env`/Deployment-Konfiguration, nie in `.env.example` mit Wert, Git, Backups ohne Schutz oder Client-Code.

- BATCH-001 / PKG-039 / `SRC-1178.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: C — Drei bestimmte Secrets, darunter ein zweckgebundener Token-Schlüssel. AUTH ist die falsche Google-Login-Story; YouTube-Verbindungs-Story/INS mit benannten Konfigurationsanforderungen. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-03, TASK-COVR1-026-03. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1178.b`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: C — Ablage nur privat; Verbote für .env.example mit Wert, Git, ungeschützte Backups und Client-Code müssen einzeln erhalten bleiben. Register bewahrt sie; AUTH-Ziel falsch, INS/Verbindungs-Story braucht prüfbare Negativkriterien. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-03, TASK-COVR1-026-03. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-03 und TASK-COVR1-026-03. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1179

- Quelle: `docs/vanventure-cockpit-plan.md:291` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1179
- Verbindlicher Originalwortlaut: - Refresh Tokens werden mit dem vorhandenen, bewährten AES-256-GCM-Muster für private Einstellungen verschlüsselt; Verschlüsselungsschlüssel rotieren nur mit geplantem Re-Encryption-Verfahren.

- BATCH-001 / PKG-039 / `SRC-1179.a`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Refresh-Token-Verschlüsselung nach vorhandenem AES-256-GCM-Muster ist eigenständig. INS Z. 412 nennt nur „verschlüsselt“ und verliert Verfahren und Bezug zu privaten Einstellungen. Präzisieren. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-04, TASK-COVR1-026-04. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1179.b`: Covered (COVERAGE-R1-026); Ziel `ST-INS-01`; damaliger Review-Befund: S — Schlüsselrotation nur mit geplantem Re-Encryption-Verfahren ist eine eigenständige Bedingung. In INS fehlt sie. Offen. Planungsnachweis: ST-INS-01 / AC-COVR1-026-04, TASK-COVR1-026-04. Implementation Verification: ungeprüft.

- COVERAGE-R1-026: Vollständiger Originalwortlaut bleibt maßgeblich; konkreter Prüfpunkt siehe ST-INS-01 / AC-COVR1-026-04 und TASK-COVR1-026-04. Keine heutige Implementierungs-, Freigabe- oder Live-Aussage.

## src-1180

- Quelle: `docs/vanventure-cockpit-plan.md:294` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1180
- Verbindlicher Originalwortlaut: - Datenminimierung: nur für Cockpit-Zwecke erforderliche Analytics, kein Abruf von Kommentarinhalten oder personenbezogenen Daten ohne neuen, dokumentierten Bedarf.

- BATCH-001 / PKG-039 / `SRC-1180.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Zwei Grenzen: nur erforderliche Cockpit-Analytics; Kommentarinhalt/Personendaten nur bei neuem, dokumentiertem Bedarf. Nicht mit Website-Tracking verwechseln. INS-Datenerfassungskriterien getrennt ergänzen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1180.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1180.a`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01 / AC-COVR1-027-01 / TASK-COVR1-027-01. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1181

- Quelle: `docs/vanventure-cockpit-plan.md:296` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-OPS-02,ST-WEB-07,constraint-register.md#src-1181
- Verbindlicher Originalwortlaut: - Aufbewahrung: Rohmetriken und Audit-Logs erhalten eine vor Go-live beschlossene Frist; ein Admin-Export/Löschkonzept sowie ein Datenschutztext werden vor Produktiv- Betrieb ergänzt.

- BATCH-001 / PKG-039 / `SRC-1181.a`: Unresolved; Ziel `ST-INS-01,ST-OPS-02,ST-WEB-07`; Review-Befund: C — Für Rohmetriken und Audit-Logs ist je eine Frist vor Go-live zu beschließen. INS pauschal und OPS Z. 635 nur „Konzept“; Entscheidung, Geltungsbereich und Datum als Gate konkret nachweisen. Offen. Offene Frage: Welche Aufbewahrungsfristen gelten vor Go-live jeweils für Rohmetriken und Audit-Logs? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1181.b`: Partially Covered; Ziel `ST-INS-01,ST-OPS-02,ST-WEB-07`; Review-Befund: C — Admin-Export/Löschkonzept und Datenschutztext sind verschiedene Ergebnisse vor Produktivbetrieb. OPS Z. 635 teilweise; WEB für öffentlichen Text ergänzen. Nicht als bereits umgesetzt markieren. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1181.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1181.a`: Nutzerentscheidung offen; Planungsnachweis ST-INS-01,ST-OPS-02 / AC-COVR1-027-02 / TASK-COVR1-027-02. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1181.b`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-WEB-07,ST-OPS-02 / AC-COVR1-027-02 / TASK-COVR1-027-02. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1182

- Quelle: `docs/vanventure-cockpit-plan.md:299` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-OPS-01,constraint-register.md#src-1182
- Verbindlicher Originalwortlaut: - Logs maskieren Authorization-Header, OAuth-Codes, Tokens, Secrets und vollständige externe Fehler-Payloads. Datenbankbackups bleiben wie bisher geschützt.

- BATCH-001 / PKG-039 / `SRC-1182.a`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Logmaskierung umfasst fünf konkrete Klassen einschließlich vollständiger externer Fehler-Payloads. AUTH-Zuordnung falsch; Cockpit-Betrieb/Verbindung mit Negativtests. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1182.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1182.b`: Partially Covered; Ziel `ST-OPS-01`; Review-Befund: S — Geschützte Datenbankbackups bleiben eine separate Betriebsgrenze. OPS Z. 624–625 statt AUTH zuordnen; Schutz prüfen, keinen historischen Erfolg verallgemeinern. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1182.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1182.a`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01 / AC-COVR1-027-03 / TASK-COVR1-027-03. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1182.b`: Planning Coverage geschlossen; Planungsnachweis ST-OPS-01 / COVERAGE-R1-027 Backup-Schutz / TASK-COVR1-027-09. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1183

- Quelle: `docs/vanventure-cockpit-plan.md:301` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,constraint-register.md#src-1183
- Verbindlicher Originalwortlaut: - Die private Route bleibt hinter HTTPS; keine Cache-Control-Weitergabe privater API- Antworten an Proxies. Rate Limits für Login und OAuth-Start bleiben bzw. werden erweitert.

- BATCH-001 / PKG-039 / `SRC-1183.a`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: S — Private Route bleibt hinter HTTPS. Register korrekt; AUTH kann Schutz der Anmeldung berühren, die private Cockpit-Route gehört zusätzlich in INS/Betrieb. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1183.b`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: S — Keine Cache-Control-Weitergabe privater API-Antworten an Proxies: spezifische Proxy-/Cache-Grenze, durch „no-store“ in AUTH Z. 476 nicht vollständig belegt. Dort und bei Cockpit-API konkret prüfen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1183.c`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: C — Rate Limits für Login und OAuth-Start bleiben oder werden erweitert; zwei Endpunkte, unterschiedlicher Bestand. AUTH für Login, YouTube-Verbindungs-Story für dessen OAuth-Start; konkrete Tests. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1183.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1183.a`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01 / AC-COVR1-027-03 / TASK-COVR1-027-03. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1183.b`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-AUTH-01 / AC-COVR1-027-03 / TASK-COVR1-027-03. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1183.c`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-AUTH-01 / AC-COVR1-027-04 / TASK-COVR1-027-04. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1184

- Quelle: `docs/vanventure-cockpit-plan.md:307` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb / Website-Rechtstexte und Google-Produktionsfreigabe
- Anwendung (BATCH-001 Planning Coverage): ST-WEB-07,ST-OPS-02,constraint-register.md#src-1184
- Verbindlicher Originalwortlaut: Vor einer Umstellung der externen Google-OAuth-Anwendung von **Test** auf **Produktion** werden auf `https://vanventure.at` öffentlich erreichbare Seiten für Datenschutzerklärung und Nutzungsbedingungen erstellt. Die konkreten URLs werden erst nach redaktioneller und rechtlicher Freigabe in Google Auth Platform hinterlegt. Sie dürfen weder Platzhalter noch nicht veröffentlichte Seiten sein.

- BATCH-001 / PKG-039 / `SRC-1184.a`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: C — Vor YouTube-OAuth Test→Produktion müssen beide öffentlich erreichbaren Seiten auf https://vanventure.at existieren. WEB liefert Seiten; OPS hält das Gate. OPS-Wortlaut zur Anwendung berichtigen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1184.b`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: C — Konkrete URLs erst nach redaktioneller und rechtlicher Freigabe in Google Auth Platform hinterlegen. OPS Z. 635 nennt Rechtstest, nicht klar das redaktionelle Gate und die Reihenfolge. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1184.c`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: S — URLs dürfen weder Platzhalter noch unveröffentlichte Seiten sein. In WEB/OPS durch öffentliche Abrufprüfung abnehmen; bloße „named URL“ genügt nicht. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1184.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1184.a`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07,ST-OPS-02 / COVERAGE-R1-027 Rechtstexte/Produktionsgate / TASK-COVR1-027-08. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1184.b`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07,ST-OPS-02 / COVERAGE-R1-027 Rechtstexte/Produktionsgate / TASK-COVR1-027-08. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1184.c`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07,ST-OPS-02 / COVERAGE-R1-027 Rechtstexte/Produktionsgate / TASK-COVR1-027-08. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1185

- Quelle: `docs/vanventure-cockpit-plan.md:313` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb / Website-Rechtstexte und Google-Produktionsfreigabe
- Anwendung (BATCH-001 Planning Coverage): ST-WEB-07,ST-OPS-02,constraint-register.md#src-1185
- Verbindlicher Originalwortlaut: Der Entwurf der Datenschutzerklärung behandelt mindestens den Zweck der privaten YouTube-Auswertung, die verwendeten Google-/YouTube-Leseberechtigungen, die verschlüsselte serverseitige Ablage des Refresh-Tokens, die Datenminimierung, Aufbewahrungs- und Löschregeln sowie eine Kontaktmöglichkeit. Die Nutzungsbedingungen beschreiben den privaten, rollenbasierten Zugang zum Cockpit. Beide Texte werden vor Veröffentlichung rechtlich geprüft; der technische Plan ersetzt keine Rechtsberatung.

- BATCH-001 / PKG-039 / `SRC-1185.a`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: C — Datenschutzerklärung hat sieben Mindestthemen: Zweck, Leseberechtigungen, verschlüsselte serverseitige Refresh-Token-Ablage, Datenminimierung, Aufbewahrung, Löschung, Kontakt. WEB Z. 105 ist sachfremd; dort Themen und rechtliche Prüfung aufnehmen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1185.b`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: S — Nutzungsbedingungen müssen privaten, rollenbasierten Cockpit-Zugang beschreiben. WEB/OPS nennt nur generische Terms; Inhalt ergänzen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1185.c`: Partially Covered; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: S — Beide Texte vor Veröffentlichung rechtlich prüfen. OPS Z. 635 teilweise; Ergebnis pro Text in WEB/OPS nachweisen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1185.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1185.d`: Context; Ziel `ST-WEB-07,ST-OPS-02`; Review-Befund: S — „Technischer Plan ersetzt keine Rechtsberatung“ ist eine Geltungsgrenze, keine Implementierungs-Story. Im Register erhalten; nicht als erledigbare Produktfunktion zählen. Offen als Klassifikation. Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1185.a`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07 / COVERAGE-R1-027 Rechtstexte / TASK-COVR1-027-07. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1185.b`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07 / COVERAGE-R1-027 Rechtstexte / TASK-COVR1-027-07. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1185.c`: Planning Coverage geschlossen; Planungsnachweis ST-WEB-07,ST-OPS-02 / COVERAGE-R1-027 Rechtstexte/Produktionsgate / TASK-COVR1-027-08. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1186

- Quelle: `docs/vanventure-cockpit-plan.md:321` · VanVenture Cockpit – technische Referenz / Datenschutz, Secrets und Betrieb / Website-Rechtstexte und Google-Produktionsfreigabe
- Anwendung (BATCH-001 Planning Coverage): ST-OPS-02,ST-INS-01,constraint-register.md#src-1186
- Verbindlicher Originalwortlaut: Für die Google-Veröffentlichung werden außerdem App-Name, Support- und Entwickler-Kontakt, Homepage, autorisierte Domain `vanventure.at` und die tatsächlich angeforderten Scopes geprüft. Eine erforderliche Domainbestätigung und eine gegebenenfalls von Google verlangte OAuth-/Scope-Verifizierung werden vor der Umstellung abgeschlossen. Bis dahin bleibt die Anwendung im Testmodus; die Testnutzer- und erneute Freigabe-Regeln werden berücksichtigt.

- BATCH-001 / PKG-039 / `SRC-1186.a`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: C — Google-Veröffentlichungsprüfung umfasst App-Name, zwei Kontakte, Homepage, Domain und tatsächlich angeforderte Scopes. OPS Z. 635 deckt nur Teile konkret. Checkliste ergänzen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.a mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1186.b`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: C — Domainbestätigung falls erforderlich und OAuth-/Scope-Verifizierung falls Google sie verlangt, jeweils vor Umstellung. OPS formuliert Domainbestätigung unbedingter; Bedingung und Nachweis korrigieren. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1186.c`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: S — Bis zur Erfüllung der Gates Testmodus beibehalten. OPS nennt Reihenfolge, sollte den negativen Zustand ausdrücklich nachweisen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1186.d`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: C — Testnutzer- und erneute Freigabe-Regeln gelten im Zwischenzustand. OPS enthält sie nicht; als zwei prüfbare Google-Konfigurationspunkte ergänzen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1186.d mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1186.a`: Planning Coverage geschlossen; Planungsnachweis ST-OPS-02 / COVERAGE-R1-027 Produktionsgate / TASK-COVR1-027-10. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1186.b`: Planning Coverage geschlossen; Planungsnachweis ST-OPS-02 / COVERAGE-R1-027 Produktionsgate / TASK-COVR1-027-10. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1186.c`: Planning Coverage geschlossen; Planungsnachweis ST-OPS-02 / COVERAGE-R1-027 Produktionsgate / TASK-COVR1-027-10. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1186.d`: Planning Coverage geschlossen; Planungsnachweis ST-OPS-02 / COVERAGE-R1-027 Produktionsgate / TASK-COVR1-027-10. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1187

- Quelle: `docs/vanventure-cockpit-plan.md:332` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 0 – Festlegung und Google-Vorbereitung
- Anwendung (BATCH-001 Planning Coverage): ST-OPS-02,ST-INS-01,constraint-register.md#src-1187
- Verbindlicher Originalwortlaut: 1. Verantwortliche Google-Kanalinhaberin, gewünschte Kennzahlen, Regionen/Währung und Datenaufbewahrung verbindlich festlegen.

- BATCH-001 / PKG-039 / `SRC-1187.a`: Context; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: S — „1.“ ist nur Listennummer, keine Klausel. Mit 1187.b aus der Kandidatenliste zusammenführen, ohne fachlichen Inhalt zu verlieren. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1187.b`: Unresolved; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: C — Verantwortliche Kanalinhaberin, Kennzahlen, Regionen/Währung und Datenaufbewahrung sind mehrere verbindliche Phase-0-Entscheidungen. INS Existing/Verify darf sie nicht stillschweigend als entschieden ausgeben; je Entscheidung und Beleg getrennt planen. Unresolved, Nutzerentscheidungen nötig. Offene Frage: Wer ist Kanalinhaberin, welche Kennzahlen und Regionen/Währung gelten, und welche Aufbewahrungsfristen sind vor Go-live beschlossen? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1187.b`: Nutzerentscheidung offen; Planungsnachweis ST-INS-01 / AC-COVR1-027-05 / TASK-COVR1-027-05. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1188

- Quelle: `docs/vanventure-cockpit-plan.md:334` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 0 – Festlegung und Google-Vorbereitung
- Anwendung (BATCH-001 Planning Coverage): ST-OPS-02,ST-INS-01,constraint-register.md#src-1188
- Verbindlicher Originalwortlaut: 2. OAuth-Consent-Screen, Produktions-Redirect-URI und minimale Scopes konfigurieren; Datenschutz-/Nutzungsanforderungen von Google prüfen.

- BATCH-001 / PKG-039 / `SRC-1188.a`: Context; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: S — „2.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1188.b`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: C — Consent Screen, Produktions-Redirect-URI und minimale Scopes sind drei Konfigurationspunkte der YouTube-Verbindung. AUTH verwechselt dies mit Personen-Login. In Verbindungs-Story/OPS mit konkreten Werten prüfen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1188.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1188.c`: Partially Covered; Ziel `ST-OPS-02,ST-INS-01`; Review-Befund: S — Google-Datenschutz-/Nutzungsanforderungen zu prüfen ist eigener Phase-0-Schritt. OPS statt AUTH; Ergebnis dokumentieren, keine Google-Anforderung erfinden. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1188.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1188.b`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-OPS-02 / AC-COVR1-027-04 / TASK-COVR1-027-04. Implementation Verification, Freigabe und Live-Nachweis offen.

- COVERAGE-R1-027 / `SRC-1188.c`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-OPS-02 / AC-COVR1-027-04 / TASK-COVR1-027-04. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1189

- Quelle: `docs/vanventure-cockpit-plan.md:336` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 0 – Festlegung und Google-Vorbereitung
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-OPS-02,constraint-register.md#src-1189
- Verbindlicher Originalwortlaut: 3. Cockpit-URL und Ausführungsort des täglichen Jobs im bestehenden Docker/Contabo- Betrieb festlegen.

- BATCH-001 / PKG-039 / `SRC-1189.a`: Context; Ziel `ST-INS-01,ST-OPS-02`; Review-Befund: S — „3.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1189.b`: Partially Covered; Ziel `ST-INS-01,ST-OPS-02`; Review-Befund: C — Cockpit-URL und Ausführungsort des täglichen Jobs im bestehenden Docker/Contabo-Betrieb sind getrennte Betriebsfestlegungen. INS Z. 412 behauptet Zeitplan historisch, belegt diese Festlegungen nicht einzeln; INS/OPS nachweisen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1189.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

- COVERAGE-R1-027 / `SRC-1189.b`: Planning Coverage geschlossen; Planungsnachweis ST-INS-01,ST-OPS-01 / AC-COVR1-027-05 / TASK-COVR1-027-06. Implementation Verification, Freigabe und Live-Nachweis offen.

## src-1190

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-01` / `TASK-COVR1-028-01`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:341` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 1 – Sichere Grundlage
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1190
- Verbindlicher Originalwortlaut: 1. Datenbankmigrationen für `yt_*`, Planner, Context und Audit-Log erstellen; Upserts, Fremdschlüssel und Indizes testen.

- BATCH-001 / PKG-039 / `SRC-1190.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „1.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1190.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Migrationen für yt_*, Planner, Context und Audit-Log sind Grundarchitektur, nicht EFF Z. 452 (content_item_metrics). Auf INS-Grundstand bzw. passende technische Tasks seiner Value Story abbilden. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1190.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1190.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Upserts, Fremdschlüssel und Indizes sind drei eigenständig prüfbare Migrationsqualitäten. Mit 1190.b verknüpfen; nicht EFF zuordnen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1190.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1191

- COVERAGE-R1-028: Planning Coverage durch `ST-AUTH-01` / `AC-COVR1-028-02` / `TASK-COVR1-028-02`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:343` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 1 – Sichere Grundlage
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,ST-AUTH-01,constraint-register.md#src-1191
- Verbindlicher Originalwortlaut: 2. Bestehendes Auth-/CSRF-/Rollenmodell für `/cockpit` und `/api/cockpit/*` wiederverwenden; Rechte-Matrix automatisiert testen.

- BATCH-001 / PKG-039 / `SRC-1191.a`: Context; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: S — „2.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1191.b`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: C — Bestehendes Auth-, CSRF- und Rollenmodell für beide Cockpit-Routen wiederverwenden. INS und AUTH berühren dies; Route und Rollen als konkrete Kriterien statt Registerverweis. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1191.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1191.c`: Partially Covered; Ziel `ST-INS-01,ST-AUTH-01`; Review-Befund: S — Automatisierter Rechte-Matrix-Test ist eigenständig. AUTH Z. 476 nennt historisch Rollen/CSRF, aber keinen solchen Test der Cockpit-Routen; ergänzen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1191.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1192

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-03` / `TASK-COVR1-028-03`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:345` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 1 – Sichere Grundlage
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1192
- Verbindlicher Originalwortlaut: 3. Verschlüsselte Geheimnis-/Tokenablage, Konfigurationsvalidierung und sichere Logmaskierung implementieren.

- BATCH-001 / PKG-039 / `SRC-1192.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S — „3.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1192.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: C — Verschlüsselte Geheimnis-/Tokenablage, Konfigurationsvalidierung und Logmaskierung sind drei Arbeiten. Inhalt überschneidet 1178/1179/1182; als Umsetzung und Prüfung derselben Regeln verlinken, nicht als neue doppelte Anforderungen. INS/Verbindungs-Story, nicht nur pauschaler Bestand. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1192.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1193

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-03` / `AC-COVR1-028-04` / `TASK-COVR1-028-04`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:347` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 1 – Sichere Grundlage
- Anwendung (BATCH-001 Planning Coverage): ST-INS-03,ST-INS-01,constraint-register.md#src-1193
- Verbindlicher Originalwortlaut: 4. OAuth Connect, Callback, Kanalbestätigung, Reconnect und Disconnect umsetzen und gegen ungültigen State, Tokenverlust sowie falschen Kanal testen.

- BATCH-001 / PKG-039 / `SRC-1193.a`: Context; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: S — „4.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1193.b`: Partially Covered; Ziel `ST-INS-03,ST-INS-01`; Review-Befund: C — Connect, Callback, Kanalbestätigung, Reconnect, Disconnect sowie Tests für ungültigen State, Tokenverlust und falschen Kanal sind mehrere abnehmbare Pfade. AUTH ist Personen-Login; YouTube-Verbindungs-Story mit positiven und negativen Kriterien. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1193.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1194

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-05` / `TASK-COVR1-028-05`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:352` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 2 – Datenerfassung und Historie
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1194
- Verbindlicher Originalwortlaut: 1. Data-API- und Analytics-API-Adapter mit Paginierung, Rate-/Retry-Strategie und klaren, testbaren Response-Mappings implementieren.

- BATCH-001 / PKG-039 / `SRC-1194.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „1.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1194.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Data- und Analytics-API-Adapter, Paginierung, Rate/Retry und Response-Mappings sind getrennt prüfbare Sync-Teile. INS nennt Bestand, aber keine einzelnen Grenzen; als Tasks/AC seines Datennutzens rückverfolgen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1194.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1195

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-06` / `TASK-COVR1-028-06`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:354` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 2 – Datenerfassung und Historie
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1195
- Verbindlicher Originalwortlaut: 2. Idempotenten Sync-Runner, Datenbanksperre, Sync-Run-Protokoll und täglichen Zeitplan ergänzen.

- BATCH-001 / PKG-039 / `SRC-1195.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „2.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1195.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Idempotenz, Datenbanksperre, Run-Protokoll und täglicher Zeitplan sind vier unterschiedliche Sync-Kriterien. INS Z. 412 nennt Sperre/Zeitplan historisch; Idempotenz und Protokoll gezielt nachweisen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1195.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1196

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-07` / `TASK-COVR1-028-07`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:356` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 2 – Datenerfassung und Historie
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1196
- Verbindlicher Originalwortlaut: 3. Tagesmetriken, 35+-Tage-Nachzugsfenster und Snapshot-Materialisierung implementieren.

- BATCH-001 / PKG-039 / `SRC-1196.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „3.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1196.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Tagesmetriken, mindestens 35 Tage Nachzugsfenster und Snapshot-Materialisierung sind getrennte Kriterien. INS erwähnt Tageswerte/Snapshots historisch, nicht das Nachzugsfenster. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1196.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1197

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-08` / `TASK-COVR1-028-08`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:357` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 2 – Datenerfassung und Historie
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1197
- Verbindlicher Originalwortlaut: 4. Staging-/Testkanal gegen Quoten, Zeitzonen, fehlende Analytics und Datenkorrekturen prüfen; kein Live-Token in Tests verwenden.

- BATCH-001 / PKG-039 / `SRC-1197.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „4.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1197.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Staging-/Testkanal muss Quoten, Zeitzonen, fehlende Analytics und Datenkorrekturen prüfen. INS nennt „automatisierte Tests“ nur allgemein; vier Fälle konkret zuordnen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1197.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1197.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Kein Live-Token in Tests ist eigenständiges Verbot; als Test-/Konfigurationsgrenze bei INS/Verbindung aufnehmen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1197.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1198

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-09` / `TASK-COVR1-028-09`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:362` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 3 – Cockpit-Oberfläche
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1198
- Verbindlicher Originalwortlaut: **Produktionsstand, 22. September 2026:** Die Oberfläche ist umgesetzt. Der VAN-Planer-Eintrag „GCS nach einem Jahr“ steht auf `briefed`, enthält den verbindlichen Brief und 24 geschätzte Stunden; zehn freigegebene GCS-Fakten sind im Master Context gespeichert. Die technischen Restaufgaben und die zwei noch ungebriesten Tests stehen ausschließlich im [Gesamtplan](ausbauplan.md).

- BATCH-001 / PKG-039 / `SRC-1198.a`: Merged; Ziel `ST-INS-01`; Review-Befund: S — „Produktionsstand, 22.“ ist ein abgebrochener Datums-/Statusmarker, keine Klausel. Mit 1198.b zusammenführen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1198.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Historische Aussage „Oberfläche ist umgesetzt“ gilt zum 22.09.2026, ohne heutige Neuprüfung. INS Existing/Verify statt EFF Planned; Datierung erhalten. Offen als Statusnachweis. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1198.c`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Der eine GCS-Planer-Eintrag hat Status briefed, verbindlichen Brief und 24 geschätzte Stunden. Nicht in tatsächliche Stunden oder Effizienzerfolg umdeuten. Historischen Bestand in INS; EFF darf nur darauf aufbauen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1198.d`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: S — Zehn freigegebene GCS-Fakten sind datierter Master-Context-Bestand. INS statt EFF, heutige Existenz gesondert verifizieren. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.d mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1198.e`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Verweist auf technische Restaufgaben und zwei noch ungebrieste Tests im Gesamtplan. Weder EFF noch Registerwortlaut identifizieren deren heutige Task-Kennungen oder Status. Verweise konkret nachziehen; keine Erledigung ableiten. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1198.e mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1199

- COVERAGE-R1-028: Planning Coverage durch `ST-INS-01` / `AC-COVR1-028-10` / `TASK-COVR1-028-10`; aktuelle Implementation Verification offen. Für `SRC-1198` gelten die datierten, inzwischen unterschiedlichen Schätzstände.

- Quelle: `docs/vanventure-cockpit-plan.md:368` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 3 – Cockpit-Oberfläche
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1199
- Verbindlicher Originalwortlaut: 1. Vanilla-JS-Ansichten für Dashboard, Videos, Sync-Status und Fehlerzustände bauen.

- BATCH-001 / PKG-039 / `SRC-1199.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „1.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1199.b`: Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Dashboard, Videos, Sync-Status und Fehlerzustände sind Cockpit-Ansichten, nicht Familien-Board oder Warnungs-Inbox. BRD-01/03-Zuordnung entfernen; INS mit vier sichtbaren Zuständen und aktuellem Verifikationsstatus. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1199.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-1200

- Quelle: `docs/vanventure-cockpit-plan.md:369` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 3 – Cockpit-Oberfläche
- Anwendung (BATCH-001 Planning Coverage): ST-INS-01,constraint-register.md#src-1200
- Verbindlicher Originalwortlaut: 2. Content Planner mit Jahresansicht, zwölf Longform-Startslots, Statusfluss und Videoverknüpfung ergänzen.

- BATCH-001 / PKG-039 / `SRC-1200.a`: Context; Ziel `ST-INS-01`; Review-Befund: S — „2.“ ist nur Listennummer; mit Inhalt verknüpfen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-039 / `SRC-1200.b`: damals Partially Covered; Ziel `ST-INS-01`; Review-Befund: C — Content Planner braucht Jahresansicht, zwölf Longform-Startslots, Statusfluss und Videoverknüpfung. EFF Z. 452 behandelt spätere Ziel-/Ist-Auswertung; Basis-Planner zu INS bzw. passender Planner-Story, vier Merkmale einzeln prüfen. Offen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-1200.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-01` bei ST-INS-01; Prüftasks `TASK-COVR1-029-01` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1201

- Quelle: `docs/vanventure-cockpit-plan.md:371` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 3 – Cockpit-Oberfläche
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: 3. Master Context mit Kategorien, Freigabestatus und Quellen umsetzen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-02` bei ST-INS-01; Prüftasks `TASK-COVR1-029-02` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1202

- Quelle: `docs/vanventure-cockpit-plan.md:372` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 3 – Cockpit-Oberfläche
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: 4. Regelbasierte Insights mit sichtbarer Berechnungsgrundlage hinzufügen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-03` bei ST-INS-01; Prüftasks `TASK-COVR1-029-03` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1203

- Quelle: `docs/vanventure-cockpit-plan.md:376` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 4 – Qualität und Betrieb
- Anwendung: ST-INS-01,ST-AUTH-01,ST-OPS-01
- Verbindlicher Originalwortlaut: 1. API-, Migrations-, Berechtigungs-, OAuth-State-, Tokenverschlüsselungs- und Sync-Idempotenztests ergänzen; bestehendes `npm test` erweitern.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-04a/04b/04c` bei ST-INS-01,ST-AUTH-01,ST-OPS-01; Prüftasks `TASK-COVR1-029-04a/04b/04c` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1204

- Quelle: `docs/vanventure-cockpit-plan.md:378` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 4 – Qualität und Betrieb
- Anwendung: ST-OPS-01,ST-OPS-02
- Verbindlicher Originalwortlaut: 2. Backup/Restore für neue Tabellen testen und eine datensparsame Admin-Löschroutine spezifizieren bzw. implementieren.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-05a/05b` bei ST-OPS-01,ST-OPS-02; Prüftasks `TASK-COVR1-029-05a/05b` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1205

- Quelle: `docs/vanventure-cockpit-plan.md:380` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 4 – Qualität und Betrieb
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: 3. Monitoring für fehlgeschlagene Syncs, abgelaufene Verbindung und lange fehlende Daten einrichten; Benachrichtigungskanal bewusst festlegen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Unresolved; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-06` bei ST-OPS-01; Prüftasks `TASK-COVR1-029-06` (bei mehreren Suffixen einzeln). Planning Coverage: Unresolved – Nutzerentscheidung zu Kanal, Verantwortlicher und Aktivierungskriterium offen. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1206

- Quelle: `docs/vanventure-cockpit-plan.md:382` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 4 – Qualität und Betrieb
- Anwendung: ST-OPS-01,ST-OPS-02
- Verbindlicher Originalwortlaut: 4. Erst nach Datenschutz-, Sicherheits- und fachlicher Abnahme auf Contabo aktivieren.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-07b` bei ST-OPS-01,ST-OPS-02; Prüftasks `TASK-COVR1-029-07b` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1207

- Quelle: `docs/vanventure-cockpit-plan.md:386` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-01,ST-INS-04
- Verbindlicher Originalwortlaut: **Status vom 23. September 2026:** Die Impressions-/CTR-Implementierung ist live: das Cockpit verwendet den offiziellen täglichen YouTube-Reporting-Job `channel_reach_basic_a1`, behandelt fehlende Werte als nicht verfügbar und blockiert den Kern-Sync nicht. Der erste Tagesreport wurde eingelesen: zwei positive Impressionswerte und echte CTR-Nullwerte sind im Cockpit verifiziert. Es ist dafür kein weiterer Code oder externer Wartepunkt offen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-07` bei ST-INS-01; Prüftasks `TASK-COVR1-029-07` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1208

- Quelle: `docs/vanventure-cockpit-plan.md:393` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-01,ST-INS-04
- Verbindlicher Originalwortlaut: 1. **Implementiert:** Video-Impressions/CTR über den Reporting-Export erfassen. Traffic Sources und verfügbare Retention-/Engagement-Serien mit Zeitraum und API-Grenzen anzeigen. Nicht unterstützte optionale Analytics-Abfragen dürfen den Kern-Sync nie blockieren.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-07/08` bei ST-INS-01,ST-INS-04; Prüftasks `TASK-COVR1-029-07/08` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1209

- Quelle: `docs/vanventure-cockpit-plan.md:397` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-01,ST-INS-04
- Verbindlicher Originalwortlaut: 2. **Erledigt:** Den ersten von YouTube bereitgestellten Reach-Tagesreport einlesen und die Werte im Cockpit abnehmen. CTR und Impressions können nun für die künftig wachsende Datenbasis eines Audit V2 verwendet werden.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Damals in BATCH-003: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-029: Konkrete Planungs-AC `AC-COVR1-029-07/08` bei ST-INS-01,ST-INS-04; Prüftasks `TASK-COVR1-029-07/08` (bei mehreren Suffixen einzeln). Planning Coverage: Covered. Historischer Quellenstatus und aktuelle Implementation Verification bleiben getrennt.

## src-1210

- Quelle: `docs/vanventure-cockpit-plan.md:400` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-05
- Verbindlicher Originalwortlaut: 3. Die Short-/Longform-Klassifikation absichern und im Planner geschätzte sowie tatsächliche Produktionsstunden für spätere Effizienzvergleiche erfassen. **Umgesetzt und live am 22. September 2026:** Beide Stundenfelder sind additiv migriert, validiert und im Planner sichtbar; die Kennzahl folgt erst mit tatsächlichen Veröffentlichungsdaten.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-08 und TASK-COVR1-030-1210; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-08 bei ST-INS-05. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1211

- Quelle: `docs/vanventure-cockpit-plan.md:405` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-04
- Verbindlicher Originalwortlaut: 4. Eine Audit-Ansicht mit Vergleichsgruppen, Datenqualitätsstatus, Long-Tail-/Alterslogik und Snapshot-Vergleich umsetzen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-05 und TASK-COVR1-030-1211; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-05 bei ST-INS-04. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1212

- Quelle: `docs/vanventure-cockpit-plan.md:407` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: 5. ~~**Erledigt und am 22. September 2026 live verifiziert:** Der Cockpit-Button „Channel Audit exportieren“ erzeugt einen authentifizierten, versionierten JSON-Download (Schema V2) mit expliziter Feldliste und Datenstand. Er enthält keine Tokens, Secrets, Sitzungen oder Kontodaten; anonyme Abrufe erhalten HTTP 401. CSV bleibt optional und nicht kanonisch.~~
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-01 und TASK-COVR1-030-1212; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-01 bei ST-INS-01. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1213

- Quelle: `docs/vanventure-cockpit-plan.md:412` · VanVenture Cockpit – technische Referenz / Phasenplan / Phase 5 – Channel Audit & Content Intelligence
- Anwendung: ST-INS-06
- Verbindlicher Originalwortlaut: 6. Den wiederkehrenden Ablauf dokumentieren: Export → Audit → geprüfte Erkenntnisse in Insights, Planner und Master Context übernehmen. Es gibt keine automatische Rückschreibung nach YouTube oder ungeprüfte Übernahme.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-09 und TASK-COVR1-030-1213; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-09 bei ST-INS-06. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1214

- Quelle: `docs/vanventure-cockpit-plan.md:418` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-AUTH-01,ST-INS-01
- Verbindlicher Originalwortlaut: - Ohne erlaubtes, aktives Konto sind Cockpit-HTML und sämtliche Cockpit-APIs nicht lesbar; deaktivierte Konten verlieren ihren Zugriff sofort.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-02 und TASK-COVR1-030-1214; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-02 bei ST-AUTH-01,ST-INS-01. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1215

- Quelle: `docs/vanventure-cockpit-plan.md:420` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-AUTH-01,ST-INS-01,ST-INS-03
- Verbindlicher Originalwortlaut: - Nur Administratoren können eine Google-Verbindung ändern oder eine Synchronisierung starten; die Kanal-OAuth-Verbindung ist unabhängig vom Nutzer-Login gespeichert.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-03 und TASK-COVR1-030-1215; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-03 bei ST-AUTH-01,ST-INS-01,ST-INS-03. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1216

- Quelle: `docs/vanventure-cockpit-plan.md:422` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: - Ein wiederholter Sync erzeugt keine doppelten Tageswerte oder Snapshots und ist im Sync-Protokoll nachvollziehbar.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-04 und TASK-COVR1-030-1216; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-04 bei ST-INS-01. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1217

- Quelle: `docs/vanventure-cockpit-plan.md:424` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-04
- Verbindlicher Originalwortlaut: - Ein Video zeigt nach Verfügbarkeit korrekte, klar als vollständig/unvollständig markierte 1/7/28/90/365-Stände.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-06 und TASK-COVR1-030-1217; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-06 bei ST-INS-04. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1218

- Quelle: `docs/vanventure-cockpit-plan.md:426` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: - Ein authentifizierter Channel-Audit-Export liefert mindestens `schema_version`, `generated_at`, `as_of`, Kanal-, Video-, Kennzahlen-, Snapshot-, Zuordnungs- und Datenqualitätsdaten. Er enthält keine Tokens, Secrets, Nutzer-/Kontodaten oder Sitzungen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-01 und TASK-COVR1-030-1218; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-01 bei ST-INS-01. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1219

- Quelle: `docs/vanventure-cockpit-plan.md:430` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-04
- Verbindlicher Originalwortlaut: - Audit-Vergleiche trennen Shorts und Longform; CTR-, Retention- und Traffic-Source-Schlussfolgerungen sind bei fehlender oder API-seitig eingeschränkter Datenlage klar als vorläufig markiert oder unterdrückt.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Covered durch AC-COVR1-030-07 und TASK-COVR1-030-1219; aktuelle Implementation Verification und Live-Wirkung offen.

- COVERAGE-R1-030: Original gegen aktuelle Story-Zielstelle abgeglichen; AC-COVR1-030-07 bei ST-INS-04. Historische Quelle, geplantes Ergebnis und heutige Verifikation bleiben getrennt.

## src-1220

- Quelle: `docs/vanventure-cockpit-plan.md:433` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: - Dashboard, Videos, Planner, Insights und Master Context arbeiten vollständig mit der privaten API; die öffentliche GitHub-Pages-Ausgabe enthält keine Cockpitdaten.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: AC-COVR1-031-01 prüft alle fünf privaten API-Ansichten und die Cockpitdaten-freie öffentliche GitHub-Pages-Ausgabe getrennt; aktueller Code-/Buildbefund offen.

## src-1221

- Quelle: `docs/vanventure-cockpit-plan.md:435` · VanVenture Cockpit – technische Referenz / Akzeptanzkriterien für die spätere Umsetzung
- Anwendung: ST-INS-01,ST-AUTH-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Geheimnisse und Tokens erscheinen weder im Repository noch in Browserantworten, Logs, Tests oder öffentlichen Deployments.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: AC-COVR1-031-01 verlangt fünf redigierte Negativbefunde für Repository, Browserantworten, Logs, Tests und öffentliche Deployments; kein aktueller Geheimnischeck behauptet.

## src-1222

- Quelle: `docs/vanventure-cockpit-plan.md:440` · VanVenture Cockpit – technische Referenz / Nicht Bestandteil dieses Plans
- Anwendung: ST-INS-01,ST-INS-04,ST-INS-06
- Verbindlicher Originalwortlaut: - Öffentliche Veröffentlichung von Analytics, automatische Video-Uploads, Änderungen an der GitHub-Pages-Seite oder Rückschreiben in YouTube.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Vier Ausschlüsse gelten für den Umfang dieses Cockpit-Plans, nicht als projektweites Dauerverbot; ST-INS-01/04/06 und das Cockpit-Epic beachten AC-COVR1-031-02.

## src-1223

- Quelle: `docs/vanventure-cockpit-plan.md:442` · VanVenture Cockpit – technische Referenz / Nicht Bestandteil dieses Plans
- Anwendung: ST-INS-01
- Verbindlicher Originalwortlaut: - Neue externe Analyse-, Authentifizierungs-, Queue- oder Frontend-Plattformen.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Neue externe Analyse-, Authentifizierungs-, Queue- und Frontend-Plattformen liegen außerhalb dieses Cockpit-Plans; kein allgemeines Beschaffungsverbot. AC-COVR1-031-02.

## src-1224

- Quelle: `docs/vanventure-cockpit-plan.md:443` · VanVenture Cockpit – technische Referenz / Nicht Bestandteil dieses Plans
- Anwendung: ST-INS-06
- Verbindlicher Originalwortlaut: - Automatische KI-Entscheidungen oder die Übermittlung des Master Context an Dritte ohne separate Produktentscheidung und Datenschutzevaluierung.
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Unresolved; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031 (historischer Prüfstand): Automatische KI-Entscheidungen und Master-Context-Übermittlung an Dritte sind getrennt ausgeschlossen. Die damalige Nutzerfrage ist durch UD-2026-09-26-09 beantwortet: keine autonomen KI-Entscheidungen vor separater Produktentscheidung und Datenschutz-/Sicherheitsprüfung. Keine Aktivierung durch AC-COVR1-031-03.

## src-1377

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:3` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben
- Anwendung: projektweite Quellen- und Statusregel
- Verbindlicher Originalwortlaut: Stand der Zusammenführung: 23. September 2026 Zielprojekt: `reflexible/vanventure` / vanventure.at Geltungsbereich der Arbeitsregeln: ausschließlich das VanVenture-Projekt
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Datum und Projektname sind Quellenmetadaten; die Arbeitsregeln gelten nur für VanVenture. Übergreifende Governance, keine Foto-Story.

## src-1378

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:7` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben
- Anwendung: projektweite Quellen- und Statusregel
- Verbindlicher Originalwortlaut: **Status der Übernahme:** Seit 23. September 2026 ist diese Datei die maßgebliche, konsolidierte Prozess- und Nachweisspezifikation für VanVenture. Sie ergänzt die technische [Template-Spezifikation](responsive-templates.md) und den freigegebenen [Design-Guide](design-guide.md); diese drei Dokumente regeln jeweils ihren eigenen Bereich und dürfen keine abweichenden Parallelvorgaben enthalten. Der einzige aktive Aufgabenplan ist der [Ausbauplan](ausbauplan.md). Der konkrete Übernahme- und Prüfstand steht im [Abnahmebericht](abnahmeberichte/gesamtauftrag-uebernahme-2026-09-23.md).
- BATCH-003: PKG-040; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-040`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Gesamtauftrag ist seit 23.09.2026 Prozess-/Nachweisquelle, Template-Spezifikation technische und Design-Guide freigegebene gestalterische Quelle. Keine widersprüchliche Parallelvorgabe. Ausbauplan ist derzeit allein aktiver Plan; Übernahmebericht ist historischer Nachweis. Ein späterer Planwechsel erfordert bestandenen Migrationscheck und ausdrückliche Aktualisierung dieser Statusreferenz.

## src-1379

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:16` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben
- Anwendung: ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Diese Dokumentenübernahme ist keine technische Umsetzung des gesamten Website-Umbaus, keine vollständige Bildbestandsprüfung und keine Live-Freigabe. Solche Ergebnisse benötigen jeweils die in diesem Auftrag verlangten Belege.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Dokumentenübernahme beweist weder technischen Website-Umbau noch vollständige Bildbestandsprüfung noch Live-Freigabe. Getrennte aktuelle Belege für ST-WEB-02/03, ST-PHOTO-01 und ST-OPS-01; AC-COVR1-031-04.

## src-1380

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:20` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben
- Anwendung: projektweite Quellen- und Statusregel
- Verbindlicher Originalwortlaut: **Ablage:** Die Template-Spezifikation bleibt unter `docs/responsive-templates.md`; freigegebene Gestaltungsregeln bleiben unter `docs/design-guide.md`. Diese Datei bündelt ausschließlich die übergreifenden Prüf-, Originalschutz-, Freigabe- und Abnahmepflichten und wird aus der projektlokalen `AGENTS.md` referenziert. Keine widersprüchlichen Parallelfassungen erstellen und keine bestehenden Regeln ersetzen.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: Template-Regeln verbleiben in docs/responsive-templates.md, freigegebene Designregeln in docs/design-guide.md, übergreifende Prüf-/Originalschutz-/Freigabe-/Abnahmevorgaben hier und Referenz in projektlokaler AGENTS.md. Bei Regel-/Planänderungen Ablage, Verweis, Widerspruchsfreiheit und Nichtersetzung vorhandener Regeln prüfen.

## src-1381

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:29` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Prüfe und überarbeite die gesamte bestehende öffentliche Website anhand der aktuell gültigen Design-, Template- und Bildregeln. Die Anforderungen gelten auch für alle künftigen Seiten und Bildarbeiten.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-031: AC-COVR1-031-05 trennt Prüfung und nötige Überarbeitung der gesamten aktuellen öffentlichen Website; ST-WEB-01–05 decken Web-Scope, ST-PHOTO-01 nur Bildanteil. Derselbe Regel- und Nachweismaßstab gilt für künftige Seiten und Bildarbeiten. Produkt-/Bild-/Live-Abnahme offen.

## src-1382

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:31` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-02,ST-WEB-03,ST-OPS-01
- Verbindlicher Originalwortlaut: Dies ist ein technischer Umsetzungsauftrag einschließlich überprüfbarer Tests und Veröffentlichung nach dem bestehenden Projektablauf – nicht bloß ein Auftrag, Regeln zu speichern, einen Plan anzulegen oder künftige Einhaltung zu versprechen.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-01` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1383

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:33` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Es geht um eine zentrale technische Grundlage und die Umsetzung bereits freigegebener Gestaltung, nicht um ein eigenmächtiges Redesign. Gemeinsame Komponenten, responsive Seitentemplates und seitenspezifische Inhalte sind voneinander zu trennen.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-02` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1384

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:35` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Navigation, Galerien und andere gemeinsame Elemente müssen an einer zentralen Stelle gepflegt werden. Änderungen werden auf allen verwendenden Seiten wirksam, gegebenenfalls nach regulärem Build und Deployment, aber ohne manuelle Einzelpflege jeder Seite.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-03` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1385

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:37` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die vollständige Bestandsprüfung umfasst insbesondere Startseite, Fahrzeugseiten, Kajak-/Aktivitätsseiten, Bike- und Ausrüstungsseiten, Reiseübersichten und sämtliche Reiseberichte einschließlich vorhandener Sprachversionen und Seitengeneratoren. Unvollständige Inhalte und bereits ausdrücklich genehmigte Ausnahmen bleiben als solche gekennzeichnet; fehlende Inhalte nicht erfinden.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-04` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1386

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:39` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 1. Auftrag und Ziel
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Geschützte Bereiche wie Redaktion, Cockpit und Konto behalten ihre eigenen im Design-Guide beschriebenen Strukturen. Öffentliche Seitentemplates nicht auf diese Bereiche übertragen. Unbeabsichtigte Auswirkungen gemeinsam verwendeter Ressourcen sind auch dort zu prüfen; eine ungefragte Neugestaltung dieser Bereiche gehört nicht zum Auftrag.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-05` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1387

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:43` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Vor der Umsetzung den tatsächlichen aktuellen Arbeitsstand prüfen, nicht allein einen möglicherweise älteren GitHub- oder Live-Stand. Lies die geltenden Projektanweisungen, den Design-Guide, die Template-Spezifikation und bei Bildarbeiten den vorgesehenen Bild-Skill einschließlich der notwendigen Referenzen.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-06` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1388

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:45` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Zu prüfen sind insbesondere:
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Context; Implementierung und Live-Wirkung nicht verifiziert.

## src-1389

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:47` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Die tatsächlich geltenden `AGENTS.md`-Dateien und mögliche abweichende Anweisungsdateien.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-06` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1390

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:48` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - `docs/design-guide.md` und die dort dokumentierten Freigaben und Ausnahmen.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-06` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1391

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:49` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - `docs/responsive-templates.md` beziehungsweise die bereits übernommene maßgebliche Template-Spezifikation.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-06` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1392

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:50` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Der tatsächliche Bild-Skill. Ist sein konkreter Pfad noch nicht hinterlegt, ermittle den passenden Skill anhand der Inhalte unter `C:\Users\helmu\.codex\skills\`. Der Ordner allein ist noch kein Verweis auf eine bestimmte `SKILL.md`.
- BATCH-003: PKG-041; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-041`. Planning Coverage: Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-032: Konkretes Planungs-AC `AC-COVR1-032-06` im bestehenden Scrum-Entwurf; Anwendung und bedingte Freigaben bleiben durch den Originalwortlaut begrenzt. Kein Implementierungs- oder Live-Nachweis.

## src-1393

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:51` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Relevante Architektur-, Betriebs- und Statusunterlagen einschließlich des bestehenden Ausbauplans und Testsetups.
- COVERAGE-R1-033: AC-COVR1-033-01 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1394

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:53` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Keinen nicht gefundenen Skill erfinden, keine beliebigen anderen Skills übernehmen und keine Ersatzdatei mit vermeintlich bekanntem Inhalt erzeugen. Nötige Begleitdateien des ausgewählten Skills berücksichtigen. Existiert ein eigener Template- oder Design-Skill, ist auch dessen tatsächlicher Geltungsbereich zu prüfen; ohne solchen Skill gilt die vorhandene Template-Spezifikation.
- COVERAGE-R1-033: AC-COVR1-033-02 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1395

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:55` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Zu Beginn den Arbeitsstand und die tatsächlich verwendeten Regeldateien mit Pfad und nachprüfbarem Versionsbezug dokumentieren, beispielsweise Git-Commit oder Dateiprüfsumme. Bei wesentlichen Änderungen der Regeln erneut einlesen. Zwischen geladenen Dateien, angewendeten Vorgaben und tatsächlich geprüften Ergebnissen unterscheiden.
- COVERAGE-R1-033: AC-COVR1-033-03 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1396

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:57` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Fehlende Grundlagen und widersprüchliche Vorgaben ausdrücklich benennen. Keine von ungeklärten Vorgaben betroffene Umsetzung beginnen. Davon unabhängige Arbeiten dürfen weitergehen. Ausdrücklich freigegebene Nutzerentscheidungen erhalten; bei unklarer Bedeutung oder Tragweite gezielt rückfragen.
- COVERAGE-R1-033: AC-COVR1-033-04 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1397

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:59` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 2. Verbindliche Grundlagen tatsächlich lesen
- Anwendung: ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Eine Behauptung, Dateien gelesen zu haben, ist noch kein Konformitätsnachweis. Die Einhaltung muss am Ergebnis und anhand reproduzierbarer Prüfungen überprüfbar sein.
- COVERAGE-R1-033: AC-COVR1-033-03 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1398

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:63` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 3. Seitenbestand und Referenzen sichern
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Erstelle eine vollständige Übersicht aller betroffenen Routen und ihrer Sprachversionen. Ordne jeder Seite den Seitentyp, die maßgebliche Quelle, den gegebenenfalls zuständigen Generator, die verwendeten Komponenten und die geltenden Ausnahmen zu.
- COVERAGE-R1-033: AC-COVR1-033-05 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1399

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:65` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 3. Seitenbestand und Referenzen sichern
- Anwendung: ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Sichere vor dem Umbau den freigegebenen Zustand der Kajak-Seite und der Startseite auf Desktop, Tablet und Smartphone als Vergleichsbasis. Referenzen mit Datum, Quellstand, URL beziehungsweise Build und Bildschirmmaßen dokumentieren. Eine ältere oder nicht freigegebene Darstellung nicht stillschweigend zur Referenz erklären.
- COVERAGE-R1-033: AC-COVR1-033-06 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1400

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:67` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 3. Seitenbestand und Referenzen sichern
- Anwendung: ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Prüfe, ob Design-Guide, aktuelle Kajak-Seite und jüngere ausdrücklich freigegebene Entscheidungen miteinander übereinstimmen. Widersprüche nicht durch eigenmächtige Anpassung des Guides oder der Referenzen auflösen.
- COVERAGE-R1-033: AC-COVR1-033-06 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1401

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:69` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 3. Seitenbestand und Referenzen sichern
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Vorhandene Statusangaben wie „erledigt“ oder „live geprüft“ sind historische Angaben und ersetzen keine aktuelle Prüfung des tatsächlich bearbeiteten Stands.
- COVERAGE-R1-033: AC-COVR1-033-07 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1402

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:73` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 4. Startseite: eigenes Layout, keine Ausnahme von Bildschutz und Prüfung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die Startseite bleibt von der Überführung in die Fahrzeug-, Kajak-/Aktivitäts- und Reisebericht-Templates ausgenommen. Ihr eigener Aufbau, ihre Abschnittsreihenfolge, ihre besonderen Funktionen und ihre eigenständige Darstellung auf Desktop, Tablet und Smartphone bleiben erhalten.
- COVERAGE-R1-033: AC-COVR1-033-07 konkretisiert die Planungsdeckung; Umsetzung, Freigaben und Live-Wirkung sind nicht verifiziert.

## src-1403

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:75` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 4. Startseite: eigenes Layout, keine Ausnahme von Bildschutz und Prüfung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Die Startseite darf nicht automatisch dem Aufbau einer Unterseite angeglichen werden. Gemeinsame Komponenten wie Navigation, Footer und Foto-Viewer dürfen zentral genutzt werden, ohne das individuelle Startseitenlayout unbeabsichtigt zu verändern. Notwendige Unterschiede über ausdrücklich definierte Varianten abbilden, nicht durch vollständig kopierte Komponenten.
- COVERAGE-R1-034: AC-COVR1-034-01 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1404

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:77` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 4. Startseite: eigenes Layout, keine Ausnahme von Bildschutz und Prüfung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: **Die Ausnahme betrifft ausschließlich die Vereinheitlichung der Seitenstruktur. Die Bildregeln, der Schutz der Originaldateien, die geltenden allgemeinen Designregeln und die Prüfpflicht gelten auch für die Startseite.**
- COVERAGE-R1-034: AC-COVR1-034-01/02 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1405

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:79` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 4. Startseite: eigenes Layout, keine Ausnahme von Bildschutz und Prüfung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03
- Verbindlicher Originalwortlaut: Abweichungen zwischen dem geschützten Startseitenzustand und einer Designvorgabe offenlegen. Keine neue gestalterische Entscheidung ohne Freigabe treffen. Bestehende freigegebene Ausnahmen bewahren.
- COVERAGE-R1-034: AC-COVR1-034-02 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1406

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:83` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Der freigegebene `docs/design-guide.md` ist verbindlich, keine lose Inspiration. Konkrete Vorgaben für Farben, Typografie, Größen, Abstände, Navigation, Hero-Bereiche, Galerien und Verhalten aus der tatsächlichen aktuellen Fassung ableiten.
- COVERAGE-R1-034: AC-COVR1-034-03 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1407

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:85` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die bestehende freigegebene Kajak-Seite ist die visuelle und funktionale Referenz für passende Unterseiten und gemeinsame Komponenten. Ihr gelungener Look and Feel darf beim technischen Umbau nicht unbeabsichtigt verloren gehen. Kein ungefragter Bildaustausch, keine kreative Neuinterpretation, keine inhaltliche Neufassung.
- COVERAGE-R1-034: AC-COVR1-034-04 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1408

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:87` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Andere Seitentypen dürfen einen anderen passenden Inhaltsaufbau haben. Ein Reisebericht muss nicht dieselbe Gesamtstruktur wie eine Kajak-Seite besitzen; gemeinsam verwendete Elemente folgen aber derselben Designsprache und Implementierung.
- COVERAGE-R1-034: AC-COVR1-034-04 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1409

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:89` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Gemeinsame Werte wie Farben, Schriftregeln, Abstände, Inhaltsbreiten und responsive Umschaltpunkte zentral abbilden. Keine parallel gepflegten seitenbezogenen Varianten ohne dokumentierten fachlichen Grund.
- COVERAGE-R1-034: AC-COVR1-034-05 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1410

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:91` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 5. Design-Guide und Kajak-Seite als Gestaltungsgrundlage
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Widersprüche zwischen Design-Guide, freigegebener Kajak-Referenz und Template-Spezifikation nach dem Freigabeprozess in Abschnitt 11 behandeln. Den Guide niemals nachträglich ändern, um eine unbeauftragte Abweichung zu legitimieren.
- COVERAGE-R1-034: AC-COVR1-034-06 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1411

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:95` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bestehende Implementierungen, Generatoren und gemeinsam genutzte Ressourcen zuerst prüfen und weiterverwenden. Wiederkehrende Elemente in gemeinsame Komponenten, Includes oder Partials überführen, passend zur vorhandenen Architektur.
- COVERAGE-R1-034: AC-COVR1-034-07 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1412

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:97` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Das umfasst insbesondere Header und Navigation mit mobilen Menüs und aktiven Zuständen, Footer, Galerien, Foto-Viewer beziehungsweise Lightbox, Buttons, Karten, Infoboxen und wiederkehrende Inhaltsabschnitte.
- COVERAGE-R1-034: AC-COVR1-034-07 im Scrum-Entwurf; Planning Coverage: Covered. Originalwortlaut bleibt verbindlich. Implementation Verification, Design-/Bildfreigabe und Live-Stand offen.

## src-1413

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:99` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Je gemeinsamem Baustein gibt es eine maßgebliche Implementierung für Markup, Styles und Verhalten. Seitenspezifische Bilder, Texte, Sprachen, Links und Zustände werden als Daten beziehungsweise klar definierte Konfiguration übergeben.
- COVERAGE-R1-035: AC-COVR1-035-01 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1414

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:101` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bewusst benötigte Varianten dokumentieren. Keine eigenen Galerie-Skripte, Navigationslösungen oder Mobile-CSS-Kopien pro Seite. Automatisch erzeugte gleichartige Ausgabedateien sind zulässig, sofern sie zuverlässig aus zentralen Quellen entstehen und nicht separat von Hand gepflegt werden.
- COVERAGE-R1-035: AC-COVR1-035-01 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1415

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:103` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Nicht mehr benötigte Parallelimplementierungen erst nach erfolgreicher Umstellung entfernen. Bestehende Funktionen und redaktionelle Arbeitsabläufe erhalten.
- COVERAGE-R1-035: AC-COVR1-035-02 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1416

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:107` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien / 6.1 Gemeinsamer Galerie-Standard für den gesamten Seitenbestand
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die freigegebene Kajak-Galerie ist die visuelle und funktionale Referenz. Vor der Migration sind ihre Desktop-, Tablet- und Mobilansichten samt Foto-Viewer zu sichern. Danach verwendet auch die Kajak-Seite dieselbe zentrale Galerie-Komponente wie die anderen Inhaltsseiten: eine Quelle für Markup, Styles, responsive Regeln und Verhalten. Bilder, Reihenfolge, Alternativtexte, Bildunterschriften, Überschrift und Einleitung bleiben seitenspezifische Daten. Strukturelle Varianten benötigen die in Abschnitt 11 verlangte Freigabe. Generatoren beziehen dieselbe Komponente; generierte Ausgaben sind keine eigenständig gepflegten Galerien.
- COVERAGE-R1-035: AC-COVR1-035-03 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1417

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:117` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien / 6.1 Gemeinsamer Galerie-Standard für den gesamten Seitenbestand
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Raster, Bildformat, Abstände und Typografie richten sich ausschließlich nach dem aktuellen Design-Guide. Alle Galerien verwenden den gemeinsamen Foto-Viewer mit den freigegebenen Funktionen für Vergrößerung, Schließen, Bildunterschrift, Tastatur, Fokus, Vor/Zurück und vorhandene Touch-Bedienung. Keine neuen Gesten oder Automatiken aus dieser Aufzählung ableiten. Die Vollansicht lädt das vollständige freigegebene Webbild; ein abweichender Pfad darf weder Archivoriginale offenlegen noch Kennzeichenanonymisierung oder andere Bildfreigaben umgehen. Bildregeln gelten für Kachel, Vollansicht und responsive Ableitungen gleichermaßen.
- COVERAGE-R1-035: AC-COVR1-035-04 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1418

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:127` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien / 6.1 Gemeinsamer Galerie-Standard für den gesamten Seitenbestand
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Für jede öffentliche Inhaltsunterseite sind Galerie oder ausdrücklich genehmigte Ausnahme, Inhaltsquelle, Komponente, Viewer, Bildstatus und Prüfergebnis festzuhalten. Fehlendes Material oder fehlende Freigaben sind offene Punkte, keine Ausnahme. Auf der Startseite wird keine Galerie automatisch ergänzt; ihre vorhandenen Bildfunktionen und ihr Aufbau bleiben geschützt.
- COVERAGE-R1-035: AC-COVR1-035-05 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1419

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:134` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 6. Zentrale Komponenten statt Kopien / 6.1 Gemeinsamer Galerie-Standard für den gesamten Seitenbestand
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die Abnahme umfasst alle betroffenen Routen in Desktop-, Tablet- und Mobilbreiten sowie Hoch- und Querformat. In einer isolierten Testumgebung ist nachzuweisen, dass eine kontrollierte Änderung der zentralen Galeriequelle alle verwendenden Seiten einschließlich Kajak erreicht. Der Testzustand ist danach zu entfernen und darf nicht live gehen. Jede Korrektur wird auf allen Nutzern der Komponente erneut geprüft; Fehler, ungeprüfte Ansichten und fehlende Freigaben bleiben ausdrücklich sichtbar.
- COVERAGE-R1-035: AC-COVR1-035-06 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1420

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:144` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Gemeinsames Website-Grundlayout und inhaltliche Seitentypen trennen. Mindestens folgende wiederverwendbare Templates vorsehen:
- COVERAGE-R1-035: AC-COVR1-035-07 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1421

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:148` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.1 Kajak-/Aktivitäts-/Themenseiten
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Aus der bestehenden Kajak-Seite ableiten. Die Kajak-Seite selbst verwendet anschließend dasselbe Template wie vergleichbare weitere Seiten; sie darf keine separat gepflegte Referenzimplementierung neben einem zweiten Template bleiben.
- COVERAGE-R1-035: AC-COVR1-035-07 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1422

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:152` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.2 Fahrzeugseiten
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Den passenden Aufbau der vorhandenen Fahrzeug-Seite als wiederverwendbares Fahrzeug-Template abbilden. Inhalte, technische Daten und optionale Abschnitte pro Fahrzeug pflegen. Gemeinsame Komponenten und Gestaltung zentral beziehen.
- COVERAGE-R1-035: AC-COVR1-035-07 im Scrum-Entwurf deckt die geprüften Klauseln als Planung. Planning Coverage: Covered; tatsächliche Implementierung, nötige Freigaben und Live-Wirkung nicht verifiziert.

## src-1423

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:156` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.3 Reiseberichte
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Eine wiederverwendbare, ausreichend flexible Berichtsstruktur nutzen. Vorhandene passende Generatoren zuerst prüfen und konsolidieren. Texte, Bilder, Galerien und weitere bereits vorhandene Berichtselemente als Inhalte einbinden.
- BATCH-003: PKG-042; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-042`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-01 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1424

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:160` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.4 Weitere Seiten und neue Inhalte
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Übersichtsseiten und andere Seitentypen sinnvoll einordnen, ohne sie in unpassende Detailseitenlayouts zu zwingen. Fehlende optionale Abschnitte dürfen keine leeren Blöcke und falschen Abstände erzeugen. Pflichtbestandteile gemäß Guide dürfen nicht eigenmächtig als optional behandelt werden.
- BATCH-003: PKG-042; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-042`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-02 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1425

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:162` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.4 Weitere Seiten und neue Inhalte
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Titel, Texte, Bildzuordnungen, Bildunterschriften, Galerien, Daten, Links und SEO-Metadaten von gemeinsamer Darstellung und Funktion trennen. Vorhandene maßgebliche Inhaltsquellen erhalten; kein unnötiges zweites Inhaltssystem einführen.
- BATCH-003: PKG-042; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-042`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-03 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1426

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:164` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.4 Weitere Seiten und neue Inhalte
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Neue Seiten entstehen durch Auswahl des Seitentyps und Ergänzung der Inhalte, nicht durch Kopieren einer vollständigen Seite. Unterschiedliche Sprachversionen dürfen keine unabhängig gepflegten Designkopien erfordern.
- BATCH-003: PKG-042; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-042`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-03 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1427

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:166` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 7. Wiederverwendbare Seitentemplates und getrennte Inhalte / 7.4 Weitere Seiten und neue Inhalte
- Anwendung: ST-WEB-02,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bestehende Inhalte, URLs, Anker, Links, Metadaten und Funktionen erhalten. Texte nicht kürzen oder umschreiben, nur damit sie leichter in ein Template passen. Ein grundlegender Framework-Wechsel ist kein automatischer Teil dieses Auftrags.
- BATCH-003: PKG-042; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-042`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-04 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1428

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:170` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 8. Responsive Vereinheitlichung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Alle Komponenten und Templates müssen Desktop, Tablet und Smartphone einschließlich Hoch- und Querformat abdecken. Eine gemeinsame responsive Implementierung verwenden, keine getrennt gepflegten Mobilversionen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-05 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1429

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:172` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 8. Responsive Vereinheitlichung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bestehende unbeabsichtigte mobile Abweichungen untersuchen und beseitigen, nicht in die neuen Templates übernehmen. Besonders Header, Sprachwahl, Menüs, Hero-Darstellung, Seitenränder, Überschriften, Karten, Galerien und Foto-Viewer prüfen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-05 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1430

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:174` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 8. Responsive Vereinheitlichung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Bei gleicher Bildschirmbreite, gleicher Variante und gleichem Zustand müssen gemeinsame Komponenten gleich gestaltet sein und gleich funktionieren, abgesehen von ihren tatsächlichen Inhalten. Unterschiedliche Textlängen erfordern keine identische Seitenhöhe.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-05 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1431

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:176` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 8. Responsive Vereinheitlichung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Responsive Regeln aus dem aktuellen Guide anwenden. Ist die dokumentierte Hero-Grenze von 600 CSS-Pixeln im Hochformat weiterhin gültig, diese sowie die Übergänge unmittelbar darunter und darüber ausdrücklich testen. Keine neue Grenze ungefragt einführen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-06 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1432

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:178` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 8. Responsive Vereinheitlichung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Auch kurze und lange Inhalte, fehlende optionale Abschnitte und vorhandene Sprachen testen. Unbeabsichtigtes horizontales Scrollen, abgeschnittene Inhalte, Überlagerungen und unbedienbare Elemente beheben.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-036: Original und aktuelle Story-Ziele erneut abgeglichen; AC-COVR1-036-06 deckt die fachlichen Klauseln als Planung. Implementation Verification, Bild-/Release-Freigaben und Live-Zustand offen.

## src-1433

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:182` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-WEB-02,ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Der tatsächlich festgelegte Bild-Skill ist bei jeder VanVenture-Aufgabe anzuwenden, in der Bilder ausgewählt, bearbeitet, zugeschnitten, optimiert, exportiert, eingebunden, ersetzt oder veröffentlicht werden. Dies gilt auch, wenn die Bildarbeit nur ein Teil einer größeren Aufgabe ist.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1434

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:184` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-WEB-02,ST-WEB-03,ST-PHOTO-01
- Verbindlicher Originalwortlaut: Die Pflicht gilt ausschließlich für VanVenture und für alle dort verwendeten Bilder: Startseite, Fahrzeug-, Kajak-/Aktivitäts-, Bike-, Ausrüstungs- und Reiseseiten; Hero- und Hintergrundbilder, Fließtextbilder, Galerien, Vorschaubilder, Lightbox-Vollansichten und alle responsiven Varianten.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Context; Implementierung und Live-Wirkung nicht verifiziert.

## src-1435

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:186` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01,ST-PHOTO-02
- Verbindlicher Originalwortlaut: Prüfe den gesamten bestehenden veröffentlichten Bildbestand, nicht nur neu hinzukommende Bilder. Doppelt verwendete identische Dateien können einmal auf Dateiebene geprüft werden; ihre verschiedenen Einbindungen und Darstellungen trotzdem erfassen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1436

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:188` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01,ST-PHOTO-02
- Verbindlicher Originalwortlaut: Bereits regelkonforme Bilder unverändert lassen. Kein pauschales erneutes Bearbeiten aller Fotos und keine blind identischen Einstellungen für alle Motive. Motive, Quelle und redaktionelle Funktion berücksichtigen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1437

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:190` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01,ST-PHOTO-02
- Verbindlicher Originalwortlaut: Bestehende Regeln zu dokumentarischer Bildtreue, Kennzeichen, Kindern, Freigaben und unveränderten Originalkopien erhalten. Einen möglicherweise allgemeineren Bild-Skill nicht als Erlaubnis verstehen, strengere VanVenture-Vorgaben zu umgehen. Widersprüche vor betroffener Bearbeitung klären.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1438

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:192` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01,ST-PHOTO-02
- Verbindlicher Originalwortlaut: **Personenregel, ausdrückliche Nutzerentscheidung vom 24.09.2026:** Erkennbare Kinder auf VanVenture-Bildableitungen anonymisieren. Erwachsene nur dann im Gesicht anonymisieren, wenn der Nutzer es für das betreffende Motiv ausdrücklich verlangt; nicht pauschal vorsorglich maskieren. Helmut und Sabine dürfen erkennbar bleiben. Bei unklarem Alter oder unklarer Freigabe das Motiv zurückstellen und ausdrücklich nachfragen. Der Kennzeichenschutz bleibt unverändert; ein trotz Bearbeitung erkennbares Kind darf weiterhin nur nach ausdrücklicher Auswahl des Fotos veröffentlicht werden. Diese Personenregel gilt ausschließlich im VanVenture-Projekt.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1439

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:202` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Wo Anonymisierung nach dieser Regel erforderlich oder ausdrücklich beauftragt ist, muss sie präzise und zugleich wirksam sein: nur sichtbare Gesichtsmerkmale beziehungsweise Kennzeicheninhalte mit kleinem Sicherheitsrand maskieren, weich auslaufende Kanten statt grober Pixelblöcke verwenden und unnötige Abdeckung von Haaren, Kleidung, Körpern oder Hintergrund vermeiden. Die Unkenntlichmachung muss in der größten veröffentlichten oder geprüften Ansicht bestehen bleiben; bei 100 Prozent und in allen Darstellungsgrößen kontrollieren. Bei vom Nutzer ausdrücklich bestätigter Ablenkungsentfernung nur das benannte Element auf einer Projektableitung retuschieren und die Stelle bei 100 Prozent auf Nähte, Wiederholungsmuster und unbeabsichtigte Szenenänderungen prüfen. Die natürliche Outdoor-Editorial-Farbgebung des festgelegten VanVenture-Fotoskills ist motivbezogen anzuwenden, nicht mit pauschalen identischen Einstellwerten.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1440

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:216` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Jede veröffentlichte Bilddatei und jede Ableitung einem stabilen Bilddatensatz zuordnen. Darin mindestens festhalten: interne Bild-ID, verwendete Seiten, Quelle beziehungsweise Herkunft, unveränderte Projektkopie, Prüfsummen, Ableitungen und Exportparameter, verwendeter Skill mit Versionsbezug, tatsächlich vorgenommene Bearbeitung und erforderliche Freigaben.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1441

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:218` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 9. Bild-Skill und gesamter Bildbestand
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Die veröffentlichten Dateivarianten prüfen, nicht nur eine lokale Vorschau. Freigaben für bestimmte Bilder oder Veröffentlichungsorte nicht stillschweigend auf andere Motive oder Zusammenhänge ausweiten. Fehlende Herkunft, Originale oder Freigaben als offene Punkte melden; keine Motive eigenmächtig ersetzen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1442

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:224` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.1 Absolute Arbeitsgrenze
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Alle als Originalarchiv bezeichneten Ordner einschließlich Unterverzeichnissen und Dateien bleiben ausschließlich Lesequellen. Das betrifft insbesondere die bereits benannten Pfade `E:\_fotos_original` und `E:\_fotos\_original`, soweit sie im tatsächlichen Arbeitsumfeld vorhanden sind, sowie weitere ausdrücklich benannte Originalarchive.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1443

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:226` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.1 Absolute Arbeitsgrenze
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Dort niemals Bilder, Dateinamen, eingebettete Metadaten oder Verzeichnisstrukturen verändern, verschieben, löschen, überschreiben oder ergänzen. Keine temporären Dateien, Caches, Vorschauen, Manifeste, Exportdateien oder Tool-Nebendateien in einem Originalarchiv ablegen. Keine Verarbeitung „in place“.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-037 / aktueller Zielabgleich: AC-COVR1-037-01–07 decken die fachlichen Klauseln als Planung; PKG-043 bleibt datierter Vorbefund. Planning Coverage: Covered. Implementation Verification, konkrete Bild-/Release-Freigaben und Live-Prüfung offen.

## src-1444

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:228` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.1 Absolute Arbeitsgrenze
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Vor Bearbeitung eine unveränderte Projektkopie erstellen und ihre Übereinstimmung mit der Quelle prüfen. Diese unveränderte Kopie erhalten; alle bearbeiteten Dateien daraus in einem gesonderten Ausgabeordner erzeugen. Unanonymisierte Projektoriginale und Archivinformationen nicht automatisch in öffentliche Webordner oder öffentlich zugängliche Repositories übernehmen.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-01 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1445

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:232` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.2 Technische Schutzmaßnahmen
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Schutz nicht allein durch eine Chat-Anweisung absichern. Den Bildverarbeitungsprozess nach Möglichkeit so ausführen, dass Originalarchive technisch nur lesbar oder nach dem Kopieren nicht mehr zugänglich sind, etwa über eine entsprechend eingeschränkte Ausführungsumgebung.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-02 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1446

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:234` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.2 Technische Schutzmaßnahmen
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Tatsächliche Lese- und Schreibgrenzen prüfen und dokumentieren. Ausschließlich ausdrücklich erlaubte Projekt-Ausgabeordner als Schreibziele zulassen. Pfade vor Nutzung auflösen und auch Verknüpfungen, symbolische Links beziehungsweise Junctions berücksichtigen, damit kein scheinbarer Projektpfad tatsächlich in ein Originalarchiv führt.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-02 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1447

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:236` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.2 Technische Schutzmaßnahmen
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Keine systemweiten Berechtigungen, Eigentümer oder Archiv-ACLs ohne ausdrückliche Freigabe verändern. Die Schutzfunktion in einer isolierten Testumgebung mit Testdateien prüfen, niemals durch einen versuchsweisen Schreibzugriff auf echte Originale. Vorhandene Rechte und Einbindungen am Originalarchiv nur lesend kontrollieren.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-03 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1448

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:238` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.2 Technische Schutzmaßnahmen
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Kann die technische Trennung nicht eingerichtet oder geprüft werden, die Einschränkung ausdrücklich melden. Keine automatisierte Bearbeitung beginnen, deren Ausführung Originale beschreiben könnte. Andere sichere Arbeiten dürfen fortgesetzt werden.
- BATCH-003: PKG-043; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-043`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-03 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1449

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:242` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Vor der ersten Verarbeitung für alle im Auftrag verwendeten Originaldateien ein unverändertes Ausgangsmanifest außerhalb des Archivs sichern. Mindestens Quelle beziehungsweise interne Quell-ID, Dateipfad im privaten Nachweis, Dateigröße und SHA-256-Prüfsumme erfassen. Nach Abschluss erneut unabhängig einlesen und vergleichen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-04 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1450

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:244` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Die verwendeten Originaldateien müssen an ihren ursprünglichen Stellen vorhanden sein und unveränderte Inhaltsprüfsummen besitzen. Löschungen, Umbenennungen oder zusätzliche Dateien im überwachten Bereich über einen Verzeichnisabgleich prüfen, soweit dafür ein vollständiger Vorher-Stand vorliegt. Umfang und Grenzen dieser Kontrolle ausdrücklich nennen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-05 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1451

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:246` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Ein Dateihash ersetzt keine Berechtigungs- oder vollständige Verzeichnisprüfung. Aus der Prüfung ausgewählter Dateien keine Behauptung ableiten, das gesamte übrige Archiv vollständig verglichen zu haben. Den umfassenden Schutz insbesondere durch die technische Schreibgrenze absichern.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-05 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1452

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:248` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Das Vorher-Manifest nicht nach der Bearbeitung erzeugen, austauschen oder überschreiben. Unveränderlich beziehungsweise geschützt aufbewahren und mit dem geprüften Lauf verknüpfen. Ein Vorfall darf nicht durch Anpassen des Ausgangsstands als bestanden dargestellt werden.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-04/06 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1453

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:250` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Bei einer unerwarteten Änderung sofort die betroffene Verarbeitung stoppen, Belege sichern und konkret berichten. Keine stillschweigende Wiederherstellung, Löschung von Spuren oder weitere automatische Archivänderung. Wiederherstellung nur mit ausdrücklicher Freigabe.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.
- COVERAGE-R1-038 / aktueller Original- und Zielabgleich: AC-COVR1-038-06 und TASK-COVR1-038-01–04 konkretisieren die Schutz- und Prüfplichten in ST-PHOTO-01. Planning Coverage: Covered. Der BATCH-003-Befund bleibt historisch; technische Umsetzung, Originalprüfung, Freigaben und Live-Zustand sind ungeprüft.

## src-1454

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:252` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 10. Sicherheitsregel: Originale schützen und Unverändertheit nachweisen / 10.3 Vorher-/Nachher-Nachweis
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Private Quellpfade, Originalbilder und sensible Bildinformationen geschützt speichern und nicht über die öffentliche Website oder ungeschützte Prüfberichte zugänglich machen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-01 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1455

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:258` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.1 Unterscheidung zwischen Umsetzung und neuer Gestaltungsentscheidung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Bereits freigegebene Regeln dürfen ohne erneute Nachfrage umgesetzt und Verstöße dagegen korrigiert werden. Eine ausdrücklich erteilte aktuelle Freigabe gilt innerhalb ihres konkreten Umfangs; dieselbe Entscheidung nicht nochmals abfragen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-02 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1456

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:260` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.1 Unterscheidung zwischen Umsetzung und neuer Gestaltungsentscheidung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Eine neue allgemeine Designregel, Änderung einer bestehenden Regel, neue Komponentenvariante, Ausnahme oder sonstige gestalterische Erweiterung benötigt eine eindeutige Freigabe, bevor sie zum verbindlichen Standard oder live wirksam wird. Einen Auftrag für eine einzelne Seite nicht automatisch als Erlaubnis für eine globale Regeländerung auslegen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-02 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1457

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:262` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.1 Unterscheidung zwischen Umsetzung und neuer Gestaltungsentscheidung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Vor neuen visuellen Entscheidungen prüfen, ob sie den Guide verändern oder erweitern. Bei unklarer Reichweite gezielt klären: Soll die Änderung nur für diese Seite, als dokumentierte Variante oder als neue globale Regel gelten?
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-02 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1458

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:266` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.2 Konkrete Rückfrage statt pauschaler Zustimmung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Ein Vorschlag muss enthalten: betroffene bestehende Regel, vorgeschlagene Änderung, Begründung, betroffene Seiten und Bildschirmgrößen sowie Auswirkungen auf Startseite, Templates, Bilder und Funktionen. Bei visuellen Änderungen möglichst eine klar als Entwurf markierte Vorschau oder einen Vorher-/Nachher-Vergleich beilegen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-03 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1459

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:268` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.2 Konkrete Rückfrage statt pauschaler Zustimmung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Geeignete Entscheidungsfrage:
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Context; Implementierung und Live-Wirkung nicht verifiziert.

## src-1460

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:270` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.2 Konkrete Rückfrage statt pauschaler Zustimmung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: > Darf diese Änderung als neue allgemeine Regel in den Design-Guide übernommen werden, oder soll sie nur als ausdrücklich dokumentierte Ausnahme für die genannte Seite gelten?
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Context; Implementierung und Live-Wirkung nicht verifiziert.

## src-1461

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:272` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.2 Konkrete Rückfrage statt pauschaler Zustimmung
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Bis zur Entscheidung gilt die zuletzt freigegebene Fassung. Schweigen ist keine Zustimmung. Entwürfe weder als freigegeben markieren noch als verbindliche neue Regel veröffentlichen. Nicht betroffene Arbeiten dürfen weitergehen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-04 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1462

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:276` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.3 Nach Freigabe konsistent aktualisieren
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Nach eindeutiger Freigabe Design-Guide, betroffene zentrale Komponenten beziehungsweise Templates, notwendige Skill-Verweise, Tests und Projektstatus im selben Änderungsvorgang konsistent aktualisieren. Keine dauerhafte Trennung zwischen freigegebener Gestaltung, Dokumentation und tatsächlicher Implementierung hinterlassen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-05 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1463

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:278` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.3 Nach Freigabe konsistent aktualisieren
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Im Änderungsnachweis Datum, betroffene Regel, Änderung, Geltungsbereich und tatsächlichen Freigabebeleg dokumentieren, beispielsweise eine verfügbare Entscheidungsreferenz. Keine Freigabe-ID, Zustimmung oder Zeitangabe erfinden.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-05 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1464

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:280` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.3 Nach Freigabe konsistent aktualisieren
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Sachliche Status- und Nachweisaktualisierungen zu bereits genehmigten Änderungen können unmittelbar dokumentiert werden, sofern sie die normative Bedeutung nicht verändern. Neue Regeln oder Ausnahmen benötigen dagegen Freigabe. Sichtprüfungsreferenzen nur nach passender Freigabe ändern.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-06 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1465

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:282` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 11. Design-Guide: verbindlich, aktuell und nur mit gültiger Freigabe ändern / 11.3 Nach Freigabe konsistent aktualisieren
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05,ST-PHOTO-01,ST-PHOTO-02,ST-PHOTO-05
- Verbindlicher Originalwortlaut: Den Guide nicht automatisch an fehlerhafte Implementierung anpassen. Tests und Referenzbilder nicht abschwächen oder ersetzen, nur damit Abweichungen verschwinden. „Guide aktualisiert“ darf niemals bedeuten, eine ungefragte Designentscheidung nachträglich zu legitimieren.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-039: Original gegen aktuelle AC geprüft; Planning Coverage: Covered über AC-COVR1-039-06 und die zugehörigen Prüftasks. Implementation Verification, Freigaben und Live-Wirkung offen.

## src-1466

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:286` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Erstelle eine nachvollziehbare Prüfmatrix, die jede wesentliche geltende Vorgabe mit ihrer Umsetzung und ihrer Prüfung verbindet. Vorhandene Regeln mit stabilen Kennungen referenzieren; dadurch keine neuen ungeprüften Designregeln einführen.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-01 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1467

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:288` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Jeder Eintrag enthält mindestens:
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Context; Implementierung und Live-Wirkung nicht verifiziert.

## src-1468

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:290` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Vorgabe, Quelle und Versionsbezug.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1469

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:291` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Betroffene Seiten, Komponenten, Bilder oder geschützte Daten.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1470

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:292` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Tatsächliche Implementierung beziehungsweise technischer Schutz.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1471

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:293` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Prüfmethode, reproduzierbaren Testbefehl oder manuelle Prüfschritte.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1472

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:294` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Ergebnis, Umfang, Zeitpunkt und Verweis auf konkrete Belege.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1473

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:295` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: - Offene Abweichungen und gegebenenfalls tatsächliche Nutzerfreigabe.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-02 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1474

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:297` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Ergebnisse eindeutig trennen: **BESTANDEN**, **FEHLGESCHLAGEN**, **NICHT GEPRÜFT**, **BLOCKIERT** oder **NICHT ANWENDBAR – begründet**. „Nicht anwendbar“ darf keine fehlende Umsetzung oder fehlenden Zugang verdecken. Eine genehmigte Ausnahme mit ihrem konkreten Umfang separat ausweisen.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-03 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1475

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:299` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Keine pauschalen Häkchen, frei erfundenen Testergebnisse oder bloßen Formulierungen wie „alle Regeln beachtet“. Maschinenprüfungen mit den tatsächlichen Ausgaben belegen. Manuelle Sichtprüfungen mit geprüfter Ansicht und konkretem Befund dokumentieren. Ein gespeicherter Screenshot allein ist keine Sichtprüfung.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-04 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1476

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:301` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 12. Nachweismatrix statt pauschaler Selbstauskunft
- Anwendung: alle betroffenen Web-, Foto- und Betriebs-Slices; Prüftasks ST-WEB-03,ST-PHOTO-01,ST-OPS-01
- Verbindlicher Originalwortlaut: Nachweise mit dem tatsächlich getesteten Quellstand, Build und gegebenenfalls Live-Release verbinden. Lokale Tests nicht als Nachweis einer noch nicht geprüften Veröffentlichung darstellen.
- BATCH-003: PKG-044; COVERAGE-R1-040: Planning Coverage Covered durch AC-COVR1-040-05 und die übergreifenden Matrix-Prüftasks. Tatsächliche Implementierung, Prüfbelege, Freigaben und Live-Wirkung bleiben separat unverifiziert.

## src-1477

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:307` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.1 Tatsächliche Wiederverwendung nachweisen
- Anwendung: ST-WEB-01,ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Für jede Seite festhalten: Route → Inhaltsquelle → Template beziehungsweise Generator → gemeinsame Komponenten → Styles und Skripte. Nachweisen, dass passende Seiten tatsächlich dieselben zentralen Quellen verwenden und nicht nur ähnlich aussehende Kopien besitzen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-041: AC-COVR1-041-01 plant die vollständige Quellkette und den Nachweis gemeinsamer Quellen je betroffener Seite. Tatsächlicher Quell-/Build-Nachweis bleibt offen.

## src-1478

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:309` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.1 Tatsächliche Wiederverwendung nachweisen
- Anwendung: ST-WEB-02,ST-WEB-03,ST-WEB-04,ST-WEB-05
- Verbindlicher Originalwortlaut: Die zentrale Änderungswirkung in einer isolierten Testumgebung überprüfen: Eine kontrollierte Änderung an einer gemeinsamen Komponente beziehungsweise einem Template muss nach dem normalen Build alle zugehörigen Seiten erreichen, ohne deren Einzelquellen anzupassen. Probezustände anschließend vollständig entfernen. Solche Tests nicht auf der Live-Website durchführen.
- BATCH-003: PKG-044; geprüfte Klauseln und offene Prüfpunkte im Planabschnitt `BATCH-003 / PKG-044`. Planning Coverage: Partially Covered; Implementierung und Live-Wirkung nicht verifiziert.

- COVERAGE-R1-041: AC-COVR1-041-02 plant den isolierten lokalen Änderungstest, normalen Build, alle zugehörigen Seiten, vollständiges Entfernen der Probe und das Live-Testverbot. Ausführung bleibt offen.

## src-1479

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:311` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.1 Tatsächliche Wiederverwendung nachweisen
- Anwendung: ST-WEB-01, ST-WEB-02, ST-WEB-04, ST-WEB-05
- Verbindlicher Originalwortlaut: Unterschiede als Inhalt, Konfiguration oder genehmigte Variante dokumentieren. Die Startseite behält ihr eigenes Layout. Generierte Ausgaben nicht mit unerlaubten manuell gepflegten Quellkopien verwechseln.

- PKG-045 / Planungszuordnung: ST-WEB-01, ST-WEB-02, ST-WEB-04, ST-WEB-05. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1480

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:313` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.1 Tatsächliche Wiederverwendung nachweisen
- Anwendung: ST-WEB-02, ST-WEB-03, ST-WEB-04
- Verbindlicher Originalwortlaut: Mit Testdaten zeigen, wie eine weitere Aktivitätsseite, Fahrzeugseite und ein Reisebericht entstehen, ohne ein vollständiges Seitenlayout zu kopieren. Keine erfundenen Testseiten öffentlich veröffentlichen.

- PKG-045 / Planungszuordnung: ST-WEB-02, ST-WEB-03, ST-WEB-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1481

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:317` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.2 Reproduzierbare visuelle Prüfung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Alle betroffenen öffentlichen Seiten auf Desktop, Tablet und Smartphone prüfen. Geeignete Ansichten beispielsweise bei 360, 390, 768, 1024 und 1440 CSS-Pixeln sowie direkt an gültigen Layoutgrenzen verwenden. Diese Werte sind Testgrößen und keine neue Designvorgabe. Hoch- und Querformat berücksichtigen.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1482

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:319` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.2 Reproduzierbare visuelle Prüfung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Startseite und Kajak-Seite zusätzlich mit ihrem gesicherten freigegebenen Referenzzustand vergleichen. Andere Seiten anhand des geltenden Seitentyps und der gemeinsamen Regeln prüfen. Abweichungen markieren und begründen, statt Referenzbilder automatisch an den neuen Zustand anzupassen.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1483

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:321` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.2 Reproduzierbare visuelle Prüfung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Farben, Schriftgrößen, Abstände, Spaltenanzahl und andere konkret definierte Werte soweit möglich auch über tatsächliche DOM-/CSS-Werte prüfen. Visuelle Differenzbilder ergänzen, aber ersetzen nicht die Prüfung von Inhalt, Bildqualität und Bedienbarkeit.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1484

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:323` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.2 Reproduzierbare visuelle Prüfung
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Browser-Emulation und echte Geräteprüfungen unterscheiden. Kein bestimmtes Gerät als getestet ausgeben, wenn lediglich dessen Bildschirmgröße emuliert wurde. Bekannte Grenzen transparent dokumentieren.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1485

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:327` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.3 Bedienung und bestehende Tests
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Navigation, Login-Flyout soweit betroffen, Sprachwechsel, mobile Menüs, Fokuszustände, Escape, Galerien, Lightbox, Bildunterschriften, Links und vorhandene Touch-Funktionen prüfen. Alle Bildvarianten, Sprachen sowie lange und kurze Inhalte berücksichtigen.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1486

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:329` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 13. Template-, Design- und Funktionsprüfung / 13.3 Bedienung und bestehende Tests
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Vorhandene Tests weiterverwenden und bei Bedarf erweitern. Bestehende Prüfungen nicht entfernen, Kriterien nicht lockern und Sicherheitsgrenzen nicht umgehen, damit ein Lauf erfolgreich erscheint.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1487

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:333` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Für jeden abgeschlossenen Änderungslauf einen zusammenhängenden Abnahmebericht in der vorgesehenen geschützten Projektablage erstellen und den tatsächlichen Pfad nennen. Eine lesbare Zusammenfassung und die dazugehörigen konkreten Belege bereitstellen; nicht nur einen Ordner mit unkommentierten Dateien.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1488

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:335` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Der Bericht muss für den Nutzer ohne Rekonstruktion des gesamten Chats beantwortbar machen:

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1489

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:337` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 1. Welche aktuellen Regeln und Skills wurden zugrunde gelegt?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1490

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:338` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 2. Welche Seiten und Bilder wurden tatsächlich geprüft und welche nicht?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1491

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:339` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 3. Welche zentralen Templates und Komponenten verwenden diese Seiten?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1492

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:340` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 4. Sind die verwendeten Originaldateien nachweislich unverändert, und wie war Schreibzugriff technisch begrenzt?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1493

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:341` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 5. Welche Unterschiede zeigen die Vorher-/Nachher-Ansichten?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1494

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:342` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 6. Wurde der Design-Guide geändert, und wo liegt die jeweilige Freigabe?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1495

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:343` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: 7. Was ist lokal vorbereitet, im Repository gesichert, erfolgreich geprüft und tatsächlich live verifiziert?

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1496

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:345` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Zähler mit Nenner angeben, beispielsweise geprüfte Seiten von erfassten Seiten sowie geprüfte Bilddateien von erfassten Bilddateien. Zahlen nur aus tatsächlichen Ergebnissen übernehmen. Nicht geprüfte Originale, Ansichten oder Varianten ausdrücklich nennen.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1497

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:347` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Den exakten, im Projekt funktionierenden Befehl zur erneuten Ausführung der relevanten Prüfungen dokumentieren. Keinen erfundenen Testbefehl angeben. Prüfungen müssen gegen die gesicherten Ausgangsdaten laufen; ein erneuter Test darf Referenzen oder Manifeste nicht automatisch ersetzen.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1498

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:349` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 14. Für den Nutzer unabhängig nachvollziehbare Abnahme
- Anwendung: ST-WEB-03
- Verbindlicher Originalwortlaut: Eine zusätzliche unabhängige Nachprüfung muss ohne Änderung an Website, Bildern, Regeln oder Freigaben möglich sein. Nur neue Prüfprotokolle dürfen dabei geschrieben werden. Eine bloße Textbestätigung des umsetzenden Assistenten ersetzt diese Kontrolle nicht.

- PKG-045 / Planungszuordnung: ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1499

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:353` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: In der bestehenden projektlokalen `AGENTS.md` eine kurze Lesepflicht mit konkreten Pfaden zu Design-Guide, Template-Spezifikation und Bild-Skill sowie den Schutz- und Abnahmepflichten verankern. Lange normative Texte nicht in mehrere unabhängig gepflegte Dateien kopieren.

- PKG-045 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1500

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:355` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture
- Anwendung: ST-PHOTO-01, ST-WEB-03
- Verbindlicher Originalwortlaut: Die Bild-Skill-Pflicht gilt für alle relevanten Bildaufgaben, auch als Teil größerer Änderungen. Verfügbarkeit eines Skills allein nicht mit seiner Anwendung gleichsetzen. Falls der Skill an seinem tatsächlichen lokalen Pfad bleibt, dessen Verfügbarkeit im verwendeten Arbeitsumfeld prüfen; andere Umgebungen nicht als automatisch versorgt darstellen.

- PKG-045 / Planungszuordnung: ST-PHOTO-01, ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1501

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:357` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Keine VanVenture-Regeln in globale Codex-Anweisungen oder andere Projekte übertragen. Andere persönliche Skills und allgemeine Einstellungen unverändert lassen. Eine erforderliche projektbezogene Ablage oder Verknüpfung nachvollziehbar dokumentieren, ohne konkurrierende maßgebliche Versionen anzulegen.

- PKG-045 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1502

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:359` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: In einer neuen VanVenture-Arbeitssitzung prüfen, ob die Projektregeln und referenzierten Dateien tatsächlich zugänglich sind. Die Einhaltung zusätzlich durch die beschriebenen technischen und visuellen Prüfungen absichern, nicht nur durch erneutes Ausgeben der Regeln.

- PKG-045 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1503

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:361` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Bestehende Pläne und Statusdokumente einschließlich `docs/ausbauplan.md` konsistent aktualisieren. Dokumentiert, implementiert, geprüft, freigegeben und live verifiziert getrennt kennzeichnen. Widersprüchliche Einträge bereinigen, ohne historische Nachweise umzudeuten.

- PKG-045 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1504

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:365` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture / 15.1 Anforderungen bei jeder beauftragten Änderung pflegen
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Vor einer Änderung die maßgebliche Quelle des betreffenden Regelbereichs bestimmen. Responsive Templates, Komponenten und deren technische Abnahme stehen in `docs/responsive-templates.md`, freigegebene Gestaltung in `docs/design-guide.md`, übergreifende Prüf-, Schutz- und Freigabepflichten in diesem Gesamtauftrag. `AGENTS.md` enthält nur knappe Lesepflichten und Verweise. Übergabefassungen sind Eingaben, keine konkurrierenden aktiven Spezifikationen; ihre historische Rolle ist sichtbar zu kennzeichnen.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1505

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:373` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture / 15.1 Anforderungen bei jeder beauftragten Änderung pflegen
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Jede Nutzeranweisung gegen die geltende Spezifikation einordnen: bereits erfüllt, Klarstellung, zusätzliche Anforderung, Regeländerung oder Ausnahme. Neue technische Anforderungen mit den bestehenden Kennungen verbinden, soweit passend. Für neue oder geänderte Gestaltungsregeln und Ausnahmen gilt vor Umsetzung der Freigabeprozess in Abschnitt 11. Schweigen ist keine Freigabe; bis zur Entscheidung bleibt die zuletzt freigegebene Regel gültig.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1506

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:380` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture / 15.1 Anforderungen bei jeder beauftragten Änderung pflegen
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Nach Beauftragung beziehungsweise gültiger Freigabe Anforderung, Geltungsbereich, Ausnahmen, Abnahmekriterien, Projektverweise, Ausbauplan und Nachweismatrix im selben Änderungsvorgang abgleichen. Den Design-Guide nur bei tatsächlich freigegebener Gestaltungsänderung normativ ändern; anderenfalls im Nachweis festhalten: „Design-Guide inhaltlich unverändert“. Historische Belege erhalten und überholte widersprüchliche Regeln ausdrücklich als ersetzt kennzeichnen.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1507

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:388` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 15. Dauerhafte Verankerung ausschließlich in VanVenture / 15.1 Anforderungen bei jeder beauftragten Änderung pflegen
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Für jede betroffene Anforderung Entscheidung/Freigabe, dokumentierte Spezifikation, technische Umsetzung, Prüfergebnis und Live-Verifikation getrennt führen. Der Änderungsnachweis nennt die tatsächlichen Dateipfade, Abschnitte, Inhaltsunterschiede und verfügbaren Freigabebelege. Weder Markdown-Änderung noch lokaler Test gelten als Live-Nachweis.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1508

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:396` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 16. Veröffentlichung und Abschlussgrenzen
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Veröffentlichung nur gemäß dem bestehenden Release-Prozess und nach bestandenen erforderlichen Prüfungen. Anschließend betroffene Live-Routen, sichtbare Ergebnisse und bestehende vorgeschriebene Gesundheitsprüfungen kontrollieren. Tatsächlichen Release-Bezug dokumentieren und verwendete Remote-Sitzungen entsprechend den Projektregeln schließen.

- PKG-046 / Planungszuordnung: ST-OPS-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1509

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:398` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 16. Veröffentlichung und Abschlussgrenzen
- Anwendung: ST-OPS-01
- Verbindlicher Originalwortlaut: Fehlgeschlagene Pflichtprüfungen, fehlender Originalschutz, fehlende erforderliche Freigaben oder ungeklärte neue Designregeln blockieren die Freigabe der betroffenen Änderungen. Offene Punkte nicht als bestanden markieren. Unabhängig geprüfte Teilstände klar als solche ausweisen; den Gesamtauftrag nicht vorzeitig als abgeschlossen melden.

- PKG-046 / Planungszuordnung: ST-OPS-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1510

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:400` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 16. Veröffentlichung und Abschlussgrenzen
- Anwendung: ST-OPS-01, ST-WEB-03
- Verbindlicher Originalwortlaut: Zum Abschluss die tatsächlichen geänderten Dateipfade, migrierten Seiten, Bildprüfungen, Originalschutz-Nachweise, Guide-Änderungen samt Freigaben, Testergebnisse und den überprüften Live-Stand nennen. Konkrete verbleibende Arbeiten und Grenzen offenlegen.

- PKG-046 / Planungszuordnung: ST-OPS-01, ST-WEB-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1511

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:402` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / 16. Veröffentlichung und Abschlussgrenzen
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: **„Vollständig umgesetzt“ ist nur zulässig, wenn der gesamte vereinbarte Umfang umgesetzt und mit den erforderlichen Nachweisen geprüft ist. Eine perfekte interne Regelbefolgung nicht allein aus einer Dateiliste oder Selbstauskunft ableiten. Entscheidend sind gesicherte Grundlagen, technische Grenzen, reproduzierbare Ergebnisse und überprüfbare Freigaben.**

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1512

- Quelle: `docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md:408` · vanventure.at – Verbindlicher Gesamtauftrag für Templates, Bilder, Design und überprüfbare Freigaben / Übergabetext für den VanVenture-Arbeitschat
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Bitte übernimm diese Datei als konsolidierten Gesamtauftrag für VanVenture. Ergänze und konsolidiere die bereits vorhandenen Projektspezifikationen, statt widersprüchliche Parallelregeln anzulegen. Setze den Gesamtauftrag nach dem bestehenden Projektablauf um. Vor jeder betroffenen Änderung müssen die gültigen Design-, Template-, Bild- und Originalschutzregeln verfügbar und angewandt sein. Neue oder geänderte Gestaltungsregeln benötigen meine ausdrückliche Freigabe; bereits genehmigte Regeln sollen ohne unnötige erneute Rückfrage umgesetzt werden. Die Startseite behält ihr eigenes Layout, ist aber nicht von Bildregeln, Originalschutz und Prüfung ausgenommen. Gib zu Beginn die tatsächlich verwendeten Grundlagen und am Ende den überprüfbaren Abnahmebericht mit Belegen aus. Behaupte keine Übernahme, Umsetzung, Prüfung oder Veröffentlichung, die nicht stattgefunden hat.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1513

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:3` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Stand: 22. September 2026 Status: integrierte Planungsgrundlage – keine Implementierung

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1514

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:6` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Der [verbindliche Gesamtplan](ausbauplan.md) führt alle offenen, priorisierten Umsetzungsaufgaben. Dieses Dokument ist die detaillierte Architektur- und Phasenreferenz für das Familien-Scrum-Board.

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1515

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:12` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Das private VanVenture Cockpit wird um ein familienfreundliches Scrum Board erweitert. Es ist keine öffentliche Funktion von vanventure.at und kein Ersatz für das bestehende YouTube-/Content-Cockpit. Beide Bereiche leben in derselben geschützten Anwendung, teilen Anmeldung, Datenbank, Audit-Protokoll und Betrieb, bleiben aber fachlich getrennt.

- PKG-046 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1516

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:17` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-BRD-04
- Verbindlicher Originalwortlaut: Das Board ist die gemeinsame, permanent sichtbare Aufgabenfläche auf einem Tablet in der Küche. Es verwaltet private To-dos, Aufgaben, Stories, Epics und Ideen. VanVenture meldet technische Warnungen über einen definierten Kommunikationskanal an das Board. Marvin kann auf ausdrücklichen Auftrag Backlog-Elemente anlegen und später Aufgaben verschieben.

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1517

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:22` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Die verbindliche Board-Struktur ist:

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1518

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:24` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: | Zeile | Offen | Bereit | In Arbeit | Review | Done |

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1519

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:26` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: | **Fast Track** | dringende, neu eingegangene Karten | dringende, vorbereitete Karten | dringende, übernommene Karten | dringende Karten zur Prüfung | dringende, abgeschlossene Karten |

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1520

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:27` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: | **Scrum Board** | reguläre, eingeplante Karten | für die nächste Umsetzung vorbereitete Karten | regulär übernommene Karten | reguläre Karten zur Prüfung | regulär abgeschlossene Karten |

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1521

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:29` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 1. Entscheidung und Zielbild
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: Das **Backlog** ist eine eigene Ansicht vor dem Board. Es enthält noch nicht eingeplante Ideen, Epics, Stories und To-dos. Erst eine bewusste Planung bringt ein Item aus dem Backlog in `Scrum Board → Offen`; hoch- oder kritisch priorisierte Items dürfen nach `Fast Track → Offen` gelangen.

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Offene Zielentscheidung: SRC-1521.d. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1522

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:36` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: projektweit / Quellen- und Prozessregel
- Verbindlicher Originalwortlaut: Die bestehenden Leitentscheidungen des Cockpit-Plans bleiben bestehen:

- PKG-046 / Planungszuordnung: projektweite Quellen-/Prozessregel. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1523

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:38` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Die öffentliche, statische Website bleibt unverändert und enthält keine privaten Board-, Cockpit- oder Warnungsdaten.

- PKG-046 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1524

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:40` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Das private Node.js-ESM-Backend, der Vanilla-JS-Client, PostgreSQL, Docker Compose, Caddy/HTTPS sowie die bestehende Anmeldung werden weiterverwendet.

- PKG-046 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1525

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:42` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Es wird kein zusätzlicher Frontend-, Backend-, Queue- oder Authentifizierungsdienst für die erste Ausbaustufe eingeführt.

- PKG-046 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1526

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:44` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: - Alle Board-Funktionen sind API-first unter `/api/cockpit`; das Tablet ist nur ein Client dieser API.

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1527

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:46` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: - Das Cockpit besitzt die Aufgaben- und Warnungskopien. VanVenture bleibt die fachliche Quelle für Fahrzeugzustand und die Ursache einer Fahrzeugwarnung.

- PKG-046 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1528

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:49` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-BRD-04
- Verbindlicher Originalwortlaut: ```text VanVenture Cockpit / Fahrzeuglogik │  signiertes Warnungsereignis ▼ Private Cockpit-API ──► Warnungs-Inbox ──► Scrum-Karte / Fast Track ▲                                      │ │                                      ▼ Marvin ────────────── Backlog / Board / Audit-Log │ ▼ Küchen-Tablet ```

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1529

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:62` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 2. Architektur und Abgrenzung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: Der Kommunikationskanal ist Teil der bisherigen Cockpit-Phase 4. Er muss vor automatischem Erstellen von Fast-Track-Karten bereitstehen. Dadurch bleibt die VanVenture-Fahrzeuglogik unabhängig von der Tablet-Oberfläche; bei einem Ausfall des Boards werden Warnungsereignisse nachgeliefert, statt verloren zu gehen.

- PKG-047 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1530

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:71` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Eine Karte hat genau einen Typ:

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1532

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:75` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `epic` | größeres privates Projekt oder Vorhaben | nein, dient als Klammer |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1533

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:76` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `story` | abgrenzbarer, abnehmbarer Teil eines Epics | Planungsebene, keine Board-Task |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1534

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:77` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `task` | konkrete Arbeit innerhalb einer Story | ja |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1535

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:78` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `todo` | kleine, eigenständige Familienaufgabe oder Arbeit innerhalb einer Story | ja |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1536

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:79` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `alert_task` | aus einer VanVenture-Warnung entstandene operative Aufgabe | ja, zunächst Fast Track |

- PKG-047 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1537

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:81` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.1 Karten und Hierarchie
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: Für geplante Projektarbeit gilt verbindlich **Goal / Initiative → Epic → User Story → Task / Subtask** gemäß der [Scrum-Planungsregel](project-rules/scrum-planning.md). Ein Epic enthält Stories; ein `task` gehört immer zu einer Story. Tasks und Subtasks dürfen nie direkt einem Epic zugeordnet werden. Ein projektbezogenes `todo` gehört ebenfalls zu einer Story. Eigenständige private Familien-To-dos und operative `alert_task`-Karten können ohne Projekt-Hierarchie im Backlog beziehungsweise Fast Track stehen; sie dürfen keinem Epic direkt untergeordnet werden. Gelöschte Eltern löschen nie automatisch ihre Kinder; sie können nur archiviert werden und benötigen vorher eine klare Zuordnungsentscheidung.

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Offene Zielentscheidung: SRC-1537.i. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.
- COVERAGE-R1-051 / SRC-1537.i: Die Frage nach Bezug von „sie“ und vorangehender Zuordnung bleibt in ST-BRD-01 offen. Keine Archiv-Lesart als entschieden oder implementiert ausgeben.

## src-1538

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:94` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Jede Karte enthält:

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1540

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:98` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Titel | Pflicht, kurz und handlungsorientiert |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1542

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:100` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Priorität | Pflicht: `niedrig`, `normal`, `hoch`, `kritisch` |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1543

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:101` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Erstelldatum | automatisch, unveränderbar |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1544

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:102` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: | Fälligkeitsdatum | optional; bei Systemwarnungen aus der Warnung übernehmbar |

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1545

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:103` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: | Board-Zeile und Spalte | nur bei eingeplanten Task-/To-do-Karten |

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Offene Zielentscheidung: SRC-1545.a. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.
- COVERAGE-R1-051 / SRC-1545.a: `AC-COVR1-051-02` löst die Feldzuordnung anhand der boardfähigen operativen `alert_task` aus SRC-1536: Zeile/Spalte nur nach Einplanung, auch für Warnungs-Tasks im Fast Track. ST-BRD-01 prüft Datenregel, ST-BRD-03 Warnungsfall. Planungsdeckung Covered; Phase 0 und Implementierung offen.

## src-1546

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:104` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | „In Arbeit von“ | leer bis zur Übernahme; beim Eintritt in `In Arbeit` gesetzt |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1547

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:105` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Elternbezug | Story → Epic; Projekt-Task/-To-do → Story zwingend. Eigenständige Familien-To-dos und Warnungs-Tasks ohne Epic-Elternkarte. |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1548

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:106` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: | Beschreibung | optional; bei Warnungen inklusive verständlicher Handlungsempfehlung |

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1549

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:107` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Aktivitätsverlauf | automatisch: Erstellung, Änderungen, Verschiebungen, Übernahme, Abschluss |

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1550

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:109` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.2 Pflicht- und Zusatzdaten einer Karte
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: Der angezeigte Name bei „In Arbeit von“ ist keine Leistungsanzeige. Es gibt keine Startseite „Wer macht was?“. Der Name erscheint ausschließlich auf der Karte und im Verlauf, damit klar ist, wer eine Aufgabe gerade übernommen hat.

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1551

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:115` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Zulässige Bewegungen sind horizontal innerhalb der aktuellen Zeile:

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1552

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:117` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: `Offen → Bereit → In Arbeit → Review → Done`

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1553

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:119` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Rückbewegungen sind erlaubt, etwa `Review → In Arbeit` bei einer nötigen Korrektur. Eine Karte kann zwischen Scrum Board und Fast Track verschoben werden, wenn sich ihre Priorität verändert. Das wird stets im Verlauf festgehalten.

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1554

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:123` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Beim Verschieben nach **In Arbeit** muss eine Person die Karte übernehmen. Der Name wird in `in_progress_by` gespeichert.

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1555

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:125` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Beim Verschieben aus **In Arbeit** bleibt die letzte übernehmende Person im Verlauf; das Feld „In Arbeit von“ wird bei Review und Done sichtbar als letzte Übernahme, aber nicht als aktuelle Zuweisung interpretiert.

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1556

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:128` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Eine Karte darf ohne Übernahme nicht in **In Arbeit** wechseln.

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1557

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:129` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - **Review** bedeutet: die Arbeit ist fertig, aber eine Rückmeldung, Sichtprüfung oder Systemprüfung steht noch aus.

- PKG-047 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1558

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:131` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: - **Done** verlangt eine bewusste Bestätigung. Bei Fahrzeugwarnungen kann die Systemauflösung als Hinweis erscheinen, ersetzt aber die Bestätigung nicht.

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1559

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:133` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 3. Fachliches Modell / 3.3 Statusfluss und Regeln
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Karten werden nicht sofort gelöscht. Sie werden nach einer noch festzulegenden Aufbewahrungsfrist archiviert; der Verlauf bleibt nachvollziehbar.

- PKG-047 / Planungszuordnung: ST-BRD-01. Offene Zielentscheidung: SRC-1559.b. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1560

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:138` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess
- Anwendung: ST-BRD-01, ST-BRD-04
- Verbindlicher Originalwortlaut: Das Backlog ist die einzige Auffangstelle für ungeplante Ideen. Marvin legt dort standardmäßig an; auch manuelle Eingaben landen dort, wenn keine explizite Einplanung gewünscht ist.

- PKG-047 / Planungszuordnung: ST-BRD-01, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1561

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:144` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: 1. Eine Person wählt im Backlog ein Task- oder To-do-Item aus.

- PKG-048 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1562

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:145` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: 2. Über „Auf Board ziehen“ oder Drag-and-drop wird die Zielzelle ausgewählt.

- PKG-048 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1563

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:146` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 3. Standardziel ist `Scrum Board → Offen`. Für `hoch` oder `kritisch` kann bewusst `Fast Track → Offen` gewählt werden.

- PKG-048 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1564

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:148` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: 4. Vor dem Bestätigen zeigt das Tablet Priorität und Fälligkeit; fehlende Angaben dürfen ergänzt werden, bleiben aber außer Priorität optional.

- PKG-048 / Planungszuordnung: ST-BRD-01, ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1565

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:150` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 5. Das Item erhält seine Board-Position. Projekt-Tasks und projektbezogene To-dos behalten ihren Story-Bezug; eigenständige Familien-To-dos bleiben ohne Projekt-Elternkarte. Das Item wird aus der Standard-Backlog-Liste ausgeblendet.

- PKG-048 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1566

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:154` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Aus dem Backlog ins Board
- Anwendung: ST-BRD-01, ST-BRD-04
- Verbindlicher Originalwortlaut: Das System verschiebt normale Backlog-Items niemals selbstständig aufs Board. Marvin darf dies nur mit ausdrücklichem Auftrag tun, zum Beispiel: „Marvin, nimm Gasflasche prüfen aus dem Backlog nach Fast Track, Offen.“

- PKG-048 / Planungszuordnung: ST-BRD-01, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1567

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:160` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 4. Backlog- und Planungsprozess / Fast-Track-Regel
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: Fast Track ist für zeitkritische oder risikoreiche Aufgaben bestimmt, nicht für allgemein wichtige Wünsche. Die automatische Zuweisung erfolgt nur bei einer VanVenture-Warnung mit Schweregrad `hoch` oder `kritisch`. Manuelle Fast-Track-Karten erfordern eine bewusste Prioritätswahl. Normal priorisierte Karten bleiben im Scrum Board, auch wenn ein Fälligkeitsdatum nahe ist; die Oberfläche darf sie sichtbar markieren, ohne den Fast Track zu entwerten.

- PKG-048 / Planungszuordnung: ST-BRD-01, ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1568

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:171` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.1 Vertrag zwischen VanVenture und dem Board
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: VanVenture sendet ein versioniertes, zustellbares Ereignis an eine private, authentifizierte API. Das Board bestätigt den Empfang erst, nachdem das Ereignis persistent gespeichert wurde. Bei einem Netzfehler versucht VanVenture die Zustellung erneut; Wiederholungen erzeugen keine Duplikate.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1569

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:176` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.1 Vertrag zwischen VanVenture und dem Board
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: Pflichtfelder des Ereignisses:

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1570

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:178` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.1 Vertrag zwischen VanVenture und dem Board
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: ```json { "schema_version": 1, "event_id": "uuid", "occurred_at": "2026-09-22T10:30:00Z", "source": "vanventure-cockpit", "vehicle_id": "internal-id", "alert_key": "fresh-water-low", "severity": "info|normal|high|critical", "title": "Frischwassertank fast leer", "message": "Bitte vor der nächsten Abfahrt auffüllen.", "suggested_action": "Frischwasser auffüllen", "source_reference": "/cockpit/vehicle/alerts/…" } ```

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1571

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:194` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.1 Vertrag zwischen VanVenture und dem Board
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: `event_id` ist einmalig. Die Kombination aus `source`, `vehicle_id` und `alert_key` erlaubt zusätzlich, wiederkehrende Meldungen fachlich zusammenzuführen. Kein Ereignis enthält Geheimnisse, Standortdaten oder mehr Fahrzeugdaten als für die Karte nötig.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1572

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:200` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | Schweregrad | Wirkung im Board |

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1573

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:202` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `info` | in der Warnungs-Inbox protokollieren; keine Karte |

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1574

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:203` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `normal` | Inbox-Eintrag; manuell als Karte übernehmbar |

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1575

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:204` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `high` | Fast Track → Offen, Priorität hoch |

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1576

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:205` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `critical` | Fast Track → Offen, Priorität kritisch und deutlich markiert |

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1577

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:207` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.2 Verarbeitung einer Warnung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: Für eine noch offene Ursache aktualisiert ein weiteres Ereignis die vorhandene Warnungs-Karte statt eine neue zu erzeugen. Eine VanVenture-Auflösung aktualisiert die Warnung und vermerkt sie auf der Karte. Die Karte bleibt bis zur menschlichen Bestätigung in Review oder Done. So verschwindet eine wichtige Aufgabe nicht, nur weil ein Sensor kurzzeitig wieder normale Werte meldet.

- PKG-048 / Planungszuordnung: ST-BRD-03. Offene Zielentscheidung: SRC-1577.c. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1578

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:215` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Service-zu-Service-Authentifizierung über einen separaten, rotierbaren Schlüssel oder Signaturverfahren; niemals über Browser-Sitzungen.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1579

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:217` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - HTTPS, strenge Payload-Validierung, Größenlimits und Rate Limits.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1580

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:218` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Persistente Inbox mit Idempotenzschlüssel vor jeder Kartenmutation.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1581

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:219` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Sichere Fehlermeldungen ohne Fahrzeug- oder Geheimnisdetails.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1582

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:220` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Audit-Eintrag für Empfang, Duplikat, Kartenanlage, Aktualisierung und Auflösung.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1583

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:221` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 5. VanVenture-Warnungskanal / 5.3 Kanalabsicherung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Monitoring alarmiert bei wiederholten Zustellfehlern oder einer wachsenden Inbox; der endgültige Benachrichtigungskanal wird vor Go-live festgelegt.

- PKG-048 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1584

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:226` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: Marvin ist ein berechtigter, nachvollziehbarer Akteur, aber kein autonomer Projektleiter. Jede über Marvin ausgeführte Änderung erhält im Audit-Log und im Kartenverlauf den Auslöser `marvin` und – soweit vorhanden – die Person, in deren Auftrag gehandelt wurde.

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1585

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:232` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: Marvin darf:

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1586

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:234` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Epics, Stories, Tasks und To-dos im Backlog anlegen; Projekt-Tasks und projektbezogene To-dos nur mit bestehender oder zugleich angelegter Story;

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1587

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:236` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Titel, Beschreibung, Priorität, Fälligkeit und den nach Kartentyp erforderlichen Elternbezug aus einer klaren Anweisung übernehmen;

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1588

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:238` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - nach einem expliziten Befehl ein Backlog-Item nach `Offen` verschieben;

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1589

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:239` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - auf Nachfrage offene, überfällige und Fast-Track-Karten zusammenfassen.

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1590

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:241` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: Marvin darf zunächst nicht:

- PKG-048 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1591

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:243` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - ohne Auftrag Aufgaben aufs Board oder in den Fast Track verschieben;

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1592

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:244` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Personen automatisch als „In Arbeit von“ eintragen;

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1593

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:245` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Karten als Done markieren;

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1594

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:246` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Warnungen unterdrücken, löschen oder auflösen;

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1595

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:247` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Anfangsfreigabe (MVP)
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Zugangsdaten, Tokens oder Rohdaten aus dem Cockpit sehen.

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1596

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:251` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 6. Marvin-Integration / Spätere Erweiterung nach Abnahme
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: Nach realer Nutzung kann Marvin zusätzliche, explizit bestätigte Aktionen erhalten: eine Karte übernehmen, einen Review-Schritt vorschlagen oder einen täglichen Überblick formulieren. Jede schreibende Marvin-Aktion braucht dabei eine eng begrenzte API- Berechtigung und dieselbe Servervalidierung wie die Tablet-Oberfläche.

- PKG-049 / Planungszuordnung: ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1597

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:258` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Die bestehenden `yt_*`, Planner-, Context- und Audit-Tabellen bleiben erhalten. Für das Board kommen Tabellen mit Präfix `scrum_` hinzu:

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1598

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:261` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Tabelle | Kernfelder | Zweck |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1599

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:263` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `scrum_items` | `id`, `type`, `title`, `description`, `priority`, `parent_id`, `created_at`, `due_date`, `archived_at` | Epics, Stories, Tasks und To-dos; bei Projekt-Tasks und projektbezogenen To-dos auf Story-Elternkarte prüfen, direkte Epic-Elternschaft ablehnen |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1600

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:264` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `scrum_board_positions` | `item_id`, `lane`, `column`, `sort_order`, `moved_at`, `moved_by` | aktuelle Board-Position; `lane=fast_track|scrum` |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1601

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:265` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `scrum_work_assignments` | `item_id`, `assignee_user_id`, `claimed_at`, `released_at`, `claimed_by` | aktuelle und historische Übernahmen |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1602

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:266` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | `scrum_item_events` | `id`, `item_id`, `actor_type`, `actor_id`, `action`, `before_safe`, `after_safe`, `created_at` | fachlicher, für Nutzer sichtbarer Verlauf |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1603

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:267` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `scrum_alert_inbox` | `event_id`, `source`, `alert_key`, `vehicle_id`, `severity`, `payload_safe`, `received_at`, `status` | idempotente Warnungseingänge |

- PKG-049 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1604

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:268` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | `scrum_alert_links` | `inbox_event_id`, `item_id`, `resolution_state`, `last_source_update_at` | Zuordnung Warnung zu Karte |

- PKG-049 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1605

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:270` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Zentrale Board-Endpunkte:

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1607

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:274` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Backlog und Board lesen | `GET /api/cockpit/scrum/backlog`, `GET /api/cockpit/scrum/board` | angemeldet |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1608

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:275` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01, ST-BRD-04
- Verbindlicher Originalwortlaut: | Item anlegen/ändern | `POST /api/cockpit/scrum/items`, `PUT /api/cockpit/scrum/items/:id` | editor/admin; Marvin mit eingeschränktem Dienstrecht |

- PKG-049 / Planungszuordnung: ST-BRD-01, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1609

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:276` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01, ST-BRD-04
- Verbindlicher Originalwortlaut: | Einplanen/verschieben | `POST /api/cockpit/scrum/items/:id/move` | editor/admin; Marvin nur mit erlaubtem Befehl |

- PKG-049 / Planungszuordnung: ST-BRD-01, ST-BRD-04. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1610

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:277` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Übernehmen/freigeben | `POST /api/cockpit/scrum/items/:id/claim`, `…/release` | angemeldete, berechtigte Person |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1611

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:278` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: | Verlauf lesen | `GET /api/cockpit/scrum/items/:id/events` | angemeldet |

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1612

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:279` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: | Warnung zustellen | `POST /api/cockpit/integrations/vanventure/alerts` | ausschließlich VanVenture-Dienstidentität |

- PKG-049 / Planungszuordnung: ST-BRD-03. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1613

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:281` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 7. Datenmodell und APIs
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: Alle schreibenden Browser-Endpunkte verwenden Sitzung, CSRF-Schutz und serverseitige Rollenprüfung. Endpunkte validieren zulässige Statuswechsel atomar. Ein Wechsel nach `In Arbeit` legt Position und Übernahme in derselben Datenbanktransaktion an.

- PKG-049 / Planungszuordnung: ST-BRD-01. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1614

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:287` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: Das Küchen-Tablet zeigt direkt das Board, nicht Analytics und keine Personenstatistik. Die Oberfläche ist im Querformat optimiert und aktualisiert sich automatisch über kurzes Polling mit ETag/Versionierung; Echtzeit-Sockets sind keine MVP-Voraussetzung.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1615

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:291` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Die Fast-Track-Zeile steht immer oben und bleibt optisch klar von der Scrum-Zeile getrennt.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1616

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:293` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Beide Zeilen haben exakt die Spalten Offen, Bereit, In Arbeit, Review und Done.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1617

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:294` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Jede Karte zeigt mindestens Titel, Priorität, Erstell- und ggf. Fälligkeitsdatum; bei übernommenen Karten zusätzlich dezent den Namen „In Arbeit von“.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1618

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:296` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Große Karten, gut lesbare Schrift und Berührungsziele von mindestens 44 px.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1619

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:297` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Verschieben per Drag-and-drop und als zugängliche Alternative über „Verschieben nach“.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1620

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:298` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Fast-Track-Karten sind nur über Farbe plus Text/Icons unterscheidbar; Farbe allein ist nie die einzige Bedeutung.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1621

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:300` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Detailansicht enthält Beschreibung, Epic/Story, Verlauf, Warnungsreferenz und Übernehmen-/Freigeben-Aktion.

- PKG-049 / Planungszuordnung: ST-BRD-02. Nur Planungsbefund; Umsetzung und Live-Verifikation ungeprüft.

## src-1622

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:302` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 8. Tablet-Erlebnis
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Ein schlichter Bildschirmschoner-/Kiosk-Modus darf das Board anzeigen; Schreibzugriff erfordert weiterhin eine bestehende Sitzung oder eine noch festzulegende lokale PIN.
- **BATCH-005 / Planning Coverage:** SRC-1622.a: Covered; SRC-1622.b: Unresolved. Implementation Verification: nicht erneut geprüft.
  - `SRC-1622.a` → ST-BRD-02: Kiosk-Anzeige ist eine Erlaubnis, keine Pflicht zur Einführung; bei Umsetzung zu ST-BRD-02 (Tablet, Plan Z. 602–609), nicht Marvin.
  - `SRC-1622.b` → ST-BRD-02: Schreiben verlangt Sitzung oder eine erst festzulegende lokale PIN. Das ist eine Sicherheitsbedingung, keine bereits beschlossene PIN-Lösung. Getrenntes Zugriffs-AC bei ST-BRD-02/ST-BRD-01 und Entscheidung zur PIN; Register-Anwendung ST-BRD-04 korrigieren. **Offene Frage:** Soll der Küchen-Tablet-Kiosk nur lesend mit bestehender Sitzung betrieben werden oder ist eine lokale PIN als alternative Schreibberechtigung vorgesehen? Falls PIN: Wer verwaltet sie und welche Aktionen erlaubt sie?

## src-1623

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:309` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: Ergänzung zur vorhandenen Google-/Cockpit-Vorbereitung:
- **BATCH-005 / Planning Coverage:** SRC-1623.a: Not Applicable. Implementation Verification: nicht erneut geprüft.
  - `SRC-1623.a` → Quellenregel/Beleg: „Ergänzung …“ ist Phasenkontext ohne eigenes Ergebnis. Als Kontext für Phase 0 erhalten, nicht als Constraint oder Coverage für ST-BRD-04 zählen.

## src-1624

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:311` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 1. Familienmitglieder, Anzeige-Namen und Zugriffsrechte festlegen.
- **BATCH-005 / Planning Coverage:** SRC-1624.a: Not Applicable; SRC-1624.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1624.a` → Quellenregel/Beleg: 1. ist nur Listenmarker; mit b verbinden.
  - `SRC-1624.b` → ST-BRD-01: Familienmitglieder, Anzeigenamen und Zugriffsrechte sind drei festzulegende Angaben, nicht Marvin-Rechte. ST-BRD-01, Plan Z. 598–599 und TASK-0093, decken den Gegenstand teilweise; Entscheidung/Nachweis je Angabe ergänzen.

## src-1625

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:312` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 2. Prioritätsdefinition, Fast-Track-Kriterien, Archivfrist und Review-Regeln bestätigen.
- **BATCH-005 / Planning Coverage:** SRC-1625.a: Not Applicable; SRC-1625.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1625.a` → Quellenregel/Beleg: 2. ist Listenmarker.
  - `SRC-1625.b` → ST-BRD-01: Vier gesondert bestätigungspflichtige Regeln: Priorität, Fast Track, Archivfrist, Review. ST-BRD-01, Plan Z. 598–599/TASK-0094; einzelne Beschlüsse und Abnahme nachweisen. Die derzeitige ST-BRD-04-Zuordnung ist falsch.

## src-1626

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:313` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 3. Kartenhierarchie und erste Beispiel-Epics/Stories fachlich prüfen; keine Datenanlage.
- **BATCH-005 / Planning Coverage:** SRC-1626.a: Not Applicable; SRC-1626.b: Covered; SRC-1626.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1626.a` → Quellenregel/Beleg: 3. ist Listenmarker.
  - `SRC-1626.b` → ST-BRD-01: Kartenhierarchie und erste Beispiel-Epics/Stories fachlich prüfen; ST-BRD-01/TASK-0094 enthält Beispielprüfung, Hierarchie ausdrücklich prüfen.
  - `SRC-1626.c` → ST-BRD-01: „keine Datenanlage“ ist ein Verbot für Phase 0, kein allgemeines Datenanlageverbot. Als zeitgebundenes Gate bei ST-BRD-01/TASK-0096 festhalten.

## src-1627

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:314` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 4. VanVenture-Warnungskatalog erstellen: Schlüssel, Schweregrad, Text und empfohlene Handlung pro Fahrzeugwarnung.
- **BATCH-005 / Planning Coverage:** SRC-1627.a: Not Applicable; SRC-1627.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1627.a` → Quellenregel/Beleg: 4. ist Listenmarker.
  - `SRC-1627.b` → ST-BRD-03: Katalog je Fahrzeugwarnung mit Schlüssel, Schweregrad, Text und Handlung. ST-BRD-03, Plan Z. 616–617/TASK-0095, ist fachlich richtig; jedes Pflichtfeld je Warnung einzeln abnehmen. Der unveränderte Registerwortlaut allein ist kein Erstellungsnachweis.

## src-1628

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:316` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 5. Kommunikationskanal, Dienstidentität, Schlüsselrotation, Zustellwiederholung und Betriebsverantwortung verbindlich festlegen.
- **BATCH-005 / Planning Coverage:** SRC-1628.a: Not Applicable; SRC-1628.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1628.a` → Quellenregel/Beleg: 5. ist Listenmarker.
  - `SRC-1628.b` → ST-BRD-03: Fünf verbindliche Entscheidungen zum VanVenture-Warnungskanal, einschließlich Betriebsverantwortung. Nach ST-BRD-03, Plan Z. 616–617/TASK-0095, umhängen; die derzeitige ST-BRD-04-Anwendung weist auf Marvins Dienstrechte und ist sachlich falsch. Entscheidungen einzeln dokumentieren.

## src-1629

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:319` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 0 – Gemeinsame Festlegung
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: **Abnahme:** Ein schriftlicher Ereignisvertrag und die Board-Regeln sind bestätigt.
- **BATCH-005 / Planning Coverage:** SRC-1629.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1629.a` → ST-BRD-01, ST-BRD-03: Zwei Abnahmeobjekte: schriftlicher Ereignisvertrag und bestätigte Board-Regeln. In ST-BRD-03 beziehungsweise ST-BRD-01 mit gemeinsamer Phase-0-Abnahme aufteilen; „bestätigt“ nur mit Beleg, zuständiger Entscheidung und Datum. ST-BRD-04 allein deckt beides nicht.

## src-1630

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:323` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 1 – Sichere Cockpit-Grundlage
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: Die bestehende Cockpit-Phase 1 wird unverändert umgesetzt: Authentifizierung, Rollenmodell, Datenbankmigrationen, Audit-Log, Geheimnisablage und Testgrundlage. Gleichzeitig werden die `scrum_*`-Migrationen vorbereitet, aber keine Marvin- oder VanVenture-Schreibverbindung aktiviert.
- **BATCH-005 / Planning Coverage:** SRC-1630.a: Covered; SRC-1630.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1630.a` → ST-BRD-01, ST-BRD-03: Bestehende Cockpit-Phase mit sechs Grundbausteinen und dem wichtigen „unverändert“; historische/aktuelle Zustände gesondert prüfen, nicht der Marvin-Story als neue Arbeit zurechnen.
  - `SRC-1630.b` → ST-BRD-01, ST-BRD-03: scrum_*-Migrationen vorbereiten, während Marvin- und VanVenture-Schreibverbindungen aus bleiben: getrennte positive Arbeit und zwei Aktivierungsverbote. Zu ST-BRD-01 (Datenmodell, Plan Z. 599) und ST-BRD-03 (Warnungsgate) zuordnen; ST-BRD-04 höchstens als abhängige Marvin-Grenze.

## src-1631

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:328` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 1 – Sichere Cockpit-Grundlage
- Anwendung: ST-AUTH-01, ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: **Abnahme:** Private Routen sind geschützt; die Datenbank kann Board-Daten und Warnungs-Inbox atomar speichern; keine Geheimnisse erscheinen in Logs oder Clients.
- **BATCH-005 / Planning Coverage:** SRC-1631.a: Covered; SRC-1631.b: Covered; SRC-1631.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1631.a` → ST-AUTH-01, ST-BRD-01: Schutz privater Routen ist ein prüfbares Sicherheits-AC der Cockpit-/Board-Grundlage, nicht allein Warnungs-AC; ST-AUTH-01/ST-BRD-01.
  - `SRC-1631.b` → ST-BRD-01, ST-BRD-03: atomare Speicherung von Board-Daten und Warnungs-Inbox braucht Transaktionsprüfung bei ST-BRD-01/ST-BRD-03.
  - `SRC-1631.c` → ST-AUTH-01, ST-BRD-01: keine Secrets in Logs oder Clients; beide Ausgabekanäle separat negativ prüfen. Register-Anwendung nur ST-BRD-03 ist zu eng.

## src-1632

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:333` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-INS-01, ST-BRD-03
- Verbindlicher Originalwortlaut: Die vorhandene YouTube-Datenerfassung wird umgesetzt. Parallel, aber fachlich getrennt:
- **BATCH-005 / Planning Coverage:** SRC-1632.a: Covered; SRC-1632.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1632.a` → ST-INS-01: vorhandene YouTube-Datenerfassung gehört zum Cockpit-/Insights-Strang, ST-INS-01 (Plan Z. 420–427), mit historisch-vs-neu-Statusprüfung; ST-BRD-04 ist falsch.
  - `SRC-1632.b` → ST-BRD-03: „parallel, aber fachlich getrennt“ ist eine Trennbedingung für die folgenden Warnungsschritte, kein eigenständiges Feature. Als Abhängigkeit/Scope an ST-BRD-03 festhalten.

## src-1633

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:335` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 1. privaten Warnungsendpunkt, Authentifizierung, Inbox, Idempotenz und Auditierung bauen;
- **BATCH-005 / Planning Coverage:** SRC-1633.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1633.a` → ST-BRD-03: Endpunkt, Authentifizierung, Inbox, Idempotenz und Auditierung sind getrennte Arbeiten und Prüfungen. ST-BRD-03 ist fachlich richtig, dessen Plan-AC Z. 617 nennt aber Audit nicht ausdrücklich; einzelne Tasks/AC und Negativfälle ergänzen.

## src-1634

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:336` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 2. VanVenture-Sender mit Retry-Strategie und sicherer Empfangsbestätigung implementieren;
- **BATCH-005 / Planning Coverage:** SRC-1634.a: Not Applicable; SRC-1634.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1634.a` → Quellenregel/Beleg: 2. ist Listenmarker.
  - `SRC-1634.b` → ST-BRD-03: VanVenture-Sender, Retry und sichere Empfangsbestätigung sind Sender- und Empfängerverhalten. Zu ST-BRD-03 und gegebenenfalls einem dort abhängigen Sender-Task; ST-BRD-04 ist falsch. „Sicher“ durch prüfbare Bestätigungs- und Wiederholungsfälle konkretisieren.

## src-1635

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:337` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 3. Testereignisse für Info, Normal, Hoch, Kritisch, Duplikat und Auflösung definieren;
- **BATCH-005 / Planning Coverage:** SRC-1635.a: Not Applicable; SRC-1635.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1635.a` → Quellenregel/Beleg: 3. ist Listenmarker.
  - `SRC-1635.b` → ST-BRD-03: sechs Testereignisarten, einschließlich Duplikat und Auflösung. Als Testdaten/AC bei ST-BRD-03 erfassen; Plan Z. 617 deckt Schweregrade nur teilweise und nennt keinen vollständigen Testereignissatz. ST-BRD-04 ist falsch.

## src-1636

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:338` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 4. Zustellfehler und lange nicht verarbeitete Warnungen in das Betriebsmonitoring aufnehmen.
- **BATCH-005 / Planning Coverage:** SRC-1636.a: Not Applicable; SRC-1636.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1636.a` → Quellenregel/Beleg: 4. ist Listenmarker.
  - `SRC-1636.b` → ST-BRD-03: Zustellfehler und lange unverarbeitete Warnungen brauchen separate Monitoring-Signale/Schwellen und Prüfnachweise. ST-BRD-03 ist richtig, Plan Z. 617 enthält die konkrete Betriebsmonitoring-Aufgabe noch nicht.

## src-1637

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:340` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 2 – Cockpit-Daten und Kommunikationskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: **Abnahme:** Ein kritisches Testereignis wird nach einer Wiederholung genau einmal persistent verarbeitet; ohne gültige Dienstidentität wird es abgewiesen.
- **BATCH-005 / Planning Coverage:** SRC-1637.a: Covered; SRC-1637.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1637.a` → ST-BRD-03: Wiederholung eines kritischen Ereignisses führt zu genau einer persistenten Verarbeitung; Plan Z. 617 spricht von einer Karte, was die Persistenz des Ereignisses nicht vollständig abdeckt.
  - `SRC-1637.b` → ST-BRD-03: ohne gültige Dienstidentität abweisen; eigenständiger negativer Auth-Test. Beides nach ST-BRD-03 statt ST-BRD-04; die Kandidatentrennung a/b ist sinnvoll.

## src-1638

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:345` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: Ergänzung zur bestehenden Cockpit-Oberfläche:
- **BATCH-005 / Planning Coverage:** SRC-1638.a: Not Applicable. Implementation Verification: nicht erneut geprüft.
  - `SRC-1638.a` → Quellenregel/Beleg: Einleitung der Cockpit-/Board-Oberflächenphase, keine eigene abnehmbare Klausel. Kontext erhalten, nicht als ST-BRD-04-Coverage zählen.

## src-1639

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:347` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: 1. Backlog, Board mit zwei Zeilen und Karten-Detailansicht entwickeln;
- **BATCH-005 / Planning Coverage:** SRC-1639.a: Not Applicable; SRC-1639.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1639.a` → Quellenregel/Beleg: 1. ist Listenmarker.
  - `SRC-1639.b` → ST-BRD-01, ST-BRD-02: Backlog, zweizeiliges Board und Kartendetail sind drei Oberflächenergebnisse. ST-BRD-01 und Tablet-Detail in ST-BRD-02 (Plan Z. 593–609) statt Marvin; einzelne Bedien-AC ergänzen.

## src-1640

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:348` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 2. Erstellung, Bearbeitung, Einplanung, Verschiebung, Übernahme und Review/Done mit vollständigem Verlauf implementieren;
- **BATCH-005 / Planning Coverage:** SRC-1640.a: Not Applicable; SRC-1640.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1640.a` → Quellenregel/Beleg: 2. ist Listenmarker.
  - `SRC-1640.b` → ST-BRD-01: Erstellen, Bearbeiten, Einplanen, Verschieben, Übernehmen, Review/Done und vollständiger Verlauf benötigen getrennte Rollen-, Zustands- und Auditfälle. ST-BRD-01; Plan Z. 599 ist teilweise deckend, aber kein Einzelfallnachweis. ST-BRD-04 wäre nur für explizit erlaubte Marvin-Aktionen einschlägig.

## src-1641

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:350` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: 3. Tablet-Ansicht im Querformat und zugängliche Bedienalternativen umsetzen;
- **BATCH-005 / Planning Coverage:** SRC-1641.a: Not Applicable; SRC-1641.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1641.a` → Quellenregel/Beleg: 3. ist Listenmarker.
  - `SRC-1641.b` → ST-BRD-02: Querformat und zugängliche Bedienalternativen sind separate Tablet-AC. ST-BRD-02, Plan Z. 604–608/TASK-0100, deckt sie thematisch; Tastatur und Touch einzeln prüfen. ST-BRD-04 ist falsch.

## src-1642

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:351` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 4. VanVenture-Warnung in Fast Track abbilden und deren Aktualisierung sichtbar machen;
- **BATCH-005 / Planning Coverage:** SRC-1642.a: Not Applicable; SRC-1642.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1642.a` → Quellenregel/Beleg: 4. ist Listenmarker.
  - `SRC-1642.b` → ST-BRD-03: Warnung als Fast-Track-Karte und sichtbare Aktualisierung derselben Warnung sind zwei Fälle. ST-BRD-03 ist richtig; Plan Z. 617 beschreibt einmalige Kartenerzeugung, die sichtbare Aktualisierung braucht ein ausdrückliches AC.

## src-1643

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:352` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: 5. Content Planner und Scrum Board getrennt lassen; nur freiwillige Verknüpfungen über Story/Epic erlauben, keine erzwungene Doppelpflege.
- **BATCH-005 / Planning Coverage:** SRC-1643.a: Not Applicable; SRC-1643.b: Covered; SRC-1643.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1643.a` → Quellenregel/Beleg: 5. ist Listenmarker.
  - `SRC-1643.b` → ST-BRD-01: Content Planner und Board bleiben fachlich getrennt; Plan ST-BRD-01 Z. 599 deckt dies.
  - `SRC-1643.c` → ST-BRD-01: Nur freiwillige Story-/Epic-Links; keine erzwungene Doppelpflege. Plan Z. 599 erwähnt freiwillige Links, fügt auch Planner-Links hinzu; für diese Quelle ausdrücklich prüfen, dass kein Pflichtlink und keine automatische Status-/Stundenpflege entstehen. Register-Anwendung ST-BRD-04 korrigieren.

## src-1644

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:355` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 3 – Cockpit- und Board-Oberfläche
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: **Abnahme:** Eine Karte kann korrekt vom Backlog über Offen, Bereit, In Arbeit, Review bis Done laufen; in In Arbeit ist eine Übernahme zwingend; beide Board-Zeilen bleiben auf dem Tablet vollständig bedienbar.
- **BATCH-005 / Planning Coverage:** SRC-1644.a: Covered; SRC-1644.b: Covered; SRC-1644.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1644.a` → ST-BRD-01: Vollständiger Weg Backlog → Offen → Bereit → In Arbeit → Review → Done braucht Zustands-/Übergangstest bei ST-BRD-01.
  - `SRC-1644.b` → ST-BRD-01: Übernahme beim Eintritt in „In Arbeit“ zwingend; Plan Z. 599 deckt atomaren Wechsel, negativen Fall prüfen.
  - `SRC-1644.c` → ST-BRD-02: beide Zeilen auf dem Tablet vollständig bedienbar; ST-BRD-02, Plan Z. 608, mit jeder Spalte/Aktion prüfen. ST-BRD-04 ist für alle drei falsch.

## src-1645

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:361` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: Die vorhandene Cockpit-Phase 4 wird um den zuvor geplanten Warnungskanal konkretisiert:
- **BATCH-005 / Planning Coverage:** SRC-1645.a: Not Applicable. Implementation Verification: nicht erneut geprüft.
  - `SRC-1645.a` → Quellenregel/Beleg: Phaseneinleitung, keine eigenständige Implementierungs- oder Abnahmeklausel. Als Kontext für nachfolgende Qualitäts-/Betriebsschritte behalten; nicht als ST-BRD-03-Coverage zählen.

## src-1646

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:363` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03
- Verbindlicher Originalwortlaut: 1. API-, Migrations-, Berechtigungs-, Transaktions-, Idempotenz- und UI-Tests ergänzen;
- **BATCH-005 / Planning Coverage:** SRC-1646.a: Not Applicable; SRC-1646.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1646.a` → Quellenregel/Beleg: 1. ist Listenmarker.
  - `SRC-1646.b` → ST-BRD-01, ST-BRD-02, ST-BRD-03: API-, Migrations-, Rechte-, Transaktions-, Idempotenz- und UI-Tests sind sechs Prüffelder. Auf betroffene ST-BRD-01/02/03 und deren Tasks verteilen; Plan Z. 599 nennt mehrere, aber keinen vollständigen, zugeordneten Satz. ST-BRD-04 allein ist falsch.

## src-1647

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:364` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: 2. Recovery testen: Board-Ausfall, verzögerte Zustellung, Duplikat, falsche Signatur, Warnungsauflösung und Wiederherstellung aus Backup;
- **BATCH-005 / Planning Coverage:** SRC-1647.a: Not Applicable; SRC-1647.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1647.a` → Quellenregel/Beleg: 2. ist Listenmarker.
  - `SRC-1647.b` → ST-BRD-01, ST-BRD-03: sechs Recovery-Szenarien: Board-Ausfall, Verzögerung, Duplikat, falsche Signatur, Auflösung, Restore. Auf ST-BRD-01 (Board/Restore) und ST-BRD-03 (Kanalereignisse) mit je reproduzierbarem Sollverhalten aufteilen; ST-BRD-03 allein ist zu eng.

## src-1648

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:366` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: 3. den tatsächlichen Benachrichtigungskanal für fehlgeschlagene Syncs und kritische, nicht zugestellte Warnungen aktivieren;
- **BATCH-005 / Planning Coverage:** SRC-1648.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1648.a` → ST-BRD-03: Tatsächlichen Benachrichtigungskanal für fehlgeschlagene Syncs und kritische nicht zugestellte Warnungen aktivieren. ST-BRD-03 ist nur teilweise passend; Cockpit-Slice Z. 618 sagt ausdrücklich, dass monitor:cockpit noch keine Nachrichten versendet. Aktivierung als eigene, gesperrte Folgestory mit beiden Triggern, Empfänger-/Kanalentscheidung und Gate einplanen. Kein vorhandener Plantext beweist Aktivierung.

- COVERAGE-R1-041: ST-OPS-03/AC-COVR1-041-03 ist der eigene gesperrte Phase-4-Betriebsslice für beide Auslöser und tatsächliche Nachrichtenzustellung. Kanal, Empfänger, Verantwortung und Aktivierung bleiben Nutzerentscheidungen; Transport und Live-Ergebnis sind ungeprüft.
- COVERAGE-R1-051 / SRC-1648.a: Die bestehende AC deckt die Planung; kein weiterer AC nötig. Aktivierungsparameter und Zustellnachweis bleiben offen, Veröffentlichung/Transport bis Freigabe gesperrt.

## src-1649

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:368` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-OPS-01
- Verbindlicher Originalwortlaut: 4. Datenschutz-/Sicherheitsprüfung, Backup/Restore und Tablet-Kiosk-Verhalten abnehmen;
- **BATCH-005 / Planning Coverage:** SRC-1649.a: Not Applicable; SRC-1649.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1649.a` → Quellenregel/Beleg: 4. ist Listenmarker.
  - `SRC-1649.b` → ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-OPS-01: Datenschutz/Sicherheit, Backup/Restore und Tablet-Kiosk jeweils gesondert abnehmen; Ziele ST-BRD-01/03, ST-OPS-01 und ST-BRD-02. ST-BRD-04 allein ist falsch. Kiosk-Variante bleibt wegen SRC-1622.b ungeklärt.

## src-1650

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:369` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-OPS-01
- Verbindlicher Originalwortlaut: 5. erst dann auf dem Produktivsystem aktivieren.
- **BATCH-005 / Planning Coverage:** SRC-1650.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1650.a` → ST-BRD-01, ST-BRD-02, ST-BRD-03, ST-OPS-01: „erst dann“ bindet Produktivaktivierung an sämtliche vorherigen Phase-4-Prüfungen und Abnahmen. Als Release-Gate für alle betroffenen Board-/Kanal-Slices und ST-OPS-01 Z. 638–641 verankern; nicht nur ST-BRD-04. Gemäß [DEC-REL-001/002](/D:/work/_venventure/docs/scrum-migration/release-decisions.md:9) erteilen Tests oder Abnahme keine Freigabe des konkreten Release-Umfangs.

## src-1651

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:371` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 4 – Qualität, Betrieb und Benachrichtigungskanal
- Anwendung: ST-BRD-01, ST-BRD-03, ST-OPS-01
- Verbindlicher Originalwortlaut: **Abnahme:** Der Warnungskanal ist überwacht, kritisch fehlende Verarbeitung wird gemeldet und ein Restore stellt Board, Inbox und Verlauf konsistent wieder her.
- **BATCH-005 / Planning Coverage:** SRC-1651.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1651.a` → ST-BRD-01, ST-BRD-03, ST-OPS-01: Drei eigenständige Abnahmen: Kanalüberwachung, Meldung kritisch fehlender Verarbeitung und konsistenter Restore von Board, Inbox und Verlauf. Erste zwei bei ST-BRD-03, Restore bei ST-BRD-01/ST-OPS-01; letzterer braucht drei Datenbestandsprüfungen. Plan Z. 599 deckt Restore thematisch, Z. 617 die konkreten Meldungen nicht vollständig.

## src-1652

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:376` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: 1. Marvin erhält eine eigene, minimal berechtigte Dienstidentität.
- **BATCH-005 / Planning Coverage:** SRC-1652.a: Not Applicable; SRC-1652.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1652.a` → Quellenregel/Beleg: 1. ist eine Listennummer, keine Klausel; Segmentierungsduplikat. Mit 1652.b zusammenführen.
  - `SRC-1652.b` → ST-BRD-04: Eigene, minimal berechtigte Marvin-Dienstidentität. ST-BRD-04:626–627 nennt nur „eng begrenzte Dienstrechte“, die eigene Identität fehlt. ST-BRD-04:626–627 als eigenes AC mit Identität und minimalen Rechten; Identität des Warnungssenders in ST-BRD-03 getrennt halten.

## src-1653

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:377` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: 2. Es werden ausschließlich Backlog-Anlage und explizit beauftragtes Einplanen aktiviert.
- **BATCH-005 / Planning Coverage:** SRC-1653.a: Not Applicable; SRC-1653.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1653.a` → Quellenregel/Beleg: 2. ist nur Nummerierung. Mit 1653.b zusammenführen.
  - `SRC-1653.b` → ST-BRD-04: „Ausschließlich“ begrenzt das MVP auf Backlog-Anlage und explizit beauftragtes Einplanen. ST-BRD-04:627 erlaubt allgemein „ausdrücklich angeordnete Verschiebungen“; das umfasst mehr Board-Bewegungen und widerspricht der MVP-Grenze. ST-BRD-04:627 und TASK-0101 auf Anlage und beauftragtes Einplanen nach Offen begrenzen; spätere Bewegungen nur nach gesondertem Erweiterungsentscheid.

- COVERAGE-R1-041: ST-BRD-04, Story-Katalog und TASK-0101 sind auf Backlog-Anlage und ausdrücklich beauftragtes Einplanen nach Offen begrenzt; spätere Verschiebungen brauchen einen gesonderten Entscheid. Umsetzung ungeprüft.

## src-1654

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:378` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: 3. Natürliche Sprachbefehle werden in validierte, bestätigbare Kartenoperationen übersetzt; bei fehlenden Pflichtangaben fragt Marvin nach.
- **BATCH-005 / Planning Coverage:** SRC-1654.a: Not Applicable; SRC-1654.b: Covered; SRC-1654.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1654.a` → Quellenregel/Beleg: 3. ist nur Nummerierung. Mit 1654.b/c zusammenführen.
  - `SRC-1654.b` → ST-BRD-04: Validierte und bestätigbare Übersetzung natürlicher Sprache in Kartenoperationen fehlt in ST-BRD-04:627. Ein „klarer Auftrag“ deckt beide Eigenschaften nicht. Eigenes AC in ST-BRD-04 für Validierung, sichtbare Bestätigung und Ausführung der bestätigten Operation.
  - `SRC-1654.c` → ST-BRD-04: Rückfrage bei fehlenden Pflichtangaben fehlt. Das ist ein eigener beobachtbarer Fehlerfall. ST-BRD-04-AC mit Test einer unvollständigen Anweisung ergänzen.

## src-1655

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:380` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: 4. Alle Marvin-Aktionen werden mit Auftrag, Zeit und resultierender Änderung auditiert.
- **BATCH-005 / Planning Coverage:** SRC-1655.a: Not Applicable; SRC-1655.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1655.a` → Quellenregel/Beleg: 4. ist nur Nummerierung. Mit 1655.b zusammenführen.
  - `SRC-1655.b` → ST-BRD-04: „Datensparsam auditierbar“ in ST-BRD-04:627 bewahrt die drei Pflichtdaten Auftrag, Zeit, resultierende Änderung nicht ausdrücklich. Diese drei Felder im Marvin-AC und Prüfschritt benennen; sichere Datenminimierung beibehalten.

## src-1656

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:381` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: 5. Eine begrenzte Pilotphase prüft Fehlzuordnungen und verständliche Rückfragen.
- **BATCH-005 / Planning Coverage:** SRC-1656.a: Not Applicable; SRC-1656.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1656.a` → Quellenregel/Beleg: 5. ist nur Nummerierung. Mit 1656.b zusammenführen.
  - `SRC-1656.b` → ST-BRD-04: Begrenzte Pilotphase mit Prüfung von Fehlzuordnungen und verständlichen Rückfragen fehlt vollständig als geplanter Abnahmeschritt. ST-BRD-04 um Pilot-Task mit Umfang, Beispielen und nachweisbarem Ergebnis ergänzen.

## src-1657

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:383` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 5 – Marvin-MVP
- Anwendung: ST-BRD-04, ST-BRD-03
- Verbindlicher Originalwortlaut: **Abnahme:** Marvin kann keine Karte stillschweigend abschließen, niemanden automatisch übernehmen und keine Fast-Track-Warnung unterdrücken; erlaubte Anweisungen sind im Verlauf eindeutig nachvollziehbar.
- **BATCH-005 / Planning Coverage:** SRC-1657.a: Covered; SRC-1657.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1657.a` → ST-BRD-04, ST-BRD-03: Drei unabhängige Verbote sind zusammengezogen. ST-BRD-04:627 deckt Done und automatische Übernahme teilweise, das Unterdrücken von Fast-Track-Warnungen nicht. Zuordnung ST-BRD-03 allein ist falsch, weil der Akteur Marvin ist. In drei AC unter ST-BRD-04 aufteilen; Warnungsfall zusätzlich mit ST-BRD-03 verknüpfen. „Stillschweigend abschließen“ einschließlich fehlender Bestätigung prüfen.
  - `SRC-1657.b` → ST-BRD-04: Eindeutig nachvollziehbare erlaubte Anweisungen sind stärker als allgemeine Auditierbarkeit. ST-BRD-03 ist falsches Primärziel. ST-BRD-04:627 mit Verbindung von Anweisung, Auftraggeber soweit vorhanden und Kartenänderung ergänzen.

## src-1658

- COVERAGE-R1-042: AC-COVR1-042-02 und TASK-COVR1-042-01 planen den späteren Nutzungsentscheid. Die Ja/Nein-Entscheidungen und je Ausbau Datenschutz/Bedienung bleiben offen; kein MVP- oder Freigabenachweis.

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:389` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 9. Integrierter Phasenplan / Phase 6 – Stabilisierungs- und Erweiterungsentscheid
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: Nach mehreren Wochen realer Nutzung wird entschieden, ob Marvin zusätzliche, bestätigte Aktionen erhalten soll und ob eine kompakte Verlaufs-/Monitoringansicht wirklich gebraucht wird. Mögliche Ausbauten sind Erinnerungen an fällige Karten, wiederkehrende Wartungsaufgaben und ein druckbarer Wochenüberblick. Sie gehören nicht in das MVP und benötigen jeweils einen eigenen Datenschutz- und Bedienentscheid.
- **BATCH-005 / Planning Coverage:** SRC-1658.a: Unresolved; SRC-1658.b: Unresolved; SRC-1658.c: Unresolved. Implementation Verification: nicht erneut geprüft.
  - `SRC-1658.a` → ST-BRD-04: Entscheidung erst nach mehreren Wochen realer Nutzung über zusätzliche bestätigte Marvin-Aktionen und Monitoringansicht; im Plan fehlt der spätere Entscheidungspunkt. Kein heutiger Implementierungsauftrag. Eigenen geplanten Entscheidungs-Task nach ST-BRD-04 mit Nutzungsnachweis und getrennten Ja/Nein-Entscheidungen anlegen; Status Unresolved, nicht als MVP-AC erledigen. **Offene Frage:** Sollen nach mehreren Wochen tatsächlicher Nutzung zusätzliche, jeweils bestätigte Marvin-Aktionen und eine kompakte Verlaufs-/Monitoringansicht eingeführt werden?
  - `SRC-1658.b` → ST-BRD-04: Erinnerungen, wiederkehrende Wartung und Druckübersicht sind Möglichkeiten, keine beschlossenen Stories. Die pauschale Zuordnung zu ST-BRD-04 könnte sie fälschlich als MVP-Scope erscheinen lassen. Als drei optionale, nicht eingeplante Erweiterungskandidaten beim späteren Entscheid festhalten. **Offene Frage:** Welche der drei optionalen Ausbauten Erinnerungen, wiederkehrende Wartung und Druckübersicht werden nach Pilotnutzung beauftragt?
  - `SRC-1658.c` → ST-BRD-04: Enthält zwei Gates: außerhalb MVP und je Ausbau eigener Datenschutz- und Bedienentscheid. Beides fehlt in ST-BRD-04. MVP-Ausschluss bei ST-BRD-04; pro optionalem Ausbau separate offene Entscheidung. **Offene Frage:** Welche Datenschutz- und Bedienentscheidung gilt jeweils für einen später beauftragten Ausbau?

## src-1659

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:397` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01, ST-BRD-03, ST-BRD-04
- Verbindlicher Originalwortlaut: Vor Go-live sind mindestens folgende Szenarien automatisiert oder nachvollziehbar manuell geprüft:
- **BATCH-005 / Planning Coverage:** SRC-1659.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1659.a` → ST-BRD-01, ST-BRD-03, ST-BRD-04: Die Einleitung gilt für alle folgenden Go-live-Szenarien, nicht nur ST-BRD-04. Einzelne Registereinträge bewahren den Wortlaut, verknüpfen aber die gemeinsame zeitliche und methodische Bedingung nicht prüfbar mit allen Szenarien. Übergreifendes Board-/Warnungs-/Marvin-Release-Gate bei EPIC-BOARD:591; jedem folgenden AC automatisierten oder nachvollziehbar manuellen Nachweis zuordnen. Tests bleiben nach DEC-REL-002 keine Freigabe.

## src-1660

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:400` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01, ST-BRD-03, ST-BRD-04
- Verbindlicher Originalwortlaut: - unbefugter Zugriff auf Board-, Warnungs- und Marvin-Endpunkte wird abgewiesen;
- **BATCH-005 / Planning Coverage:** SRC-1660.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1660.a` → ST-BRD-01, ST-BRD-03, ST-BRD-04: Drei Endpunktgruppen; ST-BRD-03 deckt Warnungen, Board und Marvin gehören zusätzlich ST-BRD-01/04. Das allgemeine Rechte-AC in ST-BRD-01 ersetzt keinen Negativtest je Gruppe. Drei unbefugte Zugriffstests unter ST-BRD-01, -03, -04 und gemeinsames Go-live-Gate.

## src-1661

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:401` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - ein deaktiviertes Konto verliert auch den Boardzugriff sofort;
- **BATCH-005 / Planning Coverage:** SRC-1661.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1661.a` → ST-BRD-01: Sofortiger Verlust des Boardzugriffs bei Kontodeaktivierung fehlt. ST-BRD-04 ist falsches Ziel; Marvin-Dienstrechte sind ein anderer Fall. ST-BRD-01:599 als Negativtest für deaktiviertes Nutzerkonto.

## src-1662

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:402` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Backlog-Elemente erscheinen erst nach bewusster Planung im Board;
- **BATCH-005 / Planning Coverage:** SRC-1662.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1662.a` → ST-BRD-01: ST-BRD-01:599 enthält bewusste Einplanung inhaltlich. Zuordnung ST-BRD-04 ist falsch; das AC braucht einen Test für unbeplante Backlog-Elemente. ST-BRD-01:599 mit Test „vorher nur Backlog, danach Board“; Marvin-Sonderfall bei ST-BRD-04.

## src-1663

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:403` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: - Projekt-Tasks und projektbezogene To-dos werden ohne Story-Elternkarte oder mit direkter Epic-Elternkarte bei Anlage und Änderung abgewiesen; eigenständige Familien-To-dos und Warnungs-Tasks bleiben ohne Epic-Elternkarte möglich;
- **BATCH-005 / Planning Coverage:** SRC-1663.a: Covered; SRC-1663.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1663.a` → ST-BRD-01, ST-BRD-03: Zwei Kartentypen, zwei ungültige Elternzustände und Anlage wie Änderung. ST-BRD-01:599 nennt nur Story-Elternschaft für Projekt-Tasks; projektbezogene To-dos und Änderungsvalidierung fehlen. ST-BRD-03 ist falsch. ST-BRD-01:599 mit Negativmatrix für Projekt-Task/Projekt-To-do × ohne Story/direkt unter Epic × Anlage/Änderung; auch Marvin-Anlage in ST-BRD-04 prüfen.
  - `SRC-1663.b` → ST-BRD-01, ST-BRD-03: Ausnahme für eigenständige Familien-To-dos und Warnungs-Tasks: keine Epic-Elternkarte nötig. ST-BRD-01 deckt private To-dos teilweise; Warnungs-Tasks fehlen. ST-BRD-01 für Familien-To-dos, ST-BRD-03 für Warnungs-Tasks; Positivtests ergänzen.

## src-1664

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:406` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01, ST-BRD-02
- Verbindlicher Originalwortlaut: - jede Spalte ist in beiden Zeilen erreichbar; unzulässige Bewegungen werden blockiert;
- **BATCH-005 / Planning Coverage:** SRC-1664.a: Covered; SRC-1664.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1664.a` → ST-BRD-01, ST-BRD-02: Jede Spalte in beiden Zeilen erreichbar; ST-BRD-01:599 und ST-BRD-02:608 nennen die Spalten, aber keine vollständige Erreichbarkeitsprüfung. ST-BRD-04 falsch. ST-BRD-01 und Tablet-AC ST-BRD-02 mit beiden Zeilen × fünf Spalten prüfen.
  - `SRC-1664.b` → ST-BRD-01, ST-BRD-02: Blockierung unzulässiger Bewegungen fehlt als eigener Negativtest. Welche Übergänge zulässig sind, steht im Originalkontext 113–132; der Plan übernimmt sie nicht vollständig. ST-BRD-01:599 mit erlaubten Vor-/Rückbewegungen, Prioritätsbedingung für Zeilenwechsel und abgewiesenen Übergängen. Source-Status „Open/Blocked“ beibehalten, bis Regeln bestätigt sind.

## src-1665

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:407` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - nur eine übernehmende Person kann eine Karte gleichzeitig aktiv halten, sofern keine spätere Mehrfachübernahme bewusst eingeführt wird;
- **BATCH-005 / Planning Coverage:** SRC-1665.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1665.a` → ST-BRD-01: Höchstens eine gleichzeitige Übernahme sofern Mehrfachübernahme nicht später bewusst eingeführt wird. ST-BRD-01 beschreibt atomare Übernahme, nicht die Ein-Personen-Grenze. ST-BRD-04 falsch. ST-BRD-01:599 mit Konkurrenztest; spätere Mehrfachübernahme nur nach eigenem Entscheid, derzeit nicht voraussetzen.

## src-1666

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:409` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - beim Übergang nach In Arbeit werden Position, Name und Verlauf atomar gespeichert;
- **BATCH-005 / Planning Coverage:** SRC-1666.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1666.a` → ST-BRD-01: Position, Name und Verlauf müssen gemeinsam atomar gespeichert werden. ST-BRD-01:599 nennt atomare Übernahme, lässt Position und Verlauf im selben Transaktionsnachweis offen. ST-BRD-01:599/TASK-0099 um Drei-Felder-Transaktions- und Rollbacktest ergänzen.

## src-1667

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:410` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Duplikate und Wiederholungen einer VanVenture-Warnung erzeugen keine zweite Karte;
- **BATCH-005 / Planning Coverage:** SRC-1667.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1667.a` → ST-BRD-03: ST-BRD-03:617 enthält „genau eine“ Karte bei Wiederholung; Duplikat und fachliche Wiederholung brauchen getrennte Eingaben. ST-BRD-03:617 mit beiden Testfällen und Kartenanzahl eins konkretisieren.

## src-1668

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:411` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - `high` und `critical` landen korrekt in Fast Track → Offen;
- **BATCH-005 / Planning Coverage:** SRC-1668.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1668.a` → ST-BRD-03: ST-BRD-03:617 deckt high/critical → Fast Track, aber Spalte Offen ist nicht ausdrücklich im Warnungs-AC genannt. ST-BRD-03:617 für beide Schweregrade mit Fast Track → Offen ergänzen.

## src-1669

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:412` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - eine Auflösung aus VanVenture beendet keine Karte ohne menschliche Done-Bestätigung;
- **BATCH-005 / Planning Coverage:** SRC-1669.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1669.a` → ST-BRD-03: ST-BRD-03:617 enthält menschliche Done-Bestätigung. ST-BRD-04 ist falsches Primärziel; der Test muss die externe Auflösung als Auslöser verwenden. Zu ST-BRD-03:617 umhängen und Auflösung ohne menschliche Bestätigung als Negativtest festlegen.

## src-1670

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:413` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Marvin kann nur die erlaubten Endpunkte und Aktionen durchführen;
- **BATCH-005 / Planning Coverage:** SRC-1670.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1670.a` → ST-BRD-04: Erlaubte Endpunkte und Aktionen sind zwei Berechtigungsdimensionen. ST-BRD-04:627 nennt Dienstrechte allgemein, aber keine explizite Allowlist und Negativtests. ST-BRD-04:627 mit Endpunkt-/Aktionsmatrix und abgewiesenen Aufrufen ergänzen.

## src-1671

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:414` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: - Backup/Restore erhält Board-Positionen, Verknüpfungen, Warnungs-Inbox und Verlauf;
- **BATCH-005 / Planning Coverage:** SRC-1671.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1671.a` → ST-BRD-01, ST-BRD-03: Vier wiederherzustellende Datenarten. ST-BRD-01:599 nennt Board, Inbox, Verlauf, lässt Verknüpfungen aus; ST-BRD-03 allein ist zu eng. ST-BRD-01-Restore-AC um Board-Positionen, Verknüpfungen, Inbox und Verlauf einzeln ergänzen; Warnungslinks mit ST-BRD-03 prüfen.

## src-1672

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:415` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 10. Test- und Abnahmekatalog
- Anwendung: ST-BRD-02
- Verbindlicher Originalwortlaut: - Tablets zeigen ohne private Anmeldung keine Daten und bleiben bei Netzunterbrechung verständlich, ohne alte Daten als aktuell auszugeben.
- **BATCH-005 / Planning Coverage:** SRC-1672.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1672.a` → ST-BRD-02: Zwei unabhängige Tablet-Fälle: keine Daten ohne private Anmeldung; bei Netzunterbrechung verständlich und keine alten Daten als aktuell. ST-BRD-02:608 deckt keinen davon. ST-BRD-04 falsch. ST-BRD-02:608 um Login- und Offline/Stale-Data-AC samt Tablet-Prüfungen ergänzen.

## src-1673

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:420` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-01, ST-BRD-03
- Verbindlicher Originalwortlaut: - Öffentliche Anzeige des Boards oder Fahrzeugwarnungen auf vanventure.at.
- **BATCH-005 / Planning Coverage:** SRC-1673.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1673.a` → ST-BRD-01, ST-BRD-03: Zwei öffentliche Ausschlüsse: Board und Fahrzeugwarnungen. ST-BRD-03 allein deckt das Board nicht. Ausschluss bei ST-BRD-01 und ST-BRD-03 als öffentliche Negativprüfung verankern.

## src-1674

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:421` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-01, ST-BRD-02, ST-BRD-04
- Verbindlicher Originalwortlaut: - Automatische Aufgabenvergabe, Leistungsrankings oder eine „Wer macht was?“-Startansicht.
- **BATCH-005 / Planning Coverage:** SRC-1674.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1674.a` → ST-BRD-01, ST-BRD-02, ST-BRD-04: Drei Ausschlüsse. ST-BRD-02:608 nennt nur kein Ranking in der Anzeige; automatische Vergabe und „Wer macht was?“-Startansicht fehlen. ST-BRD-04 allein zu eng. ST-BRD-01/02:599/608 um keine automatische Vergabe, keine Rankings, keine Personen-Startansicht ergänzen; Marvin-Autonomie zusätzlich ST-BRD-04.

## src-1675

- COVERAGE-R1-042: AC-COVR1-042-01 benennt autonomes Verschieben und autonomes Abschließen als getrennte Verbote; AC-COVR1-041-04 begrenzt das MVP-Einplanen. Umsetzung ungeprüft.

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:422` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-04
- Verbindlicher Originalwortlaut: - Autonomes Verschieben oder Abschließen durch Marvin.
- **BATCH-005 / Planning Coverage:** SRC-1675.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1675.a` → ST-BRD-04: Autonomes Verschieben und autonomes Abschließen. ST-BRD-04:627 deckt Done, seine Formulierung zu Verschiebungen muss auf explizites MVP-Einplanen begrenzt werden. Zwei Verbots-AC in ST-BRD-04; Korrektur wie 1653.b.

## src-1676

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:423` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-02, ST-BRD-04
- Verbindlicher Originalwortlaut: - Direkter Zugriff des Tablets oder von Marvin auf Fahrzeugsteuerung, Rohsensoren, OAuth-Tokens oder andere Geheimnisse.
- **BATCH-005 / Planning Coverage:** SRC-1676.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1676.a` → ST-BRD-02, ST-BRD-04: Tablet oder Marvin × Fahrzeugsteuerung, Rohsensoren, OAuth-Tokens, sonstige Geheimnisse. ST-BRD-04:627 enthält diese Zugriffssperren nicht; Tablet-Ziel fehlt. Negativmatrix für ST-BRD-02 und -04, technische Rechte-/Datenflussprüfung.

## src-1677

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:425` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-03
- Verbindlicher Originalwortlaut: - Push-Nachrichten an externe Dienste, bis der Benachrichtigungskanal in Phase 4 ausdrücklich gewählt und abgesichert wurde.
- **BATCH-005 / Planning Coverage:** SRC-1677.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1677.a` → ST-BRD-03: Externe Push-Nachrichten bleiben gesperrt, bis Kanal in Phase 4 ausdrücklich gewählt und abgesichert ist. Eine spätere bedingte Möglichkeit, keine pauschal dauerhafte Sperre. ST-BRD-04 ist falsch. ST-BRD-03 beziehungsweise Phase-4-Betriebs-AC: Sperre, dokumentierte Kanalwahl, Absicherung und gesonderte Release-Freigabe festhalten.

## src-1678

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:427` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 11. Nicht Bestandteil dieser Ausbaustufe
- Anwendung: ST-BRD-01
- Verbindlicher Originalwortlaut: - Austausch des bestehenden Cockpit- oder Content-Planner-Konzepts.
- **BATCH-005 / Planning Coverage:** SRC-1678.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1678.a` → ST-BRD-01: Bestehendes Cockpit- und Content-Planner-Konzept dürfen in dieser Ausbaustufe nicht ausgetauscht werden. ST-BRD-01:599 deckt Trennung und Verknüpfung teilweise; ST-BRD-04 falsch. ST-BRD-01:599 mit beiden Erhaltungsgrenzen und Regressionstest ergänzen.

## src-1679

- Quelle: `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md:431` · VanVenture.at – Hauptentwicklungsplan mit Marvin Scrum Board / 12. Nächster verbindlicher Schritt
- Anwendung: ST-BRD-01, ST-BRD-03, ST-BRD-04
- Verbindlicher Originalwortlaut: Als nächstes wird ausschließlich Phase 0 fachlich abgeschlossen: Prioritäts- und Fast-Track-Regeln, Warnungskatalog, Rollen sowie der Ereignisvertrag. Danach kann die bestehende Cockpit-Phase 1 mit den vorbereiteten Board-Migrationen beginnen. Bis zu dieser Abnahme werden weder Aufgaben, Warnungen noch Marvin-Schreibrechte produktiv angelegt.
- **BATCH-005 / Planning Coverage:** SRC-1679.a: Covered; SRC-1679.b: Covered; SRC-1679.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1679.a` → ST-BRD-01, ST-BRD-03, ST-BRD-04: Phase 0 enthält Priorität/Fast Track, Warnungskatalog, Rollen und Ereignisvertrag. ST-BRD-01:599 und ST-BRD-03:616–617 verteilen diese Punkte; Rollen und die ausschließliche Reihenfolge sind nicht gleich deutlich. Phase-0-Gate bei EPIC-BOARD:591, ST-BRD-01 und -03 mit vier einzeln nachgewiesenen Entscheidungen.
  - `SRC-1679.b` → ST-BRD-01, ST-BRD-03, ST-BRD-04: Cockpit-Phase 1 darf danach mit vorbereiteten Board-Migrationen beginnen. Das ist eine Abhängigkeit, keine Bestätigung, dass Migrationen schon liefen. ST-BRD-01-Dependency auf schriftliche Phase-0-Abnahme präzisieren; Status bleibt geplant/blockiert.
  - `SRC-1679.c` → ST-BRD-01, ST-BRD-03, ST-BRD-04: Drei produktive Sperren bis zur Phase-0-Abnahme. ST-BRD-01:599 enthält sie sinngemäß; ST-BRD-03 allein ist falsches Ziel und könnte Marvin-Schreibrechte übersehen. Gate gemeinsam für ST-BRD-01/-03/-04 und je ein Negativnachweis; Phase-0-Abnahme ersetzt nach DEC-REL-001/002 keine Release-Freigabe.

## src-1797

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:5` · VanVenture Video Production – verbindliche Arbeitsregeln / Geltungsbereich und Abgrenzung
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Alle Videoarbeiten erfolgen im gemeinsamen Repository `reflexible/vanventure` und ausschließlich unter `video-production/`.
- **BATCH-005 / Planning Coverage:** SRC-1797.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1797.a` → Quellenregel/Beleg: Repository und Pfadgrenze gelten für alle Videoarbeiten. ST-VID-01:316–324 ist eine als Done markierte Sardinien-Short-Story; sie kann die fortdauernde Regel für künftige Videoarbeit nicht abdecken. Als übergreifende EPIC-VIDEO-Regel mit Verweis auf die maßgebliche Video-AGENTS-Datei führen; bei jeder künftigen Video-Story anwenden. Keine rückwirkende Done-Behauptung.

## src-1798

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:6` · VanVenture Video Production – verbindliche Arbeitsregeln / Geltungsbereich und Abgrenzung
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Dateien außerhalb von `video-production/` dürfen nicht verändert werden, außer Helmut hat dies für die konkrete Aufgabe ausdrücklich freigegeben.
- **BATCH-005 / Planning Coverage:** SRC-1798.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1798.a` → Quellenregel/Beleg: Verbot außerhalb video-production/ mit enger Ausnahme: Helmuts ausdrückliche Freigabe für die konkrete Aufgabe. ST-VID-01 Done ist kein dauerhaftes Gate und bildet die Ausnahme nicht ab. Übergreifendes EPIC-VIDEO-Gate mit konkreter Aufgabenfreigabe; Ausnahmen nicht aus allgemeiner Video- oder Release-Freigabe ableiten.

## src-1799

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen. Ungeklärt bleibt die Reichweite der aufgabenspezifischen Ausnahme nach SRC-1800; bis zur Nutzerentscheidung keine Website-/Cockpit-/Deployment-Ausnahme auslegen.

- Quelle: `video-production/AGENTS.md:7` · VanVenture Video Production – verbindliche Arbeitsregeln / Geltungsbereich und Abgrenzung
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Website, Cockpit, Deployment und sonstige Bestandteile von vanventure.at bleiben unangetastet.
- **BATCH-005 / Planning Coverage:** SRC-1799.a: Unresolved. Implementation Verification: nicht erneut geprüft.
  - `SRC-1799.a` → Quellenregel/Beleg: schützt Website, Cockpit, Deployment und übrige Site-Bestandteile vor Eingriffen durch Videoarbeit. Register [5296–5300](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5296>) ist textgetreu; die absolute Formulierung steht in Spannung zur ausdrücklichen Freigabemöglichkeit in 1800. Anwendung für Videoarbeiten ausdrücklich klären; nicht als Nachweis für die erledigte Story verwenden. **Offene Frage:** Gilt Helmuts aufgabenspezifische Freigabe nach SRC-1800 als Ausnahme vom Eingriffsverbot für Website, Cockpit und Deployment in SRC-1799?

## src-1800

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:8` · VanVenture Video Production – verbindliche Arbeitsregeln / Geltungsbereich und Abgrenzung
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Vor jeder Änderung an Website oder Cockpit ist eine explizite Freigabe von Helmut einzuholen.
- **BATCH-005 / Planning Coverage:** SRC-1800.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1800.a` → Quellenregel/Beleg: verlangt vor jeder Website- oder Cockpitänderung Helmuts ausdrückliche Freigabe. Register [5302–5306](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5302>) erhält Rolle, Zeitpunkt und Scope. Als eigenes Änderungsgate erfassen; eine Freigabe eines Release-Umfangs nach DEC-REL-001 ersetzt dieses Gate nicht automatisch.

## src-1801

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:12` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 1. Bestehende Originalmedien sind read-only. Sie dürfen niemals verändert, gelöscht, verschoben, umbenannt oder überschrieben werden.
- **BATCH-005 / Planning Coverage:** SRC-1801.a: Not Applicable; SRC-1801.b: Partially Covered; SRC-1801.c: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1801.a` → Quellenregel/Beleg: ist nur „1.“ und entfällt.
  - `SRC-1801.b` → Quellenregel/Beleg: setzt bestehende Originalmedien auf read-only;
  - `SRC-1801.c` → Quellenregel/Beleg: verbietet ausdrücklich Ändern, Löschen, Verschieben, Umbenennen und Überschreiben. Beide Inhalte sind in Register [5308–5312](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5308>) enthalten; als Schutzkriterien für tatsächliche Medienarbeit anwenden, nicht als bereits geprüft melden.

## src-1802

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:13` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 2. Bestehende alte Resolve-Projekte werden nicht verändert, wenn daraus ein neuer Film, Remaster oder Short entstehen soll.
- **BATCH-005 / Planning Coverage:** SRC-1802.a: Not Applicable; SRC-1802.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1802.a` → Quellenregel/Beleg: ist nur „2.“.
  - `SRC-1802.b` → Quellenregel/Beleg: verbietet die Änderung alter Resolve-Projekte wenn daraus Film, Remaster oder Short entstehen soll. Register [5314–5318](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5314>) bewahrt die Bedingung; Zuordnung zu einer künftigen Produktionsarbeit statt zum v18-Abschluss.

## src-1803

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:14` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 3. Ein neues Resolve-Projekt wird nicht automatisch für jede Bearbeitung angelegt. Es wird nur angelegt, wenn aus einem bestehenden Altprojekt bewusst ein neues Werk entwickelt wird oder eine technische Trennung notwendig ist.
- **BATCH-005 / Planning Coverage:** SRC-1803.a: Not Applicable; SRC-1803.b: Partially Covered; SRC-1803.c: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1803.a` → Quellenregel/Beleg: ist nur „3.“.
  - `SRC-1803.b` → Quellenregel/Beleg: verbietet ein automatisches neues Projekt je Bearbeitung;
  - `SRC-1803.c` → Quellenregel/Beleg: braucht beim Umschreiben den Bezug „neues Resolve-Projekt“. Register [5320–5324](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5320>) ist vollständig.

## src-1804

- COVERAGE-R1-042: Fortgeltendes Gate für jede künftige Video-Story unter EPIC-VIDEO; konkreter Prüfschritt und Beleg werden beim Anlegen der Story zugeordnet. ST-VID-01 Done ist kein Nachweis. Implementation Verification offen.

- Quelle: `video-production/AGENTS.md:15` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 4. Wenn bereits ein VanVenture-Produktionsprojekt existiert, wird darin weitergearbeitet; bei Bedarf werden separate Timelines verwendet.
- **BATCH-005 / Planning Coverage:** SRC-1804.a: Not Applicable; SRC-1804.b: Partially Covered; SRC-1804.c: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1804.a` → Quellenregel/Beleg: ist nur „4.“.
  - `SRC-1804.b` → Quellenregel/Beleg: verpflichtet bei bestehendem VanVenture-Produktionsprojekt zur Weiterarbeit darin;
  - `SRC-1804.c` → Quellenregel/Beleg: erlaubt bei Bedarf separate Timelines. Die optionale Timeline ist keine Pflicht zu jeder Arbeit. Register [5326–5330](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5326>) ist richtig.

## src-1805

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-01 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:16` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 5. Die Anzahl der Resolve-Projekte bleibt möglichst gering.
- **BATCH-005 / Planning Coverage:** SRC-1805.a: Not Applicable; SRC-1805.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1805.a` → Quellenregel/Beleg: ist nur „5.“.
  - `SRC-1805.b` → Quellenregel/Beleg: fordert möglichst wenige Resolve-Projekte, keine absolute Obergrenze. Register [5332–5336](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5332>) erhält die weiche Priorität; bei Produktionsplanung berücksichtigen.

## src-1806

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-02 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:17` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 6. Vor neuen Schnitten sind vorhandene Resolve-Projekte, Timelines, Originalmedien und Master ausschließlich lesend zu prüfen.
- **BATCH-005 / Planning Coverage:** SRC-1806.a: Not Applicable; SRC-1806.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1806.a` → Quellenregel/Beleg: ist nur „6.“.
  - `SRC-1806.b` → Quellenregel/Beleg: verlangt vor neuen Schnitten eine ausschließlich lesende Prüfung aller vier Bestände: Projekte, Timelines, Originalmedien, Master. Register [5338–5342](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5338>) ist vollständig; Prüfschritt gehört zur jeweiligen Schnittarbeit.

## src-1807

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-03 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:18` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 7. Originalkamera-Dateien und vorhandene hochwertige Master haben Vorrang vor YouTube-Material.
- **BATCH-005 / Planning Coverage:** SRC-1807.a: Not Applicable; SRC-1807.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1807.a` → Quellenregel/Beleg: ist nur „7.“.
  - `SRC-1807.b` → Quellenregel/Beleg: gibt Originalkamera-Dateien und vorhandenen hochwertigen Mastern Vorrang vor YouTube-Material; kein absolutes YouTube-Verbot. Register [5344–5348](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5344>) ist korrekt.

## src-1808

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-03 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:19` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 8. YouTube dient primär als Referenz und Analytics-Quelle.
- **BATCH-005 / Planning Coverage:** SRC-1808.a: Not Applicable; SRC-1808.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1808.a` → Quellenregel/Beleg: ist nur „8.“.
  - `SRC-1808.b` → Quellenregel/Beleg: bestimmt YouTube primär als Referenz- und Analytics-Quelle. Register [5350–5354](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5350>) bewahrt „primär“; nicht zum Ausschluss jeder anderen Nutzung verschärfen.

## src-1809

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-03 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:20` · VanVenture Video Production – verbindliche Arbeitsregeln / Originale, Archive und Projekte
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: 9. Archive-first: Vorhandenes, gutes Material wird bevorzugt wiederverwendet.
- **BATCH-005 / Planning Coverage:** SRC-1809.a: Not Applicable; SRC-1809.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1809.a` → Quellenregel/Beleg: ist nur „9.“.
  - `SRC-1809.b` → Quellenregel/Beleg: bevorzugt vorhandenes gutes Material zur Wiederverwendung. Register [5356–5360](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5356>) ist korrekt; Qualitätsbedingung und Vorrang erhalten.

## src-1810

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-04 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:24` · VanVenture Video Production – verbindliche Arbeitsregeln / Veröffentlichung und Qualitätskontrolle
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Es gibt keine automatische Veröffentlichung auf YouTube, Instagram oder anderen Plattformen.
- **BATCH-005 / Planning Coverage:** SRC-1810.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1810.a` → Quellenregel/Beleg: verbietet automatische Veröffentlichung auf YouTube, Instagram und anderen Plattformen. Register [5362–5366](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5362>) ist vollständig. Mit DEC-REL-001/002 vereinbar: Auch ein erfolgreicher Test erteilt keine Veröffentlichungsfreigabe.

## src-1811

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-04 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:25` · VanVenture Video Production – verbindliche Arbeitsregeln / Veröffentlichung und Qualitätskontrolle
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Render, Upload und Veröffentlichung sind getrennte Schritte.
- **BATCH-005 / Planning Coverage:** SRC-1811.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1811.a` → Quellenregel/Beleg: trennt Render, Upload und Veröffentlichung als Schritte; keine stillschweigende Folgefreigabe. Register [5368–5372](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5368>) ist korrekt.

## src-1812

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-05 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:26` · VanVenture Video Production – verbindliche Arbeitsregeln / Veröffentlichung und Qualitätskontrolle
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Automatisierte Analyse und Tracking ersetzen niemals eine visuelle Endkontrolle.
- **BATCH-005 / Planning Coverage:** SRC-1812.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1812.a` → Quellenregel/Beleg: verlangt visuelle Endkontrolle zusätzlich zu automatisierter Analyse und Tracking. Register [5374–5378](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5374>) ist korrekt; 1817 und 1819 konkretisieren andere Prüfpunkte und sind keine entbehrlichen Duplikate.

## src-1813

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-06 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:30` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Wenn Adrian in einer öffentlich bestimmten Fassung identifizierbar wäre, muss er sauber und möglichst unauffällig anonymisiert werden.
- **BATCH-005 / Planning Coverage:** SRC-1813.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1813.a` → Quellenregel/Beleg: greift, wenn Adrian in einer öffentlich bestimmten Fassung identifizierbar wäre; dann ist er sauber und möglichst unauffällig zu anonymisieren. Register [5380–5384](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5380>) bewahrt Bedingung und Person. Eine Prüfung konkreter Fassungen ist hier nicht belegt.

## src-1814

- **COVERAGE-R1-043:** Fortgeltende Quellenregel; AC-COVR1-043-06 am EPIC-VIDEO plant ihre Anwendung mit Prüfschritt und Beleg bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Konkrete Ausführung, Privacy- und Publikationsfreigaben ungeprüft.

- Quelle: `video-production/AGENTS.md:31` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Bevorzugt werden enges, weiches und bewegungsstabiles Gesichtstracking statt großer, auffälliger Pixel- oder Mosaikflächen.
- **BATCH-005 / Planning Coverage:** SRC-1814.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1814.a` → Quellenregel/Beleg: bevorzugt enges, weiches, bewegungsstabiles Gesichtstracking vor großen Pixel- oder Mosaikflächen; es ist eine Präferenz mit Privacy-Ziel, kein ausnahmslos vorgeschriebenes Verfahren. Register [5386–5390](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5386>) ist korrekt.

## src-1815

- Quelle: `video-production/AGENTS.md:32` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Die Maske ist nur so groß wie nötig, aber groß genug, dass keine Identifikation möglich ist.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-01` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1815.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1815.a` → Quellenregel/Beleg: verbindet minimale Maskengröße mit der zwingenden Unidentifizierbarkeit. Keine der beiden Seiten darf isoliert als bestanden gelten. Register [5392–5396](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5392>) erhält beide.

## src-1816

- Quelle: `video-production/AGENTS.md:33` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Tracking ist bei Kopfbewegung, Profil, Verdeckung, Kamerabewegung, Motion Blur und Schnittwechseln manuell zu prüfen.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-02` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1816.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1816.a` → Quellenregel/Beleg: verlangt manuelle Trackingprüfung bei Kopfbewegung, Profil, Verdeckung, Kamerabewegung, Motion Blur und Schnittwechseln. Register [5398–5402](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5398>) ist vollständig; alle genannten Grenzfälle in der jeweiligen Abnahme prüfen.

## src-1817

- Quelle: `video-production/AGENTS.md:34` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Automatisches Tracking allein ist niemals eine Privacy-Abnahme.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-02` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1817.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1817.a` → Quellenregel/Beleg: schließt automatisches Tracking allein als Privacy-Abnahme aus. Register [5404–5408](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5404>) ist korrekt; ergänzt 1816.

## src-1818

- Quelle: `video-production/AGENTS.md:35` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Schwierige Stellen werden frameweise kontrolliert.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-02` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1818.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1818.a` → Quellenregel/Beleg: verlangt frameweise Kontrolle schwieriger Stellen, nicht zwingend jedes Frames des ganzen Films. Register [5410–5414](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5410>) ist korrekt.

## src-1819

- Quelle: `video-production/AGENTS.md:36` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Nach Erstellung eines Public Masters wird die vollständige öffentliche Fassung nochmals visuell auf unbeabsichtigt sichtbare Frames geprüft.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-03` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1819.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1819.a` → Quellenregel/Beleg: verlangt nach Erstellung eines Public Masters eine erneute Sichtprüfung der vollständigen öffentlichen Fassung auf unbeabsichtigt sichtbare Frames. Register [5416–5420](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5416>) bewahrt Zeitpunkt und Vollständigkeit; nicht durch Clip-Stichproben ersetzen.

## src-1820

- Quelle: `video-production/AGENTS.md:37` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Wenn eine saubere Anonymisierung einen Shot visuell zerstört, wird bevorzugt ein anderer Shot verwendet.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-04` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1820.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1820.a` → Quellenregel/Beleg: bevorzugt bei visuell zerstörender Anonymisierung einen anderen Shot. Es ist eine bedingte Präferenz, keine Erlaubnis, Adrian identifizierbar zu zeigen. Register [5422–5426](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5422>) ist korrekt.

## src-1821

- Quelle: `video-production/AGENTS.md:38` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Relevante Clips erhalten einen Privacy-Status: `CLEAR`, `BLUR_REQUIRED`, `REVIEW_REQUIRED` oder `NOT_FOR_PUBLIC`.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-05` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1821.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1821.a` → Quellenregel/Beleg: fordert für relevante Clips einen der vier exakt genannten Statuswerte. Register [5428–5432](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5428>) ist vollständig; Clip-Status nicht mit Fassungsfreigabe PRIVACY_APPROVED aus 1822 vermengen.

## src-1822

- Quelle: `video-production/AGENTS.md:39` · VanVenture Video Production – verbindliche Arbeitsregeln / Privacy für Adrian
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Erst nach visueller Prüfung darf eine Fassung den Status `PRIVACY_APPROVED` erhalten.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-05` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1822.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1822.a` → Quellenregel/Beleg: erlaubt PRIVACY_APPROVED für eine Fassung erst nach visueller Prüfung. Register [5434–5438](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5434>) ist korrekt; ein automatischer Statuswechsel wäre widersprüchlich.

## src-1823

- Quelle: `video-production/AGENTS.md:43` · VanVenture Video Production – verbindliche Arbeitsregeln / Reporting
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Wenn Helmut eine Datei öffnen, prüfen oder verwenden soll, immer ihren vollständigen absoluten Pfad angeben, sodass er ihn direkt kopieren und einfügen kann. Bei mehreren Dateien jeden Pfad vollständig aufführen.
- **COVERAGE-R1-044:** Fortgeltende Quellenregel; `AC-COVR1-044-06` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1823.a: Partially Covered; SRC-1823.b: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1823.a` → Quellenregel/Beleg: verlangt bei einer von Helmut zu öffnenden, prüfenden oder verwendenden Datei einen kopierbaren absoluten Pfad;
  - `SRC-1823.b` → Quellenregel/Beleg: verlangt das bei mehreren Dateien für jeden Pfad. Register [5440–5444](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5440>) ist vollständig. Dies ist eine Reporting-Regel, kein Abnahmekriterium der erledigten Video-Story.

## src-1824

- Quelle: `video-production/AGENTS.md:45` · VanVenture Video Production – verbindliche Arbeitsregeln / Reporting
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: Nach jedem größeren Arbeitsblock standardmäßig nur ausgeben:
- **COVERAGE-R1-044:** Fortgeltende Reporting-Einleitung im Zusammenhang mit `SRC-1825–1832`; `AC-COVR1-044-07` am EPIC-VIDEO plant Anwendung und konkreten Prüfschritt bei der nächsten einschlägigen Story. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered. Tatsächliche Ausführung, Privacy-/Publikationsfreigaben und Implementation Verification bleiben offen.
- **BATCH-005 / Planning Coverage:** SRC-1824.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1824.a` → Quellenregel/Beleg: ist als Einleitung allein unvollständig: nach jedem größeren Arbeitsblock, standardmäßig und nur die anschließenden Berichtsfelder. Register [5446–5450](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5446>) bewahrt den Wortlaut, braucht für semantische Coverage aber eine Verknüpfung mit den Feldern, darunter 1825–1828.

## src-1825

- Quelle: `video-production/AGENTS.md:49` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Was wurde gemacht?
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1825.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1825.a` → Quellenregel/Beleg: verlangt im Management Summary die Angabe, was gemacht wurde. Register [5452–5456](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5452>) ist textgetreu; nur zusammen mit dem Reporting-Scope aus 1824 sinnvoll.

## src-1826

- Quelle: `video-production/AGENTS.md:50` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Was wurde gefunden?
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1826.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1826.a` → Quellenregel/Beleg: verlangt die Angabe, was gefunden wurde. Register [5458–5462](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5458>) ist textgetreu; kein Duplikat zu „was gemacht“.

## src-1827

- Quelle: `video-production/AGENTS.md:51` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Wurden Originale verändert? Ja/Nein
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1827.a: Partially Covered; SRC-1827.b: Not Applicable. Implementation Verification: nicht erneut geprüft.
  - `SRC-1827.a` → Quellenregel/Beleg: und
  - `SRC-1827.b` → Quellenregel/Beleg: sind nur gemeinsam sinnvoll: „Wurden Originale verändert? Ja/Nein“. Register [5464–5468](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5464>) ist korrekt; Kandidaten zusammenführen.

## src-1828

- Quelle: `video-production/AGENTS.md:52` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Privacy-Status
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1828.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1828.a` → Quellenregel/Beleg: verlangt den Privacy-Status im Management Summary. Register [5470–5474](<D:/work/_venventure/docs/scrum-migration/constraint-register.md:5470>) ist textgetreu; den tatsächlich belegten Status ausweisen, keine Freigabe aus dem Berichtslabel ableiten.

## src-1829

- Quelle: `video-production/AGENTS.md:53` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Aktueller Produktionsstatus
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1829.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1829.a` → Quellenregel/Beleg: Feld „aktueller Produktionsstatus“, keine eigenständige Story. R muss den Auslöser „nach jedem größeren Arbeitsblock“ und die Management Summary aus dem Originalkontext erhalten.

## src-1830

- Quelle: `video-production/AGENTS.md:54` · VanVenture Video Production – verbindliche Arbeitsregeln / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Nächster sinnvoller Schritt
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1830.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1830.a` → Quellenregel/Beleg: Feld „nächster sinnvoller Schritt“. Gleiche Kontextbedingung in R ergänzen; keine neue Produktionsaufgabe daraus ableiten.

## src-1831

- Quelle: `video-production/AGENTS.md:58` · VanVenture Video Production – verbindliche Arbeitsregeln / Entscheidungen benötigt
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Nur tatsächliche Entscheidungen von Helmut.
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1831.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1831.a` → Quellenregel/Beleg: Nur tatsächliche Entscheidungen von Helmut in den Entscheidungsabschnitt aufnehmen. Rolle und Filter in R ausdrücklich erhalten.

## src-1832

- Quelle: `video-production/AGENTS.md:60` · VanVenture Video Production – verbindliche Arbeitsregeln / Entscheidungen benötigt
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: Keine langen technischen Berichte ausgeben, solange Helmut sie nicht ausdrücklich anfordert.
- **COVERAGE-R1-045:** AC-COVR1-044-07 am EPIC-VIDEO deckt dieses Berichtsfeld im Zusammenhang mit `SRC-1824.a` und der Management Summary nach jedem größeren Arbeitsblock. Der konkrete Blockbericht ist auf ausgefülltes Feld und belegten Status zu prüfen; keine rückwirkende Ausführung, Original-/Privacy-Freigabe oder Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1832.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1832.a` → Quellenregel/Beleg: Verbot langer technischer Berichte mit der Ausnahme „wenn Helmut sie ausdrücklich anfordert“ in R erhalten.

## src-1833

- Quelle: `video-production/README.md:5` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Das gemeinsame Repository bleibt `reflexible/vanventure`.
- **COVERAGE-R1-045:** Diese README-Angabe bestätigt `SRC-1797.a` und das Repository-Gate in COVERAGE-R1-042 am EPIC-VIDEO; sie schafft kein zweites unabhängiges Gate. Konkreter Repository-/Pfad- und Freigabebeleg erst in der nächsten einschlägigen Story; keine Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1833.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1833.a` → Quellenregel/Beleg: Repository-Angabe korrekt, aber wiederholt die Video-Arbeitsregel. R als Bestätigung derselben Regel markieren; kein zweites unabhängiges Gate.

## src-1834

- Quelle: `video-production/README.md:6` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Videoarbeit findet grundsätzlich unter `video-production/` statt.
- **COVERAGE-R1-045:** Diese README-Angabe bestätigt `SRC-1797.a` und die Pfadgrenze samt enger aufgabenspezifischer Ausnahme nach `SRC-1798.a` in COVERAGE-R1-042 am EPIC-VIDEO; sie schafft kein zweites unabhängiges Gate. Konkreter Repository-/Pfad- und Freigabebeleg erst in der nächsten einschlägigen Story; keine Implementation Verification. Die BATCH-005-Einstufung unten ist historisch; aktuelle Planning Coverage: Covered.
- **BATCH-005 / Planning Coverage:** SRC-1834.a: Partially Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-1834.a` → Quellenregel/Beleg: „Grundsätzlich unter video-production/“ ist eine Zusammenfassung. R muss die konkrete Ausnahme einer ausdrücklichen Aufgabenfreigabe für Dateien außerhalb dieses Bereichs beachten.

## src-1835

- Quelle: `video-production/README.md:7` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Website und Cockpit werden nicht verändert.
- **BATCH-005 / Planning Coverage:** SRC-1835.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1835.a` → Quellenregel/Beleg: Verbot betrifft Videoarbeit; es darf nicht als allgemeines Verbot beauftragter Website- oder Cockpit-Arbeit gelesen werden. R mit diesem Scope und der ausdrücklichen Freigabeausnahme präzisieren.

- **Planungsnachweis:** COVERAGE-R1-042 + COVERAGE-R1-046 Scope-Gate in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1836

- Quelle: `video-production/README.md:8` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Originalmedien werden niemals verändert.
- **BATCH-005 / Planning Coverage:** SRC-1836.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1836.a` → Quellenregel/Beleg: Originalmedien dürfen nicht verändert werden. R soll den Schutz als fortgeltende Regel führen, nicht als Nachweis, dass bei v18 tatsächlich nichts verändert wurde.

- **Planungsnachweis:** AC-COVR1-046-01 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1837

- Quelle: `video-production/README.md:9` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Bestehende alte Resolve-Projekte werden nicht verändert, wenn daraus neu weitergearbeitet wird.
- **BATCH-005 / Planning Coverage:** SRC-1837.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1837.a` → Quellenregel/Beleg: Bedingung „wenn daraus neu weitergearbeitet wird“ gehört zur Regel. R muss alte Resolve-Projekte und neue Arbeitskopien auseinanderhalten.

- **Planungsnachweis:** AC-COVR1-046-01 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1838

- Quelle: `video-production/README.md:10` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Ein neues Resolve-Projekt entsteht nur bewusst, wenn aus einem Altprojekt ein neues Werk wird.
- **BATCH-005 / Planning Coverage:** SRC-1838.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1838.a` → Quellenregel/Beleg: Die README-Kurzfassung nennt nur ein bewusst neues Werk. Die ausführliche Video-Arbeitsregel lässt zusätzlich eine notwendige technische Trennung zu. R darf diese Ausnahme nicht durch die Kurzfassung streichen; beide Quellen konsistent zuordnen.

- **Planungsnachweis:** AC-COVR1-046-02 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1839

- Quelle: `video-production/README.md:11` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Innerhalb eines aktiven Produktionsprojekts werden bevorzugt Timelines verwendet statt fortlaufend neue Resolve-Projekte anzulegen.
- **BATCH-005 / Planning Coverage:** SRC-1839.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1839.a` → Quellenregel/Beleg: Timelines sind eine Präferenz innerhalb eines aktiven Produktionsprojekts, kein absolutes Verbot neuer Projekte. R so kennzeichnen.

- **Planungsnachweis:** AC-COVR1-046-02 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1840

- Quelle: `video-production/README.md:12` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Originalmaterial hat Vorrang vor YouTube-Downloads.
- **BATCH-005 / Planning Coverage:** SRC-1840.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1840.a` → Quellenregel/Beleg: Vorrang des Originalmaterials vor YouTube-Downloads korrekt; es ist eine Auswahlregel, keine Behauptung, dass bei v18 ausschließlich Originaldateien verwendet wurden.

- **Planungsnachweis:** AC-COVR1-046-03 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1841

- Quelle: `video-production/README.md:13` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Es gilt Archive-first: Vorhandenes Material wird zuerst geprüft und bevorzugt wiederverwendet.
- **BATCH-005 / Planning Coverage:** SRC-1841.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1841.a` → Quellenregel/Beleg: Enthält zwei prüfbare Schritte: vorhandenes Material zuerst prüfen und geeignetes Material bevorzugt wiederverwenden. In R getrennt nachweisbar machen; „vorhanden“ allein bedeutet nicht automatisch „geeignet“.

- **Planungsnachweis:** AC-COVR1-046-03 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1842

- Quelle: `video-production/README.md:14` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Adrians Privacy ist zwingend.
- **BATCH-005 / Planning Coverage:** SRC-1842.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1842.a` → Quellenregel/Beleg: „Adrians Privacy“ ist zu knapp für ein eigenständiges Abnahmekriterium. R auf die konkreten Video-Privacy-Regeln beziehen; keine pauschale Privacy-Freigabe anderer Personen oder Fassungen daraus ableiten.

- **Planungsnachweis:** AC-COVR1-046-04 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1843

- Quelle: `video-production/README.md:15` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Es gibt keine automatische Veröffentlichung.
- **BATCH-005 / Planning Coverage:** SRC-1843.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1843.a` → Quellenregel/Beleg: Keine automatische Veröffentlichung. R mit der ausdrücklichen Freigabe des jeweiligen Release-Umfangs aus [release-decisions.md](/D:/work/_venventure/docs/scrum-migration/release-decisions.md:8) verbinden; die historische v18-Freigabe gilt nicht für spätere Releases.

- **Planungsnachweis:** AC-COVR1-046-05 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-1844

- Quelle: `video-production/README.md:16` · VanVenture Video Production / Management Summary
- Anwendung: fortgeltende Quellenregel / historischer Beleg; künftige einschlägige Story
- Verbindlicher Originalwortlaut: - Nach Arbeitsblöcken werden Helmut nur diese Management Summary und notwendige Entscheidungen ausgegeben.
- **BATCH-005 / Planning Coverage:** SRC-1844.a: Covered (COVERAGE-R1-046). Implementation Verification: nicht erneut geprüft.
  - `SRC-1844.a` → Quellenregel/Beleg: Kombiniert Zeitpunkt, Empfänger und zwei Ausgabearten. R muss „nach Arbeitsblöcken“, „an Helmut“, Management Summary und nur notwendige Entscheidungen erhalten; die ausdrückliche Anforderung eines längeren Berichts bleibt möglich.

- **Planungsnachweis:** AC-COVR1-046-06 in `scrum-plan.md` am EPIC-VIDEO; bei der nächsten einschlägigen Video-Story mit konkretem Prüfschritt und Beleg anzuwenden. Keine rückwirkende Implementierungs-, Privacy- oder Veröffentlichungsfreigabe.

## src-2350

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:8` · Outdoor Editorial Photo
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: Use this skill for photo edits intended for the VanVenture website.
- **BATCH-005 / Planning Coverage:** SRC-2350.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2350.a` → ST-PHOTO-01: S · Teil constraint-register:5572–5576 bewahrt den Skill; ST-PHOTO-01:121/123 verweist nur auf den anderen, in AGENTS.md verbindlich genannten Bild-Skill. Geltung von *outdoor-editorial-photo* für VanVenture-Fotobearbeitung ausdrücklich den betroffenen Foto-Stories zuordnen; keine Gleichsetzung beider Skills unterstellen.

## src-2351

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:12` · Outdoor Editorial Photo / Preserve the documentary original
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Edit an existing photo; never regenerate its scene.
- **BATCH-005 / Planning Coverage:** SRC-2351.a: Covered; SRC-2351.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2351.a` → ST-PHOTO-02: S · Teil „Vorhandenes Foto bearbeiten“ ist in ST-PHOTO-02:133 nur indirekt über Dokumentartreue erfasst. Als Eingangsbedingung ergänzen.
  - `SRC-2351.b` → ST-PHOTO-02: S · Teil Keine Szenenregeneration ist durch ST-PHOTO-02:133 sinngemäß gestützt, aber SRC-2351 fehlt unter Ursprung :134. Expliziten Rückverweis ergänzen.

## src-2352

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:13` · Outdoor Editorial Photo / Preserve the documentary original
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Preserve people, faces, body proportions, expression, clothing, equipment, vehicles, animals, landscape, and composition exactly.
- **BATCH-005 / Planning Coverage:** SRC-2352.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2352.a` → ST-PHOTO-02: C · Teil ST-PHOTO-02:133 schützt viele Merkmale, nennt aber Fahrzeuge und Landschaft nicht ausdrücklich; „exakt“ muss zusammen mit den erlaubten Ausnahmen aus SRC-2353 gelesen werden. Merkmalsliste und Ausnahmebezug ergänzen.

## src-2353

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:14` · Outdoor Editorial Photo / Preserve the documentary original
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Do not add, move, replace, crop, reshape, or remove pictured elements, except for approved privacy work or explicitly approved distraction removal.
- **BATCH-005 / Planning Coverage:** SRC-2353.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2353.a` → ST-PHOTO-02: C · Teil Ein Kandidat bündelt sechs Eingriffsverbote und zwei Ausnahmen. ST-PHOTO-02:133 nennt nicht crop und reshape vollständig; Privacy-Ausnahme liegt getrennt in ST-PHOTO-01:121. Für jede Eingriffsart prüfbare Kriterien setzen und beide Ausnahmen eng auf genehmigte Privacy-Arbeit bzw. ausdrücklich genehmigte Störungsentfernung begrenzen.

## src-2354

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:15` · Outdoor Editorial Photo / Preserve the documentary original
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Treat every AI-assisted result as a review derivative. Compare it visually with the unchanged project copy before publication. Do not use it as the sole retained source.
- **BATCH-005 / Planning Coverage:** SRC-2354.a: Covered; SRC-2354.b: Covered; SRC-2354.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2354.a` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt KI-Ergebnis bleibt Prüffassung in ST-PHOTO-02:133. SRC-2354 unter :134 ergänzen; keine neue Story nötig.
  - `SRC-2354.b` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Vergleich mit unveränderter Projektkopie steht in ST-PHOTO-02:133; Rückverweis ergänzen.
  - `SRC-2354.c` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt „Nie einzige erhaltene Fassung“ steht in ST-PHOTO-02:133; Rückverweis ergänzen.

## src-2355

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:19` · Outdoor Editorial Photo / Privacy and source handling
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Archive originals are read-only. First retain an unchanged project copy and record the source path and checksum when an archive original is used.
- **BATCH-005 / Planning Coverage:** SRC-2355.a: Covered; SRC-2355.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2355.a` → ST-PHOTO-01: S · Teil Lesendes Archiv und unveränderte ACL stehen in ST-PHOTO-01:121–122; SRC-2355 fehlt im Ursprung :123. Archiv-Scope und Quellverweis ergänzen.
  - `SRC-2355.b` → ST-PHOTO-01: C · Teil Projektkopie/Pfad/Hash sind in ST-PHOTO-01:121; die Bedingung wenn ein Archivoriginal benutzt wird und die Reihenfolge „zuerst“ sollten erhalten bleiben. Quellverweis ergänzen.

## src-2356

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:20` · Outdoor Editorial Photo / Privacy and source handling
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - VanVenture person rule (user decision, 24 September 2026): Anonymize recognizable children. Anonymize an adult's face only when the user explicitly asks for that particular photo; do not routinely mask adults. Helmut and Sabine may remain recognizable. If age or publication permission is unclear, hold the affected image and ask the user explicitly. This rule is project-local. A still-recognizable child must not be published without explicit selection of that photo.
- **BATCH-005 / Planning Coverage:** SRC-2356.a: Covered; SRC-2356.b: Covered; SRC-2356.c: Covered; SRC-2356.d: Covered; SRC-2356.e: Covered; SRC-2356.f: Covered; SRC-2356.g: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2356.a` → ST-PHOTO-01: S · abgedeckter Inhalt, Trace fehlt Kinderanonymisierung in ST-PHOTO-01:121; SRC-2356 im Ursprung :123 ergänzen.
  - `SRC-2356.b` → ST-PHOTO-01: C · abgedeckter Inhalt, Trace fehlt Motivweise ausdrücklicher Wunsch für Erwachsenengesichter steht in :121; Rückverweis ergänzen.
  - `SRC-2356.c` → ST-PHOTO-01: S · abgedeckter Inhalt, Trace fehlt Verbot vorsorglicher Erwachsenenmaskierung steht in :121; Rückverweis ergänzen.
  - `SRC-2356.d` → ST-PHOTO-01: S · abgedeckter Inhalt, Trace fehlt Helmut und Sabine dürfen sichtbar bleiben (:121); Rückverweis ergänzen.
  - `SRC-2356.e` → ST-PHOTO-01: C · abgedeckter Inhalt, Trace fehlt Bei unklarem Alter oder fehlender Publikationsentscheidung zurückstellen und Nutzer fragen steht in :121. Die beiden Auslöser und Handlungen als prüfbare Bedingung behalten; Rückverweis ergänzen.
  - `SRC-2356.f` → ST-PHOTO-01: S · Teil Projektlokaler Scope steht in SKILL:20, fehlt an constraint-register:5608–5612 als Anwendungsgrenze („projektweit“ ist zu unbestimmt). Auf VanVenture begrenzen, nicht globalisieren.
  - `SRC-2356.g` → ST-PHOTO-01: C · abgedeckter Inhalt, Trace fehlt Veröffentlichungsverbot ohne ausdrückliche Fotoauswahl steht in ST-PHOTO-01:121. Nicht mit bloßer allgemeiner Release-Freigabe gleichsetzen; Rückverweis ergänzen.

## src-2357

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:21` · Outdoor Editorial Photo / Privacy and source handling
- Anwendung: ST-PHOTO-01, ST-PHOTO-03
- Verbindlicher Originalwortlaut: - Anonymize every visible vehicle license plate. Where face masking is specifically authorized, fit the mask closely to identifying facial features with a small safety margin and soft feathered edges. Prefer localized Gaussian blur over coarse blocks. Do not cover hair, clothing, bodies, or background unnecessarily. Verify unreadability at 100% and at every rendered size. Faces turned away with no identifying detail need no mask.
- **BATCH-005 / Planning Coverage:** SRC-2357.a: Covered; SRC-2357.b: Covered; SRC-2357.c: Covered; SRC-2357.d: Covered; SRC-2357.e: Covered; SRC-2357.f: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2357.a` → ST-PHOTO-01, ST-PHOTO-03: S · abgedeckter Inhalt, Trace fehlt Alle sichtbaren Fahrzeugkennzeichen in ST-PHOTO-01:121; Ursprung SRC-2357 fehlt.
  - `SRC-2357.b` → ST-PHOTO-01: C · Teil Enger Gesichtsmaskenbereich, kleiner Rand und weiche Kanten stehen in :121. Die Bedingung nur bei spezifisch autorisierter Gesichtsmaskierung explizit an dieses Kriterium binden; Rückverweis ergänzen.
  - `SRC-2357.c` → ST-PHOTO-01: S · Lücke Bevorzugter lokaler Gaussian Blur gegenüber groben Blöcken fehlt in ST-PHOTO-01:121. Als Präferenz aufnehmen, ohne daraus eine ausnahmslose Technikpflicht zu machen.
  - `SRC-2357.d` → ST-PHOTO-01: S · abgedeckter Inhalt, Trace fehlt Kein unnötiger Überlauf auf Haar, Kleidung, Körper, Hintergrund steht in :121; Rückverweis ergänzen.
  - `SRC-2357.e` → ST-PHOTO-01: C · abgedeckter Inhalt, Trace fehlt Unlesbarkeit bei 100 % und jeder Webgröße steht in :121; beide Maßstäbe erhalten und rückverweisen.
  - `SRC-2357.f` → ST-PHOTO-01: C · abgedeckter Inhalt, Trace fehlt Ausnahme für nicht identifizierende Rückansichten steht in :121; nicht auf identifizierende Seitenansichten erweitern.

## src-2358

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:22` · Outdoor Editorial Photo / Privacy and source handling
- Anwendung: ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Do not publish recognizable children unless the user explicitly selects the photo.
- **BATCH-005 / Planning Coverage:** SRC-2358.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2358.a` → ST-PHOTO-01: C · Duplikat Wortgleiche Veröffentlichungsregel zu 2356.g (SKILL:20/22). Beide Quellen tracebar halten, aber nur eine aktive Fotoauswahl-Bedingung in ST-PHOTO-01:121; kein zweites Gate erzeugen.

## src-2359

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:26` · Outdoor Editorial Photo / Distraction removal requires confirmation
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Identify human-made distractions such as power lines, poles, fences, bins, or barriers.
- **BATCH-005 / Planning Coverage:** SRC-2359.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2359.a` → ST-PHOTO-02: S · Lücke Identifizierung menschengemachter Störungen mit Beispielen steht in SKILL:26, fehlt als vorbereitender Prüfschritt in ST-PHOTO-02:133. Dort bzw. in einem zugehörigen Task verankern; Identifizierung ist noch keine Entfernungsfreigabe.

## src-2360

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:27` · Outdoor Editorial Photo / Distraction removal requires confirmation
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Do not remove them until the user explicitly confirms the exact elements. Keep them unchanged in the first grading pass.
- **BATCH-005 / Planning Coverage:** SRC-2360.a: Covered; SRC-2360.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2360.a` → ST-PHOTO-02: C · Teil ST-PHOTO-02:133 verweist auf bestätigte Störelemente, verlangt aber die Bestätigung der genauen Elemente nicht selbst. Im Kriterium konkretisieren; Rückverweis ergänzen.
  - `SRC-2360.b` → ST-PHOTO-02: S · Lücke „Erster Grading-Durchlauf unverändert“ fehlt in ST-PHOTO-02:133. Als Ablaufkriterium aufnehmen.

## src-2361

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:28` · Outdoor Editorial Photo / Distraction removal requires confirmation
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - After confirmation, remove only the named elements in a local project derivative. Inspect repaired pixels at 100% for seams, repeated patterns, or collateral scene changes; keep adjacent structures and objects unless separately approved.
- **BATCH-005 / Planning Coverage:** SRC-2361.a: Covered; SRC-2361.b: Covered; SRC-2361.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2361.a` → ST-PHOTO-02: C · Teil ST-PHOTO-02:133 enthält die Ausnahme, nicht ausdrücklich nur benannte Elemente und lokales Projektderivat nach Bestätigung. Beides ergänzen.
  - `SRC-2361.b` → ST-PHOTO-02: C · Lücke 100 %-Prüfung wird in :133 allgemein für Ableitungen genannt; Nahtstellen, Wiederholungsmuster und benachbarte Szenenänderungen der reparierten Pixel fehlen. Spezifisches Reparaturkriterium ergänzen.
  - `SRC-2361.c` → ST-PHOTO-02: C · Lücke Benachbarte Strukturen/Objekte ohne gesonderte Zustimmung erhalten ist nicht ausdrücklich in :133. Ergänzen; keine Zustimmung für Nachbarobjekte aus der ursprünglichen Bestätigung ableiten.

## src-2362

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:32` · Outdoor Editorial Photo / Print-magazine grade
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Use natural, earthy color. Keep greens moody but plausible; slightly desaturate sky/water blues; subtly support warm browns and oranges.
- **BATCH-005 / Planning Coverage:** SRC-2362.a: Covered; SRC-2362.b: Covered; SRC-2362.c: Covered; SRC-2362.d: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2362.a` → ST-PHOTO-02: S · Teil ST-PHOTO-02:133 sagt natürlich, aber nicht erdige Farbgebung. Stilziel aufnehmen oder präzise bestehende gleichwertige Formulierung nachweisen.
  - `SRC-2362.b` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Gedämpfte, plausible Grüntöne in :133; SRC-2362 unter :134 ergänzen.
  - `SRC-2362.c` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Leicht reduzierte Himmel-/Wasserblautöne in :133; Rückverweis ergänzen.
  - `SRC-2362.d` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Subtile warme Braun-/Orangetöne sind als „subtile warme Töne“ verkürzt. Braun/Orange bei :133 präzisieren und rückverweisen.

## src-2363

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:33` · Outdoor Editorial Photo / Print-magazine grade
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Apply controlled filmic contrast and a gently raised, matte black point. Preserve realistic highlight and shadow detail.
- **BATCH-005 / Planning Coverage:** SRC-2363.a: Covered; SRC-2363.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2363.a` → ST-PHOTO-02: C · abgedeckter Inhalt, Trace fehlt Kontrollierter filmischer Kontrast und sanft angehobenes Schwarz in :133; matte Wirkung und SRC-2363 nachvollziehbar ergänzen.
  - `SRC-2363.b` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Plausible Lichter/Schatten in :133; Rückverweis ergänzen.

## src-2364

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:34` · Outdoor Editorial Photo / Print-magazine grade
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Preserve real skin texture and midday/daylight character. Avoid beauty retouching, HDR, artificial bokeh, dramatic relighting, oversaturation, or invented golden-hour light.
- **BATCH-005 / Planning Coverage:** SRC-2364.a: Covered; SRC-2364.b: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2364.a` → ST-PHOTO-02: C · Teil Hautstruktur und Tageslicht stehen in :133; das Original nennt auch Mittagslicht, sofern im Motiv vorhanden. Nicht in erfundenes anderes Licht umdeuten; rückverweisen.
  - `SRC-2364.b` → ST-PHOTO-02: C · Teil Verbotsliste ist mehrfach prüfbar. ST-PHOTO-02:133 enthält Beauty, HDR, Bokeh, Übersättigung, Golden Hour, aber dramatische Neubeleuchtung nicht ausdrücklich. Ergänzen; einzelne Verbote bei der Variantenabnahme prüfbar halten.

## src-2365

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:35` · Outdoor Editorial Photo / Print-magazine grade
- Anwendung: ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Tune the grade to the individual photograph; do not apply fixed numeric settings indiscriminately. Keep greens moody but plausible, slightly desaturate sky/water blues, and subtly support warm browns/oranges without changing the scene's natural daylight character.
- **BATCH-005 / Planning Coverage:** SRC-2365.a: Covered; SRC-2365.b: Covered; SRC-2365.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2365.a` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Motivweises Grading in ST-PHOTO-02:133; Rückverweis ergänzen.
  - `SRC-2365.b` → ST-PHOTO-02: S · abgedeckter Inhalt, Trace fehlt Keine pauschalen festen Werte in :133; Rückverweis ergänzen.
  - `SRC-2365.c` → ST-PHOTO-02: C · Duplikat mit Zusatz Wiederholt 2362.b–d und ergänzt den Erhalt des natürlichen Tageslichtcharakters, der in :133 steht. Ein gemeinsames Kriterium mit beiden Quellen führen; keine konkurrierenden Farbregeln.

## src-2366

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:39` · Outdoor Editorial Photo / Delivery
- Anwendung: ST-PHOTO-01, ST-PHOTO-02
- Verbindlicher Originalwortlaut: - Save derivatives alongside the relevant project assets without overwriting the unchanged source.
- **BATCH-005 / Planning Coverage:** SRC-2366.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2366.a` → ST-PHOTO-01, ST-PHOTO-02: C · Teil Nichtüberschreiben der unveränderten Kopie steht in ST-PHOTO-01:122; Ablage neben relevanten Projektassets fehlt. Diesen Speicherort zu einem Task/AC der Bildableitung zuordnen; SRC-2366 rückverweisen.

## src-2367

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:40` · Outdoor Editorial Photo / Delivery
- Anwendung: ST-PHOTO-01, ST-PHOTO-02, ST-PHOTO-03
- Verbindlicher Originalwortlaut: - Before publishing, confirm the visual result respects the original and that all plates are anonymized.
- **BATCH-005 / Planning Coverage:** SRC-2367.a: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2367.a` → ST-PHOTO-01, ST-PHOTO-02, ST-PHOTO-03: C · Teil Originaltreue in ST-PHOTO-02:133 und Kennzeichen in ST-PHOTO-01:121, aber das gemeinsame Vor-Veröffentlichung-Gate fehlt. Beide Prüfbelege vor Freigabe derselben Variante verknüpfen.

## src-2368

- Quelle: `.codex/skills/outdoor-editorial-photo/SKILL.md:41` · Outdoor Editorial Photo / Delivery
- Anwendung: ST-PHOTO-02, ST-PHOTO-01
- Verbindlicher Originalwortlaut: - Compare privacy masks and any distraction repair against the unchanged project copy at full resolution; retain the source hash, derivative hash, exact operation notes, and review status. AI-assisted derivatives remain review-only until explicitly approved.

## dec-rel-001

- Entscheidung: `DEC-REL-001` in `release-decisions.md`.
- Gültige Regel: Jede Veröffentlichung und jedes Deployment erfordert ausdrückliche Nutzerfreigabe für den jeweiligen Release-Umfang.
- Historische Klauseln: `SRC-0051.b` und `SRC-0068.a`; Originalwortlaut bleibt unter `src-0051` und `src-0068` erhalten, abweichender Mehrwortlaut ist ausdrücklich abgelöst.

## dec-rel-002

- Entscheidung: `DEC-REL-002` in `release-decisions.md`.
- Gültige Regel: Test, Audit und Planabschluss sind keine Veröffentlichungsfreigabe.

## dec-rel-003

- Entscheidung: `DEC-REL-003` in `release-decisions.md`.
- Gültige Regel: Local-first; keine direkte Live-Bearbeitung. Deployment erst nach separater Freigabe nach `DEC-REL-001`.
- Historische Klausel: `SRC-0052.d`; ihre direkte Live-Erlaubnis ist ausdrücklich abgelöst. Die anderen Klauseln von `SRC-0052` bleiben einzeln prüfbar.
- **BATCH-005 / Planning Coverage:** SRC-2368.a: Covered; SRC-2368.b: Covered; SRC-2368.c: Covered. Implementation Verification: nicht erneut geprüft.
  - `SRC-2368.a` → ST-PHOTO-02: C · Teil Vorher/Nachher und 100 % in ST-PHOTO-02:133, doch Privacy-Masken und jede Störungsreparatur gegen die unveränderte Projektkopie bei voller Auflösung fehlen als spezifischer Vergleich. Ergänzen.
  - `SRC-2368.b` → ST-PHOTO-01, ST-PHOTO-02: C · Teil Quell-/Webhashes in ST-PHOTO-01:121; Derivathash, genaue Operationen und Reviewstatus gemeinsam je Ableitung fehlen. In Bildregister/Task-Nachweis konkretisieren und SRC-2368 rückverweisen.
  - `SRC-2368.c` → ST-PHOTO-02: C · Duplikat Inhaltlich bereits 2354.a und ST-PHOTO-02:133: KI-Ableitung bleibt bis ausdrücklicher Freigabe Prüffassung. Beide Quellen derselben Bedingung zuordnen; keine Freigabe aus bloßer visueller Prüfung ableiten.

## src-0460

- Quelle: `docs/ausbauplan.md:500` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0460,ST-WEB-02#Acceptance-Criteria,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Die verbindliche technische Spezifikation für zentrale responsive Komponenten sowie Kajak-/Aktivitäts-, Fahrzeug- und Reisebericht-Templates steht in [`responsive-templates.md`](responsive-templates.md); Prüf-, Originalschutz-, Freigabe- und Abnahmepflichten ergänzt der [konsolidierte Gesamtauftrag](vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md). **Dokumentiert und im Projekt verankert am 23. September 2026; nur teilweise technisch implementiert, nicht vollständig geprüft oder live ausgerollt.** Vor Beginn sind die aktuelle Kajak-Seite als Gestaltungsreferenz und die eigenständige Startseite in Desktop-, Tablet- und Mobilansicht als Vergleichsbasis zu sichern. Der zugehörige Dokumentations-Abnahmebericht ersetzt weder diese Referenzsicherung noch eine Bild- oder Live-Prüfung.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0461

- Quelle: `docs/ausbauplan.md:511` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: ST-WEB-02#Acceptance-Criteria,ST-WEB-04#Acceptance-Criteria,ST-WEB-05#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Gemeinsame Komponenten und zentrale responsive Regeln aus der bestehenden Architektur ableiten, die Kajak-Seite selbst auf das Aktivitäts-Template migrieren und anschließend Fahrzeugseiten, Reiseberichte sowie passende weitere Unterseiten ohne Inhalts- oder Funktionsverlust umstellen. Die Startseite bleibt ausdrücklich eigenständig.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0462

- Quelle: `docs/ausbauplan.md:516` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0462,ST-WEB-01#Acceptance-Criteria,ST-WEB-02#Acceptance-Criteria,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] **Korrekturstand 23. September 2026:** Die öffentliche Navigation wird aus `navigation.js` zentral erzeugt und von allen 13 erfassten Routen bezogen; Scott ist dabei ein bestehender vollständiger Bericht, nur vier Radprofile sind noch `noindex` und „in Vorbereitung“. Acht Galerieseiten verwenden das gemeinsame Raster und den Viewer. Der lokale Browser-Smoke-Test umfasst 91 Seiten-/Größen-Kombinationen; die automatisierte Suite ist bestanden. Die vollständige Bildprovenienz und -freigabe, Template-Trennung, vollständige visuelle Abnahme und der neue Live-Rollout bleiben offen. Maßgeblich ist der [aktuelle Bestands- und Abnahmebericht](abnahmeberichte/rework-bestandspruefung-2026-09-23.md); der [erste Teilbericht](abnahmeberichte/rework-teilstand-2026-09-23.md) ist nur ein historischer Zwischenstand.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0463

- Quelle: `docs/ausbauplan.md:527` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0463,ST-WEB-02#Acceptance-Criteria,ST-PHOTO-01#Acceptance-Criteria,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Die historische [aktualisierte Übergabefassung](vanventure-gesamtauftrag-aktualisiert.md) ist hinsichtlich Galerie-Standard und fortlaufender Anforderungspflege in die bestehenden maßgeblichen Spezifikationen übernommen. Der Produktionsstand auf Marvin enthält neuere Bike-Seiten und Webbilder als der GitHub-Stand `500421e`; diese Inhalte werden vor jeder Veröffentlichung verlustfrei in den Arbeitsbranch integriert und auf Herkunft/Freigaben geprüft. Die Übergabefassung ändert keine Gestaltungsregel; die bereits produktive Radserie und ihr freigegebener Galerie-Rasterstand werden aus dem neueren Live-Design-Guide übernommen.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0464

- Quelle: `docs/ausbauplan.md:536` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0464,ST-PHOTO-01#Acceptance-Criteria,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Die lesende Bildinventur fand nach der Kajak-Korrektur 84 eingebundene Webvarianten, alle vorhanden, davon nun 76 mit Bilddatensatz einschließlich des lokalen Staging-Manifests. Acht Zuordnungen und die daraus folgenden Freigabeprüfungen sind offen; der strenge Bildlauf sperrt den Release. Die Chat-Recherche belegt einzelne Kajak-, Reise- und Ausrüstungs-Entscheidungen, aber noch keine durchgängige Zuordnung aller Webableitungen. `kajak-06.jpg` („Gemeinsam am Fluss“) wurde gemäß der ausdrücklichen Entfernungsanweisung lokal aus der Galerie entfernt und die Inhaltsprüfung angepasst; die verbleibenden 13 Kacheln sind noch nicht als Gruppe neu abgenommen. Die pauschale frühere Angabe von 14 freigegebenen Bildern ist keine aktuelle Einzel-Freigabe. Für 13 Reisebilder wurden unveränderte Projektkopien aus dem Archiv gesichert und per SHA-256 geprüft; sechs weitere Reisebilder haben noch keinen eindeutigen Archivtreffer. Fünf Scott-Motive wurden zusätzlich nahezu identisch im Handyfoto-Archiv gefunden und mit unveränderten Projektkopien belegt. Am 24. September wurden acht weitere Scott-Webvarianten Motiv und Projektkopie zugeordnet: vier zusätzlich mit geprüftem Archiv-Hash, vier ohne gesicherte Archivherkunft. Zwei Scott-Reise-2026-Varianten bleiben offen. Vier bisher im Asset-Bereich abgelegte Hero-Originalkopien wurden lokal prüfsummengleich in den nicht öffentlichen Review-Bereich verschoben; der Webserver blockiert den früheren Pfad und weitere Review-Pfade mit bestandenen HTTP-Tests. Das ist noch nicht live; die frühere Server-Auslieferbarkeit bleibt im Abnahmebericht dokumentiert; die Dateien waren laut Git-Prüfung nicht Teil der Repository-Historie. Die Quellenliste wurde unter `docs/hero-bildquellen.json` gesichert. Eine fehlende Scott-Projektkopie wurde unverändert aus dem Archiv gesichert und per SHA-256 vor/nach geprüft. Bis zur nachgewiesenen Freigabe der übrigen Varianten wird kein neuer Stand veröffentlicht. Ein lokales, nummeriertes Kontaktblatt der ursprünglich 16 offenen Webvarianten liegt unter `review/missing-image-contact-sheet-2026-09-24.jpg`; die vollständige Zuordnungsliste und die negativen Archivsuch-Ergebnisse stehen im Abnahmebericht. Für die letzten acht Varianten wurde am 24. September ein eigenes Kontaktblatt erstellt: `review/missing-image-contact-sheet-rest-8-2026-09-24.jpg`. Die Nutzerlinks identifizieren jetzt die Quellenmotive für beide Scott-Reise-2026-Varianten und sechs Reisebilder. Für fünf Reisevarianten liegen passende, unveränderte Projektkandidaten vor; der lesende 64×64-Graustufenvergleich zur jeweiligen Webdatei liegt zwischen 0,9350 und 0,9950. `rote-felskueste` passt mit 0,9965 und übereinstimmenden EXIF- Angaben. Die Links und Projektkopie-/Web-Hashes sind in den beiden Bildquellenregistern erfasst. Die nähere Scott-Webfassung lässt sich vorläufig einem der beiden nahen Google-Fotos-Frames zuordnen; der genaue Frame bleibt offen. Die weiter entfernte Scott-Webfassung passt vorläufig zum 13:38:24-Frame. Bei allen acht fehlen Google-Originalbytes zum Byteabgleich; der normale Download wurde von Chrome mit `ERR_BLOCKED_BY_CLIENT` gesperrt und nicht umgangen. Die Trulli-Webdatei entfernt sichtbar Personen und verändert Bildelemente; ihre Dokumentartreue ist nicht bestanden. Der Audit zählt 84/84 Registereinträge, keine Web-/Projektkopie-Hashabweichung und acht offene Quellkopie-Prüfungen. Die neun Originaldownloads werden ohne Überschreiben in `review/selected-originals/google-photos-incoming/` benötigt. Kein Bildfreigabe- oder Release-Go. Ergänzung 24.09.2026: Die unveränderte Projektkopie `reisebilder-originale/italien-2021/DSC_0063.JPG` wurde lokal als neue, nicht veröffentlichte Prüfvorschau verarbeitet: `review/privacy-previews/trulli-editorial-review-v11.jpg`. V5 und V8 wurden wegen sichtbarer Leitungsreste beziehungsweise weiterhin kippender, nach rechts ansteigender Bildhälfte und zu schwacher Farbkorrektur verworfen. V11 enthält eine randgebundene lokale Perspektiv- und Niveaukorrektur der rechten Bildhälfte, die bestätigte Leitungsretusche bis zum Mast, eng gesetzte weiche Gesichts-/Kennzeichenunschärfe und eine deutlichere, wolkenschonende Outdoor-Editorial-Farbgebung. Die Projektkopie blieb SHA-256-identisch. Die Vorschau wurde vom Nutzer am 24.09.2026 mit „viel besser! das nehmen wir“ für dieses Trulli-Motiv abgenommen. Die versionierte Webableitung `assets/reisen/italien-2021/alberobello-trulli-v11.jpg` (2560×1440, SHA-256 `cc4cb7201b2aeb9343a9059c2b70f0a2e3dfde5eedfc5119098e5b6715567167`) ist lokal erstellt und in `italien-2021.html`, `travel-stories.json` und dem Bildregister referenziert; das alte, personenentfernende PNG ist lokal nicht mehr eingebunden. Der strenge Bildlauf (84/84 referenzierte Varianten, keine offenen Quellzuordnungen), 25/25 Projekttests und der Planabgleich bestehen. **Nicht veröffentlicht / nicht live geprüft:** Der lokale Voll-Release-Check scheitert am nicht erreichbaren Docker-Dienst; der Arbeitsbranch enthält viele weitere ungesicherte Änderungen, die nicht ungeprüft in einen Release-Commit übernommen werden dürfen. Die genauen Maskierungs- und Sichtprüfregeln wurden in `AGENTS.md`, dem VanVenture-Fotoskill und dem konsolidierten Gesamtauftrag präzisiert.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.
- COVERAGE-R1-001 / zeitliche Auflösung: Die sechs Reise-Downloads und drei Scott-Originaldownloads aus SRC-0512 liegen nach dem älteren 76/84-Stand vor. Die sechs Reise-Dateien wurden dort hashgleich zu unveränderten Projektkopien dokumentiert; Scotts breite Galerie wurde Frame `133850`, das hohe Bild `133853` zugeordnet. Die alte Anforderung nach neun Downloads und dem genauen Frame ist deshalb kein neuer Downloadauftrag. Aktuelle Bearbeitungskette, Kennzeichenschutz der nahen Scott-Aufnahme, motivweise Freigabe, Abnahme der 13 Kajak-Kacheln und konkreter Release bleiben offen. Die 84/84-Referenzprüfung ist keine Bildfreigabe.

- COVERAGE-R1-048: SRC-0464.f ist im ST-PHOTO-01-AC geplant, aber die Gruppenabnahme der 13 Kacheln fehlt als Evidenz. Die spätere Entscheidung zu aktuellen Kinderbildern bleibt zusätzlich motivgebunden. Keine Veröffentlichungsfreigabe aus 84/84 oder früheren 14 Bildern ableiten.

## src-0465

- Quelle: `docs/ausbauplan.md:612` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0465,ST-PHOTO-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] **Fahrzeugbilder, Herkunft präzisiert am 23./24. September 2026:** Der ältere VanVenture-Chat benennt drei Google-Fotos-Aufnahmen vom 10./11.06.2025. Alle drei wurden lesend in Google Fotos gefunden und als Ausgangsmotive der vier heutigen Fahrzeug-Webdateien visuell erkannt. Der Chat enthält eine damalige Freigabe der bereinigten Fassungen, aber auch die Beanstandung eines KI-bedingt falschen Fahrzeugteils und weitere Fassungswechsel. Aktuelle Originaltreue und Einzelvarianten-Freigabe sind dadurch nicht belegt.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0466

- Quelle: `docs/ausbauplan.md:620` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0466,ST-PHOTO-03#Acceptance-Criteria,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: **Nachtrag 24. September 2026 – Schiebetür/Hinterrad:** Die Nutzerbeanstandung an `vehicle-side-camp-v2.png` ist als konkrete, ausdrücklich beauftragte Bildkorrektur aufgenommen. Die neue, versionierte lokale Webableitung `assets/vehicle/vehicle-side-camp-v3.png` stellt die geöffnete Schiebetür mit plausibler Überlagerung des Hinterrads dar; `vehicle-side-dog.png` war die vom Nutzer benannte Konstruktionsreferenz. Die unveränderte Projektkopie `review/selected-originals/vehicle/20250610_124826.jpg` bleibt erhalten. Der Nutzer hat V3 anschließend als richtig bestätigt und für die Website freigegeben. V3 ist lokal in `vehicle.html` eingebunden und visuell geprüft; sie ist noch nicht committed, gepusht, veröffentlicht oder live verifiziert. Details und Prüfsummen stehen im Abnahmebericht `docs/abnahmeberichte/fahrzeug-schiebetuer-korrektur-2026-09-24.md` sowie in `docs/vehicle-bildquellen.json`. Der Design-Guide bleibt inhaltlich unverändert. Chrome sperrte den automatischen Originaldownload mit `ERR_BLOCKED_BY_CLIENT`; die Sperre wurde nicht umgangen. Der Nutzer legte anschließend drei unveränderte Originaldateien im geschützten Projektbereich ab. Ihre lokalen SHA-256-Werte, die vier Webdatei-Hashes, die Motivzuordnung und der offene Freigabestatus stehen jetzt in `docs/vehicle-bildquellen.json`. Der lesende Audit bestätigt alle vier Projektkopie- und Webdatei-Hashes; der damalige Zwischenstand war **68/84** mit **16** Lücken. Der aktuelle Stand nach Scott-Nachtrag ist **76/84** mit **acht** Lücken. Der Vergleich beweist keine Bytegleichheit mit Google Fotos und keine Freigabe der KI-Änderungen; historische Exportparameter und die finale Einzelbildabnahme fehlen. Kein neuer Release dieser Bilder. Ein erster eng begrenzter KI-Entwurf zur Hintergrundbereinigung wurde als Review-Derivat abgelehnt, weil er Fahrzeugdetails neu interpretierte; keine öffentliche Webdatei wurde ersetzt. Nächster Bildschritt: Ein nicht-generatives lokales Prüfderivat der Frontaufnahme anonymisiert nun vier sichtbare Kennzeichen; der Quell-Hash ist vor/nach identisch. Es ist weder eingebunden noch veröffentlicht. Für die zwei Seitenfotos erfordert das vollständige Entfernen der unmittelbar hinter dem Van sichtbaren Caravans eine erfundene Hintergrundszene. Bis zur Auswahl passender Alternativ-Originale oder einer ausdrücklichen Entscheidung für die reale Campingplatzszene bleiben diese Varianten gesperrt.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.
- COVERAGE-R1-001 / spätere Entscheidung: SRC-0660 erlaubt ausschließlich vier namentlich genannte bestehende Fahrzeugfassungen in ihrer damaligen Fassung. Die ältere pauschale Sperre der zwei Seitenbilder aus diesem Quellblock wird für genau diese Fassungen nicht weitergeführt. `vehicle-side-camp-v3.png` hat eine eigene, motivgebundene Freigabe. Neue Fassungen, sonstige Motive, Datenschutzprüfung und ein Release benötigen getrennte Nachweise. Fehlende historische Exportparameter dürfen nicht als erfundene Parameter ergänzt werden.

- COVERAGE-R1-048: SRC-0466.s verlangt je übriger aktueller Variante belegte Export-/Bearbeitungskette und finale Einzelbildabnahme. Historische Exportparameter bleiben fehlender Beleg, sofern echte Aufzeichnungen fehlen; keine Werte rekonstruieren durch Vermutung. SRC-0660 und V3-Freigabe gelten nur in ihrem dokumentierten Umfang.

## src-0467

- Quelle: `docs/ausbauplan.md:656` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0467,ST-SEO-01#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Die Startseiten-SEO-Variante `assets/hero-norway.jpg` hatte sichtbare Bildstörungen im unteren Bereich. Die unveränderte Archivquelle wurde gesichert und geprüft, das defekte JPEG lokal bewahrt und durch eine technische Ableitung der Projektkopie ersetzt. Die sichtbare WebP-Variante blieb unverändert. Lokale Sicht- und Hashprüfung bestanden; Open-Graph- Einbindung und Auslieferung sind noch nicht live geprüft.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0468

- Quelle: `docs/ausbauplan.md:662` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0468,ST-PHOTO-01#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] **Originalschutz-Entscheidung 23. September 2026:** Nur projektisoliert arbeiten; die Windows-ACL des gemeinsam genutzten Archivs nicht ändern. Die Staging-Skripte verweigern jetzt das Überschreiben vorhandener unveränderter Projektkopien und gleichen Quell-/Kopie-Hashes ab. Ein Projektkopie-Lauf für 13 Reisebilder ist erfolgt; die vollständige Bildverarbeitungsprüfung und der Abgleich der vorhandenen Chats/Projektbelege mit den veröffentlichten Bildvarianten bleiben offen. Ein gesondertes, vom Nutzer bereitzustellendes „Bildregister“ wird nicht vorausgesetzt.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## src-0469

- Quelle: `docs/ausbauplan.md:670` · VanVenture – verbindlicher Gesamtplan / Nächste verbindliche Schritte / 1C. Zentrale responsive Unterseiten-Templates umsetzen
- Anwendung: constraint-register.md#src-0469,ST-WEB-03#Acceptance-Criteria
- Verbindlicher Originalwortlaut: - [ ] Die Abnahmekriterien der Spezifikation nachvollziehbar erfüllen: zentrale Änderungswirkung sowie visuelle und funktionale Prüfungen bei 360, 390, 768, 1024 und 1440 CSS-Pixeln. Erst danach einen Live-Rollout nach den Betriebsregeln durchführen und getrennt dokumentieren.
- PKG-014-Lesart: Datierte Bestandsaussagen sind keine aktuelle Implementierungs- oder Live-Abnahme; offene Prüfungen und ausdrückliche Entscheidungen bleiben offen.

## pkg-018

- Originalquelle: `docs/ausbauplan.md`, SHA-256 `842d6dd2b33f285e6767214538f968a487c4c6f4fbe2da22d03620a99ed1fd65`, SRC-0500–SRC-0509. Planung und historische lokale Aussagen sind keine Implementierungs- oder Live-Prüfung.
- SRC-0504: Galerievorschau mit transparenter Caption, 27/25-px-Lupen und SVG-Pfeilen ist nicht vom Nutzer abgenommen; keine neue bindende Guide-Regel. Die genehmigte Navigationsänderung und der kleine Lupenhinweis aus SRC-0508 sind getrennte Entscheidungen.
- SRC-0504/0505/0508: Frühere erreichbare Equipment-/Bike-Übersichtsseiten und acht Galerien sind historische Stände; `ausbauplan.md:1104–1112` dokumentiert jüngere lokale 301-Weiterleitungen und 11 damalige öffentliche Routen. Aktuellen Routenbestand vor Abnahme neu erfassen.
- SRC-0506/0507: Drei private Farbmuster und vier lokale Webnutzungen sind keine Freigabe aller 83 Fotovarianten. Sechs Kontaktbögen und Hash-/Quellenaudit ersetzen weder Grading noch Privacy-/Variantenprüfung.
- SRC-0507: Die datierte Ausnahme betrifft genau `vehicle-front-camp.png`, `vehicle-header-clean-v3.png`, `vehicle-side-camp-v2.png` und `vehicle-side-dog.png` in ihrer damaligen Fassung (bestehender Constraint `src-0660`). `vehicle-side-camp-v3.png` hat eine gesonderte spätere Motivfreigabe (`src-0466`); daraus folgt keine neue allgemeine KI-Erlaubnis oder pauschale Bild-/Release-Freigabe. Quellen, Privacy und aktuelle Varianten bleiben einzeln zu prüfen.
- SRC-0508/0509: Lokale technische Generator- und HTML-Belege sind keine vollständige Template-Zentralisierung oder visuelle Abnahme. Startseite eigenständig; kein inhaltliches Redesign. Vollständige lokale Vorschau, Sichtabnahme, ausdrückliche Freigabe des konkreten Release-Umfangs, gepushter lokaler Prüfcommit und Live-Nachprüfung sind getrennte Gates gemäß DEC-REL-001/002/003.

## src-0513

- Quelle: `docs/ausbauplan.md:950`; zusätzlich bindend in projektlokaler `AGENTS.md`.
- Anwendung: alle VanVenture-Bildaufgaben und betroffenen Foto-Stories, insbesondere ST-PHOTO-01, ST-PHOTO-02, ST-PHOTO-03 und ST-PHOTO-07.
- Pflicht: Vor jeder Bildaufgabe `C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md` lesen und anwenden.
- Status: Am 23. September nur lokal dokumentiert; dadurch kein Bild geändert, geprüft, veröffentlicht oder live verifiziert.

## pkg-020

- Quelle: `docs/ausbauplan.md:974–1098`, SRC-0520–SRC-0529; Anwendung: ST-OPS-01, ST-PHOTO-01/02/05/06/07 und ST-WEB-03/05.
- Datierte private Varianten, Hash-/Referenzaudits und technische responsive Läufe belegen ihren jeweiligen damaligen Umfang. Sie sind keine heutige optische Prüfung, Webeinbau-, Datenschutz-, Seiten- oder Release-Freigabe.
- Die bestätigten vorhandenen Fotos 1/2/5 bleiben unangetastet. Verworfene Fassungen von Nr. 23/49/50 bleiben gesperrt; Nr. 13/19 und Nr. 48 behalten ihre motivbezogenen dokumentarischen Grenzen. Nr. 63/69 benötigen eine eigene Alters- und Publikationsentscheidung. Die Sichtfreigabe aus SRC-0528 gilt nur tatsächlich sichtbaren aktuellen Fassungen und wird erst mit Varianten/Hashes reproduzierbar.
- Vier Fahrzeugfotos sind nur von der genannten Farbüberarbeitung ausgenommen. Die vier Rad-Poster behalten nur ihre ausdrücklich bedingte Ausnahme. Weder Ausnahme noch lokale Prüfung ersetzt DEC-REL-001/002/003. Design-Guide inhaltlich unverändert; keine globale Farbregel aus Nr. 50.

## src-0530

- Quelle: `docs/ausbauplan.md:1104` · PKG-021; Anwendung: ST-WEB-01, ST-SEO-01, ST-WEB-03.
- Verbindliche Routing-Grenze: Die auf ausdrücklichen Wunsch gestrichenen Inhalte `/ausruestung.html` und `/bike.html` sind weder öffentliche Seiten noch Sitemap-Ziele. Alte URLs leiten mit 301 zur Startseite, andere fehlende öffentliche HTML-Seiten mit 302; fehlende Assets und API-Routen werden nicht maskiert. Fallback-Header und Scott-Inhalt enthalten keine Links zu den gestrichenen Übersichten.
- Statusgrenze: 11 Routen, 80/80, 55/55, 7/7, 9/9 und die alte lokale Vorschau sind datierte Quellbelege. Der spätere 26/27-/27/28-Planregisterfehler und die `vehicle.html`-Generatorabweichung dürfen nicht von anderen bestandenen Läufen verdeckt werden. Die damalige Aussage „weder Push noch Live“ ist kein dauerhaftes Releaseverbot.

## src-0533

- Quelle: `docs/ausbauplan.md:1171` und `docs/abnahmeberichte/fahrzeug-schiebetuer-korrektur-2026-09-24.md` · PKG-021; Anwendung: ST-PHOTO-03, ST-WEB-03.
- Die Nutzerfreigabe betrifft die konkrete Fahrzeug-Schiebetür-/Hinterradkorrektur V3. Galerieeintrag, zentrale Galeriequelle und Abnahmebericht bleiben miteinander verbunden. Diese Motivfreigabe ist weder pauschale Bildfreigabe noch Freigabe eines anderen Release-Umfangs. Der Quellenstand bezeichnete die Live-Verifikation als offen; sie benötigt einen eigenen Release-/SHA- und Fahrzeugroutenbeleg.

## src-0534

- Quelle: `docs/ausbauplan.md:1176`, mit Nachfolger `SRC-0537` · PKG-021; Anwendung: ST-WEB-05.
- Der links/rechts-Rhythmus wurde für Scott freigegeben; Intro und drei Nutzenkarten wurden beauftragt. Die damaligen 16:10-Ausschnitte betrafen nur das Seitenlayout und wurden später durch SRC-0537 ersetzt. Der Viewer behält vollständige unveränderte Webbilder. Der Guide-Eintrag ist eine einmalige Motiventscheidung, keine globale Formatregel. Technische lokale Tests ersetzen nicht die Sichtabnahme der Kombination.

## src-0537

- Quelle: `docs/ausbauplan.md:1207` · PKG-021; Anwendung: ST-WEB-05, ST-WEB-03.
- Der jüngste Scott-Layoutstand verlangt Wiesenpause und Trail 2:1, Baumtour 3:2 und zwei detailreiche Motive 4:3 passend zur Textmenge; alle Viewer-Ansichten bleiben vollständig/unbeschnitten. `9befff7` auf `origin/main` ist ein datierter Push-Beleg, keine Produktion. Visuelle Abnahme, ausdrückliche Freigabe des konkreten Release-Umfangs, Host-Prüfung und Live-Nachweis sind getrennte Schritte gemäß DEC-REL-001/002/003.

## src-0538

- Quelle: `docs/ausbauplan.md:1226` · PKG-021; Anwendung: ST-WEB-02, ST-WEB-05, ST-WEB-03.
- Der freigegebene Kajak-Textlinkstil wird für Kajak und Scott aus `detail-editorial.css` bezogen; eine konkurrierende Scott-Regel entfällt. Der Design-Guide blieb inhaltlich unverändert, weil keine neue Linkgestaltung beschlossen wurde. Fünf lokale Browserbreiten und Push `eea8261` sind kein Nutzer-Sicht- oder Live-Nachweis.

## src-0539

- Quelle: `docs/ausbauplan.md:1237` · PKG-021; Anwendung: ST-WEB-01, ST-WEB-03.
- Die Sichtabnahme des bisherigen Gesamtpakets, die Freigabe der Riverstar-Karte samt Startseitenabstand und die spätere Freigabe des letzten Weißraum-Feinschliffs sind drei verschiedene datierte Ereignisse. Die Startseite bleibt eigenständig; kein neues Unterseiten-Template oder Bildderivat folgt daraus. Die Quelle behauptet Live-Prüfung des freigegebenen Endstands am 25.09.; ohne zugeordneten Release-SHA und Scope ist daraus keine Live-Verifikation jeder Scott- oder Fahrzeugänderung ableitbar. Spätere Änderungen verlangen eine eigene Umfangsfreigabe.

## src-0977

- Quelle: `docs/seo.md:37`
- Anwendung (BATCH-001 Planning Coverage): ST-SEO-04,ST-SEO-05,ST-SEO-06,constraint-register.md#src-0977
- Originalwortlaut: 4. Die Reiseberichte um tatsächlich belegte Etappen, Stellplätze, Reisezeiten und eigene Erfahrungen ergänzen. Keine Kosten, Tipps oder Ergebnisse erfinden.
- COVERAGE-R1-015: ST-SEO-04/05/06 prüfen je Bericht Etappen, Stellplätze, Reisezeiten und eigene Erfahrungen einzeln auf Beleg; Kosten, Tipps und Ergebnisse werden getrennt auf erfundene Aussagen geprüft. Fehlende Fakten bleiben offen.
- BATCH-001 / PKG-035 / `SRC-0977.a`: Context; Ziel `ST-SEO-04,ST-SEO-05,ST-SEO-06`; Review-Befund: „4.“ ist nur Listennummer, keine Klausel. Kandidat entfernen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-0977.b`: Partially Covered; Ziel `ST-SEO-04,ST-SEO-05,ST-SEO-06`; Review-Befund: Belegte Etappen, Stellplätze, Reisezeiten und eigene Erfahrungen sind vier prüfbare Inhaltsbedingungen. Plan: ST-SEO-04/05/06, Z. 210–238, trifft die drei Berichte. Als zusammengehörige redaktionelle Bedingung zulässig; bei atomarer Erfassung in vier Kriterien teilen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0977.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-0977.c`: Partially Covered; Ziel `ST-SEO-04,ST-SEO-05,ST-SEO-06`; Review-Befund: Verbot erfundener Kosten, Tipps und Ergebnisse. Die drei Story-AC nennen Kosten bzw. „Angaben“, aber Tipps und Ergebnisse nicht ausdrücklich. In ST-SEO-04/05/06, Z. 216/226/236, wörtlich ergänzen oder als gemeinsame, explizit referenzierte Inhaltsgrenze führen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0977.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## src-0978

- Quelle: `docs/seo.md:38`
- Anwendung (BATCH-001 Planning Coverage): ST-SEO-03,constraint-register.md#src-0978
- Originalwortlaut: 5. Den Website-Link bei passenden bestehenden YouTube-Reisevideos ergänzen, wenn ausdrücklich beauftragt. Keine gekauften Links oder automatisierten Fremdbeiträge.
- COVERAGE-R1-015: ST-SEO-03 verlangt ausdrücklichen Auftrag für konkrete bestehende passende Reisevideos und funktionierende Website-Ziele. Gekaufte Links und automatisierte Fremdbeiträge sind getrennte Ausschlüsse.
- BATCH-001 / PKG-035 / `SRC-0978.a`: Context; Ziel `ST-SEO-03`; Review-Befund: „5.“ ist nur Listennummer. Entfernen. Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-0978.b`: Partially Covered; Ziel `ST-SEO-03`; Review-Befund: Passende bestehende YouTube-Reisevideos; Website-Link nur bei ausdrücklichem Auftrag. ST-SEO-03, Z. 202–207, nennt Auswahl, aber der ausdrückliche *Auftrag* und „bestehend“ fehlen. Ergänzen; Auswahl allein ist keine Beauftragung. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0978.b mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.
- BATCH-001 / PKG-035 / `SRC-0978.c`: Partially Covered; Ziel `ST-SEO-03`; Review-Befund: Beide Verbote, gekaufte Links und automatisierte Fremdbeiträge, stehen in ST-SEO-03, Z. 206. Semantisch abgedeckt; als zwei getrennte Prüfpunkte erfassen. Offene Frage: Welche konkrete AC-/Task-ID und welcher Prüfnachweis decken SRC-0978.c mit allen im Review genannten Bedingungen ab? Implementation Verification: ungeprüft.

## coverage-r2-002 · aktuelle Nutzerentscheidungen 26.09.2026

Maßgeblich ist `scrum-plan.md#coverage-r2-002` und der vollständige Nachweis `reviews/decisions-2026-09-26.md`. Die folgenden aktuellen Regeln lösen ältere offene Formulierungen; ursprüngliche Klauseln und Paketberichte bleiben unverändert als Historie. Phase-0-Teilabnahme, Umsetzung, Tests, Live-Stand und Release-Freigabe bleiben getrennte Gates.

- `SRC-0482`: Nur ausdrücklich benannte entscheidungsreife Teile einzeln annehmen; ungeklärte Teile bleiben offen. `UD-2026-09-26-16` nimmt die fachlichen und organisatorischen Regeln zu Kanal/Analytics, Aufbewahrung, Geheimnissen/Verbindungsdaten, Benachrichtigungen, Marvin/Fast Track, KI/Review-Abschluss sowie Archivierung/Küchen-Tablet einzeln teilab. Die PRE_FINAL_AUDIT_DECISION ist beantwortet; das Gesamt-Phase-0-Gate bleibt für nicht benannte Bestandteile, Implementierung, Tests, Live-/Betriebsnachweise und Releasefreigaben offen. Externe Benachrichtigungen bleiben separat freigabepflichtig.
- `SRC-0562`, `SRC-1521`: Backlog ist Standard. Fast Track nur mit klaren Kriterien und ausdrücklicher Freigabe; High/Critical löst keine automatische Einplanung aus.
- `SRC-1053`: Nicht geheime Callback-URLs/Kontobezeichnungen nur in ausdrücklich privaten Betriebsunterlagen; Secrets, Tokens, Schlüssel niemals in Git, Chat oder öffentlicher Website.
- `SRC-1084`: GitHub Pages ist historischer Stand der damaligen Cockpit-Stufe, keine dauerhafte Hostingvorgabe.
- `SRC-1154`: Marvin zunächst nur Backlog-Anlage und ausdrücklich genehmigte Einplanung nach Offen; weitere Verschiebungen brauchen eine spätere eigene Freigabe.
- `SRC-1181`, `SRC-1187`: Rohmetriken 90 Tage; Audit-Logs 12 Monate; aggregierte nicht personenbezogene Kennzahlen dürfen separat länger gespeichert werden. Kanalverantwortung VanVenture/Helmut; Views, Watch Time, Impressionen, CTR, durchschnittliche Wiedergabedauer und Abonnentenentwicklung; Gesamt sowie AT/DE/CH; EUR.
- `SRC-1205`, `SRC-1648`: Interne Inbox zuerst verpflichtend; VanVenture-Admin verantwortlich; kritische Sync-Fehler und nicht zustellbare kritische Warnungen intern sichtbar. Externe Zustellung erst nach separater Aktivierungsfreigabe.
- `SRC-1224`: Keine autonomen KI-Entscheidungen vor separater Produktentscheidung und Datenschutz-/Sicherheitsprüfung.
- `SRC-1537`: Eltern/Kinder nur archivieren, wenn alle betroffenen Zuordnungen vorher eindeutig dokumentiert sind; Eltern dürfen keine verwaisten Kinder hinterlassen.
- `SRC-1559`: Board-Karten 24 Monate; danach löschen nur ohne offene Referenzen/Abhängigkeiten. Dauerhafte Entscheidungen verbleiben in SoT/ADR.
- `SRC-1577`: Menschliche Bestätigung erlaubt Done; Review bleibt bis dahin offen.
- `SRC-1622`: Küchen-Tablet zunächst read-only, keine PIN/Schreibrechte ohne separate Entscheidung.
- `SRC-1799/1800`: Aufgabenfreigabe erlaubt ausschließlich lokale Änderung im exakt freigegebenen Umfang; Deployment/Release braucht weiterhin gesonderte Freigabe.


## COVERAGE-R5-001 — Recovery-Nachtrag (2026-09-26)

- `SRC-0484.a1` ist nach Prüfung der aktuellen Story-/Task-Kette in zwei fachlich unabhängige Nutzerergebnisse aufgeteilt: Backlog (`ST-BRD-01`) und Board-Workflow (`ST-BRD-05`). Tablet (`ST-BRD-02`), Warnungs-Inbox (`ST-BRD-03`) und Marvin-Aktionen (`ST-BRD-04`) bleiben separate Slices. Die ältere PKG-016-Notiz mit der gegenteiligen Split-Behauptung wird durch COVERAGE-R5-003 im Draft und den Recoverybericht als überholter Prüfstand gekennzeichnet; Quelltext und Historienberichte bleiben unverändert.
- ST-CON-01 bleibt Longform; ST-CON-05–16 sind die bereits vorhandenen Kurzformat-, Website-Ergänzungs- und 28-Tage-Review-Stories. Der Recoverybericht löst die alten Behauptungen auf, diese Stories müssten erst neu angelegt werden.
- `SRC-0793` bleibt `Partially Covered`, bis alle offenen Story- und Epic-Qualitätsbefunde nachweislich repariert sind und ein gezielter Coverage-/Traceability-Abgleich bestanden ist.
- Der aktuelle Katalog/Draft enthält 11 Epics (nicht die 10 im Recoveryauftrag genannten) und 71 Stories. Alle 11 werden bewertet; der Katalog enthält jetzt Grenzen, priorisierte Storylisten und Abschlussbedingungen. Story-Level-Befunde mit offenem Reparaturbedarf stehen in `reviews/PLAN-QUALITY-RECOVERY-2026-09-26.md`.
