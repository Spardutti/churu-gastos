import Label from '@/components/input/label';
import './styles.css';

interface TextfieldPropsBase {
  value: string | number | {} | [];
  type: string;
  name: string;
  placeholder?: string;
}

interface TextfieldWithLabel extends TextfieldPropsBase {
  label: string;
}

interface TextfieldWithoutLabel extends TextfieldPropsBase {
  label?: never;
}

type TextfieldProps = TextfieldWithLabel | TextfieldWithoutLabel;

const Textfield = ({ label, value, type = 'text', name, placeholder }: TextfieldProps) => {
  return (
    <div className="flex gap-1 flex-col">
      {label && <Label text={label} />}

      <div>
        <input
          placeholder={placeholder}
          value={value as string}
          type={type}
          name={name}
          className="text-main-light px-2 py-1 rounded-md bg-main-secondary w-full"
        />
        <span />
      </div>
    </div>
  );
};

export default Textfield;
