// Old overview pages are no longer public content. Keep their addresses as
// redirects only; unrelated missing page routes return to the homepage too.
export const retiredOverviewPaths = new Set(['/bike.html', '/ausruestung.html']);

export function homepageRedirect(pathname) {
  if (retiredOverviewPaths.has(pathname)) return 301;
  if (/^\/[A-Za-z][A-Za-z0-9_-]*\.html$/.test(pathname)) return 302;
  return null;
}
