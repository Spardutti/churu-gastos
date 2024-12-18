import InputLabel from '@/components/input/InputLabel';
import { formatCurrency } from '@/utils/formatCurrency';


interface TextfieldPropsBase {
  value: string | number | {} | [];
  type: string;
  placeholder?: string;
  min?: number;
  max?: number;
  onChange: (...event: any[]) => void;
}

interface TextfieldWithLabel extends TextfieldPropsBase {
  label: string;
}

interface TextfieldWithoutLabel extends TextfieldPropsBase {
  label?: never;
}

type TextfieldProps = TextfieldWithLabel | TextfieldWithoutLabel;

const Textfield = ({ label, value = '', type = 'text', placeholder, onChange, min, max }: TextfieldProps) => {
  const today = new Date().toISOString().split('T')[0];

  const formatValue = (value: string | number | {} | []) => {
    if (type === 'currency') {
      const amount = parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
      return formatCurrency({ amount });
    }

    if (type === 'number') return Number(value);
    return value as string;
  };

  return (
    <div className="flex gap-1 flex-col">
      {label && <InputLabel text={label} />}

      <div>
        <input
          max={max}
          placeholder={placeholder}
          value={formatValue(value)}
          onChange={onChange}
          type={type === 'currency' ? 'number' : type}
          min={type === 'date' ? today : min}
          className="bg-main-background text-main-default-text outline-none focus-within:ring placeholder:text-primary-light border border-black ring-primary-bg px-2 py-1 rounded-md  w-full"
        />
      </div>
    </div>
  );
};

export default Textfield;
