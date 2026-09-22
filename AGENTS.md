# Working rules

## Live deployment by default

- This rule applies to every task and every new chat opened for this project.
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
- Use this fixed production workflow for every task: **open a short-lived remote
  session → make the requested change → run the relevant tests and verify the live
  result → close the session**. Close every SSH session, deployment shell, tunnel,
  and background helper immediately after verification. Do not leave an interactive
  or persistent remote session open between tasks; every later task opens its own
  short-lived connection.

## Protected photo archive

- `E:\_fotos_original` and the user-specified `E:\_fotos\_original` are strictly read-only, including every subfolder and file.
- Never modify, rename, move, delete, overwrite, retouch, or write metadata or generated files anywhere in these archives.
- Copy selected source photos into the project first. Perform all subsequent processing only on project copies.
- Preserve an unchanged project copy of each selected original and record its source path.

## Website photos

- Anonymize all visible vehicle license plates in published/preview web images, including enlarged views and background vehicles. Work only on project derivatives; preserve unchanged original copies.
- Photos embedded in editorial text across the entire website (travel stories, vehicle page and kayak section) should open an enlarged view on click, with keyboard-accessible close controls. Use the shared photo-viewer.js / photo-viewer.css in static pages and page generators.

## Editorial photo processing

- Treat travel photos as documentary records. Preserve the real scene, people, faces, body proportions, expression, clothing, equipment, animal appearance, and composition. Do not add, remove, move, or replace pictured elements.
- Use a restrained editorial grade only: correct white balance and exposure, recover plausible highlight/shadow detail, keep real skin texture, and use subtle, physically plausible depth separation or fine grain only when it improves the image. Avoid beauty retouching, face/body reshaping, artificial bokeh, HDR, excessive saturation, or invented "golden hour" light.
- Do not use headshot treatment, a neutral background replacement, or portrait-style transformations for travel images. Portrait-like images are optional editorial moments, not a separate portrait series.
- Keep an unchanged project copy and a source-path/hash record before any derivative is made. Produce all edited, resized, or anonymized versions from that project copy.
- Treat any AI-enhanced image as a review derivative until explicitly approved. It must be visually compared with its unchanged project copy and must never become the only retained version.
- Do not publish images with recognizable children unless the user explicitly selects them for publication.
