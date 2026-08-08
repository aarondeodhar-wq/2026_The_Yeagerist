import React from 'react';
import { useApp, type NavigationTab } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Clock, 
  FileSearch, 
  TrendingUp, 
  ShieldAlert, 
  Bot, 
  HelpCircle
} from 'lucide-react';

export const BottomMobileNav: React.FC = () => {
  const { activeTab, setActiveTab, theme, currentUser } = useApp();
  const isDark = theme === 'dark';

  const isPatient = currentUser?.role === 'patient';

  const NAV_ITEMS: { id: NavigationTab; label: string; icon: React.ReactNode }[] = isPatient 
    ? [
        { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'rag', label: 'Ask AI', icon: <Bot className="w-5 h-5" /> },
        { id: 'ocr', label: 'OCR', icon: <FileSearch className="w-5 h-5" /> },
        { id: 'trends', label: 'Meds', icon: <TrendingUp className="w-5 h-5" /> },
        { id: 'analytics', label: 'FAQs', icon: <HelpCircle className="w-5 h-5" /> },
      ]
    : [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-5 h-5" /> },
        { id: 'timeline', label: 'Timeline', icon: <Clock className="w-5 h-5" /> },
        { id: 'ocr', label: 'OCR', icon: <FileSearch className="w-5 h-5" /> },
        { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-5 h-5" /> },
        { id: 'risk', label: 'Risk', icon: <ShieldAlert className="w-5 h-5" /> },
        { id: 'rag', label: 'Ask AI', icon: <Bot className="w-5 h-5" /> },
        { id: 'analytics', label: 'FAQs', icon: <HelpCircle className="w-5 h-5" /> },
      ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t px-2 py-2 flex items-center justify-around backdrop-blur-2xl transition-all ${
      isDark 
        ? 'bg-[#060c18]/95 border-cyan-900/40 text-white shadow-2xl' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {NAV_ITEMS.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
              isActive
                ? 'text-cyan-400 font-black scale-105'
                : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : ''}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold tracking-tight mt-0.5 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
