import type { ReactNode } from 'react';
import clsx from 'clsx';
import type { INavItems } from '@/layout/Header/types';
import { Link } from 'react-router-dom';
import { NavLink } from '@mantine/core';

interface NavigationMenuDemoProps {
  items: INavItems[];
}

const ReactLink = ({ href, ...props }: { href: string; children: ReactNode }) => {
  const pathname = location.pathname;
  const isActive = href === pathname;
  const searchParams = new URLSearchParams(location.search);
  const hrefWithParams = `${href}?${searchParams.toString()}`;

  return (
    <Link
      to={hrefWithParams}
      className={clsx(isActive && 'underline text-main-active font-semibold', 'text-main-secondary-text')}
      {...props}
    />
  );
};

const NavBar = ({ items }: NavigationMenuDemoProps) => {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div key={item.href}>
          <NavLink
            component={ReactLink}
            href={item.href}
            label={item.label}
            leftSection={item.icon}
            active={location.pathname === item.href}
            variant="filled"
            classNames={{
              root: 'hover:bg-main-card-background rounded text-main-secondary-text data-[active]:bg-main-primary-text data-[active]:text-main-card-background',
              body: 'hidden md:block ',
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default NavBar;
