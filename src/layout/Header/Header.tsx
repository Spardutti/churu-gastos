import Heading from '@/components/heading';
import NavBar from '@/components/nav/NavBar';
import type { INavItems } from '@/layout/Header/types';
import routes from '@/routes/routes';

const navItems: INavItems[] = [
  {
    label: 'Dashboard',
    href: routes.DASHBOARD(),
  },
  {
    label: 'Extras',
    href: routes.EXTRAS(),
  },
];

const Header = () => {
  return (
    <div className="flex flex-col  self-stretch bg-primary-light px-4 py-2 gap-2 text-white ">
      <div className="flex justify-between flex-grow self-stretch items-center">
        <Heading label="Churu Gastos" variant="h4" />
      </div>

      <NavBar items={navItems} />
    </div>
  );
};

export default Header;
