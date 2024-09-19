interface BaseInput {
  value: string | number | boolean;
  label?: string;
  name: string;
  placeholder?: string;
  inputType: 'text' | 'file' | 'checkbox' | 'select' | 'date' | 'number' | 'password';
}

interface NumberInput extends BaseInput {
  inputType: 'number';
  value: number;
}

interface TextOrFileInput extends BaseInput {
  inputType: 'text' | 'file' | 'password';
}

interface CheckboxInput extends BaseInput {
  inputType: 'checkbox';
  value: boolean;
}

interface SelectInput extends BaseInput {
  inputType: 'select';
  options: {
    value: string;
    label: string;
  }[];
}

interface DateInput extends BaseInput {
  inputType: 'date';
}

export type FormInputs = TextOrFileInput | SelectInput | DateInput | NumberInput | CheckboxInput;
