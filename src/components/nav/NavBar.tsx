import type { ReactNode } from 'react';
import * as Navigation from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import type { INavItems } from '@/layout/Header/types';
import { Link } from 'react-router-dom';

interface NavigationMenuDemoProps {
  items: INavItems[];
}

const ReactLink = ({ href, ...props }: { href: string; children: ReactNode }) => {
  const pathname = location.pathname;
  const isActive = href === pathname;
  const searchParams = new URLSearchParams(location.search);
  const hrefWithParams = `${href}?${searchParams.toString()}`;

  return (
    <Navigation.Link asChild active={isActive}>
      <Link
        to={hrefWithParams}
        className={clsx(isActive && 'underline text-main-active font-semibold', 'text-main-secondary-text')}
        {...props}
      />
    </Navigation.Link>
  );
};

const NavBar = ({ items }: NavigationMenuDemoProps) => {
  return (
    <Navigation.Root className="relative z-[1] flex">
      <Navigation.List className="list-none p-1 flex gap-2">
        {items.map((item) => (
          <Navigation.Item key={item.href}>
            <ReactLink href={item.href}>
              <p>{item.label}</p>
            </ReactLink>
          </Navigation.Item>
        ))}

        <Navigation.Indicator className="bg-red-500 h-1" />
      </Navigation.List>
    </Navigation.Root>
  );
};

export default NavBar;
