// Builds the static site into dist/: every page in Albanian (/) and English (/en/), sitemap, robots, 404,
// llms.txt, manifest and — for a production domain — .htaccess. No dependencies: `node scripts/build.mjs`.
//
// env  BASE_PATH  sub-folder the site is served from (default "/"; GitHub Pages preview: "/humanplus/")
//      SITE_URL   origin for canonical / share links (default https://humanplusks.com)
//      NOINDEX    "1" keeps search engines out (default: on for *.github.io previews, off otherwise)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { SITE, LANGS } from '../src/data/site.mjs';
import { SERVICES } from '../src/data/services.mjs';
import { layout } from '../src/lib/layout.mjs';
import { homePage } from '../src/pages/home.mjs';
import { servicesPage, servicePage } from '../src/pages/services.mjs';
import { testsPage, panelsPage, prepPage } from '../src/pages/lab.mjs';
import { bookingPage } from '../src/pages/booking.mjs';
import { aboutPage, contactPage, faqPage, notFoundPage } from '../src/pages/centre.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const rawBase = (process.env.BASE_PATH ?? '/').trim();
const BASE = !rawBase || rawBase === '/' ? '/' : `/${rawBase.replace(/^\/+|\/+$/g, '')}/`;
const ORIGIN = (process.env.SITE_URL ?? 'https://humanplusks.com').replace(/\/+$/, '');
const NOINDEX = process.env.NOINDEX ? process.env.NOINDEX === '1' : /github\.io$/.test(new URL(ORIGIN).hostname);
const PRODUCTION = !/github\.io$/.test(new URL(ORIGIN).hostname);

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (rel, content) => {
  const file = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};
const copyDir = (from, to) => {
  for (const e of fs.readdirSync(from, { withFileTypes: true })) {
    const a = path.join(from, e.name);
    const b = path.join(to, e.name);
    if (e.isDirectory()) {
      fs.mkdirSync(b, { recursive: true });
      copyDir(a, b);
    } else fs.copyFileSync(a, b);
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
];

const urlFor = (p, lang) => `${BASE}${lang === 'en' ? 'en/' : ''}${p ? `${p}/` : ''}`;
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
    medicalSpecialty: ['Pediatric', 'Gynecologic', 'PrimaryCare', 'Urologic', 'Endocrine', 'Gastroenterologic', 'Dermatology', 'LaboratoryScience'].map((s) => `https://schema.org/${s}`),
    availableLanguage: ['sq', 'en'],
    sameAs: [SITE.facebook],
    contactPoint: SITE.phones.map((p) => ({ '@type': 'ContactPoint', telephone: p.tel, contactType: 'customer service', availableLanguage: ['sq', 'en'] })),
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
    clinicId: CLINIC_ID,
    url: (q, l = lang) => urlFor(q, l),
    abs: (q, l = lang) => absFor(q, l),
    wa: (text = '') => `https://api.whatsapp.com/send?phone=${SITE.whatsapp}${text ? `&text=${encodeURIComponent(text)}` : ''}`,
    clinicJsonLd: () => clinicJsonLd(lang),
    websiteJsonLd: () => websiteJsonLd(lang),
  };
}

/* ---- build ---- */
// Empty dist/ (but keep the folder, so a local preview server keeps serving it).
fs.mkdirSync(DIST, { recursive: true });
for (const e of fs.readdirSync(DIST)) fs.rmSync(path.join(DIST, e), { recursive: true, force: true });

// Assets (fonts, og images, css, js) and root files (favicons…).
copyDir(path.join(ROOT, 'src/assets'), path.join(DIST, 'assets'));
copyDir(path.join(ROOT, 'src/static'), DIST);
// The stylesheet refers to fonts relatively ("fonts/…"), so it works under any base path.
const version = crypto.createHash('sha1').update(read('src/assets/site.css') + read('src/assets/site.js')).digest('hex').slice(0, 8);

let count = 0;
for (const lang of LANGS) {
  for (const [p, render] of ROUTES) {
    const ctx = makeCtx(lang, p, version);
    const page = render(ctx);
    ctx.page = page;
    write(path.join(lang === 'en' ? 'en' : '', p, 'index.html'), layout(ctx, page.body));
    count++;
  }
  // 404 pages: /404.html (Albanian, used by GitHub Pages) and /en/404.html.
  const ctx = makeCtx(lang, '', version);
  const page = notFoundPage(ctx);
  ctx.page = page;
  write(lang === 'en' ? 'en/404.html' : '404.html', layout(ctx, page.body));
}

/* ---- sitemap, robots, manifest, llms.txt ---- */
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.flatMap((lang) =>
  ROUTES.map(
    ([p]) => `  <url>
    <loc>${absFor(p, lang)}</loc>
    <lastmod>${today}</lastmod>
    <xhtml:link rel="alternate" hreflang="sq" href="${absFor(p, 'sq')}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${absFor(p, 'en')}"/>
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
      background_color: '#f6f5f0',
      theme_color: '#0b5f64',
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

> Diagnostic centre in Prishtina, Kosovo, since ${SITE.founded}: biochemistry, haematology and microbiology laboratory (continuing the ${SITE.predecessor} laboratory), paediatrics, gynaecology, family medicine, urology, endocrinology, gastroenterology, dermatology, supplements and nutrition.

- Address: ${SITE.address.street}, ${SITE.address.postalCode} ${SITE.address.cityEn}, Kosovo
- Phone: ${SITE.phones.map((p) => p.display).join(' · ')}
- E-mail: ${SITE.email}
- Hours: Mon–Fri ${SITE.hours[1].join('–')}, Sat ${SITE.hours[6].join('–')}, Sun closed
- Prices are given by reception (phone, WhatsApp, e-mail); they are not published on the site.

## Pages (Albanian · English)
${ROUTES.map(([p, r]) => `- [${p || 'home'}](${absFor(p, 'sq')}) · [en](${absFor(p, 'en')})`).join('\n')}
`,
);
if (NOINDEX) write('.nojekyll', '');

// Production (own domain on Apache / Hostinger): 404 page, caching and security headers.
if (PRODUCTION) {
  write(
    '.htaccess',
    `# Human+ — Apache / Hostinger
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 ${BASE}404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteCond %{HTTPS} !=on
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]
  RewriteRule ^ https://%1%{REQUEST_URI} [L,R=301]
</IfModule>

<IfModule mod_headers.c>
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
  Header always set Strict-Transport-Security "max-age=31536000"
  # css / js carry ?v=<hash>, fonts never change: cache for a year. Images and the manifest: a week.
  <FilesMatch "\\.(css|js|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(png|svg|webmanifest|xml|txt)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
</IfModule>
`,
  );
}

console.log(`Built ${count} pages + 2 × 404 into dist/ · base ${BASE} · ${ORIGIN}${NOINDEX ? ' · noindex' : ''}${PRODUCTION ? ' · .htaccess' : ''}`);
