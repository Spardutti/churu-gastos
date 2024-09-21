import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default';
  onClick?: () => void;
}

const Card = ({ children, className, variant = 'default', onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        className,
        'relative p-4 rounded-md shadow-md',
        !!onClick && 'cursor-pointer hover:bg-main-card-border',
        variant === 'default' && 'bg-main-card-background border-main-card-border border text-main-secondary-text ',
      )}
    >
      {children}
    </div>
  );
};

export default Card;
