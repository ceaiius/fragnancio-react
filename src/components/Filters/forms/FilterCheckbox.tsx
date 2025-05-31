// FilterCheckbox.tsx

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
};

const FilterCheckbox = ({ label, checked, onChange }: FilterCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className="flex items-center border border-gray-default rounded-sm py-2 px-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4"
          checked={checked}      
          onChange={handleChange}
        />
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
};

export default FilterCheckbox;