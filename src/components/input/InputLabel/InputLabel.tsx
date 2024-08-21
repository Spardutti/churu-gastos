interface InputLabelProps {
  text?: string;
}

const InputLabel = ({ text }: InputLabelProps) => {
  return <label className="text-black">{text}</label>;
};

export default InputLabel;
