import FilterModal from './FilterModal';
import { ArrowLeft } from 'lucide-react';
import type { Brand } from '@/types/brand';
import type { Note } from '@/types/note';

// Reuse the FilterConfig type from FiltersContentMobile
import type { FilterConfig } from '../FiltersContentMobile';

interface FilterOptionsModalProps {
  config: FilterConfig | undefined;
  open: boolean;
  onClose: () => void;
}

const FilterOptionsModal = ({ config, open, onClose }: FilterOptionsModalProps) => {
  if (!config) return null;
  return (
    <FilterModal open={open} onClose={onClose}>
      <div className='flex flex-col h-full'>
        <div className='flex justify-between items-center p-4 border-b border-gray-200'>
          <button onClick={onClose} className='text-black-default'>
            <ArrowLeft />
          </button>
          <h2 className='text-xl font-bold flex-1 text-center'>{config.label}</h2>
          <div style={{width: 24}} />
        </div>
        <div className='flex flex-col gap-2 p-4 overflow-y-auto'>
          {config.options.map((option, idx) => {
            let label: string;
            let value: string | number;
            if (config.key === 'brand') {
              label = config.getLabel((option as Brand));
              value = config.getValue((option as Brand));
            } else if (config.key === 'note') {
              label = config.getLabel((option as Note));
              value = config.getValue((option as Note));
            } else {
              label = String(option as string);
              value = option as string;
            }
            const isSelected = value === config.value;
            return (
              <button
                key={idx}
                className={`flex items-center justify-between p-3 rounded border ${isSelected ? 'bg-black text-white' : 'bg-white text-black'} border-gray-200`}
                onClick={() => {
                  if (isSelected) {
                    config.onChange('');
                  } else {
                    config.onChange(value as string);
                  }
                  onClose();
                }}
                type="button"
              >
                <span>{label}</span>
                {isSelected && <span className='ml-2'>&#10003;</span>}
              </button>
            );
          })}
        </div>
      </div>
    </FilterModal>
  );
};

export default FilterOptionsModal; 