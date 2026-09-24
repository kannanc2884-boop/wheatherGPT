# WeatherGPT v5 — Complete Firebase + n8n Backend Connection Guide

**Build:** `20260905-v5`  
**Project state:** exactly **100 capabilities**, **14 n8n workflows**, Firebase email/password login with required email verification.

## 1. Final architecture

```text
USER
  |
  v
Firebase Authentication
(email + password + verified email)
  |
  v
WeatherGPT Web UI :8080
  |
  | JSON HTTP calls
  v
n8n :5678
  |-- Open-Meteo weather / AQI / marine / flood
  |-- NDMA SACHET official alerts
  |-- NASA EONET v3 events
  |-- Gemini API for grounded language answers
  `-- WeatherGPT deterministic risk / decision logic
```

Firebase controls who enters the normal frontend. n8n remains the orchestration backend.

## 2. Folder map

```text
WeatherGPT_100_Capability_Festival_v5_AUTH/
├─ frontend/
│  ├─ login.html
│  ├─ firebase-config.js
│  ├─ login.js
│  ├─ auth-guard.js
│  ├─ index.html
│  ├─ features.html
│  └─ ...
├─ n8n/workflows/          # 14 workflow JSON files
├─ scripts/                # launchers, tests, QA
└─ docs/
   ├─ FIREBASE_AUTH_SETUP_GUIDE.md
   └─ BACKEND_N8N_COMPLETE_SETUP_GUIDE.md
```

## 3. Configure Firebase first

Follow `docs/FIREBASE_AUTH_SETUP_GUIDE.md`.

Minimum configuration:

1. Firebase project + Web App.
2. Authentication > Sign-in method > **Email/Password = enabled**.
3. Authentication > Settings > Authorized domains > add `localhost` for local testing.
4. Paste your Web App config into `frontend/firebase-config.js`.

Do not put the Gemini key in Firebase config or frontend JavaScript.

## 4. Install local n8n

Install Node.js/npm, then:

```powershell
npm install -g n8n
n8n --version
```

The included easy launcher is:

```text
scripts\start_backend_easy_windows.bat
```

It launches `scripts/start_weathergpt_backend.ps1`, asks whether Gemini should be enabled for that session, and then starts n8n.

## 5. Gemini environment

If using the included launcher, paste the Gemini Developer API key only when prompted.

Manual PowerShell equivalent:

```powershell
$env:N8N_BLOCK_ENV_ACCESS_IN_NODE="false"
$env:GEMINI_API_KEY="PASTE_YOUR_AI_STUDIO_API_KEY"
$env:GEMINI_MODEL="gemini-3.7-flash"
$env:WEATHERGPT_HOME="Nagercoil"
$env:GENERIC_TIMEZONE="Asia/Kolkata"
n8n start
```

Workflow 02 reads `$env.GEMINI_API_KEY` and `$env.GEMINI_MODEL`. Never place the Gemini secret in `frontend/`.

## 6. Open n8n

With the terminal still running, open:

```text
http://localhost:5678
```

Complete the local n8n owner setup if this is the first run.

## 7. Import all 14 workflows

Import every JSON from `n8n/workflows/`:

1. `01_WeatherGPT_Weather_Core.json`
2. `02_WeatherGPT_AI_Chat_Gemini.json`
3. `03_WeatherGPT_Official_SACHET_Alerts.json`
4. `04_WeatherGPT_Status.json`
5. `05_WeatherGPT_Morning_Brief_Schedule.json`
6. `06_Citizen_Weather_Reports.json`
7. `07_Map_Grid_Layers.json`
8. `08_Recent_History_Analytics_+_Anomaly.json`
9. `09_Multi-Model_Forecast_Verification.json`
10. `10_Marine_Weather_Mode.json`
11. `11_Flood_Guidance.json`
12. `12_Experimental_Local_Nowcast.json`
13. `13_NASA_EONET_Disaster_Intelligence.json`
14. `14_WeatherGPT_Decision_Studio.json`

## 8. Publish/activate workflows

Recommended order:

```text
04 Status
01 Weather Core
03 SACHET Alerts
13 NASA EONET
14 Decision Studio
06 Citizen Reports
07 Map Grid
08 Recent History
09 Multi-Model Verification
10 Marine
11 Flood
12 Experimental Nowcast
02 Gemini Copilot
05 Morning Brief (optional, schedule-based)
```

WeatherGPT calls **production webhooks** (`/webhook/...`), not `/webhook-test/...`. If a workflow is only listening for a test event, the normal frontend may receive a 404.

## 9. Frontend-to-n8n connection table

| UI area | Workflow | Method + path |
|---|---|---|
| HOME / Weather / AQI / base risk data | 01 | `POST /webhook/weathergpt-weather` |
| COPILOT / Indian Languages / AI trip explanation | 02 | `POST /webhook/weathergpt-chat` |
| Official alerts | 03 | `POST /webhook/weathergpt-alerts` |
| Backend status | 04 | `GET /webhook/weathergpt-status` |
| Morning brief | 05 | Schedule trigger |
| Citizen reports | 06 | `POST /webhook/weathergpt-citizen` |
| Map grid | 07 | `POST /webhook/weathergpt-map-grid` |
| Recent history/anomaly | 08 | `POST /webhook/weathergpt-history` |
| Forecast model agreement | 09 | `POST /webhook/weathergpt-consensus` |
| Marine mode | 10 | `POST /webhook/weathergpt-marine` |
| Flood guidance | 11 | `POST /webhook/weathergpt-flood` |
| Experimental nowcast | 12 | `POST /webhook/weathergpt-nowcast` |
| NASA EONET | 13 | `POST /webhook/weathergpt-eonet` |
| Route/Campus/Event/Trip/Scenario/Heat | 14 | `POST /webhook/weathergpt-decision-studio` |

## 10. Test n8n before the UI

Run:

```text
scripts\test_backend_easy_windows.bat
```

The test script checks production webhook reachability. Workflow 05 is excluded because it is schedule-triggered.

Manual core tests:

```powershell
curl http://localhost:5678/webhook/weathergpt-status
```

```powershell
curl -Method POST http://localhost:5678/webhook/weathergpt-weather `
  -ContentType "application/json" `
  -Body '{"location":"Nagercoil"}'
```

```powershell
curl -Method POST http://localhost:5678/webhook/weathergpt-eonet `
  -ContentType "application/json" `
  -Body '{"latitude":8.18,"longitude":77.41,"radiusKm":500,"days":60}'
```

## 11. Start the frontend

Run:

```text
scripts\start_frontend_windows.bat
```

Then start at:

```text
http://localhost:8080/login.html
```

Expected flow:

```text
Create account
  -> verification email
  -> click verification link
  -> sign in
  -> verified Firebase user
  -> WeatherGPT unlocks
  -> frontend calls n8n
```

In WeatherGPT Settings, n8n base should be:

```text
http://localhost:5678
```

## 12. Exactly 100-capability structure

Activity scoring is now a single capability:

```text
61 Activity Intelligence Engine
   |- Running
   |- Walking
   |- Cycling
   |- Cricket
   |- Football
   |- Photography
   |- Laundry Drying
   `- Outdoor Event
```

The seven planning/accessibility capabilities are now IDs 94–100:

```text
94 Weather Route Intelligence
95 Campus Weather Mode
96 Event Weather Planner
97 AI Trip Weather Planner
98 Weather Scenario Simulator
99 Heat Stress Intelligence
100 Indian Languages Mode
```

## 13. Troubleshooting sequence

```text
A. Login page says Firebase setup required
   -> configure frontend/firebase-config.js

B. Account creates but verification fails
   -> enable Email/Password + authorize localhost + check inbox/spam

C. Verified login works but weather does not load
   -> confirm n8n terminal is running
   -> open /webhook/weathergpt-status
   -> confirm workflow 01 is published/active

D. Gemini fails but weather works
   -> verify GEMINI_API_KEY in the n8n launch session
   -> verify workflow 02 is active
   -> inspect n8n Executions for the exact HTTP error

E. Feature shows 404 webhook not registered
   -> publish/activate that workflow; frontend uses production webhook URLs

F. NASA panel shows no event
   -> this can be a valid result; the 500 km map should still display the scan area
```

## 14. Security for a public/mobile deployment

The included Firebase gate is real user authentication, but public n8n webhooks are still separate HTTP endpoints. Before exposing a hosted n8n instance publicly, add **server-side authorization** so the backend validates the Firebase ID token (or put n8n behind an authenticated API gateway). Also use HTTPS, restrict CORS/origins, store Gemini and other secrets only server-side, and do not expose the local n8n editor to the internet.

For the SIH/local prototype, keep n8n on localhost and use the verified Firebase gate for normal user access.
