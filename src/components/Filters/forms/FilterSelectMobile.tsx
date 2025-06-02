import { ArrowRight } from 'lucide-react'

interface FilterSelectMobileProps<T = unknown> {
  label: string;
  options: T[];
  value: string | number;
  onChange: (value: string) => void;
  getLabel?: (item: T) => string;
  getValue?: (item: T) => string | number;
  onOpen?: () => void;
}

const FilterSelectMobile = <T,>({ label, options, value, onChange: _onChange, getLabel = (item: unknown) => (typeof item === 'object' && item !== null && 'name' in item ? (item as { name: string }).name : String(item)), getValue = (item: unknown) => (typeof item === 'object' && item !== null && 'id' in item ? (item as { id: string | number }).id : String(item)), onOpen }: FilterSelectMobileProps<T>) => {

  void _onChange;
  const selectedOption = options.find((item) => getValue(item) === value);
  return (
    <div className='relative'>
      <button
        className='flex bg-transparent p-2 cursor-pointer items-center w-full h-12 justify-between border-b border-b-gray-default'
        type="button"
        onClick={onOpen}
      >
        <p>{label}{selectedOption ? `: ${getLabel(selectedOption as T)}` : ''}</p>
        <ArrowRight className='h-4 w-4'/>
      </button>
    </div>
  )
}

export default FilterSelectMobile