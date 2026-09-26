# Abnahmebericht – Rule-Catalogue-Regression für Core-gebundene Referenzen

Stand: 26. September 2026.

## Ergebnis

**Status: LOCAL_VERIFIED.** Der Regelkatalogtest verglich seine neun
`partial_modules` fälschlich mit allen elf Registry-Einträgen. Die Registry
enthält jedoch neun `active_reference`-Autoritäten sowie zwei bewusste
`scoped_reference`-Einträge: `board-architecture` und `video-production`.
Diese beiden Referenzen besitzen keine Authority und keine eigene
Regel-Coverage. Der Test leitet seine Erwartung nun aus den
`active_reference`-Einträgen ab und prüft damit die deklarierte
Fail-closed-Grenze statt einer veralteten absoluten Anzahl.

## Prüfumfang

| Prüfung | Ergebnis |
| --- | --- |
| Registry | 11 Einträge: 9 aktive Autoritäten und 2 Core-gebundene Referenzen. |
| Rule Catalogue | 21 quellengeprüfte Regeln, ein vollständiger Pilotabschnitt und neun partielle Autoritätsabdeckungen. |
| Regression | Der Test akzeptiert keine fehlende aktive Autorität, verlangt aber bewusst keine Coverage für scoped references. |
| Scope | Keine Regelquelle, Registry, Contract, Core-Planung, Website- oder Betriebsfunktion wurde verändert. |

## Reproduzierbare Checks

```text
node tools/sot/rule-catalogue.mjs
node --test tools/sot/rule-catalogue.test.mjs tools/sot/sot-impact.test.mjs
node --test tools/sot/*.test.mjs
node tools/sot/progress.mjs --check
node deploy/plan-consistency.mjs
```

Die breite Suite muss nach dieser Korrektur vollständig bestehen. Dies ist
eine lokale Governance-Testkorrektur, keine Release- oder Live-Freigabe.
