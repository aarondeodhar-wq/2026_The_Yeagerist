import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types/clinical';
import { Activity, Stethoscope, User, Shield, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login, theme } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('doctor');
  const [socialProvider, setSocialProvider] = useState<string | null>(null);
  const isDark = theme === 'dark';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  const handleSocialClick = (provider: string) => {
    setSocialProvider(provider);
    setTimeout(() => {
      login(selectedRole);
    }, 600);
  };

  return (
    <div className={`min-h-screen w-full ${isDark ? 'dark-gradient-bg text-slate-100' : 'light-gradient-bg text-slate-900'} flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden transition-colors duration-500`}>
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main High-Contrast Hero Login Glass Card */}
      <div className={`w-full max-w-xl rounded-[36px] p-8 sm:p-10 border shadow-2xl relative z-10 space-y-7 transition-all jiggle-hover ${
        isDark 
          ? 'bg-[#0b1329]/95 border-cyan-500/40 text-slate-100 shadow-cyan-950/60 backdrop-blur-2xl' 
          : 'bg-white/95 border-cyan-300 text-slate-900 shadow-sky-200 backdrop-blur-2xl'
      }`}>
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm"></span>
        </div>

        {/* Header Branding Logo */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-xl shadow-cyan-500/30 mx-auto jiggle-hover">
            <div className={`w-full h-full ${isDark ? 'bg-[#050811]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-cyan-400 font-black text-2xl`}>
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
          </div>

          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-200 bg-clip-text text-transparent">
            PulseCare AI
          </h1>
          <p className={`text-xs font-semibold max-w-sm mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Clinical Telemetry & Real-Time Patient Record Analysis Platform
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Persona Selector */}
          <div className="space-y-2.5">
            <label className={`text-xs font-black uppercase tracking-wider block text-center ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`}>
              Select User Persona
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('doctor')}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer jiggle-hover flex flex-col items-center gap-1.5 ${
                  selectedRole === 'doctor'
                    ? 'bg-gradient-to-tr from-cyan-500/25 to-teal-400/25 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 font-black'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Stethoscope className="w-5 h-5 text-cyan-400" />
                <div className="font-black text-xs">Doctor</div>
                <div className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Dr. Sharma</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('patient')}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer jiggle-hover flex flex-col items-center gap-1.5 ${
                  selectedRole === 'patient'
                    ? 'bg-gradient-to-tr from-cyan-500/25 to-teal-400/25 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 font-black'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <User className="w-5 h-5 text-purple-400" />
                <div className="font-black text-xs">Patient</div>
                <div className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Eleanor Vance</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer jiggle-hover flex flex-col items-center gap-1.5 ${
                  selectedRole === 'admin'
                    ? 'bg-gradient-to-tr from-cyan-500/25 to-teal-400/25 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 font-black'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <Shield className="w-5 h-5 text-emerald-400" />
                <div className="font-black text-xs">Admin</div>
                <div className={`text-[10px] font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Operations</div>
              </button>
            </div>
          </div>

          {/* Social Logins */}
          <div className="space-y-3">
            <div className="relative flex items-center justify-center my-3">
              <div className={`border-t w-full ${isDark ? 'border-slate-800' : 'border-slate-200'}`}></div>
              <span className={`px-3 text-[10px] uppercase font-black tracking-wider absolute ${
                isDark ? 'bg-[#0b1329] text-slate-400' : 'bg-white text-slate-500'
              }`}>
                or sign in with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialClick('Google')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer jiggle-hover ${
                  socialProvider === 'Google'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-rose-500 text-sm">G</span> Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Truecaller')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer jiggle-hover ${
                  socialProvider === 'Truecaller'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-sky-400 text-sm">T</span> Truecaller
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Facebook')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer jiggle-hover ${
                  socialProvider === 'Facebook'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-blue-500 text-sm">f</span> Facebook
              </button>

              <button
                type="button"
                onClick={() => handleSocialClick('Apple ID')}
                className={`flex items-center justify-center gap-2.5 p-3 rounded-2xl border text-xs font-extrabold transition-all cursor-pointer jiggle-hover ${
                  socialProvider === 'Apple ID'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-md'
                    : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-200 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                }`}
              >
                <span className="font-black text-slate-100 text-sm"></span> Apple ID
              </button>
            </div>
          </div>

          {/* Primary Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 text-slate-950 font-black text-xs sm:text-sm py-4 rounded-2xl shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer jiggle-hover transition-transform"
          >
            <span>Continue to Clinical Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
