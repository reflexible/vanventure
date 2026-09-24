$ErrorActionPreference = 'Stop'

$projectRoot = 'D:\work\_venventure'
$destinationRoot = Join-Path $projectRoot 'review\selected-originals'
$selections = @(
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\P7050273.jpg'; Title = 'Wanderung im Hochland'; Editing = 'Editorial-Motiv: natürliche Licht- und Farbkorrektur, Person unverändert' },
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\P7050295.jpg'; Title = 'Julie am Bergsee'; Editing = 'Dokumentarisch, nur Licht, Weißabgleich und lokale Kontrastbalance' },
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\P7050302.jpg'; Title = 'Wolken über dem Fjord'; Editing = 'Landschaft, bewölkte Stimmung und natürliche Tiefen bewahren' },
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\trolltunga_early_2018-07-06\P7060417.jpg'; Title = 'Rast auf der Trolltunga-Tour'; Editing = 'Editorial-Motiv: keine Änderung von Person, Kleidung oder Ausrüstung' },
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\2018-07-10\P7100481.jpg'; Title = 'Blick über den Lysefjord'; Editing = 'Weite, Wasserfarbe und Felsstruktur natürlich erhalten' },
    @{ Trip = 'norwegen-2018'; Source = 'E:\_fotos_original\urlaubsSammlungen\norwegen\2018-07-10\P7100486.jpg'; Title = 'Preikestolen'; Editing = 'Weite, Wasserfarbe und Felsstruktur natürlich erhalten' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0268.JPG'; Title = 'Bucht an der Westküste'; Editing = 'Natürliches Mittelmeerlicht, keine künstliche Sättigung' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0273.JPG'; Title = 'California am Meer'; Editing = 'Nach Freigabe Kennzeichen in der Webableitung anonymisieren' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0279.JPG'; Title = 'Mountainbike am Meer'; Editing = 'Farb- und Lichtkorrektur, Motiv vollständig erhalten' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0280.JPG'; Title = 'Abendessen unterwegs'; Editing = 'Editorial-Motiv: Gesicht, Proportionen, Kleidung und Umgebung unverändert' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0291.JPG'; Title = 'Küste bei Cala Gonone'; Editing = 'Natürliches Mittelmeerlicht, keine künstliche Sättigung' },
    @{ Trip = 'sardinien-2019'; Source = 'E:\_fotos_original\urlaubsSammlungen\sardinien2019\handy\DSC_0307.JPG'; Title = 'Agriturismo unter Korkeichen'; Editing = 'Warme, realistische Nachmittagsstimmung; Personen nicht verändern' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_0003_5.JPG'; Title = 'Lago di Ledro'; Editing = 'Bergsee, natürliche Tiefen und zurückhaltende Farben' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1703.JPG'; Title = 'Abend am Lago di Ledro'; Editing = 'Bergsee, natürliche Tiefen und zurückhaltende Farben' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1719.JPG'; Title = 'Abend am Campingtisch'; Editing = 'Warmes Abendlicht, Personen und Alltagssituation unverändert' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1744.JPG'; Title = 'Hügel der Toskana'; Editing = 'Landschaft, zurückhaltender Kontrast und echte Farben' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1759.JPG'; Title = 'Blick zur Amalfiküste'; Editing = 'Landschaft, zurückhaltender Kontrast und echte Farben' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1805.JPG'; Title = 'Leuchtturm an der Adria'; Editing = 'Landschaft, zurückhaltender Kontrast und echte Farben' },
    @{ Trip = 'italien-2021'; Source = 'E:\_fotos_original\urlaubsSammlungen\italien_rundtrip_2021\handy_fotos_helmut\DSC_1809.JPG'; Title = 'Campo Imperatore'; Editing = 'Landschaft, Wetterstimmung und Relief bewahren' }
)

$manifest = foreach ($selection in $selections) {
    $tripDestination = Join-Path $destinationRoot $selection.Trip
    New-Item -ItemType Directory -Force -Path $tripDestination | Out-Null
    $destination = Join-Path $tripDestination ([IO.Path]::GetFileName($selection.Source))
    $sourceHash = (Get-FileHash -LiteralPath $selection.Source -Algorithm SHA256).Hash.ToLowerInvariant()
    if (Test-Path -LiteralPath $destination) {
        $copyHash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($copyHash -ne $sourceHash) { throw "Unveränderte Projektkopie weicht ab: $destination" }
    } else {
        Copy-Item -LiteralPath $selection.Source -Destination $destination
        $copyHash = (Get-FileHash -LiteralPath $destination -Algorithm SHA256).Hash.ToLowerInvariant()
        if ($copyHash -ne $sourceHash) { throw "Kopie-Prüfsumme weicht ab: $destination" }
    }
    [pscustomobject]@{
        trip = $selection.Trip
        title = $selection.Title
        source_path = $selection.Source
        unchanged_project_copy = $destination
        sha256 = $sourceHash
        editing_brief = $selection.Editing
    }
}

$manifest | ConvertTo-Json -Depth 3 | Set-Content -LiteralPath (Join-Path $projectRoot 'review\selected-originals-manifest.json') -Encoding utf8
Write-Output "Staged $($manifest.Count) unchanged originals."
