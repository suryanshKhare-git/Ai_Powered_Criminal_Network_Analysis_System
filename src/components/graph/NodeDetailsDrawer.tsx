import React from 'react';
import { useApp } from '../../context/AppContext';
import { Entity, EntityType } from '../../types';
import {
  X,
  User,
  Phone,
  Truck,
  CreditCard,
  MapPin,
  FileText,
  Pin,
  ExternalLink,
  Shield,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface NodeDetailsDrawerProps {
  entity: Entity;
  onClose: () => void;
}

export const NodeDetailsDrawer: React.FC<NodeDetailsDrawerProps> = ({ entity, onClose }) => {
  const { viewEntityProfile, pinToWorkspace, edges, entities, selectEdge } = useApp();

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'person':
        return <User className="w-5 h-5 text-cyan-400" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-teal-400" />;
      case 'vehicle':
        return <Truck className="w-5 h-5 text-amber-400" />;
      case 'account':
        return <CreditCard className="w-5 h-5 text-emerald-400" />;
      case 'location':
        return <MapPin className="w-5 h-5 text-purple-400" />;
      case 'case':
        return <FileText className="w-5 h-5 text-blue-400" />;
    }
  };

  // Find all connected edges and neighbor entities
  const connectedEdges = edges.filter(e => e.source === entity.id || e.target === entity.id);

  return (
    <div className="w-96 sm:w-[420px] bg-setu-surface border-l border-setu-border flex flex-col h-full shadow-2xl z-30 animate-slideLeft overflow-hidden text-setu-text">
      {/* Header */}
      <div className="p-4 border-b border-setu-border flex items-center justify-between bg-setu-card/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-setu-bg border border-setu-border">
            {getEntityIcon(entity.type)}
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-setu-textMuted">
              Entity Node Details
            </div>
            <h3 className="text-sm font-bold text-white truncate max-w-[240px]">
              {entity.name}
            </h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded text-setu-textMuted hover:text-white hover:bg-slate-800 transition"
          aria-label="Close drawer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {/* Category & Identifiers */}
        <div className="space-y-2 bg-slate-900/60 p-3 rounded border border-setu-border">
          <div className="flex items-center justify-between">
            <span className="text-setu-textMuted font-mono text-[11px]">Type / Category:</span>
            <span className="font-semibold text-teal-300 font-mono text-[11px] px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800">
              {entity.categoryLabel}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-setu-textMuted font-mono text-[11px]">Primary Identifier:</span>
            <span className="font-mono text-white font-medium">{entity.primaryIdentifier}</span>
          </div>

          {entity.aliases && (
            <div className="flex items-start justify-between gap-2 pt-1 border-t border-setu-border/60">
              <span className="text-setu-textMuted font-mono text-[11px]">Aliases:</span>
              <span className="text-slate-300 text-right font-mono text-[11px]">
                {entity.aliases.join(', ')}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between pt-1 border-t border-setu-border/60">
            <span className="text-setu-textMuted font-mono text-[11px]">Jurisdiction:</span>
            <span className="text-slate-300 text-[11px]">{entity.jurisdiction}</span>
          </div>
        </div>

        {/* Intelligence / Risk Flag */}
        {entity.riskIndicator && (
          <div className="bg-amber-950/30 border border-amber-800/50 p-3 rounded text-xs space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>Intelligence Signal / Case Flag</span>
            </div>
            <p className="text-amber-200/90 leading-relaxed text-[11px]">
              {entity.riskIndicator}
            </p>
          </div>
        )}

        {/* Summary Description */}
        <div className="space-y-1.5">
          <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Investigative Synopsis
          </h4>
          <p className="text-slate-300 leading-relaxed bg-slate-900/40 p-3 rounded border border-setu-border/50 text-xs">
            {entity.summary}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="space-y-1.5">
          <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
            Extracted Attributes
          </h4>
          <div className="bg-slate-900/60 rounded border border-setu-border divide-y divide-setu-border/50 font-mono text-[11px]">
            {Object.entries(entity.metadata).map(([k, v]) => (
              <div key={k} className="px-3 py-2 flex items-center justify-between gap-2">
                <span className="text-setu-textMuted font-sans">{k}</span>
                <span className="text-slate-200 text-right truncate max-w-[200px]">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Graph Edges / Associations */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
              <Layers className="w-3 h-3 text-teal-400" />
              Direct Network Links ({connectedEdges.length})
            </h4>
            <span className="text-[10px] text-setu-textMuted font-mono">Click link to explain</span>
          </div>

          <div className="space-y-1.5">
            {connectedEdges.map(edge => {
              const otherId = edge.source === entity.id ? edge.target : edge.source;
              const otherEntity = entities.find(e => e.id === otherId);

              return (
                <button
                  key={edge.id}
                  onClick={() => selectEdge(edge.id)}
                  className="w-full text-left p-2.5 rounded bg-slate-900/80 hover:bg-slate-800 border border-setu-border/80 hover:border-teal-500/50 transition flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-semibold text-slate-200 group-hover:text-teal-300 transition flex items-center gap-1.5">
                      <span>{otherEntity?.name || otherId}</span>
                      <span className="text-[10px] font-normal text-setu-textMuted">
                        ({otherEntity?.categoryLabel})
                      </span>
                    </div>
                    <div className="text-[10px] text-amber-400/90 font-mono">
                      {edge.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 group-hover:text-teal-400 transition">
                    <span className="text-[10px] font-mono">{edge.confidenceBand}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Timestamps */}
        <div className="pt-2 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span>First: {entity.firstSighted}</span>
          <span>Last: {entity.lastSighted}</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-setu-border bg-setu-card/70 flex items-center gap-2">
        <button
          onClick={() => viewEntityProfile(entity.id)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-teal-950/80 hover:bg-teal-900 border border-teal-500/60 text-xs font-semibold text-teal-300 transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Full Entity Profile
        </button>

        <button
          onClick={() =>
            pinToWorkspace({
              entityId: entity.id,
              type: 'entity',
              title: entity.name,
              subtitle: entity.categoryLabel,
              column: 'active_leads',
              notes: entity.summary,
              tags: entity.tags,
              confidence: 'Verified Subject',
            })
          }
          className="flex items-center gap-1.5 py-2 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-amber-400 hover:text-amber-300 transition"
          title="Pin to Investigation Pinboard"
        >
          <Pin className="w-3.5 h-3.5" />
          Pin
        </button>
      </div>
    </div>
  );
};
