// Checks the built site in dist/ (run after the build): internal links and #anchors, one <h1>, title, description,
// canonical, hreflang pairs, html lang, unique ids, valid JSON-LD, image alt and size, sitemap entries and leftover
// placeholder text.
// No dependencies: `node scripts/check.mjs`. Exits with 1 when something is wrong.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const rawBase = (process.env.BASE_PATH ?? '/').trim();
const BASE = !rawBase || rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else files.push(p);
  }
})(DIST);
const html = files.filter((f) => f.endsWith('.html'));
const errors = [];
const err = (file, msg) => errors.push(`${path.relative(DIST, file)}: ${msg}`);
const ids = new Map(); // file → Set(ids)
const src = new Map();
for (const f of html) {
  const s = fs.readFileSync(f, 'utf8');
  src.set(f, s);
  ids.set(f, new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

/** Resolve an internal URL (with the base path) to a file in dist/. */
function target(url) {
  let p = url.split('#')[0].split('?')[0];
  if (!p.startsWith(BASE)) return null;
  p = decodeURIComponent(p.slice(BASE.length));
  const file = path.join(DIST, p);
  if (p === '' || p.endsWith('/')) return path.join(file, 'index.html');
  return file;
}

for (const f of html) {
  const s = src.get(f);
  const rel = path.relative(DIST, f);
  const is404 = /(^|\/)404\.html$/.test(rel);
  const lang = (s.match(/<html lang="([^"]+)"/) || [])[1];
  const expectLang = rel.startsWith('en/') ? 'en' : 'sq';
  if (lang !== expectLang) err(f, `html lang="${lang}", expected "${expectLang}"`);
  const h1 = (s.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(f, `${h1} <h1> elements`);
  const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (title.length < 10 || title.length > 110) err(f, `title length ${title.length}: "${title}"`);
  const desc = (s.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  if (desc.length < 50 || desc.length > 320) err(f, `description length ${desc.length}`);
  if (!/<link rel="canonical" href="https?:\/\/[^"]+"/.test(s)) err(f, 'missing canonical');
  if (!is404) for (const hl of ['sq', 'en', 'x-default']) if (!s.includes(`hreflang="${hl}"`)) err(f, `missing hreflang ${hl}`);
  if (!/<meta property="og:image" content="https?:\/\/[^"]+"/.test(s)) err(f, 'missing og:image');
  // duplicate ids
  const seen = new Set();
  for (const m of s.matchAll(/\sid="([^"]+)"/g)) {
    if (seen.has(m[1])) err(f, `duplicate id "${m[1]}"`);
    seen.add(m[1]);
  }
  // JSON-LD
  for (const m of s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { err(f, `invalid JSON-LD: ${e.message}`); }
  }
  // leftovers
  for (const bad of ['lorem', 'ipsum', 'TODO', 'undefined', 'NaN', '[object', '{n}', '{name}', '{t}']) {
    const visible = s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    if (visible.includes(bad)) err(f, `visible text contains "${bad}"`);
  }
  // images: every <img> has an alt (empty only when the picture is decorative) and its width / height
  for (const m of s.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(m[0])) err(f, `image without alt: ${m[0].slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(m[0]) || !/\sheight="\d+"/.test(m[0])) err(f, `image without width/height: ${m[0].slice(0, 80)}`);
  }
  // links and assets
  for (const m of s.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (/^(https?:|mailto:|tel:|viber:|data:|#$)/.test(url)) continue;
    if (url.startsWith('#')) {
      if (!ids.get(f).has(url.slice(1))) err(f, `missing anchor ${url}`);
      continue;
    }
    const file = target(url);
    if (!file) { err(f, `link outside base: ${url}`); continue; }
    if (!fs.existsSync(file)) { err(f, `broken link ${url}`); continue; }
    const hash = url.split('#')[1];
    if (hash && file.endsWith('.html') && !ids.get(file)?.has(hash)) err(f, `missing anchor ${url}`);
  }
}

// sitemap
const sitemap = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
for (const p of locs) if (!fs.existsSync(target(p))) errors.push(`sitemap.xml: ${p} has no file`);
const pages = html.filter((f) => !/404\.html$/.test(f)).length;
if (locs.length !== pages) errors.push(`sitemap.xml: ${locs.length} URLs for ${pages} pages`);

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`✓ ${html.length} HTML files, ${locs.length} sitemap URLs — links, anchors, images, titles, descriptions, hreflang, ids and JSON-LD OK`);
