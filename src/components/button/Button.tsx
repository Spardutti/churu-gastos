interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: () => void;
}

const Button = ({ text, type = 'button', onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className="px-2 py-1 border  rounded-lg" type={type}>
      {text}
    </button>
  );
};

export default Button;
