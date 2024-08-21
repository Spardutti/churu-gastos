import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { strings } from '@/constants/strings';
import { useEffect, useState } from 'react';
import { useProfileQuery } from '@/store/api';
import { setUser } from '@/features/user/store/userSlice';
import Spinner from '@/components/spinner';
import routes from '@/routes/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const token = localStorage.getItem(strings.token);

  const [accessToken, setAccessToken] = useState<null | string>(null);

  const dispatch = useDispatch();
  const { data, isLoading } = useProfileQuery({ token: accessToken! }, { skip: !accessToken });

  useEffect(() => {
    if (token) {
      dispatch(setUser({ email: '', token }));
      setAccessToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser({ token: accessToken!, email: data.user.email }));
    }
  }, [data]);

  if (!user?.token && !token) {
    return <Navigate to={routes.LOGIN()} replace />;
  }

  if (isLoading || !data) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
