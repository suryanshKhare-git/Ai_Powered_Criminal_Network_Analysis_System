import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './components/home/HomePage';
import { CaseManagementView } from './components/cases/CaseManagementView';
import { UniversalSearch } from './components/search/UniversalSearch';
import { NetworkGraphView } from './components/graph/NetworkGraphView';
import { InvestigationInsightsView } from './components/insights/InvestigationInsightsView';
import { EntityProfileView } from './components/entity/EntityProfileView';
import { TimelineView } from './components/timeline/TimelineView';
import { CaseWorkspace } from './components/workspace/CaseWorkspace';
import { AuditLogView } from './components/audit/AuditLogView';
import { EvidenceSourceModal } from './components/common/EvidenceSourceModal';
import { KeyboardShortcutsModal } from './components/common/KeyboardShortcutsModal';
import { CaseSelectModal } from './components/common/CaseSelectModal';
import { AddDataModal } from './components/common/AddDataModal';
import { ExportDossierModal } from './components/workspace/ExportDossierModal';
import { AnalysisProcessModal } from './components/common/AnalysisProcessModal';
import { ScoringMethodologyModal } from './components/common/ScoringMethodologyModal';

const MainContent: React.FC = () => {
  const {
    activeView,
    setActiveView,
    selectEntity,
    selectEdge,
    closeEvidenceModal,
    setCaseSelectModalOpen,
    setAddDataModalOpen,
    setReportModalOpen,
    setMethodologyModalOpen,
    setAnalysisModalOpen,
  } = useApp();

  const [shortcutsOpen, setShortcutsOpen] = useState<boolean>(false);

  // Global Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      const isInput = targetTag === 'input' || targetTag === 'textarea' || (e.target as HTMLElement)?.isContentEditable;

      if (e.key === 'Escape') {
        selectEntity(null);
        selectEdge(null);
        closeEvidenceModal();
        setCaseSelectModalOpen(false);
        setAddDataModalOpen(false);
        setReportModalOpen(false);
        setMethodologyModalOpen(false);
        setAnalysisModalOpen(false);
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
          setActiveView('cases');
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveView('search');
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveView('graph');
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveView('timeline');
        } else if (e.key === '5') {
          e.preventDefault();
          setActiveView('workspace');
        } else if (e.key === '6') {
          e.preventDefault();
          setActiveView('audit-log');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectEntity,
    selectEdge,
    closeEvidenceModal,
    setActiveView,
    setCaseSelectModalOpen,
    setAddDataModalOpen,
    setReportModalOpen,
    setMethodologyModalOpen,
    setAnalysisModalOpen,
  ]);

  return (
    <div className="h-screen flex overflow-hidden bg-[#0B0F17] text-slate-100 font-sans">
      {/* Enterprise Left Sidebar */}
      <Sidebar onOpenShortcuts={() => setShortcutsOpen(true)} />

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Slim Top Context Bar */}
        <Header />

        {/* Dynamic Screen Views */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {activeView === 'home' && <HomePage />}
          {activeView === 'cases' && <CaseManagementView />}
          {activeView === 'search' && <UniversalSearch />}
          {activeView === 'graph' && <NetworkGraphView />}
          {activeView === 'insights' && <InvestigationInsightsView />}
          {activeView === 'timeline' && <TimelineView />}
          {activeView === 'workspace' && <CaseWorkspace />}
          {activeView === 'entity-profile' && <EntityProfileView />}
          {activeView === 'audit-log' && <AuditLogView />}
        </main>
      </div>

      {/* Global Modals */}
      <EvidenceSourceModal />
      <KeyboardShortcutsModal
        isOpen={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
      <CaseSelectModal />
      <AddDataModal />
      <ExportDossierModal />
      <AnalysisProcessModal />
      <ScoringMethodologyModal />
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
