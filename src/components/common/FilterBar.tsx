import React from 'react';
import { SearchFilters } from '@/types';
import { Button } from './Button';

interface FilterBarProps {
  filters: SearchFilters;
  resultsCount: number;
  onFilterChange: (filters: SearchFilters) => void;
}

export function FilterBar({ filters, resultsCount, onFilterChange }: FilterBarProps) {
  const handleTabChange = (caseType: 'Case' | 'Law' | 'All') => {
    onFilterChange({ ...filters, caseType });
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 border-b dark:border-gray-700 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="mr-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">Filters</span>
            {Object.values(filters).filter(Boolean).length > 1 && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {Object.values(filters).filter(Boolean).length - 1}
              </span>
            )}
          </button>
          
          <div className="flex">
            <Button 
              variant={filters.caseType === 'Case' ? 'primary' : 'default'}
              size="sm"
              className={`rounded-r-none ${filters.caseType === 'Case' ? 'bg-indigo-500 text-white' : ''}`}
              onClick={() => handleTabChange('Case')}
            >
              Case 74k
            </Button>
            <Button 
              variant={filters.caseType === 'Law' ? 'primary' : 'default'}
              size="sm"
              className={`rounded-l-none ${filters.caseType === 'Law' ? 'bg-indigo-500 text-white' : ''}`}
              onClick={() => handleTabChange('Law')}
            >
              Law 74k
            </Button>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {resultsCount.toLocaleString()} results
        </div>
      </div>
      
      {/* Additional filter options can be added here */}
      <div className="flex justify-between">
        <div className="space-y-2">
          {/* Legal Domain */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Legal Domain</div>
          
          {/* Document Type */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Document Type</div>
          
          {/* Case Outcome */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Case Outcome</div>
        </div>
        
        <div className="space-y-2">
          {/* Time Period */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Time Period</div>
          
          {/* Parties Involved */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Parties Involved</div>
          
          {/* Keyword and Phrase */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Keyword and Phrase</div>
        </div>
      </div>
    </div>
  );
} 