interface BaseInput {
  label?: string;
  name: string;
  placeholder?: string;
  inputType: 'text' | 'file' | 'checkbox' | 'select' | 'date' | 'number' | 'password';
  min?: number;
  max?: number;
}

interface NumberInput extends BaseInput {
  inputType: 'number';
  value: number;
}

interface TextOrFileInput extends BaseInput {
  inputType: 'text' | 'file' | 'password';
  value: string;
}

interface CheckboxInput extends BaseInput {
  inputType: 'checkbox';
  value: boolean;
}

interface SelectInput extends BaseInput {
  inputType: 'select';
  value: string;
  options: {
    value: string | number;
    label: string;
  }[];
}

interface DateInput extends BaseInput {
  inputType: 'date';
  value: string;
}

export type FormInputs = TextOrFileInput | SelectInput | DateInput | NumberInput | CheckboxInput;
