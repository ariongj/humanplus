// Imports a lab-catalogue export (the BeoLab public-catalogue ES module the client supplied) into
// src/data/catalogue.json — the data behind /analizat/.
//
//   node scripts/import-catalogue.mjs <path-to-catalogue.js>
//
// What is kept: lab tests and test panels with their Albanian name, Serbian name (search alias), category,
// sample, collection, preparation, short description and components.
// What is dropped on purpose: prices (another lab's, in RSD), turnaround times, reference ranges, methods,
// editorial notes, source URLs and SKUs; the source lab's own consultations, promotions and marketing packages;
// and every sentence that refers to the source lab or its website. Human+ confirms availability, price and
// preparation itself (README → Lab catalogue).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = process.argv[2];
if (!src) {
  console.error('usage: node scripts/import-catalogue.mjs <path-to-catalogue.js>');
  process.exit(1);
}
const data = (await import(pathToFileURL(path.resolve(src)).href)).default;

// Source category → our id, English name and icon. Categories not listed here are skipped.
const CATS = {
  'hematologija-i-hemostaza': ['hematologji', 'Haematology & haemostasis', 'droplet'],
  biohemija: ['biokimi', 'Biochemistry', 'flask-conical'],
  imunohemija: ['imunokimi', 'Immunochemistry', 'activity'],
  'imunohemija-eliza': ['imunokimi-elisa', 'Immunochemistry (ELISA)', 'activity'],
  'polni-hormoni': ['hormone-seksuale', 'Sex hormones', 'venus'],
  'testovi-u-trudnoci': ['shtatzeni', 'Pregnancy tests', 'baby'],
  'tumor-markeri': ['markues-tumorale', 'Tumour markers', 'shield-check'],
  alergologija: ['alergologji', 'Allergology', 'sparkles'],
  imunologija: ['imunologji', 'Immunology', 'shield-check'],
  serologija: ['serologji', 'Serology', 'test-tubes'],
  'serologija-automatizovana': ['serologji-automatike', 'Automated serology', 'test-tubes'],
  mikrobiologija: ['mikrobiologji', 'Microbiology', 'microscope'],
  parazitologija: ['parazitologji', 'Parasitology', 'microscope'],
  'genetika-pcr': ['gjenetike-pcr', 'Genetics (PCR)', 'activity'],
  'genetika-ngs': ['gjenetike-ngs', 'Genetics (NGS)', 'activity'],
  'nasledna-onkogenetika': ['onkogjenetike', 'Hereditary oncogenetics', 'activity'],
  'funkcionalna-medicina': ['mjekesi-funksionale', 'Functional medicine', 'leaf'],
  lekovi: ['barna', 'Drug levels', 'pill'],
  patohistologija: ['patohistologji', 'Histopathology', 'microscope'],
  transfuziologija: ['transfuziologji', 'Transfusion medicine', 'droplets'],
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
];
function clean(text) {
  if (!text) return null;
  let t = String(text);
  for (const [re, to] of REWRITE) t = t.replace(re, to);
  const parts = t.split(/(?<=[.;!?])\s+/).filter((s) => s && !SOURCE.test(s));
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
  const summary = e.descriptionQuality?.status === 'source_summary' ? clean(e.descriptionSq) : null;
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
    m: (e.componentsSq ?? []).filter((x) => x && !SOURCE.test(x)).slice(0, 60),
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
  if (!prev.m.length) prev.m = x.m;
  prev.q = fold([prev.q, x.q].join(' '));
}
entries.length = 0;
entries.push(...byName.values());
entries.sort((a, b) => a.n.localeCompare(b.n, 'sq'));

// Category list in a sensible order (most used first), with counts.
const categories = Object.values(CATS)
  .map(([id, en, icon]) => {
    const srcId = Object.keys(CATS).find((k) => CATS[k][0] === id);
    const sq = data.categories.find((c) => c.id === srcId)?.nameSq ?? id;
    return { id, sq, en, icon, count: entries.filter((x) => x.c.includes(id)).length };
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
console.log(`catalogue.json: ${entries.length} entries (${entries.filter((x) => x.k).length} panels), ${categories.length} categories, ${entries.filter((x) => x.d).length} with a description, ${entries.filter((x) => x.p).length} with preparation`);
