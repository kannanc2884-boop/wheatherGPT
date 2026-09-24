import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut, reload } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';

const cfg = window.WEATHERGPT_FIREBASE_CONFIG || {};
const configured = cfg.apiKey && !String(cfg.apiKey).startsWith('PASTE_') && cfg.projectId && !String(cfg.projectId).startsWith('PASTE_');
window.__WG_AUTH_REQUIRED__ = true;
window.weatherGPTAuthReady = false;
window.weatherGPTUser = null;

function loginURL(reason='') {
  const next = location.pathname.split('/').pop() + location.search;
  const q = new URLSearchParams({next});
  if (reason) q.set('reason', reason);
  return `login.html?${q.toString()}`;
}
function reveal(user) {
  window.weatherGPTUser = user;
  window.weatherGPTAuthReady = true;
  document.documentElement.classList.add('auth-ok');
  document.documentElement.classList.remove('auth-checking');
  const email = document.getElementById('accountEmail');
  const initial = document.getElementById('accountInitial');
  if (email) email.textContent = user.email || 'Verified user';
  if (initial) initial.textContent = (user.email || 'W').slice(0,1).toUpperCase();
  window.dispatchEvent(new CustomEvent('weathergpt:auth-ready', {detail:{user}}));
}

if (!configured) {
  location.replace(loginURL('firebase-config'));
} else {
  const app = initializeApp(cfg);
  const auth = getAuth(app);
  window.weatherGPTFirebaseAuth = auth;
  onAuthStateChanged(auth, async (user) => {
    if (!user) { location.replace(loginURL('signin')); return; }
    try { await reload(user); } catch {}
    if (!user.emailVerified) {
      try { await signOut(auth); } catch {}
      location.replace(loginURL('verify'));
      return;
    }
    reveal(user);
  });

  document.addEventListener('click', async (event) => {
    const logout = event.target.closest('[data-auth-logout]');
    if (logout) {
      event.preventDefault();
      try { await signOut(auth); } finally { location.replace('login.html?signedout=1'); }
    }
    const account = event.target.closest('[data-account-toggle]');
    if (account) document.getElementById('accountMenu')?.classList.toggle('open');
    if (!event.target.closest('.account-shell')) document.getElementById('accountMenu')?.classList.remove('open');
  });
}
