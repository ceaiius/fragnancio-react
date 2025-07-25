import { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { type Product } from '@/types/product';
import ProductCard from '@/components/Product/ProductCard';
import ProductSkeleton from '../Product/ProductSkeleton';
import { fetchProductsByCategory } from '@/services/products';
import Breadcrumbs from '../Breadcrumbs';
import FiltersBar from '../Filters/FiltersBar';
import type { Filters } from '@/types/filters';
import { filtersToQueryParams, queryParamsToFilters } from '@/utils/filterQuery';

const PAGE_SIZE = 12; 

const Category = () => {
  const { slug } = useParams<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  // Initialize filters from URL on mount
  const [selectedFilters, setSelectedFilters] = useState<Filters>(() => queryParamsToFilters(searchParams));
  const [selectedSort, setSelectedSort] = useState("");

  // Keep filters in sync with URL
  useEffect(() => {
    setSearchParams(filtersToQueryParams(selectedFilters), { replace: true });
  }, [selectedFilters, setSearchParams]);

  useEffect(() => {
    if (isLoading && page > 1) {
        console.log(`Fetch skipped for page ${page}: isLoading is true.`);
        return;
      }
      if (!hasMore && page > 1) {
        console.log(`Fetch skipped for page ${page}: no more products.`);
        return;
      }

    if (!slug) return; 
    const fetchCategoryProducts = async () => {
        setIsLoading(true);

        try {
            const newProducts = await fetchProductsByCategory(slug, page, selectedFilters, selectedSort);
            setProducts((prevProducts) => {
                return page === 1 ? newProducts : [...prevProducts, ...newProducts];
            });
            setHasMore(newProducts.length >= PAGE_SIZE);

            
        } catch (error) {
            console.error('Error fetching category products', error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };
  
    fetchCategoryProducts();
  }, [slug, page, selectedFilters, selectedSort]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const currentLoaderRef = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(currentLoaderRef);

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [hasMore, isLoading, loaderRef]);



  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
  }, [slug]);

  // When the URL changes (e.g. user pastes a new URL), update filters
  useEffect(() => {
    setSelectedFilters(queryParamsToFilters(searchParams));
  }, [searchParams]);

  return (
    <div className="w-full max-w-[1280px] px-2 sm:px-4 py-4 mx-auto mt-4 mb-8 font-mono">
      <Breadcrumbs />
      
      <h1 className="text-2xl font-bold mb-4 capitalize">{slug} Products</h1>
      <div className='border-b'></div>
      <FiltersBar selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} selectedSort={selectedSort} setSelectedSort={setSelectedSort}/>
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
        {isLoading && page == 1
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
      </div>

      {hasMore && (
        <div ref={loaderRef} className="mt-6 py-4 text-center">
          {isLoading && page > 1 ? (
            <p className="text-gray-500">Loading more...</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
      )}

    </div>
    
  );
};

export default Category;
