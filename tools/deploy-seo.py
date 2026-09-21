"""Run on Marvin after uploading the narrow SEO payload to /tmp/vanventure-seo.

Does not replace travel-stories.json, database volumes, environment or Compose files.
"""
from pathlib import Path
import datetime
import hashlib
import shutil
import subprocess

root = Path('/opt/vanventure')
payload = Path('/tmp/vanventure-seo')
expected = {
    'editor/server.mjs': '0634c48f9f1b476a6410dee366e700762e5b90018ad4ad37b3e6719cbd80ec2b',
    'editor/render.mjs': '09a492ad438e86c3cccc67b929bffa9f2ed195a6de04c52dab380ea649a02d80',
}
for name, digest in expected.items():
    if hashlib.sha256((root / name).read_bytes()).hexdigest() != digest:
        raise SystemExit(f'Server changed since inspection: {name}')
stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%SZ')
backup = Path('/opt/vanventure-backups') / ('seo-' + stamp)
backup.mkdir(parents=True, mode=0o700)
files = list(expected) + ['editor/seo.mjs', 'tools/build-seo.mjs']
affected = files + ['index.html', 'vehicle.html', 'norwegen-2018.html', 'sardinien-2019.html', 'italien-2021.html', 'robots.txt', 'sitemap.xml']
present = []
for name in affected:
    source = root / name
    if source.exists():
        dest = backup / name
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, dest)
        present.append(name)

def run(*args):
    subprocess.run(args, cwd=root, check=True)

old_image = 'vanventure-web:before-seo-' + stamp.lower()
run('docker', 'tag', 'vanventure-web', old_image)
try:
    for name in files:
        target = root / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(payload / name, target)
    # Only built-in Node modules are needed; use the existing runtime image.
    run('docker', 'run', '--rm', '--network', 'none', '--user', '0:0', '-v', f'{root}:/app', '-w', '/app', '--entrypoint', 'node', old_image, 'tools/build-seo.mjs')
    run('docker', 'compose', 'build', 'web')
    run('docker', 'compose', 'up', '-d', '--no-deps', '--wait', 'web')
except Exception:
    for name in affected:
        if name in present:
            shutil.copy2(backup / name, root / name)
        elif (root / name).exists():
            (root / name).unlink()
    run('docker', 'tag', old_image, 'vanventure-web:latest')
    run('docker', 'compose', 'up', '-d', '--no-deps', '--wait', 'web')
    raise
print(f'SEO deployed. Rollback files: {backup}; rollback image: {old_image}', flush=True)
