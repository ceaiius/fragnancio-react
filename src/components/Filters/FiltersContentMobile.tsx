import { useFilterData } from '@/hooks/useFilterData';
import type { Filters } from '@/types/filters';
import { X } from 'lucide-react';
import FilterSelectMobile from './forms/FilterSelectMobile';
import { useState } from 'react';
import type { Brand } from '@/types/brand';
import type { Note } from '@/types/note';
import FilterOptionsModal from './modals/FilterOptionsModal';
import FiltersFooter from './FiltersFooter';
import FilterCheckbox from './forms/FilterCheckbox';
import FilterPriceMobile from './forms/FilterPriceMobile';

interface FiltersContentProps {
  selectedFilters: Filters;
  setSelectedFilters: (cb: (prev: Filters) => Filters) => void;
  onClose: () => void; 
}

export type FilterConfig =
  | {
      key: 'brand';
      label: string;
      options: Brand[];
      value: string | number;
      onChange: (value: string) => void;
      getLabel: (item: Brand) => string;
      getValue: (item: Brand) => string | number;
    }
  | {
      key: 'size' | 'condition';
      label: string;
      options: string[];
      value: string | number;
      onChange: (value: string) => void;
      getLabel?: undefined;
      getValue?: undefined;
    }
  | {
      key: 'note';
      label: string;
      options: Note[];
      value: string | number;
      onChange: (value: string) => void;
      getLabel: (item: Note) => string;
      getValue: (item: Note) => string | number;
    };

const FiltersContentMobile = ({ selectedFilters, setSelectedFilters, onClose }: FiltersContentProps) => {
    const { notes, brands, size, condition } = useFilterData();
    const [openFilterKey, setOpenFilterKey] = useState<string | null>(null);

    const filterConfigs: FilterConfig[] = [
      {
        key: 'brand',
        label: 'Brand',
        options: brands,
        value: selectedFilters.brand ?? '',
        onChange: (value: string) => setSelectedFilters(prev => ({ ...prev, brand: value })),
        getLabel: (item: Brand) => item.name,
        getValue: (item: Brand) => item.slug,
      },
      {
        key: 'size',
        label: 'Size',
        options: size,
        value: selectedFilters.size ?? '',
        onChange: (value: string) => setSelectedFilters(prev => ({ ...prev, size: value })),
      },
      {
        key: 'condition',
        label: 'Condition',
        options: condition,
        value: selectedFilters.condition ?? '',
        onChange: (value: string) => setSelectedFilters(prev => ({ ...prev, condition: value })),
      },
      {
        key: 'note',
        label: 'Note',
        options: notes,
        value: selectedFilters.note ?? '',
        onChange: (value: string) => setSelectedFilters(prev => ({ ...prev, note: value })),
        getLabel: (item: Note) => item.name,
        getValue: (item: Note) => item.name,
      },
    ];

    const activeConfig = filterConfigs.find(f => f.key === openFilterKey);

    return (
      <main className="flex flex-col gap-2 font-mono">
        <div className='fixed w-full h-full top-0 left-0 z-10 bg-white overflow-y-auto flex flex-col gap-4'>
          <div className='flex justify-between p-4 items-center'>
              <h1 className='text-2xl font-bold'>Filter</h1>
              {onClose && (
                  <button
                  className='cursor-pointer text-black-default'
                  onClick={onClose}>
                  <X/>
                  </button>
              )}
          </div>
          <div className='m-4 flex flex-col gap-2' >
              <FilterPriceMobile
                min={selectedFilters.price_min ?? ''}
                max={selectedFilters.price_max ?? ''}
                onMinChange={value => setSelectedFilters(prev => ({ ...prev, price_min: value === '' ? undefined : Number(value) }))}
                onMaxChange={value => setSelectedFilters(prev => ({ ...prev, price_max: value === '' ? undefined : Number(value) }))}
              />
              {filterConfigs.map((config) => {
                if (config.key === 'brand') {
                  return (
                    <FilterSelectMobile
                      key={config.key}
                      label={config.label}
                      options={config.options}
                      value={config.value}
                      onChange={config.onChange}
                      getLabel={config.getLabel}
                      getValue={config.getValue}
                      onOpen={() => setOpenFilterKey(config.key)}
                    />
                  );
                } else if (config.key === 'note') {
                  return (
                    <FilterSelectMobile
                      key={config.key}
                      label={config.label}
                      options={config.options}
                      value={config.value}
                      onChange={config.onChange}
                      getLabel={config.getLabel}
                      getValue={config.getValue}
                      onOpen={() => setOpenFilterKey(config.key)}
                    />
                  );
                } else {
                  return (
                    <FilterSelectMobile
                      key={config.key}
                      label={config.label}
                      options={config.options}
                      value={config.value}
                      onChange={config.onChange}
                      onOpen={() => setOpenFilterKey(config.key)}
                    />
                  );
                }
              })}
              <div>
                
              </div>
              <div className='w-28 mt-2'>
                <FilterCheckbox
                    setBorder={false}
                    label="On Sale"
                    checked={selectedFilters.on_sale ?? false}
                    onChange={(isChecked) => setSelectedFilters(prev => ({ ...prev, on_sale: isChecked }))}
                    />
              </div>
          </div>
          <FiltersFooter onClearAll={() => setSelectedFilters(() => ({}))} onViewItems={onClose} />
        </div>
        <FilterOptionsModal
          config={activeConfig}
          open={!!activeConfig}
          onClose={() => setOpenFilterKey(null)}
        />
      </main>
    );
};

export default FiltersContentMobile; 