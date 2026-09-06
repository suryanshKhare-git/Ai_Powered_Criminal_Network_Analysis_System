import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ConnectionEdge, ReviewStatus } from '../../types';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import {
  X,
  FileCheck,
  AlertCircle,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  XCircle,
  Pin,
  Sparkles,
  Info,
  Clock,
  UserCheck,
} from 'lucide-react';

interface EdgeExplainDrawerProps {
  edge: ConnectionEdge;
  onClose: () => void;
}

export const EdgeExplainDrawer: React.FC<EdgeExplainDrawerProps> = ({ edge, onClose }) => {
  const {
    entities,
    updateEdgeReview,
    pinToWorkspace,
    inspectEvidenceByDocRef,
    currentRole,
  } = useApp();

  const [reviewNote, setReviewNote] = useState<string>(edge.reviewNotes || '');
  const [saveFeedback, setSaveFeedback] = useState<boolean>(false);

  const sourceEntity = entities.find(e => e.id === edge.source);
  const targetEntity = entities.find(e => e.id === edge.target);

  const handleReviewAction = (status: ReviewStatus) => {
    updateEdgeReview(edge.id, status, reviewNote);
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  const getStatusBadge = (status: ReviewStatus) => {
    switch (status) {
      case 'verified_lead':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-emerald-950/80 border border-emerald-500/70 text-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            HUMAN VERIFIED LEAD
          </span>
        );
      case 'needs_evidence':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-amber-950/80 border border-amber-500/70 text-amber-300">
            <HelpCircle className="w-3.5 h-3.5" />
            NEEDS MORE EVIDENCE
          </span>
        );
      case 'dismissed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-400">
            <XCircle className="w-3.5 h-3.5" />
            DISMISSED / INCONCLUSIVE
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-medium bg-cyan-950/80 border border-cyan-500/60 text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            PENDING INVESTIGATOR REVIEW
          </span>
        );
    }
  };

  return (
    <div className="w-96 sm:w-[460px] bg-setu-surface border-l border-setu-border flex flex-col h-full shadow-2xl z-30 animate-slideLeft overflow-hidden text-setu-text">
      {/* Header */}
      <div className="p-4 border-b border-setu-border flex items-center justify-between bg-setu-card/70">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-teal-950/80 border border-teal-500/50 text-teal-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-setu-textMuted">
              Explainable Link Intelligence
            </div>
            <h3 className="text-sm font-bold text-white truncate max-w-[280px]">
              {edge.label}
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
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Linked Entities Bar */}
        <div className="bg-slate-900/70 p-3 rounded-lg border border-setu-border space-y-2">
          <div className="text-[11px] font-mono text-setu-textMuted uppercase">
            Connected Entity Pair
          </div>
          <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white">
            <div className="truncate">
              <div className="text-teal-300">{sourceEntity?.name || edge.source}</div>
              <div className="text-[10px] text-setu-textMuted font-mono font-normal">
                {sourceEntity?.categoryLabel}
              </div>
            </div>
            <span className="text-slate-500 font-mono text-xs">⟷</span>
            <div className="text-right truncate">
              <div className="text-teal-300">{targetEntity?.name || edge.target}</div>
              <div className="text-[10px] text-setu-textMuted font-mono font-normal">
                {targetEntity?.categoryLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Lead Classification & Mandatory Disclaimer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-mono text-setu-textMuted uppercase">
              Evidentiary Classification
            </div>
            {getStatusBadge(edge.reviewStatus)}
          </div>

          {/* Guaranteed "Lead" or "Possible Connection" Banner */}
          <div className="p-2.5 rounded bg-teal-950/40 border border-teal-500/50 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-teal-200 text-xs">
                {edge.leadLabel}
              </div>
              <p className="text-[11px] text-teal-300/80 mt-0.5 leading-normal">
                Algorithmic correlation for investigative lead generation only. Evidentiary weight must be corroborated by human detective prior to judicial filing.
              </p>
            </div>
          </div>
        </div>

        {/* Confidence Meter (Qualitative Band + Range + Factor Breakdown) */}
        <div className="bg-slate-900/60 p-3.5 rounded-lg border border-setu-border space-y-3">
          <div className="text-[11px] font-mono text-setu-textMuted uppercase">
            Confidence & Weight Assessment
          </div>
          <ConfidenceMeter
            band={edge.confidenceBand}
            range={edge.confidenceRange}
            factors={edge.factorBreakdown}
            showDetails={true}
          />
        </div>

        {/* Plain Language AI Explanation */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
            <Info className="w-3.5 h-3.5 text-teal-400" />
            Plain-Language Investigative Explanation
          </div>
          <div className="p-3.5 rounded bg-[#0A0F1C] border border-setu-borderLight/60 text-slate-200 text-xs leading-relaxed font-sans shadow-inner">
            {edge.plainLanguageExplanation}
          </div>
        </div>

        {/* Underlying Evidence Citations (No Dead Ends!) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 uppercase tracking-wider font-mono">
              <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
              Underlying Evidentiary Citations ({edge.sourceCitations.length})
            </div>
            <span className="text-[10px] text-teal-400 font-mono">Click to inspect</span>
          </div>

          <div className="space-y-2">
            {edge.sourceCitations.map(cite => (
              <div
                key={cite.id}
                className="p-3 rounded-lg bg-slate-900/80 border border-setu-border hover:border-teal-500/60 transition group cursor-pointer"
                onClick={() => inspectEvidenceByDocRef(cite.docRef)}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300 font-semibold">
                      {cite.recordType}
                    </span>
                    <span className="text-xs font-semibold text-white group-hover:text-teal-300 transition">
                      {cite.title}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 transition" />
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-mono bg-[#070A12] p-2 rounded border border-slate-800 my-1.5 select-all">
                  "{cite.snippet}"
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-setu-textMuted">
                  <span>Doc Ref: {cite.docRef}</span>
                  {cite.timestamp && <span>Recorded: {cite.timestamp}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Human Oversight Review & Verification Controls */}
        <div className="p-4 rounded-lg bg-slate-900/90 border border-teal-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300 font-mono uppercase tracking-wide">
              <UserCheck className="w-4 h-4 text-teal-400" />
              Human Investigator Review
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              IO: {currentRole.badge}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] text-setu-textMuted font-sans">
              Investigator Note / Evidentiary Findings:
            </label>
            <textarea
              value={reviewNote}
              onChange={e => setReviewNote(e.target.value)}
              placeholder="Add investigator notes, verification references, or forensic test requests..."
              className="w-full h-18 p-2.5 rounded bg-[#070B14] border border-setu-border focus:border-teal-500 text-xs text-white placeholder-slate-600 focus:outline-none transition resize-none font-sans"
            />
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => handleReviewAction('verified_lead')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/70 text-xs font-medium text-emerald-200 transition shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verify Lead
            </button>

            <button
              onClick={() => handleReviewAction('needs_evidence')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-amber-950/80 hover:bg-amber-900 border border-amber-500/70 text-xs font-medium text-amber-200 transition shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Needs More Proof
            </button>

            <button
              onClick={() => handleReviewAction('unreviewed')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium text-slate-300 transition"
            >
              <FileCheck className="w-3.5 h-3.5" />
              Mark as Reviewed
            </button>

            <button
              onClick={() => handleReviewAction('dismissed')}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
            >
              <XCircle className="w-3.5 h-3.5" />
              Dismiss Lead
            </button>
          </div>

          {saveFeedback && (
            <div className="text-center text-xs font-mono text-emerald-400 pt-1 animate-fadeIn">
              ✓ Evidentiary review status updated & logged in chain of custody.
            </div>
          )}

          {edge.reviewedBy && (
            <div className="pt-2 border-t border-setu-border/60 text-[10px] font-mono text-slate-400 flex items-center justify-between">
              <span>Last reviewed by: {edge.reviewedBy}</span>
              <span>{edge.reviewedAt}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-setu-border bg-setu-card/70 flex items-center justify-between">
        <button
          onClick={() =>
            pinToWorkspace({
              edgeId: edge.id,
              type: 'connection',
              title: edge.leadLabel,
              subtitle: `${sourceEntity?.name || edge.source} ⟷ ${targetEntity?.name || edge.target}`,
              column: edge.reviewStatus === 'verified_lead' ? 'verified' : 'active_leads',
              notes: edge.plainLanguageExplanation,
              tags: ['AI Lead', edge.confidenceBand],
              confidence: edge.confidenceRange,
            })
          }
          className="flex items-center gap-1.5 py-2 px-4 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-amber-400 hover:text-amber-300 transition"
        >
          <Pin className="w-3.5 h-3.5" />
          Pin Lead to Workspace
        </button>

        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-medium text-slate-300 transition"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
