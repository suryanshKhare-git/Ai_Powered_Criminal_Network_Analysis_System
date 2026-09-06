export type EntityType = 'person' | 'phone' | 'vehicle' | 'account' | 'location' | 'case';

export type ReviewStatus = 'unreviewed' | 'verified_lead' | 'needs_evidence' | 'dismissed';

export type SignalBand = 'Strong Signal' | 'Moderate Signal' | 'Weak Signal' | 'Direct Official Registry';

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  categoryLabel: string;
  primaryIdentifier: string;
  aliases?: string[];
  riskIndicator?: string;
  summary: string;
  jurisdiction: string;
  firstSighted: string;
  lastSighted: string;
  status: 'active' | 'flagged' | 'cleared';
  metadata: Record<string, string | number>;
  tags: string[];
}

export interface FactorScore {
  factor: string;
  score: number; // 0 - 100
  weight: string;
  description: string;
}

export interface SourceCitation {
  id: string;
  title: string;
  recordType: 'FIR' | 'CDR' | 'VAHAN' | 'BANK_LEDGER' | 'CCTV_LOG' | 'WITNESS_STATEMENT';
  snippet: string;
  docRef: string;
  timestamp?: string;
  rawRecordId?: string;
}

export interface ConnectionEdge {
  id: string;
  source: string; // entity id
  target: string; // entity id
  label: string;
  connectionType: 'telephony' | 'spatial' | 'financial' | 'ownership' | 'co_accused';
  isAIGenerated: boolean;
  leadLabel: string; // MUST contain 'Lead' or 'Possible Connection' for AI links
  confidenceBand: SignalBand;
  confidenceRange: string; // e.g. "82% – 88% Signal Weight"
  factorBreakdown: FactorScore[];
  plainLanguageExplanation: string;
  sourceCitations: SourceCitation[];
  reviewStatus: ReviewStatus;
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  displayDate: string;
  title: string;
  category: 'telephony' | 'transit' | 'financial' | 'police_incident' | 'surveillance';
  entityIds: string[];
  summary: string;
  locationName?: string;
  sourceDocRef: string;
  evidenceWeight: string;
}

export interface RawSourceRecord {
  id: string;
  recordType: 'FIR' | 'CDR' | 'VAHAN' | 'BANK_LEDGER' | 'CCTV_LOG' | 'WITNESS_STATEMENT';
  title: string;
  documentNumber: string;
  issuingAuthority: string;
  timestamp: string;
  rawText: string;
  extractedEntities: string[];
  jurisdiction: string;
  legalAdmissibilityNote: string;
}

export interface WorkspaceCard {
  id: string;
  entityId?: string;
  edgeId?: string;
  type: 'entity' | 'connection' | 'hypothesis';
  title: string;
  subtitle: string;
  column: 'assessment' | 'active_leads' | 'verified' | 'ruled_out';
  notes: string;
  tags: string[];
  confidence?: string;
  pinnedAt: string;
  pinnedBy: string;
}

export interface UserRole {
  id: string;
  title: string;
  badge: string;
  department: string;
  jurisdiction: string;
  permissions: {
    canViewRawRecords: boolean;
    canModifyLeads: boolean;
    canExportDossier: boolean;
    canViewAuditLogs: boolean;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  officerName: string;
  officerRole: string;
  officerBadge: string;
  action: string;
  category: 'SEARCH' | 'GRAPH_INSPECTION' | 'EVIDENCE_VIEW' | 'LEAD_REVIEW' | 'WORKSPACE_PIN' | 'DOSSIER_EXPORT' | 'SECURITY_WARNING';
  target: string;
  legalBasis: string;
  terminalIp: string;
  status: 'AUTHORIZED' | 'FLAGGED_AUDIT';
}

export interface CaseOverview {
  caseId: string;
  firNumber: string;
  title: string;
  policeStation: string;
  investigationOfficer: string;
  incidentDate: string;
  jurisdiction: string;
  sections: string[];
  synopsis: string;
}
