from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
workflows=sorted((root/'n8n/workflows').glob('*.json'))
assert len(workflows)==14, len(workflows)
for f in workflows:
    j=json.loads(f.read_text(encoding='utf-8'))
    assert j.get('nodes') and j.get('connections') is not None
    names={n['name'] for n in j['nodes']}
    for src, branches in (j.get('connections') or {}).items():
        assert src in names, (f.name,src)
        def walk(x):
            if isinstance(x,dict):
                if 'node' in x: assert x['node'] in names,(f.name,x['node'])
                for v in x.values(): walk(v)
            elif isinstance(x,list):
                for v in x: walk(v)
        walk(branches)
    print(f'OK {f.name}: {len(j["nodes"])} nodes')
required=['frontend/login.html','frontend/firebase-config.js','frontend/login.js','frontend/auth-guard.js','frontend/auth.css','frontend/index.html','frontend/style.css','frontend/script.js','frontend/features.html','frontend/features.css','frontend/features.js','frontend/intelligence.js','docs/FIREBASE_AUTH_SETUP_GUIDE.md','docs/BACKEND_N8N_COMPLETE_SETUP_GUIDE.md']
for f in required:
    p=root/f; assert p.exists() and p.stat().st_size>100,(f,p.exists(),p.stat().st_size if p.exists() else 0)
idx=(root/'frontend/index.html').read_text(encoding='utf-8')
atlas=(root/'frontend/features.html').read_text(encoding='utf-8')
assert '107 FEATURES' not in idx and '107 FEATURES' not in atlas
assert '100 FEATURES' in idx and '100 FEATURES' in atlas
assert 'auth-guard.js' in idx and 'auth-guard.js' in atlas
assert 'firebase-config.js' in idx and 'firebase-config.js' in atlas
print('Project static validation passed: 14 workflows + Firebase protected frontend + 100-capability labels.')
