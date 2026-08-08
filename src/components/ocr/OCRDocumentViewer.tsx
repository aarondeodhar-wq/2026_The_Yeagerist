import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OCRUploadModal } from './OCRUploadModal';
import { 
  Scan, 
  FileText, 
  Sparkles, 
  UploadCloud, 
  Eye, 
  Code, 
  Layers
} from 'lucide-react';

export const OCRDocumentViewer: React.FC = () => {
  const { currentPatient, documents, theme } = useApp();
  const isDark = theme === 'dark';

  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || 'doc-101');
  const [activeViewMode, setActiveViewMode] = useState<'visual' | 'plain' | 'raw'>('visual');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const currentDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  return (
    <div className="space-y-6 font-sans pb-12">
      {/* Header Banner */}
      <div className={`p-6 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-4 ${
        isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Scan className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black">AI Image-to-Text & OCR Vision Studio</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-modal document parsing with bounding-box entity extraction & plain-English AI summaries.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-5 py-3 rounded-2xl shadow-lg cursor-pointer jiggle-hover"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload New Image / PDF</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Document Selectors List */}
        <div className="lg:col-span-4 space-y-4">
          <div className={`p-4 rounded-3xl border space-y-3 ${
            isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-2">
              <span className="text-xs font-black uppercase text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" /> EHR Documents ({documents.length})
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">FastAPI Connected</span>
            </div>

            <div className="space-y-2">
              {documents.map((doc) => {
                const isSelected = doc.id === currentDoc?.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all jiggle-hover space-y-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500/20 to-teal-400/20 border-cyan-400 text-cyan-300 shadow-md'
                        : isDark ? 'bg-[#070e1e] border-slate-800 text-slate-300 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between font-bold text-xs">
                      <span className="truncate pr-2">{doc.title}</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold shrink-0">
                        {doc.ocrConfidence}% OCR
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between">
                      <span>{doc.uploadDate} • {doc.fileSize}</span>
                      <span>Author: {doc.author}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Interactive Vision Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className={`p-6 rounded-[32px] border space-y-4 shadow-xl ${
            isDark ? 'bg-[#0c182c]/85 border-cyan-500/30 text-slate-100' : 'bg-white/95 border-cyan-200 text-slate-900'
          }`}>
            {/* Mode Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-slate-700/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-black text-sm">{currentDoc?.title}</span>
              </div>

              <div className="flex items-center gap-1 p-1 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setActiveViewMode('visual')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeViewMode === 'visual' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>OCR Vision Bounding Boxes</span>
                </button>

                <button
                  onClick={() => setActiveViewMode('plain')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeViewMode === 'plain' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Plain English AI Summary</span>
                </button>

                <button
                  onClick={() => setActiveViewMode('raw')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeViewMode === 'raw' ? 'bg-cyan-500 text-slate-950 font-black' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Raw Text</span>
                </button>
              </div>
            </div>

            {/* Mode 1: Interactive Visual Bounding Boxes Overlay */}
            {activeViewMode === 'visual' && (
              <div className="space-y-4">
                <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-6 min-h-[300px] overflow-hidden font-mono text-xs space-y-3 leading-relaxed text-slate-300">
                  <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Simulated OCR Vision Layout ({currentDoc?.ocrConfidence}% Confidence)
                    </span>
                    <span>Patient ID: {currentPatient.mrn}</span>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-cyan-500/40 bg-slate-900/60 relative group">
                    <span className="text-[9px] bg-cyan-500 text-slate-950 font-black px-1.5 py-0.5 rounded absolute -top-2.5 left-2">
                      DIAGNOSIS BOUNDING BOX
                    </span>
                    <span className="text-cyan-300 font-bold">
                      {currentDoc?.entities.diagnoses.join(' • ') || 'Acute Decompensated Heart Failure'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-rose-500/50 bg-rose-950/20 relative group">
                    <span className="text-[9px] bg-rose-500 text-white font-black px-1.5 py-0.5 rounded absolute -top-2.5 left-2">
                      CRITICAL LAB DELTA BOUNDING BOX
                    </span>
                    <span className="text-rose-300 font-bold">
                      {Object.entries(currentDoc?.entities.labValues || {}).map(([k, v]) => `${k}: ${v}`).join(' | ') || 'Creatinine 2.3 mg/dL (+64% delta)'}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl border border-dashed border-amber-500/50 bg-amber-950/20 relative group">
                    <span className="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded absolute -top-2.5 left-2">
                      PRESCRIPTION BOUNDING BOX
                    </span>
                    <span className="text-amber-300 font-bold">
                      {currentDoc?.entities.medications.join(' • ') || 'IV Furosemide 40mg BID, Hold Lisinopril 20mg'}
                    </span>
                  </div>
                </div>

                {/* Extracted Entities Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-cyan-400 block">Extracted Diagnoses:</span>
                    <div className="font-semibold text-slate-200">
                      {currentDoc?.entities.diagnoses.join(', ') || 'Cardiorenal Syndrome Type 1'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-400 block">Extracted Prescriptions:</span>
                    <div className="font-semibold text-slate-200">
                      {currentDoc?.entities.medications.join(', ') || 'IV Furosemide 40mg BID'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 2: Plain English AI Summary */}
            {activeViewMode === 'plain' && (
              <div className="p-6 rounded-2xl bg-slate-950 border border-cyan-500/30 text-xs text-slate-200 space-y-4 leading-relaxed">
                <div className="flex items-center gap-2 text-cyan-400 font-black text-sm border-b border-slate-800 pb-2">
                  <Sparkles className="w-4 h-4" /> AI Medical Summary for {currentPatient.name}
                </div>
                <p>
                  This medical document reports that <strong>{currentPatient.name}</strong> is experiencing acute fluid overload associated with heart failure and a temporary decline in kidney filtration capacity.
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <span className="text-cyan-300 font-bold block">Key Patient Highlights:</span>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300">
                    <li>Serum Creatinine increased to 2.3 mg/dL (+64% acute increase).</li>
                    <li>Lisinopril 20mg is placed on hold to protect renal function.</li>
                    <li>IV Furosemide diuretic therapy has been initiated to relieve congestion.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Mode 3: Raw Text */}
            {activeViewMode === 'raw' && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-[350px] overflow-y-auto">
                {currentDoc?.rawOcrText}
              </div>
            )}
          </div>
        </div>
      </div>

      <OCRUploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} />
    </div>
  );
};
