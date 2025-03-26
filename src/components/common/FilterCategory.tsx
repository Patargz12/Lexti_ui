import React, { useState, useRef, useEffect } from 'react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterCategoryProps {
  title: string;
  options: FilterOption[];
  selectedOptions: string[];
  badgeCount?: number;
  initialExpanded?: boolean;
  onChange: (selectedIds: string[]) => void;
}

export function FilterCategory({ 
  title, 
  options, 
  selectedOptions, 
  badgeCount = 0,
  initialExpanded = false,
  onChange 
}: FilterCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(initialExpanded ? 500 : 0);

  useEffect(() => {
    // When expanded, set the actual height of the content for the animation
    if (isExpanded && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    } else {
      setContentHeight(0);
    }
  }, [isExpanded, options.length]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCheckboxChange = (optionId: string) => {
    let newSelectedOptions: string[];
    
    if (selectedOptions.includes(optionId)) {
      // If already selected, remove it
      newSelectedOptions = selectedOptions.filter(id => id !== optionId);
    } else {
      // If not selected, add it
      newSelectedOptions = [...selectedOptions, optionId];
    }
    
    onChange(newSelectedOptions);
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-3">
      <div 
        className="flex justify-between items-center py-2.5 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h3>
          {badgeCount !== undefined && (
            <span className="ml-2 text-xs bg-tertiary-500/10 font-semibold text-tertiary-500 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
              {badgeCount}
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out ${isExpanded ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ 
          maxHeight: `${contentHeight}px`,
          opacity: isExpanded ? 1 : 0,
          transitionProperty: 'max-height, opacity, visibility',
          transitionDuration: isExpanded ? '600ms, 800ms, 0s' : '400ms, 300ms, 0s',
          transitionTimingFunction: 'ease-out, ease, ease',
          transitionDelay: isExpanded ? '0s, 100ms, 0s' : '0s, 0s, 400ms',
          visibility: isExpanded ? 'visible' : 'hidden'
        }}
      >
        <div className="pt-3 pb-1 px-1">
          <div className={`grid grid-cols-2 gap-x-4 gap-y-2.5 ${options.length > 12 ? 'md:grid-cols-2' : ''}`}>
            {options.map((option, index) => (
              <div 
                key={option.id} 
                className="flex items-center opacity-0 animate-fadeIn"
                style={{
                  animationDelay: `${Math.min(index, 15) * 20}ms`, // Cap delay at 15 items to avoid too long delays
                  animationFillMode: 'forwards'
                }}
              >
                <input
                  id={`${title}-${option.id}`}
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => handleCheckboxChange(option.id)}
                />
                <label
                  htmlFor={`${title}-${option.id}`}
                  className="ml-2.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer truncate"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
