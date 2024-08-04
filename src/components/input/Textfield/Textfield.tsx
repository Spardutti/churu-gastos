import Label from '@/components/input/label';

interface TextfieldPropsBase {
  value: string;
}

interface TextfieldWithLabel extends TextfieldPropsBase {
  label: boolean;
  labelText: string;
}

interface TextfieldWithoutLabel extends TextfieldPropsBase {
  label?: never;
  labelText?: never;
}

type TextfieldProps = TextfieldWithLabel | TextfieldWithoutLabel;

const Textfield = ({ label = false, value, labelText }: TextfieldProps) => {
  return (
    <div className="flex gap-2 flex-col">
      {label && <Label text={labelText} />}
      <input className="outline-none placeholder:text-gray px-2 py-1" value={value} />
    </div>
  );
};

export default Textfield;
