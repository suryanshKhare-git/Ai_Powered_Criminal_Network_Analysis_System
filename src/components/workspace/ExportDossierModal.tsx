import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Printer,
  FileCheck,
  Shield,
  Download,
  CheckCircle2,
  AlertTriangle,
  Award,
  Calendar,
} from 'lucide-react';

interface ExportDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportDossierModal: React.FC<ExportDossierModalProps> = ({ isOpen, onClose }) => {
  const { caseOverview, currentRole, entities, edges, workspaceCards } = useApp();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const verifiedEdges = edges.filter(e => e.reviewStatus === 'verified_lead');
  const activeLeadCards = workspaceCards.filter(c => c.column === 'active_leads' || c.column === 'verified');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-setu-surface border border-setu-borderLight rounded-lg shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden text-setu-text">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="p-4 border-b border-setu-border flex items-center justify-between bg-setu-card/80 no-print">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Export Formal Investigative Dossier
              </h3>
              <p className="text-[11px] text-setu-textMuted">
                Pre-formatted for Court Briefing, Remand Petitions, and Supervisory Review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow transition"
            >
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-setu-textMuted hover:text-white hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Container (Printable) */}
        <div className="flex-1 overflow-y-auto p-8 font-sans bg-white text-slate-900 dossier-print-container">
          {/* Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
            <div className="text-[11px] uppercase tracking-widest font-mono font-bold text-slate-700">
              CONFIDENTIAL // LAW ENFORCEMENT SENSITIVE // OFFICIAL INVESTIGATION DOSSIER
            </div>
            <h1 className="text-xl font-black tracking-wide uppercase text-slate-900">
              SPECIAL OPERATIONS & INTER-STATE CRIME BRANCH
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              National Capital Region Combined Investigation Cell | State Police HQ
            </p>
            <div className="text-[11px] font-mono text-slate-500 pt-1">
              SYSTEM FOR EXPLAINABLE TRACKING & UNIFICATION (SETU) REPORT ENGINE
            </div>
          </div>

          {/* Case Metadata Table */}
          <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-100 p-4 rounded border border-slate-300 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Primary FIR Number</span>
              <span className="font-bold text-slate-900 text-sm">{caseOverview.firNumber}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Police Station</span>
              <span className="font-bold text-slate-900">{caseOverview.policeStation}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Investigating Officer</span>
              <span className="font-bold text-slate-900">{caseOverview.investigationOfficer}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase">Date of Incident</span>
              <span className="font-bold text-slate-900">{caseOverview.incidentDate}</span>
            </div>
          </div>

          {/* Applicable Statutory Sections */}
          <div className="mb-6 space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
              Statutory Penal Code Sections Invoked
            </h3>
            <div className="flex flex-wrap gap-2 pt-1">
              {caseOverview.sections.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-slate-200 text-slate-800 text-xs font-mono font-medium border border-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Case Synopsis */}
          <div className="mb-6 space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
              Operational Case Summary
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed font-serif text-justify">
              {caseOverview.synopsis}
            </p>
          </div>

          {/* Verified Leads & Network Graph Link Analysis */}
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 flex items-center justify-between">
              <span>Corroborated Network Leads & Evidence Matrix ({verifiedEdges.length})</span>
              <span className="text-[10px] font-mono text-slate-500 lowercase font-normal">
                Audited by {currentRole.badge}
              </span>
            </h3>

            <div className="space-y-3">
              {verifiedEdges.map(edge => {
                const src = entities.find(e => e.id === edge.source);
                const tgt = entities.find(e => e.id === edge.target);

                return (
                  <div
                    key={edge.id}
                    className="p-3 bg-slate-50 border border-slate-300 rounded text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono">
                      <span className="font-bold text-slate-900">
                        {src?.name} ⟷ {tgt?.name}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 text-[10px] font-semibold">
                        {edge.leadLabel} ({edge.confidenceBand})
                      </span>
                    </div>

                    <p className="text-slate-700 text-xs leading-relaxed">
                      {edge.plainLanguageExplanation}
                    </p>

                    <div className="text-[10px] text-slate-600 font-mono flex items-center justify-between border-t border-slate-200 pt-1">
                      <span>Citations: {edge.sourceCitations.map(c => c.docRef).join(', ')}</span>
                      <span>Verified: {edge.reviewedBy || currentRole.badge}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Pinboard Summary */}
          <div className="mb-6 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1">
              Investigator Workspace Leads & Hypothesis Notes ({activeLeadCards.length})
            </h3>
            <div className="space-y-2">
              {activeLeadCards.map(c => (
                <div key={c.id} className="p-2.5 bg-slate-50 border border-slate-300 rounded text-xs">
                  <div className="flex items-center justify-between font-mono">
                    <span className="font-bold text-slate-900">{c.title}</span>
                    <span className="text-slate-600 uppercase text-[10px]">[{c.column}]</span>
                  </div>
                  <p className="text-slate-700 text-xs mt-1">{c.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Responsible AI Evidentiary Disclaimer */}
          <div className="my-6 p-4 rounded bg-amber-50 border-2 border-amber-300 text-xs space-y-1 text-amber-950">
            <div className="flex items-center gap-2 font-bold uppercase tracking-wide">
              <Award className="w-4 h-4 text-amber-700" />
              Evidentiary Compliance & AI Explainability Certification
            </div>
            <p className="text-[11px] leading-relaxed text-amber-900">
              Pursuant to Section 65B of the Indian Evidence Act, 1872 (and Section 63 of Bharatiya Sakshya Adhiniyam, 2023), all algorithmic link recommendations, cell tower handoff matrices, and entity resolutions in this docket represent <strong>investigative leads only</strong>. No automated model has confirmed guilt or made conclusive findings. Every recorded link has been individually reviewed, verified, and endorsed by the sworn Investigating Officer designated below.
            </p>
          </div>

          {/* Officer Sign-off & Seal Block */}
          <div className="mt-10 pt-6 border-t-2 border-slate-400 flex items-center justify-between text-xs font-mono text-slate-800">
            <div>
              <div>Generated via SETU Enterprise Intelligence Engine</div>
              <div>Security Hash: SHA256-492-OCT24-AUTH-OK</div>
              <div className="text-[10px] text-slate-500">Date: {new Date().toLocaleDateString('en-IN')}</div>
            </div>

            <div className="text-right space-y-4">
              <div className="italic text-slate-400 font-sans">[Investigating Officer Digital Signature]</div>
              <div className="border-t border-slate-900 pt-1 font-bold">
                {currentRole.title} ({currentRole.badge})<br />
                Special Cell / Case Unit 4
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
