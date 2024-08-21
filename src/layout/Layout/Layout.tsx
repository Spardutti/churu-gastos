import Header from '@/layout/Header';
import React from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className=" h-screen flex flex-col gap-4 overflow-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
