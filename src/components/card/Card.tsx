import clsx from 'clsx';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return <div className={clsx(className, 'bg-neutral-100 p-4 rounded-md shadow-md')}>{children}</div>;
};

export default Card;
