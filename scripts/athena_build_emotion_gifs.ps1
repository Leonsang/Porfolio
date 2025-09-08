param(
  [string]$Root = "C:\\Users\\EYN\\Desktop\\Portfolio\\public\\images",
  [string[]]$Folders = @("1","2","3"),
  [string[]]$Expressions = @("neutral","blink","talk"),
  [string]$Prefix = "athena",
  [int]$TopPerEmotion = 6,
  [int]$CombinedPerEmotion = 4,
  [int]$DelayCs = 8, # centiseconds (1/100s) for GIF
  [string]$OutputDir = "gifs"
)

if (-not (Test-Path -LiteralPath $Root)) { throw "Root path not found: $Root" }
$OutPath = Join-Path $Root $OutputDir
New-Item -ItemType Directory -Force -Path $OutPath | Out-Null

Add-Type -AssemblyName System.Drawing

function Get-AHash([System.Drawing.Bitmap]$bmp) {
  $thumb = New-Object System.Drawing.Bitmap 8,8
  $g = [System.Drawing.Graphics]::FromImage($thumb)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.DrawImage($bmp, 0, 0, 8, 8)
  $g.Dispose()
  $sum = 0
  $vals = New-Object 'System.Byte[]' 64
  for ($y=0; $y -lt 8; $y++) {
    for ($x=0; $x -lt 8; $x++) {
      $c = $thumb.GetPixel($x,$y)
      $gray = [byte]((0.299*$c.R) + (0.587*$c.G) + (0.114*$c.B))
      $vals[$y*8 + $x] = $gray
      $sum += $gray
    }
  }
  $thumb.Dispose()
  $avg = [int]([math]::Round($sum / 64.0))
  [UInt64]$hash = 0
  for ($i=0; $i -lt 64; $i++) {
    if ($vals[$i] -gt $avg) { $hash = $hash -bor ([UInt64]1 -shl $i) }
  }
  return $hash
}

function Get-HammingDistance([UInt64]$a, [UInt64]$b) {
  [UInt64]$x = $a -bxor $b
  $count = 0
  while ($x -ne 0) { $x = $x -band ($x - 1); $count++ }
  return $count
}

# Gather files by expression
$allByExpr = @{}
foreach ($expr in $Expressions) { $allByExpr[$expr] = New-Object System.Collections.ArrayList }

foreach ($folder in $Folders) {
  $path = Join-Path $Root $folder
  if (-not (Test-Path -LiteralPath $path)) { continue }
  foreach ($expr in $Expressions) {
    $pattern = "${Prefix}_${expr}_*.png"
    $files = Get-ChildItem -LiteralPath $path -File -Filter $pattern -ErrorAction SilentlyContinue
    foreach ($f in $files) { [void]$allByExpr[$expr].Add($f.FullName) }
  }
}

# Compute medoid and select top-N per expression
$selectionByExpr = @{}
foreach ($expr in $Expressions) {
  $files = @($allByExpr[$expr].ToArray())
  if ($files.Count -eq 0) { continue }
  # Load hashes
  $items = @()
  foreach ($fp in $files) {
    try {
      $bmp = [System.Drawing.Bitmap]::FromFile($fp)
      $hash = Get-AHash $bmp
      $bmp.Dispose()
      $items += [pscustomobject]@{ Path=$fp; Hash=$hash }
    } catch {}
  }
  if ($items.Count -eq 0) { continue }

  # Find medoid
  $minSum = [int]::MaxValue
  $centerIdx = 0
  for ($i=0; $i -lt $items.Count; $i++) {
    $sum = 0
    for ($j=0; $j -lt $items.Count; $j++) {
      if ($i -eq $j) { continue }
      $sum += Get-HammingDistance $items[$i].Hash $items[$j].Hash
    }
    if ($sum -lt $minSum) { $minSum = $sum; $centerIdx = $i }
  }
  $center = $items[$centerIdx]

  # Rank by distance to medoid
  $ranked = $items | ForEach-Object {
    [pscustomobject]@{ Path=$_.Path; Dist=(Get-HammingDistance $_.Hash $center.Hash) }
  } | Sort-Object Dist, Path

  $take = [Math]::Min($TopPerEmotion, $ranked.Count)
  $selectionByExpr[$expr] = $ranked[0..($take-1)]
}

# Helper: Build GIF via ImageMagick if available
function Build-GifWithMagick([string[]]$frames, [string]$outGif, [int]$delayCs) {
  if ($frames.Count -eq 0) { return $false }
  $magick = Get-Command magick -ErrorAction SilentlyContinue
  if (-not $magick) { return $false }
  $args = @("-delay", $delayCs.ToString(), "-loop", "0") + $frames + @($outGif)
  & $magick.Source @args
  return (Test-Path -LiteralPath $outGif)
}

# Helper: Build animated GIF with .NET as fallback (no external tools)
function Build-GifWithDotNet([string[]]$frames, [string]$outGif, [int]$delayCs) {
  if ($frames.Count -eq 0) { return $false }
  try {
    $gifCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/gif' }
    $encoder = [System.Drawing.Imaging.Encoder]::SaveFlag

    $firstBmp = [System.Drawing.Bitmap]::FromFile($frames[0])

    # Build frame delays (4 bytes per frame, little-endian, in 1/100s)
    $frameCount = $frames.Count
    $delayBytes = New-Object byte[] (4 * $frameCount)
    for ($i=0; $i -lt $frameCount; $i++) {
      $val = [uint32]$delayCs
      $delayBytes[$i*4 + 0] = [byte]($val -band 0xFF)
      $delayBytes[$i*4 + 1] = [byte](($val -shr 8) -band 0xFF)
      $delayBytes[$i*4 + 2] = [byte](($val -shr 16) -band 0xFF)
      $delayBytes[$i*4 + 3] = [byte](($val -shr 24) -band 0xFF)
    }

    # Create PropertyItem via FormatterServices
    $piType = [System.Drawing.Imaging.PropertyItem]
    $propItem = [System.Runtime.Serialization.FormatterServices]::GetUninitializedObject($piType)
    $propItem.Id = 0x5100 # FrameDelay
    $propItem.Type = 4
    $propItem.Len = $delayBytes.Length
    $propItem.Value = $delayBytes

    $firstBmp.SetPropertyItem($propItem)

    $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::MultiFrame)
    $firstBmp.Save($outGif, $gifCodec, $ep)

    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::FrameDimensionTime)
    for ($i=1; $i -lt $frameCount; $i++) {
      $bmp = [System.Drawing.Bitmap]::FromFile($frames[$i])
      $firstBmp.SaveAdd($bmp, $ep)
      $bmp.Dispose()
    }

    $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::Flush)
    $firstBmp.SaveAdd($ep)
    $firstBmp.Dispose()

    return (Test-Path -LiteralPath $outGif)
  } catch {
    return $false
  }
}

# Try per-emotion GIFs
$built = @{}
foreach ($expr in $Expressions) {
  $frames = @()
  if ($selectionByExpr.ContainsKey($expr)) {
    $frames = @($selectionByExpr[$expr] | Select-Object -ExpandProperty Path)
  }
  if ($frames.Count -eq 0) {
    # Fallback selection: take first N by name across folders
    $gathered = @()
    foreach ($folder in $Folders) {
      $p = Join-Path $Root $folder
      if (Test-Path -LiteralPath $p) {
        $gathered += (Get-ChildItem -LiteralPath $p -File -Filter ("${Prefix}_${expr}_*.png") -ErrorAction SilentlyContinue)
      }
    }
    $frames = @($gathered | Sort-Object FullName | Select-Object -First $TopPerEmotion | Select-Object -ExpandProperty FullName)
  }
  if ($frames.Count -eq 0) { continue }
  $outGif = Join-Path $OutPath ("${Prefix}_${expr}.gif")
  # Always write selection list for transparency
  $listFile = Join-Path $OutPath ("${Prefix}_${expr}.list.txt")
  $frames | Set-Content -LiteralPath $listFile -Encoding UTF8

  $ok = Build-GifWithMagick -frames $frames -outGif $outGif -delayCs $DelayCs
  if (-not $ok) {
    $ok = Build-GifWithDotNet -frames $frames -outGif $outGif -delayCs $DelayCs
  }
  $built[$expr] = @{ frames=$frames; gif=$outGif; list=$listFile; built=$ok }
}

# Combined GIF (neutral -> blink -> talk order)
$combinedFrames = @()
foreach ($expr in $Expressions) {
  $frames = @()
  if ($selectionByExpr.ContainsKey($expr)) {
    $frames = @($selectionByExpr[$expr] | Select-Object -ExpandProperty Path)
  }
  if ($frames.Count -eq 0) {
    # Fallback selection from gathered files
    $gathered = @()
    foreach ($folder in $Folders) {
      $p = Join-Path $Root $folder
      if (Test-Path -LiteralPath $p) {
        $gathered += (Get-ChildItem -LiteralPath $p -File -Filter ("${Prefix}_${expr}_*.png") -ErrorAction SilentlyContinue)
      }
    }
    $frames = @($gathered | Sort-Object FullName | Select-Object -First $TopPerEmotion | Select-Object -ExpandProperty FullName)
  }
  if ($frames.Count -eq 0) { continue }
  $combinedFrames += $frames[0..([Math]::Min($CombinedPerEmotion, $frames.Count)-1)]
}
if ($combinedFrames.Count -gt 0) {
  $combinedOut = Join-Path $OutPath ("${Prefix}_emotions.gif")
  $combinedList = Join-Path $OutPath ("${Prefix}_emotions.list.txt")
  $combinedFrames | Set-Content -LiteralPath $combinedList -Encoding UTF8

  $ok = Build-GifWithMagick -frames $combinedFrames -outGif $combinedOut -delayCs $DelayCs
  if (-not $ok) { $ok = Build-GifWithDotNet -frames $combinedFrames -outGif $combinedOut -delayCs $DelayCs }
}

# Output summary
Write-Host "Selected frames per emotion (after fallback if needed):"
foreach ($expr in $Expressions) {
  $framesShown = 0
  if ($selectionByExpr.ContainsKey($expr)) { $framesShown = $selectionByExpr[$expr].Count }
  if ($framesShown -eq 0) {
    # Count via file system fallback
    $gathered = @()
    foreach ($folder in $Folders) {
      $p = Join-Path $Root $folder
      if (Test-Path -LiteralPath $p) {
        $gathered += (Get-ChildItem -LiteralPath $p -File -Filter ("${Prefix}_${expr}_*.png") -ErrorAction SilentlyContinue)
      }
    }
    $framesShown = [Math]::Min($TopPerEmotion, $gathered.Count)
  }
  if ($framesShown -gt 0) {
    Write-Host (" - {0}: {1} frames" -f $expr, $framesShown)
  }
}
Write-Host "Output dir: $OutPath"

