// FICTIONAL sample profiles, so the staff pages can be judged before the clinic sends the real ones. These people do
// not exist: names, texts and portraits are made up. They are shown only on the GitHub Pages preview while TEAM in
// team.mjs is empty, every card and page is marked "Shembull" / "Example" / "Beispiel", the pages carry no Person
// data, and a production build (SITE_URL on the clinic's own domain) never shows them. README → Staff.
//
// Same format as team.mjs, plus `portrait`: an illustrated portrait (src/lib/scenes.mjs → person()) standing in for
// the photo. Real people never get one: they have their own photo or their initials.
export const TEAM_SAMPLES = [
  {
    slug: 'elira-kryeziu',
    name: 'Dr. Elira Kryeziu',
    group: 'doctor',
    services: ['pediatri'],
    title: { sq: 'Pediatre', en: 'Paediatrician', de: 'Kinderärztin' },
    bio: {
      sq: [
        'Dr. Elira Kryeziu është pediatre me mbi dhjetë vjet përvojë në kujdesin për fëmijët, nga të porsalindurit deri te adoleshentët. Në Human+ bën kontrollet e rregullta, ndjek rritjen dhe zhvillimin e fëmijëve dhe shqyrton analizat e tyre bashkë me prindërit.',
        'Ajo i jep kohë secilës vizitë: u shpjegon prindërve me fjalë të thjeshta çfarë tregojnë gjetjet dhe çfarë duhet bërë më tej, dhe kujdeset që fëmija të ndihet i qetë gjatë kontrollit.',
      ],
      en: [
        'Dr. Elira Kryeziu is a paediatrician with more than ten years of experience caring for children, from newborns to teenagers. At Human+ she does regular check-ups, follows children’s growth and development, and goes through their test results together with the parents.',
        'She takes time for every visit: she explains to parents in plain words what the findings show and what comes next, and makes sure the child feels at ease during the check-up.',
      ],
      de: [
        'Dr. Elira Kryeziu ist Kinderärztin mit mehr als zehn Jahren Erfahrung in der Betreuung von Kindern, vom Neugeborenen bis zum Jugendlichen. Bei Human+ führt sie die regelmäßigen Vorsorgeuntersuchungen durch, begleitet Wachstum und Entwicklung der Kinder und bespricht ihre Laborergebnisse gemeinsam mit den Eltern.',
        'Sie nimmt sich für jeden Besuch Zeit: Sie erklärt den Eltern in einfachen Worten, was die Befunde zeigen und wie es weitergeht, und sorgt dafür, dass sich das Kind während der Untersuchung wohlfühlt.',
      ],
    },
    education: {
      sq: ['Studimet në mjekësi, Fakulteti i Mjekësisë', 'Specializimi në pediatri', 'Trajnim për ushqyerjen e foshnjave dhe të fëmijëve të vegjël'],
      en: ['Medical degree, Faculty of Medicine', 'Specialist training in paediatrics', 'Training in infant and young child feeding'],
      de: ['Medizinstudium, Medizinische Fakultät', 'Facharztausbildung in Kinder- und Jugendmedizin', 'Fortbildung zur Ernährung von Säuglingen und Kleinkindern'],
    },
    languages: ['sq', 'en', 'de'],
    portrait: { skin: 'b', hair: 'long', hairColor: 'brown', steth: true },
  },
  {
    slug: 'vesa-limani',
    name: 'Dr. Vesa Limani',
    group: 'doctor',
    services: ['gjinekologji'],
    title: { sq: 'Gjinekologe-obstetere', en: 'Obstetrician and gynaecologist', de: 'Gynäkologin und Geburtshelferin' },
    bio: {
      sq: [
        'Dr. Vesa Limani është gjinekologe-obstetere. Ajo bën kontrollet gjinekologjike, ndjek shtatzëninë dhe i këshillon gratë për çështjet hormonale dhe për kontrollet parandaluese në çdo moshë.',
        'Në punën e saj mbështetet te biseda e hapur: para çdo vendimi ajo i shpjegon pacientes mundësitë dhe i lë kohë për pyetje.',
      ],
      en: [
        'Dr. Vesa Limani is an obstetrician and gynaecologist. She does gynaecological check-ups, follows pregnancies and advises women on hormonal questions and on preventive check-ups at every age.',
        'Her work rests on open conversation: before every decision she explains the options to the patient and leaves time for questions.',
      ],
      de: [
        'Dr. Vesa Limani ist Gynäkologin und Geburtshelferin. Sie führt gynäkologische Untersuchungen durch, begleitet Schwangerschaften und berät Frauen jeden Alters zu hormonellen Fragen und zur Vorsorge.',
        'Ihre Arbeit beruht auf dem offenen Gespräch: Vor jeder Entscheidung erklärt sie der Patientin die Möglichkeiten und lässt Zeit für Fragen.',
      ],
    },
    education: {
      sq: ['Studimet në mjekësi, Fakulteti i Mjekësisë', 'Specializimi në gjinekologji dhe obstetrikë'],
      en: ['Medical degree, Faculty of Medicine', 'Specialist training in obstetrics and gynaecology'],
      de: ['Medizinstudium, Medizinische Fakultät', 'Facharztausbildung in Frauenheilkunde und Geburtshilfe'],
    },
    languages: ['sq', 'en'],
    portrait: { skin: 'a', hair: 'bob', hairColor: 'auburn', glasses: true, steth: true },
  },
  {
    slug: 'dardan-sopi',
    name: 'Dr. Dardan Sopi',
    group: 'doctor',
    services: ['endokrinologji'],
    title: { sq: 'Endokrinolog', en: 'Endocrinologist', de: 'Endokrinologe' },
    bio: {
      sq: [
        'Dr. Dardan Sopi është endokrinolog. Ai trajton sëmundjet e tiroides, diabetin dhe çrregullimet e tjera hormonale, dhe i ndjek pacientët me kontrolle të rregullta.',
        'Bashkë me laboratorin cakton analizat që i duhen secilit pacient dhe e shpjegon planin e trajtimit qartë, hap pas hapi.',
      ],
      en: [
        'Dr. Dardan Sopi is an endocrinologist. He treats thyroid disease, diabetes and other hormonal disorders, and follows his patients with regular check-ups.',
        'Together with the laboratory he chooses the tests each patient needs and explains the treatment plan clearly, step by step.',
      ],
      de: [
        'Dr. Dardan Sopi ist Endokrinologe. Er behandelt Schilddrüsenerkrankungen, Diabetes und andere hormonelle Störungen und begleitet seine Patientinnen und Patienten mit regelmäßigen Kontrollen.',
        'Gemeinsam mit dem Labor legt er fest, welche Untersuchungen jede Patientin und jeder Patient braucht, und erklärt den Behandlungsplan klar, Schritt für Schritt.',
      ],
    },
    education: {
      sq: ['Studimet në mjekësi, Fakulteti i Mjekësisë', 'Specializimi në sëmundjet e brendshme', 'Subspecializimi në endokrinologji'],
      en: ['Medical degree, Faculty of Medicine', 'Specialist training in internal medicine', 'Sub-specialisation in endocrinology'],
      de: ['Medizinstudium, Medizinische Fakultät', 'Facharztausbildung in Innerer Medizin', 'Schwerpunkt Endokrinologie'],
    },
    languages: ['sq', 'en', 'de'],
    portrait: { skin: 'c', hair: 'short', hairColor: 'black', steth: true },
  },
  {
    slug: 'teuta-hasani',
    name: 'Mr. sc. Teuta Hasani',
    group: 'lab',
    services: ['hematologji', 'biokimi', 'hormone', 'imunologji'],
    title: { sq: 'Biokimiste klinike, udhëheqëse e laboratorit', en: 'Clinical biochemist, head of the laboratory', de: 'Klinische Biochemikerin, Leiterin des Labors' },
    bio: {
      sq: [
        'Mr. sc. Teuta Hasani udhëheq laboratorin e Human+. Ajo mbikëqyr punën e përditshme në hematologji, biokimi, hormone dhe imunologji dhe kujdeset që çdo rezultat të kontrollohet para se të dorëzohet.',
        'Mjekët dhe pacientët i drejtohen asaj kur kanë pyetje për përgatitjen dhe për mostrat.',
      ],
      en: [
        'Teuta Hasani heads the Human+ laboratory. She oversees the daily work in haematology, biochemistry, hormones and immunology and makes sure every result is checked before it is released.',
        'Doctors and patients turn to her with questions about preparation and samples.',
      ],
      de: [
        'Teuta Hasani leitet das Labor von Human+. Sie überwacht die tägliche Arbeit in Hämatologie, Biochemie, Hormonanalytik und Immunologie und sorgt dafür, dass jedes Ergebnis geprüft wird, bevor es herausgegeben wird.',
        'Ärztinnen, Ärzte und Patienten wenden sich mit Fragen zur Vorbereitung und zu den Proben an sie.',
      ],
    },
    education: {
      sq: ['Studimet në biokimi', 'Magjistratura në biokimi klinike'],
      en: ['Degree in biochemistry', 'MSc in clinical biochemistry'],
      de: ['Studium der Biochemie', 'Master in Klinischer Biochemie'],
    },
    languages: ['sq', 'en'],
    portrait: { skin: 'a', hair: 'bun', hairColor: 'dark', glasses: true, tone: '#e0edf9' },
  },
  {
    slug: 'ilir-bajrami',
    name: 'Dr. Ilir Bajrami',
    group: 'lab',
    services: ['mikrobiologji'],
    title: { sq: 'Mikrobiolog klinik', en: 'Clinical microbiologist', de: 'Klinischer Mikrobiologe' },
    bio: {
      sq: [
        'Dr. Ilir Bajrami është mikrobiolog klinik. Ai merret me urokulturat, kulturat e strishove dhe antibiogramin, si dhe me analizat parazitologjike dhe mikologjike.',
        'Kur një kulturë tregon infeksion, antibiogrami që përgatit ai i tregon mjekut cili antibiotik vepron dhe cili jo.',
      ],
      en: [
        'Dr. Ilir Bajrami is a clinical microbiologist. He is responsible for urine cultures, swab cultures and antibiograms, as well as parasitology and mycology tests.',
        'When a culture shows an infection, the antibiogram he prepares tells the doctor which antibiotics work and which do not.',
      ],
      de: [
        'Dr. Ilir Bajrami ist klinischer Mikrobiologe. Er ist zuständig für Urinkulturen, Abstrichkulturen und Antibiogramme sowie für parasitologische und mykologische Untersuchungen.',
        'Zeigt eine Kultur eine Infektion, sagt das von ihm erstellte Antibiogramm dem Arzt, welche Antibiotika wirken und welche nicht.',
      ],
    },
    education: {
      sq: ['Studimet në mjekësi, Fakulteti i Mjekësisë', 'Specializimi në mikrobiologji klinike'],
      en: ['Medical degree, Faculty of Medicine', 'Specialist training in clinical microbiology'],
      de: ['Medizinstudium, Medizinische Fakultät', 'Facharztausbildung in Mikrobiologie'],
    },
    languages: ['sq', 'en'],
    portrait: { skin: 'b', hair: 'short', hairColor: 'brown', glasses: true, tone: '#e0edf9' },
  },
  {
    slug: 'florentina-rama',
    name: 'Florentina Rama',
    group: 'lab',
    services: ['hematologji', 'biokimi'],
    title: { sq: 'Teknike e laboratorit', en: 'Laboratory technician', de: 'Medizinisch-technische Laborassistentin' },
    bio: {
      sq: [
        'Florentina Rama punon në laborator, te aparatet e hematologjisë dhe të biokimisë. Ajo i përgatit mostrat, i vendos në aparate dhe i kontrollon rezultatet para se t’i dërgojë për miratim.',
        'Në fillim të çdo turni i kontrollon aparatet me mostrat e kontrollit, që rezultatet e ditës të jenë të sakta.',
      ],
      en: [
        'Florentina Rama works in the laboratory on the haematology and biochemistry analysers. She prepares the samples, loads them onto the analysers and checks the results before sending them for approval.',
        'At the start of every shift she checks the analysers with control samples, so that the day’s results are accurate.',
      ],
      de: [
        'Florentina Rama arbeitet im Labor an den Analysegeräten für Hämatologie und Biochemie. Sie bereitet die Proben vor, gibt sie in die Geräte und prüft die Ergebnisse, bevor sie sie zur Freigabe weiterleitet.',
        'Zu Beginn jeder Schicht prüft sie die Geräte mit Kontrollproben, damit die Ergebnisse des Tages stimmen.',
      ],
    },
    education: {
      sq: ['Bachelor në shkenca laboratorike mjekësore'],
      en: ['Bachelor in medical laboratory science'],
      de: ['Bachelor in Biomedizinischer Analytik'],
    },
    languages: ['sq', 'en'],
    portrait: { skin: 'c', hair: 'cap', hairColor: '#cfe3f5', mask: true, glasses: true, scrub: '#1f9e8a', glove: true, tone: '#e0edf9' },
  },
  {
    slug: 'liridona-zeqiri',
    name: 'Liridona Zeqiri',
    group: 'nurse',
    services: [],
    title: { sq: 'Infermiere', en: 'Nurse', de: 'Pflegefachfrau' },
    bio: {
      sq: [
        'Liridona Zeqiri është infermiere në dhomën e marrjes së mostrave. Ajo merr gjakun dhe mostrat e tjera, edhe te fëmijët, dhe ju tregon si të përgatiteni për analizat.',
        'Pacientët e njohin për dorën e lehtë dhe për durimin me ata që kanë frikë nga gjilpëra.',
      ],
      en: [
        'Liridona Zeqiri is a nurse in the sample room. She takes blood and other samples, children’s included, and tells you how to prepare for your tests.',
        'Patients know her for her gentle hand and her patience with anyone who is afraid of needles.',
      ],
      de: [
        'Liridona Zeqiri ist Pflegefachfrau im Raum für die Probenentnahme. Sie nimmt Blut und andere Proben ab, auch bei Kindern, und erklärt Ihnen, wie Sie sich auf Ihre Untersuchungen vorbereiten.',
        'Die Patienten schätzen ihre ruhige Hand und ihre Geduld mit allen, die Angst vor der Nadel haben.',
      ],
    },
    education: {
      sq: ['Shkolla e mesme e mjekësisë, drejtimi infermier', 'Bachelor në infermieri'],
      en: ['Secondary medical school, nursing', 'Bachelor in nursing'],
      de: ['Medizinische Fachschule, Fachrichtung Pflege', 'Bachelor in Pflege'],
    },
    languages: ['sq', 'en'],
    portrait: { skin: 'c', hair: 'bun', hairColor: 'black', top: 'scrubs', scrub: '#28cc63' },
  },
  {
    // no portrait: shows how a profile looks before the person's photo arrives (their initials)
    slug: 'drita-ahmeti',
    name: 'Drita Ahmeti',
    group: 'reception',
    services: [],
    title: { sq: 'Recepsioniste', en: 'Receptionist', de: 'Mitarbeiterin am Empfang' },
    bio: {
      sq: [
        'Drita Ahmeti ju pret në recepsion. Ajo i cakton terminet, u përgjigjet thirrjeve dhe mesazheve në WhatsApp dhe ju tregon kur dhe si t’i merrni rezultatet.',
        'Nëse nuk e dini te cili mjek të shkoni ose cilat analiza ju duhen, ajo ju drejton te personi i duhur.',
      ],
      en: [
        'Drita Ahmeti welcomes you at reception. She books appointments, answers calls and WhatsApp messages, and tells you when and how to collect your results.',
        'If you are not sure which doctor to see or which tests you need, she points you to the right person.',
      ],
      de: [
        'Drita Ahmeti empfängt Sie an der Rezeption. Sie vergibt Termine, beantwortet Anrufe und WhatsApp-Nachrichten und sagt Ihnen, wann und wie Sie Ihre Ergebnisse erhalten.',
        'Wenn Sie nicht sicher sind, welchen Arzt Sie aufsuchen sollen oder welche Untersuchungen Sie brauchen, verweist sie Sie an die richtige Person.',
      ],
    },
    languages: ['sq', 'en', 'de'],
  },
];
