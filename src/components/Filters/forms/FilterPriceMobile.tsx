import React from 'react';

interface FilterPriceMobileProps {
  min: string | number;
  max: string | number;
  onMinChange: (value: string) => void;
  onMaxChange: (value: string) => void;
}

const FilterPriceMobile: React.FC<FilterPriceMobileProps> = ({ min, max, onMinChange, onMaxChange }) => {
  return (
    <div className="w-full flex flex-col items-center mb-6">
      <div className="flex w-full justify-between items-end gap-4">
        <div className="flex flex-col items-start">
          <label className="text-xs mb-1 ml-1">Min.</label>
          <div className="flex items-center">
            <span className="border border-gray-300 rounded-l px-3 py-2 bg-gray-50 text-sm">US$</span>
            <input
              type="number"
              className="border border-gray-300 rounded-r px-3 py-2 w-20 text-sm focus:outline-none"
              value={min}
              min={0}
              onChange={e => onMinChange(e.target.value)}
              placeholder="1"
            />
          </div>
        </div>
        <div className="flex-1 border-t border-gray-300 mx-2" style={{ marginTop: 24 }} />
        <div className="flex flex-col items-end">
          <label className="text-xs mb-1 mr-1">Max.</label>
          <input
            type="number"
            className="border border-gray-300 rounded px-3 py-2 w-20 text-sm focus:outline-none"
            value={max}
            min={0}
            onChange={e => onMaxChange(e.target.value)}
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPriceMobile;