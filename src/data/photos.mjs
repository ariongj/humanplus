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
    alt: { sq: 'Mjeke me stetoskop dhe tablet, me laboratorin pas xhamit', en: 'A doctor with a stethoscope and a tablet, the laboratory behind the glass', de: 'Eine Ärztin mit Stethoskop und Tablet, hinter der Glasscheibe das Labor' },
  },
  lab: {
    scene: 'lab',
    alt: { sq: 'Teknik laboratori me maskë dhe doreza mban një epruvetë pranë mikroskopit dhe analizatorit', en: 'A laboratory technician in mask and gloves holds up a sample tube by the microscope and analyser', de: 'Ein Labortechniker mit Maske und Handschuhen hält neben dem Mikroskop und dem Analysegerät ein Probenröhrchen hoch' },
  },
  analyzer: {
    scene: 'analyzer',
    alt: { sq: 'Analizatori i laboratorit me epruveta, centrifuga dhe pipeta', en: 'The laboratory analyser with sample tubes, a centrifuge and a pipette', de: 'Das Analysegerät des Labors mit Probenröhrchen, einer Zentrifuge und einer Pipette' },
  },
  sampling: {
    scene: 'sampling',
    alt: { sq: 'Dhoma e marrjes së mostrave: karrigia për marrjen e gjakut dhe infermierja që etiketon epruvetën', en: 'The sample room: the blood-draw chair and a nurse labelling a tube', de: 'Der Raum für die Probenentnahme: der Blutentnahmestuhl und eine Pflegerin, die ein Röhrchen beschriftet' },
  },
  pediatrics: {
    scene: 'pediatrics',
    alt: { sq: 'Pediatri dëgjon me stetoskop një fëmijë që mban një arush', en: 'A paediatrician listens with a stethoscope to a child holding a teddy bear', de: 'Ein Kinderarzt hört mit dem Stethoskop ein Kind ab, das einen Teddybären hält' },
  },
  consult: {
    scene: 'consult',
    alt: { sq: 'Konsultë me specialist në ordinancë', en: 'A consultation in a specialist’s room', de: 'Eine fachärztliche Beratung im Sprechzimmer' },
  },
  reception: {
    scene: 'reception',
    alt: { sq: 'Recepsioni i Human+ me logon në mur', en: 'The Human+ reception with the logo on the wall', de: 'Die Rezeption von Human+ mit dem Logo an der Wand' },
  },
  // About and contact page headers (the reception scene until they have photos of their own).
  about: {
    scene: 'reception',
    alt: { sq: 'Recepsioni i Human+ me logon në mur', en: 'The Human+ reception with the logo on the wall', de: 'Die Rezeption von Human+ mit dem Logo an der Wand' },
  },
  contact: {
    scene: 'reception',
    alt: { sq: 'Recepsioni i Human+ me logon në mur', en: 'The Human+ reception with the logo on the wall', de: 'Die Rezeption von Human+ mit dem Logo an der Wand' },
  },
  'team-doctor': {
    scene: 'team-doctor',
    alt: { sq: 'Mjeke specialiste me stetoskop', en: 'A specialist doctor with a stethoscope', de: 'Eine Fachärztin mit Stethoskop' },
  },
  'team-lab': {
    scene: 'team-lab',
    alt: { sq: 'Teknik laboratori me maskë dhe syze mbrojtëse', en: 'A laboratory technician in a mask and safety glasses', de: 'Ein Labortechniker mit Maske und Schutzbrille' },
  },
  'team-nurse': {
    scene: 'team-nurse',
    alt: { sq: 'Infermiere me uniformë të gjelbër', en: 'A nurse in green scrubs', de: 'Eine Pflegerin in grüner Berufskleidung' },
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
  endokrinologji: consult({ skin: 'c', hair: 'bun', hairColor: '#16110e' }),
  'suplemente-dhe-nutricion': consult({ skin: 'b', hair: 'long', hairColor: '#5a3520' }),
};
