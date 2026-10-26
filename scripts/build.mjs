// Builds the static site into dist/: every page in Albanian (/) and English (/en/), sitemap, robots, 404,
// llms.txt, manifest and — for a production domain — .htaccess. No dependencies: `node scripts/build.mjs`.
//
// env  BASE_PATH  sub-folder the site is served from (default "/"; GitHub Pages preview: "/humanplus/")
//      SITE_URL   origin for canonical / share links (default https://humanplusks.com)
//      NOINDEX    "1" keeps search engines out (default: on for *.github.io previews, off otherwise)
//      OUT_DIR    output folder (default "dist"); PHOTOS_DIR  photo folder (default "src/assets/photos")
//      The photo version: OUT_DIR=dist/re PHOTOS_DIR=src/variants/re/photos BASE_PATH=/re/ (README → Photos)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SITE, LANGS, SOCIALS } from '../src/data/site.mjs';
import { SERVICES, RETIRED_SERVICES } from '../src/data/services.mjs';
import { layout } from '../src/lib/layout.mjs';
import { iconSprite, useIconSprite } from '../src/lib/html.mjs';
import { homePage } from '../src/pages/home.mjs';
import { servicesPage, servicePage } from '../src/pages/services.mjs';
import { panelsPage, prepPage } from '../src/pages/lab.mjs';
import { testsPage, catalogueFor } from '../src/pages/catalogue.mjs';
import { bookingPage } from '../src/pages/booking.mjs';
import { privacyPage } from '../src/pages/privacy.mjs';
import { aboutPage, contactPage, faqPage, notFoundPage } from '../src/pages/centre.mjs';
import { sceneFiles, photoFiles, PHOTO_DIR } from '../src/lib/photo.mjs';
import { TEST_ROUTES } from '../src/pages/test.mjs';
import { chatData } from '../src/lib/chat.mjs';
import { UI } from '../src/data/ui.mjs';
import { csp, PERMISSIONS_POLICY, REFERRER_POLICY } from '../src/lib/security.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.resolve(ROOT, process.env.OUT_DIR || 'dist');
// The build empties its output folder, so it must be dist/ or a folder inside it.
if (DIST !== path.join(ROOT, 'dist') && !DIST.startsWith(path.join(ROOT, 'dist') + path.sep)) throw new Error(`OUT_DIR must be dist/ or inside it (got ${DIST})`);
const rawBase = (process.env.BASE_PATH ?? '/').trim();
const BASE = !rawBase || rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const ORIGIN = (process.env.SITE_URL ?? 'https://humanplusks.com').replace(/\/+$/, '');
const NOINDEX = process.env.NOINDEX ? process.env.NOINDEX === '1' : /github\.io$/.test(new URL(ORIGIN).hostname);
const PRODUCTION = !/github\.io$/.test(new URL(ORIGIN).hostname);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
// Conservative CSS minifier: drops comments and collapses whitespace, never inside quoted strings (the stylesheet
// carries inline SVG in url("data:…")). Leaves + - ~ alone, so calc() and selectors keep their spaces.
function minifyCss(css) {
  let out = '';
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === '"' || c === "'") {
      const j = css.indexOf(c, i + 1);
      if (j < 0) throw new Error('site.css: unterminated string');
      out += css.slice(i, j + 1);
      i = j;
    } else if (c === '/' && css[i + 1] === '*') {
      const j = css.indexOf('*/', i + 2);
      if (j < 0) throw new Error('site.css: unterminated comment');
      i = j + 1;
    }
    else if (/\s/.test(c)) {
      while (/\s/.test(css[i + 1] ?? '')) i++;
      if (!/[{};,>]$/.test(out) && !/[{};,>]/.test(css[i + 1] ?? '') && out) out += ' ';
    } else out += c;
  }
  return out.replace(/;}/g, '}').trim() + '\n';
}
const write = (rel, content) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const copyDir = (from, to, skip = () => false) => {
  fs.mkdirSync(to, { recursive: true });
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (skip(a)) continue;
    if (e.isDirectory()) copyDir(a, b, skip);
    else fs.copyFileSync(a, b);
  }
};

/* ---- routes: [path, render] — the same slugs in both languages, English under /en/ ---- */
const ROUTES = [
  ['', homePage],
  ['sherbimet', servicesPage],
  ...SERVICES.map((s) => [`sherbim/${s.slug}`, (ctx) => servicePage(ctx, s)]),
  ['analizat', testsPage],
  ['paketat', panelsPage],
  ['pergatitja', prepPage],
  ['rezervo', bookingPage],
  ['rreth-nesh', aboutPage],
  ['kontakt', contactPage],
  ['pyetje', faqPage],
  ['privatesia', privacyPage],
  // One page per test of the lab catalogue: /analizat/<slug>/.
  ...TEST_ROUTES,
];

// Albanian at the root, every other language under /<lang>/ with the same page names.
const urlFor = (p, lang) => `${BASE}${lang === 'sq' ? '' : `${lang}/`}${p ? `${p}/` : ''}`;
const absFor = (p, lang) => `${ORIGIN}${urlFor(p, lang)}`;
const CLINIC_ID = `${ORIGIN}${BASE}#clinic`;

function clinicJsonLd(lang) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'MedicalBusiness'],
    '@id': CLINIC_ID,
    name: SITE.fullName,
    alternateName: [SITE.legalName, 'Human Plus', 'QD Human Plus'],
    url: absFor('', lang),
    logo: `${ORIGIN}${BASE}icon-512.png`,
    image: `${ORIGIN}${BASE}assets/og/og-${lang}.png`,
    foundingDate: String(SITE.founded),
    telephone: SITE.phones[0].tel,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      postalCode: SITE.address.postalCode,
      addressLocality: lang === 'sq' ? SITE.address.city : SITE.address.cityEn,
      addressCountry: SITE.address.country,
    },
    hasMap: SITE.mapsUrl,
    openingHoursSpecification: Object.entries(SITE.hours)
      .filter(([, v]) => v)
      .map(([d, [opens, closes]]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: `https://schema.org/${days[d]}`, opens, closes })),
    medicalSpecialty: ['Pediatric', 'Gynecologic', 'PrimaryCare', 'Endocrine', 'LaboratoryScience'].map((s) => `https://schema.org/${s}`),
    availableLanguage: LANGS,
    sameAs: SOCIALS.map((s) => s.url),
    contactPoint: SITE.phones.map((p) => ({ '@type': 'ContactPoint', telephone: p.tel, contactType: 'customer service', availableLanguage: LANGS })),
  };
}

function websiteJsonLd(lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.fullName,
    url: absFor('', lang),
    inLanguage: lang,
    publisher: { '@id': CLINIC_ID },
    potentialAction: { '@type': 'SearchAction', target: `${absFor('analizat', lang)}?q={q}`, 'query-input': 'required name=q' },
  };
}

function makeCtx(lang, p, version) {
  return {
    lang,
    path: p,
    base: BASE,
    origin: ORIGIN,
    noindex: NOINDEX,
    version,
    preload: [], // the page's main image, filled while the body renders (photo.mjs → layout head)
    clinicId: CLINIC_ID,
    url: (q, l = lang) => urlFor(q, l),
    abs: (q, l = lang) => absFor(q, l),
    wa: (text = '') => `https://api.whatsapp.com/send?phone=${SITE.whatsapp}${text ? `&text=${encodeURIComponent(text)}` : ''}`,
    clinicJsonLd: () => clinicJsonLd(lang),
    chat: CHAT_URL[lang],
    websiteJsonLd: () => websiteJsonLd(lang),
  };
}

/* ---- build ---- */
// Empty dist/ (but keep the folder, so a local preview server keeps serving it).
fs.mkdirSync(DIST, { recursive: true });
for (const e of fs.readdirSync(DIST)) fs.rmSync(path.join(DIST, e), { recursive: true, force: true });

// Assets (fonts, og images, css, js) and root files (favicons…).
copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'), (p) => p === path.join(ROOT, 'src/assets/photos'));
// Photos (from PHOTOS_DIR): images only.
for (const f of photoFiles()) {
  fs.mkdirSync(path.join(DIST, 'assets/photos'), { recursive: true });
  fs.copyFileSync(path.join(PHOTO_DIR, f), path.join(DIST, 'assets/photos', f));
}
copyDir(path.join(ROOT, 'src/static'), DIST);
// The stylesheet refers to fonts relatively ("fonts/…"), so it works under any base path.
const version = crypto.createHash('sha1').update(['src/assets/site.css', 'src/assets/site.js', 'src/assets/catalogue.js', 'src/assets/chat.js', 'src/assets/finder.js', 'src/assets/map-preview.svg', 'src/data/catalogue.json', 'src/data/catalogue-translations.json'].filter((f) => fs.existsSync(path.join(ROOT, f))).map(read).join('')).digest('hex').slice(0, 8);
// Brand font: when the licensed Pangram files are in src/assets/fonts/pangram/ (e.g. Pangram-Regular.woff2,
// Pangram-Bold.woff2 …), write their @font-face rules into the stylesheet; otherwise Outfit is used.
{
  const dir = path.join(ROOT, 'src/assets/fonts/pangram');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => /\.woff2?$/i.test(f)) : [];
  const weight = (f) => {
    const n = f.toLowerCase().replace(/[-_ ]/g, '');
    if (/extralight|ultralight|thin/.test(n)) return 200;
    if (/light/.test(n)) return 300;
    if (/medium/.test(n)) return 500;
    if (/semibold|demibold/.test(n)) return 600;
    if (/extrabold|ultrabold/.test(n)) return 800;
    if (/bold/.test(n)) return 700;
    if (/black|heavy/.test(n)) return 900;
    return 400;
  };
  const faces = files
    .map((f) => `@font-face { font-family: 'Pangram'; font-style: ${/italic/i.test(f) ? 'italic' : 'normal'}; font-weight: ${weight(f)}; font-display: swap; src: url(fonts/pangram/${f}) format('${/\.woff2$/i.test(f) ? 'woff2' : 'woff'}'); }`)
    .join('\n');
  const cssFile = path.join(DIST, 'assets/site.css');
  const css = fs.readFileSync(cssFile, 'utf8').replace(/\/\* PANGRAM-FONTS[^\n]*\*\/\n/, faces ? `${faces}\n` : '');
  fs.writeFileSync(cssFile, minifyCss(css));
  if (files.length) console.log(`Pangram: ${files.length} font file(s)`);
}
// The full lab catalogue, one file per language, loaded by assets/catalogue.js on /analizat/ and /en/analizat/.
for (const lang of LANGS) {
  const { data, missing } = catalogueFor(lang);
  // ml (component links) is only used by the build; the browser does not need it.
  write(`assets/catalogue-${lang}.json`, JSON.stringify(data, (k, v) => (k === 'ml' ? undefined : v)));
  if (missing) console.warn(`catalogue-${lang}: ${missing} text(s) not translated yet — shown in Albanian (src/data/catalogue-translations.json)`);
}

let SPRITE_URL = '';
const CHAT_URL = {};
// Icon sprite: one cached file instead of the same paths inline on every page.
{
  const sprite = iconSprite();
  write('assets/icons.svg', sprite);
  SPRITE_URL = `${BASE}assets/icons.svg?v=${crypto.createHash('sha1').update(sprite).digest('hex').slice(0, 8)}`;
  useIconSprite(SPRITE_URL);
}

// The site assistant's data, one file per language, loaded by assets/chat.js the first time the chat opens.
for (const lang of LANGS) {
  const json = JSON.stringify(chatData(lang, { url: (p) => urlFor(p, lang), sprite: SPRITE_URL, catalogue: `${BASE}assets/catalogue-${lang}.json?v=${version}` }));
  write(`assets/chat-${lang}.json`, json);
  CHAT_URL[lang] = `${BASE}assets/chat-${lang}.json?v=${crypto.createHash('sha1').update(json).digest('hex').slice(0, 8)}`;
}

let count = 0;
for (const lang of LANGS) {
  for (const [p, render] of ROUTES) {
    const ctx = makeCtx(lang, p, version);
    const page = render(ctx);
    ctx.page = page;
    write(path.join(lang === 'sq' ? '' : lang, p, 'index.html'), layout(ctx, page.body));
    count++;
  }
  // 404 pages: /404.html (Albanian, used by GitHub Pages) and /en/404.html.
  const ctx = makeCtx(lang, '', version);
  const page = notFoundPage(ctx);
  ctx.page = page;
  write(lang === 'sq' ? '404.html' : `${lang}/404.html`, layout(ctx, page.body));
}
// Departments the clinic no longer lists: their old addresses send visitors on to the services page (not in the
// sitemap, not indexed; the production .htaccess also answers them with a 301).
for (const lang of LANGS) {
  const to = urlFor('sherbimet', lang);
  for (const slug of RETIRED_SERVICES) {
    write(
      path.join(lang === 'sq' ? '' : lang, `sherbim/${slug}`, 'index.html'),
      `<!doctype html>\n<html lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${SITE.fullName}</title><meta name="robots" content="noindex"><link rel="canonical" href="${ORIGIN}${to}"><meta http-equiv="refresh" content="0; url=${to}"></head>\n<body><p><a href="${to}">${UI[lang].nav_services} · ${SITE.fullName}</a></p></body></html>\n`,
    );
  }
}
// Illustrated scenes used by the pages (stand-ins until the clinic's photos are in src/assets/photos/).
const scenes = sceneFiles();
for (const [name, svg] of scenes) write(`assets/scenes/${name}`, svg);

/* ---- sitemap, robots, manifest, llms.txt ---- */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((lang) =>
  ROUTES.map(
    ([p]) => `  <url>
    <loc>${absFor(p, lang)}</loc>
    <lastmod>${today}</lastmod>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absFor(p, l)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absFor(p, 'sq')}"/>
  </url>`,
  ),
).join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write('robots.txt', NOINDEX ? `# Preview build — pages carry <meta name="robots" content="noindex">.\nUser-agent: *\nAllow: /\n` : `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}${BASE}sitemap.xml\n`);
write(
  'manifest.webmanifest',
  JSON.stringify(
    {
      name: SITE.fullName,
      short_name: SITE.name,
      lang: 'sq',
      start_url: BASE,
      scope: BASE,
      display: 'standalone',
      background_color: '#f4f8fb',
      theme_color: '#ffffff',
      icons: [
        { src: `${BASE}icon-192.png`, sizes: '192x192', type: 'image/png' },
        { src: `${BASE}icon-512.png`, sizes: '512x512', type: 'image/png' },
        { src: `${BASE}icon-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
    },
    null,
    2,
  ),
);
write(
  'llms.txt',
  `# ${SITE.fullName}

> Diagnostic centre in Prishtina, Kosovo, since ${SITE.founded}: biochemistry, haematology and microbiology laboratory (continuing the ${SITE.predecessor} laboratory), paediatrics, gynaecology, family medicine, endocrinology, supplements and nutrition.

- Address: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.cityEn}, Kosovo
- Phone: ${SITE.phones.map((p) => p.display).join(' · ')}
- E-mail: ${SITE.email}
- Hours: Mon–Fri ${SITE.hours[1].join('–')}, Sat ${SITE.hours[6].join('–')}, Sun closed
- Prices are given by reception (phone, WhatsApp, e-mail); they are not published on the site.

## Pages (Albanian · English · German)
${ROUTES.filter(([p]) => !p.startsWith('analizat/')).map(([p]) => `- [${p || 'home'}](${absFor(p, 'sq')}) · [en](${absFor(p, 'en')}) · [de](${absFor(p, 'de')})`).join('\n')}
- Lab tests: one page per test at ${absFor('analizat', 'sq')}<test>/ (${TEST_ROUTES.length} tests; English under /en/analizat/<test>/, German under /de/analizat/<test>/)
`,
);
if (NOINDEX) write('.nojekyll', '');

// Production (own domain on Apache / Hostinger): 404 page, caching and security headers.
if (PRODUCTION) {
  // HSTS: browsers then refuse plain HTTP for this long. Start short on a new host and raise it only after HTTPS on
  // humanplusks.com and www.humanplusks.com has been checked (README → Security). No includeSubDomains, no preload.
  const hsts = Number(process.env.HSTS_MAX_AGE ?? 300);
  write(
    '.htaccess',
    `# Human+ — Apache / LiteSpeed (e.g. Hostinger). Generated by scripts/build.mjs — edit it there. README → Security.
Options -Indexes
DirectoryIndex index.html
AddDefaultCharset utf-8
AddCharset utf-8 .css .js .json .svg .txt .xml .webmanifest
AddType application/manifest+json .webmanifest
AddType image/webp .webp
AddType image/avif .avif
AddType font/woff2 .woff2
ErrorDocument 404 ${BASE}404.html

# One hop to https://<domain without www>. The X-Forwarded-Proto check keeps a CDN / proxy that ends TLS in front
# of the server (and talks to it over HTTP) from looping. Then the retired departments' old addresses go to the
# services page (their folders also hold a redirect page, for servers without mod_rewrite).
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
${LANGS.map((lang) => `  RewriteRule ^${lang === 'sq' ? '' : `${lang}/`}sherbim/(${RETIRED_SERVICES.join('|')})/?$ https://%{HTTP_HOST}${urlFor('sherbimet', lang)} [L,R=301]`).join('\n')}
</IfModule>

<IfModule mod_headers.c>
  Header always set Content-Security-Policy "${csp({ header: true })}"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "DENY"
  Header always set Referrer-Policy "${REFERRER_POLICY}"
  Header always set Permissions-Policy "${PERMISSIONS_POLICY}"
  Header always set Cross-Origin-Opener-Policy "same-origin"
  Header always set Strict-Transport-Security "max-age=${hsts}"
  Header unset X-Powered-By
  # css / js / json / photos carry ?v=<hash> and fonts never change: a year. HTML is re-checked on every visit.
  <FilesMatch "\\.(css|js|json|woff2|webp|avif|jpe?g|png|svg)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "^(favicon[^/]*|apple-touch-icon\\.png|icon-\\d+\\.png|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|llms\\.txt)$">
    Header set Cache-Control "public, max-age=86400"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript text/javascript application/json application/manifest+json application/xml image/svg+xml
</IfModule>
`,
  );
  // Visitors to a missing English / German address get the 404 page in their language.
  for (const lang of LANGS.filter((l) => l !== 'sq')) write(`${lang}/.htaccess`, `ErrorDocument 404 ${BASE}${lang}/404.html\n`);
}

console.log(`Built ${count} pages + ${LANGS.length} × 404 + ${scenes.length} scenes + ${photoFiles().length} photos into ${path.relative(ROOT, DIST)}/ · base ${BASE} · ${ORIGIN}${NOINDEX ? ' · noindex' : ''}${PRODUCTION ? ' · .htaccess' : ''}`);
