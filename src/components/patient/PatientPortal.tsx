import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Activity, Pill, AlertCircle, FileText, Download, Bot, ShieldAlert } from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const { currentPatient, setActiveTab, setIsPrintModalOpen, theme } = useApp();

  return (
    <div className="space-y-6">
      {/* Patient Portal Header Banner */}
      <div className={`macos-panel rounded-3xl p-6 border ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'} relative overflow-hidden`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-sky-500/20">
              <Heart className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black">{currentPatient.name}</h1>
                <span className="text-xs bg-sky-500/10 text-sky-500 font-bold px-2.5 py-0.5 rounded-full border border-sky-500/20">
                  Patient Portal
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                MRN: <strong className="text-slate-200">{currentPatient.mrn}</strong> • Room: <strong className="text-slate-200">{currentPatient.roomNumber}</strong> • Doctor: <strong className="text-sky-500">{currentPatient.primaryDoctor}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-lg cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download My Medical Summary</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Primary Care Plan */}
        <div className="macos-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Primary Diagnosis</span>
            <Activity className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="text-sm font-bold">{currentPatient.primaryDiagnosis}</div>
          <div className="text-[11px] text-sky-500 font-semibold flex items-center gap-1 pt-1">
            <ShieldAlert className="w-3.5 h-3.5" /> Organ Risk Score: {currentPatient.riskScore}/100 ({currentPatient.riskLevel})
          </div>
        </div>

        {/* Card 2: Active Prescriptions */}
        <div className="macos-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Prescriptions ({currentPatient.activeMedications.length})</span>
            <Pill className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-xs text-slate-300 space-y-1">
            {currentPatient.activeMedications.slice(0, 3).map((m, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Allergies */}
        <div className="macos-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Documented Allergies</span>
            <AlertCircle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentPatient.allergies.map((a, i) => (
              <span key={i} className="bg-rose-500/10 text-rose-500 text-xs font-semibold px-2.5 py-1 rounded-lg border border-rose-500/20">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Patient Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => setActiveTab('rag')}
          className="macos-card rounded-2xl p-5 text-left flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <Bot className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <div className="font-bold text-sm group-hover:text-sky-500">Ask Clinical AI Assistant</div>
              <div className="text-xs text-slate-400">Get instant answers grounded in your health records</div>
            </div>
          </div>
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className="macos-card rounded-2xl p-5 text-left flex items-center justify-between cursor-pointer group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm group-hover:text-sky-500">View Medical Timeline</div>
              <div className="text-xs text-slate-400">Chronological history of lab tests & consultations</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
