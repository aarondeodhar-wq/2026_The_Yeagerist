import React from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHeader } from '../patient/PatientHeader';
import { MOCK_VITALS, MOCK_LABS } from '../../data/mockData';
import { TrendingUp, Activity, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export const VitalsLabTrends: React.FC = () => {
  const { currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const vitalsData = MOCK_VITALS[currentPatient.id] || MOCK_VITALS['pat-1'];
  const labsData = MOCK_LABS[currentPatient.id] || MOCK_LABS['pat-1'];

  const creatinineLabs = labsData.filter(l => l.testName.includes('Creatinine'));
  const latestCreatinine = creatinineLabs[creatinineLabs.length - 1] || { value: 2.3, deltaPercent: 64.2 };

  return (
    <div className="space-y-6 font-sans">
      <PatientHeader />

      <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-500" />
            <span>Biomarker Trend Analytics & Delta Tracking</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time longitudinal visualizer for Serum Creatinine spikes, eGFR degradation, and BP fluctuation.
          </p>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-rose-500" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Creatinine 48h Delta</div>
            <div className="text-sm font-extrabold text-rose-500">
              {latestCreatinine.value} mg/dL (+{latestCreatinine.deltaPercent || 64.2}%)
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-5 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs">
              <Activity className="w-4 h-4 text-sky-500" />
              <span>Blood Pressure & Heart Rate Telemetry</span>
            </div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Daily 08:00 Logs</span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={vitalsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={10} tickFormatter={t => t.slice(5, 10)} />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[60, 180]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="bpSystolic" name="Systolic BP" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="hr" name="Heart Rate" stroke="#0284c7" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-5 rounded-3xl border space-y-4 ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Serum Creatinine Trajectory (mg/dL)</span>
            </div>
            <span className="text-[10px] text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded font-extrabold uppercase">
              Spike Alert
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={creatinineLabs}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} />
                <XAxis dataKey="timestamp" stroke="#94a3b8" fontSize={10} tickFormatter={t => t.slice(5, 10)} />
                <YAxis stroke="#94a3b8" fontSize={10} domain={[0.5, 3.0]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: isDark ? '#0f172a' : '#ffffff', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="value" name="Creatinine" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5, fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
