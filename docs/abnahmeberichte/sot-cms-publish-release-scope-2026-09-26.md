# Abnahmebericht – WI-SOT-04-10: CMS-Publishing-Release-Scope-Teilslice

Stand: 26. September 2026.

## Ergebnis und Grenze

**Status: LOCAL_VERIFIED_PARTIAL.** Der tatsächliche CMS-Endpoint
`POST /api/stories/:slug/publish` veröffentlicht nicht mehr allein nach
Administratorrolle und Draft-Revision. Er validiert den Contract
`CMS-PUBLISHING` gegen einen serverseitig beim Start gelesenen
`EDITOR_RELEASE_APPROVALS`-Eintrag. Dieser Eintrag bindet den konkreten
`scope_ref` und die `approval_ref` an genau die Content-ID, Revision sowie
die bestätigten Content-, Privacy- und Image-Gates. Ohne passenden Eintrag
bleibt der Publish fail-closed.

Der erfolgreiche Publish schreibt Scope- und Freigabereferenz im selben
PostgreSQL-Commit in `published` und legt einen sicheren Cockpit-Audit-Eintrag
an. Der Browser kann keinen Freigabe-Eintrag erstellen oder ausweiten; er kann
nur einen für genau den aktuellen Bericht und die aktuelle Revision bereits
serverseitig hinterlegten Eintrag auswählen.

Dies ist kein realer Content- oder Produktionsrelease. Für `vanventure.at`
fehlt die ausdrückliche Nutzerfreigabe eines konkreten Deployments nach
`DEC-REL-001`; wegen der additiven Datenbankschemaänderung wäre davor zudem
der vorgeschriebene geschützte Datenbank-Dump zu erstellen. Analytics bleibt
unverändert aktivierungsblockiert. `WI-SOT-04-10` bleibt deshalb
`IN_PROGRESS`.

## Prüfmatrix

| Fall | Ergebnis |
| --- | --- |
| Administrator fragt passende Scopes für aktuelle Revision ab | PASS – nur exakt passende Scope-/Freigabereferenzen werden angeboten. |
| Redaktion fragt Scope ab | PASS – Zugriff wird verweigert. |
| Publish ohne Scope | PASS – vor jeder Zustandsänderung abgewiesen. |
| Gültiger serverseitiger Scope für identischen Inhalt und Revision | PASS – Publish erfolgreich; Scope und Freigabereferenz werden atomar gespeichert. |
| Scope für andere Revision, anderen Inhalt oder fehlende Gates | PASS – Contract-Invariante verweigert den Publish. |
| Web-Analytics | BLOCKED – keine Aktivierungsgrenze oder Freigabe implementiert. |

## Reproduzierbare Prüfungen

```text
node --test editor/server.test.mjs editor/postgres.test.mjs tools/sot/contract-invariants.test.mjs
node tools/sot/module-registry.mjs
node tools/sot/contracts.mjs
node --test tools/sot/*.test.mjs
node tools/sot/progress.mjs --check
node deploy/plan-consistency.mjs
```

Lokale gezielte Prüfung: **12/12 PASS**. Registry und Contract-Katalog:
**PASS**. Die vollständige SoT-Suite besteht mit **349/349 PASS**;
Fortschrittszähler (`205 / 204 / 1 / 0 / 0`) und Planabgleich über 65
registrierte Quellen bestehen ebenfalls.
