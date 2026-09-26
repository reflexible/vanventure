# Schriftliche Nutzerentscheidungen vom 26.09.2026

Quelle: direkte Antwort des Nutzers auf die 15 deduplizierten PRE-Final-Audit-Punkte. Diese Aufzeichnung ist keine Implementierungs-, Live-, Release- oder Deployment-Freigabe.

## UD-2026-09-26-01 · SRC-0482

Nur ausdrücklich benannte und tatsächlich entscheidungsreife Teile einzeln annehmen; keine pauschale Abnahme ungeklärter Punkte. Keine konkreten Phase-0-Teilabnahmen in dieser Nachricht benannt; Gesamt-/Teilabnahme bleibt offen.

## UD-2026-09-26-02 · SRC-0562

Gemeinsame Zuordnungsregel: Standard Backlog; Fast Track nur nach klaren Kriterien und ausdrücklicher Freigabe.

## UD-2026-09-26-03 · SRC-1053

Callback-URLs und Kontobezeichnungen dürfen in ausdrücklich privaten Betriebsunterlagen dokumentiert werden. Keine Secrets, Tokens oder Schlüssel in Git, Chat oder öffentlicher Website.

## UD-2026-09-26-04 · SRC-1084

GitHub Pages ist historische Vorgabe der damaligen Cockpit-Stufe und keine dauerhaft bindende Hostingregel für VanVenture.

## UD-2026-09-26-05 · SRC-1154

Marvin darf zunächst Backlog-Items anlegen und ausdrücklich nach Offen einplanen. Weitere Verschiebungen benötigen eine eigene spätere Freigabe.

## UD-2026-09-26-06 · SRC-1181

Rohmetriken 90 Tage; Audit-Logs 12 Monate. Aggregierte nicht personenbezogene Kennzahlen dürfen separat länger aufbewahrt werden.

## UD-2026-09-26-07 · SRC-1187

Verantwortlich: VanVenture/Helmut als Kanalinhaber. Startkennzahlen Views, Watch Time, Impressionen, CTR, durchschnittliche Wiedergabedauer, Abonnentenentwicklung. Regionen Gesamt, Österreich, Deutschland, Schweiz; Währung EUR; Aufbewahrung gemäß SRC-1181.

## UD-2026-09-26-08 · SRC-1205, SRC-1648

Interne Inbox zunächst verpflichtend. Externe Benachrichtigungen erst nach separater Aktivierungsfreigabe. Verantwortlich: VanVenture-Admin. Kritische Sync-Fehler und nicht zustellbare kritische Warnungen müssen intern sichtbar bleiben.

## UD-2026-09-26-09 · SRC-1224

Automatische KI-Entscheidungen erst nach separater Produktentscheidung sowie Datenschutz-/Sicherheitsprüfung; bis dahin keine autonomen KI-Entscheidungen.

## UD-2026-09-26-10 · SRC-1521

High/Critical kann Fast Track werden, aber nicht automatisch; klare Kriterien und ausdrückliche Freigabe sind erforderlich.

## UD-2026-09-26-11 · SRC-1537

Eltern und Kinder dürfen archiviert werden, wenn zuvor die Zuordnung aller betroffenen Einträge eindeutig dokumentiert ist. Eltern erst archivieren, wenn keine Kinder verwaisen.

## UD-2026-09-26-12 · SRC-1559

Board-Karten 24 Monate aufbewahren. Danach nur löschen, wenn keine offenen Referenzen/Abhängigkeiten bestehen. Dauerhafte Entscheidungen bleiben in SoT/ADR.

## UD-2026-09-26-13 · SRC-1577

Menschliche Bestätigung erlaubt den Wechsel nach Done; Review bleibt bis dahin offen.

## UD-2026-09-26-14 · SRC-1622

Küchen-Tablet zunächst read-only Kiosk; keine lokale PIN und keine Schreibrechte ohne separate Entscheidung.

## UD-2026-09-26-15 · SRC-1799, SRC-1800

Konkrete Aufgabenfreigabe erlaubt lokale Änderungen ausschließlich im freigegebenen Umfang. Deployment/Release benötigt weiterhin separate Freigabe.

## UD-2026-09-26-16 · schriftliche Phase-0-Teilabnahme

Der Nutzer hat ausdrücklich die **fachlichen und organisatorischen Regeln** der folgenden sieben Bereiche einzeln teilabgenommen: Kanal und Analytics (`SRC-1187`); Aufbewahrung (`SRC-1181`); Geheimnisse und Verbindungsdaten (`SRC-1053`); Benachrichtigungen (`SRC-1205`, `SRC-1648`); Marvin und Fast Track (`SRC-0562`, `SRC-1154`, `SRC-1521`); KI und Review-Abschluss (`SRC-1224`, `SRC-1577`); Archivierung und Küchen-Tablet (`SRC-1537`, `SRC-1559`, `SRC-1622`).

Die Teilabnahme gilt ausschließlich den bereits festgelegten Regeln dieser Bereiche. Sie umfasst ausdrücklich **nicht** technische Implementierung, Datenmodell oder APIs, Rollen-/Berechtigungsumsetzung, OAuth-/Analytics-Live-Konfiguration, Security- oder Betriebsnachweise, Deployment, Produktionsreife, externe Benachrichtigungen oder den vollständigen Phase-0-Umfang. Nicht entscheidungsreife und technisch nicht nachgewiesene Bestandteile bleiben offen. Externe Benachrichtigungen benötigen weiterhin eine separate Aktivierungsfreigabe. Keine Originalquelle oder Paketbericht wurde durch diese Entscheidung geändert.

## Phase-0-Gate

UD-2026-09-26-01 legte die Regel fest, dass nur ausdrücklich benannte, entscheidungsreife Teile einzeln angenommen werden dürfen. Mit UD-2026-09-26-16 sind die sieben genannten Policy-Bereiche schriftlich teilabgenommen. Damit ist die PRE_FINAL_AUDIT_DECISION zu SRC-0482 beantwortet und die Policy-Teilabnahme dokumentiert. Das **Gesamt-Phase-0-Gate bleibt teilweise offen**: nicht benannte oder nicht entscheidungsreife Teile, technische Umsetzung, Tests, Rollen-/Berechtigungsumsetzung, Live-/Betriebsnachweise und Releasefreigaben sind nicht abgenommen. Es wurde keine Gesamt-Phase-0-Abnahme erteilt.

## Unverändert offene Grenzen

Technische Umsetzung, Tests, aktuelle Betriebs-/Live-Verifikation und jeweilige Releasefreigaben sind nicht durch diese Entscheidungen belegt. Externe Benachrichtigung bleibt deaktiviert, bis die gesonderte Aktivierungsfreigabe erteilt wird.

## Queue-Bereinigung nach den ausdrücklich vorgegebenen Korrekturen

- `SRC-0753` und `SRC-0780` bleiben als publication-spezifische Entscheidungen geführt; sie blockieren nur die betroffenen Veröffentlichungen.
- `SRC-1094` wurde anhand der bereits dokumentierten allowlist-gebundenen Google-Anmeldung als beantwortet aus der offenen Queue entfernt.
- `SRC-1128` wurde technisch geklärt: `yt_*` gilt für YouTube-Tabellen; `content_*`, `master_*` und `scrum_*` behalten ihre Domänennamen.
- `SRC-1648` wurde mit `SRC-1205` zu einer Benachrichtigungsentscheidung dedupliziert; externe Aktivierung bleibt gesperrt.
- `SRC-1107` ist separat durch `DEC-OAUTH-001` geklärt.
