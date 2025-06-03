// FiltersBar.tsx
import FiltersContent from './FiltersContent';
import type { Filters } from '@/types/filters';

import {useState, type Dispatch, type SetStateAction } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';
import FilterModal from './modals/FilterModal';
import { ArrowDownUp, SlidersHorizontal } from 'lucide-react';
import FiltersContentMobile from './FiltersContentMobile';
import SortModal from './modals/SortModal';

type FiltersBarType = {
    selectedFilters: Filters;
    setSelectedFilters: Dispatch<SetStateAction<Filters>>;
    selectedSort: string;
    setSelectedSort: Dispatch<SetStateAction<string>>;
};

const FiltersBar = ({ selectedFilters, setSelectedFilters, selectedSort, setSelectedSort }: FiltersBarType) => {
    const filterCount = Object.keys(selectedFilters).length;
    
    const isMobile = useMediaQuery("(max-width: 1024px)");
    const [modalOpen, setModalOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);

    return (
        <>
            {isMobile ? (
                <div className='w-full flex justify-between items-center gap-4 mt-6'>
                        <button
                        className='grow basis-0 flex justify-center items-center gap-4 font-bold cursor-pointer'
                        onClick={() => setModalOpen(true)}
                        >
                        <SlidersHorizontal/>
                        Filter
                        {filterCount != 0 && (
                            <span className='border rounded-[50%] w-5 h-5 flex justify-center items-center'>{filterCount}</span>
                        )}
                        </button>
                    
                    
                    <div></div>
                    <div className='basis-0.5 flex justify-center h-6 bg-gray-default'>
                        
                    </div>
                    <div className='basis-0 grow flex justify-center relative'>
                        <button className='flex justify-center items-center gap-4 font-bold cursor-pointer' onClick={() => setSortOpen(true)}>
                            <ArrowDownUp/>
                            Sort
                        </button>
                        {sortOpen && (
                            <SortModal selected={selectedSort} onSelect={setSelectedSort} onClose={() => setSortOpen(false)}/>
                        )}
                    </div>
                <FilterModal open={modalOpen} onClose={() => setModalOpen(false)}>
                    <FiltersContentMobile selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} onClose={() => setModalOpen(false)}/>
                </FilterModal>
              </div>
            ) : (
                <div className='flex items-center'>
                    <FiltersContent
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        />
                    <div className='basis-0 grow flex justify-center relative'>
                        <button className='flex justify-center text-sm items-center gap-2 cursor-pointer border-black-default border px-2 py-1 rounded-xs' onClick={() => setSortOpen(true)}>
                            <ArrowDownUp className='w-3 h-3'/>
                            Sort
                        </button>
                        {sortOpen && (
                            <SortModal selected={selectedSort} onSelect={setSelectedSort} onClose={() => setSortOpen(false)}/>
                        )}
                    </div>
                    </div>
            )}
        </>
    );
};

export default FiltersBar;