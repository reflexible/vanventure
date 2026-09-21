"""Read-only HTTPS verification; can run on the server with Python's standard library."""
import json
import re
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET

base = 'https://vanventure.at'
def get(path, method='GET'):
    return urllib.request.urlopen(urllib.request.Request(base + path, method=method), timeout=20)

with get('/sitemap.xml') as response:
    assert response.status == 200
    assert 'application/xml' in response.headers['Content-Type']
    urls = [el.text for el in ET.fromstring(response.read()).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) == 5
for url in urls:
    with get(url.removeprefix(base)) as response:
        html = response.read().decode('utf-8')
        assert response.status == 200
        assert f'<link rel="canonical" href="{url}">' in html
        assert len(re.findall(r'<title>', html)) == 1
        assert 'noindex' not in html
        data = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)[1])
        image = data['@graph'][1]['primaryImageOfPage']['url']
        assert image.startswith(base + '/')
    with get(image.removeprefix(base), 'HEAD') as response:
        assert response.status == 200
    print('OK page, canonical, JSON-LD, image:', url)
with get('/robots.txt') as response:
    assert 'Sitemap: ' + base + '/sitemap.xml' in response.read().decode()
with get('/redaktion') as response:
    assert response.headers['X-Robots-Tag'] == 'noindex, nofollow'
with get('/index.html') as response:
    assert response.url == base + '/'
with get('/healthz') as response:
    assert json.load(response)['status'] == 'ok'
for path in ['/.env', '/editor/seo.mjs', '/travel-stories.json']:
    try:
        get(path)
        raise AssertionError('Private path accessible: ' + path)
    except urllib.error.HTTPError as error:
        assert error.code == 404
print('OK sitemap, robots, redirect, editorial noindex, health and private-file protection')
