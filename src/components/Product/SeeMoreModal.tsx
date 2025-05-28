import { useEffect, useRef, useState } from 'react'; 
import { fetchProductsByCategory } from '@/services/products';
import { type Product } from '@/types/product';
import ProductCard from './ProductCard';

const PAGE_SIZE = 10; 

const SeeMoreModal = ({
  categoryKey,
  onClose,
}: {
  categoryKey: string;
  onClose: () => void;
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const prevCategoryKeyRef = useRef<string | undefined>(undefined);
  const isLoadingRef = useRef(isLoading);

  // Ref for the modal's content area
  const modalContentRef = useRef<HTMLDivElement | null>(null);

  // Effect for handling category changes
  useEffect(() => {
    if (prevCategoryKeyRef.current !== categoryKey) {
      console.log(`Category changed to: ${categoryKey}. Resetting state.`);
      setProducts([]);
      setPage(1);
      setHasMore(true);
      // setIsLoading(false); // Reset loading if category change interrupts
      prevCategoryKeyRef.current = categoryKey;
    }
  }, [categoryKey]);

  useEffect(() => {

    if (!hasMore && page > 1) {
      console.log(`Fetch skipped for page ${page}: no more products.`);
      return;
    }

    const loadProducts = async () => {
      setIsLoading(true);
      console.log(`Fetching products - Category: ${categoryKey}, Page: ${page}`);
      try {
        const newProducts = await fetchProductsByCategory(categoryKey, page);
        setProducts((prevProducts) => {
          return page === 1 ? newProducts : [...prevProducts, ...newProducts];
        });
        setHasMore(newProducts.length >= PAGE_SIZE);
        if (newProducts.length < PAGE_SIZE) {
            console.log("No more products to load for this category.");
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [page, categoryKey]);

  useEffect(() => {
    if (!loaderRef.current) return;

    const currentLoaderRef = loaderRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoadingRef.current) {
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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]); 

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg w-[90%] max-w-6xl p-6 overflow-y-auto max-h-[90vh] relative"
      >
        <button
          className="absolute top-2 right-2 text-gray-600 text-2xl leading-none hover:text-black"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {categoryKey.replace(/_/g, ' ')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && (
          <div ref={loaderRef} className="mt-6 py-4 text-center">
            {isLoading ? <p className="text-gray-500">Loading more...</p> : <p> </p>}
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-gray-500">No more products in this category.</p>
          </div>
        )}
        {products.length === 0 && !isLoading && !hasMore && (
          <div className="mt-6 text-center">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeeMoreModal;