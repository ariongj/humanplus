// /rezervo/ — booking request: service → day → time → details → WhatsApp / Viber / e-mail (+ calendar file).
// Nothing is booked automatically: reception confirms every request (README → How the booking request works).
import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { pageHero } from '../lib/parts.mjs';
import { hoursTable, status } from '../lib/layout.mjs';

export const BOOK = dict('booking', {
  sq: {
    title: 'Rezervo termin — pediatri, gjinekologji, laborator dhe specialistë',
    description: 'Kërkoni një termin në Human+ Prishtinë: zgjidhni shërbimin, ditën dhe orën, dhe dërgojeni kërkesën në WhatsApp, Viber ose me e-mail. Recepsioni e konfirmon orën.',
    eyebrow: 'Rezervo',
    h1: 'Rezervoni termin në *një minutë*.',
    lead: 'Zgjidhni shërbimin, ditën dhe orën që ju përshtaten. Kërkesa dërgohet në WhatsApp (ose Viber, e-mail) dhe recepsioni ju kthen përgjigje për ta konfirmuar.',
    s1: 'Shërbimi',
    s1_hint: 'Për çfarë doni të vini?',
    s2: 'Dita',
    s2_hint: 'E diela është ditë pushimi.',
    s3: 'Ora',
    s3_hint: 'Zgjidhni ditën për të parë oraret.',
    s3_none: 'Për sot nuk ka më orare — zgjidhni një ditë tjetër.',
    s4: 'Të dhënat tuaja',
    who: 'Termini është për',
    who_me: 'Veten',
    who_child: 'Fëmijën tim',
    who_other: 'Dikë tjetër',
    name: 'Emri dhe mbiemri',
    name_child: 'Emri i fëmijës',
    age: 'Mosha e fëmijës',
    age_ph: 'p.sh. 4 vjeç',
    phone: 'Numri i telefonit',
    phone_hint: 'Ju kthejmë përgjigje në këtë numër.',
    note: 'Shënim (opsional)',
    note_ph: 'Simptomat, analizat që ju duhen, ose një orë alternative',
    send: 'Dërgo kërkesën në WhatsApp',
    send_alt: 'ose dërgojeni me',
    privacy: 'Të dhënat dërgohen vetëm te Human+ përmes aplikacionit që zgjidhni. Faqja nuk i ruan.',
    err_service: 'Zgjidhni shërbimin.',
    err_day: 'Zgjidhni ditën.',
    err_time: 'Zgjidhni orën.',
    err_name: 'Shkruani emrin (të paktën 2 shkronja).',
    err_phone: 'Shkruani një numër telefoni të vlefshëm, p.sh. 044 123 456.',
    err_summary: 'Plotësoni fushat e shënuara.',
    done_title: 'Faleminderit, {name}!',
    done_text: 'Kërkesa juaj për {service} më {date} në orën {time} u përgatit. Nëse WhatsApp nuk u hap, përdorni butonat më poshtë. Recepsioni ju kthen përgjigje në {phone} për ta konfirmuar.',
    done_again: 'Hap WhatsApp përsëri',
    done_ics: 'Shto në kalendar',
    done_call: 'Ose telefononi tani',
    done_new: 'Kërkesë e re',
    msg_title: 'Kërkesë për termin — Human+',
    msg_service: 'Shërbimi',
    msg_date: 'Data',
    msg_time: 'Ora',
    msg_for: 'Për',
    msg_name: 'Emri',
    msg_age: 'Mosha',
    msg_phone: 'Telefoni',
    msg_note: 'Shënim',
    msg_end: 'Ju lutem ma konfirmoni terminin. Faleminderit!',
    ics_note: 'Kërkesë për termin — pret konfirmimin e recepsionit.',
    side_title: 'Preferoni të telefononi?',
    side_text: 'Recepsioni ju përgjigjet gjatë orarit të punës.',
    noscript: 'Rezervimi online kërkon JavaScript. Na telefononi ose na shkruani në WhatsApp:',
    today: 'Sot',
    tomorrow: 'Nesër',
    step: 'Hapi',
    of: 'nga',
  },
  en: {
    title: 'Book an appointment — paediatrics, gynaecology, laboratory and specialists',
    description: 'Request an appointment at Human+ Prishtina: choose the service, day and time and send the request on WhatsApp, Viber or by e-mail. Reception confirms the time.',
    eyebrow: 'Book',
    h1: 'Book an appointment in *one minute*.',
    lead: 'Choose the service, day and time that suit you. The request goes out on WhatsApp (or Viber, e-mail) and reception replies to confirm it.',
    s1: 'Service',
    s1_hint: 'What would you like to come for?',
    s2: 'Day',
    s2_hint: 'We are closed on Sundays.',
    s3: 'Time',
    s3_hint: 'Choose a day to see the times.',
    s3_none: 'No more times today — please choose another day.',
    s4: 'Your details',
    who: 'The appointment is for',
    who_me: 'Myself',
    who_child: 'My child',
    who_other: 'Someone else',
    name: 'Full name',
    name_child: 'Child’s name',
    age: 'Child’s age',
    age_ph: 'e.g. 4 years',
    phone: 'Phone number',
    phone_hint: 'We reply on this number.',
    note: 'Note (optional)',
    note_ph: 'Symptoms, the tests you need, or an alternative time',
    send: 'Send the request on WhatsApp',
    send_alt: 'or send it by',
    privacy: 'Your details go only to Human+ through the app you choose. This site does not store them.',
    err_service: 'Choose a service.',
    err_day: 'Choose a day.',
    err_time: 'Choose a time.',
    err_name: 'Enter a name (at least 2 letters).',
    err_phone: 'Enter a valid phone number, e.g. 044 123 456.',
    err_summary: 'Please complete the marked fields.',
    done_title: 'Thank you, {name}!',
    done_text: 'Your request for {service} on {date} at {time} is ready. If WhatsApp did not open, use the buttons below. Reception will reply on {phone} to confirm.',
    done_again: 'Open WhatsApp again',
    done_ics: 'Add to calendar',
    done_call: 'Or call now',
    done_new: 'New request',
    msg_title: 'Appointment request — Human+',
    msg_service: 'Service',
    msg_date: 'Date',
    msg_time: 'Time',
    msg_for: 'For',
    msg_name: 'Name',
    msg_age: 'Age',
    msg_phone: 'Phone',
    msg_note: 'Note',
    msg_end: 'Please confirm the appointment. Thank you!',
    ics_note: 'Appointment request — waiting for confirmation from reception.',
    side_title: 'Prefer to call?',
    side_text: 'Reception answers during opening hours.',
    noscript: 'Online booking needs JavaScript. Call us or message us on WhatsApp:',
    today: 'Today',
    tomorrow: 'Tomorrow',
    step: 'Step',
    of: 'of',
  },
});

const LAB_OPTION = { slug: 'analiza', icon: 'test-tubes', tone: 'brand', name: { sq: 'Analiza laboratorike', en: 'Lab tests' } };

export function bookingPage(ctx) {
  const { lang } = ctx;
  const t = BOOK[lang];
  const u = UI[lang];
  const options = [LAB_OPTION, ...SERVICES.filter((s) => !s.slug.startsWith('laboratori'))];
  const hero = pageHero(ctx, { trail: [[u.book, 'rezervo']], eyebrow: t.eyebrow, title: t.h1, lead: t.lead, cls: 'page-hero-book' });
  const step = (n, title, hint, content, id) => h`<fieldset class="step-box" id="${id}" data-step="${n}">
    <legend><span class="step-badge" aria-hidden="true">${n}</span><span class="sr-only">${esc(t.step)} ${n} ${esc(t.of)} 4: </span>${esc(title)}</legend>
    ${hint && h`<p class="step-hint" id="${id}-hint">${esc(hint)}</p>`}
    ${content}
    <p class="field-error" id="${id}-err" hidden></p>
  </fieldset>`;
  const form = h`<form class="booking js-only" novalidate data-booking>
    <p class="form-error" role="alert" data-form-error hidden>${icon('circle-alert', { size: 18 })}<span>${esc(t.err_summary)}</span></p>
    ${step(1, t.s1, t.s1_hint, h`<div class="choice-grid">${options.map(
      (s) => h`<label class="choice"><input type="radio" name="service" value="${s.slug}" data-label="${esc(L(s.name, lang))}" /><span class="choice-card"><span class="tile tile-${s.tone} tile-sm">${icon(s.icon, { size: 18 })}</span><span>${esc(L(s.nameShort ?? s.name, lang))}</span>${icon('check', { size: 18, cls: 'choice-check' })}</span></label>`,
    )}</div>`, 'b-service')}
    ${step(2, t.s2, t.s2_hint, h`<div class="day-grid" data-days></div>`, 'b-day')}
    ${step(3, t.s3, t.s3_hint, h`<div class="time-grid" data-times></div>`, 'b-time')}
    ${step(4, t.s4, '', h`<div class="fields">
      <div class="field field-full">
        <span class="field-label" id="b-who-label">${esc(t.who)}</span>
        <div class="seg" role="radiogroup" aria-labelledby="b-who-label">
          <label><input type="radio" name="who" value="me" checked /><span>${esc(t.who_me)}</span></label>
          <label><input type="radio" name="who" value="child" /><span>${esc(t.who_child)}</span></label>
          <label><input type="radio" name="who" value="other" /><span>${esc(t.who_other)}</span></label>
        </div>
      </div>
      <div class="field">
        <label for="b-name" data-name-label data-me="${esc(t.name)}" data-child="${esc(t.name_child)}">${esc(t.name)}</label>
        <input id="b-name" name="name" type="text" autocomplete="name" required aria-describedby="b-name-err" />
        <p class="field-error" id="b-name-err" hidden></p>
      </div>
      <div class="field" data-age hidden>
        <label for="b-age">${esc(t.age)}</label>
        <input id="b-age" name="age" type="text" placeholder="${esc(t.age_ph)}" />
      </div>
      <div class="field">
        <label for="b-phone">${esc(t.phone)}</label>
        <input id="b-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="044 123 456" aria-describedby="b-phone-hint b-phone-err" />
        <p class="field-hint" id="b-phone-hint">${esc(t.phone_hint)}</p>
        <p class="field-error" id="b-phone-err" hidden></p>
      </div>
      <div class="field field-full">
        <label for="b-note">${esc(t.note)}</label>
        <textarea id="b-note" name="note" rows="3" placeholder="${esc(t.note_ph)}"></textarea>
      </div>
    </div>`, 'b-details')}
    <div class="booking-send">
      <button class="btn btn-wa btn-lg btn-block" type="submit" data-via="wa">${brand('whatsapp', { size: 22 })}${esc(t.send)}</button>
      <p class="send-alt"><span>${esc(t.send_alt)}</span>
        <button class="btn btn-outline btn-sm" type="submit" data-via="viber">${brand('viber', { size: 16 })}Viber</button>
        <button class="btn btn-outline btn-sm" type="submit" data-via="mail">${icon('mail', { size: 16 })}${esc(u.email)}</button>
      </p>
      <p class="small muted">${icon('shield-check', { size: 16 })} ${esc(t.privacy)}</p>
    </div>
  </form>
  <div class="booking-done" data-done hidden tabindex="-1">
    <span class="done-icon">${icon('circle-check', { size: 40 })}</span>
    <h2 data-done-title></h2>
    <p data-done-text></p>
    <div class="actions center">
      <a class="btn btn-wa" data-done-wa href="#" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}${esc(t.done_again)}</a>
      <button class="btn btn-outline" type="button" data-done-ics>${icon('calendar-days', { size: 18 })}${esc(t.done_ics)}</button>
      <a class="btn btn-outline" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 18 })}${esc(t.done_call)}: ${esc(SITE.phones[0].display)}</a>
    </div>
    <button class="link-btn" type="button" data-done-new>${icon('chevron-left', { size: 16 })}<span>${esc(t.done_new)}</span></button>
  </div>
  <noscript><div class="aside-card"><p>${esc(t.noscript)}</p><p><a class="btn btn-primary" href="tel:${SITE.phones[0].tel}">${esc(SITE.phones[0].display)}</a> <a class="btn btn-wa" href="${esc(ctx.wa())}">WhatsApp</a></p></div></noscript>`;
  const side = h`<aside class="booking-aside">
    <div class="aside-card sticky">
      <h2>${icon('phone', { size: 20 })}${esc(t.side_title)}</h2>
      <p>${esc(t.side_text)}</p>
      ${status(lang)}
      <ul class="phone-list">${SITE.phones.map((p) => h`<li><a href="tel:${p.tel}"><strong>${esc(p.display)}</strong><small>${esc(L(p.label, lang))}</small></a></li>`)}</ul>
      ${hoursTable(lang)}
    </div>
  </aside>`;
  // Strings the booking script needs (in addition to the shared ones).
  const strings = h`<script type="application/json" id="hp-booking">${JSON.stringify(t).replace(/</g, '\\u003c')}</script>`;
  return {
    id: 'booking',
    title: `${t.title} · ${SITE.name}`,
    description: t.description,
    jsonld: [hero.jsonld],
    body: hero.html + h`<section class="section section-tight"><div class="wrap booking-in"><div>${form}</div>${side}</div></section>` + strings,
  };
}
