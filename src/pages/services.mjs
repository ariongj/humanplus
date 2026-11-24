import { SITE } from '../data/site.mjs';
import { SERVICES, LAB, SPECIALISTS } from '../data/services.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { SERVICE_PHOTOS } from '../data/photos.mjs';
import { pageHero, sectionHead, serviceCard, testRow, ctaBand, TEST_BY_ID } from '../lib/parts.mjs';

const T = dict('services', {
  sq: {
    title: 'Shërbimet — laboratori, pediatri, gjinekologji dhe endokrinologji',
    description: 'Laboratori i Human+ në Prishtinë — hematologji, biokimi, hormone, imunologji dhe mikrobiologji (parazitologji dhe mikologji) — dhe shërbimet specialistike: pediatri, gjinekologji dhe endokrinologji.',
    eyebrow: 'Shërbimet',
    h1: 'Laboratori dhe *shërbimet* specialistike.',
    lead: 'Mjekët specialistë dhe laboratori punojnë në të njëjtën ndërtesë — analizat që kërkon mjeku i bëni aty për aty, dhe rezultatet i shqyrtoni me të njëjtin ekip.',
    lab_group: 'Laboratori',
    lab_text: 'Pesë module, një laborator — mostra merret këtu në qendër.',
    doc_group: 'Shërbimet specialistike',
    doc_text: 'Mjekët specialistë punojnë në të njëjtën ndërtesë me laboratorin.',
    soon: 'Drejtime të tjera së shpejti',
    soon_text: 'Human+ po zgjerohet me drejtime të reja specialistike. Na pyesni për mjekun që ju nevojitet.',
    soon_cta: 'Na pyesni',
    tests_cat: 'Shiko në katalog',
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
    title: 'Services — laboratory, paediatrics, gynaecology and endocrinology',
    description: 'The Human+ laboratory in Prishtina — haematology, biochemistry, hormones, immunology and microbiology (parasitology and mycology) — and the specialist services: paediatrics, gynaecology and endocrinology.',
    eyebrow: 'Services',
    h1: 'Laboratory and *specialist* services.',
    lead: 'Specialists and the laboratory work in the same building — the tests your doctor asks for are done on the spot, and you go through the results with the same team.',
    lab_group: 'Laboratory',
    lab_text: 'Five modules, one laboratory — samples are taken here at the centre.',
    doc_group: 'Specialist services',
    doc_text: 'The specialists work in the same building as the laboratory.',
    soon: 'More specialties coming',
    soon_text: 'Human+ is adding further specialties. Ask us about the doctor you need.',
    soon_cta: 'Ask us',
    tests_cat: 'See them in the catalogue',
    cta_title: 'Not sure which *specialist* you need?',
    cta_text: 'Call or message us — we will point you to the right doctor or test.',
    what: 'What we offer',
    tests: 'Frequently requested tests',
    tests_text: 'Add them to your list and send it to us — we will tell you the price and how to prepare.',
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
    title: 'Leistungen — Labor, Kinderheilkunde, Gynäkologie und Endokrinologie',
    description: 'Das Labor von Human+ in Prishtina — Hämatologie, Biochemie, Hormone, Immunologie und Mikrobiologie (Parasitologie und Mykologie) — und die fachärztlichen Leistungen: Kinderheilkunde, Gynäkologie und Endokrinologie.',
    eyebrow: 'Leistungen',
    h1: 'Labor und *fachärztliche* Leistungen.',
    lead: 'Fachärzte und Labor arbeiten im selben Gebäude — die Analysen, die Ihr Arzt anordnet, werden direkt vor Ort durchgeführt, und die Ergebnisse besprechen Sie mit demselben Team.',
    lab_group: 'Labor',
    lab_text: 'Fünf Bereiche, ein Labor — die Proben werden hier im Zentrum entnommen.',
    doc_group: 'Fachärztliche Leistungen',
    doc_text: 'Die Fachärzte arbeiten im selben Gebäude wie das Labor.',
    soon: 'Weitere Fachrichtungen folgen',
    soon_text: 'Human+ erweitert sein Angebot um weitere Fachrichtungen. Fragen Sie uns nach dem Arzt, den Sie brauchen.',
    soon_cta: 'Fragen Sie uns',
    tests_cat: 'Im Katalog ansehen',
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

const isLab = (s) => s.group === 'lab';

/** The card that closes the specialist group: more specialties are coming (the clinic's own words). */
export function soonCard(ctx) {
  const t = T[ctx.lang];
  return h`<li class="svc svc-soon reveal"><div class="svc-soon-in">
    <span class="svc-top"><span class="tile">${icon('sparkles', { size: 26 })}</span></span>
    <h3>${esc(t.soon)}</h3>
    <p>${esc(t.soon_text)}</p>
    <a class="svc-more" href="${esc(ctx.url('kontakt'))}">${esc(t.soon_cta)}${icon('arrow-right', { size: 18 })}</a>
  </div></li>`;
}

/** The two groups — Laboratori (its modules) and the specialist services — as on /sherbimet/ and the home page. */
export function serviceGroups(ctx, { extra = '', heading = 'h2' } = {}) {
  const t = T[ctx.lang];
  // the grid takes as many columns as the group has cards (up to five), so no row is left half empty
  const group = (id, title, text, list, more = []) => h`<div class="svc-group" id="${id}">
    <div class="svc-group-head"><${heading} class="group-title">${esc(title)}</${heading}><p>${esc(text)}</p></div>
    <ul class="svc-grid svc-grid-${Math.min(list.length + more.length, 5)}">${list.map((s, i) => serviceCard(ctx, s, i))}${more.join('')}</ul>
  </div>`;
  return group('laboratori', t.lab_group, t.lab_text, LAB) + group('specialistet', t.doc_group, t.doc_text, SPECIALISTS, [soonCard(ctx), ...(extra ? [extra] : [])]);
}

export function servicesPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const hero = pageHero(ctx, { trail: [[UI[lang].nav_services, 'sherbimet']], eyebrow: t.eyebrow, title: t.h1, lead: t.lead, photo: 'consult' });
  return {
    id: 'services',
    title: `${t.title} · ${SITE.name}`,
    description: t.description,
    jsonld: [hero.jsonld],
    body: hero.html + h`<section class="section section-tight"><div class="wrap svc-groups">${serviceGroups(ctx)}</div></section>` + ctaBand(ctx, { title: t.cta_title, text: t.cta_text }),
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
    eyebrow: isLab(s) ? T[lang].lab_group : T[lang].doc_group,
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
          <a class="btn btn-outline" href="${esc(ctx.url('analizat'))}${s.cat ? `?kategoria=${s.cat}` : ''}">${esc(s.cat ? t.tests_cat : t.tests_all)}${icon('arrow-right', { size: 18 })}</a>
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
