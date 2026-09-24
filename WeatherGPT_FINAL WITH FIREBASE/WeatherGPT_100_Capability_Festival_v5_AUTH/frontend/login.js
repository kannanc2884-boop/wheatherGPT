import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendEmailVerification, sendPasswordResetEmail, signOut, onAuthStateChanged, reload, updateProfile
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

const $ = id => document.getElementById(id);
const cfg = window.WEATHERGPT_FIREBASE_CONFIG || {};
const configured = cfg.apiKey && !String(cfg.apiKey).startsWith('PASTE_') && cfg.projectId && !String(cfg.projectId).startsWith('PASTE_');
const params = new URLSearchParams(location.search);
const next = params.get('next') || 'index.html?build=20260905-v5';
let auth = null;
let mode = 'signin';

function message(text, type='info') {
  const box = $('authMessage'); box.textContent = text; box.dataset.type = type; box.hidden = !text;
}
function cleanFirebaseError(err) {
  const code = String(err?.code || '');
  const map = {
    'auth/invalid-credential':'Email or password is incorrect.',
    'auth/invalid-email':'Enter a valid email address.',
    'auth/email-already-in-use':'An account already exists for this email.',
    'auth/weak-password':'Use a stronger password (at least 6 characters).',
    'auth/too-many-requests':'Too many attempts. Wait a little and try again.',
    'auth/network-request-failed':'Network error. Check your internet connection.'
  };
  return map[code] || err?.message || 'Authentication failed. Please try again.';
}
function setMode(nextMode) {
  mode = nextMode;
  document.querySelectorAll('[data-auth-tab]').forEach(b => b.classList.toggle('active', b.dataset.authTab===mode));
  $('displayNameWrap').hidden = mode !== 'signup';
  $('authSubmit').textContent = mode === 'signup' ? 'CREATE ACCOUNT ↗' : 'CONTINUE ↗';
  $('authTitle').textContent = mode === 'signup' ? 'Create your WeatherGPT account' : 'Welcome back';
  $('authSubtitle').textContent = mode === 'signup' ? 'We will send a verification link to your email before the app unlocks.' : 'Sign in with your verified email to open WeatherGPT.';
  message('');
}
function actionSettings() {
  const url = new URL('login.html?verified=1', location.href).href;
  return { url };
}
async function resendFor(email, password) {
  if (!email || !password) { message('Enter your email and password, then click Resend verification.', 'warn'); return; }
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    if (cred.user.emailVerified) { message('This email is already verified. You can sign in now.', 'ok'); await signOut(auth); return; }
    await sendEmailVerification(cred.user, actionSettings());
    localStorage.setItem('wg_pending_verification_email', email);
    await signOut(auth);
    message('Verification email sent again. Open the link in your inbox, then return and sign in.', 'ok');
  } catch (e) { message(cleanFirebaseError(e), 'error'); }
}

if (!configured) {
  $('authCard').classList.add('config-needed');
  $('authForm').hidden = true;
  $('authTabs').hidden = true;
  $('firebaseSetup').hidden = false;
  message('Firebase is not configured yet. Complete the included FIREBASE_AUTH_SETUP_GUIDE.md first.', 'warn');
} else {
  const app = initializeApp(cfg); auth = getAuth(app); auth.useDeviceLanguage();
  onAuthStateChanged(auth, async user => {
    if (!user) return;
    try { await reload(user); } catch {}
    if (user.emailVerified) location.replace(next);
  });
}

document.querySelectorAll('[data-auth-tab]').forEach(btn => btn.addEventListener('click', ()=>setMode(btn.dataset.authTab)));
setMode(params.get('mode') === 'signup' ? 'signup' : 'signin');

if (params.get('reason')==='verify') message('Verify your email address first. Then return here and sign in.', 'warn');
if (params.get('reason')==='signin') message('Sign in to continue to WeatherGPT.', 'info');
if (params.get('verified')) message('Verification link opened. Sign in again; Firebase will confirm the verified status.', 'ok');
if (params.get('signedout')) message('You have been signed out.', 'ok');

$('authForm')?.addEventListener('submit', async e => {
  e.preventDefault(); if (!auth) return;
  const email = $('authEmail').value.trim(); const password = $('authPassword').value;
  $('authSubmit').disabled = true; message(mode==='signup' ? 'Creating account…' : 'Signing in…');
  try {
    if (mode === 'signup') {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const displayName = $('displayName').value.trim();
      if (displayName) await updateProfile(cred.user,{displayName});
      await sendEmailVerification(cred.user, actionSettings());
      localStorage.setItem('wg_pending_verification_email', email);
      await signOut(auth);
      setMode('signin'); $('authEmail').value = email;
      message(`Verification sent to ${email}. Open the email link, then come back and sign in.`, 'ok');
    } else {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await reload(cred.user);
      if (!cred.user.emailVerified) {
        localStorage.setItem('wg_pending_verification_email', email);
        await signOut(auth);
        message('Your email is not verified yet. Check your inbox or use Resend verification.', 'warn');
        return;
      }
      location.replace(next);
    }
  } catch (err) { message(cleanFirebaseError(err), 'error'); }
  finally { $('authSubmit').disabled = false; }
});

$('resendVerification')?.addEventListener('click', ()=>resendFor($('authEmail').value.trim(), $('authPassword').value));
$('forgotPassword')?.addEventListener('click', async ()=>{
  if (!auth) return; const email=$('authEmail').value.trim();
  if (!email) { message('Enter your email address first, then click Forgot password.', 'warn'); return; }
  try { await sendPasswordResetEmail(auth, email); message('Password-reset email sent. Check your inbox.', 'ok'); }
  catch(e){ message(cleanFirebaseError(e),'error'); }
});
const pending = localStorage.getItem('wg_pending_verification_email'); if (pending && $('authEmail')) $('authEmail').value = pending;
