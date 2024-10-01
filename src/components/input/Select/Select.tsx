import InputLabel from '@/components/input/InputLabel';

interface SelectProps {
  onChange: (value: string) => void;
  label: string | undefined;
  options: {
    value: string | number;
    label: string;
  }[];
  placeholder?: string;
  value: string;
}

const Select = ({ options, onChange, label, placeholder, value }: SelectProps) => {
  return (
    <div className="flex gap-1 flex-col w-full">
      {label && <InputLabel text={label} />}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-md px-2 py-1 cursor-pointer flex flex-col gap-4 bg-main-background outline-none border-black"
      >
        {placeholder && (
          <option value="" disabled>
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
