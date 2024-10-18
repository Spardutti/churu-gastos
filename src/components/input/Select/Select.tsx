import InputLabel from '@/components/input/InputLabel';
import { NativeSelect } from '@mantine/core';
import clsx from 'clsx';
import { useMemo, type ChangeEventHandler } from 'react';

interface SelectProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  label: string | undefined;
  options: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  value: string;
}

const Select = ({ options, onChange, label, placeholder, value }: SelectProps) => {
  const optionsWithLabel = useMemo(() => {
    const placeHolder = { label: placeholder ?? '', value: '', disabled: true };
    return [placeHolder, ...options];
  }, [options]);

  return (
    <div className="flex gap-1 flex-col w-full">
      {label && <InputLabel text={label} />}
      <NativeSelect
        classNames={{
          input: clsx(
            'border rounded-md px-2 cursor-pointer flex flex-col gap-4 bg-main-background outline-none border-black text-white',
          ),
        }}
        value={value}
        onChange={onChange}
        data={optionsWithLabel}
      />
    </div>
  );
};

export default Select;
