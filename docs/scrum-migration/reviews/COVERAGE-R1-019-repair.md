Die gezielte Planungsreparatur für **COVERAGE-R1-019** ist in den zentralen Migrationsunterlagen eingetragen. Ich habe die Originalquellen SRC-1092–SRC-1103 mit den aktuellen Zielstellen verglichen und belegte AC für serverseitigen Sync, Datenqualitätsanzeigen, Konten- und Sitzungsschutz, die bedingte Rechte-Matrix sowie den OAuth-Einstieg ergänzt. Die Rechte-Matrix bleibt ein Vorschlag; `analytics_viewer` wird nicht als bestehende Rolle behandelt.

**Im geprüften Umfang:** 15 Klauseln sind planerisch gedeckt, ein Listenmarker ist Kontext. Die Fortschrittsaktualisierung lief; die Strukturprüfung bestand mit 2.908/2.908 geprüften ursprünglichen Kandidaten. Das ist keine Implementation Verification oder Live-Abnahme.

**Verbleibende Nutzerfrage – SRC-1094.a:** Soll das ältere Verbot einer Google-Anmeldung für Cockpit-Nutzer ausdrücklich durch die spätere, an die Allowlist gebundene Google-Anmeldung ersetzt sein? Das Verbot öffentlicher Registrierung und von Einladungs-URLs bleibt dabei bestehen.

**Verbleibende Deckungslücke:** keine weitere im Umfang von COVERAGE-R1-019 identifiziert. Der globale Migrationscheck bleibt offen.