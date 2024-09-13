import Header from '@/layout/Header';
import React from 'react';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: DesktopLayoutProps) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="overflow-auto">{children}</div>
    </div>
  );
};

export default Layout;
