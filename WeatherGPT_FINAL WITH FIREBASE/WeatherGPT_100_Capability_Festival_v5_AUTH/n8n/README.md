# WeatherGPT v5 — n8n Workflows

The project contains **14 portable local n8n workflows**. Import all JSON files from `n8n/workflows/` using **Import from File**. They ship inactive/unpublished by design.

For the complete setup, including Gemini environment variables, current n8n environment-access requirement, activation order, production-webhook tests and troubleshooting, read:

`docs/BACKEND_N8N_COMPLETE_SETUP_GUIDE.md`

## Recommended publish/activation order

1. `04_WeatherGPT_Status.json`
2. `01_WeatherGPT_Weather_Core.json`
3. `03_WeatherGPT_Official_SACHET_Alerts.json`
4. `13_NASA_EONET_Disaster_Intelligence.json`
5. `14_WeatherGPT_Decision_Studio.json`
6. `06_Citizen_Weather_Reports.json`
7. `07_Map_Grid_Layers.json`
8. `08_Recent_History_Analytics_+_Anomaly.json`
9. `09_Multi-Model_Forecast_Verification.json`
10. `10_Marine_Weather_Mode.json`
11. `11_Flood_Guidance.json`
12. `12_Experimental_Local_Nowcast.json`
13. `02_WeatherGPT_AI_Chat_Gemini.json` after Gemini is configured
14. `05_WeatherGPT_Morning_Brief_Schedule.json` only if you want the daily schedule

## Workflow roles

1. **Weather Core + Risk Planner** — geocoding, weather, AQI, derived risk and planning data.
2. **Grounded Gemini Copilot** — grounded AI/language explanations using the Gemini API.
3. **Official SACHET Alerts** — reads the NDMA SACHET public feed and location-matches entries.
4. **Status Healthcheck** — frontend backend-online indicator.
5. **Morning Brief** — optional 07:00 scheduled brief, internally calls workflow 01.
6. **Citizen Reports** — unverified local reports stored in workflow static data.
7. **Live Map Grid** — 3x3 Open-Meteo grid around current coordinates.
8. **Recent History + Anomaly** — recent Open-Meteo `past_days` analysis.
9. **Multi-Model Consensus** — ECMWF/GFS/ICON comparison and prototype confidence.
10. **Marine Weather** — Open-Meteo Marine variables and prototype sea-state signal.
11. **Flood Guidance** — Open-Meteo river-discharge signal; not an official flood warning.
12. **Experimental Nowcast** — short-horizon precipitation/temperature persistence analysis.
13. **NASA EONET** — nearby open natural-event filtering by Haversine radius.
14. **Decision Studio** — server-side route/campus/event/trip/scenario/heat calculations for capabilities 94–99.

Capability 100 (Indian Languages Mode) reuses workflow 02.

## Environment used by this project

For the portable Gemini workflow on current n8n:

```powershell
$env:N8N_BLOCK_ENV_ACCESS_IN_NODE="false"
$env:GEMINI_API_KEY="YOUR_AI_STUDIO_KEY"
$env:GEMINI_MODEL="gemini-3.7-flash"
$env:WEATHERGPT_HOME="Nagercoil"
$env:GENERIC_TIMEZONE="Asia/Kolkata"
n8n start
```

The easier option is `scripts/start_backend_easy_windows.bat`.

## Production webhooks

The browser uses `http://localhost:5678/webhook/...`. A workflow that is only in test/listen mode will not satisfy the frontend. Publish/activate it so the production webhook is registered.
