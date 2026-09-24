param(
    [string]$BaseUrl = "http://localhost:5678"
)

$ErrorActionPreference = "Continue"
$passed = 0
$failed = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Method,
        [string]$Path,
        [object]$Body = $null,
        [int]$TimeoutSec = 25
    )
    $uri = "$BaseUrl/webhook/$Path"
    try {
        if ($Method -eq "GET") {
            $null = Invoke-RestMethod -Method Get -Uri $uri -TimeoutSec $TimeoutSec
        } else {
            $json = if ($null -ne $Body) { $Body | ConvertTo-Json -Depth 12 -Compress } else { "{}" }
            $null = Invoke-RestMethod -Method Post -Uri $uri -ContentType "application/json" -Body $json -TimeoutSec $TimeoutSec
        }
        Write-Host ("PASS  " + $Name) -ForegroundColor Green
        $script:passed++
        return $true
    }
    catch {
        Write-Host ("FAIL  " + $Name + "  -> " + $_.Exception.Message) -ForegroundColor Red
        $script:failed++
        return $false
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host " WeatherGPT Backend Production-Webhook Check" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "Base: $BaseUrl"
Write-Host ""

$statusOk = Test-Endpoint "04 Status" "GET" "weathergpt-status"
if (-not $statusOk) {
    Write-Host ""
    Write-Host "Core status is unavailable. Start n8n and publish workflow 04 before testing the rest." -ForegroundColor Yellow
}

Test-Endpoint "01 Weather Core" "POST" "weathergpt-weather" @{ location = "Nagercoil" }
Test-Endpoint "03 SACHET Alerts" "POST" "weathergpt-alerts" @{ city = "Nagercoil"; district = "Kanyakumari"; state = "Tamil Nadu"; country = "India" }
Test-Endpoint "06 Citizen Reports (list)" "POST" "weathergpt-citizen" @{ action = "list" }
Test-Endpoint "07 Map Grid" "POST" "weathergpt-map-grid" @{ latitude = 8.1833; longitude = 77.4119; step = 0.18 }
Test-Endpoint "08 Recent History" "POST" "weathergpt-history" @{ latitude = 8.1833; longitude = 77.4119; days = 30 }
Test-Endpoint "09 Model Consensus" "POST" "weathergpt-consensus" @{ latitude = 8.1833; longitude = 77.4119 }
Test-Endpoint "10 Marine" "POST" "weathergpt-marine" @{ latitude = 8.0883; longitude = 77.5385; location = "Kanyakumari" }
Test-Endpoint "11 Flood" "POST" "weathergpt-flood" @{ latitude = 8.1833; longitude = 77.4119 }
Test-Endpoint "12 Nowcast" "POST" "weathergpt-nowcast" @{ latitude = 8.1833; longitude = 77.4119 }
Test-Endpoint "13 NASA EONET" "POST" "weathergpt-eonet" @{ latitude = 8.1833; longitude = 77.4119; radiusKm = 500; days = 60 }
Test-Endpoint "14 Decision Studio" "POST" "weathergpt-decision-studio" @{
    mode = "scenario"
    payload = @{ rain = 90; wind = 60; temp = 38; uv = 9; thunder = $true }
}

# Gemini is tested last because it is the only endpoint that requires a secret/quota.
Test-Endpoint "02 Gemini Copilot" "POST" "weathergpt-chat" @{
    question = "Give one short sentence about this supplied test weather."
    mode = "General"
    language = "English"
    location = "Nagercoil"
    weather = @{ current = @{ temperature_2m = 30; precipitation = 0 } }
    risk = @{ score = 20; level = "LOW" }
    officialAlerts = @()
} 35

Write-Host ""
Write-Host "Result: $passed passed / $failed failed" -ForegroundColor Cyan
Write-Host ""
Write-Host "Notes:" -ForegroundColor Yellow
Write-Host "- Workflow 05 is schedule-triggered, so it is not tested here."
Write-Host "- A SACHET request may pass even when zero matching alerts exist."
Write-Host "- Gemini failure while all other tests pass usually means key/env/quota/model configuration."
Write-Host "- Specialist API failures can also mean the upstream service has no data for that test point."
Write-Host ""
