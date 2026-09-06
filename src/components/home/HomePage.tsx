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
  Activity,
  Cpu,
  FolderLock,
  AlertTriangle,
  FileSpreadsheet,
  Check,
  Terminal,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { setActiveView, selectEntity, caseOverview } = useApp();

  const handleLaunchCaseStudy = () => {
    selectEntity('ent-person-1');
    setActiveView('graph');
  };

  return (
    <div className="flex-1 overflow-y-auto bg-setu-bg text-setu-text select-none pb-16">
      {/* 1. INSTITUTIONAL TELEMETRY & STATUS BANNER */}
      <div className="border-b border-setu-border bg-setu-surface/90 px-4 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 inline-block" />
            <span className="text-slate-300 font-semibold tracking-wider uppercase">
              OPERATIONAL BRIEFING CONSOLE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-setu-textMuted hidden sm:inline">
              SYSTEM MANDATE: EXPLAINABLE RECORD LINKAGE & ENTITY RESOLUTION
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SECTION 65B IEA / 63 BSA COMPLIANT
            </span>
            <span className="text-slate-600 hidden md:inline">|</span>
            <span className="hidden md:inline text-slate-400 font-mono">
              TAMPER-EVIDENT AUDIT SEAL ACTIVE
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* 2. HEADER & OPERATIONAL MANDATE */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-setu-border pb-6">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono text-teal-400 font-semibold mb-1">
                <Shield className="w-4 h-4" />
                <span>CENTRALIZED INTELLIGENCE & RECORD RESOLUTION PLATFORM</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans uppercase">
                SETU <span className="text-teal-400 font-normal font-mono text-xl sm:text-2xl ml-1">सेतु</span>
                <span className="text-sm font-normal text-slate-400 font-mono ml-3 border-l border-slate-700 pl-3">
                  v2.4-XAI
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
                Multi-agency investigative record correlation engine. Connects isolated police databases into an explainable entity graph with human oversight.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setActiveView('search')}
                className="flex items-center gap-2 px-4 py-2 rounded bg-setu-card hover:bg-slate-800 border border-setu-borderLight text-slate-200 text-xs font-semibold font-mono transition"
              >
                <Search className="w-3.5 h-3.5 text-teal-400" />
                <span>UNIVERSAL SEARCH</span>
                <kbd className="px-1.5 py-0.2 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-400">
                  /
                </kbd>
              </button>

              <button
                onClick={() => setActiveView('graph')}
                className="flex items-center gap-2 px-4 py-2 rounded bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold font-mono shadow-sm transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>LAUNCH GRAPH CONSOLE</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Institutional Operating Directive Box */}
          <div className="bg-setu-surface border border-setu-border rounded-lg p-5">
            <div className="flex items-center justify-between border-b border-setu-border/80 pb-2.5 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400 font-semibold tracking-wider uppercase">
                <Terminal className="w-4 h-4 text-teal-400" />
                SYSTEM MANDATE & OPERATIONAL PROTOCOL
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                DIRECTIVE REF: MHA/LEA-INTEL/2024
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
              "<strong>SETU</strong> connects fragmented, siloed crime records (<strong>FIRs</strong>, <strong>CDRs</strong>, <strong>financial data</strong>, <strong>vehicle registries</strong>, <strong>surveillance logs</strong>) into a single explainable network graph, so an authorized investigator can search any entity — a person, phone number, vehicle, location, organization, or case — and instantly see how it relates to everything else, with a plain-language explanation for every connection and full human oversight before any conclusion is acted on."
            </p>
            <div className="mt-3 pt-3 border-t border-setu-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-amber-400 font-semibold">
                LEGAL NOTICE: Machine associations are classified as "Investigative Leads" and do not constitute self-proving evidence.
              </span>
              <span>HUMAN INVESTIGATOR SIGN-OFF MANDATORY PRIOR TO CHARGESHEET</span>
            </div>
          </div>
        </div>

        {/* 3. MULTI-SOURCE INGESTION TELEMETRY STRIP */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-teal-400" />
              Live Ingestion Connectors & Canonical Repositories
            </h2>
            <span className="text-[11px] font-mono text-emerald-400">
              5/5 CONNECTORS OPERATIONAL
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                source: 'CCTNS FIR Store',
                type: 'First Information Reports',
                records: '14,820 dockets',
                latency: '42ms',
                status: 'ONLINE',
                icon: <FileText className="w-4 h-4 text-cyan-400" />,
              },
              {
                source: 'Telecom Gateway',
                type: 'CDR / IPDR / Cell Azimuth',
                records: '184,200 events',
                latency: '68ms',
                status: 'ONLINE',
                icon: <Phone className="w-4 h-4 text-teal-400" />,
              },
              {
                source: 'MoRTH Vahan & FASTag',
                type: 'Vehicle & Toll Passage',
                records: '9,410 passages',
                latency: '35ms',
                status: 'ONLINE',
                icon: <Truck className="w-4 h-4 text-amber-400" />,
              },
              {
                source: 'FIU Financial Feeds',
                type: 'Bank RTGS & Cash Alerts',
                records: '3,120 tx lines',
                latency: '51ms',
                status: 'ONLINE',
                icon: <CreditCard className="w-4 h-4 text-emerald-400" />,
              },
              {
                source: 'Surveillance Feeds',
                type: 'CCTV ANPR / Geo Logs',
                records: '890 captures',
                latency: '29ms',
                status: 'ONLINE',
                icon: <MapPin className="w-4 h-4 text-indigo-400" />,
              },
            ].map((feed, idx) => (
              <div
                key={idx}
                className="bg-setu-surface border border-setu-border rounded-md p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded bg-setu-card border border-setu-border">
                    {feed.icon}
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                    {feed.status}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 truncate">{feed.source}</div>
                  <div className="text-[11px] text-setu-textMuted truncate">{feed.type}</div>
                </div>
                <div className="pt-1.5 border-t border-setu-border/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>{feed.records}</span>
                  <span className="text-slate-500">{feed.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. ACTIVE PRIMARY INVESTIGATION DOCKET */}
        <div className="bg-setu-surface border border-setu-border rounded-lg p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-setu-border pb-3">
            <div className="flex items-center gap-2.5">
              <FolderLock className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">
                  ACTIVE CASE FILE IN CONSOLE
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white font-sans">
                  {caseOverview.title} — {caseOverview.firNumber}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-1 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300 font-semibold">
                PRIORITY: HIGH / INTER-STATE
              </span>
              <button
                onClick={handleLaunchCaseStudy}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-semibold font-mono transition"
              >
                <span>LOAD CASE GRAPH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-3 rounded bg-setu-card border border-setu-border space-y-1">
              <div className="text-setu-textMuted text-[10px] uppercase">Jurisdiction & Unit</div>
              <div className="text-slate-200 font-medium font-sans">{caseOverview.jurisdiction}</div>
              <div className="text-[11px] text-slate-400">Investigating Officer: Badges #4120 / #1088</div>
            </div>

            <div className="p-3 rounded bg-setu-card border border-setu-border space-y-1">
              <div className="text-setu-textMuted text-[10px] uppercase">Incident Timestamp & Sections</div>
              <div className="text-slate-200 font-sans">{caseOverview.incidentDate}</div>
              <div className="text-[11px] text-slate-400 truncate">{caseOverview.sections.join(', ')}</div>
            </div>

            <div className="p-3 rounded bg-setu-card border border-setu-border space-y-1">
              <div className="text-setu-textMuted text-[10px] uppercase">Cross-Border Leads</div>
              <div className="text-amber-300 font-semibold">2 Unreviewed Algorithmic Leads</div>
              <div className="text-[11px] text-slate-400">Matches Cyberabad FIR #118/2023 via shared decoy vehicle</div>
            </div>
          </div>

          <div className="bg-[#05080F] border border-setu-border/80 rounded p-3 text-xs font-sans text-slate-300 leading-relaxed">
            <strong className="text-white font-mono text-xs uppercase mr-2">Case Summary:</strong>
            Armed hijack of gold transit consignment on Yamuna Expressway. Mastermind operated via encrypted burner MSISDN. Vehicle registry correlation and cell tower azimuth overlap resolved decoy vehicle passages and hawala account routing across three state jurisdictions.
          </div>
        </div>

        {/* 5. OPERATIONAL WORKSTATIONS (TACTICAL DISPATCH MATRIX) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-setu-border pb-2">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <LayoutGrid className="w-3.5 h-3.5 text-teal-400" />
                Investigative Workstations
              </h2>
              <p className="text-xs text-setu-textMuted font-sans">
                Select an operational console to begin record correlation or case analysis.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">6 TOOLS READY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Workstation 1: Universal Search */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-teal-950 border border-teal-600/50 text-teal-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <span>UNIVERSAL ENTITY RESOLVER</span>
                  </div>
                  <kbd className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-400">
                    KEY: /
                  </kbd>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Accepts MSISDNs, IMEIs, vehicle registration plates, bank account numbers, aliases, or FIR case numbers with heuristic type detection.
                </p>
              </div>
              <button
                onClick={() => setActiveView('search')}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Open Universal Search</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Workstation 2: Network Topology Graph */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-teal-950 border border-teal-600/50 text-teal-400">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span>TOPOLOGY LINK GRAPH</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 border border-amber-800 text-amber-300">
                    2 LEADS
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Interactive multi-hop network graph rendered at 60 FPS on HTML5 Canvas. Inspect grounded plain-language explanations for every connection.
                </p>
              </div>
              <button
                onClick={() => setActiveView('graph')}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Launch Link Graph</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Workstation 3: Spatio-Temporal Timeline */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-teal-950 border border-teal-600/50 text-teal-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <span>TEMPORAL SIGNAL TIMELINE</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-400">
                    5 LANES
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Multi-lane chronological tracking of telephony call bursts, tower azimuth handovers, highway FASTag toll crossings, and bank transfers.
                </p>
              </div>
              <button
                onClick={() => setActiveView('timeline')}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Open Timeline View</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Workstation 4: Case Workspace & Dossier Export */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-teal-950 border border-teal-600/50 text-teal-400">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <span>EVIDENCE PINBOARD & DOSSIER</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">
                    SEC 65B/63 BSA
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Curate pinned entities and verified leads into investigation columns. Export court-ready judicial dossiers with digital signatures.
                </p>
              </div>
              <button
                onClick={() => setActiveView('workspace')}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Access Case Workspace</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Workstation 5: Subject Profiles */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-teal-950 border border-teal-600/50 text-teal-400">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <span>360° ENTITY PROFILES</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-900 border border-slate-700 text-slate-400">
                    12 ENTITIES
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Deep dossier view showing identifier tokens, connected FIR records, communication timelines, and linked associates for any entity.
                </p>
              </div>
              <button
                onClick={() => {
                  selectEntity('ent-person-1');
                  setActiveView('entity-profile');
                }}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Inspect Suspect Profile</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Workstation 6: WORM Cryptographic Audit Log */}
            <div className="bg-setu-surface border border-setu-border rounded-lg p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                    <div className="p-1.5 rounded bg-slate-900 border border-slate-700 text-amber-400">
                      <ShieldAlert className="w-4 h-4" />
                    </div>
                    <span>CRYPTOGRAPHIC AUDIT VAULT</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-red-950/80 border border-red-800 text-red-300">
                    RBAC GATED
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  Append-only, SHA-256 HMAC hash-chained ledger. Logs every officer search, graph view, lead review, and dossier export with non-repudiation.
                </p>
              </div>
              <button
                onClick={() => setActiveView('audit-log')}
                className="w-full py-1.5 px-3 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-xs font-mono font-semibold text-teal-300 hover:text-white flex items-center justify-between transition"
              >
                <span>Inspect Audit Ledger</span>
                <ChevronRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>
          </div>
        </div>

        {/* 6. TECHNICAL RESOLUTION PROTOCOL (DATA MATRIX) */}
        <div className="bg-setu-surface border border-setu-border rounded-lg p-5 space-y-4">
          <div className="border-b border-setu-border pb-2">
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
              Entity Resolution Protocol & Grounding Standards
            </h2>
            <p className="text-xs text-setu-textMuted font-sans">
              Objective technical matching tiers used to correlate identities across disparate police databases.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded bg-setu-card/70 border border-setu-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-teal-300">
                <span>TIER 1: DETERMINISTIC MATCH</span>
                <span className="text-[10px] text-emerald-400">100% REGISTRY</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Exact matches on high-entropy unique identifiers: MSISDN (+91-E.164), 15-digit IMEI, FASTag EPC tokens, Vehicle registration plates, Bank account numbers.
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-setu-border/60">
                Evidentiary Weight: Official Registry Record
              </div>
            </div>

            <div className="p-3.5 rounded bg-setu-card/70 border border-setu-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-300">
                <span>TIER 2: PHONETIC & ALIAS MATCH</span>
                <span className="text-[10px] text-amber-400">SCORE ≥ 0.82</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Jaro-Winkler string similarity combined with police alias dictionaries and jurisdictional overlap to match phonetic variants of suspect names across state FIRs.
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-setu-border/60">
                Evidentiary Weight: Probabilistic Lead (Needs Corroboration)
              </div>
            </div>

            <div className="p-3.5 rounded bg-setu-card/70 border border-setu-border space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-300">
                <span>TIER 3: SPATIO-TEMPORAL OVERLAP</span>
                <span className="text-[10px] text-cyan-400">Δt ≤ 15m / R ≤ 500m</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Cell tower azimuth sector triangulation and highway toll sensor timestamps correlating physical co-presence during the crime execution window.
              </p>
              <div className="text-[10px] font-mono text-slate-400 pt-1 border-t border-setu-border/60">
                Evidentiary Weight: Circumstantial Co-Location Lead
              </div>
            </div>
          </div>
        </div>

        {/* 7. STATUTORY EVIDENTIARY SAFEGUARDS */}
        <div className="border border-setu-border rounded-lg p-5 bg-[#05080F] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase">
            <CheckCircle2 className="w-4 h-4" />
            <span>Statutory Evidentiary Safeguards (IEA Sec 65B / BSA Sec 63 Compliance)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded bg-setu-surface/60 border border-setu-border/60 space-y-1">
              <strong className="text-white font-mono block">1. Lead-Only Inferences</strong>
              <p className="text-slate-400 leading-relaxed">
                Algorithmic outputs are labeled strictly as "Lead (Possible Connection)". Never framed as "confirmed match" or guilt.
              </p>
            </div>

            <div className="p-2.5 rounded bg-setu-surface/60 border border-setu-border/60 space-y-1">
              <strong className="text-white font-mono block">2. Dual Confidence Rating</strong>
              <p className="text-slate-400 leading-relaxed">
                Displays qualitative confidence bands alongside numeric ranges to prevent false mathematical certainty in court.
              </p>
            </div>

            <div className="p-2.5 rounded bg-setu-surface/60 border border-setu-border/60 space-y-1">
              <strong className="text-white font-mono block">3. Grounded Citations</strong>
              <p className="text-slate-400 leading-relaxed">
                Every generated explanation cites exact document line items and certified electronic exhibits for judicial inspection.
              </p>
            </div>

            <div className="p-2.5 rounded bg-setu-surface/60 border border-setu-border/60 space-y-1">
              <strong className="text-white font-mono block">4. Non-Repudiation WORM</strong>
              <p className="text-slate-400 leading-relaxed">
                Officer decisions are sealed into an append-only SHA-256 HMAC ledger to establish an untampered chain of custody.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
