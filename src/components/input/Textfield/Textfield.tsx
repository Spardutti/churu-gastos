import Label from '@/components/input/Label';
import './styles.css';

interface TextfieldPropsBase {
  value: string | number | {} | [];
  type: string;
  placeholder?: string;
  onChange: (...event: any[]) => void;
}

interface TextfieldWithLabel extends TextfieldPropsBase {
  label: string;
}

interface TextfieldWithoutLabel extends TextfieldPropsBase {
  label?: never;
}

type TextfieldProps = TextfieldWithLabel | TextfieldWithoutLabel;

const Textfield = ({ label, value, type = 'text', placeholder, onChange }: TextfieldProps) => {
  return (
    <div className="flex gap-1 flex-col">
      {label && <Label text={label} />}

      <div>
        <input
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          type={type}
          className="text-main-light px-2 py-1 rounded-md bg-main-secondary w-full"
        />
        <span />
      </div>
    </div>
  );
};

export default Textfield;