import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { type Product } from '@/types/product';
import ProductCard from '@/components/Product/ProductCard';
import { searchProducts } from '@/services/searchService';
import ProductSkeleton from '@/components/Product/ProductSkeleton';
import Breadcrumbs from '@/components/Breadcrumbs';
import FiltersBar from '@/components/Filters/FiltersBar';
import type { Filters } from '@/types/filters';
import { queryParamsToFilters } from '@/utils/filterQuery';

const PAGE_SIZE = 12;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [selectedSort, setSelectedSort] = useState("");

  // Memoize filters so the object reference only changes when the params actually change
  const filters = useMemo(() => queryParamsToFilters(searchParams), [searchParams]);

  // Only update the URL if filters actually change
  const setFilters = useCallback<React.Dispatch<React.SetStateAction<Filters>>>((value) => {
    setSearchParams(prevParams => {
      const prevFilters = queryParamsToFilters(prevParams);
      const nextFilters = typeof value === 'function' ? value(prevFilters) : value;
      const newParams = new URLSearchParams(prevParams);
      
      // Clear existing filter params
      for (const key of Object.keys(prevFilters)) {
        newParams.delete(key);
      }
      
      // Add new filter params
      Object.entries(nextFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          newParams.set(key, String(value));
        }
      });
      
      return newParams;
    }, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const results = await searchProducts(query, page, filters, selectedSort);
        if (page === 1 && results.length === 0) {
          setError('No products found matching your search criteria. Try adjusting your filters or search term.');
        }
        setProducts((prev) => (page === 1 ? results : [...prev, ...results]));
        setHasMore(results.length >= PAGE_SIZE);
      } catch (err) {
        setError('Failed to fetch search results');
        console.error(err);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page, filters, selectedSort]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    setError(null);
  }, [query, filters, selectedSort]);

  return (
    <div className="w-full max-w-[1280px] px-2 sm:px-4 py-4 mx-auto mt-4 mb-8 font-mono">
      <Breadcrumbs />
      <h1 className="text-2xl font-bold mb-4">
        “{query}”
      </h1>
      <div className='border-b'></div>
      
      <FiltersBar 
        selectedFilters={filters} 
        setSelectedFilters={setFilters} 
        selectedSort={selectedSort} 
        setSelectedSort={setSelectedSort} 
      />

      {error ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => {
              setFilters({});
              setError(null);
            }}
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
            {loading && page === 1
              ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="mt-6 py-4 text-center">
              {loading && page > 1 ? (
                <p className="text-gray-500">Loading more...</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage; 