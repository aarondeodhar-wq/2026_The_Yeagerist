import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHeader } from './PatientHeader';
import { OCRUploadModal } from '../ocr/OCRUploadModal';
import { MOCK_RISK_ASSESSMENTS } from '../../data/mockData';
import { HeartPulse, Stethoscope, Wind, AlertOctagon, UploadCloud, Pill, Activity } from 'lucide-react';

export const PatientDetailView: React.FC = () => {
  const { currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const riskAssessment = MOCK_RISK_ASSESSMENTS[currentPatient.id] || MOCK_RISK_ASSESSMENTS['pat-1'];

  return (
    <div className="space-y-6 font-sans">
      <PatientHeader />

      {/* Action Scanner Banner */}
      <div className={`glass-panel rounded-3xl p-5 border flex flex-col md:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-[#0c1527]/80 border-cyan-500/30' : 'bg-white/90 border-cyan-200 shadow-md'
      }`}>
        <div>
          <h2 className="text-base font-black flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            <span>{currentPatient.name} — Real-Time Telemetry & Risk Index</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingest lab reports or progress notes to trigger LLM neural extraction and update RAG vector memory.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-2xl shadow-lg cursor-pointer jiggle-hover"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload & Scan Patient Record</span>
        </button>
      </div>

      {/* 4 Organ Risk Domains Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-3xl p-4 space-y-2 jiggle-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" /> Cardiovascular
            </span>
            <span className="text-xs font-black text-rose-500">{riskAssessment.domains.cardiovascular.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.cardiovascular.score}%` }} className="bg-rose-500 h-full rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400">NT-proBNP 4,850 pg/mL (Severe Overload)</p>
        </div>

        <div className="glass-card rounded-3xl p-4 space-y-2 jiggle-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-amber-500" /> Renal Clearance
            </span>
            <span className="text-xs font-black text-amber-500">{riskAssessment.domains.renal.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.renal.score}%` }} className="bg-amber-500 h-full rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400">Creatinine +64% delta (2.3 mg/dL)</p>
        </div>

        <div className="glass-card rounded-3xl p-4 space-y-2 jiggle-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-sky-500" /> Respiratory
            </span>
            <span className="text-xs font-black text-sky-500">{riskAssessment.domains.respiratory.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.respiratory.score}%` }} className="bg-sky-500 h-full rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400">SpO2 91% on room air</p>
        </div>

        <div className="glass-card rounded-3xl p-4 space-y-2 jiggle-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-emerald-500" /> Infection / Sepsis
            </span>
            <span className="text-xs font-black text-emerald-500">{riskAssessment.domains.sepsis.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.sepsis.score}%` }} className="bg-emerald-500 h-full rounded-full"></div>
          </div>
          <p className="text-[11px] text-slate-400">Temp 37.0°C (Nominal)</p>
        </div>
      </div>

      {/* Active Prescriptions & Contraindications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-card rounded-3xl p-5 space-y-3 jiggle-hover">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="flex items-center gap-1.5 text-amber-500">
              <Pill className="w-4 h-4" /> Active Prescriptions ({currentPatient.activeMedications.length})
            </span>
          </div>
          <div className="space-y-1.5 text-xs text-slate-300">
            {currentPatient.activeMedications.map((m, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <span>{m}</span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">Verified</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-3 jiggle-hover">
          <div className="flex items-center justify-between font-bold text-xs">
            <span className="flex items-center gap-1.5 text-rose-500">
              <AlertOctagon className="w-4 h-4" /> AI Identified Drug Interactions
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs space-y-1">
            <div className="font-extrabold uppercase text-[10px]">Lisinopril 20mg + Spironolactone 25mg</div>
            <div>Dual ACEi and aldosterone inhibition reduces potassium clearance. Serum Potassium is 5.4 mEq/L (Hyperkalemia). Recommend holding Lisinopril.</div>
          </div>
        </div>
      </div>

      {/* OCR Ingestion Modal */}
      <OCRUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
