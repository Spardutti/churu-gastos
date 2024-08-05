interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({ text, type = 'button' }: ButtonProps) => {
  return (
    <button className="px-2 py-1 border  rounded-lg" type={type}>
      {text}
    </button>
  );
};

export default Button;
