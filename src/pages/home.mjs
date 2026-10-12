import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { PANELS } from '../data/tests.mjs';
import { CATALOGUE, CATALOGUE_ROUND } from './catalogue.mjs';
import { FAQ } from '../data/faq.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L, accent } from '../lib/html.mjs';
import { hoursTable, status } from '../lib/layout.mjs';
import { labBackground } from '../lib/labbg.mjs';
import { sectionHead, serviceCard, panelCard, testSearch, ctaBand, faqList, shortName, centreGallery, miniMap } from '../lib/parts.mjs';
import { photo } from '../lib/photo.mjs';

const T = dict('home', {
  sq: {
    title: 'Human+ Qendra Diagnostike — laborator, pediatri dhe specialistë në Prishtinë',
    description: 'Human+ në Prishtinë që nga viti 2011: laborator biokimik, hematologjik dhe mikrobiologjik, pediatri, gjinekologji dhe specialistë. Kërkoni analizat, rezervoni termin, na shkruani në WhatsApp.',
    eyebrow: 'Qendra Diagnostike · Prishtinë · që nga 2011',
    h1: 'Diagnozë e saktë, kujdes *njerëzor*.',
    lead: 'Laborator i plotë, pediatri, gjinekologji dhe specialistë nën një çati. Kërkoni analizën që ju duhet, shikoni si të përgatiteni dhe rezervoni termin — në pak minuta.',
    popular: 'Të kërkuara shpesh:',
    stat1: 'viti i themelimit',
    stat2: 'shërbime nën një çati',
    stat3: 'analiza në katalog',
    stat4: 'ditë në javë hapur',
    q1_t: 'Rezervo termin',
    q1_d: 'Zgjidhni shërbimin, ditën dhe orën.',
    q2_t: 'Kërko analizat',
    q2_d: 'Krijoni listën tuaj dhe pyetni për çmimin.',
    q3_t: 'Paketat check-up',
    q3_d: 'Analizat e grupuara sipas nevojës.',
    q4_t: 'Përgatitja',
    q4_d: 'Esëll apo jo? Si merret mostra?',
    svc_eyebrow: 'Shërbimet',
    svc_title: 'Një qendër, *dhjetë* shërbime.',
    svc_text: 'Nga kontrolli i parë i fëmijës deri te analizat hormonale dhe kulturat mikrobiologjike — mjekët dhe laboratori punojnë së bashku, në të njëjtën ndërtesë.',
    lab_eyebrow: 'Laboratori',
    lab_title: 'Laboratori ynë, *vazhdimësi* e BAKTOLAB.',
    lab_text: 'Analizat biokimike, hematologjike dhe mikrobiologjike bëhen këtu në qendër. Kërkoni një analizë, shtojeni në listë dhe na e dërgoni për çmimin dhe terminin.',
    lab_all: 'Shiko të gjitha analizat',
    pan_eyebrow: 'Paketat',
    pan_title: 'Check-up i menduar *për ju*.',
    pan_text: 'Analizat që shkojnë bashkë, të grupuara sipas moshës dhe nevojës. Shtojeni paketën në listë ose pyetni për çmimin në WhatsApp.',
    pan_all: 'Të gjitha paketat ({n})',
    pan_more: 'Edhe paketa për:',
    ped_eyebrow: 'Pediatri',
    ped_title: 'Shëndeti i fëmijës suaj — *prioriteti ynë*.',
    ped_text: 'Që nga viti 2011 kemi qenë pranë mijëra prindërve dhe fëmijëve. Pediatri dhe laborator në të njëjtin vend: më pak pritje, më pak stres për fëmijën.',
    ped_cta: 'Rezervo te pediatri',
    ped_more: 'Rreth pediatrisë',
    ped_panel: 'Check-up për fëmijë',
    since_t: 'Që nga 2011',
    since_d: 'vazhdimësi e BAKTOLAB',
    call: 'Telefononi',
    in_eyebrow: 'Qendra',
    in_title: 'Mjekë dhe laborator *nën një çati*.',
    in_text: 'Nga recepsioni te marrja e mostrës, laboratori dhe ordinancat e specialistëve — gjithçka në të njëjtën ndërtesë në Rruga B, pa u endur nga një adresë te tjetra.',
    in_about: 'Rreth qendrës',
    how_eyebrow: 'Si funksionon',
    how_title: 'Tre hapa, *pa pritje* të panevojshme.',
    how1_t: 'Rezervoni',
    how1_d: 'Me telefon, në WhatsApp ose online. Recepsioni ju kthen përgjigje dhe e konfirmon orën.',
    how2_t: 'Përgatituni',
    how2_d: 'Shikoni nëse duhet të vini esëll dhe si merret mostra. Sillni dokumentin dhe analizat e mëparshme.',
    how3_t: 'Vizita dhe rezultatet',
    how3_d: 'Mjeku ju viziton ose merret mostra. Stafi ju tregon kur dhe si i merrni rezultatet.',
    how3_link: 'Kur merren rezultatet?',
    visit_eyebrow: 'Na vizitoni',
    visit_title: 'Në Rruga B, *Prishtinë*.',
    visit_text: 'Gjashtë ditë në javë, nga ora 07:30 — që të vini para punës ose shkollës.',
    visit_map: 'Hap hartën',
    visit_write: 'Na shkruani',
    faq_eyebrow: 'Pyetje',
    faq_title: 'Pyetjet që na bëni *më shpesh*.',
    faq_all: 'Të gjitha pyetjet',
    cta_title: 'Keni një pyetje për një *analizë*?',
    cta_text: 'Na shkruani në WhatsApp ose na telefononi — ju tregojmë çmimin, përgatitjen dhe orën më të përshtatshme.',
  },
  en: {
    title: 'Human+ Diagnostic Centre — laboratory, paediatrics and specialists in Prishtina',
    description: 'Human+ in Prishtina since 2011: biochemistry, haematology and microbiology laboratory, paediatrics, gynaecology and specialists. Find your tests, book an appointment, message us on WhatsApp.',
    eyebrow: 'Diagnostic Centre · Prishtina · since 2011',
    h1: 'Precise diagnosis, *human* care.',
    lead: 'A full laboratory, paediatrics, gynaecology and specialists under one roof. Find the test you need, see how to prepare and book an appointment — in a few minutes.',
    popular: 'Often searched:',
    stat1: 'year founded',
    stat2: 'services under one roof',
    stat3: 'tests in the catalogue',
    stat4: 'days a week open',
    q1_t: 'Book an appointment',
    q1_d: 'Choose the service, day and time.',
    q2_t: 'Find lab tests',
    q2_d: 'Build your list and ask for the price.',
    q3_t: 'Check-ups',
    q3_d: 'Tests grouped by need.',
    q4_t: 'Preparation',
    q4_d: 'Fasting or not? How is the sample taken?',
    svc_eyebrow: 'Services',
    svc_title: 'One centre, *ten* services.',
    svc_text: 'From a child’s first check-up to hormone tests and microbiology cultures — doctors and laboratory work together, in the same building.',
    lab_eyebrow: 'Laboratory',
    lab_title: 'Our laboratory, *continuing* BAKTOLAB.',
    lab_text: 'Biochemistry, haematology and microbiology tests are done here at the centre. Find a test, add it to your list and send it to us for the price and a time.',
    lab_all: 'See all lab tests',
    pan_eyebrow: 'Check-ups',
    pan_title: 'Check-ups made *for you*.',
    pan_text: 'Tests that belong together, grouped by age and need. Add a check-up to your list or ask for the price on WhatsApp.',
    pan_all: 'All check-ups ({n})',
    pan_more: 'Also check-ups for:',
    ped_eyebrow: 'Paediatrics',
    ped_title: 'Your child’s health — *our priority*.',
    ped_text: 'Since 2011 we have looked after thousands of parents and children. Paediatrics and laboratory in one place: less waiting, less stress for your child.',
    ped_cta: 'Book with a paediatrician',
    ped_more: 'About paediatrics',
    ped_panel: 'Children’s check-up',
    since_t: 'Since 2011',
    since_d: 'continuing BAKTOLAB',
    call: 'Call',
    in_eyebrow: 'The centre',
    in_title: 'Doctors and laboratory *under one roof*.',
    in_text: 'From reception to sample collection, the laboratory and the specialists’ rooms — all in the same building on Rruga B, with no going from one address to another.',
    in_about: 'About the centre',
    how_eyebrow: 'How it works',
    how_title: 'Three steps, *no needless* waiting.',
    how1_t: 'Book',
    how1_d: 'By phone, on WhatsApp or online. Reception replies and confirms the time.',
    how2_t: 'Prepare',
    how2_d: 'Check whether to come fasting and how the sample is taken. Bring your ID and earlier results.',
    how3_t: 'Visit and results',
    how3_d: 'The doctor sees you or the sample is taken. The staff tell you when and how to collect your results.',
    how3_link: 'When are results ready?',
    visit_eyebrow: 'Visit us',
    visit_title: 'On Rruga B, *Prishtina*.',
    visit_text: 'Six days a week, from 07:30 — so you can come before work or school.',
    visit_map: 'Open the map',
    visit_write: 'Write to us',
    faq_eyebrow: 'Questions',
    faq_title: 'The questions you ask us *most*.',
    faq_all: 'All questions',
    cta_title: 'A question about a *test*?',
    cta_text: 'Message us on WhatsApp or call — we tell you the price, how to prepare and the best time to come.',
  },
  de: {
    title: 'Human+ Diagnostikzentrum — Labor, Kinderheilkunde und Fachärzte in Prishtina',
    description: 'Human+ in Prishtina seit 2011: Labor für Biochemie, Hämatologie und Mikrobiologie, Kinderheilkunde, Gynäkologie und Fachärzte. Finden Sie Ihre Analysen, buchen Sie einen Termin, schreiben Sie uns auf WhatsApp.',
    eyebrow: 'Diagnostikzentrum · Prishtina · seit 2011',
    h1: 'Präzise Diagnose, *menschliche* Betreuung.',
    lead: 'Ein vollständiges Labor, Kinderheilkunde, Gynäkologie und Fachärzte unter einem Dach. Finden Sie die Analyse, die Sie brauchen, sehen Sie, wie Sie sich vorbereiten, und buchen Sie einen Termin — in wenigen Minuten.',
    popular: 'Oft gesucht:',
    stat1: 'Gründungsjahr',
    stat2: 'Leistungen unter einem Dach',
    stat3: 'Analysen im Katalog',
    stat4: 'Tage pro Woche geöffnet',
    q1_t: 'Termin buchen',
    q1_d: 'Wählen Sie Leistung, Tag und Uhrzeit.',
    q2_t: 'Laboranalysen finden',
    q2_d: 'Erstellen Sie Ihre Liste und fragen Sie nach dem Preis.',
    q3_t: 'Check-ups',
    q3_d: 'Analysen nach Bedarf zusammengestellt.',
    q4_t: 'Vorbereitung',
    q4_d: 'Nüchtern oder nicht? Wie wird die Probe entnommen?',
    svc_eyebrow: 'Leistungen',
    svc_title: 'Ein Zentrum, *zehn* Leistungen.',
    svc_text: 'Von der ersten Untersuchung Ihres Kindes bis zu Hormonanalysen und mikrobiologischen Kulturen — Ärzte und Labor arbeiten zusammen, im selben Gebäude.',
    lab_eyebrow: 'Labor',
    lab_title: 'Unser Labor, die *Fortführung* von BAKTOLAB.',
    lab_text: 'Biochemische, hämatologische und mikrobiologische Analysen werden hier im Zentrum durchgeführt. Finden Sie eine Analyse, fügen Sie sie Ihrer Liste hinzu und senden Sie sie uns für Preis und Termin.',
    lab_all: 'Alle Analysen ansehen',
    pan_eyebrow: 'Check-ups',
    pan_title: 'Check-ups, *für Sie* zusammengestellt.',
    pan_text: 'Analysen, die zusammengehören, nach Alter und Bedarf gruppiert. Fügen Sie ein Check-up Ihrer Liste hinzu oder fragen Sie auf WhatsApp nach dem Preis.',
    pan_all: 'Alle Check-ups ({n})',
    pan_more: 'Außerdem Check-ups für:',
    ped_eyebrow: 'Kinderheilkunde',
    ped_title: 'Die Gesundheit Ihres Kindes — *unsere Priorität*.',
    ped_text: 'Seit 2011 haben wir Tausende Eltern und Kinder begleitet. Kinderheilkunde und Labor an einem Ort: weniger Warten, weniger Stress für Ihr Kind.',
    ped_cta: 'Kinderarzttermin buchen',
    ped_more: 'Über die Kinderheilkunde',
    ped_panel: 'Check-up für Kinder',
    since_t: 'Seit 2011',
    since_d: 'Fortführung von BAKTOLAB',
    call: 'Anrufen',
    in_eyebrow: 'Das Zentrum',
    in_title: 'Ärzte und Labor *unter einem Dach*.',
    in_text: 'Vom Empfang über die Probenentnahme bis zum Labor und den Sprechzimmern der Fachärzte — alles im selben Gebäude in der Rruga B, ohne Wege von einer Adresse zur nächsten.',
    in_about: 'Über das Zentrum',
    how_eyebrow: 'So funktioniert es',
    how_title: 'Drei Schritte, *ohne unnötiges* Warten.',
    how1_t: 'Buchen',
    how1_d: 'Telefonisch, per WhatsApp oder online. Der Empfang antwortet Ihnen und bestätigt die Uhrzeit.',
    how2_t: 'Vorbereiten',
    how2_d: 'Prüfen Sie, ob Sie nüchtern kommen sollen und wie die Probe entnommen wird. Bringen Sie Ihren Ausweis und frühere Befunde mit.',
    how3_t: 'Besuch und Ergebnisse',
    how3_d: 'Der Arzt untersucht Sie, oder die Probe wird entnommen. Das Team sagt Ihnen, wann und wie Sie Ihre Ergebnisse erhalten.',
    how3_link: 'Wann liegen die Ergebnisse vor?',
    visit_eyebrow: 'Besuchen Sie uns',
    visit_title: 'In der Rruga B, *Prishtina*.',
    visit_text: 'Sechs Tage pro Woche, ab 07:30 Uhr — damit Sie vor der Arbeit oder der Schule kommen können.',
    visit_map: 'Karte öffnen',
    visit_write: 'Schreiben Sie uns',
    faq_eyebrow: 'Fragen',
    faq_title: 'Die Fragen, die Sie uns *am häufigsten* stellen.',
    faq_all: 'Alle Fragen',
    cta_title: 'Eine Frage zu einer *Analyse*?',
    cta_text: 'Schreiben Sie uns auf WhatsApp oder rufen Sie an — wir nennen Ihnen den Preis, die Vorbereitung und die beste Zeit für Ihren Besuch.',
  },
});

const POPULAR = ['cbc', 'vitd', 'tsh', 'glucose', 'ferritin'];

export function homePage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const openDays = Object.values(SITE.hours).filter(Boolean).length;

  const hero = h`<section class="hero">
    ${labBackground('hero')}
    <div class="wrap hero-in">
      <div class="hero-text">
        <p class="eyebrow">${esc(t.eyebrow)}</p>
        <h1>${accent(t.h1)}</h1>
        <p class="lead">${esc(t.lead)}</p>
        ${testSearch(ctx, { id: 'hero-q', big: true })}
        <p class="popular"><span>${esc(t.popular)}</span>${POPULAR.map((id) => {
          const label = shortName(id, lang);
          return h`<a class="chip chip-link" href="${esc(ctx.url('analizat'))}?q=${encodeURIComponent(label)}">${esc(label)}</a>`;
        })}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 20 })}${esc(u.book)}</a>
          <a class="btn btn-outline btn-lg" href="${esc(ctx.url('sherbimet'))}">${esc(u.all_services)}${icon('arrow-right', { size: 20 })}</a>
        </div>
      </div>
      <div class="hero-visual">
        ${photo(ctx, 'hero', { cls: 'hero-photo', eager: true, sizes: '(min-width: 960px) 42vw, 100vw' })}
        ${photo(ctx, 'lab', { cls: 'hero-photo-sm', sizes: '(min-width: 960px) 16vw, 40vw' })}
        <div class="hero-card hero-card-status">
          ${status(lang)}
          <a href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 16 })}<span><span class="sr-only">${esc(t.call)}: </span>${esc(SITE.phones[0].display)}</span></a>
        </div>
        <p class="hero-card hero-card-since"><span class="tile tile-brand">${icon('microscope', { size: 20 })}</span><span><strong>${esc(t.since_t)}</strong><small>${esc(t.since_d)}</small></span></p>
      </div>
    </div>
  </section>`;

  const quick = h`<section class="quick" aria-label="${esc(u.nav_main)}">
    <div class="wrap">
      <ul class="quick-grid">
        ${[
          ['rezervo', 'calendar-check', t.q1_t, t.q1_d, 'brand'],
          ['analizat', 'search', t.q2_t, t.q2_d, 'sky'],
          ['paketat', 'clipboard-list', t.q3_t, t.q3_d, 'mint'],
          ['pergatitja', 'info', t.q4_t, t.q4_d, 'sun'],
        ].map(
          ([path, ic, title, d, tone]) => h`<li class="reveal"><a class="quick-card" href="${esc(ctx.url(path))}">
            <span class="tile tile-${tone}">${icon(ic, { size: 22 })}</span>
            <span class="quick-text"><strong>${esc(title)}</strong><span>${esc(d)}</span></span>
            ${icon('arrow-up-right', { size: 20, cls: 'quick-arrow' })}
          </a></li>`,
        )}
      </ul>
      <ul class="stats">
        <li><strong>${SITE.founded}</strong><span>${esc(t.stat1)}</span></li>
        <li><strong>${SERVICES.length}</strong><span>${esc(t.stat2)}</span></li>
        <li><strong>${CATALOGUE_ROUND.toLocaleString(lang === 'en' ? 'en-GB' : 'de-DE').replace('.', '\u202f')}+</strong><span>${esc(t.stat3)}</span></li>
        <li><strong>${openDays}</strong><span>${esc(t.stat4)}</span></li>
      </ul>
    </div>
  </section>`;

  const services = h`<section class="section" aria-labelledby="h-svc">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ eyebrow: t.svc_eyebrow, title: t.svc_title, text: t.svc_text, id: 'h-svc' })}
        <a class="btn btn-outline" href="${esc(ctx.url('sherbimet'))}">${esc(u.all_services)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      <ul class="svc-grid">${SERVICES.map((s, i) => serviceCard(ctx, s, i))}</ul>
    </div>
  </section>`;

  const inside = h`<section class="section section-tint" aria-labelledby="h-inside">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ eyebrow: t.in_eyebrow, title: t.in_title, text: t.in_text, id: 'h-inside' })}
        <a class="btn btn-outline" href="${esc(ctx.url('rreth-nesh'))}">${esc(t.in_about)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      ${centreGallery(ctx)}
    </div>
  </section>`;

  const lab = h`<section class="section section-brand" aria-labelledby="h-lab">
    ${labBackground('band')}
    <div class="wrap lab-in">
      <div class="lab-text">
        ${sectionHead({ eyebrow: t.lab_eyebrow, title: t.lab_title, text: t.lab_text, id: 'h-lab' })}
        ${testSearch(ctx, { id: 'lab-q', landmark: false })}
        <a class="btn btn-light" href="${esc(ctx.url('analizat'))}">${icon('test-tubes', { size: 18 })}${esc(t.lab_all)} (${CATALOGUE.count})</a>
      </div>
      <ul class="lab-areas">
        ${['biokimi', 'imunokimi', 'mikrobiologji', 'alergologji', 'serologji', 'hematologji', 'gjenetike-pcr', 'hormone-seksuale']
          .map((id) => CATALOGUE.categories.find((c) => c.id === id))
          .filter(Boolean)
          .map(
            (c) => h`<li class="reveal"><a class="lab-area" href="${esc(ctx.url('analizat'))}?kategoria=${c.id}">
              ${icon(c.icon, { size: 22 })}
              <span class="lab-area-name">${esc(c[lang] ?? c.en)}</span>
              <span class="lab-area-count">${c.count}</span>
            </a></li>`,
          )}
      </ul>
    </div>
  </section>`;

  const HOME_PANELS = ['baze', 'femije', 'grua', 'burre'];
  const panels = h`<section class="section" aria-labelledby="h-pan">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ eyebrow: t.pan_eyebrow, title: t.pan_title, text: t.pan_text, id: 'h-pan' })}
        <a class="btn btn-outline" href="${esc(ctx.url('paketat'))}">${esc(t.pan_all.replace('{n}', PANELS.length))}${icon('arrow-right', { size: 18 })}</a>
      </div>
      <div class="panel-grid">${HOME_PANELS.map((id) => panelCard(ctx, PANELS.find((p) => p.id === id)))}</div>
      <div class="panel-more"><span>${esc(t.pan_more)}</span><ul>${PANELS.filter((p) => !HOME_PANELS.includes(p.id)).map((p) => h`<li><a class="chip chip-link" href="${esc(ctx.url('paketat'))}#paketa-${p.id}">${esc(L(p.name, lang))}</a></li>`)}</ul></div>
    </div>
  </section>`;

  const ped = SERVICES.find((s) => s.slug === 'pediatri');
  const kids = h`<section class="section section-tint" aria-labelledby="h-ped">
    <div class="wrap ped-in">
      <div class="ped-visual reveal">
        ${photo(ctx, 'pediatrics', { cls: 'ped-photo', sizes: '(min-width: 960px) 45vw, 100vw' })}
        <a class="ped-float" href="${esc(ctx.url('paketat'))}#paketa-femije">
          <span class="tile tile-sun">${icon('baby', { size: 22 })}</span>
          <span><strong>${esc(t.ped_panel)}</strong><small>${esc(['cbc', 'ferritin', 'vitd', 'b12'].map((id) => shortName(id, lang)).join(' · '))}</small></span>
          ${icon('arrow-right', { size: 18 })}
        </a>
      </div>
      <div>
        ${sectionHead({ eyebrow: t.ped_eyebrow, title: t.ped_title, text: t.ped_text, id: 'h-ped' })}
        <ul class="ticks">${L(ped.items, lang).map((it) => h`<li>${icon('circle-check', { size: 20 })}<span>${esc(it)}</span></li>`)}</ul>
        <div class="actions">
          <a class="btn btn-primary" href="${esc(ctx.url('rezervo'))}?sherbimi=pediatri">${icon('calendar-check', { size: 18 })}${esc(t.ped_cta)}</a>
          <a class="btn btn-ghost" href="${esc(ctx.url('sherbim/pediatri'))}">${esc(t.ped_more)}${icon('arrow-right', { size: 18 })}</a>
        </div>
      </div>
    </div>
  </section>`;

  const how = h`<section class="section" aria-labelledby="h-how">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.how_eyebrow, title: t.how_title, id: 'h-how', center: true })}
      <ol class="steps">
        ${[
          ['calendar-check', t.how1_t, t.how1_d, 'rezervo'],
          ['clipboard-list', t.how2_t, t.how2_d, 'pergatitja'],
          ['stethoscope', t.how3_t, t.how3_d, 'pyetje#faq-rezultatet'],
        ].map(
          ([ic, title, d, path], i) => h`<li class="step reveal">
            <span class="step-num">${String(i + 1).padStart(2, '0')} <span>/ 03</span></span>
            <span class="tile tile-brand">${icon(ic, { size: 24 })}</span>
            <h3>${esc(title)}</h3>
            <p>${esc(d)}</p>
            <a class="link" href="${esc(path.includes('#') ? ctx.url(path.split('#')[0]) + '#' + path.split('#')[1] : ctx.url(path))}">${esc([u.book, u.prep_link, t.how3_link][i])}${icon('arrow-right', { size: 16 })}</a>
          </li>`,
        )}
      </ol>
    </div>
  </section>`;

  const visit = h`<section class="section section-tint" aria-labelledby="h-visit">
    <div class="wrap visit-in">
      <div>
        ${sectionHead({ eyebrow: t.visit_eyebrow, title: t.visit_title, text: t.visit_text, id: 'h-visit' })}
        <ul class="contact-list">
          <li><a href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener"><span class="tile tile-brand">${icon('map-pin', { size: 20 })}</span><span><strong>${esc(SITE.address.street)}</strong><small>${esc(SITE.address.postalCode)} ${esc(lang === 'sq' ? SITE.address.city : SITE.address.cityEn)} · ${esc(t.visit_map)}</small></span></a></li>
          ${SITE.phones.map((p) => h`<li><a href="tel:${p.tel}"><span class="tile tile-brand">${icon('phone', { size: 20 })}</span><span><strong>${esc(p.display)}</strong><small>${esc(L(p.label, lang))}</small></span></a></li>`)}
          <li><a href="mailto:${SITE.email}"><span class="tile tile-brand">${icon('mail', { size: 20 })}</span><span><strong>${esc(SITE.email)}</strong><small>${esc(t.visit_write)}</small></span></a></li>
        </ul>
      </div>
      <div class="hours-card reveal">
        <div class="hours-card-head"><h3>${icon('clock', { size: 20 })}${esc(u.hours)}</h3>${status(lang)}</div>
        ${hoursTable(lang)}
        <div class="actions">
          <a class="btn btn-primary" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">${icon('navigation', { size: 18 })}${esc(u.directions)}</a>
          <a class="btn btn-wa" href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(u.whatsapp)}</a>
        </div>
      </div>
      ${miniMap(ctx, { cls: 'visit-map' })}
    </div>
  </section>`;

  const faq = h`<section class="section" aria-labelledby="h-faq">
    <div class="wrap faq-in">
      <div>
        ${sectionHead({ eyebrow: t.faq_eyebrow, title: t.faq_title, id: 'h-faq' })}
        <a class="btn btn-outline" href="${esc(ctx.url('pyetje'))}">${esc(t.faq_all)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      ${faqList(FAQ.filter((f) => f.home), lang)}
    </div>
  </section>`;

  return {
    id: 'home',
    title: t.title,
    description: t.description,
    jsonld: [ctx.clinicJsonLd(), ctx.websiteJsonLd()],
    body: hero + quick + services + inside + lab + panels + kids + how + visit + faq + ctaBand(ctx, { title: t.cta_title, text: t.cta_text }),
  };
}

