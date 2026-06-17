# Run this script in an elevated PowerShell window (Run as administrator).
# Allows other devices on your Wi-Fi to reach the Next.js dev server on port 3000.

$ruleName = "MB Jewellers Dev 3000"
$existing = Get-NetFirewallRule -DisplayName $ruleName -ErrorAction SilentlyContinue

if ($existing) {
  Write-Host "Firewall rule '$ruleName' already exists."
} else {
  New-NetFirewallRule `
    -DisplayName $ruleName `
    -Direction Inbound `
    -Action Allow `
    -Protocol TCP `
    -LocalPort 3000 `
    -Profile Private
  Write-Host "Created firewall rule '$ruleName' for TCP port 3000 (Private networks)."
}

Write-Host ""
Write-Host "On your phone (same Wi-Fi), open:"
Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -notlike "127.*" -and $_.PrefixOrigin -ne "WellKnown" } |
  ForEach-Object { Write-Host "  http://$($_.IPAddress):3000  ($($_.InterfaceAlias))" }
