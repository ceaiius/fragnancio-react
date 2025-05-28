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
