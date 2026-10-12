// Data for the site assistant (src/assets/chat.js), one file per language: assets/chat-<lang>.json.
// Everything comes from the site's own data, so the chat never says more than the pages do.
import { SITE, SOCIALS } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { PANELS, PREP } from '../data/tests.mjs';
import { FAQ } from '../data/faq.mjs';
import { UI } from '../data/ui.mjs';
import { CHAT, INTENTS, SERVICE_WORDS, STOP } from '../data/chat.mjs';
import { L } from './html.mjs';
import { hoursRows, phoneLabel } from './layout.mjs';

/** `url(path, lang)` builds a page address; `sprite` is the icon sprite URL; `catalogue` the catalogue data URL. */
export function chatData(lang, { url, sprite, catalogue }) {
  const u = UI[lang];
  const city = lang === 'sq' ? SITE.address.city : SITE.address.cityEn;
  return {
    lang,
    sprite,
    t: { ...CHAT[lang], book_btn: u.book, add: u.list_add, added: u.list_added, directions: u.directions, email: u.email },
    hours: hoursRows(lang).map((r) => [r.label, r.value]),
    addr: `${SITE.address.street}, ${SITE.address.postalCode} ${city}`,
    maps: SITE.mapsUrl,
    dir: SITE.mapsDirections,
    phones: SITE.phones.map((p) => [p.display, p.tel, phoneLabel(p, lang)]),
    wa: SITE.whatsapp,
    viber: SITE.viber,
    email: SITE.email,
    socials: SOCIALS.map((s) => [s.id, s.name, s.url]),
    urls: {
      book: url('rezervo'),
      prep: url('pergatitja'),
      panels: url('paketat'),
      services: url('sherbimet'),
      faq: url('pyetje'),
      tests: url('analizat'),
      map: `${url('kontakt')}#harta`,
    },
    services: SERVICES.map((s) => ({ slug: s.slug, name: L(s.name, lang), short: L(s.short, lang), url: url(`sherbim/${s.slug}`), w: SERVICE_WORDS[s.slug] ?? [] })),
    panels: PANELS.map((p) => [L(p.name, lang), `${url('paketat')}#paketa-${p.id}`]),
    prep: Object.keys(PREP).map((k) => ({ k, title: L(PREP[k].short, lang), text: L(PREP[k].text, lang), url: `${url('pergatitja')}#prep-${k}` })),
    faq: FAQ.map((f) => ({ id: f.id, q: L(f.q, lang), a: L(f.a, lang), url: `${url('pyetje')}#faq-${f.id}` })),
    intents: INTENTS,
    stop: STOP,
    catalogue,
  };
}
