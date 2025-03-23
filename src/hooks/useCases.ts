import { useState, useEffect } from 'react';
import { LegalCase, SearchFilters } from '@/types';
import { fetchLegalCases } from '@/utils/mockData';

interface UseCasesResult {
  cases: LegalCase[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCases(filters?: SearchFilters): UseCasesResult {
  const [cases, setCases] = useState<LegalCase[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCases = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetchLegalCases(filters);
      setCases(response.data);
      setTotalResults(response.totalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [filters?.caseType, filters?.keyword]); // Re-fetch when key filters change

  return { cases, totalResults, isLoading, error, refetch: fetchCases };
} 