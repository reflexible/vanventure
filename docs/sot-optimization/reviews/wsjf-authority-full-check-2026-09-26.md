# WSJF-Fachmodul – begrenzter FULL CHECK

## Scope

Der Check betrifft ausschließlich das neue Fachmodul `docs/governance/wsjf.md`, seinen Registry-Eintrag und die graphisch betroffenen SoT-Referenzen. Der Golden Scrum Core, Contracts, Website, Analytics-Runtime und ein historischer Planwechsel liegen außerhalb dieses Scopes.

## Ergebnis

`⚠ FULL CHECK REQUIRED` wurde wegen der neuen Governance-Autorität ausgelöst und mit `FULL_CHECK_PASS` bestanden. Geprüft wurden:

- Registry und Contract-Katalog gegen die tatsächlichen Repositorydateien;
- der aus Registry, Contracts und Execution Backlog gebaute Dependency Graph;
- der eindeutige `wsjf`-Eintrag samt Quelle, 67-Abschnitts-Dispositionsmatrix und `NOT_AUTHORIZED`-Ausführungsgrenze;
- die Zuordnung zu `WI-SOT-19-01`.

Der Ergebnisdatensatz bindet die Hashes von WSJF-Modul, Registry, Contracts und Execution Backlog. Reproduzierbar: `node --test tools/sot/wsjf-authority.test.mjs tools/sot/wsjf.test.mjs tools/sot/module-registry.test.mjs tools/sot/contracts.test.mjs`.

## Grenzen

Der Check zertifiziert die Fachmodul-Autorität und ihre Schutzgrenzen. Er zertifiziert keine automatische Bewertung realer Produktstories, Persistenz, Queue-/Controller-Aktivierung, Analytics-Aktivierung oder produktive Ausführung.