import React, { useState } from 'react';
import { useApp, type NavigationTab } from '../../context/AppContext';
import { useLanguage, type LanguageCode } from '../../context/LanguageContext';
import { GuidedTutorialModal } from '../common/GuidedTutorialModal';
import { 
  Bell, 
  Printer, 
  LogOut,
  Sun,
  Moon,
  Activity,
  Users,
  FileText,
  TrendingUp,
  ShieldAlert,
  Bot,
  BarChart3,
  Globe,
  HelpCircle
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
}

const DOCTOR_NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Overview', icon: Users },
  { id: 'timeline', label: 'Timeline', icon: Activity },
  { id: 'ocr', label: 'OCR Vision', icon: FileText },
  { id: 'trends', label: 'Predictive', icon: TrendingUp },
  { id: 'risk', label: 'Risk Matrix', icon: ShieldAlert },
  { id: 'rag', label: 'Ask AI', icon: Bot },
  { id: 'analytics', label: 'Datasets', icon: BarChart3 },
];

export const Header: React.FC = () => {
  const { 
    currentUser, 
    logout,
    activeTab,
    setActiveTab,
    setIsAlertDrawerOpen,
    setIsPrintModalOpen,
    events,
    theme,
    toggleTheme,
    isAuthenticated,
    login
  } = useApp();

  const { language, setLanguage, t } = useLanguage();
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);

  const isDark = theme === 'dark';
  const isPatient = currentUser.role === 'patient';
  const criticalCount = events.filter(e => e.severity === 'critical').length;

  return (
    <header className="sticky top-0 z-40 no-print flex flex-col font-sans">
      {/* Top Thin Telemetry Status Bar (Doctor Mode Only) */}
      {!isPatient && (
        <div className="bg-[#050811] text-[11px] font-mono py-1 px-4 sm:px-6 border-b border-cyan-950/80 flex items-center justify-between text-slate-400">
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
              Patient Telemetry Relay: Active
            </span>
            <span className="hidden md:inline">Cardiology ICU • 14 Patient Nodes</span>
            <span className="hidden lg:inline text-slate-500">pH 7.38 • Temp 37.1°C</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold">14 Alerts Monitored Today</span>
            <span className="hidden sm:inline text-cyan-400 font-bold">Vector Index: Active ✓</span>
          </div>
        </div>
      )}

      {/* Main Glass Header Navigation Bar */}
      <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between backdrop-blur-2xl transition-colors duration-300 shadow-md ${
        isDark ? 'bg-[#060c18]/90 border-slate-800/80 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className={`w-full h-full ${isDark ? 'bg-[#070a12]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-cyan-400 font-black`}>
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight leading-none">{t('brand_title')}</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 
              {isPatient ? t('patient_portal') : '14 Nodes Active'}
            </span>
          </div>
        </div>

        {/* Center Pill Navigation Bar (Doctor Mode Only) */}
        {!isPatient && (
          <nav className="hidden xl:flex items-center gap-1 p-1 bg-slate-500/10 rounded-2xl border border-slate-500/20 text-xs font-bold">
            {DOCTOR_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions & Controls */}
        <div className="flex items-center gap-2">
          {/* Multi-Language Dropdown */}
          <div className="relative flex items-center gap-1 border border-slate-700/60 rounded-xl px-2 py-1 bg-slate-900/60 text-xs text-cyan-300 font-bold">
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
          <button
            onClick={() => setIsTutorialOpen(true)}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/20 transition-all cursor-pointer"
            title="How to Use Tutorial"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>

          {/* Day / Night Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isDark ? 'bg-slate-900 text-amber-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Export EHR Button */}
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className={`hidden md:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
              isDark ? 'bg-slate-900 text-slate-200 border-slate-800' : 'bg-slate-100 text-slate-800 border-slate-200'
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export EHR</span>
          </button>

          {/* Alert Drawer Trigger (Doctor Mode Only) */}
          {isAuthenticated && !isPatient && (
            <button
              onClick={() => setIsAlertDrawerOpen(true)}
              className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <Bell className="w-4 h-4" />
              {criticalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {criticalCount}
                </span>
              )}
            </button>
          )}

          {/* Auth State Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700/40">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/50"
              />
              <button
                onClick={logout}
                className="p-1.5 text-slate-400 hover:text-rose-500 rounded-xl transition-all cursor-pointer"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => login('doctor')}
                className="text-xs font-bold px-3 py-2 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => login('doctor')}
                className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl shadow-md cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Guided Tutorial Modal */}
      <GuidedTutorialModal isOpen={isTutorialOpen} onClose={() => setIsTutorialOpen(false)} />
    </header>
  );
};
