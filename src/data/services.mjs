// Departments ("Shërbimet"). The slugs keep the previous site's address pattern (/sherbim/pediatri/,
// /en/sherbim/pediatri/), so old links and search results keep working.
// Pediatrics text follows the previous site; the other descriptions describe each specialty's usual scope and
// stay deliberately general — confirm the details with the clinic (README → What is placeholder).

// Departments the clinic no longer lists. Their old addresses (/sherbim/<slug>/ in every language) send visitors to
// /sherbimet/ (a redirect page, and a 301 in .htaccess on the production server) — see scripts/build.mjs.
export const RETIRED_SERVICES = ['urologji', 'gastroenterologji', 'dermatologji'];

export const SERVICES = [
  {
    slug: 'pediatri',
    icon: 'baby',
    tone: 'sun',
    name: { sq: 'Pediatri', en: 'Paediatrics', de: 'Kinderheilkunde' },
    short: {
      sq: 'Kontrolle rutinë, ndjekje e rritjes dhe zhvillimit, diagnostikim dhe trajtim i sëmundjeve te fëmijët.',
      en: 'Routine check-ups, growth and development monitoring, diagnosis and treatment of illness in children.',
      de: 'Routineuntersuchungen, Kontrolle von Wachstum und Entwicklung, Diagnose und Behandlung von Erkrankungen bei Kindern.',
    },
    intro: {
      sq: 'Që nga viti 2011 kemi qenë pranë mijëra prindërve dhe fëmijëve. Shëndeti i fëmijës suaj është prioriteti ynë — nga kontrollet e para të foshnjës deri te vizitat në moshën shkollore.',
      en: 'Since 2011 we have looked after thousands of parents and children. Your child’s health is our priority — from a baby’s first check-ups to visits at school age.',
      de: 'Seit 2011 betreuen wir Tausende Eltern und Kinder. Die Gesundheit Ihres Kindes steht für uns an erster Stelle — von den ersten Untersuchungen im Babyalter bis zu den Arztbesuchen im Schulalter.',
    },
    items: {
      sq: [
        'Kontrolle rutinë dhe ndjekje e rritjes — pesha, gjatësia, zhvillimi motorik dhe kognitiv',
        'Kujdes për të porsalindurit dhe foshnjat',
        'Diagnostikim dhe trajtim i sëmundjeve akute dhe kronike, përfshirë alergjitë',
        'Vlerësim kur keni shqetësime për zhvillimin e fëmijës',
        'Parandalim i infeksioneve dhe këshilla për ushqyerjen',
        'Analiza për fëmijë: gjaku, alergjitë, intoleranca ushqimore, vitamina D dhe B12',
      ],
      en: [
        'Routine check-ups and growth monitoring — weight, height, motor and cognitive development',
        'Care for newborns and babies',
        'Diagnosis and treatment of acute and chronic illness, including allergies',
        'Assessment when you are worried about your child’s development',
        'Infection prevention and nutrition advice',
        'Tests for children: blood count, allergies, food intolerance, vitamin D and B12',
      ],
      de: [
        'Routineuntersuchungen und Wachstumskontrolle — Gewicht, Größe, motorische und kognitive Entwicklung',
        'Betreuung von Neugeborenen und Säuglingen',
        'Diagnose und Behandlung akuter und chronischer Erkrankungen, einschließlich Allergien',
        'Abklärung, wenn Sie sich um die Entwicklung Ihres Kindes sorgen',
        'Infektionsvorbeugung und Ernährungsberatung',
        'Laboranalysen für Kinder: Blutwerte, Allergien, Nahrungsmittelunverträglichkeit, Vitamin D und B12',
      ],
    },
    tests: ['cbc', 'crp', 'ferritin', 'vitd', 'b12', 'ige', 'allergy-panel', 'food-intolerance', 'urinalysis', 'stool-parasites'],
  },
  {
    slug: 'gjinekologji',
    icon: 'venus',
    tone: 'rose',
    name: { sq: 'Gjinekologji', en: 'Gynaecology', de: 'Gynäkologie' },
    short: {
      sq: 'Kontrolle gjinekologjike, këshillim dhe analiza për shëndetin e gruas në çdo moshë.',
      en: 'Gynaecological check-ups, advice and tests for women’s health at every age.',
      de: 'Gynäkologische Untersuchungen, Beratung und Laboranalysen für die Gesundheit der Frau in jedem Alter.',
    },
    intro: {
      sq: 'Shëndeti i gruas kërkon kohë, besim dhe diskrecion. Ju presim për kontrolle të rregullta, për një shqetësim të ri ose për ndjekje sipas udhëzimit të mjekut — me analizat hormonale dhe brisët në të njëjtën qendër.',
      en: 'Women’s health needs time, trust and discretion. Come for a regular check-up, a new concern or follow-up as your doctor advises — with hormone tests and swabs at the same centre.',
      de: 'Frauengesundheit braucht Zeit, Vertrauen und Diskretion. Kommen Sie zur regelmäßigen Kontrolle, mit einem neuen Anliegen oder zur Verlaufskontrolle nach Empfehlung Ihres Arztes — Hormonuntersuchungen und Abstriche erfolgen im selben Zentrum.',
    },
    items: {
      sq: [
        'Kontroll gjinekologjik i rregullt',
        'Konsultë për çrregullime të ciklit menstrual',
        'Këshillim për planifikim familjar',
        'Analiza hormonale: FSH, LH, estradiol, progesteron, prolaktinë, beta-hCG',
        'Bris vaginal dhe cervikal në laboratorin mikrobiologjik',
      ],
      en: [
        'Regular gynaecological check-up',
        'Consultation for menstrual cycle problems',
        'Family-planning advice',
        'Hormone tests: FSH, LH, oestradiol, progesterone, prolactin, beta-hCG',
        'Vaginal and cervical swabs in our microbiology laboratory',
      ],
      de: [
        'Regelmäßige gynäkologische Untersuchung',
        'Beratung bei Zyklusstörungen',
        'Beratung zur Familienplanung',
        'Hormonuntersuchungen: FSH, LH, Östradiol, Progesteron, Prolaktin, Beta-hCG',
        'Vaginal- und Zervixabstriche in unserem mikrobiologischen Labor',
      ],
    },
    note: {
      sq: 'Për një shërbim të caktuar (p.sh. ekografi) na telefononi për ta konfirmuar para vizitës.',
      en: 'For a specific service (e.g. an ultrasound scan) please call to confirm before your visit.',
      de: 'Für eine bestimmte Leistung (z. B. eine Ultraschalluntersuchung) rufen Sie bitte vor Ihrem Besuch an, um sich die Verfügbarkeit bestätigen zu lassen.',
    },
    tests: ['beta-hcg', 'fsh', 'lh', 'estradiol', 'progesterone', 'prolactin', 'tsh', 'ferritin', 'vaginal-swab', 'urine-culture'],
  },
  {
    slug: 'laboratori-biokimik-dhe-hematologjik',
    icon: 'test-tubes',
    tone: 'brand',
    name: { sq: 'Laboratori biokimik dhe hematologjik', en: 'Biochemistry & Haematology Laboratory', de: 'Biochemisches und hämatologisches Labor' },
    nameShort: { sq: 'Laboratori biokimik', en: 'Biochemistry lab', de: 'Biochemisches Labor' },
    short: {
      sq: 'Analiza të gjakut dhe urinës: hemogram, glukozë, yndyrna, funksion i veshkave dhe i mëlçisë, hormone, vitamina.',
      en: 'Blood and urine tests: blood count, glucose, lipids, kidneys and liver, hormones, vitamins.',
      de: 'Blut- und Urinuntersuchungen: Blutbild, Blutzucker, Blutfette, Nieren und Leber, Hormone, Vitamine.',
    },
    intro: {
      sq: 'Laboratori ynë është vazhdimësi e punës së Laboratorit BAKTOLAB. Kryejmë analiza biokimike dhe hematologjike për pacientë të të gjitha moshave — mostrat merren këtu në qendër dhe rezultatet i shqyrton mjeku juaj.',
      en: 'Our laboratory continues the work of the BAKTOLAB laboratory. We run biochemistry and haematology tests for patients of every age — samples are taken here at the centre and your doctor reviews the results.',
      de: 'Unser Labor setzt die Arbeit des Labors BAKTOLAB fort. Wir führen biochemische und hämatologische Analysen für Patienten jeden Alters durch — die Proben werden hier im Zentrum entnommen, und Ihr Arzt beurteilt die Ergebnisse.',
    },
    items: {
      sq: [
        'Hematologji: gjaku komplet (hemogrami), sedimentimi, koagulimi, grupi i gjakut',
        'Biokimi: glukoza, HbA1c, profili lipidik, veshkat, mëlçia, elektrolitët',
        'Hormone: tiroidja, hormonet riprodhuese, kortizoli, PSA',
        'Vitamina dhe minerale: D, B12, acidi folik, hekuri, feritina, magnezi',
        'Inflamacion: CRP, ASO, faktori reumatoid',
        'Alergji: IgE totale, panel alergjish, intolerancë ushqimore',
      ],
      en: [
        'Haematology: complete blood count, ESR, coagulation, blood group',
        'Biochemistry: glucose, HbA1c, lipid profile, kidneys, liver, electrolytes',
        'Hormones: thyroid, reproductive hormones, cortisol, PSA',
        'Vitamins and minerals: D, B12, folic acid, iron, ferritin, magnesium',
        'Inflammation: CRP, ASO, rheumatoid factor',
        'Allergy: total IgE, allergy panel, food intolerance',
      ],
      de: [
        'Hämatologie: vollständiges Blutbild, Blutsenkung, Gerinnung, Blutgruppe',
        'Biochemie: Glukose, HbA1c, Lipidprofil, Nieren, Leber, Elektrolyte',
        'Hormone: Schilddrüse, Sexualhormone, Cortisol, PSA',
        'Vitamine und Mineralstoffe: D, B12, Folsäure, Eisen, Ferritin, Magnesium',
        'Entzündungswerte: CRP, ASO, Rheumafaktor',
        'Allergie: Gesamt-IgE, Allergiepanel, Nahrungsmittelunverträglichkeit',
      ],
    },
    tests: ['cbc', 'esr', 'glucose', 'hba1c', 'cholesterol', 'triglycerides', 'creatinine', 'alt', 'tsh', 'vitd', 'b12', 'crp'],
  },
  {
    slug: 'laboratori-mikrobiologjik',
    icon: 'microscope',
    tone: 'brand',
    name: { sq: 'Laboratori mikrobiologjik', en: 'Microbiology Laboratory', de: 'Mikrobiologisches Labor' },
    nameShort: { sq: 'Laboratori mikrobiologjik', en: 'Microbiology lab', de: 'Mikrobiologisches Labor' },
    short: {
      sq: 'Urinokulturë, koprokulturë, brise dhe antibiogram — për të gjetur shkaktarin e infeksionit.',
      en: 'Urine and stool cultures, swabs and antibiotic sensitivity tests — to find what causes an infection.',
      de: 'Urin- und Stuhlkulturen, Abstriche und Antibiogramm — um den Erreger einer Infektion zu finden.',
    },
    intro: {
      sq: 'Kur ka dyshim për infeksion, kultura tregon cili mikrob e shkakton dhe antibiogrami se cili antibiotik vepron. Kështu mjeku zgjedh trajtimin e duhur — pa provuar kuturu.',
      en: 'When an infection is suspected, a culture shows which microbe causes it and the sensitivity test which antibiotic works. Your doctor can then choose the right treatment instead of guessing.',
      de: 'Besteht der Verdacht auf eine Infektion, zeigt eine Kultur, welcher Keim sie verursacht, und das Antibiogramm, welches Antibiotikum wirkt. So kann Ihr Arzt die richtige Behandlung wählen, statt zu raten.',
    },
    items: {
      sq: [
        'Urinokulturë me antibiogram',
        'Koprokulturë dhe analizë e feçes për parazitë',
        'Bris i fytit dhe i hundës',
        'Bris vaginal dhe cervikal',
        'Helicobacter pylori',
      ],
      en: [
        'Urine culture with antibiotic sensitivity',
        'Stool culture and stool test for parasites',
        'Throat and nasal swab',
        'Vaginal and cervical swab',
        'Helicobacter pylori',
      ],
      de: [
        'Urinkultur mit Antibiogramm',
        'Stuhlkultur und Stuhluntersuchung auf Parasiten',
        'Rachen- und Nasenabstrich',
        'Vaginal- und Zervixabstrich',
        'Helicobacter pylori',
      ],
    },
    tests: ['urine-culture', 'stool-culture', 'throat-swab', 'nasal-swab', 'vaginal-swab', 'h-pylori', 'stool-parasites'],
  },
  {
    slug: 'mjekesi-familjare',
    icon: 'stethoscope',
    tone: 'mint',
    name: { sq: 'Mjekësi familjare', en: 'Family Medicine', de: 'Allgemeinmedizin' },
    short: {
      sq: 'Vizita e parë për të rriturit: kontroll i përgjithshëm, ndjekje e sëmundjeve kronike dhe drejtim te specialisti.',
      en: 'The first port of call for adults: general check-up, follow-up of long-term conditions and referral to a specialist.',
      de: 'Erste Anlaufstelle für Erwachsene: allgemeine Untersuchung, Verlaufskontrolle chronischer Erkrankungen und Überweisung zum Facharzt.',
    },
    intro: {
      sq: 'Mjeku i familjes ju njeh në tërësi: shikon simptomat, analizat dhe historinë tuaj, dhe ju tregon hapin e radhës — trajtim, analiza të tjera apo një specialist brenda qendrës.',
      en: 'A family doctor looks at the whole picture: your symptoms, test results and history, and tells you the next step — treatment, further tests or a specialist within the centre.',
      de: 'Der Hausarzt betrachtet das Gesamtbild — Ihre Beschwerden, Laborergebnisse und Vorgeschichte — und nennt Ihnen den nächsten Schritt: Behandlung, weitere Untersuchungen oder einen Facharzt innerhalb des Zentrums.',
    },
    items: {
      sq: [
        'Kontroll i përgjithshëm shëndetësor',
        'Matje e tensionit dhe ndjekje e tensionit të lartë dhe diabetit',
        'Shpjegim i analizave laboratorike',
        'Drejtim te specialisti i duhur brenda qendrës',
      ],
      en: [
        'General health check-up',
        'Blood-pressure checks and follow-up of high blood pressure and diabetes',
        'Explanation of your lab results',
        'Referral to the right specialist within the centre',
      ],
      de: [
        'Allgemeine Gesundheitsuntersuchung',
        'Blutdruckmessung und Verlaufskontrolle bei Bluthochdruck und Diabetes',
        'Erklärung Ihrer Laborergebnisse',
        'Überweisung an den passenden Facharzt innerhalb des Zentrums',
      ],
    },
    tests: ['cbc', 'glucose', 'hba1c', 'cholesterol', 'creatinine', 'tsh', 'urinalysis'],
  },
  {
    slug: 'endokrinologji',
    icon: 'activity',
    tone: 'violet',
    name: { sq: 'Endokrinologji', en: 'Endocrinology', de: 'Endokrinologie' },
    short: {
      sq: 'Tiroidja, diabeti dhe hormonet — diagnozë dhe ndjekje me analiza laboratorike në vend.',
      en: 'Thyroid, diabetes and hormones — diagnosis and follow-up with lab tests on site.',
      de: 'Schilddrüse, Diabetes und Hormone — Diagnose und Verlaufskontrolle mit Laboranalysen vor Ort.',
    },
    intro: {
      sq: 'Hormonet ndikojnë në energjinë, peshën, gjumin dhe humorin. Endokrinologu i lexon analizat së bashku me simptomat dhe ndërton një plan ndjekjeje që e kuptoni.',
      en: 'Hormones affect energy, weight, sleep and mood. The endocrinologist reads your tests together with your symptoms and builds a follow-up plan you understand.',
      de: 'Hormone beeinflussen Energie, Gewicht, Schlaf und Stimmung. Der Endokrinologe beurteilt Ihre Laborwerte im Zusammenhang mit Ihren Beschwerden und erstellt einen Plan für die Verlaufskontrolle, den Sie nachvollziehen können.',
    },
    items: {
      sq: [
        'Sëmundjet e tiroides — hipotiroidizëm dhe hipertiroidizëm',
        'Diabeti dhe prediabeti',
        'Çrregullime hormonale',
        'Pesha dhe metabolizmi',
        'Ndjekje me TSH, FT4, HbA1c dhe analiza të tjera',
      ],
      en: [
        'Thyroid disease — hypothyroidism and hyperthyroidism',
        'Diabetes and prediabetes',
        'Hormonal disorders',
        'Weight and metabolism',
        'Follow-up with TSH, FT4, HbA1c and other tests',
      ],
      de: [
        'Schilddrüsenerkrankungen — Unterfunktion (Hypothyreose) und Überfunktion (Hyperthyreose)',
        'Diabetes und Prädiabetes',
        'Hormonstörungen',
        'Gewicht und Stoffwechsel',
        'Verlaufskontrolle mit TSH, FT4, HbA1c und weiteren Werten',
      ],
    },
    tests: ['tsh', 'ft4', 'ft3', 'anti-tpo', 'glucose', 'hba1c', 'insulin', 'cortisol'],
  },
  {
    slug: 'suplemente-dhe-nutricion',
    icon: 'leaf',
    tone: 'sun',
    name: { sq: 'Suplemente dhe nutricion', en: 'Supplements & Nutrition', de: 'Nahrungsergänzung und Ernährung' },
    short: {
      sq: 'Këshillim për ushqyerjen dhe suplementet ushqimore — bazuar në analizat tuaja.',
      en: 'Advice on nutrition and food supplements — based on your test results.',
      de: 'Beratung zu Ernährung und Nahrungsergänzung — auf Grundlage Ihrer Laborergebnisse.',
    },
    intro: {
      sq: 'Suplementi i duhur fillon nga analiza e duhur. Shikojmë së bashku vlerat tuaja dhe ju këshillojmë për ushqyerjen dhe suplementet ushqimore që kanë kuptim për ju.',
      en: 'The right supplement starts with the right test. We look at your values together and advise you on nutrition and the food supplements that make sense for you.',
      de: 'Die richtige Nahrungsergänzung beginnt mit der richtigen Analyse. Wir sehen uns Ihre Werte gemeinsam an und beraten Sie zur Ernährung und zu den Nahrungsergänzungsmitteln, die für Sie sinnvoll sind.',
    },
    items: {
      sq: [
        'Këshillim për ushqyerjen e fëmijëve dhe të rriturve',
        'Suplemente ushqimore sipas nevojës dhe analizave',
        'Vitamina D, B12, hekuri dhe magnezi — kur duhen, sipas rekomandimit të mjekut',
      ],
      en: [
        'Nutrition advice for children and adults',
        'Food supplements based on need and test results',
        'Vitamin D, B12, iron and magnesium — when they are needed, as your doctor recommends',
      ],
      de: [
        'Ernährungsberatung für Kinder und Erwachsene',
        'Nahrungsergänzungsmittel nach Bedarf und Laborergebnissen',
        'Vitamin D, B12, Eisen und Magnesium — wenn sie nötig sind, nach Empfehlung Ihres Arztes',
      ],
    },
    tests: ['vitd', 'b12', 'folate', 'iron', 'ferritin', 'magnesium'],
  },
];
