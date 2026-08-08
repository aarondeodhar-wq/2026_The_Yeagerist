import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/apiService';
import { 
  X, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  Scan
} from 'lucide-react';

interface OCRUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OCRUploadModal: React.FC<OCRUploadModalProps> = ({ isOpen, onClose }) => {
  const { currentPatient, addDocument, theme } = useApp();
  const isDark = theme === 'dark';

  const [rawText, setRawText] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [extractedData, setExtractedData] = useState<any>(null);

  if (!isOpen) return null;

  const handleScan = async (textToScan?: string) => {
    const text = textToScan || rawText;
    if (!text.trim()) return;

    setIsScanning(true);
    setScanComplete(false);

    const result = await apiService.uploadOcrDocument(undefined, currentPatient.id, text);

    if (result) {
      setExtractedData(result);
      addDocument({
        id: `doc-${Date.now()}`,
        patientId: currentPatient.id,
        title: 'Ingested Lab Report (OCR Vision)',
        uploadDate: new Date().toISOString().split('T')[0],
        type: 'lab_report',
        fileSize: '1.4 MB',
        author: 'Dr. Rajesh Sharma',
        rawOcrText: text,
        entities: result.entities,
        ocrConfidence: result.ocrConfidence,
        boundingBoxes: result.boundingBoxes || []
      });
    }

    setIsScanning(false);
    setScanComplete(true);
  };

  const SAMPLE_PRESET_TEXT = `CARDIOLOGY & RENAL ICU PROGRESS NOTE
Patient: Eleanor Vance | MRN: DSG-90241 | Bed: ICU-04
Date: 2026-08-08
Primary Diagnosis: Decompensated Heart Failure with Acute Kidney Clearance Decline.
Vitals: BP 162/100 mmHg, HR 98 bpm, SpO2 91% on 2L NC.
Lab Values:
- Serum Creatinine: 2.3 mg/dL (Acute delta +64% increase from baseline 1.4 mg/dL)
- Serum Potassium: 5.4 mEq/L (Elevated)
- BUN: 42 mg/dL
Current Orders:
1. IV Furosemide 40mg BID
2. HOLD Lisinopril 20mg QD (Safety Hold due to elevated K+ 5.4 mEq/L)
3. Spironolactone 25mg QD`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm font-sans animate-fade-in">
      {/* Matte Container - NO neon glow or intense box-shadows */}
      <div className={`rounded-3xl p-6 sm:p-8 max-w-xl w-full border shadow-2xl space-y-6 relative overflow-hidden transition-all ${
        isDark 
          ? 'bg-slate-900 border-slate-700 text-slate-100' 
          : 'bg-white border-slate-300 text-slate-900'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
              isDark ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'bg-slate-100 text-emerald-700 border border-slate-200'
            }`}>
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-black text-base tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                OCR Medical Document Scanner
              </h3>
              <p className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Extract lab values & medication holds automatically
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:text-black hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drag and Drop Zone (Matte styling, Crisp Text) */}
        {!scanComplete ? (
          <div className="space-y-5">
            <div 
              onClick={() => {
                setRawText(SAMPLE_PRESET_TEXT);
                handleScan(SAMPLE_PRESET_TEXT);
              }}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all relative overflow-hidden group ${
                isDark 
                  ? 'border-slate-700 bg-slate-800/60 hover:border-emerald-500 hover:bg-slate-800' 
                  : 'border-slate-300 bg-slate-50 hover:border-emerald-600 hover:bg-slate-100'
              }`}
            >
              {isScanning && <div className="laser-scanner"></div>}

              <UploadCloud className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
              <h4 className={`font-extrabold text-sm mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Click to Load Sample Medical Prescription / Lab Report
              </h4>
              <p className={`text-xs font-medium max-w-sm mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                Supports PDF, PNG, JPG, or Scanned Camera Images
              </p>
            </div>

            {/* Manual Text Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>OR PASTE PHYSICIAN PROGRESS NOTE:</span>
                <button
                  type="button"
                  onClick={() => setRawText(SAMPLE_PRESET_TEXT)}
                  className="text-emerald-500 hover:underline font-extrabold text-xs"
                >
                  Fill Sample Note
                </button>
              </div>

              <textarea
                rows={4}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste physician progress notes (e.g. Creatinine 2.3 mg/dL, Lisinopril 20mg)..."
                className={`w-full text-xs rounded-xl p-3.5 border focus:outline-none focus:border-emerald-500 font-mono ${
                  isDark ? 'bg-slate-950 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-300'
                }`}
              ></textarea>
            </div>

            {/* Solid Matte Action Button */}
            <button
              onClick={() => handleScan()}
              disabled={isScanning || !rawText.trim()}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isScanning ? 'AI Engine Scanning Image...' : 'Run AI Vision Extraction'}</span>
            </button>
          </div>
        ) : (
          /* Scan Results */
          <div className="space-y-4 text-xs">
            <div className={`p-4 rounded-2xl border flex items-center gap-3 ${
              isDark ? 'bg-slate-800 border-emerald-500/40 text-slate-100' : 'bg-emerald-50 border-emerald-200 text-slate-900'
            }`}>
              <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
              <div>
                <div className="font-black text-sm">AI Extraction Successful ({extractedData?.ocrConfidence}% Confidence)</div>
                <div className="text-xs text-slate-300">Extracted lab deltas and safety holds saved to patient EHR.</div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="font-bold text-emerald-400 uppercase text-[10px]">Extracted Diagnoses:</div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{extractedData?.entities?.diagnoses?.join(', ')}</div>

              <div className="font-bold text-emerald-400 uppercase text-[10px] pt-2">Extracted Lab Deltas:</div>
              <div className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {Object.entries(extractedData?.entities?.labValues || {}).map(([k, v]) => `${k}: ${v}`).join(' | ')}
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs py-3 rounded-2xl cursor-pointer transition-all"
            >
              Done & Return to Patient Portal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
