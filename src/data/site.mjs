// Human+ Qendra Diagnostike — facts used everywhere on the site (header, footer, contact, JSON-LD, booking).
// Sources: the previous humanplusks.com (address, phones, e-mail, hours, departments, "since 2011"),
// the clinic's Facebook page and a 2025 job post (Rruga B, Nr. 16). Edit here first — see README → Editing.

export const SITE = {
  name: 'Human+',
  fullName: 'Human+ Qendra Diagnostike',
  legalName: 'Qendra Diagnostike Human Plus',
  founded: 2011,
  // The laboratory continues the work of BAKTOLAB (Facebook / TolloMed listing).
  predecessor: 'BAKTOLAB',

  address: {
    street: 'Rruga B, Nr. 16',
    postalCode: '10000',
    city: 'Prishtinë',
    cityEn: 'Prishtina',
    country: 'XK',
  },
  // Google Maps search link (no embed, no cookies). Replace with the clinic's own Maps place link when known.
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Qendra+Diagnostike+Human+Plus%2C+Rruga+B+16%2C+Prishtin%C3%AB',
  mapsDirections: 'https://www.google.com/maps/dir/?api=1&destination=Qendra+Diagnostike+Human+Plus%2C+Rruga+B+16%2C+Prishtin%C3%AB',
  // Mini map (home and contact pages): Google Maps for the same search, loaded only after the visitor clicks
  // "Show the map" — no request to Google before that. For the exact pin, replace it with the src of
  // Google Maps → Share → Embed a map (https://www.google.com/maps/embed?pb=…).
  mapsEmbed: 'https://maps.google.com/maps?q=Qendra+Diagnostike+Human+Plus%2C+Rruga+B+16%2C+Prishtin%C3%AB&z=16&output=embed',

  // Phones as listed on the previous site. `tel` is the dialable form, `display` how it is printed.
  phones: [
    { id: 'vala', label: 'Vala', tel: '+38344709072', display: '+383 44 709 072' },
    { id: 'ipko', label: 'IPKO', tel: '+38348750150', display: '+383 48 750 150' },
    { id: 'fix', label: { sq: 'Fiks', en: 'Landline', de: 'Festnetz' }, tel: '+38338750150', display: '+383 38 750 150' },
  ],
  // Number used for WhatsApp / Viber booking and lab-list messages (digits only, international, no "+").
  whatsapp: '38344709072',
  viber: '+38344709072',
  email: 'info@humanplusks.com',
  facebook: 'https://www.facebook.com/QDHumanPlus/',
  // Instagram and TikTok: paste the clinic's own profile links (e.g. 'https://www.instagram.com/<name>/',
  // 'https://www.tiktok.com/@<name>'). Empty = the icon is not shown anywhere. Never guess a handle.
  instagram: '',
  tiktok: '',

  // Opening hours, Kosovo time (Europe/Belgrade). Day 0 = Sunday … 6 = Saturday. `null` = closed.
  timeZone: 'Europe/Belgrade',
  hours: {
    0: null,
    1: ['07:30', '19:00'],
    2: ['07:30', '19:00'],
    3: ['07:30', '19:00'],
    4: ['07:30', '19:00'],
    5: ['07:30', '19:00'],
    6: ['08:00', '16:00'],
  },
  // Booking request slots (minutes). The last slot starts this many minutes before closing.
  slotMinutes: 30,
  lastSlotBeforeClose: 30,
  bookingDays: 14,

  // Optional: a form service URL (e.g. Formspree) to receive booking / contact requests by e-mail as well.
  // Empty = WhatsApp / Viber / e-mail links only (works without any account).
  formEndpoint: '',
};

/** The social profiles that are set, in display order: [{ id, name, url, handle }]. */
export const SOCIALS = [
  ['facebook', 'Facebook'],
  ['instagram', 'Instagram'],
  ['tiktok', 'TikTok'],
]
  .filter(([id]) => SITE[id])
  .map(([id, name]) => ({ id, name, url: SITE[id], handle: SITE[id].replace(/\/+$/, '').split('/').pop() }));

export const LANGS = ['sq', 'en', 'de'];
export const DEFAULT_LANG = 'sq';
