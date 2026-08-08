import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { BarChart3, PieChart as PieIcon, ShieldAlert } from 'lucide-react';

const CENSUS_DATA = [
  { department: 'Cardiology', total: 18, critical: 5 },
  { department: 'Nephrology', total: 14, critical: 3 },
  { department: 'Pulmonology', total: 12, critical: 2 },
  { department: 'Neurology', total: 9, critical: 1 },
  { department: 'Intensive Care', total: 8, critical: 4 },
];

const SEVERITY_PIE_DATA = [
  { name: 'Critical (High)', value: 15, color: '#f43f5e' },
  { name: 'Moderate Risk', value: 28, color: '#f59e0b' },
  { name: 'Low Risk', value: 37, color: '#10b981' },
];

export const HospitalAnalytics: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6 font-sans pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span>Hospital Operations & Risk Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time department census, critical acuity ratios, and predictive risk distribution.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Census & Risk Chart */}
        <div className={`lg:col-span-2 glass-panel rounded-3xl p-6 border space-y-4 ${
          isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>Departmental Census & Risk Census</span>
            </h3>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
              Live Feed Active
            </span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CENSUS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} />
                <XAxis dataKey="department" stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} tickLine={false} />
                <YAxis stroke={isDark ? '#94a3b8' : '#64748b'} fontSize={11} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    backgroundColor: isDark ? '#091122' : '#ffffff',
                    borderColor: '#06b6d4',
                    borderRadius: '16px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                    color: isDark ? '#f8fafc' : '#0f172a',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}
                />
                <Bar dataKey="total" name="Total Patients" fill="#0284c7" radius={[8, 8, 0, 0]} />
                <Bar dataKey="critical" name="Critical Patients" fill="#f43f5e" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Acuity Distribution Pie Chart */}
        <div className={`glass-panel rounded-3xl p-6 border space-y-4 ${
          isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
        }`}>
          <h3 className="font-extrabold text-sm flex items-center gap-2">
            <PieIcon className="w-4 h-4 text-cyan-400" />
            <span>Acuity Breakdown</span>
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SEVERITY_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {SEVERITY_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#091122' : '#ffffff',
                    borderColor: '#06b6d4',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800">
            {SEVERITY_PIE_DATA.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-400">{item.name}</span>
                </div>
                <span>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
