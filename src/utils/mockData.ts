import { LegalCase, ApiResponse, SearchFilters } from '@/types';

// Mock legal cases data matching the UI in the Figma design
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
      // If keyword starts with "AI:", treat it as a special AI search
      if (keyword.startsWith("ai:")) {
        // Simulate AI search by just returning all cases for now
        // In a real app, this would do a more sophisticated search
      } else {
        // Standard search
        filteredCases = filteredCases.filter(c => 
          c.title.toLowerCase().includes(keyword) || 
          c.description.toLowerCase().includes(keyword) ||
          c.caseNumber.toLowerCase().includes(keyword)
        );
      }
    }
    
    // Add more filter logic as needed
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