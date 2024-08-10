import React from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className="bg-neutral-800 h-screen flex flex-col gap-4 text-white overflow-auto">
      <h1 className="text-center">Churu Gastos</h1>
      {children}
    </div>
  );
};

export default DesktopLayout;
