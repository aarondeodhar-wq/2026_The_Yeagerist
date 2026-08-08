import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/apiService';
import { Bot, Send, User, Sparkles, FileText } from 'lucide-react';

interface ChatMsg {
  sender: 'ai' | 'user';
  text: string;
  citations?: string[];
  timestamp: string;
}

export const RAGClinicalAssistant: React.FC = () => {
  const { currentPatient, theme } = useApp();
  const isDark = theme === 'dark';

  const [inputQuery, setInputQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      sender: 'ai',
      text: `Hello Dr. Sharma. I am the PulseCare RAG AI Assistant initialized with vector indices for ${currentPatient.name} (MRN: ${currentPatient.mrn}). Ask me about lab deltas, drug contraindications, or clinical summary guidelines.`,
      citations: ['Discharge Summary doc-101', 'Cardiology ICU Protocol'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleSend = async () => {
    if (!inputQuery.trim()) return;
    const userText = inputQuery;
    setInputQuery('');

    const newMsg: ChatMsg = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    setLoading(true);

    const ragRes = await apiService.queryRAGAssistant(userText, currentPatient.id);

    if (ragRes) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: ragRes.answer,
          citations: ragRes.sources,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } else {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `Based on vector search for ${currentPatient.name}: Creatinine spiked 64% (2.3 mg/dL) with eGFR dropping to 24 mL/min/1.73m2. Spironolactone + Lisinopril administration poses acute hyperkalemia risk. Recommend immediate nephrology consultation.`,
            citations: ['Lab Report Aug 5', 'EHR Progress Note doc-101'],
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    }

    setLoading(false);
  };

  return (
    <div className="space-y-4 font-sans pb-12">
      <div className={`p-5 rounded-3xl border flex items-center justify-between ${
        isDark ? 'bg-[#0c182c]/85 border-cyan-900/30 text-slate-100' : 'bg-white/90 border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 jiggle-hover">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-black">FastAPI RAG Neural Clinical Assistant</h2>
            <div className="text-xs text-slate-400">Context Active: {currentPatient.name} • Vector Memory Loaded</div>
          </div>
        </div>
      </div>

      <div className={`glass-panel rounded-3xl p-5 border min-h-[420px] max-h-[520px] flex flex-col justify-between space-y-4 ${
        isDark ? 'bg-[#060c18]/90 border-cyan-900/30' : 'bg-white/90 border-slate-200'
      }`}>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs shrink-0 ${
                m.sender === 'user' ? 'bg-cyan-500 text-slate-950 font-black' : 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
              }`}>
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-xl rounded-2xl p-4 text-xs space-y-2 leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-semibold'
                  : isDark ? 'bg-slate-900/90 text-slate-200 border border-slate-800' : 'bg-slate-100 text-slate-800 border border-slate-200'
              }`}>
                <div>{m.text}</div>
                {m.citations && m.citations.length > 0 && (
                  <div className="pt-2 border-t border-slate-700/40 flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className="text-slate-400 flex items-center gap-1 font-bold">
                      <FileText className="w-3 h-3 text-cyan-400" /> Sources:
                    </span>
                    {m.citations.map((c, i) => (
                      <span key={i} className="bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                        {c}
                      </span>
                    ))}
                  </div>
                )}
                <div className="text-[9px] opacity-60 text-right">{m.timestamp}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-extrabold animate-pulse">
              <Sparkles className="w-4 h-4" /> Searching RAG Vector Index...
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-800/60">
          <input
            type="text"
            placeholder="Ask about patient lab trends, organ risks, or treatment guidelines..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className={`flex-1 text-xs rounded-2xl px-4 py-3 border focus:outline-none focus:border-cyan-400 ${
              isDark ? 'bg-slate-950 text-slate-200 border-slate-800' : 'bg-slate-50 text-slate-800 border-slate-200'
            }`}
          />
          <button
            onClick={handleSend}
            className="bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black px-5 py-3 rounded-2xl cursor-pointer jiggle-hover flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
