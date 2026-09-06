import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { HomePage } from './components/home/HomePage';
import { UniversalSearch } from './components/search/UniversalSearch';
import { NetworkGraphView } from './components/graph/NetworkGraphView';
import { EntityProfileView } from './components/entity/EntityProfileView';
import { TimelineView } from './components/timeline/TimelineView';
import { CaseWorkspace } from './components/workspace/CaseWorkspace';
import { AuditLogView } from './components/audit/AuditLogView';
import { EvidenceSourceModal } from './components/common/EvidenceSourceModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';

const MainContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectEntity,
    selectEdge,
    closeEvidenceModal,
  } = useApp();

  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea' || (e.target as HTMLElement)?.isContentEditable;

      if (e.key === 'Escape') {
        selectEntity(null);
        selectEdge(null);
        closeEvidenceModal();
        setShortcutsOpen(false);
        return;
      }

      if (e.key === '?' && !isInput) {
        e.preventDefault();
        setShortcutsOpen(prev => !prev);
        return;
      }

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        setActiveView('search');
        return;
      }

      // Alt key navigations
      if (e.altKey) {
        if (e.key === '0' || e.key.toLowerCase() === 'h') {
          e.preventDefault();
          setActiveView('home');
        } else if (e.key === '1') {
          e.preventDefault();
          setActiveView('search');
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveView('graph');
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveView('timeline');
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveView('workspace');
        } else if (e.key === '5') {
          e.preventDefault();
          setActiveView('entity-profile');
        } else if (e.key === '6') {
          e.preventDefault();
          setActiveView('audit-log');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectEntity, selectEdge, closeEvidenceModal, setActiveView]);

  return (
    <div className="min-h-screen flex flex-col bg-setu-bg text-setu-text transition-colors duration-200">
      {/* Top Header with RBAC & Jurisdiction */}
      <Header onOpenShortcuts={() => setShortcutsOpen(true)} />

      {/* Main Tabbed Navigation */}
      <Navigation />

      {/* Screen Views */}
      <main className="flex-1 flex flex-col">
        {activeView === 'home' && <HomePage />}
        {activeView === 'search' && <UniversalSearch />}
        {activeView === 'graph' && <NetworkGraphView />}
        {activeView === 'timeline' && <TimelineView />}
        {activeView === 'workspace' && <CaseWorkspace />}
        {activeView === 'entity-profile' && <EntityProfileView />}
        {activeView === 'audit-log' && <AuditLogView />}
      </main>

      {/* Global Modals */}
      <EvidenceSourceModal />
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
