import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { USER_ROLES } from '../../data/mockDataset';
import {
  Shield,
  Sun,
  Moon,
  ChevronDown,
  FolderLock,
  Globe,
  HelpCircle,
  Search,
  CheckCircle2,
  Lock,
  AlertTriangle,
} from 'lucide-react';

interface HeaderProps {
  onOpenShortcuts: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenShortcuts }) => {
  const { currentRole, setRole, caseOverview, setActiveView } = useApp();
  const { theme, toggleTheme } = useTheme();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="w-full bg-setu-surface border-b border-setu-border select-none no-print">
      {/* Classification Banner */}
      <div className="bg-[#05080F] border-b border-setu-border/60 px-4 py-1 flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-teal-400/90 font-semibold">RESTRICTED // LAW ENFORCEMENT SENSITIVE</span>
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline">FOR AUTHORIZED INVESTIGATIVE USE ONLY</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span className="hidden md:inline">SYSTEM: SETU v2.4-XAI</span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            EVIDENTIARY CHAIN AUDIT ACTIVE
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand & Emblem (Clickable to Home) */}
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-3 shrink-0 text-left hover:opacity-90 transition group cursor-pointer"
          title="Return to Platform Overview"
        >
          <div className="w-9 h-9 rounded bg-teal-950/80 border border-teal-500/50 flex items-center justify-center text-teal-400 shadow-inner group-hover:border-teal-400 transition">
            <Shield className="w-5 h-5 text-teal-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-wider text-white font-sans uppercase group-hover:text-teal-300 transition">
                SETU <span className="text-teal-400 font-normal text-xs ml-1 tracking-normal font-mono">सेतु</span>
              </h1>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-950 border border-teal-800/60 text-teal-300 font-mono">
                XAI GRAPH
              </span>
            </div>
            <p className="text-[10px] text-setu-textMuted tracking-tight">
              Explainable Crime Network & Entity Resolution Engine
            </p>
          </div>
        </button>

        {/* Case Scope & Jurisdiction Bar */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-md bg-setu-card border border-setu-border/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300 font-medium">
            <FolderLock className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-setu-textMuted">Case:</span>
            <span className="text-white font-mono font-semibold">{caseOverview.firNumber}</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-setu-textMuted">Scope:</span>
            <span className="truncate max-w-[280px]">{caseOverview.jurisdiction}</span>
          </div>
        </div>

        {/* Controls, RBAC Role Badge & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Universal Search Quick Trigger Button */}
          <button
            onClick={() => setActiveView('search')}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/80 hover:bg-slate-800 border border-setu-border text-xs text-setu-textMuted hover:text-white transition"
            title="Search entities (Press /)"
          >
            <Search className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">Universal Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-mono text-slate-400">
              /
            </kbd>
          </button>

          {/* RBAC Role Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(prev => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-setu-card hover:bg-slate-800/80 border border-teal-500/40 text-xs text-white transition shadow-sm"
              title="Click to switch user role and test RBAC authorization"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400" />
              <div className="text-left">
                <div className="text-[10px] text-teal-400/90 uppercase font-mono tracking-wider font-semibold">
                  RBAC Gate
                </div>
                <div className="text-xs font-medium text-slate-200 truncate max-w-[160px] sm:max-w-[200px]">
                  {currentRole.badge}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-setu-surface border border-setu-borderLight rounded-md shadow-2xl z-50 p-1 divide-y divide-setu-border/50">
                <div className="px-3 py-2 text-[11px] text-setu-textMuted">
                  Switch Active Role (RBAC Simulation)
                </div>
                <div className="py-1">
                  {USER_ROLES.map(role => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setRole(role.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition flex flex-col gap-0.5 ${
                        currentRole.id === role.id
                          ? 'bg-teal-950/60 border border-teal-500/40 text-white'
                          : 'hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{role.title}</span>
                        {role.id === 'auditor' && (
                          <span className="text-[10px] font-mono px-1 rounded bg-amber-950 border border-amber-700 text-amber-300">
                            ADMIN ONLY
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-setu-textMuted font-mono">{role.badge}</span>
                      <span className="text-[10px] text-slate-500">{role.department}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-slate-300 hover:text-white transition"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Keyboard Shortcuts Guide */}
          <button
            onClick={onOpenShortcuts}
            className="p-2 rounded bg-setu-card hover:bg-slate-800 border border-setu-border text-slate-300 hover:text-white transition"
            title="Keyboard shortcuts (?)"
            aria-label="Shortcuts"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};
