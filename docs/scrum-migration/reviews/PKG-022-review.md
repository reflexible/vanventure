## PKG-022 – lesender Review

Geprüft wurden **alle 63 Klauselkandidaten aus 16 Originalblöcken** und alle 16 Matrix-Zuordnungen im Paket. Die Originalstellen in [ausbauplan.md](D:/work/_venventure/docs/ausbauplan.md:1258) und [betrieb.md](D:/work/_venventure/docs/betrieb.md:3) sowie die betroffenen Stellen im [Scrum-Entwurf](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:43) und [Constraint-Register](D:/work/_venventure/docs/scrum-migration/constraint-register.md:592) wurden direkt gelesen. **Keine Datei wurde geändert.**

**Ergebnis: PKG-022 ist noch nicht coveragefähig.** Das Register bewahrt bei SRC-0548 bis SRC-0562 überwiegend den Originalwortlaut, ersetzt aber keine passende Story-Zuordnung oder nachprüfbare Planning Coverage. Die Matrix-Angabe „Rule / Constraint“ ist deshalb nicht durchgehend ein bestandener Coverage-Nachweis.

### Übergreifende Korrekturen

1. **SRC-0540 → ST-WEB-05 statt ST-WEB-02.** Die Scott-Textredaktion aus `ausbauplan.md:1260–1276` betrifft das Radprofil. [ST-WEB-02](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:43) behandelt Kajak und Fahrzeug; [ST-WEB-05](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:74) behandelt Scott. Dort einen datierten historischen Inhalts- und Rolloutnachweis samt Quelle ergänzen. Der alte Live-Nachweis darf die noch offene aktuelle Template- und Sichtprüfung nicht erledigen.
2. **SRC-0550 zusätzlich → ST-PHOTO-01.** Archivschutz, unveränderte Projektkopie, Hashprüfung und Ableitungsort gehören fachlich zu [ST-PHOTO-01](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:106); der Betriebsbezug zu ST-OPS-01 bleibt für das Staging-Skript sinnvoll.
3. **SRC-0555 → ST-AUTH-01.** Private Google-Login-Konfiguration, eigener OAuth-Client und Positiv-/Negativprüfung gehören zur [Login-Story](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:462), nicht allein zum Release-/Restore-Ziel ST-OPS-01. Historischen Prüfstatus und dauerhaft bindende Trennung vom YouTube-Client getrennt ausweisen.
4. **SRC-0562 aufteilen.** Der Timer/Server-Monitor gehört zu ST-OPS-01. Die geplante Übernahme von **Cockpit-Statuskennzeichen** ins Familienboard ist in [ST-BRD-03](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:588) nicht wirklich abgedeckt: Diese Story beschreibt Fahrzeugwarnungen. Einen eigenen Board-Slice oder ausdrücklich erweiterten, abnehmbaren Scope mit Quelle, Prioritätsregel, Datenminimierung und Ausbleiben von Nachrichten bis zur Umsetzung vorsehen.
5. **Release-Freigabe präzisieren.** `betrieb.md:6–8` sagt „ausdrücklich beauftragt“. Nach [DEC-REL-001/002](D:/work/_venventure/docs/scrum-migration/release-decisions.md:8) braucht *jeder konkrete Veröffentlichungs- oder Deployment-Umfang* eine ausdrückliche Nutzerfreigabe; Prüfung oder lokaler Auftrag reichen nicht. Die Zielstelle darf das nicht zu einem bloßen Bearbeitungsauftrag abschwächen.
6. **Kandidatensegmentierung reparieren.** `SRC-0550.a/b`, `0551.a`, `0552.a`, `0553.a`, `0554.a` und `0554.c/d` enthalten abgeschnittene Datums- oder Listenteile. `SRC-0557.b` ist nur zusammen mit den folgenden Kennzeichen verständlich. Diese Fragmente dürfen keine eigenständigen Anforderungen werden.

### Einzelprüfung aller Kandidaten

Legende: **S** = semantisch einfache Klausel, **K** = komplex oder nur im Verbund sinnvoll. „Ziel“ bezeichnet die nötige Korrektur; ein erhaltener Wortlaut im Register allein ist dabei kein Nachweis für die Story.

| Kandidat | Klasse | Befund und konkrete Korrektur |
| --- | --- | --- |
| **SRC-0540.a** | K | `ausbauplan.md:1260–1264`: Mehrere konkrete Erlebnisse und die Doppelungsrüge in einem Kandidaten. Als historische redaktionelle Vorgabe bei **ST-WEB-05** erhalten; die Erlebnisse einzeln rückverfolgbar machen. |
| **0540.b** | K | `:1264–1265`: Drei unterschiedliche Karteninhalte. Bei ST-WEB-05 als drei Inhaltskriterien beziehungsweise datierter Bestandsnachweis, nicht bei ST-WEB-02. |
| **0540.c** | K | `:1266–1267`: Probefahrt, Leogang, Massa Marittima, Verschleiß und das Verbot der erneuten Wartungsbehauptung sind mehrere prüfbare Aussagen. Bei ST-WEB-05 getrennt erfassen. |
| **0540.d** | S | `:1268`: Die doppelte Tourankündigung entfiel. Eindeutiges negatives Inhaltskriterium; historisch bei ST-WEB-05 nachweisen. |
| **0540.e** | K | `:1268–1270`: DE/EN-Änderung, zentrale Inhaltsquelle und Neuerzeugung sind verschiedene Arbeitsschritte. Als abgeschlossenen, datierten Ablauf bei ST-WEB-05 führen. |
| **0540.f** | K | `:1270`: Vier ausdrücklich ausgenommene Änderungsbereiche. Als Scope-Grenze des damaligen Textreleases bei ST-WEB-05 bewahren; keine dauerhafte Sperre für spätere beauftragte Änderungen ableiten. |
| **0540.g** | K | `:1271–1272`: Lokalprüfung, Push-SHA und Liveprüfung sind getrennte Statusbelege. Bei ST-WEB-05 als **Quellbehauptung des damaligen Releases** eintragen; keine neue aktuelle Live-Abnahme behaupten. |
| **0540.h** | S | `:1273–1274`: Verweis auf den Abnahmebericht ist Evidenzlink, kein eigener Umsetzungs-Task. Beim historischen Nachweis von ST-WEB-05 aufnehmen. |
| **0540.i** | S | `:1275–1276`: Klare zeitliche Statusabgrenzung. Bei ST-WEB-05 ausdrücklich erhalten, damit frühere Zwischenstände den Textrelease-Status nicht überschreiben. |
| **SRC-0548.a** | S | `betrieb.md:3`: „Betriebsreferenz“ ist eine Dokumentrolle. [Register `src-0548`](D:/work/_venventure/docs/scrum-migration/constraint-register.md:592) bewahrt sie; nicht als neue ST-OPS-01-Arbeit zählen. |
| **0548.b** | S | `:3–4`: Alleiniger Ort für offene Aufgaben und Status ist der Gesamtplan. Dokumenthierarchie als Constraint erhalten; der neue Scrum-Plan braucht einen expliziten Migrations-/Nachfolgehinweis, bevor diese Aussage umgedeutet wird. |
| **SRC-0549.a** | S | `betrieb.md:6`: Geltungsbereich `/opt/vanventure` ist eindeutig. [Register `src-0549`](D:/work/_venventure/docs/scrum-migration/constraint-register.md:598) passt; als Betriebs-Scope, nicht als Story-Ergebnis. |
| **0549.b** | K | `:6–8`: Geheimnisschutz und Veröffentlichungsfreigabe sind zwei Verbote. Getrennt führen; Freigabe auf den konkreten Umfang gemäß DEC-REL-001/002 präzisieren. |
| **SRC-0550.a** | K | `betrieb.md:10`: „23.“ ist kein Satz. Mit **0550.b** zu „23. September 2026“ zusammenführen; kein eigenständiger Kandidat. |
| **0550.b** | K | `:10–12`: Projektisolation, lesender Archivzugriff und unveränderte Windows-ACL trennen. Zusätzlich ST-PHOTO-01 zuordnen; [Register `src-0550`](D:/work/_venventure/docs/scrum-migration/constraint-register.md:604) bewahrt nur den Block. |
| **0550.c** | S | `:12`: Unveränderte Projektkopien sind eine eigenständige Schutzpflicht. ST-PHOTO-01 `:112` deckt sie sachlich; Quell-ID in dessen Traceability ergänzen. |
| **0550.d** | K | `:13–14`: Ablehnung abweichender vorhandener Kopien und Quell-/Kopie-Prüfsummen sind zwei Skriptprüfungen. ST-PHOTO-01 plus Betriebscheck verknüpfen. |
| **0550.e** | S | `:14`: Webableitungen entstehen nur im Projekt. Als eindeutige Schutzgrenze ST-PHOTO-01 zuordnen. |
| **SRC-0551.a** | K | `betrieb.md:18`: „1.“ ist nur Listenmarker. Mit dem Release-Schritt verbinden, keinen Atomic-Eintrag daraus machen. |
| **0551.b** | S | `:18`: Branch-Abgleich mit maßgeblicher Quelle ist eine klare Vorbedingung. ST-OPS-01 `:614` verweist nur allgemein auf `betrieb.md`; konkrete Gate-/Quellzuordnung ergänzen. |
| **0551.c** | K | `:18–19`: Nur **wenn** Produktion neuer ist: lesend sichern **und** Differenz klären. Bedingung und beide Handlungen erhalten; bei nicht auflösbarer Abweichung greift die Stop-Grenze aus AGENTS.md. |
| **0551.d** | S | `:19–20`: Änderung und vollständige Anwendungstests lokal. Als Release-Gate in ST-OPS-01 benennen; „vollständig“ auf den betroffenen Anwendungsumfang beziehen. |
| **0551.e** | S | `:20–21`: `public-image-audit.mjs --strict` gilt zusätzlich **bei Website-Bildern**. Bedingung im Gate und in der Rückverfolgung erhalten. |
| **SRC-0552.a** | K | `betrieb.md:22`: „2.“ ist nur Listenmarker; nicht separat übernehmen. |
| **0552.b** | S | `:22`: Exakt geprüften Stand committen und pushen. Als zwingende Reihenfolge in ST-OPS-01/Release-Constraint führen. |
| **0552.c** | K | `:22–24`: Erst danach exakt diesen Commit kurz remote übertragen; `.env`, Dumps und Originalfotos nicht kopieren. Reihenfolge, Identität und drei Ausschlüsse getrennt prüfbar halten. |
| **0552.d** | S | `:24–25`: Direkte Produktionsreparatur ist untersagt. Mit DEC-REL-003 konsistent; als ausdrückliches Verbot erhalten. |
| **0552.e** | S | `:25–26`: Entpacktes Archiv des geprüften Commits unter genanntem Release-Pfad ist eine konkrete Betriebsinvariante. Im Constraint belassen und ST-OPS-01 zuordnen. |
| **0552.f** | S | `:27`: Compose erhält die private bestehende `.env` separat. Klare Secret-Grenze; im Release-Gate erhalten. |
| **SRC-0553.a** | K | `betrieb.md:28`: „3.“ ist Listenmarker, kein eigener Sachgehalt. |
| **0553.b** | S | `:28`: `sh deploy/release-check.sh` auf dem Produktionshost ausführen. ST-OPS-01 nennt Release-Checks nur generisch; den konkreten Pflichtschritt zuordnen. |
| **0553.c** | S | `:28–29`: Keine Node-Installation auf dem Host ist eine Betriebsannahme, keine neue Aufgabe. Als datierten Architekturkontext erhalten, nicht als Acceptance Criterion „herstellen“. |
| **0553.d** | K | `:29–30`: Ablauf prüft Compose und laufenden Healthcheck. Beide Prüfergebnisse separat nachweisbar machen. |
| **0553.e** | K | `:30–31`: Geschützter Dump vor Migrationen beziehungsweise schwer reversiblen Datenänderungen. Bedingung und Zeitpunkt erhalten; kein pauschaler Dump für zustandslose Releases. |
| **0553.f** | K | `:32–34`: `--stateless` ist nur für rein zustandslose Präsentations-/CSS-/JS-Releases zulässig und lässt dann den Dump weg. Ausnahme eng mit 0553.e verknüpfen. |
| **0553.g** | S | `:34`: Fehlgeschlagener Pflichtcheck sperrt den Release. Als explizites Stop-Gate bei ST-OPS-01 erhalten. |
| **SRC-0554.a** | K | `betrieb.md:35`: „4.“ ist Listenmarker; nicht separat übernehmen. |
| **0554.b** | K | `:35–37`: Image aus genau dem geprüften Archiv bauen und importierte Dateien sowie zentrale UI-Assets **im fertigen Image** prüfen. Drei nachweisbare Schritte; konkrete Zielstelle ST-OPS-01-Release-Gate. |
| **0554.c** | K | `:37`: „Dies verhindert den am 24.“ ist abgeschnitten. Mit **0554.d** als historischer Fehlerbezug verbinden. |
| **0554.d** | S | `:37–38`: Fehlender `public-page-routes.mjs`-Import war ein datierter Vorfall. Als Begründung für 0554.b behalten, nicht als neue offene Anforderung. |
| **0554.e** | S | `:38–39`: Nur betroffenen Webdienst aktualisieren. Eindeutige Service-Grenze; bei ST-OPS-01 bewahren. |
| **0554.f** | K | `:39–41`: `/healthz`, betroffene private/öffentliche Routen und sichtbares Browserergebnis samt CSP-konformen Icons sind getrennte Liveprüfungen. ST-OPS-01 `:614` deckt einen Teil generisch; Browser-/Icon- und Scope-Prüfung explizit ergänzen. |
| **0554.g** | S | `:42–43`: PostgreSQL, Caddy und öffentliche Dateien bleiben aktiv. Als Release-Schutzgrenze erhalten. |
| **0554.h** | K | `:42–43`: Neustart nur des Webdienstes und nur bei erforderlichem Image-Rebuild. Bedingung und Dienstgrenze erhalten; keine Pflicht zum Neustart bei live-sicherem Update ableiten. |
| **0554.i** | S | `:43–44`: Remote-Sitzung unmittelbar nach Prüfung schließen. Konkreter Abschlussschritt in ST-OPS-01. |
| **SRC-0555.a** | K | `betrieb.md:46–49`: Drei eigene Google-Login-Werte einschließlich exakter Redirect-URI in privater Server-`.env`. Zu **ST-AUTH-01 `:468`** und Sicherheitsconstraint verschieben; kein OAuth-Secret im Plan ausschreiben. |
| **0555.b** | K | `:49–50`: Neuer Webclient und nur `openid email profile` sind getrennte Grenzen. ST-AUTH-01 nennt den eigenen minimal berechtigten Client; konkrete Scope-Grenze rückverfolgbar ergänzen. |
| **0555.c** | S | `:50–51`: YouTube-OAuth-Client nicht wiederverwenden. ST-AUTH-01 `:468` deckt die Trennung; Source-ID nachtragen. |
| **0555.d** | K | `:51–53`: Vorgesehene Adressen vorher zuordnen, dann mindestens ein erlaubtes und ein abgelehntes Konto live prüfen. ST-AUTH-01 enthält historische Positiv-/Negativbelege; Voraussetzung und damaligen Status getrennt ausweisen. |
| **SRC-0556.a** | S | `betrieb.md:55`: `check:release` ist keine Deployment-Automatik. Eindeutige Funktionsgrenze; ST-OPS-01 `:614` darf aus dem Check kein automatisches Release folgern. |
| **0556.b** | S | `:55–57`: Erstellter Dump dient bei datenverändernden Releases als direkter Rückfall. Bedingung und Restore-Bezug in ST-OPS-01 erhalten. |
| **SRC-0557.a** | K | `betrieb.md:61–62`: Monitor liest nur nötige Felder aus privater DB und gibt knappen geheimnisfreien Status aus. Datenminimierung und Ausgabe getrennt prüfen; ST-OPS-01 `:614` nennt nur „gekürzten Status“. |
| **0557.b** | K | `:63–64`: Fehlercode **plus** eines oder mehrere Kennzeichen ist der gemeinsame Vertrag für SRC-0558–0561. Nicht als alleinstehende unvollständige Klausel abnehmen; mit allen vier Kennzeichengruppen verknüpfen. |
| **SRC-0558.a** | S | `betrieb.md:66`: `SYNC_FAILED` bedeutet letzter Abgleich fehlgeschlagen. Eindeutige Zuordnung; im Monitoring-Vertrag von ST-OPS-01 benennen. |
| **SRC-0559.a** | K | `:67`: `OAUTH_REAUTH_REQUIRED` gilt bei von Google abgelehntem Refresh-Token. Trigger und Kennzeichen zusammen erhalten; nicht als generischen OAuth-Fehler erweitern. |
| **0559.b** | S | `:67–68`: Wiederverbindung erfolgt im Cockpit. Klare Nutzerhandlung, semantisch von 0559.a abhängig; gemeinsam verlinken. |
| **SRC-0560.a** | K | `betrieb.md:69–70`: `SYNC_STALE` gilt nur bei aktiviertem Zeitplan und erst nach Intervall **plus zwei Stunden** ohne Erfolgslauf. Beide Bedingungen im Monitoring-Kriterium erhalten. |
| **SRC-0561.a** | K | `betrieb.md:71–72`: Zwei unterschiedliche Kennzeichen: fehlender Lauf → `SYNC_MISSING`, fehlende aktive Kanalverbindung → `CONNECTION_MISSING`. Für atomare Traceability trennen. |
| **SRC-0562.a** | S | `betrieb.md:74–75`: System-Timer **oder** bestehender Server-Monitor sind geeignete Optionen, keine Festlegung auf eine davon. Zu ST-OPS-01; als Option statt erledigtem Deployment markieren. |
| **0562.b** | S | `:75–76`: Persistente Warnungs-Inbox ist **geplant** und gehört zum Familienboard. ST-BRD-01 `:576` nennt eine Inbox-Tabelle; geplanten Status erhalten, nicht als implementiert ausgeben. |
| **0562.c** | K | `:76–78`: Cockpit-Kennzeichen sollen erst **nach gemeinsam festgelegter Prioritätsregel** zu lesbaren Backlog-/Fast-Track-Karten werden; Tokens, Namen und YouTube-Daten dürfen nicht gespeichert werden. ST-BRD-03 `:590–594` behandelt Fahrzeugwarnungen und bietet hierfür keine echte Coverage. Eigenen Slice/AC und die offene Prioritätsentscheidung erfassen. |
| **0562.d** | S | `:78–80`: Bis der Kanal umgesetzt ist, sendet der Befehl keine Nachrichten. Als derzeitiges Verbot beim Cockpit-Monitoring und als später zu prüfende Übergangsgrenze erhalten. |
| **0562.e** | S | `:80–81`: Gesamtplan ist Ort des verbindlichen Umsetzungsstatus. Dokumentverweis, kein eigenständiges Feature; beim neuen Board-Slice mit Migrationsstatus abgleichen. |

### Offene Nutzerentscheidung

**Unresolved zu SRC-0562.c:** Nach welcher gemeinsam festgelegten Regel werden die Cockpit-Kennzeichen `SYNC_FAILED`, `OAUTH_REAUTH_REQUIRED`, `SYNC_STALE`, `SYNC_MISSING` und `CONNECTION_MISSING` in Backlog beziehungsweise Fast Track eingeordnet? Bis diese Regel entschieden und der passende Board-Slice abgenommen ist, bleibt die automatische Übernahme aus dem Monitoring ungeplant im Detail und ausgeschaltet.

Die Prüfung umfasst genau die im Paket enthaltenen IDs `SRC-0540` sowie `SRC-0548` bis `SRC-0562`; die dazwischenliegenden IDs waren nicht Gegenstand dieses Auftrags.