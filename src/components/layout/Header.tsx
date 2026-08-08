import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage, type LanguageCode } from '../../context/LanguageContext';
import { PatientProfileModal } from '../patient/PatientProfileModal';
import type { UserRole } from '../../types/clinical';
import { 
  Activity, 
  Sun, 
  Moon, 
  Printer, 
  LogOut,
  HelpCircle,
  Globe,
  UserCheck,
  Stethoscope,
  User,
  Shield,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onOpenTutorial?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTutorial }) => {
  const { 
    currentUser, 
    login,
    logout, 
    theme, 
    toggleTheme, 
    setIsPrintModalOpen,
    activeTab,
    setActiveTab,
    currentPatient
  } = useApp();

  const { language, setLanguage, t } = useLanguage();
  const isDark = theme === 'dark';
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isPersonaMenuOpen, setIsPersonaMenuOpen] = useState<boolean>(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // Close persona dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsPersonaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) return null;

  const handleSwitchPersona = (role: UserRole) => {
    login(role);
    setIsPersonaMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full font-sans transition-colors duration-300">
      {/* Top Reference Telemetry Relay Bar */}
      <div className={`text-[11px] py-1 px-4 sm:px-8 font-mono flex items-center justify-between border-b ${
        isDark 
          ? 'bg-[#030712] border-cyan-900/40 text-cyan-400' 
          : 'bg-slate-900 text-cyan-300 border-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Patient Telemetry Relay: Active
          </span>
          <span className="hidden md:inline text-slate-400">• Cardiology ICU • Ward 4 Bed 04</span>
          <span className="hidden lg:inline text-slate-400">• 14 Patient Nodes Active</span>
        </div>

        <div className="flex items-center gap-4 font-bold">
          <span className="text-amber-400">14 Alerts Monitored Today</span>
          <span className="hidden sm:inline text-emerald-400">Vector Index: Active ✓</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className={`px-4 sm:px-8 py-3 border-b flex items-center justify-between backdrop-blur-2xl ${
        isDark 
          ? 'bg-[#060c18]/95 border-cyan-900/30 text-white shadow-lg shadow-cyan-950/20' 
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
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

        {/* Center: Desktop Navigation Pills */}
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

        {/* Right: Language Dropdown, Tutorial, Theme Toggle, Switch Persona & Sign Out */}
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

          {/* User Profile & Persona Switcher (REF-BASED Z-60 POPUP OVERLAY FIX) */}
          <div className="relative flex items-center gap-2 pl-2 border-l border-slate-700/40" ref={menuRef}>
            <button
              onClick={() => setIsPersonaMenuOpen(!isPersonaMenuOpen)}
              className="flex items-center gap-2 cursor-pointer group"
              title="Switch Persona / Edit Details"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-black text-slate-200 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <span>{currentPatient.name}</span>
                  <ChevronDown className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[9px] text-cyan-500 font-extrabold flex items-center gap-0.5 capitalize">
                  <UserCheck className="w-3 h-3" /> {currentUser.role} Role
                </div>
              </div>
            </button>

            {/* Persona Dropdown Menu (Z-60 SO IT RENDERS OVER ALL SIDEBARS) */}
            {isPersonaMenuOpen && (
              <div className={`absolute right-0 top-12 w-52 rounded-2xl border shadow-2xl p-2 z-[60] animate-fade-in ${
                isDark ? 'bg-[#0c182c] border-slate-700 text-white shadow-black/80' : 'bg-white border-slate-300 text-slate-900 shadow-xl'
              }`}>
                <div className="text-[10px] font-black uppercase text-slate-400 px-3 py-1 border-b border-slate-700/40 mb-1">
                  SWITCH USER PERSONA
                </div>
                <button
                  onClick={() => handleSwitchPersona('doctor')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentUser.role === 'doctor' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-cyan-400" /> Dr. Sharma (Doctor)
                </button>
                <button
                  onClick={() => handleSwitchPersona('patient')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentUser.role === 'patient' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800'
                  }`}
                >
                  <User className="w-4 h-4 text-purple-400" /> Eleanor Vance (Patient)
                </button>
                <button
                  onClick={() => handleSwitchPersona('admin')}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer ${
                    currentUser.role === 'admin' ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800'
                  }`}
                >
                  <Shield className="w-4 h-4 text-emerald-400" /> Operations (Admin)
                </button>
                <div className="border-t border-slate-700/40 my-1"></div>
                <button
                  onClick={() => {
                    setIsProfileModalOpen(true);
                    setIsPersonaMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 text-cyan-400 hover:bg-cyan-500/20 transition-colors cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" /> Edit Patient EHR Details
                </button>
              </div>
            )}

            {/* Direct Sign Out Button */}
            <button
              onClick={logout}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
                isDark 
                  ? 'bg-rose-950/40 text-rose-300 border-rose-800/60 hover:bg-rose-900/60' 
                  : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
              }`}
              title="Sign Out of Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Details Profile Update Modal */}
      <PatientProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
    </header>
  );
};
