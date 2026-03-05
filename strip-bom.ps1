$f = "C:\Users\RockinRain\clawd\SKYKOI-runtime\package.json"
$bytes = [System.IO.File]::ReadAllBytes($f)
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    [System.IO.File]::WriteAllBytes($f, $bytes[3..($bytes.Length-1)])
    Write-Host "BOM stripped"
} else {
    Write-Host "No BOM"
}
