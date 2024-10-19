import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LinkWithParamsProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  state?: Record<string, string>;
}

const LinkWithParams: React.FC<LinkWithParamsProps> = ({ to, children, className, state }) => {
  const location = useLocation();
  console.log('state:', state);

  return (
    <Link
      to={{
        pathname: to,
        search: location.search,
      }}
      state={state}
      className={className}
    >
      {children}
    </Link>
  );
};

export default LinkWithParams;
