import React from 'react';
import { LegalCase } from '@/types';

interface CaseCardProps {
  caseData: LegalCase;
  isSelected?: boolean;
  onSelect: (caseId: string) => void;
}

export function CaseCard({ caseData, isSelected = false, onSelect }: CaseCardProps) {
  return (
    <div 
      className={`border-b p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
      }`}
      onClick={() => onSelect(caseData.id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm text-gray-600 dark:text-gray-400">{caseData.caseNumber}</h3>
        
        {/* Bookmark icon placeholder */}
        <button className="text-gray-400 dark:text-gray-500" aria-label="Bookmark case">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      
      <h2 className="font-medium text-gray-900 dark:text-white mb-1">{caseData.title}</h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{caseData.date}</p>
      
      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{caseData.description}</p>
      
      {/* Tags / Categories */}
      <div className="flex mt-3 space-x-2">
        {caseData.politicalLaw && (
          <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded">
            Political Law
          </span>
        )}
        
        {caseData.remedialLaw && (
          <span className="inline-flex items-center text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded">
            Remedial Law
          </span>
        )}
        
        {caseData.legalEthics && (
          <span className="inline-flex items-center text-xs bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded">
            Legal Ethics
          </span>
        )}
      </div>
    </div>
  );
} 