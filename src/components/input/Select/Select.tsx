import InputLabel from '@/components/input/InputLabel';

interface SelectProps {
  onChange: (value: string) => void;
  label: string | undefined;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
}

const Select = ({ options, onChange, label, placeholder }: SelectProps) => {
  return (
    <div className="flex gap-1 flex-col">
      {label && <InputLabel text={label} />}
      <select
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1 cursor-pointer flex flex-col gap-4"
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option className="" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
