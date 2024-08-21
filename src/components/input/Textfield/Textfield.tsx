import InputLabel from '@/components/input/InputLabel';

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
      {label && <InputLabel text={label} />}

      <div>
        <input
          placeholder={placeholder}
          value={value as string}
          onChange={onChange}
          type={type}
          className=" outline-none focus-within:ring border border-black ring-main-tertiary px-2 py-1 rounded-md  w-full"
        />
      </div>
    </div>
  );
};

export default Textfield;
