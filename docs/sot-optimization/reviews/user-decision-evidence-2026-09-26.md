# WI-SOT-15-07 – lokaler Nachweisadapter für importierte Nutzerentscheidungen

## Umfang und Vertrauensgrenze

`tools/sot/user-decision-evidence.mjs` liefert einen synchronen Prüfer für die
bestehenden Decision-State- und SoT-Write-Callbacks. Vertrauenswürdige
Orchestrierung muss ausdrücklich die absoluten Importmanifest-Pfade und ihre
SHA-256-Werte liefern. Der Adapter entdeckt keine Vertrauensanker aus dem
Repository und leitet keine Berechtigung aus einem selbst behaupteten Nutzernamen ab.

Jedes Manifest bindet Originaldatei und Originalbytes, Originalreferenz,
beobachteten Autor mit Rolle USER, exakten Wortlaut mit UTF-8-Byteposition,
Entscheidungsdatum mit tatsächlicher Genauigkeit sowie getrennten Importzeitpunkt.
Sein Binding enthält exakt Proposal-ID, kanonischen Proposal-Inhaltshash, Aktion, Actor, Evidence und gegebenenfalls
Konfliktentscheidung. Der Evidence-Scope muss genau die Proposal-ID nennen.
Die Zuordnung des Originalwortlauts zum vorgeschlagenen Umfang muss der
vertrauenswürdige Importeur prüfen; der Adapter behauptet keine automatische
semantische Interpretation einer Nutzerzustimmung.

Bei jedem Aufruf werden Manifest und Originaldatei neu gelesen und geprüft.
Veraltete oder manipulierte Bytes, abweichende Entscheidungen und fehlende
Vertrauensanker führen zu Ablehnung. Die Importintegrität ist keine digitale
Nutzersignatur. Es wurden keine echten Zustimmungen erzeugt oder importiert.

## Prüfung und Grenzen

Reproduzierbarer Check:
`node --test tools/sot/user-decision-evidence.test.mjs`.
Die neun synthetischen Fälle prüfen genaue Bindung, Manipulation beider
Dateien, Scope-/Actor-/Aktionsabweichung, falsche Quellenzitate, fehlende
Vertrauenswurzeln und Erhalt einer nur taggenau bekannten Entscheidung.
Ein realer temporärer Decision Store bestätigt zusätzlich, dass geänderter Inhalt
unter derselben Proposal-ID keine vorhandene Autorisierung wiederverwenden kann.
Decision Store und SoT-Schreibgrenze berechnen den Inhaltshash selbst aus dem
tatsächlichen Proposal. Nur Lifecycle-Felder status/approval/rejection/supersession
werden beim Hash ausgelassen; Inhalt, Eigentümer, Ziel und vorhandene Baselinefelder
bleiben gebunden.

Taggenaue Altentscheidungen werden mit ausdrücklichem `date_precision: date`
erhalten. Ein Integrationstest mit dem angepassten Approval-Lifecycle persistiert
diese Genauigkeit und prüft den erneut geladenen Entscheidungsdatensatz mit dem
echten Adapter. Kein erfundener Mitternachtszeitpunkt wird eingesetzt.

Vertrauensankerbeschaffung, authentische Originalimporte und die tatsächliche
Orchestrator-Anbindung bleiben gesondert nachzuweisen. Die erneute Dateiprüfung
erkennt gewöhnliche Änderungen während des Aufrufs, ersetzt aber keine
prozessübergreifende Schreibsperre. Das Modul verändert weder Scrum-Core noch
Fachregeln und erteilt keine Design-, Release- oder Live-Freigabe.
