# Human+ Qendra Diagnostike – website

The new website for **Human+ Qendra Diagnostike** (Rruga B, Nr. 16, Prishtinë), a diagnostic centre since 2011 with a
biochemistry, haematology and microbiology laboratory, paediatrics, gynaecology and specialists under one roof.
Albanian first, English one click away. The previous site at humanplusks.com was a brochure; this one is built around
what patients actually come to do: **find a test, see how to prepare, ask the price, book a time.** The lab-test catalogue,
check-up panels, preparation guide and online booking follow the lab sites the client likes (beo-lab.rs), in Human+'s own look.

Warm paper background, the deep teal of the Human+ mark with a coral "+", Manrope with an italic Fraunces accent word,
pill buttons, rounded cards. **No framework and no dependencies:** a small Node script writes plain HTML, one CSS file and
one JavaScript file into `dist/`, which you can upload to any web host.

**Live preview:** https://ariongj.github.io/humanplus/ (GitHub Pages, hidden from search engines) ·
**Production domain:** https://humanplusks.com (see [Publishing](#publishing))

| | |
| --- | --- |
| Pages | 19 per language × 2 (sq + en), plus 404 |
| Lab tests in the catalogue | 61, in 8 categories, each with sample type and preparation |
| Check-up panels | 8 |
| Accessibility | axe-core: **0 violations** on all pages, desktop 1440 and phone 390 |
| Layout | no horizontal scroll at 320, 390 and 1440 px; 44 px touch targets; 16 px form fields |
| Weight | home page ≈ 27 kB HTML + 12 kB CSS + 8 kB JS (gzip), two self-hosted fonts (70 kB) |

## What is on the site

All pages exist in Albanian (`/…`) and English (`/en/…`) with the **same addresses**, so the old links such as
`/en/sherbim/pediatri/` keep working.

| Page | Address | What it does |
| --- | --- | --- |
| Ballina / Home | `/` | hero with test search, live opening status, quick actions, services, lab, check-ups, paediatrics, how it works, hours, FAQ |
| Shërbimet / Services | `/sherbimet/` | the ten departments, specialists and laboratory |
| Department pages | `/sherbim/<slug>/` | what each department offers, its most requested tests (add to list), book / WhatsApp / call |
| Analizat / Lab tests | `/analizat/` | searchable catalogue (name, abbreviation, other spellings), category filters, "Add" to *My list* |
| Paketat / Check-ups | `/paketat/` | 8 panels (basic, children, thyroid, women, men 40+, vitamins, heart, allergy) — add a whole panel or ask the price |
| Përgatitja / Preparation | `/pergatitja/` | fasting, morning tests, cycle-day hormones, PSA, urine, stool, swabs, children, samples from home |
| Rezervo / Book | `/rezervo/` | booking request: service → day → time → details → WhatsApp, Viber or e-mail |
| Rreth nesh / About | `/rreth-nesh/` | since 2011, BAKTOLAB, the team, how they work |
| Kontakt / Contact | `/kontakt/` | address and map link, three phones, WhatsApp, Viber, e-mail, Facebook, hours, message form |
| Pyetje / FAQ | `/pyetje/` | ten questions (FAQPage data for Google) |

The ten departments: Pediatri, Gjinekologji, Laboratori Biokimik dhe Hematologjik, Laboratori Mikrobiologjik,
Mjekësi Familjare, Urologji, Endokrinologji, Gastroenterologji, Dermatologji, Suplemente dhe Nutricion.

### On every page

1. **Top bar** – live status (*Hapur tani · deri në 19:00* / *Mbyllur tani · hapet të hënën në 07:30*, worked out in
   Kosovo time), phone, address, e-mail, Facebook and the SQ / EN switch.
2. **Header** – logo, menu, **Lista ime** (with the number of tests) and **Rezervo termin**.
3. **Footer** – all departments, lab pages, address, three phones, e-mail, opening hours with today marked.
4. On phones: a **Telefono / WhatsApp / Rezervo** bar at the bottom. On larger screens: a WhatsApp button that appears
   after the first screen.

Statuses always use text + a dot, never colour alone. Visitors who prefer reduced motion get no animations.

## How "Lista ime" (my test list) works

1. The patient presses **Shto** on tests in the catalogue, on a department page or adds a whole check-up panel.
2. **Lista ime** in the header opens the list: every test with its preparation, remove buttons and a link to the
   preparation guide.
3. **Dërgo në WhatsApp** opens WhatsApp with a ready message ("Përshëndetje Human+! Dëshiroj informata për çmimin dhe
   terminin për këto analiza: 1. … 2. …"). Also by e-mail, or copied for Viber.
4. Reception replies with the price and how to prepare. **The site shows no prices** – they come from the clinic.

The list stays in the visitor's own browser (localStorage), across pages and tabs. Nothing is sent anywhere until they
press a send button.

## How the booking request works

1. Service (or *Analiza laboratorike*), then a day among the next 14 open days (Sundays are skipped), then a time
   (every 30 min, last slot 30 min before closing; times that have already passed today are greyed out).
2. Who it is for (myself / my child – then the child's age / someone else), name, phone, optional note. Errors are
   shown under each field and announced to screen readers.
3. **Dërgo kërkesën në WhatsApp** opens WhatsApp with all the details, addressed to `whatsapp` in `src/data/site.mjs`.
   Viber (message copied, chat opened) and e-mail work the same way.
4. The page thanks the patient, repeats the request, offers **Shto në kalendar** (an `.ics` file marked *tentative*) and
   the phone number. **Reception confirms every request** – nothing is booked automatically.

Department pages link here with the service already chosen: `/rezervo/?sherbimi=pediatri`.

Optional: set `formEndpoint` in `src/data/site.mjs` to a form service (e.g. Formspree) to also receive every booking
request by e-mail.

## Languages

- **Shqip** is the main language (`/`), **English** lives under `/en/` with the same page names.
- The language switch keeps you on the same page. A visitor who chose English is sent to `/en/` when they come back to
  the home page.
- Every visible text exists in both languages. The build **stops with an error** if a text key is missing in one of
  them (`dict()` in `src/lib/html.mjs`).
- Each page has `hreflang` links (sq, en, x-default) and its own share picture per language.

## Files

| File | What it is |
| --- | --- |
| `src/data/site.mjs` | **name, address, phones, WhatsApp / Viber number, e-mail, Facebook, opening hours, booking slots** – edit this first |
| `src/data/services.mjs` | the ten departments: names, texts, what they offer, related tests |
| `src/data/tests.mjs` | lab-test catalogue, categories, preparation rules, check-up panels |
| `src/data/faq.mjs` | questions and answers |
| `src/data/ui.mjs` | shared interface texts (menu, buttons, status, list, footer) in sq + en |
| `src/pages/*.mjs` | one file per page group, with that page's texts at the top |
| `src/lib/layout.mjs` | head tags, top bar, header, footer, phone bar, list drawer |
| `src/lib/parts.mjs` | shared blocks (cards, test rows, search, CTA band, FAQ) |
| `src/lib/icons.mjs`, `src/lib/logo-paths.mjs` | icons (Lucide, Simple Icons) and the Human+ logo as vector paths |
| `src/assets/site.css` | the whole design; colours are the variables at the top |
| `src/assets/site.js` | browser behaviour: status, menus, list, search, booking, contact form |
| `src/assets/fonts/` | Manrope and Fraunces italic (WOFF2, self-hosted) |
| `src/assets/og/og-sq.png`, `og-en.png` | the 1200 × 630 pictures WhatsApp / Facebook show when a link is shared |
| `src/static/` | favicons and app icons, copied to the site root |
| `scripts/build.mjs` | builds `dist/`: pages, sitemap, robots, manifest, llms.txt, 404 and `.htaccess` for Hostinger |
| `scripts/check.mjs` | checks `dist/`: links, anchors, one H1, titles, descriptions, hreflang, ids, JSON-LD, sitemap |
| `scripts/serve.mjs` | local preview server |
| `.github/workflows/pages.yml` | build + check on every push, publish the default branch to GitHub Pages |

## Editing

- **Phones, e-mail, address, Facebook**: `src/data/site.mjs`. The first phone is the main one (top bar, buttons,
  share picture). `whatsapp` is the number booking and list messages go to (digits only, e.g. `38344709072`).
- **Opening hours**: `hours` in `src/data/site.mjs` (`0` = Sunday … `6` = Saturday, `null` = closed). The status,
  the hours tables, the booking times and the Google data all follow.
- **A department**: `src/data/services.mjs`. Change the texts in both `sq` and `en`; `tests` lists the test ids
  shown on its page. Adding one also adds its page, menu entry and sitemap line.
- **Lab tests and panels**: `src/data/tests.mjs`. One line per test: `id`, `cat`, `sample`, `prep` (a key of `PREP`),
  names in both languages and `aka` (extra search words). Panels list test ids.
- **Texts of a page**: the dictionary at the top of its file in `src/pages/`.
- **Colours**: the variables at the top of `src/assets/site.css` (`--brand`, `--accent`, …).
- **Share pictures** (`src/assets/og/`) show the main phone and address; remake them if those change.

After any change:

```bash
npm test
```

(builds the site and runs the checks; Node 18 or newer, nothing to install).

## Preview locally

```bash
npm run build
```

```bash
npm run preview
```

Then open http://localhost:8080 (Albanian) or http://localhost:8080/en/.

## Publishing

**Preview – GitHub Pages.** Every push builds and checks the site. The repository's default branch is published to
https://ariongj.github.io/humanplus/ with `noindex`, so the preview never competes with the real domain in Google.
One-time setup: *Settings → Pages → Build and deployment → Source: **GitHub Actions***, then re-run the workflow.

**Production – humanplusks.com (Hostinger or any Apache host).** Build for the real domain and upload the *contents*
of `dist/` to `public_html`:

```bash
SITE_URL=https://humanplusks.com node scripts/build.mjs
```

On Windows PowerShell:

```powershell
$env:SITE_URL="https://humanplusks.com"; node scripts/build.mjs
```

That build is indexable, points canonical and share links at humanplusks.com and adds an `.htaccess` (HTTPS and
non-www redirects, the 404 page, caching, security headers). Include the hidden `.htaccess` when uploading.

**Other hosts** (Netlify, Cloudflare Pages, Vercel): build command `node scripts/build.mjs`, output folder `dist`,
environment variable `SITE_URL=https://humanplusks.com`. A sub-folder needs `BASE_PATH=/folder/` as well.

## Facts and sources

Only facts the clinic has published are used:

- Name, address (Rruga B, Nr. 16, 10000 Prishtinë), phones (+383 44 709 072 Vala, +383 48 750 150 IPKO,
  +383 38 750 150 landline), e-mail (info@humanplusks.com), opening hours (Mon–Fri 07:30–19:00, Sat 08:00–16:00,
  Sun closed), "since 2011", "thousands of parents and children" and the department list – from the previous
  humanplusks.com pages.
- "Continues the work of the BAKTOLAB laboratory", supplements and nutrition – the clinic's Facebook page
  ([QDHumanPlus](https://www.facebook.com/QDHumanPlus/)) and its directory listing.
- Team roles (specialists, laboratory technicians, nurses) – the clinic's 2025 job advert.
- Logo – the vector mark from the ITD partners set (`ITD2027/alternative-v2/site/assets/partners/humanplus.svg`),
  recoloured.

No prices, doctor names, ratings, reviews, certificates, result times, home visits or online results are claimed –
none of them were published. No stock photos are used.

## What is placeholder / to confirm with the clinic

- **Department texts** – Paediatrics follows the old site; the other nine describe each specialty's usual scope in
  general words. Ask each doctor to read their page.
- **Lab catalogue and panels** – a standard menu for a biochemistry, haematology and microbiology lab (61 tests) and
  8 suggested panels. Remove what the lab does not do, add what is missing, agree the panels.
- **Preparation guide** – standard lab guidance; ask the lab manager to approve it.
- **Brand colour** – teal `#0b5f64` was chosen to match the mark; swap `--brand` if the clinic has an official colour.
- **WhatsApp / Viber** – messages go to +383 44 709 072. Confirm that number uses WhatsApp and Viber, or change
  `whatsapp` / `viber` in `src/data/site.mjs`.
- **Map** – a Google Maps search link; replace `mapsUrl` with the clinic's own Maps place link.

## Before launch

- [ ] Confirm with the clinic that **every listed department is currently licensed** and staffed. Take a department
      off `src/data/services.mjs` until that is confirmed.
- [ ] Doctors approve their department texts; the lab approves the test list, panels and preparation guide.
- [ ] Confirm the WhatsApp / Viber number and send one test booking from a staff phone.
- [ ] Decide whether reception wants booking requests by e-mail as well (`formEndpoint`).
- [ ] Photos of the centre, the lab and the team (with permission) if the clinic wants them – the design works without.
- [ ] Build with `SITE_URL=https://humanplusks.com`, upload `dist/` to Hostinger, check https://humanplusks.com/en/sherbim/pediatri/.
- [ ] Add the site to Google Search Console and submit `https://humanplusks.com/sitemap.xml`.
- [ ] Update the Google Business Profile with the website, hours and phones.

## Checks

`npm test` runs on every push (GitHub Actions). Before a release the site was also checked in Chromium:

- axe-core (WCAG 2.1 A/AA + best practice): 0 violations on all 25 pages × 2 widths;
- no horizontal scroll at 320, 390 and 1440 px, no console errors;
- opening status at Monday 06:10 / 10:00, Friday 19:30, Saturday 17:00 and Sunday 12:00;
- search, filters, list across pages and tabs, panel add, booking validation, WhatsApp text, `.ics` time zone, contact form.

## Credits

Fonts: [Manrope](https://fonts.google.com/specimen/Manrope) and [Fraunces](https://fonts.google.com/specimen/Fraunces)
(SIL Open Font License), self-hosted from Fontsource. Icons: [Lucide](https://lucide.dev) (ISC) and
[Simple Icons](https://simpleicons.org) (CC0) for WhatsApp, Viber and Facebook. Logo © Human+ Qendra Diagnostike.
