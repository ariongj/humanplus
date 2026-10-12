// Imports a lab-catalogue export (the BeoLab reference catalogue the client supplied — schema 2.0, checked
// 2026-10-12, beolab-catalogue.js) into src/data/catalogue.json — the data behind /analizat/ and the test pages.
//
//   node scripts/import-catalogue.mjs <path-to-beolab-catalogue.json>
//
// Prefer the .json copy of the export: it is read as data. A .js export is imported as a module, which runs it.
//
// What is kept: lab tests and test panels with their Albanian name, Serbian name (search alias), category,
// sample, collection, preparation (with the editorial safety corrections of schema 2.0), short description,
// components and their links to other tests, the "good to know" note keys (src/data/lab-notes.mjs) and a page
// address (slug).
// What is dropped on purpose: prices (another lab's, in RSD), turnaround times, reference ranges, methods,
// editorial notes, source URLs and SKUs; the source lab's own consultations, promotions and marketing packages;
// every sentence that refers to the source lab or its website, and sentences that only talk about the source text. Human+ confirms availability, price and
// preparation itself (README → Lab catalogue).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { NOTE_FROM } from '../src/data/lab-notes.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/import-catalogue.mjs <path-to-beolab-catalogue.json>');
  process.exit(1);
}
const data = /\.json$/i.test(src)
  ? JSON.parse(fs.readFileSync(path.resolve(src), 'utf8'))
  : (await import(pathToFileURL(path.resolve(src)).href)).default;

// Source category → our id, English name, icon and German name. Categories not listed here are skipped.
const CATS = {
  'hematologija-i-hemostaza': ['hematologji', 'Haematology & haemostasis', 'droplet', 'Hämatologie und Hämostaseologie'],
  biohemija: ['biokimi', 'Biochemistry', 'flask-conical', 'Biochemie'],
  imunohemija: ['imunokimi', 'Immunochemistry', 'activity', 'Immunchemie'],
  'imunohemija-eliza': ['imunokimi-elisa', 'Immunochemistry (ELISA)', 'activity', 'Immunchemie (ELISA)'],
  'polni-hormoni': ['hormone-seksuale', 'Sex hormones', 'venus', 'Sexualhormone'],
  'testovi-u-trudnoci': ['shtatzeni', 'Pregnancy tests', 'baby', 'Schwangerschaftstests'],
  'tumor-markeri': ['markues-tumorale', 'Tumour markers', 'shield-check', 'Tumormarker'],
  alergologija: ['alergologji', 'Allergology', 'sparkles', 'Allergologie'],
  imunologija: ['imunologji', 'Immunology', 'shield-check', 'Immunologie'],
  serologija: ['serologji', 'Serology', 'test-tubes', 'Serologie'],
  'serologija-automatizovana': ['serologji-automatike', 'Automated serology', 'test-tubes', 'Automatisierte Serologie'],
  mikrobiologija: ['mikrobiologji', 'Microbiology', 'microscope', 'Mikrobiologie'],
  parazitologija: ['parazitologji', 'Parasitology', 'microscope', 'Parasitologie'],
  'genetika-pcr': ['gjenetike-pcr', 'Genetics (PCR)', 'activity', 'Genetik (PCR)'],
  'genetika-ngs': ['gjenetike-ngs', 'Genetics (NGS)', 'activity', 'Genetik (NGS)'],
  'nasledna-onkogenetika': ['onkogjenetike', 'Hereditary oncogenetics', 'activity', 'Erbliche Onkogenetik'],
  'funkcionalna-medicina': ['mjekesi-funksionale', 'Functional medicine', 'leaf', 'Funktionelle Medizin'],
  lekovi: ['barna', 'Drug levels', 'pill', 'Medikamentenspiegel'],
  patohistologija: ['patohistologji', 'Histopathology', 'microscope', 'Histopathologie'],
  transfuziologija: ['transfuziologji', 'Transfusion medicine', 'droplets', 'Transfusionsmedizin'],
};
const SKIP_CATS = new Set(['promocija', 'usluge', 'paneli']);

// Sentences that talk about the source lab, its website, ordering or prices are removed.
const SOURCE = /beo.?lab|beograd|resavsk|\bfaq(ja|e|en|es|et)\b|\bdin\b|rsd|çmim|online|whatsapp|viber|teams|e-lab|porosi|sajt|publik|components|metadat/i;
const REWRITE = [
  [/\bFaqja rekomandon\b/g, 'Rekomandohet'],
  [/\bfaqja rekomandon\b/g, 'rekomandohet'],
  [/\bfaqja nuk kërkon\b/g, 'nuk kërkohet'],
  [/\bfaqja përmend\b/g, 'përmendet'],
  [/\bFaqja thekson se\s+(\p{L})/gu, (_, c) => c.toUpperCase()],
  [/,?\s*sipas faqes\b/g, ''],
  [/,?\s*por përdor në një pjesë edhe termin [^.;]*/g, ''],
  [/të renditura në përshkrim/g, 'të përfshira në panel'],
  [/\bGUT Patološki profil\b/g, 'Profili patologjik GUT'],
  [/\s*\(sipas etiketës burimore\)/g, ''],
];
// Sentences about the source text itself ("the available description only repeats the name…") or that only
// restate the test's name carry nothing for a patient: they are dropped too.
const META = /\b(përshkrimi|teksti) i disponueshëm\b|përsërit vetëm emrin|^(testi|shërbimi) i emërtuar\b|^emri i (shërbimit|analizës)\b|^emërtimi\b|^burimi drejton te\b/i;
function clean(text) {
  if (!text) return null;
  let t = String(text);
  for (const [re, to] of REWRITE) t = t.replace(re, to);
  const parts = t.split(/(?<=[.;!?])\s+/).filter((s) => s && !SOURCE.test(s) && !META.test(s));
  const out = parts.join(' ').replace(/\s+/g, ' ').replace(/;\s*$/, '.').trim();
  return out.length > 3 ? out : null;
}

// Extra search words, so common names patients type (and the home-page shortcuts) find the right test.
const ALIASES = [
  [/hemogram|krvna slika/i, 'gjaku komplet hemogrami cbc kks'],
  [/^vitamin[ae]?\s*d\b|25.?oh|25\(oh\)/i, 'vitamina d vitamin d d3'],
  [/^glukoz|^glikemi/i, 'glukoza sheqeri glikemia'],
  [/^feritin/i, 'feritina rezervat e hekurit'],
  [/urinokult|kultur.*urin|urin.*kultur/i, 'urinokultura urinokulture'],
  [/sedimentim|sedimentacij/i, 'se sedimentimi'],
  [/^tsh\b|tireostimul|tirotropin/i, 'tsh tiroidja'],
  [/hba1c|glikoz.*hemoglobin|hemoglobin.*glik/i, 'hba1c hemoglobina e glikuar'],
  [/kolesterol/i, 'kolesteroli yndyrnat lipidet'],
  [/^hekur|^gvožđ|^gvozd/i, 'hekuri fe'],
  [/^psa\b|prostat/i, 'psa prostata'],
  [/beta.?hcg|\bhcg\b/i, 'beta hcg shtatzenia'],
  [/vitamin/i, 'vitamina vitamine vitaminat'],
];

const fold = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'dj').replace(/[^a-z0-9]+/g, ' ').trim();

const entries = [];
for (const e of data.analyses) {
  if (e.kind === 'service') continue;
  if (e.categoryIds.some((c) => SKIP_CATS.has(c))) continue;
  const cats = e.categoryIds.filter((c) => CATS[c]).map((c) => CATS[c][0]);
  if (!cats.length) continue;
  // Summaries of the source description (also those with added safety context); name-only "descriptions" are not shown.
  const summary = ['source_summary', 'source_summary_with_safety_context'].includes(e.descriptionQuality?.status) ? clean(e.descriptionSq) : null;
  const notes = new Set([
    ...(e.sharedSafetyNoticeIds ?? []).map((n) => NOTE_FROM.notices[n]),
    ...(e.medicalSafetyReview?.reviewFlags ?? []).map((f) => NOTE_FROM.flags[f.sharedExplanationId]),
    ...(NOTE_FROM.tests[e.sourceId] ?? []),
  ].filter(Boolean));
  const comps = (e.componentsSq ?? []).map((x, i) => [x, e.componentCatalogueMappings?.[i]]).filter(([x]) => x && !SOURCE.test(x)).slice(0, 60);
  const alias = ALIASES.filter(([re]) => re.test(e.nameSq) || re.test(e.nameSr)).map(([, a]) => a).join(' ');
  entries.push({
    id: `k${e.sourceId}`,
    n: e.nameSq.replace(/\s+/g, ' ').trim(),
    s: e.nameSr && e.nameSr !== e.nameSq ? e.nameSr.replace(/\s+/g, ' ').trim() : null,
    c: cats,
    k: e.kind === 'panel' ? 1 : 0,
    d: summary,
    sp: clean(e.specimenSq),
    co: clean(e.collectionSq),
    p: clean(e.preparationSq),
    m: comps.map(([x]) => x),
    // A component that is also a test of its own (same name): its source id, linked once ids are final.
    ml: comps.map(([, map]) => (map?.matchType === 'exact_normalized_name' && map.sourceIds?.length === 1 ? map.sourceIds[0] : null)),
    w: [...notes],
    q: fold([e.nameSq, e.nameSr, alias, ...(e.componentsSq ?? [])].join(' ')),
  });
}
// The same test can be listed in two source categories: keep one entry with both categories.
const byName = new Map();
for (const x of entries) {
  const key = fold(x.n);
  const prev = byName.get(key);
  if (!prev) { byName.set(key, x); continue; }
  prev.c = [...new Set([...prev.c, ...x.c])];
  for (const f of ['d', 'sp', 'co', 'p']) prev[f] = prev[f] ?? x[f];
  if (!prev.m.length) { prev.m = x.m; prev.ml = x.ml; }
  prev.w = [...new Set([...prev.w, ...x.w])];
  prev.q = fold([prev.q, x.q].join(' '));
}
entries.length = 0;
entries.push(...byName.values());
entries.sort((a, b) => a.n.localeCompare(b.n, 'sq'));

// Component links: source id → our id, only when that test is in the catalogue (and not the panel itself).
const ids = new Set(entries.map((x) => x.id));
for (const x of entries) {
  x.ml = x.ml.map((sid) => (sid && ids.has(`k${sid}`) && `k${sid}` !== x.id ? `k${sid}` : null));
  if (!x.ml.some(Boolean)) x.ml = [];
}

// Page address for each test: /analizat/<slug>/ (from the Albanian name, unique, the same in both languages).
const used = new Set();
for (const x of entries) {
  let slug = fold(x.n).replace(/ /g, '-').slice(0, 72).replace(/-+$/, '') || x.id;
  if (used.has(slug)) slug = `${slug}-${x.id.slice(1)}`;
  used.add(slug);
  x.u = slug;
}

// Category list in a sensible order (most used first), with counts.
const categories = Object.values(CATS)
  .map(([id, en, icon, de]) => {
    const srcId = Object.keys(CATS).find((k) => CATS[k][0] === id);
    const sq = data.categories.find((c) => c.id === srcId)?.nameSq ?? id;
    return { id, sq, en, de, icon, count: entries.filter((x) => x.c.includes(id)).length };
  })
  .filter((c) => c.count > 0);

// Nothing about the source may remain in what is shown.
const leaks = entries.filter((x) => SOURCE.test([x.n, x.d, x.sp, x.co, x.p, ...x.m].filter(Boolean).join(' ')) && /beo.?lab|beograd|resavsk|\bfaq|rsd|\bdin\b/i.test([x.d, x.sp, x.co, x.p].filter(Boolean).join(' ')));
if (leaks.length) {
  console.error('Source references left in:', leaks.map((x) => x.n).join(', '));
  process.exit(1);
}

const out = { checkedAt: data.metadata?.checkedAt ?? null, count: entries.length, categories, entries };
fs.writeFileSync(path.join(ROOT, 'src/data/catalogue.json'), JSON.stringify(out));
console.log(`catalogue.json: ${entries.length} entries (${entries.filter((x) => x.k).length} panels), ${categories.length} categories, ${entries.filter((x) => x.d).length} with a description, ${entries.filter((x) => x.p).length} with preparation, ${entries.filter((x) => x.w.length).length} with notes, ${entries.filter((x) => x.ml.length).length} with linked components`);
