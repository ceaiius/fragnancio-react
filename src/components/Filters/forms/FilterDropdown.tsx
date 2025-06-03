import arrow_down from "@/assets/arrow-down.svg";
interface FilterDropdownProps<T> {
  label: string;
  options: T[];
  value: string | number;
  onChange: (selectedValue: string | number) => void;
  getLabel?: (item: T) => string;
  getValue?: (item: T) => string | number;
  placeholder?: string;
}

export default function FilterDropdown<T>({
  label,
  options,
  value,
  onChange,
  getLabel = (item: T) => (typeof item === 'object' && item !== null && 'name' in item ? (item as { name: string }).name : String(item)),
  getValue = (item: T) => (typeof item === 'object' && item !== null && 'id' in item ? (item as { id: string | number }).id : String(item)),
  placeholder,
}: FilterDropdownProps<T>) {
  const defaultPlaceholder = `${label}s`;
  const displayPlaceholder = placeholder !== undefined ? placeholder : defaultPlaceholder;
  const selectId = `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="shrink basis-0 min-w-[150px]">

      <div className="relative">
        <select
          id={selectId}
          name={label.toLowerCase()}
          className="w-full border border-black-default px-3 py-2 rounded-md appearance-none sm:text-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{displayPlaceholder}</option>
          {options.map((item, index) => {
            const optionValue = getValue(item);
            const optionKey = typeof optionValue === 'number' ? optionValue.toString() : optionValue || `option-${index}`;
            return (
              <option key={optionKey} value={optionValue}>
                {getLabel(item)}
              </option>
            );
          })}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
          <img src={arrow_down} alt="arrow down" className="fill-current h-4 w-4" />
        </div>
      </div>
    </div>
  );
}