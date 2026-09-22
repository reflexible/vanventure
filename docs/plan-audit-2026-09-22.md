# VanVenture – unabhängiger Plan-Audit

Stand: 22. September 2026  
Prüfziel: Alle Dokumente mit Plan-, Phasen-, Status- oder offenen
Aufgabenangaben gegen lokalen Code, Tests und den Produktionsdatenbestand
abgleichen. Dieses Dokument ist ein Prüfprotokoll, keine zusätzliche Roadmap.
Der [verbindliche Gesamtplan](ausbauplan.md) bleibt die einzige aktive
Arbeitsliste.

## Geprüfte Quellen

| Quelle | Rolle | Ergebnis |
| --- | --- | --- |
| `ausbauplan.md` | Aktiver Gesamtplan | Korrigiert und ergänzt; siehe „Übernommene Lücken“. |
| `vorhaben-uebersicht.md` | Frühere Übersicht | Keine eigenen Aufgaben mehr; verweist korrekt auf den Gesamtplan. |
| `content-plan-90-tage.md` | Audit-V1-Planungsstand | Keine eigenen Aufgaben mehr; Testtitel und Analysewerte stimmen mit Audit V1 überein. |
| `channel-audit-v1.md` | Analysequelle | Werte stimmen mit Produktionsklassifikation und Exportstichtag überein. |
| `vanventure-cockpit-mvp.md` | Rollout-/Phasennachweis | Gemeinsamer Google-Login ist live abgenommen; der vollständige Aufgabenblock steht im Gesamtplan. |
| `vanventure-cockpit-plan.md` | Technische Referenz | Fehlende Umsetzungsreste wurden in den Gesamtplan übernommen. |
| `creator-system.md` | Wiederverwendbare Checkliste | Die offenen Kästchen sind absichtlich je Reise/Projekt zu verwenden, keine offenen Entwicklungsaufgaben. |
| `seo.md`, `riverstar/entwurf.md`, `betrieb.md` | Fach- und Betriebsreferenzen | Offene operative Punkte sind im Gesamtplan abgebildet. |

## Produktions- und Codeabgleich

| Prüfung | Belegtes Ergebnis | Planstatus |
| --- | --- | --- |
| Video-Klassifikation | Produktion: 2 `short`, 4 `legacy_clip`, 19 `longform` | Erledigt, durchgestrichen. |
| Redaktionsentscheidungen | Produktion: 7 `keep`, 9 `repackage`, 9 `do_not_pursue` | Erledigt, durchgestrichen. |
| Planner | Produktion: 36 `idea`, 2 `validated`, 1 `briefed`; der VAN-Test „GCS nach einem Jahr“ enthält einen verbindlichen Brief und 24 geschätzte Stunden, `actual_hours` bleibt leer | VAN-Brief erledigt; EXPLORE, MOVE und die spätere Auswertung bleiben offen. |
| Master Context | Produktion: 10 freigegebene VAN-/GCS-Fakten | Erste geprüfte Fakten erledigt; Fakten zu EXPLORE und MOVE bleiben offen. |
| Traffic/Retention | Produktion: 46 Traffic- und 200 Retention-Zeilen | Erfassung erledigt; Darstellung und fachliche Auswertung bleiben offen. |
| Audit V1 | Flow Trail 986 öffentliche Views; Norwegen 108 und Sardinien 38 Minuten Watchtime/365 Tage; Trolltunga 149 Views bis Tagesabschluss, 120 aus Shorts-Feed | Erledigt, als Analysegrundlage im Gesamtplan geführt. |
| Gemeinsamer Google-Login | Additive Google-Provider-/`sub`-/E-Mail-Daten, allowlist-geprüfte `/api/auth/google/*`-Routen und getrennte Konfigurationsnamen sind implementiert. Lokal sind 18 Tests grün; live antworten `/healthz`, `/redaktion` und `/cockpit` mit 200, der OAuth-Start leitet zu Google weiter. Anmeldung mit einem freigegebenen sowie Ablehnung eines nicht freigegebenen Google-Kontos sind live abgenommen. Der SSH-Hostschlüssel des Contabo-Servers wurde über dessen VNC-Konsole verifiziert und der Vertrauenseintrag aktualisiert. | Abgeschlossen; zwei Admin-Adressen und der separate Client sind privat hinterlegt. |
| Private Benutzerverwaltung | Eigener linker Navigationspunkt für Administratoren führt auf die geschützte Seite `/benutzerverwaltung`; Redaktionskonten sehen ihn nicht. | Am 22. September nach Webdienst-Neustart mit `/healthz`, Redaktion, Cockpit und Benutzerverwaltung live geprüft; PostgreSQL und Caddy blieben unverändert. |
| Sitzungsspeicherung | Sitzungen liegen gehasht mit Ablauf und CSRF-Wert in PostgreSQL; `auth_version`, Sperrung und Abmeldung prüfen bzw. widerrufen sie serverseitig | Erledigt und im gemeinsamen Google-Login live abgenommen. |
| YouTube trennen | Technische Referenz fordert `POST /api/cockpit/youtube/disconnect`; Route/Umsetzung fehlt | Offen und ergänzt. |
| Kanalimport | Code paginiert, beendet aber bei 500 Videos | Offen und ergänzt. |
| Planmetriken | Technische Referenz nennt `content_item_metrics`; Tabelle/CRUD fehlen | Offen und ergänzt. |
| Kajak-Galerie | 12 freigegebene Bilder, dokumentierte Herkunft und anonymisierte Kennzeichen; die zwei Bilder mit Kindern sind ausschließlich von hinten gezeigt | Am 22. September nach Webdienst-Rollout auf `https://vanventure.at/kajak.html` live geprüft; der Design-Guide bleibt zur Freigabe offen. |
| Galerie-Default | Jede öffentliche Inhalts-Unterseite erhält eine Galerie; Ausnahmen müssen für die jeweilige Seite ausdrücklich entschieden und im Gesamtplan festgehalten sein | Mit der Freigabe von Design Guide V1 am 22. September verbindlich. Über die bereits verifizierten Kajak- und Reisegalerien hinaus ist noch kein zusätzlicher Live-Rollout bestätigt. |
| Fahrzeuggalerie | Drei geprüfte Fahrzeugbilder, inklusive einer anonymisierten Frontansicht, als klickbare Galerie mit gemeinsamem Foto-Viewer | Am 22. September nach Webdienst-Neustart auf `https://vanventure.at/vehicle.html` mit HTTP 200 live geprüft. |
| Ausrüstung → Räder | Ausrüstungsübersicht, Radübersicht und fünf klar unvollständige Profile für Cube, Scott, Trek, Woom 2 und Diamant angelegt | Am 22. September nach Webdienst-Neustart auf `https://vanventure.at/ausruestung.html`, der Radübersicht und allen fünf Profilen mit HTTP 200 live geprüft. Die Ausrüstungsübersicht erfüllt Hero- und Galerie-Standard samt mobiler Lesefläche und klickbaren Bildern. Die fünf Profile sind `noindex` und haben bis zur Auswahl freigegebener Originalbilder eine ausdrücklich dokumentierte, vorläufige Galerie-Ausnahme. |
| Benutzerverwaltung | Der alte Verwaltungszugang im Kopf der Redaktion und sein Dialog entfernt | Am 22. September nach Webdienst-Neustart geprüft: Die Benutzerverwaltung ist nur noch für Administratoren über die gemeinsame private Seitenleiste auf der eigenen geschützten Seite `/benutzerverwaltung` erreichbar; „Abmelden“ steht direkt unter der Kontoanzeige. |

## Übernommene Lücken

Die folgenden Punkte waren in Referenzen vorhanden oder durch Code/Produktion
belegt, fehlten aber zuvor im Gesamtplan. Sie wurden als offene Punkte ergänzt:

1. gemeinsamer Google-Login inklusive Freigabeliste, Datenmodell, Sitzungen,
   UI, Audit-Log und Tests;
2. Sitzungsanforderung bei Neustart, Sperrung und Rollenänderung;
3. Entfernen und Testen der 500-Video-Grenze;
4. YouTube-OAuth sicher trennen/widerrufen und auditieren;
5. strukturierte `content_item_metrics` für Ziel-/Ist-Werte;
6. erste geprüfte Master-Context-Fakten; **erledigt für den VAN-Test:** zehn
   freigegebene GCS-Fakten sind in Produktion gespeichert. EXPLORE und MOVE
   bleiben im Gesamtplan offen;
7. ungeklärter Ort der Riverstar-Uferbilder und konkrete Kritik an den
   Schwimmwesten.

## Ergebnis

Der Gesamtplan enthält jetzt alle belegten offenen Punkte aus den geprüften
Plan-, Phasen- und Referenzdokumenten. Historische Dokumente führen keine
eigenen Aufgabenlisten mehr. Der am 22. September veröffentlichte Kajak-Stand
und der am selben Tag live gespeicherte GCS-Production-Brief sind in
Gesamtplan, Statusnachweisen und diesem Prüfprotokoll gleich ausgewiesen. Neue
Arbeit wird ausschließlich im Gesamtplan angelegt; bei jedem Abschluss wird
dieser Audit gegen Code und Produktion abgeglichen.
