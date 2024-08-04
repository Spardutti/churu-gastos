interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return <button className="px-2 py-1 border  rounded-lg">{text}</button>;
};

export default Button;
