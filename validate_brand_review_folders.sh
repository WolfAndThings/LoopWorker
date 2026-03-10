#!/bin/zsh
set -euo pipefail

BASE="/Users/alexlamb/Desktop/AE_Exports"

python3 - <<'PY'
import re
from pathlib import Path
import sys

base = Path('/Users/alexlamb/Desktop/AE_Exports')

errors = []

# Homepage portfolio cards in fixed order
expected_cards = [
    ('CULT BRAND', 'CULT_BRAND'),
    ('LUX', 'LUX'),
    ('CLEAN DTC', 'CLEAN_DTC'),
    ('UGC / LIFESTYLE', 'UGC_LIFESTYLE'),
    ('EDITIRIAL', 'EDITIRIAL'),
    ('CINEMATIC', 'CINEMATIC'),
]

home = (base / 'index.html').read_text()
cards = home.split('<div class="brand-card fade-up">')[1:]
if len(cards) < len(expected_cards):
    errors.append(f"index.html: expected at least {len(expected_cards)} portfolio cards, found {len(cards)}")
else:
    for (name, folder), card in zip(expected_cards, cards):
        imgs = re.findall(r'src="(LoopWorker/BRAND_REVIEW/[^"?]+)', card)
        for img in imgs:
            if f'/{folder}/' not in img:
                errors.append(f"index.html ({name}): wrong folder in {img}; expected {folder}")

# Style pages must use only their own folder
style_pages = {
    'cult-brand.html': 'CULT_BRAND',
    'lux.html': 'LUX',
    'clean-dtc.html': 'CLEAN_DTC',
    'ugc-lifestyle.html': 'UGC_LIFESTYLE',
    'editorial.html': 'EDITIRIAL',
    'cinematic.html': 'CINEMATIC',
}

for fn, folder in style_pages.items():
    t = (base / fn).read_text()
    imgs = re.findall(r'src="(LoopWorker/BRAND_REVIEW/[^"?]+)', t)
    for img in imgs:
        if f'/{folder}/' not in img:
            errors.append(f"{fn}: wrong folder in {img}; expected {folder}")

# Disallow _NEW folders in core site files
core_files = [
    'index.html','loopworker_site.html','cult-brand.html','lux.html','clean-dtc.html',
    'ugc-lifestyle.html','editorial.html','cinematic.html','style-intelligence-guide.html',
    'image-sitemap.xml','sitemap.xml'
]
for fn in core_files:
    t = (base / fn).read_text()
    if re.search(r'BRAND_REVIEW/[^\s"\']*_NEW', t):
        errors.append(f"{fn}: contains forbidden _NEW folder reference")

if errors:
    print('VALIDATION FAILED')
    for e in errors:
        print('-', e)
    sys.exit(1)

print('VALIDATION PASSED: all folder mappings are correct and _NEW folders are not referenced.')
PY
