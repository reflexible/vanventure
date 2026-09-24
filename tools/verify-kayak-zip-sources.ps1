# Read-only verification of ZIP members named in the existing kayak source list.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = Split-Path -Parent $PSScriptRoot
$entries = Get-Content -LiteralPath (Join-Path $projectRoot 'docs\kajak-galerie-bildquellen.json') -Raw | ConvertFrom-Json
$checked = 0
foreach ($group in @($entries | Where-Object { $_.source_path -like '*::*' } | Group-Object { ($_.source_path -split '::', 2)[0] })) {
    $archivePath = $group.Name
    $archive = [System.IO.Compression.ZipFile]::OpenRead($archivePath)
    try {
        foreach ($entry in $group.Group) {
            $memberName = ($entry.source_path -split '::', 2)[1]
            $member = $archive.GetEntry($memberName)
            if (-not $member) { throw "ZIP member missing: $archivePath::$memberName" }
            $stream = $member.Open()
            try {
                $sha = [System.Security.Cryptography.SHA256]::Create()
                try { $actual = [Convert]::ToHexString($sha.ComputeHash($stream)).ToLowerInvariant() }
                finally { $sha.Dispose() }
            }
            finally { $stream.Dispose() }
            if ($actual -ne $entry.sha256.ToLowerInvariant()) {
                throw "ZIP member hash mismatch: $archivePath::$memberName"
            }
            $checked++
        }
    }
    finally { $archive.Dispose() }
}
Write-Output "Verified $checked ZIP member hashes without extraction."
