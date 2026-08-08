import React, { useState } from 'react';
import { useApp, type NavigationTab } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';

export const FloatingRightSidebar: React.FC = () => {
  const { activeTab, setActiveTab, theme, currentUser } = useApp();
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const isDark = theme === 'dark';
  const isPatient = currentUser?.role === 'patient';

  const NAV_LINKS: { id: NavigationTab; label: string }[] = isPatient 
    ? [
        { id: 'dashboard', label: t('patient_portal') },
        { id: 'rag', label: t('ask_ai') },
        { id: 'ocr', label: t('scan_report') },
        { id: 'trends', label: t('my_medications') },
        { id: 'risk', label: 'Safety Holds' },
        { id: 'analytics', label: 'Emergency 24/7' },
      ]
    : [
        { id: 'dashboard', label: 'Overview' },
        { id: 'timeline', label: 'EHR Timeline' },
        { id: 'ocr', label: 'OCR Vision' },
        { id: 'trends', label: 'Predictive' },
        { id: 'risk', label: 'Risk Matrix' },
        { id: 'rag', label: 'Ask AI' },
        { id: 'analytics', label: 'Datasets' },
      ];

  return (
    <aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed right-6 top-28 z-40 transition-all duration-300 ease-out shadow-2xl cursor-pointer ${
        isHovered ? 'w-60 rounded-[28px] p-5' : 'w-12 rounded-full py-4 px-2 flex flex-col items-center justify-center'
      } ${
        isDark 
          ? 'bg-[#0c182c]/90 border border-cyan-500/30 text-slate-100 backdrop-blur-2xl' 
          : 'bg-white/90 border border-cyan-200 text-slate-900 backdrop-blur-2xl'
      }`}
    >
      {isHovered ? (
        /* EXPANDED HOVER STATE (Matching Screenshot 2) */
        <div className="space-y-4 w-full animate-fade-in">
          <div className="flex items-center justify-between border-b border-slate-700/30 pb-2.5">
            <span className="text-[11px] uppercase font-black tracking-wider text-slate-400">NAVIGATION</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="space-y-1.5 w-full">
            {NAV_LINKS.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`w-full text-left px-3.5 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-2.5 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md'
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-800/60' : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-slate-950' : 'bg-slate-400'}`}></span>
                  <span className="truncate">{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* COLLAPSED STATE (Matching Screenshot 1 & 3) */
        <div className="flex flex-col items-center gap-3 w-full">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mb-1"></span>
          {NAV_LINKS.map(link => {
            const isActive = activeTab === link.id;
            return (
              <span
                key={link.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  isActive 
                    ? 'bg-cyan-400 scale-125 shadow-sm shadow-cyan-400' 
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
