import React, { useState, useMemo } from 'react';
import { SearchNavbar } from '@/components/layout/SearchNavbar';
import { useCases } from '@/hooks/useCases';
import { useCase } from '@/hooks/useCase';
import { SearchFilters } from '@/types';
import { FilterHeader } from '@/components/common/FilterHeader';
import { FilterCategory } from '@/components/common/FilterCategory';
import { 
  LEGAL_DOMAIN_OPTIONS, 
  DOCUMENT_TYPE_OPTIONS, 
  CASE_OUTCOME_OPTIONS
} from '@/constants/filterOptions';

// First, let's create a reusable component for the animated header
function AnimatedFilterHeader({ 
  title, 
  badgeCount, 
  isOpen = false, 
  onClick = () => {},
  caption
}: { 
  title: string; 
  badgeCount?: number; 
  isOpen?: boolean; 
  onClick?: () => void;
  caption?: string;
}) {
  return (
    <div 
      className="flex justify-between items-center py-2.5 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
          {badgeCount !== undefined && badgeCount > 0 && (
            <span className="ml-2 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {badgeCount}
            </span>
          )}
        </div>
        {caption && (
          <span className="text-xs text-gray-500 mt-0.5">{caption}</span>
        )}
      </div>
      <svg
        className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

// Add enums for time period options
const TIME_PERIOD_OPTIONS = {
  CUSTOM: 'custom',
  LAST_YEAR: 'last_year',
  LAST_5_YEARS: 'last_5_years',
  LAST_10_YEARS: 'last_10_years',
  SINCE_2000: 'since_2000',
  BEFORE_2000: 'before_2000',
  ALL_TIME: 'all_time'
};

export function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    caseType: 'Case',
    legalDomain: [],
    documentType: [],
    caseOutcome: [],
    partiesInvolved: [],
    citationRelevance: [],
    crossReferences: [],
    advancedOptions: []
  });
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [timeExpanded, setTimeExpanded] = useState(false);
  const [keywordExpanded, setKeywordExpanded] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [timePeriodSelection, setTimePeriodSelection] = useState<string>('');
  const [partiesExpanded, setPartiesExpanded] = useState(false);
  const [partySearchQuery, setPartySearchQuery] = useState('');
  const [keywordSearchQuery, setKeywordSearchQuery] = useState(filters.keyword || '');
  const [searchMode, setSearchMode] = useState<'any' | 'all' | 'exact'>(filters.searchMode || 'any');
  const [citationExpanded, setCitationExpanded] = useState(false);
  const [citationSliderValue, setCitationSliderValue] = useState(0);
  const [mostCited, setMostCited] = useState(false);
  const [mostCitedLandmark, setMostCitedLandmark] = useState(false);
  const [crossRefsExpanded, setCrossRefsExpanded] = useState(false);
  const [includeOverruled, setIncludeOverruled] = useState(false);
  const [includeConcurring, setIncludeConcurring] = useState(false);
  const [includeDissenting, setIncludeDissenting] = useState(false);
  const [isFilterPanelVisible, setIsFilterPanelVisible] = useState(true);

  // Fetch cases based on filters
  const { cases, totalResults, isLoading: isLoadingCases, error: casesError, refetch: refetchCases } = useCases(filters);
  
  // Fetch selected case details
  const { caseData, isLoading: isLoadingCase, error: caseError, refetch: refetchCase } = useCase(selectedCaseId || '4'); // Default to the 4th case (LOPEZ VS. PEOPLE)

  // Calculate active filters count (excluding caseType which is always set)
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    
    if (filters.legalDomain?.length) count += filters.legalDomain.length;
    if (filters.documentType?.length) count += filters.documentType.length;
    if (filters.caseOutcome?.length) count += filters.caseOutcome.length;
    if (filters.timePeriod) count += 1;
    if (filters.partiesInvolved?.length) count += filters.partiesInvolved.length;
    if (filters.keyword) count += 1;
    if (filters.citationRelevance?.length) count += filters.citationRelevance.length;
    if (filters.crossReferences?.length) count += filters.crossReferences.length;
    if (filters.advancedOptions?.length) count += filters.advancedOptions.length;
    
    return count;
  }, [filters]);

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

  const handleApplyFilters = () => {
    // This function would typically validate and finalize filters
    // For now, we'll just refetch the cases
    refetchCases();
  };

  const handleResetFilters = () => {
    // Reset all filters except caseType
    setFilters({
      caseType: filters.caseType
    });
    
    // Reset input states
    setStartDate('');
    setEndDate('');
    setTimePeriodSelection('');
    setPartySearchQuery('');
    setKeywordSearchQuery('');
    setSearchMode('any');
    setCitationSliderValue(0);
    setMostCited(false);
    setMostCitedLandmark(false);
    setIncludeOverruled(false);
    setIncludeConcurring(false);
    setIncludeDissenting(false);
  };

  const handleFilterCategoryChange = (category: keyof SearchFilters, selectedValues: string[]) => {
    setFilters({
      ...filters,
      [category]: selectedValues
    });
  };

  const handleTimePeriodSelect = (option: string) => {
    let newTimePeriod: string;
    
    // Clear custom dates if selecting a preset
    if (option !== TIME_PERIOD_OPTIONS.CUSTOM) {
      setStartDate('');
      setEndDate('');
      newTimePeriod = option;
    } else {
      // If custom is selected, use date range
      newTimePeriod = `${startDate} to ${endDate}`;
    }
    
    setTimePeriodSelection(option);
    
    // Update filters
    setFilters({
      ...filters,
      timePeriod: newTimePeriod
    });
  };

  const handleDateChange = (isStart: boolean, value: string) => {
    if (isStart) {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
    
    // If both dates are set, update the filter
    if ((isStart && endDate) || (!isStart && startDate)) {
      const newStartDate = isStart ? value : startDate;
      const newEndDate = isStart ? endDate : value;
      
      setTimePeriodSelection(TIME_PERIOD_OPTIONS.CUSTOM);
      setFilters({
        ...filters,
        timePeriod: `${newStartDate} to ${newEndDate}`
      });
    }
  };

  // Generate caption for time period
  const getTimePeriodCaption = () => {
    if (!filters.timePeriod) return '';
    
    switch (timePeriodSelection) {
      case TIME_PERIOD_OPTIONS.LAST_YEAR:
        return 'Last year';
      case TIME_PERIOD_OPTIONS.LAST_5_YEARS:
        return 'Last 5 years';
      case TIME_PERIOD_OPTIONS.LAST_10_YEARS:
        return 'Last 10 years';
      case TIME_PERIOD_OPTIONS.SINCE_2000:
        return 'Since 2000';
      case TIME_PERIOD_OPTIONS.BEFORE_2000:
        return 'Before 2000';
      case TIME_PERIOD_OPTIONS.ALL_TIME:
        return 'All time';
      case TIME_PERIOD_OPTIONS.CUSTOM:
        return `${startDate} to ${endDate}`;
      default:
        return filters.timePeriod;
    }
  };

  // Event handler for party search
  const handlePartySearch = (query: string) => {
    setPartySearchQuery(query);
    
    // Update the filters with the party search query
    setFilters({
      ...filters,
      partySearch: query
    });
  };

  // Event handler for keyword search
  const handleKeywordSearch = (query: string) => {
    setKeywordSearchQuery(query);
    
    // Update the filters with the keyword search query
    setFilters({
      ...filters,
      keyword: query
    });
  };

  // Event handler for search mode change
  const handleSearchModeChange = (mode: 'any' | 'all' | 'exact') => {
    setSearchMode(mode);
    
    // Update the filters with the search mode
    setFilters({
      ...filters,
      searchMode: mode,
      // Also update the keyword if it exists, to trigger a new search with the updated mode
      ...(filters.keyword ? { keyword: filters.keyword } : {})
    });
  };

  // Generate caption for keyword search
  const getKeywordCaption = () => {
    if (!filters.keyword) return '';
    
    const modeText = {
      'any': 'Any of these words',
      'all': 'All of these words',
      'exact': 'Exact phrase'
    }[searchMode];
    
    return `${modeText}: ${filters.keyword}`;
  };

  // Handler for citation relevance slider and checkboxes
  const handleCitationChange = (type: 'slider' | 'mostCited' | 'landmark', value: number | boolean) => {
    // Create copies of current state
    let newMostCited = mostCited;
    let newMostCitedLandmark = mostCitedLandmark;
    let newSliderValue = citationSliderValue;
    
    // Update the appropriate state based on type
    if (type === 'slider') {
      newSliderValue = value as number;
      setCitationSliderValue(newSliderValue);
    } else if (type === 'mostCited') {
      newMostCited = value as boolean;
      setMostCited(newMostCited);
      
      // Uncheck landmark if not checking most cited
      if (!newMostCited) {
        newMostCitedLandmark = false;
        setMostCitedLandmark(false);
      }
    } else if (type === 'landmark') {
      newMostCitedLandmark = value as boolean;
      setMostCitedLandmark(newMostCitedLandmark);
      
      // Check mostCited if checking landmark
      if (newMostCitedLandmark) {
        newMostCited = true;
        setMostCited(true);
      }
    }
    
    // Calculate citation relevance based on these values
    const newCitationRelevance: string[] = [];
    
    if (newMostCited) {
      newCitationRelevance.push('most-cited');
    }
    
    if (newMostCitedLandmark) {
      newCitationRelevance.push('landmark-cases');
    }
    
    if (newSliderValue > 0) {
      newCitationRelevance.push(`threshold-${newSliderValue}`);
    }
    
    // Update filter with new values
    handleFilterCategoryChange('citationRelevance', newCitationRelevance);
  };

  // Calculate badges for citation relevance
  const getCitationBadgeCount = () => {
    let count = 0;
    if (mostCited) count += 1;
    if (mostCitedLandmark) count += 1;
    if (citationSliderValue > 0) count += 1;
    return count;
  };

  return (
    <>
      {/* Use the SearchNavbar at the top (outside of main content) */}
      <SearchNavbar onSearch={handleSearch} />
      
      <div className="mt-8"> {/* Added margin top to accommodate fixed navbar */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Column 1: Filter Categories with collapsible functionality */}
          <div 
            className={`${
              isFilterPanelVisible ? 'w-96 min-w-96' : 'w-16 min-w-16'
            } transition-all duration-300 ease-in-out border-r border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 relative`}
          >
            {isFilterPanelVisible ? (
              <>
                {/* Expanded filter panel */}
                <FilterHeader 
                  activeFilters={activeFiltersCount}
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                  onToggleFilterPanel={() => setIsFilterPanelVisible(false)}
                />
                
                <div className="p-5 overflow-y-auto scrollbar-hide" style={{ height: 'calc(100vh - 112px)' }}>
                  {/* Filter Categories with collapsible dropdowns */}
                  <div className="space-y-2">
                    <FilterCategory
                      title="Legal Domain"
                      options={LEGAL_DOMAIN_OPTIONS}
                      selectedOptions={filters.legalDomain || []}
                      badgeCount={filters.legalDomain?.length || 0}
                      onChange={(selectedValues) => handleFilterCategoryChange('legalDomain', selectedValues)}
                    />
                    
                    <FilterCategory
                      title="Document Type"
                      options={DOCUMENT_TYPE_OPTIONS}
                      selectedOptions={filters.documentType || []}
                      badgeCount={filters.documentType?.length || 0}
                      onChange={(selectedValues) => handleFilterCategoryChange('documentType', selectedValues)}
                    />
                    
                    <FilterCategory
                      title="Case Outcome"
                      options={CASE_OUTCOME_OPTIONS}
                      selectedOptions={filters.caseOutcome || []}
                      badgeCount={filters.caseOutcome?.length || 0}
                      onChange={(selectedValues) => handleFilterCategoryChange('caseOutcome', selectedValues)}
                    />
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Time Period"
                        badgeCount={filters.timePeriod ? 1 : 0}
                        isOpen={timeExpanded}
                        onClick={() => setTimeExpanded(!timeExpanded)}
                        caption={getTimePeriodCaption()}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${timeExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: timeExpanded ? '300px' : '0',
                          opacity: timeExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: timeExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: timeExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: timeExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Custom Date Range</h4>
                            <div className="flex items-center gap-2">
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  placeholder="mm/dd/yy"
                                  className="w-full p-2 pl-8 border border-gray-300 rounded text-sm"
                                  value={startDate}
                                  onChange={(e) => handleDateChange(true, e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-sm">to</span>
                              <div className="relative flex-1">
                                <input
                                  type="text"
                                  placeholder="mm/dd/yy"
                                  className="w-full p-2 pl-8 border border-gray-300 rounded text-sm"
                                  value={endDate}
                                  onChange={(e) => handleDateChange(false, e.target.value)}
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-1">
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.LAST_YEAR ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.LAST_YEAR)}
                            >
                              Last year
                            </button>
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.LAST_5_YEARS ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.LAST_5_YEARS)}
                            >
                              Last 5 years
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-1">
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.LAST_10_YEARS ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.LAST_10_YEARS)}
                            >
                              Last 10 years
                            </button>
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.SINCE_2000 ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.SINCE_2000)}
                            >
                              Since 2000
                            </button>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.BEFORE_2000 ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.BEFORE_2000)}
                            >
                              Before 2000
                            </button>
                            <button
                              className={`text-sm p-2 border rounded ${timePeriodSelection === TIME_PERIOD_OPTIONS.ALL_TIME ? 'bg-gray-100 border-gray-400' : 'border-gray-300 hover:bg-gray-50'}`}
                              onClick={() => handleTimePeriodSelect(TIME_PERIOD_OPTIONS.ALL_TIME)}
                            >
                              All time
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Parties Involved"
                        badgeCount={filters.partiesInvolved?.length || 0}
                        isOpen={partiesExpanded}
                        onClick={() => setPartiesExpanded(!partiesExpanded)}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${partiesExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: partiesExpanded ? '400px' : '0',
                          opacity: partiesExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: partiesExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: partiesExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: partiesExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Search by Party Name</h4>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Person, company, or entity name..."
                                className="w-full p-2 pl-8 border border-gray-300 rounded text-sm"
                                value={partySearchQuery}
                                onChange={(e) => handlePartySearch(e.target.value)}
                              />
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('any-party')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'any-party']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'any-party');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Any party</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('plaintiff-petitioner')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'plaintiff-petitioner']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'plaintiff-petitioner');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Plaintiff/Petitioner</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('defendant-respondent')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'defendant-respondent']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'defendant-respondent');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Defendant/Respondent</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('appellant')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'appellant']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'appellant');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Appellant</span>
                              </label>
                            </div>
                            
                            <div>
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('appellee')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'appellee']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'appellee');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Appellee</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('government-entity')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'government-entity']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'government-entity');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Government Entity</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('corporation')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'corporation']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'corporation');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Corporation</span>
                              </label>
                              
                              <label className="flex items-center mb-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.partiesInvolved?.includes('individual')}
                                  onChange={(e) => {
                                    const newPartiesInvolved = e.target.checked 
                                      ? [...(filters.partiesInvolved || []), 'individual']
                                      : (filters.partiesInvolved || []).filter(p => p !== 'individual');
                                    handleFilterCategoryChange('partiesInvolved', newPartiesInvolved);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Individual</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Keyword and Phrase"
                        badgeCount={filters.keyword ? 1 : 0}
                        isOpen={keywordExpanded}
                        onClick={() => setKeywordExpanded(!keywordExpanded)}
                        caption={getKeywordCaption()}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${keywordExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: keywordExpanded ? '300px' : '0',
                          opacity: keywordExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: keywordExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: keywordExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: keywordExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Search by keywords</h4>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="e.g. breach of contracts, damages..."
                                className="w-full p-2 pl-8 border border-gray-300 rounded text-sm"
                                value={keywordSearchQuery}
                                onChange={(e) => handleKeywordSearch(e.target.value)}
                              />
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                className="sr-only"
                                checked={searchMode === 'any'}
                                onChange={() => handleSearchModeChange('any')}
                              />
                              <div className={`w-5 h-5 rounded-full border ${searchMode === 'any' ? 'border-teal-600' : 'border-gray-300'} flex items-center justify-center mr-2`}>
                                {searchMode === 'any' && <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Any of these words</span>
                            </label>
                            
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                className="sr-only"
                                checked={searchMode === 'all'}
                                onChange={() => handleSearchModeChange('all')}
                              />
                              <div className={`w-5 h-5 rounded-full border ${searchMode === 'all' ? 'border-teal-600' : 'border-gray-300'} flex items-center justify-center mr-2`}>
                                {searchMode === 'all' && <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">All of these words</span>
                            </label>
                            
                            <label className="flex items-center cursor-pointer">
                              <input
                                type="radio"
                                className="sr-only"
                                checked={searchMode === 'exact'}
                                onChange={() => handleSearchModeChange('exact')}
                              />
                              <div className={`w-5 h-5 rounded-full border ${searchMode === 'exact' ? 'border-teal-600' : 'border-gray-300'} flex items-center justify-center mr-2`}>
                                {searchMode === 'exact' && <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>}
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300">Exact phrase</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Citation Relevance"
                        badgeCount={getCitationBadgeCount()}
                        isOpen={citationExpanded}
                        onClick={() => setCitationExpanded(!citationExpanded)}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${citationExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: citationExpanded ? '300px' : '0',
                          opacity: citationExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: citationExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: citationExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: citationExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div>
                            <div className="flex items-center gap-4 mb-3">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={mostCited}
                                  onChange={(e) => handleCitationChange('mostCited', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Most Cited</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={mostCitedLandmark}
                                  onChange={(e) => handleCitationChange('landmark', e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Most Cited (Landmark Cases)</span>
                              </label>
                            </div>
                            
                            <div className="mt-5">
                              <div className="mb-2">
                                <h4 className="text-sm font-medium mb-1">Threshold</h4>
                              </div>
                              
                              <div className="relative h-1 mx-4">
                                {/* Background track (gray) */}
                                <div className="absolute w-full h-1 bg-gray-200 rounded-full"></div>
                                
                                {/* Filled track (black) */}
                                <div 
                                  className="absolute h-1 bg-black rounded-full" 
                                  style={{
                                    width: `${citationSliderValue}%`,
                                  }}
                                ></div>
                                
                                {/* Hidden input for interaction */}
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={citationSliderValue}
                                  onChange={(e) => handleCitationChange('slider', parseInt(e.target.value))}
                                  className="absolute w-full h-8 opacity-0 cursor-pointer z-10"
                                  style={{ top: '-12px' }}
                                />
                                
                                {/* Handle (circle) */}
                                <div 
                                  className="absolute w-5 h-5 bg-white rounded-full shadow border border-gray-300 z-20 pointer-events-none"
                                  style={{
                                    left: `calc(${citationSliderValue}%)`,
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    marginTop: '0',
                                    touchAction: 'none'
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Cross References"
                        badgeCount={filters.crossReferences?.length || 0}
                        isOpen={crossRefsExpanded}
                        onClick={() => setCrossRefsExpanded(!crossRefsExpanded)}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${crossRefsExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: crossRefsExpanded ? '400px' : '0',
                          opacity: crossRefsExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: crossRefsExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: crossRefsExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: crossRefsExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Reference Type</h4>
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Person, company, or entity name..."
                                className="w-full p-2 pl-8 border border-gray-300 rounded text-sm"
                                value={partySearchQuery}
                                onChange={(e) => handlePartySearch(e.target.value)}
                              />
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h4 className="text-sm font-medium mb-2">Reference Document</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.crossReferences?.includes('any-reference')}
                                  onChange={(e) => {
                                    const newRefs = e.target.checked 
                                      ? [...(filters.crossReferences || []), 'any-reference']
                                      : (filters.crossReferences || []).filter(r => r !== 'any-reference');
                                    handleFilterCategoryChange('crossReferences', newRefs);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Any reference</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.crossReferences?.includes('related-statutes')}
                                  onChange={(e) => {
                                    const newRefs = e.target.checked 
                                      ? [...(filters.crossReferences || []), 'related-statutes']
                                      : (filters.crossReferences || []).filter(r => r !== 'related-statutes');
                                    handleFilterCategoryChange('crossReferences', newRefs);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Related statutes/regulations</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.crossReferences?.includes('document-site')}
                                  onChange={(e) => {
                                    const newRefs = e.target.checked 
                                      ? [...(filters.crossReferences || []), 'document-site']
                                      : (filters.crossReferences || []).filter(r => r !== 'document-site');
                                    handleFilterCategoryChange('crossReferences', newRefs);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Document that site this</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.crossReferences?.includes('related-cases')}
                                  onChange={(e) => {
                                    const newRefs = e.target.checked 
                                      ? [...(filters.crossReferences || []), 'related-cases']
                                      : (filters.crossReferences || []).filter(r => r !== 'related-cases');
                                    handleFilterCategoryChange('crossReferences', newRefs);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Related cases</span>
                              </label>
                              
                              <label className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 h-4 w-4 cursor-pointer"
                                  checked={filters.crossReferences?.includes('document-cited')}
                                  onChange={(e) => {
                                    const newRefs = e.target.checked 
                                      ? [...(filters.crossReferences || []), 'document-cited']
                                      : (filters.crossReferences || []).filter(r => r !== 'document-cited');
                                    handleFilterCategoryChange('crossReferences', newRefs);
                                  }}
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Document cited site this</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
                      <AnimatedFilterHeader
                        title="Advanced Options"
                        isOpen={advancedExpanded}
                        onClick={() => setAdvancedExpanded(!advancedExpanded)}
                      />
                      
                      <div
                        className={`overflow-hidden transition-all ${advancedExpanded ? 'opacity-100' : 'opacity-0'}`}
                        style={{ 
                          maxHeight: advancedExpanded ? '200px' : '0',
                          opacity: advancedExpanded ? 1 : 0,
                          transitionProperty: 'max-height, opacity, visibility',
                          transitionDuration: advancedExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
                          transitionTimingFunction: 'ease-out, ease, ease',
                          transitionDelay: advancedExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
                          visibility: advancedExpanded ? 'visible' : 'hidden'
                        }}
                      >
                        <div className="pt-3 pb-3 px-1">
                          <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Include overruled precedents</span>
                              <button 
                                onClick={() => {
                                  setIncludeOverruled(!includeOverruled);
                                  const newAdvancedOptions = [...(filters.advancedOptions || [])];
                                  if (!includeOverruled) {
                                    newAdvancedOptions.push('overruled-precedents');
                                  } else {
                                    const index = newAdvancedOptions.indexOf('overruled-precedents');
                                    if (index > -1) newAdvancedOptions.splice(index, 1);
                                  }
                                  setFilters({...filters, advancedOptions: newAdvancedOptions});
                                }}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${includeOverruled ? 'bg-teal-600' : 'bg-gray-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${includeOverruled ? 'translate-x-5' : 'translate-x-0'}`}></span>
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Include concurring opinions</span>
                              <button 
                                onClick={() => {
                                  setIncludeConcurring(!includeConcurring);
                                  const newAdvancedOptions = [...(filters.advancedOptions || [])];
                                  if (!includeConcurring) {
                                    newAdvancedOptions.push('concurring-opinions');
                                  } else {
                                    const index = newAdvancedOptions.indexOf('concurring-opinions');
                                    if (index > -1) newAdvancedOptions.splice(index, 1);
                                  }
                                  setFilters({...filters, advancedOptions: newAdvancedOptions});
                                }}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${includeConcurring ? 'bg-teal-600' : 'bg-gray-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${includeConcurring ? 'translate-x-5' : 'translate-x-0'}`}></span>
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 dark:text-gray-300">Include dissenting opinions</span>
                              <button 
                                onClick={() => {
                                  setIncludeDissenting(!includeDissenting);
                                  const newAdvancedOptions = [...(filters.advancedOptions || [])];
                                  if (!includeDissenting) {
                                    newAdvancedOptions.push('dissenting-opinions');
                                  } else {
                                    const index = newAdvancedOptions.indexOf('dissenting-opinions');
                                    if (index > -1) newAdvancedOptions.splice(index, 1);
                                  }
                                  setFilters({...filters, advancedOptions: newAdvancedOptions});
                                }}
                                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${includeDissenting ? 'bg-teal-600' : 'bg-gray-200'}`}
                              >
                                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${includeDissenting ? 'translate-x-5' : 'translate-x-0'}`}></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Collapsed filter panel - only shows filter icon with count in row
              <div className="h-[57px] p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <button
                  onClick={() => setIsFilterPanelVisible(true)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <div className="flex flex-row items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    
                    <span className="text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
          
          {/* Column 2: Search Results/Case Feed - Hide scrollbar and set to half width */}
          <div 
            className="w-1/2 min-w-96 border-r border-gray-200 dark:border-gray-700 overflow-y-auto scrollbar-hide"
          >
            <div className="h-[57px] p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
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
 