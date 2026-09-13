# Ausgewählte Reisebilder herunterladen

Das Skript lädt nur die in der lokalen Bildauswahl aufgeführten Fotos. Es öffnet dafür ein eigenes Chrome-Profil und verwendet das sichtbare Google-Fotos-Menü „Herunterladen“. Keine Albumänderungen, keine Freigaben, keine Löschungen. Das vorhandene Chrome-Profil wird nicht gelesen.

Im Terminal im Projektordner:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\photo-download\Download-Reisebilder.ps1
```

Nur eine Reise:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\tools\photo-download\Download-Reisebilder.ps1 -Reise norwegen
```

Beim ersten Start wird Playwright installiert. Chrome muss vorhanden sein. Im geöffneten Fenster bei Google Fotos anmelden und danach im Terminal Enter drücken. Die Bilder landen unter `reisebilder-originale`, nach Reise sortiert, mit erhaltenen Original-Dateinamen und einer Nummer davor. Bereits erfolgreich gespeicherte Bilder werden beim erneuten Start übersprungen.

Falls Google die Anmeldung im automatisierten Fenster verhindert, die direkten Links in der Browser-Bildauswahl öffnen und über „Weitere Optionen → Herunterladen“ speichern. Die normalen Foto-Seitenlinks sind keine direkten Bilddatei-URLs; sie können nicht einfach mit curl heruntergeladen werden.

Die Google Photos Library API erlaubt seit 31. März 2025 den bisherigen Lesezugriff auf die gesamte Fotobibliothek nicht mehr. Die offizielle Alternative ist der Picker mit OAuth-Einrichtung und ausdrücklicher Bildauswahl. Für diese einmalige Auswahl verwendet dieses Skript deshalb die normale Oberfläche. Quellen: [Google API-Änderungen](https://developers.google.com/photos/support/updates), [Google Download-Hilfe](https://support.google.com/photos/answer/7652919?co=GENIE.Platform%3DDesktop&hl=de).

Geprüft: Skriptsyntax und Auswahlmanifest. Der vollständige Download mit deiner Anmeldung wurde nicht ausgeführt. Änderungen an der Google-Fotos-Oberfläche können die Bedienung im Skript beeinflussen.
