// Frequently asked questions. Answers stay within what the clinic has published; anything the clinic still has
// to decide (prices, result times, payment, insurance) is answered with "ask us" rather than invented.

export const FAQ = [
  {
    id: 'termin',
    home: true,
    q: { sq: 'A duhet të rezervoj termin?', en: 'Do I need an appointment?', de: 'Brauche ich einen Termin?' },
    a: {
      sq: 'Për vizitat te mjekët specialistë ju rekomandojmë të rezervoni termin — me telefon, WhatsApp ose në faqen “Rezervo termin”. Recepsioni ju kthen përgjigje dhe e konfirmon orën. Për analizat laboratorike na telefononi për të pyetur për orarin më të përshtatshëm.',
      en: 'For specialist visits we recommend booking — by phone, WhatsApp or on the “Book an appointment” page. Reception replies and confirms the time. For lab tests, call us to ask about the best time to come.',
      de: 'Für Besuche bei unseren Fachärztinnen und Fachärzten empfehlen wir eine Terminbuchung — telefonisch, per WhatsApp oder auf der Seite „Termin buchen“. Die Rezeption antwortet Ihnen und bestätigt die Uhrzeit. Für Laboruntersuchungen rufen Sie uns bitte an und fragen Sie nach der besten Zeit für Ihren Besuch.',
    },
  },
  {
    id: 'esell',
    home: true,
    q: { sq: 'A duhet të vij esëll për analizat e gjakut?', en: 'Do I need to fast before a blood test?', de: 'Muss ich vor einer Blutuntersuchung nüchtern sein?' },
    a: {
      sq: 'Për glukozën, yndyrnat (kolesterolin, trigliceridet), hekurin dhe insulinën — po: 8–12 orë pa ngrënë, uji i thjeshtë lejohet. Shumë analiza të tjera nuk kërkojnë agjërim, por mëngjesi është koha më e mirë. Te çdo analizë në katalog shkruhet përgatitja.',
      en: 'For glucose, fats (cholesterol, triglycerides), iron and insulin — yes: 8–12 hours without food; plain water is fine. Many other tests need no fasting, but the morning is the best time. Every test in our catalogue shows its preparation.',
      de: 'Für Glukose, Blutfette (Cholesterin, Triglyceride), Eisen und Insulin — ja: 8–12 Stunden ohne Essen; reines Wasser ist erlaubt. Viele andere Untersuchungen erfordern kein Fasten, der Morgen ist aber die beste Zeit. Bei jeder Untersuchung in unserem Katalog ist die Vorbereitung angegeben.',
    },
  },
  {
    id: 'cmimi',
    home: true,
    q: { sq: 'Sa kushtojnë analizat?', en: 'How much do the tests cost?', de: 'Was kosten die Untersuchungen?' },
    a: {
      sq: 'Çmimet i jep recepsioni. Mënyra më e shpejtë: shtoni analizat në “Lista ime” dhe na e dërgoni në WhatsApp, Viber ose me e-mail — ju kthejmë përgjigje me çmimin e saktë.',
      en: 'Reception gives the prices. The quickest way: add the tests to “My list” and send it on WhatsApp, Viber or by e-mail — we reply with the exact price.',
      de: 'Die Preise nennt Ihnen die Rezeption. Am schnellsten geht es so: Fügen Sie die Untersuchungen zu „Meine Liste“ hinzu und senden Sie uns die Liste per WhatsApp, Viber oder E-Mail — wir antworten Ihnen mit dem genauen Preis.',
    },
  },
  {
    id: 'femijet',
    home: true,
    q: { sq: 'A merrni gjak edhe te fëmijët e vegjël?', en: 'Do you take blood from small children?', de: 'Nehmen Sie auch kleinen Kindern Blut ab?' },
    a: {
      sq: 'Po — pediatria dhe laboratori punojnë së bashku që nga viti 2011. Sillni librezën shëndetësore të fëmijës dhe, nëse e ka, analizat e mëparshme. Një lodër apo diçka për të pirë pas marrjes së gjakut ndihmon shumë.',
      en: 'Yes — our paediatrics and laboratory have worked together since 2011. Bring your child’s health booklet and any earlier results. A toy or something to drink after the blood test helps a lot.',
      de: 'Ja — unsere Kinderheilkunde und unser Labor arbeiten seit 2011 zusammen. Bringen Sie das Gesundheitsheft Ihres Kindes und, falls vorhanden, frühere Befunde mit. Ein Spielzeug oder etwas zu trinken nach der Blutabnahme hilft sehr.',
    },
  },
  {
    id: 'rezultatet',
    home: true,
    q: { sq: 'Kur dhe si i marr rezultatet?', en: 'When and how do I get my results?', de: 'Wann und wie erhalte ich meine Ergebnisse?' },
    a: {
      sq: 'Koha varet nga analiza: shumica e analizave të gjakut janë më të shpejta se kulturat mikrobiologjike, të cilat kërkojnë disa ditë. Kur jepni mostrën, stafi ju tregon kur dhe si t’i merrni rezultatet.',
      en: 'It depends on the test: most blood tests are quicker than microbiology cultures, which take a few days. When you give the sample, the staff tell you when and how to collect your results.',
      de: 'Das hängt von der Untersuchung ab: Die meisten Blutuntersuchungen gehen schneller als mikrobiologische Kulturen, die einige Tage dauern. Bei der Abgabe der Probe sagt Ihnen unser Personal, wann und wie Sie Ihre Ergebnisse erhalten.',
    },
  },
  {
    id: 'sjell',
    home: true,
    q: { sq: 'Çfarë duhet të sjell në vizitë?', en: 'What should I bring to my visit?', de: 'Was sollte ich zu meinem Besuch mitbringen?' },
    a: {
      sq: 'Një dokument identifikimi, udhëzimin e mjekut nëse e keni, listën e barnave që merrni dhe analizat e mëparshme. Për mostrat e urinës dhe të feçes përdorni enë sterile.',
      en: 'An ID document, your doctor’s referral if you have one, a list of the medicines you take and any earlier results. Use sterile containers for urine and stool samples.',
      de: 'Einen Ausweis, falls vorhanden die Überweisung Ihrer Ärztin oder Ihres Arztes, eine Liste der Medikamente, die Sie einnehmen, und frühere Befunde. Für Urin- und Stuhlproben verwenden Sie bitte sterile Behälter.',
    },
  },
  {
    id: 'barnat',
    q: { sq: 'A duhet t’i ndërpres barnat para analizave?', en: 'Should I stop my medicines before tests?', de: 'Soll ich meine Medikamente vor den Untersuchungen absetzen?' },
    a: {
      sq: 'Mos ndërprisni asnjë bar pa folur me mjekun. Për disa analiza (p.sh. hormonet e tiroides) mjeku mund t’ju thotë ta merrni barin pas marrjes së gjakut. Na tregoni çfarë barnash merrni kur vini.',
      en: 'Do not stop any medicine without talking to your doctor. For some tests (e.g. thyroid hormones) your doctor may ask you to take it after the blood test. Tell us which medicines you take when you come.',
      de: 'Setzen Sie kein Medikament ab, ohne mit Ihrer Ärztin oder Ihrem Arzt zu sprechen. Bei manchen Untersuchungen (z. B. Schilddrüsenhormone) kann Ihre Ärztin oder Ihr Arzt Sie bitten, das Medikament erst nach der Blutabnahme einzunehmen. Sagen Sie uns bei Ihrem Besuch, welche Medikamente Sie einnehmen.',
    },
  },
  {
    id: 'cikli',
    q: { sq: 'Në cilën ditë të ciklit bëhen hormonet?', en: 'On which day of the cycle are hormone tests done?', de: 'An welchem Zyklustag werden Hormonuntersuchungen gemacht?' },
    a: {
      sq: 'Zakonisht dita 2–5 e ciklit për FSH, LH dhe estradiol dhe rreth dita 21 për progesteronin — por gjithmonë sipas udhëzimit të gjinekologut tuaj.',
      en: 'Usually day 2–5 of the cycle for FSH, LH and oestradiol and around day 21 for progesterone — but always as your gynaecologist advises.',
      de: 'In der Regel am 2.–5. Zyklustag für FSH, LH und Östradiol und um den 21. Zyklustag für Progesteron — aber immer nach Empfehlung Ihrer Frauenärztin oder Ihres Frauenarztes.',
    },
  },
  {
    id: 'urina',
    q: { sq: 'Si ta mbledh mostrën e urinës?', en: 'How do I collect a urine sample?', de: 'Wie gewinne ich eine Urinprobe?' },
    a: {
      sq: 'Urina e parë e mëngjesit: lani zonën me ujë, hidhni rrjedhën e parë dhe mblidhni rrjedhën e mesme në një enë sterile. Për urinokulturë, mostra merret para fillimit të antibiotikut.',
      en: 'First urine of the morning: wash with water, let the first stream go and collect the midstream in a sterile container. For a urine culture, the sample is taken before starting antibiotics.',
      de: 'Erster Morgenurin: Waschen Sie den Intimbereich mit Wasser, lassen Sie den ersten Strahl ablaufen und fangen Sie den Mittelstrahl in einem sterilen Behälter auf. Für eine Urinkultur wird die Probe vor Beginn einer Antibiotikabehandlung genommen.',
    },
  },
  {
    id: 'gjuhet',
    q: { sq: 'Ku ndodhet qendra?', en: 'Where is the centre?', de: 'Wo befindet sich das Zentrum?' },
    a: {
      sq: 'Në Rruga B, Nr. 16, 10000 Prishtinë. Hapni udhëzimet në hartë nga faqja e kontaktit ose na telefononi dhe ju tregojmë rrugën.',
      en: 'At Rruga B, Nr. 16, 10000 Prishtina. Open the directions on the map from the contact page, or call us and we will guide you.',
      de: 'In der Rruga B, Nr. 16, 10000 Prishtina. Die Wegbeschreibung auf der Karte öffnen Sie über die Kontaktseite — oder rufen Sie uns an, und wir erklären Ihnen den Weg.',
    },
  },
];
