# WI-SOT-23-05 – Fachmodule aufgebaut

Status: `LOCAL_MODULE_BUILD_PASS` · Stand: 26. September 2026.

## Ergebnis

Die Modulregistry enthält elf prüfbare Quellen. Neun Einträge sind aktive
Autoritäten mit genau einem Authority-Key. Die beiden vorhandenen Quellen für
Board und Video sind als `scoped_reference` aufgebaut:

| Referenzmodul | Quelle | Eigentümer | Schutz vor zweiter Autorität |
| --- | --- | --- | --- |
| `board-architecture` | `docs/VanVenture-Hauptentwicklungsplan-mit-Marvin-Scrum-Board.md` | `scrum-core` | `authority: null`; Board-Produktregeln, Phase-0-Entscheidungen und Release-Gates bleiben im Core. |
| `video-production` | `docs/creator-system.md` | `scrum-core` | `authority: null`; konkrete Aussagen bleiben im jeweiligen Produktionsbrief und die Veröffentlichungsfreigaben im Core. |

Der Validator verlangt bei jeder `scoped_reference` einen gültigen
`reference_key`, einen bestehenden, von ihr verschiedenen `owner_module` und
verbietet einen Authority-Key. Das verhindert, dass Board- oder Videoquellen
unbemerkt als gleichrangige Regelautorität verwendet werden.

## Reproduzierbare Prüfung

```text
node tools/sot/module-registry.mjs
node tools/sot/contracts.mjs
node --test tools/sot/module-registry.test.mjs tools/sot/contracts.test.mjs
```

Erwarteter Befund: valide Registry mit elf Modulen, fünf bilaterale Contracts
und 13 bestandene Tests. Die Prüfung umfasst keine Produktfunktion, keinen
Release und keine Live-Validierung.

## Bewusst nicht Bestandteil

Es wurde keine Core-Klausel entfernt, kein Fachdetail kopiert und keine
Board-, Video-, CMS-, Analytics- oder Website-Funktion verändert.
`WI-SOT-23-06` bleibt offen, weil eine abschnittsgenaue Übernahme und ein
Golden-Baseline-Delta je möglicher Core-Reduktion vorausgesetzt sind.
