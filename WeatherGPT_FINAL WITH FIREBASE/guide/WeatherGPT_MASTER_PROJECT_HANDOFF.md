# WeatherGPT - MASTER PROJECT HANDOFF

**Portable project knowledge pack | Verified 2026-08-28 | 100 features | 13 n8n workflows | INR 0-first local prototype**

This document is the source-of-truth handoff for a new developer or a completely new ChatGPT account. Read it before changing the project. It explains what the repository contains, what is end-to-end today, how the 100 capabilities are grouped, how to activate n8n, how to test each workflow, what claims are safe to make, and what still needs additional wiring.

## 1. Project identity and core idea

WeatherGPT is not intended to be just another weather dashboard. Its core idea is to transform raw forecast data and public hazard information into **actionable decisions**: whether to carry an umbrella, when to travel, whether outdoor activities are suitable, what risk factors are driving conditions, whether an official alert is present, and whether a NASA-tracked natural event is nearby.

- Primary orchestration: local n8n Community Edition.

- Primary weather data: Open-Meteo current/hourly/daily forecast, geocoding and AQI.

- Official India alert channel: NDMA SACHET CAP/RSS.

- Global natural-event situational intelligence: NASA EONET API v3.

- AI explanation layer: Gemini Developer API, called only from n8n so the key is not exposed in frontend code.

- Frontend: HTML/CSS/JavaScript, Leaflet/OpenStreetMap, Chart.js, browser Web Speech, localStorage and service worker/PWA shell.

- Prototype budget target: INR 0 under applicable free/non-commercial limits. Production/server choices are deliberately deferred.



## 2. Repository you should treat as current

```text
WeatherGPT_100_Feature_Gravitas_Festival/
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── features.html
│   ├── features.css
│   ├── features.js
│   ├── data/features.json
│   ├── assets/logo.svg
│   ├── manifest.json
│   └── sw.js
├── n8n/workflows/
│   ├── 01_WeatherGPT_Weather_Core.json
│   ├── ...
│   └── 13_NASA_EONET_Disaster_Intelligence.json
├── scripts/
├── docs/
└── README.md
```

New handoff files added by this knowledge pack: `docs/MASTER_PROJECT_HANDOFF.md`, `docs/PROJECT_STATE.json`, `docs/FEATURE_CAPABILITY_MAP.csv`, `docs/NEW_CHATGPT_ACCOUNT_PROMPT.txt`, and the rendered Master Handoff PDF/DOCX.

## 3. What the user sees - why there are only a few main navigation options

The 100 features are **capabilities**, not 100 separate pages. The frontend deliberately consolidates them into a small number of user experiences. This is why the navigation shows roughly six main options.

- HOME / Command Center - current weather, risk, forecast, charts, AQI, recommendations and live source state.

- COPILOT - grounded WeatherGPT question answering, modes, languages, voice input/output.

- PLANNER - best outdoor window, activity suitability, city comparison and decision support.

- DISASTERS - official SACHET alerts, NASA EONET nearby natural events and derived WeatherGPT risk clearly separated.

- MAP - searched-location map and NASA EONET event markers.

- SYSTEM - architecture/source-integrity/system-status explanation.

- 100 FEATURES - dedicated `features.html` catalogue with all numbered capabilities, descriptions, sources and status.



## 4. System architecture

```text
USER / BROWSER
      |
      v
WeatherGPT festival frontend (localhost:8080)
      |
      +--> n8n Weather Core ----------------> Open-Meteo Geocoding + Forecast + AQI
      |       |
      |       +--> deterministic Risk + Planner Engine
      |
      +--> n8n Gemini Copilot --------------> Gemini Interactions API
      |
      +--> n8n SACHET Alerts ---------------> NDMA SACHET public CAP/RSS
      |
      +--> n8n NASA EONET ------------------> NASA EONET API v3
      |
      +--> Advanced n8n modules 06-12 ------> processor/scaffold workflows
      |
      +--> Leaflet/OpenStreetMap + Chart.js + browser voice/localStorage

Fallback path when n8n weather is down:
Browser --> Open-Meteo directly --> local deterministic risk/activities
```

## 5. Current implementation maturity - critical handoff fact

Do not describe every workflow as equally integrated. The repository has three maturity tiers:

- **Tier A - end-to-end and directly used by the main UI:** workflows 01 Weather Core, 02 Gemini Chat, 03 SACHET Alerts, 04 Status, and 13 NASA EONET.

- **Tier B - scheduled:** workflow 05 Morning Brief. It can run on its 07:00 schedule or be executed manually in n8n.

- **Tier C - advanced processor/scaffold modules:** workflows 06-12. Their code exists and can be activated/tested independently, but the current main UI does not automatically call all of them. Several expect already-supplied arrays/values and need additional HTTP Request nodes or UI calls for fully automatic end-to-end operation.



This distinction explains why the frontend has only a handful of main screens even though the Feature Atlas lists 100 capabilities.

## 6. Frontend design language

The current frontend is an original bright festival redesign inspired only at a high level by the energy of VIT graVITas, not a copy of its branding or assets.

- Warm paper/cream backgrounds instead of a dark admin dashboard.

- Electric blue, acid lime, coral, yellow, sky blue and pink accent palette.

- Oversized typography and editorial section transitions.

- Intro splash, kinetic marquees, rotating orbital weather graphics, floating data tickets, reveal-on-scroll sections and hover motion.

- Bento-style live weather cards and a dedicated feature-atlas page.



## 7. Data sources and API roles - verified on 2026-08-28

The following external dependencies were checked against official sources on the verification date. Re-check terms before production.

- **Open-Meteo** - free/open-access tier is intended for non-commercial evaluation/prototyping, currently rate-limited to 10,000 calls/day; attribution is required. The project uses forecast, geocoding and AQI endpoints. The forecast API supports `past_days` up to 92; the project uses 7 forecast days for its main dashboard.

- **Gemini Developer API** - the Interactions API is Google's recommended/default interface for new Gemini applications as of June 2026. The project defaults to `gemini-3.7-flash`, which currently has a free tier for supported usage. Free-tier content-use terms should be reviewed before sending sensitive data.

- **NASA EONET v3** - v3 is the latest API version. Events provide IDs, titles, categories, sources and GeoJSON geometry. The project fetches open events from `/api/v3/events`, then performs its own Haversine radius filtering (500 km default). EONET is situational intelligence, not a local emergency warning.

- **NDMA SACHET** - Government of India / NDMA CAP-based alert platform. The project uses the public RSS/CAP feed and prototype location text matching. Users should open the source alert for authoritative geography/instructions.

- **OpenStreetMap tiles** - appropriate for normal light interactive prototype viewing with visible attribution. OSMF tile servers are not an unlimited production CDN and prohibit bulk/offline tile downloading.



Official reference URLs are listed in `PROJECT_STATE.json` and at the end of this document.

## 8. Source-integrity and safety rules

- Never call the WeatherGPT 0-100 risk score an IMD/NDMA/government warning.

- NDMA SACHET alerts are displayed as the official Indian alert channel.

- NASA EONET events are NASA-catalogued natural-event intelligence; they do not replace local emergency authorities.

- Citizen reports are unverified community observations.

- Flood guidance is coarse/prototype guidance, not street-level flood prediction.

- Marine mode is not certified navigation information.

- Feature 100 is an experimental persistence/trend heuristic and must remain labelled EXPERIMENTAL.

- Gemini is instructed to use supplied weather/risk/official-alert context and not invent measurements or alerts.



## 9. n8n workflow catalogue

### 01. WeatherGPT - Weather Core + Risk Planner

**File:** `01_WeatherGPT_Weather_Core.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-weather`

**Maturity:** Tier A - end-to-end UI-connected

Geocodes a city, fetches live forecast + AQI, computes explainable risk, activity scores and best outdoor window.

Nodes: Weather Request -> Open-Meteo Geocoding -> Extract Place -> Open-Meteo Forecast -> Open-Meteo Air Quality -> Risk + Planner Engine -> Return Weather Intelligence

### 02. WeatherGPT - Grounded Gemini Copilot

**File:** `02_WeatherGPT_AI_Chat_Gemini.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-chat`

**Maturity:** Tier A - end-to-end UI-connected

Grounded Gemini copilot. Receives question + weather + derived risk + official alerts and returns an AI answer through Gemini Interactions API.

Nodes: Chat Request -> Grounded Weather Prompt -> Gemini Free-Tier API -> Extract Grounded Answer -> Return AI Answer

### 03. WeatherGPT - Official SACHET Alerts

**File:** `03_WeatherGPT_Official_SACHET_Alerts.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-alerts`

**Maturity:** Tier A - end-to-end UI-connected

Reads NDMA SACHET public RSS/CAP feed and performs prototype text matching against city/district/state.

Nodes: Alert Request -> NDMA SACHET RSS Read -> Filter Alerts to Location -> Return Official Alerts

### 04. WeatherGPT - Status Healthcheck

**File:** `04_WeatherGPT_Status.json`

**Endpoint / trigger:** `GET /webhook/weathergpt-status`

**Maturity:** Tier A - end-to-end UI-connected

Simple health-check endpoint used by the frontend n8n connection indicator.

Nodes: Status Request -> Build Status -> Return Status

### 05. WeatherGPT - Morning Brief Generator (Local)

**File:** `05_WeatherGPT_Morning_Brief_Schedule.json`

**Endpoint / trigger:** `SCHEDULE Schedule only`

**Maturity:** Tier B - scheduled module

Runs every day around 07:00 to generate a local morning weather brief. Does not send SMS/WhatsApp by default.

Nodes: Every Morning 07:00 -> Get Morning Weather -> Generate Morning Brief -> Brief Ready (Inspect Execution)

### 06. WeatherGPT 100 - Citizen Weather Reports

**File:** `06_Citizen_Weather_Reports.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-citizen`

**Maturity:** Tier C - advanced processor/scaffold

Stores/lists citizen-supplied weather observations in n8n workflow static data; explicitly labels them unverified.

Nodes: Webhook -> Process -> Respond

### 07. WeatherGPT 100 - Map Grid Layers

**File:** `07_Map_Grid_Layers.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-map-grid`

**Maturity:** Tier C - advanced processor/scaffold

Returns a 3x3 geographic grid scaffold around coordinates. Frontend or future n8n nodes must enrich points with weather values.

Nodes: Webhook -> Process -> Respond

### 08. WeatherGPT 100 - Recent History Analytics + Anomaly

**File:** `08_Recent_History_Analytics_+_Anomaly.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-history`

**Maturity:** Tier C - advanced processor/scaffold

Analyzes a supplied recent temperature series and flags a simple anomaly versus the series mean. It does not itself fetch history.

Nodes: Webhook -> Process -> Respond

### 09. WeatherGPT 100 - Multi-Model Forecast Verification

**File:** `09_Multi-Model_Forecast_Verification.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-consensus`

**Maturity:** Tier C - advanced processor/scaffold

Computes a prototype confidence score from a supplied list of model temperatures/rain probabilities. Model fetching must be added/wired.

Nodes: Webhook -> Process -> Respond

### 10. WeatherGPT 100 - Marine Weather Mode

**File:** `10_Marine_Weather_Mode.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-marine`

**Maturity:** Tier C - advanced processor/scaffold

Computes marine risk from supplied wave height/period/SST/current data. It is guidance only; upstream marine data fetching must be wired.

Nodes: Webhook -> Process -> Respond

### 11. WeatherGPT 100 - Flood Guidance

**File:** `11_Flood_Guidance.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-flood`

**Maturity:** Tier C - advanced processor/scaffold

Computes a coarse flood guidance level from supplied river discharge and mean discharge. Upstream flood/GloFAS data fetching must be wired.

Nodes: Webhook -> Process -> Respond

### 12. WeatherGPT 100 - Experimental Local Nowcast

**File:** `12_Experimental_Local_Nowcast.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-nowcast`

**Maturity:** Tier C - advanced processor/scaffold

Experimental 0-3 hour persistence/trend heuristic from a supplied hourly series. Not an official or trained meteorological model.

Nodes: Webhook -> Process -> Respond

### 13. WeatherGPT - NASA EONET Disaster Intelligence

**File:** `13_NASA_EONET_Disaster_Intelligence.json`

**Endpoint / trigger:** `POST /webhook/weathergpt-eonet`

**Maturity:** Tier A - end-to-end UI-connected

Fetches open NASA EONET v3 events, extracts latest Point geometry, calculates Haversine distance, and returns events within a configurable radius (500 km default).

Nodes: EONET Request -> NASA EONET Events -> Filter by Radius -> Return EONET Intelligence

## 10. Webhook request examples

Use these to test n8n directly after import/activation. Replace host/values as needed.

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-weather -H "Content-Type: application/json" -d '{"location":"Nagercoil"}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-alerts -H "Content-Type: application/json" -d '{"city":"Nagercoil","district":"Kanyakumari","state":"Tamil Nadu"}'
```

```bash
curl http://localhost:5678/webhook/weathergpt-status
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-eonet -H "Content-Type: application/json" -d '{"latitude":8.18,"longitude":77.41,"radiusKm":500,"days":60}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-citizen -H "Content-Type: application/json" -d '{"location":"Nagercoil","type":"Heavy rain","severity":"medium","note":"Community observation"}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-map-grid -H "Content-Type: application/json" -d '{"latitude":8.18,"longitude":77.41}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-history -H "Content-Type: application/json" -d '{"days":7,"series":[{"temperature":29},{"temperature":30},{"temperature":31},{"temperature":37}]}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-consensus -H "Content-Type: application/json" -d '{"models":[{"name":"ECMWF","temperature":30,"rainProbability":70},{"name":"GFS","temperature":31,"rainProbability":65},{"name":"ICON","temperature":30.5,"rainProbability":72}]}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-marine -H "Content-Type: application/json" -d '{"location":"Kanyakumari","waveHeight":1.8,"wavePeriod":8,"seaSurfaceTemperature":28,"currentVelocity":0.4}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-flood -H "Content-Type: application/json" -d '{"riverDischarge":300,"meanDischarge":100}'
```

```bash
curl -X POST http://localhost:5678/webhook/weathergpt-nowcast -H "Content-Type: application/json" -d '{"hourly":[{"temperature":29,"rain":0.8},{"temperature":28.5,"rain":1.2},{"temperature":28,"rain":1.5}]}'
```

## 11. The 100 capabilities - complete source-of-truth catalogue

The Feature Atlas is data-driven from `frontend/data/features.json`. The list below is generated from that exact file so there is no mismatch between documentation and the frontend catalogue.

### AI Assistant

**001. Natural-language weather questions** - Ask normal questions such as “Will it rain at 5 PM?”; n8n grounds the answer in the current weather payload before Gemini responds.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**002. Rain questions** - Answers rain-specific questions using hourly precipitation probability and rainfall values instead of guessing from the condition label.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**003. Umbrella recommendations** - Converts upcoming precipitation probability into a simple carry-an-umbrella decision with the reason shown to the user.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**004. Simple weather explanations** - Translates technical weather values into plain-language summaries for non-technical users.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**005. Follow-up questions** - Keeps the current weather and conversation context available so a user can ask follow-up questions without repeating the location.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**006. Conversation memory** - Stores lightweight conversation history in the browser and passes relevant context to the n8n AI workflow for the prototype.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**007. Location-aware responses** - Uses the searched city or coordinates as context for every forecast, risk and AI response.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**008. Time-aware weather questions** - Maps phrases such as “this evening” or “tomorrow morning” to hourly/daily forecast windows before producing an answer.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**009. Compare two locations** - Fetches a second city and compares temperature, rain probability and derived risk side by side.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**010. AI-generated daily weather summary** - Builds a concise daily briefing from live forecast, risk, activity and alert context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

### Core Weather

**011. Current temperature** - Displays current temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**012. Feels-like temperature** - Displays feels-like temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**013. Minimum / maximum temperature** - Displays minimum / maximum temperature from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**014. Humidity** - Displays humidity from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**015. Wind speed** - Displays wind speed from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**016. Wind direction** - Displays wind direction from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**017. Atmospheric pressure** - Displays atmospheric pressure from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**018. Visibility** - Displays visibility from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**019. Cloud cover** - Displays cloud cover from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**020. UV index** - Displays uv index from the live Open-Meteo weather payload and makes it available to the dashboard, risk engine and AI context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

### Forecasting

**021. Hourly forecast** - Uses Open-Meteo hourly/daily forecast arrays to provide hourly forecast and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**022. 24-hour forecast** - Uses Open-Meteo hourly/daily forecast arrays to provide 24-hour forecast and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**023. 7-day forecast** - Uses Open-Meteo hourly/daily forecast arrays to provide 7-day forecast and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**024. Rain probability** - Uses Open-Meteo hourly/daily forecast arrays to provide rain probability and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**025. Expected rainfall amount** - Uses Open-Meteo hourly/daily forecast arrays to provide expected rainfall amount and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**026. Thunderstorm probability / signal** - Detects thunderstorm weather codes in the hourly forecast and raises a thunderstorm signal used by the risk engine.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**027. Temperature trend** - Uses Open-Meteo hourly/daily forecast arrays to provide temperature trend and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**028. Wind trend** - Uses Open-Meteo hourly/daily forecast arrays to provide wind trend and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**029. Sunrise / sunset** - Uses Open-Meteo hourly/daily forecast arrays to provide sunrise / sunset and feeds the result into charts, planning and WeatherGPT answers.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

**030. Forecast comparison** - Compares forecast signals and, where enabled, multi-model outputs so the UI can expose agreement instead of a single opaque forecast.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Open-Meteo`

### Risk Intelligence

**031. Heat risk score** - Calculates a transparent heat risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**032. Rain risk score** - Calculates a transparent rain risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**033. Lightning / thunderstorm risk** - Calculates a transparent lightning / thunderstorm risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**034. Flood-risk indicator** - Combines heavy precipitation, storm and recent-weather signals into a prototype flood-risk indicator; it is not an official flood warning.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**035. Strong-wind risk** - Calculates a transparent strong-wind risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**036. Visibility risk** - Calculates a transparent visibility risk from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**037. Outdoor safety score** - Calculates a transparent outdoor safety score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**038. Travel safety score** - Calculates a transparent travel safety score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**039. Overall weather-risk score** - Calculates a transparent overall weather-risk score from forecast variables with deterministic JavaScript/n8n rules, then exposes the contributing reasons.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

**040. Explainable risk reasons** - Shows which inputs contributed to the risk score so the score is explainable rather than a black box.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT rules + Open-Meteo`

### Disaster Intelligence

**041. Official alert integration** - Combines authoritative NDMA SACHET alerts with NASA EONET natural-event intelligence while keeping WeatherGPT-derived scores clearly separate.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**042. District / state warning matching** - Matches official alerts to the searched state/district and also checks NASA EONET events within a configurable geographic radius.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**043. Extreme-rain alerts** - Surfaces authoritative heavy-rain alerts when present and augments situational awareness with nearby EONET events.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**044. Lightning / thunderstorm warnings** - Shows official thunderstorm/lightning warnings when available and relates them to current forecast risk.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**045. Heat-wave warnings** - Shows official heat-wave warnings when available and compares them with the local heat-risk calculation.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**046. Cyclone information scanner** - Uses NASA EONET severe-storm events plus official warning data to provide a cyclone/severe-storm situational scanner.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**047. Flood guidance** - Provides prototype flood-safety guidance from forecast/risk inputs while keeping official warnings visually distinct.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**048. Disaster response mode** - Switches the assistant into disaster-response guidance mode with alerts, EONET events, safety actions and source-first language.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**049. Emergency recommendations** - Generates practical emergency precautions from the hazard type without presenting AI guidance as an official authority instruction.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

**050. Disaster event timeline** - Builds a timeline/list of nearby NASA EONET natural events using event title, category, date, coordinates and source links.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `NDMA SACHET + NASA EONET + WeatherGPT`

### Personalization

**051. Home location saving** - Uses browser localStorage and n8n context to provide home location saving without requiring paid authentication or a cloud database.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**052. Favourite locations** - Uses browser localStorage and n8n context to provide favourite locations without requiring paid authentication or a cloud database.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**053. User weather preferences** - Uses browser localStorage and n8n context to provide user weather preferences without requiring paid authentication or a cloud database.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**054. Daily weather briefing** - Generates a reusable daily summary containing weather, risk, useful time windows and active alerts.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `localStorage + n8n`

**055. Morning forecast brief** - n8n can execute a scheduled morning briefing for the configured home location using the same zero-cost data stack.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `localStorage + n8n`

**056. Evening forecast brief** - Produces an evening-oriented summary using the upcoming nighttime and next-morning forecast window.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `localStorage + n8n`

**057. Personal rain alert** - Uses the saved rain threshold/preferences to decide whether a browser rain alert should be offered.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**058. Personal heat alert** - Uses apparent temperature and saved preferences to generate a personal heat alert.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**059. Severe-weather browser alert** - Uses browser Notification permission to surface severe-weather reminders without a paid SMS/WhatsApp gateway.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

**060. Personalized recommendation engine** - Combines saved location, preferences, risk and activity scores to personalize recommendations.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage + n8n`

### Activity Intelligence

**061. Running suitability** - Scores running suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**062. Walking suitability** - Scores walking suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**063. Cycling suitability** - Scores cycling suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**064. Cricket suitability** - Scores cricket suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**065. Football suitability** - Scores football suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**066. Outdoor-event suitability** - Scores outdoor-event suitability from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**067. Photography weather score** - Scores photography weather score from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**068. Laundry drying score** - Scores laundry drying score from rain, temperature, wind, UV, visibility and overall risk so the recommendation remains explainable.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**069. Best outdoor time** - Scans the next 24 hours in 3-hour windows and selects the lowest-risk outdoor window based on rain, wind, heat and UV.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

**070. Activity recommendation engine** - Transforms weather and risk variables into activity-specific advice instead of showing only raw weather values.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `WeatherGPT scoring rules + Open-Meteo`

### Maps & Visualization

**071. Interactive weather map** - Displays the searched location and intelligence layers on an interactive Leaflet/OpenStreetMap map.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**072. Temperature map layer** - Builds temperature points/tiles from the n8n map-grid workflow for a prototype temperature layer.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**073. Rainfall map layer** - Builds precipitation values over a local map grid for a prototype rainfall layer.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**074. Wind visualization** - Displays wind values/direction from forecast-grid data to provide spatial wind context.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**075. Cloud layer** - Uses cloud-cover/condition data in the map-grid layer to represent cloud conditions.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**076. Warning-region layer** - Places matched official-warning and NASA EONET hazard locations on the map without relabelling derived risk as official.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**077. Current-location marker** - Marks the user-selected or geolocated coordinates on the interactive map.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**078. Forecast timeline slider** - Lets the map/grid data be associated with forecast time so the prototype can step through upcoming conditions.

Status: `LIVE` | Implementation: `Leaflet/OpenStreetMap+n8n grid` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**079. Animated weather cards** - Uses animated cards, counters, hover motion, background weather shapes and scrolling marquee effects to make the dashboard feel live.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

**080. Weather charts** - Shows hourly temperature and rain charts with Chart.js for fast visual interpretation.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `Leaflet + OpenStreetMap + Open-Meteo`

### Specialized Modes

**081. Travel mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for travel mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**082. Agriculture mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for agriculture mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**083. Disaster response mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for disaster response mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**084. Student / college mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for student / college mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**085. Outdoor sports mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for outdoor sports mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**086. Marine weather mode** - Uses Open-Meteo Marine data through n8n for wave/wind context; it is prototype guidance, not certified navigation data.

Status: `LIVE` | Implementation: `Open-Meteo Marine+n8n` | Source: `Open-Meteo Marine`

**087. Event planner mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for event planner mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**088. Health / comfort mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for health / comfort mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**089. Smart city mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for smart city mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**090. Research mode** - Reuses the same verified weather/alert context but changes the assistant and scoring priorities for research mode.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

### Advanced

**091. Multilingual assistant** - Lets the AI response language switch between English, Tamil and Hindi while keeping the same grounded weather context.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `n8n + Gemini + grounded weather data`

**092. Voice questions** - Uses the browser Web Speech Recognition interface to convert spoken questions into text at zero API cost where supported.

Status: `LIVE` | Implementation: `Browser Web Speech API` | Source: `Browser Web Speech API`

**093. Voice weather briefing** - Uses browser speech synthesis to read WeatherGPT answers aloud where supported.

Status: `LIVE` | Implementation: `Browser Web Speech API` | Source: `Browser Web Speech API`

**094. Weather-source citations** - Keeps source labels visible for Open-Meteo, NDMA SACHET, NASA EONET, OpenStreetMap and AI-derived results.

Status: `LIVE` | Implementation: `frontend+n8n` | Source: `frontend+n8n`

**095. Multi-model forecast verification** - Queries multiple numerical weather-model outputs through the Open-Meteo model interfaces and compares their key forecast values.

Status: `LIVE` | Implementation: `ECMWF+GFS+ICON via Open-Meteo+n8n` | Source: `Open-Meteo multi-model`

**096. Forecast confidence score** - Converts cross-model agreement into a prototype confidence indicator so users can see when models disagree.

Status: `LIVE` | Implementation: `ECMWF+GFS+ICON via Open-Meteo+n8n` | Source: `Open-Meteo multi-model`

**097. Citizen weather reporting** - Accepts a local community weather report through an n8n webhook and labels it as community-supplied, never official.

Status: `LIVE` | Implementation: `localStorage+n8n` | Source: `localStorage+n8n`

**098. Weather anomaly detection** - Compares recent observations/forecast past-days values with current conditions to flag unusual changes.

Status: `LIVE` | Implementation: `Open-Meteo Forecast past_days+n8n` | Source: `Open-Meteo past_days`

**099. Recent-history analytics** - Uses Open-Meteo Forecast past_days data for recent-history trends without requiring the paid long-term historical API.

Status: `LIVE` | Implementation: `Open-Meteo Forecast past_days+n8n` | Source: `Open-Meteo past_days`

**100. Experimental local nowcast model** - Runs a clearly labelled experimental trend/persistence nowcast in n8n. It is a prototype model and is never presented as a meteorological authority forecast.

Status: `EXPERIMENTAL` | Implementation: `n8n local trend/persistence model` | Source: `n8n experimental local model`

## 12. Risk engine - exact prototype logic

Both the n8n Weather Core and frontend fallback use deterministic logic so the risk number can be explained. The current rule set examines the next ~12 hours.

- Rain probability >=85%: +30; >=60%: +18; >=35%: +8.

- Wind gust >=55 km/h: +25; >=38 km/h: +13.

- WMO thunderstorm code 95/96/99 in the upcoming window: +30.

- Apparent temperature >=42 C: +24; >=37 C: +12.

- UV >=8: +10.

- Visibility <3 km: +12; <7 km: +5.

- Total is capped at 100. Levels: 0-20 LOW, 21-40 MODERATE, 41-60 ELEVATED, 61-80 HIGH, 81-100 EXTREME.



Activity scores start from `100 - overall risk` and apply additional activity-specific penalties. The best outdoor time scans 3-hour windows over the next 24 hours and penalizes rain, wind, heat and high UV.

## 13. Complete Windows activation guide

### 13.1 Prerequisites

- Windows 10/11 recommended for the provided `.bat` scripts.

- Python 3 available as `python` or `py`.

- Node.js + npm.

- n8n Community Edition installed locally.

- Chrome/Edge recommended for Web Speech and PWA testing.

- Internet access for Open-Meteo, Gemini, SACHET, NASA EONET and OSM tiles.



### 13.2 Extract and start the frontend

```text
1. Extract the ZIP.
2. Open the project folder.
3. Double-click scripts\start_frontend_windows.bat
4. Keep the terminal window open.
5. Open http://localhost:8080
6. Open http://localhost:8080/features.html for the 100-feature catalogue.
```

If the batch file fails, open PowerShell in the project directory:

```powershell
cd frontend
python -m http.server 8080
```

If `python` is not recognized, try `py -m http.server 8080`. Do not rely on double-clicking `index.html`; localhost is the intended test path.

### 13.3 Install/start n8n

```powershell
node --version
npm --version
npm install -g n8n
n8n start
```

n8n normally runs at `http://localhost:5678`. The project setting drawer defaults to that base URL.

### 13.4 Create/set Gemini key

Create a key in Google AI Studio. Keep it in the environment that launches n8n; never place it in frontend JavaScript.

```powershell
$env:GEMINI_API_KEY="YOUR_KEY"
$env:GEMINI_MODEL="gemini-3.7-flash"
$env:WEATHERGPT_HOME="Nagercoil"
n8n start
```

### 13.5 Import workflows

In n8n, import JSON files from `n8n/workflows/` in numeric order. Importing does not automatically make production webhook URLs live; activate the relevant workflow after inspecting it.

### 13.6 Recommended activation order

- Activate 04 Status first. Refresh the frontend and confirm the n8n indicator changes to connected.

- Activate 01 Weather Core. Search Nagercoil/Chennai and confirm the frontend data source changes to n8n.

- Activate 03 SACHET Alerts. Open DISASTERS and inspect official-feed matches/source links.

- Activate 13 NASA EONET. Open DISASTERS/MAP and inspect nearby EONET results/markers.

- Activate 02 Gemini Chat after `GEMINI_API_KEY` is present. Ask grounded weather questions.

- Enable 05 only if you want the scheduled morning brief.

- Activate/test 06-12 individually using the example webhook bodies in this guide. Wire them to UI/API fetch nodes only after their standalone responses are correct.



### 13.7 Frontend settings

- Default n8n base URL: `http://localhost:5678`.

- Default city: Nagercoil.

- Direct weather fallback is enabled unless disabled in settings/localStorage.

- Browser notifications require user permission.

- Voice input support depends on the browser.



## 14. End-to-end test plan

- Health: load frontend and confirm n8n connected after workflow 04 is active.

- Weather: search Nagercoil, Chennai, Delhi and Mumbai; validate current temp, humidity, wind, rain, UV, visibility, AQI and 7-day data.

- Risk: compare a low-risk and high-rain city; ensure reasons change with the score.

- Planner: inspect best 3-hour outdoor window and activity scores.

- Copilot: ask “Will it rain today?”, “Should I carry an umbrella?”, “Can I travel at 5 PM?”, “What is the safest outdoor time?”

- Multilingual: switch to Tamil/Hindi and ask a weather question; verify no measurements are invented.

- Voice: test microphone capture and optional speech synthesis in Chrome/Edge.

- Official alerts: confirm SACHET content is source-labelled and separate from derived risk.

- NASA EONET: confirm event title/category/distance/source and map markers if events are within radius.

- Feature Atlas: open `features.html`, search NASA/Flood/Voice/Risk and confirm all 100 entries can be browsed.

- Advanced workflows: execute 06-12 with the provided curl bodies and inspect JSON output.

- QA scripts: run `python scripts\check_project.py` and `python scripts\check_100_features.py`.



## 15. Troubleshooting decision tree

- **Frontend not loading:** start a local HTTP server from `frontend/`; verify port 8080 is free.

- **Weather works but n8n says offline:** activate workflow 04 and confirm n8n is actually running on the configured base URL.

- **Webhook 404:** workflow is imported but not active, or the path differs from the file.

- **Weather works but AI falls back locally:** check `GEMINI_API_KEY`, restart n8n, then execute workflow 02 manually and inspect the HTTP Request node result.

- **Gemini 401/403:** key/project/model access issue; verify AI Studio key and current model availability.

- **NASA EONET returns none:** there may simply be no open Point event within 500 km; increase radius/days for testing but keep UI wording honest.

- **SACHET returns no matched alerts:** text matching is intentionally conservative; no match does not mean there is no alert anywhere. Open the SACHET source portal.

- **Map blank:** verify internet access to OpenStreetMap tiles, browser console errors and Leaflet load.

- **Voice unavailable:** use Chrome/Edge and allow microphone permission; typed chat is the fallback.

- **Advanced module produces only scaffold data:** expected for workflows 07-12 unless upstream data-fetching nodes/UI wiring have been added.



## 16. Six-person team ownership

- Member 1 - Frontend/UX: festival design, responsive behavior, animations, accessibility, Feature Atlas.

- Member 2 - Weather data: Open-Meteo variables, geocoding, AQI, model/flood/marine data connectors.

- Member 3 - n8n: workflow import, webhooks, environment variables, scheduling, error paths.

- Member 4 - AI: Gemini prompt, language modes, grounding, hallucination and source-integrity tests.

- Member 5 - Risk/disaster: risk rules, SACHET, NASA EONET, community-report boundaries, flood/marine disclaimers.

- Member 6 - Integration/QA: charts, map, PWA, advanced module wiring, regression tests, final demo.



## 17. Demonstration narrative

Pitch WeatherGPT as a **weather decision and disaster-intelligence copilot**, not as a weather forecast provider. The project consumes weather/public-event data, derives explainable scores, and converts the data into decisions.

Recommended live demo order: Command Center -> search location -> risk explanation -> Planner -> Copilot question -> Disaster page showing SACHET/NASA separation -> Map -> 100 Features page -> n8n tab showing workflows.

## 18. What still needs work before production

- Authentication and user accounts.

- Persistent server database and data-retention/privacy design.

- Production secrets management and hardened reverse proxy/TLS.

- Scalable n8n deployment, monitoring, retries, cache, backups and uptime strategy.

- Commercial API licensing and quota planning.

- Production-grade map tile provider/self-hosting instead of relying on community OSM raster tiles at scale.

- Geospatial CAP parsing instead of the current SACHET text-match prototype.

- Upstream automated data-fetching nodes and UI wiring for workflows 07-12.

- Formal calibration/validation of WeatherGPT risk scores and Feature 100.

- Accessibility, browser compatibility and security audit.

- Optional mobile app, push, email/Telegram/WhatsApp/SMS only after cost/consent/terms review.



## 19. New ChatGPT account migration procedure

For a completely new ChatGPT account, upload the **latest project ZIP** and either this Master Handoff file or let the account read it from the ZIP. Then paste `NEW_CHATGPT_ACCOUNT_PROMPT.txt`. Tell the new account that this document and `PROJECT_STATE.json` are the source of truth, and that it must inspect actual files before changing architecture.

The structured `PROJECT_STATE.json` is intentionally included so another AI can quickly reconstruct architecture, workflow maturity, endpoints, sources, safety rules and all 100 feature definitions without depending on conversation memory.

## 20. Rules for future AI/developer changes

- Do not delete or renumber existing features casually; `features.json` is the catalogue source of truth.

- Do not claim a new feature is end-to-end until its UI call, n8n path and data source are tested.

- Keep official alerts, NASA events, community reports and derived scores visually/source-wise separate.

- Never put Gemini or other secret keys into frontend files.

- Keep n8n as the primary orchestration layer unless the project architecture is intentionally revised and documented.

- Maintain the bright festival design direction; do not regress to a generic dark dashboard.

- For prototype work, preserve the INR 0-first constraint unless the owner explicitly changes it.

- Before production, re-verify all external API terms, quotas and model names.



## 21. Official references verified 2026-08-28

https://eonet.gsfc.nasa.gov/docs/v3

https://open-meteo.com/en/docs

https://open-meteo.com/en/pricing

https://open-meteo.com/en/docs/air-quality-api

https://sachet.ndma.gov.in/

https://ai.google.dev/gemini-api/docs

https://ai.google.dev/gemini-api/docs/pricing

https://operations.osmfoundation.org/policies/tiles/

https://docs.n8n.io/hosting/installation/npm/
