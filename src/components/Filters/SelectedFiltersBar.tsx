import { X } from 'lucide-react';

interface SelectedFiltersBarProps {
  filters: { [key: string]: string | number | boolean | undefined };
  labels: { [key: string]: string };
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

export default function SelectedFiltersBar({ filters, labels, onRemove, onClearAll }: SelectedFiltersBarProps) {
  const activeFilters = Object.entries(filters).filter(([, value]) => value !== undefined && value !== '');

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 my-2">
      {activeFilters.map(([key, value]) => (
        <div key={key} className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
          <span className="mr-2 font-medium">{labels[key]}: {String(value)}</span>
          <button onClick={() => onRemove(key)} className="text-gray-500 hover:text-black ">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={onClearAll} className="text-xs text-blue-default hover:underline ml-2">
        Clear all
      </button>
    </div>
  );
}
