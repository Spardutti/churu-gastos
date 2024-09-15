interface BaseInput {
  value: string | number;
  label?: string;
  name: string;
  placeholder?: string;
  inputType: 'text' | 'file' | 'select' | 'date' | 'number';
}

interface NumberInput extends BaseInput {
  inputType: 'number';
  value: number;
}

interface TextOrFileInput extends BaseInput {
  inputType: 'text' | 'file';
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

export type FormInputs = TextOrFileInput | SelectInput | DateInput | NumberInput;
