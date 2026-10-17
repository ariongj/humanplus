import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { SERVICE_PHOTOS } from '../data/photos.mjs';
import { pageHero, sectionHead, serviceCard, testRow, ctaBand, TEST_BY_ID } from '../lib/parts.mjs';

const T = dict('services', {
  sq: {
    title: 'Shërbimet — pediatri, gjinekologji, laborator dhe specialistë',
    description: 'Shtatë shërbime në Human+ Prishtinë: pediatri, gjinekologji, laborator biokimik, hematologjik dhe mikrobiologjik, mjekësi familjare, endokrinologji, suplemente dhe nutricion.',
    eyebrow: 'Shërbimet',
    h1: 'Shtatë shërbime, *një* qendër.',
    lead: 'Mjekët specialistë dhe laboratori punojnë në të njëjtën ndërtesë — analizat që kërkon mjeku i bëni aty për aty, dhe rezultatet i shqyrtoni me të njëjtin ekip.',
    lab_group: 'Laboratori',
    doc_group: 'Mjekët specialistë',
    cta_title: 'Nuk e dini cilin *specialist* ju duhet?',
    cta_text: 'Na telefononi ose na shkruani — ju drejtojmë te mjeku ose analiza e duhur.',
    // detail
    what: 'Çfarë ofrojmë',
    tests: 'Analizat që kërkohen shpesh',
    tests_text: 'Shtojini në listë dhe na e dërgoni — ju tregojmë çmimin dhe përgatitjen.',
    tests_all: 'Të gjitha analizat',
    others: 'Shërbime të tjera',
    book_this: 'Rezervo termin',
    ask: 'Pyet në WhatsApp',
    aside_title: 'Rezervoni ose pyetni',
    aside_text: 'Recepsioni ju kthen përgjigje dhe e konfirmon orën.',
    detail_desc_suffix: 'në Human+ Qendra Diagnostike, Prishtinë.',
    wa_msg: 'Përshëndetje Human+! Kam një pyetje për shërbimin:',
  },
  en: {
    title: 'Services — paediatrics, gynaecology, laboratory and specialists',
    description: 'Seven services at Human+ Prishtina: paediatrics, gynaecology, biochemistry, haematology and microbiology laboratory, family medicine, endocrinology, supplements and nutrition.',
    eyebrow: 'Services',
    h1: 'Seven services, *one* centre.',
    lead: 'Specialists and the laboratory work in the same building — the tests your doctor asks for are done on the spot, and you go through the results with the same team.',
    lab_group: 'Laboratory',
    doc_group: 'Specialists',
    cta_title: 'Not sure which *specialist* you need?',
    cta_text: 'Call or message us — we point you to the right doctor or test.',
    what: 'What we offer',
    tests: 'Tests often requested',
    tests_text: 'Add them to your list and send it to us — we tell you the price and how to prepare.',
    tests_all: 'All lab tests',
    others: 'Other services',
    book_this: 'Book an appointment',
    ask: 'Ask on WhatsApp',
    aside_title: 'Book or ask',
    aside_text: 'Reception replies and confirms the time.',
    detail_desc_suffix: 'at Human+ Diagnostic Centre, Prishtina.',
    wa_msg: 'Hello Human+! I have a question about:',
  },
  de: {
    title: 'Leistungen — Kinderheilkunde, Gynäkologie, Labor und Fachärzte',
    description: 'Sieben Leistungen bei Human+ Prishtina: Kinderheilkunde, Gynäkologie, Labor für Biochemie, Hämatologie und Mikrobiologie, Allgemeinmedizin, Endokrinologie, Nahrungsergänzung und Ernährung.',
    eyebrow: 'Leistungen',
    h1: 'Sieben Leistungen, *ein* Zentrum.',
    lead: 'Fachärzte und Labor arbeiten im selben Gebäude — die Analysen, die Ihr Arzt anordnet, werden direkt vor Ort durchgeführt, und die Ergebnisse besprechen Sie mit demselben Team.',
    lab_group: 'Labor',
    doc_group: 'Fachärzte',
    cta_title: 'Unsicher, welchen *Facharzt* Sie brauchen?',
    cta_text: 'Rufen Sie an oder schreiben Sie uns — wir helfen Ihnen, den richtigen Arzt oder die passende Analyse zu finden.',
    what: 'Unser Angebot',
    tests: 'Häufig angeforderte Analysen',
    tests_text: 'Fügen Sie sie Ihrer Liste hinzu und senden Sie uns die Liste — wir nennen Ihnen den Preis und sagen Ihnen, wie Sie sich vorbereiten.',
    tests_all: 'Alle Laboranalysen',
    others: 'Weitere Leistungen',
    book_this: 'Termin buchen',
    ask: 'Auf WhatsApp fragen',
    aside_title: 'Buchen oder fragen',
    aside_text: 'Die Rezeption antwortet Ihnen und bestätigt die Uhrzeit.',
    detail_desc_suffix: 'im Human+ Diagnostikzentrum, Prishtina.',
    wa_msg: 'Hallo Human+! Ich habe eine Frage zur Leistung:',
  },
});

const isLab = (s) => s.slug.startsWith('laboratori');

export function servicesPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const hero = pageHero(ctx, { trail: [[UI[lang].nav_services, 'sherbimet']], eyebrow: t.eyebrow, title: t.h1, lead: t.lead, photo: 'consult' });
  // the grid takes as many columns as the group has cards (up to five), so no row is left half empty
  const group = (title, list, offset) => h`<section class="section section-tight" aria-label="${esc(title)}">
    <div class="wrap">
      <h2 class="group-title">${esc(title)}</h2>
      <ul class="svc-grid svc-grid-${Math.min(list.length, 5)}">${list.map((s, i) => serviceCard(ctx, s, offset + i))}</ul>
    </div>
  </section>`;
  const docs = SERVICES.filter((s) => !isLab(s));
  const labs = SERVICES.filter(isLab);
  return {
    id: 'services',
    title: `${t.title} · ${SITE.name}`,
    description: t.description,
    jsonld: [hero.jsonld],
    body: hero.html + group(t.doc_group, docs, 0) + group(t.lab_group, labs, docs.length) + ctaBand(ctx, { title: t.cta_title, text: t.cta_text }),
  };
}

export function servicePage(ctx, s) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const name = L(s.name, lang);
  const book = `${ctx.url('rezervo')}?sherbimi=${s.slug}`;
  const aside = h`<div class="aside-card sticky">
    <span class="tile tile-${s.tone} tile-lg">${icon(s.icon, { size: 34 })}</span>
    <h2>${esc(t.aside_title)}</h2>
    <p>${esc(t.aside_text)}</p>
    <a class="btn btn-primary btn-block" href="${esc(book)}">${icon('calendar-check', { size: 18 })}${esc(t.book_this)}</a>
    <a class="btn btn-wa btn-block" href="${esc(ctx.wa(`${t.wa_msg} ${name}.`))}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(t.ask)}</a>
    <a class="btn btn-outline btn-block" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 18 })}${esc(SITE.phones[0].display)}</a>
  </div>`;
  const hero = pageHero(ctx, {
    trail: [[u.nav_services, 'sherbimet'], [name, `sherbim/${s.slug}`]],
    eyebrow: isLab(s) ? T[lang].lab_group : u.nav_services,
    title: name,
    lead: L(s.intro, lang),
    photo: [`sherbim-${s.slug}`, SERVICE_PHOTOS[s.slug]],
  });
  const items = h`<section class="section section-tight" aria-labelledby="h-what">
    <div class="wrap svc-layout">
      <div>
        ${sectionHead({ eyebrow: name, title: t.what, id: 'h-what' })}
        <ul class="ticks ticks-cards">${L(s.items, lang).map((it) => h`<li class="reveal">${icon('circle-check', { size: 22 })}<span>${esc(it)}</span></li>`)}</ul>
        ${s.note && h`<p class="note">${icon('info', { size: 18 })}<span>${esc(L(s.note, lang))}</span></p>`}
      </div>
      <aside class="svc-aside">${aside}</aside>
    </div>
  </section>`;
  const tests = s.tests?.length
    ? h`<section class="section section-tint" aria-labelledby="h-tests">
      <div class="wrap">
        <div class="split-head">
          ${sectionHead({ eyebrow: u.nav_tests, title: t.tests, text: t.tests_text, id: 'h-tests' })}
          <a class="btn btn-outline" href="${esc(ctx.url('analizat'))}">${esc(t.tests_all)}${icon('arrow-right', { size: 18 })}</a>
        </div>
        <ul class="tests tests-cards">${s.tests.map((id) => testRow(ctx, TEST_BY_ID.get(id)))}</ul>
      </div>
    </section>`
    : '';
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 9);
  const more = h`<section class="section" aria-labelledby="h-others">
    <div class="wrap">
      <h2 class="group-title" id="h-others">${esc(t.others)}</h2>
      <ul class="pill-links">${others.map((x) => h`<li><a href="${esc(ctx.url(`sherbim/${x.slug}`))}"><span class="tile tile-${x.tone} tile-sm">${icon(x.icon, { size: 16 })}</span>${esc(L(x.nameShort ?? x.name, lang))}</a></li>`)}</ul>
    </div>
  </section>`;
  const svcLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    url: ctx.abs(`sherbim/${s.slug}`),
    inLanguage: lang,
    about: { '@type': 'Thing', name },
    provider: { '@id': ctx.clinicId },
  };
  return {
    id: 'service',
    title: `${name} · ${SITE.fullName}`,
    description: `${L(s.short, lang)} ${name} ${t.detail_desc_suffix}`,
    jsonld: [hero.jsonld, svcLd],
    body: hero.html + items + tests + more + ctaBand(ctx, { title: T[lang].cta_title, text: T[lang].cta_text }),
  };
}
