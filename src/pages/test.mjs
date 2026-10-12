// /analizat/<slug>/ — one page for every test and panel in the lab catalogue, in Albanian and English (same slug).
// Everything comes from src/data/catalogue.json (+ catalogue-translations.json for English) and the curated
// "good to know" notes in src/data/lab-notes.mjs. Result times and prices are Human+'s own: a time shows only when
// the clinic has confirmed it in src/data/lab-human-plus.json; otherwise the page says the staff tell you.
import fs from 'node:fs';
import { SITE } from '../data/site.mjs';
import { UI } from '../data/ui.mjs';
import { LAB_NOTES } from '../data/lab-notes.mjs';
import { esc, h, icon, brand, dict } from '../lib/html.mjs';
import { pageHero, ctaBand } from '../lib/parts.mjs';
import { CATALOGUE, catalogueFor } from './catalogue.mjs';

// Facts the clinic has confirmed per test: { "k17376": { "time": { "sq": "1 ditë pune", "en": "1 working day" } } }.
const HP_FILE = new URL('../data/lab-human-plus.json', import.meta.url);
const HP = fs.existsSync(HP_FILE) ? JSON.parse(fs.readFileSync(HP_FILE, 'utf8')) : {};

const T = dict('test', {
  sq: {
    title_suffix: 'analizë laboratorike',
    title_panel: 'panel laboratorik',
    desc_fallback: 'në Human+ Prishtinë: mostra, marrja dhe përgatitja. Shtojeni në listë dhe na pyesni për çmimin dhe terminin.',
    lead_fallback: 'Analizë laboratorike në kategorinë {c}. Na pyesni për mostrën, përgatitjen dhe çmimin, telefonisht ose në WhatsApp.',
    panel: 'Panel',
    parts: 'përbërës',
    about: 'Rreth analizës',
    about_panel: 'Rreth panelit',
    no_desc: 'Për këtë analizë nuk kemi ende përshkrim të detajuar. Na shkruani dhe ju tregojmë për çfarë përdoret, si merret mostra dhe si të përgatiteni.',
    good: 'Për t’u ditur',
    source: 'Burimi',
    sample_title: 'Mostra dhe përgatitja',
    sample: 'Mostra',
    collection: 'Marrja e mostrës',
    prep: 'Përgatitja',
    time: 'Koha e rezultatit',
    time_ask: 'Ju tregojmë kur e jepni mostrën.',
    time_confirmed: 'konfirmuar nga Human+',
    unknown: 'Na pyesni',
    prep_guide: 'Udhëzuesi i përgatitjes',
    includes: 'Përfshin',
    included_in: 'Përfshihet në',
    related: 'Analiza të tjera në {c}',
    related_all: 'Të gjitha analizat në {c}',
    fact_title: 'Shkurtimisht',
    ask: 'Pyet në WhatsApp',
    ask_msg: 'Përshëndetje Human+! Dëshiroj informata për analizën',
    book: 'Rezervo termin',
    info_note: 'Katalog informues. Disponueshmërinë në Human+, çmimin, mostrën dhe përgatitjen e saktë i konfirmon laboratori — na dërgoni listën ose na telefononi.',
    back: 'Kthehu te katalogu',
    cta_title: 'Pyetje për këtë *analizë*?',
    cta_text: 'Na shkruani në WhatsApp ose na telefononi — ju tregojmë çmimin, përgatitjen dhe orën më të përshtatshme.',
  },
  en: {
    title_suffix: 'lab test',
    title_panel: 'lab panel',
    desc_fallback: 'at Human+ Prishtina: sample, collection and preparation. Add it to your list and ask us for the price and a time.',
    lead_fallback: 'A laboratory test in {c}. Ask us about the sample, preparation and price, by phone or on WhatsApp.',
    panel: 'Panel',
    parts: 'components',
    about: 'About this test',
    about_panel: 'About this panel',
    no_desc: 'We do not have a detailed description of this test yet. Message us and we tell you what it is for, how the sample is taken and how to prepare.',
    good: 'Good to know',
    source: 'Source',
    sample_title: 'Sample and preparation',
    sample: 'Sample',
    collection: 'Collection',
    prep: 'Preparation',
    time: 'Result time',
    time_ask: 'We tell you when you give the sample.',
    time_confirmed: 'confirmed by Human+',
    unknown: 'Ask us',
    prep_guide: 'Preparation guide',
    includes: 'Includes',
    included_in: 'Included in',
    related: 'Other tests in {c}',
    related_all: 'All tests in {c}',
    fact_title: 'At a glance',
    ask: 'Ask on WhatsApp',
    ask_msg: 'Hello Human+! I would like information about the test',
    book: 'Book an appointment',
    info_note: 'An information catalogue. The laboratory confirms availability at Human+, the price, the sample and the exact preparation — send us your list or call us.',
    back: 'Back to the catalogue',
    cta_title: 'A question about this *test*?',
    cta_text: 'Message us on WhatsApp or call — we tell you the price, how to prepare and the best time to come.',
  },
  de: {
    title_suffix: 'Laboranalyse',
    title_panel: 'Laborpanel',
    desc_fallback: 'bei Human+ Prishtina: Probe, Probenentnahme und Vorbereitung. Fügen Sie die Analyse Ihrer Liste hinzu und fragen Sie uns nach Preis und Termin.',
    lead_fallback: 'Eine Laboranalyse in der Kategorie {c}. Fragen Sie uns nach Probe, Vorbereitung und Preis, telefonisch oder per WhatsApp.',
    panel: 'Panel',
    parts: 'Bestandteile',
    about: 'Über diese Analyse',
    about_panel: 'Über dieses Panel',
    no_desc: 'Für diese Analyse haben wir noch keine ausführliche Beschreibung. Schreiben Sie uns, und wir sagen Ihnen, wofür sie dient, wie die Probe entnommen wird und wie Sie sich vorbereiten.',
    good: 'Gut zu wissen',
    source: 'Quelle',
    sample_title: 'Probe und Vorbereitung',
    sample: 'Probe',
    collection: 'Probenentnahme',
    prep: 'Vorbereitung',
    time: 'Zeit bis zum Ergebnis',
    time_ask: 'Das sagen wir Ihnen bei der Probenabgabe.',
    time_confirmed: 'von Human+ bestätigt',
    unknown: 'Fragen Sie uns',
    prep_guide: 'Leitfaden zur Vorbereitung',
    includes: 'Enthält',
    included_in: 'Enthalten in',
    related: 'Weitere Analysen in {c}',
    related_all: 'Alle Analysen in {c}',
    fact_title: 'Auf einen Blick',
    ask: 'Auf WhatsApp fragen',
    ask_msg: 'Hallo Human+! Ich hätte gerne Informationen zur Analyse',
    book: 'Termin buchen',
    info_note: 'Ein Informationskatalog. Verfügbarkeit bei Human+, Preis, Probe und genaue Vorbereitung bestätigt das Labor — senden Sie uns Ihre Liste oder rufen Sie uns an.',
    back: 'Zurück zum Katalog',
    cta_title: 'Fragen zu dieser *Analyse*?',
    cta_text: 'Schreiben Sie uns auf WhatsApp oder rufen Sie an — wir nennen Ihnen den Preis, die Vorbereitung und die beste Zeit für Ihren Besuch.',
  },
});

// Entries per language, by id, built once.
const DATA = {};
function data(lang) {
  if (!DATA[lang]) {
    const entries = catalogueFor(lang).data.entries;
    const byId = new Map(entries.map((x) => [x.id, x]));
    // Panels that list a test as a component (component links from the import).
    const parents = new Map();
    for (const x of entries) (x.ml ?? []).forEach((id) => id && parents.set(id, [...(parents.get(id) ?? []), x.id]));
    // A–Z inside each category, for "other tests in …".
    const byCat = new Map();
    for (const x of [...entries].sort((a, b) => a.n.localeCompare(b.n, lang))) byCat.set(x.c[0], [...(byCat.get(x.c[0]) ?? []), x.id]);
    DATA[lang] = { byId, parents, byCat };
  }
  return DATA[lang];
}

const catName = (id, lang) => {
  const c = CATALOGUE.categories.find((x) => x.id === id);
  return c ? c[lang] ?? c.en : id;
};
const firstSentence = (s) => (s.match(/^.*?[.!?](\s|$)/)?.[0] ?? s).trim();
const clip = (s, n) => (s.length > n ? `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…` : s);

export const testPath = (x) => `analizat/${x.u}`;

export function testPage(ctx, id) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const D = data(lang);
  const x = D.byId.get(id);
  const cat = catName(x.c[0], lang);
  const link = (y) => h`<a href="${esc(ctx.url(testPath(y)))}">${esc(y.n)}</a>`;
  const confirmed = HP[x.id]?.time?.[lang];
  const note = x.co || x.sp || '';

  const facts = h`<div class="aside-card test-card">
    <h2>${icon('test-tube', { size: 20 })}${esc(t.fact_title)}</h2>
    <dl class="test-facts">
      <div><dt>${icon('droplet', { size: 16 })}${esc(t.sample)}</dt><dd>${esc(x.sp || x.co || t.unknown)}</dd></div>
      <div><dt>${icon('clipboard-list', { size: 16 })}${esc(t.prep)}</dt><dd>${esc(x.p ? clip(firstSentence(x.p), 90) : t.unknown)}</dd></div>
      <div><dt>${icon('clock', { size: 16 })}${esc(t.time)}</dt><dd>${esc(confirmed || t.time_ask)}</dd></div>
    </dl>
    <button class="btn btn-primary btn-block add-btn add-btn-lg js-only" type="button" data-add="${x.id}" data-name="${esc(x.n)}" data-names="${esc(JSON.stringify(x.o))}" data-note="${esc(note)}" data-notes="${esc(JSON.stringify(x.oc))}" aria-pressed="false" aria-label="${esc(`${u.list_add}: ${x.n}`)}">
      <span class="add-off">${icon('plus', { size: 18 })}${esc(u.list_add)}</span><span class="add-on">${icon('check', { size: 18 })}${esc(u.list_added)}</span>
    </button>
    <a class="btn btn-wa btn-block" href="${esc(ctx.wa(`${t.ask_msg}: ${x.n}.`))}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(t.ask)}</a>
    <a class="btn btn-outline btn-block" href="${esc(ctx.url('rezervo'))}?sherbimi=${/mikrobiologji|parazitologji/.test(x.c[0]) ? 'laboratori-mikrobiologjik' : 'laboratori-biokimik-dhe-hematologjik'}">${icon('calendar-check', { size: 18 })}${esc(t.book)}</a>
  </div>`;

  const hero = pageHero(ctx, {
    trail: [[u.nav_tests, 'analizat'], [x.n, testPath(x)]],
    eyebrow: x.k ? `${cat} · ${t.panel}` : cat,
    title: x.n.replace(/\*/g, ''),
    lead: x.d ? clip(firstSentence(x.d), 220) : t.lead_fallback.replace('{c}', cat),
    actions: h`<div class="test-chips">
      ${x.c.map((c) => h`<a class="chip chip-link" href="${esc(ctx.url('analizat'))}?kategoria=${esc(c)}">${esc(catName(c, lang))}</a>`)}
      ${x.co && h`<span class="chip chip-brand">${icon(/urin/i.test(x.co) ? 'test-tubes' : /bris|tampon|swab/i.test(x.co) ? 'syringe' : 'droplet', { size: 14 })}${esc(x.co)}</span>`}
      ${x.m?.length > 0 && h`<span class="chip chip-violet">${esc(`${x.m.length} ${t.parts}`)}</span>`}
    </div>`,
    aside: facts,
    cls: 'page-hero-test',
  });

  const notes = (x.w ?? []).filter((k) => LAB_NOTES[k]);
  // The first sentence is the lead under the title; the section shows the rest, so nothing reads twice.
  const lead = x.d ? clip(firstSentence(x.d), 220) : '';
  const rest = x.d && lead === firstSentence(x.d) ? x.d.slice(firstSentence(x.d).length).trim() : x.d;
  const about = h`<section class="section section-tight" aria-labelledby="h-about">
    <div class="wrap test-layout">
      <div class="test-main">
        ${(rest || !x.d) && h`<h2 class="group-title" id="h-about">${esc(x.k ? t.about_panel : t.about)}</h2>
        <p class="prose test-desc${x.d ? '' : ' muted'}">${esc(x.d ? rest : t.no_desc)}</p>`}
        ${notes.length ? h`<aside class="good-to-know" aria-labelledby="h-good">
          <h3 id="h-good">${icon('info', { size: 18 })}${esc(t.good)}</h3>
          <ul>${notes.map((k) => h`<li><p>${esc(LAB_NOTES[k][lang])}</p><p class="good-src">${esc(t.source)}: ${LAB_NOTES[k].src.map(([name, href], i) => h`${i ? ', ' : ''}<a href="${esc(href)}" target="_blank" rel="noopener">${esc(name)}</a>`)}</p></li>`)}</ul>
        </aside>` : ''}

        <h2 class="group-title" id="h-sample">${esc(t.sample_title)}</h2>
        <dl class="test-dl">
          <div><dt>${esc(t.sample)}</dt><dd>${esc(x.sp || t.unknown)}</dd></div>
          ${x.co && x.co !== x.sp && h`<div><dt>${esc(t.collection)}</dt><dd>${esc(x.co)}</dd></div>`}
          <div><dt>${esc(t.prep)}</dt><dd>${esc(x.p || t.unknown)}</dd></div>
          <div><dt>${esc(t.time)}</dt><dd>${confirmed ? h`${esc(confirmed)} <small class="muted">(${esc(t.time_confirmed)})</small>` : h`${esc(t.time_ask)} <a href="${esc(ctx.url('pyetje'))}#faq-rezultatet">${esc(u.more)}</a>`}</dd></div>
        </dl>
        <p class="test-guide"><a class="link" href="${esc(ctx.url('pergatitja'))}">${esc(t.prep_guide)}${icon('arrow-right', { size: 16 })}</a></p>

        ${x.m?.length ? h`<h2 class="group-title" id="h-incl">${esc(t.includes)} <span class="muted">(${x.m.length})</span></h2>
        <ul class="test-comp">${x.m.map((m, i) => {
          const y = x.ml?.[i] && D.byId.get(x.ml[i]);
          return h`<li>${y ? h`<a href="${esc(ctx.url(testPath(y)))}">${esc(m)}${icon('arrow-right', { size: 14 })}</a>` : esc(m)}</li>`;
        })}</ul>` : ''}

        ${D.parents.has(x.id) ? h`<h2 class="group-title" id="h-in">${esc(t.included_in)}</h2>
        <ul class="pill-links">${D.parents.get(x.id).map((pid) => h`<li>${link(D.byId.get(pid))}</li>`)}</ul>` : ''}

        <p class="note">${icon('info', { size: 18 })}<span>${esc(t.info_note)}</span></p>
      </div>
    </div>
  </section>`;

  // Neighbours in the same category (A–Z), up to 8.
  const list = D.byCat.get(x.c[0]) ?? [];
  const at = list.indexOf(x.id);
  const near = [...list.slice(Math.max(0, at - 4), at), ...list.slice(at + 1, at + 5)].slice(0, 8).map((rid) => D.byId.get(rid));
  const related = near.length ? h`<section class="section section-tint" aria-labelledby="h-related">
    <div class="wrap">
      <h2 class="group-title" id="h-related">${esc(t.related.replace('{c}', cat))}</h2>
      <ul class="related-tests">${near.map((y) => h`<li><a href="${esc(ctx.url(testPath(y)))}"><span>${esc(y.n)}</span>${icon('arrow-right', { size: 16 })}</a></li>`)}</ul>
      <div class="actions test-actions">
        <a class="btn btn-outline" href="${esc(ctx.url('analizat'))}?kategoria=${esc(x.c[0])}">${esc(t.related_all.replace('{c}', cat))}${icon('arrow-right', { size: 18 })}</a>
        <a class="btn btn-ghost" href="${esc(ctx.url('analizat'))}">${icon('arrow-left', { size: 18 })}${esc(t.back)}</a>
      </div>
    </div>
  </section>` : '';

  const name = x.n;
  const description = x.d ? clip(x.d, 300) : `${name} ${t.desc_fallback}`;
  const pageLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    url: ctx.abs(testPath(x)),
    inLanguage: lang,
    about: { '@type': 'MedicalTest', name, alternateName: [...new Set(Object.values(x.o))].filter((n) => n !== name), description: x.d || undefined },
    publisher: { '@id': ctx.clinicId },
  };
  return {
    id: 'test',
    title: clip(`${name} — ${x.k ? t.title_panel : t.title_suffix} · ${SITE.name}`, 108),
    description: description.length >= 50 ? description : `${name} ${t.desc_fallback}`,
    jsonld: [hero.jsonld, pageLd],
    body: hero.html + about + related + ctaBand(ctx, { title: t.cta_title, text: t.cta_text }),
  };
}

export const TEST_ROUTES = CATALOGUE.entries.map((x) => [testPath(x), (ctx) => testPage(ctx, x.id)]);
