// "Cila paketë ju përshtatet?" — a three-step guide on /paketat/ that suggests check-ups from PANELS: who it is for,
// sex and age, and what the visitor is interested in. It runs in the browser (assets/finder.js), sends nothing, and
// says plainly that the doctor decides. The rules (which interest leads to which panel) are in finder.js.
import { PANELS } from '../data/tests.mjs';
import { esc, h, icon, dict, L } from './html.mjs';
import { sectionHead, panelMessage, testName } from './parts.mjs';

const T = dict('finder', {
  sq: {
    eyebrow: 'Në tre hapa',
    title: 'Cila paketë *ju përshtatet*?',
    text: 'Zgjidhni për kë është dhe çfarë ju intereson — ju sugjerojmë paketat që ju përshtaten. Mjeku juaj vendos përfundimisht.',
    q1: 'Për kë është?',
    me: 'Për mua',
    child: 'Për fëmijën tim',
    q2: 'Pak për ju',
    sex: 'Gjinia',
    f: 'Grua',
    m: 'Burrë',
    x: 'Nuk dua ta them',
    age: 'Mosha',
    u40: 'Nën 40 vjeç',
    o40: '40 vjeç e lart',
    q3: 'Çfarë ju intereson?',
    q3_hint: 'Zgjidhni një ose më shumë.',
    c_routine: 'Kontroll i rregullt',
    c_tired: 'Lodhje, rënie flokësh',
    c_sugar: 'Sheqeri, diabeti',
    c_heart: 'Zemra, tensioni, kolesteroli',
    c_thyroid: 'Tiroidja, ndryshim peshe',
    c_kidney: 'Veshkat, urina',
    c_liver: 'Mëlçia',
    c_joints: 'Nyjet, dhimbjet',
    c_stomach: 'Stomaku, zorrët',
    c_allergy: 'Alergjitë',
    c_hormones: 'Cikli, hormonet',
    c_pregnancy: 'Shtatzënia',
    c_bones: 'Kockat',
    c_surgery: 'Para operacionit',
    c_infections: 'Hepatitet, HIV',
    c_child_tired: 'Zbehje, lodhje, oreks i dobët',
    c_child_stomach: 'Dhimbje barku',
    result: 'Ju sugjerojmë',
    result_more: 'Për sugjerime më të sakta, zgjidhni çfarë ju intereson.',
    see: 'Shiko paketën',
    tests: 'analiza',
    add: 'Shto paketën në listë',
    added: 'Paketa është në listë',
    ask: 'Pyet për çmimin',
    note: 'Sugjerim, jo diagnozë: analizat që ju duhen i vendos mjeku juaj. Nëse keni dyshime, na pyesni.',
    teaser: 'Nuk e dini cilën? Gjeni paketën tuaj në tre hapa',
  },
  en: {
    eyebrow: 'In three steps',
    title: 'Which check-up *suits you*?',
    text: 'Choose who it is for and what you are interested in — we suggest the check-ups that match your answers. Your doctor has the final say.',
    q1: 'Who is it for?',
    me: 'For me',
    child: 'For my child',
    q2: 'A little about you',
    sex: 'Sex',
    f: 'Woman',
    m: 'Man',
    x: 'Prefer not to say',
    age: 'Age',
    u40: 'Under 40',
    o40: '40 or over',
    q3: 'What are you interested in?',
    q3_hint: 'Choose one or more.',
    c_routine: 'A regular check-up',
    c_tired: 'Tiredness, hair loss',
    c_sugar: 'Blood sugar, diabetes',
    c_heart: 'Heart, blood pressure, cholesterol',
    c_thyroid: 'Thyroid, weight change',
    c_kidney: 'Kidneys, urine',
    c_liver: 'Liver',
    c_joints: 'Joints, aches',
    c_stomach: 'Stomach, bowel',
    c_allergy: 'Allergies',
    c_hormones: 'Cycle, hormones',
    c_pregnancy: 'Pregnancy',
    c_bones: 'Bones',
    c_surgery: 'Before surgery',
    c_infections: 'Hepatitis, HIV',
    c_child_tired: 'Paleness, tiredness, poor appetite',
    c_child_stomach: 'Tummy aches',
    result: 'We suggest',
    result_more: 'For more accurate suggestions, choose what you are interested in.',
    see: 'See the check-up',
    tests: 'tests',
    add: 'Add the check-up to my list',
    added: 'The check-up is on your list',
    ask: 'Ask for the price',
    note: 'A suggestion, not a diagnosis: your doctor decides which tests you need. If in doubt, ask us.',
    teaser: 'Not sure which? Find your check-up in three steps',
  },
  de: {
    eyebrow: 'In drei Schritten',
    title: 'Welcher Check-up *passt zu Ihnen*?',
    text: 'Wählen Sie, für wen er ist und was Sie interessiert — wir schlagen Ihnen die passenden Check-ups vor. Die endgültige Entscheidung trifft Ihre Ärztin oder Ihr Arzt.',
    q1: 'Für wen ist der Check-up?',
    me: 'Für mich',
    child: 'Für mein Kind',
    q2: 'Ein wenig über Sie',
    sex: 'Geschlecht',
    f: 'Frau',
    m: 'Mann',
    x: 'Keine Angabe',
    age: 'Alter',
    u40: 'Unter 40',
    o40: '40 oder älter',
    q3: 'Was interessiert Sie?',
    q3_hint: 'Wählen Sie eines oder mehrere.',
    c_routine: 'Regelmäßige Kontrolle',
    c_tired: 'Müdigkeit, Haarausfall',
    c_sugar: 'Blutzucker, Diabetes',
    c_heart: 'Herz, Blutdruck, Cholesterin',
    c_thyroid: 'Schilddrüse, Gewichtsveränderung',
    c_kidney: 'Nieren, Urin',
    c_liver: 'Leber',
    c_joints: 'Gelenke, Schmerzen',
    c_stomach: 'Magen, Darm',
    c_allergy: 'Allergien',
    c_hormones: 'Zyklus, Hormone',
    c_pregnancy: 'Schwangerschaft',
    c_bones: 'Knochen',
    c_surgery: 'Vor einer Operation',
    c_infections: 'Hepatitis, HIV',
    c_child_tired: 'Blässe, Müdigkeit, wenig Appetit',
    c_child_stomach: 'Bauchschmerzen',
    result: 'Unser Vorschlag',
    result_more: 'Für einen genaueren Vorschlag wählen Sie, was Sie interessiert.',
    see: 'Check-up ansehen',
    tests: 'Analysen',
    add: 'Check-up zur Liste hinzufügen',
    added: 'Check-up ist auf Ihrer Liste',
    ask: 'Nach dem Preis fragen',
    note: 'Ein Vorschlag, keine Diagnose: Welche Analysen Sie brauchen, entscheidet Ihre Ärztin oder Ihr Arzt. Fragen Sie uns, wenn Sie unsicher sind.',
    teaser: 'Unsicher? Finden Sie Ihren Check-up in drei Schritten',
  },
});

// The interests offered to adults and to children (keys of T: c_<key>). Rules: assets/finder.js.
const ADULT = ['routine', 'tired', 'sugar', 'heart', 'thyroid', 'kidney', 'liver', 'joints', 'stomach', 'allergy', 'bones', 'hormones', 'pregnancy', 'surgery', 'infections'];
const CHILD = ['routine', 'child_tired', 'child_stomach', 'allergy'];

const radio = (name, value, label, checked = false) =>
  h`<label><input type="radio" name="${name}" value="${value}"${checked && ' checked'} /><span>${esc(label)}</span></label>`;
// data-for: who sees the interest — adult, child or both
const check = (key, t) =>
  h`<label class="finder-chip" data-for="${ADULT.includes(key) && CHILD.includes(key) ? 'both' : ADULT.includes(key) ? 'adult' : 'child'}"><input type="checkbox" name="c" value="${key}" /><span>${icon('check', { size: 16 })}${esc(t[`c_${key}`])}</span></label>`;

/** The finder section (id "gjej") for /paketat/, with its data and script. */
export function checkupFinder(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const data = {
    t: { result: t.result, result_more: t.result_more, see: t.see, tests: t.tests, add: t.add, added: t.added, ask: t.ask },
    panels: Object.fromEntries(
      PANELS.map((p) => [p.id, { n: L(p.name, lang), f: L(p.for, lang), i: p.icon, t: p.tests.join(','), l: p.tests.map((id) => testName(id, lang)).join(' · '), w: ctx.wa(panelMessage(ctx, p)) }]),
    ),
  };
  return h`<section class="section section-tight finder-section js-only" id="gjej" aria-labelledby="h-finder">
    <div class="wrap">
      <div class="finder">
        ${sectionHead({ eyebrow: t.eyebrow, title: t.title, text: t.text, id: 'h-finder' })}
        <form class="finder-form" data-finder novalidate>
          <fieldset class="finder-q">
            <legend><span class="finder-num" aria-hidden="true">1</span>${esc(t.q1)}</legend>
            <div class="seg">${radio('who', 'me', t.me, true)}${radio('who', 'child', t.child)}</div>
          </fieldset>
          <fieldset class="finder-q" data-adult>
            <legend><span class="finder-num" aria-hidden="true">2</span>${esc(t.q2)}</legend>
            <div class="finder-pair">
              <fieldset><legend class="finder-sub">${esc(t.sex)}</legend><div class="seg">${radio('sex', 'f', t.f)}${radio('sex', 'm', t.m)}${radio('sex', 'x', t.x)}</div></fieldset>
              <fieldset><legend class="finder-sub">${esc(t.age)}</legend><div class="seg">${radio('age', 'u40', t.u40)}${radio('age', 'o40', t.o40)}</div></fieldset>
            </div>
          </fieldset>
          <fieldset class="finder-q">
            <legend><span class="finder-num" aria-hidden="true" data-step3>3</span>${esc(t.q3)} <span class="finder-hint">${esc(t.q3_hint)}</span></legend>
            <div class="finder-chips">${[...ADULT, ...CHILD.filter((k) => !ADULT.includes(k))].map((k) => check(k, t))}</div>
          </fieldset>
        </form>
        <div class="finder-result" data-finder-result></div>
        <p class="sr-only" aria-live="polite" data-finder-status></p>
        <p class="finder-note">${icon('info', { size: 16 })}<span>${esc(t.note)}</span></p>
      </div>
    </div>
    <script type="application/json" id="hp-finder">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
    <script src="${ctx.base}assets/finder.js?v=${ctx.version}" defer></script>
  </section>`;
}

/** A link to the finder, for the check-ups section of the home page. */
export const finderTeaser = (ctx) =>
  h`<a class="finder-teaser js-only" href="${esc(ctx.url('paketat'))}#gjej">${icon('sparkles', { size: 18 })}<span>${esc(T[ctx.lang].teaser)}</span>${icon('arrow-right', { size: 18 })}</a>`;
