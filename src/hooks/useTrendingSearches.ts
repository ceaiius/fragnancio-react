import { useState, useEffect, useRef } from 'react';
import { getTrendingPrompts, type searchPrompts } from '@/services/searchService';

export const useTrendingSearches = () => {
  const [trendingPrompts, setTrendingPrompts] = useState<searchPrompts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const hasLoaded = useRef(false);

  const loadTrendingSearches = async () => {
    // Only prevent loading if we already have data
    if (trendingPrompts.length > 0) return;
    
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
    loadTrendingSearches
  };
}; 