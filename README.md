# Human+ Qendra Diagnostike – website

The new website for **Human+ Qendra Diagnostike** (Rruga B, Nr. 16, Prishtinë), a diagnostic centre since 2011 with a
biochemistry, haematology and microbiology laboratory, paediatrics, gynaecology and specialists under one roof.
Albanian first, English and German one click away. The previous site at humanplusks.com was a brochure; this one is built around
what patients actually come to do: **find a test, see how to prepare, ask the price, book a time.** The lab-test catalogue,
check-up panels, preparation guide and online booking follow the lab sites the client likes (beo-lab.rs), in Human+'s own look.

Built on the **Human+ brand book** (v1.0, 19.01.2024) in the light look of the original humanplusks.com: **green, white
and a bluish white** – bluish-white page bands with a faint H-mark pattern, brand-green laboratory and call-to-action
bands, a deep-green footer, the green icon, and the brand font Pangram (see [Brand](#brand)). The layout is institutional – clear bands, white cards with thin borders, square-cornered
buttons – and it looks like a clinic, not a shop: doctors in white coats, the laboratory, the sample room, paediatrics,
a specialist's room and the reception are on the home page, the about page and every department page. Until the clinic
sends its own photos these are **illustrated scenes** drawn for the site in the brand colours (no stock photos, no real
people); each one is a photo slot that switches to the real photo as soon as the file is added (see [Photos](#photos)). The lab parts borrow
the online-lab habits the owner likes from Beo-lab – a test-tube "lab list" with a counter in the header, "Shto në listë"
on every test, a running list bar while browsing the catalogue, and the lab's diagnostic areas as entry points – without
using Beo-lab's name, logo or colours (they are registered trademarks). **No framework and no dependencies:** a small Node script writes plain HTML, one CSS file and
one JavaScript file into `dist/`, which you can upload to any web host.

**Live preview:** https://ariongj.github.io/humanplus/ (GitHub Pages, hidden from search engines) ·
**Production domain:** https://humanplusks.com (see [Publishing](#publishing))

| | |
| --- | --- |
| Pages | 19 site pages + 1 006 test pages per language × 3 (sq, en, de), plus a 404 page in each |
| Lab-test catalogue | 1 006 tests and panels in 20 categories, each with its own page, searchable in Albanian, English, German and Serbian (see [Lab catalogue](#lab-catalogue)) |
| Check-up panels | 20, in four groups |
| Accessibility | axe-core: **0 violations** on all pages in all three languages, desktop 1440 and phone 390 |
| Layout | no horizontal scroll at 320, 390 and 1440 px; 44 px touch targets; 16 px form fields |
| Weight | home page ≈ 29 kB HTML + 14 kB CSS + 8 kB JS (gzip) + one font (27 kB) + 6 illustrated scenes (19 kB, cached across pages); the catalogue data (113 kB gzip) loads only on `/analizat/` |

## What is on the site

All pages exist in Albanian (`/…`), English (`/en/…`) and German (`/de/…`) with the **same addresses**, so the old
links such as `/en/sherbim/pediatri/` keep working.

| Page | Address | What it does |
| --- | --- | --- |
| Ballina / Home | `/` | hero with a doctor and the lab, test search and live opening status; quick actions, services, inside the centre (lab, sample room, paediatrics, specialists, reception), lab, check-ups, paediatrics, how it works, hours, FAQ |
| Shërbimet / Services | `/sherbimet/` | the ten departments, specialists and laboratory |
| Department pages | `/sherbim/<slug>/` | a picture of that department, what it offers, its most requested tests (add to list), book / WhatsApp / call |
| Analizat / Lab tests | `/analizat/` | the full catalogue: search (Albanian, Serbian, abbreviations), 20 categories, details (description, sample, preparation, components), "Add" to *My list* |
| Paketat / Check-ups | `/paketat/` | 20 panels in four groups — general (basic, children, women, men 40+, vitamins); sugar, heart and organs (diabetes, heart, thyroid, kidneys, liver, anaemia, bones, stomach & bowel); immunity, joints and allergies (autoimmune, joints & rheumatism, allergy); hormones, pregnancy and procedures (female hormones / PCOS, pregnancy first check, before surgery, hepatitis / HIV / syphilis) — add a whole panel or ask the price |
| Përgatitja / Preparation | `/pergatitja/` | fasting, morning tests, cycle-day hormones, PSA, urine, stool, swabs, children, samples from home |
| Rezervo / Book | `/rezervo/` | booking request: service → day → time → details → WhatsApp, Viber or e-mail |
| Rreth nesh / About | `/rreth-nesh/` | since 2011, BAKTOLAB, the team (specialists, lab technicians, nurses), inside the centre, how they work |
| Kontakt / Contact | `/kontakt/` | address and map link, three phones, WhatsApp, Viber, e-mail, Facebook, hours, message form |
| Pyetje / FAQ | `/pyetje/` | ten questions (FAQPage data for Google) |

The ten departments: Pediatri, Gjinekologji, Laboratori Biokimik dhe Hematologjik, Laboratori Mikrobiologjik,
Mjekësi Familjare, Urologji, Endokrinologji, Gastroenterologji, Dermatologji, Suplemente dhe Nutricion.

### On every page

1. **Header** (always first, sticky) – logo, menu, the language menu (**SQ ▾** with EN / DE), **Lista ime** (with
   the number of tests) and **Rezervo termin**. On phones: logo, the language menu, the list and the menu button.
2. **Info strip** under the header – live status (*Hapur tani · deri në 19:00* / *Mbyllur tani · hapet të hënën në
   07:30*, worked out in Kosovo time), phone, address, e-mail and the social profiles (Facebook; Instagram and
   TikTok once their links are set); one line on phones (status, plus the phone from 480 px).
3. **Footer** – all departments, lab pages, address, three phones, e-mail, opening hours with today marked.
4. On phones: a **Telefono / WhatsApp / Rezervo** bar at the bottom. On larger screens: a WhatsApp button that appears
   after the first screen.
5. **Pyetni asistentin** – the site assistant (see [The site assistant](#the-site-assistant)): a round button above
   the phone bar, a labelled button at the bottom right on larger screens.

Statuses always use text + a dot, never colour alone. Visitors who prefer reduced motion get no animations.

## How "Lista ime" (my test list) works

1. The patient presses **Shto në listë** on tests in the catalogue, on a department page or adds a whole check-up panel.
   On the catalogue a bar at the bottom keeps the count ("3 analiza · Shiko dhe dërgo listën").
2. **Lista ime** (the test-tube button in the header) opens the list: every test with its preparation, remove buttons and a link to the
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

## The site assistant

A chat window on every page (*Pyetni asistentin* / *Ask our assistant* / *Assistent fragen*) that answers **only
from what the site already says**: opening hours with the live status, the address with directions and the map,
phones, WhatsApp, Viber, e-mail and social profiles, how booking works, the preparation guide, the check-up panels,
the ten departments, the FAQ, and the full lab catalogue – type a test name ("vitamina D", "TSH", "Harnsäure") to get
its sample and preparation with an **Add to list** button. Price questions get the clinic's answer (reception gives
prices) plus the list and WhatsApp; anything it does not know goes to reception on WhatsApp with the question
already typed.

- **No server, no AI service, no tracking.** `src/assets/chat.js` (loaded on the first click) matches keywords in
  Albanian, English and German against `assets/chat-<lang>.json`, which the build makes from the site data
  (`src/lib/chat.mjs`). The conversation stays in that browser tab (sessionStorage); nothing is sent until the visitor
  taps WhatsApp, a phone number or e-mail.
- **Safety:** it never interprets results ("the doctor who ordered the tests explains them" + book / call), and words
  like *urgjencë*, *chest pain*, *Notfall* get the emergency numbers first – 112 for all emergencies, 194 for an
  ambulance ([GOV.UK](https://www.gov.uk/foreign-travel-advice/kosovo/getting-help),
  [Kosovo Emergency Management Agency](https://ame.rks-gov.net/post/en-us/112/Appeal%20to%20the%20citizens%20of%20Kosovo%20for%20vigilance%20against%20arson)).
  Every screen says "Not medical advice. In an emergency, call 112."
- **Editing:** texts and the words it recognises are in `src/data/chat.mjs` (`CHAT` for each language, `INTENTS`,
  `SERVICE_WORDS` per department, `STOP` for small words); its answers come from `site.mjs`, `services.mjs`,
  `tests.mjs`, `faq.mjs` and the catalogue, so they change with them.
- Accessible: a dialog with a labelled log (`role="log"`, announced politely), 44 px buttons, 16 px input, Escape
  closes it and returns focus; full screen on phones (modal), a panel beside the page from 560 px.

A real AI chat (free questions, any wording) would need a server with an API key, a privacy notice and the
clinic's agreement on what it may answer – this one is deliberately limited to the site's own facts.

## Mini map

The home page (*Na vizitoni*) and the contact page (`/kontakt/#harta`) show a small map card: an illustrated preview
with the address, **Shfaq hartën** (*Show the map*), and *Udhëzimet në hartë* / *Hap në Google Maps* links that always
work. **Google Maps loads only after the click** – no request to Google before that, as the no-cookies rule asks
(the note under the button says Google may set cookies). The choice is remembered on that device, and later maps load
when they scroll into view. The map shows the same Google search as the links (`mapsEmbed` in `src/data/site.mjs`);
for the exact pin, paste the clinic's own *Google Maps → Share → Embed a map* address there.

## Social profiles

`facebook`, `instagram` and `tiktok` in `src/data/site.mjs`. Each one that has a link appears in the info strip, the
footer, the contact page, the assistant's contact answer and the Google data (`sameAs`); an empty one is not shown.
**Instagram and TikTok are empty until the clinic sends the links** – the handles are not guessed.

## Lab catalogue

`/analizat/` shows **1 006 lab tests and panels in 20 categories** (haematology, biochemistry, immunochemistry,
hormones, pregnancy tests, tumour markers, allergology, immunology, serology, microbiology, parasitology, genetics,
drug levels, functional medicine, histopathology, transfusion medicine). Each entry has its name and – where
available – a short description, the sample, how it is collected, the preparation and what a panel includes,
**all in the language of the page**: Albanian on `/analizat/`, English on `/en/analizat/`, German on `/de/analizat/`.
The Serbian name is not shown, but it stays searchable (many referrals in Kosovo are written in Serbian), and so do
the English and German names on every page.

**The list** looks like beo-lab.rs: one striped table where each row has + (opens the details), a sample icon (tubes for
blood, a flask for urine, a tube for stool), the name in green with its category, and the sample ("Marrje gjaku") above a
green **Shto në listë** button – but no price column, because the site shows no prices. The category row scrolls
sideways; arrows at its ends move it with a mouse.

**Languages.** `src/data/catalogue.json` is the Albanian import. The English texts – names, descriptions, sample,
collection and preparation – and the panel components in Albanian and English (the export had them in Serbian) are in
`src/data/catalogue-translations.json` (`names` and `desc` by test id, `text` by Albanian phrase, `comp` by id); the
German ones are under `de` in the same file, with the same keys (`comp` there is a list in the English order).
That file is a working translation made for the site: edit it by hand when the lab corrects a term. The build
writes `assets/catalogue-sq.json`, `-en.json` and `-de.json` and warns about any English or German text still
missing (it then shows the Albanian one).

**A page for every test.** Each of the 1 006 entries also has its own page, `/analizat/<test>/` (and
`/en/analizat/<test>/`, `/de/analizat/<test>/`), for example `/analizat/acid-urik/`: what the test is for, the sample, how it is collected,
the preparation, the result time, what a panel includes (with links to the tests it contains), the panels a test is
part of, *Good to know* notes with their medical sources, other tests in the same category, and *Add to list*,
*Ask on WhatsApp* and *Book* buttons. The catalogue rows link to it ("Faqja e plotë e analizës"), and so do the common
tests on the department and check-up pages (`CATALOGUE_LINK` in `src/data/tests.mjs`).

**Result times and prices are Human+'s own.** The source lists BeoLab's turnaround times and prices; they are not
used. A test page shows a result time only when the clinic has confirmed it in `src/data/lab-human-plus.json`
(`{ "k17376": { "time": { "sq": "1 ditë pune", "en": "1 working day" } } }`); until then it says the staff tell you
when you give the sample.

**Good to know.** The reference data (schema 2.0) comes with an editorial safety review. Its patient-relevant points
are turned into 19 short notes in plain words – e.g. "do not stop or change your medicines for a test without your
doctor", "allergy blood tests: you usually do not need to stop antihistamines", "food IgG tests are not recommended
for diagnosing intolerance", "a PSA test without symptoms is a choice to make with your doctor" – each with its source
(MedlinePlus, CDC, ACOG, NICE, AAAAI, ASCIA, FDA, Endocrine Society, NCI). Texts and the test → note mapping are in
`src/data/lab-notes.mjs`; 177 tests carry at least one note. They are working texts for the doctors to approve.

**Source.** The client supplied the BeoLab reference catalogue (Serbia; schema 2.0, re-checked 2026-10-12, 1 071
entries, with 53 corrected preparation texts, 21 corrected descriptions and the safety review).
`scripts/import-catalogue.mjs` turns its `beolab-catalogue.json` into `src/data/catalogue.json` (it reads the JSON
as data; a `.js` export would be run as a module). The import **leaves out** on purpose:

- BeoLab's prices (in RSD) and result times – they are another lab's, not Human+'s;
- BeoLab's own consultations, promotions and marketing packages;
- reference ranges, methods, editorial notes, SKUs and source links;
- every sentence that mentions the source lab, its website, its address or ordering (the import fails if one is left),
  and sentences that only talk about the source text ("the available description only repeats the name…").

The page says plainly that it is an information catalogue and that the Human+ laboratory confirms availability,
price and preparation. To refresh the data from a new export:

```bash
node scripts/import-catalogue.mjs path/to/beolab-catalogue.json
```

Search matches the start of words in the names in both languages, the Serbian name and the aliases, so "krvna
slika", "hemogram", "gjaku komplet" and "blood count" all find the blood count. Results are sorted A–Z; 40 are shown
at a time. *Lista ime* keeps both names of a catalogue test, so the list follows a language switch.

## Brand

From the Human+ brand book (v1.0, 19.01.2024). Colours are CSS variables at the top of `src/assets/site.css`.

| Role | Variable | Value | Used for |
| --- | --- | --- | --- |
| **Green** (main) | `--green`, `--green-band` | `#28cc63` (sampled from the brand-book icon) | logo square, primary buttons (black text), laboratory and call-to-action bands, active menu underline |
| Green for text | `--brand`, `--green-lg` | `#0d7a3d`, `#1a9a4f` | links and small green text on white; large green headline words (the bright green is too light for text) |
| Bluish white | `--bg`, `--tint`, `--sky-band` | `#f4f8fb`, `#eaf2f8`, `#e4f0fa → #f4f8fb` | page background, alternate sections, top bar, page header bands |
| Deep Green | `--deep` | `#0a3d24` | footer, the running list bar, green words on the green bands |
| **Black** (main) | `--ink`, `--black` | `#111318`, `#000000` | text, the language switch, buttons on green bands |
| Calm Blue | `--blue`, `--blue-bg` | `#2f6fb0`, `#e7eff8` | information notes, keyboard focus ring |
| Pure White | `--surface` | `#ffffff` | cards, header |

The brand book names Deep Green, Soft Grey and Calm Blue without values here; replace these with the official hex codes
when the full brand book is at hand.

- **Logo** – the green icon with the black wordmark on white (header); green icon with a white wordmark on the
  deep-green footer. Vector paths in `src/lib/logo-paths.mjs`; favicon and app icons in `src/static/`.
- **Pattern** – the H mark repeated on a 64 px grid, faint white on the call-to-action band (`--pattern`).
- **Lab animation** – the home hero, every inner-page header and the green laboratory band show animated laboratory
  equipment in the background (`src/lib/labbg.mjs`): test tubes with moving liquid and rising bubbles, a flask, a
  dripping pipette, a microscope, an ECG line that draws itself, a petri dish with growing colonies, DNA, a syringe and
  a molecule – line icons in green and Calm Blue, CSS-only, decorative (hidden from screen readers) and still for
  visitors who prefer reduced motion. Positions and sizes are the `LAYOUTS` lists in that file.
- **Font** – the brand font is **Pangram** (7 weights, ExtraLight to Black). It is a licensed typeface, so it is not in
  the repository. Until its web-font files are added, the site uses **Outfit** (open licence) – a close geometric
  stand-in. To switch: put the licensed `.woff2` files (e.g. `Pangram-Regular.woff2`, `Pangram-Bold.woff2` …) in
  `src/assets/fonts/pangram/` and rebuild – the build writes the `@font-face` rules from the file names on its own.
- The brand-book posters show the address **humanplus-ks.com**; the site and this README use **humanplusks.com** (the
  address of the previous site). Confirm which domain is current.

## Photos

The site is built to show the clinic's **own photos**: the doctors, the laboratory, the sample room, the reception and
the building. Until they arrive, every photo place shows an **illustrated scene** of the centre (`src/lib/scenes.mjs`)
– drawn for this site in the brand colours, with no real people and no stock photos – and screen readers hear it
announced as an illustration.

**To add a photo:** put the file in `src/assets/photos/` named after its slot and rebuild (`npm test`). It replaces the
scene everywhere that slot is used, with its width and height, lazy loading and a cache-busting version.
JPEG, WebP, PNG or AVIF, about 1600 px on the long side; optionally a phone copy named `<slot>-sm.<ext>`
(about 800 px). Then describe the real photo in its `alt` text in `src/data/photos.mjs`.

| Slot (file name) | Shown on | Scene until then |
| --- | --- | --- |
| `hero` | home page, large picture | a doctor with a stethoscope and a tablet, the lab behind the glass |
| `lab` | home page small picture, *inside the centre*, check-ups page | a laboratory technician holding up a sample tube |
| `analyzer` | lab-tests page, biochemistry lab page | the analyser, centrifuge and sample rack |
| `sampling` | *inside the centre*, preparation page | the sample room: blood-draw chair and a nurse labelling a tube |
| `pediatrics` | home page paediatrics, *inside the centre*, paediatrics page | a paediatrician listening to a child with a teddy bear |
| `consult` | *inside the centre*, services page | a specialist at the desk with a patient |
| `reception` | *inside the centre* | the reception with the Human+ logo |
| `about`, `contact` | about and contact page headers | the reception with the Human+ logo |
| `team-doctor`, `team-lab`, `team-nurse` | about page, the team | portraits of the three roles |
| `sherbim-<slug>` (e.g. `sherbim-urologji`) | that department's page | the specialist's room, drawn with a different doctor per department |

Use only the clinic's own photos, with the permission of everyone who can be recognised in them (patients only with
written consent; avoid screens and papers with patient data). Good first set: the building and entrance, reception,
the sample room, the lab with its analysers, each doctor in their room, the team together.

**Alt text and crop for real photos:** an optional `photos.json` next to the photos sets each one's alt text and focus
point, e.g. `{ "hero": { "alt": { "sq": "…", "en": "…" }, "position": "50% 30%", "credit": "…" } }`.

### The photo version (/re/)

A second version of the same site, with photographs of real people instead of the illustrations, is published at
**https://ariongj.github.io/humanplus/re/** from the photos in `src/variants/re/photos/` (same slot names, plus
`photos.json`). The illustrated version at `/humanplus/` stays as it is, so the two can be compared side by side.

Its photos come from the client's *Human Plus Ready Posts Q4* social-media pack: free Unsplash photos (Unsplash
License – free commercial use, no attribution required), mostly one photographer's series of the same clinic and
people. Each photo's Unsplash id is its `credit` in `photos.json`. They are **models, not Human+ staff**: fine for
showing the look, but swap them for the clinic's own photos (same file names) before this version goes live.
GitHub Actions builds and checks it after the main site; locally:

```bash
OUT_DIR=dist/re PHOTOS_DIR=src/variants/re/photos BASE_PATH=/re/ node scripts/build.mjs
```

then open http://localhost:8080/re/ (with `npm run preview`). If it uses licensed stock photos as stand-ins (Unsplash /
Pexels licence), list each photographer under `credit` in `photos.json` and replace them with the clinic's own photos
before launch – stock people must never be presented as Human+ staff (no names or titles under them).

## Languages

- **Shqip** is the main language (`/`), **English** lives under `/en/` and **Deutsch** under `/de/`, with the same page
  names.
- The language menu in the header (SQ ▾ with the other two) keeps you on the same page. A visitor who chose English or
  German is sent to `/en/` or `/de/` when they come back to the home page.
- Every visible text exists in all three languages. The build **stops with an error** if a text key is missing in one
  of them (`dict()` in `src/lib/html.mjs`). The languages are listed once, in `LANGS` (`src/data/site.mjs`).
- German texts use the formal *Sie*; long German compounds hyphenate (`hyphens: auto`) instead of widening cards.
- Each page has `hreflang` links (sq, en, de, x-default) and its own share picture per language (`src/assets/og/`).

## Files

| File | What it is |
| --- | --- |
| `src/data/site.mjs` | **name, address, phones, WhatsApp / Viber number, e-mail, Facebook, opening hours, booking slots** – edit this first |
| `src/data/services.mjs` | the ten departments: names, texts, what they offer, related tests |
| `src/data/catalogue.json` | the full lab catalogue behind `/analizat/` (made by `scripts/import-catalogue.mjs`) |
| `src/data/tests.mjs` | the 89 common tests used on department pages and in the check-up panels (sq, en, de), preparation rules, the panels and their groups (`PANEL_GROUPS`), links to their catalogue pages |
| `src/data/lab-notes.mjs` | the *Good to know* notes on test pages (sq, en, de, with medical sources) and which tests get them |
| `src/data/lab-human-plus.json` | (optional) facts Human+ has confirmed per test, e.g. the result time |
| `src/pages/test.mjs` | the page of each lab test, `/analizat/<test>/` |
| `src/data/faq.mjs` | questions and answers |
| `src/data/ui.mjs` | shared interface texts (menu, buttons, status, list, footer) in sq, en and de |
| `src/pages/*.mjs` | one file per page group, with that page's texts at the top |
| `src/lib/layout.mjs` | head tags, top bar, header, footer, phone bar, list drawer |
| `src/lib/parts.mjs` | shared blocks (cards, test rows, search, CTA band, FAQ, mini map) |
| `src/lib/labbg.mjs` | the animated laboratory equipment behind the page bands |
| `src/data/photos.mjs` | photo slots: which scene stands in for each photo and the alt texts (see [Photos](#photos)) |
| `src/lib/photo.mjs`, `src/lib/scenes.mjs` | a slot's real photo when it is in `src/assets/photos/`, otherwise the illustrated scene (written to `assets/scenes/`) |
| `src/assets/photos/` | the clinic's photos, named after their slots (create the folder when the first photo arrives) |
| `src/lib/icons.mjs`, `src/lib/logo-paths.mjs` | icons (Lucide, Simple Icons) and the Human+ logo as vector paths |
| `src/assets/site.css` | the whole design; colours are the variables at the top |
| `src/assets/site.js` | browser behaviour: status, menus, list, search, booking, contact form |
| `src/assets/fonts/` | Outfit (WOFF2, self-hosted); `pangram/` for the licensed brand font when available |
| `src/assets/catalogue.js` | the catalogue page: loads `assets/catalogue.json`, search, categories, details, Add buttons |
| `src/data/chat.mjs`, `src/lib/chat.mjs`, `src/assets/chat.js` | the site assistant: texts and keywords, its data file per language, the chat itself |
| `src/assets/map-preview.svg` | the illustrated preview of the mini map (not the real streets) |
| `src/assets/og/og-sq.png`, `og-en.png` | the 1200 × 630 pictures WhatsApp / Facebook show when a link is shared |
| `src/static/` | favicons and app icons, copied to the site root |
| `scripts/build.mjs` | builds `dist/`: pages, sitemap, robots, manifest, llms.txt, 404 and `.htaccess` for Hostinger |
| `scripts/check.mjs` | checks `dist/`: links, anchors, images (alt, width, height), one H1, titles, descriptions, hreflang, ids, JSON-LD, sitemap |
| `scripts/serve.mjs` | local preview server |
| `scripts/import-catalogue.mjs` | turns a catalogue export into `src/data/catalogue.json` (see below) |
| `.github/workflows/pages.yml` | build + check on every push, publish the default branch to GitHub Pages |

## Editing

- **Phones, e-mail, address, Facebook, Instagram, TikTok, map**: `src/data/site.mjs`. The first phone is the main one (top bar, buttons,
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
- **Photos**: see [Photos](#photos).

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

Then open http://localhost:8080 (Albanian), http://localhost:8080/en/ or http://localhost:8080/de/.

## Publishing

**Preview – GitHub Pages.** Every push builds and checks the site. On the repository's default branch the workflow
then writes the built preview to the `gh-pages` branch, which GitHub Pages serves at https://ariongj.github.io/humanplus/
with `noindex`, so the preview never competes with the real domain in Google. If the page does not appear within a few
minutes, check *Settings → Pages*: *Deploy from a branch*, branch `gh-pages`, folder `/ (root)`.

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
- Logo, colours, pattern and font – the Human+ brand book (v1.0, 19.01.2024); logo vector paths from the ITD partners
  set (`ITD2027/alternative-v2/site/assets/partners/humanplus.svg`), coloured as in the brand book.

No prices, doctor names, ratings, reviews, certificates, result times, home visits or online results are claimed –
none of them were published. No stock photos are used: the pictures are illustrations drawn for the site, with no real
people, until the clinic's own photos are added.

## What is placeholder / to confirm with the clinic

- **Department texts** – Paediatrics follows the old site; the other nine describe each specialty's usual scope in
  general words. Ask each doctor to read their page.
- **Lab catalogue** – the 1 006 entries come from the BeoLab public catalogue the client supplied (see
  [Lab catalogue](#lab-catalogue)); names and descriptions are working Albanian translations, and the English
  and German ones (`src/data/catalogue-translations.json`) are working translations of those. The 89 common tests
  and the 20 check-up panels are suggestions. The lab should mark what Human+ does in-house, sends out or does not offer.
- **Preparation guide** – standard lab guidance; ask the lab manager to approve it.
- **German** – all German texts are working translations made for the site (formal *Sie*). Have a German-speaking
  doctor read the test pages, the *Good to know* notes and the preparation guide before launch.
- **Brand values** – Green `#28cc63` is sampled from the brand book; Deep Green, Soft Grey and Calm Blue are close matches until the official hex codes are confirmed (see [Brand](#brand)). The brand font Pangram needs its licensed web-font files.
- **WhatsApp / Viber** – messages go to +383 44 709 072. Confirm that number uses WhatsApp and Viber, or change
  `whatsapp` / `viber` in `src/data/site.mjs`.
- **Map** – a Google Maps search link; replace `mapsUrl` with the clinic's own Maps place link.
- **Good to know notes and test pages** – the notes (`src/data/lab-notes.mjs`) are plain-word versions of an editorial
  safety review, not yet approved by the Human+ doctors; the test pages show the reference data until the lab confirms
  which tests it offers. No result times are shown until Human+ confirms them (`src/data/lab-human-plus.json`).
- **Pictures** – all pictures are illustrated stand-ins until the clinic sends real photos (see [Photos](#photos)).
  The scenes show generic staff and rooms; they do not depict the clinic's actual staff, rooms or equipment.

- **Instagram / TikTok** – empty until the clinic sends its profile links (`instagram`, `tiktok` in
  `src/data/site.mjs`).
- **Mini map** – shows the Google search for the clinic; replace `mapsEmbed` with the clinic's own embed link for the
  exact pin.
- **Site assistant** – answers from the site's texts only; read its texts (`src/data/chat.mjs`) with the clinic.

## Before launch

- [ ] Confirm with the clinic that **every listed department is currently licensed** and staffed. Take a department
      off `src/data/services.mjs` until that is confirmed.
- [ ] Doctors approve their department texts; the lab approves the test list, panels and preparation guide.
- [ ] **Lab catalogue**: confirm that the client may reuse the BeoLab catalogue texts commercially (the export itself
      asks for this check), have the lab review the Albanian translations (and a German-speaking doctor the German ones), and mark the tests Human+ does not offer
      (remove them in `scripts/import-catalogue.mjs` or the export, then re-import).
- [ ] Confirm the WhatsApp / Viber number and send one test booking from a staff phone.
- [ ] Decide whether reception wants booking requests by e-mail as well (`formEndpoint`).
- [ ] **Photos** of the building, reception, sample room, lab and doctors (with everyone's permission) into
      `src/assets/photos/` – see [Photos](#photos). The illustrations work until then.
- [ ] Build with `SITE_URL=https://humanplusks.com`, upload `dist/` to Hostinger, check https://humanplusks.com/en/sherbim/pediatri/.
- [ ] Add the site to Google Search Console and submit `https://humanplusks.com/sitemap.xml`.
- [ ] Update the Google Business Profile with the website, hours and phones.

## Checks

`npm test` runs on every push (GitHub Actions). Before a release the site was also checked in Chromium:

- axe-core (WCAG 2.1 A/AA + best practice): 0 violations on 37 pages in Albanian, English and German × 2 widths
  (also for the photo version under /re/), 27 test pages × 3 languages × 3 widths, and the catalogue with a test
  added and its details open;
- no horizontal scroll and no clipped content on all 57 site pages at 320, 390 and 1440 px, nor on the 181 test pages
  with the longest names (and longest German compounds) at 320 px in each language; no console errors;
- photo slots: a real JPEG / WebP with a phone copy replaces its scene (srcset, width and height read from the file);
- opening status at Monday 06:10 / 10:00, Friday 19:30, Saturday 17:00 and Sunday 12:00;
- language menu (same page in the other language, on desktop and phone); catalogue search (Albanian, English,
  German, Serbian, abbreviations), categories, "show more", details, list across pages and tabs (and lists saved by the earlier version), panel add, booking validation, WhatsApp text, `.ics` time zone, contact form.

## Credits

Fonts: brand font Pangram (licensed, added by the client); stand-in [Outfit](https://fonts.google.com/specimen/Outfit) (SIL Open Font License), self-hosted from Fontsource. Icons: [Lucide](https://lucide.dev) (ISC) and
[Simple Icons](https://simpleicons.org) (CC0) for WhatsApp, Viber, Facebook, Instagram and TikTok. Illustrated scenes drawn for this site
(`src/lib/scenes.mjs`). Logo © Human+ Qendra Diagnostike.
