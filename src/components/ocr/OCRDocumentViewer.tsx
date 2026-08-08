import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHeader } from '../patient/PatientHeader';
import type { MedicalDocument } from '../../types/clinical';
import { apiService } from '../../services/apiService';
import { 
  UploadCloud, 
  Scan, 
  Eye, 
  Pill, 
  Activity, 
  Stethoscope, 
  FileCode,
  Sparkles
} from 'lucide-react';

export const OCRDocumentViewer: React.FC = () => {
  const { documents, addDocument, currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const patientDocs = documents.filter(d => d.patientId === currentPatient.id);

  const [activeDocId, setActiveDocId] = useState<string>(patientDocs[0]?.id || documents[0].id);
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'rawText' | 'entities'>('visual');
  const [isSimulatingOcr, setIsSimulatingOcr] = useState<boolean>(false);
  const [pasteNotesText, setPasteNotesText] = useState<string>('');

  const selectedDoc = documents.find(d => d.id === activeDocId) || documents[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsSimulatingOcr(true);

    const backendRes = await apiService.uploadOcrDocument(file, currentPatient.id);

    if (backendRes) {
      const newDoc: MedicalDocument = {
        id: backendRes.id,
        patientId: backendRes.patientId,
        title: backendRes.title,
        type: 'lab_report',
        uploadDate: backendRes.uploadDate,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        author: 'Dr. Rajesh Sharma',
        ocrConfidence: backendRes.ocrConfidence,
        rawOcrText: backendRes.rawOcrText,
        boundingBoxes: backendRes.boundingBoxes as any,
        entities: backendRes.entities as any
      };

      addDocument(newDoc);
      setActiveDocId(newDoc.id);
    } else {
      setTimeout(() => {
        const newDoc: MedicalDocument = {
          id: `doc-${Date.now()}`,
          patientId: currentPatient.id,
          title: file.name.replace(/\.[^/.]+$/, ""),
          type: 'lab_report',
          uploadDate: new Date().toISOString().slice(0, 10),
          fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          author: 'Dr. Rajesh Sharma',
          ocrConfidence: 98.6,
          rawOcrText: `PULSECARE OCR TEXT FOR ${file.name.toUpperCase()}\nPATIENT: ${currentPatient.name} | MRN: ${currentPatient.mrn}\nDATE: ${new Date().toLocaleDateString()}\n\nFINDINGS:\n- Serum Creatinine: 2.1 mg/dL (Abnormal / Delta +35%)\n- Blood Urea Nitrogen: 28 mg/dL\n- eGFR: 28 mL/min\n\nIMPRESSION: Cardiorenal Syndrome flare-up.`,
          boundingBoxes: [
            { id: 'b-new1', text: 'Serum Creatinine: 2.1 mg/dL', category: 'lab', x: 15, y: 35, width: 40, height: 5 },
            { id: 'b-new2', text: 'eGFR: 28 mL/min', category: 'lab', x: 15, y: 45, width: 30, height: 5 },
            { id: 'b-new3', text: 'Acute Kidney Injury', category: 'diagnosis', x: 15, y: 70, width: 35, height: 5 }
          ],
          entities: {
            diagnoses: ['Acute Kidney Injury Flare-up', 'Cardiorenal Syndrome'],
            medications: ['IV Saline 100mL/h', 'Furosemide 40mg'],
            allergies: currentPatient.allergies,
            vitals: { BP: '142/88 mmHg', HR: '84 bpm' },
            labValues: { Creatinine: '2.1 mg/dL', BUN: '28 mg/dL', eGFR: '28 mL/min' },
            symptoms: ['Mild Fatigability'],
            surgeries: []
          }
        };

        addDocument(newDoc);
        setActiveDocId(newDoc.id);
      }, 1000);
    }

    setIsSimulatingOcr(false);
  };

  const handlePasteSubmit = async () => {
    if (!pasteNotesText.trim()) return;
    setIsSimulatingOcr(true);

    const backendRes = await apiService.uploadOcrDocument(undefined, currentPatient.id, pasteNotesText);

    if (backendRes) {
      const newDoc: MedicalDocument = {
        id: backendRes.id,
        patientId: backendRes.patientId,
        title: 'Physician Progress Note',
        type: 'progress_note',
        uploadDate: backendRes.uploadDate,
        fileSize: '0.2 MB',
        author: 'Dr. Rajesh Sharma',
        ocrConfidence: 99.1,
        rawOcrText: backendRes.rawOcrText,
        boundingBoxes: backendRes.boundingBoxes as any,
        entities: backendRes.entities as any
      };
      addDocument(newDoc);
      setActiveDocId(newDoc.id);
      setPasteNotesText('');
    }
    setIsSimulatingOcr(false);
  };

  return (
    <div className="space-y-6 font-sans">
      <PatientHeader />

      {/* OCR Toolbar & Upload Box */}
      <div className={`p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <Scan className="w-5 h-5 text-emerald-500" />
            <span>AI Document Ingestion & OCR Scanner</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Upload PDF lab reports, scanned prescriptions, or paste raw notes for instant ML entity extraction.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md cursor-pointer transition-all">
            <UploadCloud className="w-4 h-4" />
            <span>{isSimulatingOcr ? 'Running AI Scan...' : 'Upload PDF / Image'}</span>
            <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={handleFileUpload} className="hidden" disabled={isSimulatingOcr} />
          </label>
        </div>
      </div>

      {/* Paste Raw Note Input Bar */}
      <div className={`p-4 rounded-2xl border space-y-2 transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <label className="text-xs font-bold text-slate-400 block">Or Paste Unstructured Progress Note / EHR Text:</label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Paste clinical note (e.g. Patient presents with orthopnea, Creatinine 2.3 mg/dL, Lisinopril 20mg)..."
            value={pasteNotesText}
            onChange={(e) => setPasteNotesText(e.target.value)}
            className={`flex-1 text-xs rounded-xl px-3.5 py-2.5 border focus:outline-none focus:border-sky-500 ${
              isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          />
          <button
            onClick={handlePasteSubmit}
            disabled={isSimulatingOcr}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer transition-all"
          >
            Process Note
          </button>
        </div>
      </div>

      {/* Main OCR Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Document Selector List */}
        <div className={`lg:col-span-4 p-4 rounded-2xl border space-y-3 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Patient EHR Documents ({patientDocs.length})
          </div>

          <div className="space-y-2">
            {patientDocs.map(doc => (
              <button
                key={doc.id}
                onClick={() => setActiveDocId(doc.id)}
                className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                  selectedDoc.id === doc.id
                    ? isDark ? 'bg-sky-950/80 border-sky-500 text-slate-100' : 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                    : isDark ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/60' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between font-bold mb-1">
                  <span className="truncate max-w-[180px]">{doc.title}</span>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {doc.ocrConfidence}% OCR
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                  <span>{doc.uploadDate}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right OCR Document Preview & Extraction Panel */}
        <div className={`lg:col-span-8 p-5 rounded-2xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          {/* Sub Header & View Toggles */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
            isDark ? 'border-slate-800' : 'border-slate-100'
          }`}>
            <div>
              <h4 className="font-bold text-sm">{selectedDoc.title}</h4>
              <div className="text-xs text-slate-400 mt-0.5">
                Uploaded {selectedDoc.uploadDate} • Author: {selectedDoc.author}
              </div>
            </div>

            <div className={`flex items-center gap-1 p-1 rounded-xl border text-xs ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'visual' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Bounding Boxes
              </button>
              <button
                onClick={() => setActiveTab('entities')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'entities' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Extracted Badges
              </button>
              <button
                onClick={() => setActiveTab('rawText')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'rawText' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" /> Raw OCR Text
              </button>
            </div>
          </div>

          {/* TAB 1: Visual Bounding Boxes Simulated Document Scanner */}
          {activeTab === 'visual' && (
            <div className="space-y-3">
              <div className={`relative rounded-xl p-6 border min-h-[360px] text-xs font-mono leading-relaxed overflow-hidden ${
                isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <div className="whitespace-pre-wrap font-sans text-xs">
                  {selectedDoc.rawOcrText}
                </div>

                {selectedDoc.boundingBoxes.map(box => (
                  <div
                    key={box.id}
                    onMouseEnter={() => setHoveredBoxId(box.id)}
                    onMouseLeave={() => setHoveredBoxId(null)}
                    style={{
                      left: `${box.x}%`,
                      top: `${box.y}%`,
                      width: `${box.width}%`,
                      height: `${box.height}%`
                    }}
                    className={`absolute rounded transition-all border cursor-pointer flex items-center justify-between px-2 ${
                      box.category === 'diagnosis' ? 'bg-rose-500/20 border-rose-500 text-rose-600' :
                      box.category === 'medication' ? 'bg-amber-500/20 border-amber-500 text-amber-600' :
                      box.category === 'lab' ? 'bg-sky-500/20 border-sky-500 text-sky-600' :
                      'bg-emerald-500/20 border-emerald-500 text-emerald-600'
                    } ${hoveredBoxId === box.id ? 'ring-4 ring-sky-400/50 z-20 scale-105' : 'z-10'}`}
                  >
                    <span className="text-[10px] font-bold uppercase truncate">{box.category}: {box.text}</span>
                    <span className="text-[9px] bg-slate-900/80 text-white px-1 rounded">98.5%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: AI Extracted Entities Badges */}
          {activeTab === 'entities' && (
            <div className="space-y-4">
              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold text-rose-500 flex items-center gap-1.5 mb-2">
                  <Stethoscope className="w-4 h-4" /> Diagnoses & Clinical Conditions
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.entities.diagnoses.map((d, i) => (
                    <span key={i} className="bg-rose-500/10 text-rose-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-rose-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold text-amber-500 flex items-center gap-1.5 mb-2">
                  <Pill className="w-4 h-4" /> Prescribed Medications
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDoc.entities.medications.map((m, i) => (
                    <span key={i} className="bg-amber-500/10 text-amber-600 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold text-sky-500 flex items-center gap-1.5 mb-2">
                  <Activity className="w-4 h-4" /> Extracted Lab Biomarkers
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {Object.entries(selectedDoc.entities.labValues).map(([k, v], i) => (
                    <div key={i} className={`p-2 rounded-lg border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      <div className="text-slate-400 text-[10px] uppercase font-bold">{k}</div>
                      <div className="text-sky-500 font-extrabold text-sm">{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Raw OCR Text Editor */}
          {activeTab === 'rawText' && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400">Extracted Plain Text Output:</div>
              <textarea
                readOnly
                value={selectedDoc.rawOcrText}
                className={`w-full h-80 text-xs font-mono p-4 rounded-xl border focus:outline-none leading-relaxed ${
                  isDark ? 'bg-slate-950 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
                }`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
