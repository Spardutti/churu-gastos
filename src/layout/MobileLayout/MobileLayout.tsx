import { ReactNode } from "react";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="bg-neutral-800 h-screen flex flex-col gap-4 text-white overflow-auto px-2 py-1">
      <h1 className="text-center">Churu Gastos</h1>
      {children}
    </div>
  );
};

export default MobileLayout;
