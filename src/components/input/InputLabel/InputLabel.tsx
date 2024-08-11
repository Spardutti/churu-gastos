interface InputLabelProps {
  text?: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
  return <label className="text-main-light">{text}</label>;
};

export default InputLabel;
