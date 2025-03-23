import React, { useState } from 'react';
import { LegalCase } from '@/types';

interface CaseDetailProps {
  caseData: LegalCase;
}

type TabType = 'summary' | 'digest' | 'timeline' | 'qa' | 'jurisprudence';

export function CaseDetail({ caseData }: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('summary');
  
  return (
    <div className="h-full bg-white dark:bg-gray-800 rounded-lg overflow-auto">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl font-bold dark:text-white">{caseData.title}</h1>
          
          <div className="flex items-center space-x-2">
            <button className="text-gray-500" aria-label="View PDF">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button className="text-gray-500" aria-label="Bookmark case">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Citations and references */}
        <div className="flex mb-4">
          {caseData.cited && (
            <div className="flex items-center mr-4">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Cited In</span>
              <span className="text-sm font-medium dark:text-white">{caseData.cited}</span>
            </div>
          )}
          
          {caseData.crossRef && (
            <div className="flex items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Cross Ref</span>
              <span className="text-sm font-medium dark:text-white">{caseData.crossRef}</span>
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
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
        
        {/* Case metadata */}
        {caseData.decision && (
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Case</p>
              <p className="font-medium dark:text-white">{caseData.caseNumber}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Decision Date</p>
              <p className="font-medium dark:text-white">{caseData.decision.date}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Ponente</p>
              <p className="font-medium dark:text-white">{caseData.ponente || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Case Category</p>
              <p className="font-medium dark:text-white">{caseData.category || 'N/A'}</p>
            </div>
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700">
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'summary' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'digest' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('digest')}
          >
            Case Digest
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'timeline' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'qa' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('qa')}
          >
            Q&A
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'jurisprudence' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
            onClick={() => setActiveTab('jurisprudence')}
          >
            Jurisprudence
          </button>
        </div>
      </div>
      
      {/* Tab content */}
      <div className="p-4">
        {activeTab === 'summary' && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Case Summary</h2>
            {caseData.summary ? (
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{caseData.summary}</p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No summary available for this case.</p>
            )}
          </div>
        )}
        
        {activeTab === 'digest' && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Case Digest</h2>
            <p className="text-gray-500 dark:text-gray-400">Case digest content will appear here.</p>
          </div>
        )}
        
        {activeTab === 'timeline' && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Case Timeline</h2>
            <p className="text-gray-500 dark:text-gray-400">Timeline content will appear here.</p>
          </div>
        )}
        
        {activeTab === 'qa' && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Questions & Answers</h2>
            <p className="text-gray-500 dark:text-gray-400">Q&A content will appear here.</p>
          </div>
        )}
        
        {activeTab === 'jurisprudence' && (
          <div>
            <h2 className="text-lg font-medium mb-4 dark:text-white">Related Jurisprudence</h2>
            <p className="text-gray-500 dark:text-gray-400">Jurisprudence content will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
} 