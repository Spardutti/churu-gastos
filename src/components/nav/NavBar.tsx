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
            className="hover:bg-main-card-background rounded text-main-default-text"
            href={item.href}
            label={item.label}
            leftSection={item.icon}
            active={location.pathname === item.href}
            variant="filled"
            styles={(theme) => ({
              root: {
                backgroundColor: location.pathname === item.href ? '#9f7aea' : 'transparent',
                color: location.pathname === item.href ? '#2d3748' : '#38b2ac',
                '&:hover': {
                  backgroundColor: location.pathname === item.href ? theme.colors.blue[7] : theme.colors.gray[0],
                },
              },
            })}
          />
        </div>
      ))}
    </div>
  );
};

export default NavBar;
