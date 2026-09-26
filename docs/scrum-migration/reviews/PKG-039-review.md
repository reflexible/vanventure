## PKG-039 – lesender Review-Befund

**Umfang:** genau SRC-1174 bis SRC-1200, 27 Originalblöcke und **64 Klauselkandidaten**. Ich habe die Originalstellen in [vanventure-cockpit-plan.md](D:/work/_venventure/docs/vanventure-cockpit-plan.md:277), die zugehörigen Abschnitte in [scrum-plan-draft.md](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:406) und [constraint-register.md](D:/work/_venventure/docs/scrum-migration/constraint-register.md:3154) sowie AGENTS.md, die Scrum-Planungsregel und release-decisions.md gelesen. Quelle SHA-256: `91C94DCC2581638539A51B2EAF81B476E5B667F22C7EBC03EC7FF9CBD2EF4080`. **Keine Datei geändert.**

**Gesamtergebnis: Unresolved.** Das Constraint Register bewahrt den Wortlaut aller 27 Blöcke, bietet aber allein keine echte Story-Coverage. Die 64 Kandidaten enthalten 13 isolierte Listennummern sowie weitere Satzfragmente. Mehrere Matrix-Ziele sind fachlich falsch. Der Plan darf auf Basis dieses Pakets den Coverage-Check der [Scrum-Planungsregel](D:/work/_venventure/docs/project-rules/scrum-planning.md:96) nicht als bestanden melden.

### Zielstellen und übergreifende Korrekturen

| Kürzel | Konkrete Zielstelle | Befund |
| --- | --- | --- |
| INS | [ST-INS-01, Z. 406–414](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:406) | Passend für historischen Cockpit-/Context-/Sync-Bestand, aber Z. 412 nennt viele Anforderungen nur pauschal als „Grenzen im Constraint-Register“. Einzelne Kriterien, offene Entscheidungen und Verifikationsschritte fehlen. |
| AUTH | [ST-AUTH-01, Z. 470–479](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:470) | Beschreibt **Google-Anmeldung von Personen**. Die meisten zugeordneten Klauseln betreffen die **separate YouTube-Kanalverbindung**. Diese Zuordnung korrigieren; dafür INS oder eine eigene kleine Verbindungs-Story mit überprüfbaren Kriterien nutzen. |
| EFF | [ST-INS-05, Z. 446–454](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:446) | Betrifft Ziel-/Ist-Metriken und Produktionsstunden. Datenbankgrundlage, historischer Produktionsstand und Planner-Basisfunktion gehören nicht hierher. |
| OPS | [ST-OPS-02, Z. 629–637](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:629) | Enthält Teile des Google-Produktions-Gates, spricht aber von „Google-Anmeldung“ statt eindeutig von der **externen YouTube-OAuth-Anwendung**. Textinhalt, URLs, Testmodus und bedingte Google-Verifizierung präzisieren. |
| WEB | [ST-WEB-07, Z. 99–107](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:99) | Passende Besucher-Story für öffentliche Rechtstexte. Ihr Acceptance Criterion in Z. 105 ist jedoch ein sachfremder, offenbar duplizierter Fahrradseiten-Text. Rechtstext-Kriterien dort eintragen und OPS von deren Freigabe abhängig machen. |
| BRD | [ST-BRD-01/03, Z. 579–604](D:/work/_venventure/docs/scrum-migration/scrum-plan-draft.md:579) | Familien-Board und Warnungs-Inbox. Keine Zielstelle für die Cockpit-Dashboard- und Videoansichten aus SRC-1199. |

In [constraint-register.md, Z. 3154–3314](D:/work/_venventure/docs/scrum-migration/constraint-register.md:3154) ist der jeweilige Originalwortlaut vorhanden. Die dortigen „Anwendung“-Zeilen wiederholen jedoch die problematischen Matrix-Zuordnungen; sie sollten nach der Story-Korrektur angepasst werden. Das Register darf nicht als Nachweis einer abgenommenen Implementierung oder eines heutigen Live-Stands gelesen werden.

### Einzelprüfung aller 64 Kandidaten

**S = Simple, C = Complex.** „Offen“ bedeutet fehlende oder unzutreffende Planning Coverage; es bewertet keinen unabhängig geprüften Code- oder Live-Stand. Die Zeilen beziehen sich auf die Originaldatei.

| Kandidat · Quelle | Typ | Semantischer Befund und konkrete Korrektur |
| --- | --- | --- |
| SRC-1174.a · Z. 277 | C | MTB **und** Kajak samt Ausrüstung, Touren, Können, Sicherheit und Ideen sind zwei Kategorien mit gleichem Feldumfang. Wortlaut im Register korrekt; INS Z. 412 nennt weder Kategorien noch Felder. In INS als abnehmbare Context-Kategorien aufführen, bei getrennter Pflege MTB/Kajak getrennt nachweisen. **Offen.** |
| SRC-1175.a · Z. 278 | S | „Hund“ samt Reisen, Bedürfnissen, Regeln und Abläufen ist eine eigenständige Context-Kategorie. Register korrekt; INS nennt sie nicht. Kategorie und Felder in INS-Kriterien aufnehmen. **Offen.** |
| SRC-1176.a · Z. 279 | S | „Mission Paris“ umfasst Zielbild, Etappen, Community-Relevanz und Storyline. Register korrekt; in INS fehlt der konkrete Umfang. **Offen.** |
| SRC-1177.a · Z. 281 | C | Endet bei „Quelle bzw.“ und ist kein vollständiger Satz. Statuswerte und Quelle/Beleg als getrennt prüfbare Eintragsfelder formulieren; INS Z. 412 ergänzen. **Offen.** |
| SRC-1177.b · Z. 281–282 | S | „Beleg und eine Aktualitätsangabe“ ist ohne 1177.a kein selbstständiger Anspruch. Beleg gehört zu Quelle/Beleg; Aktualitätsangabe gesondert prüfen. **Offen.** |
| SRC-1177.c · Z. 282–283 | S | Das **Nur-freigegeben-Gate** für spätere automatische Briefings oder KI-Kontexte ist eigenständig und bedingt; „später“ behauptet keine heutige Automatik. In INS bzw. der künftigen Assistenz-Story als Zugriffsschranke verankern. **Offen.** |
| SRC-1178.a · Z. 287–288 | C | Drei bestimmte Secrets, darunter ein zweckgebundener Token-Schlüssel. AUTH ist die falsche Google-Login-Story; YouTube-Verbindungs-Story/INS mit benannten Konfigurationsanforderungen. **Offen.** |
| SRC-1178.b · Z. 288–290 | C | Ablage nur privat; Verbote für `.env.example` **mit Wert**, Git, ungeschützte Backups und Client-Code müssen einzeln erhalten bleiben. Register bewahrt sie; AUTH-Ziel falsch, INS/Verbindungs-Story braucht prüfbare Negativkriterien. **Offen.** |
| SRC-1179.a · Z. 291–292 | S | Refresh-Token-Verschlüsselung nach vorhandenem AES-256-GCM-Muster ist eigenständig. INS Z. 412 nennt nur „verschlüsselt“ und verliert Verfahren und Bezug zu privaten Einstellungen. Präzisieren. **Offen.** |
| SRC-1179.b · Z. 292–293 | S | Schlüsselrotation **nur mit geplantem Re-Encryption-Verfahren** ist eine eigenständige Bedingung. In INS fehlt sie. **Offen.** |
| SRC-1180.a · Z. 294–295 | C | Zwei Grenzen: nur erforderliche Cockpit-Analytics; Kommentarinhalt/Personendaten nur bei neuem, dokumentiertem Bedarf. Nicht mit Website-Tracking verwechseln. INS-Datenerfassungskriterien getrennt ergänzen. **Offen.** |
| SRC-1181.a · Z. 296–297 | C | Für Rohmetriken **und** Audit-Logs ist je eine Frist **vor Go-live zu beschließen**. INS pauschal und OPS Z. 635 nur „Konzept“; Entscheidung, Geltungsbereich und Datum als Gate konkret nachweisen. **Offen.** |
| SRC-1181.b · Z. 297–298 | C | Admin-Export/Löschkonzept und Datenschutztext sind verschiedene Ergebnisse **vor Produktivbetrieb**. OPS Z. 635 teilweise; WEB für öffentlichen Text ergänzen. Nicht als bereits umgesetzt markieren. **Offen.** |
| SRC-1182.a · Z. 299–300 | C | Logmaskierung umfasst fünf konkrete Klassen einschließlich **vollständiger externer Fehler-Payloads**. AUTH-Zuordnung falsch; Cockpit-Betrieb/Verbindung mit Negativtests. **Offen.** |
| SRC-1182.b · Z. 300 | S | Geschützte Datenbankbackups bleiben eine separate Betriebsgrenze. OPS Z. 624–625 statt AUTH zuordnen; Schutz prüfen, keinen historischen Erfolg verallgemeinern. **Offen.** |
| SRC-1183.a · Z. 301 | S | Private Route bleibt hinter HTTPS. Register korrekt; AUTH kann Schutz der Anmeldung berühren, die private Cockpit-Route gehört zusätzlich in INS/Betrieb. **Offen.** |
| SRC-1183.b · Z. 301–302 | S | Keine Cache-Control-Weitergabe privater API-Antworten an Proxies: spezifische Proxy-/Cache-Grenze, durch „no-store“ in AUTH Z. 476 nicht vollständig belegt. Dort und bei Cockpit-API konkret prüfen. **Offen.** |
| SRC-1183.c · Z. 302–303 | C | Rate Limits für **Login und OAuth-Start** bleiben oder werden erweitert; zwei Endpunkte, unterschiedlicher Bestand. AUTH für Login, YouTube-Verbindungs-Story für dessen OAuth-Start; konkrete Tests. **Offen.** |
| SRC-1184.a · Z. 307–309 | C | Vor **YouTube-OAuth Test→Produktion** müssen **beide** öffentlich erreichbaren Seiten auf `https://vanventure.at` existieren. WEB liefert Seiten; OPS hält das Gate. OPS-Wortlaut zur Anwendung berichtigen. **Offen.** |
| SRC-1184.b · Z. 309–310 | C | Konkrete URLs erst **nach redaktioneller und rechtlicher Freigabe** in Google Auth Platform hinterlegen. OPS Z. 635 nennt Rechtstest, nicht klar das redaktionelle Gate und die Reihenfolge. **Offen.** |
| SRC-1184.c · Z. 310–311 | S | URLs dürfen weder Platzhalter noch unveröffentlichte Seiten sein. In WEB/OPS durch öffentliche Abrufprüfung abnehmen; bloße „named URL“ genügt nicht. **Offen.** |
| SRC-1185.a · Z. 313–316 | C | Datenschutzerklärung hat sieben Mindestthemen: Zweck, Leseberechtigungen, verschlüsselte serverseitige Refresh-Token-Ablage, Datenminimierung, Aufbewahrung, Löschung, Kontakt. WEB Z. 105 ist sachfremd; dort Themen und rechtliche Prüfung aufnehmen. **Offen.** |
| SRC-1185.b · Z. 317 | S | Nutzungsbedingungen müssen privaten, **rollenbasierten Cockpit-Zugang** beschreiben. WEB/OPS nennt nur generische Terms; Inhalt ergänzen. **Offen.** |
| SRC-1185.c · Z. 318–319 | S | **Beide** Texte vor Veröffentlichung rechtlich prüfen. OPS Z. 635 teilweise; Ergebnis pro Text in WEB/OPS nachweisen. **Offen.** |
| SRC-1185.d · Z. 319 | S | „Technischer Plan ersetzt keine Rechtsberatung“ ist eine Geltungsgrenze, keine Implementierungs-Story. Im Register erhalten; nicht als erledigbare Produktfunktion zählen. **Offen als Klassifikation.** |
| SRC-1186.a · Z. 321–323 | C | Google-Veröffentlichungsprüfung umfasst App-Name, zwei Kontakte, Homepage, Domain und tatsächlich angeforderte Scopes. OPS Z. 635 deckt nur Teile konkret. Checkliste ergänzen. **Offen.** |
| SRC-1186.b · Z. 323–325 | C | Domainbestätigung **falls erforderlich** und OAuth-/Scope-Verifizierung **falls Google sie verlangt**, jeweils vor Umstellung. OPS formuliert Domainbestätigung unbedingter; Bedingung und Nachweis korrigieren. **Offen.** |
| SRC-1186.c · Z. 325 | S | Bis zur Erfüllung der Gates Testmodus beibehalten. OPS nennt Reihenfolge, sollte den negativen Zustand ausdrücklich nachweisen. **Offen.** |
| SRC-1186.d · Z. 325–326 | C | Testnutzer- **und** erneute Freigabe-Regeln gelten im Zwischenzustand. OPS enthält sie nicht; als zwei prüfbare Google-Konfigurationspunkte ergänzen. **Offen.** |
| SRC-1187.a · Z. 332 | S | „1.“ ist nur Listennummer, **keine Klausel**. Mit 1187.b aus der Kandidatenliste zusammenführen, ohne fachlichen Inhalt zu verlieren. |
| SRC-1187.b · Z. 332–333 | C | Verantwortliche Kanalinhaberin, Kennzahlen, Regionen/Währung und Datenaufbewahrung sind mehrere **verbindliche Phase-0-Entscheidungen**. INS Existing/Verify darf sie nicht stillschweigend als entschieden ausgeben; je Entscheidung und Beleg getrennt planen. **Unresolved, Nutzerentscheidungen nötig.** |
| SRC-1188.a · Z. 334 | S | „2.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1188.b · Z. 334–335 | C | Consent Screen, **Produktions**-Redirect-URI und minimale Scopes sind drei Konfigurationspunkte der YouTube-Verbindung. AUTH verwechselt dies mit Personen-Login. In Verbindungs-Story/OPS mit konkreten Werten prüfen. **Offen.** |
| SRC-1188.c · Z. 335 | S | Google-Datenschutz-/Nutzungsanforderungen zu prüfen ist eigener Phase-0-Schritt. OPS statt AUTH; Ergebnis dokumentieren, keine Google-Anforderung erfinden. **Offen.** |
| SRC-1189.a · Z. 336 | S | „3.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1189.b · Z. 336–337 | C | Cockpit-URL und Ausführungsort des täglichen Jobs im **bestehenden Docker/Contabo-Betrieb** sind getrennte Betriebsfestlegungen. INS Z. 412 behauptet Zeitplan historisch, belegt diese Festlegungen nicht einzeln; INS/OPS nachweisen. **Offen.** |
| SRC-1190.a · Z. 341 | S | „1.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1190.b · Z. 341 | C | Migrationen für `yt_*`, Planner, Context und Audit-Log sind Grundarchitektur, **nicht** EFF Z. 452 (`content_item_metrics`). Auf INS-Grundstand bzw. passende technische Tasks seiner Value Story abbilden. **Offen.** |
| SRC-1190.c · Z. 341–342 | C | Upserts, Fremdschlüssel und Indizes sind drei eigenständig prüfbare Migrationsqualitäten. Mit 1190.b verknüpfen; nicht EFF zuordnen. **Offen.** |
| SRC-1191.a · Z. 343 | S | „2.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1191.b · Z. 343–344 | C | Bestehendes Auth-, CSRF- und Rollenmodell für **beide** Cockpit-Routen wiederverwenden. INS und AUTH berühren dies; Route und Rollen als konkrete Kriterien statt Registerverweis. **Offen.** |
| SRC-1191.c · Z. 344 | S | Automatisierter Rechte-Matrix-Test ist eigenständig. AUTH Z. 476 nennt historisch Rollen/CSRF, aber keinen solchen Test der Cockpit-Routen; ergänzen. **Offen.** |
| SRC-1192.a · Z. 345 | S | „3.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1192.b · Z. 345–346 | C | Verschlüsselte Geheimnis-/Tokenablage, Konfigurationsvalidierung und Logmaskierung sind drei Arbeiten. Inhalt überschneidet 1178/1179/1182; als **Umsetzung und Prüfung derselben Regeln** verlinken, nicht als neue doppelte Anforderungen. INS/Verbindungs-Story, nicht nur pauschaler Bestand. **Offen.** |
| SRC-1193.a · Z. 347 | S | „4.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1193.b · Z. 347–348 | C | Connect, Callback, Kanalbestätigung, Reconnect, Disconnect sowie Tests für ungültigen State, Tokenverlust und falschen Kanal sind mehrere abnehmbare Pfade. AUTH ist Personen-Login; YouTube-Verbindungs-Story mit positiven und negativen Kriterien. **Offen.** |
| SRC-1194.a · Z. 352 | S | „1.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1194.b · Z. 352–353 | C | Data- und Analytics-API-Adapter, Paginierung, Rate/Retry und Response-Mappings sind getrennt prüfbare Sync-Teile. INS nennt Bestand, aber keine einzelnen Grenzen; als Tasks/AC seines Datennutzens rückverfolgen. **Offen.** |
| SRC-1195.a · Z. 354 | S | „2.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1195.b · Z. 354–355 | C | Idempotenz, Datenbanksperre, Run-Protokoll und täglicher Zeitplan sind vier unterschiedliche Sync-Kriterien. INS Z. 412 nennt Sperre/Zeitplan historisch; Idempotenz und Protokoll gezielt nachweisen. **Offen.** |
| SRC-1196.a · Z. 356 | S | „3.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1196.b · Z. 356 | C | Tagesmetriken, **mindestens 35 Tage** Nachzugsfenster und Snapshot-Materialisierung sind getrennte Kriterien. INS erwähnt Tageswerte/Snapshots historisch, nicht das Nachzugsfenster. **Offen.** |
| SRC-1197.a · Z. 357 | S | „4.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1197.b · Z. 357–358 | C | Staging-/Testkanal muss Quoten, Zeitzonen, fehlende Analytics und Datenkorrekturen prüfen. INS nennt „automatisierte Tests“ nur allgemein; vier Fälle konkret zuordnen. **Offen.** |
| SRC-1197.c · Z. 358 | S | **Kein Live-Token in Tests** ist eigenständiges Verbot; als Test-/Konfigurationsgrenze bei INS/Verbindung aufnehmen. **Offen.** |
| SRC-1198.a · Z. 362 | S | „**Produktionsstand, 22.“ ist ein abgebrochener Datums-/Statusmarker, keine Klausel. Mit 1198.b zusammenführen. |
| SRC-1198.b · Z. 362 | S | Historische Aussage „Oberfläche ist umgesetzt“ gilt **zum 22.09.2026**, ohne heutige Neuprüfung. INS Existing/Verify statt EFF Planned; Datierung erhalten. **Offen als Statusnachweis.** |
| SRC-1198.c · Z. 363–364 | C | Der **eine** GCS-Planer-Eintrag hat Status `briefed`, verbindlichen Brief und **24 geschätzte** Stunden. Nicht in tatsächliche Stunden oder Effizienzerfolg umdeuten. Historischen Bestand in INS; EFF darf nur darauf aufbauen. **Offen.** |
| SRC-1198.d · Z. 364–365 | S | Zehn **freigegebene** GCS-Fakten sind datierter Master-Context-Bestand. INS statt EFF, heutige Existenz gesondert verifizieren. **Offen.** |
| SRC-1198.e · Z. 365–366 | C | Verweist auf technische Restaufgaben und **zwei noch ungebrieste Tests** im Gesamtplan. Weder EFF noch Registerwortlaut identifizieren deren heutige Task-Kennungen oder Status. Verweise konkret nachziehen; keine Erledigung ableiten. **Offen.** |
| SRC-1199.a · Z. 368 | S | „1.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1199.b · Z. 368 | C | Dashboard, Videos, Sync-Status und Fehlerzustände sind **Cockpit-Ansichten**, nicht Familien-Board oder Warnungs-Inbox. BRD-01/03-Zuordnung entfernen; INS mit vier sichtbaren Zuständen und aktuellem Verifikationsstatus. **Offen.** |
| SRC-1200.a · Z. 369 | S | „2.“ ist nur Listennummer; mit Inhalt verknüpfen. |
| SRC-1200.b · Z. 369–370 | C | Content Planner braucht Jahresansicht, **zwölf Longform-Startslots**, Statusfluss und Videoverknüpfung. EFF Z. 452 behandelt spätere Ziel-/Ist-Auswertung; Basis-Planner zu INS bzw. passender Planner-Story, vier Merkmale einzeln prüfen. **Offen.** |

### Duplikate, Konflikte und Entscheidungen

- **Duplikate mit unterschiedlicher Rolle:** SRC-1178/1179/1182 liefern Sicherheitsregeln; SRC-1192 verlangt deren Implementierung. SRC-1181/1184/1185 betreffen überlappende Datenschutztexte und Aufbewahrung, aber mit verschiedenen Fristen und Inhalten. SRC-1190–1197 sind Phasenarbeiten zu denselben Funktionen, die INS als historischen Bestand zusammenfasst. Regel, Umsetzung, Test und historischer Nachweis müssen verknüpft bleiben; sie dürfen weder als vier unabhängige Produktanforderungen gezählt noch durch einen Registerverweis als erledigt markiert werden.
- **Statuskonflikt:** Die Matrix weist allen 27 Blöcken „Existing / Verify“ zu, obwohl SRC-1184–1188 ausdrückliche Vorbedingungen und Entscheidungen enthalten und SRC-1198 einen datierten Produktionsstand beschreibt. ST-OPS-02 ist „Blocked“, ST-INS-05 „Planned“. Diese Unterschiede je Klausel abbilden.
- **Release-Gate:** [release-decisions.md](D:/work/_venventure/docs/scrum-migration/release-decisions.md:7) verlangt für jeden konkreten Veröffentlichungsumfang ausdrückliche Freigabe; Tests und Planprüfung erteilen sie nicht. Die rechtliche Textfreigabe und Google-Produktionsumstellung sind zusätzlich eigenständige Gates. Keine der historischen Formulierungen in SRC-1198 belegt eine Freigabe für einen heutigen Release.

**Konkrete offene Nutzerfragen zu SRC-1187/1181:** Wer ist verbindlich verantwortliche Google-Kanalinhaberin, welche Kennzahlen sowie Regionen/Währung sollen gelten, und welche Aufbewahrungsfristen sollen für Rohmetriken und Audit-Logs vor Go-live beschlossen werden? Bis diese Werte mit Entscheidung und Quelle vorliegen, bleiben die entsprechenden Phase-0- und Produktions-Gates **Unresolved**. Alle übrigen 64 Kandidaten sind oben unabhängig davon geprüft.