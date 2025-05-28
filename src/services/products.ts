import API from '@/lib/api';
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

export const fetchProductsByCategory = async (category: string, page: number) => {
  const isVirtual = ['suggested', 'popular', 'recently_viewed'].includes(category);
  const url = isVirtual
    ? `/home/${category}?page=${page}`
    : `/categories/${category}/products?page=${page}`;

  const res = await API.get(url);
  return res.data.data; // adapt if needed
};
