import React from 'react';
import { Button } from "@/components/common/Button";
import { HideTab } from "@/assets";

interface FilterHeaderProps {
  activeFilters: number;
  onApplyFilters: () => void;
  onResetFilters: () => void;
  onToggleFilterPanel?: () => void;
  disabled?: boolean;
}

export function FilterHeader({ activeFilters, onApplyFilters, onResetFilters, onToggleFilterPanel, disabled = false }: FilterHeaderProps) {
  return (
    <div className="h-[57px] px-4 py-2 border-b border-gray-200  dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5" >
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 4.25A.75.75 0 013.75 3.5h16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-.22.53l-6.5 6.5a.75.75 0 00-.22.53v6.44a.75.75 0 01-.31.6l-3.5 2.5a.75.75 0 01-1.2-.6v-8.94a.75.75 0 00-.22-.53l-6.5-6.5a.75.75 0 01-.22-.53v-1.5z" />
            </svg>
            <span className="text-base font-bold text-gray-700 dark:text-gray-300">Filters</span>
          </div>
          <span className="text-xs bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
            {activeFilters}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="accent" 
            size="sm"
            className={`px-4 py-2 ${disabled ? 'opacity-50 cursor-not-allowed disabled:cursor-not-allowed disabled:hover:bg-gray-300' : ''}`}
            onClick={onApplyFilters}
            disabled={disabled}
          >
            Apply filters
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="text-gray-700 py-2 hover:bg-gray-100 bg-white"
            onClick={onResetFilters}
          >
            Reset
          </Button>
          {onToggleFilterPanel && (
            <button 
              onClick={onToggleFilterPanel}
              className="text-gray-500 hover:text-gray-700 "
            >
              <img src={HideTab} alt="Hide filter panel" width="20" height="20" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 