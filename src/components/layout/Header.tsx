import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage, type LanguageCode } from '../../context/LanguageContext';
import { 
  Activity, 
  Sun, 
  Moon, 
  Printer, 
  LogOut,
  HelpCircle,
  Globe
} from 'lucide-react';

interface HeaderProps {
  onOpenTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTutorial }) => {
  const { 
    currentUser, 
    logout, 
    theme, 
    toggleTheme, 
    setIsPrintModalOpen,
    activeTab,
    setActiveTab
  } = useApp();

  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === 'dark';

  if (!currentUser) return null;

  return (
    <header className="sticky top-0 z-40 w-full font-sans transition-colors duration-300">
      {/* Clean Main Header Bar */}
      <div className={`px-4 sm:px-8 py-3.5 border-b flex items-center justify-between backdrop-blur-2xl ${
        isDark 
          ? 'bg-[#060c18]/90 border-cyan-900/30 text-white shadow-lg shadow-cyan-950/20' 
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}>
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className={`w-full h-full ${isDark ? 'bg-[#050811]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-cyan-400 font-black`}>
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-base tracking-tight leading-none group-hover:text-cyan-400 transition-colors">
                {t('brand_title')}
              </h1>
              <p className="text-[10px] text-cyan-500 font-extrabold tracking-wider">
                {currentUser.role === 'patient' ? t('patient_portal') : 'Clinical Telemetry Platform'}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Desktop Header Navigation Pills */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/40 p-1.5 rounded-full border border-cyan-900/30">
          {[
            { id: 'dashboard', label: 'Overview' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'ocr', label: 'OCR Vision' },
            { id: 'trends', label: 'Predictive' },
            { id: 'risk', label: 'Risk Matrix' },
            { id: 'rag', label: 'Ask AI' },
            { id: 'analytics', label: 'Datasets & FAQs' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Language Dropdown, Tutorial, Theme Toggle & User Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multi-Language Dropdown */}
          <div className="flex items-center gap-1 border border-cyan-500/40 rounded-2xl px-2.5 py-1.5 bg-slate-900/60 text-xs text-cyan-300 font-bold backdrop-blur-md">
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

          {/* Guided Tutorial Button */}
          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 text-cyan-300 border-cyan-900/50 hover:bg-slate-800' : 'bg-slate-100 text-cyan-800 border-slate-300 hover:bg-slate-200'
              }`}
              title="Open Village Guided Tour"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guide</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-2xl border transition-all cursor-pointer ${
              isDark ? 'bg-slate-900 text-amber-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Toggle Day / Night Mode"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Export EHR Button */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
              isDark ? 'bg-slate-900 text-slate-200 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export EHR</span>
          </button>

          {/* User Profile Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-700/40">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-md">
              <img
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
                alt={currentUser.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>

            <button
              onClick={logout}
              className={`p-2 rounded-2xl border transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 text-rose-400 border-slate-800 hover:bg-rose-950/40' : 'bg-slate-100 text-rose-600 border-slate-200 hover:bg-rose-50'
              }`}
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
