import { useEffect, useState } from 'react';
import { fetchHomeProducts } from '@/services/products';
import { type Product } from '@/types/product';
import ProductCard from '@/components/Product/ProductCard';
import SeeMoreModal from '@/components/Product/SeeMoreModal';
import ProductSkeleton from '@/components/Product/ProductSkeleton';

type Section = {
  title: string;
  key: keyof HomeState;
};

const Home = () => {
  const [products, setProducts] = useState<HomeState>({
    suggested: [],
    popular: [],
    recently_viewed: [],
  });

  const [selectedCategory, setSelectedCategory] = useState<keyof HomeState | null>(null);
  const [loading, setLoading] = useState(true);
  const sections: Section[] = [
    { title: 'Suggested For You', key: 'suggested' },
    { title: 'Popular This Week', key: 'popular' },
    { title: 'Recently Viewed', key: 'recently_viewed' },
  ];

  useEffect(() => {
    fetchHomeProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-[1280px] w-full px-0 py-4 ml-auto mr-auto mb-8 mt-4 text-black-default font-mono">
      {sections.map((section) => (
        <div key={section.key} className='mt-12'>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <button
              className="text-blue-default hover:underline"
              onClick={() => setSelectedCategory(section.key)}
            >
              See More
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
            : products[section.key].map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      ))}

      {selectedCategory && (
        <SeeMoreModal
          categoryKey={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

type HomeState = {
  suggested: Product[];
  popular: Product[];
  recently_viewed: Product[];
};

export default Home;
