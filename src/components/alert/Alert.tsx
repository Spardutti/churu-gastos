import clsx from 'clsx';
import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  return (
    <div className={clsx('px-4 py-2 rounded-md',type === 'success' && 'bg-green-primary', type === 'error' && 'bg-red-500')}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
