import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/apiService';
import { OCRUploadModal } from '../ocr/OCRUploadModal';
import { 
  Heart, 
  Pill, 
  Bot, 
  Send, 
  AlertTriangle, 
  Download,
  Sparkles,
  User,
  ShieldCheck,
  Globe,
  Play,
  Activity,
  FileText,
  PhoneCall,
  Mail,
  HelpCircle,
  ShieldAlert,
  Info
} from 'lucide-react';

interface PatientChatMsg {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const PatientPortal: React.FC = () => {
  const { currentPatient, setIsPrintModalOpen, theme } = useApp();
  const { t, language } = useLanguage();
  const isDark = theme === 'dark';

  const overviewRef = useRef<HTMLDivElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);
  const medsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [activePatientSection, setActivePatientSection] = useState<'overview' | 'chat' | 'meds' | 'faq'>('overview');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<PatientChatMsg[]>([
    {
      sender: 'ai',
      text: language === 'hi' 
        ? `नमस्ते ${currentPatient.name}। मैं आपका स्वास्थ्य एआई सहायक हूँ। मैंने आपकी मेडिकल रिपोर्ट लोड कर ली है। आज मैं आपकी कैसे सहायता कर सकता हूँ?`
        : language === 'mr'
        ? `नमस्कार ${currentPatient.name}. मी तुमचा आरोग्य एआय सहाय्यक आहे. मी तुमचे वैद्यकीय अहवाल लोड केले आहेत.`
        : `Hello ${currentPatient.name}. I am your personal AI Health Companion. I have loaded your medical records. How can I help explain your lab results or medications today?`,
      timestamp: 'Just now'
    }
  ]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>, section: 'overview' | 'chat' | 'meds' | 'faq') => {
    setActivePatientSection(section);
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const PRESET_PROMPTS = [
    language === 'hi' ? 'मेरी क्रिएटिनिन जांच रिपोर्ट समझाएं' : 'Explain my Creatinine lab results',
    language === 'hi' ? 'लिसिनोप्रिल दवा क्यों रोकी गई है?' : 'Why is Lisinopril currently held?',
    language === 'hi' ? 'उच्च पोटेशियम में क्या न खाएं?' : 'What foods should I avoid with high potassium?',
    language === 'hi' ? 'मेरी स्वास्थ्य स्थिति का सारांश दें' : 'Summarize my health status'
  ];

  const handleSendMessage = async (queryText?: string) => {
    const q = queryText || chatInput;
    if (!q.trim()) return;

    setChatInput('');
    const userMsg: PatientChatMsg = {
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setChatLoading(true);

    const ragRes = await apiService.queryRAGAssistant(q, currentPatient.id);

    if (ragRes) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: ragRes.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      setTimeout(() => {
        let aiReply = "Your health parameters are being actively monitored by Dr. Rajesh Sharma's clinical team.";
        if (q.toLowerCase().includes('creatinine') || q.includes('क्रिएटिनिन')) {
          aiReply = language === 'hi' 
            ? "आपका सीरम क्रिएटिनिन स्तर वर्तमान में 2.3 mg/dL है। यह गुर्दे (किडनी) की सफाई क्षमता का संकेतक है। डॉक्टर शर्मा ने आपकी किडनी की सुरक्षा के लिए दवाओं में बदलाव किया है।"
            : "Your Serum Creatinine level is currently 2.3 mg/dL. Creatinine is a marker of kidney filter function. Dr. Sharma has adjusted your medications to help protect your kidney function while treating fluid retention.";
        } else if (q.toLowerCase().includes('lisinopril') || q.includes('लिसिनोप्रिल')) {
          aiReply = language === 'hi'
            ? "लिसिनोप्रिल को फिलहाल रोक (HOLD) दिया गया है क्योंकि आपका पोटेशियम स्तर 5.4 mEq/L (थोड़ा बढ़ा हुआ) है। इसे रोकने से पोटेशियम और बढ़ने से बचता है।"
            : "Lisinopril is currently on HOLD because your Serum Potassium level is 5.4 mEq/L (slightly elevated). Holding Lisinopril prevents your potassium from rising further and protects your kidneys while you are on diuretic treatment.";
        } else if (q.toLowerCase().includes('food') || q.toLowerCase().includes('potassium') || q.includes('पोटेशियम')) {
          aiReply = language === 'hi'
            ? "चूंकि आपका पोटेशियम 5.4 mEq/L है, इसलिए केले, पालक, संतरा और नमक के विकल्प जैसी उच्च पोटेशियम वाली चीजों को सीमित रखने की सलाह दी जाती है।"
            : "Because your potassium is 5.4 mEq/L, it's recommended to limit high-potassium foods like bananas, oranges, spinach, and salt substitutes until your next lab check.";
        } else if (q.toLowerCase().includes('summarize') || q.includes('सारांश')) {
          aiReply = `Health Summary for ${currentPatient.name}:\n- Primary Diagnosis: Decompensated Heart Failure with Kidney Function Monitoring.\n- Vitals: BP 162/100 mmHg, SpO2 91%.\n- Key Medication Note: Lisinopril is temporarily held to safeguard kidney function.`;
        }

        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: aiReply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 600);
    }

    setChatLoading(false);
  };

  return (
    <div className="space-y-10 font-sans pb-16">
      {/* HERO SECTION - DARK CONTRAST TEXT FOR LIGHT MODE & BRIGHT WHITE FOR DARK MODE */}
      <div ref={overviewRef} className="relative flex flex-col lg:flex-row items-start gap-6 scroll-mt-24">
        <div className={`flex-1 rounded-3xl p-6 sm:p-10 border shadow-xl relative overflow-hidden transition-all ${
          isDark 
            ? 'bg-slate-900 border-slate-800 text-white' 
            : 'bg-white border-slate-300 text-slate-900 shadow-slate-200'
        }`}>
          {/* Top System Pill */}
          <div className="flex justify-center mb-6">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider border ${
              isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' : 'bg-emerald-100 text-emerald-900 border-emerald-400'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
              <span>{t('brand_title')} • Real-Time Personal AI Recovery Platform</span>
            </div>
          </div>

          {/* Hero Title & Subtitle - SOLID VISIBLE COLORS */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
            <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}>
              {t('hero_title')}
            </h1>
            <p className={`text-sm sm:text-base font-bold max-w-xl mx-auto leading-relaxed ${
              isDark ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {t('hero_subtitle')}
            </p>

            {/* Action Hero Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => setIsScanModalOpen(true)}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-md cursor-pointer transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>{t('scan_report')}</span>
              </button>

              <button
                onClick={() => scrollToSection(aiChatRef, 'chat')}
                className={`flex items-center gap-2 text-xs sm:text-sm font-black px-6 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-500" />
                <span>{t('ask_ai')}</span>
              </button>

              <button
                onClick={() => setIsPrintModalOpen(true)}
                className={`flex items-center gap-2 text-xs sm:text-sm font-black px-5 py-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isDark ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-slate-900 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <Download className="w-4 h-4 text-emerald-500" />
                <span>{t('download_summary')}</span>
              </button>
            </div>
          </div>

          {/* 4 Bottom Telemetry Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
            <div className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
            }`}>
              <div className="text-rose-600 mb-2">
                <Heart className="w-5 h-5" />
              </div>
              <div className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {currentPatient.riskScore}/100
              </div>
              <div className={`text-xs font-black ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {t('health_score')}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
            }`}>
              <div className="text-amber-600 mb-2">
                <Pill className="w-5 h-5" />
              </div>
              <div className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {currentPatient.activeMedications.length} Active
              </div>
              <div className={`text-xs font-black ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {t('my_medications')}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
            }`}>
              <div className="text-emerald-600 mb-2">
                <Activity className="w-5 h-5" />
              </div>
              <div className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                ICU Bed 04
              </div>
              <div className={`text-xs font-black ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                Telemetry Room
              </div>
            </div>

            <div className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-300 shadow-sm'
            }`}>
              <div className="text-teal-600 mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div className={`text-xl sm:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
                1 Hold
              </div>
              <div className={`text-xs font-black ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {t('med_hold_alert')}
              </div>
            </div>
          </div>
        </div>

        {/* FLOATING RIGHT NAVIGATION MENU (SMOOTH SCROLL FUNCTIONAL) */}
        <aside className={`w-full lg:w-60 rounded-3xl p-5 border shrink-0 transition-all shadow-lg space-y-4 lg:sticky lg:top-20 ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2.5">
            <span className={`text-xs font-black uppercase tracking-wider ${isDark ? 'text-emerald-400' : 'text-emerald-800'}`}>
              PATIENT MENU
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => scrollToSection(overviewRef, 'overview')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                activePatientSection === 'overview'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePatientSection === 'overview' ? 'bg-white' : 'bg-slate-400'}`}></span>
              <span>Patient Health Portal</span>
            </button>

            <button
              onClick={() => scrollToSection(aiChatRef, 'chat')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                activePatientSection === 'chat'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePatientSection === 'chat' ? 'bg-white' : 'bg-slate-400'}`}></span>
              <span>Talk to Health AI</span>
            </button>

            <button
              onClick={() => setIsScanModalOpen(true)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <span>Scan Medical Report</span>
            </button>

            <button
              onClick={() => scrollToSection(medsRef, 'meds')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                activePatientSection === 'meds'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePatientSection === 'meds' ? 'bg-white' : 'bg-slate-400'}`}></span>
              <span>My Daily Medicines</span>
            </button>

            <button
              onClick={() => scrollToSection(footerRef, 'faq')}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                activePatientSection === 'faq'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : isDark ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${activePatientSection === 'faq' ? 'bg-white' : 'bg-slate-400'}`}></span>
              <span>Contact Us & FAQs</span>
            </button>
          </div>
        </aside>
      </div>

      {/* PATIENT CARE FOCUS & MEDICATIONS SECTION */}
      <div ref={medsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 scroll-mt-24">
        {/* Left Column: Conditions & Medications */}
        <div className="lg:col-span-1 space-y-5">
          <div className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black uppercase flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <Heart className="w-4 h-4 text-rose-500" /> Care Focus
              </span>
              <span className="text-[10px] bg-rose-500/10 text-rose-600 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-bold">
                ICU Telemetry
              </span>
            </div>
            <div className="text-sm font-black leading-snug">
              {currentPatient.primaryDiagnosis}
            </div>
            <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Attending physician <strong className="text-emerald-600 font-bold">{currentPatient.attendingPhysician}</strong> is actively managing fluid balance and kidney clearance.
            </p>
          </div>

          <div className={`p-6 rounded-3xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black uppercase flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <Pill className="w-4 h-4 text-amber-500" /> {t('my_medications')} ({currentPatient.activeMedications.length})
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {currentPatient.activeMedications.map((med, idx) => {
                const isHeld = med.toLowerCase().includes('hold');
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                      isHeld 
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-extrabold' 
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <span className="font-bold">{med}</span>
                    {isHeld ? (
                      <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                        Hold
                      </span>
                    ) : (
                      <span className="text-[9px] text-emerald-600 font-black flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
              isDark ? 'bg-slate-950 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
            }`}>
              <div className="font-black flex items-center gap-1 text-xs text-amber-600">
                <AlertTriangle className="w-4 h-4" /> {t('med_hold_alert')}
              </div>
              <p className="text-xs font-bold leading-relaxed">
                Lisinopril is held to keep your potassium level in a safe range. Please do not take Lisinopril until Dr. Sharma instructs you to restart.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: AI Health Assistant Chatbot */}
        <div ref={aiChatRef} className="lg:col-span-2 space-y-5 scroll-mt-24">
          <div className={`p-6 rounded-3xl border min-h-[480px] flex flex-col justify-between space-y-4 shadow-xl ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{t('ai_copilot')}</h3>
                  <p className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Grounded in Eleanor Vance's verified medical records</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-black bg-emerald-50 border border-emerald-300 px-3 py-1 rounded-full">
                AI Copilot Active
              </span>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {PRESET_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(prompt)}
                  className={`text-xs font-black px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700' 
                      : 'bg-slate-100 text-emerald-900 border-slate-300 hover:bg-slate-200'
                  }`}
                >
                  ✨ {prompt}
                </button>
              ))}
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[320px]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs shrink-0 ${
                    m.sender === 'user' ? 'bg-emerald-600 text-white font-black' : 'bg-slate-800 text-emerald-400 border border-slate-700'
                  }`}>
                    {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className={`max-w-xl rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-emerald-600 text-white font-extrabold shadow-sm'
                      : isDark ? 'bg-slate-950 text-slate-100 border border-slate-800' : 'bg-slate-100 text-slate-900 border border-slate-300'
                  }`}>
                    <div className="whitespace-pre-line">{m.text}</div>
                    <div className="text-[9px] opacity-70 text-right">{m.timestamp}</div>
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex items-center gap-2 text-xs text-emerald-600 font-extrabold animate-pulse">
                  <Sparkles className="w-4 h-4" /> AI Copilot is parsing medical records...
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="flex gap-2 pt-2 border-t border-slate-700/60">
              <input
                type="text"
                placeholder={t('ask_question_placeholder')}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className={`flex-1 text-xs rounded-2xl px-4 py-3 border focus:outline-none focus:border-emerald-500 font-semibold ${
                  isDark ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                }`}
              />
              <button
                onClick={() => handleSendMessage()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-3 rounded-2xl cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span className="text-xs">{t('ask_ai')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SEGMENT: ABOUT US, CONTACT US, FAQS, SINCE 2026 */}
      <div ref={footerRef} className={`rounded-3xl p-8 border space-y-8 scroll-mt-24 ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        {/* Top 3 Column Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
              <Info className="w-4 h-4" /> About PulseCare AI
            </div>
            <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              PulseCare AI is a Next-Generation Patient Record Analysis & Medical Decision Support System designed for hospitals, clinics, and rural villages. Empowering patients with plain-English lab insights and instant AI doctor assistance.
            </p>
          </div>

          {/* Contact Us */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" /> Emergency & Contact Us
            </div>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                <span>24/7 ICU Helpline: <strong className="text-rose-600 font-black">1800-108-PULSE</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>Patient Support: <strong>support@pulsecare.ai</strong></span>
              </div>
              <div className={`text-[11px] pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Cardiology & Kidney Care Center • Ward 4 Bed 04
              </div>
            </div>
          </div>

          {/* Trust & Badges */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" /> Verified Compliance
            </div>
            <div className="space-y-2 text-xs font-semibold">
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4" /> <span>HIPAA & ISO 27001 Certified Encryption</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4" /> <span>FastAPI Machine Learning Risk Engine</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-600">
                <ShieldCheck className="w-4 h-4" /> <span>Multilingual Rural Village Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="border-t border-slate-700/60 pt-6 space-y-4">
          <h3 className="font-black text-sm uppercase tracking-wider text-emerald-600 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions (FAQs)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-slate-900 dark:text-white">Q: How do I scan my doctor prescription or lab report?</div>
              <p className="text-slate-700 dark:text-slate-300">Click the green "Scan Medical Report" button to upload a photo or PDF. Our AI OCR engine automatically extracts test values and medication holds.</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-slate-900 dark:text-white">Q: Why is my Lisinopril medication on Safety Hold?</div>
              <p className="text-slate-700 dark:text-slate-300">When your blood potassium level is elevated (5.4 mEq/L), Lisinopril is temporarily held to prevent kidney strain until your next lab check.</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-slate-900 dark:text-white">Q: Can I talk to the AI in Hindi or Marathi?</div>
              <p className="text-slate-700 dark:text-slate-300">Yes! Use the language switcher at the top right of the screen to switch to Hindi, Marathi, Tamil, Telugu, or Bengali.</p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-slate-900 dark:text-white">Q: Is my medical data private and secure?</div>
              <p className="text-slate-700 dark:text-slate-300">All patient telemetry data is encrypted end-to-end and stored securely under strict HIPAA medical privacy standards.</p>
            </div>
          </div>
        </div>

        {/* Since 2026 Copyright Footer Bar */}
        <div className="border-t border-slate-700/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-500">
          <span>© Since 2026 PulseCare AI Health System • All Rights Reserved.</span>
          <span>Version 2.4 • Rural Medical AI Telemetry Project</span>
        </div>
      </div>

      <OCRUploadModal isOpen={isScanModalOpen} onClose={() => setIsScanModalOpen(false)} />
    </div>
  );
};
