import { type Product } from '@/types/product';
import api from '@/lib/api';
import type { Filters } from '@/types/filters';
import { filtersToQueryParams } from '@/utils/filterQuery';

export interface searchPrompts {
  query: string;
  user_id?: number;
}

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

    if (sort) {
      params.append('sort', sort);
    }

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

export const storePrompts = async (
  query: string,
  user_id: number
) : Promise<searchPrompts[]> => {
  try {
    const response = await api.post('/search-logs', {
      query,
      user_id
    });
    return response.data;
  } catch (error) {
    console.error('Error storing search prompts:', error);
    throw error;
  }
};


export const getTrendingPrompts = async ()  => {
  try {
    const response = await api.get(`search-logs/trending`);
    return response.data;
  } catch (error) {
    console.error('Error getting search prompts:', error);
    throw error;
  }
}
