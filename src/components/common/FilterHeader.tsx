import React from 'react';
import { Button } from "@/components/common/Button";
import { HideTab } from "@/assets";

interface FilterHeaderProps {
  activeFilters: number;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onToggleFilterPanel?: () => void;
}

export function FilterHeader({ activeFilters, onApplyFilters, onResetFilters, onToggleFilterPanel }: FilterHeaderProps) {
  return (
    <div className="h-[57px] p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span className="text-base font-medium text-gray-700 dark:text-gray-300">Filters</span>
          {activeFilters > 0 && (
            <span className="text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {activeFilters}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="primary" 
            size="sm"
            className="bg-gray-800 hover:bg-gray-700 border-none"
            onClick={onApplyFilters}
          >
            Apply filters
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="text-gray-700 border-gray-300 hover:bg-gray-100 bg-white"
            onClick={onResetFilters}
          >
            Reset
          </Button>
          {onToggleFilterPanel && (
            <button 
              onClick={onToggleFilterPanel}
              className="text-gray-500 hover:text-gray-700 ml-2"
            >
              <img src={HideTab} alt="Hide filter panel" width="20" height="20" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 