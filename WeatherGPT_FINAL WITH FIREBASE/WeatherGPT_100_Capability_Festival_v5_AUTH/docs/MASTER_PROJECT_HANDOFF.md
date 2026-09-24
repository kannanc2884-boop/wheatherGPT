# WeatherGPT Master Project Handoff — v5

Build `20260905-v5` contains exactly **100 capabilities**, **14 n8n workflows**, and Firebase email/password authentication with mandatory email verification.

## Identity
WeatherGPT converts live weather, air-quality, official-alert and natural-event data into explainable weather decisions. n8n orchestrates APIs and Gemini; deterministic logic calculates risk/activity/planning outputs; Firebase controls verified user access to the web interface.

## Capability rule
Capability 61 is the single Activity Intelligence Engine. Its eight profiles are Running, Walking, Cycling, Cricket, Football, Photography, Laundry Drying and Outdoor Event. They are not separate feature IDs.

IDs 94–100: Weather Route Intelligence; Campus Weather Mode; Event Weather Planner; AI Trip Weather Planner; Weather Scenario Simulator; Heat Stress Intelligence; Indian Languages Mode.

## Authentication
`login.html` is the entry page. `auth-guard.js` redirects anonymous/unverified users away from `index.html` and `features.html`. Firebase setup is described in `FIREBASE_AUTH_SETUP_GUIDE.md`.

## Backend
Import the 14 JSON workflows under `n8n/workflows`. The frontend expects `http://localhost:5678` by default and uses production `/webhook/...` URLs. Full setup is in `BACKEND_N8N_COMPLETE_SETUP_GUIDE.md`.

## Integrity boundaries
Official NDMA SACHET alerts remain clearly official. WeatherGPT risk is derived. NASA EONET is supporting event intelligence. Citizen reports are unverified. Marine/flood/nowcast/scenario outputs retain prototype/experimental labels where appropriate.
