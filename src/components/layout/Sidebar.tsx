import React from 'react';
import { useApp, AppView } from '../../context/AppContext';
import {
  Shield,
  LayoutDashboard,
  Briefcase,
  Users,
  Network,
  Lightbulb,
  Clock,
  Pin,
  FileText,
  ShieldAlert,
  Keyboard,
  UserCheck,
} from 'lucide-react';

interface SidebarProps {
  onOpenShortcuts: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenShortcuts }) => {
  const {
    activeView,
    setActiveView,
    selectedCase,
    setCaseSelectModalOpen,
    aiInsights,
    workspaceCards,
    setReportModalOpen,
    currentRole,
  } = useApp();

  const navGroups: {
    title: string;
    items: {
      id: AppView | 'reports' | 'shortcuts';
      label: string;
      icon: React.ReactNode;
      badge?: string | number;
      adminOnly?: boolean;
      onClick?: () => void;
    }[];
  }[] = [
    {
      title: 'OVERVIEW',
      items: [
        {
          id: 'home',
          label: 'Dashboard',
          icon: <LayoutDashboard className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'INVESTIGATION',
      items: [
        {
          id: 'cases',
          label: 'Cases',
          icon: <Briefcase className="w-4 h-4" />,
        },
        {
          id: 'search',
          label: 'Entities',
          icon: <Users className="w-4 h-4" />,
        },
        {
          id: 'graph',
          label: 'Network Analysis',
          icon: <Network className="w-4 h-4" />,
        },
        {
          id: 'insights',
          label: 'Insights',
          icon: <Lightbulb className="w-4 h-4" />,
          badge: aiInsights.length > 0 ? aiInsights.length : undefined,
        },
        {
          id: 'timeline',
          label: 'Timeline',
          icon: <Clock className="w-4 h-4" />,
        },
      ],
    },
    {
      title: 'WORKSPACE',
      items: [
        {
          id: 'workspace',
          label: 'Pinboard',
          icon: <Pin className="w-4 h-4" />,
          badge: workspaceCards.length > 0 ? workspaceCards.length : undefined,
        },
      ],
    },
    {
      title: 'OUTPUT',
      items: [
        {
          id: 'reports',
          label: 'Reports & Dossier',
          icon: <FileText className="w-4 h-4" />,
          onClick: () => setReportModalOpen(true),
        },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        {
          id: 'audit-log',
          label: 'Audit Log',
          icon: <ShieldAlert className="w-4 h-4" />,
          adminOnly: true,
        },
        {
          id: 'shortcuts',
          label: 'Shortcuts / Help',
          icon: <Keyboard className="w-4 h-4" />,
          onClick: onOpenShortcuts,
        },
      ],
    },
  ];

  return (
    <aside className="w-60 shrink-0 bg-[#0B0F17] border-r border-slate-800/80 flex flex-col h-screen select-none no-print">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-md bg-teal-950 border border-teal-700/60 flex items-center justify-center text-teal-400 group-hover:border-teal-400 transition">
            <Shield className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-wider text-white font-sans">SETU</span>
              <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-800 text-slate-400">
                v2.4
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-sans tracking-tight">
              Intelligence Platform
            </p>
          </div>
        </button>
      </div>

      {/* Current Investigation Docket Widget */}
      <div className="p-3 border-b border-slate-800/80 bg-[#0E1420]/80">
        <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Active Case
          </span>
          <button
            onClick={() => setCaseSelectModalOpen(true)}
            className="text-teal-400 hover:text-teal-300 transition text-[10px] underline font-sans cursor-pointer"
          >
            Switch
          </button>
        </div>
        <div
          onClick={() => setActiveView('cases')}
          className="p-2 rounded-md bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition cursor-pointer group"
          title="Click to view full case overview"
        >
          <div className="text-xs font-semibold text-white group-hover:text-teal-300 transition truncate">
            {selectedCase.firNumber}
          </div>
          <div className="text-[11px] text-slate-400 truncate mt-0.5 font-sans">
            {selectedCase.title}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navGroups.map(group => {
          const visibleItems = group.items.filter(
            item => !item.adminOnly || currentRole.permissions.canViewAuditLogs
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title} className="space-y-1">
              <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                {group.title}
              </div>
              {visibleItems.map(item => {
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick();
                      } else {
                        setActiveView(item.id as AppView);
                      }
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition cursor-pointer ${
                      isActive
                        ? 'bg-slate-800 text-white font-semibold'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isActive ? 'text-teal-400' : 'text-slate-500'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                          isActive
                            ? 'bg-teal-950 text-teal-300 border border-teal-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Officer & Role Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#0E1420]/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 truncate">
          <div className="w-7 h-7 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
            <UserCheck className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <div className="truncate">
            <div className="text-white text-[11px] font-semibold truncate leading-tight">
              {currentRole.title}
            </div>
            <div className="text-[10px] text-slate-400 truncate leading-tight font-mono">
              {currentRole.badge}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
