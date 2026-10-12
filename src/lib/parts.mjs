// Building blocks shared by several pages.
import { SITE } from '../data/site.mjs';
import { TESTS, PREP, SAMPLES } from '../data/tests.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, L, accent, fold, dict } from './html.mjs';
import { labBackground } from './labbg.mjs';
import { photo } from './photo.mjs';
import { commonTestPath } from './slugs.mjs';

export const TEST_BY_ID = new Map(TESTS.map((x) => [x.id, x]));
export const testName = (id, lang) => L(TEST_BY_ID.get(id)?.name, lang);
/** Short label for chips: the optional `short` name, else the name without its bracket or "me …" tail. */
export const shortName = (id, lang) => {
  const x = TEST_BY_ID.get(id);
  return L(x?.short, lang) || testName(id, lang).replace(/\s*\(.*\)/, '').replace(/\s+(me|with|mit)\s.*$/, '');
};

/** Breadcrumb trail + BreadcrumbList JSON-LD. `trail` = [[label, path], …] (the last item is the current page). */
export function crumbs(ctx, trail) {
  const t = UI[ctx.lang];
  const all = [[t.home, ''], ...trail];
  const html = h`<nav class="crumbs" aria-label="${esc(t.breadcrumb)}"><ol>${all.map(([label, path], i) =>
    i === all.length - 1
      ? h`<li><span aria-current="page">${esc(label)}</span></li>`
      : h`<li><a href="${esc(ctx.url(path))}">${esc(label)}</a>${icon('chevron-right', { size: 14 })}</li>`,
  )}</ol></nav>`;
  const jsonld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map(([label, path], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: ctx.abs(path) })),
  };
  return { html, jsonld };
}

/** Inner-page hero: breadcrumbs, eyebrow, H1 (with *accent*), lead and optional actions / aside. */
/** `photo` = a photo slot (or [slot, fallback]) shown beside the title on wide screens. */
export function pageHero(ctx, { trail, eyebrow, title, lead, actions = '', aside = '', cls = '', photo: slot = '' }) {
  const [name, fallback] = Array.isArray(slot) ? slot : [slot];
  const pic = name && photo(ctx, name, { fallback, eager: true, sizes: '(min-width: 960px) 34vw, 100vw' });
  const c = crumbs(ctx, trail);
  return {
    jsonld: c.jsonld,
    html: h`<section class="page-hero${pic ? ' has-photo' : ''} ${cls}">
      ${labBackground('page')}
      <div class="wrap page-hero-in">
        <div class="page-hero-text">
          ${c.html}
          ${eyebrow && h`<p class="eyebrow">${esc(eyebrow)}</p>`}
          <h1>${accent(title)}</h1>
          ${lead && h`<p class="lead">${esc(lead)}</p>`}
          ${actions && h`<div class="actions">${actions}</div>`}
        </div>
        ${aside && h`<div class="page-hero-aside">${aside}</div>`}
        ${pic && h`<div class="page-hero-photo">${pic}</div>`}
      </div>
    </section>`,
  };
}

export function sectionHead({ eyebrow, title, text = '', id = '', center = false, light = false }) {
  return h`<div class="section-head${center ? ' center' : ''}${light ? ' light' : ''}">
    <p class="eyebrow">${esc(eyebrow)}</p>
    <h2${id && ` id="${id}"`}>${accent(title)}</h2>
    ${text && h`<p class="section-text">${esc(text)}</p>`}
  </div>`;
}

export function serviceCard(ctx, s, i) {
  const t = UI[ctx.lang];
  const name = L(s.name, ctx.lang);
  return h`<li class="svc reveal">
    <a class="svc-link" href="${esc(ctx.url(`sherbim/${s.slug}`))}">
      <span class="svc-top"><span class="tile tile-${s.tone}">${icon(s.icon, { size: 26 })}</span><span class="svc-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span></span>
      <h3>${esc(name)}</h3>
      <p>${esc(L(s.short, ctx.lang))}</p>
      <span class="svc-more">${esc(t.more)}<span class="sr-only">: ${esc(name)}</span>${icon('arrow-right', { size: 18 })}</span>
    </a>
  </li>`;
}

/** The "Add to my list" toggle (hidden without JS). */
export function addButton(ctx, id, { compact = false } = {}) {
  const t = UI[ctx.lang];
  const name = testName(id, ctx.lang);
  return h`<button class="add-btn js-only${compact ? ' add-btn-sm' : ''}" type="button" data-add="${id}" aria-pressed="false" aria-label="${esc(`${t.list_add}: ${name}`)}">
    <span class="add-off">${icon('plus', { size: 16 })}${esc(t.list_add)}</span><span class="add-on">${icon('check', { size: 16 })}${esc(t.list_added)}</span>
  </button>`;
}

export function prepChip(ctx, key) {
  return h`<a class="chip chip-prep" href="${esc(ctx.url('pergatitja'))}#prep-${key}">${icon(key === 'none' ? 'circle-check' : key === 'fasting' || key === 'ogtt' ? 'utensils-crossed' : 'clock', { size: 14 })}${esc(L(PREP[key].short, ctx.lang))}</a>`;
}

export function testRow(ctx, x) {
  const name = L(x.name, ctx.lang);
  const search = fold([x.name.sq, x.name.en, x.name.de, x.aka].filter(Boolean).join(" "));
  return h`<li class="test" data-test="${x.id}" data-cat="${x.cat}" data-search="${esc(search)}">
    <div class="test-main">
      <h3 class="test-name">${commonTestPath(x.id) ? h`<a href="${esc(ctx.url(commonTestPath(x.id)))}">${esc(name)}</a>` : esc(name)}</h3>
    </div>
    <div class="test-meta">
      <span class="chip">${icon(x.sample === 'blood' ? 'droplet' : x.sample === 'swab' ? 'syringe' : 'test-tubes', { size: 14 })}${esc(L(SAMPLES[x.sample], ctx.lang))}</span>
      ${prepChip(ctx, x.prep)}
    </div>
    ${addButton(ctx, x.id)}
  </li>`;
}

export function panelCard(ctx, p, { full = false } = {}) {
  const lang = ctx.lang;
  const T = {
    sq: { tests: 'analiza', add: 'Shto paketën në listë', ask: 'Pyet për çmimin', incl: 'Përfshin', added: 'Paketa është në listë' },
    en: { tests: 'tests', add: 'Add the check-up to my list', ask: 'Ask for the price', incl: 'Includes', added: 'Check-up is on your list' },
    de: { tests: 'Analysen', add: 'Check-up zur Liste hinzufügen', ask: 'Nach dem Preis fragen', incl: 'Enthält', added: 'Check-up ist auf Ihrer Liste' },
  }[lang];
  const name = L(p.name, lang);
  const msg = {
    sq: `Përshëndetje Human+! Dëshiroj informata për paketën "${name}" (${p.tests.map((id) => testName(id, lang)).join(', ')}).`,
    en: `Hello Human+! I would like information about the "${name}" check-up (${p.tests.map((id) => testName(id, lang)).join(', ')}).`,
    de: `Hallo Human+! Ich hätte gerne Informationen zum Check-up „${name}“ (${p.tests.map((id) => testName(id, lang)).join(', ')}).`,
  }[lang];
  return h`<article class="panel reveal" id="paketa-${p.id}">
    <div class="panel-head">
      <span class="tile tile-brand">${icon(p.icon, { size: 24 })}</span>
      <span class="panel-count">${p.tests.length} ${esc(T.tests)}</span>
    </div>
    <h3>${esc(name)}</h3>
    <p class="panel-for">${esc(L(p.for, lang))}</p>
    <p class="panel-text">${esc(L(p.text, lang))}</p>
    ${full
      ? h`<p class="panel-incl">${esc(T.incl)}</p><ul class="panel-tests">${p.tests.map((id) => h`<li>${icon('check', { size: 16 })}${commonTestPath(id) ? h`<a href="${esc(ctx.url(commonTestPath(id)))}">${esc(testName(id, lang))}</a>` : esc(testName(id, lang))}</li>`)}</ul>`
      : h`<p class="panel-list">${esc(p.tests.map((id) => testName(id, lang)).join(' · '))}</p>`}
    <div class="panel-actions">
      <button class="btn btn-soft btn-sm js-only" type="button" data-add-panel="${p.tests.join(',')}" data-done="${esc(T.added)}">${icon('plus', { size: 16 })}<span>${esc(T.add)}</span></button>
      <a class="btn btn-ghost btn-sm" href="${esc(ctx.wa(msg))}" target="_blank" rel="noopener">${brand('whatsapp', { size: 16 })}${esc(T.ask)}</a>
    </div>
  </article>`;
}

/** Hero-style search box that submits to /analizat/?q=… (works without JS; JS filters in place). */
export function testSearch(ctx, { id = 'q', big = false, autofocus = false, value = '', landmark = true } = {}) {
  const T = {
    sq: { label: 'Kërko një analizë', ph: 'p.sh. vitamina D, TSH, gjaku komplet', go: 'Kërko' },
    en: { label: 'Search for a test', ph: 'e.g. vitamin D, TSH, blood count', go: 'Search' },
    de: { label: 'Analyse suchen', ph: 'z. B. Vitamin D, TSH, Blutbild', go: 'Suchen' },
  }[ctx.lang];
  return h`<form class="search${big ? ' search-big' : ''}"${landmark && ' role="search"'} action="${esc(ctx.url('analizat'))}" method="get" data-search-form>
    <label class="sr-only" for="${id}">${esc(T.label)}</label>
    ${icon('search', { size: 20, cls: 'search-icon' })}
    <input id="${id}" name="q" type="search" placeholder="${esc(T.ph)}" autocomplete="off" enterkeyhint="search" value="${esc(value)}"${autofocus && ' autofocus'} />
    <button class="btn btn-primary" type="submit">${esc(T.go)}</button>
  </form>`;
}

export function ctaBand(ctx, { title, text }) {
  const t = UI[ctx.lang];
  return h`<section class="cta-band">
    <div class="wrap"><div class="cta-in reveal">
      <div>
        <h2>${accent(title)}</h2>
        <p>${esc(text)}</p>
      </div>
      <div class="actions">
        <a class="btn btn-light" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 18 })}${esc(t.book)}</a>
        <a class="btn btn-wa" href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(t.whatsapp)}</a>
        <a class="btn btn-outline-dark" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 18 })}${esc(SITE.phones[0].display)}</a>
      </div>
    </div></div>
  </section>`;
}

export function faqList(items, lang) {
  return h`<div class="faq">${items.map(
    (f) => h`<details class="faq-item reveal" id="faq-${f.id}"><summary><span>${esc(L(f.q, lang))}</span>${icon('chevron-down', { size: 20 })}</summary><div class="faq-a"><p>${esc(L(f.a, lang))}</p></div></details>`,
  )}</div>`;
}

const G = dict('gallery', {
  sq: {
    lab: 'Laboratori',
    lab_d: 'Biokimi, hematologji dhe mikrobiologji — këtu në qendër.',
    sample: 'Marrja e mostrave',
    sample_d: 'Gjaku dhe mostrat e tjera merren nga stafi ynë.',
    ped: 'Pediatria',
    ped_d: 'Pediatri dhe laborator në të njëjtin vend.',
    spec: 'Specialistët',
    spec_d: 'Gjinekologji, urologji, endokrinologji, gastroenterologji, dermatologji.',
    rec: 'Recepsioni',
    rec_d: 'Ju orienton dhe e konfirmon terminin.',
  },
  en: {
    lab: 'Laboratory',
    lab_d: 'Biochemistry, haematology and microbiology — here at the centre.',
    sample: 'Sample collection',
    sample_d: 'Blood and other samples are taken by our staff.',
    ped: 'Paediatrics',
    ped_d: 'Paediatrics and laboratory in one place.',
    spec: 'Specialists',
    spec_d: 'Gynaecology, urology, endocrinology, gastroenterology, dermatology.',
    rec: 'Reception',
    rec_d: 'Guides you and confirms your appointment.',
  },
  de: {
    lab: 'Labor',
    lab_d: 'Biochemie, Hämatologie und Mikrobiologie — hier im Zentrum.',
    sample: 'Probenentnahme',
    sample_d: 'Blut und andere Proben werden von unserem Personal entnommen.',
    ped: 'Kinderheilkunde',
    ped_d: 'Kinderheilkunde und Labor an einem Ort.',
    spec: 'Fachärzte',
    spec_d: 'Gynäkologie, Urologie, Endokrinologie, Gastroenterologie, Dermatologie.',
    rec: 'Rezeption',
    rec_d: 'Hilft Ihnen weiter und bestätigt Ihren Termin.',
  },
});

/** "Inside the centre": the lab, sample room, paediatrics, specialists and reception — photos or scenes. */
export function centreGallery(ctx) {
  const g = G[ctx.lang];
  return h`<ul class="gallery">${[
    ['lab', 'microscope', g.lab, g.lab_d, 'analizat'],
    ['sampling', 'syringe', g.sample, g.sample_d, 'pergatitja'],
    ['pediatrics', 'baby', g.ped, g.ped_d, 'sherbim/pediatri'],
    ['consult', 'stethoscope', g.spec, g.spec_d, 'sherbimet'],
    ['reception', 'calendar-check', g.rec, g.rec_d, 'rezervo'],
  ].map(
    ([slot, ic, title, d, path], i) => h`<li class="gallery-item reveal${i === 0 ? ' gallery-lead' : ''}"><a href="${esc(ctx.url(path))}">
      ${photo(ctx, slot, { decorative: true, sizes: i === 0 ? '(min-width: 960px) 40vw, 100vw' : '(min-width: 960px) 28vw, (min-width: 560px) 50vw, 100vw' })}
      <span class="gallery-cap"><span class="tile tile-brand">${icon(ic, { size: 20 })}</span><span class="gallery-text"><strong>${esc(title)}</strong><small>${esc(d)}</small></span>${icon('arrow-up-right', { size: 18, cls: 'gallery-arrow' })}</span>
    </a></li>`,
  )}</ul>`;
}
