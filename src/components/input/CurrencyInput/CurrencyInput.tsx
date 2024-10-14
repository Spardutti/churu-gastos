import { formatCurrency } from '@/utils/formatCurrency';
import React, { useState, useEffect } from 'react';

interface InputProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

const CurrencyInput: React.FC<InputProps> = ({ label, value, onChange, placeholder, min, max }) => {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    setDisplayValue(formatInputValue(value));
  }, [value]);

  const formatInputValue = (val: string | number): string => {
    const numericValue = typeof val === 'string' ? val.replace(/[^0-9.-]+/g, '') : String(val);
    const amount = parseFloat(numericValue);
    return isNaN(amount) ? '' : formatCurrency({ amount });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9.-]+/g, '');

    setDisplayValue(formatInputValue(numericValue));

    onChange(numericValue);
  };

  const handleBlur = () => {
    setDisplayValue(formatInputValue(value));
  };

  return (
    <div className="flex gap-1 flex-col">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        className="bg-main-background text-main-default-text outline-none focus-within:ring placeholder:text-primary-light border border-black ring-primary-bg px-2 py-1 rounded-md  w-full"
      />
    </div>
  );
};

export default CurrencyInput;
