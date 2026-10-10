// Animated laboratory equipment in the background of the page bands — test tubes with moving liquid and bubbles,
// a flask, a dripping pipette, a microscope, an ECG line, a petri dish, DNA, a syringe and a molecule — so a visitor
// sees "diagnostic centre" at first glance. Purely decorative (aria-hidden), line icons in the brand colours,
// CSS-only animation (transform / opacity), still for visitors who prefer reduced motion.
import { LUCIDE } from './icons.mjs';

const lucide = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${LUCIDE[name]}</svg>`;

// Hand-drawn, animated pieces (64 × 64 unless noted). `p` keeps clip-path ids unique per band.
const ART = {
  tube: (p) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <defs><clipPath id="${p}-tube"><path d="M25 9h14v37a7 7 0 0 1-14 0z"/></clipPath></defs>
    <g clip-path="url(#${p}-tube)">
      <path class="lb-liquid" d="M10 33q4-3 8 0t8 0t8 0t8 0t8 0t8 0V64H10z" fill="currentColor" stroke="none" opacity=".32"/>
      <circle class="lb-bubble" cx="30" cy="50" r="1.8" fill="currentColor" stroke="none"/>
      <circle class="lb-bubble lb-b2" cx="35" cy="52" r="1.3" fill="currentColor" stroke="none"/>
      <circle class="lb-bubble lb-b3" cx="32" cy="47" r="1.1" fill="currentColor" stroke="none"/>
    </g>
    <path d="M22 8h20M25 8v38a7 7 0 0 0 14 0V8"/>
  </svg>`,
  flask: (p) => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <defs><clipPath id="${p}-flask"><path d="M27 10h10v14l12 24a4 4 0 0 1-3.6 6H18.6A4 4 0 0 1 15 48l12-24z"/></clipPath></defs>
    <g clip-path="url(#${p}-flask)">
      <path class="lb-liquid" d="M2 38q5-3 10 0t10 0t10 0t10 0t10 0t10 0V64H2z" fill="currentColor" stroke="none" opacity=".3"/>
      <circle class="lb-bubble" cx="28" cy="50" r="1.8" fill="currentColor" stroke="none"/>
      <circle class="lb-bubble lb-b2" cx="36" cy="51" r="1.4" fill="currentColor" stroke="none"/>
      <circle class="lb-bubble lb-b3" cx="32" cy="46" r="1.1" fill="currentColor" stroke="none"/>
    </g>
    <path d="M25 10h14M27 10v14L15 48a4 4 0 0 0 3.6 6h26.8A4 4 0 0 0 49 48L37 24V10"/>
  </svg>`,
  pipette: () => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M27 5h10v9H27z"/><path d="M24 14h16v6H24z"/><path d="M29 20v22l3 6 3-6V20"/>
    <path class="lb-drop" d="M32 51c-2 3-3 4.5-3 6a3 3 0 0 0 6 0c0-1.5-1-3-3-6z" fill="currentColor" stroke="none"/>
  </svg>`,
  petri: () => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <ellipse cx="32" cy="30" rx="24" ry="10"/><path d="M8 30v6c0 5.5 10.7 10 24 10s24-4.5 24-10v-6"/>
    <circle class="lb-colony" cx="23" cy="30" r="2.4" fill="currentColor" stroke="none"/>
    <circle class="lb-colony lb-b2" cx="35" cy="27" r="1.8" fill="currentColor" stroke="none"/>
    <circle class="lb-colony lb-b3" cx="41" cy="32" r="2.8" fill="currentColor" stroke="none"/>
    <circle class="lb-colony" cx="30" cy="34" r="1.4" fill="currentColor" stroke="none"/>
  </svg>`,
  ecg: () => `<svg viewBox="0 0 160 40" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path class="lb-ecg" pathLength="100" d="M2 24h40l6-14 8 26 7-20 5 8h22l5-10 6 20 6-10h51"/>
  </svg>`,
  molecule: () => `<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 32 18 22M32 32l14-8M32 32v16M18 22l-4 14M46 24l6 12"/>
    <circle cx="32" cy="32" r="5"/><circle cx="18" cy="22" r="4"/><circle cx="46" cy="24" r="4"/><circle cx="32" cy="50" r="4"/><circle cx="14" cy="38" r="3"/><circle cx="52" cy="38" r="3"/>
  </svg>`,
  microscope: () => lucide('microscope'),
  dna: () => lucide('dna'),
  syringe: () => lucide('syringe'),
  tubes: () => lucide('test-tubes'),
  atom: () => lucide('atom'),
  drop: () => lucide('droplet'),
  beaker: () => lucide('beaker'),
};

// [art, x %, y %, size px, rotation deg, motion, tone, hide on phones]
const LAYOUTS = {
  hero: [
    ['tube', 1.5, 8, 74, -14, 'float', 'g', false],
    ['tubes', 37, 2, 46, 8, 'sway', 'b', true],
    ['microscope', 51, 6, 60, 0, 'float', 'g', true],
    ['atom', 84, 1, 46, 0, 'spin', 'b', true],
    ['dna', 95, 14, 64, 18, 'sway', 'g', false],
    ['drop', 60, 30, 34, 0, 'pulse', 'b', true],
    ['flask', 57.5, 58, 70, 6, 'float', 'g', true],
    ['pipette', 1, 58, 62, 10, 'float', 'b', true],
    ['petri', 92, 70, 82, 0, 'float', 'g', false],
    ['ecg', 26, 84, 190, 0, 'none', 'g', false],
    ['syringe', 71, 90, 48, -30, 'sway', 'b', true],
    ['molecule', 9, 90, 54, 0, 'spin', 'b', true],
  ],
  page: [
    ['tube', 64, 12, 64, -12, 'float', 'g', false],
    ['microscope', 76, 8, 58, 0, 'float', 'b', true],
    ['flask', 88, 30, 72, 6, 'float', 'g', false],
    ['dna', 96, 4, 52, 18, 'sway', 'b', true],
    ['petri', 72, 58, 76, 0, 'float', 'g', true],
    ['ecg', 80, 84, 170, 0, 'none', 'g', true],
    ['pipette', 58, 60, 54, 10, 'float', 'b', true],
    ['molecule', 92, 70, 48, 0, 'spin', 'b', true],
  ],
  band: [
    ['tube', 47, 10, 60, -12, 'float', 'w', true],
    ['flask', 3, 66, 64, 6, 'float', 'w', true],
    ['microscope', 93, 8, 54, 0, 'float', 'w', false],
    ['petri', 90, 74, 70, 0, 'float', 'w', true],
    ['dna', 50, 78, 48, 18, 'sway', 'w', false],
    ['pipette', 2, 8, 50, 10, 'float', 'w', true],
  ],
};

export function labBackground(variant = 'hero') {
  const items = LAYOUTS[variant] ?? LAYOUTS.hero;
  const p = `lb-${variant}`;
  return `<div class="lab-bg lab-bg-${variant}" aria-hidden="true">${items
    .map(([art, x, y, size, rot, motion, tone, hideSm], i) => {
      const style = `--x:${x}%;--y:${y}%;--s:${size}px;--r:${rot}deg;--d:${(-i * 1.7).toFixed(1)}s;--t:${7 + (i % 4) * 1.5}s`;
      return `<span class="lb lb-${motion} lb-${tone}${hideSm ? ' lb-hide-sm' : ''}" style="${style}">${ART[art](p)}</span>`;
    })
    .join('')}</div>`;
}
