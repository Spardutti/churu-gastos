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
    label: 'Insights',
    href: routes.INSIGHTS(),
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

interface AvatarProps {
  label: string;
}
const Avatar = ({ label }: AvatarProps) => {
  return (
    <div className="rounded-full bg-primary-main text-white size-6 text-center">{label.charAt(0).toUpperCase()}</div>
  );
};
