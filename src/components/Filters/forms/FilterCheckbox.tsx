// FilterCheckbox.tsx

type FilterCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
  setBorder: boolean;
};

const FilterCheckbox = ({ label, checked, onChange, setBorder }: FilterCheckboxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div className={`${setBorder && 'border border-gray-default rounded-sm'} flex items-center  py-2 px-4`}>
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