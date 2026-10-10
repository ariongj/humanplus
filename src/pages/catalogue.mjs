// /analizat/ — the full lab-test catalogue (src/data/catalogue.json, ~1 000 tests and panels, imported with
// scripts/import-catalogue.mjs). The page ships the shell; assets/catalogue.js loads the data and renders
// search, categories, details and the "Add to my list" buttons.
import fs from 'node:fs';
import { SITE } from '../data/site.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict } from '../lib/html.mjs';
import { pageHero, testSearch } from '../lib/parts.mjs';

export const CATALOGUE = JSON.parse(fs.readFileSync(new URL('../data/catalogue.json', import.meta.url), 'utf8'));
const roundDown = (n) => (n >= 1000 ? Math.floor(n / 100) * 100 : Math.floor(n / 10) * 10);
export const CATALOGUE_ROUND = roundDown(CATALOGUE.count);

const T = dict('catalogue', {
  sq: {
    title: 'Katalogu i analizave laboratorike — mbi {n} analiza',
    description: 'Katalogu i analizave në Human+ Prishtinë: mbi {n} analiza laboratorike me përshkrim, mostër dhe përgatitje — hemogram, biokimi, hormone, alergji, mikrobiologji, serologji dhe më shumë. Krijoni listën dhe pyetni për çmimin.',
    eyebrow: 'Laboratori',
    h1: 'Katalogu i *analizave*.',
    lead: 'Mbi {n} analiza laboratorike me përshkrim, mostër dhe përgatitje. Kërkoni sipas emrit — edhe në serbisht — shtoni analizat në listë dhe na e dërgoni për çmimin dhe terminin.',
    note: 'Katalog informues. Disponueshmërinë në Human+, çmimin dhe përgatitjen e saktë i konfirmon laboratori — na dërgoni listën tuaj.',
    lang_note: '',
    cats: 'Kategoritë',
    cats_hint: 'Zgjidhni një kategori ose kërkoni më lart.',
    all: 'Të gjitha',
    filter: 'Filtro sipas kategorisë',
    count_one: '1 analizë',
    count_many: '{n} analiza',
    count_in: '{n} analiza në “{c}”',
    sorted: 'Renditur sipas alfabetit',
    more: 'Shfaq edhe {n}',
    details: 'Detajet',
    desc: 'Përshkrimi',
    sample: 'Mostra',
    collection: 'Marrja e mostrës',
    prep: 'Përgatitja',
    includes: 'Përfshin',
    panel: 'Panel',
    sr_name: 'Emri në serbisht',
    no_details: 'Për këtë analizë na pyetni për mostrën dhe përgatitjen.',
    loading: 'Duke ngarkuar katalogun…',
    failed: 'Katalogu nuk u ngarkua. Rifreskoni faqen ose na telefononi.',
    none_title: 'Nuk e gjetëm këtë analizë',
    none_text: 'Provoni një emër tjetër ose shkurtesën — ose na shkruani dhe ju tregojmë nëse e bëjmë.',
    none_wa: 'Pyet në WhatsApp',
    none_msg: 'Përshëndetje Human+! A e bëni analizën:',
    reset: 'Pastro kërkimin',
    hint_title: 'Si funksionon lista?',
    hint_1: 'Shtypni “Shto” te analizat që ju duhen.',
    hint_2: 'Hapni “Lista ime” lart në faqe.',
    hint_3: 'Dërgojeni në WhatsApp, Viber ose me e-mail.',
    hint_note: 'Çmimet i jep recepsioni. Lista ruhet vetëm në shfletuesin tuaj.',
    noscript: 'Katalogu kërkon JavaScript. Na telefononi ose na shkruani në WhatsApp për çdo analizë:',
  },
  en: {
    title: 'Lab test catalogue — over {n} tests',
    description: 'The lab test catalogue at Human+ Prishtina: over {n} laboratory tests with description, sample and preparation — blood count, biochemistry, hormones, allergy, microbiology, serology and more. Build your list and ask for the price.',
    eyebrow: 'Laboratory',
    h1: 'Lab test *catalogue*.',
    lead: 'Over {n} laboratory tests with description, sample and preparation. Search by name — Albanian or Serbian — add tests to your list and send it to us for the price and a time.',
    note: 'An information catalogue. The laboratory confirms availability at Human+, the price and the exact preparation — send us your list.',
    lang_note: 'Test names and details are in Albanian, with the Serbian name where it helps. Ask us in English on WhatsApp.',
    cats: 'Categories',
    cats_hint: 'Choose a category or search above.',
    all: 'All',
    filter: 'Filter by category',
    count_one: '1 test',
    count_many: '{n} tests',
    count_in: '{n} tests in “{c}”',
    sorted: 'Sorted A–Z',
    more: 'Show {n} more',
    details: 'Details',
    desc: 'Description',
    sample: 'Sample',
    collection: 'Collection',
    prep: 'Preparation',
    includes: 'Includes',
    panel: 'Panel',
    sr_name: 'Serbian name',
    no_details: 'For this test, ask us about the sample and preparation.',
    loading: 'Loading the catalogue…',
    failed: 'The catalogue could not be loaded. Refresh the page or call us.',
    none_title: 'We could not find this test',
    none_text: 'Try another name or the abbreviation — or message us and we will tell you whether we do it.',
    none_wa: 'Ask on WhatsApp',
    none_msg: 'Hello Human+! Do you do this test:',
    reset: 'Clear the search',
    hint_title: 'How does the list work?',
    hint_1: 'Press “Add” on the tests you need.',
    hint_2: 'Open “My list” at the top of the page.',
    hint_3: 'Send it on WhatsApp, Viber or by e-mail.',
    hint_note: 'Reception gives the prices. The list is kept only in your browser.',
    noscript: 'The catalogue needs JavaScript. Call us or message us on WhatsApp about any test:',
  },
});

// "1 000" in Albanian, "1,000" in English.
const fill = (s, lang) => s.replace('{n}', lang === 'en' ? CATALOGUE_ROUND.toLocaleString('en-GB') : String(CATALOGUE_ROUND).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f'));

export function testsPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const cats = CATALOGUE.categories;
  const catName = (c) => (lang === 'en' ? c.en : c.sq);
  const hero = pageHero(ctx, {
    trail: [[u.nav_tests, 'analizat']],
    eyebrow: t.eyebrow,
    title: t.h1,
    lead: fill(t.lead, lang),
  });
  const filters = h`<div class="filters" role="group" aria-label="${esc(t.filter)}" data-filters>
    <button type="button" class="filter" data-filter="" aria-pressed="true">${esc(t.all)} <span>${CATALOGUE.count}</span></button>
    ${cats.map((c) => h`<button type="button" class="filter" data-filter="${c.id}" aria-pressed="false">${esc(catName(c))} <span>${c.count}</span></button>`)}
  </div>`;
  const grid = h`<section class="cat-cats" data-cat-grid aria-labelledby="h-cats">
    <div class="cat-cats-head"><h2 id="h-cats">${esc(t.cats)}</h2><p class="muted small">${esc(t.cats_hint)}</p></div>
    <ul class="cat-grid">${cats.map(
      (c) => h`<li><button type="button" class="cat-card js-only" data-filter="${c.id}"><span class="tile tile-brand tile-sm">${icon(c.icon, { size: 16 })}</span><span class="cat-card-name">${esc(catName(c))}</span><span class="cat-card-count">${c.count}</span></button></li>`,
    )}</ul>
  </section>`;
  const body = h`<section class="section section-tight">
    <div class="wrap catalog">
      <div class="catalog-main">
        <div class="catalog-bar">
          ${testSearch(ctx, { id: 'tests-q', big: true })}
          ${filters}
        </div>
        <p class="note note-info">${icon('info', { size: 18 })}<span>${esc(t.note)}${t.lang_note && ` ${esc(t.lang_note)}`}</span></p>
        ${grid}
        <div class="cat-results">
          <div class="cat-results-head"><p class="catalog-count" aria-live="polite" data-count>${esc(t.loading)}</p><p class="muted small" data-sorted>${esc(t.sorted)}</p></div>
          <ul class="cat-list" data-cat-list></ul>
          <button class="btn btn-outline btn-block js-only" type="button" data-more hidden></button>
          <div class="empty" data-none hidden>
            <span class="empty-icon">${icon('search', { size: 28 })}</span>
            <h2>${esc(t.none_title)}</h2>
            <p>${esc(t.none_text)}</p>
            <div class="actions center">
              <a class="btn btn-wa" data-none-wa data-msg="${esc(t.none_msg)}" href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(t.none_wa)}</a>
              <button class="btn btn-outline" type="button" data-reset>${esc(t.reset)}</button>
            </div>
          </div>
          <noscript><div class="aside-card"><p>${esc(t.noscript)}</p><p><a class="btn btn-primary" href="tel:${SITE.phones[0].tel}">${esc(SITE.phones[0].display)}</a> <a class="btn btn-wa" href="${esc(ctx.wa())}">WhatsApp</a></p></div></noscript>
        </div>
      </div>
      <aside class="catalog-aside">
        <div class="aside-card sticky">
          <h2>${icon('list-checks', { size: 20 })}${esc(t.hint_title)}</h2>
          <ol class="mini-steps"><li>${esc(t.hint_1)}</li><li>${esc(t.hint_2)}</li><li>${esc(t.hint_3)}</li></ol>
          <button class="btn btn-primary btn-block js-only" type="button" data-list-open aria-haspopup="dialog" aria-controls="lab-list">${icon('test-tubes', { size: 18 })}${esc(u.list)} <span class="list-count list-count-inline" data-list-count aria-hidden="true">0</span></button>
          <p class="small muted">${esc(t.hint_note)}</p>
          <a class="link" href="${esc(ctx.url('paketat'))}">${esc(u.nav_panels)}${icon('arrow-right', { size: 16 })}</a>
          <a class="link" href="${esc(ctx.url('pergatitja'))}">${esc(u.prep_link)}${icon('arrow-right', { size: 16 })}</a>
        </div>
      </aside>
    </div>
  </section>`;
  // Strings and paths the catalogue script needs.
  const config = {
    url: `${ctx.base}assets/catalogue.json?v=${ctx.version}`,
    lang,
    cats: Object.fromEntries(cats.map((c) => [c.id, catName(c)])),
    t: Object.fromEntries(['count_one', 'count_many', 'count_in', 'more', 'details', 'desc', 'sample', 'collection', 'prep', 'includes', 'panel', 'sr_name', 'no_details', 'failed'].map((k) => [k, t[k]])),
    add: u.list_add,
    added: u.list_added,
  };
  const bar = h`<div class="list-bar js-only" data-list-bar hidden>
    <span class="list-bar-text">${icon('test-tubes', { size: 20 })}<strong data-list-bar-text></strong></span>
    <button class="btn btn-light btn-sm" type="button" data-list-open aria-haspopup="dialog" aria-controls="lab-list">${esc(u.list_bar_open)}${icon('arrow-right', { size: 16 })}</button>
  </div>`;
  const scripts = h`<script type="application/json" id="hp-cat">${JSON.stringify(config).replace(/</g, '\\u003c')}</script>
  <script src="${ctx.base}assets/catalogue.js?v=${ctx.version}" defer></script>`;
  return {
    id: 'tests',
    title: `${fill(t.title, lang)} · ${SITE.name}`,
    description: fill(t.description, lang),
    jsonld: [hero.jsonld],
    body: hero.html + body + bar + scripts,
  };
}

