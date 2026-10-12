// Laboratory catalogue ("Analizat"). Patients search it, add tests to "Lista ime" and send the list on
// WhatsApp / Viber / e-mail to ask for the price and a time. No prices on the site: the clinic gives them.
// The list covers the clinic's three labs (biochemistry, haematology, microbiology). It is a starting point —
// confirm it with the laboratory and add or remove lines here (README → Editing).

export const CATEGORIES = [
  { id: 'hematologji', icon: 'droplet', name: { sq: 'Hematologji', en: 'Haematology', de: 'Hämatologie' } },
  { id: 'biokimi', icon: 'flask-conical', name: { sq: 'Biokimi', en: 'Biochemistry', de: 'Biochemie' } },
  { id: 'hormone', icon: 'activity', name: { sq: 'Hormone dhe tiroide', en: 'Hormones & thyroid', de: 'Hormone & Schilddrüse' } },
  { id: 'vitamina', icon: 'sun', name: { sq: 'Vitamina dhe minerale', en: 'Vitamins & minerals', de: 'Vitamine & Mineralstoffe' } },
  { id: 'imunologji', icon: 'shield-check', name: { sq: 'Inflamacion dhe imunologji', en: 'Inflammation & immunology', de: 'Entzündung & Immunologie' } },
  { id: 'alergji', icon: 'sparkles', name: { sq: 'Alergji dhe intolerancë', en: 'Allergy & intolerance', de: 'Allergie & Unverträglichkeit' } },
  { id: 'mikrobiologji', icon: 'microscope', name: { sq: 'Mikrobiologji', en: 'Microbiology', de: 'Mikrobiologie' } },
  { id: 'urine-fece', icon: 'test-tubes', name: { sq: 'Urinë dhe feçe', en: 'Urine & stool', de: 'Urin & Stuhl' } },
];

// Sample types.
export const SAMPLES = {
  blood: { sq: 'Gjak', en: 'Blood', de: 'Blut' },
  urine: { sq: 'Urinë', en: 'Urine', de: 'Urin' },
  stool: { sq: 'Feçe', en: 'Stool', de: 'Stuhl' },
  swab: { sq: 'Bris', en: 'Swab', de: 'Abstrich' },
  varies: { sq: 'Gjak ose feçe', en: 'Blood or stool', de: 'Blut oder Stuhl' },
};

// Preparation tags. `short` is the chip on a test; `text` the explanation (also on /pergatitja/).
export const PREP = {
  none: {
    short: { sq: 'Pa përgatitje', en: 'No preparation', de: 'Keine Vorbereitung' },
    text: { sq: 'Nuk kërkohet përgatitje e veçantë.', en: 'No special preparation is needed.', de: 'Eine besondere Vorbereitung ist nicht nötig.' },
  },
  morning: {
    short: { sq: 'Në mëngjes', en: 'In the morning', de: 'Am Morgen' },
    text: {
      sq: 'Rekomandohet në mëngjes, mundësisht esëll — rezultatet krahasohen më mirë me ato të mëparshme.',
      en: 'Best in the morning, ideally fasting — results compare better with earlier ones.',
      de: 'Am besten morgens, idealerweise nüchtern — so lassen sich die Ergebnisse besser mit früheren vergleichen.',
    },
  },
  fasting: {
    short: { sq: 'Esëll 8–12 orë', en: 'Fasting 8–12 h', de: 'Nüchtern 8–12 Std.' },
    text: {
      sq: 'Mos hani 8–12 orë para marrjes së gjakut. Uji i thjeshtë lejohet; kafeja, çaji me sheqer dhe çamçakëzi jo.',
      en: 'Do not eat for 8–12 hours before the blood test. Plain water is fine; coffee, sweetened tea and chewing gum are not.',
      de: 'Essen Sie 8–12 Stunden vor der Blutabnahme nichts. Reines Wasser ist erlaubt; Kaffee, gesüßter Tee und Kaugummi nicht.',
    },
  },
  ogtt: {
    short: { sq: 'Esëll · rreth 2 orë', en: 'Fasting · about 2 h', de: 'Nüchtern · ca. 2 Std.' },
    text: {
      sq: 'Ejani esëll. Testi zgjat rreth 2 orë: pini tretësirën e glukozës dhe qëndroni në qendër deri në marrjen e fundit të gjakut.',
      en: 'Come fasting. The test takes about 2 hours: you drink the glucose solution and stay at the centre until the last blood sample.',
      de: 'Kommen Sie nüchtern. Der Test dauert etwa 2 Stunden: Sie trinken die Glukoselösung und bleiben bis zur letzten Blutabnahme im Zentrum.',
    },
  },
  rest: {
    short: { sq: 'Mëngjes, i qetë', en: 'Morning, rested', de: 'Morgens, ausgeruht' },
    text: {
      sq: 'Në mëngjes (07:30–09:00), pas 15–30 minutash pushim, pa stres dhe pa aktivitet fizik para analizës.',
      en: 'In the morning (07:30–09:00), after 15–30 minutes of rest, without stress or exercise beforehand.',
      de: 'Am Morgen (07:30–09:00), nach 15–30 Minuten Ruhe, ohne Stress und ohne körperliche Anstrengung vorher.',
    },
  },
  cycle: {
    short: { sq: 'Sipas ditës së ciklit', en: 'On a cycle day', de: 'An einem Zyklustag' },
    text: {
      sq: 'Sipas udhëzimit të mjekut — zakonisht dita 2–5 e ciklit për FSH, LH dhe estradiol, rreth dita 21 për progesteronin.',
      en: 'As your doctor advises — usually day 2–5 of the cycle for FSH, LH and oestradiol, around day 21 for progesterone.',
      de: 'Nach Anweisung Ihres Arztes — meist am 2.–5. Zyklustag für FSH, LH und Östradiol, um den 21. Tag für Progesteron.',
    },
  },
  psa: {
    short: { sq: '48 orë përgatitje', en: '48 h preparation', de: '48 Std. Vorbereitung' },
    text: {
      sq: '48 orë para analizës: pa marrëdhënie seksuale, pa çiklizëm ose ngarkesë të fortë dhe pa kontroll rektal.',
      en: 'For 48 hours before the test: no sexual intercourse, no cycling or hard exercise and no rectal examination.',
      de: 'In den 48 Stunden vor dem Test: kein Geschlechtsverkehr, kein Radfahren, keine starke körperliche Belastung und keine rektale Untersuchung.',
    },
  },
  urine: {
    short: { sq: 'Urina e parë e mëngjesit', en: 'First morning urine', de: 'Erster Morgenurin' },
    text: {
      sq: 'Urina e parë e mëngjesit: lani zonën, hidhni rrjedhën e parë dhe mblidhni rrjedhën e mesme në enë sterile.',
      en: 'First urine of the morning: wash, let the first stream go and collect the midstream in a sterile container.',
      de: 'Erster Urin am Morgen: Waschen Sie sich, lassen Sie den ersten Strahl ab und fangen Sie den Mittelstrahl in einem sterilen Gefäß auf.',
    },
  },
  culture: {
    short: { sq: 'Para antibiotikut', en: 'Before antibiotics', de: 'Vor Antibiotika' },
    text: {
      sq: 'Mostra merret para fillimit të antibiotikut. Nëse tashmë jeni duke marrë antibiotik, pyesni mjekun kur ta jepni.',
      en: 'The sample is taken before starting antibiotics. If you are already taking one, ask your doctor when to give it.',
      de: 'Die Probe wird vor Beginn einer Antibiotikatherapie abgenommen. Wenn Sie bereits ein Antibiotikum einnehmen, fragen Sie Ihren Arzt, wann Sie die Probe abgeben sollen.',
    },
  },
  stool: {
    short: { sq: 'Mostër e freskët', en: 'Fresh sample', de: 'Frische Probe' },
    text: {
      sq: 'Sasi sa një arrë, në enë sterile, e sjellë në laborator brenda 2 orësh.',
      en: 'About the size of a walnut, in a sterile container, brought to the lab within 2 hours.',
      de: 'Etwa walnussgroß, in einem sterilen Gefäß, innerhalb von 2 Stunden ins Labor gebracht.',
    },
  },
  swab: {
    short: { sq: 'Para ngrënies', en: 'Before eating', de: 'Vor dem Essen' },
    text: {
      sq: 'Në mëngjes, para ngrënies, pirjes dhe larjes së dhëmbëve; para fillimit të antibiotikut.',
      en: 'In the morning, before eating, drinking or brushing your teeth; before starting antibiotics.',
      de: 'Am Morgen, vor dem Essen, Trinken und Zähneputzen; vor Beginn einer Antibiotikatherapie.',
    },
  },
  vaginal: {
    short: { sq: 'Udhëzime për brisin', en: 'Swab instructions', de: 'Hinweise zum Abstrich' },
    text: {
      sq: 'Jo gjatë menstruacioneve. 24–48 orë para: pa marrëdhënie seksuale, pa preparate vaginale dhe pa larje vaginale.',
      en: 'Not during your period. For 24–48 hours before: no intercourse, no vaginal medicines and no douching.',
      de: 'Nicht während der Periode. In den 24–48 Stunden davor: kein Geschlechtsverkehr, keine Vaginalpräparate und keine Scheidenspülungen.',
    },
  },
};

// id · category · sample · prep · names · aka (extra search words, abbreviations, other spellings).
export const TESTS = [
  // Hematologji
  { id: 'cbc', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Gjaku komplet (hemogrami)', en: 'Complete blood count (CBC)', de: 'Großes Blutbild' }, aka: 'hemogram kks gjak komplet leukocite eritrocite trombocite hemoglobina hgb wbc rbc' },
  { id: 'esr', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Sedimentimi (SE)', en: 'Erythrocyte sedimentation rate (ESR)', de: 'Blutsenkung (BSG)' }, aka: 'se sedimentacioni sedimentimi i eritrociteve' },
  { id: 'pt-inr', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Koha e protrombinës (PT/INR)', en: 'Prothrombin time (PT/INR)', de: 'Prothrombinzeit (Quick/INR)' }, aka: 'pt inr koagulimi protrombina' },
  { id: 'aptt', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'aPTT', en: 'aPTT', de: 'aPTT' }, aka: 'ptt koagulimi tromboplastina' },
  { id: 'fibrinogen', cat: 'hematologji', sample: 'blood', prep: 'morning', name: { sq: 'Fibrinogjeni', en: 'Fibrinogen', de: 'Fibrinogen' }, aka: 'koagulimi' },
  { id: 'blood-group', cat: 'hematologji', sample: 'blood', prep: 'none', name: { sq: 'Grupi i gjakut dhe faktori Rh', en: 'Blood group and Rh factor', de: 'Blutgruppe und Rhesusfaktor' }, aka: 'abo rh grupi gjakut' },

  // Biokimi
  { id: 'glucose', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Glukoza', en: 'Glucose', de: 'Glukose (Blutzucker)' }, aka: 'sheqeri ne gjak glikemia diabet' },
  { id: 'hba1c', cat: 'biokimi', sample: 'blood', prep: 'none', name: { sq: 'HbA1c (hemoglobina e glikuar)', en: 'HbA1c (glycated haemoglobin)', de: 'HbA1c (glykiertes Hämoglobin)' }, aka: 'hba1c glikuar diabet sheqeri 3 muaj' },
  { id: 'ogtt', cat: 'biokimi', sample: 'blood', prep: 'ogtt', name: { sq: 'Testi i tolerancës ndaj glukozës (OGTT)', en: 'Oral glucose tolerance test (OGTT)', de: 'Oraler Glukosetoleranztest (oGTT)' }, aka: 'ogtt opterecenje glukoza shtatzeni diabet gestacional' },
  { id: 'insulin', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Insulina', en: 'Insulin', de: 'Insulin' }, aka: 'homa rezistence insulinike' },
  { id: 'cholesterol', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Kolesteroli total', en: 'Total cholesterol', de: 'Gesamtcholesterin' }, aka: 'kolesterol yndyrna lipide' },
  { id: 'hdl', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'HDL-kolesteroli', en: 'HDL cholesterol', de: 'HDL-Cholesterin' }, aka: 'kolesteroli i mire lipide' },
  { id: 'ldl', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'LDL-kolesteroli', en: 'LDL cholesterol', de: 'LDL-Cholesterin' }, aka: 'kolesteroli i keq lipide' },
  { id: 'triglycerides', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Trigliceridet', en: 'Triglycerides', de: 'Triglyceride' }, aka: 'yndyrna lipide' },
  { id: 'urea', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Urea', en: 'Urea', de: 'Harnstoff' }, aka: 'veshkat bun' },
  { id: 'creatinine', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Kreatinina', en: 'Creatinine', de: 'Kreatinin' }, aka: 'veshkat egfr' },
  { id: 'uric-acid', cat: 'biokimi', sample: 'blood', prep: 'fasting', name: { sq: 'Acidi urik', en: 'Uric acid', de: 'Harnsäure' }, aka: 'urik podagra gihti' },
  { id: 'ast', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'AST (GOT)', en: 'AST (GOT)', de: 'AST (GOT)' }, aka: 'melcia transaminazat got' },
  { id: 'alt', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'ALT (GPT)', en: 'ALT (GPT)', de: 'ALT (GPT)' }, aka: 'melcia transaminazat gpt' },
  { id: 'ggt', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'GGT', en: 'GGT', de: 'GGT (Gamma-GT)' }, aka: 'melcia gama gt' },
  { id: 'alp', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Fosfataza alkaline (ALP)', en: 'Alkaline phosphatase (ALP)', de: 'Alkalische Phosphatase (AP)' }, aka: 'alp melcia kockat' },
  { id: 'bilirubin', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Bilirubina totale dhe direkte', en: 'Total and direct bilirubin', de: 'Gesamt- und direktes Bilirubin' }, aka: 'melcia verdheza' },
  { id: 'amylase', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Amilaza', en: 'Amylase', de: 'Amylase' }, aka: 'pankreasi' },
  { id: 'protein', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Proteinat totale dhe albumina', en: 'Total protein and albumin', de: 'Gesamteiweiß und Albumin' }, aka: 'albumina proteinat' },
  { id: 'electrolytes', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Elektrolitët (Na, K, Cl)', en: 'Electrolytes (Na, K, Cl)', de: 'Elektrolyte (Na, K, Cl)' }, aka: 'natriumi kaliumi kloruri' },
  { id: 'calcium', cat: 'biokimi', sample: 'blood', prep: 'morning', name: { sq: 'Kalciumi', en: 'Calcium', de: 'Calcium' }, aka: 'ca kockat' },

  // Hormone dhe tiroide
  { id: 'tsh', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'TSH', en: 'TSH', de: 'TSH' }, aka: 'tiroidja gjendra tiroide' },
  { id: 'ft4', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'FT4 (tiroksina e lirë)', en: 'FT4 (free thyroxine)', de: 'fT4 (freies Thyroxin)' }, aka: 'tiroidja t4' },
  { id: 'ft3', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'FT3', en: 'FT3', de: 'fT3' }, aka: 'tiroidja t3' },
  { id: 'anti-tpo', cat: 'hormone', sample: 'blood', prep: 'morning', name: { sq: 'Anti-TPO', en: 'Anti-TPO', de: 'Anti-TPO' }, aka: 'hashimoto tiroidja antitrupat' },
  { id: 'fsh', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'FSH', en: 'FSH', de: 'FSH' }, aka: 'hormonet riprodhuese cikli' },
  { id: 'lh', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'LH', en: 'LH', de: 'LH' }, aka: 'hormonet riprodhuese ovulacioni' },
  { id: 'estradiol', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'Estradioli', en: 'Oestradiol', de: 'Östradiol' }, aka: 'e2 estrogjeni estradiol' },
  { id: 'progesterone', cat: 'hormone', sample: 'blood', prep: 'cycle', name: { sq: 'Progesteroni', en: 'Progesterone', de: 'Progesteron' }, aka: 'cikli ovulacioni' },
  { id: 'prolactin', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Prolaktina', en: 'Prolactin', de: 'Prolaktin' }, aka: 'prl' },
  { id: 'testosterone', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Testosteroni', en: 'Testosterone', de: 'Testosteron' }, aka: 'hormoni mashkullor' },
  { id: 'cortisol', cat: 'hormone', sample: 'blood', prep: 'rest', name: { sq: 'Kortizoli', en: 'Cortisol', de: 'Cortisol' }, aka: 'stresi veshkoret' },
  { id: 'beta-hcg', cat: 'hormone', sample: 'blood', prep: 'none', name: { sq: 'Beta-hCG (testi i shtatzënisë)', en: 'Beta-hCG (pregnancy test)', de: 'Beta-hCG (Schwangerschaftstest)' }, aka: 'shtatzenia hcg testi shtatzenise pregnancy' },
  { id: 'psa-total', cat: 'hormone', sample: 'blood', prep: 'psa', name: { sq: 'PSA totale', en: 'Total PSA', de: 'Gesamt-PSA' }, aka: 'prostata psa' },
  { id: 'psa-free', cat: 'hormone', sample: 'blood', prep: 'psa', name: { sq: 'PSA e lirë', en: 'Free PSA', de: 'Freies PSA' }, aka: 'prostata fpsa' },

  // Vitamina dhe minerale
  { id: 'vitd', cat: 'vitamina', sample: 'blood', prep: 'none', name: { sq: 'Vitamina D (25-OH)', en: 'Vitamin D (25-OH)', de: 'Vitamin D (25-OH)' }, aka: 'vitamin d 25oh d3' },
  { id: 'b12', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Vitamina B12', en: 'Vitamin B12', de: 'Vitamin B12' }, aka: 'kobalamina b 12' },
  { id: 'folate', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Acidi folik', en: 'Folic acid (folate)', de: 'Folsäure (Folat)' }, aka: 'folati b9 vitamina b9' },
  { id: 'iron', cat: 'vitamina', sample: 'blood', prep: 'fasting', name: { sq: 'Hekuri (Fe)', en: 'Iron (Fe)', de: 'Eisen (Fe)' }, aka: 'fe anemia hekur' },
  { id: 'ferritin', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Feritina', en: 'Ferritin', de: 'Ferritin' }, aka: 'rezervat e hekurit anemia' },
  { id: 'magnesium', cat: 'vitamina', sample: 'blood', prep: 'morning', name: { sq: 'Magnezi', en: 'Magnesium', de: 'Magnesium' }, aka: 'mg' },

  // Inflamacion dhe imunologji
  { id: 'crp', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'CRP (proteina C-reaktive)', en: 'CRP (C-reactive protein)', de: 'CRP (C-reaktives Protein)' }, aka: 'crp inflamacioni infeksioni' },
  { id: 'aso', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'ASO (antistreptolizina O)', en: 'ASO (antistreptolysin O)', de: 'ASL (Antistreptolysin O)' }, aka: 'aso streptokoku fyti' },
  { id: 'rf', cat: 'imunologji', sample: 'blood', prep: 'none', name: { sq: 'Faktori reumatoid (RF)', en: 'Rheumatoid factor (RF)', de: 'Rheumafaktor (RF)' }, aka: 'rf reumatizma nyjet' },

  // Alergji dhe intolerancë
  { id: 'ige', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'IgE totale', en: 'Total IgE', de: 'Gesamt-IgE' }, aka: 'ige alergjia' },
  { id: 'allergy-panel', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'Panel alergjish (inhalatorë dhe ushqimorë)', en: 'Allergy panel (inhaled and food)', de: 'Allergiepanel (Inhalations- und Nahrungsmittelallergene)' }, aka: 'alergjite polen pluhur ushqim' },
  { id: 'food-intolerance', cat: 'alergji', sample: 'blood', prep: 'none', name: { sq: 'Intoleranca ushqimore', en: 'Food intolerance', de: 'Nahrungsmittelunverträglichkeit' }, aka: 'intoleranca ushqimet laktoza gluteni' },

  // Mikrobiologji
  { id: 'urine-culture', cat: 'mikrobiologji', sample: 'urine', prep: 'culture', name: { sq: 'Urinokultura me antibiogram', en: 'Urine culture with sensitivity', de: 'Urinkultur mit Antibiogramm' }, aka: 'urinokultura antibiogrami infeksion urinar' },
  { id: 'stool-culture', cat: 'mikrobiologji', sample: 'stool', prep: 'culture', name: { sq: 'Koprokultura', en: 'Stool culture', de: 'Stuhlkultur' }, aka: 'koprokultura feces diarrhea' },
  { id: 'throat-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'swab', name: { sq: 'Brisi i fytit', en: 'Throat swab', de: 'Rachenabstrich' }, aka: 'bris fyti streptokoku angina' },
  { id: 'nasal-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'swab', name: { sq: 'Brisi i hundës', en: 'Nasal swab', de: 'Nasenabstrich' }, aka: 'bris hunde' },
  { id: 'vaginal-swab', cat: 'mikrobiologji', sample: 'swab', prep: 'vaginal', name: { sq: 'Brisi vaginal dhe cervikal', en: 'Vaginal and cervical swab', de: 'Vaginal- und Zervixabstrich' }, aka: 'bris vaginal cervikal gjinekologjik' },
  { id: 'h-pylori', cat: 'mikrobiologji', sample: 'varies', prep: 'none', name: { sq: 'Helicobacter pylori', en: 'Helicobacter pylori', de: 'Helicobacter pylori' }, aka: 'h pylori helikobakter stomaku gastriti' },

  // Urinë dhe feçe
  { id: 'urinalysis', cat: 'urine-fece', sample: 'urine', prep: 'urine', name: { sq: 'Urina komplet', en: 'Urinalysis', de: 'Urinuntersuchung (Urinstatus)' }, aka: 'urina urine analiza e urines' },
  { id: 'stool-parasites', cat: 'urine-fece', sample: 'stool', prep: 'stool', name: { sq: 'Fekaloskopia (parazitët në feçe)', en: 'Stool test for parasites', de: 'Stuhl auf Parasiten' }, aka: 'parazitet krimbat fekaloskopi' },
  { id: 'occult-blood', cat: 'urine-fece', sample: 'stool', prep: 'stool', name: { sq: 'Gjaku okult në feçe', en: 'Faecal occult blood', de: 'Okkultes Blut im Stuhl' }, aka: 'gjak ne fece fob' },
];

// Check-up panels ("Paketat"). Suggestions to agree with the laboratory; no prices on the site.
export const PANELS = [
  {
    id: 'baze',
    icon: 'clipboard-list',
    name: { sq: 'Check-up bazë', en: 'Basic check-up', de: 'Basis-Check-up' },
    for: { sq: 'Për të rriturit, një herë në vit', en: 'For adults, once a year', de: 'Für Erwachsene, einmal im Jahr' },
    text: {
      sq: 'Pamja e përgjithshme: gjaku, sheqeri, yndyrnat, veshkat, mëlçia dhe urina.',
      en: 'The general picture: blood, sugar, fats, kidneys, liver and urine.',
      de: 'Das Gesamtbild: Blut, Blutzucker, Blutfette, Nieren, Leber und Urin.',
    },
    tests: ['cbc', 'esr', 'glucose', 'cholesterol', 'triglycerides', 'urea', 'creatinine', 'ast', 'alt', 'urinalysis'],
  },
  {
    id: 'femije',
    icon: 'baby',
    name: { sq: 'Check-up për fëmijë', en: 'Children’s check-up', de: 'Check-up für Kinder' },
    for: { sq: 'Për fëmijët, para shkollës ose sipas pediatrit', en: 'For children, before school or as the paediatrician advises', de: 'Für Kinder, vor der Einschulung oder auf Empfehlung des Kinderarztes' },
    text: {
      sq: 'Gjaku, rezervat e hekurit, vitamina D, urina dhe parazitët — pa shumë marrje gjaku.',
      en: 'Blood count, iron stores, vitamin D, urine and parasites — with as few draws as possible.',
      de: 'Blutbild, Eisenspeicher, Vitamin D, Urin und Parasiten — mit so wenigen Blutabnahmen wie möglich.',
    },
    tests: ['cbc', 'ferritin', 'vitd', 'glucose', 'urinalysis', 'stool-parasites'],
  },
  {
    id: 'tiroide',
    icon: 'activity',
    name: { sq: 'Paketa e tiroides', en: 'Thyroid panel', de: 'Schilddrüsenprofil' },
    for: { sq: 'Lodhje, ndryshim peshe, rënie flokësh', en: 'Tiredness, weight change, hair loss', de: 'Müdigkeit, Gewichtsveränderung, Haarausfall' },
    text: {
      sq: 'Funksioni i tiroides dhe antitrupat — për diagnozë ose ndjekje.',
      en: 'Thyroid function and antibodies — for diagnosis or follow-up.',
      de: 'Schilddrüsenfunktion und Antikörper — zur Diagnose oder Verlaufskontrolle.',
    },
    tests: ['tsh', 'ft4', 'ft3', 'anti-tpo'],
  },
  {
    id: 'grua',
    icon: 'venus',
    name: { sq: 'Shëndeti i gruas', en: 'Women’s health', de: 'Frauengesundheit' },
    for: { sq: 'Për gratë në çdo moshë', en: 'For women of every age', de: 'Für Frauen jeden Alters' },
    text: {
      sq: 'Gjaku, hekuri, vitaminat dhe tiroidja — vlerat që ndikojnë më shpesh në energji dhe cikël.',
      en: 'Blood count, iron, vitamins and thyroid — the values that most often affect energy and the cycle.',
      de: 'Blutbild, Eisen, Vitamine und Schilddrüse — die Werte, die Energie und Zyklus am häufigsten beeinflussen.',
    },
    tests: ['cbc', 'ferritin', 'vitd', 'b12', 'tsh', 'glucose', 'urinalysis'],
  },
  {
    id: 'burre',
    icon: 'user-round',
    name: { sq: 'Shëndeti i burrit 40+', en: 'Men’s health 40+', de: 'Männergesundheit 40+' },
    for: { sq: 'Për burrat mbi 40 vjeç', en: 'For men over 40', de: 'Für Männer über 40' },
    text: {
      sq: 'Sheqeri, yndyrnat, veshkat, mëlçia dhe PSA — kontrolli vjetor pas të 40-ave.',
      en: 'Sugar, fats, kidneys, liver and PSA — the yearly check after 40.',
      de: 'Blutzucker, Blutfette, Nieren, Leber und PSA — die jährliche Kontrolle ab 40.',
    },
    tests: ['cbc', 'glucose', 'hba1c', 'cholesterol', 'hdl', 'ldl', 'triglycerides', 'creatinine', 'uric-acid', 'alt', 'ggt', 'psa-total'],
  },
  {
    id: 'vitamina',
    icon: 'sun',
    name: { sq: 'Vitaminat dhe energjia', en: 'Vitamins & energy', de: 'Vitamine & Energie' },
    for: { sq: 'Lodhje, rënie flokësh, dimër pa diell', en: 'Tiredness, hair loss, a winter without sun', de: 'Müdigkeit, Haarausfall, ein Winter ohne Sonne' },
    text: {
      sq: 'Vitamina D, B12, acidi folik, hekuri, feritina dhe magnezi.',
      en: 'Vitamin D, B12, folic acid, iron, ferritin and magnesium.',
      de: 'Vitamin D, B12, Folsäure, Eisen, Ferritin und Magnesium.',
    },
    tests: ['vitd', 'b12', 'folate', 'iron', 'ferritin', 'magnesium'],
  },
  {
    id: 'zemra',
    icon: 'heart-pulse',
    name: { sq: 'Zemra dhe metabolizmi', en: 'Heart & metabolism', de: 'Herz & Stoffwechsel' },
    for: { sq: 'Tension i lartë, peshë e tepërt, histori familjare', en: 'High blood pressure, excess weight, family history', de: 'Bluthochdruck, Übergewicht, familiäre Vorbelastung' },
    text: {
      sq: 'Sheqeri afatgjatë, profili i plotë lipidik dhe inflamacioni.',
      en: 'Long-term sugar, the full lipid profile and inflammation.',
      de: 'Langzeitblutzucker, das vollständige Lipidprofil und Entzündungswerte.',
    },
    tests: ['glucose', 'hba1c', 'cholesterol', 'hdl', 'ldl', 'triglycerides', 'crp'],
  },
  {
    id: 'alergji',
    icon: 'sparkles',
    name: { sq: 'Alergji dhe intolerancë', en: 'Allergy & intolerance', de: 'Allergie & Unverträglichkeit' },
    for: { sq: 'Kollë sezonale, skuqje, probleme me ushqimin', en: 'Seasonal cough, rashes, trouble with food', de: 'Saisonaler Husten, Hautausschlag, Beschwerden mit Lebensmitteln' },
    text: {
      sq: 'IgE totale, panel alergjish dhe intolerancë ushqimore — për fëmijë dhe të rritur.',
      en: 'Total IgE, an allergy panel and food intolerance — for children and adults.',
      de: 'Gesamt-IgE, ein Allergiepanel und Nahrungsmittelunverträglichkeit — für Kinder und Erwachsene.',
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
