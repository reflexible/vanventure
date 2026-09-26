# WSJF Rule-Catalogue-Korrektur – begrenzter FULL CHECK

Der erste WSJF-Autoritätscommit hatte die verpflichtende partielle Coverage-Deklaration im Rule Catalogue noch nicht ergänzt. Dadurch blockierten Rule-Catalogue- und SoT-Impact-Prüfung korrekt.

Diese Korrektur ergänzt zwei geprüfte WSJF-Regelzitate und die zugehörige partielle Coverage. Der FULL CHECK umfasst ausschließlich WSJF, SoT-Architektur, Registry, Contract-Katalog, Rule Catalogue und `WI-SOT-19-01`. Ergebnis: `FULL_CHECK_PASS`.

Reproduzierbar: `node --test tools/sot/rule-catalogue.test.mjs tools/sot/sot-impact.test.mjs tools/sot/wsjf-authority.test.mjs tools/sot/wsjf.test.mjs`. Keine WSJF-Ausführung, Analytics-Aktivierung, Scrum-Core-Änderung oder Produktfreigabe ist enthalten.