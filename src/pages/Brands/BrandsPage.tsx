import { useEffect, useState } from 'react';
import { fetchAllBrands, type Brand } from '@/services/brands';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@/components/Breadcrumbs';

const BrandsPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const loadBrands = async () => {
      const data = await fetchAllBrands();
      setBrands(data);
    };
    loadBrands();
  }, []);

  const groupByFirstLetter = (brands: Brand[]) => {
    const grouped: Record<string, Brand[]> = {};
    brands.forEach((brand) => {
      const letter = brand.name[0].toUpperCase();
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(brand);
    });
    return grouped;
  };

  const groupedBrands = groupByFirstLetter(brands);

  return (
    <div className="font-mono mt-6">
      <Breadcrumbs />
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {Object.keys(groupedBrands).sort().map(letter => (
          <div key={letter}>
            <h2 className="text-lg font-semibold mb-2">{letter}</h2>
            <ul className="space-y-1">
              {groupedBrands[letter].map(brand => (
                <li key={brand.id}>
                  <Link
                    to={`/brands/${brand.slug}`}
                    className="text-black-default hover:underline"
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
