# Abnahmebericht – WI-SOT-30-02 Fremde Änderungen respektieren

Stand: 26. September 2026.

| Kriterium | Ergebnis | Nachweis |
| --- | --- | --- |
| Bestehende Arbeit schützen | Jeder im Preflight vorhandene Eintrag ist geschützt. | `guardForeignChanges` |
| Schreibkonflikt stoppen | Ein geplanter Pfad, der eine geschützte Datei oder deren Ordner überlappt, blockiert. | Test `blocks a write scope that overlaps a protected file or directory` |
| Fremde Änderung sichtbar halten | Fehlende oder im Git-Status abweichende geschützte Einträge blockieren. | Test `blocks disappearance or status drift of a protected entry` |
| Keine automatische Mutation | Der Guard liest nur Snapshots; er staged, löscht, restauriert oder überschreibt nichts. | Code-Review; alle Tests |

**Lokaler Status:** bestanden. Der Guard benötigt einen expliziten
Preflight-Snapshot und einen expliziten Schreibbereich. Er ersetzt weder
Nutzerentscheidungen noch die spätere kontrollierte Integration.
