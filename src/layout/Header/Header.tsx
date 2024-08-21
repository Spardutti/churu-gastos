import Heading from '@/components/heading';
import routes from '@/routes/routes';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const Header = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="flex items-center px-4 self-stretch bg-black text-white h-14 justify-between">
      <Heading label="Churu Gastos" variant="h4" />
      <Link to={routes.PROFILE()}>
        <Avatar label={user.email!} />
      </Link>
    </div>
  );
};

export default Header;

interface AvatarProps {
  label: string;
}
const Avatar = ({ label }: AvatarProps) => {
  return (
    <div className="rounded-full bg-main-secondary text-white size-6 text-center">{label.charAt(0).toUpperCase()}</div>
  );
};
