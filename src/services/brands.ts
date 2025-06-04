import API from '@/lib/api';
import type { Filters } from '@/types/filters';
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
  page: number,
  selectedFilters : Filters, selectedSort : string
): Promise<Product[]> => {
  
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

  const { data } = await API.get(`/brands/${slug}/products?${params.toString()}&sort=${selectedSort}`);
  return data.data; 
};
