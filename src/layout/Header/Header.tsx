import Heading from '@/components/heading';
import NavBar from '@/components/nav/NavBar';
import { useUserContext } from '@/context/UserContext/UserContext';
import type { INavItems } from '@/layout/Header/types';
import routes from '@/routes/routes';
import { Link } from 'react-router-dom';

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
  const { user } = useUserContext();
  return (
    <div className="flex flex-col  self-stretch bg-primary-light px-4 py-2 gap-2 text-white ">
      <div className="flex justify-between flex-grow self-stretch items-center">
        <Heading label="Churu Gastos" variant="h4" />
        <Link to={routes.PROFILE()}>{user && <Avatar label={user.displayName} />}</Link>
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
