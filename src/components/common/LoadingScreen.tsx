import React from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Shield, Sparkles } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`fixed inset-0 z-50 ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} flex flex-col items-center justify-center space-y-6 font-sans transition-colors duration-500`}>
      {/* Bio-Luminescent DeepSea Sonar Waves */}
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 rounded-full border-2 border-cyan-400/40 sonar-circle absolute"></div>
        <div className="w-20 h-20 rounded-full border-2 border-emerald-400/50 sonar-circle absolute" style={{ animationDelay: '0.5s' }}></div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-emerald-400 p-0.5 shadow-2xl shadow-cyan-500/40 jiggle-hover">
          <div className={`w-full h-full ${isDark ? 'bg-[#070a12] text-cyan-400' : 'bg-white text-cyan-600'} rounded-[14px] flex items-center justify-center font-black text-2xl`}>
            <Shield className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 max-w-sm">
        <h2 className="text-xl font-black tracking-tight flex items-center justify-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
          <span>PULSECARE AI</span>
        </h2>
        <div className="text-xs text-cyan-400 font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Loading FastAPI Neural LLM & Vector Index...</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-56 h-2 bg-slate-900/60 rounded-full overflow-hidden border border-cyan-500/30">
        <div className="w-full h-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-teal-300 animate-pulse rounded-full"></div>
      </div>
    </div>
  );
};
