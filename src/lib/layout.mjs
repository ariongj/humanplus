// Page shell: <head>, top bar, header, footer, phone action bar, WhatsApp button and the lab-list drawer.
import { SITE, LANGS, SOCIALS } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { TESTS, PREP, SAMPLES } from '../data/tests.mjs';
import { UI } from '../data/ui.mjs';
import { CHAT } from '../data/chat.mjs';
import { LOGO_SQUARE, LOGO_MARK, LOGO_WORDS } from './logo-paths.mjs';
import { esc, h, icon, brand, L, LANG_NAMES } from './html.mjs';
import { BOOT_JS, csp, REFERRER_POLICY } from './security.mjs';

export const NAV = [
  ['sherbimet', 'nav_services'],
  ['analizat', 'nav_tests'],
  ['paketat', 'nav_panels'],
  ['pergatitja', 'nav_prep'],
  ['rreth-nesh', 'nav_about'],
  ['kontakt', 'nav_contact'],
];

// The logo is drawn once per page (logoSymbol, at the top of <body>) and reused with <use>: three copies
// (header, menu, footer) would otherwise weigh ~36 kB. Colours come from --logo-sq / --logo-mk and currentColor.
export const logoSymbol = () =>
  `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><symbol id="hp-logo" viewBox="0 0 216 77"><path fill="var(--logo-sq, #28cc63)" d="${LOGO_SQUARE}"/>${LOGO_MARK.map((d) => `<path fill="var(--logo-mk, #fff)" d="${d}"/>`).join('')}${LOGO_WORDS.map((d) => `<path fill="currentColor" d="${d}"/>`).join('')}</symbol></svg>`;

export function logo({ cls = '', label = SITE.fullName } = {}) {
  return `<svg class="logo ${cls}" role="img" aria-label="${esc(label)}" viewBox="0 0 216 77"><use href="#hp-logo"/></svg>`;
}

export function logoMark({ cls = '' } = {}) {
  return `<svg class="logo-mark ${cls}" aria-hidden="true" focusable="false" viewBox="0 0 77 77" xmlns="http://www.w3.org/2000/svg"><path class="logo-sq" d="${LOGO_SQUARE}"/>${LOGO_MARK.map((d) => `<path class="logo-mk" d="${d}"/>`).join('')}</svg>`;
}

/** Hours as text lines, e.g. "E hënë – E premte · 07:30 – 19:00". */
export function hoursRows(lang) {
  const t = UI[lang];
  const wk = SITE.hours[1];
  const sat = SITE.hours[6];
  return [
    { days: [1, 2, 3, 4, 5], label: t.weekdays_range, value: wk ? `${wk[0]} – ${wk[1]}` : t.closed },
    { days: [6], label: t.saturday, value: sat ? `${sat[0]} – ${sat[1]}` : t.closed },
    { days: [0], label: t.sunday, value: SITE.hours[0] ? `${SITE.hours[0][0]} – ${SITE.hours[0][1]}` : t.closed },
  ];
}

export function hoursTable(lang, { cls = '' } = {}) {
  return h`<dl class="hours ${cls}">${hoursRows(lang).map(
    (r) => h`<div class="hours-row" data-days="${r.days.join(',')}"><dt>${esc(r.label)}<span class="hours-today" hidden> · ${esc(UI[lang].hours_today)}</span></dt><dd>${esc(r.value)}</dd></div>`,
  )}</dl>`;
}

/** Live status chip (text + dot). Server text shows the hours; JS replaces it with "Open now · until 19:00". */
export function status(lang, { cls = '' } = {}) {
  const wk = SITE.hours[1];
  const sat = SITE.hours[6];
  const fallback = `${UI[lang].days_short[1]}–${UI[lang].days_short[5]} ${wk[0]}–${wk[1]} · ${UI[lang].days_short[6]} ${sat[0]}–${sat[1]}`;
  return `<span class="status ${cls}" data-status><span class="status-dot" aria-hidden="true"></span><span class="status-text">${esc(fallback)}</span></span>`;
}

export const phoneLabel = (p, lang) => L(p.label, lang);

function head(ctx) {
  const { lang, page, base, origin } = ctx;
  const self = ctx.abs(ctx.path, lang);
  const sq = ctx.abs(ctx.path, 'sq');
  const title = page.title;
  const og = `${origin}${base}assets/og/og-${lang}.png`;
  const jsonld = [].concat(page.jsonld ?? []).filter(Boolean);
  return h`<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <meta http-equiv="Content-Security-Policy" content="${esc(csp())}" />
    <meta name="referrer" content="${REFERRER_POLICY}" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(page.description)}" />
    <link rel="canonical" href="${esc(self)}" />
    ${!page.noAlternates && h`${LANGS.map((l) => h`<link rel="alternate" hreflang="${l}" href="${esc(ctx.abs(ctx.path, l))}" />`)}
    <link rel="alternate" hreflang="x-default" href="${esc(sq)}" />`}
    <meta name="robots" content="${ctx.noindex || page.noindex ? 'noindex, follow' : 'index, follow'}" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="format-detection" content="telephone=no" />
    <meta property="og:site_name" content="${esc(SITE.fullName)}" />
    <meta property="og:locale" content="${{ sq: 'sq_AL', en: 'en_GB', de: 'de_DE' }[lang]}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(page.description)}" />
    <meta property="og:url" content="${esc(self)}" />
    <meta property="og:image" content="${esc(og)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(`${SITE.fullName} — ${SITE.address.street}, ${lang === 'sq' ? SITE.address.city : SITE.address.cityEn} · ${SITE.phones[0].display}`)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="${base}favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="${base}favicon-32.png" sizes="32x32" type="image/png" />
    <link rel="apple-touch-icon" href="${base}apple-touch-icon.png" />
    <link rel="manifest" href="${base}manifest.webmanifest" />
    <link rel="preload" href="${base}assets/fonts/outfit-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin />
    ${(ctx.preload ?? []).map((p) => h`<link rel="preload" as="image" ${p.srcset ? `imagesrcset="${esc(p.srcset)}" imagesizes="${esc(p.sizes)}"` : `href="${esc(p.href)}"`} fetchpriority="high" />`)}
    <link rel="stylesheet" href="${base}assets/site.css?v=${ctx.version}" />
    <script>${BOOT_JS}</script>
    ${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`)}
  </head>`;
}

/** Hours and contact strip — always BELOW the header (the header comes first on every screen). */
function infobar(ctx) {
  const { lang } = ctx;
  const t = UI[lang];
  const p = SITE.phones[0];
  return h`<section class="infobar" aria-label="${esc(t.quick_contact)}">
    <div class="wrap infobar-in">
      ${status(lang)}
      <a class="infobar-link infobar-phone" href="tel:${p.tel}">${icon('phone', { size: 16 })}<span>${esc(p.display)}</span></a>
      <a class="infobar-link hide-sm" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">${icon('map-pin', { size: 16 })}<span>${esc(SITE.address.street)}, ${esc(lang === 'sq' ? SITE.address.city : SITE.address.cityEn)}</span></a>
      <span class="infobar-spacer"></span>
      <a class="infobar-link hide-sm" href="mailto:${SITE.email}">${icon('mail', { size: 16 })}<span>${esc(SITE.email)}</span></a>
      ${SOCIALS.map((s) => h`<a class="infobar-icon hide-sm" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${brand(s.id, { size: 16 })}</a>`)}
    </div>
  </section>`;
}

/** SQ · EN · DE: the current language, then links to the same page in the others. */
function langSwitch(ctx, cls = '') {
  const t = UI[ctx.lang];
  return h`<div class="lang ${cls}" role="group" aria-label="${esc(t.lang_label)}">${LANGS.map((l) =>
    l === ctx.lang
      ? h`<span class="lang-cur" aria-current="true"><span class="sr-only">${esc(LANG_NAMES[l])} — </span>${l.toUpperCase()}</span>`
      : h`<a class="lang-alt" href="${esc(ctx.url(ctx.path, l))}" hreflang="${l}" lang="${l}" data-lang="${l}"><span class="sr-only">${esc(LANG_NAMES[l])} — </span>${l.toUpperCase()}</a>`,
  )}</div>`;
}

/** Header: the current language as a small menu with the other two — the same on every screen (fits beside the logo at 320 px). */
function langPick(ctx) {
  const t = UI[ctx.lang];
  return h`<details class="lang-pick" data-lang-pick>
    <summary>${icon('globe', { size: 18, cls: 'lang-globe' })}<span class="sr-only">${esc(`${t.lang_label}: ${LANG_NAMES[ctx.lang]}`)} — </span>${ctx.lang.toUpperCase()}${icon('chevron-down', { size: 16 })}</summary>
    <ul>${LANGS.filter((l) => l !== ctx.lang).map((l) => h`<li><a class="lang-alt" href="${esc(ctx.url(ctx.path, l))}" hreflang="${l}" lang="${l}" data-lang="${l}"><span>${l.toUpperCase()}</span>${esc(LANG_NAMES[l])}</a></li>`)}</ul>
  </details>`;
}

function header(ctx) {
  const { lang } = ctx;
  const t = UI[lang];
  const cur = ctx.path.split('/')[0];
  const isCur = (k) => cur === k || (k === 'sherbimet' && cur === 'sherbim');
  const links = NAV.map(
    ([k, key]) => h`<li><a href="${esc(ctx.url(k))}"${isCur(k) && ' aria-current="page"'}>${esc(t[key])}</a></li>`,
  );
  return h`<header class="site-header" data-header>
    <div class="wrap header-in">
      <a class="brand" href="${esc(ctx.url(''))}" aria-label="${esc(`${SITE.fullName} — ${t.home}`)}">${logo({ label: SITE.fullName })}</a>
      <nav class="nav" aria-label="${esc(t.nav_main)}"><ul>${links}</ul></nav>
      <div class="header-actions">
        ${langPick(ctx)}
        <button class="list-btn js-only" type="button" data-list-open aria-haspopup="dialog" aria-controls="lab-list">
          ${icon('test-tubes', { size: 20 })}<span class="list-btn-label">${esc(t.list)}</span><span class="list-count" data-list-count aria-hidden="true">0</span><span class="sr-only" data-list-count-sr></span>
        </button>
        <a class="btn btn-primary btn-book" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 18 })}<span class="book-long">${esc(t.book)}</span><span class="book-short">${esc(t.book_short)}</span></a>
        <button class="menu-btn" type="button" data-menu-open aria-haspopup="dialog" aria-controls="menu" aria-label="${esc(t.nav_menu)}">${icon('menu', { size: 24 })}</button>
      </div>
    </div>
  </header>
  <dialog class="sheet menu" id="menu" aria-label="${esc(t.nav_menu)}">
    <div class="sheet-head">
      ${logo({ label: SITE.fullName })}
      <button class="icon-btn" type="button" data-close aria-label="${esc(t.nav_close)}">${icon('x', { size: 22 })}</button>
    </div>
    <nav aria-label="${esc(t.nav_main)}"><ul class="menu-list">${NAV.map(
      ([k, key]) => h`<li><a href="${esc(ctx.url(k))}"${isCur(k) && ' aria-current="page"'}>${esc(t[key])}${icon('chevron-right', { size: 18 })}</a></li>`,
    )}<li><a href="${esc(ctx.url('pyetje'))}"${cur === 'pyetje' && ' aria-current="page"'}>${esc(t.nav_faq)}${icon('chevron-right', { size: 18 })}</a></li></ul></nav>
    <a class="btn btn-primary btn-block" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 18 })}${esc(t.book)}</a>
    <div class="menu-contact">
      ${SITE.phones.map((p) => h`<a href="tel:${p.tel}">${icon('phone', { size: 18 })}<span>${esc(p.display)}</span><small>${esc(phoneLabel(p, lang))}</small></a>`)}
      <a href="mailto:${SITE.email}">${icon('mail', { size: 18 })}<span>${esc(SITE.email)}</span></a>
    </div>
    <div class="menu-foot">${status(lang)}${langSwitch(ctx)}</div>
  </dialog>`;
}

function footer(ctx) {
  const { lang } = ctx;
  const t = UI[lang];
  const year = new Date().getFullYear();
  return h`<footer class="site-footer">
    <div class="wrap footer-grid">
      <div class="footer-brand">
        <a class="brand brand-light" href="${esc(ctx.url(''))}" aria-label="${esc(`${SITE.fullName} — ${t.home}`)}">${logo({ label: SITE.fullName })}</a>
        <p>${esc(t.footer_about)}</p>
        <div class="footer-social">
          ${SOCIALS.map((s) => h`<a class="icon-btn icon-btn-dark" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.name)}">${brand(s.id, { size: 18 })}</a>`)}
          <a class="icon-btn icon-btn-dark" href="${esc(ctx.wa())}" target="_blank" rel="noopener" aria-label="${esc(t.whatsapp_label)}">${brand('whatsapp', { size: 18 })}</a>
          <a class="icon-btn icon-btn-dark" href="mailto:${SITE.email}" aria-label="${esc(t.email)}">${icon('mail', { size: 18 })}</a>
        </div>
      </div>
      <nav class="footer-col" aria-labelledby="f-services">
        <h2 id="f-services">${esc(t.nav_services)}</h2>
        <ul>${SERVICES.map((s) => h`<li><a href="${esc(ctx.url(`sherbim/${s.slug}`))}">${esc(L(s.nameShort ?? s.name, lang))}</a></li>`)}</ul>
      </nav>
      <nav class="footer-col" aria-labelledby="f-lab">
        <h2 id="f-lab">${esc(t.footer_lab)}</h2>
        <ul>
          <li><a href="${esc(ctx.url('analizat'))}">${esc(t.nav_tests)}</a></li>
          <li><a href="${esc(ctx.url('paketat'))}">${esc(t.nav_panels)}</a></li>
          <li><a href="${esc(ctx.url('pergatitja'))}">${esc(t.nav_prep)}</a></li>
        </ul>
        <h2 class="mt">${esc(t.footer_centre)}</h2>
        <ul>
          <li><a href="${esc(ctx.url('rreth-nesh'))}">${esc(t.nav_about)}</a></li>
          <li><a href="${esc(ctx.url('rezervo'))}">${esc(t.book)}</a></li>
          <li><a href="${esc(ctx.url('pyetje'))}">${esc(t.nav_faq)}</a></li>
          <li><a href="${esc(ctx.url('kontakt'))}">${esc(t.nav_contact)}</a></li>
          <li><a href="${esc(ctx.url('privatesia'))}">${esc(t.nav_privacy)}</a></li>
        </ul>
      </nav>
      <div class="footer-col">
        <h2>${esc(t.footer_contact)}</h2>
        <address>
          <a href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">${icon('map-pin', { size: 18 })}<span>${esc(SITE.address.street)}<br />${esc(SITE.address.postalCode)} ${esc(lang === 'sq' ? SITE.address.city : SITE.address.cityEn)}</span></a>
          ${SITE.phones.map((p) => h`<a href="tel:${p.tel}">${icon('phone', { size: 18 })}<span>${esc(p.display)} <small>${esc(phoneLabel(p, lang))}</small></span></a>`)}
          <a href="mailto:${SITE.email}">${icon('mail', { size: 18 })}<span>${esc(SITE.email)}</span></a>
        </address>
        <h2 class="mt">${esc(t.hours)}</h2>
        ${hoursTable(lang, { cls: 'hours-dark' })}
      </div>
    </div>
    <div class="wrap"><div class="footer-bottom">
      <p>© ${SITE.founded}–${year} ${esc(SITE.fullName)}. ${esc(t.footer_rights)}</p>
      <p class="footer-note">${esc(t.footer_note)}</p>
      ${langSwitch(ctx, 'lang-dark')}
    </div></div>
    <a class="wa-fab" href="${esc(ctx.wa())}" target="_blank" rel="noopener" aria-label="${esc(t.whatsapp_label)}" data-wa-fab>${brand('whatsapp', { size: 28 })}</a>
  </footer>`;
}

function actionBar(ctx) {
  const t = UI[ctx.lang];
  return h`<nav class="action-bar" aria-label="${esc(t.call_us)}">
    <a href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 20 })}<span>${esc(t.call)}</span></a>
    <a href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 20 })}<span>${esc(t.whatsapp)}</span></a>
    <a class="action-bar-main" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 20 })}<span>${esc(t.book_short)}</span></a>
  </nav>`;
}

function drawer(ctx) {
  const t = UI[ctx.lang];
  return h`<dialog class="sheet drawer" id="lab-list" aria-labelledby="lab-list-title">
    <div class="sheet-head">
      <h2 id="lab-list-title">${icon('test-tubes', { size: 22 })}${esc(t.list_title)}</h2>
      <button class="icon-btn" type="button" data-close aria-label="${esc(t.close)}">${icon('x', { size: 22 })}</button>
    </div>
    <div class="drawer-empty" data-list-empty>
      <span class="empty-icon">${icon('clipboard-list', { size: 28 })}</span>
      <h3>${esc(t.list_empty_title)}</h3>
      <p>${esc(t.list_empty_text)}</p>
      <a class="btn btn-soft" href="${esc(ctx.url('analizat'))}">${icon('search', { size: 18 })}${esc(t.list_browse)}</a>
    </div>
    <div class="drawer-body" data-list-body hidden>
      <p class="drawer-count" data-list-summary aria-live="polite"></p>
      <ul class="drawer-list" data-list-items></ul>
      <a class="drawer-prep" href="${esc(ctx.url('pergatitja'))}">${icon('info', { size: 18 })}${esc(t.list_prep)}</a>
    </div>
    <div class="drawer-foot" data-list-foot hidden>
      <p>${esc(t.list_send_intro)}</p>
      <a class="btn btn-wa btn-block" data-list-wa href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 20 })}${esc(t.list_send_wa)}</a>
      <div class="drawer-alt">
        <a class="btn btn-outline" data-list-viber href="viber://chat?number=${encodeURIComponent(SITE.viber)}">${brand('viber', { size: 18 })}${esc(t.list_send_viber)}</a>
        <a class="btn btn-outline" data-list-mail href="mailto:${SITE.email}">${icon('mail', { size: 18 })}${esc(t.list_send_mail)}</a>
      </div>
      <div class="drawer-tools">
        <button class="link-btn" type="button" data-list-copy>${icon('copy', { size: 16 })}<span>${esc(t.list_copy)}</span></button>
        <button class="link-btn" type="button" data-list-print>${icon('printer', { size: 16 })}<span>${esc(t.list_print)}</span></button>
        <button class="link-btn" type="button" data-list-clear>${icon('trash-2', { size: 16 })}<span>${esc(t.list_clear)}</span></button>
      </div>
    </div>
  </dialog>
  <div class="toast" role="status" aria-live="polite" data-toast hidden></div>`;
}

/**
 * The site assistant: a button and an empty chat window. assets/chat.js (loaded on the first click) fills it from
 * assets/chat-<lang>.json. Desktop: a panel above the button, the page stays usable; phones: full screen.
 */
function chat(ctx) {
  const c = CHAT[ctx.lang];
  return h`<button class="chat-fab js-only" type="button" data-chat-open aria-controls="chat" aria-expanded="false" aria-label="${esc(c.launcher)}" data-chat-src="${ctx.base}assets/chat.js?v=${ctx.version}">
    ${icon('message-circle-question', { size: 22 })}<span class="chat-fab-label">${esc(c.launcher)}</span>
  </button>
  <dialog class="chat" id="chat" aria-labelledby="chat-title" data-chat="${esc(ctx.chat)}">
    <div class="chat-head">
      <span class="chat-avatar">${logoMark()}</span>
      <div class="chat-head-text"><h2 id="chat-title" tabindex="-1">${esc(c.title)}</h2><p>${esc(c.subtitle)}</p></div>
      <button class="icon-btn" type="button" data-chat-restart aria-label="${esc(c.restart)}">${icon('rotate-ccw', { size: 18 })}</button>
      <button class="icon-btn" type="button" data-chat-close aria-label="${esc(c.close)}">${icon('x', { size: 22 })}</button>
    </div>
    <div class="chat-log" role="log" aria-live="polite" aria-label="${esc(c.title)}" tabindex="0" data-chat-log></div>
    <form class="chat-form" data-chat-form>
      <label class="sr-only" for="chat-input">${esc(c.input_label)}</label>
      <input id="chat-input" name="q" type="text" autocomplete="off" enterkeyhint="send" maxlength="200" placeholder="${esc(c.placeholder)}" />
      <button class="chat-send" type="submit" aria-label="${esc(c.send)}">${icon('send', { size: 20 })}</button>
    </form>
    <p class="chat-note">${icon('siren', { size: 14 })}<span>${esc(c.note)}</span></p>
  </dialog>`;
}

/** Strings + test names the browser script needs, for the page language. */
function clientData(ctx) {
  const { lang } = ctx;
  const t = UI[lang];
  const keys = ['open_now', 'closed_now', 'open_until', 'opens_at', 'opens_day', 'tomorrow', 'days', 'days_short', 'days_on', 'months', 'list_count_one', 'list_count_many', 'list_add', 'list_added', 'list_bar_open', 'list_remove', 'list_remove_aria', 'list_msg_hello', 'list_msg_thanks', 'list_mail_subject', 'list_copied', 'list_title', 'sheet_date', 'sheet_test', 'sheet_sample', 'sheet_prep', 'sheet_note', 'sheet_hours', 'sheet_contact', 'priv_saved', 'priv_none', 'priv_blocked', 'priv_cleared'];
  const strings = Object.fromEntries(keys.map((k) => [k, t[k]]));
  // [name, preparation, sample] of each common test
  const tests = Object.fromEntries(TESTS.map((x) => [x.id, [L(x.name, lang), L(PREP[x.prep].short, lang), L(SAMPLES[x.sample], lang)]]));
  return {
    lang,
    t: strings,
    tests,
    hours: SITE.hours,
    tz: SITE.timeZone,
    wa: SITE.whatsapp,
    email: SITE.email,
    phone: SITE.phones[0].display,
    slot: SITE.slotMinutes,
    lastSlot: SITE.lastSlotBeforeClose,
    days: SITE.bookingDays,
    form: SITE.formEndpoint,
    // for the printed list (assets/site.js → printList)
    cat: `${ctx.base}assets/catalogue-${lang}.json?v=${ctx.version}`,
    site: {
      name: SITE.fullName,
      addr: `${SITE.address.street}, ${SITE.address.postalCode} ${lang === 'sq' ? SITE.address.city : SITE.address.cityEn}`,
      phones: SITE.phones.map((p) => `${p.display} (${phoneLabel(p, lang)})`).join(' · '),
      hours: hoursRows(lang).map((r) => `${r.label} ${r.value}`).join(' · '),
      web: ctx.abs(''),
    },
  };
}

export function layout(ctx, body) {
  const { lang, base } = ctx;
  const t = UI[lang];
  return h`<!doctype html>
<html lang="${lang}" class="no-js">
  ${head(ctx)}
  <body class="page-${esc(ctx.page.id)}">
    ${logoSymbol()}
    <a class="skip" href="#main">${esc(t.skip)}</a>
    ${header(ctx)}
    ${infobar(ctx)}
    <main id="main" tabindex="-1">
      ${body}
    </main>
    ${footer(ctx)}
    ${actionBar(ctx)}
    ${chat(ctx)}
    ${drawer(ctx)}
    <noscript><p class="noscript">${esc(t.no_js)} <a href="tel:${SITE.phones[0].tel}">${esc(SITE.phones[0].display)}</a>.</p></noscript>
    <script type="application/json" id="hp-data">${JSON.stringify(clientData(ctx)).replace(/</g, '\\u003c')}</script>
    <script src="${base}assets/site.js?v=${ctx.version}" defer></script>
  </body>
</html>
`;
}
