import React from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowRight, Plus, FolderOpen } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    setActiveView,
    selectedCase,
    cases,
    selectCase,
    setCaseSelectModalOpen,
    setAddDataModalOpen,
    loadDemoCase,
    entities,
    edges,
    aiInsights,
  } = useApp();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning.';
    if (hour >= 12 && hour < 17) return 'Good afternoon.';
    return 'Good evening.';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0F17] text-slate-100 p-8 sm:p-12 select-none font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* A. HEADER */}
        <div className="space-y-1">
          <div className="text-xs font-mono font-semibold tracking-wider text-teal-400 uppercase">
            SETU
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {getGreeting()}
          </h1>
          <p className="text-sm text-slate-400">
            Continue your investigation or select a case to begin.
          </p>
        </div>

        {/* B. COMPACT METRICS */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 py-3 px-4 rounded-lg bg-[#0E1420] border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Active Cases:</span>
            <span className="font-mono font-semibold text-white">{cases.length}</span>
          </div>
          <div className="h-3 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Entities:</span>
            <span className="font-mono font-semibold text-white">{selectedCase ? entities.length : '—'}</span>
          </div>
          <div className="h-3 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Relationships:</span>
            <span className="font-mono font-semibold text-teal-400">{selectedCase ? edges.length : '—'}</span>
          </div>
          <div className="h-3 w-px bg-slate-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Insights:</span>
            <span className="font-mono font-semibold text-amber-400">{selectedCase ? aiInsights.length : '—'}</span>
          </div>
        </div>

        {/* C. CURRENT INVESTIGATION (PRIMARY FOCUS) */}
        {selectedCase ? (
          <div className="p-6 rounded-lg bg-[#111827] border border-slate-800 space-y-4">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Current Investigation
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-teal-300">
                    {selectedCase.firNumber}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {selectedCase.title}
                </h2>
                <div className="text-xs text-slate-400 font-mono">
                  Entities: {entities.length} <span className="text-slate-600 mx-1">|</span> Relationships: {edges.length}
                </div>
              </div>

              <button
                onClick={() => setActiveView('cases')}
                className="flex items-center justify-center gap-2 h-10 px-5 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer shrink-0"
              >
                <span>Open Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-lg bg-[#111827] border border-dashed border-slate-800 space-y-4">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Current Investigation
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-slate-300">
                  No investigation currently active
                </h2>
                <p className="text-xs text-slate-400">
                  Select a case docket below or start a new case to load entity graphs and evidence.
                </p>
              </div>

              <button
                onClick={() => setCaseSelectModalOpen(true)}
                className="flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition cursor-pointer shrink-0 border border-slate-700"
              >
                <FolderOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>Select Case</span>
              </button>
            </div>
          </div>
        )}

        {/* D. RECENT CASES */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Recent Cases
          </div>
          <div className="rounded-lg bg-[#111827] border border-slate-800 overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-[#0E1420] text-slate-400 font-mono text-[11px]">
                  <th className="py-2.5 px-4 font-semibold">Case Name</th>
                  <th className="py-2.5 px-4 font-semibold">Case #</th>
                  <th className="py-2.5 px-4 font-semibold">Status</th>
                  <th className="py-2.5 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cases.map(c => {
                  const isCurrent = selectedCase ? c.caseId === selectedCase.caseId : false;
                  return (
                    <tr key={c.caseId} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4 font-medium text-slate-200">
                        {c.title}
                        {isCurrent && (
                          <span className="ml-2 text-[10px] font-mono px-1.5 py-0.2 rounded bg-teal-950 text-teal-300 border border-teal-800">
                            Current
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-400">{c.firNumber}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            selectCase(c.caseId);
                            setActiveView('cases');
                          }}
                          className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-medium transition cursor-pointer"
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* E. QUICK ACTIONS */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setAddDataModalOpen(true)}
            className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-teal-400" />
            <span>New Case</span>
          </button>
          <button
            onClick={() => setCaseSelectModalOpen(true)}
            className="flex items-center gap-1.5 h-9 px-4 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-medium transition cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Select Case</span>
          </button>
          <button
            onClick={loadDemoCase}
            className="h-9 px-3 rounded-md text-slate-500 hover:text-slate-400 hover:bg-slate-900 text-xs font-mono transition cursor-pointer ml-auto"
            title="Reset or load controlled demo dataset"
          >
            Load Demo Case
          </button>
        </div>
      </div>
    </div>
  );
};
