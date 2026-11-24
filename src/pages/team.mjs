// /stafi/ — the clinic's doctors and staff (src/data/team.mjs), grouped as specialist doctors, laboratory, nursing and
// reception, and /stafi/<slug>/ — one biography page per person. Only real people with their permission; until the
// clinic sends the details, /stafi/ says that the profiles are being prepared and shows the team's roles. README → Staff.
import { SITE } from '../data/site.mjs';
import { SERVICES } from '../data/services.mjs';
import { TEAM, TEAM_GROUPS } from '../data/team.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { pageHero, sectionHead, ctaBand } from '../lib/parts.mjs';
import { photo, hasPhoto } from '../lib/photo.mjs';
import { teamRoles } from './centre.mjs';

const T = dict('team', {
  sq: {
    title: 'Stafi — mjekët dhe ekipi i Human+',
    desc: 'Njihuni me mjekët specialistë, ekipin e laboratorit, infermierët dhe recepsionin e Human+ Qendra Diagnostike në Prishtinë.',
    eyebrow: 'Stafi',
    h1: 'Njerëzit pas *Human+*.',
    lead: 'Mjekët specialistë, ekipi i laboratorit, infermierët dhe recepsioni — njerëzit që ju presin kur vini në qendër.',
    g_doctor: 'Mjekët specialistë',
    g_lab: 'Laboratori',
    g_nurse: 'Infermieria',
    g_reception: 'Recepsioni',
    empty_h: 'Profilet e stafit po përgatiten',
    empty_t: 'Këtu do të gjeni emrat, specialitetet dhe biografitë e mjekëve dhe të stafit. Deri atëherë, recepsioni ju tregon cili mjek pret dhe kur.',
    roles_h: 'Kush punon në Human+',
    profile: 'Biografia',
    bio: 'Biografia',
    education: 'Arsimimi',
    languages: 'Gjuhët',
    works_in: 'Punon në',
    book_h: 'Rezervoni ose pyetni',
    book_t: 'Recepsioni ju kthen përgjigje dhe e konfirmon orën.',
    wa_msg: 'Përshëndetje Human+! Kam një pyetje për {name}.',
    all: 'Të gjithë stafi',
    on_service: 'Kush ju pret',
    member_desc: '{name} — {title} në Human+ Qendra Diagnostike, Prishtinë.',
  },
  en: {
    title: 'Our team — the doctors and staff of Human+',
    desc: 'Meet the specialist doctors, the laboratory team, the nurses and the reception of Human+ Diagnostic Centre in Prishtina.',
    eyebrow: 'Our team',
    h1: 'The people behind *Human+*.',
    lead: 'Specialist doctors, the laboratory team, nurses and reception — the people who welcome you at the centre.',
    g_doctor: 'Specialist doctors',
    g_lab: 'Laboratory',
    g_nurse: 'Nursing',
    g_reception: 'Reception',
    empty_h: 'Staff profiles are being prepared',
    empty_t: 'Here you will find the names, specialties and biographies of our doctors and staff. Until then, reception can tell you which doctor is seeing patients and when.',
    roles_h: 'Who works at Human+',
    profile: 'Biography',
    bio: 'Biography',
    education: 'Education',
    languages: 'Languages',
    works_in: 'Works in',
    book_h: 'Book or ask',
    book_t: 'Reception replies and confirms the time.',
    wa_msg: 'Hello Human+! I have a question about {name}.',
    all: 'All staff',
    on_service: 'Who will see you',
    member_desc: '{name} — {title} at Human+ Diagnostic Centre, Prishtina.',
  },
  de: {
    title: 'Unser Team — Ärzte und Mitarbeitende von Human+',
    desc: 'Lernen Sie die Fachärzte, das Laborteam, die Pflegekräfte und die Rezeption des Human+ Diagnostikzentrums in Prishtina kennen.',
    eyebrow: 'Unser Team',
    h1: 'Die Menschen hinter *Human+*.',
    lead: 'Fachärzte, das Laborteam, Pflegekräfte und die Rezeption — die Menschen, die Sie im Zentrum empfangen.',
    g_doctor: 'Fachärzte',
    g_lab: 'Labor',
    g_nurse: 'Pflege',
    g_reception: 'Rezeption',
    empty_h: 'Die Profile unseres Teams werden vorbereitet',
    empty_t: 'Hier finden Sie die Namen, Fachrichtungen und Lebensläufe unserer Ärzte und Mitarbeitenden. Bis dahin sagt Ihnen die Rezeption, welcher Arzt wann Sprechstunde hat.',
    roles_h: 'Wer bei Human+ arbeitet',
    profile: 'Zum Profil',
    bio: 'Lebenslauf',
    education: 'Ausbildung',
    languages: 'Sprachen',
    works_in: 'Tätig in',
    book_h: 'Buchen oder fragen',
    book_t: 'Die Rezeption antwortet Ihnen und bestätigt die Uhrzeit.',
    wa_msg: 'Hallo Human+! Ich habe eine Frage zu {name}.',
    all: 'Das ganze Team',
    on_service: 'Wer Sie betreut',
    member_desc: '{name} — {title} im Human+ Diagnostikzentrum, Prishtina.',
  },
});

const LANGS = ['sq', 'en', 'de'];
const SERVICE_BY_SLUG = new Map(SERVICES.map((s) => [s.slug, s]));

// The list must be complete before it is published: a missing translation or an unknown service stops the build.
(function check() {
  const seen = new Set();
  const full = (v) => v && LANGS.every((l) => (Array.isArray(v[l]) ? v[l].length && v[l].every((x) => String(x).trim()) : String(v[l] ?? '').trim()));
  for (const m of TEAM) {
    const who = m.slug || m.name || '(no slug)';
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(m.slug ?? '') || seen.has(m.slug)) throw new Error(`team.mjs: slug "${m.slug}" missing, invalid or repeated`);
    seen.add(m.slug);
    if (!String(m.name ?? '').trim()) throw new Error(`team.mjs ${who}: name missing`);
    if (!TEAM_GROUPS.includes(m.group)) throw new Error(`team.mjs ${who}: group must be one of ${TEAM_GROUPS.join(', ')}`);
    for (const s of m.services ?? []) if (!SERVICE_BY_SLUG.has(s)) throw new Error(`team.mjs ${who}: unknown service "${s}"`);
    if (!full(m.title)) throw new Error(`team.mjs ${who}: title needs sq, en and de`);
    if (!full(m.bio)) throw new Error(`team.mjs ${who}: bio needs sq, en and de`);
    if (m.education && !full(m.education)) throw new Error(`team.mjs ${who}: education needs sq, en and de`);
  }
})();

const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
// Initials for the profile picture until the person's photo is in src/assets/photos/ (titles such as "Dr." skipped).
const initials = (name) => {
  const w = name.replace(/\b(prof|dr|mr|mag|doc|sc|med|spec|ass)\.?(?=\s|$)/gi, ' ').split(/\s+/).filter((x) => /^\p{L}/u.test(x));
  return ((w[0]?.[0] ?? '') + (w.length > 1 ? w[w.length - 1][0] : '')).toUpperCase();
};
const picture = (ctx, m, { eager = false, sizes } = {}) => {
  const slot = `stafi-${m.slug}`;
  return hasPhoto(slot)
    ? photo(ctx, slot, { cls: 'staff-photo', eager, sizes, fallback: { scene: 'doctor', alt: { sq: m.name, en: m.name, de: m.name } } })
    : h`<div class="staff-photo staff-initials" aria-hidden="true"><span>${esc(initials(m.name))}</span></div>`;
};
const serviceNames = (m, lang) => (m.services ?? []).map((s) => L(SERVICE_BY_SLUG.get(s).nameShort ?? SERVICE_BY_SLUG.get(s).name, lang));

/** One person's card, linking to their biography (also used on the service pages). */
export function staffCard(ctx, m) {
  const { lang } = ctx;
  const t = T[lang];
  return h`<li class="staff-card reveal"><a href="${esc(ctx.url(`stafi/${m.slug}`))}">
    ${picture(ctx, m, { sizes: '(min-width: 960px) 22vw, (min-width: 560px) 45vw, 100vw' })}
    <span class="staff-text">
      <strong class="staff-name">${esc(m.name)}</strong>
      <span class="staff-role">${esc(L(m.title, lang))}</span>
      ${m.services?.length ? h`<span class="staff-svc">${esc(serviceNames(m, lang).join(' · '))}</span>` : ''}
      <span class="svc-more">${esc(t.profile)}<span class="sr-only">: ${esc(m.name)}</span>${icon('arrow-right', { size: 18 })}</span>
    </span>
  </a></li>`;
}

// Doctors in the order of their first service on the site, then by name; everyone else by name.
const order = (list) => {
  const pos = (m) => Math.min(...(m.services ?? []).map((s) => SERVICES.findIndex((x) => x.slug === s)), 99);
  return [...list].sort((a, b) => pos(a) - pos(b) || a.name.localeCompare(b.name, 'sq'));
};

/** The people who work in one service (for its page), or '' while there are none. */
export function serviceStaff(ctx, slug) {
  const people = order(TEAM.filter((m) => (m.services ?? []).includes(slug)));
  if (!people.length) return '';
  const t = T[ctx.lang];
  return h`<section class="section section-tight" aria-labelledby="h-staff">
    <div class="wrap">
      <div class="split-head">
        ${sectionHead({ eyebrow: UI[ctx.lang].nav_team, title: t.on_service, id: 'h-staff' })}
        <a class="btn btn-outline" href="${esc(ctx.url('stafi'))}">${esc(t.all)}${icon('arrow-right', { size: 18 })}</a>
      </div>
      <ul class="staff-grid">${people.map((m) => staffCard(ctx, m))}</ul>
    </div>
  </section>`;
}

export function teamPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const hero = pageHero(ctx, { trail: [[t.eyebrow, 'stafi']], eyebrow: t.eyebrow, title: t.h1, lead: t.lead });
  const groups = TEAM_GROUPS.map((g) => [g, order(TEAM.filter((m) => m.group === g))]).filter(([, list]) => list.length);
  const body = groups.length
    ? h`<section class="section section-tight"><div class="wrap svc-groups">${groups.map(
        ([g, list]) => h`<div class="svc-group" id="${g}">
          <div class="svc-group-head"><h2 class="group-title">${esc(t[`g_${g}`])}</h2></div>
          <ul class="staff-grid">${list.map((m) => staffCard(ctx, m))}</ul>
        </div>`,
      )}</div></section>`
    : h`<section class="section section-tight"><div class="wrap">
        <div class="empty-panel">
          <span class="tile tile-brand tile-lg">${icon('users', { size: 30 })}</span>
          <div>
            <h2>${esc(t.empty_h)}</h2>
            <p>${esc(t.empty_t)}</p>
            <div class="actions">
              <a class="btn btn-primary" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 18 })}${esc(SITE.phones[0].display)}</a>
              <a class="btn btn-wa" href="${esc(ctx.wa())}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}WhatsApp</a>
            </div>
          </div>
        </div>
      </div></section>
      <section class="section section-tint" aria-labelledby="h-roles"><div class="wrap">
        <h2 class="group-title" id="h-roles">${esc(t.roles_h)}</h2>
        ${teamRoles(ctx)}
      </div></section>`;
  return {
    id: 'team',
    title: `${t.title} · ${SITE.name}`,
    description: t.desc,
    jsonld: [hero.jsonld],
    body: hero.html + body + ctaBand(ctx, { title: UI[lang].call_us, text: t.lead }),
  };
}

export function memberPage(ctx, m) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const title = L(m.title, lang);
  const first = m.services?.[0];
  const book = `${ctx.url('rezervo')}${first ? `?sherbimi=${first}` : ''}`;
  const hero = pageHero(ctx, {
    trail: [[t.eyebrow, 'stafi'], [m.name, `stafi/${m.slug}`]],
    eyebrow: t[`g_${m.group}`],
    title: m.name,
    lead: [title, ...serviceNames(m, lang)].join(' · '),
    cls: 'member-hero',
    aside: h`<div class="member-pic">${picture(ctx, m, { eager: true, sizes: '(min-width: 960px) 26vw, 60vw' })}</div>`,
  });
  const names = new Intl.DisplayNames([lang], { type: 'language' });
  // English and German write language names with a capital; Albanian in lower case (only the list's first word up)
  const langs = (m.languages ?? []).map((c, i) => {
    const n = names.of(c) ?? c;
    return lang === 'sq' && i > 0 ? n.toLowerCase() : n.charAt(0).toUpperCase() + n.slice(1);
  });
  const body = h`<section class="section section-tight" aria-labelledby="h-bio">
    <div class="wrap svc-layout">
      <div class="member-body">
        <h2 id="h-bio">${esc(t.bio)}</h2>
        ${L(m.bio, lang).map((p) => h`<p>${esc(p)}</p>`)}
        ${m.education ? h`<h2>${esc(t.education)}</h2><ul class="ticks">${L(m.education, lang).map((e) => h`<li>${icon('circle-check', { size: 20 })}<span>${esc(e)}</span></li>`)}</ul>` : ''}
        ${langs.length ? h`<h2>${esc(t.languages)}</h2><p>${esc(langs.join(' · '))}</p>` : ''}
        ${m.services?.length ? h`<h2>${esc(t.works_in)}</h2><ul class="pill-links">${m.services.map((slug) => {
          const s = SERVICE_BY_SLUG.get(slug);
          return h`<li><a href="${esc(ctx.url(`sherbim/${slug}`))}"><span class="tile tile-${s.tone} tile-sm">${icon(s.icon, { size: 16 })}</span>${esc(L(s.nameShort ?? s.name, lang))}</a></li>`;
        })}</ul>` : ''}
        <p class="member-back"><a href="${esc(ctx.url('stafi'))}">${icon('arrow-left', { size: 18 })}${esc(t.all)}</a></p>
      </div>
      <aside class="svc-aside"><div class="aside-card sticky">
        <h2>${esc(t.book_h)}</h2>
        <p>${esc(t.book_t)}</p>
        <a class="btn btn-primary btn-block" href="${esc(book)}">${icon('calendar-check', { size: 18 })}${esc(u.book)}</a>
        <a class="btn btn-wa btn-block" href="${esc(ctx.wa(fill(t.wa_msg, { name: m.name })))}" target="_blank" rel="noopener">${brand('whatsapp', { size: 18 })}WhatsApp</a>
        <a class="btn btn-outline btn-block" href="tel:${SITE.phones[0].tel}">${icon('phone', { size: 18 })}${esc(SITE.phones[0].display)}</a>
      </div></aside>
    </div>
  </section>`;
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: title,
    url: ctx.abs(`stafi/${m.slug}`),
    worksFor: { '@id': ctx.clinicId },
    ...(langs.length ? { knowsLanguage: m.languages } : {}),
  };
  return {
    id: 'member',
    title: `${m.name} · ${title} · ${SITE.name}`,
    description: fill(t.member_desc, { name: m.name, title }),
    jsonld: [hero.jsonld, personLd],
    body: hero.html + body,
  };
}

export const TEAM_ROUTES = TEAM.map((m) => [`stafi/${m.slug}`, (ctx) => memberPage(ctx, m)]);
