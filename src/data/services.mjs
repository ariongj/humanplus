// Departments ("Shërbimet"). The slugs keep the previous site's address pattern (/sherbim/pediatri/,
// /en/sherbim/pediatri/), so old links and search results keep working.
// Pediatrics text follows the previous site; the other descriptions describe each specialty's usual scope and
// stay deliberately general — confirm the details with the clinic (README → What is placeholder).

export const SERVICES = [
  {
    slug: 'pediatri',
    icon: 'baby',
    tone: 'sun',
    name: { sq: 'Pediatri', en: 'Paediatrics' },
    short: {
      sq: 'Kontrolla rutinë, ndjekje e rritjes dhe zhvillimit, diagnostikim dhe trajtim i sëmundjeve te fëmijët.',
      en: 'Routine check-ups, growth and development monitoring, diagnosis and treatment of illness in children.',
    },
    intro: {
      sq: 'Që nga viti 2011 kemi qenë pranë mijëra prindërve dhe fëmijëve. Shëndeti i fëmijës suaj është prioriteti ynë — nga kontrollet e para të foshnjës deri te vizitat në moshën shkollore.',
      en: 'Since 2011 we have looked after thousands of parents and children. Your child’s health is our priority — from a baby’s first check-ups to visits at school age.',
    },
    items: {
      sq: [
        'Kontrolla rutinë dhe ndjekje e rritjes — pesha, gjatësia, zhvillimi motorik dhe kognitiv',
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
        'Tests for children: blood work, allergies, food intolerance, vitamin D and B12',
      ],
    },
    tests: ['cbc', 'crp', 'ferritin', 'vitd', 'b12', 'ige', 'allergy-panel', 'food-intolerance', 'urinalysis', 'stool-parasites'],
  },
  {
    slug: 'gjinekologji',
    icon: 'venus',
    tone: 'rose',
    name: { sq: 'Gjinekologji', en: 'Gynaecology' },
    short: {
      sq: 'Kontrolla gjinekologjike, këshillim dhe analiza për shëndetin e gruas në çdo moshë.',
      en: 'Gynaecological check-ups, advice and tests for women’s health at every age.',
    },
    intro: {
      sq: 'Shëndeti i gruas kërkon kohë, besim dhe diskrecion. Ju presim për kontrolla të rregullta, për një shqetësim të ri ose për ndjekje sipas udhëzimit të mjekut — me analizat hormonale dhe brisët në të njëjtën qendër.',
      en: 'Women’s health needs time, trust and discretion. Come for a regular check-up, a new concern or follow-up as your doctor advises — with hormone tests and swabs in the same centre.',
    },
    items: {
      sq: [
        'Kontroll gjinekologjik i rregullt',
        'Konsultë për çrregullime të ciklit menstrual',
        'Këshillim për planifikim familjar',
        'Analiza hormonale: FSH, LH, estradiol, progesteron, prolaktinë, beta-hCG',
        'Brisi vaginal dhe cervikal në laboratorin mikrobiologjik',
      ],
      en: [
        'Regular gynaecological check-up',
        'Consultation for menstrual cycle problems',
        'Family-planning advice',
        'Hormone tests: FSH, LH, oestradiol, progesterone, prolactin, beta-hCG',
        'Vaginal and cervical swabs in our microbiology laboratory',
      ],
    },
    note: {
      sq: 'Për një shërbim të caktuar (p.sh. ekografi) na telefononi për ta konfirmuar para vizitës.',
      en: 'For a specific service (e.g. an ultrasound scan) please call to confirm before your visit.',
    },
    tests: ['beta-hcg', 'fsh', 'lh', 'estradiol', 'progesterone', 'prolactin', 'tsh', 'ferritin', 'vaginal-swab', 'urine-culture'],
  },
  {
    slug: 'laboratori-biokimik-dhe-hematologjik',
    icon: 'test-tubes',
    tone: 'brand',
    name: { sq: 'Laboratori Biokimik dhe Hematologjik', en: 'Biochemistry & Haematology Laboratory' },
    nameShort: { sq: 'Laboratori biokimik', en: 'Biochemistry lab' },
    short: {
      sq: 'Analiza të gjakut dhe urinës: hemogram, glukozë, yndyrna, veshkat dhe mëlçia, hormone, vitamina.',
      en: 'Blood and urine tests: blood count, glucose, lipids, kidneys and liver, hormones, vitamins.',
    },
    intro: {
      sq: 'Laboratori ynë është vazhdimësi e punës së Laboratorit BAKTOLAB. Kryejmë analiza biokimike dhe hematologjike për pacientë të të gjitha moshave — mostrat merren këtu në qendër dhe rezultatet i shqyrton mjeku juaj.',
      en: 'Our laboratory continues the work of the BAKTOLAB laboratory. We run biochemistry and haematology tests for patients of every age — samples are taken here at the centre and your doctor reviews the results.',
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
    },
    tests: ['cbc', 'esr', 'glucose', 'hba1c', 'cholesterol', 'triglycerides', 'creatinine', 'alt', 'tsh', 'vitd', 'b12', 'crp'],
  },
  {
    slug: 'laboratori-mikrobiologjik',
    icon: 'microscope',
    tone: 'brand',
    name: { sq: 'Laboratori Mikrobiologjik', en: 'Microbiology Laboratory' },
    nameShort: { sq: 'Laboratori mikrobiologjik', en: 'Microbiology lab' },
    short: {
      sq: 'Urinokulturë, koprokulturë, brise dhe antibiogram — për të gjetur shkaktarin e infeksionit.',
      en: 'Urine and stool cultures, swabs and antibiotic sensitivity — to find what causes an infection.',
    },
    intro: {
      sq: 'Kur ka dyshim për infeksion, kultura tregon cili mikrob e shkakton dhe antibiogrami se cili antibiotik vepron. Kështu mjeku zgjedh trajtimin e duhur — pa provuar në verbëri.',
      en: 'When an infection is suspected, a culture shows which microbe causes it and the sensitivity test which antibiotic works. Your doctor can then choose the right treatment instead of guessing.',
    },
    items: {
      sq: [
        'Urinokulturë me antibiogram',
        'Koprokulturë dhe analizë e feçes për parazitë',
        'Brisi i fytit dhe i hundës',
        'Brisi vaginal dhe cervikal',
        'Helicobacter pylori',
      ],
      en: [
        'Urine culture with antibiotic sensitivity',
        'Stool culture and stool test for parasites',
        'Throat and nasal swab',
        'Vaginal and cervical swab',
        'Helicobacter pylori',
      ],
    },
    tests: ['urine-culture', 'stool-culture', 'throat-swab', 'nasal-swab', 'vaginal-swab', 'h-pylori', 'stool-parasites'],
  },
  {
    slug: 'mjekesi-familjare',
    icon: 'stethoscope',
    tone: 'mint',
    name: { sq: 'Mjekësi Familjare', en: 'Family Medicine' },
    short: {
      sq: 'Vizita e parë për të rriturit: kontroll i përgjithshëm, ndjekje e sëmundjeve kronike dhe drejtim te specialisti.',
      en: 'The first visit for adults: general check-up, follow-up of long-term conditions and referral to a specialist.',
    },
    intro: {
      sq: 'Mjeku i familjes ju njeh në tërësi: shikon simptomat, analizat dhe historinë tuaj, dhe ju tregon hapin e radhës — trajtim, analiza të tjera apo një specialist brenda qendrës.',
      en: 'A family doctor looks at the whole picture: your symptoms, test results and history, and tells you the next step — treatment, further tests or a specialist within the centre.',
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
    },
    tests: ['cbc', 'glucose', 'hba1c', 'cholesterol', 'creatinine', 'tsh', 'urinalysis'],
  },
  {
    slug: 'urologji',
    icon: 'droplets',
    tone: 'sky',
    name: { sq: 'Urologji', en: 'Urology' },
    short: {
      sq: 'Konsultë për veshkat, fshikëzën dhe prostatën — me analiza të urinës dhe PSA në të njëjtën qendër.',
      en: 'Consultations for the kidneys, bladder and prostate — with urine tests and PSA in the same centre.',
    },
    intro: {
      sq: 'Shqetësimet urinare janë të zakonshme dhe shpesh trajtohen lehtë kur zbulohen herët. Urologu ju dëgjon, ju ekzaminon dhe, kur duhet, kërkon analizat përkatëse këtu në laborator.',
      en: 'Urinary problems are common and often easy to treat when found early. The urologist listens, examines you and, where needed, orders the right tests here in our laboratory.',
    },
    items: {
      sq: [
        'Konsultë urologjike',
        'Probleme me urinimin dhe infeksione urinare',
        'Kontroll i prostatës dhe PSA',
        'Shqetësime të veshkave dhe të fshikëzës',
      ],
      en: [
        'Urology consultation',
        'Urination problems and urinary tract infections',
        'Prostate check and PSA',
        'Kidney and bladder concerns',
      ],
    },
    tests: ['psa-total', 'psa-free', 'urinalysis', 'urine-culture', 'creatinine', 'urea'],
  },
  {
    slug: 'endokrinologji',
    icon: 'activity',
    tone: 'violet',
    name: { sq: 'Endokrinologji', en: 'Endocrinology' },
    short: {
      sq: 'Tiroidja, diabeti dhe hormonet — diagnozë dhe ndjekje me analiza laboratorike në vend.',
      en: 'Thyroid, diabetes and hormones — diagnosis and follow-up with lab tests on site.',
    },
    intro: {
      sq: 'Hormonet ndikojnë në energjinë, peshën, gjumin dhe humorin. Endokrinologu i lexon analizat së bashku me simptomat dhe ndërton një plan ndjekjeje që e kuptoni.',
      en: 'Hormones affect energy, weight, sleep and mood. The endocrinologist reads your tests together with your symptoms and builds a follow-up plan you understand.',
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
    },
    tests: ['tsh', 'ft4', 'ft3', 'anti-tpo', 'glucose', 'hba1c', 'insulin', 'cortisol'],
  },
  {
    slug: 'gastroenterologji',
    icon: 'apple',
    tone: 'mint',
    name: { sq: 'Gastroenterologji', en: 'Gastroenterology' },
    short: {
      sq: 'Stomaku, zorrët dhe mëlçia: konsultë për dhimbje barku, refluks, Helicobacter pylori dhe tretjen.',
      en: 'Stomach, bowel and liver: consultations for abdominal pain, reflux, Helicobacter pylori and digestion.',
    },
    intro: {
      sq: 'Dhimbja e barkut, fryrja apo refluksi nuk duhet të bëhen pjesë e përditshmërisë. Gastroenterologu e kërkon shkakun me ju — shpesh duke filluar nga analiza të thjeshta të gjakut dhe të feçes.',
      en: 'Abdominal pain, bloating or reflux should not become part of everyday life. The gastroenterologist looks for the cause with you — often starting with simple blood and stool tests.',
    },
    items: {
      sq: [
        'Dhimbje barku, fryrje dhe probleme të tretjes',
        'Refluksi dhe gastriti',
        'Helicobacter pylori',
        'Funksioni i mëlçisë — AST, ALT, GGT',
        'Intoleranca ushqimore',
      ],
      en: [
        'Abdominal pain, bloating and digestive problems',
        'Reflux and gastritis',
        'Helicobacter pylori',
        'Liver function — AST, ALT, GGT',
        'Food intolerance',
      ],
    },
    tests: ['h-pylori', 'ast', 'alt', 'ggt', 'bilirubin', 'amylase', 'occult-blood', 'food-intolerance'],
  },
  {
    slug: 'dermatologji',
    icon: 'scan-face',
    tone: 'rose',
    name: { sq: 'Dermatologji', en: 'Dermatology' },
    short: {
      sq: 'Lëkura, flokët dhe thonjtë: konsultë për akne, ekzemë, alergji të lëkurës dhe nishane.',
      en: 'Skin, hair and nails: consultations for acne, eczema, skin allergies and moles.',
    },
    intro: {
      sq: 'Lëkura shpesh tregon atë që ndodh brenda trupit. Dermatologu ju ndihmon me trajtim dhe, kur duhet, me analiza — për shembull hekurin, vitaminën D ose tiroiden te rënia e flokëve.',
      en: 'The skin often shows what happens inside the body. The dermatologist helps with treatment and, where needed, with tests — for example iron, vitamin D or thyroid for hair loss.',
    },
    items: {
      sq: [
        'Akne',
        'Ekzema dhe dermatiti',
        'Alergji të lëkurës dhe urtikaria',
        'Kontroll i nishaneve',
        'Rënia e flokëve dhe problemet e thonjve',
      ],
      en: [
        'Acne',
        'Eczema and dermatitis',
        'Skin allergies and hives',
        'Mole check',
        'Hair loss and nail problems',
      ],
    },
    tests: ['ferritin', 'vitd', 'tsh', 'ige', 'allergy-panel'],
  },
  {
    slug: 'suplemente-dhe-nutricion',
    icon: 'leaf',
    tone: 'sun',
    name: { sq: 'Suplemente dhe Nutricion', en: 'Supplements & Nutrition' },
    short: {
      sq: 'Këshillim për ushqyerjen dhe suplementet ushqimore — bazuar në analizat tuaja.',
      en: 'Advice on nutrition and food supplements — based on your test results.',
    },
    intro: {
      sq: 'Suplementi i duhur fillon nga analiza e duhur. Shikojmë së bashku vlerat tuaja dhe ju këshillojmë për ushqyerjen dhe suplementet ushqimore që kanë kuptim për ju.',
      en: 'The right supplement starts with the right test. We look at your values together and advise you on nutrition and the food supplements that make sense for you.',
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
    },
    tests: ['vitd', 'b12', 'folate', 'iron', 'ferritin', 'magnesium'],
  },
];
