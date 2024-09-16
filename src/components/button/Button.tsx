import Spinner from '@/components/spinner';
import clsx from 'clsx';

interface ButtonProps {
  text: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
  variant: 'primary' | 'secondary' | 'ghost';
  prependIcon?: React.ReactNode;
  isActive?: boolean;
}

const Button = ({ text, type = 'button', onClick, isLoading, variant, isActive, prependIcon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-2 py-1 border rounded-lg disabled:opacity-50 transition-all',
        variant === 'primary' && 'bg-primary-main text-main-light hover:bg-hover-main',
        variant === 'secondary' && 'bg-primary-light hover:bg-hover-light text-primary-main ',
        variant === 'ghost' && 'hover:bg-hover-light',
        isActive && 'ring-2',
      )}
      type={type}
      disabled={isLoading}
    >
      <div className="flex gap-2 items-center">
        {prependIcon}
        <div className="relative transition-all">
          <p className={clsx(isLoading && 'invisible')}>{text}</p>
          <p className={clsx('absolute inset-0 visible', !isLoading && 'invisible')}>
            <Spinner size="small" />
          </p>
        </div>
      </div>
    </button>
  );
};

export default Button;
