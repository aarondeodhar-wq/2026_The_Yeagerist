import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PatientHeader } from '../patient/PatientHeader';
import { 
  Activity, 
  Calendar, 
  Filter,
  Search
} from 'lucide-react';

export const LongitudinalTimeline: React.FC = () => {
  const { events, currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const patientEvents = events.filter(e => e.patientId === currentPatient.id);

  const filteredEvents = patientEvents.filter(evt => {
    const matchesSeverity = severityFilter === 'all' || evt.severity === severityFilter;
    const matchesSearch = evt.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  return (
    <div className="space-y-6 font-sans">
      <PatientHeader />

      <div className={`p-4 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div>
          <h3 className="font-bold text-base flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            <span>Longitudinal Medical Timeline</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Chronological event stream aggregating ICU progress notes, lab spikes, vitals alerts, and consultations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search timeline..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className={`text-xs rounded-xl pl-8 pr-3 py-1.5 border focus:outline-none focus:border-sky-500 ${
                isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}
            />
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border ${
            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            <button
              onClick={() => setSeverityFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                severityFilter === 'all' ? 'bg-sky-500 text-white' : 'text-slate-400'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSeverityFilter('critical')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                severityFilter === 'critical' ? 'bg-rose-500 text-white' : 'text-slate-400'
              }`}
            >
              Critical
            </button>
          </div>
        </div>
      </div>

      <div className="relative pl-6 border-l-2 border-slate-700/50 space-y-6 ml-3">
        {filteredEvents.map(evt => (
          <div key={evt.id} className="relative group">
            <div className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 ${
              evt.severity === 'critical' ? 'bg-rose-500 border-rose-300 ring-4 ring-rose-500/20' :
              evt.severity === 'warning' ? 'bg-amber-500 border-amber-300 ring-4 ring-amber-500/20' :
              'bg-sky-500 border-sky-300'
            }`}></div>

            <div className={`p-4 rounded-3xl border space-y-2 transition-all ${
              isDark ? 'bg-slate-900/90 border-slate-800 shadow-md' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm">{evt.title}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                      evt.severity === 'critical' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                      evt.severity === 'warning' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-sky-500/10 text-sky-500 border border-sky-500/20'
                    }`}>
                      {evt.severity}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                    <span>•</span>
                    <span className="capitalize">{evt.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {evt.description}
              </p>

              {evt.keyInsights && evt.keyInsights.length > 0 && (
                <div className={`p-3 rounded-xl border space-y-1 text-xs ${
                  isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider block">Key AI Clinical Insights:</span>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                    {evt.keyInsights.map((ins, i) => (
                      <li key={i}>{ins}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
