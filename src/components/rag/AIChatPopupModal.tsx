import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { apiService } from '../../services/apiService';
import { 
  X, 
  Bot, 
  Send, 
  Sparkles, 
  User
} from 'lucide-react';

interface ChatMsg {
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

interface AIChatPopupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChatPopupModal: React.FC<AIChatPopupModalProps> = ({ isOpen, onClose }) => {
  const { currentPatient, theme } = useApp();
  const { t, getPrompts, language } = useLanguage();
  const isDark = theme === 'dark';

  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      sender: 'ai',
      text: language === 'hi' 
        ? `नमस्ते ${currentPatient.name}। मैं आपका स्वास्थ्य एआई सहायक हूँ। मैंने आपकी मेडिकल रिपोर्ट लोड कर ली है। आज मैं आपकी कैसे सहायता कर सकता हूँ?`
        : language === 'mr'
        ? `नमस्कार ${currentPatient.name}. मी तुमचा आरोग्य एआय सहाय्यक आहे. मी तुमचे वैद्यकीय अहवाल लोड केले आहेत. आज मी तुम्हाला कशी मदत करू शकतो?`
        : `Hello ${currentPatient.name}. I am your personal AI Health Companion. I have loaded your medical records. How can I help explain your lab results or medications today?`,
      timestamp: 'Just now'
    }
  ]);

  if (!isOpen) return null;

  const prompts = getPrompts();

  const handleSendMessage = async (queryText?: string) => {
    const q = queryText || input;
    if (!q.trim()) return;

    setInput('');
    const userMsg: ChatMsg = {
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

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
            : language === 'mr'
            ? "तुमचा सिरम क्रिएटिनिन स्तर सध्या २.३ mg/dL आहे. हे मूत्रपिंडाच्या (किडनी) कार्याचे दर्शक आहे. डॉ. शर्मा यांनी तुमच्या औषधांमध्ये योग्य बदल केले आहेत."
            : "Your Serum Creatinine level is currently 2.3 mg/dL. Creatinine is a marker of kidney filter function. Dr. Sharma has adjusted your medications to help protect your kidney function while treating fluid retention.";
        } else if (q.toLowerCase().includes('lisinopril') || q.includes('लिसिनोप्रिल')) {
          aiReply = language === 'hi'
            ? "लिसिनोप्रिल को फिलहाल रोक (HOLD) दिया गया है क्योंकि आपका पोटेशियम स्तर 5.4 mEq/L (थोड़ा बढ़ा हुआ) है। इसे रोकने से पोटेशियम और बढ़ने से बचता है।"
            : language === 'mr'
            ? "पोटॅशियमची पातळी ५.४ mEq/L असल्यामुळे लिसिनोप्रिल औषध तात्पुरते थांबवण्यात आले आहे."
            : "Lisinopril is currently on HOLD because your Serum Potassium level is 5.4 mEq/L (slightly elevated). Holding Lisinopril prevents your potassium from rising further and protects your kidneys while you are on diuretic treatment.";
        } else if (q.toLowerCase().includes('food') || q.toLowerCase().includes('potassium') || q.includes('पोटेशियम') || q.includes('पोटॅशियम')) {
          aiReply = language === 'hi'
            ? "चूंकि आपका पोटेशियम 5.4 mEq/L है, इसलिए केले, पालक, संतरा और नमक के विकल्प जैसी उच्च पोटेशियम वाली चीजों को सीमित रखने की सलाह दी जाती है।"
            : language === 'mr'
            ? "पोटॅशियम ५.४ mEq/L असल्यामुळे केळी, पालक, संत्री आणि इतर जास्त पोटॅशियम असलेले पदार्थ कमी प्रमाणात खाण्याचा सल्ला दिला जातो."
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

    setLoading(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-16 sm:bottom-20 sm:right-6 sm:left-auto z-50 w-auto sm:w-full max-w-md font-sans animate-fade-in">
      {/* Floating Mobile-Optimized Chat Popup Window */}
      <div className={`rounded-3xl border shadow-2xl overflow-hidden flex flex-col h-[460px] sm:h-[520px] transition-all ${
        isDark 
          ? 'bg-[#0c182c]/98 border-cyan-500/30 text-slate-100 shadow-cyan-950/60 backdrop-blur-2xl' 
          : 'bg-white/98 border-cyan-300 text-slate-900 shadow-2xl backdrop-blur-2xl'
      }`}>
        {/* Top Header Bar */}
        <div className={`px-4 sm:px-5 py-3 border-b flex items-center justify-between ${
          isDark ? 'bg-[#060c18] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-md">
              <div className={`w-full h-full ${isDark ? 'bg-[#070a12]' : 'bg-white'} rounded-[10px] flex items-center justify-center text-cyan-400 font-black`}>
                <Bot className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h3 className={`font-black text-xs tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {t('ai_copilot')}
              </h3>
              <p className="text-[10px] text-cyan-500 font-bold">
                {currentPatient.name} • {t('copilot_active')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Prompt Chips */}
        <div className={`p-2.5 border-b flex items-center gap-1.5 overflow-x-auto no-scrollbar ${
          isDark ? 'bg-[#060c18]/60 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          {prompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isDark 
                  ? 'bg-slate-900 text-cyan-300 border-cyan-900/50 hover:border-cyan-400' 
                  : 'bg-white text-cyan-900 border-cyan-300 hover:bg-cyan-50'
              }`}
            >
              ✨ {prompt}
            </button>
          ))}
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
              }`}>
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[82%] rounded-2xl p-3 leading-relaxed text-xs ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-bold shadow-sm'
                  : isDark ? 'bg-[#060c18] text-slate-200 border border-slate-800' : 'bg-slate-100 text-slate-900 border border-slate-300 font-semibold'
              }`}>
                <div className="whitespace-pre-line">{m.text}</div>
                <div className="text-[9px] opacity-60 text-right mt-1">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5" /> AI Engine processing in {language.toUpperCase()}...
            </div>
          )}
        </div>

        {/* Input Bar (FITS MOBILE FULL WIDTH PERFECTLY) */}
        <div className={`p-2.5 sm:p-3 border-t flex items-center gap-2 ${
          isDark ? 'bg-[#060c18] border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <input
            type="text"
            placeholder={t('ask_question_placeholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className={`flex-1 min-w-0 text-xs rounded-xl px-3 py-2.5 border focus:outline-none focus:border-cyan-400 font-semibold ${
              isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-white text-slate-900 border-slate-300'
            }`}
          />
          <button
            onClick={() => handleSendMessage()}
            className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black px-3.5 py-2.5 rounded-xl cursor-pointer flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
