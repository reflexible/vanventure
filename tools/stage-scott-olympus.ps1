$ErrorActionPreference = 'Stop'

$archive = 'E:\_fotos_original\_eigene_fotos\_olympus_M1\2020\2020-10-13'
$target = 'D:\work\_venventure\review\selected-originals\scott-genius'
$files = @('PA131105.JPG', 'PA131111.JPG', 'PA131104.JPG')

$resolvedTarget = (Resolve-Path -LiteralPath $target).Path
if ($resolvedTarget -ne $target) { throw "Unexpected target path: $resolvedTarget" }
if ((Get-Item -LiteralPath $target).LinkType) { throw 'Target is a link' }

foreach ($name in $files) {
    $source = Join-Path $archive $name
    $destination = Join-Path $target $name
    $sourceItem = Get-Item -LiteralPath $source
    if ($sourceItem.LinkType) { throw "Source is a link: $source" }
    $before = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()
    if (Test-Path -LiteralPath $destination) {
        $existing = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($existing -ne $before) { throw "Existing project copy differs: $destination" }
    } else {
        Copy-Item -LiteralPath $source -Destination $destination -ErrorAction Stop
    }
    $copy = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
    $after = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($before -ne $copy -or $before -ne $after) { throw "Hash mismatch: $name" }
    [pscustomobject]@{ Name=$name; Bytes=$sourceItem.Length; Sha256=$before; SourceUnchanged=($before -eq $after); CopyMatches=($before -eq $copy) }
}

# A same-named earlier project file is visibly damaged; preserve it and use
# a distinct unchanged copy of the actual archive source.
$italySource = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1712.JPG'
$italyDestination = Join-Path $target 'DSC_1712-archive.JPG'
$italyBefore = (Get-FileHash -LiteralPath $italySource -Algorithm SHA256).Hash.ToLowerInvariant()
if (Test-Path -LiteralPath $italyDestination) {
    $italyCopy = (Get-FileHash -LiteralPath $italyDestination -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($italyCopy -ne $italyBefore) { throw "Existing project copy differs: $italyDestination" }
} else {
    Copy-Item -LiteralPath $italySource -Destination $italyDestination -ErrorAction Stop
}
$italyCopy = (Get-FileHash -LiteralPath $italyDestination -Algorithm SHA256).Hash.ToLowerInvariant()
$italyAfter = (Get-FileHash -LiteralPath $italySource -Algorithm SHA256).Hash.ToLowerInvariant()
if ($italyBefore -ne $italyCopy -or $italyBefore -ne $italyAfter) { throw 'Hash mismatch: DSC_1712 archive' }
[pscustomobject]@{ Name='DSC_1712-archive.JPG'; Bytes=(Get-Item -LiteralPath $italySource).Length; Sha256=$italyBefore; SourceUnchanged=($italyBefore -eq $italyAfter); CopyMatches=($italyBefore -eq $italyCopy) }
