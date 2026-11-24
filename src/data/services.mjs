// The centre's services, as the clinic lists them: the laboratory with its five modules, then the specialist
// services. Each has a page at /sherbim/<slug>/ (and /en/, /de/). `group`: 'lab' (a laboratory module) or 'spec'
// (a specialist service); `cat`: the catalogue category its "see them in the catalogue" link opens.
// Pediatrics text follows the previous site; the other descriptions describe each field's usual scope and stay
// deliberately general — confirm the details with the clinic (README → What is placeholder).

// Former addresses (/sherbim/<slug>/ in every language) and where they now lead: a redirect page, and a 301 in
// .htaccess on the production server — see scripts/build.mjs. Paths are site paths; "#id" opens a section.
export const RETIRED_SERVICES = {
  urologji: 'sherbimet',
  gastroenterologji: 'sherbimet',
  dermatologji: 'sherbimet',
  'mjekesi-familjare': 'sherbimet',
  'suplemente-dhe-nutricion': 'sherbimet',
  'laboratori-biokimik-dhe-hematologjik': 'sherbimet#laboratori',
  'laboratori-mikrobiologjik': 'sherbim/mikrobiologji',
};

export const SERVICES = [
  {
    slug: 'hematologji',
    group: 'lab',
    cat: 'hematologji',
    icon: 'droplet',
    tone: 'rose',
    name: { sq: 'Hematologji', en: 'Haematology', de: 'Hämatologie' },
    short: {
      sq: 'Gjaku dhe koagulimi: hemogrami i plotë, sedimentimi, koagulimi dhe grupi i gjakut.',
      en: 'Blood and clotting: complete blood count, ESR, coagulation and blood group.',
      de: 'Blut und Gerinnung: großes Blutbild, Blutsenkung, Gerinnung und Blutgruppe.',
    },
    intro: {
      sq: 'Hemogrami është shpesh analiza e parë që kërkon mjeku: tregon qelizat e kuqe dhe të bardha, hemoglobinën dhe trombocitet. Këtu bëhen edhe analizat e koagulimit dhe grupi i gjakut — mostra merret në qendër dhe rezultatin e shqyrton mjeku juaj.',
      en: 'The blood count is often the first test a doctor asks for: it shows red and white cells, haemoglobin and platelets. Coagulation tests and blood grouping are done here too — the sample is taken at the centre and your doctor reviews the result.',
      de: 'Das Blutbild ist oft die erste Analyse, die Ihr Arzt anordnet: Es zeigt rote und weiße Blutkörperchen, Hämoglobin und Blutplättchen. Auch Gerinnungswerte und die Blutgruppe werden hier bestimmt — die Probe wird im Zentrum entnommen, und Ihr Arzt beurteilt das Ergebnis.',
    },
    items: {
      sq: [
        'Hemogrami i plotë — qelizat e kuqe dhe të bardha, hemoglobina, trombocitet',
        'Sedimentimi (SE)',
        'Koagulimi: koha e protrombinës (PT/INR), aPTT, fibrinogjeni',
        'Grupi i gjakut dhe faktori Rh',
        'Retikulocitet',
      ],
      en: [
        'Complete blood count — red and white cells, haemoglobin, platelets',
        'Erythrocyte sedimentation rate (ESR)',
        'Coagulation: prothrombin time (PT/INR), aPTT, fibrinogen',
        'Blood group and Rh factor',
        'Reticulocytes',
      ],
      de: [
        'Großes Blutbild — rote und weiße Blutkörperchen, Hämoglobin, Blutplättchen',
        'Blutsenkungsgeschwindigkeit (BSG)',
        'Gerinnung: Prothrombinzeit (PT/INR), aPTT, Fibrinogen',
        'Blutgruppe und Rhesusfaktor',
        'Retikulozyten',
      ],
    },
    tests: ['cbc', 'esr', 'pt-inr', 'aptt', 'fibrinogen', 'blood-group', 'reticulocytes', 'ferritin'],
  },
  {
    slug: 'biokimi',
    group: 'lab',
    cat: 'biokimi',
    icon: 'flask-conical',
    tone: 'brand',
    name: { sq: 'Biokimi', en: 'Biochemistry', de: 'Biochemie' },
    short: {
      sq: 'Glukoza, yndyrnat, funksioni i veshkave dhe i mëlçisë, elektrolitët, vitaminat dhe mineralet.',
      en: 'Glucose, lipids, kidney and liver function, electrolytes, vitamins and minerals.',
      de: 'Blutzucker, Blutfette, Nieren- und Leberwerte, Elektrolyte, Vitamine und Mineralstoffe.',
    },
    intro: {
      sq: 'Analizat biokimike tregojnë si punojnë organet dhe metabolizmi: sheqeri, yndyrnat, veshkat dhe mëlçia. Shumica bëhen nga e njëjta mostër gjaku, shpesh esëll në mëngjes — shikoni përgatitjen para se të vini.',
      en: 'Biochemistry tests show how your organs and metabolism are working: sugar, fats, kidneys and liver. Most are done from the same blood sample, often taken in the morning on an empty stomach — check how to prepare before you come.',
      de: 'Biochemische Analysen zeigen, wie Organe und Stoffwechsel arbeiten: Zucker, Fette, Nieren und Leber. Die meisten Werte werden aus derselben Blutprobe bestimmt, oft nüchtern am Morgen — sehen Sie sich vor Ihrem Besuch die Vorbereitung an.',
    },
    items: {
      sq: [
        'Glukoza, HbA1c, insulina dhe testi i tolerancës ndaj glukozës',
        'Profili lipidik: kolesteroli, HDL, LDL, trigliceridet',
        'Veshkat: urea, kreatinina, acidi urik, mikroalbuminuria',
        'Mëlçia: AST, ALT, GGT, fosfataza alkaline, bilirubina',
        'Elektrolitët, kalciumi, fosfati dhe proteinat',
        'Vitamina dhe minerale: D, B12, acidi folik, hekuri, feritina, magnezi',
      ],
      en: [
        'Glucose, HbA1c, insulin and the glucose tolerance test',
        'Lipid profile: cholesterol, HDL, LDL, triglycerides',
        'Kidneys: urea, creatinine, uric acid, microalbumin',
        'Liver: AST, ALT, GGT, alkaline phosphatase, bilirubin',
        'Electrolytes, calcium, phosphate and proteins',
        'Vitamins and minerals: D, B12, folic acid, iron, ferritin, magnesium',
      ],
      de: [
        'Glukose, HbA1c, Insulin und oraler Glukosetoleranztest',
        'Lipidprofil: Cholesterin, HDL, LDL, Triglyceride',
        'Nieren: Harnstoff, Kreatinin, Harnsäure, Mikroalbumin',
        'Leber: AST, ALT, GGT, alkalische Phosphatase, Bilirubin',
        'Elektrolyte, Calcium, Phosphat und Eiweiß',
        'Vitamine und Mineralstoffe: D, B12, Folsäure, Eisen, Ferritin, Magnesium',
      ],
    },
    tests: ['glucose', 'hba1c', 'cholesterol', 'triglycerides', 'creatinine', 'uric-acid', 'alt', 'ggt', 'electrolytes', 'vitd', 'b12', 'iron'],
  },
  {
    slug: 'hormone',
    group: 'lab',
    icon: 'flask-round',
    tone: 'sun',
    name: { sq: 'Hormone', en: 'Hormones', de: 'Hormone' },
    short: {
      sq: 'Tiroidja, hormonet riprodhuese, kortizoli dhe testi i shtatzënisë nga gjaku.',
      en: 'Thyroid, reproductive hormones, cortisol and the blood pregnancy test.',
      de: 'Schilddrüse, Sexualhormone, Cortisol und der Schwangerschaftstest aus dem Blut.',
    },
    intro: {
      sq: 'Shumë hormone ndryshojnë gjatë ditës ose gjatë ciklit, prandaj ora e marrjes së mostrës ka rëndësi. Ju tregojmë kur të vini — dhe endokrinologu ose gjinekologu i lexon rezultatet bashkë me simptomat tuaja.',
      en: 'Many hormones change over the day or across the cycle, so the time the sample is taken matters. We tell you when to come — and the endocrinologist or gynaecologist reads the results together with your symptoms.',
      de: 'Viele Hormone schwanken im Tagesverlauf oder während des Zyklus, deshalb kommt es auf den Zeitpunkt der Probenentnahme an. Wir sagen Ihnen, wann Sie kommen sollten — und der Endokrinologe oder Gynäkologe beurteilt die Ergebnisse zusammen mit Ihren Beschwerden.',
    },
    items: {
      sq: [
        'Tiroidja: TSH, FT4, FT3, anti-TPO, anti-TG',
        'Hormonet riprodhuese: FSH, LH, estradioli, progesteroni, prolaktina, testosteroni, AMH',
        'Beta-hCG — testi i shtatzënisë nga gjaku',
        'Kortizoli, DHEA-S dhe parathormoni (PTH)',
        'Insulina dhe indeksi HOMA',
      ],
      en: [
        'Thyroid: TSH, FT4, FT3, anti-TPO, anti-TG',
        'Reproductive hormones: FSH, LH, oestradiol, progesterone, prolactin, testosterone, AMH',
        'Beta-hCG — the blood pregnancy test',
        'Cortisol, DHEA-S and parathyroid hormone (PTH)',
        'Insulin and the HOMA index',
      ],
      de: [
        'Schilddrüse: TSH, FT4, FT3, Anti-TPO, Anti-TG',
        'Sexualhormone: FSH, LH, Östradiol, Progesteron, Prolaktin, Testosteron, AMH',
        'Beta-hCG — der Schwangerschaftstest aus dem Blut',
        'Cortisol, DHEA-S und Parathormon (PTH)',
        'Insulin und HOMA-Index',
      ],
    },
    tests: ['tsh', 'ft4', 'ft3', 'anti-tpo', 'fsh', 'lh', 'estradiol', 'progesterone', 'prolactin', 'testosterone', 'cortisol', 'beta-hcg'],
  },
  {
    slug: 'imunologji',
    group: 'lab',
    cat: 'imunologji',
    icon: 'shield-check',
    tone: 'sky',
    name: { sq: 'Imunologji', en: 'Immunology', de: 'Immunologie' },
    short: {
      sq: 'Inflamacioni, sëmundjet autoimune, alergjitë dhe antitrupat ndaj infeksioneve.',
      en: 'Inflammation, autoimmune disease, allergies and antibodies to infections.',
      de: 'Entzündung, Autoimmunerkrankungen, Allergien und Antikörper gegen Infektionen.',
    },
    intro: {
      sq: 'Analizat imunologjike tregojnë si reagon sistemi mbrojtës i trupit: nëse ka inflamacion dhe nëse trupi prodhon antitrupa kundër vetes, ndaj një alergjeni apo ndaj një infeksioni. Rezultatin jua shpjegon mjeku juaj.',
      en: 'Immunology tests show how the body’s defences are reacting: whether there is inflammation, and whether the body makes antibodies against itself, against an allergen or against an infection. Your doctor explains the result.',
      de: 'Immunologische Analysen zeigen, wie die Abwehr des Körpers reagiert: ob eine Entzündung vorliegt und ob der Körper Antikörper gegen sich selbst, gegen ein Allergen oder gegen eine Infektion bildet. Ihr Arzt erklärt Ihnen das Ergebnis.',
    },
    items: {
      sq: [
        'Inflamacioni: CRP, ASO, faktori reumatoid',
        'Sëmundjet autoimune: ANA, anti-dsDNA, ENA, anti-CCP, komplementi C3 dhe C4',
        'Sëmundja celiake: anti-transglutaminaza IgA dhe IgA totale',
        'Alergjitë: IgE totale, panel alergjish, intoleranca ushqimore',
        'Antitrupat ndaj infeksioneve: hepatiti B dhe C, HIV, toksoplazma, rubeola, CMV',
      ],
      en: [
        'Inflammation: CRP, ASO, rheumatoid factor',
        'Autoimmune disease: ANA, anti-dsDNA, ENA, anti-CCP, complement C3 and C4',
        'Coeliac disease: anti-transglutaminase IgA and total IgA',
        'Allergies: total IgE, allergy panel, food intolerance',
        'Antibodies to infections: hepatitis B and C, HIV, toxoplasma, rubella, CMV',
      ],
      de: [
        'Entzündung: CRP, ASO, Rheumafaktor',
        'Autoimmunerkrankungen: ANA, Anti-dsDNA, ENA, Anti-CCP, Komplement C3 und C4',
        'Zöliakie: Anti-Transglutaminase-IgA und Gesamt-IgA',
        'Allergien: Gesamt-IgE, Allergiepanel, Nahrungsmittelunverträglichkeit',
        'Antikörper gegen Infektionen: Hepatitis B und C, HIV, Toxoplasmose, Röteln, CMV',
      ],
    },
    tests: ['crp', 'aso', 'rf', 'ana', 'anti-ccp', 'ttg-iga', 'ige', 'allergy-panel', 'food-intolerance', 'hbsag', 'anti-hcv', 'toxo-igg'],
  },
  {
    slug: 'mikrobiologji',
    group: 'lab',
    cat: 'mikrobiologji',
    icon: 'microscope',
    tone: 'mint',
    name: { sq: 'Mikrobiologji', en: 'Microbiology', de: 'Mikrobiologie' },
    short: {
      sq: 'Kultura me antibiogram, strisho, parazitologji dhe mikologji — për të gjetur shkaktarin e infeksionit.',
      en: 'Cultures with antibiotic sensitivity, swabs, parasitology and mycology — to find what causes an infection.',
      de: 'Kulturen mit Antibiogramm, Abstriche, Parasitologie und Mykologie — um den Erreger einer Infektion zu finden.',
    },
    intro: {
      sq: 'Kur ka dyshim për infeksion, kultura tregon cili mikrob e shkakton dhe antibiogrami se cili antibiotik vepron. Kështu mjeku zgjedh trajtimin e duhur — pa provuar kuturu. Moduli përfshin edhe parazitologjinë (parazitët në feçe) dhe mikologjinë (kërpudhat, p.sh. Candida).',
      en: 'When an infection is suspected, a culture shows which microbe causes it and the sensitivity test shows which antibiotic works. Your doctor can then choose the right treatment instead of guessing. The module also covers parasitology (parasites in stool) and mycology (fungi such as Candida).',
      de: 'Besteht der Verdacht auf eine Infektion, zeigt eine Kultur, welcher Keim sie verursacht, und das Antibiogramm, welches Antibiotikum wirkt. So kann Ihr Arzt die richtige Behandlung wählen, statt zu raten. Der Bereich umfasst auch die Parasitologie (Parasiten im Stuhl) und die Mykologie (Pilze wie Candida).',
    },
    items: {
      sq: [
        'Urinokulturë me antibiogram',
        'Koprokulturë',
        'Strisho e fytit, e hundës, vaginale dhe cervikale',
        'Helicobacter pylori',
        'Parazitologji: analiza e feçes për parazitë',
        'Mikologji: kultura për kërpudha (p.sh. Candida)',
      ],
      en: [
        'Urine culture with antibiotic sensitivity',
        'Stool culture',
        'Throat, nasal, vaginal and cervical swabs',
        'Helicobacter pylori',
        'Parasitology: stool test for parasites',
        'Mycology: fungal culture (e.g. Candida)',
      ],
      de: [
        'Urinkultur mit Antibiogramm',
        'Stuhlkultur',
        'Rachen-, Nasen-, Vaginal- und Zervixabstrich',
        'Helicobacter pylori',
        'Parasitologie: Stuhluntersuchung auf Parasiten',
        'Mykologie: Pilzkultur (z. B. Candida)',
      ],
    },
    tests: ['urine-culture', 'stool-culture', 'throat-swab', 'nasal-swab', 'vaginal-swab', 'h-pylori', 'stool-parasites'],
  },
  {
    slug: 'pediatri',
    group: 'spec',
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
    group: 'spec',
    icon: 'venus',
    tone: 'rose',
    name: { sq: 'Gjinekologji', en: 'Gynaecology', de: 'Gynäkologie' },
    short: {
      sq: 'Kontrolle gjinekologjike, këshillim dhe analiza për shëndetin e gruas në çdo moshë.',
      en: 'Gynaecological check-ups, advice and tests for women’s health at every age.',
      de: 'Gynäkologische Untersuchungen, Beratung und Laboranalysen für die Gesundheit der Frau in jedem Alter.',
    },
    intro: {
      sq: 'Shëndeti i gruas kërkon kohë, besim dhe diskrecion. Ju presim për kontrolle të rregullta, për një shqetësim të ri ose për ndjekje sipas udhëzimit të mjekut — me analizat hormonale dhe strishot në të njëjtën qendër.',
      en: 'Women’s health needs time, trust and discretion. Come for a regular check-up, a new concern or follow-up as your doctor advises — with hormone tests and swabs at the same centre.',
      de: 'Frauengesundheit braucht Zeit, Vertrauen und Diskretion. Kommen Sie zur regelmäßigen Kontrolle, mit einem neuen Anliegen oder zur Verlaufskontrolle nach Empfehlung Ihres Arztes — Hormonuntersuchungen und Abstriche erfolgen im selben Zentrum.',
    },
    items: {
      sq: [
        'Kontroll gjinekologjik i rregullt',
        'Konsultë për çrregullime të ciklit menstrual',
        'Këshillim për planifikim familjar',
        'Analiza hormonale: FSH, LH, estradiol, progesteron, prolaktinë, beta-hCG',
        'Strisho vaginale dhe cervikale në laboratorin mikrobiologjik',
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
    slug: 'endokrinologji',
    group: 'spec',
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
];

export const LAB = SERVICES.filter((s) => s.group === 'lab');
export const SPECIALISTS = SERVICES.filter((s) => s.group === 'spec');
