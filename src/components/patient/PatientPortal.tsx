import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../context/LanguageContext';
import { OCRUploadModal } from '../ocr/OCRUploadModal';
import { AIChatPopupModal } from '../rag/AIChatPopupModal';
import { 
  Heart, 
  Pill, 
  Bot, 
  AlertTriangle, 
  Download,
  ShieldCheck,
  Globe,
  Play,
  Activity,
  FileText,
  Clock
} from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const { currentPatient, setIsPrintModalOpen, theme, setActiveTab } = useApp();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const [isScanModalOpen, setIsScanModalOpen] = useState<boolean>(false);
  const [isAIChatPopupOpen, setIsAIChatPopupOpen] = useState<boolean>(false);

  return (
    <div className="space-y-6 sm:space-y-8 font-sans pb-24 lg:pb-16 animate-fade-in">
      {/* PATIENT PROFILE HEADER CARD (HIGH CONTRAST & RESPONSIVE MOBILE FIX) */}
      <div className={`rounded-3xl p-5 sm:p-8 border shadow-xl transition-all ${
        isDark 
          ? 'bg-[#0c182c]/95 border-cyan-500/30 text-white backdrop-blur-2xl' 
          : 'bg-white border-cyan-200 text-slate-900 shadow-xl backdrop-blur-2xl'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-lg shadow-cyan-500/20 shrink-0">
              <div className={`w-full h-full ${isDark ? 'bg-[#050811]' : 'bg-white'} rounded-[14px] flex items-center justify-center text-cyan-400 font-black text-2xl`}>
                <Heart className="w-7 h-7 text-rose-500 fill-current" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {currentPatient.name}
                </h1>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-500 border border-cyan-400/30 px-2.5 py-0.5 rounded-full font-black uppercase">
                  Patient Portal
                </span>
              </div>

              {/* CRISP HIGH-CONTRAST LABELS FOR MOBILE READABILITY */}
              <div className={`text-xs font-bold mt-1 space-y-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <div>MRN: <strong className={isDark ? 'text-white' : 'text-slate-950'}>{currentPatient.mrn}</strong> • Room: <strong className={isDark ? 'text-white' : 'text-slate-950'}>Ward 4 Bed 04</strong></div>
                <div>Attending Doctor: <strong className="text-cyan-500">{currentPatient.attendingPhysician}</strong></div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{t('download_summary')}</span>
          </button>
        </div>
      </div>

      {/* HERO HERO CONTAINER */}
      <div className={`rounded-3xl p-5 sm:p-8 border shadow-xl relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-[#0c182c]/90 to-[#070e1c]/95 border-cyan-500/20 text-white backdrop-blur-2xl' 
          : 'bg-white border-slate-300 text-slate-900 shadow-lg backdrop-blur-xl'
      }`}>
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-6">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            {t('hero_title')}
          </h2>
          <p className={`text-xs sm:text-sm font-bold leading-relaxed max-w-xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            {t('hero_subtitle')}
          </p>

          {/* Action Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-3">
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-5 py-3 rounded-xl shadow-md cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>{t('scan_report')}</span>
            </button>

            <button
              onClick={() => setIsAIChatPopupOpen(true)}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 text-xs font-black px-5 py-3 rounded-xl border transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 text-slate-200 border-cyan-900/50' : 'bg-slate-100 text-slate-900 border-slate-300'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>{t('ask_ai')}</span>
            </button>
          </div>
        </div>

        {/* 4 Bottom Telemetry Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122] border-cyan-900/40 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 shadow-sm'
          }`}>
            <Heart className="w-4 h-4 text-rose-500 mb-1" />
            <div className="text-lg sm:text-xl font-black">{currentPatient.riskScore}/100</div>
            <div className={`text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{t('health_score')}</div>
          </div>

          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122] border-cyan-900/40 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 shadow-sm'
          }`}>
            <Pill className="w-4 h-4 text-amber-500 mb-1" />
            <div className="text-lg sm:text-xl font-black">{currentPatient.activeMedications.length} Active</div>
            <div className={`text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{t('my_medications')}</div>
          </div>

          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122] border-cyan-900/40 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 shadow-sm'
          }`}>
            <Activity className="w-4 h-4 text-cyan-400 mb-1" />
            <div className="text-lg sm:text-xl font-black">ICU Bed 04</div>
            <div className={`text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Telemetry Room</div>
          </div>

          <div className={`p-3.5 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122] border-cyan-900/40 text-white' : 'bg-slate-50 border-slate-300 text-slate-950 shadow-sm'
          }`}>
            <FileText className="w-4 h-4 text-teal-400 mb-1" />
            <div className="text-lg sm:text-xl font-black">1 Hold</div>
            <div className={`text-[10px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{t('med_hold_alert')}</div>
          </div>
        </div>
      </div>

      {/* QUICK PATIENT ACTION CARDS FOR MOBILE READABILITY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          onClick={() => setIsAIChatPopupOpen(true)}
          className={`p-5 rounded-3xl border cursor-pointer transition-all flex items-center gap-4 ${
            isDark 
              ? 'bg-[#0c182c] border-cyan-900/40 text-white hover:border-cyan-400' 
              : 'bg-white border-slate-300 text-slate-950 shadow-md hover:border-cyan-500'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-950'}`}>
              Ask Clinical AI Assistant
            </h3>
            <p className={`text-xs font-bold mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Get instant answers grounded in your health records
            </p>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('timeline')}
          className={`p-5 rounded-3xl border cursor-pointer transition-all flex items-center gap-4 ${
            isDark 
              ? 'bg-[#0c182c] border-cyan-900/40 text-white hover:border-cyan-400' 
              : 'bg-white border-slate-300 text-slate-950 shadow-md hover:border-cyan-500'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`font-black text-sm ${isDark ? 'text-white' : 'text-slate-950'}`}>
              View Medical Timeline
            </h3>
            <p className={`text-xs font-bold mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Chronological history of lab tests & consultations
            </p>
          </div>
        </div>
      </div>

      {/* PATIENT CARE FOCUS & MEDICATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Primary Care Focus */}
        <div className={`p-6 rounded-3xl border space-y-3 ${
          isDark ? 'bg-[#0c182c] border-cyan-900/30 text-white' : 'bg-white border-slate-300 text-slate-950 shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              <Heart className="w-4 h-4 text-rose-500" /> {t('care_focus')}
            </span>
            <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/30 px-2.5 py-0.5 rounded-full font-black">
              {t('icu_telemetry')}
            </span>
          </div>
          <div className={`text-base font-black leading-snug ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {currentPatient.primaryDiagnosis}
          </div>
          <p className={`text-xs font-bold leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Attending physician <strong className="text-cyan-500 font-extrabold">{currentPatient.attendingPhysician}</strong> is actively managing fluid balance and kidney clearance.
          </p>
        </div>

        {/* Active Medications & Hold Explanation */}
        <div className={`p-6 rounded-3xl border space-y-3 ${
          isDark ? 'bg-[#0c182c] border-cyan-900/30 text-white' : 'bg-white border-slate-300 text-slate-950 shadow-md'
        }`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
              <Pill className="w-4 h-4 text-amber-500" /> {t('my_medications')} ({currentPatient.activeMedications.length})
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {currentPatient.activeMedications.map((med, idx) => {
              const isHeld = med.toLowerCase().includes('hold');
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between font-bold ${
                    isHeld 
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300 font-black' 
                      : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-100' : 'bg-slate-100 border-slate-300 text-slate-950'
                  }`}
                >
                  <span>{med}</span>
                  {isHeld ? (
                    <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase">
                      Hold
                    </span>
                  ) : (
                    <span className="text-[9px] text-emerald-500 font-black flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Active
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
            isDark ? 'bg-slate-950 border-amber-500/40 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950 font-bold'
          }`}>
            <div className="font-black flex items-center gap-1 text-xs text-amber-600">
              <AlertTriangle className="w-4 h-4" /> {t('med_hold_alert')}
            </div>
            <p className="text-xs leading-relaxed">
              {t('safety_explanation')}
            </p>
          </div>
        </div>
      </div>

      {/* FLOATING BOTTOM RIGHT AI CHATBOT TRIGGER BUTTON */}
      <button
        onClick={() => setIsAIChatPopupOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-40 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer border border-cyan-300"
      >
        <Bot className="w-4 h-4" />
        <span>{t('ask_ai')}</span>
      </button>

      {/* OCR Document Upload Modal */}
      <OCRUploadModal isOpen={isScanModalOpen} onClose={() => setIsScanModalOpen(false)} />

      {/* Floating AI Chat Assistant Popup Modal */}
      <AIChatPopupModal isOpen={isAIChatPopupOpen} onClose={() => setIsAIChatPopupOpen(false)} />
    </div>
  );
};
