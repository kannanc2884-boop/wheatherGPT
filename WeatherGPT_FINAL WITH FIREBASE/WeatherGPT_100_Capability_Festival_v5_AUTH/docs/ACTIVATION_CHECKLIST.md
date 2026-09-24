# WeatherGPT v5 Activation Checklist — 100 Capabilities / 14 Workflows / Firebase Auth

## Firebase
- [ ] Create Firebase Web App.
- [ ] Enable Email/Password authentication.
- [ ] Add `localhost` to Authorized domains.
- [ ] Paste config into `frontend/firebase-config.js`.
- [ ] Create test user and verify the email.
- [ ] Confirm unverified user cannot enter app.
- [ ] Confirm verified user can enter and sign out.

## n8n
- [ ] Start n8n.
- [ ] Import all 14 workflows.
- [ ] Publish/activate production webhooks.
- [ ] Configure Gemini API key in backend session for workflow 02.
- [ ] Run `scripts\test_backend_easy_windows.bat`.

## Frontend
- [ ] Start frontend.
- [ ] Open `http://localhost:8080/login.html`.
- [ ] Confirm bright Festival UI after verified login.
- [ ] Confirm Feature Atlas displays exactly 100 entries.
- [ ] Confirm Activity Intelligence appears once in the atlas and all eight profiles remain in Planner.
- [ ] Confirm INTEL+ labels capabilities 94–100.
- [ ] Confirm map/EONET scan area renders.

## Static QA
- [ ] `python scripts\check_project.py`
- [ ] `python scripts\check_100_features.py`
