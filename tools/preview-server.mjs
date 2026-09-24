import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homepageRedirect, retiredOverviewPaths } from '../public-page-routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const types = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
]);

const server = createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  if (retiredOverviewPaths.has(pathname)) {
    response.writeHead(301, { location: '/' }).end();
    return;
  }
  const publicFile = pathname === '/' || /^\/[\w-]+\.(?:html|css|js)$/.test(pathname) ||
    /^\/assets\/[\w./-]+\.(?:svg|png|jpe?g|webp)$/.test(pathname);
  const filename = path.resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
  if (!publicFile || !filename.startsWith(`${root}${path.sep}`) || !types.has(path.extname(filename))) {
    response.writeHead(404).end();
    return;
  }
  try {
    const item = await stat(filename);
    if (!item.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'content-type': types.get(path.extname(filename)), 'cache-control': 'no-store' });
    response.end(await readFile(filename));
  } catch {
    const redirect = homepageRedirect(pathname);
    response.writeHead(redirect || 404, redirect ? { location: '/' } : {}).end();
  }
});

server.listen(8788, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:8788/'));
