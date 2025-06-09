import { ChevronDown, CircleX } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export type OptionType = {
  id: string | number;
  name: string;
};

export type SelectInputProps<T extends OptionType> = {
  label: string;
  options: T[];
  value: T | null;
  onChange: (selected: T) => void;
};

function SelectInput<T extends OptionType>({ label, options, value, onChange }: SelectInputProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className="mb-2" ref={containerRef}>
      <label htmlFor="category" className="text-xs text-gray-label w-full block leading-6 mb-1">{label}</label>
      <div className="relative text-sm mb-1">
        <div
          className={`flex items-center justify-between bg-white-background border border-gray-label rounded-xs shadow-none flex-wrap relative min-h-10 leading-6 h-12 outline-0  px-4 ${isOpen ? 'border-2 border-yellow-400' : ''}`}
          onClick={() => setIsOpen((prev) => !prev)}
          tabIndex={0}
          role="button"
        >
          <div className="flex items-center my-2 flex-wrap relative overflow-hidden transition-all duration-200 ease-in-out mb-1">
            <div>
              {value?.name || ''}
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {value && <CircleX className="w-4 h-4" onClick={e => { e.stopPropagation(); onChange(undefined as unknown as T); }}/>}
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {isOpen && (
          <div className="absolute z-50 top-full h-auto left-0 w-full bg-white-background shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_4px_11px_rgba(0,0,0,0.1)] rounded-xs flex-wrap mt-2 min-h-10 transition-all duration-200 ease-in-out leading-6 outline-0 flex items-center justify-between ">
            <div className="flex items-center flex-col w-full  my-2 flex-wrap relative overflow-hidden transition-all duration-200 ease-in-out mb-1">
              {options.map((option) => (
                <div
                  key={option.id}
                  className="w-full hover:bg-gray-100 rounded-xs px-4 py-2 cursor-pointer"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {option.name}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectInput