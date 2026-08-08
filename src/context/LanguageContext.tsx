import React, { createContext, useContext, useState } from 'react';

export type LanguageCode = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'bn';

export interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
  isEasyMode: boolean;
  toggleEasyMode: () => void;
}

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    brand_title: 'PulseCare AI',
    patient_portal: 'Patient Health Portal',
    hero_title: 'Personal AI Health & Recovery Companion',
    hero_subtitle: 'Simple, clear health guidance for you and your family.',
    scan_report: 'Scan Medical Report (Photo/PDF)',
    ask_ai: 'Talk to Health AI',
    download_summary: 'Download Simple Health Report',
    health_score: 'Health Status',
    my_medications: 'My Daily Medicines',
    med_hold_alert: 'Medicine Safety Hold',
    ai_copilot: 'AI Voice & Text Assistant',
    ask_question_placeholder: 'Ask any question in your language or type here...',
    tutorial_title: 'Quick Guide: How to Use PulseCare',
    tutorial_step1: 'Step 1: Click "Scan Medical Report" to take a photo of your lab test or prescription.',
    tutorial_step2: 'Step 2: Ask questions to the AI assistant in Hindi, Marathi, English, or your local language.',
    tutorial_step3: 'Step 3: Check your medicine list to see which medicines to take and which are on safety hold.',
    start_tour: 'Start Guided Tour 🧭',
    easy_mode: 'Village Easy Mode',
  },
  hi: {
    brand_title: 'पल्सकेयर एआई',
    patient_portal: 'मरीज़ स्वास्थ्य पोर्टल',
    hero_title: 'आपका व्यक्तिगत स्वास्थ्य और एआई साथी',
    hero_subtitle: 'आपके और आपके परिवार के लिए सरल, स्पष्ट स्वास्थ्य सलाह।',
    scan_report: 'पर्ची/लैब रिपोर्ट फोटो स्कैन करें',
    ask_ai: 'एआई स्वास्थ्य साथी से बात करें',
    download_summary: 'स्वास्थ्य रिपोर्ट डाउनलोड करें',
    health_score: 'स्वास्थ्य स्थिति',
    my_medications: 'मेरी दैनिक दवाएं',
    med_hold_alert: 'दवा सुरक्षा सूचना',
    ai_copilot: 'एआई आवाज और टेक्स्ट सहायक',
    ask_question_placeholder: 'अपनी भाषा में कोई भी सवाल पूछें...',
    tutorial_title: 'त्वरित निर्देश: पल्सकेयर का उपयोग कैसे करें',
    tutorial_step1: 'चरण 1: अपनी डॉक्टर पर्ची या खून जांच रिपोर्ट की फोटो खींचने के लिए "स्कैन" पर क्लिक करें।',
    tutorial_step2: 'चरण 2: एआई सहायक से हिंदी, मराठी या अपनी भाषा में सवाल पूछें।',
    tutorial_step3: 'चरण 3: अपनी दवाओं की सूची देखें कि कौन सी दवा लेनी है और कौन सी रुकी हुई है।',
    start_tour: 'मार्गदर्शिका शुरू करें 🧭',
    easy_mode: 'गांव सरल मोड़',
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
    tutorial_step1: 'पायरी १: तुमच्या रिपोर्टचा फोटो काढण्यासाठी "स्कॅन" बटनावर क्लिक करा.',
    tutorial_step2: 'पायरी २: एआय सहाय्यकाला मराठी किंवा हिंदीत प्रश्न विचारा.',
    tutorial_step3: 'पायरी ३: दररोज कोणत्या औषधी घ्यायच्या आहेत ते पहा.',
    start_tour: 'मार्गदर्शन सुरू करा 🧭',
    easy_mode: 'गावाठी सोपी पद्धत',
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
    tutorial_step1: 'படி 1: உங்கள் மருத்துவ அறிக்கையின் புகைப்படத்தை ஸ்கேன் செய்ய கிளிக் செய்க.',
    tutorial_step2: 'படி 2: தமிழ் அல்லது ஆங்கிலத்தில் AI உடன் பேசுங்கள்.',
    tutorial_step3: 'படி 3: உங்கள் மருந்துகளைச் சரிபார்க்கவும்.',
    start_tour: 'வழிகாட்டியைத் தொடங்கு 🧭',
    easy_mode: 'எளிய பயன்முறை',
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
    tutorial_step1: 'దశ 1: మీ రిపోర్ట్ ఫోటో తీసి స్కాన్ చేయండి.',
    tutorial_step2: 'దశ 2: తెలుగు లేదా ఇంగ్లీషులో ప్రశ్నించండి.',
    tutorial_step3: 'దశ 3: మీ మందుల వివరాలు చూడండి.',
    start_tour: 'మార్గదర్శకం ప్రారంభించండి 🧭',
    easy_mode: 'సులభ విధానం',
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
    tutorial_step1: 'ধাপ ১: আপনার ল্যাব রিপোর্ট বা প্রেসক্রিপশনের ছবি তুলতে স্ক্যান করুন।',
    tutorial_step2: 'ধাপ ২: বাংলায় এআই সহকারীর সাথে কথা বলুন।',
    tutorial_step3: 'ধাপ ৩: ওষুধের তালিকা পরীক্ষা করুন।',
    start_tour: 'গাইড শুরু করুন 🧭',
    easy_mode: 'সহজ মোড',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return (localStorage.getItem('pulse_lang') as LanguageCode) || 'en';
  });
  const [isEasyMode, setIsEasyMode] = useState<boolean>(() => {
    return localStorage.getItem('pulse_easy') === 'true';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('pulse_lang', lang);
  };

  const toggleEasyMode = () => {
    setIsEasyMode(prev => {
      const val = !prev;
      localStorage.setItem('pulse_easy', String(val));
      return val;
    });
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isEasyMode, toggleEasyMode }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
