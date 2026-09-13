param([ValidateSet('alle','norwegen','sardinien','italien')][string]$Reise='alle')
$ErrorActionPreference='Stop'
$nodeCommand=Get-Command node -ErrorAction SilentlyContinue
$runtimeRoot=Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$nodeExe=if($nodeCommand){$nodeCommand.Source}else{Join-Path $runtimeRoot 'node.exe'}
if(-not(Test-Path -LiteralPath $nodeExe)){throw 'Node.js fehlt. Bitte Node.js installieren oder die direkten Fotolinks verwenden.'}
$npmCommand=Get-Command npm.cmd -ErrorAction SilentlyContinue
$npmExe=if($npmCommand){$npmCommand.Source}else{Join-Path (Split-Path $nodeExe) 'npm.cmd'}
Push-Location $PSScriptRoot
try {
  $bundledPlaywright=Join-Path (Split-Path (Split-Path $nodeExe)) 'node_modules\playwright\package.json'
  if(-not(Test-Path -LiteralPath (Join-Path $PSScriptRoot 'node_modules\playwright\package.json')) -and -not(Test-Path -LiteralPath $bundledPlaywright)){
    if(-not(Test-Path -LiteralPath $npmExe)){throw 'npm fehlt. Bitte Node.js mit npm installieren.'}
    & $npmExe install --no-audit --no-fund
    if($LASTEXITCODE -ne 0){throw 'Playwright konnte nicht installiert werden.'}
  }
  $downloadArgs=@('download.cjs')
  if($Reise -ne 'alle'){$downloadArgs+="--reise=$Reise"}
  & $nodeExe @downloadArgs
  if($LASTEXITCODE -ne 0){throw 'Nicht alle Fotos wurden geladen. Siehe reisebilder-originale\download-ergebnis.json.'}
} finally {Pop-Location}
