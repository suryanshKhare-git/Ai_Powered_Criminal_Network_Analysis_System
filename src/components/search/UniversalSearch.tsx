import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { EntityType, Entity } from '../../types';
import {
  Search,
  User,
  Phone,
  Truck,
  CreditCard,
  MapPin,
  FileText,
  ArrowRight,
  Pin,
  Share2,
  ExternalLink,
  Cpu,
  Filter,
} from 'lucide-react';

export const UniversalSearch: React.FC = () => {
  const {
    entities,
    searchQuery,
    setSearchQuery,
    setActiveView,
    viewEntityProfile,
    selectEntity,
    pinToWorkspace,
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Auto-detect entity type heuristic based on query string
  const detectedTypeSuggestion = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;

    if (/^(\+91|91)?[6-9]\d{2,}/.test(q) || /^\d{10,15}$/.test(q)) {
      return {
        type: 'phone' as EntityType,
        label: 'Detected: Telephony MSISDN / CDR Record',
        icon: <Phone className="w-3.5 h-3.5 text-teal-400" />,
      };
    }
    if (/^(dl|hr|up|mh|ka|gj|pb)[0-9a-z\s-]{2,}/i.test(q)) {
      return {
        type: 'vehicle' as EntityType,
        label: 'Detected: Vehicle Registration / Vahan Plate',
        icon: <Truck className="w-3.5 h-3.5 text-amber-400" />,
      };
    }
    if (q.startsWith('fir') || q.startsWith('case') || q.startsWith('gd')) {
      return {
        type: 'case' as EntityType,
        label: 'Detected: Police FIR / Criminal Docket ID',
        icon: <FileText className="w-3.5 h-3.5 text-blue-400" />,
      };
    }
    if (q.includes('hdfc') || q.includes('axis') || q.includes('a/c') || q.includes('bank') || /^\d{6,}/.test(q)) {
      return {
        type: 'account' as EntityType,
        label: 'Detected: Financial Bank Account / Hawala Ledger',
        icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" />,
      };
    }
    if (q.includes('sector') || q.includes('toll') || q.includes('plaza') || q.includes('chowk') || q.includes('road')) {
      return {
        type: 'location' as EntityType,
        label: 'Detected: Geographic Location / Cell Tower Zone',
        icon: <MapPin className="w-3.5 h-3.5 text-purple-400" />,
      };
    }
    return {
      type: 'person' as EntityType,
      label: 'Target Query: Name / Known Alias / Subject',
      icon: <User className="w-3.5 h-3.5 text-cyan-400" />,
    };
  }, [searchQuery]);

  // Filter entities
  const filteredEntities = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return entities.filter(entity => {
      // Category filter
      if (selectedCategory !== 'all' && entity.type !== selectedCategory) {
        return false;
      }
      if (!q) return true;

      // Text matches across name, identifier, summary, aliases, tags
      const matchName = entity.name.toLowerCase().includes(q);
      const matchId = entity.primaryIdentifier.toLowerCase().includes(q);
      const matchSummary = entity.summary.toLowerCase().includes(q);
      const matchAliases = entity.aliases?.some(a => a.toLowerCase().includes(q)) ?? false;
      const matchTags = entity.tags.some(t => t.toLowerCase().includes(q));

      return matchName || matchId || matchSummary || matchAliases || matchTags;
    });
  }, [entities, searchQuery, selectedCategory]);

  const getEntityIcon = (type: EntityType) => {
    switch (type) {
      case 'person':
        return <User className="w-4 h-4 text-cyan-400" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-teal-400" />;
      case 'vehicle':
        return <Truck className="w-4 h-4 text-amber-400" />;
      case 'account':
        return <CreditCard className="w-4 h-4 text-emerald-400" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-purple-400" />;
      case 'case':
        return <FileText className="w-4 h-4 text-blue-400" />;
    }
  };

  const getBadgeStyle = (type: EntityType) => {
    switch (type) {
      case 'person':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60';
      case 'phone':
        return 'bg-teal-950/60 text-teal-300 border-teal-800/60';
      case 'vehicle':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/60';
      case 'account':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60';
      case 'location':
        return 'bg-purple-950/60 text-purple-300 border-purple-800/60';
      case 'case':
        return 'bg-blue-950/60 text-blue-300 border-blue-800/60';
    }
  };

  const handleInspectOnGraph = (entityId: string) => {
    selectEntity(entityId);
    setActiveView('graph');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 animate-fadeIn">
      {/* Search Header and Big Search Box */}
      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Search className="w-5 h-5 text-teal-400" />
            Universal Entity Search
          </h2>
          <p className="text-xs text-setu-textMuted">
            Query across fragmented FIRs, Call Detail Records (CDRs), Vahan vehicle registries, banking transactions, and surveillance logs.
          </p>
        </div>

        {/* Primary Omnibox Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-teal-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by suspect name, phone (+91), vehicle plate (DL-01), bank A/C, location, or case ID..."
            className="w-full pl-12 pr-28 py-3.5 bg-setu-surface border-2 border-setu-border focus:border-teal-500 rounded-lg text-sm text-white placeholder-slate-500 shadow-xl focus:outline-none transition font-sans"
            autoFocus
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs px-2 py-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition"
              >
                Clear
              </button>
            )}
            <kbd className="px-2 py-1 text-[11px] font-mono text-slate-400 bg-slate-900 rounded border border-slate-700 hidden sm:inline-block">
              ESC to clear
            </kbd>
          </div>
        </div>

        {/* Auto-detected Entity Suggestion Banner */}
        {detectedTypeSuggestion && searchQuery.trim().length > 1 && (
          <div className="flex items-center justify-between px-3.5 py-2 rounded-md bg-slate-900/90 border border-setu-border text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-setu-textMuted">Auto-classifier:</span>
              <span className="flex items-center gap-1.5 font-medium text-teal-300">
                {detectedTypeSuggestion.icon}
                {detectedTypeSuggestion.label}
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              Matches: {filteredEntities.length} entities
            </span>
          </div>
        )}

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 text-xs">
          <span className="text-setu-textMuted text-xs flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {[
            { id: 'all', label: `All Entities (${entities.length})` },
            { id: 'person', label: `Persons (${entities.filter(e => e.type === 'person').length})` },
            { id: 'phone', label: `CDRs / Phones (${entities.filter(e => e.type === 'phone').length})` },
            { id: 'vehicle', label: `Vehicles (${entities.filter(e => e.type === 'vehicle').length})` },
            { id: 'account', label: `Financials (${entities.filter(e => e.type === 'account').length})` },
            { id: 'location', label: `Locations (${entities.filter(e => e.type === 'location').length})` },
            { id: 'case', label: `Cases (${entities.filter(e => e.type === 'case').length})` },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition whitespace-nowrap border ${
                selectedCategory === cat.id
                  ? 'bg-teal-950 border-teal-500 text-teal-300 shadow-sm'
                  : 'bg-setu-card border-setu-border text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-setu-textMuted px-1">
          <span>Search Results ({filteredEntities.length})</span>
          <span className="font-mono text-[11px]">Strict Chain of Custody Maintained</span>
        </div>

        {filteredEntities.length === 0 ? (
          <div className="p-12 text-center bg-setu-surface border border-setu-border rounded-lg space-y-2">
            <Search className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm text-slate-300 font-medium">No matching entities found in current case repository</p>
            <p className="text-xs text-setu-textMuted">
              Try searching by phone digits (+91 98110...), vehicle plate (DL-01...), suspect name (Vikram), or bank A/C.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {filteredEntities.map(entity => (
              <div
                key={entity.id}
                className="bg-setu-surface hover:bg-setu-card border border-setu-border hover:border-setu-borderLight rounded-lg p-4 transition-all duration-200 shadow-sm group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  {/* Entity Icon & Identification */}
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-setu-card border border-setu-border shrink-0 mt-0.5">
                      {getEntityIcon(entity.type)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold text-white group-hover:text-teal-300 transition">
                          {entity.name}
                        </span>

                        <span className={`px-2 py-0.5 rounded text-[11px] font-mono border ${getBadgeStyle(entity.type)}`}>
                          {entity.categoryLabel}
                        </span>

                        <span className="text-xs font-mono text-setu-textMuted px-2 py-0.5 bg-slate-900/60 rounded border border-slate-800">
                          {entity.primaryIdentifier}
                        </span>
                      </div>

                      {entity.aliases && entity.aliases.length > 0 && (
                        <div className="text-xs text-setu-textMuted flex items-center gap-1.5">
                          <span className="text-slate-500">Aliases / Mapped Identifiers:</span>
                          <span className="text-slate-300 font-mono">
                            {entity.aliases.join(', ')}
                          </span>
                        </div>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                        {entity.summary}
                      </p>

                      {/* Risk Indicator if present */}
                      {entity.riskIndicator && (
                        <div className="text-[11px] text-amber-400/90 flex items-center gap-1 font-mono pt-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Intelligence Flag: {entity.riskIndicator}</span>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {entity.tags.map(t => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-400"
                          >
                            #{t}
                          </span>
                        ))}
                        <span className="text-[10px] font-mono text-slate-500 self-center ml-1">
                          Sighted: {entity.lastSighted}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-end gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-setu-border/50">
                    <button
                      onClick={() => viewEntityProfile(entity.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-teal-950/60 hover:bg-teal-900/80 border border-teal-500/50 text-xs font-medium text-teal-300 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Profile
                    </button>

                    <button
                      onClick={() => handleInspectOnGraph(entity.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition"
                    >
                      <Share2 className="w-3.5 h-3.5 text-teal-400" />
                      View on Graph
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
                          confidence: 'Subject of Interest',
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-amber-400/90 hover:text-amber-300 transition"
                      title="Pin to Investigation Pinboard"
                    >
                      <Pin className="w-3.5 h-3.5" />
                      Pin to Case
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
