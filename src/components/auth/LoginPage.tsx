import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import type { UserRole } from '../../types/clinical';
import { 
  Activity, 
  Stethoscope, 
  User, 
  Shield, 
  ArrowRight, 
  Sun, 
  Moon,
  FileCheck2,
  BrainCircuit,
  Database,
  Lock,
  Globe
} from 'lucide-react';
import type { LanguageCode } from '../../context/LanguageContext';

export const LoginPage: React.FC = () => {
  const { login, theme, toggleTheme } = useApp();
  const { language, setLanguage, t } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('doctor');
  const [socialProvider, setSocialProvider] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  const handleSocialClick = (provider: string) => {
    setSocialProvider(provider);
    setTimeout(() => {
      login(selectedRole);
    }, 600);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'dark-gradient-bg text-white' : 'light-gradient-bg text-slate-900'} flex flex-col justify-between p-4 sm:p-8 font-sans transition-colors duration-500`}>
      {/* Top Header Bar */}
      <header className="max-w-7xl mx-auto w-full flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 to-amber-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className={`w-full h-full ${isDark ? 'bg-[#03140e]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-emerald-400 font-black text-xl`}>
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="font-black text-lg tracking-tight block leading-none">{t('brand_title')}</span>
            <span className="text-[10px] text-amber-200 font-bold">Clinical & Patient Health System</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Multi-Language Dropdown */}
          <div className="flex items-center gap-1 border border-emerald-700/60 rounded-xl px-2 py-1 bg-emerald-950/60 text-xs text-amber-200 font-bold">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-xs font-black text-amber-200 focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="hi" className="bg-slate-900 text-white">हिंदी (Hindi)</option>
              <option value="mr" className="bg-slate-900 text-white">मराठी (Marathi)</option>
              <option value="ta" className="bg-slate-900 text-white">தமிழ் (Tamil)</option>
              <option value="te" className="bg-slate-900 text-white">తెలుగు (Telugu)</option>
              <option value="bn" className="bg-slate-900 text-white">বাংলা (Bengali)</option>
            </select>
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2.5 rounded-2xl border transition-all cursor-pointer ${
              isDark ? 'bg-[#04221b] text-amber-300 border-amber-500/40' : 'bg-white text-emerald-800 border-emerald-200'
            }`}
            title="Toggle Day / Night Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Full-Page Hero Portal */}
      <main className="max-w-7xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Platform Features & Info */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-1.5 rounded-full text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Next-Gen Medical Telemetry & Decision Support</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-amber-200 bg-clip-text text-transparent">
            {t('hero_title')}
          </h1>

          <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${isDark ? 'text-amber-100' : 'text-emerald-950 font-medium'}`}>
            {t('hero_subtitle')} Seamlessly integrating OCR vision parsing, scikit-learn risk prediction models, real-time lab delta tracking, and RAG vector store memory.
          </p>

          {/* 3 Key Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#04221b]/90 border-emerald-800/40 text-white' : 'bg-white/90 border-emerald-200 shadow-sm'
            }`}>
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <div className="font-extrabold text-xs text-white">OCR Document Vision</div>
              <div className="text-[11px] text-amber-200 font-medium">Extracts lab values & diagnoses from raw PDFs</div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#04221b]/90 border-emerald-800/40 text-white' : 'bg-white/90 border-emerald-200 shadow-sm'
            }`}>
              <BrainCircuit className="w-5 h-5 text-teal-400" />
              <div className="font-extrabold text-xs text-white">Organ Failure Risk AI</div>
              <div className="text-[11px] text-amber-200 font-medium">Cardiorenal & Sepsis early warning alerts</div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-[#04221b]/90 border-emerald-800/40 text-white' : 'bg-white/90 border-emerald-200 shadow-sm'
            }`}>
              <Database className="w-5 h-5 text-amber-400" />
              <div className="font-extrabold text-xs text-white">FastAPI RAG Index</div>
              <div className="text-[11px] text-amber-200 font-medium">Vector search over patient longitudinal EHR</div>
            </div>
          </div>
        </div>

        {/* Right Column: Full-Page Authentication Box */}
        <div className="lg:col-span-5 w-full">
          <div className={`rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 transition-all ${
            isDark 
              ? 'bg-[#04221b]/95 border-amber-500/30 text-white shadow-emerald-950/60 backdrop-blur-2xl' 
              : 'bg-white/95 border-emerald-200 text-slate-900 shadow-emerald-100 backdrop-blur-2xl'
          }`}>
            <div className="flex items-center justify-between border-b border-emerald-800/40 pb-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span className="font-black text-sm uppercase tracking-wider text-white">Access Clinical Portal</span>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold border border-emerald-500/20">
                Secure Session
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Persona Selector */}
              <div className="space-y-2">
                <label className={`text-xs font-black uppercase tracking-wider block ${isDark ? 'text-amber-300' : 'text-emerald-800'}`}>
                  Select Role Persona:
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('doctor')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedRole === 'doctor'
                        ? 'bg-gradient-to-tr from-emerald-500/30 to-amber-500/30 border-amber-400 text-amber-200 font-black shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:border-emerald-300'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 text-emerald-400" />
                    <div className="font-black text-xs text-white">Doctor</div>
                    <div className="text-[9px] font-semibold text-amber-200">Dr. Sharma</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('patient')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedRole === 'patient'
                        ? 'bg-gradient-to-tr from-emerald-500/30 to-amber-500/30 border-amber-400 text-amber-200 font-black shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:border-emerald-300'
                    }`}
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <div className="font-black text-xs text-white">Patient</div>
                    <div className="text-[9px] font-semibold text-amber-200">Eleanor</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRole('admin')}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      selectedRole === 'admin'
                        ? 'bg-gradient-to-tr from-emerald-500/30 to-amber-500/30 border-amber-400 text-amber-200 font-black shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-emerald-50 border-emerald-200 text-emerald-900 hover:border-emerald-300'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-teal-400" />
                    <div className="font-black text-xs text-white">Admin</div>
                    <div className="text-[9px] font-semibold text-amber-200">Operations</div>
                  </button>
                </div>
              </div>

              {/* Social Logins */}
              <div className="space-y-2.5">
                <div className="relative flex items-center justify-center my-2">
                  <div className={`border-t w-full ${isDark ? 'border-emerald-800' : 'border-emerald-200'}`}></div>
                  <span className={`px-3 text-[10px] uppercase font-black tracking-wider absolute ${
                    isDark ? 'bg-[#04221b] text-amber-200' : 'bg-white text-emerald-800'
                  }`}>
                    or sign in with
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSocialClick('Google')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      socialProvider === 'Google'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-black text-rose-500">G</span> Google
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialClick('Truecaller')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      socialProvider === 'Truecaller'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-black text-sky-400">T</span> Truecaller
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialClick('Facebook')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      socialProvider === 'Facebook'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-black text-blue-500">f</span> Facebook
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialClick('Apple ID')}
                    className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                      socialProvider === 'Apple ID'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md'
                        : isDark ? 'bg-[#03140e] border-emerald-900 text-white hover:border-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-black text-slate-100"></span> Apple ID
                  </button>
                </div>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-amber-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Enter Clinical Decision Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto w-full text-center py-2 text-xs text-amber-200 border-t border-emerald-800/40 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 PulseCare AI Decision Support System</span>
        <span>FastAPI Python Engine • PyPDF OCR • RAG Vector Memory</span>
      </footer>
    </div>
  );
};
