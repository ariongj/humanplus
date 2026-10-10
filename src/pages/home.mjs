import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { TESTS, PANELS } from '../data/tests.mjs';
import { FAQ } from '../data/faq.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L, accent } from '../lib/html.mjs';
import { logoMark, hoursTable, status } from '../lib/layout.mjs';
import { sectionHead, serviceCard, panelCard, testSearch, ctaBand, faqList, shortName } from '../lib/parts.mjs';

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
    card_status: 'Orari sot',
    card_prep_title: 'Këshilla e ditës',
    card_prep_text: 'Për glukozën dhe yndyrnat ejani esëll 8–12 orë. Uji i thjeshtë lejohet.',
    card_depts: 'Departamentet',
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
    lab_c1: 'Biokimi',
    lab_c1_d: 'Glukoza, HbA1c, yndyrnat, veshkat, mëlçia, hormonet, vitaminat.',
    lab_c2: 'Hematologji',
    lab_c2_d: 'Gjaku komplet, sedimentimi, koagulimi, grupi i gjakut.',
    lab_c3: 'Mikrobiologji',
    lab_c3_d: 'Urinokultura, koprokultura, brisët, Helicobacter pylori.',
    lab_all: 'Shiko të gjitha analizat',
    pan_eyebrow: 'Paketat',
    pan_title: 'Check-up i menduar *për ju*.',
    pan_text: 'Analizat që shkojnë bashkë, të grupuara sipas moshës dhe nevojës. Shtojeni paketën në listë ose pyetni për çmimin në WhatsApp.',
    pan_all: 'Të gjitha paketat',
    ped_eyebrow: 'Pediatri',
    ped_title: 'Shëndeti i fëmijës suaj — *prioriteti ynë*.',
    ped_text: 'Që nga viti 2011 kemi qenë pranë mijëra prindërve dhe fëmijëve. Pediatri dhe laborator në të njëjtin vend: më pak pritje, më pak stres për fëmijën.',
    ped_cta: 'Rezervo te pediatri',
    ped_more: 'Rreth pediatrisë',
    ped_badge: 'Pediatri + laborator',
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
    card_status: 'Hours today',
    card_prep_title: 'Tip of the day',
    card_prep_text: 'For glucose and blood fats, come after fasting for 8–12 hours. Plain water is fine.',
    card_depts: 'Departments',
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
    lab_c1: 'Biochemistry',
    lab_c1_d: 'Glucose, HbA1c, blood fats, kidneys, liver, hormones, vitamins.',
    lab_c2: 'Haematology',
    lab_c2_d: 'Blood count, ESR, coagulation, blood group.',
    lab_c3: 'Microbiology',
    lab_c3_d: 'Urine and stool cultures, swabs, Helicobacter pylori.',
    lab_all: 'See all lab tests',
    pan_eyebrow: 'Check-ups',
    pan_title: 'Check-ups made *for you*.',
    pan_text: 'Tests that belong together, grouped by age and need. Add a check-up to your list or ask for the price on WhatsApp.',
    pan_all: 'All check-ups',
    ped_eyebrow: 'Paediatrics',
    ped_title: 'Your child’s health — *our priority*.',
    ped_text: 'Since 2011 we have looked after thousands of parents and children. Paediatrics and laboratory in one place: less waiting, less stress for your child.',
    ped_cta: 'Book with a paediatrician',
    ped_more: 'About paediatrics',
    ped_badge: 'Paediatrics + laboratory',
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
});

const POPULAR = ['cbc', 'vitd', 'tsh', 'glucose', 'ferritin', 'urine-culture'];

export function homePage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const openDays = Object.values(SITE.hours).filter(Boolean).length;

  const hero = h`<section class="hero">
    <div class="wrap hero-in">
      <div class="hero-text">
        <p class="eyebrow eyebrow-pill"><span class="pulse" aria-hidden="true"></span>${esc(t.eyebrow)}</p>
        <h1>${accent(t.h1)}</h1>
        <p class="lead">${esc(t.lead)}</p>
        ${testSearch(ctx, { id: 'hero-q', big: true })}
        <p class="popular"><span>${esc(t.popular)}</span>${POPULAR.map((id) => {
          const label = shortName(id, lang);
          return h`<a class="chip chip-link" href="${esc(ctx.url('analizat'))}?q=${encodeURIComponent(label)}">${esc(label)}</a>`;
        })}</p>
        <div class="actions">
          <a class="btn btn-primary btn-lg" href="${esc(ctx.url('rezervo'))}">${icon('calendar-check', { size: 20 })}${esc(u.book)}</a>
          <a class="btn btn-outline btn-lg" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 20 })}${esc(SITE.phones[0].display)}</a>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="hero-panel">
          ${logoMark({ cls: 'hero-mark' })}
          <span class="hero-plus hp1">+</span><span class="hero-plus hp2">+</span><span class="hero-plus hp3">+</span>
          <svg class="hero-wave" viewBox="0 0 600 160" preserveAspectRatio="none"><path d="M0 110 C 80 60 140 150 220 100 S 360 40 440 90 S 560 130 600 80 L600 160 L0 160 Z"/></svg>
        </div>
        <div class="float-card fc-status">
          <p class="fc-label">${icon('clock', { size: 16 })}${esc(t.card_status)}</p>
          ${status(lang, { cls: 'status-lg' })}
          ${hoursTable(lang, { cls: 'hours-mini' })}
        </div>
        <div class="float-card fc-prep">
          <span class="tile tile-sun">${icon('utensils-crossed', { size: 20 })}</span>
          <div><p class="fc-title">${esc(t.card_prep_title)}</p><p>${esc(t.card_prep_text)}</p></div>
        </div>
        <div class="float-card fc-depts">
          <p class="fc-label">${esc(t.card_depts)}</p>
          <div class="fc-chips">${SERVICES.slice(0, 3).map((s) => h`<span class="chip chip-${s.tone}">${icon(s.icon, { size: 14 })}${esc(L(s.nameShort ?? s.name, lang))}</span>`)}</div>
        </div>
      </div>
    </div>
    <div class="wrap">
      <ul class="stats">
        <li><strong>${SITE.founded}</strong><span>${esc(t.stat1)}</span></li>
        <li><strong>${SERVICES.length}</strong><span>${esc(t.stat2)}</span></li>
        <li><strong>${Math.floor(TESTS.length / 10) * 10}+</strong><span>${esc(t.stat3)}</span></li>
        <li><strong>${openDays}</strong><span>${esc(t.stat4)}</span></li>
      </ul>
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
    </div>
  </section>`;

  const services = h`<section class="section" aria-labelledby="h-svc">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ num: '01', eyebrow: t.svc_eyebrow, title: t.svc_title, text: t.svc_text, id: 'h-svc' })}
        <a class="btn btn-outline" href="${esc(ctx.url('sherbimet'))}">${esc(u.all_services)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      <ul class="svc-grid">${SERVICES.map((s, i) => serviceCard(ctx, s, i))}</ul>
    </div>
  </section>`;

  const lab = h`<section class="section section-brand" aria-labelledby="h-lab">
    <div class="wrap lab-in">
      <div class="lab-text">
        ${sectionHead({ num: '02', eyebrow: t.lab_eyebrow, title: t.lab_title, text: t.lab_text, id: 'h-lab', light: true })}
        ${testSearch(ctx, { id: 'lab-q', landmark: false })}
        <a class="btn btn-light" href="${esc(ctx.url('analizat'))}">${icon('list-checks', { size: 18 })}${esc(t.lab_all)} (${TESTS.length})</a>
      </div>
      <ul class="lab-cards">
        ${[
          ['flask-conical', t.lab_c1, t.lab_c1_d, 'laboratori-biokimik-dhe-hematologjik'],
          ['droplet', t.lab_c2, t.lab_c2_d, 'laboratori-biokimik-dhe-hematologjik'],
          ['microscope', t.lab_c3, t.lab_c3_d, 'laboratori-mikrobiologjik'],
        ].map(
          ([ic, title, d, slug], i) => h`<li class="lab-card reveal"><a href="${esc(ctx.url(`sherbim/${slug}`))}">
            <span class="lab-card-num" aria-hidden="true">0${i + 1} / 03</span>
            ${icon(ic, { size: 28 })}
            <h3>${esc(title)}</h3>
            <p>${esc(d)}</p>
          </a></li>`,
        )}
      </ul>
    </div>
  </section>`;

  const panels = h`<section class="section" aria-labelledby="h-pan">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ num: '03', eyebrow: t.pan_eyebrow, title: t.pan_title, text: t.pan_text, id: 'h-pan' })}
        <a class="btn btn-outline" href="${esc(ctx.url('paketat'))}">${esc(t.pan_all)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      <div class="panel-grid">${PANELS.filter((p) => ['baze', 'femije', 'grua', 'burre'].includes(p.id)).map((p) => panelCard(ctx, p))}</div>
    </div>
  </section>`;

  const ped = SERVICES.find((s) => s.slug === 'pediatri');
  const kids = h`<section class="section section-tint" aria-labelledby="h-ped">
    <div class="wrap ped-in">
      <div class="ped-art reveal" aria-hidden="true">
        <div class="ped-blob">${icon('baby', { size: 96 })}</div>
        <span class="ped-badge">${icon('heart-pulse', { size: 18 })}${esc(t.ped_badge)}</span>
        <span class="ped-dot pd1"></span><span class="ped-dot pd2"></span><span class="ped-dot pd3"></span>
      </div>
      <div>
        ${sectionHead({ num: '04', eyebrow: t.ped_eyebrow, title: t.ped_title, text: t.ped_text, id: 'h-ped' })}
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
      ${sectionHead({ num: '05', eyebrow: t.how_eyebrow, title: t.how_title, id: 'h-how', center: true })}
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
        ${sectionHead({ num: '06', eyebrow: t.visit_eyebrow, title: t.visit_title, text: t.visit_text, id: 'h-visit' })}
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
    </div>
  </section>`;

  const faq = h`<section class="section" aria-labelledby="h-faq">
    <div class="wrap faq-in">
      <div>
        ${sectionHead({ num: '07', eyebrow: t.faq_eyebrow, title: t.faq_title, id: 'h-faq' })}
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
    body: hero + quick + services + lab + panels + kids + how + visit + faq + ctaBand(ctx, { title: t.cta_title, text: t.cta_text }),
  };
}

