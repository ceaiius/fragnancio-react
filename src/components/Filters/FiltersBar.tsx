// FiltersBar.tsx
import FiltersContent from './FiltersContent';
import type { Filters } from '@/types/filters';

import { useState, type Dispatch, type SetStateAction } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import FilterModal from './FilterModal';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';

type FiltersBarType = {
    selectedFilters: Filters;
    setSelectedFilters: Dispatch<SetStateAction<Filters>>;
};

const FiltersBar = ({ selectedFilters, setSelectedFilters }: FiltersBarType) => {
    const filterCount = Object.keys(selectedFilters).length;
    
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            {isMobile ? (
                <div className='w-full flex justify-between items-center gap-4 mt-6'>
                        <button
                        className='grow basis-0 flex justify-center items-center gap-4'
                        onClick={() => setModalOpen(true)}
                        >
                        <SlidersHorizontal/>
                        Filter
                        <span className='border rounded-[50%] w-5 h-5 flex justify-center items-center'>{filterCount}</span>
                        </button>
                    
                    
                    <div></div>
                    <div className='basis-0.5 flex justify-center h-8 bg-gray-default'>
                        
                    </div>
                    <div className='basis-0 grow flex justify-center'>
                        <button className='flex justify-center items-center gap-4'>
                            <ArrowDownUp/>
                            Sort
                        </button>
                    </div>
                <FilterModal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <FiltersContent
                      selectedFilters={selectedFilters}
                      setSelectedFilters={setSelectedFilters}
                      onClose={() => setModalOpen(false)}
                    />
                </FilterModal>
              </div>
            ) : (
                <FiltersContent
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />
            )}
        </>
    );
};

export default FiltersBar;