// The clinic's staff, shown on /stafi/ (Stafi / Our team / Unser Team), on a biography page each (/stafi/<slug>/)
// and on the pages of the services they work in. Only real people, with their written permission for the name, the
// text and the photo (CLAUDE.md: missing facts stay missing). Until the clinic sends the details the list is empty,
// and /stafi/ says that the profiles are being prepared. README → Staff.
//
// One entry per person (all texts in sq, en and de — the build stops if one is missing):
// {
//   slug: 'emri-mbiemri',                       // the address: /stafi/emri-mbiemri/
//   name: 'Dr. Emri Mbiemri',                    // as the person wants it written, with their title
//   group: 'doctor',                             // 'doctor' | 'lab' | 'nurse' | 'reception'
//   services: ['pediatri'],                      // slugs from services.mjs: those pages list the person
//   title: { sq: 'Pediatre', en: 'Paediatrician', de: 'Kinderärztin' },
//   bio: { sq: ['Paragrafi i parë …', '…'], en: ['…'], de: ['…'] },
//   education: { sq: ['…'], en: ['…'], de: ['…'] },   // optional
//   languages: ['sq', 'en', 'de'],               // optional: languages the person speaks (ISO codes)
// }
// Photo (optional): src/assets/photos/stafi-<slug>.jpg (or .webp; a phone copy stafi-<slug>-sm.jpg). Without one,
// the person's initials are shown — never an illustration or a stock photo in their place.
export const TEAM = [];

export const TEAM_GROUPS = ['doctor', 'lab', 'nurse', 'reception'];
