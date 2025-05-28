import { useEffect, useState } from 'react';
import { fetchHomeProducts } from '@/services/products';
import { type Product } from '@/types/product';
import ProductCard from '@/components/Product/ProductCard';

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

  const sections: Section[] = [
    { title: 'Suggested For You', key: 'suggested' },
    { title: 'Popular This Week', key: 'popular' },
    { title: 'Recently Viewed', key: 'recently_viewed' },
  ];

  useEffect(() => {
    fetchHomeProducts().then(setProducts);
  }, []);

  return (
    <div className="max-w-[1280px] w-full px-0 py-4 ml-auto mr-auto mb-8 mt-4 text-black-default font-mono">
      {sections.map((section) => (
        <div key={section.key} className='mt-12'>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <button className="text-blue-default hover:underline">See More</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {products[section.key].map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

type HomeState = {
  suggested: Product[];
  popular: Product[];
  recently_viewed: Product[];
};

export default Home;
