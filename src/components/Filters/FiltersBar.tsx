// FiltersBar.tsx
import FilterDropdown from './FilterDropdown';
import FilterCheckbox from './FilterCheckbox';
import FilterDropdownSkeleton from './FilterDropdownSkeleton';
import FilterCheckboxSkeleton from './FilterCheckboxSkeleton';

import { useEffect, useState } from 'react';
import { conditionOptions, fetchCategories, fetchNotes, priceOptions, sizeOptions } from '@/services/filters'; 
import type { Category } from '@/types/category';
import type { Note } from '@/types/note';
import SelectedFiltersBar from './SelectedFiltersBar';

const FiltersBar = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [priceRange, setPriceRange] = useState<string[]>([]);
    const [size, setSize] = useState<string[]>([]);
    const [condition, setCondition] = useState<string[]>([]);


    const [selectedFilters, setSelectedFilters] = useState<{
        category?: string | number;
        price?: string | number;
        size?: string | number;
        condition?: string | number;
        note?: string | number;
        onSale?: boolean;
    }>({});

    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null); 

    useEffect(() => {
        const fetchFiltersData = async () => {
            setIsLoading(true); 
            setError(null);
            try {
                const [fetchedCategories, fetchedNotes] = await Promise.all([
                    fetchCategories(),
                    fetchNotes()
                ]);

                setCategories(fetchedCategories);
                setNotes(fetchedNotes);
                setPriceRange(priceOptions);
                setSize(sizeOptions); 
                setCondition(conditionOptions);

            } catch (err) {
                console.error('Error fetching filters:', err);
                setError('Failed to load filters. Please try again later.');
            } finally {
                setIsLoading(false); 
            }
        };

        fetchFiltersData();
    }, []); 


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
                <FilterDropdown<Category>
                    label="Categorie"
                    options={categories}
                    value={selectedFilters.category ?? ''}
                    onChange={(value) => setSelectedFilters(prev => ({ ...prev, category: value }))}
                    getLabel={(item) => item.name}
                    getValue={(item) => item.slug} 
                />
                <FilterDropdown<string>
                    label="Price"
                    options={priceRange}
                    value={selectedFilters.price ?? ''}
                    onChange={(value) => setSelectedFilters(prev => ({ ...prev, price: value }))}
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
                    getValue={(item) => item.id}
                />
                <FilterCheckbox
                    label="On Sale"
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
                    category: 'Category',
                    price: 'Price',
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