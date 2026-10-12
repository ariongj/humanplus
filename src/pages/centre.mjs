// /rreth-nesh/, /kontakt/, /pyetje/ and the 404 page.
import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { FAQ } from '../data/faq.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { pageHero, sectionHead, ctaBand, faqList, centreGallery } from '../lib/parts.mjs';
import { photo } from '../lib/photo.mjs';
import { hoursTable, status, logoMark } from '../lib/layout.mjs';

const T = dict('centre', {
  sq: {
    about_title: 'Rreth nesh — Human+ Qendra Diagnostike që nga viti 2011',
    about_desc: 'Human+ Qendra Diagnostike në Prishtinë: që nga viti 2011, vazhdimësi e Laboratorit BAKTOLAB — laborator, pediatri, gjinekologji dhe specialistë nën një çati.',
    about_eyebrow: 'Rreth nesh',
    about_h1: 'Pranë familjeve të Prishtinës *që nga 2011*.',
    about_lead: 'Human+ lindi nga një laborator — BAKTOLAB — dhe u rrit në një qendër diagnostike ku mjekët dhe laboratori punojnë së bashku për ju.',
    story_eyebrow: 'Historia',
    story_title: 'Nga laboratori te *qendra*.',
    story_1: 'Qendra Diagnostike Human Plus është vazhdimësi e punës së Laboratorit BAKTOLAB dhe u shërben pacientëve në Prishtinë që nga viti 2011 — me analizat dhe mjekun në të njëjtin vend.',
    story_2: 'Sot në Rruga B punojnë së bashku laboratori biokimik, hematologjik dhe mikrobiologjik, pediatria, gjinekologjia dhe specialistët. Kështu pacienti nuk endet nga një adresë te tjetra — dhe rezultatet i shqyrton me mjekun që i kërkoi.',
    year_1: 'Viti i themelimit',
    year_2: 'Shërbime nën një çati',
    year_3: 'Ditë në javë hapur',
    team_eyebrow: 'Ekipi',
    team_title: 'Njerëz që e njohin *punën* dhe pacientin.',
    team_text: 'Mjekë specialistë, teknikë të laboratorit dhe infermierë — një ekip që punon së bashku çdo ditë, nga marrja e mostrës deri te shpjegimi i rezultatit.',
    team_1: 'Mjekë specialistë',
    team_1_d: 'Pediatër, gjinekolog dhe specialistë të fushave të tjera.',
    team_2: 'Teknikë të laboratorit',
    team_2_d: 'Mostra të marra me kujdes dhe analiza të bëra me përpikëri.',
    team_3: 'Infermierë',
    team_3_d: 'Pranë jush dhe fëmijës suaj gjatë gjithë vizitës.',
    inside_eyebrow: 'Qendra',
    inside_title: 'Një ndërtesë, *gjithë rruga* e pacientit.',
    inside_text: `Recepsioni, marrja e mostrave, laboratori, pediatria dhe ordinancat e specialistëve — në ${SITE.address.street}.`,
    values_eyebrow: 'Si punojmë',
    values_title: 'Katër gjëra që *nuk* ndryshojnë.',
    v1: 'Saktësi',
    v1_d: 'Përgatitja e duhur, mostra e duhur, rezultati i duhur — çdo hap ka rëndësi.',
    v2: 'Kujdes njerëzor',
    v2_d: 'Koha për të dëgjuar, sidomos kur pacienti është një fëmijë i frikësuar.',
    v3: 'Fjalë të qarta',
    v3_d: 'Rezultatet dhe hapat e radhës shpjegohen në gjuhë që kuptohet.',
    v4: 'Diskrecion',
    v4_d: 'Të dhënat tuaja shëndetësore trajtohen me konfidencialitet.',
    about_cta_title: 'Ejani të *njihemi*.',
    about_cta_text: 'Rezervoni një termin ose na shkruani — ju presim në Rruga B, Nr. 16.',
    contact_title: 'Kontakt — adresa, telefonat dhe orari',
    contact_desc: 'Human+ Qendra Diagnostike, Rruga B, Nr. 16, 10000 Prishtinë. Tel. +383 44 709 072 · +383 48 750 150 · +383 38 750 150 · info@humanplusks.com. E hënë–E premte 07:30–19:00, E shtunë 08:00–16:00.',
    contact_eyebrow: 'Kontakt',
    contact_h1: 'Na gjeni, na telefononi, *na shkruani*.',
    contact_lead: 'Recepsioni ju përgjigjet gjatë orarit të punës. Për pyetje për analizat, WhatsApp është mënyra më e shpejtë.',
    c_address: 'Adresa',
    c_phones: 'Telefonat',
    c_write: 'Na shkruani',
    c_hours: 'Orari i punës',
    c_map: 'Hap në Google Maps',
    form_title: 'Dërgoni një mesazh',
    form_text: 'Shkruani pyetjen tuaj — mesazhi hapet në WhatsApp ose në e-mail, gati për t’u dërguar.',
    f_name: 'Emri',
    f_phone: 'Telefoni (opsional)',
    f_msg: 'Mesazhi',
    f_send_wa: 'Dërgo në WhatsApp',
    f_send_mail: 'Dërgo me e-mail',
    f_err: 'Shkruani emrin dhe mesazhin.',
    f_hello: 'Përshëndetje Human+!',
    f_subject: 'Mesazh nga faqja',
    faq_title: 'Pyetje të shpeshta — analizat, përgatitja dhe terminet',
    faq_desc: 'Përgjigje për pyetjet më të shpeshta në Human+ Prishtinë: termini, agjërimi para analizave, çmimet, fëmijët, rezultatet, barnat, hormonet dhe mostra e urinës.',
    faq_eyebrow: 'Pyetje',
    faq_h1: 'Pyetje të *shpeshta*.',
    faq_lead: 'Nuk e gjeni përgjigjen? Na telefononi ose na shkruani në WhatsApp.',
    nf_title: 'Faqja nuk u gjet',
    nf_h1: 'Kjo faqe *nuk* ekziston.',
    nf_lead: 'Mund të jetë zhvendosur gjatë rinovimit të faqes. Provoni një nga lidhjet më poshtë.',
    nf_home: 'Kthehu në ballinë',
  },
  en: {
    about_title: 'About us — Human+ Diagnostic Centre since 2011',
    about_desc: 'Human+ Diagnostic Centre in Prishtina: since 2011, continuing the BAKTOLAB laboratory — laboratory, paediatrics, gynaecology and specialists under one roof.',
    about_eyebrow: 'About us',
    about_h1: 'Beside Prishtina’s families *since 2011*.',
    about_lead: 'Human+ grew out of a laboratory — BAKTOLAB — into a diagnostic centre where doctors and the laboratory work together for you.',
    story_eyebrow: 'Our story',
    story_title: 'From a laboratory to a *centre*.',
    story_1: 'Human Plus Diagnostic Centre continues the work of the BAKTOLAB laboratory and has served patients in Prishtina since 2011 — with the tests and the doctor in the same place.',
    story_2: 'Today the biochemistry, haematology and microbiology laboratory, paediatrics, gynaecology and specialists work together on Rruga B. Patients do not have to go from one address to another — and they go through the results with the doctor who asked for them.',
    year_1: 'Year founded',
    year_2: 'Services under one roof',
    year_3: 'Days a week open',
    team_eyebrow: 'The team',
    team_title: 'People who know the *work* and the patient.',
    team_text: 'Specialist doctors, laboratory technicians and nurses — one team working together every day, from taking the sample to explaining the result.',
    team_1: 'Specialist doctors',
    team_1_d: 'Paediatrician, gynaecologist and specialists in other fields.',
    team_2: 'Laboratory technicians',
    team_2_d: 'Samples taken with care and tests done with precision.',
    team_3: 'Nurses',
    team_3_d: 'Beside you and your child throughout the visit.',
    inside_eyebrow: 'The centre',
    inside_title: 'One building, *the whole* patient journey.',
    inside_text: `Reception, sample collection, the laboratory, paediatrics and the specialists’ rooms — at ${SITE.address.street}.`,
    values_eyebrow: 'How we work',
    values_title: 'Four things that *do not* change.',
    v1: 'Accuracy',
    v1_d: 'The right preparation, the right sample, the right result — every step matters.',
    v2: 'Human care',
    v2_d: 'Time to listen, especially when the patient is a frightened child.',
    v3: 'Clear words',
    v3_d: 'Results and next steps explained in language you understand.',
    v4: 'Discretion',
    v4_d: 'Your health information is treated as confidential.',
    about_cta_title: 'Come and *meet us*.',
    about_cta_text: 'Book an appointment or message us — we look forward to seeing you at Rruga B, Nr. 16.',
    contact_title: 'Contact — address, phones and opening hours',
    contact_desc: 'Human+ Diagnostic Centre, Rruga B, Nr. 16, 10000 Prishtina. Tel. +383 44 709 072 · +383 48 750 150 · +383 38 750 150 · info@humanplusks.com. Mon–Fri 07:30–19:00, Sat 08:00–16:00.',
    contact_eyebrow: 'Contact',
    contact_h1: 'Find us, call us, *write to us*.',
    contact_lead: 'Reception answers during opening hours. For questions about tests, WhatsApp is the quickest way.',
    c_address: 'Address',
    c_phones: 'Phones',
    c_write: 'Write to us',
    c_hours: 'Opening hours',
    c_map: 'Open in Google Maps',
    form_title: 'Send a message',
    form_text: 'Write your question — the message opens in WhatsApp or your e-mail, ready to send.',
    f_name: 'Name',
    f_phone: 'Phone (optional)',
    f_msg: 'Message',
    f_send_wa: 'Send on WhatsApp',
    f_send_mail: 'Send by e-mail',
    f_err: 'Please enter your name and message.',
    f_hello: 'Hello Human+!',
    f_subject: 'Message from the website',
    faq_title: 'Frequently asked questions — tests, preparation and appointments',
    faq_desc: 'Answers to the most common questions at Human+ Prishtina: appointments, fasting before tests, prices, children, results, medicines, hormones and urine samples.',
    faq_eyebrow: 'Questions',
    faq_h1: 'Frequently asked *questions*.',
    faq_lead: 'Can’t find the answer? Call us or message us on WhatsApp.',
    nf_title: 'Page not found',
    nf_h1: 'This page *does not* exist.',
    nf_lead: 'It may have moved when the site was renewed. Try one of the links below.',
    nf_home: 'Back to the home page',
  },
  de: {
    about_title: 'Über uns — Human+ Diagnostikzentrum seit 2011',
    about_desc: 'Human+ Diagnostikzentrum in Prishtina: seit 2011 die Fortführung des Labors BAKTOLAB — Labor, Kinderheilkunde, Gynäkologie und Fachärzte unter einem Dach.',
    about_eyebrow: 'Über uns',
    about_h1: 'An der Seite der Familien in Prishtina *seit 2011*.',
    about_lead: 'Human+ ist aus einem Labor — BAKTOLAB — zu einem Diagnostikzentrum gewachsen, in dem Ärzte und Labor gemeinsam für Sie arbeiten.',
    story_eyebrow: 'Unsere Geschichte',
    story_title: 'Vom Labor zum *Zentrum*.',
    story_1: 'Das Diagnostikzentrum Human Plus setzt die Arbeit des Labors BAKTOLAB fort und ist seit 2011 für Patienten in Prishtina da — mit den Analysen und dem Arzt am selben Ort.',
    story_2: 'Heute arbeiten in der Rruga B das Labor für Biochemie, Hämatologie und Mikrobiologie, die Kinderheilkunde, die Gynäkologie und die Fachärzte zusammen. So müssen Patienten nicht von einer Adresse zur nächsten — und sie besprechen die Ergebnisse mit dem Arzt, der sie angefordert hat.',
    year_1: 'Gründungsjahr',
    year_2: 'Leistungen unter einem Dach',
    year_3: 'Tage pro Woche geöffnet',
    team_eyebrow: 'Das Team',
    team_title: 'Menschen, die ihre *Arbeit* und den Patienten kennen.',
    team_text: 'Fachärzte, Labortechniker und Pflegekräfte — ein Team, das jeden Tag zusammenarbeitet, von der Probenentnahme bis zur Erklärung des Ergebnisses.',
    team_1: 'Fachärzte',
    team_1_d: 'Kinderarzt, Gynäkologe und Fachärzte weiterer Fachrichtungen.',
    team_2: 'Labortechniker',
    team_2_d: 'Sorgfältig entnommene Proben und präzise durchgeführte Analysen.',
    team_3: 'Pflegekräfte',
    team_3_d: 'Für Sie und Ihr Kind da — während des ganzen Besuchs.',
    inside_eyebrow: 'Das Zentrum',
    inside_title: 'Ein Gebäude für *den ganzen* Weg des Patienten.',
    inside_text: `Empfang, Probenentnahme, Labor, Kinderheilkunde und die Sprechzimmer der Fachärzte — in der ${SITE.address.street}.`,
    values_eyebrow: 'So arbeiten wir',
    values_title: 'Vier Dinge, die sich *nicht* ändern.',
    v1: 'Genauigkeit',
    v1_d: 'Die richtige Vorbereitung, die richtige Probe, das richtige Ergebnis — jeder Schritt zählt.',
    v2: 'Menschliche Zuwendung',
    v2_d: 'Zeit zum Zuhören, besonders wenn der Patient ein ängstliches Kind ist.',
    v3: 'Klare Worte',
    v3_d: 'Ergebnisse und nächste Schritte, verständlich erklärt.',
    v4: 'Diskretion',
    v4_d: 'Ihre Gesundheitsdaten werden vertraulich behandelt.',
    about_cta_title: 'Lernen Sie uns *kennen*.',
    about_cta_text: 'Buchen Sie einen Termin oder schreiben Sie uns — wir freuen uns auf Sie in der Rruga B, Nr. 16.',
    contact_title: 'Kontakt — Adresse, Telefonnummern und Öffnungszeiten',
    contact_desc: 'Human+ Diagnostikzentrum, Rruga B, Nr. 16, 10000 Prishtina. Tel. +383 44 709 072 · +383 48 750 150 · +383 38 750 150 · info@humanplusks.com. Mo–Fr 07:30–19:00, Sa 08:00–16:00.',
    contact_eyebrow: 'Kontakt',
    contact_h1: 'Finden Sie uns, rufen Sie an, *schreiben Sie uns*.',
    contact_lead: 'Der Empfang antwortet Ihnen während der Öffnungszeiten. Bei Fragen zu Analysen ist WhatsApp der schnellste Weg.',
    c_address: 'Adresse',
    c_phones: 'Telefonnummern',
    c_write: 'Schreiben Sie uns',
    c_hours: 'Öffnungszeiten',
    c_map: 'In Google Maps öffnen',
    form_title: 'Nachricht senden',
    form_text: 'Schreiben Sie Ihre Frage — die Nachricht öffnet sich in WhatsApp oder in Ihrem E-Mail-Programm, bereit zum Senden.',
    f_name: 'Name',
    f_phone: 'Telefon (optional)',
    f_msg: 'Nachricht',
    f_send_wa: 'Per WhatsApp senden',
    f_send_mail: 'Per E-Mail senden',
    f_err: 'Bitte geben Sie Ihren Namen und Ihre Nachricht ein.',
    f_hello: 'Hallo Human+!',
    f_subject: 'Nachricht über die Website',
    faq_title: 'Häufige Fragen — Analysen, Vorbereitung und Termine',
    faq_desc: 'Antworten auf die häufigsten Fragen bei Human+ Prishtina: Termine, Nüchternheit vor Analysen, Preise, Kinder, Ergebnisse, Medikamente, Hormone und Urinproben.',
    faq_eyebrow: 'Fragen',
    faq_h1: 'Häufige *Fragen*.',
    faq_lead: 'Keine Antwort gefunden? Rufen Sie uns an oder schreiben Sie uns auf WhatsApp.',
    nf_title: 'Seite nicht gefunden',
    nf_h1: 'Diese Seite gibt es *nicht*.',
    nf_lead: 'Sie wurde möglicherweise bei der Erneuerung der Website verschoben. Versuchen Sie einen der Links unten.',
    nf_home: 'Zurück zur Startseite',
  },
});

export function aboutPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const openDays = Object.values(SITE.hours).filter(Boolean).length;
  const hero = pageHero(ctx, { trail: [[u.nav_about, 'rreth-nesh']], eyebrow: t.about_eyebrow, title: t.about_h1, lead: t.about_lead, photo: 'about' });
  const story = h`<section class="section section-tight" aria-labelledby="h-story">
    <div class="wrap story-in">
      <div>
        ${sectionHead({ eyebrow: t.story_eyebrow, title: t.story_title, id: 'h-story' })}
        <p class="prose">${esc(t.story_1)}</p>
        <p class="prose">${esc(t.story_2)}</p>
      </div>
      <div class="story-art reveal">
        ${logoMark({ cls: 'story-mark' })}
        <ul class="story-stats">
          <li><strong>${SITE.founded}</strong><span>${esc(t.year_1)}</span></li>
          <li><strong>${SERVICES.length}</strong><span>${esc(t.year_2)}</span></li>
          <li><strong>${openDays}</strong><span>${esc(t.year_3)}</span></li>
        </ul>
      </div>
    </div>
  </section>`;
  const team = h`<section class="section section-tint" aria-labelledby="h-team">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.team_eyebrow, title: t.team_title, text: t.team_text, id: 'h-team' })}
      <ul class="team-grid">${[
        ['team-doctor', t.team_1, t.team_1_d],
        ['team-lab', t.team_2, t.team_2_d],
        ['team-nurse', t.team_3, t.team_3_d],
      ].map(([slot, ti, d]) => h`<li class="team-card reveal">${photo(ctx, slot, { cls: 'team-photo', sizes: '(min-width: 960px) 30vw, (min-width: 560px) 50vw, 100vw' })}<div class="team-text"><h3>${esc(ti)}</h3><p>${esc(d)}</p></div></li>`)}</ul>
    </div>
  </section>`;
  const inside = h`<section class="section" aria-labelledby="h-inside">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.inside_eyebrow, title: t.inside_title, text: t.inside_text, id: 'h-inside' })}
      ${centreGallery(ctx)}
    </div>
  </section>`;
  const values = h`<section class="section section-tint" aria-labelledby="h-values">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.values_eyebrow, title: t.values_title, id: 'h-values' })}
      <ol class="values">${[
        [t.v1, t.v1_d],
        [t.v2, t.v2_d],
        [t.v3, t.v3_d],
        [t.v4, t.v4_d],
      ].map(([ti, d], i) => h`<li class="reveal"><span class="value-num">${String(i + 1).padStart(2, '0')} <span>/ 04</span></span><h3>${esc(ti)}</h3><p>${esc(d)}</p></li>`)}</ol>
    </div>
  </section>`;
  return {
    id: 'about',
    title: `${t.about_title}`,
    description: t.about_desc,
    jsonld: [hero.jsonld],
    body: hero.html + story + team + inside + values + ctaBand(ctx, { title: t.about_cta_title, text: t.about_cta_text }),
  };
}

export function contactPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const hero = pageHero(ctx, { trail: [[u.nav_contact, 'kontakt']], eyebrow: t.contact_eyebrow, title: t.contact_h1, lead: t.contact_lead, photo: 'contact' });
  const cards = h`<section class="section section-tight">
    <div class="wrap contact-grid">
      <article class="info-card">
        <span class="tile tile-brand">${icon('map-pin', { size: 22 })}</span>
        <h2>${esc(t.c_address)}</h2>
        <p class="big">${esc(SITE.address.street)}<br />${esc(SITE.address.postalCode)} ${esc(lang === 'sq' ? SITE.address.city : SITE.address.cityEn)}</p>
        <a class="btn btn-primary" href="${esc(SITE.mapsUrl)}" target="_blank" rel="noopener">${icon('navigation', { size: 18 })}${esc(t.c_map)}</a>
      </article>
      <article class="info-card">
        <span class="tile tile-brand">${icon('phone', { size: 22 })}</span>
        <h2>${esc(t.c_phones)}</h2>
        <ul class="phone-list">${SITE.phones.map((p) => h`<li><a href="tel:${p.tel}"><strong>${esc(p.display)}</strong><small>${esc(L(p.label, lang))}</small></a></li>`)}</ul>
      </article>
      <article class="info-card">
        <span class="tile tile-brand">${icon('message-circle', { size: 22 })}</span>
        <h2>${esc(t.c_write)}</h2>
        <ul class="phone-list">
          <li><a href="${esc(ctx.wa())}" target="_blank" rel="noopener"><strong>${brand('whatsapp', { size: 18 })} WhatsApp</strong><small>${esc(SITE.phones[0].display)}</small></a></li>
          <li><a href="viber://chat?number=${encodeURIComponent(SITE.viber)}"><strong>${brand('viber', { size: 18 })} Viber</strong><small>${esc(SITE.phones[0].display)}</small></a></li>
          <li><a href="mailto:${SITE.email}"><strong>${icon('mail', { size: 18 })} ${esc(SITE.email)}</strong><small>${esc(u.email)}</small></a></li>
          <li><a href="${esc(SITE.facebook)}" target="_blank" rel="noopener"><strong>${brand('facebook', { size: 18 })} Facebook</strong><small>QDHumanPlus</small></a></li>
        </ul>
      </article>
      <article class="info-card">
        <span class="tile tile-brand">${icon('clock', { size: 22 })}</span>
        <h2>${esc(t.c_hours)}</h2>
        ${status(lang)}
        ${hoursTable(lang)}
      </article>
    </div>
  </section>`;
  const form = h`<section class="section section-tint" aria-labelledby="h-form">
    <div class="wrap form-in">
      ${sectionHead({ eyebrow: t.contact_eyebrow, title: t.form_title, text: t.form_text, id: 'h-form' })}
      <form class="msg-form js-only" novalidate data-msg-form data-hello="${esc(t.f_hello)}" data-subject="${esc(t.f_subject)}" data-err="${esc(t.f_err)}">
        <div class="fields">
          <div class="field"><label for="m-name">${esc(t.f_name)}</label><input id="m-name" name="name" type="text" autocomplete="name" required /></div>
          <div class="field"><label for="m-phone">${esc(t.f_phone)}</label><input id="m-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" /></div>
          <div class="field field-full"><label for="m-msg">${esc(t.f_msg)}</label><textarea id="m-msg" name="message" rows="5" required></textarea></div>
        </div>
        <p class="form-error" role="alert" data-form-error hidden>${icon('circle-alert', { size: 18 })}<span></span></p>
        <div class="actions">
          <button class="btn btn-wa" type="submit" data-via="wa">${brand('whatsapp', { size: 18 })}${esc(t.f_send_wa)}</button>
          <button class="btn btn-outline" type="submit" data-via="mail">${icon('mail', { size: 18 })}${esc(t.f_send_mail)}</button>
        </div>
      </form>
    </div>
  </section>`;
  return { id: 'contact', title: `${t.contact_title} · ${SITE.fullName}`, description: t.contact_desc, jsonld: [hero.jsonld], body: hero.html + cards + form };
}

export function faqPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const hero = pageHero(ctx, { trail: [[u.nav_faq, 'pyetje']], eyebrow: t.faq_eyebrow, title: t.faq_h1, lead: t.faq_lead });
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: L(f.q, lang), acceptedAnswer: { '@type': 'Answer', text: L(f.a, lang) } })),
  };
  const body = h`<section class="section section-tight"><div class="wrap"><div class="narrow">${faqList(FAQ, lang)}</div></div></section>`;
  return {
    id: 'faq',
    title: `${t.faq_title} · ${SITE.name}`,
    description: t.faq_desc,
    jsonld: [hero.jsonld, faqLd],
    body: hero.html + body + ctaBand(ctx, { title: UI[lang].call_us, text: t.faq_lead }),
  };
}

export function notFoundPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const links = [
    ['', t.nf_home, 'arrow-right'],
    ['sherbimet', u.nav_services, 'stethoscope'],
    ['analizat', u.nav_tests, 'search'],
    ['rezervo', u.book, 'calendar-check'],
    ['kontakt', u.nav_contact, 'phone'],
  ];
  const body = h`<section class="section nf">
    <div class="wrap narrow center">
      <p class="nf-code" aria-hidden="true">4<span>+</span>4</p>
      <h1>${t.nf_h1.replace(/\*([^*]+)\*/g, '<em class="accent">$1</em>')}</h1>
      <p class="lead">${esc(t.nf_lead)}</p>
      <ul class="pill-links center">${links.map(([p, label, ic]) => h`<li><a href="${esc(ctx.url(p))}">${icon(ic, { size: 18 })}${esc(label)}</a></li>`)}</ul>
    </div>
  </section>`;
  return { id: 'notfound', title: `${t.nf_title} · ${SITE.fullName}`, description: t.nf_lead, noindex: true, noAlternates: true, body };
}
