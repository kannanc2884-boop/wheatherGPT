# WeatherGPT v5 — Firebase Email Login + Verification Setup

**Build:** `20260905-v5`  
**Goal:** A user must create/sign in with an email account and Firebase must report that email as verified before `index.html` or `features.html` unlocks.

## What is already implemented in the ZIP

- `frontend/login.html` — sign-in / create-account screen.
- `frontend/login.js` — account creation, sign-in, verification email, resend verification, password reset.
- `frontend/auth-guard.js` — protects `index.html` and `features.html` and redirects unverified/anonymous users to login.
- `frontend/firebase-config.js` — the only file where you paste your Firebase Web App configuration.
- Verified account chip + **Sign out** action in the app and capability atlas.

## 1. Create the Firebase project

1. Open Firebase Console and create a project such as **WeatherGPT**.
2. In Project Overview choose **Add app > Web (`</>`)**.
3. Register the Web App, for example `WeatherGPT Web`.
4. Firebase displays a configuration object containing `apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, and `appId`.
5. Copy those values into `frontend/firebase-config.js`, replacing all `PASTE_...` placeholders.

The project uses Firebase JavaScript SDK **12.18.0** via Google's CDN.

## 2. Enable email/password authentication

In Firebase Console:

1. Open **Authentication**.
2. Open **Sign-in method**.
3. Enable **Email/Password**.
4. Save.

WeatherGPT intentionally requires email verification after account creation.

## 3. Authorize localhost for the college prototype

Firebase projects created after April 28, 2025 no longer automatically include `localhost` as an authorized domain. For local testing:

1. Firebase Console > Authentication > **Settings**.
2. Find **Authorized domains**.
3. Add `localhost`.

When later deployed, add the real frontend domain too.

## 4. Optional: customize the verification email

Authentication > **Templates** > Email address verification. Set a WeatherGPT sender name/subject if desired.

## 5. Run and test

Start the frontend with:

```text
scripts\start_frontend_windows.bat
```

Open:

```text
http://localhost:8080/login.html
```

Test this exact flow:

1. Click **CREATE ACCOUNT**.
2. Enter a real email and password.
3. WeatherGPT calls Firebase account creation and sends a verification email.
4. Open the verification email and follow the link.
5. Return to `login.html` and sign in.
6. Only when `emailVerified === true` does WeatherGPT allow `index.html` and `features.html`.
7. Click the account chip > **SIGN OUT** and confirm protected pages return to login.

## 6. Common problems

### `Firebase setup required`
`frontend/firebase-config.js` still contains placeholder values.

### `auth/operation-not-allowed`
Email/Password is not enabled in Firebase Authentication.

### `auth/unauthorized-domain`
Add `localhost` (or your deployed domain) to Firebase Authentication > Settings > Authorized domains.

### Verification email not visible
Check spam/junk, wait briefly, and use **RESEND VERIFICATION** on the login page. The user must enter the same email/password so WeatherGPT can resend securely.

### User verified but app still says unverified
Return to login and sign in again. The app reloads the Firebase user record before checking `emailVerified`.

## Security boundary

This implementation provides a real Firebase Authentication gate for the **frontend**. It prevents unverified users from using the normal WeatherGPT pages. For a public production deployment, the n8n webhook endpoints themselves should also be protected server-side (for example by validating Firebase ID tokens in a gateway or authenticated backend). Do not treat a frontend-only gate as authorization for a public API.
