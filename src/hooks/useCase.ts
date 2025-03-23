import { useState, useEffect, useCallback } from 'react';
import { LegalCase } from '@/types';
import { fetchCaseById } from '@/utils/mockData';

interface UseCaseResult {
  caseData: LegalCase | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCase(caseId: string): UseCaseResult {
  const [caseData, setCaseData] = useState<LegalCase | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<number>(0);

  const fetchCase = useCallback(async () => {
    if (!caseId) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchCaseById(caseId);
      if (response.success) {
        setCaseData(response.data);
      } else {
        setError(response.error || 'Failed to fetch case data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // If this is a random error (from mockData), we could retry
      if (retryCount < 2) { // Limit to 2 retries
        setRetryCount(prev => prev + 1);
        console.log(`Retrying fetch for case ${caseId}, attempt ${retryCount + 1}`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [caseId, retryCount]);

  // Initial fetch and when caseId changes
  useEffect(() => {
    fetchCase();
  }, [fetchCase]);

  // Handle retries when retryCount changes
  useEffect(() => {
    if (retryCount > 0 && error) {
      // Add a small delay before retrying
      const timer = setTimeout(() => {
        fetchCase();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [retryCount, error, fetchCase]);

  // Reset retry count when caseId changes
  useEffect(() => {
    setRetryCount(0);
  }, [caseId]);

  return { 
    caseData, 
    isLoading, 
    error, 
    refetch: () => {
      setRetryCount(0); // Reset retry count on manual refetch
      return fetchCase();
    }
  };
} 