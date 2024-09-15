import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant: 'info' | 'light';
}

const Card = ({ children, className, variant }: CardProps) => {
  return (
    <div
      className={clsx(
        className,
        'p-4 rounded-md shadow-md',
        variant === 'info' && 'bg-info-main text-neutral-900',
        variant === 'light' && 'bg-primary-bg',
      )}
    >
      {children}
    </div>
  );
};

export default Card;
