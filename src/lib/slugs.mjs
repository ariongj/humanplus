// Page address of each catalogue test (catalogue id → slug), for links from other pages to /analizat/<slug>/.
import fs from 'node:fs';
import { CATALOGUE_LINK } from '../data/tests.mjs';

const C = JSON.parse(fs.readFileSync(new URL('../data/catalogue.json', import.meta.url), 'utf8'));
export const SLUG = new Map(C.entries.map((x) => [x.id, x.u]));

/** Path of the catalogue page for a common test (src/data/tests.mjs id), or '' when it has none. */
export const commonTestPath = (id) => {
  const slug = SLUG.get(CATALOGUE_LINK[id]);
  return slug ? `analizat/${slug}` : '';
};
