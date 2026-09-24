from pathlib import Path
root=Path(__file__).resolve().parents[1]
login=(root/'frontend/login.html').read_text(encoding='utf-8')
loginjs=(root/'frontend/login.js').read_text(encoding='utf-8')
guard=(root/'frontend/auth-guard.js').read_text(encoding='utf-8')
idx=(root/'frontend/index.html').read_text(encoding='utf-8')
atlas=(root/'frontend/features.html').read_text(encoding='utf-8')
config=(root/'frontend/firebase-config.js').read_text(encoding='utf-8')
assert 'createUserWithEmailAndPassword' in loginjs
assert 'signInWithEmailAndPassword' in loginjs
assert 'sendEmailVerification' in loginjs
assert 'sendPasswordResetEmail' in loginjs
assert 'emailVerified' in loginjs and 'emailVerified' in guard
assert 'auth-guard.js' in idx and 'auth-guard.js' in atlas
assert 'data-auth-logout' in idx and 'data-auth-logout' in atlas
assert 'PASTE_FIREBASE_API_KEY' in config
assert 'login.html' in guard
print('PASS: Firebase email/password + mandatory email verification + protected pages + sign-out wiring present')
