type FilterCheckboxProps = {
  label: string;
};

const FilterCheckbox = ({ label }: FilterCheckboxProps) => {
  return (
    <label className="flex items-center space-x-2">
      <input type="checkbox" className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default FilterCheckbox;
