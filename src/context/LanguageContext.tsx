import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  getPrompts: () => string[];
}

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    brand_title: 'PulseCare AI',
    patient_portal: 'Patient Health Portal',
    hero_title: 'Personal AI Health & Recovery Companion',
    hero_subtitle: 'Simple, clear health guidance for you and your family.',
    scan_report: 'Scan Medical Report (Photo/PDF)',
    ask_ai: 'Ask AI Health Assistant',
    download_summary: 'Download Health Summary',
    health_score: 'Health Status',
    my_medications: 'My Prescriptions',
    med_hold_alert: 'Medicine Safety Hold',
    ai_copilot: 'AI Voice & Text Assistant',
    ask_question_placeholder: 'Ask any health question in your language...',
    tutorial_title: 'Quick Guide: How to Use PulseCare',
    start_tour: 'Start Guided Tour 🧭',
    select_role: 'Select User Role:',
    access_portal: 'Access Clinical Portal',
    enter_dashboard: 'Enter Clinical Dashboard',
    sign_in_with: 'or sign in with',
    care_focus: 'Primary Care Focus',
    icu_telemetry: 'Active ICU Telemetry',
    safety_explanation: 'Lisinopril is on hold to protect kidney clearance while on diuretic treatment.',
    about_title: 'About PulseCare AI System',
    about_desc: 'Next-Generation Patient Record Analysis & Medical Decision Support System designed for hospitals and rural villages.',
    contact_title: 'Emergency & Contact Support',
    contact_phone: '24/7 ICU Helpline: 1800-108-PULSE',
    faq_title: 'Frequently Asked Questions (FAQs)',
    copilot_active: 'AI Copilot Active',
  },
  hi: {
    brand_title: 'पल्सकेयर एआई',
    patient_portal: 'मरीज़ स्वास्थ्य पोर्टल',
    hero_title: 'आपका व्यक्तिगत स्वास्थ्य एवं रिकवरी साथी',
    hero_subtitle: 'आपके और आपके परिवार के लिए सरल, स्पष्ट स्वास्थ्य सलाह।',
    scan_report: 'पर्ची/रिपोर्ट फोटो स्कैन करें',
    ask_ai: 'स्वास्थ्य एआई से सवाल पूछें',
    download_summary: 'स्वास्थ्य सारांश डाउनलोड करें',
    health_score: 'स्वास्थ्य स्थिति',
    my_medications: 'मेरी दवाइयां',
    med_hold_alert: 'दवा सुरक्षा सूचना (Hold)',
    ai_copilot: 'एआई आवाज एवं टेक्स्ट सहायक',
    ask_question_placeholder: 'अपनी भाषा में कोई भी सवाल पूछें...',
    tutorial_title: 'त्वरित निर्देश: पल्सकेयर का उपयोग कैसे करें',
    start_tour: 'मार्गदर्शिका शुरू करें 🧭',
    select_role: 'उपयोगकर्ता भूमिका चुनें:',
    access_portal: 'क्लीनिकल पोर्टल में प्रवेश करें',
    enter_dashboard: 'डैशबोर्ड में प्रवेश करें',
    sign_in_with: 'या इससे साइन इन करें',
    care_focus: 'मुख्य देखभाल फोकस',
    icu_telemetry: 'सक्रिय आईसीयू टेलीमेट्रिक्स',
    safety_explanation: 'किडनी की सुरक्षा के लिए लिसिनोप्रिल दवा को फिलहाल रोका गया है।',
    about_title: 'पल्सकेयर एआई प्रणाली के बारे में',
    about_desc: 'अस्पतालों और गांवों के लिए अगली पीढ़ी की चिकित्सा विश्लेषण प्रणाली।',
    contact_title: 'आपातकालीन एवं सहायता संपर्क',
    contact_phone: '24/7 आईसीयू हेल्पलाइन: 1800-108-PULSE',
    faq_title: 'अक्सर पूछे जाने वाले प्रश्न (FAQs)',
    copilot_active: 'एआई सहायक सक्रिय है',
  },
  mr: {
    brand_title: 'पल्सकेअर एआय',
    patient_portal: 'रुग्ण आरोग्य पोर्टल',
    hero_title: 'तुमचा वैयक्तिक आरोग्य आणि एआय सोबती',
    hero_subtitle: 'तुमच्या आणि तुमच्या कुटुंबासाठी सोपी, स्पष्ट आरोग्य माहिती.',
    scan_report: 'वैद्यकीय अहवाल फोटो स्कॅन करा',
    ask_ai: 'आरोग्य एआय सोबत बोला',
    download_summary: 'आरोग्य अहवाल डाउनलोड करा',
    health_score: 'आरोग्य स्थिती',
    my_medications: 'माझ्या दैनंदिन औषधी',
    med_hold_alert: 'औषध सुरक्षितता इशारा',
    ai_copilot: 'एआय व्हॉइस आणि टेक्स्ट सहाय्यक',
    ask_question_placeholder: 'तुमच्या भाषेत कोणताही प्रश्न विचारा...',
    tutorial_title: 'सोपे मार्गदर्शन: कसे वापरावे',
    start_tour: 'मार्गदर्शन सुरू करा 🧭',
    select_role: 'वापरकर्ता भूमिका निवडा:',
    access_portal: 'क्लिनिकल पोर्टलमध्ये प्रवेश करा',
    enter_dashboard: 'डॅशबोर्डवर जा',
    sign_in_with: 'किंवा साइन इन करा',
    care_focus: 'मुख्य वैद्यकीय काळजी',
    icu_telemetry: 'सक्रिय आयसीयू टेलिमेट्री',
    safety_explanation: 'किडनीच्या सुरक्षेसाठी लिसिनोप्रिल औषध सध्या थांबवण्यात आले आहे.',
    about_title: 'पल्सकेअर एआय बद्दल',
    about_desc: 'रुग्णालये आणि खेड्यांसाठी अत्याधुनिक आरोग्य विश्लेषक प्रणाली.',
    contact_title: 'आपत्कालीन मदत आणि संपर्क',
    contact_phone: '२४/७ हेल्पलाइन: १८००-१०८-पल्स',
    faq_title: 'वारंवार विचारले जाणारे प्रश्न (FAQs)',
    copilot_active: 'एआय सोबती सक्रिय',
  },
  ta: {
    brand_title: 'பல்ஸ்கேர் ஏஐ',
    patient_portal: 'நோயாளி சுகாதார தளம்',
    hero_title: 'உங்கள் தனிப்பட்ட சுகாதார AI உதவியாளர்',
    hero_subtitle: 'உங்களுக்கும் உங்கள் குடும்பத்திற்கும் எளிய சுகாதார வழிகாட்டுதல்.',
    scan_report: 'மருத்துவ அறிக்கையை ஸ்கேன் செய்க',
    ask_ai: 'சுகாதார AI உடன் பேசுங்கள்',
    download_summary: 'அறிக்கையைப் பதிவிறக்கவும்',
    health_score: 'சுகாதார நிலை',
    my_medications: 'எனது மருந்துகள்',
    med_hold_alert: 'மருந்து பாதுகாப்பு எச்சரிக்கை',
    ai_copilot: 'AI குரல் மற்றும் உரை உதவியாளர்',
    ask_question_placeholder: 'உங்கள் மொழியில் எதையும் கேளுங்கள்...',
    tutorial_title: 'பயன்பாட்டு வழிகாட்டி',
    start_tour: 'வழிகாட்டியைத் தொடங்கு 🧭',
    select_role: 'பங்கு தேர்ந்தெடுக்கவும்:',
    access_portal: 'போர்ட்டலை அணுகவும்',
    enter_dashboard: 'டாஷ்போர்டிற்குச் செல்லவும்',
    sign_in_with: 'அல்லது உள்நுழையவும்',
    care_focus: 'முதன்மை பராமரிப்பு',
    icu_telemetry: 'செயலில் உள்ள ICU கண்காணிப்பு',
    safety_explanation: 'சிறுநீரகப் பாதுகாப்பிற்காக லிசினோபிரில் மருந்து நிறுத்தப்பட்டுள்ளது.',
    about_title: 'பல்ஸ்கேர் ஏஐ பற்றி',
    about_desc: 'மருத்துவமனைகளுக்கான புதிய தலைமுறை AI அமைப்பு.',
    contact_title: 'அவசர உதவித் தொடர்பு',
    contact_phone: '24/7 உதவி எண்: 1800-108-PULSE',
    faq_title: 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)',
    copilot_active: 'AI உதவியாளர் தயார்',
  },
  te: {
    brand_title: 'పల్స్ కేర్ ఏఐ',
    patient_portal: 'పేషెంట్ హెల్త్ పోర్టల్',
    hero_title: 'మీ వ్యక్తిగత ఆరోగ్య AI సహాయకుడు',
    hero_subtitle: 'మీకు మరియు మీ కుటుంబానికి సులువైన ఆరోగ్య సలహా.',
    scan_report: 'మెడికల్ రిపోర్ట్ స్కాన్ చేయండి',
    ask_ai: 'హెల్త్ AI తో మాట్లాడండి',
    download_summary: 'హెల్త్ రిపోర్ట్ డౌన్‌లోడ్ చేయండి',
    health_score: 'ఆరోగ్య పరిస్థితి',
    my_medications: 'నా రోజువారీ మందులు',
    med_hold_alert: 'మందుల హెచ్చరిక',
    ai_copilot: 'AI వాయిస్ & టెక్స్ట్ సహాయకుడు',
    ask_question_placeholder: 'మీ భాషలో ఏదైనా ప్రశ్నించండి...',
    tutorial_title: 'ఉపయోగ మార్గదర్శకం',
    start_tour: 'మార్గదర్శకం ప్రారంభించండి 🧭',
    select_role: 'మీ పాత్రను ఎంచుకోండి:',
    access_portal: 'పోర్టల్ ప్రవేశించండి',
    enter_dashboard: 'డాష్‌బోర్డ్ వెళ్లండి',
    sign_in_with: 'లేదా సైన్ ఇన్ చేయండి',
    care_focus: 'ముఖ్యమైన వైద్య సంరక్షణ',
    icu_telemetry: 'ICU నిఘా సేవలు',
    safety_explanation: 'కిడ్నీ రక్షణ కోసం లిసినోప్రిల్ మందు తాత్కాలికంగా ఆపబడింది.',
    about_title: 'పల్స్ కేర్ AI గురించి',
    about_desc: 'ఆసుపత్రుల కోసం ఆధునిక AI వైద్య సహాయ వ్యవస్థ.',
    contact_title: 'అత్యవసర సహాయం',
    contact_phone: '24/7 హెల్ప్‌లైన్: 1800-108-PULSE',
    faq_title: 'సాధారణంగా అడిగే ప్రశ్నలు (FAQs)',
    copilot_active: 'AI సహాయకుడు అందుబాటులో ఉన్నాడు',
  },
  bn: {
    brand_title: 'পালসকেয়ার এআই',
    patient_portal: 'রোগীর স্বাস্থ্য পোর্টাল',
    hero_title: 'আপনার ব্যক্তিগত স্বাস্থ্য এবং এআই সাথী',
    hero_subtitle: 'আপনার এবং আপনার পরিবারের জন্য সহজ স্বাস্থ্য পরামর্শ।',
    scan_report: 'মেডিকেল রিপোর্ট স্ক্যান করুন',
    ask_ai: 'স্বাস্থ্য এআই এর সাথে কথা বলুন',
    download_summary: 'স্বাস্থ্য রিপোর্ট ডাউনলোড করুন',
    health_score: 'স্বাস্থ্য অবস্থা',
    my_medications: 'আমার দৈনন্দিন ওষুধ',
    med_hold_alert: 'ওষুধ সুরক্ষার সতর্কতা',
    ai_copilot: 'এআই ভয়েস ও টেক্সট সহকারী',
    ask_question_placeholder: 'আপনার ভাষায় যেকোনো প্রশ্ন জিজ্ঞাসা করুন...',
    tutorial_title: 'সহজ ব্যবহার নির্দেশিকা',
    start_tour: 'গাইড শুরু করুন 🧭',
    select_role: 'ভূমিকা নির্বাচন করুন:',
    access_portal: 'পোর্টালে প্রবেশ করুন',
    enter_dashboard: 'ড্যাশবোর্ডে প্রবেশ করুন',
    sign_in_with: 'অথবা লগইন করুন',
    care_focus: 'প্রধান চিকিৎসা যত্ন',
    icu_telemetry: 'সক্রিয় আইসিইউ পর্যবেক্ষণ',
    safety_explanation: 'কিশোরীর সুরক্ষার জন্য লিসিনোপ্রিল সাময়িকভাবে স্থগিত করা হয়েছে।',
    about_title: 'পালসকেয়ার এআই সম্পর্কে',
    about_desc: 'হাসপাতালের জন্য আধুনিক এআই চিকিৎসা বিশ্লেষণ ব্যবস্থা।',
    contact_title: 'জরুরি যোগাযোগ ব্যবস্থা',
    contact_phone: '২৪/৭ হেল্পলাইন: ১৮০০-১০৮-পালস',
    faq_title: 'সাধারণ জিজ্ঞাসা (FAQs)',
    copilot_active: 'এআই সহকারী প্রস্তুত',
  }
};

const MULTILINGUAL_PROMPTS: Record<LanguageCode, string[]> = {
  en: [
    'Explain my Creatinine lab results',
    'Why is Lisinopril currently held?',
    'What foods should I avoid with high potassium?',
    'Summarize my health status'
  ],
  hi: [
    'मेरी क्रिएटिनिन जांच रिपोर्ट समझाएं',
    'लिसिनोप्रिल दवा क्यों रोकी गई है?',
    'उच्च पोटेशियम में क्या न खाएं?',
    'मेरी स्वास्थ्य स्थिति का सारांश दें'
  ],
  mr: [
    'माझा क्रिएटिनिन रिपोर्ट समजावून सांगा',
    'लिसिनोप्रिल औषध का थांबवले आहे?',
    'पोटॅशियम वाढल्यावर काय खाऊ नये?',
    'माझ्या आरोग्याचा सारांश द्या'
  ],
  ta: [
    'எனது கிரியேட்டினின் பரிசோதனை முடிவை விளக்கவும்',
    'லிசினோபிரில் ஏன் நிறுத்தப்பட்டுள்ளது?',
    'அதிக பொட்டாசியம் இருக்கும்போது தவிர்க்க வேண்டிய உணவுகள்?',
    'எனது சுகாதார நிலையை சுருக்கவும்'
  ],
  te: [
    'నా క్రియాటినిన్ నివేదికను విశ్లేషించండి',
    'లిసినోప్రిల్ మందు ఎందుకు నిలిపివేయబడింది?',
    'పొటాషియం ఎక్కువగా ఉన్నప్పుడు ఏమి తినకూడదు?',
    'నా ఆరోగ్య పరిస్థితి యొక్క సారాంశం ఇవ్వండి'
  ],
  bn: [
    'আমার ক্রিয়েটিনিন টেস্টের ফলাফল বুঝিয়ে বলুন',
    'লিসিনোপ্রিল ওষুধ কেন বন্ধ রাখা হয়েছে?',
    'পটাশিয়াম বেশি থাকলে কী কী খাবার এড়িয়ে চলা উচিত?',
    'আমার স্বাস্থ্যের অবস্থা সংক্ষেপে বলুন'
  ]
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('pulse_lang') as LanguageCode) || 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('pulse_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  const getPrompts = (): string[] => {
    return MULTILINGUAL_PROMPTS[language] || MULTILINGUAL_PROMPTS.en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getPrompts }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
