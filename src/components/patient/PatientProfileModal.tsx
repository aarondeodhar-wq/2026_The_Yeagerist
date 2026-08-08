import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  User, 
  Heart, 
  Pill, 
  Save,
  UserCheck
} from 'lucide-react';

interface PatientProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientProfileModal: React.FC<PatientProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const [name, setName] = useState<string>(currentPatient.name);
  const [age, setAge] = useState<number>(currentPatient.age);
  const [bloodType, setBloodType] = useState<string>(currentPatient.bloodType);
  const [diagnosis, setDiagnosis] = useState<string>(currentPatient.primaryDiagnosis);
  const [meds, setMeds] = useState<string>(currentPatient.activeMedications.join(', '));
  const [saved, setSaved] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    currentPatient.name = name;
    currentPatient.age = Number(age);
    currentPatient.bloodType = bloodType;
    currentPatient.primaryDiagnosis = diagnosis;
    currentPatient.activeMedications = meds.split(',').map(m => m.trim()).filter(Boolean);
    
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in font-sans">
      <div className={`max-w-lg w-full rounded-3xl border shadow-2xl overflow-hidden transition-all ${
        isDark 
          ? 'bg-[#0c182c] border-cyan-500/30 text-white shadow-cyan-950/60' 
          : 'bg-white border-cyan-200 text-slate-900 shadow-2xl'
      }`}>
        {/* Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isDark ? 'bg-[#060c18] border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 to-teal-300 p-0.5 shadow-md">
              <div className={`w-full h-full ${isDark ? 'bg-[#050811]' : 'bg-white'} rounded-[12px] flex items-center justify-center text-cyan-400 font-black`}>
                <UserCheck className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="font-black text-sm tracking-tight">Patient Profile & EHR Details</h3>
              <p className="text-[10px] text-cyan-500 font-bold">MRN: {currentPatient.mrn} • Ward 4 Bed 04</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-slate-200 text-slate-700 hover:text-black'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase text-[10px]">Patient Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:border-cyan-400 font-bold ${
                    isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                  }`}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase text-[10px]">Age & Blood Type</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-cyan-400 font-bold ${
                    isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                  }`}
                  required
                />
                <input
                  type="text"
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border focus:outline-none focus:border-cyan-400 font-bold ${
                    isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                  }`}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-black text-slate-400 uppercase text-[10px]">Primary Clinical Diagnosis</label>
            <div className="relative">
              <Heart className="w-4 h-4 text-rose-500 absolute left-3 top-2.5" />
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:border-cyan-400 font-bold ${
                  isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                }`}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-black text-slate-400 uppercase text-[10px]">Active Prescriptions (Comma-separated)</label>
            <div className="relative">
              <Pill className="w-4 h-4 text-amber-500 absolute left-3 top-2.5" />
              <textarea
                value={meds}
                onChange={(e) => setMeds(e.target.value)}
                rows={2}
                className={`w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:border-cyan-400 font-bold ${
                  isDark ? 'bg-[#050811] text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-300'
                }`}
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            {saved ? (
              <span className="text-emerald-500 font-black text-xs flex items-center gap-1">
                ✓ Patient Details Updated Successfully!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400 font-bold">
                Changes will sync with RAG index & Telemetry
              </span>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <Save className="w-4 h-4" />
              <span>Save Patient Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
