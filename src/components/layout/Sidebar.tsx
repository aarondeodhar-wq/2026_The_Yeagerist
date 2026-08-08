import React from 'react';
import { useApp, type NavigationTab } from '../../context/AppContext';
import { 
  Users, 
  Activity, 
  FileText, 
  TrendingUp, 
  ShieldAlert, 
  Bot, 
  BarChart3,
  ShieldCheck
} from 'lucide-react';

interface NavItem {
  id: NavigationTab;
  label: string;
  badge?: string;
  icon: React.ElementType;
}

const SIDEBAR_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Patient Census', icon: Users },
  { id: 'timeline', label: 'EHR Timeline', icon: Activity },
  { id: 'ocr', label: 'OCR Document Vision', badge: 'FastAPI', icon: FileText },
  { id: 'trends', label: 'Vitals & Lab Trends', icon: TrendingUp },
  { id: 'risk', label: 'Organ Risk Matrix', badge: 'ML', icon: ShieldAlert },
  { id: 'rag', label: 'Ask Clinical AI', badge: 'RAG', icon: Bot },
  { id: 'analytics', label: 'Hospital Analytics', icon: BarChart3 },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, theme } = useApp();
  const isDark = theme === 'dark';

  if (currentUser.role === 'patient') {
    return null;
  }

  return (
    <>
      {/* Desktop macOS Left Navigation Sidebar */}
      <aside className={`hidden md:flex flex-col w-64 glass-panel border-r border-slate-700/30 p-4 shrink-0 transition-colors duration-300 no-print ${
        isDark ? 'bg-[#060c18]/90 text-slate-100' : 'bg-white/90 text-slate-900'
      }`}>
        <div className="space-y-6 flex-1">
          <div className="px-3 pt-2">
            <span className="text-[10px] uppercase font-black tracking-widest text-cyan-400 block">
              Navigation Menu
            </span>
          </div>

          <nav className="space-y-1.5">
            {SIDEBAR_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer jiggle-hover ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider ${
                      isActive ? 'bg-slate-950 text-cyan-300' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-colors ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black truncate">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider truncate">
              {currentUser.role} • Active Session
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile iOS Bottom App Dock */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 ${isDark ? 'bg-[#050811]/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-xl border-t px-2 py-1.5 flex items-center justify-around no-print`}>
        {SIDEBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer jiggle-hover ${
                isActive ? 'text-cyan-400 font-black scale-105' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="truncate max-w-[50px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
