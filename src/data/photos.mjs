// Photo slots. Until the clinic sends its own photos, each slot shows an illustrated scene of the centre
// (src/lib/scenes.mjs). To use a real photo, put it in src/assets/photos/ named after the slot — e.g.
// hero.jpg, lab.webp, team-doctor.jpg, sherbim-pediatri.jpg — and rebuild: the photo replaces the scene
// everywhere that slot is used. Optional smaller copy for phones: <slot>-sm.<ext> (about 800 px wide).
// Then change `alt` below so it describes what the real photo shows. README → Photos.
//
// Only the clinic's own photos, with the permission of everyone in them — no stock photos (CLAUDE.md).

export const PHOTOS = {
  hero: {
    scene: 'doctor',
    alt: { sq: 'Mjeke me stetoskop dhe tablet, me laboratorin pas xhamit', en: 'A doctor with a stethoscope and a tablet, the laboratory behind the glass' },
  },
  lab: {
    scene: 'lab',
    alt: { sq: 'Teknik laboratori me maskë dhe doreza mban një epruvetë pranë mikroskopit dhe analizatorit', en: 'A laboratory technician in mask and gloves holds up a sample tube by the microscope and analyser' },
  },
  analyzer: {
    scene: 'analyzer',
    alt: { sq: 'Analizatori i laboratorit me epruveta, centrifuga dhe pipeta', en: 'The laboratory analyser with sample tubes, a centrifuge and a pipette' },
  },
  sampling: {
    scene: 'sampling',
    alt: { sq: 'Dhoma e marrjes së mostrave: karrigia për marrjen e gjakut dhe infermierja që etiketon epruvetën', en: 'The sample room: the blood-draw chair and a nurse labelling a tube' },
  },
  pediatrics: {
    scene: 'pediatrics',
    alt: { sq: 'Pediatri dëgjon me stetoskop një fëmijë që mban një arush', en: 'A paediatrician listens with a stethoscope to a child holding a teddy bear' },
  },
  consult: {
    scene: 'consult',
    alt: { sq: 'Konsultë me specialist në ordinancë', en: 'A consultation in a specialist’s room' },
  },
  reception: {
    scene: 'reception',
    alt: { sq: 'Recepsioni i Human+ me logon në mur', en: 'The Human+ reception with the logo on the wall' },
  },
  'team-doctor': {
    scene: 'team-doctor',
    alt: { sq: 'Mjeke specialiste me stetoskop', en: 'A specialist doctor with a stethoscope' },
  },
  'team-lab': {
    scene: 'team-lab',
    alt: { sq: 'Teknik laboratori me maskë dhe syze mbrojtëse', en: 'A laboratory technician in a mask and safety glasses' },
  },
  'team-nurse': {
    scene: 'team-nurse',
    alt: { sq: 'Infermiere me uniformë të gjelbër', en: 'A nurse in green scrubs' },
  },
};

// Department pages: slot "sherbim-<slug>" (e.g. sherbim-pediatri.jpg). Without a photo, the scene below —
// the specialist's room drawn with a different doctor for each department.
const consult = (doc, prop) => ({ scene: 'consult', variant: { doc, prop }, alt: PHOTOS.consult.alt });
export const SERVICE_PHOTOS = {
  pediatri: PHOTOS.pediatrics,
  gjinekologji: consult({ skin: 'a', hair: 'long', hairColor: '#2b1d16' }, 'ultrasound'),
  'laboratori-biokimik-dhe-hematologjik': PHOTOS.analyzer,
  'laboratori-mikrobiologjik': PHOTOS.lab,
  'mjekesi-familjare': consult({ skin: 'b', hair: 'short', hairColor: '#16110e', glasses: true }),
  urologji: consult({ skin: 'a', hair: 'short', hairColor: '#5a3520' }, 'ultrasound'),
  endokrinologji: consult({ skin: 'c', hair: 'bun', hairColor: '#16110e' }),
  gastroenterologji: consult({ skin: 'b', hair: 'short', hairColor: '#9aa3ab', glasses: true }, 'ultrasound'),
  dermatologji: consult({ skin: 'a', hair: 'bob', hairColor: '#7a3b1e' }),
  'suplemente-dhe-nutricion': consult({ skin: 'b', hair: 'long', hairColor: '#5a3520' }),
};
