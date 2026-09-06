import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  Search,
  Share2,
  Clock,
  LayoutGrid,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Award,
  Sparkles,
  Phone,
  Truck,
  CreditCard,
  MapPin,
  FileText,
  Lock,
  Layers,
  HelpCircle,
  Eye,
  ExternalLink,
  ChevronRight,
  Database,
  SlidersHorizontal,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveView, selectEntity } = useApp();

  const handleLaunchCaseStudy = () => {
    selectEntity('ent-person-1');
    setActiveView('graph');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-setu-bg text-setu-text select-none animate-fadeIn pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative border-b border-setu-border bg-gradient-to-b from-[#0B1120] via-setu-surface to-setu-bg px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Official Emblem & Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-950/80 border border-teal-500/60 text-teal-300">
              <Shield className="w-3.5 h-3.5" />
              INTELLIGENCE & RECORD UNIFICATION PLATFORM
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              SECTION 65B IEA / 63 BSA COMPLIANT
            </span>
          </div>

          {/* Main Titles */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans uppercase">
              SETU <span className="text-teal-400 font-normal ml-2 font-mono text-2xl sm:text-4xl tracking-normal">सेतु</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-slate-300 font-sans max-w-2xl">
              System for Explainable Tracking & Unification
            </p>
          </div>

          {/* Highlighted Refined Pitch Box */}
          <div className="p-5 sm:p-6 rounded-xl bg-slate-900/90 border-2 border-teal-500/50 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-teal-950/80 border border-teal-500/40 text-teal-400 shrink-0 mt-1 hidden sm:block">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-teal-300 uppercase tracking-wider font-semibold">
                  Core Mission & System Mandate
                </div>
                <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed">
                  "<strong>SETU</strong> connects fragmented, siloed crime records (<span className="text-teal-300">FIRs</span>, <span className="text-teal-300">CDRs</span>, <span className="text-teal-300">financial data</span>, <span className="text-teal-300">vehicle registries</span>, <span className="text-teal-300">surveillance logs</span>) into a single explainable network graph, so an authorized investigator can search any entity — a person, phone number, vehicle, location, organization, or case — and instantly see how it relates to everything else, with a plain-language explanation for every connection and full human oversight before any conclusion is acted on."
                </p>
              </div>
            </div>
          </div>

          {/* Action Launcher Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveView('graph')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold shadow-xl transition-all duration-200 transform hover:translate-y-[-1px]"
            >
              <Share2 className="w-4 h-4" />
              Launch Live Investigation Console
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveView('search')}
              className="flex items-center gap-2 px-5 py-3 rounded-lg bg-setu-card hover:bg-slate-800 border border-setu-borderLight text-slate-200 text-sm font-semibold transition"
            >
              <Search className="w-4 h-4 text-teal-400" />
              Try Universal Search
            </button>

            <button
              onClick={handleLaunchCaseStudy}
              className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 text-sm font-medium transition"
            >
              <FileText className="w-4 h-4" />
              Demo: Operation Northern Haul (FIR #492/2024)
            </button>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM VS. THE SETU SOLUTION */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
            Why Law Enforcement Needs SETU
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Breaking Through The Multi-Agency Data Silos
          </h2>
          <p className="text-xs sm:text-sm text-setu-textMuted leading-relaxed">
            Organized syndicates operate across state borders, using burner SIMs, decoy logistics, and hawala accounts. Traditional police methods take weeks of manual spreadsheet cross-referencing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Silos Card */}
          <div className="bg-setu-surface border border-red-900/40 rounded-xl p-6 space-y-4 shadow-lg">
            <div className="flex items-center justify-between border-b border-setu-border/60 pb-3">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm uppercase font-mono">
                <ShieldAlert className="w-4 h-4" />
                The Traditional Challenge
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950/60 border border-red-800/60 text-red-300">
                FRAGMENTED SILOS
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">State-Locked FIRs:</strong> First Information Reports locked in state CCTNS silos, making cross-border modus operandi invisible.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">Raw 50,000-Row CDR Dumps:</strong> Excel spreadsheets from telecom operators analyzed manually with basic VLOOKUPs.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">Isolated Transit & Toll Records:</strong> FASTag sensor logs and CCTV camera footage stored in separate proprietary databases.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-400 font-bold mt-0.5">✕</span>
                <div>
                  <strong className="text-white">Unexplainable "Black Box" AI:</strong> Proprietary vendor algorithms rejected by courts and defense lawyers due to lack of explainability.
                </div>
              </li>
            </ul>
          </div>

          {/* SETU Solution Card */}
          <div className="bg-setu-surface border-2 border-teal-500/50 rounded-xl p-6 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between border-b border-setu-border/60 pb-3">
              <div className="flex items-center gap-2 text-teal-300 font-bold text-sm uppercase font-mono">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                The SETU Architecture
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950 border border-teal-600 text-teal-300 font-semibold">
                EXPLAINABLE GRAPH
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-teal-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Multi-Modal Ingestion:</strong> Connectors ingest FIRs, CDRs, Vahan registries, bank ledgers, and CCTV logs in seconds.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-teal-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">3-Tier Entity Resolution:</strong> Automatically resolves blind-indexed phones, IMEI numbers, and license plates without exposing raw PII.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-teal-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Plain-Language Explanations:</strong> Every link is explained in natural language and directly cites underlying document lines.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-teal-400 font-bold mt-0.5">✓</span>
                <div>
                  <strong className="text-white">Court-Ready Evidentiary Output:</strong> 1-click generation of Section 65B IEA / Section 63 BSA certified judicial dossiers with officer digital signatures.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4-STAGE PIPELINE) */}
      <section className="px-4 sm:px-6 py-12 border-y border-setu-border bg-setu-surface/40">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <div className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
              The Engine
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              From Raw Case Files to Courtroom Evidence in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                step: '01',
                title: 'Multi-Source Ingestion',
                desc: 'Queue-based ingestion normalizes FIRs, CDRs/IPDR, Vahan registrations, FASTag logs, and Bank RTGS statements with cryptographic SHA-256 fingerprinting.',
                icon: <Database className="w-5 h-5 text-cyan-400" />,
              },
              {
                step: '02',
                title: '3-Tier Entity Resolution',
                desc: 'Tier 1 exact match on high-entropy blind tokens; Tier 2 Jaro-Winkler phonetic name/alias matching; Tier 3 spatio-temporal tower colocation.',
                icon: <SlidersHorizontal className="w-5 h-5 text-teal-400" />,
              },
              {
                step: '03',
                title: 'Explainable Knowledge Graph',
                desc: '60 FPS force-directed physics graph with bounded k-hop traversal. Every edge shows plain-language reasons, factor weights, and underlying exhibits.',
                icon: <Share2 className="w-5 h-5 text-amber-400" />,
              },
              {
                step: '04',
                title: 'Human Oversight & Dossier',
                desc: 'Investigating officers verify or reject leads. One-click export formats a formal judicial dossier certified under Section 65B IEA / Section 63 BSA.',
                icon: <Award className="w-5 h-5 text-emerald-400" />,
              },
            ].map((s, idx) => (
              <div
                key={idx}
                className="bg-setu-surface border border-setu-border rounded-xl p-5 space-y-3 relative group hover:border-teal-500/60 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-lg bg-setu-card border border-setu-border">
                    {s.icon}
                  </div>
                  <span className="text-xl font-mono font-black text-slate-700 group-hover:text-teal-400 transition">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-setu-textMuted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE FEATURE SUITE (1-CLICK LAUNCHERS) */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-setu-border/60 pb-4">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-teal-400 font-semibold">
              Live Interactive Tools
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Explore the Platform Modules
            </h2>
          </div>
          <p className="text-xs text-setu-textMuted font-mono">
            Click any module below to launch directly into the operational tool
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Feature 1: Universal Search */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  HOTKEY: /
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                Universal Entity Omnibox
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                Accepts phone numbers, license plates, suspect names, bank A/Cs, or FIR IDs with real-time heuristic type-ahead auto-detection.
              </p>
            </div>
            <button
              onClick={() => setActiveView('search')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>Launch Universal Search</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Feature 2: Force-Directed Graph */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <Share2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  60 FPS CANVAS
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                Interactive Network Graph
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                Physics-driven zoomable canvas. Click any node for entity details or click any edge for plain-language XAI reasoning and source citations.
              </p>
            </div>
            <button
              onClick={() => setActiveView('graph')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>Open Network Graph</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Feature 3: Timeline Analysis */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  MULTI-STREAM
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                Chronological Timeline
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                Multi-lane horizontal sequence aligning CDR call bursts, FASTag checkpoint debits, RTGS remittances, and CCTV sightings in time order.
              </p>
            </div>
            <button
              onClick={() => setActiveView('timeline')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>Explore Event Timeline</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Feature 4: Case Workspace */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  PINBOARD + PDF
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                Case Workspace & Dossier
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                Organize pinned suspects and lead hypotheses across 4 case stages. Generate formal court-admissible dossiers certified under Section 65B IEA.
              </p>
            </div>
            <button
              onClick={() => setActiveView('workspace')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>Open Case Workspace</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Feature 5: Entity Profile */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                  4 WORKSPACES
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                360° Entity Profiles
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                4-tabbed dossier workspace covering 1st-degree connections, chronological movements, certified source documents, and officer case diary notes.
              </p>
            </div>
            <button
              onClick={() => setActiveView('entity-profile')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>View Entity Profiles</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>

          {/* Feature 6: Cryptographic Audit Vault */}
          <div className="bg-setu-surface border border-setu-border hover:border-teal-500/60 rounded-xl p-5 flex flex-col justify-between space-y-4 transition shadow-sm group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-teal-950/60 border border-teal-500/40 text-teal-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300">
                  ADMIN ONLY
                </span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition">
                Tamper-Evident Audit Ledger
              </h3>
              <p className="text-xs text-setu-textMuted leading-relaxed">
                Immutable, append-only log of every search, graph inspection, and export linked via SHA-256 HMAC hash pointers. Instant cryptographic seal verification.
              </p>
            </div>
            <button
              onClick={() => setActiveView('audit-log')}
              className="flex items-center justify-between w-full pt-3 border-t border-setu-border/50 text-xs font-semibold text-teal-300 hover:text-white transition"
            >
              <span>Inspect Audit Trail</span>
              <ChevronRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. LIVE CASE STUDY SHOWCASE (OPERATION NORTHERN HAUL) */}
      <section className="px-4 sm:px-6 py-12 border-t border-setu-border bg-[#0B101D]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-semibold">
                Live Demonstration Scenario
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Case Study: Operation Northern Haul (FIR #492/2024)
              </h2>
            </div>
            <button
              onClick={handleLaunchCaseStudy}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition self-start sm:self-auto shadow-lg"
            >
              <Share2 className="w-3.5 h-3.5" />
              Load This Case on Graph
            </button>
          </div>

          <div className="bg-setu-surface border border-setu-border rounded-xl p-6 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Case Summary */}
              <div className="lg:col-span-1 space-y-3 bg-slate-900/60 p-4 rounded-lg border border-setu-border">
                <div className="text-xs font-mono text-teal-400 font-semibold uppercase">
                  Incident Docket
                </div>
                <div className="text-sm font-bold text-white">
                  ₹4.2 Cr Electronics Freight Hijack
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  High-value electronics container forced off the road at Sector 18 Noida bypass. GPS wires cut at 23:45 IST; cargo trans-shipped to a decoy carrier.
                </p>
                <div className="pt-2 border-t border-setu-border/60 text-[11px] font-mono text-setu-textMuted space-y-1">
                  <div>PS: Sector 20 Gautam Buddha Nagar</div>
                  <div>Sections: BNS 303(2), 310(2), 111</div>
                  <div>IO: Inspector S. Rawat (SC-1142)</div>
                </div>
              </div>

              {/* Fragmented Evidence Connected */}
              <div className="lg:col-span-2 space-y-3">
                <div className="text-xs font-mono text-slate-400 uppercase">
                  How SETU Connected 5 Fragmented Silos
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  <div className="p-3 rounded-lg bg-slate-900/80 border border-setu-border space-y-1">
                    <div className="font-semibold text-teal-300 flex items-center gap-1.5 font-mono">
                      <Phone className="w-3.5 h-3.5" />
                      Burner SIM & Call Burst
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      SIM +91 98110 29481 activated under forged CAF placed 14 calls to driver Kabir Deshmukh during heist window.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-setu-border space-y-1">
                    <div className="font-semibold text-amber-300 flex items-center gap-1.5 font-mono">
                      <Truck className="w-3.5 h-3.5" />
                      Decoy Truck & FASTag Hit
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Decoy Tata 407 (DL-01-AB-1234) passed Murthal toll at 01:14 IST with driver phone collocated within 30 seconds.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-setu-border space-y-1">
                    <div className="font-semibold text-emerald-300 flex items-center gap-1.5 font-mono">
                      <CreditCard className="w-3.5 h-3.5" />
                      Hawala Cash Settlement
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      ₹85,00,000 RTGS credited to Tariq Ahmed's shell company 'Blue Star Cargo' and liquidated across 14 mule accounts.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/80 border border-setu-border space-y-1">
                    <div className="font-semibold text-blue-300 flex items-center gap-1.5 font-mono">
                      <Layers className="w-3.5 h-3.5" />
                      Cross-Jurisdiction Overlap
                    </div>
                    <p className="text-slate-300 text-[11px]">
                      Decoy truck DL-01-AB-1234 flagged as the exact same vehicle used in Cyberabad FIR #118/2023 robbery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RESPONSIBLE AI & LEGAL COMPLIANCE */}
      <section className="px-4 sm:px-6 py-12 max-w-6xl mx-auto space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <div className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">
            Evidentiary Admissibility
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            The 4 Non-Negotiable Human Oversight Safeguards
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-setu-surface border border-setu-border p-4 rounded-xl space-y-2">
            <div className="font-bold text-teal-300 font-mono flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-teal-400" />
              "Lead" Labeling Only
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Every AI-generated link visibly carries the word "lead" or "possible connection," never "match confirmed" or "guilty."
            </p>
          </div>

          <div className="bg-setu-surface border border-setu-border p-4 rounded-xl space-y-2">
            <div className="font-bold text-amber-300 font-mono flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              Qualitative Confidence
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Confidence is always displayed as a qualitative band (Strong / Moderate / Weak signal) alongside numeric ranges—never bare percentages.
            </p>
          </div>

          <div className="bg-setu-surface border border-setu-border p-4 rounded-xl space-y-2">
            <div className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-cyan-400" />
              Zero Dead-End Output
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Every connection is clickable through to underlying certified raw evidence (CDR dumps, FIR text, Vahan records, bank ledgers).
            </p>
          </div>

          <div className="bg-setu-surface border border-setu-border p-4 rounded-xl space-y-2">
            <div className="font-bold text-emerald-300 font-mono flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              Sec 65B Certification
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Official dossier exports include statutory Section 65B Indian Evidence Act / Section 63 BSA compliance blocks and officer signatures.
            </p>
          </div>
        </div>
      </section>

      {/* 7. BOTTOM TACTICAL LAUNCHER */}
      <section className="px-4 sm:px-6 pt-6 max-w-6xl mx-auto">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-teal-950/80 via-setu-card to-slate-900 border-2 border-teal-500/40 text-center space-y-4 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Ready to Investigate?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Search any person, phone number, vehicle plate, bank account, or case docket to uncover hidden cross-jurisdiction criminal networks in seconds.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveView('graph')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold shadow-xl transition"
            >
              <Share2 className="w-4 h-4" />
              Enter Operational Network Graph
            </button>
            <button
              onClick={() => setActiveView('search')}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition"
            >
              <Search className="w-4 h-4 text-teal-400" />
              Search an Entity (Press /)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
