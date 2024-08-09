interface BaseInput {
  type: string;
  value: string;
  label?: string;
  name: string;
  placeholder?: string;
  inputType: 'text' | 'file' | 'select' | 'date';
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

export type FormInputs = TextOrFileInput | SelectInput | DateInput;
