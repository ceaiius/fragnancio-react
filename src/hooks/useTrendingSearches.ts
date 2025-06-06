import { useState, useEffect, useRef } from 'react';
import { getTrendingPrompts, type searchPrompts } from '@/services/searchService';

export const useTrendingSearches = () => {
  const [trendingPrompts, setTrendingPrompts] = useState<searchPrompts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasLoaded = useRef(false);

  // Accepts a 'force' parameter to always fetch, even if trendingPrompts is not empty
  const loadTrendingSearches = async (force = false) => {
    if (!force && trendingPrompts.length > 0) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getTrendingPrompts();
      setTrendingPrompts(data.trending);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load trending searches'));
      setTrendingPrompts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load trending searches on mount
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadTrendingSearches();
    }
  }, []); // Empty dependency array means this runs once on mount

  return {
    trendingPrompts,
    isLoading,
    error,
    loadTrendingSearches, // Call with loadTrendingSearches(true) to force refetch
  };
}; 