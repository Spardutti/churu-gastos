import { useUserContext } from '@/context/UserContext/UserContext';
import { Navigate } from 'react-router-dom';
import routes from '@/routes/routes';
import { setDefaultHeaders } from '@/lib/axios/config';
import { userAPI } from '@/features/user/api/user';
import Spinner from '@/components/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setUser } = useUserContext();
  const access = localStorage.getItem('authorizationToken');

  const { error, isLoading } = userAPI.useGetUser();

  if (access && !user?.authorizationToken) {
    setUser({ authorizationToken: access, refreshToken: '' });
    setDefaultHeaders(access);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    setUser(null);
    localStorage.removeItem('authorizationToken');
    setDefaultHeaders(null);
    return <Navigate to={routes.LOGIN()} />;
  }

  if (!user?.authorizationToken && !access) {
    return <Navigate to={routes.LOGIN()} />;
  }

  return children;
};

export default ProtectedRoute;
