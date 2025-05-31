import API from '@/lib/api';
import type { Filters } from '@/types/filters';
import { type Product } from '@/types/product';

export const fetchHomeProducts = async (): Promise<{
  suggested: Product[];
  popular: Product[];
  recently_viewed: Product[];
}> => {
  const res = await API.get('/home');
  return res.data;
};

export const fetchProducts = async (type?: string, page = 1): Promise<{
  data: Product[];
  meta: unknown;
}> => {
  const res = await API.get('/products', { params: { type, page } });
  return res.data;
};

export const fetchProductsByCategory = async (category: string, page: number, selectedFilters: Filters) => {
  const isVirtual = ['suggested', 'popular', 'recently_viewed'].includes(category);

  const params = new URLSearchParams({ page: String(page) });
  Object.entries(selectedFilters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  const url = isVirtual
    ? `/home/${category}?${params.toString()}`
    : `/categories/${category}/products?${params.toString()}`;

  const res = await API.get(url);
  return res.data.data;
};
