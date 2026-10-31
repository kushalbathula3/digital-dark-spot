export type SourceStatus = 'verified_official' | 'third_party_advisory' | 'community_forum' | 'regulatory_gazette';

export interface Source {
  id: string;
  name: string;
  url: string;
  domain: string;
  status: SourceStatus;
  ingestedDate: string;
  lastUpdatedDate?: string;
  cycleOrEdition?: string;
  isOfficial: boolean;
  credibilityScore: number;
  summaryExcerpt: string;
  fullContent: string;
  outdatedRisk?: string;
}

export interface Fact {
  id: string;
  category: string;
  claimText: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  isOfficial: boolean;
  exactQuote: string;
  paragraphRef?: string;
}

export interface InformationGap {
  id: string;
  domainCategory: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'advisory';
  impactExplanation: string;
  missingItems: string[];
  suggestedOfficialInquiry: string;
  isAddressed: boolean;
}

export interface ContradictionClaim {
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  isOfficial: boolean;
  lastUpdated?: string;
  claimValue: string;
  exactQuote: string;
  highlightDelta?: string;
}

export interface Contradiction {
  id: string;
  topic: string;
  severity: 'blocking' | 'major' | 'minor';
  summary: string;
  visualDelta: {
    label: string;
    valueA: string;
    valueB: string;
  };
  rootCauseHypothesis: string;
  claims: [ContradictionClaim, ContradictionClaim];
  resolutionGuidance: string;
  resolved: boolean;
}

export interface TemporalWarning {
  id: string;
  sourceId: string;
  sourceName: string;
  detectedCycle: string;
  currentOperatingCycle: string;
  warningType: 'past_cycle_risk' | 'undated_uncertainty' | 'superseded_policy';
  riskDescription: string;
  remedyAction: string;
}

export interface ChecklistItem {
  id: string;
  priority: 1 | 2 | 3;
  category: string;
  taskTitle: string;
  actionGuidance: string;
  targetAuthority: string;
  completed: boolean;
  notes?: string;
}

export interface ScenarioDataset {
  id: string;
  chipLabel: string;
  goalQuestion: string;
  category: 'Scholarships' | 'Clean Energy Subsidies' | 'AI & Intellectual Property';
  overviewSummary: string;
  completenessIndex: {
    verifiedPercentage: number;
    darkSpotPercentage: number;
  };
  sources: Source[];
  facts: Fact[];
  gaps: InformationGap[];
  contradictions: Contradiction[];
  temporalWarnings: TemporalWarning[];
  checklist: ChecklistItem[];
}
