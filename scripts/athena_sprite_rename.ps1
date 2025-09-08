param(
  [string]$Root = "C:\\Users\\EYN\\Desktop\\Portfolio\\public\\images",
  [string[]]$Folders = @("1","2","3"),
  [string]$Prefix = "athena",
  [switch]$DoRename = $false,
  [string]$LogPath = ""
)

if (-not (Test-Path -LiteralPath $Root)) {
  throw "Root path not found: $Root"
}

if (-not $LogPath) {
  $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
  $LogPath = Join-Path $Root "rename_log_$timestamp.csv"
}

# Load System.Drawing for image processing
Add-Type -AssemblyName System.Drawing

function Get-FrameIndex([string]$name) {
  # Match patterns like 00_1.png or ..._00.png
  if ($name -match '^(?<num>\d{2})_\d+\.[Pp][Nn][Gg]$') {
    return [int]$Matches['num']
  }
  if ($name -match '_(?<num>\d{2})\.[Pp][Nn][Gg]$') {
    return [int]$Matches['num']
  }
  # Fallback: extract first number sequence
  if ($name -match '(?<num>\d+)') { return [int]$Matches['num'] }
  return 0
}

function Get-AHash([System.Drawing.Bitmap]$bmp) {
  # Average hash 8x8 grayscale
  # Scale to 8x8
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

  # Build 64-bit hash (UInt64), bit set if pixel > avg
  [UInt64]$hash = 0
  for ($i=0; $i -lt 64; $i++) {
    if ($vals[$i] -gt $avg) {
      $hash = $hash -bor ([UInt64]1 -shl $i)
    }
  }
  return $hash
}

function Get-HammingDistance([UInt64]$a, [UInt64]$b) {
  [UInt64]$x = $a -bxor $b
  $count = 0
  while ($x -ne 0) {
    $x = $x -band ($x - 1)
    $count++
  }
  return $count
}

function Get-Percentile([int[]]$arr, [double]$p) {
  if ($arr.Count -eq 0) { return 0 }
  $sorted = $arr | Sort-Object
  $idx = [int][math]::Floor(($sorted.Count - 1) * $p)
  return $sorted[$idx]
}

$logRows = @()

foreach ($folder in $Folders) {
  $path = Join-Path $Root $folder
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Warning "Skipping missing folder: $path"
    continue
  }

  $files = Get-ChildItem -LiteralPath $path -File -Filter *.png | Sort-Object { Get-FrameIndex $_.Name }
  if ($files.Count -eq 0) {
    Write-Host "No PNG files in $path"
    continue
  }

  $frames = @()
  foreach ($f in $files) {
    try {
      $bmp = [System.Drawing.Bitmap]::FromFile($f.FullName)
      $hash = Get-AHash $bmp
      $bmp.Dispose()
      $frames += [pscustomobject]@{
        Name = $f.Name
        FullName = $f.FullName
        Index = Get-FrameIndex $f.Name
        Hash = $hash
        DistToCenter = $null
        Label = $null
      }
    } catch {
      Write-Warning "Failed to read image: $($f.FullName). $_"
    }
  }

  if ($frames.Count -lt 2) {
    # Not enough data to cluster, mark as neutral
    foreach ($fr in $frames) { $fr.Label = 'neutral' }
  } else {
    # Find medoid (frame with minimal sum distance)
    $minSum = [int]::MaxValue
    $center = $null
    for ($i=0; $i -lt $frames.Count; $i++) {
      $sum = 0
      for ($j=0; $j -lt $frames.Count; $j++) {
        if ($i -eq $j) { continue }
        $sum += Get-HammingDistance $frames[$i].Hash $frames[$j].Hash
      }
      if ($sum -lt $minSum) { $minSum = $sum; $center = $frames[$i] }
    }

    # Compute distance to center
    foreach ($fr in $frames) {
      $fr.DistToCenter = Get-HammingDistance $fr.Hash $center.Hash
    }

    $distances = @($frames.DistToCenter)
    $neutralP = Get-Percentile $distances 0.30
    $blinkP   = Get-Percentile $distances 0.90

    $neutralThreshold = [Math]::Max(8, $neutralP)
    $blinkThreshold   = [Math]::Max($neutralThreshold+4, $blinkP)

    # Initial labeling
    foreach ($fr in $frames) {
      if ($fr.DistToCenter -le $neutralThreshold) {
        $fr.Label = 'neutral'
      } else {
        $fr.Label = 'talk'
      }
    }

    # Detect short high-deviation runs as blinks
    $ordered = $frames | Sort-Object Index
    $i = 0
    while ($i -lt $ordered.Count) {
      if ($ordered[$i].DistToCenter -ge $blinkThreshold) {
        $start = $i
        while ($i -lt $ordered.Count -and $ordered[$i].DistToCenter -ge $blinkThreshold) { $i++ }
        $len = $i - $start
        if ($len -le 2) {
          for ($k=$start; $k -lt $start+$len; $k++) { $ordered[$k].Label = 'blink' }
        }
      } else {
        $i++
      }
    }
  }

  # Assign per-expression counters for naming
  $counters = @{ neutral = 0; blink = 0; talk = 0 }
  $orderedForNaming = $frames | Sort-Object Index
  foreach ($fr in $orderedForNaming) {
    $expr = $fr.Label
    if (-not $expr) { $expr = 'neutral' }
    $n = $counters[$expr]
    $newBase = "${Prefix}_${expr}_" + ($n.ToString('00')) + ".png"
    $counters[$expr] = $n + 1

    $target = Join-Path $path $newBase
    $finalTarget = $target
    $suffix = 2
    while ((Test-Path -LiteralPath $finalTarget) -and ((Get-Item -LiteralPath $fr.FullName).FullName -ne (Get-Item -LiteralPath $finalTarget).FullName)) {
      $finalTarget = Join-Path $path ("{0}_{1}.png" -f [System.IO.Path]::GetFileNameWithoutExtension($newBase), $suffix)
      $suffix++
    }

    if (-not $DoRename) {
      Write-Host ("[DRY] {0} -> {1} ({2})" -f $fr.Name, [System.IO.Path]::GetFileName($finalTarget), $expr)
    } else {
      Rename-Item -LiteralPath $fr.FullName -NewName ([System.IO.Path]::GetFileName($finalTarget))
      $logRows += [pscustomobject]@{
        Folder = $folder
        OriginalName = $fr.Name
        NewName = [System.IO.Path]::GetFileName($finalTarget)
        Expression = $expr
      }
    }
  }

  # Summary per folder
  $counts = ($frames | Group-Object Label | ForEach-Object { "{0}:{1}" -f $_.Name, $_.Count }) -join ', '
  Write-Host ("Folder {0}: {1} files -> {2}" -f $folder, $frames.Count, $counts)
}

if ($DoRename -and $logRows.Count -gt 0) {
  $logRows | Export-Csv -LiteralPath $LogPath -NoTypeInformation -Encoding UTF8
  Write-Host "Log saved to $LogPath"
}

