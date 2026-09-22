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
| `vanventure-cockpit-mvp.md` | Rollout-/Phasennachweis | Phase 1A ist offen; der vollständige Aufgabenblock steht nun im Gesamtplan. |
| `vanventure-cockpit-plan.md` | Technische Referenz | Fehlende Umsetzungsreste wurden in den Gesamtplan übernommen. |
| `creator-system.md` | Wiederverwendbare Checkliste | Die offenen Kästchen sind absichtlich je Reise/Projekt zu verwenden, keine offenen Entwicklungsaufgaben. |
| `seo.md`, `riverstar/entwurf.md`, `betrieb.md` | Fach- und Betriebsreferenzen | Offene operative Punkte sind im Gesamtplan abgebildet. |

## Produktions- und Codeabgleich

| Prüfung | Belegtes Ergebnis | Planstatus |
| --- | --- | --- |
| Video-Klassifikation | Produktion: 2 `short`, 4 `legacy_clip`, 19 `longform` | Erledigt, durchgestrichen. |
| Redaktionsentscheidungen | Produktion: 7 `keep`, 9 `repackage`, 9 `do_not_pursue` | Erledigt, durchgestrichen. |
| Planner | Produktion: 36 `idea`, 3 `validated`; `estimated_hours`/`actual_hours` vorhanden, beide noch ohne Werte | Oberfläche erledigt; Erfassung und spätere Auswertung bleiben offen. |
| Master Context | Tabelle/Oberfläche vorhanden, Produktion: 0 Einträge | Oberfläche erledigt; erste geprüfte Fakten bleiben offen. |
| Traffic/Retention | Produktion: 46 Traffic- und 200 Retention-Zeilen | Erfassung erledigt; Darstellung und fachliche Auswertung bleiben offen. |
| Audit V1 | Flow Trail 986 öffentliche Views; Norwegen 108 und Sardinien 38 Minuten Watchtime/365 Tage; Trolltunga 149 Views bis Tagesabschluss, 120 aus Shorts-Feed | Erledigt, als Analysegrundlage im Gesamtplan geführt. |
| Gemeinsamer Google-Login | Additive Google-Provider-/`sub`-/E-Mail-Daten, allowlist-geprüfte `/api/auth/google/*`-Routen und getrennte Konfigurationsnamen sind implementiert | Technisch erledigt; Live-Anlage des separaten Google-Webclients und bewusst ausgewählte Adressen bleiben offen. |
| Sitzungsspeicherung | Sitzungen liegen gehasht mit Ablauf und CSRF-Wert in PostgreSQL; `auth_version`, Sperrung und Abmeldung prüfen bzw. widerrufen sie serverseitig | Erledigt; nach OAuth-Client-Anlage live abnehmen. |
| YouTube trennen | Technische Referenz fordert `POST /api/cockpit/youtube/disconnect`; Route/Umsetzung fehlt | Offen und ergänzt. |
| Kanalimport | Code paginiert, beendet aber bei 500 Videos | Offen und ergänzt. |
| Planmetriken | Technische Referenz nennt `content_item_metrics`; Tabelle/CRUD fehlen | Offen und ergänzt. |

## Übernommene Lücken

Die folgenden Punkte waren in Referenzen vorhanden oder durch Code/Produktion
belegt, fehlten aber zuvor im Gesamtplan. Sie wurden als offene Punkte ergänzt:

1. gemeinsamer Google-Login inklusive Freigabeliste, Datenmodell, Sitzungen,
   UI, Audit-Log und Tests;
2. Sitzungsanforderung bei Neustart, Sperrung und Rollenänderung;
3. Entfernen und Testen der 500-Video-Grenze;
4. YouTube-OAuth sicher trennen/widerrufen und auditieren;
5. strukturierte `content_item_metrics` für Ziel-/Ist-Werte;
6. erste geprüfte Master-Context-Fakten;
7. ungeklärter Ort der Riverstar-Uferbilder und konkrete Kritik an den
   Schwimmwesten.

## Ergebnis

Der Gesamtplan enthält jetzt alle belegten offenen Punkte aus den geprüften
Plan-, Phasen- und Referenzdokumenten. Historische Dokumente führen keine
eigenen Aufgabenlisten mehr. Neue Arbeit wird ausschließlich im Gesamtplan
angelegt; bei jedem Abschluss wird dieser Audit bei Bedarf erneut gegen Code und
Produktion abgeglichen.
