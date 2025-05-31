// FiltersBar.tsx
import FilterDropdown from './forms/FilterDropdown';
import FilterCheckbox from './forms/FilterCheckbox';
import FilterDropdownSkeleton from './skeletons/FilterDropdownSkeleton';
import FilterCheckboxSkeleton from './skeletons/FilterCheckboxSkeleton';

import type { Note } from '@/types/note';
import SelectedFiltersBar from './SelectedFiltersBar';
import { useFilterData } from '@/hooks/useFilterData';
import type { Filters } from '@/types/filters';

import type { Dispatch, SetStateAction } from 'react';
import type { Brand } from '@/types/brand';
import PriceFilterDropdown from './forms/FilterPrice';

type FiltersBarType = {
    selectedFilters: Filters;
    setSelectedFilters: Dispatch<SetStateAction<Filters>>;
};

const FiltersBar = ({ selectedFilters, setSelectedFilters }: FiltersBarType) => {

    const { notes, brands, priceRange, size, condition, isLoading, error } = useFilterData();
    



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
                <FilterDropdown<Brand>
                    label="Brand"
                    options={brands}
                    value={selectedFilters.brand ?? ''}
                    onChange={(value) => setSelectedFilters(prev => ({ ...prev, brand: value }))}
                    getLabel={(item) => item.name}
                    getValue={(item) => item.slug} 
                />
                
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
                <FilterCheckbox
                    label="On Sale"
                    checked={selectedFilters.onSale ?? false}
                    onChange={(isChecked) => setSelectedFilters(prev => ({ ...prev, onSale: isChecked }))}
                />
            </>
        );
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className="flex flex-wrap gap-4 my-4 rounded-lg">
            {renderFilterDropdowns()}
            

            </div>
            <SelectedFiltersBar
                filters={selectedFilters}
                labels={{
                    price: 'Price',
                    brand: 'Brand',
                    size: 'Size',
                    condition: 'Condition',
                    note: 'Note',
                    onSale: 'On Sale'
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

export default FiltersBar;