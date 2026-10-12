// Laboratory catalogue ("Analizat"). Patients search it, add tests to "Lista ime" and send the list on
// WhatsApp / Viber / e-mail to ask for the price and a time. No prices on the site: the clinic gives them.
// The list covers the clinic's three labs (biochemistry, haematology, microbiology). It is a starting point —
// confirm it with the laboratory and add or remove lines here (README → Editing).

export const CATEGORIES = [
  { id: 'hematologji', icon: 'droplet', name: { sq: 'Hematologji', en: 'Haematology' } },
  { id: 'biokimi', icon: 'flask-conical', name: { sq: 'Biokimi', en: 'Biochemistry' } },
  { id: 'hormone', icon: 'activity', name: { sq: 'Hormone dhe tiroide', en: 'Hormones & thyroid' } },
  { id: 'vitamina', icon: 'sun', name: { sq: 'Vitamina dhe minerale', en: 'Vitamins & minerals' } },
  { id: 'imunologji', icon: 'shield-check', name: { sq: 'Inflamacion dhe imunologji', en: 'Inflammation & immunology' } },
  { id: 'alergji', icon: 'sparkles', name: { sq: 'Alergji dhe intolerancë', en: 'Allergy & intolerance' } },
  { id: 'mikrobiologji', icon: 'microscope', name: { sq: 'Mikrobiologji', en: 'Microbiology' } },
  { id: 'urine-fece', icon: 'test-tubes', name: { sq: 'Urinë dhe feçe', en: 'Urine & stool' } },
];

// Sample types.
export const SAMPLES = {
  blood: { sq: 'Gjak', en: 'Blood' },
  urine: { sq: 'Urinë', en: 'Urine' },
  stool: { sq: 'Feçe', en: 'Stool' },
  swab: { sq: 'Bris', en: 'Swab' },
  varies: { sq: 'Gjak ose feçe', en: 'Blood or stool' },
};

// Preparation tags. `short` is the chip on a test; `text` the explanation (also on /pergatitja/).
export const PREP = {
  none: {
    short: { sq: 'Pa përgatitje', en: 'No preparation' },
    text: { sq: 'Nuk kërkohet përgatitje e veçantë.', en: 'No special preparation is needed.' },
  },
  morning: {
    short: { sq: 'Në mëngjes', en: 'In the morning' },
    text: {
      sq: 'Rekomandohet në mëngjes, mundësisht esëll — rezultatet krahasohen më mirë me ato të mëparshme.',
      en: 'Best in the morning, ideally fasting — results compare better with earlier ones.',
    },
  },
  fasting: {
    short: { sq: 'Esëll 8–12 orë', en: 'Fasting 8–12 h' },
    text: {
      sq: 'Mos hani 8–12 orë para marrjes së gjakut. Uji i thjeshtë lejohet; kafeja, çaji me sheqer dhe çamçakëzi jo.',
      en: 'Do not eat for 8–12 hours before the blood test. Plain water is fine; coffee, sweetened tea and chewing gum are not.',
    },
  },
  ogtt: {
    short: { sq: 'Esëll · rreth 2 orë', en: 'Fasting · about 2 h' },
    text: {
      sq: 'Ejani esëll. Testi zgjat rreth 2 orë: pini tretësirën e glukozës dhe qëndroni në qendër deri në marrjen e fundit të gjakut.',
      en: 'Come fasting. The test takes about 2 hours: you drink the glucose solution and stay at the centre until the last blood sample.',
    },
  },
  rest: {
    short: { sq: 'Mëngjes, i qetë', en: 'Morning, rested' },
    text: {
      sq: 'Në mëngjes (07:30–09:00), pas 15–30 minutash pushim, pa stres dhe pa aktivitet fizik para analizës.',
      en: 'In the morning (07:30–09:00), after 15–30 minutes of rest, without stress or exercise beforehand.',
    },
  },
  cycle: {
    short: { sq: 'Sipas ditës së ciklit', en: 'On a cycle day' },
    text: {
      sq: 'Sipas udhëzimit të mjekut — zakonisht dita 2–5 e ciklit për FSH, LH dhe estradiol, rreth dita 21 për progesteronin.',
      en: 'As your doctor advises — usually day 2–5 of the cycle for FSH, LH and oestradiol, around day 21 for progesterone.',
    },
  },
  psa: {
    short: { sq: '48 orë përgatitje', en: '48 h preparation' },
    text: {
      sq: '48 orë para analizës: pa marrëdhënie seksuale, pa çiklizëm ose ngarkesë të fortë dhe pa kontroll rektal.',
      en: 'For 48 hours before the test: no sexual intercourse, no cycling or hard exercise and no rectal examination.',
    },
  },
  urine: {
    short: { sq: 'Urina e parë e mëngjesit', en: 'First morning urine' },
    text: {
      sq: 'Urina e parë e mëngjesit: lani zonën, hidhni rrjedhën e parë dhe mblidhni rrjedhën e mesme në enë sterile.',
      en: 'First urine of the morning: wash, let the first stream go and collect the midstream in a sterile container.',
    },
  },
  culture: {
    short: { sq: 'Para antibiotikut', en: 'Before antibiotics' },
    text: {
      sq: 'Mostra merret para fillimit të antibiotikut. Nëse tashmë jeni duke marrë antibiotik, pyesni mjekun kur ta jepni.',
      en: 'The sample is taken before starting antibiotics. If you are already taking one, ask your doctor when to give it.',
    },
  },
  stool: {
    short: { sq: 'Mostër e freskët', en: 'Fresh sample' },
    text: {
      sq: 'Sasi sa një arrë, në enë sterile, e sjellë në laborator brenda 2 orësh.',
      en: 'About the size of a walnut, in a sterile container, brought to the lab within 2 hours.',
    },
  },
  swab: {
    short: { sq: 'Para ngrënies', en: 'Before eating' },
    text: {
      sq: 'Në mëngjes, para ngrënies, pirjes dhe larjes së dhëmbëve; para fillimit të antibiotikut.',
      en: 'In the morning, before eating, drinking or brushing your teeth; before starting antibiotics.',
    },
  },
  vaginal: {
    short: { sq: 'Udhëzime për brisin', en: 'Swab instructions' },
    text: {
      sq: 'Jo gjatë menstruacioneve. 24–48 orë para: pa marrëdhënie seksuale, pa preparate vaginale dhe pa larje vaginale.',
      en: 'Not during your period. For 24–48 hours before: no intercourse, no vaginal medicines and no douching.',
    },
  },
};

// id · category · sample · prep · names · aka (extra search words, abbreviations, other spellings).
export const TESTS = [
  // Hematologji
  { id: 'cbc', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Gjaku komplet (hemogrami)', en: 'Complete blood count (CBC)' }, aka: 'hemogram kks gjak komplet leukocite eritrocite trombocite hemoglobina hgb wbc rbc' },
  { id: 'esr', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Sedimentimi (SE)', en: 'Erythrocyte sedimentation rate (ESR)' }, aka: 'se sedimentacioni sedimentimi i eritrociteve' },
  { id: 'pt-inr', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Koha e protrombinës (PT/INR)', en: 'Prothrombin time (PT/INR)' }, aka: 'pt inr koagulimi protrombina' },
  { id: 'aptt', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'aPTT', en: 'aPTT' }, aka: 'ptt koagulimi tromboplastina' },
  { id: 'fibrinogen', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Fibrinogjeni', en: 'Fibrinogen' }, aka: 'koagulimi' },
  { id: 'blood-group', cat: 'hematologji', sample: 'blood', prep: 'none', name: { sq: 'Grupi i gjakut dhe faktori Rh', en: 'Blood group and Rh factor' }, aka: 'abo rh grupi gjakut' },

  // Biokimi
  { id: 'glucose', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Glukoza', en: 'Glucose' }, aka: 'sheqeri ne gjak glikemia diabet' },
  { id: 'hba1c', cat: 'biokimi', sample: 'blood', prep: 'none', name: { sq: 'HbA1c (hemoglobina e glikuar)', en: 'HbA1c (glycated haemoglobin)' }, aka: 'hba1c glikuar diabet sheqeri 3 muaj' },
  { id: 'ogtt', cat: 'biokimi', sample: 'blood', prep: 'ogtt', name: { sq: 'Testi i tolerancës ndaj glukozës (OGTT)', en: 'Oral glucose tolerance test (OGTT)' }, aka: 'ogtt opterecenje glukoza shtatzeni diabet gestacional' },
  { id: 'insulin', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Insulina', en: 'Insulin' }, aka: 'homa rezistence insulinike' },
  { id: 'cholesterol', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Kolesteroli total', en: 'Total cholesterol' }, aka: 'kolesterol yndyrna lipide' },
  { id: 'hdl', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'HDL-kolesteroli', en: 'HDL cholesterol' }, aka: 'kolesteroli i mire lipide' },
  { id: 'ldl', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'LDL-kolesteroli', en: 'LDL cholesterol' }, aka: 'kolesteroli i keq lipide' },
  { id: 'triglycerides', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Trigliceridet', en: 'Triglycerides' }, aka: 'yndyrna lipide' },
  { id: 'urea', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Urea', en: 'Urea' }, aka: 'veshkat bun' },
  { id: 'creatinine', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Kreatinina', en: 'Creatinine' }, aka: 'veshkat egfr' },
  { id: 'uric-acid', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Acidi urik', en: 'Uric acid' }, aka: 'urik podagra gihti' },
  { id: 'ast', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'AST (GOT)', en: 'AST (GOT)' }, aka: 'melcia transaminazat got' },
  { id: 'alt', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'ALT (GPT)', en: 'ALT (GPT)' }, aka: 'melcia transaminazat gpt' },
  { id: 'ggt', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'GGT', en: 'GGT' }, aka: 'melcia gama gt' },
  { id: 'alp', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Fosfataza alkaline (ALP)', en: 'Alkaline phosphatase (ALP)' }, aka: 'alp melcia kockat' },
  { id: 'bilirubin', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Bilirubina totale dhe direkte', en: 'Total and direct bilirubin' }, aka: 'melcia verdheza' },
  { id: 'amylase', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Amilaza', en: 'Amylase' }, aka: 'pankreasi' },
  { id: 'protein', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Proteinat totale dhe albumina', en: 'Total protein and albumin' }, aka: 'albumina proteinat' },
  { id: 'electrolytes', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Elektrolitët (Na, K, Cl)', en: 'Electrolytes (Na, K, Cl)' }, aka: 'natriumi kaliumi kloruri' },
  { id: 'calcium', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Kalciumi', en: 'Calcium' }, aka: 'ca kockat' },

  // Hormone dhe tiroide
  { id: 'tsh', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'TSH', en: 'TSH' }, aka: 'tiroidja gjendra tiroide' },
  { id: 'ft4', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'FT4 (tiroksina e lirë)', en: 'FT4 (free thyroxine)' }, aka: 'tiroidja t4' },
  { id: 'ft3', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'FT3', en: 'FT3' }, aka: 'tiroidja t3' },
  { id: 'anti-tpo', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'Anti-TPO', en: 'Anti-TPO' }, aka: 'hashimoto tiroidja antitrupat' },
  { id: 'fsh', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'FSH', en: 'FSH' }, aka: 'hormonet riprodhuese cikli' },
  { id: 'lh', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'LH', en: 'LH' }, aka: 'hormonet riprodhuese ovulacioni' },
  { id: 'estradiol', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'Estradioli', en: 'Oestradiol' }, aka: 'e2 estrogjeni estradiol' },
  { id: 'progesterone', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'Progesteroni', en: 'Progesterone' }, aka: 'cikli ovulacioni' },
  { id: 'prolactin', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Prolaktina', en: 'Prolactin' }, aka: 'prl' },
  { id: 'testosterone', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Testosteroni', en: 'Testosterone' }, aka: 'hormoni mashkullor' },
  { id: 'cortisol', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Kortizoli', en: 'Cortisol' }, aka: 'stresi veshkoret' },
  { id: 'beta-hcg', cat: 'hormone', sample: 'blood', prep: 'none', name: { sq: 'Beta-hCG (testi i shtatzënisë)', en: 'Beta-hCG (pregnancy test)' }, aka: 'shtatzenia hcg testi shtatzenise pregnancy' },
  { id: 'psa-total', cat: 'hormone', sample: 'blood', prep: 'psa', name: { sq: 'PSA totale', en: 'Total PSA' }, aka: 'prostata psa' },
  { id: 'psa-free', cat: 'hormone', sample: 'blood', prep: 'psa', name: { sq: 'PSA e lirë', en: 'Free PSA' }, aka: 'prostata fpsa' },

  // Vitamina dhe minerale
  { id: 'vitd', cat: 'vitamina', sample: 'blood', prep: 'none', name: { sq: 'Vitamina D (25-OH)', en: 'Vitamin D (25-OH)' }, aka: 'vitamin d 25oh d3' },
  { id: 'b12', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Vitamina B12', en: 'Vitamin B12' }, aka: 'kobalamina b 12' },
  { id: 'folate', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Acidi folik', en: 'Folic acid (folate)' }, aka: 'folati b9 vitamina b9' },
  { id: 'iron', cat: 'vitamina', sample: 'blood', prep: 'fasting', name: { sq: 'Hekuri (Fe)', en: 'Iron (Fe)' }, aka: 'fe anemia hekur' },
  { id: 'ferritin', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Feritina', en: 'Ferritin' }, aka: 'rezervat e hekurit anemia' },
  { id: 'magnesium', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Magnezi', en: 'Magnesium' }, aka: 'mg' },

  // Inflamacion dhe imunologji
  { id: 'crp', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'CRP (proteina C-reaktive)', en: 'CRP (C-reactive protein)' }, aka: 'crp inflamacioni infeksioni' },
  { id: 'aso', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'ASO (antistreptolizina O)', en: 'ASO (antistreptolysin O)' }, aka: 'aso streptokoku fyti' },
  { id: 'rf', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'Faktori reumatoid (RF)', en: 'Rheumatoid factor (RF)' }, aka: 'rf reumatizma nyjet' },

  // Alergji dhe intolerancë
  { id: 'ige', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'IgE totale', en: 'Total IgE' }, aka: 'ige alergjia' },
  { id: 'allergy-panel', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'Panel alergjish (inhalatorë dhe ushqimorë)', en: 'Allergy panel (inhaled and food)' }, aka: 'alergjite polen pluhur ushqim' },
  { id: 'food-intolerance', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'Intoleranca ushqimore', en: 'Food intolerance' }, aka: 'intoleranca ushqimet laktoza gluteni' },

  // Mikrobiologji
  { id: 'urine-culture', cat: 'mikrobiologji', sample: 'urine', prep: 'culture', name: { sq: 'Urinokultura me antibiogram', en: 'Urine culture with sensitivity' }, aka: 'urinokultura antibiogrami infeksion urinar' },
  { id: 'stool-culture', cat: 'mikrobiologji', sample: 'stool', prep: 'culture', name: { sq: 'Koprokultura', en: 'Stool culture' }, aka: 'koprokultura feces diarrhea' },
  { id: 'throat-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'swab', name: { sq: 'Brisi i fytit', en: 'Throat swab' }, aka: 'bris fyti streptokoku angina' },
  { id: 'nasal-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'swab', name: { sq: 'Brisi i hundës', en: 'Nasal swab' }, aka: 'bris hunde' },
  { id: 'vaginal-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'vaginal', name: { sq: 'Brisi vaginal dhe cervikal', en: 'Vaginal and cervical swab' }, aka: 'bris vaginal cervikal gjinekologjik' },
  { id: 'h-pylori', cat: 'mikrobiologji', sample: 'varies', prep: 'none', name: { sq: 'Helicobacter pylori', en: 'Helicobacter pylori' }, aka: 'h pylori helikobakter stomaku gastriti' },

  // Urinë dhe feçe
  { id: 'urinalysis', cat: 'urine-fece', sample: 'urine', prep: 'urine', name: { sq: 'Urina komplet', en: 'Urinalysis' }, aka: 'urina urine analiza e urines' },
  { id: 'stool-parasites', cat: 'urine-fece', sample: 'stool', prep: 'stool', name: { sq: 'Fekaloskopia (parazitët në feçe)', en: 'Stool test for parasites' }, aka: 'parazitet krimbat fekaloskopi' },
  { id: 'occult-blood', cat: 'urine-fece', sample: 'stool', prep: 'stool', name: { sq: 'Gjaku okult në feçe', en: 'Faecal occult blood' }, aka: 'gjak ne fece fob' },
];

// Check-up panels ("Paketat"). Suggestions to agree with the laboratory; no prices on the site.
export const PANELS = [
  {
    id: 'baze',
    icon: 'clipboard-list',
    name: { sq: 'Check-up bazë', en: 'Basic check-up' },
    for: { sq: 'Për të rriturit, një herë në vit', en: 'For adults, once a year' },
    text: {
      sq: 'Pamja e përgjithshme: gjaku, sheqeri, yndyrnat, veshkat, mëlçia dhe urina.',
      en: 'The general picture: blood, sugar, fats, kidneys, liver and urine.',
    },
    tests: ['cbc', 'esr', 'glucose', 'cholesterol', 'triglycerides', 'urea', 'creatinine', 'ast', 'alt', 'urinalysis'],
  },
  {
    id: 'femije',
    icon: 'baby',
    name: { sq: 'Check-up për fëmijë', en: 'Children’s check-up' },
    for: { sq: 'Për fëmijët, para shkollës ose sipas pediatrit', en: 'For children, before school or as the paediatrician advises' },
    text: {
      sq: 'Gjaku, rezervat e hekurit, vitamina D, urina dhe parazitët — pa shumë marrje gjaku.',
      en: 'Blood count, iron stores, vitamin D, urine and parasites — with as few draws as possible.',
    },
    tests: ['cbc', 'ferritin', 'vitd', 'glucose', 'urinalysis', 'stool-parasites'],
  },
  {
    id: 'tiroide',
    icon: 'activity',
    name: { sq: 'Paketa e tiroides', en: 'Thyroid panel' },
    for: { sq: 'Lodhje, ndryshim peshe, rënie flokësh', en: 'Tiredness, weight change, hair loss' },
    text: {
      sq: 'Funksioni i tiroides dhe antitrupat — për diagnozë ose ndjekje.',
      en: 'Thyroid function and antibodies — for diagnosis or follow-up.',
    },
    tests: ['tsh', 'ft4', 'ft3', 'anti-tpo'],
  },
  {
    id: 'grua',
    icon: 'venus',
    name: { sq: 'Shëndeti i gruas', en: 'Women’s health' },
    for: { sq: 'Për gratë në çdo moshë', en: 'For women of every age' },
    text: {
      sq: 'Gjaku, hekuri, vitaminat dhe tiroidja — vlerat që ndikojnë më shpesh në energji dhe cikël.',
      en: 'Blood count, iron, vitamins and thyroid — the values that most often affect energy and the cycle.',
    },
    tests: ['cbc', 'ferritin', 'vitd', 'b12', 'tsh', 'glucose', 'urinalysis'],
  },
  {
    id: 'burre',
    icon: 'user-round',
    name: { sq: 'Shëndeti i burrit 40+', en: 'Men’s health 40+' },
    for: { sq: 'Për burrat mbi 40 vjeç', en: 'For men over 40' },
    text: {
      sq: 'Sheqeri, yndyrnat, veshkat, mëlçia dhe PSA — kontrolli vjetor pas të 40-ave.',
      en: 'Sugar, fats, kidneys, liver and PSA — the yearly check after 40.',
    },
    tests: ['cbc', 'glucose', 'hba1c', 'cholesterol', 'hdl', 'ldl', 'triglycerides', 'creatinine', 'uric-acid', 'alt', 'ggt', 'psa-total'],
  },
  {
    id: 'vitamina',
    icon: 'sun',
    name: { sq: 'Vitaminat dhe energjia', en: 'Vitamins & energy' },
    for: { sq: 'Lodhje, rënie flokësh, dimër pa diell', en: 'Tiredness, hair loss, a winter without sun' },
    text: {
      sq: 'Vitamina D, B12, acidi folik, hekuri, feritina dhe magnezi.',
      en: 'Vitamin D, B12, folic acid, iron, ferritin and magnesium.',
    },
    tests: ['vitd', 'b12', 'folate', 'iron', 'ferritin', 'magnesium'],
  },
  {
    id: 'zemra',
    icon: 'heart-pulse',
    name: { sq: 'Zemra dhe metabolizmi', en: 'Heart & metabolism' },
    for: { sq: 'Tension i lartë, peshë e tepërt, histori familjare', en: 'High blood pressure, excess weight, family history' },
    text: {
      sq: 'Sheqeri afatgjatë, profili i plotë lipidik dhe inflamacioni.',
      en: 'Long-term sugar, the full lipid profile and inflammation.',
    },
    tests: ['glucose', 'hba1c', 'cholesterol', 'hdl', 'ldl', 'triglycerides', 'crp'],
  },
  {
    id: 'alergji',
    icon: 'sparkles',
    name: { sq: 'Alergji dhe intolerancë', en: 'Allergy & intolerance' },
    for: { sq: 'Kollë sezonale, skuqje, probleme me ushqimin', en: 'Seasonal cough, rashes, trouble with food' },
    text: {
      sq: 'IgE totale, panel alergjish dhe intolerancë ushqimore — për fëmijë dhe të rritur.',
      en: 'Total IgE, an allergy panel and food intolerance — for children and adults.',
    },
    tests: ['ige', 'allergy-panel', 'food-intolerance'],
  },
];

// The common tests that have their own page in the full catalogue (/analizat/<test>/): test id → catalogue id.
// Matched by name and checked by hand; a test without an entry here simply has no link.
export const CATALOGUE_LINK = {
  cbc: 'k17689', esr: 'k17695', 'pt-inr': 'k17498', aptt: 'k17694', fibrinogen: 'k17688', 'blood-group': 'k17559',
  glucose: 'k17411', hba1c: 'k17401', insulin: 'k17925', cholesterol: 'k17393', hdl: 'k17394', ldl: 'k17395',
  triglycerides: 'k17425', urea: 'k17426', creatinine: 'k17397', 'uric-acid': 'k17376', ast: 'k17379', alt: 'k17378',
  ggt: 'k17410', alp: 'k17407', bilirubin: 'k17442', amylase: 'k17382', protein: 'k17420', calcium: 'k17389',
  tsh: 'k17935', ft4: 'k17934', ft3: 'k17940', 'anti-tpo': 'k17766', fsh: 'k17920', lh: 'k17921', estradiol: 'k17918',
  progesterone: 'k17927', prolactin: 'k17929', testosterone: 'k17936', cortisol: 'k49845', 'beta-hcg': 'k17922',
  'psa-total': 'k18185', 'psa-free': 'k18186', vitd: 'k17522', b12: 'k17428', folate: 'k17429', iron: 'k17421',
  ferritin: 'k17435', magnesium: 'k17415', crp: 'k17745', aso: 'k17730', rf: 'k17738', ige: 'k17744',
  'urine-culture': 'k17976', 'throat-swab': 'k17975', 'nasal-swab': 'k17993', 'vaginal-swab': 'k17979',
  'h-pylori': 'k17972', urinalysis: 'k18268', 'stool-parasites': 'k18130', 'occult-blood': 'k18001',
};
