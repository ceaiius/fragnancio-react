import useMediaQuery from "@/hooks/useMediaQuery";
import { useRef, useEffect } from "react";

const SORT_OPTIONS = [
    { label: "Relevance", value: "relevance" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Newly Listed", value: "newest" },
];

interface SortModalProps {
    onClose: () => void;
    selected: string;
    onSelect: (value: string) => void;
}

const SortModal = ({ onClose, selected, onSelect }: SortModalProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 1024px)");
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className={`absolute right-0 mt-2 z-50 bg-white top-[calc(100%+12px)] flex flex-col border border-gray-default shadow-lg ${isMobile ? 'w-full' : 'w-56'}`}
        >
            {SORT_OPTIONS.map(option => (
                <label key={option.value} className="flex justify-between  text-sm px-2 py-2 border-t border-gray-default cursor-pointer">
                    <span>{option.label}</span>
                    <input
                        type="checkbox"
                        name="sort"
                        checked={selected === option.value}
                        onChange={() => {
                            if (selected === option.value) {
                                onSelect(""); 
                            } else {
                                onSelect(option.value); 
                            }
                        }}
                    />
                </label>
            ))}
        </div>
    );
};

export default SortModal;