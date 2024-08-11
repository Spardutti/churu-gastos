import Spinner from '@/components/spinner';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
  isLoading: boolean;
}

const Button = ({ text, type = 'button', onClick, isLoading }: ButtonProps) => {
  return (
    <button onClick={onClick} className="px-2 py-1 border  rounded-lg" type={type}>
      <div className="relative transition-all">
        <p className={clsx(isLoading && 'invisible')}>{text}</p>
        <p className={clsx('absolute inset-0 visible', !isLoading && 'invisible')}>
          <Spinner size="small" />
        </p>
      </div>
    </button>
  );
};

export default Button;
