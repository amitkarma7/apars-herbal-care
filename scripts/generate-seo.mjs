// Generates robots.txt and sitemap.xml from `seo.siteUrl` in src/app/config/site-config.ts.
// With --dist it also writes absolute canonical and Open Graph URLs into the built index.html,
// so link previews work for crawlers that do not run JavaScript.
// Runs automatically before and after `npm run build`.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = readFileSync(join(root, 'src/app/config/site-config.ts'), 'utf8');
const match = config.match(/siteUrl:\s*'([^']*)'/);
const siteUrl = (match?.[1] ?? '').trim().replace(/\/+$/, '');
const valid = /^https:\/\/[^\s/]+/.test(siteUrl);

if (siteUrl && !valid) {
  console.warn(`[seo] Ignoring siteUrl "${siteUrl}": it must start with https://`);
}

if (process.argv.includes('--dist')) {
  const indexPath = join(root, 'dist/apars-herbal-care/browser/index.html');
  if (valid && existsSync(indexPath)) {
    let html = readFileSync(indexPath, 'utf8');
    html = html.replace('content="/images/og-image.jpg"', `content="${siteUrl}/images/og-image.jpg"`);
    if (!html.includes('rel="canonical"')) {
      html = html.replace(
        '<meta property="og:type"',
        `<link rel="canonical" href="${siteUrl}/">\n  <meta property="og:url" content="${siteUrl}/">\n  <meta property="og:type"`,
      );
    }
    writeFileSync(indexPath, html);
    console.log(`[seo] Wrote canonical and Open Graph URLs for ${siteUrl}`);
  }
} else {
  const robots = ['User-agent: *', 'Allow: /'];
  const sitemapPath = join(root, 'public/sitemap.xml');
  if (valid) {
    robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
    const today = new Date().toISOString().slice(0, 10);
    writeFileSync(
      sitemapPath,
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n</urlset>\n`,
    );
    console.log(`[seo] robots.txt and sitemap.xml generated for ${siteUrl}`);
  } else {
    rmSync(sitemapPath, { force: true });
    console.log('[seo] siteUrl not set: robots.txt generated without a sitemap');
  }
  writeFileSync(join(root, 'public/robots.txt'), `${robots.join('\n')}\n`);
}
