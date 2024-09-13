import type { ReactNode } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';
import type { INavItems } from '@/layout/Header/types';
import { Link } from 'react-router-dom';

interface NavigationMenuDemoProps {
  items: INavItems[];
}

const ReactLink = ({ href, ...props }: { href: string; children: ReactNode }) => {
  const pathname = location.pathname;
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link to={href} className={clsx(isActive && 'underline text-primary-main')} {...props} />
    </NavigationMenu.Link>
  );
};

const NavigationMenuDemo = ({ items }: NavigationMenuDemoProps) => {
  return (
    <NavigationMenu.Root className="relative z-[1] flex">
      <NavigationMenu.List className="center m-0 flex list-none  p-1">
        {items.map((item) => (
          <NavigationMenu.Item key={item.href}>
            <ReactLink href={item.href}>
              <p>{item.label}</p>
            </ReactLink>
          </NavigationMenu.Item>
        ))}

        <NavigationMenu.Indicator className="bg-red-500 h-1" />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavigationMenuDemo;
