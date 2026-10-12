// "Good to know" notes on lab tests, in plain words for patients (sq + en), each with its medical source.
// scripts/import-catalogue.mjs attaches them to tests by key (field `w` in catalogue.json), from the editorial
// safety review in the BeoLab reference data (schema 2.0: sharedSafetyNoticeIds, medicalSafetyReview flags).
// Working texts — the Human+ doctors should approve them (README → What is placeholder).

const MEDLINE = ['MedlinePlus', 'https://medlineplus.gov/lab-tests/how-to-prepare-for-a-lab-test/'];
const CDC_HERPES = ['CDC', 'https://www.cdc.gov/std/treatment-guidelines/herpes.htm'];

export const LAB_NOTES = {
  medication: {
    sq: 'Mos i ndërprisni dhe mos i ndryshoni barnat për shkak të një analize pa udhëzimin e mjekut. Na tregoni për barnat dhe suplementet që merrni.',
    en: 'Do not stop or change your medicines for a test unless your doctor tells you to. Tell us which medicines and supplements you take.',
    src: [MEDLINE],
  },
  'ige-antihistamine': {
    sq: 'Për analizat e alergjisë nga gjaku (IgE) zakonisht nuk ka nevojë të ndërpritet ilaçi kundër alergjisë. Pyetni mjekun nëse nuk jeni të sigurt.',
    en: 'For allergy blood tests (IgE) you usually do not need to stop your allergy medicine. Ask your doctor if you are unsure.',
    src: [['ASCIA', 'https://www.allergy.org.au/patients/fast-facts/allergy-testing'], MEDLINE],
  },
  'individual-prep': {
    sq: 'Agjërimi ose kufizimi i lëngjeve për këtë analizë nuk vlen njësoj për të gjithë — përshtatet sipas gjendjes suaj shëndetësore. Pyetni para se të filloni.',
    en: 'Fasting or limiting fluids for this test is not the same for everyone — it depends on your health. Ask us before you start.',
    src: [MEDLINE],
  },
  'hormone-dosing': {
    sq: 'Analizat shtesë hormonale nuk rekomandohen për të caktuar dozën e terapisë hormonale të përgatitur individualisht në menopauzë. Për përdorimet e tjera vendos mjeku.',
    en: 'Extra hormone tests are not recommended for setting the dose of individually compounded menopausal hormone therapy. For other uses, your doctor decides.',
    src: [['ACOG', 'https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2023/11/compounded-bioidentical-menopausal-hormone-therapy']],
  },
  'adrenal-fatigue': {
    sq: '“Lodhja e mbiveshkoreve” nuk është diagnozë e provuar dhe asnjë test nuk e vërteton. Kortizoli matet për sëmundje hormonale të përcaktuara qartë.',
    en: '“Adrenal fatigue” is not a proven diagnosis and no test confirms it. Cortisol is measured for clearly defined hormone disorders.',
    src: [['Endocrine Society', 'https://www.endocrine.org/patient-engagement/endocrine-library/adrenal-fatigue']],
  },
  'food-igg': {
    sq: 'Testet IgG për ushqimet nuk rekomandohen për diagnozën e alergjisë ose të intolerancës ushqimore, dhe rezultati nuk duhet të vendosë një dietë eliminimi. Flisni me mjekun.',
    en: 'Food IgG tests are not recommended for diagnosing a food allergy or intolerance, and the result should not decide an elimination diet. Talk to your doctor.',
    src: [['AAAAI', 'https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/igg-food-test']],
  },
  functional: {
    sq: 'Vlera klinike e këtij testi për përdorime të gjera “funksionale” nuk është vërtetuar. Një rezultat jashtë normës nuk është vetvetiu diagnozë — e interpreton mjeku.',
    en: 'The clinical value of this test for broad “functional” uses is not established. An unusual result is not a diagnosis by itself — your doctor interprets it.',
    src: [MEDLINE],
  },
  'hsv-igm': {
    sq: 'Antitrupat IgM për herpesin (HSV) nuk rekomandohen: nuk dallojnë me siguri llojin e virusit, as një infeksion të ri nga një rikthim.',
    en: 'IgM antibody tests for herpes (HSV) are not recommended: they cannot reliably tell the virus type, or a new infection from a recurrence.',
    src: [CDC_HERPES],
  },
  'hsv-pregnancy': {
    sq: 'Analiza rutinë për HSV-2 te shtatzënat pa simptoma nuk rekomandohet; mjeku vendos sipas rastit.',
    en: 'Routine HSV-2 testing in pregnancy without symptoms is not recommended; your doctor decides case by case.',
    src: [CDC_HERPES],
  },
  'rubella-igm': {
    sq: 'IgM për rubeolën bëhet kur dyshohet infeksion ose pas një ekspozimi, jo si analizë rutinë në shtatzëni.',
    en: 'Rubella IgM is for a suspected infection or after an exposure, not a routine test in pregnancy.',
    src: [['CDC', 'https://www.cdc.gov/rubella/php/laboratories/serology-testing.html']],
  },
  roma: {
    sq: 'ROMA ndihmon vlerësimin e një mase të gjetur në vezore; nuk është analizë depistimi për të gjitha gratë dhe nuk vendos vetë diagnozën.',
    en: 'ROMA helps assess a mass already found on an ovary; it is not a screening test for all women and does not make a diagnosis on its own.',
    src: [['FDA', 'https://www.accessdata.fda.gov/cdrh_docs/reviews/k103358.pdf']],
  },
  nipt: {
    sq: 'Depistimi i ADN-së fetale për mikrodelecione, sëmundje të një gjeni ose kromozomet seksuale nuk rekomandohet rutinë; zgjidhet pas këshillimit gjenetik.',
    en: 'Fetal DNA screening for microdeletions, single-gene conditions or the sex chromosomes is not recommended routinely; it is chosen after genetic counselling.',
    src: [['ACOG', 'https://www.acog.org/clinical/clinical-guidance/practice-advisory/articles/2026/01/screening-for-fetal-chromosomal-abnormalities']],
  },
  tick: {
    sq: 'Gjetja e një mikrobi te rriqra nuk vërteton se jeni infektuar, dhe një rezultat negativ nuk ju siguron. Nëse keni simptoma, shkoni te mjeku.',
    en: 'Finding a germ in the tick does not prove that you are infected, and a negative result is no guarantee. If you have symptoms, see your doctor.',
    src: [['CDC', 'https://www.cdc.gov/ticks/after-a-tick-bite/']],
  },
  'drug-allergy': {
    sq: 'Alergjia ndaj një bari (p.sh. ndaj qetësuesve të dhimbjes NSAID) nuk vërtetohet dhe nuk përjashtohet me një analizë të vetme gjaku; e vlerëson mjeku ose alergologu.',
    en: 'A drug allergy (for example to NSAID painkillers) cannot be confirmed or ruled out by one blood test; your doctor or an allergist assesses it.',
    src: [['AAAAI', 'https://www.aaaai.org/tools-for-the-public/conditions-library/allergies/allergic-to-aspirin']],
  },
  'acute-illness': {
    sq: 'Nëse jeni të sëmurë, pyetni mjekun nëse analiza duhet shtyrë — ndonjëherë vetë sëmundja është arsyeja e analizës.',
    en: 'If you are unwell, ask your doctor whether to postpone the test — sometimes the illness itself is the reason for it.',
    src: [['NICE', 'https://www.nice.org.uk/guidance/NG145/chapter/recommendations']],
  },
  psa: {
    sq: 'PSA pa simptoma bëhet pasi të keni folur me mjekun për përfitimet dhe kufizimet e saj.',
    en: 'A PSA test without symptoms is a choice to make after talking with your doctor about its benefits and limits.',
    src: [['National Cancer Institute', 'https://www.cancer.gov/types/prostate/psa-fact-sheet']],
  },
  dao: {
    sq: 'Matja e DAO nuk është analizë përfundimtare për intolerancën ndaj histaminës.',
    en: 'A DAO measurement is not a definitive test for histamine intolerance.',
    src: [['PubMed Central', 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8511827/']],
  },
  igra: {
    sq: 'Një rezultat negativ i IGRA-s nuk e përjashton plotësisht tuberkulozin dhe vetëm ai nuk e bën terapinë imunosupresive pa rrezik; vendos mjeku.',
    en: 'A negative IGRA does not fully rule out tuberculosis and does not on its own make immunosuppressive treatment risk-free; your doctor decides.',
    src: [['CDC', 'https://www.cdc.gov/tb/hcp/testing-diagnosis/interferon-gamma-release-assay.html']],
  },
  gbs: {
    sq: 'Në shtatzëni, analiza për streptokokun e grupit B zakonisht bëhet në javët 36–37, me tampon vaginal dhe rektal, sipas udhëzimit të gjinekologut.',
    en: 'In pregnancy, group B strep testing is usually done at 36–37 weeks with a vaginal and rectal swab, as your gynaecologist advises.',
    src: [['CDC', 'https://www.cdc.gov/group-b-strep/testing/index.html']],
  },
};

// Source data → note keys (used by the importer).
export const NOTE_FROM = {
  notices: { medication_management: 'medication', compounded_hormone_testing: 'hormone-dosing', adrenal_fatigue: 'adrenal-fatigue' },
  flags: {
    flag_medication_stop_instruction: 'medication',
    flag_medication_management_requires_clinician: 'medication',
    flag_unspecified_therapy_stop_72h: 'medication',
    flag_antimicrobial_timing_requires_clinician: 'medication',
    flag_gi_kit_medication_washout_review: 'medication',
    flag_blood_ige_antihistamine_source_conflict: 'ige-antihistamine',
    flag_fluid_restriction_needs_individual_review: 'individual-prep',
    flag_hormone_profile_indications_need_validation: 'hormone-dosing',
    flag_adrenal_fatigue_claim_guardrail: 'adrenal-fatigue',
    flag_food_igg_not_validated_for_intolerance: 'food-igg',
    flag_functional_claims_require_clinical_validation: 'functional',
    flag_urine_mycotoxin_clinical_validity: 'functional',
    flag_hsv_igm_not_recommended: 'hsv-igm',
    flag_hsv_serology_not_routine_pregnancy_screening: 'hsv-pregnancy',
    flag_rubella_igm_not_routine_pregnancy_screening: 'rubella-igm',
    flag_roma_not_population_screening: 'roma',
    flag_expanded_nipt_microdeletions_not_routine: 'nipt',
    flag_tick_pcr_not_patient_diagnosis: 'tick',
    flag_nsaid_ige_assay_validation_required: 'drug-allergy',
    flag_drug_ige_method_validation_required: 'drug-allergy',
    flag_blanket_acute_illness_deferral: 'acute-illness',
  },
  // Single tests whose own review note matters to patients (source id → keys).
  tests: {
    17292: ['dao'], 18185: ['psa'], 18311: ['nipt'], 18313: ['nipt'], 49039: ['igra'], 17995: ['gbs'],
    17414: ['medication'], 17804: ['medication'], 18172: ['medication'], 20034: ['medication'], 76990: ['medication'],
    82250: ['medication'], 17713: ['medication'], 18213: ['medication'],
  },
};
