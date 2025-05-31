import type { Filters } from '@/types/filters';
import { X } from 'lucide-react';

interface SelectedFiltersBarProps {
  filters: Filters
  labels: { [key: string]: string };
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export default function SelectedFiltersBar({ filters, labels, onRemove, onClearAll }: SelectedFiltersBarProps) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value !== undefined && value !== '');

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      {activeFilters.map(([key, value]) => {
        let display = '';
        if (key === 'price_min') display = `min: ${value}`;
        else if (key === 'price_max') display = `max: ${value}`;
        else display = `${labels[key] ?? key}: ${String(value)}`;
        return (
          <div key={key} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
            <span className="mr-2 font-medium">{display}</span>
            <button onClick={() => onRemove(key)} className="text-gray-500 hover:text-black ">
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
      <button onClick={onClearAll} className="text-xs text-blue-default hover:underline ml-2">
        Clear all
      </button>
    </div>
  );
}
