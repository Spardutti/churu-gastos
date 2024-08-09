import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-neutral-800 h-screen flex flex-col gap-4 text-white overflow-auto">
      <h1 className="text-center">Churu Gastos</h1>
      {children}
    </div>
  );
};

export default Layout;
