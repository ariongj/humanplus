// Small helpers for the static page templates: escaping, icons, translations and URLs.
import { LUCIDE, BRANDS } from './icons.mjs';

export const esc = (v) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Join template parts, dropping false / null / undefined (so `${cond && '…'}` works). */
export const h = (strings, ...values) =>
  strings.reduce((out, s, i) => {
    const v = values[i - 1];
    const part = Array.isArray(v) ? v.join('') : v === false || v == null ? '' : v;
    return out + part + s;
  });

// Icons come from one cached sprite file (assets/icons.svg, written by the build) through <use>, so a page does
// not repeat the same paths dozens of times. Until the build sets the sprite's URL, icons are inlined.
let SPRITE = '';
export const useIconSprite = (url) => { SPRITE = url; };
export const iconSprite = () =>
  `<svg xmlns="http://www.w3.org/2000/svg">${Object.entries(LUCIDE).map(([n, inner]) => `<symbol id="${n}" viewBox="0 0 24 24">${inner}</symbol>`).join('')}${Object.entries(BRANDS).map(([n, d]) => `<symbol id="b-${n}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`).join('')}</svg>`;

/** Lucide stroke icon (decorative unless a label is given). */
export function icon(name, { size = 20, cls = '', label = '' } = {}) {
  const inner = LUCIDE[name];
  if (!inner) throw new Error(`Unknown icon "${name}" — add it to src/lib/icons.mjs`);
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  // Stroke, fill and caps for .i-s come from site.css; the symbol carries the 24×24 viewBox.
  if (SPRITE) return `<svg class="i i-s${cls ? ` ${cls}` : ''}" ${a11y} width="${size}" height="${size}"><use href="${SPRITE}#${name}"/></svg>`;
  return `<svg class="i ${cls}" ${a11y} width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

/** Brand mark from Simple Icons (filled, 24×24). */
export function brand(name, { size = 20, cls = '', label = '' } = {}) {
  const d = BRANDS[name];
  if (!d) throw new Error(`Unknown brand icon "${name}"`);
  const a11y = label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true"';
  if (SPRITE) return `<svg class="i${cls ? ` ${cls}` : ''}" ${a11y} width="${size}" height="${size}" fill="currentColor"><use href="${SPRITE}#b-${name}"/></svg>`;
  return `<svg class="i ${cls}" ${a11y} width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor"><path d="${d}"/></svg>`;
}

/**
 * A page-local dictionary: `{ sq: {...}, en: {...} }`. Throws at build time when a key exists in one language
 * and not the other, so no visible text ships untranslated.
 */
export function dict(name, d) {
  const langs = Object.keys(d);
  const ref = Object.keys(d[langs[0]]).sort().join('|');
  for (const l of langs.slice(1)) {
    const keys = Object.keys(d[l]).sort().join('|');
    if (keys !== ref) {
      const a = new Set(Object.keys(d[langs[0]]));
      const b = new Set(Object.keys(d[l]));
      const diff = [...a].filter((k) => !b.has(k)).concat([...b].filter((k) => !a.has(k)));
      throw new Error(`Dictionary "${name}": keys differ between ${langs[0]} and ${l}: ${diff.join(', ')}`);
    }
  }
  return d;
}

/** Pick the language from a `{ sq, en }` value (strings pass through). */
export const L = (v, lang) => (v && typeof v === 'object' && !Array.isArray(v) ? v[lang] ?? (lang === 'sq' ? undefined : v.en) ?? v.sq : v);
/** Native names of the site languages (shown in the language switch). */
export const LANG_NAMES = { sq: 'Shqip', en: 'English', de: 'Deutsch' };

/** `*word*` → italic serif accent (the brand's display style). Escapes everything else. */
export const accent = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em class="accent">$1</em>');

/** Fold Albanian / accented letters for search: "Ëndërr Çaj" → "enderr caj". */
export const fold = (s) =>
  String(s ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
