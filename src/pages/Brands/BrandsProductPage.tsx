import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { fetchProductsByBrand } from '@/services/brands';
import ProductCard from '@/components/Product/ProductCard';
import ProductSkeleton from '@/components/Product/ProductSkeleton';
import { type Product } from '@/types/product';
import Breadcrumbs from '@/components/Breadcrumbs';
import FiltersBar from '@/components/Filters/FiltersBar';
import type { Filters } from '@/types/filters';
import { filtersToQueryParams, queryParamsToFilters } from '@/utils/filterQuery';

const PAGE_SIZE = 12;

const BrandProductsPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  // Memoize filters so the object reference only changes when the params actually change
  const filters = useMemo(() => queryParamsToFilters(searchParams), [searchParams]);
  const [selectedSort, setSelectedSort] = useState("");

  // Only update the URL if filters actually change
  const setFilters = useCallback<React.Dispatch<React.SetStateAction<Filters>>>((value) => {
    setSearchParams(prevParams => {
      const prevFilters = queryParamsToFilters(prevParams);
      const nextFilters = typeof value === 'function' ? value(prevFilters) : value;
      // Only update if filters actually change
      const prevString = filtersToQueryParams(prevFilters).toString();
      const nextString = filtersToQueryParams(nextFilters).toString();
      if (prevString === nextString) return prevParams; // No change, don't update
      return filtersToQueryParams(nextFilters);
    }, { replace: true });
  }, [setSearchParams]);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      setIsLoading(true);
      try {
        const newProducts = await fetchProductsByBrand(slug!, page, filters, selectedSort);
        setProducts((prev) => (page === 1 ? newProducts : [...prev, ...newProducts]));
        setHasMore(newProducts.length >= PAGE_SIZE);
      } catch (err) {
        console.error('Error loading brand products', err);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrandProducts();
    // Only run when the actual filter values change, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, page, JSON.stringify(filters), selectedSort]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
  }, [slug]);

  return (
    <div className="max-w-[1280px] mx-auto mt-4 mb-8 font-mono px-4">
      <Breadcrumbs/>
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug}</h1>
      <FiltersBar selectedFilters={filters} setSelectedFilters={setFilters} selectedSort={selectedSort} setSelectedSort={setSelectedSort} hideBrandFilter={true} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {isLoading && page === 1
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="mt-6 py-4 text-center">
          {isLoading ? <p className="text-gray-500">Loading more...</p> : <p>&nbsp;</p>}
        </div>
      )}
    </div>
  );
};

export default BrandProductsPage;
