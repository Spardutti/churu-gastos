import { useUserContext } from '@/context/UserContext/UserContext';
import { Navigate, useSearchParams } from 'react-router-dom';
import routes from '@/routes/routes';
import { setDefaultHeaders } from '@/lib/axios/config';
import { userAPI } from '@/features/user/api/user';
import Spinner from '@/components/spinner';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, setUser } = useUserContext();
  const access = localStorage.getItem('authorizationToken');
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, error, isLoading } = userAPI.useGetUser();

  if (access && !user?.authorizationToken) {
    setUser(null);
    setDefaultHeaders(access);
  }

  useEffect(() => {
    if (data) {
      setUser({ ...data, authorizationToken: access!, refreshToken: '' });
      searchParams.set('language', data.language);
      setSearchParams(searchParams);
    }
  }, [data]);

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
