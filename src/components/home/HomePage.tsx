import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
  Sparkles,
  Phone,
  Truck,
  CreditCard,
  Activity,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    setActiveView,
    selectedCase,
    setCaseSelectModalOpen,
    entities,
    edges,
    aiInsights,
    timeline,
    runNetworkAnalysis,
  } = useApp();

  return (
    <div className="flex-1 overflow-y-auto bg-[#0B0F17] text-slate-100 p-6 sm:p-8 space-y-8 select-none font-sans">
      {/* 1. HEADER: What is SETU? */}
      <div className="max-w-4xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
          <Shield className="w-4 h-4 text-teal-400" />
          <span>INVESTIGATIVE DECISION-SUPPORT PLATFORM</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          SETU Network Intelligence
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
          SETU correlates disparate law enforcement records—telecom CDRs, FIR crime dockets, Vahan toll passages, and banking ledgers—to help investigators uncover hidden relationships and generate court-admissible evidence.
        </p>
      </div>

      {/* 2. CURRENT INVESTIGATION: Clear Scope & ONE Primary Action */}
      <div className="p-6 rounded-lg bg-[#111827] border border-slate-800 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-teal-300 font-bold">
                {selectedCase.firNumber}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                ACTIVE INVESTIGATION
              </span>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                • {selectedCase.policeStation}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {selectedCase.title}
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {selectedCase.synopsis}
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveView('cases')}
              className="flex items-center gap-2 h-10 px-5 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition cursor-pointer"
            >
              <span>Open Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCaseSelectModalOpen(true)}
              className="h-10 px-3.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition cursor-pointer"
              title="Select another investigation docket"
            >
              <FolderOpen className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Concise Statistics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80">
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Docket Entities</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">{entities.length}</div>
            <div className="text-[10px] text-slate-500">People, vehicles, accounts</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Relationships</div>
            <div className="text-lg font-bold font-mono text-teal-400 mt-0.5">{edges.length}</div>
            <div className="text-[10px] text-slate-500">Corroborated links</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Flagged Insights</div>
            <div className="text-lg font-bold font-mono text-amber-400 mt-0.5">{aiInsights.length}</div>
            <div className="text-[10px] text-slate-500">Requiring review</div>
          </div>
          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Evidence Exhibits</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">8</div>
            <div className="text-[10px] text-slate-500">Sec 65B certified</div>
          </div>
        </div>
      </div>

      {/* 3. KEY FINDINGS: Clear, Human-Readable Insights */}
      <div className="p-6 rounded-lg bg-[#111827] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Key Investigative Findings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Corroborated relationship patterns identified by automated network analysis.
            </p>
          </div>
          <button
            onClick={() => setActiveView('insights')}
            className="text-xs text-teal-400 hover:underline font-medium cursor-pointer"
          >
            View All ({aiInsights.length}) →
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {aiInsights.slice(0, 3).map((insight, idx) => (
            <div
              key={insight.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase border ${
                      insight.priority === 'HIGH'
                        ? 'bg-amber-950/70 border-amber-700 text-amber-300'
                        : 'bg-teal-950/70 border-teal-800 text-teal-300'
                    }`}
                  >
                    {insight.priority}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">
                    {idx + 1}. {insight.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                  {insight.whyThisInsight || insight.shortExplanation}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono text-teal-400">
                  {insight.confidence}% Confidence
                </span>
                <button
                  onClick={() => setActiveView('insights')}
                  className="h-8 px-3 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 transition cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RECENT ACTIVITY: Scannable Timeline Sequence */}
      <div className="p-6 rounded-lg bg-[#111827] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white tracking-wide">
              Recent Case Activity
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Chronological log of verified telephony, transit passages, and financial transfers.
            </p>
          </div>
          <button
            onClick={() => setActiveView('timeline')}
            className="text-xs text-teal-400 hover:underline font-medium cursor-pointer"
          >
            View Full Timeline →
          </button>
        </div>

        <div className="divide-y divide-slate-800/80">
          {timeline.slice(0, 4).map(event => (
            <div
              key={event.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-teal-400 shrink-0 mt-0.5 sm:mt-0">
                  {event.category === 'telephony' && <Phone className="w-3.5 h-3.5" />}
                  {event.category === 'transit' && <Truck className="w-3.5 h-3.5" />}
                  {event.category === 'financial' && <CreditCard className="w-3.5 h-3.5" />}
                  {event.category !== 'telephony' &&
                    event.category !== 'transit' &&
                    event.category !== 'financial' && <Activity className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className="font-semibold text-slate-200">{event.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">{event.summary}</div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-500 shrink-0">
                {event.displayDate}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Recommended Next Action Callout (Quiet, not loud) */}
      <div className="p-4 rounded-lg bg-[#0E1420] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-300">
          <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
          <span>
            <strong>Recommended Action:</strong> Run the automated network analysis pipeline to compute cross-modal graph resolution.
          </span>
        </div>
        <button
          onClick={runNetworkAnalysis}
          className="h-8 px-4 rounded-md bg-teal-600 hover:bg-teal-500 text-white font-semibold transition shrink-0 cursor-pointer"
        >
          Analyze Network
        </button>
      </div>
    </div>
  );
};
