import InputLabel from '@/components/input/InputLabel';
import type { NumberInputProps } from '@mantine/core';
import { NumberInput } from '@mantine/core';
import clsx from 'clsx';

interface InputProps {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

const CurrencyInput = ({ label, value, onChange }: InputProps) => {
  const handleChange = (e: NumberInputProps) => {
    if (e.value) {
      onChange(Number(e.value));
    }
  };

  return (
    <div className="flex gap-1 flex-col">
      {label && <InputLabel text={label} />}
      <NumberInput
        allowDecimal
        allowLeadingZeros={false}
        allowNegative={false}
        decimalScale={2}
        hideControls
        prefix="$"
        value={value}
        placeholder="$0"
        thousandSeparator
        onValueChange={handleChange}
        classNames={{
          input: clsx(
            'bg-main-background text-main-default-text outline-none focus-within:ring placeholder:text-primary-light border border-black ring-primary-bg px-2 py-1 rounded-md  w-full',
          ),
        }}
      />
    </div>
  );
};

export default CurrencyInput;
