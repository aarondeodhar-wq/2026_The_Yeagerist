import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Info, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  HelpCircle, 
  ShieldAlert,
  ArrowLeft
} from 'lucide-react';

export const ContactAndFaqPage: React.FC = () => {
  const { setActiveTab, theme } = useApp();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 font-sans pb-16 animate-fade-in">
      {/* Top Navigation Bar back to Dashboard */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 text-xs font-black px-4 py-2.5 rounded-2xl border transition-all cursor-pointer ${
            isDark ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800' : 'bg-white text-slate-900 border-slate-300 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Back to Health Overview</span>
        </button>

        <span className="text-xs font-black uppercase text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-400/30">
          PulseCare AI Information Center
        </span>
      </div>

      {/* Main Full Page Banner */}
      <div className={`rounded-3xl p-8 border space-y-8 shadow-xl ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
      }`}>
        <div className="border-b border-slate-700/50 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black text-cyan-400">
            About PulseCare AI, Contact Support & FAQs
          </h1>
          <p className={`text-xs sm:text-sm font-bold mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Comprehensive information regarding hospital telemetry, rural health initiative, data privacy, and emergency helplines.
          </p>
        </div>

        {/* 3 Column Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Us */}
          <div className={`p-6 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-cyan-400 font-black text-sm uppercase tracking-wider">
              <Info className="w-5 h-5" /> {t('about_title')}
            </div>
            <p className={`text-xs font-semibold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {t('about_desc')} Designed for hospitals, ICU wards, and rural villages to empower patients with plain-English lab insights and instant AI doctor guidance.
            </p>
          </div>

          {/* Contact Us */}
          <div className={`p-6 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-cyan-400 font-black text-sm uppercase tracking-wider">
              <PhoneCall className="w-5 h-5" /> {t('contact_title')}
            </div>
            <div className="space-y-2 text-xs font-bold">
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-rose-500" />
                <span>{t('contact_phone')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Support: <strong>support@pulsecare.ai</strong></span>
              </div>
              <div className={`text-[11px] pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Cardiology & Kidney Care Center • Ward 4 Bed 04
              </div>
            </div>
          </div>

          {/* Verified Compliance */}
          <div className={`p-6 rounded-2xl border space-y-3 ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-2 text-cyan-400 font-black text-sm uppercase tracking-wider">
              <ShieldAlert className="w-5 h-5" /> Verified Security
            </div>
            <div className="space-y-2 text-xs font-bold">
              <div className="flex items-center gap-2 text-emerald-500">
                <ShieldCheck className="w-4 h-4" /> <span>HIPAA & ISO 27001 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-500">
                <ShieldCheck className="w-4 h-4" /> <span>FastAPI Machine Learning Risk Engine</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-500">
                <ShieldCheck className="w-4 h-4" /> <span>Multilingual Rural Village Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion Grid */}
        <div className="border-t border-slate-700/60 pt-6 space-y-4">
          <h3 className="font-black text-base uppercase tracking-wider text-cyan-400 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" /> {t('faq_title')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-cyan-300 text-sm">Q: How do I scan my doctor prescription or lab report?</div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Click the green "Scan Medical Report" button to upload a photo or PDF. Our AI OCR vision engine automatically extracts lab test values and medication holds.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-cyan-300 text-sm">Q: Why is my Lisinopril medication on Safety Hold?</div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                When your blood potassium level is elevated (5.4 mEq/L), Lisinopril is temporarily held to prevent kidney strain until your next lab check.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-cyan-300 text-sm">Q: Can I talk to the AI in Hindi or Marathi?</div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Yes! Use the language switcher at the top right of the screen to switch to Hindi, Marathi, Tamil, Telugu, or Bengali.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-black text-cyan-300 text-sm">Q: Is my medical data private and secure?</div>
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                All patient telemetry data is encrypted end-to-end and stored securely under strict HIPAA medical privacy standards.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="border-t border-slate-700/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-slate-400">
          <span>© Since 2026 PulseCare AI Health System • All Rights Reserved.</span>
          <span>Version 2.4 • Rural Medical AI Telemetry Project</span>
        </div>
      </div>
    </div>
  );
};
