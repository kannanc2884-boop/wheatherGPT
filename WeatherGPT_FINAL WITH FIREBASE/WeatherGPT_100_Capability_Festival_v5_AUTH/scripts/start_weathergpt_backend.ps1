$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host " WeatherGPT v4 - Local n8n Backend Launcher" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command n8n -ErrorAction SilentlyContinue)) {
    Write-Host "n8n was not found in PATH." -ForegroundColor Red
    Write-Host "Install it once with: npm install n8n -g" -ForegroundColor Yellow
    Write-Host "Then close/reopen PowerShell and run this launcher again."
    exit 1
}

# WeatherGPT workflow 02 uses $env expressions. n8n v2 blocks env access by default.
# This is enabled for this local process only; do not expose this prototype n8n publicly.
$env:N8N_BLOCK_ENV_ACCESS_IN_NODE = "false"
$env:GEMINI_MODEL = if ($env:GEMINI_MODEL) { $env:GEMINI_MODEL } else { "gemini-3.7-flash" }
$env:WEATHERGPT_HOME = if ($env:WEATHERGPT_HOME) { $env:WEATHERGPT_HOME } else { "Nagercoil" }
$env:GENERIC_TIMEZONE = if ($env:GENERIC_TIMEZONE) { $env:GENERIC_TIMEZONE } else { "Asia/Kolkata" }

if (-not $env:GEMINI_API_KEY) {
    $useGemini = Read-Host "Configure Gemini for this session? (Y/N)"
    if ($useGemini -match '^[Yy]') {
        $secure = Read-Host "Paste Gemini API key (input is hidden)" -AsSecureString
        if ($secure.Length -gt 0) {
            $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
            try {
                $env:GEMINI_API_KEY = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
            }
            finally {
                [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
            }
        }
    }
}

Write-Host ""
Write-Host "Configuration" -ForegroundColor Green
Write-Host "  Editor:            http://localhost:5678"
Write-Host "  Home:              $env:WEATHERGPT_HOME"
Write-Host "  Timezone:          $env:GENERIC_TIMEZONE"
Write-Host "  Gemini model:      $env:GEMINI_MODEL"
Write-Host "  Gemini key loaded: $([bool]$env:GEMINI_API_KEY)"
Write-Host "  Env access:        enabled for this local n8n process"
Write-Host ""
Write-Host "Keep this window open while using WeatherGPT." -ForegroundColor Yellow
Write-Host "Starting n8n..." -ForegroundColor Green
Write-Host ""

n8n start
