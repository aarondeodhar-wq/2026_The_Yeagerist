import React, { useState } from 'react';
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
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-6 top-28 z-40 transition-all duration-300 ease-out shadow-2xl cursor-pointer hidden lg:block ${
        isHovered 
          ? 'w-60 rounded-3xl p-5' 
          : 'w-10 rounded-full py-5 px-1 flex flex-col items-center justify-center'
      } ${
        isDark 
          ? 'bg-[#0c182c]/95 border border-cyan-500/30 text-white backdrop-blur-2xl shadow-cyan-950/50' 
          : 'bg-white/95 border border-cyan-200 text-slate-900 backdrop-blur-2xl shadow-sky-100'
      }`}
    >
      {isHovered ? (
        /* EXPANDED HOVER STATE */
        <div className="space-y-4 w-full animate-fade-in">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
            <span className="text-[11px] uppercase font-black tracking-wider text-cyan-400">NAVIGATION</span>
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
          </div>

          <div className="space-y-1.5 w-full">
            {NAV_LINKS.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md'
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
      ) : (
        /* COLLAPSED NARROW PILL WITH SMALL DOTS matching Reference Screenshots 2 & 3 */
        <div className="flex flex-col items-center gap-3.5 w-full py-1">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping mb-1"></span>
          {NAV_LINKS.map(link => {
            const isActive = activeTab === link.id;
            return (
              <span
                key={link.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive 
                    ? 'bg-cyan-400 scale-125 shadow-sm' 
                    : isDark ? 'bg-slate-600' : 'bg-slate-400'
                }`}
                title={link.label}
              ></span>
            );
          })}
        </div>
      )}
    </aside>
  );
};
