// /analizat/ — the full lab-test catalogue (src/data/catalogue.json, ~1 000 tests and panels, imported with
// scripts/import-catalogue.mjs; English and the Albanian panel components in src/data/catalogue-translations.json).
// The page ships the shell; assets/catalogue.js loads assets/catalogue-<lang>.json and renders search, categories,
// details and the "Add to my list" buttons — every visible text in the page's language.
import fs from 'node:fs';
import { SITE } from '../data/site.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, fold } from '../lib/html.mjs';
import { LAB_NOTES } from '../data/lab-notes.mjs';
import { pageHero, testSearch } from '../lib/parts.mjs';

export const CATALOGUE = JSON.parse(fs.readFileSync(new URL('../data/catalogue.json', import.meta.url), 'utf8'));
const TR_FILE = new URL('../data/catalogue-translations.json', import.meta.url);
const TR = fs.existsSync(TR_FILE) ? JSON.parse(fs.readFileSync(TR_FILE, 'utf8')) : { names: {}, desc: {}, text: {}, comp: {} };

/**
 * The catalogue as the browser gets it, in one language: name, description, sample, collection, preparation and
 * components in that language; `o` / `oc` = name and note in the other language (so "Lista ime" can show the
 * page language after a switch); `q` = search words in both languages plus the Serbian name and aliases.
 * Returns { data, missing } — missing = English texts that fell back to Albanian.
 */
export function catalogueFor(lang) {
  let missing = 0;
  // A translation, or the Albanian text (counted, so the build can warn) when it is still missing.
  const tr = (map, key, sq) => {
    if (!sq) return null;
    if (map?.[key]) return map[key];
    missing++;
    return sq;
  };
  const DE = TR.de ?? {};
  const note = (x) => x.co || x.sp || '';
  const entries = CATALOGUE.entries.map((x) => {
    const comp = TR.comp[x.id];
    const texts = {
      sq: { n: x.n, d: x.d, sp: x.sp, co: x.co, p: x.p, m: comp?.sq ?? x.m },
      en: { n: tr(TR.names, x.id, x.n), d: tr(TR.desc, x.id, x.d), sp: tr(TR.text, x.sp, x.sp), co: tr(TR.text, x.co, x.co), p: tr(TR.text, x.p, x.p), m: comp?.en ?? x.m },
    };
    const before = missing;
    texts.de = { n: tr(DE.names, x.id, x.n), d: tr(DE.desc, x.id, x.d), sp: tr(DE.text, x.sp, x.sp), co: tr(DE.text, x.co, x.co), p: tr(DE.text, x.p, x.p), m: DE.comp?.[x.id] ?? comp?.en ?? x.m };
    if (lang !== 'de') missing = before;
    const cur = texts[lang];
    return {
      id: x.id, c: x.c, k: x.k, u: x.u, ...cur, s: x.s,
      // The name and note in every language, so "Lista ime" can follow a language switch.
      o: Object.fromEntries(Object.entries(texts).map(([l, v]) => [l, v.n])),
      oc: Object.fromEntries(Object.entries(texts).map(([l, v]) => [l, note(v)])),
      w: x.w ?? [], ml: x.ml ?? [],
      // Search words: the names in all three languages, the Serbian name and the aliases.
      q: fold([texts.en.n, texts.de.n, x.q].join(' ')),
    };
  });
  return { data: { checkedAt: CATALOGUE.checkedAt, count: CATALOGUE.count, entries }, missing: lang === 'sq' ? 0 : missing };
}
const roundDown = (n) => (n >= 1000 ? Math.floor(n / 100) * 100 : Math.floor(n / 10) * 10);
export const CATALOGUE_ROUND = roundDown(CATALOGUE.count);

const T = dict('catalogue', {
  sq: {
    title: 'Katalogu i analizave laboratorike — mbi {n} analiza',
    description: 'Katalogu i analizave në Human+ Prishtinë: mbi {n} analiza laboratorike me përshkrim, mostër dhe përgatitje — hemogram, biokimi, hormone, alergji, mikrobiologji, serologji dhe më shumë. Krijoni listën dhe pyetni për çmimin.',
    eyebrow: 'Laboratori',
    h1: 'Katalogu i *analizave*.',
    lead: 'Mbi {n} analiza laboratorike me përshkrim, mostër dhe përgatitje. Kërkoni sipas emrit ose shkurtesës, shtoni analizat në listë dhe na e dërgoni për çmimin dhe terminin.',
    note: 'Katalog informues. Disponueshmërinë në Human+, çmimin dhe përgatitjen e saktë i konfirmon laboratori — na dërgoni listën tuaj.',
    lang_note: '',
    cats: 'Kategoritë',
    cats_hint: 'Zgjidhni një kategori ose kërkoni më lart.',
    all: 'Të gjitha',
    filter: 'Filtro sipas kategorisë',
    filter_prev: 'Kategoritë e mëparshme',
    filter_next: 'Më shumë kategori',
    count_one: '1 analizë',
    count_many: '{n} analiza',
    count_in: '{n} analiza në “{c}”',
    sorted: 'Renditur sipas alfabetit',
    col_test: 'Analiza',
    col_order: 'Mostra dhe lista',
    more: 'Shfaq edhe {n}',
    details: 'Detajet',
    desc: 'Përshkrimi',
    sample: 'Mostra',
    collection: 'Marrja e mostrës',
    prep: 'Përgatitja',
    includes: 'Përfshin',
    panel: 'Panel',
    no_details: 'Për këtë analizë na pyetni për mostrën dhe përgatitjen.',
    open_page: 'Faqja e plotë e analizës',
    good: 'Për t’u ditur',
    loading: 'Duke ngarkuar katalogun…',
    failed: 'Katalogu nuk u ngarkua. Rifreskoni faqen ose na telefononi.',
    none_title: 'Nuk e gjetëm këtë analizë',
    none_text: 'Provoni një emër tjetër ose shkurtesën — ose na shkruani dhe ju tregojmë nëse e bëjmë.',
    none_wa: 'Pyet në WhatsApp',
    none_msg: 'Përshëndetje Human+! A e bëni analizën:',
    reset: 'Pastro kërkimin',
    hint_title: 'Si funksionon lista?',
    hint_1: 'Shtypni “Shto në listë” te analizat që ju duhen.',
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
    lead: 'Over {n} laboratory tests with description, sample and preparation. Search by name or abbreviation, add tests to your list and send it to us for the price and an appointment.',
    note: 'For information only. The laboratory confirms availability at Human+, the price and the exact preparation — send us your list.',
    lang_note: '',
    cats: 'Categories',
    cats_hint: 'Choose a category or search above.',
    all: 'All',
    filter: 'Filter by category',
    filter_prev: 'Previous categories',
    filter_next: 'More categories',
    count_one: '1 test',
    count_many: '{n} tests',
    count_in: '{n} tests in “{c}”',
    sorted: 'Sorted A–Z',
    col_test: 'Test',
    col_order: 'Sample and list',
    more: 'Show {n} more',
    details: 'Details',
    desc: 'Description',
    sample: 'Sample',
    collection: 'Collection',
    prep: 'Preparation',
    includes: 'Includes',
    panel: 'Panel',
    no_details: 'For this test, ask us about the sample and preparation.',
    open_page: 'Full page for this test',
    good: 'Good to know',
    loading: 'Loading the catalogue…',
    failed: 'The catalogue could not be loaded. Refresh the page or call us.',
    none_title: 'We could not find this test',
    none_text: 'Try another name or the abbreviation — or message us and we will tell you whether we do it.',
    none_wa: 'Ask on WhatsApp',
    none_msg: 'Hello Human+! Do you do this test:',
    reset: 'Clear the search',
    hint_title: 'How does the list work?',
    hint_1: 'Press “Add to list” on the tests you need.',
    hint_2: 'Open “My list” at the top of the page.',
    hint_3: 'Send it on WhatsApp, Viber or by e-mail.',
    hint_note: 'Reception gives the prices. The list is kept only in your browser.',
    noscript: 'The catalogue needs JavaScript. Call us or message us on WhatsApp about any test:',
  },
  de: {
    title: 'Katalog der Laboranalysen — über {n} Analysen',
    description: 'Der Analysenkatalog von Human+ Prishtina: über {n} Laboranalysen mit Beschreibung, Probe und Vorbereitung — Blutbild, Biochemie, Hormone, Allergie, Mikrobiologie, Serologie und mehr. Erstellen Sie Ihre Liste und fragen Sie nach dem Preis.',
    eyebrow: 'Labor',
    h1: 'Katalog der *Laboranalysen*.',
    lead: 'Über {n} Laboranalysen mit Beschreibung, Probe und Vorbereitung. Suchen Sie nach Name oder Abkürzung, fügen Sie Analysen Ihrer Liste hinzu und senden Sie sie uns, um Preis und Termin zu erfragen.',
    note: 'Ein Informationskatalog. Verfügbarkeit bei Human+, Preis und genaue Vorbereitung bestätigt das Labor — senden Sie uns Ihre Liste.',
    lang_note: '',
    cats: 'Kategorien',
    cats_hint: 'Wählen Sie eine Kategorie oder suchen Sie oben.',
    all: 'Alle',
    filter: 'Nach Kategorie filtern',
    filter_prev: 'Vorherige Kategorien',
    filter_next: 'Weitere Kategorien',
    count_one: '1 Analyse',
    count_many: '{n} Analysen',
    count_in: '{n} Analysen in „{c}“',
    sorted: 'Sortiert von A bis Z',
    col_test: 'Analyse',
    col_order: 'Probe und Liste',
    more: '{n} weitere anzeigen',
    details: 'Details',
    desc: 'Beschreibung',
    sample: 'Probe',
    collection: 'Probenentnahme',
    prep: 'Vorbereitung',
    includes: 'Enthält',
    panel: 'Panel',
    no_details: 'Fragen Sie uns bei dieser Analyse nach Probe und Vorbereitung.',
    open_page: 'Vollständige Seite zur Analyse',
    good: 'Gut zu wissen',
    loading: 'Katalog wird geladen…',
    failed: 'Der Katalog konnte nicht geladen werden. Laden Sie die Seite neu oder rufen Sie uns an.',
    none_title: 'Wir haben diese Analyse nicht gefunden',
    none_text: 'Versuchen Sie einen anderen Namen oder die Abkürzung — oder schreiben Sie uns, und wir sagen Ihnen, ob wir sie durchführen.',
    none_wa: 'Auf WhatsApp fragen',
    none_msg: 'Hallo Human+! Bieten Sie diese Analyse an:',
    reset: 'Suche löschen',
    hint_title: 'Wie funktioniert die Liste?',
    hint_1: 'Klicken Sie bei den Analysen, die Sie brauchen, auf „Zur Liste“.',
    hint_2: 'Öffnen Sie oben auf der Seite „Meine Liste“.',
    hint_3: 'Senden Sie sie per WhatsApp, Viber oder E-Mail.',
    hint_note: 'Die Preise nennt Ihnen die Rezeption. Die Liste wird nur in Ihrem Browser gespeichert.',
    noscript: 'Für den Katalog wird JavaScript benötigt. Zu jeder Analyse erreichen Sie uns telefonisch oder per WhatsApp:',
  },
});

// "1 000" in Albanian, "1,000" in English.
const fill = (s, lang) => s.replace('{n}', lang === 'en' ? CATALOGUE_ROUND.toLocaleString('en-GB') : String(CATALOGUE_ROUND).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f'));

export function testsPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const cats = CATALOGUE.categories;
  const catName = (c) => c[lang] ?? c.en;
  const hero = pageHero(ctx, {
    trail: [[u.nav_tests, 'analizat']],
    eyebrow: t.eyebrow,
    title: t.h1,
    lead: fill(t.lead, lang),
    photo: 'analyzer',
  });
  // One row that scrolls sideways; the arrows (shown only when more categories are hidden that way) move it with a mouse.
  const filters = h`<div class="filters-wrap" data-filters-wrap>
  <button type="button" class="filters-arrow filters-prev js-only" data-filters-step="-1" aria-label="${esc(t.filter_prev)}" tabindex="-1">${icon('chevron-left', { size: 20 })}</button>
  <div class="filters" role="group" aria-label="${esc(t.filter)}" data-filters>
    <button type="button" class="filter" data-filter="" aria-pressed="true">${esc(t.all)} <span>${CATALOGUE.count}</span></button>
    ${cats.map((c) => h`<button type="button" class="filter" data-filter="${c.id}" aria-pressed="false">${esc(catName(c))} <span>${c.count}</span></button>`)}
  </div>
  <button type="button" class="filters-arrow filters-next js-only" data-filters-step="1" aria-label="${esc(t.filter_next)}" tabindex="-1">${icon('chevron-right', { size: 20 })}</button>
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
          <div class="cat-table">
            <div class="cat-head" aria-hidden="true"><span>${esc(t.col_test)}</span><span>${esc(t.col_order)}</span></div>
            <ul class="cat-list" data-cat-list></ul>
          </div>
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
    url: `${ctx.base}assets/catalogue-${lang}.json?v=${ctx.version}`,
    page: ctx.url('analizat'),
    notes: Object.fromEntries(Object.entries(LAB_NOTES).map(([k, v]) => [k, v[lang]])),
    lang,
    cats: Object.fromEntries(cats.map((c) => [c.id, catName(c)])),
    t: Object.fromEntries(['count_one', 'count_many', 'count_in', 'more', 'details', 'desc', 'sample', 'collection', 'prep', 'includes', 'panel', 'no_details', 'failed', 'open_page', 'good'].map((k) => [k, t[k]])),
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

