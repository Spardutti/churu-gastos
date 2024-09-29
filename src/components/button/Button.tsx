import Spinner from '@/components/spinner';
import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BaseButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  isLoading?: boolean;
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  isActive?: boolean;
}

interface TextButtonProps extends BaseButtonProps {
  text: string;
  prependIcon?: ReactNode;
  isIconOnly?: never;
  icon: never;
}

interface IconButtonProps extends BaseButtonProps {
  isIconOnly: true;
  icon: ReactNode;
  text?: never;
  prependIcon?: never;
}

type ButtonProps = TextButtonProps | IconButtonProps;

const Button = ({
  text,
  type = 'button',
  onClick,
  isLoading,
  variant,
  isActive,
  prependIcon,
  isIconOnly,
  icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'px-2 py-1 rounded-lg disabled:opacity-50 transition-all',
        variant === 'primary' && 'bg-main-primary-text text-main-background hover:bg-main-secondary-text',
        variant === 'secondary' && 'bg-main-secondary-text hover:bg-main-active text-main-background ',
        variant === 'ghost' && 'hover:bg-main-card-border',
        variant === 'danger' && 'bg-danger-main hover:bg-main-card-border',
        isActive && 'ring-2',
      )}
      type={type}
      disabled={isLoading}
    >
      <div className="flex gap-2 items-center">
        {prependIcon}
        <div className="relative transition-all">
          <p className={clsx(isLoading && 'invisible', 'font-semibold')}>{isIconOnly ? icon : text}</p>
          <p className={clsx('absolute inset-0 visible', !isLoading && 'invisible')}>
            <Spinner size="small" />
          </p>
        </div>
      </div>
    </button>
  );
};

export default Button;
