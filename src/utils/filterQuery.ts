import type { Filters } from '@/types/filters';

// Converts a Filters object to URLSearchParams
export function filtersToQueryParams(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    
    if (typeof value === 'boolean') {
      params.set(key, value ? 'true' : 'false');
    } else {
      params.set(key, String(value));
    }
  });
  
  return params;
}

// Converts URLSearchParams to a Filters object
export function queryParamsToFilters(searchParams: URLSearchParams): Filters {
  const filters: Filters = {};
  
  // Skip the search query parameter
  for (const [key, value] of searchParams.entries()) {
    if (key === 'q') continue;
    
    if (key === 'price_min' || key === 'price_max') {
      const num = Number(value);
      if (!isNaN(num)) {
        filters[key] = num;
      }
    } else if (key === 'on_sale') {
      filters[key] = value === 'true';
    } else if (['brand', 'size', 'condition', 'note'].includes(key)) {
      const num = Number(value);
      (filters as any)[key] = !isNaN(num) ? num : value;
    }
  }
  
  return filters;
} 