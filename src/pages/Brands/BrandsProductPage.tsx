import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByBrand } from '@/services/brands';
import ProductCard from '@/components/Product/ProductCard';
import ProductSkeleton from '@/components/Product/ProductSkeleton';
import { type Product } from '@/types/product';
import Breadcrumbs from '@/components/Breadcrumbs';

const PAGE_SIZE = 12;

const BrandProductsPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchBrandProducts = async () => {
      setIsLoading(true);
      try {
        const newProducts = await fetchProductsByBrand(slug!, page);
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
  }, [slug, page]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
