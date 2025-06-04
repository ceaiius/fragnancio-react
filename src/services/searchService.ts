import { type Product } from '@/types/product';
import api from '@/lib/api';
import type { Filters } from '@/types/filters';
import { filtersToQueryParams } from '@/utils/filterQuery';

export const searchProducts = async (
  query: string,
  page: number = 1,
  filters: Filters = {},
  sort?: string
): Promise<Product[]> => {
  try {
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
    });

    // Add sort parameter if provided
    if (sort) {
      params.append('sort', sort);
    }

    // Add filter parameters
    const filterParams = filtersToQueryParams(filters);
    filterParams.forEach((value, key) => {
      params.append(key, value);
    });

    const response = await api.get(`/search?${params.toString()}`);
    return response.data.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
}; 