# Verbindliche Release-Entscheidungen für die Scrum-Planmigration

Entscheidung des Nutzers vom 25. September 2026, im Auftrag zur Fortsetzung
der bestehenden Scrum-Planmigration. Die Originaldateien bleiben unverändert.
Diese Entscheidungen klären ausschließlich die unten genannten Release-Konflikte;
andere fachliche Fragen bleiben einzeln zu prüfen.

## DEC-REL-001 – ausdrückliche Freigabe je Release-Umfang

Jede Veröffentlichung und jedes Deployment benötigt die ausdrückliche Freigabe
des Nutzers für den jeweiligen Release-Umfang. Eine Beauftragung zur lokalen
Bearbeitung allein ist keine Release-Freigabe. Betroffen sind die
Originalklauseln `SRC-0051.b` (`README.md:36`) und `SRC-0068.a`
(`CONTRIBUTING.md:32`). Die dortige Freigabepflicht bleibt im entschiedenen
Umfang erhalten. Die weitergehende Formulierung „externe Änderung“ in
`SRC-0051.b` und die starre Zeitvorgabe „immediately before publication“ in
`SRC-0068.a` werden nicht als unverändert übernommene Zusatzbedingungen
ausgegeben; maßgeblich ist die ausdrückliche Freigabe des konkreten Umfangs.

## DEC-REL-002 – Prüfung ist keine Veröffentlichungsfreigabe

Ein erfolgreicher Test, Audit oder abgeschlossener Plan erteilt keine
Veröffentlichungsfreigabe. Diese Entscheidung präzisiert das Gate aus
`DEC-REL-001` und gilt für den Scrum-Entwurf und seinen Abschlussaudit.

## DEC-REL-003 – Local-first und keine direkte Live-Bearbeitung

Änderungen werden lokal bearbeitet und geprüft und erst nach der gesonderten
Freigabe des jeweiligen Release-Umfangs gegebenenfalls ausgerollt. Direkte
Bearbeitung des Live-Systems ist unzulässig. Damit ist die ältere Erlaubnis
in `SRC-0052.d` (`README.md:38`) ausdrücklich abgelöst. Die übrigen
Sachangaben und Klauseln des Originalblocks `SRC-0052` werden davon nicht
pauschal entschieden.

## Historische Regeln und gültige Nachfolge

| Originalklausel | Originalregel | Entscheidung und Nachfolgeregel |
| --- | --- | --- |
| `SRC-0051.b`, `README.md:36` | „Keine Veröffentlichung oder externe Änderung erfolgt ohne ausdrückliche Freigabe.“ | `DEC-REL-001`: Veröffentlichung/Deployment nur mit ausdrücklicher Freigabe des jeweiligen Release-Umfangs. Der zusätzliche Wortlaut „externe Änderung“ wird nicht pauschal auf andere Handlungen übertragen. |
| `SRC-0052.d`, `README.md:38` | „Änderungen dürfen auf Benutzerauftrag direkt im Live-System bereitgestellt werden;“ | `DEC-REL-003`: lokal bearbeiten und prüfen; direkte Live-Bearbeitung ist verboten; ein späteres Deployment benötigt `DEC-REL-001`. |
| `SRC-0068.a`, `CONTRIBUTING.md:32` | „All public-facing text, images, links, social posts, DNS changes, and production releases require Helmut's explicit approval immediately before publication.“ | `DEC-REL-001`: ausdrückliche Nutzerfreigabe für den jeweiligen Veröffentlichungs- oder Deployment-Umfang. Die feste zeitliche Formulierung wird durch die umfängliche Release-Freigabe ersetzt. |

Die Quellen bleiben als historische Originale erhalten. `DEC-REL-002` verhindert
bei allen drei Zuordnungen, dass ein Prüfergebnis als Freigabe gelesen wird.
