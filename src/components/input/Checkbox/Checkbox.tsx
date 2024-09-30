import { Checkbox as CheckboxComponent } from '@mantine/core';

interface CheckboxProps {
  defaultChecked?: boolean;
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ defaultChecked, label, checked, onChange }: CheckboxProps) => {
  return (
    <CheckboxComponent
      checked={checked}
      onChange={(event) => onChange(event)}
      defaultChecked={defaultChecked}
      label={label}
    />
  );
};

export default Checkbox;
