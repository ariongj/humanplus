// Illustrated scenes of the centre — doctors in white coats, the laboratory, sample collection, paediatrics,
// a specialist's room and the reception — drawn in the brand colours. They stand in for photographs until the
// clinic sends its own (README → Photos): `photo()` in photo.mjs shows a real photo when one is in
// src/assets/photos/, and one of these scenes otherwise. No stock photos, no real people.
//
// Each scene is drawn on an 800 × 800 canvas, framed by VIEW (below) and written by the build as a standalone SVG
// file in assets/scenes/. The page crops it to its frame (object-fit: cover), so keep the subject near the middle.
import { LOGO_SQUARE, LOGO_MARK } from './logo-paths.mjs';

/* ---------- palette ---------- */
const C = {
  wall: '#eef4fa', wall2: '#e3edf7',
  floor: '#dce7f1',
  white: '#ffffff', shade: '#e8eff6', shade2: '#d3dfea', line: '#bccbd9',
  coat: '#ffffff', coatShade: '#e2eaf2', coatLine: '#c3d1de',
  green: '#28cc63', green2: '#1fae55', deep: '#0a3d24', mint: '#c8efd7', mint2: '#e8f8ee',
  ink: '#1c2a34', ink2: '#33434f', steel: '#c4cfd9', steel2: '#8d9caa',
  glove: '#7fb1ec', glove2: '#5d97dc',
  blue: '#4a90e2', sky: '#dcecfa',
  wood: '#e9d8bf', wood2: '#d8c09f',
};
const SKIN = {
  a: ['#f3cdb0', '#e2b393'],
  b: ['#e0ac86', '#cb9470'],
  c: ['#b97c58', '#a06646'],
  d: ['#8a5a3c', '#734a30'],
};
const HAIR = { dark: '#2b1d16', black: '#16110e', brown: '#5a3520', auburn: '#7a3b1e', blonde: '#b78a57', grey: '#9aa3ab' };
const CAPS = ['#8e5bd6', '#e0474c', '#f2c230', '#28cc63', '#4a90e2', '#8a96a3'];

const r = (n) => Math.round(n * 10) / 10;

/* ---------- people (front view, from the waist up). Origin = base of the neck. ---------- */

function arm({ shoulder, elbow, hand, sleeve, sleeveLine, skin, glove = false, w = 30, cuff = true }) {
  const [sx, sy] = shoulder;
  const [ex, ey] = elbow;
  const [hx, hy] = hand;
  // stop the sleeve a little before the hand
  const k = 0.82;
  const cx = r(ex + (hx - ex) * k);
  const cy = r(ey + (hy - ey) * k);
  const d = `M${sx} ${sy}Q${ex} ${ey} ${cx} ${cy}`;
  const handFill = glove ? C.glove : skin[0];
  const handLine = glove ? C.glove2 : skin[1];
  return `<path d="${d}" fill="none" stroke="${sleeveLine}" stroke-width="${w + 3}" stroke-linecap="round"/>
    <path d="M${hx} ${hy}L${cx} ${cy}" stroke="${handLine}" stroke-width="${w * 0.58}" stroke-linecap="round"/>
    <path d="${d}" fill="none" stroke="${sleeve}" stroke-width="${w}" stroke-linecap="round"/>
    ${cuff ? `<circle cx="${cx}" cy="${cy}" r="${w * 0.42}" fill="${sleeveLine}" opacity=".55"/>` : ''}
    <ellipse cx="${hx}" cy="${hy}" rx="${w * 0.42}" ry="${w * 0.36}" fill="${handFill}"/>`;
}

const HAIRS = {
  // [behind the head, on top of the head]
  bun: (c) => [
    `<circle cx="0" cy="-108" r="17" fill="${c}"/>`,
    `<path d="M-32 -58C-37 -96 -16 -106 0 -106C16 -106 37 -96 32 -58C29 -76 18 -86 2 -88C-4 -80 -18 -74 -32 -58Z" fill="${c}"/>`,
  ],
  short: (c) => [
    '',
    `<path d="M-31 -56C-37 -96 -12 -110 6 -106C26 -103 38 -90 31 -56C29 -72 24 -80 10 -84C-4 -82 -22 -78 -31 -56Z" fill="${c}"/><path d="M-31 -60L-30 -46L-27 -58Z" fill="${c}"/><path d="M31 -60L30 -46L27 -58Z" fill="${c}"/>`,
  ],
  long: (c) => [
    `<path d="M-35 -70C-42 -112 42 -112 35 -70L42 10C30 18 -30 18 -42 10Z" fill="${c}"/>`,
    `<path d="M-33 -54C-38 -98 -14 -108 2 -107C20 -106 38 -96 33 -54C30 -70 22 -84 8 -88C-2 -76 -16 -64 -33 -54Z" fill="${c}"/>`,
  ],
  bob: (c) => [
    `<path d="M-36 -66C-41 -110 41 -110 36 -66L38 -30C30 -24 -30 -24 -38 -30Z" fill="${c}"/>`,
    `<path d="M-34 -50C-39 -98 -12 -108 4 -107C22 -106 39 -96 34 -50C30 -68 20 -84 0 -86C-12 -74 -22 -60 -34 -50Z" fill="${c}"/>`,
  ],
  curly: (c) => [
    `<g fill="${c}"><circle cx="-30" cy="-58" r="12"/><circle cx="30" cy="-58" r="12"/><circle cx="-33" cy="-40" r="10"/><circle cx="33" cy="-40" r="10"/></g>`,
    `<g fill="${c}"><circle cx="-22" cy="-92" r="15"/><circle cx="0" cy="-100" r="16"/><circle cx="22" cy="-92" r="15"/><circle cx="-31" cy="-74" r="11"/><circle cx="31" cy="-74" r="11"/><circle cx="-12" cy="-86" r="12"/><circle cx="12" cy="-86" r="12"/></g>`,
  ],
  cap: (c) => [
    // surgical cap (lab)
    '',
    `<path d="M-35 -62C-40 -122 40 -122 35 -62C24 -70 -24 -70 -35 -62Z" fill="${c}"/><path d="M-35 -62C-24 -70 24 -70 35 -62" fill="none" stroke="#000" stroke-opacity=".12" stroke-width="3"/><path d="M-20 -100C-12 -96 12 -96 20 -100M-26 -86C-14 -82 14 -82 26 -86" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>`,
  ],
};

/**
 * A person in a white coat, scrubs or a T-shirt. Options: x, y, s (scale), head (head scale, e.g. 1.3 for a child),
 * skin (a–d), hair (a HAIRS style), hairColor, top ('coat' | 'scrubs' | 'tee'), scrub (colour of the top), steth,
 * mask, glasses, glove, badge, arms ('down' | 'tablet' | custom [{ shoulder, elbow, hand }] in local coordinates),
 * flip (mirror), extra (svg drawn on top, local coordinates).
 */
export function person(o) {
  const {
    x = 0, y = 0, s = 1, skin = 'a', hair = 'short', hairColor = HAIR.dark, top = 'coat', scrub = C.green,
    steth = false, mask = false, glasses = false, glove = false, badge = true, arms = 'down', flip = false, extra = '',
    head = 1,
  } = o;
  const sk = SKIN[skin];
  const [hairBack, hairTop] = (HAIRS[hair] ?? HAIRS.short)(hairColor);
  const coat = top === 'coat';
  const body = coat ? C.coat : scrub;
  const bodyLine = coat ? C.coatLine : shadeOf(scrub);
  const sh = coat ? C.coatShade : shadeOf(scrub);

  let armsSvg = '';
  let front = '';
  const A = (a) => arm({ ...a, sleeve: body, sleeveLine: bodyLine, skin: sk, glove });
  if (arms === 'down') {
    armsSvg = A({ shoulder: [-70, 36], elbow: [-94, 150], hand: [-90, 262] }) + A({ shoulder: [70, 36], elbow: [94, 150], hand: [90, 262] });
  } else if (arms === 'tablet') {
    front = `<g transform="rotate(-8 0 190)">
      <rect x="-56" y="138" width="110" height="78" rx="9" fill="${C.ink}"/>
      <rect x="-50" y="144" width="98" height="66" rx="5" fill="#f4f9fd"/>
      <rect x="-42" y="152" width="40" height="6" rx="3" fill="${C.shade2}"/>
      <rect x="-42" y="182" width="9" height="20" rx="2" fill="${C.mint}"/><rect x="-29" y="172" width="9" height="30" rx="2" fill="${C.green}"/><rect x="-16" y="178" width="9" height="24" rx="2" fill="${C.mint}"/><rect x="-3" y="166" width="9" height="36" rx="2" fill="${C.green}"/>
      <path d="M14 196L24 184L32 190L42 170" fill="none" stroke="${C.blue}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <ellipse cx="-50" cy="204" rx="13" ry="11" fill="${glove ? C.glove : sk[0]}"/><ellipse cx="50" cy="186" rx="13" ry="11" fill="${glove ? C.glove : sk[0]}"/>`;
    armsSvg = A({ shoulder: [-70, 36], elbow: [-100, 168], hand: [-50, 204] }) + A({ shoulder: [70, 36], elbow: [100, 160], hand: [50, 186] });
  } else if (Array.isArray(arms)) {
    armsSvg = arms.map(A).join('');
  }

  const g = `
    <g transform="translate(0 ${r(7 * head + (head - 1) * 24)}) scale(${head})">${hairBack}</g>
    <path d="M-27 0C-48 4 -66 10 -74 26C-82 42 -84 84 -86 134L-88 320H88L86 134C84 84 82 42 74 26C66 10 48 4 27 0Z" fill="${body}"/>
    <path d="M-74 26C-82 42 -84 84 -86 134L-88 320H-70L-68 128C-67 86 -66 54 -62 34Z" fill="${sh}" opacity=".7"/>
    <path d="M74 26C82 42 84 84 86 134L88 320H76L74 128C73 90 72 58 68 36Z" fill="${sh}" opacity=".45"/>
    ${coat ? `<path d="M-28 1Q0 9 28 1L19 150L17 320H-17L-19 150Z" fill="${scrub}"/>
    <path d="M-17 1Q0 5 17 1L0 32Z" fill="${sk[0]}"/>
    <path d="M-19 1L0 35L19 1" fill="none" stroke="${shadeOf(scrub)}" stroke-width="3"/>
    <path d="M-28 0L-48 38L-37 48L-19 142Z" fill="#f3f7fb" stroke="${C.coatLine}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M28 0L48 38L37 48L19 142Z" fill="#f3f7fb" stroke="${C.coatLine}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M-19 142L-17 320M19 142L17 320" stroke="${C.coatLine}" stroke-width="1.5"/>
    <rect x="36" y="92" width="32" height="36" rx="3" fill="${C.coat}" stroke="${C.coatLine}" stroke-width="1.5"/>
    <rect x="42" y="78" width="5" height="22" rx="2" fill="${C.blue}"/><rect x="51" y="82" width="5" height="18" rx="2" fill="${C.ink2}"/>
    ${badge ? `<rect x="-70" y="78" width="32" height="20" rx="3" fill="${C.white}" stroke="${C.coatLine}" stroke-width="1.5"/><rect x="-67" y="81" width="9" height="14" rx="2" fill="${C.green}"/><rect x="-55" y="84" width="14" height="3" rx="1.5" fill="${C.shade2}"/><rect x="-55" y="90" width="10" height="3" rx="1.5" fill="${C.shade2}"/>` : ''}`
      : top === 'tee' ? `<path d="M-18 1Q0 20 18 1Z" fill="${sk[0]}"/><path d="M-19 0Q0 22 19 0" fill="none" stroke="${shadeOf(scrub)}" stroke-width="4"/>`
      : `<path d="M-20 1Q0 6 20 1L0 38Z" fill="${sk[0]}"/><path d="M-22 1L0 40L22 1" fill="none" stroke="${shadeOf(scrub)}" stroke-width="4"/>
    <rect x="30" y="110" width="38" height="30" rx="4" fill="${shadeOf(scrub)}" opacity=".5"/>
    ${badge ? `<rect x="-66" y="70" width="28" height="18" rx="3" fill="${C.white}"/><rect x="-63" y="73" width="8" height="12" rx="2" fill="${C.deep}"/>` : ''}`}
    <path d="M-15 -36V4Q0 12 15 4V-36Z" fill="${sk[1]}"/>
    ${steth ? `<path d="M-25 -2C-46 30 -48 96 -34 126" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    <path d="M25 -2C42 26 46 66 38 92" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>
    <path d="M38 92L31 120M38 92L46 118" fill="none" stroke="${C.steel2}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="31" cy="122" r="3.5" fill="${C.ink}"/><circle cx="46" cy="120" r="3.5" fill="${C.ink}"/>
    <circle cx="-34" cy="136" r="12" fill="${C.steel}" stroke="${C.steel2}" stroke-width="2.5"/><circle cx="-34" cy="136" r="6" fill="#eef2f6"/>
    <path d="M-25 -2C-18 10 18 10 25 -2" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/>` : ''}
    ${armsSvg}
    ${front}
    <g transform="translate(0 ${r(7 * head + (head - 1) * 24)}) scale(${head})">
    <ellipse cx="-31" cy="-62" rx="6" ry="9" fill="${sk[1]}"/><ellipse cx="31" cy="-62" rx="6" ry="9" fill="${sk[1]}"/>
    <ellipse cx="0" cy="-66" rx="30" ry="36" fill="${sk[0]}"/>
    ${hairTop}
    ${glasses ? `<g fill="none" stroke="${C.ink}" stroke-width="2.4"><rect x="-24" y="-72" width="19" height="13" rx="5"/><rect x="5" y="-72" width="19" height="13" rx="5"/><path d="M-5 -66H5M-24 -67L-30 -68M24 -67L30 -68"/></g>` : ''}
    ${mask ? `<path d="M-27 -58Q0 -52 27 -58L25 -40Q0 -26 -25 -40Z" fill="#d7e9f8"/><path d="M-22 -50Q0 -45 22 -50M-21 -43Q0 -37 21 -43" fill="none" stroke="#b6cfe6" stroke-width="1.6"/><path d="M-27 -57L-31 -64M27 -57L31 -64M-25 -41L-31 -55M25 -41L31 -55" stroke="#b6cfe6" stroke-width="1.6"/>` : ''}
    </g>
    ${extra}`;
  const tf = `translate(${x} ${y}) scale(${flip ? -s : s} ${s})`;
  return `<g transform="${tf}">${g}</g>`;
}

function shadeOf(hex) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.round(v * 0.84));
  return `#${[(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => f(v).toString(16).padStart(2, '0')).join('')}`;
}

/* ---------- props ---------- */

const logo = (x, y, s, { mark = '#fff', sq = C.green } = {}) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><path d="${LOGO_SQUARE}" fill="${sq}"/>${LOGO_MARK.map((d) => `<path d="${d}" fill="${mark}"/>`).join('')}</g>`;

function wall(p, { a = C.wall, b = C.wall2 } = {}) {
  return `<defs><linearGradient id="${p}-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>
    <radialGradient id="${p}-light" cx=".15" cy=".1" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>
    <rect width="800" height="800" fill="url(#${p}-wall)"/><rect width="800" height="800" fill="url(#${p}-light)"/>`;
}

function windowPane(x, y, w, h) {
  const slats = Array.from({ length: Math.floor(h / 22) }, (_, i) => `<rect x="${x + 10}" y="${y + 12 + i * 22}" width="${w - 20}" height="9" rx="2" fill="#fff" opacity=".55"/>`).join('');
  return `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="6" fill="#fff"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${C.sky}"/>
    ${slats}
    <path d="M${x + w / 2} ${y}V${y + h}" stroke="#fff" stroke-width="6"/>`;
}

function plant(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-8 0C-30 -40 -60 -60 -74 -110C-40 -96 -18 -60 -4 -8Z" fill="${C.green2}"/>
    <path d="M6 0C20 -50 54 -80 70 -130C80 -84 46 -40 12 -4Z" fill="${C.green}"/>
    <path d="M0 0C-6 -60 -2 -110 16 -160C30 -110 20 -50 6 0Z" fill="${C.green2}"/>
    <path d="M-4 -2C-40 -20 -70 -20 -96 -48C-60 -54 -30 -40 -2 -10Z" fill="${C.green}"/>
    <path d="M4 -4C30 -30 64 -34 92 -60C84 -28 50 -14 8 -2Z" fill="${C.green2}" opacity=".9"/>
    <path d="M-40 0H40L32 70H-32Z" fill="#fff"/><path d="M-40 0H40L39 10H-39Z" fill="${C.shade2}"/>
  </g>`;
}

function bottle(x, y, { w = 26, h = 54, color = '#fff', cap = C.blue, label = C.mint } = {}) {
  return `<rect x="${x + w * 0.28}" y="${y - h - 10}" width="${w * 0.44}" height="12" rx="2" fill="${cap}"/>
    <rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="5" fill="${color}" stroke="${C.line}" stroke-width="1.2"/>
    <rect x="${x + 3}" y="${y - h * 0.62}" width="${w - 6}" height="${h * 0.36}" rx="2" fill="${label}"/>`;
}

function shelf(x, y, w, items = []) {
  return `<rect x="${x}" y="${y}" width="${w}" height="10" rx="3" fill="#fff"/><rect x="${x}" y="${y + 10}" width="${w}" height="5" fill="${C.shade2}"/>
    ${items.join('')}`;
}

function tube(x, y, { cap = C.green, h = 70, fill = '#e2474b', level = 0.55, w = 14 } = {}) {
  const liq = h * level;
  return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" rx="${w / 2}" fill="#f6fafd" stroke="${C.line}" stroke-width="1.2"/>
    <rect x="${x + 1.5}" y="${y - liq}" width="${w - 3}" height="${liq - 1.5}" rx="${(w - 3) / 2}" fill="${fill}" opacity=".85"/>
    <rect x="${x + 2}" y="${y - h + 14}" width="${w - 4}" height="${h * 0.32}" rx="1" fill="#fff" opacity=".9"/>
    <rect x="${x - 1.5}" y="${y - h - 12}" width="${w + 3}" height="16" rx="3" fill="${cap}"/>`;
}

function rack(x, y, caps = CAPS, { gap = 26 } = {}) {
  const n = caps.length;
  const w = n * gap + 16;
  return `<rect x="${x}" y="${y - 40}" width="${w}" height="12" rx="3" fill="#fff" stroke="${C.line}" stroke-width="1.2"/>
    ${caps.map((c, i) => tube(x + 10 + i * gap, y - 4, { cap: c, fill: c === CAPS[2] ? '#f0c76a' : c === CAPS[4] ? '#d9464a' : '#c93c40', level: 0.5 + ((i * 37) % 30) / 100 })).join('')}
    <rect x="${x}" y="${y - 14}" width="${w}" height="16" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="1.2"/>
    <rect x="${x + 6}" y="${y + 2}" width="8" height="14" fill="${C.shade2}"/><rect x="${x + w - 14}" y="${y + 2}" width="8" height="14" fill="${C.shade2}"/>`;
}

function microscope(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="70" ry="10" fill="#000" opacity=".08"/>
    <rect x="-62" y="-22" width="124" height="26" rx="10" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <path d="M18 -20C30 -70 34 -120 20 -168L-6 -160C6 -120 2 -70 -10 -20Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="-46" y="-78" width="80" height="12" rx="3" fill="${C.ink2}"/>
    <rect x="-24" y="-112" width="18" height="34" rx="4" fill="${C.steel}"/><rect x="-6" y="-108" width="14" height="30" rx="4" fill="${C.steel2}"/>
    <circle cx="26" cy="-96" r="13" fill="${C.ink2}"/><circle cx="26" cy="-96" r="6" fill="${C.steel}"/>
    <path d="M-30 -170L-4 -150L10 -168L-14 -190Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <path d="M-32 -176L-52 -204M-20 -186L-38 -214" stroke="${C.ink}" stroke-width="11" stroke-linecap="round"/>
    <path d="M-46 -12H40" stroke="${C.green}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

function analyzer(p, x, y, s = 1, { animate = true } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="110" cy="6" rx="130" ry="12" fill="#000" opacity=".07"/>
    <rect x="0" y="-220" width="220" height="224" rx="14" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="0" y="-220" width="220" height="34" rx="14" fill="${C.shade}"/>
    <rect x="0" y="-196" width="220" height="10" fill="${C.shade}"/>
    <rect x="14" y="-174" width="118" height="84" rx="6" fill="${C.ink}"/>
    <rect x="20" y="-168" width="106" height="72" rx="3" fill="#0f2a1c"/>
    <path class="sc-graph" d="M26 -112L40 -118L50 -110L62 -140L74 -124L86 -130L98 -150L110 -138L120 -142" fill="none" stroke="${C.green}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>
    <rect x="26" y="-162" width="38" height="5" rx="2" fill="${C.green}" opacity=".7"/><rect x="26" y="-153" width="24" height="4" rx="2" fill="#fff" opacity=".35"/>
    <rect x="144" y="-174" width="62" height="10" rx="3" fill="${C.shade}"/><rect x="144" y="-158" width="62" height="10" rx="3" fill="${C.shade}"/>
    <circle cx="152" cy="-130" r="6" fill="${C.green}"${animate ? ' class="sc-blink"' : ''}/><circle cx="170" cy="-130" r="6" fill="${C.shade2}"/>
    <rect x="14" y="-76" width="192" height="64" rx="8" fill="${C.shade}"/>
    <rect x="22" y="-70" width="176" height="10" rx="3" fill="${C.shade2}"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => tube(30 + i * 21, -18, { cap: CAPS[i % CAPS.length], h: 48, w: 11, level: 0.6 })).join('')}
  </g>`;
}

function centrifuge(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="74" ry="10" fill="#000" opacity=".07"/>
    <path d="M-70 0V-58C-70 -74 -56 -84 -40 -84H40C56 -84 70 -74 70 -58V0Z" fill="#fff" stroke="${C.line}" stroke-width="1.5"/>
    <ellipse cx="0" cy="-84" rx="58" ry="12" fill="${C.shade}" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="-50" y="-40" width="44" height="16" rx="3" fill="${C.ink}"/><rect x="-46" y="-36" width="22" height="8" rx="2" fill="${C.green}" opacity=".8"/>
    <circle cx="20" cy="-32" r="7" fill="${C.shade2}"/><circle cx="40" cy="-32" r="7" fill="${C.green}"/>
  </g>`;
}

function monitor(x, y, s = 1, { screen = '' } = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-8" y="-24" width="16" height="24" fill="${C.steel2}"/><rect x="-36" y="-4" width="72" height="8" rx="4" fill="${C.steel2}"/>
    <rect x="-90" y="-128" width="180" height="108" rx="8" fill="${C.ink}"/>
    <rect x="-84" y="-122" width="168" height="94" rx="4" fill="#f5f9fd"/>
    ${screen || `<rect x="-74" y="-112" width="60" height="8" rx="3" fill="${C.green}"/><rect x="-74" y="-96" width="148" height="6" rx="3" fill="${C.shade2}"/><rect x="-74" y="-84" width="120" height="6" rx="3" fill="${C.shade2}"/><rect x="-74" y="-72" width="134" height="6" rx="3" fill="${C.shade2}"/><rect x="-74" y="-56" width="40" height="18" rx="3" fill="${C.mint}"/><rect x="-28" y="-56" width="40" height="18" rx="3" fill="${C.sky}"/>`}
  </g>`;
}

function chair(x, y, s = 1, color = C.green) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-34" y="-104" width="68" height="70" rx="16" fill="${color}"/>
    <rect x="-40" y="-40" width="80" height="24" rx="10" fill="${shadeOf(color)}"/>
    <path d="M-28 -16L-34 30M28 -16L34 30" stroke="${C.steel2}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

const floor = (y, p) => `<rect x="0" y="${y}" width="800" height="${800 - y}" fill="${C.floor}"/><rect x="0" y="${y}" width="800" height="6" fill="#fff" opacity=".7"/>`;

const pattern = (p, x, y, w, h, op = 0.07) =>
  `<defs><pattern id="${p}-pat" width="64" height="64" patternUnits="userSpaceOnUse"><g transform="translate(17 20) scale(0.6)">${LOGO_MARK.map((d) => `<path d="${d}" fill="${C.green}"/>`).join('')}</g></pattern></defs>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${p}-pat)" opacity="${op}"/>`;

/* ---------- scenes ---------- */

const SCENES = {
  // A doctor with a stethoscope and a tablet, the laboratory behind the glass.
  doctor: (p) => `${wall(p)}
    ${windowPane(46, 120, 150, 300)}
    <rect x="236" y="96" width="540" height="420" rx="10" fill="#f7fbfe" stroke="#fff" stroke-width="10"/>
    <g opacity=".55">
      ${shelf(270, 210, 230, [bottle(286, 210), bottle(320, 210, { cap: C.green }), bottle(354, 210, { h: 44, cap: '#e0474c' }), bottle(386, 210, { cap: C.blue, color: '#fdf3e2', label: '#fff' })])}
      ${shelf(560, 180, 190, [bottle(580, 180, { cap: C.green }), bottle(614, 180, { h: 40 }), bottle(646, 180, { cap: '#8e5bd6' })])}
      ${person({ x: 640, y: 372, s: 0.62, skin: 'd', hair: 'cap', hairColor: '#cfe3f5', mask: true, glove: true, badge: false, arms: [{ shoulder: [-70, 36], elbow: [-100, 120], hand: [-60, 150] }, { shoulder: [70, 36], elbow: [100, 120], hand: [60, 150] }] })}
      <rect x="250" y="462" width="520" height="12" fill="#fff"/>
      ${microscope(560, 470, 0.7)}
      ${rack(270, 470, CAPS.slice(0, 5))}
      ${centrifuge(700, 470, 0.6)}
    </g>
    ${pattern(p, 236, 96, 540, 420, 0.05)}
    <path d="M236 300H776" stroke="#fff" stroke-width="6" opacity=".7"/>
    ${floor(600, p)}
    ${plant(110, 640, 1.05)}
    ${person({ x: 452, y: 380, s: 1.35, skin: 'a', hair: 'bun', hairColor: HAIR.brown, steth: true, arms: 'tablet' })}
`,

  // A laboratory technician holding up a sample tube; microscope, analyser and test tubes on the bench.
  lab: (p) => `${wall(p)}
    ${pattern(p, 0, 0, 800, 560, 0.045)}
    ${shelf(120, 300, 210, [bottle(132, 300, { cap: C.green }), bottle(166, 300), bottle(200, 300, { cap: '#e0474c', h: 46 }), bottle(234, 300, { color: '#fdf3e2', label: '#fff' }), bottle(268, 300, { cap: C.blue, h: 40 })])}
    ${shelf(500, 280, 200, [bottle(516, 280, { cap: '#8e5bd6' }), bottle(550, 280, { h: 44 }), bottle(584, 280, { cap: C.green }), bottle(618, 280, { cap: C.blue, color: '#fdf3e2', label: '#fff' }), bottle(652, 280, { h: 38 })])}
    ${person({ x: 400, y: 392, s: 1.12, skin: 'c', hair: 'cap', hairColor: '#cfe3f5', scrub: '#1f9e8a', mask: true, glasses: true, glove: true,
      arms: [{ shoulder: [-70, 36], elbow: [-118, 130], hand: [-96, 30] }, { shoulder: [70, 36], elbow: [110, 150], hand: [64, 150] }],
      extra: `<g transform="translate(-96 26) rotate(-14)">${tube(-7, 0, { cap: '#8e5bd6', h: 92, w: 16, fill: '#c93c40', level: 0.62 })}</g><ellipse cx="-96" cy="30" rx="13" ry="11" fill="${C.glove}"/><path d="M-104 24H-88" stroke="${C.glove2}" stroke-width="2" stroke-linecap="round"/>` })}
    <rect x="0" y="548" width="800" height="252" fill="#fff"/>
    <rect x="0" y="540" width="800" height="20" fill="${C.shade}"/><rect x="0" y="558" width="800" height="6" fill="${C.shade2}"/>
    ${[0, 1, 2, 3, 4].map((i) => `<rect x="${110 + i * 120}" y="582" width="108" height="150" rx="6" fill="${C.wall}" stroke="${C.line}" stroke-width="1.2"/><rect x="${154 + i * 120}" y="596" width="20" height="5" rx="2.5" fill="${C.steel2}"/>`).join('')}
    ${microscope(230, 546, 0.95)}
    ${analyzer(p, 500, 542, 0.92)}
    ${rack(300, 546, CAPS.slice(0, 4))}`,

  // The sample-collection room: blood-draw chair with its arm rest, a nurse labelling a tube at the cart.
  sampling: (p) => `${wall(p, { a: '#f2f7fb', b: '#e4eef7' })}
    ${pattern(p, 0, 0, 800, 640, 0.045)}
    ${windowPane(70, 130, 150, 230)}
    <rect x="300" y="150" width="150" height="110" rx="6" fill="#fff"/>
    <rect x="312" y="162" width="126" height="86" rx="3" fill="${C.mint2}"/>
    <path d="M330 222C350 182 370 236 388 196C398 176 412 190 420 184" fill="none" stroke="${C.green}" stroke-width="5" stroke-linecap="round"/>
    <g transform="translate(560 170)">
      ${['#7fb1ec', '#b9a0e8', '#7fb1ec'].map((c, i) => `<rect x="${i * 64}" y="0" width="56" height="78" rx="5" fill="${c}"/><rect x="${i * 64 + 12}" y="10" width="32" height="12" rx="6" fill="#fff" opacity=".85"/><rect x="${i * 64 + 10}" y="52" width="36" height="6" rx="3" fill="#fff" opacity=".6"/>`).join('')}
      <rect x="-8" y="-8" width="200" height="8" rx="3" fill="${C.shade2}"/>
    </g>
    ${floor(650, p)}
    ${person({ x: 610, y: 386, s: 1.05, skin: 'b', hair: 'bob', hairColor: HAIR.dark, top: 'scrubs', scrub: C.green, glove: true,
      arms: [{ shoulder: [-70, 36], elbow: [-112, 120], hand: [-62, 66] }, { shoulder: [70, 36], elbow: [104, 120], hand: [40, 128] }],
      extra: `<g transform="translate(-66 66) rotate(-10)">${tube(-7, 4, { cap: '#8e5bd6', h: 90, w: 16, fill: '#c93c40', level: 0.6 })}<rect x="-5" y="-60" width="12" height="34" rx="2" fill="#fff"/><path d="M-3 -54H5M-3 -49H5M-3 -44H3M-3 -39H5M-3 -34H2" stroke="${C.ink2}" stroke-width="1.4"/></g><ellipse cx="-62" cy="70" rx="13" ry="11" fill="${C.glove}"/>` })}
    <rect x="470" y="530" width="320" height="200" rx="8" fill="#fff" stroke="${C.line}" stroke-width="1.2"/>
    <rect x="462" y="518" width="336" height="18" rx="6" fill="${C.shade}"/>
    <rect x="490" y="560" width="130" height="60" rx="5" fill="${C.wall}" stroke="${C.line}"/><rect x="640" y="560" width="130" height="60" rx="5" fill="${C.wall}" stroke="${C.line}"/>
    <rect x="490" y="636" width="130" height="60" rx="5" fill="${C.wall}" stroke="${C.line}"/><rect x="640" y="636" width="130" height="60" rx="5" fill="${C.wall}" stroke="${C.line}"/>
    <rect x="540" y="574" width="30" height="5" rx="2.5" fill="${C.steel2}"/><rect x="690" y="574" width="30" height="5" rx="2.5" fill="${C.steel2}"/><rect x="540" y="650" width="30" height="5" rx="2.5" fill="${C.steel2}"/><rect x="690" y="650" width="30" height="5" rx="2.5" fill="${C.steel2}"/>
    ${rack(486, 522, ['#8e5bd6', '#e0474c', '#f2c230', '#28cc63', '#4a90e2'], { gap: 24 })}
    <g transform="translate(640 520)"><rect x="0" y="-46" width="44" height="46" rx="6" fill="#f6fafd" stroke="${C.line}"/><circle cx="14" cy="-14" r="9" fill="#fff" stroke="${C.line}"/><circle cx="30" cy="-12" r="8" fill="#fff" stroke="${C.line}"/><circle cx="22" cy="-28" r="8" fill="#fff" stroke="${C.line}"/><rect x="-3" y="-52" width="50" height="8" rx="3" fill="${C.steel}"/></g>
    <g transform="translate(700 520)"><path d="M0 0V-58H62V0Z" fill="#f2c230"/><path d="M-4 -58H66V-72H-4Z" fill="#e0474c"/><rect x="18" y="-40" width="26" height="18" rx="3" fill="#fff" opacity=".85"/></g>
    <path d="M560 512C540 500 520 506 528 514C536 522 590 520 600 510C606 504 596 498 584 504" fill="none" stroke="${C.blue}" stroke-width="7" stroke-linecap="round"/>
    <g>
      <ellipse cx="290" cy="718" rx="120" ry="14" fill="#000" opacity=".08"/>
      <rect x="282" y="600" width="18" height="110" fill="${C.steel2}"/><rect x="200" y="704" width="180" height="12" rx="6" fill="${C.steel2}"/>
      <g transform="rotate(-12 226 596)"><rect x="188" y="330" width="70" height="280" rx="26" fill="${C.deep}"/><rect x="198" y="340" width="50" height="120" rx="20" fill="#14553a"/><rect x="196" y="290" width="54" height="40" rx="16" fill="${C.deep}"/></g>
      <rect x="196" y="560" width="230" height="52" rx="22" fill="${C.deep}"/><rect x="206" y="562" width="200" height="16" rx="8" fill="#1d6a48"/>
      <rect x="402" y="510" width="16" height="64" fill="${C.steel2}"/>
      <g transform="rotate(-8 400 500)"><rect x="330" y="488" width="200" height="34" rx="17" fill="${C.deep}"/><rect x="340" y="490" width="170" height="10" rx="5" fill="#1d6a48"/></g>
      <rect x="410" y="604" width="120" height="30" rx="15" fill="${C.deep}" transform="rotate(10 410 604)"/>
    </g>`,

  // A paediatrician listening to a child's chest; growth chart on the wall.
  pediatrics: (p) => `${wall(p, { a: '#f1f7fc', b: '#e6f0f8' })}
    ${windowPane(560, 110, 170, 250)}
    <g transform="translate(120 150)">
      <rect x="0" y="0" width="56" height="400" rx="8" fill="#fff"/>
      ${Array.from({ length: 9 }, (_, i) => `<rect x="0" y="${16 + i * 42}" width="${i % 2 ? 22 : 34}" height="5" rx="2" fill="${['#f2c230', C.green, C.blue, '#e0474c'][i % 4]}"/>`).join('')}
      <circle cx="40" cy="60" r="9" fill="#f2c230"/><circle cx="40" cy="180" r="9" fill="${C.blue}" opacity=".7"/><circle cx="40" cy="300" r="9" fill="${C.green}"/>
    </g>
    ${pattern(p, 0, 0, 800, 800, 0.04)}
    ${floor(640, p)}
    <rect x="150" y="500" width="340" height="42" rx="16" fill="${C.mint}"/>
    <defs><clipPath id="${p}-seat"><rect x="0" y="0" width="800" height="540"/></clipPath></defs>
    <g clip-path="url(#${p}-seat)">
    ${person({ x: 300, y: 410, s: 0.66, head: 1.3, skin: 'a', hair: 'curly', hairColor: HAIR.auburn, top: 'tee', scrub: '#f2c230', badge: false, arms: [{ shoulder: [-70, 36], elbow: [-96, 120], hand: [-40, 150] }, { shoulder: [70, 36], elbow: [96, 120], hand: [30, 156] }], })}
    </g>
    <rect x="150" y="530" width="340" height="62" rx="14" fill="#fff" stroke="${C.line}"/>
    <path d="M272 540C268 580 270 610 274 640M326 540C330 580 330 610 326 640" stroke="${C.blue}" stroke-width="30" stroke-linecap="round"/>
    <path d="M258 646H288M312 646H342" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/>
    <g transform="translate(298 506) scale(.8)"><circle cx="-26" cy="-26" r="13" fill="#b07a4f"/><circle cx="26" cy="-26" r="13" fill="#b07a4f"/><circle cx="0" cy="0" r="34" fill="#c58d5d"/><circle cx="0" cy="8" r="13" fill="#e8c39c"/><circle cx="-11" cy="-8" r="3.5" fill="${C.ink}"/><circle cx="11" cy="-8" r="3.5" fill="${C.ink}"/><circle cx="0" cy="3" r="4" fill="${C.ink}"/></g>
    <ellipse cx="262" cy="512" rx="10" ry="9" fill="${SKIN.a[0]}"/>
    <path d="M190 592V660M460 592V660" stroke="${C.steel2}" stroke-width="10" stroke-linecap="round"/>
    ${person({ x: 560, y: 390, s: 1.2, skin: 'b', hair: 'short', hairColor: HAIR.black, steth: false, arms: [{ shoulder: [-70, 36], elbow: [-146, 96], hand: [-188, 66] }, { shoulder: [70, 36], elbow: [100, 160], hand: [70, 240] }],
      extra: `<path d="M-25 -2C-50 30 -70 70 -120 86C-160 98 -180 76 -194 68" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><path d="M25 -2C40 26 44 60 36 86" fill="none" stroke="${C.ink}" stroke-width="5" stroke-linecap="round"/><path d="M-25 -2C-18 10 18 10 25 -2" fill="none" stroke="${C.ink}" stroke-width="5"/><circle cx="-202" cy="66" r="12" fill="${C.steel}" stroke="${C.steel2}" stroke-width="2.5"/>` })}
    ${plant(700, 680, 0.8)}`,

  // A specialist at the desk with a patient (seen from behind).
  consult: (p, o = {}) => {
    const d = { skin: 'b', hair: 'long', hairColor: HAIR.dark, glasses: false, ...o.doc };
    return `${wall(p)}
    ${windowPane(70, 110, 160, 290)}
    <rect x="300" y="120" width="190" height="130" rx="6" fill="#fff"/>
    ${pattern(p, 300, 120, 190, 130, 0.2)}
    ${logo(600, 130, 1.1)}
    ${shelf(560, 260, 180, [bottle(576, 260, { cap: C.green, h: 40, w: 22 }), bottle(606, 260, { h: 34, w: 20 }), `<rect x="640" y="222" width="60" height="38" rx="3" fill="${C.mint}"/><rect x="648" y="218" width="44" height="42" rx="3" fill="${C.sky}" opacity=".8"/>`])}
    ${pattern(p, 0, 0, 800, 800, 0.03)}
    ${floor(640, p)}
    ${person({ x: 420, y: 370, s: 1.18, ...d, steth: true, arms: [{ shoulder: [-70, 36], elbow: [-104, 150], hand: [-60, 196] }, { shoulder: [70, 36], elbow: [110, 140], hand: [96, 104] }] })}
    <rect x="150" y="560" width="560" height="22" rx="6" fill="${C.wood}"/><rect x="150" y="578" width="560" height="10" fill="${C.wood2}"/>
    <rect x="170" y="588" width="520" height="120" fill="#fff" stroke="${C.line}"/>
    ${monitor(250, 560, 0.85)}
    ${o.prop === 'ultrasound' ? `<g transform="translate(640 560)"><rect x="-56" y="-120" width="112" height="84" rx="8" fill="${C.ink}"/><rect x="-50" y="-114" width="100" height="72" rx="4" fill="#0e1720"/><path d="M-30 -60C-20 -100 20 -100 30 -60Z" fill="#6b7b88" opacity=".8"/><path d="M-10 -70C-4 -84 6 -84 12 -70" fill="none" stroke="#c8d2da" stroke-width="2"/><rect x="-14" y="-36" width="28" height="36" fill="${C.steel2}"/></g>`
      : `<g transform="translate(600 548)"><rect x="-40" y="-14" width="80" height="14" rx="3" fill="#fff" stroke="${C.line}"/><rect x="-34" y="-28" width="68" height="14" rx="3" fill="${C.mint}"/><path d="M60 -6C80 -6 90 -20 84 -34" fill="none" stroke="${C.ink}" stroke-width="4"/><circle cx="84" cy="-38" r="8" fill="${C.steel}" stroke="${C.steel2}" stroke-width="2"/></g>`}
    <g transform="translate(480 840)">
      <path d="M-150 0C-150 -110 -100 -170 0 -170C100 -170 150 -110 150 0Z" fill="${C.blue}"/>
      <path d="M-26 -170V-200H26V-170Z" fill="${SKIN.c[1]}"/>
      <ellipse cx="0" cy="-250" rx="46" ry="54" fill="${HAIR.black}"/>
    </g>`;
  },

  // Reception with the Human+ logo on the wall.
  reception: (p) => `${wall(p, { a: '#f4f8fb', b: '#e6eff7' })}
    <rect x="160" y="96" width="480" height="250" rx="12" fill="#fff"/>
    ${pattern(p, 160, 96, 480, 250, 0.08)}
    ${logo(330, 150, 1.9)}
    <path d="M220 0V60M400 0V54M580 0V60" stroke="${C.steel2}" stroke-width="3"/>
    <path d="M196 60H244L236 80H204Z" fill="${C.ink}"/><path d="M376 54H424L416 74H384Z" fill="${C.ink}"/><path d="M556 60H604L596 80H564Z" fill="${C.ink}"/>
    <ellipse cx="220" cy="84" rx="12" ry="4" fill="#fff6c8"/><ellipse cx="400" cy="78" rx="12" ry="4" fill="#fff6c8"/><ellipse cx="580" cy="84" rx="12" ry="4" fill="#fff6c8"/>
    ${floor(640, p)}
    ${person({ x: 400, y: 450, s: 1, skin: 'a', hair: 'long', hairColor: HAIR.blonde, top: 'scrubs', scrub: C.green, badge: true, arms: [{ shoulder: [-70, 36], elbow: [-100, 130], hand: [-60, 160] }, { shoulder: [70, 36], elbow: [100, 130], hand: [60, 160] }],
      extra: `<path d="M-34 -72C-40 -110 40 -110 34 -72" fill="none" stroke="${C.ink}" stroke-width="4"/><rect x="-40" y="-76" width="10" height="20" rx="4" fill="${C.ink}"/><path d="M-36 -58C-36 -40 -24 -34 -12 -36" fill="none" stroke="${C.ink}" stroke-width="2.5"/>` })}
    <rect x="120" y="560" width="560" height="240" rx="10" fill="#fff" stroke="${C.line}"/>
    <rect x="110" y="544" width="580" height="24" rx="8" fill="${C.wood}"/>
    <rect x="120" y="620" width="560" height="40" fill="${C.green}"/>
    ${logo(374, 624, 0.42, { sq: C.deep })}
    ${monitor(560, 544, 0.6)}
    ${plant(90, 690, 1)}
    ${chair(730, 700, 1, C.deep)}`,

  // Close-up of the lab bench: analyser, centrifuge, pipette and the sample rack.
  analyzer: (p) => `${wall(p)}
    ${pattern(p, 0, 0, 800, 800, 0.05)}
    ${shelf(90, 220, 300, [bottle(110, 220, { cap: C.green }), bottle(146, 220), bottle(182, 220, { cap: '#e0474c', h: 44 }), bottle(218, 220, { color: '#fdf3e2', label: '#fff' }), bottle(254, 220, { cap: C.blue })])}
    <rect x="0" y="560" width="800" height="240" fill="#fff"/>
    <rect x="0" y="548" width="800" height="22" fill="${C.shade}"/><rect x="0" y="568" width="800" height="6" fill="${C.shade2}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${40 + i * 124}" y="590" width="112" height="170" rx="6" fill="${C.wall}" stroke="${C.line}" stroke-width="1.2"/><rect x="${84 + i * 124}" y="604" width="24" height="5" rx="2.5" fill="${C.steel2}"/>`).join('')}
    ${analyzer(p, 300, 552, 1.6)}
    ${centrifuge(190, 552, 1)}
    ${rack(96, 552, CAPS.slice(0, 2), { gap: 24 })}
    <g transform="translate(690 548) rotate(-6)"><path d="M0 0L-5 -80L5 -80L9 0Z" fill="#fff" stroke="${C.line}"/><rect x="-11" y="-118" width="22" height="40" rx="6" fill="${C.green}"/><rect x="-4" y="-132" width="8" height="16" rx="3" fill="${C.ink2}"/></g>
`,
};

// Per-scene framing (viewBox) — zooms in on the subject.
const VIEW = { lab: '120 180 560 560', analyzer: '90 170 620 620', reception: '60 60 680 680' };

// Team portraits (roles only — names and real photos come from the clinic).
const portrait = (p, who, tone = C.mint2) => `<defs><radialGradient id="${p}-pg" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="${tone}"/></radialGradient></defs>
  <rect width="800" height="800" fill="url(#${p}-pg)"/>
  ${pattern(p, 0, 0, 800, 800, 0.07)}
  <circle cx="400" cy="380" r="250" fill="#fff" opacity=".7"/>
  ${person({ x: 400, y: 440, s: 1.75, ...who })}`;
SCENES['team-doctor'] = (p) => portrait(p, { skin: 'b', hair: 'long', hairColor: HAIR.dark, steth: true, arms: 'down' });
SCENES['team-lab'] = (p) => portrait(p, { skin: 'a', hair: 'cap', hairColor: '#cfe3f5', mask: true, glasses: true, scrub: '#1f9e8a', glove: true, arms: 'down' }, '#e0edf9');
SCENES['team-nurse'] = (p) => portrait(p, { skin: 'c', hair: 'bun', hairColor: HAIR.black, top: 'scrubs', scrub: C.green, arms: 'down' });

// Gentle motion inside the pictures: the analyser's trace redraws and its light blinks (still for reduced motion).
const STYLE = `<style>.sc-graph{stroke-dasharray:240;animation:sc-draw 6s ease-in-out infinite}.sc-blink{animation:sc-blink 2.4s ease-in-out infinite}@keyframes sc-draw{0%{stroke-dashoffset:240}40%,100%{stroke-dashoffset:0}}@keyframes sc-blink{50%{opacity:.25}}@media (prefers-reduced-motion:reduce){.sc-graph,.sc-blink{animation:none}}</style>`;

/** One scene as a standalone SVG document (served as an image file; the page gives it its alt text). */
export function scene(name, { variant } = {}) {
  const art = SCENES[name] ?? SCENES.doctor;
  const vb = VIEW[name] ?? '0 0 800 800';
  const [, , w, hgt] = vb.split(' ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${hgt}" preserveAspectRatio="xMidYMid slice">${STYLE}${art('s', variant ?? {})}</svg>`;
}

export const SCENE_NAMES = Object.keys(SCENES);
