// photo(): the clinic's own photo for a slot when it is in the photo folder, otherwise the illustrated scene.
// Photos get width/height (read from the file), lazy loading and an optional <slot>-sm copy for phones.
// The photo folder is src/assets/photos/ unless PHOTOS_DIR names another one (the photo version under /re/ uses
// src/variants/re/photos/). An optional photos.json there gives each real photo its alt text and crop:
//   { "hero": { "alt": { "sq": "…", "en": "…" }, "position": "50% 30%", "credit": "Name / Unsplash" } }
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { PHOTOS } from '../data/photos.mjs';
import { scene } from './scenes.mjs';
import { esc, L } from './html.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
export const PHOTO_DIR = path.resolve(ROOT, process.env.PHOTOS_DIR || 'src/assets/photos');
const DIR = PHOTO_DIR;
const META = fs.existsSync(path.join(DIR, 'photos.json')) ? JSON.parse(fs.readFileSync(path.join(DIR, 'photos.json'), 'utf8')) : {};
const EXT = ['webp', 'jpg', 'jpeg', 'png', 'avif'];
const ILLUSTRATION = { sq: 'Ilustrim', en: 'Illustration', de: 'Illustration' };

function find(name) {
  for (const ext of EXT) {
    const file = path.join(DIR, `${name}.${ext}`);
    if (fs.existsSync(file)) return file;
  }
  return null;
}

/** Width and height of a PNG, JPEG or WebP file (null when unknown). */
export function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
    return null;
  }
  if (buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { w: 1 + buf.readUIntLE(24, 3), h: 1 + buf.readUIntLE(27, 3) };
    if (kind === 'VP8 ') return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
    if (kind === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

const info = new Map();
function real(name) {
  if (info.has(name)) return info.get(name);
  const file = find(name);
  let out = null;
  if (file) {
    const buf = fs.readFileSync(file);
    out = { file: path.basename(file), size: imageSize(buf), v: crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8) };
  }
  info.set(name, out);
  return out;
}

/** True when the clinic's photo for this slot is in the photo folder. */
export const hasPhoto = (slot) => Boolean(real(slot));

/**
 * One photo frame. `slot` names the photo (PHOTOS key or any file name); `fallback` is the PHOTOS-style entry
 * ({ scene, variant, alt }) used when the slot has no entry of its own. Size the frame in CSS (.photo).
 */
export function photo(ctx, slot, { fallback, cls = '', eager = false, sizes = '(min-width: 960px) 50vw, 100vw', decorative = false } = {}) {
  const def = PHOTOS[slot] ?? fallback ?? PHOTOS.hero;
  const img = real(slot);
  const meta = img ? META[slot] ?? {} : {};
  const alt = decorative ? '' : L(meta.alt ?? def.alt, ctx.lang);
  if (img) {
    const src = (f) => `${ctx.base}assets/photos/${f}`;
    const sm = real(`${slot}-sm`);
    const srcset = sm?.size && img.size ? ` srcset="${esc(src(sm.file))}?v=${sm.v} ${sm.size.w}w, ${esc(src(img.file))}?v=${img.v} ${img.size.w}w" sizes="${esc(sizes)}"` : '';
    const dims = img.size ? ` width="${img.size.w}" height="${img.size.h}"` : '';
    const pos = meta.position && /^[\d.]+% [\d.]+%$/.test(meta.position) ? ` style="object-position: ${meta.position}"` : '';
    // The first eager image is the page's main (largest) image: the <head> preloads it (layout.mjs), so the browser
    // finds it before the stylesheet has loaded. Same srcset / sizes as the <img>, so it is never fetched twice.
    if (eager && ctx.preload && !ctx.preload.length) ctx.preload.push({ href: `${src(img.file)}?v=${img.v}`, srcset: srcset && `${src(sm.file)}?v=${sm.v} ${sm.size.w}w, ${src(img.file)}?v=${img.v} ${img.size.w}w`, sizes: srcset && sizes });
    return `<div class="photo is-photo ${cls}"><img src="${esc(src(img.file))}?v=${img.v}"${srcset}${dims}${pos} alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
  }
  const label = alt && `${ILLUSTRATION[ctx.lang]}: ${alt}`;
  const file = sceneFile(def);
  if (eager && ctx.preload && !ctx.preload.length) ctx.preload.push({ href: `${ctx.base}assets/scenes/${file.name}?v=${file.v}` });
  return `<div class="photo is-scene ${cls}"><img src="${ctx.base}assets/scenes/${file.name}?v=${file.v}" width="${file.w}" height="${file.h}" alt="${esc(label)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>`;
}

// Scenes are written once to assets/scenes/ (see build.mjs) and cached by the browser across pages.
const SCENE_FILES = new Map();
function sceneFile(def) {
  const key = def.variant ? `${def.scene}-${crypto.createHash('sha1').update(JSON.stringify(def.variant)).digest('hex').slice(0, 6)}` : def.scene;
  if (!SCENE_FILES.has(key)) {
    const svg = scene(def.scene, { variant: def.variant });
    const [, w, h] = svg.match(/width="(\d+)" height="(\d+)"/);
    SCENE_FILES.set(key, { name: `${key}.svg`, svg, w, h, v: crypto.createHash('sha1').update(svg).digest('hex').slice(0, 8) });
  }
  return SCENE_FILES.get(key);
}

/** The photo files to publish (images only, not photos.json). */
export const photoFiles = () => (fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => EXT.includes(path.extname(f).slice(1).toLowerCase())) : []);

/** The scene files the pages used: [[file name, svg]]. */
export const sceneFiles = () => [...SCENE_FILES.values()].map((f) => [f.name, f.svg]);
