# Human+ website — notes for Claude

Static bilingual site for Human+ Qendra Diagnostike (Prishtinë). README.md is the full guide; this file is the short
version of how this project (and the owner's other client sites: taxig, ITD2027, optika, Selca, hotelplav) is worked on.

## Commands

- `npm test` — build `dist/` and run `scripts/check.mjs` (links, anchors, one H1, titles, descriptions, hreflang,
  ids, JSON-LD, sitemap). Must pass before every commit.
- `npm run preview` — serve `dist/` on http://localhost:8080.
- Preview build like CI: `BASE_PATH=/humanplus/ SITE_URL=https://ariongj.github.io node scripts/build.mjs`.
- Production build: `SITE_URL=https://humanplusks.com node scripts/build.mjs` (adds `.htaccess`, indexable).

No dependencies. Don't add a framework or npm packages to the site; one-off tools (Playwright, axe-core) live outside
the repo.

## Where things are

- Facts (phones, hours, address, WhatsApp number): `src/data/site.mjs` — the only place to change them.
- Full lab catalogue `src/data/catalogue.json` (generated: `node scripts/import-catalogue.mjs <export.js>`, never edit by
  hand; never import another lab's prices or result times), English + panel components in
  `src/data/catalogue-translations.json` (hand-editable; German under `de`), page `src/pages/catalogue.mjs` + `src/assets/catalogue.js`.
  Show only the page language (no Serbian on screen; it stays a search alias).
- Departments `src/data/services.mjs`, common tests and panels `src/data/tests.mjs`, FAQ `src/data/faq.mjs`,
  shared UI text `src/data/ui.mjs`, page texts at the top of each `src/pages/*.mjs`.
- Design: `src/assets/site.css` (tokens at the top). Follow the Human+ brand book in the light look the owner wants: green, white
  and bluish white (bluish-white bands, green lab/CTA bands, deep-green footer); green buttons carry black text; green
  text on white uses `--brand` / `--green-lg`; font Pangram (files in `src/assets/fonts/pangram/`, Outfit until then);
  8 px buttons. README → Brand.
  Behaviour: `src/assets/site.js` (vanilla; shares helpers with catalogue.js on `window.HP`).
- Site assistant (chat): texts and keywords `src/data/chat.mjs`, data `src/lib/chat.mjs` → `assets/chat-<lang>.json`,
  behaviour `src/assets/chat.js`. It answers only from the site's own data, never interprets results, sends emergencies
  to 112 / 194, and hands the rest to WhatsApp. Mini map: `miniMap()` in `src/lib/parts.mjs` – Google Maps loads only
  after a click. Socials: `instagram` / `tiktok` in `site.mjs` (shown only when set; never guess a handle).
- Photos: slots in `src/data/photos.mjs` (alt texts). The clinic's photo goes in `src/assets/photos/<slot>.jpg|webp`
  (optional `<slot>-sm`); without it the slot shows an illustrated scene from `src/lib/scenes.mjs` (written to
  `assets/scenes/`). README → Photos.

## Rules (from the owner's past projects)

- **Header first, on every screen size.** The header (logo, menu, language switcher, actions) is the first thing
  on the page, and the language switcher (SQ ▾ menu with EN / DE) lives inside it. Hours, phone, address and similar info go in a
  strip *below* the header, never above it; on phones keep that strip to one line. A utility bar above the header
  looks like a demo.
- **Albanian first, English and German complete.** Every visible string exists in sq, en and de (`LANGS` in
  `src/data/site.mjs`); `dict()` fails the build otherwise. German uses the formal *Sie*.
  Albanian writes weekdays and months in lower case inside a sentence.
- **Missing facts stay missing.** No invented prices, doctor names, ratings, reviews, certificates, result times,
  guarantees, reply-time promises or equipment. Ask, or answer "ask us". List anything assumed in README →
  *What is placeholder*.
- **No stock photos.** Use the logo, illustration and type; real photos only from the clinic, with permission.
  The site must still read as a clinic (doctors, lab, sample room) — the illustrated scenes do that until photos arrive.
- **Quality bar: a real-client demo.** Polished and premium, no lorem ipsum, hover / empty / error states, responsive
  down to 320 px. Check desktop 1440×900 and phone 390×844, at least one screen in Albanian.
- **Accessibility:** axe 0 violations, contrast ≥ 4.5:1, 44 px touch targets, 16 px form fields, skip link,
  focus-visible, reduced motion, statuses as text + symbol (never colour alone).
- Self-hosted WOFF2 fonts, no cookies, no analytics unless the client asks (then opt-in consent).
- WhatsApp messages via `api.whatsapp.com/send` with a prefilled text; never send test messages to the clinic.
- Keep old URLs working (`/sherbim/<slug>/`, `/en/sherbim/<slug>/`).

## Commits

Sentence-case subject, no conventional-commit prefix, no full stop (e.g. "Add the lab-test catalogue and my list").
Body: `- ` bullets under short headers, and a final **Checks:** line with the numbers (check script, axe, widths).
