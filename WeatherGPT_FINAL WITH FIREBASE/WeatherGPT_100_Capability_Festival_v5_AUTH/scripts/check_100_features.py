from pathlib import Path
import json
r=Path(__file__).resolve().parents[1]
features=json.load(open(r/'frontend/data/features.json',encoding='utf-8'))
assert len(features)==100, f'expected exactly 100, got {len(features)}'
assert [x['id'] for x in features]==list(range(1,101))
assert features[60]['name']=='Activity Intelligence Engine'
profiles=features[60].get('profiles',[])
assert profiles==['Running','Walking','Cycling','Cricket','Football','Photography','Laundry Drying','Outdoor Event'], profiles
expected={94:'Weather Route Intelligence',95:'Campus Weather Mode',96:'Event Weather Planner',97:'AI Trip Weather Planner',98:'Weather Scenario Simulator',99:'Heat Stress Intelligence',100:'Indian Languages Mode'}
for i,name in expected.items(): assert features[i-1]['name']==name,(i,features[i-1]['name'])
print('PASS: exactly 100 capabilities; Activity Intelligence merged to one ID; seven decision/language capabilities retained as 94-100')
