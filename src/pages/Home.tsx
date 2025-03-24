import React, { useState } from 'react';
import { SearchNavbar } from '@/components/layout/SearchNavbar';
import { useCases } from '@/hooks/useCases';
import { useCase } from '@/hooks/useCase';
import { SearchFilters } from '@/types';

export function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    caseType: 'Case',
  });
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Fetch cases based on filters
  const { cases, totalResults, isLoading: isLoadingCases, error: casesError, refetch: refetchCases } = useCases(filters);
  
  // Fetch selected case details
  const { caseData, isLoading: isLoadingCase, error: caseError, refetch: refetchCase } = useCase(selectedCaseId || '4'); // Default to the 4th case (LOPEZ VS. PEOPLE)

  const handleSearch = (query: string) => {
    // Update filters with the search query
    setFilters({
      ...filters,
      keyword: query
    });
  };

  const handleFilterChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleCaseSelect = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  return (
    <>
      {/* Use the SearchNavbar at the top (outside of main content) */}
      <SearchNavbar onSearch={handleSearch} />
      
      <div className="mt-8"> {/* Added margin top to accommodate fixed navbar */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Column 1: Filter Categories - Increased width */}
          <div className="w-72 min-w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto bg-white dark:bg-gray-800">
            <div className="p-5">
              {/* Filter Categories - Only dropdowns as per request */}
              <div className="space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Legal Domain</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Document Type</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Case Outcome</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Time Period</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Parties Involved</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Keyword and Phrase</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Citation Relevance</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Cross-References</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Advanced Options</h3>
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

           
            </div>
          </div>
          
          {/* Column 2: Search Results/Case Feed - Hide scrollbar and set to half width */}
          <div 
            className="w-1/2 min-w-96 border-r border-gray-200 dark:border-gray-700 overflow-y-auto scrollbar-hide"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div>
                <div className="flex space-x-2">
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filters.caseType === 'Case' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                    onClick={() => handleFilterChange({...filters, caseType: 'Case'})}
                  >
                    Case 74k
                  </button>
                  <button 
                    className={`px-3 py-1 text-sm rounded-full ${filters.caseType === 'Law' ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
                    onClick={() => handleFilterChange({...filters, caseType: 'Law'})}
                  >
                    Law 74k
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {totalResults > 0 ? `${totalResults} results` : 'No results'}
              </div>
            </div>
            
            <div 
              className="overflow-auto scrollbar-hide"
            >
              {isLoadingCases ? (
                <div className="p-8 text-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto"></div>
                  <p className="mt-4 text-gray-500 dark:text-gray-400">Loading cases...</p>
                </div>
              ) : casesError ? (
                <div className="p-6 text-center">
                  <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">{casesError}</p>
                    <button 
                      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                      onClick={() => refetchCases()}
                    >
                      Try again
                    </button>
                  </div>
                </div>
              ) : cases.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">No cases found matching your criteria.</p>
                  {filters.keyword && (
                    <button 
                      className="mt-4 text-sm text-teal-600 dark:text-teal-400 underline"
                      onClick={() => setFilters({...filters, keyword: ''})}
                    >
                      Clear search
                    </button>
                  )}
                </div>
              ) : (
                cases.map((caseItem) => (
                  <div 
                    key={caseItem.id}
                    className={`border-b border-gray-200 dark:border-gray-700 cursor-pointer ${caseItem.id === selectedCaseId ? 'bg-gray-50 dark:bg-gray-700/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700/30'}`}
                    onClick={() => handleCaseSelect(caseItem.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-1">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{caseItem.caseNumber}</span>
                        <div className="ml-auto">
                          <button className="text-gray-400 hover:text-gray-500">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">{caseItem.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">{caseItem.description}</p>
                      <div className="flex mt-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{caseItem.date}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Column 3: Case Detail - Set to half width to match column 2 */}
          <div className="w-1/2 overflow-y-auto scrollbar-hide bg-white dark:bg-gray-800">
            {isLoadingCase ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Loading case details...</p>
              </div>
            ) : caseError ? (
              <div className="p-8 text-center">
                <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-lg">
                  <p className="text-red-600 dark:text-red-400">{caseError}</p>
                  <button 
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                    onClick={() => refetchCase()}
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : caseData ? (
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{caseData.title}</h1>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2 mr-4">
                      <span className="text-sm">Cited in</span>
                      <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs px-2 py-0.5 rounded-full">
                        {caseData.cited || 3}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <span className="text-sm">Cross Ref</span>
                      <span className="bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-200 text-xs px-2 py-0.5 rounded-full">
                        {caseData.crossRef || 5}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {caseData.politicalLaw && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        Political Law
                      </span>
                    )}
                    {caseData.remedialLaw && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        Remedial Law
                      </span>
                    )}
                    {caseData.legalEthics && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                        <span className="mr-1 h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                        Legal Ethics
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Case</div>
                    <div className="text-sm font-medium">{caseData.caseNumber}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Decision Date</div>
                    <div className="text-sm font-medium">{caseData.decision?.date || caseData.date}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Ponente</div>
                    <div className="text-sm font-medium">{caseData.ponente || 'N/A'}</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Case Category</div>
                    <div className="text-sm font-medium">{caseData.category || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                  <div className="flex space-x-6 -mb-px">
                    <button className="px-1 py-2 border-b-2 border-teal-600 text-sm font-medium text-teal-600 dark:text-teal-400">
                      Summary
                    </button>
                    <button className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Case Digest
                    </button>
                    <button className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Timeline
                    </button>
                    <button className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Q&A
                    </button>
                    <button className="px-1 py-2 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      Jurisprudence
                    </button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Case Summary</h2>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {caseData.summary || caseData.description}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">Select a case to view details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 
 