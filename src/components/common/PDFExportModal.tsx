import React from 'react';
import { useApp } from '../../context/AppContext';
import { Printer, X } from 'lucide-react';

export const PDFExportModal: React.FC = () => {
  const { isPrintModalOpen, setIsPrintModalOpen, currentPatient, events } = useApp();

  if (!isPrintModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const patientEvents = events.filter(e => e.patientId === currentPatient.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Controls Header (Hidden in Print) */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-sky-400" />
            <h3 className="font-bold text-slate-100 text-base">Generate EHR Clinical Handoff Brief</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-lg cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" /> Print / Save as PDF
            </button>
            <button
              onClick={() => setIsPrintModalOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800 rounded-xl cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable EHR Document Container */}
        <div className="p-6 bg-white text-slate-900 rounded-xl space-y-6 border border-slate-300 print:border-none font-sans text-xs">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black tracking-tight text-slate-900">YCCE MEMORIAL HOSPITAL</h1>
              <p className="text-xs font-bold text-sky-700">DEPARTMENT OF CLINICAL INFORMATICS & AI MEDICINE</p>
              <p className="text-[10px] text-slate-500">Yeshwantrao Chavan College of Engineering, Nagpur</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-slate-900">EXECUTIVE CLINICAL HANDOFF BRIEF</div>
              <div className="text-xs text-slate-600 font-mono">DATE: {new Date().toLocaleDateString()}</div>
              <div className="text-xs font-bold text-red-600">CONFIDENTIAL MEDICAL RECORD</div>
            </div>
          </div>

          {/* Patient Demographic Banner */}
          <div className="bg-slate-100 p-3 rounded-lg border border-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <span className="text-slate-500 font-bold uppercase text-[9px] block">Patient Name:</span>
              <strong className="text-slate-900 text-sm">{currentPatient.name}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[9px] block">MRN Number:</span>
              <strong className="text-slate-900">{currentPatient.mrn}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[9px] block">Age / Gender:</span>
              <strong className="text-slate-900">{currentPatient.age}y / {currentPatient.gender} ({currentPatient.bloodType})</strong>
            </div>
            <div>
              <span className="text-slate-500 font-bold uppercase text-[9px] block">Location / Doctor:</span>
              <strong className="text-slate-900">{currentPatient.roomNumber} ({currentPatient.primaryDoctor})</strong>
            </div>
          </div>

          {/* Primary Diagnosis & Organ Risk Score */}
          <div className="space-y-2">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1">
              1. Primary Clinical Diagnosis & Risk Profile
            </div>
            <p className="text-xs font-semibold text-slate-800">
              {currentPatient.primaryDiagnosis} — <span className="text-red-600 font-black">Overall Organ Risk Score: {currentPatient.riskScore}/100 ({currentPatient.riskLevel.toUpperCase()})</span>
            </p>
          </div>

          {/* Allergies & Active Medications */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <strong className="text-red-700 text-xs block mb-1">DOCUMENTED ALLERGIES:</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-red-900">
                {currentPatient.allergies.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
              <strong className="text-sky-800 text-xs block mb-1">ACTIVE PHARMACOTHERAPY:</strong>
              <ul className="list-disc pl-4 space-y-0.5 text-sky-950">
                {currentPatient.activeMedications.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Longitudinal Event Highlights */}
          <div className="space-y-2">
            <div className="font-bold text-xs uppercase tracking-wider text-slate-700 border-b border-slate-300 pb-1">
              2. Key Longitudinal Events & AI Anomaly Delta Flags
            </div>
            <div className="space-y-2">
              {patientEvents.map(evt => (
                <div key={evt.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="flex justify-between font-bold text-slate-900 mb-1">
                    <span>{evt.title}</span>
                    <span className="text-slate-500 font-normal">{evt.date}</span>
                  </div>
                  <p className="text-slate-700">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Attending Physician Sign-Off */}
          <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs">
            <div>
              <p className="text-slate-500 italic">Generated automatically by YCCE CareAI Decision Support System.</p>
            </div>
            <div className="text-right border-t border-slate-400 pt-2 w-48">
              <div className="font-bold text-slate-900">{currentPatient.primaryDoctor}</div>
              <div className="text-[10px] text-slate-500">Attending Physician Signature</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
