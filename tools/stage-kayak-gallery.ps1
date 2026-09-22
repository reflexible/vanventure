$ErrorActionPreference = 'Stop'

$projectRoot = 'D:\work\_venventure'
$copyRoot = Join-Path $projectRoot 'review\selected-originals\kajak'
$zipSource = 'D:\work\Photos-1-001.zip'
$heicConverter = 'C:\Users\helmu\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\libheif\libheif\bin\heif-convert.exe'

New-Item -ItemType Directory -Force -Path $copyRoot | Out-Null

$sources = @(
  @{ Name = 'p7020146.jpg'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\P7020146.jpg'; Title = 'Riverstar am Aurlandsfjord'; Brief = 'Dokumentarisch; nur Webformat erzeugen. Auf sichtbare Kennzeichen prüfen.' },
  @{ Name = 'dsc-1546.jpg'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\handy_sabine\DSC_1546.jpg'; Title = 'Unterwegs mit dem Riverstar'; Brief = 'Dokumentarisch; nur Webformat erzeugen. Auf sichtbare Kennzeichen prüfen.' },
  @{ Name = 'img-4714.heic'; Source = 'D:\work\IMG_4714.heic'; Title = 'Kajakmoment unterwegs'; Brief = 'Dokumentarisch; HEIC unverändert als Projektkopie bewahren, daraus Web-JPEG erzeugen.' }
)

$records = foreach ($item in $sources) {
  $destination = Join-Path $copyRoot $item.Name
  Copy-Item -LiteralPath $item.Source -Destination $destination -Force
  [pscustomobject]@{
    collection = 'kajak-gallery'
    title = $item.Title
    source_path = $item.Source
    unchanged_project_copy = $destination
    sha256 = (Get-FileHash -LiteralPath $item.Source -Algorithm SHA256).Hash.ToLowerInvariant()
    editing_brief = $item.Brief
  }
}

$zipDestination = Join-Path $copyRoot 'photos-1-001'
Remove-Item -LiteralPath $zipDestination -Recurse -Force -ErrorAction SilentlyContinue
Expand-Archive -LiteralPath $zipSource -DestinationPath $zipDestination -Force
$records += Get-ChildItem -LiteralPath $zipDestination -File | Where-Object { $_.Extension -match '^\.(jpg|jpeg|heic)$' } | ForEach-Object {
  [pscustomobject]@{
    collection = 'kajak-gallery'
    title = "Archivfoto: $($_.BaseName)"
    source_path = "D:\\work\\Photos-1-001.zip::$($_.Name)"
    unchanged_project_copy = $_.FullName
    sha256 = (Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
    editing_brief = 'Dokumentarisch; unveränderte entpackte Projektkopie aus dem gelieferten Archiv. Auf sichtbare Kennzeichen prüfen.'
  }
}

$galleryOriginals = Join-Path $projectRoot 'docs\kajak-galerie-bildquellen.json'
$records | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath $galleryOriginals -Encoding utf8
Write-Output "Staged $($records.Count) unchanged kayak-gallery originals."
