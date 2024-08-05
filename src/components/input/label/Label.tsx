interface LabelProps {
  text?: string;
}

const Label = ({ text }: LabelProps) => {
  return <label className="text-main-light">{text}</label>;
};

export default Label;
