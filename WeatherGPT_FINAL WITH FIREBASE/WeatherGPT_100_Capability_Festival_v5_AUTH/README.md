# WeatherGPT — Festival v5 / 100 Capabilities + Verified Email Login

WeatherGPT is an AI-powered weather and disaster intelligence prototype built with a festival-style responsive frontend, n8n orchestration, Open-Meteo, NDMA SACHET, NASA EONET, Gemini, Leaflet/OpenStreetMap and Firebase Authentication.

## v5 changes

- Capability atlas is back to **exactly 100**.
- Running, Walking, Cycling, Cricket, Football, Photography, Laundry and Outdoor Event are now **one capability: Activity Intelligence Engine (ID 61)** with eight profiles.
- Nothing from those activity modes was removed from the live Planner.
- The seven Decision/Language additions are retained as IDs **94–100**.
- Added `login.html` with Firebase Email/Password authentication.
- New accounts receive an email verification link; unverified users cannot enter `index.html` or `features.html`.
- Added resend verification, password reset, verified account indicator and sign out.
- Full Firebase + n8n setup is documented in `docs/BACKEND_N8N_COMPLETE_SETUP_GUIDE.md`.

## Start here

1. Read `docs/FIREBASE_AUTH_SETUP_GUIDE.md` and configure `frontend/firebase-config.js`.
2. Start n8n with `scripts/start_backend_easy_windows.bat`.
3. Import/publish the 14 workflows if not already done.
4. Test with `scripts/test_backend_easy_windows.bat`.
5. Start the frontend with `scripts/start_frontend_windows.bat`.
6. Open `http://localhost:8080/login.html`.

## QA

```powershell
python scripts\check_project.py
python scripts\check_100_features.py
```

See `docs/V5_QA_REPORT.md` for the final validation summary.
