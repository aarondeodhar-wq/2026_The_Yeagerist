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
    login(selectedRole);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} flex items-center justify-center p-4 sm:p-6 font-sans transition-colors duration-300 relative`}>
      {/* Top Header Controls */}
      <header className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2.5 z-20">
        <div className="flex items-center gap-1 border border-cyan-500/40 rounded-xl px-2.5 py-1.5 bg-slate-900/60 text-xs text-cyan-300 font-bold backdrop-blur-md">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="bg-transparent text-xs font-black text-cyan-300 focus:outline-none cursor-pointer"
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
          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            isDark ? 'bg-slate-900 text-amber-300 border-slate-800' : 'bg-white text-slate-700 border-slate-200'
          }`}
          title="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Main Clean Glass Login Card (No Animations) */}
      <div className={`max-w-md w-full rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 relative overflow-hidden transition-colors ${
        isDark 
          ? 'bg-[#0b1329]/95 border-cyan-500/30 text-slate-100 shadow-cyan-950/40 backdrop-blur-2xl' 
          : 'bg-white/95 border-cyan-200 text-slate-900 shadow-xl backdrop-blur-2xl'
      }`}>
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
        </div>

        {/* Header Branding Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-md mx-auto">
            <div className={`w-full h-full ${isDark ? 'bg-[#050811]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-cyan-400 font-black text-2xl`}>
              <Activity className="w-7 h-7 text-cyan-400" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            {t('brand_title')}
          </h1>
          <p className={`text-xs font-semibold max-w-sm mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Clinical Telemetry & Real-Time Patient Record Analysis Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Persona Selector */}
          <div className="space-y-2">
            <label className={`text-xs font-black uppercase tracking-wider block text-center ${isDark ? 'text-cyan-400' : 'text-cyan-800'}`}>
              {t('select_role')}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`p-3 rounded-2xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  selectedRole === 'doctor'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-sm'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-900 font-extrabold'
                }`}
              >
                <Stethoscope className="w-4 h-4 text-cyan-400" />
                <div className="font-black text-xs">Doctor</div>
                <div className="text-[10px] font-bold text-slate-400">Dr. Sharma</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`p-3 rounded-2xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  selectedRole === 'patient'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-sm'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-900 font-extrabold'
                }`}
              >
                <User className="w-4 h-4 text-purple-400" />
                <div className="font-black text-xs">Patient</div>
                <div className="text-[10px] font-bold text-slate-400">Eleanor</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3 rounded-2xl border text-center transition-colors cursor-pointer flex flex-col items-center gap-1 ${
                  selectedRole === 'admin'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-sm'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-900 font-extrabold'
                }`}
              >
                <Shield className="w-4 h-4 text-emerald-400" />
                <div className="font-black text-xs">Admin</div>
                <div className="text-[10px] font-bold text-slate-400">Ops</div>
              </button>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-2.5">
            <div className="relative flex items-center justify-center my-2">
              <div className={`border-t w-full ${isDark ? 'border-slate-800' : 'border-slate-300'}`}></div>
              <span className={`px-3 text-[10px] uppercase font-black tracking-wider absolute ${
                isDark ? 'bg-[#0b1329] text-slate-400' : 'bg-white text-slate-600'
              }`}>
                {t('sign_in_with')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleSocialClick('Google')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                  socialProvider === 'Google'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <span className="font-black text-rose-500">G</span> Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Truecaller')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                  socialProvider === 'Truecaller'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <span className="font-black text-sky-400">T</span> Truecaller
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Facebook')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                  socialProvider === 'Facebook'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <span className="font-black text-blue-500">f</span> Facebook
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Apple ID')}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-black transition-colors cursor-pointer ${
                  socialProvider === 'Apple ID'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-900'
                }`}
              >
                <span className="font-black text-slate-900 dark:text-slate-100"></span> Apple ID
              </button>
            </div>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t('enter_dashboard')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
