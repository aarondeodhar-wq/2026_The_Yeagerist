import React from 'react';
import { useApp, type NavigationTab } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, 
  Clock, 
  FileSearch, 
  TrendingUp, 
  ShieldAlert, 
  Bot, 
  Database
} from 'lucide-react';

export const FloatingRightSidebar: React.FC = () => {
  const { activeTab, setActiveTab, theme, currentUser } = useApp();
  const { t } = useLanguage();

  const isDark = theme === 'dark';
  const isPatient = currentUser?.role === 'patient';

  const NAV_LINKS: { id: NavigationTab; label: string; icon: React.ReactNode }[] = isPatient 
    ? [
        { id: 'dashboard', label: t('patient_portal'), icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'rag', label: t('ask_ai'), icon: <Bot className="w-4 h-4" /> },
        { id: 'ocr', label: t('scan_report'), icon: <FileSearch className="w-4 h-4" /> },
        { id: 'trends', label: t('my_medications'), icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'risk', label: 'Safety Holds', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 'analytics', label: t('faq_title'), icon: <Database className="w-4 h-4" /> },
      ]
    : [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'timeline', label: 'EHR Timeline', icon: <Clock className="w-4 h-4" /> },
        { id: 'ocr', label: 'OCR Vision', icon: <FileSearch className="w-4 h-4" /> },
        { id: 'trends', label: 'Predictive', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'risk', label: 'Risk Matrix', icon: <ShieldAlert className="w-4 h-4" /> },
        { id: 'rag', label: 'Ask AI', icon: <Bot className="w-4 h-4" /> },
        { id: 'analytics', label: 'Datasets & FAQs', icon: <Database className="w-4 h-4" /> },
      ];

  return (
    <aside
      className={`fixed right-6 top-24 z-30 w-56 sm:w-60 rounded-3xl p-5 shadow-2xl transition-all duration-300 hidden lg:block jiggle-hover ${
        isDark 
          ? 'bg-[#0c182c]/95 border border-cyan-500/30 text-white backdrop-blur-2xl shadow-cyan-950/50' 
          : 'bg-white/95 border border-cyan-200 text-slate-900 backdrop-blur-2xl shadow-sky-100'
      }`}
    >
      <div className="space-y-4 w-full">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
          <span className="text-xs uppercase font-black tracking-wider text-cyan-400">NAVIGATION</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
        </div>

        {/* Navigation Items */}
        <div className="space-y-2 w-full">
          {NAV_LINKS.map(link => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`w-full text-left px-3.5 py-3 rounded-2xl text-xs font-black flex items-center gap-3 transition-all cursor-pointer jiggle-hover ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-lg shadow-cyan-500/25'
                    : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/80' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <span className={`shrink-0 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`}>
                  {link.icon}
                </span>
                <span className="truncate">{link.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
