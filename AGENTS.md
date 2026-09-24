# Working rules

## Plan status is part of every delivery

- Every completed project task must update every affected plan, overview, and
  implementation-status document in the same turn. The status must distinguish
  local preparation from a verified live rollout and name remaining work plainly.
- Before reporting completion, reconcile duplicate status entries across the
  relevant plan documents so they never contradict one another.

## Consolidated mandate, approvals, and evidence

- For VanVenture work, read the binding consolidated mandate in
  [`docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md`](docs/vanventure-gesamtauftrag-mit-pruefung-und-freigaben.md)
  before starting a relevant implementation. It governs evidence, original
  protection, approval gates, and acceptance reporting; the technical template
  details remain in [`docs/responsive-templates.md`](docs/responsive-templates.md)
  and approved visual rules remain in [`docs/design-guide.md`](docs/design-guide.md).
- Do not make a new design rule, global component variant, or design exception
  binding or live without the user's explicit approval. Apply already approved
  rules without asking again. After an approved change, update the design
  guide, implementation, tests, and status evidence together; never revise the
  guide merely to justify an unapproved or faulty implementation.
- For each completed relevant change, keep an evidence matrix and an acceptance
  report with the tested source state, result, scope, reproducible checks, and
  plainly named untested or blocked items. Local preparation, repository state,
  successful checks, approval, and live verification are distinct statuses.
- Consolidate each newly commissioned requirement into its existing authoritative
  project document in the same change. Public content galleries, including the
  kayak reference, must use one shared component and the approved photo viewer;
  read sections 6.1 and 15.1 of the consolidated mandate before changing them.

## Live deployment by default

- This rule applies to every task and every new chat opened for this project.
- **Local-first is mandatory.** Never make, test, or hotfix a requested change directly on the production host. Before any rollout, update the local target branch from its authoritative remote, implement and verify the change locally, commit it, and push that exact commit. Deploy production only from this pushed, locally verified commit; record its commit SHA in the acceptance evidence. If the local branch cannot be reconciled with the authoritative remote state, stop before rollout and report the concrete divergence.
- Unless the user explicitly asks to keep work local, every requested website, cockpit,
  editorial, or operational change includes its rollout to the production host at
  `vanventure.at`. Do not leave a completed requested change only in the local
  workspace for the user to transfer or synchronize manually.
- Prefer a live-safe update without restarting a container whenever the deployed
  architecture actually supports it. Do not modify the read-only running container
  or bypass the release process merely to avoid a restart. When an image rebuild or
  database migration is required, restart only the affected web service; PostgreSQL,
  Caddy, public files, and unrelated services remain running.
- Before a production rollout, run the relevant release checks. Create a protected
  database dump only when the rollout changes persistent data, applies a database
  migration, or otherwise makes a material change that is not easily reversible.
  A backup is not required for a reversible presentation, CSS, JavaScript, or
  stateless application update. After rollout, verify `/healthz`, the affected
  private or public route, and the visible result on the live host.
- Report the live URL and whether a web-service restart was necessary. A failed
  check blocks the rollout; report the concrete blocker instead of claiming that the
  change is live.
- Use this fixed production workflow for every task: **synchronize the local target
  branch → make and test the change locally → commit and push the verified commit →
  open a short-lived remote session → deploy that exact commit → verify the live
  result → close the session**. Close every SSH session, deployment shell, tunnel,
  and background helper immediately after verification. Do not leave an interactive
  or persistent remote session open between tasks; every later task opens its own
  short-lived connection.

## Protected photo archive

- `E:\_fotos_original` and the user-specified `E:\_fotos\_original` are strictly read-only, including every subfolder and file.
- Never modify, rename, move, delete, overwrite, retouch, or write metadata or generated files anywhere in these archives.
- Copy selected source photos into the project first. Perform all subsequent processing only on project copies.
- Preserve an unchanged project copy of each selected original and record its source path.
- The shared archive's Windows ACL remains unchanged by VanVenture work.
  Enforce read-only archive access in the isolated project workflow; reject
  overwriting an unchanged project copy and verify source/copy checksums.

## Verbindliche Bildrichtlinie für vanventure.at

- Bei jeder Aufgabe, bei der Bilder für vanventure.at ausgewählt, bearbeitet, zugeschnitten, optimiert, exportiert, eingebunden, ersetzt oder veröffentlicht werden, muss der Bild-Skill [`C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md`](C:\Users\helmu\.codex\skills\photo-archive-safety\SKILL.md) gelesen und angewendet werden. Die Anwendung erfolgt ohne zusätzliche Erinnerung durch den Nutzer. Diese Pflicht gilt auch, wenn die Bildarbeit nur Teil einer größeren Aufgabe ist, etwa beim Erstellen eines Reiseberichts oder beim Überarbeiten einer Seite.
- **Geltungsbereich:** Alle Bilder der gesamten Website, einschließlich Startseite, Fahrzeugseiten, Kajak-/Aktivitätsseiten, Reiseberichten, Übersichts- und Ausrüstungsseiten. Dazu gehören Hero- und Hintergrundbilder, Bilder im Fließtext, Galerien, Vorschaubilder, vergrößerte Lightbox-Ansichten und sämtliche Desktop-, Tablet- und Mobilvarianten. Die Ausnahme der Startseite von der Template-Vereinheitlichung ist keine Ausnahme von dieser Bildrichtlinie.
- Jeweils die für den Bildtyp zutreffenden Skill-Vorgaben anwenden. Eine gemeinsame Bildrichtlinie bedeutet nicht, alle Motive blind mit identischen Bearbeitungseinstellungen zu behandeln. Bestehende Projektregeln zum Schutz der Originalbilder, zur Bildbearbeitung und zu Veröffentlichungsfreigaben bleiben erhalten. Widersprüche ausdrücklich melden, nicht stillschweigend eine Regel ignorieren.
- Vor der Veröffentlichung müssen alle im jeweiligen Auftrag neu hinzugefügten oder geänderten Bilder geprüft sein. Bereits geprüfte und unveränderte Bilder müssen nicht erneut bearbeitet werden.
- Ist der Skill nicht zugänglich oder eine erforderliche Prüfung nicht möglich, den konkreten offenen Punkt melden und die betroffenen Bilder nicht als geprüft oder freigegeben ausgeben.
- Diese Anwendungspflicht gilt ausschließlich für vanventure.at. Keine entsprechende Pflicht in globale Codex-Anweisungen oder andere Projekte eintragen.

## Website photos

- Anonymize all visible vehicle license plates in published/preview web images, including enlarged views and background vehicles. Work only on project derivatives; preserve unchanged original copies.
- Photos embedded in editorial text across the entire website (travel stories, vehicle page and kayak section) should open an enlarged view on click, with keyboard-accessible close controls. Use the shared photo-viewer.js / photo-viewer.css in static pages and page generators.

## Responsive public-site templates

- Where public subpages exist, link directly to them in the navigation; do not
  introduce an overview page or overview menu item unless the user expressly
  requests one. Preserve existing overview URLs for inbound-link compatibility
  unless their removal is separately authorized. The user subsequently
  authorized retiring the equipment/bike overview content and internal links;
  those two legacy addresses redirect to the homepage. This rule is
  VanVenture-only.
- Public subpages use central responsive components and the designated reusable kayak/activity, vehicle, and travel-story templates. Shared markup, CSS, and behavior must not be copied or maintained separately per page. The current kayak page is the design reference. These rules apply on desktop, tablet, and smartphone. The homepage retains its independent layout and its existing presentation and functions at every screen size; shared components must not change it unintentionally. Page-specific differences are implemented through content, configuration, or explicitly defined variants. Before relevant changes, read the complete binding specification in [`docs/responsive-templates.md`](docs/responsive-templates.md) and apply its acceptance criteria.

## Editorial photo processing

- Treat travel photos as documentary records. Preserve the real scene, people, faces, body proportions, expression, clothing, equipment, animal appearance, and composition. Do not add, remove, move, or replace pictured elements.
- **Personenentscheidung vom 24.09.2026:** Auf VanVenture-Fotos erkennbare Kinder anonymisieren. Gesichter Erwachsener nur dann anonymisieren, wenn der Nutzer es für das betreffende Motiv ausdrücklich verlangt; Erwachsene nicht vorsorglich oder pauschal maskieren. Helmut und Sabine dürfen sichtbar bleiben. Bei unklarer Alterszuordnung oder fehlender Veröffentlichungsentscheidung das betroffene Bild zurückstellen und den Nutzer ausdrücklich fragen. Diese Regel gilt nur für VanVenture und ändert nichts am Kennzeichenschutz. Ein erkennbares Kind darf weiterhin nur nach ausdrücklicher Auswahl des Fotos veröffentlicht werden.
- Wo eine Gesichts- oder Kennzeichenanonymisierung konkret beauftragt ist, nur die sichtbaren identifizierenden Merkmale beziehungsweise Kennzeichenzeichen mit eng sitzender Maske, kleinem Sicherheitsrand und weichen Kanten bearbeiten. Keine groben Blöcke oder Überläufe auf Haare, Kleidung, Körper oder Hintergrund. Bei 100% und in jeder Webgröße auf Unlesbarkeit prüfen. Nicht identifizierende Rückansichten brauchen keine Gesichtsmaske.
- For a restrained VanVenture outdoor-editorial grade, correct white balance and exposure, recover plausible highlight/shadow detail, keep real skin texture, keep greens moody but plausible, slightly desaturate sky/water blues, subtly support warm browns/oranges, and use controlled filmic contrast with gently lifted blacks. Keep the daylight character. Tune by image rather than applying fixed values. Avoid beauty retouching, face/body reshaping, artificial bokeh, HDR, excessive saturation, or invented "golden hour" light.
- Remove human-made distractions only after the user confirms the exact elements. Work locally on a project derivative, repair only the confirmed distraction, and inspect the repaired area at 100% for repeated texture, seams, or changes to nearby scene details. Do not infer approval to remove adjacent poles, buildings, people, or objects.
- Do not use headshot treatment, a neutral background replacement, or portrait-style transformations for travel images. Portrait-like images are optional editorial moments, not a separate portrait series.
- Keep an unchanged project copy and a source-path/hash record before any derivative is made. Produce all edited, resized, or anonymized versions from that project copy.
- Treat any AI-enhanced image as a review derivative until explicitly approved. It must be visually compared with its unchanged project copy and must never become the only retained version.
- Do not publish images with recognizable children unless the user explicitly selects them for publication.
