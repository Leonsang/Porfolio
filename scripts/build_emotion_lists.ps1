param(
  [string]$Root = "C:\\Users\\EYN\\Desktop\\Portfolio\\public\\images",
  [string[]]$Folders = @("1","2","3"),
  [string]$Prefix = "athena",
  [string]$OutDir = "gifs",
  [int]$NeutralN = 6,
  [int]$TalkN = 6
)

$paths = @()
foreach ($f in $Folders) { $paths += (Join-Path $Root $f) }
$outPath = Join-Path $Root $OutDir
New-Item -ItemType Directory -Force -Path $outPath | Out-Null

$neu = Get-ChildItem -LiteralPath $paths -File -Filter "$Prefix`_neutral_*.png" -ErrorAction SilentlyContinue | Sort-Object FullName | Select-Object -First $NeutralN | Select-Object -ExpandProperty FullName
$talk = Get-ChildItem -LiteralPath $paths -File -Filter "$Prefix`_talk_*.png" -ErrorAction SilentlyContinue | Sort-Object FullName | Select-Object -First $TalkN | Select-Object -ExpandProperty FullName

if ($neu -and $neu.Count -gt 0) { $neu | Set-Content -LiteralPath (Join-Path $outPath "$Prefix`_neutral.list.txt") -Encoding UTF8 }
if ($talk -and $talk.Count -gt 0) { $talk | Set-Content -LiteralPath (Join-Path $outPath "$Prefix`_talk.list.txt") -Encoding UTF8 }

$combo = @()
if ($neu) { $combo += ($neu | Select-Object -First ([Math]::Min(4, $neu.Count))) }
if ($talk) { $combo += ($talk | Select-Object -First ([Math]::Min(4, $talk.Count))) }
if ($combo -and $combo.Count -gt 0) { $combo | Set-Content -LiteralPath (Join-Path $outPath "$Prefix`_emotions.list.txt") -Encoding UTF8 }

