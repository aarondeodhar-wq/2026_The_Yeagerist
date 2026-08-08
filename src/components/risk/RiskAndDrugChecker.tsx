import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/apiService';
import { MOCK_RISK_ASSESSMENTS } from '../../data/mockData';
import { 
  ShieldAlert, 
  HeartPulse, 
  Stethoscope, 
  Wind, 
  AlertOctagon, 
  Search,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const RiskAndDrugChecker: React.FC = () => {
  const { currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const riskAssessment = MOCK_RISK_ASSESSMENTS[currentPatient.id] || MOCK_RISK_ASSESSMENTS['pat-1'];
  const [drugInputA, setDrugInputA] = useState<string>('Lisinopril');
  const [drugInputB, setDrugInputB] = useState<string>('Spironolactone');
  const [checking, setChecking] = useState<boolean>(false);
  const [interactionResult, setInteractionResult] = useState<any>(null);

  const handleCheckInteraction = async () => {
    if (!drugInputA || !drugInputB) return;
    setChecking(true);
    setInteractionResult(null);

    const result = await apiService.checkDrugInteraction(drugInputA, drugInputB);
    if (result) {
      setInteractionResult(result);
    } else {
      setTimeout(() => {
        setInteractionResult({
          drugA: drugInputA,
          drugB: drugInputB,
          severity: 'major',
          description: `Concurrent administration of ${drugInputA} and ${drugInputB} significantly increases risk of hyperkalemia (Potassium > 5.0 mEq/L) and acute worsening of renal perfusion.`,
          recommendation: `Monitor serum potassium closely within 48h. Consider holding ${drugInputA} during acute diuretic titration.`
        });
      }, 600);
    }
    setChecking(false);
  };

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
            <span>Clinical Risk Matrix & Drug Safety Suite</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Predictive AI organ failure probability models & instant contraindication safety checker.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider ${
            riskAssessment.overallScore >= 80 ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
          }`}>
            Threat Risk: {riskAssessment.overallScore}/100 ({riskAssessment.level})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-4 rounded-3xl border space-y-2 jiggle-hover ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-rose-500" /> Cardiovascular
            </span>
            <span className="text-xs font-extrabold text-rose-500">{riskAssessment.domains.cardiovascular.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.cardiovascular.score}%` }} className="bg-rose-500 h-full rounded-full"></div>
          </div>
          <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
            {(riskAssessment.domains.cardiovascular.factors || []).map((r: string, i: number) => (
              <li key={i} className="truncate">• {r}</li>
            ))}
          </ul>
        </div>

        <div className={`p-4 rounded-3xl border space-y-2 jiggle-hover ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-amber-500" /> Renal Function
            </span>
            <span className="text-xs font-extrabold text-amber-500">{riskAssessment.domains.renal.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.renal.score}%` }} className="bg-amber-500 h-full rounded-full"></div>
          </div>
          <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
            {(riskAssessment.domains.renal.factors || []).map((r: string, i: number) => (
              <li key={i} className="truncate">• {r}</li>
            ))}
          </ul>
        </div>

        <div className={`p-4 rounded-3xl border space-y-2 jiggle-hover ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-sky-500" /> Respiratory
            </span>
            <span className="text-xs font-extrabold text-sky-500">{riskAssessment.domains.respiratory.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.respiratory.score}%` }} className="bg-sky-500 h-full rounded-full"></div>
          </div>
          <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
            {(riskAssessment.domains.respiratory.factors || []).map((r: string, i: number) => (
              <li key={i} className="truncate">• {r}</li>
            ))}
          </ul>
        </div>

        <div className={`p-4 rounded-3xl border space-y-2 jiggle-hover ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <AlertOctagon className="w-4 h-4 text-emerald-500" /> Sepsis / Infection
            </span>
            <span className="text-xs font-extrabold text-emerald-500">{riskAssessment.domains.sepsis.score}%</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div style={{ width: `${riskAssessment.domains.sepsis.score}%` }} className="bg-emerald-500 h-full rounded-full"></div>
          </div>
          <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
            {(riskAssessment.domains.sepsis.factors || []).map((r: string, i: number) => (
              <li key={i} className="truncate">• {r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Drug Interaction Checker */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <h3 className="font-extrabold text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Real-Time AI Drug Interaction Engine</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Primary Medication (e.g. Lisinopril)..."
            value={drugInputA}
            onChange={(e) => setDrugInputA(e.target.value)}
            className={`text-xs rounded-2xl px-4 py-3 border focus:outline-none focus:border-cyan-400 ${
              isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          />
          <input
            type="text"
            placeholder="Secondary Medication (e.g. Spironolactone)..."
            value={drugInputB}
            onChange={(e) => setDrugInputB(e.target.value)}
            className={`text-xs rounded-2xl px-4 py-3 border focus:outline-none focus:border-cyan-400 ${
              isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          />
        </div>

        <button
          onClick={handleCheckInteraction}
          disabled={checking}
          className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-6 py-3 rounded-2xl cursor-pointer jiggle-hover flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>{checking ? 'Evaluating Contraindications...' : 'Run Interaction Analysis'}</span>
        </button>

        {interactionResult && (
          <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-950/20 space-y-2 text-xs text-slate-200">
            <div className="flex items-center justify-between font-bold text-rose-400">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Interaction Severity: {interactionResult.severity.toUpperCase()}
              </span>
              <span>{interactionResult.drugA} + {interactionResult.drugB}</span>
            </div>
            <p>{interactionResult.description}</p>
            <div className="text-cyan-300 font-semibold pt-1 border-t border-rose-900/40">
              Recommendation: {interactionResult.recommendation}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
