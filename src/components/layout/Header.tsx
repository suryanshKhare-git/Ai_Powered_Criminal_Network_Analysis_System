import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { USER_ROLES } from '../../data/mockDataset';
import {
  FolderLock,
  Search,
  RotateCcw,
  Tv,
  X,
  ChevronDown,
} from 'lucide-react';

interface HeaderProps {
  onOpenShortcuts?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const {
    currentRole,
    setRole,
    selectedCase,
    setActiveView,
    setCaseSelectModalOpen,
    resetDemo,
    isPresentationMode,
    togglePresentationMode,
    demoToastMessage,
    clearDemoToast,
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  return (
    <header className="h-12 w-full bg-[#0E1420] border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between gap-4 select-none no-print">
      {/* Left: Active Case Scope Context */}
      <div className="flex items-center gap-2.5 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <FolderLock className="w-3.5 h-3.5 text-teal-400" />
          {selectedCase ? (
            <>
              <span className="font-mono font-semibold text-white">
                {selectedCase.firNumber}
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300 font-medium truncate max-w-[200px] sm:max-w-[320px]">
                {selectedCase.title}
              </span>
            </>
          ) : (
            <span className="text-slate-400 font-sans">No investigation selected</span>
          )}
        </div>

        <button
          onClick={() => setCaseSelectModalOpen(true)}
          className="px-2 py-0.5 rounded text-[11px] font-sans text-teal-400 hover:text-teal-300 hover:bg-slate-800/80 transition cursor-pointer"
        >
          {selectedCase ? 'Change Case' : 'Select Case'}
        </button>
      </div>

      {/* Right Controls: Quick Search, Presentation Mode, Reset, Role */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Universal Search Hint Button */}
        <button
          onClick={() => setActiveView('search')}
          className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer"
          title="Jump to Universal Search (or press /)"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span>Search entities...</span>
          <kbd className="px-1 text-[10px] font-mono bg-slate-800 rounded text-slate-400">
            /
          </kbd>
        </button>

        {/* Demo Mode Toggle: PRESENT */}
        <button
          onClick={togglePresentationMode}
          className={`flex items-center gap-1.5 h-7 px-2.5 rounded text-xs font-mono transition cursor-pointer ${
            isPresentationMode
              ? 'bg-amber-600 text-white font-bold'
              : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
          }`}
          title="Toggle Large Typography & Canvas Scaling for Presentation Display"
        >
          <Tv className="w-3 h-3" />
          <span>{isPresentationMode ? 'PRESENT ON' : 'PRESENT'}</span>
        </button>

        {/* Quick Reset Button */}
        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 h-7 px-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition cursor-pointer border border-slate-700"
          title="Reset Demo Dataset to Baseline"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(prev => !prev)}
            className="flex items-center gap-1.5 h-7 px-2.5 rounded bg-slate-800 border border-slate-700 text-xs text-slate-200 hover:bg-slate-700 transition cursor-pointer font-mono"
            title="Switch User Role"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            <span className="font-semibold text-[11px]">{currentRole.title.toUpperCase()}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-[#111827] border border-slate-800 rounded-md shadow-xl py-1 z-50">
              <div className="px-3 py-1 text-[10px] font-mono uppercase text-slate-500 border-b border-slate-800">
                Switch Operational Role
              </div>
              {USER_ROLES.map(r => (
                <button
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 transition cursor-pointer ${
                    r.id === currentRole.id ? 'text-teal-300 font-semibold bg-slate-900/60' : 'text-slate-300'
                  }`}
                >
                  <span>{r.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">{r.id.toUpperCase()}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Demo Toast if triggered */}
      {demoToastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-slate-900 border border-teal-500/60 rounded shadow-xl text-xs font-mono text-teal-300 animate-fadeIn">
          <span>{demoToastMessage}</span>
          <button onClick={clearDemoToast} className="text-slate-400 hover:text-white ml-1 cursor-pointer">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </header>
  );
};
