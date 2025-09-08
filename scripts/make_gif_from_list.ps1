param(
  [Parameter(Mandatory=$true)][string]$ListPath,
  [Parameter(Mandatory=$true)][string]$OutGif,
  [int]$DelayCs = 8,
  [switch]$PingPong,
  [int]$LoopCount = 0  # 0 = infinito
)

if (-not (Test-Path -LiteralPath $ListPath)) { throw "List file not found: $ListPath" }
$inFrames = Get-Content -LiteralPath $ListPath | Where-Object { $_ -and (Test-Path -LiteralPath $_) }
if ($inFrames.Count -eq 0) { throw "No frames found in list: $ListPath" }

# Construir secuencia final (ping-pong opcional)
[string[]]$frames = $inFrames
if ($PingPong) {
  if ($inFrames.Count -gt 1) {
    $rev = @()
    for ($i=$inFrames.Count-2; $i -ge 1; $i--) { $rev += $inFrames[$i] }
    $frames = @($inFrames + $rev)
  }
}

Add-Type -AssemblyName System.Drawing

function Build-GifWithDotNet([string[]]$frames, [string]$outGif, [int]$delayCs, [int]$loopCount) {
  $gifCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/gif' }
  $encoder = [System.Drawing.Imaging.Encoder]::SaveFlag
  $firstBmp = [System.Drawing.Bitmap]::FromFile($frames[0])

  $frameCount = $frames.Count
  $delayBytes = New-Object byte[] (4 * $frameCount)
  for ($i=0; $i -lt $frameCount; $i++) {
    $val = [uint32]$delayCs
    $delayBytes[$i*4 + 0] = [byte]($val -band 0xFF)
    $delayBytes[$i*4 + 1] = [byte](($val -shr 8) -band 0xFF)
    $delayBytes[$i*4 + 2] = [byte](($val -shr 16) -band 0xFF)
    $delayBytes[$i*4 + 3] = [byte](($val -shr 24) -band 0xFF)
  }
  # FrameDelay (0x5100)
  $piType = [System.Drawing.Imaging.PropertyItem]
  $propDelay = [System.Runtime.Serialization.FormatterServices]::GetUninitializedObject($piType)
  $propDelay.Id = 0x5100; $propDelay.Type = 4; $propDelay.Len = $delayBytes.Length; $propDelay.Value = $delayBytes
  $firstBmp.SetPropertyItem($propDelay)

  # LoopCount (0x5101): WORD (2 bytes), 0=infinite
  $loopBytes = New-Object byte[] 2
  $loopBytes[0] = [byte]($loopCount -band 0xFF)
  $loopBytes[1] = [byte](($loopCount -shr 8) -band 0xFF)
  $propLoop = [System.Runtime.Serialization.FormatterServices]::GetUninitializedObject($piType)
  $propLoop.Id = 0x5101; $propLoop.Type = 3; $propLoop.Len = 2; $propLoop.Value = $loopBytes
  $firstBmp.SetPropertyItem($propLoop)

  $ep = New-Object System.Drawing.Imaging.EncoderParameters 1
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::MultiFrame)
  $firstBmp.Save($OutGif, $gifCodec, $ep)

  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::FrameDimensionTime)
  for ($i=1; $i -lt $frameCount; $i++) {
    $bmp = [System.Drawing.Bitmap]::FromFile($frames[$i])
    # Es recomendable aplicar también el FrameDelay a cada frame agregado
    try { $bmp.SetPropertyItem($propDelay) } catch {}
    $firstBmp.SaveAdd($bmp, $ep)
    $bmp.Dispose()
  }
  $ep.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ($encoder, [long][System.Drawing.Imaging.EncoderValue]::Flush)
  $firstBmp.SaveAdd($ep)
  $firstBmp.Dispose()
}

Build-GifWithDotNet -frames $frames -outGif $OutGif -delayCs $DelayCs -loopCount $LoopCount
Write-Host "GIF created: $OutGif"

