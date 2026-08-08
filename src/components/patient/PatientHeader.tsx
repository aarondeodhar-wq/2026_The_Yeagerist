import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText } from 'lucide-react';

export const PatientHeader: React.FC = () => {
  const { currentPatient, setActiveTab, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-2xl p-4 mb-5 border transition-all no-print ${
      isDark ? 'bg-slate-900/90 border-slate-800 shadow-md' : 'bg-white border-slate-200 shadow-sm'
    }`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Patient Bio */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center font-black text-lg ${
            isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}>
            {currentPatient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{currentPatient.name}</h2>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}>
                {currentPatient.mrn}
              </span>
              <span className="text-[11px] bg-sky-500/10 text-sky-500 font-bold px-2 py-0.5 rounded border border-sky-500/20">
                {currentPatient.roomNumber}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {currentPatient.age}y {currentPatient.gender} • Blood: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{currentPatient.bloodType}</strong> • {currentPatient.department} ({currentPatient.primaryDoctor})
            </div>
          </div>
        </div>

        {/* Action Pills & Risk Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className={`text-xs px-2.5 py-1 rounded-full font-black uppercase tracking-wider ${
              currentPatient.riskScore >= 80 ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
              currentPatient.riskScore >= 60 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
              'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
            }`}>
              Risk: {currentPatient.riskScore}/100
            </span>
          </div>

          <button
            onClick={() => setActiveTab('ocr')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isDark ? 'bg-slate-800 text-sky-400 border-slate-700 hover:bg-slate-700' : 'bg-slate-100 text-sky-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>OCR Docs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
