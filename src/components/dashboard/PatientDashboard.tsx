import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OCRUploadModal } from '../ocr/OCRUploadModal';
import { 
  Users, 
  ShieldAlert, 
  FileCheck2, 
  Search, 
  ChevronRight,
  Globe,
  Play,
  Activity,
  Bot
} from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const { patients, setCurrentPatientId, setActiveTab, theme } = useApp();
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const filteredPatients = patients.filter(p => {
    const matchesRisk = selectedRiskFilter === 'all' || p.riskLevel === selectedRiskFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.mrn.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.primaryDiagnosis.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  const criticalCount = patients.filter(p => p.riskLevel === 'critical').length;
  const totalCount = patients.length;

  const handleSelectPatient = (pId: string) => {
    setCurrentPatientId(pId);
    setActiveTab('timeline');
  };

  const isDark = theme === 'dark';

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* MASSIVE HERO CONTAINER matching Reference Screenshots 1 & 2 */}
      <div className={`rounded-[36px] p-6 sm:p-10 md:p-12 border relative overflow-hidden transition-all shadow-2xl ${
        isDark 
          ? 'bg-gradient-to-b from-[#0c182c]/85 to-[#070e1c]/90 border-cyan-500/20 shadow-cyan-950/40 text-slate-100' 
          : 'bg-white/85 border-white/60 shadow-sky-100 text-slate-900 backdrop-blur-xl'
      }`}>
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-gradient-to-r from-cyan-500/15 via-teal-500/15 to-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Top Real-Time System Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-400/30 px-4 py-1.5 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Real-Time Clinical Telemetry & Risk Prediction Engine</span>
          </div>
        </div>

        {/* Massive Hero Title matching Reference Screenshots 1 & 2 */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-cyan-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
            Patient Record Analysis & Clinical Monitoring Platform
          </h1>
          <p className={`text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Integrating OCR document vision, LLM neural extraction, real-time lab deltas, and RAG vector store memory into an executive clinical decision support platform.
          </p>

          {/* Action Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-full shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Globe className="w-4 h-4" />
              <span>Ingest Patient Record</span>
            </button>

            <button
              onClick={() => setActiveTab('rag')}
              className={`flex items-center gap-2 text-xs font-bold px-6 py-3.5 rounded-full border transition-all cursor-pointer ${
                isDark ? 'bg-slate-900/80 text-slate-200 border-cyan-900/50 hover:border-cyan-400' : 'bg-slate-100 text-slate-800 border-slate-300 hover:border-cyan-400'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>Launch Clinical AI Assistant</span>
            </button>
          </div>
        </div>

        {/* 4 Bottom Telemetry Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122]/90 border-cyan-900/40' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="text-cyan-400 mb-2">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black">{totalCount}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Monitored Patients</div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122]/90 border-cyan-900/40' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="text-teal-400 mb-2">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black">1,420</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Extracted Biomarkers</div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122]/90 border-cyan-900/40' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="text-rose-500 mb-2">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black">{criticalCount}</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Threat Interceptions</div>
          </div>

          <div className={`p-4 rounded-2xl border transition-all ${
            isDark ? 'bg-[#091122]/90 border-cyan-900/40' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div className="text-purple-400 mb-2">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-xl sm:text-2xl font-black">14</div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Active Vector Index</div>
          </div>
        </div>
      </div>

      {/* PATIENTS LIST & FILTER SECTION */}
      <div className="space-y-4">
        <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDark ? 'bg-[#0c182c]/80 border-cyan-900/30' : 'bg-white/90 border-slate-200 shadow-sm'
        }`}>
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by patient name, MRN, or diagnosis..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className={`w-full text-xs rounded-2xl pl-10 pr-4 py-2.5 border focus:outline-none focus:border-cyan-400 ${
                isDark ? 'bg-[#050811] text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            />
          </div>

          <div className={`flex items-center gap-1 p-1.5 rounded-2xl border text-xs overflow-x-auto max-w-full ${
            isDark ? 'bg-[#050811] border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <span className="text-slate-400 px-2 font-bold text-[11px] whitespace-nowrap">Filter:</span>
            {['all', 'critical', 'high', 'moderate', 'low'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRiskFilter(r)}
                className={`px-3 py-1.5 rounded-xl capitalize font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  selectedRiskFilter === r 
                    ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredPatients.map(patient => (
            <div
              key={patient.id}
              onClick={() => handleSelectPatient(patient.id)}
              className={`rounded-3xl p-5 sm:p-6 border cursor-pointer group space-y-4 transition-all hover:border-cyan-400/80 ${
                isDark 
                  ? 'bg-[#0c182c]/80 border-cyan-900/30 text-slate-100 shadow-xl' 
                  : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-black text-base group-hover:text-cyan-400 transition-colors">
                    {patient.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {patient.mrn} • {patient.age}y {patient.gender} • {patient.bloodType}
                  </div>
                </div>

                <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shrink-0 ${
                  patient.riskLevel === 'critical' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/30' :
                  patient.riskLevel === 'high' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' :
                  'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                }`}>
                  {patient.riskScore}/100 Risk
                </span>
              </div>

              <div className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 block mb-0.5">Diagnosis:</span>
                {patient.primaryDiagnosis}
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-cyan-400 font-extrabold">
                <span>Inspect Patient Telemetry</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Bottom Right AI Chat Assistant Button matching reference screenshot */}
      <button
        onClick={() => setActiveTab('rag')}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer border border-cyan-300 hover:scale-105 transition-transform"
      >
        <Bot className="w-4 h-4" />
        <span>Clinical AI Copilot</span>
      </button>

      {/* Ingestion Modal */}
      <OCRUploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  );
};
