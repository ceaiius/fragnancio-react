import FilterDropdown from './forms/FilterDropdown';
import FilterCheckbox from './forms/FilterCheckbox';
import FilterDropdownSkeleton from './skeletons/FilterDropdownSkeleton';
import FilterCheckboxSkeleton from './skeletons/FilterCheckboxSkeleton';
import SelectedFiltersBar from './SelectedFiltersBar';
import { useFilterData } from '@/hooks/useFilterData';
import type { Filters } from '@/types/filters';
import type { Dispatch, SetStateAction } from 'react';
import type { Brand } from '@/types/brand';
import PriceFilterDropdown from './forms/FilterPrice';
import type { Note } from '@/types/note';
import { useLocation } from 'react-router-dom';

interface FiltersContentProps {
  selectedFilters: Filters;
  setSelectedFilters: Dispatch<SetStateAction<Filters>>;
  onClose?: () => void;
  hideBrandFilter?: boolean;
}

const FiltersContent = ({ selectedFilters, setSelectedFilters, onClose, hideBrandFilter = false }: FiltersContentProps) => {
  const { notes, brands, size, condition, isLoading, error } = useFilterData();
  const location = useLocation();
  const isSaleCategory = location.pathname.toLowerCase().includes('/category/sale');

  const renderFilterDropdowns = () => {
    if (error) {
      return <div className="text-red-500 col-span-full">{error}</div>;
    }
    if (isLoading) {
      return (
        <>
          <FilterDropdownSkeleton />
          <FilterDropdownSkeleton />
          <FilterDropdownSkeleton />
          <FilterDropdownSkeleton />
          <FilterDropdownSkeleton />
          <FilterCheckboxSkeleton />
        </>
      );
    }
    return (
      <>
        {!hideBrandFilter && (
          <FilterDropdown<Brand>
            label="Brand"
            options={brands}
            value={selectedFilters.brand ?? ''}
            onChange={(value) => setSelectedFilters(prev => ({ ...prev, brand: value }))}
            getLabel={(item) => item.name}
            getValue={(item) => item.slug}
          />
        )}
        <PriceFilterDropdown
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <FilterDropdown<string>
          label="Size"
          options={size}
          value={selectedFilters.size ?? ''}
          onChange={(value) => setSelectedFilters(prev => ({ ...prev, size: value }))}
        />
        <FilterDropdown<string>
          label="Condition"
          options={condition}
          value={selectedFilters.condition ?? ''}
          onChange={(value) => setSelectedFilters(prev => ({ ...prev, condition: value }))}
        />
        <FilterDropdown<Note>
          label="Note"
          options={notes}
          value={selectedFilters.note ?? ''}
          onChange={(value) => setSelectedFilters(prev => ({ ...prev, note: value }))}
          getLabel={(item) => item.name}
          getValue={(item) => item.name}
        />
        {!isSaleCategory && (
          <FilterCheckbox
            setBorder={true}
            label="On Sale"
            checked={selectedFilters.on_sale ?? false}
            onChange={(isChecked) => setSelectedFilters(prev => ({ ...prev, on_sale: isChecked }))}
          />
        )}
      </>
    );
  };

  return (
    <div className="w-full flex flex-col items-start">
      {onClose && (
        <button
          className="self-end mb-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      )}
      <div className="flex flex-row w-full max-w-screen-lg items-center justify-between my-4">
        <div className="flex flex-wrap gap-2 items-center flex-1">
          {renderFilterDropdowns()}
        </div>
      </div>
      <SelectedFiltersBar
        filters={selectedFilters}
        labels={{
          price: 'Price',
          brand: 'Brand',
          size: 'Size',
          condition: 'Condition',
          note: 'Note',
          on_sale: 'On Sale',
        }}
        onRemove={(key) => setSelectedFilters(prev => {
          const updated = { ...prev };
          delete updated[key as keyof typeof prev];
          return updated;
        })}
        onClearAll={() => setSelectedFilters({})}
      />
    </div>
  );
};

export default FiltersContent; 