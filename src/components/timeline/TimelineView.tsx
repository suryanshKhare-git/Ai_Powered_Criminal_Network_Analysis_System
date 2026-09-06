import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { TimelineEvent } from '../../types';
import {
  Clock,
  Filter,
  Phone,
  Truck,
  CreditCard,
  FileText,
  Eye,
  ChevronRight,
  Calendar,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const TimelineView: React.FC = () => {
  const {
    timeline,
    entities,
    viewEntityProfile,
    inspectEvidenceByDocRef,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(timeline[0]?.id || null);

  const categories = [
    { id: 'all', label: 'All Incident Records', icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'telephony', label: 'Telephony & CDRs', icon: <Phone className="w-3.5 h-3.5" /> },
    { id: 'transit', label: 'Transit & Tolls', icon: <Truck className="w-3.5 h-3.5" /> },
    { id: 'financial', label: 'Banking & Hawala', icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: 'police_incident', label: 'Police Incidents & FIR', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'surveillance', label: 'CCTV & Surveillance', icon: <Eye className="w-3.5 h-3.5" /> },
  ];

  const filteredTimeline = useMemo(() => {
    if (selectedCategory === 'all') return timeline;
    return timeline.filter(item => item.category === selectedCategory);
  }, [timeline, selectedCategory]);

  const activeEvent = timeline.find(e => e.id === selectedEventId) || filteredTimeline[0];

  const getCategoryBadge = (cat: TimelineEvent['category']) => {
    switch (cat) {
      case 'telephony':
        return { label: 'CDR Telephony', color: 'bg-teal-950/70 text-teal-300 border-teal-800' };
      case 'transit':
        return { label: 'Toll & Transit', color: 'bg-amber-950/70 text-amber-300 border-amber-800' };
      case 'financial':
        return { label: 'Banking & Hawala', color: 'bg-emerald-950/70 text-emerald-300 border-emerald-800' };
      case 'police_incident':
        return { label: 'Police Incident / FIR', color: 'bg-blue-950/70 text-blue-300 border-blue-800' };
      case 'surveillance':
        return { label: 'Optical CCTV Sighting', color: 'bg-purple-950/70 text-purple-300 border-purple-800' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-400" />
            Chronological Incident Timeline
          </h2>
          <p className="text-xs text-setu-textMuted mt-0.5">
            Temporal alignment of CDR bursts, FASTag passages, RTGS transfers, and CCTV camera triggers.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition border whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-teal-950 border-teal-500 text-teal-300 shadow-sm'
                  : 'bg-setu-card border-setu-border text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrollable Timeline Bar */}
      <div className="bg-setu-surface border border-setu-border rounded-lg p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between text-xs text-setu-textMuted font-mono">
          <span>Incident Chronology (October 2024)</span>
          <span>Click any milestone to inspect details</span>
        </div>

        {/* Horizontal rail */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="flex items-center gap-4 min-w-max relative px-4">
            {/* Horizontal connecting line */}
            <div className="absolute top-5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />

            {filteredTimeline.map((item, idx) => {
              const isSelected = activeEvent?.id === item.id;
              const badge = getCategoryBadge(item.category);

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedEventId(item.id)}
                  className={`flex flex-col items-center group relative z-10 transition-transform ${
                    isSelected ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Timeline node node indicator */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                      isSelected
                        ? 'bg-teal-400 border-white text-black font-bold shadow-lg ring-4 ring-teal-500/30'
                        : 'bg-slate-900 border-slate-700 group-hover:border-teal-400 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  </div>

                  {/* Card beneath point */}
                  <div
                    className={`mt-2.5 p-2.5 rounded-lg border text-left w-52 space-y-1 transition ${
                      isSelected
                        ? 'bg-setu-card border-teal-500/80 shadow-md'
                        : 'bg-slate-900/60 border-setu-border/70 group-hover:border-slate-700'
                    }`}
                  >
                    <div className="text-[10px] font-mono text-teal-400 font-semibold truncate">
                      {item.displayDate}
                    </div>
                    <div className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </div>
                    <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-mono border ${badge.color}`}>
                      {badge.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Event Deep-Dive Panel */}
      {activeEvent && (
        <div className="bg-setu-surface border border-setu-border rounded-lg p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-setu-border/70 pb-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-teal-400 px-2.5 py-1 rounded bg-teal-950/80 border border-teal-800">
                  {activeEvent.displayDate}
                </span>
                <span className={`px-2.5 py-1 rounded text-xs font-mono border ${getCategoryBadge(activeEvent.category).color}`}>
                  {getCategoryBadge(activeEvent.category).label}
                </span>
                <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                  {activeEvent.evidenceWeight}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white pt-1">
                {activeEvent.title}
              </h3>
            </div>

            <button
              onClick={() => inspectEvidenceByDocRef(activeEvent.sourceDocRef)}
              className="flex items-center gap-1.5 px-3 py-2 rounded bg-teal-950/80 hover:bg-teal-900 border border-teal-500/60 text-xs font-medium text-teal-300 transition shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              Inspect Source Doc [{activeEvent.sourceDocRef}]
            </button>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Event Narrative
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-setu-border">
              {activeEvent.summary}
            </p>
          </div>

          {/* Involved Entities */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Involved Entities ({activeEvent.entityIds.length})
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {activeEvent.entityIds.map(entId => {
                const ent = entities.find(e => e.id === entId);
                if (!ent) return null;

                return (
                  <div
                    key={ent.id}
                    className="p-3 rounded-lg bg-slate-900/80 border border-setu-border hover:border-teal-500/60 transition flex items-center justify-between"
                  >
                    <div className="truncate pr-2">
                      <div className="text-xs font-semibold text-white truncate">
                        {ent.name}
                      </div>
                      <div className="text-[10px] text-setu-textMuted font-mono">
                        {ent.categoryLabel}
                      </div>
                    </div>
                    <button
                      onClick={() => viewEntityProfile(ent.id)}
                      className="p-1 rounded text-teal-400 hover:text-teal-200 hover:bg-slate-800 transition"
                      title="Open Profile"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
