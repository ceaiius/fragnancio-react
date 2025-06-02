interface FiltersFooterProps {
  onClearAll: () => void;
  onViewItems: () => void ;
}

const FiltersFooter = ({ onClearAll, onViewItems }: FiltersFooterProps) => (
  <div className="flex gap-2 px-2 pb-20 mt-auto">
    <button
      className="flex-1 py-2 rounded-xs bg-white border border-black-default text-black font-semibold"
      onClick={onClearAll}
      type="button"
    >
      Clear All
    </button>
    <button
      className="flex-1 py-2 rounded-xs bg-black-default text-white font-semibold"
      onClick={onViewItems}
      type="button"
    >
      View Items
    </button>
  </div>
);

export default FiltersFooter; 