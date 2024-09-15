interface InputLabelProps {
  text?: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
  return <label className="text-primary-light">{text}</label>;
};

export default InputLabel;
