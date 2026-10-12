// /paketat/ (check-ups) and /pergatitja/ (preparation guide). The catalogue /analizat/ is in catalogue.mjs.
import { SITE } from '../data/site.mjs';
import { TESTS, CATEGORIES, PANELS, PANEL_GROUPS, PREP } from '../data/tests.mjs';
import { UI } from '../data/ui.mjs';
import { esc, h, icon, brand, dict, L } from '../lib/html.mjs';
import { pageHero, sectionHead, testRow, testSearch, panelCard, ctaBand } from '../lib/parts.mjs';

const T = dict('lab', {
  sq: {
    panels_title: 'Paketat check-up — analiza të grupuara sipas nevojës',
    panels_desc: 'Paketat check-up në Human+ Prishtinë: check-up bazë dhe për fëmijë, diabeti, zemra, tiroidja, veshkat, mëlçia, anemia, sëmundjet autoimune, hormonet, shtatzënia, para operacionit dhe më shumë.',
    panels_nav: 'Grupet e paketave',
    panels_eyebrow: 'Paketat',
    panels_h1: 'Check-up i menduar *për ju*.',
    panels_lead: 'Analizat që shkojnë bashkë, të grupuara sipas moshës dhe nevojës. Shtoni një paketë në listë ose pyetni për çmimin — paketën mund ta përshtatim me udhëzimin e mjekut tuaj.',
    panels_cta_title: 'Doni një paketë *ndryshe*?',
    panels_cta_text: 'Na shkruani çfarë ju intereson — e përbëjmë paketën me ju dhe me mjekun tuaj.',
    prep_title: 'Përgatitja për analiza — esëll, urina, feçe, hormonet',
    prep_desc: 'Si të përgatiteni për analizat në Human+ Prishtinë: kur duhet të vini esëll, si mblidhet urina dhe feçja, hormonet sipas ditës së ciklit, PSA dhe analizat te fëmijët.',
    prep_eyebrow: 'Përgatitja',
    prep_h1: 'Përgatitja e duhur, *rezultat* i saktë.',
    prep_lead: 'Shumica e analizave kërkojnë pak ose aspak përgatitje — por për disa, ushqimi, ora e ditës apo dita e ciklit ndryshojnë rezultatin. Këtu i gjeni rregullat kryesore.',
    general: 'Rregullat e përgjithshme',
    g1: 'Ejani në mëngjes, mundësisht ndërmjet orës 07:30 dhe 10:00.',
    g2: 'Për analizat që kërkojnë agjërim: 8–12 orë pa ngrënë. Uji i thjeshtë lejohet.',
    g3: 'Një ditë më parë: pa alkool, pa ushqime shumë të yndyrshme dhe pa ushtrime të rënda.',
    g4: 'Mos ndërprisni asnjë bar pa folur me mjekun; na tregoni çfarë barnash merrni.',
    g5: 'Sillni dokumentin e identifikimit, udhëzimin e mjekut dhe analizat e mëparshme.',
    by_type: 'Sipas llojit të analizës',
    used_by: 'P.sh.:',
    kids: 'Analizat te fëmijët',
    k1: 'Sillni librezën shëndetësore dhe analizat e mëparshme të fëmijës.',
    k2: 'Shpjegojini fëmijës me fjalë të thjeshta çfarë do të ndodhë — pa premtuar se “nuk dhemb”.',
    k3: 'Për foshnjat: pyetni për qeskat sterile për mbledhjen e urinës.',
    k4: 'Pas marrjes së gjakut: diçka për të pirë dhe një lodër e preferuar ndihmojnë.',
    bring: 'Mostrat që i sillni nga shtëpia',
    b1: 'Përdorni vetëm enë sterile (nga barnatorja ose nga laboratori).',
    b2: 'Shkruani emrin dhe orën e marrjes së mostrës në enë.',
    b3: 'Sillni mostrën brenda 2 orësh; mos e lini në nxehtësi.',
    disclaimer: 'Këto janë udhëzime të përgjithshme. Udhëzimet e mjekut tuaj kanë përparësi — kur keni dyshime, na telefononi.',
    prep_cta_title: 'Nuk jeni të sigurt si të *përgatiteni*?',
    prep_cta_text: 'Na shkruani analizat që keni — ju tregojmë saktësisht çfarë duhet të bëni.',
  },
  en: {
    panels_title: 'Check-ups — tests grouped by need',
    panels_desc: 'Check-ups at Human+ Prishtina: basic and children’s check-ups, diabetes, heart, thyroid, kidneys, liver, anaemia, autoimmune screening, hormones, pregnancy, before surgery and more.',
    panels_nav: 'Check-up groups',
    panels_eyebrow: 'Check-ups',
    panels_h1: 'Check-ups made *for you*.',
    panels_lead: 'Tests that belong together, grouped by age and need. Add a check-up to your list or ask for the price — we can adjust it to your doctor’s advice.',
    panels_cta_title: 'Want a *different* check-up?',
    panels_cta_text: 'Tell us what you are interested in — we put the check-up together with you and your doctor.',
    prep_title: 'Preparing for lab tests — fasting, urine, stool, hormones',
    prep_desc: 'How to prepare for tests at Human+ Prishtina: when to fast, how to collect urine and stool, hormones by cycle day, PSA and tests for children.',
    prep_eyebrow: 'Preparation',
    prep_h1: 'The right preparation, an *accurate* result.',
    prep_lead: 'Most tests need little or no preparation — but for some, food, the time of day or the cycle day change the result. Here are the main rules.',
    general: 'General rules',
    g1: 'Come in the morning, ideally between 07:30 and 10:00.',
    g2: 'For tests that need fasting: 8–12 hours without food. Plain water is fine.',
    g3: 'The day before: no alcohol, no very fatty food and no hard exercise.',
    g4: 'Do not stop any medicine without talking to your doctor; tell us which medicines you take.',
    g5: 'Bring an ID document, your doctor’s referral and any earlier results.',
    by_type: 'By type of test',
    used_by: 'E.g.:',
    kids: 'Tests for children',
    k1: 'Bring the health booklet and your child’s earlier results.',
    k2: 'Tell your child in simple words what will happen — without promising it “won’t hurt”.',
    k3: 'For babies: ask about sterile bags for collecting urine.',
    k4: 'After the blood test: something to drink and a favourite toy help.',
    bring: 'Samples you bring from home',
    b1: 'Use sterile containers only (from a pharmacy or from the lab).',
    b2: 'Write the name and the time of collection on the container.',
    b3: 'Bring the sample within 2 hours; do not leave it in the heat.',
    disclaimer: 'These are general guidelines. Your doctor’s instructions come first — when in doubt, call us.',
    prep_cta_title: 'Not sure how to *prepare*?',
    prep_cta_text: 'Send us the tests you have — we tell you exactly what to do.',
  },
  de: {
    panels_title: 'Check-ups — Analysen nach Bedarf zusammengestellt',
    panels_desc: 'Check-ups bei Human+ Prishtina: Basis- und Kinder-Check-up, Diabetes, Herz, Schilddrüse, Nieren, Leber, Anämie, Autoimmun-Screening, Hormone, Schwangerschaft, vor einer Operation und mehr.',
    panels_nav: 'Check-up-Gruppen',
    panels_eyebrow: 'Check-ups',
    panels_h1: 'Check-ups, *für Sie* zusammengestellt.',
    panels_lead: 'Analysen, die zusammengehören, gruppiert nach Alter und Bedarf. Fügen Sie einen Check-up Ihrer Liste hinzu oder fragen Sie nach dem Preis — wir können ihn an die Empfehlung Ihres Arztes anpassen.',
    panels_cta_title: 'Möchten Sie einen *anderen* Check-up?',
    panels_cta_text: 'Sagen Sie uns, was Sie interessiert — wir stellen den Check-up gemeinsam mit Ihnen und Ihrem Arzt zusammen.',
    prep_title: 'Vorbereitung auf Laboranalysen — nüchtern, Urin, Stuhl, Hormone',
    prep_desc: 'So bereiten Sie sich auf Analysen bei Human+ Prishtina vor: wann Sie nüchtern kommen sollten, wie Sie Urin und Stuhl sammeln, Hormone nach Zyklustag, PSA und Analysen bei Kindern.',
    prep_eyebrow: 'Vorbereitung',
    prep_h1: 'Die richtige Vorbereitung, ein *genaues* Ergebnis.',
    prep_lead: 'Die meisten Analysen erfordern wenig oder gar keine Vorbereitung — bei einigen verändern jedoch Essen, Tageszeit oder Zyklustag das Ergebnis. Hier finden Sie die wichtigsten Regeln.',
    general: 'Allgemeine Regeln',
    g1: 'Kommen Sie morgens, am besten zwischen 07:30 und 10:00 Uhr.',
    g2: 'Für Analysen, bei denen Sie nüchtern sein müssen: 8–12 Stunden nichts essen. Reines Wasser ist erlaubt.',
    g3: 'Am Vortag: kein Alkohol, keine sehr fettreichen Speisen und keine schwere körperliche Anstrengung.',
    g4: 'Setzen Sie kein Medikament ab, ohne mit Ihrem Arzt zu sprechen; sagen Sie uns, welche Medikamente Sie einnehmen.',
    g5: 'Bringen Sie einen Ausweis, die Überweisung Ihres Arztes und frühere Befunde mit.',
    by_type: 'Nach Art der Analyse',
    used_by: 'Z. B.:',
    kids: 'Analysen bei Kindern',
    k1: 'Bringen Sie das Gesundheitsheft und frühere Befunde Ihres Kindes mit.',
    k2: 'Erklären Sie Ihrem Kind in einfachen Worten, was passieren wird — ohne zu versprechen, dass es „nicht wehtut“.',
    k3: 'Bei Babys: Fragen Sie nach sterilen Beuteln zum Auffangen von Urin.',
    k4: 'Nach der Blutabnahme helfen etwas zu trinken und ein Lieblingsspielzeug.',
    bring: 'Proben, die Sie von zu Hause mitbringen',
    b1: 'Verwenden Sie nur sterile Gefäße (aus der Apotheke oder vom Labor).',
    b2: 'Schreiben Sie den Namen und die Uhrzeit der Probenentnahme auf das Gefäß.',
    b3: 'Bringen Sie die Probe innerhalb von 2 Stunden vorbei; lassen Sie sie nicht in der Wärme stehen.',
    disclaimer: 'Dies sind allgemeine Hinweise. Die Anweisungen Ihres Arztes haben Vorrang — im Zweifel rufen Sie uns an.',
    prep_cta_title: 'Unsicher, wie Sie sich *vorbereiten* sollen?',
    prep_cta_text: 'Schicken Sie uns die Analysen, die Sie machen lassen möchten — wir sagen Ihnen genau, was zu tun ist.',
  },
});

export function panelsPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const hero = pageHero(ctx, { trail: [[u.nav_panels, 'paketat']], eyebrow: t.panels_eyebrow, title: t.panels_h1, lead: t.panels_lead, photo: 'lab' });
  const byId = new Map(PANELS.map((p) => [p.id, p]));
  const body = h`<section class="section section-tight">
    <div class="wrap">
      <nav class="panel-nav" aria-label="${esc(t.panels_nav)}"><ul>${PANEL_GROUPS.map((g) => h`<li><a href="#${g.id}">${esc(L(g.name, lang))}<span>${g.panels.length}</span></a></li>`)}</ul></nav>
      ${PANEL_GROUPS.map((g) => h`<section class="panel-group" id="${g.id}" aria-labelledby="h-${g.id}">
        <h2 id="h-${g.id}">${esc(L(g.name, lang))}</h2>
        <div class="panel-grid panel-grid-full">${g.panels.map((id) => panelCard(ctx, byId.get(id), { full: true }))}</div>
      </section>`)}
    </div>
  </section>`;
  return {
    id: 'panels',
    title: `${t.panels_title} · ${SITE.name}`,
    description: t.panels_desc,
    jsonld: [hero.jsonld],
    body: hero.html + body + ctaBand(ctx, { title: t.panels_cta_title, text: t.panels_cta_text }),
  };
}

const PREP_ICON = { none: 'circle-check', morning: 'sunrise', fasting: 'utensils-crossed', ogtt: 'hourglass', rest: 'bed', cycle: 'calendar-days', psa: 'timer', urine: 'test-tubes', culture: 'shield-check', stool: 'flask-conical', swab: 'syringe', vaginal: 'venus' };

export function prepPage(ctx) {
  const { lang } = ctx;
  const t = T[lang];
  const u = UI[lang];
  const hero = pageHero(ctx, { trail: [[u.nav_prep, 'pergatitja']], eyebrow: t.prep_eyebrow, title: t.prep_h1, lead: t.prep_lead, photo: 'sampling' });
  const general = h`<section class="section section-tight" aria-labelledby="h-general">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.prep_eyebrow, title: t.general, id: 'h-general' })}
      <ol class="rules">${[t.g1, t.g2, t.g3, t.g4, t.g5].map((g, i) => h`<li class="reveal"><span class="rule-num">${String(i + 1).padStart(2, '0')}</span><p>${esc(g)}</p></li>`)}</ol>
    </div>
  </section>`;
  const types = Object.keys(PREP).filter((k) => k !== 'none');
  const byType = h`<section class="section section-tint" aria-labelledby="h-types">
    <div class="wrap">
      ${sectionHead({ eyebrow: t.prep_eyebrow, title: t.by_type, id: 'h-types' })}
      <div class="prep-grid">${types.map((k) => {
        const tests = TESTS.filter((x) => x.prep === k).slice(0, 6);
        return h`<article class="prep-card reveal" id="prep-${k}">
          <span class="tile tile-brand">${icon(PREP_ICON[k] ?? 'info', { size: 22 })}</span>
          <h3>${esc(L(PREP[k].short, lang))}</h3>
          <p>${esc(L(PREP[k].text, lang))}</p>
          ${tests.length > 0 && h`<p class="prep-tests"><span>${esc(t.used_by)}</span> ${esc(tests.map((x) => L(x.name, lang)).join(', '))}</p>`}
        </article>`;
      })}
        <article class="prep-card reveal" id="prep-none">
          <span class="tile tile-mint">${icon('circle-check', { size: 22 })}</span>
          <h3>${esc(L(PREP.none.short, lang))}</h3>
          <p>${esc(L(PREP.none.text, lang))}</p>
          <p class="prep-tests"><span>${esc(t.used_by)}</span> ${esc(TESTS.filter((x) => x.prep === 'none').slice(0, 6).map((x) => L(x.name, lang)).join(', '))}</p>
        </article>
      </div>
    </div>
  </section>`;
  const extra = h`<section class="section" aria-label="${esc(t.kids)}">
    <div class="wrap two-col">
      <div class="info-card reveal">
        <span class="tile tile-sun">${icon('baby', { size: 22 })}</span>
        <h2>${esc(t.kids)}</h2>
        <ul class="ticks">${[t.k1, t.k2, t.k3, t.k4].map((k) => h`<li>${icon('circle-check', { size: 20 })}<span>${esc(k)}</span></li>`)}</ul>
      </div>
      <div class="info-card reveal">
        <span class="tile tile-sky">${icon('test-tubes', { size: 22 })}</span>
        <h2>${esc(t.bring)}</h2>
        <ul class="ticks">${[t.b1, t.b2, t.b3].map((k) => h`<li>${icon('circle-check', { size: 20 })}<span>${esc(k)}</span></li>`)}</ul>
      </div>
    </div>
    <div class="wrap"><p class="note">${icon('info', { size: 18 })}<span>${esc(t.disclaimer)}</span></p></div>
  </section>`;
  return {
    id: 'prep',
    title: `${t.prep_title} · ${SITE.name}`,
    description: t.prep_desc,
    jsonld: [hero.jsonld],
    body: hero.html + general + byType + extra + ctaBand(ctx, { title: t.prep_cta_title, text: t.prep_cta_text }),
  };
}
