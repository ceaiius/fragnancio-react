// hooks/useFilterData.ts
import { useEffect, useState } from 'react';
import { fetchNotes, priceOptions, sizeOptions, conditionOptions } from '@/services/filters';
import type { Note } from '@/types/note';
import { type Brand } from '@/types/brand';
import { fetchAllBrands } from '@/services/brands';

export const useFilterData = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [staticPriceOptions] = useState(priceOptions);
    const [staticSizeOptions] = useState(sizeOptions);
    const [staticConditionOptions] = useState(conditionOptions);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const [fetchedNotes, fetchBrands] = await Promise.all([
                    fetchNotes(),
                    fetchAllBrands()
                ]);
                setNotes(fetchedNotes);
                setBrands(fetchBrands);

            } catch (err) {
                console.error('Error fetching filters:', err);
                setError('Failed to load filters. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return {
        notes,
        brands,
        priceRange: staticPriceOptions,
        size: staticSizeOptions,
        condition: staticConditionOptions,
        isLoading,
        error
    };
};
