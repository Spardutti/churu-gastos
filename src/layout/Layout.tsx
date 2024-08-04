import React from "react";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return <div className="bg-slate-300 h-screen w-screen">{children}</div>;
};

export default Layout;
