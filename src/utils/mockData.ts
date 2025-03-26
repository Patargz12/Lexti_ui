import { LegalCase, ApiResponse, SearchFilters } from '@/types';
import { 
  DOCUMENT_TYPE_OPTIONS, 
  CASE_OUTCOME_OPTIONS, 
  PARTIES_INVOLVED_OPTIONS 
} from '@/constants/filterOptions';


export const mockLegalCases: LegalCase[] = [
  {
    id: '1',
    caseNumber: 'G.R. No. 262579',
    title: 'SPOUSES PAJARES V. REMARKABLE LAUNDRY',
    date: 'Feb 28, 2024',
    description: 'CASTILLO, J.:Breach of contract may give rise to an action for Complaint denominated as "Breach of Contract and Damages"[6, but the latter failed to pay; and, that petitioners\' violation constitutes breach of contract above-mentioned breach of the subject dealer contract agreement made by the defendant, it is most Case No. CEB-39025 is for breach of contract, or one whose subject is incapable of pecuniary for Breach of Contract and Damages is hereby REVERSED and...',
    caseType: 'Case',
    politicalLaw: true,
    remedialLaw: true,
    legalEthics: true
  },
  {
    id: '2',
    caseNumber: 'G.R. No. 262579',
    title: 'Tektwin Marketing Corp. v. Bermon Marketing Communications Corp.',
    date: 'Feb 28, 2024',
    description: 'Reciprocal obligations, either party may rescind the contract upon the other\'s breach of though that rescission would not be permitted for "slight or casual" breach of contract but only The question of whether a breach of contract is, claims there was no breach of contract to contract. Tektwin committed serious breach of its obligation. The said breach caused Bermon to incur repeated breach of Tektwin in the performance of its obligation under the sales contract is petiti...',
    caseType: 'Case',
    politicalLaw: true,
    remedialLaw: true,
    legalEthics: true
  },
  {
    id: '3',
    caseNumber: 'G.R. No. 262579',
    title: 'JANG VS. WISE',
    date: 'Feb 28, 2024',
    description: 'P1,23750, together with interest and costs, as damages for a breach of contract.The contract judgment should be reversed instead of affirmed. The action is for breach of contract of sale the court holds, an action for breach lies, then the contract was a complete and perfect contract in its...',
    caseType: 'Case',
    politicalLaw: true,
    remedialLaw: true,
    legalEthics: true
  },
  {
    id: '4',
    caseNumber: 'G.R. No. 212186',
    title: 'LOPEZ VS. PEOPLE',
    date: 'June 29, 2016',
    description: 'This case involves Ariel Lopez (petitioner appellant) charged with cattle-rustling under Presidential Decree No. 533 (Anti-Cattle Rustling Law) for allegedly stealing a female carabao owned by Teresita C. Perez in Davao City on July 17, 2002.',
    caseType: 'Case',
    cited: 3,
    crossRef: 5,
    politicalLaw: true,
    remedialLaw: true,
    legalEthics: true,
    decision: {
      date: 'June 29, 2016',
      outcome: 'Criminal'
    },
    ponente: 'LEONEN, J',
    category: 'Criminal',
    summary: 'This case involves Ariel Lopez (petitioner appellant) charged with cattle-rustling under Presidential Decree No. 533 (Anti-Cattle Rustling Law) for allegedly stealing a female carabao owned by Teresita C. Perez in Davao City on July 17, 2002. Key prosecution witness Felix Alderete testified that Lopez untied the carabao and directed him to transport it to a third party. Teresita Perez and police officer PO3 Leo Lozarito claimed Lopez admitted guilt during a confrontation at the barangay station without legal counsel.\n\nLopez denied the allegations, asserting the prosecution failed to conclusively identify the stolen carabao and violated his custodial rights. The Regional Trial Court convicted Lopez, sentencing him to 10-14 years\' imprisonment. The Court of Appeals affirmed the conviction but modified the penalty.\n\nOn final appeal, the Supreme Court reversed, holding that the prosecution failed to prove guilt beyond reasonable doubt.'
  },
  {
    id: '5',
    caseNumber: 'G.R. No. 188626',
    title: 'REPUBLIC OF THE PHILIPPINES VS. SERENO',
    date: 'May 11, 2018',
    description: 'Quo Warranto petition filed against the Chief Justice of the Supreme Court challenging her appointment on grounds of lack of integrity for failure to file complete Statements of Assets, Liabilities and Net Worth (SALN).',
    caseType: 'Case',
    cited: 8,
    crossRef: 12,
    politicalLaw: true,
    remedialLaw: false,
    legalEthics: true,
    decision: {
      date: 'May 11, 2018',
      outcome: 'Granted'
    },
    ponente: 'TIJAM, J',
    category: 'Constitutional Law',
    summary: 'The Republic of the Philippines, through the Solicitor General, filed a Quo Warranto petition against Chief Justice Maria Lourdes P.A. Sereno, seeking to nullify her appointment on the ground that she lacked integrity, a constitutional requirement for membership in the judiciary, for failing to file complete Statements of Assets, Liabilities and Net Worth (SALN) during her tenure as law professor at the University of the Philippines.\n\nThe Supreme Court, voting 8-6, granted the petition, holding that the Chief Justice failed to comply with the SALN requirements under the law, which reflected her lack of integrity. The Court ruled that Quo Warranto was a proper remedy to challenge her qualifications, and that the one-year prescription period did not apply to quo warranto petitions filed by the State.'
  },
  {
    id: '6',
    caseNumber: 'G.R. No. 171947',
    title: 'CARPIO MORALES VS. COURT OF APPEALS',
    date: 'November 10, 2015',
    description: 'Former President Arroyo questioned the constitutionality of the "truth and reconciliation commission" created by President Aquino via an executive order.',
    caseType: 'Law',
    cited: 6,
    crossRef: 9,
    politicalLaw: true,
    remedialLaw: true,
    legalEthics: false,
    decision: {
      date: 'November 10, 2015',
      outcome: 'Partially Granted'
    },
    ponente: 'PERLAS-BERNABE, J',
    category: 'Administrative Law',
    summary: 'This case involves the constitutionality of Office of the Ombudsman Circular No. 2, Series of a 2011, which reduced the penalty of public officials found guilty of administrative offenses but were also charged with criminal cases involving the same acts or omissions. Former President Gloria Macapagal-Arroyo challenged this circular as an unconstitutional encroachment on the rule-making power of the Supreme Court.\n\nThe Supreme Court partially granted the petition, declaring that while the Ombudsman has the power to promulgate rules of procedure for administrative cases, the particular circular was void for modifying the Rules of Court without the approval of the Supreme Court.'
  }
];

// Simulate API call to fetch legal cases with delay and potential errors
export const fetchLegalCases = async (filters?: SearchFilters): Promise<ApiResponse<LegalCase[]>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate random error (5% chance - reduced for easier debugging)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch legal cases. Please try again later.');
  }
  
  // Filter cases based on filters if provided
  let filteredCases = [...mockLegalCases];
  
  if (filters) {
    if (filters.caseType && filters.caseType !== 'All') {
      filteredCases = filteredCases.filter(c => c.caseType === filters.caseType);
    }
    
    // Keyword search
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      const searchMode = filters.searchMode || 'any';
      
      // If keyword starts with "AI:", treat it as a special AI search
      if (keyword.startsWith("ai:")) {
        // Simulate AI search by just returning all cases for now
        // In a real app, this would do a more sophisticated search
      } else {
        // Apply different search modes
        switch (searchMode) {
          case 'all':
            // All words must be present
            filteredCases = filteredCases.filter(c => {
              const searchText = (c.title + ' ' + c.description + ' ' + c.caseNumber).toLowerCase();
              const keywords = keyword.split(/\s+/).filter(k => k.length > 0);
              return keywords.every(k => searchText.includes(k));
            });
            break;
          
          case 'exact':
            // Exact phrase match
        filteredCases = filteredCases.filter(c => 
          c.title.toLowerCase().includes(keyword) || 
          c.description.toLowerCase().includes(keyword) ||
          c.caseNumber.toLowerCase().includes(keyword)
        );
            break;
          
          case 'any':
          default:
            // Any of the words (default)
            filteredCases = filteredCases.filter(c => {
              const searchText = (c.title + ' ' + c.description + ' ' + c.caseNumber).toLowerCase();
              const keywords = keyword.split(/\s+/).filter(k => k.length > 0);
              return keywords.some(k => searchText.includes(k));
            });
            break;
        }
      }
    }
    
    // Apply Time Period filters
    if (filters.timePeriod) {
      const timePeriod = filters.timePeriod.toLowerCase();
      const currentYear = new Date().getFullYear();
      
      // Parse dates from cases (in a real app, these would be actual Date objects)
      filteredCases = filteredCases.filter(c => {
        // Extract year from date (e.g., "Feb 28, 2024" -> 2024)
        const caseYear = parseInt(c.date.split(', ')[1]);
        if (isNaN(caseYear)) return true; // Keep cases with unparseable dates
        
        if (timePeriod.includes('to')) {
          // Custom date range - just use a simple year check for demo
          const [startStr, endStr] = timePeriod.split(' to ');
          // Check if we have valid date inputs and extract years
          if (startStr && endStr) {
            try {
              // Simple check - just see if the years are in range
              const startYear = parseInt(startStr.split('/')[2]) + 2000; // Assuming "yy" format
              const endYear = parseInt(endStr.split('/')[2]) + 2000;
              
              if (!isNaN(startYear) && !isNaN(endYear)) {
                return caseYear >= startYear && caseYear <= endYear;
              }
            } catch {
              // If date parsing fails, keep the case
              return true;
            }
          }
        } else if (timePeriod === 'last_year') {
          return caseYear >= currentYear - 1;
        } else if (timePeriod === 'last_5_years') {
          return caseYear >= currentYear - 5;
        } else if (timePeriod === 'last_10_years') {
          return caseYear >= currentYear - 10;
        } else if (timePeriod === 'since_2000') {
          return caseYear >= 2000;
        } else if (timePeriod === 'before_2000') {
          return caseYear < 2000;
        } else if (timePeriod === 'all_time') {
          return true; // All cases pass
        }
        
        return true; // Default: keep all cases
      });
    }
    
    // Apply Legal Domain filters
    const legalDomain = filters.legalDomain || [];
    if (legalDomain.length > 0) {
      // In a real app, you would filter based on a legal domain property
      // This is a mock implementation
      filteredCases = filteredCases.filter(c => {
        // For demo, let's use a simple rule: even IDs match first half of legal domains, odd IDs match second half
        const caseIdNum = parseInt(c.id);
        if (isNaN(caseIdNum)) return true;
        
        const matchesLegalDomain = legalDomain.some(domain => {
          if (caseIdNum % 2 === 0) {
            return ['criminal-law', 'civil-law', 'administrative-law', 'constitutional-law', 'environmental-law', 'international-law', 'ip-law'].includes(domain);
          } else {
            return ['health-law', 'labor-law', 'commercial-law', 'tax-law', 'family-law', 'human-rights-law', 'election-law', 'cyber-law'].includes(domain);
          }
        });
        
        return matchesLegalDomain;
      });
    }
    
    // Apply Document Type filters
    const documentType = filters.documentType || [];
    if (documentType.length > 0) {
      // For demo, filter based on id of cases
      filteredCases = filteredCases.filter(c => {
        const caseId = parseInt(c.id);
        // Each case will match with some document types based on its ID
        return documentType.some(type => {
          const typeIndex = DOCUMENT_TYPE_OPTIONS.findIndex(opt => opt.id === type);
          if (typeIndex === -1) return false;
          
          // Use case ID to determine if this case matches this document type (for demo purposes)
          return caseId % DOCUMENT_TYPE_OPTIONS.length === typeIndex % DOCUMENT_TYPE_OPTIONS.length;
        });
      });
    }
    
    // Apply Case Outcome filters
    const caseOutcome = filters.caseOutcome || [];
    if (caseOutcome.length > 0) {
      // For demo, use title length to determine outcome
      filteredCases = filteredCases.filter(c => {
        // Each case will match with some outcomes based on its title length
        return caseOutcome.some(outcome => {
          const outcomeIndex = CASE_OUTCOME_OPTIONS.findIndex(opt => opt.id === outcome);
          if (outcomeIndex === -1) return false;
          
          // Use title length to determine if this case matches this outcome (for demo purposes)
          return c.title.length % CASE_OUTCOME_OPTIONS.length === outcomeIndex % CASE_OUTCOME_OPTIONS.length;
        });
      });
    }
    
    // Apply Parties Involved filters
    const partiesInvolved = filters.partiesInvolved || [];
    if (partiesInvolved.length > 0) {
      // For demo, use case number to determine parties
      filteredCases = filteredCases.filter(c => {
        const caseNumSum = c.caseNumber.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
        
        return partiesInvolved.some(party => 
          caseNumSum % 6 === PARTIES_INVOLVED_OPTIONS.findIndex(opt => opt.id === party) % 6
        );
      });
    }
    
    // Apply party name search if provided
    if (filters.partySearch) {
      const searchTerm = filters.partySearch.toLowerCase();
      // Filter cases where title or description might contain the party name
      // In a real implementation, you would search in a dedicated "parties" field
      filteredCases = filteredCases.filter(c => 
        c.title.toLowerCase().includes(searchTerm) || 
        c.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply Citation Relevance filters
    const citationRelevance = filters.citationRelevance || [];
    if (citationRelevance.length > 0) {
      filteredCases = filteredCases.filter(c => {
        const citedCount = c.cited || 0;
        let matchesCitation = false;
        
        // Check for threshold filter
        const thresholdFilter = citationRelevance.find(filter => filter.startsWith('threshold-'));
        if (thresholdFilter) {
          const threshold = parseInt(thresholdFilter.split('-')[1]);
          // Map slider percentage to a reasonable citation count (0-100 -> 0-20 for demo)
          const citationThreshold = Math.floor(threshold / 5);
          if (citedCount >= citationThreshold) {
            matchesCitation = true;
          }
        }
        
        // Check for most cited
        if (citationRelevance.includes('most-cited')) {
          // For demo, consider cases with cited > 5 as "most cited"
          if (citedCount > 5) {
            matchesCitation = true;
          }
        }
        
        // Check for landmark cases
        if (citationRelevance.includes('landmark-cases')) {
          // For demo, consider cases with cited > 10 as "landmark"
          if (citedCount > 10) {
            matchesCitation = true;
          }
        }
        
        return matchesCitation;
      });
    }
    
    // Apply Cross-References filters
    const crossReferences = filters.crossReferences || [];
    if (crossReferences.length > 0) {
      // For demo, consider cases with crossRef > 0 as having cross-references
      filteredCases = filteredCases.filter(c => {
        const hasCrossRef = (c.crossRef || 0) > 0;
        
        if (crossReferences.includes('yes') && hasCrossRef) return true;
        if (crossReferences.includes('no') && !hasCrossRef) return true;
        
        return false;
      });
    }
  }
  
  return {
    data: filteredCases,
    totalResults: filteredCases.length,
    success: true
  };
};

export const fetchCaseById = async (id: string): Promise<ApiResponse<LegalCase | null>> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Simulate random error (5% chance - reduced for easier debugging)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch case details. Please try again later.');
  }
  
  const foundCase = mockLegalCases.find(c => c.id === id);
  
  return {
    data: foundCase || null,
    totalResults: foundCase ? 1 : 0,
    success: true
  };
}; 