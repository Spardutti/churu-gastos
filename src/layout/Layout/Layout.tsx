import Header from '@/layout/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="overflow-auto flex flex-col gap-4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
