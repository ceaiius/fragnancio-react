import API from '@/lib/api';
import { type Product } from '@/types/product';

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export const fetchAllBrands = async (): Promise<Brand[]> => {
  const { data } = await API.get('/brands');
  return data;
};

export const fetchProductsByBrand = async (
  slug: string,
  page: number
): Promise<Product[]> => {
  const { data } = await API.get(`/brands/${slug}/products?page=${page}`);
  return data.data; 
};
