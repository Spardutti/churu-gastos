import { useUserContext } from '@/context/UserContext/UserContext';
import { Navigate } from 'react-router-dom';
import routes from '@/routes/routes';
import { setDefaultHeaders } from '@/lib/axios/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setUser } = useUserContext();
  const access = localStorage.getItem('authorizationToken');

  if (!user?.authorizationToken && access) {
    setUser({ authorizationToken: access, refreshToken: '' });
    setDefaultHeaders(access);
  }

  if (!user?.authorizationToken && !access) {
    return <Navigate to={routes.LOGIN()} />;
  }

  return children;
};

export default ProtectedRoute;
