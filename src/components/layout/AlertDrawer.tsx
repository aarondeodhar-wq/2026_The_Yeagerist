import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell } from 'lucide-react';

export const AlertDrawer: React.FC = () => {
  const { isAlertDrawerOpen, setIsAlertDrawerOpen, events, currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  if (!isAlertDrawerOpen) return null;

  const patientEvents = events.filter(e => e.patientId === currentPatient.id);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden no-print">
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAlertDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className={`w-screen max-w-md border-l shadow-2xl p-6 flex flex-col justify-between transition-all ${
          isDark ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'
        }`}>
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/50">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base">Active Clinical Alerts</h3>
              </div>
              <button
                onClick={() => setIsAlertDrawerOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {patientEvents.map(evt => (
                <div
                  key={evt.id}
                  className={`p-4 rounded-2xl border space-y-1.5 text-xs ${
                    evt.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' :
                    evt.severity === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span className="truncate">{evt.title}</span>
                    <span className="text-[10px] uppercase font-black">{evt.severity}</span>
                  </div>
                  <p className="opacity-90">{evt.description}</p>
                  <div className="text-[10px] opacity-70 text-right">{evt.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
