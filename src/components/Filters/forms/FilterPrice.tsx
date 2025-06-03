import { useState, useRef, useEffect } from 'react';
import type { Filters } from '@/types/filters';
import arrow_down from "@/assets/arrow-down.svg";

interface PriceFilterDropdownProps {
  selectedFilters: Filters;
  setSelectedFilters: (cb: (prev: Filters) => Filters) => void;
}

export default function PriceFilterDropdown({ selectedFilters, setSelectedFilters }: PriceFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [min, setMin] = useState<number | ''>(selectedFilters.price_min ?? '');
  const [max, setMax] = useState<number | ''>(selectedFilters.price_max ?? '');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    setMin(selectedFilters.price_min ?? '');
    setMax(selectedFilters.price_max ?? '');
  }, [selectedFilters.price_min, selectedFilters.price_max]);

  const handleDone = () => {
    setSelectedFilters(prev => ({
      ...prev,
      price_min: min === '' ? undefined : min,
      price_max: max === '' ? undefined : max,
    }));
    setOpen(false);
  };

  const handleReset = () => {
    setMin('');
    setMax('');
    setSelectedFilters(prev => {
      const updated = { ...prev };
      delete updated.price_min;
      delete updated.price_max;
      return updated;
    });
    setOpen(false);
  };

  const displayLabel = 'Price';

  return (
    <div className="relative min-w-[150px]" ref={dropdownRef}>
      <button
        type="button"
        className="w-full border border-black-default px-3 py-2 pr-10 rounded-md shadow-sm bg-white text-left sm:text-sm"
        onClick={() => setOpen(o => !o)}
      >
        {displayLabel}
        <span className="absolute right-3 top-1/2 -translate-y-1/2 ">
            <img src={arrow_down} alt="" className='w-4 h-4'/>
        </span>
      </button>
      {open && (
        <div className="absolute z-10 mt-2 w-64 bg-white border border-black-default  rounded-md shadow-lg p-4 flex flex-col gap-4" style={{ left: 0 }}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col flex-1">
              <input
                id="min-price"
                type="number"
                min={0}
                className="border rounded px-2 py-1 w-full"
                placeholder="Min"
                value={min}
                onChange={e => setMin(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              />
            </div>
            <span className="mx-2  text-gray-400">—</span>
            <div className="flex flex-col flex-1">
              <input
                id="max-price"
                type="number"
                min={0}
                className="border rounded px-2 py-1 w-full"
                placeholder="Max"
                value={max}
                onChange={e => setMax(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
              />
            </div>
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="button"
              className="flex-1 border border-gray-400 rounded py-1 font-semibold hover:bg-gray-100"
              onClick={handleReset}
            >
              Reset
            </button>
            <button
              type="button"
              className="flex-1 bg-black text-white rounded py-1 font-semibold hover:bg-gray-800"
              onClick={handleDone}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}