// Legal case types
export interface LegalCase {
  id: string;
  caseNumber: string;
  title: string;
  date: string;
  description: string;
  caseType: 'Case' | 'Law';
  cited?: number;
  crossRef?: number;
  politicalLaw?: boolean;
  remedialLaw?: boolean;
  legalEthics?: boolean;
  decision?: {
    date: string;
    outcome: string;
  };
  ponente?: string;
  category?: string;
  summary?: string;
}

// Search filters type
export interface SearchFilters {
  caseType: 'Case' | 'Law' | 'All';
  legalDomain?: string;
  documentType?: string;
  caseOutcome?: string;
  timePeriod?: string;
  partiesInvolved?: string;
  keyword?: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  totalResults: number;
  success: boolean;
  error?: string;
} 