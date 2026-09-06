import React, { createContext, useContext, useState } from 'react';
import {
  Entity,
  ConnectionEdge,
  TimelineEvent,
  RawSourceRecord,
  WorkspaceCard,
  UserRole,
  AuditLogEntry,
  CaseOverview,
  ReviewStatus,
} from '../types';
import {
  CURRENT_CASE,
  USER_ROLES,
  MOCK_ENTITIES,
  MOCK_EDGES,
  MOCK_TIMELINE,
  MOCK_RAW_RECORDS,
  INITIAL_WORKSPACE_CARDS,
} from '../data/mockDataset';
import { INITIAL_AUDIT_LOGS } from '../data/auditLogData';

export type AppView = 'home' | 'search' | 'graph' | 'timeline' | 'workspace' | 'entity-profile' | 'audit-log';

interface AppContextType {
  currentRole: UserRole;
  setRole: (roleId: string) => void;
  caseOverview: CaseOverview;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  entities: Entity[];
  edges: ConnectionEdge[];
  timeline: TimelineEvent[];
  rawRecords: RawSourceRecord[];
  workspaceCards: WorkspaceCard[];
  auditLogs: AuditLogEntry[];
  selectedEntityId: string | null;
  selectedEdgeId: string | null;
  activeProfileEntityId: string | null;
  inspectedRawRecord: RawSourceRecord | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectEntity: (id: string | null) => void;
  selectEdge: (id: string | null) => void;
  viewEntityProfile: (id: string) => void;
  updateEdgeReview: (edgeId: string, status: ReviewStatus, notes?: string) => void;
  pinToWorkspace: (card: Omit<WorkspaceCard, 'id' | 'pinnedAt' | 'pinnedBy'>) => void;
  updateWorkspaceCard: (id: string, updates: Partial<WorkspaceCard>) => void;
  removeWorkspaceCard: (id: string) => void;
  inspectEvidenceByDocRef: (docRefOrId: string) => void;
  closeEvidenceModal: () => void;
  logAuditAction: (action: string, target: string, category: AuditLogEntry['category'], legalBasis?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>(USER_ROLES[0]);
  const [caseOverview] = useState<CaseOverview>(CURRENT_CASE);
  const [activeView, setActiveView] = useState<AppView>('home');
  const [entities] = useState<Entity[]>(MOCK_ENTITIES);
  const [edges, setEdges] = useState<ConnectionEdge[]>(MOCK_EDGES);
  const [timeline] = useState<TimelineEvent[]>(MOCK_TIMELINE);
  const [rawRecords] = useState<RawSourceRecord[]>(MOCK_RAW_RECORDS);
  const [workspaceCards, setWorkspaceCards] = useState<WorkspaceCard[]>(INITIAL_WORKSPACE_CARDS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  const [activeProfileEntityId, setActiveProfileEntityId] = useState<string | null>('ent-person-1');
  const [inspectedRawRecord, setInspectedRawRecord] = useState<RawSourceRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const logAuditAction = (
    action: string,
    target: string,
    category: AuditLogEntry['category'],
    legalBasis: string = 'Authorized by IO under FIR 492/2024'
  ) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST (Realtime)',
      officerName: currentRole.title,
      officerRole: currentRole.id,
      officerBadge: currentRole.badge,
      action,
      target,
      category,
      legalBasis,
      terminalIp: '10.14.88.21 (Investigator Station 01)',
      status: 'AUTHORIZED',
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const setRole = (roleId: string) => {
    const found = USER_ROLES.find(r => r.id === roleId);
    if (found) {
      setCurrentRoleState(found);
      logAuditAction(`RBAC Role Switched to ${found.title}`, `User: ${found.badge}`, 'SECURITY_WARNING', 'Session Authentication');
    }
  };

  const selectEntity = (id: string | null) => {
    setSelectedEntityId(id);
    if (id) {
      setSelectedEdgeId(null);
      const ent = entities.find(e => e.id === id);
      if (ent) {
        logAuditAction('Inspected Node Entity Details', `${ent.name} (${ent.type})`, 'GRAPH_INSPECTION');
      }
    }
  };

  const selectEdge = (id: string | null) => {
    setSelectedEdgeId(id);
    if (id) {
      setSelectedEntityId(null);
      const edge = edges.find(e => e.id === id);
      if (edge) {
        logAuditAction('Opened Explainability Drawer for AI Lead', `${edge.label}: ${edge.leadLabel}`, 'LEAD_REVIEW');
      }
    }
  };

  const viewEntityProfile = (id: string) => {
    setActiveProfileEntityId(id);
    setActiveView('entity-profile');
    setSelectedEntityId(null);
    setSelectedEdgeId(null);
    const ent = entities.find(e => e.id === id);
    if (ent) {
      logAuditAction('Navigated to Full Entity Profile Page', `${ent.name} [ID: ${ent.id}]`, 'SEARCH');
    }
  };

  const updateEdgeReview = (edgeId: string, status: ReviewStatus, notes?: string) => {
    setEdges(prev =>
      prev.map(edge => {
        if (edge.id === edgeId) {
          return {
            ...edge,
            reviewStatus: status,
            reviewNotes: notes || edge.reviewNotes,
            reviewedBy: currentRole.badge,
            reviewedAt: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          };
        }
        return edge;
      })
    );

    const edge = edges.find(e => e.id === edgeId);
    logAuditAction(
      `Investigator Lead Review: Status -> ${status.toUpperCase().replace('_', ' ')}`,
      edge ? `${edge.label} (${edge.confidenceRange})` : edgeId,
      'LEAD_REVIEW',
      notes ? `Investigator Note: ${notes}` : 'Review updated by IO'
    );
  };

  const pinToWorkspace = (cardData: Omit<WorkspaceCard, 'id' | 'pinnedAt' | 'pinnedBy'>) => {
    const newCard: WorkspaceCard = {
      ...cardData,
      id: `card-${Date.now()}`,
      pinnedAt: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
      pinnedBy: currentRole.badge,
    };
    setWorkspaceCards(prev => [newCard, ...prev]);
    logAuditAction('Pinned Item to Investigation Pinboard', cardData.title, 'WORKSPACE_PIN');
  };

  const updateWorkspaceCard = (id: string, updates: Partial<WorkspaceCard>) => {
    setWorkspaceCards(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const removeWorkspaceCard = (id: string) => {
    setWorkspaceCards(prev => prev.filter(c => c.id !== id));
  };

  const inspectEvidenceByDocRef = (docRefOrId: string) => {
    // Try finding by rawRecordId or docRef or documentNumber
    const found =
      rawRecords.find(r => r.id === docRefOrId || r.documentNumber === docRefOrId) ||
      rawRecords.find(r => docRefOrId.includes(r.id) || docRefOrId.includes(r.documentNumber)) ||
      rawRecords[0];

    if (found) {
      setInspectedRawRecord(found);
      logAuditAction('Inspected Raw Evidentiary Document', `${found.title} [${found.documentNumber}]`, 'EVIDENCE_VIEW', 'Court admissibility audit');
    }
  };

  const closeEvidenceModal = () => {
    setInspectedRawRecord(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setRole,
        caseOverview,
        activeView,
        setActiveView,
        entities,
        edges,
        timeline,
        rawRecords,
        workspaceCards,
        auditLogs,
        selectedEntityId,
        selectedEdgeId,
        activeProfileEntityId,
        inspectedRawRecord,
        searchQuery,
        setSearchQuery,
        selectEntity,
        selectEdge,
        viewEntityProfile,
        updateEdgeReview,
        pinToWorkspace,
        updateWorkspaceCard,
        removeWorkspaceCard,
        inspectEvidenceByDocRef,
        closeEvidenceModal,
        logAuditAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
