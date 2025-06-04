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
export function queryParamsToFilters(params: URLSearchParams): Filters {
  const filters: Record<string, any> = {};
  params.forEach((value, key) => {
    if (value === '') return;
    if (key === 'on_sale') {
      filters[key] = value === 'true';
    } else if (key === 'price_min' || key === 'price_max') {
      const num = Number(value);
      if (!isNaN(num)) filters[key] = num;
    } else {
      filters[key] = value;
    }
  });
  return filters as Filters;
} 