// /privatesia/ — what the site does with data: no cookies or analytics, what is kept on the visitor's device
// (with controls to delete it, assets/site.js), what the server receives, and which outside services are used only
// when the visitor chooses them. Only facts about this site; no compliance claims. README → Privacy.
import { SITE } from '../data/site.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, dict } from '../lib/html.mjs';
import { pageHero } from '../lib/parts.mjs';

// Change this date whenever the text below or the site's data flows change.
const UPDATED = [2026, 10, 26];

const T = dict('privacy', {
  sq: {
    title: 'Privatësia',
    desc: 'Si i trajton faqja e Human+ të dhënat: pa cookies dhe pa analitikë, çfarë ruhet në pajisjen tuaj dhe kur lidheni me Google Maps, WhatsApp ose Viber.',
    eyebrow: 'Privatësia',
    h1: 'Çfarë ndodh me *të dhënat* tuaja.',
    lead: 'Kjo faqe nuk vendos cookies dhe nuk përdor analitikë apo reklama. Më poshtë shihni çfarë ruhet në pajisjen tuaj, çfarë merr serveri dhe kur lidheni me shërbime të tjera.',
    short_h: 'Shkurt',
    short_1: 'Faqja nuk vendos cookies dhe nuk përdor analitikë, reklama apo mjete gjurmimi.',
    short_2: 'Nuk keni nevojë për llogari. Formularët nuk i ruajnë të dhënat: ata përgatitin mesazhin që e dërgoni vetë me WhatsApp, Viber ose e-mail.',
    short_2f: 'Nuk keni nevojë për llogari. Formularët përgatitin mesazhin që e dërgoni vetë me WhatsApp, Viber ose e-mail; një kopje e kërkesës shkon edhe te shërbimi i formularëve (shih më poshtë).',
    short_3: 'Rezultatet e analizave nuk kalojnë përmes kësaj faqeje.',
    short_4: 'Google Maps ngarkohet vetëm kur e kërkoni.',
    who_h: 'Kush e menaxhon faqen',
    who: '{name}, {addr}.',
    contact: 'E-mail: {email} · Telefon: {phone}',
    host_h: 'Kur hapni një faqe',
    host: 'Faqja shërbehet nga {host}. Si çdo server, ai merr adresën IP, llojin e shfletuesit, faqen e kërkuar dhe kohën, që t’jua dërgojë faqen dhe ta mbrojë nga sulmet. Ne nuk i përdorim këto të dhëna për t’ju njohur ose ndjekur. Sa kohë i mban, e vendos ofruesi.',
    host_gh: 'GitHub Pages (GitHub, Inc.)',
    host_generic: 'ofruesi i hostingut të faqes',
    store_h: 'Çfarë ruhet në pajisjen tuaj',
    store_lead: 'Disa veçori e mbajnë mend zgjedhjen tuaj në këtë shfletues (localStorage dhe sessionStorage). Këto nuk na dërgohen dhe mund t’i fshini këtu në çdo kohë.',
    s_list: 'Lista ime',
    s_list_d: 'Analizat që shtoni në listë, që t’i gjeni kur ktheheni. Mbetet derisa ta fshini.',
    s_lang: 'Gjuha',
    s_lang_d: 'Gjuha që zgjodhët, që faqja kryesore t’ju hapet në atë gjuhë. Mbetet derisa ta fshini.',
    s_map: 'Harta',
    s_map_d: 'Që keni pranuar ngarkimin e hartës nga Google Maps. Skadon pas 6 muajsh.',
    s_chat: 'Biseda me asistentin',
    s_chat_d: 'Biseda me asistentin e faqes. Fshihet vetë kur mbyllni skedën.',
    del: 'Fshi',
    del_all: 'Fshi gjithçka',
    nojs: 'Për t’i parë dhe fshirë këto zgjedhje duhet JavaScript. Pa të, faqja nuk ruan asgjë.',
    ext_h: 'Shërbime të tjera, vetëm kur i zgjidhni',
    ext_map: 'Google Maps: harta ngarkohet vetëm pasi klikoni “Shfaq hartën”. Atëherë shfletuesi lidhet me Google, i cili merr adresën IP dhe mund të vendosë cookies sipas rregullave të veta.',
    ext_msg: 'WhatsApp, Viber dhe e-mail: kur dërgoni një rezervim, listën ose një pyetje, faqja hap aplikacionin me mesazhin e përgatitur. Mesazhi niset vetëm kur e dërgoni vetë dhe e përpunon ai shërbim (WhatsApp nga Meta, Viber nga Rakuten, e-maili nga ofruesi juaj).',
    ext_form: 'Shërbimi i formularëve ({host}): kërkesat nga formularët i dërgohen edhe atij, që të na arrijnë me e-mail.',
    ext_fb: 'Facebook: lidhja hap faqen tonë në Facebook. Asgjë nga Facebook nuk ngarkohet në këtë faqe.',
    ext_tel: 'Telefoni: numrat hapen në aplikacionin e telefonit tuaj.',
    rules: 'Rregullat e tyre:',
    ask_h: 'Pyetje',
    ask: 'Për pyetje rreth të dhënave tuaja, na shkruani ose na telefononi.',
    updated: 'Përditësuar më {date}.',
  },
  en: {
    title: 'Privacy',
    desc: 'How the Human+ website handles data: no cookies and no analytics, what is kept on your device and when you connect to Google Maps, WhatsApp or Viber.',
    eyebrow: 'Privacy',
    h1: 'What happens to *your data*.',
    lead: 'This site sets no cookies and uses no analytics or advertising. Below you can see what is kept on your device, what the server receives and when you connect to other services.',
    short_h: 'In short',
    short_1: 'The site sets no cookies and uses no analytics, advertising or tracking tools.',
    short_2: 'You do not need an account. The forms do not store your data: they prepare the message that you send yourself by WhatsApp, Viber or e-mail.',
    short_2f: 'You do not need an account. The forms prepare the message that you send yourself by WhatsApp, Viber or e-mail; a copy of the request also goes to the form service (see below).',
    short_3: 'Test results do not pass through this site.',
    short_4: 'Google Maps loads only when you ask for it.',
    who_h: 'Who runs the site',
    who: '{name}, {addr}.',
    contact: 'E-mail: {email} · Phone: {phone}',
    host_h: 'When you open a page',
    host: 'The site is served by {host}. Like any server, it receives your IP address, browser type, the page requested and the time, in order to deliver the page and protect it from attacks. We do not use this data to identify or track you. How long it is kept is decided by the provider.',
    host_gh: 'GitHub Pages (GitHub, Inc.)',
    host_generic: 'the site’s hosting provider',
    store_h: 'What is kept on your device',
    store_lead: 'Some features remember your choice in this browser (localStorage and sessionStorage). This is not sent to us, and you can delete it here at any time.',
    s_list: 'My list',
    s_list_d: 'The tests you add to your list, so you find them when you come back. Kept until you delete it.',
    s_lang: 'Language',
    s_lang_d: 'The language you chose, so the home page opens in that language. Kept until you delete it.',
    s_map: 'Map',
    s_map_d: 'That you agreed to load the map from Google Maps. Expires after 6 months.',
    s_chat: 'Assistant chat',
    s_chat_d: 'Your chat with the site assistant. Deleted automatically when you close the tab.',
    del: 'Delete',
    del_all: 'Delete everything',
    nojs: 'Viewing and deleting these choices needs JavaScript. Without it, the site keeps nothing.',
    ext_h: 'Other services, only when you choose them',
    ext_map: 'Google Maps: the map loads only after you click “Show the map”. Your browser then connects to Google, which receives your IP address and may set cookies under its own rules.',
    ext_msg: 'WhatsApp, Viber and e-mail: when you send a booking, your list or a question, the site opens the app with the prepared message. The message leaves only when you send it yourself and is handled by that service (WhatsApp by Meta, Viber by Rakuten, e-mail by your provider).',
    ext_form: 'Form service ({host}): requests from the forms are also sent to it, so they reach us by e-mail.',
    ext_fb: 'Facebook: the link opens our Facebook page. Nothing from Facebook is loaded on this site.',
    ext_tel: 'Phone: the numbers open in your phone app.',
    rules: 'Their rules:',
    ask_h: 'Questions',
    ask: 'For questions about your data, write to us or call us.',
    updated: 'Updated on {date}.',
  },
  de: {
    title: 'Datenschutz',
    desc: 'Wie die Website von Human+ mit Daten umgeht: keine Cookies und keine Analyse, was auf Ihrem Gerät gespeichert wird und wann Sie sich mit Google Maps, WhatsApp oder Viber verbinden.',
    eyebrow: 'Datenschutz',
    h1: 'Was mit *Ihren Daten* geschieht.',
    lead: 'Diese Website setzt keine Cookies und verwendet keine Analyse- oder Werbedienste. Hier sehen Sie, was auf Ihrem Gerät gespeichert wird, was der Server erhält und wann Sie sich mit anderen Diensten verbinden.',
    short_h: 'Kurz gesagt',
    short_1: 'Die Website setzt keine Cookies und verwendet keine Analyse-, Werbe- oder Tracking-Werkzeuge.',
    short_2: 'Sie brauchen kein Konto. Die Formulare speichern Ihre Daten nicht: Sie bereiten die Nachricht vor, die Sie selbst per WhatsApp, Viber oder E-Mail senden.',
    short_2f: 'Sie brauchen kein Konto. Die Formulare bereiten die Nachricht vor, die Sie selbst per WhatsApp, Viber oder E-Mail senden; eine Kopie der Anfrage geht auch an den Formulardienst (siehe unten).',
    short_3: 'Laborergebnisse laufen nicht über diese Website.',
    short_4: 'Google Maps wird nur geladen, wenn Sie es anfordern.',
    who_h: 'Wer die Website betreibt',
    who: '{name}, {addr}.',
    contact: 'E-Mail: {email} · Telefon: {phone}',
    host_h: 'Wenn Sie eine Seite öffnen',
    host: 'Die Website wird von {host} bereitgestellt. Wie jeder Server erhält er Ihre IP-Adresse, den Browsertyp, die aufgerufene Seite und die Uhrzeit, um die Seite auszuliefern und vor Angriffen zu schützen. Wir verwenden diese Daten nicht, um Sie zu erkennen oder zu verfolgen. Wie lange sie aufbewahrt werden, entscheidet der Anbieter.',
    host_gh: 'GitHub Pages (GitHub, Inc.)',
    host_generic: 'dem Hosting-Anbieter der Website',
    store_h: 'Was auf Ihrem Gerät gespeichert wird',
    store_lead: 'Einige Funktionen merken sich Ihre Wahl in diesem Browser (localStorage und sessionStorage). Das wird nicht an uns gesendet, und Sie können es hier jederzeit löschen.',
    s_list: 'Meine Liste',
    s_list_d: 'Die Analysen, die Sie Ihrer Liste hinzufügen, damit Sie sie beim nächsten Besuch wiederfinden. Bleibt, bis Sie sie löschen.',
    s_lang: 'Sprache',
    s_lang_d: 'Die gewählte Sprache, damit sich die Startseite in dieser Sprache öffnet. Bleibt, bis Sie sie löschen.',
    s_map: 'Karte',
    s_map_d: 'Dass Sie dem Laden der Karte von Google Maps zugestimmt haben. Läuft nach 6 Monaten ab.',
    s_chat: 'Chat mit dem Assistenten',
    s_chat_d: 'Ihr Chat mit dem Assistenten der Website. Wird automatisch gelöscht, wenn Sie den Tab schließen.',
    del: 'Löschen',
    del_all: 'Alles löschen',
    nojs: 'Zum Anzeigen und Löschen dieser Einstellungen ist JavaScript nötig. Ohne JavaScript speichert die Website nichts.',
    ext_h: 'Andere Dienste, nur wenn Sie sie wählen',
    ext_map: 'Google Maps: Die Karte wird erst geladen, wenn Sie auf „Karte anzeigen“ klicken. Ihr Browser verbindet sich dann mit Google; Google erhält Ihre IP-Adresse und kann nach eigenen Regeln Cookies setzen.',
    ext_msg: 'WhatsApp, Viber und E-Mail: Wenn Sie eine Buchung, Ihre Liste oder eine Frage senden, öffnet die Website die App mit der vorbereiteten Nachricht. Die Nachricht wird erst gesendet, wenn Sie sie selbst abschicken, und von diesem Dienst verarbeitet (WhatsApp von Meta, Viber von Rakuten, E-Mail von Ihrem Anbieter).',
    ext_form: 'Formulardienst ({host}): Anfragen aus den Formularen gehen auch an diesen Dienst, damit sie uns per E-Mail erreichen.',
    ext_fb: 'Facebook: Der Link öffnet unsere Facebook-Seite. Von Facebook wird auf dieser Website nichts geladen.',
    ext_tel: 'Telefon: Die Nummern öffnen sich in Ihrer Telefon-App.',
    rules: 'Deren Regeln:',
    ask_h: 'Fragen',
    ask: 'Bei Fragen zu Ihren Daten schreiben Sie uns oder rufen Sie uns an.',
    updated: 'Aktualisiert am {date}.',
  },
});

// Privacy rules of the services named above (only their main, stable pages).
const RULES = [
  ['Google', 'https://policies.google.com/privacy'],
  ['WhatsApp', 'https://www.whatsapp.com/legal/privacy-policy'],
];
const GITHUB_RULES = ['GitHub', 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement'];

const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

export function privacyPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const preview = /github\.io$/.test(new URL(ctx.origin).hostname);
  const host = preview ? t.host_gh : SITE.hosting || t.host_generic;
  const formHost = SITE.formEndpoint ? new URL(SITE.formEndpoint).hostname : '';
  const addr = `${SITE.address.street}, ${SITE.address.postalCode} ${lang === 'sq' ? SITE.address.city : SITE.address.cityEn}`;
  const [y, m, d] = UPDATED;
  const date = lang === 'en' ? `${d} ${u.months[m - 1]} ${y}` : `${d}${lang === 'de' ? '.' : ''} ${u.months[m - 1]} ${y}`;
  const hero = pageHero(ctx, { trail: [[t.title, 'privatesia']], eyebrow: t.eyebrow, title: t.h1, lead: t.lead });
  const rules = [...RULES, ...(preview ? [GITHUB_RULES] : [])];
  const stores = [
    ['hp-list', t.s_list, t.s_list_d, 'clipboard-list'],
    ['hp-lang', t.s_lang, t.s_lang_d, 'globe'],
    ['hp-map', t.s_map, t.s_map_d, 'map'],
    ['hp-chat-', t.s_chat, t.s_chat_d, 'message-circle'],
  ];
  const body = h`<section class="section section-tight"><div class="wrap"><div class="narrow privacy">
    <h2>${esc(t.short_h)}</h2>
    <ul class="ticks">${[t.short_1, formHost ? t.short_2f : t.short_2, t.short_3, t.short_4].map((s) => h`<li>${icon('check', { size: 18 })}<span>${esc(s)}</span></li>`)}</ul>

    <h2>${esc(t.who_h)}</h2>
    <p>${esc(fill(t.who, { name: SITE.fullName, addr }))}</p>
    <p>${fill(esc(t.contact), { email: `<a href="mailto:${SITE.email}">${esc(SITE.email)}</a>`, phone: `<a href="tel:${SITE.phones[0].tel}">${esc(SITE.phones[0].display)}</a>` })}</p>

    <h2>${esc(t.host_h)}</h2>
    <p>${esc(fill(t.host, { host }))}</p>

    <h2 id="pajisja">${esc(t.store_h)}</h2>
    <p>${esc(t.store_lead)}</p>
    <ul class="store-list" data-privacy>
      ${stores.map(([key, name, d, ic]) => h`<li data-store="${key}">
        <span class="tile tile-mint">${icon(ic, { size: 20 })}</span>
        <span class="store-text"><strong>${esc(name)}</strong><span>${esc(d)}</span><span class="store-state js-only" data-store-state></span></span>
        <button class="btn btn-outline btn-sm js-only" type="button" data-store-del>${esc(t.del)}</button>
      </li>`)}
    </ul>
    <p class="store-actions js-only"><button class="btn btn-outline" type="button" data-store-all>${icon('trash-2', { size: 18 })}${esc(t.del_all)}</button></p>
    <noscript><p>${esc(t.nojs)}</p></noscript>

    <h2 id="harta">${esc(t.ext_h)}</h2>
    <ul class="ticks">${[t.ext_map, t.ext_msg, ...(formHost ? [fill(t.ext_form, { host: formHost })] : []), t.ext_fb, t.ext_tel].map((s) => h`<li>${icon('arrow-up-right', { size: 18 })}<span>${esc(s)}</span></li>`)}</ul>
    <p class="privacy-rules">${esc(t.rules)} ${rules.map(([n, url], i) => h`${i ? ' · ' : ''}<a href="${esc(url)}" target="_blank" rel="noopener">${esc(n)}</a>`)}</p>

    <h2>${esc(t.ask_h)}</h2>
    <p>${esc(t.ask)} <a href="mailto:${SITE.email}">${esc(SITE.email)}</a> · <a href="tel:${SITE.phones[0].tel}">${esc(SITE.phones[0].display)}</a></p>
    <p class="privacy-updated">${esc(fill(t.updated, { date }))}</p>
  </div></div></section>`;
  return {
    id: 'privacy',
    title: `${t.title} · ${SITE.fullName}`,
    description: t.desc,
    jsonld: [hero.jsonld],
    body: hero.html + body,
  };
}
